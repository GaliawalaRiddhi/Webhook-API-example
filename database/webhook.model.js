const mongoose=require("mongoose");

const WebHook = mongoose.Schema({
    name:String,
    payload:Object,
    addedBy:String,
    isActive:String
},{
    timestamps:true
});

module.exports = mongoose.model('WebHook',WebHook);