export const Search = ({ searchCountry, handleSearchChange }) => {
    return (
        <div>
            <form>
                Find countries{" "}
                <input
                    type="text"
                    value={searchCountry}
                    onChange={handleSearchChange}
                    placeholder="Type to search"
                />
            </form>
        </div>
    );
};
