import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Users from "./users/pages/Users";
//import NewPlace from "./places/pages/NewPlace";
import Mainnavigation from "./shared/components/Navigation/Mainnavigation";
import "./App.css";
//import UpdatePlace from "./places/pages/UpdatePlace";
//import Userplaces from "./places/pages/Userplaces";
//import Auth from "./users/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/Auth-hook";
import LoadingSpinner from "./shared/UIElements/LoadingSpinner";

const Users = React.lazy(() => import("./users/pages/Users"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const Userplaces = React.lazy(() => import("./places/pages/Userplaces"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const Auth = React.lazy(() => import("./users/pages/Auth"));

function App() {
  const { token, login, logout, userId } = useAuth();

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
            <Switch>
              <Suspense
                fallback={
                  <div className="center">
                    <LoadingSpinner />
                  </div>
                }
              >
                {routes}
              </Suspense>
            </Switch>
          </main>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
