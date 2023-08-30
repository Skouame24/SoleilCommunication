import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Login from './component/Login/Login';
import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Vérifier si le token est stocké (par exemple, dans les cookies ou le stockage local)
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Fonction pour récupérer les données de l'utilisateur
  const fetchUserData = async (token) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch("http://localhost:5001/api/profile", requestOptions);

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error('Erreur lors de la récupération des données de l\'utilisateur :', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données de l\'utilisateur :', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserData(token);
    }
  }, [token]); // Exécute le useEffect à chaque changement de token

  return (
    <div>
      {token ? <Dashboard userData={userData} /> : <Login setToken={setToken} />}
    </div>
  );
}

export default App;
