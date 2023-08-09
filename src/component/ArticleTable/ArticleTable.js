import React from 'react';

const ArticleTable = () => {
  // Tableau de données contenant les informations des téléphones
  const telephones = [
    { id: 1, designation: "Iphone X", categorie: "Smartphones", quantite: 12, prix: "145000" },
    { id: 2, designation: "Samsung Galaxy S21", categorie: "Smartphones", quantite: 8, prix: "135000" },
    { id: 3, designation: "AirPods Pro", categorie: "Accessoires", quantite: 20, prix: "70000" },
    { id: 4, designation: "Câble USB-C", categorie: "Connecteurs", quantite: 30, prix: "15000" },
    { id: 5, designation: "Disque Dur Externe", categorie: "Stockages", quantite: 5, prix: "80000" },
    { id: 6, designation: "Chargeur sans fil", categorie: "Accessoires", quantite: 15, prix: "35000" },
    { id: 7, designation: "Casque Bluetooth", categorie: "Accessoires", quantite: 10, prix: "60000" },
    // Ajoutez ici les informations des autres téléphones...
  ];

  return (
    <div>
      <div className="mb-0 card">
        <div className="border-bottom card-header">
          <div className="g-2 align-items-end row">
            <div className="col">
              <div className="d-flex">
                <h5
                  className="mb-0 hover-actions-trigger text-truncate text-nowrap"
                  id="responsiveTable"
                >
                  Listes des articles 
                </h5>
              </div>
            </div>
            <div className="col-md-auto col-12 col">
              <div className="d-inline-block row">
                <div className="col">
                  <div
                    className="nav-pills-falcon m-0 nav card-header-pills nav-pills"
                    role="tablist"
                  >
                    <div className="nav-item">
                      <button
                        type="button"
                        role="tab"
                        data-rr-ui-event-key="preview"
                        id="react-aria8682133904-230-tab-preview"
                        aria-controls="react-aria8682133904-230-tabpane-preview"
                        aria-selected="true"
                        className="nav-link active btn btn-primary btn-sm"
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>
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
                        <th scope="col">Designation</th>
                        <th scope="col">Quantite</th>
                        <th scope="col">Quantite</th>
                        <th scope="col">Prix</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {telephones.map((telephone) => (
                        <tr key={telephone.id} className="align-middle">
                          <td>{telephone.designation}</td>
                          <td>{telephone.categorie}</td>
                          <td>{telephone.quantite}</td>
                          <td>{telephone.prix} Fcfa</td>
                          <td className="text-end d-flex align-items-center justify-content-space-around" >
                              <i className="fas fa-trash-alt" style={{marginLeft:'10px', cursor:'pointer'}}></i> {/* Icône de suppression */}
                              <i className="fas fa-edit" style={{marginLeft:'20px', cursor:'pointer'}}></i> {/* Icône de modification */}
                          </td>
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

export default ArticleTable;
