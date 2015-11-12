var BookClass=require('./book.js');
var book=new BookClass();

book.on('rated',function(){
	console.log('rated width='+book.getPoints());
});

book.rate(10);