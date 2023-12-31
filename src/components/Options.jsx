import { useState } from "react";

import { MEGA_SENA_MAX, MEGA_SENA_MIN } from "../constants";

export const Options = ({ fixedInput, setFixedInput, setErrorMessage }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [rawInput, setRawInput] = useState("");

  const handleFixedInputChange = (value) => {
    setRawInput(value);

    if (!/[0-9,.]+/.test(value)) {
      // We also silently accept '.', but whatever
      setErrorMessage("Apenas números e vírgulas são aceitos");

      setFixedInput((old) => ({
        ...old,
        isValid: false,
        numbers: [],
      }));
      return;
    }

    const trimmed = value
      .replace(".", ",")
      .replace(/\s/g, "")
      .replace(/,+$/, "") // Remove , from the end
      .replace(/^,+/, ""); // Remove , from the beggining

    if (trimmed.length === 0) {
      setErrorMessage("");
      setFixedInput((old) => ({
        ...old,
        isValid: true,
        numbers: [],
      }));
      return;
    }

    const numbers = trimmed.split(",").map(Number);

    if (numbers.length > 5) {
      setErrorMessage("Não é possível fixar mais do que 5 números");
      setFixedInput((old) => ({
        ...old,
        numbers: [],
        isValid: false,
      }));
      return;
    }

    const betweenLimits = numbers
      .map((n) => n <= MEGA_SENA_MAX && n >= MEGA_SENA_MIN)
      .reduce((a, b) => a && b);

    if (!betweenLimits) {
      setErrorMessage(
        `Os valores devem estar entre ${MEGA_SENA_MIN} e ${MEGA_SENA_MAX}`
      );
      setFixedInput((old) => ({
        ...old,
        numbers: [],
        isValid: false,
      }));
      return;
    }

    const setNumbers = new Set(numbers);
    if (setNumbers.size !== numbers.length) {
      setErrorMessage("Existem valores repetidos");
      setFixedInput((old) => ({
        ...old,
        numbers: [],
        isValid: false,
      }));
      return;
    }

    setErrorMessage("");
    setFixedInput((old) => ({
      ...old,
      isValid: true,
      numbers,
    }));
  };

  return (
    <>
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
          Incluir números fixos para aparecer nas apostas?
          <input
            id="fixed-input"
            placeholder="1, 2, 3"
            value={rawInput}
            onChange={(e) => handleFixedInputChange(e.target.value)}
          />
          {fixedInput.message && <p className="alert">{fixedInput.message}</p>}
        </div>
      )}
    </>
  );
};
