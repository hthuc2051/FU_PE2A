import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import ModalEditPracticalExam from '../modals/ModalEditPracticalExam';
import '../style.css';
import * as Constants from '../../constants';
import { onLoading, onFinishing } from '../actions';
import { fetchPracticalExams, deletePracticalExam } from '../axios';
import ModalCreatePracticalExam from '../modals/ModalCreatePracticalExam';
const TYPE_CREATE = 'CREATE';
const TYPE_EDIT = 'EDIT';


class ListPracticalExams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            practicalExams: [],
            editObj: null,
            isOpenForm: false,
            formType: TYPE_CREATE,
            message: '',
        };
    }

    componentDidMount() {
        // Fetch API here with subject code 
        console.log(this.props.subjectId);
        this.props.onFetchPracticalExams(this.props.subjectId);
    }
    viewDetails = (id) => {
        let { practicalExams } = this.state;
        let obj = practicalExams.find(item => item.id === id);
        this.setState({
            isOpenForm: true,
            formType: TYPE_EDIT,
            editObj: obj,
        })
        // Open modal
    }
    
    onDelete = async (id) => {
        let result = await swal({
            title: "Confirm delete",
            text: "Are you sure to want to delete this practical exam?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });
        if (result === true) {
            this.props.onDeletePracticalExam(id);
        }
    }
    openCreateForm = () => {
        this.setState({
            isOpenForm: true,
            formType: TYPE_CREATE,
        })
        // Open modal
    }
    onCloseDetails = (isOpenForm) => {
        this.setState({
            isOpenForm: isOpenForm,
            editObj: null,
        })
    }

    // old : componentWillReceiveProps
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps === prevState) {
            return null;
        }
        let { action, message } = nextProps;
        if (prevState.action !== action) {

        }
        return {
            practicalExams: nextProps.practicalExams,
            isLoading: nextProps.isLoading,
            statusCode: nextProps.statusCode,
            action: nextProps.action,
            message: nextProps.message,
        }
    }

    componentDidUpdate(prevProps) {
        // Render giao diện sau khi call api
        let { action, statusCode, message } = this.state;
        if (prevProps.action !== action && message !== '') {
            this.props.onFinishing();
            switch (statusCode) {
                case 200:
                    swal("Successfully !", message, "success").then((value) => {
                        window.location.reload();
                    });

                    break;
                case 500:
                case 409:
                    swal("Failed !", message, "error");
                    break;
            }
        }
    }

    searchText = (e) => {
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

    renderPracticalExams = (arr) => {
        let result = null;
        if (arr == null || typeof (arr) === 'undefined') {
            return;
        }
        if (arr.length > 0) {
            result = arr.map((item, index) => {
                return (
                    <tr key={(index + 1)} >
                        <th scope="row">{(index + 1)}</th>
                        <td>{item.code}</td>
                        <td>{item.date}</td>
                        <td>{item.state}</td>
                        <td><button
                            type="button" className="btn btn-danger"
                            onClick={() => this.onDelete(item.id)}>Delete</button></td>
                        <td><button
                            type="button" className="btn btn-info"
                            onClick={() => this.viewDetails(item.id)}>Details</button></td>
                    </tr>
                )
            });
        }
        return result;
    }

    render() {
        let { practicalExams, editObj, isOpenForm, formType } = this.state;
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
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-12">
                                <button onClick={this.openCreateForm} type="button" className="btn btn-primary add-new"><i className="fa fa-plus" /> Add New</button>
                            </div>
                        </div>
                    </div>
                    <table className="table" id="myTable">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Code</th>
                                <th scope="col">Date</th>
                                <th scope="col">State</th>
                                <th scope="col">Delete</th>
                                <th scope="col">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {practicalExams ? this.renderPracticalExams(practicalExams) : 'No content'}
                        </tbody>
                    </table>
                </div>
                {/* For modal */}
                {/* <ModalEditPracticalExam/> */}
                {formType === TYPE_EDIT ? <ModalEditPracticalExam isOpenForm={isOpenForm} onCloseDetails={this.onCloseDetails} editObj={editObj} /> : ''}
                {formType === TYPE_CREATE ? <ModalCreatePracticalExam isOpenForm={isOpenForm} onCloseDetails={this.onCloseDetails} /> : ''}

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.headerLecturerPage.isLoading,
        statusCode: state.headerLecturerPage.statusCode,
        message: state.headerLecturerPage.message,
        error: state.headerLecturerPage.error,
        action: state.headerLecturerPage.action,
        practicalExams: state.headerLecturerPage.practicalExams,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoading: () => {
            dispatch(onLoading(Constants.FETCH_PRACTICAL_EXAMS + Constants.PREFIX_LOADING));
        },
        onFinishing: () => {
            dispatch(onFinishing(Constants.RESET_ACTION_STATUS));
        },
        onFetchPracticalExams: (subjectId) => {
            fetchPracticalExams(subjectId, dispatch);
        },
        onDeletePracticalExam: (id) => {
            deletePracticalExam(id, dispatch);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPracticalExams);

