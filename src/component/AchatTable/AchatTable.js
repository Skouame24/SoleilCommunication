import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const AchatTable = () => {
    const [activeAchat, setActiveAchat] = useState(null);

 // Tableau de données contenant les achats
 const achats = [
    {
      id: 1,
      dateAchat: "2023-07-15",
      fournisseur: "Fournisseur 1",
      articles: [
        { id: 1, designation: "Iphone X", categorie: "Smartphones", quantite: 2, prixAchat: "120000" },
        { id: 3, designation: "AirPods Pro", categorie: "Accessoires", quantite: 1, prixAchat: "70000" },
      ]
    },
    {
      id: 2,
      dateAchat: "2023-07-18",
      fournisseur: "Fournisseur 2",
      articles: [
        { id: 2, designation: "Samsung Galaxy S21", categorie: "Smartphones", quantite: 3, prixAchat: "120000" },
        { id: 5, designation: "Disque Dur Externe", categorie: "Stockages", quantite: 1, prixAchat: "80000" },
        { id: 7, designation: "Casque Bluetooth", categorie: "Accessoires", quantite: 2, prixAchat: "60000" },
      ]
    },
    // Ajoutez ici les informations des autres achats...
  ];

  const calculateTotal = (articles) => {
    return articles.reduce((total, article) => total + parseInt(article.prixAchat), 0);
  };

  return (
    <div  style={{marginBottom:'20px'}}>
        <div className="mb-0 card">
        <div className="border-bottom card-header  bg-white">
          <div className="g-2 align-items-end row">
            <div className="col">
              <div className="d-flex">
                <h5
                  className="mb-0 hover-actions-trigger text-truncate text-nowrap"
                  id="responsiveTable"
                >
                  Listes des achats
                </h5>
              </div>
            </div>
          </div>
        </div>
      <table className="table table-hover">
        <thead>
        <tr>
            <th scope="col">Numéro d'achat</th>
            <th scope="col">Montant total</th>
            <th scope="col">Fournisseur</th>
            <th scope="col">Date achat</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
        {achats.map((achat) => (
            <React.Fragment key={achat.id}>
              <tr className="accordion-toggle" data-bs-toggle="collapse" data-bs-target={`#collapse-${achat.id}`} aria-expanded={activeAchat === achat.id} onClick={() => setActiveAchat(activeAchat === achat.id ? null : achat.id)}>
                <td>{achat.id}</td>
                <td>{calculateTotal(achat.articles)} Fcfa</td>
                <td>{achat.fournisseur}</td>
                <td>{achat.dateAchat}</td>
                <td><FontAwesomeIcon icon={faEye} style={{cursor:'pointer',alignContent:'center', textAlign:'center', marginLeft:'20px'}} /></td>
              </tr>
              <tr>
              <td colSpan="5" className={`accordion-body collapse ${activeAchat === achat.id ? 'show' : ''}`} id={`collapse-${achat.id}`}>
                  <div className="table-responsive w-100">
                    <table className="table table-bordered w-100">
                      <thead>
                      <tr>
          <th scope="col">Designation</th>
          <th scope="col">Categorie</th>
          <th scope="col">Quantite</th>
          <th scope="col">Prix d'achat</th>
        </tr>
                      </thead>
                      <tbody>
                      {achat.articles.map((article) => (
          <tr key={article.id}>
            <td>{article.designation}</td>
            <td>{article.categorie}</td>
            <td>{article.quantite}</td>
            <td>{article.prixAchat} Fcfa</td>
          </tr>
        ))}
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default AchatTable;
