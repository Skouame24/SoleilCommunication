import { faCheck, faHourglass, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import ResponsiveTable from '../ResponsiveTable/ResponsiveTable';
import VenteTable from '../VenteTable/VenteTable';
import AchatTable from '../AchatTable/AchatTable';

const EtatAchat = () => {
    
    const fournisseurs = [
        {
          nom: 'Dupont',
          prenom: 'Jean',
          email: 'jean.dupont@example.com',
          contact: '+33 6 12 34 56 78',
          localisation: 'Paris, France',
        },
        {
          nom: 'Martin',
          prenom: 'Sophie',
          email: 'sophie.martin@example.com',
          contact: '+33 6 98 76 54 32',
          localisation: 'Lyon, France',
        },
        // Ajoutez d'autres fournisseurs si nécessaire
      ];
  return (
    <section>
<header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10 full-width-header entete">
        <div className="container-xl px-4">
          <div className="page-header-content pt-4">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto mt-4 ms-auto"> {/* Ajout de la classe ms-auto ici */}
                <h1 className="page-header-title" style={{ color: 'white' }}>
                  <div className="page-header-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-activity"
                    >
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  </div>
                  Etats des achats
                </h1>
                <div className="page-header-subtitle">Gerer les espaces lies au achat</div>
              </div>
            </div>
          </div>
        </div>
      </header>
  <div className="row card-container" style={{marginBottom:'13px',marginTop:'213px'}} >
  <div className="mt-6 col-xl-3 col-lg-6 col-md-12 col-12 ">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="mb-0">Total achat</h4>
            </div>
            <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width={18}
                height={18}
                fill="currentColor"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10zm0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="fw-bold">18</h3>
            <p className="mb-0">
              <span classname="text-dark me-2">22%</span> Completed
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-6 col-xl-3 col-lg-6 col-md-12 col-12 ">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="mb-0">achat en cours </h4>
            </div>
            <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                <FontAwesomeIcon icon={faHourglass} />
            </div>
          </div>
          <div>
            <h3 className="fw-bold">12</h3>
            <p className="mb-0">
              <span classname="text-dark me-2">20%</span> Completed
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-6 col-xl-3 col-lg-6 col-md-12 col-12">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="mb-0">Achat annules</h4>
            </div>
            <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
            <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
          <div>
            <h3 className="fw-bold">10</h3>
            <p className="mb-0">
              <span classname="text-dark me-2">5%</span> avance
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-6 col-xl-3 col-lg-6 col-md-12 col-12">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="mb-0">Achat effectue</h4>
            </div>
            <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
            <FontAwesomeIcon icon={faCheck} />

            </div>
          </div>
          <div>
            <h3 className="fw-bold">10</h3>
            <p className="mb-0">
              <span classname="text-dark me-2">5%</span> Completed
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ResponsiveTable />
  <AchatTable    />
</section>
  )
}

export default EtatAchat
