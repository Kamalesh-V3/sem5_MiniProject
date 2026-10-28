import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/client";
import ArtCard from "../components/ArtCard";

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialSort = searchParams.get("sort") || "likes";

  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState(initialSort);

  const categories = [
    "All",
    "Oil Painting",
    "Acrylic Painting",
    "Watercolor",
    "Digital Art",
    "Charcoal Sketch",
    "Sculpture",
    "Pencil Drawing",
  ];

  const fetchArts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory && selectedCategory !== "All") {
        params.append("category", selectedCategory);
      }
      if (searchQuery.trim()) {
        params.append("search", searchQuery.trim());
      }
      if (sortBy) {
        params.append("sort", sortBy);
      }

      const res = await api.get(`/arts?${params.toString()}`);
      if (res.data.success) {
        setArts(res.data.arts);
      }
    } catch (err) {
      console.error("Failed to fetch gallery arts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArts();
  }, [selectedCategory, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchArts();
  };

  const handleLikeUpdated = (artId, liked, newCount) => {
    setArts((prev) =>
      prev.map((art) =>
        art._id === artId ? { ...art, likesCount: newCount } : art,
      ),
    );
  };

  return (
    <div className="gallery-page py-5">
      <div className="container">
        {/* Gallery Title Header */}
        <div className="text-center max-w-700 mx-auto mb-5">
          <span className="badge-category mb-2">Curated Marketplace</span>
          <h1 className="display-5 fw-bold text-white font-serif mb-2">
            Explore{" "}
            <span className="gradient-text-gold">Original Masterpieces</span>
          </h1>
          <p className="text-secondary small">
            Browse authentic paintings, fine digital canvases, and sketches by
            certified independent artists.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="glass-panel p-4 mb-4">
          <form
            onSubmit={handleSearchSubmit}
            className="row g-3 align-items-center"
          >
            {/* Search Input */}
            <div className="col-lg-6 col-md-12">
              <div className="input-group">
                <span className="input-group-text bg-transparent border-secondary text-secondary">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control form-control-custom"
                  placeholder="Search by title, artist name, medium..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="btn btn-gold px-4">
                  Search
                </button>
              </div>
            </div>

            {/* Sort Selector */}
            <div className="col-lg-6 col-md-12 d-flex justify-content-lg-end align-items-center gap-2">
              <label className="text-secondary small text-nowrap mb-0">
                Sort By:
              </label>
              <select
                className="form-select form-select-custom"
                style={{ maxWidth: "220px" }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="likes">Most Liked</option>
                <option value="newest">Newest Additions</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </form>

          {/* Category Filter Chips */}
          <div className="d-flex flex-wrap gap-2 mt-4 pt-3 border-top border-secondary border-opacity-25">
            {categories.map((cat, idx) => (
              <button
                key={cat}
                type="button"
                // Use idx % 2 to alternate classes
                className={`btn btn-sm ${
                  idx % 2 === 0 ? "btn-gold" : "btn-glass text-secondary"
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Results Grid */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status"></div>
            <p className="text-secondary mt-2 small">
              Loading curated artworks...
            </p>
          </div>
        ) : arts.length === 0 ? (
          <div className="glass-panel p-5 text-center my-4">
            <i className="bi bi-palette fs-1 text-secondary mb-3 d-block"></i>
            <h4 className="text-white fw-bold">No Artworks Found</h4>
            <p className="text-secondary small mb-3">
              We couldn't find any artwork matching your current filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
                setSortBy("likes");
              }}
              className="btn btn-outline-gold btn-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {arts.map((art) => (
              <div key={art._id} className="col-lg-4 col-md-6">
                <ArtCard art={art} onLikeChanged={handleLikeUpdated} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
