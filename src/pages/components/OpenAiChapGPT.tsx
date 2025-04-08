import React, { useState } from 'react';
import OpenAI from "openai";
import { DetailedQuestionRecord } from '../DetailedQuestionsList';
import { Button } from 'react-bootstrap';
import { keyData } from '../DetailedQuestionsPage';

function OpenAiComponent({DetailedResults}:
    {DetailedResults: DetailedQuestionRecord}){
    const [aiError, setAiError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [results, setResults] = useState<string[]>([])
    const [finalResult, setFinalResult] = useState<string>("")
    const openai = new OpenAI({apiKey: keyData, dangerouslyAllowBrowser: true}) // because the user inputs in,
    


    /**
     * 
     * @returns a string of promises based on the result of the openai api
     * Note: when maping a list of promises to an array, you have to wait for all of them with Promise.all
     */
    async function accumResults(): Promise<string[]>{
        setLoading(true)
        let newResults:string[] = []
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
        // final sentence for the 
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
        
                

    return <div>
        <div hidden={!loading}>loading</div>
        {!(!loading && !finalResult) && (!aiError ? (<div ><div>results: {results}</div>
        <div>final results: {finalResult}</div></div>) : <div>{aiError}</div>)}
        <Button onClick={startAI}>
            generate response
        </Button>
    </div>
}
//sample for copy paste
//A man with everything on the line would win because a man with nothing to lose already lost their will to fight.
//I would not pull the switch, but not in spite of myself. Although I would never know the strangers' lives, from one to a hundred, nor understand how they feel or experience their life stories, my life would be more fulfilled should I let them live. 


export default OpenAiComponent

