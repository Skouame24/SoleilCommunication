import React from 'react'

const ResponsiveTable = () => {
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
                  Clients recent
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
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                  <th scope="col">Status</th>
                  <th className="text-end" scope="col">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="align-middle">
                  <td className="text-nowrap">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-l ">
                        <img
                          className="rounded-circle "
                          src="/static/media/4.482e0311a04c21d39072.jpg"
                          alt=""
                        />
                      </div>
                      <div className="ms-2">Ricky Antony</div>
                    </div>
                  </td>
                  <td className="text-nowrap">ricky@example.com</td>
                  <td className="text-nowrap">(201) 200-1851</td>
                  <td className="text-nowrap">2392 Main Avenue, Penasauka</td>
                  <td>
                    <div className="badge badge-soft-success rounded-pill">
                      Completed
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="check"
                        className="svg-inline--fa fa-check fa-w-16 ms-2"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                        />
                      </svg>
                    </div>
                  </td>
                  <td className="text-end">$199</td>
                </tr>
                <tr className="align-middle">
                  <td className="text-nowrap">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-l ">
                        <img
                          className="rounded-circle "
                          src="/static/media/13.0abf9d251d37a62bcb11.jpg"
                          alt=""
                        />
                      </div>
                      <div className="ms-2">Emma Watson</div>
                    </div>
                  </td>
                  <td className="text-nowrap">emma@example.com</td>
                  <td className="text-nowrap">(212) 228-8403</td>
                  <td className="text-nowrap">2289 5th Avenue, New York</td>
                  <td>
                    <div className="badge badge-soft-success rounded-pill">
                      Completed
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="check"
                        className="svg-inline--fa fa-check fa-w-16 ms-2"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                        />
                      </svg>
                    </div>
                  </td>
                  <td className="text-end">$199</td>
                </tr>
                <tr className="align-middle">
                  <td className="text-nowrap">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-l ">
                        <div className="avatar-name rounded-circle ">
                          <span>RA</span>
                        </div>
                      </div>
                      <div className="ms-2">Rowen Atkinson</div>
                    </div>
                  </td>
                  <td className="text-nowrap">rown@example.com</td>
                  <td className="text-nowrap">(201) 200-1851</td>
                  <td className="text-nowrap">
                    112 Bostwick Avenue, Jersey City
                  </td>
                  <td>
                    <div className="badge badge-soft-primary rounded-pill">
                      Processing
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="redo"
                        className="svg-inline--fa fa-redo fa-w-16 ms-2"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M500.33 0h-47.41a12 12 0 0 0-12 12.57l4 82.76A247.42 247.42 0 0 0 256 8C119.34 8 7.9 119.53 8 256.19 8.1 393.07 119.1 504 256 504a247.1 247.1 0 0 0 166.18-63.91 12 12 0 0 0 .48-17.43l-34-34a12 12 0 0 0-16.38-.55A176 176 0 1 1 402.1 157.8l-101.53-4.87a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12h200.33a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12z"
                        />
                      </svg>
                    </div>
                  </td>
                  <td className="text-end">$199</td>
                </tr>
                <tr className="align-middle">
                  <td className="text-nowrap">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-l ">
                        <img
                          className="rounded-circle "
                          src="/static/media/2.20b1aba341d608286e8d.jpg"
                          alt=""
                        />
                      </div>
                      <div className="ms-2">Antony Hopkins</div>
                    </div>
                  </td>
                  <td className="text-nowrap">antony@example.com</td>
                  <td className="text-nowrap">(901) 324-3127</td>
                  <td className="text-nowrap">3448 Ile De France St #242</td>
                  <td>
                    <div className="badge badge-soft-secondary rounded-pill">
                      On Hold
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="ban"
                        className="svg-inline--fa fa-ban fa-w-16 ms-2"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z"
                        />
                      </svg>
                    </div>
                  </td>
                  <td className="text-end">$199</td>
                </tr>
                <tr className="align-middle">
                  <td className="text-nowrap">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-l ">
                        <img
                          className="rounded-circle "
                          src="/static/media/3.b3477e97bffc3dc7e37d.jpg"
                          alt=""
                        />
                      </div>
                      <div className="ms-2">Jennifer Schramm</div>
                    </div>
                  </td>
                  <td className="text-nowrap">jennifer@example.com</td>
                  <td className="text-nowrap">(828) 382-9631</td>
                  <td className="text-nowrap">659 Hannah Street, Charlotte</td>
                  <td>
                    <div className="badge badge-soft-warning rounded-pill">
                      Pending
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="stream"
                        className="svg-inline--fa fa-stream fa-w-16 ms-2"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M16 128h416c8.84 0 16-7.16 16-16V48c0-8.84-7.16-16-16-16H16C7.16 32 0 39.16 0 48v64c0 8.84 7.16 16 16 16zm480 80H80c-8.84 0-16 7.16-16 16v64c0 8.84 7.16 16 16 16h416c8.84 0 16-7.16 16-16v-64c0-8.84-7.16-16-16-16zm-64 176H16c-8.84 0-16 7.16-16 16v64c0 8.84 7.16 16 16 16h416c8.84 0 16-7.16 16-16v-64c0-8.84-7.16-16-16-16z"
                        />
                      </svg>
                    </div>
                  </td>
                  <td className="text-end">$199</td>
                </tr>
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
