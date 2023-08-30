import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Indirecte = () => {
  const [achats, setAchats] = useState([]);
  const [typeArticles, setTypeArticles] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Récupérer les achats depuis l'API
    axios.get('http://localhost:5001/api/achats')
      .then(response => {
        setAchats(response.data.achats);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des achats:', error);
      });

    // Récupérer les types d'articles depuis l'API
    axios.get('http://localhost:5001/api/type')
      .then(response => {
        const types = response.data.typeArticles.reduce((acc, type) => {
          acc[type.id] = type.nom;
          return acc;
        }, {});
        setTypeArticles(types);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des types d\'articles :', error);
      });
  }, []);

  const itemsPerPage = 4;
  const threshold = 4;
  const totalPages = Math.ceil(achats.length / itemsPerPage);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, achats.length);
  const displayedAchats = achats.slice(startIndex, endIndex);

  const theadStyle = {
    backgroundColor: '#4e73df',
    color: '#ffffff',
  };

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
          {displayedAchats.length === 0 ? (
  <p>Aucune donnée à afficher pour le moment.</p>
) : (
  <table className="table table-striped table-hover">
    <thead style={theadStyle}>
      <tr>
        <th scope="col">Date achat</th>
        <th scope="col">Designation</th>
        <th scope="col">Caractéristiques</th>
        <th scope="col">Quantité</th>
        <th scope="col">Groupe d'article</th>
      </tr>
    </thead>
    <tbody>
      {displayedAchats.map((achat, index) => (
        <tr key={index}>
          <td>{new Date(achat.dateAchat).toLocaleDateString()}</td>
          <td>
            {achat.articlesData.map((article, articleIndex) => (
              <div key={articleIndex}>
                <p>{article.designation}</p>
              </div>
            ))}
          </td>
          <td>
            {achat.articlesData.map((article, articleIndex) => (
              <div key={articleIndex}>
                <p>{article.caracteristique}</p>
              </div>
            ))}
          </td>
          <td>
            {achat.articlesData.map((article, articleIndex) => (
              <div key={articleIndex}>
                <p>{article.quantite}</p>
              </div>
            ))}
          </td>
          <td>
            {achat.articlesData.map((article, articleIndex) => (
              <div key={articleIndex}>
                <p>{article.type}</p>
              </div>
            ))}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}

          </div>
        </div>
      </section>
      {achats.length > threshold && (
        <div className="card-footer">
          <div className="d-flex justify-content-center align-items-center">
            <ul className="pagination mb-0 mx-2">
              {paginationButtons}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Indirecte;
