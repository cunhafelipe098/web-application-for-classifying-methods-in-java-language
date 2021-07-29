import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {

  return (
    <div className='footer-container'>
      
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Referências</h2>
            <a target="_blank" href='https://www.pexels.com/search/videos/website%20background/'>Vídeo de fundo</a>
            <a target="_blank" href='https://www.flaticon.com/authors/smashicons'>Imagens e Ícones</a>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <Link to='/' className='navbar-logo' onClick={()=> window.scrollTo(0, 0)}>
          <img width='150' src={'images/unifesp.png'}/>
        </Link>
      </section>
    </div>
  );
}

export default Footer;
