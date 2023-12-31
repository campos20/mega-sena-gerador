import React from "react";

import { HashRouter, Link } from "react-router-dom";
import "./App.css";

export const App = () => {
  return (
    <div>
      <HashRouter>
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
      </HashRouter>
    </div>
  );
};
