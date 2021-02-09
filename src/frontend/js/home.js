/*  home.js
    jack skrable
    02-21-2020
    script to populate and display homepage
*/

// Retrieve basic site configuration success
var config = siteInfo();


// Get search query
$( document ).ready(function() {

    // push these left align
    var html = '<h1 class="py-3 px-1 text-left">Welcome to ' + config.domain + '</h1>';

    /*html += '<div class="container-fluid text-center">'
    html += '<img src="' + config.images.headshot + 
            '" class="image-fluid" alt="Jack Skrable">'
    html += '</div>'*/

    config.bio.forEach(p => html += '<h4 class="py-3 px-1 text-left">' + p + '</h4>');

    alignBio();

    $('#home').append(html);

    links = '<a href="' + config.socials.github.url + '" target="_blank" ' +
             'class="btn btn-light btn-lg" role="button">' +
             '<img src="' + config.socials.github.icon + '" width=22> Github</a>'

    links += '<a href="' + config.socials.linkedin.url + '" target="_blank" ' +
             'class="btn btn-light btn-lg" role="button">' +
             '<img src="' + config.socials.linkedin.icon + '" width=22> LinkedIn</a>'

    links += '<a href="assets/jack-skrable.pdf" download="jack-skrable.pdf" ' +
             'class="btn btn-light btn-lg" role="button">' +
             '<img src="css/images/download.svg"> Resume/CV</a>'


    $('#links').append(links);
    justifyButtonGroup('links');

});


function justifyButtonGroup(id) {
    var group = $('#' + id);
    if($(window).width() > 768) {
        group.addClass('btn-group').removeClass('btn-group-vertical');
    } else {
        group.removeClass('btn-group').addClass('btn-group-vertical');
    }
}


function alignBio() {
    if (!mobile) {
        $('#home').css("width", "65%")
    }
}
