import "../App.css";
import searchIcon from "../assets/search.png";
const Search = ({ searchState: { searchTerm, setSearchTerm } }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Weather"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        id=""
      />
      <img src={searchIcon} alt="" />
    </div>
  );
};

export default Search;
