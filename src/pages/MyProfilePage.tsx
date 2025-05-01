import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./MyProfilePage.css";

export let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function MyProfilePage() {
  const [key, setKey] = useState<string>(keyData);
  const [about, setAbout] = useState<string>("");
  const [currentUsername, setCurrentUsername] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  // Allowed usernames for which the "About you" section will be shown
  //const allowedUsernames = ["elijah", "ethan"]; // Replace with actual allowed usernames

  // Load the username and "About you" content from localStorage when the component mounts
  useEffect(() => {
    const storedUsername = localStorage.getItem("currentUsername")?.replace(/"/g, "") || "";
    setCurrentUsername(storedUsername);

    // Retrieve "About you" content for the logged-in user from localStorage
    if (storedUsername) {
      const storedAbout = localStorage.getItem(`about-${storedUsername}`) || "";

      // Set default "About you" text for known usernames
      if (!storedAbout) {
        const defaultAbout =
          storedUsername === "elijah" ? "Elijah is awesome" : storedUsername === "ethan" ? "Ethan is awesome" : "";
        setAbout(defaultAbout);
        localStorage.setItem(`about-${storedUsername}`, defaultAbout); // Save default about info
      } else {
        setAbout(storedAbout);
      }
    }
  }, []);
/*
  // Update the username and localStorage on login
  function handleLogin(username: string) {
    setCurrentUsername(username);
    localStorage.setItem("currentUsername", JSON.stringify(username));

    // When logging in, load or create default "About you" content
    const storedAbout = localStorage.getItem(`about-${username}`);
    if (!storedAbout) {
      const defaultAbout = username === "elijah" ? "Elijah is awesome" : "Ethan is awesome";
      setAbout(defaultAbout);
      localStorage.setItem(`about-${username}`, defaultAbout);
    } else {
      setAbout(storedAbout);
    }
  }

  // Handle logging out
  function handleLogout() {
    setCurrentUsername("");
    localStorage.removeItem("currentUsername");
    setAbout(""); // Clear the "About you" field on logout
    // Optionally, clear the "About you" data from localStorage if needed
    // localStorage.removeItem(`about-${currentUsername}`);
  }
*/
  // Save the API key
  function handleKeySubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload();
  }

  // Save the "About you" section to localStorage
  function handleProfileSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log("About submitted:", about);
    // Save the "About you" data to localStorage for the logged-in user
    if (currentUsername) {
      localStorage.setItem(`about-${currentUsername}`, about);
    }
  }

  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
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

  function updateCurrentPassword(event: React.ChangeEvent<HTMLInputElement>){
    setCurrentPassword(event.target.value);
  }

  function updateNewPassword(event: React.ChangeEvent<HTMLInputElement>){
    setNewPassword(event.target.value);
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
        {/* Username Display right above the "About You" section */}
        {currentUsername && (
          <div className="user-greeting">
            <strong>Username:</strong> {currentUsername}
          </div>
        )}
        <div className = 'passwordBoxes'>
        <div><strong>Reset Password:</strong></div>
        <Form>
          <Form.Group controlId="CurrentPassword">
            <Form.Label>Current Password:</Form.Label>
              <Form.Control
                value={currentPassword}
                  onChange={updateCurrentPassword} />
          </Form.Group>
        </Form>
        <Form>
          <Form.Group controlId="NewPassword">
            <Form.Label>New Password:</Form.Label>
              <Form.Control
                value={newPassword}
                  onChange={updateNewPassword} />
          </Form.Group>
        </Form>
        </div>
        {/* "About You" Section that is always visible */}
        <Form onSubmit={handleProfileSubmit}>
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

        <div className="authors">
          Authors: Ethan Rigor, John Shaw, Elijah Jeudy, Maddox Florez
        </div>
      </footer>
    </div>
  );
}

export default MyProfilePage;
