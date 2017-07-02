$(document).ready(function(){
	// Information button has been pressed
    $(".center-block, .pull-left").click(function(){ //changed from $('button') so only for info buttons and to minimise code change for confusion
        var buttonClicked = $(this).val();
        $.get('/books/'+buttonClicked);
        //window.location='/books/'+buttonClicked;
    }); 



function getSearch(){
	var searchBox = document.getElementById("searchInput").value;
    alert(searchBox);
	$.get('/search/'+searchBox);
}

});
