import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SortieDirecte = () => {
  const [deletedArticles, setDeletedArticles] = useState([]);
  const [typeArticles, setTypeArticles] = useState([]);

  useEffect(() => {
    // Faites une requête à votre API pour récupérer tous les articles supprimés
    axios.get('http://localhost:5001/api/articles')
      .then(response => {
        const allArticles = response.data.articles;
        const deletedArticles = allArticles.filter(article => article.supprime === true);
        setDeletedArticles(deletedArticles);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des articles :', error);
      });

    // Faites une requête à votre API pour récupérer tous les types d'articles
    axios.get('http://localhost:5001/api/type')
      .then(response => {
        const typeArticles = response.data.typeArticles;
        setTypeArticles(typeArticles);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des types d\'articles :', error);
      });
  }, []);

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(deletedArticles.length / itemsPerPage);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, deletedArticles.length);
  const displayedArticles = deletedArticles.slice(startIndex, endIndex);

  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
        <button className="page-link" onClick={() => changePage(i)}>
          {i}
        </button>
      </li>
    );
  }

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
          <div className="py-0 card-body">
        <div className="table-responsive">
        {displayedArticles.length === 0 ? (
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
      {displayedArticles.map((article) => (
        <tr key={article.id}>
          <td>{new Date(article.updatedAt).toLocaleDateString()}</td>
          <td>{article.designation}</td>
          <td>{article.caracteristique}</td>
          <td>{article.quantite}</td>
          <td>
            {typeArticles.find(type => type.id === article.typeArticleId)?.nom || ''}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}

        </div>
      </div>
    </section>

    {totalPages > 1 && (
      <div className="card-footer">
        <div className="d-flex justify-content-center align-items-center">
          <button type="button" className="btn btn-falcon-default btn-sm">
            {/* Bouton de navigation vers la page précédente */}
          </button>
          <ul className="pagination mb-0 mx-2">
            {paginationButtons}
          </ul>
          <button type="button" className="disabled btn btn-falcon-default btn-sm">
            {/* Bouton de navigation vers la page suivante */}
          </button>
        </div>
      </div>
    )}
  </div>
);
};


export default SortieDirecte
