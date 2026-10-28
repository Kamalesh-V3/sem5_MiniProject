import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import ArtCard from "../components/ArtCard";
import { localMediaUrl, onLocalImageError } from "../utils/localImage";

const DEFAULT_FOUNDERS = [
  {
    title: "Founder 1",
    name: "Kamalesh V",
    role: "3rd year, Computer Science Engineering",
    bio: "Mepco Schlenk Engineering College, Tamil Nadu, India.",
    image: "/images/Profile image/founder-kamalesh.svg",
    quote: "Building a space where artists can share their work and reach new audiences.",
  },
  {
    title: "Founder 2",
    name: "SivaKumar S",
    role: "3rd year, Computer Science Engineering",
    bio: "Mepco Schlenk Engineering College, Tamil Nadu, India.",
    image: "/images/Profile image/founder-sivakumar.svg",
    quote: "Connecting creators and collectors through a welcoming art marketplace.",
  },
];

export default function Home() {
  const [topArts, setTopArts] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artsRes, artistsRes, foundersRes] = await Promise.all([
          api.get("/arts/top-arts?limit=6"),
          api.get("/arts/top-artists?limit=4"),
          api.get("/founders"),
        ]);

        if (artsRes.data.success) setTopArts(artsRes.data.arts);
        if (artistsRes.data.success) setTopArtists(artistsRes.data.artists);
        if (foundersRes.data.success && foundersRes.data.founders?.length) {
          setFounders(foundersRes.data.founders);
        } else {
          setFounders(DEFAULT_FOUNDERS);
        }
      } catch (err) {
        console.error("Home data fetch error:", err);
        setFounders(DEFAULT_FOUNDERS);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLikeUpdated = (artId, liked, newCount) => {
    setTopArts((prev) =>
      prev.map((art) =>
        art._id === artId ? { ...art, likesCount: newCount } : art,
      ),
    );
  };

  return (
    <div className="home-page pb-5">
      {/* Hero Section */}
      <section className="position-relative py-5 overflow-hidden">
        <div className="container py-lg-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-7 text-center text-lg-start">
              <div
                className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-4"
                style={{
                  background: "rgba(245, 158, 11, 0.12)",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                }}
              >
                <span className="text-warning">✨</span>
                <span className="small fw-semibold text-warning">
                  Curated Originals & Direct UPI Creator Support
                </span>
              </div>

              <h1 className="display-4 fw-extrabold text-white mb-3 font-serif lh-sm">
                Where Every Brushstroke Sparks{" "}
                <span className="gradient-text-gold">Pure Wonder.</span>
              </h1>

              <p className="lead text-secondary mb-4 pe-lg-4">
                Discover exceptional Indian and international original
                paintings, digital masterpieces, and charcoal sketches. Support
                creators with 100% direct artist payouts and transparent
                verification.
              </p>

              <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start gap-3 mb-5">
                <Link
                  to="/gallery"
                  className="btn btn-gold btn-lg px-4 d-flex align-items-center gap-2"
                >
                  <i className="bi bi-compass"></i> Explore Gallery
                </Link>
                <Link
                  to="/post-art"
                  className="btn btn-outline-gold btn-lg px-4 d-flex align-items-center gap-2"
                >
                  <i className="bi bi-brush"></i> Sell Your Art
                </Link>
                <a
                  href="#founders-corner"
                  className="btn btn-glass btn-lg px-3"
                >
                  About Founders
                </a>
              </div>

              {/* Quick Stat Badges */}
              <div className="row g-3 pt-3 border-top border-secondary border-opacity-25">
                <div className="col-4">
                  <div className="fw-bold fs-4 text-white">500+</div>
                  <div className="small text-secondary">Curated Works</div>
                </div>
                <div className="col-4">
                  <div className="fw-bold fs-4 text-warning">100%</div>
                  <div className="small text-secondary">Direct Artist UPI</div>
                </div>
                <div className="col-4">
                  <div className="fw-bold fs-4 text-info">Verified</div>
                  <div className="small text-secondary">Quality Certified</div>
                </div>
              </div>
            </div>

            {/* Hero Visual Collage */}
            <div className="col-lg-5">
              <div
                className="position-relative mx-auto"
                style={{ maxWidth: "420px" }}
              >
                <div className="glass-panel p-2 shadow-lg rounded-4 overflow-hidden transform-rotate-1">
                  <img
                    src="/images/Art image/art-oil-varanasi.svg"
                    alt="Hero Featured Art"
                    className="img-fluid rounded-3 w-100"
                    style={{ height: "360px", objectFit: "cover" }}
                    onError={(e) => onLocalImageError(e, "art")}
                  />
                  <div className="p-3 d-flex align-items-center justify-content-between">
                    <div>
                      <div className="fw-bold text-white small">
                        Varanasi Sunrise Ghats
                      </div>
                      <div
                        className="text-secondary"
                        style={{ fontSize: "0.75rem" }}
                      >
                        Oil on Canvas • Aarav Sharma
                      </div>
                    </div>
                    <span className="badge bg-warning text-dark fw-bold">
                      ₹18,500
                    </span>
                  </div>
                </div>

                <div
                  className="glass-panel p-2 position-absolute shadow-lg rounded-4 d-none d-sm-block"
                  style={{
                    width: "220px",
                    bottom: "-30px",
                    left: "-30px",
                    zIndex: 2,
                  }}
                >
                  <div className="d-flex align-items-center gap-2 p-1">
                    <div className="bg-warning text-dark p-2 rounded-circle">
                      <i className="bi bi-heart-fill"></i>
                    </div>
                    <div>
                      <div className="fw-bold text-white small">
                        Top Liked Art
                      </div>
                      <div
                        className="text-secondary"
                        style={{ fontSize: "0.7rem" }}
                      >
                        195+ Collectors
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Arts by Likes Count Section */}
      <section className="py-5" id="top-arts">
        <div className="container">
          <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between mb-4">
            <div>
              <div className="d-inline-flex align-items-center gap-1 text-warning small fw-bold text-uppercase tracking-wider mb-1">
                <i className="bi bi-fire"></i> Most Popular Creations
              </div>
              <h2 className="display-6 fw-bold text-white font-serif mb-0">
                Top Arts By{" "}
                <span className="gradient-text-gold">Likes Count</span>
              </h2>
            </div>
            <Link
              to="/gallery?sort=likes"
              className="text-warning text-decoration-none fw-semibold mt-3 mt-md-0 d-inline-flex align-items-center gap-1 hover-gold"
            >
              View All Ranked Arts <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-warning" role="status"></div>
            </div>
          ) : (
            <div className="row g-4">
              {topArts.map((art) => (
                <div key={art._id} className="col-lg-4 col-md-6">
                  <ArtCard art={art} onLikeChanged={handleLikeUpdated} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Top Artists by Likes Section */}
      <section
        className="py-5"
        id="top-artists"
        style={{ background: "rgba(255,255,255,0.015)" }}
      >
        <div className="container">
          <div className="text-center max-w-700 mx-auto mb-5">
            <div className="d-inline-flex align-items-center gap-1 text-warning small fw-bold text-uppercase tracking-wider mb-1">
              <i className="bi bi-trophy"></i> Master Creators
            </div>
            <h2 className="display-6 fw-bold text-white font-serif mb-2">
              Top Artists By{" "}
              <span className="gradient-text-rainbow">Total Likes</span>
            </h2>
            <p className="text-secondary small">
              Celebrating our highest-voted visionary painters, concept
              illustrators, and sketch artists.
            </p>
          </div>

          <div className="row g-4">
            {topArtists.map((artist, index) => {
              const rankIcons = ["🥇 #1", "🥈 #2", "🥉 #3", "🎖️ #4"];
              return (
                <div key={artist._id} className="col-lg-3 col-md-6">
                  <div className="glass-card-interactive p-4 text-center h-100 d-flex flex-column align-items-center">
                    {/* Rank Badge */}
                    <div className="align-self-start mb-2">
                      <span className="badge bg-warning text-dark fw-bold px-2 py-1">
                        {rankIcons[index] || `#${index + 1}`}
                      </span>
                    </div>

                    {/* Artist Avatar with Story Ring */}
                    <img
                      src={localMediaUrl(artist.avatar, "profile")}
                      alt={artist.username}
                      className="rounded-circle mb-3"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        border: "3px solid rgba(245, 158, 11, 0.4)",
                      }}
                      onError={(e) => onLocalImageError(e, "profile")}
                    />

                    <h5 className="text-white fw-bold mb-1">
                      @{artist.username}
                    </h5>
                    <div className="badge-artist-verified mb-2">
                      <i className="bi bi-patch-check-fill text-info"></i>{" "}
                      Verified Artist
                    </div>

                    <p
                      className="text-secondary small text-truncate-2 mb-3"
                      style={{ minHeight: "38px", fontSize: "0.8rem" }}
                    >
                      {artist.bio ||
                        "Passionate visual creator sharing evocative stories on CanvasCraft."}
                    </p>

                    {/* Stats Box */}
                    <div
                      className="w-100 p-2 rounded-3 mb-3 d-flex justify-content-around"
                      style={{
                        background: "rgba(0,0,0,0.3)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <div>
                        <div className="fw-bold text-warning small">
                          {artist.totalLikes || 0}
                        </div>
                        <div
                          className="text-secondary"
                          style={{ fontSize: "0.7rem" }}
                        >
                          Total Likes
                        </div>
                      </div>
                      <div className="border-end border-secondary border-opacity-25"></div>
                      <div>
                        <div className="fw-bold text-white small">
                          {artist.totalArtworks || 0}
                        </div>
                        <div
                          className="text-secondary"
                          style={{ fontSize: "0.7rem" }}
                        >
                          Artworks
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/artist/${artist.username}`}
                      className="btn btn-glass btn-sm w-100 mt-auto d-flex align-items-center justify-content-center gap-1"
                    >
                      <i className="bi bi-images text-warning"></i> View artworks
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Corner - Founders Details Section */}
      <section className="py-5" id="founders-corner">
        <div className="container py-4">
          <div className="text-center max-w-700 mx-auto mb-5">
            <div className="d-inline-flex align-items-center gap-1 text-warning small fw-bold text-uppercase tracking-wider mb-1">
              <i className="bi bi-stars"></i> The Minds Behind CanvasCraft
            </div>
            <h2 className="display-6 fw-bold text-white font-serif mb-2">
              About Corner —{" "}
              <span className="gradient-text-gold">Meet The Founders</span>
            </h2>
            <p className="text-secondary small">
              CanvasCraft was established with a singular mission: to eliminate
              traditional gallery gatekeepers and grant independent artists
              direct recognition and 100% UPI buyer payments.
            </p>
          </div>
          <div className="row g-4 justify-content-center">
            {(founders.length ? founders : DEFAULT_FOUNDERS).map((founder, idx) => (
              <div key={idx} className="col-lg-6">
                <div className="glass-panel p-4 p-md-5 h-100 position-relative overflow-hidden">
                  <div className="row align-items-center g-4">
                    <div className="col-sm-5 text-center">
                      <div className="position-relative d-inline-block">
                        <img
                          src={localMediaUrl(founder.image, "profile")}
                          alt={founder.name}
                          className="rounded-circle shadow-lg"
                          style={{
                            width: '160px',
                            height: '160px',
                            objectFit: 'cover',
                            border: '3px solid rgba(245, 158, 11, 0.4)'
                          }}
                          onError={(e) => onLocalImageError(e, "profile")}
                        />
                        <div className="position-absolute bottom-0 end-0 bg-warning text-dark rounded-circle p-2 shadow">
                          <i className="bi bi-award-fill"></i>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-7 text-center text-sm-start">
                      <div className="text-warning fw-bold small text-uppercase mb-1">
                        {founder.title || `Founder ${idx + 1}`}
                      </div>
                      <h4 className="text-white fw-bold mb-1 font-serif">{founder.name}</h4>
                      <div className="text-warning fw-semibold small mb-2">{founder.role}</div>
                      <p className="text-secondary small mb-3">
                        {founder.bio}
                      </p>

                      {founder.quote && (
                        <blockquote className="fst-italic text-light small border-start border-warning border-3 ps-3 mb-3" style={{ background: 'rgba(255,255,255,0.02)' }}>
                          "{founder.quote}"
                        </blockquote>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Platform Mission Guarantee Banner */}
          <div className="mt-5 p-4 rounded-4 glass-panel text-center">
            <div className="row g-3 align-items-center justify-content-center">
              <div className="col-md-3 col-6">
                <i className="bi bi-shield-check fs-2 text-warning mb-1 d-block"></i>
                <div className="fw-bold text-white small">
                  Curator Quality Verified
                </div>
                <div className="text-secondary" style={{ fontSize: "0.75rem" }}>
                  Admin reviewed artworks
                </div>
              </div>
              <div className="col-md-3 col-6">
                <i className="bi bi-qr-code-scan fs-2 text-info mb-1 d-block"></i>
                <div className="fw-bold text-white small">
                  Direct Artist UPI
                </div>
                <div className="text-secondary" style={{ fontSize: "0.75rem" }}>
                  Scan & pay artist directly
                </div>
              </div>
              <div className="col-md-3 col-6">
                <i className="bi bi-truck fs-2 text-success mb-1 d-block"></i>
                <div className="fw-bold text-white small">
                  Safe Doorstep Delivery
                </div>
                <div className="text-secondary" style={{ fontSize: "0.75rem" }}>
                  Packed with wooden crates
                </div>
              </div>
              <div className="col-md-3 col-6">
                <i className="bi bi-person-badge fs-2 text-danger mb-1 d-block"></i>
                <div className="fw-bold text-white small">
                  Creator Royalties
                </div>
                <div className="text-secondary" style={{ fontSize: "0.75rem" }}>
                  Empowering creators
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
