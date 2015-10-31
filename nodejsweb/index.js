/**
 * create nodejsweb base on express4.13.3
 */
var express = require('express');
var app =express();

app.get('/',function(req,res){
	res.send('hello world');
});


var server = app.listen(3000,function(){
	console.log(typeof(server));
	console.log(typeof(server.address()));
	var host=server.address().address;
	var port=server.address().port;
	
	console.log('Example app listening at http://%s:%s',host,port);
});
