import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ChangePwd = ({ userData }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  console.log(userData)

  const handleCurrentPasswordChange = (event) =>
    setCurrentPassword(event.target.value);
  const handleNewPasswordChange = (event) => setNewPassword(event.target.value);
  const handleConfirmPasswordChange = (event) =>
    setConfirmPassword(event.target.value);

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const currentPassword = event.target.currentPassword.value;
      const newPassword = event.target.newPassword.value;
      const confirmPassword = event.target.confirmPassword.value;
    console.log(currentPassword)
      if (newPassword !== confirmPassword) {
        toast.error('Les nouveaux mots de passe ne correspondent pas.');
        return;
      }
  console.log(userData.id)
      try {
        console.log('Donnee envoyee:',{
          ancienMotDePasse: currentPassword,
          nouveauMotDePasse: newPassword,
          confirmationMotDePasse: confirmPassword,
        })
        const response = await axios.put(
          `http://localhost:5001/api/profile/${userData.id}/password`,
          {
            ancienMotDePasse: currentPassword,
            nouveauMotDePasse: newPassword,
            confirmationMotDePasse: confirmPassword,
          }
        );
  
        toast.success(response.data.message);
      } catch (error) {
        console.error('Erreur lors du changement de mot de passe:', error);
        toast.error('Une erreur s\'est produite lors du changement de mot de passe.');
      }
    };
     

  const bouStyle = {
    width: "27%" ,
    marginLeft:"340px",
    padding:"5px",
    };

  return (
    <div>
      <div className="card mb-4">
        <div className="bg-primary card-header" style={{ color: 'white' }}>
          Change Mot de passe 
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="small mb-1" htmlFor="currentPassword">
                Mot de passe actuel 
              </label>
              <input
                className="form-control"
                id="currentPassword"
                type="password"
                placeholder="Entez  le Mot de passe actuel "
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="small mb-1" htmlFor="newPassword">
                Nouveau mot de passe 
              </label>
              <input
                className="form-control"
                id="newPassword"
                type="password"
                placeholder="Entez le Nouveau mot de passe "
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="small mb-1" htmlFor="confirmPassword">
                Confirm Mot de passe 
              </label>
              <input
                className="form-control"
                id="confirmPassword"
                type="password"
                placeholder="Confirm Nouveau mot de passe "
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>
            <div className="mb-3">
              {error && <div className="text-danger">{error}</div>}
              {successMessage && (
                <div className="text-success">{successMessage}</div>
              )}
            </div>
            <button className="bouton" type="submit" style={bouStyle}>
            Enregistrer
          </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ChangePwd;
