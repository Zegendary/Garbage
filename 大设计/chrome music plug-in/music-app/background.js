var myAudio = $("audio")[0];
var info = new Object();
//获取频道
function getChannels(callback){
	$.ajax({
		url: 'http://api.jirengu.com/fm/getChannels.php',
		dataType: 'json',
		Method: 'get',
		success: function(response){
		    var channels = response.channels;
			var num = Math.floor(Math.random()*channels.length);
			info.channelname = channels[num].name;
			info.channelId = channels[num].channel_id;
			getSong(callback)
		}
	})
}
//获取歌曲
function getSong(callback){
	$.ajax({
		url: 'http://api.jirengu.com/fm/getSong.php',
		dataType: 'json',
		Method: 'get',
		data:{
		      'channel': info.channelId
		    },
		success: function (ret) {
		    var resource = ret.song[0];
			info.url = resource.url;
			info.bgPic = resource.picture;
			info.sid = resource.sid;//
			info.ssid = resource.ssid;//
			info.title = resource.title;
			info.author = resource.artist;
	        $('audio').attr('src',info.url);
	        
	        myAudio.play();
	        current();
	        getlyric(callback);//获取歌词
		}
	})
}
//获取歌词
function getlyric(callback){
	$.post('http://api.jirengu.com/fm/getLyric.php', {ssid: info.ssid, sid: info.sid})
        .done(function (lyr){
        	var lyr = JSON.parse(lyr);;
        	if (!!lyr.lyric) {
	        	// $('.music-lyric .lyric').empty();//清空歌词信息
	        	var line = lyr.lyric.split('\n');//歌词为以排数为界的数组
                var timeReg = /\[\d{2}:\d{2}.\d{2}\]/g;//时间的正则
                var result = [];
                if(line != ""){
                    for(var i in line){//遍历歌词数组
                        var time = line[i].match(timeReg);//每组匹配时间 得到时间数组
                        if(!time)continue;//如果没有 就跳过继续
                        var value = line[i].replace(timeReg,"");// 纯歌词
                        for(j in time){//遍历时间数组
                            var t = time[j].slice(1, -1).split(':');//分析时间  时间的格式是[00:00.00] 分钟和毫秒是t[0],t[1]
                            //把结果做成数组 result[0]是当前时间，result[1]是纯歌词
                            var timeArr = parseInt(t[0], 10) * 60 + parseFloat(t[1]); //计算出一个curTime s为单位
                            result.push([timeArr, value]);
                        }
                    }
                }
	            //时间排序
	            result.sort(function (a, b) {
	                return a[0] - b[0];
	            });
	            info.lyricArr = result;//存到lyricArr里面
	            // renderLyric();//渲染歌词
	            callback(info)
        	}
        }).fail(function(){
        	info.lyricerror = "<li>本歌曲展示没有歌词</li>";
        })
}
if (myAudio.currentTime == myAudio.duration) {
	getSong()//自动获取下一首
	}
function current(){
	info.time = myAudio.currentTime
	info.duration = myAudio.duration
}
getChannels()
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message == 'next'){
        getSong(function(info){sendResponse(info)});
        
    }
    if (message == 'nextId') {
    	getChannels();
    	sendResponse(info);
    }
    if (message == 'play') {    	
    	current();
    	myAudio.pause();
    	sendResponse(info);
    }
    if (message == 'pause') {
    	myAudio.pause();
    	current();
    	sendResponse(info)
    }
    if (message == 0) {
    	// getChannels(function callback(info){sendResponse(info)});
    	sendResponse(info)
    }
});