import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './CSS/LogIn.css'
import './CSS/ImagesContainer.css'

const LogIn = () => {
  const realpass = 'NazisShop2024_@Shop';
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const handleCheck = (e) => {
    e.preventDefault();

    if (userName === 'Nazi_Msaxuradze' && userPassword === realpass) {
      console.log("Logged In Successfully. Welcome: Nazi_Msaxuradze");
      navigate(`/home/${userName}`); // Navigate to the home page with username parameter upon successful login
    } else {
      console.log("Invalid password or username");
    }

    setUserName("");
    setUserPassword("");
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  return (
    <form className="forms">
      <h3>შესვლა - მხოლოდ საიტის მფლობელისთვის</h3>
      <label htmlFor="username">
        სახელი:
        <input
          type="text"
          id="username"
          name="username"
          placeholder="შეიყვანეთ სასხელი"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>
  
      <label htmlFor="password">
        პაროლი:
        <input
          type="password"
          id="password"
          name="password"
          placeholder="შეიყვანეთ პაროლი"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
      </label>
  
      <button onClick={handleCheck} className="buttons">
        შესვლა
      </button>
    </form>
  );
};

export default LogIn;
