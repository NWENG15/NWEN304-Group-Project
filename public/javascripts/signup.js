$(document).ready(function(){
	alert('ready!')
	$('#submit').click(function(){
		//e.preventDefault();
		alert('we here?');
		//validateInput();
	});

});

function validateInput(name, email, password, password1){
	if (name === ""){
		console.log('Name field is blank');
		return false;
	}
	if (email === ""){
		console.log('email is blank');
		return false;
	}
	if(password !== password1 || password1 ===""){
		console.log('Passwords are not identical');
		return false;
	}
	return true;
}

	//var formData = {name: userName,email: userEmail, favoriteBook: favBook, password: password1};
	//$.post('/signup/send',formData);
	
	//window.location = '/login';
}

//$('#test').click(function(evt){
	//alert('button pressed');
	//evt.preventDefault();
//});
