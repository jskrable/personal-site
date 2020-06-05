/*  photos.js
    jack skrable
    02-20-2020
    controls photograph portfolio display
*/

// Retrieve basic site configuration info
var config = siteInfo();


$( document ).ready(function() {
	listPhotos();

    $('#scroll-top-button').click((e) => {
        console.log('back to the dang top')
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    });
});



// TRY CAROUSEL??
function fullPhotoModal(img) {

    html =  '<div id="full-photo-modal" class="modal fade h-80 d-flex flex-column ' + 
            'justify-content-center my-0" tabindex="-1" role="dialog" aria-hidden=' +
            '"true" display="none">' +
              '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span></button>' +
              '<div class="modal-dialog modal-xl" role="document">' +
                '<div id="full-photo" class="modal-content">' +
                  img + '</div></div></div>';

    // Add modal html to page
    $('#content').append(html);
    // Show modal
    $('#full-photo-modal').modal()

    // exit modal and clear form
    $('#full-photo-modal').on('hidden.bs.modal', function (e) {
        $(this).remove()
    });
}


function showPhotos(list) {
	$('#loading').remove();
    var dest = $('#photo-list');
    var photoList = list.map((item, index) => new Photo(index, item));
    photoList.forEach(
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
    dest.on('click', '.card', function() {
        var idx = $(this).attr('id').split('-')[1];
        var img = '<img src="' + photoList[idx].full + '" class="img-fluid" ' +
                  'alt="' + photoList[idx].key + '">'
        fullPhotoModal(img);
    });
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
}