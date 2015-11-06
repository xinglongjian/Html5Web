jewel.screens['splash-screen']=(function(){
	var firstRun=true;
	
	function setup(){
		jewel.dom.bind("#splash-screen","click",function(){
			jewel.showScreen("main-menu");
		});
	}
	
	function run(){
		if(firstRun){
			setup();
			firstRun=false;
		}
	}
	
	return{
		run:run
	}
	
})();
