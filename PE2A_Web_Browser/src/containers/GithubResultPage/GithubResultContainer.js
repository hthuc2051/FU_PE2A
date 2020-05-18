import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGithubResult } from './axios';
class GithubResultContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            practicalExamCode: '',
            studentCode: '',
            filesResult: [],
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(nextProps);
        if (nextProps === prevState) {
            return null;
        }
        return {
            isLoading: nextProps.isLoading,
            message: nextProps.message,
            action: nextProps.action,
            statusCode: nextProps.statusCode,
            filesResult: nextProps.filesResult
        }
    }

    componentDidMount = () => {
        let { practicalExamCode, studentCode } = this.props;
        this.setState({ practicalExamCode: practicalExamCode, studentCode: studentCode });
        let data = {
            practicalExamCode: practicalExamCode,
            studentCode: studentCode
        }
        this.props.getGithubResult(data);
    }

    viewDetail = (listFile) => {
        this.props.viewDetail(listFile);
    }

    colorPercent(percent) {
        let result = 'badge ';
        if (percent <= 30) {
            result += 'badge-success';
        }
        else if (percent <= 50) {
            result += 'badge-warning';
        }
        else {
            result += 'badge-danger';
        }
        return result;
    }

    renderListFile = (filesResult) => {
        console.log(filesResult);
        let result = null;
        if (filesResult !== null && typeof (filesResult) !== 'undefined') {
           
                result = filesResult.map((item, index) => {
                    let listFile = item.listFile;
                    let hightestPercent =  0 ;
                    if(listFile.length > 0){
                        hightestPercent = listFile[0].percent
                    }
                    return (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.studentFile}</td>
                            {/* <td><h5><span className={this.colorPercent(hightestPercent)}>{hightestPercent.toFixed(0)}%</span></h5></td> */}
                            <td><button type="button" className="btn btn-info" onClick={(e) => { e.preventDefault(); this.viewDetail(item.listFile) }}>Detail</button></td>
                        </tr>
                    );
                })
            
        }

        return result;
    }


    searchText = (e) => {
        let { filesResult } = this.state;
        if (filesResult.length === 0) return;
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (let i = 1; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td");
            if (td) {
                let flag = false;
                for (let j = 0; j < 2; j++) {
                    if (td[j]) {
                        txtValue = td[j].textContent || td[j].innerText;
                        if (txtValue.toUpperCase().indexOf(filter) > -1) {
                            flag = true
                        }
                    }
                }
                if (flag) {
                    tr[i].style.display = "";
                }
                else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    checkOnline = () => {
        let { practicalExamCode, studentCode } = this.state;
    }

    render() {
        let { studentCode } = this.props;
        let { filesResult } = this.state;
        console.log(filesResult);
        return (<div id="content-wrapper">
            <nav className="question-nav card_border_search">
                <div className="input-field">
                    <div className="icon-wrap">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={20} height={20} viewBox="0 0 20 20">
                            <path d="M18.869 19.162l-5.943-6.484c1.339-1.401 2.075-3.233 2.075-5.178 0-2.003-0.78-3.887-2.197-5.303s-3.3-2.197-5.303-2.197-3.887 0.78-5.303 2.197-2.197 3.3-2.197 5.303 0.78 3.887 2.197 5.303 3.3 2.197 5.303 2.197c1.726 0 3.362-0.579 4.688-1.645l5.943 6.483c0.099 0.108 0.233 0.162 0.369 0.162 0.121 0 0.242-0.043 0.338-0.131 0.204-0.187 0.217-0.503 0.031-0.706zM1 7.5c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5-2.916 6.5-6.5 6.5-6.5-2.916-6.5-6.5z" />
                        </svg>
                    </div>
                    <input id="myInput" onChange={(e) => { e.preventDefault(); this.searchText(e) }} type="text" placeholder="Search..." />
                </div>
            </nav>
            <br />
            <div className="card content card_border_search" style={{marginBottom:300}}>
                <h2 className="github-button"><span className="badge badge-info">{studentCode}</span></h2>
                <table className="table" id="myTable">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Student Code</th>
                            {/* <th scope="col">Similarity Percent</th> */}
                            <th scope="col">View Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.renderListFile(filesResult)}
                    </tbody>
                </table>
            </div>
        </div>)
    }
}
const mapStateToProps = state => {
    console.log(state);
    return {
        filesResult: state.githubResultPage.filesResult,
        isLoading: state.githubResultPage.isLoading,
        statusCode: state.githubResultPage.statusCode,
        message: state.githubResultPage.message,
        error: state.githubResultPage.error,
        action: state.githubResultPage.action,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getGithubResult: (data) => {
            getGithubResult(data, dispatch);
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GithubResultContainer);