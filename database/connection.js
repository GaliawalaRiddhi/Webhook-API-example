const mongoose=require("mongoose");
const URL = "mongodb://webhook:webhook@139.59.5.96:27017/webhook"

mongoose.Promise=global.Promise;

module.exports = () => {
    return mongoose.connect(URL,{
        useNewUrlParser:true
    }).then(()=>{
        console.log("database connection successfull");
    }).catch(err=>{
        console.log("database connection error",err);
        process.exit();
    });
}