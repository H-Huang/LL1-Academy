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
		
		// validate input before moving into the ajax request
		var input_value = $('#question-answer').val();
		var input_trimmed = input_value.replace(/\s/g,'')
		var valid = input_trimmed.match('^([a-z$],)*[a-z$],?$') != null;
		// console.log(valid)

		if (valid) {
			$.ajax({
				type: "POST",
				url: "/check_answer",
				data : { 
					// 'question_data': question_data,
					'category': question_data.category,
					'symbol': question_data.symbol,
					'answer': $('#question-answer').val()
				},
				success: function(results) {
					console.log(results)
					if (results.correct) {
						$('#question-input').remove()
						// $('#active > .answerbox').html('<p class="answer">' + input_trimmed + '</p><i class="im im-check-mark answercheck" style="color:#33cc33;"></i><div style="clear:both;"></div>')
						$('#active > .question-title').after('<div id="answer-panel"><p class="answer">' + input_trimmed + '</p><i class="im im-check-mark answercheck"></i></div><div style="clear:both;">')
						
						$('#active').removeAttr('id')
						query_for_question()
					} else { // valid syntax, incorrect result
						$('#question-input > .feedback').html("<p>Incorrect answer</p>")
						$('#question-answer').css('border','1px solid red')
					}
				},
				error: function(error) {
					console.log(error)
				}
			});
		} else { // invalid syntax
			$('#question-input > .feedback').html("<p>Invalid syntax</p>")
			$('#question-answer').css('border','1px solid red')
		}
	});
}