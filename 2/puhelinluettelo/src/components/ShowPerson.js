import React from "react";

const ShowPerson = (props) => {
  const deletePerson = () => props.onClick(props.person.id, props.person.name);
  const showPerson = () => (
    <div>
      {props.person.name} {props.person.number}{" "}
      <button onClick={deletePerson}>delete</button>
    </div>
  );

  return showPerson();
};
export default ShowPerson;
