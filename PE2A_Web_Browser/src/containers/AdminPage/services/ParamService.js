import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onFinishing } from '../actions';
import { getListParams, onDeleteParam, createParameter } from '../axios';
import swal from 'sweetalert';
import * as Constants from '../../constants';

class ParamService extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listParams: [],
            error: '',
            paramName: '',
        };
    }

    componentDidMount() {
        this.props.getListParams();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps === prevState) {
            return null;
        }
        return {
            listParams: nextProps.listParams,            
        }
    }

    // componentDidUpdate(prevProps) {
    //     let { action, statusCode, message, error } = this.state;
    //     if (prevProps.action !== action && message !== '') {
    //         this.props.onFinishing();
    //         switch (statusCode) {
    //             case 200:
    //                 swal("Successfully !", message, "success").then((value) => {
    //                     window.location.reload();
    //                 });
    //                 break;
    //             case 500:
    //                 break;
    //             case 409:
    //                 swal("Failed !", error.message, "error");
    //                 break;
    //         }
    //     }
    // }

    renderParams = (listParams) => {
        let result = [];
        if (typeof (listParams) !== 'undefined') {
            if (listParams.length > 0) {
                result = listParams.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td className='align-middle'>{++index}</td>
                            <td className='align-middle'>{item.name}</td>
                            <td className='align-middle'>
                                <button className="btn btn-danger"
                                    onClick={() => this.onDelete(item.id)}>Delete</button>
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
            text: "Are you sure to want to delete this parameter?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });
        if (result === true) {
            this.props.onDeleteParam(id);
        }
    }

    onParamNameChanged = (e) => {
        e.preventDefault();
        let { paramName } = this.state;
        paramName = e.target.value;
        this.setState({paramName});
    }

    createNewParameter = (paramName) => {
        if (paramName !== null && typeof (paramName) !== 'undefined') {
            let parameter = {
                name: paramName,
                active: true
            };
            this.props.createParameter(parameter);
        }
    }

    renderCreateParamModal() {
        let {paramName} = this.state;
        return (
            <div>
                <div className="modal fade" id="createParamModal" role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="createParamModal">New Parameter</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label">Parameter name:</label>
                                    <input type="text" className="form-control" id="recipient-name" onChange={(e) => this.onParamNameChanged(e)} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" >Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => this.createNewParameter(paramName)} >Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        let {listParams} = this.state;
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
                            <div className="col align-self-end mt-3 mr-3">
                                <button data-toggle="modal" data-target="#createParamModal" type="button" className="btn btn-primary add-new"><i className="fa fa-plus" /> Add New</button>
                                {this.renderCreateParamModal()}
                            </div>
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Parameter Name</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listParams ? this.renderParams(listParams) : ''}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        listParams: state.listActionsPage.listParams,
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getListParams: () => {
            getListParams(dispatch);
        },
        onDeleteParam: (id) => {
            onDeleteParam(id, dispatch);
        },
        onFinishing: () => {
            dispatch(onFinishing(Constants.RESET_ACTION_STATUS));
        },
        createParameter: (parameter) => {
            createParameter(parameter, dispatch);
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ParamService);