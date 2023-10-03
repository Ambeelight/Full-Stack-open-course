import { useState, useEffect } from "react";
import { Search } from "./components/search";
import { Countries } from "./components/countries";
import { CountryInfo } from "./components/countryInfo";
import countryServices from "./services/countries";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [searchCountry, setSearchCountry] = useState("");
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [countryInfo, setCountryInfo] = useState(null);

    useEffect(() => {
        countryServices
            .getAll()
            .then((res) => setCountries(res))
            .catch((error) =>
                console.error("Error fetching data from the server:", error)
            );
    }, []);

    const handleSearchChange = (event) => {
        event.preventDefault();

        const searchItem = event.target.value.toLowerCase();
        setSearchCountry(searchItem);

        const filteredList = countries.filter(({ name }) =>
            name.common.toLowerCase().includes(searchItem)
        );

        if (filteredList.length > 10) {
            setCountryInfo("Too many matches, specify another filter");
            setFilteredCountries([]);
        } else if (filteredList.length === 1) {
            setCountryInfo(filteredList[0]);
            console.log("country data", filteredList[0]);
            setFilteredCountries([]);
        } else {
            setCountryInfo(null);
            setFilteredCountries(filteredList);
        }
    };

    const handleCountryShow = (country) => setSelectedCountry(country);

    return (
        <div>
            <Search
                searchCountry={searchCountry}
                handleSearchChange={handleSearchChange}
            />
            {countryInfo === null ? (
                <Countries
                    countries={filteredCountries}
                    handleCountryShow={handleCountryShow}
                />
            ) : (
                <CountryInfo countryInfo={countryInfo} />
            )}
        </div>
    );
};

export default App;
