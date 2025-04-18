import React, { createContext, useContext, useState, ReactNode } from 'react';
//Need to share data between the questions and the results page
interface AIResultsContextType {
  results: string[];
  finalResult: string;
  finalSentence: string;
  setResults: (results: string[]) => void;
  setFinalResult: (finalResult: string) => void;
  setFinalSentence: (finalSentence: string) => void;
}   

const AIResultsContext = createContext<AIResultsContextType | undefined>(undefined);

export const AIResultsProvider = ({ children }: { children: ReactNode }) => {
  const [results, setResults] = useState<string[]>([]);
  const [finalResult, setFinalResult] = useState<string>("");
  const [finalSentence, setFinalSentence] = useState<string>("");


  return (
    <AIResultsContext.Provider value={{ results, finalResult, finalSentence, setResults, setFinalResult, setFinalSentence }}>
      {children}
    </AIResultsContext.Provider>
  );
};

export const useAIResults = ():AIResultsContextType  => {
  const context = useContext(AIResultsContext);
  if (!context) throw new Error("useAIResults must be used within a AIResultsProvider");
  return context;
};
