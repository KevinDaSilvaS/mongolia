sanitizeQuery = (value, property) => {
    const rawValue = value.replace(property, '');
    return rawValue;
}

const buildComparativeQuery = (fieldValue) => {

    const queryElems = fieldValue.split("@>");
    const finalValue = {};
    queryElems.map((elem) => {
        if(elem.match(/GT/g))
            return finalValue.$gt = sanitizeQuery(elem, /GT/g);
        if(elem.match(/LT/g))
            return finalValue.$lt = sanitizeQuery(elem, /LT/g);
        if(elem.match(/GTE/g))
            return finalValue.$gte = sanitizeQuery(elem, /GTE/g);
        if(elem.match(/LTE/g))
            return finalValue.$lte = sanitizeQuery(elem, /LTE/g);
        if(elem.match(/EQ/g))
            return finalValue.$eq = sanitizeQuery(elem, /EQ/g);
    });

    if(Object.keys(finalValue).length > 0)
        return finalValue;

    return fieldValue;
}

module.exports = (fields, allowedFields) => {
    const arrFields = Object.keys(fields);
    allowedFields.push('_id');
    const sanitizedFields = arrFields.filter((field) => allowedFields.includes(field));
    const query = {};
    sanitizedFields.map((field) => {
        const fieldValue = buildComparativeQuery(fields[field]);

        query[field] = fieldValue;
    })
    return query;
}