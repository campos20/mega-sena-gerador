import { useState } from "react";
import {
  MEGA_SENA_VALUE,
  MAX_BET_VALUE,
  MEGA_SENA_MIN,
  MEGA_SENA_MAX,
} from "../constants";
import { valueDisplay } from "../math.functions";

export const HomePage = () => {
  const [value, setValue] = MEGA_SENA_VALUE.toFixed(2);
  const [bets, setBets] = useState([]);
  const [fixedInput, setFixedInput] = useState({
    numbers: [],
    isValid: true,
    message: "",
  });
  const [showOptions, setShowOptions] = useState(false);

  const handleGenerate = () => {};

  const handleFixedInputChange = (value) => {
    setFixedInput(value);

    if (!/[0-9,.]+/.test(value)) {
      setFixedInput((old) => ({
        ...old,
        isValid: false,
        // We also silently accept '.', but whatever
        message: "Apenas números e vírgulas são aceitos",
      }));
      return;
    }

    const trimmed = value
      .replace(".", ",")
      .replace(/\s/g, "")
      .replace(/,+$/, "") // Remove , from the end
      .replace(/^,+/, ""); // Remove , from the beggining

    if (trimmed.length === 0) {
      setFixedInput((old) => ({ ...old, isValid: true, message: "" }));
      return;
    }

    const numbers = trimmed.split(",").map(Number);

    if (numbers.length > 5) {
      setFixedInput((old) => ({
        ...old,
        isValid: false,
        message: "Não é possível fixar mais do que 5 números",
      }));
      return;
    }

    const betweenLimits = numbers
      .map((n) => n <= MEGA_SENA_MAX && n >= MEGA_SENA_MIN)
      .reduce((a, b) => a && b);

    if (!betweenLimits) {
      setFixedInput((old) => ({
        ...old,
        isValid: false,
        message: `Os valores devem estar entre ${MEGA_SENA_MIN} e ${MEGA_SENA_MAX}`,
      }));
      return;
    }

    const setNumbers = new Set(numbers);
    if (setNumbers.size !== numbers.length) {
      setFixedInput((old) => ({
        ...old,
        isValid: false,
        message: "Existem valores repetidos",
      }));
      return;
    }

    setFixedInput((old) => ({
      ...old,
      isValid: true,
      message: "",
      numbers,
    }));
  };

  const showTable = () => {
    if (bets.length === 0) {
      return <></>;
    }

    let totalCost = bets.map((bet) => bet.cost).reduce((a, b) => a + b, 0);

    let distinctBets = bets
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
            {bets.map((bet) => (
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

        {showOptions && (
          <div
            className={
              fixedInput.isValid ? "alert m-1" : "alert alert-danger m-1"
            }
          >
            Incluir números fixos para aparecer nas apostas?{" "}
            <input
              id="fixed-input"
              placeholder="1, 2, 3"
              onChange={(e) => handleFixedInputChange(e.target.value)}
            />
            {fixedInput.message && (
              <p className="alert">{fixedInput.message}</p>
            )}
          </div>
        )}
      </form>
    </div>
  );
};
