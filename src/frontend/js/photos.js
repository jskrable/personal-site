/*  photos.js
    jack skrable
    02-20-2020
    controls photograph portfolio display
*/

// Retrieve basic site configuration info
var config = siteInfo();


// Get search query
$( document ).ready(function() {
	showPhotos();
    
});



function showPhotos() {
	listPhotos()
		.then(x => {
			console.log(x)
		});
}

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

    // this is a promise 
    var response;
    response = triggerLambda(params).then(function(error, data) {
    	if (error) {
    		console.log(error)
    	} else {
    		response = data;
    	}
    });
    //console.log(response);
    //photoList = JSON.parse(response['body']);
    return response;
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
    lambda.invoke(params, function(err, data) {
    	if (err) console.log(err, err.stack);
    	else {
    		if (this.data.StatusCode != 200) console.log('non 200 response');
    		else {
    			//console.log(JSON.parse(JSON.parse(this.data.Payload).body));
    			results = JSON.parse(JSON.parse(this.data.Payload).body);
    			return results;
    		}
    	}
    });
}