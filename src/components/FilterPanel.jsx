function FilterPanel({
  category,
  setCategory,
  duration,
  setDuration,
  budget,
  setBudget,
  rating,
  setRating
}) {
  return (
    <div className="filter-panel">
      <div className="filter-item">
        <label htmlFor="category-filter">Category</label>
        <select
          id="category-filter"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Beach">Beach</option>
          <option value="Adventure">Adventure</option>
          <option value="Nature">Nature</option>
          <option value="Heritage">Heritage</option>
          <option value="Culture">Culture</option>
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="duration-filter">Duration</label>
        <select
          id="duration-filter"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        >
          <option value="All">Any Duration</option>
          <option value="2">Up to 2 days</option>
          <option value="3">Up to 3 days</option>
          <option value="4">Up to 4 days</option>
          <option value="5">Up to 5 days</option>
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="budget-filter">Budget</label>
        <select
          id="budget-filter"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        >
          <option value="All">Any Budget</option>
          <option value="8000">Under ₹8,000</option>
          <option value="10000">Under ₹10,000</option>
          <option value="12000">Under ₹12,000</option>
          <option value="15000">Under ₹15,000</option>
          <option value="20000">Under ₹20,000</option>
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="rating-filter">Rating</label>
        <select
          id="rating-filter"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="All">Any Rating</option>
          <option value="4.5">4.5+ ⭐</option>
          <option value="4.7">4.7+ ⭐</option>
          <option value="4.8">4.8+ ⭐</option>
        </select>
      </div>
    </div>
  );
}

export default FilterPanel;
