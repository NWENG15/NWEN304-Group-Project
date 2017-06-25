$(document).ready(function(){
	// Information button has been pressed
    $("button").click(function(){
        var buttonClicked = $(this).val();
        //alert(buttonClicked);
        //var bookInfo = {bookid : buttonClicked};
        //console.log(bookInfo);
        $.get('/book/'+buttonClicked);
        window.location='/book/'+buttonClicked;
    }); 

        //$("button").click(function(){
        //var buttonClicked = document.getElementById("test").value;
        //alert(buttonClicked);
        //$.get('/book/'+buttonClicked);
        //window.location='/book/'+buttonClicked;
    //}); 


    //$("#searchForm").on('submit', function(e){
    //	e.preventDefault();
    //	getSearch();
    //});

function getSearch(){
	var searchBox = document.getElementById("searchInput").value;
    alert(searchBox);
	$.get('/search/'+searchBox);
    //window.location='/search/'+searchBox;
}

});
