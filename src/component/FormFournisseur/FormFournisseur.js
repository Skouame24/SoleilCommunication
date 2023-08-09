import React from 'react'

const FormFournisseur = () => {
  return (
    <div className="col-12 grid-margin stretch-card">
     <div className='content-header' style={{marginBottom:"9px"}}>
       <h2 className='header' style={{marginLeft:"129px"}}>Formulaire d'enregistrement d'un fournisseur </h2>
     </div>
  <div className="card">
    <div className="card-body">
      <form className="forms-sample">
        <div className="form-group">
          <label htmlFor="exampleInputName1">Nom</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            placeholder="Rentrer le nom du Fournisseur"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail3">Email addresse</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail3"
            placeholder="Rentrer l'email du fournisseur "
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword4">Contact</label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPassword4"
            placeholder="numero du fournisseurs"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputCity1">Localisation</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputCity1"
            placeholder="Location"
          />
        </div>
        <div className=' d-flex justify-content-center'>
        <button type="submit" className="bouton mr-2">
          Submit
        </button>
        <button className="bouton " >Cancel</button>
        </div>
      </form>
    </div>
  </div>
</div>


  )
}

export default FormFournisseur
