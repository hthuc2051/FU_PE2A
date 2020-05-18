import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Constants from '../../constants';
import { onLoading } from '../actions';
import { createPracticalExams, updatePracticalExam } from '../axios';



class ModalEditPracticalExam extends Component {

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
            subjectSelected: '',
            subjectId: '',
        };
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps === prevState) {
            return null;
        }
        if (nextProps.statusCode === 200) {
        }
        let { editObj, subjects } = nextProps;
        let { checkedClasses, checkedScripts, practicalDate, subjectSelected, subjectId } = prevState;

        // checkedClasses = new Map();
        // checkedScripts = new Map();
        if (editObj != null && typeof (editObj) !== 'undefined') {
            if (practicalDate === null || practicalDate === '') {
                practicalDate = editObj.date;
            }
            if (subjects != null && typeof (subjects) !== 'undefined') {
                if (subjectSelected === null || subjectSelected === '' || typeof (subjectSelected) === 'undefined') {
                    subjectSelected = subjects.find(item => item.id === parseInt(editObj.subjectId));
                    subjectId = subjectSelected.id;
                }
                if (checkedClasses.size == 0) {
                    let arrClasses = editObj.subjectClass;
                    if (arrClasses != null && typeof (arrClasses) !== 'undefined') {
                        if (arrClasses.length > 0) {
                            arrClasses.forEach(item => {
                                checkedClasses.set(item.id, true);
                            });
                        } else {
                            checkedClasses.set(arrClasses.id, true);
                        }
                    }
                }
                if (checkedScripts.size == 0) {
                    let arrScripts = editObj.scripts;
                    if (arrScripts !== null && typeof (arrScripts) !== 'undefined') {
                        if (arrScripts.length > 0) {
                            arrScripts.forEach(item => {
                                checkedScripts.set(item.id, true);
                            });
                        } else {
                            checkedScripts.set(arrScripts.id, true);
                        }

                    }
                }
            }
        }
        return {
            subjects: nextProps.subjects,
            statusCode: nextProps.statusCode,
            classes: nextProps.classes,
            scripts: nextProps.scripts,
            practicalExam: nextProps.editObj,
            isOpenForm: nextProps.isOpenForm,
            subjectSelected: subjectSelected,
            checkedClasses: checkedClasses,
            checkedScripts: checkedScripts,
            practicalDate: practicalDate,
            subjectId: subjectId,
        }
    }

    onChangeCombobox = (value, index) => {

    }

    handleCheckedClasses = (e) => {
        let { checkedClasses } = this.state;
        const id = e.target.name;
        const isChecked = e.target.checked;
        checkedClasses.set(parseInt(id), isChecked);
        this.setState({
            checkedClasses: checkedClasses,
        })
    }

    handleCheckedScripts = (e) => {
        let { checkedScripts } = this.state;
        const id = e.target.name;
        const isChecked = e.target.checked;
        checkedScripts.set(parseInt(id), isChecked);
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
        let { checkedClasses, checkedScripts, practicalDate,practicalExam } = this.state;
        let listScripts = [];
        let subjectClasses = [];
        console.log(practicalExam);
        let obj = null;
        for (const [key, value] of checkedClasses.entries()) {
            console.log(key,value);
            if (value === true) {
                subjectClasses.push(key)
            }
        }
        for (const [key, value] of checkedScripts.entries()) {
            console.log(key,value);
            if (value === true) {
                listScripts.push(key)
            }
        }
        obj = {
            id : practicalExam.id,
            listScripts: listScripts,
            subjectClasses: subjectClasses,
            date: practicalDate,
        }
        console.log(obj);
        this.props.onUpdatePracticalExam(obj);
    }

    render() {
        let { isOpenForm, subjects, subjectSelected, subjectId, practicalDate } = this.state;
        console.log(subjectId);
        let modalClass = isOpenForm ? "modal" : "modal fade";
        let modalStyle = isOpenForm ? "block" : "";
        return (
            <div className={modalClass} style={{ display: modalStyle }} id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                                Edit practical exam
                            </h5>
                            <button onClick={this.onCloseDetails} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="dropdown-box">
                            <div>Subjects</div>
                            <select
                                name="subjectId"
                                value={subjectId ? subjectId : ''}
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
                                    <input onChange={this.onChange} type="date" name="practicalDate" className="form-control" id="date" placeholder="Date" value={practicalDate ? practicalDate : ''} />
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
                let subjectClassId = item.subjectClassId;
                if (lecturer !== null && typeof (lecturer) !== 'undefined') {
                    lecName = lecturer.lastName + " " + lecturer.middleName + " " + lecturer.firstName;
                }
                return (
                    <label key={index}>
                        <Checkbox name={subjectClassId ? subjectClassId : ''} checked={checkedClasses ? checkedClasses.get(subjectClassId ? subjectClassId : '') : ''}
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
    <input type={type} name={name} checked={checked ? checked : ''} onChange={onChange} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditPracticalExam);

