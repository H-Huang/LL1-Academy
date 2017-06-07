var grammar_template_src   = $("#grammar-template").html();
var grammar_template = Handlebars.compile(grammar_template_src);
var question_template_src   = $("#question-template").html();
var question_template = Handlebars.compile(question_template_src);

var questions;
var currentQ;
var grammarQIndex;
var curQ;

var currentSection; // "first", "follow", "parse"
var prevClickedCell;

$(document).ready(function() {
	// switchSection("first");
})

function tut_title_click() {
	if (currentSection) {
		$("#grammar-container").hide();
		$("#questions-wrapper").hide();
		$("#full-explanation-container").hide();

		$("#" + currentSection + "Tutorial").removeClass("active");
		$("#vocabularyTitle").addClass("active");
		currentSection = null;

		$("#initialExplainer").fadeIn();
	}
}

function switchSection(section) {
	if (section == currentSection)
		return;

	switch(section) {
		case "first":
			questions = firstQuestions;
			break;
		case "follow":
			questions = followQuestions;
			break;
		case "parse":
			questions = parseQuestions;
			break;
		default:
			console.log("invalid section, try again");
			return;
	}

	if (currentSection) { // if statement needed for first page load case
		$("#" + currentSection + "Tutorial").removeClass("active");
	} else { // on first page laod
		$("#vocabularyTitle").removeClass("active");
		$("#initialExplainer").hide();
	}
	currentSection = section;
	$("#" + currentSection + "Tutorial").addClass("active");
	currentQ = 0;
	grammarQIndex = -1;
	load_next_question();
}

$('#firstTutorial').click(function() {
	switchSection("first");
});
$('#followTutorial').click(function() {
	switchSection("follow");
});
$('#parseTutorial').click(function() {
	switchSection("parse");
});

$('.button.prevQ').click(function() {
	currentQ -= 1
	grammarQIndex = -1;
	load_next_question(); 
});
$('.button.nextQ').click(function() {
	load_next_question(); 
});

function load_next_question() {
	// if (currentQ < 0){
	// 	currentQ = 0;
	// }
	var newGrammar
	if (grammarQIndex == -1)
		newGrammar = true;
	else
		newGrammar = false;
	
	grammarQIndex += 1;
	//  currentQ now refers to current grammar
	//  if last question in grammar reached AND last grammar in questions reached:
	if (grammarQIndex == questions[currentQ].questions.length) { // last Q in this grammar reached;
		currentQ += 1;
		grammarQIndex = 0;
		newGrammar = true;

		if (currentQ == questions.length) {
			if (questions[0] == firstQuestions[0]){
				swal({
					title: "Tutorial Complete!",
					text: "Congratuations on completing the First Set tutorial!",
					type: "success",
					html:true,
					confirmButtonText: "Continue to Follow Set Tutorial"
				},
				function() {
					switchSection("follow");
				});
			} else if (questions[0] == followQuestions[0]){
				swal({
					title: "Tutorial Complete!",
					text: "Congratuations on completing the Follow Set tutorial!",
					type: "success",
					html:true,
					confirmButtonText: "Continue to Parse Table Tutorial"
				}, 
				function() {
					switchSection("parse");
				});
			} else if (questions[0] == parseQuestions[0]){
				swal({
					title: "Tutorial Complete!",
					text: "Congratuations on completing the Parse Table tutorial!",
					type: "success",
					html:true,
					confirmButtonText: "Start Practicing"
				},
				function() {
					window.location.href = '/practice';
				});
			}
			return
		}
	}

	if (currentQ == 0) {
		$('.button.prevQ').hide();
	} else {
		$('.button.prevQ').show();
	}

	// var prevQ = curQ
	// curQ = questions[currentQ];
	// currentQ++;

	var curGrammar = questions[currentQ]
	curQ = curGrammar.questions[grammarQIndex];
	
	if (curQ.type == "checkbox") {
		if (!$("#grammar-container").is(':visible')) {
			$("#full-explanation-container").hide();
			$("#grammar-container").fadeIn();
			$("#questions-wrapper").fadeIn();
		}

		// console.log(curQ.grammar)
		if (newGrammar) {
			// console.log("hi new grammar here")
			// console.log(questions[currentQ])
			$('#grammar').html(grammar_template(curGrammar))
			$('#questions-container').html(question_template(curQ));
			$('.question-help').html(curGrammar.helptext)
			$('.question-help').show();
			$('#active').fadeIn({duration:800});
		} else {
			$('#question-input').remove()
			var prevAnswer = curGrammar.questions[grammarQIndex - 1].answer;
			$('#active > .question-title').after('<div id="answer-panel"><p class="answer">' + prevAnswer + '</p></div><div style="clear:both;">')
			$('#active').removeAttr('id')
			$('#questions-container').append(question_template(curQ));
			$('#active').fadeIn({duration:800});
		}

		// submit handler:
		$('#question-input').on('submit', function() {
			var answer = []
			$("input[name=question-check]:checked").each(function() {
				answer.push($(this).val());
			});
			// answer is right so:
			if (answer.join(',') === curQ.answer) {
				$('#question-input').remove()
				load_next_question();
			} else {
				$('#question-input > .feedback').html("<p>Incorrect answer</p>")
			}

		});

	} else if (curQ.type == "text") {
		if (!$("#full-explanation-container").is(':visible')) {
			$("#grammar-container").hide();
			$("#questions-wrapper").hide();
			$("#full-explanation-container").fadeIn();
		}
		$("#full-explanation-text").html(curQ.text);
		// for (var i =  0; i < curQ.text.length; i++) {
		// 	$("#full-explanation-text").append('<p>' + curQ.text[i] + '</p>');
		// }
	} else if (curQ.type == "parse") {
		if (!$("#grammar-container").is(':visible')) {
			$("#full-explanation-container").hide();
			$("#grammar-container").fadeIn();
			$("#questions-wrapper").fadeIn();
		}

		$('#grammar').html(grammar_template(curGrammar))

		if ($.inArray('$', curQ.terminals) < 0)
			curQ.terminals.push('$');
		$('#questions-container').html(parseTable_template(curQ));	

		for (var i = 0; i < curQ.non_terminals.length; i++) {
			var nt = curQ.non_terminals[i];
			var first_nt = curQ.first[i];
			var follow_nt = curQ.follow[i];

			$("#pt-first-follow").append(
				'<tr><td>' + nt + '</td><td>' + first_nt + '</td><td>' + follow_nt + '</td></tr>'
			)
		}

		$('.question-help').html(curGrammar.helptext)
		$('.question-help').show();
		$('#active').fadeIn({duration:800});

		$('#question-input').on('submit', function() {
			var answer = get_data_from_table();
			// answer is right so:
			if (answer == curQ.answer) {
				$('#question-input').remove()
				$('#active').removeAttr('id')
				load_next_question();
			} else {
				$('#question-input > .feedback').html("<p>Incorrect answer</p>")
			}
		});

	} else {
		console.log("this question type not yet implemented");
	}
}


// Parse table helper functions

Handlebars.registerHelper("printParseTableCells", function(non_terminal, terminals) {
	var ret = ""
	for (var i = 0; i < curQ.terminals.length; i++) {
		ret = ret.concat('<td nt="'+non_terminal+'" onclick="get_pt_chars(this)"></td>');
	}
	return new Handlebars.SafeString(ret);
})

var parseTable_template_src   = $("#parseTable-template").html();
var parseTable_template = Handlebars.compile(parseTable_template_src);

function get_pt_chars(obj){
	if (prevClickedCell)
		prevClickedCell.css("border", "")
	prevClickedCell = $(obj);
	prevClickedCell.css("border", "1px solid #30A7C1")
	var cell_nt = $(obj).attr('nt');
	var buttons = ""
	var actives = $(obj).html().split(',');
	//console.log(actives);

	var curGrammar = questions[currentQ]

	for (var i = curGrammar.grammar.length - 1; i >= 0; i--) {
		var line = curGrammar.grammar[i]
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
	var non_terminals = curQ.non_terminals
	var terminals = curQ.terminals

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