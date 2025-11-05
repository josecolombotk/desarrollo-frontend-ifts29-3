import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/styles.css";
import { usePageMetadata } from "../hooks/usePageMetadata";
import heroVideo from "../assets/hero-bg.mp4";
import lucasImg from "../assets/lucas_perfil.png";
import victoriaImg from "../assets/victoria-ind.png";
import sebastianImg from "../assets/sebastian-perfil.webp";
import joseImg from "../assets/jose.png";
import estivenImg from "../assets/est-avatar.png";
import favicon from "../assets/favicon.png";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

export default function Home() {
  usePageMetadata("Equipo Innovador - Inicio", favicon);
  const [clima, setClima] = useState(null);

  // Implementación del Toast de bienvenida
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ saludo: "", hora: "" });

  const handleBienvenidaClick = () => {
    if (showToast) return;

    const ahora = new Date();
    const hora = ahora.getHours();
    let saludo;

    if (hora < 12) {
      saludo = "¡Buenos días!";
    } else if (hora < 18) {
      saludo = "¡Buenas tardes!";
    } else {
      saludo = "¡Buenas noches!";
    }

    const horaFormateada = ahora.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setToastData({ saludo, hora: horaFormateada });
    setShowToast(true);

    // Programa que el toast se oculte solo después de 5 segundos
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Llamada a API de clima
  useEffect(() => {
    // definimos la función y la ejecutamos
    async function fetchClima() {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=-34.61&longitude=-58.38&current_weather=true"
        );
        const data = await res.json();
        if (data.current_weather) {
          setClima(
            `Temperatura actual: ${data.current_weather.temperature}°C, Viento: ${data.current_weather.windspeed} km/h`
          );
        } else {
          setClima("No se pudo obtener el clima.");
        }
      } catch (error) {
        console.error("Error al obtener el clima:", error);
        setClima("Error al conectar con la API del clima.");
      }
    }

    fetchClima();
  }, []);

  const integrantes = [
    {
      nombre: "Lucas",
      img: lucasImg,
      ubicacion: "Villa Devoto, CABA",
      descripcion:
        "Me encanta la tecnología, el desarrollo de software, los juegos, pasar tiempo en familia y el fútbol.",
      skills: ["HTML", "CSS", "JavaScript", "C#"],
    },
    {
      nombre: "Victoria",
      img: victoriaImg,
      ubicacion: "Buenos Aires, Argentina",
      descripcion:
        "Diseñadora multimedia especializada en UX/UI. Me apasiona transformar ideas en productos digitales.",
      skills: ["Figma", "Adobe Suite", "HTML", "JavaScript"],
    },
    {
      nombre: "Sebastián",
      img: sebastianImg,
      ubicacion: "Mendoza, Argentina",
      descripcion:
        "Administrador de redes especializado en infraestructura TI y seguridad de redes.",
      skills: ["Mikrotik", "Python", "PHP", "Firewall"],
    },
    {
      nombre: "Jose",
      img: joseImg,
      ubicacion: "???",
      descripcion:
        "Estudiante de desarrollo de software, web y de creación de videojuegos.",
      skills: ["HTML", "Python", "Flask", "Godot", "Maya", "Blender"],
    },
    {
      nombre: "Estiven",
      img: estivenImg,
      ubicacion: "Buenos Aires, Argentina",
      descripcion:
        "Desarrollador de software especializado en e-commerce y aplicaciones web.",
      skills: ["NodeJS", "MySQL", "Express", "NestJS"],
    },
  ];

  // Reutilizar animación para las tarjetas del equipo
  useRevealOnScroll('#equipo .card', { threshold: 0.2, rootMargin: '0px 0px -10% 0px', stagger: 100 });

  return (
    <div className="home trama">
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          background:
            "linear-gradient(135deg, #EFF6FF 0%, #E0E7FF 50%, #F3E8FF 100%)",
        }}
      >
        <video autoPlay muted loop playsInline className="hero-video">
          <source src={heroVideo} type="video/mp4" />
          Tu navegador no soporta video en HTML5.
        </video>

        {/* Toast de bienvenida */}
        <div
          className="toast-container position-fixed top-0 end-0 p-3"
          style={{ zIndex: 9999 }}
        >
          <div
            className={`toast ${showToast ? "show" : ""}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header bg-success text-white">
              <i className="bi bi-hand-thumbs-up me-2"></i>
              <strong className="me-auto">{toastData.saludo}</strong>
              <small className="text-white-50">{toastData.hora}</small>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setShowToast(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="toast-body text-dark">
              <strong>¡Bienvenido a nuestro equipo!</strong> Explora las páginas
              de cada integrante para conocer más sobre nosotros.
            </div>
          </div>
        </div>

        {/* Contenido del Hero */}
        <div className="container hero-content">
          <div className="row align-items-center min-vh-100 pt-5">
            <div className="col-lg-6" style={{ marginLeft: '40px' }}>
              <h1 className="display-4 fw-bold mb-4">Equipo Innovador</h1>
              <p className="lead mb-4">
                Somos un grupo de estudiantes apasionados por la tecnología y el
                desarrollo web. Nuestro objetivo es crear soluciones innovadoras
                y aprender juntos en este emocionante viaje.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleBienvenidaClick}
                >
                  <i className="bi bi-hand-thumbs-up me-2"></i>¡Bienvenido!
                </button>
                <a href="#equipo" className="btn btn-outline-light btn-lg">
                  <i className="bi bi-arrow-down me-2"></i>Conocer al equipo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección del Equipo */}
      <section id="equipo" className="py-5">
  <div className="container text-center">
    <h2 className="display-5 fw-bold text-primary mb-3">
      Nuestro Equipo
    </h2>
    <p className="lead text-muted mb-5">
      Conoce a los integrantes de nuestro equipo y descubre sus
      habilidades e intereses.
    </p>
    <div className="row g-4">
      {integrantes.map((integrante, i) => (
        <div key={i} className="col-lg-4 col-md-6">
          <Link 
            to={`/integrantes/${integrante.nombre.toLowerCase()}`} 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="card h-100 reveal">
              <img
                src={integrante.img}
                className="card-img-top"
                alt={integrante.nombre}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{integrante.nombre}</h5>
                <p className="text-muted mb-3">
                  <i className="bi bi-geo-alt-fill me-1"></i>
                  {integrante.ubicacion}
                </p>
                <p className="card-text">{integrante.descripcion}</p>
                <div className="skills-list mb-3">
                  {integrante.skills.map((s, j) => (
                    <span key={j} className="skill-tag">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
</section>
    </div>
  );
}
