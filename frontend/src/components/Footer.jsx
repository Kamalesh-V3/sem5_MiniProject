import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="mt-auto border-top py-5"
      style={{
        backgroundColor: "#080a12",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="fs-3">🎨</span>
              <span className="fw-bold fs-4 gradient-text-gold font-serif">
                CanvasCraft
              </span>
            </div>
            <p className="text-secondary small pe-lg-4">
              A curated digital haven bridging extraordinary visual artists with
              passionate collectors worldwide. Empowering creators through
              zero-commission direct UPI transfers, transparent admin
              verification, and immersive storytelling.
            </p>
            <div className="d-flex gap-3 text-secondary">
              <a href="#" className="text-secondary hover-gold">
                <i className="bi bi-instagram fs-5"></i>
              </a>
              <a href="#" className="text-secondary hover-gold">
                <i className="bi bi-twitter-x fs-5"></i>
              </a>
              <a href="#" className="text-secondary hover-gold">
                <i className="bi bi-linkedin fs-5"></i>
              </a>
              <a href="#" className="text-secondary hover-gold">
                <i className="bi bi-github fs-5"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="text-white fw-bold mb-3">Explore</h6>
            <ul className="list-unstyled text-secondary small d-flex flex-column gap-2">
              <li>
                <Link to="/gallery" className="text-secondary hover-white">
                  All Artworks
                </Link>
              </li>
              <li>
                <Link to="/#top-arts" className="text-secondary hover-white">
                  Most Popular Arts
                </Link>
              </li>
              <li>
                <Link to="/#top-artists" className="text-secondary hover-white">
                  Top Artists
                </Link>
              </li>
              <li>
                <Link to="/post-art" className="text-secondary hover-white">
                  Sell Your Art
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="text-white fw-bold mb-3">Categories</h6>
            <ul className="list-unstyled text-secondary small d-flex flex-column gap-2">
              <li>
                <Link
                  to="/gallery?category=Oil Painting"
                  className="text-secondary hover-white"
                >
                  Oil Paintings
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery?category=Digital Art"
                  className="text-secondary hover-white"
                >
                  Digital Creations
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery?category=Watercolor"
                  className="text-secondary hover-white"
                >
                  Watercolors
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery?category=Acrylic Painting"
                  className="text-secondary hover-white"
                >
                  Acrylic Works
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-12">
            <h6 className="text-white fw-bold mb-3">Founders' Vision</h6>
            <div
              className="p-3 rounded-3"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p className="text-secondary small mb-2 fst-italic">
                "We conceived CanvasCraft so no talented painter or digital
                creator in our community remains undiscovered. We built this
                platform for artists, by artists."
              </p>
              <div className="small text-warning fw-semibold">
                — Kamalesh & Sivakumar{" "}
                <span className="text-muted fw-normal">(Founders)</span>
              </div>
            </div>
          </div>
        </div>

        <hr style={{ borderColor: "rgba(255,255,255,0.08)" }} />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 text-secondary small pt-2">
          <div>
            &copy; {new Date().getFullYear()} CanvasCraft Art Gallery. All
            rights reserved.
          </div>
          <div className="d-flex align-items-center gap-3">
            <span>Built with MERN Stack & Bootstrap</span>
            <span>•</span>
            <span className="text-warning">Direct UPI Creator Payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
