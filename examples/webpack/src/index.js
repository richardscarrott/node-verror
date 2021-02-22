// import VError, { MultiError } from 'verror';
// import VError, { MultiError } from '../../../dist/verror.esm';
// import VError, { SError, WError, MultiError } from '../../../dist/verror.esm';
// Have to use cjs as the SError, WError and MultiError aren't module.exports, they're static props on
// the VError constructor.
import VError, { SError, WError, MultiError } from '../../../dist/verror.cjs';

const err1 = new VError({ info: {} }, 'Error 1');
const err2 = new VError({ cause: err1, info: { hello: 'verror' } }, 'Error 2');
const multiError = new MultiError([err1, err2]);

window.VError = VError;

console.log(err1, err2, multiError);
