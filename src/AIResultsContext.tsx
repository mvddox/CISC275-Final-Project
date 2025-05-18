import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BasicResultType, DetailedResultType, resultValues } from './pages/components/PreviousResult';
//Need to share data between the questions and the results page
interface AIResultsContextType {
  results: string[]; // list of results for each question
  finalResult: string; // general summary
  finalSentence: string; // final job title
  finalDeclaredFuture: string // fun stuff
  finalCareer: string // what they are going to do in future
  colorVibe: string, // color vibe
  date: string
  values?: resultValues
  setResults: (results: string[]) => void;
  setFinalResult: (finalResult: string) => void;
  setFinalSentence: (finalSentence: string) => void;
  setFinalDeclaredFuture: (finalDeclaredFuture: string) => void;
  setFinalCareer: (finalCareer: string) => void;
  setColorVibe: (colorVibe: string) => void;
  setDate: (date:string) => void;
  setValues: (values:resultValues) => void;

  result: PreviousResultType
  setResult: (result: PreviousResultType) => void;

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
  const [date, setDate] = useState<string>("")
  const [values, setValues] = useState<resultValues>({empathy:50, ambition: 50, workLifeBalance: 50})
  const [result, setResult] = useState<PreviousResultType>({
    results:[],
    finalResult:"",
    finalSentence:"",
    finalDeclaredFuture: "",
    finalCareer: "",
    colorVibe: "",
    date: "",
    values: {empathy:50, ambition: 50, workLifeBalance: 50},
    salary: "",
    description: "",
    education: "",
  })

  return (
    <AIResultsContext.Provider value={{ results, finalResult, finalSentence, finalDeclaredFuture, finalCareer, colorVibe, date, values,
             setResults, setFinalResult, setFinalSentence, setFinalDeclaredFuture, setFinalCareer, setColorVibe, setDate, setValues, result, setResult }}>
      {children}
    </AIResultsContext.Provider>
  );
};



export const useAIResults = ():AIResultsContextType  => {
  const context = useContext(AIResultsContext);
  if (!context) throw new Error("useAIResults must be used within a AIResultsProvider");
  return context;
};
