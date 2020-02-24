/*  photos.js
    jack skrable
    02-20-2020
    controls photograph portfolio display
*/

// Retrieve basic site configuration info
var config = siteInfo();


$( document ).ready(function() {
	listPhotos();
});



// TRY CAROUSEL??
function fullPhotoModal(img) {

    html =  '<div id="full-photo-modal" class="modal fade h-100 d-flex flex-column ' + 
            'justify-content-center my-0" tabindex="-1" role="dialog" aria-hidden=' +
            '"true" display="none">' +
              '<div class="modal-dialog modal-lg" role="document">' +
                '<div id="full-photo" class="modal-content">' +
                  img + '</div></div></div>';

    // Add modal html to page
    $('#wallpaper').append(html);
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
    $('.footer').on('mouseenter', '.img', function() {
        $(this).addClass(shadow);
    });
    $('.footer').on('mouseleave', '.img', function() {
        $(this).removeClass(shadow);
    });

    // ADD FUNCTION to popup full photo modal on click
    dest.on('click', '.card', function() {
        var idx = $(this).attr('id').split('-')[1];
        var img = '<img src="' + photoList[idx].full + '" class="img-fluid rounded-sm" ' +
                  'alt="' + photoList[idx].key + '">'
        fullPhotoModal(img);
    });

    // resize content div to allow scroll
    $('#content').css("height", $('#photos').height() + 100);
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