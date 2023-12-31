import React from "react";

import { HashRouter, Link, Route, Routes } from "react-router-dom";

import { AboutPage } from "../src/pages/about/AboutPage";

import "bootstrap/dist/css/bootstrap.min.css";

export const App = () => {
  return (
    <div className="container container-fluid h-100">
      <HashRouter>
        <nav className="container navbar navbar-expand-lg navbar-dark bg-dark h-100">
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
        </nav>

        <Routes>
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
};
