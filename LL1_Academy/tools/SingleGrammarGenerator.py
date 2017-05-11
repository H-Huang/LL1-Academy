#
#Description: The SingleGrammarGenerator class randomly generate a grammar based on
#   the given list of terminals and non-terminals 
#
#Input: nonTerminals: a list of characters representing the nonterminals of length 2-4
#   Terminals: a list of characters representing the terminals of length 2-4
#
#Output: a grammar represented by a dictionary of rules, where the keys are the 
#   nonterminal symbols and the corresponding values are a list of productions. For example:
#   grammar = {
#       'S': ['F', '(S+F)'],
#       'F': ['a']}
#   where 'S' and 'F' are nonterminal symbols, 'a','(','+' and ')' are terminal symbols
#
#Usage:
#   g = SingleGrammarGenerator()
#   g.generate(['S','F'],['a','(','+',')'])
#

import random
from random import randint

epsilon = 'ε'
    
class SingleGrammarGenerator:
    
    def generate(self, nonTerminals, terminals):
        #TODO: Make the randomization weighted to maximize the number of valid grammars generated 
        if not (isinstance(nonTerminals,list) and isinstance(terminals,list)):
            raise Exception('Input terminals/nonterminals need to be in format of lists ')
        if len(nonTerminals)>4 or len(nonTerminals)<2 or len(terminals)>4 or len(terminals)<2:
            raise Exception('Wrong number of input terminals/nonterminals')
        
        self.nonTerminals = nonTerminals
        self.terminals = terminals
        self.symbols = self.nonTerminals + self.terminals
        self.grammar = {}
        
        for v in self.nonTerminals:
            self.grammar[v]=[]

        for v in self.nonTerminals:
            p = ""
            #The number of productions associated with a non-terminal is chosen at random
            r = randint(1,3)
            i = 0
            if r==1:
                #If there is only one production, this symbol is not nullible
                self.grammar[v].append(self.production(False))
            else:
                while i < r:
                    p = self.production()
                    if not p in self.grammar[v]:
                        self.grammar[v].append(p)
                        i+=1
        return self.grammar

    def production(self,nullible=True):
        #Randomly generate a production of a random length
        #All terminals and non-terminals have equal chance of being chosen
        #If nullible is set to false, then the production cannot be an epsilon
        if nullible:
            r = randint(0,4)
        else:
            r = randint(1,4)
        if r==0:
            return epsilon
        p = ""
        for i in range(0,r):
            p+=random.choice(self.symbols)
        return p