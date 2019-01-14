"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const restService = express();

restService.use(
    bodyParser.urlencoded({
        extended: true
    })
);

restService.use(bodyParser.json());

/****************************************** Start of the extraction block ****************/

/*
 /echo api is used for the getting text from dialog flow and store that text into speech variable.
 */
restService.post("/database", function(req, res) {
    let speech =
        req.body.result &&
        req.body.result.parameters &&
        req.body.result.parameters.echoText
            ? req.body.result.parameters.echoText
            : "Seems like some problem. Speak again.";

    /****************************************** End of the extraction block ****************/


    /********************************** database creation block start ***********************/
        /*
        Compare speech variable for null or empty values. If speech variable is not null and its not empty then execute
        if block otherwise execute else block.
        If block explanation - dbcreate.php is API where we send speech variable as post variable. Once API is executed
        success message is send back to user.
        else block explanation - normal error message is sent back to the user.
         */
    if (speech !== null && speech !== ''){
        
        request.post({url:'https://forserene.com/mini/myDB.php', form: {slack:speech}}, function(err,httpResponse,body){
          var obj = JSON.parse(body)
            return res.json({
                speech:obj.text,
                displayText: obj.text,
                source: "webhook-echo-sample"
            });
        });
    } else {
        //submit return message to the user
        return res.json({
            speech: "Please enter database name",
            displayText: "Please enter database name",
            source: "webhook-echo-sample"
        });
    }
    /********************************** database creation block end ***********************/
});

restService.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
});