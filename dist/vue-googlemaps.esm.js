import 'vue-resize/dist/vue-resize.css';
import { ResizeObserver } from 'vue-resize/dist/vue-resize';

var babelHelpers = {};
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();



var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};





































babelHelpers;

var Loader = function () {
	function Loader() {
		classCallCheck(this, Loader);
		this.loaded = false;
		this.readyPromises = [];
	}

	createClass(Loader, [{
		key: 'load',


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
		value: function load(_ref) {
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
				console.log('script added');
			} else {
				console.warn('The Google Maps library is already loaded');
				this._setLoaded();
			}
		}
	}, {
		key: 'ensureReady',
		value: function ensureReady() {
			if (this.loaded) {
				return Promise.resolve();
			} else {
				var promise = new Promise();
				this.readyPromises.push(promise);
				return promise;
			}
		}
	}, {
		key: '_setLoaded',
		value: function _setLoaded() {
			console.log('google maps loaded');
			this.loaded = true;
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.readyPromises[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var p = _step.value;

					p.resolve();
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
	}]);
	return Loader;
}();

var loader = new Loader();

var Ready = {
	mounted: function mounted() {
		var _this = this;

		return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return loader.ensureReady();

						case 2:
							_this.ready();

						case 3:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this);
		}))();
	},


	methods: {
		ready: function ready() {
			// Override this in the component
		}
	}
};

function autoCall(value) {
	return typeof value === 'function' ? value() : value;
}

function capitalize(text) {
	return text.charAt(0).toUpperCase() + text.slice(1);
}

function bindProp(_ref) {
	var vm = _ref.vm,
	    name = _ref.name,
	    targetPropName = _ref.targetPropName,
	    target = _ref.target,
	    watcher = _ref.watcher,
	    applier = _ref.applier,
	    retriever = _ref.retriever,
	    readOnly = _ref.readOnly,
	    event = _ref.event;

	var capitalizedName = capitalize(name);
	var getter = function getter() {
		return target && target['get' + capitalizedName]();
	};
	var setter = function setter(value) {
		return target && target['set' + capitalizedName](value);
	};
	var changeEvent = name + '_changed';

	if (!watcher) {
		watcher = function watcher(value) {
			return value;
		};
	}
	if (!applier) {
		applier = function applier(value, oldValue, set) {
			if (value !== oldValue) {
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

	function handleChanged() {
		vm.$emit(event, retriever(getter()));
	}

	target.addEventListener(changeEvent, handleChanged);

	return function () {
		target.removeEventListener(changeEvent, handleChanged);
	};
}

var BoundProps = {
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
					this._boundsProps.push(bindProp(options));
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
};

var Events = {
	methods: {
		listen: function listen(target, event, handler) {
			this._thirdPartyEvents.push({
				target: target,
				event: event,
				handler: handler
			});
			target.addEventListener(event, handler);
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
		this._thirdPartyEvents = [];
	},
	beforeDestroy: function beforeDestroy() {
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = this._thirdPartyEvents[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var e = _step2.value;

				e.target.removeEventListener(e.event, e.handler);
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
};

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

// import { ObserveVisibility } from 'vue-observe-visibility'
var boundProps = [{
	name: 'center',
	watcher: function watcher(value) {
		return {
			lat: autoCall(value.lat),
			lng: autoCall(value.lng)
		};
	},
	applier: function applier(value, oldValue, set$$1) {
		if (value.lat !== oldValue.lat || value.lng !== oldValue.lng) {
			set$$1(value);
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

var Map = { render: function render() {
		var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { directives: [{ name: "observe-visibility", rawName: "v-observe-visibility", value: _vm.visibilityChanged, expression: "visibilityChanged" }], staticClass: "vue-google-map" }, [_c('div', { ref: "map", staticClass: "target" }), _c('div', { staticClass: "hidden-content" }, [_vm._t("default")], 2), _vm._t("visible"), _c('resize-observer', { on: { "notify": _vm.resize } })], 2);
	}, staticRenderFns: [], _scopeId: 'data-v-3074bd5c',
	name: 'GoogleMapsMap',

	mixins: [Ready, BoundProps, Events],

	components: {
		ResizeObserver: ResizeObserver
	},

	directives: {
		// ObserveVisibility,
	},

	props: {
		bounds: {
			type: Object
		},
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

	methods: _extends({}, redirectMethods({
		target: function target() {
			return this.$map;
		},

		names: redirectedMethods
	}), {
		ready: function ready() {
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
		},
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
	})
};

function registerComponents(Vue, prefix) {
	Vue.component(prefix + 'map', Map);
}

var plugin = {
	install: function install(Vue, options) {
		var finalOptions = Object.assign({}, {
			installComponents: true,
			componentsPrefix: 'google-'
		}, options);

		if (finalOptions.installComponents) {
			registerComponents(Vue, finalOptions.componentsPrefix);
		}

		if (finalOptions.load) {
			loader.load(finalOptions.load);
		}
	},

	loader: loader,
	// Components
	Map: Map

	// Auto-install
};var GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

export default plugin;
