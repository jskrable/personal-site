/*  project.js
    jack skrable
    02-21-2020
    class definition for a project
*/

// Retrieve basic site configuration info
var config = siteInfo();


class Project {

    constructor(title) {
        this.title = title;
        this.description = description;
    }

    get photo() {
        path = 'css/images/projects/' + this.title + '.jpg';
        return path;
    }
}