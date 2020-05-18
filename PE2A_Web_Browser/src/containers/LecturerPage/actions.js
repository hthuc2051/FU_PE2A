export const onLoading = (action) => {
    return {
        type: action,
    }
}

export const is2xx = (statusCode, action, data) => {
    return {
        statusCode: statusCode,
        type: action,
        data: data,
    }
}
export const isNot2xx = (statusCode, action, error) => {
    return {
        statusCode: statusCode,
        type: action,
        error: error,
    }
}