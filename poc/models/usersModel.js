
        const mongoose = require('mongoose');
    
        const usersSchema = new mongoose.Schema({name:{type:String,required:true},age:{type:Number}});
        
        const usersModel = mongoose.model("users", usersSchema);
        
        module.exports = usersModel;
    