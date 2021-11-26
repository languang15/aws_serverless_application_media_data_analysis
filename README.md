# AWS: Serverless application to detect labels from image and analyse sentiment from text message  

This application is used to
1. upload an image into S3 bucket using S3 signed url and later process the uploaded image using lambda functions and Amazon Rekognition to detect labels from image
2. plost text message and later process the text using lambda functions and Amazon Comprehend to analyse from text

This can be tested using a frontend application created using Vue and node.js


## Requirements

* [AWS CLI](https://aws.amazon.com/cli/) installed and configured with your environment
* [AWS SAM CLI installed](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) - minimum version 0.48.
* [NodeJS 12.x installed](https://nodejs.org/en/download/)

## Deployment Instructions

The complete deployment can be executed using the [AWS SAM (Serverless application model)](https://aws.amazon.com/serverless/sam/) and template (template.yaml) available in the repo.

```
cd .. 
sam deploy --guided
```
This command will be creating below set of components into your AWS using CloudFormation and should be carefull to consider your AWS billing limits.


## Architecture Diagram 
<img src = "image/architecture.png">