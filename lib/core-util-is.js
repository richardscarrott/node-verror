function objectToString(o) {
    return Object.prototype.toString.call(o);
}

function isError(e) {
    return (objectToString(e) === '[object Error]' || e instanceof Error);
}

// https://github.com/isaacs/core-util-is/blob/v1.0.2/lib/util.js#L86
exports.isError = isError;
