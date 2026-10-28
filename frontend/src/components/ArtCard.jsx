import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LikeButton from './LikeButton';
import { useAuth } from '../context/AuthContext';
import { localMediaUrl, onLocalImageError } from '../utils/localImage';

export default function ArtCard({ art, onLikeChanged }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isLikedByMe = Array.isArray(art.likes) && user
    ? art.likes.map(String).includes(String(user._id))
    : false;

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  return (
    <div className="glass-card-interactive h-100 d-flex flex-column">
      {/* Image Banner */}
      <div className="art-card-img-wrapper">
        <img
          src={localMediaUrl(art.imageUrl, 'art')}
          alt={art.title}
          className="art-card-img"
          loading="lazy"
          onError={(e) => onLocalImageError(e, 'art')}
        />
        <div className="art-card-overlay"></div>

        {/* Top Badges */}
        <div className="position-absolute top-0 start-0 p-3">
          <span className="badge-category">{art.category}</span>
        </div>

        <div className="position-absolute top-0 end-0 p-3 d-flex align-items-center gap-2">
          <LikeButton
            artId={art._id}
            initialLikesCount={art.likesCount || 0}
            initialLiked={isLikedByMe}
            onLikeChanged={(liked, count) => {
              if (onLikeChanged) onLikeChanged(art._id, liked, count);
            }}
          />
        </div>

        {/* Likes Count on Image */}
        <div className="position-absolute bottom-0 start-0 p-3 text-white small d-flex align-items-center gap-1 fw-bold">
          <i className="bi bi-heart-fill text-danger"></i>
          <span>{art.likesCount || 0} likes</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-3 d-flex flex-column flex-grow-1">
        <h5 className="text-white fw-bold text-truncate mb-1" title={art.title}>
          <Link to={`/art/${art._id}`} className="hover-gold text-decoration-none">
            {art.title}
          </Link>
        </h5>

        {/* Artist Credit */}
        <div className="d-flex align-items-center gap-2 mb-3">
          {art.artistAvatar && (
            <img
              src={localMediaUrl(art.artistAvatar, 'profile')}
              alt={art.artistName || 'Artist'}
              className="rounded-circle"
              style={{ width: '22px', height: '22px', objectFit: 'cover' }}
              onError={(e) => onLocalImageError(e, 'profile')}
            />
          )}
          <Link
            to={`/artist/${art.artistUsername || art.artist}`}
            className="text-secondary small hover-gold text-decoration-none"
          >
            By <span className="text-light fw-medium">@{art.artistUsername || art.artistName || 'Artist'}</span>
          </Link>
        </div>

        <p className="text-secondary small text-truncate-2 mb-3 flex-grow-1" style={{ fontSize: '0.85rem' }}>
          {art.description}
        </p>

        {/* Price & Buy Button Footer */}
        <div className="pt-2 border-top border-secondary border-opacity-25 d-flex align-items-center justify-content-between mt-auto">
          <div>
            <div className="text-secondary" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Price</div>
            <div className="fs-5 fw-bold text-warning">{formatPrice(art.price)}</div>
          </div>
          <div className="d-flex gap-2">
            <Link
              to={`/art/${art._id}`}
              className="btn btn-glass btn-sm px-2"
              title="View Artwork Details"
            >
              <i className="bi bi-eye"></i>
            </Link>
            <Link
              to={`/order/${art._id}`}
              className="btn btn-gold btn-sm px-3 d-flex align-items-center gap-1"
            >
              <i className="bi bi-bag-plus"></i> Buy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
