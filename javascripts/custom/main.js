// MAIN.JS
/*-------------------------------------------------------------------------------------------------------------------------------*/
//This is main JS file that contains custom JS scipts and initialization used in this template */

/*global $:false */
/*global window: false */

(function () {
    var $ = jQuery.noConflict();
    "use strict";
//var $ = jQuery.noConflict();

// scroll to top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#scroll_up').fadeIn();
        } else {
            $('#scroll_up').fadeOut();
        }
    });

    $('#scroll_up').click(function () {
        $("html, body").animate({scrollTop: 0}, 500);
        return false;
    });


    $(function ($) {


        //Detecting viewpot dimension
        var vH = $(window).height();
        var vW = $(window).width();


        //Adjusting Intro Components Spacing based on detected screen resolution
        $('.fullheight').css('height', vH);
        $('.halfheight').css('height', vH / 2);
        $('.fullwidth').css('width', vW);
        $('.halfwidth').css('width', vW / 2);


// shopcart
        jQuery.fn.clickoutside = function (callback) {
            var outside = 1, self = $(this);
            self.cb = callback;
            this.click(function () {
                outside = 0;
            });
            $(document).click(function () {
                outside && self.cb();
                outside = 1;
            });
            return $(this);
        };
        $("#shop_tigger").click(function (e) {
            $('#shop_cart').toggleClass("shop_cart_open"), e.stopPropagation(), e.preventDefault();
        });

        var q = function () {
            $('#shop_cart').removeClass("shop_cart_open");
        };
        $('#shop_cart').clickoutside(q);

        /* Popover bs active */
        $('[data-toggle="popover"]').popover()


        /* menu carousel */
        $("#menu_carousel").owlCarousel({
            autoPlay: 5000,
            stopOnHover: true,
            navigation: false, // Show next and prev buttons
            pagination: false,
            items: 6,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [979, 3]
        });

        /* Our team  */
        $("#our_team_carousel").owlCarousel({
            autoPlay: true,
            stopOnHover: true,
            navigation: false, // Show next and prev buttons
            pagination: true,
            items: 3,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [979, 2],
            itemsTablet: [600, 1]

        });

        /* our clients */
        $("#our_clients_carousel").owlCarousel({
            autoPlay: true,
            stopOnHover: true,
            navigation: false, // Show next and prev buttons
            pagination: true,
            items: 4,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [600, 1]

        });

        /* General carousel */
        $(".general-carousel").owlCarousel({
            autoPlay: true,
            stopOnHover: true,
            navigation: false, // Show next and prev buttons
            pagination: true,
            items: 4,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [600, 1]

        });


        /* Text transform */
        $("#text-transform").owlCarousel({
            autoPlay: 4000,
            navigation: false,
            slideSpeed: 700,
            pagination: false,
            singleItem: true
        });

        $(".overlay_item").mouseenter(function(){
            $(this).addClass("hover");
        })
            // handle the mouseleave functionality
        .mouseleave(function(){
            $(this).removeClass("hover");
        });

        /* date picker  */
        jQuery('#datetimepicker').datetimepicker({timepicker: false, format: 'd/m/Y'});

        /* Tabs our menu */
        $("div.tab-menu>div.list-group>a").click(function (e) {
            e.preventDefault();
            $(this).siblings('a.active').removeClass("active");
            $(this).addClass("active");
            var index = $(this).index();
            $("div.our-menu-tabs>div.tab-content").removeClass("active");
            $("div.our-menu-tabs>div.tab-content").eq(index).addClass("active");
        });

        /* Our menu slider */
        $(".our-menu-slider").owlCarousel({
            navigation: true, // Show next and prev buttons
            slideSpeed: 1000,
            lazyLoad: true,
            paginationSpeed: 400,
            singleItem: true,
            navigationText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ]
        });

        /* Our mission slider */
        $("#mission-slider, .blog-slider").owlCarousel({
            navigation: true, // Show next and prev buttons
            slideSpeed: 300,
            autoPlay: true,
            paginationSpeed: 400,
            pagination: false,
            navigationText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            singleItem: true

        });


        /* Forms validation */

        //if submit button is clicked
        $('#submit').click(function () {

            //Get the data from all the fields
            var name = $('input[name=name]');
            var email = $('input[name=email]');
            var phone_number = $('input[name=phone_number]');
            var comment = $('textarea[name=comment]');
            var returnError = false;

            //Simple validation to make sure user entered something
            //Add your own error checking here with JS, but also do some error checking with PHP.
            //If error found, add hightlight class to the text field
            if (name.val() == '') {
                name.addClass('error');
                returnError = true;
            } else name.removeClass('error');

            if (!validateEmail(email.val())) {
                email.addClass('error');
                returnError = true;
            }
            else email.removeClass('error');


            /* if (!validatePhoneNumber(phone_number))
             {
             phone_number.addClass('error');
             returnError = true;
             }
             else phone_number.removeClass('error');*/


            if (!isPhoneLengthEnough(phone_number.val())) {
                phone_number.addClass('error');
                returnError = true;
            } else phone_number.removeClass('error');

            if (comment.val() == '') {
                comment.addClass('error');
                returnError = true;
            } else comment.removeClass('error');

            // Highlight all error fields, then quit.
            if (returnError == true) {
                return false;
            }

            //organize the data
            var data = 'name=' + name.val() + '&email=' + email.val() + '&phone_number=' +
                phone_number.val() + '&comment=' + encodeURIComponent(comment.val());

            //disabled all the text fields
            $('.text').attr('disabled', 'true');

            //show the loading sign
            $('.loading').show();
            //start the ajax
            $.ajax({
                //this is the php file that processes the data and sends email
                url: "process.php",

                //GET method is used
                type: "GET",

                //pass the data
                data: data,

                //Do not cache the page
                cache: false,

                //success
                success: function (html) {
                    //if process.php returned 1/true (send mail success)
                  /*  if (html == 1) {*/
                        //hide the form
                        $('.form').fadeOut('slow');

                        //show the success message
                        $('.done').fadeIn('slow');

                        //if process.php returned 0/false (send mail failed)
                   /* } else alert('Sorry, unexpected error. Please try again later.');*/
                    /*} else alert(html);*/
                }
            });

            //cancel the submit button default behaviours
            return false;

        });


        /*  Ticker */

        $('#fade, .text-rotator').list_ticker({
            speed: 4000,
            effect: 'fade'

        });

        /* Youtube video */
        $("#youtube_video").YTPlayer();

        /* Tooltip active */
        $('[data-toggle="tooltip"]').tooltip();

        /* Carousel active */
        $('.carousel').carousel({interval: 7000});

        /* Flickr */
        $('#flickrbox').jflickrfeed({
            limit: 12,
            qstrings: {
                id: '7135240@N05'
            },
            itemTemplate: '<li><a data-rel="prettyPhoto" href="{{image_b}}" ><img src="{{image_s}}" alt="{{title}}" /></a></li>'
        }, function () {
            $("#flickrbox a, a[rel^='lightbox']").prettyPhoto({
                show_title: false,
                hook: 'data-rel',
                social_tools: false,
                theme: 'pp_ignited',
                horizontal_padding: 20,
                opacity: 0.95,
                deeplinking: false
            });
        });


    });

    /* Loader */

    $(window).load(function () {
        $(".loader-item").delay(800).fadeOut();
        $("#loader, #loader2, #loader3").delay(1300).fadeOut("slow");
    });

})();

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePhoneNumber(phoneNumber) {
    var patt = /9\d{6}(\d{3})?/;
    return patt.test(phoneNumber);
}

function validateOnlyNumbers(phoneNumber) {
    var theEvent = phoneNumber || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var phone_number = $('input[name=phone_number]').val();
    var regex = /[0-9]|\./;
    if (!regex.test(key) || isPhoneLengthEnough(phone_number)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

function isPhoneLengthEnough(phoneNumber)
{
    return phoneNumber.length == 11;
}

var $ = jQuery.noConflict();

var MAJESTY = MAJESTY || {};

(function ($) {

    // USE STRICT
    "use strict";

    MAJESTY.initialize = {

        init: function () {

            MAJESTY.initialize.responsiveClasses();
            MAJESTY.initialize.dataResponsiveHeights();

        },

        responsiveClasses: function () {
            var jRes = jRespond([
                {
                    label: 'smallest',
                    enter: 0,
                    exit: 479
                }, {
                    label: 'handheld',
                    enter: 480,
                    exit: 767
                }, {
                    label: 'tablet',
                    enter: 768,
                    exit: 991
                }, {
                    label: 'laptop',
                    enter: 992,
                    exit: 1199
                }, {
                    label: 'desktop',
                    enter: 1200,
                    exit: 10000
                }
            ]);
            jRes.addFunc([
                {
                    breakpoint: 'desktop',
                    enter: function () {
                        $body.addClass('device-lg');
                    },
                    exit: function () {
                        $body.removeClass('device-lg');
                    }
                }, {
                    breakpoint: 'laptop',
                    enter: function () {
                        $body.addClass('device-md');
                    },
                    exit: function () {
                        $body.removeClass('device-md');
                    }
                }, {
                    breakpoint: 'tablet',
                    enter: function () {
                        console.log("small?");
                        $body.addClass('device-sm');
                    },
                    exit: function () {
                        $body.removeClass('device-sm');
                    }
                }, {
                    breakpoint: 'handheld',
                    enter: function () {
                        $body.addClass('device-xs');
                    },
                    exit: function () {
                        $body.removeClass('device-xs');
                    }
                }, {
                    breakpoint: 'smallest',
                    enter: function () {
                        console.log("xss small?");
                        $body.addClass('device-xxs');
                    },
                    exit: function () {
                        $body.removeClass('device-xxs');
                    }
                }
            ]);
        },


        dataResponsiveHeights: function () {
            var $dataHeightXxs = $('[data-height-xxs]'),
                $dataHeightXs = $('[data-height-xs]'),
                $dataHeightSm = $('[data-height-sm]'),
                $dataHeightMd = $('[data-height-md]'),
                $dataHeightLg = $('[data-height-lg]');

            if ($dataHeightXxs.length > 0) {
                $dataHeightXxs.each(function () {
                    var element = $(this),
                        elementHeight = element.attr('data-height-xxs');

                    if ($body.hasClass('device-xxs')) {
                        if (elementHeight != '') {
                            element.css('height', elementHeight);
                        }
                    }
                });
            }

            if ($dataHeightXs.length > 0) {
                $dataHeightXs.each(function () {
                    var element = $(this),
                        elementHeight = element.attr('data-height-xs');

                    if ($body.hasClass('device-xs')) {
                        if (elementHeight != '') {
                            element.css('height', elementHeight);
                        }
                    }
                });
            }

            if ($dataHeightSm.length > 0) {
                $dataHeightSm.each(function () {
                    var element = $(this),
                        elementHeight = element.attr('data-height-sm');

                    if ($body.hasClass('device-sm')) {
                        if (elementHeight != '') {
                            element.css('height', elementHeight);
                        }
                    }
                });
            }

            if ($dataHeightMd.length > 0) {
                $dataHeightMd.each(function () {
                    var element = $(this),
                        elementHeight = element.attr('data-height-md');

                    if ($body.hasClass('device-md')) {
                        if (elementHeight != '') {
                            element.css('height', elementHeight);
                        }
                    }
                });
            }

            if ($dataHeightLg.length > 0) {
                $dataHeightLg.each(function () {
                    var element = $(this),
                        elementHeight = element.attr('data-height-lg');

                    if ($body.hasClass('device-lg')) {
                        if (elementHeight != '') {
                            element.css('height', elementHeight);
                        }
                    }
                });
            }
        }


    };

    MAJESTY.header = {

        init: function () {

            MAJESTY.header.superfish();
            MAJESTY.header.menufunctions();
            MAJESTY.header.fullWidthMenu();
            MAJESTY.header.overlayMenu();
            MAJESTY.header.topcart();
            MAJESTY.header.splitmenu();
            MAJESTY.header.removeStickyness();


        },

        superfish: function () {

            if ($().superfish) {
                if ($body.hasClass('device-lg') || $body.hasClass('device-md')) {
                    $('#main-menu ul ul, #main-menu ul .mega-menu-content, #wtf').css('display', 'block');
                    MAJESTY.header.menuInvert();
                }

                $('#main-menu > ul, #main-menu > div > ul,.top-links > ul').superfish({
                    popUpSelector: 'ul,.mega-menu-content,.top-link-section',
                    delay: 250,
                    speed: 350,
                    animation: {opacity: 'show'},
                    animationOut: {opacity: 'hide'},
                    speedOut:      'slow',
                    cssArrows: false
                });
            }

        },

        menuInvert: function () {

            $('#main-menu .mega-menu-content, #main-menu ul ul, .menu-center ul ul').each(function (index, element) {
                var $menuChildElement = $(element);
                var windowWidth = $window.width();
                var menuChildOffset = $menuChildElement.offset();
                var menuChildWidth = $menuChildElement.width();
                var menuChildLeft = menuChildOffset.left;

                if (windowWidth - (menuChildWidth + menuChildLeft) < 0) {
                    $menuChildElement.addClass('menu-pos-invert');
                }
            });

        },

        menufunctions: function () {

            $('#main-menu ul li:has(ul)').addClass('sub-menu');
            $('.top-links ul li:has(ul) > a').append(' <i class="icon-angle-down"></i>');
            $('.top-links > ul').addClass('clearfix');

            if ($body.hasClass('device-lg') || $body.hasClass('device-md')) {
                $('#main-menu.sub-title > ul > li,#main-menu.sub-title > div > ul > li').hover(function () {
                    $(this).prev().css({backgroundImage: 'none'});
                }, function () {
                    $(this).prev().css({backgroundImage: 'url("images/icons/menu-divider.png")'});
                });

                $('#main-menu.sub-title').children('ul').children('.current').prev().css({backgroundImage: 'none'});
                $('#main-menu.sub-title').children('div').children('ul').children('.current').prev().css({backgroundImage: 'none'});
            }

            if (MAJESTY.isMobile.Android()) {
                $('#main-menu ul li.sub-menu').children('a').on('touchstart', function (e) {
                    if (!$(this).parent('li.sub-menu').hasClass('sfHover')) {
                        e.preventDefault();
                    }
                });
            }

            if (MAJESTY.isMobile.Windows()) {
                $('#main-menu > ul, #main-menu > div > ul,.top-links > ul').superfish('destroy').addClass('windows-mobile-menu');

                $('#main-menu ul li:has(ul)').append('<a href="#" class="wn-submenu-trigger"><i class="icon-angle-down"></i></a>');

                $('#main-menu ul li.sub-menu').children('a.wn-submenu-trigger').click(function (e) {
                    $(this).parent().toggleClass('open');
                    $(this).parent().find('> ul, > .mega-menu-content').stop(true, true).toggle();
                    return false;
                });
            }

        },

        fullWidthMenu: function () {
            if ($body.hasClass('stretched')) {
                if ($header.find('.container-fullwidth').length > 0) {
                    $('.mega-menu .mega-menu-content').css({'width': $wrapper.width() - 120});
                }
                if ($header.hasClass('full-header')) {
                    $('.mega-menu .mega-menu-content').css({'width': $wrapper.width() - 60});
                }
            } else {
                if ($header.find('.container-fullwidth').length > 0) {
                    $('.mega-menu .mega-menu-content').css({'width': $wrapper.width() - 120});
                }
                if ($header.hasClass('full-header')) {
                    $('.mega-menu .mega-menu-content').css({'width': $wrapper.width() - 80});
                }
            }
        },

        overlayMenu: function () {
            if ($body.hasClass('overlay-menu')) {
                var overlayMenuItem = $('#main-menu').children('ul').children('li'),
                    overlayMenuItemHeight = overlayMenuItem.outerHeight(),
                    overlayMenuItemTHeight = overlayMenuItem.length * overlayMenuItemHeight,
                    firstItemOffset = ( $window.height() - overlayMenuItemTHeight ) / 2;

                $('#main-menu').children('ul').children('li:first-child').css({'margin-top': firstItemOffset + 'px'});
            }
        },

        removeStickyness: function () {

            if ($body.hasClass('device-md') || $body.hasClass('device-lg')) {
                // sticky header
                $("#header").sticky({
                    topSpacing: 0,
                    responsiveWidth: true,
                    getWidthFrom: "body",
                    wrapperClassName: 'sticky-header'
                });
            }
            if ($body.hasClass('device-xs') || $body.hasClass('device-xxs') || $body.hasClass('device-sm')) {
                $("#header").unstick();
                $(".sticky-onepage").sticky({
                    topSpacing: 0,
                    responsiveWidth: true,
                    getWidthFrom: "body",
                    wrapperClassName: 'sticky-header'
                });
            }

        },

        topcart: function () {
            $("#shop_cart-trigger").click(function (e) {
                $pagemenu.toggleClass('pagemenu-active', false);
                $topCart.toggleClass('shop_cart-open');
                e.stopPropagation();
                e.preventDefault();
            });
        },

        splitmenu: function () {
            if (( $body.hasClass('device-lg') || $body.hasClass('device-md') ) && $header.hasClass('split-menu')) {
                var element = $('#logo'),
                    logoWidth = defaultLogo.find('img').outerWidth(),
                    logoPosition = logoWidth / 2,
                    menuPadding = logoPosition + 30;

                element.css({'margin-left': -logoPosition + 'px'});

                $('#main-menu').find('.menu-left').css({'padding-right': menuPadding + 'px'});
                $('#main-menu').find('.menu-right').css({'padding-left': menuPadding + 'px'});
            }

        }

    };

    MAJESTY.widget = {

        init: function () {

            MAJESTY.widget.animations();
            MAJESTY.widget.SwiperVertical();
            MAJESTY.widget.Swiper();
            MAJESTY.widget.scrollDown();
            MAJESTY.widget.extras();
            MAJESTY.widget.forResizeAndLoad();
            MAJESTY.widget.html5Video();
            MAJESTY.widget.vimeoBgVideo();
            MAJESTY.widget.carouselImage();

        },

        scrollDown: function () {
            $.scrollIt({
                upKey: 38,             // key code to navigate to the next section
                downKey: 40,           // key code to navigate to the previous section
                easing: 'linear',      // the easing function for animation
                scrollTime: 600,       // how long (in ms) the animation takes
                activeClass: 'current', // class given to the active nav element
                onPageChange: null,    // function(pageIndex) that is called when page is changed
                topOffset: 0           // offste (in px) for fixed top navigation
            });
        },

        SwiperVertical: function () {
            var swiper = new Swiper('.vertical-slider', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                grabCursor: true,
                slidesPerView: 1,
                direction: 'vertical',
                autoplay: 5000,
                loop: true
            });
        },
        Swiper: function () {
            var swiperSlider = new Swiper('.swiper-parent', {
                paginationClickable: false,
                slidesPerView: 1,
                loop: true,
                autoplay: 5000,
                effect: 'slide',
                grabCursor: true

            });

            $('#slider-arrow-left').on('click', function (e) {
                e.preventDefault();
                swiperSlider.slidePrev();
            });

            $('#slider-arrow-right').on('click', function (e) {
                e.preventDefault();
                swiperSlider.slideNext();
            });


        },
        parallax: function () {
            if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
                skrollr.init({
                    forceHeight: false
                });
            }
            else {
                $parallaxEl.addClass('mobile-parallax');

            }
        },
        animations: function () {
            if (MAJESTY.isMobile.any()) {
                $('.animated').addClass('visible');
            }
            else {
                $('.animated').appear(function () {
                    var elem = $(this);
                    var animation = elem.data('animation');
                    if (!elem.hasClass('visible')) {
                        var animationDelay = elem.data('animation-delay');
                        if (animationDelay) {
                            setTimeout(function () {
                                elem.addClass(animation + " visible");
                            }, animationDelay);
                        } else {
                            elem.addClass(animation + " visible");
                        }
                    }
                });
            }

        },

        html5Video: function () {
            var videoEl = $('.video-wrap:has(video)');
            if (videoEl.length > 0) {
                videoEl.each(function () {
                    var element = $(this),
                        elementVideo = element.find('video'),
                        outerContainerWidth = element.outerWidth(),
                        outerContainerHeight = element.outerHeight(),
                        innerVideoWidth = elementVideo.outerWidth(),
                        innerVideoHeight = elementVideo.outerHeight();

                    if (innerVideoHeight < outerContainerHeight) {
                        var videoAspectRatio = innerVideoWidth / innerVideoHeight,
                            newVideoWidth = outerContainerHeight * videoAspectRatio,
                            innerVideoPosition = (newVideoWidth - outerContainerWidth) / 2;
                        elementVideo.css({
                            'width': newVideoWidth + 'px',
                            'height': outerContainerHeight + 'px',
                            'left': -innerVideoPosition + 'px'
                        });
                    } else {
                        var innerVideoPosition = (innerVideoHeight - outerContainerHeight) / 2;
                        elementVideo.css({
                            'width': innerVideoWidth + 'px',
                            'height': innerVideoHeight + 'px',
                            'top': -innerVideoPosition + 'px'
                        });
                    }

                    if (MAJESTY.isMobile.any()) {
                        var placeholderImg = elementVideo.attr('poster');

                        if (placeholderImg != '') {
                            element.append('<div class="video-placeholder" style="background-image: url(' + placeholderImg + ');"></div>')
                        }
                    }
                });
            }
        },

        vimeoBgVideo: function () {
            if (!MAJESTY.isMobile.any()) {
                $("#vimeo").okvideo({
                    source: '23851992',
                    volume: 0,
                    loop: true,
                    hd: true,
                    adproof: true,
                    annotations: false
                });

            } else {
                $('#vimeo').addClass('poster-img');
            }
        },
        carouselImage: function () {
            var singImg = $(".single-img");
            var thumbImg = $("#thumb-img");

            singImg.owlCarousel({
                singleItem: true,
                slideSpeed: 1000,
                navigation: false,
                pagination: false,
                afterAction: syncPosition,
                responsiveRefreshRate: 200
            });

            thumbImg.owlCarousel({
                items: 4,
                itemsDesktop: [1199, 4],
                itemsDesktopSmall: [979, 4],
                itemsTablet: [768, 3],
                itemsMobile: [479, 2],
                pagination: false,
                responsiveRefreshRate: 100,
                afterInit: function (el) {
                    el.find(".owl-item").eq(0).addClass("current");
                }
            });

            function syncPosition(el) {
                var current = this.currentItem;
                $("#thumb-img")
                    .find(".owl-item")
                    .removeClass("current")
                    .eq(current)
                    .addClass("current")
                if ($("#thumb-img").data("owlCarousel") !== undefined) {
                    center(current)
                }
            }

            $("#thumb-img").on("click", ".owl-item", function (e) {
                e.preventDefault();
                var number = $(this).data("owlItem");
                singImg.trigger("owl.goTo", number);
            });

            function center(number) {
                var thumbImgvisible = thumbImg.data("owlCarousel").owl.visibleItems;
                var num = number;
                var found = false;
                for (var i in thumbImgvisible) {
                    if (num === thumbImgvisible[i]) {
                        var found = true;
                    }
                }

                if (found === false) {
                    if (num > thumbImgvisible[thumbImgvisible.length - 1]) {
                        thumbImg.trigger("owl.goTo", num - thumbImgvisible.length + 2)
                    } else {
                        if (num - 1 === -1) {
                            num = 0;
                        }
                        thumbImg.trigger("owl.goTo", num);
                    }
                } else if (num === thumbImgvisible[thumbImgvisible.length - 1]) {
                    thumbImg.trigger("owl.goTo", thumbImgvisible[1])
                } else if (num === thumbImgvisible[0]) {
                    thumbImg.trigger("owl.goTo", num - 1)
                }

            }

        },

        extras: function () {
            $('[data-toggle="tooltip"]').tooltip();
            $('#main-menu-trigger,#overlay-menu-close').click(function () {
                $('#main-menu > ul, #main-menu > div > ul').toggleClass("show");
                return false;
            });
            $('#page-submenu-trigger').click(function () {
                $body.toggleClass('top-search-open', false);
                $pagemenu.toggleClass("pagemenu-active");
                return false;
            });
            $pagemenu.find('nav').click(function (e) {
                $body.toggleClass('top-search-open', false);
                $topCart.toggleClass('shop_cart-open', false);
            });
            if (MAJESTY.isMobile.any()) {
                $body.addClass('device-touch');

            }

        },

        // for resize and load function
        forResizeAndLoad: function () {

            // Decect Viewport Screen
            var vH = $(window).height();
            $('#home-header, .fullheight, #slider, .slider-parallax').css('height', vH);
            // Centering Text for Home Header
            var parent_height = $('.slider-content').parent().height();
            var image_height = $('.slider-content').height();

            var top_margin = (parent_height - image_height) / 2;
            $('.slider-content').css('padding-top', top_margin);
        }

    };

    MAJESTY.isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (MAJESTY.isMobile.Android() || MAJESTY.isMobile.BlackBerry() || MAJESTY.isMobile.iOS() || MAJESTY.isMobile.Opera() || MAJESTY.isMobile.Windows());
        }
    };

    MAJESTY.documentOnResize = {
        init: function () {
            var t = setTimeout(function () {
                MAJESTY.header.fullWidthMenu();
                MAJESTY.header.overlayMenu();
                MAJESTY.initialize.dataResponsiveHeights();
                MAJESTY.widget.forResizeAndLoad();
                MAJESTY.widget.parallax();
            }, 0);

        }

    };

    MAJESTY.documentOnReady = {
        init: function () {
            MAJESTY.initialize.init();
            MAJESTY.header.init();
            MAJESTY.widget.init();
            MAJESTY.header.removeStickyness();
            MAJESTY.widget.forResizeAndLoad();
        }

    };
    MAJESTY.documentOnLoad = {
        init: function () {
            MAJESTY.widget.parallax();
        }

    };


    var $window = $(window),
        $body = $('body'),
        $wrapper = $('#wrapper'),
        $header = $('#header'),
        $headerWrap = $('#header-wrap'),
        oldHeaderClasses = $header.attr('class'),
        oldHeaderWrapClasses = $headerWrap.attr('class'),
        stickyMenuClasses = $header.attr('data-sticky-class'),
        defaultLogo = $('#logo').find('.standard-logo'),
        $topCart = $('#shop_cart'),
        $pagemenu = $('#page-menu'),
        $parallaxEl = $('.bcg'),
        $youTubeBg = $('.yt-bg-player');

    $(document).ready(MAJESTY.documentOnReady.init);
    $window.load(MAJESTY.documentOnLoad.init);
    $window.on('resize', MAJESTY.documentOnResize.init);


})(jQuery);


jQuery(window).load(function () {

    $('.menu-fillter a, #menu_carousel a').click(function () {
        $('.menu-fillter li').removeClass('activeFilter');
        $('.menu-fillter li a').removeClass('focused-menu-type');
        var menu_filter = $(this).attr('data-filter');

        if (menu_filter == '.seasonal_offer')
        {
            var win = window.open("seasonal_offer_interactive_menu.html", '_blank');
            win.focus();
        }
        else
        {
            menu_filter = menu_filter.replace('.', '#');

            history.replaceState({page: 3}, "menu", menu_filter); // location: htt

            $(menu_filter).parent('li').addClass('activeFilter');
            $(menu_filter).focus();

            menu_filter = menu_filter.replace('#', '.');

            $('#view-more').show();
            $(menu_filter + '-more').removeClass(menu_filter.replace('.',''));

            container.isotope({filter: menu_filter});

            return false;
        }



    });

    $('#view-more').click(function ()
    {
        var menu_filter_id = $('.activeFilter').context.location.hash;
        var menu_filter = menu_filter_id.replace('#','');

        var more_food = menu_filter + '-more';
        $('.' + menu_filter + '-more').addClass(menu_filter);
        $(menu_filter_id).addClass('focused-menu-type');

        $(this).hide();

        $('html, body').animate({
            scrollTop: $(this).offset().top + 200
        }, 500);

        container.isotope({filter: '.' + menu_filter});

        return false;
    });



  /*  preload([
        'img/drop_menu/breakfast.jpg',
        'img/drop_menu/deserts.jpg',
        'img/drop_menu/first_meal.jpg',
        'img/drop_menu/fish.jpg',
        'img/drop_menu/garnish.jpg',
        'img/drop_menu/meat.jpg',
        'img/drop_menu/pasta.jpg',
        'img/drop_menu/pizza.jpg',
        'img/drop_menu/rizotto.jpg',
        'img/drop_menu/salads.jpg',
        'img/drop_menu/second_meal.jpg',
        'img/drop_menu/snacks.jpg'
    ]);*/

});

$(window).resize(function () {
    container.isotope('layout');
});

/* ==
 Googler Map
 ==*/

// Create and Initialise the Map (required) our google map below

google.maps.event.addDomListener(window, 'load', init);

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions

    var mapOptions = {

        // How zoomed in you want the map to start at (always required)

        zoom: 16,
        scrollwheel: false,
        // The latitude and longitude to center the map (always required)

        /*center: new google.maps.LatLng(45.088530, -64.367951), // Your Address Here*/
        center: new google.maps.LatLng(53.5175036, 49.277293), // Your Address Here


        // How you would like to style the map.
        // This is where you would paste any style found on [Snazzy Maps][1].
        // copy the Styles from Snazzy maps,  and paste that style info after the word "styles:"

        styles: [{stylers: [{hue: '#000000'}, {saturation: -100}]}, {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{lightness: 50}, {visibility: 'simplified'}]
        }, {featureType: 'road', elementType: 'labels', stylers: [{visibility: 'off'}]}]
    };

    var mapElement = document.getElementById('map');

    // Create the Google Map using out element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);
    var image = 'img/logo/map_logo.png';

    // Define the image to use for the map marker (58 x 44 px)

    // Define the Lattitude and Longitude for the map location

    var myLatLng = new google.maps.LatLng(53.5175036, 49.277293);

    // Define the map marker characteristics

    var mapMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image,
        title: 'Frostbyte Interactive'

    });

    // Following Lines are needed if you use the Info Window to display content when map marker is clicked

    /*var infowindow = new google.maps.InfoWindow({
     content: contentString
     });*/

    // Following line turns the marker, into a clickable button and when clicked, opens the info window

    google.maps.event.addListener(mapMarker, 'click', function () {
        infowindow.open(map, mapMarker);
    });

}


$(document).ready(function () {
    $(".bg").interactive_bg();
    if (window.innerWidth < 740)
    {
        $('.item_desc').click(function () {
            var item_desc_p = $('.item_desc > p');
            item_desc_p.slideToggle();
        });
    }
});

$(window).resize(function () {
    $(".wrapper-bg > .ibg-bg").css({
        width: $(window).outerWidth(),
        height: $(window).outerHeight()
    })
});


// Fade slider
$("#slider-fade, #slider-fullwidth").skippr({
    transition: 'fade',
    speed: 300,
    easing: 'easeOutQuart',
    navType: false,
    arrows: false,
    autoPlay: true,
    autoPlayDuration: 5000,
    hidePrevious: true

});

/* vertical slider for one page vertical */
$("#vertical-slider, #skipper-slider").skippr({
    speed: 300,
    easing: 'easeOutQuart',
    autoPlay: true,
    autoPlayDuration: 5000
});


/*function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
        // Alternatively you could use:
        // (new Image()).src = this;
    });
}*/

        
