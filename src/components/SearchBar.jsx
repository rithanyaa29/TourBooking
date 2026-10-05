import { useEffect, useRef } from "react";

function SearchBar({ search, setSearch }) {
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  return (
    <div className="search-box">
      <span className="search-icon">⌕</span>
      <input
        ref={searchRef}
        type="text"
        placeholder="Search destination or tourist spot..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search && (
        <button
          type="button"
          className="clear-search"
          onClick={() => setSearch("")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default SearchBar;
