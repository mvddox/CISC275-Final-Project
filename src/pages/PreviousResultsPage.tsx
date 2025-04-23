import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./PreviousResultsPage.css"
import DetailedResult, { DetailedResultType } from "./components/DetailedResult";
import { usePreviousAIResults } from "../AIResultsContext";

export let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}


//type PreviousResultRecord = Record<string, DetailedResultType[]> // not a good idea, but its not like we have a server to hash to and from


function PreviousResultsPage(){
    const [key, setKey] = useState<string>(keyData); //for api key input
    const prevResults: DetailedResultType[] = usePreviousAIResults().previousResults;
    console.log(usePreviousAIResults().previousResults)

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

    return (
        <div className="Previous">
            <div className="header-content"> 
                <h1>Previous Results</h1>
                <div className="Header-Buttons">
                <NavigateHomeButton/>
                </div>
            </div>
          {prevResults.map((value)=><div><DetailedResult {...value}></DetailedResult></div>)}
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