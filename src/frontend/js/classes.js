/*  classes.js
    jack skrable
    02-20-2020
    class definition for a view
*/

// Retrieve basic site configuration info
var config = siteInfo();


class View {

    constructor(name) {
        this.name = name;
    }


    load() {
        console.log('removing existing content....');
        $('#wallpaper').children().remove();
        // get view html and load over wallpaper div
        console.log('loading ' + this.name + ' page...');
        //var path = this.name != 'home' ? 'views/' + this.name + '.html' : 'index.html'
        fetch('views/' + this.name + '.html')
            .then((response) => response.text())
                .then((data) => {
                    //html += data;
                    //console.log(data);
                    $('#wallpaper').append(data);
                    return 0;
                }).catch((error) =>  {
                    console.log(error)
                    return -1;
                });
    }
}


class Project {

    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.photo = 'assets/projects/' + this.title + '.gif';
        this.repo = 'https://github.com/jskrable/' + this.title;
    }

    card() {
        console.log(this.photo) 

        html = '<div class="card bg-light mb-3" style="width: 18rem;">' +
                // works only if GIF exists
                 '<img src="' + this.photo + '" class="card-img-top">' + 
                 '<div class="card-body">' + 
                   '<h5 id="project-title" class="card-title">' + this.title + '</h5>' +
                   '<p class="card-text">' + this.description + '</p>' +
                   '<a href="' + this.repo + '" target="_blank" class="btn btn-primary">View on Github</a>' +
                 '</div></div>'

        return html;
    }
}


/*class Photo {

    constructor(title) {
        this.title = title;
        this.description = description;
        this.photo = 'css/images/projects/' + this.title + '.gif';
        this.repo = 'https://github.com/jskrable/' + this.title;
    }

    card() {
        console.log(this.photo) 

        html = '<div class="card bg-light mb-3" style="width: 18rem;">' +
                // works only if GIF exists
                 '<img src="' + this.photo + '" class="card-img-top">' + 
        return html;
    }
}
*/