import React from "react";
import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addAnecdote = (e) => {
    e.preventDefault();
    const newAnecdote = e.target.anecdote.value;
    dispatch(createNewAnecdote(newAnecdote));
    dispatch(showNotification(`you voted '${newAnecdote.content}'`, 10));
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" onChange={(e) => e.target.value} />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};
export default AnecdoteForm;
