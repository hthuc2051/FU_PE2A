import React, { Component } from 'react';
import { LeftSideBar, TopNavBar } from '../components/index';
import { HeadLecturerPageContainer } from '../containers/index';
import './style.css';
import {headLecturerNavArr} from './left-navigation';
import * as AppConstant from './../constants/AppConstants';
const PAGE_TITLE = 'Update scripts page';

class UpdateScriptPage extends Component {

    render() {
        let {subjectId} = this.props.match.params;
        let {scriptId} = this.props.match.params;
        console.log(this.props);
        console.log(subjectId);
        return (
            <div>
                <div>
                    {/* Top navigation */}
                    <TopNavBar pageTitle={PAGE_TITLE} />
                    <div id="wrapper">
                        {/* Sidebar */}
                        <LeftSideBar navArr ={headLecturerNavArr} />

                        {/* Container */}
                        <HeadLecturerPageContainer pageType ={AppConstant.PAGE_TYPE_UPDATE_SCRIPT} subjectId={subjectId} scriptId={scriptId}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateScriptPage;
