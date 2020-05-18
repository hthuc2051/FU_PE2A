import React, { Component } from 'react';
import { LeftSideBar, TopNavBar } from '../components/index';
import { DuplicatedCodePageContainer, DuplicatedCodeDetailContainer } from '../containers/index';
import './style.css';


const PAGE_TITLE = 'DuplicatedCodePage';

class DuplicatedCodePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isViewDetail: false,
            duplicatedCodeDetails: [],
        }
    }
    componentDidMount(){
        document.title = "Duplicated code page";
    }
    viewDetail = (detail) => {
        let { isViewDetail, duplicatedCodeDetails } = this.state;
        isViewDetail = true;
        duplicatedCodeDetails = detail;
        console.log(detail);
        this.setState({ isViewDetail, duplicatedCodeDetails });
    }

    render() {
        let { practicalExamCode } = this.props.match.params;
        let { studentCode } = this.props.match.params;
        let { isViewDetail,duplicatedCodeDetails } = this.state;
        return (
            <div>
                <div>
                    {/* Top navigation */}
                    <TopNavBar pageTitle={PAGE_TITLE} />
                    <div id="wrapper" className="admin-page">
                        {/* Container */}
                        {
                            isViewDetail ?
                                <DuplicatedCodeDetailContainer
                                    examCode={practicalExamCode}
                                    filesTokenArr ={duplicatedCodeDetails}
                                />
                                :
                                <DuplicatedCodePageContainer
                                    practicalExamCode={practicalExamCode}
                                    studentCode={studentCode} viewDetail={this.viewDetail} />
                        }

                    </div>
                </div>
            </div>
        );
    }
}

export default DuplicatedCodePage;