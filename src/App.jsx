import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
//  Importar componentes de layout
import Sidebar from "./components/sidebar/Sidebar";
import Footer from "./components/footer/Footer.jsx";
// Importar los componentes de las páginas
import HomePage from "./pages/Home";
import BitacoraPage from "./pages/Bitacora";
import IntegrantePage from "./pages/IntegrantePage";
import Galeria from "./pages/GaleriaJsonPage";
import ApiPage from "./pages/Apipage";
import Diagrama from "./pages/Diagrama.jsx";
// Importar CSS de transiciones
import "./css/transiciones.css";

// --- Componente Layout con Animaciones ---
const Layout = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage("fadeOut");
    }
  }, [location, displayLocation]);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div
        className="main-content"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <main style={{ flex: "1 0 auto" }}>
          <div
            className={`page-transition ${transitionStage}`}
            onAnimationEnd={() => {
              if (transitionStage === "fadeOut") {
                setTransitionStage("fadeIn");
                setDisplayLocation(location);
              }
            }}
          >
            <Routes location={displayLocation}>
              <Route index element={<HomePage />} />
              <Route path="bitacora" element={<BitacoraPage />} />
              <Route path="galeria" element={<Galeria />} />
              <Route path="apipage" element={<ApiPage />} />
              <Route path="diagrama" element={<Diagrama />} />
              <Route path="integrantes/:id" element={<IntegrantePage />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

// se define la lógica de enrutamiento de la aplicación.
function App() {
  return (
    <Routes>
      <Route path="/*" element={<Layout />} />
    </Routes>
  );
}

export default App;