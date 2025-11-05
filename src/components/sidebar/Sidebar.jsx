// src/components/Sidebar/Sidebar.jsx

import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import logo from '../../assets/logo.svg';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const integrantes = [
    { id: 'estiven', nombre: 'Estiven' },
    { id: 'jose', nombre: 'Jose' },
    { id: 'lucas', nombre: 'Lucas' },
    { id: 'sebastián', nombre: 'Sebastián' },
    { id: 'victoria', nombre: 'Victoria' },
  ];

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 991;
      setIsMobile(mobile);
      // Si cambia a desktop, asegura que el sidebar esté abierto
      if (!mobile) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Solo UN botón hamburguesa - se muestra solo en móvil cuando el sidebar está cerrado */}
      {isMobile && !isSidebarOpen && (
        <button 
          className="hamburger-btn"
          onClick={toggleSidebar}
          style={hamburgerBtnStyles}
        >
          <span style={hamburgerIconStyles}></span>
        </button>
      )}

      {/* Overlay para móviles */}
      {isMobile && isSidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={toggleSidebar}
          style={overlayStyles}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}
        style={{
          ...sidebarStyles,
          ...(isMobile && !isSidebarOpen ? sidebarHiddenStyles : {})
        }}
      >
        <div className="sidebar-header">
          <img src={logo} alt="Logo Equipo Innovador" className="sidebar-logo" />
          <h3 style={titleStyles}>Equipo Innovador</h3>
          
          {/* Botón de cerrar (hamburguesa) - solo en móvil cuando el sidebar está abierto */}
          {isMobile && isSidebarOpen && (
            <button 
              className="close-sidebar-btn"
              onClick={toggleSidebar}
              style={closeBtnStyles}
            >
              <span style={hamburgerIconStyles}></span>
            </button>
          )}
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/bitacora" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                Bitácora
              </NavLink>
            </li>
             <li>
              <NavLink
                to="/galeria"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                Ideas de Proyectos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/apipage"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                Nuestros Climas
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/diagrama"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                Diagramas
              </NavLink>
            </li>

            {/* Divisor */}
            <li style={dividerContainerStyles}>
              <div style={dividerStyles}></div>
            </li>

            {/* Integrantes como enlaces directos */}
            {integrantes.map((integrante) => (
              <li key={integrante.id}>
                <NavLink
                  to={`/integrantes/${integrante.id}`}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeSidebar}
                >
                  {integrante.nombre}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

// Estilos en línea
const hamburgerBtnStyles = {
  position: 'fixed',
  top: '15px',
  left: '15px',
  zIndex: 1060,
  backgroundColor: 'rgba(33, 37, 41, 0.98)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '4px',
  padding: '8px 12px',
  cursor: 'pointer',
  width: '44px',
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const hamburgerIconStyles = {
  display: 'inline-block',
  width: '20px',
  height: '14px',
  backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.8)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: '100%'
};

const overlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  zIndex: 1040
};

const sidebarStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: '280px',
  backgroundColor: '#0d1117',
  backdropFilter: 'blur(10px)',
  zIndex: 1050,
  transition: 'transform 0.3s ease'
};

const sidebarHiddenStyles = {
  transform: 'translateX(-100%)'
};

const titleStyles = {
  margin: 0,
  fontSize: '1.2rem',
  fontWeight: 'bold',
  lineHeight: '1.2',
  color: 'white'
};

const closeBtnStyles = {
  position: 'absolute',
  top: '15px',
  right: '15px',
  backgroundColor: 'rgba(33, 37, 41, 0.98)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '4px',
  color: 'white',
  cursor: 'pointer',
  padding: '8px 12px',
  width: '44px',
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1060
};

const dividerContainerStyles = {
  margin: '15px 0',
  padding: '0 20px'
};

const dividerStyles = {
  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
  width: '100%'
};

export default Sidebar;