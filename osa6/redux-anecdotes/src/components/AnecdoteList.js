import { useDispatch, useSelector } from "react-redux";
import { incrementVotesOf } from "../reducers/anecdoteReducer";
import { notify, reset } from "../reducers/notificationReducer";

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
    dispatch(incrementVotesOf(id));
    dispatch(
      notify(`you voted "${anecdotes.find((a) => a.id === id).content}"`)
    );
    setTimeout(() => {
      dispatch(reset(null));
    }, 5000);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
