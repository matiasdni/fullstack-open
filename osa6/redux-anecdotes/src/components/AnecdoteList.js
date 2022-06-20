import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) =>
    [...state.anecdotes]
      .sort((a, b) => b.votes - a.votes)
      .filter((anec) =>
        anec.content.toLowerCase().includes(state.filter.toLowerCase())
      )
  );

  const vote = (id) => {
    dispatch(voteAnecdote(id));
    dispatch(
      setNotification(
        `you voted "${anecdotes.find((a) => a.id === id).content}"`,
        5
      )
    );
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
