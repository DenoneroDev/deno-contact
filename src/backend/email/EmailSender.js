const nodemailer = require("nodemailer");
const EmailConfirmationTemplate = require("./EmailConfirmationTemplate");
const EmailNotificationTemplate = require("./EmailNotificationTemplate");
const EmailClientNotificationTemplate = require("./EmailClientNotificationTemplate");

class EmailSender {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD
            },
        })        
    }
    #send(email, message) {
        try {
            this.transporter.sendMail({
                from: {
                    name: "deno-websites",
                    address: process.env.EMAIL
                },
                to: [email],
                subject: message.subject,
                html: message.html,
            });
        } catch(error) {
            console.error(error);
        }
    }
    sendConfirmationEmail(email, firstName, code) {
        this.#send(email, {
            subject: "Email confirmation",
            html: new EmailConfirmationTemplate(firstName, code).html()
        });
    }
    sendSubmissionNotification(email, firstName, lastName, companyName, subject, text) {
        this.#send(process.env.NODEMAILER_EMAIL, {
            subject: `[deno-contact]: ${firstName} ${lastName} ${companyName ? `(${companyName})` : ""} submitted a message`,
            html: new EmailNotificationTemplate(firstName, lastName, companyName, email, subject, text).html()
        });
        this.#send(email, {
            subject: "Form Submitted Successfully",
            html: new EmailClientNotificationTemplate(firstName).html()
        })
    }
}
module.exports = EmailSender;