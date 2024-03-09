import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './CSS/LogIn.css'
import './CSS/ImagesContainer.css'

const LogIn = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const handleCheck = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://nazishop.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: userName, password: userPassword })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        navigate(`/home/${userName}`); // Navigate to the home page with username parameter upon successful login
      } else {
        const errorData = await response.json();
        console.log(errorData.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }

    setUserName("");
    setUserPassword("");
  };

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
