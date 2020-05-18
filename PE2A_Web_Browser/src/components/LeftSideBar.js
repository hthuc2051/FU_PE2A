import React, { Component } from 'react';
import './sidebar.css';
import './leftSideBar.css'
import * as AppConstant from './../constants/AppConstants';


class LeftSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navType: '',
            navArr: [],
        };
    }

    onChangedLeftSideBar = (navType) => {
        this.props.onChangedLeftSideBar(navType);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps === prevState) {
            return null;
        }
        return {
            navType: nextProps.navType,
        }
    }

    render() {
        let { navArr } = this.props;
        console.log(navArr);
        if (this.state.navType === AppConstant.ACTION_NAV_TITLE) {
            return (
                <ul className="sidebar navbar-nav card_border">
                    {navArr ? this.renderAdminNavArr(navArr) : ''}
                </ul>
            );
        } else {
            return (
                <ul className="sidebar navbar-nav card_border">
                    {navArr ? this.renderNavArr(navArr) : ''}
                </ul>
            );
        }
    }

    renderAdminNavArr = (navArr) => {
        let result = [];
        if (navArr !== null && navArr.length > 0) {
            result = navArr.map((item, index) => {
                return (
                    <li key={index} className="nav-item">
                        <a className="nav-link" onClick={() => this.onChangedLeftSideBar(item.title)} >
                            <span>{item.title}</span>
                        </a>
                    </li>
                );
            });
        }
        return result;
    }

    renderNavArr = (navArr) => {
        let result = [];
        if (navArr !== null && navArr.length > 0) {
            result = navArr.map((item, index) => {
                if (item.type === "drop-down") {
                    return (
                        <li key={index} className="nav-item dropdown show">
                            <a className="nav-link dropdown-toggle" href="#" id="pagesDropdown" role="button" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="true">
                                <span>{item.title}</span>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="pagesDropdown" x-placement="bottom-start"
                            >
                                {this.renderDropDownItems(item.dropDownArr)}
                            </div>
                        </li>
                    );
                } else {
                    return (
                        <li key={index} className="nav-item active">
                            <a className="nav-link" href={item.link}>
                                <span>{item.title}</span></a>
                        </li>
                    )
                }

            })
        }
        return result;
    };

    renderDropDownItems = (arr) => {
        let result = [];
        if (arr !== null && arr.length > 0) {
            result = arr.map((item, index) => {
                return (
                    <a key={index} className="dropdown-item" href={item.link}>{item.title}</a>
                )
            })
        }
        return result;
    }
}
export default LeftSideBar;

