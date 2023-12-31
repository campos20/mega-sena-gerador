import React from "react";

import { HashRouter, Link, Route, Routes } from "react-router-dom";

import { AboutPage } from "../src/pages/AboutPage";
import { HomePage } from "../src/pages/HomePage";

import "bootstrap/dist/css/bootstrap.min.css";

export const App = () => {
  return (
    <HashRouter>
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
                <Link to="/about" className="nav-link">
                  Sobre
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
};
