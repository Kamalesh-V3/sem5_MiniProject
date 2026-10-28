import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import ArtCard from '../components/ArtCard';
import { localMediaUrl, onLocalImageError } from '../utils/localImage';

export default function ArtistProfile() {
  const { identifier } = useParams();
  const { user, loading: authLoading, isAuthenticated, isArtist, isAdmin } = useAuth();
  const [artist, setArtist] = useState(null);
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isOwnStudio = Boolean(
    user &&
    artist &&
    (String(user._id) === String(artist._id) ||
      (user.username && artist.username && user.username.toLowerCase() === artist.username.toLowerCase()))
  );

  useEffect(() => {
    const fetchArtist = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get(`/arts/artist/${encodeURIComponent(identifier)}`);
        if (res.data.success) {
          setArtist(res.data.artist);
          setArts(res.data.arts || []);
        }
      } catch (err) {
        setError(err.message || 'Artist not found.');
      } finally {
        setLoading(false);
      }
    };

    if (identifier) fetchArtist();
  }, [identifier]);

  if (authLoading || loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-warning" role="status" />
      </div>
    );
  }

  if (isOwnStudio && (isArtist || isAdmin)) {
    return <Navigate to="/artist/dashboard" replace />;
  }

  if (error || !artist) {
    return (
      <div className="container py-5 text-center">
        <div className="glass-panel p-5">
          <h4 className="text-white fw-bold mb-2">Artist Not Found</h4>
          <p className="text-secondary small mb-3">{error || 'This artist profile is unavailable.'}</p>
          <Link to="/gallery" className="btn btn-gold btn-sm">Back to Gallery</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="artist-public-page py-5">
      <div className="container">
        <div className="glass-panel p-4 mb-4">
          <div className="row align-items-center g-3">
            <div className="col-md-8 d-flex align-items-center gap-3">
              <img
                src={localMediaUrl(artist.avatar, 'profile')}
                alt={artist.username}
                className="rounded-circle"
                style={{ width: '84px', height: '84px', objectFit: 'cover', border: '2px solid rgba(245, 158, 11, 0.45)' }}
                onError={(e) => onLocalImageError(e, 'profile')}
              />
              <div>
                <h3 className="text-white fw-bold mb-1">@{artist.username}</h3>
                <div className="badge-artist-verified mb-2">
                  <i className="bi bi-patch-check-fill text-info"></i> Verified Artist
                </div>
                <p className="text-secondary small mb-0">{artist.bio || 'Independent visual artist on CanvasCraft.'}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="row g-2 text-center">
                <div className="col-6">
                  <div className="glass-panel p-3">
                    <div className="fs-4 fw-bold text-white">{artist.totalArtworks || arts.length}</div>
                    <div className="text-secondary small">Artworks</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="glass-panel p-3">
                    <div className="fs-4 fw-bold text-warning">{artist.totalLikes || 0}</div>
                    <div className="text-secondary small">Likes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h4 className="text-white fw-bold mb-3">Artworks by @{artist.username}</h4>
        {arts.length === 0 ? (
          <div className="glass-panel p-5 text-center">
            <p className="text-secondary mb-0">No public artworks available yet.</p>
          </div>
        ) : (
          <div className="row g-4">
            {arts.map((art) => (
              <div key={art._id} className="col-lg-4 col-md-6">
                <ArtCard art={art} />
              </div>
            ))}
          </div>
        )}

        {isAuthenticated && isOwnStudio && (
          <div className="text-center mt-4">
            <Link to="/artist/dashboard" className="btn btn-gold">
              Open Artist Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
