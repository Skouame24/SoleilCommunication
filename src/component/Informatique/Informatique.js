import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Informatique = () => {
  const [informatiqueArticles, setInformatiqueArticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/articles/category/1')
      .then(response => {
        const articles = response.data.articles;
        setInformatiqueArticles(articles);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des articles de type informatique :', error);
      });
  }, []);

  const [typeArticles, setTypeArticles] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5001/api/type') // Endpoint pour obtenir tous les types d'articles
      .then(response => {
        const types = response.data.typeArticles.reduce((acc, type) => {
          acc[type.id] = type.nom; // Utilisation de l'ID comme clé pour associer le nom du type d'article
          return acc;
        }, {});
        setTypeArticles(types);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des types d\'articles :', error);
      });
  }, []);

  const theadStyle = {
    backgroundColor: '#4e73df',
    color: '#ffffff',
  };

  return (
    <div>
      <div className='content-header'> 
        <h2 className='header'>Domaine informatique</h2>
      </div>
      <section className='Commande'>
        <div className="table-responsive">
        {informatiqueArticles.length > 0 ? (
            <table className="table table-striped table-hover">
              <thead style={theadStyle}>
                <tr>
                  <th scope="col">Designation</th>
                  <th scope="col">Caracteristique</th>
                  <th scope="col">Quantité</th>
                  <th scope="col">Type d'article</th>
                </tr>
              </thead>
              <tbody>
                {informatiqueArticles.map((article, index) => (
                  <tr key={index}>
                    <td>{article.designation}</td>
                    <td>{article.caracteristique}</td>
                    <td>{article.quantite}</td>
                    <td>{typeArticles[article.typeArticleId]}</td>
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
  )
}

export default Informatique;
