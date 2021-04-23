module.exports = (fields, allowedFields) => {
    const arrFields = Object.keys(fields);
    const sanitizedFields = arrFields.filter((field) => allowedFields.includes(field));
    const register = {};
    sanitizedFields.map((field) => register[field] = fields[field])
    return register;
}