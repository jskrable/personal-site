/*  navigation.js
    jack skrable
    02-12-2020
    main controller script for site    
*/


// jQuery called on page load
$(function() {
    render();
});


function baseContainers() {
    html = '<div id="navbar"></div>';
    html += '<div id="content"></div>';
    html += '<div id="footer" class="fixed-bottom d-flex justify-content-center"></div>';
    return html;
}


function drawFooter() {

    // Social media links for footer
    // move this to config file?
    var links = [
        {
            "href": "https://www.linkedin.com/in/jackskrable/",
            "img": "css/images/linkedin-logo.png"
        },
        {
            "href": "https://github.com/jskrable",
            "img": "css/images/github-logo.png"
        },
        {
            "href": "mailto:j.skrable@gmail.com",
            "img": "css/images/email.png"
        }
    ]

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
                    + '<p>&copy; Jack Skrable, ' + year + '</p>'
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
    loadNavbar();
    $('#footer').append(drawFooter());

}