import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateArticle = () => {
  const [designation, setDesignation] = useState('');
  const [caracteristique, setCaracteristique] = useState('');
  const [quantite, setQuantite] = useState('');
  const [categorie, setCategorie] = useState('');
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [type, setType] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5001/api/categories')
      .then(response => {
        setCategories(response.data.categories);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des catégories :', error);
      });

    axios.get('http://localhost:5001/api/type')
      .then(response => {
        setTypes(response.data.typeArticles);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des types d\'articles :', error);
      });

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construire l'objet de données à envoyer au backend
    const requestData = {
      designation,
      caracteristique,
      quantite,
      entreeDirecte: true,
      entreeIndirecte: false,
      sortieDirecte: false,
      sortieIndirecte: false,
      prixAchat: null, // Définir le prix d'achat à null pour une entrée directe
      boutiqueId: 1, // Remplacez par l'ID de la boutique
      categorieId: parseInt(categorie), // Convertir en nombre
      typeArticleId: parseInt(type), // Convertir en nombre
    };
    console.log(requestData)

    // Envoyez les données au serveur ici (utilisez l'URL appropriée)
    axios.post('http://localhost:5001/api/articles', requestData)
    .then(response => {
      setDesignation('');
      setCaracteristique('');
      setQuantite('');
      setCategorie('');
      setType('');

      // Afficher un toast de succès
      toast.success('Article enregistré avec succès', {
        position: toast.POSITION.TOP_RIGHT
      });
    })
    .catch(error => {
      console.error('Erreur lors de l\'envoi des données :', error);

      // Afficher un toast d'erreur
      toast.error('Une erreur est survenue lors de l\'enregistrement de l\'article', {
        position: toast.POSITION.TOP_RIGHT
      });
    });
};

  const bouStyle = {
    width: "27%" ,
    marginLeft:"340px",
    padding:"5px",
    };
  return (
    <div>
      <div className='content-header' style={{ marginBottom: "9px" }}>
        <h2 className='header' style={{ marginLeft: "129px" }}>Formulaire d'enregistrement d'un article </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="g-3 row">
          <div className="col-xl-12">
            <div className="card mb-4">
              <div className="bg-primary card-header" style={{color:'white'}}>Details Article</div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputDesignation">
                    Designation
                  </label>
                  <input
                    className="form-control"
                    id="inputDesignation"
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="Entrer la désignation"
                    required
                  />
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputCaracteristique">
                      Caracteristique
                    </label>
                    <input
                      className="form-control"
                      id="inputCaracteristique"
                      type="text"
                      value={caracteristique}
                      onChange={(e) => setCaracteristique(e.target.value)}
                      placeholder="Entrer la caractéristique"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputQuantite">
                      Quantite
                    </label>
                    <input
                      className="form-control"
                      id="inputQuantite"
                      type="number"
                      value={quantite}
                      onChange={(e) => setQuantite(e.target.value)}
                      placeholder="Entrer la quantité"
                      required
                    />
                  </div>
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputCategorie">
                      Select Categorie
                    </label>
                    <select
                      className="form-control"
                      id="inputCategorie"
                      value={categorie}
                      onChange={(e) => setCategorie(e.target.value)}
                      required
                    >
                      <option value="" disabled>Choisissez une catégorie</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.nom}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputType">
                      Type d'article
                    </label>
                    <select
                      className="form-control"
                      id="inputType"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      required
                    >
                      <option value="" disabled>Choisissez un type d'article</option>
                      {types.map(articleType => (
                        <option key={articleType.id} value={articleType.id}>{articleType.nom}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button className="bouton" type="submit" style={bouStyle}>
            Enregistrer
          </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateArticle;
