import { useState, useEffect } from "react";
import { Persons } from "./components/person";
import { PersonForm } from "./components/personForm";
import { Filter } from "./components/filter";
import { Notification } from "./components/notification";
import personServices from "./services/persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [searchPerson, setSearchPerson] = useState("");
    const [filteredPersons, setFilteredPersons] = useState(persons);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        personServices.getAll().then((response) => {
            console.log("promise fulfilled");
            setPersons(response);
        });
    }, []);

    const showMessage = (message) => {
        setMessage(message);
        setTimeout(() => {
            setMessage(null);
        }, 3000);
    };

    const addPerson = (event) => {
        event.preventDefault();
        const personExists = persons.find((person) => person.name === newName);

        if (personExists) {
            if (
                window.confirm(
                    `${newName} is already added to the phonebook. Replace the old number with a new one?`
                )
            ) {
                const updatedPerson = { ...personExists, number: newNumber };

                personServices
                    .update(personExists.id, updatedPerson)
                    .then((response) => {
                        setPersons(
                            persons.map((person) =>
                                person.id === response.id ? response : person
                            )
                        );
                        setFilteredPersons(
                            filteredPersons.map((person) =>
                                person.id === response.id ? response : person
                            )
                        );

                        showMessage(
                            `${personExists.name} has changed number on ${newNumber}!`
                        );
                    })
                    .catch((error) => {
                        showMessage(
                            `Information of ${personExists.name} has already been removed from the server`
                        );
                        setPersons(
                            persons.filter((p) => p.id !== personExists.id)
                        );
                        setFilteredPersons(
                            filteredPersons.filter(
                                (p) => p.id !== personExists.id
                            )
                        );
                    });
            }
        } else {
            const nameObj = {
                id: persons.length + 1,
                name: newName,
                number: newNumber,
            };

            showMessage(`Added ${newName} to the phonebook!`);

            personServices.create(nameObj).then((response) => {
                setPersons(persons.concat(response));
                setFilteredPersons(persons.concat(response));
            });
        }

        setNewName("");
        setNewNumber("");
    };

    const handleNameChange = (event) => setNewName(event.target.value);
    const handleNumberChange = (event) => setNewNumber(event.target.value);

    const handleSearchChange = (event) => {
        const searchItem = event.target.value.toLowerCase();
        setSearchPerson(searchItem);

        const filteredList = persons.filter((person) =>
            person.name.toLowerCase().includes(searchItem)
        );

        setFilteredPersons(filteredList);
    };

    const handleDelete = (person) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            personServices.remove(person.id).then(() => {
                setPersons(persons.filter((p) => p.id !== person.id));
                setFilteredPersons(
                    filteredPersons.filter((p) => p.id !== person.id)
                );
            });
        }
    };

    return (
        <div>
            <h2>Phonebook</h2>

            <Notification message={message} />

            <Filter
                searchPerson={searchPerson}
                handleSearchChange={handleSearchChange}
            />

            <h2>add a new</h2>

            <PersonForm
                addPerson={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />

            <h2>Numbers</h2>

            <Persons persons={filteredPersons} deletePerson={handleDelete} />
        </div>
    );
};

export default App;
