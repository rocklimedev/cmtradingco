import Footer from "./components/Common/Footer";
import Navbar from "./components/Common/Navbar";

import logo from "./assets/img/logo.png";
import Router from "./router/Router";
import BrandSlider from "./components/Products/BrandSlider";
function App() {
  return (
    <div className="main-wrapper">
      <img src={logo} alt="Company Logo" className="logo" />
      <Navbar />
      <Router />
      <BrandSlider />
      <Footer />
    </div>
  );
}

export default App;
