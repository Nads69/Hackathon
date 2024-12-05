import { useState, useEffect } from "react";
import NavBar from "./Components/NavBar/NavBar";
import Header from "./Components/Header/Header";
import Advice from "./Components/Advice/advice";
import Footer from "./Components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Header />
      <Advice />
      <Footer />
    </>
  );
}

export default App;
