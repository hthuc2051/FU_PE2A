import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Constants from '../constants';
import { onLoading } from './actions';
import { JsonToTable } from "react-json-to-table";

import { fetchOnlineResult } from './axios';
import './style.css';

class OnlineResultPageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            onlineResult: [
                {
                    "studentCode": "SE62847",
                    "azureTestResult": [
                        {
                            "date": "2020-05-12T05:25:08.77Z",
                            "testRunResults": [
                                {
                                    "testCaseTitle": "checkConnection",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T05:25:08.77Z"
                                },
                                {
                                    "testCaseTitle": "checkLoginDAOWithBoss",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T05:25:11.487Z"
                                },
                                {
                                    "testCaseTitle": "showAllDAO",
                                    "outcome": "Failed",
                                    "startedDate": "2020-05-12T05:25:22.957Z"
                                },
                                {
                                    "testCaseTitle": "deleteDAO",
                                    "outcome": "Failed",
                                    "startedDate": "2020-05-12T05:25:25.267Z"
                                },
                                {
                                    "testCaseTitle": "testLoginUI",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T05:25:29.803Z"
                                },
                                {
                                    "testCaseTitle": "checkWelcomeWithName",
                                    "outcome": "Failed",
                                    "startedDate": "2020-05-12T05:25:42.87Z"
                                },
                                {
                                    "testCaseTitle": "showAllUI",
                                    "outcome": "Failed",
                                    "startedDate": "2020-05-12T05:25:52.063Z"
                                },
                                {
                                    "testCaseTitle": "deleteUI",
                                    "outcome": "Failed",
                                    "startedDate": "2020-05-12T05:26:01.233Z"
                                },
                                {
                                    "testCaseTitle": "testLogOut",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T05:26:05.773Z"
                                }
                            ]
                        },
                        {
                            "date": "2020-05-12T07:54:00.7Z",
                            "testRunResults": [
                                {
                                    "testCaseTitle": "checkConnection",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T07:54:00.7Z"
                                },
                                {
                                    "testCaseTitle": "checkLoginDAOWithBoss",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T07:54:03.647Z"
                                },
                                {
                                    "testCaseTitle": "showAllDAO",
                                    "outcome": "Failed",
                                    "startedDate": "2020-05-12T07:54:15.33Z"
                                },
                                {
                                    "testCaseTitle": "deleteDAO",
                                    "outcome": "Failed",
                                    "startedDate": "2020-05-12T07:54:17.667Z"
                                },
                                {
                                    "testCaseTitle": "testLoginUI",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T07:54:22.32Z"
                                },
                                {
                                    "testCaseTitle": "checkWelcomeWithName",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T07:54:36.203Z"
                                },
                                {
                                    "testCaseTitle": "showAllUI",
                                    "outcome": "Failed",
                                    "startedDate": "2020-05-12T07:54:45.62Z"
                                },
                                {
                                    "testCaseTitle": "deleteUI",
                                    "outcome": "Failed",
                                    "startedDate": "2020-05-12T07:54:55.017Z"
                                },
                                {
                                    "testCaseTitle": "testLogOut",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T07:54:59.723Z"
                                }
                            ]
                        },
                        {
                            "date": "2020-05-12T08:57:38.367Z",
                            "testRunResults": [
                                {
                                    "testCaseTitle": "checkConnection",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T08:57:38.367Z"
                                },
                                {
                                    "testCaseTitle": "checkLoginDAOWithBoss",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T08:57:41.637Z"
                                },
                                {
                                    "testCaseTitle": "showAllDAO",
                                    "outcome": "Failed",
                                    "startedDate": "2020-05-12T08:57:54.05Z"
                                },
                                {
                                    "testCaseTitle": "deleteDAO",
                                    "outcome": "Failed",
                                    "startedDate": "2020-05-12T08:57:56.693Z"
                                },
                                {
                                    "testCaseTitle": "testLoginUI",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T08:58:01.633Z"
                                },
                                {
                                    "testCaseTitle": "checkWelcomeWithName",
                                    "outcome": "Failed",
                                    "startedDate": "2020-05-12T08:58:15.64Z"
                                },
                                {
                                    "testCaseTitle": "showAllUI",
                                    "outcome": "Failed",
                                    "startedDate": "2020-05-12T08:58:25.72Z"
                                },
                                {
                                    "testCaseTitle": "deleteUI",
                                    "outcome": "Failed",
                                    "startedDate": "2020-05-12T08:58:36.543Z"
                                },
                                {
                                    "testCaseTitle": "testLogOut",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T08:58:41.663Z"
                                }
                            ]
                        }
                    ]
                },
                {
                    "studentCode": "SE62882",
                    "azureTestResult": [
                        {
                            "date": "2020-05-12T05:25:01.663Z",
                            "testRunResults": [
                                {
                                    "testCaseTitle": "checkConnection",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T05:25:01.663Z"
                                },
                                {
                                    "testCaseTitle": "checkLoginDAOWithBoss",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T05:25:04.667Z"
                                },
                                {
                                    "testCaseTitle": "showAllDAO",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T05:25:16.363Z"
                                },
                                {
                                    "testCaseTitle": "deleteDAO",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T05:25:18.663Z"
                                },
                                {
                                    "testCaseTitle": "testLoginUI",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T05:25:23.19Z"
                                },
                                {
                                    "testCaseTitle": "checkWelcomeWithName",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T05:25:37.117Z"
                                },
                                {
                                    "testCaseTitle": "showAllUI",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T05:25:46.43Z"
                                },
                                {
                                    "testCaseTitle": "deleteUI",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T05:25:55.573Z"
                                },
                                {
                                    "testCaseTitle": "testLogOut",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T05:26:02.37Z"
                                }
                            ]
                        },
                        {
                            "date": "2020-05-12T07:54:29.287Z",
                            "testRunResults": [
                                {
                                    "testCaseTitle": "checkConnection",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T07:54:29.287Z"
                                },
                                {
                                    "testCaseTitle": "checkLoginDAOWithBoss",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T07:54:32.557Z"
                                },
                                {
                                    "testCaseTitle": "showAllDAO",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T07:54:45.213Z"
                                },
                                {
                                    "testCaseTitle": "deleteDAO",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T07:54:47.75Z"
                                },
                                {
                                    "testCaseTitle": "testLoginUI",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T07:54:52.7Z"
                                },
                                {
                                    "testCaseTitle": "checkWelcomeWithName",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T07:55:07.763Z"
                                },
                                {
                                    "testCaseTitle": "showAllUI",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T07:55:17.963Z"
                                },
                                {
                                    "testCaseTitle": "deleteUI",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T07:55:28.067Z"
                                },
                                {
                                    "testCaseTitle": "testLogOut",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T07:55:35.493Z"
                                }
                            ]
                        },
                        {
                            "date": "2020-05-12T08:57:40.18Z",
                            "testRunResults": [
                                {
                                    "testCaseTitle": "checkConnection",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T08:57:40.18Z"
                                },
                                {
                                    "testCaseTitle": "checkLoginDAOWithBoss",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T08:57:43.297Z"
                                },
                                {
                                    "testCaseTitle": "showAllDAO",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T08:57:56.113Z"
                                },
                                {
                                    "testCaseTitle": "deleteDAO",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T08:57:58.593Z"
                                },
                                {
                                    "testCaseTitle": "testLoginUI",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T08:58:03.947Z"
                                },
                                {
                                    "testCaseTitle": "checkWelcomeWithName",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T08:58:18.823Z"
                                },
                                {
                                    "testCaseTitle": "showAllUI",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T08:58:29.003Z"
                                },
                                {
                                    "testCaseTitle": "deleteUI",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T08:58:39.31Z"
                                },
                                {
                                    "testCaseTitle": "testLogOut",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T08:58:46.77Z"
                                }
                            ]
                        }
                    ]
                },
                {
                    "studentCode": "SE63146",
                    "azureTestResult": [
                        {
                            "date": "2020-05-12T05:26:22.68Z",
                            "testRunResults": [
                                {
                                    "testCaseTitle": "checkConnection",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T05:26:22.68Z"
                                },
                                {
                                    "testCaseTitle": "checkLoginDAOWithBoss",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T05:26:25.657Z"
                                },
                                {
                                    "testCaseTitle": "showAllDAO",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T05:26:37.163Z"
                                },
                                {
                                    "testCaseTitle": "deleteDAO",
                                    "outcome": "Failed",
                                    "startedDate": "2020-05-12T05:26:39.46Z"
                                },
                                {
                                    "testCaseTitle": "testLoginUI",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T05:26:41.78Z"
                                },
                                {
                                    "testCaseTitle": "checkWelcomeWithName",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T05:26:56.11Z"
                                },
                                {
                                    "testCaseTitle": "showAllUI",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T05:27:05.343Z"
                                },
                                {
                                    "testCaseTitle": "deleteUI",
                                    "outcome": "Failed",
                                    "startedDate": "2020-05-12T05:27:14.49Z"
                                },
                                {
                                    "testCaseTitle": "testLogOut",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T05:27:16.877Z"
                                }
                            ]
                        },
                        {
                            "date": "2020-05-12T07:56:58.437Z",
                            "testRunResults": [
                                {
                                    "testCaseTitle": "checkConnection",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T07:56:58.437Z"
                                },
                                {
                                    "testCaseTitle": "checkLoginDAOWithBoss",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T07:57:01.413Z"
                                },
                                {
                                    "testCaseTitle": "showAllDAO",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T07:57:13.983Z"
                                },
                                {
                                    "testCaseTitle": "deleteDAO",
                                    "outcome": "Failed",
                                    "startedDate": "2020-05-12T07:57:16.55Z"
                                },
                                {
                                    "testCaseTitle": "testLoginUI",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T07:57:19.083Z"
                                },
                                {
                                    "testCaseTitle": "checkWelcomeWithName",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T07:57:34.083Z"
                                },
                                {
                                    "testCaseTitle": "showAllUI",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T07:57:44.337Z"
                                },
                                {
                                    "testCaseTitle": "deleteUI",
                                    "outcome": "Failed",
                                    "startedDate": "2020-05-12T07:57:54.497Z"
                                },
                                {
                                    "testCaseTitle": "testLogOut",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T07:57:57.067Z"
                                }
                            ]
                        },
                        {
                            "date": "2020-05-12T08:58:37.473Z",
                            "testRunResults": [
                                {
                                    "testCaseTitle": "checkConnection",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T08:58:37.473Z"
                                },
                                {
                                    "testCaseTitle": "checkLoginDAOWithBoss",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T08:58:40.64Z"
                                },
                                {
                                    "testCaseTitle": "showAllDAO",
                                    "outcome": "Failed",
                                    "startedDate": "2020-05-12T08:58:53.597Z"
                                },
                                {
                                    "testCaseTitle": "deleteDAO",
                                    "outcome": "Failed",
                                    "startedDate": "2020-05-12T08:58:56.073Z"
                                },
                                {
                                    "testCaseTitle": "testLoginUI",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T08:58:58.613Z"
                                },
                                {
                                    "testCaseTitle": "checkWelcomeWithName",
                                    "outcome": "Failed",
                                    "startedDate": "2020-05-12T08:59:14.103Z"
                                },
                                {
                                    "testCaseTitle": "showAllUI",
                                    "outcome": "Failed",
                                    "startedDate": "2020-05-12T08:59:24.327Z"
                                },
                                {
                                    "testCaseTitle": "deleteUI",
                                    "outcome": "Failed",
                                    "startedDate": "2020-05-12T08:59:34.84Z"
                                },
                                {
                                    "testCaseTitle": "testLogOut",
                                    "outcome": "Passed",
                                    "startedDate": "2020-05-12T08:59:37.427Z"
                                }
                            ]
                        }
                    ]
                }
            ],
        };
    }

    componentDidMount() {
        // this.props.onFetchOnlineResult(this.props.id);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // if (nextProps === prevState) {
        //     return null;
        // }
        // return {
        //     onlineResult: nextProps.onlineResult,
        // }

    }

    renderArr = (arr) => {
        let result = null;
        if (arr && arr.length > 0) {
            result = arr.map((item, index) => {
                return (
                    <div key={index}>
                        <h4>Student code: {item.studentCode}</h4>
                        {this.renderSubArr(item.azureTestResult)}
                    </div>

                )
            });
        }
        return result;
    }

    renderSubArr = (arr) => {
        let result = null;
        if (arr && arr.length > 0) {
            result = arr.map((item, index) => {
                return (
                    <div key={index} style={{margin:'15px'}} >
                        <h3>{item.date}</h3>
                        <JsonToTable json={item.testRunResults} />
                    </div>
                )
            });
        }
        return result;
    }

    render() {
        let { onlineResult } = this.state;
        return (
            <div id="content-wrapper">
                {onlineResult ? this.renderArr(onlineResult) : 'No content'}
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
        onlineResult: state.lecturerPage.onlineResult,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        // onLoading: () => {
        //     dispatch(onLoading(Constants.FETCH_PRACTICAL_EXAMS + Constants.PREFIX_LOADING));
        // },
        onFetchOnlineResult: (subjectId) => {
            fetchOnlineResult(subjectId, dispatch);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OnlineResultPageContainer);

