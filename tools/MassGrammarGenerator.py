import GrammarChecker,SingleGrammarGenerator
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
                       1:0}
        
    def run(self,num, nonTerminals, terminals, writeToTxt = False):
        #TODO: make it write to DB instead of text files
        gc = GrammarChecker.GrammarChecker()
        g = SingleGrammarGenerator.SingleGrammarGenerator()
        n = len(nonTerminals)
        t = len(terminals)
        if writeToTxt:
            f = open(os.path.join(script_dir, 'txt/'+str(n)+'-'+str(t)), 'w')

        #generate num grammars and check them, discard the left hand recursion ones
        for i in range(0,num):
            grammar = g.generate(nonTerminals, terminals)
            result = gc.solve(grammar,'A',False)
            status = result[3]
            self.statusSummary[status] += 1
            if writeToTxt:
                if not status == -1:
                    f.write(str(grammar)+'\n')
            else:
                print(grammar)

        #print a small summary 
        print(str(n)+"-"+str(t)+":\nleft recursion: "+str(self.statusSummary[-1])
                +"; LL(1): " + str(self.statusSummary[0])
                + "; not LL(1): " + str(self.statusSummary[1]))