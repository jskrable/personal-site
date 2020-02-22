/*  photos.js
    jack skrable
    02-20-2020
    controls photograph portfolio display
*/

// Retrieve basic site configuration info
var config = siteInfo();


// Get search query
$( document ).ready(function() {
	listPhotos();
    
});



function showPhotos(list) {
	$('#loading').remove();
    var dest = $('#photo-list');
    list.map(item => new Photo(item)).forEach(
		function(photo) {
			dest.append(photo.card());
		});
    // hover function
    var shadow = 'shadow-lg bg-yellow rounded';
    dest.on('mouseenter', '.card', function() {
        $(this).addClass(shadow);
    });
    dest.on('mouseleave', '.card', function() {
        $(this).removeClass(shadow);
    });

    // ADD FUNCTION to popup full photo modal on click
}

function listPhotos() {

	payload = {
		"bucket": config.aws.s3.assets,
		"path": "photos/thumbs"
	}
    // Setup lambda call
    var params = {
        FunctionName: config.aws.lambda.listAssets,
        InvocationType: 'RequestResponse',
        LogType: 'Tail',
        Payload: JSON.stringify(payload)
        };

    triggerLambda(params, 'showPhotos');
    /*var results;
    var lambda = setupLambda();
	request = lambda.invoke(params);
    request.on('complete', function(response) {
		if (response.error) {
		// an error occurred, handle it
			console.log(response.error)
		} else {
		// we can use response.data here
			results = JSON.parse(JSON.parse(response.data.Payload).body);
			showPhotos(results);
		}
		}).send();*/
}