import React from "react";
import ReactDOM from "react-dom";
const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  );
};
const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};
const Content = (props) => {
  return (
    <>
      {props.parts.map((prop) => (
        <>
          <Part part={prop.name} exercises={prop.exercises} />
        </>
      ))}
    </>
  );
};
const Total = (props) => {
  var total = 0;
  props.parts.forEach((el) => {
    total += el.exercises;
  });
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
