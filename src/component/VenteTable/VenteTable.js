import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faShare } from '@fortawesome/free-solid-svg-icons';

const VenteTable = () => {
  const [activeVente, setActiveVente] = useState(null);
  const [ventes, setVentes] = useState([]);
  const [clientMap, setClientMap] = useState({});
  const [articleMap, setArticleMap] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Nombre d'éléments par page

  const navigate = useNavigate();

  const handleShareClick = (venteId) => {
    navigate(`/facture/${venteId}`);
  };

  const handleEditClick = (achatId) => {
    navigate(`/editer-vente/${achatId}`); // Remplacez avec l'URL appropriée pour l'édition
  };

  useEffect(() => {
    axios.get('http://localhost:5001/api/ventes')
      .then(response => {
        const sortedVentes = response.data.ventes.sort((a, b) => a.id - b.id);
        setVentes(sortedVentes);
        console.log(sortedVentes)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des ventes:', error);
      });
  }, []);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/clients');
        const clients = response.data.clients;
         console.log(clients)
        const clientMap = {};
        for (const client of clients) {
          clientMap[client.id] = `${client.nom} ${client.prenom}`;
        }

        setClientMap(clientMap);
        console.log(clientMap)
      } catch (error) {
        console.error('Erreur lors de la récupération des clients:', error);
      }
    };

    fetchClients();
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
        console.log(articleMap);
      } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVentes = ventes.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div style={{ marginBottom: '20px' }}>
      <div className="mb-0 card">
        <div className="border-bottom card-header bg-primary " style={{color:'white'}}>
          <div className="g-2 align-items-end row">
            <div className="col">
              <div className="d-flex">
                <h5 className="mb-0 hover-actions-trigger text-truncate text-nowrap">
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
              <th scope="col">Date vente</th>
              <th scope="col">Client</th>
              <th scope="col">Montant Net TTC</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentVentes.map((vente) => (
              <React.Fragment key={vente.id}>
                <tr
                  className="accordion-toggle"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${vente.id}`}
                  aria-expanded={activeVente === vente.id}
                  onClick={() =>
                    setActiveVente(activeVente === vente.id ? null : vente.id)
                  }
                >
                  <td> N°{vente.id}</td>
                  <td>{new Date(vente.dateVente).toLocaleDateString()}</td>
                  <td>{clientMap[vente.clientId]}</td>
                  <td>{vente.montantTotal} Fcfa</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faEye}
                      style={{ cursor: 'pointer', alignContent: 'center', textAlign: 'center' }}
                    />
                    <Link to={`/facturevente/${vente.id}`}>
                      <FontAwesomeIcon
                        icon={faShare}
                        style={{ marginLeft: '25px', cursor: 'pointer' }}
                        onClick={() => handleShareClick(vente.id)}
                      />
                    </Link>
                    <FontAwesomeIcon
    icon={faEdit}
    style={{ marginLeft: '25px', cursor: 'pointer' }}
    onClick={() => handleEditClick(vente.id)} // Ajoutez cette fonctionnalité
  />
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="5"
                    className={`accordion-body collapse ${
                      activeVente === vente.id ? 'show' : ''
                    }`}
                    id={`collapse-${vente.id}`}
                  >
                    <div className="table-responsive w-100">
                      <table className="table table-bordered w-100">
                        <thead>
                          <tr>
                            <th scope="col">Designation</th>
                            <th scope="col">Categorie</th>
                            <th scope="col">Quantite</th>
                            <th scope="col">Prix U HT</th>
                            <th scope="col">Total Remise</th>
                            <th scope="col">Montant TVA (18%)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vente.articleData.map((articleData) => (
                            <tr key={articleData.articleId}>
                              <td>{articleMap[articleData.articleId]?.designation}</td>
                              <td>
                                {articleMap[articleData.articleId]?.categorieId === 1
                                  ? 'Informatique'
                                  : articleMap[articleData.articleId]?.categorieId === 2
                                  ? 'Fournitures'
                                  : articleMap[articleData.articleId]?.categorieId === 3
                                  ? 'Communication'
                                  : ''}
                              </td>
                              <td>{articleData.quantite}</td>
                              <td>
                                <span key={articleData.articleId}>
                                  {articleData.prixVente} Fcfa
                                </span>
                              </td>
                              <td>{articleData.remiseArticle} FCFA</td>
                              <td>{articleData.tvaArticle} FCFA</td>
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
              {ventes.length > 0 &&
                Array.from({ length: Math.ceil(ventes.length / itemsPerPage) }, (_, index) => (
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

export default VenteTable;
