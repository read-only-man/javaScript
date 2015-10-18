var foo = 'foo';
var myObject = {foo:'I am my object foo'};
var sayFoo = function(){
		console.log(this['foo']);
}
sayFoo.apply(myObject);
sayFoo.apply(this);

