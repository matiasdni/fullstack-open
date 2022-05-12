import { useState } from "react";

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ clicks }) => {
  const allClicks = clicks.length;
  const goodClicks = clicks.filter((i) => i === "G").length;
  const neutralClicks = clicks.filter((i) => i === "N").length;
  const badClicks = clicks.filter((i) => i === "B").length;
  if (allClicks) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={goodClicks} />
          <StatisticLine text="neutral" value={neutralClicks} />
          <StatisticLine text="bad" value={badClicks} />
          <StatisticLine text="all" value={allClicks} />
          <StatisticLine
            text="average"
            value={(goodClicks - badClicks) / allClicks}
          />
          <StatisticLine
            text="positive"
            value={(goodClicks / allClicks) * 100 + " %"}
          />
        </tbody>
      </table>
    );
  } else {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleGoodClick = () => {
    setAll(allClicks.concat("G"));
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setAll(allClicks.concat("N"));
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setAll(allClicks.concat("B"));
    setBad(bad + 1);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h1>statistics</h1>
      <Statistics clicks={allClicks} />
    </>
  );
};

export default App;
