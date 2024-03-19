import React, { useContext } from "react";
import { searchContext } from "../../contexts";

const SearchInput: React.FC = () => {
  const { searchTerm, setSearchTerm } = useContext(searchContext);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="input-group mb-3 w-50 mx-auto">
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="basic-addon2"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="input-group-append"></div>
    </div>
  );
};

export default SearchInput;
