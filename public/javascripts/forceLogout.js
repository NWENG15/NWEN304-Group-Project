/*
used to clear out the users stored token from the browser, called when user chooses
to log out or a token passed to the server has expired
*/
$(document).ready(function(){
	//alert('auto logout');
	localStorage.clear(); //clear out token
	
	
	//source: https://stackoverflow.com/questions/9877263/time-delayed-redirect
	setTimeout(function () {
       window.location = "/"; //will redirect to your blog page (an ex: blog.html)
    }, 2000); //will call the function after 2 secs.


});
