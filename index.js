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

restService.post("/slack-test", function(req, res) {
    var slack_message = {
        text: "Details of JIRA board for Browse and Commerce",
        attachments: [
            {
                title: "JIRA Board",
                title_link: "http://www.google.com",
                color: "#36a64f",

                fields: [
                    {
                        title: "Epic Count",
                        value: "50",
                        short: "false"
                    },
                    {
                        title: "Story Count",
                        value: "40",
                        short: "false"
                    }
                ],

                thumb_url:
                    "https://stiltsoft.com/blog/wp-content/uploads/2016/01/5.jira_.png"
            },
            {
                title: "Story status count",
                title_link: "http://www.google.com",
                color: "#f49e42",

                fields: [
                    {
                        title: "Not started",
                        value: "50",
                        short: "false"
                    },
                    {
                        title: "Development",
                        value: "40",
                        short: "false"
                    },
                    {
                        title: "Development",
                        value: "40",
                        short: "false"
                    },
                    {
                        title: "Development",
                        value: "40",
                        short: "false"
                    }
                ]
            }
        ]
    };
    return res.json({
        speech: "speech",
        displayText: "speech",
        source: "webhook-echo-sample",
        data: {
            slack: slack_message
        }
    });
});

restService.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
});