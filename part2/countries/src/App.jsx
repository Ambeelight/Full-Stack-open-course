import { useState, useEffect } from "react";
import { Search } from "./components/search";
import { Countries } from "./components/countries";
import countryServices from "./services/countries";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [searchCountry, setSearchCountry] = useState("");
    const [filteredCountries, setFilteredCountries] = useState([]);

    useEffect(() => {
        countryServices
            .getAll()
            .then((res) => {
                console.log("countries", res);
                setCountries(res);
            })
            .catch((error) => {
                console.error("Error fetching data from the server:", error);
            });
    }, []);

    const handleSearchChange = (event) => {
        event.preventDefault();

        const searchItem = event.target.value.toLowerCase();
        setSearchCountry(searchItem);

        const filteredList = countries.filter(({ name }) =>
            name.common.toLowerCase().includes(searchItem)
        );
        setFilteredCountries(filteredList);
    };

    return (
        <div>
            <Search
                searchCountry={searchCountry}
                handleSearchChange={handleSearchChange}
            />

            <Countries countries={filteredCountries} />
        </div>
    );
};

export default App;
