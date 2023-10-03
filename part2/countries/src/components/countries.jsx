import { CountryInfo } from "./countryInfo";

const Countries = ({ countries, handleCountryShow, selectedCountry }) => {
    return (
        <div>
            <ul>
                {countries.map((country, index) => (
                    <li key={index}>
                        {country.name.common}
                        <button onClick={() => handleCountryShow(country)}>
                            show
                        </button>
                        {selectedCountry &&
                            selectedCountry.name.common ===
                                country.name.common && (
                                <CountryInfo countryInfo={selectedCountry} />
                            )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Countries;
