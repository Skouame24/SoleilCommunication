import React, { useState } from 'react';
import './Dashboard.css';
import Sidebar from './component/Sidebar/Sidebar';
import Navabar from './component/Navbar/Navabar';
import Card from './component/Card/Card';
import FormAchat from './component/FormAchat/FormAchat';
import ResponsiveTable from './component/ResponsiveTable/ResponsiveTable';
import Facture from './component/Facture/Facture';
import FormClient from './component/FormClient/FormClient';
import FormFournisseur from './component/FormFournisseur/FormFournisseur';
import FormVente from './component/FormVente/FormVente';
import EtatAchat from './component/EtatAchat/EtatAchat';
import EtatVente from './component/EtatVente/EtatVente';
import CreateMagasin from './component/CreateMagasin/CreateMagasin';
import CreateArticle from './component/CreateArticle/CreateArticle';
import ArticleTable from './component/ArticleTable/ArticleTable';
import AchatTable from './component/AchatTable/AchatTable';
import VenteTable from './component/VenteTable/VenteTable';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BaseArticle from './component/Base/BaseArticle';
import EntreeStock from './component/EntreeArticle/EntreeStock';
import Directe from './component/EntreeDirecte/Directe';
import SortieArticle from './component/SortieArticle/SortieArticle';
import FournisseursTable from './component/FournisseurTable/FournisseursTable';
import ClientsTable from './component/Clientable/ClientTable';
import Finance from './component/finance/finance';

function Dashboard() {
  const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");

  const changeStyle = () => {
    if (style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
  };

  return (
    <BrowserRouter>

    <div>
      <body id="page-top">
        {/*  <!-- Page Wrapper --> */}
        <div id="wrapper">
          {/*  <!-- Sidebar --> */}
          <Sidebar changeStyle={changeStyle} />
          {/*  <!-- End of Sidebar --> */}

          {/*  <!-- Content Wrapper --> */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/*  <!-- Main Content --> */}
            <div id="content">
              {/*  <!-- Topbar --> */}
              <Navabar />
              {/*  <!-- End of Topbar --> */}

              {/*   <!-- /.container-fluid --> */}
              <div className="container-fluid">
                <Routes>
                <Route path='/EtatAchat' element={< EtatAchat/>} />
                <Route path='/formAchat' element={< FormAchat/>} />
                <Route path='/' element={< Card/>} />
                <Route path='/formVente' element={< FormVente/>} />
                <Route path='/etatVente' element={< EtatVente/>} />
                <Route path='/formClient' element={< FormClient/>} />
                <Route path='/clienttable' element={< ClientsTable/>} />
                <Route path='/formFournisseur' element={< FormFournisseur/>} />
                <Route path='/fournisseurTable' element={< FournisseursTable/>} />
                <Route path='/createArticle' element={< CreateArticle/>} />
                <Route path='/createMagasin' element={< CreateMagasin/>} />
                <Route path='/facture' element={< Facture/>} />
                <Route path='/base' element={< BaseArticle/>} />
                <Route path='/entree' element={< EntreeStock/>} />
                <Route path='/directe' element={< Directe/>} />
                <Route path='/sortie' element={< SortieArticle/>} />
                <Route path='/finance' element={<Finance />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
    </BrowserRouter>

  );
}

export default Dashboard;
