/*  photos.js
    jack skrable
    02-20-2020
    controls photograph portfolio display
*/

// Retrieve basic site configuration info
var config = siteInfo();


// Get search query
$( document ).ready(function() {
	listPhotos()
    
});


function listPhotos() {

	request = {
		"bucket": config.aws.s3.assets,
		"path": "photos"
	}
    // Setup lambda call
    var params = {
        FunctionName: config.aws.lambda.listAssets,
        InvocationType: 'RequestResponse',
        LogType: 'Tail',
        Payload: JSON.stringify(request)
        };
    console.log(params);
    var photoList = triggerLambda(params);
    return photoList;
}



// REWRITE AND ABSTRACT SO WE CAN USE IN contact.js ALSO
function triggerLambda(params) {

    // Cognito pool credentials
    AWS.config.update({
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: config.aws.cognito.poolID
            }),
          region: config.aws.region
        });

    // Config lambda
    var lambda = new AWS.Lambda({region: config.aws.region});
    // Initialize results
    var results;
    // Call lambda
    // CATCH REAL ERRORS FROM THE LAMBDA HERE
    lambda.invoke(params, function(error, data) {
        if (error) {
            console.log(error);
        } else {    
            window.message = JSON.parse(data.Payload);
            console.log(message);
            if (message != null) {
                var response = message['body'];
                console.log("Response: " + response);
                return response;
            }
        }
    });

}