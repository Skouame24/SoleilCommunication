import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faShare } from '@fortawesome/free-solid-svg-icons';

const AchatTable = () => {
  const [activeAchat, setActiveAchat] = useState(null);
  const [achats, setAchats] = useState([]);
  const [fournisseurNoms, setFournisseurNoms] = useState({});
  const [fournisseurMap, setFournisseurMap] = useState({});
  const [articleMap, setArticleMap] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const navigate = useNavigate();

  const handleShareClick = (achatId) => {
    navigate(`/facture/${achatId}`);
  };

  const handleEditClick = (achatId) => {
    navigate(`/editer-achat/${achatId}`); // Remplacez avec l'URL appropriée pour l'édition
  };
  
  useEffect(() => {
    axios.get('http://localhost:5001/api/achats')
      .then(response => {
        const sortedAchats = response.data.achats.sort((a, b) => a.id - b.id);
        setAchats(sortedAchats);
        console.log(sortedAchats)
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
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/articles');
        const articles = response.data.articles;

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
    if (articleData && articleData.articlesData && articleData.articlesData.length > 0) {
      const prixAchat = articleData.articlesData[0].prix;
      return `${prixAchat} Fcfa`;
    } else {
      return 'Prix non disponible';
    }
  };
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAchats = achats.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div style={{ marginBottom: '20px' }}>
      <div className="mb-0 card">
        <div className="border-bottom card-header  bg-primary " style={{color:'white'}}>
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
              <th scope="col">Date achat</th>
              <th scope="col">Fournisseur</th>
              <th scope="col">Montant Net TTC</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
  {currentAchats.map((achat) => (
    <React.Fragment key={achat.id}>
      <tr className="accordion-toggle" data-bs-toggle="collapse" data-bs-target={`#collapse-${achat.id}`} aria-expanded={activeAchat === achat.id} onClick={() => setActiveAchat(activeAchat === achat.id ? null : achat.id)}>
        <td> N°{achat.id}</td>
        <td>{new Date(achat.dateAchat).toLocaleDateString()}</td>
        <td>{fournisseurMap[achat.fournisseurId]}</td>
        <td>{achat.montantTotal} Fcfa</td>
        <td >
          <FontAwesomeIcon icon={faEye} style={{ cursor: 'pointer', alignContent: 'center', textAlign: 'center' }} />
          <Link to={`/facture/${achat.id}`}>
            <FontAwesomeIcon
              icon={faShare}
              style={{ marginLeft: '25px', cursor: 'pointer' }}
              onClick={() => handleShareClick(achat.id)}
            />
          </Link>
          <FontAwesomeIcon
    icon={faEdit}
    style={{ marginLeft: '25px', cursor: 'pointer' }}
    onClick={() => handleEditClick(achat.id)} // Ajoutez cette fonctionnalité
  />
        </td>
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
                  <th scope="col">Prix U HT</th>
                  <th scope="col">Total  Remise</th>
                  <th scope="col">Montant TVA (18%)</th>
                </tr>
              </thead>
              <tbody>
                {achat.articlesData.map((articleData) => (
                  <tr key={articleData.articleId}>
                    <td>{articleData.designation}</td>
                    <td>
                      {articleData.categorieId === 1
                        ? 'Informatique'
                        : articleData.categorieId === 2
                        ? 'Fournitures'
                        : articleData.categorieId === 3
                        ? 'Communication'
                        : ''}
                    </td>
                    <td>{articleData.quantite}</td>
                    <td>{articleData.prix} Fcfa</td>
                    <td>{articleData.remiseArticle  } Fcfa</td>
                    <td>{articleData.tvaArticle} Fcfa</td>
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
        <div className="d-flex justify-content-center">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {achats.length > 0 &&
                Array.from({ length: Math.ceil(achats.length / itemsPerPage) }, (_, index) => (
                  <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                    <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AchatTable;
