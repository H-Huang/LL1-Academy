from sklearn import svm
import ast

#grammar = {'S': ['F', '(S + F)'],
#          'F': ['a']}

# ε: 1, all terminals: 2, only nonterminal is itself: 3, include other nonterminals: 4

epsilon = 'ε'
maxProduction = 3
maxVariable = 4

#This is the wrapper class around the svm model from sklearn

class SvmLearn:
    def __init__(self, filenameI, filenameN):
        # Input: nameI: file name of the training data categorized as 
        #   intereing grammars
        # nameN: file name of the training data categorized as 
        #   not intereing grammars
        
        # tData: an array X of size [n_samples, n_features] holding 
        # the training samples
        self.tData = []
        # labels: an array y of class labels, size [n_samples]
        # in our case 0 can be interesting, 1 be not interesting 
        self.labels = []

        #Extract the features from training data
        fI = open(filenameI, 'r') 
        for line in fI:
            #extract each line as a dictionary
            grammar = ast.literal_eval(line)
            feature = self.buildFeature(grammar)
            self.tData.append(feature)
            #1 representing interesting
            self.labels.append(1)
        fI.close()

        fN = open(filenameN, 'r')
        for line in fN:
            grammar = ast.literal_eval(line)
            feature = self.buildFeature(grammar)
            self.tData.append(feature)
            #0 representing not interesting 
            self.labels.append(0)
        fN.close()

        #use the training data to build the model
        self.clf = svm.SVC()
        self.clf.fit(self.tData, self.labels)

    def predictSamples(self, filenameP):
        # The function that predicts whether a set of grammars are interesting
        # based on the learning model
        # Input: filename of the grammars to be predicted
        # Output: it outputs the results to console
        fP = open(filenameP, 'r')
        total = 0
        good = 0
        for line in fP:
            total +=1
            grammar = ast.literal_eval(line)
            feature = self.buildFeature(grammar)
            prediction = self.predictSample([feature])
            if prediction[0]==1:
                print("Good: "+line)
                good+=1
            else:
                print("Bad: "+line)
        print("{} fraction of the grammars are interesting".format(good/total))
        fP.close()


    def predictSample(self,features):
        # A helper function that predict the category of a single grammar
        # Input: the feature array of a single grammar
        # Return: [0] indicating not interesting or [1] indicating interesting
        if not (isinstance(features,list) and len(features[0])== len(self.tData[0])):
            raise Exception('Wrong format of features input')

        return self.clf.predict(features)

    def buildFeature(self,grammar):
        # This helper function builds a feature array of a grammar
        # Input: a grammar <dict>
        # Output: an array of integers of size (maxProduction * maxVariable)
        result = []
        for key in grammar:
            l=[]
            for production in grammar[key]:
                pClass = self.pDescribe(production, key)
                l.append(pClass)
            #pad each row with 0 if there are less than 3 productions 
            while len(l) < maxProduction: 
                l.append(0)
            result = result+l
            
        #pad result with rows of 0 if there are less than 4 non-terminals
        if len(grammar) < maxVariable:
            padding = [0]*(maxProduction*(maxVariable-len(grammar)))
            result += padding
        return result

    def pDescribe(self, production, nonTerminal):
        #T his helper function describes a production using an integer 
        #   from [1-4]
        # Input: a production <String> and its associated nonTerminal <Char>
        # Output: 1: Only consisted of terminals
        #        2: Epislon
        #        3: The only non-terminal included is itself
        #        4: Includes other non-terminals
        if production == epsilon:
            return 2
            
        result = 1
        for c in production:
            if c.isupper():
                result = 3
                if not c == nonTerminal:
                    result = 4
                    return result
        return result 
    