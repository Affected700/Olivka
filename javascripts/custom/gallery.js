/**
 * Created by Affected on 11.10.2015.
 */

var container = $('#menu-items');

jQuery(window).load(function () {

    container.isotope({
        transitionDuration: '0.65s',
        itemSelector: '.menu-item, .menu-item-list',
        gutter: 13
    });

    $('.menu-fillter li').removeClass('activeFilter');

    var menu_type = window.location.hash;  //get Type of menu filter
    var selector;
    if (menu_type == '')
    {
        menu_type = "#interior";
    }

    $(menu_type).parent('li').addClass('activeFilter');
    $(menu_type).focus();

    selector = menu_type.replace('#', '.');

    container.isotope({filter: selector});


    $('html, body').animate({
        scrollTop: $(menu_type).offset().top - 37
    }, 1000);
});

