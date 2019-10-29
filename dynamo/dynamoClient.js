const AWS = require('aws-sdk')

const makeDynamoClient = (settings) => {
    return new AWS.DynamoDB.DocumentClient(settings);
}

module.exports.connect = settings => {
    dynamoClient = makeDynamoClient(settings);
}

module.exports.putItem = item => {
    return dynamoClient.put(item).promise().then(() => {
        return item;
    });
};