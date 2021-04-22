const mongoose = require('mongoose');

const connection = async () => {
    //in local mode change mongo to localhost
    return await mongoose.connect(`mongodb://kevin:123@localhost:27017/admin`, 
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
        if (err) {
           console.log(err); 
        }
    });
}

module.exports = connection();