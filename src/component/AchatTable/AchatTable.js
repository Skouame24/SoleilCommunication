import { faEye, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AchatTable = () => {
  const [activeAchat, setActiveAchat] = useState(null);
  const [achats, setAchats] = useState([]);
  const [fournisseurNoms, setFournisseurNoms] = useState({});
  const [fournisseurMap, setFournisseurMap] = useState({}); // Tableau pour stocker les fournisseurs par ID
  const [articleMap, setArticleMap] = useState({}); // Tableau pour stocker les articles par ID


  const navigate = useNavigate();

  const handleShareClick = (achatId) => {
    navigate(`/facture/${achatId}`);
  };

  useEffect(() => {
    axios.get('http://localhost:5001/api/achats')
      .then(response => {
        setAchats(response.data.achats);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des achats:', error);
      });
  }, []);

  useEffect(() => {
    const fetchFournisseurs = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/fournisseur');
        const fournisseurs = response.data.fournisseurs;
  
        // Créez un objet de mappage des fournisseurs par ID
        const fournisseurMap = {};
        for (const fournisseur of fournisseurs) {
          fournisseurMap[fournisseur.id] = fournisseur.nom;
        }
        
        setFournisseurMap(fournisseurMap);
      } catch (error) {
        console.error('Erreur lors de la récupération des fournisseurs:', error);
      }
    };
  
    fetchFournisseurs();
  }, []);
  
  useEffect(() => {
    // Récupérer les données des articles depuis votre API
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/articles');
        const articles = response.data.articles;

        // Créer un objet de mappage des articles par ID
        const articleMap = {};
        for (const article of articles) {
          articleMap[article.id] = article;
        }

        setArticleMap(articleMap);
      } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
      }
    };

    fetchArticles();
  }, []);
  // Fonction pour formater le prix d'achat avec 'Fcfa' à la fin
const getPrixAchat = (articleData) => {
  return `${articleData.prixAchat} Fcfa`;
};


  return (
    <div style={{ marginBottom: '20px' }}>
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
                  <td>Acht N°{achat.id}</td>
                  <td>{achat.montantTotal} Fcfa</td>
                  <td>{fournisseurMap[achat.fournisseurId]}</td>
                  <td>{new Date(achat.dateAchat).toLocaleDateString()}</td>
                  <td >
                    <FontAwesomeIcon icon={faEye} style={{ cursor: 'pointer', alignContent: 'center', textAlign: 'center' }} />
                    <Link to={`/facture/${achat.id}`}>
                    <FontAwesomeIcon
  icon={faShare}
  style={{ marginLeft: '25px', cursor: 'pointer' }}
  onClick={() => handleShareClick(achat.id)}
/>

                    </Link>                    </td>
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
                        {achat.articlesData.map((articleData) => (
                        <tr key={articleData.articleId}>
                        <td>{articleMap[articleData.articleId]?.designation}</td>
                          <td>
                            {articleMap[articleData.articleId]?.categorieId === 1 ? 'Informatique' :
                             articleMap[articleData.articleId]?.categorieId === 2 ? 'Fournitures' :
                             articleMap[articleData.articleId]?.categorieId === 3 ? 'Communication' : ''}
                          </td>
                          <td>{articleData.quantite}</td>
                          <td>{articleData.prix}Fcfa</td>
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
