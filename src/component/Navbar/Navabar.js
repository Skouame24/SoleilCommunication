import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navabar = ({ userData }) => {
    const [articles, setArticles] = useState([]);
  const [stockAlerts, setStockAlerts] = useState([]);
  console.log(userData)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Effectuer une requête à votre API pour récupérer les articles
      const response = await fetch('http://localhost:5001/api/articles');
      const data = await response.json();

      // Mettre à jour le state des articles avec les données reçues
      setArticles(data.articles);

      // Vérification des alertes de stock
      const alerts = data.articles.filter(article => article.quantite === 0);
      setStockAlerts(alerts);
      console.log(alerts)
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };
    const handleLogout = () => {
        // Supprimer le jeton d'accès du localStorage
        localStorage.removeItem('token');
        // Actualiser la page pour appliquer la déconnexion
        window.location.href = '/'
      };
      

    const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");

    const changeStyle = () => {
        if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
        }
        else{
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    };
    const changeStyle1 = () => {
        if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1");
        }
        else{
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    };

    
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar static-top shadow">
{/* Sidebar Toggle (Topbar) */}
<button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" onClick={changeStyle1}>
  <i className="fa fa-bars"></i>
</button>

{/* Topbar Search */}
<div className="navbar-brand ml-auto" style={{
  width: '200px',
  height: '50px',
  backgroundColor: 'var(--blue)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  marginRight:'107px'
}}>
  Boutique
</div>


                                {/*  <!-- Topbar Navbar --> */}
                                <ul className="navbar-nav ml" style={{marginLeft:'230px'}}>

                                    {/*  <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
                                    <li className="nav-item dropdown no-arrow d-sm-none">
                                        <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fas fa-search fa-fw"></i>
                                        </a>
                                        {/*   <!-- Dropdown - Messages --> */}
                                        <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                            aria-labelledby="searchDropdown">
                                            <form className="form-inline mr-auto w-100 navbar-search">
                                                <div className="input-group">
                                                    <input type="text" className="form-control bg-light border-0 small"
                                                        placeholder="Search for..." aria-label="Search"
                                                        aria-describedby="basic-addon2" />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-primary" type="button">
                                                            <i className="fas fa-search fa-sm"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </li>

                                    {/*  <!-- Nav Item - Alerts --> */}
                                    <li className="nav-item dropdown no-arrow mx-1">
                                        <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  <i className="fas fa-bell fa-fw fa-lg "></i> {/* Ajoutez la classe "fa-lg" ici */}
                                            {/*  <!-- Counter - Alerts --> */}
                                            <span className="badge badge-danger badge-counter">3+</span>
                                        </a>
                                        {/*   <!-- Dropdown - Alerts --> */}
                                        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                            aria-labelledby="alertsDropdown">
                                            <h6 className="dropdown-header">
                                                Alerts Center
                                            </h6>
                                            <a className="dropdown-item d-flex align-items-center" href="#">
                                                <div className="mr-3">
                                                    <div className="icon-circle bg-primary">
                                                        <i className="fas fa-file-alt text-white"></i>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="small text-gray-500">December 12, 2019</div>
                                                    <span className="font-weight-bold">A new monthly report is ready to download!</span>
                                                </div>
                                            </a>
                                            <a className="dropdown-item d-flex align-items-center" href="#">
                                                <div className="mr-3">
                                                    <div className="icon-circle bg-success">
                                                        <i className="fas fa-donate text-white"></i>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="small text-gray-500">December 7, 2019</div>
                                                    $290.29 has been deposited into your account!
                                                </div>
                                            </a>
                                            {stockAlerts.map((alert, index) => (
        <a className="dropdown-item d-flex align-items-center" href="#" key={index}>
          <div className="mr-3">
            <div className="icon-circle bg-warning">
              <i className="fas fa-exclamation-triangle text-white"></i>
            </div>
          </div>
          <div>
            <div className="small text-gray-500">Date: {new Date(alert.createdAt).toLocaleString()}</div>
            Stock Alert: Votre article {alert.designation} est insuffisant
          </div>
        </a>
      ))}

      <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
    </div>
                                    </li>

                                    {/*  <!-- Nav Item - Messages --> */}

                                    <div className="topbar-divider d-none d-sm-block"></div>

                                    {/* <!-- Nav Item - User Information --> */}
                                    <li className="nav-item dropdown no-arrow">

                                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  <span className="mr-2 d-none d-lg-inline text-gray-600 small">
             {userData ? `${userData.prenom} ${userData.nom}` : "Utilisateur"}
           </span>                                            <img className="img-profile rounded-circle"
                                                src="img/undraw_profile.svg" />
                                        </a>
                                        {/*  <!-- Dropdown - User Information --> */}
                                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                            aria-labelledby="userDropdown">
                                            <Link to="/setting" className="dropdown-item" href="#">
                                                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                                Profile
                                            </Link>
                                            <Link to="/setting" className="dropdown-item" >
                                                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                                Parametre
                                            </Link>
                            
                                            <div className="dropdown-divider"></div>
                                            <Link className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal" onClick={handleLogout}>
                                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                                Logout
                                            </Link>
                                        </div>
                                    </li>

                                </ul>

                            </nav>
  )
}

export default Navabar
