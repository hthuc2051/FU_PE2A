import React, { Component } from 'react';
import { LeftSideBar, TopNavBar } from '../components/index';
import { CodePageContainer } from '../containers/index';
import './style.css';

const CREATE_ACTION_PAGE_TITLE = 'Create Action Page';

class CreateActionPage extends Component {
    render() {
        return (
            <div>
                <div>
                    {/* Top navigation */}
                    <TopNavBar pageTitle={CREATE_ACTION_PAGE_TITLE} />
                    <div id="wrapper">
                        <LeftSideBar />

                        {/* Container */}
                        <CodePageContainer />
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateActionPage;