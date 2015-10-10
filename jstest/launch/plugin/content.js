/*负责与网站页面交互*/
var launch_message;
document.addEventListener("myCustomEvent",function(evt){
	chrome.runtime.sendMessage({type:'launch',message:evt.detail},function(response){
		console.log(response);
	});
},false);
