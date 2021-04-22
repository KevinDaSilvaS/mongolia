const objCollections = require('./objCollections');
const fields = {};
const Operations = require('./OperationsBaseMongo')
const connection = require('./connection')
const bodyParser = require('body-parser');
const express = require('express');
const app = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

fs = require('fs');

const port = 3170

app.post('/tables', (req, res) => {
    const {collectionName, collectionProperties} = req.body;
    
    let parsedCollectionProperties = JSON.stringify((collectionProperties)).replace(/"/g, '');
    if(objCollections[collectionName]){
        res.status(400).send('Table already exists')
        return;
    }
        
    const contentFile = `
        const mongoose = require('mongoose');
    
        const ${collectionName}Schema = new mongoose.Schema(${parsedCollectionProperties});
        
        const ${collectionName}Model = mongoose.model("${collectionName}", ${collectionName}Schema);
        
        module.exports = ${collectionName}Model;
    `;

    fs.writeFile(`poc/models/${collectionName}Model.js`, contentFile, function (err) {
        if (err) return console.log(err);
            console.log('Hello World > helloworld.txt');
    });
    objCollections[collectionName] = `./models/${collectionName}Model.js`
    console.log("PATH", objCollections[collectionName]);
    fields[collectionName] = Object.keys(collectionProperties); 
    //validateProperties(collectionProperties);

    res.send('Hello World!')
})

app.post('/tables/:tableName', async (req, res) => {
    const { tableName } = req.params;
    if(!objCollections[tableName]){
        res.status(400).send({error: 'Table doesnt exists'})
        return;
    }

    const path = require(objCollections[tableName]);
    const operations = new Operations(path);
    const inserted = await operations.insert(req.body);
    if(inserted && inserted._id) {
        console.log(inserted)
        console.log(fields);
        res.send(inserted);
        return
    }
        
    res.status(400).send({error: inserted})
})

app.patch('/tables/:tableName', (req, res) => {
    if(objCollections[collectionName]){
        res.status(400).send('Table already exists')
        return;
    }
    const { tableName } = req.params;
    res.send({tableName});
})

app.get('/tables/:tableName', (req, res) => {
    if(objCollections[collectionName]){
        res.status(400).send('Table already exists')
        return;
    }
    const { tableName } = req.params;
    res.send({tableName});
})

app.delete('/tables/:tableName', (req, res) => {
    if(objCollections[collectionName]){
        res.status(400).send('Table already exists')
        return;
    }
    const { tableName } = req.params;
    res.send({tableName});
})


/* const validateProperties = (elems) => {
    const fields = Object.values(elems)
    fields.map((field) => {
        const configField = Object.values(field)
        configField.map((config) => console.log(config))
    })
} */

/* const validateTypes = (field, value) => {
    const allowedValues = {type}
} */

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
