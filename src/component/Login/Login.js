import React, { useState } from 'react';
import axios from 'axios';

  const Login = ({ setToken }) => {
    const [loginData, setLoginData] = useState({
      login: '',
      motdepasse: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setLoginData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:5001/api/login', loginData);
  
        if (response.data.token) {
          // Stocker le token dans le localStorage
          localStorage.setItem('token', response.data.token);
  
          // Attendre 3 secondes avant de rediriger vers le tableau de bord
          setTimeout(() => {
            // Mettre à jour le token dans le composant parent
            setToken(response.data.token);
          }, 3000);
        } else {
          console.error('Token non trouvé dans la réponse.');
        }
      } catch (error) {
        console.error('Erreur lors de la connexion :', error);
      }
    };


  return (
    <div className="page-wrapper " id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" style={{ background: "linear-gradient(180deg, #4e73df 10%, #6f42c1 100%)" }} data-header-position="fixed">
      <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="col-md-8 col-lg-6 col-xxl-3">
              <div className="card mb-0">
                <div className="card-body">
                  <p className="text-center" style={{ fontSize: '20px', color: "#4e73df" }}>Soleil Communication MultiService</p>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">
                        Login
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="login"
                        value={loginData.login}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="exampleInputPassword1" className="form-label">
                        Mot de passe
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        name="motdepasse"
                        value={loginData.motdepasse}
                        onChange={handleChange}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">
                      Connexion
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
