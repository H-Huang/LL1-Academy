import SvmLearn
import os

script_dir = os.path.dirname(__file__) 

def main():

	#filename of the training data
	fI = os.path.join(script_dir, 'data/interesting')
	fN = os.path.join(script_dir, 'data/notInteresting')
	
	#build the model
	model = SvmLearn.SvmLearn(fI,fN)

	#file name of the test data
	fP = os.path.join(script_dir, 'txt/2-4')
	
	#predict the category of test data using the model
	model.predictSamples(fP)

if __name__ == '__main__':
	#This number can be changed to however many grammars you want to generate 
    main()
