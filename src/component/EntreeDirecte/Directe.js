import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Directe.css';

const Directe = () => {
  const [articles, setArticles] = useState([]);


  useEffect(() => {
    // Récupérer la liste de tous les articles depuis votre API
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/articles');
        const allArticles = response.data.articles;

        // Filtrer les articles où l'entrée est directe (entreeDirecte est true)
        const directEntryArticles = allArticles.filter(article => article.entreeDirecte);

        setArticles(directEntryArticles);
      } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
      }
    };

    fetchArticles();
  }, []);

      const itemsPerPage = 4;

  // État pour gérer la page actuelle
  const [currentPage, setCurrentPage] = useState(1);

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  // Fonction pour changer de page
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Index de début et de fin des articles affichés sur la page actuelle
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, articles.length);

  // Articles à afficher sur la page actuelle
  const displayedArticles = articles.slice(startIndex, endIndex);

  // Générer les boutons de pagination
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
            <table className="table table-striped table-hover">
              <thead style={theadStyle}>
                <tr>
                  <th scope="col">Date d'entrée</th>
                  <th scope="col">Designation</th>
                  <th scope="col">Caractéristiques</th>
                  <th scope="col">Quantité</th>
                  <th scope="col">Type article</th>
                </tr>
              </thead>
              <tbody>
                {displayedArticles.map((article, index) => (
                  <tr key={index}>
      <td>{new Date(article.createdAt).toLocaleDateString()}</td>
                    <td>{article.designation}</td>
                    <td>{article.caracteristique}</td>
                    <td>{article.quantite}</td>
                    <td>{article.typeArticleId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default Directe;