from sklearn import svm
import ast

# Description: This is the wrapper class around the svm model from sklearn.
# This class feeds training data into the SVM machine learning model, and 
# provides an API to decide if a grammar is interesting or not based on its content 
# and its first and follow set.


# grammar = {'S': ['F', '(S + F)'],
#          'F': ['a']}

# Production scoring:
# all terminals: 1, ε: 2,  only nonterminal is itself: 3, include other nonterminals: 4

epsilon = 'ε'
maxProduction = 3


class SvmLearn:
    def __init__(self, nVariable, filenameI, filenameN):
        # Input: nVariable: Number of variables this learning 
        #   model is build for
        # nameI: file name of the training data categorized as 
        #   intereing grammars
        # nameN: file name of the training data categorized as 
        #   not intereing grammars

        self.nVariable = nVariable
        # tData: an array X of size [n_samples, n_features] holding 
        # the training samples
        self.tData = []
        # labels: an array y of class labels, size [n_samples]
        # in our case 0 can be interesting, 1 be not interesting 
        self.labels = []  

        #Extract the features from training data
        fI = open(filenameI, 'r')
        fILines = fI.readlines() 
        i = 0
        #this part is based on the knowledge of the format of our training data 
        while i < len(fILines):
            #extract each line as a dictionary
            grammar = ast.literal_eval(fILines[i])
            first = ast.literal_eval(fILines[i+1].split("First Set: ")[1])
            follow = ast.literal_eval(fILines[i+2].split("Follow Set: ")[1])
            i+=5
            #building a feature list with the information given
            feature = self.buildFeature(grammar, first, follow)
            self.tData.append(feature)
            #1 representing interesting
            self.labels.append(1)
        if not (i == len(fILines)+1):
            raise Exception('Julien messed up the training data format')
        fI.close()

        fN = open(filenameN, 'r')
        fNLines = fN.readlines()
        n = 0
        while n < len(fNLines):
            #this part is based on the knowledge of the format of our training data 
            grammar = ast.literal_eval(fNLines[n])
            first = ast.literal_eval(fNLines[n+1].split("First Set: ")[1])
            follow = ast.literal_eval(fNLines[n+2].split("Follow Set: ")[1])
            n+=5
            #building a feature list with the information given
            feature = self.buildFeature(grammar, first, follow)
            self.tData.append(feature)
            #0 representing not interesting 
            self.labels.append(0)
            # print("grammar: "+str(grammar)
            #         +"\n\tfirst: "+str(first)
            #         +"\n\tfollow: "+str(follow)
            #         +"\n\tfeature: "+str(feature)
            #         +"\n")
        if not (n == len(fNLines)+1):
            raise Exception('Julien messed up the training data format')
        fN.close()

        #use the training data to build the model
        self.clf = svm.SVC()
        self.clf.fit(self.tData, self.labels)


    def predictGrammar(self, grammar, first, follow):
        # A helper function that predict whether a single grammar is interesting 
        # Input: the feature array of a single grammar
        # Return: [0] indicating not interesting or [1] indicating interesting
        if not (isinstance(grammar,dict) and isinstance(first,dict) and isinstance(follow,dict)):
            raise Exception('Wrong format of grammar input')
        if not (len(grammar)==self.nVariable and len(first)==self.nVariable and len(follow)==self.nVariable):
            raise Exception('Wrong format of grammar input')

        feature=self.buildFeature(grammar,first,follow)
        return self.clf.predict([feature])


    def buildFeature(self, grammar, first, follow):
        # This helper function builds a feature array of a grammar
        # Input: grammar, first and follow as the grammar checker returns (refer to that for format)
        # Output: an array of integers representing the features
        if not (isinstance(grammar,dict) and isinstance(first,dict) and isinstance(follow,dict)):
            raise Exception('Wrong format of grammar input')
        if not (len(grammar)==self.nVariable and len(first)==self.nVariable and len(follow)==self.nVariable):
            raise Exception('Wrong format of grammar input')

        result = []

        #features of the grammar
        for key in grammar:
            l=[]
            for production in grammar[key]:
                pClass = self.pDescribe(production, key)
                l.append(pClass)
            #pad each row with 0 if there are less than 3 productions 
            while len(l) < maxProduction: 
                l.append(0)
            l.sort()
            l.reverse()
            result = result+l

        #feature of the first and follow set
        fi=[]
        fo=[]
        for key in grammar:
            fi.append(len(first[key]))
            fo.append(len(follow[key]))
        fi.sort()
        fi.reverse()
        fo.sort()
        fo.reverse()
        result = result+fi+fo

        if not (len(result) == self.nVariable*(maxProduction+2)):
            raise Exception('Error occured while building the features')
            
        return result

    def pDescribe(self, production, nonTerminal):
        #This helper function describes a production using an integer 
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
    