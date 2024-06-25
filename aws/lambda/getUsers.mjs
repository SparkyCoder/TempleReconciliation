import {DynamoDB} from '@aws-sdk/client-dynamodb';
import {DynamoDBDocument} from '@aws-sdk/lib-dynamodb';

const dynamo = DynamoDBDocument.from(new DynamoDB());

export const handler = async event => {
  try {
    const params = {
      TableName: 'TempleReconciliation',
      KeyConditionExpression: 'PK = :PartitionKey',
      ExpressionAttributeValues: {':PartitionKey': 'GMT#USER'},
    };

    let queryResults = await dynamo.query(params);
    let queryItems = (queryResults.Items ??= []);

    const results = queryItems.map(item => {
      return {
        id: item.SK,
        data: item.Data,
      };
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Method': 'OPTIONS,GET',
      },
      body: JSON.stringify(results),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Method': 'OPTIONS,GET',
      },
      body: JSON.stringify(error),
    };
  }
};
