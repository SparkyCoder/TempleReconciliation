import {DynamoDB} from '@aws-sdk/client-dynamodb';
import {DynamoDBDocument} from '@aws-sdk/lib-dynamodb';

const dynamo = DynamoDBDocument.from(new DynamoDB());

export const handler = async event => {
  try {
    let expression = {};

    switch (event.resource) {
      case '/v1/users':
        expression = {':PartitionKey': 'GMT#USER'};
        break;
      case '/v1/payments':
        expression = {':PartitionKey': 'GMT#PAYMENT'};
        break;
      case '/v1/donations/types':
        expression = {':PartitionKey': 'GMT#DONATION#TYPE'};
        break;
      case '/v1/donations/pins':
        expression = {':PartitionKey': 'GMT#FRONTDESK#PIN'};
        break;
      case '/v1/donations':
        expression = {':PartitionKey': 'GMT#DONATION'};
        break;
    }

    var params = {
      TableName: 'TempleReconciliation_Dev',
      KeyConditionExpression: 'PK = :PartitionKey',
      ExpressionAttributeValues: expression,
    };

    if (
      event.resource === '/v1/donations' &&
      (!event?.queryStringParameters ||
        !event?.queryStringParameters?.from ||
        !event?.queryStringParameters?.to)
    ) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Method': 'OPTIONS,GET',
        },
        body: JSON.stringify('Bad Request'),
      };
    }

    if (
      event.resource === '/v1/donations' &&
      event?.queryStringParameters &&
      event?.queryStringParameters?.from &&
      event?.queryStringParameters?.to
    ) {
      params = {
        TableName: 'TempleReconciliation_Dev',
        KeyConditionExpression:
          'PK = :PartitionKey AND SK BETWEEN :From AND :To',
        ExpressionAttributeValues: {
          ':PartitionKey': 'GMT#DONATION',
          ':From': event.queryStringParameters.from,
          ':To': event.queryStringParameters.to,
        },
      };
    }

    let queryResults = await dynamo.query(params);
    let queryItems = (queryResults.Items ??= []);

    const results = queryItems.map(item => item.Data);

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
