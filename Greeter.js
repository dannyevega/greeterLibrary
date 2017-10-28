// set up Greeter library so it generates an Object

// want to be able to call G$(firstName, lastName, language) and it gives us back an Object similar to jQuery library

// passing in the window as a parameter as well as jQuery since it will be incorporated with this Greeter library
(function(global, $){
	
	// Greeter function returns a new Object created with Greeter.init function constructor below
	var Greeter = function(firstName, lastName, language){
		// function constructor used to generate new Objects - that way, we don't have to always set up Object with 'new' keyword
		return new Greeter.init(firstName, lastName, language);		
	}
	
	// languages, greetings, formalGreetings and printMessages are not exposed outside of this context until we tell it do so
	var languages = ["english", "spanish"];
	
	// informal greetings
	var greetings = {
		english: "Hello",		
		spanish: "Hola"
	};
	
	// formal greetings
	var formalGreetings = {
		english: "Greetings",
		spanish: "Saludos"
	};
	
	// log print messages
	var printMessages = {
		english: "Logged in",
		spanish: "Indicío sesión"
	};
	
	// Initially set prototype to an empty Object - well store any methods we want to use on our Object thats returned from calling Greeter
	Greeter.prototype = {
		
		// returns the Objects full name
		fullName: function(){
			return this.firstName + " " + this.lastName;
		},
		
		// checks if the language passes in is valid
		validate: function(){
			if(languages.indexOf(this.language) === -1){
				throw new Error("Invalid language");
			}
		},
		
		// informal greeting message
		greeting: function(){
			return greetings[this.language] + " " + this.firstName + "!";
		},
		
		// formal greeting message
		formalGreeting: function(){
			return formalGreetings[this.language] + ", " + this.fullName();
		},
		
		// greet function is what well be using mostly - just pass what type of greeting you want
		greet: function(formal){
			var message;
			
			// checks if there is a value and will be either coerced to undefined or null
			if(formal){
				message = this.formalGreeting();
			} else  {
				message = this.greeting();
			}
			
			// prints to the console
			if(console){
				console.log(message);
			}
			
			// 'this' refers to calling the Object at execution time - makes the method chainable like jQuery
			return this;
		},
		
		log: function(){
			// because IE is stupid and doesnt have a console variable unless its opened
			if(console){
				console.log(printMessages[this.language] + ": " + this.fullName());
			}
			
			// make it chainable
			return this;
		},
		
		setLanguage: function(language){
			// set language
			this.language = language;
			
			// make sure its valid
			this.validate();
			
			// make it chainable
			return this;
		},
		
		DOMGreeting: function(selector, formal){
			// checks if jquery is loaded
			if(!$){
				throw new Error("jQuery is not loaded");
			}
			
			// checks if we passed in a selector
			if(!selector){
				throw new Error("Missing jQuery selector");
			}
			
			// checks which message to return
			var message;
			if(formal){
				message = this.formalGreeting();
			} else  {
				message = this.greeting();
			}
			
			// updates the html of the selector passed in with our message
			$(selector).html(message);
			
			// makes it chainable
			return this;
		}
		
	};
	
	// here's the function constructor that creates Objects
	Greeter.init = function(firstName, lastName, language){		
		var self = this;		
		self.firstName = firstName || "";
		self.lastName = lastName || "";
		self.language = language || "english";
		self.validate();
	}
	
	// Any Object created from Greeter.init function constructor will point here - set it equal to Greeter.prototype so all Objects will inherit any methods we include there
	// i.e. any Objects created from this function, should point to Greeter.prototype for its prototype chain
	Greeter.init.prototype = Greeter.prototype;
	
	// Create an alias (G$) - we attach the alias to the Global object which we passed into the IIFE - on the Global object, G$ and Greeter will point to value inside Greeter function
	global.Greeter = global.G$ = Greeter;
	
}(window, jQuery));