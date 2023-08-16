import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fourniture = () => {
  const [fournitureArticles, setFournitureArticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/articles/category/2')
      .then(response => {
        const articles = response.data.articles;
        setFournitureArticles(articles);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des articles de type fourniture :', error);
      });
  }, []);

  const theadStyle = {
    backgroundColor: '#4e73df',
    color: '#ffffff',
  };

  return (
    <div>
      <div className='content-header'> 
        <h2 className='header'>Domaine fournitures</h2>
      </div>
      <section className='Commande'>
        <div className="table-responsive">
          {fournitureArticles.length > 0 ? (
            <table className="table table-striped table-hover">
              <thead style={theadStyle}>
                <tr>
                  <th scope="col">Designation </th>
                  <th scope="col">Caracteristique</th>
                  <th scope="col">Quantité</th>
                  <th scope="col">typearticleID</th>
                </tr>
              </thead>
              <tbody>
                {fournitureArticles.map((article, index) => (
                  <tr key={index}>
                    <td>{article.designation}</td>
                    <td>{article.caracteristique}</td>
                    <td>{article.quantite}</td>
                    <td>{article.typeArticleId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Aucun article disponible</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Fourniture;
