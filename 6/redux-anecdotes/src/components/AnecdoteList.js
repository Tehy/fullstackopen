import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";
import React from "react";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.filter === ""
      ? state.anecdotes
      : state.anecdotes.filter((a) =>
          a.content.toLowerCase().includes(state.filter.toLowerCase())
        )
  );
  const dispatch = useDispatch();
  const sortedAnecdotes = anecdotes.sort(function (a, b) {
    return b.votes - a.votes;
  });
  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                dispatch(voteAnecdote(anecdote.id));
                dispatch(showNotification("You voted: " + anecdote.content, 5));
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}{" "}
    </>
  );
};
export default AnecdoteList;
