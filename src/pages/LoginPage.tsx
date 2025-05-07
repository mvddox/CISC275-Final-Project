import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"
import { useAuth } from "../Auth";
import { PreviousResultType } from "../AIResultsContext";

export let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

export interface Account {
  password: string,
  prevResults: PreviousResultType[]
}


function LoginPage(){
    const [key, setKey] = useState<string>(keyData); //for api key input
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [createAccFail, setCreateAccFail] = useState<boolean>(false);
    const [loginFail, setLoginFail] = useState<boolean>(false);
    
    const authContext = useAuth();

    function handleSubmit() {
        localStorage.setItem(saveKeyData, JSON.stringify(key));
        window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
      }

    function storeNewUser(username: string, password: string): boolean {
        //const existingPassword = JSON.parse(localStorage.getItem(username) || "").password;
        const newAccount:Account = {password:password, prevResults: []}
        if (localStorage.getItem(username) === null){
            localStorage.setItem(username, JSON.stringify(newAccount))
            authContext.login({username, password});
            return true;
        }
        return false;
    }

  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  // for navigating from the my profile page to the home page
  function HomeButton(){
    const navigate = useNavigate();
    return (<div >
      <Button  className="Button" onClick={() => navigate("/Home")}>
          Home Page
      </Button>
    </div>)
  }

  function updateLoginFail(bool: boolean){
    setLoginFail(bool);
    setCreateAccFail(false);
  }

  function LoginButton(){
    const navigate = useNavigate();
    function handleLoginClick() {
      const success = authContext.login({username, password});
      if (success) {
        localStorage.setItem("currentUsername", JSON.stringify(username));
        navigate("/Home");
      } else {
        updateLoginFail(true);
      }
    }
  
    return (
      <div>
        <Button className="LoginButton" onClick={handleLoginClick}>
          Login
        </Button>
      </div>
    );
  }
  
  

  function updateCreateAccStat(bool: boolean){
    setCreateAccFail(bool);
    setLoginFail(false);
  }

  function CreateAccountButton(){
    const navigate = useNavigate();
    function handleCreateClick() {
      const success = storeNewUser(username, password);
      if (success) {
        localStorage.setItem("currentUsername", JSON.stringify(username));
        navigate("/Home");
      } else {
        updateCreateAccStat(true);
      }
    }
  
    return (
      <div>
        <Button className="Button" onClick={handleCreateClick}>
          Create Account
        </Button>
      </div>
    );
  }
  
  

  function updateUsername(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function updatePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }


    return (
        <div className="Login">
            <div className="header-content"> 
                <h1>Login / Create Account</h1>
                <div className="Header-Buttons">
                    <HomeButton/>
                </div>
            </div>
            <div className='accountInfo'>
            <Form>
                <Form.Group controlId="Username">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        value={username}
                        onChange={updateUsername} />
                    </Form.Group>
                </Form>
                <Form>
                    <Form.Group controlId="Password">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            value={password}
                            onChange={updatePassword} />
                    </Form.Group>
                </Form>
                <div className="accFailText">
                    {(createAccFail && "Account Already Exists") || (loginFail && "Account Not Found")}
                </div>
                <div className="accountButtons">
                    <LoginButton/>
                    <CreateAccountButton/>
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
                <div className='AuthorText'>
                  <br />
                </div>
                </footer>
        </div>
    );
}
export default LoginPage;