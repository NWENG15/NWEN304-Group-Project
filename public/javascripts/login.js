/*
This is used to send the login information and store the token recieved if login is successful.
Also alters the website if user is logged in and adds the token when navigating the website
*/
$(document).ready(function(){
	var str = String(window.location);

	//current link does not use a token
	if(!str.includes("?token=")){ 
		//check if we have a token saved
		if(localStorage.getItem('bookToken') != null) {
			
			if(str.includes("search")){ //if we are searching as well
				str = str.concat('&?token=');
			}
			else{
				str = str.concat('?token=');
			}
			str = str.concat(String(localStorage.getItem('bookToken')))
			window.location = str; //redirect to same location with token
		}
	}
	
	//Change Navbar if a user is logged in 
	var userEmail = localStorage.getItem('email');
	if(userEmail != null){
		$('#signup').text(userEmail); 
		$('#logInButton').text('Logout')
	}

	
	//when submitting a login form
	$("#login").on('submit',function(e){
		e.preventDefault();
		var email = document.forms["auth"]["email"].value;
		var password = document.forms["auth"]["password"].value;
		var formData = {email: email, password: password};
		$.post('/login/send',formData, function(data, status){
			if(status =="success" && data.token !== undefined){
				localStorage.setItem('bookToken', data.token); //set token in browser
				localStorage.setItem('email', data.email); //set email in browser
				localStorage.setItem('user', data.userName); //set user in browser
				window.location = '/?token='+localStorage.getItem('bookToken'); //redirect to homepage with token
				return false;

			}
			window.location = '/login';
		});
		return false;
	});


	//these functions add the token when changing page
	
	//home page
	$('#home').click(function(evt){
		//alert('click');
		var token = localStorage.getItem('bookToken');
		if(token == null)
			return true;
		
		evt.preventDefault();
		window.location = '/?token='+ localStorage.getItem('bookToken');
	});
	
		//browse page
	$('#browse').click(function(evt){
		var token = localStorage.getItem('bookToken');
		if(token == null)
			return true;
		
		evt.preventDefault();
		window.location = '/browse?token='+ localStorage.getItem('bookToken');
	});
	
	//submit page
	$('#signup').click(function(evt){
		var token = localStorage.getItem('bookToken');
		if(token == null)
			return true;
		
		evt.preventDefault();
		window.location = '/signup?token='+ localStorage.getItem('bookToken');
	});
	
		//login page
	$('#logInButton').click(function(evt){
		var token = localStorage.getItem('bookToken');
		if(token == null)
			return true;
		
		evt.preventDefault();
		window.location = '/login?token='+ localStorage.getItem('bookToken');
	});

	
});