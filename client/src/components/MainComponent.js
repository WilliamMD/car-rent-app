import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import { Home, UserRegister, UserLogin, Cart } from "../pages/User";
import {AdminLogin } from "../pages/Admin";

import { NavbarComponent } from "./";

const MainComponent = () => {
  return (
    <>
      <NavbarComponent />
      <div className="mt-3">
        <Container fluid>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/register">
              <UserRegister />
            </Route>
            <Route exact path="/login">
              <UserLogin />
            </Route>
            <Route exact path="/admin/login">
              <AdminLogin />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
          </Switch>
        </Container>
      </div>
    </>
  );
};

export default MainComponent;
