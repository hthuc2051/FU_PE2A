import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onFinishing } from '../actions';
import { getListParamTypes, deleteParamType, createParamType, getListSubjects } from '../axios';
import swal from 'sweetalert';
import * as Constants from '../../constants';

class ParamTypeService extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listParamTypes: [],
            listSubjects: [],
            paramTypeName: '',
            listCheckedSubjects: new Map(),
        };
    }

    componentDidMount() {
        this.props.getListParamTypes();
        this.props.getListSubjects();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps === prevState) {
            return null;
        }
        return {
            listParamTypes: nextProps.listParamTypes,
            listSubjects: nextProps.listSubjects,
        }
    }

    onDelete = async (id) => {
        // render modal
        let result = await swal({
            title: "Confirm delete",
            text: "Are you sure to want to delete this parameter type?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });
        if (result === true) {
            this.props.deleteParamType(id);
        }
    }

    renderParamTypes = (listParamTypes) => {
        let result = [];
        if (typeof (listParamTypes) !== 'undefined') {
            if (listParamTypes.length > 0) {
                result = listParamTypes.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td className='align-middle'>{++index}</td>
                            <td className='align-middle'>{item.name}</td>
                            <td className='align-middle'>{item.subjectCode}</td>
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

    onParamTypeNameChanged = (e) => {
        e.preventDefault();
        let { paramTypeName } = this.state;
        paramTypeName = e.target.value;
        this.setState({paramTypeName});
    }

    createNewParameterType = (paramTypeName) => {
        let {listCheckedSubjects} = this.state;
        let subjectCode = [];

        if (paramTypeName !== null && typeof(paramTypeName) !== 'undefined') {
            if (listCheckedSubjects !== null) {
                listCheckedSubjects.forEach((value, key) => {
                    if (value === false) {
                        listCheckedSubjects.delete(key);
                    }
                });
                
                if (listCheckedSubjects.size > 0) {
                    subjectCode = Array.from(listCheckedSubjects.keys());
                    let paramType = {
                        active: true,
                        name: paramTypeName,
                        subjectCode: subjectCode
                    };
                    console.log(paramType)
                    this.props.createParamType(paramType);
                }
            }
        }
    }

    renderSubjectCheckBoxes = (listSubjects) => {
        let result = [];
        result = listSubjects.map((item, index) => {
            return (
                <div className="custom-control custom-checkbox mb-2" key={index}>
                    <input className="custom-control-input" 
                            type="checkbox" 
                            value={item.code} 
                            id={item.id} onChange={(e) => this.handleCheckboxChange(e)} />
                    <label className="custom-control-label" htmlFor={item.id}>
                        {item.name}
                        </label>
                </div>
            );
        });
        return result;
    }

    handleCheckboxChange = (e) => {
        let { listCheckedSubjects } = this.state;

        const subjectCode = e.target.value;
        const isChecked = e.target.checked;

        listCheckedSubjects.set(subjectCode, isChecked);

        this.setState({listCheckedSubjects});
    }

    renderCreateParamTypeModal() {
        let {paramTypeName, listSubjects} = this.state;
        return (
            <div>
                <div className="modal fade" id="createParamTypeModal" role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="createParamTypeModal">New Parameter Type</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label">Parameter type name:</label>
                                    <input type="text" className="form-control" id="recipient-name" onChange={(e) => this.onParamTypeNameChanged(e)} />
                                </div>
                                <div className="form-group">
                                    <div>
                                        <label htmlFor="recipient-name" className="col-form-label">Subject:</label>
                                    </div>
                                    {listSubjects ? this.renderSubjectCheckBoxes(listSubjects) : ''}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" >Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => this.createNewParameterType(paramTypeName)} >Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        let { listParamTypes } = this.state;
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
                                <button data-toggle="modal" data-target="#createParamTypeModal" type="button" className="btn btn-primary add-new"><i className="fa fa-plus" /> Add New</button>
                                {this.renderCreateParamTypeModal()}
                            </div>
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Parameter Type</th>
                                <th scope="col">Subject Code</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listParamTypes ? this.renderParamTypes(listParamTypes) : ''}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        listParamTypes: state.listActionsPage.listParamTypes,
        listSubjects: state.listActionsPage.listSubjects,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getListParamTypes: () => {
            getListParamTypes(dispatch);
        },
        createParamType: (paramType) => {
            createParamType(paramType, dispatch);
        },
        deleteParamType: (id) => {
            deleteParamType(id, dispatch);
        },
        onFinishing: () => {
            dispatch(onFinishing(Constants.RESET_ACTION_STATUS));
        },
        getListSubjects: () => {
            getListSubjects(dispatch);
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParamTypeService);