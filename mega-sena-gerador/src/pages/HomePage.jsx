import { useState } from "react";
import { MEGA_SENA_VALUE, MAX_BET_VALUE } from "../constants";

export const HomePage = () => {
  const [value, setValue] = MEGA_SENA_VALUE.toFixed(2);
  const [bets, setBets] = useState();
  const [fixedInput, setFixedInput] = useState({ numbers: [], isValid: true });
  const [showOptions, setShowOptions] = useState(false);

  const handleGenerate = () => {};

  const showTable = () => {};

  const options = () => {};

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
              ></input>
            </p>
          </div>
        </div>
        <div className="row" align="center">
          <div className="col-12">
            <button onClick={handleGenerate} className="btn btn-primary">
              Gerar
            </button>
          </div>
        </div>

        {showTable()}

        <div className="row" align="center">
          <div className="col-12">
            <button
              onClick={() => setShowOptions((o) => !o)}
              className="btn btn-secondary"
              type="button"
            >
              Opções
            </button>
          </div>
        </div>

        {options()}
      </form>
    </div>
  );
};
