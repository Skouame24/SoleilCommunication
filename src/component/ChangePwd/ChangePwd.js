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

  const handleCurrentPasswordChange = (event) =>
    setCurrentPassword(event.target.value);
  const handleNewPasswordChange = (event) => setNewPassword(event.target.value);
  const handleConfirmPasswordChange = (event) =>
    setConfirmPassword(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Les nouveaux mots de passe ne correspondent pas.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5001/api/profile/${userData.id}/password`, {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      setSuccessMessage(response.data.message);
      setError('');
      toast.success(response.data.message);
    } catch (error) {
      setError('Une erreur s\'est produite lors du changement de mot de passe.');
      toast.error('Une erreur s\'est produite lors du changement de mot de passe.');
    }
  };

  return (
    <div>
      <div className="card mb-4">
        <div className="bg-primary card-header" style={{ color: 'white' }}>
          Change Password
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="small mb-1" htmlFor="currentPassword">
                Current Password
              </label>
              <input
                className="form-control"
                id="currentPassword"
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="small mb-1" htmlFor="newPassword">
                New Password
              </label>
              <input
                className="form-control"
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="small mb-1" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="form-control"
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
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
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ChangePwd;
