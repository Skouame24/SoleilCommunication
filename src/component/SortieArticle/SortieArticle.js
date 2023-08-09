import React, {useState} from 'react'
import SortieDirecte from '../SortieDirecte/SortieDirecte';
import SortieIndirecte from '../SortieIndirecte/SortieIndirecte';

const SortieArticle = () => {
    const [activeLink, setActiveLink] = useState('directe');
    return (
      <div>
         <div className='content-header'> 
           <h2 className='header'>Sortie de Stock</h2>
        </div>
        <div className="nav" style={{ marginTop: 20 }}>
            <ul>
              <li
                onClick={() => setActiveLink('directe')}
                className='lien'              
              >
                <a href="#"               className={activeLink === 'directe' ? 'active' : ''}
  >
                  Sortie directe
                </a>
              </li>
  
              <li
                onClick={() => setActiveLink('indirecte')}
                className='lien'              style={{ marginLeft: '20px' }}
              >
                <a href="#"               className={activeLink === 'indirecte' ? 'active' : ''}
  >
                  Sortie Indirecte
                </a>
              </li>
            </ul>
          </div>
          <div className="activite-menu">
          {activeLink === 'directe' && <SortieDirecte />}
          {activeLink === 'indirecte' && <SortieIndirecte />}
          </div>
      </div>
    )
  }
  
export default SortieArticle


  