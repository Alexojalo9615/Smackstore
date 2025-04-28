import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/style/HeroSection.css"; 

const HeroSection = () => {

  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="overlay">
        <div className="hero-content">
          <h1>Benvenuto su SmackStore</h1>
          <p>Vesti come un campione!</p>
          <button onClick={() => navigate("/shop")}>Vai allo Shop</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
