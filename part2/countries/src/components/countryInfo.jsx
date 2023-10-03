export const CountryInfo = ({ countryInfo }) => {
    return (
        <div>
            <h2>{countryInfo.name.common}</h2>
            <div>Capital: {countryInfo.capital}</div>
            <div>Area: {countryInfo.area}</div>
            <h3>Languages:</h3>
            <ul>
                {Object.values(countryInfo.languages).map((language, index) => (
                    <li key={index}>{language}</li>
                ))}
            </ul>
            <img src={countryInfo.flags.png} alt={countryInfo.flags.alt} />
        </div>
    );
};
