import React, { useState, useEffect } from 'react';
import axios from 'axios';

const mapCategoryIdToName = (categoryId) => {
  switch (categoryId) {
    case 1:
      return 'Informatique';
    case 2:
      return 'Fournitures';
    case 3:
      return 'Communication';
    default:
      return 'Autre';
  }
};


const FormVente = () => {
  const [articlesData, setArticlesData] = useState([]);
const [articleDesignations, setArticleDesignations] = useState([]);
const [selectedQuantity, setSelectedQuantity] = useState(1);
const [selectedPrice, setSelectedPrice] = useState(0); // Ajout de l'état pour le prix de vente
const [typeArticles, setTypeArticles] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(''); // Définir selectedClient
  const [selectedSellingPrice, setSelectedSellingPrice] = useState(0);
  const [selectedDate, setSelectedDate] = useState(''); // Ajouter un état pour la date

  useEffect(() => {
    axios.get('http://localhost:5001/api/clients')
      .then(response => {
        console.log('Raw response:', response.data); // Vérifiez la réponse brute
        setClients(response.data.clients);
        console.log('Processed data:', clients); // Vérifiez les données après traitement
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des clients:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5001/api/type')
      .then(response => {
        setTypeArticles(response.data.typeArticles);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des types d\'articles :', error);
      });
  }, []);
  
  useEffect(() => {
    axios.get('http://localhost:5001/api/articles')
      .then(response => {
        const articlesData = response.data.articles;
        const designations = articlesData.map(article => article.designation);
        setArticlesData(articlesData); // Sauvegardez toutes les données des articles si nécessaire
        setArticleDesignations(designations);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des désignations d\'articles:', error);
      });
  }, []);
 

  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState('');
  const [remisePercentage, setRemisePercentage] = useState(0);
  const [tvaPercentage, setTvaPercentage] = useState(20);

  const handleArticleChange = (event) => {
    setSelectedArticle(event.target.value);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    // Calcul de la remise en fonction du montant avec remise et de la TVA
    const remiseMontant = montantAvecRemise * (remisePercentage / 100);
  
    // Créez l'objet de données à envoyer au backend
    const venteData = {
      clientId: selectedClient,
      articleData: articles.map((article) => ({
        quantite: article.quantite,
        articleId: article.id,
        prixVente: article.prix, // Utilisation du prix de vente de l'article
      })),
  
      tauxRemise: remiseMontant, // Utilisation du montant de la remise calculé
      montantTVA: tva,
      prixVente: selectedPrice,
      dateVente: selectedDate,
      montantTotal: montantTotalTTC,
    };
    
    console.log(venteData);
  
    try {
      // Envoyez les données au backend
      const response = await axios.post('http://localhost:5001/api/ventes', venteData);
      console.log('Réponse du serveur:', response.data);
  
      // Réinitialisez les états et les champs du formulaire après l'envoi
      setSelectedClient('');
      setArticles([]);
      setSelectedArticle('');
      setSelectedQuantity(1);
      setSelectedPrice(0);
      setRemisePercentage(0);
      setTvaPercentage(20);
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données:', error);
    }
  };
  const handleQuantityChange = (event) => {
    setSelectedQuantity(parseInt(event.target.value));
  };
  
  const mapTypeArticleIdToName = (typeArticleId) => {
    const typeArticle = typeArticles.find(type => type.id === typeArticleId);
    return typeArticle ? typeArticle.nom : 'Inconnu';
  };
  

  const handleAddToTable = () => {
    if (selectedArticle && selectedQuantity > 0) {
      const articleToAdd = articlesData.find(
        (article) => article.designation === selectedArticle
      );
      if (articleToAdd) {
        setArticles((prevArticles) => [
          ...prevArticles,
          { ...articleToAdd, quantite: selectedQuantity, prix: selectedPrice } // Ajout du prix
        ]);
        setSelectedArticle('');
        setSelectedQuantity(1);
        setSelectedPrice(0);
      }
    }
  };
  
  
  const handleClientChange = (event) => {
  setSelectedClient(event.target.value);
  console.log(selectedClient)
};

  const handleRemoveFromTable = (articleId) => {
    setArticles((prevArticles) =>
      prevArticles.filter((article) => article.id !== articleId)
    );
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
  const bouStyle = {
    width: "27%" ,
    marginLeft:"387px",
    padding:"5px",
    marginBottom:"10px"
    };


  return (
    <div>
       <div className='content-header'>
       <h2 className='header'>Enregistrer une vente </h2>
     </div>
      <form className="" onSubmit={handleFormSubmit}>
        <div className="g-3 row">
          <div className="col-lg-12">
            <div className="mb-3 card">
              <div className="mb-3 card">
                <h6 className="bg-primary card-header" style={{color:'white'}}>Details client</h6>
                <div className="card-body">
  <div className="gx-2 gy-3 row">
  <div className="col-md-6">
        <div className="d-flex align-items-center">
          <label className="form-label" style={{ color: 'black' }}>Client:</label>
          <select
  name="importStatus"
  className="form-select"
  value={selectedClient}
  onChange={handleClientChange} 
  style={{
    width: '76%',
    padding: '5px',
    borderRadius: '5px',
    marginLeft: '12px'
  }}
>
  <option value="">Select</option>
  {clients.map(client => (
    <option key={client.id} value={client.id}>
      {client.nom} {client.prenom}
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
        value={selectedDate} // Utiliser la valeur de l'état selectedDate
        onChange={(event) => setSelectedDate(event.target.value)} // Mettre à jour l'état lorsque la date est sélectionnée
      />
    </div>
  </div>
</div>

  </div>
</div>
              </div>
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h6 className="" style={{color:'#222'}}>Article information</h6>
                <input type="button" value="Ajouter " className="bouton" onClick={handleAddToTable} />
              </div>
              <div className="card-body">
  <div className="row gx-2 gy-3">
    <div className="col-md-4">
      <div className="d-flex align-items-center">
        <label className="form-label" style={{color:'#222'}}>Article :</label>
        <select

  name="importStatus"
  className="form-select"
  value={selectedArticle}
  onChange={handleArticleChange}
  style={{
    width: '60%',
    padding: '5px',
    borderRadius: '5px',
    marginLeft: '12px'
  }}
>
  <option value="">Select</option>
  {articleDesignations.map((designation, index) => (
    <option key={index} value={designation}>
      {designation}
    </option>
  ))}
</select>

        <div className="invalid-feedback" />
      </div>
    </div>
    <div className="col-md-4">
  <div className="d-flex align-items-center ">
    <label className="form-label" style={{ color: 'black' }}>
      Quantité :
    </label>
    <input
      type="number"
      className="form-control"
      value={selectedQuantity}
      onChange={handleQuantityChange}
      style={{
        width: '60%',
        padding: '5px',
        borderRadius: '5px',
        marginLeft: '12px'
      }}
    />
  </div>
</div>
<div className="col-md-4">
  <div className="d-flex align-items-center">
    <label className="form-label" style={{ color: 'black' }}>
      Prix de vente :
    </label>
    <input
      type="number"
      className="form-control"
      value={selectedPrice}
      onChange={(event) => setSelectedPrice(parseFloat(event.target.value))}
      style={{
        width: '60%',
        padding: '5px',
        borderRadius: '5px',
        marginLeft: '12px'
      }}
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
                <td>{mapTypeArticleIdToName(article.typeArticleId)}</td>
                <td>{mapCategoryIdToName(article.categorieId)}</td> {/* Utilisation de la fonction ici */}
                <td className="text-end d-flex align-items-center justify-content-space-around">
                  <i className="fas fa-trash-alt"
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                  onClick={() => handleRemoveFromTable(article.id)}></i>
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
        <button type="submit" className="bouton" style={bouStyle}>
  Enregistrer
</button>
      </form>
    </div>
  );
};

export default FormVente