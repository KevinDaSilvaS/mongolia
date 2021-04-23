const fs = require('fs');
const util = require('util');
const fs_writeFile = util.promisify(fs.writeFile);

const createModelFile = async ({collectionName, collectionProperties, path, addressPath}) => {
    let parsedCollectionProperties = JSON.stringify(collectionProperties).toString().replace(/"/g, '');
    const contentFile = `
        const mongoose = require('mongoose');
    
        const ${collectionName}Schema = new mongoose.Schema(${parsedCollectionProperties});
        
        const ${collectionName}Model = mongoose.model("${collectionName}", ${collectionName}Schema);
        
        module.exports = ${collectionName}Model;
    `;

    try {
        await fs_writeFile(`${path}/${collectionName}Model.js`, contentFile);
        return `${addressPath}/${collectionName}Model.js`
    } catch (error) {
        throw "No such file or directory.";
    }
}

module.exports = createModelFile;