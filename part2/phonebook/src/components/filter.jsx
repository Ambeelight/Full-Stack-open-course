export const Filter = ({ searchPerson, handleSearchChange }) => {
    return (
        <div>
            filter shown with:
            <input
                type="text"
                value={searchPerson}
                onChange={handleSearchChange}
                placeholder="Type to search"
            />
        </div>
    );
};
