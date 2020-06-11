/*  classes.js
    jack skrable
    02-20-2020
    class definitions
*/

// Retrieve basic site configuration info
var config = siteInfo();


class View {
    /*
        class definition for view. contains a constructor and load() method.
        load uses fetch to grab the associated html from src/frontend/views
        and shoves it into the content div.
    */

    constructor(name) {
        this.name = name;
    }


    load() {
        console.log('removing existing content....');
        $('#content').children().remove();
        // get view html and load over wallpaper div
        console.log('loading ' + this.name + ' page...');
        //var path = this.name != 'home' ? 'views/' + this.name + '.html' : 'index.html'
        fetch('views/' + this.name + '.html')
            .then((response) => response.text())
                .then((data) => {
                    //html += data;
                    //console.log(data);
                    $('#content').append(data);
                    return 0;
                }).catch((error) =>  {
                    console.log(error)
                    return -1;
                });
    }
}


class Project {
    /*
        class definition for a project. contains a constructor and card() method.
        card creates a bootstrap card in html for displaying the project details.
    */

    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.photo = 'assets/projects/' + this.title + '.gif';
        this.repo = 'https://github.com/jskrable/' + this.title;
    }

    card() {
        //console.log(this.photo) 
        // removed width 18 style
        html = '<div class="card bg-light">' +
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


class Photo {
    /*
        class definition for a photo. contains a constructor and card() method.
        card creates a bootstrap card in html for displaying the thumbnail.
    */
    
    constructor(index, key) {
        this.index = index;
        this.key = key;
        this.bucket = config.aws.s3.assets;
        this.thumb = ['https://',this.bucket,'.s3.amazonaws.com/',this.key].join('');
        this.full = this.thumb.split('/').filter(x => x != 'thumbs').join('/');
    }

    card() {
        html = '<div id="thumb-' + this.index + '" class="card bg-light mb-3" style="width: 18rem;">' +
                // works only if GIF exists
                 '<img src="' + this.thumb + '" class="card-img-top">' + 
                '</div>'
        return html;
    }
}
