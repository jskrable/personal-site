/*  projects.js
    jack skrable
    02-21-2020
    class definition for a project
*/

// Retrieve basic site configuration info
var config = siteInfo();


class Project {

    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.photo = 'css/images/projects/' + this.title + '.gif';
        this.repo = 'https://github.com/jskrable/' + this.title;
    }

    card() {
/*        html = '<div class="card bg-light mb-3">' +
                 '<div id="project-title" class="card-header text-bold">' +
                   this.title + 
                 '</div>' +
                 '<p class="py-1 px-1">' + this.description + '</p>'
               '</div>';*/

        html = '<div class="card bg-light mb-3" style="width: 18rem;">' +
                // works only if GIF exists
                 /*'<img src="' + this.photo '" class="card-img-top">' + */
                 '<div class="card-body">' + 
                   '<h5 id="project-title" class="card-title">' + this.title + '</h5>' +
                   '<p class="card-text">' + this.description + '</p>' +
                   '<a href="' + this.repo + '" target="_blank" class="btn btn-primary">View on Github</a>' +
                 '</div></div>'

        return html;
    }
}

var projects = config.projects.map(
    x => {
        let key = x.title.split('-')[0].toLowerCase(); 
        console.log(key);
        this[key] = new Project(x.title, x.description)
        return this[key]
    });


function showCards(projects) {

    $('#loading').remove();
    var dest = $('#project-list');
    projects.forEach(
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


// Get search query
$( document ).ready(function() {
    showCards(projects);    
});
