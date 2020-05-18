import * as Actions from '../constants';
import * as Messages from '../messages';
const initStage = {
    listActions: null,
    listSubjects: null,
    listParams: null,
    listParamTypes: null,
    isLoading: false,
    statusCode: 500,
    message: '',
    error: null,
    action: null,
    updateAction: null,
};

const adminPage = (state = initStage, action) => {
    state.action = action.type;
    switch (action.type) {
        // [NOTE] - Reset global action state after finish call api
        case Actions.RESET_ACTION_STATUS:
            return Object.assign({}, state, {
                action: action.type,
                message: '',
            });

        // Fetch subjects
        case Actions.FETCH_SUBJECT:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case Actions.FETCH_SUBJECT_OK:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: 200,
                action: action.type,
                listSubjects: action.data,
            });
        case Actions.FETCH_SUBJECT_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.error,
                message: Messages.MSG_FAILED,
            });
        case Actions.FETCH_SUBJECT_TIME_OUT:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.error,
                message: Messages.MSG_TIMEOUT,
            });

        // Fetch actions
        case Actions.FETCH_ACTIONS:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case Actions.FETCH_ACTIONS_OK:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: 200,
                action: action.type,
                listActions: action.data,
            });
        case Actions.FETCH_ACTIONS_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.error,
                message: Messages.MSG_FAILED,
            });
        case Actions.FETCH_ACTIONS_TIME_OUT:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.error,
                message: Messages.MSG_TIMEOUT,
            });

        // Create action
        case Actions.CREATE_ACTION:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case Actions.CREATE_ACTION_OK:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: 200,
                action: action.type,
                message: action.data,
            });
        case Actions.CREATE_ACTION_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.error,
                message: Messages.MSG_FAILED,
            });
        case Actions.CREATE_ACTION_TIME_OUT:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.error,
                message: Messages.MSG_TIMEOUT,
            });

        // Update action
        case Actions.UPDATE_ACTION:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case Actions.UPDATE_ACTION_OK:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: 200,
                action: action.type,
                message: action.data,
            });
        case Actions.UPDATE_ACTION_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.error,
                message: Messages.MSG_FAILED,
            });
        case Actions.UPDATE_ACTION_TIME_OUT:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.error,
                message: Messages.MSG_TIMEOUT,
            });

        // DELETE action
        case Actions.DELETE_ACTION:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case Actions.DELETE_ACTION_OK:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: 200,
                message: action.data,
            });
        case Actions.DELETE_ACTION_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.error,
                message: Messages.MSG_FAILED,
            });
        case Actions.DELETE_ACTION_TIME_OUT:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.error,
                message: Messages.MSG_TIMEOUT,
            });

        // Fetch Params
        case Actions.FETCH_PARAM:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case Actions.FETCH_PARAM_OK:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: 200,
                action: action.type,
                listParams: action.data,
            });
        case Actions.FETCH_PARAM_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.error,
                message: Messages.MSG_FAILED,
            });
        case Actions.FETCH_PARAM_TIME_OUT:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.error,
                message: Messages.MSG_TIMEOUT,
            });

        // Delete Param
        case Actions.DELETE_PARAM:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case Actions.DELETE_PARAM_OK:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: 200,
                message: action.data,
            });
        case Actions.DELETE_PARAM_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.error,
                message: Messages.MSG_FAILED,
            });
        case Actions.DELETE_PARAM_TIME_OUT:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.error,
                message: Messages.MSG_TIMEOUT,
            });

        // Create param
        case Actions.CREATE_PARAM:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case Actions.CREATE_PARAM_OK:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: 200,
                message: action.data,
            });
        case Actions.CREATE_PARAM_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                message: action.error.message,
                error: action.error,
            });
        case Actions.CREATE_PARAM_TIME_OUT:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                message: action.error.message,
                error: action.error,
            });

            // Fetch Param types
        case Actions.FETCH_PARAM_TYPE:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case Actions.FETCH_PARAM_TYPE_OK:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: 200,
                action: action.type,
                listParamTypes: action.data,
            });
        case Actions.FETCH_PARAM_TYPE_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.error,
                message: Messages.MSG_FAILED,
            });
        case Actions.FETCH_PARAM_TYPE_TIME_OUT:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.error,
                message: Messages.MSG_TIMEOUT,
            });

        // Delete Param
        case Actions.DELETE_PARAM_TYPE:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case Actions.DELETE_PARAM_TYPE_OK:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: 200,
                message: action.data,
            });
        case Actions.DELETE_PARAM_TYPE_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.error,
                message: Messages.MSG_FAILED,
            });
        case Actions.DELETE_PARAM_TYPE_TIME_OUT:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.error,
                message: Messages.MSG_TIMEOUT,
            });

        // Create param
        case Actions.CREATE_PARAM_TYPE:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case Actions.CREATE_PARAM_TYPE_OK:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: 200,
                message: action.data,
            });
        case Actions.CREATE_PARAM_TYPE_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                message: action.error.message,
                error: action.error,
            });
        case Actions.CREATE_PARAM_TYPE_TIME_OUT:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                message: action.error.message,
                error: action.error,
            });

               // Upload test script template
        case Actions.UPLOAD_TESTSCRIPT_TEMPLATE:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case Actions.UPLOAD_TESTSCRIPT_TEMPLATE_OK:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: 200,
                uploadMessage: action.data,
            });
        case Actions.UPLOAD_TESTSCRIPT_TEMPLATE_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.error,
                uploadMessage: Messages.MSG_FAILED,
            });
        case Actions.UPLOAD_TESTSCRIPT_TEMPLATE_TIME_OUT:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.error,
                message: Messages.MSG_TIMEOUT,
            });


        // Answer ACTIONS
        default:
            return state;
    }
};

export default adminPage;