import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SortieIndirecte = () => {
  const [ventes, setVentes] = useState([]);
  const [articlesDetails, setArticlesDetails] = useState({});
  const [typeArticles, setTypeArticles] = useState({}); // Updated to store type articles directly

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
    const fetchTypeArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/type');
        const typeArticles = response.data.typeArticles;

        const typeArticlesMap = {};
        for (const typeArticle of typeArticles) {
          typeArticlesMap[typeArticle.id] = typeArticle.nom;
        }

        setTypeArticles(typeArticlesMap);
      } catch (error) {
        console.error('Erreur lors de la récupération des types d\'articles :', error);
      }
    };

    fetchTypeArticles();
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
  const displayedArticlesOnCurrentPageSorted = [...displayedArticlesOnCurrentPage].sort((a, b) => {
    const designationA = articlesDetails[a.articleId]?.article?.designation || '';
    const designationB = articlesDetails[b.articleId]?.article?.designation || '';
    return designationA.localeCompare(designationB);
  });

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
        {displayedArticlesOnCurrentPageSorted.length === 0 ? (
  <p>Aucune donnée à afficher pour le moment.</p>
) : (
  <table className="table table-striped table-hover">
    <thead style={theadStyle}>
      <tr>
        <th scope="col">Date de sortie</th>
        <th scope="col">Designation</th>
        <th scope="col">Caractéristiques</th>
        <th scope="col">Quantité</th>
        <th scope="col">Groupe d'article</th>
      </tr>
    </thead>
    <tbody>
      {displayedArticlesOnCurrentPageSorted.map((article, index) => {
        const articleDetails = articlesDetails[article.articleId];
        const designation = articleDetails?.article?.designation || '';
        const caracteristique = articleDetails?.article?.caracteristique || '';
        const typeArticle =  articleDetails?.article?.typeArticleId || '';
        return (
          <tr key={index}>
            <td>{new Date(article.venteDate).toLocaleDateString()}</td>
            <td>{designation}</td>
            <td>{caracteristique}</td>
            <td>{article.quantite}</td>
            <td>{typeArticles[typeArticle]}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
)}

        </div>
      </section>
    </div>
  );
};

export default SortieIndirecte;
