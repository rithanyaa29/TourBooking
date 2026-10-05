import { useEffect, useMemo, useState } from "react";
import { fetchPackages } from "../api/api";

function usePackages() {
  const [packages, setPackages] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [duration, setDuration] = useState("All");
  const [budget, setBudget] = useState("All");
  const [rating, setRating] = useState("All");

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch packages from REST API
  useEffect(() => {
    const loadPackages = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchPackages();

        setPackages(data);
      } catch (err) {
        console.error("Error fetching packages:", err);

        setError(
          "Unable to load travel packages. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadPackages();
  }, []);

  // Filter packages
  const filteredPackages = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return packages.filter((pkg) => {
      const searchableText = [
        pkg.destination,
        pkg.location,
        pkg.title,
        pkg.category,
        ...(pkg.searchTags || [])
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !searchValue ||
        searchableText.includes(searchValue);

      const matchesCategory =
        category === "All" ||
        pkg.category === category;

      const matchesDuration =
        duration === "All" ||
        Number(pkg.duration || 0) <= Number(duration);

      const matchesBudget =
        budget === "All" ||
        Number(pkg.price || 0) <= Number(budget);

      const matchesRating =
        rating === "All" ||
        Number(pkg.rating || 0) >= Number(rating);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDuration &&
        matchesBudget &&
        matchesRating
      );
    });
  }, [
    packages,
    search,
    category,
    duration,
    budget,
    rating
  ]);

  return {
    packages,
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
  };
}

export default usePackages;