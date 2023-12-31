import { useState } from "react";

import { MEGA_SENA_MAX, MEGA_SENA_MIN } from "../constants";

export const Options = ({ fixedInput, setFixedInput }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [rawInput, setRawInput] = useState("");

  const handleFixedInputChange = (value) => {
    setRawInput(value);

    if (!/[0-9,.]+/.test(value)) {
      setFixedInput((old) => ({
        ...old,
        isValid: false,
        // We also silently accept '.', but whatever
        message: "Apenas números e vírgulas são aceitos",
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
      setFixedInput((old) => ({
        ...old,
        isValid: true,
        message: "",
        numbers: [],
      }));
      return;
    }

    const numbers = trimmed.split(",").map(Number);

    if (numbers.length > 5) {
      setFixedInput((old) => ({
        ...old,
        numbers: [],
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
        numbers: [],
        isValid: false,
        message: `Os valores devem estar entre ${MEGA_SENA_MIN} e ${MEGA_SENA_MAX}`,
      }));
      return;
    }

    const setNumbers = new Set(numbers);
    if (setNumbers.size !== numbers.length) {
      setFixedInput((old) => ({
        ...old,
        numbers: [],
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
