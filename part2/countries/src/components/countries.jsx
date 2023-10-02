export const Countries = ({ countries }) => {
    return (
        <div>
            <ul>
                {countries.map((country, index) => (
                    <li key={index}>{country.name.common}</li>
                ))}
            </ul>
        </div>
    );
};
