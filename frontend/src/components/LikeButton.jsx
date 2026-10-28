import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';

export default function LikeButton({ artId, initialLikesCount = 0, initialLiked = false, onLikeChanged }) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [liked, setLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(false);

  const handleToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      if (window.confirm('Please sign in to like this artwork and save to your favorites. Would you like to log in now?')) {
        navigate('/login');
      }
      return;
    }

    if (loading) return;
    setLoading(true);

    // Optimistic UI update
    const nextLiked = !liked;
    const nextCount = nextLiked ? likesCount + 1 : Math.max(0, likesCount - 1);
    setLiked(nextLiked);
    setLikesCount(nextCount);

    try {
      const res = await api.post(`/arts/${artId}/like`);
      if (res.data.success) {
        setLiked(res.data.liked);
        setLikesCount(res.data.likesCount);
        if (onLikeChanged) {
          onLikeChanged(res.data.liked, res.data.likesCount);
        }
      }
    } catch (err) {
      // Revert if API fails
      setLiked(liked);
      setLikesCount(likesCount);
      console.error('Like toggle failed:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`btn-like ${liked ? 'liked' : ''}`}
      title={liked ? 'Unlike this art' : 'Like this art'}
      type="button"
      disabled={loading}
    >
      <i className={`bi ${liked ? 'bi-heart-fill' : 'bi-heart'}`}></i>
    </button>
  );
}
