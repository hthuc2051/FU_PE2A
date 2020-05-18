import React, { Component } from 'react';
import { LeftSideBar, TopNavBar } from '../components/index';
import { HeadLecturerPageContainer } from '../containers/index';
import './style.css';
import { headLecturerNavArr } from './left-navigation';
import * as AppConstant from '../constants/AppConstants';



const PAGE_TITLE = 'List practical exam page';
class ListPracticalExamsPage extends Component {
    render() {
        let { subjectId } = this.props.match.params;
        console.log(subjectId);
        return (
            <div>
                <div>
                    {/* Top navigation */}
                    <TopNavBar pageTitle={PAGE_TITLE} />
                    <div id="wrapper">
                        {/* Sidebar */}
                        <LeftSideBar navArr={headLecturerNavArr} />
                        {/* Container */}
                        <HeadLecturerPageContainer pageType={AppConstant.PAGE_TYPE_LIST_PRACTICAL_EXAM} subjectId={subjectId} />
                    </div>
                </div>
            </div>
        );
    }
}

export default ListPracticalExamsPage;
