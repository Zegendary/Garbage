// 广告栏js
$('.headad>.closebutton').on('click',function(){
    $('.headad').addClass('fadead')
    var hidden = function(){
        setTimeout(function(){
            $('.headad').addClass('hiddenad')
        },500);}
    hidden()
})
// 菜单栏js
// $('.menu > li').on('mouseenter',function(e){
// 	var $current = $(e.currentTarget)
// 	var index = $current.attr('data-index')
// 	var indexNumber = +index
// 	$('.submenu').children('li.active').removeClass('active')
// $('.submenu').children('li').eq(indexNumber).addClass('active')
// })
// $('.menulistwrapper').on('mouseleave',function(){
// 	$('.submenu').children('li.active').removeClass('active')
// })



// 大图自动轮播js
$(function(){
    $("#slides").slidesjs({
        width: 730,
        height: 454,
        navigation: {
            active: false,
            // [boolean] Generates next and previous buttons.
            // You can set to false and use your own buttons.
            // User defined buttons must have the following:
            // previous button: class="slidesjs-previous slidesjs-navigation"
            // next button: class="slidesjs-next slidesjs-navigation"
            effect: "fade"
            // [string] Can be either "slide" or "fade".
        },
        pagination: {
            active: true,
            // [boolean] Create pagination items.
            // You cannot use your own pagination. Sorry.
            effect: "fade"
            // [string] Can be either "slide" or "fade".
        },
        play: {
            active: true,
            // [boolean] Generate the play and stop buttons.
            // You cannot use your own buttons. Sorry.
            effect: "fade",
            // [string] Can be either "slide" or "fade".
            interval: 4000,
            // [number] Time spent on each slide in milliseconds.
            auto: true,
            // [boolean] Start playing the slideshow on load.
            swap: true,
            // [boolean] show/hide stop and play buttons
            pauseOnHover: true,
            // [boolean] pause a playing slideshow on hover
            restartDelay: 2500
            // [number] restart delay on inactive slideshow
        }
    });
});
//newsicon js
$('.hasframe').on('mouseenter',function(e){
    popout(e);
})
$('.closeframe').on('click',function(e){
    $('.hasframe').off('mouseenter');
    $('.iframe-recharge').stop(true,true).animate({top: '209px'},500,function(){
        setTimeout(function(){
            $('.hasframe').on('mouseenter',function(e){
                popout(e)
            })
        },0);
    })
})
$('.iframe-button').on('mouseenter',function(e){
    $('.iframe-content.active,.iframe-button.active').removeClass('active')
    $(this).addClass('active')
    $(this).next('.iframe-content').addClass('active')
    console.log(this)
})
function popout(e){
    var $current = $(e.currentTarget)
    var index = $current.attr('data-index')
    var indexNumber = +index
    $('.iframe-content.active,.iframe-button.active').removeClass('active')
    $('.iframe-button').eq(indexNumber).addClass('active')
    $('.iframe-content').eq(indexNumber).addClass('active')
    $('.iframe-recharge').animate({top: '0px'},500,function(){})
}
//小图手动轮播js
$(function(){
    $(".onsaleslides").slidesjs({
        width: 1000,
        height: 164,
        pagination: false,
        navigation: {
            active: false,
            // [boolean] Generates next and previous buttons.
            // You can set to false and use your own buttons.
            // User defined buttons must have the following:
            // previous button: class="slidesjs-previous slidesjs-navigation"
            // next button: class="slidesjs-next slidesjs-navigation"
            effect: "slide"
            // [string] Can be either "slide" or "fade".
        }
    });
});
//回到顶部js
$('.gototop').click(function(){
    $('body').animate({scrollTop:0});
}) /**
 * Created by Administrator on 2016/6/18.
 */
