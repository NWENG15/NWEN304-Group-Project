$(document).ready(function(){
	// Information button has been pressed
    $("#Information").click(function(){
        var buttonClicked = $(this);
        alert(buttonClicked.val());

        $.get('/book/'+buttonClicked.val());
        //window.location='/'+buttonClicked.val();
    }); 
    // Price button has been pressed
    $("#Price").click(function(){
        var buttonClicked = $(this);
        alert(buttonClicked.val());
    }); 

    // Add to cart button has been pressed
    $("#AddToCart").click(function(){
        var buttonClicked = $(this);
        alert(buttonClicked.val());
    });

    $("#searchButton").click(function(){
        var buttonClicked = $(this);
        alert(buttonClicked.val());
    });          
});
