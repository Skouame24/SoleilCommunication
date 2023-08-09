import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes, faShoppingBag, faWallet } from '@fortawesome/free-solid-svg-icons';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';


const Sidebar = ({ changeStyle }) => {
  const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
  const [partnerExpanded, setPartnerExpanded] = useState(false);
  const [stockExpanded, setStockExpanded] = useState(false);

 

  const togglePartnerCollapse = () => {
    setPartnerExpanded(!partnerExpanded);
  };

  const toggleStockCollapse = () => {
    setStockExpanded(!stockExpanded);
  };

  return (
    <>
      <ul className={style} id="accordionSidebar">
        {/* Sidebar - Brand */}
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
          <div className="sidebar-brand-icon rotate-n-15">
          </div>
          <div className="sidebar-brand-text mx-3">Soleil  <sup style={{color:'var(--black)'}}>Com</sup></div>
          <div className="text-center d-none d-md-inline">
            <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
          </div>
        </a>

        {/* Divider */}
        <hr className="sidebar-divider my-0" />

        {/* Nav Item - Dashboard */}

        {/* Divider */}
        <hr className="sidebar-divider" />

        {/* Heading */}

        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item active">
  <Link to='/' className="nav-link" >
    <i className="fas fa-fw fa-tachometer-alt" />
    <span>Dashboard</span>
  </Link>
</li>
        <li className="nav-item">
          <Link className="nav-link collapsed" data-toggle="collapse" data-target="#collapseTwo"
            aria-expanded="true" aria-controls="collapseTwo">
            <i><FontAwesomeIcon icon={faShoppingBag} /></i>
            <span style={{ marginLeft: '10px' }}>Achats</span>
          </Link>
          <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Gestion Achat:</h6>
              <Link to='/formAchat' className="collapse-item" >Enregistrer un achat</Link>
              <Link to='/EtatAchat' className="collapse-item">Eta des Achats</Link>
            </div>
          </div>
        </li>

        {/* Nav Item - Utilities Collapse Menu */}
        <li className="nav-item">
          <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
            aria-expanded="true" aria-controls="collapseUtilities">
            <FontAwesomeIcon icon={faWallet} />
            <span style={{ marginLeft: '10px' }}>Vente</span>
          </a>
          <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Gestion des Ventes:</h6>
              <Link to='/formVente' className="collapse-item" href="utilities-color.html">Enregistrer une vente</Link>
              <Link to='/etatVente' className="collapse-item" href="utilities-border.html">Etat de vente</Link>
            </div>
          </div>
        </li>

        {/* Divider */}
        <hr className="sidebar-divider" />

        {/* Heading */}
        <div className="sidebar-heading">
          Gestion Partenaire
        </div>

        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <a className={`nav-link collapsed ${partnerExpanded ? 'active' : ''}`} href="#" data-toggle="collapse" data-target="#collapsePages"
            aria-expanded={partnerExpanded} aria-controls="collapsePages" onClick={togglePartnerCollapse}>
            <FontAwesomeIcon icon={faHandshake} />
            <span style={{ marginLeft: '10px' }}>Collaborateur</span>
          </a>
          <div id="collapsePages" className={`collapse ${partnerExpanded ? 'show' : ''}`} aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <Link to='/formFournisseur' className="collapse-item" >Creer un fournisseur</Link>
              <Link to='/formClient' className="collapse-item" >Creer un client</Link>
              <div className="collapse-divider"></div>
              <h6 className="collapse-header">Gestion collab :</h6>
              <Link to="/fournisseurTable" className="collapse-item" >Listes des Fournisseur</Link>
              <Link to="/clienttable" className="collapse-item" >Listes des Clients</Link>
            </div>
          </div>
        </li>

        <hr className="sidebar-divider" />

        {/* Nav Item - Charts */}
        <div className="sidebar-heading">
          Gestion Stock
        </div>

        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <a className={`nav-link collapsed ${stockExpanded ? 'active' : ''}`} href="#" data-toggle="collapse" data-target="#collapseStock"
            aria-expanded={stockExpanded} aria-controls="collapseStock" onClick={toggleStockCollapse}>
            <FontAwesomeIcon icon={faBoxes} />
            <span style={{ marginLeft: '10px' }}>Stock</span>
          </a>
          <div id="collapseStock" className={`collapse ${stockExpanded ? 'show' : ''}`} aria-labelledby="headingStock" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <Link to="/createArticle" className="collapse-item" >Creer un article</Link>
              <Link to="/createMagasin" className="collapse-item" >Creer un magasin</Link>
              <a className="collapse-item" ></a>
              <div className="collapse-divider"></div>
              <h6 className="collapse-header">Gestion de stock :</h6>
              <Link to='/entree' className="collapse-item" >Entree de stocks</Link>
              <Link to='/sortie' className="collapse-item" >Sorties de stocks</Link>
              <Link to="/base" className="collapse-item" >Base de l'article</Link>
            </div>
          </div>
        </li>

        {/* Nav Item - Tables */}

        {/* Divider */}

        {/* Sidebar Toggler (Sidebar) */}
        {/* <div className="text-center d-none d-md-inline">
          <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
        </div> */}
      </ul>
    </>
  );
};

export default Sidebar;
