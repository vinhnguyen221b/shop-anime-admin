import React, { useEffect, useState } from "react";
import "./App.css";
import auth from "./services/authService";
import { Redirect, Route, Switch } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import Login from "./components/Login";
import ProtectedRoute from "./components/commons/ProtectedRoute";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "./context/userContext";

function App() {
  const [user, setUser] = useState();
  const getUser = async () => {
    const u = await auth.getCurrentUser();
    setUser(u);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <ToastContainer />
      <Switch>
        <Route path="/login" component={Login} />
        <UserContext.Provider value={user}>
          <ProtectedRoute path="/" component={DashBoard} user={user} />
        </UserContext.Provider>

        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </>
  );
}

export default App;
