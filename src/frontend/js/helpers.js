/*  helpers.js
    jack skrable
    02-22-2020
    helper functions used across site
*/

// Retrieve basic site configuration info
var config = siteInfo();

function setupLambda() {
    // Cognito pool credentials
    AWS.config.update({
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: config.aws.cognito.poolID
            }),
          region: config.aws.region
        });

    // Config lambda
    var lambda = new AWS.Lambda({region: config.aws.region});
    return lambda;  
}


function triggerLambda(params, destination) {

    var results;
    var lambda = setupLambda();
    request = lambda.invoke(params);
    request.on('success', function(response) {
        if (response.error) {
        // HANDLE THIS
            console.log(response.error)
        } else {
        // we can use response.data here
            results = JSON.parse(JSON.parse(response.data.Payload).body);
            console.log(results)
            window[destination](results);
        }
        }).send();

}