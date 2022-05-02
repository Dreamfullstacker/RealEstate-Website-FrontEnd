/*! @vimeo/player v2.0.1 | (c) 2016 Vimeo | MIT License | https://github.com/vimeo/player.js */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Vimeo = global.Vimeo || {}, global.Vimeo.Player = factory());
}(this, (function () { 'use strict';

var arrayIndexOfSupport = typeof Array.prototype.indexOf !== 'undefined';
var postMessageSupport = typeof window.postMessage !== 'undefined';

if (!arrayIndexOfSupport || !postMessageSupport) {
    throw new Error('Sorry, the Vimeo Player API is not available in this browser.');
}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var index = createCommonjsModule(function (module, exports) {
(function (exports) {
  'use strict';
  //shared pointer

  var i;
  //shortcuts
  var defineProperty = Object.defineProperty,
      is = function is(a, b) {
    return a === b || a !== a && b !== b;
  };

  //Polyfill global objects
  if (typeof WeakMap == 'undefined') {
    exports.WeakMap = createCollection({
      // WeakMap#delete(key:void*):boolean
      'delete': sharedDelete,
      // WeakMap#clear():
      clear: sharedClear,
      // WeakMap#get(key:void*):void*
      get: sharedGet,
      // WeakMap#has(key:void*):boolean
      has: mapHas,
      // WeakMap#set(key:void*, value:void*):void
      set: sharedSet
    }, true);
  }

  if (typeof Map == 'undefined' || typeof new Map().values !== 'function' || !new Map().values().next) {
    exports.Map = createCollection({
      // WeakMap#delete(key:void*):boolean
      'delete': sharedDelete,
      //:was Map#get(key:void*[, d3fault:void*]):void*
      // Map#has(key:void*):boolean
      has: mapHas,
      // Map#get(key:void*):boolean
      get: sharedGet,
      // Map#set(key:void*, value:void*):void
      set: sharedSet,
      // Map#keys(void):Iterator
      keys: sharedKeys,
      // Map#values(void):Iterator
      values: sharedValues,
      // Map#entries(void):Iterator
      entries: mapEntries,
      // Map#forEach(callback:Function, context:void*):void ==> callback.call(context, key, value, mapObject) === not in specs`
      forEach: sharedForEach,
      // Map#clear():
      clear: sharedClear
    });
  }

  if (typeof Set == 'undefined' || typeof new Set().values !== 'function' || !new Set().values().next) {
    exports.Set = createCollection({
      // Set#has(value:void*):boolean
      has: setHas,
      // Set#add(value:void*):boolean
      add: sharedAdd,
      // Set#delete(key:void*):boolean
      'delete': sharedDelete,
      // Set#clear():
      clear: sharedClear,
      // Set#keys(void):Iterator
      keys: sharedValues, // specs actually say "the same function object as the initial value of the values property"
      // Set#values(void):Iterator
      values: sharedValues,
      // Set#entries(void):Iterator
      entries: setEntries,
      // Set#forEach(callback:Function, context:void*):void ==> callback.call(context, value, index) === not in specs
      forEach: sharedForEach
    });
  }

  if (typeof WeakSet == 'undefined') {
    exports.WeakSet = createCollection({
      // WeakSet#delete(key:void*):boolean
      'delete': sharedDelete,
      // WeakSet#add(value:void*):boolean
      add: sharedAdd,
      // WeakSet#clear():
      clear: sharedClear,
      // WeakSet#has(value:void*):boolean
      has: setHas
    }, true);
  }

  /**
   * ES6 collection constructor
   * @return {Function} a collection class
   */
  function createCollection(proto, objectOnly) {
    function Collection(a) {
      if (!this || this.constructor !== Collection) return new Collection(a);
      this._keys = [];
      this._values = [];
      this._itp = []; // iteration pointers
      this.objectOnly = objectOnly;

      //parse initial iterable argument passed
      if (a) init.call(this, a);
    }

    //define size for non object-only collections
    if (!objectOnly) {
      defineProperty(proto, 'size', {
        get: sharedSize
      });
    }

    //set prototype
    proto.constructor = Collection;
    Collection.prototype = proto;

    return Collection;
  }

  /** parse initial iterable argument passed */
  function init(a) {
    var i;
    //init Set argument, like `[1,2,3,{}]`
    if (this.add) a.forEach(this.add, this);
    //init Map argument like `[[1,2], [{}, 4]]`
    else a.forEach(function (a) {
        this.set(a[0], a[1]);
      }, this);
  }

  /** delete */
  function sharedDelete(key) {
    if (this.has(key)) {
      this._keys.splice(i, 1);
      this._values.splice(i, 1);
      // update iteration pointers
      this._itp.forEach(function (p) {
        if (i < p[0]) p[0]--;
      });
    }
    // Aurora here does it while Canary doesn't
    return -1 < i;
  }

  function sharedGet(key) {
    return this.has(key) ? this._values[i] : undefined;
  }

  function has(list, key) {
    if (this.objectOnly && key !== Object(key)) throw new TypeError("Invalid value used as weak collection key");
    //NaN or 0 passed
    if (key != key || key === 0) for (i = list.length; i-- && !is(list[i], key);) {} else i = list.indexOf(key);
    return -1 < i;
  }

  function setHas(value) {
    return has.call(this, this._values, value);
  }

  function mapHas(value) {
    return has.call(this, this._keys, value);
  }

  /** @chainable */
  function sharedSet(key, value) {
    this.has(key) ? this._values[i] = value : this._values[this._keys.push(key) - 1] = value;
    return this;
  }

  /** @chainable */
  function sharedAdd(value) {
    if (!this.has(value)) this._values.push(value);
    return this;
  }

  function sharedClear() {
    (this._keys || 0).length = this._values.length = 0;
  }

  /** keys, values, and iterate related methods */
  function sharedKeys() {
    return sharedIterator(this._itp, this._keys);
  }

  function sharedValues() {
    return sharedIterator(this._itp, this._values);
  }

  function mapEntries() {
    return sharedIterator(this._itp, this._keys, this._values);
  }

  function setEntries() {
    return sharedIterator(this._itp, this._values, this._values);
  }

  function sharedIterator(itp, array, array2) {
    var p = [0],
        done = false;
    itp.push(p);
    return {
      next: function next() {
        var v,
            k = p[0];
        if (!done && k < array.length) {
          v = array2 ? [array[k], array2[k]] : array[k];
          p[0]++;
        } else {
          done = true;
          itp.splice(itp.indexOf(p), 1);
        }
        return { done: done, value: v };
      }
    };
  }

  function sharedSize() {
    return this._values.length;
  }

  function sharedForEach(callback, context) {
    var it = this.entries();
    for (;;) {
      var r = it.next();
      if (r.done) break;
      callback.call(context, r.value[1], r.value[0], this);
    }
  }
})(typeof exports != 'undefined' && typeof commonjsGlobal != 'undefined' ? commonjsGlobal : window);
});

var npo_src = createCommonjsModule(function (module) {
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! Native Promise Only
    v0.8.1 (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/

(function UMD(name, context, definition) {
	// special form of UMD for polyfilling across evironments
	context[name] = context[name] || definition();
	if (typeof module != "undefined" && module.exports) {
		module.exports = context[name];
	} else if (typeof define == "function" && define.amd) {
		define(function $AMD$() {
			return context[name];
		});
	}
})("Promise", typeof commonjsGlobal != "undefined" ? commonjsGlobal : commonjsGlobal, function DEF() {
	/*jshint validthis:true */
	"use strict";

	var builtInProp,
	    cycle,
	    scheduling_queue,
	    ToString = Object.prototype.toString,
	    timer = typeof setImmediate != "undefined" ? function timer(fn) {
		return setImmediate(fn);
	} : setTimeout;

	// dammit, IE8.
	try {
		Object.defineProperty({}, "x", {});
		builtInProp = function builtInProp(obj, name, val, config) {
			return Object.defineProperty(obj, name, {
				value: val,
				writable: true,
				configurable: config !== false
			});
		};
	} catch (err) {
		builtInProp = function builtInProp(obj, name, val) {
			obj[name] = val;
			return obj;
		};
	}

	// Note: using a queue instead of array for efficiency
	scheduling_queue = function Queue() {
		var first, last, item;

		function Item(fn, self) {
			this.fn = fn;
			this.self = self;
			this.next = void 0;
		}

		return {
			add: function add(fn, self) {
				item = new Item(fn, self);
				if (last) {
					last.next = item;
				} else {
					first = item;
				}
				last = item;
				item = void 0;
			},
			drain: function drain() {
				var f = first;
				first = last = cycle = void 0;

				while (f) {
					f.fn.call(f.self);
					f = f.next;
				}
			}
		};
	}();

	function schedule(fn, self) {
		scheduling_queue.add(fn, self);
		if (!cycle) {
			cycle = timer(scheduling_queue.drain);
		}
	}

	// promise duck typing
	function isThenable(o) {
		var _then,
		    o_type = typeof o === "undefined" ? "undefined" : _typeof(o);

		if (o != null && (o_type == "object" || o_type == "function")) {
			_then = o.then;
		}
		return typeof _then == "function" ? _then : false;
	}

	function notify() {
		for (var i = 0; i < this.chain.length; i++) {
			notifyIsolated(this, this.state === 1 ? this.chain[i].success : this.chain[i].failure, this.chain[i]);
		}
		this.chain.length = 0;
	}

	// NOTE: This is a separate function to isolate
	// the `try..catch` so that other code can be
	// optimized better
	function notifyIsolated(self, cb, chain) {
		var ret, _then;
		try {
			if (cb === false) {
				chain.reject(self.msg);
			} else {
				if (cb === true) {
					ret = self.msg;
				} else {
					ret = cb.call(void 0, self.msg);
				}

				if (ret === chain.promise) {
					chain.reject(TypeError("Promise-chain cycle"));
				} else if (_then = isThenable(ret)) {
					_then.call(ret, chain.resolve, chain.reject);
				} else {
					chain.resolve(ret);
				}
			}
		} catch (err) {
			chain.reject(err);
		}
	}

	function resolve(msg) {
		var _then,
		    self = this;

		// already triggered?
		if (self.triggered) {
			return;
		}

		self.triggered = true;

		// unwrap
		if (self.def) {
			self = self.def;
		}

		try {
			if (_then = isThenable(msg)) {
				schedule(function () {
					var def_wrapper = new MakeDefWrapper(self);
					try {
						_then.call(msg, function $resolve$() {
							resolve.apply(def_wrapper, arguments);
						}, function $reject$() {
							reject.apply(def_wrapper, arguments);
						});
					} catch (err) {
						reject.call(def_wrapper, err);
					}
				});
			} else {
				self.msg = msg;
				self.state = 1;
				if (self.chain.length > 0) {
					schedule(notify, self);
				}
			}
		} catch (err) {
			reject.call(new MakeDefWrapper(self), err);
		}
	}

	function reject(msg) {
		var self = this;

		// already triggered?
		if (self.triggered) {
			return;
		}

		self.triggered = true;

		// unwrap
		if (self.def) {
			self = self.def;
		}

		self.msg = msg;
		self.state = 2;
		if (self.chain.length > 0) {
			schedule(notify, self);
		}
	}

	function iteratePromises(Constructor, arr, resolver, rejecter) {
		for (var idx = 0; idx < arr.length; idx++) {
			(function IIFE(idx) {
				Constructor.resolve(arr[idx]).then(function $resolver$(msg) {
					resolver(idx, msg);
				}, rejecter);
			})(idx);
		}
	}

	function MakeDefWrapper(self) {
		this.def = self;
		this.triggered = false;
	}

	function MakeDef(self) {
		this.promise = self;
		this.state = 0;
		this.triggered = false;
		this.chain = [];
		this.msg = void 0;
	}

	function Promise(executor) {
		if (typeof executor != "function") {
			throw TypeError("Not a function");
		}

		if (this.__NPO__ !== 0) {
			throw TypeError("Not a promise");
		}

		// instance shadowing the inherited "brand"
		// to signal an already "initialized" promise
		this.__NPO__ = 1;

		var def = new MakeDef(this);

		this["then"] = function then(success, failure) {
			var o = {
				success: typeof success == "function" ? success : true,
				failure: typeof failure == "function" ? failure : false
			};
			// Note: `then(..)` itself can be borrowed to be used against
			// a different promise constructor for making the chained promise,
			// by substituting a different `this` binding.
			o.promise = new this.constructor(function extractChain(resolve, reject) {
				if (typeof resolve != "function" || typeof reject != "function") {
					throw TypeError("Not a function");
				}

				o.resolve = resolve;
				o.reject = reject;
			});
			def.chain.push(o);

			if (def.state !== 0) {
				schedule(notify, def);
			}

			return o.promise;
		};
		this["catch"] = function $catch$(failure) {
			return this.then(void 0, failure);
		};

		try {
			executor.call(void 0, function publicResolve(msg) {
				resolve.call(def, msg);
			}, function publicReject(msg) {
				reject.call(def, msg);
			});
		} catch (err) {
			reject.call(def, err);
		}
	}

	var PromisePrototype = builtInProp({}, "constructor", Promise,
	/*configurable=*/false);

	// Note: Android 4 cannot use `Object.defineProperty(..)` here
	Promise.prototype = PromisePrototype;

	// built-in "brand" to signal an "uninitialized" promise
	builtInProp(PromisePrototype, "__NPO__", 0,
	/*configurable=*/false);

	builtInProp(Promise, "resolve", function Promise$resolve(msg) {
		var Constructor = this;

		// spec mandated checks
		// note: best "isPromise" check that's practical for now
		if (msg && (typeof msg === "undefined" ? "undefined" : _typeof(msg)) == "object" && msg.__NPO__ === 1) {
			return msg;
		}

		return new Constructor(function executor(resolve, reject) {
			if (typeof resolve != "function" || typeof reject != "function") {
				throw TypeError("Not a function");
			}

			resolve(msg);
		});
	});

	builtInProp(Promise, "reject", function Promise$reject(msg) {
		return new this(function executor(resolve, reject) {
			if (typeof resolve != "function" || typeof reject != "function") {
				throw TypeError("Not a function");
			}

			reject(msg);
		});
	});

	builtInProp(Promise, "all", function Promise$all(arr) {
		var Constructor = this;

		// spec mandated checks
		if (ToString.call(arr) != "[object Array]") {
			return Constructor.reject(TypeError("Not an array"));
		}
		if (arr.length === 0) {
			return Constructor.resolve([]);
		}

		return new Constructor(function executor(resolve, reject) {
			if (typeof resolve != "function" || typeof reject != "function") {
				throw TypeError("Not a function");
			}

			var len = arr.length,
			    msgs = Array(len),
			    count = 0;

			iteratePromises(Constructor, arr, function resolver(idx, msg) {
				msgs[idx] = msg;
				if (++count === len) {
					resolve(msgs);
				}
			}, reject);
		});
	});

	builtInProp(Promise, "race", function Promise$race(arr) {
		var Constructor = this;

		// spec mandated checks
		if (ToString.call(arr) != "[object Array]") {
			return Constructor.reject(TypeError("Not an array"));
		}

		return new Constructor(function executor(resolve, reject) {
			if (typeof resolve != "function" || typeof reject != "function") {
				throw TypeError("Not a function");
			}

			iteratePromises(Constructor, arr, function resolver(idx, msg) {
				resolve(msg);
			}, reject);
		});
	});

	return Promise;
});
});

/**
 * @module lib/callbacks
 */

var callbackMap = new WeakMap();

/**
 * Store a callback for a method or event for a player.
 *
 * @author Brad Dougherty <brad@vimeo.com>
 * @param {Player} player The player object.
 * @param {string} name The method or event name.
 * @param {(function(this:Player, *): void|{resolve: function, reject: function})} callback
 *        The callback to call or an object with resolve and reject functions for a promise.
 * @return {void}
 */
function storeCallback(player, name, callback) {
    var playerCallbacks = callbackMap.get(player.element) || {};

    if (!(name in playerCallbacks)) {
        playerCallbacks[name] = [];
    }

    playerCallbacks[name].push(callback);
    callbackMap.set(player.element, playerCallbacks);
}

/**
 * Get the callbacks for a player and event or method.
 *
 * @author Brad Dougherty <brad@vimeo.com>
 * @param {Player} player The player object.
 * @param {string} name The method or event name
 * @return {function[]}
 */
function getCallbacks(player, name) {
    var playerCallbacks = callbackMap.get(player.element) || {};
    return playerCallbacks[name] || [];
}

/**
 * Remove a stored callback for a method or event for a player.
 *
 * @author Brad Dougherty <brad@vimeo.com>
 * @param {Player} player The player object.
 * @param {string} name The method or event name
 * @param {function} [callback] The specific callback to remove.
 * @return {boolean} Was this the last callback?
 */
function removeCallback(player, name, callback) {
    var playerCallbacks = callbackMap.get(player.element) || {};

    if (!playerCallbacks[name]) {
        return true;
    }

    // If no callback is passed, remove all callbacks for the event
    if (!callback) {
        playerCallbacks[name] = [];
        callbackMap.set(player.element, playerCallbacks);

        return true;
    }

    var index = playerCallbacks[name].indexOf(callback);

    if (index !== -1) {
        playerCallbacks[name].splice(index, 1);
    }

    callbackMap.set(player.element, playerCallbacks);
    return playerCallbacks[name] && playerCallbacks[name].length === 0;
}

/**
 * Return the first stored callback for a player and event or method.
 *
 * @param {Player} player The player object.
 * @param {string} name The method or event name.
 * @return {function} The callback, or false if there were none
 */
function shiftCallbacks(player, name) {
    var playerCallbacks = getCallbacks(player, name);

    if (playerCallbacks.length < 1) {
        return false;
    }

    var callback = playerCallbacks.shift();
    removeCallback(player, name, callback);
    return callback;
}

/**
 * Move callbacks associated with an element to another element.
 *
 * @author Brad Dougherty <brad@vimeo.com>
 * @param {HTMLElement} oldElement The old element.
 * @param {HTMLElement} newElement The new element.
 * @return {void}
 */
function swapCallbacks(oldElement, newElement) {
    var playerCallbacks = callbackMap.get(oldElement);

    callbackMap.set(newElement, playerCallbacks);
    callbackMap.delete(oldElement);
}

/**
 * @module lib/functions
 */

/**
 * Get the name of the method for a given getter or setter.
 *
 * @author Brad Dougherty <brad@vimeo.com>
 * @param {string} prop The name of the property.
 * @param {string} type Either â€œgetâ€ or â€œsetâ€.
 * @return {string}
 */
function getMethodName(prop, type) {
    if (prop.indexOf(type.toLowerCase()) === 0) {
        return prop;
    }

    return '' + type.toLowerCase() + prop.substr(0, 1).toUpperCase() + prop.substr(1);
}

/**
 * Check to see if the object is a DOM Element.
 *
 * @author Brad Dougherty <brad@vimeo.com>
 * @param {*} element The object to check.
 * @return {boolean}
 */
function isDomElement(element) {
    return element instanceof window.HTMLElement;
}

/**
 * Check to see whether the value is a number.
 *
 * @author Brad Dougherty <brad@vimeo.com>
 * @see http://dl.dropboxusercontent.com/u/35146/js/tests/isNumber.html
 * @param {*} value The value to check.
 * @param {boolean} integer Check if the value is an integer.
 * @return {boolean}
 */
function isInteger(value) {
    // eslint-disable-next-line eqeqeq
    return !isNaN(parseFloat(value)) && isFinite(value) && Math.floor(value) == value;
}

/**
 * Check to see if the URL is a Vimeo url.
 *
 * @author Brad Dougherty <brad@vimeo.com>
 * @param {string} url The url string.
 * @return {boolean}
 */
function isVimeoUrl(url) {
    return (/^(https?:)?\/\/(player.)?vimeo.com(?=$|\/)/.test(url)
    );
}

/**
 * Get the Vimeo URL from an element.
 * The element must have either a data-vimeo-id or data-vimeo-url attribute.
 *
 * @author Brad Dougherty <brad@vimeo.com>
 * @param {object} oEmbedParameters The oEmbed parameters.
 * @return {string}
 */
function getVimeoUrl() {
    var oEmbedParameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var id = oEmbedParameters.id;
    var url = oEmbedParameters.url;
    var idOrUrl = id || url;

    if (!idOrUrl) {
        throw new Error('An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.');
    }

    if (isInteger(idOrUrl)) {
        return 'https://vimeo.com/' + idOrUrl;
    }

    if (isVimeoUrl(idOrUrl)) {
        return idOrUrl.replace('http:', 'https:');
    }

    if (id) {
        throw new TypeError('\u201C' + id + '\u201D is not a valid video id.');
    }

    throw new TypeError('\u201C' + idOrUrl + '\u201D is not a vimeo.com url.');
}

/**
 * @module lib/embed
 */

var oEmbedParameters = ['id', 'url', 'width', 'maxwidth', 'height', 'maxheight', 'portrait', 'title', 'byline', 'color', 'autoplay', 'autopause', 'loop', 'responsive'];

/**
 * Get the 'data-vimeo'-prefixed attributes from an element as an object.
 *
 * @author Brad Dougherty <brad@vimeo.com>
 * @param {HTMLElement} element The element.
 * @param {Object} [defaults={}] The default values to use.
 * @return {Object<string, string>}
 */
function getOEmbedParameters(element) {
    var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return oEmbedParameters.reduce(function (params, param) {
        var value = element.getAttribute('data-vimeo-' + param);

        if (value || value === '') {
            params[param] = value === '' ? 1 : value;
        }

        return params;
    }, defaults);
}

/**
 * Make an oEmbed call for the specified URL.
 *
 * @author Brad Dougherty <brad@vimeo.com>
 * @param {string} videoUrl The vimeo.com url for the video.
 * @param {Object} [params] Parameters to pass to oEmbed.
 * @return {Promise}
 */
function getOEmbedData(videoUrl) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return new Promise(function (resolve, reject) {
        if (!isVimeoUrl(videoUrl)) {
            throw new TypeError('\u201C' + videoUrl + '\u201D is not a vimeo.com url.');
        }

        var url = 'https://vimeo.com/api/oembed.json?url=' + encodeURIComponent(videoUrl);

        for (var param in params) {
            if (params.hasOwnProperty(param)) {
                url += '&' + param + '=' + encodeURIComponent(params[param]);
            }
        }

        var xhr = 'XDomainRequest' in window ? new XDomainRequest() : new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function () {
            if (xhr.status === 404) {
                reject(new Error('\u201C' + videoUrl + '\u201D was not found.'));
                return;
            }

            if (xhr.status === 403) {
                reject(new Error('\u201C' + videoUrl + '\u201D is not embeddable.'));
                return;
            }

            try {
                var json = JSON.parse(xhr.responseText);
                resolve(json);
            } catch (error) {
                reject(error);
            }
        };

        xhr.onerror = function () {
            var status = xhr.status ? ' (' + xhr.status + ')' : '';
            reject(new Error('There was an error fetching the embed code from Vimeo' + status + '.'));
        };

        xhr.send();
    });
}

/**
 * Create an embed from oEmbed data inside an element.
 *
 * @author Brad Dougherty <brad@vimeo.com>
 * @param {object} data The oEmbed data.
 * @param {HTMLElement} element The element to put the iframe in.
 * @return {HTMLIFrameElement} The iframe embed.
 */
function createEmbed(_ref, element) {
    var html = _ref.html;

    if (!element) {
        throw new TypeError('An element must be provided');
    }

    if (element.getAttribute('data-vimeo-initialized') !== null) {
        return element.querySelector('iframe');
    }

    var div = document.createElement('div');
    div.innerHTML = html;

    element.appendChild(div.firstChild);
    element.setAttribute('data-vimeo-initialized', 'true');

    return element.querySelector('iframe');
}

/**
 * Initialize all embeds within a specific element
 *
 * @author Brad Dougherty <brad@vimeo.com>
 * @param {HTMLElement} [parent=document] The parent element.
 * @return {void}
 */
function initializeEmbeds() {
    var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

    var elements = [].slice.call(parent.querySelectorAll('[data-vimeo-id], [data-vimeo-url]'));

    var handleError = function handleError(error) {
        if ('console' in window && console.error) {
            console.error('There was an error creating an embed: ' + error);
        }
    };

    elements.forEach(function (element) {
        try {
            // Skip any that have data-vimeo-defer
            if (element.getAttribute('data-vimeo-defer') !== null) {
                return;
            }

            var params = getOEmbedParameters(element);
            var url = getVimeoUrl(params);

            getOEmbedData(url, params).then(function (data) {
                return createEmbed(data, element);
            }).catch(handleError);
        } catch (error) {
            handleError(error);
        }
    });
}

/**
 * @module lib/postmessage
 */

/**
 * Parse a message received from postMessage.
 *
 * @param {*} data The data received from postMessage.
 * @return {object}
 */
function parseMessageData(data) {
    if (typeof data === 'string') {
        data = JSON.parse(data);
    }

    return data;
}

/**
 * Post a message to the specified target.
 *
 * @author Brad Dougherty <brad@vimeo.com>
 * @param {Player} player The player object to use.
 * @param {string} method The API method to call.
 * @param {object} params The parameters to send to the player.
 * @return {void}
 */
function postMessage(player, method, params) {
    if (!player.element.contentWindow.postMessage) {
        return;
    }

    var message = {
        method: method
    };

    if (params !== undefined) {
        message.value = params;
    }

    // IE 8 and 9 do not support passing messages, so stringify them
    var ieVersion = parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, '$1'));
    if (ieVersion >= 8 && ieVersion < 10) {
        message = JSON.stringify(message);
    }

    player.element.contentWindow.postMessage(message, player.origin);
}

/**
 * Parse the data received from a message event.
 *
 * @author Brad Dougherty <brad@vimeo.com>
 * @param {Player} player The player that received the message.
 * @param {(Object|string)} data The message data. Strings will be parsed into JSON.
 * @return {void}
 */
function processData(player, data) {
    data = parseMessageData(data);
    var callbacks = [];
    var param = void 0;

    if (data.event) {
        if (data.event === 'error') {
            var promises = getCallbacks(player, data.data.method);

            promises.forEach(function (promise) {
                var error = new Error(data.data.message);
                error.name = data.data.name;

                promise.reject(error);
                removeCallback(player, data.data.method, promise);
            });
        }

        callbacks = getCallbacks(player, 'event:' + data.event);
        param = data.data;
    } else if (data.method) {
        var callback = shiftCallbacks(player, data.method);

        if (callback) {
            callbacks.push(callback);
            param = data.value;
        }
    }

    callbacks.forEach(function (callback) {
        try {
            if (typeof callback === 'function') {
                callback.call(player, param);
                return;
            }

            callback.resolve(param);
        } catch (e) {
            // empty
        }
    });
}

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var playerMap = new WeakMap();
var readyMap = new WeakMap();

var Player = function () {
    /**
    * Create a Player.
    *
    * @author Brad Dougherty <brad@vimeo.com>
    * @param {(HTMLIFrameElement|HTMLElement|string|jQuery)} element A reference to the Vimeo
    *        player iframe, and id, or a jQuery object.
    * @param {object} [options] oEmbed parameters to use when creating an embed in the element.
    * @return {Player}
    */
    function Player(element) {
        var _this = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Player);

        /* global jQuery */
        if (window.jQuery && element instanceof jQuery) {
            if (element.length > 1 && window.console && console.warn) {
                console.warn('A jQuery object with multiple elements was passed, using the first element.');
            }

            element = element[0];
        }

        // Find an element by ID
        if (typeof element === 'string') {
            element = document.getElementById(element);
        }

        // Not an element!
        if (!isDomElement(element)) {
            throw new TypeError('You must pass either a valid element or a valid id.');
        }

        // Already initialized an embed in this div, so grab the iframe
        if (element.nodeName !== 'IFRAME') {
            var iframe = element.querySelector('iframe');

            if (iframe) {
                element = iframe;
            }
        }

        // iframe url is not a Vimeo url
        if (element.nodeName === 'IFRAME' && !isVimeoUrl(element.getAttribute('src') || '')) {
            throw new Error('The player element passed isnâ€™t a Vimeo embed.');
        }

        // If there is already a player object in the map, return that
        if (playerMap.has(element)) {
            return playerMap.get(element);
        }

        this.element = element;
        this.origin = '*';

        var readyPromise = new npo_src(function (resolve, reject) {
            var onMessage = function onMessage(event) {
                if (!isVimeoUrl(event.origin) || _this.element.contentWindow !== event.source) {
                    return;
                }

                if (_this.origin === '*') {
                    _this.origin = event.origin;
                }

                var data = parseMessageData(event.data);
                var isReadyEvent = 'event' in data && data.event === 'ready';
                var isPingResponse = 'method' in data && data.method === 'ping';

                if (isReadyEvent || isPingResponse) {
                    _this.element.setAttribute('data-ready', 'true');
                    resolve();
                    return;
                }

                processData(_this, data);
            };

            if (window.addEventListener) {
                window.addEventListener('message', onMessage, false);
            } else if (window.attachEvent) {
                window.attachEvent('onmessage', onMessage);
            }

            if (_this.element.nodeName !== 'IFRAME') {
                var params = getOEmbedParameters(element, options);
                var url = getVimeoUrl(params);

                getOEmbedData(url, params).then(function (data) {
                    var iframe = createEmbed(data, element);
                    _this.element = iframe;
                    swapCallbacks(element, iframe);

                    return data;
                }).catch(function (error) {
                    return reject(error);
                });
            }
        });

        // Store a copy of this Player in the map
        readyMap.set(this, readyPromise);
        playerMap.set(this.element, this);

        // Send a ping to the iframe so the ready promise will be resolved if
        // the player is already ready.
        if (this.element.nodeName === 'IFRAME') {
            postMessage(this, 'ping');
        }

        return this;
    }

    /**
     * Get a promise for a method.
     *
     * @author Brad Dougherty <brad@vimeo.com>
     * @param {string} name The API method to call.
     * @param {Object} [args={}] Arguments to send via postMessage.
     * @return {Promise}
     */


    _createClass(Player, [{
        key: 'callMethod',
        value: function callMethod(name) {
            var _this2 = this;

            var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return new npo_src(function (resolve, reject) {
                // We are storing the resolve/reject handlers to call later, so we
                // canâ€™t return here.
                // eslint-disable-next-line promise/always-return
                return _this2.ready().then(function () {
                    storeCallback(_this2, name, {
                        resolve: resolve,
                        reject: reject
                    });

                    postMessage(_this2, name, args);
                });
            });
        }

        /**
         * Get a promise for the value of a player property.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @param {string} name The property name
         * @return {Promise}
         */

    }, {
        key: 'get',
        value: function get(name) {
            var _this3 = this;

            return new npo_src(function (resolve, reject) {
                name = getMethodName(name, 'get');

                // We are storing the resolve/reject handlers to call later, so we
                // canâ€™t return here.
                // eslint-disable-next-line promise/always-return
                return _this3.ready().then(function () {
                    storeCallback(_this3, name, {
                        resolve: resolve,
                        reject: reject
                    });

                    postMessage(_this3, name);
                });
            });
        }

        /**
         * Get a promise for setting the value of a player property.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @param {string} name The API method to call.
         * @param {mixed} value The value to set.
         * @return {Promise}
         */

    }, {
        key: 'set',
        value: function set(name, value) {
            var _this4 = this;

            return npo_src.resolve(value).then(function (val) {
                name = getMethodName(name, 'set');

                if (val === undefined || val === null) {
                    throw new TypeError('There must be a value to set.');
                }

                return _this4.ready().then(function () {
                    return new npo_src(function (resolve, reject) {
                        storeCallback(_this4, name, {
                            resolve: resolve,
                            reject: reject
                        });

                        postMessage(_this4, name, val);
                    });
                });
            });
        }

        /**
         * Add an event listener for the specified event. Will call the
         * callback with a single parameter, `data`, that contains the data for
         * that event.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @param {string} eventName The name of the event.
         * @param {function(*)} callback The function to call when the event fires.
         * @return {void}
         */

    }, {
        key: 'on',
        value: function on(eventName, callback) {
            if (!eventName) {
                throw new TypeError('You must pass an event name.');
            }

            if (!callback) {
                throw new TypeError('You must pass a callback function.');
            }

            if (typeof callback !== 'function') {
                throw new TypeError('The callback must be a function.');
            }

            var callbacks = getCallbacks(this, 'event:' + eventName);
            if (callbacks.length === 0) {
                this.callMethod('addEventListener', eventName).catch(function () {
                    // Ignore the error. There will be an error event fired that
                    // will trigger the error callback if they are listening.
                });
            }

            storeCallback(this, 'event:' + eventName, callback);
        }

        /**
         * Remove an event listener for the specified event. Will remove all
         * listeners for that event if a `callback` isnâ€™t passed, or only that
         * specific callback if it is passed.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @param {string} eventName The name of the event.
         * @param {function} [callback] The specific callback to remove.
         * @return {void}
         */

    }, {
        key: 'off',
        value: function off(eventName, callback) {
            if (!eventName) {
                throw new TypeError('You must pass an event name.');
            }

            if (callback && typeof callback !== 'function') {
                throw new TypeError('The callback must be a function.');
            }

            var lastCallback = removeCallback(this, 'event:' + eventName, callback);

            // If there are no callbacks left, remove the listener
            if (lastCallback) {
                this.callMethod('removeEventListener', eventName).catch(function (e) {
                    // Ignore the error. There will be an error event fired that
                    // will trigger the error callback if they are listening.
                });
            }
        }

        /**
         * A promise to load a new video.
         *
         * @promise LoadVideoPromise
         * @fulfill {number} The video with this id successfully loaded.
         * @reject {TypeError} The id was not a number.
         */
        /**
         * Load a new video into this embed. The promise will be resolved if
         * the video is successfully loaded, or it will be rejected if it could
         * not be loaded.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @param {number} id The id of the video.
         * @return {LoadVideoPromise}
         */

    }, {
        key: 'loadVideo',
        value: function loadVideo(id) {
            return this.callMethod('loadVideo', id);
        }

        /**
         * A promise to perform an action when the Player is ready.
         *
         * @todo document errors
         * @promise LoadVideoPromise
         * @fulfill {void}
         */
        /**
         * Trigger a function when the player iframe has initialized. You do not
         * need to wait for `ready` to trigger to begin adding event listeners
         * or calling other methods.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @return {ReadyPromise}
         */

    }, {
        key: 'ready',
        value: function ready() {
            var readyPromise = readyMap.get(this);
            return npo_src.resolve(readyPromise);
        }

        /**
         * A promise to add a cue point to the player.
         *
         * @promise AddCuePointPromise
         * @fulfill {string} The id of the cue point to use for removeCuePoint.
         * @reject {RangeError} the time was less than 0 or greater than the
         *         videoâ€™s duration.
         * @reject {UnsupportedError} Cue points are not supported with the current
         *         player or browser.
         */
        /**
         * Add a cue point to the player.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @param {number} time The time for the cue point.
         * @param {object} [data] Arbitrary data to be returned with the cue point.
         * @return {AddCuePointPromise}
         */

    }, {
        key: 'addCuePoint',
        value: function addCuePoint(time) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return this.callMethod('addCuePoint', { time: time, data: data });
        }

        /**
         * A promise to remove a cue point from the player.
         *
         * @promise AddCuePointPromise
         * @fulfill {string} The id of the cue point that was removed.
         * @reject {InvalidCuePoint} The cue point with the specified id was not
         *         found.
         * @reject {UnsupportedError} Cue points are not supported with the current
         *         player or browser.
         */
        /**
         * Remove a cue point from the video.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @param {string} id The id of the cue point to remove.
         * @return {RemoveCuePointPromise}
         */

    }, {
        key: 'removeCuePoint',
        value: function removeCuePoint(id) {
            return this.callMethod('removeCuePoint', id);
        }

        /**
         * A representation of a text track on a video.
         *
         * @typedef {Object} VimeoTextTrack
         * @property {string} language The ISO language code.
         * @property {string} kind The kind of track it is (captions or subtitles).
         * @property {string} label The humanâ€readable label for the track.
         */
        /**
         * A promise to enable a text track.
         *
         * @promise EnableTextTrackPromise
         * @fulfill {VimeoTextTrack} The text track that was enabled.
         * @reject {InvalidTrackLanguageError} No track was available with the
         *         specified language.
         * @reject {InvalidTrackError} No track was available with the specified
         *         language and kind.
         */
        /**
         * Enable the text track with the specified language, and optionally the
         * specified kind (captions or subtitles).
         *
         * When set via the API, the track language will not change the viewerâ€™s
         * stored preference.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @param {string} language The twoâ€letter language code.
         * @param {string} [kind] The kind of track to enable (captions or subtitles).
         * @return {EnableTextTrackPromise}
         */

    }, {
        key: 'enableTextTrack',
        value: function enableTextTrack(language, kind) {
            if (!language) {
                throw new TypeError('You must pass a language.');
            }

            return this.callMethod('enableTextTrack', {
                language: language,
                kind: kind
            });
        }

        /**
         * A promise to disable the active text track.
         *
         * @promise DisableTextTrackPromise
         * @fulfill {void} The track was disabled.
         */
        /**
         * Disable the currently-active text track.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @return {DisableTextTrackPromise}
         */

    }, {
        key: 'disableTextTrack',
        value: function disableTextTrack() {
            return this.callMethod('disableTextTrack');
        }

        /**
         * A promise to pause the video.
         *
         * @promise PausePromise
         * @fulfill {void} The video was paused.
         */
        /**
         * Pause the video if itâ€™s playing.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @return {PausePromise}
         */

    }, {
        key: 'pause',
        value: function pause() {
            return this.callMethod('pause');
        }

        /**
         * A promise to play the video.
         *
         * @promise PlayPromise
         * @fulfill {void} The video was played.
         */
        /**
         * Play the video if itâ€™s paused. **Note:** on iOS and some other
         * mobile devices, you cannot programmatically trigger play. Once the
         * viewer has tapped on the play button in the player, however, you
         * will be able to use this function.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @return {PlayPromise}
         */

    }, {
        key: 'play',
        value: function play() {
            return this.callMethod('play');
        }

        /**
         * A promise to unload the video.
         *
         * @promise UnloadPromise
         * @fulfill {void} The video was unloaded.
         */
        /**
         * Return the player to its initial state.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @return {UnloadPromise}
         */

    }, {
        key: 'unload',
        value: function unload() {
            return this.callMethod('unload');
        }

        /**
         * A promise to get the autopause behavior of the video.
         *
         * @promise GetAutopausePromise
         * @fulfill {boolean} Whether autopause is turned on or off.
         * @reject {UnsupportedError} Autopause is not supported with the current
         *         player or browser.
         */
        /**
         * Get the autopause behavior for this player.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @return {GetAutopausePromise}
         */

    }, {
        key: 'getAutopause',
        value: function getAutopause() {
            return this.get('autopause');
        }

        /**
         * A promise to set the autopause behavior of the video.
         *
         * @promise SetAutopausePromise
         * @fulfill {boolean} Whether autopause is turned on or off.
         * @reject {UnsupportedError} Autopause is not supported with the current
         *         player or browser.
         */
        /**
         * Enable or disable the autopause behavior of this player.
         *
         * By default, when another video is played in the same browser, this
         * player will automatically pause. Unless you have a specific reason
         * for doing so, we recommend that you leave autopause set to the
         * default (`true`).
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @param {boolean} autopause
         * @return {SetAutopausePromise}
         */

    }, {
        key: 'setAutopause',
        value: function setAutopause(autopause) {
            return this.set('autopause', autopause);
        }

        /**
         * A promise to get the color of the player.
         *
         * @promise GetColorPromise
         * @fulfill {string} The hex color of the player.
         */
        /**
         * Get the color for this player.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @return {GetColorPromise}
         */

    }, {
        key: 'getColor',
        value: function getColor() {
            return this.get('color');
        }

        /**
         * A promise to set the color of the player.
         *
         * @promise SetColorPromise
         * @fulfill {string} The color was successfully set.
         * @reject {TypeError} The string was not a valid hex or rgb color.
         * @reject {ContrastError} The color was set, but the contrast is
         *         outside of the acceptable range.
         * @reject {EmbedSettingsError} The owner of the player has chosen to
         *         use a specific color.
         */
        /**
         * Set the color of this player to a hex or rgb string. Setting the
         * color may fail if the owner of the video has set their embed
         * preferences to force a specific color.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @param {string} color The hex or rgb color string to set.
         * @return {SetColorPromise}
         */

    }, {
        key: 'setColor',
        value: function setColor(color) {
            return this.set('color', color);
        }

        /**
         * A representation of a cue point.
         *
         * @typedef {Object} VimeoCuePoint
         * @property {number} time The time of the cue point.
         * @property {object} data The data passed when adding the cue point.
         * @property {string} id The unique id for use with removeCuePoint.
         */
        /**
         * A promise to get the cue points of a video.
         *
         * @promise GetCuePointsPromise
         * @fulfill {VimeoCuePoint[]} The cue points added to the video.
         * @reject {UnsupportedError} Cue points are not supported with the current
         *         player or browser.
         */
        /**
         * Get an array of the cue points added to the video.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @return {GetCuePointsPromise}
         */

    }, {
        key: 'getCuePoints',
        value: function getCuePoints() {
            return this.get('cuePoints');
        }

        /**
         * A promise to get the current time of the video.
         *
         * @promise GetCurrentTimePromise
         * @fulfill {number} The current time in seconds.
         */
        /**
         * Get the current playback position in seconds.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @return {GetCurrentTimePromise}
         */

    }, {
        key: 'getCurrentTime',
        value: function getCurrentTime() {
            return this.get('currentTime');
        }

        /**
         * A promise to set the current time of the video.
         *
         * @promise SetCurrentTimePromise
         * @fulfill {number} The actual current time that was set.
         * @reject {RangeError} the time was less than 0 or greater than the
         *         videoâ€™s duration.
         */
        /**
         * Set the current playback position in seconds. If the player was
         * paused, it will remain paused. Likewise, if the player was playing,
         * it will resume playing once the video has buffered.
         *
         * You can provide an accurate time and the player will attempt to seek
         * to as close to that time as possible. The exact time will be the
         * fulfilled value of the promise.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @param {number} currentTime
         * @return {SetCurrentTimePromise}
         */

    }, {
        key: 'setCurrentTime',
        value: function setCurrentTime(currentTime) {
            return this.set('currentTime', currentTime);
        }

        /**
         * A promise to get the duration of the video.
         *
         * @promise GetDurationPromise
         * @fulfill {number} The duration in seconds.
         */
        /**
         * Get the duration of the video in seconds. It will be rounded to the
         * nearest second before playback begins, and to the nearest thousandth
         * of a second after playback begins.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @return {GetDurationPromise}
         */

    }, {
        key: 'getDuration',
        value: function getDuration() {
            return this.get('duration');
        }

        /**
         * A promise to get the ended state of the video.
         *
         * @promise GetEndedPromise
         * @fulfill {boolean} Whether or not the video has ended.
         */
        /**
         * Get the ended state of the video. The video has ended if
         * `currentTime === duration`.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @return {GetEndedPromise}
         */

    }, {
        key: 'getEnded',
        value: function getEnded() {
            return this.get('ended');
        }

        /**
         * A promise to get the loop state of the player.
         *
         * @promise GetLoopPromise
         * @fulfill {boolean} Whether or not the player is set to loop.
         */
        /**
         * Get the loop state of the player.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @return {GetLoopPromise}
         */

    }, {
        key: 'getLoop',
        value: function getLoop() {
            return this.get('loop');
        }

        /**
         * A promise to set the loop state of the player.
         *
         * @promise SetLoopPromise
         * @fulfill {boolean} The loop state that was set.
         */
        /**
         * Set the loop state of the player. When set to `true`, the player
         * will start over immediately once playback ends.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @param {boolean} loop
         * @return {SetLoopPromise}
         */

    }, {
        key: 'setLoop',
        value: function setLoop(loop) {
            return this.set('loop', loop);
        }

        /**
         * A promise to get the paused state of the player.
         *
         * @promise GetLoopPromise
         * @fulfill {boolean} Whether or not the video is paused.
         */
        /**
         * Get the paused state of the player.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @return {GetLoopPromise}
         */

    }, {
        key: 'getPaused',
        value: function getPaused() {
            return this.get('paused');
        }

        /**
         * A promise to get the text tracks of a video.
         *
         * @promise GetTextTracksPromise
         * @fulfill {VimeoTextTrack[]} The text tracks associated with the video.
         */
        /**
         * Get an array of the text tracks that exist for the video.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @return {GetTextTracksPromise}
         */

    }, {
        key: 'getTextTracks',
        value: function getTextTracks() {
            return this.get('textTracks');
        }

        /**
         * A promise to get the embed code for the video.
         *
         * @promise GetVideoEmbedCodePromise
         * @fulfill {string} The `<iframe>` embed code for the video.
         */
        /**
         * Get the `<iframe>` embed code for the video.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @return {GetVideoEmbedCodePromise}
         */

    }, {
        key: 'getVideoEmbedCode',
        value: function getVideoEmbedCode() {
            return this.get('videoEmbedCode');
        }

        /**
         * A promise to get the id of the video.
         *
         * @promise GetVideoIdPromise
         * @fulfill {number} The id of the video.
         */
        /**
         * Get the id of the video.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @return {GetVideoIdPromise}
         */

    }, {
        key: 'getVideoId',
        value: function getVideoId() {
            return this.get('videoId');
        }

        /**
         * A promise to get the title of the video.
         *
         * @promise GetVideoTitlePromise
         * @fulfill {number} The title of the video.
         */
        /**
         * Get the title of the video.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @return {GetVideoTitlePromise}
         */

    }, {
        key: 'getVideoTitle',
        value: function getVideoTitle() {
            return this.get('videoTitle');
        }

        /**
         * A promise to get the native width of the video.
         *
         * @promise GetVideoWidthPromise
         * @fulfill {number} The native width of the video.
         */
        /**
         * Get the native width of the currentlyâ€playing video. The width of
         * the highestâ€resolution available will be used before playback begins.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @return {GetVideoWidthPromise}
         */

    }, {
        key: 'getVideoWidth',
        value: function getVideoWidth() {
            return this.get('videoWidth');
        }

        /**
         * A promise to get the native height of the video.
         *
         * @promise GetVideoHeightPromise
         * @fulfill {number} The native height of the video.
         */
        /**
         * Get the native height of the currentlyâ€playing video. The height of
         * the highestâ€resolution available will be used before playback begins.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @return {GetVideoHeightPromise}
         */

    }, {
        key: 'getVideoHeight',
        value: function getVideoHeight() {
            return this.get('videoHeight');
        }

        /**
         * A promise to get the vimeo.com url for the video.
         *
         * @promise GetVideoUrlPromise
         * @fulfill {number} The vimeo.com url for the video.
         * @reject {PrivacyError} The url isnâ€™t available because of the videoâ€™s privacy setting.
         */
        /**
         * Get the vimeo.com url for the video.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @return {GetVideoUrlPromise}
         */

    }, {
        key: 'getVideoUrl',
        value: function getVideoUrl() {
            return this.get('videoUrl');
        }

        /**
         * A promise to get the volume level of the player.
         *
         * @promise GetVolumePromise
         * @fulfill {number} The volume level of the player on a scale from 0 to 1.
         */
        /**
         * Get the current volume level of the player on a scale from `0` to `1`.
         *
         * Most mobile devices do not support an independent volume from the
         * system volume. In those cases, this method will always return `1`.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @return {GetVolumePromise}
         */

    }, {
        key: 'getVolume',
        value: function getVolume() {
            return this.get('volume');
        }

        /**
         * A promise to set the volume level of the player.
         *
         * @promise SetVolumePromise
         * @fulfill {number} The volume was set.
         * @reject {RangeError} The volume was less than 0 or greater than 1.
         */
        /**
         * Set the volume of the player on a scale from `0` to `1`. When set
         * via the API, the volume level will not be synchronized to other
         * players or stored as the viewerâ€™s preference.
         *
         * Most mobile devices do not support setting the volume. An error will
         * *not* be triggered in that situation.
         *
         * @author Brad Dougherty <brad@vimeo.com>
         * @param {number} volume
         * @return {SetVolumePromise}
         */

    }, {
        key: 'setVolume',
        value: function setVolume(volume) {
            return this.set('volume', volume);
        }
    }]);

    return Player;
}();

initializeEmbeds();

return Player;

})));

//# sourceMappingURL=player.js.map