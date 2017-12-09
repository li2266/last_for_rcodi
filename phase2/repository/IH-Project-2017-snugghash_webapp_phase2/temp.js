// Testing out old ways of doing things
// http://www.ironhacks.com/posts/59ebd12d12845e001206cddc-animations
var isDivHidden = false;

function toggleMenuDiv(){
	// check if the div is currently visible
	if(isDivHidden) {
        //if not, we show it
        // We use the .fadeOut to show the div "smoothly" 
		$(".theFader").fadeIn(500, function() {
        // Here you can execute any code just after the animation.
    	});
		// And now, we will change the appearance and the text of the button using the same function:
		$("#toggleButon").fadeOut(200, function() {
	        $(this).text("Hide div!").fadeIn(200);
	    });
	    //Now we change the div status:
	    isDivHidden = false;
	}else{
	    // Div is shown
    	// We use the .fadeOut to hide the div "smoothly" 
		$(".theFader").fadeOut(500, function() {
        // Here you can execute any code just after the animation.
    	});
    	$("#toggleButon").fadeOut(200, function() {
	        $(this).text("Show div!").fadeIn(200);
	    });
	    //Now we change the div status:
	    isDivHidden = true;
	}
}

$(document).ready(function() {
    // Now we assign the function to the button.
	$("#toggleButon").on("click", toggleMenuDiv);
})
