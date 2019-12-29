import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.css";

import binomial from "../functions/math.utils";

debugger;

const CHOICES_MIN = 6;
const CHOICES_MAX = 15;

const MEGA_SENA_MIN = 1;
const MEGA_SENA_MAX = 60;

const MEGA_SENA_VALUE = 4.5; // R$ 4,50

// For now, we do not allow very large values for bets, only about 100k.
const maxBetValue =
  (binomial(CHOICES_MAX, CHOICES_MIN) *
    MEGA_SENA_VALUE *
    (MEGA_SENA_MAX - MEGA_SENA_MIN + 1)) /
  CHOICES_MAX;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { value: 0, bets: [] };
  }

  handleValueChange = evt => {
    let value = evt.target.value;

    // Digits only
    if (/\D/.test(value)) {
      return;
    }

    value = Number(value);

    if (value > maxBetValue) {
      return;
    }

    let state = this.state;
    state.value = Number(value);
    this.setState(state);
  };

  generate = () => {
    let value = this.state.value;

    // Pick from 1 to 60
    let possibleNumbers = [];
    for (let j = MEGA_SENA_MIN; j <= MEGA_SENA_MAX; j++) {
      possibleNumbers.push(j);
    }

    let bets = [];
    // j = 6 means a 6 numbers bet, j = 7 means 7 numbers bet.
    for (let j = CHOICES_MAX; j >= CHOICES_MIN && value >= 0; j--) {
      let singleCost = binomial(j, CHOICES_MIN) * MEGA_SENA_VALUE;

      let currentNumberOfBets = Math.floor(value / singleCost);

      for (
        let i = 0;
        i < currentNumberOfBets && possibleNumbers.length > CHOICES_MIN;
        i++
      ) {
        let choices = [];
        for (let k = 0; k < j && possibleNumbers.length > 0; k++) {
          // Pick a random number
          let randomIndex = Math.floor(Math.random() * possibleNumbers.length);
          let choice = possibleNumbers[randomIndex];
          choices.push(choice);

          // Remove the chosen numbers. This prevents intersections.
          // TODO allow some clever intersections.
          possibleNumbers.splice(randomIndex, 1);
        }

        // Better presentation of numbers. Sort asc.
        choices.sort((a, b) => a - b);

        bets.push({ choices: choices, cost: singleCost });
      }

      let currentCost = currentNumberOfBets * singleCost;
      value -= currentCost;
    }

    let state = this.state;
    state.bets = bets;
    this.setState(state);
  };

  render() {
    return (
      <div>
        <h1>Gerador Mega Sena</h1>
        <p>Digite o valor da vaquinha</p>
        <input
          id="value-input"
          onChange={this.handleValueChange}
          value={this.state.value}
        ></input>

        <hr />

        <button onClick={this.generate}>Gerar</button>

        <div className="text-center">
          <table className="table table-striped table-bordered table-hover table-condensed">
            <thead className="thead-dark">
              <tr>
                <th className="align-middle" scope="col">
                  Tamanho
                </th>
                <th className="align-middle" scope="col">
                  Jogo
                </th>
                <th className="align-middle" scope="col">
                  Custo
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.bets.map(bet => (
                <tr key={bet.choices}>
                  <td>{bet.choices.length}</td>
                  <td>{bet.choices.join(", ")}</td>
                  <td>{valueDisplay(bet.cost)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th>Total</th>
                <th>
                  {valueDisplay(
                    this.state.bets
                      .map(bet => bet.cost)
                      .reduce((a, b) => a + b, 0)
                  )}
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}

var valueDisplay = value => {
  return "R$ " + value.toFixed(2);
};

export default Home;
