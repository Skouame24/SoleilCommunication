import React, { useState } from 'react'
import './Entree.css'
import Directe from '../EntreeDirecte/Directe';
import Indirecte from '../Indirecte/Indirecte';

const EntreeStock = () => {
    const [activeLink, setActiveLink] = useState('directe');
  return (
    <div>
       <div className='content-header'> 
         <h2 className='header'>Entree de Stock</h2>
      </div>
      <div className="nav" style={{ marginTop: 20 }}>
          <ul>
            <li
              onClick={() => setActiveLink('directe')}
              className='lien'              
            >
              <a href="#"               className={activeLink === 'directe' ? 'active' : ''}
>
                Entree directe
              </a>
            </li>

            <li
              onClick={() => setActiveLink('indirecte')}
              className='lien'              style={{ marginLeft: '20px' }}
            >
              <a href="#"               className={activeLink === 'indirecte' ? 'active' : ''}
>
                Entree Indirecte
              </a>
            </li>
          </ul>
        </div>
        <div className="activite-menu">
        {activeLink === 'directe' && <Directe />}
        {activeLink === 'indirecte' && <Indirecte />}
          {/* Ajoutez d'autres composants pour les autres liens ici */}
        </div>
    </div>
  )
}

export default EntreeStock
