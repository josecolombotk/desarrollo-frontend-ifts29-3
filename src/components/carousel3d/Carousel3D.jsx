// components/Carousel3D.jsx
import React, { useState, useEffect } from 'react';
import './Carousel3D.css';

const Carousel3D = ({ items, autoRotate = false, interval = 5000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  

  const rotate = (direction) => {
    setCurrentSlide(prev => {
      const newSlide = prev + direction;
      if (newSlide >= items.length) return 0;
      if (newSlide < 0) return items.length - 1;
      return newSlide;
    });
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-rotación opcional
  useEffect(() => {
    if (!autoRotate) return;
    
    const timer = setInterval(() => {
      rotate(1);
    }, interval);

    return () => clearInterval(timer);
  }, [autoRotate, interval]);

  return (
    <div className={`music-carousel-3d-container ${isMobile ? 'mobile-view' : ''}`}>
      <div 
        className="music-carousel-3d" 
        style={!isMobile ? { transform: `rotateY(${currentSlide * -90}deg)` } : {}}
      >
        {items.map((item, index) => (
          <div 
            key={index}
            className={`music-carousel-3d-item ${index === currentSlide ? 'active' : ''}`}
            data-index={index}
          >
            <div className="music-card">
              <div className="music-image">
                <img src={item.img} alt={item.title} className="song-image" />
              </div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Controles */}
      <div className="carousel-3d-controls">
        <button className="carousel-3d-btn prev" onClick={() => rotate(-1)}>
          <i className="bi bi-chevron-left"></i>
        </button>
        <button className="carousel-3d-btn next" onClick={() => rotate(1)}>
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
      
      {/* Indicadores */}
      <div className="carousel-3d-indicators">
        {items.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel3D;