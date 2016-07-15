  function Slides($element, options){
    this.options = options
    this.$element = $element
    this.timer = null
    this.init()
}

Slides.prototype.init = function(){  
  this.prepareHtml()
  this.bindEvents()
  if(this.options.auto){
      this.autoPlay()
    }
  
}
//prepareHtml部分
Slides.prototype.prepareHtml = function(){
    var $art = this.$element
  var options = this.options
  var current = this.current = 1
    var width = this.width = options.width;
  var height = options.height;

  var $pics = this.$pics = $art.children().wrapAll('<div class=list></div>').css({
    width: width,
        height: height,
        float: 'left',
  })
    var number = this.number = $pics.length+2;
  var $list = this.$list = $art.children().wrapAll('<div class=viewpoint></div>')
    var $first = this.$first = $pics.first()
  var $last = this.$last = $pics.last()
  $first.clone().appendTo($list)
  $last.clone().prependTo($list);
  $list.css({
    width: number * width,
    height:height,
    position: 'relative',
    left: -width,
  })
  var $viewpoint = this.$viewpoint = $list.parent()
  $viewpoint.css({
    width: width,
        height : height,
    overflow: 'hidden',
        position: 'relative',
  })
    if(options.nav){
    var $prev = this.$prev = $('<button class="slides-prev"><</button>')
    $prev.appendTo($viewpoint);
    var $next = this.$next = $('<button class="slides-next">></button>').appendTo($viewpoint);
    $prev.css({
      position:'absolute',
      left:'0',
      top:'50%',
      border:'none',
      height:'30px',
      'margin-top':'-15px'
    })
    $next.css({
      position:'absolute',
      right:'0',
      top:'50%',
      border:'none',
      height:'30px',
      'margin-top':'-15px'
    })
  }
  
  var hover = this.hover = false;
}
//绑定动作部分
Slides.prototype.bindEvents = function(){
    var self = this
  this.$prev.on('click', function(){
    self.prev()
  })
  this.$next.on('click', function(){
    self.next()
  });
  this.$pics.on('mouseenter', function(){
      window.clearInterval(self.timer)
      self.hover = true
    }).on('mouseleave', function(){
      if(self.options.auto){
        self.autoPlay()
        self.hover = false
      }
    })
}
//动作函数go
Slides.prototype.next = function(){
  this.go(this.current +1)
}
Slides.prototype.prev = function(){
  this.go(this.current -1)
}
Slides.prototype.go = function(index){
  var options = this.options;
  var width = options.width;
  var left = index*(-width)
  var timer = this.timer
  var number = this.number
  var $list = this.$list
  var current = this.current
  var self = this
  if(timer){
        window.clearInterval(timer)
      }
    if(!this.hover){
          this.autoPlay()
        }
    if(index!=0&&index!=number-1){
    $list.stop(true,true).animate({
        left: left 
      },500,function(){
        self.current = index        
    })      
    }else    
      if(index == 0){
        $list.stop(true,true).animate({left:0},500,function(){
          $list.css({left:(-number+2)*width})
          self.current = number-2
        })        
      }else
      if(index == number-1){
        $list.stop(true,true).animate({left:-(number-1)*width},500,function(){
          $list.css({left:-width})
          self.current = 1
        })
      }
  
}

//自动播放部分
Slides.prototype.autoPlay = function(){
    var self = this
  this.timer = setInterval(function(){
    self.next()
  },2000)
}
$.fn.slides = function(options){
    this.each(function(){
    var element = this
    var slides = new Slides($(element),options)  
  })
}