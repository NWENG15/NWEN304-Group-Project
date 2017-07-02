$(document).ready(function(){
	// Information button has been pressed
    $("button").click(function(){
        var buttonClicked = $(this).val();
        $.get('/books/'+buttonClicked);
        window.location='/books/'+buttonClicked;
    }); 

    //$("#searchForm").on('submit', function(e){
    //	e.preventDefault();
    //	getSearch();
    //});

function getSearch(){
	var searchBox = document.getElementById("searchInput").value;
    alert(searchBox);
	$.get('/search/'+searchBox);
}

});
