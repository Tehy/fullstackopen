import React from "react";
import { connect } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

class AnecdoteForm extends React.Component {
  addAnecdote = (e) => {
    e.preventDefault();
    const newAnecdote = e.target.anecdote.value;
    this.props.createNewAnecdote(newAnecdote);
    this.props.showNotification(`You created '${newAnecdote}'`, 10);
  };
  render() {
    return (
      <>
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div>
            <input name="anecdote" onChange={(e) => e.target.value} />
          </div>
          <button type="submit">create</button>
        </form>
      </>
    );
  }
}
const mapDispatchToProps = {
  createNewAnecdote,
  showNotification,
};

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);

export default ConnectedAnecdoteForm;
