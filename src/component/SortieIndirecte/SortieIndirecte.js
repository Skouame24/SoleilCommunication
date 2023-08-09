import React ,{useState} from 'react'

const SortieIndirecte = () => {
    const [articles, setArticles] = React.useState([
        {
          designation: 'iPhone 11 Pro',
          caracteristiques: '200GB, 2GB RAM, couleur noir',
          quantite: 10,
          magasin: 'Apple Store',
          dateEntree: '2023-07-28',
        },
        {
          designation: 'Samsung Galaxy S21',
          caracteristiques: '128GB, 8GB RAM, couleur violet',
          quantite: 15,
          magasin: 'Samsung Store',
          dateEntree: '2023-07-27',
        },
        {
          designation: 'HP Pavilion Laptop',
          caracteristiques: '512GB SSD, 16GB RAM, processeur Intel i7',
          quantite: 5,
          magasin: 'HP Store',
          dateEntree: '2023-07-26',
        },
        {
          designation: 'Dell XPS 13',
          caracteristiques: '256GB SSD, 8GB RAM, processeur Intel i5',
          quantite: 8,
          magasin: 'Dell Store',
          dateEntree: '2023-07-25',
        },
        {
          designation: 'Lenovo ThinkPad',
          caracteristiques: '1TB SSD, 32GB RAM, processeur AMD Ryzen',
          quantite: 12,
          magasin: 'Lenovo Store',
          dateEntree: '2023-07-24',
        },
        {
            designation: 'Lenovo ThinkPad',
            caracteristiques: '1TB SSD, 32GB RAM, processeur AMD Ryzen',
            quantite: 12,
            magasin: 'Lenovo Store',
            dateEntree: '2023-07-24',
          },
      ]);
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
                <th scope="col">Nom du magasin</th>
              </tr>
            </thead>
            <tbody>
              {displayedArticles.map((article, index) => (
                <tr key={index}>
                  <td>{article.dateEntree}</td>
                  <td>{article.designation}</td>
                  <td>{article.caracteristiques}</td>
                  <td>{article.quantite}</td>
                  <td>{article.magasin}</td>
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

export default SortieIndirecte
