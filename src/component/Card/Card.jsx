import React, { useState, useEffect } from 'react';
import './Card.css';
import axios from 'axios';
import cle from '../../assets/computer.png';
import fourni from '../../assets/pat.jpg';
import airpod from '../../assets/telephone.png';
import { Link } from 'react-router-dom';


const Card = ({ style }) => {
  const [categories, setCategories] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);
  const [informatiqueArticleCount, setInformatiqueArticleCount] = useState(0); // Nouvel état
  const [fournisseursArticleCount, setFournisseursArticleCount] = useState(0); // Nouvel état
  const [airpodsArticleCount, setAirpodsArticleCount] = useState(0); // Nouvel état


  useEffect(() => {
    axios.get('http://localhost:5001/api/articles/category/3')
      .then(response => {
        const articles = response.data.articles;

        // Calculer la somme des quantités pour la catégorie "airpods"
        const totalQuantity = articles.reduce((sum, article) => sum + article.quantite, 0);
        console.log(totalQuantity)

        setAirpodsArticleCount(totalQuantity);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des articles de la catégorie "airpods" :', error);
      });

    // ... (autres parties du code)
  }, []);
  
  useEffect(() => {

    // Récupérer le nombre total d'articles de la catégorie "fournisseurs"
    axios.get('http://localhost:5001/api/articles/category/2')
      .then(response => {
        const articles = response.data.articles;
        // Calculer la somme des quantités pour la catégorie "airpods"
        const totalQuantity = articles.reduce((sum, article) => sum + article.quantite, 0);
        console.log(totalQuantity)
        setFournisseursArticleCount(totalQuantity);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du nombre d\'articles de la catégorie "fournisseurs" :', error);
      });
  }, []);

  useEffect(() => {

    // Récupérer le nombre total d'articles de la catégorie "informatique"
    axios.get('http://localhost:5001/api/articles/category/1')
      .then(response => {
        const articles = response.data.articles;
         // Calculer la somme des quantités pour la catégorie "airpods"
         const totalQuantity = articles.reduce((sum, article) => sum + article.quantite, 0);
         console.log(totalQuantity)
        setInformatiqueArticleCount(totalQuantity);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du nombre d\'articles de la catégorie "informatique" :', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5001/api/categories')
      .then(response => {
        const categoriesData = response.data.categories;
        setCategories(categoriesData);
        const names = categoriesData.map(category => category.nom);
        setCategoryNames(names);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des catégories :', error);
      });
  }, []);

  return (
    <section >
      <div className='content-header'> 
         <h2 className='header'>Domaine d'activite</h2>
      </div>
    <div className='Card'>
    <Link to="/informatique" className="card-one"> {/* Redirection vers /informatique */}
          <img src={cle} alt="iphone" className='image-one' />
          <div className='titre'>
            <h3>{categoryNames[0]}</h3>
            <span className='count' style={{ width: '10%', display: 'flex', alignContent: 'center', justifyContent: 'center', paddingRight: '4px' }}>{informatiqueArticleCount}</span>
          </div>
        </Link>
        <Link to="/fourniture" className="card-one"> {/* Redirection vers /fourniture */}
          <img src={fourni} alt="iphone" className='image-one' />
          <div className='titre'>
            <h3>{categoryNames[1]} </h3>
            <span className='count' style={{ width: '10%', display: 'flex', alignContent: 'center', justifyContent: 'center', paddingRight: '4px' }}>{fournisseursArticleCount}</span>
          </div>
        </Link>
        <Link to="/communication" className="card-one"> {/* Redirection vers /communication */}
          <img src={airpod} alt="iphone" className='image-one' />
          <div className='titre'>
            <h3>{categoryNames[2]}</h3>
            <span className='count' style={{ width: '10%', display: 'flex', alignContent: 'center', justifyContent: 'center', paddingRight: '4px' }}>{airpodsArticleCount}</span>
          </div>
        </Link>
    </div>
    </section>
  );
};

export default Card;
