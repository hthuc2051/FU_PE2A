import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Constants from '../constants';
import { onLoading } from './actions';
import { fetchPracticalExams } from './axios';
import './style.css';
import { history } from './../../App';


class LecturerPageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            practicalExams: [],
        };
    }

    componentDidMount() {
        this.props.onFetchPracticalExams(this.props.id);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps === prevState) {
            return null;
        }
        return {
            practicalExams: nextProps.practicalExams,
        }

    }
    onDownload = (id) => {
        window.open("http://localhost:2021/api/templates/" + id);
    }

    onViewResult = (id) => {
        history.push("/practical-exam/online-result/" + id);
        window.location.reload();
    }
    renderPracticalExams = (arr) => {
        let result = null;
        if (arr && arr.length > 0) {
            result = arr.map((item, index) => {
                return (
                    <tr key={index} >
                        <th scope="row">{++index}</th>
                        <td>{item.date}</td>
                        <td>{item.classCode}</td>
                        <td>{item.subjectCode}</td>
                        <td>{item.state}</td>
                        <td><button
                            type="button" className="btn btn-info" onClick={() => this.onDownload(item.id)}>Download</button></td>
                        <td><button
                            type="button" className="btn btn-info" onClick={() => this.onViewResult(item.id)}>Online result</button></td>
                    </tr>

                )
            });
        }
        return result;
    }
    render() {
        let { isLoading, practicalExams } = this.state;
        return (
            <div id="content-wrapper">
                <nav className="question-nav">
                    <div className="input-field">
                        <div className="icon-wrap">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={20} height={20} viewBox="0 0 20 20">
                                <path d="M18.869 19.162l-5.943-6.484c1.339-1.401 2.075-3.233 2.075-5.178 0-2.003-0.78-3.887-2.197-5.303s-3.3-2.197-5.303-2.197-3.887 0.78-5.303 2.197-2.197 3.3-2.197 5.303 0.78 3.887 2.197 5.303 3.3 2.197 5.303 2.197c1.726 0 3.362-0.579 4.688-1.645l5.943 6.483c0.099 0.108 0.233 0.162 0.369 0.162 0.121 0 0.242-0.043 0.338-0.131 0.204-0.187 0.217-0.503 0.031-0.706zM1 7.5c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5-2.916 6.5-6.5 6.5-6.5-2.916-6.5-6.5z" />
                            </svg>
                        </div>
                        <input id="search" type="text" placeholder="Search..." />
                    </div>
                </nav>
                <br />
                <div className="card content">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Practical date</th>
                                <th scope="col">Class</th>
                                <th scope="col">Subject</th>
                                <th scope="col">State</th>
                                <th scope="col">File import</th>
                            </tr>
                        </thead>
                        <tbody>
                            {practicalExams ? this.renderPracticalExams(practicalExams) : 'No content'}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isLoading: state.lecturerPage.isLoading,
        statusCode: state.lecturerPage.statusCode,
        message: state.lecturerPage.message,
        error: state.lecturerPage.error,
        practicalExams: state.lecturerPage.practicalExams,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        // onLoading: () => {
        //     dispatch(onLoading(Constants.FETCH_PRACTICAL_EXAMS + Constants.PREFIX_LOADING));
        // },
        onFetchPracticalExams: (subjectId) => {
            fetchPracticalExams(subjectId, dispatch);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LecturerPageContainer);

