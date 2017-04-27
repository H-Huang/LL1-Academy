from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
@app.route('/index')
def index():
	return render_template('index.html')

@app.route('/learn')
def learn():
	return render_template('learn.html')


@app.errorhandler(404)
def page_not_found(error):
    return render_template('page_not_found.html'), 404

if __name__ == '__main__':
	app.debug = True
	app.run(host='0.0.0.0', port=80)
