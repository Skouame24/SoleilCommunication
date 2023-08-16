import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Informatique = () => {
  const [informatiqueArticles, setInformatiqueArticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/articles/category/1')
      .then(response => {
        const articles = response.data.articles;
        console.log(articles)
        setInformatiqueArticles(articles);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des articles de type informatique :', error);
      });
  }, []); 
    const theadStyle = {
        backgroundColor: '#4e73df',
        color: '#ffffff',
      };
  return (
    <div>
       <div>
       <div className='content-header'> 
           <h2 className='header'>Domaine informatique</h2>
        </div>
      <section className='Commande'>
        <div className="table-responsive">
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
              {informatiqueArticles.map((article, index) => (
                <tr key={index}>
                  <td>{article.designation}</td>
                  <td>{article.caracteristique}</td>
                  <td>{article.quantite}</td>
                  <td>{article.typeArticleId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
    </div>
  )
}

export default Informatique
