/*  contact.js
    jack skrable
    02-18-2020
    controls contact form submission and reset
*/

// Retrieve basic site configuration info
var config = siteInfo();
var fields = ['name','email','phone','message']

// Get search query
$( document ).ready(function() {
    $('#submit').click((e) => {
        submission = {
            "name": $('#contact-name').val(),
            "email": $('#contact-email').val(),
            "phone": $('#contact-phone').val(),
            "message": $('#contact-message').val()
        };


        // NEED TO VALIDATE DATA HERE
        console.log(submission);

        // Setup lambda call
        var params = {
            FunctionName: config.aws.lambda.contact,
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



// Create modal for response display 
function displaySubmission(message) {

    html = '<div id="response-modal" class="modal fade h-100 d-flex flex-column justify-content-center my-0" tabindex="-1" role="dialog" aria-hidden="true">' +
             '<div class="modal-dialog" role="document">' +
               '<div class="modal-content">' +
                 '<div class="modal-body">' +
                   '<h3 class="text-center">' + message + '</h3>' +
                 '</div>' +
                 '<div class="row justify-content-center">' +
                   '<div class="modal-footer">' +
                     '<button type="button" class="btn btn-primary text-center" data-dismiss="modal" type="reset">Close</button>' + 
            '</div></div></div></div></div>';

    // Add modal html to page
    $('#wallpaper').append(html);
    // Show modal
    $('#response-modal').modal()

    // exit modal and clear form
    $('#response-modal').on('hidden.bs.modal', function (e) {
        $(this).remove()
        $('#contact-name').val('');
        $('#contact-email').val('');
        $('#contact-phone').val('');
        $('#contact-message').val('');
    });

}



// REWRITE THIS...
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
            //prompt(error);
            window.alert(JSON.parse(error));
        } else {    
            window.message = JSON.parse(data.Payload);
            console.log(message);
            if (message != null) {
                var response = message['body'];
                console.log("Response: " + response);
                displaySubmission('Thanks for your submission. I\'ll be in contact with you soon.');
            }
        }
    });

}
