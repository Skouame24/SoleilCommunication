import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Communication = () => {
  const [communicationArticles, setCommunicationArticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/articles/category/3')
      .then(response => {
        const articles = response.data.articles;
        setCommunicationArticles(articles);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des articles de type communication :', error);
      });
  }, []);

  const theadStyle = {
    backgroundColor: '#4e73df',
    color: '#ffffff',
  };

  return (
    <div>
      <div className='content-header'> 
        <h2 className='header'>Domaine communication</h2>
      </div>
      <section className='Commande'>
        <div className="table-responsive">
          {communicationArticles.length > 0 ? (
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
                {communicationArticles.map((article, index) => (
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

export default Communication;
