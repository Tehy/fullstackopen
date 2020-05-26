import React from "react";
import ShowPerson from "./ShowPerson";

const ShowPersons = (props) => {
  const persons = props.show;
  const showPersons = (i) =>
    i.map((person) => (
      <ShowPerson key={person.name} person={person} onClick={props.delFunc} />
    ));
  return showPersons(persons);
};
export default ShowPersons;
