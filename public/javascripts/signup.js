$(document).ready(function(){
	//when signup button is pressed
    $("#test2").on('submit', function(e){
        e.preventDefault();
		validateForm();
    });
	
	
	/* Checks inputs are valid then sends to server
	*/
	function validateForm(){	
	var userName = document.forms["signup"]["name"].value;
	if (userName === ""){
		alert('Name field is blank');
		return;
	}
	
	if(userName/length >50){
		alert("name is too long");
	}
	
	var userEmail = document.forms["signup"]["email"].value;
	if (userEmail === ""){
		alert('email is blank');
		return;
	}
	
	
	var password1 = document.forms["signup"]["password"].value;
	if(password1 != document.forms["signup"]["confirmPassword"].value || password1 ===""){
		alert('Passwords are not identical');
		return;
	}

	var formData = {name: userName,email: userEmail, password: password1};
	$.post('/signup/',formData, function(data, status){
		if(data.reason =='invalid email')
			alert('That email is already in use!');
		else
			window.location = '/login';
	});
		/*alert('return');
		alert(data.reason);
		var reason = str(data.reason);
		if(reason.includes("invalid email"){
			alert("Email is already in use");
			return;
		}
		else
			window.location = '/login';*/
	//});
}


});
