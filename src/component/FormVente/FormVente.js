import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const FormVente = () => {
  const articlesData = [
    { id: 1, designation: "Iphone X", categorie: "Téléphones", quantite: 12, prix: "145000", magasin: "Magasin 1" },
    { id: 2, designation: "Samsung Galaxy S21", categorie: "Téléphones", quantite: 8, prix: "135000", magasin: "Magasin 1" },
    { id: 3, designation: "AirPods Pro", categorie: "Accessoires", quantite: 20, prix: "70000", magasin: "Magasin 3" },
    { id: 4, designation: "Câble USB-C", categorie: "Connecteurs", quantite: 30, prix: "15000", magasin: "Magasin 1" },
    { id: 5, designation: "Disque Dur Externe", categorie: "Stockages", quantite: 5, prix: "80000", magasin: "Magasin 3" },
    { id: 6, designation: "Chargeur sans fil", categorie: "Accessoires", quantite: 15, prix: "35000", magasin: "Magasin 2" },
    { id: 7, designation: "Casque Bluetooth", categorie: "Accessoires", quantite: 10, prix: "60000", magasin: "Magasin 2" },
    { id: 8, designation: "Ordinateur portable", categorie: "Ordinateurs", quantite: 6, prix: "800000", magasin: "Magasin 2" },
    { id: 9, designation: "Clavier sans fil", categorie: "Accessoires", quantite: 10, prix: "40000", magasin: "Magasin 2" },
    { id: 10, designation: "Souris optique", categorie: "Accessoires", quantite: 15, prix: "25000", magasin: "Magasin 1" },
    { id: 11, designation: "Imprimante laser", categorie: "Accessoires", quantite: 3, prix: "200000", magasin: "Magasin 3" },
    { id: 12, designation: "Stylos", categorie: "Fournitures de bureau", quantite: 50, prix: "5000", magasin: "Magasin 3" },
    { id: 13, designation: "Cahiers", categorie: "Fournitures de bureau", quantite: 30, prix: "3000", magasin: "Magasin 1" },
    { id: 14, designation: "Agrafeuses", categorie: "Fournitures de bureau", quantite: 15, prix: "10000", magasin: "Magasin 3" },
    // Ajoutez ici les informations des autres articles...
  ];

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [remisePercentage, setRemisePercentage] = useState(0);
  const [tvaPercentage, setTvaPercentage] = useState(20);

  const handleArticleChange = (event) => {
    setSelectedArticle(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setSelectedQuantity(parseInt(event.target.value));
  };

  const handleAddToTable = () => {
    if (selectedArticle && selectedQuantity > 0) {
      const articleToAdd = articlesData.find((article) => article.designation === selectedArticle);
      if (articleToAdd) {
        setArticles((prevArticles) => [
          ...prevArticles,
          { ...articleToAdd, quantite: selectedQuantity },
        ]);
        setSelectedArticle('');
        setSelectedQuantity(1);
      }
    }
  };

  const handleRemiseChange = (event) => {
    setRemisePercentage(parseFloat(event.target.value));
  };

  const handleTvaChange = (event) => {
    setTvaPercentage(parseFloat(event.target.value));
  };

  const montantHorsTaxe = articles.reduce(
    (total, article) => total + parseFloat(article.prix) * article.quantite,
    0
  );
  const remise = (montantHorsTaxe * remisePercentage) / 100;
  const montantAvecRemise = montantHorsTaxe - remise;
  const tva = (montantAvecRemise * tvaPercentage) / 100;
  const montantTotalTTC = montantAvecRemise + tva;

  return (
    <div>
       <div className='content-header'>
       <h2 className='header'>Enregistrer une vente </h2>
     </div>
      <form className="" onSubmit={handleFormSubmit}> {/* Add onSubmit event handler */}
        <div className="g-3 row">
          <div className="col-lg-12">
            <div className="mb-3 card">
              <div className="mb-3 card">
                <h6 className="bg-primary card-header" style={{color:'white'}}>Details Fournisseur</h6>
                <div className="card-body">
  <div className="gx-2 gy-3 row">
    <div className="col-md-6">
      <div className="d-flex align-items-center">
        <label className="form-label" style={{color:'black'}}>Fournisseur:</label>
        <select name="importStatus" className="form-select" style={{
            width:'76%',
            padding:'5px',
            borderRadius:"5px",
            marginLeft:"12px"
          }}>
          <option value="">Select</option>
          <option value="imported">Fournisseur 1</option>
          <option value="processing">Fournisseur 2</option>
          <option value="validating">Fournisseur 3</option>
        </select>
        <div className="invalid-feedback" />
      </div>
    </div>
    <div className="col-md-6">
      <div className="d-flex align-items-center">
        <label className="form-label" style={{color:'black'}}>
          Date :
        </label>
        <div className="react-datepicker__input-container" 
         style={{marginLeft:'12px', width:'80%'}}
          >
          <input
            type="date"
            className="form-control"
            defaultValue=""
          />
        </div>
      </div>
    </div>
  </div>
</div>
              </div>
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h6 className="" style={{color:'#222'}}>Article information</h6>
                <input type="submit" value="Ajouter " className="bouton" onClick={handleAddToTable} />
              </div>
              <div className="card-body">
  <div className="row gx-2 gy-3">
    <div className="col-md-6">
      <div className="d-flex align-items-center">
        <label className="form-label" style={{color:'#222'}}>Article :</label>
        <select
          name="importStatus"
          className="form-select"
          value={selectedArticle}
          onChange={handleArticleChange}
          style={{
            width:'80%',
            padding:'5px',
            borderRadius:"5px",
            marginLeft:"12px"
          }}
        >
          <option value="">Select</option>
          {articlesData.map((article) => (
            <option key={article.id} value={article.designation}>
              {article.designation}
            </option>
          ))}
        </select>
        <div className="invalid-feedback" />
      </div>
    </div>
    <div className="col-md-6">
      <div className="d-flex align-items-center ">
        <label className="form-label" style={{color:'black'}}>Quantité :</label>
        <select
          name="quantity"
          className="form-select selectionne"
          value={selectedQuantity}
          onChange={handleQuantityChange}
          style={{
            width:'80%',
            padding:'5px',
            borderRadius:"5px",
            marginLeft:"12px"
          }}
          
        >
          <option value="">Select</option>
          {[...Array(10)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        <div className="invalid-feedback" />
      </div>
    </div>
  </div>
</div>

              <div className="card-body">
                <table className="table">
                  <thead>
                  <tr>
              <th scope="col">Designation</th>
              <th scope="col">Quantite</th>
              <th scope="col">Prix Unitaire</th>
              <th scope="col">Prix total</th>
              <th scope="col">Magasin</th>
              <th scope="col">Categorie</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="align-middle">
                <td>{article.designation}</td>
                <td>{article.quantite}</td>
                <td>{article.prix} Fcfa</td>
                <td>{(parseFloat(article.prix) * article.quantite).toFixed(2)} Fcfa</td>
                <td>{article.magasin}</td>
                <td>{article.categorie}</td>
                <td className="text-end d-flex align-items-center justify-content-space-around">
                  <i className="fas fa-trash-alt" style={{ marginLeft: '10px', cursor: 'pointer' }}></i>
                  {/* Icône de suppression */}
                  <i className="fas fa-edit" style={{ marginLeft: '20px', cursor: 'pointer' }}></i>
                  {/* Icône de modification */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
              </div>
            </div>
          </div>
          <div className="col-12">
          <div className="mb-3 row">
              <div className="col-md-6">
                <div>
                  <label className="form-label">Remise (%) :</label>
                  <input
                    type="number"
                    className="form-control"
                    value={remisePercentage}
                    onChange={handleRemiseChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <label className="form-label">TVA (%) :</label>
                  <input
                    type="number"
                    className="form-control"
                    value={tvaPercentage}
                    onChange={handleTvaChange}
                  />
                </div>
              </div>
            </div>
          <div className="mb-3 card">
          <h6 className="bg-primary card-header " style={{color:"white"}}>Gestion Prix</h6>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Montant hors taxe</th>
                      <th scope="col">Remise</th>
                      <th scope="col">Montant avec remise</th>
                      <th scope="col">TVA ({tvaPercentage}%)</th>
                      <th scope="col">Montant total TTC</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{montantHorsTaxe.toFixed(2)} Fcfa</td>
                      <td>{remise.toFixed(2)} Fcfa</td>
                      <td>{montantAvecRemise.toFixed(2)} Fcfa</td>
                      <td>{tva.toFixed(2)} Fcfa</td>
                      <td>{montantTotalTTC.toFixed(2)} Fcfa</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            </div>
        </div>
      </form>
    </div>
  );
};

export default FormVente