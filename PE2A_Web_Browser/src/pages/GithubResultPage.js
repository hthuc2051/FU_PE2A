import React, { Component } from 'react';
import { LeftSideBar, TopNavBar } from '../components/index';
import { GithubResultContainer, GithubResultDetailContainer } from '../containers/index';
import './style.css';


const PAGE_TITLE = 'GitHub Result';

class GithubResultPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isViewDetail: false,
            listFile: [],
        }
    }

    componentDidMount(){
        document.title = "GitHub result page";

    }
    viewDetail = (listFiles) => {
         let { isViewDetail, listFile } = this.state;
        isViewDetail = true;
        listFile = listFiles;
        console.log(listFile);
        this.setState({ isViewDetail, listFile });
    }

    viewListFile = () =>{
        this.setState({isViewDetail:false});
    }

    render() {
        let { practicalExamCode } = this.props.match.params;
        let { studentCode } = this.props.match.params;
        let { isViewDetail,listFile } = this.state;
        return (
            <div>
                <div>
                    {/* Top navigation */}
                    <TopNavBar pageTitle={PAGE_TITLE} />
                    <div id="wrapper" className="admin-page">
                        {/* Container */}
                        {
                            isViewDetail ?
                                <GithubResultDetailContainer
                                    listFile ={listFile}
                                    backToListFile={this.viewListFile}
                                />
                                :
                                <GithubResultContainer
                                    practicalExamCode={practicalExamCode}
                                    studentCode={studentCode} viewDetail={this.viewDetail} />
                        }

                    </div>
                </div>
            </div>
        );
    }
}

export default GithubResultPage;