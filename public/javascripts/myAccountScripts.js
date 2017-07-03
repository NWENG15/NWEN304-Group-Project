$(document).ready(function(){
	//alert('account Scripts ready');
	
	//change the email
	$("#changeEmail").on('submit', function(e){
	e.preventDefault();
	var userEmail = document.forms["cEmail"]["email"].value;
	var formData = {oldEmail: localStorage.getItem('email'),newEmail: userEmail}; //send both old and new emails
	$.post('/MyAccount/email',formData, function(data, status){
		if(data.reason =='invalid email')
			alert('That email is already in use!');
		else{
			alert('Email has been changed!');
			localStorage.setItem('email', userEmail); //set email in browser
			window.location = '/MyAccount';
			}
		});
	});//end change email
	
	$("#changeName").on('submit', function(e){
	e.preventDefault();
	var userName = document.forms["cName"]["name"].value;
	var formData = {Email: localStorage.getItem('email'), newName: userName}; //send email and new name
	$.post('/MyAccount/name',formData, function(data, status){
		if(data.reason =='invalid name')
			alert('Invalid name');
		else{
			alert('name has been changed!');
			localStorage.setItem('user', userName); //set email in browser
			}
		});
	});//end change name
	
	$("#changePassword").on('submit', function(e){
	e.preventDefault();
	var oldPassword = document.forms["cPass"]["oldPassword"].value;
	var newPassword = document.forms["cPass"]["newPassword"].value;
	if(newPassword != document.forms["cPass"]["newConfirmPassword"].value || newPassword ===""){
		alert('Passwords are not identical');
		return;
	}
	var formData = {Email: localStorage.getItem('email'), newPassword: newPassword, oldPassword: oldPassword}; //send email and new name
	$.post('/MyAccount/password',formData, function(data, status){
		if(data.reason =='invalid password')
			alert('Incorrect password given');
			window.location = '/MyAccount';
		else{
			alert('password has been changed!');
			window.location = '/MyAccount';
			}
		});
	});//end change password
});