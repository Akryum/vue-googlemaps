(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var loader = {
	loaded: false,
	readyPromises: [],

	/**
  * @param apiKey    API Key, or object with the URL parameters. For example
  *                  to use Google Maps Premium API, pass
  *                    `{ client: <YOUR-CLIENT-ID> }`.
  *                  You may pass the libraries and/or version (as `v`) parameter into
  *                  this parameter and skip the next two parameters
  * @param version   Google for Maps version
  * @param libraries Libraries to load (@see
  *                  https://developers.google.com/maps/documentation/javascript/libraries)
  * @param loadCn    Boolean. If set to true, the map will be loaded form goole maps China
  *                  (@see https://developers.google.com/maps/documentation/javascript/basics#GoogleMapsChina)
  */
	load: function load(_ref) {
		var apiKey = _ref.apiKey,
		    version = _ref.version,
		    libraries = _ref.libraries,
		    loadCn = _ref.loadCn;

		if (typeof window === 'undefined') {
			// Do nothing if run from server-side
			return Promise.resolve();
		}
		if (!this.loaded && (!window.google || !window.google.maps)) {
			var googleMapScript = document.createElement('SCRIPT');

			// Allow apiKey to be an object.
			// This is to support more esoteric means of loading Google Maps,
			// such as Google for business
			// https://developers.google.com/maps/documentation/javascript/get-api-key#premium-auth
			var options = {};
			if (typeof apiKey === 'string') {
				options.key = apiKey;
			} else if ((typeof apiKey === 'undefined' ? 'undefined' : _typeof(apiKey)) === 'object') {
				for (var k in apiKey) {
					// transfer values in apiKey to options
					options[k] = apiKey[k];
				}
			} else {
				throw new Error('`apiKey` should either be a string or an object');
			}

			// libraries
			var librariesPath = '';
			if (libraries && libraries.length > 0) {
				librariesPath = libraries.join(',');
				options['libraries'] = librariesPath;
			} else if (Array.prototype.isPrototypeOf(options.libraries)) {
				options.libraries = options.libraries.join(',');
			}
			options['callback'] = 'VueGoogleMapsLoaded';

			var baseUrl = 'https://maps.googleapis.com/';

			if (typeof loadCn === 'boolean' && loadCn === true) {
				baseUrl = 'http://maps.google.cn/';
			}

			var url = baseUrl + 'maps/api/js?' + Object.keys(options).map(function (key) {
				return encodeURIComponent(key) + '=' + encodeURIComponent(options[key]);
			}).join('&');

			if (version) {
				url = url + '&v=' + version;
			}

			googleMapScript.setAttribute('src', url);
			googleMapScript.setAttribute('async', '');
			googleMapScript.setAttribute('defer', '');
			document.body.appendChild(googleMapScript);

			window.VueGoogleMapsLoaded = this._setLoaded.bind(this);
		} else {
			console.warn('The Google Maps library is already loaded');
			this._setLoaded();
		}
	},
	ensureReady: function ensureReady() {
		var _this = this;

		if (this.loaded) {
			return Promise.resolve();
		} else {
			var promise = new Promise(function (resolve) {
				_this.readyPromises.push(resolve);
			});
			return promise;
		}
	},
	_setLoaded: function _setLoaded() {
		this.loaded = true;
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = this.readyPromises[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var resolve = _step.value;

				resolve();
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		this.readyPromises = [];
	}
};

/* harmony default export */ __webpack_exports__["a"] = (loader);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

!function(root,factory){ true?module.exports=factory():"function"==typeof define&&define.amd?define([],factory):"object"==typeof exports?exports.VueResize=factory():root.VueResize=factory()}(this,function(){return function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={i:moduleId,l:!1,exports:{}};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.l=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.d=function(exports,name,getter){__webpack_require__.o(exports,name)||Object.defineProperty(exports,name,{configurable:!1,enumerable:!0,get:getter})},__webpack_require__.n=function(module){var getter=module&&module.__esModule?function(){return module.default}:function(){return module};return __webpack_require__.d(getter,"a",getter),getter},__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=0)}([function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0}),function(global){function install(Vue){Vue.component("resize-observer",__WEBPACK_IMPORTED_MODULE_0__components_ResizeObserver_vue__.a)}__webpack_exports__.install=install;var __WEBPACK_IMPORTED_MODULE_0__components_ResizeObserver_vue__=__webpack_require__(2);__webpack_require__.d(__webpack_exports__,"ResizeObserver",function(){return __WEBPACK_IMPORTED_MODULE_0__components_ResizeObserver_vue__.a});var plugin={version:"0.2.1",install:install};__webpack_exports__.default=plugin;var GlobalVue=null;"undefined"!=typeof window?GlobalVue=window.Vue:void 0!==global&&(GlobalVue=global.Vue),GlobalVue&&GlobalVue.use(plugin)}.call(__webpack_exports__,__webpack_require__(1))},function(module,exports){var g,_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj};g=function(){return this}();try{g=g||Function("return this")()||(0,eval)("this")}catch(e){"object"===("undefined"==typeof window?"undefined":_typeof(window))&&(g=window)}module.exports=g},function(module,__webpack_exports__,__webpack_require__){"use strict";function injectStyle(ssrContext){__webpack_require__(3)}var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ResizeObserver_vue__=__webpack_require__(5),__WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6a22d6d2_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_ResizeObserver_vue__=__webpack_require__(7),normalizeComponent=__webpack_require__(4),__vue_styles__=injectStyle,Component=normalizeComponent(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ResizeObserver_vue__.a,__WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6a22d6d2_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_ResizeObserver_vue__.a,__vue_styles__,"data-v-6a22d6d2",null);__webpack_exports__.a=Component.exports},function(module,exports){},function(module,exports){module.exports=function(rawScriptExports,compiledTemplate,injectStyles,scopeId,moduleIdentifier){var esModule,scriptExports=rawScriptExports=rawScriptExports||{},type=typeof rawScriptExports.default;"object"!==type&&"function"!==type||(esModule=rawScriptExports,scriptExports=rawScriptExports.default);var options="function"==typeof scriptExports?scriptExports.options:scriptExports;compiledTemplate&&(options.render=compiledTemplate.render,options.staticRenderFns=compiledTemplate.staticRenderFns),scopeId&&(options._scopeId=scopeId);var hook;if(moduleIdentifier?(hook=function(context){context=context||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,context||"undefined"==typeof __VUE_SSR_CONTEXT__||(context=__VUE_SSR_CONTEXT__),injectStyles&&injectStyles.call(this,context),context&&context._registeredComponents&&context._registeredComponents.add(moduleIdentifier)},options._ssrRegister=hook):injectStyles&&(hook=injectStyles),hook){var functional=options.functional,existing=functional?options.render:options.beforeCreate;functional?options.render=function(h,context){return hook.call(context),existing(h,context)}:options.beforeCreate=existing?[].concat(existing,hook):[hook]}return{esModule:esModule,exports:scriptExports,options:options}}},function(module,__webpack_exports__,__webpack_require__){"use strict";function initCompat(){initCompat.init||(initCompat.init=!0,isIE=-1!==Object(__WEBPACK_IMPORTED_MODULE_0__utils_compatibility__.a)())}var __WEBPACK_IMPORTED_MODULE_0__utils_compatibility__=__webpack_require__(6),isIE=void 0;__webpack_exports__.a={name:"resize-observer",methods:{notify:function(){this.$emit("notify")},addResizeHandlers:function(){this._resizeObject.contentDocument.defaultView.addEventListener("resize",this.notify),this._w===this.$el.offsetWidth&&this._h===this.$el.offsetHeight||this.notify()},removeResizeHandlers:function(){this._resizeObject&&this._resizeObject.onload&&(!isIE&&this._resizeObject.contentDocument&&this._resizeObject.contentDocument.defaultView.removeEventListener("resize",this.notify),delete this._resizeObject.onload)}},mounted:function(){var _this=this;initCompat(),this.$nextTick(function(){_this._w=_this.$el.offsetWidth,_this._h=_this.$el.offsetHeight});var object=document.createElement("object");this._resizeObject=object,object.setAttribute("style","display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;"),object.onload=this.addResizeHandlers,object.type="text/html",isIE&&this.$el.appendChild(object),object.data="about:blank",isIE||this.$el.appendChild(object)},beforeDestroy:function(){this.removeResizeHandlers()}}},function(module,__webpack_exports__,__webpack_require__){"use strict";function getInternetExplorerVersion(){var ua=window.navigator.userAgent,msie=ua.indexOf("MSIE ");if(msie>0)return parseInt(ua.substring(msie+5,ua.indexOf(".",msie)),10);if(ua.indexOf("Trident/")>0){var rv=ua.indexOf("rv:");return parseInt(ua.substring(rv+3,ua.indexOf(".",rv)),10)}var edge=ua.indexOf("Edge/");return edge>0?parseInt(ua.substring(edge+5,ua.indexOf(".",edge)),10):-1}__webpack_exports__.a=getInternetExplorerVersion},function(module,__webpack_exports__,__webpack_require__){"use strict";var render=function(){var _vm=this,_h=_vm.$createElement;return(_vm._self._c||_h)("div",{staticClass:"resize-observer",attrs:{tabindex:"-1"}})},staticRenderFns=[],esExports={render:render,staticRenderFns:staticRenderFns};__webpack_exports__.a=esExports}])});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = autoCall;
/* harmony export (immutable) */ __webpack_exports__["b"] = capitalize;
function autoCall(value) {
	return typeof value === 'function' ? value() : value;
}

function capitalize(text) {
	return text.charAt(0).toUpperCase() + text.slice(1);
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_resize_dist_vue_resize_css__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_resize_dist_vue_resize_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_resize_dist_vue_resize_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_regenerator_runtime_runtime__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_regenerator_runtime_runtime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_regenerator_runtime_runtime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_loader__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__options__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_error__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Map_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_Marker__ = __webpack_require__(22);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Map", function() { return __WEBPACK_IMPORTED_MODULE_5__components_Map_vue__["a"]; });











function registerComponents(Vue, prefix) {
	Vue.component(prefix + 'map', __WEBPACK_IMPORTED_MODULE_5__components_Map_vue__["a" /* default */]);
	Vue.component(prefix + 'marker', __WEBPACK_IMPORTED_MODULE_6__components_Marker__["a" /* default */]);
}

var plugin = {
	install: function install(Vue, options) {
		var finalOptions = Object.assign({}, {
			installComponents: true,
			componentsPrefix: 'google-'
		}, options);

		Object(__WEBPACK_IMPORTED_MODULE_3__options__["a" /* optionMergeStrategies */])(Vue);
		Object(__WEBPACK_IMPORTED_MODULE_4__utils_error__["b" /* initErrorHandling */])(Vue);

		if (finalOptions.installComponents) {
			registerComponents(Vue, finalOptions.componentsPrefix);
		}

		if (finalOptions.load) {
			__WEBPACK_IMPORTED_MODULE_2__lib_loader__["a" /* default */].load(finalOptions.load);
		}
	}
};

/* harmony default export */ __webpack_exports__["default"] = (plugin);

// Auto-install
var GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(5)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Map_vue__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_292ee470_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_Map_vue__ = __webpack_require__(18);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(8)
}
var normalizeComponent = __webpack_require__(9)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-292ee470"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Map_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_292ee470_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_Map_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/Map.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Map.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-292ee470", Component.options)
  } else {
    hotAPI.reload("data-v-292ee470", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_resize__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_observe_visibility__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_observe_visibility___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_observe_visibility__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_Ready__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_BoundProps__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_Events__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_misc__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_redirect_methods__ = __webpack_require__(17);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//









var boundProps = [{
	name: 'center',
	watcher: function watcher(value) {
		return {
			lat: Object(__WEBPACK_IMPORTED_MODULE_5__utils_misc__["a" /* autoCall */])(value.lat),
			lng: Object(__WEBPACK_IMPORTED_MODULE_5__utils_misc__["a" /* autoCall */])(value.lng)
		};
	},
	identity: function identity(a, b) {
		if (a && b) {
			if (typeof a.equals !== 'function') {
				a = new window.google.maps.LatLng(a);
			}
			if (typeof b.equals !== 'function') {
				b = new window.google.maps.LatLng(b);
			}
			return a.equals(b);
		}
	},
	retriever: function retriever(value) {
		return {
			lat: value.lat(),
			lng: value.lng()
		};
	}
}, 'heading', 'mapTypeId', 'tilt', 'zoom'];

var redirectedMethods = ['panBy', 'panTo', 'panToBounds', 'fitBounds'];

var redirectedEvents = ['click', 'dblclick', 'drag', 'dragend', 'dragstart', 'idle', 'mousemove', 'mouseout', 'mouseover', 'resize', 'rightclick', 'tilesloaded'];

/* harmony default export */ __webpack_exports__["a"] = ({
	name: 'GoogleMapsMap',

	mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_Ready__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_BoundProps__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_Events__["a" /* default */]],

	components: {
		ResizeObserver: __WEBPACK_IMPORTED_MODULE_0_vue_resize__["ResizeObserver"]
	},

	directives: {
		ObserveVisibility: __WEBPACK_IMPORTED_MODULE_1_vue_observe_visibility__["ObserveVisibility"]
	},

	props: {
		center: {
			required: true,
			type: Object
		},
		heading: {
			type: Number
		},
		mapTypeId: {
			type: String
		},
		options: {
			type: Object,
			default: function _default() {
				return {};
			}
		},
		tilt: {
			type: Number
		},
		zoom: {
			required: false,
			type: Number
		}
	},

	methods: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_6__utils_redirect_methods__["a" /* redirectMethods */])({
		target: function target() {
			return this.$map;
		},

		names: redirectedMethods
	}), {
		resize: function resize() {
			var preserveCenter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			if (this.$map) {
				var center = void 0;
				preserveCenter && (center = this.$map.getCenter());
				window.google.maps.event.trigger(this.$map, 'resize');
				preserveCenter && this.$map.setCenter(center);
			}
		},
		visibilityChanged: function visibilityChanged(isVisible) {
			if (isVisible) {
				this.$nextTick(this.resize);
			}
		}
	}),

	googleMapsReady: function googleMapsReady() {
		var _this = this;

		var element = this.$refs.map;

		var options = _extends({
			center: this.center,
			heading: this.heading,
			mapTypeId: this.mapTypeId,
			tilt: this.tilt,
			zoom: this.zoom
		}, this.options);

		this.$map = new window.google.maps.Map(element, options);

		this.bindProps(this.$map, boundProps);

		this.listen(this.$map, 'bounds_changed', function () {
			_this.$emit('update:bounds', _this.$map.getBounds());
		});

		this.redirectEvents(this.$map, redirectedEvents);
	}
});

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dist_vue_resize_css__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dist_vue_resize_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__dist_vue_resize_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dist_vue_resize__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dist_vue_resize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__dist_vue_resize__);
/* unused harmony reexport default */
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__dist_vue_resize__, "ResizeObserver")) __webpack_require__.d(__webpack_exports__, "ResizeObserver", function() { return __WEBPACK_IMPORTED_MODULE_1__dist_vue_resize__["ResizeObserver"]; });





/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

!function(root,factory){ true?module.exports=factory():"function"==typeof define&&define.amd?define([],factory):"object"==typeof exports?exports.VueObserveVisibility=factory():root.VueObserveVisibility=factory()}(this,function(){return function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={i:moduleId,l:!1,exports:{}};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.l=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.d=function(exports,name,getter){__webpack_require__.o(exports,name)||Object.defineProperty(exports,name,{configurable:!1,enumerable:!0,get:getter})},__webpack_require__.n=function(module){var getter=module&&module.__esModule?function(){return module.default}:function(){return module};return __webpack_require__.d(getter,"a",getter),getter},__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=0)}([function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0}),function(global){function install(Vue){Vue.directive("observe-visibility",__WEBPACK_IMPORTED_MODULE_0__directives_observe_visibility__.a)}__webpack_exports__.install=install;var __WEBPACK_IMPORTED_MODULE_0__directives_observe_visibility__=__webpack_require__(2);__webpack_require__.d(__webpack_exports__,"ObserveVisibility",function(){return __WEBPACK_IMPORTED_MODULE_0__directives_observe_visibility__.a});var plugin={version:"0.2.2",install:install};__webpack_exports__.default=plugin;var GlobalVue=null;"undefined"!=typeof window?GlobalVue=window.Vue:void 0!==global&&(GlobalVue=global.Vue),GlobalVue&&GlobalVue.use(plugin)}.call(__webpack_exports__,__webpack_require__(1))},function(module,exports){var g,_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj};g=function(){return this}();try{g=g||Function("return this")()||(0,eval)("this")}catch(e){"object"===("undefined"==typeof window?"undefined":_typeof(window))&&(g=window)}module.exports=g},function(module,__webpack_exports__,__webpack_require__){"use strict";function throwValueError(value){if(null!==value&&"function"!=typeof value)throw new Error("observe-visibility directive expects a function as the value")}__webpack_exports__.a={bind:function(el,_ref,vnode){var value=_ref.value;if("undefined"==typeof IntersectionObserver)console.warn("[vue-observe-visibility] IntersectionObserver API is not available in your browser. Please install this polyfill: https://github.com/WICG/IntersectionObserver/tree/gh-pages/polyfill");else{throwValueError(value),el._vue_visibilityCallback=value;var observer=el._vue_intersectionObserver=new IntersectionObserver(function(entries){var entry=entries[0];el._vue_visibilityCallback&&el._vue_visibilityCallback.call(null,entry.intersectionRatio>0,entry)});vnode.context.$nextTick(function(){observer.observe(el)})}},update:function(el,_ref2){var value=_ref2.value;throwValueError(value),el._vue_visibilityCallback=value},unbind:function(el){el._vue_intersectionObserver&&(el._vue_intersectionObserver.disconnect(),delete el._vue_intersectionObserver,delete el._vue_visibilityCallback)}}}])});

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_loader__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_error__ = __webpack_require__(20);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }




/* harmony default export */ __webpack_exports__["a"] = ({
	mounted: function mounted() {
		var _this = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
			var handlers, i;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return __WEBPACK_IMPORTED_MODULE_0__lib_loader__["a" /* default */].ensureReady();

						case 2:
							handlers = _this.$options.googleMapsReady;

							if (handlers) {
								for (i = 0; i < handlers.length; i++) {
									try {
										handlers[i].call(_this);
									} catch (e) {
										Object(__WEBPACK_IMPORTED_MODULE_1__utils_error__["a" /* handleError */])(e, _this, 'googleMapsReady hook');
									}
								}
							}

						case 4:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this);
		}))();
	}
});

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_bind_prop__ = __webpack_require__(15);


/* harmony default export */ __webpack_exports__["a"] = ({
	methods: {
		bindProps: function bindProps(target, props) {
			this.unbindProps();
			this._boundsProps = [];
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = props[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var prop = _step.value;

					var options = {
						vm: this,
						target: target
					};
					if (typeof prop === 'string') {
						options.name = prop;
					} else {
						Object.assign(options, prop);
					}
					this._boundsProps.push(Object(__WEBPACK_IMPORTED_MODULE_0__utils_bind_prop__["a" /* bindProp */])(options));
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		},
		unbindProps: function unbindProps() {
			if (this._boundsProps) {
				this._boundsProps.forEach(function (unbind) {
					return unbind();
				});
			}
		}
	},
	beforeDestroy: function beforeDestroy() {
		this.unbindProps();
	}
});

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = bindProp;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__misc__ = __webpack_require__(3);


function bindProp(_ref) {
	var vm = _ref.vm,
	    name = _ref.name,
	    targetPropName = _ref.targetPropName,
	    target = _ref.target,
	    watcher = _ref.watcher,
	    identity = _ref.identity,
	    applier = _ref.applier,
	    retriever = _ref.retriever,
	    readOnly = _ref.readOnly,
	    event = _ref.event,
	    changeEvent = _ref.changeEvent;

	if (!targetPropName) {
		targetPropName = name;
	}
	if (!changeEvent) {
		changeEvent = targetPropName.toLowerCase() + '_changed';
	}

	var setValue = void 0;
	var capitalizedName = Object(__WEBPACK_IMPORTED_MODULE_0__misc__["b" /* capitalize */])(name);
	var getter = function getter() {
		return target && target['get' + capitalizedName]();
	};
	var setter = function setter(value) {
		setValue = value;
		target && target['set' + capitalizedName](value);
	};

	if (!watcher) {
		watcher = function watcher(value) {
			return value;
		};
	}
	if (!identity) {
		identity = function identity(a, b) {
			return a === b;
		};
	}
	if (!applier) {
		applier = function applier(value, oldValue, set) {
			if (!identity(value, oldValue)) {
				set(value);
			}
		};
	}
	if (!retriever) {
		retriever = function retriever(value) {
			return value;
		};
	}
	if (!event) {
		event = 'update:' + name;
	}

	vm.$watch(function () {
		return watcher(vm[name]);
	}, function (value, oldValue) {
		return applier(value, oldValue, setter);
	});

	var listener = target.addListener(changeEvent, function () {
		var value = retriever(getter());
		if (!identity(value, setValue)) {
			vm.$emit(event, value);
			setValue = value;
		}
	});

	return function () {
		listener.remove();
	};
}

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
	methods: {
		listen: function listen(target, event, handler) {
			this._googleListeners.push(target.addListener(event, handler));
		},
		redirectEvents: function redirectEvents(target, events) {
			var _this = this;

			var _loop = function _loop(e) {
				_this.listen(target, e, function () {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					_this.$emit.apply(_this, [e].concat(args));
				});
			};

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var e = _step.value;

					_loop(e);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	},

	beforeCreate: function beforeCreate() {
		this._googleListeners = [];
	},
	beforeDestroy: function beforeDestroy() {
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = this._googleListeners[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var listener = _step2.value;

				listener.remove();
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}
	}
});

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = redirectMethods;
function redirectMethods(_ref) {
	var target = _ref.target,
	    names = _ref.names;

	return names.reduce(function (obj, name) {
		obj[name] = function () {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			var t = target();
			if (t) {
				return t[name].apply(t, args);
			}
		};
		return obj;
	}, {});
}

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "observe-visibility",
      rawName: "v-observe-visibility",
      value: (_vm.visibilityChanged),
      expression: "visibilityChanged"
    }],
    staticClass: "vue-google-map"
  }, [_c('div', {
    ref: "map",
    staticClass: "map-view"
  }), _vm._v(" "), _c('div', {
    staticClass: "hidden-content"
  }, [_vm._t("default")], 2), _vm._v(" "), _vm._t("visible"), _vm._v(" "), _c('resize-observer', {
    on: {
      "notify": _vm.resize
    }
  })], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-292ee470", esExports)
  }
}

/***/ }),
/* 19 */,
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = initErrorHandling;
/* harmony export (immutable) */ __webpack_exports__["a"] = handleError;
var config = void 0;

function initErrorHandling(Vue) {
	config = Vue.config;
}

function handleError(e, vm, info) {
	if (config.errorHandler) {
		config.errorHandler(e, vm, info);
	} else {
		if (typeof console !== 'undefined') {
			console.error(e);
		} else {
			throw e;
		}
	}
}

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = optionMergeStrategies;
function optionMergeStrategies(Vue) {
	var strats = Vue.config.optionMergeStrategies;

	strats.googleMapsReady = strats.created;
}

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_MapElement__ = __webpack_require__(23);


var boundProps = ['animation', 'attribution', 'clickable', 'cursor', 'draggable', 'icon', 'label', 'opacity', 'place', 'position', 'shape', 'title', 'visible', 'zIndex'];

var redirectedEvents = ['click', 'rightclick', 'dblclick', 'drag', 'dragstart', 'dragend', 'mouseup', 'mousedown', 'mouseover', 'mouseout'];

/* harmony default export */ __webpack_exports__["a"] = ({
	name: 'GoogleMapsMarker',

	mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_MapElement__["a" /* default */]],

	props: {
		animation: {
			type: Number
		},
		attribution: {
			type: Object
		},
		clickable: {
			type: Boolean,
			default: true
		},
		cursor: {
			type: String
		},
		draggable: {
			type: Boolean,
			default: false
		},
		icon: {},
		label: {},
		opacity: {
			type: Number,
			default: 1
		},
		place: {
			type: Object
		},
		position: {
			type: Object
		},
		shape: {
			type: Object
		},
		title: {
			type: String
		},
		visible: {
			default: true
		},
		zIndex: {
			type: Number
		}
	},

	render: function render(h) {
		if (!this.$slots.default || this.$slots.default.length === 0) {
			return '';
		} else if (this.$slots.default.length === 1) {
			// So that infowindows can have a marker parent
			return this.$slots.default[0];
		} else {
			return h('div', this.$slots.default);
		}
	},
	googleMapsReady: function googleMapsReady() {
		var options = this.$props;
		options.map = this.$map;
		this.$marker = new window.google.maps.Marker(options);
		this.bindProps(this.$marker, boundProps);
		this.redirectEvents(this.$marker, redirectedEvents);
	},
	beforeDestroy: function beforeDestroy() {
		if (this.$marker) {
			this.$marker.setMap(null);
		}
	}
});

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BoundProps__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Events__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Ready__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FindAncestor__ = __webpack_require__(24);





/* harmony default export */ __webpack_exports__["a"] = ({
	mixins: [__WEBPACK_IMPORTED_MODULE_0__BoundProps__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__Events__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__FindAncestor__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__Ready__["a" /* default */]],

	created: function created() {
		var mapAncestor = this.$findAncestor(function (a) {
			return a.$options.name === 'GoogleMapsMap';
		});

		if (!mapAncestor) {
			throw new Error(this.constructor.name + ' component must be used within a <google-map> component.');
		}

		this.$mapAncestor = mapAncestor;
	},
	googleMapsReady: function googleMapsReady() {
		this.$map = this.$mapAncestor.$map;
	}
});

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
	methods: {
		$findAncestor: function $findAncestor(condition) {
			var search = this.$parent;

			while (search) {
				if (condition(search)) {
					return search;
				}
				search = search.$parent;
			}

			return null;
		}
	}
});

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlNjM0ZDYxNzVlOWM2NjlkZWVmMSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXJlc2l6ZS9kaXN0L3Z1ZS1yZXNpemUuY3NzIiwid2VicGFjazovLy8uL3NyYy9saWItbG9hZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtcmVzaXplL2Rpc3QvdnVlLXJlc2l6ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvbWlzYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL01hcC52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTWFwLnZ1ZT81MjUwIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplci5qcyIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvTWFwLnZ1ZSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXJlc2l6ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLW9ic2VydmUtdmlzaWJpbGl0eS9kaXN0L3Z1ZS1vYnNlcnZlLXZpc2liaWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21peGlucy9SZWFkeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWl4aW5zL0JvdW5kUHJvcHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2JpbmQtcHJvcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWl4aW5zL0V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvcmVkaXJlY3QtbWV0aG9kcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9NYXAudnVlP2NhMWEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2Vycm9yLmpzIiwid2VicGFjazovLy8uL3NyYy9vcHRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL01hcmtlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWl4aW5zL01hcEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21peGlucy9GaW5kQW5jZXN0b3IuanMiXSwibmFtZXMiOlsibG9hZGVyIiwibG9hZGVkIiwicmVhZHlQcm9taXNlcyIsImxvYWQiLCJhcGlLZXkiLCJ2ZXJzaW9uIiwibGlicmFyaWVzIiwibG9hZENuIiwid2luZG93IiwiUHJvbWlzZSIsInJlc29sdmUiLCJnb29nbGUiLCJtYXBzIiwiZ29vZ2xlTWFwU2NyaXB0IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwib3B0aW9ucyIsImtleSIsImsiLCJFcnJvciIsImxpYnJhcmllc1BhdGgiLCJsZW5ndGgiLCJqb2luIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJpc1Byb3RvdHlwZU9mIiwiYmFzZVVybCIsInVybCIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJlbmNvZGVVUklDb21wb25lbnQiLCJzZXRBdHRyaWJ1dGUiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJWdWVHb29nbGVNYXBzTG9hZGVkIiwiX3NldExvYWRlZCIsImJpbmQiLCJjb25zb2xlIiwid2FybiIsImVuc3VyZVJlYWR5IiwicHJvbWlzZSIsInB1c2giLCJhdXRvQ2FsbCIsInZhbHVlIiwiY2FwaXRhbGl6ZSIsInRleHQiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwicmVnaXN0ZXJDb21wb25lbnRzIiwiVnVlIiwicHJlZml4IiwiY29tcG9uZW50IiwicGx1Z2luIiwiaW5zdGFsbCIsImZpbmFsT3B0aW9ucyIsImFzc2lnbiIsImluc3RhbGxDb21wb25lbnRzIiwiY29tcG9uZW50c1ByZWZpeCIsIm9wdGlvbk1lcmdlU3RyYXRlZ2llcyIsImluaXRFcnJvckhhbmRsaW5nIiwiR2xvYmFsVnVlIiwiZ2xvYmFsIiwidXNlIiwibW91bnRlZCIsImhhbmRsZXJzIiwiJG9wdGlvbnMiLCJnb29nbGVNYXBzUmVhZHkiLCJpIiwiY2FsbCIsImUiLCJoYW5kbGVFcnJvciIsIm1ldGhvZHMiLCJiaW5kUHJvcHMiLCJ0YXJnZXQiLCJwcm9wcyIsInVuYmluZFByb3BzIiwiX2JvdW5kc1Byb3BzIiwicHJvcCIsInZtIiwibmFtZSIsImJpbmRQcm9wIiwiZm9yRWFjaCIsInVuYmluZCIsImJlZm9yZURlc3Ryb3kiLCJ0YXJnZXRQcm9wTmFtZSIsIndhdGNoZXIiLCJpZGVudGl0eSIsImFwcGxpZXIiLCJyZXRyaWV2ZXIiLCJyZWFkT25seSIsImV2ZW50IiwiY2hhbmdlRXZlbnQiLCJ0b0xvd2VyQ2FzZSIsInNldFZhbHVlIiwiY2FwaXRhbGl6ZWROYW1lIiwiZ2V0dGVyIiwic2V0dGVyIiwiYSIsImIiLCJvbGRWYWx1ZSIsInNldCIsIiR3YXRjaCIsImxpc3RlbmVyIiwiYWRkTGlzdGVuZXIiLCIkZW1pdCIsInJlbW92ZSIsImxpc3RlbiIsImhhbmRsZXIiLCJfZ29vZ2xlTGlzdGVuZXJzIiwicmVkaXJlY3RFdmVudHMiLCJldmVudHMiLCJhcmdzIiwiYmVmb3JlQ3JlYXRlIiwicmVkaXJlY3RNZXRob2RzIiwibmFtZXMiLCJyZWR1Y2UiLCJvYmoiLCJ0IiwiYXBwbHkiLCJjb25maWciLCJpbmZvIiwiZXJyb3JIYW5kbGVyIiwiZXJyb3IiLCJzdHJhdHMiLCJjcmVhdGVkIiwiYm91bmRQcm9wcyIsInJlZGlyZWN0ZWRFdmVudHMiLCJtaXhpbnMiLCJhbmltYXRpb24iLCJ0eXBlIiwiTnVtYmVyIiwiYXR0cmlidXRpb24iLCJjbGlja2FibGUiLCJCb29sZWFuIiwiZGVmYXVsdCIsImN1cnNvciIsIlN0cmluZyIsImRyYWdnYWJsZSIsImljb24iLCJsYWJlbCIsIm9wYWNpdHkiLCJwbGFjZSIsInBvc2l0aW9uIiwic2hhcGUiLCJ0aXRsZSIsInZpc2libGUiLCJ6SW5kZXgiLCJyZW5kZXIiLCJoIiwiJHNsb3RzIiwiJHByb3BzIiwiJG1hcCIsIiRtYXJrZXIiLCJNYXJrZXIiLCJzZXRNYXAiLCJtYXBBbmNlc3RvciIsIiRmaW5kQW5jZXN0b3IiLCJjb25zdHJ1Y3RvciIsIiRtYXBBbmNlc3RvciIsImNvbmRpdGlvbiIsInNlYXJjaCIsIiRwYXJlbnQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REEseUM7Ozs7Ozs7OztBQ0FBLElBQU1BLFNBQVM7QUFDZEMsU0FBUSxLQURNO0FBRWRDLGdCQUFlLEVBRkQ7O0FBSWQ7Ozs7Ozs7Ozs7OztBQVlBQyxLQWhCYyxzQkFnQmdDO0FBQUEsTUFBdENDLE1BQXNDLFFBQXRDQSxNQUFzQztBQUFBLE1BQTlCQyxPQUE4QixRQUE5QkEsT0FBOEI7QUFBQSxNQUFyQkMsU0FBcUIsUUFBckJBLFNBQXFCO0FBQUEsTUFBVkMsTUFBVSxRQUFWQSxNQUFVOztBQUM3QyxNQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7QUFDbEM7QUFDQSxVQUFPQyxRQUFR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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVc7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0MsY0FBYztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLGtCQUFrQjtBQUNuRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLGVBQWUsY0FBYztBQUM3Qjs7Ozs7Ozs7O0FDenRCQTtBQUFBO0FBQ0E7QUFDQTtBQUNBLHVCQUE2UDtBQUM3UDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ3lJO0FBQ3pJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRUFBK0Usc0RBQXNELElBQUk7QUFDekksbUNBQW1DOztBQUVuQztBQUNBLFlBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOzs7Ozs7O0FDM0NBLHlDOzs7Ozs7QUNBQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO09BR0E7OztvRkFFQTtvRkFFQTtBQUhBOzttQ0FJQTtjQUNBO3VDQUNBO3NDQUNBO0FBQ0E7dUNBQ0E7c0NBQ0E7QUFDQTttQkFDQTtBQUNBO0FBQ0E7OztjQUVBO2NBR0E7QUFKQTs7QUFqQkEsQ0FEQSxFQXVCQSxXQUNBLGFBQ0EsUUFDQTs7QUFFQSx3QkFDQSxDQUNBLFNBQ0EsU0FDQSxlQUNBOztBQUVBLHVCQUNBLENBQ0EsU0FDQSxZQUNBLFFBQ0EsV0FDQSxhQUNBLFFBQ0EsYUFDQSxZQUNBLGFBQ0EsVUFDQSxjQUNBOztBQUVBO09BR0E7O1NBQ0EsQ0FDQSxnRUFDQSxxRUFHQTs7O0FBSUE7QUFIQTs7O0FBT0E7QUFIQTs7OzthQU1BO1NBRUE7QUFIQTs7U0FNQTtBQUZBOztTQUtBO0FBRkE7O1NBSUE7O1dBRUE7O0FBSEE7O1NBTUE7QUFGQTs7YUFJQTtTQUlBO0FBTEE7QUFsQkE7O0FBd0JBOzRCQUVBO2VBQ0E7QUFDQTs7U0FHQTtBQU5BOztBQU9BOztrQkFDQTtRQUNBOzBDQUNBO2dEQUNBOzBDQUNBO0FBQ0E7QUFFQTsyREFDQTtrQkFDQTt3QkFDQTtBQUNBO0FBR0E7Ozs7QUFDQTs7MkJBRUE7OztnQkFFQTtpQkFDQTttQkFDQTtjQUNBO2NBQ0E7QUFMQSxVQVFBOztrREFFQTs7NEJBRUE7O3VEQUNBOzJDQUNBO0FBRUE7O2lDQUNBO0FBQ0E7QUF0RkEsRzs7Ozs7Ozs7Ozs7OztBQ3hFQTtBQUNrQjtBQUNsQjs7Ozs7OztBQ0ZBLHdCQUF3Qiw0TEFBd08saUJBQWlCLHlCQUF5Qix1Q0FBdUMsd0VBQXdFLHVDQUF1Qyw0QkFBNEIsbUhBQW1ILHdCQUF3QixnSUFBZ0kseUVBQXlFLHlDQUF5QyxFQUFFLHdDQUF3QyxnREFBZ0Qsc0JBQXNCLFlBQVksZUFBZSx1REFBdUQsaURBQWlELDZEQUE2RCx1RUFBdUUsMkRBQTJELGFBQWEsd0RBQXdELFNBQVMsbUJBQW1CLHNCQUFzQixtR0FBbUcsb0NBQW9DLHdGQUF3Rix5RUFBeUUsc0VBQXNFLEVBQUUsWUFBWSxpQ0FBaUMsbUNBQW1DLG1CQUFtQix5SEFBeUgsa0RBQWtELDBCQUEwQix3RkFBd0Ysa0JBQWtCLGVBQWUsNkdBQTZHLGFBQWEsWUFBWSxHQUFHLElBQUksaURBQWlELFNBQVMsZ0ZBQWdGLGlCQUFpQiwwREFBMEQsYUFBYSxnQ0FBZ0MsMEhBQTBILHVCQUF1Qiw2QkFBNkIscUJBQXFCLGtQQUFrUCxLQUFLLHdEQUF3RCxxRkFBcUYscUJBQXFCLGtHQUFrRyxFQUFFLG1DQUFtQyxxQkFBcUIsR0FBRywyQkFBMkIsc0JBQXNCLHdEQUF3RCxxQkFBcUIsa0pBQWtKLEdBQUcsRTs7Ozs7Ozs7Ozs7QUNBaGpIO0FBQ0E7O0FBRUEseURBQWU7QUFDUlcsUUFEUSxxQkFDRztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FDViw0REFBQWpFLENBQU93QyxXQUFQLEVBRFU7O0FBQUE7QUFFVjBCLGVBRlUsR0FFQyxNQUFLQyxRQUFMLENBQWNDLGVBRmY7O0FBR2hCLFdBQUlGLFFBQUosRUFBYztBQUNiLGFBQVNHLENBQVQsR0FBYSxDQUFiLEVBQWdCQSxJQUFJSCxTQUFTN0MsTUFBN0IsRUFBcUNnRCxHQUFyQyxFQUEwQztBQUN6QyxhQUFJO0FBQ0hILG1CQUFTRyxDQUFULEVBQVlDLElBQVo7QUFDQSxVQUZELENBRUUsT0FBT0MsQ0FBUCxFQUFVO0FBQ1hDLFVBQUEseUVBQUFBLENBQVlELENBQVo7QUFDQTtBQUNEO0FBQ0Q7O0FBWGU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFZaEI7QUFiYSxDQUFmLEU7Ozs7Ozs7O0FDSEE7O0FBRUEseURBQWU7QUFDZEUsVUFBUztBQUNSQyxXQURRLHFCQUNHQyxNQURILEVBQ1dDLEtBRFgsRUFDa0I7QUFDekIsUUFBS0MsV0FBTDtBQUNBLFFBQUtDLFlBQUwsR0FBb0IsRUFBcEI7QUFGeUI7QUFBQTtBQUFBOztBQUFBO0FBR3pCLHlCQUFtQkYsS0FBbkIsOEhBQTBCO0FBQUEsU0FBZkcsSUFBZTs7QUFDekIsU0FBSS9ELFVBQVU7QUFDYmdFLFVBQUksSUFEUztBQUViTCxjQUFRQTtBQUZLLE1BQWQ7QUFJQSxTQUFJLE9BQU9JLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDN0IvRCxjQUFRaUUsSUFBUixHQUFlRixJQUFmO0FBQ0EsTUFGRCxNQUVPO0FBQ05uRCxhQUFPNkIsTUFBUCxDQUFjekMsT0FBZCxFQUF1QitELElBQXZCO0FBQ0E7QUFDRCxVQUFLRCxZQUFMLENBQWtCcEMsSUFBbEIsQ0FBdUIsMEVBQUF3QyxDQUFTbEUsT0FBVCxDQUF2QjtBQUNBO0FBZHdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFlekIsR0FoQk87QUFrQlI2RCxhQWxCUSx5QkFrQk87QUFDZCxPQUFJLEtBQUtDLFlBQVQsRUFBdUI7QUFDdEIsU0FBS0EsWUFBTCxDQUFrQkssT0FBbEIsQ0FBMEI7QUFBQSxZQUFVQyxRQUFWO0FBQUEsS0FBMUI7QUFDQTtBQUNEO0FBdEJPLEVBREs7QUF5QmRDLGNBekJjLDJCQXlCRztBQUNoQixPQUFLUixXQUFMO0FBQ0E7QUEzQmEsQ0FBZixFOzs7Ozs7Ozs7QUNGQTs7QUFFTyxTQUFTSyxRQUFULE9BWUo7QUFBQSxLQVhGRixFQVdFLFFBWEZBLEVBV0U7QUFBQSxLQVZGQyxJQVVFLFFBVkZBLElBVUU7QUFBQSxLQVRGSyxjQVNFLFFBVEZBLGNBU0U7QUFBQSxLQVJGWCxNQVFFLFFBUkZBLE1BUUU7QUFBQSxLQVBGWSxPQU9FLFFBUEZBLE9BT0U7QUFBQSxLQU5GQyxRQU1FLFFBTkZBLFFBTUU7QUFBQSxLQUxGQyxPQUtFLFFBTEZBLE9BS0U7QUFBQSxLQUpGQyxTQUlFLFFBSkZBLFNBSUU7QUFBQSxLQUhGQyxRQUdFLFFBSEZBLFFBR0U7QUFBQSxLQUZGQyxLQUVFLFFBRkZBLEtBRUU7QUFBQSxLQURGQyxXQUNFLFFBREZBLFdBQ0U7O0FBQ0YsS0FBSSxDQUFDUCxjQUFMLEVBQXFCO0FBQ3BCQSxtQkFBaUJMLElBQWpCO0FBQ0E7QUFDRCxLQUFJLENBQUNZLFdBQUwsRUFBa0I7QUFDakJBLGdCQUFpQlAsZUFBZVEsV0FBZixFQUFqQjtBQUNBOztBQUVELEtBQUlDLGlCQUFKO0FBQ0EsS0FBTUMsa0JBQWtCLGlFQUFBbkQsQ0FBV29DLElBQVgsQ0FBeEI7QUFDQSxLQUFNZ0IsU0FBUyxTQUFUQSxNQUFTO0FBQUEsU0FBTXRCLFVBQVVBLGVBQWFxQixlQUFiLEdBQWhCO0FBQUEsRUFBZjtBQUNBLEtBQU1FLFNBQVMsU0FBVEEsTUFBUyxRQUFTO0FBQ3ZCSCxhQUFXbkQsS0FBWDtBQUNBK0IsWUFBVUEsZUFBYXFCLGVBQWIsRUFBZ0NwRCxLQUFoQyxDQUFWO0FBQ0EsRUFIRDs7QUFLQSxLQUFJLENBQUMyQyxPQUFMLEVBQWM7QUFDYkEsWUFBVTtBQUFBLFVBQVMzQyxLQUFUO0FBQUEsR0FBVjtBQUNBO0FBQ0QsS0FBSSxDQUFDNEMsUUFBTCxFQUFlO0FBQ2RBLGFBQVcsa0JBQUNXLENBQUQsRUFBSUMsQ0FBSjtBQUFBLFVBQVVELE1BQU1DLENBQWhCO0FBQUEsR0FBWDtBQUNBO0FBQ0QsS0FBSSxDQUFDWCxPQUFMLEVBQWM7QUFDYkEsWUFBVSxpQkFBQzdDLEtBQUQsRUFBUXlELFFBQVIsRUFBa0JDLEdBQWxCLEVBQTBCO0FBQ25DLE9BQUksQ0FBQ2QsU0FBUzVDLEtBQVQsRUFBZ0J5RCxRQUFoQixDQUFMLEVBQWdDO0FBQy9CQyxRQUFJMUQsS0FBSjtBQUNBO0FBQ0QsR0FKRDtBQUtBO0FBQ0QsS0FBSSxDQUFDOEMsU0FBTCxFQUFnQjtBQUNmQSxjQUFZO0FBQUEsVUFBUzlDLEtBQVQ7QUFBQSxHQUFaO0FBQ0E7QUFDRCxLQUFJLENBQUNnRCxLQUFMLEVBQVk7QUFDWEEsc0JBQWtCWCxJQUFsQjtBQUNBOztBQUVERCxJQUFHdUIsTUFBSCxDQUNDO0FBQUEsU0FBTWhCLFFBQVFQLEdBQUdDLElBQUgsQ0FBUixDQUFOO0FBQUEsRUFERCxFQUVDLFVBQUNyQyxLQUFELEVBQVF5RCxRQUFSO0FBQUEsU0FBcUJaLFFBQVE3QyxLQUFSLEVBQWV5RCxRQUFmLEVBQXlCSCxNQUF6QixDQUFyQjtBQUFBLEVBRkQ7O0FBS0EsS0FBTU0sV0FBVzdCLE9BQU84QixXQUFQLENBQW1CWixXQUFuQixFQUFnQyxZQUFNO0FBQ3RELE1BQU1qRCxRQUFROEMsVUFBVU8sUUFBVixDQUFkO0FBQ0EsTUFBSSxDQUFDVCxTQUFTNUMsS0FBVCxFQUFnQm1ELFFBQWhCLENBQUwsRUFBZ0M7QUFDL0JmLE1BQUcwQixLQUFILENBQVNkLEtBQVQsRUFBZ0JoRCxLQUFoQjtBQUNBbUQsY0FBV25ELEtBQVg7QUFDQTtBQUNELEVBTmdCLENBQWpCOztBQVFBLFFBQU8sWUFBTTtBQUNaNEQsV0FBU0csTUFBVDtBQUNBLEVBRkQ7QUFHQSxDOzs7Ozs7O0FDbEVELHlEQUFlO0FBQ2RsQyxVQUFTO0FBQ1JtQyxRQURRLGtCQUNBakMsTUFEQSxFQUNRaUIsS0FEUixFQUNlaUIsT0FEZixFQUN3QjtBQUMvQixRQUFLQyxnQkFBTCxDQUFzQnBFLElBQXRCLENBQTJCaUMsT0FBTzhCLFdBQVAsQ0FBbUJiLEtBQW5CLEVBQTBCaUIsT0FBMUIsQ0FBM0I7QUFDQSxHQUhPO0FBS1JFLGdCQUxRLDBCQUtRcEMsTUFMUixFQUtnQnFDLE1BTGhCLEVBS3dCO0FBQUE7O0FBQUEsOEJBQ3BCekMsQ0FEb0I7QUFFOUIsVUFBS3FDLE1BQUwsQ0FBWWpDLE1BQVosRUFBb0JKLENBQXBCLEVBQXVCLFlBQWE7QUFBQSx1Q0FBVDBDLElBQVM7QUFBVEEsVUFBUztBQUFBOztBQUNuQyxXQUFLUCxLQUFMLGVBQVduQyxDQUFYLFNBQWlCMEMsSUFBakI7QUFDQSxLQUZEO0FBRjhCOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUMvQix5QkFBZ0JELE1BQWhCLDhIQUF3QjtBQUFBLFNBQWJ6QyxDQUFhOztBQUFBLFdBQWJBLENBQWE7QUFJdkI7QUFMOEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU0vQjtBQVhPLEVBREs7O0FBZWQyQyxhQWZjLDBCQWVFO0FBQ2YsT0FBS0osZ0JBQUwsR0FBd0IsRUFBeEI7QUFDQSxFQWpCYTtBQW1CZHpCLGNBbkJjLDJCQW1CRztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNoQix5QkFBdUIsS0FBS3lCLGdCQUE1QixtSUFBOEM7QUFBQSxRQUFuQ04sUUFBbUM7O0FBQzdDQSxhQUFTRyxNQUFUO0FBQ0E7QUFIZTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSWhCO0FBdkJhLENBQWYsRTs7Ozs7Ozs7QUNBTyxTQUFTUSxlQUFULE9BQTZDO0FBQUEsS0FBakJ4QyxNQUFpQixRQUFqQkEsTUFBaUI7QUFBQSxLQUFUeUMsS0FBUyxRQUFUQSxLQUFTOztBQUNuRCxRQUFPQSxNQUFNQyxNQUFOLENBQWEsVUFBQ0MsR0FBRCxFQUFNckMsSUFBTixFQUFlO0FBQ2xDcUMsTUFBSXJDLElBQUosSUFBWSxZQUFhO0FBQUEscUNBQVRnQyxJQUFTO0FBQVRBLFFBQVM7QUFBQTs7QUFDeEIsT0FBTU0sSUFBSTVDLFFBQVY7QUFDQSxPQUFJNEMsQ0FBSixFQUFPO0FBQ04sV0FBT0EsRUFBRXRDLElBQUYsRUFBUXVDLEtBQVIsQ0FBY0QsQ0FBZCxFQUFpQk4sSUFBakIsQ0FBUDtBQUNBO0FBQ0QsR0FMRDtBQU1BLFNBQU9LLEdBQVA7QUFDQSxFQVJNLEVBUUosRUFSSSxDQUFQO0FBU0EsQzs7Ozs7OztBQ1ZELDBCQUEwQixhQUFhLDBCQUEwQjtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7OztBQzdCQTtBQUFBLElBQUlHLGVBQUo7O0FBRU8sU0FBUzVELGlCQUFULENBQTRCVixHQUE1QixFQUFpQztBQUN2Q3NFLFVBQVN0RSxJQUFJc0UsTUFBYjtBQUNBOztBQUVNLFNBQVNqRCxXQUFULENBQXNCRCxDQUF0QixFQUF5QlMsRUFBekIsRUFBNkIwQyxJQUE3QixFQUFtQztBQUN6QyxLQUFJRCxPQUFPRSxZQUFYLEVBQXlCO0FBQ3hCRixTQUFPRSxZQUFQLENBQW9CcEQsQ0FBcEIsRUFBdUJTLEVBQXZCLEVBQTJCMEMsSUFBM0I7QUFDQSxFQUZELE1BRU87QUFDTixNQUFJLE9BQU9wRixPQUFQLEtBQW1CLFdBQXZCLEVBQW9DO0FBQ25DQSxXQUFRc0YsS0FBUixDQUFjckQsQ0FBZDtBQUNBLEdBRkQsTUFFTztBQUNOLFNBQU1BLENBQU47QUFDQTtBQUNEO0FBQ0QsQzs7Ozs7Ozs7QUNoQk0sU0FBU1gscUJBQVQsQ0FBZ0NULEdBQWhDLEVBQXFDO0FBQzNDLEtBQU0wRSxTQUFTMUUsSUFBSXNFLE1BQUosQ0FBVzdELHFCQUExQjs7QUFFQWlFLFFBQU96RCxlQUFQLEdBQXlCeUQsT0FBT0MsT0FBaEM7QUFDQSxDOzs7Ozs7OztBQ0pEOztBQUVBLElBQU1DLGFBQWEsQ0FDbEIsV0FEa0IsRUFFbEIsYUFGa0IsRUFHbEIsV0FIa0IsRUFJbEIsUUFKa0IsRUFLbEIsV0FMa0IsRUFNbEIsTUFOa0IsRUFPbEIsT0FQa0IsRUFRbEIsU0FSa0IsRUFTbEIsT0FUa0IsRUFVbEIsVUFWa0IsRUFXbEIsT0FYa0IsRUFZbEIsT0Faa0IsRUFhbEIsU0Fia0IsRUFjbEIsUUFka0IsQ0FBbkI7O0FBaUJBLElBQU1DLG1CQUFtQixDQUN4QixPQUR3QixFQUV4QixZQUZ3QixFQUd4QixVQUh3QixFQUl4QixNQUp3QixFQUt4QixXQUx3QixFQU14QixTQU53QixFQU94QixTQVB3QixFQVF4QixXQVJ3QixFQVN4QixXQVR3QixFQVV4QixVQVZ3QixDQUF6Qjs7QUFhQSx5REFBZTtBQUNkL0MsT0FBTSxrQkFEUTs7QUFHZGdELFNBQVEsQ0FDUCxtRUFETyxDQUhNOztBQU9kckQsUUFBTztBQUNOc0QsYUFBVztBQUNWQyxTQUFNQztBQURJLEdBREw7QUFJTkMsZUFBYTtBQUNaRixTQUFNdkc7QUFETSxHQUpQO0FBT04wRyxhQUFXO0FBQ1ZILFNBQU1JLE9BREk7QUFFVkMsWUFBUztBQUZDLEdBUEw7QUFXTkMsVUFBUTtBQUNQTixTQUFNTztBQURDLEdBWEY7QUFjTkMsYUFBVztBQUNWUixTQUFNSSxPQURJO0FBRVZDLFlBQVM7QUFGQyxHQWRMO0FBa0JOSSxRQUFNLEVBbEJBO0FBb0JOQyxTQUFPLEVBcEJEO0FBc0JOQyxXQUFTO0FBQ1JYLFNBQU1DLE1BREU7QUFFUkksWUFBUztBQUZELEdBdEJIO0FBMEJOTyxTQUFPO0FBQ05aLFNBQU12RztBQURBLEdBMUJEO0FBNkJOb0gsWUFBVTtBQUNUYixTQUFNdkc7QUFERyxHQTdCSjtBQWdDTnFILFNBQU87QUFDTmQsU0FBTXZHO0FBREEsR0FoQ0Q7QUFtQ05zSCxTQUFPO0FBQ05mLFNBQU1PO0FBREEsR0FuQ0Q7QUFzQ05TLFdBQVM7QUFDUlgsWUFBUztBQURELEdBdENIO0FBeUNOWSxVQUFRO0FBQ1BqQixTQUFNQztBQURDO0FBekNGLEVBUE87O0FBcURkaUIsT0FyRGMsa0JBcUROQyxDQXJETSxFQXFESDtBQUNWLE1BQUksQ0FBQyxLQUFLQyxNQUFMLENBQVlmLE9BQWIsSUFBd0IsS0FBS2UsTUFBTCxDQUFZZixPQUFaLENBQW9CbkgsTUFBcEIsS0FBK0IsQ0FBM0QsRUFBOEQ7QUFDN0QsVUFBTyxFQUFQO0FBQ0EsR0FGRCxNQUVPLElBQUksS0FBS2tJLE1BQUwsQ0FBWWYsT0FBWixDQUFvQm5ILE1BQXBCLEtBQStCLENBQW5DLEVBQXNDO0FBQzVDO0FBQ0EsVUFBTyxLQUFLa0ksTUFBTCxDQUFZZixPQUFaLENBQW9CLENBQXBCLENBQVA7QUFDQSxHQUhNLE1BR0E7QUFDTixVQUFPYyxFQUNOLEtBRE0sRUFFTixLQUFLQyxNQUFMLENBQVlmLE9BRk4sQ0FBUDtBQUlBO0FBQ0QsRUFqRWE7QUFtRWRwRSxnQkFuRWMsNkJBbUVLO0FBQ2xCLE1BQU1wRCxVQUFVLEtBQUt3SSxNQUFyQjtBQUNBeEksVUFBUWMsR0FBUixHQUFjLEtBQUsySCxJQUFuQjtBQUNBLE9BQUtDLE9BQUwsR0FBZSxJQUFJbEosT0FBT0csTUFBUCxDQUFjQyxJQUFkLENBQW1CK0ksTUFBdkIsQ0FBOEIzSSxPQUE5QixDQUFmO0FBQ0EsT0FBSzBELFNBQUwsQ0FBZSxLQUFLZ0YsT0FBcEIsRUFBNkIzQixVQUE3QjtBQUNBLE9BQUtoQixjQUFMLENBQW9CLEtBQUsyQyxPQUF6QixFQUFrQzFCLGdCQUFsQztBQUNBLEVBekVhO0FBMkVkM0MsY0EzRWMsMkJBMkVHO0FBQ2hCLE1BQUksS0FBS3FFLE9BQVQsRUFBa0I7QUFDakIsUUFBS0EsT0FBTCxDQUFhRSxNQUFiLENBQW9CLElBQXBCO0FBQ0E7QUFDRDtBQS9FYSxDQUFmLEU7Ozs7Ozs7Ozs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBOzt5REFFZTtBQUNkM0IsU0FBUSxDQUNQLDREQURPLEVBRVAsd0RBRk8sRUFHUCw4REFITyxFQUlQLHVEQUpPLENBRE07O0FBUWRILFFBUmMscUJBUUg7QUFDVixNQUFNK0IsY0FBYyxLQUFLQyxhQUFMLENBQ25CO0FBQUEsVUFBSzNELEVBQUVoQyxRQUFGLENBQVdjLElBQVgsS0FBb0IsZUFBekI7QUFBQSxHQURtQixDQUFwQjs7QUFJQSxNQUFJLENBQUM0RSxXQUFMLEVBQWtCO0FBQ2pCLFNBQU0sSUFBSTFJLEtBQUosQ0FBYSxLQUFLNEksV0FBTCxDQUFpQjlFLElBQTlCLDhEQUFOO0FBQ0E7O0FBRUQsT0FBSytFLFlBQUwsR0FBb0JILFdBQXBCO0FBQ0EsRUFsQmE7QUFvQmR6RixnQkFwQmMsNkJBb0JLO0FBQ2xCLE9BQUtxRixJQUFMLEdBQVksS0FBS08sWUFBTCxDQUFrQlAsSUFBOUI7QUFDQTtBQXRCYSxDQUFmLEU7Ozs7Ozs7QUNMQSx5REFBZTtBQUNkaEYsVUFBUztBQUNScUYsZUFEUSx5QkFDT0csU0FEUCxFQUNrQjtBQUN6QixPQUFJQyxTQUFTLEtBQUtDLE9BQWxCOztBQUVBLFVBQU9ELE1BQVAsRUFBZTtBQUNkLFFBQUlELFVBQVVDLE1BQVYsQ0FBSixFQUF1QjtBQUN0QixZQUFPQSxNQUFQO0FBQ0E7QUFDREEsYUFBU0EsT0FBT0MsT0FBaEI7QUFDQTs7QUFFRCxVQUFPLElBQVA7QUFDQTtBQVpPO0FBREssQ0FBZixFIiwiZmlsZSI6InZ1ZS1nb29nbGVtYXBzLnVtZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZTYzNGQ2MTc1ZTljNjY5ZGVlZjEiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1yZXNpemUvZGlzdC92dWUtcmVzaXplLmNzc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsb2FkZXIgPSB7XG5cdGxvYWRlZDogZmFsc2UsXG5cdHJlYWR5UHJvbWlzZXM6IFtdLFxuXG5cdC8qKlxuXHQgKiBAcGFyYW0gYXBpS2V5ICAgIEFQSSBLZXksIG9yIG9iamVjdCB3aXRoIHRoZSBVUkwgcGFyYW1ldGVycy4gRm9yIGV4YW1wbGVcblx0ICogICAgICAgICAgICAgICAgICB0byB1c2UgR29vZ2xlIE1hcHMgUHJlbWl1bSBBUEksIHBhc3Ncblx0ICogICAgICAgICAgICAgICAgICAgIGB7IGNsaWVudDogPFlPVVItQ0xJRU5ULUlEPiB9YC5cblx0ICogICAgICAgICAgICAgICAgICBZb3UgbWF5IHBhc3MgdGhlIGxpYnJhcmllcyBhbmQvb3IgdmVyc2lvbiAoYXMgYHZgKSBwYXJhbWV0ZXIgaW50b1xuXHQgKiAgICAgICAgICAgICAgICAgIHRoaXMgcGFyYW1ldGVyIGFuZCBza2lwIHRoZSBuZXh0IHR3byBwYXJhbWV0ZXJzXG5cdCAqIEBwYXJhbSB2ZXJzaW9uICAgR29vZ2xlIGZvciBNYXBzIHZlcnNpb25cblx0ICogQHBhcmFtIGxpYnJhcmllcyBMaWJyYXJpZXMgdG8gbG9hZCAoQHNlZVxuXHQgKiAgICAgICAgICAgICAgICAgIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9qYXZhc2NyaXB0L2xpYnJhcmllcylcblx0ICogQHBhcmFtIGxvYWRDbiAgICBCb29sZWFuLiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIG1hcCB3aWxsIGJlIGxvYWRlZCBmb3JtIGdvb2xlIG1hcHMgQ2hpbmFcblx0ICogICAgICAgICAgICAgICAgICAoQHNlZSBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9tYXBzL2RvY3VtZW50YXRpb24vamF2YXNjcmlwdC9iYXNpY3MjR29vZ2xlTWFwc0NoaW5hKVxuXHQgKi9cblx0bG9hZCAoeyBhcGlLZXksIHZlcnNpb24sIGxpYnJhcmllcywgbG9hZENuIH0pIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdC8vIERvIG5vdGhpbmcgaWYgcnVuIGZyb20gc2VydmVyLXNpZGVcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdH1cblx0XHRpZiAoIXRoaXMubG9hZGVkICYmICghd2luZG93Lmdvb2dsZSB8fCAhd2luZG93Lmdvb2dsZS5tYXBzKSkge1xuXHRcdFx0Y29uc3QgZ29vZ2xlTWFwU2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnU0NSSVBUJylcblxuXHRcdFx0Ly8gQWxsb3cgYXBpS2V5IHRvIGJlIGFuIG9iamVjdC5cblx0XHRcdC8vIFRoaXMgaXMgdG8gc3VwcG9ydCBtb3JlIGVzb3RlcmljIG1lYW5zIG9mIGxvYWRpbmcgR29vZ2xlIE1hcHMsXG5cdFx0XHQvLyBzdWNoIGFzIEdvb2dsZSBmb3IgYnVzaW5lc3Ncblx0XHRcdC8vIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9qYXZhc2NyaXB0L2dldC1hcGkta2V5I3ByZW1pdW0tYXV0aFxuXHRcdFx0dmFyIG9wdGlvbnMgPSB7fVxuXHRcdFx0aWYgKHR5cGVvZiBhcGlLZXkgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdG9wdGlvbnMua2V5ID0gYXBpS2V5XG5cdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBhcGlLZXkgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAobGV0IGsgaW4gYXBpS2V5KSB7IC8vIHRyYW5zZmVyIHZhbHVlcyBpbiBhcGlLZXkgdG8gb3B0aW9uc1xuXHRcdFx0XHRcdG9wdGlvbnNba10gPSBhcGlLZXlba11cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdgYXBpS2V5YCBzaG91bGQgZWl0aGVyIGJlIGEgc3RyaW5nIG9yIGFuIG9iamVjdCcpXG5cdFx0XHR9XG5cblx0XHRcdC8vIGxpYnJhcmllc1xuXHRcdFx0bGV0IGxpYnJhcmllc1BhdGggPSAnJ1xuXHRcdFx0aWYgKGxpYnJhcmllcyAmJiBsaWJyYXJpZXMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRsaWJyYXJpZXNQYXRoID0gbGlicmFyaWVzLmpvaW4oJywnKVxuXHRcdFx0XHRvcHRpb25zWydsaWJyYXJpZXMnXSA9IGxpYnJhcmllc1BhdGhcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkucHJvdG90eXBlLmlzUHJvdG90eXBlT2Yob3B0aW9ucy5saWJyYXJpZXMpKSB7XG5cdFx0XHRcdG9wdGlvbnMubGlicmFyaWVzID0gb3B0aW9ucy5saWJyYXJpZXMuam9pbignLCcpXG5cdFx0XHR9XG5cdFx0XHRvcHRpb25zWydjYWxsYmFjayddID0gJ1Z1ZUdvb2dsZU1hcHNMb2FkZWQnXG5cblx0XHRcdGxldCBiYXNlVXJsID0gJ2h0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS8nXG5cblx0XHRcdGlmICh0eXBlb2YgbG9hZENuID09PSAnYm9vbGVhbicgJiYgbG9hZENuID09PSB0cnVlKSB7XG5cdFx0XHRcdGJhc2VVcmwgPSAnaHR0cDovL21hcHMuZ29vZ2xlLmNuLydcblx0XHRcdH1cblxuXHRcdFx0bGV0IHVybCA9IGJhc2VVcmwgKyAnbWFwcy9hcGkvanM/JyArXG5cdFx0XHRPYmplY3Qua2V5cyhvcHRpb25zKVxuXHRcdFx0XHQubWFwKChrZXkpID0+IGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnNba2V5XSkpXG5cdFx0XHRcdC5qb2luKCcmJylcblxuXHRcdFx0aWYgKHZlcnNpb24pIHtcblx0XHRcdFx0dXJsID0gdXJsICsgJyZ2PScgKyB2ZXJzaW9uXG5cdFx0XHR9XG5cblx0XHRcdGdvb2dsZU1hcFNjcmlwdC5zZXRBdHRyaWJ1dGUoJ3NyYycsIHVybClcblx0XHRcdGdvb2dsZU1hcFNjcmlwdC5zZXRBdHRyaWJ1dGUoJ2FzeW5jJywgJycpXG5cdFx0XHRnb29nbGVNYXBTY3JpcHQuc2V0QXR0cmlidXRlKCdkZWZlcicsICcnKVxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChnb29nbGVNYXBTY3JpcHQpXG5cblx0XHRcdHdpbmRvdy5WdWVHb29nbGVNYXBzTG9hZGVkID0gdGhpcy5fc2V0TG9hZGVkLmJpbmQodGhpcylcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc29sZS53YXJuKCdUaGUgR29vZ2xlIE1hcHMgbGlicmFyeSBpcyBhbHJlYWR5IGxvYWRlZCcpXG5cdFx0XHR0aGlzLl9zZXRMb2FkZWQoKVxuXHRcdH1cblx0fSxcblxuXHRlbnN1cmVSZWFkeSAoKSB7XG5cdFx0aWYgKHRoaXMubG9hZGVkKSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG5cdFx0XHRcdHRoaXMucmVhZHlQcm9taXNlcy5wdXNoKHJlc29sdmUpXG5cdFx0XHR9KVxuXHRcdFx0cmV0dXJuIHByb21pc2Vcblx0XHR9XG5cdH0sXG5cblx0X3NldExvYWRlZCAoKSB7XG5cdFx0dGhpcy5sb2FkZWQgPSB0cnVlXG5cdFx0Zm9yIChjb25zdCByZXNvbHZlIG9mIHRoaXMucmVhZHlQcm9taXNlcykge1xuXHRcdFx0cmVzb2x2ZSgpXG5cdFx0fVxuXHRcdHRoaXMucmVhZHlQcm9taXNlcyA9IFtdXG5cdH0sXG59XG5cbmV4cG9ydCBkZWZhdWx0IGxvYWRlclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xpYi1sb2FkZXIuanMiLCIhZnVuY3Rpb24ocm9vdCxmYWN0b3J5KXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1mYWN0b3J5KCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXSxmYWN0b3J5KTpcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzLlZ1ZVJlc2l6ZT1mYWN0b3J5KCk6cm9vdC5WdWVSZXNpemU9ZmFjdG9yeSgpfSh0aGlzLGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKG1vZHVsZXMpe2Z1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpe2lmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKXJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO3ZhciBtb2R1bGU9aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF09e2k6bW9kdWxlSWQsbDohMSxleHBvcnRzOnt9fTtyZXR1cm4gbW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cyxtb2R1bGUsbW9kdWxlLmV4cG9ydHMsX193ZWJwYWNrX3JlcXVpcmVfXyksbW9kdWxlLmw9ITAsbW9kdWxlLmV4cG9ydHN9dmFyIGluc3RhbGxlZE1vZHVsZXM9e307cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ubT1tb2R1bGVzLF9fd2VicGFja19yZXF1aXJlX18uYz1pbnN0YWxsZWRNb2R1bGVzLF9fd2VicGFja19yZXF1aXJlX18uZD1mdW5jdGlvbihleHBvcnRzLG5hbWUsZ2V0dGVyKXtfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cyxuYW1lKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsbmFtZSx7Y29uZmlndXJhYmxlOiExLGVudW1lcmFibGU6ITAsZ2V0OmdldHRlcn0pfSxfX3dlYnBhY2tfcmVxdWlyZV9fLm49ZnVuY3Rpb24obW9kdWxlKXt2YXIgZ2V0dGVyPW1vZHVsZSYmbW9kdWxlLl9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gbW9kdWxlLmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIG1vZHVsZX07cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsXCJhXCIsZ2V0dGVyKSxnZXR0ZXJ9LF9fd2VicGFja19yZXF1aXJlX18ubz1mdW5jdGlvbihvYmplY3QscHJvcGVydHkpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LHByb3BlcnR5KX0sX193ZWJwYWNrX3JlcXVpcmVfXy5wPVwiXCIsX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnM9MCl9KFtmdW5jdGlvbihtb2R1bGUsX193ZWJwYWNrX2V4cG9ydHNfXyxfX3dlYnBhY2tfcmVxdWlyZV9fKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoX193ZWJwYWNrX2V4cG9ydHNfXyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxmdW5jdGlvbihnbG9iYWwpe2Z1bmN0aW9uIGluc3RhbGwoVnVlKXtWdWUuY29tcG9uZW50KFwicmVzaXplLW9ic2VydmVyXCIsX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19jb21wb25lbnRzX1Jlc2l6ZU9ic2VydmVyX3Z1ZV9fLmEpfV9fd2VicGFja19leHBvcnRzX18uaW5zdGFsbD1pbnN0YWxsO3ZhciBfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX2NvbXBvbmVudHNfUmVzaXplT2JzZXJ2ZXJfdnVlX189X193ZWJwYWNrX3JlcXVpcmVfXygyKTtfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXyxcIlJlc2l6ZU9ic2VydmVyXCIsZnVuY3Rpb24oKXtyZXR1cm4gX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19jb21wb25lbnRzX1Jlc2l6ZU9ic2VydmVyX3Z1ZV9fLmF9KTt2YXIgcGx1Z2luPXt2ZXJzaW9uOlwiMC4yLjFcIixpbnN0YWxsOmluc3RhbGx9O19fd2VicGFja19leHBvcnRzX18uZGVmYXVsdD1wbHVnaW47dmFyIEdsb2JhbFZ1ZT1udWxsO1widW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/R2xvYmFsVnVlPXdpbmRvdy5WdWU6dm9pZCAwIT09Z2xvYmFsJiYoR2xvYmFsVnVlPWdsb2JhbC5WdWUpLEdsb2JhbFZ1ZSYmR2xvYmFsVnVlLnVzZShwbHVnaW4pfS5jYWxsKF9fd2VicGFja19leHBvcnRzX18sX193ZWJwYWNrX3JlcXVpcmVfXygxKSl9LGZ1bmN0aW9uKG1vZHVsZSxleHBvcnRzKXt2YXIgZyxfdHlwZW9mPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbihvYmope3JldHVybiB0eXBlb2Ygb2JqfTpmdW5jdGlvbihvYmope3JldHVybiBvYmomJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmb2JqLmNvbnN0cnVjdG9yPT09U3ltYm9sJiZvYmohPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIG9ian07Zz1mdW5jdGlvbigpe3JldHVybiB0aGlzfSgpO3RyeXtnPWd8fEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKXx8KDAsZXZhbCkoXCJ0aGlzXCIpfWNhdGNoKGUpe1wib2JqZWN0XCI9PT0oXCJ1bmRlZmluZWRcIj09dHlwZW9mIHdpbmRvdz9cInVuZGVmaW5lZFwiOl90eXBlb2Yod2luZG93KSkmJihnPXdpbmRvdyl9bW9kdWxlLmV4cG9ydHM9Z30sZnVuY3Rpb24obW9kdWxlLF9fd2VicGFja19leHBvcnRzX18sX193ZWJwYWNrX3JlcXVpcmVfXyl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gaW5qZWN0U3R5bGUoc3NyQ29udGV4dCl7X193ZWJwYWNrX3JlcXVpcmVfXygzKX12YXIgX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19iYWJlbF9sb2FkZXJfbm9kZV9tb2R1bGVzX3Z1ZV9sb2FkZXJfbGliX3NlbGVjdG9yX3R5cGVfc2NyaXB0X2luZGV4XzBfUmVzaXplT2JzZXJ2ZXJfdnVlX189X193ZWJwYWNrX3JlcXVpcmVfXyg1KSxfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfX25vZGVfbW9kdWxlc192dWVfbG9hZGVyX2xpYl90ZW1wbGF0ZV9jb21waWxlcl9pbmRleF9pZF9kYXRhX3ZfNmEyMmQ2ZDJfaGFzU2NvcGVkX3RydWVfbm9kZV9tb2R1bGVzX3Z1ZV9sb2FkZXJfbGliX3NlbGVjdG9yX3R5cGVfdGVtcGxhdGVfaW5kZXhfMF9SZXNpemVPYnNlcnZlcl92dWVfXz1fX3dlYnBhY2tfcmVxdWlyZV9fKDcpLG5vcm1hbGl6ZUNvbXBvbmVudD1fX3dlYnBhY2tfcmVxdWlyZV9fKDQpLF9fdnVlX3N0eWxlc19fPWluamVjdFN0eWxlLENvbXBvbmVudD1ub3JtYWxpemVDb21wb25lbnQoX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19iYWJlbF9sb2FkZXJfbm9kZV9tb2R1bGVzX3Z1ZV9sb2FkZXJfbGliX3NlbGVjdG9yX3R5cGVfc2NyaXB0X2luZGV4XzBfUmVzaXplT2JzZXJ2ZXJfdnVlX18uYSxfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfX25vZGVfbW9kdWxlc192dWVfbG9hZGVyX2xpYl90ZW1wbGF0ZV9jb21waWxlcl9pbmRleF9pZF9kYXRhX3ZfNmEyMmQ2ZDJfaGFzU2NvcGVkX3RydWVfbm9kZV9tb2R1bGVzX3Z1ZV9sb2FkZXJfbGliX3NlbGVjdG9yX3R5cGVfdGVtcGxhdGVfaW5kZXhfMF9SZXNpemVPYnNlcnZlcl92dWVfXy5hLF9fdnVlX3N0eWxlc19fLFwiZGF0YS12LTZhMjJkNmQyXCIsbnVsbCk7X193ZWJwYWNrX2V4cG9ydHNfXy5hPUNvbXBvbmVudC5leHBvcnRzfSxmdW5jdGlvbihtb2R1bGUsZXhwb3J0cyl7fSxmdW5jdGlvbihtb2R1bGUsZXhwb3J0cyl7bW9kdWxlLmV4cG9ydHM9ZnVuY3Rpb24ocmF3U2NyaXB0RXhwb3J0cyxjb21waWxlZFRlbXBsYXRlLGluamVjdFN0eWxlcyxzY29wZUlkLG1vZHVsZUlkZW50aWZpZXIpe3ZhciBlc01vZHVsZSxzY3JpcHRFeHBvcnRzPXJhd1NjcmlwdEV4cG9ydHM9cmF3U2NyaXB0RXhwb3J0c3x8e30sdHlwZT10eXBlb2YgcmF3U2NyaXB0RXhwb3J0cy5kZWZhdWx0O1wib2JqZWN0XCIhPT10eXBlJiZcImZ1bmN0aW9uXCIhPT10eXBlfHwoZXNNb2R1bGU9cmF3U2NyaXB0RXhwb3J0cyxzY3JpcHRFeHBvcnRzPXJhd1NjcmlwdEV4cG9ydHMuZGVmYXVsdCk7dmFyIG9wdGlvbnM9XCJmdW5jdGlvblwiPT10eXBlb2Ygc2NyaXB0RXhwb3J0cz9zY3JpcHRFeHBvcnRzLm9wdGlvbnM6c2NyaXB0RXhwb3J0cztjb21waWxlZFRlbXBsYXRlJiYob3B0aW9ucy5yZW5kZXI9Y29tcGlsZWRUZW1wbGF0ZS5yZW5kZXIsb3B0aW9ucy5zdGF0aWNSZW5kZXJGbnM9Y29tcGlsZWRUZW1wbGF0ZS5zdGF0aWNSZW5kZXJGbnMpLHNjb3BlSWQmJihvcHRpb25zLl9zY29wZUlkPXNjb3BlSWQpO3ZhciBob29rO2lmKG1vZHVsZUlkZW50aWZpZXI/KGhvb2s9ZnVuY3Rpb24oY29udGV4dCl7Y29udGV4dD1jb250ZXh0fHx0aGlzLiR2bm9kZSYmdGhpcy4kdm5vZGUuc3NyQ29udGV4dHx8dGhpcy5wYXJlbnQmJnRoaXMucGFyZW50LiR2bm9kZSYmdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQsY29udGV4dHx8XCJ1bmRlZmluZWRcIj09dHlwZW9mIF9fVlVFX1NTUl9DT05URVhUX198fChjb250ZXh0PV9fVlVFX1NTUl9DT05URVhUX18pLGluamVjdFN0eWxlcyYmaW5qZWN0U3R5bGVzLmNhbGwodGhpcyxjb250ZXh0KSxjb250ZXh0JiZjb250ZXh0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cyYmY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKG1vZHVsZUlkZW50aWZpZXIpfSxvcHRpb25zLl9zc3JSZWdpc3Rlcj1ob29rKTppbmplY3RTdHlsZXMmJihob29rPWluamVjdFN0eWxlcyksaG9vayl7dmFyIGZ1bmN0aW9uYWw9b3B0aW9ucy5mdW5jdGlvbmFsLGV4aXN0aW5nPWZ1bmN0aW9uYWw/b3B0aW9ucy5yZW5kZXI6b3B0aW9ucy5iZWZvcmVDcmVhdGU7ZnVuY3Rpb25hbD9vcHRpb25zLnJlbmRlcj1mdW5jdGlvbihoLGNvbnRleHQpe3JldHVybiBob29rLmNhbGwoY29udGV4dCksZXhpc3RpbmcoaCxjb250ZXh0KX06b3B0aW9ucy5iZWZvcmVDcmVhdGU9ZXhpc3Rpbmc/W10uY29uY2F0KGV4aXN0aW5nLGhvb2spOltob29rXX1yZXR1cm57ZXNNb2R1bGU6ZXNNb2R1bGUsZXhwb3J0czpzY3JpcHRFeHBvcnRzLG9wdGlvbnM6b3B0aW9uc319fSxmdW5jdGlvbihtb2R1bGUsX193ZWJwYWNrX2V4cG9ydHNfXyxfX3dlYnBhY2tfcmVxdWlyZV9fKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBpbml0Q29tcGF0KCl7aW5pdENvbXBhdC5pbml0fHwoaW5pdENvbXBhdC5pbml0PSEwLGlzSUU9LTEhPT1PYmplY3QoX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX191dGlsc19jb21wYXRpYmlsaXR5X18uYSkoKSl9dmFyIF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fdXRpbHNfY29tcGF0aWJpbGl0eV9fPV9fd2VicGFja19yZXF1aXJlX18oNiksaXNJRT12b2lkIDA7X193ZWJwYWNrX2V4cG9ydHNfXy5hPXtuYW1lOlwicmVzaXplLW9ic2VydmVyXCIsbWV0aG9kczp7bm90aWZ5OmZ1bmN0aW9uKCl7dGhpcy4kZW1pdChcIm5vdGlmeVwiKX0sYWRkUmVzaXplSGFuZGxlcnM6ZnVuY3Rpb24oKXt0aGlzLl9yZXNpemVPYmplY3QuY29udGVudERvY3VtZW50LmRlZmF1bHRWaWV3LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIix0aGlzLm5vdGlmeSksdGhpcy5fdz09PXRoaXMuJGVsLm9mZnNldFdpZHRoJiZ0aGlzLl9oPT09dGhpcy4kZWwub2Zmc2V0SGVpZ2h0fHx0aGlzLm5vdGlmeSgpfSxyZW1vdmVSZXNpemVIYW5kbGVyczpmdW5jdGlvbigpe3RoaXMuX3Jlc2l6ZU9iamVjdCYmdGhpcy5fcmVzaXplT2JqZWN0Lm9ubG9hZCYmKCFpc0lFJiZ0aGlzLl9yZXNpemVPYmplY3QuY29udGVudERvY3VtZW50JiZ0aGlzLl9yZXNpemVPYmplY3QuY29udGVudERvY3VtZW50LmRlZmF1bHRWaWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIix0aGlzLm5vdGlmeSksZGVsZXRlIHRoaXMuX3Jlc2l6ZU9iamVjdC5vbmxvYWQpfX0sbW91bnRlZDpmdW5jdGlvbigpe3ZhciBfdGhpcz10aGlzO2luaXRDb21wYXQoKSx0aGlzLiRuZXh0VGljayhmdW5jdGlvbigpe190aGlzLl93PV90aGlzLiRlbC5vZmZzZXRXaWR0aCxfdGhpcy5faD1fdGhpcy4kZWwub2Zmc2V0SGVpZ2h0fSk7dmFyIG9iamVjdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib2JqZWN0XCIpO3RoaXMuX3Jlc2l6ZU9iamVjdD1vYmplY3Qsb2JqZWN0LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsXCJkaXNwbGF5OiBibG9jazsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDA7IGxlZnQ6IDA7IGhlaWdodDogMTAwJTsgd2lkdGg6IDEwMCU7IG92ZXJmbG93OiBoaWRkZW47IHBvaW50ZXItZXZlbnRzOiBub25lOyB6LWluZGV4OiAtMTtcIiksb2JqZWN0Lm9ubG9hZD10aGlzLmFkZFJlc2l6ZUhhbmRsZXJzLG9iamVjdC50eXBlPVwidGV4dC9odG1sXCIsaXNJRSYmdGhpcy4kZWwuYXBwZW5kQ2hpbGQob2JqZWN0KSxvYmplY3QuZGF0YT1cImFib3V0OmJsYW5rXCIsaXNJRXx8dGhpcy4kZWwuYXBwZW5kQ2hpbGQob2JqZWN0KX0sYmVmb3JlRGVzdHJveTpmdW5jdGlvbigpe3RoaXMucmVtb3ZlUmVzaXplSGFuZGxlcnMoKX19fSxmdW5jdGlvbihtb2R1bGUsX193ZWJwYWNrX2V4cG9ydHNfXyxfX3dlYnBhY2tfcmVxdWlyZV9fKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBnZXRJbnRlcm5ldEV4cGxvcmVyVmVyc2lvbigpe3ZhciB1YT13aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCxtc2llPXVhLmluZGV4T2YoXCJNU0lFIFwiKTtpZihtc2llPjApcmV0dXJuIHBhcnNlSW50KHVhLnN1YnN0cmluZyhtc2llKzUsdWEuaW5kZXhPZihcIi5cIixtc2llKSksMTApO2lmKHVhLmluZGV4T2YoXCJUcmlkZW50L1wiKT4wKXt2YXIgcnY9dWEuaW5kZXhPZihcInJ2OlwiKTtyZXR1cm4gcGFyc2VJbnQodWEuc3Vic3RyaW5nKHJ2KzMsdWEuaW5kZXhPZihcIi5cIixydikpLDEwKX12YXIgZWRnZT11YS5pbmRleE9mKFwiRWRnZS9cIik7cmV0dXJuIGVkZ2U+MD9wYXJzZUludCh1YS5zdWJzdHJpbmcoZWRnZSs1LHVhLmluZGV4T2YoXCIuXCIsZWRnZSkpLDEwKTotMX1fX3dlYnBhY2tfZXhwb3J0c19fLmE9Z2V0SW50ZXJuZXRFeHBsb3JlclZlcnNpb259LGZ1bmN0aW9uKG1vZHVsZSxfX3dlYnBhY2tfZXhwb3J0c19fLF9fd2VicGFja19yZXF1aXJlX18pe1widXNlIHN0cmljdFwiO3ZhciByZW5kZXI9ZnVuY3Rpb24oKXt2YXIgX3ZtPXRoaXMsX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3JldHVybihfdm0uX3NlbGYuX2N8fF9oKShcImRpdlwiLHtzdGF0aWNDbGFzczpcInJlc2l6ZS1vYnNlcnZlclwiLGF0dHJzOnt0YWJpbmRleDpcIi0xXCJ9fSl9LHN0YXRpY1JlbmRlckZucz1bXSxlc0V4cG9ydHM9e3JlbmRlcjpyZW5kZXIsc3RhdGljUmVuZGVyRm5zOnN0YXRpY1JlbmRlckZuc307X193ZWJwYWNrX2V4cG9ydHNfXy5hPWVzRXhwb3J0c31dKX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1yZXNpemUvZGlzdC92dWUtcmVzaXplLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBmdW5jdGlvbiBhdXRvQ2FsbCAodmFsdWUpIHtcblx0cmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyA/IHZhbHVlKCkgOiB2YWx1ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FwaXRhbGl6ZSAodGV4dCkge1xuXHRyZXR1cm4gdGV4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRleHQuc2xpY2UoMSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9taXNjLmpzIiwiaW1wb3J0ICd2dWUtcmVzaXplL2Rpc3QvdnVlLXJlc2l6ZS5jc3MnXG5pbXBvcnQgJ3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZSdcbmltcG9ydCBsb2FkZXIgZnJvbSAnLi9saWItbG9hZGVyJ1xuaW1wb3J0IHsgb3B0aW9uTWVyZ2VTdHJhdGVnaWVzIH0gZnJvbSAnLi9vcHRpb25zJ1xuaW1wb3J0IHsgaW5pdEVycm9ySGFuZGxpbmcgfSBmcm9tICcuL3V0aWxzL2Vycm9yJ1xuXG5pbXBvcnQgTWFwIGZyb20gJy4vY29tcG9uZW50cy9NYXAudnVlJ1xuaW1wb3J0IE1hcmtlciBmcm9tICcuL2NvbXBvbmVudHMvTWFya2VyJ1xuXG5leHBvcnQge1xuXHRNYXAsXG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyQ29tcG9uZW50cyAoVnVlLCBwcmVmaXgpIHtcblx0VnVlLmNvbXBvbmVudChgJHtwcmVmaXh9bWFwYCwgTWFwKVxuXHRWdWUuY29tcG9uZW50KGAke3ByZWZpeH1tYXJrZXJgLCBNYXJrZXIpXG59XG5cbmNvbnN0IHBsdWdpbiA9IHtcblx0aW5zdGFsbCAoVnVlLCBvcHRpb25zKSB7XG5cdFx0Y29uc3QgZmluYWxPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwge1xuXHRcdFx0aW5zdGFsbENvbXBvbmVudHM6IHRydWUsXG5cdFx0XHRjb21wb25lbnRzUHJlZml4OiAnZ29vZ2xlLScsXG5cdFx0fSwgb3B0aW9ucylcblxuXHRcdG9wdGlvbk1lcmdlU3RyYXRlZ2llcyhWdWUpXG5cdFx0aW5pdEVycm9ySGFuZGxpbmcoVnVlKVxuXG5cdFx0aWYgKGZpbmFsT3B0aW9ucy5pbnN0YWxsQ29tcG9uZW50cykge1xuXHRcdFx0cmVnaXN0ZXJDb21wb25lbnRzKFZ1ZSwgZmluYWxPcHRpb25zLmNvbXBvbmVudHNQcmVmaXgpXG5cdFx0fVxuXG5cdFx0aWYgKGZpbmFsT3B0aW9ucy5sb2FkKSB7XG5cdFx0XHRsb2FkZXIubG9hZChmaW5hbE9wdGlvbnMubG9hZClcblx0XHR9XG5cdH0sXG59XG5cbmV4cG9ydCBkZWZhdWx0IHBsdWdpblxuXG4vLyBBdXRvLWluc3RhbGxcbmxldCBHbG9iYWxWdWUgPSBudWxsXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0R2xvYmFsVnVlID0gd2luZG93LlZ1ZVxufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuXHRHbG9iYWxWdWUgPSBnbG9iYWwuVnVlXG59XG5pZiAoR2xvYmFsVnVlKSB7XG5cdEdsb2JhbFZ1ZS51c2UocGx1Z2luKVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIGh0dHBzOi8vcmF3LmdpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvbWFzdGVyL0xJQ0VOU0UgZmlsZS4gQW5cbiAqIGFkZGl0aW9uYWwgZ3JhbnQgb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpblxuICogdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbiEoZnVuY3Rpb24oZ2xvYmFsKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgdmFyIGluTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIjtcbiAgdmFyIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lO1xuICBpZiAocnVudGltZSkge1xuICAgIGlmIChpbk1vZHVsZSkge1xuICAgICAgLy8gSWYgcmVnZW5lcmF0b3JSdW50aW1lIGlzIGRlZmluZWQgZ2xvYmFsbHkgYW5kIHdlJ3JlIGluIGEgbW9kdWxlLFxuICAgICAgLy8gbWFrZSB0aGUgZXhwb3J0cyBvYmplY3QgaWRlbnRpY2FsIHRvIHJlZ2VuZXJhdG9yUnVudGltZS5cbiAgICAgIG1vZHVsZS5leHBvcnRzID0gcnVudGltZTtcbiAgICB9XG4gICAgLy8gRG9uJ3QgYm90aGVyIGV2YWx1YXRpbmcgdGhlIHJlc3Qgb2YgdGhpcyBmaWxlIGlmIHRoZSBydW50aW1lIHdhc1xuICAgIC8vIGFscmVhZHkgZGVmaW5lZCBnbG9iYWxseS5cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBEZWZpbmUgdGhlIHJ1bnRpbWUgZ2xvYmFsbHkgKGFzIGV4cGVjdGVkIGJ5IGdlbmVyYXRlZCBjb2RlKSBhcyBlaXRoZXJcbiAgLy8gbW9kdWxlLmV4cG9ydHMgKGlmIHdlJ3JlIGluIGEgbW9kdWxlKSBvciBhIG5ldywgZW1wdHkgb2JqZWN0LlxuICBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZSA9IGluTW9kdWxlID8gbW9kdWxlLmV4cG9ydHMgOiB7fTtcblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBydW50aW1lLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZVt0b1N0cmluZ1RhZ1N5bWJvbF0gPVxuICAgIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIHJ1bnRpbWUubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgaWYgKCEodG9TdHJpbmdUYWdTeW1ib2wgaW4gZ2VuRnVuKSkge1xuICAgICAgICBnZW5GdW5bdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuICAgICAgfVxuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBydW50aW1lLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi4gSWYgdGhlIFByb21pc2UgaXMgcmVqZWN0ZWQsIGhvd2V2ZXIsIHRoZVxuICAgICAgICAgIC8vIHJlc3VsdCBmb3IgdGhpcyBpdGVyYXRpb24gd2lsbCBiZSByZWplY3RlZCB3aXRoIHRoZSBzYW1lXG4gICAgICAgICAgLy8gcmVhc29uLiBOb3RlIHRoYXQgcmVqZWN0aW9ucyBvZiB5aWVsZGVkIFByb21pc2VzIGFyZSBub3RcbiAgICAgICAgICAvLyB0aHJvd24gYmFjayBpbnRvIHRoZSBnZW5lcmF0b3IgZnVuY3Rpb24sIGFzIGlzIHRoZSBjYXNlXG4gICAgICAgICAgLy8gd2hlbiBhbiBhd2FpdGVkIFByb21pc2UgaXMgcmVqZWN0ZWQuIFRoaXMgZGlmZmVyZW5jZSBpblxuICAgICAgICAgIC8vIGJlaGF2aW9yIGJldHdlZW4geWllbGQgYW5kIGF3YWl0IGlzIGltcG9ydGFudCwgYmVjYXVzZSBpdFxuICAgICAgICAgIC8vIGFsbG93cyB0aGUgY29uc3VtZXIgdG8gZGVjaWRlIHdoYXQgdG8gZG8gd2l0aCB0aGUgeWllbGRlZFxuICAgICAgICAgIC8vIHJlamVjdGlvbiAoc3dhbGxvdyBpdCBhbmQgY29udGludWUsIG1hbnVhbGx5IC50aHJvdyBpdCBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgZ2VuZXJhdG9yLCBhYmFuZG9uIGl0ZXJhdGlvbiwgd2hhdGV2ZXIpLiBXaXRoXG4gICAgICAgICAgLy8gYXdhaXQsIGJ5IGNvbnRyYXN0LCB0aGVyZSBpcyBubyBvcHBvcnR1bml0eSB0byBleGFtaW5lIHRoZVxuICAgICAgICAgIC8vIHJlamVjdGlvbiByZWFzb24gb3V0c2lkZSB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uLCBzbyB0aGVcbiAgICAgICAgICAvLyBvbmx5IG9wdGlvbiBpcyB0byB0aHJvdyBpdCBmcm9tIHRoZSBhd2FpdCBleHByZXNzaW9uLCBhbmRcbiAgICAgICAgICAvLyBsZXQgdGhlIGdlbmVyYXRvciBmdW5jdGlvbiBoYW5kbGUgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCByZWplY3QpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIHJ1bnRpbWUuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIHJ1bnRpbWUuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KVxuICAgICk7XG5cbiAgICByZXR1cm4gcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIEdwW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yXCI7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgcnVudGltZS5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIHJ1bnRpbWUudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG59KShcbiAgLy8gSW4gc2xvcHB5IG1vZGUsIHVuYm91bmQgYHRoaXNgIHJlZmVycyB0byB0aGUgZ2xvYmFsIG9iamVjdCwgZmFsbGJhY2sgdG9cbiAgLy8gRnVuY3Rpb24gY29uc3RydWN0b3IgaWYgd2UncmUgaW4gZ2xvYmFsIHN0cmljdCBtb2RlLiBUaGF0IGlzIHNhZGx5IGEgZm9ybVxuICAvLyBvZiBpbmRpcmVjdCBldmFsIHdoaWNoIHZpb2xhdGVzIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5LlxuICAoZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzIH0pKCkgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpXG4pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luL2Rpc3QvbG9hZGVyLmpzP3tcXFwib21pdFxcXCI6MCxcXFwicmVtb3ZlXFxcIjp0cnVlfSFjc3MtbG9hZGVyIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMjkyZWU0NzBcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IXN0eWx1cy1sb2FkZXIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9NYXAudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xuaW1wb3J0IF9fdnVlX3NjcmlwdF9fIGZyb20gXCIhIWJhYmVsLWxvYWRlciEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL01hcC52dWVcIlxuLyogdGVtcGxhdGUgKi9cbmltcG9ydCBfX3Z1ZV90ZW1wbGF0ZV9fIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTI5MmVlNDcwXFxcIixcXFwiaGFzU2NvcGVkXFxcIjp0cnVlfSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vTWFwLnZ1ZVwiXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IGluamVjdFN0eWxlXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gXCJkYXRhLXYtMjkyZWU0NzBcIlxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInNyYy9jb21wb25lbnRzL01hcC52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIE1hcC52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMjkyZWU0NzBcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi0yOTJlZTQ3MFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbmV4cG9ydCBkZWZhdWx0IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL01hcC52dWVcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9leHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4vZGlzdC9sb2FkZXIuanM/e1wib21pdFwiOjAsXCJyZW1vdmVcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTI5MmVlNDcwXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3N0eWx1cy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3NyYy9jb21wb25lbnRzL01hcC52dWVcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyogZ2xvYmFscyBfX1ZVRV9TU1JfQ09OVEVYVF9fICovXG5cbi8vIHRoaXMgbW9kdWxlIGlzIGEgcnVudGltZSB1dGlsaXR5IGZvciBjbGVhbmVyIGNvbXBvbmVudCBtb2R1bGUgb3V0cHV0IGFuZCB3aWxsXG4vLyBiZSBpbmNsdWRlZCBpbiB0aGUgZmluYWwgd2VicGFjayB1c2VyIGJ1bmRsZVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUNvbXBvbmVudCAoXG4gIHJhd1NjcmlwdEV4cG9ydHMsXG4gIGNvbXBpbGVkVGVtcGxhdGUsXG4gIGluamVjdFN0eWxlcyxcbiAgc2NvcGVJZCxcbiAgbW9kdWxlSWRlbnRpZmllciAvKiBzZXJ2ZXIgb25seSAqL1xuKSB7XG4gIHZhciBlc01vZHVsZVxuICB2YXIgc2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzIHx8IHt9XG5cbiAgLy8gRVM2IG1vZHVsZXMgaW50ZXJvcFxuICB2YXIgdHlwZSA9IHR5cGVvZiByYXdTY3JpcHRFeHBvcnRzLmRlZmF1bHRcbiAgaWYgKHR5cGUgPT09ICdvYmplY3QnIHx8IHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBlc01vZHVsZSA9IHJhd1NjcmlwdEV4cG9ydHNcbiAgICBzY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cy5kZWZhdWx0XG4gIH1cblxuICAvLyBWdWUuZXh0ZW5kIGNvbnN0cnVjdG9yIGV4cG9ydCBpbnRlcm9wXG4gIHZhciBvcHRpb25zID0gdHlwZW9mIHNjcmlwdEV4cG9ydHMgPT09ICdmdW5jdGlvbidcbiAgICA/IHNjcmlwdEV4cG9ydHMub3B0aW9uc1xuICAgIDogc2NyaXB0RXhwb3J0c1xuXG4gIC8vIHJlbmRlciBmdW5jdGlvbnNcbiAgaWYgKGNvbXBpbGVkVGVtcGxhdGUpIHtcbiAgICBvcHRpb25zLnJlbmRlciA9IGNvbXBpbGVkVGVtcGxhdGUucmVuZGVyXG4gICAgb3B0aW9ucy5zdGF0aWNSZW5kZXJGbnMgPSBjb21waWxlZFRlbXBsYXRlLnN0YXRpY1JlbmRlckZuc1xuICB9XG5cbiAgLy8gc2NvcGVkSWRcbiAgaWYgKHNjb3BlSWQpIHtcbiAgICBvcHRpb25zLl9zY29wZUlkID0gc2NvcGVJZFxuICB9XG5cbiAgdmFyIGhvb2tcbiAgaWYgKG1vZHVsZUlkZW50aWZpZXIpIHsgLy8gc2VydmVyIGJ1aWxkXG4gICAgaG9vayA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAvLyAyLjMgaW5qZWN0aW9uXG4gICAgICBjb250ZXh0ID1cbiAgICAgICAgY29udGV4dCB8fCAvLyBjYWNoZWQgY2FsbFxuICAgICAgICAodGhpcy4kdm5vZGUgJiYgdGhpcy4kdm5vZGUuc3NyQ29udGV4dCkgfHwgLy8gc3RhdGVmdWxcbiAgICAgICAgKHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LiR2bm9kZSAmJiB0aGlzLnBhcmVudC4kdm5vZGUuc3NyQ29udGV4dCkgLy8gZnVuY3Rpb25hbFxuICAgICAgLy8gMi4yIHdpdGggcnVuSW5OZXdDb250ZXh0OiB0cnVlXG4gICAgICBpZiAoIWNvbnRleHQgJiYgdHlwZW9mIF9fVlVFX1NTUl9DT05URVhUX18gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnRleHQgPSBfX1ZVRV9TU1JfQ09OVEVYVF9fXG4gICAgICB9XG4gICAgICAvLyBpbmplY3QgY29tcG9uZW50IHN0eWxlc1xuICAgICAgaWYgKGluamVjdFN0eWxlcykge1xuICAgICAgICBpbmplY3RTdHlsZXMuY2FsbCh0aGlzLCBjb250ZXh0KVxuICAgICAgfVxuICAgICAgLy8gcmVnaXN0ZXIgY29tcG9uZW50IG1vZHVsZSBpZGVudGlmaWVyIGZvciBhc3luYyBjaHVuayBpbmZlcnJlbmNlXG4gICAgICBpZiAoY29udGV4dCAmJiBjb250ZXh0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cykge1xuICAgICAgICBjb250ZXh0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cy5hZGQobW9kdWxlSWRlbnRpZmllcilcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gdXNlZCBieSBzc3IgaW4gY2FzZSBjb21wb25lbnQgaXMgY2FjaGVkIGFuZCBiZWZvcmVDcmVhdGVcbiAgICAvLyBuZXZlciBnZXRzIGNhbGxlZFxuICAgIG9wdGlvbnMuX3NzclJlZ2lzdGVyID0gaG9va1xuICB9IGVsc2UgaWYgKGluamVjdFN0eWxlcykge1xuICAgIGhvb2sgPSBpbmplY3RTdHlsZXNcbiAgfVxuXG4gIGlmIChob29rKSB7XG4gICAgdmFyIGZ1bmN0aW9uYWwgPSBvcHRpb25zLmZ1bmN0aW9uYWxcbiAgICB2YXIgZXhpc3RpbmcgPSBmdW5jdGlvbmFsXG4gICAgICA/IG9wdGlvbnMucmVuZGVyXG4gICAgICA6IG9wdGlvbnMuYmVmb3JlQ3JlYXRlXG4gICAgaWYgKCFmdW5jdGlvbmFsKSB7XG4gICAgICAvLyBpbmplY3QgY29tcG9uZW50IHJlZ2lzdHJhdGlvbiBhcyBiZWZvcmVDcmVhdGUgaG9va1xuICAgICAgb3B0aW9ucy5iZWZvcmVDcmVhdGUgPSBleGlzdGluZ1xuICAgICAgICA/IFtdLmNvbmNhdChleGlzdGluZywgaG9vaylcbiAgICAgICAgOiBbaG9va11cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gcmVnaXN0ZXIgZm9yIGZ1bmN0aW9hbCBjb21wb25lbnQgaW4gdnVlIGZpbGVcbiAgICAgIG9wdGlvbnMucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyV2l0aFN0eWxlSW5qZWN0aW9uIChoLCBjb250ZXh0KSB7XG4gICAgICAgIGhvb2suY2FsbChjb250ZXh0KVxuICAgICAgICByZXR1cm4gZXhpc3RpbmcoaCwgY29udGV4dClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGVzTW9kdWxlOiBlc01vZHVsZSxcbiAgICBleHBvcnRzOiBzY3JpcHRFeHBvcnRzLFxuICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiPHRlbXBsYXRlPlxuXHQ8ZGl2IGNsYXNzPVwidnVlLWdvb2dsZS1tYXBcIiB2LW9ic2VydmUtdmlzaWJpbGl0eT1cInZpc2liaWxpdHlDaGFuZ2VkXCI+XG5cdFx0PGRpdiByZWY9XCJtYXBcIiBjbGFzcz1cIm1hcC12aWV3XCI+PC9kaXY+XG5cdFx0PGRpdiBjbGFzcz1cImhpZGRlbi1jb250ZW50XCI+XG5cdFx0XHQ8c2xvdD48L3Nsb3Q+XG5cdFx0PC9kaXY+XG5cdFx0PHNsb3QgbmFtZT1cInZpc2libGVcIj48L3Nsb3Q+XG5cdFx0PHJlc2l6ZS1vYnNlcnZlciBAbm90aWZ5PVwicmVzaXplXCIgLz5cblx0PC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHsgUmVzaXplT2JzZXJ2ZXIgfSBmcm9tICd2dWUtcmVzaXplJ1xuaW1wb3J0IHsgT2JzZXJ2ZVZpc2liaWxpdHkgfSBmcm9tICd2dWUtb2JzZXJ2ZS12aXNpYmlsaXR5J1xuaW1wb3J0IFJlYWR5IGZyb20gJy4uL21peGlucy9SZWFkeSdcbmltcG9ydCBCb3VuZFByb3BzIGZyb20gJy4uL21peGlucy9Cb3VuZFByb3BzJ1xuaW1wb3J0IEV2ZW50cyBmcm9tICcuLi9taXhpbnMvRXZlbnRzJ1xuaW1wb3J0IHsgYXV0b0NhbGwgfSBmcm9tICcuLi91dGlscy9taXNjJ1xuaW1wb3J0IHsgcmVkaXJlY3RNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvcmVkaXJlY3QtbWV0aG9kcydcblxuY29uc3QgYm91bmRQcm9wcyA9IFtcblx0e1xuXHRcdG5hbWU6ICdjZW50ZXInLFxuXHRcdHdhdGNoZXI6IHZhbHVlID0+ICh7XG5cdFx0XHRsYXQ6IGF1dG9DYWxsKHZhbHVlLmxhdCksXG5cdFx0XHRsbmc6IGF1dG9DYWxsKHZhbHVlLmxuZyksXG5cdFx0fSksXG5cdFx0aWRlbnRpdHk6IChhLCBiKSA9PiB7XG5cdFx0XHRpZiAoYSAmJiBiKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgYS5lcXVhbHMgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRhID0gbmV3IHdpbmRvdy5nb29nbGUubWFwcy5MYXRMbmcoYSlcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodHlwZW9mIGIuZXF1YWxzICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0YiA9IG5ldyB3aW5kb3cuZ29vZ2xlLm1hcHMuTGF0TG5nKGIpXG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGEuZXF1YWxzKGIpXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRyZXRyaWV2ZXI6ICh2YWx1ZSkgPT4gKHtcblx0XHRcdGxhdDogdmFsdWUubGF0KCksXG5cdFx0XHRsbmc6IHZhbHVlLmxuZygpLFxuXHRcdH0pLFxuXHR9LFxuXHQnaGVhZGluZycsXG5cdCdtYXBUeXBlSWQnLFxuXHQndGlsdCcsXG5cdCd6b29tJyxcbl1cblxuY29uc3QgcmVkaXJlY3RlZE1ldGhvZHMgPSBbXG5cdCdwYW5CeScsXG5cdCdwYW5UbycsXG5cdCdwYW5Ub0JvdW5kcycsXG5cdCdmaXRCb3VuZHMnLFxuXVxuXG5jb25zdCByZWRpcmVjdGVkRXZlbnRzID0gW1xuXHQnY2xpY2snLFxuXHQnZGJsY2xpY2snLFxuXHQnZHJhZycsXG5cdCdkcmFnZW5kJyxcblx0J2RyYWdzdGFydCcsXG5cdCdpZGxlJyxcblx0J21vdXNlbW92ZScsXG5cdCdtb3VzZW91dCcsXG5cdCdtb3VzZW92ZXInLFxuXHQncmVzaXplJyxcblx0J3JpZ2h0Y2xpY2snLFxuXHQndGlsZXNsb2FkZWQnLFxuXVxuXG5leHBvcnQgZGVmYXVsdCB7XG5cdG5hbWU6ICdHb29nbGVNYXBzTWFwJyxcblxuXHRtaXhpbnM6IFtcblx0XHRSZWFkeSxcblx0XHRCb3VuZFByb3BzLFxuXHRcdEV2ZW50cyxcblx0XSxcblxuXHRjb21wb25lbnRzOiB7XG5cdFx0UmVzaXplT2JzZXJ2ZXIsXG5cdH0sXG5cblx0ZGlyZWN0aXZlczoge1xuXHRcdE9ic2VydmVWaXNpYmlsaXR5LFxuXHR9LFxuXG5cdHByb3BzOiB7XG5cdFx0Y2VudGVyOiB7XG5cdFx0XHRyZXF1aXJlZDogdHJ1ZSxcblx0XHRcdHR5cGU6IE9iamVjdCxcblx0XHR9LFxuXHRcdGhlYWRpbmc6IHtcblx0XHRcdHR5cGU6IE51bWJlcixcblx0XHR9LFxuXHRcdG1hcFR5cGVJZDoge1xuXHRcdFx0dHlwZTogU3RyaW5nLFxuXHRcdH0sXG5cdFx0b3B0aW9uczoge1xuXHRcdFx0dHlwZTogT2JqZWN0LFxuXHRcdFx0ZGVmYXVsdDogKCkgPT4gKHt9KSxcblx0XHR9LFxuXHRcdHRpbHQ6IHtcblx0XHRcdHR5cGU6IE51bWJlcixcblx0XHR9LFxuXHRcdHpvb206IHtcblx0XHRcdHJlcXVpcmVkOiBmYWxzZSxcblx0XHRcdHR5cGU6IE51bWJlcixcblx0XHR9LFxuXHR9LFxuXG5cdG1ldGhvZHM6IHtcblx0XHQuLi5yZWRpcmVjdE1ldGhvZHMoe1xuXHRcdFx0dGFyZ2V0ICgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuJG1hcFxuXHRcdFx0fSxcblx0XHRcdG5hbWVzOiByZWRpcmVjdGVkTWV0aG9kcyxcblx0XHR9KSxcblxuXHRcdHJlc2l6ZSAocHJlc2VydmVDZW50ZXIgPSB0cnVlKSB7XG5cdFx0XHRpZiAodGhpcy4kbWFwKSB7XG5cdFx0XHRcdGxldCBjZW50ZXJcblx0XHRcdFx0cHJlc2VydmVDZW50ZXIgJiYgKGNlbnRlciA9IHRoaXMuJG1hcC5nZXRDZW50ZXIoKSlcblx0XHRcdFx0d2luZG93Lmdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIodGhpcy4kbWFwLCAncmVzaXplJylcblx0XHRcdFx0cHJlc2VydmVDZW50ZXIgJiYgdGhpcy4kbWFwLnNldENlbnRlcihjZW50ZXIpXG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHZpc2liaWxpdHlDaGFuZ2VkIChpc1Zpc2libGUpIHtcblx0XHRcdGlmIChpc1Zpc2libGUpIHtcblx0XHRcdFx0dGhpcy4kbmV4dFRpY2sodGhpcy5yZXNpemUpXG5cdFx0XHR9XG5cdFx0fSxcblx0fSxcblxuXHRnb29nbGVNYXBzUmVhZHkgKCkge1xuXHRcdGNvbnN0IGVsZW1lbnQgPSB0aGlzLiRyZWZzLm1hcFxuXG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdGNlbnRlcjogdGhpcy5jZW50ZXIsXG5cdFx0XHRoZWFkaW5nOiB0aGlzLmhlYWRpbmcsXG5cdFx0XHRtYXBUeXBlSWQ6IHRoaXMubWFwVHlwZUlkLFxuXHRcdFx0dGlsdDogdGhpcy50aWx0LFxuXHRcdFx0em9vbTogdGhpcy56b29tLFxuXHRcdFx0Li4udGhpcy5vcHRpb25zLFxuXHRcdH1cblxuXHRcdHRoaXMuJG1hcCA9IG5ldyB3aW5kb3cuZ29vZ2xlLm1hcHMuTWFwKGVsZW1lbnQsIG9wdGlvbnMpXG5cblx0XHR0aGlzLmJpbmRQcm9wcyh0aGlzLiRtYXAsIGJvdW5kUHJvcHMpXG5cblx0XHR0aGlzLmxpc3Rlbih0aGlzLiRtYXAsICdib3VuZHNfY2hhbmdlZCcsICgpID0+IHtcblx0XHRcdHRoaXMuJGVtaXQoJ3VwZGF0ZTpib3VuZHMnLCB0aGlzLiRtYXAuZ2V0Qm91bmRzKCkpXG5cdFx0fSlcblxuXHRcdHRoaXMucmVkaXJlY3RFdmVudHModGhpcy4kbWFwLCByZWRpcmVjdGVkRXZlbnRzKVxuXHR9LFxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic3R5bHVzXCIgc2NvcGVkPlxuLnZ1ZS1nb29nbGUtbWFwIHtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4ubWFwLXZpZXcge1xuXHRsZWZ0OiAwO1xuXHRyaWdodDogMDtcblx0dG9wOiAwO1xuXHRib3R0b206IDA7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcbn1cblxuLmhpZGRlbi1jb250ZW50IHtcblx0ZGlzcGxheTogbm9uZTtcbn1cbjwvc3R5bGU+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvTWFwLnZ1ZT8xZmVmMWM1MCIsImltcG9ydCAnLi9kaXN0L3Z1ZS1yZXNpemUuY3NzJ1xuZXhwb3J0IHsgZGVmYXVsdCB9IGZyb20gJy4vZGlzdC92dWUtcmVzaXplJ1xuZXhwb3J0ICogZnJvbSAnLi9kaXN0L3Z1ZS1yZXNpemUnXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtcmVzaXplL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIhZnVuY3Rpb24ocm9vdCxmYWN0b3J5KXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1mYWN0b3J5KCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXSxmYWN0b3J5KTpcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzLlZ1ZU9ic2VydmVWaXNpYmlsaXR5PWZhY3RvcnkoKTpyb290LlZ1ZU9ic2VydmVWaXNpYmlsaXR5PWZhY3RvcnkoKX0odGhpcyxmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbihtb2R1bGVzKXtmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKXtpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0czt2YXIgbW9kdWxlPWluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdPXtpOm1vZHVsZUlkLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsbW9kdWxlLG1vZHVsZS5leHBvcnRzLF9fd2VicGFja19yZXF1aXJlX18pLG1vZHVsZS5sPSEwLG1vZHVsZS5leHBvcnRzfXZhciBpbnN0YWxsZWRNb2R1bGVzPXt9O3JldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLm09bW9kdWxlcyxfX3dlYnBhY2tfcmVxdWlyZV9fLmM9aW5zdGFsbGVkTW9kdWxlcyxfX3dlYnBhY2tfcmVxdWlyZV9fLmQ9ZnVuY3Rpb24oZXhwb3J0cyxuYW1lLGdldHRlcil7X193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsbmFtZSl8fE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLG5hbWUse2NvbmZpZ3VyYWJsZTohMSxlbnVtZXJhYmxlOiEwLGdldDpnZXR0ZXJ9KX0sX193ZWJwYWNrX3JlcXVpcmVfXy5uPWZ1bmN0aW9uKG1vZHVsZSl7dmFyIGdldHRlcj1tb2R1bGUmJm1vZHVsZS5fX2VzTW9kdWxlP2Z1bmN0aW9uKCl7cmV0dXJuIG1vZHVsZS5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiBtb2R1bGV9O3JldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLFwiYVwiLGdldHRlciksZ2V0dGVyfSxfX3dlYnBhY2tfcmVxdWlyZV9fLm89ZnVuY3Rpb24ob2JqZWN0LHByb3BlcnR5KXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCxwcm9wZXJ0eSl9LF9fd2VicGFja19yZXF1aXJlX18ucD1cIlwiLF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zPTApfShbZnVuY3Rpb24obW9kdWxlLF9fd2VicGFja19leHBvcnRzX18sX193ZWJwYWNrX3JlcXVpcmVfXyl7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KF9fd2VicGFja19leHBvcnRzX18sXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksZnVuY3Rpb24oZ2xvYmFsKXtmdW5jdGlvbiBpbnN0YWxsKFZ1ZSl7VnVlLmRpcmVjdGl2ZShcIm9ic2VydmUtdmlzaWJpbGl0eVwiLF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fZGlyZWN0aXZlc19vYnNlcnZlX3Zpc2liaWxpdHlfXy5hKX1fX3dlYnBhY2tfZXhwb3J0c19fLmluc3RhbGw9aW5zdGFsbDt2YXIgX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19kaXJlY3RpdmVzX29ic2VydmVfdmlzaWJpbGl0eV9fPV9fd2VicGFja19yZXF1aXJlX18oMik7X193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sXCJPYnNlcnZlVmlzaWJpbGl0eVwiLGZ1bmN0aW9uKCl7cmV0dXJuIF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fZGlyZWN0aXZlc19vYnNlcnZlX3Zpc2liaWxpdHlfXy5hfSk7dmFyIHBsdWdpbj17dmVyc2lvbjpcIjAuMi4yXCIsaW5zdGFsbDppbnN0YWxsfTtfX3dlYnBhY2tfZXhwb3J0c19fLmRlZmF1bHQ9cGx1Z2luO3ZhciBHbG9iYWxWdWU9bnVsbDtcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P0dsb2JhbFZ1ZT13aW5kb3cuVnVlOnZvaWQgMCE9PWdsb2JhbCYmKEdsb2JhbFZ1ZT1nbG9iYWwuVnVlKSxHbG9iYWxWdWUmJkdsb2JhbFZ1ZS51c2UocGx1Z2luKX0uY2FsbChfX3dlYnBhY2tfZXhwb3J0c19fLF9fd2VicGFja19yZXF1aXJlX18oMSkpfSxmdW5jdGlvbihtb2R1bGUsZXhwb3J0cyl7dmFyIGcsX3R5cGVvZj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24ob2JqKXtyZXR1cm4gdHlwZW9mIG9ian06ZnVuY3Rpb24ob2JqKXtyZXR1cm4gb2JqJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJm9iai5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmb2JqIT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiBvYmp9O2c9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc30oKTt0cnl7Zz1nfHxGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCl8fCgwLGV2YWwpKFwidGhpc1wiKX1jYXRjaChlKXtcIm9iamVjdFwiPT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiB3aW5kb3c/XCJ1bmRlZmluZWRcIjpfdHlwZW9mKHdpbmRvdykpJiYoZz13aW5kb3cpfW1vZHVsZS5leHBvcnRzPWd9LGZ1bmN0aW9uKG1vZHVsZSxfX3dlYnBhY2tfZXhwb3J0c19fLF9fd2VicGFja19yZXF1aXJlX18pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHRocm93VmFsdWVFcnJvcih2YWx1ZSl7aWYobnVsbCE9PXZhbHVlJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB2YWx1ZSl0aHJvdyBuZXcgRXJyb3IoXCJvYnNlcnZlLXZpc2liaWxpdHkgZGlyZWN0aXZlIGV4cGVjdHMgYSBmdW5jdGlvbiBhcyB0aGUgdmFsdWVcIil9X193ZWJwYWNrX2V4cG9ydHNfXy5hPXtiaW5kOmZ1bmN0aW9uKGVsLF9yZWYsdm5vZGUpe3ZhciB2YWx1ZT1fcmVmLnZhbHVlO2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBJbnRlcnNlY3Rpb25PYnNlcnZlciljb25zb2xlLndhcm4oXCJbdnVlLW9ic2VydmUtdmlzaWJpbGl0eV0gSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgQVBJIGlzIG5vdCBhdmFpbGFibGUgaW4geW91ciBicm93c2VyLiBQbGVhc2UgaW5zdGFsbCB0aGlzIHBvbHlmaWxsOiBodHRwczovL2dpdGh1Yi5jb20vV0lDRy9JbnRlcnNlY3Rpb25PYnNlcnZlci90cmVlL2doLXBhZ2VzL3BvbHlmaWxsXCIpO2Vsc2V7dGhyb3dWYWx1ZUVycm9yKHZhbHVlKSxlbC5fdnVlX3Zpc2liaWxpdHlDYWxsYmFjaz12YWx1ZTt2YXIgb2JzZXJ2ZXI9ZWwuX3Z1ZV9pbnRlcnNlY3Rpb25PYnNlcnZlcj1uZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24oZW50cmllcyl7dmFyIGVudHJ5PWVudHJpZXNbMF07ZWwuX3Z1ZV92aXNpYmlsaXR5Q2FsbGJhY2smJmVsLl92dWVfdmlzaWJpbGl0eUNhbGxiYWNrLmNhbGwobnVsbCxlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbz4wLGVudHJ5KX0pO3Zub2RlLmNvbnRleHQuJG5leHRUaWNrKGZ1bmN0aW9uKCl7b2JzZXJ2ZXIub2JzZXJ2ZShlbCl9KX19LHVwZGF0ZTpmdW5jdGlvbihlbCxfcmVmMil7dmFyIHZhbHVlPV9yZWYyLnZhbHVlO3Rocm93VmFsdWVFcnJvcih2YWx1ZSksZWwuX3Z1ZV92aXNpYmlsaXR5Q2FsbGJhY2s9dmFsdWV9LHVuYmluZDpmdW5jdGlvbihlbCl7ZWwuX3Z1ZV9pbnRlcnNlY3Rpb25PYnNlcnZlciYmKGVsLl92dWVfaW50ZXJzZWN0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpLGRlbGV0ZSBlbC5fdnVlX2ludGVyc2VjdGlvbk9ic2VydmVyLGRlbGV0ZSBlbC5fdnVlX3Zpc2liaWxpdHlDYWxsYmFjayl9fX1dKX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1vYnNlcnZlLXZpc2liaWxpdHkvZGlzdC92dWUtb2JzZXJ2ZS12aXNpYmlsaXR5LmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgbG9hZGVyIGZyb20gJy4uL2xpYi1sb2FkZXInXG5pbXBvcnQgeyBoYW5kbGVFcnJvciB9IGZyb20gJy4uL3V0aWxzL2Vycm9yJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGFzeW5jIG1vdW50ZWQgKCkge1xuXHRcdGF3YWl0IGxvYWRlci5lbnN1cmVSZWFkeSgpXG5cdFx0Y29uc3QgaGFuZGxlcnMgPSB0aGlzLiRvcHRpb25zLmdvb2dsZU1hcHNSZWFkeVxuXHRcdGlmIChoYW5kbGVycykge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBoYW5kbGVycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGhhbmRsZXJzW2ldLmNhbGwodGhpcylcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdGhhbmRsZUVycm9yKGUsIHRoaXMsIGBnb29nbGVNYXBzUmVhZHkgaG9va2ApXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWl4aW5zL1JlYWR5LmpzIiwiaW1wb3J0IHsgYmluZFByb3AgfSBmcm9tICcuLi91dGlscy9iaW5kLXByb3AnXG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0bWV0aG9kczoge1xuXHRcdGJpbmRQcm9wcyAodGFyZ2V0LCBwcm9wcykge1xuXHRcdFx0dGhpcy51bmJpbmRQcm9wcygpXG5cdFx0XHR0aGlzLl9ib3VuZHNQcm9wcyA9IFtdXG5cdFx0XHRmb3IgKGNvbnN0IHByb3Agb2YgcHJvcHMpIHtcblx0XHRcdFx0bGV0IG9wdGlvbnMgPSB7XG5cdFx0XHRcdFx0dm06IHRoaXMsXG5cdFx0XHRcdFx0dGFyZ2V0OiB0YXJnZXQsXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHR5cGVvZiBwcm9wID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdG9wdGlvbnMubmFtZSA9IHByb3Bcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRPYmplY3QuYXNzaWduKG9wdGlvbnMsIHByb3ApXG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5fYm91bmRzUHJvcHMucHVzaChiaW5kUHJvcChvcHRpb25zKSlcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0dW5iaW5kUHJvcHMgKCkge1xuXHRcdFx0aWYgKHRoaXMuX2JvdW5kc1Byb3BzKSB7XG5cdFx0XHRcdHRoaXMuX2JvdW5kc1Byb3BzLmZvckVhY2godW5iaW5kID0+IHVuYmluZCgpKVxuXHRcdFx0fVxuXHRcdH0sXG5cdH0sXG5cdGJlZm9yZURlc3Ryb3kgKCkge1xuXHRcdHRoaXMudW5iaW5kUHJvcHMoKVxuXHR9LFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21peGlucy9Cb3VuZFByb3BzLmpzIiwiaW1wb3J0IHsgY2FwaXRhbGl6ZSB9IGZyb20gJy4vbWlzYydcblxuZXhwb3J0IGZ1bmN0aW9uIGJpbmRQcm9wICh7XG5cdHZtLFxuXHRuYW1lLFxuXHR0YXJnZXRQcm9wTmFtZSxcblx0dGFyZ2V0LFxuXHR3YXRjaGVyLFxuXHRpZGVudGl0eSxcblx0YXBwbGllcixcblx0cmV0cmlldmVyLFxuXHRyZWFkT25seSxcblx0ZXZlbnQsXG5cdGNoYW5nZUV2ZW50LFxufSkge1xuXHRpZiAoIXRhcmdldFByb3BOYW1lKSB7XG5cdFx0dGFyZ2V0UHJvcE5hbWUgPSBuYW1lXG5cdH1cblx0aWYgKCFjaGFuZ2VFdmVudCkge1xuXHRcdGNoYW5nZUV2ZW50ID0gYCR7dGFyZ2V0UHJvcE5hbWUudG9Mb3dlckNhc2UoKX1fY2hhbmdlZGBcblx0fVxuXG5cdGxldCBzZXRWYWx1ZVxuXHRjb25zdCBjYXBpdGFsaXplZE5hbWUgPSBjYXBpdGFsaXplKG5hbWUpXG5cdGNvbnN0IGdldHRlciA9ICgpID0+IHRhcmdldCAmJiB0YXJnZXRbYGdldCR7Y2FwaXRhbGl6ZWROYW1lfWBdKClcblx0Y29uc3Qgc2V0dGVyID0gdmFsdWUgPT4ge1xuXHRcdHNldFZhbHVlID0gdmFsdWVcblx0XHR0YXJnZXQgJiYgdGFyZ2V0W2BzZXQke2NhcGl0YWxpemVkTmFtZX1gXSh2YWx1ZSlcblx0fVxuXG5cdGlmICghd2F0Y2hlcikge1xuXHRcdHdhdGNoZXIgPSB2YWx1ZSA9PiB2YWx1ZVxuXHR9XG5cdGlmICghaWRlbnRpdHkpIHtcblx0XHRpZGVudGl0eSA9IChhLCBiKSA9PiBhID09PSBiXG5cdH1cblx0aWYgKCFhcHBsaWVyKSB7XG5cdFx0YXBwbGllciA9ICh2YWx1ZSwgb2xkVmFsdWUsIHNldCkgPT4ge1xuXHRcdFx0aWYgKCFpZGVudGl0eSh2YWx1ZSwgb2xkVmFsdWUpKSB7XG5cdFx0XHRcdHNldCh2YWx1ZSlcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0aWYgKCFyZXRyaWV2ZXIpIHtcblx0XHRyZXRyaWV2ZXIgPSB2YWx1ZSA9PiB2YWx1ZVxuXHR9XG5cdGlmICghZXZlbnQpIHtcblx0XHRldmVudCA9IGB1cGRhdGU6JHtuYW1lfWBcblx0fVxuXG5cdHZtLiR3YXRjaChcblx0XHQoKSA9PiB3YXRjaGVyKHZtW25hbWVdKSxcblx0XHQodmFsdWUsIG9sZFZhbHVlKSA9PiBhcHBsaWVyKHZhbHVlLCBvbGRWYWx1ZSwgc2V0dGVyKVxuXHQpXG5cblx0Y29uc3QgbGlzdGVuZXIgPSB0YXJnZXQuYWRkTGlzdGVuZXIoY2hhbmdlRXZlbnQsICgpID0+IHtcblx0XHRjb25zdCB2YWx1ZSA9IHJldHJpZXZlcihnZXR0ZXIoKSlcblx0XHRpZiAoIWlkZW50aXR5KHZhbHVlLCBzZXRWYWx1ZSkpIHtcblx0XHRcdHZtLiRlbWl0KGV2ZW50LCB2YWx1ZSlcblx0XHRcdHNldFZhbHVlID0gdmFsdWVcblx0XHR9XG5cdH0pXG5cblx0cmV0dXJuICgpID0+IHtcblx0XHRsaXN0ZW5lci5yZW1vdmUoKVxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvYmluZC1wcm9wLmpzIiwiZXhwb3J0IGRlZmF1bHQge1xuXHRtZXRob2RzOiB7XG5cdFx0bGlzdGVuICh0YXJnZXQsIGV2ZW50LCBoYW5kbGVyKSB7XG5cdFx0XHR0aGlzLl9nb29nbGVMaXN0ZW5lcnMucHVzaCh0YXJnZXQuYWRkTGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIpKVxuXHRcdH0sXG5cblx0XHRyZWRpcmVjdEV2ZW50cyAodGFyZ2V0LCBldmVudHMpIHtcblx0XHRcdGZvciAoY29uc3QgZSBvZiBldmVudHMpIHtcblx0XHRcdFx0dGhpcy5saXN0ZW4odGFyZ2V0LCBlLCAoLi4uYXJncykgPT4ge1xuXHRcdFx0XHRcdHRoaXMuJGVtaXQoZSwgLi4uYXJncylcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHR9LFxuXHR9LFxuXG5cdGJlZm9yZUNyZWF0ZSAoKSB7XG5cdFx0dGhpcy5fZ29vZ2xlTGlzdGVuZXJzID0gW11cblx0fSxcblxuXHRiZWZvcmVEZXN0cm95ICgpIHtcblx0XHRmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIHRoaXMuX2dvb2dsZUxpc3RlbmVycykge1xuXHRcdFx0bGlzdGVuZXIucmVtb3ZlKClcblx0XHR9XG5cdH0sXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWl4aW5zL0V2ZW50cy5qcyIsImV4cG9ydCBmdW5jdGlvbiByZWRpcmVjdE1ldGhvZHMgKHsgdGFyZ2V0LCBuYW1lcyB9KSB7XG5cdHJldHVybiBuYW1lcy5yZWR1Y2UoKG9iaiwgbmFtZSkgPT4ge1xuXHRcdG9ialtuYW1lXSA9ICguLi5hcmdzKSA9PiB7XG5cdFx0XHRjb25zdCB0ID0gdGFyZ2V0KClcblx0XHRcdGlmICh0KSB7XG5cdFx0XHRcdHJldHVybiB0W25hbWVdLmFwcGx5KHQsIGFyZ3MpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBvYmpcblx0fSwge30pXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvcmVkaXJlY3QtbWV0aG9kcy5qcyIsInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7XG4gIHJldHVybiBfYygnZGl2Jywge1xuICAgIGRpcmVjdGl2ZXM6IFt7XG4gICAgICBuYW1lOiBcIm9ic2VydmUtdmlzaWJpbGl0eVwiLFxuICAgICAgcmF3TmFtZTogXCJ2LW9ic2VydmUtdmlzaWJpbGl0eVwiLFxuICAgICAgdmFsdWU6IChfdm0udmlzaWJpbGl0eUNoYW5nZWQpLFxuICAgICAgZXhwcmVzc2lvbjogXCJ2aXNpYmlsaXR5Q2hhbmdlZFwiXG4gICAgfV0sXG4gICAgc3RhdGljQ2xhc3M6IFwidnVlLWdvb2dsZS1tYXBcIlxuICB9LCBbX2MoJ2RpdicsIHtcbiAgICByZWY6IFwibWFwXCIsXG4gICAgc3RhdGljQ2xhc3M6IFwibWFwLXZpZXdcIlxuICB9KSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJoaWRkZW4tY29udGVudFwiXG4gIH0sIFtfdm0uX3QoXCJkZWZhdWx0XCIpXSwgMiksIF92bS5fdihcIiBcIiksIF92bS5fdChcInZpc2libGVcIiksIF92bS5fdihcIiBcIiksIF9jKCdyZXNpemUtb2JzZXJ2ZXInLCB7XG4gICAgb246IHtcbiAgICAgIFwibm90aWZ5XCI6IF92bS5yZXNpemVcbiAgICB9XG4gIH0pXSwgMilcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG52YXIgZXNFeHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuZXhwb3J0IGRlZmF1bHQgZXNFeHBvcnRzXG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi0yOTJlZTQ3MFwiLCBlc0V4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTI5MmVlNDcwXCIsXCJoYXNTY29wZWRcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9zcmMvY29tcG9uZW50cy9NYXAudnVlXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJsZXQgY29uZmlnXG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0RXJyb3JIYW5kbGluZyAoVnVlKSB7XG5cdGNvbmZpZyA9IFZ1ZS5jb25maWdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUVycm9yIChlLCB2bSwgaW5mbykge1xuXHRpZiAoY29uZmlnLmVycm9ySGFuZGxlcikge1xuXHRcdGNvbmZpZy5lcnJvckhhbmRsZXIoZSwgdm0sIGluZm8pXG5cdH0gZWxzZSB7XG5cdFx0aWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aHJvdyBlXG5cdFx0fVxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvZXJyb3IuanMiLCJleHBvcnQgZnVuY3Rpb24gb3B0aW9uTWVyZ2VTdHJhdGVnaWVzIChWdWUpIHtcblx0Y29uc3Qgc3RyYXRzID0gVnVlLmNvbmZpZy5vcHRpb25NZXJnZVN0cmF0ZWdpZXNcblxuXHRzdHJhdHMuZ29vZ2xlTWFwc1JlYWR5ID0gc3RyYXRzLmNyZWF0ZWRcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9vcHRpb25zLmpzIiwiaW1wb3J0IE1hcEVsZW1lbnQgZnJvbSAnLi4vbWl4aW5zL01hcEVsZW1lbnQnXG5cbmNvbnN0IGJvdW5kUHJvcHMgPSBbXG5cdCdhbmltYXRpb24nLFxuXHQnYXR0cmlidXRpb24nLFxuXHQnY2xpY2thYmxlJyxcblx0J2N1cnNvcicsXG5cdCdkcmFnZ2FibGUnLFxuXHQnaWNvbicsXG5cdCdsYWJlbCcsXG5cdCdvcGFjaXR5Jyxcblx0J3BsYWNlJyxcblx0J3Bvc2l0aW9uJyxcblx0J3NoYXBlJyxcblx0J3RpdGxlJyxcblx0J3Zpc2libGUnLFxuXHQnekluZGV4Jyxcbl1cblxuY29uc3QgcmVkaXJlY3RlZEV2ZW50cyA9IFtcblx0J2NsaWNrJyxcblx0J3JpZ2h0Y2xpY2snLFxuXHQnZGJsY2xpY2snLFxuXHQnZHJhZycsXG5cdCdkcmFnc3RhcnQnLFxuXHQnZHJhZ2VuZCcsXG5cdCdtb3VzZXVwJyxcblx0J21vdXNlZG93bicsXG5cdCdtb3VzZW92ZXInLFxuXHQnbW91c2VvdXQnLFxuXVxuXG5leHBvcnQgZGVmYXVsdCB7XG5cdG5hbWU6ICdHb29nbGVNYXBzTWFya2VyJyxcblxuXHRtaXhpbnM6IFtcblx0XHRNYXBFbGVtZW50LFxuXHRdLFxuXG5cdHByb3BzOiB7XG5cdFx0YW5pbWF0aW9uOiB7XG5cdFx0XHR0eXBlOiBOdW1iZXIsXG5cdFx0fSxcblx0XHRhdHRyaWJ1dGlvbjoge1xuXHRcdFx0dHlwZTogT2JqZWN0LFxuXHRcdH0sXG5cdFx0Y2xpY2thYmxlOiB7XG5cdFx0XHR0eXBlOiBCb29sZWFuLFxuXHRcdFx0ZGVmYXVsdDogdHJ1ZSxcblx0XHR9LFxuXHRcdGN1cnNvcjoge1xuXHRcdFx0dHlwZTogU3RyaW5nLFxuXHRcdH0sXG5cdFx0ZHJhZ2dhYmxlOiB7XG5cdFx0XHR0eXBlOiBCb29sZWFuLFxuXHRcdFx0ZGVmYXVsdDogZmFsc2UsXG5cdFx0fSxcblx0XHRpY29uOiB7XG5cdFx0fSxcblx0XHRsYWJlbDoge1xuXHRcdH0sXG5cdFx0b3BhY2l0eToge1xuXHRcdFx0dHlwZTogTnVtYmVyLFxuXHRcdFx0ZGVmYXVsdDogMSxcblx0XHR9LFxuXHRcdHBsYWNlOiB7XG5cdFx0XHR0eXBlOiBPYmplY3QsXG5cdFx0fSxcblx0XHRwb3NpdGlvbjoge1xuXHRcdFx0dHlwZTogT2JqZWN0LFxuXHRcdH0sXG5cdFx0c2hhcGU6IHtcblx0XHRcdHR5cGU6IE9iamVjdCxcblx0XHR9LFxuXHRcdHRpdGxlOiB7XG5cdFx0XHR0eXBlOiBTdHJpbmcsXG5cdFx0fSxcblx0XHR2aXNpYmxlOiB7XG5cdFx0XHRkZWZhdWx0OiB0cnVlLFxuXHRcdH0sXG5cdFx0ekluZGV4OiB7XG5cdFx0XHR0eXBlOiBOdW1iZXIsXG5cdFx0fSxcblx0fSxcblxuXHRyZW5kZXIgKGgpIHtcblx0XHRpZiAoIXRoaXMuJHNsb3RzLmRlZmF1bHQgfHwgdGhpcy4kc2xvdHMuZGVmYXVsdC5sZW5ndGggPT09IDApIHtcblx0XHRcdHJldHVybiAnJ1xuXHRcdH0gZWxzZSBpZiAodGhpcy4kc2xvdHMuZGVmYXVsdC5sZW5ndGggPT09IDEpIHtcblx0XHRcdC8vIFNvIHRoYXQgaW5mb3dpbmRvd3MgY2FuIGhhdmUgYSBtYXJrZXIgcGFyZW50XG5cdFx0XHRyZXR1cm4gdGhpcy4kc2xvdHMuZGVmYXVsdFswXVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gaChcblx0XHRcdFx0J2RpdicsXG5cdFx0XHRcdHRoaXMuJHNsb3RzLmRlZmF1bHRcblx0XHRcdClcblx0XHR9XG5cdH0sXG5cblx0Z29vZ2xlTWFwc1JlYWR5ICgpIHtcblx0XHRjb25zdCBvcHRpb25zID0gdGhpcy4kcHJvcHNcblx0XHRvcHRpb25zLm1hcCA9IHRoaXMuJG1hcFxuXHRcdHRoaXMuJG1hcmtlciA9IG5ldyB3aW5kb3cuZ29vZ2xlLm1hcHMuTWFya2VyKG9wdGlvbnMpXG5cdFx0dGhpcy5iaW5kUHJvcHModGhpcy4kbWFya2VyLCBib3VuZFByb3BzKVxuXHRcdHRoaXMucmVkaXJlY3RFdmVudHModGhpcy4kbWFya2VyLCByZWRpcmVjdGVkRXZlbnRzKVxuXHR9LFxuXG5cdGJlZm9yZURlc3Ryb3kgKCkge1xuXHRcdGlmICh0aGlzLiRtYXJrZXIpIHtcblx0XHRcdHRoaXMuJG1hcmtlci5zZXRNYXAobnVsbClcblx0XHR9XG5cdH0sXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9NYXJrZXIuanMiLCJpbXBvcnQgQm91bmRQcm9wcyBmcm9tICcuL0JvdW5kUHJvcHMnXG5pbXBvcnQgRXZlbnRzIGZyb20gJy4vRXZlbnRzJ1xuaW1wb3J0IFJlYWR5IGZyb20gJy4vUmVhZHknXG5pbXBvcnQgRmluZEFuY2VzdG9yIGZyb20gJy4vRmluZEFuY2VzdG9yJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdG1peGluczogW1xuXHRcdEJvdW5kUHJvcHMsXG5cdFx0RXZlbnRzLFxuXHRcdEZpbmRBbmNlc3Rvcixcblx0XHRSZWFkeSxcblx0XSxcblxuXHRjcmVhdGVkICgpIHtcblx0XHRjb25zdCBtYXBBbmNlc3RvciA9IHRoaXMuJGZpbmRBbmNlc3Rvcihcblx0XHRcdGEgPT4gYS4kb3B0aW9ucy5uYW1lID09PSAnR29vZ2xlTWFwc01hcCdcblx0XHQpXG5cblx0XHRpZiAoIW1hcEFuY2VzdG9yKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSBjb21wb25lbnQgbXVzdCBiZSB1c2VkIHdpdGhpbiBhIDxnb29nbGUtbWFwPiBjb21wb25lbnQuYClcblx0XHR9XG5cblx0XHR0aGlzLiRtYXBBbmNlc3RvciA9IG1hcEFuY2VzdG9yXG5cdH0sXG5cblx0Z29vZ2xlTWFwc1JlYWR5ICgpIHtcblx0XHR0aGlzLiRtYXAgPSB0aGlzLiRtYXBBbmNlc3Rvci4kbWFwXG5cdH0sXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWl4aW5zL01hcEVsZW1lbnQuanMiLCJleHBvcnQgZGVmYXVsdCB7XG5cdG1ldGhvZHM6IHtcblx0XHQkZmluZEFuY2VzdG9yIChjb25kaXRpb24pIHtcblx0XHRcdGxldCBzZWFyY2ggPSB0aGlzLiRwYXJlbnRcblxuXHRcdFx0d2hpbGUgKHNlYXJjaCkge1xuXHRcdFx0XHRpZiAoY29uZGl0aW9uKHNlYXJjaCkpIHtcblx0XHRcdFx0XHRyZXR1cm4gc2VhcmNoXG5cdFx0XHRcdH1cblx0XHRcdFx0c2VhcmNoID0gc2VhcmNoLiRwYXJlbnRcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG51bGxcblx0XHR9LFxuXHR9LFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21peGlucy9GaW5kQW5jZXN0b3IuanMiXSwic291cmNlUm9vdCI6IiJ9