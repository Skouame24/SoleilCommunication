import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ClientsTable = () => {
  const [clients, setClients] = useState([]);


  useEffect(() => {
    // Effectuez la requête GET pour récupérer les données des clients
    axios.get('http://localhost:5001/api/clients')
      .then(response => {
        setClients(response.data.clients);
        // ...
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des clients :', error);
      });
  }, []);
  const itemsPerPage = 4;

  const [currentPage, setCurrentPage] = useState(1);

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(clients.length / itemsPerPage);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, clients.length);

  const displayedClients = clients.slice(startIndex, endIndex);

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
        <div className='content-header'>
        <h2 className='header'>Base des clients </h2>
      </div>
      <section className='Clients'>
        <div className="d-flex justify-content-between align-items-center mb-3" style={{ marginRight: "30px", marginTop: '10px', marginBottom: '10px' }}>
        <Link to="/formClient" className=" bouton text-center"
      style={{listStyle:"none",
              textDecoration:"none",
         }}
      >
        Ajouter
      </Link>
          <div className="input-group" style={{ width: '50%' }}>
            <input
              type="text"
              className="form-control bg-white border-0 small rounded-end"
              placeholder="Rechercher par nom, prénom, email ou localisation..."
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
          {displayedClients.length === 0 ? (
  <p>Aucune donnée à afficher pour le moment.</p>
) : (
  <table className="table table-striped table-hover">
    <thead style={theadStyle}>
      <tr>
        <th scope="col">Nom</th>
        <th scope="col">Prénom</th>
        <th scope="col">Email</th>
        <th scope="col">Contact</th>
        <th scope="col">Localisation</th>
      </tr>
    </thead>
    <tbody>
      {displayedClients.map((client, index) => (
        <tr key={index}>
          <td>{client.nom}</td>
          <td>{client.prenom}</td>
          <td>{client.email}</td>
          <td>{client.contact}</td>
          <td>{client.localisation}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}

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

export default ClientsTable;
