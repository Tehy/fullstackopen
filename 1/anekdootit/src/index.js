import React, { useState } from "react";
import ReactDOM from "react-dom";

const MaxAnecdote = (props) => {
  return (
    <>
      <h3>anecdote with most votes {props.maxVotes}</h3>
      <p> {props.maxVoted} </p>
    </>
  );
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(
    new Array(props.anecdotes.length).fill(0)
  );
  const [maxAnecdote, setMaxAnecdote] = useState("");
  const [maxVotes, setMaxVotes] = useState(0);

  return (
    <div>
      <button
        onClick={() => {
          const newPoints = [...points];
          newPoints[selected] += 1;
          setPoints(newPoints);
          setMaxVotes(Math.max.apply(null, newPoints));
          const maxVoteIndex = points.indexOf(maxVotes);
          setMaxAnecdote(props.anecdotes[maxVoteIndex]);
        }}
      >
        Vote
      </button>
      <button
        onClick={() => {
          setSelected(Math.floor(Math.random() * props.anecdotes.length));
        }}
      >
        Anecdote
      </button>
      <br />
      <p>This anecdote has {points[selected]} votes</p>
      <br />
      {props.anecdotes[selected]}
      <br />

      <MaxAnecdote maxVoted={maxAnecdote} maxVotes={maxVotes} />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
