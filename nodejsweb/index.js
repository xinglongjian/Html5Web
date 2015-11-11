/**
 * create nodejsweb base on express4.13.3
 */
var express = require('express');

var app =express();

//config the views
app.set('views','./views');
app.set('view engine','jade');


app.get('/',function(req,res){
	//res.send('hello world');
	res.render('index',{title:'Hey',message:'hello there!'});
});




var server = app.listen(3000,function(){
	var host=server.address().address;
	var port=server.address().port;
	
	console.log('Example app listening at http://%s:%s',host,port);
});
