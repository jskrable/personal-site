/*  navigation.js
    jack skrable
    02-12-2020
    main controller script for site    
*/

// Retrieve basic site configuration info
var config = siteInfo();

// jQuery called on page load
$(function() {
    render();
    // uncomment for construction page default
    //$('.body').load('views/construction.html');
});


function fetchHTML(path) {
    var html = fetch(path).then(
        (response) => response.text()).then(
        (data) => {
            //html += data;
            console.log(data);
            return data;
        });

    return html;
}



// Create three basic divs for nav, content, and footer
function baseContainers() {
    html = '<header id="header"><div id="navbar"></div></header>';
    //html += '<div id="content"></div>';
    html += '<footer><div id="footer" class="fixed-bottom d-flex justify-content-center"></div></footer>';
    return html;
}


function loadWallpaper() {
    $('#wallpaper').remove();
    var wallpaper = '<div id="wallpaper" class="view" style="background-image: url(\'' 
        + config.images.home
        + '\'); background-repeat: no-repeat; background-size: cover; background-position: center center;">'
    $('#header').append(wallpaper);
}


// change this to use fetchHTML
function loadHome() {
    console.log('loading home page...');
    // find a way to dynamically add content to the header to keep in on the bg image
    //$('#header').append('views/home.html');
    // need to center headshot within column
    var info = '<div class="mask align-items-left"><div class="container py-5 px-5">'
             + '<div class="row mt-5 px-5"><div class="col-md-6 white-text text-md-left">'
             + '<img src="' + config.images.headshot + '" class="rounded-circle px-1 py-1">'
             + '<h4 class="font-weight-bold py-3 px-1">'
             + config.bio
             + '</h4></div></div></div></div>';
    $('#wallpaper').append(info);
}


// USE THIS AS MODEL
function loadContact() {
    console.log('loading contact page...');
    fetchHTML('views/contact.html')
        .then((response) => 
            $('#wallpaper').append(response));
}


// change this to use fetchHTML
function drawNavbar() {

    function drawLinks(section) {
        var html = '';
        var id = 'nav-' + section.toLowerCase();
        var href = '#' + section.toLowerCase();
        var click = 'load' + section + '();';

        html += '<li class="nav-item">'
             +    '<a class="nav-link" href="' + href + '" '
             +      'onclick="' + click + '" '
             +      'id="' + id + '">' + section + '</a>'
             +  '</li>';

        return html;
    }

    // add this and close divs
    html = '<script type="text/javascript" src="js/active.js"></script>'
         +   '<nav class="navbar navbar-expand-lg navbar-dark fixed-top scrolling-navbar">'
         +     '<a class="navbar-brand" onclick=loadHome(); href="#"><strong>HOME</strong></a>'
         +     '<button class="navbar-toggler" type="button" data-toggle="collapse" '
         +       'data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" '
         +       'aria-expanded="false" aria-label="Toggle navigation">'
         +       '<span class="navbar-toggler-icon"></span>'
         +     '</button>'
         +     '<div class="collapse navbar-collapse" id="navbarSupportedContent">'
         +       '<ul class="navbar-nav mr-auto">';

    // use jquery here to insert section links?
    config.sections.forEach(x => html += drawLinks(x));

    html += '</ul></div></nav>';

    return html;

}


function drawFooter() {
    // Social media links for footer
    var links = [
        {
            "href": config.socials.linkedin,
            "img": "css/images/linkedin-logo.png"
        },
        {
            "href": config.socials.github,
            "img": "css/images/github-logo.png"
        },
        {
            "href": "mailto:" + config.email,
            "img": "css/images/email.png"
        }
    ];

    function drawLinks() {
        var html = '<div class="row justify-content-center">';
        links.forEach(x =>
            html += '<div class="col-auto px-1">'
                // add link hover highlight here
                  +   '<a href="' + x['href'] + '" target="_blank">'
                  +     '<img src=' + x['img'] + ' width=20 height=20>' 
                  +   '</a>'
                  + '</div>'
            );
        html += '</div>';
        return html;
    }

    function drawCopyright() {
        year = new Date().getFullYear();
        cp_html = '<div class="row justify-content-center">'
                    + ['<p>&copy;', config.author, year, '</p>'].join(' ')
                + '</div>'
        return cp_html;
    }

    html = '<div class=container>';
    html += drawLinks();
    html += drawCopyright();
    html += '</div>'
    return html;
}


function hookRedirect() {

    function loadSection(section) {
        var title = section.split('').map((x,i) => i == 0 ? x.toUpperCase() : x).join('');
        var call = 'load' + title;
        console.log(call);
        // this isn't working
        window[call]();
    }

    var url = window.location.hash;
    var section = url.split('#')[1];
    console.log(section);
    section == '' || typeof section === 'undefined' ? loadHome() : loadSection(section);

}

// clear content on link click or refresh here
function render() {
    $('.body').append(baseContainers());
    //loadNavbar();
    $('#navbar').append(drawNavbar());
    $('#footer').append(drawFooter());
    loadWallpaper();
    hookRedirect();

}