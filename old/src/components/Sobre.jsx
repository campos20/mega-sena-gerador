import React, { Component } from "react";

class Sobre extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <h1>Sobre</h1>
        <p>
          App despretencioso para facilitar a geração de jogos da mega-sena
          entre vaquinhas.
        </p>
        <p>
          O site é open-source e você pode contribuir{" "}
          <a href="https://github.com/campos20/mega-sena-gerador">aqui</a>.
        </p>
      </div>
    );
  }
}

export default Sobre;
