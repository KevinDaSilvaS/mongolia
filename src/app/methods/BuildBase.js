require('dotenv/config');
const response = require('../response');
const Status = require('../../constants/HttpCodes');
const ErrorMessages = require('../../constants/ErrorMessages');
const Operations = require('../../operations/mongo/OperationsBaseMongo');
const collectionFields = require('../../memory-manager/collectionFields');
const collections = require('../../memory-manager/collections');
const token = require('../../memory-manager/token');
const GenerateModelFile = require('../../manipulateFiles/CreateModelFiles');
const {MONGO_USERNAME, MONGO_PASSWORD} = process.env;
token.username = MONGO_USERNAME;
token.password = MONGO_PASSWORD;

const manager = {
    collectionFields,
    collections,
    token
}

const dependencies = {
    response,
    Status,
    ErrorMessages,
    Operations,
    manager,
    GenerateModelFile
}

const buildBase = async (route, req, res) => {
    const values = Object.values(route.validations);
    for (let i = 0; i < values.length; i++) {
        const result = await values[i](req, res);
        if (!result)
            return;
    }

    await route.controller(req, res, dependencies);
}

module.exports = buildBase;