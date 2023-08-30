import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateMagasin = () => {
  const [nom, setNom] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [typeArticles, setTypeArticles] = useState([]);

  useEffect(() => {
    // Appel à l'API pour récupérer la liste des types d'articles
    fetch('http://localhost:5001/api/type')
      .then(response => response.json())
      .then(data => {
        setTypeArticles(data.typeArticles);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des types d\'articles:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/type', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nom }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setError('');
        setNom('');

        // Afficher un toast de succès
        toast.success('Groupe d\'article ajouté avec succès', {
          position: toast.POSITION.TOP_RIGHT
        });
      } else {
        setMessage('');
        setError('Une erreur est survenue lors de la création du type d\'article');

        // Afficher un toast d'erreur
        toast.error('Une erreur est survenue lors de la création du groupe d\'article', {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    } catch (error) {
      setMessage('');
      setError('Une erreur est survenue lors de la création du type d\'article');

      // Afficher un toast d'erreur
      toast.error('Une erreur est survenue lors de la création du groupe d\'article', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };



  return (
    <div>
      <div className='content-header' style={{marginBottom:"9px"}}>
       <h2 className='header' style={{marginLeft:"129px"}}>Formulaire de creation type d'article </h2>
     </div>
     <form className="" onSubmit={handleSubmit}>
  <div className="g-3 row">
    <div className="col-12">
      <div className="card">
        <div className="card-body">
          <div className="flex-between-center row">
            <div className="col-md">
              <h5 className="mb-2 mb-md-0">Ajouter un groupe d'article</h5>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-lg-8">
      <div className="mb-3 card">
        <h6 className="bg-light card-header">Groupe d'article  information</h6>
        <div className="card-body">
          <div className="gx-2 gy-3 row">
          <div className="col-md-12">
  <div>
    <label className="form-label">Nom du groupe d'article:</label>
    <input
      name="nom" // Modifier l'attribut name pour correspondre aux données que vous envoyez
      type="text"
      className="form-control"
      value={nom} // Lier la valeur à l'état 'nom'
      onChange={(e) => setNom(e.target.value)} // Mettre à jour l'état 'nom' lors de la saisie
    />
    <div className="invalid-feedback" />
  </div>
</div>


          </div>
        </div>
      </div>
    </div>
    <div className="col-lg-4">
      <div className="sticky-sidebar">        
        <div className="mb-3 card">
        <div className="mt-8">
        <h6 className="bg-light card-header">Liste des groupes d'articles </h6>
        <ul className="list-group">
                {typeArticles.map((typeArticle) => (
                  <li key={typeArticle.id} className="list-group-item">
                    <div>
                      <strong>Nom du groupe d'article:</strong> {typeArticle.nom}
                    </div>
                  </li>
                ))}
              </ul>
      </div>
        </div>
      </div>
    </div>
    
  </div>
</form>
<ToastContainer />

    </div>
  )
}

export default CreateMagasin
