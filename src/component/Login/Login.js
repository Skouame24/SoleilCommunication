import React from 'react'

const Login = () => {
  return (
    <div
  className="page-wrapper "
  id="main-wrapper"
  data-layout="vertical"
  data-navbarbg="skin6"
  data-sidebartype="full"
  data-sidebar-position="fixed"
  style={{
    background: "linear-gradient(180deg, #4e73df 10%, #6f42c1 100%)",
  }}
  data-header-position="fixed"
>
  <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
    <div className="d-flex align-items-center justify-content-center w-100">
      <div className="row justify-content-center w-100">
        <div className="col-md-8 col-lg-6 col-xxl-3">
          <div className="card mb-0">
            <div className="card-body">
              
              <p className="text-center" style={{fontSize:'20px', color:"#4e73df"}}>Soleil Communication MultiService</p>
              <form>
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
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input primary"
                      type="checkbox"
                      defaultValue=""
                      id="flexCheckChecked"
                      defaultChecked=""
                    />
                    <label
                      className="form-check-label text-dark"
                      htmlFor="flexCheckChecked"
                    >
                      Se rappeler de moi
                    </label>
                  </div>
                  <a className="text-primary fw-bold" href="./index.html">
                    mot de passe oublie ?
                  </a>
                </div>
                <a
                  href="./index.html"
                  className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
                >
                   Connexion
                </a>
                <div className="d-flex align-items-center justify-content-center">
                  <a
                    className="text-primary fw-bold ms-2"
                    href="./authentication-register.html"
                  >
                    Creer un nouveau compte?
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

export default Login
