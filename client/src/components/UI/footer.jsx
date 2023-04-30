import React from 'react';

const Footer = () => {
    const now_year = new Date().getFullYear();

    return (
        <footer className="footer py-4  ">
          <div className="container-fluid">
            <div className="row align-items-center justify-content-lg-between">
              <div className="col-lg-6 mb-lg-0 mb-4">
                <div className="copyright text-center text-sm text-muted text-lg-start">
                © {now_year}. ООО "Динатех"   
                </div>
              </div>
              <div className="col-lg-6">
                <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                  <li className="nav-item">
                    <a  className="nav-link text-muted" target="_blank">Блог</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link pe-0 text-muted" target="_blank">Техподдержка</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
    );
};

export default Footer;