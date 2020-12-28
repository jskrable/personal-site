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
                //this.resize();
                return 0;
            }).catch((error) => {
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
        //console.log(this.photo) 

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

    constructor(index, key) {
        this.index = index;
        this.key = key;
        this.bucket = config.aws.s3.assets;
        this.thumb = ['https://', this.bucket, '.s3.amazonaws.com/', this.key].join('');
        this.full = this.thumb.split('/').filter(x => x != 'thumbs').join('/');
    }

    card() {
        html = '<div id="thumb-' + this.index + '" class="card bg-light mb-3">' +
            // works only if GIF exists
            '<img src="' + this.thumb + '" class="card-img-top">' +
            '</div>'
        return html;
    }

    indicator() {
        html = '<li id="carousel-li-' + this.index + '" data-target="#carouselExampleIndicators" data-slide-to="' + this.index + '"></li>';

        return html;
    }

    item() {
        html = '<div id="carousel-item-' + this.index + '" class="carousel-item"><img src="' + this.full + '" class="d-block w-100" alt="..."></div>';
        return html;
    }


}