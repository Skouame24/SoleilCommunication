import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';



const FormEditVente = () => {
    const [articlesData, setArticlesData] = useState([]);
    const [articleDesignations, setArticleDesignations] = useState([]);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [selectedPrice, setSelectedPrice] = useState(0); // Ajout de l'état pour le prix de vente
    const [typeArticles, setTypeArticles] = useState([]);
      const [clients, setClients] = useState([]);
      const [selectedClient, setSelectedClient] = useState(''); // Définir selectedClient
      const [selectedSellingPrice, setSelectedSellingPrice] = useState(0);
      const [selectedDate, setSelectedDate] = useState(''); // Ajouter un état pour la date
      const [error, setError] = useState('');
      const [successMessage, setSuccessMessage] = useState('');
      const [addedArticles, setAddedArticles] = useState([]);
      const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState('');
  const [remisePercentage, setRemisePercentage] = useState(0);
  const [tvaPercentage, setTvaPercentage] = useState(18);
  const [remiseTotalPourcent, setRemiseTotalPourcent] = useState(0);

  const { venteId } = useParams();
  const navigate = useNavigate();


  const handleArticleChange = (event) => {
    setSelectedArticle(event.target.value);
  };
  
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


  useEffect(() => {
    if (venteId) {
      console.log(venteId);
      axios.get(`http://localhost:5001/api/ventes/${venteId}`) // Replace with your API route for fetching a vente
        .then(response => {
          const venteData = response.data;
          console.log("Données de la vente existante :", venteData)
          
          // Pre-fill other form fields with venteData properties
          // ...
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données de la vente :', error);
        });
    }
  }, [venteId]);
  
  const handleUpdate = async (event) => {
    event.preventDefault()
    try {
         // Calcul du montant total de la TVA à partir des articles ajoutés
    const totalTva = addedArticles.reduce(
        (total, article) => total + article.tvaArticle,
        0
      );
    
      const updatedData = {
        clientId: selectedClient,
        articleData: addedArticles.map((article) => ({
          quantite: article.quantite,
          articleId: article.id,
          prixVente: article.prix,
          remiseArticle: article.remiseArticle,
          tvaArticle: article.tvaArticle,
        })),
        tauxRemise: totalRemise.toFixed(2),
        montantTVA: totalTva.toFixed(2),
        prixVente: selectedPrice,
        dateVente: selectedDate,
        montantTotal: montantTotalTTC.toFixed(2),
        remiseTotalPourcent:remiseTotal

      };
  
      const response = await axios.put(`http://localhost:5001/api/ventes/${venteId}`, updatedData);
  
// Rediriger vers la page /etatVente après la mise à jour réussie
  
      // Gérer la réponse et les actions après la mise à jour
    setSuccessMessage(response.data.message);
    toast.success(response.data.message);

    
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la vente:', error);
    // Gérer l'erreur ici
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
            // Calcul de la remise pour l'article
            const montantHorsTaxeArticle = selectedPrice * selectedQuantity;
            const remiseArticle = (montantHorsTaxeArticle * remisePercentage) / 100;
      
            // Calcul de la TVA pour l'article
            const montantAvecRemiseArticle = montantHorsTaxeArticle - remiseArticle;
            const tvaArticle = (montantHorsTaxeArticle * tvaPercentage) / 100;
      
            // Ajout de l'article avec les calculs de remise et de TVA
            setAddedArticles((prevArticles) => [
              ...prevArticles,
              {
                ...articleToAdd,
                quantite: selectedQuantity,
                prix: selectedPrice,
                remiseArticle: remiseArticle,
                tvaArticle: tvaArticle
              }
            ]);
      
            // Réinitialisation des valeurs de remise et de TVA après l'ajout
            setRemisePercentage(0);
            setTvaPercentage(18);
      
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
  
  const handleRemoveFromTable = (index) => {
    setAddedArticles((prevArticles) =>
      prevArticles.filter((article, i) => i !== index)
    );
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
  
    const totalRemise = addedArticles.reduce(
      (total, article) => total + article.remiseArticle,
      0
    );
    const tva = addedArticles.reduce(
      (total, article) => total + article.tvaArticle,
      0
    );
     // Calcul du montant total TTC
const montantTotalTTC = montantHorsTaxe - totalRemise + tva;

// Calcul de la remise totale en fonction du montant total TTC et du pourcentage de remise
const remiseTotal = (montantTotalTTC * remiseTotalPourcent) / 100;
 console.log(remiseTotal)

  const montantTotalRemise = montantTotalTTC - remiseTotal
  console.log(montantTotalRemise)

  
    
    const bouStyle = {
      width: "27%" ,
      marginLeft:"387px",
      padding:"5px",
      marginBottom:"10px"
      };
  
  

  return (
    <div>
    <div className='content-header'>
    <h2 className='header'>Modifier une vente </h2>
  </div>
   <form className="" onSubmit={handleUpdate}>
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
 width: '42%',
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
<div className="d-flex align-items-center" style={{marginLeft:'145px'}}>
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
     style={{width:'90%'}}
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
    <div style={{width:'80%'}}>
    <Select
      name="importStatus"
      className="form-select"
      value={{ value: selectedArticle, label: selectedArticle }}
      onChange={selectedOption => setSelectedArticle(selectedOption.value)}
      styles={{
        control: (provided, state) => ({
          ...provided,
          width: '80%',
          height:20,
          padding: '0px',
          borderRadius: '5px',
          marginLeft: '12px'
        }),
        // Vous pouvez personnaliser d'autres parties du Select ici si nécessaire
      }}
      options={articleDesignations.map((designation, index) => ({
        value: designation,
        label: designation
      }))}
      placeholder="Sélectionnez"
    />
   </div>
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
<div className="mb-3 row">
           <div className="col-md-6">
             <div style={{marginLeft:'43px' , width:'50%'}}>
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
         <td>
           {(parseFloat(article.prix) * article.quantite).toFixed(2)} Fcfa
         </td>
         <td>{mapTypeArticleIdToName(article.typeArticleId)}</td>
         <td>{article.remiseArticle.toFixed(2)} Fcfa</td>
         <td>{article.tvaArticle.toFixed(2)} Fcfa</td>
         <td>
           <i
       className="fas fa-trash-alt"
       style={{ marginLeft: '10px', cursor: 'pointer' }}
       onClick={() => handleRemoveFromTable(index)}
     ></i>
           <i
             className="fas fa-edit"
             style={{ marginLeft: '20px', cursor: 'pointer' }}
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
       <div className="mb-3 card">
       <h6 className="bg-primary card-header " style={{color:"white"}}>Gestion Prix</h6>
           <div className="card-body">
             <table className="table">
               <thead>
                 <tr>
                   <th scope="col">Montant HT</th>
                   <th scope="col">Total remise</th>
                   <th scope="col">Montant TVA</th>
                   <th scope="col">Montant net TTC</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td>{montantHorsTaxe.toFixed(2)} Fcfa</td>
                   <td>{totalRemise.toFixed(2)} Fcfa</td>
                   <td>{tva.toFixed(2)} Fcfa</td>
                   <td>{montantTotalRemise.toFixed(2)} Fcfa</td>
                 </tr>
               </tbody>
             </table>
           </div>
         </div>
         
         </div>
     </div>
     <button type="submit" className="bouton" style={bouStyle}>
Mettre a jour 
</button>
   </form>
   <ToastContainer />

 </div>
  )
}

export default FormEditVente
