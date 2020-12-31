/*  photos.js
    jack skrable
    02-20-2020
    controls photograph portfolio display
*/

// Retrieve basic site configuration info
var config = siteInfo();
var photoList;
var carousel;


$( document ).ready(function() {
	listPhotos();

    $('#scroll-top-button').click((e) => {
        console.log('back to the dang top')
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    });

    document.onkeydown = function(e) {
            switch (e.which) {
                case 37: // left
                    console.log('left');
                    fullViewNavigation('left')
                    break;

                case 39: // right
                    console.log('right');
                    fullViewNavigation('right')
                    break;

                default:
                    return; // exit this handler for other keys
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)
        };

});


function fullViewNavigation(arrow) {

    if ($('#full-photo-modal').hasClass('show')) {
        size = photoList.length
        id = eval($('#full-photo').children('img').attr('id'))
        arrow == 'left' ? id -= 1 : id += 1
        id > (size - 1) ? id = 0 : id
        $('#full-photo-modal').remove();
        $('.modal-backdrop').remove();
        fullPhotoModal(id) ;
    };
}

// TRY CAROUSEL??
function fullPhotoModal(id) {

    console.log('id to show ' + id)

    var img = '<img id='+ id + ' src="' + photoList[id].full + '" class="img-fluid" ' +
                  'alt="' + photoList[id].key + '">' 

    html =  '<div id="full-photo-modal" class="modal fade h-100 d-flex flex-column ' + 
            'justify-content-center my-0" tabindex="-1" role="dialog" aria-hidden=' +
            '"true" display="none">' +
              '<div class="modal-dialog modal-xl" role="document">' +
                '<div id="full-photo" class="modal-content">' +
                  img + '</div></div></div>';

    // Add modal html to page
    $('#wallpaper').append(html);
    // Show modal
    $('#full-photo-modal').modal()

    // exit modal
    $('#full-photo-modal').on('hidden.bs.modal', function (e) {
        $(this).remove();
        $('.modal-backdrop').remove();
    });
}


// TRY CAROUSEL??
function carouselModal(carousel) {

    html =  '<div id="photo-carousel-modal" class="modal fade h-100 d-flex flex-column ' + 
            'justify-content-center my-0" tabindex="-1" role="dialog" aria-hidden=' +
            '"true" display="none">' +
              '<div class="modal-dialog modal-xl" role="document">' +
                '<div id="photo-carousel-modal-content" class="modal-content">' +
                  carousel + '</div></div></div>';

    // Add modal html to page
    $('#wallpaper').append(html);
    // Show modal
    //$('#photo-carousel-modal').modal()

    // exit modal
    $('#photo-carousel-modal').on('hidden.bs.modal', function (e) {
        $(this).remove()
    });
}


function createCarousel(list) {

    container = '<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">'
    
    indicators = '<ol class="carousel-indicators">'
    items = '<div class="carousel-inner">'

    list.forEach(
        function(photo, index) {
            if (index == 0) {
                console.log(photo)
                console.log(index)
                console.log('setting ' + photo.key + ' to active')
                indicators += photo.indicator(true);
                items += photo.item(true);
            } else {
                indicators += photo.indicator(false);
                items += photo.item(false);
            }
        });

    indicators += '</ol>'
    items += '</div>'

    controls = '<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">    <span class="carousel-control-prev-icon" aria-hidden="true"></span>    <span class="sr-only">Previous</span>  </a>  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">    <span class="carousel-control-next-icon" aria-hidden="true"></span>    <span class="sr-only">Next</span>  </a>'

    html = container + indicators + items + controls + '</div>'

    carousel = html;

    testHTML = '<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">  <ol class="carousel-indicators">    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>  </ol>  <div class="carousel-inner">    <div class="carousel-item active">      <img class="d-block w-100" src="/css/images/tower.jpg" alt="First slide">    </div>    <div class="carousel-item">      <img class="d-block w-100" src="/css/images/tower.jpg" alt="Second slide">    </div>    <div class="carousel-item">      <img class="d-block w-100" src="/css/images/tower.jpg" alt="Third slide">    </div>  </div>  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">    <span class="carousel-control-prev-icon" aria-hidden="true"></span>    <span class="sr-only">Previous</span>  </a>  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">    <span class="carousel-control-next-icon" aria-hidden="true"></span>    <span class="sr-only">Next</span>  </a></div>'


    $('#photo-carousel-container').append(html);
    $('.carousel').carousel('cycle');


    //carouselModal(carousel);

}


function showPhotos(list) {
	$('#loading').remove();
    $('#scroll-top-button').removeClass('invisible');
    $('#scroll-top-button').addClass('visible');
    var dest = $('#photo-list');
    photoList = list.map((item, index) => new Photo(index, item));

    createCarousel(photoList);

    //$('#photos').append('<br><p>Here are a few more to look through</p><br>');

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

        fullPhotoModal(idx);

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