/*! NSB Box v1.0.5 | (c) NSB Media, Lindenstrasse 16, 6340 Baar, www.nsbmedia.ch | Etienne Schorro - 2022 */
var animBreake = !1
  , currentLink = 0;
function isEndOf(n, t) {
    return n.endsWith(t)
}
function checkFileExtension(t, n) {
    return n.some(n=>isEndOf(t, n))
}
function closeNSBBox() {
    $("#nsbbox").fadeOut(300),
    setTimeout(function() {
        $("#nsbbox").remove()
    }, 300)
}
function nsbBOXImgBack() {
    0 == animBreake && (animBreake = !0,
    $("#nsbBOXText").text(linksTextArr[currentLink]),
    $("#nsbbox img").css("box-shadow", "none").animate({
        left: "-=3%",
        opacity: 0
    }, 300, function() {
        $("#nsbbox img").attr("src", linksArr[currentLink]).css("left", "53%").animate({
            left: "-=3%",
            opacity: 1
        }, 200, function() {
            $(this).css("box-shadow", "0 0 50px #333"),
            animBreake = !1
        })
    }),
    --currentLink < 0 && (currentLink = countImgLink - 1))
}
function nsbBOXImgForw() {
    0 == animBreake && (animBreake = !0,
    $("#nsbBOXText").text(linksTextArr[currentLink]),
    $("#nsbbox img").css("box-shadow", "none").animate({
        left: "+=3%",
        opacity: 0
    }, 300, function() {
        $("#nsbbox img").attr("src", linksArr[currentLink]).css("left", "47%").animate({
            left: "+=3%",
            opacity: 1
        }, 200, function() {
            $(this).css("box-shadow", "0 0 50px #333"),
            animBreake = !1
        })
    }),
    ++currentLink >= countImgLink && (currentLink = 0))
}
function nsbBOXinit() {
    $(document).on("click", ".nsbbox", function(t) {
        t.stopPropagation(),
        img = !1,
        iframe = !0,
        $("#nsbbox").remove(),
        $("body").append('<div id="nsbbox"><div class="loader"></div><a class="pfeilLinks"></a><a class="pfeilRechts"></a><p id="nsbBOXText"></p><a class="closeBOX">X</a></div>'),
        $("#nsbbox").fadeOut(0).fadeIn(600),
        $("#nsbbox a.pfeilLinks, #nsbbox a.pfeilRechts").fadeOut(0),
        $("#nsbbox a.pfeilLinks, #nsbbox a.pfeilRechts").click(function() {
            return !1
        }),
        $("#nsbbox, a.closeBOX").click(function() {
            closeNSBBox()
        }),
        $("body").keyup(function(n) {
            27 == n.keyCode && closeNSBBox(),
            37 == n.keyCode && nsbBOXImgBack(),
            39 == n.keyCode && nsbBOXImgForw()
        });
        var e, i;
        return (checkFileExtension(t.currentTarget.href.split("?")[0], [".jpg", ".jpeg", ".png", ".gif"]) || $(this).data("image")) && (img = !0,
        iframe = !1),
        t.target.alt && $("#nsbBOXText").text(t.target.alt),
        t.target.title && $("#nsbBOXText").text(t.target.title),
        t.currentTarget.alt && $("#nsbBOXText").text(t.currentTarget.alt),
        t.currentTarget.title && $("#nsbBOXText").text(t.currentTarget.title),
        1 == img && ($("#nsbbox").append('<img id="swipeDetect" src="' + t.currentTarget.href + '">'),
        countImgLink = 0,
        linksTextArr = new Array,
        linksArr = new Array,
        imagesArr = $("a.nsbbox").toArray(),
        imagesArr.forEach(function(n) {
            (isEndOf(n.href.split("?")[0], ".jpg") || isEndOf(n.href.split("?")[0], ".JPG") || isEndOf(n.href.split("?")[0], ".jpeg") || isEndOf(n.href.split("?")[0], ".JPEG")) && (linksTextArr[countImgLink] = n.title,
            linksArr[countImgLink] = n.href,
            countImgLink++),
            (isEndOf(n.href.split("?")[0], ".png") || isEndOf(n.href.split("?")[0], ".PNG")) && (linksTextArr[countImgLink] = n.title,
            linksArr[countImgLink] = n.href,
            countImgLink++),
            (isEndOf(n.href.split("?")[0], ".gif") || isEndOf(n.href.split("?")[0], ".GIF")) && (linksTextArr[countImgLink] = n.title,
            linksArr[countImgLink] = n.href,
            countImgLink++)
        }),
        1 < countImgLink && (iLi = 0,
        linksArr.forEach(function(n) {
            t.currentTarget.href.split("?")[0] == n && (currentLink = iLi),
            iLi++
        }),
        $("#nsbbox a.pfeilLinks, #nsbbox a.pfeilRechts").show(600),
        $("#nsbbox a.pfeilLinks").click(function() {
            nsbBOXImgBack()
        }),
        $("#nsbbox a.pfeilRechts").click(function() {
            nsbBOXImgForw()
        }),
        document.addEventListener("touchstart", function(n) {
            e = n.touches[0].clientX,
            i = n.touches[0].clientY
        }, !1),
        document.addEventListener("touchmove", function(n) {
            if (!e || !i)
                return;
            var t = n.touches[0].clientX
              , n = n.touches[0].clientY
              , t = e - t
              , n = i - n;
            Math.abs(t) > Math.abs(n) && (0 < t ? nsbBOXImgForw : nsbBOXImgBack)();
            i = e = null
        }, !1),
        i = e = null)),
        1 == iframe && (scrolling = "",
        "no" == $(this).data("scrolling") && (scrolling = 'scrolling="no"'),
        $("#nsbbox").append("<iframe " + scrolling + ' src="' + t.currentTarget.href + '"></iframe>'),
        $(this).data("width") && $("#nsbbox iframe").width($(this).data("width")),
        $(this).data("height") && $("#nsbbox iframe").height($(this).data("height"))),
        !1
    })
}
$(document).ready(function() {
    nsbBOXinit()
});
