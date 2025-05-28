import NotFound from "../components/NotFound";
import HomeWrapper from "../components/Home/HomeWrapper";
import ContactWrapper from "../components/Contact/ContactWrapper";
import AboutWrapper from "../components/About/AboutWrapper";
import ProjectWrapper from "../components/Projects/ProjectWrapper";
import ProductWrapper from "../components/Products/ProductWrapper";
const masterRoutes = [
  {
    path: "/",
    name: "Home",
    element: <HomeWrapper />,
  },
  {
    path: "/404",
    name: "Not Found",
    element: <NotFound />,
  },
  {
    path: "/contact",
    name: "Contact",
    element: <ContactWrapper />,
  },
  {
    path: "/about",
    name: "About",
    element: <AboutWrapper />,
  },
  {
    path: "/project",
    name: "Project",
    element: <ProjectWrapper />,
  },
  {
    path: "/product",
    name: "Product",
    element: <ProductWrapper />,
  },
];

export default masterRoutes;
