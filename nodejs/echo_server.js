/**
 * test echo server
 */

var net=require('net');
var server=net.createServer(function(socket){//'connection' listener
	console.log('client connected!')
	socket.on('end',function(){
		console.log('client disconnected!');
	});
	
	socket.on('data',function(data){
		console.log(data.length);
		data=data.slice(0,data.length-2);//here include enter char
		console.log('type='+typeof(data)+",data="+data.toString());
		data=data.toString();
		var str1='hello';
		var str2='hello';
		if(str1==str2){
			console.log('type='+typeof(str1));
			console.log('hello same');
		}
		if(new String(data)=='bye')
		{		
			console.log('bye same');
		}
		console.log('type='+typeof('bye'));
		console.log(',data='+(data=='bye'));
		if(data == 'bye'){
			console.log('disconnected');
			socket.end();
		}
		socket.write(data);
		
	});
});

server.listen(8888);