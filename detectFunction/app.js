//Use this function to detect labels from the image uploaded into S3 Bucket
'use strict'

const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION })
var rekognition = new AWS.Rekognition();

console.log('Calling lmabda function detect with arguments');

// Lambda function entry point
exports.handler = async (event) => {
  return await processImage(event)
}

//function which will extract the labels from S3 bucket image
const processImage = async function (event) {

  try {
    var params = {
      Image: {
        S3Object: {
          Bucket: process.env.UploadBucket,
          Name: event['queryStringParameters'].Image
        }
      },
      MaxLabels: 5
    };

    //console.log(JSON.stringify(event));
    
    //let data = await rekognition.detectText(params).promise();
    let data = await rekognition.detectLabels(params).promise();
    //console.log(JSON.stringify(data));

    //console.log(JSON.stringify(data.Labels[0].Name)); 
    //console.log(JSON.stringify(data.Labels[0].Confidence)); 
    
    var table = '<table><tr><th>#</th><th>Name</th><th>Confidence</th></tr>'; 
        // show each label detected
        for (var i = 0; i < data.Labels.length; i++) {
          table +=
          '<tr><td>' + i + '</td>'+
          '<td>' + data.Labels[i].Name + '</td>' +
          '<td>' + data.Labels[i].Confidence  + '</td></tr>'

        }
        table += '</table>';
        const response = {
          statusCode: 200,
          body: table
        }
        return response;
    
  } catch (error) {
    console.log(error);
    return error;
  }
}