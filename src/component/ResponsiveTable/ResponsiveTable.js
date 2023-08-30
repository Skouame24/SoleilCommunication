import axios from 'axios';
import React, { useState, useEffect } from 'react';

const ResponsiveTable = () => {
  const [achats, setAchats] = useState([]);
  const [topThreeSuppliers, setTopThreeSuppliers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/achats')
      .then(response => {
        const sortedAchats = response.data.achats.sort((a, b) => a.id - b.id);
        setAchats(sortedAchats);

        const supplierContactCount = {};
        sortedAchats.forEach(achat => {
          const supplierId = achat.fournisseurId;
          if (!supplierContactCount[supplierId]) {
            supplierContactCount[supplierId] = 1;
          } else {
            supplierContactCount[supplierId]++;
          }
        });

        const topThreeSupplierIds = Object.keys(supplierContactCount).sort((a, b) => {
          return supplierContactCount[b] - supplierContactCount[a];
        }).slice(0, 3);

        const fetchSupplierDetails = async (supplierId) => {
          try {
            const response = await axios.get(`http://localhost:5001/api/fournisseur/${supplierId}`);
            return response.data.fournisseur;
          } catch (error) {
            console.error('Erreur lors de la récupération des détails du fournisseur:', error);
          }
        };

        const fetchTopThreeSuppliers = async () => {
          const topThreeSuppliersData = await Promise.all(topThreeSupplierIds.map(fetchSupplierDetails));
          setTopThreeSuppliers(topThreeSuppliersData);
        };

        fetchTopThreeSuppliers();
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des achats:', error);
      });
  }, []);

  return (
    <div style={{marginBottom:'15px'}}>
      <div className="mb-0 card">
      <div className="border-bottom card-header bg-primary">
          <div className="g-2 align-items-end row">
            <div className="col">
              <div className="d-flex  ">
                <h5
                  className="mb-0 hover-actions-trigger text-truncate text-nowrap"
                  id="responsiveTable"
                  style={{color:"white"}}
                >
                  Fournisseurs  recent
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
                        <th scope="col">Email</th>
                        <th scope="col">Téléphone</th>
                        <th scope="col">Adresse</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topThreeSuppliers.map((supplier, index) => (
                        <tr key={supplier.id} className="align-middle">
                          <td>{index + 1}</td>
                          <td className="text-nowrap">{supplier.nom} {supplier.prenom}</td>
                          <td className="text-nowrap">{supplier.email}</td>
                          <td className="text-nowrap">{supplier.contact}</td>
                          <td className="text-nowrap">{supplier.localisation}</td>
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
  )
}

export default ResponsiveTable
