import React, { Component } from 'react';
import { getListActionsBySubject, deleteAction, getListSubjects } from './axios';
import { connect } from 'react-redux';
import { onFinishing } from './actions';
import swal from 'sweetalert';
import * as Constants from '../constants.js';
import * as AppConstants from '../../constants/AppConstants';
import './style.css';
import { withRouter } from 'react-router-dom';
import CodePageContainer from './../CodePage/CodePageContainer';
import ParamTypeService from './../AdminPage/services/ParamTypeService';
import ParamService from './../AdminPage/services/ParamService';
import UploadTestScript from './../AdminPage/services/TestScript';
import UpdateActionContainer from '../CodePage/UpdateActionContainer';

class AdminPageContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            listActions: [],
            listSubjects: [],
            action: null,
            isSubjectChanged: false,
            isAddnew: false,
            navArr: [],
            navTye: 'Action',
            error: '',
            isUpdate: false,
            updateAction: null,
        };
    }

    componentDidMount() {
        this.props.getListSubjects();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps === prevState) {
            return null;
        }
        return {
            listActions: nextProps.listActions,
            listSubjects: nextProps.listSubjects,
            action: nextProps.action,
            statusCode: nextProps.statusCode,
            isLoading: nextProps.isLoading,
            message: nextProps.message,
            navType: nextProps.type,
            error: nextProps.error,
            isAddnew: nextProps.isAddnew,
            isUpdate: nextProps.isUpdate,
        }
    }

    componentDidUpdate(prevProps) {
        // Render giao diện sau khi call api
        
        let { action, statusCode, message, error } = this.state;
        if (prevProps.action !== action && message !== '') {
            this.props.onFinishing();
            switch (statusCode) {
                case 200:
                    swal("Successfully !", message, "success").then((value) => {
                        window.location.reload();
                    });
                    break;
                case 500:
                    break;
                case 409:
                    swal("Failed !", error.message, "error");
                    break;
                case 410:
                    swal("Failed !", error.message, "error").then((value) => {
                        window.location.reload();
                    });
                    break;
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        
        let { listSubjects } = nextProps;
        let { isSubjectChanged } = this.state;
        if (listSubjects !== null && listSubjects.length > 0 && !isSubjectChanged) {
            this.props.getListActionsBySubject(listSubjects[0].id);
            isSubjectChanged = true;
            this.setState({isSubjectChanged});
        }    
        return true;     
    }

    renderActions = (listActions) => {
        let result = [];
        if (typeof (listActions) !== 'undefined') {
            if (listActions.length > 0) {
                result = listActions.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td className='align-middle'>{++index}</td>
                            <td className='align-middle'>{item.name}</td>
                            <td className='align-middle'>
                                <div>
                                    <p>
                                        <a className="btn btn-info" data-toggle="collapse" href={'#collapseCode' + index}>
                                            Details
                                        </a>
                                    </p>
                                    <div className="row">
                                        <div className="col">
                                            <div className="collapse multi-collapse" id={'collapseCode' + index}>
                                                <div className="card card-body code">
                                                    {item.code ? this.renderCode(item.code) : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className='align-middle'>
                                <div className="collapse multi-collapse" id={'collapseCode' + index}>
                                    <div className='params'>
                                        {item.actionParams ? this.renderParam(item.actionParams) : ''}
                                    </div>
                                </div>
                            </td>
                            <td className='align-middle'>
                                <button className="btn btn-danger"
                                    onClick={() => this.onDelete(item.id)}>Delete</button>
                            </td>
                            <td className='align-middle'>
                                <button className="btn btn-primary"
                                    onClick={() => this.onUpdate(item.id)}>Update</button>
                            </td>
                        </tr>
                    );
                });
            }
        }
        return result;
    }

    onDelete = async (id) => {
        // render modal
        let result = await swal({
            title: "Confirm delete",
            text: "Are you sure to want to delete this action?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });
        if (result === true) {
            this.props.onDeleteAction(id);
        }
    }

    onUpdate = (id) => {
        let { listActions, updateAction } = this.state;
        if (id !== null && typeof (id) !== 'undefined') {
            let action = listActions.find(a => a.id === id);
            updateAction = action;
            this.setState({updateAction, isUpdate: true});
            this.props.onChangedUpdate(true);
        }
    }

    openCreateForm = () => {
        this.props.onChangedAddNew(true);
        //this.props.history.push('/admin/action/create');
    }

    renderParam = (actionsParams) => {
        let result = [];
        result = actionsParams.map((actionsParams, index) => {
            return (
                <p key={index}>{actionsParams.param.name} - {actionsParams.paramType.name}</p>
            );
        });
        return result;
    }

    renderSubject = (subjects) => {
        let result = [];
        result = subjects.map((item, index) => {
            return (
                <p key={index}>{item}</p>
            );
        });
        return result;
    }

    renderCode = (code) => {
        let result = [];
        if (code !== null) {
            let codeSnippet = [];
            codeSnippet = String(code).trim().split(/(.*?;)/g);
            result = codeSnippet.map((item, index) => {
                if (item !== '') {
                    return (
                        <p key={index}>{item}</p>
                    );
                }
            });
            return result;
        }
        return result;
    }

    renderSubjects = (subjects) => {
        let result = [];
        if (subjects !== null && typeof(subjects) !== 'undefined') {
            result = subjects.map((item, index) => {
                return (
                    <option value={item.id} key={index}>{item.code}</option>
                );
            });
        }
        return result;
    }

    changeSubject = (e) => {
        let subjectId = e.target.value;
        if (subjectId !== '') {            
            this.props.getListActionsBySubject(subjectId);
        }
    }

    render() {
        let { listActions, listSubjects, isAddnew, navType, isUpdate, updateAction } = this.state;
        if (AppConstants.PARAM_NAV_TITLE === navType) {
            return (<ParamService />);
        } else if (AppConstants.PARAM_TYPE_NAV_TITLE === navType) {
            return (<ParamTypeService />);
        } else if (AppConstants.ACTION_NAV_TITLE === navType) {
            if (isAddnew) {
                return (<CodePageContainer />);
            } else if (isUpdate) {
                console.log(updateAction)
                return (<UpdateActionContainer updateAction={updateAction} />);
            } else {
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
                        <div className="card content action-page">
                            <div className="table-title">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="input-group mb-3 mt-3 col-4">
                                            <select className="custom-select subject-list" id="inputGroupSelect02" onChange={(e) => this.changeSubject(e)}>
                                                {listSubjects ? this.renderSubjects(listSubjects) : ''}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-6 mt-3">
                                        <div className="col-sm-12">
                                            <button onClick={this.openCreateForm} type="button" className="btn btn-primary add-new"><i className="fa fa-plus" /> Add New</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Action Name</th>
                                        <th scope="col">Code</th>
                                        <th scope="col">Parameter</th>
                                        <th scope="col">Delete</th>
                                        <th scope="col">Update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listActions ? this.renderActions(listActions) : ''}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            }
        }else if(AppConstants.TESTSCRIPT_NAV_TITLE === navType){
            return (<UploadTestScript />); 
        }
    }
}

const mapStateToProps = state => {
    return {
        listActions: state.listActionsPage.listActions,
        listSubjects: state.listActionsPage.listSubjects,
        isLoading: state.listActionsPage.isLoading,
        statusCode: state.listActionsPage.statusCode,
        message: state.listActionsPage.message,
        error: state.listActionsPage.error,
        action: state.listActionsPage.action,
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getListActionsBySubject: (subjectId) => {
            getListActionsBySubject(subjectId, dispatch);
        },
        onFinishing: () => {
            dispatch(onFinishing(Constants.RESET_ACTION_STATUS));
        },
        onDeleteAction: (id) => {
            deleteAction(id, dispatch);
        },
        getListSubjects: () => {
            getListSubjects(dispatch);
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminPageContainer));
