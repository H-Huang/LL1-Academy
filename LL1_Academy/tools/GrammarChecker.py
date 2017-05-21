# 
#   GrammarChecker usage:
#   Finds the LL(1) First, Follow, Parse Table of a grammar.
# 


#   
#   solve(grammar, startsymbol, [verbose])
#   PARAMS:
#       REQUIRED:
#       grammar = {
#           'S': ['F', '(S + F)'],
#           'F': ['a']
#       }
# 
#       REQUIRED: startsymbol is the starting nonterminal of grammar
# 
#       OPTIONAL: verbose is an optional boolean (default is False) which if True
#       the solve function will pretty print its outputs
# 
#   RETURNS:
#       (firstSets, followSets, parsingTable, status, reachable)
#           status:     0 if LL(1), 1 if not LL(1), and -1 if left recursion was found
#           reachable:  True if every nonterminal is reachable, else False
# 


# 
#   getSymbols(grammar)
#   PARAMS:
#       REQUIRED: grammar is in same format as above
# 
#   RETURNS:
#       (nonterminals, terminals)
#           both are lists, neither are ordered
# 
# 

epsilon = 'ε'

class GrammarChecker:
    epsilon = 'ε'
    
    def solve(self, grammar, startsymbol, verbose=False):
        self.firstSets = {}
        self.followSets = {}
        self.parsingTable = {}
        self.firstOfStack = []
        self.isLL1 = True
        self.leftRecursionFound = False
        
        self.grammar = grammar
        self.startsymbol = startsymbol
        self.verbose = verbose
        
        GrammarChecker.getSymbols(self,grammar)
        
        GrammarChecker.buildFirstSets(self)
        GrammarChecker.buildFollowSets(self)
        GrammarChecker.buildParsingTable(self)
        
        returnFirstSets = {}
        for nt in self.nonterminals:
            returnFirstSets[nt] = self.firstSets[nt]
        
        status = -1 if self.leftRecursionFound else (0 if self.isLL1 else 1)
        if self.verbose:
            if self.leftRecursionFound: 
                print("Left recursion found - don't trust any results here")
            else: 
                if self.isLL1: 
                    print("grammar is LL(1)") 
                else:
                    print("grammar is NOT LL(1)")
        return((returnFirstSets,self.followSets,self.parsingTable,status,GrammarChecker.reachability(self)))
    
    def getSymbols(self, grammar):
        self.grammar = grammar
        self.nonterminals = [x for x,_ in self.grammar.items()]
        self.terminals = set()
        for _,prods in self.grammar.items():
            for prod in prods:
                for symbol in prod.replace(" ",""):
                    if symbol not in self.nonterminals and symbol != self.epsilon:
                        self.terminals.add(symbol)
        return (sorted(self.nonterminals),sorted(list(self.terminals)))

    def reachability(self):
        canreach = {}
        for LHS,RHS in self.grammar.items():
            reachability = set()
            for prod in RHS:
                for letter in prod:
                    if letter in self.nonterminals:
                        reachability.add(letter)
            canreach[LHS] = reachability
        for nt in self.nonterminals:
            if nt != self.startsymbol:
                if not GrammarChecker.path_exists(self, canreach, self.startsymbol, nt):
                    return False
        return True

    def path_exists(self, graph, start, end, path=[]):
        path = path + [start]
        if start == end:
            return True
        if start not in graph:
            return False
        for node in graph[start]:
            if node not in path:
                if GrammarChecker.path_exists(self, graph, node, end, path):
                    return True
        return False

    def buildFirstSets(self):
        self.firstSets = {}
        if self.verbose: print ("first:")
        for symbol in self.nonterminals:
            if self.verbose:
                print (symbol+': ',GrammarChecker.firstOf(self,symbol))
            else:
                GrammarChecker.firstOf(self,symbol)
    
    def firstOf(self,symbol):
        if symbol in self.firstOfStack:
            self.leftRecursionFound = True
#             print("left recursion detected - first/follow sets are meaningless")

        if symbol in self.firstSets:
            return self.firstSets[symbol]

        self.firstSets[symbol] = set()

        if symbol in self.terminals:
            self.firstSets[symbol].add(symbol)
            return self.firstSets[symbol]

        self.firstOfStack.append(symbol)

        for production in self.grammar[symbol]:        
            self.firstSets[symbol] = self.firstSets[symbol].union( \
                GrammarChecker.firstOfProduction(self,production))

        self.firstOfStack.pop()
        return self.firstSets[symbol]

    def firstOfProduction(self,production):
        first = set()
        prod_nospace = production.replace(" ", "")

        for i,productionSymbol in enumerate(prod_nospace):
            if productionSymbol == self.epsilon:
                first.add(self.epsilon)
                break

            firstOfNT = GrammarChecker.firstOf(self,productionSymbol)
            if self.epsilon not in firstOfNT:
                first = first.union(firstOfNT)
                break

            if i == len(prod_nospace) - 1:
                first = first.union(firstOfNT)
            else:
                first = first.union(firstOfNT) - set(self.epsilon)
        return first
    
    def buildFollowSets(self):
        self.followSets = {}
        if self.verbose: print("follow:")
        
        for symbol in self.nonterminals:
            if self.verbose: 
                print (symbol+': ',GrammarChecker.followOf(self,symbol))
            else:
                GrammarChecker.followOf(self,symbol)

    def followOf(self,symbol):
        if symbol in self.followSets:
            return self.followSets[symbol]

        self.followSets[symbol] = set()

        if symbol == self.startsymbol:
            self.followSets[symbol].add('$')

        for LHS,RHS,symbolIndex in GrammarChecker.getProductionsWithSymbol(self,symbol):
            RHS_nospace = RHS.replace(" ", "")

            followIndex = symbolIndex + 1

            for i in range(followIndex, len(RHS_nospace) + 1):
                if i == len(RHS_nospace):
                    if LHS != symbol:
                        self.followSets[symbol] = self.followSets[symbol].union(GrammarChecker.followOf(self,LHS))
                    break

                followSymbol = RHS_nospace[i]
                firstOfFollow = GrammarChecker.firstOf(self,followSymbol)

                if self.epsilon not in firstOfFollow:
                    self.followSets[symbol] = self.followSets[symbol].union(firstOfFollow)
                    break

                self.followSets[symbol] = self.followSets[symbol].union(firstOfFollow - set(self.epsilon))

        return self.followSets[symbol]

    def getProductionsWithSymbol(self,symbol):
        productions = []
        for LHS,RHS in self.grammar.items():
            for prod in RHS:
                for index,char in enumerate(prod):
                    if char == symbol:
                        productions.append((LHS,prod,index))
        return productions
    
    def buildParsingTable(self):
        for LHS,RHS in self.grammar.items():
            for prod in RHS:
                if LHS not in self.parsingTable:
                    self.parsingTable[LHS] = {}

                if prod != self.epsilon:
                    for terminal in GrammarChecker.firstOfProduction(self,prod):
                        if terminal != self.epsilon:
                            if terminal in self.parsingTable[LHS]:
                                self.isLL1 = False
                                self.parsingTable[LHS][terminal].append(prod)
                            else:
                                self.parsingTable[LHS][terminal] = [prod]

                else:
                    for terminal in self.followSets[LHS]:
                        if terminal in self.parsingTable[LHS]:
                            self.isLL1 = False
                            self.parsingTable[LHS][terminal].append(prod)
                        else:
                            self.parsingTable[LHS][terminal] = [prod]
        
        if self.verbose:
            print ("parse table:")
            for nonterm,parses in self.parsingTable.items():
                print(nonterm+":")
                for term,prod in parses.items():
                    print("\t"+term+": ", prod)