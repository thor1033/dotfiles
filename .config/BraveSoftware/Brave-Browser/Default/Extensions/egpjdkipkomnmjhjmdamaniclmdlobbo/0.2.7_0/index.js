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
  /* webextension-polyfill - v0.8.0 - Tue Apr 20 2021 11:27:38 */

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
       * @param {function} promise.reject
       *        The promise's rejection function.
       * @param {object} metadata
       *        Metadata about the wrapped method which has created the callback.
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
       *
       * @returns {function}
       *        The generated callback function.
       */


      const makeCallback = (promise, metadata) => {
        return (...callbackArgs) => {
          if (extensionAPIs.runtime.lastError) {
            promise.reject(new Error(extensionAPIs.runtime.lastError.message));
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
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
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

      });

      const onRequestFinishedWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }
        /**
         * Wraps an onRequestFinished listener function so that it will return a
         * `getContent()` property which returns a `Promise` rather than using a
         * callback API.
         *
         * @param {object} req
         *        The HAR entry object representing the network request.
         */


        return function onRequestFinished(req) {
          const wrappedReq = wrapObject(req, {}
          /* wrappers */
          , {
            getContent: {
              minArgs: 0,
              maxArgs: 0
            }
          });
          listener(wrappedReq);
        };
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
            reject(new Error(extensionAPIs.runtime.lastError.message));
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
        devtools: {
          network: {
            onRequestFinished: wrapEvent(onRequestFinishedWrappers)
          }
        },
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
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderer */ "./src/renderer.ts");
/* harmony import */ var _Stdin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Stdin */ "./src/Stdin.ts");
/* harmony import */ var _Stdout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Stdout */ "./src/Stdout.ts");




async function neovim(canvas, { port, password }) {
    const functions = {};
    const requests = new Map();
    _renderer__WEBPACK_IMPORTED_MODULE_1__.setFunctions(functions);
    _renderer__WEBPACK_IMPORTED_MODULE_1__.setCanvas(canvas);
    let prevNotificationPromise = Promise.resolve();
    const socket = new WebSocket(`ws://127.0.0.1:${port}/${password}`);
    socket.binaryType = "arraybuffer";
    socket.addEventListener("close", ((_) => {
        prevNotificationPromise = prevNotificationPromise.finally(() => _page_proxy__WEBPACK_IMPORTED_MODULE_0__.page.killEditor());
    }));
    await (new Promise(resolve => socket.addEventListener("open", () => {
        resolve(undefined);
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
            _renderer__WEBPACK_IMPORTED_MODULE_1__.onRedraw(args);
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
    socket;
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
    socket;
    listeners = new Map();
    messageNames = new Map([[0, "request"], [1, "response"], [2, "notification"]]);
    // Holds previously-received, incomplete and unprocessed messages
    prev = new Uint8Array(0);
    msgpackConfig = {};
    constructor(socket) {
        this.socket = socket;
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

/***/ "./src/renderer.ts":
/*!*************************!*\
  !*** ./src/renderer.ts ***!
  \*************************/
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
/* harmony import */ var _page_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page/proxy */ "./src/page/proxy.ts");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/utils */ "./src/utils/utils.ts");
/* harmony import */ var _utils_configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/configuration */ "./src/utils/configuration.ts");



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
        display: true,
        x: 0,
        y: 0,
        lastMove: performance.now(),
        movedSinceLastMessage: false,
    },
    gridCharacters: [],
    gridDamages: [],
    gridDamagesCount: [],
    gridHighlights: [],
    gridSizes: [],
    highlights: [newHighlight(defaultBackground, defaultForeground)],
    lastMessage: performance.now(),
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
    busy_start: () => {
        pushDamage(getGridId(), DamageKind.Cell, 1, 1, globalState.cursor.x, globalState.cursor.y);
        globalState.cursor.display = false;
    },
    busy_stop: () => { globalState.cursor.display = true; },
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
        cursor.movedSinceLastMessage = true;
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
    grid_scroll: (id, top, bot, left, right, rows, _cols) => {
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
                for (let x = left; x < right; ++x) {
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
                for (let x = left; x < right; ++x) {
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
        globalState.lastMessage = performance.now();
        globalState.cursor.movedSinceLastMessage = false;
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
    else if (state.cursor.display) {
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
let cmdlineTimeout = 3000;
_utils_configuration__WEBPACK_IMPORTED_MODULE_2__.confReady.then(() => cmdlineTimeout = (0,_utils_configuration__WEBPACK_IMPORTED_MODULE_2__.getGlobalConf)().cmdlineTimeout);
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
    if (performance.now() - globalState.lastMessage > cmdlineTimeout && globalState.cursor.movedSinceLastMessage) {
        handlers["msg_clear"]();
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
/* harmony export */   "parseSingleGuifont": () => (/* binding */ parseSingleGuifont),
/* harmony export */   "parseGuifont": () => (/* binding */ parseGuifont),
/* harmony export */   "computeSelector": () => (/* binding */ computeSelector),
/* harmony export */   "toHexCss": () => (/* binding */ toHexCss)
/* harmony export */ });
/* provided dependency */ var browser = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");
let curHost;
// Can't get coverage for thunderbird.
/* istanbul ignore next */
if (browser.composeScripts !== undefined || document.location.href === "about:blank?compose") {
    curHost = "thunderbird";
    // Chrome doesn't have a "browser" object, instead it uses "chrome".
}
else if (window.location.protocol === "moz-extension:") {
    curHost = "firefox";
}
else if (window.location.protocol === "chrome-extension:") {
    curHost = "chrome";
}
// Only usable in background script!
function isChrome() {
    // Can't cover error condition
    /* istanbul ignore next */
    if (curHost === undefined) {
        throw Error("Used isChrome in content script!");
    }
    return curHost === "chrome";
}
function isThunderbird() {
    // Can't cover error condition
    /* istanbul ignore next */
    if (curHost === undefined) {
        throw Error("Used isThunderbird in content script!");
    }
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
// Can't be tested e2e :/
/* istanbul ignore next */
function parseSingleGuifont(guifont, defaults) {
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
;
// Parses a guifont declaration as described in `:h E244`
// defaults: default value for each of.
// Can't be tested e2e :/
/* istanbul ignore next */
function parseGuifont(guifont, defaults) {
    const fonts = guifont.split(",").reverse();
    return fonts.reduce((acc, cur) => parseSingleGuifont(cur, acc), defaults);
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
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderer */ "./src/renderer.ts");
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
            const [cols, rows] = (0,_renderer__WEBPACK_IMPORTED_MODULE_2__.getLogicalSize)();
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
                    const [nCols, nRows] = (0,_renderer__WEBPACK_IMPORTED_MODULE_2__.computeGridDimensionsFor)(width * window.devicePixelRatio, height * window.devicePixelRatio);
                    nvim.ui_try_resize_grid((0,_renderer__WEBPACK_IMPORTED_MODULE_2__.getGridId)(), nCols, nRows);
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
                    const currentMode = (0,_renderer__WEBPACK_IMPORTED_MODULE_2__.getCurrentMode)();
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
                const [x, y] = (0,_renderer__WEBPACK_IMPORTED_MODULE_2__.getGridCoordinates)(evt.pageX, evt.pageY);
                nvim.input_mouse(button, action, modifiers, (0,_renderer__WEBPACK_IMPORTED_MODULE_2__.getGridId)(), y, x);
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
                writeFilePromise.then(() => resolve(undefined));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9GaXJlbnZpbS8uL25vZGVfbW9kdWxlcy9ldmVudC1saXRlL2V2ZW50LWxpdGUuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qcyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL25vZGVfbW9kdWxlcy93ZWJleHRlbnNpb24tcG9seWZpbGwvZGlzdC9icm93c2VyLXBvbHlmaWxsLmpzIiwid2VicGFjazovL0ZpcmVudmltLy4vbm9kZV9tb2R1bGVzL2ludDY0LWJ1ZmZlci9pbnQ2NC1idWZmZXIuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvaXNhcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9idWZmZXItZ2xvYmFsLmpzIiwid2VicGFjazovL0ZpcmVudmltLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvYnVmZmVyLWxpdGUuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9idWZmZXJpc2gtYXJyYXkuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9idWZmZXJpc2gtYnVmZmVyLmpzIiwid2VicGFjazovL0ZpcmVudmltLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvYnVmZmVyaXNoLXByb3RvLmpzIiwid2VicGFjazovL0ZpcmVudmltLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvYnVmZmVyaXNoLXVpbnQ4YXJyYXkuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9idWZmZXJpc2guanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9jb2RlYy1iYXNlLmpzIiwid2VicGFjazovL0ZpcmVudmltLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvY29kZWMuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9kZWNvZGUtYnVmZmVyLmpzIiwid2VicGFjazovL0ZpcmVudmltLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvZGVjb2RlLmpzIiwid2VicGFjazovL0ZpcmVudmltLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvZGVjb2Rlci5qcyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2VuY29kZS1idWZmZXIuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9lbmNvZGUuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9lbmNvZGVyLmpzIiwid2VicGFjazovL0ZpcmVudmltLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvZXh0LWJ1ZmZlci5qcyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2V4dC1wYWNrZXIuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9leHQtdW5wYWNrZXIuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9leHQuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9mbGV4LWJ1ZmZlci5qcyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL3JlYWQtY29yZS5qcyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL3JlYWQtZm9ybWF0LmpzIiwid2VicGFjazovL0ZpcmVudmltLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvcmVhZC10b2tlbi5qcyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL3dyaXRlLWNvcmUuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi93cml0ZS10b2tlbi5qcyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL3dyaXRlLXR5cGUuanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi93cml0ZS11aW50OC5qcyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL3NyYy9OZW92aW0udHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvU3RkaW4udHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvU3Rkb3V0LnRzIiwid2VicGFjazovL0ZpcmVudmltLy4vc3JjL3BhZ2UvZnVuY3Rpb25zLnRzIiwid2VicGFjazovL0ZpcmVudmltLy4vc3JjL3BhZ2UvcHJveHkudHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvcmVuZGVyZXIudHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvdXRpbHMvY29uZmlndXJhdGlvbi50cyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL3NyYy91dGlscy9rZXlzLnRzIiwid2VicGFjazovL0ZpcmVudmltLy4vc3JjL3V0aWxzL3V0aWxzLnRzIiwid2VicGFjazovL0ZpcmVudmltL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0ZpcmVudmltL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9GaXJlbnZpbS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0ZpcmVudmltL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvZnJhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixJQUFJO0FBQzNCO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQSw2QkFBNkIsSUFBSSxFQUFFO0FBQ25DLCtCQUErQixJQUFJLEVBQUU7QUFDckMsbUJBQW1CO0FBQ25CLG1CQUFtQjtBQUNuQixrQkFBa0I7QUFDbEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNLElBQTZCOztBQUVuQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEIsa0JBQWtCO0FBQ2xCLGVBQWUsVUFBVTtBQUN6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQixrQkFBa0I7QUFDbEIsZUFBZSxVQUFVO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQixvQkFBb0I7QUFDcEIsZUFBZSxVQUFVO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLHFCQUFxQjtBQUNyQixlQUFlLFFBQVE7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDREQUE0RDtBQUM1RDtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7Ozs7O0FDbkxELFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsV0FBVzs7QUFFbkI7QUFDQTtBQUNBO0FBQ0EsUUFBUSxXQUFXOztBQUVuQjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLFdBQVc7O0FBRW5CO0FBQ0E7QUFDQSxRQUFRLFVBQVU7O0FBRWxCO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25GQTs7QUFFQSxPQUFPOztBQUVQO0FBQ0EsTUFBTSxJQUEwQztBQUNoRCxJQUFJLGlDQUFnQyxDQUFDLE1BQVEsQ0FBQyxvQ0FBRSxPQUFPO0FBQUE7QUFBQTtBQUFBLGtHQUFDO0FBQ3hELEdBQUcsTUFBTSxZQVFOO0FBQ0gsQ0FBQztBQUNEOztBQUVBLHFDQUFxQzs7QUFFckM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxPQUFPLDBDQUEwQyxPQUFPO0FBQ3JFO0FBQ0EsdVNBQXVTO0FBQ3ZTO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsRUFBRTtBQUNuQixtQkFBbUIsUUFBUTtBQUMzQjs7O0FBR0E7QUFDQTtBQUNBO0FB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QTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLFlBQVk7QUFDL0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM1UUE7O0FBRUEsZUFBZSxhQUFhOztBQUU1QixrQkFBa0IsV0FBVztBQUM3QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNib0M7QUFDUztBQUNiO0FBQ0U7QUFFM0IsS0FBSyxVQUFVLE1BQU0sQ0FDcEIsTUFBeUIsRUFDekIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFzQztJQUUxRCxNQUFN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QUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDMUMsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtnQkFDakMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ25CLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNuQixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELCtEQUErRDtnQkFDL0QsK0RBQStEO2dCQUMvRCxpQ0FBaUM7Z0JBQ2pDLDBCQUEwQjtnQkFDMUIsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDM0MsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ1Y7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsd0RBQWUsRUFBRSxDQUFDO1lBQ2xCLE1BQU0sRUFBRSxDQUFDO1NBQ1o7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBldmVudC1saXRlLmpzIC0gTGlnaHQtd2VpZ2h0IEV2ZW50RW1pdHRlciAobGVzcyB0aGFuIDFLQiB3aGVuIGd6aXBwZWQpXG4gKlxuICogQGNvcHlyaWdodCBZdXN1a2UgS2F3YXNha2lcbiAqIEBsaWNlbnNlIE1JVFxuICogQGNvbnN0cnVjdG9yXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9rYXdhbmV0L2V2ZW50LWxpdGVcbiAqIEBzZWUgaHR0cDovL2thd2FuZXQuZ2l0aHViLmlvL2V2ZW50LWxpdGUvRXZlbnRMaXRlLmh0bWxcbiAqIEBleGFtcGxlXG4gKiB2YXIgRXZlbnRMaXRlID0gcmVxdWlyZShcImV2ZW50LWxpdGVcIik7XG4gKlxuICogZnVuY3Rpb24gTXlDbGFzcygpIHsuLi59ICAgICAgICAgICAgIC8vIHlvdXIgY2xhc3NcbiAqXG4gKiBFdmVudExpdGUubWl4aW4oTXlDbGFzcy5wcm90b3R5cGUpOyAgLy8gaW1wb3J0IGV2ZW50IG1ldGhvZHNcbiAqXG4gKiB2YXIgb2JqID0gbmV3IE15Q2xhc3MoKTtcbiAqIG9iai5vbihcImZvb1wiLCBmdW5jdGlvbigpIHsuLi59KTsgICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lclxuICogb2JqLm9uY2UoXCJiYXJcIiwgZnVuY3Rpb24oKSB7Li4ufSk7ICAgLy8gYWRkIG9uZS10aW1lIGV2ZW50IGxpc3RlbmVyXG4gKiBvYmouZW1pdChcImZvb1wiKTsgICAgICAgICAgICAgICAgICAgICAvLyBkaXNwYXRjaCBldmVudFxuICogb2JqLmVtaXQoXCJiYXJcIik7ICAgICAgICAgICAgICAgICAgICAgLy8gZGlzcGF0Y2ggYW5vdGhlciBldmVudFxuICogb2JqLm9mZihcImZvb1wiKTsgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGV2ZW50IGxpc3RlbmVyXG4gKi9cblxuZnVuY3Rpb24gRXZlbnRMaXRlKCkge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRXZlbnRMaXRlKSkgcmV0dXJuIG5ldyBFdmVudExpdGUoKTtcbn1cblxuKGZ1bmN0aW9uKEV2ZW50TGl0ZSkge1xuICAvLyBleHBvcnQgdGhlIGNsYXNzIGZvciBub2RlLmpzXG4gIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgbW9kdWxlKSBtb2R1bGUuZXhwb3J0cyA9IEV2ZW50TGl0ZTtcblxuICAvLyBwcm9wZXJ0eSBuYW1lIHRvIGhvbGQgbGlzdGVuZXJzXG4gIHZhciBMSVNURU5FUlMgPSBcImxpc3RlbmVyc1wiO1xuXG4gIC8vIG1ldGhvZHMgdG8gZXhwb3J0XG4gIHZhciBtZXRob2RzID0ge1xuICAgIG9uOiBvbixcbiAgICBvbmNlOiBvbmNlLFxuICAgIG9mZjogb2ZmLFxuICAgIGVtaXQ6IGVtaXRcbiAgfTtcblxuICAvLyBtaXhpbiB0byBzZWxmXG4gIG1peGluKEV2ZW50TGl0ZS5wcm90b3R5cGUpO1xuXG4gIC8vIGV4cG9ydCBtaXhpbiBmdW5jdGlvblxuICBFdmVudExpdGUubWl4aW4gPSBtaXhpbjtcblxuICAvKipcbiAgICogSW1wb3J0IG9uKCksIG9uY2UoKSwgb2ZmKCkgYW5kIGVtaXQoKSBtZXRob2RzIGludG8gdGFyZ2V0IG9iamVjdC5cbiAgICpcbiAgICogQGZ1bmN0aW9uIEV2ZW50TGl0ZS5taXhpblxuICAgKiBAcGFyYW0gdGFyZ2V0IHtQcm90b3R5cGV9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG1peGluKHRhcmdldCkge1xuICAgIGZvciAodmFyIGtleSBpbiBtZXRob2RzKSB7XG4gICAgICB0YXJnZXRba2V5XSA9IG1ldGhvZHNba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW4gZXZlbnQgbGlzdGVuZXIuXG4gICAqXG4gICAqIEBmdW5jdGlvbiBFdmVudExpdGUucHJvdG90eXBlLm9uXG4gICAqIEBwYXJhbSB0eXBlIHtzdHJpbmd9XG4gICAqIEBwYXJhbSBmdW5jIHtGdW5jdGlvbn1cbiAgICogQHJldHVybnMge0V2ZW50TGl0ZX0gU2VsZiBmb3IgbWV0aG9kIGNoYWluaW5nXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG9uKHR5cGUsIGZ1bmMpIHtcbiAgICBnZXRMaXN0ZW5lcnModGhpcywgdHlwZSkucHVzaChmdW5jKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgb25lLXRpbWUgZXZlbnQgbGlzdGVuZXIuXG4gICAqXG4gICAqIEBmdW5jdGlvbiBFdmVudExpdGUucHJvdG90eXBlLm9uY2VcbiAgICogQHBhcmFtIHR5cGUge3N0cmluZ31cbiAgICogQHBhcmFtIGZ1bmMge0Z1bmN0aW9ufVxuICAgKiBAcmV0dXJucyB7RXZlbnRMaXRlfSBTZWxmIGZvciBtZXRob2QgY2hhaW5pbmdcbiAgICovXG5cbiAgZnVuY3Rpb24gb25jZSh0eXBlLCBmdW5jKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHdyYXAub3JpZ2luYWxMaXN0ZW5lciA9IGZ1bmM7XG4gICAgZ2V0TGlzdGVuZXJzKHRoYXQsIHR5cGUpLnB1c2god3JhcCk7XG4gICAgcmV0dXJuIHRoYXQ7XG5cbiAgICBmdW5jdGlvbiB3cmFwKCkge1xuICAgICAgb2ZmLmNhbGwodGhhdCwgdHlwZSwgd3JhcCk7XG4gICAgICBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci5cbiAgICpcbiAgICogQGZ1bmN0aW9uIEV2ZW50TGl0ZS5wcm90b3R5cGUub2ZmXG4gICAqIEBwYXJhbSBbdHlwZV0ge3N0cmluZ31cbiAgICogQHBhcmFtIFtmdW5jXSB7RnVuY3Rpb259XG4gICAqIEByZXR1cm5zIHtFdmVudExpdGV9IFNlbGYgZm9yIG1ldGhvZCBjaGFpbmluZ1xuICAgKi9cblxuICBmdW5jdGlvbiBvZmYodHlwZSwgZnVuYykge1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB2YXIgbGlzdG5lcnM7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBkZWxldGUgdGhhdFtMSVNURU5FUlNdO1xuICAgIH0gZWxzZSBpZiAoIWZ1bmMpIHtcbiAgICAgIGxpc3RuZXJzID0gdGhhdFtMSVNURU5FUlNdO1xuICAgICAgaWYgKGxpc3RuZXJzKSB7XG4gICAgICAgIGRlbGV0ZSBsaXN0bmVyc1t0eXBlXTtcbiAgICAgICAgaWYgKCFPYmplY3Qua2V5cyhsaXN0bmVycykubGVuZ3RoKSByZXR1cm4gb2ZmLmNhbGwodGhhdCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3RuZXJzID0gZ2V0TGlzdGVuZXJzKHRoYXQsIHR5cGUsIHRydWUpO1xuICAgICAgaWYgKGxpc3RuZXJzKSB7XG4gICAgICAgIGxpc3RuZXJzID0gbGlzdG5lcnMuZmlsdGVyKG5lKTtcbiAgICAgICAgaWYgKCFsaXN0bmVycy5sZW5ndGgpIHJldHVybiBvZmYuY2FsbCh0aGF0LCB0eXBlKTtcbiAgICAgICAgdGhhdFtMSVNURU5FUlNdW3R5cGVdID0gbGlzdG5lcnM7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGF0O1xuXG4gICAgZnVuY3Rpb24gbmUodGVzdCkge1xuICAgICAgcmV0dXJuIHRlc3QgIT09IGZ1bmMgJiYgdGVzdC5vcmlnaW5hbExpc3RlbmVyICE9PSBmdW5jO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwYXRjaCAodHJpZ2dlcikgYW4gZXZlbnQuXG4gICAqXG4gICAqIEBmdW5jdGlvbiBFdmVudExpdGUucHJvdG90eXBlLmVtaXRcbiAgICogQHBhcmFtIHR5cGUge3N0cmluZ31cbiAgICogQHBhcmFtIFt2YWx1ZV0geyp9XG4gICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIHdoZW4gYSBsaXN0ZW5lciByZWNlaXZlZCB0aGUgZXZlbnRcbiAgICovXG5cbiAgZnVuY3Rpb24gZW1pdCh0eXBlLCB2YWx1ZSkge1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB2YXIgbGlzdGVuZXJzID0gZ2V0TGlzdGVuZXJzKHRoYXQsIHR5cGUsIHRydWUpO1xuICAgIGlmICghbGlzdGVuZXJzKSByZXR1cm4gZmFsc2U7XG4gICAgdmFyIGFyZ2xlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgaWYgKGFyZ2xlbiA9PT0gMSkge1xuICAgICAgbGlzdGVuZXJzLmZvckVhY2goemVyb2FyZyk7XG4gICAgfSBlbHNlIGlmIChhcmdsZW4gPT09IDIpIHtcbiAgICAgIGxpc3RlbmVycy5mb3JFYWNoKG9uZWFyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgIGxpc3RlbmVycy5mb3JFYWNoKG1vcmVhcmdzKTtcbiAgICB9XG4gICAgcmV0dXJuICEhbGlzdGVuZXJzLmxlbmd0aDtcblxuICAgIGZ1bmN0aW9uIHplcm9hcmcoZnVuYykge1xuICAgICAgZnVuYy5jYWxsKHRoYXQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uZWFyZyhmdW5jKSB7XG4gICAgICBmdW5jLmNhbGwodGhhdCwgdmFsdWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vcmVhcmdzKGZ1bmMpIHtcbiAgICAgIGZ1bmMuYXBwbHkodGhhdCwgYXJncyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBpZ25vcmVcbiAgICovXG5cbiAgZnVuY3Rpb24gZ2V0TGlzdGVuZXJzKHRoYXQsIHR5cGUsIHJlYWRvbmx5KSB7XG4gICAgaWYgKHJlYWRvbmx5ICYmICF0aGF0W0xJU1RFTkVSU10pIHJldHVybjtcbiAgICB2YXIgbGlzdGVuZXJzID0gdGhhdFtMSVNURU5FUlNdIHx8ICh0aGF0W0xJU1RFTkVSU10gPSB7fSk7XG4gICAgcmV0dXJuIGxpc3RlbmVyc1t0eXBlXSB8fCAobGlzdGVuZXJzW3R5cGVdID0gW10pO1xuICB9XG5cbn0pKEV2ZW50TGl0ZSk7XG4iLCJleHBvcnRzLnJlYWQgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbVxuICB2YXIgZUxlbiA9IChuQnl0ZXMgKiA4KSAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgbkJpdHMgPSAtN1xuICB2YXIgaSA9IGlzTEUgPyAobkJ5dGVzIC0gMSkgOiAwXG4gIHZhciBkID0gaXNMRSA/IC0xIDogMVxuICB2YXIgcyA9IGJ1ZmZlcltvZmZzZXQgKyBpXVxuXG4gIGkgKz0gZFxuXG4gIGUgPSBzICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIHMgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IGVMZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgZSA9IChlICogMjU2KSArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIG0gPSBlICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIGUgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IG1MZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IChtICogMjU2KSArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIGlmIChlID09PSAwKSB7XG4gICAgZSA9IDEgLSBlQmlhc1xuICB9IGVsc2UgaWYgKGUgPT09IGVNYXgpIHtcbiAgICByZXR1cm4gbSA/IE5hTiA6ICgocyA/IC0xIDogMSkgKiBJbmZpbml0eSlcbiAgfSBlbHNlIHtcbiAgICBtID0gbSArIE1hdGgucG93KDIsIG1MZW4pXG4gICAgZSA9IGUgLSBlQmlhc1xuICB9XG4gIHJldHVybiAocyA/IC0xIDogMSkgKiBtICogTWF0aC5wb3coMiwgZSAtIG1MZW4pXG59XG5cbmV4cG9ydHMud3JpdGUgPSBmdW5jdGlvbiAoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sIGNcbiAgdmFyIGVMZW4gPSAobkJ5dGVzICogOCkgLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIHJ0ID0gKG1MZW4gPT09IDIzID8gTWF0aC5wb3coMiwgLTI0KSAtIE1hdGgucG93KDIsIC03NykgOiAwKVxuICB2YXIgaSA9IGlzTEUgPyAwIDogKG5CeXRlcyAtIDEpXG4gIHZhciBkID0gaXNMRSA/IDEgOiAtMVxuICB2YXIgcyA9IHZhbHVlIDwgMCB8fCAodmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCkgPyAxIDogMFxuXG4gIHZhbHVlID0gTWF0aC5hYnModmFsdWUpXG5cbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpIHtcbiAgICBtID0gaXNOYU4odmFsdWUpID8gMSA6IDBcbiAgICBlID0gZU1heFxuICB9IGVsc2Uge1xuICAgIGUgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbHVlKSAvIE1hdGguTE4yKVxuICAgIGlmICh2YWx1ZSAqIChjID0gTWF0aC5wb3coMiwgLWUpKSA8IDEpIHtcbiAgICAgIGUtLVxuICAgICAgYyAqPSAyXG4gICAgfVxuICAgIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgdmFsdWUgKz0gcnQgLyBjXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogTWF0aC5wb3coMiwgMSAtIGVCaWFzKVxuICAgIH1cbiAgICBpZiAodmFsdWUgKiBjID49IDIpIHtcbiAgICAgIGUrK1xuICAgICAgYyAvPSAyXG4gICAgfVxuXG4gICAgaWYgKGUgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtID0gMFxuICAgICAgZSA9IGVNYXhcbiAgICB9IGVsc2UgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICBtID0gKCh2YWx1ZSAqIGMpIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IGUgKyBlQmlhc1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBNYXRoLnBvdygyLCBlQmlhcyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSAwXG4gICAgfVxuICB9XG5cbiAgZm9yICg7IG1MZW4gPj0gODsgYnVmZmVyW29mZnNldCArIGldID0gbSAmIDB4ZmYsIGkgKz0gZCwgbSAvPSAyNTYsIG1MZW4gLT0gOCkge31cblxuICBlID0gKGUgPDwgbUxlbikgfCBtXG4gIGVMZW4gKz0gbUxlblxuICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpIHt9XG5cbiAgYnVmZmVyW29mZnNldCArIGkgLSBkXSB8PSBzICogMTI4XG59XG4iLCIvKioqIElNUE9SVFMgRlJPTSBpbXBvcnRzLWxvYWRlciAqKiovXG5cbmJyb3dzZXIgPSB1bmRlZmluZWQ7XG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiLCBbXCJtb2R1bGVcIl0sIGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgZmFjdG9yeShtb2R1bGUpO1xuICB9IGVsc2Uge1xuICAgIHZhciBtb2QgPSB7XG4gICAgICBleHBvcnRzOiB7fVxuICAgIH07XG4gICAgZmFjdG9yeShtb2QpO1xuICAgIGdsb2JhbC5icm93c2VyID0gbW9kLmV4cG9ydHM7XG4gIH1cbn0pKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsVGhpcyA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgLyogd2ViZXh0ZW5zaW9uLXBvbHlmaWxsIC0gdjAuOC4wIC0gVHVlIEFwciAyMCAyMDIxIDExOjI3OjM4ICovXG5cbiAgLyogLSotIE1vZGU6IGluZGVudC10YWJzLW1vZGU6IG5pbDsganMtaW5kZW50LWxldmVsOiAyIC0qLSAqL1xuXG4gIC8qIHZpbTogc2V0IHN0cz0yIHN3PTIgZXQgdHc9ODA6ICovXG5cbiAgLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICAgKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gICAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGlmICh0eXBlb2YgYnJvd3NlciA9PT0gXCJ1bmRlZmluZWRcIiB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoYnJvd3NlcikgIT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgICBjb25zdCBDSFJPTUVfU0VORF9NRVNTQUdFX0NBTExCQUNLX05PX1JFU1BPTlNFX01FU1NBR0UgPSBcIlRoZSBtZXNzYWdlIHBvcnQgY2xvc2VkIGJlZm9yZSBhIHJlc3BvbnNlIHdhcyByZWNlaXZlZC5cIjtcbiAgICBjb25zdCBTRU5EX1JFU1BPTlNFX0RFUFJFQ0FUSU9OX1dBUk5JTkcgPSBcIlJldHVybmluZyBhIFByb21pc2UgaXMgdGhlIHByZWZlcnJlZCB3YXkgdG8gc2VuZCBhIHJlcGx5IGZyb20gYW4gb25NZXNzYWdlL29uTWVzc2FnZUV4dGVybmFsIGxpc3RlbmVyLCBhcyB0aGUgc2VuZFJlc3BvbnNlIHdpbGwgYmUgcmVtb3ZlZCBmcm9tIHRoZSBzcGVjcyAoU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RvY3MvTW96aWxsYS9BZGQtb25zL1dlYkV4dGVuc2lvbnMvQVBJL3J1bnRpbWUvb25NZXNzYWdlKVwiOyAvLyBXcmFwcGluZyB0aGUgYnVsayBvZiB0aGlzIHBvbHlmaWxsIGluIGEgb25lLXRpbWUtdXNlIGZ1bmN0aW9uIGlzIGEgbWlub3JcbiAgICAvLyBvcHRpbWl6YXRpb24gZm9yIEZpcmVmb3guIFNpbmNlIFNwaWRlcm1vbmtleSBkb2VzIG5vdCBmdWxseSBwYXJzZSB0aGVcbiAgICAvLyBjb250ZW50cyBvZiBhIGZ1bmN0aW9uIHVudGlsIHRoZSBmaXJzdCB0aW1lIGl0J3MgY2FsbGVkLCBhbmQgc2luY2UgaXQgd2lsbFxuICAgIC8vIG5ldmVyIGFjdHVhbGx5IG5lZWQgdG8gYmUgY2FsbGVkLCB0aGlzIGFsbG93cyB0aGUgcG9seWZpbGwgdG8gYmUgaW5jbHVkZWRcbiAgICAvLyBpbiBGaXJlZm94IG5lYXJseSBmb3IgZnJlZS5cblxuICAgIGNvbnN0IHdyYXBBUElzID0gZXh0ZW5zaW9uQVBJcyA9PiB7XG4gICAgICAvLyBOT1RFOiBhcGlNZXRhZGF0YSBpcyBhc3NvY2lhdGVkIHRvIHRoZSBjb250ZW50IG9mIHRoZSBhcGktbWV0YWRhdGEuanNvbiBmaWxlXG4gICAgICAvLyBhdCBidWlsZCB0aW1lIGJ5IHJlcGxhY2luZyB0aGUgZm9sbG93aW5nIFwiaW5jbHVkZVwiIHdpdGggdGhlIGNvbnRlbnQgb2YgdGhlXG4gICAgICAvLyBKU09OIGZpbGUuXG4gICAgICBjb25zdCBhcGlNZXRhZGF0YSA9IHtcbiAgICAgICAgXCJhbGFybXNcIjoge1xuICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGVhckFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImJvb2ttYXJrc1wiOiB7XG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDaGlsZHJlblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFJlY2VudFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFN1YlRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRUcmVlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwibW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJicm93c2VyQWN0aW9uXCI6IHtcbiAgICAgICAgICBcImRpc2FibGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJlbmFibGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRCYWRnZUJhY2tncm91bmRDb2xvclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEJhZGdlVGV4dFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJvcGVuUG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRCYWRnZUJhY2tncm91bmRDb2xvclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEJhZGdlVGV4dFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEljb25cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRQb3B1cFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFRpdGxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYnJvd3NpbmdEYXRhXCI6IHtcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUNhY2hlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlQ29va2llc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZURvd25sb2Fkc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUZvcm1EYXRhXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlSGlzdG9yeVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUxvY2FsU3RvcmFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVBhc3N3b3Jkc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVBsdWdpbkRhdGFcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXR0aW5nc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvbW1hbmRzXCI6IHtcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvbnRleHRNZW51c1wiOiB7XG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJjb29raWVzXCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbENvb2tpZVN0b3Jlc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImRldnRvb2xzXCI6IHtcbiAgICAgICAgICBcImluc3BlY3RlZFdpbmRvd1wiOiB7XG4gICAgICAgICAgICBcImV2YWxcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDIsXG4gICAgICAgICAgICAgIFwic2luZ2xlQ2FsbGJhY2tBcmdcIjogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicGFuZWxzXCI6IHtcbiAgICAgICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDMsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAzLFxuICAgICAgICAgICAgICBcInNpbmdsZUNhbGxiYWNrQXJnXCI6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImVsZW1lbnRzXCI6IHtcbiAgICAgICAgICAgICAgXCJjcmVhdGVTaWRlYmFyUGFuZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJkb3dubG9hZHNcIjoge1xuICAgICAgICAgIFwiY2FuY2VsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZG93bmxvYWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJlcmFzZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEZpbGVJY29uXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwib3BlblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInBhdXNlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlRmlsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlc3VtZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNob3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJleHRlbnNpb25cIjoge1xuICAgICAgICAgIFwiaXNBbGxvd2VkRmlsZVNjaGVtZUFjY2Vzc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImlzQWxsb3dlZEluY29nbml0b0FjY2Vzc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImhpc3RvcnlcIjoge1xuICAgICAgICAgIFwiYWRkVXJsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGVsZXRlQWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGVsZXRlUmFuZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZWxldGVVcmxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRWaXNpdHNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpMThuXCI6IHtcbiAgICAgICAgICBcImRldGVjdExhbmd1YWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWNjZXB0TGFuZ3VhZ2VzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiaWRlbnRpdHlcIjoge1xuICAgICAgICAgIFwibGF1bmNoV2ViQXV0aEZsb3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpZGxlXCI6IHtcbiAgICAgICAgICBcInF1ZXJ5U3RhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJtYW5hZ2VtZW50XCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFNlbGZcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRFbmFibGVkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidW5pbnN0YWxsU2VsZlwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm5vdGlmaWNhdGlvbnNcIjoge1xuICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRQZXJtaXNzaW9uTGV2ZWxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJwYWdlQWN0aW9uXCI6IHtcbiAgICAgICAgICBcImdldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJoaWRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0SWNvblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzaG93XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicGVybWlzc2lvbnNcIjoge1xuICAgICAgICAgIFwiY29udGFpbnNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXF1ZXN0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicnVudGltZVwiOiB7XG4gICAgICAgICAgXCJnZXRCYWNrZ3JvdW5kUGFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBsYXRmb3JtSW5mb1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm9wZW5PcHRpb25zUGFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlcXVlc3RVcGRhdGVDaGVja1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlbmRNZXNzYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDNcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VuZE5hdGl2ZU1lc3NhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRVbmluc3RhbGxVUkxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXNzaW9uc1wiOiB7XG4gICAgICAgICAgXCJnZXREZXZpY2VzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UmVjZW50bHlDbG9zZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXN0b3JlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwic3RvcmFnZVwiOiB7XG4gICAgICAgICAgXCJsb2NhbFwiOiB7XG4gICAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm1hbmFnZWRcIjoge1xuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3luY1wiOiB7XG4gICAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInRhYnNcIjoge1xuICAgICAgICAgIFwiY2FwdHVyZVZpc2libGVUYWJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZXRlY3RMYW5ndWFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRpc2NhcmRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkdXBsaWNhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJleGVjdXRlU2NyaXB0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Q3VycmVudFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFpvb21cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRab29tU2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnb0JhY2tcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnb0ZvcndhcmRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJoaWdobGlnaHRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJpbnNlcnRDU1NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicXVlcnlcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZWxvYWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVDU1NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZW5kTWVzc2FnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFpvb21cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRab29tU2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ0b3BTaXRlc1wiOiB7XG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ3ZWJOYXZpZ2F0aW9uXCI6IHtcbiAgICAgICAgICBcImdldEFsbEZyYW1lc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEZyYW1lXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwid2ViUmVxdWVzdFwiOiB7XG4gICAgICAgICAgXCJoYW5kbGVyQmVoYXZpb3JDaGFuZ2VkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwid2luZG93c1wiOiB7XG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDdXJyZW50XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0TGFzdEZvY3VzZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaWYgKE9iamVjdC5rZXlzKGFwaU1ldGFkYXRhKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXBpLW1ldGFkYXRhLmpzb24gaGFzIG5vdCBiZWVuIGluY2x1ZGVkIGluIGJyb3dzZXItcG9seWZpbGxcIik7XG4gICAgICB9XG4gICAgICAvKipcbiAgICAgICAqIEEgV2Vha01hcCBzdWJjbGFzcyB3aGljaCBjcmVhdGVzIGFuZCBzdG9yZXMgYSB2YWx1ZSBmb3IgYW55IGtleSB3aGljaCBkb2VzXG4gICAgICAgKiBub3QgZXhpc3Qgd2hlbiBhY2Nlc3NlZCwgYnV0IGJlaGF2ZXMgZXhhY3RseSBhcyBhbiBvcmRpbmFyeSBXZWFrTWFwXG4gICAgICAgKiBvdGhlcndpc2UuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY3JlYXRlSXRlbVxuICAgICAgICogICAgICAgIEEgZnVuY3Rpb24gd2hpY2ggd2lsbCBiZSBjYWxsZWQgaW4gb3JkZXIgdG8gY3JlYXRlIHRoZSB2YWx1ZSBmb3IgYW55XG4gICAgICAgKiAgICAgICAga2V5IHdoaWNoIGRvZXMgbm90IGV4aXN0LCB0aGUgZmlyc3QgdGltZSBpdCBpcyBhY2Nlc3NlZC4gVGhlXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gcmVjZWl2ZXMsIGFzIGl0cyBvbmx5IGFyZ3VtZW50LCB0aGUga2V5IGJlaW5nIGNyZWF0ZWQuXG4gICAgICAgKi9cblxuXG4gICAgICBjbGFzcyBEZWZhdWx0V2Vha01hcCBleHRlbmRzIFdlYWtNYXAge1xuICAgICAgICBjb25zdHJ1Y3RvcihjcmVhdGVJdGVtLCBpdGVtcyA9IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHN1cGVyKGl0ZW1zKTtcbiAgICAgICAgICB0aGlzLmNyZWF0ZUl0ZW0gPSBjcmVhdGVJdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0KGtleSkge1xuICAgICAgICAgIGlmICghdGhpcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoa2V5LCB0aGlzLmNyZWF0ZUl0ZW0oa2V5KSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHN1cGVyLmdldChrZXkpO1xuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBvYmplY3QgaXMgYW4gb2JqZWN0IHdpdGggYSBgdGhlbmAgbWV0aG9kLCBhbmQgY2FuXG4gICAgICAgKiB0aGVyZWZvcmUgYmUgYXNzdW1lZCB0byBiZWhhdmUgYXMgYSBQcm9taXNlLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdGhlbmFibGUuXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCBpc1RoZW5hYmxlID0gdmFsdWUgPT4ge1xuICAgICAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSBcImZ1bmN0aW9uXCI7XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgZnVuY3Rpb24gd2hpY2gsIHdoZW4gY2FsbGVkLCB3aWxsIHJlc29sdmUgb3IgcmVqZWN0XG4gICAgICAgKiB0aGUgZ2l2ZW4gcHJvbWlzZSBiYXNlZCBvbiBob3cgaXQgaXMgY2FsbGVkOlxuICAgICAgICpcbiAgICAgICAqIC0gSWYsIHdoZW4gY2FsbGVkLCBgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yYCBjb250YWlucyBhIG5vbi1udWxsIG9iamVjdCxcbiAgICAgICAqICAgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQgd2l0aCB0aGF0IHZhbHVlLlxuICAgICAgICogLSBJZiB0aGUgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGggZXhhY3RseSBvbmUgYXJndW1lbnQsIHRoZSBwcm9taXNlIGlzXG4gICAgICAgKiAgIHJlc29sdmVkIHRvIHRoYXQgdmFsdWUuXG4gICAgICAgKiAtIE90aGVyd2lzZSwgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgdG8gYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlXG4gICAgICAgKiAgIGZ1bmN0aW9uJ3MgYXJndW1lbnRzLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9taXNlXG4gICAgICAgKiAgICAgICAgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHJlc29sdXRpb24gYW5kIHJlamVjdGlvbiBmdW5jdGlvbnMgb2YgYVxuICAgICAgICogICAgICAgIHByb21pc2UuXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9taXNlLnJlc29sdmVcbiAgICAgICAqICAgICAgICBUaGUgcHJvbWlzZSdzIHJlc29sdXRpb24gZnVuY3Rpb24uXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9taXNlLnJlamVjdFxuICAgICAgICogICAgICAgIFRoZSBwcm9taXNlJ3MgcmVqZWN0aW9uIGZ1bmN0aW9uLlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IG1ldGFkYXRhXG4gICAgICAgKiAgICAgICAgTWV0YWRhdGEgYWJvdXQgdGhlIHdyYXBwZWQgbWV0aG9kIHdoaWNoIGhhcyBjcmVhdGVkIHRoZSBjYWxsYmFjay5cbiAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWV0YWRhdGEuc2luZ2xlQ2FsbGJhY2tBcmdcbiAgICAgICAqICAgICAgICBXaGV0aGVyIG9yIG5vdCB0aGUgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIG9ubHkgdGhlIGZpcnN0XG4gICAgICAgKiAgICAgICAgYXJndW1lbnQgb2YgdGhlIGNhbGxiYWNrLCBhbHRlcm5hdGl2ZWx5IGFuIGFycmF5IG9mIGFsbCB0aGVcbiAgICAgICAqICAgICAgICBjYWxsYmFjayBhcmd1bWVudHMgaXMgcmVzb2x2ZWQuIEJ5IGRlZmF1bHQsIGlmIHRoZSBjYWxsYmFja1xuICAgICAgICogICAgICAgIGZ1bmN0aW9uIGlzIGludm9rZWQgd2l0aCBvbmx5IGEgc2luZ2xlIGFyZ3VtZW50LCB0aGF0IHdpbGwgYmVcbiAgICAgICAqICAgICAgICByZXNvbHZlZCB0byB0aGUgcHJvbWlzZSwgd2hpbGUgYWxsIGFyZ3VtZW50cyB3aWxsIGJlIHJlc29sdmVkIGFzXG4gICAgICAgKiAgICAgICAgYW4gYXJyYXkgaWYgbXVsdGlwbGUgYXJlIGdpdmVuLlxuICAgICAgICpcbiAgICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAgICAgICAqICAgICAgICBUaGUgZ2VuZXJhdGVkIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICAgICovXG5cblxuICAgICAgY29uc3QgbWFrZUNhbGxiYWNrID0gKHByb21pc2UsIG1ldGFkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiAoLi4uY2FsbGJhY2tBcmdzKSA9PiB7XG4gICAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICAgIHByb21pc2UucmVqZWN0KG5ldyBFcnJvcihleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhLnNpbmdsZUNhbGxiYWNrQXJnIHx8IGNhbGxiYWNrQXJncy5sZW5ndGggPD0gMSAmJiBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHByb21pc2UucmVzb2x2ZShjYWxsYmFja0FyZ3NbMF0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9taXNlLnJlc29sdmUoY2FsbGJhY2tBcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBwbHVyYWxpemVBcmd1bWVudHMgPSBudW1BcmdzID0+IG51bUFyZ3MgPT0gMSA/IFwiYXJndW1lbnRcIiA6IFwiYXJndW1lbnRzXCI7XG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYSB3cmFwcGVyIGZ1bmN0aW9uIGZvciBhIG1ldGhvZCB3aXRoIHRoZSBnaXZlbiBuYW1lIGFuZCBtZXRhZGF0YS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAgICogICAgICAgIFRoZSBuYW1lIG9mIHRoZSBtZXRob2Qgd2hpY2ggaXMgYmVpbmcgd3JhcHBlZC5cbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtZXRhZGF0YVxuICAgICAgICogICAgICAgIE1ldGFkYXRhIGFib3V0IHRoZSBtZXRob2QgYmVpbmcgd3JhcHBlZC5cbiAgICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gbWV0YWRhdGEubWluQXJnc1xuICAgICAgICogICAgICAgIFRoZSBtaW5pbXVtIG51bWJlciBvZiBhcmd1bWVudHMgd2hpY2ggbXVzdCBiZSBwYXNzZWQgdG8gdGhlXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24uIElmIGNhbGxlZCB3aXRoIGZld2VyIHRoYW4gdGhpcyBudW1iZXIgb2YgYXJndW1lbnRzLCB0aGVcbiAgICAgICAqICAgICAgICB3cmFwcGVyIHdpbGwgcmFpc2UgYW4gZXhjZXB0aW9uLlxuICAgICAgICogQHBhcmFtIHtpbnRlZ2VyfSBtZXRhZGF0YS5tYXhBcmdzXG4gICAgICAgKiAgICAgICAgVGhlIG1heGltdW0gbnVtYmVyIG9mIGFyZ3VtZW50cyB3aGljaCBtYXkgYmUgcGFzc2VkIHRvIHRoZVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uLiBJZiBjYWxsZWQgd2l0aCBtb3JlIHRoYW4gdGhpcyBudW1iZXIgb2YgYXJndW1lbnRzLCB0aGVcbiAgICAgICAqICAgICAgICB3cmFwcGVyIHdpbGwgcmFpc2UgYW4gZXhjZXB0aW9uLlxuICAgICAgICogQHBhcmFtIHtib29sZWFufSBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZ1xuICAgICAgICogICAgICAgIFdoZXRoZXIgb3Igbm90IHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggb25seSB0aGUgZmlyc3RcbiAgICAgICAqICAgICAgICBhcmd1bWVudCBvZiB0aGUgY2FsbGJhY2ssIGFsdGVybmF0aXZlbHkgYW4gYXJyYXkgb2YgYWxsIHRoZVxuICAgICAgICogICAgICAgIGNhbGxiYWNrIGFyZ3VtZW50cyBpcyByZXNvbHZlZC4gQnkgZGVmYXVsdCwgaWYgdGhlIGNhbGxiYWNrXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gaXMgaW52b2tlZCB3aXRoIG9ubHkgYSBzaW5nbGUgYXJndW1lbnQsIHRoYXQgd2lsbCBiZVxuICAgICAgICogICAgICAgIHJlc29sdmVkIHRvIHRoZSBwcm9taXNlLCB3aGlsZSBhbGwgYXJndW1lbnRzIHdpbGwgYmUgcmVzb2x2ZWQgYXNcbiAgICAgICAqICAgICAgICBhbiBhcnJheSBpZiBtdWx0aXBsZSBhcmUgZ2l2ZW4uXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge2Z1bmN0aW9uKG9iamVjdCwgLi4uKil9XG4gICAgICAgKiAgICAgICBUaGUgZ2VuZXJhdGVkIHdyYXBwZXIgZnVuY3Rpb24uXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCB3cmFwQXN5bmNGdW5jdGlvbiA9IChuYW1lLCBtZXRhZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gYXN5bmNGdW5jdGlvbldyYXBwZXIodGFyZ2V0LCAuLi5hcmdzKSB7XG4gICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoIDwgbWV0YWRhdGEubWluQXJncykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBsZWFzdCAke21ldGFkYXRhLm1pbkFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1pbkFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPiBtZXRhZGF0YS5tYXhBcmdzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IG1vc3QgJHttZXRhZGF0YS5tYXhBcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5tYXhBcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YS5mYWxsYmFja1RvTm9DYWxsYmFjaykge1xuICAgICAgICAgICAgICAvLyBUaGlzIEFQSSBtZXRob2QgaGFzIGN1cnJlbnRseSBubyBjYWxsYmFjayBvbiBDaHJvbWUsIGJ1dCBpdCByZXR1cm4gYSBwcm9taXNlIG9uIEZpcmVmb3gsXG4gICAgICAgICAgICAgIC8vIGFuZCBzbyB0aGUgcG9seWZpbGwgd2lsbCB0cnkgdG8gY2FsbCBpdCB3aXRoIGEgY2FsbGJhY2sgZmlyc3QsIGFuZCBpdCB3aWxsIGZhbGxiYWNrXG4gICAgICAgICAgICAgIC8vIHRvIG5vdCBwYXNzaW5nIHRoZSBjYWxsYmFjayBpZiB0aGUgZmlyc3QgY2FsbCBmYWlscy5cbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncywgbWFrZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICAgICAgICByZWplY3RcbiAgICAgICAgICAgICAgICB9LCBtZXRhZGF0YSkpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChjYkVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGAke25hbWV9IEFQSSBtZXRob2QgZG9lc24ndCBzZWVtIHRvIHN1cHBvcnQgdGhlIGNhbGxiYWNrIHBhcmFtZXRlciwgYCArIFwiZmFsbGluZyBiYWNrIHRvIGNhbGwgaXQgd2l0aG91dCBhIGNhbGxiYWNrOiBcIiwgY2JFcnJvcik7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MpOyAvLyBVcGRhdGUgdGhlIEFQSSBtZXRob2QgbWV0YWRhdGEsIHNvIHRoYXQgdGhlIG5leHQgQVBJIGNhbGxzIHdpbGwgbm90IHRyeSB0b1xuICAgICAgICAgICAgICAgIC8vIHVzZSB0aGUgdW5zdXBwb3J0ZWQgY2FsbGJhY2sgYW55bW9yZS5cblxuICAgICAgICAgICAgICAgIG1ldGFkYXRhLmZhbGxiYWNrVG9Ob0NhbGxiYWNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbWV0YWRhdGEubm9DYWxsYmFjayA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhLm5vQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MpO1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncywgbWFrZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgICB9LCBtZXRhZGF0YSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogV3JhcHMgYW4gZXhpc3RpbmcgbWV0aG9kIG9mIHRoZSB0YXJnZXQgb2JqZWN0LCBzbyB0aGF0IGNhbGxzIHRvIGl0IGFyZVxuICAgICAgICogaW50ZXJjZXB0ZWQgYnkgdGhlIGdpdmVuIHdyYXBwZXIgZnVuY3Rpb24uIFRoZSB3cmFwcGVyIGZ1bmN0aW9uIHJlY2VpdmVzLFxuICAgICAgICogYXMgaXRzIGZpcnN0IGFyZ3VtZW50LCB0aGUgb3JpZ2luYWwgYHRhcmdldGAgb2JqZWN0LCBmb2xsb3dlZCBieSBlYWNoIG9mXG4gICAgICAgKiB0aGUgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgb3JpZ2luYWwgbWV0aG9kLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRcbiAgICAgICAqICAgICAgICBUaGUgb3JpZ2luYWwgdGFyZ2V0IG9iamVjdCB0aGF0IHRoZSB3cmFwcGVkIG1ldGhvZCBiZWxvbmdzIHRvLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbWV0aG9kXG4gICAgICAgKiAgICAgICAgVGhlIG1ldGhvZCBiZWluZyB3cmFwcGVkLiBUaGlzIGlzIHVzZWQgYXMgdGhlIHRhcmdldCBvZiB0aGUgUHJveHlcbiAgICAgICAqICAgICAgICBvYmplY3Qgd2hpY2ggaXMgY3JlYXRlZCB0byB3cmFwIHRoZSBtZXRob2QuXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgVGhlIHdyYXBwZXIgZnVuY3Rpb24gd2hpY2ggaXMgY2FsbGVkIGluIHBsYWNlIG9mIGEgZGlyZWN0IGludm9jYXRpb25cbiAgICAgICAqICAgICAgICBvZiB0aGUgd3JhcHBlZCBtZXRob2QuXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge1Byb3h5PGZ1bmN0aW9uPn1cbiAgICAgICAqICAgICAgICBBIFByb3h5IG9iamVjdCBmb3IgdGhlIGdpdmVuIG1ldGhvZCwgd2hpY2ggaW52b2tlcyB0aGUgZ2l2ZW4gd3JhcHBlclxuICAgICAgICogICAgICAgIG1ldGhvZCBpbiBpdHMgcGxhY2UuXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCB3cmFwTWV0aG9kID0gKHRhcmdldCwgbWV0aG9kLCB3cmFwcGVyKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJveHkobWV0aG9kLCB7XG4gICAgICAgICAgYXBwbHkodGFyZ2V0TWV0aG9kLCB0aGlzT2JqLCBhcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gd3JhcHBlci5jYWxsKHRoaXNPYmosIHRhcmdldCwgLi4uYXJncyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgbGV0IGhhc093blByb3BlcnR5ID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuICAgICAgLyoqXG4gICAgICAgKiBXcmFwcyBhbiBvYmplY3QgaW4gYSBQcm94eSB3aGljaCBpbnRlcmNlcHRzIGFuZCB3cmFwcyBjZXJ0YWluIG1ldGhvZHNcbiAgICAgICAqIGJhc2VkIG9uIHRoZSBnaXZlbiBgd3JhcHBlcnNgIGFuZCBgbWV0YWRhdGFgIG9iamVjdHMuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICAgICAgICogICAgICAgIFRoZSB0YXJnZXQgb2JqZWN0IHRvIHdyYXAuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IFt3cmFwcGVycyA9IHt9XVxuICAgICAgICogICAgICAgIEFuIG9iamVjdCB0cmVlIGNvbnRhaW5pbmcgd3JhcHBlciBmdW5jdGlvbnMgZm9yIHNwZWNpYWwgY2FzZXMuIEFueVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uIHByZXNlbnQgaW4gdGhpcyBvYmplY3QgdHJlZSBpcyBjYWxsZWQgaW4gcGxhY2Ugb2YgdGhlXG4gICAgICAgKiAgICAgICAgbWV0aG9kIGluIHRoZSBzYW1lIGxvY2F0aW9uIGluIHRoZSBgdGFyZ2V0YCBvYmplY3QgdHJlZS4gVGhlc2VcbiAgICAgICAqICAgICAgICB3cmFwcGVyIG1ldGhvZHMgYXJlIGludm9rZWQgYXMgZGVzY3JpYmVkIGluIHtAc2VlIHdyYXBNZXRob2R9LlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbbWV0YWRhdGEgPSB7fV1cbiAgICAgICAqICAgICAgICBBbiBvYmplY3QgdHJlZSBjb250YWluaW5nIG1ldGFkYXRhIHVzZWQgdG8gYXV0b21hdGljYWxseSBnZW5lcmF0ZVxuICAgICAgICogICAgICAgIFByb21pc2UtYmFzZWQgd3JhcHBlciBmdW5jdGlvbnMgZm9yIGFzeW5jaHJvbm91cy4gQW55IGZ1bmN0aW9uIGluXG4gICAgICAgKiAgICAgICAgdGhlIGB0YXJnZXRgIG9iamVjdCB0cmVlIHdoaWNoIGhhcyBhIGNvcnJlc3BvbmRpbmcgbWV0YWRhdGEgb2JqZWN0XG4gICAgICAgKiAgICAgICAgaW4gdGhlIHNhbWUgbG9jYXRpb24gaW4gdGhlIGBtZXRhZGF0YWAgdHJlZSBpcyByZXBsYWNlZCB3aXRoIGFuXG4gICAgICAgKiAgICAgICAgYXV0b21hdGljYWxseS1nZW5lcmF0ZWQgd3JhcHBlciBmdW5jdGlvbiwgYXMgZGVzY3JpYmVkIGluXG4gICAgICAgKiAgICAgICAge0BzZWUgd3JhcEFzeW5jRnVuY3Rpb259XG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge1Byb3h5PG9iamVjdD59XG4gICAgICAgKi9cblxuICAgICAgY29uc3Qgd3JhcE9iamVjdCA9ICh0YXJnZXQsIHdyYXBwZXJzID0ge30sIG1ldGFkYXRhID0ge30pID0+IHtcbiAgICAgICAgbGV0IGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgbGV0IGhhbmRsZXJzID0ge1xuICAgICAgICAgIGhhcyhwcm94eVRhcmdldCwgcHJvcCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3AgaW4gdGFyZ2V0IHx8IHByb3AgaW4gY2FjaGU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGdldChwcm94eVRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgIGlmIChwcm9wIGluIGNhY2hlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjYWNoZVtwcm9wXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEocHJvcCBpbiB0YXJnZXQpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRhcmdldFtwcm9wXTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBtZXRob2Qgb24gdGhlIHVuZGVybHlpbmcgb2JqZWN0LiBDaGVjayBpZiB3ZSBuZWVkIHRvIGRvXG4gICAgICAgICAgICAgIC8vIGFueSB3cmFwcGluZy5cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3cmFwcGVyc1twcm9wXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSBhIHNwZWNpYWwtY2FzZSB3cmFwcGVyIGZvciB0aGlzIG1ldGhvZC5cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBNZXRob2QodGFyZ2V0LCB0YXJnZXRbcHJvcF0sIHdyYXBwZXJzW3Byb3BdKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNPd25Qcm9wZXJ0eShtZXRhZGF0YSwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGFuIGFzeW5jIG1ldGhvZCB0aGF0IHdlIGhhdmUgbWV0YWRhdGEgZm9yLiBDcmVhdGUgYVxuICAgICAgICAgICAgICAgIC8vIFByb21pc2Ugd3JhcHBlciBmb3IgaXQuXG4gICAgICAgICAgICAgICAgbGV0IHdyYXBwZXIgPSB3cmFwQXN5bmNGdW5jdGlvbihwcm9wLCBtZXRhZGF0YVtwcm9wXSk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwTWV0aG9kKHRhcmdldCwgdGFyZ2V0W3Byb3BdLCB3cmFwcGVyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgbWV0aG9kIHRoYXQgd2UgZG9uJ3Qga25vdyBvciBjYXJlIGFib3V0LiBSZXR1cm4gdGhlXG4gICAgICAgICAgICAgICAgLy8gb3JpZ2luYWwgbWV0aG9kLCBib3VuZCB0byB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5iaW5kKHRhcmdldCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmIChoYXNPd25Qcm9wZXJ0eSh3cmFwcGVycywgcHJvcCkgfHwgaGFzT3duUHJvcGVydHkobWV0YWRhdGEsIHByb3ApKSkge1xuICAgICAgICAgICAgICAvLyBUaGlzIGlzIGFuIG9iamVjdCB0aGF0IHdlIG5lZWQgdG8gZG8gc29tZSB3cmFwcGluZyBmb3IgdGhlIGNoaWxkcmVuXG4gICAgICAgICAgICAgIC8vIG9mLiBDcmVhdGUgYSBzdWItb2JqZWN0IHdyYXBwZXIgZm9yIGl0IHdpdGggdGhlIGFwcHJvcHJpYXRlIGNoaWxkXG4gICAgICAgICAgICAgIC8vIG1ldGFkYXRhLlxuICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBPYmplY3QodmFsdWUsIHdyYXBwZXJzW3Byb3BdLCBtZXRhZGF0YVtwcm9wXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhhc093blByb3BlcnR5KG1ldGFkYXRhLCBcIipcIikpIHtcbiAgICAgICAgICAgICAgLy8gV3JhcCBhbGwgcHJvcGVydGllcyBpbiAqIG5hbWVzcGFjZS5cbiAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwT2JqZWN0KHZhbHVlLCB3cmFwcGVyc1twcm9wXSwgbWV0YWRhdGFbXCIqXCJdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIFdlIGRvbid0IG5lZWQgdG8gZG8gYW55IHdyYXBwaW5nIGZvciB0aGlzIHByb3BlcnR5LFxuICAgICAgICAgICAgICAvLyBzbyBqdXN0IGZvcndhcmQgYWxsIGFjY2VzcyB0byB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjYWNoZSwgcHJvcCwge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldFtwcm9wXTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FjaGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc2V0KHByb3h5VGFyZ2V0LCBwcm9wLCB2YWx1ZSwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgIGlmIChwcm9wIGluIGNhY2hlKSB7XG4gICAgICAgICAgICAgIGNhY2hlW3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGRlZmluZVByb3BlcnR5KHByb3h5VGFyZ2V0LCBwcm9wLCBkZXNjKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShjYWNoZSwgcHJvcCwgZGVzYyk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGRlbGV0ZVByb3BlcnR5KHByb3h5VGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5kZWxldGVQcm9wZXJ0eShjYWNoZSwgcHJvcCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH07IC8vIFBlciBjb250cmFjdCBvZiB0aGUgUHJveHkgQVBJLCB0aGUgXCJnZXRcIiBwcm94eSBoYW5kbGVyIG11c3QgcmV0dXJuIHRoZVxuICAgICAgICAvLyBvcmlnaW5hbCB2YWx1ZSBvZiB0aGUgdGFyZ2V0IGlmIHRoYXQgdmFsdWUgaXMgZGVjbGFyZWQgcmVhZC1vbmx5IGFuZFxuICAgICAgICAvLyBub24tY29uZmlndXJhYmxlLiBGb3IgdGhpcyByZWFzb24sIHdlIGNyZWF0ZSBhbiBvYmplY3Qgd2l0aCB0aGVcbiAgICAgICAgLy8gcHJvdG90eXBlIHNldCB0byBgdGFyZ2V0YCBpbnN0ZWFkIG9mIHVzaW5nIGB0YXJnZXRgIGRpcmVjdGx5LlxuICAgICAgICAvLyBPdGhlcndpc2Ugd2UgY2Fubm90IHJldHVybiBhIGN1c3RvbSBvYmplY3QgZm9yIEFQSXMgdGhhdFxuICAgICAgICAvLyBhcmUgZGVjbGFyZWQgcmVhZC1vbmx5IGFuZCBub24tY29uZmlndXJhYmxlLCBzdWNoIGFzIGBjaHJvbWUuZGV2dG9vbHNgLlxuICAgICAgICAvL1xuICAgICAgICAvLyBUaGUgcHJveHkgaGFuZGxlcnMgdGhlbXNlbHZlcyB3aWxsIHN0aWxsIHVzZSB0aGUgb3JpZ2luYWwgYHRhcmdldGBcbiAgICAgICAgLy8gaW5zdGVhZCBvZiB0aGUgYHByb3h5VGFyZ2V0YCwgc28gdGhhdCB0aGUgbWV0aG9kcyBhbmQgcHJvcGVydGllcyBhcmVcbiAgICAgICAgLy8gZGVyZWZlcmVuY2VkIHZpYSB0aGUgb3JpZ2luYWwgdGFyZ2V0cy5cblxuICAgICAgICBsZXQgcHJveHlUYXJnZXQgPSBPYmplY3QuY3JlYXRlKHRhcmdldCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJveHkocHJveHlUYXJnZXQsIGhhbmRsZXJzKTtcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYSBzZXQgb2Ygd3JhcHBlciBmdW5jdGlvbnMgZm9yIGFuIGV2ZW50IG9iamVjdCwgd2hpY2ggaGFuZGxlc1xuICAgICAgICogd3JhcHBpbmcgb2YgbGlzdGVuZXIgZnVuY3Rpb25zIHRoYXQgdGhvc2UgbWVzc2FnZXMgYXJlIHBhc3NlZC5cbiAgICAgICAqXG4gICAgICAgKiBBIHNpbmdsZSB3cmFwcGVyIGlzIGNyZWF0ZWQgZm9yIGVhY2ggbGlzdGVuZXIgZnVuY3Rpb24sIGFuZCBzdG9yZWQgaW4gYVxuICAgICAgICogbWFwLiBTdWJzZXF1ZW50IGNhbGxzIHRvIGBhZGRMaXN0ZW5lcmAsIGBoYXNMaXN0ZW5lcmAsIG9yIGByZW1vdmVMaXN0ZW5lcmBcbiAgICAgICAqIHJldHJpZXZlIHRoZSBvcmlnaW5hbCB3cmFwcGVyLCBzbyB0aGF0ICBhdHRlbXB0cyB0byByZW1vdmUgYVxuICAgICAgICogcHJldmlvdXNseS1hZGRlZCBsaXN0ZW5lciB3b3JrIGFzIGV4cGVjdGVkLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7RGVmYXVsdFdlYWtNYXA8ZnVuY3Rpb24sIGZ1bmN0aW9uPn0gd3JhcHBlck1hcFxuICAgICAgICogICAgICAgIEEgRGVmYXVsdFdlYWtNYXAgb2JqZWN0IHdoaWNoIHdpbGwgY3JlYXRlIHRoZSBhcHByb3ByaWF0ZSB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgZm9yIGEgZ2l2ZW4gbGlzdGVuZXIgZnVuY3Rpb24gd2hlbiBvbmUgZG9lcyBub3QgZXhpc3QsIGFuZCByZXRyaWV2ZVxuICAgICAgICogICAgICAgIGFuIGV4aXN0aW5nIG9uZSB3aGVuIGl0IGRvZXMuXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge29iamVjdH1cbiAgICAgICAqL1xuXG5cbiAgICAgIGNvbnN0IHdyYXBFdmVudCA9IHdyYXBwZXJNYXAgPT4gKHtcbiAgICAgICAgYWRkTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lciwgLi4uYXJncykge1xuICAgICAgICAgIHRhcmdldC5hZGRMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lciksIC4uLmFyZ3MpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhhc0xpc3RlbmVyKHRhcmdldCwgbGlzdGVuZXIpIHtcbiAgICAgICAgICByZXR1cm4gdGFyZ2V0Lmhhc0xpc3RlbmVyKHdyYXBwZXJNYXAuZ2V0KGxpc3RlbmVyKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lcikge1xuICAgICAgICAgIHRhcmdldC5yZW1vdmVMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lcikpO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBvblJlcXVlc3RGaW5pc2hlZFdyYXBwZXJzID0gbmV3IERlZmF1bHRXZWFrTWFwKGxpc3RlbmVyID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgcmV0dXJuIGxpc3RlbmVyO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcmFwcyBhbiBvblJlcXVlc3RGaW5pc2hlZCBsaXN0ZW5lciBmdW5jdGlvbiBzbyB0aGF0IGl0IHdpbGwgcmV0dXJuIGFcbiAgICAgICAgICogYGdldENvbnRlbnQoKWAgcHJvcGVydHkgd2hpY2ggcmV0dXJucyBhIGBQcm9taXNlYCByYXRoZXIgdGhhbiB1c2luZyBhXG4gICAgICAgICAqIGNhbGxiYWNrIEFQSS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHJlcVxuICAgICAgICAgKiAgICAgICAgVGhlIEhBUiBlbnRyeSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBuZXR3b3JrIHJlcXVlc3QuXG4gICAgICAgICAqL1xuXG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG9uUmVxdWVzdEZpbmlzaGVkKHJlcSkge1xuICAgICAgICAgIGNvbnN0IHdyYXBwZWRSZXEgPSB3cmFwT2JqZWN0KHJlcSwge31cbiAgICAgICAgICAvKiB3cmFwcGVycyAqL1xuICAgICAgICAgICwge1xuICAgICAgICAgICAgZ2V0Q29udGVudDoge1xuICAgICAgICAgICAgICBtaW5BcmdzOiAwLFxuICAgICAgICAgICAgICBtYXhBcmdzOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbGlzdGVuZXIod3JhcHBlZFJlcSk7XG4gICAgICAgIH07XG4gICAgICB9KTsgLy8gS2VlcCB0cmFjayBpZiB0aGUgZGVwcmVjYXRpb24gd2FybmluZyBoYXMgYmVlbiBsb2dnZWQgYXQgbGVhc3Qgb25jZS5cblxuICAgICAgbGV0IGxvZ2dlZFNlbmRSZXNwb25zZURlcHJlY2F0aW9uV2FybmluZyA9IGZhbHNlO1xuICAgICAgY29uc3Qgb25NZXNzYWdlV3JhcHBlcnMgPSBuZXcgRGVmYXVsdFdlYWtNYXAobGlzdGVuZXIgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICByZXR1cm4gbGlzdGVuZXI7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdyYXBzIGEgbWVzc2FnZSBsaXN0ZW5lciBmdW5jdGlvbiBzbyB0aGF0IGl0IG1heSBzZW5kIHJlc3BvbnNlcyBiYXNlZCBvblxuICAgICAgICAgKiBpdHMgcmV0dXJuIHZhbHVlLCByYXRoZXIgdGhhbiBieSByZXR1cm5pbmcgYSBzZW50aW5lbCB2YWx1ZSBhbmQgY2FsbGluZyBhXG4gICAgICAgICAqIGNhbGxiYWNrLiBJZiB0aGUgbGlzdGVuZXIgZnVuY3Rpb24gcmV0dXJucyBhIFByb21pc2UsIHRoZSByZXNwb25zZSBpc1xuICAgICAgICAgKiBzZW50IHdoZW4gdGhlIHByb21pc2UgZWl0aGVyIHJlc29sdmVzIG9yIHJlamVjdHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gbWVzc2FnZVxuICAgICAgICAgKiAgICAgICAgVGhlIG1lc3NhZ2Ugc2VudCBieSB0aGUgb3RoZXIgZW5kIG9mIHRoZSBjaGFubmVsLlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gc2VuZGVyXG4gICAgICAgICAqICAgICAgICBEZXRhaWxzIGFib3V0IHRoZSBzZW5kZXIgb2YgdGhlIG1lc3NhZ2UuXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oKil9IHNlbmRSZXNwb25zZVxuICAgICAgICAgKiAgICAgICAgQSBjYWxsYmFjayB3aGljaCwgd2hlbiBjYWxsZWQgd2l0aCBhbiBhcmJpdHJhcnkgYXJndW1lbnQsIHNlbmRzXG4gICAgICAgICAqICAgICAgICB0aGF0IHZhbHVlIGFzIGEgcmVzcG9uc2UuXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKiAgICAgICAgVHJ1ZSBpZiB0aGUgd3JhcHBlZCBsaXN0ZW5lciByZXR1cm5lZCBhIFByb21pc2UsIHdoaWNoIHdpbGwgbGF0ZXJcbiAgICAgICAgICogICAgICAgIHlpZWxkIGEgcmVzcG9uc2UuIEZhbHNlIG90aGVyd2lzZS5cbiAgICAgICAgICovXG5cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gb25NZXNzYWdlKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XG4gICAgICAgICAgbGV0IGRpZENhbGxTZW5kUmVzcG9uc2UgPSBmYWxzZTtcbiAgICAgICAgICBsZXQgd3JhcHBlZFNlbmRSZXNwb25zZTtcbiAgICAgICAgICBsZXQgc2VuZFJlc3BvbnNlUHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgd3JhcHBlZFNlbmRSZXNwb25zZSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICBpZiAoIWxvZ2dlZFNlbmRSZXNwb25zZURlcHJlY2F0aW9uV2FybmluZykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihTRU5EX1JFU1BPTlNFX0RFUFJFQ0FUSU9OX1dBUk5JTkcsIG5ldyBFcnJvcigpLnN0YWNrKTtcbiAgICAgICAgICAgICAgICBsb2dnZWRTZW5kUmVzcG9uc2VEZXByZWNhdGlvbldhcm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZGlkQ2FsbFNlbmRSZXNwb25zZSA9IHRydWU7XG4gICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBsZXQgcmVzdWx0O1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGxpc3RlbmVyKG1lc3NhZ2UsIHNlbmRlciwgd3JhcHBlZFNlbmRSZXNwb25zZSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGlzUmVzdWx0VGhlbmFibGUgPSByZXN1bHQgIT09IHRydWUgJiYgaXNUaGVuYWJsZShyZXN1bHQpOyAvLyBJZiB0aGUgbGlzdGVuZXIgZGlkbid0IHJldHVybmVkIHRydWUgb3IgYSBQcm9taXNlLCBvciBjYWxsZWRcbiAgICAgICAgICAvLyB3cmFwcGVkU2VuZFJlc3BvbnNlIHN5bmNocm9ub3VzbHksIHdlIGNhbiBleGl0IGVhcmxpZXJcbiAgICAgICAgICAvLyBiZWNhdXNlIHRoZXJlIHdpbGwgYmUgbm8gcmVzcG9uc2Ugc2VudCBmcm9tIHRoaXMgbGlzdGVuZXIuXG5cbiAgICAgICAgICBpZiAocmVzdWx0ICE9PSB0cnVlICYmICFpc1Jlc3VsdFRoZW5hYmxlICYmICFkaWRDYWxsU2VuZFJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSAvLyBBIHNtYWxsIGhlbHBlciB0byBzZW5kIHRoZSBtZXNzYWdlIGlmIHRoZSBwcm9taXNlIHJlc29sdmVzXG4gICAgICAgICAgLy8gYW5kIGFuIGVycm9yIGlmIHRoZSBwcm9taXNlIHJlamVjdHMgKGEgd3JhcHBlZCBzZW5kTWVzc2FnZSBoYXNcbiAgICAgICAgICAvLyB0byB0cmFuc2xhdGUgdGhlIG1lc3NhZ2UgaW50byBhIHJlc29sdmVkIHByb21pc2Ugb3IgYSByZWplY3RlZFxuICAgICAgICAgIC8vIHByb21pc2UpLlxuXG5cbiAgICAgICAgICBjb25zdCBzZW5kUHJvbWlzZWRSZXN1bHQgPSBwcm9taXNlID0+IHtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihtc2cgPT4ge1xuICAgICAgICAgICAgICAvLyBzZW5kIHRoZSBtZXNzYWdlIHZhbHVlLlxuICAgICAgICAgICAgICBzZW5kUmVzcG9uc2UobXNnKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgLy8gU2VuZCBhIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhlIGVycm9yIGlmIHRoZSByZWplY3RlZCB2YWx1ZVxuICAgICAgICAgICAgICAvLyBpcyBhbiBpbnN0YW5jZSBvZiBlcnJvciwgb3IgdGhlIG9iamVjdCBpdHNlbGYgb3RoZXJ3aXNlLlxuICAgICAgICAgICAgICBsZXQgbWVzc2FnZTtcblxuICAgICAgICAgICAgICBpZiAoZXJyb3IgJiYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgfHwgdHlwZW9mIGVycm9yLm1lc3NhZ2UgPT09IFwic3RyaW5nXCIpKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZFwiO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHtcbiAgICAgICAgICAgICAgICBfX21veldlYkV4dGVuc2lvblBvbHlmaWxsUmVqZWN0X186IHRydWUsXG4gICAgICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgIC8vIFByaW50IGFuIGVycm9yIG9uIHRoZSBjb25zb2xlIGlmIHVuYWJsZSB0byBzZW5kIHRoZSByZXNwb25zZS5cbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBzZW5kIG9uTWVzc2FnZSByZWplY3RlZCByZXBseVwiLCBlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTsgLy8gSWYgdGhlIGxpc3RlbmVyIHJldHVybmVkIGEgUHJvbWlzZSwgc2VuZCB0aGUgcmVzb2x2ZWQgdmFsdWUgYXMgYVxuICAgICAgICAgIC8vIHJlc3VsdCwgb3RoZXJ3aXNlIHdhaXQgdGhlIHByb21pc2UgcmVsYXRlZCB0byB0aGUgd3JhcHBlZFNlbmRSZXNwb25zZVxuICAgICAgICAgIC8vIGNhbGxiYWNrIHRvIHJlc29sdmUgYW5kIHNlbmQgaXQgYXMgYSByZXNwb25zZS5cblxuXG4gICAgICAgICAgaWYgKGlzUmVzdWx0VGhlbmFibGUpIHtcbiAgICAgICAgICAgIHNlbmRQcm9taXNlZFJlc3VsdChyZXN1bHQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZW5kUHJvbWlzZWRSZXN1bHQoc2VuZFJlc3BvbnNlUHJvbWlzZSk7XG4gICAgICAgICAgfSAvLyBMZXQgQ2hyb21lIGtub3cgdGhhdCB0aGUgbGlzdGVuZXIgaXMgcmVwbHlpbmcuXG5cblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHdyYXBwZWRTZW5kTWVzc2FnZUNhbGxiYWNrID0gKHtcbiAgICAgICAgcmVqZWN0LFxuICAgICAgICByZXNvbHZlXG4gICAgICB9LCByZXBseSkgPT4ge1xuICAgICAgICBpZiAoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgIC8vIERldGVjdCB3aGVuIG5vbmUgb2YgdGhlIGxpc3RlbmVycyByZXBsaWVkIHRvIHRoZSBzZW5kTWVzc2FnZSBjYWxsIGFuZCByZXNvbHZlXG4gICAgICAgICAgLy8gdGhlIHByb21pc2UgdG8gdW5kZWZpbmVkIGFzIGluIEZpcmVmb3guXG4gICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbC9pc3N1ZXMvMTMwXG4gICAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSA9PT0gQ0hST01FX1NFTkRfTUVTU0FHRV9DQUxMQkFDS19OT19SRVNQT05TRV9NRVNTQUdFKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJlcGx5ICYmIHJlcGx5Ll9fbW96V2ViRXh0ZW5zaW9uUG9seWZpbGxSZWplY3RfXykge1xuICAgICAgICAgIC8vIENvbnZlcnQgYmFjayB0aGUgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgZXJyb3IgaW50b1xuICAgICAgICAgIC8vIGFuIEVycm9yIGluc3RhbmNlLlxuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IocmVwbHkubWVzc2FnZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUocmVwbHkpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCB3cmFwcGVkU2VuZE1lc3NhZ2UgPSAobmFtZSwgbWV0YWRhdGEsIGFwaU5hbWVzcGFjZU9iaiwgLi4uYXJncykgPT4ge1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPCBtZXRhZGF0YS5taW5BcmdzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBsZWFzdCAke21ldGFkYXRhLm1pbkFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1pbkFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA+IG1ldGFkYXRhLm1heEFyZ3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IG1vc3QgJHttZXRhZGF0YS5tYXhBcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5tYXhBcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHdyYXBwZWRDYiA9IHdyYXBwZWRTZW5kTWVzc2FnZUNhbGxiYWNrLmJpbmQobnVsbCwge1xuICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGFyZ3MucHVzaCh3cmFwcGVkQ2IpO1xuICAgICAgICAgIGFwaU5hbWVzcGFjZU9iai5zZW5kTWVzc2FnZSguLi5hcmdzKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzdGF0aWNXcmFwcGVycyA9IHtcbiAgICAgICAgZGV2dG9vbHM6IHtcbiAgICAgICAgICBuZXR3b3JrOiB7XG4gICAgICAgICAgICBvblJlcXVlc3RGaW5pc2hlZDogd3JhcEV2ZW50KG9uUmVxdWVzdEZpbmlzaGVkV3JhcHBlcnMpXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBydW50aW1lOiB7XG4gICAgICAgICAgb25NZXNzYWdlOiB3cmFwRXZlbnQob25NZXNzYWdlV3JhcHBlcnMpLFxuICAgICAgICAgIG9uTWVzc2FnZUV4dGVybmFsOiB3cmFwRXZlbnQob25NZXNzYWdlV3JhcHBlcnMpLFxuICAgICAgICAgIHNlbmRNZXNzYWdlOiB3cmFwcGVkU2VuZE1lc3NhZ2UuYmluZChudWxsLCBcInNlbmRNZXNzYWdlXCIsIHtcbiAgICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgICBtYXhBcmdzOiAzXG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgdGFiczoge1xuICAgICAgICAgIHNlbmRNZXNzYWdlOiB3cmFwcGVkU2VuZE1lc3NhZ2UuYmluZChudWxsLCBcInNlbmRNZXNzYWdlXCIsIHtcbiAgICAgICAgICAgIG1pbkFyZ3M6IDIsXG4gICAgICAgICAgICBtYXhBcmdzOiAzXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvbnN0IHNldHRpbmdNZXRhZGF0YSA9IHtcbiAgICAgICAgY2xlYXI6IHtcbiAgICAgICAgICBtaW5BcmdzOiAxLFxuICAgICAgICAgIG1heEFyZ3M6IDFcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0OiB7XG4gICAgICAgICAgbWluQXJnczogMSxcbiAgICAgICAgICBtYXhBcmdzOiAxXG4gICAgICAgIH0sXG4gICAgICAgIHNldDoge1xuICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgbWF4QXJnczogMVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgYXBpTWV0YWRhdGEucHJpdmFjeSA9IHtcbiAgICAgICAgbmV0d29yazoge1xuICAgICAgICAgIFwiKlwiOiBzZXR0aW5nTWV0YWRhdGFcbiAgICAgICAgfSxcbiAgICAgICAgc2VydmljZXM6IHtcbiAgICAgICAgICBcIipcIjogc2V0dGluZ01ldGFkYXRhXG4gICAgICAgIH0sXG4gICAgICAgIHdlYnNpdGVzOiB7XG4gICAgICAgICAgXCIqXCI6IHNldHRpbmdNZXRhZGF0YVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHdyYXBPYmplY3QoZXh0ZW5zaW9uQVBJcywgc3RhdGljV3JhcHBlcnMsIGFwaU1ldGFkYXRhKTtcbiAgICB9O1xuXG4gICAgaWYgKHR5cGVvZiBjaHJvbWUgIT0gXCJvYmplY3RcIiB8fCAhY2hyb21lIHx8ICFjaHJvbWUucnVudGltZSB8fCAhY2hyb21lLnJ1bnRpbWUuaWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgc2NyaXB0IHNob3VsZCBvbmx5IGJlIGxvYWRlZCBpbiBhIGJyb3dzZXIgZXh0ZW5zaW9uLlwiKTtcbiAgICB9IC8vIFRoZSBidWlsZCBwcm9jZXNzIGFkZHMgYSBVTUQgd3JhcHBlciBhcm91bmQgdGhpcyBmaWxlLCB3aGljaCBtYWtlcyB0aGVcbiAgICAvLyBgbW9kdWxlYCB2YXJpYWJsZSBhdmFpbGFibGUuXG5cblxuICAgIG1vZHVsZS5leHBvcnRzID0gd3JhcEFQSXMoY2hyb21lKTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGJyb3dzZXI7XG4gIH1cbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnJvd3Nlci1wb2x5ZmlsbC5qcy5tYXBcbiIsIi8vIGludDY0LWJ1ZmZlci5qc1xuXG4vKmpzaGludCAtVzAxOCAqLyAvLyBDb25mdXNpbmcgdXNlIG9mICchJy5cbi8qanNoaW50IC1XMDMwICovIC8vIEV4cGVjdGVkIGFuIGFzc2lnbm1lbnQgb3IgZnVuY3Rpb24gY2FsbCBhbmQgaW5zdGVhZCBzYXcgYW4gZXhwcmVzc2lvbi5cbi8qanNoaW50IC1XMDkzICovIC8vIERpZCB5b3UgbWVhbiB0byByZXR1cm4gYSBjb25kaXRpb25hbCBpbnN0ZWFkIG9mIGFuIGFzc2lnbm1lbnQ/XG5cbnZhciBVaW50NjRCRSwgSW50NjRCRSwgVWludDY0TEUsIEludDY0TEU7XG5cbiFmdW5jdGlvbihleHBvcnRzKSB7XG4gIC8vIGNvbnN0YW50c1xuXG4gIHZhciBVTkRFRklORUQgPSBcInVuZGVmaW5lZFwiO1xuICB2YXIgQlVGRkVSID0gKFVOREVGSU5FRCAhPT0gdHlwZW9mIEJ1ZmZlcikgJiYgQnVmZmVyO1xuICB2YXIgVUlOVDhBUlJBWSA9IChVTkRFRklORUQgIT09IHR5cGVvZiBVaW50OEFycmF5KSAmJiBVaW50OEFycmF5O1xuICB2YXIgQVJSQVlCVUZGRVIgPSAoVU5ERUZJTkVEICE9PSB0eXBlb2YgQXJyYXlCdWZmZXIpICYmIEFycmF5QnVmZmVyO1xuICB2YXIgWkVSTyA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwXTtcbiAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IF9pc0FycmF5O1xuICB2YXIgQklUMzIgPSA0Mjk0OTY3Mjk2O1xuICB2YXIgQklUMjQgPSAxNjc3NzIxNjtcblxuICAvLyBzdG9yYWdlIGNsYXNzXG5cbiAgdmFyIHN0b3JhZ2U7IC8vIEFycmF5O1xuXG4gIC8vIGdlbmVyYXRlIGNsYXNzZXNcblxuICBVaW50NjRCRSA9IGZhY3RvcnkoXCJVaW50NjRCRVwiLCB0cnVlLCB0cnVlKTtcbiAgSW50NjRCRSA9IGZhY3RvcnkoXCJJbnQ2NEJFXCIsIHRydWUsIGZhbHNlKTtcbiAgVWludDY0TEUgPSBmYWN0b3J5KFwiVWludDY0TEVcIiwgZmFsc2UsIHRydWUpO1xuICBJbnQ2NExFID0gZmFjdG9yeShcIkludDY0TEVcIiwgZmFsc2UsIGZhbHNlKTtcblxuICAvLyBjbGFzcyBmYWN0b3J5XG5cbiAgZnVuY3Rpb24gZmFjdG9yeShuYW1lLCBiaWdlbmRpYW4sIHVuc2lnbmVkKSB7XG4gICAgdmFyIHBvc0ggPSBiaWdlbmRpYW4gPyAwIDogNDtcbiAgICB2YXIgcG9zTCA9IGJpZ2VuZGlhbiA/IDQgOiAwO1xuICAgIHZhciBwb3MwID0gYmlnZW5kaWFuID8gMCA6IDM7XG4gICAgdmFyIHBvczEgPSBiaWdlbmRpYW4gPyAxIDogMjtcbiAgICB2YXIgcG9zMiA9IGJpZ2VuZGlhbiA/IDIgOiAxO1xuICAgIHZhciBwb3MzID0gYmlnZW5kaWFuID8gMyA6IDA7XG4gICAgdmFyIGZyb21Qb3NpdGl2ZSA9IGJpZ2VuZGlhbiA/IGZyb21Qb3NpdGl2ZUJFIDogZnJvbVBvc2l0aXZlTEU7XG4gICAgdmFyIGZyb21OZWdhdGl2ZSA9IGJpZ2VuZGlhbiA/IGZyb21OZWdhdGl2ZUJFIDogZnJvbU5lZ2F0aXZlTEU7XG4gICAgdmFyIHByb3RvID0gSW50NjQucHJvdG90eXBlO1xuICAgIHZhciBpc05hbWUgPSBcImlzXCIgKyBuYW1lO1xuICAgIHZhciBfaXNJbnQ2NCA9IFwiX1wiICsgaXNOYW1lO1xuXG4gICAgLy8gcHJvcGVydGllc1xuICAgIHByb3RvLmJ1ZmZlciA9IHZvaWQgMDtcbiAgICBwcm90by5vZmZzZXQgPSAwO1xuICAgIHByb3RvW19pc0ludDY0XSA9IHRydWU7XG5cbiAgICAvLyBtZXRob2RzXG4gICAgcHJvdG8udG9OdW1iZXIgPSB0b051bWJlcjtcbiAgICBwcm90by50b1N0cmluZyA9IHRvU3RyaW5nO1xuICAgIHByb3RvLnRvSlNPTiA9IHRvTnVtYmVyO1xuICAgIHByb3RvLnRvQXJyYXkgPSB0b0FycmF5O1xuXG4gICAgLy8gYWRkIC50b0J1ZmZlcigpIG1ldGhvZCBvbmx5IHdoZW4gQnVmZmVyIGF2YWlsYWJsZVxuICAgIGlmIChCVUZGRVIpIHByb3RvLnRvQnVmZmVyID0gdG9CdWZmZXI7XG5cbiAgICAvLyBhZGQgLnRvQXJyYXlCdWZmZXIoKSBtZXRob2Qgb25seSB3aGVuIFVpbnQ4QXJyYXkgYXZhaWxhYmxlXG4gICAgaWYgKFVJTlQ4QVJSQVkpIHByb3RvLnRvQXJyYXlCdWZmZXIgPSB0b0FycmF5QnVmZmVyO1xuXG4gICAgLy8gaXNVaW50NjRCRSwgaXNJbnQ2NEJFXG4gICAgSW50NjRbaXNOYW1lXSA9IGlzSW50NjQ7XG5cbiAgICAvLyBDb21tb25KU1xuICAgIGV4cG9ydHNbbmFtZV0gPSBJbnQ2NDtcblxuICAgIHJldHVybiBJbnQ2NDtcblxuICAgIC8vIGNvbnN0cnVjdG9yXG4gICAgZnVuY3Rpb24gSW50NjQoYnVmZmVyLCBvZmZzZXQsIHZhbHVlLCByYWRkaXgpIHtcbiAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBJbnQ2NCkpIHJldHVybiBuZXcgSW50NjQoYnVmZmVyLCBvZmZzZXQsIHZhbHVlLCByYWRkaXgpO1xuICAgICAgcmV0dXJuIGluaXQodGhpcywgYnVmZmVyLCBvZmZzZXQsIHZhbHVlLCByYWRkaXgpO1xuICAgIH1cblxuICAgIC8vIGlzVWludDY0QkUsIGlzSW50NjRCRVxuICAgIGZ1bmN0aW9uIGlzSW50NjQoYikge1xuICAgICAgcmV0dXJuICEhKGIgJiYgYltfaXNJbnQ2NF0pO1xuICAgIH1cblxuICAgIC8vIGluaXRpYWxpemVyXG4gICAgZnVuY3Rpb24gaW5pdCh0aGF0LCBidWZmZXIsIG9mZnNldCwgdmFsdWUsIHJhZGRpeCkge1xuICAgICAgaWYgKFVJTlQ4QVJSQVkgJiYgQVJSQVlCVUZGRVIpIHtcbiAgICAgICAgaWYgKGJ1ZmZlciBpbnN0YW5jZW9mIEFSUkFZQlVGRkVSKSBidWZmZXIgPSBuZXcgVUlOVDhBUlJBWShidWZmZXIpO1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBUlJBWUJVRkZFUikgdmFsdWUgPSBuZXcgVUlOVDhBUlJBWSh2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEludDY0QkUoKSBzdHlsZVxuICAgICAgaWYgKCFidWZmZXIgJiYgIW9mZnNldCAmJiAhdmFsdWUgJiYgIXN0b3JhZ2UpIHtcbiAgICAgICAgLy8gc2hvcnRjdXQgdG8gaW5pdGlhbGl6ZSB3aXRoIHplcm9cbiAgICAgICAgdGhhdC5idWZmZXIgPSBuZXdBcnJheShaRVJPLCAwKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBJbnQ2NEJFKHZhbHVlLCByYWRkaXgpIHN0eWxlXG4gICAgICBpZiAoIWlzVmFsaWRCdWZmZXIoYnVmZmVyLCBvZmZzZXQpKSB7XG4gICAgICAgIHZhciBfc3RvcmFnZSA9IHN0b3JhZ2UgfHwgQXJyYXk7XG4gICAgICAgIHJhZGRpeCA9IG9mZnNldDtcbiAgICAgICAgdmFsdWUgPSBidWZmZXI7XG4gICAgICAgIG9mZnNldCA9IDA7XG4gICAgICAgIGJ1ZmZlciA9IG5ldyBfc3RvcmFnZSg4KTtcbiAgICAgIH1cblxuICAgICAgdGhhdC5idWZmZXIgPSBidWZmZXI7XG4gICAgICB0aGF0Lm9mZnNldCA9IG9mZnNldCB8PSAwO1xuXG4gICAgICAvLyBJbnQ2NEJFKGJ1ZmZlciwgb2Zmc2V0KSBzdHlsZVxuICAgICAgaWYgKFVOREVGSU5FRCA9PT0gdHlwZW9mIHZhbHVlKSByZXR1cm47XG5cbiAgICAgIC8vIEludDY0QkUoYnVmZmVyLCBvZmZzZXQsIHZhbHVlLCByYWRkaXgpIHN0eWxlXG4gICAgICBpZiAoXCJzdHJpbmdcIiA9PT0gdHlwZW9mIHZhbHVlKSB7XG4gICAgICAgIGZyb21TdHJpbmcoYnVmZmVyLCBvZmZzZXQsIHZhbHVlLCByYWRkaXggfHwgMTApO1xuICAgICAgfSBlbHNlIGlmIChpc1ZhbGlkQnVmZmVyKHZhbHVlLCByYWRkaXgpKSB7XG4gICAgICAgIGZyb21BcnJheShidWZmZXIsIG9mZnNldCwgdmFsdWUsIHJhZGRpeCk7XG4gICAgICB9IGVsc2UgaWYgKFwibnVtYmVyXCIgPT09IHR5cGVvZiByYWRkaXgpIHtcbiAgICAgICAgd3JpdGVJbnQzMihidWZmZXIsIG9mZnNldCArIHBvc0gsIHZhbHVlKTsgLy8gaGlnaFxuICAgICAgICB3cml0ZUludDMyKGJ1ZmZlciwgb2Zmc2V0ICsgcG9zTCwgcmFkZGl4KTsgLy8gbG93XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlID4gMCkge1xuICAgICAgICBmcm9tUG9zaXRpdmUoYnVmZmVyLCBvZmZzZXQsIHZhbHVlKTsgLy8gcG9zaXRpdmVcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgPCAwKSB7XG4gICAgICAgIGZyb21OZWdhdGl2ZShidWZmZXIsIG9mZnNldCwgdmFsdWUpOyAvLyBuZWdhdGl2ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnJvbUFycmF5KGJ1ZmZlciwgb2Zmc2V0LCBaRVJPLCAwKTsgLy8gemVybywgTmFOIGFuZCBvdGhlcnNcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmcm9tU3RyaW5nKGJ1ZmZlciwgb2Zmc2V0LCBzdHIsIHJhZGRpeCkge1xuICAgICAgdmFyIHBvcyA9IDA7XG4gICAgICB2YXIgbGVuID0gc3RyLmxlbmd0aDtcbiAgICAgIHZhciBoaWdoID0gMDtcbiAgICAgIHZhciBsb3cgPSAwO1xuICAgICAgaWYgKHN0clswXSA9PT0gXCItXCIpIHBvcysrO1xuICAgICAgdmFyIHNpZ24gPSBwb3M7XG4gICAgICB3aGlsZSAocG9zIDwgbGVuKSB7XG4gICAgICAgIHZhciBjaHIgPSBwYXJzZUludChzdHJbcG9zKytdLCByYWRkaXgpO1xuICAgICAgICBpZiAoIShjaHIgPj0gMCkpIGJyZWFrOyAvLyBOYU5cbiAgICAgICAgbG93ID0gbG93ICogcmFkZGl4ICsgY2hyO1xuICAgICAgICBoaWdoID0gaGlnaCAqIHJhZGRpeCArIE1hdGguZmxvb3IobG93IC8gQklUMzIpO1xuICAgICAgICBsb3cgJT0gQklUMzI7XG4gICAgICB9XG4gICAgICBpZiAoc2lnbikge1xuICAgICAgICBoaWdoID0gfmhpZ2g7XG4gICAgICAgIGlmIChsb3cpIHtcbiAgICAgICAgICBsb3cgPSBCSVQzMiAtIGxvdztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoaWdoKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHdyaXRlSW50MzIoYnVmZmVyLCBvZmZzZXQgKyBwb3NILCBoaWdoKTtcbiAgICAgIHdyaXRlSW50MzIoYnVmZmVyLCBvZmZzZXQgKyBwb3NMLCBsb3cpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvTnVtYmVyKCkge1xuICAgICAgdmFyIGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgICAgdmFyIG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgICAgdmFyIGhpZ2ggPSByZWFkSW50MzIoYnVmZmVyLCBvZmZzZXQgKyBwb3NIKTtcbiAgICAgIHZhciBsb3cgPSByZWFkSW50MzIoYnVmZmVyLCBvZmZzZXQgKyBwb3NMKTtcbiAgICAgIGlmICghdW5zaWduZWQpIGhpZ2ggfD0gMDsgLy8gYSB0cmljayB0byBnZXQgc2lnbmVkXG4gICAgICByZXR1cm4gaGlnaCA/IChoaWdoICogQklUMzIgKyBsb3cpIDogbG93O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvU3RyaW5nKHJhZGl4KSB7XG4gICAgICB2YXIgYnVmZmVyID0gdGhpcy5idWZmZXI7XG4gICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICB2YXIgaGlnaCA9IHJlYWRJbnQzMihidWZmZXIsIG9mZnNldCArIHBvc0gpO1xuICAgICAgdmFyIGxvdyA9IHJlYWRJbnQzMihidWZmZXIsIG9mZnNldCArIHBvc0wpO1xuICAgICAgdmFyIHN0ciA9IFwiXCI7XG4gICAgICB2YXIgc2lnbiA9ICF1bnNpZ25lZCAmJiAoaGlnaCAmIDB4ODAwMDAwMDApO1xuICAgICAgaWYgKHNpZ24pIHtcbiAgICAgICAgaGlnaCA9IH5oaWdoO1xuICAgICAgICBsb3cgPSBCSVQzMiAtIGxvdztcbiAgICAgIH1cbiAgICAgIHJhZGl4ID0gcmFkaXggfHwgMTA7XG4gICAgICB3aGlsZSAoMSkge1xuICAgICAgICB2YXIgbW9kID0gKGhpZ2ggJSByYWRpeCkgKiBCSVQzMiArIGxvdztcbiAgICAgICAgaGlnaCA9IE1hdGguZmxvb3IoaGlnaCAvIHJhZGl4KTtcbiAgICAgICAgbG93ID0gTWF0aC5mbG9vcihtb2QgLyByYWRpeCk7XG4gICAgICAgIHN0ciA9IChtb2QgJSByYWRpeCkudG9TdHJpbmcocmFkaXgpICsgc3RyO1xuICAgICAgICBpZiAoIWhpZ2ggJiYgIWxvdykgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoc2lnbikge1xuICAgICAgICBzdHIgPSBcIi1cIiArIHN0cjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd3JpdGVJbnQzMihidWZmZXIsIG9mZnNldCwgdmFsdWUpIHtcbiAgICAgIGJ1ZmZlcltvZmZzZXQgKyBwb3MzXSA9IHZhbHVlICYgMjU1O1xuICAgICAgdmFsdWUgPSB2YWx1ZSA+PiA4O1xuICAgICAgYnVmZmVyW29mZnNldCArIHBvczJdID0gdmFsdWUgJiAyNTU7XG4gICAgICB2YWx1ZSA9IHZhbHVlID4+IDg7XG4gICAgICBidWZmZXJbb2Zmc2V0ICsgcG9zMV0gPSB2YWx1ZSAmIDI1NTtcbiAgICAgIHZhbHVlID0gdmFsdWUgPj4gODtcbiAgICAgIGJ1ZmZlcltvZmZzZXQgKyBwb3MwXSA9IHZhbHVlICYgMjU1O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlYWRJbnQzMihidWZmZXIsIG9mZnNldCkge1xuICAgICAgcmV0dXJuIChidWZmZXJbb2Zmc2V0ICsgcG9zMF0gKiBCSVQyNCkgK1xuICAgICAgICAoYnVmZmVyW29mZnNldCArIHBvczFdIDw8IDE2KSArXG4gICAgICAgIChidWZmZXJbb2Zmc2V0ICsgcG9zMl0gPDwgOCkgK1xuICAgICAgICBidWZmZXJbb2Zmc2V0ICsgcG9zM107XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdG9BcnJheShyYXcpIHtcbiAgICB2YXIgYnVmZmVyID0gdGhpcy5idWZmZXI7XG4gICAgdmFyIG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgIHN0b3JhZ2UgPSBudWxsOyAvLyBBcnJheVxuICAgIGlmIChyYXcgIT09IGZhbHNlICYmIG9mZnNldCA9PT0gMCAmJiBidWZmZXIubGVuZ3RoID09PSA4ICYmIGlzQXJyYXkoYnVmZmVyKSkgcmV0dXJuIGJ1ZmZlcjtcbiAgICByZXR1cm4gbmV3QXJyYXkoYnVmZmVyLCBvZmZzZXQpO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9CdWZmZXIocmF3KSB7XG4gICAgdmFyIGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgIHZhciBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICBzdG9yYWdlID0gQlVGRkVSO1xuICAgIGlmIChyYXcgIT09IGZhbHNlICYmIG9mZnNldCA9PT0gMCAmJiBidWZmZXIubGVuZ3RoID09PSA4ICYmIEJ1ZmZlci5pc0J1ZmZlcihidWZmZXIpKSByZXR1cm4gYnVmZmVyO1xuICAgIHZhciBkZXN0ID0gbmV3IEJVRkZFUig4KTtcbiAgICBmcm9tQXJyYXkoZGVzdCwgMCwgYnVmZmVyLCBvZmZzZXQpO1xuICAgIHJldHVybiBkZXN0O1xuICB9XG5cbiAgZnVuY3Rpb24gdG9BcnJheUJ1ZmZlcihyYXcpIHtcbiAgICB2YXIgYnVmZmVyID0gdGhpcy5idWZmZXI7XG4gICAgdmFyIG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgIHZhciBhcnJidWYgPSBidWZmZXIuYnVmZmVyO1xuICAgIHN0b3JhZ2UgPSBVSU5UOEFSUkFZO1xuICAgIGlmIChyYXcgIT09IGZhbHNlICYmIG9mZnNldCA9PT0gMCAmJiAoYXJyYnVmIGluc3RhbmNlb2YgQVJSQVlCVUZGRVIpICYmIGFycmJ1Zi5ieXRlTGVuZ3RoID09PSA4KSByZXR1cm4gYXJyYnVmO1xuICAgIHZhciBkZXN0ID0gbmV3IFVJTlQ4QVJSQVkoOCk7XG4gICAgZnJvbUFycmF5KGRlc3QsIDAsIGJ1ZmZlciwgb2Zmc2V0KTtcbiAgICByZXR1cm4gZGVzdC5idWZmZXI7XG4gIH1cblxuICBmdW5jdGlvbiBpc1ZhbGlkQnVmZmVyKGJ1ZmZlciwgb2Zmc2V0KSB7XG4gICAgdmFyIGxlbiA9IGJ1ZmZlciAmJiBidWZmZXIubGVuZ3RoO1xuICAgIG9mZnNldCB8PSAwO1xuICAgIHJldHVybiBsZW4gJiYgKG9mZnNldCArIDggPD0gbGVuKSAmJiAoXCJzdHJpbmdcIiAhPT0gdHlwZW9mIGJ1ZmZlcltvZmZzZXRdKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZyb21BcnJheShkZXN0YnVmLCBkZXN0b2ZmLCBzcmNidWYsIHNyY29mZikge1xuICAgIGRlc3RvZmYgfD0gMDtcbiAgICBzcmNvZmYgfD0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgZGVzdGJ1ZltkZXN0b2ZmKytdID0gc3JjYnVmW3NyY29mZisrXSAmIDI1NTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBuZXdBcnJheShidWZmZXIsIG9mZnNldCkge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChidWZmZXIsIG9mZnNldCwgb2Zmc2V0ICsgOCk7XG4gIH1cblxuICBmdW5jdGlvbiBmcm9tUG9zaXRpdmVCRShidWZmZXIsIG9mZnNldCwgdmFsdWUpIHtcbiAgICB2YXIgcG9zID0gb2Zmc2V0ICsgODtcbiAgICB3aGlsZSAocG9zID4gb2Zmc2V0KSB7XG4gICAgICBidWZmZXJbLS1wb3NdID0gdmFsdWUgJiAyNTU7XG4gICAgICB2YWx1ZSAvPSAyNTY7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZnJvbU5lZ2F0aXZlQkUoYnVmZmVyLCBvZmZzZXQsIHZhbHVlKSB7XG4gICAgdmFyIHBvcyA9IG9mZnNldCArIDg7XG4gICAgdmFsdWUrKztcbiAgICB3aGlsZSAocG9zID4gb2Zmc2V0KSB7XG4gICAgICBidWZmZXJbLS1wb3NdID0gKCgtdmFsdWUpICYgMjU1KSBeIDI1NTtcbiAgICAgIHZhbHVlIC89IDI1NjtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBmcm9tUG9zaXRpdmVMRShidWZmZXIsIG9mZnNldCwgdmFsdWUpIHtcbiAgICB2YXIgZW5kID0gb2Zmc2V0ICsgODtcbiAgICB3aGlsZSAob2Zmc2V0IDwgZW5kKSB7XG4gICAgICBidWZmZXJbb2Zmc2V0KytdID0gdmFsdWUgJiAyNTU7XG4gICAgICB2YWx1ZSAvPSAyNTY7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZnJvbU5lZ2F0aXZlTEUoYnVmZmVyLCBvZmZzZXQsIHZhbHVlKSB7XG4gICAgdmFyIGVuZCA9IG9mZnNldCArIDg7XG4gICAgdmFsdWUrKztcbiAgICB3aGlsZSAob2Zmc2V0IDwgZW5kKSB7XG4gICAgICBidWZmZXJbb2Zmc2V0KytdID0gKCgtdmFsdWUpICYgMjU1KSBeIDI1NTtcbiAgICAgIHZhbHVlIC89IDI1NjtcbiAgICB9XG4gIH1cblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vcmV0cm9mb3gvaXMtYXJyYXlcbiAgZnVuY3Rpb24gX2lzQXJyYXkodmFsKSB7XG4gICAgcmV0dXJuICEhdmFsICYmIFwiW29iamVjdCBBcnJheV1cIiA9PSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKTtcbiAgfVxuXG59KHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgZXhwb3J0cy5ub2RlTmFtZSAhPT0gJ3N0cmluZycgPyBleHBvcnRzIDogKHRoaXMgfHwge30pKTtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuIiwiLy8gYnJvd3Nlci5qc1xuXG5leHBvcnRzLmVuY29kZSA9IHJlcXVpcmUoXCIuL2VuY29kZVwiKS5lbmNvZGU7XG5leHBvcnRzLmRlY29kZSA9IHJlcXVpcmUoXCIuL2RlY29kZVwiKS5kZWNvZGU7XG5cbmV4cG9ydHMuRW5jb2RlciA9IHJlcXVpcmUoXCIuL2VuY29kZXJcIikuRW5jb2RlcjtcbmV4cG9ydHMuRGVjb2RlciA9IHJlcXVpcmUoXCIuL2RlY29kZXJcIikuRGVjb2RlcjtcblxuZXhwb3J0cy5jcmVhdGVDb2RlYyA9IHJlcXVpcmUoXCIuL2V4dFwiKS5jcmVhdGVDb2RlYztcbmV4cG9ydHMuY29kZWMgPSByZXF1aXJlKFwiLi9jb2RlY1wiKS5jb2RlYztcbiIsIi8qIGdsb2JhbHMgQnVmZmVyICovXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgYygoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIEJ1ZmZlcikgJiYgQnVmZmVyKSB8fFxuICBjKHRoaXMuQnVmZmVyKSB8fFxuICBjKChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2Ygd2luZG93KSAmJiB3aW5kb3cuQnVmZmVyKSB8fFxuICB0aGlzLkJ1ZmZlcjtcblxuZnVuY3Rpb24gYyhCKSB7XG4gIHJldHVybiBCICYmIEIuaXNCdWZmZXIgJiYgQjtcbn0iLCIvLyBidWZmZXItbGl0ZS5qc1xuXG52YXIgTUFYQlVGTEVOID0gODE5MjtcblxuZXhwb3J0cy5jb3B5ID0gY29weTtcbmV4cG9ydHMudG9TdHJpbmcgPSB0b1N0cmluZztcbmV4cG9ydHMud3JpdGUgPSB3cml0ZTtcblxuLyoqXG4gKiBCdWZmZXIucHJvdG90eXBlLndyaXRlKClcbiAqXG4gKiBAcGFyYW0gc3RyaW5nIHtTdHJpbmd9XG4gKiBAcGFyYW0gW29mZnNldF0ge051bWJlcn1cbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKi9cblxuZnVuY3Rpb24gd3JpdGUoc3RyaW5nLCBvZmZzZXQpIHtcbiAgdmFyIGJ1ZmZlciA9IHRoaXM7XG4gIHZhciBpbmRleCA9IG9mZnNldCB8fCAob2Zmc2V0IHw9IDApO1xuICB2YXIgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aDtcbiAgdmFyIGNociA9IDA7XG4gIHZhciBpID0gMDtcbiAgd2hpbGUgKGkgPCBsZW5ndGgpIHtcbiAgICBjaHIgPSBzdHJpbmcuY2hhckNvZGVBdChpKyspO1xuXG4gICAgaWYgKGNociA8IDEyOCkge1xuICAgICAgYnVmZmVyW2luZGV4KytdID0gY2hyO1xuICAgIH0gZWxzZSBpZiAoY2hyIDwgMHg4MDApIHtcbiAgICAgIC8vIDIgYnl0ZXNcbiAgICAgIGJ1ZmZlcltpbmRleCsrXSA9IDB4QzAgfCAoY2hyID4+PiA2KTtcbiAgICAgIGJ1ZmZlcltpbmRleCsrXSA9IDB4ODAgfCAoY2hyICYgMHgzRik7XG4gICAgfSBlbHNlIGlmIChjaHIgPCAweEQ4MDAgfHwgY2hyID4gMHhERkZGKSB7XG4gICAgICAvLyAzIGJ5dGVzXG4gICAgICBidWZmZXJbaW5kZXgrK10gPSAweEUwIHwgKGNociAgPj4+IDEyKTtcbiAgICAgIGJ1ZmZlcltpbmRleCsrXSA9IDB4ODAgfCAoKGNociA+Pj4gNikgICYgMHgzRik7XG4gICAgICBidWZmZXJbaW5kZXgrK10gPSAweDgwIHwgKGNociAgICAgICAgICAmIDB4M0YpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyA0IGJ5dGVzIC0gc3Vycm9nYXRlIHBhaXJcbiAgICAgIGNociA9ICgoKGNociAtIDB4RDgwMCkgPDwgMTApIHwgKHN0cmluZy5jaGFyQ29kZUF0KGkrKykgLSAweERDMDApKSArIDB4MTAwMDA7XG4gICAgICBidWZmZXJbaW5kZXgrK10gPSAweEYwIHwgKGNociA+Pj4gMTgpO1xuICAgICAgYnVmZmVyW2luZGV4KytdID0gMHg4MCB8ICgoY2hyID4+PiAxMikgJiAweDNGKTtcbiAgICAgIGJ1ZmZlcltpbmRleCsrXSA9IDB4ODAgfCAoKGNociA+Pj4gNikgICYgMHgzRik7XG4gICAgICBidWZmZXJbaW5kZXgrK10gPSAweDgwIHwgKGNociAgICAgICAgICAmIDB4M0YpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaW5kZXggLSBvZmZzZXQ7XG59XG5cbi8qKlxuICogQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZygpXG4gKlxuICogQHBhcmFtIFtlbmNvZGluZ10ge1N0cmluZ30gaWdub3JlZFxuICogQHBhcmFtIFtzdGFydF0ge051bWJlcn1cbiAqIEBwYXJhbSBbZW5kXSB7TnVtYmVyfVxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuXG5mdW5jdGlvbiB0b1N0cmluZyhlbmNvZGluZywgc3RhcnQsIGVuZCkge1xuICB2YXIgYnVmZmVyID0gdGhpcztcbiAgdmFyIGluZGV4ID0gc3RhcnR8MDtcbiAgaWYgKCFlbmQpIGVuZCA9IGJ1ZmZlci5sZW5ndGg7XG4gIHZhciBzdHJpbmcgPSAnJztcbiAgdmFyIGNociA9IDA7XG5cbiAgd2hpbGUgKGluZGV4IDwgZW5kKSB7XG4gICAgY2hyID0gYnVmZmVyW2luZGV4KytdO1xuICAgIGlmIChjaHIgPCAxMjgpIHtcbiAgICAgIHN0cmluZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNocik7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoKGNociAmIDB4RTApID09PSAweEMwKSB7XG4gICAgICAvLyAyIGJ5dGVzXG4gICAgICBjaHIgPSAoY2hyICYgMHgxRikgPDwgNiB8XG4gICAgICAgICAgICAoYnVmZmVyW2luZGV4KytdICYgMHgzRik7XG5cbiAgICB9IGVsc2UgaWYgKChjaHIgJiAweEYwKSA9PT0gMHhFMCkge1xuICAgICAgLy8gMyBieXRlc1xuICAgICAgY2hyID0gKGNociAmIDB4MEYpICAgICAgICAgICAgIDw8IDEyIHxcbiAgICAgICAgICAgIChidWZmZXJbaW5kZXgrK10gJiAweDNGKSA8PCA2ICB8XG4gICAgICAgICAgICAoYnVmZmVyW2luZGV4KytdICYgMHgzRik7XG5cbiAgICB9IGVsc2UgaWYgKChjaHIgJiAweEY4KSA9PT0gMHhGMCkge1xuICAgICAgLy8gNCBieXRlc1xuICAgICAgY2hyID0gKGNociAmIDB4MDcpICAgICAgICAgICAgIDw8IDE4IHxcbiAgICAgICAgICAgIChidWZmZXJbaW5kZXgrK10gJiAweDNGKSA8PCAxMiB8XG4gICAgICAgICAgICAoYnVmZmVyW2luZGV4KytdICYgMHgzRikgPDwgNiAgfFxuICAgICAgICAgICAgKGJ1ZmZlcltpbmRleCsrXSAmIDB4M0YpO1xuICAgIH1cblxuICAgIGlmIChjaHIgPj0gMHgwMTAwMDApIHtcbiAgICAgIC8vIEEgc3Vycm9nYXRlIHBhaXJcbiAgICAgIGNociAtPSAweDAxMDAwMDtcblxuICAgICAgc3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGNociA+Pj4gMTApICsgMHhEODAwLCAoY2hyICYgMHgzRkYpICsgMHhEQzAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY2hyKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3RyaW5nO1xufVxuXG4vKipcbiAqIEJ1ZmZlci5wcm90b3R5cGUuY29weSgpXG4gKlxuICogQHBhcmFtIHRhcmdldCB7QnVmZmVyfVxuICogQHBhcmFtIFt0YXJnZXRTdGFydF0ge051bWJlcn1cbiAqIEBwYXJhbSBbc3RhcnRdIHtOdW1iZXJ9XG4gKiBAcGFyYW0gW2VuZF0ge051bWJlcn1cbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cblxuZnVuY3Rpb24gY29weSh0YXJnZXQsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIHZhciBpO1xuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDA7XG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGg7XG4gIGlmICghdGFyZ2V0U3RhcnQpIHRhcmdldFN0YXJ0ID0gMDtcbiAgdmFyIGxlbiA9IGVuZCAtIHN0YXJ0O1xuXG4gIGlmICh0YXJnZXQgPT09IHRoaXMgJiYgc3RhcnQgPCB0YXJnZXRTdGFydCAmJiB0YXJnZXRTdGFydCA8IGVuZCkge1xuICAgIC8vIGRlc2NlbmRpbmdcbiAgICBmb3IgKGkgPSBsZW4gLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF07XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIGFzY2VuZGluZ1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGxlbjtcbn1cbiIsIi8vIGJ1ZmZlcmlzaC1hcnJheS5qc1xuXG52YXIgQnVmZmVyaXNoID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoXCIpO1xuXG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gYWxsb2MoMCk7XG5cbmV4cG9ydHMuYWxsb2MgPSBhbGxvYztcbmV4cG9ydHMuY29uY2F0ID0gQnVmZmVyaXNoLmNvbmNhdDtcbmV4cG9ydHMuZnJvbSA9IGZyb207XG5cbi8qKlxuICogQHBhcmFtIHNpemUge051bWJlcn1cbiAqIEByZXR1cm5zIHtCdWZmZXJ8VWludDhBcnJheXxBcnJheX1cbiAqL1xuXG5mdW5jdGlvbiBhbGxvYyhzaXplKSB7XG4gIHJldHVybiBuZXcgQXJyYXkoc2l6ZSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHZhbHVlIHtBcnJheXxBcnJheUJ1ZmZlcnxCdWZmZXJ8U3RyaW5nfVxuICogQHJldHVybnMge0FycmF5fVxuICovXG5cbmZ1bmN0aW9uIGZyb20odmFsdWUpIHtcbiAgaWYgKCFCdWZmZXJpc2guaXNCdWZmZXIodmFsdWUpICYmIEJ1ZmZlcmlzaC5pc1ZpZXcodmFsdWUpKSB7XG4gICAgLy8gVHlwZWRBcnJheSB0byBVaW50OEFycmF5XG4gICAgdmFsdWUgPSBCdWZmZXJpc2guVWludDhBcnJheS5mcm9tKHZhbHVlKTtcbiAgfSBlbHNlIGlmIChCdWZmZXJpc2guaXNBcnJheUJ1ZmZlcih2YWx1ZSkpIHtcbiAgICAvLyBBcnJheUJ1ZmZlciB0byBVaW50OEFycmF5XG4gICAgdmFsdWUgPSBuZXcgVWludDhBcnJheSh2YWx1ZSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgLy8gU3RyaW5nIHRvIEFycmF5XG4gICAgcmV0dXJuIEJ1ZmZlcmlzaC5mcm9tLmNhbGwoZXhwb3J0cywgdmFsdWUpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBhIG51bWJlcicpO1xuICB9XG5cbiAgLy8gQXJyYXktbGlrZSB0byBBcnJheVxuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodmFsdWUpO1xufVxuIiwiLy8gYnVmZmVyaXNoLWJ1ZmZlci5qc1xuXG52YXIgQnVmZmVyaXNoID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoXCIpO1xudmFyIEJ1ZmZlciA9IEJ1ZmZlcmlzaC5nbG9iYWw7XG5cbnZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBCdWZmZXJpc2guaGFzQnVmZmVyID8gYWxsb2MoMCkgOiBbXTtcblxuZXhwb3J0cy5hbGxvYyA9IEJ1ZmZlcmlzaC5oYXNCdWZmZXIgJiYgQnVmZmVyLmFsbG9jIHx8IGFsbG9jO1xuZXhwb3J0cy5jb25jYXQgPSBCdWZmZXJpc2guY29uY2F0O1xuZXhwb3J0cy5mcm9tID0gZnJvbTtcblxuLyoqXG4gKiBAcGFyYW0gc2l6ZSB7TnVtYmVyfVxuICogQHJldHVybnMge0J1ZmZlcnxVaW50OEFycmF5fEFycmF5fVxuICovXG5cbmZ1bmN0aW9uIGFsbG9jKHNpemUpIHtcbiAgcmV0dXJuIG5ldyBCdWZmZXIoc2l6ZSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHZhbHVlIHtBcnJheXxBcnJheUJ1ZmZlcnxCdWZmZXJ8U3RyaW5nfVxuICogQHJldHVybnMge0J1ZmZlcn1cbiAqL1xuXG5mdW5jdGlvbiBmcm9tKHZhbHVlKSB7XG4gIGlmICghQnVmZmVyaXNoLmlzQnVmZmVyKHZhbHVlKSAmJiBCdWZmZXJpc2guaXNWaWV3KHZhbHVlKSkge1xuICAgIC8vIFR5cGVkQXJyYXkgdG8gVWludDhBcnJheVxuICAgIHZhbHVlID0gQnVmZmVyaXNoLlVpbnQ4QXJyYXkuZnJvbSh2YWx1ZSk7XG4gIH0gZWxzZSBpZiAoQnVmZmVyaXNoLmlzQXJyYXlCdWZmZXIodmFsdWUpKSB7XG4gICAgLy8gQXJyYXlCdWZmZXIgdG8gVWludDhBcnJheVxuICAgIHZhbHVlID0gbmV3IFVpbnQ4QXJyYXkodmFsdWUpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIC8vIFN0cmluZyB0byBCdWZmZXJcbiAgICByZXR1cm4gQnVmZmVyaXNoLmZyb20uY2FsbChleHBvcnRzLCB2YWx1ZSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIGEgbnVtYmVyJyk7XG4gIH1cblxuICAvLyBBcnJheS1saWtlIHRvIEJ1ZmZlclxuICBpZiAoQnVmZmVyLmZyb20gJiYgQnVmZmVyLmZyb20ubGVuZ3RoICE9PSAxKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHZhbHVlKTsgLy8gbm9kZSB2NitcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcih2YWx1ZSk7IC8vIG5vZGUgdjRcbiAgfVxufVxuIiwiLy8gYnVmZmVyaXNoLXByb3RvLmpzXG5cbi8qIGpzaGludCBlcW51bGw6dHJ1ZSAqL1xuXG52YXIgQnVmZmVyTGl0ZSA9IHJlcXVpcmUoXCIuL2J1ZmZlci1saXRlXCIpO1xuXG5leHBvcnRzLmNvcHkgPSBjb3B5O1xuZXhwb3J0cy5zbGljZSA9IHNsaWNlO1xuZXhwb3J0cy50b1N0cmluZyA9IHRvU3RyaW5nO1xuZXhwb3J0cy53cml0ZSA9IGdlbihcIndyaXRlXCIpO1xuXG52YXIgQnVmZmVyaXNoID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoXCIpO1xudmFyIEJ1ZmZlciA9IEJ1ZmZlcmlzaC5nbG9iYWw7XG5cbnZhciBpc0J1ZmZlclNoaW0gPSBCdWZmZXJpc2guaGFzQnVmZmVyICYmIChcIlRZUEVEX0FSUkFZX1NVUFBPUlRcIiBpbiBCdWZmZXIpO1xudmFyIGJyb2tlblR5cGVkQXJyYXkgPSBpc0J1ZmZlclNoaW0gJiYgIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUO1xuXG4vKipcbiAqIEBwYXJhbSB0YXJnZXQge0J1ZmZlcnxVaW50OEFycmF5fEFycmF5fVxuICogQHBhcmFtIFt0YXJnZXRTdGFydF0ge051bWJlcn1cbiAqIEBwYXJhbSBbc3RhcnRdIHtOdW1iZXJ9XG4gKiBAcGFyYW0gW2VuZF0ge051bWJlcn1cbiAqIEByZXR1cm5zIHtCdWZmZXJ8VWludDhBcnJheXxBcnJheX1cbiAqL1xuXG5mdW5jdGlvbiBjb3B5KHRhcmdldCwgdGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHRoaXNJc0J1ZmZlciA9IEJ1ZmZlcmlzaC5pc0J1ZmZlcih0aGlzKTtcbiAgdmFyIHRhcmdldElzQnVmZmVyID0gQnVmZmVyaXNoLmlzQnVmZmVyKHRhcmdldCk7XG4gIGlmICh0aGlzSXNCdWZmZXIgJiYgdGFyZ2V0SXNCdWZmZXIpIHtcbiAgICAvLyBCdWZmZXIgdG8gQnVmZmVyXG4gICAgcmV0dXJuIHRoaXMuY29weSh0YXJnZXQsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKTtcbiAgfSBlbHNlIGlmICghYnJva2VuVHlwZWRBcnJheSAmJiAhdGhpc0lzQnVmZmVyICYmICF0YXJnZXRJc0J1ZmZlciAmJlxuICAgIEJ1ZmZlcmlzaC5pc1ZpZXcodGhpcykgJiYgQnVmZmVyaXNoLmlzVmlldyh0YXJnZXQpKSB7XG4gICAgLy8gVWludDhBcnJheSB0byBVaW50OEFycmF5IChleGNlcHQgZm9yIG1pbm9yIHNvbWUgYnJvd3NlcnMpXG4gICAgdmFyIGJ1ZmZlciA9IChzdGFydCB8fCBlbmQgIT0gbnVsbCkgPyBzbGljZS5jYWxsKHRoaXMsIHN0YXJ0LCBlbmQpIDogdGhpcztcbiAgICB0YXJnZXQuc2V0KGJ1ZmZlciwgdGFyZ2V0U3RhcnQpO1xuICAgIHJldHVybiBidWZmZXIubGVuZ3RoO1xuICB9IGVsc2Uge1xuICAgIC8vIG90aGVyIGNhc2VzXG4gICAgcmV0dXJuIEJ1ZmZlckxpdGUuY29weS5jYWxsKHRoaXMsIHRhcmdldCwgdGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpO1xuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIFtzdGFydF0ge051bWJlcn1cbiAqIEBwYXJhbSBbZW5kXSB7TnVtYmVyfVxuICogQHJldHVybnMge0J1ZmZlcnxVaW50OEFycmF5fEFycmF5fVxuICovXG5cbmZ1bmN0aW9uIHNsaWNlKHN0YXJ0LCBlbmQpIHtcbiAgLy8gZm9yIEJ1ZmZlciwgVWludDhBcnJheSAoZXhjZXB0IGZvciBtaW5vciBzb21lIGJyb3dzZXJzKSBhbmQgQXJyYXlcbiAgdmFyIGYgPSB0aGlzLnNsaWNlIHx8ICghYnJva2VuVHlwZWRBcnJheSAmJiB0aGlzLnN1YmFycmF5KTtcbiAgaWYgKGYpIHJldHVybiBmLmNhbGwodGhpcywgc3RhcnQsIGVuZCk7XG5cbiAgLy8gVWludDhBcnJheSAoZm9yIG1pbm9yIHNvbWUgYnJvd3NlcnMpXG4gIHZhciB0YXJnZXQgPSBCdWZmZXJpc2guYWxsb2MuY2FsbCh0aGlzLCBlbmQgLSBzdGFydCk7XG4gIGNvcHkuY2FsbCh0aGlzLCB0YXJnZXQsIDAsIHN0YXJ0LCBlbmQpO1xuICByZXR1cm4gdGFyZ2V0O1xufVxuXG4vKipcbiAqIEJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcoKVxuICpcbiAqIEBwYXJhbSBbZW5jb2RpbmddIHtTdHJpbmd9IGlnbm9yZWRcbiAqIEBwYXJhbSBbc3RhcnRdIHtOdW1iZXJ9XG4gKiBAcGFyYW0gW2VuZF0ge051bWJlcn1cbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cblxuZnVuY3Rpb24gdG9TdHJpbmcoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGYgPSAoIWlzQnVmZmVyU2hpbSAmJiBCdWZmZXJpc2guaXNCdWZmZXIodGhpcykpID8gdGhpcy50b1N0cmluZyA6IEJ1ZmZlckxpdGUudG9TdHJpbmc7XG4gIHJldHVybiBmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBnZW4obWV0aG9kKSB7XG4gIHJldHVybiB3cmFwO1xuXG4gIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGYgPSB0aGlzW21ldGhvZF0gfHwgQnVmZmVyTGl0ZVttZXRob2RdO1xuICAgIHJldHVybiBmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cbn1cbiIsIi8vIGJ1ZmZlcmlzaC11aW50OGFycmF5LmpzXG5cbnZhciBCdWZmZXJpc2ggPSByZXF1aXJlKFwiLi9idWZmZXJpc2hcIik7XG5cbnZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBCdWZmZXJpc2guaGFzQXJyYXlCdWZmZXIgPyBhbGxvYygwKSA6IFtdO1xuXG5leHBvcnRzLmFsbG9jID0gYWxsb2M7XG5leHBvcnRzLmNvbmNhdCA9IEJ1ZmZlcmlzaC5jb25jYXQ7XG5leHBvcnRzLmZyb20gPSBmcm9tO1xuXG4vKipcbiAqIEBwYXJhbSBzaXplIHtOdW1iZXJ9XG4gKiBAcmV0dXJucyB7QnVmZmVyfFVpbnQ4QXJyYXl8QXJyYXl9XG4gKi9cblxuZnVuY3Rpb24gYWxsb2Moc2l6ZSkge1xuICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoc2l6ZSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHZhbHVlIHtBcnJheXxBcnJheUJ1ZmZlcnxCdWZmZXJ8U3RyaW5nfVxuICogQHJldHVybnMge1VpbnQ4QXJyYXl9XG4gKi9cblxuZnVuY3Rpb24gZnJvbSh2YWx1ZSkge1xuICBpZiAoQnVmZmVyaXNoLmlzVmlldyh2YWx1ZSkpIHtcbiAgICAvLyBUeXBlZEFycmF5IHRvIEFycmF5QnVmZmVyXG4gICAgdmFyIGJ5dGVPZmZzZXQgPSB2YWx1ZS5ieXRlT2Zmc2V0O1xuICAgIHZhciBieXRlTGVuZ3RoID0gdmFsdWUuYnl0ZUxlbmd0aDtcbiAgICB2YWx1ZSA9IHZhbHVlLmJ1ZmZlcjtcbiAgICBpZiAodmFsdWUuYnl0ZUxlbmd0aCAhPT0gYnl0ZUxlbmd0aCkge1xuICAgICAgaWYgKHZhbHVlLnNsaWNlKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoYnl0ZU9mZnNldCwgYnl0ZU9mZnNldCArIGJ5dGVMZW5ndGgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQW5kcm9pZCA0LjEgZG9lcyBub3QgaGF2ZSBBcnJheUJ1ZmZlci5wcm90b3R5cGUuc2xpY2VcbiAgICAgICAgdmFsdWUgPSBuZXcgVWludDhBcnJheSh2YWx1ZSk7XG4gICAgICAgIGlmICh2YWx1ZS5ieXRlTGVuZ3RoICE9PSBieXRlTGVuZ3RoKSB7XG4gICAgICAgICAgLy8gVHlwZWRBcnJheSB0byBBcnJheUJ1ZmZlciB0byBVaW50OEFycmF5IHRvIEFycmF5XG4gICAgICAgICAgdmFsdWUgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh2YWx1ZSwgYnl0ZU9mZnNldCwgYnl0ZU9mZnNldCArIGJ5dGVMZW5ndGgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIC8vIFN0cmluZyB0byBVaW50OEFycmF5XG4gICAgcmV0dXJuIEJ1ZmZlcmlzaC5mcm9tLmNhbGwoZXhwb3J0cywgdmFsdWUpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBhIG51bWJlcicpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHZhbHVlKTtcbn1cbiIsIi8vIGJ1ZmZlcmlzaC5qc1xuXG52YXIgQnVmZmVyID0gZXhwb3J0cy5nbG9iYWwgPSByZXF1aXJlKFwiLi9idWZmZXItZ2xvYmFsXCIpO1xudmFyIGhhc0J1ZmZlciA9IGV4cG9ydHMuaGFzQnVmZmVyID0gQnVmZmVyICYmICEhQnVmZmVyLmlzQnVmZmVyO1xudmFyIGhhc0FycmF5QnVmZmVyID0gZXhwb3J0cy5oYXNBcnJheUJ1ZmZlciA9IChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgQXJyYXlCdWZmZXIpO1xuXG52YXIgaXNBcnJheSA9IGV4cG9ydHMuaXNBcnJheSA9IHJlcXVpcmUoXCJpc2FycmF5XCIpO1xuZXhwb3J0cy5pc0FycmF5QnVmZmVyID0gaGFzQXJyYXlCdWZmZXIgPyBpc0FycmF5QnVmZmVyIDogX2ZhbHNlO1xudmFyIGlzQnVmZmVyID0gZXhwb3J0cy5pc0J1ZmZlciA9IGhhc0J1ZmZlciA/IEJ1ZmZlci5pc0J1ZmZlciA6IF9mYWxzZTtcbnZhciBpc1ZpZXcgPSBleHBvcnRzLmlzVmlldyA9IGhhc0FycmF5QnVmZmVyID8gKEFycmF5QnVmZmVyLmlzVmlldyB8fCBfaXMoXCJBcnJheUJ1ZmZlclwiLCBcImJ1ZmZlclwiKSkgOiBfZmFsc2U7XG5cbmV4cG9ydHMuYWxsb2MgPSBhbGxvYztcbmV4cG9ydHMuY29uY2F0ID0gY29uY2F0O1xuZXhwb3J0cy5mcm9tID0gZnJvbTtcblxudmFyIEJ1ZmZlckFycmF5ID0gZXhwb3J0cy5BcnJheSA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaC1hcnJheVwiKTtcbnZhciBCdWZmZXJCdWZmZXIgPSBleHBvcnRzLkJ1ZmZlciA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaC1idWZmZXJcIik7XG52YXIgQnVmZmVyVWludDhBcnJheSA9IGV4cG9ydHMuVWludDhBcnJheSA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaC11aW50OGFycmF5XCIpO1xudmFyIEJ1ZmZlclByb3RvID0gZXhwb3J0cy5wcm90b3R5cGUgPSByZXF1aXJlKFwiLi9idWZmZXJpc2gtcHJvdG9cIik7XG5cbi8qKlxuICogQHBhcmFtIHZhbHVlIHtBcnJheXxBcnJheUJ1ZmZlcnxCdWZmZXJ8U3RyaW5nfVxuICogQHJldHVybnMge0J1ZmZlcnxVaW50OEFycmF5fEFycmF5fVxuICovXG5cbmZ1bmN0aW9uIGZyb20odmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBmcm9tU3RyaW5nLmNhbGwodGhpcywgdmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBhdXRvKHRoaXMpLmZyb20odmFsdWUpO1xuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHNpemUge051bWJlcn1cbiAqIEByZXR1cm5zIHtCdWZmZXJ8VWludDhBcnJheXxBcnJheX1cbiAqL1xuXG5mdW5jdGlvbiBhbGxvYyhzaXplKSB7XG4gIHJldHVybiBhdXRvKHRoaXMpLmFsbG9jKHNpemUpO1xufVxuXG4vKipcbiAqIEBwYXJhbSBsaXN0IHtBcnJheX0gYXJyYXkgb2YgKEJ1ZmZlcnxVaW50OEFycmF5fEFycmF5KXNcbiAqIEBwYXJhbSBbbGVuZ3RoXVxuICogQHJldHVybnMge0J1ZmZlcnxVaW50OEFycmF5fEFycmF5fVxuICovXG5cbmZ1bmN0aW9uIGNvbmNhdChsaXN0LCBsZW5ndGgpIHtcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSAwO1xuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwobGlzdCwgZHJ5cnVuKTtcbiAgfVxuICB2YXIgcmVmID0gKHRoaXMgIT09IGV4cG9ydHMpICYmIHRoaXMgfHwgbGlzdFswXTtcbiAgdmFyIHJlc3VsdCA9IGFsbG9jLmNhbGwocmVmLCBsZW5ndGgpO1xuICB2YXIgb2Zmc2V0ID0gMDtcbiAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChsaXN0LCBhcHBlbmQpO1xuICByZXR1cm4gcmVzdWx0O1xuXG4gIGZ1bmN0aW9uIGRyeXJ1bihidWZmZXIpIHtcbiAgICBsZW5ndGggKz0gYnVmZmVyLmxlbmd0aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGVuZChidWZmZXIpIHtcbiAgICBvZmZzZXQgKz0gQnVmZmVyUHJvdG8uY29weS5jYWxsKGJ1ZmZlciwgcmVzdWx0LCBvZmZzZXQpO1xuICB9XG59XG5cbnZhciBfaXNBcnJheUJ1ZmZlciA9IF9pcyhcIkFycmF5QnVmZmVyXCIpO1xuXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikgfHwgX2lzQXJyYXlCdWZmZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZnJvbVN0cmluZyh2YWx1ZSkge1xuICB2YXIgZXhwZWN0ZWQgPSB2YWx1ZS5sZW5ndGggKiAzO1xuICB2YXIgdGhhdCA9IGFsbG9jLmNhbGwodGhpcywgZXhwZWN0ZWQpO1xuICB2YXIgYWN0dWFsID0gQnVmZmVyUHJvdG8ud3JpdGUuY2FsbCh0aGF0LCB2YWx1ZSk7XG4gIGlmIChleHBlY3RlZCAhPT0gYWN0dWFsKSB7XG4gICAgdGhhdCA9IEJ1ZmZlclByb3RvLnNsaWNlLmNhbGwodGhhdCwgMCwgYWN0dWFsKTtcbiAgfVxuICByZXR1cm4gdGhhdDtcbn1cblxuZnVuY3Rpb24gYXV0byh0aGF0KSB7XG4gIHJldHVybiBpc0J1ZmZlcih0aGF0KSA/IEJ1ZmZlckJ1ZmZlclxuICAgIDogaXNWaWV3KHRoYXQpID8gQnVmZmVyVWludDhBcnJheVxuICAgIDogaXNBcnJheSh0aGF0KSA/IEJ1ZmZlckFycmF5XG4gICAgOiBoYXNCdWZmZXIgPyBCdWZmZXJCdWZmZXJcbiAgICA6IGhhc0FycmF5QnVmZmVyID8gQnVmZmVyVWludDhBcnJheVxuICAgIDogQnVmZmVyQXJyYXk7XG59XG5cbmZ1bmN0aW9uIF9mYWxzZSgpIHtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBfaXMobmFtZSwga2V5KSB7XG4gIC8qIGpzaGludCBlcW51bGw6dHJ1ZSAqL1xuICBuYW1lID0gXCJbb2JqZWN0IFwiICsgbmFtZSArIFwiXVwiO1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gKHZhbHVlICE9IG51bGwpICYmIHt9LnRvU3RyaW5nLmNhbGwoa2V5ID8gdmFsdWVba2V5XSA6IHZhbHVlKSA9PT0gbmFtZTtcbiAgfTtcbn0iLCIvLyBjb2RlYy1iYXNlLmpzXG5cbnZhciBJU19BUlJBWSA9IHJlcXVpcmUoXCJpc2FycmF5XCIpO1xuXG5leHBvcnRzLmNyZWF0ZUNvZGVjID0gY3JlYXRlQ29kZWM7XG5leHBvcnRzLmluc3RhbGwgPSBpbnN0YWxsO1xuZXhwb3J0cy5maWx0ZXIgPSBmaWx0ZXI7XG5cbnZhciBCdWZmZXJpc2ggPSByZXF1aXJlKFwiLi9idWZmZXJpc2hcIik7XG5cbmZ1bmN0aW9uIENvZGVjKG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIENvZGVjKSkgcmV0dXJuIG5ldyBDb2RlYyhvcHRpb25zKTtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgdGhpcy5pbml0KCk7XG59XG5cbkNvZGVjLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMudWludDhhcnJheSkge1xuICAgIHRoaXMuYnVmZmVyaXNoID0gQnVmZmVyaXNoLlVpbnQ4QXJyYXk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIGluc3RhbGwocHJvcHMpIHtcbiAgZm9yICh2YXIga2V5IGluIHByb3BzKSB7XG4gICAgQ29kZWMucHJvdG90eXBlW2tleV0gPSBhZGQoQ29kZWMucHJvdG90eXBlW2tleV0sIHByb3BzW2tleV0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFkZChhLCBiKSB7XG4gIHJldHVybiAoYSAmJiBiKSA/IGFiIDogKGEgfHwgYik7XG5cbiAgZnVuY3Rpb24gYWIoKSB7XG4gICAgYS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiBiLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gam9pbihmaWx0ZXJzKSB7XG4gIGZpbHRlcnMgPSBmaWx0ZXJzLnNsaWNlKCk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZpbHRlcnMucmVkdWNlKGl0ZXJhdG9yLCB2YWx1ZSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gaXRlcmF0b3IodmFsdWUsIGZpbHRlcikge1xuICAgIHJldHVybiBmaWx0ZXIodmFsdWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZpbHRlcihmaWx0ZXIpIHtcbiAgcmV0dXJuIElTX0FSUkFZKGZpbHRlcikgPyBqb2luKGZpbHRlcikgOiBmaWx0ZXI7XG59XG5cbi8vIEBwdWJsaWNcbi8vIG1zZ3BhY2suY3JlYXRlQ29kZWMoKVxuXG5mdW5jdGlvbiBjcmVhdGVDb2RlYyhvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgQ29kZWMob3B0aW9ucyk7XG59XG5cbi8vIGRlZmF1bHQgc2hhcmVkIGNvZGVjXG5cbmV4cG9ydHMucHJlc2V0ID0gY3JlYXRlQ29kZWMoe3ByZXNldDogdHJ1ZX0pO1xuIiwiLy8gY29kZWMuanNcblxuLy8gbG9hZCBib3RoIGludGVyZmFjZXNcbnJlcXVpcmUoXCIuL3JlYWQtY29yZVwiKTtcbnJlcXVpcmUoXCIuL3dyaXRlLWNvcmVcIik7XG5cbi8vIEBwdWJsaWNcbi8vIG1zZ3BhY2suY29kZWMucHJlc2V0XG5cbmV4cG9ydHMuY29kZWMgPSB7XG4gIHByZXNldDogcmVxdWlyZShcIi4vY29kZWMtYmFzZVwiKS5wcmVzZXRcbn07XG4iLCIvLyBkZWNvZGUtYnVmZmVyLmpzXG5cbmV4cG9ydHMuRGVjb2RlQnVmZmVyID0gRGVjb2RlQnVmZmVyO1xuXG52YXIgcHJlc2V0ID0gcmVxdWlyZShcIi4vcmVhZC1jb3JlXCIpLnByZXNldDtcblxudmFyIEZsZXhEZWNvZGVyID0gcmVxdWlyZShcIi4vZmxleC1idWZmZXJcIikuRmxleERlY29kZXI7XG5cbkZsZXhEZWNvZGVyLm1peGluKERlY29kZUJ1ZmZlci5wcm90b3R5cGUpO1xuXG5mdW5jdGlvbiBEZWNvZGVCdWZmZXIob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRGVjb2RlQnVmZmVyKSkgcmV0dXJuIG5ldyBEZWNvZGVCdWZmZXIob3B0aW9ucyk7XG5cbiAgaWYgKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIGlmIChvcHRpb25zLmNvZGVjKSB7XG4gICAgICB2YXIgY29kZWMgPSB0aGlzLmNvZGVjID0gb3B0aW9ucy5jb2RlYztcbiAgICAgIGlmIChjb2RlYy5idWZmZXJpc2gpIHRoaXMuYnVmZmVyaXNoID0gY29kZWMuYnVmZmVyaXNoO1xuICAgIH1cbiAgfVxufVxuXG5EZWNvZGVCdWZmZXIucHJvdG90eXBlLmNvZGVjID0gcHJlc2V0O1xuXG5EZWNvZGVCdWZmZXIucHJvdG90eXBlLmZldGNoID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNvZGVjLmRlY29kZSh0aGlzKTtcbn07XG4iLCIvLyBkZWNvZGUuanNcblxuZXhwb3J0cy5kZWNvZGUgPSBkZWNvZGU7XG5cbnZhciBEZWNvZGVCdWZmZXIgPSByZXF1aXJlKFwiLi9kZWNvZGUtYnVmZmVyXCIpLkRlY29kZUJ1ZmZlcjtcblxuZnVuY3Rpb24gZGVjb2RlKGlucHV0LCBvcHRpb25zKSB7XG4gIHZhciBkZWNvZGVyID0gbmV3IERlY29kZUJ1ZmZlcihvcHRpb25zKTtcbiAgZGVjb2Rlci53cml0ZShpbnB1dCk7XG4gIHJldHVybiBkZWNvZGVyLnJlYWQoKTtcbn0iLCIvLyBkZWNvZGVyLmpzXG5cbmV4cG9ydHMuRGVjb2RlciA9IERlY29kZXI7XG5cbnZhciBFdmVudExpdGUgPSByZXF1aXJlKFwiZXZlbnQtbGl0ZVwiKTtcbnZhciBEZWNvZGVCdWZmZXIgPSByZXF1aXJlKFwiLi9kZWNvZGUtYnVmZmVyXCIpLkRlY29kZUJ1ZmZlcjtcblxuZnVuY3Rpb24gRGVjb2RlcihvcHRpb25zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBEZWNvZGVyKSkgcmV0dXJuIG5ldyBEZWNvZGVyKG9wdGlvbnMpO1xuICBEZWNvZGVCdWZmZXIuY2FsbCh0aGlzLCBvcHRpb25zKTtcbn1cblxuRGVjb2Rlci5wcm90b3R5cGUgPSBuZXcgRGVjb2RlQnVmZmVyKCk7XG5cbkV2ZW50TGl0ZS5taXhpbihEZWNvZGVyLnByb3RvdHlwZSk7XG5cbkRlY29kZXIucHJvdG90eXBlLmRlY29kZSA9IGZ1bmN0aW9uKGNodW5rKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoKSB0aGlzLndyaXRlKGNodW5rKTtcbiAgdGhpcy5mbHVzaCgpO1xufTtcblxuRGVjb2Rlci5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uKGNodW5rKSB7XG4gIHRoaXMuZW1pdChcImRhdGFcIiwgY2h1bmspO1xufTtcblxuRGVjb2Rlci5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24oY2h1bmspIHtcbiAgdGhpcy5kZWNvZGUoY2h1bmspO1xuICB0aGlzLmVtaXQoXCJlbmRcIik7XG59O1xuIiwiLy8gZW5jb2RlLWJ1ZmZlci5qc1xuXG5leHBvcnRzLkVuY29kZUJ1ZmZlciA9IEVuY29kZUJ1ZmZlcjtcblxudmFyIHByZXNldCA9IHJlcXVpcmUoXCIuL3dyaXRlLWNvcmVcIikucHJlc2V0O1xuXG52YXIgRmxleEVuY29kZXIgPSByZXF1aXJlKFwiLi9mbGV4LWJ1ZmZlclwiKS5GbGV4RW5jb2RlcjtcblxuRmxleEVuY29kZXIubWl4aW4oRW5jb2RlQnVmZmVyLnByb3RvdHlwZSk7XG5cbmZ1bmN0aW9uIEVuY29kZUJ1ZmZlcihvcHRpb25zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBFbmNvZGVCdWZmZXIpKSByZXR1cm4gbmV3IEVuY29kZUJ1ZmZlcihvcHRpb25zKTtcblxuICBpZiAob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgaWYgKG9wdGlvbnMuY29kZWMpIHtcbiAgICAgIHZhciBjb2RlYyA9IHRoaXMuY29kZWMgPSBvcHRpb25zLmNvZGVjO1xuICAgICAgaWYgKGNvZGVjLmJ1ZmZlcmlzaCkgdGhpcy5idWZmZXJpc2ggPSBjb2RlYy5idWZmZXJpc2g7XG4gICAgfVxuICB9XG59XG5cbkVuY29kZUJ1ZmZlci5wcm90b3R5cGUuY29kZWMgPSBwcmVzZXQ7XG5cbkVuY29kZUJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbihpbnB1dCkge1xuICB0aGlzLmNvZGVjLmVuY29kZSh0aGlzLCBpbnB1dCk7XG59O1xuIiwiLy8gZW5jb2RlLmpzXG5cbmV4cG9ydHMuZW5jb2RlID0gZW5jb2RlO1xuXG52YXIgRW5jb2RlQnVmZmVyID0gcmVxdWlyZShcIi4vZW5jb2RlLWJ1ZmZlclwiKS5FbmNvZGVCdWZmZXI7XG5cbmZ1bmN0aW9uIGVuY29kZShpbnB1dCwgb3B0aW9ucykge1xuICB2YXIgZW5jb2RlciA9IG5ldyBFbmNvZGVCdWZmZXIob3B0aW9ucyk7XG4gIGVuY29kZXIud3JpdGUoaW5wdXQpO1xuICByZXR1cm4gZW5jb2Rlci5yZWFkKCk7XG59XG4iLCIvLyBlbmNvZGVyLmpzXG5cbmV4cG9ydHMuRW5jb2RlciA9IEVuY29kZXI7XG5cbnZhciBFdmVudExpdGUgPSByZXF1aXJlKFwiZXZlbnQtbGl0ZVwiKTtcbnZhciBFbmNvZGVCdWZmZXIgPSByZXF1aXJlKFwiLi9lbmNvZGUtYnVmZmVyXCIpLkVuY29kZUJ1ZmZlcjtcblxuZnVuY3Rpb24gRW5jb2RlcihvcHRpb25zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBFbmNvZGVyKSkgcmV0dXJuIG5ldyBFbmNvZGVyKG9wdGlvbnMpO1xuICBFbmNvZGVCdWZmZXIuY2FsbCh0aGlzLCBvcHRpb25zKTtcbn1cblxuRW5jb2Rlci5wcm90b3R5cGUgPSBuZXcgRW5jb2RlQnVmZmVyKCk7XG5cbkV2ZW50TGl0ZS5taXhpbihFbmNvZGVyLnByb3RvdHlwZSk7XG5cbkVuY29kZXIucHJvdG90eXBlLmVuY29kZSA9IGZ1bmN0aW9uKGNodW5rKSB7XG4gIHRoaXMud3JpdGUoY2h1bmspO1xuICB0aGlzLmVtaXQoXCJkYXRhXCIsIHRoaXMucmVhZCgpKTtcbn07XG5cbkVuY29kZXIucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKGNodW5rKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoKSB0aGlzLmVuY29kZShjaHVuayk7XG4gIHRoaXMuZmx1c2goKTtcbiAgdGhpcy5lbWl0KFwiZW5kXCIpO1xufTtcbiIsIi8vIGV4dC1idWZmZXIuanNcblxuZXhwb3J0cy5FeHRCdWZmZXIgPSBFeHRCdWZmZXI7XG5cbnZhciBCdWZmZXJpc2ggPSByZXF1aXJlKFwiLi9idWZmZXJpc2hcIik7XG5cbmZ1bmN0aW9uIEV4dEJ1ZmZlcihidWZmZXIsIHR5cGUpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEV4dEJ1ZmZlcikpIHJldHVybiBuZXcgRXh0QnVmZmVyKGJ1ZmZlciwgdHlwZSk7XG4gIHRoaXMuYnVmZmVyID0gQnVmZmVyaXNoLmZyb20oYnVmZmVyKTtcbiAgdGhpcy50eXBlID0gdHlwZTtcbn1cbiIsIi8vIGV4dC1wYWNrZXIuanNcblxuZXhwb3J0cy5zZXRFeHRQYWNrZXJzID0gc2V0RXh0UGFja2VycztcblxudmFyIEJ1ZmZlcmlzaCA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaFwiKTtcbnZhciBCdWZmZXIgPSBCdWZmZXJpc2guZ2xvYmFsO1xudmFyIHBhY2tUeXBlZEFycmF5ID0gQnVmZmVyaXNoLlVpbnQ4QXJyYXkuZnJvbTtcbnZhciBfZW5jb2RlO1xuXG52YXIgRVJST1JfQ09MVU1OUyA9IHtuYW1lOiAxLCBtZXNzYWdlOiAxLCBzdGFjazogMSwgY29sdW1uTnVtYmVyOiAxLCBmaWxlTmFtZTogMSwgbGluZU51bWJlcjogMX07XG5cbmZ1bmN0aW9uIHNldEV4dFBhY2tlcnMoY29kZWMpIHtcbiAgY29kZWMuYWRkRXh0UGFja2VyKDB4MEUsIEVycm9yLCBbcGFja0Vycm9yLCBlbmNvZGVdKTtcbiAgY29kZWMuYWRkRXh0UGFja2VyKDB4MDEsIEV2YWxFcnJvciwgW3BhY2tFcnJvciwgZW5jb2RlXSk7XG4gIGNvZGVjLmFkZEV4dFBhY2tlcigweDAyLCBSYW5nZUVycm9yLCBbcGFja0Vycm9yLCBlbmNvZGVdKTtcbiAgY29kZWMuYWRkRXh0UGFja2VyKDB4MDMsIFJlZmVyZW5jZUVycm9yLCBbcGFja0Vycm9yLCBlbmNvZGVdKTtcbiAgY29kZWMuYWRkRXh0UGFja2VyKDB4MDQsIFN5bnRheEVycm9yLCBbcGFja0Vycm9yLCBlbmNvZGVdKTtcbiAgY29kZWMuYWRkRXh0UGFja2VyKDB4MDUsIFR5cGVFcnJvciwgW3BhY2tFcnJvciwgZW5jb2RlXSk7XG4gIGNvZGVjLmFkZEV4dFBhY2tlcigweDA2LCBVUklFcnJvciwgW3BhY2tFcnJvciwgZW5jb2RlXSk7XG5cbiAgY29kZWMuYWRkRXh0UGFja2VyKDB4MEEsIFJlZ0V4cCwgW3BhY2tSZWdFeHAsIGVuY29kZV0pO1xuICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgwQiwgQm9vbGVhbiwgW3BhY2tWYWx1ZU9mLCBlbmNvZGVdKTtcbiAgY29kZWMuYWRkRXh0UGFja2VyKDB4MEMsIFN0cmluZywgW3BhY2tWYWx1ZU9mLCBlbmNvZGVdKTtcbiAgY29kZWMuYWRkRXh0UGFja2VyKDB4MEQsIERhdGUsIFtOdW1iZXIsIGVuY29kZV0pO1xuICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgwRiwgTnVtYmVyLCBbcGFja1ZhbHVlT2YsIGVuY29kZV0pO1xuXG4gIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgVWludDhBcnJheSkge1xuICAgIGNvZGVjLmFkZEV4dFBhY2tlcigweDExLCBJbnQ4QXJyYXksIHBhY2tUeXBlZEFycmF5KTtcbiAgICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgxMiwgVWludDhBcnJheSwgcGFja1R5cGVkQXJyYXkpO1xuICAgIGNvZGVjLmFkZEV4dFBhY2tlcigweDEzLCBJbnQxNkFycmF5LCBwYWNrVHlwZWRBcnJheSk7XG4gICAgY29kZWMuYWRkRXh0UGFja2VyKDB4MTQsIFVpbnQxNkFycmF5LCBwYWNrVHlwZWRBcnJheSk7XG4gICAgY29kZWMuYWRkRXh0UGFja2VyKDB4MTUsIEludDMyQXJyYXksIHBhY2tUeXBlZEFycmF5KTtcbiAgICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgxNiwgVWludDMyQXJyYXksIHBhY2tUeXBlZEFycmF5KTtcbiAgICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgxNywgRmxvYXQzMkFycmF5LCBwYWNrVHlwZWRBcnJheSk7XG5cbiAgICAvLyBQaGFudG9tSlMvMS45LjcgZG9lc24ndCBoYXZlIEZsb2F0NjRBcnJheVxuICAgIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgRmxvYXQ2NEFycmF5KSB7XG4gICAgICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgxOCwgRmxvYXQ2NEFycmF5LCBwYWNrVHlwZWRBcnJheSk7XG4gICAgfVxuXG4gICAgLy8gSUUxMCBkb2Vzbid0IGhhdmUgVWludDhDbGFtcGVkQXJyYXlcbiAgICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIFVpbnQ4Q2xhbXBlZEFycmF5KSB7XG4gICAgICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgxOSwgVWludDhDbGFtcGVkQXJyYXksIHBhY2tUeXBlZEFycmF5KTtcbiAgICB9XG5cbiAgICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgxQSwgQXJyYXlCdWZmZXIsIHBhY2tUeXBlZEFycmF5KTtcbiAgICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgxRCwgRGF0YVZpZXcsIHBhY2tUeXBlZEFycmF5KTtcbiAgfVxuXG4gIGlmIChCdWZmZXJpc2guaGFzQnVmZmVyKSB7XG4gICAgY29kZWMuYWRkRXh0UGFja2VyKDB4MUIsIEJ1ZmZlciwgQnVmZmVyaXNoLmZyb20pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVuY29kZShpbnB1dCkge1xuICBpZiAoIV9lbmNvZGUpIF9lbmNvZGUgPSByZXF1aXJlKFwiLi9lbmNvZGVcIikuZW5jb2RlOyAvLyBsYXp5IGxvYWRcbiAgcmV0dXJuIF9lbmNvZGUoaW5wdXQpO1xufVxuXG5mdW5jdGlvbiBwYWNrVmFsdWVPZih2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlKS52YWx1ZU9mKCk7XG59XG5cbmZ1bmN0aW9uIHBhY2tSZWdFeHAodmFsdWUpIHtcbiAgdmFsdWUgPSBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLnNwbGl0KFwiL1wiKTtcbiAgdmFsdWUuc2hpZnQoKTtcbiAgdmFyIG91dCA9IFt2YWx1ZS5wb3AoKV07XG4gIG91dC51bnNoaWZ0KHZhbHVlLmpvaW4oXCIvXCIpKTtcbiAgcmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gcGFja0Vycm9yKHZhbHVlKSB7XG4gIHZhciBvdXQgPSB7fTtcbiAgZm9yICh2YXIga2V5IGluIEVSUk9SX0NPTFVNTlMpIHtcbiAgICBvdXRba2V5XSA9IHZhbHVlW2tleV07XG4gIH1cbiAgcmV0dXJuIG91dDtcbn1cbiIsIi8vIGV4dC11bnBhY2tlci5qc1xuXG5leHBvcnRzLnNldEV4dFVucGFja2VycyA9IHNldEV4dFVucGFja2VycztcblxudmFyIEJ1ZmZlcmlzaCA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaFwiKTtcbnZhciBCdWZmZXIgPSBCdWZmZXJpc2guZ2xvYmFsO1xudmFyIF9kZWNvZGU7XG5cbnZhciBFUlJPUl9DT0xVTU5TID0ge25hbWU6IDEsIG1lc3NhZ2U6IDEsIHN0YWNrOiAxLCBjb2x1bW5OdW1iZXI6IDEsIGZpbGVOYW1lOiAxLCBsaW5lTnVtYmVyOiAxfTtcblxuZnVuY3Rpb24gc2V0RXh0VW5wYWNrZXJzKGNvZGVjKSB7XG4gIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MEUsIFtkZWNvZGUsIHVucGFja0Vycm9yKEVycm9yKV0pO1xuICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDAxLCBbZGVjb2RlLCB1bnBhY2tFcnJvcihFdmFsRXJyb3IpXSk7XG4gIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MDIsIFtkZWNvZGUsIHVucGFja0Vycm9yKFJhbmdlRXJyb3IpXSk7XG4gIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MDMsIFtkZWNvZGUsIHVucGFja0Vycm9yKFJlZmVyZW5jZUVycm9yKV0pO1xuICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDA0LCBbZGVjb2RlLCB1bnBhY2tFcnJvcihTeW50YXhFcnJvcildKTtcbiAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgwNSwgW2RlY29kZSwgdW5wYWNrRXJyb3IoVHlwZUVycm9yKV0pO1xuICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDA2LCBbZGVjb2RlLCB1bnBhY2tFcnJvcihVUklFcnJvcildKTtcblxuICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDBBLCBbZGVjb2RlLCB1bnBhY2tSZWdFeHBdKTtcbiAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgwQiwgW2RlY29kZSwgdW5wYWNrQ2xhc3MoQm9vbGVhbildKTtcbiAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgwQywgW2RlY29kZSwgdW5wYWNrQ2xhc3MoU3RyaW5nKV0pO1xuICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDBELCBbZGVjb2RlLCB1bnBhY2tDbGFzcyhEYXRlKV0pO1xuICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDBGLCBbZGVjb2RlLCB1bnBhY2tDbGFzcyhOdW1iZXIpXSk7XG5cbiAgaWYgKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBVaW50OEFycmF5KSB7XG4gICAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgxMSwgdW5wYWNrQ2xhc3MoSW50OEFycmF5KSk7XG4gICAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgxMiwgdW5wYWNrQ2xhc3MoVWludDhBcnJheSkpO1xuICAgIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MTMsIFt1bnBhY2tBcnJheUJ1ZmZlciwgdW5wYWNrQ2xhc3MoSW50MTZBcnJheSldKTtcbiAgICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDE0LCBbdW5wYWNrQXJyYXlCdWZmZXIsIHVucGFja0NsYXNzKFVpbnQxNkFycmF5KV0pO1xuICAgIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MTUsIFt1bnBhY2tBcnJheUJ1ZmZlciwgdW5wYWNrQ2xhc3MoSW50MzJBcnJheSldKTtcbiAgICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDE2LCBbdW5wYWNrQXJyYXlCdWZmZXIsIHVucGFja0NsYXNzKFVpbnQzMkFycmF5KV0pO1xuICAgIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MTcsIFt1bnBhY2tBcnJheUJ1ZmZlciwgdW5wYWNrQ2xhc3MoRmxvYXQzMkFycmF5KV0pO1xuXG4gICAgLy8gUGhhbnRvbUpTLzEuOS43IGRvZXNuJ3QgaGF2ZSBGbG9hdDY0QXJyYXlcbiAgICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIEZsb2F0NjRBcnJheSkge1xuICAgICAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgxOCwgW3VucGFja0FycmF5QnVmZmVyLCB1bnBhY2tDbGFzcyhGbG9hdDY0QXJyYXkpXSk7XG4gICAgfVxuXG4gICAgLy8gSUUxMCBkb2Vzbid0IGhhdmUgVWludDhDbGFtcGVkQXJyYXlcbiAgICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIFVpbnQ4Q2xhbXBlZEFycmF5KSB7XG4gICAgICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDE5LCB1bnBhY2tDbGFzcyhVaW50OENsYW1wZWRBcnJheSkpO1xuICAgIH1cblxuICAgIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MUEsIHVucGFja0FycmF5QnVmZmVyKTtcbiAgICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDFELCBbdW5wYWNrQXJyYXlCdWZmZXIsIHVucGFja0NsYXNzKERhdGFWaWV3KV0pO1xuICB9XG5cbiAgaWYgKEJ1ZmZlcmlzaC5oYXNCdWZmZXIpIHtcbiAgICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDFCLCB1bnBhY2tDbGFzcyhCdWZmZXIpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWNvZGUoaW5wdXQpIHtcbiAgaWYgKCFfZGVjb2RlKSBfZGVjb2RlID0gcmVxdWlyZShcIi4vZGVjb2RlXCIpLmRlY29kZTsgLy8gbGF6eSBsb2FkXG4gIHJldHVybiBfZGVjb2RlKGlucHV0KTtcbn1cblxuZnVuY3Rpb24gdW5wYWNrUmVnRXhwKHZhbHVlKSB7XG4gIHJldHVybiBSZWdFeHAuYXBwbHkobnVsbCwgdmFsdWUpO1xufVxuXG5mdW5jdGlvbiB1bnBhY2tFcnJvcihDbGFzcykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgb3V0ID0gbmV3IENsYXNzKCk7XG4gICAgZm9yICh2YXIga2V5IGluIEVSUk9SX0NPTFVNTlMpIHtcbiAgICAgIG91dFtrZXldID0gdmFsdWVba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdW5wYWNrQ2xhc3MoQ2xhc3MpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBDbGFzcyh2YWx1ZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHVucGFja0FycmF5QnVmZmVyKHZhbHVlKSB7XG4gIHJldHVybiAobmV3IFVpbnQ4QXJyYXkodmFsdWUpKS5idWZmZXI7XG59XG4iLCIvLyBleHQuanNcblxuLy8gbG9hZCBib3RoIGludGVyZmFjZXNcbnJlcXVpcmUoXCIuL3JlYWQtY29yZVwiKTtcbnJlcXVpcmUoXCIuL3dyaXRlLWNvcmVcIik7XG5cbmV4cG9ydHMuY3JlYXRlQ29kZWMgPSByZXF1aXJlKFwiLi9jb2RlYy1iYXNlXCIpLmNyZWF0ZUNvZGVjO1xuIiwiLy8gZmxleC1idWZmZXIuanNcblxuZXhwb3J0cy5GbGV4RGVjb2RlciA9IEZsZXhEZWNvZGVyO1xuZXhwb3J0cy5GbGV4RW5jb2RlciA9IEZsZXhFbmNvZGVyO1xuXG52YXIgQnVmZmVyaXNoID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoXCIpO1xuXG52YXIgTUlOX0JVRkZFUl9TSVpFID0gMjA0ODtcbnZhciBNQVhfQlVGRkVSX1NJWkUgPSA2NTUzNjtcbnZhciBCVUZGRVJfU0hPUlRBR0UgPSBcIkJVRkZFUl9TSE9SVEFHRVwiO1xuXG5mdW5jdGlvbiBGbGV4RGVjb2RlcigpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEZsZXhEZWNvZGVyKSkgcmV0dXJuIG5ldyBGbGV4RGVjb2RlcigpO1xufVxuXG5mdW5jdGlvbiBGbGV4RW5jb2RlcigpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEZsZXhFbmNvZGVyKSkgcmV0dXJuIG5ldyBGbGV4RW5jb2RlcigpO1xufVxuXG5GbGV4RGVjb2Rlci5taXhpbiA9IG1peGluRmFjdG9yeShnZXREZWNvZGVyTWV0aG9kcygpKTtcbkZsZXhEZWNvZGVyLm1peGluKEZsZXhEZWNvZGVyLnByb3RvdHlwZSk7XG5cbkZsZXhFbmNvZGVyLm1peGluID0gbWl4aW5GYWN0b3J5KGdldEVuY29kZXJNZXRob2RzKCkpO1xuRmxleEVuY29kZXIubWl4aW4oRmxleEVuY29kZXIucHJvdG90eXBlKTtcblxuZnVuY3Rpb24gZ2V0RGVjb2Rlck1ldGhvZHMoKSB7XG4gIHJldHVybiB7XG4gICAgYnVmZmVyaXNoOiBCdWZmZXJpc2gsXG4gICAgd3JpdGU6IHdyaXRlLFxuICAgIGZldGNoOiBmZXRjaCxcbiAgICBmbHVzaDogZmx1c2gsXG4gICAgcHVzaDogcHVzaCxcbiAgICBwdWxsOiBwdWxsLFxuICAgIHJlYWQ6IHJlYWQsXG4gICAgcmVzZXJ2ZTogcmVzZXJ2ZSxcbiAgICBvZmZzZXQ6IDBcbiAgfTtcblxuICBmdW5jdGlvbiB3cml0ZShjaHVuaykge1xuICAgIHZhciBwcmV2ID0gdGhpcy5vZmZzZXQgPyBCdWZmZXJpc2gucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5idWZmZXIsIHRoaXMub2Zmc2V0KSA6IHRoaXMuYnVmZmVyO1xuICAgIHRoaXMuYnVmZmVyID0gcHJldiA/IChjaHVuayA/IHRoaXMuYnVmZmVyaXNoLmNvbmNhdChbcHJldiwgY2h1bmtdKSA6IHByZXYpIDogY2h1bms7XG4gICAgdGhpcy5vZmZzZXQgPSAwO1xuICB9XG5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgd2hpbGUgKHRoaXMub2Zmc2V0IDwgdGhpcy5idWZmZXIubGVuZ3RoKSB7XG4gICAgICB2YXIgc3RhcnQgPSB0aGlzLm9mZnNldDtcbiAgICAgIHZhciB2YWx1ZTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy5mZXRjaCgpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoZSAmJiBlLm1lc3NhZ2UgIT0gQlVGRkVSX1NIT1JUQUdFKSB0aHJvdyBlO1xuICAgICAgICAvLyByb2xsYmFja1xuICAgICAgICB0aGlzLm9mZnNldCA9IHN0YXJ0O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHRoaXMucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXJ2ZShsZW5ndGgpIHtcbiAgICB2YXIgc3RhcnQgPSB0aGlzLm9mZnNldDtcbiAgICB2YXIgZW5kID0gc3RhcnQgKyBsZW5ndGg7XG4gICAgaWYgKGVuZCA+IHRoaXMuYnVmZmVyLmxlbmd0aCkgdGhyb3cgbmV3IEVycm9yKEJVRkZFUl9TSE9SVEFHRSk7XG4gICAgdGhpcy5vZmZzZXQgPSBlbmQ7XG4gICAgcmV0dXJuIHN0YXJ0O1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEVuY29kZXJNZXRob2RzKCkge1xuICByZXR1cm4ge1xuICAgIGJ1ZmZlcmlzaDogQnVmZmVyaXNoLFxuICAgIHdyaXRlOiB3cml0ZSxcbiAgICBmZXRjaDogZmV0Y2gsXG4gICAgZmx1c2g6IGZsdXNoLFxuICAgIHB1c2g6IHB1c2gsXG4gICAgcHVsbDogcHVsbCxcbiAgICByZWFkOiByZWFkLFxuICAgIHJlc2VydmU6IHJlc2VydmUsXG4gICAgc2VuZDogc2VuZCxcbiAgICBtYXhCdWZmZXJTaXplOiBNQVhfQlVGRkVSX1NJWkUsXG4gICAgbWluQnVmZmVyU2l6ZTogTUlOX0JVRkZFUl9TSVpFLFxuICAgIG9mZnNldDogMCxcbiAgICBzdGFydDogMFxuICB9O1xuXG4gIGZ1bmN0aW9uIGZldGNoKCkge1xuICAgIHZhciBzdGFydCA9IHRoaXMuc3RhcnQ7XG4gICAgaWYgKHN0YXJ0IDwgdGhpcy5vZmZzZXQpIHtcbiAgICAgIHZhciBlbmQgPSB0aGlzLnN0YXJ0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICByZXR1cm4gQnVmZmVyaXNoLnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuYnVmZmVyLCBzdGFydCwgZW5kKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICB3aGlsZSAodGhpcy5zdGFydCA8IHRoaXMub2Zmc2V0KSB7XG4gICAgICB2YXIgdmFsdWUgPSB0aGlzLmZldGNoKCk7XG4gICAgICBpZiAodmFsdWUpIHRoaXMucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHVsbCgpIHtcbiAgICB2YXIgYnVmZmVycyA9IHRoaXMuYnVmZmVycyB8fCAodGhpcy5idWZmZXJzID0gW10pO1xuICAgIHZhciBjaHVuayA9IGJ1ZmZlcnMubGVuZ3RoID4gMSA/IHRoaXMuYnVmZmVyaXNoLmNvbmNhdChidWZmZXJzKSA6IGJ1ZmZlcnNbMF07XG4gICAgYnVmZmVycy5sZW5ndGggPSAwOyAvLyBidWZmZXIgZXhoYXVzdGVkXG4gICAgcmV0dXJuIGNodW5rO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXJ2ZShsZW5ndGgpIHtcbiAgICB2YXIgcmVxID0gbGVuZ3RoIHwgMDtcblxuICAgIGlmICh0aGlzLmJ1ZmZlcikge1xuICAgICAgdmFyIHNpemUgPSB0aGlzLmJ1ZmZlci5sZW5ndGg7XG4gICAgICB2YXIgc3RhcnQgPSB0aGlzLm9mZnNldCB8IDA7XG4gICAgICB2YXIgZW5kID0gc3RhcnQgKyByZXE7XG5cbiAgICAgIC8vIGlzIGl0IGxvbmcgZW5vdWdoP1xuICAgICAgaWYgKGVuZCA8IHNpemUpIHtcbiAgICAgICAgdGhpcy5vZmZzZXQgPSBlbmQ7XG4gICAgICAgIHJldHVybiBzdGFydDtcbiAgICAgIH1cblxuICAgICAgLy8gZmx1c2ggY3VycmVudCBidWZmZXJcbiAgICAgIHRoaXMuZmx1c2goKTtcblxuICAgICAgLy8gcmVzaXplIGl0IHRvIDJ4IGN1cnJlbnQgbGVuZ3RoXG4gICAgICBsZW5ndGggPSBNYXRoLm1heChsZW5ndGgsIE1hdGgubWluKHNpemUgKiAyLCB0aGlzLm1heEJ1ZmZlclNpemUpKTtcbiAgICB9XG5cbiAgICAvLyBtaW5pbXVtIGJ1ZmZlciBzaXplXG4gICAgbGVuZ3RoID0gTWF0aC5tYXgobGVuZ3RoLCB0aGlzLm1pbkJ1ZmZlclNpemUpO1xuXG4gICAgLy8gYWxsb2NhdGUgbmV3IGJ1ZmZlclxuICAgIHRoaXMuYnVmZmVyID0gdGhpcy5idWZmZXJpc2guYWxsb2MobGVuZ3RoKTtcbiAgICB0aGlzLnN0YXJ0ID0gMDtcbiAgICB0aGlzLm9mZnNldCA9IHJlcTtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbmQoYnVmZmVyKSB7XG4gICAgdmFyIGxlbmd0aCA9IGJ1ZmZlci5sZW5ndGg7XG4gICAgaWYgKGxlbmd0aCA+IHRoaXMubWluQnVmZmVyU2l6ZSkge1xuICAgICAgdGhpcy5mbHVzaCgpO1xuICAgICAgdGhpcy5wdXNoKGJ1ZmZlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBvZmZzZXQgPSB0aGlzLnJlc2VydmUobGVuZ3RoKTtcbiAgICAgIEJ1ZmZlcmlzaC5wcm90b3R5cGUuY29weS5jYWxsKGJ1ZmZlciwgdGhpcy5idWZmZXIsIG9mZnNldCk7XG4gICAgfVxuICB9XG59XG5cbi8vIGNvbW1vbiBtZXRob2RzXG5cbmZ1bmN0aW9uIHdyaXRlKCkge1xuICB0aHJvdyBuZXcgRXJyb3IoXCJtZXRob2Qgbm90IGltcGxlbWVudGVkOiB3cml0ZSgpXCIpO1xufVxuXG5mdW5jdGlvbiBmZXRjaCgpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwibWV0aG9kIG5vdCBpbXBsZW1lbnRlZDogZmV0Y2goKVwiKTtcbn1cblxuZnVuY3Rpb24gcmVhZCgpIHtcbiAgdmFyIGxlbmd0aCA9IHRoaXMuYnVmZmVycyAmJiB0aGlzLmJ1ZmZlcnMubGVuZ3RoO1xuXG4gIC8vIGZldGNoIHRoZSBmaXJzdCByZXN1bHRcbiAgaWYgKCFsZW5ndGgpIHJldHVybiB0aGlzLmZldGNoKCk7XG5cbiAgLy8gZmx1c2ggY3VycmVudCBidWZmZXJcbiAgdGhpcy5mbHVzaCgpO1xuXG4gIC8vIHJlYWQgZnJvbSB0aGUgcmVzdWx0c1xuICByZXR1cm4gdGhpcy5wdWxsKCk7XG59XG5cbmZ1bmN0aW9uIHB1c2goY2h1bmspIHtcbiAgdmFyIGJ1ZmZlcnMgPSB0aGlzLmJ1ZmZlcnMgfHwgKHRoaXMuYnVmZmVycyA9IFtdKTtcbiAgYnVmZmVycy5wdXNoKGNodW5rKTtcbn1cblxuZnVuY3Rpb24gcHVsbCgpIHtcbiAgdmFyIGJ1ZmZlcnMgPSB0aGlzLmJ1ZmZlcnMgfHwgKHRoaXMuYnVmZmVycyA9IFtdKTtcbiAgcmV0dXJuIGJ1ZmZlcnMuc2hpZnQoKTtcbn1cblxuZnVuY3Rpb24gbWl4aW5GYWN0b3J5KHNvdXJjZSkge1xuICByZXR1cm4gbWl4aW47XG5cbiAgZnVuY3Rpb24gbWl4aW4odGFyZ2V0KSB7XG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxufVxuIiwiLy8gcmVhZC1jb3JlLmpzXG5cbnZhciBFeHRCdWZmZXIgPSByZXF1aXJlKFwiLi9leHQtYnVmZmVyXCIpLkV4dEJ1ZmZlcjtcbnZhciBFeHRVbnBhY2tlciA9IHJlcXVpcmUoXCIuL2V4dC11bnBhY2tlclwiKTtcbnZhciByZWFkVWludDggPSByZXF1aXJlKFwiLi9yZWFkLWZvcm1hdFwiKS5yZWFkVWludDg7XG52YXIgUmVhZFRva2VuID0gcmVxdWlyZShcIi4vcmVhZC10b2tlblwiKTtcbnZhciBDb2RlY0Jhc2UgPSByZXF1aXJlKFwiLi9jb2RlYy1iYXNlXCIpO1xuXG5Db2RlY0Jhc2UuaW5zdGFsbCh7XG4gIGFkZEV4dFVucGFja2VyOiBhZGRFeHRVbnBhY2tlcixcbiAgZ2V0RXh0VW5wYWNrZXI6IGdldEV4dFVucGFja2VyLFxuICBpbml0OiBpbml0XG59KTtcblxuZXhwb3J0cy5wcmVzZXQgPSBpbml0LmNhbGwoQ29kZWNCYXNlLnByZXNldCk7XG5cbmZ1bmN0aW9uIGdldERlY29kZXIob3B0aW9ucykge1xuICB2YXIgcmVhZFRva2VuID0gUmVhZFRva2VuLmdldFJlYWRUb2tlbihvcHRpb25zKTtcbiAgcmV0dXJuIGRlY29kZTtcblxuICBmdW5jdGlvbiBkZWNvZGUoZGVjb2Rlcikge1xuICAgIHZhciB0eXBlID0gcmVhZFVpbnQ4KGRlY29kZXIpO1xuICAgIHZhciBmdW5jID0gcmVhZFRva2VuW3R5cGVdO1xuICAgIGlmICghZnVuYykgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB0eXBlOiBcIiArICh0eXBlID8gKFwiMHhcIiArIHR5cGUudG9TdHJpbmcoMTYpKSA6IHR5cGUpKTtcbiAgICByZXR1cm4gZnVuYyhkZWNvZGVyKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgdGhpcy5kZWNvZGUgPSBnZXREZWNvZGVyKG9wdGlvbnMpO1xuXG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMucHJlc2V0KSB7XG4gICAgRXh0VW5wYWNrZXIuc2V0RXh0VW5wYWNrZXJzKHRoaXMpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIGFkZEV4dFVucGFja2VyKGV0eXBlLCB1bnBhY2tlcikge1xuICB2YXIgdW5wYWNrZXJzID0gdGhpcy5leHRVbnBhY2tlcnMgfHwgKHRoaXMuZXh0VW5wYWNrZXJzID0gW10pO1xuICB1bnBhY2tlcnNbZXR5cGVdID0gQ29kZWNCYXNlLmZpbHRlcih1bnBhY2tlcik7XG59XG5cbmZ1bmN0aW9uIGdldEV4dFVucGFja2VyKHR5cGUpIHtcbiAgdmFyIHVucGFja2VycyA9IHRoaXMuZXh0VW5wYWNrZXJzIHx8ICh0aGlzLmV4dFVucGFja2VycyA9IFtdKTtcbiAgcmV0dXJuIHVucGFja2Vyc1t0eXBlXSB8fCBleHRVbnBhY2tlcjtcblxuICBmdW5jdGlvbiBleHRVbnBhY2tlcihidWZmZXIpIHtcbiAgICByZXR1cm4gbmV3IEV4dEJ1ZmZlcihidWZmZXIsIHR5cGUpO1xuICB9XG59XG4iLCIvLyByZWFkLWZvcm1hdC5qc1xuXG52YXIgaWVlZTc1NCA9IHJlcXVpcmUoXCJpZWVlNzU0XCIpO1xudmFyIEludDY0QnVmZmVyID0gcmVxdWlyZShcImludDY0LWJ1ZmZlclwiKTtcbnZhciBVaW50NjRCRSA9IEludDY0QnVmZmVyLlVpbnQ2NEJFO1xudmFyIEludDY0QkUgPSBJbnQ2NEJ1ZmZlci5JbnQ2NEJFO1xuXG5leHBvcnRzLmdldFJlYWRGb3JtYXQgPSBnZXRSZWFkRm9ybWF0O1xuZXhwb3J0cy5yZWFkVWludDggPSB1aW50ODtcblxudmFyIEJ1ZmZlcmlzaCA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaFwiKTtcbnZhciBCdWZmZXJQcm90byA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaC1wcm90b1wiKTtcblxudmFyIEhBU19NQVAgPSAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIE1hcCk7XG52YXIgTk9fQVNTRVJUID0gdHJ1ZTtcblxuZnVuY3Rpb24gZ2V0UmVhZEZvcm1hdChvcHRpb25zKSB7XG4gIHZhciBiaW5hcnJheWJ1ZmZlciA9IEJ1ZmZlcmlzaC5oYXNBcnJheUJ1ZmZlciAmJiBvcHRpb25zICYmIG9wdGlvbnMuYmluYXJyYXlidWZmZXI7XG4gIHZhciBpbnQ2NCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5pbnQ2NDtcbiAgdmFyIHVzZW1hcCA9IEhBU19NQVAgJiYgb3B0aW9ucyAmJiBvcHRpb25zLnVzZW1hcDtcblxuICB2YXIgcmVhZEZvcm1hdCA9IHtcbiAgICBtYXA6ICh1c2VtYXAgPyBtYXBfdG9fbWFwIDogbWFwX3RvX29iaiksXG4gICAgYXJyYXk6IGFycmF5LFxuICAgIHN0cjogc3RyLFxuICAgIGJpbjogKGJpbmFycmF5YnVmZmVyID8gYmluX2FycmF5YnVmZmVyIDogYmluX2J1ZmZlciksXG4gICAgZXh0OiBleHQsXG4gICAgdWludDg6IHVpbnQ4LFxuICAgIHVpbnQxNjogdWludDE2LFxuICAgIHVpbnQzMjogdWludDMyLFxuICAgIHVpbnQ2NDogcmVhZCg4LCBpbnQ2NCA/IHJlYWRVSW50NjRCRV9pbnQ2NCA6IHJlYWRVSW50NjRCRSksXG4gICAgaW50ODogaW50OCxcbiAgICBpbnQxNjogaW50MTYsXG4gICAgaW50MzI6IGludDMyLFxuICAgIGludDY0OiByZWFkKDgsIGludDY0ID8gcmVhZEludDY0QkVfaW50NjQgOiByZWFkSW50NjRCRSksXG4gICAgZmxvYXQzMjogcmVhZCg0LCByZWFkRmxvYXRCRSksXG4gICAgZmxvYXQ2NDogcmVhZCg4LCByZWFkRG91YmxlQkUpXG4gIH07XG5cbiAgcmV0dXJuIHJlYWRGb3JtYXQ7XG59XG5cbmZ1bmN0aW9uIG1hcF90b19vYmooZGVjb2RlciwgbGVuKSB7XG4gIHZhciB2YWx1ZSA9IHt9O1xuICB2YXIgaTtcbiAgdmFyIGsgPSBuZXcgQXJyYXkobGVuKTtcbiAgdmFyIHYgPSBuZXcgQXJyYXkobGVuKTtcblxuICB2YXIgZGVjb2RlID0gZGVjb2Rlci5jb2RlYy5kZWNvZGU7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGtbaV0gPSBkZWNvZGUoZGVjb2Rlcik7XG4gICAgdltpXSA9IGRlY29kZShkZWNvZGVyKTtcbiAgfVxuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YWx1ZVtrW2ldXSA9IHZbaV07XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBtYXBfdG9fbWFwKGRlY29kZXIsIGxlbikge1xuICB2YXIgdmFsdWUgPSBuZXcgTWFwKCk7XG4gIHZhciBpO1xuICB2YXIgayA9IG5ldyBBcnJheShsZW4pO1xuICB2YXIgdiA9IG5ldyBBcnJheShsZW4pO1xuXG4gIHZhciBkZWNvZGUgPSBkZWNvZGVyLmNvZGVjLmRlY29kZTtcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAga1tpXSA9IGRlY29kZShkZWNvZGVyKTtcbiAgICB2W2ldID0gZGVjb2RlKGRlY29kZXIpO1xuICB9XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIHZhbHVlLnNldChrW2ldLCB2W2ldKTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGFycmF5KGRlY29kZXIsIGxlbikge1xuICB2YXIgdmFsdWUgPSBuZXcgQXJyYXkobGVuKTtcbiAgdmFyIGRlY29kZSA9IGRlY29kZXIuY29kZWMuZGVjb2RlO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgdmFsdWVbaV0gPSBkZWNvZGUoZGVjb2Rlcik7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBzdHIoZGVjb2RlciwgbGVuKSB7XG4gIHZhciBzdGFydCA9IGRlY29kZXIucmVzZXJ2ZShsZW4pO1xuICB2YXIgZW5kID0gc3RhcnQgKyBsZW47XG4gIHJldHVybiBCdWZmZXJQcm90by50b1N0cmluZy5jYWxsKGRlY29kZXIuYnVmZmVyLCBcInV0Zi04XCIsIHN0YXJ0LCBlbmQpO1xufVxuXG5mdW5jdGlvbiBiaW5fYnVmZmVyKGRlY29kZXIsIGxlbikge1xuICB2YXIgc3RhcnQgPSBkZWNvZGVyLnJlc2VydmUobGVuKTtcbiAgdmFyIGVuZCA9IHN0YXJ0ICsgbGVuO1xuICB2YXIgYnVmID0gQnVmZmVyUHJvdG8uc2xpY2UuY2FsbChkZWNvZGVyLmJ1ZmZlciwgc3RhcnQsIGVuZCk7XG4gIHJldHVybiBCdWZmZXJpc2guZnJvbShidWYpO1xufVxuXG5mdW5jdGlvbiBiaW5fYXJyYXlidWZmZXIoZGVjb2RlciwgbGVuKSB7XG4gIHZhciBzdGFydCA9IGRlY29kZXIucmVzZXJ2ZShsZW4pO1xuICB2YXIgZW5kID0gc3RhcnQgKyBsZW47XG4gIHZhciBidWYgPSBCdWZmZXJQcm90by5zbGljZS5jYWxsKGRlY29kZXIuYnVmZmVyLCBzdGFydCwgZW5kKTtcbiAgcmV0dXJuIEJ1ZmZlcmlzaC5VaW50OEFycmF5LmZyb20oYnVmKS5idWZmZXI7XG59XG5cbmZ1bmN0aW9uIGV4dChkZWNvZGVyLCBsZW4pIHtcbiAgdmFyIHN0YXJ0ID0gZGVjb2Rlci5yZXNlcnZlKGxlbisxKTtcbiAgdmFyIHR5cGUgPSBkZWNvZGVyLmJ1ZmZlcltzdGFydCsrXTtcbiAgdmFyIGVuZCA9IHN0YXJ0ICsgbGVuO1xuICB2YXIgdW5wYWNrID0gZGVjb2Rlci5jb2RlYy5nZXRFeHRVbnBhY2tlcih0eXBlKTtcbiAgaWYgKCF1bnBhY2spIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZXh0IHR5cGU6IFwiICsgKHR5cGUgPyAoXCIweFwiICsgdHlwZS50b1N0cmluZygxNikpIDogdHlwZSkpO1xuICB2YXIgYnVmID0gQnVmZmVyUHJvdG8uc2xpY2UuY2FsbChkZWNvZGVyLmJ1ZmZlciwgc3RhcnQsIGVuZCk7XG4gIHJldHVybiB1bnBhY2soYnVmKTtcbn1cblxuZnVuY3Rpb24gdWludDgoZGVjb2Rlcikge1xuICB2YXIgc3RhcnQgPSBkZWNvZGVyLnJlc2VydmUoMSk7XG4gIHJldHVybiBkZWNvZGVyLmJ1ZmZlcltzdGFydF07XG59XG5cbmZ1bmN0aW9uIGludDgoZGVjb2Rlcikge1xuICB2YXIgc3RhcnQgPSBkZWNvZGVyLnJlc2VydmUoMSk7XG4gIHZhciB2YWx1ZSA9IGRlY29kZXIuYnVmZmVyW3N0YXJ0XTtcbiAgcmV0dXJuICh2YWx1ZSAmIDB4ODApID8gdmFsdWUgLSAweDEwMCA6IHZhbHVlO1xufVxuXG5mdW5jdGlvbiB1aW50MTYoZGVjb2Rlcikge1xuICB2YXIgc3RhcnQgPSBkZWNvZGVyLnJlc2VydmUoMik7XG4gIHZhciBidWZmZXIgPSBkZWNvZGVyLmJ1ZmZlcjtcbiAgcmV0dXJuIChidWZmZXJbc3RhcnQrK10gPDwgOCkgfCBidWZmZXJbc3RhcnRdO1xufVxuXG5mdW5jdGlvbiBpbnQxNihkZWNvZGVyKSB7XG4gIHZhciBzdGFydCA9IGRlY29kZXIucmVzZXJ2ZSgyKTtcbiAgdmFyIGJ1ZmZlciA9IGRlY29kZXIuYnVmZmVyO1xuICB2YXIgdmFsdWUgPSAoYnVmZmVyW3N0YXJ0KytdIDw8IDgpIHwgYnVmZmVyW3N0YXJ0XTtcbiAgcmV0dXJuICh2YWx1ZSAmIDB4ODAwMCkgPyB2YWx1ZSAtIDB4MTAwMDAgOiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gdWludDMyKGRlY29kZXIpIHtcbiAgdmFyIHN0YXJ0ID0gZGVjb2Rlci5yZXNlcnZlKDQpO1xuICB2YXIgYnVmZmVyID0gZGVjb2Rlci5idWZmZXI7XG4gIHJldHVybiAoYnVmZmVyW3N0YXJ0KytdICogMTY3NzcyMTYpICsgKGJ1ZmZlcltzdGFydCsrXSA8PCAxNikgKyAoYnVmZmVyW3N0YXJ0KytdIDw8IDgpICsgYnVmZmVyW3N0YXJ0XTtcbn1cblxuZnVuY3Rpb24gaW50MzIoZGVjb2Rlcikge1xuICB2YXIgc3RhcnQgPSBkZWNvZGVyLnJlc2VydmUoNCk7XG4gIHZhciBidWZmZXIgPSBkZWNvZGVyLmJ1ZmZlcjtcbiAgcmV0dXJuIChidWZmZXJbc3RhcnQrK10gPDwgMjQpIHwgKGJ1ZmZlcltzdGFydCsrXSA8PCAxNikgfCAoYnVmZmVyW3N0YXJ0KytdIDw8IDgpIHwgYnVmZmVyW3N0YXJ0XTtcbn1cblxuZnVuY3Rpb24gcmVhZChsZW4sIG1ldGhvZCkge1xuICByZXR1cm4gZnVuY3Rpb24oZGVjb2Rlcikge1xuICAgIHZhciBzdGFydCA9IGRlY29kZXIucmVzZXJ2ZShsZW4pO1xuICAgIHJldHVybiBtZXRob2QuY2FsbChkZWNvZGVyLmJ1ZmZlciwgc3RhcnQsIE5PX0FTU0VSVCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHJlYWRVSW50NjRCRShzdGFydCkge1xuICByZXR1cm4gbmV3IFVpbnQ2NEJFKHRoaXMsIHN0YXJ0KS50b051bWJlcigpO1xufVxuXG5mdW5jdGlvbiByZWFkSW50NjRCRShzdGFydCkge1xuICByZXR1cm4gbmV3IEludDY0QkUodGhpcywgc3RhcnQpLnRvTnVtYmVyKCk7XG59XG5cbmZ1bmN0aW9uIHJlYWRVSW50NjRCRV9pbnQ2NChzdGFydCkge1xuICByZXR1cm4gbmV3IFVpbnQ2NEJFKHRoaXMsIHN0YXJ0KTtcbn1cblxuZnVuY3Rpb24gcmVhZEludDY0QkVfaW50NjQoc3RhcnQpIHtcbiAgcmV0dXJuIG5ldyBJbnQ2NEJFKHRoaXMsIHN0YXJ0KTtcbn1cblxuZnVuY3Rpb24gcmVhZEZsb2F0QkUoc3RhcnQpIHtcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBzdGFydCwgZmFsc2UsIDIzLCA0KTtcbn1cblxuZnVuY3Rpb24gcmVhZERvdWJsZUJFKHN0YXJ0KSB7XG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgc3RhcnQsIGZhbHNlLCA1MiwgOCk7XG59IiwiLy8gcmVhZC10b2tlbi5qc1xuXG52YXIgUmVhZEZvcm1hdCA9IHJlcXVpcmUoXCIuL3JlYWQtZm9ybWF0XCIpO1xuXG5leHBvcnRzLmdldFJlYWRUb2tlbiA9IGdldFJlYWRUb2tlbjtcblxuZnVuY3Rpb24gZ2V0UmVhZFRva2VuKG9wdGlvbnMpIHtcbiAgdmFyIGZvcm1hdCA9IFJlYWRGb3JtYXQuZ2V0UmVhZEZvcm1hdChvcHRpb25zKTtcblxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnVzZXJhdykge1xuICAgIHJldHVybiBpbml0X3VzZXJhdyhmb3JtYXQpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBpbml0X3Rva2VuKGZvcm1hdCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdF90b2tlbihmb3JtYXQpIHtcbiAgdmFyIGk7XG4gIHZhciB0b2tlbiA9IG5ldyBBcnJheSgyNTYpO1xuXG4gIC8vIHBvc2l0aXZlIGZpeGludCAtLSAweDAwIC0gMHg3ZlxuICBmb3IgKGkgPSAweDAwOyBpIDw9IDB4N2Y7IGkrKykge1xuICAgIHRva2VuW2ldID0gY29uc3RhbnQoaSk7XG4gIH1cblxuICAvLyBmaXhtYXAgLS0gMHg4MCAtIDB4OGZcbiAgZm9yIChpID0gMHg4MDsgaSA8PSAweDhmOyBpKyspIHtcbiAgICB0b2tlbltpXSA9IGZpeChpIC0gMHg4MCwgZm9ybWF0Lm1hcCk7XG4gIH1cblxuICAvLyBmaXhhcnJheSAtLSAweDkwIC0gMHg5ZlxuICBmb3IgKGkgPSAweDkwOyBpIDw9IDB4OWY7IGkrKykge1xuICAgIHRva2VuW2ldID0gZml4KGkgLSAweDkwLCBmb3JtYXQuYXJyYXkpO1xuICB9XG5cbiAgLy8gZml4c3RyIC0tIDB4YTAgLSAweGJmXG4gIGZvciAoaSA9IDB4YTA7IGkgPD0gMHhiZjsgaSsrKSB7XG4gICAgdG9rZW5baV0gPSBmaXgoaSAtIDB4YTAsIGZvcm1hdC5zdHIpO1xuICB9XG5cbiAgLy8gbmlsIC0tIDB4YzBcbiAgdG9rZW5bMHhjMF0gPSBjb25zdGFudChudWxsKTtcblxuICAvLyAobmV2ZXIgdXNlZCkgLS0gMHhjMVxuICB0b2tlblsweGMxXSA9IG51bGw7XG5cbiAgLy8gZmFsc2UgLS0gMHhjMlxuICAvLyB0cnVlIC0tIDB4YzNcbiAgdG9rZW5bMHhjMl0gPSBjb25zdGFudChmYWxzZSk7XG4gIHRva2VuWzB4YzNdID0gY29uc3RhbnQodHJ1ZSk7XG5cbiAgLy8gYmluIDggLS0gMHhjNFxuICAvLyBiaW4gMTYgLS0gMHhjNVxuICAvLyBiaW4gMzIgLS0gMHhjNlxuICB0b2tlblsweGM0XSA9IGZsZXgoZm9ybWF0LnVpbnQ4LCBmb3JtYXQuYmluKTtcbiAgdG9rZW5bMHhjNV0gPSBmbGV4KGZvcm1hdC51aW50MTYsIGZvcm1hdC5iaW4pO1xuICB0b2tlblsweGM2XSA9IGZsZXgoZm9ybWF0LnVpbnQzMiwgZm9ybWF0LmJpbik7XG5cbiAgLy8gZXh0IDggLS0gMHhjN1xuICAvLyBleHQgMTYgLS0gMHhjOFxuICAvLyBleHQgMzIgLS0gMHhjOVxuICB0b2tlblsweGM3XSA9IGZsZXgoZm9ybWF0LnVpbnQ4LCBmb3JtYXQuZXh0KTtcbiAgdG9rZW5bMHhjOF0gPSBmbGV4KGZvcm1hdC51aW50MTYsIGZvcm1hdC5leHQpO1xuICB0b2tlblsweGM5XSA9IGZsZXgoZm9ybWF0LnVpbnQzMiwgZm9ybWF0LmV4dCk7XG5cbiAgLy8gZmxvYXQgMzIgLS0gMHhjYVxuICAvLyBmbG9hdCA2NCAtLSAweGNiXG4gIHRva2VuWzB4Y2FdID0gZm9ybWF0LmZsb2F0MzI7XG4gIHRva2VuWzB4Y2JdID0gZm9ybWF0LmZsb2F0NjQ7XG5cbiAgLy8gdWludCA4IC0tIDB4Y2NcbiAgLy8gdWludCAxNiAtLSAweGNkXG4gIC8vIHVpbnQgMzIgLS0gMHhjZVxuICAvLyB1aW50IDY0IC0tIDB4Y2ZcbiAgdG9rZW5bMHhjY10gPSBmb3JtYXQudWludDg7XG4gIHRva2VuWzB4Y2RdID0gZm9ybWF0LnVpbnQxNjtcbiAgdG9rZW5bMHhjZV0gPSBmb3JtYXQudWludDMyO1xuICB0b2tlblsweGNmXSA9IGZvcm1hdC51aW50NjQ7XG5cbiAgLy8gaW50IDggLS0gMHhkMFxuICAvLyBpbnQgMTYgLS0gMHhkMVxuICAvLyBpbnQgMzIgLS0gMHhkMlxuICAvLyBpbnQgNjQgLS0gMHhkM1xuICB0b2tlblsweGQwXSA9IGZvcm1hdC5pbnQ4O1xuICB0b2tlblsweGQxXSA9IGZvcm1hdC5pbnQxNjtcbiAgdG9rZW5bMHhkMl0gPSBmb3JtYXQuaW50MzI7XG4gIHRva2VuWzB4ZDNdID0gZm9ybWF0LmludDY0O1xuXG4gIC8vIGZpeGV4dCAxIC0tIDB4ZDRcbiAgLy8gZml4ZXh0IDIgLS0gMHhkNVxuICAvLyBmaXhleHQgNCAtLSAweGQ2XG4gIC8vIGZpeGV4dCA4IC0tIDB4ZDdcbiAgLy8gZml4ZXh0IDE2IC0tIDB4ZDhcbiAgdG9rZW5bMHhkNF0gPSBmaXgoMSwgZm9ybWF0LmV4dCk7XG4gIHRva2VuWzB4ZDVdID0gZml4KDIsIGZvcm1hdC5leHQpO1xuICB0b2tlblsweGQ2XSA9IGZpeCg0LCBmb3JtYXQuZXh0KTtcbiAgdG9rZW5bMHhkN10gPSBmaXgoOCwgZm9ybWF0LmV4dCk7XG4gIHRva2VuWzB4ZDhdID0gZml4KDE2LCBmb3JtYXQuZXh0KTtcblxuICAvLyBzdHIgOCAtLSAweGQ5XG4gIC8vIHN0ciAxNiAtLSAweGRhXG4gIC8vIHN0ciAzMiAtLSAweGRiXG4gIHRva2VuWzB4ZDldID0gZmxleChmb3JtYXQudWludDgsIGZvcm1hdC5zdHIpO1xuICB0b2tlblsweGRhXSA9IGZsZXgoZm9ybWF0LnVpbnQxNiwgZm9ybWF0LnN0cik7XG4gIHRva2VuWzB4ZGJdID0gZmxleChmb3JtYXQudWludDMyLCBmb3JtYXQuc3RyKTtcblxuICAvLyBhcnJheSAxNiAtLSAweGRjXG4gIC8vIGFycmF5IDMyIC0tIDB4ZGRcbiAgdG9rZW5bMHhkY10gPSBmbGV4KGZvcm1hdC51aW50MTYsIGZvcm1hdC5hcnJheSk7XG4gIHRva2VuWzB4ZGRdID0gZmxleChmb3JtYXQudWludDMyLCBmb3JtYXQuYXJyYXkpO1xuXG4gIC8vIG1hcCAxNiAtLSAweGRlXG4gIC8vIG1hcCAzMiAtLSAweGRmXG4gIHRva2VuWzB4ZGVdID0gZmxleChmb3JtYXQudWludDE2LCBmb3JtYXQubWFwKTtcbiAgdG9rZW5bMHhkZl0gPSBmbGV4KGZvcm1hdC51aW50MzIsIGZvcm1hdC5tYXApO1xuXG4gIC8vIG5lZ2F0aXZlIGZpeGludCAtLSAweGUwIC0gMHhmZlxuICBmb3IgKGkgPSAweGUwOyBpIDw9IDB4ZmY7IGkrKykge1xuICAgIHRva2VuW2ldID0gY29uc3RhbnQoaSAtIDB4MTAwKTtcbiAgfVxuXG4gIHJldHVybiB0b2tlbjtcbn1cblxuZnVuY3Rpb24gaW5pdF91c2VyYXcoZm9ybWF0KSB7XG4gIHZhciBpO1xuICB2YXIgdG9rZW4gPSBpbml0X3Rva2VuKGZvcm1hdCkuc2xpY2UoKTtcblxuICAvLyByYXcgOCAtLSAweGQ5XG4gIC8vIHJhdyAxNiAtLSAweGRhXG4gIC8vIHJhdyAzMiAtLSAweGRiXG4gIHRva2VuWzB4ZDldID0gdG9rZW5bMHhjNF07XG4gIHRva2VuWzB4ZGFdID0gdG9rZW5bMHhjNV07XG4gIHRva2VuWzB4ZGJdID0gdG9rZW5bMHhjNl07XG5cbiAgLy8gZml4cmF3IC0tIDB4YTAgLSAweGJmXG4gIGZvciAoaSA9IDB4YTA7IGkgPD0gMHhiZjsgaSsrKSB7XG4gICAgdG9rZW5baV0gPSBmaXgoaSAtIDB4YTAsIGZvcm1hdC5iaW4pO1xuICB9XG5cbiAgcmV0dXJuIHRva2VuO1xufVxuXG5mdW5jdGlvbiBjb25zdGFudCh2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xufVxuXG5mdW5jdGlvbiBmbGV4KGxlbkZ1bmMsIGRlY29kZUZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGRlY29kZXIpIHtcbiAgICB2YXIgbGVuID0gbGVuRnVuYyhkZWNvZGVyKTtcbiAgICByZXR1cm4gZGVjb2RlRnVuYyhkZWNvZGVyLCBsZW4pO1xuICB9O1xufVxuXG5mdW5jdGlvbiBmaXgobGVuLCBtZXRob2QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGRlY29kZXIpIHtcbiAgICByZXR1cm4gbWV0aG9kKGRlY29kZXIsIGxlbik7XG4gIH07XG59XG4iLCIvLyB3cml0ZS1jb3JlLmpzXG5cbnZhciBFeHRCdWZmZXIgPSByZXF1aXJlKFwiLi9leHQtYnVmZmVyXCIpLkV4dEJ1ZmZlcjtcbnZhciBFeHRQYWNrZXIgPSByZXF1aXJlKFwiLi9leHQtcGFja2VyXCIpO1xudmFyIFdyaXRlVHlwZSA9IHJlcXVpcmUoXCIuL3dyaXRlLXR5cGVcIik7XG52YXIgQ29kZWNCYXNlID0gcmVxdWlyZShcIi4vY29kZWMtYmFzZVwiKTtcblxuQ29kZWNCYXNlLmluc3RhbGwoe1xuICBhZGRFeHRQYWNrZXI6IGFkZEV4dFBhY2tlcixcbiAgZ2V0RXh0UGFja2VyOiBnZXRFeHRQYWNrZXIsXG4gIGluaXQ6IGluaXRcbn0pO1xuXG5leHBvcnRzLnByZXNldCA9IGluaXQuY2FsbChDb2RlY0Jhc2UucHJlc2V0KTtcblxuZnVuY3Rpb24gZ2V0RW5jb2RlcihvcHRpb25zKSB7XG4gIHZhciB3cml0ZVR5cGUgPSBXcml0ZVR5cGUuZ2V0V3JpdGVUeXBlKG9wdGlvbnMpO1xuICByZXR1cm4gZW5jb2RlO1xuXG4gIGZ1bmN0aW9uIGVuY29kZShlbmNvZGVyLCB2YWx1ZSkge1xuICAgIHZhciBmdW5jID0gd3JpdGVUeXBlW3R5cGVvZiB2YWx1ZV07XG4gICAgaWYgKCFmdW5jKSB0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCB0eXBlIFxcXCJcIiArICh0eXBlb2YgdmFsdWUpICsgXCJcXFwiOiBcIiArIHZhbHVlKTtcbiAgICBmdW5jKGVuY29kZXIsIHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgdGhpcy5lbmNvZGUgPSBnZXRFbmNvZGVyKG9wdGlvbnMpO1xuXG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMucHJlc2V0KSB7XG4gICAgRXh0UGFja2VyLnNldEV4dFBhY2tlcnModGhpcyk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gYWRkRXh0UGFja2VyKGV0eXBlLCBDbGFzcywgcGFja2VyKSB7XG4gIHBhY2tlciA9IENvZGVjQmFzZS5maWx0ZXIocGFja2VyKTtcbiAgdmFyIG5hbWUgPSBDbGFzcy5uYW1lO1xuICBpZiAobmFtZSAmJiBuYW1lICE9PSBcIk9iamVjdFwiKSB7XG4gICAgdmFyIHBhY2tlcnMgPSB0aGlzLmV4dFBhY2tlcnMgfHwgKHRoaXMuZXh0UGFja2VycyA9IHt9KTtcbiAgICBwYWNrZXJzW25hbWVdID0gZXh0UGFja2VyO1xuICB9IGVsc2Uge1xuICAgIC8vIGZhbGxiYWNrIGZvciBJRVxuICAgIHZhciBsaXN0ID0gdGhpcy5leHRFbmNvZGVyTGlzdCB8fCAodGhpcy5leHRFbmNvZGVyTGlzdCA9IFtdKTtcbiAgICBsaXN0LnVuc2hpZnQoW0NsYXNzLCBleHRQYWNrZXJdKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dFBhY2tlcih2YWx1ZSkge1xuICAgIGlmIChwYWNrZXIpIHZhbHVlID0gcGFja2VyKHZhbHVlKTtcbiAgICByZXR1cm4gbmV3IEV4dEJ1ZmZlcih2YWx1ZSwgZXR5cGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEV4dFBhY2tlcih2YWx1ZSkge1xuICB2YXIgcGFja2VycyA9IHRoaXMuZXh0UGFja2VycyB8fCAodGhpcy5leHRQYWNrZXJzID0ge30pO1xuICB2YXIgYyA9IHZhbHVlLmNvbnN0cnVjdG9yO1xuICB2YXIgZSA9IGMgJiYgYy5uYW1lICYmIHBhY2tlcnNbYy5uYW1lXTtcbiAgaWYgKGUpIHJldHVybiBlO1xuXG4gIC8vIGZhbGxiYWNrIGZvciBJRVxuICB2YXIgbGlzdCA9IHRoaXMuZXh0RW5jb2Rlckxpc3QgfHwgKHRoaXMuZXh0RW5jb2Rlckxpc3QgPSBbXSk7XG4gIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIHZhciBwYWlyID0gbGlzdFtpXTtcbiAgICBpZiAoYyA9PT0gcGFpclswXSkgcmV0dXJuIHBhaXJbMV07XG4gIH1cbn1cbiIsIi8vIHdyaXRlLXRva2VuLmpzXG5cbnZhciBpZWVlNzU0ID0gcmVxdWlyZShcImllZWU3NTRcIik7XG52YXIgSW50NjRCdWZmZXIgPSByZXF1aXJlKFwiaW50NjQtYnVmZmVyXCIpO1xudmFyIFVpbnQ2NEJFID0gSW50NjRCdWZmZXIuVWludDY0QkU7XG52YXIgSW50NjRCRSA9IEludDY0QnVmZmVyLkludDY0QkU7XG5cbnZhciB1aW50OCA9IHJlcXVpcmUoXCIuL3dyaXRlLXVpbnQ4XCIpLnVpbnQ4O1xudmFyIEJ1ZmZlcmlzaCA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaFwiKTtcbnZhciBCdWZmZXIgPSBCdWZmZXJpc2guZ2xvYmFsO1xudmFyIElTX0JVRkZFUl9TSElNID0gQnVmZmVyaXNoLmhhc0J1ZmZlciAmJiAoXCJUWVBFRF9BUlJBWV9TVVBQT1JUXCIgaW4gQnVmZmVyKTtcbnZhciBOT19UWVBFRF9BUlJBWSA9IElTX0JVRkZFUl9TSElNICYmICFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVDtcbnZhciBCdWZmZXJfcHJvdG90eXBlID0gQnVmZmVyaXNoLmhhc0J1ZmZlciAmJiBCdWZmZXIucHJvdG90eXBlIHx8IHt9O1xuXG5leHBvcnRzLmdldFdyaXRlVG9rZW4gPSBnZXRXcml0ZVRva2VuO1xuXG5mdW5jdGlvbiBnZXRXcml0ZVRva2VuKG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy51aW50OGFycmF5KSB7XG4gICAgcmV0dXJuIGluaXRfdWludDhhcnJheSgpO1xuICB9IGVsc2UgaWYgKE5PX1RZUEVEX0FSUkFZIHx8IChCdWZmZXJpc2guaGFzQnVmZmVyICYmIG9wdGlvbnMgJiYgb3B0aW9ucy5zYWZlKSkge1xuICAgIHJldHVybiBpbml0X3NhZmUoKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gaW5pdF90b2tlbigpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXRfdWludDhhcnJheSgpIHtcbiAgdmFyIHRva2VuID0gaW5pdF90b2tlbigpO1xuXG4gIC8vIGZsb2F0IDMyIC0tIDB4Y2FcbiAgLy8gZmxvYXQgNjQgLS0gMHhjYlxuICB0b2tlblsweGNhXSA9IHdyaXRlTigweGNhLCA0LCB3cml0ZUZsb2F0QkUpO1xuICB0b2tlblsweGNiXSA9IHdyaXRlTigweGNiLCA4LCB3cml0ZURvdWJsZUJFKTtcblxuICByZXR1cm4gdG9rZW47XG59XG5cbi8vIE5vZGUuanMgYW5kIGJyb3dzZXJzIHdpdGggVHlwZWRBcnJheVxuXG5mdW5jdGlvbiBpbml0X3Rva2VuKCkge1xuICAvLyAoaW1tZWRpYXRlIHZhbHVlcylcbiAgLy8gcG9zaXRpdmUgZml4aW50IC0tIDB4MDAgLSAweDdmXG4gIC8vIG5pbCAtLSAweGMwXG4gIC8vIGZhbHNlIC0tIDB4YzJcbiAgLy8gdHJ1ZSAtLSAweGMzXG4gIC8vIG5lZ2F0aXZlIGZpeGludCAtLSAweGUwIC0gMHhmZlxuICB2YXIgdG9rZW4gPSB1aW50OC5zbGljZSgpO1xuXG4gIC8vIGJpbiA4IC0tIDB4YzRcbiAgLy8gYmluIDE2IC0tIDB4YzVcbiAgLy8gYmluIDMyIC0tIDB4YzZcbiAgdG9rZW5bMHhjNF0gPSB3cml0ZTEoMHhjNCk7XG4gIHRva2VuWzB4YzVdID0gd3JpdGUyKDB4YzUpO1xuICB0b2tlblsweGM2XSA9IHdyaXRlNCgweGM2KTtcblxuICAvLyBleHQgOCAtLSAweGM3XG4gIC8vIGV4dCAxNiAtLSAweGM4XG4gIC8vIGV4dCAzMiAtLSAweGM5XG4gIHRva2VuWzB4YzddID0gd3JpdGUxKDB4YzcpO1xuICB0b2tlblsweGM4XSA9IHdyaXRlMigweGM4KTtcbiAgdG9rZW5bMHhjOV0gPSB3cml0ZTQoMHhjOSk7XG5cbiAgLy8gZmxvYXQgMzIgLS0gMHhjYVxuICAvLyBmbG9hdCA2NCAtLSAweGNiXG4gIHRva2VuWzB4Y2FdID0gd3JpdGVOKDB4Y2EsIDQsIChCdWZmZXJfcHJvdG90eXBlLndyaXRlRmxvYXRCRSB8fCB3cml0ZUZsb2F0QkUpLCB0cnVlKTtcbiAgdG9rZW5bMHhjYl0gPSB3cml0ZU4oMHhjYiwgOCwgKEJ1ZmZlcl9wcm90b3R5cGUud3JpdGVEb3VibGVCRSB8fCB3cml0ZURvdWJsZUJFKSwgdHJ1ZSk7XG5cbiAgLy8gdWludCA4IC0tIDB4Y2NcbiAgLy8gdWludCAxNiAtLSAweGNkXG4gIC8vIHVpbnQgMzIgLS0gMHhjZVxuICAvLyB1aW50IDY0IC0tIDB4Y2ZcbiAgdG9rZW5bMHhjY10gPSB3cml0ZTEoMHhjYyk7XG4gIHRva2VuWzB4Y2RdID0gd3JpdGUyKDB4Y2QpO1xuICB0b2tlblsweGNlXSA9IHdyaXRlNCgweGNlKTtcbiAgdG9rZW5bMHhjZl0gPSB3cml0ZU4oMHhjZiwgOCwgd3JpdGVVSW50NjRCRSk7XG5cbiAgLy8gaW50IDggLS0gMHhkMFxuICAvLyBpbnQgMTYgLS0gMHhkMVxuICAvLyBpbnQgMzIgLS0gMHhkMlxuICAvLyBpbnQgNjQgLS0gMHhkM1xuICB0b2tlblsweGQwXSA9IHdyaXRlMSgweGQwKTtcbiAgdG9rZW5bMHhkMV0gPSB3cml0ZTIoMHhkMSk7XG4gIHRva2VuWzB4ZDJdID0gd3JpdGU0KDB4ZDIpO1xuICB0b2tlblsweGQzXSA9IHdyaXRlTigweGQzLCA4LCB3cml0ZUludDY0QkUpO1xuXG4gIC8vIHN0ciA4IC0tIDB4ZDlcbiAgLy8gc3RyIDE2IC0tIDB4ZGFcbiAgLy8gc3RyIDMyIC0tIDB4ZGJcbiAgdG9rZW5bMHhkOV0gPSB3cml0ZTEoMHhkOSk7XG4gIHRva2VuWzB4ZGFdID0gd3JpdGUyKDB4ZGEpO1xuICB0b2tlblsweGRiXSA9IHdyaXRlNCgweGRiKTtcblxuICAvLyBhcnJheSAxNiAtLSAweGRjXG4gIC8vIGFycmF5IDMyIC0tIDB4ZGRcbiAgdG9rZW5bMHhkY10gPSB3cml0ZTIoMHhkYyk7XG4gIHRva2VuWzB4ZGRdID0gd3JpdGU0KDB4ZGQpO1xuXG4gIC8vIG1hcCAxNiAtLSAweGRlXG4gIC8vIG1hcCAzMiAtLSAweGRmXG4gIHRva2VuWzB4ZGVdID0gd3JpdGUyKDB4ZGUpO1xuICB0b2tlblsweGRmXSA9IHdyaXRlNCgweGRmKTtcblxuICByZXR1cm4gdG9rZW47XG59XG5cbi8vIHNhZmUgbW9kZTogZm9yIG9sZCBicm93c2VycyBhbmQgd2hvIG5lZWRzIGFzc2VydHNcblxuZnVuY3Rpb24gaW5pdF9zYWZlKCkge1xuICAvLyAoaW1tZWRpYXRlIHZhbHVlcylcbiAgLy8gcG9zaXRpdmUgZml4aW50IC0tIDB4MDAgLSAweDdmXG4gIC8vIG5pbCAtLSAweGMwXG4gIC8vIGZhbHNlIC0tIDB4YzJcbiAgLy8gdHJ1ZSAtLSAweGMzXG4gIC8vIG5lZ2F0aXZlIGZpeGludCAtLSAweGUwIC0gMHhmZlxuICB2YXIgdG9rZW4gPSB1aW50OC5zbGljZSgpO1xuXG4gIC8vIGJpbiA4IC0tIDB4YzRcbiAgLy8gYmluIDE2IC0tIDB4YzVcbiAgLy8gYmluIDMyIC0tIDB4YzZcbiAgdG9rZW5bMHhjNF0gPSB3cml0ZU4oMHhjNCwgMSwgQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4KTtcbiAgdG9rZW5bMHhjNV0gPSB3cml0ZU4oMHhjNSwgMiwgQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFKTtcbiAgdG9rZW5bMHhjNl0gPSB3cml0ZU4oMHhjNiwgNCwgQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFKTtcblxuICAvLyBleHQgOCAtLSAweGM3XG4gIC8vIGV4dCAxNiAtLSAweGM4XG4gIC8vIGV4dCAzMiAtLSAweGM5XG4gIHRva2VuWzB4YzddID0gd3JpdGVOKDB4YzcsIDEsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCk7XG4gIHRva2VuWzB4YzhdID0gd3JpdGVOKDB4YzgsIDIsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSk7XG4gIHRva2VuWzB4YzldID0gd3JpdGVOKDB4YzksIDQsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSk7XG5cbiAgLy8gZmxvYXQgMzIgLS0gMHhjYVxuICAvLyBmbG9hdCA2NCAtLSAweGNiXG4gIHRva2VuWzB4Y2FdID0gd3JpdGVOKDB4Y2EsIDQsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFKTtcbiAgdG9rZW5bMHhjYl0gPSB3cml0ZU4oMHhjYiwgOCwgQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFKTtcblxuICAvLyB1aW50IDggLS0gMHhjY1xuICAvLyB1aW50IDE2IC0tIDB4Y2RcbiAgLy8gdWludCAzMiAtLSAweGNlXG4gIC8vIHVpbnQgNjQgLS0gMHhjZlxuICB0b2tlblsweGNjXSA9IHdyaXRlTigweGNjLCAxLCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDgpO1xuICB0b2tlblsweGNkXSA9IHdyaXRlTigweGNkLCAyLCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUpO1xuICB0b2tlblsweGNlXSA9IHdyaXRlTigweGNlLCA0LCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUpO1xuICB0b2tlblsweGNmXSA9IHdyaXRlTigweGNmLCA4LCB3cml0ZVVJbnQ2NEJFKTtcblxuICAvLyBpbnQgOCAtLSAweGQwXG4gIC8vIGludCAxNiAtLSAweGQxXG4gIC8vIGludCAzMiAtLSAweGQyXG4gIC8vIGludCA2NCAtLSAweGQzXG4gIHRva2VuWzB4ZDBdID0gd3JpdGVOKDB4ZDAsIDEsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4KTtcbiAgdG9rZW5bMHhkMV0gPSB3cml0ZU4oMHhkMSwgMiwgQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2QkUpO1xuICB0b2tlblsweGQyXSA9IHdyaXRlTigweGQyLCA0LCBCdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJCRSk7XG4gIHRva2VuWzB4ZDNdID0gd3JpdGVOKDB4ZDMsIDgsIHdyaXRlSW50NjRCRSk7XG5cbiAgLy8gc3RyIDggLS0gMHhkOVxuICAvLyBzdHIgMTYgLS0gMHhkYVxuICAvLyBzdHIgMzIgLS0gMHhkYlxuICB0b2tlblsweGQ5XSA9IHdyaXRlTigweGQ5LCAxLCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDgpO1xuICB0b2tlblsweGRhXSA9IHdyaXRlTigweGRhLCAyLCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUpO1xuICB0b2tlblsweGRiXSA9IHdyaXRlTigweGRiLCA0LCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUpO1xuXG4gIC8vIGFycmF5IDE2IC0tIDB4ZGNcbiAgLy8gYXJyYXkgMzIgLS0gMHhkZFxuICB0b2tlblsweGRjXSA9IHdyaXRlTigweGRjLCAyLCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUpO1xuICB0b2tlblsweGRkXSA9IHdyaXRlTigweGRkLCA0LCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUpO1xuXG4gIC8vIG1hcCAxNiAtLSAweGRlXG4gIC8vIG1hcCAzMiAtLSAweGRmXG4gIHRva2VuWzB4ZGVdID0gd3JpdGVOKDB4ZGUsIDIsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSk7XG4gIHRva2VuWzB4ZGZdID0gd3JpdGVOKDB4ZGYsIDQsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSk7XG5cbiAgcmV0dXJuIHRva2VuO1xufVxuXG5mdW5jdGlvbiB3cml0ZTEodHlwZSkge1xuICByZXR1cm4gZnVuY3Rpb24oZW5jb2RlciwgdmFsdWUpIHtcbiAgICB2YXIgb2Zmc2V0ID0gZW5jb2Rlci5yZXNlcnZlKDIpO1xuICAgIHZhciBidWZmZXIgPSBlbmNvZGVyLmJ1ZmZlcjtcbiAgICBidWZmZXJbb2Zmc2V0KytdID0gdHlwZTtcbiAgICBidWZmZXJbb2Zmc2V0XSA9IHZhbHVlO1xuICB9O1xufVxuXG5mdW5jdGlvbiB3cml0ZTIodHlwZSkge1xuICByZXR1cm4gZnVuY3Rpb24oZW5jb2RlciwgdmFsdWUpIHtcbiAgICB2YXIgb2Zmc2V0ID0gZW5jb2Rlci5yZXNlcnZlKDMpO1xuICAgIHZhciBidWZmZXIgPSBlbmNvZGVyLmJ1ZmZlcjtcbiAgICBidWZmZXJbb2Zmc2V0KytdID0gdHlwZTtcbiAgICBidWZmZXJbb2Zmc2V0KytdID0gdmFsdWUgPj4+IDg7XG4gICAgYnVmZmVyW29mZnNldF0gPSB2YWx1ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gd3JpdGU0KHR5cGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGVuY29kZXIsIHZhbHVlKSB7XG4gICAgdmFyIG9mZnNldCA9IGVuY29kZXIucmVzZXJ2ZSg1KTtcbiAgICB2YXIgYnVmZmVyID0gZW5jb2Rlci5idWZmZXI7XG4gICAgYnVmZmVyW29mZnNldCsrXSA9IHR5cGU7XG4gICAgYnVmZmVyW29mZnNldCsrXSA9IHZhbHVlID4+PiAyNDtcbiAgICBidWZmZXJbb2Zmc2V0KytdID0gdmFsdWUgPj4+IDE2O1xuICAgIGJ1ZmZlcltvZmZzZXQrK10gPSB2YWx1ZSA+Pj4gODtcbiAgICBidWZmZXJbb2Zmc2V0XSA9IHZhbHVlO1xuICB9O1xufVxuXG5mdW5jdGlvbiB3cml0ZU4odHlwZSwgbGVuLCBtZXRob2QsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBmdW5jdGlvbihlbmNvZGVyLCB2YWx1ZSkge1xuICAgIHZhciBvZmZzZXQgPSBlbmNvZGVyLnJlc2VydmUobGVuICsgMSk7XG4gICAgZW5jb2Rlci5idWZmZXJbb2Zmc2V0KytdID0gdHlwZTtcbiAgICBtZXRob2QuY2FsbChlbmNvZGVyLmJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiB3cml0ZVVJbnQ2NEJFKHZhbHVlLCBvZmZzZXQpIHtcbiAgbmV3IFVpbnQ2NEJFKHRoaXMsIG9mZnNldCwgdmFsdWUpO1xufVxuXG5mdW5jdGlvbiB3cml0ZUludDY0QkUodmFsdWUsIG9mZnNldCkge1xuICBuZXcgSW50NjRCRSh0aGlzLCBvZmZzZXQsIHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG9hdEJFKHZhbHVlLCBvZmZzZXQpIHtcbiAgaWVlZTc1NC53cml0ZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgMjMsIDQpO1xufVxuXG5mdW5jdGlvbiB3cml0ZURvdWJsZUJFKHZhbHVlLCBvZmZzZXQpIHtcbiAgaWVlZTc1NC53cml0ZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgNTIsIDgpO1xufVxuIiwiLy8gd3JpdGUtdHlwZS5qc1xuXG52YXIgSVNfQVJSQVkgPSByZXF1aXJlKFwiaXNhcnJheVwiKTtcbnZhciBJbnQ2NEJ1ZmZlciA9IHJlcXVpcmUoXCJpbnQ2NC1idWZmZXJcIik7XG52YXIgVWludDY0QkUgPSBJbnQ2NEJ1ZmZlci5VaW50NjRCRTtcbnZhciBJbnQ2NEJFID0gSW50NjRCdWZmZXIuSW50NjRCRTtcblxudmFyIEJ1ZmZlcmlzaCA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaFwiKTtcbnZhciBCdWZmZXJQcm90byA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaC1wcm90b1wiKTtcbnZhciBXcml0ZVRva2VuID0gcmVxdWlyZShcIi4vd3JpdGUtdG9rZW5cIik7XG52YXIgdWludDggPSByZXF1aXJlKFwiLi93cml0ZS11aW50OFwiKS51aW50ODtcbnZhciBFeHRCdWZmZXIgPSByZXF1aXJlKFwiLi9leHQtYnVmZmVyXCIpLkV4dEJ1ZmZlcjtcblxudmFyIEhBU19VSU5UOEFSUkFZID0gKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBVaW50OEFycmF5KTtcbnZhciBIQVNfTUFQID0gKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBNYXApO1xuXG52YXIgZXh0bWFwID0gW107XG5leHRtYXBbMV0gPSAweGQ0O1xuZXh0bWFwWzJdID0gMHhkNTtcbmV4dG1hcFs0XSA9IDB4ZDY7XG5leHRtYXBbOF0gPSAweGQ3O1xuZXh0bWFwWzE2XSA9IDB4ZDg7XG5cbmV4cG9ydHMuZ2V0V3JpdGVUeXBlID0gZ2V0V3JpdGVUeXBlO1xuXG5mdW5jdGlvbiBnZXRXcml0ZVR5cGUob3B0aW9ucykge1xuICB2YXIgdG9rZW4gPSBXcml0ZVRva2VuLmdldFdyaXRlVG9rZW4ob3B0aW9ucyk7XG4gIHZhciB1c2VyYXcgPSBvcHRpb25zICYmIG9wdGlvbnMudXNlcmF3O1xuICB2YXIgYmluYXJyYXlidWZmZXIgPSBIQVNfVUlOVDhBUlJBWSAmJiBvcHRpb25zICYmIG9wdGlvbnMuYmluYXJyYXlidWZmZXI7XG4gIHZhciBpc0J1ZmZlciA9IGJpbmFycmF5YnVmZmVyID8gQnVmZmVyaXNoLmlzQXJyYXlCdWZmZXIgOiBCdWZmZXJpc2guaXNCdWZmZXI7XG4gIHZhciBiaW4gPSBiaW5hcnJheWJ1ZmZlciA/IGJpbl9hcnJheWJ1ZmZlciA6IGJpbl9idWZmZXI7XG4gIHZhciB1c2VtYXAgPSBIQVNfTUFQICYmIG9wdGlvbnMgJiYgb3B0aW9ucy51c2VtYXA7XG4gIHZhciBtYXAgPSB1c2VtYXAgPyBtYXBfdG9fbWFwIDogb2JqX3RvX21hcDtcblxuICB2YXIgd3JpdGVUeXBlID0ge1xuICAgIFwiYm9vbGVhblwiOiBib29sLFxuICAgIFwiZnVuY3Rpb25cIjogbmlsLFxuICAgIFwibnVtYmVyXCI6IG51bWJlcixcbiAgICBcIm9iamVjdFwiOiAodXNlcmF3ID8gb2JqZWN0X3JhdyA6IG9iamVjdCksXG4gICAgXCJzdHJpbmdcIjogX3N0cmluZyh1c2VyYXcgPyByYXdfaGVhZF9zaXplIDogc3RyX2hlYWRfc2l6ZSksXG4gICAgXCJzeW1ib2xcIjogbmlsLFxuICAgIFwidW5kZWZpbmVkXCI6IG5pbFxuICB9O1xuXG4gIHJldHVybiB3cml0ZVR5cGU7XG5cbiAgLy8gZmFsc2UgLS0gMHhjMlxuICAvLyB0cnVlIC0tIDB4YzNcbiAgZnVuY3Rpb24gYm9vbChlbmNvZGVyLCB2YWx1ZSkge1xuICAgIHZhciB0eXBlID0gdmFsdWUgPyAweGMzIDogMHhjMjtcbiAgICB0b2tlblt0eXBlXShlbmNvZGVyLCB2YWx1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBudW1iZXIoZW5jb2RlciwgdmFsdWUpIHtcbiAgICB2YXIgaXZhbHVlID0gdmFsdWUgfCAwO1xuICAgIHZhciB0eXBlO1xuICAgIGlmICh2YWx1ZSAhPT0gaXZhbHVlKSB7XG4gICAgICAvLyBmbG9hdCA2NCAtLSAweGNiXG4gICAgICB0eXBlID0gMHhjYjtcbiAgICAgIHRva2VuW3R5cGVdKGVuY29kZXIsIHZhbHVlKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKC0weDIwIDw9IGl2YWx1ZSAmJiBpdmFsdWUgPD0gMHg3Rikge1xuICAgICAgLy8gcG9zaXRpdmUgZml4aW50IC0tIDB4MDAgLSAweDdmXG4gICAgICAvLyBuZWdhdGl2ZSBmaXhpbnQgLS0gMHhlMCAtIDB4ZmZcbiAgICAgIHR5cGUgPSBpdmFsdWUgJiAweEZGO1xuICAgIH0gZWxzZSBpZiAoMCA8PSBpdmFsdWUpIHtcbiAgICAgIC8vIHVpbnQgOCAtLSAweGNjXG4gICAgICAvLyB1aW50IDE2IC0tIDB4Y2RcbiAgICAgIC8vIHVpbnQgMzIgLS0gMHhjZVxuICAgICAgdHlwZSA9IChpdmFsdWUgPD0gMHhGRikgPyAweGNjIDogKGl2YWx1ZSA8PSAweEZGRkYpID8gMHhjZCA6IDB4Y2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGludCA4IC0tIDB4ZDBcbiAgICAgIC8vIGludCAxNiAtLSAweGQxXG4gICAgICAvLyBpbnQgMzIgLS0gMHhkMlxuICAgICAgdHlwZSA9ICgtMHg4MCA8PSBpdmFsdWUpID8gMHhkMCA6ICgtMHg4MDAwIDw9IGl2YWx1ZSkgPyAweGQxIDogMHhkMjtcbiAgICB9XG4gICAgdG9rZW5bdHlwZV0oZW5jb2RlciwgaXZhbHVlKTtcbiAgfVxuXG4gIC8vIHVpbnQgNjQgLS0gMHhjZlxuICBmdW5jdGlvbiB1aW50NjQoZW5jb2RlciwgdmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IDB4Y2Y7XG4gICAgdG9rZW5bdHlwZV0oZW5jb2RlciwgdmFsdWUudG9BcnJheSgpKTtcbiAgfVxuXG4gIC8vIGludCA2NCAtLSAweGQzXG4gIGZ1bmN0aW9uIGludDY0KGVuY29kZXIsIHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSAweGQzO1xuICAgIHRva2VuW3R5cGVdKGVuY29kZXIsIHZhbHVlLnRvQXJyYXkoKSk7XG4gIH1cblxuICAvLyBzdHIgOCAtLSAweGQ5XG4gIC8vIHN0ciAxNiAtLSAweGRhXG4gIC8vIHN0ciAzMiAtLSAweGRiXG4gIC8vIGZpeHN0ciAtLSAweGEwIC0gMHhiZlxuICBmdW5jdGlvbiBzdHJfaGVhZF9zaXplKGxlbmd0aCkge1xuICAgIHJldHVybiAobGVuZ3RoIDwgMzIpID8gMSA6IChsZW5ndGggPD0gMHhGRikgPyAyIDogKGxlbmd0aCA8PSAweEZGRkYpID8gMyA6IDU7XG4gIH1cblxuICAvLyByYXcgMTYgLS0gMHhkYVxuICAvLyByYXcgMzIgLS0gMHhkYlxuICAvLyBmaXhyYXcgLS0gMHhhMCAtIDB4YmZcbiAgZnVuY3Rpb24gcmF3X2hlYWRfc2l6ZShsZW5ndGgpIHtcbiAgICByZXR1cm4gKGxlbmd0aCA8IDMyKSA/IDEgOiAobGVuZ3RoIDw9IDB4RkZGRikgPyAzIDogNTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9zdHJpbmcoaGVhZF9zaXplKSB7XG4gICAgcmV0dXJuIHN0cmluZztcblxuICAgIGZ1bmN0aW9uIHN0cmluZyhlbmNvZGVyLCB2YWx1ZSkge1xuICAgICAgLy8gcHJlcGFyZSBidWZmZXJcbiAgICAgIHZhciBsZW5ndGggPSB2YWx1ZS5sZW5ndGg7XG4gICAgICB2YXIgbWF4c2l6ZSA9IDUgKyBsZW5ndGggKiAzO1xuICAgICAgZW5jb2Rlci5vZmZzZXQgPSBlbmNvZGVyLnJlc2VydmUobWF4c2l6ZSk7XG4gICAgICB2YXIgYnVmZmVyID0gZW5jb2Rlci5idWZmZXI7XG5cbiAgICAgIC8vIGV4cGVjdGVkIGhlYWRlciBzaXplXG4gICAgICB2YXIgZXhwZWN0ZWQgPSBoZWFkX3NpemUobGVuZ3RoKTtcblxuICAgICAgLy8gZXhwZWN0ZWQgc3RhcnQgcG9pbnRcbiAgICAgIHZhciBzdGFydCA9IGVuY29kZXIub2Zmc2V0ICsgZXhwZWN0ZWQ7XG5cbiAgICAgIC8vIHdyaXRlIHN0cmluZ1xuICAgICAgbGVuZ3RoID0gQnVmZmVyUHJvdG8ud3JpdGUuY2FsbChidWZmZXIsIHZhbHVlLCBzdGFydCk7XG5cbiAgICAgIC8vIGFjdHVhbCBoZWFkZXIgc2l6ZVxuICAgICAgdmFyIGFjdHVhbCA9IGhlYWRfc2l6ZShsZW5ndGgpO1xuXG4gICAgICAvLyBtb3ZlIGNvbnRlbnQgd2hlbiBuZWVkZWRcbiAgICAgIGlmIChleHBlY3RlZCAhPT0gYWN0dWFsKSB7XG4gICAgICAgIHZhciB0YXJnZXRTdGFydCA9IHN0YXJ0ICsgYWN0dWFsIC0gZXhwZWN0ZWQ7XG4gICAgICAgIHZhciBlbmQgPSBzdGFydCArIGxlbmd0aDtcbiAgICAgICAgQnVmZmVyUHJvdG8uY29weS5jYWxsKGJ1ZmZlciwgYnVmZmVyLCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCk7XG4gICAgICB9XG5cbiAgICAgIC8vIHdyaXRlIGhlYWRlclxuICAgICAgdmFyIHR5cGUgPSAoYWN0dWFsID09PSAxKSA/ICgweGEwICsgbGVuZ3RoKSA6IChhY3R1YWwgPD0gMykgPyAoMHhkNyArIGFjdHVhbCkgOiAweGRiO1xuICAgICAgdG9rZW5bdHlwZV0oZW5jb2RlciwgbGVuZ3RoKTtcblxuICAgICAgLy8gbW92ZSBjdXJzb3JcbiAgICAgIGVuY29kZXIub2Zmc2V0ICs9IGxlbmd0aDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvYmplY3QoZW5jb2RlciwgdmFsdWUpIHtcbiAgICAvLyBudWxsXG4gICAgaWYgKHZhbHVlID09PSBudWxsKSByZXR1cm4gbmlsKGVuY29kZXIsIHZhbHVlKTtcblxuICAgIC8vIEJ1ZmZlclxuICAgIGlmIChpc0J1ZmZlcih2YWx1ZSkpIHJldHVybiBiaW4oZW5jb2RlciwgdmFsdWUpO1xuXG4gICAgLy8gQXJyYXlcbiAgICBpZiAoSVNfQVJSQVkodmFsdWUpKSByZXR1cm4gYXJyYXkoZW5jb2RlciwgdmFsdWUpO1xuXG4gICAgLy8gaW50NjQtYnVmZmVyIG9iamVjdHNcbiAgICBpZiAoVWludDY0QkUuaXNVaW50NjRCRSh2YWx1ZSkpIHJldHVybiB1aW50NjQoZW5jb2RlciwgdmFsdWUpO1xuICAgIGlmIChJbnQ2NEJFLmlzSW50NjRCRSh2YWx1ZSkpIHJldHVybiBpbnQ2NChlbmNvZGVyLCB2YWx1ZSk7XG5cbiAgICAvLyBleHQgZm9ybWF0c1xuICAgIHZhciBwYWNrZXIgPSBlbmNvZGVyLmNvZGVjLmdldEV4dFBhY2tlcih2YWx1ZSk7XG4gICAgaWYgKHBhY2tlcikgdmFsdWUgPSBwYWNrZXIodmFsdWUpO1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEV4dEJ1ZmZlcikgcmV0dXJuIGV4dChlbmNvZGVyLCB2YWx1ZSk7XG5cbiAgICAvLyBwbGFpbiBvbGQgT2JqZWN0cyBvciBNYXBcbiAgICBtYXAoZW5jb2RlciwgdmFsdWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gb2JqZWN0X3JhdyhlbmNvZGVyLCB2YWx1ZSkge1xuICAgIC8vIEJ1ZmZlclxuICAgIGlmIChpc0J1ZmZlcih2YWx1ZSkpIHJldHVybiByYXcoZW5jb2RlciwgdmFsdWUpO1xuXG4gICAgLy8gb3RoZXJzXG4gICAgb2JqZWN0KGVuY29kZXIsIHZhbHVlKTtcbiAgfVxuXG4gIC8vIG5pbCAtLSAweGMwXG4gIGZ1bmN0aW9uIG5pbChlbmNvZGVyLCB2YWx1ZSkge1xuICAgIHZhciB0eXBlID0gMHhjMDtcbiAgICB0b2tlblt0eXBlXShlbmNvZGVyLCB2YWx1ZSk7XG4gIH1cblxuICAvLyBmaXhhcnJheSAtLSAweDkwIC0gMHg5ZlxuICAvLyBhcnJheSAxNiAtLSAweGRjXG4gIC8vIGFycmF5IDMyIC0tIDB4ZGRcbiAgZnVuY3Rpb24gYXJyYXkoZW5jb2RlciwgdmFsdWUpIHtcbiAgICB2YXIgbGVuZ3RoID0gdmFsdWUubGVuZ3RoO1xuICAgIHZhciB0eXBlID0gKGxlbmd0aCA8IDE2KSA/ICgweDkwICsgbGVuZ3RoKSA6IChsZW5ndGggPD0gMHhGRkZGKSA/IDB4ZGMgOiAweGRkO1xuICAgIHRva2VuW3R5cGVdKGVuY29kZXIsIGxlbmd0aCk7XG5cbiAgICB2YXIgZW5jb2RlID0gZW5jb2Rlci5jb2RlYy5lbmNvZGU7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgZW5jb2RlKGVuY29kZXIsIHZhbHVlW2ldKTtcbiAgICB9XG4gIH1cblxuICAvLyBiaW4gOCAtLSAweGM0XG4gIC8vIGJpbiAxNiAtLSAweGM1XG4gIC8vIGJpbiAzMiAtLSAweGM2XG4gIGZ1bmN0aW9uIGJpbl9idWZmZXIoZW5jb2RlciwgdmFsdWUpIHtcbiAgICB2YXIgbGVuZ3RoID0gdmFsdWUubGVuZ3RoO1xuICAgIHZhciB0eXBlID0gKGxlbmd0aCA8IDB4RkYpID8gMHhjNCA6IChsZW5ndGggPD0gMHhGRkZGKSA/IDB4YzUgOiAweGM2O1xuICAgIHRva2VuW3R5cGVdKGVuY29kZXIsIGxlbmd0aCk7XG4gICAgZW5jb2Rlci5zZW5kKHZhbHVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJpbl9hcnJheWJ1ZmZlcihlbmNvZGVyLCB2YWx1ZSkge1xuICAgIGJpbl9idWZmZXIoZW5jb2RlciwgbmV3IFVpbnQ4QXJyYXkodmFsdWUpKTtcbiAgfVxuXG4gIC8vIGZpeGV4dCAxIC0tIDB4ZDRcbiAgLy8gZml4ZXh0IDIgLS0gMHhkNVxuICAvLyBmaXhleHQgNCAtLSAweGQ2XG4gIC8vIGZpeGV4dCA4IC0tIDB4ZDdcbiAgLy8gZml4ZXh0IDE2IC0tIDB4ZDhcbiAgLy8gZXh0IDggLS0gMHhjN1xuICAvLyBleHQgMTYgLS0gMHhjOFxuICAvLyBleHQgMzIgLS0gMHhjOVxuICBmdW5jdGlvbiBleHQoZW5jb2RlciwgdmFsdWUpIHtcbiAgICB2YXIgYnVmZmVyID0gdmFsdWUuYnVmZmVyO1xuICAgIHZhciBsZW5ndGggPSBidWZmZXIubGVuZ3RoO1xuICAgIHZhciB0eXBlID0gZXh0bWFwW2xlbmd0aF0gfHwgKChsZW5ndGggPCAweEZGKSA/IDB4YzcgOiAobGVuZ3RoIDw9IDB4RkZGRikgPyAweGM4IDogMHhjOSk7XG4gICAgdG9rZW5bdHlwZV0oZW5jb2RlciwgbGVuZ3RoKTtcbiAgICB1aW50OFt2YWx1ZS50eXBlXShlbmNvZGVyKTtcbiAgICBlbmNvZGVyLnNlbmQoYnVmZmVyKTtcbiAgfVxuXG4gIC8vIGZpeG1hcCAtLSAweDgwIC0gMHg4ZlxuICAvLyBtYXAgMTYgLS0gMHhkZVxuICAvLyBtYXAgMzIgLS0gMHhkZlxuICBmdW5jdGlvbiBvYmpfdG9fbWFwKGVuY29kZXIsIHZhbHVlKSB7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciB0eXBlID0gKGxlbmd0aCA8IDE2KSA/ICgweDgwICsgbGVuZ3RoKSA6IChsZW5ndGggPD0gMHhGRkZGKSA/IDB4ZGUgOiAweGRmO1xuICAgIHRva2VuW3R5cGVdKGVuY29kZXIsIGxlbmd0aCk7XG5cbiAgICB2YXIgZW5jb2RlID0gZW5jb2Rlci5jb2RlYy5lbmNvZGU7XG4gICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgZW5jb2RlKGVuY29kZXIsIGtleSk7XG4gICAgICBlbmNvZGUoZW5jb2RlciwgdmFsdWVba2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBmaXhtYXAgLS0gMHg4MCAtIDB4OGZcbiAgLy8gbWFwIDE2IC0tIDB4ZGVcbiAgLy8gbWFwIDMyIC0tIDB4ZGZcbiAgZnVuY3Rpb24gbWFwX3RvX21hcChlbmNvZGVyLCB2YWx1ZSkge1xuICAgIGlmICghKHZhbHVlIGluc3RhbmNlb2YgTWFwKSkgcmV0dXJuIG9ial90b19tYXAoZW5jb2RlciwgdmFsdWUpO1xuXG4gICAgdmFyIGxlbmd0aCA9IHZhbHVlLnNpemU7XG4gICAgdmFyIHR5cGUgPSAobGVuZ3RoIDwgMTYpID8gKDB4ODAgKyBsZW5ndGgpIDogKGxlbmd0aCA8PSAweEZGRkYpID8gMHhkZSA6IDB4ZGY7XG4gICAgdG9rZW5bdHlwZV0oZW5jb2RlciwgbGVuZ3RoKTtcblxuICAgIHZhciBlbmNvZGUgPSBlbmNvZGVyLmNvZGVjLmVuY29kZTtcbiAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uKHZhbCwga2V5LCBtKSB7XG4gICAgICBlbmNvZGUoZW5jb2Rlciwga2V5KTtcbiAgICAgIGVuY29kZShlbmNvZGVyLCB2YWwpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gcmF3IDE2IC0tIDB4ZGFcbiAgLy8gcmF3IDMyIC0tIDB4ZGJcbiAgLy8gZml4cmF3IC0tIDB4YTAgLSAweGJmXG4gIGZ1bmN0aW9uIHJhdyhlbmNvZGVyLCB2YWx1ZSkge1xuICAgIHZhciBsZW5ndGggPSB2YWx1ZS5sZW5ndGg7XG4gICAgdmFyIHR5cGUgPSAobGVuZ3RoIDwgMzIpID8gKDB4YTAgKyBsZW5ndGgpIDogKGxlbmd0aCA8PSAweEZGRkYpID8gMHhkYSA6IDB4ZGI7XG4gICAgdG9rZW5bdHlwZV0oZW5jb2RlciwgbGVuZ3RoKTtcbiAgICBlbmNvZGVyLnNlbmQodmFsdWUpO1xuICB9XG59XG4iLCIvLyB3cml0ZS11bml0OC5qc1xuXG52YXIgY29uc3RhbnQgPSBleHBvcnRzLnVpbnQ4ID0gbmV3IEFycmF5KDI1Nik7XG5cbmZvciAodmFyIGkgPSAweDAwOyBpIDw9IDB4RkY7IGkrKykge1xuICBjb25zdGFudFtpXSA9IHdyaXRlMChpKTtcbn1cblxuZnVuY3Rpb24gd3JpdGUwKHR5cGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGVuY29kZXIpIHtcbiAgICB2YXIgb2Zmc2V0ID0gZW5jb2Rlci5yZXNlcnZlKDEpO1xuICAgIGVuY29kZXIuYnVmZmVyW29mZnNldF0gPSB0eXBlO1xuICB9O1xufVxuIiwiaW1wb3J0IHsgcGFnZSB9IGZyb20gXCIuL3BhZ2UvcHJveHlcIjtcbmltcG9ydCAqIGFzIENhbnZhc1JlbmRlcmVyIGZyb20gXCIuL3JlbmRlcmVyXCI7XG5pbXBvcnQgeyBTdGRpbiB9IGZyb20gXCIuL1N0ZGluXCI7XG5pbXBvcnQgeyBTdGRvdXQgfSBmcm9tIFwiLi9TdGRvdXRcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG5lb3ZpbShcbiAgICAgICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCxcbiAgICAgICAgeyBwb3J0LCBwYXNzd29yZCB9OiB7IHBvcnQ6IG51bWJlciwgcGFzc3dvcmQ6IG51bWJlciB9LFxuICAgICkge1xuICAgIGNvbnN0IGZ1bmN0aW9uczogYW55ID0ge307XG4gICAgY29uc3QgcmVxdWVzdHMgPSBuZXcgTWFwPG51bWJlciwgeyByZXNvbHZlOiBhbnksIHJlamVjdDogYW55IH0+KCk7XG5cbiAgICBDYW52YXNSZW5kZXJlci5zZXRGdW5jdGlvbnMoZnVuY3Rpb25zKTtcbiAgICBDYW52YXNSZW5kZXJlci5zZXRDYW52YXMoY2FudmFzKTtcblxuICAgIGxldCBwcmV2Tm90aWZpY2F0aW9uUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIGNvbnN0IHNvY2tldCA9IG5ldyBXZWJTb2NrZXQoYHdzOi8vMTI3LjAuMC4xOiR7cG9ydH0vJHtwYXNzd29yZH1gKTtcbiAgICBzb2NrZXQuYmluYXJ5VHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcbiAgICBzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsICgoXzogYW55KSA9PiB7XG4gICAgICAgIHByZXZOb3RpZmljYXRpb25Qcm9taXNlID0gcHJldk5vdGlmaWNhdGlvblByb21pc2UuZmluYWxseSgoKSA9PiBwYWdlLmtpbGxFZGl0b3IoKSk7XG4gICAgfSkpO1xuICAgIGF3YWl0IChuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNvY2tldC5hZGRFdmVudExpc3RlbmVyKFwib3BlblwiLCAoKSA9PiB7XG4gICAgICAgIHJlc29sdmUodW5kZWZpbmVkKTtcbiAgICB9KSkpO1xuICAgIGNvbnN0IHN0ZGluID0gbmV3IFN0ZGluKHNvY2tldCk7XG4gICAgY29uc3Qgc3Rkb3V0ID0gbmV3IFN0ZG91dChzb2NrZXQpO1xuXG4gICAgbGV0IHJlcUlkID0gMDtcbiAgICBjb25zdCByZXF1ZXN0ID0gKGFwaTogc3RyaW5nLCBhcmdzOiBhbnlbXSkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcmVxSWQgKz0gMTtcbiAgICAgICAgICAgIHJlcXVlc3RzLnNldChyZXFJZCwge3Jlc29sdmUsIHJlamVjdH0pO1xuICAgICAgICAgICAgc3RkaW4ud3JpdGUocmVxSWQsIGFwaSwgYXJncyk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgc3Rkb3V0LmFkZExpc3RlbmVyKFwicmVxdWVzdFwiLCAoX2lkOiBhbnksIF9uYW1lOiBhbnksIF9hcmdzOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9KTtcbiAgICBzdGRvdXQuYWRkTGlzdGVuZXIoXCJyZXNwb25zZVwiLCAoaWQ6IGFueSwgZXJyb3I6IGFueSwgcmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgciA9IHJlcXVlc3RzLmdldChpZCk7XG4gICAgICAgIGlmICghcikge1xuICAgICAgICAgICAgLy8gVGhpcyBjYW4ndCBoYXBwZW4gYW5kIHlldCBpdCBzb21ldGltZXMgZG9lcywgcG9zc2libHkgZHVlIHRvIGEgZmlyZWZveCBidWdcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFJlY2VpdmVkIGFuc3dlciB0byAke2lkfSBidXQgbm8gaGFuZGxlciBmb3VuZCFgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlcXVlc3RzLmRlbGV0ZShpZCk7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByLnJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHIucmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgbGFzdExvc3RGb2N1cyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIHN0ZG91dC5hZGRMaXN0ZW5lcihcIm5vdGlmaWNhdGlvblwiLCBhc3luYyAobmFtZTogc3RyaW5nLCBhcmdzOiBhbnlbXSkgPT4ge1xuICAgICAgICBpZiAobmFtZSA9PT0gXCJyZWRyYXdcIiAmJiBhcmdzKSB7XG4gICAgICAgICAgICBDYW52YXNSZW5kZXJlci5vblJlZHJhdyhhcmdzKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBwcmV2Tm90aWZpY2F0aW9uUHJvbWlzZSA9IHByZXZOb3RpZmljYXRpb25Qcm9taXNlLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgICAgLy8gQSB2ZXJ5IHRyaWNreSBzZXF1ZW5jZSBvZiBldmVudHMgY291bGQgaGFwcGVuIGhlcmU6XG4gICAgICAgICAgICAvLyAtIGZpcmVudmltX2J1ZndyaXRlIGlzIHJlY2VpdmVkIHBhZ2Uuc2V0RWxlbWVudENvbnRlbnQgaXMgY2FsbGVkXG4gICAgICAgICAgICAvLyAgIGFzeW5jaHJvbm91c2x5XG4gICAgICAgICAgICAvLyAtIGZpcmVudmltX2ZvY3VzX3BhZ2UgaXMgY2FsbGVkLCBwYWdlLmZvY3VzUGFnZSgpIGlzIGNhbGxlZFxuICAgICAgICAgICAgLy8gICBhc3luY2hyb25vdXNseSwgbGFzdExvc3RGb2N1cyBpcyBzZXQgdG8gbm93XG4gICAgICAgICAgICAvLyAtIHBhZ2Uuc2V0RWxlbWVudENvbnRlbnQgY29tcGxldGVzLCBsYXN0TG9zdEZvY3VzIGlzIGNoZWNrZWQgdG8gc2VlXG4gICAgICAgICAgICAvLyAgIGlmIGZvY3VzIHNob3VsZCBiZSBncmFiYmVkIG9yIG5vdFxuICAgICAgICAgICAgLy8gVGhhdCdzIHdoeSB3ZSBoYXZlIHRvIGNoZWNrIGZvciBsYXN0TG9zdEZvY3VzIGFmdGVyXG4gICAgICAgICAgICAvLyBwYWdlLnNldEVsZW1lbnRDb250ZW50L0N1cnNvciEgU2FtZSB0aGluZyBmb3IgZmlyZW52aW1fcHJlc3Nfa2V5c1xuICAgICAgICAgICAgY29uc3QgaGFkRm9jdXMgPSBkb2N1bWVudC5oYXNGb2N1cygpO1xuICAgICAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImZpcmVudmltX2J1ZndyaXRlXCI6XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGFyZ3NbMF0gYXMgeyB0ZXh0OiBzdHJpbmdbXSwgY3Vyc29yOiBbbnVtYmVyLCBudW1iZXJdIH07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYWdlLnNldEVsZW1lbnRDb250ZW50KGRhdGEudGV4dC5qb2luKFwiXFxuXCIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gcGFnZS5zZXRFbGVtZW50Q3Vyc29yKC4uLihkYXRhLmN1cnNvcikpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYWRGb2N1c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiAhZG9jdW1lbnQuaGFzRm9jdXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiAocGVyZm9ybWFuY2Uubm93KCkgLSBsYXN0TG9zdEZvY3VzID4gMzAwMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlIFwiZmlyZW52aW1fZXZhbF9qc1wiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFnZS5ldmFsSW5QYWdlKGFyZ3NbMF0pLmNhdGNoKF8gPT4gXykudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ3NbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0KFwibnZpbV9jYWxsX2Z1bmN0aW9uXCIsIFthcmdzWzFdLCBbSlNPTi5zdHJpbmdpZnkocmVzdWx0KV1dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY2FzZSBcImZpcmVudmltX2ZvY3VzX3BhZ2VcIjpcbiAgICAgICAgICAgICAgICAgICAgbGFzdExvc3RGb2N1cyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFnZS5mb2N1c1BhZ2UoKTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZmlyZW52aW1fZm9jdXNfaW5wdXRcIjpcbiAgICAgICAgICAgICAgICAgICAgbGFzdExvc3RGb2N1cyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFnZS5mb2N1c0lucHV0KCk7XG4gICAgICAgICAgICAgICAgY2FzZSBcImZpcmVudmltX2hpZGVfZnJhbWVcIjpcbiAgICAgICAgICAgICAgICAgICAgbGFzdExvc3RGb2N1cyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFnZS5oaWRlRWRpdG9yKCk7XG4gICAgICAgICAgICAgICAgY2FzZSBcImZpcmVudmltX3ByZXNzX2tleXNcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhZ2UucHJlc3NLZXlzKGFyZ3NbMF0pO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJmaXJlbnZpbV92aW1sZWF2ZVwiOlxuICAgICAgICAgICAgICAgICAgICBsYXN0TG9zdEZvY3VzID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYWdlLmtpbGxFZGl0b3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCB7IDA6IGNoYW5uZWwsIDE6IGFwaUluZm8gfSA9IChhd2FpdCByZXF1ZXN0KFwibnZpbV9nZXRfYXBpX2luZm9cIiwgW10pKSBhcyBJTnZpbUFwaUluZm87XG5cbiAgICBzdGRvdXQuc2V0VHlwZXMoYXBpSW5mby50eXBlcyk7XG5cbiAgICBPYmplY3QuYXNzaWduKGZ1bmN0aW9ucywgYXBpSW5mby5mdW5jdGlvbnNcbiAgICAgICAgLmZpbHRlcihmID0+IGYuZGVwcmVjYXRlZF9zaW5jZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAucmVkdWNlKChhY2MsIGN1cikgPT4ge1xuICAgICAgICAgICAgbGV0IG5hbWUgPSBjdXIubmFtZTtcbiAgICAgICAgICAgIGlmIChuYW1lLnN0YXJ0c1dpdGgoXCJudmltX1wiKSkge1xuICAgICAgICAgICAgICAgIG5hbWUgPSBuYW1lLnNsaWNlKDUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWNjW25hbWVdID0gKC4uLmFyZ3M6IGFueVtdKSA9PiByZXF1ZXN0KGN1ci5uYW1lLCBhcmdzKTtcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIHt9IGFzIHtbazogc3RyaW5nXTogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnl9KSk7XG4gICAgZnVuY3Rpb25zLmdldF9jdXJyZW50X2NoYW5uZWwgPSAoKSA9PiBjaGFubmVsO1xuICAgIHJldHVybiBmdW5jdGlvbnM7XG59XG4iLCJpbXBvcnQgKiBhcyBtc2dwYWNrIGZyb20gXCJtc2dwYWNrLWxpdGVcIjtcblxuZXhwb3J0IGNsYXNzIFN0ZGluIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc29ja2V0OiBXZWJTb2NrZXQpIHt9XG5cbiAgICBwdWJsaWMgd3JpdGUocmVxSWQ6IG51bWJlciwgbWV0aG9kOiBzdHJpbmcsIGFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGNvbnN0IHJlcSA9IFswLCByZXFJZCwgbWV0aG9kLCBhcmdzXTtcbiAgICAgICAgY29uc3QgZW5jb2RlZCA9IG1zZ3BhY2suZW5jb2RlKHJlcSk7XG4gICAgICAgIHRoaXMuc29ja2V0LnNlbmQoZW5jb2RlZCk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgKiBhcyBtc2dwYWNrIGZyb20gXCJtc2dwYWNrLWxpdGVcIjtcblxuZXhwb3J0IGNsYXNzIFN0ZG91dCB7XG4gICAgcHJpdmF0ZSBsaXN0ZW5lcnMgPSBuZXcgTWFwPHN0cmluZywgKCguLi5hcmdzOiBhbnlbXSkgPT4gYW55KVtdPigpO1xuICAgIHByaXZhdGUgbWVzc2FnZU5hbWVzID0gbmV3IE1hcChbWzAsIFwicmVxdWVzdFwiXSwgWzEsIFwicmVzcG9uc2VcIl0sIFsyLCBcIm5vdGlmaWNhdGlvblwiXV0pO1xuICAgIC8vIEhvbGRzIHByZXZpb3VzbHktcmVjZWl2ZWQsIGluY29tcGxldGUgYW5kIHVucHJvY2Vzc2VkIG1lc3NhZ2VzXG4gICAgcHJpdmF0ZSBwcmV2ID0gbmV3IFVpbnQ4QXJyYXkoMCk7XG4gICAgcHJpdmF0ZSBtc2dwYWNrQ29uZmlnID0ge30gYXMgbXNncGFjay5EZWNvZGVyT3B0aW9ucztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc29ja2V0OiBXZWJTb2NrZXQpIHtcbiAgICAgICAgdGhpcy5zb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5vbk1lc3NhZ2UuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZExpc3RlbmVyKGtpbmQ6IHN0cmluZywgbGlzdGVuZXI6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KSB7XG4gICAgICAgIGxldCBhcnIgPSB0aGlzLmxpc3RlbmVycy5nZXQoa2luZCk7XG4gICAgICAgIGlmICghYXJyKSB7XG4gICAgICAgICAgICBhcnIgPSBbXTtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzLnNldChraW5kLCBhcnIpO1xuICAgICAgICB9XG4gICAgICAgIGFyci5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0VHlwZXModHlwZXM6IHtba2V5OiBzdHJpbmddOiB7IGlkOiBudW1iZXIgfX0pIHtcbiAgICAgICAgdGhpcy5tc2dwYWNrQ29uZmlnLmNvZGVjID0gbXNncGFjay5jcmVhdGVDb2RlYyh7IHByZXNldDogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0XG4gICAgICAgICAgICAuZW50cmllcyh0eXBlcylcbiAgICAgICAgICAgIC5mb3JFYWNoKChbXywgeyBpZCB9XSkgPT5cbiAgICAgICAgICAgICAgICAgICAgIHRoaXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tc2dwYWNrQ29uZmlnXG4gICAgICAgICAgICAgICAgICAgICAgICAuY29kZWNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRFeHRVbnBhY2tlcihpZCwgKGRhdGE6IGFueSkgPT4gZGF0YSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25NZXNzYWdlKG1zZzogYW55KSB7XG4gICAgICAgIGNvbnN0IG1zZ0RhdGEgPSBuZXcgVWludDhBcnJheShtc2cuZGF0YSk7XG4gICAgICAgIGxldCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkobXNnRGF0YS5ieXRlTGVuZ3RoICsgdGhpcy5wcmV2LmJ5dGVMZW5ndGgpO1xuICAgICAgICBkYXRhLnNldCh0aGlzLnByZXYpO1xuICAgICAgICBkYXRhLnNldChtc2dEYXRhLCB0aGlzLnByZXYubGVuZ3RoKTtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIGxldCBkZWNvZGVkO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBkZWNvZGVkID0gbXNncGFjay5kZWNvZGUoZGF0YSwgdGhpcy5tc2dwYWNrQ29uZmlnKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXYgPSBkYXRhO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGVuY29kZWQgPSBtc2dwYWNrLmVuY29kZShkZWNvZGVkKTtcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLnNsaWNlKGVuY29kZWQuYnl0ZUxlbmd0aCk7XG4gICAgICAgICAgICBjb25zdCBba2luZCwgcmVxSWQsIGRhdGExLCBkYXRhMl0gPSBkZWNvZGVkO1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMubWVzc2FnZU5hbWVzLmdldChraW5kKTtcbiAgICAgICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlcnMgPSB0aGlzLmxpc3RlbmVycy5nZXQobmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKGhhbmRsZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBoYW5kbGVyIG9mIGhhbmRsZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyKHJlcUlkLCBkYXRhMSwgZGF0YTIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBDYW4ndCBiZSB0ZXN0ZWQgYmVjYXVzZSB0aGlzIHdvdWxkIG1lYW4gbWVzc2FnZXMgdGhhdCBicmVha1xuICAgICAgICAgICAgICAgIC8vIHRoZSBtc2dwYWNrLXJwYyBzcGVjLCBzbyBjb3ZlcmFnZSBpbXBvc3NpYmxlIHRvIGdldC5cbiAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFVuaGFuZGxlZCBtZXNzYWdlIGtpbmQgJHtuYW1lfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgZ2V0Q29uZiB9IGZyb20gXCIuLi91dGlscy9jb25maWd1cmF0aW9uXCI7XG5pbXBvcnQgeyBrZXlzVG9FdmVudHMgfSBmcm9tIFwiLi4vdXRpbHMva2V5c1wiO1xuaW1wb3J0IHsgRmlyZW52aW1FbGVtZW50IH0gZnJvbSBcIi4uL0ZpcmVudmltRWxlbWVudFwiO1xuaW1wb3J0IHsgZXhlY3V0ZUluUGFnZSB9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuXG5pbnRlcmZhY2UgSUdsb2JhbFN0YXRlIHtcbiAgICBkaXNhYmxlZDogYm9vbGVhbiB8IFByb21pc2U8Ym9vbGVhbj47XG4gICAgbGFzdEZvY3VzZWRDb250ZW50U2NyaXB0OiBudW1iZXI7XG4gICAgZmlyZW52aW1FbGVtczogTWFwPG51bWJlciwgRmlyZW52aW1FbGVtZW50PjtcbiAgICBmcmFtZUlkUmVzb2x2ZTogKF86IG51bWJlcikgPT4gdm9pZDtcbiAgICBudmltaWZ5OiAoZXZ0OiBGb2N1c0V2ZW50KSA9PiB2b2lkO1xufVxuXG5mdW5jdGlvbiBfZm9jdXNJbnB1dChnbG9iYWw6IElHbG9iYWxTdGF0ZSwgZmlyZW52aW06IEZpcmVudmltRWxlbWVudCwgYWRkTGlzdGVuZXI6IGJvb2xlYW4pIHtcbiAgICBpZiAoYWRkTGlzdGVuZXIpIHtcbiAgICAgICAgLy8gT25seSByZS1hZGQgZXZlbnQgbGlzdGVuZXIgaWYgaW5wdXQncyBzZWxlY3RvciBtYXRjaGVzIHRoZSBvbmVzXG4gICAgICAgIC8vIHRoYXQgc2hvdWxkIGJlIGF1dG9udmltaWZpZWRcbiAgICAgICAgY29uc3QgY29uZiA9IGdldENvbmYoKTtcbiAgICAgICAgaWYgKGNvbmYuc2VsZWN0b3IgJiYgY29uZi5zZWxlY3RvciAhPT0gXCJcIikge1xuICAgICAgICAgICAgY29uc3QgZWxlbXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY29uZi5zZWxlY3RvcikpO1xuICAgICAgICAgICAgYWRkTGlzdGVuZXIgPSBlbGVtcy5pbmNsdWRlcyhmaXJlbnZpbS5nZXRFbGVtZW50KCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZpcmVudmltLmZvY3VzT3JpZ2luYWxFbGVtZW50KGFkZExpc3RlbmVyKTtcbn1cblxuZnVuY3Rpb24gZ2V0Rm9jdXNlZEVsZW1lbnQgKGZpcmVudmltRWxlbXM6IE1hcDxudW1iZXIsIEZpcmVudmltRWxlbWVudD4pIHtcbiAgICByZXR1cm4gQXJyYXlcbiAgICAgICAgLmZyb20oZmlyZW52aW1FbGVtcy52YWx1ZXMoKSlcbiAgICAgICAgLmZpbmQoaW5zdGFuY2UgPT4gaW5zdGFuY2UuaXNGb2N1c2VkKCkpO1xufVxuXG4vLyBUYWIgZnVuY3Rpb25zIGFyZSBmdW5jdGlvbnMgYWxsIGNvbnRlbnQgc2NyaXB0cyBzaG91bGQgcmVhY3QgdG9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUYWJGdW5jdGlvbnMoZ2xvYmFsOiBJR2xvYmFsU3RhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRBY3RpdmVJbnN0YW5jZUNvdW50IDogKCkgPT4gZ2xvYmFsLmZpcmVudmltRWxlbXMuc2l6ZSxcbiAgICAgICAgcmVnaXN0ZXJOZXdGcmFtZUlkOiAoZnJhbWVJZDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwuZnJhbWVJZFJlc29sdmUoZnJhbWVJZCk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldERpc2FibGVkOiAoZGlzYWJsZWQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgIGdsb2JhbC5kaXNhYmxlZCA9IGRpc2FibGVkO1xuICAgICAgICB9LFxuICAgICAgICBzZXRMYXN0Rm9jdXNlZENvbnRlbnRTY3JpcHQ6IChmcmFtZUlkOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGdsb2JhbC5sYXN0Rm9jdXNlZENvbnRlbnRTY3JpcHQgPSBmcmFtZUlkO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gaXNWaXNpYmxlKGU6IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3QgcmVjdCA9IGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3Qgdmlld0hlaWdodCA9IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgcmV0dXJuICEocmVjdC5ib3R0b20gPCAwIHx8IHJlY3QudG9wIC0gdmlld0hlaWdodCA+PSAwKTtcbn1cblxuLy8gQWN0aXZlQ29udGVudCBmdW5jdGlvbnMgYXJlIGZ1bmN0aW9ucyBvbmx5IHRoZSBhY3RpdmUgY29udGVudCBzY3JpcHQgc2hvdWxkIHJlYWN0IHRvXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWN0aXZlQ29udGVudEZ1bmN0aW9ucyhnbG9iYWw6IElHbG9iYWxTdGF0ZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGZvcmNlTnZpbWlmeTogKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVsZW0gPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgICAgICAgY29uc3QgaXNOdWxsID0gZWxlbSA9PT0gbnVsbCB8fCBlbGVtID09PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjb25zdCBwYWdlTm90RWRpdGFibGUgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY29udGVudEVkaXRhYmxlICE9PSBcInRydWVcIjtcbiAgICAgICAgICAgIGNvbnN0IGJvZHlOb3RFZGl0YWJsZSA9IChkb2N1bWVudC5ib2R5LmNvbnRlbnRFZGl0YWJsZSA9PT0gXCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCAoZG9jdW1lbnQuYm9keS5jb250ZW50RWRpdGFibGUgPT09IFwiaW5oZXJpdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNvbnRlbnRFZGl0YWJsZSAhPT0gXCJ0cnVlXCIpKTtcbiAgICAgICAgICAgIGlmIChpc051bGxcbiAgICAgICAgICAgICAgICB8fCAoZWxlbSA9PT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIHBhZ2VOb3RFZGl0YWJsZSlcbiAgICAgICAgICAgICAgICB8fCAoZWxlbSA9PT0gZG9jdW1lbnQuYm9keSAmJiBib2R5Tm90RWRpdGFibGUpKSB7XG4gICAgICAgICAgICAgICAgZWxlbSA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0ZXh0YXJlYVwiKSlcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoaXNWaXNpYmxlKTtcbiAgICAgICAgICAgICAgICBpZiAoIWVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbSA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpbnB1dFwiKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKGUgPT4gZS50eXBlID09PSBcInRleHRcIiAmJiBpc1Zpc2libGUoZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdsb2JhbC5udmltaWZ5KHsgdGFyZ2V0OiBlbGVtIH0gYXMgYW55KTtcbiAgICAgICAgfSxcbiAgICAgICAgc2VuZEtleTogKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaXJlbnZpbSA9IGdldEZvY3VzZWRFbGVtZW50KGdsb2JhbC5maXJlbnZpbUVsZW1zKTtcbiAgICAgICAgICAgIGlmIChmaXJlbnZpbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZmlyZW52aW0uc2VuZEtleShrZXkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBJdCdzIGltcG9ydGFudCB0byB0aHJvdyB0aGlzIGVycm9yIGFzIHRoZSBiYWNrZ3JvdW5kIHNjcmlwdFxuICAgICAgICAgICAgICAgIC8vIHdpbGwgZXhlY3V0ZSBhIGZhbGxiYWNrXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gZmlyZW52aW0gZnJhbWUgc2VsZWN0ZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE5lb3ZpbUZyYW1lRnVuY3Rpb25zKGdsb2JhbDogSUdsb2JhbFN0YXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZXZhbEluUGFnZTogKF86IG51bWJlciwganM6IHN0cmluZykgPT4gZXhlY3V0ZUluUGFnZShqcyksXG4gICAgICAgIGZvY3VzSW5wdXQ6IChmcmFtZUlkOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGxldCBmaXJlbnZpbUVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAoZnJhbWVJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZmlyZW52aW1FbGVtZW50ID0gZ2V0Rm9jdXNlZEVsZW1lbnQoZ2xvYmFsLmZpcmVudmltRWxlbXMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmaXJlbnZpbUVsZW1lbnQgPSBnbG9iYWwuZmlyZW52aW1FbGVtcy5nZXQoZnJhbWVJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfZm9jdXNJbnB1dChnbG9iYWwsIGZpcmVudmltRWxlbWVudCwgdHJ1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZvY3VzUGFnZTogKGZyYW1lSWQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlyZW52aW1FbGVtZW50ID0gZ2xvYmFsLmZpcmVudmltRWxlbXMuZ2V0KGZyYW1lSWQpO1xuICAgICAgICAgICAgZmlyZW52aW1FbGVtZW50LmNsZWFyRm9jdXNMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIChkb2N1bWVudC5hY3RpdmVFbGVtZW50IGFzIGFueSkuYmx1cigpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldEVkaXRvckluZm86IChmcmFtZUlkOiBudW1iZXIpID0+IGdsb2JhbFxuICAgICAgICAgICAgLmZpcmVudmltRWxlbXNcbiAgICAgICAgICAgIC5nZXQoZnJhbWVJZClcbiAgICAgICAgICAgIC5nZXRCdWZmZXJJbmZvKCksXG4gICAgICAgIGdldEVsZW1lbnRDb250ZW50OiAoZnJhbWVJZDogbnVtYmVyKSA9PiBnbG9iYWxcbiAgICAgICAgICAgIC5maXJlbnZpbUVsZW1zXG4gICAgICAgICAgICAuZ2V0KGZyYW1lSWQpXG4gICAgICAgICAgICAuZ2V0UGFnZUVsZW1lbnRDb250ZW50KCksXG4gICAgICAgIGhpZGVFZGl0b3I6IChmcmFtZUlkOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpcmVudmltID0gZ2xvYmFsLmZpcmVudmltRWxlbXMuZ2V0KGZyYW1lSWQpO1xuICAgICAgICAgICAgZmlyZW52aW0uaGlkZSgpO1xuICAgICAgICAgICAgX2ZvY3VzSW5wdXQoZ2xvYmFsLCBmaXJlbnZpbSwgdHJ1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGtpbGxFZGl0b3I6IChmcmFtZUlkOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpcmVudmltID0gZ2xvYmFsLmZpcmVudmltRWxlbXMuZ2V0KGZyYW1lSWQpO1xuICAgICAgICAgICAgY29uc3QgaXNGb2N1c2VkID0gZmlyZW52aW0uaXNGb2N1c2VkKCk7XG4gICAgICAgICAgICBmaXJlbnZpbS5kZXRhY2hGcm9tUGFnZSgpO1xuICAgICAgICAgICAgY29uc3QgY29uZiA9IGdldENvbmYoKTtcbiAgICAgICAgICAgIGlmIChpc0ZvY3VzZWQpIHtcbiAgICAgICAgICAgICAgICBfZm9jdXNJbnB1dChnbG9iYWwsIGZpcmVudmltLCBjb25mLnRha2VvdmVyICE9PSBcIm9uY2VcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnbG9iYWwuZmlyZW52aW1FbGVtcy5kZWxldGUoZnJhbWVJZCk7XG4gICAgICAgIH0sXG4gICAgICAgIHByZXNzS2V5czogKGZyYW1lSWQ6IG51bWJlciwga2V5czogc3RyaW5nW10pID0+IHtcbiAgICAgICAgICAgIGdsb2JhbC5maXJlbnZpbUVsZW1zLmdldChmcmFtZUlkKS5wcmVzc0tleXMoa2V5c1RvRXZlbnRzKGtleXMpKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVzaXplRWRpdG9yOiAoZnJhbWVJZDogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbSA9IGdsb2JhbC5maXJlbnZpbUVsZW1zLmdldChmcmFtZUlkKTtcbiAgICAgICAgICAgIGVsZW0ucmVzaXplVG8od2lkdGgsIGhlaWdodCwgdHJ1ZSk7XG4gICAgICAgICAgICBlbGVtLnB1dEVkaXRvckNsb3NlVG9JbnB1dE9yaWdpbkFmdGVyUmVzaXplRnJvbUZyYW1lKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldEVsZW1lbnRDb250ZW50OiAoZnJhbWVJZDogbnVtYmVyLCB0ZXh0OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBnbG9iYWwuZmlyZW52aW1FbGVtcy5nZXQoZnJhbWVJZCkuc2V0UGFnZUVsZW1lbnRDb250ZW50KHRleHQpO1xuICAgICAgICB9LFxuICAgICAgICBzZXRFbGVtZW50Q3Vyc29yOiAoZnJhbWVJZDogbnVtYmVyLCBsaW5lOiBudW1iZXIsIGNvbHVtbjogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZ2xvYmFsLmZpcmVudmltRWxlbXMuZ2V0KGZyYW1lSWQpLnNldFBhZ2VFbGVtZW50Q3Vyc29yKGxpbmUsIGNvbHVtbik7XG4gICAgICAgIH0sXG4gICAgfTtcbn1cbiIsImltcG9ydCB7IGdldE5lb3ZpbUZyYW1lRnVuY3Rpb25zIH0gZnJvbSBcIi4vZnVuY3Rpb25zXCI7XG5cbi8vIFdlIGRvbid0IG5lZWQgdG8gZ2l2ZSByZWFsIHZhbHVlcyB0byBnZXRGdW5jdGlvbnMgc2luY2Ugd2UncmUgb25seSB0cnlpbmcgdG9cbi8vIGdldCB0aGUgbmFtZSBvZiBmdW5jdGlvbnMgdGhhdCBleGlzdCBpbiB0aGUgcGFnZS5cbmNvbnN0IGZ1bmN0aW9ucyA9IGdldE5lb3ZpbUZyYW1lRnVuY3Rpb25zKHt9IGFzIGFueSk7XG5cbnR5cGUgZnQgPSB0eXBlb2YgZnVuY3Rpb25zO1xuLy8gVGhlIHByb3h5IGF1dG9tYXRpY2FsbHkgYXBwZW5kcyB0aGUgZnJhbWVJZCB0byB0aGUgcmVxdWVzdCwgc28gd2UgaGlkZSB0aGF0IGZyb20gdXNlcnNcbnR5cGUgQXJndW1lbnRzVHlwZTxUPiA9IFQgZXh0ZW5kcyAoeDogYW55LCAuLi5hcmdzOiBpbmZlciBVKSA9PiBhbnkgPyBVOiBuZXZlcjtcbnR5cGUgUHJvbWlzaWZ5PFQ+ID0gVCBleHRlbmRzIFByb21pc2U8YW55PiA/IFQgOiBQcm9taXNlPFQ+O1xuXG5leHBvcnQgY29uc3QgcGFnZSA9IHt9IGFzIHtcbiAgICBbayBpbiBrZXlvZiBmdF06ICguLi5hcmdzOiBBcmd1bWVudHNUeXBlPGZ0W2tdPikgPT4gUHJvbWlzaWZ5PFJldHVyblR5cGU8ZnRba10+PlxufTtcblxubGV0IGZ1bmNOYW1lOiBrZXlvZiB0eXBlb2YgZnVuY3Rpb25zO1xuZm9yIChmdW5jTmFtZSBpbiBmdW5jdGlvbnMpIHtcbiAgICAvLyBXZSBuZWVkIHRvIGRlY2xhcmUgZnVuYyBoZXJlIGJlY2F1c2UgZnVuY05hbWUgaXMgYSBnbG9iYWwgYW5kIHdvdWxkIG5vdFxuICAgIC8vIGJlIGNhcHR1cmVkIGluIHRoZSBjbG9zdXJlIG90aGVyd2lzZVxuICAgIGNvbnN0IGZ1bmMgPSBmdW5jTmFtZTtcbiAgICAocGFnZVtmdW5jXSBhcyBhbnkpID0gKCguLi5hcnI6IGFueVtdKSA9PiB7XG4gICAgICAgIHJldHVybiBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgYXJnczoge1xuICAgICAgICAgICAgICAgIGFyZ3M6IFsod2luZG93IGFzIGFueSkuZnJhbWVJZF0uY29uY2F0KGFyciksXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6IFtmdW5jXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jTmFtZTogW1wibWVzc2FnZVBhZ2VcIl0sXG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgcGFnZSB9IGZyb20gXCIuL3BhZ2UvcHJveHlcIjtcbmltcG9ydCB7IHBhcnNlR3VpZm9udCwgdG9IZXhDc3MgfSBmcm9tIFwiLi91dGlscy91dGlsc1wiO1xuaW1wb3J0IHsgTnZpbU1vZGUsIGNvbmZSZWFkeSwgZ2V0R2xvYmFsQ29uZiB9IGZyb20gXCIuL3V0aWxzL2NvbmZpZ3VyYXRpb25cIjtcblxubGV0IGZ1bmN0aW9uczogYW55O1xuZXhwb3J0IGZ1bmN0aW9uIHNldEZ1bmN0aW9ucyhmbnM6IGFueSkge1xuICAgIGZ1bmN0aW9ucyA9IGZucztcbn1cblxubGV0IGdseXBoQ2FjaGUgOiBhbnkgPSB7fTtcbmZ1bmN0aW9uIHdpcGVHbHlwaENhY2hlKCkge1xuICAgIGdseXBoQ2FjaGUgPSB7fTtcbn1cblxubGV0IG1ldHJpY3NJbnZhbGlkYXRlZCA9IGZhbHNlO1xuXG5mdW5jdGlvbiBpbnZhbGlkYXRlTWV0cmljcygpIHtcbiAgICBtZXRyaWNzSW52YWxpZGF0ZWQgPSB0cnVlO1xuICAgIHdpcGVHbHlwaENhY2hlKCk7XG59XG5cbmxldCBmb250U3RyaW5nIDogc3RyaW5nO1xuZnVuY3Rpb24gc2V0Rm9udFN0cmluZyAoc3RhdGU6IFN0YXRlLCBzIDogc3RyaW5nKSB7XG4gICAgZm9udFN0cmluZyA9IHM7XG4gICAgc3RhdGUuY29udGV4dC5mb250ID0gZm9udFN0cmluZztcbiAgICBpbnZhbGlkYXRlTWV0cmljcygpO1xufVxuZnVuY3Rpb24gZ2x5cGhJZChjaGFyOiBzdHJpbmcsIGhpZ2g6IG51bWJlcikge1xuICAgIHJldHVybiBjaGFyICsgXCItXCIgKyBoaWdoO1xufVxuZnVuY3Rpb24gc2V0Q2FudmFzRGltZW5zaW9ucyAoY3ZzOiBIVE1MQ2FudmFzRWxlbWVudCwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcbiAgICBjdnMud2lkdGggPSB3aWR0aCAqIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xuICAgIGN2cy5oZWlnaHQgPSBoZWlnaHQgKiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcbiAgICBjdnMuc3R5bGUud2lkdGggPSBgJHt3aWR0aH1weGA7XG4gICAgY3ZzLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1weGA7XG59XG5mdW5jdGlvbiBtYWtlRm9udFN0cmluZyhmb250U2l6ZTogc3RyaW5nLCBmb250RmFtaWx5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gYCR7Zm9udFNpemV9ICR7Zm9udEZhbWlseX1gO1xufVxubGV0IGRlZmF1bHRGb250U2l6ZSA9IFwiXCI7XG5jb25zdCBkZWZhdWx0Rm9udEZhbWlseSA9IFwibW9ub3NwYWNlXCI7XG5sZXQgZGVmYXVsdEZvbnRTdHJpbmcgPSBcIlwiO1xuZXhwb3J0IGZ1bmN0aW9uIHNldENhbnZhcyAoY3ZzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgIGNvbnN0IHN0YXRlID0gZ2xvYmFsU3RhdGU7XG4gICAgc3RhdGUuY2FudmFzID0gY3ZzO1xuICAgIHNldENhbnZhc0RpbWVuc2lvbnMoc3RhdGUuY2FudmFzLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgIGRlZmF1bHRGb250U2l6ZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHN0YXRlLmNhbnZhcykuZm9udFNpemU7XG4gICAgZGVmYXVsdEZvbnRTdHJpbmcgPSBtYWtlRm9udFN0cmluZyhkZWZhdWx0Rm9udFNpemUsIGRlZmF1bHRGb250RmFtaWx5KTtcbiAgICBzdGF0ZS5jb250ZXh0ID0gc3RhdGUuY2FudmFzLmdldENvbnRleHQoXCIyZFwiLCB7IFwiYWxwaGFcIjogZmFsc2UgfSk7XG4gICAgc2V0Rm9udFN0cmluZyhzdGF0ZSwgZGVmYXVsdEZvbnRTdHJpbmcpO1xufVxuXG4vLyBXZSBmaXJzdCBkZWZpbmUgaGlnaGxpZ2h0IGluZm9ybWF0aW9uLlxuY29uc3QgZGVmYXVsdEJhY2tncm91bmQgPSBcIiNGRkZGRkZcIjtcbmNvbnN0IGRlZmF1bHRGb3JlZ3JvdW5kID0gXCIjMDAwMDAwXCI7XG50eXBlIEhpZ2hsaWdodEluZm8gPSB7XG4gICAgYmFja2dyb3VuZDogc3RyaW5nLFxuICAgIGJvbGQ6IGJvb2xlYW4sXG4gICAgYmxlbmQ6IG51bWJlcixcbiAgICBmb3JlZ3JvdW5kOiBzdHJpbmcsXG4gICAgaXRhbGljOiBib29sZWFuLFxuICAgIHJldmVyc2U6IGJvb2xlYW4sXG4gICAgc3BlY2lhbDogc3RyaW5nLFxuICAgIHN0cmlrZXRocm91Z2g6IGJvb2xlYW4sXG4gICAgdW5kZXJjdXJsOiBib29sZWFuLFxuICAgIHVuZGVybGluZTogYm9vbGVhblxufTtcblxuLy8gV2UgdGhlbiBoYXZlIGEgR3JpZFNpemUgdHlwZS4gV2UgbmVlZCB0aGlzIHR5cGUgaW4gb3JkZXIgdG8ga2VlcCB0cmFjayBvZlxuLy8gdGhlIHNpemUgb2YgZ3JpZHMuIFN0b3JpbmcgdGhpcyBpbmZvcm1hdGlvbiBoZXJlIGNhbiBhcHBlYXIgcmVkdW5kYW50IHNpbmNlXG4vLyB0aGUgZ3JpZHMgYXJlIHJlcHJlc2VudGVkIGFzIGFycmF5cyBhbmQgdGh1cyBoYXZlIGEgLmxlbmd0aCBhdHRyaWJ1dGUsIGJ1dFxuLy8gaXQncyBub3Q6IHN0b3JpbmcgZ3JpZCBzaXplIGluIGEgc2VwYXJhdGUgZGF0YXN0cnVjdHVyZSBhbGxvd3MgdXMgdG8gbmV2ZXJcbi8vIGhhdmUgdG8gc2hyaW5rIGFycmF5cywgYW5kIHRvIG5vdCBuZWVkIGFsbG9jYXRpb25zIGlmIGVubGFyZ2luZyBhbiBhcnJheVxuLy8gdGhhdCBoYXMgYmVlbiBzaHJpbmtlZC5cbnR5cGUgR3JpZERpbWVuc2lvbnMgPSB7XG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbn07XG5cbmVudW0gRGFtYWdlS2luZCB7XG4gICAgQ2VsbCxcbiAgICBSZXNpemUsXG4gICAgU2Nyb2xsLFxufVxuXG4vLyBVc2VkIHRvIHRyYWNrIHJlY3RhbmdsZXMgb2YgZGFtYWdlIGRvbmUgdG8gYSBncmlkIGFuZCBvbmx5IHJlcGFpbnQgdGhlXG4vLyBuZWNlc3NhcnkgYml0cy4gVGhlc2UgYXJlIGxvZ2ljIHBvc2l0aW9ucyAoaS5lLiBjZWxscykgLSBub3QgcGl4ZWxzLlxudHlwZSBDZWxsRGFtYWdlID0ge1xuICAgIGtpbmQ6IERhbWFnZUtpbmQsXG4gICAgLy8gVGhlIG51bWJlciBvZiByb3dzIHRoZSBkYW1hZ2Ugc3BhbnNcbiAgICBoOiBudW1iZXIsXG4gICAgLy8gVGhlIG51bWJlciBvZiBjb2x1bW5zIHRoZSBkYW1hZ2Ugc3BhbnNcbiAgICB3OiBudW1iZXIsXG4gICAgLy8gVGhlIGNvbHVtbiB0aGUgZGFtYWdlIGJlZ2lucyBhdFxuICAgIHg6IG51bWJlcixcbiAgICAvLyBUaGUgcm93IHRoZSBkYW1hZ2UgYmVnaW5zIGF0XG4gICAgeTogbnVtYmVyLFxufTtcblxudHlwZSBSZXNpemVEYW1hZ2UgPSB7XG4gICAga2luZDogRGFtYWdlS2luZCxcbiAgICAvLyBUaGUgbmV3IGhlaWdodCBvZiB0aGUgY2FudmFzXG4gICAgaDogbnVtYmVyLFxuICAgIC8vIFRoZSBuZXcgd2lkdGggb2YgdGhlIGNhbnZhc1xuICAgIHc6IG51bWJlcixcbiAgICAvLyBUaGUgcHJldmlvdXMgd2lkdGggb2YgdGhlIGNhbnZhc1xuICAgIHg6IG51bWJlcixcbiAgICAvLyBUaGUgcHJldmlvdXMgaGVpZ2h0IG9mIHRoZSBjYW52YXNcbiAgICB5OiBudW1iZXIsXG59O1xuXG50eXBlIFNjcm9sbERhbWFnZSA9IHtcbiAgICBraW5kOiBEYW1hZ2VLaW5kLFxuICAgIC8vIFRoZSBkaXJlY3Rpb24gb2YgdGhlIHNjcm9sbCwgLTEgbWVhbnMgdXAsIDEgbWVhbnMgZG93blxuICAgIGg6IG51bWJlcixcbiAgICAvLyBUaGUgbnVtYmVyIG9mIGxpbmVzIG9mIHRoZSBzY3JvbGwsIHBvc2l0aXZlIG51bWJlclxuICAgIHc6IG51bWJlcixcbiAgICAvLyBUaGUgdG9wIGxpbmUgb2YgdGhlIHNjcm9sbGluZyByZWdpb24sIGluIGNlbGxzXG4gICAgeDogbnVtYmVyLFxuICAgIC8vIFRoZSBib3R0b20gbGluZSBvZiB0aGUgc2Nyb2xsaW5nIHJlZ2lvbiwgaW4gY2VsbHNcbiAgICB5OiBudW1iZXIsXG59O1xuXG50eXBlIEdyaWREYW1hZ2UgPSBDZWxsRGFtYWdlICYgUmVzaXplRGFtYWdlICYgU2Nyb2xsRGFtYWdlO1xuXG4vLyBUaGUgc3RhdGUgb2YgdGhlIGNvbW1hbmRsaW5lLiBJdCBpcyBvbmx5IHVzZWQgd2hlbiB1c2luZyBuZW92aW0ncyBleHRlcm5hbFxuLy8gY29tbWFuZGxpbmUuXG50eXBlIENvbW1hbmRMaW5lU3RhdGUgPSB7XG4gICAgc3RhdHVzOiBcImhpZGRlblwiIHwgXCJzaG93blwiLFxuICAgIGNvbnRlbnQ6IFthbnksIHN0cmluZ11bXSxcbiAgICBwb3M6IG51bWJlcixcbiAgICBmaXJzdGM6IHN0cmluZyxcbiAgICBwcm9tcHQ6IHN0cmluZyxcbiAgICBpbmRlbnQ6IG51bWJlcixcbiAgICBsZXZlbDogbnVtYmVyXG59O1xuXG50eXBlIEN1cnNvciA9IHtcbiAgICBjdXJyZW50R3JpZDogbnVtYmVyLFxuICAgIGRpc3BsYXk6IGJvb2xlYW4sXG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICBsYXN0TW92ZTogRE9NSGlnaFJlc1RpbWVTdGFtcCxcbiAgICBtb3ZlZFNpbmNlTGFzdE1lc3NhZ2U6IGJvb2xlYW4sXG59O1xuXG50eXBlIE1vZGUgPSB7XG4gICAgY3VycmVudDogbnVtYmVyLFxuICAgIHN0eWxlRW5hYmxlZDogYm9vbGVhbixcbiAgICBtb2RlSW5mbzoge1xuICAgICAgICBhdHRyX2lkOiBudW1iZXIsXG4gICAgICAgIGF0dHJfaWRfbG06IG51bWJlcixcbiAgICAgICAgYmxpbmtvZmY6IG51bWJlcixcbiAgICAgICAgYmxpbmtvbjogbnVtYmVyLFxuICAgICAgICBibGlua3dhaXQ6IG51bWJlcixcbiAgICAgICAgY2VsbF9wZXJjZW50YWdlOiBudW1iZXIsXG4gICAgICAgIGN1cnNvcl9zaGFwZTogc3RyaW5nLFxuICAgICAgICBuYW1lOiBOdmltTW9kZSxcbiAgICB9W10sXG59O1xuXG50eXBlIE1lc3NhZ2UgPSBbbnVtYmVyLCBzdHJpbmddW107XG50eXBlIE1lc3NhZ2VzUG9zaXRpb24gPSB7IHg6IG51bWJlciwgeTogbnVtYmVyIH07XG5cbnR5cGUgU3RhdGUgPSB7XG4gICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCxcbiAgICBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsXG4gICAgY29tbWFuZExpbmUgOiBDb21tYW5kTGluZVN0YXRlLFxuICAgIGN1cnNvcjogQ3Vyc29yLFxuICAgIGdyaWRDaGFyYWN0ZXJzOiBzdHJpbmdbXVtdW10sXG4gICAgZ3JpZERhbWFnZXM6IEdyaWREYW1hZ2VbXVtdLFxuICAgIGdyaWREYW1hZ2VzQ291bnQ6IG51bWJlcltdLFxuICAgIGdyaWRIaWdobGlnaHRzOiBudW1iZXJbXVtdW10sXG4gICAgZ3JpZFNpemVzOiBHcmlkRGltZW5zaW9uc1tdLFxuICAgIGhpZ2hsaWdodHM6IEhpZ2hsaWdodEluZm9bXSxcbiAgICBsYXN0TWVzc2FnZTogRE9NSGlnaFJlc1RpbWVTdGFtcCxcbiAgICBsaW5lc3BhY2U6IG51bWJlcixcbiAgICBtZXNzYWdlczogTWVzc2FnZVtdLFxuICAgIG1lc3NhZ2VzUG9zaXRpb25zOiBNZXNzYWdlc1Bvc2l0aW9uW10sXG4gICAgbW9kZTogTW9kZSxcbiAgICBydWxlcjogTWVzc2FnZSxcbiAgICBzaG93Y21kOiBNZXNzYWdlLFxuICAgIHNob3dtb2RlOiBNZXNzYWdlLFxufTtcblxuY29uc3QgZ2xvYmFsU3RhdGU6IFN0YXRlID0ge1xuICAgIGNhbnZhczogdW5kZWZpbmVkLFxuICAgIGNvbnRleHQ6IHVuZGVmaW5lZCxcbiAgICBjb21tYW5kTGluZToge1xuICAgICAgICBzdGF0dXM6IFwiaGlkZGVuXCIsXG4gICAgICAgIGNvbnRlbnQ6IFtdLFxuICAgICAgICBwb3M6IDAsXG4gICAgICAgIGZpcnN0YzogXCJcIixcbiAgICAgICAgcHJvbXB0OiBcIlwiLFxuICAgICAgICBpbmRlbnQ6IDAsXG4gICAgICAgIGxldmVsOiAwLFxuICAgIH0sXG4gICAgY3Vyc29yOiB7XG4gICAgICAgIGN1cnJlbnRHcmlkOiAxLFxuICAgICAgICBkaXNwbGF5OiB0cnVlLFxuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwLFxuICAgICAgICBsYXN0TW92ZTogcGVyZm9ybWFuY2Uubm93KCksXG4gICAgICAgIG1vdmVkU2luY2VMYXN0TWVzc2FnZTogZmFsc2UsXG4gICAgfSxcbiAgICBncmlkQ2hhcmFjdGVyczogW10sXG4gICAgZ3JpZERhbWFnZXM6IFtdLFxuICAgIGdyaWREYW1hZ2VzQ291bnQ6IFtdLFxuICAgIGdyaWRIaWdobGlnaHRzOiBbXSxcbiAgICBncmlkU2l6ZXM6IFtdLFxuICAgIGhpZ2hsaWdodHM6IFtuZXdIaWdobGlnaHQoZGVmYXVsdEJhY2tncm91bmQsIGRlZmF1bHRGb3JlZ3JvdW5kKV0sXG4gICAgbGFzdE1lc3NhZ2U6IHBlcmZvcm1hbmNlLm5vdygpLFxuICAgIGxpbmVzcGFjZTogMCxcbiAgICBtZXNzYWdlczogW10sXG4gICAgbWVzc2FnZXNQb3NpdGlvbnM6IFtdLFxuICAgIG1vZGU6IHtcbiAgICAgICAgY3VycmVudDogMCxcbiAgICAgICAgc3R5bGVFbmFibGVkIDogZmFsc2UsXG4gICAgICAgIG1vZGVJbmZvOiBbe1xuICAgICAgICAgICAgYXR0cl9pZDogMCxcbiAgICAgICAgICAgIGF0dHJfaWRfbG06IDAsXG4gICAgICAgICAgICBibGlua29mZjogMCxcbiAgICAgICAgICAgIGJsaW5rb246IDAsXG4gICAgICAgICAgICBibGlua3dhaXQ6IDAsXG4gICAgICAgICAgICBjZWxsX3BlcmNlbnRhZ2U6IDAsXG4gICAgICAgICAgICBjdXJzb3Jfc2hhcGU6IFwiYmxvY2tcIixcbiAgICAgICAgICAgIG5hbWU6IFwibm9ybWFsXCIsXG4gICAgICAgIH1dXG4gICAgfSxcbiAgICBydWxlcjogdW5kZWZpbmVkLFxuICAgIHNob3djbWQ6IHVuZGVmaW5lZCxcbiAgICBzaG93bW9kZTogdW5kZWZpbmVkLFxufTtcblxuZnVuY3Rpb24gcHVzaERhbWFnZShncmlkOiBudW1iZXIsIGtpbmQ6IERhbWFnZUtpbmQsIGg6IG51bWJlciwgdzogbnVtYmVyLCB4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgIGNvbnN0IGRhbWFnZXMgPSBnbG9iYWxTdGF0ZS5ncmlkRGFtYWdlc1tncmlkXTtcbiAgICBjb25zdCBjb3VudCA9IGdsb2JhbFN0YXRlLmdyaWREYW1hZ2VzQ291bnRbZ3JpZF07XG4gICAgaWYgKGRhbWFnZXMubGVuZ3RoID09PSBjb3VudCkge1xuICAgICAgICBkYW1hZ2VzLnB1c2goeyBraW5kLCBoLCB3LCB4LCB5IH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGRhbWFnZXNbY291bnRdLmtpbmQgPSBraW5kO1xuICAgICAgICBkYW1hZ2VzW2NvdW50XS5oID0gaDtcbiAgICAgICAgZGFtYWdlc1tjb3VudF0udyA9IHc7XG4gICAgICAgIGRhbWFnZXNbY291bnRdLnggPSB4O1xuICAgICAgICBkYW1hZ2VzW2NvdW50XS55ID0geTtcbiAgICB9XG4gICAgZ2xvYmFsU3RhdGUuZ3JpZERhbWFnZXNDb3VudFtncmlkXSA9IGNvdW50ICsgMTtcbn1cblxubGV0IG1heENlbGxXaWR0aDogbnVtYmVyO1xubGV0IG1heENlbGxIZWlnaHQ6IG51bWJlcjtcbmxldCBtYXhCYXNlbGluZURpc3RhbmNlOiBudW1iZXI7XG5mdW5jdGlvbiByZWNvbXB1dGVDaGFyU2l6ZSAoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcbiAgICAvLyA5NCwgSyszMjogd2UgaWdub3JlIHRoZSBmaXJzdCAzMiBhc2NpaSBjaGFycyBiZWNhdXNlIHRoZXkncmUgbm9uLXByaW50YWJsZVxuICAgIGNvbnN0IGNoYXJzID0gbmV3IEFycmF5KDk0KVxuICAgICAgICAuZmlsbCgwKVxuICAgICAgICAubWFwKChfLCBrKSA9PiBTdHJpbmcuZnJvbUNoYXJDb2RlKGsgKyAzMikpXG4gICAgICAgIC8vIENvbmNhdGVuaW5nIMOCIGJlY2F1c2UgdGhhdCdzIHRoZSB0YWxsZXN0IGNoYXJhY3RlciBJIGNhbiB0aGluayBvZi5cbiAgICAgICAgLmNvbmNhdChbXCLDglwiXSk7XG4gICAgbGV0IHdpZHRoID0gMDtcbiAgICBsZXQgaGVpZ2h0ID0gMDtcbiAgICBsZXQgYmFzZWxpbmUgPSAwO1xuICAgIGxldCBtZWFzdXJlOiBUZXh0TWV0cmljcztcbiAgICBmb3IgKGNvbnN0IGNoYXIgb2YgY2hhcnMpIHtcbiAgICAgICAgbWVhc3VyZSA9IGN0eC5tZWFzdXJlVGV4dChjaGFyKTtcbiAgICAgICAgaWYgKG1lYXN1cmUud2lkdGggPiB3aWR0aCkge1xuICAgICAgICAgICAgd2lkdGggPSBtZWFzdXJlLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0bXAgPSBNYXRoLmFicyhtZWFzdXJlLmFjdHVhbEJvdW5kaW5nQm94QXNjZW50KTtcbiAgICAgICAgaWYgKHRtcCA+IGJhc2VsaW5lKSB7XG4gICAgICAgICAgICBiYXNlbGluZSA9IHRtcDtcbiAgICAgICAgfVxuICAgICAgICB0bXAgKz0gTWF0aC5hYnMobWVhc3VyZS5hY3R1YWxCb3VuZGluZ0JveERlc2NlbnQpO1xuICAgICAgICBpZiAodG1wID4gaGVpZ2h0KSB7XG4gICAgICAgICAgICBoZWlnaHQgPSB0bXA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbWF4Q2VsbFdpZHRoID0gTWF0aC5jZWlsKHdpZHRoKTtcbiAgICBtYXhDZWxsSGVpZ2h0ID0gTWF0aC5jZWlsKGhlaWdodCkgKyBnbG9iYWxTdGF0ZS5saW5lc3BhY2U7XG4gICAgbWF4QmFzZWxpbmVEaXN0YW5jZSA9IGJhc2VsaW5lO1xuICAgIG1ldHJpY3NJbnZhbGlkYXRlZCA9IGZhbHNlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldEdseXBoSW5mbyAoc3RhdGU6IFN0YXRlKSB7XG4gICAgaWYgKG1ldHJpY3NJbnZhbGlkYXRlZFxuICAgICAgICB8fCBtYXhDZWxsV2lkdGggPT09IHVuZGVmaW5lZFxuICAgICAgICB8fCBtYXhDZWxsSGVpZ2h0ID09PSB1bmRlZmluZWRcbiAgICAgICAgfHwgbWF4QmFzZWxpbmVEaXN0YW5jZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlY29tcHV0ZUNoYXJTaXplKHN0YXRlLmNvbnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gW21heENlbGxXaWR0aCwgbWF4Q2VsbEhlaWdodCwgbWF4QmFzZWxpbmVEaXN0YW5jZV07XG59XG5mdW5jdGlvbiBtZWFzdXJlV2lkdGgoc3RhdGU6IFN0YXRlLCBjaGFyOiBzdHJpbmcpIHtcbiAgICBjb25zdCBjaGFyV2lkdGggPSBnZXRHbHlwaEluZm8oc3RhdGUpWzBdO1xuICAgIHJldHVybiBNYXRoLmNlaWwoc3RhdGUuY29udGV4dC5tZWFzdXJlVGV4dChjaGFyKS53aWR0aCAvIGNoYXJXaWR0aCkgKiBjaGFyV2lkdGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2dpY2FsU2l6ZSgpIHtcbiAgICBjb25zdCBzdGF0ZSA9IGdsb2JhbFN0YXRlO1xuICAgIGNvbnN0IFtjZWxsV2lkdGgsIGNlbGxIZWlnaHRdID0gZ2V0R2x5cGhJbmZvKHN0YXRlKTtcbiAgICByZXR1cm4gW01hdGguZmxvb3Ioc3RhdGUuY2FudmFzLndpZHRoIC8gY2VsbFdpZHRoKSwgTWF0aC5mbG9vcihzdGF0ZS5jYW52YXMuaGVpZ2h0IC8gY2VsbEhlaWdodCldO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZUdyaWREaW1lbnNpb25zRm9yICh3aWR0aCA6IG51bWJlciwgaGVpZ2h0IDogbnVtYmVyKSB7XG4gICAgY29uc3QgW2NlbGxXaWR0aCwgY2VsbEhlaWdodF0gPSBnZXRHbHlwaEluZm8oZ2xvYmFsU3RhdGUpO1xuICAgIHJldHVybiBbTWF0aC5mbG9vcih3aWR0aCAvIGNlbGxXaWR0aCksIE1hdGguZmxvb3IoaGVpZ2h0IC8gY2VsbEhlaWdodCldO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0R3JpZENvb3JkaW5hdGVzICh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgIGNvbnN0IFtjZWxsV2lkdGgsIGNlbGxIZWlnaHRdID0gZ2V0R2x5cGhJbmZvKGdsb2JhbFN0YXRlKTtcbiAgICByZXR1cm4gW01hdGguZmxvb3IoeCAqIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIC8gY2VsbFdpZHRoKSwgTWF0aC5mbG9vcih5ICogd2luZG93LmRldmljZVBpeGVsUmF0aW8gLyBjZWxsSGVpZ2h0KV07XG59XG5cbmZ1bmN0aW9uIG5ld0hpZ2hsaWdodCAoYmc6IHN0cmluZywgZmc6IHN0cmluZyk6IEhpZ2hsaWdodEluZm8ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGJhY2tncm91bmQ6IGJnLFxuICAgICAgICBib2xkOiB1bmRlZmluZWQsXG4gICAgICAgIGJsZW5kOiB1bmRlZmluZWQsXG4gICAgICAgIGZvcmVncm91bmQ6IGZnLFxuICAgICAgICBpdGFsaWM6IHVuZGVmaW5lZCxcbiAgICAgICAgcmV2ZXJzZTogdW5kZWZpbmVkLFxuICAgICAgICBzcGVjaWFsOiB1bmRlZmluZWQsXG4gICAgICAgIHN0cmlrZXRocm91Z2g6IHVuZGVmaW5lZCxcbiAgICAgICAgdW5kZXJjdXJsOiB1bmRlZmluZWQsXG4gICAgICAgIHVuZGVybGluZTogdW5kZWZpbmVkLFxuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRHcmlkSWQoKSB7XG4gICAgcmV0dXJuIDE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDdXJyZW50TW9kZSgpIHtcbiAgICBjb25zdCBtb2RlID0gZ2xvYmFsU3RhdGUubW9kZTtcbiAgICByZXR1cm4gbW9kZS5tb2RlSW5mb1ttb2RlLmN1cnJlbnRdLm5hbWU7XG59XG5cbmZ1bmN0aW9uIGdldENvbW1hbmRMaW5lUmVjdCAoc3RhdGU6IFN0YXRlKSB7XG4gICAgY29uc3QgW3dpZHRoLCBoZWlnaHRdID0gZ2V0R2x5cGhJbmZvKHN0YXRlKTtcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiB3aWR0aCAtIDEsXG4gICAgICAgIHk6ICgoc3RhdGUuY2FudmFzLmhlaWdodCAtIGhlaWdodCAtIDEpIC8gMiksXG4gICAgICAgIHdpZHRoOiAoc3RhdGUuY2FudmFzLndpZHRoIC0gKHdpZHRoICogMikpICsgMixcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHQgKyAyLFxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGRhbWFnZUNvbW1hbmRMaW5lU3BhY2UgKHN0YXRlOiBTdGF0ZSkge1xuICAgIGNvbnN0IFt3aWR0aCwgaGVpZ2h0XSA9IGdldEdseXBoSW5mbyhzdGF0ZSk7XG4gICAgY29uc3QgcmVjdCA9IGdldENvbW1hbmRMaW5lUmVjdChzdGF0ZSk7XG4gICAgY29uc3QgZ2lkID0gZ2V0R3JpZElkKCk7XG4gICAgY29uc3QgZGltZW5zaW9ucyA9IGdsb2JhbFN0YXRlLmdyaWRTaXplc1tnaWRdO1xuICAgIHB1c2hEYW1hZ2UoZ2lkLFxuICAgICAgICAgICAgICAgRGFtYWdlS2luZC5DZWxsLFxuICAgICAgICAgICAgICAgTWF0aC5taW4oTWF0aC5jZWlsKHJlY3QuaGVpZ2h0IC8gaGVpZ2h0KSArIDEsIGRpbWVuc2lvbnMuaGVpZ2h0KSxcbiAgICAgICAgICAgICAgIE1hdGgubWluKE1hdGguY2VpbChyZWN0LndpZHRoIC8gd2lkdGgpICsgMSwgZGltZW5zaW9ucy53aWR0aCksXG4gICAgICAgICAgICAgICBNYXRoLm1heChNYXRoLmZsb29yKHJlY3QueCAvIHdpZHRoKSwgMCksXG4gICAgICAgICAgICAgICBNYXRoLm1heChNYXRoLmZsb29yKHJlY3QueSAvIGhlaWdodCksIDApKTtcbn1cblxuZnVuY3Rpb24gZGFtYWdlTWVzc2FnZXNTcGFjZSAoc3RhdGU6IFN0YXRlKSB7XG4gICAgY29uc3QgZ0lkID0gZ2V0R3JpZElkKCk7XG4gICAgY29uc3QgbXNnUG9zID0gZ2xvYmFsU3RhdGUubWVzc2FnZXNQb3NpdGlvbnNbZ0lkXTtcbiAgICBjb25zdCBkaW1lbnNpb25zID0gZ2xvYmFsU3RhdGUuZ3JpZFNpemVzW2dJZF07XG4gICAgY29uc3QgW2NoYXJXaWR0aCwgY2hhckhlaWdodF0gPSBnZXRHbHlwaEluZm8oc3RhdGUpO1xuICAgIHB1c2hEYW1hZ2UoZ0lkLFxuICAgICAgICAgICAgICAgRGFtYWdlS2luZC5DZWxsLFxuICAgICAgICAgICAgICAgTWF0aC5taW4oXG4gICAgICAgICAgICAgICAgICAgTWF0aC5jZWlsKChzdGF0ZS5jYW52YXMuaGVpZ2h0IC0gbXNnUG9zLnkpIC8gY2hhckhlaWdodCkgKyAyLFxuICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMuaGVpZ2h0KSxcbiAgICAgICAgICAgICAgIE1hdGgubWluKFxuICAgICAgICAgICAgICAgICAgIE1hdGguY2VpbCgoc3RhdGUuY2FudmFzLndpZHRoIC0gbXNnUG9zLngpIC8gY2hhcldpZHRoKSArIDIsXG4gICAgICAgICAgICAgICAgICAgZGltZW5zaW9ucy53aWR0aCksXG4gICAgICAgICAgICAgICBNYXRoLm1heChNYXRoLmZsb29yKG1zZ1Bvcy54IC8gY2hhcldpZHRoKSAtIDEsIDApLFxuICAgICAgICAgICAgICAgTWF0aC5tYXgoTWF0aC5mbG9vcihtc2dQb3MueSAvIGNoYXJIZWlnaHQpIC0gMSwgMCkpO1xuICAgIG1zZ1Bvcy54ID0gc3RhdGUuY2FudmFzLndpZHRoO1xuICAgIG1zZ1Bvcy55ID0gc3RhdGUuY2FudmFzLmhlaWdodDtcbn1cblxuY29uc3QgaGFuZGxlcnMgOiB7IFtrZXk6c3RyaW5nXSA6ICguLi5hcmdzOiBhbnlbXSk9PnZvaWQgfSA9IHtcbiAgICBidXN5X3N0YXJ0OiAoKSA9PiB7XG4gICAgICAgIHB1c2hEYW1hZ2UoZ2V0R3JpZElkKCksIERhbWFnZUtpbmQuQ2VsbCwgMSwgMSwgZ2xvYmFsU3RhdGUuY3Vyc29yLngsIGdsb2JhbFN0YXRlLmN1cnNvci55KTtcbiAgICAgICAgZ2xvYmFsU3RhdGUuY3Vyc29yLmRpc3BsYXkgPSBmYWxzZTtcbiAgICB9LFxuICAgIGJ1c3lfc3RvcDogKCkgPT4geyBnbG9iYWxTdGF0ZS5jdXJzb3IuZGlzcGxheSA9IHRydWU7IH0sXG4gICAgY21kbGluZV9oaWRlOiAoKSA9PiB7XG4gICAgICAgIGdsb2JhbFN0YXRlLmNvbW1hbmRMaW5lLnN0YXR1cyA9IFwiaGlkZGVuXCI7XG4gICAgICAgIGRhbWFnZUNvbW1hbmRMaW5lU3BhY2UoZ2xvYmFsU3RhdGUpO1xuICAgIH0sXG4gICAgY21kbGluZV9wb3M6IChwb3M6IG51bWJlciwgbGV2ZWw6IG51bWJlcikgPT4ge1xuICAgICAgICBnbG9iYWxTdGF0ZS5jb21tYW5kTGluZS5wb3MgPSBwb3M7XG4gICAgICAgIGdsb2JhbFN0YXRlLmNvbW1hbmRMaW5lLmxldmVsID0gbGV2ZWw7XG4gICAgfSxcbiAgICBjbWRsaW5lX3Nob3c6XG4gICAgICAgIChjb250ZW50OiBbYW55LCBzdHJpbmddW10sXG4gICAgICAgICBwb3M6IG51bWJlcixcbiAgICAgICAgIGZpcnN0Yzogc3RyaW5nLFxuICAgICAgICAgcHJvbXB0OiBzdHJpbmcsXG4gICAgICAgICBpbmRlbnQ6IG51bWJlcixcbiAgICAgICAgIGxldmVsOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICBnbG9iYWxTdGF0ZS5jb21tYW5kTGluZS5zdGF0dXMgPSBcInNob3duXCI7XG4gICAgICAgICAgICAgZ2xvYmFsU3RhdGUuY29tbWFuZExpbmUuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgICAgICAgZ2xvYmFsU3RhdGUuY29tbWFuZExpbmUucG9zID0gcG9zO1xuICAgICAgICAgICAgIGdsb2JhbFN0YXRlLmNvbW1hbmRMaW5lLmZpcnN0YyA9IGZpcnN0YztcbiAgICAgICAgICAgICBnbG9iYWxTdGF0ZS5jb21tYW5kTGluZS5wcm9tcHQgPSBwcm9tcHQ7XG4gICAgICAgICAgICAgZ2xvYmFsU3RhdGUuY29tbWFuZExpbmUuaW5kZW50ID0gaW5kZW50O1xuICAgICAgICAgICAgIGdsb2JhbFN0YXRlLmNvbW1hbmRMaW5lLmxldmVsID0gbGV2ZWw7XG4gICAgICAgICB9LFxuICAgIGRlZmF1bHRfY29sb3JzX3NldDogKGZnOiBudW1iZXIsIGJnOiBudW1iZXIsIHNwOiBudW1iZXIpID0+IHtcbiAgICAgICAgaWYgKGZnICE9PSB1bmRlZmluZWQgJiYgZmcgIT09IC0xKSB7XG4gICAgICAgICAgICBnbG9iYWxTdGF0ZS5oaWdobGlnaHRzWzBdLmZvcmVncm91bmQgPSB0b0hleENzcyhmZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJnICE9PSB1bmRlZmluZWQgJiYgYmcgIT09IC0xKSB7XG4gICAgICAgICAgICBnbG9iYWxTdGF0ZS5oaWdobGlnaHRzWzBdLmJhY2tncm91bmQgPSB0b0hleENzcyhiZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNwICE9PSB1bmRlZmluZWQgJiYgc3AgIT09IC0xKSB7XG4gICAgICAgICAgICBnbG9iYWxTdGF0ZS5oaWdobGlnaHRzWzBdLnNwZWNpYWwgPSB0b0hleENzcyhzcCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY3VyR3JpZFNpemUgPSBnbG9iYWxTdGF0ZS5ncmlkU2l6ZXNbZ2V0R3JpZElkKCldO1xuICAgICAgICBpZiAoY3VyR3JpZFNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcHVzaERhbWFnZShnZXRHcmlkSWQoKSwgRGFtYWdlS2luZC5DZWxsLCBjdXJHcmlkU2l6ZS5oZWlnaHQsIGN1ckdyaWRTaXplLndpZHRoLCAwLCAwKTtcbiAgICAgICAgfVxuICAgICAgICB3aXBlR2x5cGhDYWNoZSgpO1xuICAgIH0sXG4gICAgZmx1c2g6ICgpID0+IHtcbiAgICAgICAgc2NoZWR1bGVGcmFtZSgpO1xuICAgIH0sXG4gICAgZ3JpZF9jbGVhcjogKGlkOiBudW1iZXIpID0+IHtcbiAgICAgICAgLy8gZ2xhY2FtYnJlOiBXaGF0IHNob3VsZCBhY3R1YWxseSBoYXBwZW4gb24gZ3JpZF9jbGVhcj8gVGhlXG4gICAgICAgIC8vICAgICAgICAgICAgZG9jdW1lbnRhdGlvbiBzYXlzIFwiY2xlYXIgdGhlIGdyaWRcIiwgYnV0IHdoYXQgZG9lcyB0aGF0XG4gICAgICAgIC8vICAgICAgICAgICAgbWVhbj8gSSBndWVzcyB0aGUgY2hhcmFjdGVycyBzaG91bGQgYmUgcmVtb3ZlZCwgYnV0IHdoYXRcbiAgICAgICAgLy8gICAgICAgICAgICBhYm91dCB0aGUgaGlnaGxpZ2h0cz8gQXJlIHRoZXJlIG90aGVyIHRoaW5ncyB0aGF0IG5lZWQgdG9cbiAgICAgICAgLy8gICAgICAgICAgICBiZSBjbGVhcmVkP1xuICAgICAgICAvLyBiZnJlZGw6IHRvIGRlZmF1bHQgYmcgY29sb3JcbiAgICAgICAgLy8gICAgICAgICBncmlkX2NsZWFyIGlzIG5vdCBtZWFudCB0byBiZSB1c2VkIG9mdGVuXG4gICAgICAgIC8vICAgICAgICAgaXQgaXMgbW9yZSBcInRoZSB0ZXJtaW5hbCBnb3Qgc2NyZXdlZCB1cCwgYmV0dGVyIHRvIGJlIHNhZmVcbiAgICAgICAgLy8gICAgICAgICB0aGFuIHNvcnJ5XCJcbiAgICAgICAgY29uc3QgY2hhckdyaWQgPSBnbG9iYWxTdGF0ZS5ncmlkQ2hhcmFjdGVyc1tpZF07XG4gICAgICAgIGNvbnN0IGhpZ2hHcmlkID0gZ2xvYmFsU3RhdGUuZ3JpZEhpZ2hsaWdodHNbaWRdO1xuICAgICAgICBjb25zdCBkaW1zID0gZ2xvYmFsU3RhdGUuZ3JpZFNpemVzW2lkXTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBkaW1zLmhlaWdodDsgKytqKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpbXMud2lkdGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGNoYXJHcmlkW2pdW2ldID0gXCIgXCI7XG4gICAgICAgICAgICAgICAgaGlnaEdyaWRbal1baV0gPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHB1c2hEYW1hZ2UoaWQsIERhbWFnZUtpbmQuQ2VsbCwgZGltcy5oZWlnaHQsIGRpbXMud2lkdGgsIDAsIDApO1xuICAgIH0sXG4gICAgZ3JpZF9jdXJzb3JfZ290bzogKGlkOiBudW1iZXIsIHJvdzogbnVtYmVyLCBjb2x1bW46IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBjdXJzb3IgPSBnbG9iYWxTdGF0ZS5jdXJzb3I7XG4gICAgICAgIHB1c2hEYW1hZ2UoZ2V0R3JpZElkKCksIERhbWFnZUtpbmQuQ2VsbCwgMSwgMSwgY3Vyc29yLngsIGN1cnNvci55KTtcbiAgICAgICAgY3Vyc29yLmN1cnJlbnRHcmlkID0gaWQ7XG4gICAgICAgIGN1cnNvci54ID0gY29sdW1uO1xuICAgICAgICBjdXJzb3IueSA9IHJvdztcbiAgICAgICAgY3Vyc29yLmxhc3RNb3ZlID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgIGN1cnNvci5tb3ZlZFNpbmNlTGFzdE1lc3NhZ2UgPSB0cnVlO1xuICAgIH0sXG4gICAgZ3JpZF9saW5lOiAoaWQ6IG51bWJlciwgcm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCBjaGFuZ2VzOiAgYW55W10pID0+IHtcbiAgICAgICAgY29uc3QgY2hhckdyaWQgPSBnbG9iYWxTdGF0ZS5ncmlkQ2hhcmFjdGVyc1tpZF07XG4gICAgICAgIGNvbnN0IGhpZ2hsaWdodHMgPSBnbG9iYWxTdGF0ZS5ncmlkSGlnaGxpZ2h0c1tpZF07XG4gICAgICAgIGxldCBwcmV2Q29sID0gY29sO1xuICAgICAgICBsZXQgaGlnaCA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhbmdlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgY29uc3QgY2hhbmdlID0gY2hhbmdlc1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGNoYXJhID0gY2hhbmdlWzBdO1xuICAgICAgICAgICAgaWYgKGNoYW5nZVsxXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaGlnaCA9IGNoYW5nZVsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJlcGVhdCA9IGNoYW5nZVsyXSA9PT0gdW5kZWZpbmVkID8gMSA6IGNoYW5nZVsyXTtcblxuICAgICAgICAgICAgcHVzaERhbWFnZShpZCwgRGFtYWdlS2luZC5DZWxsLCAxLCByZXBlYXQsIHByZXZDb2wsIHJvdyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGxpbWl0ID0gcHJldkNvbCArIHJlcGVhdDtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSBwcmV2Q29sOyBqIDwgbGltaXQ7IGogKz0gMSkge1xuICAgICAgICAgICAgICAgIGNoYXJHcmlkW3Jvd11bal0gPSBjaGFyYTtcbiAgICAgICAgICAgICAgICBoaWdobGlnaHRzW3Jvd11bal0gPSBoaWdoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldkNvbCA9IGxpbWl0O1xuICAgICAgICB9XG4gICAgfSxcbiAgICBncmlkX3Jlc2l6ZTogKGlkOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gZ2xvYmFsU3RhdGU7XG4gICAgICAgIGNvbnN0IGNyZWF0ZUdyaWQgPSBzdGF0ZS5ncmlkQ2hhcmFjdGVyc1tpZF0gPT09IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKGNyZWF0ZUdyaWQpIHtcbiAgICAgICAgICAgIHN0YXRlLmdyaWRDaGFyYWN0ZXJzW2lkXSA9IFtdO1xuICAgICAgICAgICAgc3RhdGUuZ3JpZENoYXJhY3RlcnNbaWRdLnB1c2goW10pO1xuICAgICAgICAgICAgc3RhdGUuZ3JpZFNpemVzW2lkXSA9IHsgd2lkdGg6IDAsIGhlaWdodDogMCB9O1xuICAgICAgICAgICAgc3RhdGUuZ3JpZERhbWFnZXNbaWRdID0gW107XG4gICAgICAgICAgICBzdGF0ZS5ncmlkRGFtYWdlc0NvdW50W2lkXSA9IDA7XG4gICAgICAgICAgICBzdGF0ZS5ncmlkSGlnaGxpZ2h0c1tpZF0gPSBbXTtcbiAgICAgICAgICAgIHN0YXRlLmdyaWRIaWdobGlnaHRzW2lkXS5wdXNoKFtdKTtcbiAgICAgICAgICAgIHN0YXRlLm1lc3NhZ2VzUG9zaXRpb25zW2lkXSA9IHtcbiAgICAgICAgICAgICAgICB4OiBzdGF0ZS5jYW52YXMud2lkdGgsXG4gICAgICAgICAgICAgICAgeTogc3RhdGUuY2FudmFzLmhlaWdodCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjdXJHcmlkU2l6ZSA9IGdsb2JhbFN0YXRlLmdyaWRTaXplc1tpZF07XG5cbiAgICAgICAgcHVzaERhbWFnZShpZCwgRGFtYWdlS2luZC5SZXNpemUsIGhlaWdodCwgd2lkdGgsIGN1ckdyaWRTaXplLndpZHRoLCBjdXJHcmlkU2l6ZS5oZWlnaHQpO1xuXG4gICAgICAgIGNvbnN0IGhpZ2hsaWdodHMgPSBnbG9iYWxTdGF0ZS5ncmlkSGlnaGxpZ2h0c1tpZF07XG4gICAgICAgIGNvbnN0IGNoYXJHcmlkID0gZ2xvYmFsU3RhdGUuZ3JpZENoYXJhY3RlcnNbaWRdO1xuICAgICAgICBpZiAod2lkdGggPiBjaGFyR3JpZFswXS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhckdyaWQubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBjaGFyR3JpZFtpXTtcbiAgICAgICAgICAgICAgICBjb25zdCBoaWdocyA9IGhpZ2hsaWdodHNbaV07XG4gICAgICAgICAgICAgICAgd2hpbGUgKHJvdy5sZW5ndGggPCB3aWR0aCkge1xuICAgICAgICAgICAgICAgICAgICByb3cucHVzaChcIiBcIik7XG4gICAgICAgICAgICAgICAgICAgIGhpZ2hzLnB1c2goMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChoZWlnaHQgPiBjaGFyR3JpZC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHdoaWxlIChjaGFyR3JpZC5sZW5ndGggPCBoZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBjaGFyR3JpZC5wdXNoKChuZXcgQXJyYXkod2lkdGgpKS5maWxsKFwiIFwiKSk7XG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0cy5wdXNoKChuZXcgQXJyYXkod2lkdGgpKS5maWxsKDApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwdXNoRGFtYWdlKGlkLCBEYW1hZ2VLaW5kLkNlbGwsIDAsIHdpZHRoLCAwLCBjdXJHcmlkU2l6ZS5oZWlnaHQpO1xuICAgICAgICBjdXJHcmlkU2l6ZS53aWR0aCA9IHdpZHRoO1xuICAgICAgICBjdXJHcmlkU2l6ZS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgfSxcbiAgICBncmlkX3Njcm9sbDogKGlkOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICB0b3A6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgIGJvdDogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgbGVmdDogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgcmlnaHQ6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgIHJvd3M6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgIF9jb2xzOiBudW1iZXIpID0+IHtcbiAgICAgICAgY29uc3QgZGltZW5zaW9ucyA9IGdsb2JhbFN0YXRlLmdyaWRTaXplc1tpZF07XG4gICAgICAgIGNvbnN0IGNoYXJHcmlkID0gZ2xvYmFsU3RhdGUuZ3JpZENoYXJhY3RlcnNbaWRdO1xuICAgICAgICBjb25zdCBoaWdoR3JpZCA9IGdsb2JhbFN0YXRlLmdyaWRIaWdobGlnaHRzW2lkXTtcbiAgICAgICAgaWYgKHJvd3MgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBib3R0b20gPSAoYm90ICsgcm93cykgPj0gZGltZW5zaW9ucy5oZWlnaHRcbiAgICAgICAgICAgICAgICA/IGRpbWVuc2lvbnMuaGVpZ2h0IC0gcm93c1xuICAgICAgICAgICAgICAgIDogYm90O1xuICAgICAgICAgICAgZm9yIChsZXQgeSA9IHRvcDsgeSA8IGJvdHRvbTsgKyt5KSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3JjQ2hhcnMgPSBjaGFyR3JpZFt5ICsgcm93c107XG4gICAgICAgICAgICAgICAgY29uc3QgZHN0Q2hhcnMgPSBjaGFyR3JpZFt5XTtcbiAgICAgICAgICAgICAgICBjb25zdCBzcmNIaWdocyA9IGhpZ2hHcmlkW3kgKyByb3dzXTtcbiAgICAgICAgICAgICAgICBjb25zdCBkc3RIaWdocyA9IGhpZ2hHcmlkW3ldO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSBsZWZ0OyB4IDwgcmlnaHQ7ICsreCkge1xuICAgICAgICAgICAgICAgICAgICBkc3RDaGFyc1t4XSA9IHNyY0NoYXJzW3hdO1xuICAgICAgICAgICAgICAgICAgICBkc3RIaWdoc1t4XSA9IHNyY0hpZ2hzW3hdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHB1c2hEYW1hZ2UoaWQsIERhbWFnZUtpbmQuQ2VsbCwgZGltZW5zaW9ucy5oZWlnaHQsIGRpbWVuc2lvbnMud2lkdGgsIDAsIDApO1xuICAgICAgICB9IGVsc2UgaWYgKHJvd3MgPCAwKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gYm90IC0gMTsgeSA+PSB0b3AgJiYgKHkgKyByb3dzKSA+PSAwOyAtLXkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzcmNDaGFycyA9IGNoYXJHcmlkW3kgKyByb3dzXTtcbiAgICAgICAgICAgICAgICBjb25zdCBkc3RDaGFycyA9IGNoYXJHcmlkW3ldO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNyY0hpZ2hzID0gaGlnaEdyaWRbeSArIHJvd3NdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRzdEhpZ2hzID0gaGlnaEdyaWRbeV07XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgeCA9IGxlZnQ7IHggPCByaWdodDsgKyt4KSB7XG4gICAgICAgICAgICAgICAgICAgIGRzdENoYXJzW3hdID0gc3JjQ2hhcnNbeF07XG4gICAgICAgICAgICAgICAgICAgIGRzdEhpZ2hzW3hdID0gc3JjSGlnaHNbeF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHVzaERhbWFnZShpZCwgRGFtYWdlS2luZC5DZWxsLCBkaW1lbnNpb25zLmhlaWdodCwgZGltZW5zaW9ucy53aWR0aCwgMCwgMCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGhsX2F0dHJfZGVmaW5lOiAoaWQ6IG51bWJlciwgcmdiQXR0cjogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IGhpZ2hsaWdodHMgPSBnbG9iYWxTdGF0ZS5oaWdobGlnaHRzO1xuICAgICAgICBpZiAoaGlnaGxpZ2h0c1tpZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaGlnaGxpZ2h0c1tpZF0gPSBuZXdIaWdobGlnaHQodW5kZWZpbmVkLCB1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgICAgIGhpZ2hsaWdodHNbaWRdLmZvcmVncm91bmQgPSB0b0hleENzcyhyZ2JBdHRyLmZvcmVncm91bmQpO1xuICAgICAgICBoaWdobGlnaHRzW2lkXS5iYWNrZ3JvdW5kID0gdG9IZXhDc3MocmdiQXR0ci5iYWNrZ3JvdW5kKTtcbiAgICAgICAgaGlnaGxpZ2h0c1tpZF0uYm9sZCA9IHJnYkF0dHIuYm9sZDtcbiAgICAgICAgaGlnaGxpZ2h0c1tpZF0uYmxlbmQgPSByZ2JBdHRyLmJsZW5kO1xuICAgICAgICBoaWdobGlnaHRzW2lkXS5pdGFsaWMgPSByZ2JBdHRyLml0YWxpYztcbiAgICAgICAgaGlnaGxpZ2h0c1tpZF0uc3BlY2lhbCA9IHRvSGV4Q3NzKHJnYkF0dHIuc3BlY2lhbCk7XG4gICAgICAgIGhpZ2hsaWdodHNbaWRdLnN0cmlrZXRocm91Z2ggPSByZ2JBdHRyLnN0cmlrZXRocm91Z2g7XG4gICAgICAgIGhpZ2hsaWdodHNbaWRdLnVuZGVyY3VybCA9IHJnYkF0dHIudW5kZXJjdXJsO1xuICAgICAgICBoaWdobGlnaHRzW2lkXS51bmRlcmxpbmUgPSByZ2JBdHRyLnVuZGVybGluZTtcbiAgICAgICAgaGlnaGxpZ2h0c1tpZF0ucmV2ZXJzZSA9IHJnYkF0dHIucmV2ZXJzZTtcbiAgICB9LFxuICAgIG1vZGVfY2hhbmdlOiAoXzogc3RyaW5nLCBtb2RlSWR4OiBudW1iZXIpID0+IHtcbiAgICAgICAgZ2xvYmFsU3RhdGUubW9kZS5jdXJyZW50ID0gbW9kZUlkeDtcbiAgICAgICAgaWYgKGdsb2JhbFN0YXRlLm1vZGUuc3R5bGVFbmFibGVkKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJzb3IgPSBnbG9iYWxTdGF0ZS5jdXJzb3I7XG4gICAgICAgICAgICBwdXNoRGFtYWdlKGdldEdyaWRJZCgpLCBEYW1hZ2VLaW5kLkNlbGwsIDEsIDEsIGN1cnNvci54LCBjdXJzb3IueSk7XG4gICAgICAgICAgICBzY2hlZHVsZUZyYW1lKCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1vZGVfaW5mb19zZXQ6IChjdXJzb3JTdHlsZUVuYWJsZWQ6IGJvb2xlYW4sIG1vZGVJbmZvOiBbXSkgPT4ge1xuICAgICAgICAvLyBNaXNzaW5nOiBoYW5kbGluZyBvZiBjZWxsLXBlcmNlbnRhZ2VcbiAgICAgICAgY29uc3QgbW9kZSA9IGdsb2JhbFN0YXRlLm1vZGU7XG4gICAgICAgIG1vZGUuc3R5bGVFbmFibGVkID0gY3Vyc29yU3R5bGVFbmFibGVkO1xuICAgICAgICBtb2RlLm1vZGVJbmZvID0gbW9kZUluZm87XG4gICAgfSxcbiAgICBtc2dfY2xlYXI6ICgpID0+IHtcbiAgICAgICAgZGFtYWdlTWVzc2FnZXNTcGFjZShnbG9iYWxTdGF0ZSk7XG4gICAgICAgIGdsb2JhbFN0YXRlLm1lc3NhZ2VzLmxlbmd0aCA9IDA7XG4gICAgfSxcbiAgICBtc2dfaGlzdG9yeV9zaG93OiAoZW50cmllczogYW55W10pID0+IHtcbiAgICAgICAgZGFtYWdlTWVzc2FnZXNTcGFjZShnbG9iYWxTdGF0ZSk7XG4gICAgICAgIGdsb2JhbFN0YXRlLm1lc3NhZ2VzID0gZW50cmllcy5tYXAoKFssIGJdKSA9PiBiKTtcbiAgICB9LFxuICAgIG1zZ19ydWxlcjogKGNvbnRlbnQ6IE1lc3NhZ2UpID0+IHtcbiAgICAgICAgZGFtYWdlTWVzc2FnZXNTcGFjZShnbG9iYWxTdGF0ZSk7XG4gICAgICAgIGdsb2JhbFN0YXRlLnJ1bGVyID0gY29udGVudDtcbiAgICB9LFxuICAgIG1zZ19zaG93OiAoXzogc3RyaW5nLCBjb250ZW50OiBNZXNzYWdlLCByZXBsYWNlTGFzdDogYm9vbGVhbikgPT4ge1xuICAgICAgICBkYW1hZ2VNZXNzYWdlc1NwYWNlKGdsb2JhbFN0YXRlKTtcbiAgICAgICAgaWYgKHJlcGxhY2VMYXN0KSB7XG4gICAgICAgICAgICBnbG9iYWxTdGF0ZS5tZXNzYWdlcy5sZW5ndGggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGdsb2JhbFN0YXRlLm1lc3NhZ2VzLnB1c2goY29udGVudCk7XG4gICAgICAgIGdsb2JhbFN0YXRlLmxhc3RNZXNzYWdlID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgIGdsb2JhbFN0YXRlLmN1cnNvci5tb3ZlZFNpbmNlTGFzdE1lc3NhZ2UgPSBmYWxzZTtcbiAgICB9LFxuICAgIG1zZ19zaG93Y21kOiAoY29udGVudDogTWVzc2FnZSkgPT4ge1xuICAgICAgICBkYW1hZ2VNZXNzYWdlc1NwYWNlKGdsb2JhbFN0YXRlKTtcbiAgICAgICAgZ2xvYmFsU3RhdGUuc2hvd2NtZCA9IGNvbnRlbnQ7XG4gICAgfSxcbiAgICBtc2dfc2hvd21vZGU6IChjb250ZW50OiBNZXNzYWdlKSA9PiB7XG4gICAgICAgIGRhbWFnZU1lc3NhZ2VzU3BhY2UoZ2xvYmFsU3RhdGUpO1xuICAgICAgICBnbG9iYWxTdGF0ZS5zaG93bW9kZSA9IGNvbnRlbnQ7XG4gICAgfSxcbiAgICBvcHRpb25fc2V0OiAob3B0aW9uOiBzdHJpbmcsIHZhbHVlOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBnbG9iYWxTdGF0ZTtcbiAgICAgICAgc3dpdGNoIChvcHRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgXCJndWlmb250XCI6IHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3Rm9udFN0cmluZztcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3Rm9udFN0cmluZyA9IGRlZmF1bHRGb250U3RyaW5nO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGd1aWZvbnQgPSBwYXJzZUd1aWZvbnQodmFsdWUsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udC1mYW1pbHlcIjogZGVmYXVsdEZvbnRGYW1pbHksXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBkZWZhdWx0Rm9udFNpemUsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBuZXdGb250U3RyaW5nID0gIG1ha2VGb250U3RyaW5nKGd1aWZvbnRbXCJmb250LXNpemVcIl0sIGd1aWZvbnRbXCJmb250LWZhbWlseVwiXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChuZXdGb250U3RyaW5nID09PSBmb250U3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZXRGb250U3RyaW5nKHN0YXRlLCBuZXdGb250U3RyaW5nKTtcbiAgICAgICAgICAgICAgICBjb25zdCBbY2hhcldpZHRoLCBjaGFySGVpZ2h0XSA9IGdldEdseXBoSW5mbyhzdGF0ZSk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb25zLnVpX3RyeV9yZXNpemVfZ3JpZChnZXRHcmlkSWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGguZmxvb3Ioc3RhdGUuY2FudmFzLndpZHRoIC8gY2hhcldpZHRoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGguZmxvb3Ioc3RhdGUuY2FudmFzLmhlaWdodCAvIGNoYXJIZWlnaHQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImxpbmVzcGFjZVwiOiB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLmxpbmVzcGFjZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0YXRlLmxpbmVzcGFjZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGludmFsaWRhdGVNZXRyaWNzKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgW2NoYXJXaWR0aCwgY2hhckhlaWdodF0gPSBnZXRHbHlwaEluZm8oc3RhdGUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGdpZCA9IGdldEdyaWRJZCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1ckdyaWRTaXplID0gc3RhdGUuZ3JpZFNpemVzW2dpZF07XG4gICAgICAgICAgICAgICAgaWYgKGN1ckdyaWRTaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcHVzaERhbWFnZShnZXRHcmlkSWQoKSwgRGFtYWdlS2luZC5DZWxsLCBjdXJHcmlkU2l6ZS5oZWlnaHQsIGN1ckdyaWRTaXplLndpZHRoLCAwLCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb25zLnVpX3RyeV9yZXNpemVfZ3JpZChnaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKHN0YXRlLmNhbnZhcy53aWR0aCAvIGNoYXJXaWR0aCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKHN0YXRlLmNhbnZhcy5oZWlnaHQgLyBjaGFySGVpZ2h0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG59O1xuXG4vLyBrZWVwIHRyYWNrIG9mIHdoZXRlciBhIGZyYW1lIGlzIGFscmVhZHkgYmVpbmcgc2NoZWR1bGVkIG9yIG5vdC4gVGhpcyBhdm9pZHNcbi8vIGFza2luZyBmb3IgbXVsdGlwbGUgZnJhbWVzIHdoZXJlIHdlJ2QgcGFpbnQgdGhlIHNhbWUgdGhpbmcgYW55d2F5LlxubGV0IGZyYW1lU2NoZWR1bGVkID0gZmFsc2U7XG5mdW5jdGlvbiBzY2hlZHVsZUZyYW1lKCkge1xuICAgIGlmICghZnJhbWVTY2hlZHVsZWQpIHtcbiAgICAgICAgZnJhbWVTY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBhaW50KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBhaW50TWVzc2FnZXMoc3RhdGU6IFN0YXRlKSB7XG4gICAgY29uc3QgY3R4ID0gc3RhdGUuY29udGV4dDtcbiAgICBjb25zdCBnSWQgPSBnZXRHcmlkSWQoKTtcbiAgICBjb25zdCBtZXNzYWdlc1Bvc2l0aW9uID0gc3RhdGUubWVzc2FnZXNQb3NpdGlvbnNbZ0lkXTtcbiAgICBjb25zdCBbLCBjaGFySGVpZ2h0LCBiYXNlbGluZV0gPSBnZXRHbHlwaEluZm8oc3RhdGUpO1xuICAgIGNvbnN0IG1lc3NhZ2VzID0gc3RhdGUubWVzc2FnZXM7XG4gICAgLy8gd2UgbmVlZCB0byBrbm93IHRoZSBzaXplIG9mIHRoZSBtZXNzYWdlIGJveCBpbiBvcmRlciB0byBkcmF3IGl0cyBib3JkZXJcbiAgICAvLyBhbmQgYmFja2dyb3VuZC4gVGhlIGFsZ29yaXRobSB0byBjb21wdXRlIHRoaXMgaXMgZXF1aXZhbGVudCB0byBkcmF3aW5nXG4gICAgLy8gYWxsIG1lc3NhZ2VzLiBTbyB3ZSBwdXQgdGhlIGRyYXdpbmcgYWxnb3JpdGhtIGluIGEgZnVuY3Rpb24gd2l0aCBhXG4gICAgLy8gYm9vbGVhbiBhcmd1bWVudCB0aGF0IHdpbGwgY29udHJvbCB3aGV0aGVyIHRleHQgc2hvdWxkIGFjdHVhbGx5IGJlXG4gICAgLy8gZHJhd24uIFRoaXMgbGV0cyB1cyBydW4gdGhlIGFsZ29yaXRobSBvbmNlIHRvIGdldCB0aGUgZGltZW5zaW9ucyBhbmRcbiAgICAvLyB0aGVuIGFnYWluIHRvIGFjdHVhbGx5IGRyYXcgdGV4dC5cbiAgICBmdW5jdGlvbiByZW5kZXJNZXNzYWdlcyAoZHJhdzogYm9vbGVhbikge1xuICAgICAgICBsZXQgcmVuZGVyZWRYID0gc3RhdGUuY2FudmFzLndpZHRoO1xuICAgICAgICBsZXQgcmVuZGVyZWRZID0gc3RhdGUuY2FudmFzLmhlaWdodCAtIGNoYXJIZWlnaHQgKyBiYXNlbGluZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IG1lc3NhZ2VzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gbWVzc2FnZXNbaV07XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gbWVzc2FnZS5sZW5ndGggLSAxOyBqID49IDA7IC0taikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoYXJzID0gQXJyYXkuZnJvbShtZXNzYWdlW2pdWzFdKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gY2hhcnMubGVuZ3RoIC0gMTsgayA+PSAwOyAtLWspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hhciA9IGNoYXJzW2tdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtZWFzdXJlZFdpZHRoID0gbWVhc3VyZVdpZHRoKHN0YXRlLCBjaGFyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbmRlcmVkWCAtIG1lYXN1cmVkV2lkdGggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVuZGVyZWRZIC0gY2hhckhlaWdodCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJlZFggPSBzdGF0ZS5jYW52YXMud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJlZFkgPSByZW5kZXJlZFkgLSBjaGFySGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVkWCA9IHJlbmRlcmVkWCAtIG1lYXN1cmVkV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkcmF3KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoY2hhciwgcmVuZGVyZWRYLCByZW5kZXJlZFkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZW5kZXJlZFggPCBtZXNzYWdlc1Bvc2l0aW9uLngpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzUG9zaXRpb24ueCA9IHJlbmRlcmVkWDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocmVuZGVyZWRZIDwgbWVzc2FnZXNQb3NpdGlvbi55KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlc1Bvc2l0aW9uLnkgPSByZW5kZXJlZFkgLSBiYXNlbGluZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlbmRlcmVkWCA9IHN0YXRlLmNhbnZhcy53aWR0aDtcbiAgICAgICAgICAgIHJlbmRlcmVkWSA9IHJlbmRlcmVkWSAtIGNoYXJIZWlnaHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyTWVzc2FnZXMoZmFsc2UpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBzdGF0ZS5oaWdobGlnaHRzWzBdLmZvcmVncm91bmQ7XG4gICAgY3R4LmZpbGxSZWN0KG1lc3NhZ2VzUG9zaXRpb24ueCAtIDIsXG4gICAgICAgICAgICAgICAgICAgICBtZXNzYWdlc1Bvc2l0aW9uLnkgLSAyLFxuICAgICAgICAgICAgICAgICAgICAgc3RhdGUuY2FudmFzLndpZHRoIC0gbWVzc2FnZXNQb3NpdGlvbi54ICsgMixcbiAgICAgICAgICAgICAgICAgICAgIHN0YXRlLmNhbnZhcy5oZWlnaHQgLSBtZXNzYWdlc1Bvc2l0aW9uLnkgKyAyKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBzdGF0ZS5oaWdobGlnaHRzWzBdLmJhY2tncm91bmQ7XG4gICAgY3R4LmZpbGxSZWN0KG1lc3NhZ2VzUG9zaXRpb24ueCAtIDEsXG4gICAgICAgICAgICAgICAgICAgICBtZXNzYWdlc1Bvc2l0aW9uLnkgLSAxLFxuICAgICAgICAgICAgICAgICAgICAgc3RhdGUuY2FudmFzLndpZHRoIC0gbWVzc2FnZXNQb3NpdGlvbi54ICsgMSxcbiAgICAgICAgICAgICAgICAgICAgIHN0YXRlLmNhbnZhcy5oZWlnaHQgLSBtZXNzYWdlc1Bvc2l0aW9uLnkgKyAxKTtcbiAgICBjdHguZmlsbFN0eWxlID0gc3RhdGUuaGlnaGxpZ2h0c1swXS5mb3JlZ3JvdW5kO1xuICAgIHJlbmRlck1lc3NhZ2VzKHRydWUpO1xufVxuXG5mdW5jdGlvbiBwYWludENvbW1hbmRsaW5lV2luZG93KHN0YXRlOiBTdGF0ZSkge1xuICAgIGNvbnN0IGN0eCA9IHN0YXRlLmNvbnRleHQ7XG4gICAgY29uc3QgW2NoYXJXaWR0aCwgY2hhckhlaWdodCwgYmFzZWxpbmVdID0gZ2V0R2x5cGhJbmZvKHN0YXRlKTtcbiAgICBjb25zdCBjb21tYW5kTGluZSA9IHN0YXRlLmNvbW1hbmRMaW5lO1xuICAgIGNvbnN0IHJlY3QgPSBnZXRDb21tYW5kTGluZVJlY3Qoc3RhdGUpO1xuICAgIC8vIG91dGVyIHJlY3RhbmdsZVxuICAgIGN0eC5maWxsU3R5bGUgPSBzdGF0ZS5oaWdobGlnaHRzWzBdLmZvcmVncm91bmQ7XG4gICAgY3R4LmZpbGxSZWN0KHJlY3QueCxcbiAgICAgICAgICAgICAgICAgICAgIHJlY3QueSxcbiAgICAgICAgICAgICAgICAgICAgIHJlY3Qud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICByZWN0LmhlaWdodCk7XG5cbiAgICAvLyBpbm5lciByZWN0YW5nbGVcbiAgICByZWN0LnggKz0gMTtcbiAgICByZWN0LnkgKz0gMTtcbiAgICByZWN0LndpZHRoIC09IDI7XG4gICAgcmVjdC5oZWlnaHQgLT0gMjtcbiAgICBjdHguZmlsbFN0eWxlID0gc3RhdGUuaGlnaGxpZ2h0c1swXS5iYWNrZ3JvdW5kO1xuICAgIGN0eC5maWxsUmVjdChyZWN0LngsXG4gICAgICAgICAgICAgICAgICAgICByZWN0LnksXG4gICAgICAgICAgICAgICAgICAgICByZWN0LndpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgcmVjdC5oZWlnaHQpO1xuXG4gICAgLy8gcGFkZGluZyBvZiBpbm5lciByZWN0YW5nbGVcbiAgICByZWN0LnggKz0gMTtcbiAgICByZWN0LnkgKz0gMTtcbiAgICByZWN0LndpZHRoIC09IDI7XG4gICAgcmVjdC5oZWlnaHQgLT0gMjtcblxuICAgIC8vIFBvc2l0aW9uIHdoZXJlIHRleHQgc2hvdWxkIGJlIGRyYXduXG4gICAgbGV0IHggPSByZWN0Lng7XG4gICAgY29uc3QgeSA9IHJlY3QueTtcblxuICAgIC8vIGZpcnN0IGNoYXJhY3RlclxuICAgIGN0eC5maWxsU3R5bGUgPSBzdGF0ZS5oaWdobGlnaHRzWzBdLmZvcmVncm91bmQ7XG4gICAgY3R4LmZpbGxUZXh0KGNvbW1hbmRMaW5lLmZpcnN0YywgeCwgeSArIGJhc2VsaW5lKTtcbiAgICB4ICs9IGNoYXJXaWR0aDtcbiAgICByZWN0LndpZHRoIC09IGNoYXJXaWR0aDtcblxuICAgIGNvbnN0IGVuY29kZXIgPSBuZXcgVGV4dEVuY29kZXIoKTtcbiAgICAvLyByZWR1Y2UgdGhlIGNvbW1hbmRsaW5lJ3MgY29udGVudCB0byBhIHN0cmluZyBmb3IgaXRlcmF0aW9uXG4gICAgY29uc3Qgc3RyID0gY29tbWFuZExpbmUuY29udGVudC5yZWR1Y2UoKHI6IHN0cmluZywgc2VnbWVudDogW2FueSwgc3RyaW5nXSkgPT4gciArIHNlZ21lbnRbMV0sIFwiXCIpO1xuICAgIC8vIEFycmF5LmZyb20oc3RyKSB3aWxsIHJldHVybiBhbiBhcnJheSB3aG9zZSBjZWxscyBhcmUgZ3JhcGhlbWVcbiAgICAvLyBjbHVzdGVycy4gSXQgaXMgaW1wb3J0YW50IHRvIGl0ZXJhdGUgb3ZlciBncmFwaGVtZXMgaW5zdGVhZCBvZiB0aGVcbiAgICAvLyBzdHJpbmcgYmVjYXVzZSBpdGVyYXRpbmcgb3ZlciB0aGUgc3RyaW5nIHdvdWxkIHNvbWV0aW1lcyB5aWVsZCBvbmx5XG4gICAgLy8gaGFsZiBvZiB0aGUgVVRGLTE2IGNoYXJhY3Rlci9zdXJyb2dhdGUgcGFpci5cbiAgICBjb25zdCBjaGFyYWN0ZXJzID0gQXJyYXkuZnJvbShzdHIpO1xuICAgIC8vIHJlbmRlcmVkSSBpcyB0aGUgaG9yaXpvbnRhbCBwaXhlbCBwb3NpdGlvbiB3aGVyZSB0aGUgbmV4dCBjaGFyYWN0ZXJcbiAgICAvLyBzaG91bGQgYmUgZHJhd25cbiAgICBsZXQgcmVuZGVyZWRJID0gMDtcbiAgICAvLyBlbmNvZGVkSSBpcyB0aGUgbnVtYmVyIG9mIGJ5dGVzIHRoYXQgaGF2ZSBiZWVuIGl0ZXJhdGVkIG92ZXIgdGh1c1xuICAgIC8vIGZhci4gSXQgaXMgdXNlZCB0byBmaW5kIG91dCB3aGVyZSB0byBkcmF3IHRoZSBjdXJzb3IuIEluZGVlZCwgbmVvdmltXG4gICAgLy8gc2VuZHMgdGhlIGN1cnNvcidzIHBvc2l0aW9uIGFzIGEgYnl0ZSBwb3NpdGlvbiB3aXRoaW4gdGhlIFVURi04XG4gICAgLy8gZW5jb2RlZCBjb21tYW5kbGluZSBzdHJpbmcuXG4gICAgbGV0IGVuY29kZWRJID0gMDtcbiAgICAvLyBjdXJzb3JYIGlzIHRoZSBob3Jpem9udGFsIHBpeGVsIHBvc2l0aW9uIHdoZXJlIHRoZSBjdXJzb3Igc2hvdWxkIGJlXG4gICAgLy8gZHJhd24uXG4gICAgbGV0IGN1cnNvclggPSAwO1xuICAgIC8vIFRoZSBpbmRleCBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyIG9mIGBjaGFyYWN0ZXJzYCB0aGF0IGNhbiBiZSBkcmF3bi5cbiAgICAvLyBJdCBpcyBoaWdoZXIgdGhhbiAwIHdoZW4gdGhlIGNvbW1hbmQgbGluZSBzdHJpbmcgaXMgdG9vIGxvbmcgdG8gYmVcbiAgICAvLyBlbnRpcmVseSBkaXNwbGF5ZWQuXG4gICAgbGV0IHNsaWNlU3RhcnQgPSAwO1xuICAgIC8vIFRoZSBpbmRleCBvZiB0aGUgbGFzdCBjaGFyYWN0ZXIgb2YgYGNoYXJhY3RlcnNgIHRoYXQgY2FuIGJlIGRyYXduLlxuICAgIC8vIEl0IGlzIGRpZmZlcmVudCBmcm9tIGNoYXJhY3RlcnMubGVuZ3RoIHdoZW4gdGhlIGNvbW1hbmQgbGluZSBzdHJpbmdcbiAgICAvLyBpcyB0b28gbG9uZyB0byBiZSBlbnRpcmVseSBkaXNwbGF5ZWQuXG4gICAgbGV0IHNsaWNlRW5kID0gMDtcbiAgICAvLyBUaGUgaG9yaXpvbnRhbCB3aWR0aCBpbiBwaXhlbHMgdGFrZW4gYnkgdGhlIGRpc3BsYXllZCBzbGljZS4gSXRcbiAgICAvLyBpcyB1c2VkIHRvIGtlZXAgdHJhY2sgb2Ygd2hldGhlciB0aGUgY29tbWFuZGxpbmUgc3RyaW5nIGlzIGxvbmdlclxuICAgIC8vIHRoYW4gdGhlIGNvbW1hbmRsaW5lIHdpbmRvdy5cbiAgICBsZXQgc2xpY2VXaWR0aCA9IDA7XG4gICAgLy8gY3Vyc29yRGlzcGxheWVkIGtlZXBzIHRyYWNrIG9mIHdoZXRoZXIgdGhlIGN1cnNvciBjYW4gYmUgZGlzcGxheWVkXG4gICAgLy8gaW4gdGhlIHNsaWNlLlxuICAgIGxldCBjdXJzb3JEaXNwbGF5ZWQgPSBjb21tYW5kTGluZS5wb3MgPT09IDA7XG4gICAgLy8gZGVzY3JpcHRpb24gb2YgdGhlIGFsZ29yaXRobTpcbiAgICAvLyBGb3IgZWFjaCBjaGFyYWN0ZXIsIGZpbmQgb3V0IGl0cyB3aWR0aC4gSWYgaXQgY2Fubm90IGZpdCBpbiB0aGVcbiAgICAvLyBjb21tYW5kIGxpbmUgd2luZG93IGFsb25nIHdpdGggdGhlIHJlc3Qgb2YgdGhlIHNsaWNlIGFuZCB0aGUgY3Vyc29yXG4gICAgLy8gaGFzbid0IGJlZW4gZm91bmQgeWV0LCByZW1vdmUgY2hhcmFjdGVycyBmcm9tIHRoZSBiZWdpbm5pbmcgb2YgdGhlXG4gICAgLy8gc2xpY2UgdW50aWwgdGhlIGNoYXJhY3RlciBmaXRzLlxuICAgIC8vIFN0b3AgZWl0aGVyIHdoZW4gYWxsIGNoYXJhY3RlcnMgYXJlIGluIHRoZSBzbGljZSBvciB3aGVuIHRoZSBjdXJzb3JcbiAgICAvLyBjYW4gYmUgZGlzcGxheWVkIGFuZCB0aGUgc2xpY2UgdGFrZXMgYWxsIGF2YWlsYWJsZSB3aWR0aC5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJhY3RlcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgc2xpY2VFbmQgPSBpO1xuICAgICAgICBjb25zdCBjaGFyID0gY2hhcmFjdGVyc1tpXTtcblxuICAgICAgICBjb25zdCBjV2lkdGggPSBtZWFzdXJlV2lkdGgoc3RhdGUsIGNoYXIpO1xuICAgICAgICByZW5kZXJlZEkgKz0gY1dpZHRoO1xuXG4gICAgICAgIHNsaWNlV2lkdGggKz0gY1dpZHRoO1xuICAgICAgICBpZiAoc2xpY2VXaWR0aCA+IHJlY3Qud2lkdGgpIHtcbiAgICAgICAgICAgIGlmIChjdXJzb3JEaXNwbGF5ZWQpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZW1vdmVkQ2hhciA9IGNoYXJhY3RlcnNbc2xpY2VTdGFydF07XG4gICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlZFdpZHRoID0gbWVhc3VyZVdpZHRoKHN0YXRlLCByZW1vdmVkQ2hhcik7XG4gICAgICAgICAgICAgICAgcmVuZGVyZWRJIC09IHJlbW92ZWRXaWR0aDtcbiAgICAgICAgICAgICAgICBzbGljZVdpZHRoIC09IHJlbW92ZWRXaWR0aDtcbiAgICAgICAgICAgICAgICBzbGljZVN0YXJ0ICs9IDE7XG4gICAgICAgICAgICB9IHdoaWxlIChzbGljZVdpZHRoID4gcmVjdC53aWR0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBlbmNvZGVkSSArPSBlbmNvZGVyLmVuY29kZShjaGFyKS5sZW5ndGg7XG4gICAgICAgIGlmIChlbmNvZGVkSSA9PT0gY29tbWFuZExpbmUucG9zKSB7XG4gICAgICAgICAgICBjdXJzb3JYID0gcmVuZGVyZWRJO1xuICAgICAgICAgICAgY3Vyc29yRGlzcGxheWVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hhcmFjdGVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJlbmRlcmVkSSA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSBzbGljZVN0YXJ0OyBpIDw9IHNsaWNlRW5kOyArK2kpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoYXIgPSBjaGFyYWN0ZXJzW2ldO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGNoYXIsIHggKyByZW5kZXJlZEksIHkgKyBiYXNlbGluZSk7XG4gICAgICAgICAgICByZW5kZXJlZEkgKz0gbWVhc3VyZVdpZHRoKHN0YXRlLCBjaGFyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjdHguZmlsbFJlY3QoeCArIGN1cnNvclgsIHksIDEsIGNoYXJIZWlnaHQpO1xufVxuXG5mdW5jdGlvbiBwYWludCAoXzogRE9NSGlnaFJlc1RpbWVTdGFtcCkge1xuICAgIGZyYW1lU2NoZWR1bGVkID0gZmFsc2U7XG5cbiAgICBjb25zdCBzdGF0ZSA9IGdsb2JhbFN0YXRlO1xuICAgIGNvbnN0IGNhbnZhcyA9IHN0YXRlLmNhbnZhcztcbiAgICBjb25zdCBjb250ZXh0ID0gc3RhdGUuY29udGV4dDtcbiAgICBjb25zdCBnaWQgPSBnZXRHcmlkSWQoKTtcbiAgICBjb25zdCBjaGFyYWN0ZXJzR3JpZCA9IHN0YXRlLmdyaWRDaGFyYWN0ZXJzW2dpZF07XG4gICAgY29uc3QgaGlnaGxpZ2h0c0dyaWQgPSBzdGF0ZS5ncmlkSGlnaGxpZ2h0c1tnaWRdO1xuICAgIGNvbnN0IGRhbWFnZXMgPSBzdGF0ZS5ncmlkRGFtYWdlc1tnaWRdO1xuICAgIGNvbnN0IGRhbWFnZUNvdW50ID0gc3RhdGUuZ3JpZERhbWFnZXNDb3VudFtnaWRdO1xuICAgIGNvbnN0IGhpZ2hsaWdodHMgPSBzdGF0ZS5oaWdobGlnaHRzO1xuICAgIGNvbnN0IFtjaGFyV2lkdGgsIGNoYXJIZWlnaHQsIGJhc2VsaW5lXSA9IGdldEdseXBoSW5mbyhzdGF0ZSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhbWFnZUNvdW50OyArK2kpIHtcbiAgICAgICAgY29uc3QgZGFtYWdlID0gZGFtYWdlc1tpXTtcbiAgICAgICAgc3dpdGNoIChkYW1hZ2Uua2luZCkge1xuICAgICAgICAgICAgY2FzZSBEYW1hZ2VLaW5kLlJlc2l6ZToge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBpeGVsV2lkdGggPSBkYW1hZ2UudyAqIGNoYXJXaWR0aCAvIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBpeGVsSGVpZ2h0ID0gZGFtYWdlLmggKiBjaGFySGVpZ2h0IC8gd2luZG93LmRldmljZVBpeGVsUmF0aW87XG4gICAgICAgICAgICAgICAgcGFnZS5yZXNpemVFZGl0b3IocGl4ZWxXaWR0aCwgcGl4ZWxIZWlnaHQpO1xuICAgICAgICAgICAgICAgIHNldENhbnZhc0RpbWVuc2lvbnMoY2FudmFzLCBwaXhlbFdpZHRoLCBwaXhlbEhlaWdodCk7XG4gICAgICAgICAgICAgICAgLy8gTm90ZTogY2hhbmdpbmcgd2lkdGggYW5kIGhlaWdodCByZXNldHMgZm9udCwgc28gd2UgaGF2ZSB0b1xuICAgICAgICAgICAgICAgIC8vIHNldCBpdCBhZ2Fpbi4gV2hvIHRob3VnaHQgdGhpcyB3YXMgYSBnb29kIGlkZWE/Pz9cbiAgICAgICAgICAgICAgICBjb250ZXh0LmZvbnQgPSBmb250U3RyaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIERhbWFnZUtpbmQuU2Nyb2xsOlxuICAgICAgICAgICAgY2FzZSBEYW1hZ2VLaW5kLkNlbGw6XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgeSA9IGRhbWFnZS55OyB5IDwgZGFtYWdlLnkgKyBkYW1hZ2UuaCAmJiB5IDwgY2hhcmFjdGVyc0dyaWQubGVuZ3RoOyArK3kpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gY2hhcmFjdGVyc0dyaWRbeV07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvd0hpZ2ggPSBoaWdobGlnaHRzR3JpZFt5XTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGl4ZWxZID0geSAqIGNoYXJIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeCA9IGRhbWFnZS54OyB4IDwgZGFtYWdlLnggKyBkYW1hZ2UudyAmJiB4IDwgcm93Lmxlbmd0aDsgKyt4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93W3hdID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwaXhlbFggPSB4ICogY2hhcldpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWQgPSBnbHlwaElkKHJvd1t4XSwgcm93SGlnaFt4XSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnbHlwaENhY2hlW2lkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbEhpZ2ggPSBoaWdobGlnaHRzW3Jvd0hpZ2hbeF1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gTWF0aC5jZWlsKG1lYXN1cmVXaWR0aChzdGF0ZSwgcm93W3hdKSAvIGNoYXJXaWR0aCkgKiBjaGFyV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJhY2tncm91bmQgPSBjZWxsSGlnaC5iYWNrZ3JvdW5kIHx8IGhpZ2hsaWdodHNbMF0uYmFja2dyb3VuZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZm9yZWdyb3VuZCA9IGNlbGxIaWdoLmZvcmVncm91bmQgfHwgaGlnaGxpZ2h0c1swXS5mb3JlZ3JvdW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZWxsSGlnaC5yZXZlcnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IGJhY2tncm91bmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQgPSBmb3JlZ3JvdW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kID0gdG1wO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGJhY2tncm91bmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdChwaXhlbFgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaXhlbFksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJIZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gZm9yZWdyb3VuZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZm9udFN0ciA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoYW5nZUZvbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbEhpZ2guYm9sZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U3RyICs9IFwiIGJvbGQgXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZUZvbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbEhpZ2guaXRhbGljKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTdHIgKz0gXCIgaXRhbGljIFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VGb250ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZUZvbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5mb250ID0gZm9udFN0ciArIGZvbnRTdHJpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFRleHQocm93W3hdLCBwaXhlbFgsIHBpeGVsWSArIGJhc2VsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlRm9udCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZvbnQgPSBmb250U3RyaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbEhpZ2guc3RyaWtldGhyb3VnaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KHBpeGVsWCwgcGl4ZWxZICsgYmFzZWxpbmUgLyAyLCB3aWR0aCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY2VsbEhpZ2guc3BlY2lhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlbGluZUhlaWdodCA9IChjaGFySGVpZ2h0IC0gYmFzZWxpbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZWxsSGlnaC51bmRlcmxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGluZXBvcyA9IGJhc2VsaW5lSGVpZ2h0ICogMC4zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KHBpeGVsWCwgcGl4ZWxZICsgYmFzZWxpbmUgKyBsaW5lcG9zLCB3aWR0aCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZWxsSGlnaC51bmRlcmN1cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VybHBvcyA9IGJhc2VsaW5lSGVpZ2h0ICogMC42O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBhYnNjaXNzYSA9IHBpeGVsWDsgYWJzY2lzc2EgPCBwaXhlbFggKyB3aWR0aDsgKythYnNjaXNzYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdChhYnNjaXNzYSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGl4ZWxZICsgYmFzZWxpbmUgKyBjdXJscG9zICsgTWF0aC5jb3MoYWJzY2lzc2EpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZWFzb24gZm9yIHRoZSBjaGVjazogd2UgY2FuJ3QgcmV0cmlldmUgcGl4ZWxzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZHJhd24gb3V0c2lkZSB0aGUgdmlld3BvcnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGl4ZWxYID49IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgcGl4ZWxZID49IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgKHBpeGVsWCArIHdpZHRoIDwgY2FudmFzLndpZHRoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiAocGl4ZWxZICsgY2hhckhlaWdodCA8IGNhbnZhcy5oZWlnaHQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdseXBoQ2FjaGVbaWRdID0gY29udGV4dC5nZXRJbWFnZURhdGEoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaXhlbFgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaXhlbFksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJIZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5wdXRJbWFnZURhdGEoZ2x5cGhDYWNoZVtpZF0sIHBpeGVsWCwgcGl4ZWxZKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdGF0ZS5tZXNzYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHBhaW50TWVzc2FnZXMoc3RhdGUpO1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBjb21tYW5kIGxpbmUgaXMgc2hvd24sIHRoZSBjdXJzb3IncyBpbiBpdFxuICAgIGlmIChzdGF0ZS5jb21tYW5kTGluZS5zdGF0dXMgPT09IFwic2hvd25cIikge1xuICAgICAgICBwYWludENvbW1hbmRsaW5lV2luZG93KHN0YXRlKTtcbiAgICB9IGVsc2UgaWYgKHN0YXRlLmN1cnNvci5kaXNwbGF5KSB7XG4gICAgICAgIGNvbnN0IGN1cnNvciA9IHN0YXRlLmN1cnNvcjtcbiAgICAgICAgaWYgKGN1cnNvci5jdXJyZW50R3JpZCA9PT0gZ2lkKSB7XG4gICAgICAgICAgICAvLyBNaXNzaW5nOiBoYW5kbGluZyBvZiBjZWxsLXBlcmNlbnRhZ2VcbiAgICAgICAgICAgIGNvbnN0IG1vZGUgPSBzdGF0ZS5tb2RlO1xuICAgICAgICAgICAgY29uc3QgaW5mbyA9IG1vZGUuc3R5bGVFbmFibGVkXG4gICAgICAgICAgICAgICAgPyBtb2RlLm1vZGVJbmZvW21vZGUuY3VycmVudF1cbiAgICAgICAgICAgICAgICA6IG1vZGUubW9kZUluZm9bMF07XG4gICAgICAgICAgICBjb25zdCBzaG91bGRCbGluayA9IChpbmZvLmJsaW5rd2FpdCA+IDAgJiYgaW5mby5ibGlua29uID4gMCAmJiBpbmZvLmJsaW5rb2ZmID4gMCk7XG5cbiAgICAgICAgICAgIC8vIERlY2lkZSBjb2xvci4gQXMgZGVzY3JpYmVkIGluIHRoZSBkb2MsIGlmIGF0dHJfaWQgaXMgMCBjb2xvcnNcbiAgICAgICAgICAgIC8vIHNob3VsZCBiZSByZXZlcnRlZC5cbiAgICAgICAgICAgIGxldCBiYWNrZ3JvdW5kID0gaGlnaGxpZ2h0c1tpbmZvLmF0dHJfaWRdLmJhY2tncm91bmQ7XG4gICAgICAgICAgICBsZXQgZm9yZWdyb3VuZCA9IGhpZ2hsaWdodHNbaW5mby5hdHRyX2lkXS5mb3JlZ3JvdW5kO1xuICAgICAgICAgICAgaWYgKGluZm8uYXR0cl9pZCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IGJhY2tncm91bmQ7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZCA9IGZvcmVncm91bmQ7XG4gICAgICAgICAgICAgICAgZm9yZWdyb3VuZCA9IHRtcDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRGVjaWRlIGN1cnNvciBzaGFwZS4gRGVmYXVsdCB0byBibG9jaywgY2hhbmdlIHRvXG4gICAgICAgICAgICAvLyB2ZXJ0aWNhbC9ob3Jpem9udGFsIGlmIG5lZWRlZC5cbiAgICAgICAgICAgIGNvbnN0IGN1cnNvcldpZHRoID0gY3Vyc29yLnggKiBjaGFyV2lkdGg7XG4gICAgICAgICAgICBsZXQgY3Vyc29ySGVpZ2h0ID0gY3Vyc29yLnkgKiBjaGFySGVpZ2h0O1xuICAgICAgICAgICAgbGV0IHdpZHRoID0gY2hhcldpZHRoO1xuICAgICAgICAgICAgbGV0IGhlaWdodCA9IGNoYXJIZWlnaHQ7XG4gICAgICAgICAgICBpZiAoaW5mby5jdXJzb3Jfc2hhcGUgPT09IFwidmVydGljYWxcIikge1xuICAgICAgICAgICAgICAgIHdpZHRoID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5mby5jdXJzb3Jfc2hhcGUgPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgICAgICAgICAgY3Vyc29ySGVpZ2h0ICs9IGNoYXJIZWlnaHQgLSAyO1xuICAgICAgICAgICAgICAgIGhlaWdodCA9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG5vdyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAgICAgLy8gRGVjaWRlIGlmIHRoZSBjdXJzb3Igc2hvdWxkIGJlIGludmVydGVkLiBUaGlzIG9ubHkgaGFwcGVucyBpZlxuICAgICAgICAgICAgLy8gYmxpbmtpbmcgaXMgb24sIHdlJ3ZlIHdhaXRlZCBibGlua3dhaXQgdGltZSBhbmQgd2UncmUgaW4gdGhlXG4gICAgICAgICAgICAvLyBcImJsaW5rb2ZmXCIgdGltZSBzbG90LlxuICAgICAgICAgICAgY29uc3QgYmxpbmtPZmYgPSBzaG91bGRCbGlua1xuICAgICAgICAgICAgICAgICYmIChub3cgLSBpbmZvLmJsaW5rd2FpdCA+IGN1cnNvci5sYXN0TW92ZSlcbiAgICAgICAgICAgICAgICAmJiAoKG5vdyAlIChpbmZvLmJsaW5rb24gKyBpbmZvLmJsaW5rb2ZmKSkgPiBpbmZvLmJsaW5rb24pO1xuICAgICAgICAgICAgaWYgKGJsaW5rT2ZmKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaGlnaCA9IGhpZ2hsaWdodHNbaGlnaGxpZ2h0c0dyaWRbY3Vyc29yLnldW2N1cnNvci54XV07XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZCA9IGhpZ2guYmFja2dyb3VuZDtcbiAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kID0gaGlnaC5mb3JlZ3JvdW5kO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBGaW5hbGx5IGRyYXcgY3Vyc29yXG4gICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGJhY2tncm91bmQ7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KGN1cnNvcldpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3JIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQpO1xuXG4gICAgICAgICAgICBpZiAoaW5mby5jdXJzb3Jfc2hhcGUgPT09IFwiYmxvY2tcIikge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gZm9yZWdyb3VuZDtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGFyID0gY2hhcmFjdGVyc0dyaWRbY3Vyc29yLnldW2N1cnNvci54XTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxUZXh0KGNoYXIsIGN1cnNvci54ICogY2hhcldpZHRoLCBjdXJzb3IueSAqIGNoYXJIZWlnaHQgKyBiYXNlbGluZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzaG91bGRCbGluaykge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBjdXJzb3Igc2hvdWxkIGJsaW5rLCB3ZSBuZWVkIHRvIHBhaW50IGNvbnRpbnVvdXNseVxuICAgICAgICAgICAgICAgIGNvbnN0IHJlbGF0aXZlTm93ID0gcGVyZm9ybWFuY2Uubm93KCkgJSAoaW5mby5ibGlua29uICsgaW5mby5ibGlua29mZik7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV4dFBhaW50ID0gcmVsYXRpdmVOb3cgPCBpbmZvLmJsaW5rb25cbiAgICAgICAgICAgICAgICAgICAgPyBpbmZvLmJsaW5rb24gLSByZWxhdGl2ZU5vd1xuICAgICAgICAgICAgICAgICAgICA6IGluZm8uYmxpbmtvZmYgLSAocmVsYXRpdmVOb3cgLSBpbmZvLmJsaW5rb24pO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoc2NoZWR1bGVGcmFtZSwgbmV4dFBhaW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRlLmdyaWREYW1hZ2VzQ291bnRbZ2lkXSA9IDA7XG59XG5cbmxldCBjbWRsaW5lVGltZW91dCA9IDMwMDA7XG5jb25mUmVhZHkudGhlbigoKSA9PiBjbWRsaW5lVGltZW91dCA9IGdldEdsb2JhbENvbmYoKS5jbWRsaW5lVGltZW91dCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBvblJlZHJhdyhldmVudHM6IGFueVtdKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBldmVudHNbaV07XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoaGFuZGxlcnMgYXMgYW55KVsoZXZlbnRbMF0gYXMgYW55KV07XG4gICAgICAgIGlmIChoYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgZXZlbnQubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyLmFwcGx5KGdsb2JhbFN0YXRlLCBldmVudFtqXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKGAke2V2ZW50WzBdfSBpcyBub3QgaW1wbGVtZW50ZWQuYCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBlcmZvcm1hbmNlLm5vdygpIC0gZ2xvYmFsU3RhdGUubGFzdE1lc3NhZ2UgPiBjbWRsaW5lVGltZW91dCAmJiBnbG9iYWxTdGF0ZS5jdXJzb3IubW92ZWRTaW5jZUxhc3RNZXNzYWdlKSB7XG4gICAgICAgIGhhbmRsZXJzW1wibXNnX2NsZWFyXCJdKCk7XG4gICAgfVxufVxuIiwiLy8gVGhlc2UgbW9kZXMgYXJlIGRlZmluZWQgaW4gaHR0cHM6Ly9naXRodWIuY29tL25lb3ZpbS9uZW92aW0vYmxvYi9tYXN0ZXIvc3JjL252aW0vY3Vyc29yX3NoYXBlLmNcbmV4cG9ydCB0eXBlIE52aW1Nb2RlID0gXCJhbGxcIlxuICB8IFwibm9ybWFsXCJcbiAgfCBcInZpc3VhbFwiXG4gIHwgXCJpbnNlcnRcIlxuICB8IFwicmVwbGFjZVwiXG4gIHwgXCJjbWRsaW5lX25vcm1hbFwiXG4gIHwgXCJjbWRsaW5lX2luc2VydFwiXG4gIHwgXCJjbWRsaW5lX3JlcGxhY2VcIlxuICB8IFwib3BlcmF0b3JcIlxuICB8IFwidmlzdWFsX3NlbGVjdFwiXG4gIHwgXCJjbWRsaW5lX2hvdmVyXCJcbiAgfCBcInN0YXR1c2xpbmVfaG92ZXJcIlxuICB8IFwic3RhdHVzbGluZV9kcmFnXCJcbiAgfCBcInZzZXBfaG92ZXJcIlxuICB8IFwidnNlcF9kcmFnXCJcbiAgfCBcIm1vcmVcIlxuICB8IFwibW9yZV9sYXN0bGluZVwiXG4gIHwgXCJzaG93bWF0Y2hcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJU2l0ZUNvbmZpZyB7XG4gICAgY21kbGluZTogXCJuZW92aW1cIiB8IFwiZmlyZW52aW1cIjtcbiAgICBjb250ZW50OiBcImh0bWxcIiB8IFwidGV4dFwiO1xuICAgIHByaW9yaXR5OiBudW1iZXI7XG4gICAgcmVuZGVyZXI6IFwiaHRtbFwiIHwgXCJjYW52YXNcIjtcbiAgICBzZWxlY3Rvcjogc3RyaW5nO1xuICAgIHRha2VvdmVyOiBcImFsd2F5c1wiIHwgXCJvbmNlXCIgfCBcImVtcHR5XCIgfCBcIm5vbmVtcHR5XCIgfCBcIm5ldmVyXCI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZyB7XG4gICAgZ2xvYmFsU2V0dGluZ3M6IHtcbiAgICAgICAgYWx0OiBcImFscGhhbnVtXCIgfCBcImFsbFwiLFxuICAgICAgICBcIjxDLW4+XCI6IFwiZGVmYXVsdFwiIHwgXCJub29wXCIsXG4gICAgICAgIFwiPEMtdD5cIjogXCJkZWZhdWx0XCIgfCBcIm5vb3BcIixcbiAgICAgICAgXCI8Qy13PlwiOiBcImRlZmF1bHRcIiB8IFwibm9vcFwiLFxuICAgICAgICBcIjxDUy1uPlwiOiBcImRlZmF1bHRcIiB8IFwibm9vcFwiLFxuICAgICAgICBcIjxDUy10PlwiOiBcImRlZmF1bHRcIiB8IFwibm9vcFwiLFxuICAgICAgICBcIjxDUy13PlwiOiBcImRlZmF1bHRcIiB8IFwibm9vcFwiLFxuICAgICAgICBpZ25vcmVLZXlzOiB7IFtrZXkgaW4gTnZpbU1vZGVdOiBzdHJpbmdbXSB9LFxuICAgICAgICBjbWRsaW5lVGltZW91dDogbnVtYmVyLFxuICAgIH07XG4gICAgbG9jYWxTZXR0aW5nczogeyBba2V5OiBzdHJpbmddOiBJU2l0ZUNvbmZpZyB9O1xufVxuXG5sZXQgY29uZjogSUNvbmZpZyA9IHVuZGVmaW5lZCBhcyBJQ29uZmlnO1xuXG5leHBvcnQgY29uc3QgY29uZlJlYWR5ID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgYnJvd3Nlci5zdG9yYWdlLmxvY2FsLmdldCgpLnRoZW4oKG9iajogYW55KSA9PiB7XG4gICAgICAgIGNvbmYgPSBvYmo7XG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgfSk7XG59KTtcblxuYnJvd3Nlci5zdG9yYWdlLm9uQ2hhbmdlZC5hZGRMaXN0ZW5lcigoY2hhbmdlczogYW55KSA9PiB7XG4gICAgT2JqZWN0XG4gICAgICAgIC5lbnRyaWVzKGNoYW5nZXMpXG4gICAgICAgIC5mb3JFYWNoKChba2V5LCB2YWx1ZV06IFtrZXlvZiBJQ29uZmlnLCBhbnldKSA9PiBjb25mUmVhZHkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25mW2tleV0gPSB2YWx1ZS5uZXdWYWx1ZTtcbiAgICAgICAgfSkpO1xufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRHbG9iYWxDb25mKCkge1xuICAgIC8vIENhbid0IGJlIHRlc3RlZCBmb3JcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmIChjb25mID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZ2V0R2xvYmFsQ29uZiBjYWxsZWQgYmVmb3JlIGNvbmZpZyB3YXMgcmVhZHlcIik7XG4gICAgfVxuICAgIHJldHVybiBjb25mLmdsb2JhbFNldHRpbmdzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29uZigpIHtcbiAgICByZXR1cm4gZ2V0Q29uZkZvclVybChkb2N1bWVudC5sb2NhdGlvbi5ocmVmKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbmZGb3JVcmwodXJsOiBzdHJpbmcpOiBJU2l0ZUNvbmZpZyB7XG4gICAgY29uc3QgbG9jYWxTZXR0aW5ncyA9IGNvbmYubG9jYWxTZXR0aW5ncztcbiAgICBmdW5jdGlvbiBvcjEodmFsOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH1cbiAgICAvLyBDYW4ndCBiZSB0ZXN0ZWQgZm9yXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAobG9jYWxTZXR0aW5ncyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yOiB5b3VyIHNldHRpbmdzIGFyZSB1bmRlZmluZWQuIFRyeSByZWxvYWRpbmcgdGhlIHBhZ2UuIElmIHRoaXMgZXJyb3IgcGVyc2lzdHMsIHRyeSB0aGUgdHJvdWJsZXNob290aW5nIGd1aWRlOiBodHRwczovL2dpdGh1Yi5jb20vZ2xhY2FtYnJlL2ZpcmVudmltL2Jsb2IvbWFzdGVyL1RST1VCTEVTSE9PVElORy5tZFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIEFycmF5LmZyb20oT2JqZWN0LmVudHJpZXMobG9jYWxTZXR0aW5ncykpXG4gICAgICAgIC5maWx0ZXIoKFtwYXQsIF9dKSA9PiAobmV3IFJlZ0V4cChwYXQpKS50ZXN0KHVybCkpXG4gICAgICAgIC5zb3J0KChlMSwgZTIpID0+IChvcjEoZTFbMV0ucHJpb3JpdHkpIC0gb3IxKGUyWzFdLnByaW9yaXR5KSkpXG4gICAgICAgIC5yZWR1Y2UoKGFjYywgW18sIGN1cl0pID0+IE9iamVjdC5hc3NpZ24oYWNjLCBjdXIpLCB7fSBhcyBJU2l0ZUNvbmZpZyk7XG59XG4iLCJleHBvcnQgY29uc3Qgbm9uTGl0ZXJhbEtleXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAgIFwiIFwiOiBcIjxTcGFjZT5cIixcbiAgICBcIjxcIjogXCI8bHQ+XCIsXG4gICAgXCJBcnJvd0Rvd25cIjogXCI8RG93bj5cIixcbiAgICBcIkFycm93TGVmdFwiOiBcIjxMZWZ0PlwiLFxuICAgIFwiQXJyb3dSaWdodFwiOiBcIjxSaWdodD5cIixcbiAgICBcIkFycm93VXBcIjogXCI8VXA+XCIsXG4gICAgXCJCYWNrc3BhY2VcIjogXCI8QlM+XCIsXG4gICAgXCJEZWxldGVcIjogXCI8RGVsPlwiLFxuICAgIFwiRW5kXCI6IFwiPEVuZD5cIixcbiAgICBcIkVudGVyXCI6IFwiPENSPlwiLFxuICAgIFwiRXNjYXBlXCI6IFwiPEVzYz5cIixcbiAgICBcIkYxXCI6IFwiPEYxPlwiLFxuICAgIFwiRjEwXCI6IFwiPEYxMD5cIixcbiAgICBcIkYxMVwiOiBcIjxGMTE+XCIsXG4gICAgXCJGMTJcIjogXCI8RjEyPlwiLFxuICAgIFwiRjEzXCI6IFwiPEYxMz5cIixcbiAgICBcIkYxNFwiOiBcIjxGMTQ+XCIsXG4gICAgXCJGMTVcIjogXCI8RjE1PlwiLFxuICAgIFwiRjE2XCI6IFwiPEYxNj5cIixcbiAgICBcIkYxN1wiOiBcIjxGMTc+XCIsXG4gICAgXCJGMThcIjogXCI8RjE4PlwiLFxuICAgIFwiRjE5XCI6IFwiPEYxOT5cIixcbiAgICBcIkYyXCI6IFwiPEYyPlwiLFxuICAgIFwiRjIwXCI6IFwiPEYyMD5cIixcbiAgICBcIkYyMVwiOiBcIjxGMjE+XCIsXG4gICAgXCJGMjJcIjogXCI8RjIyPlwiLFxuICAgIFwiRjIzXCI6IFwiPEYyMz5cIixcbiAgICBcIkYyNFwiOiBcIjxGMjQ+XCIsXG4gICAgXCJGM1wiOiBcIjxGMz5cIixcbiAgICBcIkY0XCI6IFwiPEY0PlwiLFxuICAgIFwiRjVcIjogXCI8RjU+XCIsXG4gICAgXCJGNlwiOiBcIjxGNj5cIixcbiAgICBcIkY3XCI6IFwiPEY3PlwiLFxuICAgIFwiRjhcIjogXCI8Rjg+XCIsXG4gICAgXCJGOVwiOiBcIjxGOT5cIixcbiAgICBcIkhvbWVcIjogXCI8SG9tZT5cIixcbiAgICBcIlBhZ2VEb3duXCI6IFwiPFBhZ2VEb3duPlwiLFxuICAgIFwiUGFnZVVwXCI6IFwiPFBhZ2VVcD5cIixcbiAgICBcIlRhYlwiOiBcIjxUYWI+XCIsXG4gICAgXCJcXFxcXCI6IFwiPEJzbGFzaD5cIixcbiAgICBcInxcIjogXCI8QmFyPlwiLFxufTtcblxuY29uc3Qgbm9uTGl0ZXJhbFZpbUtleXMgPSBPYmplY3QuZnJvbUVudHJpZXMoT2JqZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZW50cmllcyhub25MaXRlcmFsS2V5cylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKFt4LCB5XSkgPT4gW3ksIHhdKSk7XG5cbmNvbnN0IG5vbkxpdGVyYWxLZXlDb2Rlczoge1trZXk6IHN0cmluZ106IG51bWJlcn0gPSB7XG4gICAgXCJFbnRlclwiOiAgICAgIDEzLFxuICAgIFwiU3BhY2VcIjogICAgICAzMixcbiAgICBcIlRhYlwiOiAgICAgICAgOSxcbiAgICBcIkRlbGV0ZVwiOiAgICAgNDYsXG4gICAgXCJFbmRcIjogICAgICAgIDM1LFxuICAgIFwiSG9tZVwiOiAgICAgICAzNixcbiAgICBcIkluc2VydFwiOiAgICAgNDUsXG4gICAgXCJQYWdlRG93blwiOiAgIDM0LFxuICAgIFwiUGFnZVVwXCI6ICAgICAzMyxcbiAgICBcIkFycm93RG93blwiOiAgNDAsXG4gICAgXCJBcnJvd0xlZnRcIjogIDM3LFxuICAgIFwiQXJyb3dSaWdodFwiOiAzOSxcbiAgICBcIkFycm93VXBcIjogICAgMzgsXG4gICAgXCJFc2NhcGVcIjogICAgIDI3LFxufTtcblxuLy8gR2l2ZW4gYSBcInNwZWNpYWxcIiBrZXkgcmVwcmVzZW50YXRpb24gKGUuZy4gPEVudGVyPiBvciA8TS1sPiksIHJldHVybnMgYW5cbi8vIGFycmF5IG9mIHRocmVlIGphdmFzY3JpcHQga2V5ZXZlbnRzLCB0aGUgZmlyc3Qgb25lIHJlcHJlc2VudGluZyB0aGVcbi8vIGNvcnJlc3BvbmRpbmcga2V5ZG93biwgdGhlIHNlY29uZCBvbmUgYSBrZXlwcmVzcyBhbmQgdGhlIHRoaXJkIG9uZSBhIGtleXVwXG4vLyBldmVudC5cbmZ1bmN0aW9uIG1vZEtleVRvRXZlbnRzKGs6IHN0cmluZykge1xuICAgIGxldCBtb2RzID0gXCJcIjtcbiAgICBsZXQga2V5ID0gbm9uTGl0ZXJhbFZpbUtleXNba107XG4gICAgbGV0IGN0cmxLZXkgPSBmYWxzZTtcbiAgICBsZXQgYWx0S2V5ID0gZmFsc2U7XG4gICAgbGV0IHNoaWZ0S2V5ID0gZmFsc2U7XG4gICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IGFyciA9IGsuc2xpY2UoMSwgLTEpLnNwbGl0KFwiLVwiKTtcbiAgICAgICAgbW9kcyA9IGFyclswXTtcbiAgICAgICAga2V5ID0gYXJyWzFdO1xuICAgICAgICBjdHJsS2V5ID0gL2MvaS50ZXN0KG1vZHMpO1xuICAgICAgICBhbHRLZXkgPSAvYS9pLnRlc3QobW9kcyk7XG4gICAgICAgIGNvbnN0IHNwZWNpYWxDaGFyID0gXCI8XCIgKyBrZXkgKyBcIj5cIjtcbiAgICAgICAgaWYgKG5vbkxpdGVyYWxWaW1LZXlzW3NwZWNpYWxDaGFyXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBrZXkgPSBub25MaXRlcmFsVmltS2V5c1tzcGVjaWFsQ2hhcl07XG4gICAgICAgICAgICBzaGlmdEtleSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2hpZnRLZXkgPSBrZXkgIT09IGtleS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFNvbWUgcGFnZXMgcmVseSBvbiBrZXlDb2RlcyB0byBmaWd1cmUgb3V0IHdoYXQga2V5IHdhcyBwcmVzc2VkLiBUaGlzIGlzXG4gICAgLy8gYXdmdWwgYmVjYXVzZSBrZXljb2RlcyBhcmVuJ3QgZ3VhcmFudGVlZCB0byBiZSB0aGUgc2FtZSBhY3Jyb3NzXG4gICAgLy8gYnJvd3NlcnMvT1Mva2V5Ym9hcmQgbGF5b3V0cyBidXQgdHJ5IHRvIGRvIHRoZSByaWdodCB0aGluZyBhbnl3YXkuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2dsYWNhbWJyZS9maXJlbnZpbS9pc3N1ZXMvNzIzXG4gICAgbGV0IGtleUNvZGUgPSAwO1xuICAgIGlmICgvXlthLXpBLVowLTldJC8udGVzdChrZXkpKSB7XG4gICAgICAgIGtleUNvZGUgPSBrZXkuY2hhckNvZGVBdCgwKTtcbiAgICB9IGVsc2UgaWYgKG5vbkxpdGVyYWxLZXlDb2Rlc1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAga2V5Q29kZSA9IG5vbkxpdGVyYWxLZXlDb2Rlc1trZXldO1xuICAgIH1cbiAgICBjb25zdCBpbml0ID0geyBrZXksIGtleUNvZGUsIGN0cmxLZXksIGFsdEtleSwgc2hpZnRLZXksIGJ1YmJsZXM6IHRydWUgfTtcbiAgICByZXR1cm4gW1xuICAgICAgICBuZXcgS2V5Ym9hcmRFdmVudChcImtleWRvd25cIiwgaW5pdCksXG4gICAgICAgIG5ldyBLZXlib2FyZEV2ZW50KFwia2V5cHJlc3NcIiwgaW5pdCksXG4gICAgICAgIG5ldyBLZXlib2FyZEV2ZW50KFwia2V5dXBcIiwgaW5pdCksXG4gICAgXTtcbn1cblxuLy8gR2l2ZW4gYSBcInNpbXBsZVwiIGtleSAoZS5nLiBgYWAsIGAxYOKApiksIHJldHVybnMgYW4gYXJyYXkgb2YgdGhyZWUgamF2YXNjcmlwdFxuLy8gZXZlbnRzIHJlcHJlc2VudGluZyB0aGUgYWN0aW9uIG9mIHByZXNzaW5nIHRoZSBrZXkuXG5mdW5jdGlvbiBrZXlUb0V2ZW50cyhrZXk6IHN0cmluZykge1xuICAgIGNvbnN0IHNoaWZ0S2V5ID0ga2V5ICE9PSBrZXkudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICByZXR1cm4gW1xuICAgICAgICBuZXcgS2V5Ym9hcmRFdmVudChcImtleWRvd25cIiwgIHsga2V5LCBzaGlmdEtleSwgYnViYmxlczogdHJ1ZSB9KSxcbiAgICAgICAgbmV3IEtleWJvYXJkRXZlbnQoXCJrZXlwcmVzc1wiLCB7IGtleSwgc2hpZnRLZXksIGJ1YmJsZXM6IHRydWUgfSksXG4gICAgICAgIG5ldyBLZXlib2FyZEV2ZW50KFwia2V5dXBcIiwgICAgeyBrZXksIHNoaWZ0S2V5LCBidWJibGVzOiB0cnVlIH0pLFxuICAgIF07XG59XG5cbi8vIEdpdmVuIGFuIGFycmF5IG9mIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBrZXlzIChlLmcuIFtcImFcIiwgXCI8RW50ZXI+XCIsIOKApl0pLFxuLy8gcmV0dXJucyBhbiBhcnJheSBvZiBqYXZhc2NyaXB0IGtleWJvYXJkIGV2ZW50cyB0aGF0IHNpbXVsYXRlIHRoZXNlIGtleXNcbi8vIGJlaW5nIHByZXNzZWQuXG5leHBvcnQgZnVuY3Rpb24ga2V5c1RvRXZlbnRzKGtleXM6IHN0cmluZ1tdKSB7XG4gICAgLy8gQ29kZSB0byBzcGxpdCBtb2Qga2V5cyBhbmQgbm9uLW1vZCBrZXlzOlxuICAgIC8vIGNvbnN0IGtleXMgPSBzdHIubWF0Y2goLyhbPD5dW148Pl0rWzw+XSl8KFtePD5dKykvZylcbiAgICAvLyBpZiAoa2V5cyA9PT0gbnVsbCkge1xuICAgIC8vICAgICByZXR1cm4gW107XG4gICAgLy8gfVxuICAgIHJldHVybiBrZXlzLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgIGlmIChrZXlbMF0gPT09IFwiPFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9kS2V5VG9FdmVudHMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ga2V5VG9FdmVudHMoa2V5KTtcbiAgICB9KS5mbGF0KCk7XG59XG5cbi8vIFR1cm5zIGEgbm9uLWxpdGVyYWwga2V5IChlLmcuIFwiRW50ZXJcIikgaW50byBhIHZpbS1lcXVpdmFsZW50IFwiPEVudGVyPlwiXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlS2V5KGtleTogc3RyaW5nKSB7XG4gICAgaWYgKG5vbkxpdGVyYWxLZXlzW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbm9uTGl0ZXJhbEtleXNba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIGtleTtcbn1cblxuLy8gQWRkIG1vZGlmaWVyIGBtb2RgIChgQWAsIGBDYCwgYFNg4oCmKSB0byBgdGV4dGAgKGEgdmltIGtleSBgYmAsIGA8RW50ZXI+YCxcbi8vIGA8Q1MteD5g4oCmKVxuZXhwb3J0IGZ1bmN0aW9uIGFkZE1vZGlmaWVyKG1vZDogc3RyaW5nLCB0ZXh0OiBzdHJpbmcpIHtcbiAgICBsZXQgbWF0Y2g7XG4gICAgbGV0IG1vZGlmaWVycyA9IFwiXCI7XG4gICAgbGV0IGtleSA9IFwiXCI7XG4gICAgaWYgKChtYXRjaCA9IHRleHQubWF0Y2goL148KFtBLVpdezEsNX0pLSguKyk+JC8pKSkge1xuICAgICAgICBtb2RpZmllcnMgPSBtYXRjaFsxXTtcbiAgICAgICAga2V5ID0gbWF0Y2hbMl07XG4gICAgfSBlbHNlIGlmICgobWF0Y2ggPSB0ZXh0Lm1hdGNoKC9ePCguKyk+JC8pKSkge1xuICAgICAgICBrZXkgPSBtYXRjaFsxXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBrZXkgPSB0ZXh0O1xuICAgIH1cbiAgICByZXR1cm4gXCI8XCIgKyBtb2QgKyBtb2RpZmllcnMgKyBcIi1cIiArIGtleSArIFwiPlwiO1xufVxuIiwibGV0IGN1ckhvc3QgOiBzdHJpbmc7XG5cbi8vIENhbid0IGdldCBjb3ZlcmFnZSBmb3IgdGh1bmRlcmJpcmQuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuaWYgKChicm93c2VyIGFzIGFueSkuY29tcG9zZVNjcmlwdHMgIT09IHVuZGVmaW5lZCB8fCBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID09PSBcImFib3V0OmJsYW5rP2NvbXBvc2VcIikge1xuICAgIGN1ckhvc3QgPSBcInRodW5kZXJiaXJkXCI7XG4vLyBDaHJvbWUgZG9lc24ndCBoYXZlIGEgXCJicm93c2VyXCIgb2JqZWN0LCBpbnN0ZWFkIGl0IHVzZXMgXCJjaHJvbWVcIi5cbn0gZWxzZSBpZiAod2luZG93LmxvY2F0aW9uLnByb3RvY29sID09PSBcIm1vei1leHRlbnNpb246XCIpIHtcbiAgICBjdXJIb3N0ID0gXCJmaXJlZm94XCI7XG59IGVsc2UgaWYgKHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCA9PT0gXCJjaHJvbWUtZXh0ZW5zaW9uOlwiKSB7XG4gICAgY3VySG9zdCA9IFwiY2hyb21lXCI7XG59XG5cbi8vIE9ubHkgdXNhYmxlIGluIGJhY2tncm91bmQgc2NyaXB0IVxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2hyb21lKCkge1xuICAgIC8vIENhbid0IGNvdmVyIGVycm9yIGNvbmRpdGlvblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKGN1ckhvc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBFcnJvcihcIlVzZWQgaXNDaHJvbWUgaW4gY29udGVudCBzY3JpcHQhXCIpO1xuICAgIH1cbiAgICByZXR1cm4gY3VySG9zdCA9PT0gXCJjaHJvbWVcIjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1RodW5kZXJiaXJkKCkge1xuICAgIC8vIENhbid0IGNvdmVyIGVycm9yIGNvbmRpdGlvblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKGN1ckhvc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBFcnJvcihcIlVzZWQgaXNUaHVuZGVyYmlyZCBpbiBjb250ZW50IHNjcmlwdCFcIik7XG4gICAgfVxuICAgIHJldHVybiBjdXJIb3N0ID09PSBcInRodW5kZXJiaXJkXCI7XG59XG5cbi8vIFJ1bnMgQ09ERSBpbiB0aGUgcGFnZSdzIGNvbnRleHQgYnkgc2V0dGluZyB1cCBhIGN1c3RvbSBldmVudCBsaXN0ZW5lcixcbi8vIGVtYmVkZGluZyBhIHNjcmlwdCBlbGVtZW50IHRoYXQgcnVucyB0aGUgcGllY2Ugb2YgY29kZSBhbmQgZW1pdHMgaXRzIHJlc3VsdFxuLy8gYXMgYW4gZXZlbnQuXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZUluUGFnZShjb2RlOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgIGNvbnN0IGV2ZW50SWQgPSAobmV3IFVSTChicm93c2VyLnJ1bnRpbWUuZ2V0VVJMKFwiXCIpKSkuaG9zdG5hbWUgKyBNYXRoLnJhbmRvbSgpO1xuICAgICAgICBzY3JpcHQuaW5uZXJIVE1MID0gYChhc3luYyAoZXZJZCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0ICR7Y29kZX07XG4gICAgICAgICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KGV2SWQsIHtcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChldklkLCB7XG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDogeyBzdWNjZXNzOiBmYWxzZSwgcmVhc29uOiBlIH0sXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSgke0pTT04uc3RyaW5naWZ5KGV2ZW50SWQpfSlgO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudElkLCAoeyBkZXRhaWwgfTogYW55KSA9PiB7XG4gICAgICAgICAgICBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgICAgICAgICAgaWYgKGRldGFpbC5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoZGV0YWlsLnJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGRldGFpbC5yZWFzb24pO1xuICAgICAgICB9LCB7IG9uY2U6IHRydWUgfSk7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICB9KTtcbn1cblxuLy8gVmFyaW91cyBmaWx0ZXJzIHRoYXQgYXJlIHVzZWQgdG8gY2hhbmdlIHRoZSBhcHBlYXJhbmNlIG9mIHRoZSBCcm93c2VyQWN0aW9uXG4vLyBpY29uLlxuY29uc3Qgc3ZncGF0aCA9IFwiZmlyZW52aW0uc3ZnXCI7XG5jb25zdCB0cmFuc2Zvcm1hdGlvbnMgPSB7XG4gICAgZGlzYWJsZWQ6IChpbWc6IFVpbnQ4Q2xhbXBlZEFycmF5KSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1nLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgICAgICAvLyBTa2lwIHRyYW5zcGFyZW50IHBpeGVsc1xuICAgICAgICAgICAgaWYgKGltZ1tpICsgM10gPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG1lYW4gPSBNYXRoLmZsb29yKChpbWdbaV0gKyBpbWdbaSArIDFdICsgaW1nW2kgKyAyXSkgLyAzKTtcbiAgICAgICAgICAgIGltZ1tpXSA9IG1lYW47XG4gICAgICAgICAgICBpbWdbaSArIDFdID0gbWVhbjtcbiAgICAgICAgICAgIGltZ1tpICsgMl0gPSBtZWFuO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBlcnJvcjogKGltZzogVWludDhDbGFtcGVkQXJyYXkpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWcubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgICAgIC8vIFR1cm4gdHJhbnNwYXJlbnQgcGl4ZWxzIHJlZFxuICAgICAgICAgICAgaWYgKGltZ1tpICsgM10gPT09IDApIHtcbiAgICAgICAgICAgICAgICBpbWdbaV0gPSAyNTU7XG4gICAgICAgICAgICAgICAgaW1nW2kgKyAzXSA9IDI1NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgbm9ybWFsOiAoKF9pbWc6IFVpbnQ4Q2xhbXBlZEFycmF5KSA9PiAodW5kZWZpbmVkIGFzIG5ldmVyKSksXG4gICAgbm90aWZpY2F0aW9uOiAoaW1nOiBVaW50OENsYW1wZWRBcnJheSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltZy5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICAgICAgLy8gVHVybiB0cmFuc3BhcmVudCBwaXhlbHMgeWVsbG93XG4gICAgICAgICAgICBpZiAoaW1nW2kgKyAzXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGltZ1tpXSA9IDI1NTtcbiAgICAgICAgICAgICAgICBpbWdbaSArIDFdID0gMjU1O1xuICAgICAgICAgICAgICAgIGltZ1tpICsgM10gPSAyNTU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxufTtcblxuZXhwb3J0IHR5cGUgSWNvbktpbmQgPSBrZXlvZiB0eXBlb2YgdHJhbnNmb3JtYXRpb25zO1xuXG4vLyBUYWtlcyBhbiBpY29uIGtpbmQgYW5kIGRpbWVuc2lvbnMgYXMgcGFyYW1ldGVyLCBkcmF3cyB0aGF0IHRvIGEgY2FudmFzIGFuZFxuLy8gcmV0dXJucyBhIHByb21pc2UgdGhhdCB3aWxsIGJlIHJlc29sdmVkIHdpdGggdGhlIGNhbnZhcycgaW1hZ2UgZGF0YS5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJY29uSW1hZ2VEYXRhKGtpbmQ6IEljb25LaW5kLCB3aWR0aCA9IDMyLCBoZWlnaHQgPSAzMikge1xuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2Uod2lkdGgsIGhlaWdodCk7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IGltZy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgY29uc3QgaWQgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0cmFuc2Zvcm1hdGlvbnNba2luZF0oaWQuZGF0YSk7XG4gICAgICAgIHJlc29sdmUoaWQpO1xuICAgIH0pKTtcbiAgICBpbWcuc3JjID0gc3ZncGF0aDtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBHaXZlbiBhIHVybCBhbmQgYSBzZWxlY3RvciwgdHJpZXMgdG8gY29tcHV0ZSBhIG5hbWUgdGhhdCB3aWxsIGJlIHVuaXF1ZSxcbi8vIHNob3J0IGFuZCByZWFkYWJsZSBmb3IgdGhlIHVzZXIuXG5leHBvcnQgZnVuY3Rpb24gdG9GaWxlTmFtZSh1cmw6IHN0cmluZywgaWQ6IHN0cmluZywgbGFuZ3VhZ2U6IHN0cmluZykge1xuICAgIGxldCBwYXJzZWRVUkw7XG4gICAgdHJ5IHtcbiAgICAgICAgcGFyc2VkVVJMID0gbmV3IFVSTCh1cmwpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gT25seSBoYXBwZW5zIHdpdGggdGh1bmRlcmJpcmQsIHdoZXJlIHdlIGNhbid0IGdldCBjb3ZlcmFnZVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBwYXJzZWRVUkwgPSB7IGhvc3RuYW1lOiAndGh1bmRlcmJpcmQnLCBwYXRobmFtZTogJ21haWwnIH07XG4gICAgfVxuICAgIGNvbnN0IHNob3J0SWQgPSBpZC5yZXBsYWNlKC86bnRoLW9mLXR5cGUvZywgXCJcIik7XG4gICAgY29uc3QgdG9BbHBoYU51bSA9IChzdHI6IHN0cmluZykgPT4gKHN0ci5tYXRjaCgvW2EtekEtWjAtOV0rL2cpIHx8IFtdKVxuICAgICAgICAuam9pbihcIi1cIilcbiAgICAgICAgLnNsaWNlKC0zMik7XG4gICAgY29uc3QgZXh0ID0gbGFuZ3VhZ2VUb0V4dGVuc2lvbnMobGFuZ3VhZ2UpO1xuICAgIHJldHVybiBgJHtwYXJzZWRVUkwuaG9zdG5hbWV9XyR7dG9BbHBoYU51bShwYXJzZWRVUkwucGF0aG5hbWUpfV8ke3RvQWxwaGFOdW0oc2hvcnRJZCl9LiR7ZXh0fWA7XG59XG5cbi8vIEdpdmVuIGEgbGFuZ3VhZ2UgbmFtZSwgcmV0dXJucyBhIGZpbGVuYW1lIGV4dGVuc2lvbi4gQ2FuIHJldHVybiB1bmRlZmluZWQuXG5leHBvcnQgZnVuY3Rpb24gbGFuZ3VhZ2VUb0V4dGVuc2lvbnMobGFuZ3VhZ2U6IHN0cmluZykge1xuICAgIGlmIChsYW5ndWFnZSA9PT0gdW5kZWZpbmVkIHx8IGxhbmd1YWdlID09PSBudWxsKSB7XG4gICAgICAgIGxhbmd1YWdlID0gXCJcIjtcbiAgICB9XG4gICAgY29uc3QgbGFuZyA9IGxhbmd1YWdlLnRvTG93ZXJDYXNlKCk7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBzd2l0Y2ggKGxhbmcpIHtcbiAgICAgICAgY2FzZSBcImFwbFwiOiAgICAgICAgICAgICAgcmV0dXJuIFwiYXBsXCI7XG4gICAgICAgIGNhc2UgXCJicmFpbmZ1Y2tcIjogICAgICAgIHJldHVybiBcImJmXCI7XG4gICAgICAgIGNhc2UgXCJjXCI6ICAgICAgICAgICAgICAgIHJldHVybiBcImNcIjtcbiAgICAgICAgY2FzZSBcImMjXCI6ICAgICAgICAgICAgICAgcmV0dXJuIFwiY3NcIjtcbiAgICAgICAgY2FzZSBcImMrK1wiOiAgICAgICAgICAgICAgcmV0dXJuIFwiY3BwXCI7XG4gICAgICAgIGNhc2UgXCJjZXlsb25cIjogICAgICAgICAgIHJldHVybiBcImNleWxvblwiO1xuICAgICAgICBjYXNlIFwiY2xpa2VcIjogICAgICAgICAgICByZXR1cm4gXCJjXCI7XG4gICAgICAgIGNhc2UgXCJjbG9qdXJlXCI6ICAgICAgICAgIHJldHVybiBcImNsalwiO1xuICAgICAgICBjYXNlIFwiY21ha2VcIjogICAgICAgICAgICByZXR1cm4gXCIuY21ha2VcIjtcbiAgICAgICAgY2FzZSBcImNvYm9sXCI6ICAgICAgICAgICAgcmV0dXJuIFwiY2JsXCI7XG4gICAgICAgIGNhc2UgXCJjb2ZmZWVzY3JpcHRcIjogICAgIHJldHVybiBcImNvZmZlZVwiO1xuICAgICAgICBjYXNlIFwiY29tbW9ubGlzcFwiOiAgICAgIHJldHVybiBcImxpc3BcIjtcbiAgICAgICAgY2FzZSBcImNyeXN0YWxcIjogICAgICAgICAgcmV0dXJuIFwiY3JcIjtcbiAgICAgICAgY2FzZSBcImNzc1wiOiAgICAgICAgICAgICAgcmV0dXJuIFwiY3NzXCI7XG4gICAgICAgIGNhc2UgXCJjeXRob25cIjogICAgICAgICAgIHJldHVybiBcInB5XCI7XG4gICAgICAgIGNhc2UgXCJkXCI6ICAgICAgICAgICAgICAgIHJldHVybiBcImRcIjtcbiAgICAgICAgY2FzZSBcImRhcnRcIjogICAgICAgICAgICAgcmV0dXJuIFwiZGFydFwiO1xuICAgICAgICBjYXNlIFwiZGlmZlwiOiAgICAgICAgICAgICByZXR1cm4gXCJkaWZmXCI7XG4gICAgICAgIGNhc2UgXCJkb2NrZXJmaWxlXCI6ICAgICAgIHJldHVybiBcImRvY2tlcmZpbGVcIjtcbiAgICAgICAgY2FzZSBcImR0ZFwiOiAgICAgICAgICAgICAgcmV0dXJuIFwiZHRkXCI7XG4gICAgICAgIGNhc2UgXCJkeWxhblwiOiAgICAgICAgICAgIHJldHVybiBcImR5bGFuXCI7XG4gICAgICAgIC8vIEVpZmZlbCB3YXMgdGhlcmUgZmlyc3QgYnV0IGVsaXhpciBzZWVtcyBtb3JlIGxpa2VseVxuICAgICAgICAvLyBjYXNlIFwiZWlmZmVsXCI6ICAgICAgICAgICByZXR1cm4gXCJlXCI7XG4gICAgICAgIGNhc2UgXCJlbGl4aXJcIjogICAgICAgICAgIHJldHVybiBcImVcIjtcbiAgICAgICAgY2FzZSBcImVsbVwiOiAgICAgICAgICAgICAgcmV0dXJuIFwiZWxtXCI7XG4gICAgICAgIGNhc2UgXCJlcmxhbmdcIjogICAgICAgICAgIHJldHVybiBcImVybFwiO1xuICAgICAgICBjYXNlIFwiZiNcIjogICAgICAgICAgICAgICByZXR1cm4gXCJmc1wiO1xuICAgICAgICBjYXNlIFwiZmFjdG9yXCI6ICAgICAgICAgICByZXR1cm4gXCJmYWN0b3JcIjtcbiAgICAgICAgY2FzZSBcImZvcnRoXCI6ICAgICAgICAgICAgcmV0dXJuIFwiZnRoXCI7XG4gICAgICAgIGNhc2UgXCJmb3J0cmFuXCI6ICAgICAgICAgIHJldHVybiBcImY5MFwiO1xuICAgICAgICBjYXNlIFwiZ2FzXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJhc21cIjtcbiAgICAgICAgY2FzZSBcImdvXCI6ICAgICAgICAgICAgICAgcmV0dXJuIFwiZ29cIjtcbiAgICAgICAgLy8gR0ZNOiBDb2RlTWlycm9yJ3MgZ2l0aHViLWZsYXZvcmVkIG1hcmtkb3duXG4gICAgICAgIGNhc2UgXCJnZm1cIjogICAgICAgICAgICAgIHJldHVybiBcIm1kXCI7XG4gICAgICAgIGNhc2UgXCJncm9vdnlcIjogICAgICAgICAgIHJldHVybiBcImdyb292eVwiO1xuICAgICAgICBjYXNlIFwiaGFtbFwiOiAgICAgICAgICAgICByZXR1cm4gXCJoYW1sXCI7XG4gICAgICAgIGNhc2UgXCJoYW5kbGViYXJzXCI6ICAgICAgIHJldHVybiBcImhic1wiO1xuICAgICAgICBjYXNlIFwiaGFza2VsbFwiOiAgICAgICAgICByZXR1cm4gXCJoc1wiO1xuICAgICAgICBjYXNlIFwiaGF4ZVwiOiAgICAgICAgICAgICByZXR1cm4gXCJoeFwiO1xuICAgICAgICBjYXNlIFwiaHRtbFwiOiAgICAgICAgICAgICByZXR1cm4gXCJodG1sXCI7XG4gICAgICAgIGNhc2UgXCJodG1sZW1iZWRkZWRcIjogICAgIHJldHVybiBcImh0bWxcIjtcbiAgICAgICAgY2FzZSBcImh0bWxtaXhlZFwiOiAgICAgICAgcmV0dXJuIFwiaHRtbFwiO1xuICAgICAgICBjYXNlIFwiamF2YVwiOiAgICAgICAgICAgICByZXR1cm4gXCJqYXZhXCI7XG4gICAgICAgIGNhc2UgXCJqYXZhc2NyaXB0XCI6ICAgICAgIHJldHVybiBcImpzXCI7XG4gICAgICAgIGNhc2UgXCJqaW5qYTJcIjogICAgICAgICAgIHJldHVybiBcImppbmphXCI7XG4gICAgICAgIGNhc2UgXCJqdWxpYVwiOiAgICAgICAgICAgIHJldHVybiBcImpsXCI7XG4gICAgICAgIGNhc2UgXCJqc3hcIjogICAgICAgICAgICAgIHJldHVybiBcImpzeFwiO1xuICAgICAgICBjYXNlIFwia290bGluXCI6ICAgICAgICAgICByZXR1cm4gXCJrdFwiO1xuICAgICAgICBjYXNlIFwibGF0ZXhcIjogICAgICAgICAgICByZXR1cm4gXCJsYXRleFwiO1xuICAgICAgICBjYXNlIFwibGVzc1wiOiAgICAgICAgICAgICByZXR1cm4gXCJsZXNzXCI7XG4gICAgICAgIGNhc2UgXCJsdWFcIjogICAgICAgICAgICAgIHJldHVybiBcImx1YVwiO1xuICAgICAgICBjYXNlIFwibWFya2Rvd25cIjogICAgICAgICByZXR1cm4gXCJtZFwiO1xuICAgICAgICBjYXNlIFwibWxsaWtlXCI6ICAgICAgICAgICAgcmV0dXJuIFwibWxcIjtcbiAgICAgICAgY2FzZSBcIm9jYW1sXCI6ICAgICAgICAgICAgcmV0dXJuIFwibWxcIjtcbiAgICAgICAgY2FzZSBcIm9jdGF2ZVwiOiAgICAgICAgICAgcmV0dXJuIFwibVwiO1xuICAgICAgICBjYXNlIFwicGFzY2FsXCI6ICAgICAgICAgICByZXR1cm4gXCJwYXNcIjtcbiAgICAgICAgY2FzZSBcInBlcmxcIjogICAgICAgICAgICAgcmV0dXJuIFwicGxcIjtcbiAgICAgICAgY2FzZSBcInBocFwiOiAgICAgICAgICAgICAgcmV0dXJuIFwicGhwXCI7XG4gICAgICAgIGNhc2UgXCJwb3dlcnNoZWxsXCI6ICAgICAgIHJldHVybiBcInBzMVwiO1xuICAgICAgICBjYXNlIFwicHl0aG9uXCI6ICAgICAgICAgICByZXR1cm4gXCJweVwiO1xuICAgICAgICBjYXNlIFwiclwiOiAgICAgICAgICAgICAgICByZXR1cm4gXCJyXCI7XG4gICAgICAgIGNhc2UgXCJyc3RcIjogICAgICAgICAgICAgIHJldHVybiBcInJzdFwiO1xuICAgICAgICBjYXNlIFwicnVieVwiOiAgICAgICAgICAgICByZXR1cm4gXCJydWJ5XCI7XG4gICAgICAgIGNhc2UgXCJydXN0XCI6ICAgICAgICAgICAgIHJldHVybiBcInJzXCI7XG4gICAgICAgIGNhc2UgXCJzYXNcIjogICAgICAgICAgICAgIHJldHVybiBcInNhc1wiO1xuICAgICAgICBjYXNlIFwic2Fzc1wiOiAgICAgICAgICAgICByZXR1cm4gXCJzYXNzXCI7XG4gICAgICAgIGNhc2UgXCJzY2FsYVwiOiAgICAgICAgICAgIHJldHVybiBcInNjYWxhXCI7XG4gICAgICAgIGNhc2UgXCJzY2hlbWVcIjogICAgICAgICAgIHJldHVybiBcInNjbVwiO1xuICAgICAgICBjYXNlIFwic2Nzc1wiOiAgICAgICAgICAgICByZXR1cm4gXCJzY3NzXCI7XG4gICAgICAgIGNhc2UgXCJzbWFsbHRhbGtcIjogICAgICAgIHJldHVybiBcInN0XCI7XG4gICAgICAgIGNhc2UgXCJzaGVsbFwiOiAgICAgICAgICAgIHJldHVybiBcInNoXCI7XG4gICAgICAgIGNhc2UgXCJzcWxcIjogICAgICAgICAgICAgIHJldHVybiBcInNxbFwiO1xuICAgICAgICBjYXNlIFwic3RleFwiOiAgICAgICAgICAgICByZXR1cm4gXCJsYXRleFwiO1xuICAgICAgICBjYXNlIFwic3dpZnRcIjogICAgICAgICAgICByZXR1cm4gXCJzd2lmdFwiO1xuICAgICAgICBjYXNlIFwidGNsXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJ0Y2xcIjtcbiAgICAgICAgY2FzZSBcInRvbWxcIjogICAgICAgICAgICAgcmV0dXJuIFwidG9tbFwiO1xuICAgICAgICBjYXNlIFwidHdpZ1wiOiAgICAgICAgICAgICByZXR1cm4gXCJ0d2lnXCI7XG4gICAgICAgIGNhc2UgXCJ0eXBlc2NyaXB0XCI6ICAgICAgIHJldHVybiBcInRzXCI7XG4gICAgICAgIGNhc2UgXCJ2YlwiOiAgICAgICAgICAgICAgIHJldHVybiBcInZiXCI7XG4gICAgICAgIGNhc2UgXCJ2YnNjcmlwdFwiOiAgICAgICAgIHJldHVybiBcInZic1wiO1xuICAgICAgICBjYXNlIFwidmVyaWxvZ1wiOiAgICAgICAgICByZXR1cm4gXCJzdlwiO1xuICAgICAgICBjYXNlIFwidmhkbFwiOiAgICAgICAgICAgICByZXR1cm4gXCJ2aGRsXCI7XG4gICAgICAgIGNhc2UgXCJ4bWxcIjogICAgICAgICAgICAgIHJldHVybiBcInhtbFwiO1xuICAgICAgICBjYXNlIFwieWFtbFwiOiAgICAgICAgICAgICByZXR1cm4gXCJ5YW1sXCI7XG4gICAgICAgIGNhc2UgXCJ6ODBcIjogICAgICAgICAgICAgIHJldHVybiBcIno4YVwiO1xuICAgIH1cbiAgICByZXR1cm4gXCJ0eHRcIjtcbn1cblxuLy8gTWFrZSB0c2xpbnQgaGFwcHlcbmNvbnN0IGZvbnRGYW1pbHkgPSBcImZvbnQtZmFtaWx5XCI7XG5cbi8vIENhbid0IGJlIHRlc3RlZCBlMmUgOi9cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTaW5nbGVHdWlmb250KGd1aWZvbnQ6IHN0cmluZywgZGVmYXVsdHM6IGFueSkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBndWlmb250LnNwbGl0KFwiOlwiKTtcbiAgICBjb25zdCByZXN1bHQgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cyk7XG4gICAgaWYgKC9eW2EtekEtWjAtOV0rJC8udGVzdChvcHRpb25zWzBdKSkge1xuICAgICAgICByZXN1bHRbZm9udEZhbWlseV0gPSBvcHRpb25zWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdFtmb250RmFtaWx5XSA9IEpTT04uc3RyaW5naWZ5KG9wdGlvbnNbMF0pO1xuICAgIH1cbiAgICBpZiAoZGVmYXVsdHNbZm9udEZhbWlseV0pIHtcbiAgICAgICAgcmVzdWx0W2ZvbnRGYW1pbHldICs9IGAsICR7ZGVmYXVsdHNbZm9udEZhbWlseV19YDtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnMuc2xpY2UoMSkucmVkdWNlKChhY2MsIG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChvcHRpb25bMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiaFwiOlxuICAgICAgICAgICAgICAgICAgICBhY2NbXCJmb250LXNpemVcIl0gPSBgJHtvcHRpb24uc2xpY2UoMSl9cHRgO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiYlwiOlxuICAgICAgICAgICAgICAgICAgICBhY2NbXCJmb250LXdlaWdodFwiXSA9IFwiYm9sZFwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiaVwiOlxuICAgICAgICAgICAgICAgICAgICBhY2NbXCJmb250LXN0eWxlXCJdID0gXCJpdGFsaWNcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInVcIjpcbiAgICAgICAgICAgICAgICAgICAgYWNjW1widGV4dC1kZWNvcmF0aW9uXCJdID0gXCJ1bmRlcmxpbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInNcIjpcbiAgICAgICAgICAgICAgICAgICAgYWNjW1widGV4dC1kZWNvcmF0aW9uXCJdID0gXCJsaW5lLXRocm91Z2hcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIndcIjogLy8gQ2FuJ3Qgc2V0IGZvbnQgd2lkdGguIFdvdWxkIGhhdmUgdG8gYWRqdXN0IGNlbGwgd2lkdGguXG4gICAgICAgICAgICAgICAgY2FzZSBcImNcIjogLy8gQ2FuJ3Qgc2V0IGNoYXJhY3RlciBzZXRcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCByZXN1bHQgYXMgYW55KTtcbn07XG5cbi8vIFBhcnNlcyBhIGd1aWZvbnQgZGVjbGFyYXRpb24gYXMgZGVzY3JpYmVkIGluIGA6aCBFMjQ0YFxuLy8gZGVmYXVsdHM6IGRlZmF1bHQgdmFsdWUgZm9yIGVhY2ggb2YuXG4vLyBDYW4ndCBiZSB0ZXN0ZWQgZTJlIDovXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlR3VpZm9udChndWlmb250OiBzdHJpbmcsIGRlZmF1bHRzOiBhbnkpIHtcbiAgICBjb25zdCBmb250cyA9IGd1aWZvbnQuc3BsaXQoXCIsXCIpLnJldmVyc2UoKTtcbiAgICByZXR1cm4gZm9udHMucmVkdWNlKChhY2MsIGN1cikgPT4gcGFyc2VTaW5nbGVHdWlmb250KGN1ciwgYWNjKSwgZGVmYXVsdHMpO1xufVxuXG4vLyBDb21wdXRlcyBhIHVuaXF1ZSBzZWxlY3RvciBmb3IgaXRzIGFyZ3VtZW50LlxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVTZWxlY3RvcihlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGZ1bmN0aW9uIHVuaXF1ZVNlbGVjdG9yKGU6IEhUTUxFbGVtZW50KTogc3RyaW5nIHtcbiAgICAgICAgLy8gT25seSBtYXRjaGluZyBhbHBoYW51bWVyaWMgc2VsZWN0b3JzIGJlY2F1c2Ugb3RoZXJzIGNoYXJzIG1pZ2h0IGhhdmUgc3BlY2lhbCBtZWFuaW5nIGluIENTU1xuICAgICAgICBpZiAoZS5pZCAmJiBlLmlkLm1hdGNoKFwiXlthLXpBLVowLTlfLV0rJFwiKSkge1xuICAgICAgICAgICAgY29uc3QgaWQgPSBlLnRhZ05hbWUgKyBgW2lkPVwiJHtlLmlkfVwiXWA7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChpZCkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIElmIHdlIHJlYWNoZWQgdGhlIHRvcCBvZiB0aGUgZG9jdW1lbnRcbiAgICAgICAgaWYgKCFlLnBhcmVudEVsZW1lbnQpIHsgcmV0dXJuIFwiSFRNTFwiOyB9XG4gICAgICAgIC8vIENvbXB1dGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBlbGVtZW50XG4gICAgICAgIGNvbnN0IGluZGV4ID1cbiAgICAgICAgICAgIEFycmF5LmZyb20oZS5wYXJlbnRFbGVtZW50LmNoaWxkcmVuKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoY2hpbGQgPT4gY2hpbGQudGFnTmFtZSA9PT0gZS50YWdOYW1lKVxuICAgICAgICAgICAgICAgIC5pbmRleE9mKGUpICsgMTtcbiAgICAgICAgcmV0dXJuIGAke3VuaXF1ZVNlbGVjdG9yKGUucGFyZW50RWxlbWVudCl9ID4gJHtlLnRhZ05hbWV9Om50aC1vZi10eXBlKCR7aW5kZXh9KWA7XG4gICAgfVxuICAgIHJldHVybiB1bmlxdWVTZWxlY3RvcihlbGVtZW50KTtcbn1cblxuLy8gVHVybnMgYSBudW1iZXIgaW50byBpdHMgaGFzaCs2IG51bWJlciBoZXhhZGVjaW1hbCByZXByZXNlbnRhdGlvbi5cbmV4cG9ydCBmdW5jdGlvbiB0b0hleENzcyhuOiBudW1iZXIpIHtcbiAgICBpZiAobiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IHN0ciA9IG4udG9TdHJpbmcoMTYpO1xuICAgIC8vIFBhZCB3aXRoIGxlYWRpbmcgemVyb3NcbiAgICByZXR1cm4gXCIjXCIgKyAobmV3IEFycmF5KDYgLSBzdHIubGVuZ3RoKSkuZmlsbChcIjBcIikuam9pbihcIlwiKSArIHN0cjtcbn1cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBuZW92aW0gfSBmcm9tIFwiLi9OZW92aW1cIjtcbmltcG9ydCB7IHBhZ2UgfSBmcm9tIFwiLi9wYWdlL3Byb3h5XCI7XG5pbXBvcnQgeyBnZXRHcmlkSWQsIGdldExvZ2ljYWxTaXplLCBnZXRDdXJyZW50TW9kZSwgY29tcHV0ZUdyaWREaW1lbnNpb25zRm9yLCBnZXRHcmlkQ29vcmRpbmF0ZXMgfSBmcm9tIFwiLi9yZW5kZXJlclwiO1xuaW1wb3J0IHsgY29uZlJlYWR5LCBnZXRDb25mRm9yVXJsLCBnZXRHbG9iYWxDb25mIH0gZnJvbSBcIi4vdXRpbHMvY29uZmlndXJhdGlvblwiO1xuaW1wb3J0IHsgYWRkTW9kaWZpZXIsIG5vbkxpdGVyYWxLZXlzLCB0cmFuc2xhdGVLZXkgfSBmcm9tIFwiLi91dGlscy9rZXlzXCI7XG5pbXBvcnQgeyBpc0Nocm9tZSwgdG9GaWxlTmFtZSB9IGZyb20gXCIuL3V0aWxzL3V0aWxzXCI7XG5cbmNvbnN0IGZyYW1lSWRQcm9taXNlID0gYnJvd3NlclxuICAgIC5ydW50aW1lXG4gICAgLnNlbmRNZXNzYWdlKHsgZnVuY05hbWU6IFtcInB1Ymxpc2hGcmFtZUlkXCJdIH0pXG4gICAgLnRoZW4oKGY6IG51bWJlcikgPT4gKHdpbmRvdyBhcyBhbnkpLmZyYW1lSWQgPSBmKTtcbmNvbnN0IGluZm9Qcm9taXNlID0gZnJhbWVJZFByb21pc2UudGhlbigoKSA9PiBwYWdlLmdldEVkaXRvckluZm8oKSk7XG5jb25zdCBjb25uZWN0aW9uUHJvbWlzZSA9IGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7IGZ1bmNOYW1lOiBbXCJnZXROZW92aW1JbnN0YW5jZVwiXSB9KTtcblxuZXhwb3J0IGNvbnN0IGlzUmVhZHkgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgICAgICAgICAgY29uc3Qga2V5SGFuZGxlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwia2V5aGFuZGxlclwiKTtcbiAgICAgICAgICAgIGNvbnN0IFtbdXJsLCBzZWxlY3RvciwgY3Vyc29yLCBsYW5ndWFnZV0sIGNvbm5lY3Rpb25EYXRhXSA9XG4gICAgICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW2luZm9Qcm9taXNlLCBjb25uZWN0aW9uUHJvbWlzZV0pO1xuICAgICAgICAgICAgY29uc3QgbnZpbVByb21pc2UgPSBuZW92aW0oY2FudmFzLCBjb25uZWN0aW9uRGF0YSk7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50UHJvbWlzZSA9IHBhZ2UuZ2V0RWxlbWVudENvbnRlbnQoKTtcblxuICAgICAgICAgICAgY29uc3QgW2NvbHMsIHJvd3NdID0gZ2V0TG9naWNhbFNpemUoKTtcblxuICAgICAgICAgICAgY29uc3QgbnZpbSA9IGF3YWl0IG52aW1Qcm9taXNlO1xuXG4gICAgICAgICAgICAvLyBXZSBuZWVkIHRvIHNldCBjbGllbnQgaW5mbyBiZWZvcmUgcnVubmluZyB1aV9hdHRhY2ggYmVjYXVzZSB3ZSB3YW50IHRoaXNcbiAgICAgICAgICAgIC8vIGluZm8gdG8gYmUgYXZhaWxhYmxlIHdoZW4gVUlFbnRlciBpcyB0cmlnZ2VyZWRcbiAgICAgICAgICAgIGNvbnN0IGV4dEluZm8gPSBicm93c2VyLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKTtcbiAgICAgICAgICAgIGNvbnN0IFttYWpvciwgbWlub3IsIHBhdGNoXSA9IGV4dEluZm8udmVyc2lvbi5zcGxpdChcIi5cIik7XG4gICAgICAgICAgICBudmltLnNldF9jbGllbnRfaW5mbyhleHRJbmZvLm5hbWUsXG4gICAgICAgICAgICAgICAgeyBtYWpvciwgbWlub3IsIHBhdGNoIH0sXG4gICAgICAgICAgICAgICAgXCJ1aVwiLFxuICAgICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgYXdhaXQgY29uZlJlYWR5O1xuICAgICAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBnZXRHbG9iYWxDb25mKCk7XG4gICAgICAgICAgICBudmltLnVpX2F0dGFjaChjb2xzLCByb3dzLCB7XG4gICAgICAgICAgICAgICAgZXh0X2xpbmVncmlkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGV4dF9tZXNzYWdlczogZ2V0Q29uZkZvclVybCh1cmwpLmNtZGxpbmUgPT09IFwiZmlyZW52aW1cIixcbiAgICAgICAgICAgICAgICByZ2I6IHRydWUsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGV0IHJlc2l6ZVJlcUlkID0gMDtcbiAgICAgICAgICAgIGJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKHJlcXVlc3Q6IGFueSwgX3NlbmRlcjogYW55LCBfc2VuZFJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5mdW5jTmFtZVswXSA9PT0gXCJmcmFtZV9zZW5kS2V5XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbnZpbS5pbnB1dChyZXF1ZXN0LmFyZ3Muam9pbihcIlwiKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXF1ZXN0LmZ1bmNOYW1lWzBdID09PSBcInJlc2l6ZVwiICYmIHJlcXVlc3QuYXJnc1swXSA+IHJlc2l6ZVJlcUlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IFtpZCwgd2lkdGgsIGhlaWdodF0gPSByZXF1ZXN0LmFyZ3M7XG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZVJlcUlkID0gaWQ7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIG5lZWQgdG8gcHV0IHRoZSBrZXlIYW5kbGVyIGF0IHRoZSBvcmlnaW4gaW4gb3JkZXIgdG8gYXZvaWRcbiAgICAgICAgICAgICAgICAgICAgLy8gaXNzdWVzIHdoZW4gaXQgc2xpcHMgb3V0IG9mIHRoZSB2aWV3cG9ydFxuICAgICAgICAgICAgICAgICAgICBrZXlIYW5kbGVyLnN0eWxlLmxlZnQgPSBgMHB4YDtcbiAgICAgICAgICAgICAgICAgICAga2V5SGFuZGxlci5zdHlsZS50b3AgPSBgMHB4YDtcbiAgICAgICAgICAgICAgICAgICAgLy8gSXQncyB0ZW1wdGluZyB0byB0cnkgdG8gb3B0aW1pemUgdGhpcyBieSBvbmx5IGNhbGxpbmdcbiAgICAgICAgICAgICAgICAgICAgLy8gdWlfdHJ5X3Jlc2l6ZSB3aGVuIG5Db2xzIGlzIGRpZmZlcmVudCBmcm9tIGNvbHMgYW5kIG5Sb3dzIGlzXG4gICAgICAgICAgICAgICAgICAgIC8vIGRpZmZlcmVudCBmcm9tIHJvd3MgYnV0IHdlIGNhbid0IGJlY2F1c2UgcmVkcmF3IG5vdGlmaWNhdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgLy8gbWlnaHQgaGFwcGVuIHdpdGhvdXQgdXMgYWN0dWFsbHkgY2FsbGluZyB1aV90cnlfcmVzaXplIGFuZCB0aGVuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBzaXplcyB3b3VsZG4ndCBiZSBpbiBzeW5jIGFueW1vcmVcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgW25Db2xzLCBuUm93c10gPSBjb21wdXRlR3JpZERpbWVuc2lvbnNGb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCAqIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ICogd2luZG93LmRldmljZVBpeGVsUmF0aW9cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgbnZpbS51aV90cnlfcmVzaXplX2dyaWQoZ2V0R3JpZElkKCksIG5Db2xzLCBuUm93cyk7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2UucmVzaXplRWRpdG9yKE1hdGguZmxvb3Iod2lkdGggLyBuQ29scykgKiBuQ29scywgTWF0aC5mbG9vcihoZWlnaHQgLyBuUm93cykgKiBuUm93cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSBmaWxlLCBzZXQgaXRzIGNvbnRlbnQgdG8gdGhlIHRleHRhcmVhJ3MsIHdyaXRlIGl0XG4gICAgICAgICAgICBjb25zdCBmaWxlbmFtZSA9IHRvRmlsZU5hbWUodXJsLCBzZWxlY3RvciwgbGFuZ3VhZ2UpO1xuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IGNvbnRlbnRQcm9taXNlO1xuICAgICAgICAgICAgY29uc3QgW2xpbmUsIGNvbF0gPSBjdXJzb3I7XG4gICAgICAgICAgICBjb25zdCB3cml0ZUZpbGVQcm9taXNlID0gbnZpbS5jYWxsX2Z1bmN0aW9uKFwid3JpdGVmaWxlXCIsIFtjb250ZW50LnNwbGl0KFwiXFxuXCIpLCBmaWxlbmFtZV0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gbnZpbS5jb21tYW5kKGBub3N3YXBmaWxlIGVkaXQgJHtmaWxlbmFtZX0gYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIGB8IGNhbGwgbnZpbV93aW5fc2V0X2N1cnNvcigwLCBbJHtsaW5lfSwgJHtjb2x9XSlgKSk7XG5cbiAgICAgICAgICAgIC8vIENhbid0IGdldCBjb3ZlcmFnZSBmb3IgdGhpcyBhcyBicm93c2VycyBkb24ndCBsZXQgdXMgcmVsaWFibHlcbiAgICAgICAgICAgIC8vIHB1c2ggZGF0YSB0byB0aGUgc2VydmVyIG9uIGJlZm9yZXVubG9hZC5cbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbnZpbS51aV9kZXRhY2goKTtcbiAgICAgICAgICAgICAgICBudmltLmNvbW1hbmQoXCJxYWxsIVwiKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBLZWVwIHRyYWNrIG9mIGxhc3QgYWN0aXZlIGluc3RhbmNlIChuZWNlc3NhcnkgZm9yIGZpcmVudmltI2ZvY3VzX2lucHV0KCkgJiBvdGhlcnMpXG4gICAgICAgICAgICBjb25zdCBjaGFuID0gbnZpbS5nZXRfY3VycmVudF9jaGFubmVsKCk7XG4gICAgICAgICAgICBmdW5jdGlvbiBzZXRDdXJyZW50Q2hhbigpIHtcbiAgICAgICAgICAgICAgICBudmltLnNldF92YXIoXCJsYXN0X2ZvY3VzZWRfZmlyZW52aW1fY2hhbm5lbFwiLCBjaGFuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldEN1cnJlbnRDaGFuKCk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIHNldEN1cnJlbnRDaGFuKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2V0Q3VycmVudENoYW4pO1xuXG4gICAgICAgICAgICBjb25zdCBhdWdyb3VwTmFtZSA9IGBGaXJlbnZpbUF1Z3JvdXBDaGFuJHtjaGFufWA7XG4gICAgICAgICAgICAvLyBDbGVhbnVwIG1lYW5zOlxuICAgICAgICAgICAgLy8gLSBub3RpZnkgZnJvbnRlbmQgdGhhdCB3ZSdyZSBzaHV0dGluZyBkb3duXG4gICAgICAgICAgICAvLyAtIGRlbGV0ZSBmaWxlXG4gICAgICAgICAgICAvLyAtIHJlbW92ZSBvd24gYXVncm91cFxuICAgICAgICAgICAgY29uc3QgY2xlYW51cCA9IGBjYWxsIHJwY25vdGlmeSgke2NoYW59LCAnZmlyZW52aW1fdmltbGVhdmUnKSB8IGBcbiAgICAgICAgICAgICAgICAgICAgICAgICsgYGNhbGwgZGVsZXRlKCcke2ZpbGVuYW1lfScpYDtcbiAgICAgICAgICAgIC8vIEFzayBmb3Igbm90aWZpY2F0aW9ucyB3aGVuIHVzZXIgd3JpdGVzL2xlYXZlcyBmaXJlbnZpbVxuICAgICAgICAgICAgbnZpbS5jYWxsX2F0b21pYygoYGF1Z3JvdXAgJHthdWdyb3VwTmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdSFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvY21kIEJ1ZldyaXRlICR7ZmlsZW5hbWV9IGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBgY2FsbCBycGNub3RpZnkoJHtjaGFufSwgYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBgJ2ZpcmVudmltX2J1ZndyaXRlJywgYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBge2BcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIGAndGV4dCc6IG52aW1fYnVmX2dldF9saW5lcygwLCAwLCAtMSwgMCksYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgYCdjdXJzb3InOiBudmltX3dpbl9nZXRfY3Vyc29yKDApLGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgYH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXUgVmltTGVhdmUgKiAke2NsZWFudXB9XG4gICAgICAgICAgICAgICAgICAgICAgICBhdWdyb3VwIEVORGApLnNwbGl0KFwiXFxuXCIpLm1hcChjb21tYW5kID0+IFtcIm52aW1fY29tbWFuZFwiLCBbY29tbWFuZF1dKSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGlnbm9yZUtleXMgPSBzZXR0aW5ncy5pZ25vcmVLZXlzO1xuICAgICAgICAgICAga2V5SGFuZGxlci5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhIHdvcmthcm91bmQgZm9yIG9zeCB3aGVyZSBwcmVzc2luZyBub24tYWxwaGFudW1lcmljXG4gICAgICAgICAgICAgICAgLy8gY2hhcmFjdGVycyBsaWtlIFwiQFwiIHJlcXVpcmVzIHByZXNzaW5nIDxBLWE+LCB3aGljaCByZXN1bHRzXG4gICAgICAgICAgICAgICAgLy8gaW4gdGhlIGJyb3dzZXIgc2VuZGluZyBhbiA8QS1APiBldmVudCwgd2hpY2ggd2Ugd2FudCB0b1xuICAgICAgICAgICAgICAgIC8vIHRyZWF0IGFzIGEgcmVndWxhciBALlxuICAgICAgICAgICAgICAgIC8vIFNvIGlmIHdlJ3JlIHNlZWluZyBhbiBhbHQgb24gYSBub24tYWxwaGFudW1lcmljIGNoYXJhY3RlcixcbiAgICAgICAgICAgICAgICAvLyB3ZSBqdXN0IGlnbm9yZSBpdCBhbmQgbGV0IHRoZSBpbnB1dCBldmVudCBoYW5kbGVyIGRvIGl0c1xuICAgICAgICAgICAgICAgIC8vIG1hZ2ljLiBUaGlzIGNhbiBvbmx5IGJlIHRlc3RlZCBvbiBPU1gsIGFzIGdlbmVyYXRpbmcgYW5cbiAgICAgICAgICAgICAgICAvLyA8QS1APiBrZXlkb3duIGV2ZW50IHdpdGggc2VsZW5pdW0gd29uJ3QgcmVzdWx0IGluIGFuIGlucHV0XG4gICAgICAgICAgICAgICAgLy8gZXZlbnQuXG4gICAgICAgICAgICAgICAgLy8gU2luY2UgY292ZXJhZ2UgcmVwb3J0cyBhcmUgb25seSByZXRyaWV2ZWQgb24gbGludXgsIHdlIGRvbid0XG4gICAgICAgICAgICAgICAgLy8gaW5zdHJ1bWVudCB0aGlzIGNvbmRpdGlvbi5cbiAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgICAgICAgIGlmIChldnQuYWx0S2V5ICYmIHNldHRpbmdzLmFsdCA9PT0gXCJhbHBoYW51bVwiICYmICEvW2EtekEtWjAtOV0vLnRlc3QoZXZ0LmtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBOb3RlOiBvcmRlciBvZiB0aGlzIGFycmF5IGlzIGltcG9ydGFudCwgd2UgbmVlZCB0byBjaGVjayBPUyBiZWZvcmUgY2hlY2tpbmcgbWV0YVxuICAgICAgICAgICAgICAgIGNvbnN0IHNwZWNpYWxLZXlzID0gW1tcIkFsdFwiLCBcIkFcIl0sIFtcIkNvbnRyb2xcIiwgXCJDXCJdLCBbXCJPU1wiLCBcIkRcIl0sIFtcIk1ldGFcIiwgXCJEXCJdXTtcbiAgICAgICAgICAgICAgICAvLyBUaGUgZXZlbnQgaGFzIHRvIGJlIHRydXN0ZWQgYW5kIGVpdGhlciBoYXZlIGEgbW9kaWZpZXIgb3IgYSBub24tbGl0ZXJhbCByZXByZXNlbnRhdGlvblxuICAgICAgICAgICAgICAgIGlmIChldnQuaXNUcnVzdGVkXG4gICAgICAgICAgICAgICAgICAgICYmIChub25MaXRlcmFsS2V5c1tldnQua2V5XSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBzcGVjaWFsS2V5cy5maW5kKChbbW9kLCBfXTogW3N0cmluZywgc3RyaW5nXSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZ0LmtleSAhPT0gbW9kICYmIChldnQgYXMgYW55KS5nZXRNb2RpZmllclN0YXRlKG1vZCkpKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0gc3BlY2lhbEtleXMuY29uY2F0KFtbXCJTaGlmdFwiLCBcIlNcIl1dKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlZHVjZSgoa2V5OiBzdHJpbmcsIFthdHRyLCBtb2RdOiBbc3RyaW5nLCBzdHJpbmddKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChldnQgYXMgYW55KS5nZXRNb2RpZmllclN0YXRlKGF0dHIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhZGRNb2RpZmllcihtb2QsIGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB0cmFuc2xhdGVLZXkoZXZ0LmtleSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRNb2RlID0gZ2V0Q3VycmVudE1vZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGtleXMgOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaWdub3JlS2V5c1tjdXJyZW50TW9kZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5cyA9IGlnbm9yZUtleXNbY3VycmVudE1vZGVdLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlnbm9yZUtleXMuYWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXMucHVzaC5hcHBseShrZXlzLCBpZ25vcmVLZXlzLmFsbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFrZXlzLmluY2x1ZGVzKHRleHQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBudmltLmlucHV0KHRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBldnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gYWNjZXB0SW5wdXQgKGV2dDogYW55KSB7XG4gICAgICAgICAgICAgICAgbnZpbS5pbnB1dChldnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgZXZ0LnRhcmdldC5pbm5lclRleHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGV2dC50YXJnZXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAga2V5SGFuZGxlci5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGV2dDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV2dC5pc1RydXN0ZWQgJiYgIWV2dC5pc0NvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgICBhY2NlcHRJbnB1dChldnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gT24gRmlyZWZveCwgUGlueWluIGlucHV0IG1ldGhvZCBmb3IgYSBzaW5nbGUgY2hpbmVzZSBjaGFyYWN0ZXIgd2lsbFxuICAgICAgICAgICAgLy8gcmVzdWx0IGluIHRoZSBmb2xsb3dpbmcgc2VxdWVuY2Ugb2YgZXZlbnRzOlxuICAgICAgICAgICAgLy8gLSBjb21wb3NpdGlvbnN0YXJ0XG4gICAgICAgICAgICAvLyAtIGlucHV0IChjaGFyYWN0ZXIpXG4gICAgICAgICAgICAvLyAtIGNvbXBvc2l0aW9uZW5kXG4gICAgICAgICAgICAvLyAtIGlucHV0IChyZXN1bHQpXG4gICAgICAgICAgICAvLyBCdXQgb24gQ2hyb21lLCB3ZSdsbCBnZXQgdGhpcyBvcmRlcjpcbiAgICAgICAgICAgIC8vIC0gY29tcG9zaXRpb25zdGFydFxuICAgICAgICAgICAgLy8gLSBpbnB1dCAoY2hhcmFjdGVyKVxuICAgICAgICAgICAgLy8gLSBpbnB1dCAocmVzdWx0KVxuICAgICAgICAgICAgLy8gLSBjb21wb3NpdGlvbmVuZFxuICAgICAgICAgICAgLy8gU28gQ2hyb21lJ3MgaW5wdXQgZXZlbnQgd2lsbCBzdGlsbCBoYXZlIGl0cyBpc0NvbXBvc2luZyBmbGFnIHNldCB0b1xuICAgICAgICAgICAgLy8gdHJ1ZSEgVGhpcyBtZWFucyB0aGF0IHdlIG5lZWQgdG8gYWRkIGEgY2hyb21lLXNwZWNpZmljIGV2ZW50XG4gICAgICAgICAgICAvLyBsaXN0ZW5lciBvbiBjb21wb3NpdGlvbmVuZCB0byBkbyB3aGF0IGhhcHBlbnMgb24gaW5wdXQgZXZlbnRzIGZvclxuICAgICAgICAgICAgLy8gRmlyZWZveC5cbiAgICAgICAgICAgIC8vIERvbid0IGluc3RydW1lbnQgdGhpcyBicmFuY2ggYXMgY292ZXJhZ2UgaXMgb25seSBnZW5lcmF0ZWQgb25cbiAgICAgICAgICAgIC8vIEZpcmVmb3guXG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgICAgaWYgKGlzQ2hyb21lKCkpIHtcbiAgICAgICAgICAgICAgICBrZXlIYW5kbGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjb21wb3NpdGlvbmVuZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFjY2VwdElucHV0KGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgKGV2dDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGtleUhhbmRsZXIuc3R5bGUubGVmdCA9IGAke2V2dC5jbGllbnRYfXB4YDtcbiAgICAgICAgICAgICAgICBrZXlIYW5kbGVyLnN0eWxlLnRvcCA9IGAke2V2dC5jbGllbnRZfXB4YDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZnVuY3Rpb24gb25Nb3VzZShldnQ6IE1vdXNlRXZlbnQsIGFjdGlvbjogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgbGV0IGJ1dHRvbjtcbiAgICAgICAgICAgICAgICAvLyBTZWxlbml1bSBjYW4ndCBnZW5lcmF0ZSB3aGVlbCBldmVudHMgeWV0IDooXG4gICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICAgICAgICBpZiAoZXZ0IGluc3RhbmNlb2YgV2hlZWxFdmVudCkge1xuICAgICAgICAgICAgICAgICAgICBidXR0b24gPSBcIndoZWVsXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2VsZW5pdW0gY2FuJ3QgZ2VuZXJhdGUgbW91c2UgZXZlbnRzIHdpdGggbW9yZSBidXR0b25zIDooXG4gICAgICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICAgICAgICAgIGlmIChldnQuYnV0dG9uID4gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmVvdmltIGRvZXNuJ3QgaGFuZGxlIG90aGVyIG1vdXNlIGJ1dHRvbnMgZm9yIG5vd1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbiA9IFtcImxlZnRcIiwgXCJtaWRkbGVcIiwgXCJyaWdodFwiXVtldnQuYnV0dG9uXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXZ0LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbW9kaWZpZXJzID0gKGV2dC5hbHRLZXkgPyBcIkFcIiA6IFwiXCIpICtcbiAgICAgICAgICAgICAgICAgICAgKGV2dC5jdHJsS2V5ID8gXCJDXCIgOiBcIlwiKSArXG4gICAgICAgICAgICAgICAgICAgIChldnQubWV0YUtleSA/IFwiRFwiIDogXCJcIikgK1xuICAgICAgICAgICAgICAgICAgICAoZXZ0LnNoaWZ0S2V5ID8gXCJTXCIgOiBcIlwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBbeCwgeV0gPSBnZXRHcmlkQ29vcmRpbmF0ZXMoZXZ0LnBhZ2VYLCBldnQucGFnZVkpO1xuICAgICAgICAgICAgICAgIG52aW0uaW5wdXRfbW91c2UoYnV0dG9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0R3JpZElkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeCk7XG4gICAgICAgICAgICAgICAga2V5SGFuZGxlci5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZSA9PiB7XG4gICAgICAgICAgICAgICAgb25Nb3VzZShlLCBcInByZXNzXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgZSA9PiB7XG4gICAgICAgICAgICAgICAgb25Nb3VzZShlLCBcInJlbGVhc2VcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIFNlbGVuaXVtIGRvZXNuJ3QgbGV0IHlvdSBzaW11bGF0ZSBtb3VzZSB3aGVlbCBldmVudHMgOihcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIndoZWVsXCIsIGV2dCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGV2dC5kZWx0YVkpID49IE1hdGguYWJzKGV2dC5kZWx0YVgpKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uTW91c2UoZXZ0LCBldnQuZGVsdGFZIDwgMCA/IFwidXBcIiA6IFwiZG93blwiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvbk1vdXNlKGV2dCwgZXZ0LmRlbHRhWCA8IDAgPyBcInJpZ2h0XCIgOiBcImxlZnRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBMZXQgdXNlcnMga25vdyB3aGVuIHRoZXkgZm9jdXMvdW5mb2N1cyB0aGUgZnJhbWVcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gICAgICAgICAgICAgICAga2V5SGFuZGxlci5mb2N1cygpO1xuICAgICAgICAgICAgICAgIG52aW0uY29tbWFuZChcImRvYXV0b2NtZCBGb2N1c0dhaW5lZFwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IFwiMC41XCI7XG4gICAgICAgICAgICAgICAgbnZpbS5jb21tYW5kKFwiZG9hdXRvY21kIEZvY3VzTG9zdFwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAga2V5SGFuZGxlci5mb2N1cygpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAga2V5SGFuZGxlci5mb2N1cygpO1xuICAgICAgICAgICAgICAgIHdyaXRlRmlsZVByb21pc2UudGhlbigoKSA9PiByZXNvbHZlKHVuZGVmaW5lZCkpO1xuICAgICAgICAgICAgICAgIC8vIFRvIGhhcmQgdG8gdGVzdCAod2UnZCBuZWVkIHRvIGZpbmQgYSB3YXkgdG8gbWFrZSBuZW92aW0gZmFpbFxuICAgICAgICAgICAgICAgIC8vIHRvIHdyaXRlIHRoZSBmaWxlLCB3aGljaCByZXF1aXJlcyB0b28gbWFueSBvcy1kZXBlbmRlbnQgc2lkZVxuICAgICAgICAgICAgICAgIC8vIGVmZmVjdHMpLCBzbyBkb24ndCBpbnN0cnVtZW50LlxuICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICAgICAgd3JpdGVGaWxlUHJvbWlzZS5jYXRjaCgoKSA9PiByZWplY3QoKSk7XG4gICAgICAgICAgICB9LCAxMCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgICAgICBwYWdlLmtpbGxFZGl0b3IoKTtcbiAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=