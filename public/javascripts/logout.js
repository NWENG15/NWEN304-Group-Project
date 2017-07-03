
$(document).ready(function(){
    var user = localStorage.getItem('user');
    $('#name').append(" "+localStorage.getItem('user')+'?');
	
		
	//log user out when click the logout button
	$('.logout').click(function(){
		localStorage.clear();
		window.location = '/';
	});
});