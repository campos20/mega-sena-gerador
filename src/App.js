import React from "react";
import Home from "./components/Home";
import Sobre from "./components/Sobre";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Início
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/sobre" className="nav-link">
                  Sobre
                </Link>
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
