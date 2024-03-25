require("dotenv").config();
const express = require('express');
const app = express();
const path = require("path");
const helmet = require("helmet");
const limit = require("express-limit").limit;
const bodyParser = require("body-parser");
const crypto = require("crypto");
const EmailSender = require("./email/EmailSender");
const Validator = require("./utils/Validator");
const database = require("./utils/database");
const cleanup = require("./utils/cleanup");

app.use(helmet());
app.use(express.static("./src/frontend/bundles/"));
app.use("/images", express.static("./src/frontend/images/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limit({ //Max 100 requests per minute
    duration: 60 * 1000,
    max: 100
}));
app.use((error, req, res, next) => {
    if (error instanceof Error && error.message === "Too many requests")
        return res.status(429).json({ message: "Too many requests, please try again later." });
    console.error(error);
    res.status(500).send({
        message: "Internal server error"
    });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/bundles/", "contact.html"));
});
app.post("/confirmation", async(req, res) => {
    try {
        const { firstName, email } = req.body;
        
        //Validate email
        const validator = new Validator();
        if(validator.isInvalidEmail(email))
            return res.status(400).send({
                message: "Invalid email format"
            });
        
        //Store generated code into the database
        const code = crypto.randomInt(100000, 999999);
        const storedConfirmation = await database.storeConfirmation(email, code, true);

        if(!storedConfirmation)
            return res.status(500).send({
                message: "Could not store confirmation data, please try again",
            });
        
        //Send email with confirmation code
        const emailSender = new EmailSender();
        emailSender.sendConfirmationEmail(email, firstName, code);
    
        res.status(200).send({
            message: "Email sent successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Internal server error"
        });
    }
});
app.post("/submit", async(req, res) => {
    try {
        const { email, code, firstName, lastName, companyName, subject, text } = req.body;
        const validator = new Validator();
        const validationError = validator.validateFormSubmission(req.body);

        //Validate form data
        if(validationError)
            return res.status(400).send({
                message: validationError
            });

        //Retrieve confirmation data from database
        const confirmationData = await database.getConfirmation(email);
        if(!confirmationData)
            return res.status(400).send({
                message: "Email not found"
            });
    
        //Check confirmation code
        if(confirmationData.code !== Number(code)) {
            await database.increaseTries(email);
            //Check if he has tried more than 3 times
            if(confirmationData.tries > 2) {
                await database.removeConfirmation(email);
                return res.status(400).send({
                    message: "Too many tries"
                });
            }
            return res.status(400).send({
                shouldTryAgain: false,
                message: "Invalid code"
            });
        }
    
        //We don't need the confirmation data anymore
        await database.removeConfirmation(email);

        //check if email is older than 5 minutes
        if(new Date(confirmationData.createdAt) < new Date() - (5 * 60 * 1000)) {
            return res.status(400).send({
                message: "Code expired"
            });
        }
    
        //Send email notification of form submission
        const emailSender = new EmailSender();
        emailSender.sendSubmissionNotification(email, firstName, lastName, companyName, subject, text);
        res.status(200).send({
            message: "Email sent successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Internal server error"
        });
    }
});

(async () => {
    await database.connect().catch(console.dir);
    cleanup.activateEmailCleanupTask();
    app.listen(process.env.PORT, () => {
        console.log(`Server started on http://127.0.0.1:${process.env.PORT}`);
    })
})();