import Footer from "./components/Common/Footer";
import Navbar from "./components/Common/Navbar";

import Router from "./router/Router";
function App() {
  return (
    <div className="main-wrapper">
      <Navbar />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
