/*  contact.js
    jack skrable
    02-18-2020
    controls contact form submission and reset
*/

// Retrieve basic site configuration info
var config = siteInfo();

// Get search query
$( document ).ready(function() {
        $('#submit').click((e) => {
            submission = {
                "name": $('#contact-name').val(),
                "email": $('#contact-email').val(),
                "phone": $('#contact-phone').val(),
                "message": $('#contact-message').val()
            };

            console.log(submission);

            // Setup lambda call
            var params = {
                FunctionName: 'processContactForm',
                InvocationType: 'RequestResponse',
                LogType: 'Tail',
                Payload: '{"submission": ' + JSON.stringify(submission) + '}'
                };
            console.log(params);
            triggerLambda(params);
            
        })
    });

    /*// Include enters for clicks
    $('#search').keypress((e) => {
    if ( e.which == 13 ) {
        $('#submit').click();
        }   
    });*/

function triggerLambda(params) {

    // Cognito pool credentials
    //AWS.config.update({region: 'us-east-1'});
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:67de684f-034b-4fa9-a22a-ad307422b6b0',
    });
    console.log(AWS.config.credentials);

    // Config lambda
    var lambda = new AWS.Lambda({region: 'us-east-1', apiVersion: '2015-03-31'});
    // Initialize results
    var results;
    // Call lambda
    lambda.invoke(params, function(error, data) {
        if (error) {
            prompt(error);
            window.alert(JSON.parse(error));
        } else {    
            window.message = JSON.parse(data.Payload);
            console.log(message);

            if (message != null) {
                var response = message['body'];
                console.log(response);
                // Display results 
                doModal(response);

            }

        }
    });

}
