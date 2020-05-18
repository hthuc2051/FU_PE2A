import React, { Component } from 'react';
import './style.css';
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <footer className="footer">
            <div className="footer-left">
              <h3>Team 02<span> Logo</span></h3>
              
            </div>
            <div className="footer-center">
              <div>
                <i className="fa fa-map-marker" />
                <p><span>FPT University</span> Ho Chi Minh, Viet Nam</p>
              </div>
              <div>
                <i className="fa fa-phone" />
                <p>0123456789</p>
              </div>
              <div>
                <i className="fa fa-envelope" />
                <p><a href="mailto">team02capstone@fpt.edu.vn</a></p>
              </div>
            </div>
            <div className="footer-right">
              <p className="footer-about-us">
                <span>About Us</span>
                Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
              </p>
              <div className="footer-icons">
                <a className="facebook-btn" href="#"><i className="fa fa-facebook" /></a>
                <a className="twitter-btn" href="#"><i className="fa fa-twitter" /></a>
                <a className="linkedin-btn" href="#"><i className="fa fa-linkedin" /></a>
                <a className="github-btn" href="#"><i className="fa fa-github" /></a>
              </div>
            </div>
          </footer>
        );
    }
}
export default Footer;

