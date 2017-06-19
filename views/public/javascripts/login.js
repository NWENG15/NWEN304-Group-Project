$(document).ready(function(){
	//alert("document.ready()");
	$("#login").on('submit',function(e){
		alert("on submit for logon");
		e.preventDefault();
		var email = document.forms["auth"]["email"].value;
		var password = document.forms["auth"]["password"].value;
		var formData = {email: email, password: password};
		alert("email: " + email +" password: "+password);
		$.post('/login/send',formData, function(data, status){
			if(status =="success"){
				//alert("was successful");
				//alert(data.token);
				sessionStorage.setItem('bookToken', data.token); //set token in browser
				//alert("storaged token is: "+sessionStorage.getItem("bookToken"));
				window.location = '/';
			}
			window.location = '/login';
		});

	});

	
});