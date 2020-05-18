import React, { Component } from 'react';
import './style.css';
import { history } from './../App';
import {LoginPageContainer} from './../containers/index';
class LoginPage extends Component {

    constructor(props) {
        super(props);
       
    }

    render() {
        return (
            <div className="login-wrapper">
                <div className="login-container">
                    <div className="form">
                        <img src="./images/logo.PNG" alt="Logo imgage" />
                        <LoginPageContainer/>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
