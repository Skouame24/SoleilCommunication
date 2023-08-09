import React from 'react'

const CreateArticle = () => {
  return (
    <div>
      <div className='content-header' style={{marginBottom:"9px"}}>
       <h2 className='header' style={{marginLeft:"129px"}}>Formulaire d'enregistrement d'un article </h2>
     </div>
      <form className="">
  <div className="g-3 row" >
    <div className="col-12" style={{marginBottom:'10px'}}>
    </div>
    <div className="col-lg-8">
      <div className="mb-3 card">
        <h6 className="bg-light card-header">Basic information</h6>
        <div className="card-body">
          <div className="gx-2 gy-3 row">
            <div className="col-md-12">
              <div>
                <label className="form-label">Designation </label>
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
                <label className="form-label">Caracteristique :</label>
                <input
                  name="manufacturarName"
                  type="text"
                  className="form-control"
                />
                <div className="invalid-feedback" />
              </div>
            </div>
            <div className="col-md-12">
              <div>
                <label className="form-label">Date:</label>
                <input
                  name="productSummery"
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
          <h6 className="bg-light card-header">Categorie</h6>
          <div className="card-body">
            <div className="gx-2 gy-3 row">
              <div className="col-md-12">
                <div>
                  <label className="form-label">Select category:</label>
                  <select name="productCategory" className="form-select">
                    <option value="">Select</option>
                    <option value="electronics">Smartphones</option>
                    <option value="homeKitchen">Accessoires</option>
                    <option value="fashionApparel">Connecteurs</option>
                    <option value="stationery">Stockages</option>
                    <option value="healthFitness">Autres</option>
                  </select>
                  <div className="invalid-feedback" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3 card">
          <h6 className="bg-light card-header">Magasin status</h6>
          <div className="card-body">
            <div className="mb-2 form-check">
              <input
                name="stock"
                type="radio"
                id="inStock"
                className="p-2 form-check-input"
                defaultValue="inStock"
                defaultChecked=""
              />
              <label
                htmlFor="inStock"
                className="form-check-label fs-0 fw-normal text-700 form-check-label"
              >
                Magasin 1
              </label>
            </div>
            <div className="mb-2 form-check">
              <input
                name="stock"
                type="radio"
                id="unavailable"
                className="p-2 form-check-input"
                defaultValue="unavailable"
              />
              <label
                htmlFor="unavailable"
                className="form-check-label fs-0 fw-normal text-700 form-check-label"
              >
                Magasin 2
              </label>
            </div>
            <div className="mb-0 form-check">
              <input
                name="stock"
                type="radio"
                id="toBeAnnounced"
                className="p-2 form-check-input"
                defaultValue="toBeAnnounced"
              />
              <label
                htmlFor="toBeAnnounced"
                className="form-check-label fs-0 fw-normal text-700 form-check-label"
              >
                Magasin 3
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</form>

    </div>
  )
}

export default CreateArticle