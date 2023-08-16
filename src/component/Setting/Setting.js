import React, {useState} from 'react'
import './Setting.css'
import { Link } from 'react-router-dom'
import Profile from '../Profile/Profile';
import ChangePwd from '../ChangePwd/ChangePwd';
const Setting = ({userData}) => {
  const [activeLink, setActiveLink] = useState('profile');
console.log(userData)
  return (
    <div>
      <div className='content-header'> 
         <h2 className='header'>Parametre</h2>
      </div>
      <div className="nav" style={{ marginTop: 20 }}>
            <ul>
              <li
                onClick={() => setActiveLink('profile')}
                className='lien'              
              >
                <a href="#"               className={activeLink === 'profile' ? 'active' : ''}
  >
                    Profile
                </a>
              </li>
  
              <li
                onClick={() => setActiveLink('securite')}
                className='lien'              style={{ marginLeft: '20px' }}
              >
                <a href="#"               className={activeLink === 'securite' ? 'active' : ''}
  >
                  Securite
                </a>
              </li>
              <li
                onClick={() => setActiveLink('notif')}
                className='lien'              style={{ marginLeft: '20px' }}
              >
                <a href="#"               className={activeLink === 'notif' ? 'active' : ''}
  >
                  Notification
                </a>
              </li>
            </ul>
          </div>
          <div className="activite-menu">
          {activeLink === 'profile' && <Profile userData={userData}/>}
          {activeLink === 'securite' && <ChangePwd />}
          </div>
    </div>
  )
}

export default Setting
