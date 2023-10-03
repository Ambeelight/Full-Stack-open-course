export const Countries = ({ countries, handleCountryShow }) => {
    return (
        <div>
            <ul>
                {countries.map((country, index) => (
                    <li key={index}>
                        {country.name.common}
                        <button onClick={() => handleCountryShow(country)}>
                            show
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
