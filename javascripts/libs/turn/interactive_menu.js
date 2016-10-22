

$(document).on("click",".goto",function() {
    var pageNum = $(this).attr('id');
    $("#flipbook").turn("page", pageNum);
    loadImagesWithShadow(pageNum);

});

$(document).on("click",".to_menu_content",function() {
    $("#flipbook").turn("page", 3);
    loadImagesWithShadow(30);
    $('#flipbook .tabs').hide();
});


$(document).keydown(function(e){

    var previous = 37, next = 39;

    switch (e.keyCode) {
        case previous:

            $('#flipbook').turn('previous');

            break;
        case next:

            $('#flipbook').turn('next');

            break;
    }

});

$(window).resize(function() {
    doResize();
});
$(document).ready(function(){
    doResize();
});


function doResize() {
    maxWidth = $(window).width();
    maxHeight = $(window).height();
    $('#flipbook').turn("center");
}

function loadImagesWithShadow(page)
{
    var pageMin = page - 3;
    var pageMax = page + 7;
    if (pageMin < 2) pageMin = 2;

    for (var i = pageMin; i <= pageMax; i++)
    {
        if (i % 2 == 0)
        {
            $(".p" + i).css({
                background: "-moz-linear-gradient(left, rgba(0, 0, 0, 0.8) 0%, rgba(255, 255, 255, 0) 5%, rgba(255, 255, 255, 0) 90%, rgba(0, 0, 0, 0.8) 100%), url('img/interactive_menu/" + i + ".jpg') no-repeat"
            });
            $(".p" + i).css({
                background: "-moz-linear-gradient(left, rgba(0, 0, 0, 0.8) 0%, rgba(255, 255, 255, 0) 5%, rgba(255, 255, 255, 0) 90%, rgba(0, 0, 0, 0.8) 100%), url('img/interactive_menu/" + i + ".jpg') no-repeat"
            });
            $(".p" + i).css({
                background: "-webkit-linear-gradient(left, rgba(0, 0, 0, 0.8) 0%, rgba(255, 255, 255, 0) 5%, rgba(255, 255, 255, 0) 90%, rgba(0, 0, 0, 0.8) 100%), url('img/interactive_menu/" + i + ".jpg') no-repeat"
            });
            $(".p" + i).css({
                background: "-o-linear-gradient(left, rgba(0, 0, 0, 0.8) 0%, rgba(255, 255, 255, 0) 5%, rgba(255, 255, 255, 0) 90%, rgba(0, 0, 0, 0.8) 100%), url('img/interactive_menu/" + i + ".jpg') no-repeat"
            });
            $(".p" + i).css({
                background: "-ms-linear-gradient(left, rgba(0, 0, 0, 0.8) 0%, rgba(255, 255, 255, 0) 5%, rgba(255, 255, 255, 0) 90%, rgba(0, 0, 0, 0.8) 100%), url('img/interactive_menu/" + i + ".jpg') no-repeat"
            });
            $(".p" + i).css({
                background: "linear-gradient(left, rgba(0, 0, 0, 0.8) 0%, rgba(255, 255, 255, 0) 5%, rgba(255, 255, 255, 0) 90%, rgba(0, 0, 0, 0.8) 100%), url('img/interactive_menu/" + i + ".jpg') no-repeat"
            });
        }
        else
        {
            $(".p" + i).css({
                background: "-moz-linear-gradient(right, rgba(0, 0, 0, 0.8) 0%, rgba(255, 255, 255, 0) 5%, rgba(255, 255, 255, 0) 90%, rgba(0, 0, 0, 0.8) 100%), url('img/interactive_menu/" + i + ".jpg') no-repeat center center"
            });
            $(".p" + i).css({
                background: "-webkit-gradient(linear, right top, left top, color-stop(0, rgba(0, 0, 0, 0.8)), color-stop(0.05, rgba(255, 255, 255, 0)), color-stop(1, rgba(255, 255, 255, 0)), color-stop(1, rgba(0, 0, 0, 0.8))), url('img/interactive_menu/" + i + ".jpg') no-repeat center center"
            });
            $(".p" + i).css({
                background: "-webkit-linear-gradient(right, rgba(0, 0, 0, 0.8) 0%, rgba(255, 255, 255, 0) 5%, rgba(255, 255, 255, 0) 90%, rgba(0, 0, 0, 0.8) 100%), url('img/interactive_menu/" + i + ".jpg') no-repeat center center"
            });
            $(".p" + i).css({
                background: "-o-linear-gradient(right, rgba(0, 0, 0, 0.8) 0%, rgba(255, 255, 255, 0) 5%, rgba(255, 255, 255, 0) 90%, rgba(0, 0, 0, 0.8) 100%), url('img/interactive_menu/" + i + ".jpg') no-repeat center center"
            });
            $(".p" + i).css({
                background: "-ms-linear-gradient(right, rgba(0, 0, 0, 0.8) 0%, rgba(255, 255, 255, 0) 5%, rgba(255, 255, 255, 0) 90%, rgba(0, 0, 0, 0.8) 100%), url('img/interactive_menu/" + i + ".jpg') no-repeat center center"
            });
            $(".p" + i).css({
                background: "linear-gradient(right, rgba(0, 0, 0, 0.8) 0%, rgba(255, 255, 255, 0) 5%, rgba(255, 255, 255, 0) 90%, rgba(0, 0, 0, 0.8) 100%), url('img/interactive_menu/" + i + ".jpg') no-repeat center center"
            });
        }

        $(".p" + i).css({
            backgroundSize: "100%"
        });
    }
}

function updateTabs() {
    var tabs = {7: 'Содержание'},
        left = [],
        right = [],
        book = $('#flipbook'),
        actualPage = book.turn('page'),
        view = book.turn('view');
    var count = 1;
    for (var page in tabs)
    {
       /* right.push('<a href="#page/' + page + '" class="on to_menu_content">' + tabs[page] + '</a>');*/

        if (actualPage >3)
            right.push('<a class="on to_menu_content">' + tabs[page] + '</a>');
        count = count + 1;
    }
    $('#flipbook .tabs').html(right.join(''));
    $('#flipbook .tabs').addClass("text-center");
}

function simpleObjInspect(oObj, key, tabLvl)
{
    key = key || "";
    tabLvl = tabLvl || 1;
    var tabs = "";
    for(var i = 1; i < tabLvl; i++){
        tabs += "\t";
    }
    var keyTypeStr = " (" + typeof key + ")";
    if (tabLvl == 1) {
        keyTypeStr = "(self)";
    }
    var s = tabs + key + keyTypeStr + " : ";
    if (typeof oObj == "object" && oObj !== null) {
        s += typeof oObj + "\n";
        for (var k in oObj) {
            if (oObj.hasOwnProperty(k)) {
                s += simpleObjInspect(oObj[k], k, tabLvl + 1);
            }
        }
    } else {
        s += "" + oObj + " (" + typeof oObj + ") \n";
    }
    return s;
}
