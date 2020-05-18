import * as Actions from '../constants';
import * as Messages from '../messages';
const initStage = {
    listActions: null,
    isLoading: false,
    filesResult:[],
    statusCode: 500,
    message: '',
    error: null,
    action: null,
};

const githubResultPage = (state = initStage, action) => {
    console.log(action);
    state.action = action.type;
    switch (action.type) {
        // [NOTE] - Reset global action state after finish call api
        case Actions.RESET_ACTION_STATUS:
            return Object.assign({}, state, {
                action: action.type,
            });

        // Fetch Result
        case Actions.GET_GITHUB_RESULT:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case Actions.GET_GITHUB_RESULT_OK:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: 200,
                filesResult: action.data,
            });
        case Actions.GET_GITHUB_RESULT_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.action,
                message: Messages.MSG_FAILED,
            });
        case Actions.GET_GITHUB_RESULT_TIME_OUT:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.action,
                message: Messages.MSG_TIMEOUT,
            });
        default:
            return state;
    }
};

export default githubResultPage;