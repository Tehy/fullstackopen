import React from "react";

const Header = (props) => <h2>{props.courseName}</h2>;

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = (props) => {
  const allParts = props.parts.map((part, i) => (
    <Part
      key={props.partKey + i + 1}
      name={part.name}
      exercises={part.exercises}
    />
  ));
  return <>{allParts}</>;
};

const Total = (props) => {
  return (
    <p style={{ fontWeight: "bold" }}>Number of exercises {props.total}</p>
  );
};

const Course = (props) => {
  const getTotal = (total, item) => {
    return total + item;
  };
  const headerKey = (i) => props.masterKey + (i + 1) * 1000;
  const someKey = (i) => props.masterKey + (i + 1) * 1000 + (i + 1) * 100;
  return (
    <>
      {props.courses.map((course, i) => (
        <div key={i}>
          <Header courseName={course.name} key={headerKey(i)} />
          <Content parts={course.parts} key={someKey(i)} partKey={someKey(i)} />
          <Total
            total={course.parts.map((el) => el.exercises).reduce(getTotal)}
            key={i}
          />
        </div>
      ))}
    </>
  );
};
export default Course;
