/*  projects.js
    jack skrable
    02-21-2020
    class definition for a project
*/

// Retrieve basic site configuration info
var config = siteInfo();
var temp;

var projectList = config.projects.map(
    x => {
        var key = x.title.split('-')[0].toLowerCase(); 
        this[key] = new Project(x.title, x.description, x.github)
        return this[key]
    });


// ADD BIG POPUP MODAL WHEN CLICKING ON CARD

function detailModal(project) {

    console.log('id to show ' + project)

    html =  '<div id="project-detail-modal" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">'
    html += '<div class="modal-dialog modal-lg modal-dialog-centered">'
    html += '<div class="modal-content">'
    html += '<div class="modal-header">'
    html += '<h2>'
    html += project.title 
    html += '</h2>'
    html += '</div>'
    html += '<div class="modal-content">'
    html += '<img src="' + project.photo + '" class="card-img-top">'
    html += '<div class="container py-3 px-3"'
    html += '<p>' + project.description + '</p>'
    html += '</div>'
    html += '</div>'
    html += '<div class="modal-footer">'
    html += '<a href="' + project.repo + '" target="_blank" class="btn btn-primary">View on Github</a>'
    html += '<button type="button" class="btn btn-secondary" data-dismiss="modal">'
    html += 'Close</button>'
    html += '</div>'

    html += '</div></div></div>'

    // Add modal html to page
    $('#wallpaper').append(html);
    // Show modal
    $('#project-detail-modal').modal()

    // exit modal
    $('#project-detail-modal').on('hidden.bs.modal', function (e) {
        $(this).remove();
        $('.modal-backdrop').remove();
    });

}


function showCards(projectList) {

    $('#loading').remove();
    var dest = $('#project-list');
    projectList.forEach(
        x => {
            dest.append(x.card())
        });


    // Card hover animations
    dest.on('mouseenter', '.card', function() {
        $(this).removeClass('bg-light');
        $(this).addClass('bg-dark');
        $(this).find('#project-title').addClass('text-white');
        $(this).find('#project-text').addClass('text-white');
    });

    dest.on('mouseleave', '.card', function() {
        $(this).removeClass('bg-dark');
        $(this).addClass('bg-light');
        $(this).find('#project-title').removeClass('text-white');
        $(this).find('#project-text').removeClass('text-white');
    });

    // card click function
    dest.on('click', '.card', function() {
        id = this.getAttribute("id");
        console.log(id);
        detailModal(projectList.filter(x => x.title == id)[0]);


    });

    

}

$( document ).ready(function() {
    showCards(projectList);    
    $('#content').change(function() {
        console.log('content change')
        $(this).css("height", $('#projects').height() + 100);
    })
});
