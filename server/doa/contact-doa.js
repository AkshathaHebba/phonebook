const AWS = require('aws-sdk');

// Configure AWS Region
AWS.config.update({
    region: 'us-east-1',
});

// Make sure the credentials are set only if the context is not on AWS_LAMBDA
if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
    // Set the AWS Credentials to be used.
    AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: 'aws-student' });
}

const docClientScanPromisified = (params) => new Promise((resolve, reject) => {
    // Create a AWS DynamoDB Document Client.
    const docClient = new AWS.DynamoDB.DocumentClient();
    docClient.scan(params, (err, data) => {
        if (err) {
            return reject(err);
        }
        resolve(data);
    });
});

const getContacts = async () => {
    // Create the params to be passed to the Document client.
    const params = {
        TableName: 'contacts',
    };

    // Fetch the Data from the Table
    const data = await docClientScanPromisified(params);

    // Return the Items to the Caller.
    return data?.Items || [];
};

module.exports = {
    getContacts,
};
