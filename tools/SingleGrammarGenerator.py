#Input: nonTerminals: a list of characters representing the nonterminals of length 2-4
#       Terminals: a list of characters representing the terminals of length 2-4

#Output: a grammar represented by a dictionary of rules, where the keys are the 
# nonterminal symbols and the corresponding values are a list of productions. For example:
#       grammar = {
#           'S': ['F', '(S+F)'],
#           'F': ['a']}
#where 'S' and 'F' are nonterminal symbols, 'a','(','+' and ')' are terminal symbols

#Usage:
# g = SingleGrammarGenerator(['S','F'],['a','(','+',')'])
# g.generate()

import random
from random import randint

epsilon = 'ε'
    
class SingleGrammarGenerator:
    
    def __init__(self, nonTerminals, terminals):
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
    
    def generate(self):
        for v in self.nonTerminals:
            p = ""
            r = randint(1,3)
            i = 0
            while i < r:
                p = self.production()
                if not p in self.grammar[v]:
                    self.grammar[v].append(p)
                    i+=1
                if r==1 and epsilon in self.grammar[v]:
                    i-=1
        print (self.grammar)
        
    def production(self):
        r = randint(0,4)
        p = ""
        if r==0:
            return epsilon
        for i in range(0,r):
            p+=random.choice(self.symbols)
        return p