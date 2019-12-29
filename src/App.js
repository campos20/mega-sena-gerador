import React from "react";
import Home from "./components/Home";
import Sobre from "./components/Sobre";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  // Prevents loss of base url while navigating.
  const baseUrl = window.location.origin.toString();
  console.log(window.location);

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a href={baseUrl} className="nav-link">
                  Início
                </a>
              </li>
              <li className="nav-item">
                <a href={baseUrl + "/sobre"} className="nav-link">
                  Sobre
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <Switch>
          <Route path="/sobre">
            <Sobre />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
