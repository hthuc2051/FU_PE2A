import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListScripts from './services/ListScripts';
import * as Constants from '../constants';
import * as AppConstant from './../../constants/AppConstants';
import { onLoading } from './actions';
import { fetchEventsData, createTestScript, getTestScriptById, updateTestScript, fetchAllSubjects, fetchParamType } from './axios';
import scriptObj from '../../components/TreeView/sample.data';
import './style.css';
import CreateTestScript from './services/CreateTestScript';
import UpdateTestScript from './services/UpdateTestScript';
import ListPracticalExams from './services/ListPracticalExams';
import ScriptTemplateJavaWeb from './services/template.Javaweb';
import ScriptTemplateJava from './services/template.Java';
import ScriptTemplateC from './services/template.C';
import ScriptTemplateCSharp from './services/template.CSharp';
import swal from 'sweetalert';
import { withRouter } from 'react-router-dom';

class HeadLecturerPageContainer extends Component {

    // code: 'public void testcase(){Driver.findViewById("txtUsername").clear();Driver.findViewById("txtUsername") .sendKey("NguyenVanA");Driver.findViewById("txtPassword").clear();Driver.findViewById("txtPassword") .sendKey("p4ssw0rd");assertEquals("admin",question1("NguyenVanA","p4ssw0rd"));}'

    constructor(props) {
        super(props);
        var tempScript = new scriptObj();
        this.state = {
            isLoading: true,
            pageType: '',
            eventData: null,
            subjectId: 0,
            currentTemplate: ScriptTemplateJavaWeb,
            currentScript: null,
            scriptId: null,
            isShowMessage: false,
            param_type: null,
            testAnotaion: '',
            orderAnotation: '',
            isShowPublicString: true,
            isRequireOrder: false,
            templateArr:[]
        };
    }

    componentDidMount() {
        console.log(localStorage);
        let { subjectId, scriptId, pageType } = this.props;
        this.props.onFetchEvents(subjectId);
        this.setState({ subjectId: subjectId, scriptId: scriptId, pageType: pageType });
        if (pageType === AppConstant.PAGE_TYPE_UPDATE_SCRIPT) {
            this.props.getScriptById(scriptId);
        }
        this.props.onFetchAllSubjects();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps === prevState) {
            return null;
        }
        let paramTypes = [];
        if (nextProps.param_type !== null && typeof (nextProps.param_type) !== 'undefined' && nextProps.param_type.length > 0) {
            nextProps.param_type.forEach(element => {
                if (element.name.toLowerCase() !== AppConstant.PARAM_TYPE_CODE) {
                    paramTypes.push(element.name);
                }
            });
        }

        // start set template and order variable by subject code
        let { eventData } = nextProps;
        let currentTemplate = null;
        let orderAnotation = '';
        let testAnotaion = '';
        let isShowPublicString = false;
        let isRequireOrder = false;
        let templateArr = [];
        if (eventData !== null) {
            if (eventData.length > 0) {
                let subjectCode = eventData[0].subjectCode;
                switch (subjectCode) {
                    case AppConstant.SUBJECT_CODE_JAVA:
                        isShowPublicString = true;
                        isRequireOrder = true;
                        testAnotaion = Constants.ANOTATION_TEST_JAVA;
                        orderAnotation = Constants.ANOTATION_ORDER_JAVA;
                        currentTemplate = ScriptTemplateJava; 
                        templateArr = AppConstant.TEMPLATE_ARR_JAVA;
                        break;
                    case AppConstant.SUBJECT_CODE_JAVA_WEB:
                        isShowPublicString = true;
                        isRequireOrder = true;
                        testAnotaion = Constants.ANOTATION_TEST_JAVA;
                        orderAnotation = Constants.ANOTATION_ORDER_JAVA;
                        currentTemplate = ScriptTemplateJavaWeb;
                        templateArr = AppConstant.TEMPLATE_ARR_JAVAWEB;
                        break;
                    case AppConstant.SUBJECT_CODE_CSHARP:
                        isShowPublicString = true;
                        isRequireOrder = false;
                        testAnotaion = Constants.ANOTATION_TEST_CSHARP;
                        orderAnotation = '';
                        currentTemplate = ScriptTemplateCSharp; 
                        templateArr = AppConstant.TEMPLATE_ARR_CSHARP;
                        break;
                    case AppConstant.SUBJECT_CODE_C:
                        isShowPublicString = false;
                        isRequireOrder = false;
                        testAnotaion = '';
                        orderAnotation = '';
                        currentTemplate = ScriptTemplateC; 
                        templateArr = AppConstant.TEMPLATE_ARR_C;
                        break;
                }
            }
        }
        // end set template and order variable by subject code
        console.log(currentTemplate)
        return {
            eventData: nextProps.eventData,
            isLoading: nextProps.isLoading,
            subjectId: nextProps.subjectId,
            scriptId: nextProps.scriptId,
            currentScript: nextProps.currentScript,
            pageType: nextProps.pageType,
            message: nextProps.message,
            action: nextProps.action,
            statusCode: nextProps.statusCode,
            param_type: paramTypes,
            currentTemplate: currentTemplate,
            orderAnotation: orderAnotation,
            testAnotaion: testAnotaion,
            isShowPublicString: isShowPublicString,
            isRequireOrder: isRequireOrder,
            template_arr:templateArr
        }
    }

    componentDidUpdate(prevProps) {
        let { statusCode, message, subjectId, isShowMessage } = this.state;

        console.log(message)
        console.log(isShowMessage);
        if (isShowMessage && message !== '') {
            switch (statusCode) {
                case 200:
                    swal("Successfully !", message, "success");
                    break;
                case 500:
                case 409:
                    swal("Failed !", message, "error");
                    break;
            }
            this.setState({ isShowMessage: false });
            this.props.history.push('/subjects/' + subjectId + '/scripts');
            window.location.reload();
        }

    }

    getDataBeforeSaveTestScript = (questionArr, scriptName, originalArr, pageType, globalVariableCode, document, templateQuestion, database, testData, connection) => {
        let { subjectId, scriptId } = this.state;
        // temp data
        //checkQuestion1:2-checkQuestion2:4-checkQuestion3:2-checkQuestion4:2
        let tempQuestionPointStr = this.createQuestionPointString(questionArr.questions);
        let headLecturerId = 1;
        let question = this.createQuestionString(questionArr.questions, globalVariableCode);
        let questionStr = JSON.stringify(question);
        let questionData = JSON.stringify(originalArr);
        let formData = new FormData();
        formData.append("name", scriptName);
        formData.append("questionPointStr", tempQuestionPointStr);
        formData.append("globalVariable", globalVariableCode);
        formData.append("questions", questionStr);
        formData.append("headLecturerId", headLecturerId);
        formData.append("subjectId", subjectId);
        console.log(connection);
        console.log(document);
        console.log(templateQuestion);
        console.log(database);
        if (document !== null) {
            formData.append("docsFile", document);
        }
        if (templateQuestion !== null) {
            formData.append("templateQuestion", templateQuestion);
        }
        if (database !== null) {
            formData.append("database", database);
        }
        if (testData !== null) {
            formData.append("testData", testData);
        }
        if (connection !== null && typeof (connection) !== 'undefined') {
            if (connection.online !== null && typeof (connection.online) !== 'undefined') {
                formData.append("onlineConnection", JSON.stringify(connection.online));
            }
            if (connection.offline !== null && typeof (connection.offline) !== 'undefined') {
                formData.append("offlineConnection", JSON.stringify(connection.offline));
            }
        }
        formData.append("scriptData", questionData);

        switch (pageType) {
            case AppConstant.PAGE_TYPE_CREATE_SCRIPT:
                this.props.saveTestScript(formData);
                this.setState({ isShowMessage: true });
                break;
            case AppConstant.PAGE_TYPE_UPDATE_SCRIPT:
                formData.append("id", scriptId);
                this.props.UpdateTestScript(formData);
                this.setState({ isShowMessage: true });
                break;
        }


    }

    createQuestionString(questionArr) {
        let { testAnotaion, orderAnotation } = this.state;
        // [{"testcase":"testcase1", "code":"ABC"}, {"testcase":"testcase2", "code":"AB2C"}]
        questionArr.forEach(element => {
            if (orderAnotation !== '') {
                let orderAnotations = orderAnotation + '(' + element.order + ')';
                let code = testAnotaion + " \n" + orderAnotations + " \n" + element.code;
                element.code = code.replace(AppConstant.BODY_POSITION, '');
            } else {
                let code = testAnotaion + " \n" + element.code;
                element.code = code.replace(AppConstant.BODY_POSITION, '');
            }
            console.log(element.code);
            delete element.point;
            delete element.order;
        });
        return questionArr;

    }

    createQuestionPointString(questionArr) {
        let questionStr = '';
        questionArr.forEach(element => {
            questionStr += element.testcase + ':' + element.point + '-';
        });
        if (questionStr.length > 0) {
            questionStr = questionStr.substring(0, questionStr.length - 1);
        }
        return questionStr;
    }

    render() {
        let { isLoading, eventData, pageType, subjectId, currentTemplate, currentScript, param_type, isRequireOrder, isShowPublicString,template_arr } = this.state;
      console.log(template_arr)
        return (
            <div className="page-wrapper" >
                <div className={isLoading ? 'loading' : 'none-loading'}>
                    <div className="loader"></div>
                </div>
                {pageType === AppConstant.PAGE_TYPE_LIST_SCRIPT ? <ListScripts subjectId={subjectId} /> : ''}
                {pageType === AppConstant.PAGE_TYPE_CREATE_SCRIPT ? <CreateTestScript eventData={eventData} subjectId={subjectId} param_type={param_type} currentTemplate={currentTemplate} saveTestScript={this.getDataBeforeSaveTestScript} isShowPublicString={isShowPublicString} isRequireOrder={isRequireOrder} template_arr = {template_arr} /> : ''}
                {pageType === AppConstant.PAGE_TYPE_LIST_PRACTICAL_EXAM ? <ListPracticalExams subjectId={subjectId}  /> : ''}
                {pageType === AppConstant.PAGE_TYPE_UPDATE_SCRIPT && currentScript ? <UpdateTestScript script={currentScript} eventData={eventData} subjectId={subjectId} param_type={param_type} currentTemplate={currentTemplate} saveTestScript={this.getDataBeforeSaveTestScript} isShowPublicString={isShowPublicString} isRequireOrder={isRequireOrder} template_arr = {template_arr} /> : ''}
            </div>
        );
    }
}



const mapStateToProps = state => {
    return {
        statusCode: state.headerLecturerPage.statusCode,
        isLoading: state.headerLecturerPage.isLoading,
        eventData: state.headerLecturerPage.eventData,
        currentScript: state.headerLecturerPage.currentScript,
        statusCode: state.headerLecturerPage.statusCode,
        message: state.headerLecturerPage.message,
        error: state.headerLecturerPage.error,
        action: state.headerLecturerPage.action,
        param_type: state.headerLecturerPage.param_type,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoading: () => {
            dispatch(onLoading(Constants.FETCH_EVENTS + Constants.PREFIX_LOADING));
        },
        onFetchEvents: (subjectId) => {
            fetchEventsData(subjectId, dispatch);
            fetchParamType(subjectId, dispatch);
        },
        getScriptById: (scriptId) => {
            getTestScriptById(scriptId, dispatch);
        },
        saveTestScript: (formData) => {
            createTestScript(formData, dispatch);
        },
        UpdateTestScript: (formData, scriptId) => {
            updateTestScript(formData, dispatch);
        },
        onFetchAllSubjects: () => {
            fetchAllSubjects(dispatch);
        },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeadLecturerPageContainer));

