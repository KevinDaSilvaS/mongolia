
        const mongoose = require('mongoose');
    
        const usersSchema = new mongoose.Schema({name:{type:String,required:true},age:{type:Number},status:{type:String}});
        
        const usersModel = mongoose.model("users", usersSchema);
        
        module.exports = usersModel;
    