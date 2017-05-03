var question_template_src   = $("#question-template").html();
var question_template = Handlebars.compile(question_template_src);

$(document).ready(function() {
	$.ajax({
		type: "POST",
		url: "/get_question",
		data : { 'test': 'test2' },
		success: function(results) {
			$('#questions-container').append(question_template(results))
			// console.log(question_template(results));
		},
		error: function(error) {
			console.log(error)
		}
	});
})

$('#question-input').on('submit', function() {
	console.log("hi julien")
});