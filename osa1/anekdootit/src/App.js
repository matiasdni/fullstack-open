import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text} </button>
);

const Content = ({ anecdote, votes }) => {
  return (
    <div>
      {anecdote}
      <br></br>
      has {votes} votes
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  ];

  const [selected, setSelected] = useState(
    Math.floor(Math.random() * anecdotes.length)
  );
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleNextClick = () => {
    const newSelection = Math.floor(Math.random() * anecdotes.length);
    setSelected(newSelection);
    console.log("Next anecdote clicked.", "New anecdote index", newSelection);
  };

  const handleVoteClick = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
    console.log("voted", selected, "new votes", copy);
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <Content anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={handleVoteClick} text="vote" />
      <Button handleClick={handleNextClick} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <Content
        anecdote={anecdotes[votes.indexOf(Math.max(...votes))]}
        votes={votes[votes.indexOf(Math.max(...votes))]}
      />
    </>
  );
};

export default App;
