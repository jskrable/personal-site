/*  home.js
    jack skrable
    02-21-2020
    class definition for a project
*/

// Retrieve basic site configuration info
var config = siteInfo();


// Get search query
$( document ).ready(function() {

    //$('#content').css("height","100%");

    // FIX ALIGNMENT within column
    // THIS SHIT IS NASTY AS HELL DOG
    var html = '<img src="' + config.images.headshot + 
    		   '" class="rounded-circle px-3 py-1" alt="Jack Skrable">' +
               '<h4 class="py-3 px-1 text-center">' + config.bio + '</h4>';
    $('#home').append(html);
});
