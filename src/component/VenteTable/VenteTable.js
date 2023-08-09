import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const VenteTable = () => {
  const [activeVente, setActiveVente] = useState(null);

  // Tableau de données contenant les ventes
  const ventes = [
    {
      id: 1,
      dateVente: "2023-07-15",
      client: "Client 1",
      articles: [
        { id: 1, designation: "Iphone X", categorie: "Smartphones", quantite: 2, prixVente: "150000" },
        { id: 3, designation: "AirPods Pro", categorie: "Accessoires", quantite: 1, prixVente: "80000" },
      ]
    },
    {
      id: 2,
      dateVente: "2023-07-18",
      client: "Client 2",
      articles: [
        { id: 2, designation: "Samsung Galaxy S21", categorie: "Smartphones", quantite: 3, prixVente: "180000" },
        { id: 5, designation: "Disque Dur Externe", categorie: "Stockages", quantite: 1, prixVente: "90000" },
        { id: 7, designation: "Casque Bluetooth", categorie: "Accessoires", quantite: 2, prixVente: "120000" },
      ]
    },
    // Ajoutez ici les informations des autres ventes...
  ];

  const calculateTotal = (articles) => {
    return articles.reduce((total, article) => total + parseInt(article.prixVente), 0);
  };

  return (
    <div  style={{marginBottom:'20px'}}>
        <div className="mb-0 card">
        <div className="border-bottom card-header bg-primary">
          <div className="g-2 align-items-end row">
            <div className="col">
              <div className="d-flex  ">
                <h5
                  className="mb-0 hover-actions-trigger text-truncate text-nowrap"
                  id="responsiveTable"
                  style={{color:"white"}}
                >
                  Listes des ventes
                </h5>
              </div>
            </div>
          </div>
        </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Numéro de vente</th>
            <th scope="col">Montant total</th>
            <th scope="col">Client</th>
            <th scope="col">Date de vente</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {ventes.map((vente) => (
            <React.Fragment key={vente.id}>
              <tr className="accordion-toggle" data-bs-toggle="collapse" data-bs-target={`#collapse-${vente.id}`} aria-expanded={activeVente === vente.id} onClick={() => setActiveVente(activeVente === vente.id ? null : vente.id)}>
                <td>{vente.id}</td>
                <td>{calculateTotal(vente.articles)} Fcfa</td>
                <td>{vente.client}</td>
                <td>{vente.dateVente}</td>
                <td><FontAwesomeIcon icon={faEye} style={{cursor:'pointer',alignContent:'center', textAlign:'center', marginLeft:'20px'}} /></td>
              </tr>
              <tr>
                <td colSpan="5" className={`accordion-body collapse ${activeVente === vente.id ? 'show' : ''}`} id={`collapse-${vente.id}`}>
                  <div className="table-responsive w-100">
                    <table className="table table-bordered w-100">
                      <thead>
                        <tr>
                          <th scope="col">Designation</th>
                          <th scope="col">Categorie</th>
                          <th scope="col">Quantite</th>
                          <th scope="col">Prix de vente</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vente.articles.map((article) => (
                          <tr key={article.id}>
                            <td>{article.designation}</td>
                            <td>{article.categorie}</td>
                            <td>{article.quantite}</td>
                            <td>{article.prixVente} Fcfa</td>
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

export default VenteTable;
