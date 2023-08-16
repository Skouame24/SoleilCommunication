import React, { useState } from 'react';
import axios from 'axios'; // Importez la bibliothèque Axios

const FormClient = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [localisation, setLocalisation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Créez un objet avec les données du formulaire
    const formData = {
      nom,
      prenom,
      contact,
      email,
      localisation,
    };

    try {
      // Envoyez les données au serveur via Axios
      const response = await axios.post('http://localhost:5001/api/clients', formData);
      console.log(response.data); // Affichez la réponse du serveur
      
      // Réinitialisez les états après la soumission
      setNom('');
      setPrenom('');
      setContact('');
      setEmail('');
      setLocalisation('');
    } catch (error) {
      console.error('Une erreur est survenue lors de la soumission du formulaire :', error);
    }
  };
  const bouStyle = {
    width: "27%" ,
    marginLeft:"340px",
    padding:"5px",
    };

  return (
    <div className="col-12 grid-margin stretch-card">
      <div className='content-header' style={{marginBottom:"9px"}}>
       <h2 className='header' style={{marginLeft:"129px"}}>Formulaire d'enregistrement d'un client </h2>
     </div>
     <form onSubmit={handleSubmit}>
  <div className="g-3 row">
    <div className="col-xl-12">
      <div className="card mb-4">
        <div className="bg-primary card-header" style={{color:'white'}}>Détails du Client</div>
        <div className="card-body">
          <div className="mb-3">
            <label className="small mb-1" htmlFor="inputNom">
              Nom
            </label>
            <input
              className="form-control"
              id="inputNom"
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Entrer le nom"
              required
            />
          </div>
          <div className="mb-3">
            <label className="small mb-1" htmlFor="inputPrenom">
              Prénom
            </label>
            <input
              className="form-control"
              id="inputPrenom"
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              placeholder="Entrer le prénom"
              required
            />
          </div>
          <div className="row gx-3 mb-3">
            <div className="col-md-6">
              <label className="small mb-1" htmlFor="inputContact">
                Contact
              </label>
              <input
                className="form-control"
                id="inputContact"
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Entrer le contact"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="small mb-1" htmlFor="inputEmail">
                Email
              </label>
              <input
                className="form-control"
                id="inputEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrer l'email"
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="small mb-1" htmlFor="inputLocalisation">
              Localisation
            </label>
            <input
              className="form-control"
              id="inputLocalisation"
              type="text"
              value={localisation}
              onChange={(e) => setLocalisation(e.target.value)}
              placeholder="Entrer la localisation"
              required
            />
          </div>
          <button className="bouton" type="submit" style={bouStyle}>
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  </div>
</form>
</div>

  )
}

export default FormClient
