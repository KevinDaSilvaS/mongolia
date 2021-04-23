fs = require('fs');

const createModelFile = ({collectionName, collectionProperties, path, addressPath}) => {
    let parsedCollectionProperties = JSON.stringify(collectionProperties).toString().replace(/"/g, '');
    const contentFile = `
        const mongoose = require('mongoose');
    
        const ${collectionName}Schema = new mongoose.Schema(${parsedCollectionProperties});
        
        const ${collectionName}Model = mongoose.model("${collectionName}", ${collectionName}Schema);
        
        module.exports = ${collectionName}Model;
    `;

    fs.writeFile(`${path}/${collectionName}Model.js`, contentFile, function (err) {
        if (err) throw err;
        return `${addressPath}/${collectionName}Model.js`
    });
    return `${addressPath}/${collectionName}Model.js`
}

module.exports = createModelFile;