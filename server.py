from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

# TODO: this should NOT be hardcoded
# single session grammar here
startsymbol = 'A'
grammar = {
    'A': ['xA', 'Bz'],
    'B': ['yB', 'y']
}
#

# single session question tracking here
questions = []
currentQ = -1
# 

def generate_questions():
	# start over
	global questions
	global currentQ
	questions = []
	currentQ = 0

	# first set questions
	questions.append(('first','A'))
	questions.append(('first','B'))
	# follow set questions
	questions.append(('follow','A'))
	questions.append(('follow','B'))
	# is ll1?
	questions.append(('LL1', None))
	


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

	# TODO: this template should render the grammar using Jinja2
	# instead of being hardcoded
	return render_template('learn.html')

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

	# TODO: actually check if answer is right
	return jsonify({
		"valid": True,
		"correct": True
	});

@app.errorhandler(404)
def page_not_found(error):
    return render_template('page_not_found.html'), 404

if __name__ == '__main__':
	app.debug = True
	app.run(host='0.0.0.0', port=80)