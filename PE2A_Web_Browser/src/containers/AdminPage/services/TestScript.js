import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getListSubjects, uploadTestScriptTemplate } from './../axios';
import swal from 'sweetalert';

class UploadTestScript extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listSubjects: [],
            subjectCode: 'Java',
            scriptTemplate: null,
            server: null,
            message: '',
            statusCode: 0,
            isUpdate :false,
        };
    }
    componentDidMount() {
        this.props.getListSubjects();
    }
    componentDidUpdate() {
        let { message, statusCode, isUpdate } = this.state;
        console.log(message)
        if (message !== '' && typeof (message) !== 'undefined' && statusCode !== 0 && isUpdate) {
            switch (statusCode) {
                case 200:
                    swal("Successfully !", message, "success");
                    break;
                case 500:
                case 409:
                    swal("Failed !", message, "error");
                    break;
            }
            this.setState({isUpdate:false});
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps === prevState) {
            return null;
        }
        let message = { nextProps };
        if (nextProps.message !== prevState.message) {
            message = nextProps.message
        } else {
            message = ""
        }
        return {
            listSubjects: nextProps.listSubjects,
            message: message,
            statusCode: nextProps.statusCode
        }
    }

    renderSubjects = (subjects) => {
        let result = [];
        if (subjects !== null && typeof (subjects) !== 'undefined') {
            result = subjects.map((item, index) => {
                return (
                    <option value={item.code} key={index}>{item.code}</option>
                );
            });
        }
        return result;
    }

    changeSubject = (e) => {
        let subjectCode = e.target.value;
        this.setState({ [e.target.name]: subjectCode });
    }

    handelChangeFile = (e) => {
        this.setState({ [e.target.name]: e.target.files[0] });
    }

    checkInput = () => {
        let { scriptTemplate, server } = this.state;
        if (scriptTemplate !== null) return true;
        if (server !== null) return true;
        window.alert("Script template or server must be upload");
        return false;
    }

    upload() {
        if (!this.checkInput()) return;
        let { subjectCode, scriptTemplate, server } = this.state;
        let formData = new FormData();
        formData.append("serverSubject", subjectCode);
        formData.append("scriptSubject", subjectCode);
        if (scriptTemplate !== null) {
            formData.append("scriptFile", scriptTemplate);
        }
        if (server !== null) {
            formData.append("serverFile", server);
        }
        this.setState({isUpdate:true})
        this.props.uploadScriptTemplate(formData);
    }

    render() {
        let { listSubjects } = this.state;
        return (
            <div id="content-wrapper">
                <br />
                <div className="card content action-page">
                    Subject Code:
                   <select className="custom-select  subject-list" name="subjectCode" id="inputGroupSelect02" onChange={(e) => this.changeSubject(e)}>
                        {listSubjects ? this.renderSubjects(listSubjects) : ''}
                    </select>
                    <br/>

                    Test Script Template:
                    <input type="file" name="scriptTemplate" onChange={(e) => { e.preventDefault(); this.handelChangeFile(e) }} /><br/>
                    Server:
                    <input type="file" name="server" onChange={(e) => { e.preventDefault(); this.handelChangeFile(e) }} /><br/>
                    <input className="btn btn-success" type="button" value="Upload" onClick={(e) => { e.preventDefault(); this.upload() }} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        listSubjects: state.listActionsPage.listSubjects,
        message: state.listActionsPage.uploadMessage,
        statusCode: state.listActionsPage.statusCode
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getListSubjects: () => {
            getListSubjects(dispatch);
        },
        uploadScriptTemplate: (formData) => {
            uploadTestScriptTemplate(dispatch, formData);
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadTestScript);