import React from 'react';

const CreativeNyxlyNIcon = ({ width = 24, height = 24, color = '#ccc' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 2h4c1 0 2 1 2 2v8c0 1-1 2-2 2H4c-1 0-2-1-2-2V4c0-1 1-2 2-2zm2 2v8h2V4H6zM14 2h4c1 0 2 1 2 2v8c0 1-1 2-2 2h-4c-1 0-2-1-2-2V4c0-1 1-2 2-2zm2 2v8h2V4h-2z"
      fill={color}
      stroke={color}
      strokeWidth="0.5"
    />
    <path
      d="M8 8c-2-1-4-3-4-5 0-1 1-2 2-2s2 1 2 2c0 1-1 2-2 3zM16 8c2-1 4-3 4-5 0-1-1-2-2-2s-2 1-2 2c0 1 1 2 2 3z"
      fill={color}
      opacity="0.6"
    />
    <circle cx="3" cy="3" r="1.5" fill={color} opacity="0.8" />
    <circle cx="21" cy="5" r="1.5" fill={color} opacity="0.8" />
    <circle cx="2" cy="21" r="1.5" fill={color} opacity="0.8" />
    <circle cx="22" cy="19" r="1.5" fill={color} opacity="0.8" />
    {/* Subtle crescent moon silhouette */}
    <path
      d="M12 4c-2.21 0-4 1.79-4 4s1.79 4 4 4c2.21 0 4-1.79 4-4s-1.79-4-4-4z"
      fill="none"
      stroke={color}
      strokeWidth="1"
      opacity="0.5"
    />
  </svg>
);

export default CreativeNyxlyNIcon;