import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import PackageList from "./PackageList";
import Loading from "./Loading";
import usePackages from "../hooks/usePackages";
import { useAuth } from "../context/AuthContext";

function Packages() {
  const {
    search,
    setSearch,
    category,
    setCategory,
    duration,
    setDuration,
    budget,
    setBudget,
    rating,
    setRating,
    filteredPackages,
    loading,
    error
  } = usePackages();

  const { isLoggedIn, currentUser } = useAuth();

  // Show loading state while fetching packages
  if (loading) {
    return <Loading />;
  }

  // Show error state if API request fails
  if (error) {
    return (
      <main className="error-page">
        <h2>Unable to Load Packages</h2>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="packages-page">
      <section className="packages-header">
        <p>DISCOVER YOUR NEXT TRIP</p>
        <h1>Explore Our Packages</h1>
        <span>
          Search by destination, tourist spot or package name.
        </span>
      </section>

      {!isLoggedIn && (
        <div className="browse-banner">
          <div>
            <strong>Browse freely, book when you're ready.</strong>
            <span>
              You can explore every package without an account. Login or sign
              up when you want to book.
            </span>
          </div>
        </div>
      )}

      {isLoggedIn && (
        <div className="browse-banner logged-in-banner">
          <div>
            <strong>Welcome back, {currentUser.username}! ✨</strong>
            <span>
              Find your next destination and start planning your trip.
            </span>
          </div>
        </div>
      )}

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <p className="search-hint">
        Try <strong>Kerala</strong>, <strong>Munnar</strong>,
        <strong>Alleppey</strong>, <strong>Goa</strong> or
        <strong> Jaipur</strong>.
      </p>

      <FilterPanel
        category={category}
        setCategory={setCategory}
        duration={duration}
        setDuration={setDuration}
        budget={budget}
        setBudget={setBudget}
        rating={rating}
        setRating={setRating}
      />

      <div className="package-results-info">
        <span>
          {filteredPackages.length} package
          {filteredPackages.length === 1 ? "" : "s"} found
        </span>

        {search && <strong> for “{search}”</strong>}
      </div>

      <PackageList packages={filteredPackages} />
    </main>
  );
}

export default Packages;