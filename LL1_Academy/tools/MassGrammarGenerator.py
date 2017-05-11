from LL1_Academy.tools import GrammarChecker,SingleGrammarGenerator
from LL1_Academy.models import Grammar, Question
import os

#
#Description: The MassGrammarGenerator class outputs a specified number of 
#   random grammars based on the given list of terminals and non-terminals 
#
#Input: num: the number of grammars to be generated
#   nonTerminals: a list of characters representing the nonterminals of length 2-4
#   Terminals: a list of characters representing the terminals of length 2-4
#
#Output: a specified number of grammars written to some plaintext files under ./txt. 
#   You may need to create this directory first before running this script in order 
#   for it to work.
#
#Usage:
# mg = MassGrammarGenerator()
# mg.run(1000，['S','F'],['a','(','+',')'])
#

script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in

class MassGrammarGenerator:
    def __init__(self):
        self.statusSummary = {-1:0,
                       0:0,
                       1:0,
                       2:0}
        
    def run(self,num, nonTerminals, terminals, writeToTxt = False):
        gc = GrammarChecker.GrammarChecker()
        g = SingleGrammarGenerator.SingleGrammarGenerator()
        n = len(nonTerminals)
        if writeToTxt:
            f = open(os.path.join(script_dir, 'data/'+str(n)+'Variables'), 'w')

        #generate num grammars and check them, discard the left hand recursion ones
        for i in range(0,num):
            grammar = g.generate(nonTerminals, terminals)
            firstSets, followSets, parsingTable, status, reachable = gc.solve(grammar,'A',False)
            self.statusSummary[status] += 1
            if (not status == -1) and reachable:
                self.statusSummary[2] += 1
                if writeToTxt:
                    f.write(str(grammar)+'\n \tFirst Set: '+str(firstSets)+'\n \tFollow Set: '+str(followSets)+'\n \tReachable: '+ str(reachable) +'\n\n')
                else:
                    #write to DB if not to TXT
                    newG = Grammar(prods=str(grammar), nonTerminals=''.join(nonTerminals), terminals=''.join(terminals), startSymbol='A')
                    newG.save()

                    #LL1 Question
                    ans = 'True' if status==0 else 'False'
                    qLL = Question(gid=newG,qnum=0,category='LL',answer=ans)
                    qLL.save()

                    #ParseTable Question
                    qPT = Question(gid=newG,qnum=1,category='PT',answer=str(parsingTable))
                    qPT.save()

                    #First and Follow Set
                    qnum = 2
                    for v in nonTerminals:
                        qFirst = Question(gid=newG,qnum=qnum,category='FI',symbol=v,answer=''.join(firstSets[v]))
                        qFirst.save()
                        qnum +=1
                        qFollow = Question(gid=newG,qnum=qnum,category='FO',symbol=v,answer=''.join(followSets[v]))
                        qFollow.save()
                        qnum +=1 

        #print a small summary 
        print(str(n)+"Variables:\nleft recursion: "+str(self.statusSummary[-1])
                +"; LL(1): " + str(self.statusSummary[0])
                +"; not LL(1): " + str(self.statusSummary[1])
                + "; Reachable: " + str(self.statusSummary[2]))