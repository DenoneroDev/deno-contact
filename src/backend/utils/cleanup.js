const cron = require("node-cron");
const database = require("./database");

async function activateEmailCleanupTask() {
    console.log("Activating email cleanup task...");
    //Remove emails that are older than 5 minutes
    cron.schedule("0 0 * * *", async () => {
        console.log("Cleaning up emails...");
        await database.remove("confirmation", {
            createdAt: {
                $lt: new Date(Date.now() - (5 * 60 * 1000))
            }
        });
        console.log("Emails cleaned up!");
    });
}

module.exports = {
    activateEmailCleanupTask
}