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


// CENTER THESE BRO
function drawFooter() {

    function socials() {
        html = '<div class=row justify-content-sm-center>'
             + '<a href="https://www.linkedin.com/in/jackskrable/" target="_blank">'
             +     '<img src=css/images/linkedin-logo.png width=30 height=30>' 
             + '</a>'
             + '<a href="https://github.com/jskrable" target="_blank">'
             +     '<img src=css/images/github-logo.png width=30 height=30>'
             + '</a>'
             + '</div>'
        return html;

    }

    function copyright() {
        year = new Date().getFullYear();
        cp_html = '<div class=row justify-content-sm-center>'
                    + '<p><weak>'
                        + '&copy; Jack Skrable, ' + year
                    + '</weak></p>'
                + '</div>'
        return cp_html;
    }

    html = '<div class=container>';
    html += socials();
    html += copyright();
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