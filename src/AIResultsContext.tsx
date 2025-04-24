import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DetailedResultType } from './pages/components/DetailedResult';
import { BasicResultType } from './pages/components/BasicResult';
//Need to share data between the questions and the results page
interface AIResultsContextType {
  results: string[]; // list of results for each question
  finalResult: string; // general summary
  finalSentence: string; // final job title
  finalDeclaredFuture: string // fun stuff
  finalCareer: string // what they are going to do in future
  colorVibe: string, // color vibe
  setResults: (results: string[]) => void;
  setFinalResult: (finalResult: string) => void;
  setFinalSentence: (finalSentence: string) => void;
  setFinalDeclaredFuture: (finalDeclaredFuture: string) => void;
  setFinalCareer: (finalCareer: string) => void;
  setColorVibe: (colorVibe: string) => void;
}   
interface PreviousAIResultsContextType {
  previousResults: AIResultsContextType[],
  setPreviousResults: (results:AIResultsContextType[])=> void
}


export type PreviousResult = DetailedResultType | BasicResultType


const AIResultsContext = createContext<AIResultsContextType | undefined>(undefined);
const PreviousAIResultsContext = createContext<PreviousAIResultsContextType>({previousResults: [], setPreviousResults: (results:AIResultsContextType[])=>{}});

export const PreviousAIResultsProvider = ({ children }: { children: ReactNode }) => {
  const [previousResults, setPreviousResults] = useState<AIResultsContextType[]>([]);

  return (
    <PreviousAIResultsContext.Provider value={{previousResults, setPreviousResults}}>
      {children}
    </PreviousAIResultsContext.Provider>
  );
};

export const AIResultsProvider = ({ children }: { children: ReactNode }) => {
  const [results, setResults] = useState<string[]>([]);
  const [finalResult, setFinalResult] = useState<string>("");
  const [finalSentence, setFinalSentence] = useState<string>("");
  const [finalDeclaredFuture, setFinalDeclaredFuture] = useState<string>("");
  const [finalCareer, setFinalCareer] = useState<string>("")
  const [colorVibe, setColorVibe] = useState<string>("")

  return (
    <PreviousAIResultsProvider>
    <AIResultsContext.Provider value={{ results, finalResult, finalSentence, finalDeclaredFuture, finalCareer, colorVibe,
             setResults, setFinalResult, setFinalSentence, setFinalDeclaredFuture, setFinalCareer, setColorVibe }}>
      {children}
    </AIResultsContext.Provider>
    </PreviousAIResultsProvider>
  );
};



export const useAIResults = ():AIResultsContextType  => {
  const context = useContext(AIResultsContext);
  if (!context) throw new Error("useAIResults must be used within a AIResultsProvider");
  return context;
};

export const usePreviousAIResults = ():PreviousAIResultsContextType  => {
  const context = useContext(PreviousAIResultsContext);
  if (!context) throw new Error("usePreviousAIResults must be used within a PreviousAIResultsContext");
  return context;
};