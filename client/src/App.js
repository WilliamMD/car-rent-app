import React, {useState, useEffect} from "react";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import "./index.css";
import { MainComponent } from "./components/";

function App() {
  const [login, setLogin] = useState(false);
  const getToken = (token) => {
    localStorage.setItem("access_token", token);
  }
  const userLogin = (param) => {
    setLogin(param)
  }

  useEffect(() => {
    if(localStorage.getItem("access_token")) {
      setLogin(true)
    } else {
      setLogin(false)
    }
  }, [login])


  return (
    <div className="App">
      <BrowserRouter>
        <MainComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
