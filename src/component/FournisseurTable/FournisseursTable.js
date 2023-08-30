import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FournisseursTable = () => {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFournisseurs, setFilteredFournisseurs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  
  const theadStyle = {
    backgroundColor: '#4e73df',
    color: '#ffffff',
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    const filtered = fournisseurs.filter(
      (fournisseur) =>
        fournisseur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fournisseur.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fournisseur.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fournisseur.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fournisseur.localisation.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFournisseurs(filtered);
  };

  useEffect(() => {
    // Effectuez la requête GET pour récupérer les données des fournisseurs
    axios.get('http://localhost:5001/api/fournisseur')
      .then(response => {
        setFournisseurs(response.data.fournisseurs);
        setFilteredFournisseurs(response.data.fournisseurs);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des fournisseurs :', error);
      });
  }, []);


  
  useEffect(() => {
    axios.get('http://localhost:5001/api/categories')
      .then(response => {
        setCategories(response.data.categories);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des catégories :', error);
      });
  }, []);
  

  return (
    <div>
      <div className='content-header'>
        <h2 className='header'>Base des fournisseurs </h2>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3" style={{ marginRight: "30px", marginTop: '10px', marginBottom: '10px' }}>
      <Link to="/formFournisseur" className=" bouton text-center"
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
        </div>  
      <div className="py-0 card-body">
        <div className="table-responsive">
          
        {filteredFournisseurs.length === 0 ? (
  <p>Aucun fournisseur  pour le moment.</p>
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
      {filteredFournisseurs.map((fournisseur, index) => (
        <tr key={index}>
          <td>{fournisseur.nom}</td>
          <td>{fournisseur.prenom}</td>
          <td>{fournisseur.email}</td>
          <td>{fournisseur.contact}</td>
          <td>{fournisseur.localisation}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}

        </div>
      </div>
    </div>
  );
};

export default FournisseursTable;
