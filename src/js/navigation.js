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
    return html;
}


function loadNavbar() {
    $('#navbar').load('/views/navbar.html')    

}

function render() {
    $('.body').append(baseContainers());
    loadNavbar();
}