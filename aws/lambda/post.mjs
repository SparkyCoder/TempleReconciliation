import {DynamoDB} from '@aws-sdk/client-dynamodb';
import {DynamoDBDocument} from '@aws-sdk/lib-dynamodb';

const dynamo = DynamoDBDocument.from(new DynamoDB());

export const handler = async event => {
  try {
    const epoch = new Date().valueOf().toString();
    const notAvailable = '';
    const json = JSON.parse(event.body);

    if (
      !json ||
      !json.dataDisclaimer ||
      !json.payment ||
      !json.frontDeskAttendee ||
      !json.firstName ||
      !json.lastName ||
      !json.items ||
      !json.items.length === 0
    )
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Method': 'OPTIONS,POST',
        },
        body: JSON.stringify('Bad Request'),
      };

    const user = {
      chineseName: json.chineseName ?? notAvailable,
      firstName: json.firstName,
      lastName: json.lastName,
      phone: json.phone.replace(/\D/g, '') ?? notAvailable,
      email: json.email ?? notAvailable,
      street: json.street ?? notAvailable,
      city: json.city ?? notAvailable,
      state: json.state ?? notAvailable,
      zipCode: json.zipCode ?? notAvailable,
    };

    const items = json.items.map(item => ({
      type: item.type ?? notAvailable,
      name: item.name ?? notAvailable,
      amount: item.amount ?? notAvailable,
      className: item.className ?? notAvailable,
      remarks: item.remarks ?? notAvailable,
      relationship: item.relationship ?? notAvailable,
      date: item.date ?? notAvailable,
    }));

    const donation = {
      id: json.id ?? notAvailable,
      date: epoch.toString() ?? notAvailable,
      dataDisclaimer: json.dataDisclaimer ?? notAvailable,
      payment: json.payment ?? notAvailable,
      referenceNumber: json.referenceNumber ?? notAvailable,
      frontDeskAttendee: json.frontDeskAttendee ?? notAvailable,
      user: user,
      items: items,
    };

    const params = {
      TableName: 'TempleReconciliation',
      KeyConditionExpression: 'PK = :PartitionKey',
      ExpressionAttributeValues: {':PartitionKey': 'GMT#USER'},
    };

    if (user && user.phone) {
      let queryResults = await dynamo.query(params);
      let queryItems = (queryResults.Items ??= []);
      let dbUsers = queryItems.map(item => item.Data);
      let matchingUsers = dbUsers.filter(
        dbUser =>
          dbUser.phone.replace(/\D/g, '') === user.phone.replace(/\D/g, ''),
      );
      let userAlreadyExists = matchingUsers.length > 0;

      if (!userAlreadyExists) {
        let userParams = {
          TableName: 'TempleReconciliation',
          Item: {PK: 'GMT#USER', SK: epoch, Data: user},
        };
        await dynamo.put(userParams);
      }
    }

    if (donation) {
      const donationParams = {
        TableName: 'TempleReconciliation',
        Item: {
          PK: 'GMT#DONATION',
          SK: epoch,
          Data: donation,
        },
      };

      await dynamo.put(donationParams);
    }

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Method': 'OPTIONS,POST',
      },
      body: JSON.stringify(donation),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Method': 'OPTIONS,POST',
      },
      body: JSON.stringify(error),
    };
  }
};
