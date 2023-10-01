export const Countries = ({ countries }) => {
    return (
        <ul>
            {countries.map((country) => (
                <li key={country.tld}>{country.name.common}</li>
            ))}
        </ul>
    );
};
