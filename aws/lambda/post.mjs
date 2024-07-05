import {DynamoDB} from '@aws-sdk/client-dynamodb';
import {DynamoDBDocument} from '@aws-sdk/lib-dynamodb';

const dynamo = DynamoDBDocument.from(new DynamoDB());

export const handler = async event => {
  try {
    const date = new Date();
    const epoch = date.getTime().toString();
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
          'Access-Control-Allow-Headers':
            'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Method': 'OPTIONS,POST',
          'Access-Control-Allow-Origin': 'https://www.amp2-portal.com',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify('Bad Request'),
      };

    const user = {
      chineseName: json.chineseName ?? notAvailable,
      firstName: json.firstName,
      lastName: json.lastName,
      phone: json.phone ?? notAvailable,
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
      date: date.toString(),
      dataDisclaimer: json.dataDisclaimer,
      payment: json.payment,
      referenceNumber: json.referenceNumber,
      frontDeskAttendee: json.frontDeskAttendee,
      user: user,
      items: items,
    };

    if (user && user.phone) {
      let userParams = {
        TableName: 'TempleReconciliation',
        Item: {
          PK: 'GMT#USER',
          SK: epoch,
          Details: user,
        },
      };

      await dynamo.put(userParams);
    }

    if (donation) {
      const donationParams = {
        TableName: 'TempleReconciliation',
        Item: {
          PK: 'GMT#DONATION',
          SK: epoch,
          Details: donation,
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
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Method': 'OPTIONS,POST',
      },
      body: JSON.stringify(error),
    };
  }
};
