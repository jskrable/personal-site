/*  navigation.js
    jack skrable
    02-12-2020
    main controller script for site    
*/

// Retrieve basic site configuration info
var config = siteInfo();
const mobile = window.navigator.userAgent.toLowerCase().includes("mobi");
//resizeBody();

// jQuery called on page load
$(function() {
    render();
    //resizeBody();
    // uncomment for construction page default
    //$('.body').load('views/construction.html');
});


function createViews() {
    config.sections.forEach(x => {
        let key = x.toLowerCase();
        this[key] = new View(key)
    });

    home = new View('home');
}


// Create three basic divs for nav, content, and footer
function baseContainers() {
    html = '<div id="header" class="fixed-top"></div>';
    // height: 100% here fixes wallpaper cutting, but kills scrolling
    //html += '<div id="content" style="height: 100%;"></div>';
    html += '<div id="content"></div>';
    html += '<footer><div id="footer" class="fixed-bottom d-flex justify-content-center py-2" style="background-color: #bdbfbe;"></div></footer>';
    return html;
}


function loadWallpaper() {
    $('#wallpaper').remove();
    var wallpaper = '<div id="wallpaper" class="view-responsive" style="background-image: url(\'' +
        config.images.home +
        '\'); background-repeat: no-repeat; background-size: cover; background-position: center center;">'
    $('#content').append(wallpaper);
}


// change this to use fetchHTML
function drawNavbar() {

    function drawLinks(section) {
        var html = '';
        var id = 'nav-' + section.toLowerCase();
        var href = '#' + section.toLowerCase();
        var click = section.toLowerCase() + ".load()";

        html += '<li class="nav-item">' +
            '<a class="nav-link" href="' + href + '" ' +
            'onclick="' + click + '" ' +
            'id="' + id + '">' + section + '</a>' +
            '</li>';

        return html;
    }

    // add this and close divs
    // navbar color here in <nav>
    html = '<script type="text/javascript" src="js/active.js"></script>' +
        '<nav class="navbar navbar-expand-lg navbar-dark fixed-top scrolling-navbar" style="background-color: #4f5450;">' +
        '<a class="navbar-brand" onclick=home.load(); href="#"><strong>{Home}</strong></a>' +
        '<button class="navbar-toggler" type="button" data-toggle="collapse" ' +
        'data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" ' +
        'aria-expanded="false" aria-label="Toggle navigation">' +
        '<span class="navbar-toggler-icon"></span>' +
        '</button>' +
        '<div class="collapse navbar-collapse" id="navbarSupportedContent">' +
        '<ul class="navbar-nav mr-auto">';

    // use jquery here to insert section links?
    config.sections.forEach(x => html += drawLinks(x));

    html += '</ul></div></nav>';

    return html;

}


function drawFooter() {
    // Social media links for footer
    var links = [{
        "href": config.socials.linkedin.url,
        "img": config.socials.linkedin.icon
    }, {
        "href": config.socials.github.url,
        "img": config.socials.github.icon
    }, {
        "href": "mailto:" + config.email,
        "img": "css/images/email.png"
    }];

    function drawLinks() {
        var html = '<div class="row justify-content-center">';
        links.forEach(x =>
            html += '<div class="col-auto px-1">'
            // add link hover highlight here
            +
            '<a href="' + x['href'] + '" target="_blank">' +
            '<img src=' + x['img'] + ' width=20 height=20>' +
            '</a>' +
            '</div>'
        );
        html += '</div>';
        return html;

    }

    function drawCopyright() {
        year = new Date().getFullYear();
        cp_html = '<div class="row justify-content-center">' +
            ['<p>&copy;', config.author, year, '</p>'].join(' ') +
            '</div>'
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
    //console.log(section);
    if (section == '' || typeof section === 'undefined') {
        home.load(() => home.resize());
    } else {
        view['load']();
    }
}


function resizeBody() {
    content = $('#content')[0];
    if (mobile && content.scrollHeight > content.clientHeight) {
        console.log('mobile expand')
        $('#wallpaper').css("height", content.scrollHeight); 
    } else if (!mobile && $(window).height() > content.scrollHeight) {
        console.log('desktop expand')
        var height = $(window).height() - $('#footer').height();
        $('#wallpaper').css("height", height); 
    } else {
        $('#wallpaper').css("height", '');
    }
}

// clear content on link click or refresh here
function render() {
    $('.body').append(baseContainers());
    $('#header').append(drawNavbar());
    $('#footer').append(drawFooter());
    loadWallpaper();
    createViews();
    hookRedirect();
    resizeBody();
}