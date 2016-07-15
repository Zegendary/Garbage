function Music($element,options){
  this.options = options;
  this.$element = $element;
  this.init();
}
Music.prototype.init = function(){
  this.prepareHtml();
  this.bindEvents();
  if(this.options.hide){
    this.hidden();
  }else{
    this.show();
  }
}
Music.prototype.prepareHtml = function(){
  var $parent = this.$element;
  $("<link>").attr({ 
    rel: "stylesheet",
    type: "text/css",
    href: "http://at.alicdn.com/t/font_1467024049_9811914.css"
    }).appendTo("head");
  $('<meta>').attr({
    name: "referrer",
    content: "no-referrer"
  }).appendTo("head");
  var html = '<div class="music-wrapper">'+
                '<div class="music-content">'+
                  '<audio src=""></audio>'+
                  '<div class="music-massage">'+
                    '<p class="musicname" title=""></p>'+
                    '<p class="musicer" title=""></p>'+
                    '<p class="record" title="" data-id=""></p>'+
                  '</div>'+
                  '<div class="play-control">'+
                    '<span class="m-icon m-play btn1" title="播放/暂停"></span>'+
                    '<span class="m-icon m-change btn2" title="换频道"></span>'+
                    '<span class="m-icon m-next btn3" title="换曲"></span>'+
                  '</div>'+
                  '<span class="basebar">'+
                    '<span class="progressbar"></span>'+
                  '</span>'+
                '</div>'+
              '<div class="wrapper-push">></div>'+
            '</div>';
  var $node = $(html);
  $parent.append($node);
  $('.music-wrapper').css({
    'position':'fixed',
    'width': '20px',
    'height':'80px',
    'bottom':'2px',
    'left': '1px',
    'overflow': 'hidden',
    'vertical-align': 'top',
    'border-radius': '5px',
    'font-size':'0px',
    '-webkit-user-select': 'none',
	'-moz-user-select': 'none',
	'-ms-user-select': 'none',
	'user-select': 'none'
  });
  $('.music-wrapper .music-content').css({
    width: '0px',
    height: '80px',
    display: 'inline-block',
    'overflow': 'hidden',
    background: 'rgba(180,180,180,0.1)'
  });
  $('.music-content .music-massage').css({
    width: '150px',
    height: '70px',
    'line-height': '60px',
    display: 'inline-block'
  });
  $('.music-content .play-control').css({
    width: '120px',
    height: '70px',
    'line-height': '85px',
    display: 'inline-block',
    'vertical-align': 'top',
    'text-align': 'center'
  });
  $('.music-wrapper .wrapper-push').css({
    height: '80px',
    width: '20px',
    'line-height': '80px',
    position: 'absolute',
    right:'0px',
    'font-size':'20px',
    'text-align': 'center',
    display: 'inline-block',
    'vertical-align': 'top',
    background: 'rgba(100,100,100,0.1)',
    cursor: 'default'
  });
  $('.music-content .basebar').css({
    display: 'block',
	border:'none',
	width: '260px',
	height: '4px',
	margin: '3px auto 0px auto',
	'border-radius': '2px',
	'background-color': '#414141',
	position: 'relative'
  });
  $('.basebar .progressbar').css({
    display: 'block',
	border:'none',
	width: '0%',
	height: '4px',
	'border-radius': '2px',
	'background-color': '#cdd2d7'
  });
  $('.play-control .btn1').css({
    display: 'inline-block',
	width: '38px',
	height: '38px',
	'border-radius': '19px',
	background: '#414141',
	color: '#d9d9d9',
	'font-size': '20px',
	'text-align': 'center',
	'line-height': '38px'
  });
  $('.play-control .btn2,.play-control .btn3').css({
    display: 'inline-block',
	width: '28px',
	height: '28px',
	'border-radius': '14px',
	background: '#414141',
	color: '#d9d9d9',
	'font-size': '16px',
	'text-align': 'center',
	'line-height': '28px'
  });
  $('.play-control .btn2').css({
    margin: '0 5px'
  });
  $('.music-massage p').css({
    'padding-left': '10px',
    'white-space':'nowrap',
	'text-overflow':'ellipsis',
	'overflow': 'hidden',
    'font-family': '微软雅黑, sans-serif',
	'-webkit-font-smoothing': 'antialiased',
    '-webkit-text-fill-color': 'white',
    '-webkit-text-stroke': '1px black',
    cursor: 'default'
  });
  $('.music-massage .musicname').css({
    'font-weight': 'bolder',
	'font-size': '21px',
    'line-height':'21px',
    'margin-top':'5px'    
  });
  $('.music-massage .musicer').css({
    'font-weight': 'bolder',
	'font-size': '18px',
    'line-height':'18px',
    'margin': '2px 0'
  });
  $('.music-massage .record').css({
    'font-weight': 'bolder',
    'font-size': '15px',
    'line-height':'15px'
  })
}
Music.prototype.bindEvents = function(){
  var myAudio = $("audio")[0];
  // 播放/暂停控制
  $(".btn1").click(function(){
      if (myAudio.paused) {
          play()
      } else {
          pause()
      }
  });
  // 频道切换
  $(".btn2").click(function(){
      getChannel();
  });
  // 播放下一曲音乐
  $(".btn3").click(function(){
      getmusic();

  });
  function play(){
      myAudio.play();
      $('.btn1').removeClass('m-play').addClass('m-pause');
  }
  function pause(){
      myAudio.pause();
      $('.btn1').removeClass('m-pause').addClass('m-play');
  }
  //获取频道信息
  function getChannel(){
      $.ajax({
          url: 'http://api.jirengu.com/fm/getChannels.php',
          dataType: 'json',
          Method: 'get',
          success: function(response){
              var channels = response.channels;
              var num = Math.floor(Math.random()*channels.length);
              var channelname = channels[num].name;
              var channelId = channels[num].channel_id;
              $('.record').text(channelname);
              $('.record').attr('title',channelname);
              $('.record').attr('data-id',channelId);
              getmusic();
          }
      })
  }
  // 通过ajax获取歌曲
  function getmusic(){
      $.ajax({
          url: 'http://api.jirengu.com/fm/getSong.php',
          dataType: 'json',
          Method: 'get',
          data:{
                'channel': $('.record').attr('data-id')
              },
          success: function (ret) {
             var resource = ret.song[0],
                 url = resource.url,
                 bgPic = resource.picture,
                 sid = resource.sid,//
                 ssid = resource.ssid,//
                 title = resource.title,
                 author = resource.artist;
             $('audio').attr('src',url);
             $('.musicname').text(title);
             $('.musicname').attr('title',title)
             $('.musicer').text(author);
             $('.musicer').attr('title',author)
             $(".music-content").css({
                  'background':'url('+bgPic+')',
                  'background-repeat': 'no-repeat',
                  'background-position': 'center',
                  'background-size': 'cover',
              });
             play();//播放
          }
      })
  };
  //进度条控制
  setInterval(present,500)	//每0.5秒计算进度条长度
  $(".basebar").mousedown(function(ev){  //拖拽进度条控制进度
      var posX = ev.clientX;
      var targetLeft = $(this).offset().left;
      var percentage = (posX - targetLeft)/260*100;
      myAudio.currentTime = myAudio.duration * percentage/100;
  });
  function present(){
      var length = myAudio.currentTime/myAudio.duration*100;
      $('.progressbar').width(length+'%');//设置进度条长度
      //自动下一曲
      if(myAudio.currentTime == myAudio.duration){
      getmusic()
      }			
  } 
  $(document).ready(getChannel())
}
Music.prototype.hidden = function(){
  $('.music-wrapper').on('mouseenter',function(){
    $('.music-wrapper').animate({width:'300px'},500);
    $('.music-wrapper .music-content').animate({width:'280px'},500);
  });
  $('.music-wrapper').on('mouseleave',function(){
    $('.music-wrapper').animate({width:'20px'},500);
    $('.music-wrapper .music-content').animate({width:'0px'},500);
  })
}
Music.prototype.show = function(){
  $('.music-wrapper').width(300);
  $('.music-wrapper .music-content').width(280);
}
$.fn.Music = function(options){
  var element = this;
  var music = new Music($(element),options)
}