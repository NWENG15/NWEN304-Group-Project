$(document).ready(function(){
	$("#test2").on('submit',function(e){
		e.preventDefault();
		validateForm();
	});
});

function validateForm(){	
	var userName = document.forms["signup"]["name"].value;
	alert(userName);
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
	
	var favBook = document.forms["signup"]["favoriteBook"].value;
	if (favBook === ""){
		alert('Favourite book is blank');
		return;
	}
	
	var password1 = document.forms["signup"]["password"].value;
	if(password1 != document.forms["signup"]["confirmPassword"].value || password1 ===""){
		alert('Passwords are not identical');
		return;
	}
	
	var formData = {name: userName,email: userEmail, favoriteBook: favBook, password: password1};
	$.post('/signup/send',formData);
	
	window.location = '/login';

	//alert(str);
	

	

}
/*
$('#test').click(function(evt){
	alert('button pressed');
	evt.preventDefault();

});

*/