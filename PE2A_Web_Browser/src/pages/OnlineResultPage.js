import React, { Component } from 'react';
import { LeftSideBar, TopNavBar } from '../components/index';
import { OnlineResultPageContainer } from '../containers/index';
import './style.css';

const PAGE_TITLE = 'OnlineResultPage';

class OnlineResultPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isViewDetail: false,
            duplicatedCodeDetails: [],
        }
    }
    componentDidMount(){
        document.title = "Online result page";
    }
 

    render() {
        let { practicalExamId } = this.props.match.params;
        return (
            <div>
                <div>
                    {/* Top navigation */}
                    <TopNavBar pageTitle={PAGE_TITLE} />
                    <div id="wrapper" className="admin-page">
                        <OnlineResultPageContainer id={practicalExamId}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default OnlineResultPage;