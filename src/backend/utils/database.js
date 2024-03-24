const {MongoClient, ServerApiVersion} = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});
const databaseName = process.env.BASE_DATABASE_NAME;
const confirmationName = "confirmation";

async function configure() {
    try {
        const databases = await client.db().admin().listDatabases();
        const baseDatabaseExists = databases.databases.some(db => db.name === databaseName);
        if (!baseDatabaseExists) {
            await client.db(databaseName).createCollection("confirmation");
            console.log(`Database "deno-contact" created!`);
        }
    } catch (error) {
        console.error(error);
    }
}
async function connect() {
    try {
        await client.connect();
        await configure();
        console.log("Successfully connected to MongoDB!");
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}
async function update(collectionName, filter, query, insertIfNotExists = false) {
    try {
        await client.connect();
        const collection = client.db(databaseName).collection(collectionName);
        const result = await collection.updateOne(filter, query, { upsert: insertIfNotExists });
        return result;
    } catch(error) {
        console.error(error);
    } finally {
        await client.close();
    }
}
async function get(collectionName, query, single = false) {
    try {
        await client.connect();
        const collection = client.db(databaseName).collection(collectionName);
        const result = (!single) ? await collection.find(query).toArray() : await collection.findOne(query);
        return result;
    } catch(error) {
        console.error(error);
    } finally {
        await client.close();
    }
}
async function remove(collectionName, query, single = false) {
    try {
        await client.connect();
        const collection = client.db(databaseName).collection(collectionName);
        const result = (!single) ? await collection.deleteMany(query) : await collection.deleteOne(query);
        return result;
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}
async function insert(collectionName, data) {
    try {
        await client.connect();
        const collection = client.db(databaseName).collection(collectionName);
        const result = await collection.insertOne(data);
        return result;
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

async function storeConfirmation(email, code, updateIfExists = false) {
    if(updateIfExists)
        await removeConfirmation(email);
    return await insert(confirmationName, {
        email: email,
        code: code,
        createdAt: new Date(),
        tries: 0
    });
}
async function getConfirmation(email) {
    return await get(confirmationName, { email: email }, true);
}
async function removeConfirmation(email) {
    return await remove(confirmationName, { email: email });
}
async function increaseTries(email) {
    await update(confirmationName, { email: email }, { $inc: { tries: 1 } });
}
module.exports = {
    connect,
    storeConfirmation,
    getConfirmation,
    removeConfirmation,
    increaseTries
}