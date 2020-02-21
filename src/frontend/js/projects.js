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
        this.photo = 'css/images/projects/' + this.title + '.jpg';
        this.repo = 'https://github.com/jskrable/' + this.title;
    }

    card() {
        html = '<div class="card bg-light mb-3">' +
                 '<div id="project-title" class="card-header">' +
                   this.title + 
                 '</div>' +
                 '<p>' + this.description + '</p>'
               '</div>'

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

    var dest = $('#project-list-container');
    dest.children().remove();
    projects.forEach(x => {
        dest.append(x.card())});
}