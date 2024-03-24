const cron = require("node-cron");
const database = require("./database");

async function activateEmailCleanupTask() {
    console.log("Activating email cleanup task...");
    //Remove emails that are older than 5 minutes
    cron.schedule("0 0 * * *", async () => {
        console.log("Cleaning up emails...");
        await database.removeExpiredEmails();
        console.log("Emails cleaned up!");
    });
}

module.exports = {
    activateEmailCleanupTask
}