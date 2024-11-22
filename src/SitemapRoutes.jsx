import { Routes, Route } from "react-router-dom";

function SitemapRoutes() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/new" />
      <Route path="/edit/:id" />
      <Route path="/post/:id" />
      <Route path="/login" />
    </Routes>
  );
}

export default SitemapRoutes;
