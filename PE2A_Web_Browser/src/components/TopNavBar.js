import React, { Component } from 'react';
class TopNavBar extends Component {

    onLogOut = () => {
        localStorage.removeItem('userInfo');
        window.location.replace("/");
    }

    render() {
        let { pageTitle } = this.props;
        return (
            <nav className="navbar navbar-expand navbar-dark  static-top">
                <div id="header-logo" className="logo-bg">
                    <img src="/images/top-nav-logo.png" alt="Logo imgage" />

                    {/* <a className="navbar-brand mr-1" href="index.html">{pageTitle} - Logo</a> */}
                </div>

                {/* Navbar Search */}
                {/* <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search for..." aria-label="Search"
                            aria-describedby="basic-addon2" />
                        <div class="input-group-append">
                            <button class="btn btn-primary" type="button">
                                <i class="fa fa-search"></i>
                            </button>
                        </div>
                    </div>
                </form> */}
                {/* Navbar container*/}
                <ul className="navbar-nav ml-auto ">
                    {/* <li className="nav-item dropdown no-arrow mx-1">
                        <a className="nav-link dropdown-toggle" href="dummy" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-bell fa-fw" />
                            <span className="badge badge-danger">9+</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown">
                            <a className="dropdown-item" href="dummy">Action</a>
                            <a className="dropdown-item" href="dummy">Another action</a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item" href="dummy">Something else here</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown no-arrow mx-1">
                        <a className="nav-link dropdown-toggle" href="dummy" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-envelope fa-fw" />
                            <span className="badge badge-danger">7</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="messagesDropdown">
                            <a className="dropdown-item" href="dummy">Action</a>
                            <a className="dropdown-item" href="dummy">Another action</a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item" href="dummy">Something else here</a>
                        </div>
                    </li> */}
                    <li className="nav-item dropdown no-arrow">
                        <a className="nav-link dropdown-toggle" href="dummy" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-user-circle fa-fw" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                            {/* <a className="dropdown-item" href="dummy">Settings</a>
                            <a className="dropdown-item" href="dummy">Activity Log</a> */}
                            {/* <div className="dropdown-divider" /> */}
                            <button className="dropdown-item" href="dummy" onClick={this.onLogOut} data-toggle="modal" data-target="dummylogoutModal">Logout</button>
                        </div>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default TopNavBar;

