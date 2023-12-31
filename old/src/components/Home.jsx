import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.css";

import "./Home.css";

import {
  CHOICES_MIN,
  CHOICES_MAX,
  MEGA_SENA_MIN,
  MEGA_SENA_MAX,
  MEGA_SENA_VALUE,
} from "../constants/mega.sena.constants";


class Home extends Component {


  handleFixedInputChange = (evt) => {
    let input = evt.target.value;

    let validFixedInput = this.validateFixedInput(input);

    let state = this.state;
    state.fixedInput.isValid = validFixedInput;

    if (validFixedInput) {
      let fixedNumbers = input.split(",").map(Number);
      state.fixedInput.numbers = fixedNumbers;
    } else {
      state.fixedInput.numbers = [];
    }

    this.setState(state);
  };

  validateFixedInput = (input) => {
    let numbers = input.split(",");

    if (numbers.length === 0 || numbers.length > 5) {
      return false;
    }

    // Fixed numbers must by all digits only
    let digitsOnly = numbers.map(isDigitOrSpace).reduce((a, b) => a && b, true);
    if (!digitsOnly) {
      return false;
    }

    numbers = numbers.map(Number);

    // 1 <= n <= 60
    let betweenLimits = numbers
      .map((n) => n <= MEGA_SENA_MAX && n >= MEGA_SENA_MIN)
      .reduce((a, b) => a && b);
    if (!betweenLimits) {
      return false;
    }

    // Duplications
    if (new Set(numbers).size !== numbers.length) {
      return false;
    }

    return true;
  };

  showOptions = () => {
    if (!this.state.showOptions) {
      return;
    }
    return (
      <div className="row">
        <div className="col-12">
          <p>
            Incluir números fixos para aparecer nas apostas?{" "}
            <input
              id="fixed-input"
              placeholder="1, 2, 3"
              onChange={this.handleFixedInputChange}
              className={this.state.fixedInput.isValid ? "" : "input-invalid"}
            ></input>
          </p>
        </div>
      </div>
    );
  };

  handleShowOptions = () => {
    let state = this.state;
    state.showOptions = !state.showOptions;
    this.setState(state);
  };

  generate = (evt) => {
    evt.preventDefault();
    let value = this.state.value;

    // Pick from 1 to 60
    let possibleNumbers = [];
    for (let j = MEGA_SENA_MIN; j <= MEGA_SENA_MAX; j++) {
      // If the number is already on the fixed input, we do not include it again.
      if (this.state.fixedInput.numbers.indexOf(j) < 0) {
        possibleNumbers.push(j);
      }
    }

    let bets = [];
    // j = 6 means a 6 numbers bet, j = 7 means 7 numbers bet.
    for (
      let choice = CHOICES_MAX;
      choice >= CHOICES_MIN && value >= 0;
      choice--
    ) {
      let singleCost = binomial(choice, CHOICES_MIN) * MEGA_SENA_VALUE;

      let currentNumberOfBets = Math.floor(value / singleCost);

      // i = 2 means 2 bets of 6 numbers (or 7, or whatever `choice` is)
      // We also restrict to not generate bets smaller than 6 choices.
      for (
        let i = 0;
        i < currentNumberOfBets && possibleNumbers.length > CHOICES_MIN;
        i++
      ) {
        let choices = Object.create(this.state.fixedInput.numbers);
        while (choices.length < choice && possibleNumbers.length > 0) {
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

        let distinctBets = binomial(choice, CHOICES_MIN);

        bets.push({
          choices: choices,
          cost: singleCost,
          distinctBets: distinctBets,
        });
      }

      let currentCost = currentNumberOfBets * singleCost;
      value -= currentCost;
    }

    let state = this.state;
    state.bets = bets;
    this.setState(state);
  };

  showTable = () => {
    if (this.state.bets.length === 0) {
      return;
    }

    let totalCost = this.state.bets
      .map((bet) => bet.cost)
      .reduce((a, b) => a + b, 0);

    let distinctBets = this.state.bets
      .map((bet) => bet.distinctBets)
      .reduce((a, b) => a + b, 0);

    return (
      <div className="text-center">
        <table className="table table-striped table-bordered table-hover table-condensed">
          <thead className="thead-dark">
            <tr>
              <th className="align-middle" scope="col">
                Jogo
              </th>
              <th className="align-middle" scope="col">
                Tamanho
              </th>
              <th>Jogos distintos</th>
              <th className="align-middle" scope="col">
                Custo
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.bets.map((bet) => (
              <tr key={bet.choices}>
                <td>{bet.choices.join(", ")}</td>
                <td>{bet.choices.length}</td>
                <td>{bet.distinctBets}</td>
                <td>{valueDisplay(bet.cost)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Total</th>
              <th>{distinctBets}</th>
              <th>{valueDisplay(totalCost)}</th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  };

  render() {
    return (
      
    );
  }
}

var valueDisplay = (value) => {
  return "R$ " + value.toFixed(2);
};

var isDigitOrSpace = (str) => /^[0-9\s]*$/.test(str);

export default Home;
