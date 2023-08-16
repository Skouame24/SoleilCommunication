import React, { useState, useEffect } from 'react'
import axios from 'axios';



const getCategoryName = (categoryId) => {
  switch (categoryId) {
    case 1:
      return 'Informatique';
    case 2:
      return 'Fourniture';
    case 3:
      return 'Communication';
    default:
      return 'Autre';
  }
};
const BaseArticle = () => {
  const [articles, setArticles] = useState([]);
  // ... Autres états et fonctions ...

  // Effectuer la requête GET lors du chargement du composant
  useEffect(() => {
    fetchArticles();
  }, []);

  // Fonction pour récupérer les articles depuis l'API
  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/articles');
      setArticles(response.data.articles); // Assurez-vous que la structure des données correspond
      console.log(response.data.articles)
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error);
    }
  };
      const theadStyle = {
        backgroundColor: '#4e73df',
        color: '#ffffff',
      };
      // Styles CSS pour les lignes du <tbody> en survol
     const HoverStyle = {
    color: '#ffffff',
    opacity: 0.6,
  };
 // Nombre d'articles par page
 const itemsPerPage = 5;

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
 
 const [searchTerm, setSearchTerm] = useState('');
 const [filteredArticles, setFilteredArticles] = useState(articles);

 const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    // Filtrer les articles en fonction de la recherche
    const filtered = articles.filter(
      (article) =>
        article.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.storeName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(filtered);
  };
  // Fonction pour supprimer un article par son ID
  const deleteArticle = async (articleId) => {
    try {
      // Faites la requête DELETE à votre API avec l'ID de l'article à supprimer
      await axios.delete(`http://localhost:5001/api/articles/${articleId}`);

      // Mettez à jour la liste des articles en rechargeant les données depuis l'API
      fetchArticles();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'article:', error);
    }
  };

 return (
   <div>
     <div className='content-header'>
       <h2 className='header'>Base des articles </h2>
     </div>
     <div className="input-group mb-3" style={{width:'50%',float:'right',marginRight:"30px", marginTop:'10px', marginBottom:'10px'}}>
        <input
          type="text"
          className="form-control bg-white border-0 small rounded-end"
          placeholder="Rechercher par catégorie, nom ou magasin..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleSearchSubmit}
        >
          <i className="fas fa-search fa-sm" />
        </button>
      </div>
     <div className="py-0 card-body">
       <div className="table-responsive">
         <div className="border border-1">
           <div className="border border-1">
             <table className="table table-striped table-hover">
               <thead style={theadStyle}>
                 <tr>
                   <th scope="col">Designation</th>
                   <th scope="col">Quantite</th>
                   <th scope="col">Domaine activite</th>
                   <th scope="col">Action</th>
                 </tr>
               </thead>
               <tbody>
                 {displayedArticles.map((article) => (
                   <tr key={article.id}>
                     <td>{article.designation}</td>
                     <td>{article.quantite}</td>
                     <td>{getCategoryName(article.categorieId)}</td> {/* Utilisation de la fonction getCategoryName */}
                     <td> <i
                className="fas fa-trash-alt"
                style={{ marginLeft: '10px', cursor: 'pointer' }}
                onClick={() => deleteArticle(article.id)}
              ></i></td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </div>
       </div>
     </div>
     {totalPages > 1 && (
       <div className="card-footer">
         <div className="d-flex justify-content-center align-items-center">
           <button type="button" className="btn btn-falcon-default btn-sm">
             <svg
               aria-hidden="true"
               focusable="false"
               data-prefix="fas"
               data-icon="chevron-left"
               className="svg-inline--fa fa-chevron-left fa-w-10 "
               role="img"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 320 512"
             >
               <path
                 fill="currentColor"
                 d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
               />
             </svg>
           </button>
           <ul className="pagination mb-0 mx-2">
             {paginationButtons}
           </ul>
           <button type="button" className="disabled btn btn-falcon-default btn-sm">
             <svg
               aria-hidden="true"
               focusable="false"
               data-prefix="fas"
               data-icon="chevron-right"
               className="svg-inline--fa fa-chevron-right fa-w-10 "
               role="img"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 320 512"
             >
               <path
                 fill="currentColor"
                 d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
               />
             </svg>
           </button>
         </div>
       </div>
     )}
   </div>
 );
};

export default BaseArticle;