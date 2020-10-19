import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import UserContext from './context/UserContext';


function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  })

  useEffect(() => {
    const checkLogdeIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await Axios.post(
        "http://localhost:5000/user/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenResponse.data) {
        const userResponse = await Axios.get("http://localhost:5000/user/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userResponse.data,
        });
      }
    };
    checkLogdeIn();
  }, [])

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <div className="App">
          <Home />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
