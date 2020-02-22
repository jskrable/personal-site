/*  projects.js
    jack skrable
    02-21-2020
    class definition for a project
*/

// Retrieve basic site configuration info
var config = siteInfo();

var projectList = config.projects.map(
    x => {
        var key = x.title.split('-')[0].toLowerCase(); 
        console.log(key);
        this[key] = new Project(x.title, x.description)
        return this[key]
    });


// SCROLL NOT ALLOWED ON PROJECT VIEW FOR SOME REASON
function showCards(projectList) {

    $('#loading').remove();
    var dest = $('#project-list');
    projectList.forEach(
        x => {
            dest.append(x.card())
        });

    // Card hover animations
    // NEED TO FIX TITLES ON THIS
    dest.on('mouseenter', '.card', function() {
        $(this).removeClass('bg-light');
        $(this).addClass('bg-dark');
        $(this).find('#project-title').addClass('text-white');
    });

    dest.on('mouseleave', '.card', function() {
        $(this).removeClass('text-white bg-dark');
        $(this).find('#project-title').removeClass('text-white');
        $(this).addClass('bg-light');
    });
}

$( document ).ready(function() {
    showCards(projectList);    
});
