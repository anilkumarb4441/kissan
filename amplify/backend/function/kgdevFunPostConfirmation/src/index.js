/* Amplify Params - DO NOT EDIT
	API_KGDEV_GRAPHQLAPIENDPOINTOUTPUT
	API_KGDEV_GRAPHQLAPIIDOUTPUT
	API_KGDEV_GRAPHQLAPIKEYOUTPUT
	API_KGDEV_ROLEUSERTABLE_ARN
	API_KGDEV_ROLEUSERTABLE_NAME
	API_KGDEV_USERTABLE_ARN
	API_KGDEV_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();



async function createUser(id, userId, access, phone_number){
  let date = new Date();
 const params = {
      TableName: process.env.USERTABLE,
      /* Item properties will depend on your application concerns */
      Item: {
         id:  id,
         user_id: userId,
         access: access,
         phone_number: phone_number,
         last_login: date.toISOString()
      }
    }

    await docClient.put(params).promise();
}

async function createUserRole(id, userId, access, categoryType, subCategoryType, role){

 const params = {
      TableName: process.env.USERROLETABLE,
      /* Item properties will depend on your application concerns */
      Item: {
         id:  id,
         user_id:  userId,
         category: categoryType,
         role: role
      }
    }

    await docClient.put(params).promise();
}

exports.handler = async (event, context, callback) => {

  console.info("EVENT\n" + JSON.stringify(event, null, 2))
  console.info("CONTEXT\n" + JSON.stringify(context, null, 2))

  try {
        let id = event.request.userAttributes.phone_number;
        let userId = event.request.userAttributes.name;
        let phone_number = event.request.userAttributes.phone_number;
        let access = event.request.userAttributes['custom:access'];  //farmer, dealer,others, serviceProvider
        //let kgrole = event.request.userAttributes['custom:kgrole'];

        await createUser(id, userId, access, phone_number)
        console.info("CREATED USER: " + id);
        //await createUserRole(id, userId, access, "","","");// role will created when he chooses to be one
        //console.info("CREATED USER ROLE: " + access);


        const response = {
            statusCode: 200,
        //  Uncomment below to enable CORS requests
         headers: {
             "Access-Control-Allow-Origin": "*",
             "Access-Control-Allow-Headers": "*"
         },
            body: JSON.stringify('Successfully created item!'),
        };
        event.response.autoVerifyEmail = true;
        event.response.autoConfirmUser = true;
        event.response.autoVerifyPhone = true;
        context.succeed(event);
    return response;
  } catch (err) {
    context.fail(err);
    return { error: err }
  }
};


