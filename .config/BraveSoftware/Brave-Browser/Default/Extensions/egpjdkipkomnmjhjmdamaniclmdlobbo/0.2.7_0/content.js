/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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

/***/ "./src/FirenvimElement.ts":
/*!********************************!*\
  !*** ./src/FirenvimElement.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FirenvimElement": () => (/* binding */ FirenvimElement)
/* harmony export */ });
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/utils */ "./src/utils/utils.ts");
/* harmony import */ var _editors_editors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editors/editors */ "./src/editors/editors.ts");
/* provided dependency */ var browser = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");


class FirenvimElement {
    // editor is an object that provides an interface to interact (e.g.
    // retrieve/set content, retrieve/set cursor position) consistently with
    // underlying elements (be they simple textareas, CodeMirror elements or
    // other).
    editor;
    // focusInfo is used to keep track of focus listeners and timeouts created
    // by FirenvimElement.focus(). FirenvimElement.focus() creates these
    // listeners and timeouts in order to work around pages that try to grab
    // the focus again after the FirenvimElement has been created or after the
    // underlying element's content has changed.
    focusInfo = {
        finalRefocusTimeouts: [],
        refocusRefs: [],
        refocusTimeouts: [],
    };
    // frameId is the webextension id of the neovim frame. We use it to send
    // commands to the frame.
    frameId;
    // frameIdPromise is a promise that will resolve to the frameId. The
    // frameId can't be retrieved synchronously as it needs to be sent by the
    // background script.
    frameIdPromise;
    // iframe is the Neovim frame. This is the element that receives all inputs
    // and displays the editor.
    iframe;
    // We use an intersectionObserver to detect when the element the
    // FirenvimElement is tied becomes invisible. When this happens,
    // we hide the FirenvimElement from the page.
    intersectionObserver;
    // We use a mutation observer to detect whether the element is removed from
    // the page. When this happens, the FirenvimElement is removed from the
    // page.
    pageObserver;
    // We use a mutation observer to detect if the span is removed from the
    // page by the page. When this happens, the span is re-inserted in the
    // page.
    spanObserver;
    // nvimify is the function that listens for focus events and creates
    // firenvim elements. We need it in order to be able to remove it as an
    // event listener from the element the user selected when the user wants to
    // select that element again.
    nvimify;
    // originalElement is the element a focus event has been triggered on. We
    // use it to retrieve the element the editor should appear over (e.g., if
    // elem is an element inside a CodeMirror editor, elem will be a small
    // invisible textarea and what we really want to put the Firenvim element
    // over is the parent div that contains it) and to give focus back to the
    // page when the user asks for that.
    originalElement;
    // resizeObserver is used in order to detect when the size of the element
    // being edited changed. When this happens, we resize the neovim frame.
    // TODO: periodically check if MS implemented a ResizeObserver type
    resizeObserver;
    // span is the span element we use in order to insert the neovim frame in
    // the page. The neovim frame is attached to its shadow dom. Using a span
    // is much less disruptive to the page and enables a modicum of privacy
    // (the page won't be able to check what's in it). In firefox, pages will
    // still be able to detect the neovim frame by using window.frames though.
    span;
    // resizeReqId keeps track of the number of resizing requests that are sent
    // to the iframe. We send and increment it for every resize requests, this
    // lets the iframe know what the most recently sent resize request is and
    // thus avoids reacting to an older resize request if a more recent has
    // already been processed.
    resizeReqId = 0;
    // relativeX/Y is the position the iframe should have relative to the input
    // element in order to be both as close as possible to the input element
    // and fit in the window without overflowing out of the viewport.
    relativeX = 0;
    relativeY = 0;
    // firstPutEditorCloseToInputOrigin keeps track of whether this is the
    // first time the putEditorCloseToInputOrigin function is called from the
    // iframe. See putEditorCloseToInputOriginAfterResizeFromFrame() for more
    // information.
    firstPutEditorCloseToInputOrigin = true;
    // onDetach is a callback provided by the content script when it creates
    // the FirenvimElement. It is called when the detach() function is called,
    // after all Firenvim elements have been removed from the page.
    onDetach;
    // bufferInfo: a [url, selector, cursor, lang] tuple indicating the page
    // the last iframe was created on, the selector of the corresponding
    // textarea and the column/line number of the cursor.
    // Note that these are __default__ values. Real values must be created with
    // prepareBufferInfo(). The reason we're not doing this from the
    // constructor is that it's expensive and disruptive - getting this
    // information requires evaluating code in the page's context.
    bufferInfo = Promise.resolve(["", "", [1, 1], undefined]);
    // cursor: last known cursor position. Updated on getPageElementCursor and
    // setPageElementCursor
    cursor = [1, 1];
    // elem is the element that received the focusEvent.
    // Nvimify is the function that listens for focus events. We need to know
    // about it in order to remove it before focusing elem (otherwise we'll
    // just grab focus again).
    constructor(elem, listener, onDetach) {
        this.originalElement = elem;
        this.nvimify = listener;
        this.onDetach = onDetach;
        this.editor = (0,_editors_editors__WEBPACK_IMPORTED_MODULE_1__.getEditor)(elem);
        this.span = elem
            .ownerDocument
            .createElementNS("http://www.w3.org/1999/xhtml", "span");
        this.iframe = elem
            .ownerDocument
            .createElementNS("http://www.w3.org/1999/xhtml", "iframe");
        // Make sure there isn't any extra width/height
        this.iframe.style.padding = "0px";
        this.iframe.style.margin = "0px";
        this.iframe.style.border = "0px";
        // We still need a border, use a shadow for that
        this.iframe.style.boxShadow = "0px 0px 1px 1px black";
    }
    attachToPage(fip) {
        this.frameIdPromise = fip.then((f) => {
            this.frameId = f;
            // Once a frameId has been acquired, the FirenvimElement would die
            // if its span was removed from the page. Thus there is no use in
            // keeping its spanObserver around. It'd even cause issues as the
            // spanObserver would attempt to re-insert a dead frame in the
            // page.
            this.spanObserver.disconnect();
            return this.frameId;
        });
        // We don't need the iframe to be appended to the page in order to
        // resize it because we're just using the corresponding
        // input/textarea's size
        let rect = this.getElement().getBoundingClientRect();
        this.resizeTo(rect.width, rect.height, false);
        this.relativeX = 0;
        this.relativeY = 0;
        this.putEditorCloseToInputOrigin();
        // Use a ResizeObserver to detect when the underlying input element's
        // size changes and change the size of the FirenvimElement
        // accordingly
        this.resizeObserver = new (window.ResizeObserver)(((self) => async (entries) => {
            const entry = entries.find((ent) => ent.target === self.getElement());
            if (self.frameId === undefined) {
                await this.frameIdPromise;
            }
            if (entry) {
                const newRect = this.getElement().getBoundingClientRect();
                if (rect.width === newRect.width && rect.height === newRect.height) {
                    return;
                }
                rect = newRect;
                self.resizeTo(rect.width, rect.height, false);
                self.putEditorCloseToInputOrigin();
                self.resizeReqId += 1;
                browser.runtime.sendMessage({
                    args: {
                        frameId: self.frameId,
                        message: {
                            args: [self.resizeReqId, rect.width, rect.height],
                            funcName: ["resize"],
                        }
                    },
                    funcName: ["messageFrame"],
                });
            }
        })(this));
        this.resizeObserver.observe(this.getElement(), { box: "border-box" });
        this.iframe.src = browser.extension.getURL("/index.html");
        this.span.attachShadow({ mode: "closed" }).appendChild(this.iframe);
        // So pages (e.g. Jira, Confluence) remove spans from the page as soon
        // as they're inserted. We don't wan't that, so for the 5 seconds
        // following the insertion, detect if the span is removed from the page
        // by checking visibility changes and re-insert if needed.
        let reinserts = 0;
        this.spanObserver = new MutationObserver((self => (mutations, observer) => {
            const span = self.getSpan();
            for (const mutation of mutations) {
                for (const node of mutation.removedNodes) {
                    if (node === span) {
                        reinserts += 1;
                        if (reinserts >= 10) {
                            console.error("Firenvim is trying to create an iframe on this site but the page is constantly removing it. Consider disabling Firenvim on this website.");
                            observer.disconnect();
                        }
                        else {
                            setTimeout(() => self.getElement().ownerDocument.body.appendChild(span), reinserts * 100);
                        }
                        return;
                    }
                }
            }
        })(this));
        this.spanObserver.observe(this.getElement().ownerDocument.body, { childList: true });
        let parentElement = this.getElement().ownerDocument.body;
        // We can't insert the frame in the body if the element we're going to
        // replace the content of is the body, as replacing the content would
        // destroy the frame.
        if (parentElement === this.getElement()) {
            parentElement = parentElement.parentElement;
        }
        parentElement.appendChild(this.span);
        this.focus();
        // It is pretty hard to tell when an element disappears from the page
        // (either by being removed or by being hidden by other elements), so
        // we use an intersection observer, which is triggered every time the
        // element becomes more or less visible.
        this.intersectionObserver = new IntersectionObserver((self => () => {
            const elem = self.getElement();
            // If elem doesn't have a rect anymore, it's hidden
            if (elem.getClientRects().length === 0) {
                self.hide();
            }
            else {
                self.show();
            }
        })(this), { root: null, threshold: 0.1 });
        this.intersectionObserver.observe(this.getElement());
        // We want to remove the FirenvimElement from the page when the
        // corresponding element is removed. We do this by adding a
        // mutationObserver to its parent.
        this.pageObserver = new MutationObserver((self => (mutations) => {
            const elem = self.getElement();
            mutations.forEach(mutation => mutation.removedNodes.forEach(node => {
                const walker = document.createTreeWalker(node, NodeFilter.SHOW_ALL);
                while (walker.nextNode()) {
                    if (walker.currentNode === elem) {
                        setTimeout(() => self.detachFromPage());
                    }
                }
            }));
        })(this));
        this.pageObserver.observe(document.documentElement, {
            subtree: true,
            childList: true
        });
    }
    clearFocusListeners() {
        // When the user tries to `:w | call firenvim#focus_page()` in Neovim,
        // we have a problem. `:w` results in a call to setPageElementContent,
        // which calls FirenvimElement.focus(), because some pages try to grab
        // focus when the content of the underlying element changes.
        // FirenvimElement.focus() creates event listeners and timeouts to
        // detect when the page tries to grab focus and bring it back to the
        // FirenvimElement. But since `call firenvim#focus_page()` happens
        // right after the `:w`, focus_page() triggers the event
        // listeners/timeouts created by FirenvimElement.focus()!
        // So we need a way to clear the timeouts and event listeners before
        // performing focus_page, and that's what this function does.
        this.focusInfo.finalRefocusTimeouts.forEach(t => clearTimeout(t));
        this.focusInfo.refocusTimeouts.forEach(t => clearTimeout(t));
        this.focusInfo.refocusRefs.forEach(f => {
            this.iframe.removeEventListener("blur", f);
            this.getElement().removeEventListener("focus", f);
        });
        this.focusInfo.finalRefocusTimeouts.length = 0;
        this.focusInfo.refocusTimeouts.length = 0;
        this.focusInfo.refocusRefs.length = 0;
    }
    detachFromPage() {
        this.clearFocusListeners();
        const elem = this.getElement();
        this.resizeObserver.unobserve(elem);
        this.intersectionObserver.unobserve(elem);
        this.pageObserver.disconnect();
        this.spanObserver.disconnect();
        this.span.remove();
        this.onDetach(this.frameId);
    }
    focus() {
        // Some inputs try to grab the focus again after we appended the iframe
        // to the page, so we need to refocus it each time it loses focus. But
        // the user might want to stop focusing the iframe at some point, so we
        // actually stop refocusing the iframe a second after it is created.
        const refocus = ((self) => () => {
            self.focusInfo.refocusTimeouts.push(setTimeout(() => {
                // First, destroy current selection. Some websites use the
                // selection to force-focus an element.
                const sel = document.getSelection();
                sel.removeAllRanges();
                const range = document.createRange();
                // There's a race condition in the testsuite on chrome that
                // results in self.span not being in the document and errors
                // being logged, so we check if self.span really is in its
                // ownerDocument.
                if (self.span.ownerDocument.contains(self.span)) {
                    range.setStart(self.span, 0);
                }
                range.collapse(true);
                sel.addRange(range);
                self.iframe.focus();
            }, 0));
        })(this);
        this.focusInfo.refocusRefs.push(refocus);
        this.iframe.addEventListener("blur", refocus);
        this.getElement().addEventListener("focus", refocus);
        this.focusInfo.finalRefocusTimeouts.push(setTimeout(() => {
            refocus();
            this.iframe.removeEventListener("blur", refocus);
            this.getElement().removeEventListener("focus", refocus);
        }, 100));
        refocus();
    }
    focusOriginalElement(addListener) {
        document.activeElement.blur();
        this.originalElement.removeEventListener("focus", this.nvimify);
        const sel = document.getSelection();
        sel.removeAllRanges();
        const range = document.createRange();
        if (this.originalElement.ownerDocument.contains(this.originalElement)) {
            range.setStart(this.originalElement, 0);
        }
        range.collapse(true);
        this.originalElement.focus();
        sel.addRange(range);
        if (addListener) {
            this.originalElement.addEventListener("focus", this.nvimify);
        }
    }
    getBufferInfo() {
        return this.bufferInfo;
    }
    getEditor() {
        return this.editor;
    }
    getElement() {
        return this.editor.getElement();
    }
    getFrameId() {
        return this.frameId;
    }
    getIframe() {
        return this.iframe;
    }
    getPageElementContent() {
        return this.getEditor().getContent();
    }
    getPageElementCursor() {
        const p = this.editor.getCursor().catch(() => [1, 1]);
        p.then(c => this.cursor = c);
        return p;
    }
    getSelector() {
        return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.computeSelector)(this.getElement());
    }
    getSpan() {
        return this.span;
    }
    hide() {
        this.iframe.style.display = "none";
    }
    isFocused() {
        return document.activeElement === this.span
            || document.activeElement === this.iframe;
    }
    prepareBufferInfo() {
        this.bufferInfo = (async () => [
            document.location.href,
            this.getSelector(),
            await this.getPageElementCursor(),
            await (this.editor.getLanguage().catch(() => undefined))
        ])();
    }
    pressKeys(keys) {
        const focused = this.isFocused();
        keys.forEach(ev => this.originalElement.dispatchEvent(ev));
        if (focused) {
            this.focus();
        }
    }
    putEditorCloseToInputOrigin() {
        const rect = this.editor.getElement().getBoundingClientRect();
        // Save attributes
        const posAttrs = ["left", "position", "top", "zIndex"];
        const oldPosAttrs = posAttrs.map((attr) => this.iframe.style[attr]);
        // Assign new values
        this.iframe.style.left = `${rect.left + window.scrollX + this.relativeX}px`;
        this.iframe.style.position = "absolute";
        this.iframe.style.top = `${rect.top + window.scrollY + this.relativeY}px`;
        // 2139999995 is hopefully higher than everything else on the page but
        // lower than Vimium's elements
        this.iframe.style.zIndex = "2139999995";
        // Compare, to know whether the element moved or not
        const posChanged = !!posAttrs.find((attr, index) => this.iframe.style[attr] !== oldPosAttrs[index]);
        return { posChanged, newRect: rect };
    }
    putEditorCloseToInputOriginAfterResizeFromFrame() {
        // This is a very weird, complicated and bad piece of code. All calls
        // to `resizeEditor()` have to result in a call to `resizeTo()` and
        // then `putEditorCloseToInputOrigin()` in order to make sure the
        // iframe doesn't overflow from the viewport.
        // However, when we create the iframe, we don't want it to fit in the
        // viewport at all cost. Instead, we want it to cover the underlying
        // input as much as possible. The problem is that when it is created,
        // the iframe will ask for a resize (because Neovim asks for one) and
        // will thus also accidentally call putEditorCloseToInputOrigin, which
        // we don't want to call.
        // So we have to track the calls to putEditorCloseToInputOrigin that
        // are made from the iframe (i.e. from `resizeEditor()`) and ignore the
        // first one.
        if (this.firstPutEditorCloseToInputOrigin) {
            this.relativeX = 0;
            this.relativeY = 0;
            this.firstPutEditorCloseToInputOrigin = false;
            return;
        }
        return this.putEditorCloseToInputOrigin();
    }
    // Resize the iframe, making sure it doesn't get larger than the window
    resizeTo(width, height, warnIframe) {
        // If the dimensions that are asked for are too big, make them as big
        // as the window
        let cantFullyResize = false;
        let availableWidth = window.innerWidth;
        if (availableWidth > document.documentElement.clientWidth) {
            availableWidth = document.documentElement.clientWidth;
        }
        if (width >= availableWidth) {
            width = availableWidth - 1;
            cantFullyResize = true;
        }
        let availableHeight = window.innerHeight;
        if (availableHeight > document.documentElement.clientHeight) {
            availableHeight = document.documentElement.clientHeight;
        }
        if (height >= availableHeight) {
            height = availableHeight - 1;
            cantFullyResize = true;
        }
        // The dimensions that were asked for might make the iframe overflow.
        // In this case, we need to compute how much we need to move the iframe
        // to the left/top in order to have it bottom-right corner sit right in
        // the window's bottom-right corner.
        const rect = this.editor.getElement().getBoundingClientRect();
        const rightOverflow = availableWidth - (rect.left + width);
        this.relativeX = rightOverflow < 0 ? rightOverflow : 0;
        const bottomOverflow = availableHeight - (rect.top + height);
        this.relativeY = bottomOverflow < 0 ? bottomOverflow : 0;
        // Now actually set the width/height, move the editor where it is
        // supposed to be and if the new iframe can't be as big as requested,
        // warn the iframe script.
        this.iframe.style.width = `${width}px`;
        this.iframe.style.height = `${height}px`;
        if (cantFullyResize && warnIframe) {
            this.resizeReqId += 1;
            browser.runtime.sendMessage({
                args: {
                    frameId: this.frameId,
                    message: {
                        args: [this.resizeReqId, width, height],
                        funcName: ["resize"],
                    }
                },
                funcName: ["messageFrame"],
            });
        }
    }
    sendKey(key) {
        return browser.runtime.sendMessage({
            args: {
                frameId: this.frameId,
                message: {
                    args: [key],
                    funcName: ["frame_sendKey"],
                }
            },
            funcName: ["messageFrame"],
        });
    }
    setPageElementContent(text) {
        const focused = this.isFocused();
        this.editor.setContent(text);
        [
            new Event("keydown", { bubbles: true }),
            new Event("keyup", { bubbles: true }),
            new Event("keypress", { bubbles: true }),
            new Event("beforeinput", { bubbles: true }),
            new Event("input", { bubbles: true }),
            new Event("change", { bubbles: true })
        ].forEach(ev => this.originalElement.dispatchEvent(ev));
        if (focused) {
            this.focus();
        }
    }
    setPageElementCursor(line, column) {
        let p = Promise.resolve();
        this.cursor[0] = line;
        this.cursor[1] = column;
        if (this.isFocused()) {
            p = this.editor.setCursor(line, column);
        }
        return p;
    }
    show() {
        this.iframe.style.display = "initial";
    }
}


/***/ }),

/***/ "./src/autofill.ts":
/*!*************************!*\
  !*** ./src/autofill.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "autofill": () => (/* binding */ autofill)
/* harmony export */ });
/* provided dependency */ var browser = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");
async function autofill() {
    const platInfoPromise = browser.runtime.sendMessage({
        args: {
            args: [],
            funcName: ["browser", "runtime", "getPlatformInfo"],
        },
        funcName: ["exec"],
    });
    const manifestPromise = browser.runtime.sendMessage({
        args: {
            args: [],
            funcName: ["browser", "runtime", "getManifest"],
        },
        funcName: ["exec"],
    });
    const nvimPluginPromise = browser.runtime.sendMessage({
        args: {},
        funcName: ["getNvimPluginVersion"],
    });
    const issueTemplatePromise = fetch(browser.runtime.getURL("ISSUE_TEMPLATE.md")).then(p => p.text());
    const browserString = navigator.userAgent.match(/(firefox|chrom)[^ ]+/gi);
    let name = "";
    let version = "";
    if (browserString) {
        [name, version] = browserString[0].split("/");
    }
    const vendor = navigator.vendor || "";
    const textarea = document.getElementById("issue_body");
    const [platInfo, manifest, nvimPluginVersion, issueTemplate,] = await Promise.all([platInfoPromise, manifestPromise, nvimPluginPromise, issueTemplatePromise]);
    // Can't happen, but doesn't cost much to handle!
    /* istanbul ignore next */
    if (!textarea || textarea.value.replace(/\r/g, "") !== issueTemplate.replace(/\r/g, "")) {
        return;
    }
    textarea.value = issueTemplate
        .replace("OS Version:", `OS Version: ${platInfo.os} ${platInfo.arch}`)
        .replace("Browser Version:", `Browser Version: ${vendor} ${name} ${version}`)
        .replace("Browser Addon Version:", `Browser Addon Version: ${manifest.version}`)
        .replace("Neovim Plugin Version:", `Neovim Plugin Version: ${nvimPluginVersion}`);
}


/***/ }),

/***/ "./src/common.ts":
/*!***********************!*\
  !*** ./src/common.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "firenvimGlobal": () => (/* binding */ firenvimGlobal),
/* harmony export */   "frameFunctions": () => (/* binding */ frameFunctions),
/* harmony export */   "activeFunctions": () => (/* binding */ activeFunctions),
/* harmony export */   "tabFunctions": () => (/* binding */ tabFunctions)
/* harmony export */ });
/* harmony import */ var _utils_configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/configuration */ "./src/utils/configuration.ts");
/* harmony import */ var _page_functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page/functions */ "./src/page/functions.ts");
/* harmony import */ var _FirenvimElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FirenvimElement */ "./src/FirenvimElement.ts");
/* provided dependency */ var browser = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");



// Promise used to implement a locking mechanism preventing concurrent creation
// of neovim frames
let frameIdLock = Promise.resolve();
const firenvimGlobal = {
    // Whether Firenvim is disabled in this tab
    disabled: browser.runtime.sendMessage({
        args: ["disabled"],
        funcName: ["getTabValue"],
    })
        // Note: this relies on setDisabled existing in the object returned by
        // getFunctions and attached to the window object
        .then((disabled) => window.setDisabled(disabled)),
    // Promise-resolution function called when a frameId is received from the
    // background script
    frameIdResolve: (_) => undefined,
    // lastFocusedContentScript keeps track of the last content frame that has
    // been focused. This is necessary in pages that contain multiple frames
    // (and thus multiple content scripts): for example, if users press the
    // global keyboard shortcut <C-n>, the background script sends a "global"
    // message to all of the active tab's content scripts. For a content script
    // to know if it should react to a global message, it just needs to check
    // if it is the last active content script.
    lastFocusedContentScript: 0,
    // nvimify: triggered when an element is focused, takes care of creating
    // the editor iframe, appending it to the page and focusing it.
    nvimify: async (evt) => {
        if (firenvimGlobal.disabled instanceof Promise) {
            await firenvimGlobal.disabled;
        }
        // When creating new frames, we need to know their frameId in order to
        // communicate with them. This can't be retrieved through a
        // synchronous, in-page call so the new frame has to tell the
        // background script to send its frame id to the page. Problem is, if
        // multiple frames are created in a very short amount of time, we
        // aren't guaranteed to receive these frameIds in the order in which
        // the frames were created. So we have to implement a locking mechanism
        // to make sure that we don't create new frames until we received the
        // frameId of the previously created frame.
        let lock;
        while (lock !== frameIdLock) {
            lock = frameIdLock;
            await frameIdLock;
        }
        frameIdLock = new Promise(async (unlock) => {
            // auto is true when nvimify() is called as an event listener, false
            // when called from forceNvimify()
            const auto = (evt instanceof FocusEvent);
            const takeover = (0,_utils_configuration__WEBPACK_IMPORTED_MODULE_0__.getConf)().takeover;
            if (firenvimGlobal.disabled || (auto && takeover === "never")) {
                unlock();
                return;
            }
            const firenvim = new _FirenvimElement__WEBPACK_IMPORTED_MODULE_2__.FirenvimElement(evt.target, firenvimGlobal.nvimify, (id) => firenvimGlobal.firenvimElems.delete(id));
            const editor = firenvim.getEditor();
            // If this element already has a neovim frame, stop
            const alreadyRunning = Array.from(firenvimGlobal.firenvimElems.values())
                .find((instance) => instance.getElement() === editor.getElement());
            if (alreadyRunning !== undefined) {
                // The span might have been removed from the page by the page
                // (this happens on Jira/Confluence for example) so we check
                // for that.
                const span = alreadyRunning.getSpan();
                if (span.ownerDocument.contains(span)) {
                    alreadyRunning.show();
                    alreadyRunning.focus();
                    unlock();
                    return;
                }
                else {
                    // If the span has been removed from the page, the editor
                    // is dead because removing an iframe from the page kills
                    // the websocket connection inside of it.
                    // We just tell the editor to clean itself up and go on as
                    // if it didn't exist.
                    alreadyRunning.detachFromPage();
                }
            }
            if (auto && (takeover === "empty" || takeover === "nonempty")) {
                const content = (await editor.getContent()).trim();
                if ((content !== "" && takeover === "empty")
                    || (content === "" && takeover === "nonempty")) {
                    unlock();
                    return;
                }
            }
            firenvim.prepareBufferInfo();
            const frameIdPromise = new Promise((resolve, reject) => {
                firenvimGlobal.frameIdResolve = resolve;
                // TODO: make this timeout the same as the one in background.ts
                setTimeout(reject, 10000);
            });
            frameIdPromise.then((frameId) => {
                firenvimGlobal.firenvimElems.set(frameId, firenvim);
                firenvimGlobal.frameIdResolve = () => undefined;
                unlock();
            });
            frameIdPromise.catch(unlock);
            firenvim.attachToPage(frameIdPromise);
        });
    },
    // fienvimElems maps frame ids to firenvim elements.
    firenvimElems: new Map(),
};
const ownFrameId = browser.runtime.sendMessage({ args: [], funcName: ["getOwnFrameId"] });
async function announceFocus() {
    const frameId = await ownFrameId;
    firenvimGlobal.lastFocusedContentScript = frameId;
    browser.runtime.sendMessage({
        args: {
            args: [frameId],
            funcName: ["setLastFocusedContentScript"]
        },
        funcName: ["messagePage"]
    });
}
// When the frame is created, we might receive focus, check for that
ownFrameId.then(_ => {
    if (document.hasFocus()) {
        announceFocus();
    }
});
async function addFocusListener() {
    window.removeEventListener("focus", announceFocus);
    window.addEventListener("focus", announceFocus);
}
addFocusListener();
// We need to use setInterval to periodically re-add the focus listeners as in
// frames the document could get deleted and re-created without our knowledge.
const intervalId = setInterval(addFocusListener, 100);
// But we don't want to syphon the user's battery so we stop checking after a second
setTimeout(() => clearInterval(intervalId), 1000);
const frameFunctions = (0,_page_functions__WEBPACK_IMPORTED_MODULE_1__.getNeovimFrameFunctions)(firenvimGlobal);
const activeFunctions = (0,_page_functions__WEBPACK_IMPORTED_MODULE_1__.getActiveContentFunctions)(firenvimGlobal);
const tabFunctions = (0,_page_functions__WEBPACK_IMPORTED_MODULE_1__.getTabFunctions)(firenvimGlobal);
Object.assign(window, frameFunctions, activeFunctions, tabFunctions);
browser.runtime.onMessage.addListener(async (request) => {
    // All content scripts must react to tab functions
    let fn = request.funcName.reduce((acc, cur) => acc[cur], tabFunctions);
    if (fn !== undefined) {
        return fn(...request.args);
    }
    // The only content script that should react to activeFunctions is the active one
    fn = request.funcName.reduce((acc, cur) => acc[cur], activeFunctions);
    if (fn !== undefined) {
        if (firenvimGlobal.lastFocusedContentScript === await ownFrameId) {
            return fn(...request.args);
        }
        return new Promise(() => undefined);
    }
    // The only content script that should react to frameFunctions is the one
    // that owns the frame that sent the request
    fn = request.funcName.reduce((acc, cur) => acc[cur], frameFunctions);
    if (fn !== undefined) {
        if (firenvimGlobal.firenvimElems.get(request.args[0]) !== undefined) {
            return fn(...request.args);
        }
        return new Promise(() => undefined);
    }
    throw new Error(`Error: unhandled content request: ${JSON.stringify(request)}.`);
});


/***/ }),

/***/ "./src/editors/AbstractEditor.ts":
/*!***************************************!*\
  !*** ./src/editors/AbstractEditor.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractEditor": () => (/* binding */ AbstractEditor)
/* harmony export */ });
class AbstractEditor {
}


/***/ }),

/***/ "./src/editors/AceEditor.ts":
/*!**********************************!*\
  !*** ./src/editors/AceEditor.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AceEditor": () => (/* binding */ AceEditor)
/* harmony export */ });
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.ts");
/* harmony import */ var _AbstractEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractEditor */ "./src/editors/AbstractEditor.ts");


class AceEditor extends _AbstractEditor__WEBPACK_IMPORTED_MODULE_1__.AbstractEditor {
    static matches(e) {
        let parent = e;
        for (let i = 0; i < 3; ++i) {
            if (parent !== undefined && parent !== null) {
                if ((/ace_editor/gi).test(parent.className)) {
                    return true;
                }
                parent = parent.parentElement;
            }
        }
        return false;
    }
    elem;
    constructor(e) {
        super();
        this.elem = e;
        // Get the topmost ace element
        let parent = this.elem.parentElement;
        while (AceEditor.matches(parent)) {
            this.elem = parent;
            parent = parent.parentElement;
        }
    }
    // This function will be stringified and inserted in page context so we
    // can't instrument it.
    /* istanbul ignore next */
    getAce = (selec) => {
        const elem = document.querySelector(selec);
        const win_ace = window.ace;
        if (win_ace !== undefined) {
            return win_ace.edit(elem);
        }
        else if (Object.prototype.hasOwnProperty.call(elem, 'aceEditor')) {
            return elem.aceEditor;
        }
        else {
            throw new Error("Couldn't find AceEditor instance");
        }
    };
    getContent() {
        return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.executeInPage)(`(${ /* istanbul ignore next */(getAce, selec) => {
            return getAce(selec).getValue();
        }})(${this.getAce}, ${JSON.stringify((0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.computeSelector)(this.elem))})`);
    }
    getCursor() {
        return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.executeInPage)(`(${ /* istanbul ignore next */(getAce, selec) => {
            let position;
            const ace = getAce(selec);
            if (ace.getCursorPosition !== undefined) {
                position = ace.getCursorPosition();
            }
            else {
                position = ace.selection.cursor;
            }
            return [position.row + 1, position.column];
        }})(${this.getAce}, ${JSON.stringify((0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.computeSelector)(this.elem))})`);
    }
    getElement() {
        return this.elem;
    }
    getLanguage() {
        return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.executeInPage)(`(${ /* istanbul ignore next */(getAce, selec) => {
            const ace = getAce(selec);
            return ace.session.$modeId.split("/").slice(-1)[0];
        }})(${this.getAce}, ${JSON.stringify((0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.computeSelector)(this.elem))})`);
    }
    setContent(text) {
        return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.executeInPage)(`(${ /* istanbul ignore next */(getAce, selec, str) => {
            return getAce(selec).setValue(str, 1);
        }})(${this.getAce}, ${JSON.stringify((0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.computeSelector)(this.elem))}, ${JSON.stringify(text)})`);
    }
    setCursor(line, column) {
        return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.executeInPage)(`(${ /* istanbul ignore next */(getAce, selec, l, c) => {
            const selection = getAce(selec).getSelection();
            return selection.moveCursorTo(l - 1, c, false);
        }})(${this.getAce}, ${JSON.stringify((0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.computeSelector)(this.elem))}, ${line}, ${column})`);
    }
}


/***/ }),

/***/ "./src/editors/CodeMirrorEditor.ts":
/*!*****************************************!*\
  !*** ./src/editors/CodeMirrorEditor.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CodeMirrorEditor": () => (/* binding */ CodeMirrorEditor)
/* harmony export */ });
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.ts");
/* harmony import */ var _AbstractEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractEditor */ "./src/editors/AbstractEditor.ts");


class CodeMirrorEditor extends _AbstractEditor__WEBPACK_IMPORTED_MODULE_1__.AbstractEditor {
    static matches(e) {
        let parent = e;
        for (let i = 0; i < 3; ++i) {
            if (parent !== undefined && parent !== null) {
                if ((/^(.* )?CodeMirror/gi).test(parent.className)) {
                    return true;
                }
                parent = parent.parentElement;
            }
        }
        return false;
    }
    elem;
    constructor(e) {
        super();
        this.elem = e;
        // Get the topmost ace element
        let parent = this.elem.parentElement;
        while (CodeMirrorEditor.matches(parent)) {
            this.elem = parent;
            parent = parent.parentElement;
        }
    }
    getContent() {
        return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.executeInPage)(`(${ /* istanbul ignore next */(selec) => {
            const elem = document.querySelector(selec);
            return elem.CodeMirror.getValue();
        }})(${JSON.stringify((0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.computeSelector)(this.elem))})`);
    }
    getCursor() {
        return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.executeInPage)(`(${ /* istanbul ignore next */(selec) => {
            const elem = document.querySelector(selec);
            const position = elem.CodeMirror.getCursor();
            return [position.line + 1, position.ch];
        }})(${JSON.stringify((0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.computeSelector)(this.elem))})`);
    }
    getElement() {
        return this.elem;
    }
    getLanguage() {
        return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.executeInPage)(`(${ /* istanbul ignore next */(selec) => {
            const elem = document.querySelector(selec);
            return elem.CodeMirror.getMode().name;
        }})(${JSON.stringify((0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.computeSelector)(this.elem))})`);
    }
    setContent(text) {
        return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.executeInPage)(`(${ /* istanbul ignore next */(selec, str) => {
            const elem = document.querySelector(selec);
            return elem.CodeMirror.setValue(str);
        }})(${JSON.stringify((0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.computeSelector)(this.elem))}, ${JSON.stringify(text)})`);
    }
    setCursor(line, column) {
        return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.executeInPage)(`(${ /* istanbul ignore next */(selec, l, c) => {
            const elem = document.querySelector(selec);
            return elem.CodeMirror.getCursor(l - 1, c);
        }})(${JSON.stringify((0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.computeSelector)(this.elem))}, ${line}, ${column})`);
    }
}


/***/ }),

/***/ "./src/editors/MonacoEditor.ts":
/*!*************************************!*\
  !*** ./src/editors/MonacoEditor.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MonacoEditor": () => (/* binding */ MonacoEditor)
/* harmony export */ });
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.ts");
/* harmony import */ var _AbstractEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractEditor */ "./src/editors/AbstractEditor.ts");


class MonacoEditor extends _AbstractEditor__WEBPACK_IMPORTED_MODULE_1__.AbstractEditor {
    static matches(e) {
        let parent = e;
        for (let i = 0; i < 4; ++i) {
            if (parent !== undefined && parent !== null) {
                if ((/monaco-editor/gi).test(parent.className)) {
                    return true;
                }
                parent = parent.parentElement;
            }
        }
        return false;
    }
    elem;
    constructor(e) {
        super();
        this.elem = e;
        // Find the monaco element that holds the data
        let parent = this.elem.parentElement;
        while (!(this.elem.className.match(/monaco-editor/gi)
            && this.elem.getAttribute("data-uri").match("inmemory://|gitlab:"))) {
            this.elem = parent;
            parent = parent.parentElement;
        }
    }
    getContent() {
        return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.executeInPage)(`(${ /* istanbul ignore next */(selec) => {
            const elem = document.querySelector(selec);
            const uri = elem.getAttribute("data-uri");
            const model = window.monaco.editor.getModel(uri);
            return model.getValue();
        }})(${JSON.stringify((0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.computeSelector)(this.elem))})`);
    }
    // It's impossible to get Monaco's cursor position:
    // https://github.com/Microsoft/monaco-editor/issues/258
    getCursor() {
        return Promise.resolve([1, 0]);
    }
    getElement() {
        return this.elem;
    }
    getLanguage() {
        return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.executeInPage)(`(${ /* istanbul ignore next */(selec) => {
            const elem = document.querySelector(selec);
            const uri = elem.getAttribute("data-uri");
            const model = window.monaco.editor.getModel(uri);
            return model.getModeId();
        }})(${JSON.stringify((0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.computeSelector)(this.elem))})`);
    }
    setContent(text) {
        return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.executeInPage)(`(${ /* istanbul ignore next */(selec, str) => {
            const elem = document.querySelector(selec);
            const uri = elem.getAttribute("data-uri");
            const model = window.monaco.editor.getModel(uri);
            return model.setValue(str);
        }})(${JSON.stringify((0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.computeSelector)(this.elem))}, ${JSON.stringify(text)})`);
    }
    // It's impossible to set Monaco's cursor position:
    // https://github.com/Microsoft/monaco-editor/issues/258
    setCursor(_line, _column) {
        return Promise.resolve();
    }
}


/***/ }),

/***/ "./src/editors/TextareaEditor.ts":
/*!***************************************!*\
  !*** ./src/editors/TextareaEditor.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextareaEditor": () => (/* binding */ TextareaEditor)
/* harmony export */ });
/* harmony import */ var _AbstractEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractEditor */ "./src/editors/AbstractEditor.ts");
/* harmony import */ var _utils_configuration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/configuration */ "./src/utils/configuration.ts");


// TextareaEditor sort of works for contentEditable elements but there should
// really be a contenteditable-specific editor.
class TextareaEditor extends _AbstractEditor__WEBPACK_IMPORTED_MODULE_0__.AbstractEditor {
    elem;
    constructor(e) {
        super();
        this.elem = e;
    }
    getContent() {
        if (this.elem.value !== undefined) {
            return Promise.resolve(this.elem.value);
        }
        if ((0,_utils_configuration__WEBPACK_IMPORTED_MODULE_1__.getConf)().content === "text") {
            return Promise.resolve(this.elem.innerText);
        }
        else {
            return Promise.resolve(this.elem.innerHTML);
        }
    }
    getCursor() {
        return this.getContent().then(text => {
            let line = 1;
            let column = 0;
            const selectionStart = this.elem.selectionStart !== undefined
                ? this.elem.selectionStart
                : 0;
            // Sift through the text, counting columns and new lines
            for (let cursor = 0; cursor < selectionStart; ++cursor) {
                column += text.charCodeAt(cursor) < 0x7F ? 1 : 2;
                if (text[cursor] === "\n") {
                    line += 1;
                    column = 0;
                }
            }
            return [line, column];
        });
    }
    getElement() {
        return this.elem;
    }
    getLanguage() {
        if ((0,_utils_configuration__WEBPACK_IMPORTED_MODULE_1__.getConf)().content === "text") {
            return Promise.resolve(undefined);
        }
        return Promise.resolve('html');
    }
    setContent(text) {
        if (this.elem.value !== undefined) {
            this.elem.value = text;
        }
        else {
            if ((0,_utils_configuration__WEBPACK_IMPORTED_MODULE_1__.getConf)().content === "text") {
                this.elem.innerText = text;
            }
            else {
                this.elem.innerHTML = text;
            }
        }
        return Promise.resolve();
    }
    setCursor(line, column) {
        return this.getContent().then(text => {
            let character = 0;
            // Try to find the line the cursor should be put on
            while (line > 1 && character < text.length) {
                if (text[character] === "\n") {
                    line -= 1;
                }
                character += 1;
            }
            // Try to find the character after which the cursor should be moved
            // Note: we don't do column = columnn + character because column
            // might be larger than actual line length and it's better to be on
            // the right line but on the wrong column than on the wrong line
            // and wrong column.
            // Moreover, column is a number of UTF-8 bytes from the beginning
            // of the line to the cursor. However, javascript uses UTF-16,
            // which is 2 bytes per non-ascii character. So when we find a
            // character that is more than 1 byte long, we have to remove that
            // amount from column, but only two characters from CHARACTER!
            while (column > 0 && character < text.length) {
                // Can't happen, but better be safe than sorry
                /* istanbul ignore next */
                if (text[character] === "\n") {
                    break;
                }
                const code = text.charCodeAt(character);
                if (code <= 0x7f) {
                    column -= 1;
                }
                else if (code <= 0x7ff) {
                    column -= 2;
                }
                else if (code >= 0xd800 && code <= 0xdfff) {
                    column -= 4;
                    character++;
                }
                else if (code < 0xffff) {
                    column -= 3;
                }
                else {
                    column -= 4;
                }
                character += 1;
            }
            if (this.elem.setSelectionRange !== undefined) {
                this.elem.setSelectionRange(character, character);
            }
        });
    }
}


/***/ }),

/***/ "./src/editors/editors.ts":
/*!********************************!*\
  !*** ./src/editors/editors.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getEditor": () => (/* binding */ getEditor)
/* harmony export */ });
/* harmony import */ var _AceEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AceEditor */ "./src/editors/AceEditor.ts");
/* harmony import */ var _CodeMirrorEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CodeMirrorEditor */ "./src/editors/CodeMirrorEditor.ts");
/* harmony import */ var _MonacoEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MonacoEditor */ "./src/editors/MonacoEditor.ts");
/* harmony import */ var _TextareaEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TextareaEditor */ "./src/editors/TextareaEditor.ts");




function getEditor(elem) {
    switch (true) {
        case _AceEditor__WEBPACK_IMPORTED_MODULE_0__.AceEditor.matches(elem): return new _AceEditor__WEBPACK_IMPORTED_MODULE_0__.AceEditor(elem);
        case _CodeMirrorEditor__WEBPACK_IMPORTED_MODULE_1__.CodeMirrorEditor.matches(elem): return new _CodeMirrorEditor__WEBPACK_IMPORTED_MODULE_1__.CodeMirrorEditor(elem);
        case _MonacoEditor__WEBPACK_IMPORTED_MODULE_2__.MonacoEditor.matches(elem): return new _MonacoEditor__WEBPACK_IMPORTED_MODULE_2__.MonacoEditor(elem);
        default: return new _TextareaEditor__WEBPACK_IMPORTED_MODULE_3__.TextareaEditor(elem);
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
/*!************************!*\
  !*** ./src/content.ts ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "listenersSetup": () => (/* binding */ listenersSetup)
/* harmony export */ });
/* harmony import */ var _autofill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./autofill */ "./src/autofill.ts");
/* harmony import */ var _utils_configuration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/configuration */ "./src/utils/configuration.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common */ "./src/common.ts");



if (document.location.href === "https://github.com/glacambre/firenvim/issues/new"
    || document.location.protocol === "file:" && document.location.href.endsWith("github.html")) {
    addEventListener("load", _autofill__WEBPACK_IMPORTED_MODULE_0__.autofill);
}
function setupListeners(selector) {
    function onScroll(cont) {
        window.requestAnimationFrame(() => {
            const posChanged = Array.from(_common__WEBPACK_IMPORTED_MODULE_2__.firenvimGlobal.firenvimElems.entries())
                .map(([_, elem]) => elem.putEditorCloseToInputOrigin())
                .find(changed => changed.posChanged);
            if (posChanged) {
                // As long as one editor changes position, try to resize
                onScroll(true);
            }
            else if (cont) {
                // No editor has moved, but this might be because the website
                // implements some kind of smooth scrolling that doesn't make
                // the textarea move immediately. In order to deal with these
                // cases, schedule a last redraw in a few milliseconds
                setTimeout(() => onScroll(false), 100);
            }
        });
    }
    function doScroll() {
        return onScroll(true);
    }
    window.addEventListener("scroll", doScroll);
    window.addEventListener("wheel", doScroll);
    (new (window.ResizeObserver)((_) => {
        onScroll(true);
    })).observe(document.documentElement);
    function addNvimListener(elem) {
        elem.removeEventListener("focus", _common__WEBPACK_IMPORTED_MODULE_2__.firenvimGlobal.nvimify);
        elem.addEventListener("focus", _common__WEBPACK_IMPORTED_MODULE_2__.firenvimGlobal.nvimify);
        let parent = elem.parentElement;
        while (parent) {
            parent.removeEventListener("scroll", doScroll);
            parent.addEventListener("scroll", doScroll);
            parent = parent.parentElement;
        }
    }
    (new MutationObserver((changes, _) => {
        if (changes.filter(change => change.addedNodes.length > 0).length <= 0) {
            return;
        }
        // This mutation observer is triggered every time an element is
        // added/removed from the page. When this happens, try to apply
        // listeners again, in case a new textarea/input field has been added.
        const toPossiblyNvimify = Array.from(document.querySelectorAll(selector));
        toPossiblyNvimify.forEach(elem => addNvimListener(elem));
        const takeover = (0,_utils_configuration__WEBPACK_IMPORTED_MODULE_1__.getConf)().takeover;
        function shouldNvimify(node) {
            // Ideally, the takeover !== "never" check shouldn't be performed
            // here: it should live in nvimify(). However, nvimify() only
            // checks for takeover === "never" if it is called from an event
            // handler (this is necessary in order to allow manually nvimifying
            // elements). Thus, we need to check if takeover !== "never" here
            // too.
            return takeover !== "never"
                && document.activeElement === node
                && toPossiblyNvimify.includes(node);
        }
        // We also need to check if the currently focused element is among the
        // newly created elements and if it is, nvimify it.
        // Note that we can't do this unconditionally: we would turn the active
        // element into a neovim frame even for unrelated dom changes.
        for (const mr of changes) {
            for (const node of mr.addedNodes) {
                if (shouldNvimify(node)) {
                    _common__WEBPACK_IMPORTED_MODULE_2__.activeFunctions.forceNvimify();
                    return;
                }
                const walker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT);
                while (walker.nextNode()) {
                    if (shouldNvimify(walker.currentNode)) {
                        _common__WEBPACK_IMPORTED_MODULE_2__.activeFunctions.forceNvimify();
                        return;
                    }
                }
            }
        }
    })).observe(window.document, { subtree: true, childList: true });
    let elements;
    try {
        elements = Array.from(document.querySelectorAll(selector));
    }
    catch {
        alert(`Firenvim error: invalid CSS selector (${selector}) in your g:firenvim_config.`);
        elements = [];
    }
    elements.forEach(elem => addNvimListener(elem));
}
const listenersSetup = new Promise(resolve => {
    _utils_configuration__WEBPACK_IMPORTED_MODULE_1__.confReady.then(() => {
        const conf = (0,_utils_configuration__WEBPACK_IMPORTED_MODULE_1__.getConf)();
        if (conf.selector !== undefined && conf.selector !== "") {
            setupListeners(conf.selector);
        }
        resolve(undefined);
    });
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9GaXJlbnZpbS8uL25vZGVfbW9kdWxlcy93ZWJleHRlbnNpb24tcG9seWZpbGwvZGlzdC9icm93c2VyLXBvbHlmaWxsLmpzIiwid2VicGFjazovL0ZpcmVudmltLy4vc3JjL0ZpcmVudmltRWxlbWVudC50cyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL3NyYy9hdXRvZmlsbC50cyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL3NyYy9jb21tb24udHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvZWRpdG9ycy9BYnN0cmFjdEVkaXRvci50cyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL3NyYy9lZGl0b3JzL0FjZUVkaXRvci50cyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL3NyYy9lZGl0b3JzL0NvZGVNaXJyb3JFZGl0b3IudHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvZWRpdG9ycy9Nb25hY29FZGl0b3IudHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvZWRpdG9ycy9UZXh0YXJlYUVkaXRvci50cyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL3NyYy9lZGl0b3JzL2VkaXRvcnMudHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvcGFnZS9mdW5jdGlvbnMudHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvdXRpbHMvY29uZmlndXJhdGlvbi50cyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL3NyYy91dGlscy9rZXlzLnRzIiwid2VicGFjazovL0ZpcmVudmltLy4vc3JjL3V0aWxzL3V0aWxzLnRzIiwid2VicGFjazovL0ZpcmVudmltL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0ZpcmVudmltL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9GaXJlbnZpbS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0ZpcmVudmltL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0FBRUEsT0FBTzs7QUFFUDtBQUNBLE1BQU0sSUFBMEM7QUFDaEQsSUFBSSxpQ0FBZ0MsQ0FBQyxNQUFRLENBQUMsb0NBQUUsT0FBTztBQUFBO0FBQUE7QUFBQSxrR0FBQztBQUN4RCxHQUFHLE1BQU0sWUFRTjtBQUNILENBQUM7QUFDRDs7QUFFQSxxQ0FBcUM7O0FBRXJDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWEsT0FBTywwQ0FBMEMsT0FBTztBQUNyRTtBQUNBLHVTQUF1UztBQUN2UztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFFakUsSUFBSSxRQUF1QixDQUFDO0lBQzVCLElBQUk7UUFDQSxRQUFRLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztLQUM5RDtJQUFDLE1BQU07UUFDSixLQUFLLENBQUMseUNBQXlDLFFBQVEsOEJBQThCLENBQUMsQ0FBQztRQUN2RixRQUFRLEdBQUcsRUFBRSxDQUFDO0tBQ2pCO0lBQ0QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3BELENBQUM7QUFFTSxNQUFNLGNBQWMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUNoRCxnRUFBYyxDQUFDLEdBQUcsRUFBRTtRQUNoQixNQUFNLElBQUksR0FBeUIsNkRBQU8sRUFBRSxDQUFDO1FBQzdDLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxFQUFFLEVBQUU7WUFDckQsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNqQztRQUNELE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImNvbnRlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqIElNUE9SVFMgRlJPTSBpbXBvcnRzLWxvYWRlciAqKiovXG5cbmJyb3dzZXIgPSB1bmRlZmluZWQ7XG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiLCBbXCJtb2R1bGVcIl0sIGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgZmFjdG9yeShtb2R1bGUpO1xuICB9IGVsc2Uge1xuICAgIHZhciBtb2QgPSB7XG4gICAgICBleHBvcnRzOiB7fVxuICAgIH07XG4gICAgZmFjdG9yeShtb2QpO1xuICAgIGdsb2JhbC5icm93c2VyID0gbW9kLmV4cG9ydHM7XG4gIH1cbn0pKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsVGhpcyA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgLyogd2ViZXh0ZW5zaW9uLXBvbHlmaWxsIC0gdjAuOC4wIC0gVHVlIEFwciAyMCAyMDIxIDExOjI3OjM4ICovXG5cbiAgLyogLSotIE1vZGU6IGluZGVudC10YWJzLW1vZGU6IG5pbDsganMtaW5kZW50LWxldmVsOiAyIC0qLSAqL1xuXG4gIC8qIHZpbTogc2V0IHN0cz0yIHN3PTIgZXQgdHc9ODA6ICovXG5cbiAgLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICAgKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gICAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGlmICh0eXBlb2YgYnJvd3NlciA9PT0gXCJ1bmRlZmluZWRcIiB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoYnJvd3NlcikgIT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgICBjb25zdCBDSFJPTUVfU0VORF9NRVNTQUdFX0NBTExCQUNLX05PX1JFU1BPTlNFX01FU1NBR0UgPSBcIlRoZSBtZXNzYWdlIHBvcnQgY2xvc2VkIGJlZm9yZSBhIHJlc3BvbnNlIHdhcyByZWNlaXZlZC5cIjtcbiAgICBjb25zdCBTRU5EX1JFU1BPTlNFX0RFUFJFQ0FUSU9OX1dBUk5JTkcgPSBcIlJldHVybmluZyBhIFByb21pc2UgaXMgdGhlIHByZWZlcnJlZCB3YXkgdG8gc2VuZCBhIHJlcGx5IGZyb20gYW4gb25NZXNzYWdlL29uTWVzc2FnZUV4dGVybmFsIGxpc3RlbmVyLCBhcyB0aGUgc2VuZFJlc3BvbnNlIHdpbGwgYmUgcmVtb3ZlZCBmcm9tIHRoZSBzcGVjcyAoU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RvY3MvTW96aWxsYS9BZGQtb25zL1dlYkV4dGVuc2lvbnMvQVBJL3J1bnRpbWUvb25NZXNzYWdlKVwiOyAvLyBXcmFwcGluZyB0aGUgYnVsayBvZiB0aGlzIHBvbHlmaWxsIGluIGEgb25lLXRpbWUtdXNlIGZ1bmN0aW9uIGlzIGEgbWlub3JcbiAgICAvLyBvcHRpbWl6YXRpb24gZm9yIEZpcmVmb3guIFNpbmNlIFNwaWRlcm1vbmtleSBkb2VzIG5vdCBmdWxseSBwYXJzZSB0aGVcbiAgICAvLyBjb250ZW50cyBvZiBhIGZ1bmN0aW9uIHVudGlsIHRoZSBmaXJzdCB0aW1lIGl0J3MgY2FsbGVkLCBhbmQgc2luY2UgaXQgd2lsbFxuICAgIC8vIG5ldmVyIGFjdHVhbGx5IG5lZWQgdG8gYmUgY2FsbGVkLCB0aGlzIGFsbG93cyB0aGUgcG9seWZpbGwgdG8gYmUgaW5jbHVkZWRcbiAgICAvLyBpbiBGaXJlZm94IG5lYXJseSBmb3IgZnJlZS5cblxuICAgIGNvbnN0IHdyYXBBUElzID0gZXh0ZW5zaW9uQVBJcyA9PiB7XG4gICAgICAvLyBOT1RFOiBhcGlNZXRhZGF0YSBpcyBhc3NvY2lhdGVkIHRvIHRoZSBjb250ZW50IG9mIHRoZSBhcGktbWV0YWRhdGEuanNvbiBmaWxlXG4gICAgICAvLyBhdCBidWlsZCB0aW1lIGJ5IHJlcGxhY2luZyB0aGUgZm9sbG93aW5nIFwiaW5jbHVkZVwiIHdpdGggdGhlIGNvbnRlbnQgb2YgdGhlXG4gICAgICAvLyBKU09OIGZpbGUuXG4gICAgICBjb25zdCBhcGlNZXRhZGF0YSA9IHtcbiAgICAgICAgXCJhbGFybXNcIjoge1xuICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGVhckFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImJvb2ttYXJrc1wiOiB7XG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDaGlsZHJlblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFJlY2VudFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFN1YlRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRUcmVlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwibW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJicm93c2VyQWN0aW9uXCI6IHtcbiAgICAgICAgICBcImRpc2FibGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJlbmFibGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRCYWRnZUJhY2tncm91bmRDb2xvclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEJhZGdlVGV4dFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJvcGVuUG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRCYWRnZUJhY2tncm91bmRDb2xvclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEJhZGdlVGV4dFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEljb25cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRQb3B1cFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFRpdGxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYnJvd3NpbmdEYXRhXCI6IHtcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUNhY2hlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlQ29va2llc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZURvd25sb2Fkc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUZvcm1EYXRhXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlSGlzdG9yeVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUxvY2FsU3RvcmFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVBhc3N3b3Jkc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVBsdWdpbkRhdGFcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXR0aW5nc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvbW1hbmRzXCI6IHtcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvbnRleHRNZW51c1wiOiB7XG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJjb29raWVzXCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbENvb2tpZVN0b3Jlc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImRldnRvb2xzXCI6IHtcbiAgICAgICAgICBcImluc3BlY3RlZFdpbmRvd1wiOiB7XG4gICAgICAgICAgICBcImV2YWxcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDIsXG4gICAgICAgICAgICAgIFwic2luZ2xlQ2FsbGJhY2tBcmdcIjogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicGFuZWxzXCI6IHtcbiAgICAgICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDMsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAzLFxuICAgICAgICAgICAgICBcInNpbmdsZUNhbGxiYWNrQXJnXCI6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImVsZW1lbnRzXCI6IHtcbiAgICAgICAgICAgICAgXCJjcmVhdGVTaWRlYmFyUGFuZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJkb3dubG9hZHNcIjoge1xuICAgICAgICAgIFwiY2FuY2VsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZG93bmxvYWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJlcmFzZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEZpbGVJY29uXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwib3BlblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInBhdXNlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlRmlsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlc3VtZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNob3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJleHRlbnNpb25cIjoge1xuICAgICAgICAgIFwiaXNBbGxvd2VkRmlsZVNjaGVtZUFjY2Vzc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImlzQWxsb3dlZEluY29nbml0b0FjY2Vzc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImhpc3RvcnlcIjoge1xuICAgICAgICAgIFwiYWRkVXJsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGVsZXRlQWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGVsZXRlUmFuZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZWxldGVVcmxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRWaXNpdHNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpMThuXCI6IHtcbiAgICAgICAgICBcImRldGVjdExhbmd1YWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWNjZXB0TGFuZ3VhZ2VzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiaWRlbnRpdHlcIjoge1xuICAgICAgICAgIFwibGF1bmNoV2ViQXV0aEZsb3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpZGxlXCI6IHtcbiAgICAgICAgICBcInF1ZXJ5U3RhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJtYW5hZ2VtZW50XCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFNlbGZcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRFbmFibGVkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidW5pbnN0YWxsU2VsZlwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm5vdGlmaWNhdGlvbnNcIjoge1xuICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRQZXJtaXNzaW9uTGV2ZWxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJwYWdlQWN0aW9uXCI6IHtcbiAgICAgICAgICBcImdldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJoaWRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0SWNvblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzaG93XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicGVybWlzc2lvbnNcIjoge1xuICAgICAgICAgIFwiY29udGFpbnNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXF1ZXN0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicnVudGltZVwiOiB7XG4gICAgICAgICAgXCJnZXRCYWNrZ3JvdW5kUGFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBsYXRmb3JtSW5mb1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm9wZW5PcHRpb25zUGFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlcXVlc3RVcGRhdGVDaGVja1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlbmRNZXNzYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDNcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VuZE5hdGl2ZU1lc3NhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRVbmluc3RhbGxVUkxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXNzaW9uc1wiOiB7XG4gICAgICAgICAgXCJnZXREZXZpY2VzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UmVjZW50bHlDbG9zZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXN0b3JlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwic3RvcmFnZVwiOiB7XG4gICAgICAgICAgXCJsb2NhbFwiOiB7XG4gICAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm1hbmFnZWRcIjoge1xuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3luY1wiOiB7XG4gICAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInRhYnNcIjoge1xuICAgICAgICAgIFwiY2FwdHVyZVZpc2libGVUYWJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZXRlY3RMYW5ndWFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRpc2NhcmRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkdXBsaWNhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJleGVjdXRlU2NyaXB0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Q3VycmVudFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFpvb21cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRab29tU2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnb0JhY2tcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnb0ZvcndhcmRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJoaWdobGlnaHRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJpbnNlcnRDU1NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicXVlcnlcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZWxvYWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVDU1NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZW5kTWVzc2FnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFpvb21cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRab29tU2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ0b3BTaXRlc1wiOiB7XG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ3ZWJOYXZpZ2F0aW9uXCI6IHtcbiAgICAgICAgICBcImdldEFsbEZyYW1lc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEZyYW1lXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwid2ViUmVxdWVzdFwiOiB7XG4gICAgICAgICAgXCJoYW5kbGVyQmVoYXZpb3JDaGFuZ2VkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwid2luZG93c1wiOiB7XG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDdXJyZW50XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0TGFzdEZvY3VzZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaWYgKE9iamVjdC5rZXlzKGFwaU1ldGFkYXRhKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXBpLW1ldGFkYXRhLmpzb24gaGFzIG5vdCBiZWVuIGluY2x1ZGVkIGluIGJyb3dzZXItcG9seWZpbGxcIik7XG4gICAgICB9XG4gICAgICAvKipcbiAgICAgICAqIEEgV2Vha01hcCBzdWJjbGFzcyB3aGljaCBjcmVhdGVzIGFuZCBzdG9yZXMgYSB2YWx1ZSBmb3IgYW55IGtleSB3aGljaCBkb2VzXG4gICAgICAgKiBub3QgZXhpc3Qgd2hlbiBhY2Nlc3NlZCwgYnV0IGJlaGF2ZXMgZXhhY3RseSBhcyBhbiBvcmRpbmFyeSBXZWFrTWFwXG4gICAgICAgKiBvdGhlcndpc2UuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY3JlYXRlSXRlbVxuICAgICAgICogICAgICAgIEEgZnVuY3Rpb24gd2hpY2ggd2lsbCBiZSBjYWxsZWQgaW4gb3JkZXIgdG8gY3JlYXRlIHRoZSB2YWx1ZSBmb3IgYW55XG4gICAgICAgKiAgICAgICAga2V5IHdoaWNoIGRvZXMgbm90IGV4aXN0LCB0aGUgZmlyc3QgdGltZSBpdCBpcyBhY2Nlc3NlZC4gVGhlXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gcmVjZWl2ZXMsIGFzIGl0cyBvbmx5IGFyZ3VtZW50LCB0aGUga2V5IGJlaW5nIGNyZWF0ZWQuXG4gICAgICAgKi9cblxuXG4gICAgICBjbGFzcyBEZWZhdWx0V2Vha01hcCBleHRlbmRzIFdlYWtNYXAge1xuICAgICAgICBjb25zdHJ1Y3RvcihjcmVhdGVJdGVtLCBpdGVtcyA9IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHN1cGVyKGl0ZW1zKTtcbiAgICAgICAgICB0aGlzLmNyZWF0ZUl0ZW0gPSBjcmVhdGVJdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0KGtleSkge1xuICAgICAgICAgIGlmICghdGhpcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoa2V5LCB0aGlzLmNyZWF0ZUl0ZW0oa2V5KSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHN1cGVyLmdldChrZXkpO1xuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBvYmplY3QgaXMgYW4gb2JqZWN0IHdpdGggYSBgdGhlbmAgbWV0aG9kLCBhbmQgY2FuXG4gICAgICAgKiB0aGVyZWZvcmUgYmUgYXNzdW1lZCB0byBiZWhhdmUgYXMgYSBQcm9taXNlLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdGhlbmFibGUuXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCBpc1RoZW5hYmxlID0gdmFsdWUgPT4ge1xuICAgICAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSBcImZ1bmN0aW9uXCI7XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgZnVuY3Rpb24gd2hpY2gsIHdoZW4gY2FsbGVkLCB3aWxsIHJlc29sdmUgb3IgcmVqZWN0XG4gICAgICAgKiB0aGUgZ2l2ZW4gcHJvbWlzZSBiYXNlZCBvbiBob3cgaXQgaXMgY2FsbGVkOlxuICAgICAgICpcbiAgICAgICAqIC0gSWYsIHdoZW4gY2FsbGVkLCBgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yYCBjb250YWlucyBhIG5vbi1udWxsIG9iamVjdCxcbiAgICAgICAqICAgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQgd2l0aCB0aGF0IHZhbHVlLlxuICAgICAgICogLSBJZiB0aGUgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGggZXhhY3RseSBvbmUgYXJndW1lbnQsIHRoZSBwcm9taXNlIGlzXG4gICAgICAgKiAgIHJlc29sdmVkIHRvIHRoYXQgdmFsdWUuXG4gICAgICAgKiAtIE90aGVyd2lzZSwgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgdG8gYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlXG4gICAgICAgKiAgIGZ1bmN0aW9uJ3MgYXJndW1lbnRzLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9taXNlXG4gICAgICAgKiAgICAgICAgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHJlc29sdXRpb24gYW5kIHJlamVjdGlvbiBmdW5jdGlvbnMgb2YgYVxuICAgICAgICogICAgICAgIHByb21pc2UuXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9taXNlLnJlc29sdmVcbiAgICAgICAqICAgICAgICBUaGUgcHJvbWlzZSdzIHJlc29sdXRpb24gZnVuY3Rpb24uXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9taXNlLnJlamVjdFxuICAgICAgICogICAgICAgIFRoZSBwcm9taXNlJ3MgcmVqZWN0aW9uIGZ1bmN0aW9uLlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IG1ldGFkYXRhXG4gICAgICAgKiAgICAgICAgTWV0YWRhdGEgYWJvdXQgdGhlIHdyYXBwZWQgbWV0aG9kIHdoaWNoIGhhcyBjcmVhdGVkIHRoZSBjYWxsYmFjay5cbiAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWV0YWRhdGEuc2luZ2xlQ2FsbGJhY2tBcmdcbiAgICAgICAqICAgICAgICBXaGV0aGVyIG9yIG5vdCB0aGUgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIG9ubHkgdGhlIGZpcnN0XG4gICAgICAgKiAgICAgICAgYXJndW1lbnQgb2YgdGhlIGNhbGxiYWNrLCBhbHRlcm5hdGl2ZWx5IGFuIGFycmF5IG9mIGFsbCB0aGVcbiAgICAgICAqICAgICAgICBjYWxsYmFjayBhcmd1bWVudHMgaXMgcmVzb2x2ZWQuIEJ5IGRlZmF1bHQsIGlmIHRoZSBjYWxsYmFja1xuICAgICAgICogICAgICAgIGZ1bmN0aW9uIGlzIGludm9rZWQgd2l0aCBvbmx5IGEgc2luZ2xlIGFyZ3VtZW50LCB0aGF0IHdpbGwgYmVcbiAgICAgICAqICAgICAgICByZXNvbHZlZCB0byB0aGUgcHJvbWlzZSwgd2hpbGUgYWxsIGFyZ3VtZW50cyB3aWxsIGJlIHJlc29sdmVkIGFzXG4gICAgICAgKiAgICAgICAgYW4gYXJyYXkgaWYgbXVsdGlwbGUgYXJlIGdpdmVuLlxuICAgICAgICpcbiAgICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAgICAgICAqICAgICAgICBUaGUgZ2VuZXJhdGVkIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICAgICovXG5cblxuICAgICAgY29uc3QgbWFrZUNhbGxiYWNrID0gKHByb21pc2UsIG1ldGFkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiAoLi4uY2FsbGJhY2tBcmdzKSA9PiB7XG4gICAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICAgIHByb21pc2UucmVqZWN0KG5ldyBFcnJvcihleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhLnNpbmdsZUNhbGxiYWNrQXJnIHx8IGNhbGxiYWNrQXJncy5sZW5ndGggPD0gMSAmJiBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHByb21pc2UucmVzb2x2ZShjYWxsYmFja0FyZ3NbMF0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9taXNlLnJlc29sdmUoY2FsbGJhY2tBcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBwbHVyYWxpemVBcmd1bWVudHMgPSBudW1BcmdzID0+IG51bUFyZ3MgPT0gMSA/IFwiYXJndW1lbnRcIiA6IFwiYXJndW1lbnRzXCI7XG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYSB3cmFwcGVyIGZ1bmN0aW9uIGZvciBhIG1ldGhvZCB3aXRoIHRoZSBnaXZlbiBuYW1lIGFuZCBtZXRhZGF0YS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAgICogICAgICAgIFRoZSBuYW1lIG9mIHRoZSBtZXRob2Qgd2hpY2ggaXMgYmVpbmcgd3JhcHBlZC5cbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtZXRhZGF0YVxuICAgICAgICogICAgICAgIE1ldGFkYXRhIGFib3V0IHRoZSBtZXRob2QgYmVpbmcgd3JhcHBlZC5cbiAgICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gbWV0YWRhdGEubWluQXJnc1xuICAgICAgICogICAgICAgIFRoZSBtaW5pbXVtIG51bWJlciBvZiBhcmd1bWVudHMgd2hpY2ggbXVzdCBiZSBwYXNzZWQgdG8gdGhlXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24uIElmIGNhbGxlZCB3aXRoIGZld2VyIHRoYW4gdGhpcyBudW1iZXIgb2YgYXJndW1lbnRzLCB0aGVcbiAgICAgICAqICAgICAgICB3cmFwcGVyIHdpbGwgcmFpc2UgYW4gZXhjZXB0aW9uLlxuICAgICAgICogQHBhcmFtIHtpbnRlZ2VyfSBtZXRhZGF0YS5tYXhBcmdzXG4gICAgICAgKiAgICAgICAgVGhlIG1heGltdW0gbnVtYmVyIG9mIGFyZ3VtZW50cyB3aGljaCBtYXkgYmUgcGFzc2VkIHRvIHRoZVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uLiBJZiBjYWxsZWQgd2l0aCBtb3JlIHRoYW4gdGhpcyBudW1iZXIgb2YgYXJndW1lbnRzLCB0aGVcbiAgICAgICAqICAgICAgICB3cmFwcGVyIHdpbGwgcmFpc2UgYW4gZXhjZXB0aW9uLlxuICAgICAgICogQHBhcmFtIHtib29sZWFufSBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZ1xuICAgICAgICogICAgICAgIFdoZXRoZXIgb3Igbm90IHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggb25seSB0aGUgZmlyc3RcbiAgICAgICAqICAgICAgICBhcmd1bWVudCBvZiB0aGUgY2FsbGJhY2ssIGFsdGVybmF0aXZlbHkgYW4gYXJyYXkgb2YgYWxsIHRoZVxuICAgICAgICogICAgICAgIGNhbGxiYWNrIGFyZ3VtZW50cyBpcyByZXNvbHZlZC4gQnkgZGVmYXVsdCwgaWYgdGhlIGNhbGxiYWNrXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gaXMgaW52b2tlZCB3aXRoIG9ubHkgYSBzaW5nbGUgYXJndW1lbnQsIHRoYXQgd2lsbCBiZVxuICAgICAgICogICAgICAgIHJlc29sdmVkIHRvIHRoZSBwcm9taXNlLCB3aGlsZSBhbGwgYXJndW1lbnRzIHdpbGwgYmUgcmVzb2x2ZWQgYXNcbiAgICAgICAqICAgICAgICBhbiBhcnJheSBpZiBtdWx0aXBsZSBhcmUgZ2l2ZW4uXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge2Z1bmN0aW9uKG9iamVjdCwgLi4uKil9XG4gICAgICAgKiAgICAgICBUaGUgZ2VuZXJhdGVkIHdyYXBwZXIgZnVuY3Rpb24uXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCB3cmFwQXN5bmNGdW5jdGlvbiA9IChuYW1lLCBtZXRhZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gYXN5bmNGdW5jdGlvbldyYXBwZXIodGFyZ2V0LCAuLi5hcmdzKSB7XG4gICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoIDwgbWV0YWRhdGEubWluQXJncykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBsZWFzdCAke21ldGFkYXRhLm1pbkFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1pbkFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPiBtZXRhZGF0YS5tYXhBcmdzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IG1vc3QgJHttZXRhZGF0YS5tYXhBcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5tYXhBcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YS5mYWxsYmFja1RvTm9DYWxsYmFjaykge1xuICAgICAgICAgICAgICAvLyBUaGlzIEFQSSBtZXRob2QgaGFzIGN1cnJlbnRseSBubyBjYWxsYmFjayBvbiBDaHJvbWUsIGJ1dCBpdCByZXR1cm4gYSBwcm9taXNlIG9uIEZpcmVmb3gsXG4gICAgICAgICAgICAgIC8vIGFuZCBzbyB0aGUgcG9seWZpbGwgd2lsbCB0cnkgdG8gY2FsbCBpdCB3aXRoIGEgY2FsbGJhY2sgZmlyc3QsIGFuZCBpdCB3aWxsIGZhbGxiYWNrXG4gICAgICAgICAgICAgIC8vIHRvIG5vdCBwYXNzaW5nIHRoZSBjYWxsYmFjayBpZiB0aGUgZmlyc3QgY2FsbCBmYWlscy5cbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncywgbWFrZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICAgICAgICByZWplY3RcbiAgICAgICAgICAgICAgICB9LCBtZXRhZGF0YSkpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChjYkVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGAke25hbWV9IEFQSSBtZXRob2QgZG9lc24ndCBzZWVtIHRvIHN1cHBvcnQgdGhlIGNhbGxiYWNrIHBhcmFtZXRlciwgYCArIFwiZmFsbGluZyBiYWNrIHRvIGNhbGwgaXQgd2l0aG91dCBhIGNhbGxiYWNrOiBcIiwgY2JFcnJvcik7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MpOyAvLyBVcGRhdGUgdGhlIEFQSSBtZXRob2QgbWV0YWRhdGEsIHNvIHRoYXQgdGhlIG5leHQgQVBJIGNhbGxzIHdpbGwgbm90IHRyeSB0b1xuICAgICAgICAgICAgICAgIC8vIHVzZSB0aGUgdW5zdXBwb3J0ZWQgY2FsbGJhY2sgYW55bW9yZS5cblxuICAgICAgICAgICAgICAgIG1ldGFkYXRhLmZhbGxiYWNrVG9Ob0NhbGxiYWNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbWV0YWRhdGEubm9DYWxsYmFjayA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhLm5vQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MpO1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncywgbWFrZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgICB9LCBtZXRhZGF0YSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogV3JhcHMgYW4gZXhpc3RpbmcgbWV0aG9kIG9mIHRoZSB0YXJnZXQgb2JqZWN0LCBzbyB0aGF0IGNhbGxzIHRvIGl0IGFyZVxuICAgICAgICogaW50ZXJjZXB0ZWQgYnkgdGhlIGdpdmVuIHdyYXBwZXIgZnVuY3Rpb24uIFRoZSB3cmFwcGVyIGZ1bmN0aW9uIHJlY2VpdmVzLFxuICAgICAgICogYXMgaXRzIGZpcnN0IGFyZ3VtZW50LCB0aGUgb3JpZ2luYWwgYHRhcmdldGAgb2JqZWN0LCBmb2xsb3dlZCBieSBlYWNoIG9mXG4gICAgICAgKiB0aGUgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgb3JpZ2luYWwgbWV0aG9kLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRcbiAgICAgICAqICAgICAgICBUaGUgb3JpZ2luYWwgdGFyZ2V0IG9iamVjdCB0aGF0IHRoZSB3cmFwcGVkIG1ldGhvZCBiZWxvbmdzIHRvLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbWV0aG9kXG4gICAgICAgKiAgICAgICAgVGhlIG1ldGhvZCBiZWluZyB3cmFwcGVkLiBUaGlzIGlzIHVzZWQgYXMgdGhlIHRhcmdldCBvZiB0aGUgUHJveHlcbiAgICAgICAqICAgICAgICBvYmplY3Qgd2hpY2ggaXMgY3JlYXRlZCB0byB3cmFwIHRoZSBtZXRob2QuXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgVGhlIHdyYXBwZXIgZnVuY3Rpb24gd2hpY2ggaXMgY2FsbGVkIGluIHBsYWNlIG9mIGEgZGlyZWN0IGludm9jYXRpb25cbiAgICAgICAqICAgICAgICBvZiB0aGUgd3JhcHBlZCBtZXRob2QuXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge1Byb3h5PGZ1bmN0aW9uPn1cbiAgICAgICAqICAgICAgICBBIFByb3h5IG9iamVjdCBmb3IgdGhlIGdpdmVuIG1ldGhvZCwgd2hpY2ggaW52b2tlcyB0aGUgZ2l2ZW4gd3JhcHBlclxuICAgICAgICogICAgICAgIG1ldGhvZCBpbiBpdHMgcGxhY2UuXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCB3cmFwTWV0aG9kID0gKHRhcmdldCwgbWV0aG9kLCB3cmFwcGVyKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJveHkobWV0aG9kLCB7XG4gICAgICAgICAgYXBwbHkodGFyZ2V0TWV0aG9kLCB0aGlzT2JqLCBhcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gd3JhcHBlci5jYWxsKHRoaXNPYmosIHRhcmdldCwgLi4uYXJncyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgbGV0IGhhc093blByb3BlcnR5ID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuICAgICAgLyoqXG4gICAgICAgKiBXcmFwcyBhbiBvYmplY3QgaW4gYSBQcm94eSB3aGljaCBpbnRlcmNlcHRzIGFuZCB3cmFwcyBjZXJ0YWluIG1ldGhvZHNcbiAgICAgICAqIGJhc2VkIG9uIHRoZSBnaXZlbiBgd3JhcHBlcnNgIGFuZCBgbWV0YWRhdGFgIG9iamVjdHMuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICAgICAgICogICAgICAgIFRoZSB0YXJnZXQgb2JqZWN0IHRvIHdyYXAuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IFt3cmFwcGVycyA9IHt9XVxuICAgICAgICogICAgICAgIEFuIG9iamVjdCB0cmVlIGNvbnRhaW5pbmcgd3JhcHBlciBmdW5jdGlvbnMgZm9yIHNwZWNpYWwgY2FzZXMuIEFueVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uIHByZXNlbnQgaW4gdGhpcyBvYmplY3QgdHJlZSBpcyBjYWxsZWQgaW4gcGxhY2Ugb2YgdGhlXG4gICAgICAgKiAgICAgICAgbWV0aG9kIGluIHRoZSBzYW1lIGxvY2F0aW9uIGluIHRoZSBgdGFyZ2V0YCBvYmplY3QgdHJlZS4gVGhlc2VcbiAgICAgICAqICAgICAgICB3cmFwcGVyIG1ldGhvZHMgYXJlIGludm9rZWQgYXMgZGVzY3JpYmVkIGluIHtAc2VlIHdyYXBNZXRob2R9LlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbbWV0YWRhdGEgPSB7fV1cbiAgICAgICAqICAgICAgICBBbiBvYmplY3QgdHJlZSBjb250YWluaW5nIG1ldGFkYXRhIHVzZWQgdG8gYXV0b21hdGljYWxseSBnZW5lcmF0ZVxuICAgICAgICogICAgICAgIFByb21pc2UtYmFzZWQgd3JhcHBlciBmdW5jdGlvbnMgZm9yIGFzeW5jaHJvbm91cy4gQW55IGZ1bmN0aW9uIGluXG4gICAgICAgKiAgICAgICAgdGhlIGB0YXJnZXRgIG9iamVjdCB0cmVlIHdoaWNoIGhhcyBhIGNvcnJlc3BvbmRpbmcgbWV0YWRhdGEgb2JqZWN0XG4gICAgICAgKiAgICAgICAgaW4gdGhlIHNhbWUgbG9jYXRpb24gaW4gdGhlIGBtZXRhZGF0YWAgdHJlZSBpcyByZXBsYWNlZCB3aXRoIGFuXG4gICAgICAgKiAgICAgICAgYXV0b21hdGljYWxseS1nZW5lcmF0ZWQgd3JhcHBlciBmdW5jdGlvbiwgYXMgZGVzY3JpYmVkIGluXG4gICAgICAgKiAgICAgICAge0BzZWUgd3JhcEFzeW5jRnVuY3Rpb259XG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge1Byb3h5PG9iamVjdD59XG4gICAgICAgKi9cblxuICAgICAgY29uc3Qgd3JhcE9iamVjdCA9ICh0YXJnZXQsIHdyYXBwZXJzID0ge30sIG1ldGFkYXRhID0ge30pID0+IHtcbiAgICAgICAgbGV0IGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgbGV0IGhhbmRsZXJzID0ge1xuICAgICAgICAgIGhhcyhwcm94eVRhcmdldCwgcHJvcCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3AgaW4gdGFyZ2V0IHx8IHByb3AgaW4gY2FjaGU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGdldChwcm94eVRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgIGlmIChwcm9wIGluIGNhY2hlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjYWNoZVtwcm9wXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEocHJvcCBpbiB0YXJnZXQpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRhcmdldFtwcm9wXTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBtZXRob2Qgb24gdGhlIHVuZGVybHlpbmcgb2JqZWN0LiBDaGVjayBpZiB3ZSBuZWVkIHRvIGRvXG4gICAgICAgICAgICAgIC8vIGFueSB3cmFwcGluZy5cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3cmFwcGVyc1twcm9wXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSBhIHNwZWNpYWwtY2FzZSB3cmFwcGVyIGZvciB0aGlzIG1ldGhvZC5cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBNZXRob2QodGFyZ2V0LCB0YXJnZXRbcHJvcF0sIHdyYXBwZXJzW3Byb3BdKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNPd25Qcm9wZXJ0eShtZXRhZGF0YSwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGFuIGFzeW5jIG1ldGhvZCB0aGF0IHdlIGhhdmUgbWV0YWRhdGEgZm9yLiBDcmVhdGUgYVxuICAgICAgICAgICAgICAgIC8vIFByb21pc2Ugd3JhcHBlciBmb3IgaXQuXG4gICAgICAgICAgICAgICAgbGV0IHdyYXBwZXIgPSB3cmFwQXN5bmNGdW5jdGlvbihwcm9wLCBtZXRhZGF0YVtwcm9wXSk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwTWV0aG9kKHRhcmdldCwgdGFyZ2V0W3Byb3BdLCB3cmFwcGVyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgbWV0aG9kIHRoYXQgd2UgZG9uJ3Qga25vdyBvciBjYXJlIGFib3V0LiBSZXR1cm4gdGhlXG4gICAgICAgICAgICAgICAgLy8gb3JpZ2luYWwgbWV0aG9kLCBib3VuZCB0byB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5iaW5kKHRhcmdldCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmIChoYXNPd25Qcm9wZXJ0eSh3cmFwcGVycywgcHJvcCkgfHwgaGFzT3duUHJvcGVydHkobWV0YWRhdGEsIHByb3ApKSkge1xuICAgICAgICAgICAgICAvLyBUaGlzIGlzIGFuIG9iamVjdCB0aGF0IHdlIG5lZWQgdG8gZG8gc29tZSB3cmFwcGluZyBmb3IgdGhlIGNoaWxkcmVuXG4gICAgICAgICAgICAgIC8vIG9mLiBDcmVhdGUgYSBzdWItb2JqZWN0IHdyYXBwZXIgZm9yIGl0IHdpdGggdGhlIGFwcHJvcHJpYXRlIGNoaWxkXG4gICAgICAgICAgICAgIC8vIG1ldGFkYXRhLlxuICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBPYmplY3QodmFsdWUsIHdyYXBwZXJzW3Byb3BdLCBtZXRhZGF0YVtwcm9wXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhhc093blByb3BlcnR5KG1ldGFkYXRhLCBcIipcIikpIHtcbiAgICAgICAgICAgICAgLy8gV3JhcCBhbGwgcHJvcGVydGllcyBpbiAqIG5hbWVzcGFjZS5cbiAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwT2JqZWN0KHZhbHVlLCB3cmFwcGVyc1twcm9wXSwgbWV0YWRhdGFbXCIqXCJdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIFdlIGRvbid0IG5lZWQgdG8gZG8gYW55IHdyYXBwaW5nIGZvciB0aGlzIHByb3BlcnR5LFxuICAgICAgICAgICAgICAvLyBzbyBqdXN0IGZvcndhcmQgYWxsIGFjY2VzcyB0byB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjYWNoZSwgcHJvcCwge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldFtwcm9wXTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FjaGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc2V0KHByb3h5VGFyZ2V0LCBwcm9wLCB2YWx1ZSwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgIGlmIChwcm9wIGluIGNhY2hlKSB7XG4gICAgICAgICAgICAgIGNhY2hlW3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGRlZmluZVByb3BlcnR5KHByb3h5VGFyZ2V0LCBwcm9wLCBkZXNjKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShjYWNoZSwgcHJvcCwgZGVzYyk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGRlbGV0ZVByb3BlcnR5KHByb3h5VGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5kZWxldGVQcm9wZXJ0eShjYWNoZSwgcHJvcCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH07IC8vIFBlciBjb250cmFjdCBvZiB0aGUgUHJveHkgQVBJLCB0aGUgXCJnZXRcIiBwcm94eSBoYW5kbGVyIG11c3QgcmV0dXJuIHRoZVxuICAgICAgICAvLyBvcmlnaW5hbCB2YWx1ZSBvZiB0aGUgdGFyZ2V0IGlmIHRoYXQgdmFsdWUgaXMgZGVjbGFyZWQgcmVhZC1vbmx5IGFuZFxuICAgICAgICAvLyBub24tY29uZmlndXJhYmxlLiBGb3IgdGhpcyByZWFzb24sIHdlIGNyZWF0ZSBhbiBvYmplY3Qgd2l0aCB0aGVcbiAgICAgICAgLy8gcHJvdG90eXBlIHNldCB0byBgdGFyZ2V0YCBpbnN0ZWFkIG9mIHVzaW5nIGB0YXJnZXRgIGRpcmVjdGx5LlxuICAgICAgICAvLyBPdGhlcndpc2Ugd2UgY2Fubm90IHJldHVybiBhIGN1c3RvbSBvYmplY3QgZm9yIEFQSXMgdGhhdFxuICAgICAgICAvLyBhcmUgZGVjbGFyZWQgcmVhZC1vbmx5IGFuZCBub24tY29uZmlndXJhYmxlLCBzdWNoIGFzIGBjaHJvbWUuZGV2dG9vbHNgLlxuICAgICAgICAvL1xuICAgICAgICAvLyBUaGUgcHJveHkgaGFuZGxlcnMgdGhlbXNlbHZlcyB3aWxsIHN0aWxsIHVzZSB0aGUgb3JpZ2luYWwgYHRhcmdldGBcbiAgICAgICAgLy8gaW5zdGVhZCBvZiB0aGUgYHByb3h5VGFyZ2V0YCwgc28gdGhhdCB0aGUgbWV0aG9kcyBhbmQgcHJvcGVydGllcyBhcmVcbiAgICAgICAgLy8gZGVyZWZlcmVuY2VkIHZpYSB0aGUgb3JpZ2luYWwgdGFyZ2V0cy5cblxuICAgICAgICBsZXQgcHJveHlUYXJnZXQgPSBPYmplY3QuY3JlYXRlKHRhcmdldCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJveHkocHJveHlUYXJnZXQsIGhhbmRsZXJzKTtcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYSBzZXQgb2Ygd3JhcHBlciBmdW5jdGlvbnMgZm9yIGFuIGV2ZW50IG9iamVjdCwgd2hpY2ggaGFuZGxlc1xuICAgICAgICogd3JhcHBpbmcgb2YgbGlzdGVuZXIgZnVuY3Rpb25zIHRoYXQgdGhvc2UgbWVzc2FnZXMgYXJlIHBhc3NlZC5cbiAgICAgICAqXG4gICAgICAgKiBBIHNpbmdsZSB3cmFwcGVyIGlzIGNyZWF0ZWQgZm9yIGVhY2ggbGlzdGVuZXIgZnVuY3Rpb24sIGFuZCBzdG9yZWQgaW4gYVxuICAgICAgICogbWFwLiBTdWJzZXF1ZW50IGNhbGxzIHRvIGBhZGRMaXN0ZW5lcmAsIGBoYXNMaXN0ZW5lcmAsIG9yIGByZW1vdmVMaXN0ZW5lcmBcbiAgICAgICAqIHJldHJpZXZlIHRoZSBvcmlnaW5hbCB3cmFwcGVyLCBzbyB0aGF0ICBhdHRlbXB0cyB0byByZW1vdmUgYVxuICAgICAgICogcHJldmlvdXNseS1hZGRlZCBsaXN0ZW5lciB3b3JrIGFzIGV4cGVjdGVkLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7RGVmYXVsdFdlYWtNYXA8ZnVuY3Rpb24sIGZ1bmN0aW9uPn0gd3JhcHBlck1hcFxuICAgICAgICogICAgICAgIEEgRGVmYXVsdFdlYWtNYXAgb2JqZWN0IHdoaWNoIHdpbGwgY3JlYXRlIHRoZSBhcHByb3ByaWF0ZSB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgZm9yIGEgZ2l2ZW4gbGlzdGVuZXIgZnVuY3Rpb24gd2hlbiBvbmUgZG9lcyBub3QgZXhpc3QsIGFuZCByZXRyaWV2ZVxuICAgICAgICogICAgICAgIGFuIGV4aXN0aW5nIG9uZSB3aGVuIGl0IGRvZXMuXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge29iamVjdH1cbiAgICAgICAqL1xuXG5cbiAgICAgIGNvbnN0IHdyYXBFdmVudCA9IHdyYXBwZXJNYXAgPT4gKHtcbiAgICAgICAgYWRkTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lciwgLi4uYXJncykge1xuICAgICAgICAgIHRhcmdldC5hZGRMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lciksIC4uLmFyZ3MpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhhc0xpc3RlbmVyKHRhcmdldCwgbGlzdGVuZXIpIHtcbiAgICAgICAgICByZXR1cm4gdGFyZ2V0Lmhhc0xpc3RlbmVyKHdyYXBwZXJNYXAuZ2V0KGxpc3RlbmVyKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lcikge1xuICAgICAgICAgIHRhcmdldC5yZW1vdmVMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lcikpO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBvblJlcXVlc3RGaW5pc2hlZFdyYXBwZXJzID0gbmV3IERlZmF1bHRXZWFrTWFwKGxpc3RlbmVyID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgcmV0dXJuIGxpc3RlbmVyO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcmFwcyBhbiBvblJlcXVlc3RGaW5pc2hlZCBsaXN0ZW5lciBmdW5jdGlvbiBzbyB0aGF0IGl0IHdpbGwgcmV0dXJuIGFcbiAgICAgICAgICogYGdldENvbnRlbnQoKWAgcHJvcGVydHkgd2hpY2ggcmV0dXJucyBhIGBQcm9taXNlYCByYXRoZXIgdGhhbiB1c2luZyBhXG4gICAgICAgICAqIGNhbGxiYWNrIEFQSS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHJlcVxuICAgICAgICAgKiAgICAgICAgVGhlIEhBUiBlbnRyeSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBuZXR3b3JrIHJlcXVlc3QuXG4gICAgICAgICAqL1xuXG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG9uUmVxdWVzdEZpbmlzaGVkKHJlcSkge1xuICAgICAgICAgIGNvbnN0IHdyYXBwZWRSZXEgPSB3cmFwT2JqZWN0KHJlcSwge31cbiAgICAgICAgICAvKiB3cmFwcGVycyAqL1xuICAgICAgICAgICwge1xuICAgICAgICAgICAgZ2V0Q29udGVudDoge1xuICAgICAgICAgICAgICBtaW5BcmdzOiAwLFxuICAgICAgICAgICAgICBtYXhBcmdzOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbGlzdGVuZXIod3JhcHBlZFJlcSk7XG4gICAgICAgIH07XG4gICAgICB9KTsgLy8gS2VlcCB0cmFjayBpZiB0aGUgZGVwcmVjYXRpb24gd2FybmluZyBoYXMgYmVlbiBsb2dnZWQgYXQgbGVhc3Qgb25jZS5cblxuICAgICAgbGV0IGxvZ2dlZFNlbmRSZXNwb25zZURlcHJlY2F0aW9uV2FybmluZyA9IGZhbHNlO1xuICAgICAgY29uc3Qgb25NZXNzYWdlV3JhcHBlcnMgPSBuZXcgRGVmYXVsdFdlYWtNYXAobGlzdGVuZXIgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICByZXR1cm4gbGlzdGVuZXI7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdyYXBzIGEgbWVzc2FnZSBsaXN0ZW5lciBmdW5jdGlvbiBzbyB0aGF0IGl0IG1heSBzZW5kIHJlc3BvbnNlcyBiYXNlZCBvblxuICAgICAgICAgKiBpdHMgcmV0dXJuIHZhbHVlLCByYXRoZXIgdGhhbiBieSByZXR1cm5pbmcgYSBzZW50aW5lbCB2YWx1ZSBhbmQgY2FsbGluZyBhXG4gICAgICAgICAqIGNhbGxiYWNrLiBJZiB0aGUgbGlzdGVuZXIgZnVuY3Rpb24gcmV0dXJucyBhIFByb21pc2UsIHRoZSByZXNwb25zZSBpc1xuICAgICAgICAgKiBzZW50IHdoZW4gdGhlIHByb21pc2UgZWl0aGVyIHJlc29sdmVzIG9yIHJlamVjdHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gbWVzc2FnZVxuICAgICAgICAgKiAgICAgICAgVGhlIG1lc3NhZ2Ugc2VudCBieSB0aGUgb3RoZXIgZW5kIG9mIHRoZSBjaGFubmVsLlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gc2VuZGVyXG4gICAgICAgICAqICAgICAgICBEZXRhaWxzIGFib3V0IHRoZSBzZW5kZXIgb2YgdGhlIG1lc3NhZ2UuXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oKil9IHNlbmRSZXNwb25zZVxuICAgICAgICAgKiAgICAgICAgQSBjYWxsYmFjayB3aGljaCwgd2hlbiBjYWxsZWQgd2l0aCBhbiBhcmJpdHJhcnkgYXJndW1lbnQsIHNlbmRzXG4gICAgICAgICAqICAgICAgICB0aGF0IHZhbHVlIGFzIGEgcmVzcG9uc2UuXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKiAgICAgICAgVHJ1ZSBpZiB0aGUgd3JhcHBlZCBsaXN0ZW5lciByZXR1cm5lZCBhIFByb21pc2UsIHdoaWNoIHdpbGwgbGF0ZXJcbiAgICAgICAgICogICAgICAgIHlpZWxkIGEgcmVzcG9uc2UuIEZhbHNlIG90aGVyd2lzZS5cbiAgICAgICAgICovXG5cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gb25NZXNzYWdlKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XG4gICAgICAgICAgbGV0IGRpZENhbGxTZW5kUmVzcG9uc2UgPSBmYWxzZTtcbiAgICAgICAgICBsZXQgd3JhcHBlZFNlbmRSZXNwb25zZTtcbiAgICAgICAgICBsZXQgc2VuZFJlc3BvbnNlUHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgd3JhcHBlZFNlbmRSZXNwb25zZSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICBpZiAoIWxvZ2dlZFNlbmRSZXNwb25zZURlcHJlY2F0aW9uV2FybmluZykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihTRU5EX1JFU1BPTlNFX0RFUFJFQ0FUSU9OX1dBUk5JTkcsIG5ldyBFcnJvcigpLnN0YWNrKTtcbiAgICAgICAgICAgICAgICBsb2dnZWRTZW5kUmVzcG9uc2VEZXByZWNhdGlvbldhcm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZGlkQ2FsbFNlbmRSZXNwb25zZSA9IHRydWU7XG4gICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBsZXQgcmVzdWx0O1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGxpc3RlbmVyKG1lc3NhZ2UsIHNlbmRlciwgd3JhcHBlZFNlbmRSZXNwb25zZSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGlzUmVzdWx0VGhlbmFibGUgPSByZXN1bHQgIT09IHRydWUgJiYgaXNUaGVuYWJsZShyZXN1bHQpOyAvLyBJZiB0aGUgbGlzdGVuZXIgZGlkbid0IHJldHVybmVkIHRydWUgb3IgYSBQcm9taXNlLCBvciBjYWxsZWRcbiAgICAgICAgICAvLyB3cmFwcGVkU2VuZFJlc3BvbnNlIHN5bmNocm9ub3VzbHksIHdlIGNhbiBleGl0IGVhcmxpZXJcbiAgICAgICAgICAvLyBiZWNhdXNlIHRoZXJlIHdpbGwgYmUgbm8gcmVzcG9uc2Ugc2VudCBmcm9tIHRoaXMgbGlzdGVuZXIuXG5cbiAgICAgICAgICBpZiAocmVzdWx0ICE9PSB0cnVlICYmICFpc1Jlc3VsdFRoZW5hYmxlICYmICFkaWRDYWxsU2VuZFJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSAvLyBBIHNtYWxsIGhlbHBlciB0byBzZW5kIHRoZSBtZXNzYWdlIGlmIHRoZSBwcm9taXNlIHJlc29sdmVzXG4gICAgICAgICAgLy8gYW5kIGFuIGVycm9yIGlmIHRoZSBwcm9taXNlIHJlamVjdHMgKGEgd3JhcHBlZCBzZW5kTWVzc2FnZSBoYXNcbiAgICAgICAgICAvLyB0byB0cmFuc2xhdGUgdGhlIG1lc3NhZ2UgaW50byBhIHJlc29sdmVkIHByb21pc2Ugb3IgYSByZWplY3RlZFxuICAgICAgICAgIC8vIHByb21pc2UpLlxuXG5cbiAgICAgICAgICBjb25zdCBzZW5kUHJvbWlzZWRSZXN1bHQgPSBwcm9taXNlID0+IHtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihtc2cgPT4ge1xuICAgICAgICAgICAgICAvLyBzZW5kIHRoZSBtZXNzYWdlIHZhbHVlLlxuICAgICAgICAgICAgICBzZW5kUmVzcG9uc2UobXNnKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgLy8gU2VuZCBhIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhlIGVycm9yIGlmIHRoZSByZWplY3RlZCB2YWx1ZVxuICAgICAgICAgICAgICAvLyBpcyBhbiBpbnN0YW5jZSBvZiBlcnJvciwgb3IgdGhlIG9iamVjdCBpdHNlbGYgb3RoZXJ3aXNlLlxuICAgICAgICAgICAgICBsZXQgbWVzc2FnZTtcblxuICAgICAgICAgICAgICBpZiAoZXJyb3IgJiYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgfHwgdHlwZW9mIGVycm9yLm1lc3NhZ2UgPT09IFwic3RyaW5nXCIpKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZFwiO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHtcbiAgICAgICAgICAgICAgICBfX21veldlYkV4dGVuc2lvblBvbHlmaWxsUmVqZWN0X186IHRydWUsXG4gICAgICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgIC8vIFByaW50IGFuIGVycm9yIG9uIHRoZSBjb25zb2xlIGlmIHVuYWJsZSB0byBzZW5kIHRoZSByZXNwb25zZS5cbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBzZW5kIG9uTWVzc2FnZSByZWplY3RlZCByZXBseVwiLCBlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTsgLy8gSWYgdGhlIGxpc3RlbmVyIHJldHVybmVkIGEgUHJvbWlzZSwgc2VuZCB0aGUgcmVzb2x2ZWQgdmFsdWUgYXMgYVxuICAgICAgICAgIC8vIHJlc3VsdCwgb3RoZXJ3aXNlIHdhaXQgdGhlIHByb21pc2UgcmVsYXRlZCB0byB0aGUgd3JhcHBlZFNlbmRSZXNwb25zZVxuICAgICAgICAgIC8vIGNhbGxiYWNrIHRvIHJlc29sdmUgYW5kIHNlbmQgaXQgYXMgYSByZXNwb25zZS5cblxuXG4gICAgICAgICAgaWYgKGlzUmVzdWx0VGhlbmFibGUpIHtcbiAgICAgICAgICAgIHNlbmRQcm9taXNlZFJlc3VsdChyZXN1bHQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZW5kUHJvbWlzZWRSZXN1bHQoc2VuZFJlc3BvbnNlUHJvbWlzZSk7XG4gICAgICAgICAgfSAvLyBMZXQgQ2hyb21lIGtub3cgdGhhdCB0aGUgbGlzdGVuZXIgaXMgcmVwbHlpbmcuXG5cblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHdyYXBwZWRTZW5kTWVzc2FnZUNhbGxiYWNrID0gKHtcbiAgICAgICAgcmVqZWN0LFxuICAgICAgICByZXNvbHZlXG4gICAgICB9LCByZXBseSkgPT4ge1xuICAgICAgICBpZiAoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgIC8vIERldGVjdCB3aGVuIG5vbmUgb2YgdGhlIGxpc3RlbmVycyByZXBsaWVkIHRvIHRoZSBzZW5kTWVzc2FnZSBjYWxsIGFuZCByZXNvbHZlXG4gICAgICAgICAgLy8gdGhlIHByb21pc2UgdG8gdW5kZWZpbmVkIGFzIGluIEZpcmVmb3guXG4gICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbC9pc3N1ZXMvMTMwXG4gICAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSA9PT0gQ0hST01FX1NFTkRfTUVTU0FHRV9DQUxMQkFDS19OT19SRVNQT05TRV9NRVNTQUdFKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJlcGx5ICYmIHJlcGx5Ll9fbW96V2ViRXh0ZW5zaW9uUG9seWZpbGxSZWplY3RfXykge1xuICAgICAgICAgIC8vIENvbnZlcnQgYmFjayB0aGUgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgZXJyb3IgaW50b1xuICAgICAgICAgIC8vIGFuIEVycm9yIGluc3RhbmNlLlxuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IocmVwbHkubWVzc2FnZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUocmVwbHkpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCB3cmFwcGVkU2VuZE1lc3NhZ2UgPSAobmFtZSwgbWV0YWRhdGEsIGFwaU5hbWVzcGFjZU9iaiwgLi4uYXJncykgPT4ge1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPCBtZXRhZGF0YS5taW5BcmdzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBsZWFzdCAke21ldGFkYXRhLm1pbkFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1pbkFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA+IG1ldGFkYXRhLm1heEFyZ3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IG1vc3QgJHttZXRhZGF0YS5tYXhBcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5tYXhBcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHdyYXBwZWRDYiA9IHdyYXBwZWRTZW5kTWVzc2FnZUNhbGxiYWNrLmJpbmQobnVsbCwge1xuICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGFyZ3MucHVzaCh3cmFwcGVkQ2IpO1xuICAgICAgICAgIGFwaU5hbWVzcGFjZU9iai5zZW5kTWVzc2FnZSguLi5hcmdzKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzdGF0aWNXcmFwcGVycyA9IHtcbiAgICAgICAgZGV2dG9vbHM6IHtcbiAgICAgICAgICBuZXR3b3JrOiB7XG4gICAgICAgICAgICBvblJlcXVlc3RGaW5pc2hlZDogd3JhcEV2ZW50KG9uUmVxdWVzdEZpbmlzaGVkV3JhcHBlcnMpXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBydW50aW1lOiB7XG4gICAgICAgICAgb25NZXNzYWdlOiB3cmFwRXZlbnQob25NZXNzYWdlV3JhcHBlcnMpLFxuICAgICAgICAgIG9uTWVzc2FnZUV4dGVybmFsOiB3cmFwRXZlbnQob25NZXNzYWdlV3JhcHBlcnMpLFxuICAgICAgICAgIHNlbmRNZXNzYWdlOiB3cmFwcGVkU2VuZE1lc3NhZ2UuYmluZChudWxsLCBcInNlbmRNZXNzYWdlXCIsIHtcbiAgICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgICBtYXhBcmdzOiAzXG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgdGFiczoge1xuICAgICAgICAgIHNlbmRNZXNzYWdlOiB3cmFwcGVkU2VuZE1lc3NhZ2UuYmluZChudWxsLCBcInNlbmRNZXNzYWdlXCIsIHtcbiAgICAgICAgICAgIG1pbkFyZ3M6IDIsXG4gICAgICAgICAgICBtYXhBcmdzOiAzXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvbnN0IHNldHRpbmdNZXRhZGF0YSA9IHtcbiAgICAgICAgY2xlYXI6IHtcbiAgICAgICAgICBtaW5BcmdzOiAxLFxuICAgICAgICAgIG1heEFyZ3M6IDFcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0OiB7XG4gICAgICAgICAgbWluQXJnczogMSxcbiAgICAgICAgICBtYXhBcmdzOiAxXG4gICAgICAgIH0sXG4gICAgICAgIHNldDoge1xuICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgbWF4QXJnczogMVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgYXBpTWV0YWRhdGEucHJpdmFjeSA9IHtcbiAgICAgICAgbmV0d29yazoge1xuICAgICAgICAgIFwiKlwiOiBzZXR0aW5nTWV0YWRhdGFcbiAgICAgICAgfSxcbiAgICAgICAgc2VydmljZXM6IHtcbiAgICAgICAgICBcIipcIjogc2V0dGluZ01ldGFkYXRhXG4gICAgICAgIH0sXG4gICAgICAgIHdlYnNpdGVzOiB7XG4gICAgICAgICAgXCIqXCI6IHNldHRpbmdNZXRhZGF0YVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHdyYXBPYmplY3QoZXh0ZW5zaW9uQVBJcywgc3RhdGljV3JhcHBlcnMsIGFwaU1ldGFkYXRhKTtcbiAgICB9O1xuXG4gICAgaWYgKHR5cGVvZiBjaHJvbWUgIT0gXCJvYmplY3RcIiB8fCAhY2hyb21lIHx8ICFjaHJvbWUucnVudGltZSB8fCAhY2hyb21lLnJ1bnRpbWUuaWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgc2NyaXB0IHNob3VsZCBvbmx5IGJlIGxvYWRlZCBpbiBhIGJyb3dzZXIgZXh0ZW5zaW9uLlwiKTtcbiAgICB9IC8vIFRoZSBidWlsZCBwcm9jZXNzIGFkZHMgYSBVTUQgd3JhcHBlciBhcm91bmQgdGhpcyBmaWxlLCB3aGljaCBtYWtlcyB0aGVcbiAgICAvLyBgbW9kdWxlYCB2YXJpYWJsZSBhdmFpbGFibGUuXG5cblxuICAgIG1vZHVsZS5leHBvcnRzID0gd3JhcEFQSXMoY2hyb21lKTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGJyb3dzZXI7XG4gIH1cbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnJvd3Nlci1wb2x5ZmlsbC5qcy5tYXBcbiIsImltcG9ydCB7IGNvbXB1dGVTZWxlY3RvciB9IGZyb20gXCIuL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgeyBBYnN0cmFjdEVkaXRvciB9IGZyb20gXCIuL2VkaXRvcnMvQWJzdHJhY3RFZGl0b3JcIjtcbmltcG9ydCB7IGdldEVkaXRvciB9IGZyb20gXCIuL2VkaXRvcnMvZWRpdG9yc1wiO1xuXG5leHBvcnQgY2xhc3MgRmlyZW52aW1FbGVtZW50IHtcblxuICAgIC8vIGVkaXRvciBpcyBhbiBvYmplY3QgdGhhdCBwcm92aWRlcyBhbiBpbnRlcmZhY2UgdG8gaW50ZXJhY3QgKGUuZy5cbiAgICAvLyByZXRyaWV2ZS9zZXQgY29udGVudCwgcmV0cmlldmUvc2V0IGN1cnNvciBwb3NpdGlvbikgY29uc2lzdGVudGx5IHdpdGhcbiAgICAvLyB1bmRlcmx5aW5nIGVsZW1lbnRzIChiZSB0aGV5IHNpbXBsZSB0ZXh0YXJlYXMsIENvZGVNaXJyb3IgZWxlbWVudHMgb3JcbiAgICAvLyBvdGhlcikuXG4gICAgcHJpdmF0ZSBlZGl0b3I6IEFic3RyYWN0RWRpdG9yO1xuICAgIC8vIGZvY3VzSW5mbyBpcyB1c2VkIHRvIGtlZXAgdHJhY2sgb2YgZm9jdXMgbGlzdGVuZXJzIGFuZCB0aW1lb3V0cyBjcmVhdGVkXG4gICAgLy8gYnkgRmlyZW52aW1FbGVtZW50LmZvY3VzKCkuIEZpcmVudmltRWxlbWVudC5mb2N1cygpIGNyZWF0ZXMgdGhlc2VcbiAgICAvLyBsaXN0ZW5lcnMgYW5kIHRpbWVvdXRzIGluIG9yZGVyIHRvIHdvcmsgYXJvdW5kIHBhZ2VzIHRoYXQgdHJ5IHRvIGdyYWJcbiAgICAvLyB0aGUgZm9jdXMgYWdhaW4gYWZ0ZXIgdGhlIEZpcmVudmltRWxlbWVudCBoYXMgYmVlbiBjcmVhdGVkIG9yIGFmdGVyIHRoZVxuICAgIC8vIHVuZGVybHlpbmcgZWxlbWVudCdzIGNvbnRlbnQgaGFzIGNoYW5nZWQuXG4gICAgcHJpdmF0ZSBmb2N1c0luZm8gPSB7XG4gICAgICAgIGZpbmFsUmVmb2N1c1RpbWVvdXRzOiBbXSBhcyBhbnlbXSxcbiAgICAgICAgcmVmb2N1c1JlZnM6IFtdIGFzIGFueVtdLFxuICAgICAgICByZWZvY3VzVGltZW91dHM6IFtdIGFzIGFueVtdLFxuICAgIH07XG4gICAgLy8gZnJhbWVJZCBpcyB0aGUgd2ViZXh0ZW5zaW9uIGlkIG9mIHRoZSBuZW92aW0gZnJhbWUuIFdlIHVzZSBpdCB0byBzZW5kXG4gICAgLy8gY29tbWFuZHMgdG8gdGhlIGZyYW1lLlxuICAgIHByaXZhdGUgZnJhbWVJZDogbnVtYmVyO1xuICAgIC8vIGZyYW1lSWRQcm9taXNlIGlzIGEgcHJvbWlzZSB0aGF0IHdpbGwgcmVzb2x2ZSB0byB0aGUgZnJhbWVJZC4gVGhlXG4gICAgLy8gZnJhbWVJZCBjYW4ndCBiZSByZXRyaWV2ZWQgc3luY2hyb25vdXNseSBhcyBpdCBuZWVkcyB0byBiZSBzZW50IGJ5IHRoZVxuICAgIC8vIGJhY2tncm91bmQgc2NyaXB0LlxuICAgIHByaXZhdGUgZnJhbWVJZFByb21pc2U6IFByb21pc2U8bnVtYmVyPjtcbiAgICAvLyBpZnJhbWUgaXMgdGhlIE5lb3ZpbSBmcmFtZS4gVGhpcyBpcyB0aGUgZWxlbWVudCB0aGF0IHJlY2VpdmVzIGFsbCBpbnB1dHNcbiAgICAvLyBhbmQgZGlzcGxheXMgdGhlIGVkaXRvci5cbiAgICBwcml2YXRlIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQ7XG4gICAgLy8gV2UgdXNlIGFuIGludGVyc2VjdGlvbk9ic2VydmVyIHRvIGRldGVjdCB3aGVuIHRoZSBlbGVtZW50IHRoZVxuICAgIC8vIEZpcmVudmltRWxlbWVudCBpcyB0aWVkIGJlY29tZXMgaW52aXNpYmxlLiBXaGVuIHRoaXMgaGFwcGVucyxcbiAgICAvLyB3ZSBoaWRlIHRoZSBGaXJlbnZpbUVsZW1lbnQgZnJvbSB0aGUgcGFnZS5cbiAgICBwcml2YXRlIGludGVyc2VjdGlvbk9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlcjtcbiAgICAvLyBXZSB1c2UgYSBtdXRhdGlvbiBvYnNlcnZlciB0byBkZXRlY3Qgd2hldGhlciB0aGUgZWxlbWVudCBpcyByZW1vdmVkIGZyb21cbiAgICAvLyB0aGUgcGFnZS4gV2hlbiB0aGlzIGhhcHBlbnMsIHRoZSBGaXJlbnZpbUVsZW1lbnQgaXMgcmVtb3ZlZCBmcm9tIHRoZVxuICAgIC8vIHBhZ2UuXG4gICAgcHJpdmF0ZSBwYWdlT2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI7XG4gICAgLy8gV2UgdXNlIGEgbXV0YXRpb24gb2JzZXJ2ZXIgdG8gZGV0ZWN0IGlmIHRoZSBzcGFuIGlzIHJlbW92ZWQgZnJvbSB0aGVcbiAgICAvLyBwYWdlIGJ5IHRoZSBwYWdlLiBXaGVuIHRoaXMgaGFwcGVucywgdGhlIHNwYW4gaXMgcmUtaW5zZXJ0ZWQgaW4gdGhlXG4gICAgLy8gcGFnZS5cbiAgICBwcml2YXRlIHNwYW5PYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcjtcbiAgICAvLyBudmltaWZ5IGlzIHRoZSBmdW5jdGlvbiB0aGF0IGxpc3RlbnMgZm9yIGZvY3VzIGV2ZW50cyBhbmQgY3JlYXRlc1xuICAgIC8vIGZpcmVudmltIGVsZW1lbnRzLiBXZSBuZWVkIGl0IGluIG9yZGVyIHRvIGJlIGFibGUgdG8gcmVtb3ZlIGl0IGFzIGFuXG4gICAgLy8gZXZlbnQgbGlzdGVuZXIgZnJvbSB0aGUgZWxlbWVudCB0aGUgdXNlciBzZWxlY3RlZCB3aGVuIHRoZSB1c2VyIHdhbnRzIHRvXG4gICAgLy8gc2VsZWN0IHRoYXQgZWxlbWVudCBhZ2Fpbi5cbiAgICBwcml2YXRlIG52aW1pZnk6IChldnQ6IHsgdGFyZ2V0OiBFdmVudFRhcmdldCB9KSA9PiBQcm9taXNlPHZvaWQ+O1xuICAgIC8vIG9yaWdpbmFsRWxlbWVudCBpcyB0aGUgZWxlbWVudCBhIGZvY3VzIGV2ZW50IGhhcyBiZWVuIHRyaWdnZXJlZCBvbi4gV2VcbiAgICAvLyB1c2UgaXQgdG8gcmV0cmlldmUgdGhlIGVsZW1lbnQgdGhlIGVkaXRvciBzaG91bGQgYXBwZWFyIG92ZXIgKGUuZy4sIGlmXG4gICAgLy8gZWxlbSBpcyBhbiBlbGVtZW50IGluc2lkZSBhIENvZGVNaXJyb3IgZWRpdG9yLCBlbGVtIHdpbGwgYmUgYSBzbWFsbFxuICAgIC8vIGludmlzaWJsZSB0ZXh0YXJlYSBhbmQgd2hhdCB3ZSByZWFsbHkgd2FudCB0byBwdXQgdGhlIEZpcmVudmltIGVsZW1lbnRcbiAgICAvLyBvdmVyIGlzIHRoZSBwYXJlbnQgZGl2IHRoYXQgY29udGFpbnMgaXQpIGFuZCB0byBnaXZlIGZvY3VzIGJhY2sgdG8gdGhlXG4gICAgLy8gcGFnZSB3aGVuIHRoZSB1c2VyIGFza3MgZm9yIHRoYXQuXG4gICAgcHJpdmF0ZSBvcmlnaW5hbEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIC8vIHJlc2l6ZU9ic2VydmVyIGlzIHVzZWQgaW4gb3JkZXIgdG8gZGV0ZWN0IHdoZW4gdGhlIHNpemUgb2YgdGhlIGVsZW1lbnRcbiAgICAvLyBiZWluZyBlZGl0ZWQgY2hhbmdlZC4gV2hlbiB0aGlzIGhhcHBlbnMsIHdlIHJlc2l6ZSB0aGUgbmVvdmltIGZyYW1lLlxuICAgIC8vIFRPRE86IHBlcmlvZGljYWxseSBjaGVjayBpZiBNUyBpbXBsZW1lbnRlZCBhIFJlc2l6ZU9ic2VydmVyIHR5cGVcbiAgICBwcml2YXRlIHJlc2l6ZU9ic2VydmVyOiBhbnk7XG4gICAgLy8gc3BhbiBpcyB0aGUgc3BhbiBlbGVtZW50IHdlIHVzZSBpbiBvcmRlciB0byBpbnNlcnQgdGhlIG5lb3ZpbSBmcmFtZSBpblxuICAgIC8vIHRoZSBwYWdlLiBUaGUgbmVvdmltIGZyYW1lIGlzIGF0dGFjaGVkIHRvIGl0cyBzaGFkb3cgZG9tLiBVc2luZyBhIHNwYW5cbiAgICAvLyBpcyBtdWNoIGxlc3MgZGlzcnVwdGl2ZSB0byB0aGUgcGFnZSBhbmQgZW5hYmxlcyBhIG1vZGljdW0gb2YgcHJpdmFjeVxuICAgIC8vICh0aGUgcGFnZSB3b24ndCBiZSBhYmxlIHRvIGNoZWNrIHdoYXQncyBpbiBpdCkuIEluIGZpcmVmb3gsIHBhZ2VzIHdpbGxcbiAgICAvLyBzdGlsbCBiZSBhYmxlIHRvIGRldGVjdCB0aGUgbmVvdmltIGZyYW1lIGJ5IHVzaW5nIHdpbmRvdy5mcmFtZXMgdGhvdWdoLlxuICAgIHByaXZhdGUgc3BhbjogSFRNTFNwYW5FbGVtZW50O1xuICAgIC8vIHJlc2l6ZVJlcUlkIGtlZXBzIHRyYWNrIG9mIHRoZSBudW1iZXIgb2YgcmVzaXppbmcgcmVxdWVzdHMgdGhhdCBhcmUgc2VudFxuICAgIC8vIHRvIHRoZSBpZnJhbWUuIFdlIHNlbmQgYW5kIGluY3JlbWVudCBpdCBmb3IgZXZlcnkgcmVzaXplIHJlcXVlc3RzLCB0aGlzXG4gICAgLy8gbGV0cyB0aGUgaWZyYW1lIGtub3cgd2hhdCB0aGUgbW9zdCByZWNlbnRseSBzZW50IHJlc2l6ZSByZXF1ZXN0IGlzIGFuZFxuICAgIC8vIHRodXMgYXZvaWRzIHJlYWN0aW5nIHRvIGFuIG9sZGVyIHJlc2l6ZSByZXF1ZXN0IGlmIGEgbW9yZSByZWNlbnQgaGFzXG4gICAgLy8gYWxyZWFkeSBiZWVuIHByb2Nlc3NlZC5cbiAgICBwcml2YXRlIHJlc2l6ZVJlcUlkID0gMDtcbiAgICAvLyByZWxhdGl2ZVgvWSBpcyB0aGUgcG9zaXRpb24gdGhlIGlmcmFtZSBzaG91bGQgaGF2ZSByZWxhdGl2ZSB0byB0aGUgaW5wdXRcbiAgICAvLyBlbGVtZW50IGluIG9yZGVyIHRvIGJlIGJvdGggYXMgY2xvc2UgYXMgcG9zc2libGUgdG8gdGhlIGlucHV0IGVsZW1lbnRcbiAgICAvLyBhbmQgZml0IGluIHRoZSB3aW5kb3cgd2l0aG91dCBvdmVyZmxvd2luZyBvdXQgb2YgdGhlIHZpZXdwb3J0LlxuICAgIHByaXZhdGUgcmVsYXRpdmVYID0gMDtcbiAgICBwcml2YXRlIHJlbGF0aXZlWSA9IDA7XG4gICAgLy8gZmlyc3RQdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW4ga2VlcHMgdHJhY2sgb2Ygd2hldGhlciB0aGlzIGlzIHRoZVxuICAgIC8vIGZpcnN0IHRpbWUgdGhlIHB1dEVkaXRvckNsb3NlVG9JbnB1dE9yaWdpbiBmdW5jdGlvbiBpcyBjYWxsZWQgZnJvbSB0aGVcbiAgICAvLyBpZnJhbWUuIFNlZSBwdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW5BZnRlclJlc2l6ZUZyb21GcmFtZSgpIGZvciBtb3JlXG4gICAgLy8gaW5mb3JtYXRpb24uXG4gICAgcHJpdmF0ZSBmaXJzdFB1dEVkaXRvckNsb3NlVG9JbnB1dE9yaWdpbiA9IHRydWU7XG4gICAgLy8gb25EZXRhY2ggaXMgYSBjYWxsYmFjayBwcm92aWRlZCBieSB0aGUgY29udGVudCBzY3JpcHQgd2hlbiBpdCBjcmVhdGVzXG4gICAgLy8gdGhlIEZpcmVudmltRWxlbWVudC4gSXQgaXMgY2FsbGVkIHdoZW4gdGhlIGRldGFjaCgpIGZ1bmN0aW9uIGlzIGNhbGxlZCxcbiAgICAvLyBhZnRlciBhbGwgRmlyZW52aW0gZWxlbWVudHMgaGF2ZSBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgcGFnZS5cbiAgICBwcml2YXRlIG9uRGV0YWNoOiAoaWQ6IG51bWJlcikgPT4gYW55O1xuICAgIC8vIGJ1ZmZlckluZm86IGEgW3VybCwgc2VsZWN0b3IsIGN1cnNvciwgbGFuZ10gdHVwbGUgaW5kaWNhdGluZyB0aGUgcGFnZVxuICAgIC8vIHRoZSBsYXN0IGlmcmFtZSB3YXMgY3JlYXRlZCBvbiwgdGhlIHNlbGVjdG9yIG9mIHRoZSBjb3JyZXNwb25kaW5nXG4gICAgLy8gdGV4dGFyZWEgYW5kIHRoZSBjb2x1bW4vbGluZSBudW1iZXIgb2YgdGhlIGN1cnNvci5cbiAgICAvLyBOb3RlIHRoYXQgdGhlc2UgYXJlIF9fZGVmYXVsdF9fIHZhbHVlcy4gUmVhbCB2YWx1ZXMgbXVzdCBiZSBjcmVhdGVkIHdpdGhcbiAgICAvLyBwcmVwYXJlQnVmZmVySW5mbygpLiBUaGUgcmVhc29uIHdlJ3JlIG5vdCBkb2luZyB0aGlzIGZyb20gdGhlXG4gICAgLy8gY29uc3RydWN0b3IgaXMgdGhhdCBpdCdzIGV4cGVuc2l2ZSBhbmQgZGlzcnVwdGl2ZSAtIGdldHRpbmcgdGhpc1xuICAgIC8vIGluZm9ybWF0aW9uIHJlcXVpcmVzIGV2YWx1YXRpbmcgY29kZSBpbiB0aGUgcGFnZSdzIGNvbnRleHQuXG4gICAgcHJpdmF0ZSBidWZmZXJJbmZvID0gKFByb21pc2UucmVzb2x2ZShbXCJcIiwgXCJcIiwgWzEsIDFdLCB1bmRlZmluZWRdKSBhc1xuICAgICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlPFtzdHJpbmcsIHN0cmluZywgW251bWJlciwgbnVtYmVyXSwgc3RyaW5nXT4pO1xuICAgIC8vIGN1cnNvcjogbGFzdCBrbm93biBjdXJzb3IgcG9zaXRpb24uIFVwZGF0ZWQgb24gZ2V0UGFnZUVsZW1lbnRDdXJzb3IgYW5kXG4gICAgLy8gc2V0UGFnZUVsZW1lbnRDdXJzb3JcbiAgICBwcml2YXRlIGN1cnNvciA9IFsxLCAxXSBhcyBbbnVtYmVyLCBudW1iZXJdO1xuXG5cbiAgICAvLyBlbGVtIGlzIHRoZSBlbGVtZW50IHRoYXQgcmVjZWl2ZWQgdGhlIGZvY3VzRXZlbnQuXG4gICAgLy8gTnZpbWlmeSBpcyB0aGUgZnVuY3Rpb24gdGhhdCBsaXN0ZW5zIGZvciBmb2N1cyBldmVudHMuIFdlIG5lZWQgdG8ga25vd1xuICAgIC8vIGFib3V0IGl0IGluIG9yZGVyIHRvIHJlbW92ZSBpdCBiZWZvcmUgZm9jdXNpbmcgZWxlbSAob3RoZXJ3aXNlIHdlJ2xsXG4gICAgLy8ganVzdCBncmFiIGZvY3VzIGFnYWluKS5cbiAgICBjb25zdHJ1Y3RvciAoZWxlbTogSFRNTEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgIGxpc3RlbmVyOiAoZXZ0OiB7IHRhcmdldDogRXZlbnRUYXJnZXQgfSkgPT4gUHJvbWlzZTx2b2lkPixcbiAgICAgICAgICAgICAgICAgb25EZXRhY2g6IChpZDogbnVtYmVyKSA9PiBhbnkpIHtcbiAgICAgICAgdGhpcy5vcmlnaW5hbEVsZW1lbnQgPSBlbGVtO1xuICAgICAgICB0aGlzLm52aW1pZnkgPSBsaXN0ZW5lcjtcbiAgICAgICAgdGhpcy5vbkRldGFjaCA9IG9uRGV0YWNoO1xuICAgICAgICB0aGlzLmVkaXRvciA9IGdldEVkaXRvcihlbGVtKTtcblxuICAgICAgICB0aGlzLnNwYW4gPSBlbGVtXG4gICAgICAgICAgICAub3duZXJEb2N1bWVudFxuICAgICAgICAgICAgLmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIiwgXCJzcGFuXCIpO1xuICAgICAgICB0aGlzLmlmcmFtZSA9IGVsZW1cbiAgICAgICAgICAgIC5vd25lckRvY3VtZW50XG4gICAgICAgICAgICAuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiLCBcImlmcmFtZVwiKSBhcyBIVE1MSUZyYW1lRWxlbWVudDtcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoZXJlIGlzbid0IGFueSBleHRyYSB3aWR0aC9oZWlnaHRcbiAgICAgICAgdGhpcy5pZnJhbWUuc3R5bGUucGFkZGluZyA9IFwiMHB4XCI7XG4gICAgICAgIHRoaXMuaWZyYW1lLnN0eWxlLm1hcmdpbiA9IFwiMHB4XCI7XG4gICAgICAgIHRoaXMuaWZyYW1lLnN0eWxlLmJvcmRlciA9IFwiMHB4XCI7XG4gICAgICAgIC8vIFdlIHN0aWxsIG5lZWQgYSBib3JkZXIsIHVzZSBhIHNoYWRvdyBmb3IgdGhhdFxuICAgICAgICB0aGlzLmlmcmFtZS5zdHlsZS5ib3hTaGFkb3cgPSBcIjBweCAwcHggMXB4IDFweCBibGFja1wiO1xuICAgIH1cblxuICAgIGF0dGFjaFRvUGFnZSAoZmlwOiBQcm9taXNlPG51bWJlcj4pIHtcbiAgICAgICAgdGhpcy5mcmFtZUlkUHJvbWlzZSA9IGZpcC50aGVuKChmOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZnJhbWVJZCA9IGY7XG4gICAgICAgICAgICAvLyBPbmNlIGEgZnJhbWVJZCBoYXMgYmVlbiBhY3F1aXJlZCwgdGhlIEZpcmVudmltRWxlbWVudCB3b3VsZCBkaWVcbiAgICAgICAgICAgIC8vIGlmIGl0cyBzcGFuIHdhcyByZW1vdmVkIGZyb20gdGhlIHBhZ2UuIFRodXMgdGhlcmUgaXMgbm8gdXNlIGluXG4gICAgICAgICAgICAvLyBrZWVwaW5nIGl0cyBzcGFuT2JzZXJ2ZXIgYXJvdW5kLiBJdCdkIGV2ZW4gY2F1c2UgaXNzdWVzIGFzIHRoZVxuICAgICAgICAgICAgLy8gc3Bhbk9ic2VydmVyIHdvdWxkIGF0dGVtcHQgdG8gcmUtaW5zZXJ0IGEgZGVhZCBmcmFtZSBpbiB0aGVcbiAgICAgICAgICAgIC8vIHBhZ2UuXG4gICAgICAgICAgICB0aGlzLnNwYW5PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mcmFtZUlkO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBXZSBkb24ndCBuZWVkIHRoZSBpZnJhbWUgdG8gYmUgYXBwZW5kZWQgdG8gdGhlIHBhZ2UgaW4gb3JkZXIgdG9cbiAgICAgICAgLy8gcmVzaXplIGl0IGJlY2F1c2Ugd2UncmUganVzdCB1c2luZyB0aGUgY29ycmVzcG9uZGluZ1xuICAgICAgICAvLyBpbnB1dC90ZXh0YXJlYSdzIHNpemVcbiAgICAgICAgbGV0IHJlY3QgPSB0aGlzLmdldEVsZW1lbnQoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdGhpcy5yZXNpemVUbyhyZWN0LndpZHRoLCByZWN0LmhlaWdodCwgZmFsc2UpO1xuICAgICAgICB0aGlzLnJlbGF0aXZlWCA9IDA7XG4gICAgICAgIHRoaXMucmVsYXRpdmVZID0gMDtcbiAgICAgICAgdGhpcy5wdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW4oKTtcblxuICAgICAgICAvLyBVc2UgYSBSZXNpemVPYnNlcnZlciB0byBkZXRlY3Qgd2hlbiB0aGUgdW5kZXJseWluZyBpbnB1dCBlbGVtZW50J3NcbiAgICAgICAgLy8gc2l6ZSBjaGFuZ2VzIGFuZCBjaGFuZ2UgdGhlIHNpemUgb2YgdGhlIEZpcmVudmltRWxlbWVudFxuICAgICAgICAvLyBhY2NvcmRpbmdseVxuICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbmV3ICgod2luZG93IGFzIGFueSkuUmVzaXplT2JzZXJ2ZXIpKCgoc2VsZikgPT4gYXN5bmMgKGVudHJpZXM6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbnRyeSA9IGVudHJpZXMuZmluZCgoZW50OiBhbnkpID0+IGVudC50YXJnZXQgPT09IHNlbGYuZ2V0RWxlbWVudCgpKTtcbiAgICAgICAgICAgIGlmIChzZWxmLmZyYW1lSWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZnJhbWVJZFByb21pc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdSZWN0ID0gdGhpcy5nZXRFbGVtZW50KCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlY3Qud2lkdGggPT09IG5ld1JlY3Qud2lkdGggJiYgcmVjdC5oZWlnaHQgPT09IG5ld1JlY3QuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVjdCA9IG5ld1JlY3Q7XG4gICAgICAgICAgICAgICAgc2VsZi5yZXNpemVUbyhyZWN0LndpZHRoLCByZWN0LmhlaWdodCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNlbGYucHV0RWRpdG9yQ2xvc2VUb0lucHV0T3JpZ2luKCk7XG4gICAgICAgICAgICAgICAgc2VsZi5yZXNpemVSZXFJZCArPSAxO1xuICAgICAgICAgICAgICAgIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1lSWQ6IHNlbGYuZnJhbWVJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzOiBbc2VsZi5yZXNpemVSZXFJZCwgcmVjdC53aWR0aCwgcmVjdC5oZWlnaHRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiBbXCJyZXNpemVcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiBbXCJtZXNzYWdlRnJhbWVcIl0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKHRoaXMpKTtcbiAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuZ2V0RWxlbWVudCgpLCB7IGJveDogXCJib3JkZXItYm94XCIgfSk7XG5cbiAgICAgICAgdGhpcy5pZnJhbWUuc3JjID0gKGJyb3dzZXIgYXMgYW55KS5leHRlbnNpb24uZ2V0VVJMKFwiL2luZGV4Lmh0bWxcIik7XG4gICAgICAgIHRoaXMuc3Bhbi5hdHRhY2hTaGFkb3coeyBtb2RlOiBcImNsb3NlZFwiIH0pLmFwcGVuZENoaWxkKHRoaXMuaWZyYW1lKTtcblxuICAgICAgICAvLyBTbyBwYWdlcyAoZS5nLiBKaXJhLCBDb25mbHVlbmNlKSByZW1vdmUgc3BhbnMgZnJvbSB0aGUgcGFnZSBhcyBzb29uXG4gICAgICAgIC8vIGFzIHRoZXkncmUgaW5zZXJ0ZWQuIFdlIGRvbid0IHdhbid0IHRoYXQsIHNvIGZvciB0aGUgNSBzZWNvbmRzXG4gICAgICAgIC8vIGZvbGxvd2luZyB0aGUgaW5zZXJ0aW9uLCBkZXRlY3QgaWYgdGhlIHNwYW4gaXMgcmVtb3ZlZCBmcm9tIHRoZSBwYWdlXG4gICAgICAgIC8vIGJ5IGNoZWNraW5nIHZpc2liaWxpdHkgY2hhbmdlcyBhbmQgcmUtaW5zZXJ0IGlmIG5lZWRlZC5cbiAgICAgICAgbGV0IHJlaW5zZXJ0cyA9IDA7XG4gICAgICAgIHRoaXMuc3Bhbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoXG4gICAgICAgICAgICAoc2VsZiA9PiAobXV0YXRpb25zIDogTXV0YXRpb25SZWNvcmRbXSwgb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNwYW4gPSBzZWxmLmdldFNwYW4oKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbXV0YXRpb24gb2YgbXV0YXRpb25zKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIG11dGF0aW9uLnJlbW92ZWROb2Rlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZSA9PT0gc3Bhbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVpbnNlcnRzICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVpbnNlcnRzID49IDEwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZpcmVudmltIGlzIHRyeWluZyB0byBjcmVhdGUgYW4gaWZyYW1lIG9uIHRoaXMgc2l0ZSBidXQgdGhlIHBhZ2UgaXMgY29uc3RhbnRseSByZW1vdmluZyBpdC4gQ29uc2lkZXIgZGlzYWJsaW5nIEZpcmVudmltIG9uIHRoaXMgd2Vic2l0ZS5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHNlbGYuZ2V0RWxlbWVudCgpLm93bmVyRG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzcGFuKSwgcmVpbnNlcnRzICogMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkodGhpcykpO1xuICAgICAgICB0aGlzLnNwYW5PYnNlcnZlci5vYnNlcnZlKHRoaXMuZ2V0RWxlbWVudCgpLm93bmVyRG9jdW1lbnQuYm9keSwgeyBjaGlsZExpc3Q6IHRydWUgfSk7XG5cbiAgICAgICAgbGV0IHBhcmVudEVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnQoKS5vd25lckRvY3VtZW50LmJvZHk7XG4gICAgICAgIC8vIFdlIGNhbid0IGluc2VydCB0aGUgZnJhbWUgaW4gdGhlIGJvZHkgaWYgdGhlIGVsZW1lbnQgd2UncmUgZ29pbmcgdG9cbiAgICAgICAgLy8gcmVwbGFjZSB0aGUgY29udGVudCBvZiBpcyB0aGUgYm9keSwgYXMgcmVwbGFjaW5nIHRoZSBjb250ZW50IHdvdWxkXG4gICAgICAgIC8vIGRlc3Ryb3kgdGhlIGZyYW1lLlxuICAgICAgICBpZiAocGFyZW50RWxlbWVudCA9PT0gdGhpcy5nZXRFbGVtZW50KCkpIHtcbiAgICAgICAgICAgIHBhcmVudEVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnNwYW4pO1xuXG4gICAgICAgIHRoaXMuZm9jdXMoKTtcblxuICAgICAgICAvLyBJdCBpcyBwcmV0dHkgaGFyZCB0byB0ZWxsIHdoZW4gYW4gZWxlbWVudCBkaXNhcHBlYXJzIGZyb20gdGhlIHBhZ2VcbiAgICAgICAgLy8gKGVpdGhlciBieSBiZWluZyByZW1vdmVkIG9yIGJ5IGJlaW5nIGhpZGRlbiBieSBvdGhlciBlbGVtZW50cyksIHNvXG4gICAgICAgIC8vIHdlIHVzZSBhbiBpbnRlcnNlY3Rpb24gb2JzZXJ2ZXIsIHdoaWNoIGlzIHRyaWdnZXJlZCBldmVyeSB0aW1lIHRoZVxuICAgICAgICAvLyBlbGVtZW50IGJlY29tZXMgbW9yZSBvciBsZXNzIHZpc2libGUuXG4gICAgICAgIHRoaXMuaW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKHNlbGYgPT4gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbSA9IHNlbGYuZ2V0RWxlbWVudCgpO1xuICAgICAgICAgICAgLy8gSWYgZWxlbSBkb2Vzbid0IGhhdmUgYSByZWN0IGFueW1vcmUsIGl0J3MgaGlkZGVuXG4gICAgICAgICAgICBpZiAoZWxlbS5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHNlbGYuaGlkZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkodGhpcyksIHsgcm9vdDogbnVsbCwgdGhyZXNob2xkOiAwLjEgfSk7XG4gICAgICAgIHRoaXMuaW50ZXJzZWN0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmdldEVsZW1lbnQoKSk7XG5cbiAgICAgICAgLy8gV2Ugd2FudCB0byByZW1vdmUgdGhlIEZpcmVudmltRWxlbWVudCBmcm9tIHRoZSBwYWdlIHdoZW4gdGhlXG4gICAgICAgIC8vIGNvcnJlc3BvbmRpbmcgZWxlbWVudCBpcyByZW1vdmVkLiBXZSBkbyB0aGlzIGJ5IGFkZGluZyBhXG4gICAgICAgIC8vIG11dGF0aW9uT2JzZXJ2ZXIgdG8gaXRzIHBhcmVudC5cbiAgICAgICAgdGhpcy5wYWdlT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoc2VsZiA9PiAobXV0YXRpb25zOiBNdXRhdGlvblJlY29yZFtdKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gc2VsZi5nZXRFbGVtZW50KCk7XG4gICAgICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChtdXRhdGlvbiA9PiBtdXRhdGlvbi5yZW1vdmVkTm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB3YWxrZXIgPSBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKG5vZGUsIE5vZGVGaWx0ZXIuU0hPV19BTEwpO1xuICAgICAgICAgICAgICAgIHdoaWxlICh3YWxrZXIubmV4dE5vZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAod2Fsa2VyLmN1cnJlbnROb2RlID09PSBlbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHNlbGYuZGV0YWNoRnJvbVBhZ2UoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pKHRoaXMpKTtcbiAgICAgICAgdGhpcy5wYWdlT2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHtcbiAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICBjaGlsZExpc3Q6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2xlYXJGb2N1c0xpc3RlbmVycyAoKSB7XG4gICAgICAgIC8vIFdoZW4gdGhlIHVzZXIgdHJpZXMgdG8gYDp3IHwgY2FsbCBmaXJlbnZpbSNmb2N1c19wYWdlKClgIGluIE5lb3ZpbSxcbiAgICAgICAgLy8gd2UgaGF2ZSBhIHByb2JsZW0uIGA6d2AgcmVzdWx0cyBpbiBhIGNhbGwgdG8gc2V0UGFnZUVsZW1lbnRDb250ZW50LFxuICAgICAgICAvLyB3aGljaCBjYWxscyBGaXJlbnZpbUVsZW1lbnQuZm9jdXMoKSwgYmVjYXVzZSBzb21lIHBhZ2VzIHRyeSB0byBncmFiXG4gICAgICAgIC8vIGZvY3VzIHdoZW4gdGhlIGNvbnRlbnQgb2YgdGhlIHVuZGVybHlpbmcgZWxlbWVudCBjaGFuZ2VzLlxuICAgICAgICAvLyBGaXJlbnZpbUVsZW1lbnQuZm9jdXMoKSBjcmVhdGVzIGV2ZW50IGxpc3RlbmVycyBhbmQgdGltZW91dHMgdG9cbiAgICAgICAgLy8gZGV0ZWN0IHdoZW4gdGhlIHBhZ2UgdHJpZXMgdG8gZ3JhYiBmb2N1cyBhbmQgYnJpbmcgaXQgYmFjayB0byB0aGVcbiAgICAgICAgLy8gRmlyZW52aW1FbGVtZW50LiBCdXQgc2luY2UgYGNhbGwgZmlyZW52aW0jZm9jdXNfcGFnZSgpYCBoYXBwZW5zXG4gICAgICAgIC8vIHJpZ2h0IGFmdGVyIHRoZSBgOndgLCBmb2N1c19wYWdlKCkgdHJpZ2dlcnMgdGhlIGV2ZW50XG4gICAgICAgIC8vIGxpc3RlbmVycy90aW1lb3V0cyBjcmVhdGVkIGJ5IEZpcmVudmltRWxlbWVudC5mb2N1cygpIVxuICAgICAgICAvLyBTbyB3ZSBuZWVkIGEgd2F5IHRvIGNsZWFyIHRoZSB0aW1lb3V0cyBhbmQgZXZlbnQgbGlzdGVuZXJzIGJlZm9yZVxuICAgICAgICAvLyBwZXJmb3JtaW5nIGZvY3VzX3BhZ2UsIGFuZCB0aGF0J3Mgd2hhdCB0aGlzIGZ1bmN0aW9uIGRvZXMuXG4gICAgICAgIHRoaXMuZm9jdXNJbmZvLmZpbmFsUmVmb2N1c1RpbWVvdXRzLmZvckVhY2godCA9PiBjbGVhclRpbWVvdXQodCkpO1xuICAgICAgICB0aGlzLmZvY3VzSW5mby5yZWZvY3VzVGltZW91dHMuZm9yRWFjaCh0ID0+IGNsZWFyVGltZW91dCh0KSk7XG4gICAgICAgIHRoaXMuZm9jdXNJbmZvLnJlZm9jdXNSZWZzLmZvckVhY2goZiA9PiB7XG4gICAgICAgICAgICB0aGlzLmlmcmFtZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiYmx1clwiLCBmKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudCgpLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBmKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZm9jdXNJbmZvLmZpbmFsUmVmb2N1c1RpbWVvdXRzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuZm9jdXNJbmZvLnJlZm9jdXNUaW1lb3V0cy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLmZvY3VzSW5mby5yZWZvY3VzUmVmcy5sZW5ndGggPSAwO1xuICAgIH1cblxuICAgIGRldGFjaEZyb21QYWdlICgpIHtcbiAgICAgICAgdGhpcy5jbGVhckZvY3VzTGlzdGVuZXJzKCk7XG4gICAgICAgIGNvbnN0IGVsZW0gPSB0aGlzLmdldEVsZW1lbnQoKTtcbiAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci51bm9ic2VydmUoZWxlbSk7XG4gICAgICAgIHRoaXMuaW50ZXJzZWN0aW9uT2JzZXJ2ZXIudW5vYnNlcnZlKGVsZW0pO1xuICAgICAgICB0aGlzLnBhZ2VPYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgIHRoaXMuc3Bhbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgdGhpcy5zcGFuLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLm9uRGV0YWNoKHRoaXMuZnJhbWVJZCk7XG4gICAgfVxuXG4gICAgZm9jdXMgKCkge1xuICAgICAgICAvLyBTb21lIGlucHV0cyB0cnkgdG8gZ3JhYiB0aGUgZm9jdXMgYWdhaW4gYWZ0ZXIgd2UgYXBwZW5kZWQgdGhlIGlmcmFtZVxuICAgICAgICAvLyB0byB0aGUgcGFnZSwgc28gd2UgbmVlZCB0byByZWZvY3VzIGl0IGVhY2ggdGltZSBpdCBsb3NlcyBmb2N1cy4gQnV0XG4gICAgICAgIC8vIHRoZSB1c2VyIG1pZ2h0IHdhbnQgdG8gc3RvcCBmb2N1c2luZyB0aGUgaWZyYW1lIGF0IHNvbWUgcG9pbnQsIHNvIHdlXG4gICAgICAgIC8vIGFjdHVhbGx5IHN0b3AgcmVmb2N1c2luZyB0aGUgaWZyYW1lIGEgc2Vjb25kIGFmdGVyIGl0IGlzIGNyZWF0ZWQuXG4gICAgICAgIGNvbnN0IHJlZm9jdXMgPSAoKHNlbGYpID0+ICgpID0+IHtcbiAgICAgICAgICAgIHNlbGYuZm9jdXNJbmZvLnJlZm9jdXNUaW1lb3V0cy5wdXNoKHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIEZpcnN0LCBkZXN0cm95IGN1cnJlbnQgc2VsZWN0aW9uLiBTb21lIHdlYnNpdGVzIHVzZSB0aGVcbiAgICAgICAgICAgICAgICAvLyBzZWxlY3Rpb24gdG8gZm9yY2UtZm9jdXMgYW4gZWxlbWVudC5cbiAgICAgICAgICAgICAgICBjb25zdCBzZWwgPSBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgICAgICAgICAgICAgIC8vIFRoZXJlJ3MgYSByYWNlIGNvbmRpdGlvbiBpbiB0aGUgdGVzdHN1aXRlIG9uIGNocm9tZSB0aGF0XG4gICAgICAgICAgICAgICAgLy8gcmVzdWx0cyBpbiBzZWxmLnNwYW4gbm90IGJlaW5nIGluIHRoZSBkb2N1bWVudCBhbmQgZXJyb3JzXG4gICAgICAgICAgICAgICAgLy8gYmVpbmcgbG9nZ2VkLCBzbyB3ZSBjaGVjayBpZiBzZWxmLnNwYW4gcmVhbGx5IGlzIGluIGl0c1xuICAgICAgICAgICAgICAgIC8vIG93bmVyRG9jdW1lbnQuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuc3Bhbi5vd25lckRvY3VtZW50LmNvbnRhaW5zKHNlbGYuc3BhbikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2Uuc2V0U3RhcnQoc2VsZi5zcGFuLCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSk7XG4gICAgICAgICAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKTtcbiAgICAgICAgICAgICAgICBzZWxmLmlmcmFtZS5mb2N1cygpO1xuICAgICAgICAgICAgfSwgMCkpO1xuICAgICAgICB9KSh0aGlzKTtcbiAgICAgICAgdGhpcy5mb2N1c0luZm8ucmVmb2N1c1JlZnMucHVzaChyZWZvY3VzKTtcbiAgICAgICAgdGhpcy5pZnJhbWUuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgcmVmb2N1cyk7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudCgpLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCByZWZvY3VzKTtcbiAgICAgICAgdGhpcy5mb2N1c0luZm8uZmluYWxSZWZvY3VzVGltZW91dHMucHVzaChzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHJlZm9jdXMoKTtcbiAgICAgICAgICAgIHRoaXMuaWZyYW1lLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIHJlZm9jdXMpO1xuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50KCkucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIHJlZm9jdXMpO1xuICAgICAgICB9LCAxMDApKTtcbiAgICAgICAgcmVmb2N1cygpO1xuICAgIH1cblxuICAgIGZvY3VzT3JpZ2luYWxFbGVtZW50IChhZGRMaXN0ZW5lcjogYm9vbGVhbikge1xuICAgICAgICAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBhbnkpLmJsdXIoKTtcbiAgICAgICAgdGhpcy5vcmlnaW5hbEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIHRoaXMubnZpbWlmeSk7XG4gICAgICAgIGNvbnN0IHNlbCA9IGRvY3VtZW50LmdldFNlbGVjdGlvbigpO1xuICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgaWYgKHRoaXMub3JpZ2luYWxFbGVtZW50Lm93bmVyRG9jdW1lbnQuY29udGFpbnModGhpcy5vcmlnaW5hbEVsZW1lbnQpKSB7XG4gICAgICAgICAgICByYW5nZS5zZXRTdGFydCh0aGlzLm9yaWdpbmFsRWxlbWVudCwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSk7XG4gICAgICAgIHRoaXMub3JpZ2luYWxFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIHNlbC5hZGRSYW5nZShyYW5nZSk7XG4gICAgICAgIGlmIChhZGRMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5vcmlnaW5hbEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIHRoaXMubnZpbWlmeSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRCdWZmZXJJbmZvICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVmZmVySW5mbztcbiAgICB9XG5cbiAgICBnZXRFZGl0b3IgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lZGl0b3I7XG4gICAgfVxuXG4gICAgZ2V0RWxlbWVudCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRvci5nZXRFbGVtZW50KCk7XG4gICAgfVxuXG4gICAgZ2V0RnJhbWVJZCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZyYW1lSWQ7XG4gICAgfVxuXG4gICAgZ2V0SWZyYW1lICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWZyYW1lO1xuICAgIH1cblxuICAgIGdldFBhZ2VFbGVtZW50Q29udGVudCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEVkaXRvcigpLmdldENvbnRlbnQoKTtcbiAgICB9XG5cbiAgICBnZXRQYWdlRWxlbWVudEN1cnNvciAoKSB7XG4gICAgICAgIGNvbnN0IHAgPSB0aGlzLmVkaXRvci5nZXRDdXJzb3IoKS5jYXRjaCgoKSA9PiBbMSwgMV0pIGFzIFByb21pc2U8W251bWJlciwgbnVtYmVyXT47XG4gICAgICAgIHAudGhlbihjID0+IHRoaXMuY3Vyc29yID0gYyk7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cblxuICAgIGdldFNlbGVjdG9yICgpIHtcbiAgICAgICAgcmV0dXJuIGNvbXB1dGVTZWxlY3Rvcih0aGlzLmdldEVsZW1lbnQoKSk7XG4gICAgfVxuXG4gICAgZ2V0U3BhbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNwYW47XG4gICAgfVxuXG4gICAgaGlkZSAoKSB7XG4gICAgICAgIHRoaXMuaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9XG5cbiAgICBpc0ZvY3VzZWQgKCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy5zcGFuXG4gICAgICAgICAgICB8fCBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSB0aGlzLmlmcmFtZTtcbiAgICB9XG5cbiAgICBwcmVwYXJlQnVmZmVySW5mbyAoKSB7XG4gICAgICAgIHRoaXMuYnVmZmVySW5mbyA9IChhc3luYyAoKSA9PiBbXG4gICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmLFxuICAgICAgICAgICAgdGhpcy5nZXRTZWxlY3RvcigpLFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRQYWdlRWxlbWVudEN1cnNvcigpLFxuICAgICAgICAgICAgYXdhaXQgKHRoaXMuZWRpdG9yLmdldExhbmd1YWdlKCkuY2F0Y2goKCkgPT4gdW5kZWZpbmVkKSlcbiAgICAgICAgXSkoKSBhcyBQcm9taXNlPFtzdHJpbmcsIHN0cmluZywgW251bWJlciwgbnVtYmVyXSwgc3RyaW5nXT47XG4gICAgfVxuXG4gICAgcHJlc3NLZXlzIChrZXlzOiBLZXlib2FyZEV2ZW50W10pIHtcbiAgICAgICAgY29uc3QgZm9jdXNlZCA9IHRoaXMuaXNGb2N1c2VkKCk7XG4gICAgICAgIGtleXMuZm9yRWFjaChldiA9PiB0aGlzLm9yaWdpbmFsRWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2KSk7XG4gICAgICAgIGlmIChmb2N1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW4gKCkge1xuICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5lZGl0b3IuZ2V0RWxlbWVudCgpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIC8vIFNhdmUgYXR0cmlidXRlc1xuICAgICAgICBjb25zdCBwb3NBdHRycyA9IFtcImxlZnRcIiwgXCJwb3NpdGlvblwiLCBcInRvcFwiLCBcInpJbmRleFwiXTtcbiAgICAgICAgY29uc3Qgb2xkUG9zQXR0cnMgPSBwb3NBdHRycy5tYXAoKGF0dHI6IGFueSkgPT4gdGhpcy5pZnJhbWUuc3R5bGVbYXR0cl0pO1xuXG4gICAgICAgIC8vIEFzc2lnbiBuZXcgdmFsdWVzXG4gICAgICAgIHRoaXMuaWZyYW1lLnN0eWxlLmxlZnQgPSBgJHtyZWN0LmxlZnQgKyB3aW5kb3cuc2Nyb2xsWCArIHRoaXMucmVsYXRpdmVYfXB4YDtcbiAgICAgICAgdGhpcy5pZnJhbWUuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAgIHRoaXMuaWZyYW1lLnN0eWxlLnRvcCA9IGAke3JlY3QudG9wICsgd2luZG93LnNjcm9sbFkgKyB0aGlzLnJlbGF0aXZlWX1weGA7XG4gICAgICAgIC8vIDIxMzk5OTk5OTUgaXMgaG9wZWZ1bGx5IGhpZ2hlciB0aGFuIGV2ZXJ5dGhpbmcgZWxzZSBvbiB0aGUgcGFnZSBidXRcbiAgICAgICAgLy8gbG93ZXIgdGhhbiBWaW1pdW0ncyBlbGVtZW50c1xuICAgICAgICB0aGlzLmlmcmFtZS5zdHlsZS56SW5kZXggPSBcIjIxMzk5OTk5OTVcIjtcblxuICAgICAgICAvLyBDb21wYXJlLCB0byBrbm93IHdoZXRoZXIgdGhlIGVsZW1lbnQgbW92ZWQgb3Igbm90XG4gICAgICAgIGNvbnN0IHBvc0NoYW5nZWQgPSAhIXBvc0F0dHJzLmZpbmQoKGF0dHI6IGFueSwgaW5kZXgpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pZnJhbWUuc3R5bGVbYXR0cl0gIT09IG9sZFBvc0F0dHJzW2luZGV4XSk7XG4gICAgICAgIHJldHVybiB7IHBvc0NoYW5nZWQsIG5ld1JlY3Q6IHJlY3QgfTtcbiAgICB9XG5cbiAgICBwdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW5BZnRlclJlc2l6ZUZyb21GcmFtZSAoKSB7XG4gICAgICAgIC8vIFRoaXMgaXMgYSB2ZXJ5IHdlaXJkLCBjb21wbGljYXRlZCBhbmQgYmFkIHBpZWNlIG9mIGNvZGUuIEFsbCBjYWxsc1xuICAgICAgICAvLyB0byBgcmVzaXplRWRpdG9yKClgIGhhdmUgdG8gcmVzdWx0IGluIGEgY2FsbCB0byBgcmVzaXplVG8oKWAgYW5kXG4gICAgICAgIC8vIHRoZW4gYHB1dEVkaXRvckNsb3NlVG9JbnB1dE9yaWdpbigpYCBpbiBvcmRlciB0byBtYWtlIHN1cmUgdGhlXG4gICAgICAgIC8vIGlmcmFtZSBkb2Vzbid0IG92ZXJmbG93IGZyb20gdGhlIHZpZXdwb3J0LlxuICAgICAgICAvLyBIb3dldmVyLCB3aGVuIHdlIGNyZWF0ZSB0aGUgaWZyYW1lLCB3ZSBkb24ndCB3YW50IGl0IHRvIGZpdCBpbiB0aGVcbiAgICAgICAgLy8gdmlld3BvcnQgYXQgYWxsIGNvc3QuIEluc3RlYWQsIHdlIHdhbnQgaXQgdG8gY292ZXIgdGhlIHVuZGVybHlpbmdcbiAgICAgICAgLy8gaW5wdXQgYXMgbXVjaCBhcyBwb3NzaWJsZS4gVGhlIHByb2JsZW0gaXMgdGhhdCB3aGVuIGl0IGlzIGNyZWF0ZWQsXG4gICAgICAgIC8vIHRoZSBpZnJhbWUgd2lsbCBhc2sgZm9yIGEgcmVzaXplIChiZWNhdXNlIE5lb3ZpbSBhc2tzIGZvciBvbmUpIGFuZFxuICAgICAgICAvLyB3aWxsIHRodXMgYWxzbyBhY2NpZGVudGFsbHkgY2FsbCBwdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW4sIHdoaWNoXG4gICAgICAgIC8vIHdlIGRvbid0IHdhbnQgdG8gY2FsbC5cbiAgICAgICAgLy8gU28gd2UgaGF2ZSB0byB0cmFjayB0aGUgY2FsbHMgdG8gcHV0RWRpdG9yQ2xvc2VUb0lucHV0T3JpZ2luIHRoYXRcbiAgICAgICAgLy8gYXJlIG1hZGUgZnJvbSB0aGUgaWZyYW1lIChpLmUuIGZyb20gYHJlc2l6ZUVkaXRvcigpYCkgYW5kIGlnbm9yZSB0aGVcbiAgICAgICAgLy8gZmlyc3Qgb25lLlxuICAgICAgICBpZiAodGhpcy5maXJzdFB1dEVkaXRvckNsb3NlVG9JbnB1dE9yaWdpbikge1xuICAgICAgICAgICAgdGhpcy5yZWxhdGl2ZVggPSAwO1xuICAgICAgICAgICAgdGhpcy5yZWxhdGl2ZVkgPSAwO1xuICAgICAgICAgICAgdGhpcy5maXJzdFB1dEVkaXRvckNsb3NlVG9JbnB1dE9yaWdpbiA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnB1dEVkaXRvckNsb3NlVG9JbnB1dE9yaWdpbigpO1xuICAgIH1cblxuICAgIC8vIFJlc2l6ZSB0aGUgaWZyYW1lLCBtYWtpbmcgc3VyZSBpdCBkb2Vzbid0IGdldCBsYXJnZXIgdGhhbiB0aGUgd2luZG93XG4gICAgcmVzaXplVG8gKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCB3YXJuSWZyYW1lOiBib29sZWFuKSB7XG4gICAgICAgIC8vIElmIHRoZSBkaW1lbnNpb25zIHRoYXQgYXJlIGFza2VkIGZvciBhcmUgdG9vIGJpZywgbWFrZSB0aGVtIGFzIGJpZ1xuICAgICAgICAvLyBhcyB0aGUgd2luZG93XG4gICAgICAgIGxldCBjYW50RnVsbHlSZXNpemUgPSBmYWxzZTtcbiAgICAgICAgbGV0IGF2YWlsYWJsZVdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIGlmIChhdmFpbGFibGVXaWR0aCA+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCkge1xuICAgICAgICAgICAgYXZhaWxhYmxlV2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpZHRoID49IGF2YWlsYWJsZVdpZHRoKSB7XG4gICAgICAgICAgICB3aWR0aCA9IGF2YWlsYWJsZVdpZHRoIC0gMTtcbiAgICAgICAgICAgIGNhbnRGdWxseVJlc2l6ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGF2YWlsYWJsZUhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgaWYgKGF2YWlsYWJsZUhlaWdodCA+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpIHtcbiAgICAgICAgICAgIGF2YWlsYWJsZUhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhlaWdodCA+PSBhdmFpbGFibGVIZWlnaHQpIHtcbiAgICAgICAgICAgIGhlaWdodCA9IGF2YWlsYWJsZUhlaWdodCAtIDE7XG4gICAgICAgICAgICBjYW50RnVsbHlSZXNpemUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIGRpbWVuc2lvbnMgdGhhdCB3ZXJlIGFza2VkIGZvciBtaWdodCBtYWtlIHRoZSBpZnJhbWUgb3ZlcmZsb3cuXG4gICAgICAgIC8vIEluIHRoaXMgY2FzZSwgd2UgbmVlZCB0byBjb21wdXRlIGhvdyBtdWNoIHdlIG5lZWQgdG8gbW92ZSB0aGUgaWZyYW1lXG4gICAgICAgIC8vIHRvIHRoZSBsZWZ0L3RvcCBpbiBvcmRlciB0byBoYXZlIGl0IGJvdHRvbS1yaWdodCBjb3JuZXIgc2l0IHJpZ2h0IGluXG4gICAgICAgIC8vIHRoZSB3aW5kb3cncyBib3R0b20tcmlnaHQgY29ybmVyLlxuICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5lZGl0b3IuZ2V0RWxlbWVudCgpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCByaWdodE92ZXJmbG93ID0gYXZhaWxhYmxlV2lkdGggLSAocmVjdC5sZWZ0ICsgd2lkdGgpO1xuICAgICAgICB0aGlzLnJlbGF0aXZlWCA9IHJpZ2h0T3ZlcmZsb3cgPCAwID8gcmlnaHRPdmVyZmxvdyA6IDA7XG4gICAgICAgIGNvbnN0IGJvdHRvbU92ZXJmbG93ID0gYXZhaWxhYmxlSGVpZ2h0IC0gKHJlY3QudG9wICsgaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5yZWxhdGl2ZVkgPSBib3R0b21PdmVyZmxvdyA8IDAgPyBib3R0b21PdmVyZmxvdyA6IDA7XG5cbiAgICAgICAgLy8gTm93IGFjdHVhbGx5IHNldCB0aGUgd2lkdGgvaGVpZ2h0LCBtb3ZlIHRoZSBlZGl0b3Igd2hlcmUgaXQgaXNcbiAgICAgICAgLy8gc3VwcG9zZWQgdG8gYmUgYW5kIGlmIHRoZSBuZXcgaWZyYW1lIGNhbid0IGJlIGFzIGJpZyBhcyByZXF1ZXN0ZWQsXG4gICAgICAgIC8vIHdhcm4gdGhlIGlmcmFtZSBzY3JpcHQuXG4gICAgICAgIHRoaXMuaWZyYW1lLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9cHhgO1xuICAgICAgICB0aGlzLmlmcmFtZS5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9cHhgO1xuICAgICAgICBpZiAoY2FudEZ1bGx5UmVzaXplICYmIHdhcm5JZnJhbWUpIHtcbiAgICAgICAgICAgIHRoaXMucmVzaXplUmVxSWQgKz0gMTtcbiAgICAgICAgICAgIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgYXJnczoge1xuICAgICAgICAgICAgICAgICAgICBmcmFtZUlkOiB0aGlzLmZyYW1lSWQsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3M6IFt0aGlzLnJlc2l6ZVJlcUlkLCB3aWR0aCwgaGVpZ2h0XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiBbXCJyZXNpemVcIl0sXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiBbXCJtZXNzYWdlRnJhbWVcIl0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbmRLZXkgKGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgYXJnczoge1xuICAgICAgICAgICAgICAgIGZyYW1lSWQ6IHRoaXMuZnJhbWVJZCxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3M6IFtrZXldLFxuICAgICAgICAgICAgICAgICAgICBmdW5jTmFtZTogW1wiZnJhbWVfc2VuZEtleVwiXSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY05hbWU6IFtcIm1lc3NhZ2VGcmFtZVwiXSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0UGFnZUVsZW1lbnRDb250ZW50ICh0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgZm9jdXNlZCA9IHRoaXMuaXNGb2N1c2VkKCk7XG4gICAgICAgIHRoaXMuZWRpdG9yLnNldENvbnRlbnQodGV4dCk7XG4gICAgICAgIFtcbiAgICAgICAgICAgIG5ldyBFdmVudChcImtleWRvd25cIiwgICAgIHsgYnViYmxlczogdHJ1ZSB9KSxcbiAgICAgICAgICAgIG5ldyBFdmVudChcImtleXVwXCIsICAgICAgIHsgYnViYmxlczogdHJ1ZSB9KSxcbiAgICAgICAgICAgIG5ldyBFdmVudChcImtleXByZXNzXCIsICAgIHsgYnViYmxlczogdHJ1ZSB9KSxcbiAgICAgICAgICAgIG5ldyBFdmVudChcImJlZm9yZWlucHV0XCIsIHsgYnViYmxlczogdHJ1ZSB9KSxcbiAgICAgICAgICAgIG5ldyBFdmVudChcImlucHV0XCIsICAgICAgIHsgYnViYmxlczogdHJ1ZSB9KSxcbiAgICAgICAgICAgIG5ldyBFdmVudChcImNoYW5nZVwiLCAgICAgIHsgYnViYmxlczogdHJ1ZSB9KVxuICAgICAgICBdLmZvckVhY2goZXYgPT4gdGhpcy5vcmlnaW5hbEVsZW1lbnQuZGlzcGF0Y2hFdmVudChldikpO1xuICAgICAgICBpZiAoZm9jdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0UGFnZUVsZW1lbnRDdXJzb3IgKGxpbmU6IG51bWJlciwgY29sdW1uOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHAgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgdGhpcy5jdXJzb3JbMF0gPSBsaW5lO1xuICAgICAgICB0aGlzLmN1cnNvclsxXSA9IGNvbHVtbjtcbiAgICAgICAgaWYgKHRoaXMuaXNGb2N1c2VkKCkpIHtcbiAgICAgICAgICAgIHAgPSB0aGlzLmVkaXRvci5zZXRDdXJzb3IobGluZSwgY29sdW1uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG5cbiAgICBzaG93ICgpIHtcbiAgICAgICAgdGhpcy5pZnJhbWUuc3R5bGUuZGlzcGxheSA9IFwiaW5pdGlhbFwiO1xuICAgIH1cblxufVxuIiwiXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXV0b2ZpbGwoKSB7XG4gICAgY29uc3QgcGxhdEluZm9Qcm9taXNlID0gYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgYXJnczoge1xuICAgICAgICAgICAgYXJnczogW10sXG4gICAgICAgICAgICBmdW5jTmFtZTogW1wiYnJvd3NlclwiLCBcInJ1bnRpbWVcIiwgXCJnZXRQbGF0Zm9ybUluZm9cIl0sXG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmNOYW1lOiBbXCJleGVjXCJdLFxuICAgIH0pO1xuICAgIGNvbnN0IG1hbmlmZXN0UHJvbWlzZSA9IGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICAgIGFyZ3M6IFtdLFxuICAgICAgICAgICAgZnVuY05hbWU6IFtcImJyb3dzZXJcIiwgXCJydW50aW1lXCIsIFwiZ2V0TWFuaWZlc3RcIl0sXG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmNOYW1lOiBbXCJleGVjXCJdLFxuICAgIH0pO1xuICAgIGNvbnN0IG52aW1QbHVnaW5Qcm9taXNlID0gYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgYXJnczoge30sXG4gICAgICAgIGZ1bmNOYW1lOiBbXCJnZXROdmltUGx1Z2luVmVyc2lvblwiXSxcbiAgICB9KTtcbiAgICBjb25zdCBpc3N1ZVRlbXBsYXRlUHJvbWlzZSA9IGZldGNoKGJyb3dzZXIucnVudGltZS5nZXRVUkwoXCJJU1NVRV9URU1QTEFURS5tZFwiKSkudGhlbihwID0+IHAudGV4dCgpKTtcbiAgICBjb25zdCBicm93c2VyU3RyaW5nID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvKGZpcmVmb3h8Y2hyb20pW14gXSsvZ2kpO1xuICAgIGxldCBuYW1lID0gXCJcIjtcbiAgICBsZXQgdmVyc2lvbiA9IFwiXCI7XG4gICAgaWYgKGJyb3dzZXJTdHJpbmcpIHtcbiAgICAgICAgWyBuYW1lLCB2ZXJzaW9uIF0gPSBicm93c2VyU3RyaW5nWzBdLnNwbGl0KFwiL1wiKTtcbiAgICB9XG4gICAgY29uc3QgdmVuZG9yID0gbmF2aWdhdG9yLnZlbmRvciB8fCBcIlwiO1xuICAgIGNvbnN0IHRleHRhcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpc3N1ZV9ib2R5XCIpIGFzIGFueTtcbiAgICBjb25zdCBbXG4gICAgICAgIHBsYXRJbmZvLFxuICAgICAgICBtYW5pZmVzdCxcbiAgICAgICAgbnZpbVBsdWdpblZlcnNpb24sXG4gICAgICAgIGlzc3VlVGVtcGxhdGUsXG4gICAgXSA9IGF3YWl0IFByb21pc2UuYWxsKFtwbGF0SW5mb1Byb21pc2UsIG1hbmlmZXN0UHJvbWlzZSwgbnZpbVBsdWdpblByb21pc2UsIGlzc3VlVGVtcGxhdGVQcm9taXNlXSk7XG4gICAgLy8gQ2FuJ3QgaGFwcGVuLCBidXQgZG9lc24ndCBjb3N0IG11Y2ggdG8gaGFuZGxlIVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKCF0ZXh0YXJlYSB8fCB0ZXh0YXJlYS52YWx1ZS5yZXBsYWNlKC9cXHIvZywgXCJcIikgIT09IGlzc3VlVGVtcGxhdGUucmVwbGFjZSgvXFxyL2csIFwiXCIpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGV4dGFyZWEudmFsdWUgPSBpc3N1ZVRlbXBsYXRlXG4gICAgICAgIC5yZXBsYWNlKFwiT1MgVmVyc2lvbjpcIiwgYE9TIFZlcnNpb246ICR7cGxhdEluZm8ub3N9ICR7cGxhdEluZm8uYXJjaH1gKVxuICAgICAgICAucmVwbGFjZShcIkJyb3dzZXIgVmVyc2lvbjpcIiwgYEJyb3dzZXIgVmVyc2lvbjogJHt2ZW5kb3J9ICR7bmFtZX0gJHt2ZXJzaW9ufWApXG4gICAgICAgIC5yZXBsYWNlKFwiQnJvd3NlciBBZGRvbiBWZXJzaW9uOlwiLCBgQnJvd3NlciBBZGRvbiBWZXJzaW9uOiAke21hbmlmZXN0LnZlcnNpb259YClcbiAgICAgICAgLnJlcGxhY2UoXCJOZW92aW0gUGx1Z2luIFZlcnNpb246XCIsIGBOZW92aW0gUGx1Z2luIFZlcnNpb246ICR7bnZpbVBsdWdpblZlcnNpb259YCk7XG59XG4iLCJpbXBvcnQgeyBnZXRDb25mIH0gZnJvbSBcIi4vdXRpbHMvY29uZmlndXJhdGlvblwiO1xuaW1wb3J0IHsgZ2V0TmVvdmltRnJhbWVGdW5jdGlvbnMsIGdldEFjdGl2ZUNvbnRlbnRGdW5jdGlvbnMsIGdldFRhYkZ1bmN0aW9ucyB9IGZyb20gXCIuL3BhZ2UvZnVuY3Rpb25zXCI7XG5pbXBvcnQgeyBGaXJlbnZpbUVsZW1lbnQgfSBmcm9tIFwiLi9GaXJlbnZpbUVsZW1lbnRcIjtcblxuLy8gUHJvbWlzZSB1c2VkIHRvIGltcGxlbWVudCBhIGxvY2tpbmcgbWVjaGFuaXNtIHByZXZlbnRpbmcgY29uY3VycmVudCBjcmVhdGlvblxuLy8gb2YgbmVvdmltIGZyYW1lc1xubGV0IGZyYW1lSWRMb2NrID0gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbmV4cG9ydCBjb25zdCBmaXJlbnZpbUdsb2JhbCA9IHtcbiAgICAvLyBXaGV0aGVyIEZpcmVudmltIGlzIGRpc2FibGVkIGluIHRoaXMgdGFiXG4gICAgZGlzYWJsZWQ6IGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgYXJnczogW1wiZGlzYWJsZWRcIl0sXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6IFtcImdldFRhYlZhbHVlXCJdLFxuICAgICAgICB9KVxuICAgICAgICAvLyBOb3RlOiB0aGlzIHJlbGllcyBvbiBzZXREaXNhYmxlZCBleGlzdGluZyBpbiB0aGUgb2JqZWN0IHJldHVybmVkIGJ5XG4gICAgICAgIC8vIGdldEZ1bmN0aW9ucyBhbmQgYXR0YWNoZWQgdG8gdGhlIHdpbmRvdyBvYmplY3RcbiAgICAgICAgLnRoZW4oKGRpc2FibGVkOiBib29sZWFuKSA9PiAod2luZG93IGFzIGFueSkuc2V0RGlzYWJsZWQoZGlzYWJsZWQpKSxcbiAgICAvLyBQcm9taXNlLXJlc29sdXRpb24gZnVuY3Rpb24gY2FsbGVkIHdoZW4gYSBmcmFtZUlkIGlzIHJlY2VpdmVkIGZyb20gdGhlXG4gICAgLy8gYmFja2dyb3VuZCBzY3JpcHRcbiAgICBmcmFtZUlkUmVzb2x2ZTogKF86IG51bWJlcik6IHZvaWQgPT4gdW5kZWZpbmVkLFxuICAgIC8vIGxhc3RGb2N1c2VkQ29udGVudFNjcmlwdCBrZWVwcyB0cmFjayBvZiB0aGUgbGFzdCBjb250ZW50IGZyYW1lIHRoYXQgaGFzXG4gICAgLy8gYmVlbiBmb2N1c2VkLiBUaGlzIGlzIG5lY2Vzc2FyeSBpbiBwYWdlcyB0aGF0IGNvbnRhaW4gbXVsdGlwbGUgZnJhbWVzXG4gICAgLy8gKGFuZCB0aHVzIG11bHRpcGxlIGNvbnRlbnQgc2NyaXB0cyk6IGZvciBleGFtcGxlLCBpZiB1c2VycyBwcmVzcyB0aGVcbiAgICAvLyBnbG9iYWwga2V5Ym9hcmQgc2hvcnRjdXQgPEMtbj4sIHRoZSBiYWNrZ3JvdW5kIHNjcmlwdCBzZW5kcyBhIFwiZ2xvYmFsXCJcbiAgICAvLyBtZXNzYWdlIHRvIGFsbCBvZiB0aGUgYWN0aXZlIHRhYidzIGNvbnRlbnQgc2NyaXB0cy4gRm9yIGEgY29udGVudCBzY3JpcHRcbiAgICAvLyB0byBrbm93IGlmIGl0IHNob3VsZCByZWFjdCB0byBhIGdsb2JhbCBtZXNzYWdlLCBpdCBqdXN0IG5lZWRzIHRvIGNoZWNrXG4gICAgLy8gaWYgaXQgaXMgdGhlIGxhc3QgYWN0aXZlIGNvbnRlbnQgc2NyaXB0LlxuICAgIGxhc3RGb2N1c2VkQ29udGVudFNjcmlwdDogMCxcbiAgICAvLyBudmltaWZ5OiB0cmlnZ2VyZWQgd2hlbiBhbiBlbGVtZW50IGlzIGZvY3VzZWQsIHRha2VzIGNhcmUgb2YgY3JlYXRpbmdcbiAgICAvLyB0aGUgZWRpdG9yIGlmcmFtZSwgYXBwZW5kaW5nIGl0IHRvIHRoZSBwYWdlIGFuZCBmb2N1c2luZyBpdC5cbiAgICBudmltaWZ5OiBhc3luYyAoZXZ0OiB7IHRhcmdldDogRXZlbnRUYXJnZXQgfSkgPT4ge1xuICAgICAgICBpZiAoZmlyZW52aW1HbG9iYWwuZGlzYWJsZWQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICBhd2FpdCBmaXJlbnZpbUdsb2JhbC5kaXNhYmxlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdoZW4gY3JlYXRpbmcgbmV3IGZyYW1lcywgd2UgbmVlZCB0byBrbm93IHRoZWlyIGZyYW1lSWQgaW4gb3JkZXIgdG9cbiAgICAgICAgLy8gY29tbXVuaWNhdGUgd2l0aCB0aGVtLiBUaGlzIGNhbid0IGJlIHJldHJpZXZlZCB0aHJvdWdoIGFcbiAgICAgICAgLy8gc3luY2hyb25vdXMsIGluLXBhZ2UgY2FsbCBzbyB0aGUgbmV3IGZyYW1lIGhhcyB0byB0ZWxsIHRoZVxuICAgICAgICAvLyBiYWNrZ3JvdW5kIHNjcmlwdCB0byBzZW5kIGl0cyBmcmFtZSBpZCB0byB0aGUgcGFnZS4gUHJvYmxlbSBpcywgaWZcbiAgICAgICAgLy8gbXVsdGlwbGUgZnJhbWVzIGFyZSBjcmVhdGVkIGluIGEgdmVyeSBzaG9ydCBhbW91bnQgb2YgdGltZSwgd2VcbiAgICAgICAgLy8gYXJlbid0IGd1YXJhbnRlZWQgdG8gcmVjZWl2ZSB0aGVzZSBmcmFtZUlkcyBpbiB0aGUgb3JkZXIgaW4gd2hpY2hcbiAgICAgICAgLy8gdGhlIGZyYW1lcyB3ZXJlIGNyZWF0ZWQuIFNvIHdlIGhhdmUgdG8gaW1wbGVtZW50IGEgbG9ja2luZyBtZWNoYW5pc21cbiAgICAgICAgLy8gdG8gbWFrZSBzdXJlIHRoYXQgd2UgZG9uJ3QgY3JlYXRlIG5ldyBmcmFtZXMgdW50aWwgd2UgcmVjZWl2ZWQgdGhlXG4gICAgICAgIC8vIGZyYW1lSWQgb2YgdGhlIHByZXZpb3VzbHkgY3JlYXRlZCBmcmFtZS5cbiAgICAgICAgbGV0IGxvY2s7XG4gICAgICAgIHdoaWxlIChsb2NrICE9PSBmcmFtZUlkTG9jaykge1xuICAgICAgICAgICAgbG9jayA9IGZyYW1lSWRMb2NrO1xuICAgICAgICAgICAgYXdhaXQgZnJhbWVJZExvY2s7XG4gICAgICAgIH1cblxuICAgICAgICBmcmFtZUlkTG9jayA9IG5ldyBQcm9taXNlKGFzeW5jICh1bmxvY2s6IGFueSkgPT4ge1xuICAgICAgICAgICAgLy8gYXV0byBpcyB0cnVlIHdoZW4gbnZpbWlmeSgpIGlzIGNhbGxlZCBhcyBhbiBldmVudCBsaXN0ZW5lciwgZmFsc2VcbiAgICAgICAgICAgIC8vIHdoZW4gY2FsbGVkIGZyb20gZm9yY2VOdmltaWZ5KClcbiAgICAgICAgICAgIGNvbnN0IGF1dG8gPSAoZXZ0IGluc3RhbmNlb2YgRm9jdXNFdmVudCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHRha2VvdmVyID0gZ2V0Q29uZigpLnRha2VvdmVyO1xuICAgICAgICAgICAgaWYgKGZpcmVudmltR2xvYmFsLmRpc2FibGVkIHx8IChhdXRvICYmIHRha2VvdmVyID09PSBcIm5ldmVyXCIpKSB7XG4gICAgICAgICAgICAgICAgdW5sb2NrKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBmaXJlbnZpbSA9IG5ldyBGaXJlbnZpbUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgZXZ0LnRhcmdldCBhcyBIVE1MRWxlbWVudCxcbiAgICAgICAgICAgICAgICBmaXJlbnZpbUdsb2JhbC5udmltaWZ5LFxuICAgICAgICAgICAgICAgIChpZDogbnVtYmVyKSA9PiBmaXJlbnZpbUdsb2JhbC5maXJlbnZpbUVsZW1zLmRlbGV0ZShpZClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBlZGl0b3IgPSBmaXJlbnZpbS5nZXRFZGl0b3IoKTtcblxuICAgICAgICAgICAgLy8gSWYgdGhpcyBlbGVtZW50IGFscmVhZHkgaGFzIGEgbmVvdmltIGZyYW1lLCBzdG9wXG4gICAgICAgICAgICBjb25zdCBhbHJlYWR5UnVubmluZyA9IEFycmF5LmZyb20oZmlyZW52aW1HbG9iYWwuZmlyZW52aW1FbGVtcy52YWx1ZXMoKSlcbiAgICAgICAgICAgICAgICAuZmluZCgoaW5zdGFuY2UpID0+IGluc3RhbmNlLmdldEVsZW1lbnQoKSA9PT0gZWRpdG9yLmdldEVsZW1lbnQoKSk7XG4gICAgICAgICAgICBpZiAoYWxyZWFkeVJ1bm5pbmcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8vIFRoZSBzcGFuIG1pZ2h0IGhhdmUgYmVlbiByZW1vdmVkIGZyb20gdGhlIHBhZ2UgYnkgdGhlIHBhZ2VcbiAgICAgICAgICAgICAgICAvLyAodGhpcyBoYXBwZW5zIG9uIEppcmEvQ29uZmx1ZW5jZSBmb3IgZXhhbXBsZSkgc28gd2UgY2hlY2tcbiAgICAgICAgICAgICAgICAvLyBmb3IgdGhhdC5cbiAgICAgICAgICAgICAgICBjb25zdCBzcGFuID0gYWxyZWFkeVJ1bm5pbmcuZ2V0U3BhbigpO1xuICAgICAgICAgICAgICAgIGlmIChzcGFuLm93bmVyRG9jdW1lbnQuY29udGFpbnMoc3BhbikpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxyZWFkeVJ1bm5pbmcuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICBhbHJlYWR5UnVubmluZy5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB1bmxvY2soKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzcGFuIGhhcyBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgcGFnZSwgdGhlIGVkaXRvclxuICAgICAgICAgICAgICAgICAgICAvLyBpcyBkZWFkIGJlY2F1c2UgcmVtb3ZpbmcgYW4gaWZyYW1lIGZyb20gdGhlIHBhZ2Uga2lsbHNcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHdlYnNvY2tldCBjb25uZWN0aW9uIGluc2lkZSBvZiBpdC5cbiAgICAgICAgICAgICAgICAgICAgLy8gV2UganVzdCB0ZWxsIHRoZSBlZGl0b3IgdG8gY2xlYW4gaXRzZWxmIHVwIGFuZCBnbyBvbiBhc1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiBpdCBkaWRuJ3QgZXhpc3QuXG4gICAgICAgICAgICAgICAgICAgIGFscmVhZHlSdW5uaW5nLmRldGFjaEZyb21QYWdlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYXV0byAmJiAodGFrZW92ZXIgPT09IFwiZW1wdHlcIiB8fCB0YWtlb3ZlciA9PT0gXCJub25lbXB0eVwiKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSAoYXdhaXQgZWRpdG9yLmdldENvbnRlbnQoKSkudHJpbSgpO1xuICAgICAgICAgICAgICAgIGlmICgoY29udGVudCAhPT0gXCJcIiAmJiB0YWtlb3ZlciA9PT0gXCJlbXB0eVwiKVxuICAgICAgICAgICAgICAgICAgICB8fCAoY29udGVudCA9PT0gXCJcIiAmJiB0YWtlb3ZlciA9PT0gXCJub25lbXB0eVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdW5sb2NrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZmlyZW52aW0ucHJlcGFyZUJ1ZmZlckluZm8oKTtcbiAgICAgICAgICAgIGNvbnN0IGZyYW1lSWRQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmU6IChfOiBudW1iZXIpID0+IHZvaWQsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGZpcmVudmltR2xvYmFsLmZyYW1lSWRSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBtYWtlIHRoaXMgdGltZW91dCB0aGUgc2FtZSBhcyB0aGUgb25lIGluIGJhY2tncm91bmQudHNcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHJlamVjdCwgMTAwMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmcmFtZUlkUHJvbWlzZS50aGVuKChmcmFtZUlkOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICBmaXJlbnZpbUdsb2JhbC5maXJlbnZpbUVsZW1zLnNldChmcmFtZUlkLCBmaXJlbnZpbSk7XG4gICAgICAgICAgICAgICAgZmlyZW52aW1HbG9iYWwuZnJhbWVJZFJlc29sdmUgPSAoKSA9PiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdW5sb2NrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZyYW1lSWRQcm9taXNlLmNhdGNoKHVubG9jayk7XG4gICAgICAgICAgICBmaXJlbnZpbS5hdHRhY2hUb1BhZ2UoZnJhbWVJZFByb21pc2UpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgLy8gZmllbnZpbUVsZW1zIG1hcHMgZnJhbWUgaWRzIHRvIGZpcmVudmltIGVsZW1lbnRzLlxuICAgIGZpcmVudmltRWxlbXM6IG5ldyBNYXA8bnVtYmVyLCBGaXJlbnZpbUVsZW1lbnQ+KCksXG59O1xuXG5jb25zdCBvd25GcmFtZUlkID0gYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHsgYXJnczogW10sIGZ1bmNOYW1lOiBbXCJnZXRPd25GcmFtZUlkXCJdIH0pO1xuYXN5bmMgZnVuY3Rpb24gYW5ub3VuY2VGb2N1cyAoKSB7XG4gICAgY29uc3QgZnJhbWVJZCA9IGF3YWl0IG93bkZyYW1lSWQ7XG4gICAgZmlyZW52aW1HbG9iYWwubGFzdEZvY3VzZWRDb250ZW50U2NyaXB0ID0gZnJhbWVJZDtcbiAgICBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICBhcmdzOiB7XG4gICAgICAgICAgICBhcmdzOiBbIGZyYW1lSWQgXSxcbiAgICAgICAgICAgIGZ1bmNOYW1lOiBbXCJzZXRMYXN0Rm9jdXNlZENvbnRlbnRTY3JpcHRcIl1cbiAgICAgICAgfSxcbiAgICAgICAgZnVuY05hbWU6IFtcIm1lc3NhZ2VQYWdlXCJdXG4gICAgfSk7XG59XG4vLyBXaGVuIHRoZSBmcmFtZSBpcyBjcmVhdGVkLCB3ZSBtaWdodCByZWNlaXZlIGZvY3VzLCBjaGVjayBmb3IgdGhhdFxub3duRnJhbWVJZC50aGVuKF8gPT4ge1xuICAgIGlmIChkb2N1bWVudC5oYXNGb2N1cygpKSB7XG4gICAgICAgIGFubm91bmNlRm9jdXMoKTtcbiAgICB9XG59KTtcbmFzeW5jIGZ1bmN0aW9uIGFkZEZvY3VzTGlzdGVuZXIgKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgYW5ub3VuY2VGb2N1cyk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBhbm5vdW5jZUZvY3VzKTtcbn1cbmFkZEZvY3VzTGlzdGVuZXIoKTtcbi8vIFdlIG5lZWQgdG8gdXNlIHNldEludGVydmFsIHRvIHBlcmlvZGljYWxseSByZS1hZGQgdGhlIGZvY3VzIGxpc3RlbmVycyBhcyBpblxuLy8gZnJhbWVzIHRoZSBkb2N1bWVudCBjb3VsZCBnZXQgZGVsZXRlZCBhbmQgcmUtY3JlYXRlZCB3aXRob3V0IG91ciBrbm93bGVkZ2UuXG5jb25zdCBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoYWRkRm9jdXNMaXN0ZW5lciwgMTAwKTtcbi8vIEJ1dCB3ZSBkb24ndCB3YW50IHRvIHN5cGhvbiB0aGUgdXNlcidzIGJhdHRlcnkgc28gd2Ugc3RvcCBjaGVja2luZyBhZnRlciBhIHNlY29uZFxuc2V0VGltZW91dCgoKSA9PiBjbGVhckludGVydmFsKGludGVydmFsSWQpLCAxMDAwKTtcblxuZXhwb3J0IGNvbnN0IGZyYW1lRnVuY3Rpb25zID0gZ2V0TmVvdmltRnJhbWVGdW5jdGlvbnMoZmlyZW52aW1HbG9iYWwpO1xuZXhwb3J0IGNvbnN0IGFjdGl2ZUZ1bmN0aW9ucyA9IGdldEFjdGl2ZUNvbnRlbnRGdW5jdGlvbnMoZmlyZW52aW1HbG9iYWwpO1xuZXhwb3J0IGNvbnN0IHRhYkZ1bmN0aW9ucyA9IGdldFRhYkZ1bmN0aW9ucyhmaXJlbnZpbUdsb2JhbCk7XG5PYmplY3QuYXNzaWduKHdpbmRvdywgZnJhbWVGdW5jdGlvbnMsIGFjdGl2ZUZ1bmN0aW9ucywgdGFiRnVuY3Rpb25zKTtcbmJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoYXN5bmMgKHJlcXVlc3Q6IHsgZnVuY05hbWU6IHN0cmluZ1tdLCBhcmdzOiBhbnlbXSB9KSA9PiB7XG4gICAgLy8gQWxsIGNvbnRlbnQgc2NyaXB0cyBtdXN0IHJlYWN0IHRvIHRhYiBmdW5jdGlvbnNcbiAgICBsZXQgZm4gPSByZXF1ZXN0LmZ1bmNOYW1lLnJlZHVjZSgoYWNjOiBhbnksIGN1cjogc3RyaW5nKSA9PiBhY2NbY3VyXSwgdGFiRnVuY3Rpb25zKTtcbiAgICBpZiAoZm4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gZm4oLi4ucmVxdWVzdC5hcmdzKTtcbiAgICB9XG5cbiAgICAvLyBUaGUgb25seSBjb250ZW50IHNjcmlwdCB0aGF0IHNob3VsZCByZWFjdCB0byBhY3RpdmVGdW5jdGlvbnMgaXMgdGhlIGFjdGl2ZSBvbmVcbiAgICBmbiA9IHJlcXVlc3QuZnVuY05hbWUucmVkdWNlKChhY2M6IGFueSwgY3VyOiBzdHJpbmcpID0+IGFjY1tjdXJdLCBhY3RpdmVGdW5jdGlvbnMpO1xuICAgIGlmIChmbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChmaXJlbnZpbUdsb2JhbC5sYXN0Rm9jdXNlZENvbnRlbnRTY3JpcHQgPT09IGF3YWl0IG93bkZyYW1lSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmbiguLi5yZXF1ZXN0LmFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgoKSA9PiB1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIC8vIFRoZSBvbmx5IGNvbnRlbnQgc2NyaXB0IHRoYXQgc2hvdWxkIHJlYWN0IHRvIGZyYW1lRnVuY3Rpb25zIGlzIHRoZSBvbmVcbiAgICAvLyB0aGF0IG93bnMgdGhlIGZyYW1lIHRoYXQgc2VudCB0aGUgcmVxdWVzdFxuICAgIGZuID0gcmVxdWVzdC5mdW5jTmFtZS5yZWR1Y2UoKGFjYzogYW55LCBjdXI6IHN0cmluZykgPT4gYWNjW2N1cl0sIGZyYW1lRnVuY3Rpb25zKTtcbiAgICBpZiAoZm4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoZmlyZW52aW1HbG9iYWwuZmlyZW52aW1FbGVtcy5nZXQocmVxdWVzdC5hcmdzWzBdKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4oLi4ucmVxdWVzdC5hcmdzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKCkgPT4gdW5kZWZpbmVkKTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm9yOiB1bmhhbmRsZWQgY29udGVudCByZXF1ZXN0OiAke0pTT04uc3RyaW5naWZ5KHJlcXVlc3QpfS5gKTtcbn0pO1xuXG4iLCJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdEVkaXRvciB7XG4gICAgcHVibGljIGFic3RyYWN0IGdldENvbnRlbnQgKCk6IFByb21pc2U8c3RyaW5nPjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0Q3Vyc29yICgpOiBQcm9taXNlPFtudW1iZXIsIG51bWJlcl0+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRFbGVtZW50ICgpOiBIVE1MRWxlbWVudDtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0TGFuZ3VhZ2UgKCk6IFByb21pc2U8c3RyaW5nIHwgdW5kZWZpbmVkPjtcbiAgICBwdWJsaWMgYWJzdHJhY3Qgc2V0Q29udGVudCAoczogc3RyaW5nKTogUHJvbWlzZTxhbnk+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBzZXRDdXJzb3IgKGxpbmU6IG51bWJlciwgY29sdW1uOiBudW1iZXIpOiBQcm9taXNlPGFueT47XG59XG4iLCJpbXBvcnQgeyBleGVjdXRlSW5QYWdlLCBjb21wdXRlU2VsZWN0b3IgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcbmltcG9ydCB7IEFic3RyYWN0RWRpdG9yIH0gZnJvbSBcIi4vQWJzdHJhY3RFZGl0b3JcIjtcblxuZXhwb3J0IGNsYXNzIEFjZUVkaXRvciBleHRlbmRzIEFic3RyYWN0RWRpdG9yIHtcblxuICAgIHN0YXRpYyBtYXRjaGVzIChlOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBsZXQgcGFyZW50ID0gZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChwYXJlbnQgIT09IHVuZGVmaW5lZCAmJiBwYXJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoKC9hY2VfZWRpdG9yL2dpKS50ZXN0KHBhcmVudC5jbGFzc05hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlbGVtOiBIVE1MRWxlbWVudDtcbiAgICBjb25zdHJ1Y3RvciAoZTogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5lbGVtID0gZTtcbiAgICAgICAgLy8gR2V0IHRoZSB0b3Btb3N0IGFjZSBlbGVtZW50XG4gICAgICAgIGxldCBwYXJlbnQgPSB0aGlzLmVsZW0ucGFyZW50RWxlbWVudDtcbiAgICAgICAgd2hpbGUgKEFjZUVkaXRvci5tYXRjaGVzKHBhcmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbSA9IHBhcmVudDtcbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIHN0cmluZ2lmaWVkIGFuZCBpbnNlcnRlZCBpbiBwYWdlIGNvbnRleHQgc28gd2VcbiAgICAvLyBjYW4ndCBpbnN0cnVtZW50IGl0LlxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgcHJpdmF0ZSBnZXRBY2UgPSAoc2VsZWM6IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlYykgYXMgYW55O1xuICAgICAgICBjb25zdCB3aW5fYWNlID0gKHdpbmRvdyBhcyBhbnkpLmFjZTtcbiAgICAgICAgaWYgKHdpbl9hY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHdpbl9hY2UuZWRpdChlbGVtKTtcbiAgICAgICAgfSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZWxlbSwgJ2FjZUVkaXRvcicpKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbS5hY2VFZGl0b3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIEFjZUVkaXRvciBpbnN0YW5jZVwiKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBnZXRDb250ZW50ICgpIHtcbiAgICAgICAgcmV0dXJuIGV4ZWN1dGVJblBhZ2UoYCgkey8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIChnZXRBY2U6IGFueSwgc2VsZWM6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGdldEFjZShzZWxlYykuZ2V0VmFsdWUoKTtcbiAgICAgICAgfX0pKCR7dGhpcy5nZXRBY2V9LCAke0pTT04uc3RyaW5naWZ5KGNvbXB1dGVTZWxlY3Rvcih0aGlzLmVsZW0pKX0pYCk7XG4gICAgfVxuXG4gICAgZ2V0Q3Vyc29yICgpIHtcbiAgICAgICAgcmV0dXJuIGV4ZWN1dGVJblBhZ2UoYCgkey8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIChnZXRBY2U6IGFueSwgc2VsZWM6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgbGV0IHBvc2l0aW9uO1xuICAgICAgICAgICAgY29uc3QgYWNlID0gZ2V0QWNlKHNlbGVjKTtcbiAgICAgICAgICAgIGlmIChhY2UuZ2V0Q3Vyc29yUG9zaXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gYWNlLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gYWNlLnNlbGVjdGlvbi5jdXJzb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW3Bvc2l0aW9uLnJvdyArIDEsIHBvc2l0aW9uLmNvbHVtbl07XG4gICAgICAgIH19KSgke3RoaXMuZ2V0QWNlfSwgJHtKU09OLnN0cmluZ2lmeShjb21wdXRlU2VsZWN0b3IodGhpcy5lbGVtKSl9KWApO1xuICAgIH1cblxuICAgIGdldEVsZW1lbnQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtO1xuICAgIH1cblxuICAgIGdldExhbmd1YWdlICgpIHtcbiAgICAgICAgcmV0dXJuIGV4ZWN1dGVJblBhZ2UoYCgkey8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIChnZXRBY2U6IGFueSwgc2VsZWM6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgYWNlID0gZ2V0QWNlKHNlbGVjKTtcbiAgICAgICAgICAgIHJldHVybiBhY2Uuc2Vzc2lvbi4kbW9kZUlkLnNwbGl0KFwiL1wiKS5zbGljZSgtMSlbMF07XG4gICAgICAgIH19KSgke3RoaXMuZ2V0QWNlfSwgJHtKU09OLnN0cmluZ2lmeShjb21wdXRlU2VsZWN0b3IodGhpcy5lbGVtKSl9KWApO1xuICAgIH1cblxuICAgIHNldENvbnRlbnQgKHRleHQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gZXhlY3V0ZUluUGFnZShgKCR7LyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gKGdldEFjZTogYW55LCBzZWxlYzogc3RyaW5nLCBzdHI6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGdldEFjZShzZWxlYykuc2V0VmFsdWUoc3RyLCAxKTtcbiAgICAgICAgfX0pKCR7dGhpcy5nZXRBY2V9LCAke0pTT04uc3RyaW5naWZ5KGNvbXB1dGVTZWxlY3Rvcih0aGlzLmVsZW0pKX0sICR7SlNPTi5zdHJpbmdpZnkodGV4dCl9KWApO1xuICAgIH1cblxuICAgIHNldEN1cnNvciAobGluZTogbnVtYmVyLCBjb2x1bW46IG51bWJlcikge1xuICAgICAgICByZXR1cm4gZXhlY3V0ZUluUGFnZShgKCR7LyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gKGdldEFjZTogYW55LCBzZWxlYzogc3RyaW5nLCBsOiBudW1iZXIsIGM6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gZ2V0QWNlKHNlbGVjKS5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3Rpb24ubW92ZUN1cnNvclRvKGwgLSAxLCBjLCBmYWxzZSk7XG4gICAgICAgIH19KSgke3RoaXMuZ2V0QWNlfSwgJHtKU09OLnN0cmluZ2lmeShjb21wdXRlU2VsZWN0b3IodGhpcy5lbGVtKSl9LCAke2xpbmV9LCAke2NvbHVtbn0pYCk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBjb21wdXRlU2VsZWN0b3IsIGV4ZWN1dGVJblBhZ2UgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcbmltcG9ydCB7IEFic3RyYWN0RWRpdG9yIH0gZnJvbSBcIi4vQWJzdHJhY3RFZGl0b3JcIjtcblxuZXhwb3J0IGNsYXNzIENvZGVNaXJyb3JFZGl0b3IgZXh0ZW5kcyBBYnN0cmFjdEVkaXRvciB7XG5cbiAgICBzdGF0aWMgbWF0Y2hlcyAoZTogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgbGV0IHBhcmVudCA9IGU7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgKytpKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50ICE9PSB1bmRlZmluZWQgJiYgcGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCgvXiguKiApP0NvZGVNaXJyb3IvZ2kpLnRlc3QocGFyZW50LmNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGVsZW06IEhUTUxFbGVtZW50O1xuICAgIGNvbnN0cnVjdG9yIChlOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmVsZW0gPSBlO1xuICAgICAgICAvLyBHZXQgdGhlIHRvcG1vc3QgYWNlIGVsZW1lbnRcbiAgICAgICAgbGV0IHBhcmVudCA9IHRoaXMuZWxlbS5wYXJlbnRFbGVtZW50O1xuICAgICAgICB3aGlsZSAoQ29kZU1pcnJvckVkaXRvci5tYXRjaGVzKHBhcmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbSA9IHBhcmVudDtcbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCAoKSB7XG4gICAgICAgIHJldHVybiBleGVjdXRlSW5QYWdlKGAoJHsvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyAoc2VsZWM6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWMpIGFzIGFueTtcbiAgICAgICAgICAgIHJldHVybiBlbGVtLkNvZGVNaXJyb3IuZ2V0VmFsdWUoKTtcbiAgICAgICAgfX0pKCR7SlNPTi5zdHJpbmdpZnkoY29tcHV0ZVNlbGVjdG9yKHRoaXMuZWxlbSkpfSlgKTtcbiAgICB9XG5cbiAgICBnZXRDdXJzb3IgKCkge1xuICAgICAgICByZXR1cm4gZXhlY3V0ZUluUGFnZShgKCR7LyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gKHNlbGVjOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjKSBhcyBhbnk7XG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IGVsZW0uQ29kZU1pcnJvci5nZXRDdXJzb3IoKTtcbiAgICAgICAgICAgIHJldHVybiBbcG9zaXRpb24ubGluZSArIDEsIHBvc2l0aW9uLmNoXTtcbiAgICAgICAgfX0pKCR7SlNPTi5zdHJpbmdpZnkoY29tcHV0ZVNlbGVjdG9yKHRoaXMuZWxlbSkpfSlgKTtcbiAgICB9XG5cbiAgICBnZXRFbGVtZW50ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbTtcbiAgICB9XG5cbiAgICBnZXRMYW5ndWFnZSAoKSB7XG4gICAgICAgIHJldHVybiBleGVjdXRlSW5QYWdlKGAoJHsvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyAoc2VsZWM6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWMpIGFzIGFueTtcbiAgICAgICAgICAgIHJldHVybiBlbGVtLkNvZGVNaXJyb3IuZ2V0TW9kZSgpLm5hbWU7XG4gICAgICAgIH19KSgke0pTT04uc3RyaW5naWZ5KGNvbXB1dGVTZWxlY3Rvcih0aGlzLmVsZW0pKX0pYCk7XG4gICAgfVxuXG4gICAgc2V0Q29udGVudCAodGV4dDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBleGVjdXRlSW5QYWdlKGAoJHsvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyAoc2VsZWM6IHN0cmluZywgc3RyOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjKSBhcyBhbnk7XG4gICAgICAgICAgICByZXR1cm4gZWxlbS5Db2RlTWlycm9yLnNldFZhbHVlKHN0cik7XG4gICAgICAgIH19KSgke0pTT04uc3RyaW5naWZ5KGNvbXB1dGVTZWxlY3Rvcih0aGlzLmVsZW0pKX0sICR7SlNPTi5zdHJpbmdpZnkodGV4dCl9KWApO1xuICAgIH1cblxuICAgIHNldEN1cnNvciAobGluZTogbnVtYmVyLCBjb2x1bW46IG51bWJlcikge1xuICAgICAgICByZXR1cm4gZXhlY3V0ZUluUGFnZShgKCR7LyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gKHNlbGVjOiBzdHJpbmcsIGw6IG51bWJlciwgYzogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlYykgYXMgYW55O1xuICAgICAgICAgICAgcmV0dXJuIGVsZW0uQ29kZU1pcnJvci5nZXRDdXJzb3IobCAtIDEsIGMpO1xuICAgICAgICB9fSkoJHtKU09OLnN0cmluZ2lmeShjb21wdXRlU2VsZWN0b3IodGhpcy5lbGVtKSl9LCAke2xpbmV9LCAke2NvbHVtbn0pYCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgY29tcHV0ZVNlbGVjdG9yLCBleGVjdXRlSW5QYWdlIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgeyBBYnN0cmFjdEVkaXRvciB9IGZyb20gXCIuL0Fic3RyYWN0RWRpdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBNb25hY29FZGl0b3IgZXh0ZW5kcyBBYnN0cmFjdEVkaXRvciB7XG5cbiAgICBzdGF0aWMgbWF0Y2hlcyAoZTogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgbGV0IHBhcmVudCA9IGU7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgKytpKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50ICE9PSB1bmRlZmluZWQgJiYgcGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCgvbW9uYWNvLWVkaXRvci9naSkudGVzdChwYXJlbnQuY2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZWxlbTogSFRNTEVsZW1lbnQ7XG4gICAgY29uc3RydWN0b3IgKGU6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZWxlbSA9IGU7XG4gICAgICAgIC8vIEZpbmQgdGhlIG1vbmFjbyBlbGVtZW50IHRoYXQgaG9sZHMgdGhlIGRhdGFcbiAgICAgICAgbGV0IHBhcmVudCA9IHRoaXMuZWxlbS5wYXJlbnRFbGVtZW50O1xuICAgICAgICB3aGlsZSAoISh0aGlzLmVsZW0uY2xhc3NOYW1lLm1hdGNoKC9tb25hY28tZWRpdG9yL2dpKVxuICAgICAgICAgICAgICAgICAmJiB0aGlzLmVsZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS11cmlcIikubWF0Y2goXCJpbm1lbW9yeTovL3xnaXRsYWI6XCIpKSkge1xuICAgICAgICAgICAgdGhpcy5lbGVtID0gcGFyZW50O1xuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRDb250ZW50ICgpIHtcbiAgICAgICAgcmV0dXJuIGV4ZWN1dGVJblBhZ2UoYCgkey8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIChzZWxlYzogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlYykgYXMgYW55O1xuICAgICAgICAgICAgY29uc3QgdXJpID0gZWxlbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXVyaVwiKTtcbiAgICAgICAgICAgIGNvbnN0IG1vZGVsID0gKHdpbmRvdyBhcyBhbnkpLm1vbmFjby5lZGl0b3IuZ2V0TW9kZWwodXJpKTtcbiAgICAgICAgICAgIHJldHVybiBtb2RlbC5nZXRWYWx1ZSgpO1xuICAgICAgICB9fSkoJHtKU09OLnN0cmluZ2lmeShjb21wdXRlU2VsZWN0b3IodGhpcy5lbGVtKSl9KWApO1xuICAgIH1cblxuICAgIC8vIEl0J3MgaW1wb3NzaWJsZSB0byBnZXQgTW9uYWNvJ3MgY3Vyc29yIHBvc2l0aW9uOlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvbW9uYWNvLWVkaXRvci9pc3N1ZXMvMjU4XG4gICAgZ2V0Q3Vyc29yICgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbMSwgMF0gYXMgW251bWJlciwgbnVtYmVyXSk7XG4gICAgfVxuXG4gICAgZ2V0RWxlbWVudCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW07XG4gICAgfVxuXG4gICAgZ2V0TGFuZ3VhZ2UgKCkge1xuICAgICAgICByZXR1cm4gZXhlY3V0ZUluUGFnZShgKCR7LyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gKHNlbGVjOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjKSBhcyBhbnk7XG4gICAgICAgICAgICBjb25zdCB1cmkgPSBlbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtdXJpXCIpO1xuICAgICAgICAgICAgY29uc3QgbW9kZWwgPSAod2luZG93IGFzIGFueSkubW9uYWNvLmVkaXRvci5nZXRNb2RlbCh1cmkpO1xuICAgICAgICAgICAgcmV0dXJuIG1vZGVsLmdldE1vZGVJZCgpO1xuICAgICAgICB9fSkoJHtKU09OLnN0cmluZ2lmeShjb21wdXRlU2VsZWN0b3IodGhpcy5lbGVtKSl9KWApO1xuICAgIH1cblxuICAgIHNldENvbnRlbnQgKHRleHQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gZXhlY3V0ZUluUGFnZShgKCR7LyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gKHNlbGVjOiBzdHJpbmcsIHN0cjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlYykgYXMgYW55O1xuICAgICAgICAgICAgY29uc3QgdXJpID0gZWxlbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXVyaVwiKTtcbiAgICAgICAgICAgIGNvbnN0IG1vZGVsID0gKHdpbmRvdyBhcyBhbnkpLm1vbmFjby5lZGl0b3IuZ2V0TW9kZWwodXJpKTtcbiAgICAgICAgICAgIHJldHVybiBtb2RlbC5zZXRWYWx1ZShzdHIpO1xuICAgICAgICB9fSkoJHtKU09OLnN0cmluZ2lmeShjb21wdXRlU2VsZWN0b3IodGhpcy5lbGVtKSl9LCAke0pTT04uc3RyaW5naWZ5KHRleHQpfSlgKTtcbiAgICB9XG5cbiAgICAvLyBJdCdzIGltcG9zc2libGUgdG8gc2V0IE1vbmFjbydzIGN1cnNvciBwb3NpdGlvbjpcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L21vbmFjby1lZGl0b3IvaXNzdWVzLzI1OFxuICAgIHNldEN1cnNvciAoX2xpbmU6IG51bWJlciwgX2NvbHVtbjogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEFic3RyYWN0RWRpdG9yIH0gZnJvbSBcIi4vQWJzdHJhY3RFZGl0b3JcIjtcbmltcG9ydCB7IGdldENvbmYgfSBmcm9tIFwiLi4vdXRpbHMvY29uZmlndXJhdGlvblwiO1xuXG4vLyBUZXh0YXJlYUVkaXRvciBzb3J0IG9mIHdvcmtzIGZvciBjb250ZW50RWRpdGFibGUgZWxlbWVudHMgYnV0IHRoZXJlIHNob3VsZFxuLy8gcmVhbGx5IGJlIGEgY29udGVudGVkaXRhYmxlLXNwZWNpZmljIGVkaXRvci5cbmV4cG9ydCBjbGFzcyBUZXh0YXJlYUVkaXRvciBleHRlbmRzIEFic3RyYWN0RWRpdG9yIHtcblxuICAgIHByaXZhdGUgZWxlbTogSFRNTEVsZW1lbnQ7XG4gICAgY29uc3RydWN0b3IgKGU6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZWxlbSA9IGU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCAoKSB7XG4gICAgICAgIGlmICgodGhpcy5lbGVtIGFzIGFueSkudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgodGhpcy5lbGVtIGFzIGFueSkudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnZXRDb25mKCkuY29udGVudCA9PT0gXCJ0ZXh0XCIpe1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLmVsZW0uaW5uZXJUZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5lbGVtLmlubmVySFRNTCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRDdXJzb3IgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDb250ZW50KCkudGhlbih0ZXh0ID0+IHtcbiAgICAgICAgICAgIGxldCBsaW5lID0gMTtcbiAgICAgICAgICAgIGxldCBjb2x1bW4gPSAwO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uU3RhcnQgPSAodGhpcy5lbGVtIGFzIGFueSkuc2VsZWN0aW9uU3RhcnQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgID8gKHRoaXMuZWxlbSBhcyBhbnkpLnNlbGVjdGlvblN0YXJ0XG4gICAgICAgICAgICAgICAgOiAwO1xuICAgICAgICAgICAgLy8gU2lmdCB0aHJvdWdoIHRoZSB0ZXh0LCBjb3VudGluZyBjb2x1bW5zIGFuZCBuZXcgbGluZXNcbiAgICAgICAgICAgIGZvciAobGV0IGN1cnNvciA9IDA7IGN1cnNvciA8IHNlbGVjdGlvblN0YXJ0OyArK2N1cnNvcikge1xuICAgICAgICAgICAgICAgIGNvbHVtbiArPSB0ZXh0LmNoYXJDb2RlQXQoY3Vyc29yKSA8IDB4N0YgPyAxIDogMjtcbiAgICAgICAgICAgICAgICBpZiAodGV4dFtjdXJzb3JdID09PSBcIlxcblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW2xpbmUsIGNvbHVtbl0gYXMgW251bWJlciwgbnVtYmVyXTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0RWxlbWVudCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW07XG4gICAgfVxuXG4gICAgZ2V0TGFuZ3VhZ2UgKCkge1xuICAgICAgICBpZiAoZ2V0Q29uZigpLmNvbnRlbnQgPT09IFwidGV4dFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCdodG1sJyk7XG4gICAgfVxuXG4gICAgc2V0Q29udGVudCAodGV4dDogc3RyaW5nKSB7XG4gICAgICAgIGlmICgodGhpcy5lbGVtIGFzIGFueSkudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgKHRoaXMuZWxlbSBhcyBhbnkpLnZhbHVlID0gdGV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChnZXRDb25mKCkuY29udGVudCA9PT0gXCJ0ZXh0XCIpe1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbS5pbm5lclRleHQgPSB0ZXh0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW0uaW5uZXJIVE1MID0gdGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgc2V0Q3Vyc29yIChsaW5lOiBudW1iZXIsIGNvbHVtbjogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbnRlbnQoKS50aGVuKHRleHQgPT4ge1xuICAgICAgICAgICAgbGV0IGNoYXJhY3RlciA9IDA7XG4gICAgICAgICAgICAvLyBUcnkgdG8gZmluZCB0aGUgbGluZSB0aGUgY3Vyc29yIHNob3VsZCBiZSBwdXQgb25cbiAgICAgICAgICAgIHdoaWxlIChsaW5lID4gMSAmJiBjaGFyYWN0ZXIgPCB0ZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmICh0ZXh0W2NoYXJhY3Rlcl0gPT09IFwiXFxuXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGluZSAtPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRyeSB0byBmaW5kIHRoZSBjaGFyYWN0ZXIgYWZ0ZXIgd2hpY2ggdGhlIGN1cnNvciBzaG91bGQgYmUgbW92ZWRcbiAgICAgICAgICAgIC8vIE5vdGU6IHdlIGRvbid0IGRvIGNvbHVtbiA9IGNvbHVtbm4gKyBjaGFyYWN0ZXIgYmVjYXVzZSBjb2x1bW5cbiAgICAgICAgICAgIC8vIG1pZ2h0IGJlIGxhcmdlciB0aGFuIGFjdHVhbCBsaW5lIGxlbmd0aCBhbmQgaXQncyBiZXR0ZXIgdG8gYmUgb25cbiAgICAgICAgICAgIC8vIHRoZSByaWdodCBsaW5lIGJ1dCBvbiB0aGUgd3JvbmcgY29sdW1uIHRoYW4gb24gdGhlIHdyb25nIGxpbmVcbiAgICAgICAgICAgIC8vIGFuZCB3cm9uZyBjb2x1bW4uXG4gICAgICAgICAgICAvLyBNb3Jlb3ZlciwgY29sdW1uIGlzIGEgbnVtYmVyIG9mIFVURi04IGJ5dGVzIGZyb20gdGhlIGJlZ2lubmluZ1xuICAgICAgICAgICAgLy8gb2YgdGhlIGxpbmUgdG8gdGhlIGN1cnNvci4gSG93ZXZlciwgamF2YXNjcmlwdCB1c2VzIFVURi0xNixcbiAgICAgICAgICAgIC8vIHdoaWNoIGlzIDIgYnl0ZXMgcGVyIG5vbi1hc2NpaSBjaGFyYWN0ZXIuIFNvIHdoZW4gd2UgZmluZCBhXG4gICAgICAgICAgICAvLyBjaGFyYWN0ZXIgdGhhdCBpcyBtb3JlIHRoYW4gMSBieXRlIGxvbmcsIHdlIGhhdmUgdG8gcmVtb3ZlIHRoYXRcbiAgICAgICAgICAgIC8vIGFtb3VudCBmcm9tIGNvbHVtbiwgYnV0IG9ubHkgdHdvIGNoYXJhY3RlcnMgZnJvbSBDSEFSQUNURVIhXG4gICAgICAgICAgICB3aGlsZSAoY29sdW1uID4gMCAmJiBjaGFyYWN0ZXIgPCB0ZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIC8vIENhbid0IGhhcHBlbiwgYnV0IGJldHRlciBiZSBzYWZlIHRoYW4gc29ycnlcbiAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgICAgICAgIGlmICh0ZXh0W2NoYXJhY3Rlcl0gPT09IFwiXFxuXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGNvZGUgPSB0ZXh0LmNoYXJDb2RlQXQoY2hhcmFjdGVyKTtcbiAgICAgICAgICAgICAgICBpZiAoY29kZSA8PSAweDdmKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW4gLT0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPD0gMHg3ZmYpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbiAtPSAyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29kZSA+PSAweGQ4MDAgJiYgY29kZSA8PSAweGRmZmYpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbiAtPSA0OyBjaGFyYWN0ZXIrKztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPCAweGZmZmYpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbiAtPSAzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW4gLT0gNDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHRoaXMuZWxlbSBhcyBhbnkpLnNldFNlbGVjdGlvblJhbmdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAodGhpcy5lbGVtIGFzIGFueSkuc2V0U2VsZWN0aW9uUmFuZ2UoY2hhcmFjdGVyLCBjaGFyYWN0ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBBYnN0cmFjdEVkaXRvciB9IGZyb20gXCIuL0Fic3RyYWN0RWRpdG9yXCI7XG5pbXBvcnQgeyBBY2VFZGl0b3IgfSBmcm9tIFwiLi9BY2VFZGl0b3JcIjtcbmltcG9ydCB7IENvZGVNaXJyb3JFZGl0b3IgfSBmcm9tIFwiLi9Db2RlTWlycm9yRWRpdG9yXCI7XG5pbXBvcnQgeyBNb25hY29FZGl0b3IgfSBmcm9tIFwiLi9Nb25hY29FZGl0b3JcIjtcbmltcG9ydCB7IFRleHRhcmVhRWRpdG9yIH0gZnJvbSBcIi4vVGV4dGFyZWFFZGl0b3JcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVkaXRvcihlbGVtOiBIVE1MRWxlbWVudCk6IEFic3RyYWN0RWRpdG9yIHtcbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgY2FzZSBBY2VFZGl0b3IubWF0Y2hlcyhlbGVtKTogcmV0dXJuIG5ldyBBY2VFZGl0b3IoZWxlbSk7XG4gICAgICAgIGNhc2UgQ29kZU1pcnJvckVkaXRvci5tYXRjaGVzKGVsZW0pOiByZXR1cm4gbmV3IENvZGVNaXJyb3JFZGl0b3IoZWxlbSk7XG4gICAgICAgIGNhc2UgTW9uYWNvRWRpdG9yLm1hdGNoZXMoZWxlbSk6IHJldHVybiBuZXcgTW9uYWNvRWRpdG9yKGVsZW0pO1xuICAgICAgICBkZWZhdWx0OiByZXR1cm4gbmV3IFRleHRhcmVhRWRpdG9yKGVsZW0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGdldENvbmYgfSBmcm9tIFwiLi4vdXRpbHMvY29uZmlndXJhdGlvblwiO1xuaW1wb3J0IHsga2V5c1RvRXZlbnRzIH0gZnJvbSBcIi4uL3V0aWxzL2tleXNcIjtcbmltcG9ydCB7IEZpcmVudmltRWxlbWVudCB9IGZyb20gXCIuLi9GaXJlbnZpbUVsZW1lbnRcIjtcbmltcG9ydCB7IGV4ZWN1dGVJblBhZ2UgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcblxuaW50ZXJmYWNlIElHbG9iYWxTdGF0ZSB7XG4gICAgZGlzYWJsZWQ6IGJvb2xlYW4gfCBQcm9taXNlPGJvb2xlYW4+O1xuICAgIGxhc3RGb2N1c2VkQ29udGVudFNjcmlwdDogbnVtYmVyO1xuICAgIGZpcmVudmltRWxlbXM6IE1hcDxudW1iZXIsIEZpcmVudmltRWxlbWVudD47XG4gICAgZnJhbWVJZFJlc29sdmU6IChfOiBudW1iZXIpID0+IHZvaWQ7XG4gICAgbnZpbWlmeTogKGV2dDogRm9jdXNFdmVudCkgPT4gdm9pZDtcbn1cblxuZnVuY3Rpb24gX2ZvY3VzSW5wdXQoZ2xvYmFsOiBJR2xvYmFsU3RhdGUsIGZpcmVudmltOiBGaXJlbnZpbUVsZW1lbnQsIGFkZExpc3RlbmVyOiBib29sZWFuKSB7XG4gICAgaWYgKGFkZExpc3RlbmVyKSB7XG4gICAgICAgIC8vIE9ubHkgcmUtYWRkIGV2ZW50IGxpc3RlbmVyIGlmIGlucHV0J3Mgc2VsZWN0b3IgbWF0Y2hlcyB0aGUgb25lc1xuICAgICAgICAvLyB0aGF0IHNob3VsZCBiZSBhdXRvbnZpbWlmaWVkXG4gICAgICAgIGNvbnN0IGNvbmYgPSBnZXRDb25mKCk7XG4gICAgICAgIGlmIChjb25mLnNlbGVjdG9yICYmIGNvbmYuc2VsZWN0b3IgIT09IFwiXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1zID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNvbmYuc2VsZWN0b3IpKTtcbiAgICAgICAgICAgIGFkZExpc3RlbmVyID0gZWxlbXMuaW5jbHVkZXMoZmlyZW52aW0uZ2V0RWxlbWVudCgpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmaXJlbnZpbS5mb2N1c09yaWdpbmFsRWxlbWVudChhZGRMaXN0ZW5lcik7XG59XG5cbmZ1bmN0aW9uIGdldEZvY3VzZWRFbGVtZW50IChmaXJlbnZpbUVsZW1zOiBNYXA8bnVtYmVyLCBGaXJlbnZpbUVsZW1lbnQ+KSB7XG4gICAgcmV0dXJuIEFycmF5XG4gICAgICAgIC5mcm9tKGZpcmVudmltRWxlbXMudmFsdWVzKCkpXG4gICAgICAgIC5maW5kKGluc3RhbmNlID0+IGluc3RhbmNlLmlzRm9jdXNlZCgpKTtcbn1cblxuLy8gVGFiIGZ1bmN0aW9ucyBhcmUgZnVuY3Rpb25zIGFsbCBjb250ZW50IHNjcmlwdHMgc2hvdWxkIHJlYWN0IHRvXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGFiRnVuY3Rpb25zKGdsb2JhbDogSUdsb2JhbFN0YXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0QWN0aXZlSW5zdGFuY2VDb3VudCA6ICgpID0+IGdsb2JhbC5maXJlbnZpbUVsZW1zLnNpemUsXG4gICAgICAgIHJlZ2lzdGVyTmV3RnJhbWVJZDogKGZyYW1lSWQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgZ2xvYmFsLmZyYW1lSWRSZXNvbHZlKGZyYW1lSWQpO1xuICAgICAgICB9LFxuICAgICAgICBzZXREaXNhYmxlZDogKGRpc2FibGVkOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwuZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0TGFzdEZvY3VzZWRDb250ZW50U2NyaXB0OiAoZnJhbWVJZDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwubGFzdEZvY3VzZWRDb250ZW50U2NyaXB0ID0gZnJhbWVJZDtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGlzVmlzaWJsZShlOiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0IHJlY3QgPSBlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHZpZXdIZWlnaHQgPSBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgIHJldHVybiAhKHJlY3QuYm90dG9tIDwgMCB8fCByZWN0LnRvcCAtIHZpZXdIZWlnaHQgPj0gMCk7XG59XG5cbi8vIEFjdGl2ZUNvbnRlbnQgZnVuY3Rpb25zIGFyZSBmdW5jdGlvbnMgb25seSB0aGUgYWN0aXZlIGNvbnRlbnQgc2NyaXB0IHNob3VsZCByZWFjdCB0b1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFjdGl2ZUNvbnRlbnRGdW5jdGlvbnMoZ2xvYmFsOiBJR2xvYmFsU3RhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBmb3JjZU52aW1pZnk6ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbGVtID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgICAgIGNvbnN0IGlzTnVsbCA9IGVsZW0gPT09IG51bGwgfHwgZWxlbSA9PT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29uc3QgcGFnZU5vdEVkaXRhYmxlID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNvbnRlbnRFZGl0YWJsZSAhPT0gXCJ0cnVlXCI7XG4gICAgICAgICAgICBjb25zdCBib2R5Tm90RWRpdGFibGUgPSAoZG9jdW1lbnQuYm9keS5jb250ZW50RWRpdGFibGUgPT09IFwiZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgKGRvY3VtZW50LmJvZHkuY29udGVudEVkaXRhYmxlID09PSBcImluaGVyaXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jb250ZW50RWRpdGFibGUgIT09IFwidHJ1ZVwiKSk7XG4gICAgICAgICAgICBpZiAoaXNOdWxsXG4gICAgICAgICAgICAgICAgfHwgKGVsZW0gPT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBwYWdlTm90RWRpdGFibGUpXG4gICAgICAgICAgICAgICAgfHwgKGVsZW0gPT09IGRvY3VtZW50LmJvZHkgJiYgYm9keU5vdEVkaXRhYmxlKSkge1xuICAgICAgICAgICAgICAgIGVsZW0gPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGV4dGFyZWFcIikpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKGlzVmlzaWJsZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFlbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0gPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaW5wdXRcIikpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZChlID0+IGUudHlwZSA9PT0gXCJ0ZXh0XCIgJiYgaXNWaXNpYmxlKGUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFlbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnbG9iYWwubnZpbWlmeSh7IHRhcmdldDogZWxlbSB9IGFzIGFueSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNlbmRLZXk6IChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlyZW52aW0gPSBnZXRGb2N1c2VkRWxlbWVudChnbG9iYWwuZmlyZW52aW1FbGVtcyk7XG4gICAgICAgICAgICBpZiAoZmlyZW52aW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGZpcmVudmltLnNlbmRLZXkoa2V5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gSXQncyBpbXBvcnRhbnQgdG8gdGhyb3cgdGhpcyBlcnJvciBhcyB0aGUgYmFja2dyb3VuZCBzY3JpcHRcbiAgICAgICAgICAgICAgICAvLyB3aWxsIGV4ZWN1dGUgYSBmYWxsYmFja1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGZpcmVudmltIGZyYW1lIHNlbGVjdGVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROZW92aW1GcmFtZUZ1bmN0aW9ucyhnbG9iYWw6IElHbG9iYWxTdGF0ZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGV2YWxJblBhZ2U6IChfOiBudW1iZXIsIGpzOiBzdHJpbmcpID0+IGV4ZWN1dGVJblBhZ2UoanMpLFxuICAgICAgICBmb2N1c0lucHV0OiAoZnJhbWVJZDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBsZXQgZmlyZW52aW1FbGVtZW50O1xuICAgICAgICAgICAgaWYgKGZyYW1lSWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGZpcmVudmltRWxlbWVudCA9IGdldEZvY3VzZWRFbGVtZW50KGdsb2JhbC5maXJlbnZpbUVsZW1zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmlyZW52aW1FbGVtZW50ID0gZ2xvYmFsLmZpcmVudmltRWxlbXMuZ2V0KGZyYW1lSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX2ZvY3VzSW5wdXQoZ2xvYmFsLCBmaXJlbnZpbUVsZW1lbnQsIHRydWUpO1xuICAgICAgICB9LFxuICAgICAgICBmb2N1c1BhZ2U6IChmcmFtZUlkOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpcmVudmltRWxlbWVudCA9IGdsb2JhbC5maXJlbnZpbUVsZW1zLmdldChmcmFtZUlkKTtcbiAgICAgICAgICAgIGZpcmVudmltRWxlbWVudC5jbGVhckZvY3VzTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBhbnkpLmJsdXIoKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRFZGl0b3JJbmZvOiAoZnJhbWVJZDogbnVtYmVyKSA9PiBnbG9iYWxcbiAgICAgICAgICAgIC5maXJlbnZpbUVsZW1zXG4gICAgICAgICAgICAuZ2V0KGZyYW1lSWQpXG4gICAgICAgICAgICAuZ2V0QnVmZmVySW5mbygpLFxuICAgICAgICBnZXRFbGVtZW50Q29udGVudDogKGZyYW1lSWQ6IG51bWJlcikgPT4gZ2xvYmFsXG4gICAgICAgICAgICAuZmlyZW52aW1FbGVtc1xuICAgICAgICAgICAgLmdldChmcmFtZUlkKVxuICAgICAgICAgICAgLmdldFBhZ2VFbGVtZW50Q29udGVudCgpLFxuICAgICAgICBoaWRlRWRpdG9yOiAoZnJhbWVJZDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaXJlbnZpbSA9IGdsb2JhbC5maXJlbnZpbUVsZW1zLmdldChmcmFtZUlkKTtcbiAgICAgICAgICAgIGZpcmVudmltLmhpZGUoKTtcbiAgICAgICAgICAgIF9mb2N1c0lucHV0KGdsb2JhbCwgZmlyZW52aW0sIHRydWUpO1xuICAgICAgICB9LFxuICAgICAgICBraWxsRWRpdG9yOiAoZnJhbWVJZDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaXJlbnZpbSA9IGdsb2JhbC5maXJlbnZpbUVsZW1zLmdldChmcmFtZUlkKTtcbiAgICAgICAgICAgIGNvbnN0IGlzRm9jdXNlZCA9IGZpcmVudmltLmlzRm9jdXNlZCgpO1xuICAgICAgICAgICAgZmlyZW52aW0uZGV0YWNoRnJvbVBhZ2UoKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbmYgPSBnZXRDb25mKCk7XG4gICAgICAgICAgICBpZiAoaXNGb2N1c2VkKSB7XG4gICAgICAgICAgICAgICAgX2ZvY3VzSW5wdXQoZ2xvYmFsLCBmaXJlbnZpbSwgY29uZi50YWtlb3ZlciAhPT0gXCJvbmNlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2xvYmFsLmZpcmVudmltRWxlbXMuZGVsZXRlKGZyYW1lSWQpO1xuICAgICAgICB9LFxuICAgICAgICBwcmVzc0tleXM6IChmcmFtZUlkOiBudW1iZXIsIGtleXM6IHN0cmluZ1tdKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwuZmlyZW52aW1FbGVtcy5nZXQoZnJhbWVJZCkucHJlc3NLZXlzKGtleXNUb0V2ZW50cyhrZXlzKSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlc2l6ZUVkaXRvcjogKGZyYW1lSWQ6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBnbG9iYWwuZmlyZW52aW1FbGVtcy5nZXQoZnJhbWVJZCk7XG4gICAgICAgICAgICBlbGVtLnJlc2l6ZVRvKHdpZHRoLCBoZWlnaHQsIHRydWUpO1xuICAgICAgICAgICAgZWxlbS5wdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW5BZnRlclJlc2l6ZUZyb21GcmFtZSgpO1xuICAgICAgICB9LFxuICAgICAgICBzZXRFbGVtZW50Q29udGVudDogKGZyYW1lSWQ6IG51bWJlciwgdGV4dDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZ2xvYmFsLmZpcmVudmltRWxlbXMuZ2V0KGZyYW1lSWQpLnNldFBhZ2VFbGVtZW50Q29udGVudCh0ZXh0KTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0RWxlbWVudEN1cnNvcjogKGZyYW1lSWQ6IG51bWJlciwgbGluZTogbnVtYmVyLCBjb2x1bW46IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGdsb2JhbC5maXJlbnZpbUVsZW1zLmdldChmcmFtZUlkKS5zZXRQYWdlRWxlbWVudEN1cnNvcihsaW5lLCBjb2x1bW4pO1xuICAgICAgICB9LFxuICAgIH07XG59XG4iLCIvLyBUaGVzZSBtb2RlcyBhcmUgZGVmaW5lZCBpbiBodHRwczovL2dpdGh1Yi5jb20vbmVvdmltL25lb3ZpbS9ibG9iL21hc3Rlci9zcmMvbnZpbS9jdXJzb3Jfc2hhcGUuY1xuZXhwb3J0IHR5cGUgTnZpbU1vZGUgPSBcImFsbFwiXG4gIHwgXCJub3JtYWxcIlxuICB8IFwidmlzdWFsXCJcbiAgfCBcImluc2VydFwiXG4gIHwgXCJyZXBsYWNlXCJcbiAgfCBcImNtZGxpbmVfbm9ybWFsXCJcbiAgfCBcImNtZGxpbmVfaW5zZXJ0XCJcbiAgfCBcImNtZGxpbmVfcmVwbGFjZVwiXG4gIHwgXCJvcGVyYXRvclwiXG4gIHwgXCJ2aXN1YWxfc2VsZWN0XCJcbiAgfCBcImNtZGxpbmVfaG92ZXJcIlxuICB8IFwic3RhdHVzbGluZV9ob3ZlclwiXG4gIHwgXCJzdGF0dXNsaW5lX2RyYWdcIlxuICB8IFwidnNlcF9ob3ZlclwiXG4gIHwgXCJ2c2VwX2RyYWdcIlxuICB8IFwibW9yZVwiXG4gIHwgXCJtb3JlX2xhc3RsaW5lXCJcbiAgfCBcInNob3dtYXRjaFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTaXRlQ29uZmlnIHtcbiAgICBjbWRsaW5lOiBcIm5lb3ZpbVwiIHwgXCJmaXJlbnZpbVwiO1xuICAgIGNvbnRlbnQ6IFwiaHRtbFwiIHwgXCJ0ZXh0XCI7XG4gICAgcHJpb3JpdHk6IG51bWJlcjtcbiAgICByZW5kZXJlcjogXCJodG1sXCIgfCBcImNhbnZhc1wiO1xuICAgIHNlbGVjdG9yOiBzdHJpbmc7XG4gICAgdGFrZW92ZXI6IFwiYWx3YXlzXCIgfCBcIm9uY2VcIiB8IFwiZW1wdHlcIiB8IFwibm9uZW1wdHlcIiB8IFwibmV2ZXJcIjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlnIHtcbiAgICBnbG9iYWxTZXR0aW5nczoge1xuICAgICAgICBhbHQ6IFwiYWxwaGFudW1cIiB8IFwiYWxsXCIsXG4gICAgICAgIFwiPEMtbj5cIjogXCJkZWZhdWx0XCIgfCBcIm5vb3BcIixcbiAgICAgICAgXCI8Qy10PlwiOiBcImRlZmF1bHRcIiB8IFwibm9vcFwiLFxuICAgICAgICBcIjxDLXc+XCI6IFwiZGVmYXVsdFwiIHwgXCJub29wXCIsXG4gICAgICAgIFwiPENTLW4+XCI6IFwiZGVmYXVsdFwiIHwgXCJub29wXCIsXG4gICAgICAgIFwiPENTLXQ+XCI6IFwiZGVmYXVsdFwiIHwgXCJub29wXCIsXG4gICAgICAgIFwiPENTLXc+XCI6IFwiZGVmYXVsdFwiIHwgXCJub29wXCIsXG4gICAgICAgIGlnbm9yZUtleXM6IHsgW2tleSBpbiBOdmltTW9kZV06IHN0cmluZ1tdIH0sXG4gICAgICAgIGNtZGxpbmVUaW1lb3V0OiBudW1iZXIsXG4gICAgfTtcbiAgICBsb2NhbFNldHRpbmdzOiB7IFtrZXk6IHN0cmluZ106IElTaXRlQ29uZmlnIH07XG59XG5cbmxldCBjb25mOiBJQ29uZmlnID0gdW5kZWZpbmVkIGFzIElDb25maWc7XG5cbmV4cG9ydCBjb25zdCBjb25mUmVhZHkgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICBicm93c2VyLnN0b3JhZ2UubG9jYWwuZ2V0KCkudGhlbigob2JqOiBhbnkpID0+IHtcbiAgICAgICAgY29uZiA9IG9iajtcbiAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICB9KTtcbn0pO1xuXG5icm93c2VyLnN0b3JhZ2Uub25DaGFuZ2VkLmFkZExpc3RlbmVyKChjaGFuZ2VzOiBhbnkpID0+IHtcbiAgICBPYmplY3RcbiAgICAgICAgLmVudHJpZXMoY2hhbmdlcylcbiAgICAgICAgLmZvckVhY2goKFtrZXksIHZhbHVlXTogW2tleW9mIElDb25maWcsIGFueV0pID0+IGNvbmZSZWFkeS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbmZba2V5XSA9IHZhbHVlLm5ld1ZhbHVlO1xuICAgICAgICB9KSk7XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEdsb2JhbENvbmYoKSB7XG4gICAgLy8gQ2FuJ3QgYmUgdGVzdGVkIGZvclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKGNvbmYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJnZXRHbG9iYWxDb25mIGNhbGxlZCBiZWZvcmUgY29uZmlnIHdhcyByZWFkeVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbmYuZ2xvYmFsU2V0dGluZ3M7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb25mKCkge1xuICAgIHJldHVybiBnZXRDb25mRm9yVXJsKGRvY3VtZW50LmxvY2F0aW9uLmhyZWYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29uZkZvclVybCh1cmw6IHN0cmluZyk6IElTaXRlQ29uZmlnIHtcbiAgICBjb25zdCBsb2NhbFNldHRpbmdzID0gY29uZi5sb2NhbFNldHRpbmdzO1xuICAgIGZ1bmN0aW9uIG9yMSh2YWw6IG51bWJlcikge1xuICAgICAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuICAgIC8vIENhbid0IGJlIHRlc3RlZCBmb3JcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmIChsb2NhbFNldHRpbmdzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3I6IHlvdXIgc2V0dGluZ3MgYXJlIHVuZGVmaW5lZC4gVHJ5IHJlbG9hZGluZyB0aGUgcGFnZS4gSWYgdGhpcyBlcnJvciBwZXJzaXN0cywgdHJ5IHRoZSB0cm91Ymxlc2hvb3RpbmcgZ3VpZGU6IGh0dHBzOi8vZ2l0aHViLmNvbS9nbGFjYW1icmUvZmlyZW52aW0vYmxvYi9tYXN0ZXIvVFJPVUJMRVNIT09USU5HLm1kXCIpO1xuICAgIH1cbiAgICByZXR1cm4gQXJyYXkuZnJvbShPYmplY3QuZW50cmllcyhsb2NhbFNldHRpbmdzKSlcbiAgICAgICAgLmZpbHRlcigoW3BhdCwgX10pID0+IChuZXcgUmVnRXhwKHBhdCkpLnRlc3QodXJsKSlcbiAgICAgICAgLnNvcnQoKGUxLCBlMikgPT4gKG9yMShlMVsxXS5wcmlvcml0eSkgLSBvcjEoZTJbMV0ucHJpb3JpdHkpKSlcbiAgICAgICAgLnJlZHVjZSgoYWNjLCBbXywgY3VyXSkgPT4gT2JqZWN0LmFzc2lnbihhY2MsIGN1ciksIHt9IGFzIElTaXRlQ29uZmlnKTtcbn1cbiIsImV4cG9ydCBjb25zdCBub25MaXRlcmFsS2V5czoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICAgXCIgXCI6IFwiPFNwYWNlPlwiLFxuICAgIFwiPFwiOiBcIjxsdD5cIixcbiAgICBcIkFycm93RG93blwiOiBcIjxEb3duPlwiLFxuICAgIFwiQXJyb3dMZWZ0XCI6IFwiPExlZnQ+XCIsXG4gICAgXCJBcnJvd1JpZ2h0XCI6IFwiPFJpZ2h0PlwiLFxuICAgIFwiQXJyb3dVcFwiOiBcIjxVcD5cIixcbiAgICBcIkJhY2tzcGFjZVwiOiBcIjxCUz5cIixcbiAgICBcIkRlbGV0ZVwiOiBcIjxEZWw+XCIsXG4gICAgXCJFbmRcIjogXCI8RW5kPlwiLFxuICAgIFwiRW50ZXJcIjogXCI8Q1I+XCIsXG4gICAgXCJFc2NhcGVcIjogXCI8RXNjPlwiLFxuICAgIFwiRjFcIjogXCI8RjE+XCIsXG4gICAgXCJGMTBcIjogXCI8RjEwPlwiLFxuICAgIFwiRjExXCI6IFwiPEYxMT5cIixcbiAgICBcIkYxMlwiOiBcIjxGMTI+XCIsXG4gICAgXCJGMTNcIjogXCI8RjEzPlwiLFxuICAgIFwiRjE0XCI6IFwiPEYxND5cIixcbiAgICBcIkYxNVwiOiBcIjxGMTU+XCIsXG4gICAgXCJGMTZcIjogXCI8RjE2PlwiLFxuICAgIFwiRjE3XCI6IFwiPEYxNz5cIixcbiAgICBcIkYxOFwiOiBcIjxGMTg+XCIsXG4gICAgXCJGMTlcIjogXCI8RjE5PlwiLFxuICAgIFwiRjJcIjogXCI8RjI+XCIsXG4gICAgXCJGMjBcIjogXCI8RjIwPlwiLFxuICAgIFwiRjIxXCI6IFwiPEYyMT5cIixcbiAgICBcIkYyMlwiOiBcIjxGMjI+XCIsXG4gICAgXCJGMjNcIjogXCI8RjIzPlwiLFxuICAgIFwiRjI0XCI6IFwiPEYyND5cIixcbiAgICBcIkYzXCI6IFwiPEYzPlwiLFxuICAgIFwiRjRcIjogXCI8RjQ+XCIsXG4gICAgXCJGNVwiOiBcIjxGNT5cIixcbiAgICBcIkY2XCI6IFwiPEY2PlwiLFxuICAgIFwiRjdcIjogXCI8Rjc+XCIsXG4gICAgXCJGOFwiOiBcIjxGOD5cIixcbiAgICBcIkY5XCI6IFwiPEY5PlwiLFxuICAgIFwiSG9tZVwiOiBcIjxIb21lPlwiLFxuICAgIFwiUGFnZURvd25cIjogXCI8UGFnZURvd24+XCIsXG4gICAgXCJQYWdlVXBcIjogXCI8UGFnZVVwPlwiLFxuICAgIFwiVGFiXCI6IFwiPFRhYj5cIixcbiAgICBcIlxcXFxcIjogXCI8QnNsYXNoPlwiLFxuICAgIFwifFwiOiBcIjxCYXI+XCIsXG59O1xuXG5jb25zdCBub25MaXRlcmFsVmltS2V5cyA9IE9iamVjdC5mcm9tRW50cmllcyhPYmplY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5lbnRyaWVzKG5vbkxpdGVyYWxLZXlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgoW3gsIHldKSA9PiBbeSwgeF0pKTtcblxuY29uc3Qgbm9uTGl0ZXJhbEtleUNvZGVzOiB7W2tleTogc3RyaW5nXTogbnVtYmVyfSA9IHtcbiAgICBcIkVudGVyXCI6ICAgICAgMTMsXG4gICAgXCJTcGFjZVwiOiAgICAgIDMyLFxuICAgIFwiVGFiXCI6ICAgICAgICA5LFxuICAgIFwiRGVsZXRlXCI6ICAgICA0NixcbiAgICBcIkVuZFwiOiAgICAgICAgMzUsXG4gICAgXCJIb21lXCI6ICAgICAgIDM2LFxuICAgIFwiSW5zZXJ0XCI6ICAgICA0NSxcbiAgICBcIlBhZ2VEb3duXCI6ICAgMzQsXG4gICAgXCJQYWdlVXBcIjogICAgIDMzLFxuICAgIFwiQXJyb3dEb3duXCI6ICA0MCxcbiAgICBcIkFycm93TGVmdFwiOiAgMzcsXG4gICAgXCJBcnJvd1JpZ2h0XCI6IDM5LFxuICAgIFwiQXJyb3dVcFwiOiAgICAzOCxcbiAgICBcIkVzY2FwZVwiOiAgICAgMjcsXG59O1xuXG4vLyBHaXZlbiBhIFwic3BlY2lhbFwiIGtleSByZXByZXNlbnRhdGlvbiAoZS5nLiA8RW50ZXI+IG9yIDxNLWw+KSwgcmV0dXJucyBhblxuLy8gYXJyYXkgb2YgdGhyZWUgamF2YXNjcmlwdCBrZXlldmVudHMsIHRoZSBmaXJzdCBvbmUgcmVwcmVzZW50aW5nIHRoZVxuLy8gY29ycmVzcG9uZGluZyBrZXlkb3duLCB0aGUgc2Vjb25kIG9uZSBhIGtleXByZXNzIGFuZCB0aGUgdGhpcmQgb25lIGEga2V5dXBcbi8vIGV2ZW50LlxuZnVuY3Rpb24gbW9kS2V5VG9FdmVudHMoazogc3RyaW5nKSB7XG4gICAgbGV0IG1vZHMgPSBcIlwiO1xuICAgIGxldCBrZXkgPSBub25MaXRlcmFsVmltS2V5c1trXTtcbiAgICBsZXQgY3RybEtleSA9IGZhbHNlO1xuICAgIGxldCBhbHRLZXkgPSBmYWxzZTtcbiAgICBsZXQgc2hpZnRLZXkgPSBmYWxzZTtcbiAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgYXJyID0gay5zbGljZSgxLCAtMSkuc3BsaXQoXCItXCIpO1xuICAgICAgICBtb2RzID0gYXJyWzBdO1xuICAgICAgICBrZXkgPSBhcnJbMV07XG4gICAgICAgIGN0cmxLZXkgPSAvYy9pLnRlc3QobW9kcyk7XG4gICAgICAgIGFsdEtleSA9IC9hL2kudGVzdChtb2RzKTtcbiAgICAgICAgY29uc3Qgc3BlY2lhbENoYXIgPSBcIjxcIiArIGtleSArIFwiPlwiO1xuICAgICAgICBpZiAobm9uTGl0ZXJhbFZpbUtleXNbc3BlY2lhbENoYXJdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGtleSA9IG5vbkxpdGVyYWxWaW1LZXlzW3NwZWNpYWxDaGFyXTtcbiAgICAgICAgICAgIHNoaWZ0S2V5ID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaGlmdEtleSA9IGtleSAhPT0ga2V5LnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gU29tZSBwYWdlcyByZWx5IG9uIGtleUNvZGVzIHRvIGZpZ3VyZSBvdXQgd2hhdCBrZXkgd2FzIHByZXNzZWQuIFRoaXMgaXNcbiAgICAvLyBhd2Z1bCBiZWNhdXNlIGtleWNvZGVzIGFyZW4ndCBndWFyYW50ZWVkIHRvIGJlIHRoZSBzYW1lIGFjcnJvc3NcbiAgICAvLyBicm93c2Vycy9PUy9rZXlib2FyZCBsYXlvdXRzIGJ1dCB0cnkgdG8gZG8gdGhlIHJpZ2h0IHRoaW5nIGFueXdheS5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZ2xhY2FtYnJlL2ZpcmVudmltL2lzc3Vlcy83MjNcbiAgICBsZXQga2V5Q29kZSA9IDA7XG4gICAgaWYgKC9eW2EtekEtWjAtOV0kLy50ZXN0KGtleSkpIHtcbiAgICAgICAga2V5Q29kZSA9IGtleS5jaGFyQ29kZUF0KDApO1xuICAgIH0gZWxzZSBpZiAobm9uTGl0ZXJhbEtleUNvZGVzW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBrZXlDb2RlID0gbm9uTGl0ZXJhbEtleUNvZGVzW2tleV07XG4gICAgfVxuICAgIGNvbnN0IGluaXQgPSB7IGtleSwga2V5Q29kZSwgY3RybEtleSwgYWx0S2V5LCBzaGlmdEtleSwgYnViYmxlczogdHJ1ZSB9O1xuICAgIHJldHVybiBbXG4gICAgICAgIG5ldyBLZXlib2FyZEV2ZW50KFwia2V5ZG93blwiLCBpbml0KSxcbiAgICAgICAgbmV3IEtleWJvYXJkRXZlbnQoXCJrZXlwcmVzc1wiLCBpbml0KSxcbiAgICAgICAgbmV3IEtleWJvYXJkRXZlbnQoXCJrZXl1cFwiLCBpbml0KSxcbiAgICBdO1xufVxuXG4vLyBHaXZlbiBhIFwic2ltcGxlXCIga2V5IChlLmcuIGBhYCwgYDFg4oCmKSwgcmV0dXJucyBhbiBhcnJheSBvZiB0aHJlZSBqYXZhc2NyaXB0XG4vLyBldmVudHMgcmVwcmVzZW50aW5nIHRoZSBhY3Rpb24gb2YgcHJlc3NpbmcgdGhlIGtleS5cbmZ1bmN0aW9uIGtleVRvRXZlbnRzKGtleTogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2hpZnRLZXkgPSBrZXkgIT09IGtleS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgIHJldHVybiBbXG4gICAgICAgIG5ldyBLZXlib2FyZEV2ZW50KFwia2V5ZG93blwiLCAgeyBrZXksIHNoaWZ0S2V5LCBidWJibGVzOiB0cnVlIH0pLFxuICAgICAgICBuZXcgS2V5Ym9hcmRFdmVudChcImtleXByZXNzXCIsIHsga2V5LCBzaGlmdEtleSwgYnViYmxlczogdHJ1ZSB9KSxcbiAgICAgICAgbmV3IEtleWJvYXJkRXZlbnQoXCJrZXl1cFwiLCAgICB7IGtleSwgc2hpZnRLZXksIGJ1YmJsZXM6IHRydWUgfSksXG4gICAgXTtcbn1cblxuLy8gR2l2ZW4gYW4gYXJyYXkgb2Ygc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGtleXMgKGUuZy4gW1wiYVwiLCBcIjxFbnRlcj5cIiwg4oCmXSksXG4vLyByZXR1cm5zIGFuIGFycmF5IG9mIGphdmFzY3JpcHQga2V5Ym9hcmQgZXZlbnRzIHRoYXQgc2ltdWxhdGUgdGhlc2Uga2V5c1xuLy8gYmVpbmcgcHJlc3NlZC5cbmV4cG9ydCBmdW5jdGlvbiBrZXlzVG9FdmVudHMoa2V5czogc3RyaW5nW10pIHtcbiAgICAvLyBDb2RlIHRvIHNwbGl0IG1vZCBrZXlzIGFuZCBub24tbW9kIGtleXM6XG4gICAgLy8gY29uc3Qga2V5cyA9IHN0ci5tYXRjaCgvKFs8Pl1bXjw+XStbPD5dKXwoW148Pl0rKS9nKVxuICAgIC8vIGlmIChrZXlzID09PSBudWxsKSB7XG4gICAgLy8gICAgIHJldHVybiBbXTtcbiAgICAvLyB9XG4gICAgcmV0dXJuIGtleXMubWFwKChrZXkpID0+IHtcbiAgICAgICAgaWYgKGtleVswXSA9PT0gXCI8XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBtb2RLZXlUb0V2ZW50cyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBrZXlUb0V2ZW50cyhrZXkpO1xuICAgIH0pLmZsYXQoKTtcbn1cblxuLy8gVHVybnMgYSBub24tbGl0ZXJhbCBrZXkgKGUuZy4gXCJFbnRlclwiKSBpbnRvIGEgdmltLWVxdWl2YWxlbnQgXCI8RW50ZXI+XCJcbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGVLZXkoa2V5OiBzdHJpbmcpIHtcbiAgICBpZiAobm9uTGl0ZXJhbEtleXNba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBub25MaXRlcmFsS2V5c1trZXldO1xuICAgIH1cbiAgICByZXR1cm4ga2V5O1xufVxuXG4vLyBBZGQgbW9kaWZpZXIgYG1vZGAgKGBBYCwgYENgLCBgU2DigKYpIHRvIGB0ZXh0YCAoYSB2aW0ga2V5IGBiYCwgYDxFbnRlcj5gLFxuLy8gYDxDUy14PmDigKYpXG5leHBvcnQgZnVuY3Rpb24gYWRkTW9kaWZpZXIobW9kOiBzdHJpbmcsIHRleHQ6IHN0cmluZykge1xuICAgIGxldCBtYXRjaDtcbiAgICBsZXQgbW9kaWZpZXJzID0gXCJcIjtcbiAgICBsZXQga2V5ID0gXCJcIjtcbiAgICBpZiAoKG1hdGNoID0gdGV4dC5tYXRjaCgvXjwoW0EtWl17MSw1fSktKC4rKT4kLykpKSB7XG4gICAgICAgIG1vZGlmaWVycyA9IG1hdGNoWzFdO1xuICAgICAgICBrZXkgPSBtYXRjaFsyXTtcbiAgICB9IGVsc2UgaWYgKChtYXRjaCA9IHRleHQubWF0Y2goL148KC4rKT4kLykpKSB7XG4gICAgICAgIGtleSA9IG1hdGNoWzFdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGtleSA9IHRleHQ7XG4gICAgfVxuICAgIHJldHVybiBcIjxcIiArIG1vZCArIG1vZGlmaWVycyArIFwiLVwiICsga2V5ICsgXCI+XCI7XG59XG4iLCJsZXQgY3VySG9zdCA6IHN0cmluZztcblxuLy8gQ2FuJ3QgZ2V0IGNvdmVyYWdlIGZvciB0aHVuZGVyYmlyZC5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5pZiAoKGJyb3dzZXIgYXMgYW55KS5jb21wb3NlU2NyaXB0cyAhPT0gdW5kZWZpbmVkIHx8IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPT09IFwiYWJvdXQ6Ymxhbms/Y29tcG9zZVwiKSB7XG4gICAgY3VySG9zdCA9IFwidGh1bmRlcmJpcmRcIjtcbi8vIENocm9tZSBkb2Vzbid0IGhhdmUgYSBcImJyb3dzZXJcIiBvYmplY3QsIGluc3RlYWQgaXQgdXNlcyBcImNocm9tZVwiLlxufSBlbHNlIGlmICh3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgPT09IFwibW96LWV4dGVuc2lvbjpcIikge1xuICAgIGN1ckhvc3QgPSBcImZpcmVmb3hcIjtcbn0gZWxzZSBpZiAod2luZG93LmxvY2F0aW9uLnByb3RvY29sID09PSBcImNocm9tZS1leHRlbnNpb246XCIpIHtcbiAgICBjdXJIb3N0ID0gXCJjaHJvbWVcIjtcbn1cblxuLy8gT25seSB1c2FibGUgaW4gYmFja2dyb3VuZCBzY3JpcHQhXG5leHBvcnQgZnVuY3Rpb24gaXNDaHJvbWUoKSB7XG4gICAgLy8gQ2FuJ3QgY292ZXIgZXJyb3IgY29uZGl0aW9uXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAoY3VySG9zdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IEVycm9yKFwiVXNlZCBpc0Nocm9tZSBpbiBjb250ZW50IHNjcmlwdCFcIik7XG4gICAgfVxuICAgIHJldHVybiBjdXJIb3N0ID09PSBcImNocm9tZVwiO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzVGh1bmRlcmJpcmQoKSB7XG4gICAgLy8gQ2FuJ3QgY292ZXIgZXJyb3IgY29uZGl0aW9uXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAoY3VySG9zdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IEVycm9yKFwiVXNlZCBpc1RodW5kZXJiaXJkIGluIGNvbnRlbnQgc2NyaXB0IVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIGN1ckhvc3QgPT09IFwidGh1bmRlcmJpcmRcIjtcbn1cblxuLy8gUnVucyBDT0RFIGluIHRoZSBwYWdlJ3MgY29udGV4dCBieSBzZXR0aW5nIHVwIGEgY3VzdG9tIGV2ZW50IGxpc3RlbmVyLFxuLy8gZW1iZWRkaW5nIGEgc2NyaXB0IGVsZW1lbnQgdGhhdCBydW5zIHRoZSBwaWVjZSBvZiBjb2RlIGFuZCBlbWl0cyBpdHMgcmVzdWx0XG4vLyBhcyBhbiBldmVudC5cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlSW5QYWdlKGNvZGU6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgY29uc3QgZXZlbnRJZCA9IChuZXcgVVJMKGJyb3dzZXIucnVudGltZS5nZXRVUkwoXCJcIikpKS5ob3N0bmFtZSArIE1hdGgucmFuZG9tKCk7XG4gICAgICAgIHNjcmlwdC5pbm5lckhUTUwgPSBgKGFzeW5jIChldklkKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgJHtjb2RlfTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoZXZJZCwge1xuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KGV2SWQsIHtcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7IHN1Y2Nlc3M6IGZhbHNlLCByZWFzb246IGUgfSxcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKCR7SlNPTi5zdHJpbmdpZnkoZXZlbnRJZCl9KWA7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50SWQsICh7IGRldGFpbCB9OiBhbnkpID0+IHtcbiAgICAgICAgICAgIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICBpZiAoZGV0YWlsLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShkZXRhaWwucmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZGV0YWlsLnJlYXNvbik7XG4gICAgICAgIH0sIHsgb25jZTogdHJ1ZSB9KTtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIH0pO1xufVxuXG4vLyBWYXJpb3VzIGZpbHRlcnMgdGhhdCBhcmUgdXNlZCB0byBjaGFuZ2UgdGhlIGFwcGVhcmFuY2Ugb2YgdGhlIEJyb3dzZXJBY3Rpb25cbi8vIGljb24uXG5jb25zdCBzdmdwYXRoID0gXCJmaXJlbnZpbS5zdmdcIjtcbmNvbnN0IHRyYW5zZm9ybWF0aW9ucyA9IHtcbiAgICBkaXNhYmxlZDogKGltZzogVWludDhDbGFtcGVkQXJyYXkpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWcubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgICAgIC8vIFNraXAgdHJhbnNwYXJlbnQgcGl4ZWxzXG4gICAgICAgICAgICBpZiAoaW1nW2kgKyAzXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbWVhbiA9IE1hdGguZmxvb3IoKGltZ1tpXSArIGltZ1tpICsgMV0gKyBpbWdbaSArIDJdKSAvIDMpO1xuICAgICAgICAgICAgaW1nW2ldID0gbWVhbjtcbiAgICAgICAgICAgIGltZ1tpICsgMV0gPSBtZWFuO1xuICAgICAgICAgICAgaW1nW2kgKyAyXSA9IG1lYW47XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGVycm9yOiAoaW1nOiBVaW50OENsYW1wZWRBcnJheSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltZy5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICAgICAgLy8gVHVybiB0cmFuc3BhcmVudCBwaXhlbHMgcmVkXG4gICAgICAgICAgICBpZiAoaW1nW2kgKyAzXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGltZ1tpXSA9IDI1NTtcbiAgICAgICAgICAgICAgICBpbWdbaSArIDNdID0gMjU1O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBub3JtYWw6ICgoX2ltZzogVWludDhDbGFtcGVkQXJyYXkpID0+ICh1bmRlZmluZWQgYXMgbmV2ZXIpKSxcbiAgICBub3RpZmljYXRpb246IChpbWc6IFVpbnQ4Q2xhbXBlZEFycmF5KSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1nLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgICAgICAvLyBUdXJuIHRyYW5zcGFyZW50IHBpeGVscyB5ZWxsb3dcbiAgICAgICAgICAgIGlmIChpbWdbaSArIDNdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaW1nW2ldID0gMjU1O1xuICAgICAgICAgICAgICAgIGltZ1tpICsgMV0gPSAyNTU7XG4gICAgICAgICAgICAgICAgaW1nW2kgKyAzXSA9IDI1NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG59O1xuXG5leHBvcnQgdHlwZSBJY29uS2luZCA9IGtleW9mIHR5cGVvZiB0cmFuc2Zvcm1hdGlvbnM7XG5cbi8vIFRha2VzIGFuIGljb24ga2luZCBhbmQgZGltZW5zaW9ucyBhcyBwYXJhbWV0ZXIsIGRyYXdzIHRoYXQgdG8gYSBjYW52YXMgYW5kXG4vLyByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHdpbGwgYmUgcmVzb2x2ZWQgd2l0aCB0aGUgY2FudmFzJyBpbWFnZSBkYXRhLlxuZXhwb3J0IGZ1bmN0aW9uIGdldEljb25JbWFnZURhdGEoa2luZDogSWNvbktpbmQsIHdpZHRoID0gMzIsIGhlaWdodCA9IDMyKSB7XG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gaW1nLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICBjb25zdCBpZCA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHRyYW5zZm9ybWF0aW9uc1traW5kXShpZC5kYXRhKTtcbiAgICAgICAgcmVzb2x2ZShpZCk7XG4gICAgfSkpO1xuICAgIGltZy5zcmMgPSBzdmdwYXRoO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIEdpdmVuIGEgdXJsIGFuZCBhIHNlbGVjdG9yLCB0cmllcyB0byBjb21wdXRlIGEgbmFtZSB0aGF0IHdpbGwgYmUgdW5pcXVlLFxuLy8gc2hvcnQgYW5kIHJlYWRhYmxlIGZvciB0aGUgdXNlci5cbmV4cG9ydCBmdW5jdGlvbiB0b0ZpbGVOYW1lKHVybDogc3RyaW5nLCBpZDogc3RyaW5nLCBsYW5ndWFnZTogc3RyaW5nKSB7XG4gICAgbGV0IHBhcnNlZFVSTDtcbiAgICB0cnkge1xuICAgICAgICBwYXJzZWRVUkwgPSBuZXcgVVJMKHVybCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBPbmx5IGhhcHBlbnMgd2l0aCB0aHVuZGVyYmlyZCwgd2hlcmUgd2UgY2FuJ3QgZ2V0IGNvdmVyYWdlXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIHBhcnNlZFVSTCA9IHsgaG9zdG5hbWU6ICd0aHVuZGVyYmlyZCcsIHBhdGhuYW1lOiAnbWFpbCcgfTtcbiAgICB9XG4gICAgY29uc3Qgc2hvcnRJZCA9IGlkLnJlcGxhY2UoLzpudGgtb2YtdHlwZS9nLCBcIlwiKTtcbiAgICBjb25zdCB0b0FscGhhTnVtID0gKHN0cjogc3RyaW5nKSA9PiAoc3RyLm1hdGNoKC9bYS16QS1aMC05XSsvZykgfHwgW10pXG4gICAgICAgIC5qb2luKFwiLVwiKVxuICAgICAgICAuc2xpY2UoLTMyKTtcbiAgICBjb25zdCBleHQgPSBsYW5ndWFnZVRvRXh0ZW5zaW9ucyhsYW5ndWFnZSk7XG4gICAgcmV0dXJuIGAke3BhcnNlZFVSTC5ob3N0bmFtZX1fJHt0b0FscGhhTnVtKHBhcnNlZFVSTC5wYXRobmFtZSl9XyR7dG9BbHBoYU51bShzaG9ydElkKX0uJHtleHR9YDtcbn1cblxuLy8gR2l2ZW4gYSBsYW5ndWFnZSBuYW1lLCByZXR1cm5zIGEgZmlsZW5hbWUgZXh0ZW5zaW9uLiBDYW4gcmV0dXJuIHVuZGVmaW5lZC5cbmV4cG9ydCBmdW5jdGlvbiBsYW5ndWFnZVRvRXh0ZW5zaW9ucyhsYW5ndWFnZTogc3RyaW5nKSB7XG4gICAgaWYgKGxhbmd1YWdlID09PSB1bmRlZmluZWQgfHwgbGFuZ3VhZ2UgPT09IG51bGwpIHtcbiAgICAgICAgbGFuZ3VhZ2UgPSBcIlwiO1xuICAgIH1cbiAgICBjb25zdCBsYW5nID0gbGFuZ3VhZ2UudG9Mb3dlckNhc2UoKTtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHN3aXRjaCAobGFuZykge1xuICAgICAgICBjYXNlIFwiYXBsXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJhcGxcIjtcbiAgICAgICAgY2FzZSBcImJyYWluZnVja1wiOiAgICAgICAgcmV0dXJuIFwiYmZcIjtcbiAgICAgICAgY2FzZSBcImNcIjogICAgICAgICAgICAgICAgcmV0dXJuIFwiY1wiO1xuICAgICAgICBjYXNlIFwiYyNcIjogICAgICAgICAgICAgICByZXR1cm4gXCJjc1wiO1xuICAgICAgICBjYXNlIFwiYysrXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJjcHBcIjtcbiAgICAgICAgY2FzZSBcImNleWxvblwiOiAgICAgICAgICAgcmV0dXJuIFwiY2V5bG9uXCI7XG4gICAgICAgIGNhc2UgXCJjbGlrZVwiOiAgICAgICAgICAgIHJldHVybiBcImNcIjtcbiAgICAgICAgY2FzZSBcImNsb2p1cmVcIjogICAgICAgICAgcmV0dXJuIFwiY2xqXCI7XG4gICAgICAgIGNhc2UgXCJjbWFrZVwiOiAgICAgICAgICAgIHJldHVybiBcIi5jbWFrZVwiO1xuICAgICAgICBjYXNlIFwiY29ib2xcIjogICAgICAgICAgICByZXR1cm4gXCJjYmxcIjtcbiAgICAgICAgY2FzZSBcImNvZmZlZXNjcmlwdFwiOiAgICAgcmV0dXJuIFwiY29mZmVlXCI7XG4gICAgICAgIGNhc2UgXCJjb21tb25saXNwXCI6ICAgICAgcmV0dXJuIFwibGlzcFwiO1xuICAgICAgICBjYXNlIFwiY3J5c3RhbFwiOiAgICAgICAgICByZXR1cm4gXCJjclwiO1xuICAgICAgICBjYXNlIFwiY3NzXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJjc3NcIjtcbiAgICAgICAgY2FzZSBcImN5dGhvblwiOiAgICAgICAgICAgcmV0dXJuIFwicHlcIjtcbiAgICAgICAgY2FzZSBcImRcIjogICAgICAgICAgICAgICAgcmV0dXJuIFwiZFwiO1xuICAgICAgICBjYXNlIFwiZGFydFwiOiAgICAgICAgICAgICByZXR1cm4gXCJkYXJ0XCI7XG4gICAgICAgIGNhc2UgXCJkaWZmXCI6ICAgICAgICAgICAgIHJldHVybiBcImRpZmZcIjtcbiAgICAgICAgY2FzZSBcImRvY2tlcmZpbGVcIjogICAgICAgcmV0dXJuIFwiZG9ja2VyZmlsZVwiO1xuICAgICAgICBjYXNlIFwiZHRkXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJkdGRcIjtcbiAgICAgICAgY2FzZSBcImR5bGFuXCI6ICAgICAgICAgICAgcmV0dXJuIFwiZHlsYW5cIjtcbiAgICAgICAgLy8gRWlmZmVsIHdhcyB0aGVyZSBmaXJzdCBidXQgZWxpeGlyIHNlZW1zIG1vcmUgbGlrZWx5XG4gICAgICAgIC8vIGNhc2UgXCJlaWZmZWxcIjogICAgICAgICAgIHJldHVybiBcImVcIjtcbiAgICAgICAgY2FzZSBcImVsaXhpclwiOiAgICAgICAgICAgcmV0dXJuIFwiZVwiO1xuICAgICAgICBjYXNlIFwiZWxtXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJlbG1cIjtcbiAgICAgICAgY2FzZSBcImVybGFuZ1wiOiAgICAgICAgICAgcmV0dXJuIFwiZXJsXCI7XG4gICAgICAgIGNhc2UgXCJmI1wiOiAgICAgICAgICAgICAgIHJldHVybiBcImZzXCI7XG4gICAgICAgIGNhc2UgXCJmYWN0b3JcIjogICAgICAgICAgIHJldHVybiBcImZhY3RvclwiO1xuICAgICAgICBjYXNlIFwiZm9ydGhcIjogICAgICAgICAgICByZXR1cm4gXCJmdGhcIjtcbiAgICAgICAgY2FzZSBcImZvcnRyYW5cIjogICAgICAgICAgcmV0dXJuIFwiZjkwXCI7XG4gICAgICAgIGNhc2UgXCJnYXNcIjogICAgICAgICAgICAgIHJldHVybiBcImFzbVwiO1xuICAgICAgICBjYXNlIFwiZ29cIjogICAgICAgICAgICAgICByZXR1cm4gXCJnb1wiO1xuICAgICAgICAvLyBHRk06IENvZGVNaXJyb3IncyBnaXRodWItZmxhdm9yZWQgbWFya2Rvd25cbiAgICAgICAgY2FzZSBcImdmbVwiOiAgICAgICAgICAgICAgcmV0dXJuIFwibWRcIjtcbiAgICAgICAgY2FzZSBcImdyb292eVwiOiAgICAgICAgICAgcmV0dXJuIFwiZ3Jvb3Z5XCI7XG4gICAgICAgIGNhc2UgXCJoYW1sXCI6ICAgICAgICAgICAgIHJldHVybiBcImhhbWxcIjtcbiAgICAgICAgY2FzZSBcImhhbmRsZWJhcnNcIjogICAgICAgcmV0dXJuIFwiaGJzXCI7XG4gICAgICAgIGNhc2UgXCJoYXNrZWxsXCI6ICAgICAgICAgIHJldHVybiBcImhzXCI7XG4gICAgICAgIGNhc2UgXCJoYXhlXCI6ICAgICAgICAgICAgIHJldHVybiBcImh4XCI7XG4gICAgICAgIGNhc2UgXCJodG1sXCI6ICAgICAgICAgICAgIHJldHVybiBcImh0bWxcIjtcbiAgICAgICAgY2FzZSBcImh0bWxlbWJlZGRlZFwiOiAgICAgcmV0dXJuIFwiaHRtbFwiO1xuICAgICAgICBjYXNlIFwiaHRtbG1peGVkXCI6ICAgICAgICByZXR1cm4gXCJodG1sXCI7XG4gICAgICAgIGNhc2UgXCJqYXZhXCI6ICAgICAgICAgICAgIHJldHVybiBcImphdmFcIjtcbiAgICAgICAgY2FzZSBcImphdmFzY3JpcHRcIjogICAgICAgcmV0dXJuIFwianNcIjtcbiAgICAgICAgY2FzZSBcImppbmphMlwiOiAgICAgICAgICAgcmV0dXJuIFwiamluamFcIjtcbiAgICAgICAgY2FzZSBcImp1bGlhXCI6ICAgICAgICAgICAgcmV0dXJuIFwiamxcIjtcbiAgICAgICAgY2FzZSBcImpzeFwiOiAgICAgICAgICAgICAgcmV0dXJuIFwianN4XCI7XG4gICAgICAgIGNhc2UgXCJrb3RsaW5cIjogICAgICAgICAgIHJldHVybiBcImt0XCI7XG4gICAgICAgIGNhc2UgXCJsYXRleFwiOiAgICAgICAgICAgIHJldHVybiBcImxhdGV4XCI7XG4gICAgICAgIGNhc2UgXCJsZXNzXCI6ICAgICAgICAgICAgIHJldHVybiBcImxlc3NcIjtcbiAgICAgICAgY2FzZSBcImx1YVwiOiAgICAgICAgICAgICAgcmV0dXJuIFwibHVhXCI7XG4gICAgICAgIGNhc2UgXCJtYXJrZG93blwiOiAgICAgICAgIHJldHVybiBcIm1kXCI7XG4gICAgICAgIGNhc2UgXCJtbGxpa2VcIjogICAgICAgICAgICByZXR1cm4gXCJtbFwiO1xuICAgICAgICBjYXNlIFwib2NhbWxcIjogICAgICAgICAgICByZXR1cm4gXCJtbFwiO1xuICAgICAgICBjYXNlIFwib2N0YXZlXCI6ICAgICAgICAgICByZXR1cm4gXCJtXCI7XG4gICAgICAgIGNhc2UgXCJwYXNjYWxcIjogICAgICAgICAgIHJldHVybiBcInBhc1wiO1xuICAgICAgICBjYXNlIFwicGVybFwiOiAgICAgICAgICAgICByZXR1cm4gXCJwbFwiO1xuICAgICAgICBjYXNlIFwicGhwXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJwaHBcIjtcbiAgICAgICAgY2FzZSBcInBvd2Vyc2hlbGxcIjogICAgICAgcmV0dXJuIFwicHMxXCI7XG4gICAgICAgIGNhc2UgXCJweXRob25cIjogICAgICAgICAgIHJldHVybiBcInB5XCI7XG4gICAgICAgIGNhc2UgXCJyXCI6ICAgICAgICAgICAgICAgIHJldHVybiBcInJcIjtcbiAgICAgICAgY2FzZSBcInJzdFwiOiAgICAgICAgICAgICAgcmV0dXJuIFwicnN0XCI7XG4gICAgICAgIGNhc2UgXCJydWJ5XCI6ICAgICAgICAgICAgIHJldHVybiBcInJ1YnlcIjtcbiAgICAgICAgY2FzZSBcInJ1c3RcIjogICAgICAgICAgICAgcmV0dXJuIFwicnNcIjtcbiAgICAgICAgY2FzZSBcInNhc1wiOiAgICAgICAgICAgICAgcmV0dXJuIFwic2FzXCI7XG4gICAgICAgIGNhc2UgXCJzYXNzXCI6ICAgICAgICAgICAgIHJldHVybiBcInNhc3NcIjtcbiAgICAgICAgY2FzZSBcInNjYWxhXCI6ICAgICAgICAgICAgcmV0dXJuIFwic2NhbGFcIjtcbiAgICAgICAgY2FzZSBcInNjaGVtZVwiOiAgICAgICAgICAgcmV0dXJuIFwic2NtXCI7XG4gICAgICAgIGNhc2UgXCJzY3NzXCI6ICAgICAgICAgICAgIHJldHVybiBcInNjc3NcIjtcbiAgICAgICAgY2FzZSBcInNtYWxsdGFsa1wiOiAgICAgICAgcmV0dXJuIFwic3RcIjtcbiAgICAgICAgY2FzZSBcInNoZWxsXCI6ICAgICAgICAgICAgcmV0dXJuIFwic2hcIjtcbiAgICAgICAgY2FzZSBcInNxbFwiOiAgICAgICAgICAgICAgcmV0dXJuIFwic3FsXCI7XG4gICAgICAgIGNhc2UgXCJzdGV4XCI6ICAgICAgICAgICAgIHJldHVybiBcImxhdGV4XCI7XG4gICAgICAgIGNhc2UgXCJzd2lmdFwiOiAgICAgICAgICAgIHJldHVybiBcInN3aWZ0XCI7XG4gICAgICAgIGNhc2UgXCJ0Y2xcIjogICAgICAgICAgICAgIHJldHVybiBcInRjbFwiO1xuICAgICAgICBjYXNlIFwidG9tbFwiOiAgICAgICAgICAgICByZXR1cm4gXCJ0b21sXCI7XG4gICAgICAgIGNhc2UgXCJ0d2lnXCI6ICAgICAgICAgICAgIHJldHVybiBcInR3aWdcIjtcbiAgICAgICAgY2FzZSBcInR5cGVzY3JpcHRcIjogICAgICAgcmV0dXJuIFwidHNcIjtcbiAgICAgICAgY2FzZSBcInZiXCI6ICAgICAgICAgICAgICAgcmV0dXJuIFwidmJcIjtcbiAgICAgICAgY2FzZSBcInZic2NyaXB0XCI6ICAgICAgICAgcmV0dXJuIFwidmJzXCI7XG4gICAgICAgIGNhc2UgXCJ2ZXJpbG9nXCI6ICAgICAgICAgIHJldHVybiBcInN2XCI7XG4gICAgICAgIGNhc2UgXCJ2aGRsXCI6ICAgICAgICAgICAgIHJldHVybiBcInZoZGxcIjtcbiAgICAgICAgY2FzZSBcInhtbFwiOiAgICAgICAgICAgICAgcmV0dXJuIFwieG1sXCI7XG4gICAgICAgIGNhc2UgXCJ5YW1sXCI6ICAgICAgICAgICAgIHJldHVybiBcInlhbWxcIjtcbiAgICAgICAgY2FzZSBcIno4MFwiOiAgICAgICAgICAgICAgcmV0dXJuIFwiejhhXCI7XG4gICAgfVxuICAgIHJldHVybiBcInR4dFwiO1xufVxuXG4vLyBNYWtlIHRzbGludCBoYXBweVxuY29uc3QgZm9udEZhbWlseSA9IFwiZm9udC1mYW1pbHlcIjtcblxuLy8gQ2FuJ3QgYmUgdGVzdGVkIGUyZSA6L1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVNpbmdsZUd1aWZvbnQoZ3VpZm9udDogc3RyaW5nLCBkZWZhdWx0czogYW55KSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGd1aWZvbnQuc3BsaXQoXCI6XCIpO1xuICAgIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzKTtcbiAgICBpZiAoL15bYS16QS1aMC05XSskLy50ZXN0KG9wdGlvbnNbMF0pKSB7XG4gICAgICAgIHJlc3VsdFtmb250RmFtaWx5XSA9IG9wdGlvbnNbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0W2ZvbnRGYW1pbHldID0gSlNPTi5zdHJpbmdpZnkob3B0aW9uc1swXSk7XG4gICAgfVxuICAgIGlmIChkZWZhdWx0c1tmb250RmFtaWx5XSkge1xuICAgICAgICByZXN1bHRbZm9udEZhbWlseV0gKz0gYCwgJHtkZWZhdWx0c1tmb250RmFtaWx5XX1gO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucy5zbGljZSgxKS5yZWR1Y2UoKGFjYywgb3B0aW9uKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKG9wdGlvblswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJoXCI6XG4gICAgICAgICAgICAgICAgICAgIGFjY1tcImZvbnQtc2l6ZVwiXSA9IGAke29wdGlvbi5zbGljZSgxKX1wdGA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJiXCI6XG4gICAgICAgICAgICAgICAgICAgIGFjY1tcImZvbnQtd2VpZ2h0XCJdID0gXCJib2xkXCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJpXCI6XG4gICAgICAgICAgICAgICAgICAgIGFjY1tcImZvbnQtc3R5bGVcIl0gPSBcIml0YWxpY1wiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwidVwiOlxuICAgICAgICAgICAgICAgICAgICBhY2NbXCJ0ZXh0LWRlY29yYXRpb25cIl0gPSBcInVuZGVybGluZVwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwic1wiOlxuICAgICAgICAgICAgICAgICAgICBhY2NbXCJ0ZXh0LWRlY29yYXRpb25cIl0gPSBcImxpbmUtdGhyb3VnaFwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwid1wiOiAvLyBDYW4ndCBzZXQgZm9udCB3aWR0aC4gV291bGQgaGF2ZSB0byBhZGp1c3QgY2VsbCB3aWR0aC5cbiAgICAgICAgICAgICAgICBjYXNlIFwiY1wiOiAvLyBDYW4ndCBzZXQgY2hhcmFjdGVyIHNldFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIHJlc3VsdCBhcyBhbnkpO1xufTtcblxuLy8gUGFyc2VzIGEgZ3VpZm9udCBkZWNsYXJhdGlvbiBhcyBkZXNjcmliZWQgaW4gYDpoIEUyNDRgXG4vLyBkZWZhdWx0czogZGVmYXVsdCB2YWx1ZSBmb3IgZWFjaCBvZi5cbi8vIENhbid0IGJlIHRlc3RlZCBlMmUgOi9cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VHdWlmb250KGd1aWZvbnQ6IHN0cmluZywgZGVmYXVsdHM6IGFueSkge1xuICAgIGNvbnN0IGZvbnRzID0gZ3VpZm9udC5zcGxpdChcIixcIikucmV2ZXJzZSgpO1xuICAgIHJldHVybiBmb250cy5yZWR1Y2UoKGFjYywgY3VyKSA9PiBwYXJzZVNpbmdsZUd1aWZvbnQoY3VyLCBhY2MpLCBkZWZhdWx0cyk7XG59XG5cbi8vIENvbXB1dGVzIGEgdW5pcXVlIHNlbGVjdG9yIGZvciBpdHMgYXJndW1lbnQuXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZVNlbGVjdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgZnVuY3Rpb24gdW5pcXVlU2VsZWN0b3IoZTogSFRNTEVsZW1lbnQpOiBzdHJpbmcge1xuICAgICAgICAvLyBPbmx5IG1hdGNoaW5nIGFscGhhbnVtZXJpYyBzZWxlY3RvcnMgYmVjYXVzZSBvdGhlcnMgY2hhcnMgbWlnaHQgaGF2ZSBzcGVjaWFsIG1lYW5pbmcgaW4gQ1NTXG4gICAgICAgIGlmIChlLmlkICYmIGUuaWQubWF0Y2goXCJeW2EtekEtWjAtOV8tXSskXCIpKSB7XG4gICAgICAgICAgICBjb25zdCBpZCA9IGUudGFnTmFtZSArIGBbaWQ9XCIke2UuaWR9XCJdYDtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGlkKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgd2UgcmVhY2hlZCB0aGUgdG9wIG9mIHRoZSBkb2N1bWVudFxuICAgICAgICBpZiAoIWUucGFyZW50RWxlbWVudCkgeyByZXR1cm4gXCJIVE1MXCI7IH1cbiAgICAgICAgLy8gQ29tcHV0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIGVsZW1lbnRcbiAgICAgICAgY29uc3QgaW5kZXggPVxuICAgICAgICAgICAgQXJyYXkuZnJvbShlLnBhcmVudEVsZW1lbnQuY2hpbGRyZW4pXG4gICAgICAgICAgICAgICAgLmZpbHRlcihjaGlsZCA9PiBjaGlsZC50YWdOYW1lID09PSBlLnRhZ05hbWUpXG4gICAgICAgICAgICAgICAgLmluZGV4T2YoZSkgKyAxO1xuICAgICAgICByZXR1cm4gYCR7dW5pcXVlU2VsZWN0b3IoZS5wYXJlbnRFbGVtZW50KX0gPiAke2UudGFnTmFtZX06bnRoLW9mLXR5cGUoJHtpbmRleH0pYDtcbiAgICB9XG4gICAgcmV0dXJuIHVuaXF1ZVNlbGVjdG9yKGVsZW1lbnQpO1xufVxuXG4vLyBUdXJucyBhIG51bWJlciBpbnRvIGl0cyBoYXNoKzYgbnVtYmVyIGhleGFkZWNpbWFsIHJlcHJlc2VudGF0aW9uLlxuZXhwb3J0IGZ1bmN0aW9uIHRvSGV4Q3NzKG46IG51bWJlcikge1xuICAgIGlmIChuID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3Qgc3RyID0gbi50b1N0cmluZygxNik7XG4gICAgLy8gUGFkIHdpdGggbGVhZGluZyB6ZXJvc1xuICAgIHJldHVybiBcIiNcIiArIChuZXcgQXJyYXkoNiAtIHN0ci5sZW5ndGgpKS5maWxsKFwiMFwiKS5qb2luKFwiXCIpICsgc3RyO1xufVxuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGF1dG9maWxsIH0gZnJvbSBcIi4vYXV0b2ZpbGxcIjtcbmltcG9ydCB7IGNvbmZSZWFkeSwgZ2V0Q29uZiB9IGZyb20gXCIuL3V0aWxzL2NvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCB7IGZpcmVudmltR2xvYmFsLCBhY3RpdmVGdW5jdGlvbnMgfSBmcm9tIFwiLi9jb21tb25cIjtcblxuaWYgKGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPT09IFwiaHR0cHM6Ly9naXRodWIuY29tL2dsYWNhbWJyZS9maXJlbnZpbS9pc3N1ZXMvbmV3XCJcbiAgICB8fCBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCA9PT0gXCJmaWxlOlwiICYmIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYuZW5kc1dpdGgoXCJnaXRodWIuaHRtbFwiKSkge1xuICAgIGFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGF1dG9maWxsKTtcbn1cblxuZnVuY3Rpb24gc2V0dXBMaXN0ZW5lcnMoc2VsZWN0b3I6IHN0cmluZykge1xuICAgIGZ1bmN0aW9uIG9uU2Nyb2xsKGNvbnQ6IGJvb2xlYW4pIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwb3NDaGFuZ2VkID0gQXJyYXkuZnJvbShmaXJlbnZpbUdsb2JhbC5maXJlbnZpbUVsZW1zLmVudHJpZXMoKSlcbiAgICAgICAgICAgICAgICAubWFwKChbXywgZWxlbV0pID0+IGVsZW0ucHV0RWRpdG9yQ2xvc2VUb0lucHV0T3JpZ2luKCkpXG4gICAgICAgICAgICAgICAgLmZpbmQoY2hhbmdlZCA9PiBjaGFuZ2VkLnBvc0NoYW5nZWQpO1xuICAgICAgICAgICAgaWYgKHBvc0NoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBBcyBsb25nIGFzIG9uZSBlZGl0b3IgY2hhbmdlcyBwb3NpdGlvbiwgdHJ5IHRvIHJlc2l6ZVxuICAgICAgICAgICAgICAgIG9uU2Nyb2xsKHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjb250KSB7XG4gICAgICAgICAgICAgICAgLy8gTm8gZWRpdG9yIGhhcyBtb3ZlZCwgYnV0IHRoaXMgbWlnaHQgYmUgYmVjYXVzZSB0aGUgd2Vic2l0ZVxuICAgICAgICAgICAgICAgIC8vIGltcGxlbWVudHMgc29tZSBraW5kIG9mIHNtb290aCBzY3JvbGxpbmcgdGhhdCBkb2Vzbid0IG1ha2VcbiAgICAgICAgICAgICAgICAvLyB0aGUgdGV4dGFyZWEgbW92ZSBpbW1lZGlhdGVseS4gSW4gb3JkZXIgdG8gZGVhbCB3aXRoIHRoZXNlXG4gICAgICAgICAgICAgICAgLy8gY2FzZXMsIHNjaGVkdWxlIGEgbGFzdCByZWRyYXcgaW4gYSBmZXcgbWlsbGlzZWNvbmRzXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBvblNjcm9sbChmYWxzZSksIDEwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkb1Njcm9sbCgpIHtcbiAgICAgICAgcmV0dXJuIG9uU2Nyb2xsKHRydWUpO1xuICAgIH1cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBkb1Njcm9sbCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ3aGVlbFwiLCBkb1Njcm9sbCk7XG4gICAgKG5ldyAoKHdpbmRvdyBhcyBhbnkpLlJlc2l6ZU9ic2VydmVyKSgoXzogYW55W10pID0+IHtcbiAgICAgICAgb25TY3JvbGwodHJ1ZSk7XG4gICAgfSkpLm9ic2VydmUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KTtcblxuICAgIGZ1bmN0aW9uIGFkZE52aW1MaXN0ZW5lcihlbGVtOiBFbGVtZW50KSB7XG4gICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIGZpcmVudmltR2xvYmFsLm52aW1pZnkpO1xuICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBmaXJlbnZpbUdsb2JhbC5udmltaWZ5KTtcbiAgICAgICAgbGV0IHBhcmVudCA9IGVsZW0ucGFyZW50RWxlbWVudDtcbiAgICAgICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgICAgICAgcGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZG9TY3JvbGwpO1xuICAgICAgICAgICAgcGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZG9TY3JvbGwpO1xuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAobmV3IE11dGF0aW9uT2JzZXJ2ZXIoKGNoYW5nZXMsIF8pID0+IHtcbiAgICAgICAgaWYgKGNoYW5nZXMuZmlsdGVyKGNoYW5nZSA9PiBjaGFuZ2UuYWRkZWROb2Rlcy5sZW5ndGggPiAwKS5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoaXMgbXV0YXRpb24gb2JzZXJ2ZXIgaXMgdHJpZ2dlcmVkIGV2ZXJ5IHRpbWUgYW4gZWxlbWVudCBpc1xuICAgICAgICAvLyBhZGRlZC9yZW1vdmVkIGZyb20gdGhlIHBhZ2UuIFdoZW4gdGhpcyBoYXBwZW5zLCB0cnkgdG8gYXBwbHlcbiAgICAgICAgLy8gbGlzdGVuZXJzIGFnYWluLCBpbiBjYXNlIGEgbmV3IHRleHRhcmVhL2lucHV0IGZpZWxkIGhhcyBiZWVuIGFkZGVkLlxuICAgICAgICBjb25zdCB0b1Bvc3NpYmx5TnZpbWlmeSA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICAgICAgICB0b1Bvc3NpYmx5TnZpbWlmeS5mb3JFYWNoKGVsZW0gPT4gYWRkTnZpbUxpc3RlbmVyKGVsZW0pKTtcblxuICAgICAgICBjb25zdCB0YWtlb3ZlciA9IGdldENvbmYoKS50YWtlb3ZlcjtcbiAgICAgICAgZnVuY3Rpb24gc2hvdWxkTnZpbWlmeShub2RlOiBhbnkpIHtcbiAgICAgICAgICAgIC8vIElkZWFsbHksIHRoZSB0YWtlb3ZlciAhPT0gXCJuZXZlclwiIGNoZWNrIHNob3VsZG4ndCBiZSBwZXJmb3JtZWRcbiAgICAgICAgICAgIC8vIGhlcmU6IGl0IHNob3VsZCBsaXZlIGluIG52aW1pZnkoKS4gSG93ZXZlciwgbnZpbWlmeSgpIG9ubHlcbiAgICAgICAgICAgIC8vIGNoZWNrcyBmb3IgdGFrZW92ZXIgPT09IFwibmV2ZXJcIiBpZiBpdCBpcyBjYWxsZWQgZnJvbSBhbiBldmVudFxuICAgICAgICAgICAgLy8gaGFuZGxlciAodGhpcyBpcyBuZWNlc3NhcnkgaW4gb3JkZXIgdG8gYWxsb3cgbWFudWFsbHkgbnZpbWlmeWluZ1xuICAgICAgICAgICAgLy8gZWxlbWVudHMpLiBUaHVzLCB3ZSBuZWVkIHRvIGNoZWNrIGlmIHRha2VvdmVyICE9PSBcIm5ldmVyXCIgaGVyZVxuICAgICAgICAgICAgLy8gdG9vLlxuICAgICAgICAgICAgcmV0dXJuIHRha2VvdmVyICE9PSBcIm5ldmVyXCJcbiAgICAgICAgICAgICAgICAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBub2RlXG4gICAgICAgICAgICAgICAgJiYgdG9Qb3NzaWJseU52aW1pZnkuaW5jbHVkZXMobm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBhbHNvIG5lZWQgdG8gY2hlY2sgaWYgdGhlIGN1cnJlbnRseSBmb2N1c2VkIGVsZW1lbnQgaXMgYW1vbmcgdGhlXG4gICAgICAgIC8vIG5ld2x5IGNyZWF0ZWQgZWxlbWVudHMgYW5kIGlmIGl0IGlzLCBudmltaWZ5IGl0LlxuICAgICAgICAvLyBOb3RlIHRoYXQgd2UgY2FuJ3QgZG8gdGhpcyB1bmNvbmRpdGlvbmFsbHk6IHdlIHdvdWxkIHR1cm4gdGhlIGFjdGl2ZVxuICAgICAgICAvLyBlbGVtZW50IGludG8gYSBuZW92aW0gZnJhbWUgZXZlbiBmb3IgdW5yZWxhdGVkIGRvbSBjaGFuZ2VzLlxuICAgICAgICBmb3IgKGNvbnN0IG1yIG9mIGNoYW5nZXMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiBtci5hZGRlZE5vZGVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNob3VsZE52aW1pZnkobm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlRnVuY3Rpb25zLmZvcmNlTnZpbWlmeSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIobm9kZSwgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQpO1xuICAgICAgICAgICAgICAgIHdoaWxlICh3YWxrZXIubmV4dE5vZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2hvdWxkTnZpbWlmeSh3YWxrZXIuY3VycmVudE5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVGdW5jdGlvbnMuZm9yY2VOdmltaWZ5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KSkub2JzZXJ2ZSh3aW5kb3cuZG9jdW1lbnQsIHsgc3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlIH0pO1xuXG4gICAgbGV0IGVsZW1lbnRzOiBIVE1MRWxlbWVudFtdO1xuICAgIHRyeSB7XG4gICAgICAgIGVsZW1lbnRzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAgIGFsZXJ0KGBGaXJlbnZpbSBlcnJvcjogaW52YWxpZCBDU1Mgc2VsZWN0b3IgKCR7c2VsZWN0b3J9KSBpbiB5b3VyIGc6ZmlyZW52aW1fY29uZmlnLmApO1xuICAgICAgICBlbGVtZW50cyA9IFtdO1xuICAgIH1cbiAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW0gPT4gYWRkTnZpbUxpc3RlbmVyKGVsZW0pKTtcbn1cblxuZXhwb3J0IGNvbnN0IGxpc3RlbmVyc1NldHVwID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgY29uZlJlYWR5LnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zdCBjb25mOiB7IHNlbGVjdG9yOiBzdHJpbmcgfSA9IGdldENvbmYoKTtcbiAgICAgICAgaWYgKGNvbmYuc2VsZWN0b3IgIT09IHVuZGVmaW5lZCAmJiBjb25mLnNlbGVjdG9yICE9PSBcIlwiKSB7XG4gICAgICAgICAgICBzZXR1cExpc3RlbmVycyhjb25mLnNlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=