// Handlebars helpers
Handlebars.registerHelper("printParseTableCells", function(terminals) {
	var ret = ""
	for (var i = 0; i < question_data.terminals.length; i++) {
		ret = ret.concat('<td contenteditable="true"></td>');
	}
	return new Handlebars.SafeString(ret);
})

// Handlebars templates
var question_template_src   = $("#question-template").html();
var question_template = Handlebars.compile(question_template_src);

var parseTable_template_src   = $("#parseTable-template").html();
var parseTable_template = Handlebars.compile(parseTable_template_src);


// Global vars
var question_data;


function get_data_from_table() {
	var $ROWS = $("#pt").find('tr');
	var non_terminals = question_data.non_terminals
	var terminals = question_data.terminals

	var ret = {}

	// Iterate through rows of parse table (nonterminals)
	$ROWS.each(function(index) {
		nt_index = index - 1;
		if (index > 0) {
			var nt = non_terminals[nt_index]
			nt_object = ret[nt] = {}
			
			// Iterate through columns of this row (terminals)
			$(this).children().each(function(child_index) {
				t_index = child_index - 1;
				if (child_index > 0) {
					var t = terminals[t_index];
					if ($(this).html()) {

						// TODO: validate this this is valid input possibly?
						nt_object[t] = $(this).html().split(',');
					}
				}
			})
		}
	})
	
	return JSON.stringify(ret);
}

function display_parse_table_feedback(feedback) {
	var $ROWS = $("#pt").find('tr');
	var non_terminals = question_data.non_terminals
	var terminals = question_data.terminals

	// Iterate through rows of parse table (nonterminals)
	$ROWS.each(function(index) {
		var nt_index = index - 1;
		if (index > 0) {
			var nt = non_terminals[nt_index]
			var feedback_object = feedback[nt]
			
			// Iterate through columns of this row (terminals)
			$(this).children().each(function(child_index) {
				var t_index = child_index - 1;
				if (child_index > 0) {
					// show this cell is incorrect
					if (feedback_object[t_index]) {
						$(this).removeClass('pt-incorrect');
						$(this).addClass('pt-incorrect');
					// remove incorrect class
					} else {
						$(this).removeClass('pt-incorrect');
					}
				}
			})
		}
	})	
}

function fill_parse_table_with_answer(answer) {
	var ans = JSON.parse(answer);
	var $ROWS = $("#pt").find('tr');
	var non_terminals = question_data.non_terminals
	var terminals = question_data.terminals

	// Iterate through rows of parse table (nonterminals)
	$ROWS.each(function(index) {
		var nt_index = index - 1;
		if (index > 0) {
			var nt = non_terminals[nt_index]
			var pt_object = ans[nt]
			// console.log(pt_object)
			
			// Iterate through columns of this row (terminals)
			$(this).children().each(function(child_index) {
				var t_index = child_index - 1;
				if (child_index > 0) {
					var term = terminals[t_index]
					if (pt_object.hasOwnProperty(term)) {
						$(this).html(pt_object[term]);
					} else {
						$(this).html("");
					}
				}
			})
		}
	})
}


$(document).ready(function() {
	query_for_question();
	$('#skip').click(skip);
})

function skip(){
	log_grammar(0);
	location.reload();
}

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

function give_up() {
	$.ajax({
		type: "GET",
		url: "/give_up",
		success: function(results) {
			if (results.category == 'PT') {
				fill_parse_table_with_answer(results.answer)
				// TODO: do something at this point lol

			} else if (results.category == 'LL') {
				correct_ans_form_question(results.answer, "", true)
			} else {
				correct_ans_form_question("", results.answer, true)
			}
		},
		error: function(error) {
			console.log(error)
		}
	});
}

function correct_ans_form_question(ll1radio,input,giveup) {
	$('#question-input').remove()

	var checkbox
	if (giveup)
		checkbox = '<i class="im im im-x-mark badanswercheck"></i>'
	else
		checkbox = '<i class="im im-check-mark answercheck"></i>'

	if (ll1radio)
		$('#active > .question-title').after('<div id="answer-panel"><p class="answer">' + ll1radio + '</p>' + checkbox + '</div><div style="clear:both;">')
	else 
		$('#active > .question-title').after('<div id="answer-panel"><p class="answer">' + input + '</p>' + checkbox + '</div><div style="clear:both;">')
	$('#active').removeAttr('id')
	
	query_for_question();	
}

function log_grammar(completed){
	$.ajax({
				type: "POST",
				url: "/log_grammar",
				data : { 
					'csrfmiddlewaretoken': csrfmiddlewaretoken,
					'completed': completed
				},
				success: function(results) {
					//console.log(results)
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
}

function draw_question() {

	if (question_data.category == "parseTable")
		var lastQ = true;
	else
		var lastQ = false;

	if (question_data.category == "first" || question_data.category == "parseTable") {
		question_data.opt = "ε"
	} else {
		question_data.opt = "$"
	}
	

	if (lastQ) {
		question_data.terminals.push('$');
		$('#questions-container').append(parseTable_template(question_data));

		var $CELLS = $("#pt").find("td");
		$CELLS.focusin(function() {
			prevFocus = $(this);
		})
	}
	else
		$('#questions-container').append(question_template(question_data));

	$('#active').fadeIn({duration:1300});
	$('#question-answer').focus();
	if (lastQ) {
		$('#opt-char-pt').click(function() {
				var field = prevFocus;
				field.html(field.html() + question_data.opt);
				placeCaretAtEnd(field.get(0));
		});
	} else {
		$('#opt-char').click(function() {
			var field = $('#question-answer')
			field.val(field.val() + question_data.opt);
			field.focus();
		});
	}

	$('#giveup').click(give_up);

	// submit parse table in specific way
	if (lastQ) {
		$('#question-input').on('submit', function() {
			$.ajax({
				type: "POST",
				url: "/check_answer",
				data : { 
					// 'question_data': question_data,
					'csrfmiddlewaretoken': csrfmiddlewaretoken,
					'category': question_data.category,
					'symbol': question_data.symbol,
					'answer': get_data_from_table()
				},
				success: function(results) {
					console.log(results)
					display_parse_table_feedback(results.feedback);

					// TODO: show score in SWAL maybe??

					if (results.correct) {
						log_grammar(1);
						$('#question-input > .feedback').html("");
						swal({
							title: "Good Job!",
							type: "success",
							confirmButtonText: "Next Question"
						}, 
						function() {
							location.reload();
						});
						
					} else { // valid syntax, incorrect result
						$('#question-input > .feedback').html("<p>Incorrect answer</p>");
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
		});
	}

	// submit all other question types
	else {
	$('#question-input').on('submit', function() {
		
		// validate input before moving into the ajax request
		var input_value = $('#question-answer').val();
		var valid = true
		if (input_value != null){
			var input_trimmed = input_value.replace(/\s/g,'')
			valid = input_trimmed.match('^([a-zε$],)*[a-zε$],?$') != null;
		}

		// handle LL1 radio input
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
						correct_ans_form_question(ll1radio,input_trimmed,false);						
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
}


// Focus tracking helper for opt-char in parse table input
var prevFocus = $();

// moves cursor to end of contenteditable td --> ridiculous that this is even needed
// cross platform, comes from StackOverflow credit to Tim Down
function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}