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
	if (question_data.category == "first") {
		question_data.opt = "ε"
	} else {
		question_data.opt = "$"
	}

	$('#questions-container').append(question_template(question_data));
	$('#active').slideDown();

	$('#opt-char').click(function() {
		$('#question-answer').val($('#question-answer').val() + question_data.opt);
		$('#question-answer').focus();
	});

	// bind form submit handler: check if answer is correct
	$('#question-input').on('submit', function() {
		
		// validate input before moving into the ajax request
		var input_value = $('#question-answer').val();
		var valid = true
		if (input_value != null){
			var input_trimmed = input_value.replace(/\s/g,'')
			valid = input_trimmed.match('^([a-zε$],)*[a-zε$],?$') != null;
		}

		var ll1radioActive = $('input[name=ll1]').length
		if (ll1radioActive) {
			var ll1radio = $('input[name=ll1]:checked')[0].value
		}

		if (valid) {
			$.ajax({
				type: "POST",
				url: "/check_answer",
				data : { 
					// 'question_data': question_data,
					'csrfmiddlewaretoken': csrfmiddlewaretoken,
					'category': question_data.category,
					'symbol': question_data.symbol,
					'answer': $('#question-answer').val(),
					'll1answer': ll1radio
				},
				success: function(results) {
					console.log(results)
					if (results.correct) {
						$('#question-input').remove()
						if (ll1radioActive)
							$('#active > .question-title').after('<div id="answer-panel"><p class="answer">' + ll1radio + '</p><i class="im im-check-mark answercheck"></i></div><div style="clear:both;">')
						else 
							$('#active > .question-title').after('<div id="answer-panel"><p class="answer">' + input_trimmed + '</p><i class="im im-check-mark answercheck"></i></div><div style="clear:both;">')
						$('#active').removeAttr('id')
						if (!ll1radioActive)
							query_for_question()
						else {
							swal({
								title: "Good Job!",
								type: "success",
								confirmButtonText: "Next Question"
							}, function(){
								 location.reload();
							})
						}
						
					} else { // valid syntax, incorrect result
						$('#question-input > .feedback').html("<p>Incorrect answer</p>")
						$('#question-answer').css('border','1px solid #F6781D')
					}
				},
				error: function(error) {
					console.log(error)
					swal({
						title: "Oops...",
						text: "Something went wrong!",
						type: "error"
					})
				}
			});
		} else { // invalid syntax
			$('#question-input > .feedback').html("<p>Invalid syntax</p>")
			$('#question-answer').css('border','1px solid #F6781D')
		}
	});
}