import React, { Component } from 'react';
import '../style.css';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { fetchTestScripts, deleteTestScript } from '../axios';
import { onLoading, onFinishing } from '../actions';
import ModalScriptDetail from '../modals/ModalScriptDetail';
import * as Constants from '../../constants';
import { withRouter } from 'react-router-dom';
const TYPE_CREATE = 'CREATE';
const TYPE_EDIT = 'EDIT';

class ListScripts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            listScripts: [],
            isOpenForm: false,
            formType: TYPE_CREATE,
            editObj: null,
            isReloadData: false,
        };
    }


    componentDidMount() {
        this.props.fetchTestScripts(this.props.subjectId);
    }

    componentDidUpdate(prevProps) {
        // Render giao diện sau khi call api
        let { statusCode, message, isReloadData } = this.state;
        if(this.state === prevProps) return;
        if (isReloadData && message !== '') {
            switch (statusCode) {
                case 200:
                    swal("Successfully !", message, "success");
                    break;
                case 500:
                case 409:
                    swal("Failed !", message, "error");
                    break;
            }
            //this.props.onFinishing();
            if (isReloadData) {
                this.props.fetchTestScripts(this.props.subjectId);
                this.setState({ isReloadData: false });
            }
        }
    }
    viewScriptDetails = (item) => {
        this.setState({ editObj: item, isOpenForm: true });
    }

    onToggleModal = (isOpenForm) => {
        this.setState({
            isOpenForm: isOpenForm,
        })
    }

    onCloseDetails = (isOpenForm) => {
        this.setState({
            isOpenForm: isOpenForm,
        })
    }

    onDelete = async (id, scriptCode) => {
        console.log(id)
        let result = await swal({
            title: "Confirm delete",
            text: "Are you sure to want to delete " + scriptCode,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });
        if (result === true) {
            this.setState({ isReloadData: true ,message:''});
            this.props.deleteTestScript(id);
        }
    }
    onUpdate = (id) => {
        let { subjectId } = this.state;
        this.props.history.push('/subjects/' + subjectId + '/scripts/' + id);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps === prevState) {
            return null;
        }
        return {
            listScripts: nextProps.listScripts,
            isLoading: nextProps.isLoading,
            statusCode: nextProps.statusCode,
            action: nextProps.action,
            message: nextProps.message,
            subjectId: nextProps.subjectId
        }
    }

    renderListScript = (listScripts) => {
        let result = null;
        if (listScripts !== null && typeof (listScripts) !== 'undefined') {
            if (listScripts.length > 0) {
                result = listScripts.map((item, index) => {
                    return (
                        <tr key={index} >
                            <th scope="row" onClick={(e) => { e.preventDefault(); this.onUpdate(item.id) }}>{index + 1}</th>
                            <td onClick={(e) => { e.preventDefault(); this.onUpdate(item.id) }}>{item.name}</td>
                            <td onClick={(e) => { e.preventDefault(); this.onUpdate(item.id) }}>{item.timeCreated}</td>
                            <td><button className="btn btn-info" onClick={(e) => { e.preventDefault(); this.viewScriptDetails(item) }}>Details</button></td>
                            <td><button className="btn btn-danger" onClick={(e) => { e.preventDefault(); this.onDelete(item.id, item.code) }} >Delete</button></td>
                        </tr>
                    );
                })
            }
        }

        return result;
    }

    searchText = (e) => {
        let { listScripts } = this.state;
        if (listScripts.length === 0) return;
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


    render() {
        let { listScripts, isOpenForm, formType, editObj } = this.state;
        console.log(listScripts);
        return (
            <div id="content-wrapper">
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
                <div className="card content card_border_search">
                    {listScripts ?
                        <table className="table table-hover" id="myTable">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Script name</th>
                                    <th scope="col">Time created</th>
                                    <th scope="col">Details</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderListScript(listScripts)}
                            </tbody>
                        </table> : <p className="empty_script_message">{Constants.MSG_EMPTY_SCRIPT_LIST}</p>
                    }

                </div>
                {isOpenForm ? <ModalScriptDetail isOpenForm={this.onToggleModal} onCloseDetails={this.onCloseDetails} editObj={editObj} /> : ''}
            </div>
        );
    }
}



const mapStateToProps = state => {
    return {
        listScripts: state.headerLecturerPage.listScripts,
        isLoading: state.headerLecturerPage.isLoading,
        statusCode: state.headerLecturerPage.statusCode,
        message: state.headerLecturerPage.message,
        error: state.headerLecturerPage.error,
        action: state.headerLecturerPage.action,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoading: () => {
            dispatch(onLoading(Constants.FETCH_TEST_SCRIPT));
        },
        fetchTestScripts: (subjectId) => {
            fetchTestScripts(subjectId, dispatch);
        },
        deleteTestScript: (testScriptId) => {
            deleteTestScript(testScriptId, dispatch);
        },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListScripts));

