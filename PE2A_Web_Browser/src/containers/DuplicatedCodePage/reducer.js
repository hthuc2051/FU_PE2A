import * as Actions from '../constants';
import * as Messages from '../messages';
const initStage = {
    listActions: null,
    isLoading: false,
    filesData:[],
    statusCode: 500,
    message: '',
    error: null,
    action: null,
};

const duplicatedCodePage = (state = initStage, action) => {
    console.log(action);
    state.action = action.type;
    switch (action.type) {
        // [NOTE] - Reset global action state after finish call api
        case Actions.RESET_ACTION_STATUS:
            return Object.assign({}, state, {
                action: action.type,
            });

        // Fetch actions
        case Actions.GET_DUPLICATED_STUDENT_LIST:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case Actions.GET_DUPLICATED_STUDENT_LIST_OK:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: 200,
                duplicatedCodeList: action.data,
            });
        case Actions.GET_DUPLICATED_STUDENT_LIST_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.action,
                message: Messages.MSG_FAILED,
            });
        case Actions.GET_DUPLICATED_STUDENT_LIST_TIME_OUT:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.action,
                message: Messages.MSG_TIMEOUT,
            });

            // View code
        
        case Actions.VIEW_CODE_FILES:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case Actions.VIEW_CODE_FILES_OK:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: 200,
                filesData: action.data,
            });
        case Actions.VIEW_CODE_FILES_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.action,
                message: action.message,
            });
        case Actions.VIEW_CODE_FILES_TIME_OUT:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.action,
                message: action.message,
            });


        // Answer ACTIONS
        default:
            return state;
    }
};

export default duplicatedCodePage;