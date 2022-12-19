const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https")

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){
    const firstName = req.body.fName
    const lastName = req.body.lName
    const email = req.body.Email
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merger_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/7a9ea96235"
    const options = {
        method: "POST",
        auth: "shreyanshKr:f29b84a229e8f6325b3c75fa241fdff3-us21"
    }
   const request =  https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
        request.write(jsonData);
        request.end();
})







app.listen(3000, function(){
    console.log("server is live on 3000")
})

//7a9ea96235
//a4045193e059b6bcf6b607813d65c8dd-us21