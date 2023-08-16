import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SortieIndirecte = () => {
  const [ventes, setVentes] = useState([]);
  const [articlesDetails, setArticlesDetails] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5001/api/ventes')
      .then(response => {
        setVentes(response.data.ventes);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des ventes :', error);
      });
  }, []);

  useEffect(() => {
    const articleIds = ventes.flatMap(vente => vente.articleData.map(article => article.articleId));
    const uniqueArticleIds = [...new Set(articleIds)];
    const fetchArticlesDetails = async () => {
      const articlesDetailsData = {};
      for (const articleId of uniqueArticleIds) {
        try {
          const response = await axios.get(`http://localhost:5001/api/articles/${articleId}`);
          articlesDetailsData[articleId] = response.data;
        } catch (error) {
          console.error(`Erreur lors de la récupération des détails de l'article ${articleId} :`, error);
        }
      }
      setArticlesDetails(articlesDetailsData);
    };

    if (uniqueArticleIds.length > 0) {
      fetchArticlesDetails();
    }
  }, [ventes]);

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const displayedArticles = ventes.flatMap(vente => vente.articleData.map(article => ({
    ...article,
    venteDate: vente.dateVente,
    clientId: vente.clientId,
  })));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, displayedArticles.length);
  const displayedArticlesOnCurrentPage = displayedArticles.slice(startIndex, endIndex);

  const theadStyle = {
    backgroundColor: '#4e73df',
    color: '#ffffff',
  };

  return (
    <div>
      <section className='Commande'>
      <div className="d-flex justify-content-between align-items-center mb-3" style={{ marginRight: "30px", marginTop: '10px', marginBottom: '10px' }}>
      <input type="submit" value="Ajouter " className="bouton" />
          <div className="input-group" style={{ width: '50%' }}>
            <input
              type="text"
              className="form-control bg-white border-0 small rounded-end"
              placeholder="Rechercher par catégorie, nom ou magasin..."
            />
            <button
              className="btn btn-primary"
              type="button"
            >
              <i className="fas fa-search fa-sm" />
            </button>
          </div>
        </div>  
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead style={theadStyle}>
              <tr>
                <th scope="col">Date de vente</th>
                <th scope="col">Designation</th>
                <th scope="col">Quantité</th>
                <th scope="col">Nom du magasin</th>
              </tr>
            </thead>
            <tbody>
  {displayedArticlesOnCurrentPage.map((article, index) => {
    const articleDetails = articlesDetails[article.articleId];
    const designation = articleDetails?.article?.designation || ''; // Récupérer la désignation de l'article
    console.log(designation)
    return (
      <tr key={index}>
        <td> {new Date(article.venteDate).toLocaleDateString()}</td>
        <td>{designation}</td> {/* Afficher la désignation de l'article */}
        <td>{article.quantite}</td>
        <td>{article.clientId}</td>
      </tr>
    );
  })}
</tbody>



          </table>
        </div>
      </section>
    </div>
  );
};

export default SortieIndirecte;
