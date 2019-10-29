const aws = require('aws-sdk');
const dynamoClient = require('./dynamoClient.js');
let response;

exports.dynamoOps = async (event, context) => {
    const settings = {
        region: process.env.AWS_REGION || 'us-east-1'
    };
    if (process.env.AWS_SAM_LOCAL) {
        settings.endpoint = 'http://dynamo:8000';
    };
    dynamoClient.connect(settings);
    const data = {
        TableName: 'USERS',
        Item: {
            'USER_ID': '2',
            'NAME': 'Majestic.Cloud',
            'URL': 'http://majestic.cloud'
        }
    };
    return putItem(data);

};

function putItem(data){

    return dynamoClient.putItem(data)
        .then(result => {
            console.log(result);
            response = {
                statusCode: 200,
                body: JSON.stringify(result)
            }
            return response;
        })
        .catch(error => {
            response = {
                statusCode: 500,
                body: JSON.stringify(error)
            }
            return response;
        });
}
