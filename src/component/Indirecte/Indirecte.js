import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Indirecte = () => {
  const [achats, setAchats] = useState([]);
  const [fournisseurMap, setFournisseurMap] = useState({});
  const [articleMap, setArticleMap] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [achatsDetails, setAchatsDetails] = useState({});


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
    const articleIdsAchats = achats.flatMap(achat => {
      console.log('achat:', achat); // Vérifier la structure de l'achat
      const articleData = achat.articlesData || [];
      return articleData.map(article => {
        console.log('article:', article); // Vérifier la structure de l'articleData
        return article.articleId !== undefined ? article.articleId : null;
      });
    }).filter(articleId => articleId !== null); // Supprimer les valeurs null
  
    console.log('articleIdsAchats:', articleIdsAchats); // Vérifier les articleId extraits
  
    const uniqueArticleIdsAchats = [...new Set(articleIdsAchats)];
  
    const fetchAchatsDetails = async () => {
      const achatsDetailsData = {};
      for (const articleId of uniqueArticleIdsAchats) {
        try {
          const response = await axios.get(`http://localhost:5001/api/articles/${articleId}`);
          achatsDetailsData[articleId] = response.data;
          console.log(achatsDetailsData[articleId])
        } catch (error) {
          console.error(`Erreur lors de la récupération des détails de l'article d'achat ${articleId} :`, error);
        }
      }
      setAchatsDetails(achatsDetailsData);
    };
  
    if (uniqueArticleIdsAchats.length > 0) {
      fetchAchatsDetails();
    }
  }, [achats]);
  

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
            <table className="table table-striped table-hover">
              <thead style={theadStyle}>
                <tr>
                  <th scope="col">Date achat</th>
                  <th scope="col">Designation</th>
                  <th scope="col">Caractéristiques</th>
                  <th scope="col">Quantité</th>
                  <th scope="col">type Id </th>
                  <th scope="col">Fournisseur</th>
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
            <p>{article.typeArticleId
}</p>
          </div>
        ))}
      </td>
      <td>{fournisseurMap[achat.fournisseurId]}</td>
    </tr>
  ))}
</tbody>

            </table>
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
