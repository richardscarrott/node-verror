const util = require('util');

// https://github.com/browserify/commonjs-assert/blob/v2.0.0/assert.js

const assert = module.exports = ok;

function AssertionError(obj) {
    Error.apply(this, arguments);
    this.name = 'AssertionError';
    this.code = 'ERR_ASSERTION';
    this.actual = obj.actual;
    this.expected = obj.expected;
    this.message = obj.message;
    this.operator = obj.operator;
    if (Error.captureStackTrace) {
        // eslint-disable-next-line no-restricted-syntax
        Error.captureStackTrace(this, obj.stackStartFn);
    }
}

AssertionError.prototype.toString = function () {
    return this.name + ' [' + this.code + '] ' + this.message;
}

util.inherits(AssertionError, Error);

assert.AssertionError = AssertionError;

function innerOk(fn, argLen, value, message) {
    if (!value) {
        let generatedMessage = false;

        if (argLen === 0) {
            generatedMessage = true;
            message = 'No value argument passed to `assert.ok()`';
        } else if (message instanceof Error) {
            throw message;
        }

        const err = new AssertionError({
            actual: value,
            expected: true,
            message,
            operator: '==',
            stackStartFn: fn
        });
        err.generatedMessage = generatedMessage;
        throw err;
    }
}

// Pure assertion tests whether a value is truthy, as determined
// by !!value.
function ok(...args) {
    innerOk(ok, args.length, ...args);
}
assert.ok = ok;

function innerFail(obj) {
    if (obj.message instanceof Error) throw obj.message;

    throw new AssertionError(obj);
}

// The equality assertion tests shallow, coercive equality with ==.
assert.equal = function equal(actual, expected, message) {
    if (arguments.length < 2) {
        throw new Error('Missing args `actual` and `message`');
    }
    if (actual != expected) {
        innerFail({
            actual,
            expected,
            message,
            operator: '==',
            stackStartFn: equal
        });
    }
};
