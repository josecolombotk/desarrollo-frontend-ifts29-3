import { useEffect } from "react";
import arbolRenderizado from "../assets/arbol_renderizado.png";
import "../css/diagrama.css";
import arbolCarpetas from "../assets/arbol_carpetas.png";

const Diagrama = () => {
  // Hook para animar la aparición de las tarjetas al hacer scroll.
  useEffect(() => {
    const cards = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    cards.forEach((card) => observer.observe(card));
  }, []);
  return (
    <>
      <section className="diagrama-header">
        <div className="container">
          <h1>Diagramas</h1>
          <p>Representación visual de la arquitectura del sistema 
            <br />
            y la disposición de los archivos del proyecto.</p>
        </div>
      </section>

      <section className="container py-5">

        <div className="diagrama-card fade-in">
          <h3>Estructura de Carpetas del Proyecto</h3>
          <img
            src={arbolCarpetas}
            alt="Estructura de carpetas del proyecto"
            className="diagrama-image"
          />
        </div>
        
        <div className="diagrama-card fade-in">
          <h3>Árbol de Renderizado de Componentes</h3>
          <img
            src={arbolRenderizado}
            alt="Árbol de renderizado de componentes"
            className="diagrama-image"
          />
        </div>
      </section>
    </>
  );
};

export default Diagrama;