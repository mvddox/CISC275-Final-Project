import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BasicResultType, DetailedResultType } from './pages/components/PreviousResult';
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

export type PreviousResultType = DetailedResultType | BasicResultType


const AIResultsContext = createContext<AIResultsContextType | undefined>(undefined);


export const AIResultsProvider = ({ children }: { children: ReactNode }) => {
  const [results, setResults] = useState<string[]>([]);
  const [finalResult, setFinalResult] = useState<string>("");
  const [finalSentence, setFinalSentence] = useState<string>("");
  const [finalDeclaredFuture, setFinalDeclaredFuture] = useState<string>("");
  const [finalCareer, setFinalCareer] = useState<string>("")
  const [colorVibe, setColorVibe] = useState<string>("")

  return (
    <AIResultsContext.Provider value={{ results, finalResult, finalSentence, finalDeclaredFuture, finalCareer, colorVibe,
             setResults, setFinalResult, setFinalSentence, setFinalDeclaredFuture, setFinalCareer, setColorVibe }}>
      {children}
    </AIResultsContext.Provider>
  );
};



export const useAIResults = ():AIResultsContextType  => {
  const context = useContext(AIResultsContext);
  if (!context) throw new Error("useAIResults must be used within a AIResultsProvider");
  return context;
};
