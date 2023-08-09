import React, { useState } from 'react';
import './Card.css';
import iphone from '../../assets/iphone.png';
import cle from '../../assets/computer.png';
import airpod from '../../assets/airpod.png';
import multi from '../../assets/fourniture.jpg';
import cable from '../../assets/cable.png';

const Card = ({ style }) => {

  return (
    <section >
      <div className='content-header'> 
         <h2 className='header'>Domaine d'activite</h2>
      </div>
    <div className='Card'>
      <div className="card-one">
        <img src={iphone} alt="iphone" className='image' />

        <div className='titre'>
          <h3>Informatique</h3>
          <span className='count' style={{ width: '10%', display: 'flex', alignContent: 'center', justifyContent: 'center', paddingRight: '4px' }}>0</span>
        </div>
      </div>
      <div className="card-one">
        <img src={cle} alt="iphone" className='image-one' />

        <div className='titre'>
          <h3>Bureautiques</h3>
          <span className='count' style={{ width: '10%', display: 'flex', alignContent: 'center', justifyContent: 'center', paddingRight: '4px' }}>0</span>
        </div>
      </div>
      <div className="card-one">
        <img src={iphone} alt="iphone" className='image' />

        <div className='titre'>
          <h3>Communication</h3>
          <span className='count' style={{ width: '10%', display: 'flex', alignContent: 'center', justifyContent: 'center', paddingRight: '4px' }}>0</span>
        </div>
      </div>
    </div>
    </section>
  );
};

export default Card;
