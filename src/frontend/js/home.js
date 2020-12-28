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
    var html = //'<img src="' + config.images.headshot + 
    		   //'" class="rounded-circle px-3 py-1 ml-4" alt="Jack Skrable">' +
    		   '<h2 class="py-3 px-3 text-center">Welcome to ' + config.domain + '</h2>' +
               '<h4 class="py-3 px-1 text-center">' + config.bio + '</h4>' +
               '<h3 class="py-3 px-1 text-center">Have a look around!</h4>';
               
    $('#home').append(html);
});
