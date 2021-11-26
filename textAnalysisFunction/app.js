//Use this function to detect sentiment from the Text  
'use strict'

const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION })
var comprehend = new AWS.Comprehend();

console.log('Calling lmabda function to analyse text');

// Lambda function entry point
exports.handler = async (event) => {
  return await processText(event)
}

//function which will extract the labels from S3 bucket image
const processText = async function (event) {

  try {
    var params = {
      LanguageCode: "en",
      Text: event['queryStringParameters'].text
    };

    console.log(JSON.stringify(event));
    
    let data = await  comprehend.detectSentiment(params).promise();
    console.log(JSON.stringify(data));

    //console.log(JSON.stringify(data.Labels[0].Name)); 
    //console.log(JSON.stringify(data.Labels[0].Confidence)); 
    var sentiment =  data.Sentiment;
    const response = {
      statusCode: 200,
      body: sentiment
    }
    console.log(JSON.stringify(response));
    return response;
    
    
  } catch (error) {
    console.log(error);
    return error;
  }
}