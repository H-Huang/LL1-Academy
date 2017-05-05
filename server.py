from flask import Flask, render_template, request, jsonify
from tools.GrammarChecker import *
app = Flask(__name__)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

# TODO: this should NOT be hardcoded
# single session grammar here
startsymbol = 'A'
grammar = {
    'A': ['xA', 'Bz'],
    'B': ['yB', 'y'],
	# 'C': ['zA', 'y']
}
#

grammarChecker = GrammarChecker()

# single session question tracking here
questions = []
currentQ = -1
answers = {}
# 

def generate_questions():
	# start over
	global questions
	global currentQ
	global answers

	questions = []
	currentQ = 0
	answers = {}

	# first set questions
	questions.append(('first','A'))
	questions.append(('first','B'))
	# follow set questions
	questions.append(('follow','A'))
	questions.append(('follow','B'))
	# is ll1?
	questions.append(('LL1', None))

	first,follow,_,status,_ = grammarChecker.solve(grammar,startsymbol)
	answers['first'] = first
	answers['follow'] = follow
	answers['LL1'] = (True if status == 0 else False)
	print(answers)
	print()

	

@app.route('/')
@app.route('/index')
def index():
	return render_template('index.html')


@app.route('/learn', methods=['GET'])
def learn():
	# on page load we start the session over
	# TODO: this should eventually use the session object probably
	# 
	generate_questions()

	grammar_object = []
	non_terminals, terminals = grammarChecker.getSymbols(grammar)
	
	for nt in non_terminals:
		grammar_object.append({"nt": nt, "productions": grammar[nt]})

	#stringify terminals + non_terminals
	terminals = "{" + ", ".join(terminals) + "}"
	# start_symbol = non_terminal[0]
	non_terminals = "{" + ", ".join(non_terminals) + "}"

	#prepare all items to be passed into the template
	context = {
		"grammar_object": grammar_object,
		"terminals": terminals,
		"non_terminals": non_terminals,
		"start_symbol": startsymbol
	}
	
	return render_template('learn.html', **context)

@app.route('/get_question', methods=['GET'])
def get_question():
	global questions
	global currentQ

	if currentQ >= len(questions):
		currentQ = 0

	category = questions[currentQ][0]
	symbol = questions[currentQ][1]

	currentQ += 1
	return jsonify({
		"category": category,
		"symbol": symbol
	})

@app.route('/check_answer', methods=['POST'])
def check_answer():
	global questions
	global currentQ
	global answers

	# TODO: actually check if answer is right
	# think about where validations should take place - probably on client
	answer = request.form.get('answer').rstrip(',')
	answer_set = set(answer.split(','))
	category = request.form.get('category')
	symbol = request.form.get('symbol')

	# print(answers[category][symbol])
	# print(answer_set)
	# print(answer_set == answers[category][symbol])

	return jsonify({
		# "valid": True,
		"correct": answer_set == answers[category][symbol]
	})

@app.errorhandler(404)
def page_not_found(error):
    return render_template('page_not_found.html'), 404

if __name__ == '__main__':
	app.debug = True
	app.run(host='0.0.0.0', port=80)