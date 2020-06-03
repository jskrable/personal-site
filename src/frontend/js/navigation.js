/*  navigation.js
    jack skrable
    02-12-2020
    main controller script for site    
*/

// Retrieve basic site configuration info
var config = siteInfo();
//resizeBody();

// jQuery called on page load
$(function() {
    render();
    // uncomment for construction page default
    //$('.body').load('views/construction.html');
});


function createViews() {
    config.sections.forEach(x => {
        let key = x.toLowerCase(); 
        this[key] = new View(key)});

    home = new View('home');
}


// Create three basic divs for nav, content, and footer
function baseContainers() {
    html = '<div id="header" class="fixed-top"></div>';
    // height: 100% here fixes wallpaper cutting, but kills scrolling
    //html += '<div id="content" style="height: 100%;"></div>';
    html += '<div id="content"></div>';
    html += '<footer><div id="footer" class="fixed-bottom d-flex justify-content-center"></div></footer>';
    return html;
}

/*// change this to use fetchHTML
function loadHome() {
    console.log('removing existing content....');
    console.log('loading home page...');
    // need to center headshot within column
    var info = '<div class="mask align-items-left"><div class="container py-5 px-5">'
             + '<div class="row mt-5 px-5"><div class="col-md-6 black-text text-md-left">'
             + '<img src="' + config.images.headshot + '" class="rounded-circle shadow-lg px-1 py-1">'
             + '<h4 class="font-weight-bold py-3 px-1">'
             + config.bio
             + '</h4></div></div></div></div>';
    $('#content').append(info);
}*/


// change this to use fetchHTML
function drawNavbar() {

    function drawLinks(section) {
        var html = '';
        var id = 'nav-' + section.toLowerCase();
        var href = '#' + section.toLowerCase();
        var click = section.toLowerCase() + ".load()";

        html += '<li class="nav-item">'
             +    '<a class="nav-link" href="' + href + '" '
             +      'onclick="' + click + '" '
             +      'id="' + id + '">' + section + '</a>'
             +  '</li>';

        return html;
    }

    // change navbar colors here please
    // add this and close divs
    html = '<script type="text/javascript" src="js/active.js"></script>'
         +   '<nav class="navbar navbar-expand-lg navbar-light fixed-top scrolling-navbar">'
         +     '<a class="navbar-brand" onclick=home.load(); href="#"><strong>HOME</strong></a>'
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

    var shadow = 'shadow-lg bg-yellow rounded';
    var dest = $('#footer');
    dest.on('mouseenter', '.a', function() {
        $(this).addClass(shadow);
    });
    dest.on('mouseleave', '.a', function() {
        $(this).removeClass(shadow);
    });
    return html;
}


function getHook() {
    var url = window.location.hash;
    var section = url.split('#')[1];
    return section;
}

function hookRedirect() {
    var section = getHook();
    var view = window[section];
    console.log(section);
    section == '' || typeof section === 'undefined' ? 
        home.load() :
        view['load']();
}


/*function resizeBody() {
    $(".body").on('DOMSubtreeModified', "#content", function() {
        var section = $('#' + getHook());
        section == '' || typeof section === 'undefined' ? $('#home') : section;
        $(this).css("height", section.height() + 100);
    });
}*/

// clear content on link click or refresh here
function render() {
    $('.body').append(baseContainers());
    $('#header').append(drawNavbar());
    $('#footer').append(drawFooter());
    createViews();
    hookRedirect();
}