import * as Actions from '../constants';
import * as Messages from '../messages';
const initStage = {
    userDetails: null,
    isLoading: false,
    statusCode: null,
    message: '',
    error: null,
};

const loginPage = (state = initStage, action) => {
    switch (action.type) {
        // Fetch practical exam
        case Actions.LOGIN:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case Actions.LOGIN_OK:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: 200,
                userDetails: action.data,
            });
        case Actions.LOGIN_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.action,
                message: action.message,
            });
        case Actions.LOGIN_TIME_OUT:
            return Object.assign({}, state, {
                isLoading: false,
                statusCode: action.statusCode,
                error: action.action,
                message: action.message,
            });

        
        // Answer EVENTS
        default:
            return state;
    }
};

export default loginPage;