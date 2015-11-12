/**
 * npm install mocha -g
 */

var assert=require('assert');
describe('Test JSON reader',function(){
	it('should get json',function(){
		var reader =require('./JSONReader');
		assert.equal(typeof reader,'object');
		assert.equal(typeof reader.read,'function');
		
	});
});
