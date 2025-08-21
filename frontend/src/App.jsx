import Footer from "./components/Common/Footer";
import Navbar from "./components/Common/Navbar";
import logo from "./assets/img/logo.png";
import Router from "./router/Router";
import BrandSlider from "./components/Products/BrandSlider";
import { useState } from "react";
import brands from "./assets/data/brands";
import { Link } from "react-router-dom";
function App() {
  // Sample brands data (replace with API or DB later)

  const [activeBrandIndex, setActiveBrandIndex] = useState(0);

  return (
    <div className="main-wrapper">
      <Link to="/">
        <img src={logo} alt="Company Logo" className="logo" />
      </Link>

      <Navbar />
      <Router />

      {/* ✅ Pass required props */}
      <BrandSlider
        brands={brands}
        activeBrandIndex={activeBrandIndex}
        setActiveBrandIndex={setActiveBrandIndex}
      />

      <Footer />
    </div>
  );
}

export default App;
