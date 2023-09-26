import { useState } from "react";
import { Persons } from "./components/person";
import { PersonForm } from "./components/personForm";
import { Filter } from "./components/filter";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 1 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", number: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    ]);

    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [searchPerson, setSearchPerson] = useState("");
    const [filteredPersons, setFilteredPersons] = useState(persons);

    const addName = (event) => {
        event.preventDefault();
        const nameExists = persons
            .map((person) => person.name)
            .includes(newName);

        if (nameExists) {
            alert(`${newName} is already added to the phonebook`);
        } else {
            const nameObj = {
                id: persons.length + 1,
                name: newName,
                number: newNumber,
            };

            setPersons(persons.concat(nameObj));
            setFilteredPersons(persons.concat(nameObj));
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

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter
                searchPerson={searchPerson}
                handleSearchChange={handleSearchChange}
            />

            <h2>add a new</h2>

            <PersonForm
                addName={addName}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />

            <h2>Numbers</h2>

            <Persons persons={filteredPersons} />
        </div>
    );
};

export default App;
