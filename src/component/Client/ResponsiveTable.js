import axios from 'axios';
import React, { useState, useEffect } from 'react';

const ResponsiveTable = () => {
  const [ventes, setVentes] = useState([]);
  const [recentClients, setRecentClients] = useState([]);
  const [clientRankings, setClientRankings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/ventes')
      .then(response => {
        const sortedVentes = response.data.ventes.sort((a, b) => new Date(b.dateVente) - new Date(a.dateVente));
        setVentes(sortedVentes);
        console.log(sortedVentes)

        const recentClientIds = [...new Set(sortedVentes.map(vente => vente.clientId))];
        console.log(recentClientIds)

        const fetchClientDetails = async (clientId) => {
          try {
            const response = await axios.get(`http://localhost:5001/api/clients/${clientId}`);
            return response.data.client;
          } catch (error) {
            console.error('Erreur lors de la récupération des détails du client:', error);
          }
        };

        const fetchRecentClients = async () => {
          const recentClientsData = await Promise.all(recentClientIds.map(fetchClientDetails));
          setRecentClients(recentClientsData);
        };

        fetchRecentClients();
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des ventes:', error);
      });
  }, []);

  return (
    <div style={{ marginBottom: '15px' }}>
      <div className="mb-0 card">
        <div className="border-bottom card-header bg-primary">
          <div className="g-2 align-items-end row">
            <div className="col">
              <div className="d-flex ">
                <h5
                  className="mb-0 hover-actions-trigger text-truncate text-nowrap"
                  id="responsiveTable"
                  style={{ color: 'white' }}
                >
                  Top clients 
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="py-0 card-body">
          <div className="tab-content">
            <div
              role="tabpanel"
              id="react-aria8682133904-230-tabpane-preview"
              aria-labelledby="react-aria8682133904-230-tab-preview"
              className="fade tab-pane active show"
            >
              <div>
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Classement</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Prénom</th>
                        <th scope="col">Email</th>
                        <th scope="col">Téléphone</th>
                        <th scope="col">Adresse</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentClients.map((client, index) => (
                        <tr key={client.id} className="align-middle">
                          <td>{index + 1}</td>
                          <td className="text-nowrap">{client.nom}</td>
                          <td className="text-nowrap">{client.prenom}</td>
                          <td className="text-nowrap">{client.email}</td>
                          <td className="text-nowrap">{client.contact}</td>
                          <td className="text-nowrap">{client.localisation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveTable;
