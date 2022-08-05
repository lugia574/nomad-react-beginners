// import Button from "./Button";
// import styles from "./App.module.css";
// import React, { useState, useEffect } from "react";
// import Movie from "./components/Movie";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Detail from "./router/Detail";
import Home from "./router/Home";
import "./client/scss/styles.scss";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/movie/:id">
          <Detail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
