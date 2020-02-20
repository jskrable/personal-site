/*  view.js
    jack skrable
    02-20-2020
    class creation for a page viewer
*/

// Retrieve basic site configuration info
var config = siteInfo();


class View {

    constructor(name) {
        this.name = name;
        /*this.html = fetchHTML('views/' + this.name + '.html').then(
            (response) => {return response});*/
    }

    /*get html() {
        return this.html;
    }*/

    load() {
        // clear url
        // pin a hash to url
        console.log('removing existing content....');
        $('#wallpaper').children().remove();
        console.log('loading ' + this.name + ' page...');
        fetchHTML('views/' + this.name + '.html')
            .then((response) => 
                $('#wallpaper').append(response));
        return 0;
    }
}