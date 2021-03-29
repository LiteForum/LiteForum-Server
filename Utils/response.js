let res_state = (success, msg, data) => {
    let result;
    if(success) {
        result = {
            success: success,
            msg: msg ? msg : "Request successful.",
            data: data
        }
    } else {
        result = {
            success: success,
            msg: msg ? msg : "Request error.",
            data: data
        }
    }

    return result;
}

module.exports = res_state