import React, { Component } from 'react';
import { LeftSideBar, TopNavBar,Footer } from '../components/index';
import { HeadLecturerPageContainer } from '../containers/index';
import './style.css';
import {headLecturerNavArr} from './left-navigation';
const PAGE_TITLE = 'Header-Lec page';



class HeadLecturerPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <div>
                <div>
                    {/* Top navigation */}
                    <TopNavBar pageTitle={PAGE_TITLE} />

                    <div id="wrapper">

                        {/* Sidebar */}
                        <LeftSideBar navArr ={headLecturerNavArr} />

                        {/* Content */}
                        <HeadLecturerPageContainer />
                    </div>
                </div>
                {/* <Footer/> */}
            </div>
        );
    }
}

export default HeadLecturerPage;

