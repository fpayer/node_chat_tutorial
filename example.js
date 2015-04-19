var x; //Creates a new object, value set to undefined
x = null; //Null != undefined, both eval to false

x = 123; //Basic variable assignment
x = '123'; //Variable types can change

//Be careful with value checking
var a = 123;
var b = '123';
a == b; //Returns true
a === b; //Returns false

//Arrays + Hashes
x = [ ]; //Create a new array
x.push(1); //x is [1]
x[2] = 'abc'; //x is [1, undefined, 'abc']

x = { }; //Create a new hash
x = { 'key' : 'value' } //Initalize a new hash

var key = 'key';
x['key']; //Returns 'value'
x.key; //Returns 'value'
x[key]; //Returns 'value'


//Javascript has function scope
x = 123;

var func2 = function() {
  window.x = 5;
  abc = 123;
};

var func = function() {
  var x = 0;
  console.log(x); //Prints out 0
  console.log(window.x); //Prints out 123

  while (x < 5) {
    var y = 0;
    y++;
    x++;
  }
  console.log(y) //Prints out 1;

  func2();
};
