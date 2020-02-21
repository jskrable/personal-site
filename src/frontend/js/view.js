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
        console.log('removing existing content....');
        $('#wallpaper').children().remove();
        // get view html and load over wallpaper div
        console.log('loading ' + this.name + ' page...');
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