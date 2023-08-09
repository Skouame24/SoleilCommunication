import React, { useState } from 'react'

const CreateMagasin = () => {
    const magasins = [
        { id: 1, nom: "Magasin 1", numero: "12345",stock: "vide"  },
        { id: 2, nom: "Magasin 2", numero: "67890",stock: "rempli" },
        { id: 2, nom: "Magasin 3", numero: "12912" ,stock: "normal"},

      ];
  return (
    <div>
      <div className='content-header' style={{marginBottom:"9px"}}>
       <h2 className='header' style={{marginLeft:"129px"}}>Formulaire de creation type d'article </h2>
     </div>
      <form className="">
  <div className="g-3 row">
    <div className="col-12">
      <div className="card">
        <div className="card-body">
          <div className="flex-between-center row">
            <div className="col-md">
              <h5 className="mb-2 mb-md-0">Ajouter un agasin</h5>
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
        <h6 className="bg-light card-header">Magasin  information</h6>
        <div className="card-body">
          <div className="gx-2 gy-3 row">
            <div className="col-md-12">
              <div>
                <label className="form-label">Nom du maasin:</label>
                <input
                  name="productName"
                  type="text"
                  className="form-control"
                />
                <div className="invalid-feedback" />
              </div>
            </div>
            <div className="col-md-12">
              <div>
                <label className="form-label">Numero magasin:</label>
                <input
                  name="manufacturarName"
                  type="text"
                  className="form-control"
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
        <h6 className="bg-light card-header">Liste des magasins</h6>
        <ul className="list-group">
          {magasins.map((magasin) => (
            <li key={magasin.id} className="list-group-item">
              <div>
                <strong>Nom du magasin:</strong> {magasin.nom}
              </div>
              <div>
                <strong>Numéro du magasin:</strong> {magasin.numero}
              </div>
              <div>
                <strong>Stock:</strong> {magasin.stock}
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

    </div>
  )
}

export default CreateMagasin
