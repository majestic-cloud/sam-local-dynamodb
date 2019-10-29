## Just a short little test/demo of running DynamoDB locally



### Commands used:

- create a docker network for local lambda:
```bash
docker network create lambda-local
```

- start local DynamoDB docker container / on first run it will take some time as it downloads the container
```bash
docker run --network=lambda-local --name dynamo -p 8000:8000 amazon/dynamodb-local
```

- check DynamoDB local tables
```bash
aws dynamodb list-tables --endpoint-url http://127.0.0.1:8000
```

- create a local DynamoDB table
```bash
aws dynamodb create-table --table-name USERS --attribute-definitions AttributeName=USER_ID,AttributeType=S --key-schema AttributeName=USER_ID,KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 --endpoint-url=http://127.0.0.1:8000
```

- invoke a local Lambda function in the docker network
```bash
sam local invoke dynamoOps --event events/event.json --docker-network lambda-local
```

- list items from the local DynamoDB table
```bash
aws dynamodb scan --table-name USERS --endpoint-url http://127.0.0.1:8000
```
