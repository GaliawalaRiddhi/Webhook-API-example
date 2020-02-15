const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("./database/connection");
const app = express();
const WebHookModel = require("./database/webhook.model");

MongoClient().then(()=>{
    console.log("connected");
}).catch(console.log)

app.use(bodyParser.urlencoded({ extended:false }));

app.get("/",(req,res)=>{
    res.send("Welcome to hands on demo of WebHook!!");
})

//Get all webhooks
app.get("/api/webhooks",(req,res)=>{
    WebHookModel.find().then((wh)=>{
        res.json({
            flag:true,
            data:wh,
            message:"Successfully fetched"
        });
        }).catch(e=>{
            res.json({
                flag:false,
                data:null,
                message:e.message
            });
        })
})

//Create webhook
app.post("/api/webhook",(req,res)=>{
    let body=req.body;

    WebHookModel.create(body)
    .then((wh)=> {
        res.json({
            flag:true,
            data:wh,
            message:"Successfully Created"
        });
    }).catch(e=>{
        res.json({
            flag:false,
            data:null,
            message:e.message
        });
    })
});


//update webhook
app.put("/api/webhook/:id",(req,res)=>{
    let body=req.body;

    WebHookModel.findByIdAndUpdate(req.params.id,body)
        .then((wh)=>{
        res.json({
            flag:true,
            data:wh,
            message:"Successfull"
        });
    })
});

//delete webhook
app.delete("/api/webhook/:id",(req,res)=>{
    let body=req.body;

    WebHookModel.findByIdAndRemove(req.params.id,function(err,wh){
        if(err)
        {
            res.json({
                flag:false,
                data:null,
                message:express.message
            });   
        }
        else{
            res.json({
                flag:true,
                data:wh,
                message:"Successfull deleted"
            });
        }
    });
});

app.listen(3000);
// .then((wh)=>{
//     Console.log("Server has been started succesfully");
// }).catch((ch)=>{
//     Console.log("Server has not started");
// })