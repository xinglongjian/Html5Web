/**
 * 创建一个jewel命名空间，并返回所有需要的模块
 * 这种方式也是在一个js文件里返回一个js对象，该对象包含了很多属性和方法，有点面向对象的意思
 */
var jewel=(function(){
	
	var scriptQueue=[],
	    numResourcesLoaded=0,
	    numResources=0;
	    executeRunning=false;
	function executeScriptQueue(){
		var next=scriptQueue[0],first,script;
		if(next&&next.loaded){
			executeRunning=true;
			//remove the first element in the queue
			scriptQueue.shift();
			first=document.getElementsByTagName('script')[0];
			script=document.createElement('script');
			script.onload=function(){
				if(next.callback){
					next.callback();
				}
				//try to execute more script
				executeScriptQueue();
			};
			script.src=next.src;
			first.parentNode.insertBefore(script,first);
		}else{
			executeRunning=false;
		}
	}
	
	function load(src,callback){
		var image,queueEntry;
		numResources++;
		
		//添加这个资源到执行队列
		queueEntry={
			src:src,
			callback:callback,
			loaded:false
		};
		
		scriptQueue.push(queueEntry);
		
		image=new Image();
		image.onload=image.onerror=function(){
			numResourcesLoaded++;
			queueEntry.loaded=true;
			if(!executeRunning){
				executeScriptQueue();
			}
		};
		image.src=src;
	}
	
	function setup(){
		console.log("Success!");
		jewel.showScreen("splash-screen");
	}
	
	//hide the active screen and show the screen with the specified id
	function showScreen(screenId){
		var dom=jewel.dom,
		    $=dom.$,
		    activeScreen=$("#game .screen.active")[0],
		    screen=$("#"+screenId)[0];
		if(activeScreen){
			dom.removeClass(activeScreen,"active");
		}
		dom.addClass(screen,"active");
	}
	
	return {
		load:load,
		setup:setup,
		showScreen:showScreen
	}
})();
