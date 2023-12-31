import { valueDisplay } from "../math.functions";

export const BetsTable = ({ bets }) => {
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
