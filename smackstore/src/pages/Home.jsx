import React from 'react';
import HeroSection from './HeroSection';
import CatchphraseBanner from '../components/Catchphrase';
import HeroCarousel from '../components/HeroCarousel';
import FavoritesProduct from '../components/FavoritesProduct';



const Home = () => {
  return (
    <>
      <CatchphraseBanner />
      <HeroSection />
      <HeroCarousel />
      <FavoritesProduct />
    </>
  );
};

export default Home;
