/*  home.js
    jack skrable
    02-21-2020
    class definition for a project
*/

// Retrieve basic site configuration info
var config = siteInfo();


// Get search query
$( document ).ready(function() {

    var html = '<img src="' + config.images.headshot + '" class="rounded-circle px-1 py-1">' +
               '<h4 class="font-weight-bold py-3 px-1">' + config.bio + '</h4>';
    $('#home-content').append(html);
});
