import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./users/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import Mainnavigation from "./shared/components/Navigation/Mainnavigation";
import "./App.css";
import UpdatePlace from "./places/pages/UpdatePlace";
import Userplaces from "./places/pages/Userplaces";
import Auth from "./users/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState();
  const login = useCallback((uid, token) => {
    setUserId(uid);
    setToken(token);
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);
  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <Userplaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <Userplaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </React.Fragment>
    );
  }
  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <Router>
          <Mainnavigation />
          <main>
            <Switch>{routes}</Switch>
          </main>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
