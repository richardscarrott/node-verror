(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.VError = factory());
}(this, (function () {
	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var inherits_browser = createCommonjsModule(function (module) {
	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    if (superCtor) {
	      ctor.super_ = superCtor;
	      ctor.prototype = Object.create(superCtor.prototype, {
	        constructor: {
	          value: ctor,
	          enumerable: false,
	          writable: true,
	          configurable: true
	        }
	      });
	    }
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    if (superCtor) {
	      ctor.super_ = superCtor;
	      var TempCtor = function () {};
	      TempCtor.prototype = superCtor.prototype;
	      ctor.prototype = new TempCtor();
	      ctor.prototype.constructor = ctor;
	    }
	  };
	}
	});

	var inherits = createCommonjsModule(function (module) {
	try {
	  var util$1 = util;
	  /* istanbul ignore next */
	  if (typeof util$1.inherits !== 'function') throw '';
	  module.exports = util$1.inherits;
	} catch (e) {
	  /* istanbul ignore next */
	  module.exports = inherits_browser;
	}
	});

	var util = createCommonjsModule(function (module, exports) {
	// https://github.com/browserify/node-util/blob/v0.12.1/util.js#L592
	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = inherits;

	// https://github.com/browserify/node-util/blob/v0.12.1/util.js#L166
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	    // default options
	    var ctx = {
	        seen: [],
	        stylize: stylizeNoColor
	    };
	    // legacy...
	    if (arguments.length >= 3) ctx.depth = arguments[2];
	    if (arguments.length >= 4) ctx.colors = arguments[3];
	    if (isBoolean(opts)) {
	        // legacy...
	        ctx.showHidden = opts;
	    } else if (opts) {
	        // got an "options" object
	        exports._extend(ctx, opts);
	    }
	    // set default options
	    if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	    if (isUndefined(ctx.depth)) ctx.depth = 2;
	    if (isUndefined(ctx.colors)) ctx.colors = false;
	    if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	    if (ctx.colors) ctx.stylize = stylizeWithColor;
	    return formatValue(ctx, obj, ctx.depth);
	}

	exports.inspect = inspect;

	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	    'bold': [1, 22],
	    'italic': [3, 23],
	    'underline': [4, 24],
	    'inverse': [7, 27],
	    'white': [37, 39],
	    'grey': [90, 39],
	    'black': [30, 39],
	    'blue': [34, 39],
	    'cyan': [36, 39],
	    'green': [32, 39],
	    'magenta': [35, 39],
	    'red': [31, 39],
	    'yellow': [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	    'special': 'cyan',
	    'number': 'yellow',
	    'boolean': 'yellow',
	    'undefined': 'grey',
	    'null': 'bold',
	    'string': 'green',
	    'date': 'magenta',
	    // "name": intentionally not styling
	    'regexp': 'red'
	};
	});
	var util_1 = util.inherits;
	var util_2 = util.inspect;

	var assert_1 = createCommonjsModule(function (module) {
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
	};

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
	});

	/*
	 * extsprintf.js: extended POSIX-style sprintf
	 */




	/*
	 * Public interface
	 */
	var sprintf = jsSprintf;
	var printf = jsPrintf;
	var fprintf = jsFprintf;

	/*
	 * Stripped down version of s[n]printf(3c).  We make a best effort to throw an
	 * exception when given a format string we don't understand, rather than
	 * ignoring it, so that we won't break existing programs if/when we go implement
	 * the rest of this.
	 *
	 * This implementation currently supports specifying
	 *	- field alignment ('-' flag),
	 * 	- zero-pad ('0' flag)
	 *	- always show numeric sign ('+' flag),
	 *	- field width
	 *	- conversions for strings, decimal integers, and floats (numbers).
	 *	- argument size specifiers.  These are all accepted but ignored, since
	 *	  Javascript has no notion of the physical size of an argument.
	 *
	 * Everything else is currently unsupported, most notably precision, unsigned
	 * numbers, non-decimal numbers, and characters.
	 */
	function jsSprintf(ofmt)
	{
		var regex = [
		    '([^%]*)',				/* normal text */
		    '%',				/* start of format */
		    '([\'\\-+ #0]*?)',			/* flags (optional) */
		    '([1-9]\\d*)?',			/* width (optional) */
		    '(\\.([1-9]\\d*))?',		/* precision (optional) */
		    '[lhjztL]*?',			/* length mods (ignored) */
		    '([diouxXfFeEgGaAcCsSp%jr])'	/* conversion */
		].join('');

		var re = new RegExp(regex);

		/* variadic arguments used to fill in conversion specifiers */
		var args = Array.prototype.slice.call(arguments, 1);
		/* remaining format string */
		var fmt = ofmt;

		/* components of the current conversion specifier */
		var flags, width, precision, conversion;
		var left, pad, sign, arg, match;

		/* return value */
		var ret = '';

		/* current variadic argument (1-based) */
		var argn = 1;
		/* 0-based position in the format string that we've read */
		var posn = 0;
		/* 1-based position in the format string of the current conversion */
		var convposn;
		/* current conversion specifier */
		var curconv;

		assert_1.equal('string', typeof (fmt),
		    'first argument must be a format string');

		while ((match = re.exec(fmt)) !== null) {
			ret += match[1];
			fmt = fmt.substring(match[0].length);

			/*
			 * Update flags related to the current conversion specifier's
			 * position so that we can report clear error messages.
			 */
			curconv = match[0].substring(match[1].length);
			convposn = posn + match[1].length + 1;
			posn += match[0].length;

			flags = match[2] || '';
			width = match[3] || 0;
			precision = match[4] || '';
			conversion = match[6];
			left = false;
			sign = false;
			pad = ' ';

			if (conversion == '%') {
				ret += '%';
				continue;
			}

			if (args.length === 0) {
				throw (jsError(ofmt, convposn, curconv,
				    'has no matching argument ' +
				    '(too few arguments passed)'));
			}

			arg = args.shift();
			argn++;

			if (flags.match(/[\' #]/)) {
				throw (jsError(ofmt, convposn, curconv,
				    'uses unsupported flags'));
			}

			if (precision.length > 0) {
				throw (jsError(ofmt, convposn, curconv,
				    'uses non-zero precision (not supported)'));
			}

			if (flags.match(/-/))
				left = true;

			if (flags.match(/0/))
				pad = '0';

			if (flags.match(/\+/))
				sign = true;

			switch (conversion) {
			case 's':
				if (arg === undefined || arg === null) {
					throw (jsError(ofmt, convposn, curconv,
					    'attempted to print undefined or null ' +
					    'as a string (argument ' + argn + ' to ' +
					    'sprintf)'));
				}
				ret += doPad(pad, width, left, arg.toString());
				break;

			case 'd':
				arg = Math.floor(arg);
				/*jsl:fallthru*/
			case 'f':
				sign = sign && arg > 0 ? '+' : '';
				ret += sign + doPad(pad, width, left,
				    arg.toString());
				break;

			case 'x':
				ret += doPad(pad, width, left, arg.toString(16));
				break;

			case 'j': /* non-standard */
				if (width === 0)
					width = 10;
				ret += util.inspect(arg, false, width);
				break;

			case 'r': /* non-standard */
				ret += dumpException(arg);
				break;

			default:
				throw (jsError(ofmt, convposn, curconv,
				    'is not supported'));
			}
		}

		ret += fmt;
		return (ret);
	}

	function jsError(fmtstr, convposn, curconv, reason) {
		assert_1.equal(typeof (fmtstr), 'string');
		assert_1.equal(typeof (curconv), 'string');
		assert_1.equal(typeof (convposn), 'number');
		assert_1.equal(typeof (reason), 'string');
		return (new Error('format string "' + fmtstr +
		    '": conversion specifier "' + curconv + '" at character ' +
		    convposn + ' ' + reason));
	}

	function jsPrintf() {
		var args = Array.prototype.slice.call(arguments);
		args.unshift(process.stdout);
		jsFprintf.apply(null, args);
	}

	function jsFprintf(stream) {
		var args = Array.prototype.slice.call(arguments, 1);
		return (stream.write(jsSprintf.apply(this, args)));
	}

	function doPad(chr, width, left, str)
	{
		var ret = str;

		while (ret.length < width) {
			if (left)
				ret += chr;
			else
				ret = chr + ret;
		}

		return (ret);
	}

	/*
	 * This function dumps long stack traces for exceptions having a cause() method.
	 * See node-verror for an example.
	 */
	function dumpException(ex)
	{
		var ret;

		if (!(ex instanceof Error))
			throw (new Error(jsSprintf('invalid type for %%r: %j', ex)));

		/* Note that V8 prepends "ex.stack" with ex.toString(). */
		ret = 'EXCEPTION: ' + ex.constructor.name + ': ' + ex.stack;

		if (ex.cause && typeof (ex.cause) === 'function') {
			var cex = ex.cause();
			if (cex) {
				ret += '\nCaused by: ' + dumpException(cex);
			}
		}

		return (ret);
	}

	var extsprintf = {
		sprintf: sprintf,
		printf: printf,
		fprintf: fprintf
	};

	var sprintf$1 = extsprintf.sprintf;

	function _capitalize(str) {
	    return (str.charAt(0).toUpperCase() + str.slice(1));
	}

	function _toss(name, expected, oper, arg, actual) {
	    throw new assert_1.AssertionError({
	        message: sprintf$1('%s (%s) is required', name, expected),
	        actual: (actual === undefined) ? typeof (arg) : actual(arg),
	        expected: expected,
	        operator: oper || '===',
	        stackStartFunction: _toss.caller
	    });
	}

	// function _getClass(arg) {
	//     return (Object.prototype.toString.call(arg).slice(8, -1));
	// }

	var types = {
	    bool: {
	        check: function (arg) { return typeof (arg) === 'boolean'; }
	    },
	    func: {
	        check: function (arg) { return typeof (arg) === 'function'; }
	    },
	    string: {
	        check: function (arg) { return typeof (arg) === 'string'; }
	    },
	    object: {
	        check: function (arg) {
	            return typeof (arg) === 'object' && arg !== null;
	        }
	    },
	    // number: {
	    //     check: function (arg) {
	    //         return typeof (arg) === 'number' && !isNaN(arg);
	    //     }
	    // },
	    // finite: {
	    //     check: function (arg) {
	    //         return typeof (arg) === 'number' && !isNaN(arg) && isFinite(arg);
	    //     }
	    // },
	    // buffer: {
	    //     check: function (arg) { return Buffer.isBuffer(arg); },
	    //     operator: 'Buffer.isBuffer'
	    // },
	    array: {
	        check: function (arg) { return Array.isArray(arg); },
	        operator: 'Array.isArray'
	    },
	    // stream: {
	    //     check: function (arg) { return arg instanceof Stream; },
	    //     operator: 'instanceof',
	    //     actual: _getClass
	    // },
	    // date: {
	    //     check: function (arg) { return arg instanceof Date; },
	    //     operator: 'instanceof',
	    //     actual: _getClass
	    // },
	    // regexp: {
	    //     check: function (arg) { return arg instanceof RegExp; },
	    //     operator: 'instanceof',
	    //     actual: _getClass
	    // },
	    // uuid: {
	    //     check: function (arg) {
	    //         return typeof (arg) === 'string' && UUID_REGEXP.test(arg);
	    //     },
	    //     operator: 'isUUID'
	    // }
	};

	function _setExports() {
	    var keys = Object.keys(types);
	    var out = function (arg, msg) {
	        if (!arg) {
	            _toss(msg, 'true', arg);
	        }
	    };

	    /* standard checks */
	    keys.forEach(function (k) {
	        var type = types[k];
	        out[k] = function (arg, msg) {
	            if (!type.check(arg)) {
	                _toss(msg, k, type.operator, arg, type.actual);
	            }
	        };
	    });

	    /* optional checks */
	    keys.forEach(function (k) {
	        var name = 'optional' + _capitalize(k);
	        var type = types[k];
	        out[name] = function (arg, msg) {
	            if (arg === undefined || arg === null) {
	                return;
	            }
	            if (!type.check(arg)) {
	                _toss(msg, k, type.operator, arg, type.actual);
	            }
	        };
	    });

	    /* arrayOf checks */
	    keys.forEach(function (k) {
	        var name = 'arrayOf' + _capitalize(k);
	        var type = types[k];
	        var expected = '[' + k + ']';
	        out[name] = function (arg, msg) {
	            if (!Array.isArray(arg)) {
	                _toss(msg, expected, type.operator, arg, type.actual);
	            }
	            var i;
	            for (i = 0; i < arg.length; i++) {
	                if (!type.check(arg[i])) {
	                    _toss(msg, expected, type.operator, arg, type.actual);
	                }
	            }
	        };
	    });

	    /* optionalArrayOf checks */
	    keys.forEach(function (k) {
	        var name = 'optionalArrayOf' + _capitalize(k);
	        var type = types[k];
	        var expected = '[' + k + ']';
	        out[name] = function (arg, msg) {
	            if (arg === undefined || arg === null) {
	                return;
	            }
	            if (!Array.isArray(arg)) {
	                _toss(msg, expected, type.operator, arg, type.actual);
	            }
	            var i;
	            for (i = 0; i < arg.length; i++) {
	                if (!type.check(arg[i])) {
	                    _toss(msg, expected, type.operator, arg, type.actual);
	                }
	            }
	        };
	    });

	    /* re-export built-in assertions */
	    Object.keys(assert_1).forEach(function (k) {
	        if (k === 'AssertionError') {
	            out[k] = assert_1[k];
	            return;
	        }
	        out[k] = assert_1[k];
	    });

	    /* export ourselves (for unit tests _only_) */
	    out._setExports = _setExports;

	    return out;
	}

	var assertPlus = _setExports();

	function objectToString(o) {
	    return Object.prototype.toString.call(o);
	}

	function isError(e) {
	    return (objectToString(e) === '[object Error]' || e instanceof Error);
	}

	// https://github.com/isaacs/core-util-is/blob/v1.0.2/lib/util.js#L86
	var isError_1 = isError;

	var coreUtilIs = {
		isError: isError_1
	};

	/*
	 * verror.js: richer JavaScript errors
	 */





	var mod_isError = coreUtilIs.isError;
	var sprintf$2 = extsprintf.sprintf;

	/*
	 * Public interface
	 */

	/* So you can 'var VError = require('verror')' */
	var verror = VError;
	/* For compatibility */
	VError.VError = VError;
	/* Other exported classes */
	VError.SError = SError;
	VError.WError = WError;
	VError.MultiError = MultiError;

	/*
	 * Common function used to parse constructor arguments for VError, WError, and
	 * SError.  Named arguments to this function:
	 *
	 *     strict		force strict interpretation of sprintf arguments, even
	 *     			if the options in "argv" don't say so
	 *
	 *     argv		error's constructor arguments, which are to be
	 *     			interpreted as described in README.md.  For quick
	 *     			reference, "argv" has one of the following forms:
	 *
	 *          [ sprintf_args... ]           (argv[0] is a string)
	 *          [ cause, sprintf_args... ]    (argv[0] is an Error)
	 *          [ options, sprintf_args... ]  (argv[0] is an object)
	 *
	 * This function normalizes these forms, producing an object with the following
	 * properties:
	 *
	 *    options           equivalent to "options" in third form.  This will never
	 *    			be a direct reference to what the caller passed in
	 *    			(i.e., it may be a shallow copy), so it can be freely
	 *    			modified.
	 *
	 *    shortmessage      result of sprintf(sprintf_args), taking options.strict
	 *    			into account as described in README.md.
	 */
	function parseConstructorArguments(args)
	{
		var argv, options, sprintf_args, shortmessage, k;

		assertPlus.object(args, 'args');
		assertPlus.bool(args.strict, 'args.strict');
		assertPlus.array(args.argv, 'args.argv');
		argv = args.argv;

		/*
		 * First, figure out which form of invocation we've been given.
		 */
		if (argv.length === 0) {
			options = {};
			sprintf_args = [];
		} else if (mod_isError(argv[0])) {
			options = { 'cause': argv[0] };
			sprintf_args = argv.slice(1);
		} else if (typeof (argv[0]) === 'object') {
			options = {};
			for (k in argv[0]) {
				options[k] = argv[0][k];
			}
			sprintf_args = argv.slice(1);
		} else {
			assertPlus.string(argv[0],
			    'first argument to VError, SError, or WError ' +
			    'constructor must be a string, object, or Error');
			options = {};
			sprintf_args = argv;
		}

		/*
		 * Now construct the error's message.
		 *
		 * extsprintf (which we invoke here with our caller's arguments in order
		 * to construct this Error's message) is strict in its interpretation of
		 * values to be processed by the "%s" specifier.  The value passed to
		 * extsprintf must actually be a string or something convertible to a
		 * String using .toString().  Passing other values (notably "null" and
		 * "undefined") is considered a programmer error.  The assumption is
		 * that if you actually want to print the string "null" or "undefined",
		 * then that's easy to do that when you're calling extsprintf; on the
		 * other hand, if you did NOT want that (i.e., there's actually a bug
		 * where the program assumes some variable is non-null and tries to
		 * print it, which might happen when constructing a packet or file in
		 * some specific format), then it's better to stop immediately than
		 * produce bogus output.
		 *
		 * However, sometimes the bug is only in the code calling VError, and a
		 * programmer might prefer to have the error message contain "null" or
		 * "undefined" rather than have the bug in the error path crash the
		 * program (making the first bug harder to identify).  For that reason,
		 * by default VError converts "null" or "undefined" arguments to their
		 * string representations and passes those to extsprintf.  Programmers
		 * desiring the strict behavior can use the SError class or pass the
		 * "strict" option to the VError constructor.
		 */
		assertPlus.object(options);
		if (!options.strict && !args.strict) {
			sprintf_args = sprintf_args.map(function (a) {
				return (a === null ? 'null' :
				    a === undefined ? 'undefined' : a);
			});
		}

		if (sprintf_args.length === 0) {
			shortmessage = '';
		} else {
			shortmessage = sprintf$2.apply(null, sprintf_args);
		}

		return ({
		    'options': options,
		    'shortmessage': shortmessage
		});
	}

	/*
	 * See README.md for reference documentation.
	 */
	function VError()
	{
		var args, obj, parsed, cause, ctor, message, k;

		args = Array.prototype.slice.call(arguments, 0);

		/*
		 * This is a regrettable pattern, but JavaScript's built-in Error class
		 * is defined to work this way, so we allow the constructor to be called
		 * without "new".
		 */
		if (!(this instanceof VError)) {
			obj = Object.create(VError.prototype);
			VError.apply(obj, arguments);
			return (obj);
		}

		/*
		 * For convenience and backwards compatibility, we support several
		 * different calling forms.  Normalize them here.
		 */
		parsed = parseConstructorArguments({
		    'argv': args,
		    'strict': false
		});

		/*
		 * If we've been given a name, apply it now.
		 */
		if (parsed.options.name) {
			assertPlus.string(parsed.options.name,
			    'error\'s "name" must be a string');
			this.name = parsed.options.name;
		}

		/*
		 * For debugging, we keep track of the original short message (attached
		 * this Error particularly) separately from the complete message (which
		 * includes the messages of our cause chain).
		 */
		this.jse_shortmsg = parsed.shortmessage;
		message = parsed.shortmessage;

		/*
		 * If we've been given a cause, record a reference to it and update our
		 * message appropriately.
		 */
		cause = parsed.options.cause;
		if (cause) {
			assertPlus.ok(mod_isError(cause), 'cause is not an Error');
			this.jse_cause = cause;

			if (!parsed.options.skipCauseMessage) {
				message += ': ' + cause.message;
			}
		}

		/*
		 * If we've been given an object with properties, shallow-copy that
		 * here.  We don't want to use a deep copy in case there are non-plain
		 * objects here, but we don't want to use the original object in case
		 * the caller modifies it later.
		 */
		this.jse_info = {};
		if (parsed.options.info) {
			for (k in parsed.options.info) {
				this.jse_info[k] = parsed.options.info[k];
			}
		}

		this.message = message;
		Error.call(this, message);

		if (Error.captureStackTrace) {
			ctor = parsed.options.constructorOpt || this.constructor;
			Error.captureStackTrace(this, ctor);
		}

		return (this);
	}

	util.inherits(VError, Error);
	VError.prototype.name = 'VError';

	VError.prototype.toString = function ve_toString()
	{
		var str = (this.hasOwnProperty('name') && this.name ||
			this.constructor.name || this.constructor.prototype.name);
		if (this.message)
			str += ': ' + this.message;

		return (str);
	};

	/*
	 * This method is provided for compatibility.  New callers should use
	 * VError.cause() instead.  That method also uses the saner `null` return value
	 * when there is no cause.
	 */
	VError.prototype.cause = function ve_cause()
	{
		var cause = VError.cause(this);
		return (cause === null ? undefined : cause);
	};

	/*
	 * Static methods
	 *
	 * These class-level methods are provided so that callers can use them on
	 * instances of Errors that are not VErrors.  New interfaces should be provided
	 * only using static methods to eliminate the class of programming mistake where
	 * people fail to check whether the Error object has the corresponding methods.
	 */

	VError.cause = function (err)
	{
		assertPlus.ok(mod_isError(err), 'err must be an Error');
		return (mod_isError(err.jse_cause) ? err.jse_cause : null);
	};

	VError.info = function (err)
	{
		var rv, cause, k;

		assertPlus.ok(mod_isError(err), 'err must be an Error');
		cause = VError.cause(err);
		if (cause !== null) {
			rv = VError.info(cause);
		} else {
			rv = {};
		}

		if (typeof (err.jse_info) == 'object' && err.jse_info !== null) {
			for (k in err.jse_info) {
				rv[k] = err.jse_info[k];
			}
		}

		return (rv);
	};

	VError.findCauseByName = function (err, name)
	{
		var cause;

		assertPlus.ok(mod_isError(err), 'err must be an Error');
		assertPlus.string(name, 'name');
		assertPlus.ok(name.length > 0, 'name cannot be empty');

		for (cause = err; cause !== null; cause = VError.cause(cause)) {
			assertPlus.ok(mod_isError(cause));
			if (cause.name == name) {
				return (cause);
			}
		}

		return (null);
	};

	VError.hasCauseWithName = function (err, name)
	{
		return (VError.findCauseByName(err, name) !== null);
	};

	VError.fullStack = function (err)
	{
		assertPlus.ok(mod_isError(err), 'err must be an Error');

		var cause = VError.cause(err);

		if (cause) {
			return (err.stack + '\ncaused by: ' + VError.fullStack(cause));
		}

		return (err.stack);
	};

	VError.errorFromList = function (errors)
	{
		assertPlus.arrayOfObject(errors, 'errors');

		if (errors.length === 0) {
			return (null);
		}

		errors.forEach(function (e) {
			assertPlus.ok(mod_isError(e));
		});

		if (errors.length == 1) {
			return (errors[0]);
		}

		return (new MultiError(errors));
	};

	VError.errorForEach = function (err, func)
	{
		assertPlus.ok(mod_isError(err), 'err must be an Error');
		assertPlus.func(func, 'func');

		if (err instanceof MultiError) {
			err.errors().forEach(function iterError(e) { func(e); });
		} else {
			func(err);
		}
	};


	/*
	 * SError is like VError, but stricter about types.  You cannot pass "null" or
	 * "undefined" as string arguments to the formatter.
	 */
	function SError()
	{
		var args, obj, parsed, options;

		args = Array.prototype.slice.call(arguments, 0);
		if (!(this instanceof SError)) {
			obj = Object.create(SError.prototype);
			SError.apply(obj, arguments);
			return (obj);
		}

		parsed = parseConstructorArguments({
		    'argv': args,
		    'strict': true
		});

		options = parsed.options;
		VError.call(this, options, '%s', parsed.shortmessage);

		return (this);
	}

	/*
	 * We don't bother setting SError.prototype.name because once constructed,
	 * SErrors are just like VErrors.
	 */
	util.inherits(SError, VError);


	/*
	 * Represents a collection of errors for the purpose of consumers that generally
	 * only deal with one error.  Callers can extract the individual errors
	 * contained in this object, but may also just treat it as a normal single
	 * error, in which case a summary message will be printed.
	 */
	function MultiError(errors)
	{
		assertPlus.array(errors, 'list of errors');
		assertPlus.ok(errors.length > 0, 'must be at least one error');
		this.ase_errors = errors;

		VError.call(this, {
		    'cause': errors[0]
		}, 'first of %d error%s', errors.length, errors.length == 1 ? '' : 's');
	}

	util.inherits(MultiError, VError);
	MultiError.prototype.name = 'MultiError';

	MultiError.prototype.errors = function me_errors()
	{
		return (this.ase_errors.slice(0));
	};


	/*
	 * See README.md for reference details.
	 */
	function WError()
	{
		var args, obj, parsed, options;

		args = Array.prototype.slice.call(arguments, 0);
		if (!(this instanceof WError)) {
			obj = Object.create(WError.prototype);
			WError.apply(obj, args);
			return (obj);
		}

		parsed = parseConstructorArguments({
		    'argv': args,
		    'strict': false
		});

		options = parsed.options;
		options['skipCauseMessage'] = true;
		VError.call(this, options, '%s', parsed.shortmessage);

		return (this);
	}

	util.inherits(WError, VError);
	WError.prototype.name = 'WError';

	WError.prototype.toString = function we_toString()
	{
		var str = (this.hasOwnProperty('name') && this.name ||
			this.constructor.name || this.constructor.prototype.name);
		if (this.message)
			str += ': ' + this.message;
		if (this.jse_cause && this.jse_cause.message)
			str += '; caused by ' + this.jse_cause.toString();

		return (str);
	};

	/*
	 * For purely historical reasons, WError's cause() function allows you to set
	 * the cause.
	 */
	WError.prototype.cause = function we_cause(c)
	{
		if (mod_isError(c))
			this.jse_cause = c;

		return (this.jse_cause);
	};

	return verror;

})));
