import React, { useState } from 'react';

const FournisseursTable = () => {
    const fournisseurs = [
        {
          nom: 'Dupont',
          prenom: 'Jean',
          email: 'jean.dupont@example.com',
          contact: '+33 6 12 34 56 78',
          localisation: 'Paris, France',
        },
        {
          nom: 'Martin',
          prenom: 'Sophie',
          email: 'sophie.martin@example.com',
          contact: '+33 6 98 76 54 32',
          localisation: 'Lyon, France',
        },
        // Ajoutez d'autres fournisseurs si nécessaire
      ];
    
      const theadStyle = {
        backgroundColor: '#4e73df',
        color: '#ffffff',
      };

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFournisseurs, setFilteredFournisseurs] = useState(fournisseurs);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    // Filtrer les fournisseurs en fonction de la recherche
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

  return (
    <div>
      <div className='content-header'>
        <h2 className='header'>Base des fournisseurs </h2>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3" style={{ marginRight: "30px", marginTop: '10px', marginBottom: '10px' }}>
      <input type="submit" value="Ajouter " className="bouton" />
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
          <div className="border border-1">
            <div className="border border-1">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FournisseursTable;
