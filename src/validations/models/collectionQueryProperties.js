module.exports = (fields, allowedFields) => {
    const arrFields = Object.keys(fields);
    allowedFields.push('_id');
    const sanitizedFields = arrFields.filter((field) => allowedFields.includes(field));
    const query = {};
    sanitizedFields.map((field) => query[field] = fields[field])
    return query;
}