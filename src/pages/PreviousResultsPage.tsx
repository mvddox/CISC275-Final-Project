import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "./PreviousResultsPage.css"
import DetailedResult, { DetailedResultType } from "./components/PreviousResult";
import { useAuth } from "../Auth";
import { Account } from "./LoginPage";
import { PreviousResultType, useAIResults } from "../AIResultsContext";
import PreviousResult from "./components/PreviousResult";

export let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}



function PreviousResultsPage(){
    const [key, setKey] = useState<string>(keyData); //for api key input
    const authContext = useAuth();
    const [prevResults, setPrevResults] = useState<PreviousResultType[]>(()=>{
      let stored:Account = JSON.parse(localStorage.getItem(authContext.username) || "")
      return (stored.prevResults)
    })

    let location = useLocation();
    let result = useAIResults();
    const navigate = useNavigate()

    useEffect(()=>{
      setPrevResults(JSON.parse(localStorage.getItem(authContext.username) || "").prevResults)
    }, [authContext.username, location])


    function handleSubmit() {
        localStorage.setItem(saveKeyData, JSON.stringify(key));
        window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
      }

    function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
      setKey(event.target.value);
    }

  // for navigating from the previous results page to the home page
  function NavigateHomeButton(){
    const navigate = useNavigate();
    return (<div >
      <Button  className="Button" onClick={() => navigate("/Home")}>
          Home Page
      </Button>
    </div>)
  }

  function removeResult(removedValue: PreviousResultType){
    let account:Account = JSON.parse(localStorage.getItem(authContext.username) || "")
    account.prevResults = prevResults.filter((value)=> value!== removedValue)
    localStorage.setItem(authContext.username, JSON.stringify(account))
    setPrevResults(JSON.parse(localStorage.getItem(authContext.username) || "").prevResults)
  }

  function NavigateToFocus(destination: PreviousResultType){
    result.setFinalResult(destination.finalResult);
    result.setFinalSentence(destination.finalSentence);
    result.setResults(destination.results)
    result.setFinalDeclaredFuture(destination.finalDeclaredFuture)
    result.setFinalCareer(destination.finalCareer)
    result.setColorVibe(destination.colorVibe)
    navigate("/CurrentResultPage")
  }

    return (
        <div className="Previous">
            <div className="header-content"> 
                <h1>Previous Results</h1>
                <div className="Header-Buttons">
                <NavigateHomeButton/>
                </div>
            </div>
          {prevResults.map((value)=><div>
            <PreviousResult {...value}></PreviousResult>
            <Button onClick={()=> removeResult(value)}>Delete?</Button>
            <Button onClick={()=> NavigateToFocus(value)}> More Details? </Button>
            <Button onClick={()=> {}}> Download? </Button>
            </div>)}
          {}
            

        <footer>
      <Form>
        <Form.Label htmlFor="api-key-input">API Key: </Form.Label>
        <Form.Control 
         id="api-key-input" type="password" placeholder="Insert API Key Here" onChange={changeKey} ></Form.Control>
        <br></br>
        <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
      </Form>
      Authors: Ethan Rigor, John Shaw, Elijah Jeudy, Maddox Florez </footer>
    </div>
    );
}

export default PreviousResultsPage;