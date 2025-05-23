import React from "react";

const HoloRobot = ({ style, className }) => (
  <svg
    width="180"
    height="220"
    viewBox="0 0 180 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    className={className}
  >
    {/* Corpo oval */}
    <g id="body">
      <ellipse cx="90" cy="140" rx="55" ry="60" fill="url(#bodyGradient)" />
      <ellipse cx="90" cy="140" rx="55" ry="60" fill="url(#bodyShine)" opacity="0.3" />
    </g>
    {/* Cabeça arredondada */}
    <g id="head">
      <ellipse cx="90" cy="65" rx="48" ry="38" fill="url(#headGradient)" />
      {/* Visor */}
      <rect x="54" y="55" width="72" height="22" rx="11" fill="#181C2A" />
      {/* Olhos */}
      <ellipse cx="74" cy="66" rx="7" ry="7" fill="#6EFF7B" />
      <ellipse cx="106" cy="66" rx="7" ry="7" fill="#6EFF7B" />
    </g>
    {/* Braço esquerdo */}
    <g id="left-arm">
      <ellipse cx="32" cy="120" rx="14" ry="32" fill="url(#armGradient)" />
    </g>
    {/* Braço direito */}
    <g id="right-arm">
      <ellipse cx="148" cy="120" rx="14" ry="32" fill="url(#armGradient)" />
    </g>
    {/* Gradientes */}
    <defs>
      <linearGradient id="bodyGradient" x1="35" y1="80" x2="145" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F8FBFF" />
        <stop offset="1" stopColor="#B6D0E2" />
      </linearGradient>
      <radialGradient id="bodyShine" cx="0" cy="0" r="1" gradientTransform="translate(70 110) scale(60 40)" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fff" />
        <stop offset="1" stopColor="#B6D0E2" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="headGradient" x1="42" y1="30" x2="138" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fff" />
        <stop offset="1" stopColor="#B6D0E2" />
      </linearGradient>
      <linearGradient id="armGradient" x1="18" y1="100" x2="46" y2="140" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fff" />
        <stop offset="1" stopColor="#B6D0E2" />
      </linearGradient>
    </defs>
  </svg>
);

export default HoloRobot; 