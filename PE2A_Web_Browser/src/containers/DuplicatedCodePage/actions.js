

// Loading
export const onLoading = (action) => {
    return {
        type: action,
    }
}

export const onFinishing = (action) => {
    return {
        type: action,
    }
}

export const is2xx = (statusCode, action, listActions) => {
    return {
        statusCode: statusCode,
        type: action,
        data: listActions,
    }
}

export const isNot2xx = (statusCode, action, error) => {
    return {
        statusCode: statusCode,
        type: action,
        error: error,
    }
}