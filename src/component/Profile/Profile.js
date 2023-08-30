import React, { useState } from 'react';
import axios from 'axios'; // Importez Axios
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Profile = ({userData}) => {
  const [updatedData, setUpdatedData] = useState({}); // État pour les données mises à jour

  console.log(userData)
  const bouStyle = {
    width:"32%",
    marginLeft:"221px"
    };
    const nom = userData.nom

    console.log(nom)
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUpdatedData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  console.log(userData.id)
    const handleSaveChanges = async () => {
      try {
        const response = await axios.put(
          `http://localhost:5001/api/profile/${userData.id}`, // Utilisez l'ID de l'utilisateur dans l'URL
          updatedData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        // Si la mise à jour réussit, mettez à jour les données d'utilisateur
        // avec les nouvelles données renvoyées par le serveur
        setUpdatedData({});
        console.log('Mise à jour réussie', response.data);
  
        // Afficher un toast de succès
        toast.success('Mise à jour effectuée avec succès', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        console.error('Erreur lors de la mise à jour :', error);
        // Afficher un toast d'erreur
        toast.error('Erreur lors de la mise à jour', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

  return (
    <div>
      <div className="row">
    <div className="col-xl-4">
      {/* Profile picture card*/}
      <div className="card mb-4 mb-xl-0">
        <div className="bg-primary card-header" style={{color:'white'}}>Boutique</div>
        <div className="card-body text-center">
          {/* Profile picture image*/}
          
          {/* Profile picture help block*/}
          <div className="small font-italic text-muted mb-4">
           Soleil Communicatiojn MultiServices
          </div>
          {/* Profile picture upload button*/}
         
        </div>
      </div>
    </div>
    <div className="col-xl-8">
      {/* Account details card*/}
      <div className="card mb-4">
        <div className="bg-primary card-header" style={{color:'white'}}>Details Compte</div>
        <div className="card-body">
          <form>
            {/* Form Group (username)*/}
            <div className="mb-3">
              <label className="small mb-1" htmlFor="inputUsername">
                Login 
              </label>
              <input
                className="form-control"
                id="inputUsername"
                type="text"
                placeholder="Entrer vot"
                defaultValue={userData.login}
              />
            </div>
            {/* Form Row*/}
            <div className="row gx-3 mb-3">
              {/* Form Group (first name)*/}
              {/* Form Group (last name)*/}
              <div className="col-md-6">
                <label className="small mb-1" htmlFor="inputLocalisation">
                  nom
                </label>
                <input
                  className="form-control"
                  id="inputLocalisation"
                  type="text"
                  placeholder="Entrez votre localisation"
                  defaultValue={nom}
                />
              </div>
              <div className="col-md-6">
                <label className="small mb-1" htmlFor="inputFirstName">
                  First name
                </label>
                <input
                  className="form-control"
                  id="inputFirstName"
                  type="text"
                  placeholder="Enter your first name"
                  defaultValue={userData.prenom}
                />
              </div>
            </div>
            {/* Form Group (email address)*/}
            {/* Form Row*/}
            <div className="row gx-3 mb-3">
              {/* Form Group (phone number)*/}
              <div className="col-md-6">
                <label className="small mb-1" htmlFor="inputPhone">
                  Phone number
                </label>
                <input
                  className="form-control"
                  id="inputPhone"
                  type="tel"
                  placeholder="Enter your phone number"
                  defaultValue={userData.contact}
                />
              </div>
              {/* Form Group (birthday)*/}
              <div className="col-md-6">
              <label className="small mb-1" htmlFor="inputEmailAddress">
                Email address
              </label>
              <input
                className="form-control"
                id="inputEmailAddress"
                type="email"
                placeholder="Enter your email address"
                defaultValue={userData.email}
              />
            </div>
            </div>
            {/* Save changes button*/}
            <button className="bouton" type="button" style={bouStyle} onClick={handleSaveChanges}>
              Enregistrer
            </button>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}

export default Profile
