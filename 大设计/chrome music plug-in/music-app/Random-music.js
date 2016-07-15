//播放控制
var myAudio = $("audio")[0];
var Info = new Object();
var lyricArr = [];
// 播放/暂停控制
$(".btn1").click(function(){
	if ($(this).hasClass('m-play')) {
		play()
	} else {
		pause();
		$('.progressbar').stop()	
	}
});
// 频道切换
$(".btn2").click(function(){
	// getChannel();
	$('.music-lyric .lyric').empty()
	$('.progressbar').stop()	
	var event = 'nextId';
	sendmessage(event);
});
// 播放下一曲音乐
$(".btn3").click(function(){
	$('.music-lyric .lyric').empty()
	$('.progressbar').stop()	
	var event = 'next'
	sendmessage(event);
    start()
});
function play(){
	var event = 'play';
	sendmessage(event)
    $('.btn1').removeClass('m-play').addClass('m-pause');
}
function pause(){
	var event = 'pause'
	sendmessage(event)
	$('.btn1').removeClass('m-pause').addClass('m-play');
}
function renderLyric(){
	var lyrLi = "";
    for (var i = 0; i < Info.lyricArr.length; i++) {
        lyrLi += "<li data-time='"+Info.lyricArr[i][0]+"'>"+Info.lyricArr[i][1]+"</li>";
    }
    $('.music-lyric .lyric').append(lyrLi);
    setInterval(showLyric,100);//怎么展示歌词
}
function showLyric(){
    var liH = $(".lyric li").eq(5).outerHeight()-3; //每行高度
    for(var i=0;i< Info.lyricArr.length;i++){//遍历歌词下所有的li
        var curT = $(".lyric li").eq(i).attr("data-time");//获取当前li存入的当前一排歌词时间
        var nexT = $(".lyric li").eq(i+1).attr("data-time");
        var curTime = Info.time;
        if ((curTime > curT) && (curT < nexT)){//当前时间在下一句时间和歌曲当前时间之间的时候 就渲染 并滚动
            $(".lyric li").removeClass("active");
            $(".lyric li").eq(i).addClass("active");
            $('.music-lyric .lyric').css('top', -liH*(i-2));
        }
    }
}
//icon
$('.m-star').on('click',function(){
	$(this).toggleClass('stared')
})
$('.m-heart').on('click',function(){
	$(this).toggleClass('loved')
})
$('.m-xunhuan').on('click',function(){
	$(this).toggleClass('recycleed').toggleClass('colored')
	if ($(this).hasClass('recycleed')) {
		$('audio').attr('loop','loop');
	}
	if($(this).hasClass('colored')){
		$('audio').removeAttr('loop','no-loop');
	}
})
$('.m-lyric').on('click',function(){
	$(this).toggleClass('lyriced');
	if ($(this).hasClass('lyriced')) {
		$('.background .music-lyric').css({'display':'block'})
	}else{
		$('.background .music-lyric').css({'display':'none'})
	}
})
function start(){
	$('.record').text(Info.channelname);
	$('.record').attr('title',Info.channelname);
	$('.record').attr('data-id',Info.channelId);
	$('audio').attr('src',Info.url);
	$('audio').attr('sid',Info.sid);
	$('audio').attr('ssid',Info.ssid);
	$('.musicname').text(Info.title);
	$('.musicname').attr('title',Info.title)
	$('.musicer').text(Info.author);
	$('.musicer').attr('title',Info.author)
	$(".background").css({
		'background':'url('+Info.bgPic+')',
		'background-repeat': 'no-repeat',
		'background-position': 'center',
		'background-size': 'cover',
	});
	if (Info.duration == null) {
		Info.duration = 1
	}
	var length = Info.time/Info.duration*100;
	$('.progressbar').width(length+'%');
	if ($('btn1').hasClass('m-pause')) {
		setbar();
	}
	renderLyric();
}
function setbar(){
	var datatime = Math.floor((Info.duration-Info.time)*1000)
	$('.progressbar').animate({width:'100%'},datatime)
}
sendmessage(0);
$(".basebar").mousedown(function(ev){  //拖拽进度条控制进度
	var posX = ev.clientX;
	var targetLeft = $(this).offset().left;
	var percentage = (posX - targetLeft)/400*100;
	myAudio.currentTime = myAudio.duration * percentage/100;
});
function present(){
	var length = Info.time/Info.duration*100;
	$('.progressbar').width(length+'%');//设置进度条长度
}
function sendmessage(event){
	chrome.runtime.sendMessage(event, function(response){
    Info = response;
    start()
});
}
// $(document).ready(start())