// Handlebars helpers
Handlebars.registerHelper("printParseTableCells", function(non_terminal) {
	//console.log(non_terminal)
	var ret = ""
	for (var i = 0; i < question_data.terminals.length; i++) {
		ret = ret.concat('<td nt="'+non_terminal+'" onclick="get_pt_chars(this)"></td>');
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

function hideexplainer() {
	$("#explainer").hide();
	$("#explainer-hidden").show();
}

function showexplainer() {
	$("#explainer").show();
	$("#explainer-hidden").hide();
}

function get_pt_chars(obj){
	if (prevClickedCell)
		prevClickedCell.css("border", "")
	prevClickedCell = $(obj);
	prevClickedCell.css("border", "1px solid #30A7C1")
	var cell_nt = $(obj).attr('nt');
	var buttons = ""
	var actives = $(obj).html().split(',');
	//console.log(actives);
	for (var i = grammar.grammar.length - 1; i >= 0; i--) {
		var line = grammar.grammar[i]
		if (line.nt == cell_nt) {
			for (var j = 0; j < line.productions.length; j++){
				var checked = "";
				if ($.inArray(line.productions[j],actives) > -1)
					checked = "checked";
				cb = '<div class="pretty info smooth">'
						+'<input type="checkbox" '+ checked +
						' onchange="click_pt_button(this)" value='
						+line.productions[j]+'><label>'
						+'<i class="im im-check-mark"></i>'
						+ line.productions[j] +'</label></div>';
				buttons += cb;
			}
			break;
		}
	}
	$('#production-options').html(buttons);
}

function click_pt_button(obj) {
	var activebtns = ""
	var checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
	checkedBoxes.forEach(function(box) {
	    activebtns = activebtns.concat($(box).attr('value') + ",");
	})
	activebtns = activebtns.slice(0, -1); // strip last comma
	prevClickedCell.html(activebtns);
}

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
						var pt_arr = pt_object[term]
						var final = ""
						for (var i = pt_arr.length - 1; i >= 0; i--) {
							final = final.concat(pt_arr[i] + ',')
						}
						final = final.slice(0, -1); // Remove trailing ','
						$(this).html(final);
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
	log_skip_grammar();
}

function start_trip(){
	var explainer_text = [
	  { 
	    sel : $('#grammar'),
	    content : 'Hello! Here is a grammar.',
	    position : "n"
	  },
	  {
	    sel : $('#explainer'),
	    content : 'Refer to the explainer <br> for what each symbol means.',
	    position : "n"
	  },
	  {
	    sel : $('#skip'),
	    content : 'Don\'t like this grammar? Skip it',
	    position : "n"
	  },
	  {
	    sel : $('#question-input'),
	    content : 'Type in your answers here. <br> Click submit to check the anwser.',
	    position : "n"
	  },
	  {
	    sel : $('#opt-char'),
	    content : 'This button helps you <br> to input special characters.',
	    position : "e"
	  },
	  {
	    sel : $('#giveup'),
	    content : 'Click "Give Up" to show the answer.<br>You will not receive any points <br> for a given up question.',
	    position : "s"
	  },
	  {
	    sel : $('#img-circle'),
	    content : 'Click here to view your learning history <br> and manage your account',
	    position : "s"
	  },
	  {
	    sel : $('.footer'),
	    content : 'Learn more about the LL(1) Academy project.',
	    position : "n"
	  }

	];
	if ($("#explainer").css('display') === "none"){
		//console.log(explainer_text[1]);
		delete explainer_text[1]['content'];
	}
	window.trip = new Trip(explainer_text,{
	    showNavigation : true,
	    delay : -1,
	    canGoPrev: false,
	    prevLabel: "",
	    skipLabel: "",
	    showCloseBox: true,
	    skipUndefinedTrip:true,
	}
	);
	if(window.trip!=null){
		setTimeout(function() {trip.start();});
	}
}

function query_for_question() {
	$.ajax({
		type: "GET",
		url: "/get_question",
		success: function(results) {
			question_data = results;
			draw_question();
			if(results.new_user){
				setTimeout(function() {start_trip();}, 800);	
			}
		},
		error: function(error) {
			console.log(error)
		}
	});
}

function give_up() {
	$.ajax({
		type: "POST",
		url: "/give_up",
		data : { 
			'csrfmiddlewaretoken': csrfmiddlewaretoken,
			'hide_explainer': $("#explainer").css('display') === "none"
		},
		success: function(results) {
			//console.log(results)
			if (results.category == 'PT') {
				fill_parse_table_with_answer(results.answer)
				submit_parse_table(true)
			} else if (results.category == 'LL') {
				correct_ans_form_question(results.answer, "", true, true, results.score)
			} else {
				correct_ans_form_question("", results.answer, true, false, null)
			}
		},
		error: function(error) {
			console.log(error)
		}
	});
}

function correct_ans_form_question(ll1radio,input,giveup,lastQ,score) {
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
	
	// NEW LASTQ HANDLER
	if (lastQ) {
		var t
		if (score[0] == "0") {
			t = "Nice try!"
			//console.log("test1")
		} else {
			t = "Good job!"
			//console.log("test2")
		}
			
		$('#question-input > .feedback').html("");
		swal({
			title: t,
			text: "You got " + score + "!",
			type: "success",
			html:true,
			confirmButtonText: "Next Question"
		}, 
		function() {
			window.location.replace("/practice");
		});
	} else {
		query_for_question();
	}
}

function log_skip_grammar(completed){
	$.ajax({
		type: "POST",
		url: "/log_skip_grammar",
		data : { 
			'csrfmiddlewaretoken': csrfmiddlewaretoken,
			'completed': completed,
			'hide_explainer': $("#explainer").css('display') === "none"
		},
		success: function(results) {
			//console.log(results)
			window.location.replace("/practice");
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

function deselect_pt_cell() {
	if (prevClickedCell)
		prevClickedCell.css("border", "");
	prevClickedCell = null;
	$("#production-options").html("");
}

function submit_parse_table(giveup) {
	deselect_pt_cell();

	$.ajax({
		type: "POST",
		url: "/check_answer",
		data : { 
			// 'question_data': question_data,
			'csrfmiddlewaretoken': csrfmiddlewaretoken,
			'category': "parseTable",
			'symbol': "",
			'answer': get_data_from_table()
		},
		success: function(results) {
			// console.log(results)
			display_parse_table_feedback(results.feedback);

			if (results.correct) {
				$("td").each(function() {
					$(this).prop('onclick',null).off('click');
				});
				if (giveup)
					checkbox = '<i class="im im im-x-mark badanswercheck"></i>'
				else
					checkbox = '<i class="im im-check-mark answercheck"></i>'
				$('#active > .question-title').after('<div id="answer-panel">' + checkbox + '</div><div style="clear:both;">')
				$('#question-input').remove()
				$('#active').removeAttr('id')

				query_for_question();						
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
}

function draw_question() {

	if (question_data.category == "parseTable") {
		var isParseTable = true;
		var lastQ = false;
	}
	else if (question_data.category == "isLL1") {
		var isParseTable = false;
		var lastQ = true;
	}
	else {
		var isParseTable = false;
		var lastQ = false;
		question_data.terminals = terminals.slice();
	}

	if (question_data.category == "first") {
		question_data.terminals.push("ε")
	} else if (question_data.category == "follow") {
		question_data.terminals.push("$")
	}
	

	if (isParseTable) {
		question_data.opt = "ε"
		question_data.terminals.push('$');
		$('#questions-container').append(parseTable_template(question_data));

		var $CELLS = $("#pt").find("td");
		$CELLS.focusin(function() {
			prevFocus = $(this);
		})
	}
	else {
		$('#questions-container').append(question_template(question_data));
	}

	$('#active').fadeIn({duration:800});

	if (isParseTable) {
		$('#opt-char-pt').click(function() {
				var field = prevFocus;
				if (field) {
					field.html(field.html() + question_data.opt);
					placeCaretAtEnd(field.get(0));
				}
		});
	} 
	// else {
	// 	$('#opt-char').click(function() {
	// 		var field = $('#question-answer')
	// 		field.val(field.val() + question_data.opt);
	// 		field.focus();
	// 	});
	// }

	$('#giveup').click(give_up);

	// submit parse table in specific way
	if (isParseTable) {
		$('#question-input').on('submit', function() {
			submit_parse_table(false);
		});
	}

	// submit all other question types
	else {
	$('#question-input').on('submit', function() {
		
		// validate input before moving into the ajax request
		// var input_value = $('#question-answer').val();
		var valid = true
		// if (input_value != null){
		// 	var input_trimmed = input_value.replace(/\s/g,'')
		// 	valid = input_trimmed.match('^([a-zε$],)*[a-zε$],?$') != null;
		// }
		var answer = ""

		// handle LL1 radio input
		
		var ll1radioActive = $('input[name=ll1]').length
		if (ll1radioActive) {
			var ll1radio = $('input[name=ll1]:checked')[0].value
		} else {
			$("input[name=question-check]:checked").each(function() {
				answer = answer.concat($(this).val() + ",");
			})
			answer = answer.substring(0, answer.length - 1);
		}

		// new checkbox answers

		if (valid) {
			$.ajax({
				type: "POST",
				url: "/check_answer",
				data : { 
					// 'question_data': question_data,
					'csrfmiddlewaretoken': csrfmiddlewaretoken,
					'category': question_data.category,
					'symbol': question_data.symbol,
					'answer': answer,
					'll1answer': ll1radio,
					'hide_explainer': $("#explainer").css('display') === "none"
				},
				success: function(results) {
					// console.log(results)

					if (results.correct) {
						correct_ans_form_question(ll1radio,answer,false,lastQ,results.score);						
					} else { // valid syntax, incorrect result
						$('#question-input > .feedback').html("<p>Incorrect answer</p>")
						// $('#question-answer').css('border','1px solid #F6781D')
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
			// $('#question-answer').css('border','1px solid #F6781D')
		}
		});
	}
}


// Focus tracking helper for opt-char in parse table input
var prevFocus = null;
var prevClickedCell = null;

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