import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UserHome from "./components/UserHome";
import NotFound from "./components/ErrorPage/Errorpage";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/UserHome/UserHome";
import SingleSpot from "./components/Servers/IndivudalSever";
import Channel from "./components/Channel";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <ProtectedRoute path="/me">
            <UserHome />
          </ProtectedRoute>
          <ProtectedRoute exact path="/servers/:serverId/:channelId" component={Channel} />
          <ProtectedRoute exact path ="/servers/:serverId" component={SingleSpot}/>
          <Route path="/login" component={LoginFormPage} />
          <Route path="/signup" component={SignupFormPage }/>
          <ProtectedRoute path="/ahh" component={Home} />
          <Route path="/test" component={Home} />
          <Route path="*" component={NotFound} />
        </Switch>
      )}
    </>
  );
}

export default App;
