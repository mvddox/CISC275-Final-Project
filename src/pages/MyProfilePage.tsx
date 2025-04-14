import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./MyProfilePage.css"

export let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function MyProfilePage(){
    const [key, setKey] = useState<string>(keyData); //for api key input

    function handleSubmit() {
        localStorage.setItem(saveKeyData, JSON.stringify(key));
        window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
      }

  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  // for navigating from the my profile page to the home page
  function NavigationButton(){
    const navigate = useNavigate();
    return (<div >
      <Button  className="Button" onClick={() => navigate("/Home")}>
          Home Page
      </Button>
    </div>)
  }

    return (
        <div className="Profile">
            <div className="header-content"> 
                <h1>My Profile</h1>
                <div className="Header-Buttons">
                <NavigationButton/>
                </div>
            </div>
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
export default MyProfilePage;