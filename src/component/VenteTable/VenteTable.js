import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faShare } from '@fortawesome/free-solid-svg-icons';

const VenteTable = () => {
  const [activeVente, setActiveVente] = useState(null);
  const [ventes, setVentes] = useState([]);
  const [clientMap, setClientMap] = useState({});
  const [articleMap, setArticleMap] = useState({});

  const navigate = useNavigate();

  const handleShareClick = (venteId) => {
    navigate(`/facture/${venteId}`);
  };

  useEffect(() => {
    axios.get('http://localhost:5001/api/ventes')
      .then(response => {
        setVentes(response.data.ventes);
        console.log(response.data.ventes)
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

        const clientMap = {};
        for (const client of clients) {
          clientMap[client.id] = `${client.nom} ${client.prenom}`;
        }

        setClientMap(clientMap);
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
        console.log(articleMap)
      } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div style={{ marginBottom: '20px' }}>
      <div className="mb-0 card">
        <div className="border-bottom card-header bg-white">
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
              <th scope="col">Montant total</th>
              <th scope="col">Client</th>
              <th scope="col">Date vente</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {ventes.map((vente) => (
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
                  <td>Vente N°{vente.id}</td>
                  <td>{vente.montantTotal} Fcfa</td>
                  <td>{clientMap[vente.clientId]}</td>
                  <td>{new Date(vente.dateVente).toLocaleDateString()}</td>
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
                            <th scope="col">Quantite</th>
                            <th scope="col">Prix de vente</th>
                            {/* Ajoutez plus de colonnes si nécessaire */}
                          </tr>
                        </thead>
                        <tbody>
                          {vente.articleData.map((articleData) => (
                            <tr key={articleData.articleId}>
                              <td>{articleMap[articleData.articleId]?.designation}</td>
                              <td>{articleData.quantite}</td>
                              <td>
  {vente.articleData.map((articleData) => (
    <span key={articleData.articleId}>
    {articleData.prixVente} Fcfa
    </span>
  ))}
</td>

                              {/* Affichez plus d'informations d'article si nécessaire */}
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
