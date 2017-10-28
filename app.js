var danny = G$("Danny", "Vega");
//danny.greet().setLanguage('spanish').greet(true).log();

// when we click the button...
$('#login').click(function(){
	
	// this creates a new Object using our Greeter function
	var loginGreeter = G$("Danny", "Vega");
	
	// hide the UI using jQuery
	$("#login-container").hide();
	
	// set the language based on whats selected in the select box - chain the DOMGreeting method to udpate the DOM and then log it to the console
	loginGreeter.setLanguage($("#language").val()).DOMGreeting('#greeting', true).log();
	
})