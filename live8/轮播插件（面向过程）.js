$.fn.slides = function(){
  var $slides = this;
  $slides.each(function(){
    var $slides = $(this)
    var $pics = $slides.children();
  var width = $slides.width();
  var height = $slides.height();
  var number = $pics.length+2;
  var current = 1
  //html 
  $slides.css({overflow:'hidden',position:'relative'})
  $pics.css({
    'width':width,
    'height':height,
    'float':'left',
  })
  var $first = $pics.first()
  var $last = $pics.last()
  $first.clone().appendTo($slides)
  $last.clone().prependTo($slides)
  $slides.children().wrapAll('<div class=viewpoint></div>')
  var $wrapper = $('.viewpoint')
  $wrapper.css({
    'width':number*width,
    'height':height,
    'position':'relative',
    'left':-width,
  })
  var $prev = $('<button class="slides-prev"><</button>')
  $prev.appendTo($slides);
  var $next = $('<button class="slides-next">></button>').appendTo($slides);
  $('.slides-prev').css({
    position:'absolute',
    left:'0',
    top:'50%',
    border:'none'
  })
  $('.slides-next').css({
    position:'absolute',
    right:'0',
    top:'50%',
    border:'none'
  })
  var hover = false;
//go函数
  var go = function(index){
    var left = index*(-width)
    if(timer){
        window.clearInterval(timer)
      }
    if(!hover){
          autoPlay()
        }
    if(index!=0&&index!=number-1){
    $wrapper.stop(true,true).animate({
        left: left 
      },500,function(){
        current = index        
    })      
    }else    
      if(index == 0){
        $wrapper.stop(true,true).animate({left:0},500,function(){
          $wrapper.css({left:(-number+2)*width})
          current = number-2
        })        
      }else
      if(index == number-1){
        $wrapper.stop(true,true).animate({left:-(number-1)*width},500,function(){
          $wrapper.css({left:-width})
          current = 1
        })
      }
  }
//click事件
   var prev = function(){go(current-1)}
   var next = function(){go(current+1)}

    $prev.on('click',function(){
      prev()
    })
    $next.on('click',function(){
      next()
    })
//autoplay mouseenter
    var timer
    $slides.on('mouseenter', function(){
      window.clearInterval(timer)
      hover = true
    }).on('mouseleave', function(){
      autoPlay()
      hover = false
    })
    var autoPlay = function(){
      timer = setInterval(function(){        
        next()        
      },1000)
    }
  })

}
$('.slides').slides()