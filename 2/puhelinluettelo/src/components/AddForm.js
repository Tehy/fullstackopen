import React from "react";

const AddForm = (props) => {
  return (
    <>
      <h2>Add new contact</h2>
      <form onSubmit={props.submit}>
        name: <input value={props.name} onChange={props.nameChange} />
        <br />
        number: <input value={props.number} onChange={props.numberChange} />
        <button type="submit">save</button>
      </form>
    </>
  );
};
export default AddForm;
