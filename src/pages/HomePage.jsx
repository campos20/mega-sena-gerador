import { useState } from "react";
import { BetsTable } from "../components/BetsTable";
import { Options } from "../components/Options";
import {
  CHOICES_MAX,
  CHOICES_MIN,
  MAX_BET_VALUE,
  MEGA_SENA_MAX,
  MEGA_SENA_MIN,
  MEGA_SENA_VALUE,
} from "../constants";
import { binomial, valueDisplay } from "../math.functions";

export const HomePage = () => {
  const [value, setValue] = useState(MEGA_SENA_VALUE.toFixed(2));
  const [bets, setBets] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [fixedInput, setFixedInput] = useState({
    numbers: [],
    isValid: true,
  });

  const handleGenerate = (evt) => {
    evt.preventDefault();

    if (value > MAX_BET_VALUE) {
      setErrorMessage(`O valor máximo é ${valueDisplay(MAX_BET_VALUE)}`);
      return;
    }

    setErrorMessage("");
    let newValue = value;

    // Pick from 1 to 60
    let possibleNumbers = [];
    for (let j = MEGA_SENA_MIN; j <= MEGA_SENA_MAX; j++) {
      // If the number is already on the fixed input, we do not include it again.
      if (fixedInput.numbers.indexOf(j) < 0) {
        possibleNumbers.push(j);
      }
    }

    let newBets = [];

    while (newValue > 0) {
      let newBetsAdded = false;
      // j = 6 means a 6 numbers bet, j = 7 means 7 numbers bet.
      for (let choice = CHOICES_MAX; choice >= CHOICES_MIN; choice--) {
        let singleCost = binomial(choice, CHOICES_MIN) * MEGA_SENA_VALUE;

        let currentNumberOfBets = Math.floor(newValue / singleCost);

        // i = 2 means 2 bets of 6 numbers (or 7, or whatever `choice` is)
        // We also restrict to not generate bets smaller than 6 choices.
        for (
          let i = 0;
          i < currentNumberOfBets &&
          possibleNumbers.length > CHOICES_MIN &&
          newValue > 0;
          i++
        ) {
          let choices = Object.create(fixedInput.numbers);
          while (choices.length < choice && possibleNumbers.length > 0) {
            // Pick a random number
            let randomIndex = Math.floor(
              Math.random() * possibleNumbers.length
            );
            let choice = possibleNumbers[randomIndex];
            choices.push(choice);

            // Remove the chosen numbers. This prevents intersections.
            // TODO allow some clever intersections.
            possibleNumbers.splice(randomIndex, 1);
          }

          // Better presentation of numbers. Sort asc.
          choices.sort((a, b) => a - b);

          let distinctBets = binomial(choices.length, CHOICES_MIN);
          let currentCost = distinctBets * MEGA_SENA_VALUE;
          newValue -= currentCost;

          newBetsAdded = true;

          newBets.push({
            choices,
            cost: currentCost,
            distinctBets,
          });
        }
      }

      // Prevent accidental infinite loop
      if (!newBetsAdded) {
        break;
      }

      // In case we run out of possible numbers but we still have cash to spent,
      // We take 1 number from each bet
      // This fixes part of the 'some clever intersections' mentioned above.
      while (newValue > 0 && possibleNumbers.length <= CHOICES_MIN) {
        let someToAdd = false;
        for (let i = 0; i < newBets.length; i++) {
          const bet = newBets[i].choices;

          const availableToAdd = bet.filter(
            (b) => !possibleNumbers.includes(b)
          );

          if (availableToAdd.length === 0) {
            continue;
          }

          someToAdd = true;

          // Pick a random number
          let randomIndex = Math.floor(Math.random() * availableToAdd.length);
          let choice = availableToAdd[randomIndex];

          possibleNumbers.push(choice);
        }
        if (!someToAdd) {
          break;
        }
      }
    }

    setBets(newBets);
  };

  return (
    <div>
      <form className="container">
        <div className="row">
          <div className="col-12" align="center">
            <h1>Gerador Mega Sena</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12" align="center">
            <p>
              Digite o valor da vaquinha: R${" "}
              <input
                id="value-input"
                onChange={(e) => setValue(e.target.value)}
                value={value}
                min={MEGA_SENA_VALUE}
                max={MAX_BET_VALUE}
                type="number"
                step="0.01"
                required
              />
            </p>
          </div>
        </div>
        <div className="row m-2" align="center">
          <div className="col-12">
            <button onClick={handleGenerate} className="btn btn-primary">
              Gerar
            </button>
          </div>
        </div>

        {errorMessage.length > 0 && (
          <p className="alert alert-danger">{errorMessage}</p>
        )}

        <BetsTable bets={bets} />
        <Options
          fixedInput={fixedInput}
          setFixedInput={setFixedInput}
          setErrorMessage={setErrorMessage}
        />
      </form>
    </div>
  );
};
