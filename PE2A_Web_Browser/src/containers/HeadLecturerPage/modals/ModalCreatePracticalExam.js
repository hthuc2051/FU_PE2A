import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Constants from '../../constants';
import { onLoading } from '../actions';
import { createPracticalExams, updatePracticalExam } from '../axios';



class ModalCreatePracticalExam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            statusCode: false,
            practicalExam: null,
            subjects: [],
            classes: [],
            scripts: [],
            practicalDate: '',
            isOpenForm: false,
            checkedClasses: new Map(),
            checkedScripts: new Map(),
            subjectSelected: null,
            subjectId: '',
        };
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps === prevState) {
            return null;
        }
        let {subjectSelected }= prevState;
        let {subjects} = nextProps;
        if(subjectSelected === null || typeof(subjectSelected) === 'undefined'){
            if(subjects !== null || typeof(subjects) !=='undefined')
            subjectSelected = nextProps.subjects[0];
        }
        console.log(subjectSelected);

        return {
            subjects: subjects,
            statusCode: nextProps.statusCode,
            classes: nextProps.classes,
            scripts: nextProps.scripts,
            practicalExam: nextProps.editObj,
            isOpenForm: nextProps.isOpenForm,
            formType: nextProps.formType,
            subjectSelected:subjectSelected,
        }
    }

    onChangeCombobox = (value, index) => {

    }

    handleCheckedClasses = (e) => {
        let { checkedClasses } = this.state;
        const id = e.target.name;
        const isChecked = e.target.checked;
        checkedClasses.set(id, isChecked);
        this.setState({
            checkedClasses: checkedClasses,
        })
    }

    handleCheckedScripts = (e) => {
        let { checkedScripts } = this.state;
        const id = e.target.name;
        const isChecked = e.target.checked;
        checkedScripts.set(id, isChecked);
        this.setState({
            checkedScripts: checkedScripts,
        })
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        this.setState({
            [name]: target.value
        });
    }

    onChangeDropdown = (e) => {
        let { subjects } = this.state;
        var target = e.target;
        let value = target.value;
        let subjectSelected = subjects.find(item => item.id === parseInt(value));
        this.setState({
            subjectSelected: subjectSelected,
            subjectId: subjectSelected.id,
        })
    }

    onCloseDetails = () => {
        this.setState({
            isOpenForm: false,
        })
        this.props.onCloseDetails(false);
    }

    onSave = () => {
        let { checkedClasses, checkedScripts, practicalDate } = this.state;
        let listScripts = Array.from(checkedScripts.keys());
        let subjectClasses = Array.from(checkedClasses.keys());
        let obj = null;
        obj = {
            listScripts: listScripts,
            subjectClasses: subjectClasses,
            date: practicalDate,
        }
        this.props.onCreatePracticalExams(obj);
    }

    render() {
        let { isOpenForm, subjects, subjectSelected, subjectId } = this.state;
        
        let modalClass = isOpenForm ? "modal" : "modal fade";
        let modalStyle = isOpenForm ? "block" : "";
        return (
            <div className={modalClass} style={{ display: modalStyle }} id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                                Create practical exam
                            </h5>
                            <button onClick={this.onCloseDetails} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="dropdown-box">
                            <div>Subjects</div>
                            <select
                                name="subjectId"
                                value={subjectId}
                                onChange={this.onChangeDropdown}
                            >
                                {this.onRenderSubjectsOption(subjects)}
                            </select>
                        </div>
                        <div className="check-box">
                            <div>Classes</div>
                            <div className="classes-box">
                                {
                                    !subjectSelected ? '' : this.renderCheckBoxClasses(subjectSelected.classes)
                                }
                            </div>
                        </div>
                        <div className="check-box ">
                            <div>Script availables</div>
                            <div className="scripts-box" >
                                {
                                    !subjectSelected ? '' : this.renderCheckBoxScripts(subjectSelected.scripts)
                                }
                            </div>
                        </div>

                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="date">Date</label>
                                    <input onChange={this.onChange} type="date" name="practicalDate" className="form-control" id="date" placeholder="Date" />
                                </div>
                                <div className="form-group">
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button onClick={this.onSave} type="button" className="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onRenderSubjectsOption = (arr) => {
        let result = null;
        if (arr == null || typeof (arr) === 'undefined') {
            return;
        }
        if (arr.length > 0) {
            result = arr.map((item, index) => {
                return (
                    <option key={index} value={item.id}>{item.code}</option>
                )
            });
        }
        return result;
    }

    renderCheckBoxScripts = (arr) => {
        let { checkedScripts } = this.state;
        let result = null;
        if (arr == null || typeof (arr) === 'undefined') {
            return;
        }
        if (arr.length > 0) {
            result = arr.map((item, index) => {

                return (
                    <label key={index}>
                        <Checkbox name={item.id} checked={checkedScripts.get(item.id)}
                            onChange={this.handleCheckedScripts} />
                        {item.name}
                    </label>
                )
            });
        }
        return result;
    }
    renderCheckBoxClasses = (arr) => {
        let { checkedClasses } = this.state;
        let result = null;
        if (arr == null || typeof (arr) === 'undefined') {
            return;
        }
        if (arr.length > 0) {
            result = arr.map((item, index) => {
                let lecturer = item.lecturer;
                let lecName = "";
                if (lecturer !== null && typeof (lecturer) !== 'undefined') {
                    lecName = lecturer.lastName + " " + lecturer.middleName + " " + lecturer.firstName;
                }
                return (
                    <label key={index}>
                        <Checkbox name={item.subjectClassId} checked={checkedClasses.get(item.subjectClassId)}
                            onChange={this.handleCheckedClasses} />
                        {item.classCode + " - " + lecName}
                    </label>
                )
            });
        }
        return result;
    }

}

const Checkbox = ({ type = 'checkbox', name, checked, onChange }) => (
    <input type={type} name={name} checked={checked} onChange={onChange} />
);

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
        onCreatePracticalExams: (practicalExamArr) => {
            createPracticalExams(practicalExamArr, dispatch);
        },
        onUpdatePracticalExam: (practicalExam) => {
            updatePracticalExam(practicalExam, dispatch);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreatePracticalExam);

