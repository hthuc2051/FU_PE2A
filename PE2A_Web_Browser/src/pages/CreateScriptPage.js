import React, { Component } from 'react';
import { LeftSideBar, TopNavBar } from '../components/index';
import { HeadLecturerPageContainer } from '../containers/index';
import './style.css';
import { headLecturerNavArr } from './left-navigation';
import * as AppConstant from './../constants/AppConstants';



const PAGE_TITLE = 'Create scripts page';

class CreateScriptPage extends Component {

    render() {
        let { subjectId } = this.props.match.params;
        return (
            <div>
                <div>
                    {/* Top navigation */}
                    <TopNavBar pageTitle={PAGE_TITLE} />
                    <div id="wrapper">
                        {/* Sidebar */}
                        <LeftSideBar navArr={headLecturerNavArr} />

                        {/* Container */}
                        <HeadLecturerPageContainer pageType={AppConstant.PAGE_TYPE_CREATE_SCRIPT} subjectId={subjectId} />
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateScriptPage;
