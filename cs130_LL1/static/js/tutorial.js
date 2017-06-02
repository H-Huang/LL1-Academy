var grammar_template_src   = $("#grammar-template").html();
var grammar_template = Handlebars.compile(grammar_template_src);
var question_template_src   = $("#question-template").html();
var question_template = Handlebars.compile(question_template_src);

var questions;
var currentQ;

var currentSection; // "first", "follow", "parse"

$(document).ready(function() {
	// switchSection("first");
})

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
		$("#initialExplainer").hide();
	}
	currentSection = section;
	$("#" + currentSection + "Tutorial").addClass("active");
	currentQ = 0;
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
	currentQ -= 2;
	load_next_question(); 
});
$('.button.nextQ').click(function() {
	load_next_question(); 
});

function load_next_question() {
	if (currentQ < 0){
		currentQ = 0;
	}

	if (currentQ == questions.length) {
		console.log("out of questions do something")
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

	if (currentQ == 0) {
		$('.button.prevQ').hide();
	} else {
		$('.button.prevQ').show();
	}

	curQ = questions[currentQ];
	// console.log(currentQ);
	currentQ++;
	
	// console.log(curQ);
	if (curQ.type == "checkbox") {
		if (!$("#grammar-container").is(':visible')) {
			$("#full-explanation-container").hide();
			$("#grammar-container").fadeIn();
			$("#questions-wrapper").fadeIn();
		}

		if (curQ.grammar)
			$('#grammar').html(grammar_template(curQ.grammar))

		$('#questions-container').html(question_template(curQ));
		$('#active').fadeIn({duration:800});

		// submit handler:
		$('#question-input').on('submit', function() {
			var answer = []
			$("input[name=question-check]:checked").each(function() {
				answer.push($(this).val());
			});
			// answer is right so:
			if (answer.join(',') === curQ.answer) {
				$('#question-input').remove()
				$('#active').removeAttr('id')
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
		$("#full-explanation-text").html('');
		for (var i =  0; i < curQ.text.length; i++) {
			$("#full-explanation-text").append('<p>' + curQ.text[i] + '</p>');
		}

		$("#full-explanation-container").show();
	} else {
		console.log("this question type not yet implemented");
	}
}