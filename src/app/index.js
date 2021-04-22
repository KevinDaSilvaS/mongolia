require('dotenv/config');
const connectionMongo = require('../database/connection/connection');
connectionMongo.then().catch(e => new Error(e));

const app = require('./app');
const port = process.env.PORT || 3170;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});