import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NotFound from "./components/ErrorPage/Errorpage";
import Home from "./components/UserHome/UserHome";
import SingleSpot from "./components/Servers/IndivudalSever";
import Channel from "./components/Channel";
import ExplorePage from "./components/Servers/ExplorePage/ExplorePage";
import NewLandingPage from "./components/LandingPage/NewLandingPage";
import Nav from "./components/UI/Nav/Nav";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={NewLandingPage} />
          <ProtectedRoute path="/me" component={Nav} />
          <ProtectedRoute exact path="/servers/explore">
            <ExplorePage />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path="/servers/:serverId/:channelId"
            component={Channel}
          />
          <ProtectedRoute
            exact
            path="/servers/:serverId"
            component={SingleSpot}
          />
          <Route path="/login" component={LoginFormPage} />
          <Route expact path="/test" component={Home} />
          <Route path="/signup" component={SignupFormPage} />
          <Route path="*" component={NotFound} />
        </Switch>
      )}
    </>
  );
}

export default App;
