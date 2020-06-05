/*  helpers.js
    jack skrable
    02-22-2020
    helper functions used across site
*/

// Retrieve basic site configuration info
var config = siteInfo();

function setupLambda() {
    // Cognito pool credentials
    console.log('setting up lambda')
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
    lambda.invoke(params, function(err, response) {
        if (err) {
            handleHTTPError(err);
            //console.log(err, err.stack);
        } else {
            results = JSON.parse(JSON.parse(response.Payload).body);;
            //console.log(results)
            window[destination](results);
            return results;
        }
    })

}


function handleHTTPError(err) {
    
    html = '<div id="response-modal" class="modal fade h-100 d-flex flex-column justify-content-center my-0" tabindex="-1" role="dialog" aria-hidden="true">' +
             '<div class="modal-dialog" role="document">' +
               '<div class="modal-content">' +
                 '<div class="modal-body">' +
                   '<h3 class="text-center">There was an issue retrieving the data. Blame Bezos, not me.</h3>' +
                 '</div>' +
                 '<div class="row justify-content-center">' +
                   '<div class="modal-footer">' +
                     '<button type="button" class="btn btn-primary text-center" data-dismiss="modal" type="reset">Close</button>' + 
            '</div></div></div></div></div>';

    // Add modal html to page
    $('#content').append(html);
    // Show modal
    $('#response-modal').modal();

    // exit modal
    $('#response-modal').on('hidden.bs.modal', function (e) {
        $(this).remove()
    });
}