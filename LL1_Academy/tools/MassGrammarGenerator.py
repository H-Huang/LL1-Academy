from LL1_Academy.tools import GrammarChecker,SingleGrammarGenerator, SvmLearn
from LL1_Academy.models import Grammar, Question
import os

#Description: The MassGrammarGenerator class randomly generates grammar and filter
#out the interesting ones to store in the database. 

script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in


class MassGrammarGenerator:

    def __init__(self, n):
        self.statusSummary = {"LL1":0, "non-LL1":0}
        self.gc = GrammarChecker.GrammarChecker()
        self.g = SingleGrammarGenerator.SingleGrammarGenerator()

        #builds the ML model using our trainingData
        fI = os.path.join(script_dir, 'trainingData/'+str(n)+'var-interesting')
        fN = os.path.join(script_dir, 'trainingData/'+str(n)+'var-not-interesting')
        self.learnModel = SvmLearn.SvmLearn(n,fI,fN)
        
    def run(self,num, nonTerminals, terminals):
        self.nonTerminals = nonTerminals
        self.terminals =terminals

        #generate num grammars, filter them and write the good ones to DB
        for i in range(0,num):
            self.createOneGrammar()

        #prints a small report
        print(str(len(self.nonTerminals)) + " Variables: "
            + str(self.statusSummary["LL1"] + self.statusSummary["non-LL1"])
            + " interesting grammars picked out of "+str(num)+"\n\tLL1: " + str(self.statusSummary["LL1"])
            + "\n\tnot LL(1): " + str(self.statusSummary["non-LL1"]))

    def createOneGrammar(self):
        #This function randomly generates a single grammar, and saves it to the DB if 
        #it is not left-recursion and interesting

        #generate a single grammar randomly
        grammar = self.g.generate(self.nonTerminals, self.terminals)

        #get answers using the checker
        #result = firstSets, followSets, parsingTable, status, reachable 
        result = self.gc.solve(grammar,'A',False)

        #Abandon left recursive grammars and grammars with non-reachable variables
        if (result[3] == -1) or (not result[4]):
            return
        
        #If the ML model decidese it's interesting, save to DB
        prediction = self.learnModel.predictGrammar(grammar,result[0],result[1])
        if prediction[0]==1:
            self.saveToDB(grammar,result)
            print("YES: "+str(grammar)+"\n\tFirst: "+str(result[0])+"\n\tFollow: "+str(result[1]))
        else:
            print("NO: "+str(grammar)+"\n\tFirst: "+str(result[0])+"\n\tFollow: "+str(result[1]))

                
    def saveToDB(self,grammar,result):
        #This function takes the grammar and the result returned by gc.solve. It
        #populates the Grammar and Question table in DB with the correct fields

        firstSets, followSets, parsingTable, status, reachable, terminals = result
        newG = Grammar(prods=str(grammar), nonTerminals=''.join(self.nonTerminals), 
                terminals=''.join(terminals), startSymbol='A')
        newG.save()

        #First and Follow Set
        qnum = 0
        for v in self.nonTerminals:
            qFirst = Question(gid=newG,qnum=qnum,category='FI',
                    symbol=v,answer=''.join(firstSets[v]))
            qFirst.save()
            qnum +=1
        
        for v in self.nonTerminals:
            qFollow = Question(gid=newG,qnum=qnum,category='FO',
                    symbol=v,answer=''.join(followSets[v]))
            qFollow.save()
            qnum +=1 

        #Parse Table Question
        qPT = Question(gid=newG,qnum=qnum,category='PT',answer=str(parsingTable))
        qPT.save()
        qnum+=1
        
        #LL1 Question
        if status == 0:
            ans = 'True'
            self.statusSummary["LL1"]+=1
        else:
            ans = 'False'
            self.statusSummary["non-LL1"]+=1
        qLL = Question(gid=newG,qnum=qnum,category='LL',answer=ans)
        qLL.save()
        