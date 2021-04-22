require('dotenv/config');
const mongoose = require('mongoose');

const {MONGO_USERNAME, MONGO_PASSWORD, MONGODB_HOST, MONGODB_PORT, MONGODB_NAME}  = process.env;
const username = MONGO_USERNAME || "";
const password = MONGO_PASSWORD || "";
const host = MONGODB_HOST || "localhost";
const port = MONGODB_PORT || "27017";
const mongodbName = MONGODB_NAME || "admin";

const connection = async () => {

    return await mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${mongodbName}`, 
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
        if (err) {
           console.log(err); 
           throw err;
        }
    });
}

module.exports = connection();