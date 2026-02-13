// import { useState, useEffect } from "react";
import "./App.css";
import Gallery from "./components/Gallery";
import YourCollection from "./components/YourCollection";
import { BrowserRouter, Routes, Route} from "react-router-dom";

export default function App() {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/collection" element={<YourCollection />} />
      </Routes>
    </BrowserRouter>
  );
};