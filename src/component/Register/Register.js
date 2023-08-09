import React from 'react'

const Register = () => {
  return (
    <div
  className="page-wrapper"
  id="main-wrapper"
  data-layout="vertical"
  data-navbarbg="skin6"
  data-sidebartype="full"
  data-sidebar-position="fixed"
  data-header-position="fixed"
  style={{
    background: "linear-gradient(to left, #6f42c1, #4e73df)", // Dégradé linéaire de violet à bleu
  }}
>
  <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
    <div className="d-flex align-items-center justify-content-center w-100">
      <div className="row justify-content-center w-100">
        <div className="col-md-8 col-lg-6 col-xxl-3">
          <div className="card mb-0">
            <div className="card-body">
              <p className="text-center">Soleil Communication MultiServices</p>
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputtext1" className="form-label">
                    Nom
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputtext1"
                    aria-describedby="textHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Login
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Mot de passe 
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <a
                  href="./index.html"
                  className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
                >
                S'enregistrer
                </a>
                <div className="d-flex align-items-center justify-content-center">
                  <p className="fs-4 mb-0 fw-bold">Deja  un compte?</p>
                  <a
                    className="text-primary fw-bold ms-2"
                    href="./authentication-login.html"
                  >
                    Connexion
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Register
