import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Select from 'react-select';


const FormEdit = () => {
    const [types, setTypes] = useState([]);
    const [type, setType] = useState('');
    const [articles, setArticles] = useState([]);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [selectedPrice, setSelectedPrice] = useState(0);
    const [selectedMagasin, setSelectedMagasin] = useState('');
    const [remisePercentage, setRemisePercentage] = useState(0);
    const [tvaPercentage, setTvaPercentage] = useState(18);
    const [fournisseurs, setFournisseurs] = useState([]);
    const [selectedFournisseur, setSelectedFournisseur] = useState('');
    const [selectedArticle, setSelectedArticle] = useState('');
    const [addedArticles, setAddedArticles] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [totalRemise, setTotalRemise] = useState(0);
  const [totalTva, setTotalTva] = useState(0);
  const [remiseTotalPourcent, setRemiseTotalPourcent] = useState(0);

  
    const { achatId } = useParams();
  const [editMode, setEditMode] = useState(false);
  
  useEffect(() => {
    if (achatId) {
      console.log(achatId)
      setEditMode(true);
      axios.get(`http://localhost:5001/api/achats/${achatId}`)
        .then(response => {
          const achatData = response.data;
          console.log("Données de l'achat existant :", achatData);
          setSelectedFournisseur(achatData.fournisseurId);
          setSelectedDate(achatData.dateAchat);
          setSelectedArticle(achatData.articleId); // Pré-remplir l'article sélectionné
          setSelectedQuantity(achatData.quantite); // Pré-remplir la quantité
          setSelectedPrice(achatData.prix); // Pré-remplir le prix
          // Pré-remplir d'autres champs du formulaire avec les données de l'achat
          // ...
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données de l\'achat:', error);
        });
    }
  }, [achatId]);
  
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

   
  const handleUpdate = async (event) => {
    event.preventDefault()
    try {
      // Construire les données mises à jour pour l'achat
      const updatedData = {
        fournisseurId: selectedFournisseur,
        dateAchat: selectedDate,
        articlesData: addedArticles, // Les articles modifiés
        montantTVA: totalTva.toFixed(2),
        tauxRemise: totalRemise.toFixed(2),
        montantTotal: montantTotalTTC.toFixed(2),
        remiseTotalPourcent: remiseTotal, // Remise totale en pourcentage
  
      };
  
      // Effectuer une requête PUT pour mettre à jour l'achat
      const response = await axios.put(`http://localhost:5001/api/achats/${achatId}`, updatedData);
  
      // Réinitialiser les états du formulaire après la mise à jour
      setSelectedFournisseur('');
      setSelectedDate('');
      setSelectedArticle('');
      setSelectedQuantity(1);
      setSelectedPrice(0);
      setType('');
      setAddedArticles([]);
      setRemisePercentage(0);
      setTvaPercentage(18);
      setRemiseTotalPourcent(0);
  
      // Afficher un message de succès
      toast.success('La mise à jour a été effectuée avec succès !');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'achat:', error);
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
      const articleToAdd = articles.find(
        (article) => article.designation === selectedArticle
      );
      if (articleToAdd) {
        const montantHorsTaxeArticle = selectedPrice * selectedQuantity;
        const remiseArticle = (montantHorsTaxeArticle * remisePercentage) / 100;
        const montantAvecRemiseArticle =
          montantHorsTaxeArticle - remiseArticle;
        const tvaArticle = (montantHorsTaxeArticle * tvaPercentage) / 100;
  
        const articleData = {
          articleId: articleToAdd.id,
          designation: articleToAdd.designation,
          caracteristique: articleToAdd.caracteristique,
          quantite: selectedQuantity,
          prix: selectedPrice,
          type: type,
          categorieId: articleToAdd.categorieId,
          remiseArticle: remiseArticle,
          tvaArticle: tvaArticle,
        };
  
        setAddedArticles((prevArticles) => [...prevArticles, articleData]);
  
        // Mettre à jour la somme totale des remises et de la TVA
        setTotalRemise((prevTotalRemise) => prevTotalRemise + remiseArticle);
        setTotalTva((prevTotalTva) => prevTotalTva + tvaArticle);
  
        // Réinitialiser les champs de remise et de TVA après l'ajout
        setRemisePercentage(0);
        setTvaPercentage(18);
        setSelectedArticle('');
        setSelectedQuantity(1);
        setSelectedPrice(0);
        setType('');
      }
    }
  };
  
  
    
    
  const handleDeleteArticle = (index) => {
    const deletedArticle = addedArticles[index];
    setTotalRemise((prevTotalRemise) => prevTotalRemise - deletedArticle.remiseArticle);
    setTotalTva((prevTotalTva) => prevTotalTva - deletedArticle.tvaArticle);
  
    const updatedArticles = addedArticles.filter((_, i) => i !== index);
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
    
    const handleRemisetotalChange = (event) => {
        setRemiseTotalPourcent(parseFloat(event.target.value));
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
    const tva = (montantHorsTaxe * tvaPercentage) / 100;
    const montantTotalTTC = (montantHorsTaxe - (montantHorsTaxe * remiseTotalPourcent / 100)) + totalTva;
  const remiseTotal =  (montantTotalTTC * remiseTotalPourcent) / 100;
  
    const bouStyle = {
      width: "27%" ,
      marginLeft:"387px",
      padding:"5px",
      marginBottom:"10px"
      };
  
  return (
    <div>
       <div className='content-header'>
       <h2 className='header'>Modifier un achat </h2>
     </div>
     <form className="" onSubmit={handleUpdate}>
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
    width: '42%',
    padding: '5px',
    borderRadius: '5px',
    marginLeft: '12px'
  }}    
>
  {fournisseurs.map(fournisseur => (
    fournisseur.id === selectedFournisseur ? (
      <option key={fournisseur.id} value={fournisseur.id}>
        {fournisseur.nom} {fournisseur.prenom}
      </option>
    ) : null
  ))}
  <option value="" disabled>Choisissez un fournisseur</option>
  {fournisseurs.map(fournisseur => (
    fournisseur.id !== selectedFournisseur ? (
      <option key={fournisseur.id} value={fournisseur.id}>
        {fournisseur.nom} {fournisseur.prenom}
      </option>
    ) : null
  ))}
</select>



          <div className="invalid-feedback" />
        </div>
      </div>
    <div className="col-md-6">
  <div className="d-flex align-items-center">
    <label className="form-label" style={{ color: 'black' }}>
      Date :
    </label>
    <div className="react-datepicker__input-container" 
      style={{ marginLeft: '12px', width: '80%' }}
    >
      <input
        type="date"
        className="form-control"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        style={{ width: '90%' }}
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
    <div style={{width:'70%'}}>
    <Select
      options={articles.map(article => ({
        value: article.designation,
        label: article.designation
      }))}
      styles={{
        control: (provided, state) => ({
          ...provided,
          width: '100%'
        }),
        // You can add more custom styles for other parts of the Select component
      }}
      value={{ value: selectedArticle, label: selectedArticle }}
      onChange={selectedOption => setSelectedArticle(selectedOption.value)}
      placeholder="Sélectionnez un article"
     
    />
  </div>
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
  style={{
    width: '60%',
    padding: '5px',
    borderRadius: '5px',
    marginLeft: '12px'
  }}
/>

                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-flex align-items-center">
                    <label className="form-label" style={{ color: 'black' }}>Groupe :</label>
                    <select
                      name="articleType"
                      className="form-select"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      style={{
                        width: '60%',
                        padding: '5px',
                        borderRadius: '5px',
                        marginLeft: '12px'
                      }}
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
                      style={{
                        width: '60%',
                        padding: '5px',
                        borderRadius: '5px',
                        marginLeft: '12px',
                        marginBottom:'15px'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-6">
              <div style={{marginLeft:'43px' , width:'50%'}}>
                  <label className="form-label">Remise 1 (%) :</label>
                  <input
                    type="number"
                    className="form-control"
                    value={remisePercentage}
                    onChange={handleRemiseChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
              <div style={{marginRight:'33px' , width:'60%' , float:'right'}}>
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
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                    <th scope="col">Designation</th>
              <th scope="col">Quantite</th>
              <th scope="col">Prix U HT</th>
              <th scope="col">Prix total HT</th>
              <th scope="col">Groupe d'article</th>
              <th scope="col">Article Remise</th>
              <th scope="col">Article TVA</th>
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

    <td>{article.remiseArticle.toFixed(2)} Fcfa</td>
    <td>{article.tvaArticle.toFixed(2)} Fcfa</td>
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
          <div className="col-12">
  <div className="mb-3 row justify-content-center">
    <div className="col-md-6">
      <div className="d-flex align-items-center justify-content-center">
        <label className="form-label" style={{ width: '25%' }}>Remise 2 (%) :</label>
                  <input
                    type="number"
                    className="form-control"
                    value={remiseTotalPourcent}
          onChange={handleRemisetotalChange}
                  />
                </div>
              </div>
              </div>
            </div>
          <div className="mb-3 card">
  <h6 className="bg-primary card-header " style={{ color: "white" }}>
    Gestion Prix
  </h6>
  <div className="card-body">
    {addedArticles.length > 0 ? (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Montant HT</th>
            <th scope="col">Total remise</th>
            <th scope="col">Montant TVA ({tvaPercentage}%)</th>
            <th scope="col">Montant net TTC</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{montantHorsTaxe.toFixed(2)} Fcfa</td>
            <td>{totalRemise.toFixed(2)} Fcfa</td>
            <td>{totalTva.toFixed(2)} Fcfa</td>
            <td>{montantTotalTTC.toFixed(2)} Fcfa</td>
          </tr>
        </tbody>
      </table>
    ) : (
      <p>Aucun article ajouté pour le moment.</p>
    )}
  </div>
</div>

            
            </div>
        </div>
        <button
  type="submit" 
  className="bouton"
  style={bouStyle}
>
  Mettre a jour 
</button>

      </form>

      <div>
      
      </div>
      <ToastContainer />

    </div>
  )
}

export default FormEdit
