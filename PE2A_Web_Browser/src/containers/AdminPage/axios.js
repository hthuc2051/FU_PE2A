import callApi from '../api/ApiCaller';
import * as Actions from './actions';
import * as Constants from '../constants';

export const getListActionsBySubject = async (id, dispatch) => {
    let endPoint = Constants.generateEndPoint(Constants.END_POINT_LIST_ACTION_BY_SUBJECT, id);
    let res = await callApi(endPoint);
    if (res !== null) {
        handleResponse(res, Constants.FETCH_ACTIONS, dispatch);
    }
}

export const deleteAction = async (id, dispatch) => {
    let endPoint = Constants.generateEndPoint(Constants.END_POINT_ACTION, id);
    let res = await callApi(endPoint, Constants.PREFIX_DELETE);
    if (res !== null) {
        handleResponse(res, Constants.DELETE_ACTION, dispatch);
    }
}

export const createAction = async (action, dispatch) => {
    let result = await callApi(Constants.END_POINT_ACTION, Constants.PREFIX_POST, action, null);
    if (result !== null) {
        handleResponse(result, Constants.CREATE_ACTION, dispatch);
    }
}

export const updateAction = async (action, dispatch) => {
    let result = await callApi(Constants.END_POINT_ACTION, Constants.PREFIX_PUT, action, null);
    if (result !== null) {
        handleResponse(result, Constants.UPDATE_ACTION, dispatch);
    }
}

export const getListParams = async (dispatch) => {
    let results = await callApi(Constants.END_POINT_PARAM);
    if (results !== null) {
        handleResponse(results, Constants.FETCH_PARAM, dispatch);
    }
}

export const onDeleteParam = async (id, dispatch) => {
    let endPoint = Constants.generateEndPoint(Constants.END_POINT_PARAM, id);
    let result = await callApi(endPoint, Constants.PREFIX_DELETE);
    if (result !== null) {
        handleResponse(result, Constants.DELETE_PARAM, dispatch);
    }
}

export const getListSubjects = async (dispatch) => {
    let results = await callApi(Constants.END_POINT_SUBJECTS_ALL);
    if (results !== null) {
        handleResponse(results, Constants.FETCH_SUBJECT, dispatch);
    }
}

export const createParameter = async (parameter, dispatch) => {
    let result = await callApi(Constants.END_POINT_PARAM, Constants.PREFIX_POST, parameter, null);
    if (result !== null) {
        handleResponse(result, Constants.CREATE_PARAM, dispatch);
    }
}

export const getListParamTypes = async (dispatch) => {
    let results = await callApi(Constants.END_POINT_PARAM_TYPE);
    if (results !== null) {
        handleResponse(results, Constants.FETCH_PARAM_TYPE, dispatch);
    }
}

export const getListParamTypesBySubject = async (id, dispatch) => {
    let endPoint = Constants.generateEndPoint(Constants.END_POINT_PARAM_TYPE, id);
    let results = await callApi(endPoint, Constants.PREFIX_GET);
    if (results !== null) {
        handleResponse(results, Constants.FETCH_PARAM_TYPE, dispatch);
    }
}

export const createParamType = async (paramType, dispatch) => {
    let result = await callApi(Constants.END_POINT_PARAM_TYPE, Constants.PREFIX_POST, paramType, null);
    if (result !== null) {
        handleResponse(result, Constants.CREATE_PARAM_TYPE, dispatch);
    }
}

export const deleteParamType = async (id, dispatch) => {
    let endPoint = Constants.generateEndPoint(Constants.END_POINT_PARAM_TYPE, id);
    let result = await callApi(endPoint, Constants.PREFIX_DELETE);
    if (result !== null) {
        handleResponse(result, Constants.DELETE_PARAM_TYPE, dispatch);
    }
}

export const uploadTestScriptTemplate = async (dispatch, formData) => {
    let result = await callApi(Constants.END_POINT_UPLOAD_TESTSCRIPT, Constants.PREFIX_POST, formData,null);
    if (result !== null) {
        handleResponse(result, Constants.UPLOAD_TESTSCRIPT_TEMPLATE, dispatch);
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
        case 409:
            await dispatch(Actions.isNot2xx(409, action + Constants.PREFIX_FAILED, response.data));
            break;
        case 410:
            await dispatch(Actions.isNot2xx(410, action + Constants.PREFIX_FAILED, response.data));
            break;
        default:
            await dispatch(Actions.isNot2xx(500, action + Constants.PREFIX_FAILED, response.data));
            break;
    }
}