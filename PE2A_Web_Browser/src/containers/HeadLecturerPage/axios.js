import callApi from '../api/ApiCaller';
import * as Actions from './actions';
import * as Constants from '../constants';

// Common 

export const fetchAllSubjects = async (dispatch) => {
    let res = await callApi(Constants.END_POINT_SUBJECTS, Constants.METHOD_GET);
    if (res != null) {
        handleResponse(res, Constants.FETCH_SUBJECT_INIT, dispatch);
    }
}

export const fetchClassAndScriptOfSubject = async (subjectId, dispatch) => {
    let endPoint = Constants.generateEndPoint(
        Constants.END_POINT_SUBJECTS,
        subjectId,
        Constants.END_POINT_CLASSES_SCRIPTS);
    let res = await callApi(endPoint, Constants.METHOD_GET, subjectId);
    if (res != null) {
        handleResponse(res, Constants.FETCH_SUBJECT_FULLINFO, dispatch);
    }
}

//
export const fetchEventsData = async (subjectId, dispatch) => {
    let res = await callApi(Constants.END_POINT_EVENTS, Constants.METHOD_GET, subjectId);
    if (res != null) {
        handleResponse(res, Constants.FETCH_EVENTS, dispatch);
    }
}

export const fetchParamType = async (subjectId, dispatch) => {
    let endPoint = Constants.generateEndPoint(
        Constants.END_POINT_PARAM_TYPE,
        subjectId);
    let res = await callApi(endPoint, Constants.METHOD_GET, subjectId);
    if (res != null) {
        handleResponse(res, Constants.GET_PARAM_TYPE, dispatch);
    }
}

export const createTestScript = async (formData, dispatch) => {
    let res = await callApi(Constants.END_POINT_POST_TESTSCRIPT, Constants.PREFIX_POST, formData, null);
    if (res != null) {
        handleResponse(res, Constants.CREATE_TEST_SCRIPT, dispatch);
    }
}

export const updateTestScript = async (formData, dispatch) => {
    let res = await callApi(Constants.END_POINT_POST_TESTSCRIPT, Constants.PREFIX_PUT, formData, null);
    if (res != null) {
        handleResponse(res, Constants.UPDATE_TEST_SCRIPT, dispatch);
    }
}

export const getTestScriptById = async (scriptId, dispatch) => {
    let endPoint = Constants.generateEndPoint(
        Constants.END_POINT_POST_TESTSCRIPT,
        scriptId);
    let res = await callApi(endPoint, "GET", scriptId);
    if (res != null) {
        handleResponse(res, Constants.GET_TEST_SCRIPT, dispatch);
    }
}

export const fetchTestScripts = async (subjectId, dispatch) => {
    let endPoint = Constants.generateEndPoint(
        Constants.END_POINT_GET_TESTSCRIPT_BY_SUBJECTID,
        subjectId);
    let res = await callApi(endPoint, "GET", subjectId);
    if (res != null) {
        handleResponse(res, Constants.FETCH_TEST_SCRIPT, dispatch);
    }
}

export const deleteTestScript = async (id, dispatch) => {
    let endPoint = Constants.generateEndPoint(
        Constants.END_POINT_POST_TESTSCRIPT,
        id);
    let res = await callApi(endPoint, Constants.PREFIX_DELETE);
    if (res != null) {
        handleResponse(res, Constants.DELETE_TEST_SCRIPT, dispatch);
    }
}

// Practical exam
export const fetchPracticalExams = async (subjectId, dispatch) => {
    let endPoint = Constants.generateEndPoint(
        Constants.END_POINT_SUBJECTS,
        subjectId,
        Constants.END_POINT_PRACTICAL_EXAMS);
    let res = await callApi(endPoint);
    if (res != null) {
        handleResponse(res, Constants.FETCH_PRACTICAL_EXAMS, dispatch);
    }
}

export const createPracticalExams = async (practicalExam, dispatch) => {
    let res = await callApi(Constants.END_POINT_PRACTICAL_EXAMS, Constants.PREFIX_POST, practicalExam, null);
    if (res != null) {
        handleResponse(res, Constants.CREATE_PRACTICAL_EXAMS, dispatch);
    }
}

export const updatePracticalExam = async (practicalExam, dispatch) => {
    let res = await callApi(Constants.END_POINT_PRACTICAL_EXAMS, Constants.PREFIX_PUT, practicalExam, null);
    if (res != null) {
        handleResponse(res, Constants.CREATE_PRACTICAL_EXAMS, dispatch);
    }
}

export const deletePracticalExam = async (id, dispatch) => {
    let endPoint = Constants.generateEndPoint(
        Constants.END_POINT_PRACTICAL_EXAMS,
        id);
    let res = await callApi(endPoint, Constants.PREFIX_DELETE);
    if (res != null) {
        handleResponse(res, Constants.DELETE_PRACTICAL_EXAMS, dispatch);
    }
}

const handleResponse = async (response, action, dispatch) => {
    let status = response.status;
    switch (status) {
        case 200:
            await dispatch(Actions.is2xx(200, action + Constants.PREFIX_OK, response.data));
            break;
        case 400:
            // await dispatch(Actions.isNot2xx(400, messages));
            break;
        case 401:
            // await dispatch(Actions.isNot2xx(401, Constants.MSG_REQUEST_LOGIN));
            break;
        case 403:
            // await dispatch(Actions.isNot2xx(403, Constants.MSG_REQUEST_LOGIN));
            break;
        case 404:
            // messages = await getMessages(res.data.message);
            // await dispatch(Actions.isNot2xx(404, messages));
            break;
        case 408:
            await dispatch(Actions.isNot2xx(408, action + Constants.PREFIX_TIME_OUT, response.data));
            break;
        default:
            await dispatch(Actions.isNot2xx(500, action + Constants.PREFIX_FAILED, response.data));
            break;
    }
}