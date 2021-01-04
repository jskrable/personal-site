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
        if (this.title.split('/').length > 1) {
            this.repo = 'https://github.com/' + this.title;
        } else {
            this.repo = 'https://github.com/jskrable/' + this.title;
        }
    }

    card() {
        //console.log(this.photo) 
        if (this.description.length > 100) {
            var desc = this.description.substring(0,100) + '...';
        } else {
            var desc = this.description;
        }

        html = '<div id="'+this.title+'"class="card bg-light">' +
            // works only if GIF exists
            '<img src="' + this.photo + '" class="card-img-top">' +
            '<div class="card-body">' +
            '<h5 id="project-title" class="card-title">' + this.title + '</h5>' +
            '<p id="project-text" class="card-text">' + desc + '</p>' +
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
            '<img src="' + this.thumb + '" class="card-img-top" alt="' + this.key + '">' + '</div>'
        return html;
    }

    indicator(active) {
        if (active) {
            html = '<li data-target="#carouselExampleIndicators" class="active" data-slide-to="' + this.index + '"></li>';
        } else {
            html = '<li data-target="#carouselExampleIndicators" data-slide-to="' + this.index + '"></li>';
        }

        return html;
    }

    item(active) {
        if (active) {
            html = '<div class="carousel-item active"><img src="' + this.full + '" class="d-block w-100" alt="..."></div>';
        } else {
            html = '<div class="carousel-item"><img src="' + this.full + '" class="d-block w-100" alt="..."></div>';
        }

        return html;
    }


}