import React, { useEffect } from 'react';

export function FloatingBackground() {
  useEffect(() => {
    const circles = document.querySelectorAll('.floating-circle');
    circles.forEach((circle, index) => {
      const duration = 15 + (index * 5);
      circle.style.animation = `float ${duration}s ease-in-out infinite`;
      circle.style.animationDelay = `${index * 2}s`;
    });
  }, []);

  return (
    <div aria-hidden>
      <div className="transparent-chat-icon">
        <img src="/chat.jpg" alt="Transparent Chat Icon" />
      </div>
      <div className="floating-circle" style={{ width: 300, height: 300, top: '10%', left: '5%' }} />
      <div className="floating-circle" style={{ width: 200, height: 200, bottom: '15%', right: '10%' }} />
      <div className="floating-circle" style={{ width: 150, height: 150, top: '50%', left: '20%' }} />
    </div>
  );
}