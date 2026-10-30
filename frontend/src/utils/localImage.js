const FALLBACKS = {
  art: '/images/Art image/artwork-placeholder.svg',
  profile: '/images/Profile image/profile-placeholder.svg',
  qr: '/images/QR image/qr-placeholder.svg'
};

export function localMediaUrl(url, type = 'art') {
  const fallback = FALLBACKS[type] || FALLBACKS.art;
  if (!url) return fallback;
  if (typeof url !== 'string') return fallback;
  if (url.startsWith('blob:') || url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  if (backendUrl && url.startsWith('/uploads/')) {
    return `${backendUrl.replace(/\/+$/, '')}${url}`;
  }
  return url;
}

export function onLocalImageError(event, type = 'art') {
  event.target.src = FALLBACKS[type] || FALLBACKS.art;
}
