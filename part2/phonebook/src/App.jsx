import { useState } from "react";

const Person = ({ person }) => {
    return <li>{person.name}</li>;
};

const App = () => {
    const [persons, setPersons] = useState([
        { id: 1, name: "Arto Hellas", number: "040-1234567" },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    const addName = (event) => {
        event.preventDefault();
        const nameExists = persons
            .map((person) => person.name)
            .includes(newName);
        if (nameExists) {
            alert(`${newName} is already added to the phonebook`);
            setNewName("");
            setNewNumber("");
        } else {
            const nameObj = {
                id: persons.length + 1,
                name: newName,
                number: newNumber,
            };
            setPersons(persons.concat(nameObj));
            setNewName("");
            setNewNumber("");
        }
    };

    const handleNameChange = (event) => {
        console.log(event.target.value);
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number:
                    <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map((person) => (
                    <Person key={person.id} person={person} />
                ))}
            </ul>
        </div>
    );
};

export default App;
