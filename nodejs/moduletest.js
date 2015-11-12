var book1=require('./module1.js');
var book2=require('./module1.js');

book1.rate(10);
book2.rate(20);
//20,20
console.log(book1.getPoints()+","+book2.getPoints());

var book3=require('./module2.js')();
var book4=require('./module2.js')();
book3.rate(10);
book4.rate(20);

//10,20
console.log(book3.getPoints()+","+book4.getPoints());