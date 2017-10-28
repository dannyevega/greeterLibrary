// set up Greeter library so it generates an Object

// want to be able to call G$(firstName, lastName, language) and it gives us back an Object similar to jQuery library

// passing in the window as a parameter as well as jQuery since it will be incorporated with this Greeter library
(function(global, $){
	
	// Greeter function returns a new Object created with Greeter.init function constructor below
	var Greeter = function(firstName, lastName, language){
		// function constructor used to generate new Objects - that way, we don't have to always set up Object with 'new' keyword
		return new Greeter.init(firstName, lastName, language);		
	}
	
	// Initially set prototype to an empty Object - well store any methods we want to use on our Object thats returned from calling Greeter
	Greeter.prototype = {};
	
	// here's the function constructor that creates Objects
	Greeter.init = function(firstName, lastName, language){		
		var self = this;		
		self.firstName = firstName || "";
		self.lastName = lastName || "";
		self.language = language || "English";
	}
	
	// Any Object created from Greeter.init function constructor will point here - set it equal to Greeter.prototype so all Objects will inherin any methods we include there
	// i.e. any Objects created from this function, should point to Greeter.prototype for its prototype chain
	Greeter.init.prototype = Greeter.prototype;
	
	// Create an alias (G$) - we attach the alias to the Global object which we passed into the IIFE - on the Global object, G$ and Greeter will point to value inside Greeter function
	global.Greeter = global.G$ = Greeter;
	
}(window, jQuery));