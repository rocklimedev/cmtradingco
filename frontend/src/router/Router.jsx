// Router.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import masterRoutes from "./routes"; // Your route configuration
import NotFound from "../components/NotFound";
// Component to wrap routes with Helmet for dynamic titles
const RouteWithHelmet = ({ element, name }) => {
  return (
    <>
      {name && (
        <Helmet>
          <title>{`CM Trading Co - ${name}`}</title>
        </Helmet>
      )}
      {element}
    </>
  );
};

// Function to render routes, handling both top-level and nested routes
const renderRoutes = (routes) => {
  return routes
    .filter(({ path, element }) => path && element) // Ensure path and element exist
    .map(({ path, name, element, children }) => (
      <Route
        key={path}
        path={path}
        element={<RouteWithHelmet element={element} name={name} />}
      >
        {children && renderRoutes(children)} {/* Handle nested routes */}
      </Route>
    ));
};

const Router = () => {
  return (
    <Routes>
      {renderRoutes(masterRoutes)}
      <Route
        path="*"
        element={<RouteWithHelmet element={<NotFound />} name="Not Found" />}
      />
    </Routes>
  );
};

export default Router;
