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
});


// Create three basic divs for nav, content, and footer
function baseContainers() {
    html = '<div id="navbar"></div>';
    html += '<div id="content"></div>';
    html += '<div id="footer" class="fixed-bottom d-flex justify-content-center"></div>';
    return html;
}


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

    html = '<script type="text/javascript" src="js/active.js"></script>'
         +   '<nav class="navbar navbar-dark bg-primary">'
         +     '<a class="navbar-brand" href="#">HOME</a>'
         +     '<button class="navbar-toggler" type="button" data-toggle="collapse" '
         +       'data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" '
         +       'aria-expanded="false" aria-label="Toggle navigation">'
         +       '<span class="navbar-toggler-icon"></span>'
         +     '</button>'
         +     '<div class="collapse navbar-collapse" id="navbarSupportedContent">'
         +       '<ul class="navbar-nav mr-auto">';

    config.sections.forEach(x => html += drawLinks(x));

    html += '</ul></div></nav>'

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
            "href": config.email,
            "img": "css/images/email.png"
        }
    ];

    function drawLinks() {
        var html = '<div class="row justify-content-center">';
        links.forEach(x =>
            html += '<div class=col-auto px-0>'
                  +   '<a href="' + x['href'] + '" target="_blank">'
                  +     '<img src=' + x['img'] + ' width=30 height=30>' 
                  +   '</a>'
                  + '</div>'
            );
        html += '</div>';
        return html;
    }

    function drawCopyright() {
        year = new Date().getFullYear();
        cp_html = '<div class="row justify-content-center">'
                    + '<p>&copy; ' + config.author + year + '</p>'
                + '</div>'
        return cp_html;
    }

    html = '<div class=container>';
    html += drawLinks();
    html += drawCopyright();
    html += '</div>'
    return html;
}


function loadNavbar() {
    $('#navbar').load('/views/navbar.html')

}

function render() {
    $('.body').append(baseContainers());
    //loadNavbar();
    $('#navbar').append(drawNavbar());
    $('#footer').append(drawFooter());

}