import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "./PreviousResultsPage.css"
import { useAuth } from "../Auth";
import { Account } from "./LoginPage";
import { PreviousResultType, useAIResults } from "../AIResultsContext";
import PreviousResult from "./components/PreviousResult";
import { renderToString } from "react-dom/server";

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
  // credit to https://stackoverflow.com/questions/68152987/how-to-download-part-of-a-react-component
  // downloads result as html file
    function downloadResult(finishedResult: PreviousResultType){
      // putting the css here makes in look ugly so i put it in public
      fetch("/Result.css").then((x)=>{
        x.text().then((y)=>{
          const html = renderToString(<div>
            <style>{y}</style><PreviousResult finishedResult={{...finishedResult}} complete={true}></PreviousResult></div>)
          const blob = new Blob([html]);
          const url = URL.createObjectURL(blob);
          const tempEl = document.createElement("a");
          document.body.appendChild(tempEl);
          tempEl.href = url;
          tempEl.download = "CareerResults.html";
          tempEl.click();
          setTimeout(() => {
            URL.revokeObjectURL(url);
            if(tempEl.parentNode){
              tempEl.parentNode.removeChild(tempEl);
            }
          }, 2000);
    
    
    })
      })
  
  
    }

  //removes result from storage
  function removeResult(removedValue: PreviousResultType){
    let account:Account = JSON.parse(localStorage.getItem(authContext.username) || "")
    account.prevResults = prevResults.filter((value)=> value!== removedValue)
    localStorage.setItem(authContext.username, JSON.stringify(account))
    setPrevResults(JSON.parse(localStorage.getItem(authContext.username) || "").prevResults)
  }

  // handler for user to focus on a single result back at currentresultpage where more details are shown
  function NavigateToFocus(destination: PreviousResultType){
    result.setResult(destination)
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
            <PreviousResult finishedResult={{...value}} complete={false}></PreviousResult>
            <Button onClick={()=> removeResult(value)}>Delete?</Button>
            <Button onClick={()=> NavigateToFocus(value)}> More Details? </Button>
            <Button onClick={()=> downloadResult(value)}> Download? </Button>
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