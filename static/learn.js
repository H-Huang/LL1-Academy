// Handlebars templates
var question_template_src   = $("#question-template").html();
var question_template = Handlebars.compile(question_template_src);


// Global vars
var question_data;


$(document).ready(function() {
	query_for_question()
})

function query_for_question() {
	$.ajax({
		type: "GET",
		url: "/get_question",
		success: function(results) {
			question_data = results;
			draw_question();
		},
		error: function(error) {
			console.log(error)
		}
	});
}

function draw_question() {
	$('#questions-container').append(question_template(question_data));
	
	// bind form submit handler: check if answer is correct
	$('#question-input').on('submit', function() {
		
		var input_value = $('#question-answer').val();

		$.ajax({
		type: "POST",
		url: "/check_answer",
		data : { 
			'question_data': question_data,
			'answer': $('#question-answer').val()
		},
		success: function(results) {
			console.log(results)
			if (results.correct) {
				$('#question-input').remove()
				query_for_question()
			}
		},
		error: function(error) {
			console.log(error)
		}
		});
	});
}