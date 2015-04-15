$(document).ready(function(){
	var canvas=document.getElementById("canvas");
	var context=canvas.getContext('2d');
	var readout=document.getElementById('readout');
	
	
	function windowToCanvas(canvas,x,y){
		var bbox=canvas.getBoundingClientRect();
		return {x:x-bbox.left*(canvas.width/bbox.width),
		  y:y-bbox.top*(canvas.height/bbox.height)
		};
	}
	
	function drawRect()
	{
		
	}
}