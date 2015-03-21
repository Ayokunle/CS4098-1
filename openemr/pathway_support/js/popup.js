$(document).ready(function() {
    $(".expanded").hide();
    
    $(".expanded, .collapsed").click(function() {
        $(this).parent().children(".expanded, .collapsed").toggle();
   	});
});

//var actionList = {State:"Ready", required_resources:{patient_record:"001671458.hl7"}, provided_resources:{patient_symptoms:"001671458.spt"}};

//var actionList = {State:"Ready", required_resources:"001671458.hl7", provided_resources:{patient_symptoms:"001671458.spt"}};