/*  home.js
    jack skrable
    02-21-2020
    script to populate and display homepage
*/

// Retrieve basic site configuration info
var config = siteInfo();


// Get search query
$( document ).ready(function() {

    //$('#content').css("height","100%");

    // FIX ALIGNMENT within column
    var html = '<h2 class="py-3 px-3 text-center">Welcome to ' + config.domain + '</h2>';

    /*html += '<div class="container-fluid text-center">'
    html += '<img src="' + config.images.headshot + 
            '" class="image-fluid" alt="Jack Skrable">'
    html += '</div>'*/


    
    config.bio.forEach(p => html += '<h4 class="py-3 px-1 text-center">' + p + '</h4>');

    $('#home').append(html);

    //resizeBody();
});
