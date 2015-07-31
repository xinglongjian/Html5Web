$(document).ready(function(){
	var canvas=document.getElementById("canvas");
	var context=canvas.getContext('2d');
	
	console.profile('Core Html5 Animation');
	context.font='38pt Arial';
	context.fillStyle='cornflowerblue';
	context.strokeStyle='blue';
	context.fillText('Hello Canvas',canvas.width/2-150,canvas.height/2+15);
	context.strokeText('Hello Canvas',canvas.width/2-150,canvas.height/2+15);
	
	//圆角
	//context.lineJoin='round';
	//context.lineWidth=10;
	//context.strokeRect(10,20,50,50);
	
	context.beginPath();
	context.rect(10,10,100,100);
	context.stroke();
	//context.beginPath();
	context.rect(70,70,100,100);
	context.stroke();
	context.rect(90,90,100,100);
	context.stroke();
	
	console.profileEnd();
});
