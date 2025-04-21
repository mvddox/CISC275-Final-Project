import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./MyProfilePage.css";
import logo from '../logo.svg';

export let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function MyProfilePage() {
  const [key, setKey] = useState<string>(keyData);
  const [name, setName] = useState<string>("");
  const [about, setAbout] = useState<string>("");

  function handleKeySubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload();
  }

  function handleProfileSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log("Name submitted:", name);
    console.log("About submitted:", about);
    // Here you would typically handle saving the name and about information
    // to a database or local storage.
  }

  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  function changeName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function changeAbout(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setAbout(event.target.value);
  }

  function NavigateHomeButton() {
    const navigate = useNavigate();
    return (
      <div>
        <Button className="Button" onClick={() => navigate("/Home")}>
          Home Page
        </Button>
      </div>
    );
  }

  return (
    <div className="Profile">
      <div className="header-content">
        <h1>My Profile</h1>
        <div className="Header-Buttons">
          <NavigateHomeButton />
        </div>
      </div>
      <footer>
        <Form onSubmit={handleProfileSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>
              <img src={logo} alt="My Website Logo" className="profile-logo" />
              Name:
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={changeName}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAbout">
            <Form.Label>About you:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Tell us a little about yourself"
              value={about}
              onChange={changeAbout}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Profile
          </Button>
        </Form>
        <hr className="divider" />
        <Form>
          <Form.Label htmlFor="api-key-input">API Key: </Form.Label>
          <Form.Control
            id="api-key-input"
            type="password"
            placeholder="Insert API Key Here"
            onChange={changeKey}
            value={key}
          />
          <br />
          <Button className="Submit-Button" onClick={handleKeySubmit}>
            Save API Key
          </Button>
        </Form>
        <div className="authors">Authors: Ethan Rigor, John Shaw, Elijah Jeudy, Maddox Florez</div>
      </footer>
    </div>
  );
}

export default MyProfilePage; 