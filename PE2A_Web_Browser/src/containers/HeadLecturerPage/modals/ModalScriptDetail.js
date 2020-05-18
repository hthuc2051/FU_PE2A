import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Constants from '../../constants';
import { onLoading } from '../actions';

const TYPE_CREATE = 'CREATE';
const TYPE_EDIT = 'EDIT';


class ModalEditPracticalExam extends Component {

    // code: 'public void testcase(){Driver.findViewById("txtUsername").clear();Driver.findViewById("txtUsername") .sendKey("NguyenVanA");Driver.findViewById("txtPassword").clear();Driver.findViewById("txtPassword") .sendKey("p4ssw0rd");assertEquals("admin",question1("NguyenVanA","p4ssw0rd"));}'

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            statusCode: false,
            editObj: null,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps === prevState) {
            return null;
        }
        return {
            isOpenForm: nextProps.isOpenForm,
            editObj: nextProps.editObj
        }
    }

    onCloseDetails = () => {
        this.setState({
            isOpenForm: false,
        })
        this.props.onCloseDetails(false);
    }

    handleDownLoadDocument = () => {
        let { editObj } = this.state;
        if (editObj !== null && typeof (editObj) !== 'undefined') {
            window.open(Constants.API_URL + "/" + Constants.END_POINT_DOWNLOAD_DOCUMENT + "/" + editObj.id);
        }
    }

    handleDownLoadTestScript = () => {
        let { editObj } = this.state;
        if (editObj !== null && typeof (editObj) !== 'undefined') {
            window.open(Constants.API_URL + "/" + Constants.END_POINT_DOWNLOAD_TESTSCRIPT + "/" + editObj.id);
        }
    }
    handleDownLoadTestData = () => {
        let { editObj } = this.state;
        if (editObj !== null && typeof (editObj) !== 'undefined') {
            window.open(Constants.API_URL + "/" + Constants.END_POINT_DOWNLOAD_TESTDATA + "/" + editObj.id);
        }
    }
    handleDownLoadTemplateQuestion = () => {
        let { editObj } = this.state;
        if (editObj !== null && typeof (editObj) !== 'undefined') {
            window.open(Constants.API_URL + "/" + Constants.END_POINT_DOWNLOAD_TEMPLATE_QUESTION + "/" + editObj.id);
        }
    }

    handleDownLoadDatabase = () => {
        let { editObj } = this.state;
        if (editObj !== null && typeof (editObj) !== 'undefined') {
            window.open(Constants.API_URL + "/" + Constants.END_POINT_DOWNLOAD_DATABASE + "/" + editObj.id);
        }
    }

    render() {
        let { isOpenForm, editObj } = this.state;
        let modalClass = isOpenForm ? "modal" : "modal fade";
        let modalStyle = isOpenForm ? "block" : "";
        console.log(isOpenForm);
        return (
            <div className={modalClass} style={{ display: modalStyle }} id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                                Test Script Detail
                            </h5>
                            <button onClick={this.onCloseDetails} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="txtPracticalExamCode">Script Code</label>
                                    <input readOnly={true} type="text" name="txtPracticalExamCode" value={editObj.code} className="form-control" id="txtPracticalExamCode" placeholder="Enter practical exam code" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="txtPracticalExamCode">Script Name</label>
                                    <input readOnly={true} type="text" name="txtPracticalExamCode" value={editObj.name} className="form-control" id="txtPracticalExamCode" placeholder="Enter practical exam code" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="date">Time Created</label>
                                    <input type="text" name="practicalDate" value={editObj.timeCreated} className="form-control" id="date" placeholder="Date" readOnly />
                                </div>
                            </form>
                            <form>
                                <label htmlFor="date">Download</label>
                                <div className="form-row">
                                    <div className="col">
                                    <input type="button" value="DOCUMENT" onClick={(e) => { e.preventDefault(); this.handleDownLoadDocument() }} className="form-control btn  btn-outline-dark" placeholder="State" />
                                    </div>
                                    <div className="col">
                                    <input type="button" value="TEMPLATE QUESTION" onClick={(e) => { e.preventDefault(); this.handleDownLoadTemplateQuestion() }} className="form-control btn  btn-outline-info" placeholder="State" />
                                    </div>
                                    <div className="col">
                                        <input type="button" value="DATABASE" onClick={(e) => { e.preventDefault(); this.handleDownLoadDatabase() }} className="form-control btn btn-outline-secondary" placeholder="State" />
                                    </div>
                                </div>
        
                            </form>
                        </div>
                        <div className="modal-footer">
                        <button type="button" onClick={(e) => { e.preventDefault(); this.handleDownLoadTestData() }} className="btn btn-dark">DOWNLOAD TEST DATA</button>
                            <button type="button" onClick={(e) => { e.preventDefault(); this.handleDownLoadTestScript() }} className="btn btn-success">DOWNLOAD TEST SCRIPT</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        subjects: state.headerLecturerPage.subjects,
        classes: state.headerLecturerPage.classes,
        scripts: state.headerLecturerPage.scripts,
        statusCode: state.headerLecturerPage.statusCode,
        message: state.headerLecturerPage.message,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoading: () => {
            dispatch(onLoading(Constants.FETCH_PRACTICAL_EXAMS + Constants.PREFIX_LOADING));
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditPracticalExam);

