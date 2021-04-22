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
let token = undefined;

app.post('/auth', (req, res) => {
    const {username, password} = req.body;
    if(username == "kevin" && password == "123" && !token){
        token = "123456A"
        return res.send({token})
    }
        
    res.send({error: "Credentials dont match or auth token was already set"})
})

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

    res.status(201).send('Hello World!')
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

app.patch('/tables/:tableName', async (req, res) => {
    const { tableName } = req.params;
    if(!objCollections[tableName]){
        res.status(400).send({error: 'Table doesnt exists'})
        return;
    }

    const path = require(objCollections[tableName]);
    const operations = new Operations(path);
    const registers = await operations.update(req.query, req.body);
    if(!registers) {
        res.status(400).send({error: registers})
        return
    }
    
    res.status(204).send();
})

app.get('/tables/:tableName', async (req, res) => {

    const { tableName } = req.params;
    if(!objCollections[tableName]){
        res.status(400).send({error: 'Table doesnt exists'})
        return;
    }

    const {limit, page, ...rest} = req.query;
    const path = require(objCollections[tableName]);
    const operations = new Operations(path);
    const registers = await operations.getPaginated(rest, page, limit);
    if(!registers) {
        res.status(400).send({error: registers})
        return
    }
    
    res.send(registers);
})

app.delete('/tables/:tableName', async (req, res) => {
    const { tableName } = req.params;
    if(!objCollections[tableName]){
        res.status(400).send({error: 'Table doesnt exists'})
        return;
    }

    const path = require(objCollections[tableName]);
    const operations = new Operations(path);
    const registers = await operations.delete(req.query);
    if(!registers) {
        res.status(400).send({error: registers})
        return
    }
    
    res.status(204).send();
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
