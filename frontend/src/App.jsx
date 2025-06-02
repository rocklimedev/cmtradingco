import Footer from "./components/Common/Footer";
import Navbar from "./components/Common/Navbar";

import logo from "./assets/img/logo_red.png";
import Router from "./router/Router";
function App() {
  return (
    <div className="main-wrapper">
      <img src={logo} alt="Company Logo" className="logo" />
      <Navbar />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
