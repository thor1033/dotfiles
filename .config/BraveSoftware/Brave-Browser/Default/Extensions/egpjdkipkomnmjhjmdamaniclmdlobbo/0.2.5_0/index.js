/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/event-lite/event-lite.js":
/*!***********************************************!*\
  !*** ./node_modules/event-lite/event-lite.js ***!
  \***********************************************/
/***/ ((module) => {

/**
 * event-lite.js - Light-weight EventEmitter (less than 1KB when gzipped)
 *
 * @copyright Yusuke Kawasaki
 * @license MIT
 * @constructor
 * @see https://github.com/kawanet/event-lite
 * @see http://kawanet.github.io/event-lite/EventLite.html
 * @example
 * var EventLite = require("event-lite");
 *
 * function MyClass() {...}             // your class
 *
 * EventLite.mixin(MyClass.prototype);  // import event methods
 *
 * var obj = new MyClass();
 * obj.on("foo", function() {...});     // add event listener
 * obj.once("bar", function() {...});   // add one-time event listener
 * obj.emit("foo");                     // dispatch event
 * obj.emit("bar");                     // dispatch another event
 * obj.off("foo");                      // remove event listener
 */

function EventLite() {
  if (!(this instanceof EventLite)) return new EventLite();
}

(function(EventLite) {
  // export the class for node.js
  if (true) module.exports = EventLite;

  // property name to hold listeners
  var LISTENERS = "listeners";

  // methods to export
  var methods = {
    on: on,
    once: once,
    off: off,
    emit: emit
  };

  // mixin to self
  mixin(EventLite.prototype);

  // export mixin function
  EventLite.mixin = mixin;

  /**
   * Import on(), once(), off() and emit() methods into target object.
   *
   * @function EventLite.mixin
   * @param target {Prototype}
   */

  function mixin(target) {
    for (var key in methods) {
      target[key] = methods[key];
    }
    return target;
  }

  /**
   * Add an event listener.
   *
   * @function EventLite.prototype.on
   * @param type {string}
   * @param func {Function}
   * @returns {EventLite} Self for method chaining
   */

  function on(type, func) {
    getListeners(this, type).push(func);
    return this;
  }

  /**
   * Add one-time event listener.
   *
   * @function EventLite.prototype.once
   * @param type {string}
   * @param func {Function}
   * @returns {EventLite} Self for method chaining
   */

  function once(type, func) {
    var that = this;
    wrap.originalListener = func;
    getListeners(that, type).push(wrap);
    return that;

    function wrap() {
      off.call(that, type, wrap);
      func.apply(this, arguments);
    }
  }

  /**
   * Remove an event listener.
   *
   * @function EventLite.prototype.off
   * @param [type] {string}
   * @param [func] {Function}
   * @returns {EventLite} Self for method chaining
   */

  function off(type, func) {
    var that = this;
    var listners;
    if (!arguments.length) {
      delete that[LISTENERS];
    } else if (!func) {
      listners = that[LISTENERS];
      if (listners) {
        delete listners[type];
        if (!Object.keys(listners).length) return off.call(that);
      }
    } else {
      listners = getListeners(that, type, true);
      if (listners) {
        listners = listners.filter(ne);
        if (!listners.length) return off.call(that, type);
        that[LISTENERS][type] = listners;
      }
    }
    return that;

    function ne(test) {
      return test !== func && test.originalListener !== func;
    }
  }

  /**
   * Dispatch (trigger) an event.
   *
   * @function EventLite.prototype.emit
   * @param type {string}
   * @param [value] {*}
   * @returns {boolean} True when a listener received the event
   */

  function emit(type, value) {
    var that = this;
    var listeners = getListeners(that, type, true);
    if (!listeners) return false;
    var arglen = arguments.length;
    if (arglen === 1) {
      listeners.forEach(zeroarg);
    } else if (arglen === 2) {
      listeners.forEach(onearg);
    } else {
      var args = Array.prototype.slice.call(arguments, 1);
      listeners.forEach(moreargs);
    }
    return !!listeners.length;

    function zeroarg(func) {
      func.call(that);
    }

    function onearg(func) {
      func.call(that, value);
    }

    function moreargs(func) {
      func.apply(that, args);
    }
  }

  /**
   * @ignore
   */

  function getListeners(that, type, readonly) {
    if (readonly && !that[LISTENERS]) return;
    var listeners = that[LISTENERS] || (that[LISTENERS] = {});
    return listeners[type] || (listeners[type] = []);
  }

})(EventLite);


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/webextension-polyfill/dist/browser-polyfill.js":
/*!*********************************************************************!*\
  !*** ./node_modules/webextension-polyfill/dist/browser-polyfill.js ***!
  \*********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

/* provided dependency */ var browser = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*** IMPORTS FROM imports-loader ***/

browser = undefined;

(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (module) {
  /* webextension-polyfill - v0.7.0 - Tue Nov 10 2020 20:24:04 */

  /* -*- Mode: indent-tabs-mode: nil; js-indent-level: 2 -*- */

  /* vim: set sts=2 sw=2 et tw=80: */

  /* This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
  "use strict";

  if (typeof browser === "undefined" || Object.getPrototypeOf(browser) !== Object.prototype) {
    const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
    const SEND_RESPONSE_DEPRECATION_WARNING = "Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)"; // Wrapping the bulk of this polyfill in a one-time-use function is a minor
    // optimization for Firefox. Since Spidermonkey does not fully parse the
    // contents of a function until the first time it's called, and since it will
    // never actually need to be called, this allows the polyfill to be included
    // in Firefox nearly for free.

    const wrapAPIs = extensionAPIs => {
      // NOTE: apiMetadata is associated to the content of the api-metadata.json file
      // at build time by replacing the following "include" with the content of the
      // JSON file.
      const apiMetadata = {
        "alarms": {
          "clear": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "clearAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "get": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "bookmarks": {
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getChildren": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getRecent": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getSubTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTree": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "browserAction": {
          "disable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "enable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "getBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getBadgeText": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "openPopup": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setBadgeText": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "browsingData": {
          "remove": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "removeCache": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCookies": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeDownloads": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFormData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeHistory": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeLocalStorage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePasswords": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePluginData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "settings": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "commands": {
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "contextMenus": {
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "cookies": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAllCookieStores": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "set": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "devtools": {
          "inspectedWindow": {
            "eval": {
              "minArgs": 1,
              "maxArgs": 2,
              "singleCallbackArg": false
            }
          },
          "panels": {
            "create": {
              "minArgs": 3,
              "maxArgs": 3,
              "singleCallbackArg": true
            },
            "elements": {
              "createSidebarPane": {
                "minArgs": 1,
                "maxArgs": 1
              }
            }
          }
        },
        "downloads": {
          "cancel": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "download": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "erase": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFileIcon": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "open": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "pause": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFile": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "resume": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "extension": {
          "isAllowedFileSchemeAccess": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "isAllowedIncognitoAccess": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "history": {
          "addUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "deleteRange": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getVisits": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "i18n": {
          "detectLanguage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAcceptLanguages": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "identity": {
          "launchWebAuthFlow": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "idle": {
          "queryState": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "management": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getSelf": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setEnabled": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "uninstallSelf": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "notifications": {
          "clear": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPermissionLevel": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "pageAction": {
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "hide": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "permissions": {
          "contains": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "request": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "runtime": {
          "getBackgroundPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPlatformInfo": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "openOptionsPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "requestUpdateCheck": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "sendMessage": {
            "minArgs": 1,
            "maxArgs": 3
          },
          "sendNativeMessage": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "setUninstallURL": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "sessions": {
          "getDevices": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getRecentlyClosed": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "restore": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "storage": {
          "local": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "managed": {
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            }
          },
          "sync": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          }
        },
        "tabs": {
          "captureVisibleTab": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "detectLanguage": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "discard": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "duplicate": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "executeScript": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getZoom": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getZoomSettings": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "goBack": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "goForward": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "highlight": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "insertCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "query": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "reload": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "sendMessage": {
            "minArgs": 2,
            "maxArgs": 3
          },
          "setZoom": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "setZoomSettings": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "update": {
            "minArgs": 1,
            "maxArgs": 2
          }
        },
        "topSites": {
          "get": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "webNavigation": {
          "getAllFrames": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFrame": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "webRequest": {
          "handlerBehaviorChanged": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "windows": {
          "create": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getLastFocused": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        }
      };

      if (Object.keys(apiMetadata).length === 0) {
        throw new Error("api-metadata.json has not been included in browser-polyfill");
      }
      /**
       * A WeakMap subclass which creates and stores a value for any key which does
       * not exist when accessed, but behaves exactly as an ordinary WeakMap
       * otherwise.
       *
       * @param {function} createItem
       *        A function which will be called in order to create the value for any
       *        key which does not exist, the first time it is accessed. The
       *        function receives, as its only argument, the key being created.
       */


      class DefaultWeakMap extends WeakMap {
        constructor(createItem, items = undefined) {
          super(items);
          this.createItem = createItem;
        }

        get(key) {
          if (!this.has(key)) {
            this.set(key, this.createItem(key));
          }

          return super.get(key);
        }

      }
      /**
       * Returns true if the given object is an object with a `then` method, and can
       * therefore be assumed to behave as a Promise.
       *
       * @param {*} value The value to test.
       * @returns {boolean} True if the value is thenable.
       */


      const isThenable = value => {
        return value && typeof value === "object" && typeof value.then === "function";
      };
      /**
       * Creates and returns a function which, when called, will resolve or reject
       * the given promise based on how it is called:
       *
       * - If, when called, `chrome.runtime.lastError` contains a non-null object,
       *   the promise is rejected with that value.
       * - If the function is called with exactly one argument, the promise is
       *   resolved to that value.
       * - Otherwise, the promise is resolved to an array containing all of the
       *   function's arguments.
       *
       * @param {object} promise
       *        An object containing the resolution and rejection functions of a
       *        promise.
       * @param {function} promise.resolve
       *        The promise's resolution function.
       * @param {function} promise.rejection
       *        The promise's rejection function.
       * @param {object} metadata
       *        Metadata about the wrapped method which has created the callback.
       * @param {integer} metadata.maxResolvedArgs
       *        The maximum number of arguments which may be passed to the
       *        callback created by the wrapped async function.
       *
       * @returns {function}
       *        The generated callback function.
       */


      const makeCallback = (promise, metadata) => {
        return (...callbackArgs) => {
          if (extensionAPIs.runtime.lastError) {
            promise.reject(extensionAPIs.runtime.lastError);
          } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
            promise.resolve(callbackArgs[0]);
          } else {
            promise.resolve(callbackArgs);
          }
        };
      };

      const pluralizeArguments = numArgs => numArgs == 1 ? "argument" : "arguments";
      /**
       * Creates a wrapper function for a method with the given name and metadata.
       *
       * @param {string} name
       *        The name of the method which is being wrapped.
       * @param {object} metadata
       *        Metadata about the method being wrapped.
       * @param {integer} metadata.minArgs
       *        The minimum number of arguments which must be passed to the
       *        function. If called with fewer than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {integer} metadata.maxArgs
       *        The maximum number of arguments which may be passed to the
       *        function. If called with more than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {integer} metadata.maxResolvedArgs
       *        The maximum number of arguments which may be passed to the
       *        callback created by the wrapped async function.
       *
       * @returns {function(object, ...*)}
       *       The generated wrapper function.
       */


      const wrapAsyncFunction = (name, metadata) => {
        return function asyncFunctionWrapper(target, ...args) {
          if (args.length < metadata.minArgs) {
            throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
          }

          if (args.length > metadata.maxArgs) {
            throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
          }

          return new Promise((resolve, reject) => {
            if (metadata.fallbackToNoCallback) {
              // This API method has currently no callback on Chrome, but it return a promise on Firefox,
              // and so the polyfill will try to call it with a callback first, and it will fallback
              // to not passing the callback if the first call fails.
              try {
                target[name](...args, makeCallback({
                  resolve,
                  reject
                }, metadata));
              } catch (cbError) {
                console.warn(`${name} API method doesn't seem to support the callback parameter, ` + "falling back to call it without a callback: ", cbError);
                target[name](...args); // Update the API method metadata, so that the next API calls will not try to
                // use the unsupported callback anymore.

                metadata.fallbackToNoCallback = false;
                metadata.noCallback = true;
                resolve();
              }
            } else if (metadata.noCallback) {
              target[name](...args);
              resolve();
            } else {
              target[name](...args, makeCallback({
                resolve,
                reject
              }, metadata));
            }
          });
        };
      };
      /**
       * Wraps an existing method of the target object, so that calls to it are
       * intercepted by the given wrapper function. The wrapper function receives,
       * as its first argument, the original `target` object, followed by each of
       * the arguments passed to the original method.
       *
       * @param {object} target
       *        The original target object that the wrapped method belongs to.
       * @param {function} method
       *        The method being wrapped. This is used as the target of the Proxy
       *        object which is created to wrap the method.
       * @param {function} wrapper
       *        The wrapper function which is called in place of a direct invocation
       *        of the wrapped method.
       *
       * @returns {Proxy<function>}
       *        A Proxy object for the given method, which invokes the given wrapper
       *        method in its place.
       */


      const wrapMethod = (target, method, wrapper) => {
        return new Proxy(method, {
          apply(targetMethod, thisObj, args) {
            return wrapper.call(thisObj, target, ...args);
          }

        });
      };

      let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
      /**
       * Wraps an object in a Proxy which intercepts and wraps certain methods
       * based on the given `wrappers` and `metadata` objects.
       *
       * @param {object} target
       *        The target object to wrap.
       *
       * @param {object} [wrappers = {}]
       *        An object tree containing wrapper functions for special cases. Any
       *        function present in this object tree is called in place of the
       *        method in the same location in the `target` object tree. These
       *        wrapper methods are invoked as described in {@see wrapMethod}.
       *
       * @param {object} [metadata = {}]
       *        An object tree containing metadata used to automatically generate
       *        Promise-based wrapper functions for asynchronous. Any function in
       *        the `target` object tree which has a corresponding metadata object
       *        in the same location in the `metadata` tree is replaced with an
       *        automatically-generated wrapper function, as described in
       *        {@see wrapAsyncFunction}
       *
       * @returns {Proxy<object>}
       */

      const wrapObject = (target, wrappers = {}, metadata = {}) => {
        let cache = Object.create(null);
        let handlers = {
          has(proxyTarget, prop) {
            return prop in target || prop in cache;
          },

          get(proxyTarget, prop, receiver) {
            if (prop in cache) {
              return cache[prop];
            }

            if (!(prop in target)) {
              return undefined;
            }

            let value = target[prop];

            if (typeof value === "function") {
              // This is a method on the underlying object. Check if we need to do
              // any wrapping.
              if (typeof wrappers[prop] === "function") {
                // We have a special-case wrapper for this method.
                value = wrapMethod(target, target[prop], wrappers[prop]);
              } else if (hasOwnProperty(metadata, prop)) {
                // This is an async method that we have metadata for. Create a
                // Promise wrapper for it.
                let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                value = wrapMethod(target, target[prop], wrapper);
              } else {
                // This is a method that we don't know or care about. Return the
                // original method, bound to the underlying object.
                value = value.bind(target);
              }
            } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
              // This is an object that we need to do some wrapping for the children
              // of. Create a sub-object wrapper for it with the appropriate child
              // metadata.
              value = wrapObject(value, wrappers[prop], metadata[prop]);
            } else if (hasOwnProperty(metadata, "*")) {
              // Wrap all properties in * namespace.
              value = wrapObject(value, wrappers[prop], metadata["*"]);
            } else {
              // We don't need to do any wrapping for this property,
              // so just forward all access to the underlying object.
              Object.defineProperty(cache, prop, {
                configurable: true,
                enumerable: true,

                get() {
                  return target[prop];
                },

                set(value) {
                  target[prop] = value;
                }

              });
              return value;
            }

            cache[prop] = value;
            return value;
          },

          set(proxyTarget, prop, value, receiver) {
            if (prop in cache) {
              cache[prop] = value;
            } else {
              target[prop] = value;
            }

            return true;
          },

          defineProperty(proxyTarget, prop, desc) {
            return Reflect.defineProperty(cache, prop, desc);
          },

          deleteProperty(proxyTarget, prop) {
            return Reflect.deleteProperty(cache, prop);
          }

        }; // Per contract of the Proxy API, the "get" proxy handler must return the
        // original value of the target if that value is declared read-only and
        // non-configurable. For this reason, we create an object with the
        // prototype set to `target` instead of using `target` directly.
        // Otherwise we cannot return a custom object for APIs that
        // are declared read-only and non-configurable, such as `chrome.devtools`.
        //
        // The proxy handlers themselves will still use the original `target`
        // instead of the `proxyTarget`, so that the methods and properties are
        // dereferenced via the original targets.

        let proxyTarget = Object.create(target);
        return new Proxy(proxyTarget, handlers);
      };
      /**
       * Creates a set of wrapper functions for an event object, which handles
       * wrapping of listener functions that those messages are passed.
       *
       * A single wrapper is created for each listener function, and stored in a
       * map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
       * retrieve the original wrapper, so that  attempts to remove a
       * previously-added listener work as expected.
       *
       * @param {DefaultWeakMap<function, function>} wrapperMap
       *        A DefaultWeakMap object which will create the appropriate wrapper
       *        for a given listener function when one does not exist, and retrieve
       *        an existing one when it does.
       *
       * @returns {object}
       */


      const wrapEvent = wrapperMap => ({
        addListener(target, listener, ...args) {
          target.addListener(wrapperMap.get(listener), ...args);
        },

        hasListener(target, listener) {
          return target.hasListener(wrapperMap.get(listener));
        },

        removeListener(target, listener) {
          target.removeListener(wrapperMap.get(listener));
        }

      }); // Keep track if the deprecation warning has been logged at least once.


      let loggedSendResponseDeprecationWarning = false;
      const onMessageWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }
        /**
         * Wraps a message listener function so that it may send responses based on
         * its return value, rather than by returning a sentinel value and calling a
         * callback. If the listener function returns a Promise, the response is
         * sent when the promise either resolves or rejects.
         *
         * @param {*} message
         *        The message sent by the other end of the channel.
         * @param {object} sender
         *        Details about the sender of the message.
         * @param {function(*)} sendResponse
         *        A callback which, when called with an arbitrary argument, sends
         *        that value as a response.
         * @returns {boolean}
         *        True if the wrapped listener returned a Promise, which will later
         *        yield a response. False otherwise.
         */


        return function onMessage(message, sender, sendResponse) {
          let didCallSendResponse = false;
          let wrappedSendResponse;
          let sendResponsePromise = new Promise(resolve => {
            wrappedSendResponse = function (response) {
              if (!loggedSendResponseDeprecationWarning) {
                console.warn(SEND_RESPONSE_DEPRECATION_WARNING, new Error().stack);
                loggedSendResponseDeprecationWarning = true;
              }

              didCallSendResponse = true;
              resolve(response);
            };
          });
          let result;

          try {
            result = listener(message, sender, wrappedSendResponse);
          } catch (err) {
            result = Promise.reject(err);
          }

          const isResultThenable = result !== true && isThenable(result); // If the listener didn't returned true or a Promise, or called
          // wrappedSendResponse synchronously, we can exit earlier
          // because there will be no response sent from this listener.

          if (result !== true && !isResultThenable && !didCallSendResponse) {
            return false;
          } // A small helper to send the message if the promise resolves
          // and an error if the promise rejects (a wrapped sendMessage has
          // to translate the message into a resolved promise or a rejected
          // promise).


          const sendPromisedResult = promise => {
            promise.then(msg => {
              // send the message value.
              sendResponse(msg);
            }, error => {
              // Send a JSON representation of the error if the rejected value
              // is an instance of error, or the object itself otherwise.
              let message;

              if (error && (error instanceof Error || typeof error.message === "string")) {
                message = error.message;
              } else {
                message = "An unexpected error occurred";
              }

              sendResponse({
                __mozWebExtensionPolyfillReject__: true,
                message
              });
            }).catch(err => {
              // Print an error on the console if unable to send the response.
              console.error("Failed to send onMessage rejected reply", err);
            });
          }; // If the listener returned a Promise, send the resolved value as a
          // result, otherwise wait the promise related to the wrappedSendResponse
          // callback to resolve and send it as a response.


          if (isResultThenable) {
            sendPromisedResult(result);
          } else {
            sendPromisedResult(sendResponsePromise);
          } // Let Chrome know that the listener is replying.


          return true;
        };
      });

      const wrappedSendMessageCallback = ({
        reject,
        resolve
      }, reply) => {
        if (extensionAPIs.runtime.lastError) {
          // Detect when none of the listeners replied to the sendMessage call and resolve
          // the promise to undefined as in Firefox.
          // See https://github.com/mozilla/webextension-polyfill/issues/130
          if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
            resolve();
          } else {
            reject(extensionAPIs.runtime.lastError);
          }
        } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
          // Convert back the JSON representation of the error into
          // an Error instance.
          reject(new Error(reply.message));
        } else {
          resolve(reply);
        }
      };

      const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
        if (args.length < metadata.minArgs) {
          throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
        }

        if (args.length > metadata.maxArgs) {
          throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
        }

        return new Promise((resolve, reject) => {
          const wrappedCb = wrappedSendMessageCallback.bind(null, {
            resolve,
            reject
          });
          args.push(wrappedCb);
          apiNamespaceObj.sendMessage(...args);
        });
      };

      const staticWrappers = {
        runtime: {
          onMessage: wrapEvent(onMessageWrappers),
          onMessageExternal: wrapEvent(onMessageWrappers),
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
            minArgs: 1,
            maxArgs: 3
          })
        },
        tabs: {
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
            minArgs: 2,
            maxArgs: 3
          })
        }
      };
      const settingMetadata = {
        clear: {
          minArgs: 1,
          maxArgs: 1
        },
        get: {
          minArgs: 1,
          maxArgs: 1
        },
        set: {
          minArgs: 1,
          maxArgs: 1
        }
      };
      apiMetadata.privacy = {
        network: {
          "*": settingMetadata
        },
        services: {
          "*": settingMetadata
        },
        websites: {
          "*": settingMetadata
        }
      };
      return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
    };

    if (typeof chrome != "object" || !chrome || !chrome.runtime || !chrome.runtime.id) {
      throw new Error("This script should only be loaded in a browser extension.");
    } // The build process adds a UMD wrapper around this file, which makes the
    // `module` variable available.


    module.exports = wrapAPIs(chrome);
  } else {
    module.exports = browser;
  }
});
//# sourceMappingURL=browser-polyfill.js.map


/***/ }),

/***/ "./node_modules/int64-buffer/int64-buffer.js":
/*!***************************************************!*\
  !*** ./node_modules/int64-buffer/int64-buffer.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports) {

// int64-buffer.js

/*jshint -W018 */ // Confusing use of '!'.
/*jshint -W030 */ // Expected an assignment or function call and instead saw an expression.
/*jshint -W093 */ // Did you mean to return a conditional instead of an assignment?

var Uint64BE, Int64BE, Uint64LE, Int64LE;

!function(exports) {
  // constants

  var UNDEFINED = "undefined";
  var BUFFER = (UNDEFINED !== typeof Buffer) && Buffer;
  var UINT8ARRAY = (UNDEFINED !== typeof Uint8Array) && Uint8Array;
  var ARRAYBUFFER = (UNDEFINED !== typeof ArrayBuffer) && ArrayBuffer;
  var ZERO = [0, 0, 0, 0, 0, 0, 0, 0];
  var isArray = Array.isArray || _isArray;
  var BIT32 = 4294967296;
  var BIT24 = 16777216;

  // storage class

  var storage; // Array;

  // generate classes

  Uint64BE = factory("Uint64BE", true, true);
  Int64BE = factory("Int64BE", true, false);
  Uint64LE = factory("Uint64LE", false, true);
  Int64LE = factory("Int64LE", false, false);

  // class factory

  function factory(name, bigendian, unsigned) {
    var posH = bigendian ? 0 : 4;
    var posL = bigendian ? 4 : 0;
    var pos0 = bigendian ? 0 : 3;
    var pos1 = bigendian ? 1 : 2;
    var pos2 = bigendian ? 2 : 1;
    var pos3 = bigendian ? 3 : 0;
    var fromPositive = bigendian ? fromPositiveBE : fromPositiveLE;
    var fromNegative = bigendian ? fromNegativeBE : fromNegativeLE;
    var proto = Int64.prototype;
    var isName = "is" + name;
    var _isInt64 = "_" + isName;

    // properties
    proto.buffer = void 0;
    proto.offset = 0;
    proto[_isInt64] = true;

    // methods
    proto.toNumber = toNumber;
    proto.toString = toString;
    proto.toJSON = toNumber;
    proto.toArray = toArray;

    // add .toBuffer() method only when Buffer available
    if (BUFFER) proto.toBuffer = toBuffer;

    // add .toArrayBuffer() method only when Uint8Array available
    if (UINT8ARRAY) proto.toArrayBuffer = toArrayBuffer;

    // isUint64BE, isInt64BE
    Int64[isName] = isInt64;

    // CommonJS
    exports[name] = Int64;

    return Int64;

    // constructor
    function Int64(buffer, offset, value, raddix) {
      if (!(this instanceof Int64)) return new Int64(buffer, offset, value, raddix);
      return init(this, buffer, offset, value, raddix);
    }

    // isUint64BE, isInt64BE
    function isInt64(b) {
      return !!(b && b[_isInt64]);
    }

    // initializer
    function init(that, buffer, offset, value, raddix) {
      if (UINT8ARRAY && ARRAYBUFFER) {
        if (buffer instanceof ARRAYBUFFER) buffer = new UINT8ARRAY(buffer);
        if (value instanceof ARRAYBUFFER) value = new UINT8ARRAY(value);
      }

      // Int64BE() style
      if (!buffer && !offset && !value && !storage) {
        // shortcut to initialize with zero
        that.buffer = newArray(ZERO, 0);
        return;
      }

      // Int64BE(value, raddix) style
      if (!isValidBuffer(buffer, offset)) {
        var _storage = storage || Array;
        raddix = offset;
        value = buffer;
        offset = 0;
        buffer = new _storage(8);
      }

      that.buffer = buffer;
      that.offset = offset |= 0;

      // Int64BE(buffer, offset) style
      if (UNDEFINED === typeof value) return;

      // Int64BE(buffer, offset, value, raddix) style
      if ("string" === typeof value) {
        fromString(buffer, offset, value, raddix || 10);
      } else if (isValidBuffer(value, raddix)) {
        fromArray(buffer, offset, value, raddix);
      } else if ("number" === typeof raddix) {
        writeInt32(buffer, offset + posH, value); // high
        writeInt32(buffer, offset + posL, raddix); // low
      } else if (value > 0) {
        fromPositive(buffer, offset, value); // positive
      } else if (value < 0) {
        fromNegative(buffer, offset, value); // negative
      } else {
        fromArray(buffer, offset, ZERO, 0); // zero, NaN and others
      }
    }

    function fromString(buffer, offset, str, raddix) {
      var pos = 0;
      var len = str.length;
      var high = 0;
      var low = 0;
      if (str[0] === "-") pos++;
      var sign = pos;
      while (pos < len) {
        var chr = parseInt(str[pos++], raddix);
        if (!(chr >= 0)) break; // NaN
        low = low * raddix + chr;
        high = high * raddix + Math.floor(low / BIT32);
        low %= BIT32;
      }
      if (sign) {
        high = ~high;
        if (low) {
          low = BIT32 - low;
        } else {
          high++;
        }
      }
      writeInt32(buffer, offset + posH, high);
      writeInt32(buffer, offset + posL, low);
    }

    function toNumber() {
      var buffer = this.buffer;
      var offset = this.offset;
      var high = readInt32(buffer, offset + posH);
      var low = readInt32(buffer, offset + posL);
      if (!unsigned) high |= 0; // a trick to get signed
      return high ? (high * BIT32 + low) : low;
    }

    function toString(radix) {
      var buffer = this.buffer;
      var offset = this.offset;
      var high = readInt32(buffer, offset + posH);
      var low = readInt32(buffer, offset + posL);
      var str = "";
      var sign = !unsigned && (high & 0x80000000);
      if (sign) {
        high = ~high;
        low = BIT32 - low;
      }
      radix = radix || 10;
      while (1) {
        var mod = (high % radix) * BIT32 + low;
        high = Math.floor(high / radix);
        low = Math.floor(mod / radix);
        str = (mod % radix).toString(radix) + str;
        if (!high && !low) break;
      }
      if (sign) {
        str = "-" + str;
      }
      return str;
    }

    function writeInt32(buffer, offset, value) {
      buffer[offset + pos3] = value & 255;
      value = value >> 8;
      buffer[offset + pos2] = value & 255;
      value = value >> 8;
      buffer[offset + pos1] = value & 255;
      value = value >> 8;
      buffer[offset + pos0] = value & 255;
    }

    function readInt32(buffer, offset) {
      return (buffer[offset + pos0] * BIT24) +
        (buffer[offset + pos1] << 16) +
        (buffer[offset + pos2] << 8) +
        buffer[offset + pos3];
    }
  }

  function toArray(raw) {
    var buffer = this.buffer;
    var offset = this.offset;
    storage = null; // Array
    if (raw !== false && offset === 0 && buffer.length === 8 && isArray(buffer)) return buffer;
    return newArray(buffer, offset);
  }

  function toBuffer(raw) {
    var buffer = this.buffer;
    var offset = this.offset;
    storage = BUFFER;
    if (raw !== false && offset === 0 && buffer.length === 8 && Buffer.isBuffer(buffer)) return buffer;
    var dest = new BUFFER(8);
    fromArray(dest, 0, buffer, offset);
    return dest;
  }

  function toArrayBuffer(raw) {
    var buffer = this.buffer;
    var offset = this.offset;
    var arrbuf = buffer.buffer;
    storage = UINT8ARRAY;
    if (raw !== false && offset === 0 && (arrbuf instanceof ARRAYBUFFER) && arrbuf.byteLength === 8) return arrbuf;
    var dest = new UINT8ARRAY(8);
    fromArray(dest, 0, buffer, offset);
    return dest.buffer;
  }

  function isValidBuffer(buffer, offset) {
    var len = buffer && buffer.length;
    offset |= 0;
    return len && (offset + 8 <= len) && ("string" !== typeof buffer[offset]);
  }

  function fromArray(destbuf, destoff, srcbuf, srcoff) {
    destoff |= 0;
    srcoff |= 0;
    for (var i = 0; i < 8; i++) {
      destbuf[destoff++] = srcbuf[srcoff++] & 255;
    }
  }

  function newArray(buffer, offset) {
    return Array.prototype.slice.call(buffer, offset, offset + 8);
  }

  function fromPositiveBE(buffer, offset, value) {
    var pos = offset + 8;
    while (pos > offset) {
      buffer[--pos] = value & 255;
      value /= 256;
    }
  }

  function fromNegativeBE(buffer, offset, value) {
    var pos = offset + 8;
    value++;
    while (pos > offset) {
      buffer[--pos] = ((-value) & 255) ^ 255;
      value /= 256;
    }
  }

  function fromPositiveLE(buffer, offset, value) {
    var end = offset + 8;
    while (offset < end) {
      buffer[offset++] = value & 255;
      value /= 256;
    }
  }

  function fromNegativeLE(buffer, offset, value) {
    var end = offset + 8;
    value++;
    while (offset < end) {
      buffer[offset++] = ((-value) & 255) ^ 255;
      value /= 256;
    }
  }

  // https://github.com/retrofox/is-array
  function _isArray(val) {
    return !!val && "[object Array]" == Object.prototype.toString.call(val);
  }

}( true && typeof exports.nodeName !== 'string' ? exports : (this || {}));


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/***/ ((module) => {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/browser.js":
/*!**************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/browser.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// browser.js

exports.encode = __webpack_require__(/*! ./encode */ "./node_modules/msgpack-lite/lib/encode.js").encode;
exports.decode = __webpack_require__(/*! ./decode */ "./node_modules/msgpack-lite/lib/decode.js").decode;

exports.Encoder = __webpack_require__(/*! ./encoder */ "./node_modules/msgpack-lite/lib/encoder.js").Encoder;
exports.Decoder = __webpack_require__(/*! ./decoder */ "./node_modules/msgpack-lite/lib/decoder.js").Decoder;

exports.createCodec = __webpack_require__(/*! ./ext */ "./node_modules/msgpack-lite/lib/ext.js").createCodec;
exports.codec = __webpack_require__(/*! ./codec */ "./node_modules/msgpack-lite/lib/codec.js").codec;


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/buffer-global.js":
/*!********************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/buffer-global.js ***!
  \********************************************************/
/***/ (function(module) {

/* globals Buffer */

module.exports =
  c(("undefined" !== typeof Buffer) && Buffer) ||
  c(this.Buffer) ||
  c(("undefined" !== typeof window) && window.Buffer) ||
  this.Buffer;

function c(B) {
  return B && B.isBuffer && B;
}

/***/ }),

/***/ "./node_modules/msgpack-lite/lib/buffer-lite.js":
/*!******************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/buffer-lite.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

// buffer-lite.js

var MAXBUFLEN = 8192;

exports.copy = copy;
exports.toString = toString;
exports.write = write;

/**
 * Buffer.prototype.write()
 *
 * @param string {String}
 * @param [offset] {Number}
 * @returns {Number}
 */

function write(string, offset) {
  var buffer = this;
  var index = offset || (offset |= 0);
  var length = string.length;
  var chr = 0;
  var i = 0;
  while (i < length) {
    chr = string.charCodeAt(i++);

    if (chr < 128) {
      buffer[index++] = chr;
    } else if (chr < 0x800) {
      // 2 bytes
      buffer[index++] = 0xC0 | (chr >>> 6);
      buffer[index++] = 0x80 | (chr & 0x3F);
    } else if (chr < 0xD800 || chr > 0xDFFF) {
      // 3 bytes
      buffer[index++] = 0xE0 | (chr  >>> 12);
      buffer[index++] = 0x80 | ((chr >>> 6)  & 0x3F);
      buffer[index++] = 0x80 | (chr          & 0x3F);
    } else {
      // 4 bytes - surrogate pair
      chr = (((chr - 0xD800) << 10) | (string.charCodeAt(i++) - 0xDC00)) + 0x10000;
      buffer[index++] = 0xF0 | (chr >>> 18);
      buffer[index++] = 0x80 | ((chr >>> 12) & 0x3F);
      buffer[index++] = 0x80 | ((chr >>> 6)  & 0x3F);
      buffer[index++] = 0x80 | (chr          & 0x3F);
    }
  }
  return index - offset;
}

/**
 * Buffer.prototype.toString()
 *
 * @param [encoding] {String} ignored
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {String}
 */

function toString(encoding, start, end) {
  var buffer = this;
  var index = start|0;
  if (!end) end = buffer.length;
  var string = '';
  var chr = 0;

  while (index < end) {
    chr = buffer[index++];
    if (chr < 128) {
      string += String.fromCharCode(chr);
      continue;
    }

    if ((chr & 0xE0) === 0xC0) {
      // 2 bytes
      chr = (chr & 0x1F) << 6 |
            (buffer[index++] & 0x3F);

    } else if ((chr & 0xF0) === 0xE0) {
      // 3 bytes
      chr = (chr & 0x0F)             << 12 |
            (buffer[index++] & 0x3F) << 6  |
            (buffer[index++] & 0x3F);

    } else if ((chr & 0xF8) === 0xF0) {
      // 4 bytes
      chr = (chr & 0x07)             << 18 |
            (buffer[index++] & 0x3F) << 12 |
            (buffer[index++] & 0x3F) << 6  |
            (buffer[index++] & 0x3F);
    }

    if (chr >= 0x010000) {
      // A surrogate pair
      chr -= 0x010000;

      string += String.fromCharCode((chr >>> 10) + 0xD800, (chr & 0x3FF) + 0xDC00);
    } else {
      string += String.fromCharCode(chr);
    }
  }

  return string;
}

/**
 * Buffer.prototype.copy()
 *
 * @param target {Buffer}
 * @param [targetStart] {Number}
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {number}
 */

function copy(target, targetStart, start, end) {
  var i;
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (!targetStart) targetStart = 0;
  var len = end - start;

  if (target === this && start < targetStart && targetStart < end) {
    // descending
    for (i = len - 1; i >= 0; i--) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    // ascending
    for (i = 0; i < len; i++) {
      target[i + targetStart] = this[i + start];
    }
  }

  return len;
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/bufferish-array.js":
/*!**********************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/bufferish-array.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// bufferish-array.js

var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");

var exports = module.exports = alloc(0);

exports.alloc = alloc;
exports.concat = Bufferish.concat;
exports.from = from;

/**
 * @param size {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function alloc(size) {
  return new Array(size);
}

/**
 * @param value {Array|ArrayBuffer|Buffer|String}
 * @returns {Array}
 */

function from(value) {
  if (!Bufferish.isBuffer(value) && Bufferish.isView(value)) {
    // TypedArray to Uint8Array
    value = Bufferish.Uint8Array.from(value);
  } else if (Bufferish.isArrayBuffer(value)) {
    // ArrayBuffer to Uint8Array
    value = new Uint8Array(value);
  } else if (typeof value === "string") {
    // String to Array
    return Bufferish.from.call(exports, value);
  } else if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }

  // Array-like to Array
  return Array.prototype.slice.call(value);
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/bufferish-buffer.js":
/*!***********************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/bufferish-buffer.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// bufferish-buffer.js

var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");
var Buffer = Bufferish.global;

var exports = module.exports = Bufferish.hasBuffer ? alloc(0) : [];

exports.alloc = Bufferish.hasBuffer && Buffer.alloc || alloc;
exports.concat = Bufferish.concat;
exports.from = from;

/**
 * @param size {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function alloc(size) {
  return new Buffer(size);
}

/**
 * @param value {Array|ArrayBuffer|Buffer|String}
 * @returns {Buffer}
 */

function from(value) {
  if (!Bufferish.isBuffer(value) && Bufferish.isView(value)) {
    // TypedArray to Uint8Array
    value = Bufferish.Uint8Array.from(value);
  } else if (Bufferish.isArrayBuffer(value)) {
    // ArrayBuffer to Uint8Array
    value = new Uint8Array(value);
  } else if (typeof value === "string") {
    // String to Buffer
    return Bufferish.from.call(exports, value);
  } else if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }

  // Array-like to Buffer
  if (Buffer.from && Buffer.from.length !== 1) {
    return Buffer.from(value); // node v6+
  } else {
    return new Buffer(value); // node v4
  }
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/bufferish-proto.js":
/*!**********************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/bufferish-proto.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// bufferish-proto.js

/* jshint eqnull:true */

var BufferLite = __webpack_require__(/*! ./buffer-lite */ "./node_modules/msgpack-lite/lib/buffer-lite.js");

exports.copy = copy;
exports.slice = slice;
exports.toString = toString;
exports.write = gen("write");

var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");
var Buffer = Bufferish.global;

var isBufferShim = Bufferish.hasBuffer && ("TYPED_ARRAY_SUPPORT" in Buffer);
var brokenTypedArray = isBufferShim && !Buffer.TYPED_ARRAY_SUPPORT;

/**
 * @param target {Buffer|Uint8Array|Array}
 * @param [targetStart] {Number}
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function copy(target, targetStart, start, end) {
  var thisIsBuffer = Bufferish.isBuffer(this);
  var targetIsBuffer = Bufferish.isBuffer(target);
  if (thisIsBuffer && targetIsBuffer) {
    // Buffer to Buffer
    return this.copy(target, targetStart, start, end);
  } else if (!brokenTypedArray && !thisIsBuffer && !targetIsBuffer &&
    Bufferish.isView(this) && Bufferish.isView(target)) {
    // Uint8Array to Uint8Array (except for minor some browsers)
    var buffer = (start || end != null) ? slice.call(this, start, end) : this;
    target.set(buffer, targetStart);
    return buffer.length;
  } else {
    // other cases
    return BufferLite.copy.call(this, target, targetStart, start, end);
  }
}

/**
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function slice(start, end) {
  // for Buffer, Uint8Array (except for minor some browsers) and Array
  var f = this.slice || (!brokenTypedArray && this.subarray);
  if (f) return f.call(this, start, end);

  // Uint8Array (for minor some browsers)
  var target = Bufferish.alloc.call(this, end - start);
  copy.call(this, target, 0, start, end);
  return target;
}

/**
 * Buffer.prototype.toString()
 *
 * @param [encoding] {String} ignored
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {String}
 */

function toString(encoding, start, end) {
  var f = (!isBufferShim && Bufferish.isBuffer(this)) ? this.toString : BufferLite.toString;
  return f.apply(this, arguments);
}

/**
 * @private
 */

function gen(method) {
  return wrap;

  function wrap() {
    var f = this[method] || BufferLite[method];
    return f.apply(this, arguments);
  }
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/bufferish-uint8array.js":
/*!***************************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/bufferish-uint8array.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// bufferish-uint8array.js

var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");

var exports = module.exports = Bufferish.hasArrayBuffer ? alloc(0) : [];

exports.alloc = alloc;
exports.concat = Bufferish.concat;
exports.from = from;

/**
 * @param size {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function alloc(size) {
  return new Uint8Array(size);
}

/**
 * @param value {Array|ArrayBuffer|Buffer|String}
 * @returns {Uint8Array}
 */

function from(value) {
  if (Bufferish.isView(value)) {
    // TypedArray to ArrayBuffer
    var byteOffset = value.byteOffset;
    var byteLength = value.byteLength;
    value = value.buffer;
    if (value.byteLength !== byteLength) {
      if (value.slice) {
        value = value.slice(byteOffset, byteOffset + byteLength);
      } else {
        // Android 4.1 does not have ArrayBuffer.prototype.slice
        value = new Uint8Array(value);
        if (value.byteLength !== byteLength) {
          // TypedArray to ArrayBuffer to Uint8Array to Array
          value = Array.prototype.slice.call(value, byteOffset, byteOffset + byteLength);
        }
      }
    }
  } else if (typeof value === "string") {
    // String to Uint8Array
    return Bufferish.from.call(exports, value);
  } else if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }

  return new Uint8Array(value);
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/bufferish.js":
/*!****************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/bufferish.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// bufferish.js

var Buffer = exports.global = __webpack_require__(/*! ./buffer-global */ "./node_modules/msgpack-lite/lib/buffer-global.js");
var hasBuffer = exports.hasBuffer = Buffer && !!Buffer.isBuffer;
var hasArrayBuffer = exports.hasArrayBuffer = ("undefined" !== typeof ArrayBuffer);

var isArray = exports.isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js");
exports.isArrayBuffer = hasArrayBuffer ? isArrayBuffer : _false;
var isBuffer = exports.isBuffer = hasBuffer ? Buffer.isBuffer : _false;
var isView = exports.isView = hasArrayBuffer ? (ArrayBuffer.isView || _is("ArrayBuffer", "buffer")) : _false;

exports.alloc = alloc;
exports.concat = concat;
exports.from = from;

var BufferArray = exports.Array = __webpack_require__(/*! ./bufferish-array */ "./node_modules/msgpack-lite/lib/bufferish-array.js");
var BufferBuffer = exports.Buffer = __webpack_require__(/*! ./bufferish-buffer */ "./node_modules/msgpack-lite/lib/bufferish-buffer.js");
var BufferUint8Array = exports.Uint8Array = __webpack_require__(/*! ./bufferish-uint8array */ "./node_modules/msgpack-lite/lib/bufferish-uint8array.js");
var BufferProto = exports.prototype = __webpack_require__(/*! ./bufferish-proto */ "./node_modules/msgpack-lite/lib/bufferish-proto.js");

/**
 * @param value {Array|ArrayBuffer|Buffer|String}
 * @returns {Buffer|Uint8Array|Array}
 */

function from(value) {
  if (typeof value === "string") {
    return fromString.call(this, value);
  } else {
    return auto(this).from(value);
  }
}

/**
 * @param size {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function alloc(size) {
  return auto(this).alloc(size);
}

/**
 * @param list {Array} array of (Buffer|Uint8Array|Array)s
 * @param [length]
 * @returns {Buffer|Uint8Array|Array}
 */

function concat(list, length) {
  if (!length) {
    length = 0;
    Array.prototype.forEach.call(list, dryrun);
  }
  var ref = (this !== exports) && this || list[0];
  var result = alloc.call(ref, length);
  var offset = 0;
  Array.prototype.forEach.call(list, append);
  return result;

  function dryrun(buffer) {
    length += buffer.length;
  }

  function append(buffer) {
    offset += BufferProto.copy.call(buffer, result, offset);
  }
}

var _isArrayBuffer = _is("ArrayBuffer");

function isArrayBuffer(value) {
  return (value instanceof ArrayBuffer) || _isArrayBuffer(value);
}

/**
 * @private
 */

function fromString(value) {
  var expected = value.length * 3;
  var that = alloc.call(this, expected);
  var actual = BufferProto.write.call(that, value);
  if (expected !== actual) {
    that = BufferProto.slice.call(that, 0, actual);
  }
  return that;
}

function auto(that) {
  return isBuffer(that) ? BufferBuffer
    : isView(that) ? BufferUint8Array
    : isArray(that) ? BufferArray
    : hasBuffer ? BufferBuffer
    : hasArrayBuffer ? BufferUint8Array
    : BufferArray;
}

function _false() {
  return false;
}

function _is(name, key) {
  /* jshint eqnull:true */
  name = "[object " + name + "]";
  return function(value) {
    return (value != null) && {}.toString.call(key ? value[key] : value) === name;
  };
}

/***/ }),

/***/ "./node_modules/msgpack-lite/lib/codec-base.js":
/*!*****************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/codec-base.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// codec-base.js

var IS_ARRAY = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js");

exports.createCodec = createCodec;
exports.install = install;
exports.filter = filter;

var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");

function Codec(options) {
  if (!(this instanceof Codec)) return new Codec(options);
  this.options = options;
  this.init();
}

Codec.prototype.init = function() {
  var options = this.options;

  if (options && options.uint8array) {
    this.bufferish = Bufferish.Uint8Array;
  }

  return this;
};

function install(props) {
  for (var key in props) {
    Codec.prototype[key] = add(Codec.prototype[key], props[key]);
  }
}

function add(a, b) {
  return (a && b) ? ab : (a || b);

  function ab() {
    a.apply(this, arguments);
    return b.apply(this, arguments);
  }
}

function join(filters) {
  filters = filters.slice();

  return function(value) {
    return filters.reduce(iterator, value);
  };

  function iterator(value, filter) {
    return filter(value);
  }
}

function filter(filter) {
  return IS_ARRAY(filter) ? join(filter) : filter;
}

// @public
// msgpack.createCodec()

function createCodec(options) {
  return new Codec(options);
}

// default shared codec

exports.preset = createCodec({preset: true});


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/codec.js":
/*!************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/codec.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// codec.js

// load both interfaces
__webpack_require__(/*! ./read-core */ "./node_modules/msgpack-lite/lib/read-core.js");
__webpack_require__(/*! ./write-core */ "./node_modules/msgpack-lite/lib/write-core.js");

// @public
// msgpack.codec.preset

exports.codec = {
  preset: __webpack_require__(/*! ./codec-base */ "./node_modules/msgpack-lite/lib/codec-base.js").preset
};


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/decode-buffer.js":
/*!********************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/decode-buffer.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// decode-buffer.js

exports.DecodeBuffer = DecodeBuffer;

var preset = __webpack_require__(/*! ./read-core */ "./node_modules/msgpack-lite/lib/read-core.js").preset;

var FlexDecoder = __webpack_require__(/*! ./flex-buffer */ "./node_modules/msgpack-lite/lib/flex-buffer.js").FlexDecoder;

FlexDecoder.mixin(DecodeBuffer.prototype);

function DecodeBuffer(options) {
  if (!(this instanceof DecodeBuffer)) return new DecodeBuffer(options);

  if (options) {
    this.options = options;
    if (options.codec) {
      var codec = this.codec = options.codec;
      if (codec.bufferish) this.bufferish = codec.bufferish;
    }
  }
}

DecodeBuffer.prototype.codec = preset;

DecodeBuffer.prototype.fetch = function() {
  return this.codec.decode(this);
};


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/decode.js":
/*!*************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/decode.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// decode.js

exports.decode = decode;

var DecodeBuffer = __webpack_require__(/*! ./decode-buffer */ "./node_modules/msgpack-lite/lib/decode-buffer.js").DecodeBuffer;

function decode(input, options) {
  var decoder = new DecodeBuffer(options);
  decoder.write(input);
  return decoder.read();
}

/***/ }),

/***/ "./node_modules/msgpack-lite/lib/decoder.js":
/*!**************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/decoder.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// decoder.js

exports.Decoder = Decoder;

var EventLite = __webpack_require__(/*! event-lite */ "./node_modules/event-lite/event-lite.js");
var DecodeBuffer = __webpack_require__(/*! ./decode-buffer */ "./node_modules/msgpack-lite/lib/decode-buffer.js").DecodeBuffer;

function Decoder(options) {
  if (!(this instanceof Decoder)) return new Decoder(options);
  DecodeBuffer.call(this, options);
}

Decoder.prototype = new DecodeBuffer();

EventLite.mixin(Decoder.prototype);

Decoder.prototype.decode = function(chunk) {
  if (arguments.length) this.write(chunk);
  this.flush();
};

Decoder.prototype.push = function(chunk) {
  this.emit("data", chunk);
};

Decoder.prototype.end = function(chunk) {
  this.decode(chunk);
  this.emit("end");
};


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/encode-buffer.js":
/*!********************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/encode-buffer.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// encode-buffer.js

exports.EncodeBuffer = EncodeBuffer;

var preset = __webpack_require__(/*! ./write-core */ "./node_modules/msgpack-lite/lib/write-core.js").preset;

var FlexEncoder = __webpack_require__(/*! ./flex-buffer */ "./node_modules/msgpack-lite/lib/flex-buffer.js").FlexEncoder;

FlexEncoder.mixin(EncodeBuffer.prototype);

function EncodeBuffer(options) {
  if (!(this instanceof EncodeBuffer)) return new EncodeBuffer(options);

  if (options) {
    this.options = options;
    if (options.codec) {
      var codec = this.codec = options.codec;
      if (codec.bufferish) this.bufferish = codec.bufferish;
    }
  }
}

EncodeBuffer.prototype.codec = preset;

EncodeBuffer.prototype.write = function(input) {
  this.codec.encode(this, input);
};


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/encode.js":
/*!*************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/encode.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// encode.js

exports.encode = encode;

var EncodeBuffer = __webpack_require__(/*! ./encode-buffer */ "./node_modules/msgpack-lite/lib/encode-buffer.js").EncodeBuffer;

function encode(input, options) {
  var encoder = new EncodeBuffer(options);
  encoder.write(input);
  return encoder.read();
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/encoder.js":
/*!**************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/encoder.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// encoder.js

exports.Encoder = Encoder;

var EventLite = __webpack_require__(/*! event-lite */ "./node_modules/event-lite/event-lite.js");
var EncodeBuffer = __webpack_require__(/*! ./encode-buffer */ "./node_modules/msgpack-lite/lib/encode-buffer.js").EncodeBuffer;

function Encoder(options) {
  if (!(this instanceof Encoder)) return new Encoder(options);
  EncodeBuffer.call(this, options);
}

Encoder.prototype = new EncodeBuffer();

EventLite.mixin(Encoder.prototype);

Encoder.prototype.encode = function(chunk) {
  this.write(chunk);
  this.emit("data", this.read());
};

Encoder.prototype.end = function(chunk) {
  if (arguments.length) this.encode(chunk);
  this.flush();
  this.emit("end");
};


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/ext-buffer.js":
/*!*****************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/ext-buffer.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// ext-buffer.js

exports.ExtBuffer = ExtBuffer;

var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");

function ExtBuffer(buffer, type) {
  if (!(this instanceof ExtBuffer)) return new ExtBuffer(buffer, type);
  this.buffer = Bufferish.from(buffer);
  this.type = type;
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/ext-packer.js":
/*!*****************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/ext-packer.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// ext-packer.js

exports.setExtPackers = setExtPackers;

var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");
var Buffer = Bufferish.global;
var packTypedArray = Bufferish.Uint8Array.from;
var _encode;

var ERROR_COLUMNS = {name: 1, message: 1, stack: 1, columnNumber: 1, fileName: 1, lineNumber: 1};

function setExtPackers(codec) {
  codec.addExtPacker(0x0E, Error, [packError, encode]);
  codec.addExtPacker(0x01, EvalError, [packError, encode]);
  codec.addExtPacker(0x02, RangeError, [packError, encode]);
  codec.addExtPacker(0x03, ReferenceError, [packError, encode]);
  codec.addExtPacker(0x04, SyntaxError, [packError, encode]);
  codec.addExtPacker(0x05, TypeError, [packError, encode]);
  codec.addExtPacker(0x06, URIError, [packError, encode]);

  codec.addExtPacker(0x0A, RegExp, [packRegExp, encode]);
  codec.addExtPacker(0x0B, Boolean, [packValueOf, encode]);
  codec.addExtPacker(0x0C, String, [packValueOf, encode]);
  codec.addExtPacker(0x0D, Date, [Number, encode]);
  codec.addExtPacker(0x0F, Number, [packValueOf, encode]);

  if ("undefined" !== typeof Uint8Array) {
    codec.addExtPacker(0x11, Int8Array, packTypedArray);
    codec.addExtPacker(0x12, Uint8Array, packTypedArray);
    codec.addExtPacker(0x13, Int16Array, packTypedArray);
    codec.addExtPacker(0x14, Uint16Array, packTypedArray);
    codec.addExtPacker(0x15, Int32Array, packTypedArray);
    codec.addExtPacker(0x16, Uint32Array, packTypedArray);
    codec.addExtPacker(0x17, Float32Array, packTypedArray);

    // PhantomJS/1.9.7 doesn't have Float64Array
    if ("undefined" !== typeof Float64Array) {
      codec.addExtPacker(0x18, Float64Array, packTypedArray);
    }

    // IE10 doesn't have Uint8ClampedArray
    if ("undefined" !== typeof Uint8ClampedArray) {
      codec.addExtPacker(0x19, Uint8ClampedArray, packTypedArray);
    }

    codec.addExtPacker(0x1A, ArrayBuffer, packTypedArray);
    codec.addExtPacker(0x1D, DataView, packTypedArray);
  }

  if (Bufferish.hasBuffer) {
    codec.addExtPacker(0x1B, Buffer, Bufferish.from);
  }
}

function encode(input) {
  if (!_encode) _encode = __webpack_require__(/*! ./encode */ "./node_modules/msgpack-lite/lib/encode.js").encode; // lazy load
  return _encode(input);
}

function packValueOf(value) {
  return (value).valueOf();
}

function packRegExp(value) {
  value = RegExp.prototype.toString.call(value).split("/");
  value.shift();
  var out = [value.pop()];
  out.unshift(value.join("/"));
  return out;
}

function packError(value) {
  var out = {};
  for (var key in ERROR_COLUMNS) {
    out[key] = value[key];
  }
  return out;
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/ext-unpacker.js":
/*!*******************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/ext-unpacker.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// ext-unpacker.js

exports.setExtUnpackers = setExtUnpackers;

var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");
var Buffer = Bufferish.global;
var _decode;

var ERROR_COLUMNS = {name: 1, message: 1, stack: 1, columnNumber: 1, fileName: 1, lineNumber: 1};

function setExtUnpackers(codec) {
  codec.addExtUnpacker(0x0E, [decode, unpackError(Error)]);
  codec.addExtUnpacker(0x01, [decode, unpackError(EvalError)]);
  codec.addExtUnpacker(0x02, [decode, unpackError(RangeError)]);
  codec.addExtUnpacker(0x03, [decode, unpackError(ReferenceError)]);
  codec.addExtUnpacker(0x04, [decode, unpackError(SyntaxError)]);
  codec.addExtUnpacker(0x05, [decode, unpackError(TypeError)]);
  codec.addExtUnpacker(0x06, [decode, unpackError(URIError)]);

  codec.addExtUnpacker(0x0A, [decode, unpackRegExp]);
  codec.addExtUnpacker(0x0B, [decode, unpackClass(Boolean)]);
  codec.addExtUnpacker(0x0C, [decode, unpackClass(String)]);
  codec.addExtUnpacker(0x0D, [decode, unpackClass(Date)]);
  codec.addExtUnpacker(0x0F, [decode, unpackClass(Number)]);

  if ("undefined" !== typeof Uint8Array) {
    codec.addExtUnpacker(0x11, unpackClass(Int8Array));
    codec.addExtUnpacker(0x12, unpackClass(Uint8Array));
    codec.addExtUnpacker(0x13, [unpackArrayBuffer, unpackClass(Int16Array)]);
    codec.addExtUnpacker(0x14, [unpackArrayBuffer, unpackClass(Uint16Array)]);
    codec.addExtUnpacker(0x15, [unpackArrayBuffer, unpackClass(Int32Array)]);
    codec.addExtUnpacker(0x16, [unpackArrayBuffer, unpackClass(Uint32Array)]);
    codec.addExtUnpacker(0x17, [unpackArrayBuffer, unpackClass(Float32Array)]);

    // PhantomJS/1.9.7 doesn't have Float64Array
    if ("undefined" !== typeof Float64Array) {
      codec.addExtUnpacker(0x18, [unpackArrayBuffer, unpackClass(Float64Array)]);
    }

    // IE10 doesn't have Uint8ClampedArray
    if ("undefined" !== typeof Uint8ClampedArray) {
      codec.addExtUnpacker(0x19, unpackClass(Uint8ClampedArray));
    }

    codec.addExtUnpacker(0x1A, unpackArrayBuffer);
    codec.addExtUnpacker(0x1D, [unpackArrayBuffer, unpackClass(DataView)]);
  }

  if (Bufferish.hasBuffer) {
    codec.addExtUnpacker(0x1B, unpackClass(Buffer));
  }
}

function decode(input) {
  if (!_decode) _decode = __webpack_require__(/*! ./decode */ "./node_modules/msgpack-lite/lib/decode.js").decode; // lazy load
  return _decode(input);
}

function unpackRegExp(value) {
  return RegExp.apply(null, value);
}

function unpackError(Class) {
  return function(value) {
    var out = new Class();
    for (var key in ERROR_COLUMNS) {
      out[key] = value[key];
    }
    return out;
  };
}

function unpackClass(Class) {
  return function(value) {
    return new Class(value);
  };
}

function unpackArrayBuffer(value) {
  return (new Uint8Array(value)).buffer;
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/ext.js":
/*!**********************************************!*\
  !*** ./node_modules/msgpack-lite/lib/ext.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// ext.js

// load both interfaces
__webpack_require__(/*! ./read-core */ "./node_modules/msgpack-lite/lib/read-core.js");
__webpack_require__(/*! ./write-core */ "./node_modules/msgpack-lite/lib/write-core.js");

exports.createCodec = __webpack_require__(/*! ./codec-base */ "./node_modules/msgpack-lite/lib/codec-base.js").createCodec;


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/flex-buffer.js":
/*!******************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/flex-buffer.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// flex-buffer.js

exports.FlexDecoder = FlexDecoder;
exports.FlexEncoder = FlexEncoder;

var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");

var MIN_BUFFER_SIZE = 2048;
var MAX_BUFFER_SIZE = 65536;
var BUFFER_SHORTAGE = "BUFFER_SHORTAGE";

function FlexDecoder() {
  if (!(this instanceof FlexDecoder)) return new FlexDecoder();
}

function FlexEncoder() {
  if (!(this instanceof FlexEncoder)) return new FlexEncoder();
}

FlexDecoder.mixin = mixinFactory(getDecoderMethods());
FlexDecoder.mixin(FlexDecoder.prototype);

FlexEncoder.mixin = mixinFactory(getEncoderMethods());
FlexEncoder.mixin(FlexEncoder.prototype);

function getDecoderMethods() {
  return {
    bufferish: Bufferish,
    write: write,
    fetch: fetch,
    flush: flush,
    push: push,
    pull: pull,
    read: read,
    reserve: reserve,
    offset: 0
  };

  function write(chunk) {
    var prev = this.offset ? Bufferish.prototype.slice.call(this.buffer, this.offset) : this.buffer;
    this.buffer = prev ? (chunk ? this.bufferish.concat([prev, chunk]) : prev) : chunk;
    this.offset = 0;
  }

  function flush() {
    while (this.offset < this.buffer.length) {
      var start = this.offset;
      var value;
      try {
        value = this.fetch();
      } catch (e) {
        if (e && e.message != BUFFER_SHORTAGE) throw e;
        // rollback
        this.offset = start;
        break;
      }
      this.push(value);
    }
  }

  function reserve(length) {
    var start = this.offset;
    var end = start + length;
    if (end > this.buffer.length) throw new Error(BUFFER_SHORTAGE);
    this.offset = end;
    return start;
  }
}

function getEncoderMethods() {
  return {
    bufferish: Bufferish,
    write: write,
    fetch: fetch,
    flush: flush,
    push: push,
    pull: pull,
    read: read,
    reserve: reserve,
    send: send,
    maxBufferSize: MAX_BUFFER_SIZE,
    minBufferSize: MIN_BUFFER_SIZE,
    offset: 0,
    start: 0
  };

  function fetch() {
    var start = this.start;
    if (start < this.offset) {
      var end = this.start = this.offset;
      return Bufferish.prototype.slice.call(this.buffer, start, end);
    }
  }

  function flush() {
    while (this.start < this.offset) {
      var value = this.fetch();
      if (value) this.push(value);
    }
  }

  function pull() {
    var buffers = this.buffers || (this.buffers = []);
    var chunk = buffers.length > 1 ? this.bufferish.concat(buffers) : buffers[0];
    buffers.length = 0; // buffer exhausted
    return chunk;
  }

  function reserve(length) {
    var req = length | 0;

    if (this.buffer) {
      var size = this.buffer.length;
      var start = this.offset | 0;
      var end = start + req;

      // is it long enough?
      if (end < size) {
        this.offset = end;
        return start;
      }

      // flush current buffer
      this.flush();

      // resize it to 2x current length
      length = Math.max(length, Math.min(size * 2, this.maxBufferSize));
    }

    // minimum buffer size
    length = Math.max(length, this.minBufferSize);

    // allocate new buffer
    this.buffer = this.bufferish.alloc(length);
    this.start = 0;
    this.offset = req;
    return 0;
  }

  function send(buffer) {
    var length = buffer.length;
    if (length > this.minBufferSize) {
      this.flush();
      this.push(buffer);
    } else {
      var offset = this.reserve(length);
      Bufferish.prototype.copy.call(buffer, this.buffer, offset);
    }
  }
}

// common methods

function write() {
  throw new Error("method not implemented: write()");
}

function fetch() {
  throw new Error("method not implemented: fetch()");
}

function read() {
  var length = this.buffers && this.buffers.length;

  // fetch the first result
  if (!length) return this.fetch();

  // flush current buffer
  this.flush();

  // read from the results
  return this.pull();
}

function push(chunk) {
  var buffers = this.buffers || (this.buffers = []);
  buffers.push(chunk);
}

function pull() {
  var buffers = this.buffers || (this.buffers = []);
  return buffers.shift();
}

function mixinFactory(source) {
  return mixin;

  function mixin(target) {
    for (var key in source) {
      target[key] = source[key];
    }
    return target;
  }
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/read-core.js":
/*!****************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/read-core.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// read-core.js

var ExtBuffer = __webpack_require__(/*! ./ext-buffer */ "./node_modules/msgpack-lite/lib/ext-buffer.js").ExtBuffer;
var ExtUnpacker = __webpack_require__(/*! ./ext-unpacker */ "./node_modules/msgpack-lite/lib/ext-unpacker.js");
var readUint8 = __webpack_require__(/*! ./read-format */ "./node_modules/msgpack-lite/lib/read-format.js").readUint8;
var ReadToken = __webpack_require__(/*! ./read-token */ "./node_modules/msgpack-lite/lib/read-token.js");
var CodecBase = __webpack_require__(/*! ./codec-base */ "./node_modules/msgpack-lite/lib/codec-base.js");

CodecBase.install({
  addExtUnpacker: addExtUnpacker,
  getExtUnpacker: getExtUnpacker,
  init: init
});

exports.preset = init.call(CodecBase.preset);

function getDecoder(options) {
  var readToken = ReadToken.getReadToken(options);
  return decode;

  function decode(decoder) {
    var type = readUint8(decoder);
    var func = readToken[type];
    if (!func) throw new Error("Invalid type: " + (type ? ("0x" + type.toString(16)) : type));
    return func(decoder);
  }
}

function init() {
  var options = this.options;
  this.decode = getDecoder(options);

  if (options && options.preset) {
    ExtUnpacker.setExtUnpackers(this);
  }

  return this;
}

function addExtUnpacker(etype, unpacker) {
  var unpackers = this.extUnpackers || (this.extUnpackers = []);
  unpackers[etype] = CodecBase.filter(unpacker);
}

function getExtUnpacker(type) {
  var unpackers = this.extUnpackers || (this.extUnpackers = []);
  return unpackers[type] || extUnpacker;

  function extUnpacker(buffer) {
    return new ExtBuffer(buffer, type);
  }
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/read-format.js":
/*!******************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/read-format.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// read-format.js

var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js");
var Int64Buffer = __webpack_require__(/*! int64-buffer */ "./node_modules/int64-buffer/int64-buffer.js");
var Uint64BE = Int64Buffer.Uint64BE;
var Int64BE = Int64Buffer.Int64BE;

exports.getReadFormat = getReadFormat;
exports.readUint8 = uint8;

var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");
var BufferProto = __webpack_require__(/*! ./bufferish-proto */ "./node_modules/msgpack-lite/lib/bufferish-proto.js");

var HAS_MAP = ("undefined" !== typeof Map);
var NO_ASSERT = true;

function getReadFormat(options) {
  var binarraybuffer = Bufferish.hasArrayBuffer && options && options.binarraybuffer;
  var int64 = options && options.int64;
  var usemap = HAS_MAP && options && options.usemap;

  var readFormat = {
    map: (usemap ? map_to_map : map_to_obj),
    array: array,
    str: str,
    bin: (binarraybuffer ? bin_arraybuffer : bin_buffer),
    ext: ext,
    uint8: uint8,
    uint16: uint16,
    uint32: uint32,
    uint64: read(8, int64 ? readUInt64BE_int64 : readUInt64BE),
    int8: int8,
    int16: int16,
    int32: int32,
    int64: read(8, int64 ? readInt64BE_int64 : readInt64BE),
    float32: read(4, readFloatBE),
    float64: read(8, readDoubleBE)
  };

  return readFormat;
}

function map_to_obj(decoder, len) {
  var value = {};
  var i;
  var k = new Array(len);
  var v = new Array(len);

  var decode = decoder.codec.decode;
  for (i = 0; i < len; i++) {
    k[i] = decode(decoder);
    v[i] = decode(decoder);
  }
  for (i = 0; i < len; i++) {
    value[k[i]] = v[i];
  }
  return value;
}

function map_to_map(decoder, len) {
  var value = new Map();
  var i;
  var k = new Array(len);
  var v = new Array(len);

  var decode = decoder.codec.decode;
  for (i = 0; i < len; i++) {
    k[i] = decode(decoder);
    v[i] = decode(decoder);
  }
  for (i = 0; i < len; i++) {
    value.set(k[i], v[i]);
  }
  return value;
}

function array(decoder, len) {
  var value = new Array(len);
  var decode = decoder.codec.decode;
  for (var i = 0; i < len; i++) {
    value[i] = decode(decoder);
  }
  return value;
}

function str(decoder, len) {
  var start = decoder.reserve(len);
  var end = start + len;
  return BufferProto.toString.call(decoder.buffer, "utf-8", start, end);
}

function bin_buffer(decoder, len) {
  var start = decoder.reserve(len);
  var end = start + len;
  var buf = BufferProto.slice.call(decoder.buffer, start, end);
  return Bufferish.from(buf);
}

function bin_arraybuffer(decoder, len) {
  var start = decoder.reserve(len);
  var end = start + len;
  var buf = BufferProto.slice.call(decoder.buffer, start, end);
  return Bufferish.Uint8Array.from(buf).buffer;
}

function ext(decoder, len) {
  var start = decoder.reserve(len+1);
  var type = decoder.buffer[start++];
  var end = start + len;
  var unpack = decoder.codec.getExtUnpacker(type);
  if (!unpack) throw new Error("Invalid ext type: " + (type ? ("0x" + type.toString(16)) : type));
  var buf = BufferProto.slice.call(decoder.buffer, start, end);
  return unpack(buf);
}

function uint8(decoder) {
  var start = decoder.reserve(1);
  return decoder.buffer[start];
}

function int8(decoder) {
  var start = decoder.reserve(1);
  var value = decoder.buffer[start];
  return (value & 0x80) ? value - 0x100 : value;
}

function uint16(decoder) {
  var start = decoder.reserve(2);
  var buffer = decoder.buffer;
  return (buffer[start++] << 8) | buffer[start];
}

function int16(decoder) {
  var start = decoder.reserve(2);
  var buffer = decoder.buffer;
  var value = (buffer[start++] << 8) | buffer[start];
  return (value & 0x8000) ? value - 0x10000 : value;
}

function uint32(decoder) {
  var start = decoder.reserve(4);
  var buffer = decoder.buffer;
  return (buffer[start++] * 16777216) + (buffer[start++] << 16) + (buffer[start++] << 8) + buffer[start];
}

function int32(decoder) {
  var start = decoder.reserve(4);
  var buffer = decoder.buffer;
  return (buffer[start++] << 24) | (buffer[start++] << 16) | (buffer[start++] << 8) | buffer[start];
}

function read(len, method) {
  return function(decoder) {
    var start = decoder.reserve(len);
    return method.call(decoder.buffer, start, NO_ASSERT);
  };
}

function readUInt64BE(start) {
  return new Uint64BE(this, start).toNumber();
}

function readInt64BE(start) {
  return new Int64BE(this, start).toNumber();
}

function readUInt64BE_int64(start) {
  return new Uint64BE(this, start);
}

function readInt64BE_int64(start) {
  return new Int64BE(this, start);
}

function readFloatBE(start) {
  return ieee754.read(this, start, false, 23, 4);
}

function readDoubleBE(start) {
  return ieee754.read(this, start, false, 52, 8);
}

/***/ }),

/***/ "./node_modules/msgpack-lite/lib/read-token.js":
/*!*****************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/read-token.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// read-token.js

var ReadFormat = __webpack_require__(/*! ./read-format */ "./node_modules/msgpack-lite/lib/read-format.js");

exports.getReadToken = getReadToken;

function getReadToken(options) {
  var format = ReadFormat.getReadFormat(options);

  if (options && options.useraw) {
    return init_useraw(format);
  } else {
    return init_token(format);
  }
}

function init_token(format) {
  var i;
  var token = new Array(256);

  // positive fixint -- 0x00 - 0x7f
  for (i = 0x00; i <= 0x7f; i++) {
    token[i] = constant(i);
  }

  // fixmap -- 0x80 - 0x8f
  for (i = 0x80; i <= 0x8f; i++) {
    token[i] = fix(i - 0x80, format.map);
  }

  // fixarray -- 0x90 - 0x9f
  for (i = 0x90; i <= 0x9f; i++) {
    token[i] = fix(i - 0x90, format.array);
  }

  // fixstr -- 0xa0 - 0xbf
  for (i = 0xa0; i <= 0xbf; i++) {
    token[i] = fix(i - 0xa0, format.str);
  }

  // nil -- 0xc0
  token[0xc0] = constant(null);

  // (never used) -- 0xc1
  token[0xc1] = null;

  // false -- 0xc2
  // true -- 0xc3
  token[0xc2] = constant(false);
  token[0xc3] = constant(true);

  // bin 8 -- 0xc4
  // bin 16 -- 0xc5
  // bin 32 -- 0xc6
  token[0xc4] = flex(format.uint8, format.bin);
  token[0xc5] = flex(format.uint16, format.bin);
  token[0xc6] = flex(format.uint32, format.bin);

  // ext 8 -- 0xc7
  // ext 16 -- 0xc8
  // ext 32 -- 0xc9
  token[0xc7] = flex(format.uint8, format.ext);
  token[0xc8] = flex(format.uint16, format.ext);
  token[0xc9] = flex(format.uint32, format.ext);

  // float 32 -- 0xca
  // float 64 -- 0xcb
  token[0xca] = format.float32;
  token[0xcb] = format.float64;

  // uint 8 -- 0xcc
  // uint 16 -- 0xcd
  // uint 32 -- 0xce
  // uint 64 -- 0xcf
  token[0xcc] = format.uint8;
  token[0xcd] = format.uint16;
  token[0xce] = format.uint32;
  token[0xcf] = format.uint64;

  // int 8 -- 0xd0
  // int 16 -- 0xd1
  // int 32 -- 0xd2
  // int 64 -- 0xd3
  token[0xd0] = format.int8;
  token[0xd1] = format.int16;
  token[0xd2] = format.int32;
  token[0xd3] = format.int64;

  // fixext 1 -- 0xd4
  // fixext 2 -- 0xd5
  // fixext 4 -- 0xd6
  // fixext 8 -- 0xd7
  // fixext 16 -- 0xd8
  token[0xd4] = fix(1, format.ext);
  token[0xd5] = fix(2, format.ext);
  token[0xd6] = fix(4, format.ext);
  token[0xd7] = fix(8, format.ext);
  token[0xd8] = fix(16, format.ext);

  // str 8 -- 0xd9
  // str 16 -- 0xda
  // str 32 -- 0xdb
  token[0xd9] = flex(format.uint8, format.str);
  token[0xda] = flex(format.uint16, format.str);
  token[0xdb] = flex(format.uint32, format.str);

  // array 16 -- 0xdc
  // array 32 -- 0xdd
  token[0xdc] = flex(format.uint16, format.array);
  token[0xdd] = flex(format.uint32, format.array);

  // map 16 -- 0xde
  // map 32 -- 0xdf
  token[0xde] = flex(format.uint16, format.map);
  token[0xdf] = flex(format.uint32, format.map);

  // negative fixint -- 0xe0 - 0xff
  for (i = 0xe0; i <= 0xff; i++) {
    token[i] = constant(i - 0x100);
  }

  return token;
}

function init_useraw(format) {
  var i;
  var token = init_token(format).slice();

  // raw 8 -- 0xd9
  // raw 16 -- 0xda
  // raw 32 -- 0xdb
  token[0xd9] = token[0xc4];
  token[0xda] = token[0xc5];
  token[0xdb] = token[0xc6];

  // fixraw -- 0xa0 - 0xbf
  for (i = 0xa0; i <= 0xbf; i++) {
    token[i] = fix(i - 0xa0, format.bin);
  }

  return token;
}

function constant(value) {
  return function() {
    return value;
  };
}

function flex(lenFunc, decodeFunc) {
  return function(decoder) {
    var len = lenFunc(decoder);
    return decodeFunc(decoder, len);
  };
}

function fix(len, method) {
  return function(decoder) {
    return method(decoder, len);
  };
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/write-core.js":
/*!*****************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/write-core.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// write-core.js

var ExtBuffer = __webpack_require__(/*! ./ext-buffer */ "./node_modules/msgpack-lite/lib/ext-buffer.js").ExtBuffer;
var ExtPacker = __webpack_require__(/*! ./ext-packer */ "./node_modules/msgpack-lite/lib/ext-packer.js");
var WriteType = __webpack_require__(/*! ./write-type */ "./node_modules/msgpack-lite/lib/write-type.js");
var CodecBase = __webpack_require__(/*! ./codec-base */ "./node_modules/msgpack-lite/lib/codec-base.js");

CodecBase.install({
  addExtPacker: addExtPacker,
  getExtPacker: getExtPacker,
  init: init
});

exports.preset = init.call(CodecBase.preset);

function getEncoder(options) {
  var writeType = WriteType.getWriteType(options);
  return encode;

  function encode(encoder, value) {
    var func = writeType[typeof value];
    if (!func) throw new Error("Unsupported type \"" + (typeof value) + "\": " + value);
    func(encoder, value);
  }
}

function init() {
  var options = this.options;
  this.encode = getEncoder(options);

  if (options && options.preset) {
    ExtPacker.setExtPackers(this);
  }

  return this;
}

function addExtPacker(etype, Class, packer) {
  packer = CodecBase.filter(packer);
  var name = Class.name;
  if (name && name !== "Object") {
    var packers = this.extPackers || (this.extPackers = {});
    packers[name] = extPacker;
  } else {
    // fallback for IE
    var list = this.extEncoderList || (this.extEncoderList = []);
    list.unshift([Class, extPacker]);
  }

  function extPacker(value) {
    if (packer) value = packer(value);
    return new ExtBuffer(value, etype);
  }
}

function getExtPacker(value) {
  var packers = this.extPackers || (this.extPackers = {});
  var c = value.constructor;
  var e = c && c.name && packers[c.name];
  if (e) return e;

  // fallback for IE
  var list = this.extEncoderList || (this.extEncoderList = []);
  var len = list.length;
  for (var i = 0; i < len; i++) {
    var pair = list[i];
    if (c === pair[0]) return pair[1];
  }
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/write-token.js":
/*!******************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/write-token.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// write-token.js

var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js");
var Int64Buffer = __webpack_require__(/*! int64-buffer */ "./node_modules/int64-buffer/int64-buffer.js");
var Uint64BE = Int64Buffer.Uint64BE;
var Int64BE = Int64Buffer.Int64BE;

var uint8 = __webpack_require__(/*! ./write-uint8 */ "./node_modules/msgpack-lite/lib/write-uint8.js").uint8;
var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");
var Buffer = Bufferish.global;
var IS_BUFFER_SHIM = Bufferish.hasBuffer && ("TYPED_ARRAY_SUPPORT" in Buffer);
var NO_TYPED_ARRAY = IS_BUFFER_SHIM && !Buffer.TYPED_ARRAY_SUPPORT;
var Buffer_prototype = Bufferish.hasBuffer && Buffer.prototype || {};

exports.getWriteToken = getWriteToken;

function getWriteToken(options) {
  if (options && options.uint8array) {
    return init_uint8array();
  } else if (NO_TYPED_ARRAY || (Bufferish.hasBuffer && options && options.safe)) {
    return init_safe();
  } else {
    return init_token();
  }
}

function init_uint8array() {
  var token = init_token();

  // float 32 -- 0xca
  // float 64 -- 0xcb
  token[0xca] = writeN(0xca, 4, writeFloatBE);
  token[0xcb] = writeN(0xcb, 8, writeDoubleBE);

  return token;
}

// Node.js and browsers with TypedArray

function init_token() {
  // (immediate values)
  // positive fixint -- 0x00 - 0x7f
  // nil -- 0xc0
  // false -- 0xc2
  // true -- 0xc3
  // negative fixint -- 0xe0 - 0xff
  var token = uint8.slice();

  // bin 8 -- 0xc4
  // bin 16 -- 0xc5
  // bin 32 -- 0xc6
  token[0xc4] = write1(0xc4);
  token[0xc5] = write2(0xc5);
  token[0xc6] = write4(0xc6);

  // ext 8 -- 0xc7
  // ext 16 -- 0xc8
  // ext 32 -- 0xc9
  token[0xc7] = write1(0xc7);
  token[0xc8] = write2(0xc8);
  token[0xc9] = write4(0xc9);

  // float 32 -- 0xca
  // float 64 -- 0xcb
  token[0xca] = writeN(0xca, 4, (Buffer_prototype.writeFloatBE || writeFloatBE), true);
  token[0xcb] = writeN(0xcb, 8, (Buffer_prototype.writeDoubleBE || writeDoubleBE), true);

  // uint 8 -- 0xcc
  // uint 16 -- 0xcd
  // uint 32 -- 0xce
  // uint 64 -- 0xcf
  token[0xcc] = write1(0xcc);
  token[0xcd] = write2(0xcd);
  token[0xce] = write4(0xce);
  token[0xcf] = writeN(0xcf, 8, writeUInt64BE);

  // int 8 -- 0xd0
  // int 16 -- 0xd1
  // int 32 -- 0xd2
  // int 64 -- 0xd3
  token[0xd0] = write1(0xd0);
  token[0xd1] = write2(0xd1);
  token[0xd2] = write4(0xd2);
  token[0xd3] = writeN(0xd3, 8, writeInt64BE);

  // str 8 -- 0xd9
  // str 16 -- 0xda
  // str 32 -- 0xdb
  token[0xd9] = write1(0xd9);
  token[0xda] = write2(0xda);
  token[0xdb] = write4(0xdb);

  // array 16 -- 0xdc
  // array 32 -- 0xdd
  token[0xdc] = write2(0xdc);
  token[0xdd] = write4(0xdd);

  // map 16 -- 0xde
  // map 32 -- 0xdf
  token[0xde] = write2(0xde);
  token[0xdf] = write4(0xdf);

  return token;
}

// safe mode: for old browsers and who needs asserts

function init_safe() {
  // (immediate values)
  // positive fixint -- 0x00 - 0x7f
  // nil -- 0xc0
  // false -- 0xc2
  // true -- 0xc3
  // negative fixint -- 0xe0 - 0xff
  var token = uint8.slice();

  // bin 8 -- 0xc4
  // bin 16 -- 0xc5
  // bin 32 -- 0xc6
  token[0xc4] = writeN(0xc4, 1, Buffer.prototype.writeUInt8);
  token[0xc5] = writeN(0xc5, 2, Buffer.prototype.writeUInt16BE);
  token[0xc6] = writeN(0xc6, 4, Buffer.prototype.writeUInt32BE);

  // ext 8 -- 0xc7
  // ext 16 -- 0xc8
  // ext 32 -- 0xc9
  token[0xc7] = writeN(0xc7, 1, Buffer.prototype.writeUInt8);
  token[0xc8] = writeN(0xc8, 2, Buffer.prototype.writeUInt16BE);
  token[0xc9] = writeN(0xc9, 4, Buffer.prototype.writeUInt32BE);

  // float 32 -- 0xca
  // float 64 -- 0xcb
  token[0xca] = writeN(0xca, 4, Buffer.prototype.writeFloatBE);
  token[0xcb] = writeN(0xcb, 8, Buffer.prototype.writeDoubleBE);

  // uint 8 -- 0xcc
  // uint 16 -- 0xcd
  // uint 32 -- 0xce
  // uint 64 -- 0xcf
  token[0xcc] = writeN(0xcc, 1, Buffer.prototype.writeUInt8);
  token[0xcd] = writeN(0xcd, 2, Buffer.prototype.writeUInt16BE);
  token[0xce] = writeN(0xce, 4, Buffer.prototype.writeUInt32BE);
  token[0xcf] = writeN(0xcf, 8, writeUInt64BE);

  // int 8 -- 0xd0
  // int 16 -- 0xd1
  // int 32 -- 0xd2
  // int 64 -- 0xd3
  token[0xd0] = writeN(0xd0, 1, Buffer.prototype.writeInt8);
  token[0xd1] = writeN(0xd1, 2, Buffer.prototype.writeInt16BE);
  token[0xd2] = writeN(0xd2, 4, Buffer.prototype.writeInt32BE);
  token[0xd3] = writeN(0xd3, 8, writeInt64BE);

  // str 8 -- 0xd9
  // str 16 -- 0xda
  // str 32 -- 0xdb
  token[0xd9] = writeN(0xd9, 1, Buffer.prototype.writeUInt8);
  token[0xda] = writeN(0xda, 2, Buffer.prototype.writeUInt16BE);
  token[0xdb] = writeN(0xdb, 4, Buffer.prototype.writeUInt32BE);

  // array 16 -- 0xdc
  // array 32 -- 0xdd
  token[0xdc] = writeN(0xdc, 2, Buffer.prototype.writeUInt16BE);
  token[0xdd] = writeN(0xdd, 4, Buffer.prototype.writeUInt32BE);

  // map 16 -- 0xde
  // map 32 -- 0xdf
  token[0xde] = writeN(0xde, 2, Buffer.prototype.writeUInt16BE);
  token[0xdf] = writeN(0xdf, 4, Buffer.prototype.writeUInt32BE);

  return token;
}

function write1(type) {
  return function(encoder, value) {
    var offset = encoder.reserve(2);
    var buffer = encoder.buffer;
    buffer[offset++] = type;
    buffer[offset] = value;
  };
}

function write2(type) {
  return function(encoder, value) {
    var offset = encoder.reserve(3);
    var buffer = encoder.buffer;
    buffer[offset++] = type;
    buffer[offset++] = value >>> 8;
    buffer[offset] = value;
  };
}

function write4(type) {
  return function(encoder, value) {
    var offset = encoder.reserve(5);
    var buffer = encoder.buffer;
    buffer[offset++] = type;
    buffer[offset++] = value >>> 24;
    buffer[offset++] = value >>> 16;
    buffer[offset++] = value >>> 8;
    buffer[offset] = value;
  };
}

function writeN(type, len, method, noAssert) {
  return function(encoder, value) {
    var offset = encoder.reserve(len + 1);
    encoder.buffer[offset++] = type;
    method.call(encoder.buffer, value, offset, noAssert);
  };
}

function writeUInt64BE(value, offset) {
  new Uint64BE(this, offset, value);
}

function writeInt64BE(value, offset) {
  new Int64BE(this, offset, value);
}

function writeFloatBE(value, offset) {
  ieee754.write(this, value, offset, false, 23, 4);
}

function writeDoubleBE(value, offset) {
  ieee754.write(this, value, offset, false, 52, 8);
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/write-type.js":
/*!*****************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/write-type.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// write-type.js

var IS_ARRAY = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js");
var Int64Buffer = __webpack_require__(/*! int64-buffer */ "./node_modules/int64-buffer/int64-buffer.js");
var Uint64BE = Int64Buffer.Uint64BE;
var Int64BE = Int64Buffer.Int64BE;

var Bufferish = __webpack_require__(/*! ./bufferish */ "./node_modules/msgpack-lite/lib/bufferish.js");
var BufferProto = __webpack_require__(/*! ./bufferish-proto */ "./node_modules/msgpack-lite/lib/bufferish-proto.js");
var WriteToken = __webpack_require__(/*! ./write-token */ "./node_modules/msgpack-lite/lib/write-token.js");
var uint8 = __webpack_require__(/*! ./write-uint8 */ "./node_modules/msgpack-lite/lib/write-uint8.js").uint8;
var ExtBuffer = __webpack_require__(/*! ./ext-buffer */ "./node_modules/msgpack-lite/lib/ext-buffer.js").ExtBuffer;

var HAS_UINT8ARRAY = ("undefined" !== typeof Uint8Array);
var HAS_MAP = ("undefined" !== typeof Map);

var extmap = [];
extmap[1] = 0xd4;
extmap[2] = 0xd5;
extmap[4] = 0xd6;
extmap[8] = 0xd7;
extmap[16] = 0xd8;

exports.getWriteType = getWriteType;

function getWriteType(options) {
  var token = WriteToken.getWriteToken(options);
  var useraw = options && options.useraw;
  var binarraybuffer = HAS_UINT8ARRAY && options && options.binarraybuffer;
  var isBuffer = binarraybuffer ? Bufferish.isArrayBuffer : Bufferish.isBuffer;
  var bin = binarraybuffer ? bin_arraybuffer : bin_buffer;
  var usemap = HAS_MAP && options && options.usemap;
  var map = usemap ? map_to_map : obj_to_map;

  var writeType = {
    "boolean": bool,
    "function": nil,
    "number": number,
    "object": (useraw ? object_raw : object),
    "string": _string(useraw ? raw_head_size : str_head_size),
    "symbol": nil,
    "undefined": nil
  };

  return writeType;

  // false -- 0xc2
  // true -- 0xc3
  function bool(encoder, value) {
    var type = value ? 0xc3 : 0xc2;
    token[type](encoder, value);
  }

  function number(encoder, value) {
    var ivalue = value | 0;
    var type;
    if (value !== ivalue) {
      // float 64 -- 0xcb
      type = 0xcb;
      token[type](encoder, value);
      return;
    } else if (-0x20 <= ivalue && ivalue <= 0x7F) {
      // positive fixint -- 0x00 - 0x7f
      // negative fixint -- 0xe0 - 0xff
      type = ivalue & 0xFF;
    } else if (0 <= ivalue) {
      // uint 8 -- 0xcc
      // uint 16 -- 0xcd
      // uint 32 -- 0xce
      type = (ivalue <= 0xFF) ? 0xcc : (ivalue <= 0xFFFF) ? 0xcd : 0xce;
    } else {
      // int 8 -- 0xd0
      // int 16 -- 0xd1
      // int 32 -- 0xd2
      type = (-0x80 <= ivalue) ? 0xd0 : (-0x8000 <= ivalue) ? 0xd1 : 0xd2;
    }
    token[type](encoder, ivalue);
  }

  // uint 64 -- 0xcf
  function uint64(encoder, value) {
    var type = 0xcf;
    token[type](encoder, value.toArray());
  }

  // int 64 -- 0xd3
  function int64(encoder, value) {
    var type = 0xd3;
    token[type](encoder, value.toArray());
  }

  // str 8 -- 0xd9
  // str 16 -- 0xda
  // str 32 -- 0xdb
  // fixstr -- 0xa0 - 0xbf
  function str_head_size(length) {
    return (length < 32) ? 1 : (length <= 0xFF) ? 2 : (length <= 0xFFFF) ? 3 : 5;
  }

  // raw 16 -- 0xda
  // raw 32 -- 0xdb
  // fixraw -- 0xa0 - 0xbf
  function raw_head_size(length) {
    return (length < 32) ? 1 : (length <= 0xFFFF) ? 3 : 5;
  }

  function _string(head_size) {
    return string;

    function string(encoder, value) {
      // prepare buffer
      var length = value.length;
      var maxsize = 5 + length * 3;
      encoder.offset = encoder.reserve(maxsize);
      var buffer = encoder.buffer;

      // expected header size
      var expected = head_size(length);

      // expected start point
      var start = encoder.offset + expected;

      // write string
      length = BufferProto.write.call(buffer, value, start);

      // actual header size
      var actual = head_size(length);

      // move content when needed
      if (expected !== actual) {
        var targetStart = start + actual - expected;
        var end = start + length;
        BufferProto.copy.call(buffer, buffer, targetStart, start, end);
      }

      // write header
      var type = (actual === 1) ? (0xa0 + length) : (actual <= 3) ? (0xd7 + actual) : 0xdb;
      token[type](encoder, length);

      // move cursor
      encoder.offset += length;
    }
  }

  function object(encoder, value) {
    // null
    if (value === null) return nil(encoder, value);

    // Buffer
    if (isBuffer(value)) return bin(encoder, value);

    // Array
    if (IS_ARRAY(value)) return array(encoder, value);

    // int64-buffer objects
    if (Uint64BE.isUint64BE(value)) return uint64(encoder, value);
    if (Int64BE.isInt64BE(value)) return int64(encoder, value);

    // ext formats
    var packer = encoder.codec.getExtPacker(value);
    if (packer) value = packer(value);
    if (value instanceof ExtBuffer) return ext(encoder, value);

    // plain old Objects or Map
    map(encoder, value);
  }

  function object_raw(encoder, value) {
    // Buffer
    if (isBuffer(value)) return raw(encoder, value);

    // others
    object(encoder, value);
  }

  // nil -- 0xc0
  function nil(encoder, value) {
    var type = 0xc0;
    token[type](encoder, value);
  }

  // fixarray -- 0x90 - 0x9f
  // array 16 -- 0xdc
  // array 32 -- 0xdd
  function array(encoder, value) {
    var length = value.length;
    var type = (length < 16) ? (0x90 + length) : (length <= 0xFFFF) ? 0xdc : 0xdd;
    token[type](encoder, length);

    var encode = encoder.codec.encode;
    for (var i = 0; i < length; i++) {
      encode(encoder, value[i]);
    }
  }

  // bin 8 -- 0xc4
  // bin 16 -- 0xc5
  // bin 32 -- 0xc6
  function bin_buffer(encoder, value) {
    var length = value.length;
    var type = (length < 0xFF) ? 0xc4 : (length <= 0xFFFF) ? 0xc5 : 0xc6;
    token[type](encoder, length);
    encoder.send(value);
  }

  function bin_arraybuffer(encoder, value) {
    bin_buffer(encoder, new Uint8Array(value));
  }

  // fixext 1 -- 0xd4
  // fixext 2 -- 0xd5
  // fixext 4 -- 0xd6
  // fixext 8 -- 0xd7
  // fixext 16 -- 0xd8
  // ext 8 -- 0xc7
  // ext 16 -- 0xc8
  // ext 32 -- 0xc9
  function ext(encoder, value) {
    var buffer = value.buffer;
    var length = buffer.length;
    var type = extmap[length] || ((length < 0xFF) ? 0xc7 : (length <= 0xFFFF) ? 0xc8 : 0xc9);
    token[type](encoder, length);
    uint8[value.type](encoder);
    encoder.send(buffer);
  }

  // fixmap -- 0x80 - 0x8f
  // map 16 -- 0xde
  // map 32 -- 0xdf
  function obj_to_map(encoder, value) {
    var keys = Object.keys(value);
    var length = keys.length;
    var type = (length < 16) ? (0x80 + length) : (length <= 0xFFFF) ? 0xde : 0xdf;
    token[type](encoder, length);

    var encode = encoder.codec.encode;
    keys.forEach(function(key) {
      encode(encoder, key);
      encode(encoder, value[key]);
    });
  }

  // fixmap -- 0x80 - 0x8f
  // map 16 -- 0xde
  // map 32 -- 0xdf
  function map_to_map(encoder, value) {
    if (!(value instanceof Map)) return obj_to_map(encoder, value);

    var length = value.size;
    var type = (length < 16) ? (0x80 + length) : (length <= 0xFFFF) ? 0xde : 0xdf;
    token[type](encoder, length);

    var encode = encoder.codec.encode;
    value.forEach(function(val, key, m) {
      encode(encoder, key);
      encode(encoder, val);
    });
  }

  // raw 16 -- 0xda
  // raw 32 -- 0xdb
  // fixraw -- 0xa0 - 0xbf
  function raw(encoder, value) {
    var length = value.length;
    var type = (length < 32) ? (0xa0 + length) : (length <= 0xFFFF) ? 0xda : 0xdb;
    token[type](encoder, length);
    encoder.send(value);
  }
}


/***/ }),

/***/ "./node_modules/msgpack-lite/lib/write-uint8.js":
/*!******************************************************!*\
  !*** ./node_modules/msgpack-lite/lib/write-uint8.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

// write-unit8.js

var constant = exports.uint8 = new Array(256);

for (var i = 0x00; i <= 0xFF; i++) {
  constant[i] = write0(i);
}

function write0(type) {
  return function(encoder) {
    var offset = encoder.reserve(1);
    encoder.buffer[offset] = type;
  };
}


/***/ }),

/***/ "./src/Neovim.ts":
/*!***********************!*\
  !*** ./src/Neovim.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "neovim": () => (/* binding */ neovim)
/* harmony export */ });
/* harmony import */ var _page_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page/proxy */ "./src/page/proxy.ts");
/* harmony import */ var _render_RedrawCanvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render/RedrawCanvas */ "./src/render/RedrawCanvas.ts");
/* harmony import */ var _Stdin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Stdin */ "./src/Stdin.ts");
/* harmony import */ var _Stdout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Stdout */ "./src/Stdout.ts");




async function neovim(canvas, { port, password }) {
    const functions = {};
    const requests = new Map();
    _render_RedrawCanvas__WEBPACK_IMPORTED_MODULE_1__.setFunctions(functions);
    _render_RedrawCanvas__WEBPACK_IMPORTED_MODULE_1__.setCanvas(canvas);
    let prevNotificationPromise = Promise.resolve();
    const socket = new WebSocket(`ws://127.0.0.1:${port}/${password}`);
    socket.binaryType = "arraybuffer";
    socket.addEventListener("close", ((_) => {
        prevNotificationPromise = prevNotificationPromise.finally(() => _page_proxy__WEBPACK_IMPORTED_MODULE_0__.page.killEditor());
    }));
    await (new Promise(resolve => socket.addEventListener("open", () => {
        resolve();
    })));
    const stdin = new _Stdin__WEBPACK_IMPORTED_MODULE_2__.Stdin(socket);
    const stdout = new _Stdout__WEBPACK_IMPORTED_MODULE_3__.Stdout(socket);
    let reqId = 0;
    const request = (api, args) => {
        return new Promise((resolve, reject) => {
            reqId += 1;
            requests.set(reqId, { resolve, reject });
            stdin.write(reqId, api, args);
        });
    };
    stdout.addListener("request", (_id, _name, _args) => {
        return undefined;
    });
    stdout.addListener("response", (id, error, result) => {
        const r = requests.get(id);
        if (!r) {
            // This can't happen and yet it sometimes does, possibly due to a firefox bug
            console.error(`Received answer to ${id} but no handler found!`);
        }
        else {
            requests.delete(id);
            if (error) {
                r.reject(error);
            }
            else {
                r.resolve(result);
            }
        }
    });
    let lastLostFocus = performance.now();
    stdout.addListener("notification", async (name, args) => {
        if (name === "redraw" && args) {
            _render_RedrawCanvas__WEBPACK_IMPORTED_MODULE_1__.onRedraw(args);
            return;
        }
        prevNotificationPromise = prevNotificationPromise.finally(() => {
            // A very tricky sequence of events could happen here:
            // - firenvim_bufwrite is received page.setElementContent is called
            //   asynchronously
            // - firenvim_focus_page is called, page.focusPage() is called
            //   asynchronously, lastLostFocus is set to now
            // - page.setElementContent completes, lastLostFocus is checked to see
            //   if focus should be grabbed or not
            // That's why we have to check for lastLostFocus after
            // page.setElementContent/Cursor! Same thing for firenvim_press_keys
            const hadFocus = document.hasFocus();
            switch (name) {
                case "firenvim_bufwrite":
                    {
                        const data = args[0];
                        return _page_proxy__WEBPACK_IMPORTED_MODULE_0__.page.setElementContent(data.text.join("\n"))
                            .then(() => _page_proxy__WEBPACK_IMPORTED_MODULE_0__.page.setElementCursor(...(data.cursor)))
                            .then(() => {
                            if (hadFocus
                                && !document.hasFocus()
                                && (performance.now() - lastLostFocus > 3000)) {
                                window.focus();
                            }
                        });
                    }
                case "firenvim_eval_js":
                    return _page_proxy__WEBPACK_IMPORTED_MODULE_0__.page.evalInPage(args[0]).catch(_ => _).then(result => {
                        if (args[1]) {
                            request("nvim_call_function", [args[1], [JSON.stringify(result)]]);
                        }
                    });
                case "firenvim_focus_page":
                    lastLostFocus = performance.now();
                    return _page_proxy__WEBPACK_IMPORTED_MODULE_0__.page.focusPage();
                case "firenvim_focus_input":
                    lastLostFocus = performance.now();
                    return _page_proxy__WEBPACK_IMPORTED_MODULE_0__.page.focusInput();
                case "firenvim_hide_frame":
                    lastLostFocus = performance.now();
                    return _page_proxy__WEBPACK_IMPORTED_MODULE_0__.page.hideEditor();
                case "firenvim_press_keys":
                    return _page_proxy__WEBPACK_IMPORTED_MODULE_0__.page.pressKeys(args[0]);
                case "firenvim_vimleave":
                    lastLostFocus = performance.now();
                    return _page_proxy__WEBPACK_IMPORTED_MODULE_0__.page.killEditor();
            }
        });
    });
    const { 0: channel, 1: apiInfo } = (await request("nvim_get_api_info", []));
    stdout.setTypes(apiInfo.types);
    Object.assign(functions, apiInfo.functions
        .filter(f => f.deprecated_since === undefined)
        .reduce((acc, cur) => {
        let name = cur.name;
        if (name.startsWith("nvim_")) {
            name = name.slice(5);
        }
        acc[name] = (...args) => request(cur.name, args);
        return acc;
    }, {}));
    functions.get_current_channel = () => channel;
    return functions;
}


/***/ }),

/***/ "./src/Stdin.ts":
/*!**********************!*\
  !*** ./src/Stdin.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Stdin": () => (/* binding */ Stdin)
/* harmony export */ });
/* harmony import */ var msgpack_lite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! msgpack-lite */ "./node_modules/msgpack-lite/lib/browser.js");

class Stdin {
    constructor(socket) {
        this.socket = socket;
    }
    write(reqId, method, args) {
        const req = [0, reqId, method, args];
        const encoded = msgpack_lite__WEBPACK_IMPORTED_MODULE_0__.encode(req);
        this.socket.send(encoded);
    }
}


/***/ }),

/***/ "./src/Stdout.ts":
/*!***********************!*\
  !*** ./src/Stdout.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Stdout": () => (/* binding */ Stdout)
/* harmony export */ });
/* harmony import */ var msgpack_lite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! msgpack-lite */ "./node_modules/msgpack-lite/lib/browser.js");

class Stdout {
    constructor(socket) {
        this.socket = socket;
        this.listeners = new Map();
        this.messageNames = new Map([[0, "request"], [1, "response"], [2, "notification"]]);
        // Holds previously-received, incomplete and unprocessed messages
        this.prev = new Uint8Array(0);
        this.msgpackConfig = {};
        this.socket.addEventListener("message", this.onMessage.bind(this));
    }
    addListener(kind, listener) {
        let arr = this.listeners.get(kind);
        if (!arr) {
            arr = [];
            this.listeners.set(kind, arr);
        }
        arr.push(listener);
    }
    setTypes(types) {
        this.msgpackConfig.codec = msgpack_lite__WEBPACK_IMPORTED_MODULE_0__.createCodec({ preset: true });
        Object
            .entries(types)
            .forEach(([_, { id }]) => this
            .msgpackConfig
            .codec
            .addExtUnpacker(id, (data) => data));
    }
    onMessage(msg) {
        const msgData = new Uint8Array(msg.data);
        let data = new Uint8Array(msgData.byteLength + this.prev.byteLength);
        data.set(this.prev);
        data.set(msgData, this.prev.length);
        while (true) {
            let decoded;
            try {
                decoded = msgpack_lite__WEBPACK_IMPORTED_MODULE_0__.decode(data, this.msgpackConfig);
            }
            catch (e) {
                this.prev = data;
                return;
            }
            const encoded = msgpack_lite__WEBPACK_IMPORTED_MODULE_0__.encode(decoded);
            data = data.slice(encoded.byteLength);
            const [kind, reqId, data1, data2] = decoded;
            const name = this.messageNames.get(kind);
            if (name) {
                const handlers = this.listeners.get(name);
                if (handlers !== undefined) {
                    for (const handler of handlers) {
                        handler(reqId, data1, data2);
                    }
                }
            }
            else {
                // Can't be tested because this would mean messages that break
                // the msgpack-rpc spec, so coverage impossible to get.
                /* istanbul ignore next */
                console.error(`Unhandled message kind ${name}`);
            }
        }
    }
}


/***/ }),

/***/ "./src/page/functions.ts":
/*!*******************************!*\
  !*** ./src/page/functions.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getTabFunctions": () => (/* binding */ getTabFunctions),
/* harmony export */   "getActiveContentFunctions": () => (/* binding */ getActiveContentFunctions),
/* harmony export */   "getNeovimFrameFunctions": () => (/* binding */ getNeovimFrameFunctions)
/* harmony export */ });
/* harmony import */ var _utils_configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/configuration */ "./src/utils/configuration.ts");
/* harmony import */ var _utils_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/keys */ "./src/utils/keys.ts");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.ts");



function _focusInput(global, firenvim, addListener) {
    if (addListener) {
        // Only re-add event listener if input's selector matches the ones
        // that should be autonvimified
        const conf = (0,_utils_configuration__WEBPACK_IMPORTED_MODULE_0__.getConf)();
        if (conf.selector && conf.selector !== "") {
            const elems = Array.from(document.querySelectorAll(conf.selector));
            addListener = elems.includes(firenvim.getElement());
        }
    }
    firenvim.focusOriginalElement(addListener);
}
function getFocusedElement(firenvimElems) {
    return Array
        .from(firenvimElems.values())
        .find(instance => instance.isFocused());
}
// Tab functions are functions all content scripts should react to
function getTabFunctions(global) {
    return {
        getActiveInstanceCount: () => global.firenvimElems.size,
        registerNewFrameId: (frameId) => {
            global.frameIdResolve(frameId);
        },
        setDisabled: (disabled) => {
            global.disabled = disabled;
        },
        setLastFocusedContentScript: (frameId) => {
            global.lastFocusedContentScript = frameId;
        }
    };
}
function isVisible(e) {
    const rect = e.getBoundingClientRect();
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}
// ActiveContent functions are functions only the active content script should react to
function getActiveContentFunctions(global) {
    return {
        forceNvimify: () => {
            let elem = document.activeElement;
            const isNull = elem === null || elem === undefined;
            const pageNotEditable = document.documentElement.contentEditable !== "true";
            const bodyNotEditable = (document.body.contentEditable === "false"
                || (document.body.contentEditable === "inherit"
                    && document.documentElement.contentEditable !== "true"));
            if (isNull
                || (elem === document.documentElement && pageNotEditable)
                || (elem === document.body && bodyNotEditable)) {
                elem = Array.from(document.getElementsByTagName("textarea"))
                    .find(isVisible);
                if (!elem) {
                    elem = Array.from(document.getElementsByTagName("input"))
                        .find(e => e.type === "text" && isVisible(e));
                }
                if (!elem) {
                    return;
                }
            }
            global.nvimify({ target: elem });
        },
        sendKey: (key) => {
            const firenvim = getFocusedElement(global.firenvimElems);
            if (firenvim !== undefined) {
                firenvim.sendKey(key);
            }
            else {
                // It's important to throw this error as the background script
                // will execute a fallback
                throw new Error("No firenvim frame selected");
            }
        },
    };
}
function getNeovimFrameFunctions(global) {
    return {
        evalInPage: (_, js) => (0,_utils_utils__WEBPACK_IMPORTED_MODULE_2__.executeInPage)(js),
        focusInput: (frameId) => {
            let firenvimElement;
            if (frameId === undefined) {
                firenvimElement = getFocusedElement(global.firenvimElems);
            }
            else {
                firenvimElement = global.firenvimElems.get(frameId);
            }
            _focusInput(global, firenvimElement, true);
        },
        focusPage: (frameId) => {
            const firenvimElement = global.firenvimElems.get(frameId);
            firenvimElement.clearFocusListeners();
            document.activeElement.blur();
            document.documentElement.focus();
        },
        getEditorInfo: (frameId) => global
            .firenvimElems
            .get(frameId)
            .getBufferInfo(),
        getElementContent: (frameId) => global
            .firenvimElems
            .get(frameId)
            .getPageElementContent(),
        hideEditor: (frameId) => {
            const firenvim = global.firenvimElems.get(frameId);
            firenvim.hide();
            _focusInput(global, firenvim, true);
        },
        killEditor: (frameId) => {
            const firenvim = global.firenvimElems.get(frameId);
            const isFocused = firenvim.isFocused();
            firenvim.detachFromPage();
            const conf = (0,_utils_configuration__WEBPACK_IMPORTED_MODULE_0__.getConf)();
            if (isFocused) {
                _focusInput(global, firenvim, conf.takeover !== "once");
            }
            global.firenvimElems.delete(frameId);
        },
        pressKeys: (frameId, keys) => {
            global.firenvimElems.get(frameId).pressKeys((0,_utils_keys__WEBPACK_IMPORTED_MODULE_1__.keysToEvents)(keys));
        },
        resizeEditor: (frameId, width, height) => {
            const elem = global.firenvimElems.get(frameId);
            elem.resizeTo(width, height, true);
            elem.putEditorCloseToInputOriginAfterResizeFromFrame();
        },
        setElementContent: (frameId, text) => {
            return global.firenvimElems.get(frameId).setPageElementContent(text);
        },
        setElementCursor: (frameId, line, column) => {
            return global.firenvimElems.get(frameId).setPageElementCursor(line, column);
        },
    };
}


/***/ }),

/***/ "./src/page/proxy.ts":
/*!***************************!*\
  !*** ./src/page/proxy.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "page": () => (/* binding */ page)
/* harmony export */ });
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions */ "./src/page/functions.ts");
/* provided dependency */ var browser = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");

// We don't need to give real values to getFunctions since we're only trying to
// get the name of functions that exist in the page.
const functions = (0,_functions__WEBPACK_IMPORTED_MODULE_0__.getNeovimFrameFunctions)({});
const page = {};
let funcName;
for (funcName in functions) {
    // We need to declare func here because funcName is a global and would not
    // be captured in the closure otherwise
    const func = funcName;
    page[func] = ((...arr) => {
        return browser.runtime.sendMessage({
            args: {
                args: [window.frameId].concat(arr),
                funcName: [func],
            },
            funcName: ["messagePage"],
        });
    });
}


/***/ }),

/***/ "./src/render/RedrawCanvas.ts":
/*!************************************!*\
  !*** ./src/render/RedrawCanvas.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setFunctions": () => (/* binding */ setFunctions),
/* harmony export */   "setCanvas": () => (/* binding */ setCanvas),
/* harmony export */   "getGlyphInfo": () => (/* binding */ getGlyphInfo),
/* harmony export */   "getLogicalSize": () => (/* binding */ getLogicalSize),
/* harmony export */   "computeGridDimensionsFor": () => (/* binding */ computeGridDimensionsFor),
/* harmony export */   "getGridCoordinates": () => (/* binding */ getGridCoordinates),
/* harmony export */   "getGridId": () => (/* binding */ getGridId),
/* harmony export */   "getCurrentMode": () => (/* binding */ getCurrentMode),
/* harmony export */   "onRedraw": () => (/* binding */ onRedraw)
/* harmony export */ });
/* harmony import */ var _page_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../page/proxy */ "./src/page/proxy.ts");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.ts");


let functions;
function setFunctions(fns) {
    functions = fns;
}
let glyphCache = {};
function wipeGlyphCache() {
    glyphCache = {};
}
let metricsInvalidated = false;
function invalidateMetrics() {
    metricsInvalidated = true;
    wipeGlyphCache();
}
let fontString;
function setFontString(state, s) {
    fontString = s;
    state.context.font = fontString;
    invalidateMetrics();
}
function glyphId(char, high) {
    return char + "-" + high;
}
function setCanvasDimensions(cvs, width, height) {
    cvs.width = width * window.devicePixelRatio;
    cvs.height = height * window.devicePixelRatio;
    cvs.style.width = `${width}px`;
    cvs.style.height = `${height}px`;
}
function makeFontString(fontSize, fontFamily) {
    return `${fontSize} ${fontFamily}`;
}
let defaultFontSize = "";
const defaultFontFamily = "monospace";
let defaultFontString = "";
function setCanvas(cvs) {
    const state = globalState;
    state.canvas = cvs;
    setCanvasDimensions(state.canvas, window.innerWidth, window.innerHeight);
    defaultFontSize = window.getComputedStyle(state.canvas).fontSize;
    defaultFontString = makeFontString(defaultFontSize, defaultFontFamily);
    state.context = state.canvas.getContext("2d", { "alpha": false });
    setFontString(state, defaultFontString);
}
// We first define highlight information.
const defaultBackground = "#FFFFFF";
const defaultForeground = "#000000";
var DamageKind;
(function (DamageKind) {
    DamageKind[DamageKind["Cell"] = 0] = "Cell";
    DamageKind[DamageKind["Resize"] = 1] = "Resize";
    DamageKind[DamageKind["Scroll"] = 2] = "Scroll";
})(DamageKind || (DamageKind = {}));
const globalState = {
    canvas: undefined,
    context: undefined,
    commandLine: {
        status: "hidden",
        content: [],
        pos: 0,
        firstc: "",
        prompt: "",
        indent: 0,
        level: 0,
    },
    cursor: {
        currentGrid: 1,
        x: 0,
        y: 0,
        lastMove: performance.now(),
    },
    gridCharacters: [],
    gridDamages: [],
    gridDamagesCount: [],
    gridHighlights: [],
    gridSizes: [],
    highlights: [newHighlight(defaultBackground, defaultForeground)],
    linespace: 0,
    messages: [],
    messagesPositions: [],
    mode: {
        current: 0,
        styleEnabled: false,
        modeInfo: [{
                attr_id: 0,
                attr_id_lm: 0,
                blinkoff: 0,
                blinkon: 0,
                blinkwait: 0,
                cell_percentage: 0,
                cursor_shape: "block",
                name: "normal",
            }]
    },
    ruler: undefined,
    showcmd: undefined,
    showmode: undefined,
};
function pushDamage(grid, kind, h, w, x, y) {
    const damages = globalState.gridDamages[grid];
    const count = globalState.gridDamagesCount[grid];
    if (damages.length === count) {
        damages.push({ kind, h, w, x, y });
    }
    else {
        damages[count].kind = kind;
        damages[count].h = h;
        damages[count].w = w;
        damages[count].x = x;
        damages[count].y = y;
    }
    globalState.gridDamagesCount[grid] = count + 1;
}
let maxCellWidth;
let maxCellHeight;
let maxBaselineDistance;
function recomputeCharSize(ctx) {
    // 94, K+32: we ignore the first 32 ascii chars because they're non-printable
    const chars = new Array(94)
        .fill(0)
        .map((_, k) => String.fromCharCode(k + 32))
        // Concatening Â because that's the tallest character I can think of.
        .concat(["Â"]);
    let width = 0;
    let height = 0;
    let baseline = 0;
    let measure;
    for (const char of chars) {
        measure = ctx.measureText(char);
        if (measure.width > width) {
            width = measure.width;
        }
        let tmp = Math.abs(measure.actualBoundingBoxAscent);
        if (tmp > baseline) {
            baseline = tmp;
        }
        tmp += Math.abs(measure.actualBoundingBoxDescent);
        if (tmp > height) {
            height = tmp;
        }
    }
    maxCellWidth = Math.ceil(width);
    maxCellHeight = Math.ceil(height) + globalState.linespace;
    maxBaselineDistance = baseline;
    metricsInvalidated = false;
}
function getGlyphInfo(state) {
    if (metricsInvalidated
        || maxCellWidth === undefined
        || maxCellHeight === undefined
        || maxBaselineDistance === undefined) {
        recomputeCharSize(state.context);
    }
    return [maxCellWidth, maxCellHeight, maxBaselineDistance];
}
function measureWidth(state, char) {
    const charWidth = getGlyphInfo(state)[0];
    return Math.ceil(state.context.measureText(char).width / charWidth) * charWidth;
}
function getLogicalSize() {
    const state = globalState;
    const [cellWidth, cellHeight] = getGlyphInfo(state);
    return [Math.floor(state.canvas.width / cellWidth), Math.floor(state.canvas.height / cellHeight)];
}
function computeGridDimensionsFor(width, height) {
    const [cellWidth, cellHeight] = getGlyphInfo(globalState);
    return [Math.floor(width / cellWidth), Math.floor(height / cellHeight)];
}
function getGridCoordinates(x, y) {
    const [cellWidth, cellHeight] = getGlyphInfo(globalState);
    return [Math.floor(x * window.devicePixelRatio / cellWidth), Math.floor(y * window.devicePixelRatio / cellHeight)];
}
function newHighlight(bg, fg) {
    return {
        background: bg,
        bold: undefined,
        blend: undefined,
        foreground: fg,
        italic: undefined,
        reverse: undefined,
        special: undefined,
        strikethrough: undefined,
        undercurl: undefined,
        underline: undefined,
    };
}
function getGridId() {
    return 1;
}
function getCurrentMode() {
    const mode = globalState.mode;
    return mode.modeInfo[mode.current].name;
}
function getCommandLineRect(state) {
    const [width, height] = getGlyphInfo(state);
    return {
        x: width - 1,
        y: ((state.canvas.height - height - 1) / 2),
        width: (state.canvas.width - (width * 2)) + 2,
        height: height + 2,
    };
}
function damageCommandLineSpace(state) {
    const [width, height] = getGlyphInfo(state);
    const rect = getCommandLineRect(state);
    const gid = getGridId();
    const dimensions = globalState.gridSizes[gid];
    pushDamage(gid, DamageKind.Cell, Math.min(Math.ceil(rect.height / height) + 1, dimensions.height), Math.min(Math.ceil(rect.width / width) + 1, dimensions.width), Math.max(Math.floor(rect.x / width), 0), Math.max(Math.floor(rect.y / height), 0));
}
function damageMessagesSpace(state) {
    const gId = getGridId();
    const msgPos = globalState.messagesPositions[gId];
    const dimensions = globalState.gridSizes[gId];
    const [charWidth, charHeight] = getGlyphInfo(state);
    pushDamage(gId, DamageKind.Cell, Math.min(Math.ceil((state.canvas.height - msgPos.y) / charHeight) + 2, dimensions.height), Math.min(Math.ceil((state.canvas.width - msgPos.x) / charWidth) + 2, dimensions.width), Math.max(Math.floor(msgPos.x / charWidth) - 1, 0), Math.max(Math.floor(msgPos.y / charHeight) - 1, 0));
    msgPos.x = state.canvas.width;
    msgPos.y = state.canvas.height;
}
const handlers = {
    busy_start: () => { globalState.canvas.style.cursor = "wait"; },
    busy_stop: () => { globalState.canvas.style.cursor = "auto"; },
    cmdline_hide: () => {
        globalState.commandLine.status = "hidden";
        damageCommandLineSpace(globalState);
    },
    cmdline_pos: (pos, level) => {
        globalState.commandLine.pos = pos;
        globalState.commandLine.level = level;
    },
    cmdline_show: (content, pos, firstc, prompt, indent, level) => {
        globalState.commandLine.status = "shown";
        globalState.commandLine.content = content;
        globalState.commandLine.pos = pos;
        globalState.commandLine.firstc = firstc;
        globalState.commandLine.prompt = prompt;
        globalState.commandLine.indent = indent;
        globalState.commandLine.level = level;
    },
    default_colors_set: (fg, bg, sp) => {
        if (fg !== undefined && fg !== -1) {
            globalState.highlights[0].foreground = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.toHexCss)(fg);
        }
        if (bg !== undefined && bg !== -1) {
            globalState.highlights[0].background = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.toHexCss)(bg);
        }
        if (sp !== undefined && sp !== -1) {
            globalState.highlights[0].special = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.toHexCss)(sp);
        }
        const curGridSize = globalState.gridSizes[getGridId()];
        if (curGridSize !== undefined) {
            pushDamage(getGridId(), DamageKind.Cell, curGridSize.height, curGridSize.width, 0, 0);
        }
        wipeGlyphCache();
    },
    flush: () => {
        scheduleFrame();
    },
    grid_clear: (id) => {
        // glacambre: What should actually happen on grid_clear? The
        //            documentation says "clear the grid", but what does that
        //            mean? I guess the characters should be removed, but what
        //            about the highlights? Are there other things that need to
        //            be cleared?
        // bfredl: to default bg color
        //         grid_clear is not meant to be used often
        //         it is more "the terminal got screwed up, better to be safe
        //         than sorry"
        const charGrid = globalState.gridCharacters[id];
        const highGrid = globalState.gridHighlights[id];
        const dims = globalState.gridSizes[id];
        for (let j = 0; j < dims.height; ++j) {
            for (let i = 0; i < dims.width; ++i) {
                charGrid[j][i] = " ";
                highGrid[j][i] = 0;
            }
        }
        pushDamage(id, DamageKind.Cell, dims.height, dims.width, 0, 0);
    },
    grid_cursor_goto: (id, row, column) => {
        const cursor = globalState.cursor;
        pushDamage(getGridId(), DamageKind.Cell, 1, 1, cursor.x, cursor.y);
        cursor.currentGrid = id;
        cursor.x = column;
        cursor.y = row;
        cursor.lastMove = performance.now();
    },
    grid_line: (id, row, col, changes) => {
        const charGrid = globalState.gridCharacters[id];
        const highlights = globalState.gridHighlights[id];
        let prevCol = col;
        let high = 0;
        for (let i = 0; i < changes.length; ++i) {
            const change = changes[i];
            const chara = change[0];
            if (change[1] !== undefined) {
                high = change[1];
            }
            const repeat = change[2] === undefined ? 1 : change[2];
            pushDamage(id, DamageKind.Cell, 1, repeat, prevCol, row);
            const limit = prevCol + repeat;
            for (let j = prevCol; j < limit; j += 1) {
                charGrid[row][j] = chara;
                highlights[row][j] = high;
            }
            prevCol = limit;
        }
    },
    grid_resize: (id, width, height) => {
        const state = globalState;
        const createGrid = state.gridCharacters[id] === undefined;
        if (createGrid) {
            state.gridCharacters[id] = [];
            state.gridCharacters[id].push([]);
            state.gridSizes[id] = { width: 0, height: 0 };
            state.gridDamages[id] = [];
            state.gridDamagesCount[id] = 0;
            state.gridHighlights[id] = [];
            state.gridHighlights[id].push([]);
            state.messagesPositions[id] = {
                x: state.canvas.width,
                y: state.canvas.height,
            };
        }
        const curGridSize = globalState.gridSizes[id];
        pushDamage(id, DamageKind.Resize, height, width, curGridSize.width, curGridSize.height);
        const highlights = globalState.gridHighlights[id];
        const charGrid = globalState.gridCharacters[id];
        if (width > charGrid[0].length) {
            for (let i = 0; i < charGrid.length; ++i) {
                const row = charGrid[i];
                const highs = highlights[i];
                while (row.length < width) {
                    row.push(" ");
                    highs.push(0);
                }
            }
        }
        if (height > charGrid.length) {
            while (charGrid.length < height) {
                charGrid.push((new Array(width)).fill(" "));
                highlights.push((new Array(width)).fill(0));
            }
        }
        pushDamage(id, DamageKind.Cell, 0, width, 0, curGridSize.height);
        curGridSize.width = width;
        curGridSize.height = height;
    },
    grid_scroll: (id, top, bot, _left, _right, rows, _cols) => {
        const dimensions = globalState.gridSizes[id];
        const charGrid = globalState.gridCharacters[id];
        const highGrid = globalState.gridHighlights[id];
        if (rows > 0) {
            const bottom = (bot + rows) >= dimensions.height
                ? dimensions.height - rows
                : bot;
            for (let y = top; y < bottom; ++y) {
                const srcChars = charGrid[y + rows];
                const dstChars = charGrid[y];
                const srcHighs = highGrid[y + rows];
                const dstHighs = highGrid[y];
                for (let x = 0; x < dimensions.width; ++x) {
                    dstChars[x] = srcChars[x];
                    dstHighs[x] = srcHighs[x];
                }
            }
            pushDamage(id, DamageKind.Cell, dimensions.height, dimensions.width, 0, 0);
        }
        else if (rows < 0) {
            for (let y = bot - 1; y >= top && (y + rows) >= 0; --y) {
                const srcChars = charGrid[y + rows];
                const dstChars = charGrid[y];
                const srcHighs = highGrid[y + rows];
                const dstHighs = highGrid[y];
                for (let x = 0; x < dimensions.width; ++x) {
                    dstChars[x] = srcChars[x];
                    dstHighs[x] = srcHighs[x];
                }
            }
            pushDamage(id, DamageKind.Cell, dimensions.height, dimensions.width, 0, 0);
        }
    },
    hl_attr_define: (id, rgbAttr) => {
        const highlights = globalState.highlights;
        if (highlights[id] === undefined) {
            highlights[id] = newHighlight(undefined, undefined);
        }
        highlights[id].foreground = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.toHexCss)(rgbAttr.foreground);
        highlights[id].background = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.toHexCss)(rgbAttr.background);
        highlights[id].bold = rgbAttr.bold;
        highlights[id].blend = rgbAttr.blend;
        highlights[id].italic = rgbAttr.italic;
        highlights[id].special = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.toHexCss)(rgbAttr.special);
        highlights[id].strikethrough = rgbAttr.strikethrough;
        highlights[id].undercurl = rgbAttr.undercurl;
        highlights[id].underline = rgbAttr.underline;
        highlights[id].reverse = rgbAttr.reverse;
    },
    mode_change: (_, modeIdx) => {
        globalState.mode.current = modeIdx;
        if (globalState.mode.styleEnabled) {
            const cursor = globalState.cursor;
            pushDamage(getGridId(), DamageKind.Cell, 1, 1, cursor.x, cursor.y);
            scheduleFrame();
        }
    },
    mode_info_set: (cursorStyleEnabled, modeInfo) => {
        // Missing: handling of cell-percentage
        const mode = globalState.mode;
        mode.styleEnabled = cursorStyleEnabled;
        mode.modeInfo = modeInfo;
    },
    msg_clear: () => {
        damageMessagesSpace(globalState);
        globalState.messages.length = 0;
    },
    msg_history_show: (entries) => {
        damageMessagesSpace(globalState);
        globalState.messages = entries.map(([, b]) => b);
    },
    msg_ruler: (content) => {
        damageMessagesSpace(globalState);
        globalState.ruler = content;
    },
    msg_show: (_, content, replaceLast) => {
        damageMessagesSpace(globalState);
        if (replaceLast) {
            globalState.messages.length = 0;
        }
        globalState.messages.push(content);
    },
    msg_showcmd: (content) => {
        damageMessagesSpace(globalState);
        globalState.showcmd = content;
    },
    msg_showmode: (content) => {
        damageMessagesSpace(globalState);
        globalState.showmode = content;
    },
    option_set: (option, value) => {
        const state = globalState;
        switch (option) {
            case "guifont":
                {
                    let newFontString;
                    if (value === "") {
                        newFontString = defaultFontString;
                    }
                    else {
                        const guifont = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.parseGuifont)(value, {
                            "font-family": defaultFontFamily,
                            "font-size": defaultFontSize,
                        });
                        newFontString = makeFontString(guifont["font-size"], guifont["font-family"]);
                    }
                    if (newFontString === fontString) {
                        break;
                    }
                    setFontString(state, newFontString);
                    const [charWidth, charHeight] = getGlyphInfo(state);
                    functions.ui_try_resize_grid(getGridId(), Math.floor(state.canvas.width / charWidth), Math.floor(state.canvas.height / charHeight));
                }
                break;
            case "linespace":
                {
                    if (state.linespace === value) {
                        break;
                    }
                    state.linespace = value;
                    invalidateMetrics();
                    const [charWidth, charHeight] = getGlyphInfo(state);
                    const gid = getGridId();
                    const curGridSize = state.gridSizes[gid];
                    if (curGridSize !== undefined) {
                        pushDamage(getGridId(), DamageKind.Cell, curGridSize.height, curGridSize.width, 0, 0);
                    }
                    functions.ui_try_resize_grid(gid, Math.floor(state.canvas.width / charWidth), Math.floor(state.canvas.height / charHeight));
                }
                break;
        }
    },
};
// keep track of wheter a frame is already being scheduled or not. This avoids
// asking for multiple frames where we'd paint the same thing anyway.
let frameScheduled = false;
function scheduleFrame() {
    if (!frameScheduled) {
        frameScheduled = true;
        window.requestAnimationFrame(paint);
    }
}
function paintMessages(state) {
    const ctx = state.context;
    const gId = getGridId();
    const messagesPosition = state.messagesPositions[gId];
    const [, charHeight, baseline] = getGlyphInfo(state);
    const messages = state.messages;
    // we need to know the size of the message box in order to draw its border
    // and background. The algorithm to compute this is equivalent to drawing
    // all messages. So we put the drawing algorithm in a function with a
    // boolean argument that will control whether text should actually be
    // drawn. This lets us run the algorithm once to get the dimensions and
    // then again to actually draw text.
    function renderMessages(draw) {
        let renderedX = state.canvas.width;
        let renderedY = state.canvas.height - charHeight + baseline;
        for (let i = messages.length - 1; i >= 0; --i) {
            const message = messages[i];
            for (let j = message.length - 1; j >= 0; --j) {
                const chars = Array.from(message[j][1]);
                for (let k = chars.length - 1; k >= 0; --k) {
                    const char = chars[k];
                    const measuredWidth = measureWidth(state, char);
                    if (renderedX - measuredWidth < 0) {
                        if (renderedY - charHeight < 0) {
                            return;
                        }
                        renderedX = state.canvas.width;
                        renderedY = renderedY - charHeight;
                    }
                    renderedX = renderedX - measuredWidth;
                    if (draw) {
                        ctx.fillText(char, renderedX, renderedY);
                    }
                    if (renderedX < messagesPosition.x) {
                        messagesPosition.x = renderedX;
                    }
                    if (renderedY < messagesPosition.y) {
                        messagesPosition.y = renderedY - baseline;
                    }
                }
            }
            renderedX = state.canvas.width;
            renderedY = renderedY - charHeight;
        }
    }
    renderMessages(false);
    ctx.fillStyle = state.highlights[0].foreground;
    ctx.fillRect(messagesPosition.x - 2, messagesPosition.y - 2, state.canvas.width - messagesPosition.x + 2, state.canvas.height - messagesPosition.y + 2);
    ctx.fillStyle = state.highlights[0].background;
    ctx.fillRect(messagesPosition.x - 1, messagesPosition.y - 1, state.canvas.width - messagesPosition.x + 1, state.canvas.height - messagesPosition.y + 1);
    ctx.fillStyle = state.highlights[0].foreground;
    renderMessages(true);
}
function paintCommandlineWindow(state) {
    const ctx = state.context;
    const [charWidth, charHeight, baseline] = getGlyphInfo(state);
    const commandLine = state.commandLine;
    const rect = getCommandLineRect(state);
    // outer rectangle
    ctx.fillStyle = state.highlights[0].foreground;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    // inner rectangle
    rect.x += 1;
    rect.y += 1;
    rect.width -= 2;
    rect.height -= 2;
    ctx.fillStyle = state.highlights[0].background;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    // padding of inner rectangle
    rect.x += 1;
    rect.y += 1;
    rect.width -= 2;
    rect.height -= 2;
    // Position where text should be drawn
    let x = rect.x;
    const y = rect.y;
    // first character
    ctx.fillStyle = state.highlights[0].foreground;
    ctx.fillText(commandLine.firstc, x, y + baseline);
    x += charWidth;
    rect.width -= charWidth;
    const encoder = new TextEncoder();
    // reduce the commandline's content to a string for iteration
    const str = commandLine.content.reduce((r, segment) => r + segment[1], "");
    // Array.from(str) will return an array whose cells are grapheme
    // clusters. It is important to iterate over graphemes instead of the
    // string because iterating over the string would sometimes yield only
    // half of the UTF-16 character/surrogate pair.
    const characters = Array.from(str);
    // renderedI is the horizontal pixel position where the next character
    // should be drawn
    let renderedI = 0;
    // encodedI is the number of bytes that have been iterated over thus
    // far. It is used to find out where to draw the cursor. Indeed, neovim
    // sends the cursor's position as a byte position within the UTF-8
    // encoded commandline string.
    let encodedI = 0;
    // cursorX is the horizontal pixel position where the cursor should be
    // drawn.
    let cursorX = 0;
    // The index of the first character of `characters` that can be drawn.
    // It is higher than 0 when the command line string is too long to be
    // entirely displayed.
    let sliceStart = 0;
    // The index of the last character of `characters` that can be drawn.
    // It is different from characters.length when the command line string
    // is too long to be entirely displayed.
    let sliceEnd = 0;
    // The horizontal width in pixels taken by the displayed slice. It
    // is used to keep track of whether the commandline string is longer
    // than the commandline window.
    let sliceWidth = 0;
    // cursorDisplayed keeps track of whether the cursor can be displayed
    // in the slice.
    let cursorDisplayed = commandLine.pos === 0;
    // description of the algorithm:
    // For each character, find out its width. If it cannot fit in the
    // command line window along with the rest of the slice and the cursor
    // hasn't been found yet, remove characters from the beginning of the
    // slice until the character fits.
    // Stop either when all characters are in the slice or when the cursor
    // can be displayed and the slice takes all available width.
    for (let i = 0; i < characters.length; ++i) {
        sliceEnd = i;
        const char = characters[i];
        const cWidth = measureWidth(state, char);
        renderedI += cWidth;
        sliceWidth += cWidth;
        if (sliceWidth > rect.width) {
            if (cursorDisplayed) {
                break;
            }
            do {
                const removedChar = characters[sliceStart];
                const removedWidth = measureWidth(state, removedChar);
                renderedI -= removedWidth;
                sliceWidth -= removedWidth;
                sliceStart += 1;
            } while (sliceWidth > rect.width);
        }
        encodedI += encoder.encode(char).length;
        if (encodedI === commandLine.pos) {
            cursorX = renderedI;
            cursorDisplayed = true;
        }
    }
    if (characters.length > 0) {
        renderedI = 0;
        for (let i = sliceStart; i <= sliceEnd; ++i) {
            const char = characters[i];
            ctx.fillText(char, x + renderedI, y + baseline);
            renderedI += measureWidth(state, char);
        }
    }
    ctx.fillRect(x + cursorX, y, 1, charHeight);
}
function paint(_) {
    frameScheduled = false;
    const state = globalState;
    const canvas = state.canvas;
    const context = state.context;
    const gid = getGridId();
    const charactersGrid = state.gridCharacters[gid];
    const highlightsGrid = state.gridHighlights[gid];
    const damages = state.gridDamages[gid];
    const damageCount = state.gridDamagesCount[gid];
    const highlights = state.highlights;
    const [charWidth, charHeight, baseline] = getGlyphInfo(state);
    for (let i = 0; i < damageCount; ++i) {
        const damage = damages[i];
        switch (damage.kind) {
            case DamageKind.Resize:
                {
                    const pixelWidth = damage.w * charWidth / window.devicePixelRatio;
                    const pixelHeight = damage.h * charHeight / window.devicePixelRatio;
                    _page_proxy__WEBPACK_IMPORTED_MODULE_0__.page.resizeEditor(pixelWidth, pixelHeight);
                    setCanvasDimensions(canvas, pixelWidth, pixelHeight);
                    // Note: changing width and height resets font, so we have to
                    // set it again. Who thought this was a good idea???
                    context.font = fontString;
                }
                break;
            case DamageKind.Scroll:
            case DamageKind.Cell:
                for (let y = damage.y; y < damage.y + damage.h && y < charactersGrid.length; ++y) {
                    const row = charactersGrid[y];
                    const rowHigh = highlightsGrid[y];
                    const pixelY = y * charHeight;
                    for (let x = damage.x; x < damage.x + damage.w && x < row.length; ++x) {
                        if (row[x] === "") {
                            continue;
                        }
                        const pixelX = x * charWidth;
                        const id = glyphId(row[x], rowHigh[x]);
                        if (glyphCache[id] === undefined) {
                            const cellHigh = highlights[rowHigh[x]];
                            const width = Math.ceil(measureWidth(state, row[x]) / charWidth) * charWidth;
                            let background = cellHigh.background || highlights[0].background;
                            let foreground = cellHigh.foreground || highlights[0].foreground;
                            if (cellHigh.reverse) {
                                const tmp = background;
                                background = foreground;
                                foreground = tmp;
                            }
                            context.fillStyle = background;
                            context.fillRect(pixelX, pixelY, width, charHeight);
                            context.fillStyle = foreground;
                            let fontStr = "";
                            let changeFont = false;
                            if (cellHigh.bold) {
                                fontStr += " bold ";
                                changeFont = true;
                            }
                            if (cellHigh.italic) {
                                fontStr += " italic ";
                                changeFont = true;
                            }
                            if (changeFont) {
                                context.font = fontStr + fontString;
                            }
                            context.fillText(row[x], pixelX, pixelY + baseline);
                            if (changeFont) {
                                context.font = fontString;
                            }
                            if (cellHigh.strikethrough) {
                                context.fillRect(pixelX, pixelY + baseline / 2, width, 1);
                            }
                            context.fillStyle = cellHigh.special;
                            const baselineHeight = (charHeight - baseline);
                            if (cellHigh.underline) {
                                const linepos = baselineHeight * 0.3;
                                context.fillRect(pixelX, pixelY + baseline + linepos, width, 1);
                            }
                            if (cellHigh.undercurl) {
                                const curlpos = baselineHeight * 0.6;
                                for (let abscissa = pixelX; abscissa < pixelX + width; ++abscissa) {
                                    context.fillRect(abscissa, pixelY + baseline + curlpos + Math.cos(abscissa), 1, 1);
                                }
                            }
                            // reason for the check: we can't retrieve pixels
                            // drawn outside the viewport
                            if (pixelX >= 0
                                && pixelY >= 0
                                && (pixelX + width < canvas.width)
                                && (pixelY + charHeight < canvas.height)) {
                                glyphCache[id] = context.getImageData(pixelX, pixelY, width, charHeight);
                            }
                        }
                        else {
                            context.putImageData(glyphCache[id], pixelX, pixelY);
                        }
                    }
                }
                break;
        }
    }
    if (state.messages.length > 0) {
        paintMessages(state);
    }
    // If the command line is shown, the cursor's in it
    if (state.commandLine.status === "shown") {
        paintCommandlineWindow(state);
    }
    else {
        const cursor = state.cursor;
        if (cursor.currentGrid === gid) {
            // Missing: handling of cell-percentage
            const mode = state.mode;
            const info = mode.styleEnabled
                ? mode.modeInfo[mode.current]
                : mode.modeInfo[0];
            const shouldBlink = (info.blinkwait > 0 && info.blinkon > 0 && info.blinkoff > 0);
            // Decide color. As described in the doc, if attr_id is 0 colors
            // should be reverted.
            let background = highlights[info.attr_id].background;
            let foreground = highlights[info.attr_id].foreground;
            if (info.attr_id === 0) {
                const tmp = background;
                background = foreground;
                foreground = tmp;
            }
            // Decide cursor shape. Default to block, change to
            // vertical/horizontal if needed.
            const cursorWidth = cursor.x * charWidth;
            let cursorHeight = cursor.y * charHeight;
            let width = charWidth;
            let height = charHeight;
            if (info.cursor_shape === "vertical") {
                width = 1;
            }
            else if (info.cursor_shape === "horizontal") {
                cursorHeight += charHeight - 2;
                height = 1;
            }
            const now = performance.now();
            // Decide if the cursor should be inverted. This only happens if
            // blinking is on, we've waited blinkwait time and we're in the
            // "blinkoff" time slot.
            const blinkOff = shouldBlink
                && (now - info.blinkwait > cursor.lastMove)
                && ((now % (info.blinkon + info.blinkoff)) > info.blinkon);
            if (blinkOff) {
                const high = highlights[highlightsGrid[cursor.y][cursor.x]];
                background = high.background;
                foreground = high.foreground;
            }
            // Finally draw cursor
            context.fillStyle = background;
            context.fillRect(cursorWidth, cursorHeight, width, height);
            if (info.cursor_shape === "block") {
                context.fillStyle = foreground;
                const char = charactersGrid[cursor.y][cursor.x];
                context.fillText(char, cursor.x * charWidth, cursor.y * charHeight + baseline);
            }
            if (shouldBlink) {
                // if the cursor should blink, we need to paint continuously
                const relativeNow = performance.now() % (info.blinkon + info.blinkoff);
                const nextPaint = relativeNow < info.blinkon
                    ? info.blinkon - relativeNow
                    : info.blinkoff - (relativeNow - info.blinkon);
                setTimeout(scheduleFrame, nextPaint);
            }
        }
    }
    state.gridDamagesCount[gid] = 0;
}
function onRedraw(events) {
    for (let i = 0; i < events.length; ++i) {
        const event = events[i];
        const handler = handlers[event[0]];
        if (handler !== undefined) {
            for (let j = 1; j < event.length; ++j) {
                handler.apply(globalState, event[j]);
            }
        }
        else {
            // console.error(`${event[0]} is not implemented.`);
        }
    }
}


/***/ }),

/***/ "./src/utils/configuration.ts":
/*!************************************!*\
  !*** ./src/utils/configuration.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "confReady": () => (/* binding */ confReady),
/* harmony export */   "getGlobalConf": () => (/* binding */ getGlobalConf),
/* harmony export */   "getConf": () => (/* binding */ getConf),
/* harmony export */   "getConfForUrl": () => (/* binding */ getConfForUrl)
/* harmony export */ });
/* provided dependency */ var browser = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");
let conf = undefined;
const confReady = new Promise(resolve => {
    browser.storage.local.get().then((obj) => {
        conf = obj;
        resolve(true);
    });
});
browser.storage.onChanged.addListener((changes) => {
    Object
        .entries(changes)
        .forEach(([key, value]) => confReady.then(() => {
        conf[key] = value.newValue;
    }));
});
function getGlobalConf() {
    // Can't be tested for
    /* istanbul ignore next */
    if (conf === undefined) {
        throw new Error("getGlobalConf called before config was ready");
    }
    return conf.globalSettings;
}
function getConf() {
    return getConfForUrl(document.location.href);
}
function getConfForUrl(url) {
    const localSettings = conf.localSettings;
    function or1(val) {
        if (val === undefined) {
            return 1;
        }
        return val;
    }
    // Can't be tested for
    /* istanbul ignore next */
    if (localSettings === undefined) {
        throw new Error("Error: your settings are undefined. Try reloading the page. If this error persists, try the troubleshooting guide: https://github.com/glacambre/firenvim/blob/master/TROUBLESHOOTING.md");
    }
    return Array.from(Object.entries(localSettings))
        .filter(([pat, _]) => (new RegExp(pat)).test(url))
        .sort((e1, e2) => (or1(e1[1].priority) - or1(e2[1].priority)))
        .reduce((acc, [_, cur]) => Object.assign(acc, cur), {});
}


/***/ }),

/***/ "./src/utils/keys.ts":
/*!***************************!*\
  !*** ./src/utils/keys.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nonLiteralKeys": () => (/* binding */ nonLiteralKeys),
/* harmony export */   "keysToEvents": () => (/* binding */ keysToEvents),
/* harmony export */   "translateKey": () => (/* binding */ translateKey),
/* harmony export */   "addModifier": () => (/* binding */ addModifier)
/* harmony export */ });
const nonLiteralKeys = {
    " ": "<Space>",
    "<": "<lt>",
    "ArrowDown": "<Down>",
    "ArrowLeft": "<Left>",
    "ArrowRight": "<Right>",
    "ArrowUp": "<Up>",
    "Backspace": "<BS>",
    "Delete": "<Del>",
    "End": "<End>",
    "Enter": "<CR>",
    "Escape": "<Esc>",
    "F1": "<F1>",
    "F10": "<F10>",
    "F11": "<F11>",
    "F12": "<F12>",
    "F13": "<F13>",
    "F14": "<F14>",
    "F15": "<F15>",
    "F16": "<F16>",
    "F17": "<F17>",
    "F18": "<F18>",
    "F19": "<F19>",
    "F2": "<F2>",
    "F20": "<F20>",
    "F21": "<F21>",
    "F22": "<F22>",
    "F23": "<F23>",
    "F24": "<F24>",
    "F3": "<F3>",
    "F4": "<F4>",
    "F5": "<F5>",
    "F6": "<F6>",
    "F7": "<F7>",
    "F8": "<F8>",
    "F9": "<F9>",
    "Home": "<Home>",
    "PageDown": "<PageDown>",
    "PageUp": "<PageUp>",
    "Tab": "<Tab>",
    "\\": "<Bslash>",
    "|": "<Bar>",
};
const nonLiteralVimKeys = Object.fromEntries(Object
    .entries(nonLiteralKeys)
    .map(([x, y]) => [y, x]));
const nonLiteralKeyCodes = {
    "Enter": 13,
    "Space": 32,
    "Tab": 9,
    "Delete": 46,
    "End": 35,
    "Home": 36,
    "Insert": 45,
    "PageDown": 34,
    "PageUp": 33,
    "ArrowDown": 40,
    "ArrowLeft": 37,
    "ArrowRight": 39,
    "ArrowUp": 38,
    "Escape": 27,
};
// Given a "special" key representation (e.g. <Enter> or <M-l>), returns an
// array of three javascript keyevents, the first one representing the
// corresponding keydown, the second one a keypress and the third one a keyup
// event.
function modKeyToEvents(k) {
    let mods = "";
    let key = nonLiteralVimKeys[k];
    let ctrlKey = false;
    let altKey = false;
    let shiftKey = false;
    if (key === undefined) {
        const arr = k.slice(1, -1).split("-");
        mods = arr[0];
        key = arr[1];
        ctrlKey = /c/i.test(mods);
        altKey = /a/i.test(mods);
        const specialChar = "<" + key + ">";
        if (nonLiteralVimKeys[specialChar] !== undefined) {
            key = nonLiteralVimKeys[specialChar];
            shiftKey = false;
        }
        else {
            shiftKey = key !== key.toLocaleLowerCase();
        }
    }
    // Some pages rely on keyCodes to figure out what key was pressed. This is
    // awful because keycodes aren't guaranteed to be the same acrross
    // browsers/OS/keyboard layouts but try to do the right thing anyway.
    // https://github.com/glacambre/firenvim/issues/723
    let keyCode = 0;
    if (/^[a-zA-Z0-9]$/.test(key)) {
        keyCode = key.charCodeAt(0);
    }
    else if (nonLiteralKeyCodes[key] !== undefined) {
        keyCode = nonLiteralKeyCodes[key];
    }
    const init = { key, keyCode, ctrlKey, altKey, shiftKey, bubbles: true };
    return [
        new KeyboardEvent("keydown", init),
        new KeyboardEvent("keypress", init),
        new KeyboardEvent("keyup", init),
    ];
}
// Given a "simple" key (e.g. `a`, `1`…), returns an array of three javascript
// events representing the action of pressing the key.
function keyToEvents(key) {
    const shiftKey = key !== key.toLocaleLowerCase();
    return [
        new KeyboardEvent("keydown", { key, shiftKey, bubbles: true }),
        new KeyboardEvent("keypress", { key, shiftKey, bubbles: true }),
        new KeyboardEvent("keyup", { key, shiftKey, bubbles: true }),
    ];
}
// Given an array of string representation of keys (e.g. ["a", "<Enter>", …]),
// returns an array of javascript keyboard events that simulate these keys
// being pressed.
function keysToEvents(keys) {
    // Code to split mod keys and non-mod keys:
    // const keys = str.match(/([<>][^<>]+[<>])|([^<>]+)/g)
    // if (keys === null) {
    //     return [];
    // }
    return keys.map((key) => {
        if (key[0] === "<") {
            return modKeyToEvents(key);
        }
        return keyToEvents(key);
    }).flat();
}
// Turns a non-literal key (e.g. "Enter") into a vim-equivalent "<Enter>"
function translateKey(key) {
    if (nonLiteralKeys[key] !== undefined) {
        return nonLiteralKeys[key];
    }
    return key;
}
// Add modifier `mod` (`A`, `C`, `S`…) to `text` (a vim key `b`, `<Enter>`,
// `<CS-x>`…)
function addModifier(mod, text) {
    let match;
    let modifiers = "";
    let key = "";
    if ((match = text.match(/^<([A-Z]{1,5})-(.+)>$/))) {
        modifiers = match[1];
        key = match[2];
    }
    else if ((match = text.match(/^<(.+)>$/))) {
        key = match[1];
    }
    else {
        key = text;
    }
    return "<" + mod + modifiers + "-" + key + ">";
}


/***/ }),

/***/ "./src/utils/utils.ts":
/*!****************************!*\
  !*** ./src/utils/utils.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isChrome": () => (/* binding */ isChrome),
/* harmony export */   "isThunderbird": () => (/* binding */ isThunderbird),
/* harmony export */   "executeInPage": () => (/* binding */ executeInPage),
/* harmony export */   "getIconImageData": () => (/* binding */ getIconImageData),
/* harmony export */   "toFileName": () => (/* binding */ toFileName),
/* harmony export */   "languageToExtensions": () => (/* binding */ languageToExtensions),
/* harmony export */   "parseGuifont": () => (/* binding */ parseGuifont),
/* harmony export */   "computeSelector": () => (/* binding */ computeSelector),
/* harmony export */   "toHexCss": () => (/* binding */ toHexCss)
/* harmony export */ });
/* provided dependency */ var browser = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");
let curHost = "firefox";
// Can't get coverage for thunderbird.
/* istanbul ignore next */
if (browser.composeScripts !== undefined || document.location.href === "about:blank?compose") {
    curHost = "thunderbird";
    // Chrome doesn't have a "browser" object, instead it uses "chrome".
}
else if (window.browser === undefined) {
    curHost = "chrome";
}
function isChrome() {
    return curHost === "chrome";
}
function isThunderbird() {
    return curHost === "thunderbird";
}
// Runs CODE in the page's context by setting up a custom event listener,
// embedding a script element that runs the piece of code and emits its result
// as an event.
function executeInPage(code) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        const eventId = (new URL(browser.runtime.getURL(""))).hostname + Math.random();
        script.innerHTML = `(async (evId) => {
            try {
                let result;
                result = await ${code};
                window.dispatchEvent(new CustomEvent(evId, {
                    detail: {
                        success: true,
                        result,
                    }
                }));
            } catch (e) {
                window.dispatchEvent(new CustomEvent(evId, {
                    detail: { success: false, reason: e },
                }));
            }
        })(${JSON.stringify(eventId)})`;
        window.addEventListener(eventId, ({ detail }) => {
            script.parentNode.removeChild(script);
            if (detail.success) {
                return resolve(detail.result);
            }
            return reject(detail.reason);
        }, { once: true });
        document.head.appendChild(script);
    });
}
// Various filters that are used to change the appearance of the BrowserAction
// icon.
const svgpath = "firenvim.svg";
const transformations = {
    disabled: (img) => {
        for (let i = 0; i < img.length; i += 4) {
            // Skip transparent pixels
            if (img[i + 3] === 0) {
                continue;
            }
            const mean = Math.floor((img[i] + img[i + 1] + img[i + 2]) / 3);
            img[i] = mean;
            img[i + 1] = mean;
            img[i + 2] = mean;
        }
    },
    error: (img) => {
        for (let i = 0; i < img.length; i += 4) {
            // Turn transparent pixels red
            if (img[i + 3] === 0) {
                img[i] = 255;
                img[i + 3] = 255;
            }
        }
    },
    normal: ((_img) => undefined),
    notification: (img) => {
        for (let i = 0; i < img.length; i += 4) {
            // Turn transparent pixels yellow
            if (img[i + 3] === 0) {
                img[i] = 255;
                img[i + 1] = 255;
                img[i + 3] = 255;
            }
        }
    },
};
// Takes an icon kind and dimensions as parameter, draws that to a canvas and
// returns a promise that will be resolved with the canvas' image data.
function getIconImageData(kind, width = 32, height = 32) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image(width, height);
    const result = new Promise((resolve) => img.addEventListener("load", () => {
        ctx.drawImage(img, 0, 0, width, height);
        const id = ctx.getImageData(0, 0, width, height);
        transformations[kind](id.data);
        resolve(id);
    }));
    img.src = svgpath;
    return result;
}
// Given a url and a selector, tries to compute a name that will be unique,
// short and readable for the user.
function toFileName(url, id, language) {
    let parsedURL;
    try {
        parsedURL = new URL(url);
    }
    catch (e) {
        // Only happens with thunderbird, where we can't get coverage
        /* istanbul ignore next */
        parsedURL = { hostname: 'thunderbird', pathname: 'mail' };
    }
    const shortId = id.replace(/:nth-of-type/g, "");
    const toAlphaNum = (str) => (str.match(/[a-zA-Z0-9]+/g) || [])
        .join("-")
        .slice(-32);
    const ext = languageToExtensions(language);
    return `${parsedURL.hostname}_${toAlphaNum(parsedURL.pathname)}_${toAlphaNum(shortId)}.${ext}`;
}
// Given a language name, returns a filename extension. Can return undefined.
function languageToExtensions(language) {
    if (language === undefined || language === null) {
        language = "";
    }
    const lang = language.toLowerCase();
    /* istanbul ignore next */
    switch (lang) {
        case "apl": return "apl";
        case "brainfuck": return "bf";
        case "c": return "c";
        case "c#": return "cs";
        case "c++": return "cpp";
        case "ceylon": return "ceylon";
        case "clike": return "c";
        case "clojure": return "clj";
        case "cmake": return ".cmake";
        case "cobol": return "cbl";
        case "coffeescript": return "coffee";
        case "commonlisp": return "lisp";
        case "crystal": return "cr";
        case "css": return "css";
        case "cython": return "py";
        case "d": return "d";
        case "dart": return "dart";
        case "diff": return "diff";
        case "dockerfile": return "dockerfile";
        case "dtd": return "dtd";
        case "dylan": return "dylan";
        // Eiffel was there first but elixir seems more likely
        // case "eiffel":           return "e";
        case "elixir": return "e";
        case "elm": return "elm";
        case "erlang": return "erl";
        case "f#": return "fs";
        case "factor": return "factor";
        case "forth": return "fth";
        case "fortran": return "f90";
        case "gas": return "asm";
        case "go": return "go";
        // GFM: CodeMirror's github-flavored markdown
        case "gfm": return "md";
        case "groovy": return "groovy";
        case "haml": return "haml";
        case "handlebars": return "hbs";
        case "haskell": return "hs";
        case "haxe": return "hx";
        case "html": return "html";
        case "htmlembedded": return "html";
        case "htmlmixed": return "html";
        case "java": return "java";
        case "javascript": return "js";
        case "jinja2": return "jinja";
        case "julia": return "jl";
        case "jsx": return "jsx";
        case "kotlin": return "kt";
        case "latex": return "latex";
        case "less": return "less";
        case "lua": return "lua";
        case "markdown": return "md";
        case "mllike": return "ml";
        case "ocaml": return "ml";
        case "octave": return "m";
        case "pascal": return "pas";
        case "perl": return "pl";
        case "php": return "php";
        case "powershell": return "ps1";
        case "python": return "py";
        case "r": return "r";
        case "rst": return "rst";
        case "ruby": return "ruby";
        case "rust": return "rs";
        case "sas": return "sas";
        case "sass": return "sass";
        case "scala": return "scala";
        case "scheme": return "scm";
        case "scss": return "scss";
        case "smalltalk": return "st";
        case "shell": return "sh";
        case "sql": return "sql";
        case "stex": return "latex";
        case "swift": return "swift";
        case "tcl": return "tcl";
        case "toml": return "toml";
        case "twig": return "twig";
        case "typescript": return "ts";
        case "vb": return "vb";
        case "vbscript": return "vbs";
        case "verilog": return "sv";
        case "vhdl": return "vhdl";
        case "xml": return "xml";
        case "yaml": return "yaml";
        case "z80": return "z8a";
    }
    return "txt";
}
// Make tslint happy
const fontFamily = "font-family";
// Parses a guifont declaration as described in `:h E244`
// defaults: default value for each of.
// Can't be tested e2e :/
/* istanbul ignore next */
function parseGuifont(guifont, defaults) {
    const options = guifont.split(":");
    const result = Object.assign({}, defaults);
    if (/^[a-zA-Z0-9]+$/.test(options[0])) {
        result[fontFamily] = options[0];
    }
    else {
        result[fontFamily] = JSON.stringify(options[0]);
    }
    if (defaults[fontFamily]) {
        result[fontFamily] += `, ${defaults[fontFamily]}`;
    }
    return options.slice(1).reduce((acc, option) => {
        switch (option[0]) {
            case "h":
                acc["font-size"] = `${option.slice(1)}pt`;
                break;
            case "b":
                acc["font-weight"] = "bold";
                break;
            case "i":
                acc["font-style"] = "italic";
                break;
            case "u":
                acc["text-decoration"] = "underline";
                break;
            case "s":
                acc["text-decoration"] = "line-through";
                break;
            case "w": // Can't set font width. Would have to adjust cell width.
            case "c": // Can't set character set
                break;
        }
        return acc;
    }, result);
}
// Computes a unique selector for its argument.
function computeSelector(element) {
    function uniqueSelector(e) {
        // Only matching alphanumeric selectors because others chars might have special meaning in CSS
        if (e.id && e.id.match("^[a-zA-Z0-9_-]+$")) {
            const id = e.tagName + `[id="${e.id}"]`;
            if (document.querySelectorAll(id).length === 1) {
                return id;
            }
        }
        // If we reached the top of the document
        if (!e.parentElement) {
            return "HTML";
        }
        // Compute the position of the element
        const index = Array.from(e.parentElement.children)
            .filter(child => child.tagName === e.tagName)
            .indexOf(e) + 1;
        return `${uniqueSelector(e.parentElement)} > ${e.tagName}:nth-of-type(${index})`;
    }
    return uniqueSelector(element);
}
// Turns a number into its hash+6 number hexadecimal representation.
function toHexCss(n) {
    if (n === undefined)
        return undefined;
    const str = n.toString(16);
    // Pad with leading zeros
    return "#" + (new Array(6 - str.length)).fill("0").join("") + str;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/frame.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isReady": () => (/* binding */ isReady)
/* harmony export */ });
/* harmony import */ var _Neovim__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Neovim */ "./src/Neovim.ts");
/* harmony import */ var _page_proxy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page/proxy */ "./src/page/proxy.ts");
/* harmony import */ var _render_RedrawCanvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render/RedrawCanvas */ "./src/render/RedrawCanvas.ts");
/* harmony import */ var _utils_configuration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/configuration */ "./src/utils/configuration.ts");
/* harmony import */ var _utils_keys__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/keys */ "./src/utils/keys.ts");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/utils */ "./src/utils/utils.ts");
/* provided dependency */ var browser = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");






const frameIdPromise = browser
    .runtime
    .sendMessage({ funcName: ["publishFrameId"] })
    .then((f) => window.frameId = f);
const infoPromise = frameIdPromise.then(() => _page_proxy__WEBPACK_IMPORTED_MODULE_1__.page.getEditorInfo());
const connectionPromise = browser.runtime.sendMessage({ funcName: ["getNeovimInstance"] });
const isReady = new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
        try {
            const canvas = document.getElementById("canvas");
            const keyHandler = document.getElementById("keyhandler");
            const [[url, selector, cursor, language], connectionData] = await Promise.all([infoPromise, connectionPromise]);
            const nvimPromise = (0,_Neovim__WEBPACK_IMPORTED_MODULE_0__.neovim)(canvas, connectionData);
            const contentPromise = _page_proxy__WEBPACK_IMPORTED_MODULE_1__.page.getElementContent();
            const [cols, rows] = (0,_render_RedrawCanvas__WEBPACK_IMPORTED_MODULE_2__.getLogicalSize)();
            const nvim = await nvimPromise;
            // We need to set client info before running ui_attach because we want this
            // info to be available when UIEnter is triggered
            const extInfo = browser.runtime.getManifest();
            const [major, minor, patch] = extInfo.version.split(".");
            nvim.set_client_info(extInfo.name, { major, minor, patch }, "ui", {}, {});
            await _utils_configuration__WEBPACK_IMPORTED_MODULE_3__.confReady;
            const settings = (0,_utils_configuration__WEBPACK_IMPORTED_MODULE_3__.getGlobalConf)();
            nvim.ui_attach(cols, rows, {
                ext_linegrid: true,
                ext_messages: (0,_utils_configuration__WEBPACK_IMPORTED_MODULE_3__.getConfForUrl)(url).cmdline === "firenvim",
                rgb: true,
            });
            let resizeReqId = 0;
            browser.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
                if (request.funcName[0] === "frame_sendKey") {
                    nvim.input(request.args.join(""));
                }
                else if (request.funcName[0] === "resize" && request.args[0] > resizeReqId) {
                    const [id, width, height] = request.args;
                    resizeReqId = id;
                    // We need to put the keyHandler at the origin in order to avoid
                    // issues when it slips out of the viewport
                    keyHandler.style.left = `0px`;
                    keyHandler.style.top = `0px`;
                    // It's tempting to try to optimize this by only calling
                    // ui_try_resize when nCols is different from cols and nRows is
                    // different from rows but we can't because redraw notifications
                    // might happen without us actually calling ui_try_resize and then
                    // the sizes wouldn't be in sync anymore
                    const [nCols, nRows] = (0,_render_RedrawCanvas__WEBPACK_IMPORTED_MODULE_2__.computeGridDimensionsFor)(width * window.devicePixelRatio, height * window.devicePixelRatio);
                    nvim.ui_try_resize_grid((0,_render_RedrawCanvas__WEBPACK_IMPORTED_MODULE_2__.getGridId)(), nCols, nRows);
                    _page_proxy__WEBPACK_IMPORTED_MODULE_1__.page.resizeEditor(Math.floor(width / nCols) * nCols, Math.floor(height / nRows) * nRows);
                }
            });
            // Create file, set its content to the textarea's, write it
            const filename = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_5__.toFileName)(url, selector, language);
            const content = await contentPromise;
            const [line, col] = cursor;
            const writeFilePromise = nvim.call_function("writefile", [content.split("\n"), filename])
                .then(() => nvim.command(`noswapfile edit ${filename} `
                + `| call nvim_win_set_cursor(0, [${line}, ${col}])`));
            // Can't get coverage for this as browsers don't let us reliably
            // push data to the server on beforeunload.
            /* istanbul ignore next */
            window.addEventListener("beforeunload", () => {
                nvim.ui_detach();
                nvim.command("qall!");
            });
            // Keep track of last active instance (necessary for firenvim#focus_input() & others)
            const chan = nvim.get_current_channel();
            function setCurrentChan() {
                nvim.set_var("last_focused_firenvim_channel", chan);
            }
            setCurrentChan();
            window.addEventListener("focus", setCurrentChan);
            window.addEventListener("click", setCurrentChan);
            const augroupName = `FirenvimAugroupChan${chan}`;
            // Cleanup means:
            // - notify frontend that we're shutting down
            // - delete file
            // - remove own augroup
            const cleanup = `call rpcnotify(${chan}, 'firenvim_vimleave') | `
                + `call delete('${filename}')`;
            // Ask for notifications when user writes/leaves firenvim
            nvim.call_atomic((`augroup ${augroupName}
                            au!
                            autocmd BufWrite ${filename} `
                + `call rpcnotify(${chan}, `
                + `'firenvim_bufwrite', `
                + `{`
                + `'text': nvim_buf_get_lines(0, 0, -1, 0),`
                + `'cursor': nvim_win_get_cursor(0),`
                + `})
                            au VimLeave * ${cleanup}
                        augroup END`).split("\n").map(command => ["nvim_command", [command]]));
            const ignoreKeys = settings.ignoreKeys;
            keyHandler.addEventListener("keydown", (evt) => {
                // This is a workaround for osx where pressing non-alphanumeric
                // characters like "@" requires pressing <A-a>, which results
                // in the browser sending an <A-@> event, which we want to
                // treat as a regular @.
                // So if we're seeing an alt on a non-alphanumeric character,
                // we just ignore it and let the input event handler do its
                // magic. This can only be tested on OSX, as generating an
                // <A-@> keydown event with selenium won't result in an input
                // event.
                // Since coverage reports are only retrieved on linux, we don't
                // instrument this condition.
                /* istanbul ignore next */
                if (evt.altKey && settings.alt === "alphanum" && !/[a-zA-Z0-9]/.test(evt.key)) {
                    return;
                }
                // Note: order of this array is important, we need to check OS before checking meta
                const specialKeys = [["Alt", "A"], ["Control", "C"], ["OS", "D"], ["Meta", "D"]];
                // The event has to be trusted and either have a modifier or a non-literal representation
                if (evt.isTrusted
                    && (_utils_keys__WEBPACK_IMPORTED_MODULE_4__.nonLiteralKeys[evt.key] !== undefined
                        || specialKeys.find(([mod, _]) => evt.key !== mod && evt.getModifierState(mod)))) {
                    const text = specialKeys.concat([["Shift", "S"]])
                        .reduce((key, [attr, mod]) => {
                        if (evt.getModifierState(attr)) {
                            return (0,_utils_keys__WEBPACK_IMPORTED_MODULE_4__.addModifier)(mod, key);
                        }
                        return key;
                    }, (0,_utils_keys__WEBPACK_IMPORTED_MODULE_4__.translateKey)(evt.key));
                    const currentMode = (0,_render_RedrawCanvas__WEBPACK_IMPORTED_MODULE_2__.getCurrentMode)();
                    let keys = [];
                    if (ignoreKeys[currentMode] !== undefined) {
                        keys = ignoreKeys[currentMode].slice();
                    }
                    if (ignoreKeys.all !== undefined) {
                        keys.push.apply(keys, ignoreKeys.all);
                    }
                    if (!keys.includes(text)) {
                        nvim.input(text);
                        evt.preventDefault();
                        evt.stopImmediatePropagation();
                    }
                }
            });
            function acceptInput(evt) {
                nvim.input(evt.target.value);
                evt.preventDefault();
                evt.stopImmediatePropagation();
                evt.target.innerText = "";
                evt.target.value = "";
            }
            keyHandler.addEventListener("input", (evt) => {
                if (evt.isTrusted && !evt.isComposing) {
                    acceptInput(evt);
                }
            });
            // On Firefox, Pinyin input method for a single chinese character will
            // result in the following sequence of events:
            // - compositionstart
            // - input (character)
            // - compositionend
            // - input (result)
            // But on Chrome, we'll get this order:
            // - compositionstart
            // - input (character)
            // - input (result)
            // - compositionend
            // So Chrome's input event will still have its isComposing flag set to
            // true! This means that we need to add a chrome-specific event
            // listener on compositionend to do what happens on input events for
            // Firefox.
            // Don't instrument this branch as coverage is only generated on
            // Firefox.
            /* istanbul ignore next */
            if ((0,_utils_utils__WEBPACK_IMPORTED_MODULE_5__.isChrome)()) {
                keyHandler.addEventListener("compositionend", () => {
                    acceptInput(event);
                });
            }
            window.addEventListener("mousemove", (evt) => {
                keyHandler.style.left = `${evt.clientX}px`;
                keyHandler.style.top = `${evt.clientY}px`;
            });
            function onMouse(evt, action) {
                let button;
                // Selenium can't generate wheel events yet :(
                /* istanbul ignore next */
                if (evt instanceof WheelEvent) {
                    button = "wheel";
                }
                else {
                    // Selenium can't generate mouse events with more buttons :(
                    /* istanbul ignore next */
                    if (evt.button > 2) {
                        // Neovim doesn't handle other mouse buttons for now
                        return;
                    }
                    button = ["left", "middle", "right"][evt.button];
                }
                evt.preventDefault();
                evt.stopImmediatePropagation();
                const modifiers = (evt.altKey ? "A" : "") +
                    (evt.ctrlKey ? "C" : "") +
                    (evt.metaKey ? "D" : "") +
                    (evt.shiftKey ? "S" : "");
                const [x, y] = (0,_render_RedrawCanvas__WEBPACK_IMPORTED_MODULE_2__.getGridCoordinates)(evt.pageX, evt.pageY);
                nvim.input_mouse(button, action, modifiers, (0,_render_RedrawCanvas__WEBPACK_IMPORTED_MODULE_2__.getGridId)(), y, x);
                keyHandler.focus();
            }
            window.addEventListener("mousedown", e => {
                onMouse(e, "press");
            });
            window.addEventListener("mouseup", e => {
                onMouse(e, "release");
            });
            // Selenium doesn't let you simulate mouse wheel events :(
            /* istanbul ignore next */
            window.addEventListener("wheel", evt => {
                if (Math.abs(evt.deltaY) >= Math.abs(evt.deltaX)) {
                    onMouse(evt, evt.deltaY < 0 ? "up" : "down");
                }
                else {
                    onMouse(evt, evt.deltaX < 0 ? "right" : "left");
                }
            });
            // Let users know when they focus/unfocus the frame
            window.addEventListener("focus", () => {
                document.documentElement.style.opacity = "1";
                keyHandler.focus();
                nvim.command("doautocmd FocusGained");
            });
            window.addEventListener("blur", () => {
                document.documentElement.style.opacity = "0.5";
                nvim.command("doautocmd FocusLost");
            });
            keyHandler.focus();
            setTimeout(() => {
                keyHandler.focus();
                writeFilePromise.then(() => resolve());
                // To hard to test (we'd need to find a way to make neovim fail
                // to write the file, which requires too many os-dependent side
                // effects), so don't instrument.
                /* istanbul ignore next */
                writeFilePromise.catch(() => reject());
            }, 10);
        }
        catch (e) {
            console.error(e);
            _page_proxy__WEBPACK_IMPORTED_MODULE_1__.page.killEditor();
            reject();
        }
    });
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9GaXJlbnZpbS8uL25vZGVfbW9kdWxlcy9ldmVudC1saXRlL2V2ZW50LWxpdGUuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qcyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL25vZGVfbW9kdWxlcy93ZWJleHRlbnNpb24tcG9seWZpbGwvZGlzdC9icm93c2VyLXBvbHlmaWxsLmpzIiwid2VicGFjazovL0ZpcmVudmltLy4vbm9kZV9tb2R1bGVzL2ludDY0LWJ1ZmZlci9pbnQ2NC1idWZmZXIuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvaXNhcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9idWZmZXItZ2xvYmFsLmpzIiwid2VicGFjazovL0ZpcmVudmltLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvYnVmZmVyLWxpdGUuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9idWZmZXJpc2gtYXJyYXkuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9idWZmZXJpc2gtYnVmZmVyLmpzIiwid2VicGFjazovL0ZpcmVudmltLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvYnVmZmVyaXNoLXByb3RvLmpzIiwid2VicGFjazovL0ZpcmVudmltLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvYnVmZmVyaXNoLXVpbnQ4YXJyYXkuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9idWZmZXJpc2guanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9jb2RlYy1iYXNlLmpzIiwid2VicGFjazovL0ZpcmVudmltLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvY29kZWMuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9kZWNvZGUtYnVmZmVyLmpzIiwid2VicGFjazovL0ZpcmVudmltLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvZGVjb2RlLmpzIiwid2VicGFjazovL0ZpcmVudmltLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvZGVjb2Rlci5qcyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2VuY29kZS1idWZmZXIuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9lbmNvZGUuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9lbmNvZGVyLmpzIiwid2VicGFjazovL0ZpcmVudmltLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvZXh0LWJ1ZmZlci5qcyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2V4dC1wYWNrZXIuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9leHQtdW5wYWNrZXIuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9leHQuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9mbGV4LWJ1ZmZlci5qcyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL3JlYWQtY29yZS5qcyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL3JlYWQtZm9ybWF0LmpzIiwid2VicGFjazovL0ZpcmVudmltLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvcmVhZC10b2tlbi5qcyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL3dyaXRlLWNvcmUuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi93cml0ZS10b2tlbi5qcyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL3dyaXRlLXR5cGUuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi93cml0ZS11aW50OC5qcyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL3NyYy9OZW92aW0udHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvU3RkaW4udHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvU3Rkb3V0LnRzIiwid2VicGFjazovL0ZpcmVudmltLy4vc3JjL3BhZ2UvZnVuY3Rpb25zLnRzIiwid2VicGFjazovL0ZpcmVudmltLy4vc3JjL3BhZ2UvcHJveHkudHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvcmVuZGVyL1JlZHJhd0NhbnZhcy50cyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL3NyYy91dGlscy9jb25maWd1cmF0aW9uLnRzIiwid2VicGFjazovL0ZpcmVudmltLy4vc3JjL3V0aWxzL2tleXMudHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvdXRpbHMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0ZpcmVudmltL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL3NyYy9mcmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLElBQUk7QUFDM0I7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBLDZCQUE2QixJQUFJLEVBQUU7QUFDbkMsK0JBQStCLElBQUksRUFBRTtBQUNyQyxtQkFBbUI7QUFDbkIsbUJBQW1CO0FBQ25CLGtCQUFrQjtBQUNsQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU0sSUFBNkI7O0FBRW5DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQixrQkFBa0I7QUFDbEIsZUFBZSxVQUFVO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLGtCQUFrQjtBQUNsQixlQUFlLFVBQVU7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCLG9CQUFvQjtBQUNwQixlQUFlLFVBQVU7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEIscUJBQXFCO0FBQ3JCLGVBQWUsUUFBUTtBQUN2Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNERBQTREO0FBQzVEO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7QUNuTEQsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSxXQUFXOztBQUVuQjtBQUNBO0FBQ0E7QUFDQSxRQUFRLFdBQVc7O0FBRW5CO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsV0FBVzs7QUFFbkI7QUFDQTtBQUNBLFFBQVEsVUFBVTs7QUFFbEI7QUFDQTs7Ozs7Ozs7Ozs7O0FDbkZBOztBQUVBLE9BQU87O0FBRVA7QUFDQSxNQUFNLElBQTBDO0FBQ2hELElBQUksaUNBQWdDLENBQUMsTUFBUSxDQUFDLG9DQUFFLE9BQU87QUFBQTtBQUFBO0FBQUEsa0dBQUM7QUFDeEQsR0FBRyxNQUFNLFlBUU47QUFDSCxDQUFDO0FBQ0Q7O0FBRUEscUNBQXFDOztBQUVyQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhLE9BQU8sMENBQTBDLE9BQU87QUFDckU7QUFDQSx1U0FBdVM7QUFDdlM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixFQUFFO0FBQ25CLG1CQUFtQixRQUFRO0FBQzNCOzs7QUFHQTtB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QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBO0FBQ0EsR0FBRztBQUNILHFCQUFxQixPQUFPO0FBQzVCO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7Ozs7OztBQ3p0Q0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxjQUFjOztBQUVkOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUCxp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QWE7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDak1BOztBQUVBLGdCQUFnQixrR0FBaUM7QUFDakQsa0JBQWtCLG1CQUFPLENBQUMsdUVBQWdC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Q0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNB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M0MsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ1Y7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsd0RBQWUsRUFBRSxDQUFDO1lBQ2xCLE1BQU0sRUFBRSxDQUFDO1NBQ1o7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBldmVudC1saXRlLmpzIC0gTGlnaHQtd2VpZ2h0IEV2ZW50RW1pdHRlciAobGVzcyB0aGFuIDFLQiB3aGVuIGd6aXBwZWQpXG4gKlxuICogQGNvcHlyaWdodCBZdXN1a2UgS2F3YXNha2lcbiAqIEBsaWNlbnNlIE1JVFxuICogQGNvbnN0cnVjdG9yXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9rYXdhbmV0L2V2ZW50LWxpdGVcbiAqIEBzZWUgaHR0cDovL2thd2FuZXQuZ2l0aHViLmlvL2V2ZW50LWxpdGUvRXZlbnRMaXRlLmh0bWxcbiAqIEBleGFtcGxlXG4gKiB2YXIgRXZlbnRMaXRlID0gcmVxdWlyZShcImV2ZW50LWxpdGVcIik7XG4gKlxuICogZnVuY3Rpb24gTXlDbGFzcygpIHsuLi59ICAgICAgICAgICAgIC8vIHlvdXIgY2xhc3NcbiAqXG4gKiBFdmVudExpdGUubWl4aW4oTXlDbGFzcy5wcm90b3R5cGUpOyAgLy8gaW1wb3J0IGV2ZW50IG1ldGhvZHNcbiAqXG4gKiB2YXIgb2JqID0gbmV3IE15Q2xhc3MoKTtcbiAqIG9iai5vbihcImZvb1wiLCBmdW5jdGlvbigpIHsuLi59KTsgICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lclxuICogb2JqLm9uY2UoXCJiYXJcIiwgZnVuY3Rpb24oKSB7Li4ufSk7ICAgLy8gYWRkIG9uZS10aW1lIGV2ZW50IGxpc3RlbmVyXG4gKiBvYmouZW1pdChcImZvb1wiKTsgICAgICAgICAgICAgICAgICAgICAvLyBkaXNwYXRjaCBldmVudFxuICogb2JqLmVtaXQoXCJiYXJcIik7ICAgICAgICAgICAgICAgICAgICAgLy8gZGlzcGF0Y2ggYW5vdGhlciBldmVudFxuICogb2JqLm9mZihcImZvb1wiKTsgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGV2ZW50IGxpc3RlbmVyXG4gKi9cblxuZnVuY3Rpb24gRXZlbnRMaXRlKCkge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRXZlbnRMaXRlKSkgcmV0dXJuIG5ldyBFdmVudExpdGUoKTtcbn1cblxuKGZ1bmN0aW9uKEV2ZW50TGl0ZSkge1xuICAvLyBleHBvcnQgdGhlIGNsYXNzIGZvciBub2RlLmpzXG4gIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgbW9kdWxlKSBtb2R1bGUuZXhwb3J0cyA9IEV2ZW50TGl0ZTtcblxuICAvLyBwcm9wZXJ0eSBuYW1lIHRvIGhvbGQgbGlzdGVuZXJzXG4gIHZhciBMSVNURU5FUlMgPSBcImxpc3RlbmVyc1wiO1xuXG4gIC8vIG1ldGhvZHMgdG8gZXhwb3J0XG4gIHZhciBtZXRob2RzID0ge1xuICAgIG9uOiBvbixcbiAgICBvbmNlOiBvbmNlLFxuICAgIG9mZjogb2ZmLFxuICAgIGVtaXQ6IGVtaXRcbiAgfTtcblxuICAvLyBtaXhpbiB0byBzZWxmXG4gIG1peGluKEV2ZW50TGl0ZS5wcm90b3R5cGUpO1xuXG4gIC8vIGV4cG9ydCBtaXhpbiBmdW5jdGlvblxuICBFdmVudExpdGUubWl4aW4gPSBtaXhpbjtcblxuICAvKipcbiAgICogSW1wb3J0IG9uKCksIG9uY2UoKSwgb2ZmKCkgYW5kIGVtaXQoKSBtZXRob2RzIGludG8gdGFyZ2V0IG9iamVjdC5cbiAgICpcbiAgICogQGZ1bmN0aW9uIEV2ZW50TGl0ZS5taXhpblxuICAgKiBAcGFyYW0gdGFyZ2V0IHtQcm90b3R5cGV9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG1peGluKHRhcmdldCkge1xuICAgIGZvciAodmFyIGtleSBpbiBtZXRob2RzKSB7XG4gICAgICB0YXJnZXRba2V5XSA9IG1ldGhvZHNba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW4gZXZlbnQgbGlzdGVuZXIuXG4gICAqXG4gICAqIEBmdW5jdGlvbiBFdmVudExpdGUucHJvdG90eXBlLm9uXG4gICAqIEBwYXJhbSB0eXBlIHtzdHJpbmd9XG4gICAqIEBwYXJhbSBmdW5jIHtGdW5jdGlvbn1cbiAgICogQHJldHVybnMge0V2ZW50TGl0ZX0gU2VsZiBmb3IgbWV0aG9kIGNoYWluaW5nXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG9uKHR5cGUsIGZ1bmMpIHtcbiAgICBnZXRMaXN0ZW5lcnModGhpcywgdHlwZSkucHVzaChmdW5jKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgb25lLXRpbWUgZXZlbnQgbGlzdGVuZXIuXG4gICAqXG4gICAqIEBmdW5jdGlvbiBFdmVudExpdGUucHJvdG90eXBlLm9uY2VcbiAgICogQHBhcmFtIHR5cGUge3N0cmluZ31cbiAgICogQHBhcmFtIGZ1bmMge0Z1bmN0aW9ufVxuICAgKiBAcmV0dXJucyB7RXZlbnRMaXRlfSBTZWxmIGZvciBtZXRob2QgY2hhaW5pbmdcbiAgICovXG5cbiAgZnVuY3Rpb24gb25jZSh0eXBlLCBmdW5jKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHdyYXAub3JpZ2luYWxMaXN0ZW5lciA9IGZ1bmM7XG4gICAgZ2V0TGlzdGVuZXJzKHRoYXQsIHR5cGUpLnB1c2god3JhcCk7XG4gICAgcmV0dXJuIHRoYXQ7XG5cbiAgICBmdW5jdGlvbiB3cmFwKCkge1xuICAgICAgb2ZmLmNhbGwodGhhdCwgdHlwZSwgd3JhcCk7XG4gICAgICBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci5cbiAgICpcbiAgICogQGZ1bmN0aW9uIEV2ZW50TGl0ZS5wcm90b3R5cGUub2ZmXG4gICAqIEBwYXJhbSBbdHlwZV0ge3N0cmluZ31cbiAgICogQHBhcmFtIFtmdW5jXSB7RnVuY3Rpb259XG4gICAqIEByZXR1cm5zIHtFdmVudExpdGV9IFNlbGYgZm9yIG1ldGhvZCBjaGFpbmluZ1xuICAgKi9cblxuICBmdW5jdGlvbiBvZmYodHlwZSwgZnVuYykge1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB2YXIgbGlzdG5lcnM7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBkZWxldGUgdGhhdFtMSVNURU5FUlNdO1xuICAgIH0gZWxzZSBpZiAoIWZ1bmMpIHtcbiAgICAgIGxpc3RuZXJzID0gdGhhdFtMSVNURU5FUlNdO1xuICAgICAgaWYgKGxpc3RuZXJzKSB7XG4gICAgICAgIGRlbGV0ZSBsaXN0bmVyc1t0eXBlXTtcbiAgICAgICAgaWYgKCFPYmplY3Qua2V5cyhsaXN0bmVycykubGVuZ3RoKSByZXR1cm4gb2ZmLmNhbGwodGhhdCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3RuZXJzID0gZ2V0TGlzdGVuZXJzKHRoYXQsIHR5cGUsIHRydWUpO1xuICAgICAgaWYgKGxpc3RuZXJzKSB7XG4gICAgICAgIGxpc3RuZXJzID0gbGlzdG5lcnMuZmlsdGVyKG5lKTtcbiAgICAgICAgaWYgKCFsaXN0bmVycy5sZW5ndGgpIHJldHVybiBvZmYuY2FsbCh0aGF0LCB0eXBlKTtcbiAgICAgICAgdGhhdFtMSVNURU5FUlNdW3R5cGVdID0gbGlzdG5lcnM7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGF0O1xuXG4gICAgZnVuY3Rpb24gbmUodGVzdCkge1xuICAgICAgcmV0dXJuIHRlc3QgIT09IGZ1bmMgJiYgdGVzdC5vcmlnaW5hbExpc3RlbmVyICE9PSBmdW5jO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwYXRjaCAodHJpZ2dlcikgYW4gZXZlbnQuXG4gICAqXG4gICAqIEBmdW5jdGlvbiBFdmVudExpdGUucHJvdG90eXBlLmVtaXRcbiAgICogQHBhcmFtIHR5cGUge3N0cmluZ31cbiAgICogQHBhcmFtIFt2YWx1ZV0geyp9XG4gICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIHdoZW4gYSBsaXN0ZW5lciByZWNlaXZlZCB0aGUgZXZlbnRcbiAgICovXG5cbiAgZnVuY3Rpb24gZW1pdCh0eXBlLCB2YWx1ZSkge1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB2YXIgbGlzdGVuZXJzID0gZ2V0TGlzdGVuZXJzKHRoYXQsIHR5cGUsIHRydWUpO1xuICAgIGlmICghbGlzdGVuZXJzKSByZXR1cm4gZmFsc2U7XG4gICAgdmFyIGFyZ2xlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgaWYgKGFyZ2xlbiA9PT0gMSkge1xuICAgICAgbGlzdGVuZXJzLmZvckVhY2goemVyb2FyZyk7XG4gICAgfSBlbHNlIGlmIChhcmdsZW4gPT09IDIpIHtcbiAgICAgIGxpc3RlbmVycy5mb3JFYWNoKG9uZWFyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgIGxpc3RlbmVycy5mb3JFYWNoKG1vcmVhcmdzKTtcbiAgICB9XG4gICAgcmV0dXJuICEhbGlzdGVuZXJzLmxlbmd0aDtcblxuICAgIGZ1bmN0aW9uIHplcm9hcmcoZnVuYykge1xuICAgICAgZnVuYy5jYWxsKHRoYXQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uZWFyZyhmdW5jKSB7XG4gICAgICBmdW5jLmNhbGwodGhhdCwgdmFsdWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vcmVhcmdzKGZ1bmMpIHtcbiAgICAgIGZ1bmMuYXBwbHkodGhhdCwgYXJncyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBpZ25vcmVcbiAgICovXG5cbiAgZnVuY3Rpb24gZ2V0TGlzdGVuZXJzKHRoYXQsIHR5cGUsIHJlYWRvbmx5KSB7XG4gICAgaWYgKHJlYWRvbmx5ICYmICF0aGF0W0xJU1RFTkVSU10pIHJldHVybjtcbiAgICB2YXIgbGlzdGVuZXJzID0gdGhhdFtMSVNURU5FUlNdIHx8ICh0aGF0W0xJU1RFTkVSU10gPSB7fSk7XG4gICAgcmV0dXJuIGxpc3RlbmVyc1t0eXBlXSB8fCAobGlzdGVuZXJzW3R5cGVdID0gW10pO1xuICB9XG5cbn0pKEV2ZW50TGl0ZSk7XG4iLCJleHBvcnRzLnJlYWQgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbVxuICB2YXIgZUxlbiA9IChuQnl0ZXMgKiA4KSAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgbkJpdHMgPSAtN1xuICB2YXIgaSA9IGlzTEUgPyAobkJ5dGVzIC0gMSkgOiAwXG4gIHZhciBkID0gaXNMRSA/IC0xIDogMVxuICB2YXIgcyA9IGJ1ZmZlcltvZmZzZXQgKyBpXVxuXG4gIGkgKz0gZFxuXG4gIGUgPSBzICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIHMgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IGVMZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgZSA9IChlICogMjU2KSArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIG0gPSBlICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIGUgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IG1MZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IChtICogMjU2KSArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIGlmIChlID09PSAwKSB7XG4gICAgZSA9IDEgLSBlQmlhc1xuICB9IGVsc2UgaWYgKGUgPT09IGVNYXgpIHtcbiAgICByZXR1cm4gbSA/IE5hTiA6ICgocyA/IC0xIDogMSkgKiBJbmZpbml0eSlcbiAgfSBlbHNlIHtcbiAgICBtID0gbSArIE1hdGgucG93KDIsIG1MZW4pXG4gICAgZSA9IGUgLSBlQmlhc1xuICB9XG4gIHJldHVybiAocyA/IC0xIDogMSkgKiBtICogTWF0aC5wb3coMiwgZSAtIG1MZW4pXG59XG5cbmV4cG9ydHMud3JpdGUgPSBmdW5jdGlvbiAoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sIGNcbiAgdmFyIGVMZW4gPSAobkJ5dGVzICogOCkgLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIHJ0ID0gKG1MZW4gPT09IDIzID8gTWF0aC5wb3coMiwgLTI0KSAtIE1hdGgucG93KDIsIC03NykgOiAwKVxuICB2YXIgaSA9IGlzTEUgPyAwIDogKG5CeXRlcyAtIDEpXG4gIHZhciBkID0gaXNMRSA/IDEgOiAtMVxuICB2YXIgcyA9IHZhbHVlIDwgMCB8fCAodmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCkgPyAxIDogMFxuXG4gIHZhbHVlID0gTWF0aC5hYnModmFsdWUpXG5cbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpIHtcbiAgICBtID0gaXNOYU4odmFsdWUpID8gMSA6IDBcbiAgICBlID0gZU1heFxuICB9IGVsc2Uge1xuICAgIGUgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbHVlKSAvIE1hdGguTE4yKVxuICAgIGlmICh2YWx1ZSAqIChjID0gTWF0aC5wb3coMiwgLWUpKSA8IDEpIHtcbiAgICAgIGUtLVxuICAgICAgYyAqPSAyXG4gICAgfVxuICAgIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgdmFsdWUgKz0gcnQgLyBjXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogTWF0aC5wb3coMiwgMSAtIGVCaWFzKVxuICAgIH1cbiAgICBpZiAodmFsdWUgKiBjID49IDIpIHtcbiAgICAgIGUrK1xuICAgICAgYyAvPSAyXG4gICAgfVxuXG4gICAgaWYgKGUgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtID0gMFxuICAgICAgZSA9IGVNYXhcbiAgICB9IGVsc2UgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICBtID0gKCh2YWx1ZSAqIGMpIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IGUgKyBlQmlhc1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBNYXRoLnBvdygyLCBlQmlhcyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSAwXG4gICAgfVxuICB9XG5cbiAgZm9yICg7IG1MZW4gPj0gODsgYnVmZmVyW29mZnNldCArIGldID0gbSAmIDB4ZmYsIGkgKz0gZCwgbSAvPSAyNTYsIG1MZW4gLT0gOCkge31cblxuICBlID0gKGUgPDwgbUxlbikgfCBtXG4gIGVMZW4gKz0gbUxlblxuICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpIHt9XG5cbiAgYnVmZmVyW29mZnNldCArIGkgLSBkXSB8PSBzICogMTI4XG59XG4iLCIvKioqIElNUE9SVFMgRlJPTSBpbXBvcnRzLWxvYWRlciAqKiovXG5cbmJyb3dzZXIgPSB1bmRlZmluZWQ7XG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiLCBbXCJtb2R1bGVcIl0sIGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgZmFjdG9yeShtb2R1bGUpO1xuICB9IGVsc2Uge1xuICAgIHZhciBtb2QgPSB7XG4gICAgICBleHBvcnRzOiB7fVxuICAgIH07XG4gICAgZmFjdG9yeShtb2QpO1xuICAgIGdsb2JhbC5icm93c2VyID0gbW9kLmV4cG9ydHM7XG4gIH1cbn0pKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsVGhpcyA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgLyogd2ViZXh0ZW5zaW9uLXBvbHlmaWxsIC0gdjAuNy4wIC0gVHVlIE5vdiAxMCAyMDIwIDIwOjI0OjA0ICovXG5cbiAgLyogLSotIE1vZGU6IGluZGVudC10YWJzLW1vZGU6IG5pbDsganMtaW5kZW50LWxldmVsOiAyIC0qLSAqL1xuXG4gIC8qIHZpbTogc2V0IHN0cz0yIHN3PTIgZXQgdHc9ODA6ICovXG5cbiAgLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICAgKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gICAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGlmICh0eXBlb2YgYnJvd3NlciA9PT0gXCJ1bmRlZmluZWRcIiB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoYnJvd3NlcikgIT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgICBjb25zdCBDSFJPTUVfU0VORF9NRVNTQUdFX0NBTExCQUNLX05PX1JFU1BPTlNFX01FU1NBR0UgPSBcIlRoZSBtZXNzYWdlIHBvcnQgY2xvc2VkIGJlZm9yZSBhIHJlc3BvbnNlIHdhcyByZWNlaXZlZC5cIjtcbiAgICBjb25zdCBTRU5EX1JFU1BPTlNFX0RFUFJFQ0FUSU9OX1dBUk5JTkcgPSBcIlJldHVybmluZyBhIFByb21pc2UgaXMgdGhlIHByZWZlcnJlZCB3YXkgdG8gc2VuZCBhIHJlcGx5IGZyb20gYW4gb25NZXNzYWdlL29uTWVzc2FnZUV4dGVybmFsIGxpc3RlbmVyLCBhcyB0aGUgc2VuZFJlc3BvbnNlIHdpbGwgYmUgcmVtb3ZlZCBmcm9tIHRoZSBzcGVjcyAoU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RvY3MvTW96aWxsYS9BZGQtb25zL1dlYkV4dGVuc2lvbnMvQVBJL3J1bnRpbWUvb25NZXNzYWdlKVwiOyAvLyBXcmFwcGluZyB0aGUgYnVsayBvZiB0aGlzIHBvbHlmaWxsIGluIGEgb25lLXRpbWUtdXNlIGZ1bmN0aW9uIGlzIGEgbWlub3JcbiAgICAvLyBvcHRpbWl6YXRpb24gZm9yIEZpcmVmb3guIFNpbmNlIFNwaWRlcm1vbmtleSBkb2VzIG5vdCBmdWxseSBwYXJzZSB0aGVcbiAgICAvLyBjb250ZW50cyBvZiBhIGZ1bmN0aW9uIHVudGlsIHRoZSBmaXJzdCB0aW1lIGl0J3MgY2FsbGVkLCBhbmQgc2luY2UgaXQgd2lsbFxuICAgIC8vIG5ldmVyIGFjdHVhbGx5IG5lZWQgdG8gYmUgY2FsbGVkLCB0aGlzIGFsbG93cyB0aGUgcG9seWZpbGwgdG8gYmUgaW5jbHVkZWRcbiAgICAvLyBpbiBGaXJlZm94IG5lYXJseSBmb3IgZnJlZS5cblxuICAgIGNvbnN0IHdyYXBBUElzID0gZXh0ZW5zaW9uQVBJcyA9PiB7XG4gICAgICAvLyBOT1RFOiBhcGlNZXRhZGF0YSBpcyBhc3NvY2lhdGVkIHRvIHRoZSBjb250ZW50IG9mIHRoZSBhcGktbWV0YWRhdGEuanNvbiBmaWxlXG4gICAgICAvLyBhdCBidWlsZCB0aW1lIGJ5IHJlcGxhY2luZyB0aGUgZm9sbG93aW5nIFwiaW5jbHVkZVwiIHdpdGggdGhlIGNvbnRlbnQgb2YgdGhlXG4gICAgICAvLyBKU09OIGZpbGUuXG4gICAgICBjb25zdCBhcGlNZXRhZGF0YSA9IHtcbiAgICAgICAgXCJhbGFybXNcIjoge1xuICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGVhckFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImJvb2ttYXJrc1wiOiB7XG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDaGlsZHJlblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFJlY2VudFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFN1YlRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRUcmVlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwibW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJicm93c2VyQWN0aW9uXCI6IHtcbiAgICAgICAgICBcImRpc2FibGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJlbmFibGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRCYWRnZUJhY2tncm91bmRDb2xvclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEJhZGdlVGV4dFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJvcGVuUG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRCYWRnZUJhY2tncm91bmRDb2xvclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEJhZGdlVGV4dFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEljb25cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRQb3B1cFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFRpdGxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYnJvd3NpbmdEYXRhXCI6IHtcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUNhY2hlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlQ29va2llc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZURvd25sb2Fkc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUZvcm1EYXRhXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlSGlzdG9yeVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUxvY2FsU3RvcmFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVBhc3N3b3Jkc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVBsdWdpbkRhdGFcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXR0aW5nc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvbW1hbmRzXCI6IHtcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvbnRleHRNZW51c1wiOiB7XG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJjb29raWVzXCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbENvb2tpZVN0b3Jlc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImRldnRvb2xzXCI6IHtcbiAgICAgICAgICBcImluc3BlY3RlZFdpbmRvd1wiOiB7XG4gICAgICAgICAgICBcImV2YWxcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDIsXG4gICAgICAgICAgICAgIFwic2luZ2xlQ2FsbGJhY2tBcmdcIjogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicGFuZWxzXCI6IHtcbiAgICAgICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDMsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAzLFxuICAgICAgICAgICAgICBcInNpbmdsZUNhbGxiYWNrQXJnXCI6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImVsZW1lbnRzXCI6IHtcbiAgICAgICAgICAgICAgXCJjcmVhdGVTaWRlYmFyUGFuZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJkb3dubG9hZHNcIjoge1xuICAgICAgICAgIFwiY2FuY2VsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZG93bmxvYWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJlcmFzZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEZpbGVJY29uXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwib3BlblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInBhdXNlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlRmlsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlc3VtZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNob3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJleHRlbnNpb25cIjoge1xuICAgICAgICAgIFwiaXNBbGxvd2VkRmlsZVNjaGVtZUFjY2Vzc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImlzQWxsb3dlZEluY29nbml0b0FjY2Vzc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImhpc3RvcnlcIjoge1xuICAgICAgICAgIFwiYWRkVXJsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGVsZXRlQWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGVsZXRlUmFuZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZWxldGVVcmxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRWaXNpdHNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpMThuXCI6IHtcbiAgICAgICAgICBcImRldGVjdExhbmd1YWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWNjZXB0TGFuZ3VhZ2VzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiaWRlbnRpdHlcIjoge1xuICAgICAgICAgIFwibGF1bmNoV2ViQXV0aEZsb3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpZGxlXCI6IHtcbiAgICAgICAgICBcInF1ZXJ5U3RhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJtYW5hZ2VtZW50XCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFNlbGZcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRFbmFibGVkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidW5pbnN0YWxsU2VsZlwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm5vdGlmaWNhdGlvbnNcIjoge1xuICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRQZXJtaXNzaW9uTGV2ZWxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJwYWdlQWN0aW9uXCI6IHtcbiAgICAgICAgICBcImdldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJoaWRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0SWNvblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzaG93XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicGVybWlzc2lvbnNcIjoge1xuICAgICAgICAgIFwiY29udGFpbnNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXF1ZXN0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicnVudGltZVwiOiB7XG4gICAgICAgICAgXCJnZXRCYWNrZ3JvdW5kUGFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBsYXRmb3JtSW5mb1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm9wZW5PcHRpb25zUGFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlcXVlc3RVcGRhdGVDaGVja1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlbmRNZXNzYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDNcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VuZE5hdGl2ZU1lc3NhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRVbmluc3RhbGxVUkxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXNzaW9uc1wiOiB7XG4gICAgICAgICAgXCJnZXREZXZpY2VzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UmVjZW50bHlDbG9zZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXN0b3JlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwic3RvcmFnZVwiOiB7XG4gICAgICAgICAgXCJsb2NhbFwiOiB7XG4gICAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm1hbmFnZWRcIjoge1xuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3luY1wiOiB7XG4gICAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInRhYnNcIjoge1xuICAgICAgICAgIFwiY2FwdHVyZVZpc2libGVUYWJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZXRlY3RMYW5ndWFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRpc2NhcmRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkdXBsaWNhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJleGVjdXRlU2NyaXB0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Q3VycmVudFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFpvb21cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRab29tU2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnb0JhY2tcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnb0ZvcndhcmRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJoaWdobGlnaHRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJpbnNlcnRDU1NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicXVlcnlcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZWxvYWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVDU1NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZW5kTWVzc2FnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFpvb21cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRab29tU2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ0b3BTaXRlc1wiOiB7XG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ3ZWJOYXZpZ2F0aW9uXCI6IHtcbiAgICAgICAgICBcImdldEFsbEZyYW1lc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEZyYW1lXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwid2ViUmVxdWVzdFwiOiB7XG4gICAgICAgICAgXCJoYW5kbGVyQmVoYXZpb3JDaGFuZ2VkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwid2luZG93c1wiOiB7XG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDdXJyZW50XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0TGFzdEZvY3VzZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaWYgKE9iamVjdC5rZXlzKGFwaU1ldGFkYXRhKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXBpLW1ldGFkYXRhLmpzb24gaGFzIG5vdCBiZWVuIGluY2x1ZGVkIGluIGJyb3dzZXItcG9seWZpbGxcIik7XG4gICAgICB9XG4gICAgICAvKipcbiAgICAgICAqIEEgV2Vha01hcCBzdWJjbGFzcyB3aGljaCBjcmVhdGVzIGFuZCBzdG9yZXMgYSB2YWx1ZSBmb3IgYW55IGtleSB3aGljaCBkb2VzXG4gICAgICAgKiBub3QgZXhpc3Qgd2hlbiBhY2Nlc3NlZCwgYnV0IGJlaGF2ZXMgZXhhY3RseSBhcyBhbiBvcmRpbmFyeSBXZWFrTWFwXG4gICAgICAgKiBvdGhlcndpc2UuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY3JlYXRlSXRlbVxuICAgICAgICogICAgICAgIEEgZnVuY3Rpb24gd2hpY2ggd2lsbCBiZSBjYWxsZWQgaW4gb3JkZXIgdG8gY3JlYXRlIHRoZSB2YWx1ZSBmb3IgYW55XG4gICAgICAgKiAgICAgICAga2V5IHdoaWNoIGRvZXMgbm90IGV4aXN0LCB0aGUgZmlyc3QgdGltZSBpdCBpcyBhY2Nlc3NlZC4gVGhlXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gcmVjZWl2ZXMsIGFzIGl0cyBvbmx5IGFyZ3VtZW50LCB0aGUga2V5IGJlaW5nIGNyZWF0ZWQuXG4gICAgICAgKi9cblxuXG4gICAgICBjbGFzcyBEZWZhdWx0V2Vha01hcCBleHRlbmRzIFdlYWtNYXAge1xuICAgICAgICBjb25zdHJ1Y3RvcihjcmVhdGVJdGVtLCBpdGVtcyA9IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHN1cGVyKGl0ZW1zKTtcbiAgICAgICAgICB0aGlzLmNyZWF0ZUl0ZW0gPSBjcmVhdGVJdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0KGtleSkge1xuICAgICAgICAgIGlmICghdGhpcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoa2V5LCB0aGlzLmNyZWF0ZUl0ZW0oa2V5KSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHN1cGVyLmdldChrZXkpO1xuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBvYmplY3QgaXMgYW4gb2JqZWN0IHdpdGggYSBgdGhlbmAgbWV0aG9kLCBhbmQgY2FuXG4gICAgICAgKiB0aGVyZWZvcmUgYmUgYXNzdW1lZCB0byBiZWhhdmUgYXMgYSBQcm9taXNlLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdGhlbmFibGUuXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCBpc1RoZW5hYmxlID0gdmFsdWUgPT4ge1xuICAgICAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSBcImZ1bmN0aW9uXCI7XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgZnVuY3Rpb24gd2hpY2gsIHdoZW4gY2FsbGVkLCB3aWxsIHJlc29sdmUgb3IgcmVqZWN0XG4gICAgICAgKiB0aGUgZ2l2ZW4gcHJvbWlzZSBiYXNlZCBvbiBob3cgaXQgaXMgY2FsbGVkOlxuICAgICAgICpcbiAgICAgICAqIC0gSWYsIHdoZW4gY2FsbGVkLCBgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yYCBjb250YWlucyBhIG5vbi1udWxsIG9iamVjdCxcbiAgICAgICAqICAgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQgd2l0aCB0aGF0IHZhbHVlLlxuICAgICAgICogLSBJZiB0aGUgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGggZXhhY3RseSBvbmUgYXJndW1lbnQsIHRoZSBwcm9taXNlIGlzXG4gICAgICAgKiAgIHJlc29sdmVkIHRvIHRoYXQgdmFsdWUuXG4gICAgICAgKiAtIE90aGVyd2lzZSwgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgdG8gYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlXG4gICAgICAgKiAgIGZ1bmN0aW9uJ3MgYXJndW1lbnRzLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9taXNlXG4gICAgICAgKiAgICAgICAgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHJlc29sdXRpb24gYW5kIHJlamVjdGlvbiBmdW5jdGlvbnMgb2YgYVxuICAgICAgICogICAgICAgIHByb21pc2UuXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9taXNlLnJlc29sdmVcbiAgICAgICAqICAgICAgICBUaGUgcHJvbWlzZSdzIHJlc29sdXRpb24gZnVuY3Rpb24uXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9taXNlLnJlamVjdGlvblxuICAgICAgICogICAgICAgIFRoZSBwcm9taXNlJ3MgcmVqZWN0aW9uIGZ1bmN0aW9uLlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IG1ldGFkYXRhXG4gICAgICAgKiAgICAgICAgTWV0YWRhdGEgYWJvdXQgdGhlIHdyYXBwZWQgbWV0aG9kIHdoaWNoIGhhcyBjcmVhdGVkIHRoZSBjYWxsYmFjay5cbiAgICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gbWV0YWRhdGEubWF4UmVzb2x2ZWRBcmdzXG4gICAgICAgKiAgICAgICAgVGhlIG1heGltdW0gbnVtYmVyIG9mIGFyZ3VtZW50cyB3aGljaCBtYXkgYmUgcGFzc2VkIHRvIHRoZVxuICAgICAgICogICAgICAgIGNhbGxiYWNrIGNyZWF0ZWQgYnkgdGhlIHdyYXBwZWQgYXN5bmMgZnVuY3Rpb24uXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge2Z1bmN0aW9ufVxuICAgICAgICogICAgICAgIFRoZSBnZW5lcmF0ZWQgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCBtYWtlQ2FsbGJhY2sgPSAocHJvbWlzZSwgbWV0YWRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuICguLi5jYWxsYmFja0FyZ3MpID0+IHtcbiAgICAgICAgICBpZiAoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgICAgcHJvbWlzZS5yZWplY3QoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvcik7XG4gICAgICAgICAgfSBlbHNlIGlmIChtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZyB8fCBjYWxsYmFja0FyZ3MubGVuZ3RoIDw9IDEgJiYgbWV0YWRhdGEuc2luZ2xlQ2FsbGJhY2tBcmcgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBwcm9taXNlLnJlc29sdmUoY2FsbGJhY2tBcmdzWzBdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvbWlzZS5yZXNvbHZlKGNhbGxiYWNrQXJncyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfTtcblxuICAgICAgY29uc3QgcGx1cmFsaXplQXJndW1lbnRzID0gbnVtQXJncyA9PiBudW1BcmdzID09IDEgPyBcImFyZ3VtZW50XCIgOiBcImFyZ3VtZW50c1wiO1xuICAgICAgLyoqXG4gICAgICAgKiBDcmVhdGVzIGEgd3JhcHBlciBmdW5jdGlvbiBmb3IgYSBtZXRob2Qgd2l0aCB0aGUgZ2l2ZW4gbmFtZSBhbmQgbWV0YWRhdGEuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgICAqICAgICAgICBUaGUgbmFtZSBvZiB0aGUgbWV0aG9kIHdoaWNoIGlzIGJlaW5nIHdyYXBwZWQuXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gbWV0YWRhdGFcbiAgICAgICAqICAgICAgICBNZXRhZGF0YSBhYm91dCB0aGUgbWV0aG9kIGJlaW5nIHdyYXBwZWQuXG4gICAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IG1ldGFkYXRhLm1pbkFyZ3NcbiAgICAgICAqICAgICAgICBUaGUgbWluaW11bSBudW1iZXIgb2YgYXJndW1lbnRzIHdoaWNoIG11c3QgYmUgcGFzc2VkIHRvIHRoZVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uLiBJZiBjYWxsZWQgd2l0aCBmZXdlciB0aGFuIHRoaXMgbnVtYmVyIG9mIGFyZ3VtZW50cywgdGhlXG4gICAgICAgKiAgICAgICAgd3JhcHBlciB3aWxsIHJhaXNlIGFuIGV4Y2VwdGlvbi5cbiAgICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gbWV0YWRhdGEubWF4QXJnc1xuICAgICAgICogICAgICAgIFRoZSBtYXhpbXVtIG51bWJlciBvZiBhcmd1bWVudHMgd2hpY2ggbWF5IGJlIHBhc3NlZCB0byB0aGVcbiAgICAgICAqICAgICAgICBmdW5jdGlvbi4gSWYgY2FsbGVkIHdpdGggbW9yZSB0aGFuIHRoaXMgbnVtYmVyIG9mIGFyZ3VtZW50cywgdGhlXG4gICAgICAgKiAgICAgICAgd3JhcHBlciB3aWxsIHJhaXNlIGFuIGV4Y2VwdGlvbi5cbiAgICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gbWV0YWRhdGEubWF4UmVzb2x2ZWRBcmdzXG4gICAgICAgKiAgICAgICAgVGhlIG1heGltdW0gbnVtYmVyIG9mIGFyZ3VtZW50cyB3aGljaCBtYXkgYmUgcGFzc2VkIHRvIHRoZVxuICAgICAgICogICAgICAgIGNhbGxiYWNrIGNyZWF0ZWQgYnkgdGhlIHdyYXBwZWQgYXN5bmMgZnVuY3Rpb24uXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge2Z1bmN0aW9uKG9iamVjdCwgLi4uKil9XG4gICAgICAgKiAgICAgICBUaGUgZ2VuZXJhdGVkIHdyYXBwZXIgZnVuY3Rpb24uXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCB3cmFwQXN5bmNGdW5jdGlvbiA9IChuYW1lLCBtZXRhZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gYXN5bmNGdW5jdGlvbldyYXBwZXIodGFyZ2V0LCAuLi5hcmdzKSB7XG4gICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoIDwgbWV0YWRhdGEubWluQXJncykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBsZWFzdCAke21ldGFkYXRhLm1pbkFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1pbkFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPiBtZXRhZGF0YS5tYXhBcmdzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IG1vc3QgJHttZXRhZGF0YS5tYXhBcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5tYXhBcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YS5mYWxsYmFja1RvTm9DYWxsYmFjaykge1xuICAgICAgICAgICAgICAvLyBUaGlzIEFQSSBtZXRob2QgaGFzIGN1cnJlbnRseSBubyBjYWxsYmFjayBvbiBDaHJvbWUsIGJ1dCBpdCByZXR1cm4gYSBwcm9taXNlIG9uIEZpcmVmb3gsXG4gICAgICAgICAgICAgIC8vIGFuZCBzbyB0aGUgcG9seWZpbGwgd2lsbCB0cnkgdG8gY2FsbCBpdCB3aXRoIGEgY2FsbGJhY2sgZmlyc3QsIGFuZCBpdCB3aWxsIGZhbGxiYWNrXG4gICAgICAgICAgICAgIC8vIHRvIG5vdCBwYXNzaW5nIHRoZSBjYWxsYmFjayBpZiB0aGUgZmlyc3QgY2FsbCBmYWlscy5cbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncywgbWFrZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICAgICAgICByZWplY3RcbiAgICAgICAgICAgICAgICB9LCBtZXRhZGF0YSkpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChjYkVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGAke25hbWV9IEFQSSBtZXRob2QgZG9lc24ndCBzZWVtIHRvIHN1cHBvcnQgdGhlIGNhbGxiYWNrIHBhcmFtZXRlciwgYCArIFwiZmFsbGluZyBiYWNrIHRvIGNhbGwgaXQgd2l0aG91dCBhIGNhbGxiYWNrOiBcIiwgY2JFcnJvcik7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MpOyAvLyBVcGRhdGUgdGhlIEFQSSBtZXRob2QgbWV0YWRhdGEsIHNvIHRoYXQgdGhlIG5leHQgQVBJIGNhbGxzIHdpbGwgbm90IHRyeSB0b1xuICAgICAgICAgICAgICAgIC8vIHVzZSB0aGUgdW5zdXBwb3J0ZWQgY2FsbGJhY2sgYW55bW9yZS5cblxuICAgICAgICAgICAgICAgIG1ldGFkYXRhLmZhbGxiYWNrVG9Ob0NhbGxiYWNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbWV0YWRhdGEubm9DYWxsYmFjayA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhLm5vQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MpO1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncywgbWFrZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgICB9LCBtZXRhZGF0YSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogV3JhcHMgYW4gZXhpc3RpbmcgbWV0aG9kIG9mIHRoZSB0YXJnZXQgb2JqZWN0LCBzbyB0aGF0IGNhbGxzIHRvIGl0IGFyZVxuICAgICAgICogaW50ZXJjZXB0ZWQgYnkgdGhlIGdpdmVuIHdyYXBwZXIgZnVuY3Rpb24uIFRoZSB3cmFwcGVyIGZ1bmN0aW9uIHJlY2VpdmVzLFxuICAgICAgICogYXMgaXRzIGZpcnN0IGFyZ3VtZW50LCB0aGUgb3JpZ2luYWwgYHRhcmdldGAgb2JqZWN0LCBmb2xsb3dlZCBieSBlYWNoIG9mXG4gICAgICAgKiB0aGUgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgb3JpZ2luYWwgbWV0aG9kLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRcbiAgICAgICAqICAgICAgICBUaGUgb3JpZ2luYWwgdGFyZ2V0IG9iamVjdCB0aGF0IHRoZSB3cmFwcGVkIG1ldGhvZCBiZWxvbmdzIHRvLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbWV0aG9kXG4gICAgICAgKiAgICAgICAgVGhlIG1ldGhvZCBiZWluZyB3cmFwcGVkLiBUaGlzIGlzIHVzZWQgYXMgdGhlIHRhcmdldCBvZiB0aGUgUHJveHlcbiAgICAgICAqICAgICAgICBvYmplY3Qgd2hpY2ggaXMgY3JlYXRlZCB0byB3cmFwIHRoZSBtZXRob2QuXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgVGhlIHdyYXBwZXIgZnVuY3Rpb24gd2hpY2ggaXMgY2FsbGVkIGluIHBsYWNlIG9mIGEgZGlyZWN0IGludm9jYXRpb25cbiAgICAgICAqICAgICAgICBvZiB0aGUgd3JhcHBlZCBtZXRob2QuXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge1Byb3h5PGZ1bmN0aW9uPn1cbiAgICAgICAqICAgICAgICBBIFByb3h5IG9iamVjdCBmb3IgdGhlIGdpdmVuIG1ldGhvZCwgd2hpY2ggaW52b2tlcyB0aGUgZ2l2ZW4gd3JhcHBlclxuICAgICAgICogICAgICAgIG1ldGhvZCBpbiBpdHMgcGxhY2UuXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCB3cmFwTWV0aG9kID0gKHRhcmdldCwgbWV0aG9kLCB3cmFwcGVyKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJveHkobWV0aG9kLCB7XG4gICAgICAgICAgYXBwbHkodGFyZ2V0TWV0aG9kLCB0aGlzT2JqLCBhcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gd3JhcHBlci5jYWxsKHRoaXNPYmosIHRhcmdldCwgLi4uYXJncyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgbGV0IGhhc093blByb3BlcnR5ID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuICAgICAgLyoqXG4gICAgICAgKiBXcmFwcyBhbiBvYmplY3QgaW4gYSBQcm94eSB3aGljaCBpbnRlcmNlcHRzIGFuZCB3cmFwcyBjZXJ0YWluIG1ldGhvZHNcbiAgICAgICAqIGJhc2VkIG9uIHRoZSBnaXZlbiBgd3JhcHBlcnNgIGFuZCBgbWV0YWRhdGFgIG9iamVjdHMuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICAgICAgICogICAgICAgIFRoZSB0YXJnZXQgb2JqZWN0IHRvIHdyYXAuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IFt3cmFwcGVycyA9IHt9XVxuICAgICAgICogICAgICAgIEFuIG9iamVjdCB0cmVlIGNvbnRhaW5pbmcgd3JhcHBlciBmdW5jdGlvbnMgZm9yIHNwZWNpYWwgY2FzZXMuIEFueVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uIHByZXNlbnQgaW4gdGhpcyBvYmplY3QgdHJlZSBpcyBjYWxsZWQgaW4gcGxhY2Ugb2YgdGhlXG4gICAgICAgKiAgICAgICAgbWV0aG9kIGluIHRoZSBzYW1lIGxvY2F0aW9uIGluIHRoZSBgdGFyZ2V0YCBvYmplY3QgdHJlZS4gVGhlc2VcbiAgICAgICAqICAgICAgICB3cmFwcGVyIG1ldGhvZHMgYXJlIGludm9rZWQgYXMgZGVzY3JpYmVkIGluIHtAc2VlIHdyYXBNZXRob2R9LlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbbWV0YWRhdGEgPSB7fV1cbiAgICAgICAqICAgICAgICBBbiBvYmplY3QgdHJlZSBjb250YWluaW5nIG1ldGFkYXRhIHVzZWQgdG8gYXV0b21hdGljYWxseSBnZW5lcmF0ZVxuICAgICAgICogICAgICAgIFByb21pc2UtYmFzZWQgd3JhcHBlciBmdW5jdGlvbnMgZm9yIGFzeW5jaHJvbm91cy4gQW55IGZ1bmN0aW9uIGluXG4gICAgICAgKiAgICAgICAgdGhlIGB0YXJnZXRgIG9iamVjdCB0cmVlIHdoaWNoIGhhcyBhIGNvcnJlc3BvbmRpbmcgbWV0YWRhdGEgb2JqZWN0XG4gICAgICAgKiAgICAgICAgaW4gdGhlIHNhbWUgbG9jYXRpb24gaW4gdGhlIGBtZXRhZGF0YWAgdHJlZSBpcyByZXBsYWNlZCB3aXRoIGFuXG4gICAgICAgKiAgICAgICAgYXV0b21hdGljYWxseS1nZW5lcmF0ZWQgd3JhcHBlciBmdW5jdGlvbiwgYXMgZGVzY3JpYmVkIGluXG4gICAgICAgKiAgICAgICAge0BzZWUgd3JhcEFzeW5jRnVuY3Rpb259XG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge1Byb3h5PG9iamVjdD59XG4gICAgICAgKi9cblxuICAgICAgY29uc3Qgd3JhcE9iamVjdCA9ICh0YXJnZXQsIHdyYXBwZXJzID0ge30sIG1ldGFkYXRhID0ge30pID0+IHtcbiAgICAgICAgbGV0IGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgbGV0IGhhbmRsZXJzID0ge1xuICAgICAgICAgIGhhcyhwcm94eVRhcmdldCwgcHJvcCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3AgaW4gdGFyZ2V0IHx8IHByb3AgaW4gY2FjaGU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGdldChwcm94eVRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgIGlmIChwcm9wIGluIGNhY2hlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjYWNoZVtwcm9wXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEocHJvcCBpbiB0YXJnZXQpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRhcmdldFtwcm9wXTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBtZXRob2Qgb24gdGhlIHVuZGVybHlpbmcgb2JqZWN0LiBDaGVjayBpZiB3ZSBuZWVkIHRvIGRvXG4gICAgICAgICAgICAgIC8vIGFueSB3cmFwcGluZy5cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3cmFwcGVyc1twcm9wXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSBhIHNwZWNpYWwtY2FzZSB3cmFwcGVyIGZvciB0aGlzIG1ldGhvZC5cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBNZXRob2QodGFyZ2V0LCB0YXJnZXRbcHJvcF0sIHdyYXBwZXJzW3Byb3BdKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNPd25Qcm9wZXJ0eShtZXRhZGF0YSwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGFuIGFzeW5jIG1ldGhvZCB0aGF0IHdlIGhhdmUgbWV0YWRhdGEgZm9yLiBDcmVhdGUgYVxuICAgICAgICAgICAgICAgIC8vIFByb21pc2Ugd3JhcHBlciBmb3IgaXQuXG4gICAgICAgICAgICAgICAgbGV0IHdyYXBwZXIgPSB3cmFwQXN5bmNGdW5jdGlvbihwcm9wLCBtZXRhZGF0YVtwcm9wXSk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwTWV0aG9kKHRhcmdldCwgdGFyZ2V0W3Byb3BdLCB3cmFwcGVyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgbWV0aG9kIHRoYXQgd2UgZG9uJ3Qga25vdyBvciBjYXJlIGFib3V0LiBSZXR1cm4gdGhlXG4gICAgICAgICAgICAgICAgLy8gb3JpZ2luYWwgbWV0aG9kLCBib3VuZCB0byB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5iaW5kKHRhcmdldCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmIChoYXNPd25Qcm9wZXJ0eSh3cmFwcGVycywgcHJvcCkgfHwgaGFzT3duUHJvcGVydHkobWV0YWRhdGEsIHByb3ApKSkge1xuICAgICAgICAgICAgICAvLyBUaGlzIGlzIGFuIG9iamVjdCB0aGF0IHdlIG5lZWQgdG8gZG8gc29tZSB3cmFwcGluZyBmb3IgdGhlIGNoaWxkcmVuXG4gICAgICAgICAgICAgIC8vIG9mLiBDcmVhdGUgYSBzdWItb2JqZWN0IHdyYXBwZXIgZm9yIGl0IHdpdGggdGhlIGFwcHJvcHJpYXRlIGNoaWxkXG4gICAgICAgICAgICAgIC8vIG1ldGFkYXRhLlxuICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBPYmplY3QodmFsdWUsIHdyYXBwZXJzW3Byb3BdLCBtZXRhZGF0YVtwcm9wXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhhc093blByb3BlcnR5KG1ldGFkYXRhLCBcIipcIikpIHtcbiAgICAgICAgICAgICAgLy8gV3JhcCBhbGwgcHJvcGVydGllcyBpbiAqIG5hbWVzcGFjZS5cbiAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwT2JqZWN0KHZhbHVlLCB3cmFwcGVyc1twcm9wXSwgbWV0YWRhdGFbXCIqXCJdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIFdlIGRvbid0IG5lZWQgdG8gZG8gYW55IHdyYXBwaW5nIGZvciB0aGlzIHByb3BlcnR5LFxuICAgICAgICAgICAgICAvLyBzbyBqdXN0IGZvcndhcmQgYWxsIGFjY2VzcyB0byB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjYWNoZSwgcHJvcCwge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldFtwcm9wXTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FjaGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc2V0KHByb3h5VGFyZ2V0LCBwcm9wLCB2YWx1ZSwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgIGlmIChwcm9wIGluIGNhY2hlKSB7XG4gICAgICAgICAgICAgIGNhY2hlW3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGRlZmluZVByb3BlcnR5KHByb3h5VGFyZ2V0LCBwcm9wLCBkZXNjKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShjYWNoZSwgcHJvcCwgZGVzYyk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGRlbGV0ZVByb3BlcnR5KHByb3h5VGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5kZWxldGVQcm9wZXJ0eShjYWNoZSwgcHJvcCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH07IC8vIFBlciBjb250cmFjdCBvZiB0aGUgUHJveHkgQVBJLCB0aGUgXCJnZXRcIiBwcm94eSBoYW5kbGVyIG11c3QgcmV0dXJuIHRoZVxuICAgICAgICAvLyBvcmlnaW5hbCB2YWx1ZSBvZiB0aGUgdGFyZ2V0IGlmIHRoYXQgdmFsdWUgaXMgZGVjbGFyZWQgcmVhZC1vbmx5IGFuZFxuICAgICAgICAvLyBub24tY29uZmlndXJhYmxlLiBGb3IgdGhpcyByZWFzb24sIHdlIGNyZWF0ZSBhbiBvYmplY3Qgd2l0aCB0aGVcbiAgICAgICAgLy8gcHJvdG90eXBlIHNldCB0byBgdGFyZ2V0YCBpbnN0ZWFkIG9mIHVzaW5nIGB0YXJnZXRgIGRpcmVjdGx5LlxuICAgICAgICAvLyBPdGhlcndpc2Ugd2UgY2Fubm90IHJldHVybiBhIGN1c3RvbSBvYmplY3QgZm9yIEFQSXMgdGhhdFxuICAgICAgICAvLyBhcmUgZGVjbGFyZWQgcmVhZC1vbmx5IGFuZCBub24tY29uZmlndXJhYmxlLCBzdWNoIGFzIGBjaHJvbWUuZGV2dG9vbHNgLlxuICAgICAgICAvL1xuICAgICAgICAvLyBUaGUgcHJveHkgaGFuZGxlcnMgdGhlbXNlbHZlcyB3aWxsIHN0aWxsIHVzZSB0aGUgb3JpZ2luYWwgYHRhcmdldGBcbiAgICAgICAgLy8gaW5zdGVhZCBvZiB0aGUgYHByb3h5VGFyZ2V0YCwgc28gdGhhdCB0aGUgbWV0aG9kcyBhbmQgcHJvcGVydGllcyBhcmVcbiAgICAgICAgLy8gZGVyZWZlcmVuY2VkIHZpYSB0aGUgb3JpZ2luYWwgdGFyZ2V0cy5cblxuICAgICAgICBsZXQgcHJveHlUYXJnZXQgPSBPYmplY3QuY3JlYXRlKHRhcmdldCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJveHkocHJveHlUYXJnZXQsIGhhbmRsZXJzKTtcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYSBzZXQgb2Ygd3JhcHBlciBmdW5jdGlvbnMgZm9yIGFuIGV2ZW50IG9iamVjdCwgd2hpY2ggaGFuZGxlc1xuICAgICAgICogd3JhcHBpbmcgb2YgbGlzdGVuZXIgZnVuY3Rpb25zIHRoYXQgdGhvc2UgbWVzc2FnZXMgYXJlIHBhc3NlZC5cbiAgICAgICAqXG4gICAgICAgKiBBIHNpbmdsZSB3cmFwcGVyIGlzIGNyZWF0ZWQgZm9yIGVhY2ggbGlzdGVuZXIgZnVuY3Rpb24sIGFuZCBzdG9yZWQgaW4gYVxuICAgICAgICogbWFwLiBTdWJzZXF1ZW50IGNhbGxzIHRvIGBhZGRMaXN0ZW5lcmAsIGBoYXNMaXN0ZW5lcmAsIG9yIGByZW1vdmVMaXN0ZW5lcmBcbiAgICAgICAqIHJldHJpZXZlIHRoZSBvcmlnaW5hbCB3cmFwcGVyLCBzbyB0aGF0ICBhdHRlbXB0cyB0byByZW1vdmUgYVxuICAgICAgICogcHJldmlvdXNseS1hZGRlZCBsaXN0ZW5lciB3b3JrIGFzIGV4cGVjdGVkLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7RGVmYXVsdFdlYWtNYXA8ZnVuY3Rpb24sIGZ1bmN0aW9uPn0gd3JhcHBlck1hcFxuICAgICAgICogICAgICAgIEEgRGVmYXVsdFdlYWtNYXAgb2JqZWN0IHdoaWNoIHdpbGwgY3JlYXRlIHRoZSBhcHByb3ByaWF0ZSB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgZm9yIGEgZ2l2ZW4gbGlzdGVuZXIgZnVuY3Rpb24gd2hlbiBvbmUgZG9lcyBub3QgZXhpc3QsIGFuZCByZXRyaWV2ZVxuICAgICAgICogICAgICAgIGFuIGV4aXN0aW5nIG9uZSB3aGVuIGl0IGRvZXMuXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge29iamVjdH1cbiAgICAgICAqL1xuXG5cbiAgICAgIGNvbnN0IHdyYXBFdmVudCA9IHdyYXBwZXJNYXAgPT4gKHtcbiAgICAgICAgYWRkTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lciwgLi4uYXJncykge1xuICAgICAgICAgIHRhcmdldC5hZGRMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lciksIC4uLmFyZ3MpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhhc0xpc3RlbmVyKHRhcmdldCwgbGlzdGVuZXIpIHtcbiAgICAgICAgICByZXR1cm4gdGFyZ2V0Lmhhc0xpc3RlbmVyKHdyYXBwZXJNYXAuZ2V0KGxpc3RlbmVyKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lcikge1xuICAgICAgICAgIHRhcmdldC5yZW1vdmVMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lcikpO1xuICAgICAgICB9XG5cbiAgICAgIH0pOyAvLyBLZWVwIHRyYWNrIGlmIHRoZSBkZXByZWNhdGlvbiB3YXJuaW5nIGhhcyBiZWVuIGxvZ2dlZCBhdCBsZWFzdCBvbmNlLlxuXG5cbiAgICAgIGxldCBsb2dnZWRTZW5kUmVzcG9uc2VEZXByZWNhdGlvbldhcm5pbmcgPSBmYWxzZTtcbiAgICAgIGNvbnN0IG9uTWVzc2FnZVdyYXBwZXJzID0gbmV3IERlZmF1bHRXZWFrTWFwKGxpc3RlbmVyID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgcmV0dXJuIGxpc3RlbmVyO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcmFwcyBhIG1lc3NhZ2UgbGlzdGVuZXIgZnVuY3Rpb24gc28gdGhhdCBpdCBtYXkgc2VuZCByZXNwb25zZXMgYmFzZWQgb25cbiAgICAgICAgICogaXRzIHJldHVybiB2YWx1ZSwgcmF0aGVyIHRoYW4gYnkgcmV0dXJuaW5nIGEgc2VudGluZWwgdmFsdWUgYW5kIGNhbGxpbmcgYVxuICAgICAgICAgKiBjYWxsYmFjay4gSWYgdGhlIGxpc3RlbmVyIGZ1bmN0aW9uIHJldHVybnMgYSBQcm9taXNlLCB0aGUgcmVzcG9uc2UgaXNcbiAgICAgICAgICogc2VudCB3aGVuIHRoZSBwcm9taXNlIGVpdGhlciByZXNvbHZlcyBvciByZWplY3RzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0geyp9IG1lc3NhZ2VcbiAgICAgICAgICogICAgICAgIFRoZSBtZXNzYWdlIHNlbnQgYnkgdGhlIG90aGVyIGVuZCBvZiB0aGUgY2hhbm5lbC5cbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHNlbmRlclxuICAgICAgICAgKiAgICAgICAgRGV0YWlscyBhYm91dCB0aGUgc2VuZGVyIG9mIHRoZSBtZXNzYWdlLlxuICAgICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCopfSBzZW5kUmVzcG9uc2VcbiAgICAgICAgICogICAgICAgIEEgY2FsbGJhY2sgd2hpY2gsIHdoZW4gY2FsbGVkIHdpdGggYW4gYXJiaXRyYXJ5IGFyZ3VtZW50LCBzZW5kc1xuICAgICAgICAgKiAgICAgICAgdGhhdCB2YWx1ZSBhcyBhIHJlc3BvbnNlLlxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICogICAgICAgIFRydWUgaWYgdGhlIHdyYXBwZWQgbGlzdGVuZXIgcmV0dXJuZWQgYSBQcm9taXNlLCB3aGljaCB3aWxsIGxhdGVyXG4gICAgICAgICAqICAgICAgICB5aWVsZCBhIHJlc3BvbnNlLiBGYWxzZSBvdGhlcndpc2UuXG4gICAgICAgICAqL1xuXG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG9uTWVzc2FnZShtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgICAgICAgIGxldCBkaWRDYWxsU2VuZFJlc3BvbnNlID0gZmFsc2U7XG4gICAgICAgICAgbGV0IHdyYXBwZWRTZW5kUmVzcG9uc2U7XG4gICAgICAgICAgbGV0IHNlbmRSZXNwb25zZVByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHdyYXBwZWRTZW5kUmVzcG9uc2UgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgaWYgKCFsb2dnZWRTZW5kUmVzcG9uc2VEZXByZWNhdGlvbldhcm5pbmcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oU0VORF9SRVNQT05TRV9ERVBSRUNBVElPTl9XQVJOSU5HLCBuZXcgRXJyb3IoKS5zdGFjayk7XG4gICAgICAgICAgICAgICAgbG9nZ2VkU2VuZFJlc3BvbnNlRGVwcmVjYXRpb25XYXJuaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGRpZENhbGxTZW5kUmVzcG9uc2UgPSB0cnVlO1xuICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbGV0IHJlc3VsdDtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXN1bHQgPSBsaXN0ZW5lcihtZXNzYWdlLCBzZW5kZXIsIHdyYXBwZWRTZW5kUmVzcG9uc2UpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVzdWx0ID0gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBpc1Jlc3VsdFRoZW5hYmxlID0gcmVzdWx0ICE9PSB0cnVlICYmIGlzVGhlbmFibGUocmVzdWx0KTsgLy8gSWYgdGhlIGxpc3RlbmVyIGRpZG4ndCByZXR1cm5lZCB0cnVlIG9yIGEgUHJvbWlzZSwgb3IgY2FsbGVkXG4gICAgICAgICAgLy8gd3JhcHBlZFNlbmRSZXNwb25zZSBzeW5jaHJvbm91c2x5LCB3ZSBjYW4gZXhpdCBlYXJsaWVyXG4gICAgICAgICAgLy8gYmVjYXVzZSB0aGVyZSB3aWxsIGJlIG5vIHJlc3BvbnNlIHNlbnQgZnJvbSB0aGlzIGxpc3RlbmVyLlxuXG4gICAgICAgICAgaWYgKHJlc3VsdCAhPT0gdHJ1ZSAmJiAhaXNSZXN1bHRUaGVuYWJsZSAmJiAhZGlkQ2FsbFNlbmRSZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0gLy8gQSBzbWFsbCBoZWxwZXIgdG8gc2VuZCB0aGUgbWVzc2FnZSBpZiB0aGUgcHJvbWlzZSByZXNvbHZlc1xuICAgICAgICAgIC8vIGFuZCBhbiBlcnJvciBpZiB0aGUgcHJvbWlzZSByZWplY3RzIChhIHdyYXBwZWQgc2VuZE1lc3NhZ2UgaGFzXG4gICAgICAgICAgLy8gdG8gdHJhbnNsYXRlIHRoZSBtZXNzYWdlIGludG8gYSByZXNvbHZlZCBwcm9taXNlIG9yIGEgcmVqZWN0ZWRcbiAgICAgICAgICAvLyBwcm9taXNlKS5cblxuXG4gICAgICAgICAgY29uc3Qgc2VuZFByb21pc2VkUmVzdWx0ID0gcHJvbWlzZSA9PiB7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4obXNnID0+IHtcbiAgICAgICAgICAgICAgLy8gc2VuZCB0aGUgbWVzc2FnZSB2YWx1ZS5cbiAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKG1zZyk7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgIC8vIFNlbmQgYSBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBlcnJvciBpZiB0aGUgcmVqZWN0ZWQgdmFsdWVcbiAgICAgICAgICAgICAgLy8gaXMgYW4gaW5zdGFuY2Ugb2YgZXJyb3IsIG9yIHRoZSBvYmplY3QgaXRzZWxmIG90aGVyd2lzZS5cbiAgICAgICAgICAgICAgbGV0IG1lc3NhZ2U7XG5cbiAgICAgICAgICAgICAgaWYgKGVycm9yICYmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yIHx8IHR5cGVvZiBlcnJvci5tZXNzYWdlID09PSBcInN0cmluZ1wiKSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBcIkFuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJyZWRcIjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7XG4gICAgICAgICAgICAgICAgX19tb3pXZWJFeHRlbnNpb25Qb2x5ZmlsbFJlamVjdF9fOiB0cnVlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAvLyBQcmludCBhbiBlcnJvciBvbiB0aGUgY29uc29sZSBpZiB1bmFibGUgdG8gc2VuZCB0aGUgcmVzcG9uc2UuXG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gc2VuZCBvbk1lc3NhZ2UgcmVqZWN0ZWQgcmVwbHlcIiwgZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07IC8vIElmIHRoZSBsaXN0ZW5lciByZXR1cm5lZCBhIFByb21pc2UsIHNlbmQgdGhlIHJlc29sdmVkIHZhbHVlIGFzIGFcbiAgICAgICAgICAvLyByZXN1bHQsIG90aGVyd2lzZSB3YWl0IHRoZSBwcm9taXNlIHJlbGF0ZWQgdG8gdGhlIHdyYXBwZWRTZW5kUmVzcG9uc2VcbiAgICAgICAgICAvLyBjYWxsYmFjayB0byByZXNvbHZlIGFuZCBzZW5kIGl0IGFzIGEgcmVzcG9uc2UuXG5cblxuICAgICAgICAgIGlmIChpc1Jlc3VsdFRoZW5hYmxlKSB7XG4gICAgICAgICAgICBzZW5kUHJvbWlzZWRSZXN1bHQocmVzdWx0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VuZFByb21pc2VkUmVzdWx0KHNlbmRSZXNwb25zZVByb21pc2UpO1xuICAgICAgICAgIH0gLy8gTGV0IENocm9tZSBrbm93IHRoYXQgdGhlIGxpc3RlbmVyIGlzIHJlcGx5aW5nLlxuXG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCB3cmFwcGVkU2VuZE1lc3NhZ2VDYWxsYmFjayA9ICh7XG4gICAgICAgIHJlamVjdCxcbiAgICAgICAgcmVzb2x2ZVxuICAgICAgfSwgcmVwbHkpID0+IHtcbiAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICAvLyBEZXRlY3Qgd2hlbiBub25lIG9mIHRoZSBsaXN0ZW5lcnMgcmVwbGllZCB0byB0aGUgc2VuZE1lc3NhZ2UgY2FsbCBhbmQgcmVzb2x2ZVxuICAgICAgICAgIC8vIHRoZSBwcm9taXNlIHRvIHVuZGVmaW5lZCBhcyBpbiBGaXJlZm94LlxuICAgICAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS93ZWJleHRlbnNpb24tcG9seWZpbGwvaXNzdWVzLzEzMFxuICAgICAgICAgIGlmIChleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UgPT09IENIUk9NRV9TRU5EX01FU1NBR0VfQ0FMTEJBQ0tfTk9fUkVTUE9OU0VfTUVTU0FHRSkge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJlcGx5ICYmIHJlcGx5Ll9fbW96V2ViRXh0ZW5zaW9uUG9seWZpbGxSZWplY3RfXykge1xuICAgICAgICAgIC8vIENvbnZlcnQgYmFjayB0aGUgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgZXJyb3IgaW50b1xuICAgICAgICAgIC8vIGFuIEVycm9yIGluc3RhbmNlLlxuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IocmVwbHkubWVzc2FnZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUocmVwbHkpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCB3cmFwcGVkU2VuZE1lc3NhZ2UgPSAobmFtZSwgbWV0YWRhdGEsIGFwaU5hbWVzcGFjZU9iaiwgLi4uYXJncykgPT4ge1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPCBtZXRhZGF0YS5taW5BcmdzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBsZWFzdCAke21ldGFkYXRhLm1pbkFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1pbkFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA+IG1ldGFkYXRhLm1heEFyZ3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IG1vc3QgJHttZXRhZGF0YS5tYXhBcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5tYXhBcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHdyYXBwZWRDYiA9IHdyYXBwZWRTZW5kTWVzc2FnZUNhbGxiYWNrLmJpbmQobnVsbCwge1xuICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGFyZ3MucHVzaCh3cmFwcGVkQ2IpO1xuICAgICAgICAgIGFwaU5hbWVzcGFjZU9iai5zZW5kTWVzc2FnZSguLi5hcmdzKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzdGF0aWNXcmFwcGVycyA9IHtcbiAgICAgICAgcnVudGltZToge1xuICAgICAgICAgIG9uTWVzc2FnZTogd3JhcEV2ZW50KG9uTWVzc2FnZVdyYXBwZXJzKSxcbiAgICAgICAgICBvbk1lc3NhZ2VFeHRlcm5hbDogd3JhcEV2ZW50KG9uTWVzc2FnZVdyYXBwZXJzKSxcbiAgICAgICAgICBzZW5kTWVzc2FnZTogd3JhcHBlZFNlbmRNZXNzYWdlLmJpbmQobnVsbCwgXCJzZW5kTWVzc2FnZVwiLCB7XG4gICAgICAgICAgICBtaW5BcmdzOiAxLFxuICAgICAgICAgICAgbWF4QXJnczogM1xuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHRhYnM6IHtcbiAgICAgICAgICBzZW5kTWVzc2FnZTogd3JhcHBlZFNlbmRNZXNzYWdlLmJpbmQobnVsbCwgXCJzZW5kTWVzc2FnZVwiLCB7XG4gICAgICAgICAgICBtaW5BcmdzOiAyLFxuICAgICAgICAgICAgbWF4QXJnczogM1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjb25zdCBzZXR0aW5nTWV0YWRhdGEgPSB7XG4gICAgICAgIGNsZWFyOiB7XG4gICAgICAgICAgbWluQXJnczogMSxcbiAgICAgICAgICBtYXhBcmdzOiAxXG4gICAgICAgIH0sXG4gICAgICAgIGdldDoge1xuICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgbWF4QXJnczogMVxuICAgICAgICB9LFxuICAgICAgICBzZXQ6IHtcbiAgICAgICAgICBtaW5BcmdzOiAxLFxuICAgICAgICAgIG1heEFyZ3M6IDFcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGFwaU1ldGFkYXRhLnByaXZhY3kgPSB7XG4gICAgICAgIG5ldHdvcms6IHtcbiAgICAgICAgICBcIipcIjogc2V0dGluZ01ldGFkYXRhXG4gICAgICAgIH0sXG4gICAgICAgIHNlcnZpY2VzOiB7XG4gICAgICAgICAgXCIqXCI6IHNldHRpbmdNZXRhZGF0YVxuICAgICAgICB9LFxuICAgICAgICB3ZWJzaXRlczoge1xuICAgICAgICAgIFwiKlwiOiBzZXR0aW5nTWV0YWRhdGFcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiB3cmFwT2JqZWN0KGV4dGVuc2lvbkFQSXMsIHN0YXRpY1dyYXBwZXJzLCBhcGlNZXRhZGF0YSk7XG4gICAgfTtcblxuICAgIGlmICh0eXBlb2YgY2hyb21lICE9IFwib2JqZWN0XCIgfHwgIWNocm9tZSB8fCAhY2hyb21lLnJ1bnRpbWUgfHwgIWNocm9tZS5ydW50aW1lLmlkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIHNjcmlwdCBzaG91bGQgb25seSBiZSBsb2FkZWQgaW4gYSBicm93c2VyIGV4dGVuc2lvbi5cIik7XG4gICAgfSAvLyBUaGUgYnVpbGQgcHJvY2VzcyBhZGRzIGEgVU1EIHdyYXBwZXIgYXJvdW5kIHRoaXMgZmlsZSwgd2hpY2ggbWFrZXMgdGhlXG4gICAgLy8gYG1vZHVsZWAgdmFyaWFibGUgYXZhaWxhYmxlLlxuXG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHdyYXBBUElzKGNocm9tZSk7XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBicm93c2VyO1xuICB9XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJyb3dzZXItcG9seWZpbGwuanMubWFwXG4iLCIvLyBpbnQ2NC1idWZmZXIuanNcblxuLypqc2hpbnQgLVcwMTggKi8gLy8gQ29uZnVzaW5nIHVzZSBvZiAnIScuXG4vKmpzaGludCAtVzAzMCAqLyAvLyBFeHBlY3RlZCBhbiBhc3NpZ25tZW50IG9yIGZ1bmN0aW9uIGNhbGwgYW5kIGluc3RlYWQgc2F3IGFuIGV4cHJlc3Npb24uXG4vKmpzaGludCAtVzA5MyAqLyAvLyBEaWQgeW91IG1lYW4gdG8gcmV0dXJuIGEgY29uZGl0aW9uYWwgaW5zdGVhZCBvZiBhbiBhc3NpZ25tZW50P1xuXG52YXIgVWludDY0QkUsIEludDY0QkUsIFVpbnQ2NExFLCBJbnQ2NExFO1xuXG4hZnVuY3Rpb24oZXhwb3J0cykge1xuICAvLyBjb25zdGFudHNcblxuICB2YXIgVU5ERUZJTkVEID0gXCJ1bmRlZmluZWRcIjtcbiAgdmFyIEJVRkZFUiA9IChVTkRFRklORUQgIT09IHR5cGVvZiBCdWZmZXIpICYmIEJ1ZmZlcjtcbiAgdmFyIFVJTlQ4QVJSQVkgPSAoVU5ERUZJTkVEICE9PSB0eXBlb2YgVWludDhBcnJheSkgJiYgVWludDhBcnJheTtcbiAgdmFyIEFSUkFZQlVGRkVSID0gKFVOREVGSU5FRCAhPT0gdHlwZW9mIEFycmF5QnVmZmVyKSAmJiBBcnJheUJ1ZmZlcjtcbiAgdmFyIFpFUk8gPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF07XG4gIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBfaXNBcnJheTtcbiAgdmFyIEJJVDMyID0gNDI5NDk2NzI5NjtcbiAgdmFyIEJJVDI0ID0gMTY3NzcyMTY7XG5cbiAgLy8gc3RvcmFnZSBjbGFzc1xuXG4gIHZhciBzdG9yYWdlOyAvLyBBcnJheTtcblxuICAvLyBnZW5lcmF0ZSBjbGFzc2VzXG5cbiAgVWludDY0QkUgPSBmYWN0b3J5KFwiVWludDY0QkVcIiwgdHJ1ZSwgdHJ1ZSk7XG4gIEludDY0QkUgPSBmYWN0b3J5KFwiSW50NjRCRVwiLCB0cnVlLCBmYWxzZSk7XG4gIFVpbnQ2NExFID0gZmFjdG9yeShcIlVpbnQ2NExFXCIsIGZhbHNlLCB0cnVlKTtcbiAgSW50NjRMRSA9IGZhY3RvcnkoXCJJbnQ2NExFXCIsIGZhbHNlLCBmYWxzZSk7XG5cbiAgLy8gY2xhc3MgZmFjdG9yeVxuXG4gIGZ1bmN0aW9uIGZhY3RvcnkobmFtZSwgYmlnZW5kaWFuLCB1bnNpZ25lZCkge1xuICAgIHZhciBwb3NIID0gYmlnZW5kaWFuID8gMCA6IDQ7XG4gICAgdmFyIHBvc0wgPSBiaWdlbmRpYW4gPyA0IDogMDtcbiAgICB2YXIgcG9zMCA9IGJpZ2VuZGlhbiA/IDAgOiAzO1xuICAgIHZhciBwb3MxID0gYmlnZW5kaWFuID8gMSA6IDI7XG4gICAgdmFyIHBvczIgPSBiaWdlbmRpYW4gPyAyIDogMTtcbiAgICB2YXIgcG9zMyA9IGJpZ2VuZGlhbiA/IDMgOiAwO1xuICAgIHZhciBmcm9tUG9zaXRpdmUgPSBiaWdlbmRpYW4gPyBmcm9tUG9zaXRpdmVCRSA6IGZyb21Qb3NpdGl2ZUxFO1xuICAgIHZhciBmcm9tTmVnYXRpdmUgPSBiaWdlbmRpYW4gPyBmcm9tTmVnYXRpdmVCRSA6IGZyb21OZWdhdGl2ZUxFO1xuICAgIHZhciBwcm90byA9IEludDY0LnByb3RvdHlwZTtcbiAgICB2YXIgaXNOYW1lID0gXCJpc1wiICsgbmFtZTtcbiAgICB2YXIgX2lzSW50NjQgPSBcIl9cIiArIGlzTmFtZTtcblxuICAgIC8vIHByb3BlcnRpZXNcbiAgICBwcm90by5idWZmZXIgPSB2b2lkIDA7XG4gICAgcHJvdG8ub2Zmc2V0ID0gMDtcbiAgICBwcm90b1tfaXNJbnQ2NF0gPSB0cnVlO1xuXG4gICAgLy8gbWV0aG9kc1xuICAgIHByb3RvLnRvTnVtYmVyID0gdG9OdW1iZXI7XG4gICAgcHJvdG8udG9TdHJpbmcgPSB0b1N0cmluZztcbiAgICBwcm90by50b0pTT04gPSB0b051bWJlcjtcbiAgICBwcm90by50b0FycmF5ID0gdG9BcnJheTtcblxuICAgIC8vIGFkZCAudG9CdWZmZXIoKSBtZXRob2Qgb25seSB3aGVuIEJ1ZmZlciBhdmFpbGFibGVcbiAgICBpZiAoQlVGRkVSKSBwcm90by50b0J1ZmZlciA9IHRvQnVmZmVyO1xuXG4gICAgLy8gYWRkIC50b0FycmF5QnVmZmVyKCkgbWV0aG9kIG9ubHkgd2hlbiBVaW50OEFycmF5IGF2YWlsYWJsZVxuICAgIGlmIChVSU5UOEFSUkFZKSBwcm90by50b0FycmF5QnVmZmVyID0gdG9BcnJheUJ1ZmZlcjtcblxuICAgIC8vIGlzVWludDY0QkUsIGlzSW50NjRCRVxuICAgIEludDY0W2lzTmFtZV0gPSBpc0ludDY0O1xuXG4gICAgLy8gQ29tbW9uSlNcbiAgICBleHBvcnRzW25hbWVdID0gSW50NjQ7XG5cbiAgICByZXR1cm4gSW50NjQ7XG5cbiAgICAvLyBjb25zdHJ1Y3RvclxuICAgIGZ1bmN0aW9uIEludDY0KGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSwgcmFkZGl4KSB7XG4gICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgSW50NjQpKSByZXR1cm4gbmV3IEludDY0KGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSwgcmFkZGl4KTtcbiAgICAgIHJldHVybiBpbml0KHRoaXMsIGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSwgcmFkZGl4KTtcbiAgICB9XG5cbiAgICAvLyBpc1VpbnQ2NEJFLCBpc0ludDY0QkVcbiAgICBmdW5jdGlvbiBpc0ludDY0KGIpIHtcbiAgICAgIHJldHVybiAhIShiICYmIGJbX2lzSW50NjRdKTtcbiAgICB9XG5cbiAgICAvLyBpbml0aWFsaXplclxuICAgIGZ1bmN0aW9uIGluaXQodGhhdCwgYnVmZmVyLCBvZmZzZXQsIHZhbHVlLCByYWRkaXgpIHtcbiAgICAgIGlmIChVSU5UOEFSUkFZICYmIEFSUkFZQlVGRkVSKSB7XG4gICAgICAgIGlmIChidWZmZXIgaW5zdGFuY2VvZiBBUlJBWUJVRkZFUikgYnVmZmVyID0gbmV3IFVJTlQ4QVJSQVkoYnVmZmVyKTtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQVJSQVlCVUZGRVIpIHZhbHVlID0gbmV3IFVJTlQ4QVJSQVkodmFsdWUpO1xuICAgICAgfVxuXG4gICAgICAvLyBJbnQ2NEJFKCkgc3R5bGVcbiAgICAgIGlmICghYnVmZmVyICYmICFvZmZzZXQgJiYgIXZhbHVlICYmICFzdG9yYWdlKSB7XG4gICAgICAgIC8vIHNob3J0Y3V0IHRvIGluaXRpYWxpemUgd2l0aCB6ZXJvXG4gICAgICAgIHRoYXQuYnVmZmVyID0gbmV3QXJyYXkoWkVSTywgMCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gSW50NjRCRSh2YWx1ZSwgcmFkZGl4KSBzdHlsZVxuICAgICAgaWYgKCFpc1ZhbGlkQnVmZmVyKGJ1ZmZlciwgb2Zmc2V0KSkge1xuICAgICAgICB2YXIgX3N0b3JhZ2UgPSBzdG9yYWdlIHx8IEFycmF5O1xuICAgICAgICByYWRkaXggPSBvZmZzZXQ7XG4gICAgICAgIHZhbHVlID0gYnVmZmVyO1xuICAgICAgICBvZmZzZXQgPSAwO1xuICAgICAgICBidWZmZXIgPSBuZXcgX3N0b3JhZ2UoOCk7XG4gICAgICB9XG5cbiAgICAgIHRoYXQuYnVmZmVyID0gYnVmZmVyO1xuICAgICAgdGhhdC5vZmZzZXQgPSBvZmZzZXQgfD0gMDtcblxuICAgICAgLy8gSW50NjRCRShidWZmZXIsIG9mZnNldCkgc3R5bGVcbiAgICAgIGlmIChVTkRFRklORUQgPT09IHR5cGVvZiB2YWx1ZSkgcmV0dXJuO1xuXG4gICAgICAvLyBJbnQ2NEJFKGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSwgcmFkZGl4KSBzdHlsZVxuICAgICAgaWYgKFwic3RyaW5nXCIgPT09IHR5cGVvZiB2YWx1ZSkge1xuICAgICAgICBmcm9tU3RyaW5nKGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSwgcmFkZGl4IHx8IDEwKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNWYWxpZEJ1ZmZlcih2YWx1ZSwgcmFkZGl4KSkge1xuICAgICAgICBmcm9tQXJyYXkoYnVmZmVyLCBvZmZzZXQsIHZhbHVlLCByYWRkaXgpO1xuICAgICAgfSBlbHNlIGlmIChcIm51bWJlclwiID09PSB0eXBlb2YgcmFkZGl4KSB7XG4gICAgICAgIHdyaXRlSW50MzIoYnVmZmVyLCBvZmZzZXQgKyBwb3NILCB2YWx1ZSk7IC8vIGhpZ2hcbiAgICAgICAgd3JpdGVJbnQzMihidWZmZXIsIG9mZnNldCArIHBvc0wsIHJhZGRpeCk7IC8vIGxvd1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZSA+IDApIHtcbiAgICAgICAgZnJvbVBvc2l0aXZlKGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSk7IC8vIHBvc2l0aXZlXG4gICAgICB9IGVsc2UgaWYgKHZhbHVlIDwgMCkge1xuICAgICAgICBmcm9tTmVnYXRpdmUoYnVmZmVyLCBvZmZzZXQsIHZhbHVlKTsgLy8gbmVnYXRpdmVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZyb21BcnJheShidWZmZXIsIG9mZnNldCwgWkVSTywgMCk7IC8vIHplcm8sIE5hTiBhbmQgb3RoZXJzXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZnJvbVN0cmluZyhidWZmZXIsIG9mZnNldCwgc3RyLCByYWRkaXgpIHtcbiAgICAgIHZhciBwb3MgPSAwO1xuICAgICAgdmFyIGxlbiA9IHN0ci5sZW5ndGg7XG4gICAgICB2YXIgaGlnaCA9IDA7XG4gICAgICB2YXIgbG93ID0gMDtcbiAgICAgIGlmIChzdHJbMF0gPT09IFwiLVwiKSBwb3MrKztcbiAgICAgIHZhciBzaWduID0gcG9zO1xuICAgICAgd2hpbGUgKHBvcyA8IGxlbikge1xuICAgICAgICB2YXIgY2hyID0gcGFyc2VJbnQoc3RyW3BvcysrXSwgcmFkZGl4KTtcbiAgICAgICAgaWYgKCEoY2hyID49IDApKSBicmVhazsgLy8gTmFOXG4gICAgICAgIGxvdyA9IGxvdyAqIHJhZGRpeCArIGNocjtcbiAgICAgICAgaGlnaCA9IGhpZ2ggKiByYWRkaXggKyBNYXRoLmZsb29yKGxvdyAvIEJJVDMyKTtcbiAgICAgICAgbG93ICU9IEJJVDMyO1xuICAgICAgfVxuICAgICAgaWYgKHNpZ24pIHtcbiAgICAgICAgaGlnaCA9IH5oaWdoO1xuICAgICAgICBpZiAobG93KSB7XG4gICAgICAgICAgbG93ID0gQklUMzIgLSBsb3c7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaGlnaCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB3cml0ZUludDMyKGJ1ZmZlciwgb2Zmc2V0ICsgcG9zSCwgaGlnaCk7XG4gICAgICB3cml0ZUludDMyKGJ1ZmZlciwgb2Zmc2V0ICsgcG9zTCwgbG93KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b051bWJlcigpIHtcbiAgICAgIHZhciBidWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICAgIHZhciBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICAgIHZhciBoaWdoID0gcmVhZEludDMyKGJ1ZmZlciwgb2Zmc2V0ICsgcG9zSCk7XG4gICAgICB2YXIgbG93ID0gcmVhZEludDMyKGJ1ZmZlciwgb2Zmc2V0ICsgcG9zTCk7XG4gICAgICBpZiAoIXVuc2lnbmVkKSBoaWdoIHw9IDA7IC8vIGEgdHJpY2sgdG8gZ2V0IHNpZ25lZFxuICAgICAgcmV0dXJuIGhpZ2ggPyAoaGlnaCAqIEJJVDMyICsgbG93KSA6IGxvdztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b1N0cmluZyhyYWRpeCkge1xuICAgICAgdmFyIGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgICAgdmFyIG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgICAgdmFyIGhpZ2ggPSByZWFkSW50MzIoYnVmZmVyLCBvZmZzZXQgKyBwb3NIKTtcbiAgICAgIHZhciBsb3cgPSByZWFkSW50MzIoYnVmZmVyLCBvZmZzZXQgKyBwb3NMKTtcbiAgICAgIHZhciBzdHIgPSBcIlwiO1xuICAgICAgdmFyIHNpZ24gPSAhdW5zaWduZWQgJiYgKGhpZ2ggJiAweDgwMDAwMDAwKTtcbiAgICAgIGlmIChzaWduKSB7XG4gICAgICAgIGhpZ2ggPSB+aGlnaDtcbiAgICAgICAgbG93ID0gQklUMzIgLSBsb3c7XG4gICAgICB9XG4gICAgICByYWRpeCA9IHJhZGl4IHx8IDEwO1xuICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgdmFyIG1vZCA9IChoaWdoICUgcmFkaXgpICogQklUMzIgKyBsb3c7XG4gICAgICAgIGhpZ2ggPSBNYXRoLmZsb29yKGhpZ2ggLyByYWRpeCk7XG4gICAgICAgIGxvdyA9IE1hdGguZmxvb3IobW9kIC8gcmFkaXgpO1xuICAgICAgICBzdHIgPSAobW9kICUgcmFkaXgpLnRvU3RyaW5nKHJhZGl4KSArIHN0cjtcbiAgICAgICAgaWYgKCFoaWdoICYmICFsb3cpIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKHNpZ24pIHtcbiAgICAgICAgc3RyID0gXCItXCIgKyBzdHI7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdyaXRlSW50MzIoYnVmZmVyLCBvZmZzZXQsIHZhbHVlKSB7XG4gICAgICBidWZmZXJbb2Zmc2V0ICsgcG9zM10gPSB2YWx1ZSAmIDI1NTtcbiAgICAgIHZhbHVlID0gdmFsdWUgPj4gODtcbiAgICAgIGJ1ZmZlcltvZmZzZXQgKyBwb3MyXSA9IHZhbHVlICYgMjU1O1xuICAgICAgdmFsdWUgPSB2YWx1ZSA+PiA4O1xuICAgICAgYnVmZmVyW29mZnNldCArIHBvczFdID0gdmFsdWUgJiAyNTU7XG4gICAgICB2YWx1ZSA9IHZhbHVlID4+IDg7XG4gICAgICBidWZmZXJbb2Zmc2V0ICsgcG9zMF0gPSB2YWx1ZSAmIDI1NTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWFkSW50MzIoYnVmZmVyLCBvZmZzZXQpIHtcbiAgICAgIHJldHVybiAoYnVmZmVyW29mZnNldCArIHBvczBdICogQklUMjQpICtcbiAgICAgICAgKGJ1ZmZlcltvZmZzZXQgKyBwb3MxXSA8PCAxNikgK1xuICAgICAgICAoYnVmZmVyW29mZnNldCArIHBvczJdIDw8IDgpICtcbiAgICAgICAgYnVmZmVyW29mZnNldCArIHBvczNdO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRvQXJyYXkocmF3KSB7XG4gICAgdmFyIGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgIHZhciBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICBzdG9yYWdlID0gbnVsbDsgLy8gQXJyYXlcbiAgICBpZiAocmF3ICE9PSBmYWxzZSAmJiBvZmZzZXQgPT09IDAgJiYgYnVmZmVyLmxlbmd0aCA9PT0gOCAmJiBpc0FycmF5KGJ1ZmZlcikpIHJldHVybiBidWZmZXI7XG4gICAgcmV0dXJuIG5ld0FycmF5KGJ1ZmZlciwgb2Zmc2V0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvQnVmZmVyKHJhdykge1xuICAgIHZhciBidWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICB2YXIgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgc3RvcmFnZSA9IEJVRkZFUjtcbiAgICBpZiAocmF3ICE9PSBmYWxzZSAmJiBvZmZzZXQgPT09IDAgJiYgYnVmZmVyLmxlbmd0aCA9PT0gOCAmJiBCdWZmZXIuaXNCdWZmZXIoYnVmZmVyKSkgcmV0dXJuIGJ1ZmZlcjtcbiAgICB2YXIgZGVzdCA9IG5ldyBCVUZGRVIoOCk7XG4gICAgZnJvbUFycmF5KGRlc3QsIDAsIGJ1ZmZlciwgb2Zmc2V0KTtcbiAgICByZXR1cm4gZGVzdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvQXJyYXlCdWZmZXIocmF3KSB7XG4gICAgdmFyIGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgIHZhciBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICB2YXIgYXJyYnVmID0gYnVmZmVyLmJ1ZmZlcjtcbiAgICBzdG9yYWdlID0gVUlOVDhBUlJBWTtcbiAgICBpZiAocmF3ICE9PSBmYWxzZSAmJiBvZmZzZXQgPT09IDAgJiYgKGFycmJ1ZiBpbnN0YW5jZW9mIEFSUkFZQlVGRkVSKSAmJiBhcnJidWYuYnl0ZUxlbmd0aCA9PT0gOCkgcmV0dXJuIGFycmJ1ZjtcbiAgICB2YXIgZGVzdCA9IG5ldyBVSU5UOEFSUkFZKDgpO1xuICAgIGZyb21BcnJheShkZXN0LCAwLCBidWZmZXIsIG9mZnNldCk7XG4gICAgcmV0dXJuIGRlc3QuYnVmZmVyO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNWYWxpZEJ1ZmZlcihidWZmZXIsIG9mZnNldCkge1xuICAgIHZhciBsZW4gPSBidWZmZXIgJiYgYnVmZmVyLmxlbmd0aDtcbiAgICBvZmZzZXQgfD0gMDtcbiAgICByZXR1cm4gbGVuICYmIChvZmZzZXQgKyA4IDw9IGxlbikgJiYgKFwic3RyaW5nXCIgIT09IHR5cGVvZiBidWZmZXJbb2Zmc2V0XSk7XG4gIH1cblxuICBmdW5jdGlvbiBmcm9tQXJyYXkoZGVzdGJ1ZiwgZGVzdG9mZiwgc3JjYnVmLCBzcmNvZmYpIHtcbiAgICBkZXN0b2ZmIHw9IDA7XG4gICAgc3Jjb2ZmIHw9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgIGRlc3RidWZbZGVzdG9mZisrXSA9IHNyY2J1ZltzcmNvZmYrK10gJiAyNTU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbmV3QXJyYXkoYnVmZmVyLCBvZmZzZXQpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYnVmZmVyLCBvZmZzZXQsIG9mZnNldCArIDgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZnJvbVBvc2l0aXZlQkUoYnVmZmVyLCBvZmZzZXQsIHZhbHVlKSB7XG4gICAgdmFyIHBvcyA9IG9mZnNldCArIDg7XG4gICAgd2hpbGUgKHBvcyA+IG9mZnNldCkge1xuICAgICAgYnVmZmVyWy0tcG9zXSA9IHZhbHVlICYgMjU1O1xuICAgICAgdmFsdWUgLz0gMjU2O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZyb21OZWdhdGl2ZUJFKGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSkge1xuICAgIHZhciBwb3MgPSBvZmZzZXQgKyA4O1xuICAgIHZhbHVlKys7XG4gICAgd2hpbGUgKHBvcyA+IG9mZnNldCkge1xuICAgICAgYnVmZmVyWy0tcG9zXSA9ICgoLXZhbHVlKSAmIDI1NSkgXiAyNTU7XG4gICAgICB2YWx1ZSAvPSAyNTY7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZnJvbVBvc2l0aXZlTEUoYnVmZmVyLCBvZmZzZXQsIHZhbHVlKSB7XG4gICAgdmFyIGVuZCA9IG9mZnNldCArIDg7XG4gICAgd2hpbGUgKG9mZnNldCA8IGVuZCkge1xuICAgICAgYnVmZmVyW29mZnNldCsrXSA9IHZhbHVlICYgMjU1O1xuICAgICAgdmFsdWUgLz0gMjU2O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZyb21OZWdhdGl2ZUxFKGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSkge1xuICAgIHZhciBlbmQgPSBvZmZzZXQgKyA4O1xuICAgIHZhbHVlKys7XG4gICAgd2hpbGUgKG9mZnNldCA8IGVuZCkge1xuICAgICAgYnVmZmVyW29mZnNldCsrXSA9ICgoLXZhbHVlKSAmIDI1NSkgXiAyNTU7XG4gICAgICB2YWx1ZSAvPSAyNTY7XG4gICAgfVxuICB9XG5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3JldHJvZm94L2lzLWFycmF5XG4gIGZ1bmN0aW9uIF9pc0FycmF5KHZhbCkge1xuICAgIHJldHVybiAhIXZhbCAmJiBcIltvYmplY3QgQXJyYXldXCIgPT0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCk7XG4gIH1cblxufSh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGV4cG9ydHMubm9kZU5hbWUgIT09ICdzdHJpbmcnID8gZXhwb3J0cyA6ICh0aGlzIHx8IHt9KSk7XG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhcnIpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoYXJyKSA9PSAnW29iamVjdCBBcnJheV0nO1xufTtcbiIsIi8vIGJyb3dzZXIuanNcblxuZXhwb3J0cy5lbmNvZGUgPSByZXF1aXJlKFwiLi9lbmNvZGVcIikuZW5jb2RlO1xuZXhwb3J0cy5kZWNvZGUgPSByZXF1aXJlKFwiLi9kZWNvZGVcIikuZGVjb2RlO1xuXG5leHBvcnRzLkVuY29kZXIgPSByZXF1aXJlKFwiLi9lbmNvZGVyXCIpLkVuY29kZXI7XG5leHBvcnRzLkRlY29kZXIgPSByZXF1aXJlKFwiLi9kZWNvZGVyXCIpLkRlY29kZXI7XG5cbmV4cG9ydHMuY3JlYXRlQ29kZWMgPSByZXF1aXJlKFwiLi9leHRcIikuY3JlYXRlQ29kZWM7XG5leHBvcnRzLmNvZGVjID0gcmVxdWlyZShcIi4vY29kZWNcIikuY29kZWM7XG4iLCIvKiBnbG9iYWxzIEJ1ZmZlciAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIGMoKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBCdWZmZXIpICYmIEJ1ZmZlcikgfHxcbiAgYyh0aGlzLkJ1ZmZlcikgfHxcbiAgYygoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIHdpbmRvdykgJiYgd2luZG93LkJ1ZmZlcikgfHxcbiAgdGhpcy5CdWZmZXI7XG5cbmZ1bmN0aW9uIGMoQikge1xuICByZXR1cm4gQiAmJiBCLmlzQnVmZmVyICYmIEI7XG59IiwiLy8gYnVmZmVyLWxpdGUuanNcblxudmFyIE1BWEJVRkxFTiA9IDgxOTI7XG5cbmV4cG9ydHMuY29weSA9IGNvcHk7XG5leHBvcnRzLnRvU3RyaW5nID0gdG9TdHJpbmc7XG5leHBvcnRzLndyaXRlID0gd3JpdGU7XG5cbi8qKlxuICogQnVmZmVyLnByb3RvdHlwZS53cml0ZSgpXG4gKlxuICogQHBhcmFtIHN0cmluZyB7U3RyaW5nfVxuICogQHBhcmFtIFtvZmZzZXRdIHtOdW1iZXJ9XG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICovXG5cbmZ1bmN0aW9uIHdyaXRlKHN0cmluZywgb2Zmc2V0KSB7XG4gIHZhciBidWZmZXIgPSB0aGlzO1xuICB2YXIgaW5kZXggPSBvZmZzZXQgfHwgKG9mZnNldCB8PSAwKTtcbiAgdmFyIGxlbmd0aCA9IHN0cmluZy5sZW5ndGg7XG4gIHZhciBjaHIgPSAwO1xuICB2YXIgaSA9IDA7XG4gIHdoaWxlIChpIDwgbGVuZ3RoKSB7XG4gICAgY2hyID0gc3RyaW5nLmNoYXJDb2RlQXQoaSsrKTtcblxuICAgIGlmIChjaHIgPCAxMjgpIHtcbiAgICAgIGJ1ZmZlcltpbmRleCsrXSA9IGNocjtcbiAgICB9IGVsc2UgaWYgKGNociA8IDB4ODAwKSB7XG4gICAgICAvLyAyIGJ5dGVzXG4gICAgICBidWZmZXJbaW5kZXgrK10gPSAweEMwIHwgKGNociA+Pj4gNik7XG4gICAgICBidWZmZXJbaW5kZXgrK10gPSAweDgwIHwgKGNociAmIDB4M0YpO1xuICAgIH0gZWxzZSBpZiAoY2hyIDwgMHhEODAwIHx8IGNociA+IDB4REZGRikge1xuICAgICAgLy8gMyBieXRlc1xuICAgICAgYnVmZmVyW2luZGV4KytdID0gMHhFMCB8IChjaHIgID4+PiAxMik7XG4gICAgICBidWZmZXJbaW5kZXgrK10gPSAweDgwIHwgKChjaHIgPj4+IDYpICAmIDB4M0YpO1xuICAgICAgYnVmZmVyW2luZGV4KytdID0gMHg4MCB8IChjaHIgICAgICAgICAgJiAweDNGKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gNCBieXRlcyAtIHN1cnJvZ2F0ZSBwYWlyXG4gICAgICBjaHIgPSAoKChjaHIgLSAweEQ4MDApIDw8IDEwKSB8IChzdHJpbmcuY2hhckNvZGVBdChpKyspIC0gMHhEQzAwKSkgKyAweDEwMDAwO1xuICAgICAgYnVmZmVyW2luZGV4KytdID0gMHhGMCB8IChjaHIgPj4+IDE4KTtcbiAgICAgIGJ1ZmZlcltpbmRleCsrXSA9IDB4ODAgfCAoKGNociA+Pj4gMTIpICYgMHgzRik7XG4gICAgICBidWZmZXJbaW5kZXgrK10gPSAweDgwIHwgKChjaHIgPj4+IDYpICAmIDB4M0YpO1xuICAgICAgYnVmZmVyW2luZGV4KytdID0gMHg4MCB8IChjaHIgICAgICAgICAgJiAweDNGKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGluZGV4IC0gb2Zmc2V0O1xufVxuXG4vKipcbiAqIEJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcoKVxuICpcbiAqIEBwYXJhbSBbZW5jb2RpbmddIHtTdHJpbmd9IGlnbm9yZWRcbiAqIEBwYXJhbSBbc3RhcnRdIHtOdW1iZXJ9XG4gKiBAcGFyYW0gW2VuZF0ge051bWJlcn1cbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cblxuZnVuY3Rpb24gdG9TdHJpbmcoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ1ZmZlciA9IHRoaXM7XG4gIHZhciBpbmRleCA9IHN0YXJ0fDA7XG4gIGlmICghZW5kKSBlbmQgPSBidWZmZXIubGVuZ3RoO1xuICB2YXIgc3RyaW5nID0gJyc7XG4gIHZhciBjaHIgPSAwO1xuXG4gIHdoaWxlIChpbmRleCA8IGVuZCkge1xuICAgIGNociA9IGJ1ZmZlcltpbmRleCsrXTtcbiAgICBpZiAoY2hyIDwgMTI4KSB7XG4gICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjaHIpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKChjaHIgJiAweEUwKSA9PT0gMHhDMCkge1xuICAgICAgLy8gMiBieXRlc1xuICAgICAgY2hyID0gKGNociAmIDB4MUYpIDw8IDYgfFxuICAgICAgICAgICAgKGJ1ZmZlcltpbmRleCsrXSAmIDB4M0YpO1xuXG4gICAgfSBlbHNlIGlmICgoY2hyICYgMHhGMCkgPT09IDB4RTApIHtcbiAgICAgIC8vIDMgYnl0ZXNcbiAgICAgIGNociA9IChjaHIgJiAweDBGKSAgICAgICAgICAgICA8PCAxMiB8XG4gICAgICAgICAgICAoYnVmZmVyW2luZGV4KytdICYgMHgzRikgPDwgNiAgfFxuICAgICAgICAgICAgKGJ1ZmZlcltpbmRleCsrXSAmIDB4M0YpO1xuXG4gICAgfSBlbHNlIGlmICgoY2hyICYgMHhGOCkgPT09IDB4RjApIHtcbiAgICAgIC8vIDQgYnl0ZXNcbiAgICAgIGNociA9IChjaHIgJiAweDA3KSAgICAgICAgICAgICA8PCAxOCB8XG4gICAgICAgICAgICAoYnVmZmVyW2luZGV4KytdICYgMHgzRikgPDwgMTIgfFxuICAgICAgICAgICAgKGJ1ZmZlcltpbmRleCsrXSAmIDB4M0YpIDw8IDYgIHxcbiAgICAgICAgICAgIChidWZmZXJbaW5kZXgrK10gJiAweDNGKTtcbiAgICB9XG5cbiAgICBpZiAoY2hyID49IDB4MDEwMDAwKSB7XG4gICAgICAvLyBBIHN1cnJvZ2F0ZSBwYWlyXG4gICAgICBjaHIgLT0gMHgwMTAwMDA7XG5cbiAgICAgIHN0cmluZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKChjaHIgPj4+IDEwKSArIDB4RDgwMCwgKGNociAmIDB4M0ZGKSArIDB4REMwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0cmluZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNocik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN0cmluZztcbn1cblxuLyoqXG4gKiBCdWZmZXIucHJvdG90eXBlLmNvcHkoKVxuICpcbiAqIEBwYXJhbSB0YXJnZXQge0J1ZmZlcn1cbiAqIEBwYXJhbSBbdGFyZ2V0U3RhcnRdIHtOdW1iZXJ9XG4gKiBAcGFyYW0gW3N0YXJ0XSB7TnVtYmVyfVxuICogQHBhcmFtIFtlbmRdIHtOdW1iZXJ9XG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5cbmZ1bmN0aW9uIGNvcHkodGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCkge1xuICB2YXIgaTtcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwO1xuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoO1xuICBpZiAoIXRhcmdldFN0YXJ0KSB0YXJnZXRTdGFydCA9IDA7XG4gIHZhciBsZW4gPSBlbmQgLSBzdGFydDtcblxuICBpZiAodGFyZ2V0ID09PSB0aGlzICYmIHN0YXJ0IDwgdGFyZ2V0U3RhcnQgJiYgdGFyZ2V0U3RhcnQgPCBlbmQpIHtcbiAgICAvLyBkZXNjZW5kaW5nXG4gICAgZm9yIChpID0gbGVuIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBhc2NlbmRpbmdcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBsZW47XG59XG4iLCIvLyBidWZmZXJpc2gtYXJyYXkuanNcblxudmFyIEJ1ZmZlcmlzaCA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaFwiKTtcblxudmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGFsbG9jKDApO1xuXG5leHBvcnRzLmFsbG9jID0gYWxsb2M7XG5leHBvcnRzLmNvbmNhdCA9IEJ1ZmZlcmlzaC5jb25jYXQ7XG5leHBvcnRzLmZyb20gPSBmcm9tO1xuXG4vKipcbiAqIEBwYXJhbSBzaXplIHtOdW1iZXJ9XG4gKiBAcmV0dXJucyB7QnVmZmVyfFVpbnQ4QXJyYXl8QXJyYXl9XG4gKi9cblxuZnVuY3Rpb24gYWxsb2Moc2l6ZSkge1xuICByZXR1cm4gbmV3IEFycmF5KHNpemUpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB2YWx1ZSB7QXJyYXl8QXJyYXlCdWZmZXJ8QnVmZmVyfFN0cmluZ31cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuXG5mdW5jdGlvbiBmcm9tKHZhbHVlKSB7XG4gIGlmICghQnVmZmVyaXNoLmlzQnVmZmVyKHZhbHVlKSAmJiBCdWZmZXJpc2guaXNWaWV3KHZhbHVlKSkge1xuICAgIC8vIFR5cGVkQXJyYXkgdG8gVWludDhBcnJheVxuICAgIHZhbHVlID0gQnVmZmVyaXNoLlVpbnQ4QXJyYXkuZnJvbSh2YWx1ZSk7XG4gIH0gZWxzZSBpZiAoQnVmZmVyaXNoLmlzQXJyYXlCdWZmZXIodmFsdWUpKSB7XG4gICAgLy8gQXJyYXlCdWZmZXIgdG8gVWludDhBcnJheVxuICAgIHZhbHVlID0gbmV3IFVpbnQ4QXJyYXkodmFsdWUpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIC8vIFN0cmluZyB0byBBcnJheVxuICAgIHJldHVybiBCdWZmZXJpc2guZnJvbS5jYWxsKGV4cG9ydHMsIHZhbHVlKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKTtcbiAgfVxuXG4gIC8vIEFycmF5LWxpa2UgdG8gQXJyYXlcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHZhbHVlKTtcbn1cbiIsIi8vIGJ1ZmZlcmlzaC1idWZmZXIuanNcblxudmFyIEJ1ZmZlcmlzaCA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaFwiKTtcbnZhciBCdWZmZXIgPSBCdWZmZXJpc2guZ2xvYmFsO1xuXG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gQnVmZmVyaXNoLmhhc0J1ZmZlciA/IGFsbG9jKDApIDogW107XG5cbmV4cG9ydHMuYWxsb2MgPSBCdWZmZXJpc2guaGFzQnVmZmVyICYmIEJ1ZmZlci5hbGxvYyB8fCBhbGxvYztcbmV4cG9ydHMuY29uY2F0ID0gQnVmZmVyaXNoLmNvbmNhdDtcbmV4cG9ydHMuZnJvbSA9IGZyb207XG5cbi8qKlxuICogQHBhcmFtIHNpemUge051bWJlcn1cbiAqIEByZXR1cm5zIHtCdWZmZXJ8VWludDhBcnJheXxBcnJheX1cbiAqL1xuXG5mdW5jdGlvbiBhbGxvYyhzaXplKSB7XG4gIHJldHVybiBuZXcgQnVmZmVyKHNpemUpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB2YWx1ZSB7QXJyYXl8QXJyYXlCdWZmZXJ8QnVmZmVyfFN0cmluZ31cbiAqIEByZXR1cm5zIHtCdWZmZXJ9XG4gKi9cblxuZnVuY3Rpb24gZnJvbSh2YWx1ZSkge1xuICBpZiAoIUJ1ZmZlcmlzaC5pc0J1ZmZlcih2YWx1ZSkgJiYgQnVmZmVyaXNoLmlzVmlldyh2YWx1ZSkpIHtcbiAgICAvLyBUeXBlZEFycmF5IHRvIFVpbnQ4QXJyYXlcbiAgICB2YWx1ZSA9IEJ1ZmZlcmlzaC5VaW50OEFycmF5LmZyb20odmFsdWUpO1xuICB9IGVsc2UgaWYgKEJ1ZmZlcmlzaC5pc0FycmF5QnVmZmVyKHZhbHVlKSkge1xuICAgIC8vIEFycmF5QnVmZmVyIHRvIFVpbnQ4QXJyYXlcbiAgICB2YWx1ZSA9IG5ldyBVaW50OEFycmF5KHZhbHVlKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAvLyBTdHJpbmcgdG8gQnVmZmVyXG4gICAgcmV0dXJuIEJ1ZmZlcmlzaC5mcm9tLmNhbGwoZXhwb3J0cywgdmFsdWUpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBhIG51bWJlcicpO1xuICB9XG5cbiAgLy8gQXJyYXktbGlrZSB0byBCdWZmZXJcbiAgaWYgKEJ1ZmZlci5mcm9tICYmIEJ1ZmZlci5mcm9tLmxlbmd0aCAhPT0gMSkge1xuICAgIHJldHVybiBCdWZmZXIuZnJvbSh2YWx1ZSk7IC8vIG5vZGUgdjYrXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBCdWZmZXIodmFsdWUpOyAvLyBub2RlIHY0XG4gIH1cbn1cbiIsIi8vIGJ1ZmZlcmlzaC1wcm90by5qc1xuXG4vKiBqc2hpbnQgZXFudWxsOnRydWUgKi9cblxudmFyIEJ1ZmZlckxpdGUgPSByZXF1aXJlKFwiLi9idWZmZXItbGl0ZVwiKTtcblxuZXhwb3J0cy5jb3B5ID0gY29weTtcbmV4cG9ydHMuc2xpY2UgPSBzbGljZTtcbmV4cG9ydHMudG9TdHJpbmcgPSB0b1N0cmluZztcbmV4cG9ydHMud3JpdGUgPSBnZW4oXCJ3cml0ZVwiKTtcblxudmFyIEJ1ZmZlcmlzaCA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaFwiKTtcbnZhciBCdWZmZXIgPSBCdWZmZXJpc2guZ2xvYmFsO1xuXG52YXIgaXNCdWZmZXJTaGltID0gQnVmZmVyaXNoLmhhc0J1ZmZlciAmJiAoXCJUWVBFRF9BUlJBWV9TVVBQT1JUXCIgaW4gQnVmZmVyKTtcbnZhciBicm9rZW5UeXBlZEFycmF5ID0gaXNCdWZmZXJTaGltICYmICFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVDtcblxuLyoqXG4gKiBAcGFyYW0gdGFyZ2V0IHtCdWZmZXJ8VWludDhBcnJheXxBcnJheX1cbiAqIEBwYXJhbSBbdGFyZ2V0U3RhcnRdIHtOdW1iZXJ9XG4gKiBAcGFyYW0gW3N0YXJ0XSB7TnVtYmVyfVxuICogQHBhcmFtIFtlbmRdIHtOdW1iZXJ9XG4gKiBAcmV0dXJucyB7QnVmZmVyfFVpbnQ4QXJyYXl8QXJyYXl9XG4gKi9cblxuZnVuY3Rpb24gY29weSh0YXJnZXQsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0aGlzSXNCdWZmZXIgPSBCdWZmZXJpc2guaXNCdWZmZXIodGhpcyk7XG4gIHZhciB0YXJnZXRJc0J1ZmZlciA9IEJ1ZmZlcmlzaC5pc0J1ZmZlcih0YXJnZXQpO1xuICBpZiAodGhpc0lzQnVmZmVyICYmIHRhcmdldElzQnVmZmVyKSB7XG4gICAgLy8gQnVmZmVyIHRvIEJ1ZmZlclxuICAgIHJldHVybiB0aGlzLmNvcHkodGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCk7XG4gIH0gZWxzZSBpZiAoIWJyb2tlblR5cGVkQXJyYXkgJiYgIXRoaXNJc0J1ZmZlciAmJiAhdGFyZ2V0SXNCdWZmZXIgJiZcbiAgICBCdWZmZXJpc2guaXNWaWV3KHRoaXMpICYmIEJ1ZmZlcmlzaC5pc1ZpZXcodGFyZ2V0KSkge1xuICAgIC8vIFVpbnQ4QXJyYXkgdG8gVWludDhBcnJheSAoZXhjZXB0IGZvciBtaW5vciBzb21lIGJyb3dzZXJzKVxuICAgIHZhciBidWZmZXIgPSAoc3RhcnQgfHwgZW5kICE9IG51bGwpID8gc2xpY2UuY2FsbCh0aGlzLCBzdGFydCwgZW5kKSA6IHRoaXM7XG4gICAgdGFyZ2V0LnNldChidWZmZXIsIHRhcmdldFN0YXJ0KTtcbiAgICByZXR1cm4gYnVmZmVyLmxlbmd0aDtcbiAgfSBlbHNlIHtcbiAgICAvLyBvdGhlciBjYXNlc1xuICAgIHJldHVybiBCdWZmZXJMaXRlLmNvcHkuY2FsbCh0aGlzLCB0YXJnZXQsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKTtcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSBbc3RhcnRdIHtOdW1iZXJ9XG4gKiBAcGFyYW0gW2VuZF0ge051bWJlcn1cbiAqIEByZXR1cm5zIHtCdWZmZXJ8VWludDhBcnJheXxBcnJheX1cbiAqL1xuXG5mdW5jdGlvbiBzbGljZShzdGFydCwgZW5kKSB7XG4gIC8vIGZvciBCdWZmZXIsIFVpbnQ4QXJyYXkgKGV4Y2VwdCBmb3IgbWlub3Igc29tZSBicm93c2VycykgYW5kIEFycmF5XG4gIHZhciBmID0gdGhpcy5zbGljZSB8fCAoIWJyb2tlblR5cGVkQXJyYXkgJiYgdGhpcy5zdWJhcnJheSk7XG4gIGlmIChmKSByZXR1cm4gZi5jYWxsKHRoaXMsIHN0YXJ0LCBlbmQpO1xuXG4gIC8vIFVpbnQ4QXJyYXkgKGZvciBtaW5vciBzb21lIGJyb3dzZXJzKVxuICB2YXIgdGFyZ2V0ID0gQnVmZmVyaXNoLmFsbG9jLmNhbGwodGhpcywgZW5kIC0gc3RhcnQpO1xuICBjb3B5LmNhbGwodGhpcywgdGFyZ2V0LCAwLCBzdGFydCwgZW5kKTtcbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuLyoqXG4gKiBCdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nKClcbiAqXG4gKiBAcGFyYW0gW2VuY29kaW5nXSB7U3RyaW5nfSBpZ25vcmVkXG4gKiBAcGFyYW0gW3N0YXJ0XSB7TnVtYmVyfVxuICogQHBhcmFtIFtlbmRdIHtOdW1iZXJ9XG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5cbmZ1bmN0aW9uIHRvU3RyaW5nKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBmID0gKCFpc0J1ZmZlclNoaW0gJiYgQnVmZmVyaXNoLmlzQnVmZmVyKHRoaXMpKSA/IHRoaXMudG9TdHJpbmcgOiBCdWZmZXJMaXRlLnRvU3RyaW5nO1xuICByZXR1cm4gZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZ2VuKG1ldGhvZCkge1xuICByZXR1cm4gd3JhcDtcblxuICBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBmID0gdGhpc1ttZXRob2RdIHx8IEJ1ZmZlckxpdGVbbWV0aG9kXTtcbiAgICByZXR1cm4gZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG59XG4iLCIvLyBidWZmZXJpc2gtdWludDhhcnJheS5qc1xuXG52YXIgQnVmZmVyaXNoID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoXCIpO1xuXG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gQnVmZmVyaXNoLmhhc0FycmF5QnVmZmVyID8gYWxsb2MoMCkgOiBbXTtcblxuZXhwb3J0cy5hbGxvYyA9IGFsbG9jO1xuZXhwb3J0cy5jb25jYXQgPSBCdWZmZXJpc2guY29uY2F0O1xuZXhwb3J0cy5mcm9tID0gZnJvbTtcblxuLyoqXG4gKiBAcGFyYW0gc2l6ZSB7TnVtYmVyfVxuICogQHJldHVybnMge0J1ZmZlcnxVaW50OEFycmF5fEFycmF5fVxuICovXG5cbmZ1bmN0aW9uIGFsbG9jKHNpemUpIHtcbiAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHNpemUpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB2YWx1ZSB7QXJyYXl8QXJyYXlCdWZmZXJ8QnVmZmVyfFN0cmluZ31cbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fVxuICovXG5cbmZ1bmN0aW9uIGZyb20odmFsdWUpIHtcbiAgaWYgKEJ1ZmZlcmlzaC5pc1ZpZXcodmFsdWUpKSB7XG4gICAgLy8gVHlwZWRBcnJheSB0byBBcnJheUJ1ZmZlclxuICAgIHZhciBieXRlT2Zmc2V0ID0gdmFsdWUuYnl0ZU9mZnNldDtcbiAgICB2YXIgYnl0ZUxlbmd0aCA9IHZhbHVlLmJ5dGVMZW5ndGg7XG4gICAgdmFsdWUgPSB2YWx1ZS5idWZmZXI7XG4gICAgaWYgKHZhbHVlLmJ5dGVMZW5ndGggIT09IGJ5dGVMZW5ndGgpIHtcbiAgICAgIGlmICh2YWx1ZS5zbGljZSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnNsaWNlKGJ5dGVPZmZzZXQsIGJ5dGVPZmZzZXQgKyBieXRlTGVuZ3RoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEFuZHJvaWQgNC4xIGRvZXMgbm90IGhhdmUgQXJyYXlCdWZmZXIucHJvdG90eXBlLnNsaWNlXG4gICAgICAgIHZhbHVlID0gbmV3IFVpbnQ4QXJyYXkodmFsdWUpO1xuICAgICAgICBpZiAodmFsdWUuYnl0ZUxlbmd0aCAhPT0gYnl0ZUxlbmd0aCkge1xuICAgICAgICAgIC8vIFR5cGVkQXJyYXkgdG8gQXJyYXlCdWZmZXIgdG8gVWludDhBcnJheSB0byBBcnJheVxuICAgICAgICAgIHZhbHVlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodmFsdWUsIGJ5dGVPZmZzZXQsIGJ5dGVPZmZzZXQgKyBieXRlTGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAvLyBTdHJpbmcgdG8gVWludDhBcnJheVxuICAgIHJldHVybiBCdWZmZXJpc2guZnJvbS5jYWxsKGV4cG9ydHMsIHZhbHVlKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgVWludDhBcnJheSh2YWx1ZSk7XG59XG4iLCIvLyBidWZmZXJpc2guanNcblxudmFyIEJ1ZmZlciA9IGV4cG9ydHMuZ2xvYmFsID0gcmVxdWlyZShcIi4vYnVmZmVyLWdsb2JhbFwiKTtcbnZhciBoYXNCdWZmZXIgPSBleHBvcnRzLmhhc0J1ZmZlciA9IEJ1ZmZlciAmJiAhIUJ1ZmZlci5pc0J1ZmZlcjtcbnZhciBoYXNBcnJheUJ1ZmZlciA9IGV4cG9ydHMuaGFzQXJyYXlCdWZmZXIgPSAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIEFycmF5QnVmZmVyKTtcblxudmFyIGlzQXJyYXkgPSBleHBvcnRzLmlzQXJyYXkgPSByZXF1aXJlKFwiaXNhcnJheVwiKTtcbmV4cG9ydHMuaXNBcnJheUJ1ZmZlciA9IGhhc0FycmF5QnVmZmVyID8gaXNBcnJheUJ1ZmZlciA6IF9mYWxzZTtcbnZhciBpc0J1ZmZlciA9IGV4cG9ydHMuaXNCdWZmZXIgPSBoYXNCdWZmZXIgPyBCdWZmZXIuaXNCdWZmZXIgOiBfZmFsc2U7XG52YXIgaXNWaWV3ID0gZXhwb3J0cy5pc1ZpZXcgPSBoYXNBcnJheUJ1ZmZlciA/IChBcnJheUJ1ZmZlci5pc1ZpZXcgfHwgX2lzKFwiQXJyYXlCdWZmZXJcIiwgXCJidWZmZXJcIikpIDogX2ZhbHNlO1xuXG5leHBvcnRzLmFsbG9jID0gYWxsb2M7XG5leHBvcnRzLmNvbmNhdCA9IGNvbmNhdDtcbmV4cG9ydHMuZnJvbSA9IGZyb207XG5cbnZhciBCdWZmZXJBcnJheSA9IGV4cG9ydHMuQXJyYXkgPSByZXF1aXJlKFwiLi9idWZmZXJpc2gtYXJyYXlcIik7XG52YXIgQnVmZmVyQnVmZmVyID0gZXhwb3J0cy5CdWZmZXIgPSByZXF1aXJlKFwiLi9idWZmZXJpc2gtYnVmZmVyXCIpO1xudmFyIEJ1ZmZlclVpbnQ4QXJyYXkgPSBleHBvcnRzLlVpbnQ4QXJyYXkgPSByZXF1aXJlKFwiLi9idWZmZXJpc2gtdWludDhhcnJheVwiKTtcbnZhciBCdWZmZXJQcm90byA9IGV4cG9ydHMucHJvdG90eXBlID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoLXByb3RvXCIpO1xuXG4vKipcbiAqIEBwYXJhbSB2YWx1ZSB7QXJyYXl8QXJyYXlCdWZmZXJ8QnVmZmVyfFN0cmluZ31cbiAqIEByZXR1cm5zIHtCdWZmZXJ8VWludDhBcnJheXxBcnJheX1cbiAqL1xuXG5mdW5jdGlvbiBmcm9tKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gZnJvbVN0cmluZy5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYXV0byh0aGlzKS5mcm9tKHZhbHVlKTtcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSBzaXplIHtOdW1iZXJ9XG4gKiBAcmV0dXJucyB7QnVmZmVyfFVpbnQ4QXJyYXl8QXJyYXl9XG4gKi9cblxuZnVuY3Rpb24gYWxsb2Moc2l6ZSkge1xuICByZXR1cm4gYXV0byh0aGlzKS5hbGxvYyhzaXplKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0gbGlzdCB7QXJyYXl9IGFycmF5IG9mIChCdWZmZXJ8VWludDhBcnJheXxBcnJheSlzXG4gKiBAcGFyYW0gW2xlbmd0aF1cbiAqIEByZXR1cm5zIHtCdWZmZXJ8VWludDhBcnJheXxBcnJheX1cbiAqL1xuXG5mdW5jdGlvbiBjb25jYXQobGlzdCwgbGVuZ3RoKSB7XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gMDtcbiAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGxpc3QsIGRyeXJ1bik7XG4gIH1cbiAgdmFyIHJlZiA9ICh0aGlzICE9PSBleHBvcnRzKSAmJiB0aGlzIHx8IGxpc3RbMF07XG4gIHZhciByZXN1bHQgPSBhbGxvYy5jYWxsKHJlZiwgbGVuZ3RoKTtcbiAgdmFyIG9mZnNldCA9IDA7XG4gIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwobGlzdCwgYXBwZW5kKTtcbiAgcmV0dXJuIHJlc3VsdDtcblxuICBmdW5jdGlvbiBkcnlydW4oYnVmZmVyKSB7XG4gICAgbGVuZ3RoICs9IGJ1ZmZlci5sZW5ndGg7XG4gIH1cblxuICBmdW5jdGlvbiBhcHBlbmQoYnVmZmVyKSB7XG4gICAgb2Zmc2V0ICs9IEJ1ZmZlclByb3RvLmNvcHkuY2FsbChidWZmZXIsIHJlc3VsdCwgb2Zmc2V0KTtcbiAgfVxufVxuXG52YXIgX2lzQXJyYXlCdWZmZXIgPSBfaXMoXCJBcnJheUJ1ZmZlclwiKTtcblxuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHx8IF9pc0FycmF5QnVmZmVyKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZyb21TdHJpbmcodmFsdWUpIHtcbiAgdmFyIGV4cGVjdGVkID0gdmFsdWUubGVuZ3RoICogMztcbiAgdmFyIHRoYXQgPSBhbGxvYy5jYWxsKHRoaXMsIGV4cGVjdGVkKTtcbiAgdmFyIGFjdHVhbCA9IEJ1ZmZlclByb3RvLndyaXRlLmNhbGwodGhhdCwgdmFsdWUpO1xuICBpZiAoZXhwZWN0ZWQgIT09IGFjdHVhbCkge1xuICAgIHRoYXQgPSBCdWZmZXJQcm90by5zbGljZS5jYWxsKHRoYXQsIDAsIGFjdHVhbCk7XG4gIH1cbiAgcmV0dXJuIHRoYXQ7XG59XG5cbmZ1bmN0aW9uIGF1dG8odGhhdCkge1xuICByZXR1cm4gaXNCdWZmZXIodGhhdCkgPyBCdWZmZXJCdWZmZXJcbiAgICA6IGlzVmlldyh0aGF0KSA/IEJ1ZmZlclVpbnQ4QXJyYXlcbiAgICA6IGlzQXJyYXkodGhhdCkgPyBCdWZmZXJBcnJheVxuICAgIDogaGFzQnVmZmVyID8gQnVmZmVyQnVmZmVyXG4gICAgOiBoYXNBcnJheUJ1ZmZlciA/IEJ1ZmZlclVpbnQ4QXJyYXlcbiAgICA6IEJ1ZmZlckFycmF5O1xufVxuXG5mdW5jdGlvbiBfZmFsc2UoKSB7XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gX2lzKG5hbWUsIGtleSkge1xuICAvKiBqc2hpbnQgZXFudWxsOnRydWUgKi9cbiAgbmFtZSA9IFwiW29iamVjdCBcIiArIG5hbWUgKyBcIl1cIjtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuICh2YWx1ZSAhPSBudWxsKSAmJiB7fS50b1N0cmluZy5jYWxsKGtleSA/IHZhbHVlW2tleV0gOiB2YWx1ZSkgPT09IG5hbWU7XG4gIH07XG59IiwiLy8gY29kZWMtYmFzZS5qc1xuXG52YXIgSVNfQVJSQVkgPSByZXF1aXJlKFwiaXNhcnJheVwiKTtcblxuZXhwb3J0cy5jcmVhdGVDb2RlYyA9IGNyZWF0ZUNvZGVjO1xuZXhwb3J0cy5pbnN0YWxsID0gaW5zdGFsbDtcbmV4cG9ydHMuZmlsdGVyID0gZmlsdGVyO1xuXG52YXIgQnVmZmVyaXNoID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoXCIpO1xuXG5mdW5jdGlvbiBDb2RlYyhvcHRpb25zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBDb2RlYykpIHJldHVybiBuZXcgQ29kZWMob3B0aW9ucyk7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIHRoaXMuaW5pdCgpO1xufVxuXG5Db2RlYy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnVpbnQ4YXJyYXkpIHtcbiAgICB0aGlzLmJ1ZmZlcmlzaCA9IEJ1ZmZlcmlzaC5VaW50OEFycmF5O1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBpbnN0YWxsKHByb3BzKSB7XG4gIGZvciAodmFyIGtleSBpbiBwcm9wcykge1xuICAgIENvZGVjLnByb3RvdHlwZVtrZXldID0gYWRkKENvZGVjLnByb3RvdHlwZVtrZXldLCBwcm9wc1trZXldKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhZGQoYSwgYikge1xuICByZXR1cm4gKGEgJiYgYikgPyBhYiA6IChhIHx8IGIpO1xuXG4gIGZ1bmN0aW9uIGFiKCkge1xuICAgIGEuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gYi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGpvaW4oZmlsdGVycykge1xuICBmaWx0ZXJzID0gZmlsdGVycy5zbGljZSgpO1xuXG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBmaWx0ZXJzLnJlZHVjZShpdGVyYXRvciwgdmFsdWUpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGl0ZXJhdG9yKHZhbHVlLCBmaWx0ZXIpIHtcbiAgICByZXR1cm4gZmlsdGVyKHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmaWx0ZXIoZmlsdGVyKSB7XG4gIHJldHVybiBJU19BUlJBWShmaWx0ZXIpID8gam9pbihmaWx0ZXIpIDogZmlsdGVyO1xufVxuXG4vLyBAcHVibGljXG4vLyBtc2dwYWNrLmNyZWF0ZUNvZGVjKClcblxuZnVuY3Rpb24gY3JlYXRlQ29kZWMob3B0aW9ucykge1xuICByZXR1cm4gbmV3IENvZGVjKG9wdGlvbnMpO1xufVxuXG4vLyBkZWZhdWx0IHNoYXJlZCBjb2RlY1xuXG5leHBvcnRzLnByZXNldCA9IGNyZWF0ZUNvZGVjKHtwcmVzZXQ6IHRydWV9KTtcbiIsIi8vIGNvZGVjLmpzXG5cbi8vIGxvYWQgYm90aCBpbnRlcmZhY2VzXG5yZXF1aXJlKFwiLi9yZWFkLWNvcmVcIik7XG5yZXF1aXJlKFwiLi93cml0ZS1jb3JlXCIpO1xuXG4vLyBAcHVibGljXG4vLyBtc2dwYWNrLmNvZGVjLnByZXNldFxuXG5leHBvcnRzLmNvZGVjID0ge1xuICBwcmVzZXQ6IHJlcXVpcmUoXCIuL2NvZGVjLWJhc2VcIikucHJlc2V0XG59O1xuIiwiLy8gZGVjb2RlLWJ1ZmZlci5qc1xuXG5leHBvcnRzLkRlY29kZUJ1ZmZlciA9IERlY29kZUJ1ZmZlcjtcblxudmFyIHByZXNldCA9IHJlcXVpcmUoXCIuL3JlYWQtY29yZVwiKS5wcmVzZXQ7XG5cbnZhciBGbGV4RGVjb2RlciA9IHJlcXVpcmUoXCIuL2ZsZXgtYnVmZmVyXCIpLkZsZXhEZWNvZGVyO1xuXG5GbGV4RGVjb2Rlci5taXhpbihEZWNvZGVCdWZmZXIucHJvdG90eXBlKTtcblxuZnVuY3Rpb24gRGVjb2RlQnVmZmVyKG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIERlY29kZUJ1ZmZlcikpIHJldHVybiBuZXcgRGVjb2RlQnVmZmVyKG9wdGlvbnMpO1xuXG4gIGlmIChvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICBpZiAob3B0aW9ucy5jb2RlYykge1xuICAgICAgdmFyIGNvZGVjID0gdGhpcy5jb2RlYyA9IG9wdGlvbnMuY29kZWM7XG4gICAgICBpZiAoY29kZWMuYnVmZmVyaXNoKSB0aGlzLmJ1ZmZlcmlzaCA9IGNvZGVjLmJ1ZmZlcmlzaDtcbiAgICB9XG4gIH1cbn1cblxuRGVjb2RlQnVmZmVyLnByb3RvdHlwZS5jb2RlYyA9IHByZXNldDtcblxuRGVjb2RlQnVmZmVyLnByb3RvdHlwZS5mZXRjaCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jb2RlYy5kZWNvZGUodGhpcyk7XG59O1xuIiwiLy8gZGVjb2RlLmpzXG5cbmV4cG9ydHMuZGVjb2RlID0gZGVjb2RlO1xuXG52YXIgRGVjb2RlQnVmZmVyID0gcmVxdWlyZShcIi4vZGVjb2RlLWJ1ZmZlclwiKS5EZWNvZGVCdWZmZXI7XG5cbmZ1bmN0aW9uIGRlY29kZShpbnB1dCwgb3B0aW9ucykge1xuICB2YXIgZGVjb2RlciA9IG5ldyBEZWNvZGVCdWZmZXIob3B0aW9ucyk7XG4gIGRlY29kZXIud3JpdGUoaW5wdXQpO1xuICByZXR1cm4gZGVjb2Rlci5yZWFkKCk7XG59IiwiLy8gZGVjb2Rlci5qc1xuXG5leHBvcnRzLkRlY29kZXIgPSBEZWNvZGVyO1xuXG52YXIgRXZlbnRMaXRlID0gcmVxdWlyZShcImV2ZW50LWxpdGVcIik7XG52YXIgRGVjb2RlQnVmZmVyID0gcmVxdWlyZShcIi4vZGVjb2RlLWJ1ZmZlclwiKS5EZWNvZGVCdWZmZXI7XG5cbmZ1bmN0aW9uIERlY29kZXIob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRGVjb2RlcikpIHJldHVybiBuZXcgRGVjb2RlcihvcHRpb25zKTtcbiAgRGVjb2RlQnVmZmVyLmNhbGwodGhpcywgb3B0aW9ucyk7XG59XG5cbkRlY29kZXIucHJvdG90eXBlID0gbmV3IERlY29kZUJ1ZmZlcigpO1xuXG5FdmVudExpdGUubWl4aW4oRGVjb2Rlci5wcm90b3R5cGUpO1xuXG5EZWNvZGVyLnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbihjaHVuaykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCkgdGhpcy53cml0ZShjaHVuayk7XG4gIHRoaXMuZmx1c2goKTtcbn07XG5cbkRlY29kZXIucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbihjaHVuaykge1xuICB0aGlzLmVtaXQoXCJkYXRhXCIsIGNodW5rKTtcbn07XG5cbkRlY29kZXIucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKGNodW5rKSB7XG4gIHRoaXMuZGVjb2RlKGNodW5rKTtcbiAgdGhpcy5lbWl0KFwiZW5kXCIpO1xufTtcbiIsIi8vIGVuY29kZS1idWZmZXIuanNcblxuZXhwb3J0cy5FbmNvZGVCdWZmZXIgPSBFbmNvZGVCdWZmZXI7XG5cbnZhciBwcmVzZXQgPSByZXF1aXJlKFwiLi93cml0ZS1jb3JlXCIpLnByZXNldDtcblxudmFyIEZsZXhFbmNvZGVyID0gcmVxdWlyZShcIi4vZmxleC1idWZmZXJcIikuRmxleEVuY29kZXI7XG5cbkZsZXhFbmNvZGVyLm1peGluKEVuY29kZUJ1ZmZlci5wcm90b3R5cGUpO1xuXG5mdW5jdGlvbiBFbmNvZGVCdWZmZXIob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRW5jb2RlQnVmZmVyKSkgcmV0dXJuIG5ldyBFbmNvZGVCdWZmZXIob3B0aW9ucyk7XG5cbiAgaWYgKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIGlmIChvcHRpb25zLmNvZGVjKSB7XG4gICAgICB2YXIgY29kZWMgPSB0aGlzLmNvZGVjID0gb3B0aW9ucy5jb2RlYztcbiAgICAgIGlmIChjb2RlYy5idWZmZXJpc2gpIHRoaXMuYnVmZmVyaXNoID0gY29kZWMuYnVmZmVyaXNoO1xuICAgIH1cbiAgfVxufVxuXG5FbmNvZGVCdWZmZXIucHJvdG90eXBlLmNvZGVjID0gcHJlc2V0O1xuXG5FbmNvZGVCdWZmZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24oaW5wdXQpIHtcbiAgdGhpcy5jb2RlYy5lbmNvZGUodGhpcywgaW5wdXQpO1xufTtcbiIsIi8vIGVuY29kZS5qc1xuXG5leHBvcnRzLmVuY29kZSA9IGVuY29kZTtcblxudmFyIEVuY29kZUJ1ZmZlciA9IHJlcXVpcmUoXCIuL2VuY29kZS1idWZmZXJcIikuRW5jb2RlQnVmZmVyO1xuXG5mdW5jdGlvbiBlbmNvZGUoaW5wdXQsIG9wdGlvbnMpIHtcbiAgdmFyIGVuY29kZXIgPSBuZXcgRW5jb2RlQnVmZmVyKG9wdGlvbnMpO1xuICBlbmNvZGVyLndyaXRlKGlucHV0KTtcbiAgcmV0dXJuIGVuY29kZXIucmVhZCgpO1xufVxuIiwiLy8gZW5jb2Rlci5qc1xuXG5leHBvcnRzLkVuY29kZXIgPSBFbmNvZGVyO1xuXG52YXIgRXZlbnRMaXRlID0gcmVxdWlyZShcImV2ZW50LWxpdGVcIik7XG52YXIgRW5jb2RlQnVmZmVyID0gcmVxdWlyZShcIi4vZW5jb2RlLWJ1ZmZlclwiKS5FbmNvZGVCdWZmZXI7XG5cbmZ1bmN0aW9uIEVuY29kZXIob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRW5jb2RlcikpIHJldHVybiBuZXcgRW5jb2RlcihvcHRpb25zKTtcbiAgRW5jb2RlQnVmZmVyLmNhbGwodGhpcywgb3B0aW9ucyk7XG59XG5cbkVuY29kZXIucHJvdG90eXBlID0gbmV3IEVuY29kZUJ1ZmZlcigpO1xuXG5FdmVudExpdGUubWl4aW4oRW5jb2Rlci5wcm90b3R5cGUpO1xuXG5FbmNvZGVyLnByb3RvdHlwZS5lbmNvZGUgPSBmdW5jdGlvbihjaHVuaykge1xuICB0aGlzLndyaXRlKGNodW5rKTtcbiAgdGhpcy5lbWl0KFwiZGF0YVwiLCB0aGlzLnJlYWQoKSk7XG59O1xuXG5FbmNvZGVyLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbihjaHVuaykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCkgdGhpcy5lbmNvZGUoY2h1bmspO1xuICB0aGlzLmZsdXNoKCk7XG4gIHRoaXMuZW1pdChcImVuZFwiKTtcbn07XG4iLCIvLyBleHQtYnVmZmVyLmpzXG5cbmV4cG9ydHMuRXh0QnVmZmVyID0gRXh0QnVmZmVyO1xuXG52YXIgQnVmZmVyaXNoID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoXCIpO1xuXG5mdW5jdGlvbiBFeHRCdWZmZXIoYnVmZmVyLCB0eXBlKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBFeHRCdWZmZXIpKSByZXR1cm4gbmV3IEV4dEJ1ZmZlcihidWZmZXIsIHR5cGUpO1xuICB0aGlzLmJ1ZmZlciA9IEJ1ZmZlcmlzaC5mcm9tKGJ1ZmZlcik7XG4gIHRoaXMudHlwZSA9IHR5cGU7XG59XG4iLCIvLyBleHQtcGFja2VyLmpzXG5cbmV4cG9ydHMuc2V0RXh0UGFja2VycyA9IHNldEV4dFBhY2tlcnM7XG5cbnZhciBCdWZmZXJpc2ggPSByZXF1aXJlKFwiLi9idWZmZXJpc2hcIik7XG52YXIgQnVmZmVyID0gQnVmZmVyaXNoLmdsb2JhbDtcbnZhciBwYWNrVHlwZWRBcnJheSA9IEJ1ZmZlcmlzaC5VaW50OEFycmF5LmZyb207XG52YXIgX2VuY29kZTtcblxudmFyIEVSUk9SX0NPTFVNTlMgPSB7bmFtZTogMSwgbWVzc2FnZTogMSwgc3RhY2s6IDEsIGNvbHVtbk51bWJlcjogMSwgZmlsZU5hbWU6IDEsIGxpbmVOdW1iZXI6IDF9O1xuXG5mdW5jdGlvbiBzZXRFeHRQYWNrZXJzKGNvZGVjKSB7XG4gIGNvZGVjLmFkZEV4dFBhY2tlcigweDBFLCBFcnJvciwgW3BhY2tFcnJvciwgZW5jb2RlXSk7XG4gIGNvZGVjLmFkZEV4dFBhY2tlcigweDAxLCBFdmFsRXJyb3IsIFtwYWNrRXJyb3IsIGVuY29kZV0pO1xuICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgwMiwgUmFuZ2VFcnJvciwgW3BhY2tFcnJvciwgZW5jb2RlXSk7XG4gIGNvZGVjLmFkZEV4dFBhY2tlcigweDAzLCBSZWZlcmVuY2VFcnJvciwgW3BhY2tFcnJvciwgZW5jb2RlXSk7XG4gIGNvZGVjLmFkZEV4dFBhY2tlcigweDA0LCBTeW50YXhFcnJvciwgW3BhY2tFcnJvciwgZW5jb2RlXSk7XG4gIGNvZGVjLmFkZEV4dFBhY2tlcigweDA1LCBUeXBlRXJyb3IsIFtwYWNrRXJyb3IsIGVuY29kZV0pO1xuICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgwNiwgVVJJRXJyb3IsIFtwYWNrRXJyb3IsIGVuY29kZV0pO1xuXG4gIGNvZGVjLmFkZEV4dFBhY2tlcigweDBBLCBSZWdFeHAsIFtwYWNrUmVnRXhwLCBlbmNvZGVdKTtcbiAgY29kZWMuYWRkRXh0UGFja2VyKDB4MEIsIEJvb2xlYW4sIFtwYWNrVmFsdWVPZiwgZW5jb2RlXSk7XG4gIGNvZGVjLmFkZEV4dFBhY2tlcigweDBDLCBTdHJpbmcsIFtwYWNrVmFsdWVPZiwgZW5jb2RlXSk7XG4gIGNvZGVjLmFkZEV4dFBhY2tlcigweDBELCBEYXRlLCBbTnVtYmVyLCBlbmNvZGVdKTtcbiAgY29kZWMuYWRkRXh0UGFja2VyKDB4MEYsIE51bWJlciwgW3BhY2tWYWx1ZU9mLCBlbmNvZGVdKTtcblxuICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgxMSwgSW50OEFycmF5LCBwYWNrVHlwZWRBcnJheSk7XG4gICAgY29kZWMuYWRkRXh0UGFja2VyKDB4MTIsIFVpbnQ4QXJyYXksIHBhY2tUeXBlZEFycmF5KTtcbiAgICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgxMywgSW50MTZBcnJheSwgcGFja1R5cGVkQXJyYXkpO1xuICAgIGNvZGVjLmFkZEV4dFBhY2tlcigweDE0LCBVaW50MTZBcnJheSwgcGFja1R5cGVkQXJyYXkpO1xuICAgIGNvZGVjLmFkZEV4dFBhY2tlcigweDE1LCBJbnQzMkFycmF5LCBwYWNrVHlwZWRBcnJheSk7XG4gICAgY29kZWMuYWRkRXh0UGFja2VyKDB4MTYsIFVpbnQzMkFycmF5LCBwYWNrVHlwZWRBcnJheSk7XG4gICAgY29kZWMuYWRkRXh0UGFja2VyKDB4MTcsIEZsb2F0MzJBcnJheSwgcGFja1R5cGVkQXJyYXkpO1xuXG4gICAgLy8gUGhhbnRvbUpTLzEuOS43IGRvZXNuJ3QgaGF2ZSBGbG9hdDY0QXJyYXlcbiAgICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIEZsb2F0NjRBcnJheSkge1xuICAgICAgY29kZWMuYWRkRXh0UGFja2VyKDB4MTgsIEZsb2F0NjRBcnJheSwgcGFja1R5cGVkQXJyYXkpO1xuICAgIH1cblxuICAgIC8vIElFMTAgZG9lc24ndCBoYXZlIFVpbnQ4Q2xhbXBlZEFycmF5XG4gICAgaWYgKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBVaW50OENsYW1wZWRBcnJheSkge1xuICAgICAgY29kZWMuYWRkRXh0UGFja2VyKDB4MTksIFVpbnQ4Q2xhbXBlZEFycmF5LCBwYWNrVHlwZWRBcnJheSk7XG4gICAgfVxuXG4gICAgY29kZWMuYWRkRXh0UGFja2VyKDB4MUEsIEFycmF5QnVmZmVyLCBwYWNrVHlwZWRBcnJheSk7XG4gICAgY29kZWMuYWRkRXh0UGFja2VyKDB4MUQsIERhdGFWaWV3LCBwYWNrVHlwZWRBcnJheSk7XG4gIH1cblxuICBpZiAoQnVmZmVyaXNoLmhhc0J1ZmZlcikge1xuICAgIGNvZGVjLmFkZEV4dFBhY2tlcigweDFCLCBCdWZmZXIsIEJ1ZmZlcmlzaC5mcm9tKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlbmNvZGUoaW5wdXQpIHtcbiAgaWYgKCFfZW5jb2RlKSBfZW5jb2RlID0gcmVxdWlyZShcIi4vZW5jb2RlXCIpLmVuY29kZTsgLy8gbGF6eSBsb2FkXG4gIHJldHVybiBfZW5jb2RlKGlucHV0KTtcbn1cblxuZnVuY3Rpb24gcGFja1ZhbHVlT2YodmFsdWUpIHtcbiAgcmV0dXJuICh2YWx1ZSkudmFsdWVPZigpO1xufVxuXG5mdW5jdGlvbiBwYWNrUmVnRXhwKHZhbHVlKSB7XG4gIHZhbHVlID0gUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKS5zcGxpdChcIi9cIik7XG4gIHZhbHVlLnNoaWZ0KCk7XG4gIHZhciBvdXQgPSBbdmFsdWUucG9wKCldO1xuICBvdXQudW5zaGlmdCh2YWx1ZS5qb2luKFwiL1wiKSk7XG4gIHJldHVybiBvdXQ7XG59XG5cbmZ1bmN0aW9uIHBhY2tFcnJvcih2YWx1ZSkge1xuICB2YXIgb3V0ID0ge307XG4gIGZvciAodmFyIGtleSBpbiBFUlJPUl9DT0xVTU5TKSB7XG4gICAgb3V0W2tleV0gPSB2YWx1ZVtrZXldO1xuICB9XG4gIHJldHVybiBvdXQ7XG59XG4iLCIvLyBleHQtdW5wYWNrZXIuanNcblxuZXhwb3J0cy5zZXRFeHRVbnBhY2tlcnMgPSBzZXRFeHRVbnBhY2tlcnM7XG5cbnZhciBCdWZmZXJpc2ggPSByZXF1aXJlKFwiLi9idWZmZXJpc2hcIik7XG52YXIgQnVmZmVyID0gQnVmZmVyaXNoLmdsb2JhbDtcbnZhciBfZGVjb2RlO1xuXG52YXIgRVJST1JfQ09MVU1OUyA9IHtuYW1lOiAxLCBtZXNzYWdlOiAxLCBzdGFjazogMSwgY29sdW1uTnVtYmVyOiAxLCBmaWxlTmFtZTogMSwgbGluZU51bWJlcjogMX07XG5cbmZ1bmN0aW9uIHNldEV4dFVucGFja2Vycyhjb2RlYykge1xuICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDBFLCBbZGVjb2RlLCB1bnBhY2tFcnJvcihFcnJvcildKTtcbiAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgwMSwgW2RlY29kZSwgdW5wYWNrRXJyb3IoRXZhbEVycm9yKV0pO1xuICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDAyLCBbZGVjb2RlLCB1bnBhY2tFcnJvcihSYW5nZUVycm9yKV0pO1xuICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDAzLCBbZGVjb2RlLCB1bnBhY2tFcnJvcihSZWZlcmVuY2VFcnJvcildKTtcbiAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgwNCwgW2RlY29kZSwgdW5wYWNrRXJyb3IoU3ludGF4RXJyb3IpXSk7XG4gIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MDUsIFtkZWNvZGUsIHVucGFja0Vycm9yKFR5cGVFcnJvcildKTtcbiAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgwNiwgW2RlY29kZSwgdW5wYWNrRXJyb3IoVVJJRXJyb3IpXSk7XG5cbiAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgwQSwgW2RlY29kZSwgdW5wYWNrUmVnRXhwXSk7XG4gIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MEIsIFtkZWNvZGUsIHVucGFja0NsYXNzKEJvb2xlYW4pXSk7XG4gIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MEMsIFtkZWNvZGUsIHVucGFja0NsYXNzKFN0cmluZyldKTtcbiAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgwRCwgW2RlY29kZSwgdW5wYWNrQ2xhc3MoRGF0ZSldKTtcbiAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgwRiwgW2RlY29kZSwgdW5wYWNrQ2xhc3MoTnVtYmVyKV0pO1xuXG4gIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgVWludDhBcnJheSkge1xuICAgIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MTEsIHVucGFja0NsYXNzKEludDhBcnJheSkpO1xuICAgIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MTIsIHVucGFja0NsYXNzKFVpbnQ4QXJyYXkpKTtcbiAgICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDEzLCBbdW5wYWNrQXJyYXlCdWZmZXIsIHVucGFja0NsYXNzKEludDE2QXJyYXkpXSk7XG4gICAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgxNCwgW3VucGFja0FycmF5QnVmZmVyLCB1bnBhY2tDbGFzcyhVaW50MTZBcnJheSldKTtcbiAgICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDE1LCBbdW5wYWNrQXJyYXlCdWZmZXIsIHVucGFja0NsYXNzKEludDMyQXJyYXkpXSk7XG4gICAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgxNiwgW3VucGFja0FycmF5QnVmZmVyLCB1bnBhY2tDbGFzcyhVaW50MzJBcnJheSldKTtcbiAgICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDE3LCBbdW5wYWNrQXJyYXlCdWZmZXIsIHVucGFja0NsYXNzKEZsb2F0MzJBcnJheSldKTtcblxuICAgIC8vIFBoYW50b21KUy8xLjkuNyBkb2Vzbid0IGhhdmUgRmxvYXQ2NEFycmF5XG4gICAgaWYgKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBGbG9hdDY0QXJyYXkpIHtcbiAgICAgIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MTgsIFt1bnBhY2tBcnJheUJ1ZmZlciwgdW5wYWNrQ2xhc3MoRmxvYXQ2NEFycmF5KV0pO1xuICAgIH1cblxuICAgIC8vIElFMTAgZG9lc24ndCBoYXZlIFVpbnQ4Q2xhbXBlZEFycmF5XG4gICAgaWYgKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBVaW50OENsYW1wZWRBcnJheSkge1xuICAgICAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgxOSwgdW5wYWNrQ2xhc3MoVWludDhDbGFtcGVkQXJyYXkpKTtcbiAgICB9XG5cbiAgICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDFBLCB1bnBhY2tBcnJheUJ1ZmZlcik7XG4gICAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgxRCwgW3VucGFja0FycmF5QnVmZmVyLCB1bnBhY2tDbGFzcyhEYXRhVmlldyldKTtcbiAgfVxuXG4gIGlmIChCdWZmZXJpc2guaGFzQnVmZmVyKSB7XG4gICAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgxQiwgdW5wYWNrQ2xhc3MoQnVmZmVyKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVjb2RlKGlucHV0KSB7XG4gIGlmICghX2RlY29kZSkgX2RlY29kZSA9IHJlcXVpcmUoXCIuL2RlY29kZVwiKS5kZWNvZGU7IC8vIGxhenkgbG9hZFxuICByZXR1cm4gX2RlY29kZShpbnB1dCk7XG59XG5cbmZ1bmN0aW9uIHVucGFja1JlZ0V4cCh2YWx1ZSkge1xuICByZXR1cm4gUmVnRXhwLmFwcGx5KG51bGwsIHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gdW5wYWNrRXJyb3IoQ2xhc3MpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFyIG91dCA9IG5ldyBDbGFzcygpO1xuICAgIGZvciAodmFyIGtleSBpbiBFUlJPUl9DT0xVTU5TKSB7XG4gICAgICBvdXRba2V5XSA9IHZhbHVlW2tleV07XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHVucGFja0NsYXNzKENsYXNzKSB7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgQ2xhc3ModmFsdWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiB1bnBhY2tBcnJheUJ1ZmZlcih2YWx1ZSkge1xuICByZXR1cm4gKG5ldyBVaW50OEFycmF5KHZhbHVlKSkuYnVmZmVyO1xufVxuIiwiLy8gZXh0LmpzXG5cbi8vIGxvYWQgYm90aCBpbnRlcmZhY2VzXG5yZXF1aXJlKFwiLi9yZWFkLWNvcmVcIik7XG5yZXF1aXJlKFwiLi93cml0ZS1jb3JlXCIpO1xuXG5leHBvcnRzLmNyZWF0ZUNvZGVjID0gcmVxdWlyZShcIi4vY29kZWMtYmFzZVwiKS5jcmVhdGVDb2RlYztcbiIsIi8vIGZsZXgtYnVmZmVyLmpzXG5cbmV4cG9ydHMuRmxleERlY29kZXIgPSBGbGV4RGVjb2RlcjtcbmV4cG9ydHMuRmxleEVuY29kZXIgPSBGbGV4RW5jb2RlcjtcblxudmFyIEJ1ZmZlcmlzaCA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaFwiKTtcblxudmFyIE1JTl9CVUZGRVJfU0laRSA9IDIwNDg7XG52YXIgTUFYX0JVRkZFUl9TSVpFID0gNjU1MzY7XG52YXIgQlVGRkVSX1NIT1JUQUdFID0gXCJCVUZGRVJfU0hPUlRBR0VcIjtcblxuZnVuY3Rpb24gRmxleERlY29kZXIoKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBGbGV4RGVjb2RlcikpIHJldHVybiBuZXcgRmxleERlY29kZXIoKTtcbn1cblxuZnVuY3Rpb24gRmxleEVuY29kZXIoKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBGbGV4RW5jb2RlcikpIHJldHVybiBuZXcgRmxleEVuY29kZXIoKTtcbn1cblxuRmxleERlY29kZXIubWl4aW4gPSBtaXhpbkZhY3RvcnkoZ2V0RGVjb2Rlck1ldGhvZHMoKSk7XG5GbGV4RGVjb2Rlci5taXhpbihGbGV4RGVjb2Rlci5wcm90b3R5cGUpO1xuXG5GbGV4RW5jb2Rlci5taXhpbiA9IG1peGluRmFjdG9yeShnZXRFbmNvZGVyTWV0aG9kcygpKTtcbkZsZXhFbmNvZGVyLm1peGluKEZsZXhFbmNvZGVyLnByb3RvdHlwZSk7XG5cbmZ1bmN0aW9uIGdldERlY29kZXJNZXRob2RzKCkge1xuICByZXR1cm4ge1xuICAgIGJ1ZmZlcmlzaDogQnVmZmVyaXNoLFxuICAgIHdyaXRlOiB3cml0ZSxcbiAgICBmZXRjaDogZmV0Y2gsXG4gICAgZmx1c2g6IGZsdXNoLFxuICAgIHB1c2g6IHB1c2gsXG4gICAgcHVsbDogcHVsbCxcbiAgICByZWFkOiByZWFkLFxuICAgIHJlc2VydmU6IHJlc2VydmUsXG4gICAgb2Zmc2V0OiAwXG4gIH07XG5cbiAgZnVuY3Rpb24gd3JpdGUoY2h1bmspIHtcbiAgICB2YXIgcHJldiA9IHRoaXMub2Zmc2V0ID8gQnVmZmVyaXNoLnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuYnVmZmVyLCB0aGlzLm9mZnNldCkgOiB0aGlzLmJ1ZmZlcjtcbiAgICB0aGlzLmJ1ZmZlciA9IHByZXYgPyAoY2h1bmsgPyB0aGlzLmJ1ZmZlcmlzaC5jb25jYXQoW3ByZXYsIGNodW5rXSkgOiBwcmV2KSA6IGNodW5rO1xuICAgIHRoaXMub2Zmc2V0ID0gMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIHdoaWxlICh0aGlzLm9mZnNldCA8IHRoaXMuYnVmZmVyLmxlbmd0aCkge1xuICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICB2YXIgdmFsdWU7XG4gICAgICB0cnkge1xuICAgICAgICB2YWx1ZSA9IHRoaXMuZmV0Y2goKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGUgJiYgZS5tZXNzYWdlICE9IEJVRkZFUl9TSE9SVEFHRSkgdGhyb3cgZTtcbiAgICAgICAgLy8gcm9sbGJhY2tcbiAgICAgICAgdGhpcy5vZmZzZXQgPSBzdGFydDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB0aGlzLnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2VydmUobGVuZ3RoKSB7XG4gICAgdmFyIHN0YXJ0ID0gdGhpcy5vZmZzZXQ7XG4gICAgdmFyIGVuZCA9IHN0YXJ0ICsgbGVuZ3RoO1xuICAgIGlmIChlbmQgPiB0aGlzLmJ1ZmZlci5sZW5ndGgpIHRocm93IG5ldyBFcnJvcihCVUZGRVJfU0hPUlRBR0UpO1xuICAgIHRoaXMub2Zmc2V0ID0gZW5kO1xuICAgIHJldHVybiBzdGFydDtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRFbmNvZGVyTWV0aG9kcygpIHtcbiAgcmV0dXJuIHtcbiAgICBidWZmZXJpc2g6IEJ1ZmZlcmlzaCxcbiAgICB3cml0ZTogd3JpdGUsXG4gICAgZmV0Y2g6IGZldGNoLFxuICAgIGZsdXNoOiBmbHVzaCxcbiAgICBwdXNoOiBwdXNoLFxuICAgIHB1bGw6IHB1bGwsXG4gICAgcmVhZDogcmVhZCxcbiAgICByZXNlcnZlOiByZXNlcnZlLFxuICAgIHNlbmQ6IHNlbmQsXG4gICAgbWF4QnVmZmVyU2l6ZTogTUFYX0JVRkZFUl9TSVpFLFxuICAgIG1pbkJ1ZmZlclNpemU6IE1JTl9CVUZGRVJfU0laRSxcbiAgICBvZmZzZXQ6IDAsXG4gICAgc3RhcnQ6IDBcbiAgfTtcblxuICBmdW5jdGlvbiBmZXRjaCgpIHtcbiAgICB2YXIgc3RhcnQgPSB0aGlzLnN0YXJ0O1xuICAgIGlmIChzdGFydCA8IHRoaXMub2Zmc2V0KSB7XG4gICAgICB2YXIgZW5kID0gdGhpcy5zdGFydCA9IHRoaXMub2Zmc2V0O1xuICAgICAgcmV0dXJuIEJ1ZmZlcmlzaC5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLmJ1ZmZlciwgc3RhcnQsIGVuZCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgd2hpbGUgKHRoaXMuc3RhcnQgPCB0aGlzLm9mZnNldCkge1xuICAgICAgdmFyIHZhbHVlID0gdGhpcy5mZXRjaCgpO1xuICAgICAgaWYgKHZhbHVlKSB0aGlzLnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHB1bGwoKSB7XG4gICAgdmFyIGJ1ZmZlcnMgPSB0aGlzLmJ1ZmZlcnMgfHwgKHRoaXMuYnVmZmVycyA9IFtdKTtcbiAgICB2YXIgY2h1bmsgPSBidWZmZXJzLmxlbmd0aCA+IDEgPyB0aGlzLmJ1ZmZlcmlzaC5jb25jYXQoYnVmZmVycykgOiBidWZmZXJzWzBdO1xuICAgIGJ1ZmZlcnMubGVuZ3RoID0gMDsgLy8gYnVmZmVyIGV4aGF1c3RlZFxuICAgIHJldHVybiBjaHVuaztcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2VydmUobGVuZ3RoKSB7XG4gICAgdmFyIHJlcSA9IGxlbmd0aCB8IDA7XG5cbiAgICBpZiAodGhpcy5idWZmZXIpIHtcbiAgICAgIHZhciBzaXplID0gdGhpcy5idWZmZXIubGVuZ3RoO1xuICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5vZmZzZXQgfCAwO1xuICAgICAgdmFyIGVuZCA9IHN0YXJ0ICsgcmVxO1xuXG4gICAgICAvLyBpcyBpdCBsb25nIGVub3VnaD9cbiAgICAgIGlmIChlbmQgPCBzaXplKSB7XG4gICAgICAgIHRoaXMub2Zmc2V0ID0gZW5kO1xuICAgICAgICByZXR1cm4gc3RhcnQ7XG4gICAgICB9XG5cbiAgICAgIC8vIGZsdXNoIGN1cnJlbnQgYnVmZmVyXG4gICAgICB0aGlzLmZsdXNoKCk7XG5cbiAgICAgIC8vIHJlc2l6ZSBpdCB0byAyeCBjdXJyZW50IGxlbmd0aFxuICAgICAgbGVuZ3RoID0gTWF0aC5tYXgobGVuZ3RoLCBNYXRoLm1pbihzaXplICogMiwgdGhpcy5tYXhCdWZmZXJTaXplKSk7XG4gICAgfVxuXG4gICAgLy8gbWluaW11bSBidWZmZXIgc2l6ZVxuICAgIGxlbmd0aCA9IE1hdGgubWF4KGxlbmd0aCwgdGhpcy5taW5CdWZmZXJTaXplKTtcblxuICAgIC8vIGFsbG9jYXRlIG5ldyBidWZmZXJcbiAgICB0aGlzLmJ1ZmZlciA9IHRoaXMuYnVmZmVyaXNoLmFsbG9jKGxlbmd0aCk7XG4gICAgdGhpcy5zdGFydCA9IDA7XG4gICAgdGhpcy5vZmZzZXQgPSByZXE7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBmdW5jdGlvbiBzZW5kKGJ1ZmZlcikge1xuICAgIHZhciBsZW5ndGggPSBidWZmZXIubGVuZ3RoO1xuICAgIGlmIChsZW5ndGggPiB0aGlzLm1pbkJ1ZmZlclNpemUpIHtcbiAgICAgIHRoaXMuZmx1c2goKTtcbiAgICAgIHRoaXMucHVzaChidWZmZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5yZXNlcnZlKGxlbmd0aCk7XG4gICAgICBCdWZmZXJpc2gucHJvdG90eXBlLmNvcHkuY2FsbChidWZmZXIsIHRoaXMuYnVmZmVyLCBvZmZzZXQpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBjb21tb24gbWV0aG9kc1xuXG5mdW5jdGlvbiB3cml0ZSgpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwibWV0aG9kIG5vdCBpbXBsZW1lbnRlZDogd3JpdGUoKVwiKTtcbn1cblxuZnVuY3Rpb24gZmV0Y2goKSB7XG4gIHRocm93IG5ldyBFcnJvcihcIm1ldGhvZCBub3QgaW1wbGVtZW50ZWQ6IGZldGNoKClcIik7XG59XG5cbmZ1bmN0aW9uIHJlYWQoKSB7XG4gIHZhciBsZW5ndGggPSB0aGlzLmJ1ZmZlcnMgJiYgdGhpcy5idWZmZXJzLmxlbmd0aDtcblxuICAvLyBmZXRjaCB0aGUgZmlyc3QgcmVzdWx0XG4gIGlmICghbGVuZ3RoKSByZXR1cm4gdGhpcy5mZXRjaCgpO1xuXG4gIC8vIGZsdXNoIGN1cnJlbnQgYnVmZmVyXG4gIHRoaXMuZmx1c2goKTtcblxuICAvLyByZWFkIGZyb20gdGhlIHJlc3VsdHNcbiAgcmV0dXJuIHRoaXMucHVsbCgpO1xufVxuXG5mdW5jdGlvbiBwdXNoKGNodW5rKSB7XG4gIHZhciBidWZmZXJzID0gdGhpcy5idWZmZXJzIHx8ICh0aGlzLmJ1ZmZlcnMgPSBbXSk7XG4gIGJ1ZmZlcnMucHVzaChjaHVuayk7XG59XG5cbmZ1bmN0aW9uIHB1bGwoKSB7XG4gIHZhciBidWZmZXJzID0gdGhpcy5idWZmZXJzIHx8ICh0aGlzLmJ1ZmZlcnMgPSBbXSk7XG4gIHJldHVybiBidWZmZXJzLnNoaWZ0KCk7XG59XG5cbmZ1bmN0aW9uIG1peGluRmFjdG9yeShzb3VyY2UpIHtcbiAgcmV0dXJuIG1peGluO1xuXG4gIGZ1bmN0aW9uIG1peGluKHRhcmdldCkge1xuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbn1cbiIsIi8vIHJlYWQtY29yZS5qc1xuXG52YXIgRXh0QnVmZmVyID0gcmVxdWlyZShcIi4vZXh0LWJ1ZmZlclwiKS5FeHRCdWZmZXI7XG52YXIgRXh0VW5wYWNrZXIgPSByZXF1aXJlKFwiLi9leHQtdW5wYWNrZXJcIik7XG52YXIgcmVhZFVpbnQ4ID0gcmVxdWlyZShcIi4vcmVhZC1mb3JtYXRcIikucmVhZFVpbnQ4O1xudmFyIFJlYWRUb2tlbiA9IHJlcXVpcmUoXCIuL3JlYWQtdG9rZW5cIik7XG52YXIgQ29kZWNCYXNlID0gcmVxdWlyZShcIi4vY29kZWMtYmFzZVwiKTtcblxuQ29kZWNCYXNlLmluc3RhbGwoe1xuICBhZGRFeHRVbnBhY2tlcjogYWRkRXh0VW5wYWNrZXIsXG4gIGdldEV4dFVucGFja2VyOiBnZXRFeHRVbnBhY2tlcixcbiAgaW5pdDogaW5pdFxufSk7XG5cbmV4cG9ydHMucHJlc2V0ID0gaW5pdC5jYWxsKENvZGVjQmFzZS5wcmVzZXQpO1xuXG5mdW5jdGlvbiBnZXREZWNvZGVyKG9wdGlvbnMpIHtcbiAgdmFyIHJlYWRUb2tlbiA9IFJlYWRUb2tlbi5nZXRSZWFkVG9rZW4ob3B0aW9ucyk7XG4gIHJldHVybiBkZWNvZGU7XG5cbiAgZnVuY3Rpb24gZGVjb2RlKGRlY29kZXIpIHtcbiAgICB2YXIgdHlwZSA9IHJlYWRVaW50OChkZWNvZGVyKTtcbiAgICB2YXIgZnVuYyA9IHJlYWRUb2tlblt0eXBlXTtcbiAgICBpZiAoIWZ1bmMpIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdHlwZTogXCIgKyAodHlwZSA/IChcIjB4XCIgKyB0eXBlLnRvU3RyaW5nKDE2KSkgOiB0eXBlKSk7XG4gICAgcmV0dXJuIGZ1bmMoZGVjb2Rlcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gIHRoaXMuZGVjb2RlID0gZ2V0RGVjb2RlcihvcHRpb25zKTtcblxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnByZXNldCkge1xuICAgIEV4dFVucGFja2VyLnNldEV4dFVucGFja2Vycyh0aGlzKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBhZGRFeHRVbnBhY2tlcihldHlwZSwgdW5wYWNrZXIpIHtcbiAgdmFyIHVucGFja2VycyA9IHRoaXMuZXh0VW5wYWNrZXJzIHx8ICh0aGlzLmV4dFVucGFja2VycyA9IFtdKTtcbiAgdW5wYWNrZXJzW2V0eXBlXSA9IENvZGVjQmFzZS5maWx0ZXIodW5wYWNrZXIpO1xufVxuXG5mdW5jdGlvbiBnZXRFeHRVbnBhY2tlcih0eXBlKSB7XG4gIHZhciB1bnBhY2tlcnMgPSB0aGlzLmV4dFVucGFja2VycyB8fCAodGhpcy5leHRVbnBhY2tlcnMgPSBbXSk7XG4gIHJldHVybiB1bnBhY2tlcnNbdHlwZV0gfHwgZXh0VW5wYWNrZXI7XG5cbiAgZnVuY3Rpb24gZXh0VW5wYWNrZXIoYnVmZmVyKSB7XG4gICAgcmV0dXJuIG5ldyBFeHRCdWZmZXIoYnVmZmVyLCB0eXBlKTtcbiAgfVxufVxuIiwiLy8gcmVhZC1mb3JtYXQuanNcblxudmFyIGllZWU3NTQgPSByZXF1aXJlKFwiaWVlZTc1NFwiKTtcbnZhciBJbnQ2NEJ1ZmZlciA9IHJlcXVpcmUoXCJpbnQ2NC1idWZmZXJcIik7XG52YXIgVWludDY0QkUgPSBJbnQ2NEJ1ZmZlci5VaW50NjRCRTtcbnZhciBJbnQ2NEJFID0gSW50NjRCdWZmZXIuSW50NjRCRTtcblxuZXhwb3J0cy5nZXRSZWFkRm9ybWF0ID0gZ2V0UmVhZEZvcm1hdDtcbmV4cG9ydHMucmVhZFVpbnQ4ID0gdWludDg7XG5cbnZhciBCdWZmZXJpc2ggPSByZXF1aXJlKFwiLi9idWZmZXJpc2hcIik7XG52YXIgQnVmZmVyUHJvdG8gPSByZXF1aXJlKFwiLi9idWZmZXJpc2gtcHJvdG9cIik7XG5cbnZhciBIQVNfTUFQID0gKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBNYXApO1xudmFyIE5PX0FTU0VSVCA9IHRydWU7XG5cbmZ1bmN0aW9uIGdldFJlYWRGb3JtYXQob3B0aW9ucykge1xuICB2YXIgYmluYXJyYXlidWZmZXIgPSBCdWZmZXJpc2guaGFzQXJyYXlCdWZmZXIgJiYgb3B0aW9ucyAmJiBvcHRpb25zLmJpbmFycmF5YnVmZmVyO1xuICB2YXIgaW50NjQgPSBvcHRpb25zICYmIG9wdGlvbnMuaW50NjQ7XG4gIHZhciB1c2VtYXAgPSBIQVNfTUFQICYmIG9wdGlvbnMgJiYgb3B0aW9ucy51c2VtYXA7XG5cbiAgdmFyIHJlYWRGb3JtYXQgPSB7XG4gICAgbWFwOiAodXNlbWFwID8gbWFwX3RvX21hcCA6IG1hcF90b19vYmopLFxuICAgIGFycmF5OiBhcnJheSxcbiAgICBzdHI6IHN0cixcbiAgICBiaW46IChiaW5hcnJheWJ1ZmZlciA/IGJpbl9hcnJheWJ1ZmZlciA6IGJpbl9idWZmZXIpLFxuICAgIGV4dDogZXh0LFxuICAgIHVpbnQ4OiB1aW50OCxcbiAgICB1aW50MTY6IHVpbnQxNixcbiAgICB1aW50MzI6IHVpbnQzMixcbiAgICB1aW50NjQ6IHJlYWQoOCwgaW50NjQgPyByZWFkVUludDY0QkVfaW50NjQgOiByZWFkVUludDY0QkUpLFxuICAgIGludDg6IGludDgsXG4gICAgaW50MTY6IGludDE2LFxuICAgIGludDMyOiBpbnQzMixcbiAgICBpbnQ2NDogcmVhZCg4LCBpbnQ2NCA/IHJlYWRJbnQ2NEJFX2ludDY0IDogcmVhZEludDY0QkUpLFxuICAgIGZsb2F0MzI6IHJlYWQoNCwgcmVhZEZsb2F0QkUpLFxuICAgIGZsb2F0NjQ6IHJlYWQoOCwgcmVhZERvdWJsZUJFKVxuICB9O1xuXG4gIHJldHVybiByZWFkRm9ybWF0O1xufVxuXG5mdW5jdGlvbiBtYXBfdG9fb2JqKGRlY29kZXIsIGxlbikge1xuICB2YXIgdmFsdWUgPSB7fTtcbiAgdmFyIGk7XG4gIHZhciBrID0gbmV3IEFycmF5KGxlbik7XG4gIHZhciB2ID0gbmV3IEFycmF5KGxlbik7XG5cbiAgdmFyIGRlY29kZSA9IGRlY29kZXIuY29kZWMuZGVjb2RlO1xuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBrW2ldID0gZGVjb2RlKGRlY29kZXIpO1xuICAgIHZbaV0gPSBkZWNvZGUoZGVjb2Rlcik7XG4gIH1cbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgdmFsdWVba1tpXV0gPSB2W2ldO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gbWFwX3RvX21hcChkZWNvZGVyLCBsZW4pIHtcbiAgdmFyIHZhbHVlID0gbmV3IE1hcCgpO1xuICB2YXIgaTtcbiAgdmFyIGsgPSBuZXcgQXJyYXkobGVuKTtcbiAgdmFyIHYgPSBuZXcgQXJyYXkobGVuKTtcblxuICB2YXIgZGVjb2RlID0gZGVjb2Rlci5jb2RlYy5kZWNvZGU7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGtbaV0gPSBkZWNvZGUoZGVjb2Rlcik7XG4gICAgdltpXSA9IGRlY29kZShkZWNvZGVyKTtcbiAgfVxuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YWx1ZS5zZXQoa1tpXSwgdltpXSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBhcnJheShkZWNvZGVyLCBsZW4pIHtcbiAgdmFyIHZhbHVlID0gbmV3IEFycmF5KGxlbik7XG4gIHZhciBkZWNvZGUgPSBkZWNvZGVyLmNvZGVjLmRlY29kZTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIHZhbHVlW2ldID0gZGVjb2RlKGRlY29kZXIpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gc3RyKGRlY29kZXIsIGxlbikge1xuICB2YXIgc3RhcnQgPSBkZWNvZGVyLnJlc2VydmUobGVuKTtcbiAgdmFyIGVuZCA9IHN0YXJ0ICsgbGVuO1xuICByZXR1cm4gQnVmZmVyUHJvdG8udG9TdHJpbmcuY2FsbChkZWNvZGVyLmJ1ZmZlciwgXCJ1dGYtOFwiLCBzdGFydCwgZW5kKTtcbn1cblxuZnVuY3Rpb24gYmluX2J1ZmZlcihkZWNvZGVyLCBsZW4pIHtcbiAgdmFyIHN0YXJ0ID0gZGVjb2Rlci5yZXNlcnZlKGxlbik7XG4gIHZhciBlbmQgPSBzdGFydCArIGxlbjtcbiAgdmFyIGJ1ZiA9IEJ1ZmZlclByb3RvLnNsaWNlLmNhbGwoZGVjb2Rlci5idWZmZXIsIHN0YXJ0LCBlbmQpO1xuICByZXR1cm4gQnVmZmVyaXNoLmZyb20oYnVmKTtcbn1cblxuZnVuY3Rpb24gYmluX2FycmF5YnVmZmVyKGRlY29kZXIsIGxlbikge1xuICB2YXIgc3RhcnQgPSBkZWNvZGVyLnJlc2VydmUobGVuKTtcbiAgdmFyIGVuZCA9IHN0YXJ0ICsgbGVuO1xuICB2YXIgYnVmID0gQnVmZmVyUHJvdG8uc2xpY2UuY2FsbChkZWNvZGVyLmJ1ZmZlciwgc3RhcnQsIGVuZCk7XG4gIHJldHVybiBCdWZmZXJpc2guVWludDhBcnJheS5mcm9tKGJ1ZikuYnVmZmVyO1xufVxuXG5mdW5jdGlvbiBleHQoZGVjb2RlciwgbGVuKSB7XG4gIHZhciBzdGFydCA9IGRlY29kZXIucmVzZXJ2ZShsZW4rMSk7XG4gIHZhciB0eXBlID0gZGVjb2Rlci5idWZmZXJbc3RhcnQrK107XG4gIHZhciBlbmQgPSBzdGFydCArIGxlbjtcbiAgdmFyIHVucGFjayA9IGRlY29kZXIuY29kZWMuZ2V0RXh0VW5wYWNrZXIodHlwZSk7XG4gIGlmICghdW5wYWNrKSB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGV4dCB0eXBlOiBcIiArICh0eXBlID8gKFwiMHhcIiArIHR5cGUudG9TdHJpbmcoMTYpKSA6IHR5cGUpKTtcbiAgdmFyIGJ1ZiA9IEJ1ZmZlclByb3RvLnNsaWNlLmNhbGwoZGVjb2Rlci5idWZmZXIsIHN0YXJ0LCBlbmQpO1xuICByZXR1cm4gdW5wYWNrKGJ1Zik7XG59XG5cbmZ1bmN0aW9uIHVpbnQ4KGRlY29kZXIpIHtcbiAgdmFyIHN0YXJ0ID0gZGVjb2Rlci5yZXNlcnZlKDEpO1xuICByZXR1cm4gZGVjb2Rlci5idWZmZXJbc3RhcnRdO1xufVxuXG5mdW5jdGlvbiBpbnQ4KGRlY29kZXIpIHtcbiAgdmFyIHN0YXJ0ID0gZGVjb2Rlci5yZXNlcnZlKDEpO1xuICB2YXIgdmFsdWUgPSBkZWNvZGVyLmJ1ZmZlcltzdGFydF07XG4gIHJldHVybiAodmFsdWUgJiAweDgwKSA/IHZhbHVlIC0gMHgxMDAgOiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gdWludDE2KGRlY29kZXIpIHtcbiAgdmFyIHN0YXJ0ID0gZGVjb2Rlci5yZXNlcnZlKDIpO1xuICB2YXIgYnVmZmVyID0gZGVjb2Rlci5idWZmZXI7XG4gIHJldHVybiAoYnVmZmVyW3N0YXJ0KytdIDw8IDgpIHwgYnVmZmVyW3N0YXJ0XTtcbn1cblxuZnVuY3Rpb24gaW50MTYoZGVjb2Rlcikge1xuICB2YXIgc3RhcnQgPSBkZWNvZGVyLnJlc2VydmUoMik7XG4gIHZhciBidWZmZXIgPSBkZWNvZGVyLmJ1ZmZlcjtcbiAgdmFyIHZhbHVlID0gKGJ1ZmZlcltzdGFydCsrXSA8PCA4KSB8IGJ1ZmZlcltzdGFydF07XG4gIHJldHVybiAodmFsdWUgJiAweDgwMDApID8gdmFsdWUgLSAweDEwMDAwIDogdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHVpbnQzMihkZWNvZGVyKSB7XG4gIHZhciBzdGFydCA9IGRlY29kZXIucmVzZXJ2ZSg0KTtcbiAgdmFyIGJ1ZmZlciA9IGRlY29kZXIuYnVmZmVyO1xuICByZXR1cm4gKGJ1ZmZlcltzdGFydCsrXSAqIDE2Nzc3MjE2KSArIChidWZmZXJbc3RhcnQrK10gPDwgMTYpICsgKGJ1ZmZlcltzdGFydCsrXSA8PCA4KSArIGJ1ZmZlcltzdGFydF07XG59XG5cbmZ1bmN0aW9uIGludDMyKGRlY29kZXIpIHtcbiAgdmFyIHN0YXJ0ID0gZGVjb2Rlci5yZXNlcnZlKDQpO1xuICB2YXIgYnVmZmVyID0gZGVjb2Rlci5idWZmZXI7XG4gIHJldHVybiAoYnVmZmVyW3N0YXJ0KytdIDw8IDI0KSB8IChidWZmZXJbc3RhcnQrK10gPDwgMTYpIHwgKGJ1ZmZlcltzdGFydCsrXSA8PCA4KSB8IGJ1ZmZlcltzdGFydF07XG59XG5cbmZ1bmN0aW9uIHJlYWQobGVuLCBtZXRob2QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGRlY29kZXIpIHtcbiAgICB2YXIgc3RhcnQgPSBkZWNvZGVyLnJlc2VydmUobGVuKTtcbiAgICByZXR1cm4gbWV0aG9kLmNhbGwoZGVjb2Rlci5idWZmZXIsIHN0YXJ0LCBOT19BU1NFUlQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiByZWFkVUludDY0QkUoc3RhcnQpIHtcbiAgcmV0dXJuIG5ldyBVaW50NjRCRSh0aGlzLCBzdGFydCkudG9OdW1iZXIoKTtcbn1cblxuZnVuY3Rpb24gcmVhZEludDY0QkUoc3RhcnQpIHtcbiAgcmV0dXJuIG5ldyBJbnQ2NEJFKHRoaXMsIHN0YXJ0KS50b051bWJlcigpO1xufVxuXG5mdW5jdGlvbiByZWFkVUludDY0QkVfaW50NjQoc3RhcnQpIHtcbiAgcmV0dXJuIG5ldyBVaW50NjRCRSh0aGlzLCBzdGFydCk7XG59XG5cbmZ1bmN0aW9uIHJlYWRJbnQ2NEJFX2ludDY0KHN0YXJ0KSB7XG4gIHJldHVybiBuZXcgSW50NjRCRSh0aGlzLCBzdGFydCk7XG59XG5cbmZ1bmN0aW9uIHJlYWRGbG9hdEJFKHN0YXJ0KSB7XG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgc3RhcnQsIGZhbHNlLCAyMywgNCk7XG59XG5cbmZ1bmN0aW9uIHJlYWREb3VibGVCRShzdGFydCkge1xuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIHN0YXJ0LCBmYWxzZSwgNTIsIDgpO1xufSIsIi8vIHJlYWQtdG9rZW4uanNcblxudmFyIFJlYWRGb3JtYXQgPSByZXF1aXJlKFwiLi9yZWFkLWZvcm1hdFwiKTtcblxuZXhwb3J0cy5nZXRSZWFkVG9rZW4gPSBnZXRSZWFkVG9rZW47XG5cbmZ1bmN0aW9uIGdldFJlYWRUb2tlbihvcHRpb25zKSB7XG4gIHZhciBmb3JtYXQgPSBSZWFkRm9ybWF0LmdldFJlYWRGb3JtYXQob3B0aW9ucyk7XG5cbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy51c2VyYXcpIHtcbiAgICByZXR1cm4gaW5pdF91c2VyYXcoZm9ybWF0KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gaW5pdF90b2tlbihmb3JtYXQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXRfdG9rZW4oZm9ybWF0KSB7XG4gIHZhciBpO1xuICB2YXIgdG9rZW4gPSBuZXcgQXJyYXkoMjU2KTtcblxuICAvLyBwb3NpdGl2ZSBmaXhpbnQgLS0gMHgwMCAtIDB4N2ZcbiAgZm9yIChpID0gMHgwMDsgaSA8PSAweDdmOyBpKyspIHtcbiAgICB0b2tlbltpXSA9IGNvbnN0YW50KGkpO1xuICB9XG5cbiAgLy8gZml4bWFwIC0tIDB4ODAgLSAweDhmXG4gIGZvciAoaSA9IDB4ODA7IGkgPD0gMHg4ZjsgaSsrKSB7XG4gICAgdG9rZW5baV0gPSBmaXgoaSAtIDB4ODAsIGZvcm1hdC5tYXApO1xuICB9XG5cbiAgLy8gZml4YXJyYXkgLS0gMHg5MCAtIDB4OWZcbiAgZm9yIChpID0gMHg5MDsgaSA8PSAweDlmOyBpKyspIHtcbiAgICB0b2tlbltpXSA9IGZpeChpIC0gMHg5MCwgZm9ybWF0LmFycmF5KTtcbiAgfVxuXG4gIC8vIGZpeHN0ciAtLSAweGEwIC0gMHhiZlxuICBmb3IgKGkgPSAweGEwOyBpIDw9IDB4YmY7IGkrKykge1xuICAgIHRva2VuW2ldID0gZml4KGkgLSAweGEwLCBmb3JtYXQuc3RyKTtcbiAgfVxuXG4gIC8vIG5pbCAtLSAweGMwXG4gIHRva2VuWzB4YzBdID0gY29uc3RhbnQobnVsbCk7XG5cbiAgLy8gKG5ldmVyIHVzZWQpIC0tIDB4YzFcbiAgdG9rZW5bMHhjMV0gPSBudWxsO1xuXG4gIC8vIGZhbHNlIC0tIDB4YzJcbiAgLy8gdHJ1ZSAtLSAweGMzXG4gIHRva2VuWzB4YzJdID0gY29uc3RhbnQoZmFsc2UpO1xuICB0b2tlblsweGMzXSA9IGNvbnN0YW50KHRydWUpO1xuXG4gIC8vIGJpbiA4IC0tIDB4YzRcbiAgLy8gYmluIDE2IC0tIDB4YzVcbiAgLy8gYmluIDMyIC0tIDB4YzZcbiAgdG9rZW5bMHhjNF0gPSBmbGV4KGZvcm1hdC51aW50OCwgZm9ybWF0LmJpbik7XG4gIHRva2VuWzB4YzVdID0gZmxleChmb3JtYXQudWludDE2LCBmb3JtYXQuYmluKTtcbiAgdG9rZW5bMHhjNl0gPSBmbGV4KGZvcm1hdC51aW50MzIsIGZvcm1hdC5iaW4pO1xuXG4gIC8vIGV4dCA4IC0tIDB4YzdcbiAgLy8gZXh0IDE2IC0tIDB4YzhcbiAgLy8gZXh0IDMyIC0tIDB4YzlcbiAgdG9rZW5bMHhjN10gPSBmbGV4KGZvcm1hdC51aW50OCwgZm9ybWF0LmV4dCk7XG4gIHRva2VuWzB4YzhdID0gZmxleChmb3JtYXQudWludDE2LCBmb3JtYXQuZXh0KTtcbiAgdG9rZW5bMHhjOV0gPSBmbGV4KGZvcm1hdC51aW50MzIsIGZvcm1hdC5leHQpO1xuXG4gIC8vIGZsb2F0IDMyIC0tIDB4Y2FcbiAgLy8gZmxvYXQgNjQgLS0gMHhjYlxuICB0b2tlblsweGNhXSA9IGZvcm1hdC5mbG9hdDMyO1xuICB0b2tlblsweGNiXSA9IGZvcm1hdC5mbG9hdDY0O1xuXG4gIC8vIHVpbnQgOCAtLSAweGNjXG4gIC8vIHVpbnQgMTYgLS0gMHhjZFxuICAvLyB1aW50IDMyIC0tIDB4Y2VcbiAgLy8gdWludCA2NCAtLSAweGNmXG4gIHRva2VuWzB4Y2NdID0gZm9ybWF0LnVpbnQ4O1xuICB0b2tlblsweGNkXSA9IGZvcm1hdC51aW50MTY7XG4gIHRva2VuWzB4Y2VdID0gZm9ybWF0LnVpbnQzMjtcbiAgdG9rZW5bMHhjZl0gPSBmb3JtYXQudWludDY0O1xuXG4gIC8vIGludCA4IC0tIDB4ZDBcbiAgLy8gaW50IDE2IC0tIDB4ZDFcbiAgLy8gaW50IDMyIC0tIDB4ZDJcbiAgLy8gaW50IDY0IC0tIDB4ZDNcbiAgdG9rZW5bMHhkMF0gPSBmb3JtYXQuaW50ODtcbiAgdG9rZW5bMHhkMV0gPSBmb3JtYXQuaW50MTY7XG4gIHRva2VuWzB4ZDJdID0gZm9ybWF0LmludDMyO1xuICB0b2tlblsweGQzXSA9IGZvcm1hdC5pbnQ2NDtcblxuICAvLyBmaXhleHQgMSAtLSAweGQ0XG4gIC8vIGZpeGV4dCAyIC0tIDB4ZDVcbiAgLy8gZml4ZXh0IDQgLS0gMHhkNlxuICAvLyBmaXhleHQgOCAtLSAweGQ3XG4gIC8vIGZpeGV4dCAxNiAtLSAweGQ4XG4gIHRva2VuWzB4ZDRdID0gZml4KDEsIGZvcm1hdC5leHQpO1xuICB0b2tlblsweGQ1XSA9IGZpeCgyLCBmb3JtYXQuZXh0KTtcbiAgdG9rZW5bMHhkNl0gPSBmaXgoNCwgZm9ybWF0LmV4dCk7XG4gIHRva2VuWzB4ZDddID0gZml4KDgsIGZvcm1hdC5leHQpO1xuICB0b2tlblsweGQ4XSA9IGZpeCgxNiwgZm9ybWF0LmV4dCk7XG5cbiAgLy8gc3RyIDggLS0gMHhkOVxuICAvLyBzdHIgMTYgLS0gMHhkYVxuICAvLyBzdHIgMzIgLS0gMHhkYlxuICB0b2tlblsweGQ5XSA9IGZsZXgoZm9ybWF0LnVpbnQ4LCBmb3JtYXQuc3RyKTtcbiAgdG9rZW5bMHhkYV0gPSBmbGV4KGZvcm1hdC51aW50MTYsIGZvcm1hdC5zdHIpO1xuICB0b2tlblsweGRiXSA9IGZsZXgoZm9ybWF0LnVpbnQzMiwgZm9ybWF0LnN0cik7XG5cbiAgLy8gYXJyYXkgMTYgLS0gMHhkY1xuICAvLyBhcnJheSAzMiAtLSAweGRkXG4gIHRva2VuWzB4ZGNdID0gZmxleChmb3JtYXQudWludDE2LCBmb3JtYXQuYXJyYXkpO1xuICB0b2tlblsweGRkXSA9IGZsZXgoZm9ybWF0LnVpbnQzMiwgZm9ybWF0LmFycmF5KTtcblxuICAvLyBtYXAgMTYgLS0gMHhkZVxuICAvLyBtYXAgMzIgLS0gMHhkZlxuICB0b2tlblsweGRlXSA9IGZsZXgoZm9ybWF0LnVpbnQxNiwgZm9ybWF0Lm1hcCk7XG4gIHRva2VuWzB4ZGZdID0gZmxleChmb3JtYXQudWludDMyLCBmb3JtYXQubWFwKTtcblxuICAvLyBuZWdhdGl2ZSBmaXhpbnQgLS0gMHhlMCAtIDB4ZmZcbiAgZm9yIChpID0gMHhlMDsgaSA8PSAweGZmOyBpKyspIHtcbiAgICB0b2tlbltpXSA9IGNvbnN0YW50KGkgLSAweDEwMCk7XG4gIH1cblxuICByZXR1cm4gdG9rZW47XG59XG5cbmZ1bmN0aW9uIGluaXRfdXNlcmF3KGZvcm1hdCkge1xuICB2YXIgaTtcbiAgdmFyIHRva2VuID0gaW5pdF90b2tlbihmb3JtYXQpLnNsaWNlKCk7XG5cbiAgLy8gcmF3IDggLS0gMHhkOVxuICAvLyByYXcgMTYgLS0gMHhkYVxuICAvLyByYXcgMzIgLS0gMHhkYlxuICB0b2tlblsweGQ5XSA9IHRva2VuWzB4YzRdO1xuICB0b2tlblsweGRhXSA9IHRva2VuWzB4YzVdO1xuICB0b2tlblsweGRiXSA9IHRva2VuWzB4YzZdO1xuXG4gIC8vIGZpeHJhdyAtLSAweGEwIC0gMHhiZlxuICBmb3IgKGkgPSAweGEwOyBpIDw9IDB4YmY7IGkrKykge1xuICAgIHRva2VuW2ldID0gZml4KGkgLSAweGEwLCBmb3JtYXQuYmluKTtcbiAgfVxuXG4gIHJldHVybiB0b2tlbjtcbn1cblxuZnVuY3Rpb24gY29uc3RhbnQodmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZmxleChsZW5GdW5jLCBkZWNvZGVGdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbihkZWNvZGVyKSB7XG4gICAgdmFyIGxlbiA9IGxlbkZ1bmMoZGVjb2Rlcik7XG4gICAgcmV0dXJuIGRlY29kZUZ1bmMoZGVjb2RlciwgbGVuKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZml4KGxlbiwgbWV0aG9kKSB7XG4gIHJldHVybiBmdW5jdGlvbihkZWNvZGVyKSB7XG4gICAgcmV0dXJuIG1ldGhvZChkZWNvZGVyLCBsZW4pO1xuICB9O1xufVxuIiwiLy8gd3JpdGUtY29yZS5qc1xuXG52YXIgRXh0QnVmZmVyID0gcmVxdWlyZShcIi4vZXh0LWJ1ZmZlclwiKS5FeHRCdWZmZXI7XG52YXIgRXh0UGFja2VyID0gcmVxdWlyZShcIi4vZXh0LXBhY2tlclwiKTtcbnZhciBXcml0ZVR5cGUgPSByZXF1aXJlKFwiLi93cml0ZS10eXBlXCIpO1xudmFyIENvZGVjQmFzZSA9IHJlcXVpcmUoXCIuL2NvZGVjLWJhc2VcIik7XG5cbkNvZGVjQmFzZS5pbnN0YWxsKHtcbiAgYWRkRXh0UGFja2VyOiBhZGRFeHRQYWNrZXIsXG4gIGdldEV4dFBhY2tlcjogZ2V0RXh0UGFja2VyLFxuICBpbml0OiBpbml0XG59KTtcblxuZXhwb3J0cy5wcmVzZXQgPSBpbml0LmNhbGwoQ29kZWNCYXNlLnByZXNldCk7XG5cbmZ1bmN0aW9uIGdldEVuY29kZXIob3B0aW9ucykge1xuICB2YXIgd3JpdGVUeXBlID0gV3JpdGVUeXBlLmdldFdyaXRlVHlwZShvcHRpb25zKTtcbiAgcmV0dXJuIGVuY29kZTtcblxuICBmdW5jdGlvbiBlbmNvZGUoZW5jb2RlciwgdmFsdWUpIHtcbiAgICB2YXIgZnVuYyA9IHdyaXRlVHlwZVt0eXBlb2YgdmFsdWVdO1xuICAgIGlmICghZnVuYykgdGhyb3cgbmV3IEVycm9yKFwiVW5zdXBwb3J0ZWQgdHlwZSBcXFwiXCIgKyAodHlwZW9mIHZhbHVlKSArIFwiXFxcIjogXCIgKyB2YWx1ZSk7XG4gICAgZnVuYyhlbmNvZGVyLCB2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gIHRoaXMuZW5jb2RlID0gZ2V0RW5jb2RlcihvcHRpb25zKTtcblxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnByZXNldCkge1xuICAgIEV4dFBhY2tlci5zZXRFeHRQYWNrZXJzKHRoaXMpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIGFkZEV4dFBhY2tlcihldHlwZSwgQ2xhc3MsIHBhY2tlcikge1xuICBwYWNrZXIgPSBDb2RlY0Jhc2UuZmlsdGVyKHBhY2tlcik7XG4gIHZhciBuYW1lID0gQ2xhc3MubmFtZTtcbiAgaWYgKG5hbWUgJiYgbmFtZSAhPT0gXCJPYmplY3RcIikge1xuICAgIHZhciBwYWNrZXJzID0gdGhpcy5leHRQYWNrZXJzIHx8ICh0aGlzLmV4dFBhY2tlcnMgPSB7fSk7XG4gICAgcGFja2Vyc1tuYW1lXSA9IGV4dFBhY2tlcjtcbiAgfSBlbHNlIHtcbiAgICAvLyBmYWxsYmFjayBmb3IgSUVcbiAgICB2YXIgbGlzdCA9IHRoaXMuZXh0RW5jb2Rlckxpc3QgfHwgKHRoaXMuZXh0RW5jb2Rlckxpc3QgPSBbXSk7XG4gICAgbGlzdC51bnNoaWZ0KFtDbGFzcywgZXh0UGFja2VyXSk7XG4gIH1cblxuICBmdW5jdGlvbiBleHRQYWNrZXIodmFsdWUpIHtcbiAgICBpZiAocGFja2VyKSB2YWx1ZSA9IHBhY2tlcih2YWx1ZSk7XG4gICAgcmV0dXJuIG5ldyBFeHRCdWZmZXIodmFsdWUsIGV0eXBlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRFeHRQYWNrZXIodmFsdWUpIHtcbiAgdmFyIHBhY2tlcnMgPSB0aGlzLmV4dFBhY2tlcnMgfHwgKHRoaXMuZXh0UGFja2VycyA9IHt9KTtcbiAgdmFyIGMgPSB2YWx1ZS5jb25zdHJ1Y3RvcjtcbiAgdmFyIGUgPSBjICYmIGMubmFtZSAmJiBwYWNrZXJzW2MubmFtZV07XG4gIGlmIChlKSByZXR1cm4gZTtcblxuICAvLyBmYWxsYmFjayBmb3IgSUVcbiAgdmFyIGxpc3QgPSB0aGlzLmV4dEVuY29kZXJMaXN0IHx8ICh0aGlzLmV4dEVuY29kZXJMaXN0ID0gW10pO1xuICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YXIgcGFpciA9IGxpc3RbaV07XG4gICAgaWYgKGMgPT09IHBhaXJbMF0pIHJldHVybiBwYWlyWzFdO1xuICB9XG59XG4iLCIvLyB3cml0ZS10b2tlbi5qc1xuXG52YXIgaWVlZTc1NCA9IHJlcXVpcmUoXCJpZWVlNzU0XCIpO1xudmFyIEludDY0QnVmZmVyID0gcmVxdWlyZShcImludDY0LWJ1ZmZlclwiKTtcbnZhciBVaW50NjRCRSA9IEludDY0QnVmZmVyLlVpbnQ2NEJFO1xudmFyIEludDY0QkUgPSBJbnQ2NEJ1ZmZlci5JbnQ2NEJFO1xuXG52YXIgdWludDggPSByZXF1aXJlKFwiLi93cml0ZS11aW50OFwiKS51aW50ODtcbnZhciBCdWZmZXJpc2ggPSByZXF1aXJlKFwiLi9idWZmZXJpc2hcIik7XG52YXIgQnVmZmVyID0gQnVmZmVyaXNoLmdsb2JhbDtcbnZhciBJU19CVUZGRVJfU0hJTSA9IEJ1ZmZlcmlzaC5oYXNCdWZmZXIgJiYgKFwiVFlQRURfQVJSQVlfU1VQUE9SVFwiIGluIEJ1ZmZlcik7XG52YXIgTk9fVFlQRURfQVJSQVkgPSBJU19CVUZGRVJfU0hJTSAmJiAhQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQ7XG52YXIgQnVmZmVyX3Byb3RvdHlwZSA9IEJ1ZmZlcmlzaC5oYXNCdWZmZXIgJiYgQnVmZmVyLnByb3RvdHlwZSB8fCB7fTtcblxuZXhwb3J0cy5nZXRXcml0ZVRva2VuID0gZ2V0V3JpdGVUb2tlbjtcblxuZnVuY3Rpb24gZ2V0V3JpdGVUb2tlbihvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMudWludDhhcnJheSkge1xuICAgIHJldHVybiBpbml0X3VpbnQ4YXJyYXkoKTtcbiAgfSBlbHNlIGlmIChOT19UWVBFRF9BUlJBWSB8fCAoQnVmZmVyaXNoLmhhc0J1ZmZlciAmJiBvcHRpb25zICYmIG9wdGlvbnMuc2FmZSkpIHtcbiAgICByZXR1cm4gaW5pdF9zYWZlKCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGluaXRfdG9rZW4oKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0X3VpbnQ4YXJyYXkoKSB7XG4gIHZhciB0b2tlbiA9IGluaXRfdG9rZW4oKTtcblxuICAvLyBmbG9hdCAzMiAtLSAweGNhXG4gIC8vIGZsb2F0IDY0IC0tIDB4Y2JcbiAgdG9rZW5bMHhjYV0gPSB3cml0ZU4oMHhjYSwgNCwgd3JpdGVGbG9hdEJFKTtcbiAgdG9rZW5bMHhjYl0gPSB3cml0ZU4oMHhjYiwgOCwgd3JpdGVEb3VibGVCRSk7XG5cbiAgcmV0dXJuIHRva2VuO1xufVxuXG4vLyBOb2RlLmpzIGFuZCBicm93c2VycyB3aXRoIFR5cGVkQXJyYXlcblxuZnVuY3Rpb24gaW5pdF90b2tlbigpIHtcbiAgLy8gKGltbWVkaWF0ZSB2YWx1ZXMpXG4gIC8vIHBvc2l0aXZlIGZpeGludCAtLSAweDAwIC0gMHg3ZlxuICAvLyBuaWwgLS0gMHhjMFxuICAvLyBmYWxzZSAtLSAweGMyXG4gIC8vIHRydWUgLS0gMHhjM1xuICAvLyBuZWdhdGl2ZSBmaXhpbnQgLS0gMHhlMCAtIDB4ZmZcbiAgdmFyIHRva2VuID0gdWludDguc2xpY2UoKTtcblxuICAvLyBiaW4gOCAtLSAweGM0XG4gIC8vIGJpbiAxNiAtLSAweGM1XG4gIC8vIGJpbiAzMiAtLSAweGM2XG4gIHRva2VuWzB4YzRdID0gd3JpdGUxKDB4YzQpO1xuICB0b2tlblsweGM1XSA9IHdyaXRlMigweGM1KTtcbiAgdG9rZW5bMHhjNl0gPSB3cml0ZTQoMHhjNik7XG5cbiAgLy8gZXh0IDggLS0gMHhjN1xuICAvLyBleHQgMTYgLS0gMHhjOFxuICAvLyBleHQgMzIgLS0gMHhjOVxuICB0b2tlblsweGM3XSA9IHdyaXRlMSgweGM3KTtcbiAgdG9rZW5bMHhjOF0gPSB3cml0ZTIoMHhjOCk7XG4gIHRva2VuWzB4YzldID0gd3JpdGU0KDB4YzkpO1xuXG4gIC8vIGZsb2F0IDMyIC0tIDB4Y2FcbiAgLy8gZmxvYXQgNjQgLS0gMHhjYlxuICB0b2tlblsweGNhXSA9IHdyaXRlTigweGNhLCA0LCAoQnVmZmVyX3Byb3RvdHlwZS53cml0ZUZsb2F0QkUgfHwgd3JpdGVGbG9hdEJFKSwgdHJ1ZSk7XG4gIHRva2VuWzB4Y2JdID0gd3JpdGVOKDB4Y2IsIDgsIChCdWZmZXJfcHJvdG90eXBlLndyaXRlRG91YmxlQkUgfHwgd3JpdGVEb3VibGVCRSksIHRydWUpO1xuXG4gIC8vIHVpbnQgOCAtLSAweGNjXG4gIC8vIHVpbnQgMTYgLS0gMHhjZFxuICAvLyB1aW50IDMyIC0tIDB4Y2VcbiAgLy8gdWludCA2NCAtLSAweGNmXG4gIHRva2VuWzB4Y2NdID0gd3JpdGUxKDB4Y2MpO1xuICB0b2tlblsweGNkXSA9IHdyaXRlMigweGNkKTtcbiAgdG9rZW5bMHhjZV0gPSB3cml0ZTQoMHhjZSk7XG4gIHRva2VuWzB4Y2ZdID0gd3JpdGVOKDB4Y2YsIDgsIHdyaXRlVUludDY0QkUpO1xuXG4gIC8vIGludCA4IC0tIDB4ZDBcbiAgLy8gaW50IDE2IC0tIDB4ZDFcbiAgLy8gaW50IDMyIC0tIDB4ZDJcbiAgLy8gaW50IDY0IC0tIDB4ZDNcbiAgdG9rZW5bMHhkMF0gPSB3cml0ZTEoMHhkMCk7XG4gIHRva2VuWzB4ZDFdID0gd3JpdGUyKDB4ZDEpO1xuICB0b2tlblsweGQyXSA9IHdyaXRlNCgweGQyKTtcbiAgdG9rZW5bMHhkM10gPSB3cml0ZU4oMHhkMywgOCwgd3JpdGVJbnQ2NEJFKTtcblxuICAvLyBzdHIgOCAtLSAweGQ5XG4gIC8vIHN0ciAxNiAtLSAweGRhXG4gIC8vIHN0ciAzMiAtLSAweGRiXG4gIHRva2VuWzB4ZDldID0gd3JpdGUxKDB4ZDkpO1xuICB0b2tlblsweGRhXSA9IHdyaXRlMigweGRhKTtcbiAgdG9rZW5bMHhkYl0gPSB3cml0ZTQoMHhkYik7XG5cbiAgLy8gYXJyYXkgMTYgLS0gMHhkY1xuICAvLyBhcnJheSAzMiAtLSAweGRkXG4gIHRva2VuWzB4ZGNdID0gd3JpdGUyKDB4ZGMpO1xuICB0b2tlblsweGRkXSA9IHdyaXRlNCgweGRkKTtcblxuICAvLyBtYXAgMTYgLS0gMHhkZVxuICAvLyBtYXAgMzIgLS0gMHhkZlxuICB0b2tlblsweGRlXSA9IHdyaXRlMigweGRlKTtcbiAgdG9rZW5bMHhkZl0gPSB3cml0ZTQoMHhkZik7XG5cbiAgcmV0dXJuIHRva2VuO1xufVxuXG4vLyBzYWZlIG1vZGU6IGZvciBvbGQgYnJvd3NlcnMgYW5kIHdobyBuZWVkcyBhc3NlcnRzXG5cbmZ1bmN0aW9uIGluaXRfc2FmZSgpIHtcbiAgLy8gKGltbWVkaWF0ZSB2YWx1ZXMpXG4gIC8vIHBvc2l0aXZlIGZpeGludCAtLSAweDAwIC0gMHg3ZlxuICAvLyBuaWwgLS0gMHhjMFxuICAvLyBmYWxzZSAtLSAweGMyXG4gIC8vIHRydWUgLS0gMHhjM1xuICAvLyBuZWdhdGl2ZSBmaXhpbnQgLS0gMHhlMCAtIDB4ZmZcbiAgdmFyIHRva2VuID0gdWludDguc2xpY2UoKTtcblxuICAvLyBiaW4gOCAtLSAweGM0XG4gIC8vIGJpbiAxNiAtLSAweGM1XG4gIC8vIGJpbiAzMiAtLSAweGM2XG4gIHRva2VuWzB4YzRdID0gd3JpdGVOKDB4YzQsIDEsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCk7XG4gIHRva2VuWzB4YzVdID0gd3JpdGVOKDB4YzUsIDIsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSk7XG4gIHRva2VuWzB4YzZdID0gd3JpdGVOKDB4YzYsIDQsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSk7XG5cbiAgLy8gZXh0IDggLS0gMHhjN1xuICAvLyBleHQgMTYgLS0gMHhjOFxuICAvLyBleHQgMzIgLS0gMHhjOVxuICB0b2tlblsweGM3XSA9IHdyaXRlTigweGM3LCAxLCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDgpO1xuICB0b2tlblsweGM4XSA9IHdyaXRlTigweGM4LCAyLCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUpO1xuICB0b2tlblsweGM5XSA9IHdyaXRlTigweGM5LCA0LCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUpO1xuXG4gIC8vIGZsb2F0IDMyIC0tIDB4Y2FcbiAgLy8gZmxvYXQgNjQgLS0gMHhjYlxuICB0b2tlblsweGNhXSA9IHdyaXRlTigweGNhLCA0LCBCdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSk7XG4gIHRva2VuWzB4Y2JdID0gd3JpdGVOKDB4Y2IsIDgsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSk7XG5cbiAgLy8gdWludCA4IC0tIDB4Y2NcbiAgLy8gdWludCAxNiAtLSAweGNkXG4gIC8vIHVpbnQgMzIgLS0gMHhjZVxuICAvLyB1aW50IDY0IC0tIDB4Y2ZcbiAgdG9rZW5bMHhjY10gPSB3cml0ZU4oMHhjYywgMSwgQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4KTtcbiAgdG9rZW5bMHhjZF0gPSB3cml0ZU4oMHhjZCwgMiwgQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFKTtcbiAgdG9rZW5bMHhjZV0gPSB3cml0ZU4oMHhjZSwgNCwgQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFKTtcbiAgdG9rZW5bMHhjZl0gPSB3cml0ZU4oMHhjZiwgOCwgd3JpdGVVSW50NjRCRSk7XG5cbiAgLy8gaW50IDggLS0gMHhkMFxuICAvLyBpbnQgMTYgLS0gMHhkMVxuICAvLyBpbnQgMzIgLS0gMHhkMlxuICAvLyBpbnQgNjQgLS0gMHhkM1xuICB0b2tlblsweGQwXSA9IHdyaXRlTigweGQwLCAxLCBCdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCk7XG4gIHRva2VuWzB4ZDFdID0gd3JpdGVOKDB4ZDEsIDIsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFKTtcbiAgdG9rZW5bMHhkMl0gPSB3cml0ZU4oMHhkMiwgNCwgQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUpO1xuICB0b2tlblsweGQzXSA9IHdyaXRlTigweGQzLCA4LCB3cml0ZUludDY0QkUpO1xuXG4gIC8vIHN0ciA4IC0tIDB4ZDlcbiAgLy8gc3RyIDE2IC0tIDB4ZGFcbiAgLy8gc3RyIDMyIC0tIDB4ZGJcbiAgdG9rZW5bMHhkOV0gPSB3cml0ZU4oMHhkOSwgMSwgQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4KTtcbiAgdG9rZW5bMHhkYV0gPSB3cml0ZU4oMHhkYSwgMiwgQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFKTtcbiAgdG9rZW5bMHhkYl0gPSB3cml0ZU4oMHhkYiwgNCwgQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFKTtcblxuICAvLyBhcnJheSAxNiAtLSAweGRjXG4gIC8vIGFycmF5IDMyIC0tIDB4ZGRcbiAgdG9rZW5bMHhkY10gPSB3cml0ZU4oMHhkYywgMiwgQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFKTtcbiAgdG9rZW5bMHhkZF0gPSB3cml0ZU4oMHhkZCwgNCwgQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFKTtcblxuICAvLyBtYXAgMTYgLS0gMHhkZVxuICAvLyBtYXAgMzIgLS0gMHhkZlxuICB0b2tlblsweGRlXSA9IHdyaXRlTigweGRlLCAyLCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUpO1xuICB0b2tlblsweGRmXSA9IHdyaXRlTigweGRmLCA0LCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUpO1xuXG4gIHJldHVybiB0b2tlbjtcbn1cblxuZnVuY3Rpb24gd3JpdGUxKHR5cGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGVuY29kZXIsIHZhbHVlKSB7XG4gICAgdmFyIG9mZnNldCA9IGVuY29kZXIucmVzZXJ2ZSgyKTtcbiAgICB2YXIgYnVmZmVyID0gZW5jb2Rlci5idWZmZXI7XG4gICAgYnVmZmVyW29mZnNldCsrXSA9IHR5cGU7XG4gICAgYnVmZmVyW29mZnNldF0gPSB2YWx1ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gd3JpdGUyKHR5cGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGVuY29kZXIsIHZhbHVlKSB7XG4gICAgdmFyIG9mZnNldCA9IGVuY29kZXIucmVzZXJ2ZSgzKTtcbiAgICB2YXIgYnVmZmVyID0gZW5jb2Rlci5idWZmZXI7XG4gICAgYnVmZmVyW29mZnNldCsrXSA9IHR5cGU7XG4gICAgYnVmZmVyW29mZnNldCsrXSA9IHZhbHVlID4+PiA4O1xuICAgIGJ1ZmZlcltvZmZzZXRdID0gdmFsdWU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHdyaXRlNCh0eXBlKSB7XG4gIHJldHVybiBmdW5jdGlvbihlbmNvZGVyLCB2YWx1ZSkge1xuICAgIHZhciBvZmZzZXQgPSBlbmNvZGVyLnJlc2VydmUoNSk7XG4gICAgdmFyIGJ1ZmZlciA9IGVuY29kZXIuYnVmZmVyO1xuICAgIGJ1ZmZlcltvZmZzZXQrK10gPSB0eXBlO1xuICAgIGJ1ZmZlcltvZmZzZXQrK10gPSB2YWx1ZSA+Pj4gMjQ7XG4gICAgYnVmZmVyW29mZnNldCsrXSA9IHZhbHVlID4+PiAxNjtcbiAgICBidWZmZXJbb2Zmc2V0KytdID0gdmFsdWUgPj4+IDg7XG4gICAgYnVmZmVyW29mZnNldF0gPSB2YWx1ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gd3JpdGVOKHR5cGUsIGxlbiwgbWV0aG9kLCBub0Fzc2VydCkge1xuICByZXR1cm4gZnVuY3Rpb24oZW5jb2RlciwgdmFsdWUpIHtcbiAgICB2YXIgb2Zmc2V0ID0gZW5jb2Rlci5yZXNlcnZlKGxlbiArIDEpO1xuICAgIGVuY29kZXIuYnVmZmVyW29mZnNldCsrXSA9IHR5cGU7XG4gICAgbWV0aG9kLmNhbGwoZW5jb2Rlci5idWZmZXIsIHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gd3JpdGVVSW50NjRCRSh2YWx1ZSwgb2Zmc2V0KSB7XG4gIG5ldyBVaW50NjRCRSh0aGlzLCBvZmZzZXQsIHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gd3JpdGVJbnQ2NEJFKHZhbHVlLCBvZmZzZXQpIHtcbiAgbmV3IEludDY0QkUodGhpcywgb2Zmc2V0LCB2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIHdyaXRlRmxvYXRCRSh2YWx1ZSwgb2Zmc2V0KSB7XG4gIGllZWU3NTQud3JpdGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIDIzLCA0KTtcbn1cblxuZnVuY3Rpb24gd3JpdGVEb3VibGVCRSh2YWx1ZSwgb2Zmc2V0KSB7XG4gIGllZWU3NTQud3JpdGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIDUyLCA4KTtcbn1cbiIsIi8vIHdyaXRlLXR5cGUuanNcblxudmFyIElTX0FSUkFZID0gcmVxdWlyZShcImlzYXJyYXlcIik7XG52YXIgSW50NjRCdWZmZXIgPSByZXF1aXJlKFwiaW50NjQtYnVmZmVyXCIpO1xudmFyIFVpbnQ2NEJFID0gSW50NjRCdWZmZXIuVWludDY0QkU7XG52YXIgSW50NjRCRSA9IEludDY0QnVmZmVyLkludDY0QkU7XG5cbnZhciBCdWZmZXJpc2ggPSByZXF1aXJlKFwiLi9idWZmZXJpc2hcIik7XG52YXIgQnVmZmVyUHJvdG8gPSByZXF1aXJlKFwiLi9idWZmZXJpc2gtcHJvdG9cIik7XG52YXIgV3JpdGVUb2tlbiA9IHJlcXVpcmUoXCIuL3dyaXRlLXRva2VuXCIpO1xudmFyIHVpbnQ4ID0gcmVxdWlyZShcIi4vd3JpdGUtdWludDhcIikudWludDg7XG52YXIgRXh0QnVmZmVyID0gcmVxdWlyZShcIi4vZXh0LWJ1ZmZlclwiKS5FeHRCdWZmZXI7XG5cbnZhciBIQVNfVUlOVDhBUlJBWSA9IChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgVWludDhBcnJheSk7XG52YXIgSEFTX01BUCA9IChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgTWFwKTtcblxudmFyIGV4dG1hcCA9IFtdO1xuZXh0bWFwWzFdID0gMHhkNDtcbmV4dG1hcFsyXSA9IDB4ZDU7XG5leHRtYXBbNF0gPSAweGQ2O1xuZXh0bWFwWzhdID0gMHhkNztcbmV4dG1hcFsxNl0gPSAweGQ4O1xuXG5leHBvcnRzLmdldFdyaXRlVHlwZSA9IGdldFdyaXRlVHlwZTtcblxuZnVuY3Rpb24gZ2V0V3JpdGVUeXBlKG9wdGlvbnMpIHtcbiAgdmFyIHRva2VuID0gV3JpdGVUb2tlbi5nZXRXcml0ZVRva2VuKG9wdGlvbnMpO1xuICB2YXIgdXNlcmF3ID0gb3B0aW9ucyAmJiBvcHRpb25zLnVzZXJhdztcbiAgdmFyIGJpbmFycmF5YnVmZmVyID0gSEFTX1VJTlQ4QVJSQVkgJiYgb3B0aW9ucyAmJiBvcHRpb25zLmJpbmFycmF5YnVmZmVyO1xuICB2YXIgaXNCdWZmZXIgPSBiaW5hcnJheWJ1ZmZlciA/IEJ1ZmZlcmlzaC5pc0FycmF5QnVmZmVyIDogQnVmZmVyaXNoLmlzQnVmZmVyO1xuICB2YXIgYmluID0gYmluYXJyYXlidWZmZXIgPyBiaW5fYXJyYXlidWZmZXIgOiBiaW5fYnVmZmVyO1xuICB2YXIgdXNlbWFwID0gSEFTX01BUCAmJiBvcHRpb25zICYmIG9wdGlvbnMudXNlbWFwO1xuICB2YXIgbWFwID0gdXNlbWFwID8gbWFwX3RvX21hcCA6IG9ial90b19tYXA7XG5cbiAgdmFyIHdyaXRlVHlwZSA9IHtcbiAgICBcImJvb2xlYW5cIjogYm9vbCxcbiAgICBcImZ1bmN0aW9uXCI6IG5pbCxcbiAgICBcIm51bWJlclwiOiBudW1iZXIsXG4gICAgXCJvYmplY3RcIjogKHVzZXJhdyA/IG9iamVjdF9yYXcgOiBvYmplY3QpLFxuICAgIFwic3RyaW5nXCI6IF9zdHJpbmcodXNlcmF3ID8gcmF3X2hlYWRfc2l6ZSA6IHN0cl9oZWFkX3NpemUpLFxuICAgIFwic3ltYm9sXCI6IG5pbCxcbiAgICBcInVuZGVmaW5lZFwiOiBuaWxcbiAgfTtcblxuICByZXR1cm4gd3JpdGVUeXBlO1xuXG4gIC8vIGZhbHNlIC0tIDB4YzJcbiAgLy8gdHJ1ZSAtLSAweGMzXG4gIGZ1bmN0aW9uIGJvb2woZW5jb2RlciwgdmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IHZhbHVlID8gMHhjMyA6IDB4YzI7XG4gICAgdG9rZW5bdHlwZV0oZW5jb2RlciwgdmFsdWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gbnVtYmVyKGVuY29kZXIsIHZhbHVlKSB7XG4gICAgdmFyIGl2YWx1ZSA9IHZhbHVlIHwgMDtcbiAgICB2YXIgdHlwZTtcbiAgICBpZiAodmFsdWUgIT09IGl2YWx1ZSkge1xuICAgICAgLy8gZmxvYXQgNjQgLS0gMHhjYlxuICAgICAgdHlwZSA9IDB4Y2I7XG4gICAgICB0b2tlblt0eXBlXShlbmNvZGVyLCB2YWx1ZSk7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICgtMHgyMCA8PSBpdmFsdWUgJiYgaXZhbHVlIDw9IDB4N0YpIHtcbiAgICAgIC8vIHBvc2l0aXZlIGZpeGludCAtLSAweDAwIC0gMHg3ZlxuICAgICAgLy8gbmVnYXRpdmUgZml4aW50IC0tIDB4ZTAgLSAweGZmXG4gICAgICB0eXBlID0gaXZhbHVlICYgMHhGRjtcbiAgICB9IGVsc2UgaWYgKDAgPD0gaXZhbHVlKSB7XG4gICAgICAvLyB1aW50IDggLS0gMHhjY1xuICAgICAgLy8gdWludCAxNiAtLSAweGNkXG4gICAgICAvLyB1aW50IDMyIC0tIDB4Y2VcbiAgICAgIHR5cGUgPSAoaXZhbHVlIDw9IDB4RkYpID8gMHhjYyA6IChpdmFsdWUgPD0gMHhGRkZGKSA/IDB4Y2QgOiAweGNlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpbnQgOCAtLSAweGQwXG4gICAgICAvLyBpbnQgMTYgLS0gMHhkMVxuICAgICAgLy8gaW50IDMyIC0tIDB4ZDJcbiAgICAgIHR5cGUgPSAoLTB4ODAgPD0gaXZhbHVlKSA/IDB4ZDAgOiAoLTB4ODAwMCA8PSBpdmFsdWUpID8gMHhkMSA6IDB4ZDI7XG4gICAgfVxuICAgIHRva2VuW3R5cGVdKGVuY29kZXIsIGl2YWx1ZSk7XG4gIH1cblxuICAvLyB1aW50IDY0IC0tIDB4Y2ZcbiAgZnVuY3Rpb24gdWludDY0KGVuY29kZXIsIHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSAweGNmO1xuICAgIHRva2VuW3R5cGVdKGVuY29kZXIsIHZhbHVlLnRvQXJyYXkoKSk7XG4gIH1cblxuICAvLyBpbnQgNjQgLS0gMHhkM1xuICBmdW5jdGlvbiBpbnQ2NChlbmNvZGVyLCB2YWx1ZSkge1xuICAgIHZhciB0eXBlID0gMHhkMztcbiAgICB0b2tlblt0eXBlXShlbmNvZGVyLCB2YWx1ZS50b0FycmF5KCkpO1xuICB9XG5cbiAgLy8gc3RyIDggLS0gMHhkOVxuICAvLyBzdHIgMTYgLS0gMHhkYVxuICAvLyBzdHIgMzIgLS0gMHhkYlxuICAvLyBmaXhzdHIgLS0gMHhhMCAtIDB4YmZcbiAgZnVuY3Rpb24gc3RyX2hlYWRfc2l6ZShsZW5ndGgpIHtcbiAgICByZXR1cm4gKGxlbmd0aCA8IDMyKSA/IDEgOiAobGVuZ3RoIDw9IDB4RkYpID8gMiA6IChsZW5ndGggPD0gMHhGRkZGKSA/IDMgOiA1O1xuICB9XG5cbiAgLy8gcmF3IDE2IC0tIDB4ZGFcbiAgLy8gcmF3IDMyIC0tIDB4ZGJcbiAgLy8gZml4cmF3IC0tIDB4YTAgLSAweGJmXG4gIGZ1bmN0aW9uIHJhd19oZWFkX3NpemUobGVuZ3RoKSB7XG4gICAgcmV0dXJuIChsZW5ndGggPCAzMikgPyAxIDogKGxlbmd0aCA8PSAweEZGRkYpID8gMyA6IDU7XG4gIH1cblxuICBmdW5jdGlvbiBfc3RyaW5nKGhlYWRfc2l6ZSkge1xuICAgIHJldHVybiBzdHJpbmc7XG5cbiAgICBmdW5jdGlvbiBzdHJpbmcoZW5jb2RlciwgdmFsdWUpIHtcbiAgICAgIC8vIHByZXBhcmUgYnVmZmVyXG4gICAgICB2YXIgbGVuZ3RoID0gdmFsdWUubGVuZ3RoO1xuICAgICAgdmFyIG1heHNpemUgPSA1ICsgbGVuZ3RoICogMztcbiAgICAgIGVuY29kZXIub2Zmc2V0ID0gZW5jb2Rlci5yZXNlcnZlKG1heHNpemUpO1xuICAgICAgdmFyIGJ1ZmZlciA9IGVuY29kZXIuYnVmZmVyO1xuXG4gICAgICAvLyBleHBlY3RlZCBoZWFkZXIgc2l6ZVxuICAgICAgdmFyIGV4cGVjdGVkID0gaGVhZF9zaXplKGxlbmd0aCk7XG5cbiAgICAgIC8vIGV4cGVjdGVkIHN0YXJ0IHBvaW50XG4gICAgICB2YXIgc3RhcnQgPSBlbmNvZGVyLm9mZnNldCArIGV4cGVjdGVkO1xuXG4gICAgICAvLyB3cml0ZSBzdHJpbmdcbiAgICAgIGxlbmd0aCA9IEJ1ZmZlclByb3RvLndyaXRlLmNhbGwoYnVmZmVyLCB2YWx1ZSwgc3RhcnQpO1xuXG4gICAgICAvLyBhY3R1YWwgaGVhZGVyIHNpemVcbiAgICAgIHZhciBhY3R1YWwgPSBoZWFkX3NpemUobGVuZ3RoKTtcblxuICAgICAgLy8gbW92ZSBjb250ZW50IHdoZW4gbmVlZGVkXG4gICAgICBpZiAoZXhwZWN0ZWQgIT09IGFjdHVhbCkge1xuICAgICAgICB2YXIgdGFyZ2V0U3RhcnQgPSBzdGFydCArIGFjdHVhbCAtIGV4cGVjdGVkO1xuICAgICAgICB2YXIgZW5kID0gc3RhcnQgKyBsZW5ndGg7XG4gICAgICAgIEJ1ZmZlclByb3RvLmNvcHkuY2FsbChidWZmZXIsIGJ1ZmZlciwgdGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpO1xuICAgICAgfVxuXG4gICAgICAvLyB3cml0ZSBoZWFkZXJcbiAgICAgIHZhciB0eXBlID0gKGFjdHVhbCA9PT0gMSkgPyAoMHhhMCArIGxlbmd0aCkgOiAoYWN0dWFsIDw9IDMpID8gKDB4ZDcgKyBhY3R1YWwpIDogMHhkYjtcbiAgICAgIHRva2VuW3R5cGVdKGVuY29kZXIsIGxlbmd0aCk7XG5cbiAgICAgIC8vIG1vdmUgY3Vyc29yXG4gICAgICBlbmNvZGVyLm9mZnNldCArPSBsZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb2JqZWN0KGVuY29kZXIsIHZhbHVlKSB7XG4gICAgLy8gbnVsbFxuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuIG5pbChlbmNvZGVyLCB2YWx1ZSk7XG5cbiAgICAvLyBCdWZmZXJcbiAgICBpZiAoaXNCdWZmZXIodmFsdWUpKSByZXR1cm4gYmluKGVuY29kZXIsIHZhbHVlKTtcblxuICAgIC8vIEFycmF5XG4gICAgaWYgKElTX0FSUkFZKHZhbHVlKSkgcmV0dXJuIGFycmF5KGVuY29kZXIsIHZhbHVlKTtcblxuICAgIC8vIGludDY0LWJ1ZmZlciBvYmplY3RzXG4gICAgaWYgKFVpbnQ2NEJFLmlzVWludDY0QkUodmFsdWUpKSByZXR1cm4gdWludDY0KGVuY29kZXIsIHZhbHVlKTtcbiAgICBpZiAoSW50NjRCRS5pc0ludDY0QkUodmFsdWUpKSByZXR1cm4gaW50NjQoZW5jb2RlciwgdmFsdWUpO1xuXG4gICAgLy8gZXh0IGZvcm1hdHNcbiAgICB2YXIgcGFja2VyID0gZW5jb2Rlci5jb2RlYy5nZXRFeHRQYWNrZXIodmFsdWUpO1xuICAgIGlmIChwYWNrZXIpIHZhbHVlID0gcGFja2VyKHZhbHVlKTtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBFeHRCdWZmZXIpIHJldHVybiBleHQoZW5jb2RlciwgdmFsdWUpO1xuXG4gICAgLy8gcGxhaW4gb2xkIE9iamVjdHMgb3IgTWFwXG4gICAgbWFwKGVuY29kZXIsIHZhbHVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9iamVjdF9yYXcoZW5jb2RlciwgdmFsdWUpIHtcbiAgICAvLyBCdWZmZXJcbiAgICBpZiAoaXNCdWZmZXIodmFsdWUpKSByZXR1cm4gcmF3KGVuY29kZXIsIHZhbHVlKTtcblxuICAgIC8vIG90aGVyc1xuICAgIG9iamVjdChlbmNvZGVyLCB2YWx1ZSk7XG4gIH1cblxuICAvLyBuaWwgLS0gMHhjMFxuICBmdW5jdGlvbiBuaWwoZW5jb2RlciwgdmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IDB4YzA7XG4gICAgdG9rZW5bdHlwZV0oZW5jb2RlciwgdmFsdWUpO1xuICB9XG5cbiAgLy8gZml4YXJyYXkgLS0gMHg5MCAtIDB4OWZcbiAgLy8gYXJyYXkgMTYgLS0gMHhkY1xuICAvLyBhcnJheSAzMiAtLSAweGRkXG4gIGZ1bmN0aW9uIGFycmF5KGVuY29kZXIsIHZhbHVlKSB7XG4gICAgdmFyIGxlbmd0aCA9IHZhbHVlLmxlbmd0aDtcbiAgICB2YXIgdHlwZSA9IChsZW5ndGggPCAxNikgPyAoMHg5MCArIGxlbmd0aCkgOiAobGVuZ3RoIDw9IDB4RkZGRikgPyAweGRjIDogMHhkZDtcbiAgICB0b2tlblt0eXBlXShlbmNvZGVyLCBsZW5ndGgpO1xuXG4gICAgdmFyIGVuY29kZSA9IGVuY29kZXIuY29kZWMuZW5jb2RlO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGVuY29kZShlbmNvZGVyLCB2YWx1ZVtpXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gYmluIDggLS0gMHhjNFxuICAvLyBiaW4gMTYgLS0gMHhjNVxuICAvLyBiaW4gMzIgLS0gMHhjNlxuICBmdW5jdGlvbiBiaW5fYnVmZmVyKGVuY29kZXIsIHZhbHVlKSB7XG4gICAgdmFyIGxlbmd0aCA9IHZhbHVlLmxlbmd0aDtcbiAgICB2YXIgdHlwZSA9IChsZW5ndGggPCAweEZGKSA/IDB4YzQgOiAobGVuZ3RoIDw9IDB4RkZGRikgPyAweGM1IDogMHhjNjtcbiAgICB0b2tlblt0eXBlXShlbmNvZGVyLCBsZW5ndGgpO1xuICAgIGVuY29kZXIuc2VuZCh2YWx1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBiaW5fYXJyYXlidWZmZXIoZW5jb2RlciwgdmFsdWUpIHtcbiAgICBiaW5fYnVmZmVyKGVuY29kZXIsIG5ldyBVaW50OEFycmF5KHZhbHVlKSk7XG4gIH1cblxuICAvLyBmaXhleHQgMSAtLSAweGQ0XG4gIC8vIGZpeGV4dCAyIC0tIDB4ZDVcbiAgLy8gZml4ZXh0IDQgLS0gMHhkNlxuICAvLyBmaXhleHQgOCAtLSAweGQ3XG4gIC8vIGZpeGV4dCAxNiAtLSAweGQ4XG4gIC8vIGV4dCA4IC0tIDB4YzdcbiAgLy8gZXh0IDE2IC0tIDB4YzhcbiAgLy8gZXh0IDMyIC0tIDB4YzlcbiAgZnVuY3Rpb24gZXh0KGVuY29kZXIsIHZhbHVlKSB7XG4gICAgdmFyIGJ1ZmZlciA9IHZhbHVlLmJ1ZmZlcjtcbiAgICB2YXIgbGVuZ3RoID0gYnVmZmVyLmxlbmd0aDtcbiAgICB2YXIgdHlwZSA9IGV4dG1hcFtsZW5ndGhdIHx8ICgobGVuZ3RoIDwgMHhGRikgPyAweGM3IDogKGxlbmd0aCA8PSAweEZGRkYpID8gMHhjOCA6IDB4YzkpO1xuICAgIHRva2VuW3R5cGVdKGVuY29kZXIsIGxlbmd0aCk7XG4gICAgdWludDhbdmFsdWUudHlwZV0oZW5jb2Rlcik7XG4gICAgZW5jb2Rlci5zZW5kKGJ1ZmZlcik7XG4gIH1cblxuICAvLyBmaXhtYXAgLS0gMHg4MCAtIDB4OGZcbiAgLy8gbWFwIDE2IC0tIDB4ZGVcbiAgLy8gbWFwIDMyIC0tIDB4ZGZcbiAgZnVuY3Rpb24gb2JqX3RvX21hcChlbmNvZGVyLCB2YWx1ZSkge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgdHlwZSA9IChsZW5ndGggPCAxNikgPyAoMHg4MCArIGxlbmd0aCkgOiAobGVuZ3RoIDw9IDB4RkZGRikgPyAweGRlIDogMHhkZjtcbiAgICB0b2tlblt0eXBlXShlbmNvZGVyLCBsZW5ndGgpO1xuXG4gICAgdmFyIGVuY29kZSA9IGVuY29kZXIuY29kZWMuZW5jb2RlO1xuICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgIGVuY29kZShlbmNvZGVyLCBrZXkpO1xuICAgICAgZW5jb2RlKGVuY29kZXIsIHZhbHVlW2tleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gZml4bWFwIC0tIDB4ODAgLSAweDhmXG4gIC8vIG1hcCAxNiAtLSAweGRlXG4gIC8vIG1hcCAzMiAtLSAweGRmXG4gIGZ1bmN0aW9uIG1hcF90b19tYXAoZW5jb2RlciwgdmFsdWUpIHtcbiAgICBpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIE1hcCkpIHJldHVybiBvYmpfdG9fbWFwKGVuY29kZXIsIHZhbHVlKTtcblxuICAgIHZhciBsZW5ndGggPSB2YWx1ZS5zaXplO1xuICAgIHZhciB0eXBlID0gKGxlbmd0aCA8IDE2KSA/ICgweDgwICsgbGVuZ3RoKSA6IChsZW5ndGggPD0gMHhGRkZGKSA/IDB4ZGUgOiAweGRmO1xuICAgIHRva2VuW3R5cGVdKGVuY29kZXIsIGxlbmd0aCk7XG5cbiAgICB2YXIgZW5jb2RlID0gZW5jb2Rlci5jb2RlYy5lbmNvZGU7XG4gICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbih2YWwsIGtleSwgbSkge1xuICAgICAgZW5jb2RlKGVuY29kZXIsIGtleSk7XG4gICAgICBlbmNvZGUoZW5jb2RlciwgdmFsKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHJhdyAxNiAtLSAweGRhXG4gIC8vIHJhdyAzMiAtLSAweGRiXG4gIC8vIGZpeHJhdyAtLSAweGEwIC0gMHhiZlxuICBmdW5jdGlvbiByYXcoZW5jb2RlciwgdmFsdWUpIHtcbiAgICB2YXIgbGVuZ3RoID0gdmFsdWUubGVuZ3RoO1xuICAgIHZhciB0eXBlID0gKGxlbmd0aCA8IDMyKSA/ICgweGEwICsgbGVuZ3RoKSA6IChsZW5ndGggPD0gMHhGRkZGKSA/IDB4ZGEgOiAweGRiO1xuICAgIHRva2VuW3R5cGVdKGVuY29kZXIsIGxlbmd0aCk7XG4gICAgZW5jb2Rlci5zZW5kKHZhbHVlKTtcbiAgfVxufVxuIiwiLy8gd3JpdGUtdW5pdDguanNcblxudmFyIGNvbnN0YW50ID0gZXhwb3J0cy51aW50OCA9IG5ldyBBcnJheSgyNTYpO1xuXG5mb3IgKHZhciBpID0gMHgwMDsgaSA8PSAweEZGOyBpKyspIHtcbiAgY29uc3RhbnRbaV0gPSB3cml0ZTAoaSk7XG59XG5cbmZ1bmN0aW9uIHdyaXRlMCh0eXBlKSB7XG4gIHJldHVybiBmdW5jdGlvbihlbmNvZGVyKSB7XG4gICAgdmFyIG9mZnNldCA9IGVuY29kZXIucmVzZXJ2ZSgxKTtcbiAgICBlbmNvZGVyLmJ1ZmZlcltvZmZzZXRdID0gdHlwZTtcbiAgfTtcbn1cbiIsImltcG9ydCB7IHBhZ2UgfSBmcm9tIFwiLi9wYWdlL3Byb3h5XCI7XG5pbXBvcnQgKiBhcyBDYW52YXNSZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvUmVkcmF3Q2FudmFzXCI7XG5pbXBvcnQgeyBTdGRpbiB9IGZyb20gXCIuL1N0ZGluXCI7XG5pbXBvcnQgeyBTdGRvdXQgfSBmcm9tIFwiLi9TdGRvdXRcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG5lb3ZpbShcbiAgICAgICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCxcbiAgICAgICAgeyBwb3J0LCBwYXNzd29yZCB9OiB7IHBvcnQ6IG51bWJlciwgcGFzc3dvcmQ6IG51bWJlciB9LFxuICAgICkge1xuICAgIGNvbnN0IGZ1bmN0aW9uczogYW55ID0ge307XG4gICAgY29uc3QgcmVxdWVzdHMgPSBuZXcgTWFwPG51bWJlciwgeyByZXNvbHZlOiBhbnksIHJlamVjdDogYW55IH0+KCk7XG5cbiAgICBDYW52YXNSZW5kZXJlci5zZXRGdW5jdGlvbnMoZnVuY3Rpb25zKTtcbiAgICBDYW52YXNSZW5kZXJlci5zZXRDYW52YXMoY2FudmFzKTtcblxuICAgIGxldCBwcmV2Tm90aWZpY2F0aW9uUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIGNvbnN0IHNvY2tldCA9IG5ldyBXZWJTb2NrZXQoYHdzOi8vMTI3LjAuMC4xOiR7cG9ydH0vJHtwYXNzd29yZH1gKTtcbiAgICBzb2NrZXQuYmluYXJ5VHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcbiAgICBzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsICgoXzogYW55KSA9PiB7XG4gICAgICAgIHByZXZOb3RpZmljYXRpb25Qcm9taXNlID0gcHJldk5vdGlmaWNhdGlvblByb21pc2UuZmluYWxseSgoKSA9PiBwYWdlLmtpbGxFZGl0b3IoKSk7XG4gICAgfSkpO1xuICAgIGF3YWl0IChuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNvY2tldC5hZGRFdmVudExpc3RlbmVyKFwib3BlblwiLCAoKSA9PiB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICB9KSkpO1xuICAgIGNvbnN0IHN0ZGluID0gbmV3IFN0ZGluKHNvY2tldCk7XG4gICAgY29uc3Qgc3Rkb3V0ID0gbmV3IFN0ZG91dChzb2NrZXQpO1xuXG4gICAgbGV0IHJlcUlkID0gMDtcbiAgICBjb25zdCByZXF1ZXN0ID0gKGFwaTogc3RyaW5nLCBhcmdzOiBhbnlbXSkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcmVxSWQgKz0gMTtcbiAgICAgICAgICAgIHJlcXVlc3RzLnNldChyZXFJZCwge3Jlc29sdmUsIHJlamVjdH0pO1xuICAgICAgICAgICAgc3RkaW4ud3JpdGUocmVxSWQsIGFwaSwgYXJncyk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgc3Rkb3V0LmFkZExpc3RlbmVyKFwicmVxdWVzdFwiLCAoX2lkOiBhbnksIF9uYW1lOiBhbnksIF9hcmdzOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9KTtcbiAgICBzdGRvdXQuYWRkTGlzdGVuZXIoXCJyZXNwb25zZVwiLCAoaWQ6IGFueSwgZXJyb3I6IGFueSwgcmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgciA9IHJlcXVlc3RzLmdldChpZCk7XG4gICAgICAgIGlmICghcikge1xuICAgICAgICAgICAgLy8gVGhpcyBjYW4ndCBoYXBwZW4gYW5kIHlldCBpdCBzb21ldGltZXMgZG9lcywgcG9zc2libHkgZHVlIHRvIGEgZmlyZWZveCBidWdcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFJlY2VpdmVkIGFuc3dlciB0byAke2lkfSBidXQgbm8gaGFuZGxlciBmb3VuZCFgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlcXVlc3RzLmRlbGV0ZShpZCk7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByLnJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHIucmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgbGFzdExvc3RGb2N1cyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIHN0ZG91dC5hZGRMaXN0ZW5lcihcIm5vdGlmaWNhdGlvblwiLCBhc3luYyAobmFtZTogc3RyaW5nLCBhcmdzOiBhbnlbXSkgPT4ge1xuICAgICAgICBpZiAobmFtZSA9PT0gXCJyZWRyYXdcIiAmJiBhcmdzKSB7XG4gICAgICAgICAgICBDYW52YXNSZW5kZXJlci5vblJlZHJhdyhhcmdzKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBwcmV2Tm90aWZpY2F0aW9uUHJvbWlzZSA9IHByZXZOb3RpZmljYXRpb25Qcm9taXNlLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgICAgLy8gQSB2ZXJ5IHRyaWNreSBzZXF1ZW5jZSBvZiBldmVudHMgY291bGQgaGFwcGVuIGhlcmU6XG4gICAgICAgICAgICAvLyAtIGZpcmVudmltX2J1ZndyaXRlIGlzIHJlY2VpdmVkIHBhZ2Uuc2V0RWxlbWVudENvbnRlbnQgaXMgY2FsbGVkXG4gICAgICAgICAgICAvLyAgIGFzeW5jaHJvbm91c2x5XG4gICAgICAgICAgICAvLyAtIGZpcmVudmltX2ZvY3VzX3BhZ2UgaXMgY2FsbGVkLCBwYWdlLmZvY3VzUGFnZSgpIGlzIGNhbGxlZFxuICAgICAgICAgICAgLy8gICBhc3luY2hyb25vdXNseSwgbGFzdExvc3RGb2N1cyBpcyBzZXQgdG8gbm93XG4gICAgICAgICAgICAvLyAtIHBhZ2Uuc2V0RWxlbWVudENvbnRlbnQgY29tcGxldGVzLCBsYXN0TG9zdEZvY3VzIGlzIGNoZWNrZWQgdG8gc2VlXG4gICAgICAgICAgICAvLyAgIGlmIGZvY3VzIHNob3VsZCBiZSBncmFiYmVkIG9yIG5vdFxuICAgICAgICAgICAgLy8gVGhhdCdzIHdoeSB3ZSBoYXZlIHRvIGNoZWNrIGZvciBsYXN0TG9zdEZvY3VzIGFmdGVyXG4gICAgICAgICAgICAvLyBwYWdlLnNldEVsZW1lbnRDb250ZW50L0N1cnNvciEgU2FtZSB0aGluZyBmb3IgZmlyZW52aW1fcHJlc3Nfa2V5c1xuICAgICAgICAgICAgY29uc3QgaGFkRm9jdXMgPSBkb2N1bWVudC5oYXNGb2N1cygpO1xuICAgICAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImZpcmVudmltX2J1ZndyaXRlXCI6XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGFyZ3NbMF0gYXMgeyB0ZXh0OiBzdHJpbmdbXSwgY3Vyc29yOiBbbnVtYmVyLCBudW1iZXJdIH07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYWdlLnNldEVsZW1lbnRDb250ZW50KGRhdGEudGV4dC5qb2luKFwiXFxuXCIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gcGFnZS5zZXRFbGVtZW50Q3Vyc29yKC4uLihkYXRhLmN1cnNvcikpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYWRGb2N1c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiAhZG9jdW1lbnQuaGFzRm9jdXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiAocGVyZm9ybWFuY2Uubm93KCkgLSBsYXN0TG9zdEZvY3VzID4gMzAwMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlIFwiZmlyZW52aW1fZXZhbF9qc1wiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFnZS5ldmFsSW5QYWdlKGFyZ3NbMF0pLmNhdGNoKF8gPT4gXykudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ3NbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0KFwibnZpbV9jYWxsX2Z1bmN0aW9uXCIsIFthcmdzWzFdLCBbSlNPTi5zdHJpbmdpZnkocmVzdWx0KV1dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY2FzZSBcImZpcmVudmltX2ZvY3VzX3BhZ2VcIjpcbiAgICAgICAgICAgICAgICAgICAgbGFzdExvc3RGb2N1cyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFnZS5mb2N1c1BhZ2UoKTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZmlyZW52aW1fZm9jdXNfaW5wdXRcIjpcbiAgICAgICAgICAgICAgICAgICAgbGFzdExvc3RGb2N1cyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFnZS5mb2N1c0lucHV0KCk7XG4gICAgICAgICAgICAgICAgY2FzZSBcImZpcmVudmltX2hpZGVfZnJhbWVcIjpcbiAgICAgICAgICAgICAgICAgICAgbGFzdExvc3RGb2N1cyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFnZS5oaWRlRWRpdG9yKCk7XG4gICAgICAgICAgICAgICAgY2FzZSBcImZpcmVudmltX3ByZXNzX2tleXNcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhZ2UucHJlc3NLZXlzKGFyZ3NbMF0pO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJmaXJlbnZpbV92aW1sZWF2ZVwiOlxuICAgICAgICAgICAgICAgICAgICBsYXN0TG9zdEZvY3VzID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYWdlLmtpbGxFZGl0b3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCB7IDA6IGNoYW5uZWwsIDE6IGFwaUluZm8gfSA9IChhd2FpdCByZXF1ZXN0KFwibnZpbV9nZXRfYXBpX2luZm9cIiwgW10pKSBhcyBJTnZpbUFwaUluZm87XG5cbiAgICBzdGRvdXQuc2V0VHlwZXMoYXBpSW5mby50eXBlcyk7XG5cbiAgICBPYmplY3QuYXNzaWduKGZ1bmN0aW9ucywgYXBpSW5mby5mdW5jdGlvbnNcbiAgICAgICAgLmZpbHRlcihmID0+IGYuZGVwcmVjYXRlZF9zaW5jZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAucmVkdWNlKChhY2MsIGN1cikgPT4ge1xuICAgICAgICAgICAgbGV0IG5hbWUgPSBjdXIubmFtZTtcbiAgICAgICAgICAgIGlmIChuYW1lLnN0YXJ0c1dpdGgoXCJudmltX1wiKSkge1xuICAgICAgICAgICAgICAgIG5hbWUgPSBuYW1lLnNsaWNlKDUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWNjW25hbWVdID0gKC4uLmFyZ3M6IGFueVtdKSA9PiByZXF1ZXN0KGN1ci5uYW1lLCBhcmdzKTtcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIHt9IGFzIHtbazogc3RyaW5nXTogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnl9KSk7XG4gICAgZnVuY3Rpb25zLmdldF9jdXJyZW50X2NoYW5uZWwgPSAoKSA9PiBjaGFubmVsO1xuICAgIHJldHVybiBmdW5jdGlvbnM7XG59XG4iLCJpbXBvcnQgKiBhcyBtc2dwYWNrIGZyb20gXCJtc2dwYWNrLWxpdGVcIjtcblxuZXhwb3J0IGNsYXNzIFN0ZGluIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc29ja2V0OiBXZWJTb2NrZXQpIHt9XG5cbiAgICBwdWJsaWMgd3JpdGUocmVxSWQ6IG51bWJlciwgbWV0aG9kOiBzdHJpbmcsIGFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGNvbnN0IHJlcSA9IFswLCByZXFJZCwgbWV0aG9kLCBhcmdzXTtcbiAgICAgICAgY29uc3QgZW5jb2RlZCA9IG1zZ3BhY2suZW5jb2RlKHJlcSk7XG4gICAgICAgIHRoaXMuc29ja2V0LnNlbmQoZW5jb2RlZCk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgKiBhcyBtc2dwYWNrIGZyb20gXCJtc2dwYWNrLWxpdGVcIjtcblxuZXhwb3J0IGNsYXNzIFN0ZG91dCB7XG4gICAgcHJpdmF0ZSBsaXN0ZW5lcnMgPSBuZXcgTWFwPHN0cmluZywgKCguLi5hcmdzOiBhbnlbXSkgPT4gYW55KVtdPigpO1xuICAgIHByaXZhdGUgbWVzc2FnZU5hbWVzID0gbmV3IE1hcChbWzAsIFwicmVxdWVzdFwiXSwgWzEsIFwicmVzcG9uc2VcIl0sIFsyLCBcIm5vdGlmaWNhdGlvblwiXV0pO1xuICAgIC8vIEhvbGRzIHByZXZpb3VzbHktcmVjZWl2ZWQsIGluY29tcGxldGUgYW5kIHVucHJvY2Vzc2VkIG1lc3NhZ2VzXG4gICAgcHJpdmF0ZSBwcmV2ID0gbmV3IFVpbnQ4QXJyYXkoMCk7XG4gICAgcHJpdmF0ZSBtc2dwYWNrQ29uZmlnID0ge30gYXMgbXNncGFjay5EZWNvZGVyT3B0aW9ucztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc29ja2V0OiBXZWJTb2NrZXQpIHtcbiAgICAgICAgdGhpcy5zb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5vbk1lc3NhZ2UuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZExpc3RlbmVyKGtpbmQ6IHN0cmluZywgbGlzdGVuZXI6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KSB7XG4gICAgICAgIGxldCBhcnIgPSB0aGlzLmxpc3RlbmVycy5nZXQoa2luZCk7XG4gICAgICAgIGlmICghYXJyKSB7XG4gICAgICAgICAgICBhcnIgPSBbXTtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzLnNldChraW5kLCBhcnIpO1xuICAgICAgICB9XG4gICAgICAgIGFyci5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0VHlwZXModHlwZXM6IHtba2V5OiBzdHJpbmddOiB7IGlkOiBudW1iZXIgfX0pIHtcbiAgICAgICAgdGhpcy5tc2dwYWNrQ29uZmlnLmNvZGVjID0gbXNncGFjay5jcmVhdGVDb2RlYyh7IHByZXNldDogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0XG4gICAgICAgICAgICAuZW50cmllcyh0eXBlcylcbiAgICAgICAgICAgIC5mb3JFYWNoKChbXywgeyBpZCB9XSkgPT5cbiAgICAgICAgICAgICAgICAgICAgIHRoaXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tc2dwYWNrQ29uZmlnXG4gICAgICAgICAgICAgICAgICAgICAgICAuY29kZWNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRFeHRVbnBhY2tlcihpZCwgKGRhdGE6IGFueSkgPT4gZGF0YSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25NZXNzYWdlKG1zZzogYW55KSB7XG4gICAgICAgIGNvbnN0IG1zZ0RhdGEgPSBuZXcgVWludDhBcnJheShtc2cuZGF0YSk7XG4gICAgICAgIGxldCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkobXNnRGF0YS5ieXRlTGVuZ3RoICsgdGhpcy5wcmV2LmJ5dGVMZW5ndGgpO1xuICAgICAgICBkYXRhLnNldCh0aGlzLnByZXYpO1xuICAgICAgICBkYXRhLnNldChtc2dEYXRhLCB0aGlzLnByZXYubGVuZ3RoKTtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIGxldCBkZWNvZGVkO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBkZWNvZGVkID0gbXNncGFjay5kZWNvZGUoZGF0YSwgdGhpcy5tc2dwYWNrQ29uZmlnKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXYgPSBkYXRhO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGVuY29kZWQgPSBtc2dwYWNrLmVuY29kZShkZWNvZGVkKTtcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLnNsaWNlKGVuY29kZWQuYnl0ZUxlbmd0aCk7XG4gICAgICAgICAgICBjb25zdCBba2luZCwgcmVxSWQsIGRhdGExLCBkYXRhMl0gPSBkZWNvZGVkO1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMubWVzc2FnZU5hbWVzLmdldChraW5kKTtcbiAgICAgICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlcnMgPSB0aGlzLmxpc3RlbmVycy5nZXQobmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKGhhbmRsZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBoYW5kbGVyIG9mIGhhbmRsZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyKHJlcUlkLCBkYXRhMSwgZGF0YTIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBDYW4ndCBiZSB0ZXN0ZWQgYmVjYXVzZSB0aGlzIHdvdWxkIG1lYW4gbWVzc2FnZXMgdGhhdCBicmVha1xuICAgICAgICAgICAgICAgIC8vIHRoZSBtc2dwYWNrLXJwYyBzcGVjLCBzbyBjb3ZlcmFnZSBpbXBvc3NpYmxlIHRvIGdldC5cbiAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFVuaGFuZGxlZCBtZXNzYWdlIGtpbmQgJHtuYW1lfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgZ2V0Q29uZiB9IGZyb20gXCIuLi91dGlscy9jb25maWd1cmF0aW9uXCI7XG5pbXBvcnQgeyBrZXlzVG9FdmVudHMgfSBmcm9tIFwiLi4vdXRpbHMva2V5c1wiO1xuaW1wb3J0IHsgRmlyZW52aW1FbGVtZW50IH0gZnJvbSBcIi4uL0ZpcmVudmltRWxlbWVudFwiO1xuaW1wb3J0IHsgZXhlY3V0ZUluUGFnZSB9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuXG5pbnRlcmZhY2UgSUdsb2JhbFN0YXRlIHtcbiAgICBkaXNhYmxlZDogYm9vbGVhbiB8IFByb21pc2U8Ym9vbGVhbj47XG4gICAgbGFzdEZvY3VzZWRDb250ZW50U2NyaXB0OiBudW1iZXI7XG4gICAgZmlyZW52aW1FbGVtczogTWFwPG51bWJlciwgRmlyZW52aW1FbGVtZW50PjtcbiAgICBmcmFtZUlkUmVzb2x2ZTogKF86IG51bWJlcikgPT4gdm9pZDtcbiAgICBudmltaWZ5OiAoZXZ0OiBGb2N1c0V2ZW50KSA9PiB2b2lkO1xufVxuXG5mdW5jdGlvbiBfZm9jdXNJbnB1dChnbG9iYWw6IElHbG9iYWxTdGF0ZSwgZmlyZW52aW06IEZpcmVudmltRWxlbWVudCwgYWRkTGlzdGVuZXI6IGJvb2xlYW4pIHtcbiAgICBpZiAoYWRkTGlzdGVuZXIpIHtcbiAgICAgICAgLy8gT25seSByZS1hZGQgZXZlbnQgbGlzdGVuZXIgaWYgaW5wdXQncyBzZWxlY3RvciBtYXRjaGVzIHRoZSBvbmVzXG4gICAgICAgIC8vIHRoYXQgc2hvdWxkIGJlIGF1dG9udmltaWZpZWRcbiAgICAgICAgY29uc3QgY29uZiA9IGdldENvbmYoKTtcbiAgICAgICAgaWYgKGNvbmYuc2VsZWN0b3IgJiYgY29uZi5zZWxlY3RvciAhPT0gXCJcIikge1xuICAgICAgICAgICAgY29uc3QgZWxlbXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY29uZi5zZWxlY3RvcikpO1xuICAgICAgICAgICAgYWRkTGlzdGVuZXIgPSBlbGVtcy5pbmNsdWRlcyhmaXJlbnZpbS5nZXRFbGVtZW50KCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZpcmVudmltLmZvY3VzT3JpZ2luYWxFbGVtZW50KGFkZExpc3RlbmVyKTtcbn1cblxuZnVuY3Rpb24gZ2V0Rm9jdXNlZEVsZW1lbnQgKGZpcmVudmltRWxlbXM6IE1hcDxudW1iZXIsIEZpcmVudmltRWxlbWVudD4pIHtcbiAgICByZXR1cm4gQXJyYXlcbiAgICAgICAgLmZyb20oZmlyZW52aW1FbGVtcy52YWx1ZXMoKSlcbiAgICAgICAgLmZpbmQoaW5zdGFuY2UgPT4gaW5zdGFuY2UuaXNGb2N1c2VkKCkpO1xufVxuXG4vLyBUYWIgZnVuY3Rpb25zIGFyZSBmdW5jdGlvbnMgYWxsIGNvbnRlbnQgc2NyaXB0cyBzaG91bGQgcmVhY3QgdG9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUYWJGdW5jdGlvbnMoZ2xvYmFsOiBJR2xvYmFsU3RhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRBY3RpdmVJbnN0YW5jZUNvdW50IDogKCkgPT4gZ2xvYmFsLmZpcmVudmltRWxlbXMuc2l6ZSxcbiAgICAgICAgcmVnaXN0ZXJOZXdGcmFtZUlkOiAoZnJhbWVJZDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwuZnJhbWVJZFJlc29sdmUoZnJhbWVJZCk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldERpc2FibGVkOiAoZGlzYWJsZWQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgIGdsb2JhbC5kaXNhYmxlZCA9IGRpc2FibGVkO1xuICAgICAgICB9LFxuICAgICAgICBzZXRMYXN0Rm9jdXNlZENvbnRlbnRTY3JpcHQ6IChmcmFtZUlkOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGdsb2JhbC5sYXN0Rm9jdXNlZENvbnRlbnRTY3JpcHQgPSBmcmFtZUlkO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gaXNWaXNpYmxlKGU6IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3QgcmVjdCA9IGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3Qgdmlld0hlaWdodCA9IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgcmV0dXJuICEocmVjdC5ib3R0b20gPCAwIHx8IHJlY3QudG9wIC0gdmlld0hlaWdodCA+PSAwKTtcbn1cblxuLy8gQWN0aXZlQ29udGVudCBmdW5jdGlvbnMgYXJlIGZ1bmN0aW9ucyBvbmx5IHRoZSBhY3RpdmUgY29udGVudCBzY3JpcHQgc2hvdWxkIHJlYWN0IHRvXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWN0aXZlQ29udGVudEZ1bmN0aW9ucyhnbG9iYWw6IElHbG9iYWxTdGF0ZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGZvcmNlTnZpbWlmeTogKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVsZW0gPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgICAgICAgY29uc3QgaXNOdWxsID0gZWxlbSA9PT0gbnVsbCB8fCBlbGVtID09PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjb25zdCBwYWdlTm90RWRpdGFibGUgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY29udGVudEVkaXRhYmxlICE9PSBcInRydWVcIjtcbiAgICAgICAgICAgIGNvbnN0IGJvZHlOb3RFZGl0YWJsZSA9IChkb2N1bWVudC5ib2R5LmNvbnRlbnRFZGl0YWJsZSA9PT0gXCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCAoZG9jdW1lbnQuYm9keS5jb250ZW50RWRpdGFibGUgPT09IFwiaW5oZXJpdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNvbnRlbnRFZGl0YWJsZSAhPT0gXCJ0cnVlXCIpKTtcbiAgICAgICAgICAgIGlmIChpc051bGxcbiAgICAgICAgICAgICAgICB8fCAoZWxlbSA9PT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIHBhZ2VOb3RFZGl0YWJsZSlcbiAgICAgICAgICAgICAgICB8fCAoZWxlbSA9PT0gZG9jdW1lbnQuYm9keSAmJiBib2R5Tm90RWRpdGFibGUpKSB7XG4gICAgICAgICAgICAgICAgZWxlbSA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0ZXh0YXJlYVwiKSlcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoaXNWaXNpYmxlKTtcbiAgICAgICAgICAgICAgICBpZiAoIWVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbSA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpbnB1dFwiKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKGUgPT4gZS50eXBlID09PSBcInRleHRcIiAmJiBpc1Zpc2libGUoZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdsb2JhbC5udmltaWZ5KHsgdGFyZ2V0OiBlbGVtIH0gYXMgYW55KTtcbiAgICAgICAgfSxcbiAgICAgICAgc2VuZEtleTogKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaXJlbnZpbSA9IGdldEZvY3VzZWRFbGVtZW50KGdsb2JhbC5maXJlbnZpbUVsZW1zKTtcbiAgICAgICAgICAgIGlmIChmaXJlbnZpbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZmlyZW52aW0uc2VuZEtleShrZXkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBJdCdzIGltcG9ydGFudCB0byB0aHJvdyB0aGlzIGVycm9yIGFzIHRoZSBiYWNrZ3JvdW5kIHNjcmlwdFxuICAgICAgICAgICAgICAgIC8vIHdpbGwgZXhlY3V0ZSBhIGZhbGxiYWNrXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gZmlyZW52aW0gZnJhbWUgc2VsZWN0ZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE5lb3ZpbUZyYW1lRnVuY3Rpb25zKGdsb2JhbDogSUdsb2JhbFN0YXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZXZhbEluUGFnZTogKF86IG51bWJlciwganM6IHN0cmluZykgPT4gZXhlY3V0ZUluUGFnZShqcyksXG4gICAgICAgIGZvY3VzSW5wdXQ6IChmcmFtZUlkOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGxldCBmaXJlbnZpbUVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAoZnJhbWVJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZmlyZW52aW1FbGVtZW50ID0gZ2V0Rm9jdXNlZEVsZW1lbnQoZ2xvYmFsLmZpcmVudmltRWxlbXMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmaXJlbnZpbUVsZW1lbnQgPSBnbG9iYWwuZmlyZW52aW1FbGVtcy5nZXQoZnJhbWVJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfZm9jdXNJbnB1dChnbG9iYWwsIGZpcmVudmltRWxlbWVudCwgdHJ1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZvY3VzUGFnZTogKGZyYW1lSWQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlyZW52aW1FbGVtZW50ID0gZ2xvYmFsLmZpcmVudmltRWxlbXMuZ2V0KGZyYW1lSWQpO1xuICAgICAgICAgICAgZmlyZW52aW1FbGVtZW50LmNsZWFyRm9jdXNMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIChkb2N1bWVudC5hY3RpdmVFbGVtZW50IGFzIGFueSkuYmx1cigpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldEVkaXRvckluZm86IChmcmFtZUlkOiBudW1iZXIpID0+IGdsb2JhbFxuICAgICAgICAgICAgLmZpcmVudmltRWxlbXNcbiAgICAgICAgICAgIC5nZXQoZnJhbWVJZClcbiAgICAgICAgICAgIC5nZXRCdWZmZXJJbmZvKCksXG4gICAgICAgIGdldEVsZW1lbnRDb250ZW50OiAoZnJhbWVJZDogbnVtYmVyKSA9PiBnbG9iYWxcbiAgICAgICAgICAgIC5maXJlbnZpbUVsZW1zXG4gICAgICAgICAgICAuZ2V0KGZyYW1lSWQpXG4gICAgICAgICAgICAuZ2V0UGFnZUVsZW1lbnRDb250ZW50KCksXG4gICAgICAgIGhpZGVFZGl0b3I6IChmcmFtZUlkOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpcmVudmltID0gZ2xvYmFsLmZpcmVudmltRWxlbXMuZ2V0KGZyYW1lSWQpO1xuICAgICAgICAgICAgZmlyZW52aW0uaGlkZSgpO1xuICAgICAgICAgICAgX2ZvY3VzSW5wdXQoZ2xvYmFsLCBmaXJlbnZpbSwgdHJ1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGtpbGxFZGl0b3I6IChmcmFtZUlkOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpcmVudmltID0gZ2xvYmFsLmZpcmVudmltRWxlbXMuZ2V0KGZyYW1lSWQpO1xuICAgICAgICAgICAgY29uc3QgaXNGb2N1c2VkID0gZmlyZW52aW0uaXNGb2N1c2VkKCk7XG4gICAgICAgICAgICBmaXJlbnZpbS5kZXRhY2hGcm9tUGFnZSgpO1xuICAgICAgICAgICAgY29uc3QgY29uZiA9IGdldENvbmYoKTtcbiAgICAgICAgICAgIGlmIChpc0ZvY3VzZWQpIHtcbiAgICAgICAgICAgICAgICBfZm9jdXNJbnB1dChnbG9iYWwsIGZpcmVudmltLCBjb25mLnRha2VvdmVyICE9PSBcIm9uY2VcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnbG9iYWwuZmlyZW52aW1FbGVtcy5kZWxldGUoZnJhbWVJZCk7XG4gICAgICAgIH0sXG4gICAgICAgIHByZXNzS2V5czogKGZyYW1lSWQ6IG51bWJlciwga2V5czogc3RyaW5nW10pID0+IHtcbiAgICAgICAgICAgIGdsb2JhbC5maXJlbnZpbUVsZW1zLmdldChmcmFtZUlkKS5wcmVzc0tleXMoa2V5c1RvRXZlbnRzKGtleXMpKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVzaXplRWRpdG9yOiAoZnJhbWVJZDogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbSA9IGdsb2JhbC5maXJlbnZpbUVsZW1zLmdldChmcmFtZUlkKTtcbiAgICAgICAgICAgIGVsZW0ucmVzaXplVG8od2lkdGgsIGhlaWdodCwgdHJ1ZSk7XG4gICAgICAgICAgICBlbGVtLnB1dEVkaXRvckNsb3NlVG9JbnB1dE9yaWdpbkFmdGVyUmVzaXplRnJvbUZyYW1lKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldEVsZW1lbnRDb250ZW50OiAoZnJhbWVJZDogbnVtYmVyLCB0ZXh0OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBnbG9iYWwuZmlyZW52aW1FbGVtcy5nZXQoZnJhbWVJZCkuc2V0UGFnZUVsZW1lbnRDb250ZW50KHRleHQpO1xuICAgICAgICB9LFxuICAgICAgICBzZXRFbGVtZW50Q3Vyc29yOiAoZnJhbWVJZDogbnVtYmVyLCBsaW5lOiBudW1iZXIsIGNvbHVtbjogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZ2xvYmFsLmZpcmVudmltRWxlbXMuZ2V0KGZyYW1lSWQpLnNldFBhZ2VFbGVtZW50Q3Vyc29yKGxpbmUsIGNvbHVtbik7XG4gICAgICAgIH0sXG4gICAgfTtcbn1cbiIsImltcG9ydCB7IGdldE5lb3ZpbUZyYW1lRnVuY3Rpb25zIH0gZnJvbSBcIi4vZnVuY3Rpb25zXCI7XG5cbi8vIFdlIGRvbid0IG5lZWQgdG8gZ2l2ZSByZWFsIHZhbHVlcyB0byBnZXRGdW5jdGlvbnMgc2luY2Ugd2UncmUgb25seSB0cnlpbmcgdG9cbi8vIGdldCB0aGUgbmFtZSBvZiBmdW5jdGlvbnMgdGhhdCBleGlzdCBpbiB0aGUgcGFnZS5cbmNvbnN0IGZ1bmN0aW9ucyA9IGdldE5lb3ZpbUZyYW1lRnVuY3Rpb25zKHt9IGFzIGFueSk7XG5cbnR5cGUgZnQgPSB0eXBlb2YgZnVuY3Rpb25zO1xuLy8gVGhlIHByb3h5IGF1dG9tYXRpY2FsbHkgYXBwZW5kcyB0aGUgZnJhbWVJZCB0byB0aGUgcmVxdWVzdCwgc28gd2UgaGlkZSB0aGF0IGZyb20gdXNlcnNcbnR5cGUgQXJndW1lbnRzVHlwZTxUPiA9IFQgZXh0ZW5kcyAoeDogYW55LCAuLi5hcmdzOiBpbmZlciBVKSA9PiBhbnkgPyBVOiBuZXZlcjtcbnR5cGUgUHJvbWlzaWZ5PFQ+ID0gVCBleHRlbmRzIFByb21pc2U8YW55PiA/IFQgOiBQcm9taXNlPFQ+O1xuXG5leHBvcnQgY29uc3QgcGFnZSA9IHt9IGFzIHtcbiAgICBbayBpbiBrZXlvZiBmdF06ICguLi5hcmdzOiBBcmd1bWVudHNUeXBlPGZ0W2tdPikgPT4gUHJvbWlzaWZ5PFJldHVyblR5cGU8ZnRba10+PlxufTtcblxubGV0IGZ1bmNOYW1lOiBrZXlvZiB0eXBlb2YgZnVuY3Rpb25zO1xuZm9yIChmdW5jTmFtZSBpbiBmdW5jdGlvbnMpIHtcbiAgICAvLyBXZSBuZWVkIHRvIGRlY2xhcmUgZnVuYyBoZXJlIGJlY2F1c2UgZnVuY05hbWUgaXMgYSBnbG9iYWwgYW5kIHdvdWxkIG5vdFxuICAgIC8vIGJlIGNhcHR1cmVkIGluIHRoZSBjbG9zdXJlIG90aGVyd2lzZVxuICAgIGNvbnN0IGZ1bmMgPSBmdW5jTmFtZTtcbiAgICBwYWdlW2Z1bmNdID0gKCguLi5hcnI6IGFueVtdKSA9PiB7XG4gICAgICAgIHJldHVybiBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgYXJnczoge1xuICAgICAgICAgICAgICAgIGFyZ3M6IFsod2luZG93IGFzIGFueSkuZnJhbWVJZF0uY29uY2F0KGFyciksXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6IFtmdW5jXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jTmFtZTogW1wibWVzc2FnZVBhZ2VcIl0sXG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgcGFnZSB9IGZyb20gXCIuLi9wYWdlL3Byb3h5XCI7XG5pbXBvcnQgeyBwYXJzZUd1aWZvbnQsIHRvSGV4Q3NzIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgeyBOdmltTW9kZSB9IGZyb20gXCIuLi91dGlscy9jb25maWd1cmF0aW9uXCI7XG5cbmxldCBmdW5jdGlvbnM6IGFueTtcbmV4cG9ydCBmdW5jdGlvbiBzZXRGdW5jdGlvbnMoZm5zOiBhbnkpIHtcbiAgICBmdW5jdGlvbnMgPSBmbnM7XG59XG5cbmxldCBnbHlwaENhY2hlIDogYW55ID0ge307XG5mdW5jdGlvbiB3aXBlR2x5cGhDYWNoZSgpIHtcbiAgICBnbHlwaENhY2hlID0ge307XG59XG5cbmxldCBtZXRyaWNzSW52YWxpZGF0ZWQgPSBmYWxzZTtcblxuZnVuY3Rpb24gaW52YWxpZGF0ZU1ldHJpY3MoKSB7XG4gICAgbWV0cmljc0ludmFsaWRhdGVkID0gdHJ1ZTtcbiAgICB3aXBlR2x5cGhDYWNoZSgpO1xufVxuXG5sZXQgZm9udFN0cmluZyA6IHN0cmluZztcbmZ1bmN0aW9uIHNldEZvbnRTdHJpbmcgKHN0YXRlOiBTdGF0ZSwgcyA6IHN0cmluZykge1xuICAgIGZvbnRTdHJpbmcgPSBzO1xuICAgIHN0YXRlLmNvbnRleHQuZm9udCA9IGZvbnRTdHJpbmc7XG4gICAgaW52YWxpZGF0ZU1ldHJpY3MoKTtcbn1cbmZ1bmN0aW9uIGdseXBoSWQoY2hhcjogc3RyaW5nLCBoaWdoOiBudW1iZXIpIHtcbiAgICByZXR1cm4gY2hhciArIFwiLVwiICsgaGlnaDtcbn1cbmZ1bmN0aW9uIHNldENhbnZhc0RpbWVuc2lvbnMgKGN2czogSFRNTENhbnZhc0VsZW1lbnQsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgY3ZzLndpZHRoID0gd2lkdGggKiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcbiAgICBjdnMuaGVpZ2h0ID0gaGVpZ2h0ICogd2luZG93LmRldmljZVBpeGVsUmF0aW87XG4gICAgY3ZzLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9cHhgO1xuICAgIGN2cy5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9cHhgO1xufVxuZnVuY3Rpb24gbWFrZUZvbnRTdHJpbmcoZm9udFNpemU6IHN0cmluZywgZm9udEZhbWlseTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGAke2ZvbnRTaXplfSAke2ZvbnRGYW1pbHl9YDtcbn1cbmxldCBkZWZhdWx0Rm9udFNpemUgPSBcIlwiO1xuY29uc3QgZGVmYXVsdEZvbnRGYW1pbHkgPSBcIm1vbm9zcGFjZVwiO1xubGV0IGRlZmF1bHRGb250U3RyaW5nID0gXCJcIjtcbmV4cG9ydCBmdW5jdGlvbiBzZXRDYW52YXMgKGN2czogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICBjb25zdCBzdGF0ZSA9IGdsb2JhbFN0YXRlO1xuICAgIHN0YXRlLmNhbnZhcyA9IGN2cztcbiAgICBzZXRDYW52YXNEaW1lbnNpb25zKHN0YXRlLmNhbnZhcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICBkZWZhdWx0Rm9udFNpemUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzdGF0ZS5jYW52YXMpLmZvbnRTaXplO1xuICAgIGRlZmF1bHRGb250U3RyaW5nID0gbWFrZUZvbnRTdHJpbmcoZGVmYXVsdEZvbnRTaXplLCBkZWZhdWx0Rm9udEZhbWlseSk7XG4gICAgc3RhdGUuY29udGV4dCA9IHN0YXRlLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiwgeyBcImFscGhhXCI6IGZhbHNlIH0pO1xuICAgIHNldEZvbnRTdHJpbmcoc3RhdGUsIGRlZmF1bHRGb250U3RyaW5nKTtcbn1cblxuLy8gV2UgZmlyc3QgZGVmaW5lIGhpZ2hsaWdodCBpbmZvcm1hdGlvbi5cbmNvbnN0IGRlZmF1bHRCYWNrZ3JvdW5kID0gXCIjRkZGRkZGXCI7XG5jb25zdCBkZWZhdWx0Rm9yZWdyb3VuZCA9IFwiIzAwMDAwMFwiO1xudHlwZSBIaWdobGlnaHRJbmZvID0ge1xuICAgIGJhY2tncm91bmQ6IHN0cmluZyxcbiAgICBib2xkOiBib29sZWFuLFxuICAgIGJsZW5kOiBudW1iZXIsXG4gICAgZm9yZWdyb3VuZDogc3RyaW5nLFxuICAgIGl0YWxpYzogYm9vbGVhbixcbiAgICByZXZlcnNlOiBib29sZWFuLFxuICAgIHNwZWNpYWw6IHN0cmluZyxcbiAgICBzdHJpa2V0aHJvdWdoOiBib29sZWFuLFxuICAgIHVuZGVyY3VybDogYm9vbGVhbixcbiAgICB1bmRlcmxpbmU6IGJvb2xlYW5cbn07XG5cbi8vIFdlIHRoZW4gaGF2ZSBhIEdyaWRTaXplIHR5cGUuIFdlIG5lZWQgdGhpcyB0eXBlIGluIG9yZGVyIHRvIGtlZXAgdHJhY2sgb2Zcbi8vIHRoZSBzaXplIG9mIGdyaWRzLiBTdG9yaW5nIHRoaXMgaW5mb3JtYXRpb24gaGVyZSBjYW4gYXBwZWFyIHJlZHVuZGFudCBzaW5jZVxuLy8gdGhlIGdyaWRzIGFyZSByZXByZXNlbnRlZCBhcyBhcnJheXMgYW5kIHRodXMgaGF2ZSBhIC5sZW5ndGggYXR0cmlidXRlLCBidXRcbi8vIGl0J3Mgbm90OiBzdG9yaW5nIGdyaWQgc2l6ZSBpbiBhIHNlcGFyYXRlIGRhdGFzdHJ1Y3R1cmUgYWxsb3dzIHVzIHRvIG5ldmVyXG4vLyBoYXZlIHRvIHNocmluayBhcnJheXMsIGFuZCB0byBub3QgbmVlZCBhbGxvY2F0aW9ucyBpZiBlbmxhcmdpbmcgYW4gYXJyYXlcbi8vIHRoYXQgaGFzIGJlZW4gc2hyaW5rZWQuXG50eXBlIEdyaWREaW1lbnNpb25zID0ge1xuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG59O1xuXG5lbnVtIERhbWFnZUtpbmQge1xuICAgIENlbGwsXG4gICAgUmVzaXplLFxuICAgIFNjcm9sbCxcbn1cblxuLy8gVXNlZCB0byB0cmFjayByZWN0YW5nbGVzIG9mIGRhbWFnZSBkb25lIHRvIGEgZ3JpZCBhbmQgb25seSByZXBhaW50IHRoZVxuLy8gbmVjZXNzYXJ5IGJpdHMuIFRoZXNlIGFyZSBsb2dpYyBwb3NpdGlvbnMgKGkuZS4gY2VsbHMpIC0gbm90IHBpeGVscy5cbnR5cGUgQ2VsbERhbWFnZSA9IHtcbiAgICBraW5kOiBEYW1hZ2VLaW5kLFxuICAgIC8vIFRoZSBudW1iZXIgb2Ygcm93cyB0aGUgZGFtYWdlIHNwYW5zXG4gICAgaDogbnVtYmVyLFxuICAgIC8vIFRoZSBudW1iZXIgb2YgY29sdW1ucyB0aGUgZGFtYWdlIHNwYW5zXG4gICAgdzogbnVtYmVyLFxuICAgIC8vIFRoZSBjb2x1bW4gdGhlIGRhbWFnZSBiZWdpbnMgYXRcbiAgICB4OiBudW1iZXIsXG4gICAgLy8gVGhlIHJvdyB0aGUgZGFtYWdlIGJlZ2lucyBhdFxuICAgIHk6IG51bWJlcixcbn07XG5cbnR5cGUgUmVzaXplRGFtYWdlID0ge1xuICAgIGtpbmQ6IERhbWFnZUtpbmQsXG4gICAgLy8gVGhlIG5ldyBoZWlnaHQgb2YgdGhlIGNhbnZhc1xuICAgIGg6IG51bWJlcixcbiAgICAvLyBUaGUgbmV3IHdpZHRoIG9mIHRoZSBjYW52YXNcbiAgICB3OiBudW1iZXIsXG4gICAgLy8gVGhlIHByZXZpb3VzIHdpZHRoIG9mIHRoZSBjYW52YXNcbiAgICB4OiBudW1iZXIsXG4gICAgLy8gVGhlIHByZXZpb3VzIGhlaWdodCBvZiB0aGUgY2FudmFzXG4gICAgeTogbnVtYmVyLFxufTtcblxudHlwZSBTY3JvbGxEYW1hZ2UgPSB7XG4gICAga2luZDogRGFtYWdlS2luZCxcbiAgICAvLyBUaGUgZGlyZWN0aW9uIG9mIHRoZSBzY3JvbGwsIC0xIG1lYW5zIHVwLCAxIG1lYW5zIGRvd25cbiAgICBoOiBudW1iZXIsXG4gICAgLy8gVGhlIG51bWJlciBvZiBsaW5lcyBvZiB0aGUgc2Nyb2xsLCBwb3NpdGl2ZSBudW1iZXJcbiAgICB3OiBudW1iZXIsXG4gICAgLy8gVGhlIHRvcCBsaW5lIG9mIHRoZSBzY3JvbGxpbmcgcmVnaW9uLCBpbiBjZWxsc1xuICAgIHg6IG51bWJlcixcbiAgICAvLyBUaGUgYm90dG9tIGxpbmUgb2YgdGhlIHNjcm9sbGluZyByZWdpb24sIGluIGNlbGxzXG4gICAgeTogbnVtYmVyLFxufTtcblxudHlwZSBHcmlkRGFtYWdlID0gQ2VsbERhbWFnZSAmIFJlc2l6ZURhbWFnZSAmIFNjcm9sbERhbWFnZTtcblxuLy8gVGhlIHN0YXRlIG9mIHRoZSBjb21tYW5kbGluZS4gSXQgaXMgb25seSB1c2VkIHdoZW4gdXNpbmcgbmVvdmltJ3MgZXh0ZXJuYWxcbi8vIGNvbW1hbmRsaW5lLlxudHlwZSBDb21tYW5kTGluZVN0YXRlID0ge1xuICAgIHN0YXR1czogXCJoaWRkZW5cIiB8IFwic2hvd25cIixcbiAgICBjb250ZW50OiBbYW55LCBzdHJpbmddW10sXG4gICAgcG9zOiBudW1iZXIsXG4gICAgZmlyc3RjOiBzdHJpbmcsXG4gICAgcHJvbXB0OiBzdHJpbmcsXG4gICAgaW5kZW50OiBudW1iZXIsXG4gICAgbGV2ZWw6IG51bWJlclxufTtcblxudHlwZSBDdXJzb3IgPSB7XG4gICAgY3VycmVudEdyaWQ6IG51bWJlcixcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIGxhc3RNb3ZlOiBET01IaWdoUmVzVGltZVN0YW1wLFxufTtcblxudHlwZSBNb2RlID0ge1xuICAgIGN1cnJlbnQ6IG51bWJlcixcbiAgICBzdHlsZUVuYWJsZWQ6IGJvb2xlYW4sXG4gICAgbW9kZUluZm86IHtcbiAgICAgICAgYXR0cl9pZDogbnVtYmVyLFxuICAgICAgICBhdHRyX2lkX2xtOiBudW1iZXIsXG4gICAgICAgIGJsaW5rb2ZmOiBudW1iZXIsXG4gICAgICAgIGJsaW5rb246IG51bWJlcixcbiAgICAgICAgYmxpbmt3YWl0OiBudW1iZXIsXG4gICAgICAgIGNlbGxfcGVyY2VudGFnZTogbnVtYmVyLFxuICAgICAgICBjdXJzb3Jfc2hhcGU6IHN0cmluZyxcbiAgICAgICAgbmFtZTogTnZpbU1vZGUsXG4gICAgfVtdLFxufTtcblxudHlwZSBNZXNzYWdlID0gW251bWJlciwgc3RyaW5nXVtdO1xudHlwZSBNZXNzYWdlc1Bvc2l0aW9uID0geyB4OiBudW1iZXIsIHk6IG51bWJlciB9O1xuXG50eXBlIFN0YXRlID0ge1xuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsXG4gICAgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFxuICAgIGNvbW1hbmRMaW5lIDogQ29tbWFuZExpbmVTdGF0ZSxcbiAgICBjdXJzb3I6IEN1cnNvcixcbiAgICBncmlkQ2hhcmFjdGVyczogc3RyaW5nW11bXVtdLFxuICAgIGdyaWREYW1hZ2VzOiBHcmlkRGFtYWdlW11bXSxcbiAgICBncmlkRGFtYWdlc0NvdW50OiBudW1iZXJbXSxcbiAgICBncmlkSGlnaGxpZ2h0czogbnVtYmVyW11bXVtdLFxuICAgIGdyaWRTaXplczogR3JpZERpbWVuc2lvbnNbXSxcbiAgICBoaWdobGlnaHRzOiBIaWdobGlnaHRJbmZvW10sXG4gICAgbGluZXNwYWNlOiBudW1iZXIsXG4gICAgbWVzc2FnZXM6IE1lc3NhZ2VbXSxcbiAgICBtZXNzYWdlc1Bvc2l0aW9uczogTWVzc2FnZXNQb3NpdGlvbltdLFxuICAgIG1vZGU6IE1vZGUsXG4gICAgcnVsZXI6IE1lc3NhZ2UsXG4gICAgc2hvd2NtZDogTWVzc2FnZSxcbiAgICBzaG93bW9kZTogTWVzc2FnZSxcbn07XG5cbmNvbnN0IGdsb2JhbFN0YXRlOiBTdGF0ZSA9IHtcbiAgICBjYW52YXM6IHVuZGVmaW5lZCxcbiAgICBjb250ZXh0OiB1bmRlZmluZWQsXG4gICAgY29tbWFuZExpbmU6IHtcbiAgICAgICAgc3RhdHVzOiBcImhpZGRlblwiLFxuICAgICAgICBjb250ZW50OiBbXSxcbiAgICAgICAgcG9zOiAwLFxuICAgICAgICBmaXJzdGM6IFwiXCIsXG4gICAgICAgIHByb21wdDogXCJcIixcbiAgICAgICAgaW5kZW50OiAwLFxuICAgICAgICBsZXZlbDogMCxcbiAgICB9LFxuICAgIGN1cnNvcjoge1xuICAgICAgICBjdXJyZW50R3JpZDogMSxcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMCxcbiAgICAgICAgbGFzdE1vdmU6IHBlcmZvcm1hbmNlLm5vdygpLFxuICAgIH0sXG4gICAgZ3JpZENoYXJhY3RlcnM6IFtdLFxuICAgIGdyaWREYW1hZ2VzOiBbXSxcbiAgICBncmlkRGFtYWdlc0NvdW50OiBbXSxcbiAgICBncmlkSGlnaGxpZ2h0czogW10sXG4gICAgZ3JpZFNpemVzOiBbXSxcbiAgICBoaWdobGlnaHRzOiBbbmV3SGlnaGxpZ2h0KGRlZmF1bHRCYWNrZ3JvdW5kLCBkZWZhdWx0Rm9yZWdyb3VuZCldLFxuICAgIGxpbmVzcGFjZTogMCxcbiAgICBtZXNzYWdlczogW10sXG4gICAgbWVzc2FnZXNQb3NpdGlvbnM6IFtdLFxuICAgIG1vZGU6IHtcbiAgICAgICAgY3VycmVudDogMCxcbiAgICAgICAgc3R5bGVFbmFibGVkIDogZmFsc2UsXG4gICAgICAgIG1vZGVJbmZvOiBbe1xuICAgICAgICAgICAgYXR0cl9pZDogMCxcbiAgICAgICAgICAgIGF0dHJfaWRfbG06IDAsXG4gICAgICAgICAgICBibGlua29mZjogMCxcbiAgICAgICAgICAgIGJsaW5rb246IDAsXG4gICAgICAgICAgICBibGlua3dhaXQ6IDAsXG4gICAgICAgICAgICBjZWxsX3BlcmNlbnRhZ2U6IDAsXG4gICAgICAgICAgICBjdXJzb3Jfc2hhcGU6IFwiYmxvY2tcIixcbiAgICAgICAgICAgIG5hbWU6IFwibm9ybWFsXCIsXG4gICAgICAgIH1dXG4gICAgfSxcbiAgICBydWxlcjogdW5kZWZpbmVkLFxuICAgIHNob3djbWQ6IHVuZGVmaW5lZCxcbiAgICBzaG93bW9kZTogdW5kZWZpbmVkLFxufTtcblxuZnVuY3Rpb24gcHVzaERhbWFnZShncmlkOiBudW1iZXIsIGtpbmQ6IERhbWFnZUtpbmQsIGg6IG51bWJlciwgdzogbnVtYmVyLCB4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgIGNvbnN0IGRhbWFnZXMgPSBnbG9iYWxTdGF0ZS5ncmlkRGFtYWdlc1tncmlkXTtcbiAgICBjb25zdCBjb3VudCA9IGdsb2JhbFN0YXRlLmdyaWREYW1hZ2VzQ291bnRbZ3JpZF07XG4gICAgaWYgKGRhbWFnZXMubGVuZ3RoID09PSBjb3VudCkge1xuICAgICAgICBkYW1hZ2VzLnB1c2goeyBraW5kLCBoLCB3LCB4LCB5IH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGRhbWFnZXNbY291bnRdLmtpbmQgPSBraW5kO1xuICAgICAgICBkYW1hZ2VzW2NvdW50XS5oID0gaDtcbiAgICAgICAgZGFtYWdlc1tjb3VudF0udyA9IHc7XG4gICAgICAgIGRhbWFnZXNbY291bnRdLnggPSB4O1xuICAgICAgICBkYW1hZ2VzW2NvdW50XS55ID0geTtcbiAgICB9XG4gICAgZ2xvYmFsU3RhdGUuZ3JpZERhbWFnZXNDb3VudFtncmlkXSA9IGNvdW50ICsgMTtcbn1cblxubGV0IG1heENlbGxXaWR0aDogbnVtYmVyO1xubGV0IG1heENlbGxIZWlnaHQ6IG51bWJlcjtcbmxldCBtYXhCYXNlbGluZURpc3RhbmNlOiBudW1iZXI7XG5mdW5jdGlvbiByZWNvbXB1dGVDaGFyU2l6ZSAoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcbiAgICAvLyA5NCwgSyszMjogd2UgaWdub3JlIHRoZSBmaXJzdCAzMiBhc2NpaSBjaGFycyBiZWNhdXNlIHRoZXkncmUgbm9uLXByaW50YWJsZVxuICAgIGNvbnN0IGNoYXJzID0gbmV3IEFycmF5KDk0KVxuICAgICAgICAuZmlsbCgwKVxuICAgICAgICAubWFwKChfLCBrKSA9PiBTdHJpbmcuZnJvbUNoYXJDb2RlKGsgKyAzMikpXG4gICAgICAgIC8vIENvbmNhdGVuaW5nIMOCIGJlY2F1c2UgdGhhdCdzIHRoZSB0YWxsZXN0IGNoYXJhY3RlciBJIGNhbiB0aGluayBvZi5cbiAgICAgICAgLmNvbmNhdChbXCLDglwiXSk7XG4gICAgbGV0IHdpZHRoID0gMDtcbiAgICBsZXQgaGVpZ2h0ID0gMDtcbiAgICBsZXQgYmFzZWxpbmUgPSAwO1xuICAgIGxldCBtZWFzdXJlOiBUZXh0TWV0cmljcztcbiAgICBmb3IgKGNvbnN0IGNoYXIgb2YgY2hhcnMpIHtcbiAgICAgICAgbWVhc3VyZSA9IGN0eC5tZWFzdXJlVGV4dChjaGFyKTtcbiAgICAgICAgaWYgKG1lYXN1cmUud2lkdGggPiB3aWR0aCkge1xuICAgICAgICAgICAgd2lkdGggPSBtZWFzdXJlLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0bXAgPSBNYXRoLmFicyhtZWFzdXJlLmFjdHVhbEJvdW5kaW5nQm94QXNjZW50KTtcbiAgICAgICAgaWYgKHRtcCA+IGJhc2VsaW5lKSB7XG4gICAgICAgICAgICBiYXNlbGluZSA9IHRtcDtcbiAgICAgICAgfVxuICAgICAgICB0bXAgKz0gTWF0aC5hYnMobWVhc3VyZS5hY3R1YWxCb3VuZGluZ0JveERlc2NlbnQpO1xuICAgICAgICBpZiAodG1wID4gaGVpZ2h0KSB7XG4gICAgICAgICAgICBoZWlnaHQgPSB0bXA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbWF4Q2VsbFdpZHRoID0gTWF0aC5jZWlsKHdpZHRoKTtcbiAgICBtYXhDZWxsSGVpZ2h0ID0gTWF0aC5jZWlsKGhlaWdodCkgKyBnbG9iYWxTdGF0ZS5saW5lc3BhY2U7XG4gICAgbWF4QmFzZWxpbmVEaXN0YW5jZSA9IGJhc2VsaW5lO1xuICAgIG1ldHJpY3NJbnZhbGlkYXRlZCA9IGZhbHNlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldEdseXBoSW5mbyAoc3RhdGU6IFN0YXRlKSB7XG4gICAgaWYgKG1ldHJpY3NJbnZhbGlkYXRlZFxuICAgICAgICB8fCBtYXhDZWxsV2lkdGggPT09IHVuZGVmaW5lZFxuICAgICAgICB8fCBtYXhDZWxsSGVpZ2h0ID09PSB1bmRlZmluZWRcbiAgICAgICAgfHwgbWF4QmFzZWxpbmVEaXN0YW5jZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlY29tcHV0ZUNoYXJTaXplKHN0YXRlLmNvbnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gW21heENlbGxXaWR0aCwgbWF4Q2VsbEhlaWdodCwgbWF4QmFzZWxpbmVEaXN0YW5jZV07XG59XG5mdW5jdGlvbiBtZWFzdXJlV2lkdGgoc3RhdGU6IFN0YXRlLCBjaGFyOiBzdHJpbmcpIHtcbiAgICBjb25zdCBjaGFyV2lkdGggPSBnZXRHbHlwaEluZm8oc3RhdGUpWzBdO1xuICAgIHJldHVybiBNYXRoLmNlaWwoc3RhdGUuY29udGV4dC5tZWFzdXJlVGV4dChjaGFyKS53aWR0aCAvIGNoYXJXaWR0aCkgKiBjaGFyV2lkdGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2dpY2FsU2l6ZSgpIHtcbiAgICBjb25zdCBzdGF0ZSA9IGdsb2JhbFN0YXRlO1xuICAgIGNvbnN0IFtjZWxsV2lkdGgsIGNlbGxIZWlnaHRdID0gZ2V0R2x5cGhJbmZvKHN0YXRlKTtcbiAgICByZXR1cm4gW01hdGguZmxvb3Ioc3RhdGUuY2FudmFzLndpZHRoIC8gY2VsbFdpZHRoKSwgTWF0aC5mbG9vcihzdGF0ZS5jYW52YXMuaGVpZ2h0IC8gY2VsbEhlaWdodCldO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZUdyaWREaW1lbnNpb25zRm9yICh3aWR0aCA6IG51bWJlciwgaGVpZ2h0IDogbnVtYmVyKSB7XG4gICAgY29uc3QgW2NlbGxXaWR0aCwgY2VsbEhlaWdodF0gPSBnZXRHbHlwaEluZm8oZ2xvYmFsU3RhdGUpO1xuICAgIHJldHVybiBbTWF0aC5mbG9vcih3aWR0aCAvIGNlbGxXaWR0aCksIE1hdGguZmxvb3IoaGVpZ2h0IC8gY2VsbEhlaWdodCldO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0R3JpZENvb3JkaW5hdGVzICh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgIGNvbnN0IFtjZWxsV2lkdGgsIGNlbGxIZWlnaHRdID0gZ2V0R2x5cGhJbmZvKGdsb2JhbFN0YXRlKTtcbiAgICByZXR1cm4gW01hdGguZmxvb3IoeCAqIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIC8gY2VsbFdpZHRoKSwgTWF0aC5mbG9vcih5ICogd2luZG93LmRldmljZVBpeGVsUmF0aW8gLyBjZWxsSGVpZ2h0KV07XG59XG5cbmZ1bmN0aW9uIG5ld0hpZ2hsaWdodCAoYmc6IHN0cmluZywgZmc6IHN0cmluZyk6IEhpZ2hsaWdodEluZm8ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGJhY2tncm91bmQ6IGJnLFxuICAgICAgICBib2xkOiB1bmRlZmluZWQsXG4gICAgICAgIGJsZW5kOiB1bmRlZmluZWQsXG4gICAgICAgIGZvcmVncm91bmQ6IGZnLFxuICAgICAgICBpdGFsaWM6IHVuZGVmaW5lZCxcbiAgICAgICAgcmV2ZXJzZTogdW5kZWZpbmVkLFxuICAgICAgICBzcGVjaWFsOiB1bmRlZmluZWQsXG4gICAgICAgIHN0cmlrZXRocm91Z2g6IHVuZGVmaW5lZCxcbiAgICAgICAgdW5kZXJjdXJsOiB1bmRlZmluZWQsXG4gICAgICAgIHVuZGVybGluZTogdW5kZWZpbmVkLFxuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRHcmlkSWQoKSB7XG4gICAgcmV0dXJuIDE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDdXJyZW50TW9kZSgpIHtcbiAgICBjb25zdCBtb2RlID0gZ2xvYmFsU3RhdGUubW9kZTtcbiAgICByZXR1cm4gbW9kZS5tb2RlSW5mb1ttb2RlLmN1cnJlbnRdLm5hbWU7XG59XG5cbmZ1bmN0aW9uIGdldENvbW1hbmRMaW5lUmVjdCAoc3RhdGU6IFN0YXRlKSB7XG4gICAgY29uc3QgW3dpZHRoLCBoZWlnaHRdID0gZ2V0R2x5cGhJbmZvKHN0YXRlKTtcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiB3aWR0aCAtIDEsXG4gICAgICAgIHk6ICgoc3RhdGUuY2FudmFzLmhlaWdodCAtIGhlaWdodCAtIDEpIC8gMiksXG4gICAgICAgIHdpZHRoOiAoc3RhdGUuY2FudmFzLndpZHRoIC0gKHdpZHRoICogMikpICsgMixcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHQgKyAyLFxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGRhbWFnZUNvbW1hbmRMaW5lU3BhY2UgKHN0YXRlOiBTdGF0ZSkge1xuICAgIGNvbnN0IFt3aWR0aCwgaGVpZ2h0XSA9IGdldEdseXBoSW5mbyhzdGF0ZSk7XG4gICAgY29uc3QgcmVjdCA9IGdldENvbW1hbmRMaW5lUmVjdChzdGF0ZSk7XG4gICAgY29uc3QgZ2lkID0gZ2V0R3JpZElkKCk7XG4gICAgY29uc3QgZGltZW5zaW9ucyA9IGdsb2JhbFN0YXRlLmdyaWRTaXplc1tnaWRdO1xuICAgIHB1c2hEYW1hZ2UoZ2lkLFxuICAgICAgICAgICAgICAgRGFtYWdlS2luZC5DZWxsLFxuICAgICAgICAgICAgICAgTWF0aC5taW4oTWF0aC5jZWlsKHJlY3QuaGVpZ2h0IC8gaGVpZ2h0KSArIDEsIGRpbWVuc2lvbnMuaGVpZ2h0KSxcbiAgICAgICAgICAgICAgIE1hdGgubWluKE1hdGguY2VpbChyZWN0LndpZHRoIC8gd2lkdGgpICsgMSwgZGltZW5zaW9ucy53aWR0aCksXG4gICAgICAgICAgICAgICBNYXRoLm1heChNYXRoLmZsb29yKHJlY3QueCAvIHdpZHRoKSwgMCksXG4gICAgICAgICAgICAgICBNYXRoLm1heChNYXRoLmZsb29yKHJlY3QueSAvIGhlaWdodCksIDApKTtcbn1cblxuZnVuY3Rpb24gZGFtYWdlTWVzc2FnZXNTcGFjZSAoc3RhdGU6IFN0YXRlKSB7XG4gICAgY29uc3QgZ0lkID0gZ2V0R3JpZElkKCk7XG4gICAgY29uc3QgbXNnUG9zID0gZ2xvYmFsU3RhdGUubWVzc2FnZXNQb3NpdGlvbnNbZ0lkXTtcbiAgICBjb25zdCBkaW1lbnNpb25zID0gZ2xvYmFsU3RhdGUuZ3JpZFNpemVzW2dJZF07XG4gICAgY29uc3QgW2NoYXJXaWR0aCwgY2hhckhlaWdodF0gPSBnZXRHbHlwaEluZm8oc3RhdGUpO1xuICAgIHB1c2hEYW1hZ2UoZ0lkLFxuICAgICAgICAgICAgICAgRGFtYWdlS2luZC5DZWxsLFxuICAgICAgICAgICAgICAgTWF0aC5taW4oXG4gICAgICAgICAgICAgICAgICAgTWF0aC5jZWlsKChzdGF0ZS5jYW52YXMuaGVpZ2h0IC0gbXNnUG9zLnkpIC8gY2hhckhlaWdodCkgKyAyLFxuICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMuaGVpZ2h0KSxcbiAgICAgICAgICAgICAgIE1hdGgubWluKFxuICAgICAgICAgICAgICAgICAgIE1hdGguY2VpbCgoc3RhdGUuY2FudmFzLndpZHRoIC0gbXNnUG9zLngpIC8gY2hhcldpZHRoKSArIDIsXG4gICAgICAgICAgICAgICAgICAgZGltZW5zaW9ucy53aWR0aCksXG4gICAgICAgICAgICAgICBNYXRoLm1heChNYXRoLmZsb29yKG1zZ1Bvcy54IC8gY2hhcldpZHRoKSAtIDEsIDApLFxuICAgICAgICAgICAgICAgTWF0aC5tYXgoTWF0aC5mbG9vcihtc2dQb3MueSAvIGNoYXJIZWlnaHQpIC0gMSwgMCkpO1xuICAgIG1zZ1Bvcy54ID0gc3RhdGUuY2FudmFzLndpZHRoO1xuICAgIG1zZ1Bvcy55ID0gc3RhdGUuY2FudmFzLmhlaWdodDtcbn1cblxuY29uc3QgaGFuZGxlcnMgOiB7IFtrZXk6c3RyaW5nXSA6ICguLi5hcmdzOiBhbnlbXSk9PnZvaWQgfSA9IHtcbiAgICBidXN5X3N0YXJ0OiAoKSA9PiB7IGdsb2JhbFN0YXRlLmNhbnZhcy5zdHlsZS5jdXJzb3IgPSBcIndhaXRcIjsgfSxcbiAgICBidXN5X3N0b3A6ICgpID0+IHsgZ2xvYmFsU3RhdGUuY2FudmFzLnN0eWxlLmN1cnNvciA9IFwiYXV0b1wiOyB9LFxuICAgIGNtZGxpbmVfaGlkZTogKCkgPT4ge1xuICAgICAgICBnbG9iYWxTdGF0ZS5jb21tYW5kTGluZS5zdGF0dXMgPSBcImhpZGRlblwiO1xuICAgICAgICBkYW1hZ2VDb21tYW5kTGluZVNwYWNlKGdsb2JhbFN0YXRlKTtcbiAgICB9LFxuICAgIGNtZGxpbmVfcG9zOiAocG9zOiBudW1iZXIsIGxldmVsOiBudW1iZXIpID0+IHtcbiAgICAgICAgZ2xvYmFsU3RhdGUuY29tbWFuZExpbmUucG9zID0gcG9zO1xuICAgICAgICBnbG9iYWxTdGF0ZS5jb21tYW5kTGluZS5sZXZlbCA9IGxldmVsO1xuICAgIH0sXG4gICAgY21kbGluZV9zaG93OlxuICAgICAgICAoY29udGVudDogW2FueSwgc3RyaW5nXVtdLFxuICAgICAgICAgcG9zOiBudW1iZXIsXG4gICAgICAgICBmaXJzdGM6IHN0cmluZyxcbiAgICAgICAgIHByb21wdDogc3RyaW5nLFxuICAgICAgICAgaW5kZW50OiBudW1iZXIsXG4gICAgICAgICBsZXZlbDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgZ2xvYmFsU3RhdGUuY29tbWFuZExpbmUuc3RhdHVzID0gXCJzaG93blwiO1xuICAgICAgICAgICAgIGdsb2JhbFN0YXRlLmNvbW1hbmRMaW5lLmNvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICAgICAgIGdsb2JhbFN0YXRlLmNvbW1hbmRMaW5lLnBvcyA9IHBvcztcbiAgICAgICAgICAgICBnbG9iYWxTdGF0ZS5jb21tYW5kTGluZS5maXJzdGMgPSBmaXJzdGM7XG4gICAgICAgICAgICAgZ2xvYmFsU3RhdGUuY29tbWFuZExpbmUucHJvbXB0ID0gcHJvbXB0O1xuICAgICAgICAgICAgIGdsb2JhbFN0YXRlLmNvbW1hbmRMaW5lLmluZGVudCA9IGluZGVudDtcbiAgICAgICAgICAgICBnbG9iYWxTdGF0ZS5jb21tYW5kTGluZS5sZXZlbCA9IGxldmVsO1xuICAgICAgICAgfSxcbiAgICBkZWZhdWx0X2NvbG9yc19zZXQ6IChmZzogbnVtYmVyLCBiZzogbnVtYmVyLCBzcDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGlmIChmZyAhPT0gdW5kZWZpbmVkICYmIGZnICE9PSAtMSkge1xuICAgICAgICAgICAgZ2xvYmFsU3RhdGUuaGlnaGxpZ2h0c1swXS5mb3JlZ3JvdW5kID0gdG9IZXhDc3MoZmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChiZyAhPT0gdW5kZWZpbmVkICYmIGJnICE9PSAtMSkge1xuICAgICAgICAgICAgZ2xvYmFsU3RhdGUuaGlnaGxpZ2h0c1swXS5iYWNrZ3JvdW5kID0gdG9IZXhDc3MoYmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzcCAhPT0gdW5kZWZpbmVkICYmIHNwICE9PSAtMSkge1xuICAgICAgICAgICAgZ2xvYmFsU3RhdGUuaGlnaGxpZ2h0c1swXS5zcGVjaWFsID0gdG9IZXhDc3Moc3ApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGN1ckdyaWRTaXplID0gZ2xvYmFsU3RhdGUuZ3JpZFNpemVzW2dldEdyaWRJZCgpXTtcbiAgICAgICAgaWYgKGN1ckdyaWRTaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHB1c2hEYW1hZ2UoZ2V0R3JpZElkKCksIERhbWFnZUtpbmQuQ2VsbCwgY3VyR3JpZFNpemUuaGVpZ2h0LCBjdXJHcmlkU2l6ZS53aWR0aCwgMCwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgd2lwZUdseXBoQ2FjaGUoKTtcbiAgICB9LFxuICAgIGZsdXNoOiAoKSA9PiB7XG4gICAgICAgIHNjaGVkdWxlRnJhbWUoKTtcbiAgICB9LFxuICAgIGdyaWRfY2xlYXI6IChpZDogbnVtYmVyKSA9PiB7XG4gICAgICAgIC8vIGdsYWNhbWJyZTogV2hhdCBzaG91bGQgYWN0dWFsbHkgaGFwcGVuIG9uIGdyaWRfY2xlYXI/IFRoZVxuICAgICAgICAvLyAgICAgICAgICAgIGRvY3VtZW50YXRpb24gc2F5cyBcImNsZWFyIHRoZSBncmlkXCIsIGJ1dCB3aGF0IGRvZXMgdGhhdFxuICAgICAgICAvLyAgICAgICAgICAgIG1lYW4/IEkgZ3Vlc3MgdGhlIGNoYXJhY3RlcnMgc2hvdWxkIGJlIHJlbW92ZWQsIGJ1dCB3aGF0XG4gICAgICAgIC8vICAgICAgICAgICAgYWJvdXQgdGhlIGhpZ2hsaWdodHM/IEFyZSB0aGVyZSBvdGhlciB0aGluZ3MgdGhhdCBuZWVkIHRvXG4gICAgICAgIC8vICAgICAgICAgICAgYmUgY2xlYXJlZD9cbiAgICAgICAgLy8gYmZyZWRsOiB0byBkZWZhdWx0IGJnIGNvbG9yXG4gICAgICAgIC8vICAgICAgICAgZ3JpZF9jbGVhciBpcyBub3QgbWVhbnQgdG8gYmUgdXNlZCBvZnRlblxuICAgICAgICAvLyAgICAgICAgIGl0IGlzIG1vcmUgXCJ0aGUgdGVybWluYWwgZ290IHNjcmV3ZWQgdXAsIGJldHRlciB0byBiZSBzYWZlXG4gICAgICAgIC8vICAgICAgICAgdGhhbiBzb3JyeVwiXG4gICAgICAgIGNvbnN0IGNoYXJHcmlkID0gZ2xvYmFsU3RhdGUuZ3JpZENoYXJhY3RlcnNbaWRdO1xuICAgICAgICBjb25zdCBoaWdoR3JpZCA9IGdsb2JhbFN0YXRlLmdyaWRIaWdobGlnaHRzW2lkXTtcbiAgICAgICAgY29uc3QgZGltcyA9IGdsb2JhbFN0YXRlLmdyaWRTaXplc1tpZF07XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGltcy5oZWlnaHQ7ICsraikge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaW1zLndpZHRoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBjaGFyR3JpZFtqXVtpXSA9IFwiIFwiO1xuICAgICAgICAgICAgICAgIGhpZ2hHcmlkW2pdW2ldID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwdXNoRGFtYWdlKGlkLCBEYW1hZ2VLaW5kLkNlbGwsIGRpbXMuaGVpZ2h0LCBkaW1zLndpZHRoLCAwLCAwKTtcbiAgICB9LFxuICAgIGdyaWRfY3Vyc29yX2dvdG86IChpZDogbnVtYmVyLCByb3c6IG51bWJlciwgY29sdW1uOiBudW1iZXIpID0+IHtcbiAgICAgICAgY29uc3QgY3Vyc29yID0gZ2xvYmFsU3RhdGUuY3Vyc29yO1xuICAgICAgICBwdXNoRGFtYWdlKGdldEdyaWRJZCgpLCBEYW1hZ2VLaW5kLkNlbGwsIDEsIDEsIGN1cnNvci54LCBjdXJzb3IueSk7XG4gICAgICAgIGN1cnNvci5jdXJyZW50R3JpZCA9IGlkO1xuICAgICAgICBjdXJzb3IueCA9IGNvbHVtbjtcbiAgICAgICAgY3Vyc29yLnkgPSByb3c7XG4gICAgICAgIGN1cnNvci5sYXN0TW92ZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIH0sXG4gICAgZ3JpZF9saW5lOiAoaWQ6IG51bWJlciwgcm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCBjaGFuZ2VzOiAgYW55W10pID0+IHtcbiAgICAgICAgY29uc3QgY2hhckdyaWQgPSBnbG9iYWxTdGF0ZS5ncmlkQ2hhcmFjdGVyc1tpZF07XG4gICAgICAgIGNvbnN0IGhpZ2hsaWdodHMgPSBnbG9iYWxTdGF0ZS5ncmlkSGlnaGxpZ2h0c1tpZF07XG4gICAgICAgIGxldCBwcmV2Q29sID0gY29sO1xuICAgICAgICBsZXQgaGlnaCA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhbmdlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgY29uc3QgY2hhbmdlID0gY2hhbmdlc1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGNoYXJhID0gY2hhbmdlWzBdO1xuICAgICAgICAgICAgaWYgKGNoYW5nZVsxXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaGlnaCA9IGNoYW5nZVsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJlcGVhdCA9IGNoYW5nZVsyXSA9PT0gdW5kZWZpbmVkID8gMSA6IGNoYW5nZVsyXTtcblxuICAgICAgICAgICAgcHVzaERhbWFnZShpZCwgRGFtYWdlS2luZC5DZWxsLCAxLCByZXBlYXQsIHByZXZDb2wsIHJvdyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGxpbWl0ID0gcHJldkNvbCArIHJlcGVhdDtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSBwcmV2Q29sOyBqIDwgbGltaXQ7IGogKz0gMSkge1xuICAgICAgICAgICAgICAgIGNoYXJHcmlkW3Jvd11bal0gPSBjaGFyYTtcbiAgICAgICAgICAgICAgICBoaWdobGlnaHRzW3Jvd11bal0gPSBoaWdoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldkNvbCA9IGxpbWl0O1xuICAgICAgICB9XG4gICAgfSxcbiAgICBncmlkX3Jlc2l6ZTogKGlkOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gZ2xvYmFsU3RhdGU7XG4gICAgICAgIGNvbnN0IGNyZWF0ZUdyaWQgPSBzdGF0ZS5ncmlkQ2hhcmFjdGVyc1tpZF0gPT09IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKGNyZWF0ZUdyaWQpIHtcbiAgICAgICAgICAgIHN0YXRlLmdyaWRDaGFyYWN0ZXJzW2lkXSA9IFtdO1xuICAgICAgICAgICAgc3RhdGUuZ3JpZENoYXJhY3RlcnNbaWRdLnB1c2goW10pO1xuICAgICAgICAgICAgc3RhdGUuZ3JpZFNpemVzW2lkXSA9IHsgd2lkdGg6IDAsIGhlaWdodDogMCB9O1xuICAgICAgICAgICAgc3RhdGUuZ3JpZERhbWFnZXNbaWRdID0gW107XG4gICAgICAgICAgICBzdGF0ZS5ncmlkRGFtYWdlc0NvdW50W2lkXSA9IDA7XG4gICAgICAgICAgICBzdGF0ZS5ncmlkSGlnaGxpZ2h0c1tpZF0gPSBbXTtcbiAgICAgICAgICAgIHN0YXRlLmdyaWRIaWdobGlnaHRzW2lkXS5wdXNoKFtdKTtcbiAgICAgICAgICAgIHN0YXRlLm1lc3NhZ2VzUG9zaXRpb25zW2lkXSA9IHtcbiAgICAgICAgICAgICAgICB4OiBzdGF0ZS5jYW52YXMud2lkdGgsXG4gICAgICAgICAgICAgICAgeTogc3RhdGUuY2FudmFzLmhlaWdodCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjdXJHcmlkU2l6ZSA9IGdsb2JhbFN0YXRlLmdyaWRTaXplc1tpZF07XG5cbiAgICAgICAgcHVzaERhbWFnZShpZCwgRGFtYWdlS2luZC5SZXNpemUsIGhlaWdodCwgd2lkdGgsIGN1ckdyaWRTaXplLndpZHRoLCBjdXJHcmlkU2l6ZS5oZWlnaHQpO1xuXG4gICAgICAgIGNvbnN0IGhpZ2hsaWdodHMgPSBnbG9iYWxTdGF0ZS5ncmlkSGlnaGxpZ2h0c1tpZF07XG4gICAgICAgIGNvbnN0IGNoYXJHcmlkID0gZ2xvYmFsU3RhdGUuZ3JpZENoYXJhY3RlcnNbaWRdO1xuICAgICAgICBpZiAod2lkdGggPiBjaGFyR3JpZFswXS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhckdyaWQubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBjaGFyR3JpZFtpXTtcbiAgICAgICAgICAgICAgICBjb25zdCBoaWdocyA9IGhpZ2hsaWdodHNbaV07XG4gICAgICAgICAgICAgICAgd2hpbGUgKHJvdy5sZW5ndGggPCB3aWR0aCkge1xuICAgICAgICAgICAgICAgICAgICByb3cucHVzaChcIiBcIik7XG4gICAgICAgICAgICAgICAgICAgIGhpZ2hzLnB1c2goMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChoZWlnaHQgPiBjaGFyR3JpZC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHdoaWxlIChjaGFyR3JpZC5sZW5ndGggPCBoZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBjaGFyR3JpZC5wdXNoKChuZXcgQXJyYXkod2lkdGgpKS5maWxsKFwiIFwiKSk7XG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0cy5wdXNoKChuZXcgQXJyYXkod2lkdGgpKS5maWxsKDApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwdXNoRGFtYWdlKGlkLCBEYW1hZ2VLaW5kLkNlbGwsIDAsIHdpZHRoLCAwLCBjdXJHcmlkU2l6ZS5oZWlnaHQpO1xuICAgICAgICBjdXJHcmlkU2l6ZS53aWR0aCA9IHdpZHRoO1xuICAgICAgICBjdXJHcmlkU2l6ZS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgfSxcbiAgICBncmlkX3Njcm9sbDogKGlkOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICB0b3A6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgIGJvdDogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgX2xlZnQ6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgIF9yaWdodDogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgcm93czogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgX2NvbHM6IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBkaW1lbnNpb25zID0gZ2xvYmFsU3RhdGUuZ3JpZFNpemVzW2lkXTtcbiAgICAgICAgY29uc3QgY2hhckdyaWQgPSBnbG9iYWxTdGF0ZS5ncmlkQ2hhcmFjdGVyc1tpZF07XG4gICAgICAgIGNvbnN0IGhpZ2hHcmlkID0gZ2xvYmFsU3RhdGUuZ3JpZEhpZ2hsaWdodHNbaWRdO1xuICAgICAgICBpZiAocm93cyA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGJvdHRvbSA9IChib3QgKyByb3dzKSA+PSBkaW1lbnNpb25zLmhlaWdodFxuICAgICAgICAgICAgICAgID8gZGltZW5zaW9ucy5oZWlnaHQgLSByb3dzXG4gICAgICAgICAgICAgICAgOiBib3Q7XG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gdG9wOyB5IDwgYm90dG9tOyArK3kpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzcmNDaGFycyA9IGNoYXJHcmlkW3kgKyByb3dzXTtcbiAgICAgICAgICAgICAgICBjb25zdCBkc3RDaGFycyA9IGNoYXJHcmlkW3ldO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNyY0hpZ2hzID0gaGlnaEdyaWRbeSArIHJvd3NdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRzdEhpZ2hzID0gaGlnaEdyaWRbeV07XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBkaW1lbnNpb25zLndpZHRoOyArK3gpIHtcbiAgICAgICAgICAgICAgICAgICAgZHN0Q2hhcnNbeF0gPSBzcmNDaGFyc1t4XTtcbiAgICAgICAgICAgICAgICAgICAgZHN0SGlnaHNbeF0gPSBzcmNIaWdoc1t4XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwdXNoRGFtYWdlKGlkLCBEYW1hZ2VLaW5kLkNlbGwsIGRpbWVuc2lvbnMuaGVpZ2h0LCBkaW1lbnNpb25zLndpZHRoLCAwLCAwKTtcbiAgICAgICAgfSBlbHNlIGlmIChyb3dzIDwgMCkge1xuICAgICAgICAgICAgZm9yIChsZXQgeSA9IGJvdCAtIDE7IHkgPj0gdG9wICYmICh5ICsgcm93cykgPj0gMDsgLS15KSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3JjQ2hhcnMgPSBjaGFyR3JpZFt5ICsgcm93c107XG4gICAgICAgICAgICAgICAgY29uc3QgZHN0Q2hhcnMgPSBjaGFyR3JpZFt5XTtcbiAgICAgICAgICAgICAgICBjb25zdCBzcmNIaWdocyA9IGhpZ2hHcmlkW3kgKyByb3dzXTtcbiAgICAgICAgICAgICAgICBjb25zdCBkc3RIaWdocyA9IGhpZ2hHcmlkW3ldO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgZGltZW5zaW9ucy53aWR0aDsgKyt4KSB7XG4gICAgICAgICAgICAgICAgICAgIGRzdENoYXJzW3hdID0gc3JjQ2hhcnNbeF07XG4gICAgICAgICAgICAgICAgICAgIGRzdEhpZ2hzW3hdID0gc3JjSGlnaHNbeF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHVzaERhbWFnZShpZCwgRGFtYWdlS2luZC5DZWxsLCBkaW1lbnNpb25zLmhlaWdodCwgZGltZW5zaW9ucy53aWR0aCwgMCwgMCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGhsX2F0dHJfZGVmaW5lOiAoaWQ6IG51bWJlciwgcmdiQXR0cjogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IGhpZ2hsaWdodHMgPSBnbG9iYWxTdGF0ZS5oaWdobGlnaHRzO1xuICAgICAgICBpZiAoaGlnaGxpZ2h0c1tpZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaGlnaGxpZ2h0c1tpZF0gPSBuZXdIaWdobGlnaHQodW5kZWZpbmVkLCB1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgICAgIGhpZ2hsaWdodHNbaWRdLmZvcmVncm91bmQgPSB0b0hleENzcyhyZ2JBdHRyLmZvcmVncm91bmQpO1xuICAgICAgICBoaWdobGlnaHRzW2lkXS5iYWNrZ3JvdW5kID0gdG9IZXhDc3MocmdiQXR0ci5iYWNrZ3JvdW5kKTtcbiAgICAgICAgaGlnaGxpZ2h0c1tpZF0uYm9sZCA9IHJnYkF0dHIuYm9sZDtcbiAgICAgICAgaGlnaGxpZ2h0c1tpZF0uYmxlbmQgPSByZ2JBdHRyLmJsZW5kO1xuICAgICAgICBoaWdobGlnaHRzW2lkXS5pdGFsaWMgPSByZ2JBdHRyLml0YWxpYztcbiAgICAgICAgaGlnaGxpZ2h0c1tpZF0uc3BlY2lhbCA9IHRvSGV4Q3NzKHJnYkF0dHIuc3BlY2lhbCk7XG4gICAgICAgIGhpZ2hsaWdodHNbaWRdLnN0cmlrZXRocm91Z2ggPSByZ2JBdHRyLnN0cmlrZXRocm91Z2g7XG4gICAgICAgIGhpZ2hsaWdodHNbaWRdLnVuZGVyY3VybCA9IHJnYkF0dHIudW5kZXJjdXJsO1xuICAgICAgICBoaWdobGlnaHRzW2lkXS51bmRlcmxpbmUgPSByZ2JBdHRyLnVuZGVybGluZTtcbiAgICAgICAgaGlnaGxpZ2h0c1tpZF0ucmV2ZXJzZSA9IHJnYkF0dHIucmV2ZXJzZTtcbiAgICB9LFxuICAgIG1vZGVfY2hhbmdlOiAoXzogc3RyaW5nLCBtb2RlSWR4OiBudW1iZXIpID0+IHtcbiAgICAgICAgZ2xvYmFsU3RhdGUubW9kZS5jdXJyZW50ID0gbW9kZUlkeDtcbiAgICAgICAgaWYgKGdsb2JhbFN0YXRlLm1vZGUuc3R5bGVFbmFibGVkKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJzb3IgPSBnbG9iYWxTdGF0ZS5jdXJzb3I7XG4gICAgICAgICAgICBwdXNoRGFtYWdlKGdldEdyaWRJZCgpLCBEYW1hZ2VLaW5kLkNlbGwsIDEsIDEsIGN1cnNvci54LCBjdXJzb3IueSk7XG4gICAgICAgICAgICBzY2hlZHVsZUZyYW1lKCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1vZGVfaW5mb19zZXQ6IChjdXJzb3JTdHlsZUVuYWJsZWQ6IGJvb2xlYW4sIG1vZGVJbmZvOiBbXSkgPT4ge1xuICAgICAgICAvLyBNaXNzaW5nOiBoYW5kbGluZyBvZiBjZWxsLXBlcmNlbnRhZ2VcbiAgICAgICAgY29uc3QgbW9kZSA9IGdsb2JhbFN0YXRlLm1vZGU7XG4gICAgICAgIG1vZGUuc3R5bGVFbmFibGVkID0gY3Vyc29yU3R5bGVFbmFibGVkO1xuICAgICAgICBtb2RlLm1vZGVJbmZvID0gbW9kZUluZm87XG4gICAgfSxcbiAgICBtc2dfY2xlYXI6ICgpID0+IHtcbiAgICAgICAgZGFtYWdlTWVzc2FnZXNTcGFjZShnbG9iYWxTdGF0ZSk7XG4gICAgICAgIGdsb2JhbFN0YXRlLm1lc3NhZ2VzLmxlbmd0aCA9IDA7XG4gICAgfSxcbiAgICBtc2dfaGlzdG9yeV9zaG93OiAoZW50cmllczogYW55W10pID0+IHtcbiAgICAgICAgZGFtYWdlTWVzc2FnZXNTcGFjZShnbG9iYWxTdGF0ZSk7XG4gICAgICAgIGdsb2JhbFN0YXRlLm1lc3NhZ2VzID0gZW50cmllcy5tYXAoKFssIGJdKSA9PiBiKTtcbiAgICB9LFxuICAgIG1zZ19ydWxlcjogKGNvbnRlbnQ6IE1lc3NhZ2UpID0+IHtcbiAgICAgICAgZGFtYWdlTWVzc2FnZXNTcGFjZShnbG9iYWxTdGF0ZSk7XG4gICAgICAgIGdsb2JhbFN0YXRlLnJ1bGVyID0gY29udGVudDtcbiAgICB9LFxuICAgIG1zZ19zaG93OiAoXzogc3RyaW5nLCBjb250ZW50OiBNZXNzYWdlLCByZXBsYWNlTGFzdDogYm9vbGVhbikgPT4ge1xuICAgICAgICBkYW1hZ2VNZXNzYWdlc1NwYWNlKGdsb2JhbFN0YXRlKTtcbiAgICAgICAgaWYgKHJlcGxhY2VMYXN0KSB7XG4gICAgICAgICAgICBnbG9iYWxTdGF0ZS5tZXNzYWdlcy5sZW5ndGggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGdsb2JhbFN0YXRlLm1lc3NhZ2VzLnB1c2goY29udGVudCk7XG4gICAgfSxcbiAgICBtc2dfc2hvd2NtZDogKGNvbnRlbnQ6IE1lc3NhZ2UpID0+IHtcbiAgICAgICAgZGFtYWdlTWVzc2FnZXNTcGFjZShnbG9iYWxTdGF0ZSk7XG4gICAgICAgIGdsb2JhbFN0YXRlLnNob3djbWQgPSBjb250ZW50O1xuICAgIH0sXG4gICAgbXNnX3Nob3dtb2RlOiAoY29udGVudDogTWVzc2FnZSkgPT4ge1xuICAgICAgICBkYW1hZ2VNZXNzYWdlc1NwYWNlKGdsb2JhbFN0YXRlKTtcbiAgICAgICAgZ2xvYmFsU3RhdGUuc2hvd21vZGUgPSBjb250ZW50O1xuICAgIH0sXG4gICAgb3B0aW9uX3NldDogKG9wdGlvbjogc3RyaW5nLCB2YWx1ZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gZ2xvYmFsU3RhdGU7XG4gICAgICAgIHN3aXRjaCAob3B0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFwiZ3VpZm9udFwiOiB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld0ZvbnRTdHJpbmc7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0ZvbnRTdHJpbmcgPSBkZWZhdWx0Rm9udFN0cmluZztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBndWlmb250ID0gcGFyc2VHdWlmb250KHZhbHVlLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvbnQtZmFtaWx5XCI6IGRlZmF1bHRGb250RmFtaWx5LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogZGVmYXVsdEZvbnRTaXplLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgbmV3Rm9udFN0cmluZyA9ICBtYWtlRm9udFN0cmluZyhndWlmb250W1wiZm9udC1zaXplXCJdLCBndWlmb250W1wiZm9udC1mYW1pbHlcIl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobmV3Rm9udFN0cmluZyA9PT0gZm9udFN0cmluZykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2V0Rm9udFN0cmluZyhzdGF0ZSwgbmV3Rm9udFN0cmluZyk7XG4gICAgICAgICAgICAgICAgY29uc3QgW2NoYXJXaWR0aCwgY2hhckhlaWdodF0gPSBnZXRHbHlwaEluZm8oc3RhdGUpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9ucy51aV90cnlfcmVzaXplX2dyaWQoZ2V0R3JpZElkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKHN0YXRlLmNhbnZhcy53aWR0aCAvIGNoYXJXaWR0aCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKHN0YXRlLmNhbnZhcy5oZWlnaHQgLyBjaGFySGVpZ2h0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJsaW5lc3BhY2VcIjoge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5saW5lc3BhY2UgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdGF0ZS5saW5lc3BhY2UgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpbnZhbGlkYXRlTWV0cmljcygpO1xuICAgICAgICAgICAgICAgIGNvbnN0IFtjaGFyV2lkdGgsIGNoYXJIZWlnaHRdID0gZ2V0R2x5cGhJbmZvKHN0YXRlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBnaWQgPSBnZXRHcmlkSWQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJHcmlkU2l6ZSA9IHN0YXRlLmdyaWRTaXplc1tnaWRdO1xuICAgICAgICAgICAgICAgIGlmIChjdXJHcmlkU2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHB1c2hEYW1hZ2UoZ2V0R3JpZElkKCksIERhbWFnZUtpbmQuQ2VsbCwgY3VyR3JpZFNpemUuaGVpZ2h0LCBjdXJHcmlkU2l6ZS53aWR0aCwgMCwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9ucy51aV90cnlfcmVzaXplX2dyaWQoZ2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcihzdGF0ZS5jYW52YXMud2lkdGggLyBjaGFyV2lkdGgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcihzdGF0ZS5jYW52YXMuaGVpZ2h0IC8gY2hhckhlaWdodCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxufTtcblxuLy8ga2VlcCB0cmFjayBvZiB3aGV0ZXIgYSBmcmFtZSBpcyBhbHJlYWR5IGJlaW5nIHNjaGVkdWxlZCBvciBub3QuIFRoaXMgYXZvaWRzXG4vLyBhc2tpbmcgZm9yIG11bHRpcGxlIGZyYW1lcyB3aGVyZSB3ZSdkIHBhaW50IHRoZSBzYW1lIHRoaW5nIGFueXdheS5cbmxldCBmcmFtZVNjaGVkdWxlZCA9IGZhbHNlO1xuZnVuY3Rpb24gc2NoZWR1bGVGcmFtZSgpIHtcbiAgICBpZiAoIWZyYW1lU2NoZWR1bGVkKSB7XG4gICAgICAgIGZyYW1lU2NoZWR1bGVkID0gdHJ1ZTtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShwYWludCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwYWludE1lc3NhZ2VzKHN0YXRlOiBTdGF0ZSkge1xuICAgIGNvbnN0IGN0eCA9IHN0YXRlLmNvbnRleHQ7XG4gICAgY29uc3QgZ0lkID0gZ2V0R3JpZElkKCk7XG4gICAgY29uc3QgbWVzc2FnZXNQb3NpdGlvbiA9IHN0YXRlLm1lc3NhZ2VzUG9zaXRpb25zW2dJZF07XG4gICAgY29uc3QgWywgY2hhckhlaWdodCwgYmFzZWxpbmVdID0gZ2V0R2x5cGhJbmZvKHN0YXRlKTtcbiAgICBjb25zdCBtZXNzYWdlcyA9IHN0YXRlLm1lc3NhZ2VzO1xuICAgIC8vIHdlIG5lZWQgdG8ga25vdyB0aGUgc2l6ZSBvZiB0aGUgbWVzc2FnZSBib3ggaW4gb3JkZXIgdG8gZHJhdyBpdHMgYm9yZGVyXG4gICAgLy8gYW5kIGJhY2tncm91bmQuIFRoZSBhbGdvcml0aG0gdG8gY29tcHV0ZSB0aGlzIGlzIGVxdWl2YWxlbnQgdG8gZHJhd2luZ1xuICAgIC8vIGFsbCBtZXNzYWdlcy4gU28gd2UgcHV0IHRoZSBkcmF3aW5nIGFsZ29yaXRobSBpbiBhIGZ1bmN0aW9uIHdpdGggYVxuICAgIC8vIGJvb2xlYW4gYXJndW1lbnQgdGhhdCB3aWxsIGNvbnRyb2wgd2hldGhlciB0ZXh0IHNob3VsZCBhY3R1YWxseSBiZVxuICAgIC8vIGRyYXduLiBUaGlzIGxldHMgdXMgcnVuIHRoZSBhbGdvcml0aG0gb25jZSB0byBnZXQgdGhlIGRpbWVuc2lvbnMgYW5kXG4gICAgLy8gdGhlbiBhZ2FpbiB0byBhY3R1YWxseSBkcmF3IHRleHQuXG4gICAgZnVuY3Rpb24gcmVuZGVyTWVzc2FnZXMgKGRyYXc6IGJvb2xlYW4pIHtcbiAgICAgICAgbGV0IHJlbmRlcmVkWCA9IHN0YXRlLmNhbnZhcy53aWR0aDtcbiAgICAgICAgbGV0IHJlbmRlcmVkWSA9IHN0YXRlLmNhbnZhcy5oZWlnaHQgLSBjaGFySGVpZ2h0ICsgYmFzZWxpbmU7XG4gICAgICAgIGZvciAobGV0IGkgPSBtZXNzYWdlcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IG1lc3NhZ2VzW2ldO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IG1lc3NhZ2UubGVuZ3RoIC0gMTsgaiA+PSAwOyAtLWopIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGFycyA9IEFycmF5LmZyb20obWVzc2FnZVtqXVsxXSk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IGNoYXJzLmxlbmd0aCAtIDE7IGsgPj0gMDsgLS1rKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoYXIgPSBjaGFyc1trXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWVhc3VyZWRXaWR0aCA9IG1lYXN1cmVXaWR0aChzdGF0ZSwgY2hhcik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZW5kZXJlZFggLSBtZWFzdXJlZFdpZHRoIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlbmRlcmVkWSAtIGNoYXJIZWlnaHQgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyZWRYID0gc3RhdGUuY2FudmFzLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyZWRZID0gcmVuZGVyZWRZIC0gY2hhckhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZW5kZXJlZFggPSByZW5kZXJlZFggLSBtZWFzdXJlZFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZHJhdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGNoYXIsIHJlbmRlcmVkWCwgcmVuZGVyZWRZKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocmVuZGVyZWRYIDwgbWVzc2FnZXNQb3NpdGlvbi54KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlc1Bvc2l0aW9uLnggPSByZW5kZXJlZFg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbmRlcmVkWSA8IG1lc3NhZ2VzUG9zaXRpb24ueSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXNQb3NpdGlvbi55ID0gcmVuZGVyZWRZIC0gYmFzZWxpbmU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZW5kZXJlZFggPSBzdGF0ZS5jYW52YXMud2lkdGg7XG4gICAgICAgICAgICByZW5kZXJlZFkgPSByZW5kZXJlZFkgLSBjaGFySGVpZ2h0O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlck1lc3NhZ2VzKGZhbHNlKTtcbiAgICBjdHguZmlsbFN0eWxlID0gc3RhdGUuaGlnaGxpZ2h0c1swXS5mb3JlZ3JvdW5kO1xuICAgIGN0eC5maWxsUmVjdChtZXNzYWdlc1Bvc2l0aW9uLnggLSAyLFxuICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXNQb3NpdGlvbi55IC0gMixcbiAgICAgICAgICAgICAgICAgICAgIHN0YXRlLmNhbnZhcy53aWR0aCAtIG1lc3NhZ2VzUG9zaXRpb24ueCArIDIsXG4gICAgICAgICAgICAgICAgICAgICBzdGF0ZS5jYW52YXMuaGVpZ2h0IC0gbWVzc2FnZXNQb3NpdGlvbi55ICsgMik7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gc3RhdGUuaGlnaGxpZ2h0c1swXS5iYWNrZ3JvdW5kO1xuICAgIGN0eC5maWxsUmVjdChtZXNzYWdlc1Bvc2l0aW9uLnggLSAxLFxuICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXNQb3NpdGlvbi55IC0gMSxcbiAgICAgICAgICAgICAgICAgICAgIHN0YXRlLmNhbnZhcy53aWR0aCAtIG1lc3NhZ2VzUG9zaXRpb24ueCArIDEsXG4gICAgICAgICAgICAgICAgICAgICBzdGF0ZS5jYW52YXMuaGVpZ2h0IC0gbWVzc2FnZXNQb3NpdGlvbi55ICsgMSk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IHN0YXRlLmhpZ2hsaWdodHNbMF0uZm9yZWdyb3VuZDtcbiAgICByZW5kZXJNZXNzYWdlcyh0cnVlKTtcbn1cblxuZnVuY3Rpb24gcGFpbnRDb21tYW5kbGluZVdpbmRvdyhzdGF0ZTogU3RhdGUpIHtcbiAgICBjb25zdCBjdHggPSBzdGF0ZS5jb250ZXh0O1xuICAgIGNvbnN0IFtjaGFyV2lkdGgsIGNoYXJIZWlnaHQsIGJhc2VsaW5lXSA9IGdldEdseXBoSW5mbyhzdGF0ZSk7XG4gICAgY29uc3QgY29tbWFuZExpbmUgPSBzdGF0ZS5jb21tYW5kTGluZTtcbiAgICBjb25zdCByZWN0ID0gZ2V0Q29tbWFuZExpbmVSZWN0KHN0YXRlKTtcbiAgICAvLyBvdXRlciByZWN0YW5nbGVcbiAgICBjdHguZmlsbFN0eWxlID0gc3RhdGUuaGlnaGxpZ2h0c1swXS5mb3JlZ3JvdW5kO1xuICAgIGN0eC5maWxsUmVjdChyZWN0LngsXG4gICAgICAgICAgICAgICAgICAgICByZWN0LnksXG4gICAgICAgICAgICAgICAgICAgICByZWN0LndpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgcmVjdC5oZWlnaHQpO1xuXG4gICAgLy8gaW5uZXIgcmVjdGFuZ2xlXG4gICAgcmVjdC54ICs9IDE7XG4gICAgcmVjdC55ICs9IDE7XG4gICAgcmVjdC53aWR0aCAtPSAyO1xuICAgIHJlY3QuaGVpZ2h0IC09IDI7XG4gICAgY3R4LmZpbGxTdHlsZSA9IHN0YXRlLmhpZ2hsaWdodHNbMF0uYmFja2dyb3VuZDtcbiAgICBjdHguZmlsbFJlY3QocmVjdC54LFxuICAgICAgICAgICAgICAgICAgICAgcmVjdC55LFxuICAgICAgICAgICAgICAgICAgICAgcmVjdC53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgIHJlY3QuaGVpZ2h0KTtcblxuICAgIC8vIHBhZGRpbmcgb2YgaW5uZXIgcmVjdGFuZ2xlXG4gICAgcmVjdC54ICs9IDE7XG4gICAgcmVjdC55ICs9IDE7XG4gICAgcmVjdC53aWR0aCAtPSAyO1xuICAgIHJlY3QuaGVpZ2h0IC09IDI7XG5cbiAgICAvLyBQb3NpdGlvbiB3aGVyZSB0ZXh0IHNob3VsZCBiZSBkcmF3blxuICAgIGxldCB4ID0gcmVjdC54O1xuICAgIGNvbnN0IHkgPSByZWN0Lnk7XG5cbiAgICAvLyBmaXJzdCBjaGFyYWN0ZXJcbiAgICBjdHguZmlsbFN0eWxlID0gc3RhdGUuaGlnaGxpZ2h0c1swXS5mb3JlZ3JvdW5kO1xuICAgIGN0eC5maWxsVGV4dChjb21tYW5kTGluZS5maXJzdGMsIHgsIHkgKyBiYXNlbGluZSk7XG4gICAgeCArPSBjaGFyV2lkdGg7XG4gICAgcmVjdC53aWR0aCAtPSBjaGFyV2lkdGg7XG5cbiAgICBjb25zdCBlbmNvZGVyID0gbmV3IFRleHRFbmNvZGVyKCk7XG4gICAgLy8gcmVkdWNlIHRoZSBjb21tYW5kbGluZSdzIGNvbnRlbnQgdG8gYSBzdHJpbmcgZm9yIGl0ZXJhdGlvblxuICAgIGNvbnN0IHN0ciA9IGNvbW1hbmRMaW5lLmNvbnRlbnQucmVkdWNlKChyOiBzdHJpbmcsIHNlZ21lbnQ6IFthbnksIHN0cmluZ10pID0+IHIgKyBzZWdtZW50WzFdLCBcIlwiKTtcbiAgICAvLyBBcnJheS5mcm9tKHN0cikgd2lsbCByZXR1cm4gYW4gYXJyYXkgd2hvc2UgY2VsbHMgYXJlIGdyYXBoZW1lXG4gICAgLy8gY2x1c3RlcnMuIEl0IGlzIGltcG9ydGFudCB0byBpdGVyYXRlIG92ZXIgZ3JhcGhlbWVzIGluc3RlYWQgb2YgdGhlXG4gICAgLy8gc3RyaW5nIGJlY2F1c2UgaXRlcmF0aW5nIG92ZXIgdGhlIHN0cmluZyB3b3VsZCBzb21ldGltZXMgeWllbGQgb25seVxuICAgIC8vIGhhbGYgb2YgdGhlIFVURi0xNiBjaGFyYWN0ZXIvc3Vycm9nYXRlIHBhaXIuXG4gICAgY29uc3QgY2hhcmFjdGVycyA9IEFycmF5LmZyb20oc3RyKTtcbiAgICAvLyByZW5kZXJlZEkgaXMgdGhlIGhvcml6b250YWwgcGl4ZWwgcG9zaXRpb24gd2hlcmUgdGhlIG5leHQgY2hhcmFjdGVyXG4gICAgLy8gc2hvdWxkIGJlIGRyYXduXG4gICAgbGV0IHJlbmRlcmVkSSA9IDA7XG4gICAgLy8gZW5jb2RlZEkgaXMgdGhlIG51bWJlciBvZiBieXRlcyB0aGF0IGhhdmUgYmVlbiBpdGVyYXRlZCBvdmVyIHRodXNcbiAgICAvLyBmYXIuIEl0IGlzIHVzZWQgdG8gZmluZCBvdXQgd2hlcmUgdG8gZHJhdyB0aGUgY3Vyc29yLiBJbmRlZWQsIG5lb3ZpbVxuICAgIC8vIHNlbmRzIHRoZSBjdXJzb3IncyBwb3NpdGlvbiBhcyBhIGJ5dGUgcG9zaXRpb24gd2l0aGluIHRoZSBVVEYtOFxuICAgIC8vIGVuY29kZWQgY29tbWFuZGxpbmUgc3RyaW5nLlxuICAgIGxldCBlbmNvZGVkSSA9IDA7XG4gICAgLy8gY3Vyc29yWCBpcyB0aGUgaG9yaXpvbnRhbCBwaXhlbCBwb3NpdGlvbiB3aGVyZSB0aGUgY3Vyc29yIHNob3VsZCBiZVxuICAgIC8vIGRyYXduLlxuICAgIGxldCBjdXJzb3JYID0gMDtcbiAgICAvLyBUaGUgaW5kZXggb2YgdGhlIGZpcnN0IGNoYXJhY3RlciBvZiBgY2hhcmFjdGVyc2AgdGhhdCBjYW4gYmUgZHJhd24uXG4gICAgLy8gSXQgaXMgaGlnaGVyIHRoYW4gMCB3aGVuIHRoZSBjb21tYW5kIGxpbmUgc3RyaW5nIGlzIHRvbyBsb25nIHRvIGJlXG4gICAgLy8gZW50aXJlbHkgZGlzcGxheWVkLlxuICAgIGxldCBzbGljZVN0YXJ0ID0gMDtcbiAgICAvLyBUaGUgaW5kZXggb2YgdGhlIGxhc3QgY2hhcmFjdGVyIG9mIGBjaGFyYWN0ZXJzYCB0aGF0IGNhbiBiZSBkcmF3bi5cbiAgICAvLyBJdCBpcyBkaWZmZXJlbnQgZnJvbSBjaGFyYWN0ZXJzLmxlbmd0aCB3aGVuIHRoZSBjb21tYW5kIGxpbmUgc3RyaW5nXG4gICAgLy8gaXMgdG9vIGxvbmcgdG8gYmUgZW50aXJlbHkgZGlzcGxheWVkLlxuICAgIGxldCBzbGljZUVuZCA9IDA7XG4gICAgLy8gVGhlIGhvcml6b250YWwgd2lkdGggaW4gcGl4ZWxzIHRha2VuIGJ5IHRoZSBkaXNwbGF5ZWQgc2xpY2UuIEl0XG4gICAgLy8gaXMgdXNlZCB0byBrZWVwIHRyYWNrIG9mIHdoZXRoZXIgdGhlIGNvbW1hbmRsaW5lIHN0cmluZyBpcyBsb25nZXJcbiAgICAvLyB0aGFuIHRoZSBjb21tYW5kbGluZSB3aW5kb3cuXG4gICAgbGV0IHNsaWNlV2lkdGggPSAwO1xuICAgIC8vIGN1cnNvckRpc3BsYXllZCBrZWVwcyB0cmFjayBvZiB3aGV0aGVyIHRoZSBjdXJzb3IgY2FuIGJlIGRpc3BsYXllZFxuICAgIC8vIGluIHRoZSBzbGljZS5cbiAgICBsZXQgY3Vyc29yRGlzcGxheWVkID0gY29tbWFuZExpbmUucG9zID09PSAwO1xuICAgIC8vIGRlc2NyaXB0aW9uIG9mIHRoZSBhbGdvcml0aG06XG4gICAgLy8gRm9yIGVhY2ggY2hhcmFjdGVyLCBmaW5kIG91dCBpdHMgd2lkdGguIElmIGl0IGNhbm5vdCBmaXQgaW4gdGhlXG4gICAgLy8gY29tbWFuZCBsaW5lIHdpbmRvdyBhbG9uZyB3aXRoIHRoZSByZXN0IG9mIHRoZSBzbGljZSBhbmQgdGhlIGN1cnNvclxuICAgIC8vIGhhc24ndCBiZWVuIGZvdW5kIHlldCwgcmVtb3ZlIGNoYXJhY3RlcnMgZnJvbSB0aGUgYmVnaW5uaW5nIG9mIHRoZVxuICAgIC8vIHNsaWNlIHVudGlsIHRoZSBjaGFyYWN0ZXIgZml0cy5cbiAgICAvLyBTdG9wIGVpdGhlciB3aGVuIGFsbCBjaGFyYWN0ZXJzIGFyZSBpbiB0aGUgc2xpY2Ugb3Igd2hlbiB0aGUgY3Vyc29yXG4gICAgLy8gY2FuIGJlIGRpc3BsYXllZCBhbmQgdGhlIHNsaWNlIHRha2VzIGFsbCBhdmFpbGFibGUgd2lkdGguXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFyYWN0ZXJzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHNsaWNlRW5kID0gaTtcbiAgICAgICAgY29uc3QgY2hhciA9IGNoYXJhY3RlcnNbaV07XG5cbiAgICAgICAgY29uc3QgY1dpZHRoID0gbWVhc3VyZVdpZHRoKHN0YXRlLCBjaGFyKTtcbiAgICAgICAgcmVuZGVyZWRJICs9IGNXaWR0aDtcblxuICAgICAgICBzbGljZVdpZHRoICs9IGNXaWR0aDtcbiAgICAgICAgaWYgKHNsaWNlV2lkdGggPiByZWN0LndpZHRoKSB7XG4gICAgICAgICAgICBpZiAoY3Vyc29yRGlzcGxheWVkKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlZENoYXIgPSBjaGFyYWN0ZXJzW3NsaWNlU3RhcnRdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZWRXaWR0aCA9IG1lYXN1cmVXaWR0aChzdGF0ZSwgcmVtb3ZlZENoYXIpO1xuICAgICAgICAgICAgICAgIHJlbmRlcmVkSSAtPSByZW1vdmVkV2lkdGg7XG4gICAgICAgICAgICAgICAgc2xpY2VXaWR0aCAtPSByZW1vdmVkV2lkdGg7XG4gICAgICAgICAgICAgICAgc2xpY2VTdGFydCArPSAxO1xuICAgICAgICAgICAgfSB3aGlsZSAoc2xpY2VXaWR0aCA+IHJlY3Qud2lkdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZW5jb2RlZEkgKz0gZW5jb2Rlci5lbmNvZGUoY2hhcikubGVuZ3RoO1xuICAgICAgICBpZiAoZW5jb2RlZEkgPT09IGNvbW1hbmRMaW5lLnBvcykge1xuICAgICAgICAgICAgY3Vyc29yWCA9IHJlbmRlcmVkSTtcbiAgICAgICAgICAgIGN1cnNvckRpc3BsYXllZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNoYXJhY3RlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICByZW5kZXJlZEkgPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gc2xpY2VTdGFydDsgaSA8PSBzbGljZUVuZDsgKytpKSB7XG4gICAgICAgICAgICBjb25zdCBjaGFyID0gY2hhcmFjdGVyc1tpXTtcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChjaGFyLCB4ICsgcmVuZGVyZWRJLCB5ICsgYmFzZWxpbmUpO1xuICAgICAgICAgICAgcmVuZGVyZWRJICs9IG1lYXN1cmVXaWR0aChzdGF0ZSwgY2hhcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY3R4LmZpbGxSZWN0KHggKyBjdXJzb3JYLCB5LCAxLCBjaGFySGVpZ2h0KTtcbn1cblxuZnVuY3Rpb24gcGFpbnQgKF86IERPTUhpZ2hSZXNUaW1lU3RhbXApIHtcbiAgICBmcmFtZVNjaGVkdWxlZCA9IGZhbHNlO1xuXG4gICAgY29uc3Qgc3RhdGUgPSBnbG9iYWxTdGF0ZTtcbiAgICBjb25zdCBjYW52YXMgPSBzdGF0ZS5jYW52YXM7XG4gICAgY29uc3QgY29udGV4dCA9IHN0YXRlLmNvbnRleHQ7XG4gICAgY29uc3QgZ2lkID0gZ2V0R3JpZElkKCk7XG4gICAgY29uc3QgY2hhcmFjdGVyc0dyaWQgPSBzdGF0ZS5ncmlkQ2hhcmFjdGVyc1tnaWRdO1xuICAgIGNvbnN0IGhpZ2hsaWdodHNHcmlkID0gc3RhdGUuZ3JpZEhpZ2hsaWdodHNbZ2lkXTtcbiAgICBjb25zdCBkYW1hZ2VzID0gc3RhdGUuZ3JpZERhbWFnZXNbZ2lkXTtcbiAgICBjb25zdCBkYW1hZ2VDb3VudCA9IHN0YXRlLmdyaWREYW1hZ2VzQ291bnRbZ2lkXTtcbiAgICBjb25zdCBoaWdobGlnaHRzID0gc3RhdGUuaGlnaGxpZ2h0cztcbiAgICBjb25zdCBbY2hhcldpZHRoLCBjaGFySGVpZ2h0LCBiYXNlbGluZV0gPSBnZXRHbHlwaEluZm8oc3RhdGUpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYW1hZ2VDb3VudDsgKytpKSB7XG4gICAgICAgIGNvbnN0IGRhbWFnZSA9IGRhbWFnZXNbaV07XG4gICAgICAgIHN3aXRjaCAoZGFtYWdlLmtpbmQpIHtcbiAgICAgICAgICAgIGNhc2UgRGFtYWdlS2luZC5SZXNpemU6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwaXhlbFdpZHRoID0gZGFtYWdlLncgKiBjaGFyV2lkdGggLyB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcbiAgICAgICAgICAgICAgICBjb25zdCBwaXhlbEhlaWdodCA9IGRhbWFnZS5oICogY2hhckhlaWdodCAvIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xuICAgICAgICAgICAgICAgIHBhZ2UucmVzaXplRWRpdG9yKHBpeGVsV2lkdGgsIHBpeGVsSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBzZXRDYW52YXNEaW1lbnNpb25zKGNhbnZhcywgcGl4ZWxXaWR0aCwgcGl4ZWxIZWlnaHQpO1xuICAgICAgICAgICAgICAgIC8vIE5vdGU6IGNoYW5naW5nIHdpZHRoIGFuZCBoZWlnaHQgcmVzZXRzIGZvbnQsIHNvIHdlIGhhdmUgdG9cbiAgICAgICAgICAgICAgICAvLyBzZXQgaXQgYWdhaW4uIFdobyB0aG91Z2h0IHRoaXMgd2FzIGEgZ29vZCBpZGVhPz8/XG4gICAgICAgICAgICAgICAgY29udGV4dC5mb250ID0gZm9udFN0cmluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBEYW1hZ2VLaW5kLlNjcm9sbDpcbiAgICAgICAgICAgIGNhc2UgRGFtYWdlS2luZC5DZWxsOlxuICAgICAgICAgICAgICAgIGZvciAobGV0IHkgPSBkYW1hZ2UueTsgeSA8IGRhbWFnZS55ICsgZGFtYWdlLmggJiYgeSA8IGNoYXJhY3RlcnNHcmlkLmxlbmd0aDsgKyt5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IGNoYXJhY3RlcnNHcmlkW3ldO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByb3dIaWdoID0gaGlnaGxpZ2h0c0dyaWRbeV07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBpeGVsWSA9IHkgKiBjaGFySGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSBkYW1hZ2UueDsgeCA8IGRhbWFnZS54ICsgZGFtYWdlLncgJiYgeCA8IHJvdy5sZW5ndGg7ICsreCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvd1t4XSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGl4ZWxYID0geCAqIGNoYXJXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gZ2x5cGhJZChyb3dbeF0sIHJvd0hpZ2hbeF0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2x5cGhDYWNoZVtpZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxIaWdoID0gaGlnaGxpZ2h0c1tyb3dIaWdoW3hdXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3aWR0aCA9IE1hdGguY2VpbChtZWFzdXJlV2lkdGgoc3RhdGUsIHJvd1t4XSkgLyBjaGFyV2lkdGgpICogY2hhcldpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiYWNrZ3JvdW5kID0gY2VsbEhpZ2guYmFja2dyb3VuZCB8fCBoaWdobGlnaHRzWzBdLmJhY2tncm91bmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZvcmVncm91bmQgPSBjZWxsSGlnaC5mb3JlZ3JvdW5kIHx8IGhpZ2hsaWdodHNbMF0uZm9yZWdyb3VuZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbEhpZ2gucmV2ZXJzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0bXAgPSBiYWNrZ3JvdW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kID0gZm9yZWdyb3VuZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWdyb3VuZCA9IHRtcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBiYWNrZ3JvdW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QocGl4ZWxYLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGl4ZWxZLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFySGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGZvcmVncm91bmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZvbnRTdHIgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGFuZ2VGb250ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGxIaWdoLmJvbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFN0ciArPSBcIiBib2xkIFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VGb250ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGxIaWdoLml0YWxpYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U3RyICs9IFwiIGl0YWxpYyBcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlRm9udCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VGb250KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZm9udCA9IGZvbnRTdHIgKyBmb250U3RyaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxUZXh0KHJvd1t4XSwgcGl4ZWxYLCBwaXhlbFkgKyBiYXNlbGluZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZUZvbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5mb250ID0gZm9udFN0cmluZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGxIaWdoLnN0cmlrZXRocm91Z2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdChwaXhlbFgsIHBpeGVsWSArIGJhc2VsaW5lIC8gMiwgd2lkdGgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGNlbGxIaWdoLnNwZWNpYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZWxpbmVIZWlnaHQgPSAoY2hhckhlaWdodCAtIGJhc2VsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbEhpZ2gudW5kZXJsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVwb3MgPSBiYXNlbGluZUhlaWdodCAqIDAuMztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdChwaXhlbFgsIHBpeGVsWSArIGJhc2VsaW5lICsgbGluZXBvcywgd2lkdGgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbEhpZ2gudW5kZXJjdXJsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cmxwb3MgPSBiYXNlbGluZUhlaWdodCAqIDAuNjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgYWJzY2lzc2EgPSBwaXhlbFg7IGFic2Npc3NhIDwgcGl4ZWxYICsgd2lkdGg7ICsrYWJzY2lzc2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoYWJzY2lzc2EsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpeGVsWSArIGJhc2VsaW5lICsgY3VybHBvcyArIE1hdGguY29zKGFic2Npc3NhKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVhc29uIGZvciB0aGUgY2hlY2s6IHdlIGNhbid0IHJldHJpZXZlIHBpeGVsc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRyYXduIG91dHNpZGUgdGhlIHZpZXdwb3J0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBpeGVsWCA+PSAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHBpeGVsWSA+PSAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIChwaXhlbFggKyB3aWR0aCA8IGNhbnZhcy53aWR0aClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgKHBpeGVsWSArIGNoYXJIZWlnaHQgPCBjYW52YXMuaGVpZ2h0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbHlwaENhY2hlW2lkXSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGl4ZWxYLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGl4ZWxZLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFySGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQucHV0SW1hZ2VEYXRhKGdseXBoQ2FjaGVbaWRdLCBwaXhlbFgsIHBpeGVsWSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3RhdGUubWVzc2FnZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBwYWludE1lc3NhZ2VzKHN0YXRlKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgY29tbWFuZCBsaW5lIGlzIHNob3duLCB0aGUgY3Vyc29yJ3MgaW4gaXRcbiAgICBpZiAoc3RhdGUuY29tbWFuZExpbmUuc3RhdHVzID09PSBcInNob3duXCIpIHtcbiAgICAgICAgcGFpbnRDb21tYW5kbGluZVdpbmRvdyhzdGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY3Vyc29yID0gc3RhdGUuY3Vyc29yO1xuICAgICAgICBpZiAoY3Vyc29yLmN1cnJlbnRHcmlkID09PSBnaWQpIHtcbiAgICAgICAgICAgIC8vIE1pc3Npbmc6IGhhbmRsaW5nIG9mIGNlbGwtcGVyY2VudGFnZVxuICAgICAgICAgICAgY29uc3QgbW9kZSA9IHN0YXRlLm1vZGU7XG4gICAgICAgICAgICBjb25zdCBpbmZvID0gbW9kZS5zdHlsZUVuYWJsZWRcbiAgICAgICAgICAgICAgICA/IG1vZGUubW9kZUluZm9bbW9kZS5jdXJyZW50XVxuICAgICAgICAgICAgICAgIDogbW9kZS5tb2RlSW5mb1swXTtcbiAgICAgICAgICAgIGNvbnN0IHNob3VsZEJsaW5rID0gKGluZm8uYmxpbmt3YWl0ID4gMCAmJiBpbmZvLmJsaW5rb24gPiAwICYmIGluZm8uYmxpbmtvZmYgPiAwKTtcblxuICAgICAgICAgICAgLy8gRGVjaWRlIGNvbG9yLiBBcyBkZXNjcmliZWQgaW4gdGhlIGRvYywgaWYgYXR0cl9pZCBpcyAwIGNvbG9yc1xuICAgICAgICAgICAgLy8gc2hvdWxkIGJlIHJldmVydGVkLlxuICAgICAgICAgICAgbGV0IGJhY2tncm91bmQgPSBoaWdobGlnaHRzW2luZm8uYXR0cl9pZF0uYmFja2dyb3VuZDtcbiAgICAgICAgICAgIGxldCBmb3JlZ3JvdW5kID0gaGlnaGxpZ2h0c1tpbmZvLmF0dHJfaWRdLmZvcmVncm91bmQ7XG4gICAgICAgICAgICBpZiAoaW5mby5hdHRyX2lkID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG1wID0gYmFja2dyb3VuZDtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kID0gZm9yZWdyb3VuZDtcbiAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kID0gdG1wO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBEZWNpZGUgY3Vyc29yIHNoYXBlLiBEZWZhdWx0IHRvIGJsb2NrLCBjaGFuZ2UgdG9cbiAgICAgICAgICAgIC8vIHZlcnRpY2FsL2hvcml6b250YWwgaWYgbmVlZGVkLlxuICAgICAgICAgICAgY29uc3QgY3Vyc29yV2lkdGggPSBjdXJzb3IueCAqIGNoYXJXaWR0aDtcbiAgICAgICAgICAgIGxldCBjdXJzb3JIZWlnaHQgPSBjdXJzb3IueSAqIGNoYXJIZWlnaHQ7XG4gICAgICAgICAgICBsZXQgd2lkdGggPSBjaGFyV2lkdGg7XG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gY2hhckhlaWdodDtcbiAgICAgICAgICAgIGlmIChpbmZvLmN1cnNvcl9zaGFwZSA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICAgICAgICAgICAgd2lkdGggPSAxO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmZvLmN1cnNvcl9zaGFwZSA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgICAgICAgICBjdXJzb3JIZWlnaHQgKz0gY2hhckhlaWdodCAtIDI7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgbm93ID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgICAgICAvLyBEZWNpZGUgaWYgdGhlIGN1cnNvciBzaG91bGQgYmUgaW52ZXJ0ZWQuIFRoaXMgb25seSBoYXBwZW5zIGlmXG4gICAgICAgICAgICAvLyBibGlua2luZyBpcyBvbiwgd2UndmUgd2FpdGVkIGJsaW5rd2FpdCB0aW1lIGFuZCB3ZSdyZSBpbiB0aGVcbiAgICAgICAgICAgIC8vIFwiYmxpbmtvZmZcIiB0aW1lIHNsb3QuXG4gICAgICAgICAgICBjb25zdCBibGlua09mZiA9IHNob3VsZEJsaW5rXG4gICAgICAgICAgICAgICAgJiYgKG5vdyAtIGluZm8uYmxpbmt3YWl0ID4gY3Vyc29yLmxhc3RNb3ZlKVxuICAgICAgICAgICAgICAgICYmICgobm93ICUgKGluZm8uYmxpbmtvbiArIGluZm8uYmxpbmtvZmYpKSA+IGluZm8uYmxpbmtvbik7XG4gICAgICAgICAgICBpZiAoYmxpbmtPZmYpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBoaWdoID0gaGlnaGxpZ2h0c1toaWdobGlnaHRzR3JpZFtjdXJzb3IueV1bY3Vyc29yLnhdXTtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kID0gaGlnaC5iYWNrZ3JvdW5kO1xuICAgICAgICAgICAgICAgIGZvcmVncm91bmQgPSBoaWdoLmZvcmVncm91bmQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEZpbmFsbHkgZHJhdyBjdXJzb3JcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gYmFja2dyb3VuZDtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoY3Vyc29yV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvckhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodCk7XG5cbiAgICAgICAgICAgIGlmIChpbmZvLmN1cnNvcl9zaGFwZSA9PT0gXCJibG9ja1wiKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBmb3JlZ3JvdW5kO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoYXIgPSBjaGFyYWN0ZXJzR3JpZFtjdXJzb3IueV1bY3Vyc29yLnhdO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFRleHQoY2hhciwgY3Vyc29yLnggKiBjaGFyV2lkdGgsIGN1cnNvci55ICogY2hhckhlaWdodCArIGJhc2VsaW5lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNob3VsZEJsaW5rKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIGN1cnNvciBzaG91bGQgYmxpbmssIHdlIG5lZWQgdG8gcGFpbnQgY29udGludW91c2x5XG4gICAgICAgICAgICAgICAgY29uc3QgcmVsYXRpdmVOb3cgPSBwZXJmb3JtYW5jZS5ub3coKSAlIChpbmZvLmJsaW5rb24gKyBpbmZvLmJsaW5rb2ZmKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0UGFpbnQgPSByZWxhdGl2ZU5vdyA8IGluZm8uYmxpbmtvblxuICAgICAgICAgICAgICAgICAgICA/IGluZm8uYmxpbmtvbiAtIHJlbGF0aXZlTm93XG4gICAgICAgICAgICAgICAgICAgIDogaW5mby5ibGlua29mZiAtIChyZWxhdGl2ZU5vdyAtIGluZm8uYmxpbmtvbik7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChzY2hlZHVsZUZyYW1lLCBuZXh0UGFpbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGUuZ3JpZERhbWFnZXNDb3VudFtnaWRdID0gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uUmVkcmF3KGV2ZW50czogYW55W10pIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1tpXTtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IChoYW5kbGVycyBhcyBhbnkpWyhldmVudFswXSBhcyBhbnkpXTtcbiAgICAgICAgaWYgKGhhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCBldmVudC5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgICAgIGhhbmRsZXIuYXBwbHkoZ2xvYmFsU3RhdGUsIGV2ZW50W2pdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoYCR7ZXZlbnRbMF19IGlzIG5vdCBpbXBsZW1lbnRlZC5gKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIFRoZXNlIG1vZGVzIGFyZSBkZWZpbmVkIGluIGh0dHBzOi8vZ2l0aHViLmNvbS9uZW92aW0vbmVvdmltL2Jsb2IvbWFzdGVyL3NyYy9udmltL2N1cnNvcl9zaGFwZS5jXG5leHBvcnQgdHlwZSBOdmltTW9kZSA9IFwiYWxsXCJcbiAgfCBcIm5vcm1hbFwiXG4gIHwgXCJ2aXN1YWxcIlxuICB8IFwiaW5zZXJ0XCJcbiAgfCBcInJlcGxhY2VcIlxuICB8IFwiY21kbGluZV9ub3JtYWxcIlxuICB8IFwiY21kbGluZV9pbnNlcnRcIlxuICB8IFwiY21kbGluZV9yZXBsYWNlXCJcbiAgfCBcIm9wZXJhdG9yXCJcbiAgfCBcInZpc3VhbF9zZWxlY3RcIlxuICB8IFwiY21kbGluZV9ob3ZlclwiXG4gIHwgXCJzdGF0dXNsaW5lX2hvdmVyXCJcbiAgfCBcInN0YXR1c2xpbmVfZHJhZ1wiXG4gIHwgXCJ2c2VwX2hvdmVyXCJcbiAgfCBcInZzZXBfZHJhZ1wiXG4gIHwgXCJtb3JlXCJcbiAgfCBcIm1vcmVfbGFzdGxpbmVcIlxuICB8IFwic2hvd21hdGNoXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNpdGVDb25maWcge1xuICAgIGNtZGxpbmU6IFwibmVvdmltXCIgfCBcImZpcmVudmltXCI7XG4gICAgY29udGVudDogXCJodG1sXCIgfCBcInRleHRcIjtcbiAgICBwcmlvcml0eTogbnVtYmVyO1xuICAgIHJlbmRlcmVyOiBcImh0bWxcIiB8IFwiY2FudmFzXCI7XG4gICAgc2VsZWN0b3I6IHN0cmluZztcbiAgICB0YWtlb3ZlcjogXCJhbHdheXNcIiB8IFwib25jZVwiIHwgXCJlbXB0eVwiIHwgXCJub25lbXB0eVwiIHwgXCJuZXZlclwiO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWcge1xuICAgIGdsb2JhbFNldHRpbmdzOiB7XG4gICAgICAgIGFsdDogXCJhbHBoYW51bVwiIHwgXCJhbGxcIixcbiAgICAgICAgXCI8Qy1uPlwiOiBcImRlZmF1bHRcIiB8IFwibm9vcFwiLFxuICAgICAgICBcIjxDLXQ+XCI6IFwiZGVmYXVsdFwiIHwgXCJub29wXCIsXG4gICAgICAgIFwiPEMtdz5cIjogXCJkZWZhdWx0XCIgfCBcIm5vb3BcIixcbiAgICAgICAgXCI8Q1Mtbj5cIjogXCJkZWZhdWx0XCIgfCBcIm5vb3BcIixcbiAgICAgICAgXCI8Q1MtdD5cIjogXCJkZWZhdWx0XCIgfCBcIm5vb3BcIixcbiAgICAgICAgXCI8Q1Mtdz5cIjogXCJkZWZhdWx0XCIgfCBcIm5vb3BcIixcbiAgICAgICAgaWdub3JlS2V5czogeyBba2V5IGluIE52aW1Nb2RlXTogc3RyaW5nW10gfSxcbiAgICB9O1xuICAgIGxvY2FsU2V0dGluZ3M6IHsgW2tleTogc3RyaW5nXTogSVNpdGVDb25maWcgfTtcbn1cblxubGV0IGNvbmY6IElDb25maWcgPSB1bmRlZmluZWQgYXMgSUNvbmZpZztcblxuZXhwb3J0IGNvbnN0IGNvbmZSZWFkeSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgIGJyb3dzZXIuc3RvcmFnZS5sb2NhbC5nZXQoKS50aGVuKChvYmo6IGFueSkgPT4ge1xuICAgICAgICBjb25mID0gb2JqO1xuICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgIH0pO1xufSk7XG5cbmJyb3dzZXIuc3RvcmFnZS5vbkNoYW5nZWQuYWRkTGlzdGVuZXIoKGNoYW5nZXM6IGFueSkgPT4ge1xuICAgIE9iamVjdFxuICAgICAgICAuZW50cmllcyhjaGFuZ2VzKVxuICAgICAgICAuZm9yRWFjaCgoW2tleSwgdmFsdWVdOiBba2V5b2YgSUNvbmZpZywgYW55XSkgPT4gY29uZlJlYWR5LnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uZltrZXldID0gdmFsdWUubmV3VmFsdWU7XG4gICAgICAgIH0pKTtcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0R2xvYmFsQ29uZigpIHtcbiAgICAvLyBDYW4ndCBiZSB0ZXN0ZWQgZm9yXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAoY29uZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImdldEdsb2JhbENvbmYgY2FsbGVkIGJlZm9yZSBjb25maWcgd2FzIHJlYWR5XCIpO1xuICAgIH1cbiAgICByZXR1cm4gY29uZi5nbG9iYWxTZXR0aW5ncztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbmYoKSB7XG4gICAgcmV0dXJuIGdldENvbmZGb3JVcmwoZG9jdW1lbnQubG9jYXRpb24uaHJlZik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb25mRm9yVXJsKHVybDogc3RyaW5nKTogSVNpdGVDb25maWcge1xuICAgIGNvbnN0IGxvY2FsU2V0dGluZ3MgPSBjb25mLmxvY2FsU2V0dGluZ3M7XG4gICAgZnVuY3Rpb24gb3IxKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG4gICAgLy8gQ2FuJ3QgYmUgdGVzdGVkIGZvclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKGxvY2FsU2V0dGluZ3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvcjogeW91ciBzZXR0aW5ncyBhcmUgdW5kZWZpbmVkLiBUcnkgcmVsb2FkaW5nIHRoZSBwYWdlLiBJZiB0aGlzIGVycm9yIHBlcnNpc3RzLCB0cnkgdGhlIHRyb3VibGVzaG9vdGluZyBndWlkZTogaHR0cHM6Ly9naXRodWIuY29tL2dsYWNhbWJyZS9maXJlbnZpbS9ibG9iL21hc3Rlci9UUk9VQkxFU0hPT1RJTkcubWRcIik7XG4gICAgfVxuICAgIHJldHVybiBBcnJheS5mcm9tKE9iamVjdC5lbnRyaWVzKGxvY2FsU2V0dGluZ3MpKVxuICAgICAgICAuZmlsdGVyKChbcGF0LCBfXSkgPT4gKG5ldyBSZWdFeHAocGF0KSkudGVzdCh1cmwpKVxuICAgICAgICAuc29ydCgoZTEsIGUyKSA9PiAob3IxKGUxWzFdLnByaW9yaXR5KSAtIG9yMShlMlsxXS5wcmlvcml0eSkpKVxuICAgICAgICAucmVkdWNlKChhY2MsIFtfLCBjdXJdKSA9PiBPYmplY3QuYXNzaWduKGFjYywgY3VyKSwge30gYXMgSVNpdGVDb25maWcpO1xufVxuIiwiZXhwb3J0IGNvbnN0IG5vbkxpdGVyYWxLZXlzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICBcIiBcIjogXCI8U3BhY2U+XCIsXG4gICAgXCI8XCI6IFwiPGx0PlwiLFxuICAgIFwiQXJyb3dEb3duXCI6IFwiPERvd24+XCIsXG4gICAgXCJBcnJvd0xlZnRcIjogXCI8TGVmdD5cIixcbiAgICBcIkFycm93UmlnaHRcIjogXCI8UmlnaHQ+XCIsXG4gICAgXCJBcnJvd1VwXCI6IFwiPFVwPlwiLFxuICAgIFwiQmFja3NwYWNlXCI6IFwiPEJTPlwiLFxuICAgIFwiRGVsZXRlXCI6IFwiPERlbD5cIixcbiAgICBcIkVuZFwiOiBcIjxFbmQ+XCIsXG4gICAgXCJFbnRlclwiOiBcIjxDUj5cIixcbiAgICBcIkVzY2FwZVwiOiBcIjxFc2M+XCIsXG4gICAgXCJGMVwiOiBcIjxGMT5cIixcbiAgICBcIkYxMFwiOiBcIjxGMTA+XCIsXG4gICAgXCJGMTFcIjogXCI8RjExPlwiLFxuICAgIFwiRjEyXCI6IFwiPEYxMj5cIixcbiAgICBcIkYxM1wiOiBcIjxGMTM+XCIsXG4gICAgXCJGMTRcIjogXCI8RjE0PlwiLFxuICAgIFwiRjE1XCI6IFwiPEYxNT5cIixcbiAgICBcIkYxNlwiOiBcIjxGMTY+XCIsXG4gICAgXCJGMTdcIjogXCI8RjE3PlwiLFxuICAgIFwiRjE4XCI6IFwiPEYxOD5cIixcbiAgICBcIkYxOVwiOiBcIjxGMTk+XCIsXG4gICAgXCJGMlwiOiBcIjxGMj5cIixcbiAgICBcIkYyMFwiOiBcIjxGMjA+XCIsXG4gICAgXCJGMjFcIjogXCI8RjIxPlwiLFxuICAgIFwiRjIyXCI6IFwiPEYyMj5cIixcbiAgICBcIkYyM1wiOiBcIjxGMjM+XCIsXG4gICAgXCJGMjRcIjogXCI8RjI0PlwiLFxuICAgIFwiRjNcIjogXCI8RjM+XCIsXG4gICAgXCJGNFwiOiBcIjxGND5cIixcbiAgICBcIkY1XCI6IFwiPEY1PlwiLFxuICAgIFwiRjZcIjogXCI8RjY+XCIsXG4gICAgXCJGN1wiOiBcIjxGNz5cIixcbiAgICBcIkY4XCI6IFwiPEY4PlwiLFxuICAgIFwiRjlcIjogXCI8Rjk+XCIsXG4gICAgXCJIb21lXCI6IFwiPEhvbWU+XCIsXG4gICAgXCJQYWdlRG93blwiOiBcIjxQYWdlRG93bj5cIixcbiAgICBcIlBhZ2VVcFwiOiBcIjxQYWdlVXA+XCIsXG4gICAgXCJUYWJcIjogXCI8VGFiPlwiLFxuICAgIFwiXFxcXFwiOiBcIjxCc2xhc2g+XCIsXG4gICAgXCJ8XCI6IFwiPEJhcj5cIixcbn07XG5cbmNvbnN0IG5vbkxpdGVyYWxWaW1LZXlzID0gT2JqZWN0LmZyb21FbnRyaWVzKE9iamVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmVudHJpZXMobm9uTGl0ZXJhbEtleXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKChbeCwgeV0pID0+IFt5LCB4XSkpO1xuXG5jb25zdCBub25MaXRlcmFsS2V5Q29kZXM6IHtba2V5OiBzdHJpbmddOiBudW1iZXJ9ID0ge1xuICAgIFwiRW50ZXJcIjogICAgICAxMyxcbiAgICBcIlNwYWNlXCI6ICAgICAgMzIsXG4gICAgXCJUYWJcIjogICAgICAgIDksXG4gICAgXCJEZWxldGVcIjogICAgIDQ2LFxuICAgIFwiRW5kXCI6ICAgICAgICAzNSxcbiAgICBcIkhvbWVcIjogICAgICAgMzYsXG4gICAgXCJJbnNlcnRcIjogICAgIDQ1LFxuICAgIFwiUGFnZURvd25cIjogICAzNCxcbiAgICBcIlBhZ2VVcFwiOiAgICAgMzMsXG4gICAgXCJBcnJvd0Rvd25cIjogIDQwLFxuICAgIFwiQXJyb3dMZWZ0XCI6ICAzNyxcbiAgICBcIkFycm93UmlnaHRcIjogMzksXG4gICAgXCJBcnJvd1VwXCI6ICAgIDM4LFxuICAgIFwiRXNjYXBlXCI6ICAgICAyNyxcbn07XG5cbi8vIEdpdmVuIGEgXCJzcGVjaWFsXCIga2V5IHJlcHJlc2VudGF0aW9uIChlLmcuIDxFbnRlcj4gb3IgPE0tbD4pLCByZXR1cm5zIGFuXG4vLyBhcnJheSBvZiB0aHJlZSBqYXZhc2NyaXB0IGtleWV2ZW50cywgdGhlIGZpcnN0IG9uZSByZXByZXNlbnRpbmcgdGhlXG4vLyBjb3JyZXNwb25kaW5nIGtleWRvd24sIHRoZSBzZWNvbmQgb25lIGEga2V5cHJlc3MgYW5kIHRoZSB0aGlyZCBvbmUgYSBrZXl1cFxuLy8gZXZlbnQuXG5mdW5jdGlvbiBtb2RLZXlUb0V2ZW50cyhrOiBzdHJpbmcpIHtcbiAgICBsZXQgbW9kcyA9IFwiXCI7XG4gICAgbGV0IGtleSA9IG5vbkxpdGVyYWxWaW1LZXlzW2tdO1xuICAgIGxldCBjdHJsS2V5ID0gZmFsc2U7XG4gICAgbGV0IGFsdEtleSA9IGZhbHNlO1xuICAgIGxldCBzaGlmdEtleSA9IGZhbHNlO1xuICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBhcnIgPSBrLnNsaWNlKDEsIC0xKS5zcGxpdChcIi1cIik7XG4gICAgICAgIG1vZHMgPSBhcnJbMF07XG4gICAgICAgIGtleSA9IGFyclsxXTtcbiAgICAgICAgY3RybEtleSA9IC9jL2kudGVzdChtb2RzKTtcbiAgICAgICAgYWx0S2V5ID0gL2EvaS50ZXN0KG1vZHMpO1xuICAgICAgICBjb25zdCBzcGVjaWFsQ2hhciA9IFwiPFwiICsga2V5ICsgXCI+XCI7XG4gICAgICAgIGlmIChub25MaXRlcmFsVmltS2V5c1tzcGVjaWFsQ2hhcl0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAga2V5ID0gbm9uTGl0ZXJhbFZpbUtleXNbc3BlY2lhbENoYXJdO1xuICAgICAgICAgICAgc2hpZnRLZXkgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNoaWZ0S2V5ID0ga2V5ICE9PSBrZXkudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBTb21lIHBhZ2VzIHJlbHkgb24ga2V5Q29kZXMgdG8gZmlndXJlIG91dCB3aGF0IGtleSB3YXMgcHJlc3NlZC4gVGhpcyBpc1xuICAgIC8vIGF3ZnVsIGJlY2F1c2Uga2V5Y29kZXMgYXJlbid0IGd1YXJhbnRlZWQgdG8gYmUgdGhlIHNhbWUgYWNycm9zc1xuICAgIC8vIGJyb3dzZXJzL09TL2tleWJvYXJkIGxheW91dHMgYnV0IHRyeSB0byBkbyB0aGUgcmlnaHQgdGhpbmcgYW55d2F5LlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9nbGFjYW1icmUvZmlyZW52aW0vaXNzdWVzLzcyM1xuICAgIGxldCBrZXlDb2RlID0gMDtcbiAgICBpZiAoL15bYS16QS1aMC05XSQvLnRlc3Qoa2V5KSkge1xuICAgICAgICBrZXlDb2RlID0ga2V5LmNoYXJDb2RlQXQoMCk7XG4gICAgfSBlbHNlIGlmIChub25MaXRlcmFsS2V5Q29kZXNba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGtleUNvZGUgPSBub25MaXRlcmFsS2V5Q29kZXNba2V5XTtcbiAgICB9XG4gICAgY29uc3QgaW5pdCA9IHsga2V5LCBrZXlDb2RlLCBjdHJsS2V5LCBhbHRLZXksIHNoaWZ0S2V5LCBidWJibGVzOiB0cnVlIH07XG4gICAgcmV0dXJuIFtcbiAgICAgICAgbmV3IEtleWJvYXJkRXZlbnQoXCJrZXlkb3duXCIsIGluaXQpLFxuICAgICAgICBuZXcgS2V5Ym9hcmRFdmVudChcImtleXByZXNzXCIsIGluaXQpLFxuICAgICAgICBuZXcgS2V5Ym9hcmRFdmVudChcImtleXVwXCIsIGluaXQpLFxuICAgIF07XG59XG5cbi8vIEdpdmVuIGEgXCJzaW1wbGVcIiBrZXkgKGUuZy4gYGFgLCBgMWDigKYpLCByZXR1cm5zIGFuIGFycmF5IG9mIHRocmVlIGphdmFzY3JpcHRcbi8vIGV2ZW50cyByZXByZXNlbnRpbmcgdGhlIGFjdGlvbiBvZiBwcmVzc2luZyB0aGUga2V5LlxuZnVuY3Rpb24ga2V5VG9FdmVudHMoa2V5OiBzdHJpbmcpIHtcbiAgICBjb25zdCBzaGlmdEtleSA9IGtleSAhPT0ga2V5LnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgbmV3IEtleWJvYXJkRXZlbnQoXCJrZXlkb3duXCIsICB7IGtleSwgc2hpZnRLZXksIGJ1YmJsZXM6IHRydWUgfSksXG4gICAgICAgIG5ldyBLZXlib2FyZEV2ZW50KFwia2V5cHJlc3NcIiwgeyBrZXksIHNoaWZ0S2V5LCBidWJibGVzOiB0cnVlIH0pLFxuICAgICAgICBuZXcgS2V5Ym9hcmRFdmVudChcImtleXVwXCIsICAgIHsga2V5LCBzaGlmdEtleSwgYnViYmxlczogdHJ1ZSB9KSxcbiAgICBdO1xufVxuXG4vLyBHaXZlbiBhbiBhcnJheSBvZiBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2Yga2V5cyAoZS5nLiBbXCJhXCIsIFwiPEVudGVyPlwiLCDigKZdKSxcbi8vIHJldHVybnMgYW4gYXJyYXkgb2YgamF2YXNjcmlwdCBrZXlib2FyZCBldmVudHMgdGhhdCBzaW11bGF0ZSB0aGVzZSBrZXlzXG4vLyBiZWluZyBwcmVzc2VkLlxuZXhwb3J0IGZ1bmN0aW9uIGtleXNUb0V2ZW50cyhrZXlzOiBzdHJpbmdbXSkge1xuICAgIC8vIENvZGUgdG8gc3BsaXQgbW9kIGtleXMgYW5kIG5vbi1tb2Qga2V5czpcbiAgICAvLyBjb25zdCBrZXlzID0gc3RyLm1hdGNoKC8oWzw+XVtePD5dK1s8Pl0pfChbXjw+XSspL2cpXG4gICAgLy8gaWYgKGtleXMgPT09IG51bGwpIHtcbiAgICAvLyAgICAgcmV0dXJuIFtdO1xuICAgIC8vIH1cbiAgICByZXR1cm4ga2V5cy5tYXAoKGtleSkgPT4ge1xuICAgICAgICBpZiAoa2V5WzBdID09PSBcIjxcIikge1xuICAgICAgICAgICAgcmV0dXJuIG1vZEtleVRvRXZlbnRzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGtleVRvRXZlbnRzKGtleSk7XG4gICAgfSkuZmxhdCgpO1xufVxuXG4vLyBUdXJucyBhIG5vbi1saXRlcmFsIGtleSAoZS5nLiBcIkVudGVyXCIpIGludG8gYSB2aW0tZXF1aXZhbGVudCBcIjxFbnRlcj5cIlxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZUtleShrZXk6IHN0cmluZykge1xuICAgIGlmIChub25MaXRlcmFsS2V5c1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIG5vbkxpdGVyYWxLZXlzW2tleV07XG4gICAgfVxuICAgIHJldHVybiBrZXk7XG59XG5cbi8vIEFkZCBtb2RpZmllciBgbW9kYCAoYEFgLCBgQ2AsIGBTYOKApikgdG8gYHRleHRgIChhIHZpbSBrZXkgYGJgLCBgPEVudGVyPmAsXG4vLyBgPENTLXg+YOKApilcbmV4cG9ydCBmdW5jdGlvbiBhZGRNb2RpZmllcihtb2Q6IHN0cmluZywgdGV4dDogc3RyaW5nKSB7XG4gICAgbGV0IG1hdGNoO1xuICAgIGxldCBtb2RpZmllcnMgPSBcIlwiO1xuICAgIGxldCBrZXkgPSBcIlwiO1xuICAgIGlmICgobWF0Y2ggPSB0ZXh0Lm1hdGNoKC9ePChbQS1aXXsxLDV9KS0oLispPiQvKSkpIHtcbiAgICAgICAgbW9kaWZpZXJzID0gbWF0Y2hbMV07XG4gICAgICAgIGtleSA9IG1hdGNoWzJdO1xuICAgIH0gZWxzZSBpZiAoKG1hdGNoID0gdGV4dC5tYXRjaCgvXjwoLispPiQvKSkpIHtcbiAgICAgICAga2V5ID0gbWF0Y2hbMV07XG4gICAgfSBlbHNlIHtcbiAgICAgICAga2V5ID0gdGV4dDtcbiAgICB9XG4gICAgcmV0dXJuIFwiPFwiICsgbW9kICsgbW9kaWZpZXJzICsgXCItXCIgKyBrZXkgKyBcIj5cIjtcbn1cbiIsImxldCBjdXJIb3N0ID0gXCJmaXJlZm94XCI7XG5cbi8vIENhbid0IGdldCBjb3ZlcmFnZSBmb3IgdGh1bmRlcmJpcmQuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuaWYgKChicm93c2VyIGFzIGFueSkuY29tcG9zZVNjcmlwdHMgIT09IHVuZGVmaW5lZCB8fCBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID09PSBcImFib3V0OmJsYW5rP2NvbXBvc2VcIikge1xuICAgIGN1ckhvc3QgPSBcInRodW5kZXJiaXJkXCI7XG4vLyBDaHJvbWUgZG9lc24ndCBoYXZlIGEgXCJicm93c2VyXCIgb2JqZWN0LCBpbnN0ZWFkIGl0IHVzZXMgXCJjaHJvbWVcIi5cbn0gZWxzZSBpZiAod2luZG93LmJyb3dzZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIGN1ckhvc3QgPSBcImNocm9tZVwiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDaHJvbWUoKSB7XG4gICAgcmV0dXJuIGN1ckhvc3QgPT09IFwiY2hyb21lXCI7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNUaHVuZGVyYmlyZCgpIHtcbiAgICByZXR1cm4gY3VySG9zdCA9PT0gXCJ0aHVuZGVyYmlyZFwiO1xufVxuXG4vLyBSdW5zIENPREUgaW4gdGhlIHBhZ2UncyBjb250ZXh0IGJ5IHNldHRpbmcgdXAgYSBjdXN0b20gZXZlbnQgbGlzdGVuZXIsXG4vLyBlbWJlZGRpbmcgYSBzY3JpcHQgZWxlbWVudCB0aGF0IHJ1bnMgdGhlIHBpZWNlIG9mIGNvZGUgYW5kIGVtaXRzIGl0cyByZXN1bHRcbi8vIGFzIGFuIGV2ZW50LlxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVJblBhZ2UoY29kZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICBjb25zdCBldmVudElkID0gKG5ldyBVUkwoYnJvd3Nlci5ydW50aW1lLmdldFVSTChcIlwiKSkpLmhvc3RuYW1lICsgTWF0aC5yYW5kb20oKTtcbiAgICAgICAgc2NyaXB0LmlubmVySFRNTCA9IGAoYXN5bmMgKGV2SWQpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCAke2NvZGV9O1xuICAgICAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChldklkLCB7XG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoZXZJZCwge1xuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHsgc3VjY2VzczogZmFsc2UsIHJlYXNvbjogZSB9LFxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoJHtKU09OLnN0cmluZ2lmeShldmVudElkKX0pYDtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRJZCwgKHsgZGV0YWlsIH06IGFueSkgPT4ge1xuICAgICAgICAgICAgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgIGlmIChkZXRhaWwuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGRldGFpbC5yZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChkZXRhaWwucmVhc29uKTtcbiAgICAgICAgfSwgeyBvbmNlOiB0cnVlIH0pO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfSk7XG59XG5cbi8vIFZhcmlvdXMgZmlsdGVycyB0aGF0IGFyZSB1c2VkIHRvIGNoYW5nZSB0aGUgYXBwZWFyYW5jZSBvZiB0aGUgQnJvd3NlckFjdGlvblxuLy8gaWNvbi5cbmNvbnN0IHN2Z3BhdGggPSBcImZpcmVudmltLnN2Z1wiO1xuY29uc3QgdHJhbnNmb3JtYXRpb25zID0ge1xuICAgIGRpc2FibGVkOiAoaW1nOiBVaW50OENsYW1wZWRBcnJheSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltZy5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICAgICAgLy8gU2tpcCB0cmFuc3BhcmVudCBwaXhlbHNcbiAgICAgICAgICAgIGlmIChpbWdbaSArIDNdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBtZWFuID0gTWF0aC5mbG9vcigoaW1nW2ldICsgaW1nW2kgKyAxXSArIGltZ1tpICsgMl0pIC8gMyk7XG4gICAgICAgICAgICBpbWdbaV0gPSBtZWFuO1xuICAgICAgICAgICAgaW1nW2kgKyAxXSA9IG1lYW47XG4gICAgICAgICAgICBpbWdbaSArIDJdID0gbWVhbjtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZXJyb3I6IChpbWc6IFVpbnQ4Q2xhbXBlZEFycmF5KSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1nLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgICAgICAvLyBUdXJuIHRyYW5zcGFyZW50IHBpeGVscyByZWRcbiAgICAgICAgICAgIGlmIChpbWdbaSArIDNdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaW1nW2ldID0gMjU1O1xuICAgICAgICAgICAgICAgIGltZ1tpICsgM10gPSAyNTU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG5vcm1hbDogKChfaW1nOiBVaW50OENsYW1wZWRBcnJheSkgPT4gKHVuZGVmaW5lZCBhcyBuZXZlcikpLFxuICAgIG5vdGlmaWNhdGlvbjogKGltZzogVWludDhDbGFtcGVkQXJyYXkpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWcubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgICAgIC8vIFR1cm4gdHJhbnNwYXJlbnQgcGl4ZWxzIHllbGxvd1xuICAgICAgICAgICAgaWYgKGltZ1tpICsgM10gPT09IDApIHtcbiAgICAgICAgICAgICAgICBpbWdbaV0gPSAyNTU7XG4gICAgICAgICAgICAgICAgaW1nW2kgKyAxXSA9IDI1NTtcbiAgICAgICAgICAgICAgICBpbWdbaSArIDNdID0gMjU1O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbn07XG5cbmV4cG9ydCB0eXBlIEljb25LaW5kID0ga2V5b2YgdHlwZW9mIHRyYW5zZm9ybWF0aW9ucztcblxuLy8gVGFrZXMgYW4gaWNvbiBraW5kIGFuZCBkaW1lbnNpb25zIGFzIHBhcmFtZXRlciwgZHJhd3MgdGhhdCB0byBhIGNhbnZhcyBhbmRcbi8vIHJldHVybnMgYSBwcm9taXNlIHRoYXQgd2lsbCBiZSByZXNvbHZlZCB3aXRoIHRoZSBjYW52YXMnIGltYWdlIGRhdGEuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SWNvbkltYWdlRGF0YShraW5kOiBJY29uS2luZCwgd2lkdGggPSAzMiwgaGVpZ2h0ID0gMzIpIHtcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY29uc3QgaW1nID0gbmV3IEltYWdlKHdpZHRoLCBoZWlnaHQpO1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBpbWcuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIGNvbnN0IGlkID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdHJhbnNmb3JtYXRpb25zW2tpbmRdKGlkLmRhdGEpO1xuICAgICAgICByZXNvbHZlKGlkKTtcbiAgICB9KSk7XG4gICAgaW1nLnNyYyA9IHN2Z3BhdGg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gR2l2ZW4gYSB1cmwgYW5kIGEgc2VsZWN0b3IsIHRyaWVzIHRvIGNvbXB1dGUgYSBuYW1lIHRoYXQgd2lsbCBiZSB1bmlxdWUsXG4vLyBzaG9ydCBhbmQgcmVhZGFibGUgZm9yIHRoZSB1c2VyLlxuZXhwb3J0IGZ1bmN0aW9uIHRvRmlsZU5hbWUodXJsOiBzdHJpbmcsIGlkOiBzdHJpbmcsIGxhbmd1YWdlOiBzdHJpbmcpIHtcbiAgICBsZXQgcGFyc2VkVVJMO1xuICAgIHRyeSB7XG4gICAgICAgIHBhcnNlZFVSTCA9IG5ldyBVUkwodXJsKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIE9ubHkgaGFwcGVucyB3aXRoIHRodW5kZXJiaXJkLCB3aGVyZSB3ZSBjYW4ndCBnZXQgY292ZXJhZ2VcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgcGFyc2VkVVJMID0geyBob3N0bmFtZTogJ3RodW5kZXJiaXJkJywgcGF0aG5hbWU6ICdtYWlsJyB9O1xuICAgIH1cbiAgICBjb25zdCBzaG9ydElkID0gaWQucmVwbGFjZSgvOm50aC1vZi10eXBlL2csIFwiXCIpO1xuICAgIGNvbnN0IHRvQWxwaGFOdW0gPSAoc3RyOiBzdHJpbmcpID0+IChzdHIubWF0Y2goL1thLXpBLVowLTldKy9nKSB8fCBbXSlcbiAgICAgICAgLmpvaW4oXCItXCIpXG4gICAgICAgIC5zbGljZSgtMzIpO1xuICAgIGNvbnN0IGV4dCA9IGxhbmd1YWdlVG9FeHRlbnNpb25zKGxhbmd1YWdlKTtcbiAgICByZXR1cm4gYCR7cGFyc2VkVVJMLmhvc3RuYW1lfV8ke3RvQWxwaGFOdW0ocGFyc2VkVVJMLnBhdGhuYW1lKX1fJHt0b0FscGhhTnVtKHNob3J0SWQpfS4ke2V4dH1gO1xufVxuXG4vLyBHaXZlbiBhIGxhbmd1YWdlIG5hbWUsIHJldHVybnMgYSBmaWxlbmFtZSBleHRlbnNpb24uIENhbiByZXR1cm4gdW5kZWZpbmVkLlxuZXhwb3J0IGZ1bmN0aW9uIGxhbmd1YWdlVG9FeHRlbnNpb25zKGxhbmd1YWdlOiBzdHJpbmcpIHtcbiAgICBpZiAobGFuZ3VhZ2UgPT09IHVuZGVmaW5lZCB8fCBsYW5ndWFnZSA9PT0gbnVsbCkge1xuICAgICAgICBsYW5ndWFnZSA9IFwiXCI7XG4gICAgfVxuICAgIGNvbnN0IGxhbmcgPSBsYW5ndWFnZS50b0xvd2VyQ2FzZSgpO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgc3dpdGNoIChsYW5nKSB7XG4gICAgICAgIGNhc2UgXCJhcGxcIjogICAgICAgICAgICAgIHJldHVybiBcImFwbFwiO1xuICAgICAgICBjYXNlIFwiYnJhaW5mdWNrXCI6ICAgICAgICByZXR1cm4gXCJiZlwiO1xuICAgICAgICBjYXNlIFwiY1wiOiAgICAgICAgICAgICAgICByZXR1cm4gXCJjXCI7XG4gICAgICAgIGNhc2UgXCJjI1wiOiAgICAgICAgICAgICAgIHJldHVybiBcImNzXCI7XG4gICAgICAgIGNhc2UgXCJjKytcIjogICAgICAgICAgICAgIHJldHVybiBcImNwcFwiO1xuICAgICAgICBjYXNlIFwiY2V5bG9uXCI6ICAgICAgICAgICByZXR1cm4gXCJjZXlsb25cIjtcbiAgICAgICAgY2FzZSBcImNsaWtlXCI6ICAgICAgICAgICAgcmV0dXJuIFwiY1wiO1xuICAgICAgICBjYXNlIFwiY2xvanVyZVwiOiAgICAgICAgICByZXR1cm4gXCJjbGpcIjtcbiAgICAgICAgY2FzZSBcImNtYWtlXCI6ICAgICAgICAgICAgcmV0dXJuIFwiLmNtYWtlXCI7XG4gICAgICAgIGNhc2UgXCJjb2JvbFwiOiAgICAgICAgICAgIHJldHVybiBcImNibFwiO1xuICAgICAgICBjYXNlIFwiY29mZmVlc2NyaXB0XCI6ICAgICByZXR1cm4gXCJjb2ZmZWVcIjtcbiAgICAgICAgY2FzZSBcImNvbW1vbmxpc3BcIjogICAgICByZXR1cm4gXCJsaXNwXCI7XG4gICAgICAgIGNhc2UgXCJjcnlzdGFsXCI6ICAgICAgICAgIHJldHVybiBcImNyXCI7XG4gICAgICAgIGNhc2UgXCJjc3NcIjogICAgICAgICAgICAgIHJldHVybiBcImNzc1wiO1xuICAgICAgICBjYXNlIFwiY3l0aG9uXCI6ICAgICAgICAgICByZXR1cm4gXCJweVwiO1xuICAgICAgICBjYXNlIFwiZFwiOiAgICAgICAgICAgICAgICByZXR1cm4gXCJkXCI7XG4gICAgICAgIGNhc2UgXCJkYXJ0XCI6ICAgICAgICAgICAgIHJldHVybiBcImRhcnRcIjtcbiAgICAgICAgY2FzZSBcImRpZmZcIjogICAgICAgICAgICAgcmV0dXJuIFwiZGlmZlwiO1xuICAgICAgICBjYXNlIFwiZG9ja2VyZmlsZVwiOiAgICAgICByZXR1cm4gXCJkb2NrZXJmaWxlXCI7XG4gICAgICAgIGNhc2UgXCJkdGRcIjogICAgICAgICAgICAgIHJldHVybiBcImR0ZFwiO1xuICAgICAgICBjYXNlIFwiZHlsYW5cIjogICAgICAgICAgICByZXR1cm4gXCJkeWxhblwiO1xuICAgICAgICAvLyBFaWZmZWwgd2FzIHRoZXJlIGZpcnN0IGJ1dCBlbGl4aXIgc2VlbXMgbW9yZSBsaWtlbHlcbiAgICAgICAgLy8gY2FzZSBcImVpZmZlbFwiOiAgICAgICAgICAgcmV0dXJuIFwiZVwiO1xuICAgICAgICBjYXNlIFwiZWxpeGlyXCI6ICAgICAgICAgICByZXR1cm4gXCJlXCI7XG4gICAgICAgIGNhc2UgXCJlbG1cIjogICAgICAgICAgICAgIHJldHVybiBcImVsbVwiO1xuICAgICAgICBjYXNlIFwiZXJsYW5nXCI6ICAgICAgICAgICByZXR1cm4gXCJlcmxcIjtcbiAgICAgICAgY2FzZSBcImYjXCI6ICAgICAgICAgICAgICAgcmV0dXJuIFwiZnNcIjtcbiAgICAgICAgY2FzZSBcImZhY3RvclwiOiAgICAgICAgICAgcmV0dXJuIFwiZmFjdG9yXCI7XG4gICAgICAgIGNhc2UgXCJmb3J0aFwiOiAgICAgICAgICAgIHJldHVybiBcImZ0aFwiO1xuICAgICAgICBjYXNlIFwiZm9ydHJhblwiOiAgICAgICAgICByZXR1cm4gXCJmOTBcIjtcbiAgICAgICAgY2FzZSBcImdhc1wiOiAgICAgICAgICAgICAgcmV0dXJuIFwiYXNtXCI7XG4gICAgICAgIGNhc2UgXCJnb1wiOiAgICAgICAgICAgICAgIHJldHVybiBcImdvXCI7XG4gICAgICAgIC8vIEdGTTogQ29kZU1pcnJvcidzIGdpdGh1Yi1mbGF2b3JlZCBtYXJrZG93blxuICAgICAgICBjYXNlIFwiZ2ZtXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJtZFwiO1xuICAgICAgICBjYXNlIFwiZ3Jvb3Z5XCI6ICAgICAgICAgICByZXR1cm4gXCJncm9vdnlcIjtcbiAgICAgICAgY2FzZSBcImhhbWxcIjogICAgICAgICAgICAgcmV0dXJuIFwiaGFtbFwiO1xuICAgICAgICBjYXNlIFwiaGFuZGxlYmFyc1wiOiAgICAgICByZXR1cm4gXCJoYnNcIjtcbiAgICAgICAgY2FzZSBcImhhc2tlbGxcIjogICAgICAgICAgcmV0dXJuIFwiaHNcIjtcbiAgICAgICAgY2FzZSBcImhheGVcIjogICAgICAgICAgICAgcmV0dXJuIFwiaHhcIjtcbiAgICAgICAgY2FzZSBcImh0bWxcIjogICAgICAgICAgICAgcmV0dXJuIFwiaHRtbFwiO1xuICAgICAgICBjYXNlIFwiaHRtbGVtYmVkZGVkXCI6ICAgICByZXR1cm4gXCJodG1sXCI7XG4gICAgICAgIGNhc2UgXCJodG1sbWl4ZWRcIjogICAgICAgIHJldHVybiBcImh0bWxcIjtcbiAgICAgICAgY2FzZSBcImphdmFcIjogICAgICAgICAgICAgcmV0dXJuIFwiamF2YVwiO1xuICAgICAgICBjYXNlIFwiamF2YXNjcmlwdFwiOiAgICAgICByZXR1cm4gXCJqc1wiO1xuICAgICAgICBjYXNlIFwiamluamEyXCI6ICAgICAgICAgICByZXR1cm4gXCJqaW5qYVwiO1xuICAgICAgICBjYXNlIFwianVsaWFcIjogICAgICAgICAgICByZXR1cm4gXCJqbFwiO1xuICAgICAgICBjYXNlIFwianN4XCI6ICAgICAgICAgICAgICByZXR1cm4gXCJqc3hcIjtcbiAgICAgICAgY2FzZSBcImtvdGxpblwiOiAgICAgICAgICAgcmV0dXJuIFwia3RcIjtcbiAgICAgICAgY2FzZSBcImxhdGV4XCI6ICAgICAgICAgICAgcmV0dXJuIFwibGF0ZXhcIjtcbiAgICAgICAgY2FzZSBcImxlc3NcIjogICAgICAgICAgICAgcmV0dXJuIFwibGVzc1wiO1xuICAgICAgICBjYXNlIFwibHVhXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJsdWFcIjtcbiAgICAgICAgY2FzZSBcIm1hcmtkb3duXCI6ICAgICAgICAgcmV0dXJuIFwibWRcIjtcbiAgICAgICAgY2FzZSBcIm1sbGlrZVwiOiAgICAgICAgICAgIHJldHVybiBcIm1sXCI7XG4gICAgICAgIGNhc2UgXCJvY2FtbFwiOiAgICAgICAgICAgIHJldHVybiBcIm1sXCI7XG4gICAgICAgIGNhc2UgXCJvY3RhdmVcIjogICAgICAgICAgIHJldHVybiBcIm1cIjtcbiAgICAgICAgY2FzZSBcInBhc2NhbFwiOiAgICAgICAgICAgcmV0dXJuIFwicGFzXCI7XG4gICAgICAgIGNhc2UgXCJwZXJsXCI6ICAgICAgICAgICAgIHJldHVybiBcInBsXCI7XG4gICAgICAgIGNhc2UgXCJwaHBcIjogICAgICAgICAgICAgIHJldHVybiBcInBocFwiO1xuICAgICAgICBjYXNlIFwicG93ZXJzaGVsbFwiOiAgICAgICByZXR1cm4gXCJwczFcIjtcbiAgICAgICAgY2FzZSBcInB5dGhvblwiOiAgICAgICAgICAgcmV0dXJuIFwicHlcIjtcbiAgICAgICAgY2FzZSBcInJcIjogICAgICAgICAgICAgICAgcmV0dXJuIFwiclwiO1xuICAgICAgICBjYXNlIFwicnN0XCI6ICAgICAgICAgICAgICByZXR1cm4gXCJyc3RcIjtcbiAgICAgICAgY2FzZSBcInJ1YnlcIjogICAgICAgICAgICAgcmV0dXJuIFwicnVieVwiO1xuICAgICAgICBjYXNlIFwicnVzdFwiOiAgICAgICAgICAgICByZXR1cm4gXCJyc1wiO1xuICAgICAgICBjYXNlIFwic2FzXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJzYXNcIjtcbiAgICAgICAgY2FzZSBcInNhc3NcIjogICAgICAgICAgICAgcmV0dXJuIFwic2Fzc1wiO1xuICAgICAgICBjYXNlIFwic2NhbGFcIjogICAgICAgICAgICByZXR1cm4gXCJzY2FsYVwiO1xuICAgICAgICBjYXNlIFwic2NoZW1lXCI6ICAgICAgICAgICByZXR1cm4gXCJzY21cIjtcbiAgICAgICAgY2FzZSBcInNjc3NcIjogICAgICAgICAgICAgcmV0dXJuIFwic2Nzc1wiO1xuICAgICAgICBjYXNlIFwic21hbGx0YWxrXCI6ICAgICAgICByZXR1cm4gXCJzdFwiO1xuICAgICAgICBjYXNlIFwic2hlbGxcIjogICAgICAgICAgICByZXR1cm4gXCJzaFwiO1xuICAgICAgICBjYXNlIFwic3FsXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJzcWxcIjtcbiAgICAgICAgY2FzZSBcInN0ZXhcIjogICAgICAgICAgICAgcmV0dXJuIFwibGF0ZXhcIjtcbiAgICAgICAgY2FzZSBcInN3aWZ0XCI6ICAgICAgICAgICAgcmV0dXJuIFwic3dpZnRcIjtcbiAgICAgICAgY2FzZSBcInRjbFwiOiAgICAgICAgICAgICAgcmV0dXJuIFwidGNsXCI7XG4gICAgICAgIGNhc2UgXCJ0b21sXCI6ICAgICAgICAgICAgIHJldHVybiBcInRvbWxcIjtcbiAgICAgICAgY2FzZSBcInR3aWdcIjogICAgICAgICAgICAgcmV0dXJuIFwidHdpZ1wiO1xuICAgICAgICBjYXNlIFwidHlwZXNjcmlwdFwiOiAgICAgICByZXR1cm4gXCJ0c1wiO1xuICAgICAgICBjYXNlIFwidmJcIjogICAgICAgICAgICAgICByZXR1cm4gXCJ2YlwiO1xuICAgICAgICBjYXNlIFwidmJzY3JpcHRcIjogICAgICAgICByZXR1cm4gXCJ2YnNcIjtcbiAgICAgICAgY2FzZSBcInZlcmlsb2dcIjogICAgICAgICAgcmV0dXJuIFwic3ZcIjtcbiAgICAgICAgY2FzZSBcInZoZGxcIjogICAgICAgICAgICAgcmV0dXJuIFwidmhkbFwiO1xuICAgICAgICBjYXNlIFwieG1sXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJ4bWxcIjtcbiAgICAgICAgY2FzZSBcInlhbWxcIjogICAgICAgICAgICAgcmV0dXJuIFwieWFtbFwiO1xuICAgICAgICBjYXNlIFwiejgwXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJ6OGFcIjtcbiAgICB9XG4gICAgcmV0dXJuIFwidHh0XCI7XG59XG5cbi8vIE1ha2UgdHNsaW50IGhhcHB5XG5jb25zdCBmb250RmFtaWx5ID0gXCJmb250LWZhbWlseVwiO1xuXG4vLyBQYXJzZXMgYSBndWlmb250IGRlY2xhcmF0aW9uIGFzIGRlc2NyaWJlZCBpbiBgOmggRTI0NGBcbi8vIGRlZmF1bHRzOiBkZWZhdWx0IHZhbHVlIGZvciBlYWNoIG9mLlxuLy8gQ2FuJ3QgYmUgdGVzdGVkIGUyZSA6L1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUd1aWZvbnQoZ3VpZm9udDogc3RyaW5nLCBkZWZhdWx0czogYW55KSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGd1aWZvbnQuc3BsaXQoXCI6XCIpO1xuICAgIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzKTtcbiAgICBpZiAoL15bYS16QS1aMC05XSskLy50ZXN0KG9wdGlvbnNbMF0pKSB7XG4gICAgICAgIHJlc3VsdFtmb250RmFtaWx5XSA9IG9wdGlvbnNbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0W2ZvbnRGYW1pbHldID0gSlNPTi5zdHJpbmdpZnkob3B0aW9uc1swXSk7XG4gICAgfVxuICAgIGlmIChkZWZhdWx0c1tmb250RmFtaWx5XSkge1xuICAgICAgICByZXN1bHRbZm9udEZhbWlseV0gKz0gYCwgJHtkZWZhdWx0c1tmb250RmFtaWx5XX1gO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucy5zbGljZSgxKS5yZWR1Y2UoKGFjYywgb3B0aW9uKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKG9wdGlvblswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJoXCI6XG4gICAgICAgICAgICAgICAgICAgIGFjY1tcImZvbnQtc2l6ZVwiXSA9IGAke29wdGlvbi5zbGljZSgxKX1wdGA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJiXCI6XG4gICAgICAgICAgICAgICAgICAgIGFjY1tcImZvbnQtd2VpZ2h0XCJdID0gXCJib2xkXCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJpXCI6XG4gICAgICAgICAgICAgICAgICAgIGFjY1tcImZvbnQtc3R5bGVcIl0gPSBcIml0YWxpY1wiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwidVwiOlxuICAgICAgICAgICAgICAgICAgICBhY2NbXCJ0ZXh0LWRlY29yYXRpb25cIl0gPSBcInVuZGVybGluZVwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwic1wiOlxuICAgICAgICAgICAgICAgICAgICBhY2NbXCJ0ZXh0LWRlY29yYXRpb25cIl0gPSBcImxpbmUtdGhyb3VnaFwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwid1wiOiAvLyBDYW4ndCBzZXQgZm9udCB3aWR0aC4gV291bGQgaGF2ZSB0byBhZGp1c3QgY2VsbCB3aWR0aC5cbiAgICAgICAgICAgICAgICBjYXNlIFwiY1wiOiAvLyBDYW4ndCBzZXQgY2hhcmFjdGVyIHNldFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIHJlc3VsdCBhcyBhbnkpO1xufVxuXG4vLyBDb21wdXRlcyBhIHVuaXF1ZSBzZWxlY3RvciBmb3IgaXRzIGFyZ3VtZW50LlxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVTZWxlY3RvcihlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGZ1bmN0aW9uIHVuaXF1ZVNlbGVjdG9yKGU6IEhUTUxFbGVtZW50KTogc3RyaW5nIHtcbiAgICAgICAgLy8gT25seSBtYXRjaGluZyBhbHBoYW51bWVyaWMgc2VsZWN0b3JzIGJlY2F1c2Ugb3RoZXJzIGNoYXJzIG1pZ2h0IGhhdmUgc3BlY2lhbCBtZWFuaW5nIGluIENTU1xuICAgICAgICBpZiAoZS5pZCAmJiBlLmlkLm1hdGNoKFwiXlthLXpBLVowLTlfLV0rJFwiKSkge1xuICAgICAgICAgICAgY29uc3QgaWQgPSBlLnRhZ05hbWUgKyBgW2lkPVwiJHtlLmlkfVwiXWA7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChpZCkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIElmIHdlIHJlYWNoZWQgdGhlIHRvcCBvZiB0aGUgZG9jdW1lbnRcbiAgICAgICAgaWYgKCFlLnBhcmVudEVsZW1lbnQpIHsgcmV0dXJuIFwiSFRNTFwiOyB9XG4gICAgICAgIC8vIENvbXB1dGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBlbGVtZW50XG4gICAgICAgIGNvbnN0IGluZGV4ID1cbiAgICAgICAgICAgIEFycmF5LmZyb20oZS5wYXJlbnRFbGVtZW50LmNoaWxkcmVuKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoY2hpbGQgPT4gY2hpbGQudGFnTmFtZSA9PT0gZS50YWdOYW1lKVxuICAgICAgICAgICAgICAgIC5pbmRleE9mKGUpICsgMTtcbiAgICAgICAgcmV0dXJuIGAke3VuaXF1ZVNlbGVjdG9yKGUucGFyZW50RWxlbWVudCl9ID4gJHtlLnRhZ05hbWV9Om50aC1vZi10eXBlKCR7aW5kZXh9KWA7XG4gICAgfVxuICAgIHJldHVybiB1bmlxdWVTZWxlY3RvcihlbGVtZW50KTtcbn1cblxuLy8gVHVybnMgYSBudW1iZXIgaW50byBpdHMgaGFzaCs2IG51bWJlciBoZXhhZGVjaW1hbCByZXByZXNlbnRhdGlvbi5cbmV4cG9ydCBmdW5jdGlvbiB0b0hleENzcyhuOiBudW1iZXIpIHtcbiAgICBpZiAobiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IHN0ciA9IG4udG9TdHJpbmcoMTYpO1xuICAgIC8vIFBhZCB3aXRoIGxlYWRpbmcgemVyb3NcbiAgICByZXR1cm4gXCIjXCIgKyAobmV3IEFycmF5KDYgLSBzdHIubGVuZ3RoKSkuZmlsbChcIjBcIikuam9pbihcIlwiKSArIHN0cjtcbn1cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBuZW92aW0gfSBmcm9tIFwiLi9OZW92aW1cIjtcbmltcG9ydCB7IHBhZ2UgfSBmcm9tIFwiLi9wYWdlL3Byb3h5XCI7XG5pbXBvcnQgeyBnZXRHcmlkSWQsIGdldExvZ2ljYWxTaXplLCBnZXRDdXJyZW50TW9kZSwgY29tcHV0ZUdyaWREaW1lbnNpb25zRm9yLCBnZXRHcmlkQ29vcmRpbmF0ZXMgfSBmcm9tIFwiLi9yZW5kZXIvUmVkcmF3Q2FudmFzXCI7XG5pbXBvcnQgeyBjb25mUmVhZHksIGdldENvbmZGb3JVcmwsIGdldEdsb2JhbENvbmYgfSBmcm9tIFwiLi91dGlscy9jb25maWd1cmF0aW9uXCI7XG5pbXBvcnQgeyBhZGRNb2RpZmllciwgbm9uTGl0ZXJhbEtleXMsIHRyYW5zbGF0ZUtleSB9IGZyb20gXCIuL3V0aWxzL2tleXNcIjtcbmltcG9ydCB7IGlzQ2hyb21lLCB0b0ZpbGVOYW1lIH0gZnJvbSBcIi4vdXRpbHMvdXRpbHNcIjtcblxuY29uc3QgZnJhbWVJZFByb21pc2UgPSBicm93c2VyXG4gICAgLnJ1bnRpbWVcbiAgICAuc2VuZE1lc3NhZ2UoeyBmdW5jTmFtZTogW1wicHVibGlzaEZyYW1lSWRcIl0gfSlcbiAgICAudGhlbigoZjogbnVtYmVyKSA9PiAod2luZG93IGFzIGFueSkuZnJhbWVJZCA9IGYpO1xuY29uc3QgaW5mb1Byb21pc2UgPSBmcmFtZUlkUHJvbWlzZS50aGVuKCgpID0+IHBhZ2UuZ2V0RWRpdG9ySW5mbygpKTtcbmNvbnN0IGNvbm5lY3Rpb25Qcm9taXNlID0gYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHsgZnVuY05hbWU6IFtcImdldE5lb3ZpbUluc3RhbmNlXCJdIH0pO1xuXG5leHBvcnQgY29uc3QgaXNSZWFkeSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCBrZXlIYW5kbGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJrZXloYW5kbGVyXCIpO1xuICAgICAgICAgICAgY29uc3QgW1t1cmwsIHNlbGVjdG9yLCBjdXJzb3IsIGxhbmd1YWdlXSwgY29ubmVjdGlvbkRhdGFdID1cbiAgICAgICAgICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChbaW5mb1Byb21pc2UsIGNvbm5lY3Rpb25Qcm9taXNlXSk7XG4gICAgICAgICAgICBjb25zdCBudmltUHJvbWlzZSA9IG5lb3ZpbShjYW52YXMsIGNvbm5lY3Rpb25EYXRhKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRQcm9taXNlID0gcGFnZS5nZXRFbGVtZW50Q29udGVudCgpO1xuXG4gICAgICAgICAgICBjb25zdCBbY29scywgcm93c10gPSBnZXRMb2dpY2FsU2l6ZSgpO1xuXG4gICAgICAgICAgICBjb25zdCBudmltID0gYXdhaXQgbnZpbVByb21pc2U7XG5cbiAgICAgICAgICAgIC8vIFdlIG5lZWQgdG8gc2V0IGNsaWVudCBpbmZvIGJlZm9yZSBydW5uaW5nIHVpX2F0dGFjaCBiZWNhdXNlIHdlIHdhbnQgdGhpc1xuICAgICAgICAgICAgLy8gaW5mbyB0byBiZSBhdmFpbGFibGUgd2hlbiBVSUVudGVyIGlzIHRyaWdnZXJlZFxuICAgICAgICAgICAgY29uc3QgZXh0SW5mbyA9IGJyb3dzZXIucnVudGltZS5nZXRNYW5pZmVzdCgpO1xuICAgICAgICAgICAgY29uc3QgW21ham9yLCBtaW5vciwgcGF0Y2hdID0gZXh0SW5mby52ZXJzaW9uLnNwbGl0KFwiLlwiKTtcbiAgICAgICAgICAgIG52aW0uc2V0X2NsaWVudF9pbmZvKGV4dEluZm8ubmFtZSxcbiAgICAgICAgICAgICAgICB7IG1ham9yLCBtaW5vciwgcGF0Y2ggfSxcbiAgICAgICAgICAgICAgICBcInVpXCIsXG4gICAgICAgICAgICAgICAge30sXG4gICAgICAgICAgICAgICAge30sXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBhd2FpdCBjb25mUmVhZHk7XG4gICAgICAgICAgICBjb25zdCBzZXR0aW5ncyA9IGdldEdsb2JhbENvbmYoKTtcbiAgICAgICAgICAgIG52aW0udWlfYXR0YWNoKGNvbHMsIHJvd3MsIHtcbiAgICAgICAgICAgICAgICBleHRfbGluZWdyaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgZXh0X21lc3NhZ2VzOiBnZXRDb25mRm9yVXJsKHVybCkuY21kbGluZSA9PT0gXCJmaXJlbnZpbVwiLFxuICAgICAgICAgICAgICAgIHJnYjogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBsZXQgcmVzaXplUmVxSWQgPSAwO1xuICAgICAgICAgICAgYnJvd3Nlci5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigocmVxdWVzdDogYW55LCBfc2VuZGVyOiBhbnksIF9zZW5kUmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LmZ1bmNOYW1lWzBdID09PSBcImZyYW1lX3NlbmRLZXlcIikge1xuICAgICAgICAgICAgICAgICAgICBudmltLmlucHV0KHJlcXVlc3QuYXJncy5qb2luKFwiXCIpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcXVlc3QuZnVuY05hbWVbMF0gPT09IFwicmVzaXplXCIgJiYgcmVxdWVzdC5hcmdzWzBdID4gcmVzaXplUmVxSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgW2lkLCB3aWR0aCwgaGVpZ2h0XSA9IHJlcXVlc3QuYXJncztcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplUmVxSWQgPSBpZDtcbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgbmVlZCB0byBwdXQgdGhlIGtleUhhbmRsZXIgYXQgdGhlIG9yaWdpbiBpbiBvcmRlciB0byBhdm9pZFxuICAgICAgICAgICAgICAgICAgICAvLyBpc3N1ZXMgd2hlbiBpdCBzbGlwcyBvdXQgb2YgdGhlIHZpZXdwb3J0XG4gICAgICAgICAgICAgICAgICAgIGtleUhhbmRsZXIuc3R5bGUubGVmdCA9IGAwcHhgO1xuICAgICAgICAgICAgICAgICAgICBrZXlIYW5kbGVyLnN0eWxlLnRvcCA9IGAwcHhgO1xuICAgICAgICAgICAgICAgICAgICAvLyBJdCdzIHRlbXB0aW5nIHRvIHRyeSB0byBvcHRpbWl6ZSB0aGlzIGJ5IG9ubHkgY2FsbGluZ1xuICAgICAgICAgICAgICAgICAgICAvLyB1aV90cnlfcmVzaXplIHdoZW4gbkNvbHMgaXMgZGlmZmVyZW50IGZyb20gY29scyBhbmQgblJvd3MgaXNcbiAgICAgICAgICAgICAgICAgICAgLy8gZGlmZmVyZW50IGZyb20gcm93cyBidXQgd2UgY2FuJ3QgYmVjYXVzZSByZWRyYXcgbm90aWZpY2F0aW9uc1xuICAgICAgICAgICAgICAgICAgICAvLyBtaWdodCBoYXBwZW4gd2l0aG91dCB1cyBhY3R1YWxseSBjYWxsaW5nIHVpX3RyeV9yZXNpemUgYW5kIHRoZW5cbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHNpemVzIHdvdWxkbid0IGJlIGluIHN5bmMgYW55bW9yZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBbbkNvbHMsIG5Sb3dzXSA9IGNvbXB1dGVHcmlkRGltZW5zaW9uc0ZvcihcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoICogd2luZG93LmRldmljZVBpeGVsUmF0aW8sXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQgKiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpb1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBudmltLnVpX3RyeV9yZXNpemVfZ3JpZChnZXRHcmlkSWQoKSwgbkNvbHMsIG5Sb3dzKTtcbiAgICAgICAgICAgICAgICAgICAgcGFnZS5yZXNpemVFZGl0b3IoTWF0aC5mbG9vcih3aWR0aCAvIG5Db2xzKSAqIG5Db2xzLCBNYXRoLmZsb29yKGhlaWdodCAvIG5Sb3dzKSAqIG5Sb3dzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gQ3JlYXRlIGZpbGUsIHNldCBpdHMgY29udGVudCB0byB0aGUgdGV4dGFyZWEncywgd3JpdGUgaXRcbiAgICAgICAgICAgIGNvbnN0IGZpbGVuYW1lID0gdG9GaWxlTmFtZSh1cmwsIHNlbGVjdG9yLCBsYW5ndWFnZSk7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgY29udGVudFByb21pc2U7XG4gICAgICAgICAgICBjb25zdCBbbGluZSwgY29sXSA9IGN1cnNvcjtcbiAgICAgICAgICAgIGNvbnN0IHdyaXRlRmlsZVByb21pc2UgPSBudmltLmNhbGxfZnVuY3Rpb24oXCJ3cml0ZWZpbGVcIiwgW2NvbnRlbnQuc3BsaXQoXCJcXG5cIiksIGZpbGVuYW1lXSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBudmltLmNvbW1hbmQoYG5vc3dhcGZpbGUgZWRpdCAke2ZpbGVuYW1lfSBgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgYHwgY2FsbCBudmltX3dpbl9zZXRfY3Vyc29yKDAsIFske2xpbmV9LCAke2NvbH1dKWApKTtcblxuICAgICAgICAgICAgLy8gQ2FuJ3QgZ2V0IGNvdmVyYWdlIGZvciB0aGlzIGFzIGJyb3dzZXJzIGRvbid0IGxldCB1cyByZWxpYWJseVxuICAgICAgICAgICAgLy8gcHVzaCBkYXRhIHRvIHRoZSBzZXJ2ZXIgb24gYmVmb3JldW5sb2FkLlxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYmVmb3JldW5sb2FkXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBudmltLnVpX2RldGFjaCgpO1xuICAgICAgICAgICAgICAgIG52aW0uY29tbWFuZChcInFhbGwhXCIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEtlZXAgdHJhY2sgb2YgbGFzdCBhY3RpdmUgaW5zdGFuY2UgKG5lY2Vzc2FyeSBmb3IgZmlyZW52aW0jZm9jdXNfaW5wdXQoKSAmIG90aGVycylcbiAgICAgICAgICAgIGNvbnN0IGNoYW4gPSBudmltLmdldF9jdXJyZW50X2NoYW5uZWwoKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNldEN1cnJlbnRDaGFuKCkge1xuICAgICAgICAgICAgICAgIG52aW0uc2V0X3ZhcihcImxhc3RfZm9jdXNlZF9maXJlbnZpbV9jaGFubmVsXCIsIGNoYW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0Q3VycmVudENoYW4oKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgc2V0Q3VycmVudENoYW4pO1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzZXRDdXJyZW50Q2hhbik7XG5cbiAgICAgICAgICAgIGNvbnN0IGF1Z3JvdXBOYW1lID0gYEZpcmVudmltQXVncm91cENoYW4ke2NoYW59YDtcbiAgICAgICAgICAgIC8vIENsZWFudXAgbWVhbnM6XG4gICAgICAgICAgICAvLyAtIG5vdGlmeSBmcm9udGVuZCB0aGF0IHdlJ3JlIHNodXR0aW5nIGRvd25cbiAgICAgICAgICAgIC8vIC0gZGVsZXRlIGZpbGVcbiAgICAgICAgICAgIC8vIC0gcmVtb3ZlIG93biBhdWdyb3VwXG4gICAgICAgICAgICBjb25zdCBjbGVhbnVwID0gYGNhbGwgcnBjbm90aWZ5KCR7Y2hhbn0sICdmaXJlbnZpbV92aW1sZWF2ZScpIHwgYFxuICAgICAgICAgICAgICAgICAgICAgICAgKyBgY2FsbCBkZWxldGUoJyR7ZmlsZW5hbWV9JylgO1xuICAgICAgICAgICAgLy8gQXNrIGZvciBub3RpZmljYXRpb25zIHdoZW4gdXNlciB3cml0ZXMvbGVhdmVzIGZpcmVudmltXG4gICAgICAgICAgICBudmltLmNhbGxfYXRvbWljKChgYXVncm91cCAke2F1Z3JvdXBOYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1IVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9jbWQgQnVmV3JpdGUgJHtmaWxlbmFtZX0gYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIGBjYWxsIHJwY25vdGlmeSgke2NoYW59LCBgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIGAnZmlyZW52aW1fYnVmd3JpdGUnLCBgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIGB7YFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgYCd0ZXh0JzogbnZpbV9idWZfZ2V0X2xpbmVzKDAsIDAsIC0xLCAwKSxgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBgJ2N1cnNvcic6IG52aW1fd2luX2dldF9jdXJzb3IoMCksYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdSBWaW1MZWF2ZSAqICR7Y2xlYW51cH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGF1Z3JvdXAgRU5EYCkuc3BsaXQoXCJcXG5cIikubWFwKGNvbW1hbmQgPT4gW1wibnZpbV9jb21tYW5kXCIsIFtjb21tYW5kXV0pKTtcblxuICAgICAgICAgICAgY29uc3QgaWdub3JlS2V5cyA9IHNldHRpbmdzLmlnbm9yZUtleXM7XG4gICAgICAgICAgICBrZXlIYW5kbGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChldnQpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgd29ya2Fyb3VuZCBmb3Igb3N4IHdoZXJlIHByZXNzaW5nIG5vbi1hbHBoYW51bWVyaWNcbiAgICAgICAgICAgICAgICAvLyBjaGFyYWN0ZXJzIGxpa2UgXCJAXCIgcmVxdWlyZXMgcHJlc3NpbmcgPEEtYT4sIHdoaWNoIHJlc3VsdHNcbiAgICAgICAgICAgICAgICAvLyBpbiB0aGUgYnJvd3NlciBzZW5kaW5nIGFuIDxBLUA+IGV2ZW50LCB3aGljaCB3ZSB3YW50IHRvXG4gICAgICAgICAgICAgICAgLy8gdHJlYXQgYXMgYSByZWd1bGFyIEAuXG4gICAgICAgICAgICAgICAgLy8gU28gaWYgd2UncmUgc2VlaW5nIGFuIGFsdCBvbiBhIG5vbi1hbHBoYW51bWVyaWMgY2hhcmFjdGVyLFxuICAgICAgICAgICAgICAgIC8vIHdlIGp1c3QgaWdub3JlIGl0IGFuZCBsZXQgdGhlIGlucHV0IGV2ZW50IGhhbmRsZXIgZG8gaXRzXG4gICAgICAgICAgICAgICAgLy8gbWFnaWMuIFRoaXMgY2FuIG9ubHkgYmUgdGVzdGVkIG9uIE9TWCwgYXMgZ2VuZXJhdGluZyBhblxuICAgICAgICAgICAgICAgIC8vIDxBLUA+IGtleWRvd24gZXZlbnQgd2l0aCBzZWxlbml1bSB3b24ndCByZXN1bHQgaW4gYW4gaW5wdXRcbiAgICAgICAgICAgICAgICAvLyBldmVudC5cbiAgICAgICAgICAgICAgICAvLyBTaW5jZSBjb3ZlcmFnZSByZXBvcnRzIGFyZSBvbmx5IHJldHJpZXZlZCBvbiBsaW51eCwgd2UgZG9uJ3RcbiAgICAgICAgICAgICAgICAvLyBpbnN0cnVtZW50IHRoaXMgY29uZGl0aW9uLlxuICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICAgICAgaWYgKGV2dC5hbHRLZXkgJiYgc2V0dGluZ3MuYWx0ID09PSBcImFscGhhbnVtXCIgJiYgIS9bYS16QS1aMC05XS8udGVzdChldnQua2V5KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIE5vdGU6IG9yZGVyIG9mIHRoaXMgYXJyYXkgaXMgaW1wb3J0YW50LCB3ZSBuZWVkIHRvIGNoZWNrIE9TIGJlZm9yZSBjaGVja2luZyBtZXRhXG4gICAgICAgICAgICAgICAgY29uc3Qgc3BlY2lhbEtleXMgPSBbW1wiQWx0XCIsIFwiQVwiXSwgW1wiQ29udHJvbFwiLCBcIkNcIl0sIFtcIk9TXCIsIFwiRFwiXSwgW1wiTWV0YVwiLCBcIkRcIl1dO1xuICAgICAgICAgICAgICAgIC8vIFRoZSBldmVudCBoYXMgdG8gYmUgdHJ1c3RlZCBhbmQgZWl0aGVyIGhhdmUgYSBtb2RpZmllciBvciBhIG5vbi1saXRlcmFsIHJlcHJlc2VudGF0aW9uXG4gICAgICAgICAgICAgICAgaWYgKGV2dC5pc1RydXN0ZWRcbiAgICAgICAgICAgICAgICAgICAgJiYgKG5vbkxpdGVyYWxLZXlzW2V2dC5rZXldICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IHNwZWNpYWxLZXlzLmZpbmQoKFttb2QsIF9dOiBbc3RyaW5nLCBzdHJpbmddKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldnQua2V5ICE9PSBtb2QgJiYgKGV2dCBhcyBhbnkpLmdldE1vZGlmaWVyU3RhdGUobW9kKSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHQgPSBzcGVjaWFsS2V5cy5jb25jYXQoW1tcIlNoaWZ0XCIsIFwiU1wiXV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVkdWNlKChrZXk6IHN0cmluZywgW2F0dHIsIG1vZF06IFtzdHJpbmcsIHN0cmluZ10pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGV2dCBhcyBhbnkpLmdldE1vZGlmaWVyU3RhdGUoYXR0cikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFkZE1vZGlmaWVyKG1vZCwga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRyYW5zbGF0ZUtleShldnQua2V5KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudE1vZGUgPSBnZXRDdXJyZW50TW9kZSgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQga2V5cyA6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgICAgICAgICAgIGlmIChpZ25vcmVLZXlzW2N1cnJlbnRNb2RlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzID0gaWdub3JlS2V5c1tjdXJyZW50TW9kZV0uc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoaWdub3JlS2V5cy5hbGwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5cy5wdXNoLmFwcGx5KGtleXMsIGlnbm9yZUtleXMuYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWtleXMuaW5jbHVkZXModGV4dCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG52aW0uaW5wdXQodGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2dC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBhY2NlcHRJbnB1dCAoZXZ0OiBhbnkpIHtcbiAgICAgICAgICAgICAgICBudmltLmlucHV0KGV2dC50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGV2dC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBldnQudGFyZ2V0LmlubmVyVGV4dCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgZXZ0LnRhcmdldC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBrZXlIYW5kbGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoZXZ0OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZ0LmlzVHJ1c3RlZCAmJiAhZXZ0LmlzQ29tcG9zaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjY2VwdElucHV0KGV2dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBPbiBGaXJlZm94LCBQaW55aW4gaW5wdXQgbWV0aG9kIGZvciBhIHNpbmdsZSBjaGluZXNlIGNoYXJhY3RlciB3aWxsXG4gICAgICAgICAgICAvLyByZXN1bHQgaW4gdGhlIGZvbGxvd2luZyBzZXF1ZW5jZSBvZiBldmVudHM6XG4gICAgICAgICAgICAvLyAtIGNvbXBvc2l0aW9uc3RhcnRcbiAgICAgICAgICAgIC8vIC0gaW5wdXQgKGNoYXJhY3RlcilcbiAgICAgICAgICAgIC8vIC0gY29tcG9zaXRpb25lbmRcbiAgICAgICAgICAgIC8vIC0gaW5wdXQgKHJlc3VsdClcbiAgICAgICAgICAgIC8vIEJ1dCBvbiBDaHJvbWUsIHdlJ2xsIGdldCB0aGlzIG9yZGVyOlxuICAgICAgICAgICAgLy8gLSBjb21wb3NpdGlvbnN0YXJ0XG4gICAgICAgICAgICAvLyAtIGlucHV0IChjaGFyYWN0ZXIpXG4gICAgICAgICAgICAvLyAtIGlucHV0IChyZXN1bHQpXG4gICAgICAgICAgICAvLyAtIGNvbXBvc2l0aW9uZW5kXG4gICAgICAgICAgICAvLyBTbyBDaHJvbWUncyBpbnB1dCBldmVudCB3aWxsIHN0aWxsIGhhdmUgaXRzIGlzQ29tcG9zaW5nIGZsYWcgc2V0IHRvXG4gICAgICAgICAgICAvLyB0cnVlISBUaGlzIG1lYW5zIHRoYXQgd2UgbmVlZCB0byBhZGQgYSBjaHJvbWUtc3BlY2lmaWMgZXZlbnRcbiAgICAgICAgICAgIC8vIGxpc3RlbmVyIG9uIGNvbXBvc2l0aW9uZW5kIHRvIGRvIHdoYXQgaGFwcGVucyBvbiBpbnB1dCBldmVudHMgZm9yXG4gICAgICAgICAgICAvLyBGaXJlZm94LlxuICAgICAgICAgICAgLy8gRG9uJ3QgaW5zdHJ1bWVudCB0aGlzIGJyYW5jaCBhcyBjb3ZlcmFnZSBpcyBvbmx5IGdlbmVyYXRlZCBvblxuICAgICAgICAgICAgLy8gRmlyZWZveC5cbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICBpZiAoaXNDaHJvbWUoKSkge1xuICAgICAgICAgICAgICAgIGtleUhhbmRsZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNvbXBvc2l0aW9uZW5kXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYWNjZXB0SW5wdXQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCAoZXZ0OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAga2V5SGFuZGxlci5zdHlsZS5sZWZ0ID0gYCR7ZXZ0LmNsaWVudFh9cHhgO1xuICAgICAgICAgICAgICAgIGtleUhhbmRsZXIuc3R5bGUudG9wID0gYCR7ZXZ0LmNsaWVudFl9cHhgO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmdW5jdGlvbiBvbk1vdXNlKGV2dDogTW91c2VFdmVudCwgYWN0aW9uOiBzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBsZXQgYnV0dG9uO1xuICAgICAgICAgICAgICAgIC8vIFNlbGVuaXVtIGNhbid0IGdlbmVyYXRlIHdoZWVsIGV2ZW50cyB5ZXQgOihcbiAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgICAgICAgIGlmIChldnQgaW5zdGFuY2VvZiBXaGVlbEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbiA9IFwid2hlZWxcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBTZWxlbml1bSBjYW4ndCBnZW5lcmF0ZSBtb3VzZSBldmVudHMgd2l0aCBtb3JlIGJ1dHRvbnMgOihcbiAgICAgICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC5idXR0b24gPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBOZW92aW0gZG9lc24ndCBoYW5kbGUgb3RoZXIgbW91c2UgYnV0dG9ucyBmb3Igbm93XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uID0gW1wibGVmdFwiLCBcIm1pZGRsZVwiLCBcInJpZ2h0XCJdW2V2dC5idXR0b25dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBtb2RpZmllcnMgPSAoZXZ0LmFsdEtleSA/IFwiQVwiIDogXCJcIikgK1xuICAgICAgICAgICAgICAgICAgICAoZXZ0LmN0cmxLZXkgPyBcIkNcIiA6IFwiXCIpICtcbiAgICAgICAgICAgICAgICAgICAgKGV2dC5tZXRhS2V5ID8gXCJEXCIgOiBcIlwiKSArXG4gICAgICAgICAgICAgICAgICAgIChldnQuc2hpZnRLZXkgPyBcIlNcIiA6IFwiXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IFt4LCB5XSA9IGdldEdyaWRDb29yZGluYXRlcyhldnQucGFnZVgsIGV2dC5wYWdlWSk7XG4gICAgICAgICAgICAgICAgbnZpbS5pbnB1dF9tb3VzZShidXR0b24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRHcmlkSWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4KTtcbiAgICAgICAgICAgICAgICBrZXlIYW5kbGVyLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBlID0+IHtcbiAgICAgICAgICAgICAgICBvbk1vdXNlKGUsIFwicHJlc3NcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBlID0+IHtcbiAgICAgICAgICAgICAgICBvbk1vdXNlKGUsIFwicmVsZWFzZVwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gU2VsZW5pdW0gZG9lc24ndCBsZXQgeW91IHNpbXVsYXRlIG1vdXNlIHdoZWVsIGV2ZW50cyA6KFxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgZXZ0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoZXZ0LmRlbHRhWSkgPj0gTWF0aC5hYnMoZXZ0LmRlbHRhWCkpIHtcbiAgICAgICAgICAgICAgICAgICAgb25Nb3VzZShldnQsIGV2dC5kZWx0YVkgPCAwID8gXCJ1cFwiIDogXCJkb3duXCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9uTW91c2UoZXZ0LCBldnQuZGVsdGFYIDwgMCA/IFwicmlnaHRcIiA6IFwibGVmdFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIExldCB1c2VycyBrbm93IHdoZW4gdGhleSBmb2N1cy91bmZvY3VzIHRoZSBmcmFtZVxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgICAgICAgICAgICAgICBrZXlIYW5kbGVyLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgbnZpbS5jb21tYW5kKFwiZG9hdXRvY21kIEZvY3VzR2FpbmVkXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gXCIwLjVcIjtcbiAgICAgICAgICAgICAgICBudmltLmNvbW1hbmQoXCJkb2F1dG9jbWQgRm9jdXNMb3N0XCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBrZXlIYW5kbGVyLmZvY3VzKCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBrZXlIYW5kbGVyLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgd3JpdGVGaWxlUHJvbWlzZS50aGVuKCgpID0+IHJlc29sdmUoKSk7XG4gICAgICAgICAgICAgICAgLy8gVG8gaGFyZCB0byB0ZXN0ICh3ZSdkIG5lZWQgdG8gZmluZCBhIHdheSB0byBtYWtlIG5lb3ZpbSBmYWlsXG4gICAgICAgICAgICAgICAgLy8gdG8gd3JpdGUgdGhlIGZpbGUsIHdoaWNoIHJlcXVpcmVzIHRvbyBtYW55IG9zLWRlcGVuZGVudCBzaWRlXG4gICAgICAgICAgICAgICAgLy8gZWZmZWN0cyksIHNvIGRvbid0IGluc3RydW1lbnQuXG4gICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICAgICAgICB3cml0ZUZpbGVQcm9taXNlLmNhdGNoKCgpID0+IHJlamVjdCgpKTtcbiAgICAgICAgICAgIH0sIDEwKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgIHBhZ2Uua2lsbEVkaXRvcigpO1xuICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==