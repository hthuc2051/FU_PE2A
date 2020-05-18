import React, { Component } from 'react';
import { TreeViewWeb } from './../../../components/index';
import * as AppConstant from './../../../constants/AppConstants';
import ScriptTemplateJavaWeb from './template.Javaweb';
import ModalUploadFile from './../modals/ModalUploadFile';
import ModalConnection from './../modals/ModalConnection';
import '../style.css';

const QUESTION = "Question";

class UpdateTestScript extends Component {
    // code: 'public void testcase(){Driver.findViewById("txtUsername").clear();Driver.findViewById("txtUsername") .sendKey("NguyenVanA");Driver.findViewById("txtPassword").clear();Driver.findViewById("txtPassword") .sendKey("p4ssw0rd");assertEquals("admin",question1("NguyenVanA","p4ssw0rd"));}'
    constructor(props) {
        super(props);
        let template = new ScriptTemplateJavaWeb();
        this.state = {
            isLoading: false,
            pageType: '',
            eventData: null,
            param_type: null,
            questionArr: {
                name: 'test1',
                questions: [{
                    data: template.DEFAULT,
                    testcase: 'Question1',
                    code: template.DEFAULT.code,
                    point: 0,
                    order: 0,
                }],
                global_variable:null,
                connection: {
                    online: {
                        url: '',
                        username: '',
                        password: ''
                    },
                    offline: {
                        url: '',
                        username: '',
                        password: ''
                    },
                }
            },
            scriptName: '',
            count: 2,
            selectedTab: 0,
            txtScriptName: '',
            currentTemplate: ScriptTemplateJavaWeb,
            currentScript: null,
            isOpenForm: false,
            isOpenFormFile: false,
            document: null,
            templateQuestion: null,
            database: null,
            testData: null,
            isShowPublicString: false,
            isRequireOrder: false,
            template_arr:[]
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps === prevState) {
            return null;
        }
        return {
            eventData: nextProps.eventData,
            param_type: nextProps.param_type,
            file: nextProps.file,
            pageType: nextProps.pageType,
            currentTemplate: nextProps.currentTemplate,
            questionArr: nextProps.script.scriptData,
            currentScript: nextProps.script,
            txtScriptName: nextProps.script.scriptData.name,
            isShowPublicString: nextProps.isShowPublicString,
            isRequireOrder: nextProps.isRequireOrder,
            template_arr:nextProps.template_arr
        }
    }

    onSave = (question) => {
        let { questionArr } = this.state;
        let isExisted = false;
        let testCaseName = question.testcase;
        for (let i = 0; i < questionArr.questions.length; i++) {
            if (questionArr.questions[i].testcase === testCaseName) {
                isExisted = true;
                questionArr.questions[i] = question;
            }
        }
        if (!isExisted) {
            questionArr.questions.push(question);
        }
        this.setState({ questionArr });
        console.log(questionArr)
    }

    onSaveGlobalVariable = (globalVariable) => {
        let { global_variable } = this.state;
        global_variable = globalVariable;
        this.setState({ global_variable });
        console.log(global_variable)
    }

    updateTestScript = () => {
        let { questionArr, txtScriptName, document, templateQuestion, database, testData } = this.state;
        let isvalid = this.checkValid(questionArr, txtScriptName);
        if (!isvalid) return;
        let newQuestionArr = { name: 'test1', questions: [] };
        for (let i = 0; i < questionArr.questions.length; i++) {
            let question = { testcase: questionArr.questions[i].data.methodName, code: questionArr.questions[i].code, point: questionArr.questions[i].point, order: questionArr.questions[i].order };
            newQuestionArr.questions.push(question);
        }
        this.props.saveTestScript(newQuestionArr, txtScriptName, questionArr, AppConstant.PAGE_TYPE_UPDATE_SCRIPT, questionArr.global_variable.code, document, templateQuestion, database, testData, questionArr.connection);
    }

    checkValid(questionArr, txtScriptName) {
        let { isRequireOrder } = this.state;
        if (txtScriptName === '') {
            window.alert(AppConstant.ERROR_MSG_EMPTY_SCRIPT_NAME);
            return false;
        }
        for (let i = 0; i < questionArr.questions.length; i++) {
            let code = questionArr.questions[i].code;
            let point = questionArr.questions[i].point;
            let order = questionArr.questions[i].order;
            let reg = /^\d+(.{1}\d+)?$/;
            console.log(order)
            if (code === '') {
                window.alert(AppConstant.ERROR_MSG_EMPTY_QUESTION_CODE + questionArr.questions[i].testcase);
                return false;
            }
            if (point === 0 || point == '') {
                window.alert(AppConstant.ERROR_MSG_EMPTY_QUESTION_POINT + questionArr.questions[i].testcase);
                return false;
            }
            if (!reg.test(point)) {
                window.alert(AppConstant.ERROR_MSG_WRONG_FORMAT_POINT + questionArr.questions[i].testcase);
                return false;
            }
            if (isRequireOrder) {
                if (order === 0 || order === '') {
                    window.alert(AppConstant.ERROR_MSG_EMPTY_QUESTION_ORDER + questionArr.questions[i].testcase);
                    return false;
                }
                if (!reg.test(order)) {
                    window.alert(AppConstant.ERROR_MSG_WRONG_FORMAT_ORDER + questionArr.questions[i].testcase);
                    return false;
                }
            }
        }
        return true;
    }

    // click Add question button
    addQuestionTab = () => {
        //add question into questionarr
        let { questionArr, currentTemplate } = this.state;
        let template = new currentTemplate;
        let index = questionArr.questions.length;
        if (index > 0) {
            let item = { testcase: QUESTION + (index + 1), data: template.DEFAULT, point: 0, code: template.DEFAULT.code, order: 0 };
            questionArr.questions.push(item);
            this.setState({ questionArr });
        }

    }

    resetTreeView = (tabId) => {
        let tab = document.getElementById(tabId);
        let { questionArr } = this.state;
        if (tab !== null) {
            let index = -1;
            for (let i = 0; i < questionArr.questions.length; i++) {
                if (questionArr.questions[i].testcase === tabId) {
                    index = i;
                }
            }
            this.setState({ selectedTab: index });
        }
    }

    closeQuestionTab = (name) => {
        let { questionArr } = this.state;
        if (questionArr.questions.length !== 1) {
            for (let i = 0; i < questionArr.questions.length; i++) {
                if (questionArr.questions[i].testcase === name) {
                    questionArr.questions.splice(i, 1);
                    if (this.state.selectedTab === i) {
                        this.setState({ selectedTab: 0 });
                        let element = questionArr.questions[0].testcase;
                        document.getElementById(element).setAttribute("class", "nav-item nav-link active");
                    }
                    i -= 1;
                } else {
                    questionArr.questions[i].testcase = QUESTION + (i + 1);
                }
            }
            this.setState({ questionArr });
        }
    }

    onchangeTemplate = (selectedTempalate, selectedTab) => {
        let { questionArr, currentTemplate,template_arr } = this.state;
        if (selectedTempalate !== null && typeof (selectedTempalate) !== 'undefined') {
            template_arr.forEach(element => {
                if(element === selectedTempalate){
                    let currentTemplates = new currentTemplate;
                    selectedTempalate = selectedTempalate.toUpperCase();
                    questionArr.questions[selectedTab].data = currentTemplates[selectedTempalate];
                    questionArr.questions[selectedTab].code = currentTemplates[selectedTempalate].code;
                }
            });
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        this.setState({
            [name]: target.value
        });
        if (name === 'txtScriptName') {
            let { questionArr } = this.state;
            questionArr.name = target.value;
            this.setState({ questionArr });
        }
    }

    renderQuestionTab(questionArr) {
        let question = questionArr.questions;
        let result = null;
        if (question !== null && typeof (question) !== 'undefined') {
            if (question.length > 0) {
                result = question.map((item, index) => {
                    if (index == 0) {
                        return (
                            <a className="nav-item nav-link active" id={item.testcase} key={index}
                                data-toggle="tab" onClick={(e) => { e.stopPropagation(); this.resetTreeView(item.testcase) }} href="#panel2" role="tab" aria-controls="nav-home" aria-selected="true">
                                {item.testcase}&nbsp;
                                <button className="closeQuestionTab" onClick={(e) => { e.stopPropagation(); this.closeQuestionTab(item.testcase, index) }}>
                                    <i className="fa fa-close" />
                                </button>
                            </a>
                        )
                    } else {
                        return (
                            <a className="nav-item nav-link" id={item.testcase} key={index}
                                data-toggle="tab" onClick={(e) => { e.stopPropagation(); this.resetTreeView(item.testcase) }} href="#panel2" role="tab" aria-controls="nav-home" aria-selected="true">
                                {item.testcase}&nbsp;
                                <button className="closeQuestionTab" onClick={(e) => { e.stopPropagation(); this.closeQuestionTab(item.testcase, index) }}>
                                    <i className="fa fa-close" />
                                </button>
                            </a>
                        )
                    }

                })
            }
        }
        return result;
    }

    onToggleModal = (isOpenForm) => {
        this.setState({
            isOpenForm: isOpenForm,
        })
    }
    onCloseFormFileDetails = (documentFile, templateQuestionFile, testDataFile) => {
        if(documentFile !== null ){
            this.setState({
                document: documentFile,
                isOpenFormFile: false
            })
        }
        if(templateQuestionFile !== null ){
            this.setState({
                templateQuestion: templateQuestionFile,
                isOpenFormFile: false
            })
        }
        if(testDataFile !== null ){
            this.setState({
                testData: testDataFile,
                isOpenFormFile: false
            })
        }
    }

    onCloseDetails = (editObj, databaseFile) => {
        let { questionArr } = this.state;
        questionArr.connection = editObj
        this.setState({
            questionArr,
            database: databaseFile,
            isOpenForm: false,
        })
    }

    onToggleFileModal = (isOpenFormFile) => {
        this.setState({
            isOpenFormFile: isOpenFormFile,
        })
    }
    render() {
        let { isLoading, eventData, txtScriptName, questionArr, isOpenForm, isOpenFormFile, param_type,isShowPublicString, isRequireOrder,database, document,templateQuestion,testData,template_arr  } = this.state;
        return (
            <div>
                <div id="content-wrapper">
                    <div className={isLoading ? 'loading' : 'none-loading'}>
                        <div className="loader"></div>
                    </div>
                    <nav className="question-nav card_border">

                        <input type="text" name="txtScriptName" id="txtScriptName" value={txtScriptName} onChange={(e) => { e.preventDefault(); this.onChange(e) }} className="form-control script-name" placeholder="Script's name" />
                        <button onClick={(e) => { e.preventDefault(); this.onToggleModal(true) }} className="btn btn-outline-secondary"> CONNECTION</button>
                        <button onClick={(e) => { e.preventDefault(); this.onToggleFileModal(true) }} className="btn btn-primary btn-upload"> UPLOAD</button>


                    </nav>
                    <div className="tab-content card_border" id="nav-tabContent">
                        <div id="nav-tab" role="tablist">
                            <div className="nav nav-tabs ">
                                {questionArr ? <div className="nav">{this.renderQuestionTab(questionArr)}</div> : ''}
                                <button className="addQuestionButton" onClick={(e) => { e.stopPropagation(); this.addQuestionTab() }}>
                                    <i className="fa fa-plus" />
                                </button>
                            </div>
                        </div>
                        <div className="tab-panel fade show active" id="panel1" role="tabpanel" aria-labelledby="question1">
                            <TreeViewWeb eventData={eventData} param_type={param_type} onSave={this.onSave} question={this.state.questionArr.questions[this.state.selectedTab]} selectedTab={this.state.selectedTab}
                                global_variable={this.state.questionArr.global_variable} onSaveGlobalVariable={this.onSaveGlobalVariable} onchangeTemplate={this.onchangeTemplate}
                                 isShowPublicString = {isShowPublicString} isRequireOrder = {isRequireOrder} template_arr={template_arr}/>
                            <div className="tab-create">
                                <button className="btn btn-success btn_create" onClick={(e) => { e.stopPropagation(); this.updateTestScript() }}>
                                    <i className="fa fa-plus" />
                                    &nbsp;UPDATE TEST SCRIPT
                         </button>
                            </div>
                        </div>

                    </div>
                </div>
                {isOpenFormFile ? <ModalUploadFile isOpenForm={this.onToggleFileModal} onCloseDetails={this.onCloseFormFileDetails} editObj={questionArr.connection} document={document} templateQuestion={templateQuestion} testData={testData} /> : ''}
                {isOpenForm ? <ModalConnection isOpenForm={this.onToggleModal} onCloseDetails={this.onCloseDetails} editObj={questionArr.connection} database={database}  /> : ''}
            </div>
        );
    }
}

export default UpdateTestScript;

