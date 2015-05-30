/*
* JavaScript is weakly typed. There are types, but you 
* do not to specify at declaration. Types can also change
* after delcaration. 
*/

var x; //Creates a new object, value set to undefined
x = null; //Null != undefined; however both eval to false

x = 123; //Basic variable assignment
x = '123'; //Variable types can change

/*
* It is important that you used the correct operations when
* doing comparisions. == and === are different. == is a loose
* comparions and will try to typecast if necessary to compare.
* === ensures that the types of the objects match. 
*/
var a = 123;
var b = '123';
a == b; //Returns true
a === b; //Returns false

/*
* Arrays behave in the same manner as you are probably used
* to in different languages. You do not need to specify a 
* length, they will adjust in size. 
* Hashes are the building blocks for making Objects in 
* JavaScript. They are a key/value pairing that can map to
* any value, including functions. 
*/
x = [ ]; //Create a new array
x.push(1); //x is [1]
x[2] = 'abc'; //x is [1, undefined, 'abc']

x = { }; //Create a new hash
x = { 'key' : 'value' } //Initalize a new hash

/*
* Good programming practice for accessing properties of a hash
* is to use the dot notation if you know the key ahead of time.
* If that information is stored in a variable, use the bracket
* notation. 
*/
var key = 'key';
x['key']; //Returns 'value'
x.key; //Returns 'value'
x[key]; //Returns 'value'


/*
* Not using the 'var' keyword makes test a global variable
* Global variables can be implicilty accessed by using 
* the variable name (assuming there are no conflicting
* local variables. They are explicitly access using
* window.name on the client-side. 
*/
test = 123;

/*
* Javascript has function scope, which means that any 
* function that is called can access the scope of 
* whatever called it. It is extremely important that
* you understand scope and prevent naming conflicts to
* prevent this. It is typical for developers who do not
* know the namespace to wrap code in an anonymous function
* to prevent name conflicts
*/
x = 123; 
a = 0;
(function() {
	/* 
	* Here, you do not overwrite the global 'x', but
	* you also cannot access it anymore after defining
	* the local x. Good programming practice is to NOT
	* modify values that are not defined in your function
	* because it may have unintended consequences. Instead,
	* pass variables in and return what you need to.
	*/
	var x = 5;  
	a = 10;
})();
console.log(x); //Prints out 123
console.log(a); //Prints out 10

/*
 * Here is another example of scoping
*/
var func2 = function() {
  x = 0;
  isGlobal = true;
};

var func = function() {
  var x = 0;
  console.log(x); //Prints out 0
  console.log(window.x); //Prints out 123

  /*
  * Variables are not limited to the code block they
  * reside in. For this reason, it is suggested that
  * variables are defined at the top of the function
  * for clarity. Here it looks like y is created 
  * each iteration and only exists inside the while loop. 
  * However, it is created once and exists outside 
  * of the loop. 
  */
  while (x < 5) {
    var y = 0;
    y++;
    x++;
  }
  console.log(x); //Prints out 5
  console.log(y); //Prints out 1

  func2();
  
  console.log(x); //Prints out 0
  console.log(isGlobal); //Prints out true
};

/*
 * There are two ways to define a function 
*/
var func1 = function(param1, param2) {

};

function func2(param1, param2) {

};

/*
 * The difference is that func1 is defined at
 * run-time while func2 is defined at parse-time
 * The suggestion is to use the func1 way because
 * it helps to see the visibility/scope of the 
 * function while func2 is ambigious and may
 * be either local or global scope when looking  
 * at the prototype alone. There is a big difference
 * that is important to note. The func1 way means
 * that the function cannot be called before it
 * is defined, while the func2 way can be called
 * before it is defined. You should be defining
 * functions before using them anyway, so this 
 * should not be a problem.
*/

/* 
 * Callbackas are an important part of JavaScript.
 * they allow you to have non-blocking code. Here
 * is an example of a callback.
*/

var example = function(x, cb) {
	cb(x + 5);
}
example(5, function(val) {
	console.log(val);
});

/* 
 * Here, 'example' is called with a number and a 
 * function. It adds 5 to the number and then calls
 * the provided function with the result. Typically
 * you see this with IO operations on the sever-side.
*/
console.log('Start');
fs.readFile('./test.txt', function(string) {
	console.log(string);
});
console.log('Stop');

/*
 * This feature of JavasScript allows code execution
 * to continue instead of waiting for an operation. 
 * It is likely that this will print out 'Start', 
 * 'Stop', and then the contents of the file. When 
 * this JavaScript is run, the request is made to
 * read the file, but it continues until the contents
 * are returned. The callback guides execution after
 * the contents have been retrieved. You can use
 * function scoping to still access the variables 
 * you need, even though the CPU finished execution
 * in that code block.  
*/

/*
 * To create an Object, you write a constructor
 * and bind all of the Object's properties to 'this'
*/

var Person = function(name) {
	this.name = name;
};

Person.prototype.sayName = function() {
	console.log('My name is: ' + this.name);
};

var john = new Person('John Doe');
john.sayName(); //Prints out 'John Doe'

/*
 * If you do not need to extend Person for any reason,
 * this can be shortened to
*/
var Person = function(name) {
	this.name = name;
	this.sayName = function() {
		console.log('My name is: ', + this.name);
	}
};
