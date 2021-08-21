import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from "axios";

import { Home, UserRegister, UserLogin, Cart } from "../pages/User";
import UserNavbarComponent from "./User/UserNavbarComponent";

import { AdminLogin, AdminHome } from "../pages/Admin";
import AdminNavbarComponent from "./Admin/AdminNavbarComponent";

import NotFound from "../pages/NotFound";

const MainComponent = ({ login, userLogin, getToken }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    adminCheck();
  }, [login]);

  const adminCheck = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      const result = await axios({
        method: "GET",
        url: "http://localhost:3000/users/details",
        headers: {
          access_token,
        },
      });
      console.log(result.data);
      setUser(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {login && user.type === "user" ? (
        // For type user
        <>
          <UserNavbarComponent login={login} userLogin={userLogin} />
          <Container fluid className="mt-3">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/cart">
                <Cart />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Container>
        </>
      ) : login && user.type === "admin" ? (
        // For type admin
        <>
          <AdminNavbarComponent userLogin={userLogin} />
          <Container fluid className="mt-3">
            <Switch>
              <Route exact path="/admin">
                <AdminHome />
              </Route>
            </Switch>
          </Container>
        </>
      ) : !login ? (
        // For unauthenticated users
        <>
          <UserNavbarComponent login={login} userLogin={userLogin} />
          <Container fluid className="mt-3">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/login">
                <UserLogin userLogin={userLogin} getToken={getToken} />
              </Route>
              <Route exact path="/register">
                <UserRegister />
              </Route>
              <Route exact path="/admin/login">
                <AdminLogin userLogin={userLogin} getToken={getToken} />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Container>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default MainComponent;
