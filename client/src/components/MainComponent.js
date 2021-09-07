import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import axios from "axios";

import {
  Home,
  Welcome,
  UserRegister,
  UserLogin,
  Cart,
  CarPage,
  Profile,
  Transaction,
} from "../pages/User";
import { UserNavbarComponent } from "./User";
import Footer from "./Footer/Footer";

import {
  AdminLogin,
  AdminDashboard,
  CarList,
  CarAdd,
  CarEdit,
  CarDetails,
  AdminProfile,
  AdminProfilEdit,
  TransactionSuccess,
  AdminTransaction,
} from "../pages/Admin";
import { AdminNavbarComponent, SidebarComponent } from "./Admin/";

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
          <Switch>
            <Route exact path="/">
              <Welcome />
            </Route>
            <Container fluid className="mt-3">
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
              <Route exact path="/cart">
                <Cart />
              </Route>
              <Route exact path="/car/:id">
                <CarPage login={login} />
              </Route>
              <Route exact path="/transaction">
                <Transaction />
              </Route>
            </Container>
            <Route>
              <NotFound />
            </Route>
          </Switch>
          <Footer />
        </>
      ) : login && user.type === "admin" ? (
        // For type admin
        <>
          <AdminNavbarComponent userLogin={userLogin} />
          <Container fluid>
            <Row g={0}>
              <SidebarComponent />
              <Switch>
                <Route exact path="/">
                  <AdminDashboard />
                </Route>
                <Route exact path="/car/list">
                  <CarList />
                </Route>
                <Route exact path="/car/add">
                  <CarAdd />
                </Route>
                <Route exact path="/car/:id/edit">
                  <CarEdit />
                </Route>
                <Route exact path="/car/:id">
                  <CarDetails />
                </Route>
                <Route exact path="/profile">
                  <AdminProfile />
                </Route>
                <Route exact path="/profile/edit">
                  <AdminProfilEdit />
                </Route>
                <Route exact path="/transaction/list">
                  <AdminTransaction />
                </Route>
                <Route exact path="/transaction/completed/list">
                  <TransactionSuccess />
                </Route>
                <Route>
                  <NotFound />
                </Route>
              </Switch>
            </Row>
          </Container>
          <Footer />
        </>
      ) : !login ? (
        // For unauthenticated users
        <>
          <UserNavbarComponent login={login} userLogin={userLogin} />
          <Switch>
            <Route exact path="/">
              <Welcome />
              <Footer />
            </Route>
            <Route exact path="/home">
              <Container fluid className="mt-3">
                <Home />
              </Container>
              <Footer />
            </Route>
            <Route exact path="/car/:id">
              <Container fluid className="mt-3">
                <CarPage login={login} />
              </Container>
              <Footer />
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
          </Switch>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default MainComponent;
