import React, { useState, useEffect } from "react";
import AddForm from "./components/AddForm";
import Filter from "./components/Filter";
import ShowPersons from "./components/ShowPersons";
import Notification from "./components/Notification";
import service from "./services/db";

const App = () => {
  //get data from db
  useEffect(() => {
    (async () => {
      setPersons(await service.dbGetAll());
    })();
  }, []);

  //notifications
  const warning = async (msg) => {
    return { type: "warning", message: msg };
  };
  const success = async (msg) => {
    return { type: "success", message: msg };
  };
  const error = async (msg) => {
    return { type: "error", message: msg };
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
  };

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    if (notification.type !== "") {
      //excludes onmount notify show
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 4300);
    }
  }, [notification]);

  //handle add/update person
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const checkPerson = () => {
      for (var person of persons) {
        if (newPerson.name === person.name) {
          return true;
        }
      }
      return false;
    };
    (async () => {
      //newPerson.name already in db?
      let bool = checkPerson();
      if (bool) {
        //confirm data overwrite
        let confirm = window.confirm(`Alert! '${newPerson.name}' is already in puhelinluettelo. 
        Update number?`);
        if (confirm) {
          //get index of updating data
          let index = persons.filter((person) => {
            if (newPerson.name === person.name) return person;
          });
          //update person data
          try {
            await service.dbUpdatePerson(index[0], newPerson);
            setNotification(await success(`${newPerson.name} updated!`));
          } catch (err) {
            setNotification(await error(`${newPerson.name} already deleted!`));
          }
        }
      } else {
        //add newPerson data to db
        await service.dbUpdate(newPerson);
        setNotification(await success(`${newPerson.name} added!`));
      }
      //update component data
      setPersons(await service.dbGetAll());
    })();
    setNewName("");
    setNewNumber("");
  };

  //filter persons
  const filterStatus = (filter) =>
    filter === ""
      ? persons
      : persons.filter((person) => {
          if (person.name.toLowerCase().includes(newFilter)) {
            return person;
          }
        });
  const personsToShow = filterStatus(newFilter);

  const delPerson = async (id, name) => {
    let confirm = window.confirm(`Delete '${name}' ?`);
    if (confirm) {
      await service.dbDelPerson(id);
      setPersons(await service.dbGetAll());
      setNotification(await success(`${name} deleted!`));
    }
  };

  return (
    <div>
      {showNotification ? (
        <Notification type={notification.type} message={notification.message} />
      ) : (
        <></>
      )}

      <h2>Phonebook</h2>
      <Filter filter={newFilter} filterChange={handleFilterChange} />
      <AddForm
        submit={handleSubmit}
        nameChange={handleNameChange}
        numberChange={handleNumberChange}
        name={newName}
        number={newNumber}
      />
      <h2>Numbers</h2>

      <ShowPersons show={personsToShow} delFunc={delPerson} />
    </div>
  );
};

export default App;
