import React from "react";
import Navbar from "./components/Navbar/Navbar";
import FavoritesScreen from "./FavoritesScreen";
import MainScreen from "./MainScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/MainScreen" element={<MainScreen />} />
        <Route path="/FavoritesScreen" element={<FavoritesScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
