import React, { useState } from 'react';
import OpenAI from "openai";
import { DetailedQuestionRecord } from '../DetailedQuestionsList';
import { Button } from 'react-bootstrap';
import { keyData } from '../DetailedQuestionsPage';

function OpenAiComponent({DetailedResults}:
    {DetailedResults: DetailedQuestionRecord}){
    const [aiError, setAiError] = useState<string>("") // errors; when it catches an error, display error
    const [loading, setLoading] = useState<boolean>(false) //loading
    const [results, setResults] = useState<string[]>([]) // collection of all the results
    const [finalResult, setFinalResult] = useState<string>("") // used for final determination of future
    const openai = new OpenAI({apiKey: keyData, dangerouslyAllowBrowser: true}) // because the user inputs in,
    


    /**
     * 
     * @returns a string of promises based on the result of the openai api
     * Note: when maping a list of promises to an array, you have to wait for all of them with Promise.all
     */
    async function accumResults(): Promise<string[]>{
        setLoading(true)
        let newResults:string[] = []
        // maps every question with every user answer to a gpt input
        let resultPromises: Promise<string>[] = Object.entries(DetailedResults).map(
            async ([instruction,answer]: [string ,string]): Promise<string> => 
            {
                try{
                const response = await openai.responses.create({
                    model: "gpt-4o",
                    input: "Based on the question: '" + instruction +  "' How would you define a person who said " + answer +"?"
                });
                newResults = [...newResults, response.output_text]
                setResults([...newResults])
            
                return response.output_text
                }
            catch (e){
                setAiError("It seems that there was an error.....")
                console.error(e);
                throw(e)
               }
               
            }
        )
        return Promise.all(resultPromises) // holy crap took me an hour to understand this promise stuff
    }


    async function startAI(){
        setResults([])
        setFinalResult("") // clean ups display
        const newResults:string[] = await accumResults() // the entire thing has to wait for the results to be accumulated
        
        try{
            const response = await openai.responses.create({
                model: "gpt-4o",
                input: "Based on the results: '" + newResults +  "' How would you define the person as a whole?"
            });
            setFinalResult(response.output_text)
            }
        catch (e){
            setAiError("It seems that there was an error.....")
            console.error(e);
            }
        // final sentence for the final arbitration of the person's future
        try{
            const response = await openai.responses.create({
                model: "gpt-4o",
                input: "Based on the results: '" + newResults +  "'In one sentence what would their future career be?"
            });
            setFinalResult(response.output_text)
            }
        catch (e){
            setAiError("It seems that there was an error.....")
            console.error(e);
            }
    
        setLoading(false)
    }
        
                // needs cleaning
    return (
        <div className="ai-container">
          <div className={loading ? "loading" : ""}>
            {loading && "Loading..."}
          </div>
          <div className="results" hidden={loading || !results.length}>
            {results.join(", ")}
          </div>
          <div className="final-result" hidden={loading || !finalResult}>
            {finalResult}
          </div>
          {aiError && <div className="ai-error">{aiError}</div>}
          <Button className="ai-button" onClick={startAI}>
            Generate Response
          </Button>
        </div>
      );
    }
//sample for copy paste
//A man with everything on the line would win because a man with nothing to lose already lost their will to fight.
//I would not pull the switch, but not in spite of myself. Although I would never know the strangers' lives, from one to a hundred, nor understand how they feel or experience their life stories, my life would be more fulfilled should I let them live. 


export default OpenAiComponent

