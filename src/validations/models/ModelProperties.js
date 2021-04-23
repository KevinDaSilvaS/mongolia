const typeOptions = require('../../constants/MongooseTypeOptions');

const execute = (collectionProperties) => sanitizeFields(collectionProperties);

const sanitizeFields = (collectionProperties) => {
    try {
        const collectionFields = Object.values(collectionProperties);

        const sanitizedFields = collectionFields.map((field) => validateProperties(field));
        const keys = Object.keys(collectionProperties);

        let finalModelObj = {};
        for (let index = 0; index < keys.length; index++) {
            finalModelObj[keys[index]] = sanitizedFields[index];
        }
        
        return finalModelObj;
    } catch (error) {
        throw error;
    }
    
}

const validateProperties = (fieldProperty) => {
    try {
        const type = validateType(fieldProperty);
        const required = validateRequired(fieldProperty['required']);

        const properties = {
            type,
            required,
        }
        return properties;

    } catch (error) {
        throw error
    }
}

const validateType = ({type}) => {
    if(type && typeOptions.includes(type))
        return type
    throw `Type not properly set. Accepted values(${typeOptions.toString()})`;
}

const validateRequired = (required) => {
    if(!required)
        return false

    if(typeof required == typeof false)
        return required
    throw "Required not properly set. Accepted values(true, false)";
}

module.exports = execute;
