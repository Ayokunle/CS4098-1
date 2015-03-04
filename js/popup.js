$(document).ready(function() {
    $(".expanded").hide();
    
    $(".expanded, .collapsed").click(function() {
        $(this).parent().children(".expanded, .collapsed").toggle();
   	});
});