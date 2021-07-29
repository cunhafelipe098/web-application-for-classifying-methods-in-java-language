import React from 'react';
import '../App.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video1.mp4' autoPlay loop muted />
      <h1>Predição de qualidade de código de funções</h1>
      <p>O que você está esperando?</p>
      <div className='hero-btns'>
      <Link
        to='/'
        className='link'
        onClick={()=> window.scrollTo(0, 1700)}
      >
        <p className='linkText'>Testar código</p>  
      </Link>
      </div>
    </div>
  );
}

export default HeroSection;
