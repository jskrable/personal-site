/*  view.js
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
        // clear url
        // pin a hash to url
        console.log('removing existing content....');
        $('#wallpaper').children().remove();
        // get view html and load over wallpaper div
        console.log('loading ' + this.name + ' page...');
        fetchHTML('views/' + this.name + '.html')
            .then((response) => 
                $('#wallpaper').append(response))
            .catch((error) => 
                console.log(error));
        return 0;
    }
}