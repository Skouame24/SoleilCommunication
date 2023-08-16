import React, { useState, useEffect } from 'react';

import axios from 'axios';

const FormAchat = () => {
  const [types, setTypes] = useState([]);
  const [type, setType] = useState('');
  const [articles, setArticles] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedMagasin, setSelectedMagasin] = useState('');
  const [remisePercentage, setRemisePercentage] = useState(0);
  const [tvaPercentage, setTvaPercentage] = useState(20);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [selectedFournisseur, setSelectedFournisseur] = useState('');
  const [selectedArticle, setSelectedArticle] = useState('');
  const [addedArticles, setAddedArticles] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');


  useEffect(() => {
    axios.get('http://localhost:5001/api/type')
      .then(response => {
        setTypes(response.data.typeArticles);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des types d\'articles :', error);
      });

    axios.get('http://localhost:5001/api/articles')
      .then(response => {
        setArticles(response.data.articles);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des articles :', error);
      });

    axios.get('http://localhost:5001/api/fournisseur')
      .then(response => {
        setFournisseurs(response.data.fournisseurs);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des fournisseurs :', error);
      });
  }, []);

  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const venteData = {
        fournisseurId: selectedFournisseur,
        dateAchat: selectedDate,
        articlesData: addedArticles, // Assurez-vous que addedArticles est correctement formaté
        montantTVA: tva.toFixed(2),
        tauxRemise: montantAvecRemise,
        montantTotal: montantTotalTTC.toFixed(2),
      };
  
      console.log("Données à envoyer au serveur :", venteData);
  
      const response = await axios.post('http://localhost:5001/api/achats', venteData);
  
      // Réinitialisation du formulaire après avoir envoyé les données
      setSelectedFournisseur('');
      setSelectedDate('');
      setAddedArticles([]);
      setRemisePercentage(0);
      setTvaPercentage(20);
      setSelectedArticle('');
      setSelectedQuantity(1);
      setSelectedPrice(0);
      setType('');
  
      console.log('Achat créé avec succès:', response.data);
    } catch (error) {
      console.error('Erreur lors de la création de l\'achat:', error);
      // Gérer l'erreur ici
    }
  };
  
  
  
  

  const handleAddToTable = () => {
    if (
      selectedArticle &&

      !isNaN(selectedQuantity) &&
      selectedQuantity > 0 &&
      selectedPrice > 0
    ) {
      const articleToAdd = articles.find((article) => article.designation === selectedArticle);
      if (articleToAdd) {
        console.log("Article to add to addedArticles:", articleToAdd);
  
        const articleData = {
          articleId: articleToAdd.id,
          designation: articleToAdd.designation,
          caracteristique: articleToAdd.caracteristique,
          quantite: selectedQuantity,
          prix: selectedPrice,
          type: type,
          categorieId: articleToAdd.categorieId, // Ajouter l'ID de catégorie
        };
  
        setAddedArticles((prevArticles) => [...prevArticles, articleData]);
  
        setSelectedArticle('');
        setSelectedQuantity(1);
        setSelectedPrice(0);
        setType('');
      }
    }
  };
  
  
  const handleDeleteArticle = (index) => {
    const updatedArticles = [...addedArticles];
    updatedArticles.splice(index, 1);
    setAddedArticles(updatedArticles);
  };
  
  const handleEditArticle = (index) => {
    const articleToEdit = addedArticles[index];
    setSelectedArticle(articleToEdit.designation);
    setSelectedQuantity(articleToEdit.quantite);
    setSelectedPrice(articleToEdit.prix);
    setType(articleToEdit.type);
    // Vous pouvez également restaurer d'autres propriétés de l'article si nécessaire
  };
  
  

  const handleRemiseChange = (event) => {
    setRemisePercentage(parseFloat(event.target.value));
  };

  const handleTvaChange = (event) => {
    setTvaPercentage(parseFloat(event.target.value));
  };

  const montantHorsTaxe = addedArticles.reduce(
    (total, article) => total + parseFloat(article.prix) * article.quantite,
    0
  );
  const remise = (montantHorsTaxe * remisePercentage) / 100;
  const montantAvecRemise = montantHorsTaxe - remise;
  const tva = (montantAvecRemise * tvaPercentage) / 100;
  const montantTotalTTC = montantAvecRemise + tva;

  const bouStyle = {
    width: "27%" ,
    marginLeft:"387px",
    padding:"5px",
    marginBottom:"10px"
    };

  return (
    <div>
       <div className='content-header'>
       <h2 className='header'>Enregistrer un achat </h2>
     </div>
     <form className="" onSubmit={handleFormSubmit}>
        <div className="g-3 row">
          <div className="col-lg-12">
            <div className="mb-3 card">
              <div className="mb-3 card">
                <h6 className="bg-primary card-header" style={{color:'white'}}>Details Fournisseur</h6>
                <div className="card-body">
  <div className="gx-2 gy-3 row">
  <div className="col-md-6">
        <div className="d-flex align-items-center">
          <label className="form-label" style={{ color: 'black' }}>Fournisseur :</label>
          <select
  name="fournisseur"
  className="form-select"
  value={selectedFournisseur}
  onChange={(e) => setSelectedFournisseur(e.target.value)}   
   style={{
    width: '76%',
    padding: '5px',
    borderRadius: '5px',
    marginLeft: '12px'
  }}     
>
  <option value="" disabled>Choisissez un fournisseur</option>
  {fournisseurs.map(fournisseur => (
    <option key={fournisseur.id} value={fournisseur.id}>
      {fournisseur.nom} {fournisseur.prenom}
    </option>
  ))}
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
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)} 
      />
    </div>
  </div>
</div>

  </div>
</div>
              </div>
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h6 className="" style={{ color: '#222' }}>Article information</h6>
              <input
                type="button"
                value="Ajouter"
                className="bouton"
                onClick={handleAddToTable}
                disabled={!selectedArticle || selectedQuantity <= 0 || selectedPrice <= 0 }

              />
            </div>
            <div className="card-body">
              <div className="row gx-2 gy-3">
                <div className="col-md-3">
                  <div className="d-flex align-items-center">
                    <label className="form-label" style={{ color: '#222' }}>Article :</label>
                    <select
                      name="importStatus"
                      className="form-select"
                      value={selectedArticle}
                      onChange={(e) => setSelectedArticle(e.target.value)}
                    >
                      <option value="">Sélectionnez un article</option>
                      {articles.map((article) => (
                        <option key={article.id} value={article.designation}>
                          {article.designation}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-flex align-items-center">
                    <label className="form-label" style={{ color: 'black' }}>Quantité :</label>
                    <input
  type="number"
  className="form-control"
  value={isNaN(selectedQuantity) ? '' : selectedQuantity} // Handle NaN case
  onChange={(e) => setSelectedQuantity(parseInt(e.target.value, 10))}
/>

                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-flex align-items-center">
                    <label className="form-label" style={{ color: 'black' }}>Type :</label>
                    <select
                      name="articleType"
                      className="form-select"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="" disabled>Choisissez un type d'article</option>
                      {types.map(articleType => (
                        <option key={articleType.id} value={articleType.nom}>
                          {articleType.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-flex align-items-center">
                    <label className="form-label" style={{ color: 'black', paddingBottom: "10px" }}>Prix :</label>
                    <input
                      type="number"
                      className="form-control"
                      value={selectedPrice}
                      onChange={(e) => setSelectedPrice(parseFloat(e.target.value))}
                    />
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
              <th scope="col">TypeArticle</th>
              <th scope="col">Categorie</th>
              <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
  {addedArticles.map((article, index) => (
    <tr key={index}>
      <td>{article.designation}</td>
      <td>{article.quantite}</td>
      <td>{article.prix} Fcfa</td>
      <td>{(parseFloat(article.prix) * article.quantite).toFixed(2)} Fcfa</td>
      <td>{article.type}</td>
      <td>
        {article.categorieId === 1 ? 'Informatique' :
          article.categorieId === 2 ? 'Fournitures' :
            article.categorieId === 3 ? 'Communication' : ''}
      </td>
      <td>
        <i
          className="fas fa-trash-alt"
          style={{ marginLeft: '10px', cursor: 'pointer' }}
          onClick={() => handleDeleteArticle(index)}
        ></i>
        <i
          className="fas fa-edit"
          style={{ marginLeft: '20px', cursor: 'pointer' }}
          onClick={() => handleEditArticle(index)}
        ></i>
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
        <button
  type="submit" 
  className="bouton"
  style={bouStyle}
>
  Enregistrer
</button>
      </form>

      <div>
      
      </div>
    </div>
  );
};

export default FormAchat