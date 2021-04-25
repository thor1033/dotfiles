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
/* harmony import */ var _utils_configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/configuration */ "./src/utils/configuration.ts");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/utils */ "./src/utils/utils.ts");
/* harmony import */ var _editors_editors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editors/editors */ "./src/editors/editors.ts");
/* provided dependency */ var browser = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");



class FirenvimElement {
    // elem is the element that received the focusEvent.
    // Nvimify is the function that listens for focus events. We need to know
    // about it in order to remove it before focusing elem (otherwise we'll
    // just grab focus again).
    constructor(elem, listener, onDetach) {
        // focusInfo is used to keep track of focus listeners and timeouts created
        // by FirenvimElement.focus(). FirenvimElement.focus() creates these
        // listeners and timeouts in order to work around pages that try to grab
        // the focus again after the FirenvimElement has been created or after the
        // underlying element's content has changed.
        this.focusInfo = {
            finalRefocusTimeouts: [],
            refocusRefs: [],
            refocusTimeouts: [],
        };
        // resizeReqId keeps track of the number of resizing requests that are sent
        // to the iframe. We send and increment it for every resize requests, this
        // lets the iframe know what the most recently sent resize request is and
        // thus avoids reacting to an older resize request if a more recent has
        // already been processed.
        this.resizeReqId = 0;
        // relativeX/Y is the position the iframe should have relative to the input
        // element in order to be both as close as possible to the input element
        // and fit in the window without overflowing out of the viewport.
        this.relativeX = 0;
        this.relativeY = 0;
        // firstPutEditorCloseToInputOrigin keeps track of whether this is the
        // first time the putEditorCloseToInputOrigin function is called from the
        // iframe. See putEditorCloseToInputOriginAfterResizeFromFrame() for more
        // information.
        this.firstPutEditorCloseToInputOrigin = true;
        // bufferInfo: a [url, selector, cursor, lang] tuple indicating the page
        // the last iframe was created on, the selector of the corresponding
        // textarea and the column/line number of the cursor.
        // Note that these are __default__ values. Real values must be created with
        // prepareBufferInfo(). The reason we're not doing this from the
        // constructor is that it's expensive and disruptive - getting this
        // information requires evaluating code in the page's context.
        this.bufferInfo = Promise.resolve(["", "", [1, 1], undefined]);
        // cursor: last known cursor position. Updated on getPageElementCursor and
        // setPageElementCursor
        this.cursor = [1, 1];
        this.originalElement = elem;
        this.nvimify = listener;
        this.onDetach = onDetach;
        this.editor = (0,_editors_editors__WEBPACK_IMPORTED_MODULE_2__.getEditor)(elem);
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
        const renderer = (0,_utils_configuration__WEBPACK_IMPORTED_MODULE_0__.getConf)().renderer === "canvas" ? "/index.html" : "/NeovimFrame.html";
        this.iframe.src = browser.extension.getURL(renderer);
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
                // Then, attempt to "release" the focus from whatever element
                // is currently focused. This doesn't work on Chrome.
                if (!(0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.isChrome)()) {
                    window.focus();
                    document.documentElement.focus();
                    document.body.focus();
                }
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
        return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.computeSelector)(this.getElement());
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
    constructor(e) {
        super();
        // This function will be stringified and inserted in page context so we
        // can't instrument it.
        /* istanbul ignore next */
        this.getAce = (selec) => {
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
        this.elem = e;
        // Get the topmost ace element
        let parent = this.elem.parentElement;
        while (AceEditor.matches(parent)) {
            this.elem = parent;
            parent = parent.parentElement;
        }
    }
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
        resolve();
    });
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9GaXJlbnZpbS8uL25vZGVfbW9kdWxlcy93ZWJleHRlbnNpb24tcG9seWZpbGwvZGlzdC9icm93c2VyLXBvbHlmaWxsLmpzIiwid2VicGFjazovL0ZpcmVudmltLy4vc3JjL0ZpcmVudmltRWxlbWVudC50cyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL3NyYy9hdXRvZmlsbC50cyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL3NyYy9jb21tb24udHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvZWRpdG9ycy9BYnN0cmFjdEVkaXRvci50cyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL3NyYy9lZGl0b3JzL0FjZUVkaXRvci50cyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL3NyYy9lZGl0b3JzL0NvZGVNaXJyb3JFZGl0b3IudHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvZWRpdG9ycy9Nb25hY29FZGl0b3IudHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvZWRpdG9ycy9UZXh0YXJlYUVkaXRvci50cyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL3NyYy9lZGl0b3JzL2VkaXRvcnMudHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvcGFnZS9mdW5jdGlvbnMudHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvdXRpbHMvY29uZmlndXJhdGlvbi50cyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL3NyYy91dGlscy9rZXlzLnRzIiwid2VicGFjazovL0ZpcmVudmltLy4vc3JjL3V0aWxzL3V0aWxzLnRzIiwid2VicGFjazovL0ZpcmVudmltL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0ZpcmVudmltL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9GaXJlbnZpbS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0ZpcmVudmltL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0FBRUEsT0FBTzs7QUFFUDtBQUNBLE1BQU0sSUFBMEM7QUFDaEQsSUFBSSxpQ0FBZ0MsQ0FBQyxNQUFRLENBQUMsb0NBQUUsT0FBTztBQUFBO0FBQUE7QUFBQSxrR0FBQztBQUN4RCxHQUFHLE1BQU0sWUFRTjtBQUNILENBQUM7QUFDRDs7QUFFQSxxQ0FBcUM7O0FBRXJDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWEsT0FBTywwQ0FBMEMsT0FBTztBQUNyRTtBQUNBLHVTQUF1UztBQUN2UztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0FBQyxFQUFFO0lBQ2hELGdFQUFjLENBQUMsR0FBRyxFQUFFO1FBQ2hCLE1BQU0sSUFBSSxHQUF5Qiw2REFBTyxFQUFFLENBQUM7UUFDN0MsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLEVBQUUsRUFBRTtZQUNyRCxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2pDO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImNvbnRlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqIElNUE9SVFMgRlJPTSBpbXBvcnRzLWxvYWRlciAqKiovXG5cbmJyb3dzZXIgPSB1bmRlZmluZWQ7XG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiLCBbXCJtb2R1bGVcIl0sIGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgZmFjdG9yeShtb2R1bGUpO1xuICB9IGVsc2Uge1xuICAgIHZhciBtb2QgPSB7XG4gICAgICBleHBvcnRzOiB7fVxuICAgIH07XG4gICAgZmFjdG9yeShtb2QpO1xuICAgIGdsb2JhbC5icm93c2VyID0gbW9kLmV4cG9ydHM7XG4gIH1cbn0pKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsVGhpcyA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgLyogd2ViZXh0ZW5zaW9uLXBvbHlmaWxsIC0gdjAuNy4wIC0gVHVlIE5vdiAxMCAyMDIwIDIwOjI0OjA0ICovXG5cbiAgLyogLSotIE1vZGU6IGluZGVudC10YWJzLW1vZGU6IG5pbDsganMtaW5kZW50LWxldmVsOiAyIC0qLSAqL1xuXG4gIC8qIHZpbTogc2V0IHN0cz0yIHN3PTIgZXQgdHc9ODA6ICovXG5cbiAgLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICAgKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gICAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGlmICh0eXBlb2YgYnJvd3NlciA9PT0gXCJ1bmRlZmluZWRcIiB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoYnJvd3NlcikgIT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgICBjb25zdCBDSFJPTUVfU0VORF9NRVNTQUdFX0NBTExCQUNLX05PX1JFU1BPTlNFX01FU1NBR0UgPSBcIlRoZSBtZXNzYWdlIHBvcnQgY2xvc2VkIGJlZm9yZSBhIHJlc3BvbnNlIHdhcyByZWNlaXZlZC5cIjtcbiAgICBjb25zdCBTRU5EX1JFU1BPTlNFX0RFUFJFQ0FUSU9OX1dBUk5JTkcgPSBcIlJldHVybmluZyBhIFByb21pc2UgaXMgdGhlIHByZWZlcnJlZCB3YXkgdG8gc2VuZCBhIHJlcGx5IGZyb20gYW4gb25NZXNzYWdlL29uTWVzc2FnZUV4dGVybmFsIGxpc3RlbmVyLCBhcyB0aGUgc2VuZFJlc3BvbnNlIHdpbGwgYmUgcmVtb3ZlZCBmcm9tIHRoZSBzcGVjcyAoU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RvY3MvTW96aWxsYS9BZGQtb25zL1dlYkV4dGVuc2lvbnMvQVBJL3J1bnRpbWUvb25NZXNzYWdlKVwiOyAvLyBXcmFwcGluZyB0aGUgYnVsayBvZiB0aGlzIHBvbHlmaWxsIGluIGEgb25lLXRpbWUtdXNlIGZ1bmN0aW9uIGlzIGEgbWlub3JcbiAgICAvLyBvcHRpbWl6YXRpb24gZm9yIEZpcmVmb3guIFNpbmNlIFNwaWRlcm1vbmtleSBkb2VzIG5vdCBmdWxseSBwYXJzZSB0aGVcbiAgICAvLyBjb250ZW50cyBvZiBhIGZ1bmN0aW9uIHVudGlsIHRoZSBmaXJzdCB0aW1lIGl0J3MgY2FsbGVkLCBhbmQgc2luY2UgaXQgd2lsbFxuICAgIC8vIG5ldmVyIGFjdHVhbGx5IG5lZWQgdG8gYmUgY2FsbGVkLCB0aGlzIGFsbG93cyB0aGUgcG9seWZpbGwgdG8gYmUgaW5jbHVkZWRcbiAgICAvLyBpbiBGaXJlZm94IG5lYXJseSBmb3IgZnJlZS5cblxuICAgIGNvbnN0IHdyYXBBUElzID0gZXh0ZW5zaW9uQVBJcyA9PiB7XG4gICAgICAvLyBOT1RFOiBhcGlNZXRhZGF0YSBpcyBhc3NvY2lhdGVkIHRvIHRoZSBjb250ZW50IG9mIHRoZSBhcGktbWV0YWRhdGEuanNvbiBmaWxlXG4gICAgICAvLyBhdCBidWlsZCB0aW1lIGJ5IHJlcGxhY2luZyB0aGUgZm9sbG93aW5nIFwiaW5jbHVkZVwiIHdpdGggdGhlIGNvbnRlbnQgb2YgdGhlXG4gICAgICAvLyBKU09OIGZpbGUuXG4gICAgICBjb25zdCBhcGlNZXRhZGF0YSA9IHtcbiAgICAgICAgXCJhbGFybXNcIjoge1xuICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGVhckFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImJvb2ttYXJrc1wiOiB7XG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDaGlsZHJlblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFJlY2VudFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFN1YlRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRUcmVlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwibW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJicm93c2VyQWN0aW9uXCI6IHtcbiAgICAgICAgICBcImRpc2FibGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJlbmFibGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRCYWRnZUJhY2tncm91bmRDb2xvclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEJhZGdlVGV4dFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJvcGVuUG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRCYWRnZUJhY2tncm91bmRDb2xvclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEJhZGdlVGV4dFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEljb25cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRQb3B1cFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFRpdGxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYnJvd3NpbmdEYXRhXCI6IHtcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUNhY2hlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlQ29va2llc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZURvd25sb2Fkc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUZvcm1EYXRhXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlSGlzdG9yeVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUxvY2FsU3RvcmFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVBhc3N3b3Jkc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVBsdWdpbkRhdGFcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXR0aW5nc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvbW1hbmRzXCI6IHtcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvbnRleHRNZW51c1wiOiB7XG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJjb29raWVzXCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbENvb2tpZVN0b3Jlc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImRldnRvb2xzXCI6IHtcbiAgICAgICAgICBcImluc3BlY3RlZFdpbmRvd1wiOiB7XG4gICAgICAgICAgICBcImV2YWxcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDIsXG4gICAgICAgICAgICAgIFwic2luZ2xlQ2FsbGJhY2tBcmdcIjogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicGFuZWxzXCI6IHtcbiAgICAgICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDMsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAzLFxuICAgICAgICAgICAgICBcInNpbmdsZUNhbGxiYWNrQXJnXCI6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImVsZW1lbnRzXCI6IHtcbiAgICAgICAgICAgICAgXCJjcmVhdGVTaWRlYmFyUGFuZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJkb3dubG9hZHNcIjoge1xuICAgICAgICAgIFwiY2FuY2VsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZG93bmxvYWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJlcmFzZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEZpbGVJY29uXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwib3BlblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInBhdXNlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlRmlsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlc3VtZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNob3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJleHRlbnNpb25cIjoge1xuICAgICAgICAgIFwiaXNBbGxvd2VkRmlsZVNjaGVtZUFjY2Vzc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImlzQWxsb3dlZEluY29nbml0b0FjY2Vzc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImhpc3RvcnlcIjoge1xuICAgICAgICAgIFwiYWRkVXJsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGVsZXRlQWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGVsZXRlUmFuZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZWxldGVVcmxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRWaXNpdHNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpMThuXCI6IHtcbiAgICAgICAgICBcImRldGVjdExhbmd1YWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWNjZXB0TGFuZ3VhZ2VzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiaWRlbnRpdHlcIjoge1xuICAgICAgICAgIFwibGF1bmNoV2ViQXV0aEZsb3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpZGxlXCI6IHtcbiAgICAgICAgICBcInF1ZXJ5U3RhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJtYW5hZ2VtZW50XCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFNlbGZcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRFbmFibGVkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidW5pbnN0YWxsU2VsZlwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm5vdGlmaWNhdGlvbnNcIjoge1xuICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRQZXJtaXNzaW9uTGV2ZWxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJwYWdlQWN0aW9uXCI6IHtcbiAgICAgICAgICBcImdldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJoaWRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0SWNvblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzaG93XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicGVybWlzc2lvbnNcIjoge1xuICAgICAgICAgIFwiY29udGFpbnNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXF1ZXN0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicnVudGltZVwiOiB7XG4gICAgICAgICAgXCJnZXRCYWNrZ3JvdW5kUGFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBsYXRmb3JtSW5mb1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm9wZW5PcHRpb25zUGFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlcXVlc3RVcGRhdGVDaGVja1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlbmRNZXNzYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDNcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VuZE5hdGl2ZU1lc3NhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRVbmluc3RhbGxVUkxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXNzaW9uc1wiOiB7XG4gICAgICAgICAgXCJnZXREZXZpY2VzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UmVjZW50bHlDbG9zZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXN0b3JlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwic3RvcmFnZVwiOiB7XG4gICAgICAgICAgXCJsb2NhbFwiOiB7XG4gICAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm1hbmFnZWRcIjoge1xuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3luY1wiOiB7XG4gICAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInRhYnNcIjoge1xuICAgICAgICAgIFwiY2FwdHVyZVZpc2libGVUYWJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZXRlY3RMYW5ndWFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRpc2NhcmRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkdXBsaWNhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJleGVjdXRlU2NyaXB0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Q3VycmVudFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFpvb21cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRab29tU2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnb0JhY2tcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnb0ZvcndhcmRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJoaWdobGlnaHRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJpbnNlcnRDU1NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicXVlcnlcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZWxvYWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVDU1NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZW5kTWVzc2FnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFpvb21cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRab29tU2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ0b3BTaXRlc1wiOiB7XG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ3ZWJOYXZpZ2F0aW9uXCI6IHtcbiAgICAgICAgICBcImdldEFsbEZyYW1lc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEZyYW1lXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwid2ViUmVxdWVzdFwiOiB7XG4gICAgICAgICAgXCJoYW5kbGVyQmVoYXZpb3JDaGFuZ2VkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwid2luZG93c1wiOiB7XG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDdXJyZW50XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0TGFzdEZvY3VzZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaWYgKE9iamVjdC5rZXlzKGFwaU1ldGFkYXRhKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXBpLW1ldGFkYXRhLmpzb24gaGFzIG5vdCBiZWVuIGluY2x1ZGVkIGluIGJyb3dzZXItcG9seWZpbGxcIik7XG4gICAgICB9XG4gICAgICAvKipcbiAgICAgICAqIEEgV2Vha01hcCBzdWJjbGFzcyB3aGljaCBjcmVhdGVzIGFuZCBzdG9yZXMgYSB2YWx1ZSBmb3IgYW55IGtleSB3aGljaCBkb2VzXG4gICAgICAgKiBub3QgZXhpc3Qgd2hlbiBhY2Nlc3NlZCwgYnV0IGJlaGF2ZXMgZXhhY3RseSBhcyBhbiBvcmRpbmFyeSBXZWFrTWFwXG4gICAgICAgKiBvdGhlcndpc2UuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY3JlYXRlSXRlbVxuICAgICAgICogICAgICAgIEEgZnVuY3Rpb24gd2hpY2ggd2lsbCBiZSBjYWxsZWQgaW4gb3JkZXIgdG8gY3JlYXRlIHRoZSB2YWx1ZSBmb3IgYW55XG4gICAgICAgKiAgICAgICAga2V5IHdoaWNoIGRvZXMgbm90IGV4aXN0LCB0aGUgZmlyc3QgdGltZSBpdCBpcyBhY2Nlc3NlZC4gVGhlXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gcmVjZWl2ZXMsIGFzIGl0cyBvbmx5IGFyZ3VtZW50LCB0aGUga2V5IGJlaW5nIGNyZWF0ZWQuXG4gICAgICAgKi9cblxuXG4gICAgICBjbGFzcyBEZWZhdWx0V2Vha01hcCBleHRlbmRzIFdlYWtNYXAge1xuICAgICAgICBjb25zdHJ1Y3RvcihjcmVhdGVJdGVtLCBpdGVtcyA9IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHN1cGVyKGl0ZW1zKTtcbiAgICAgICAgICB0aGlzLmNyZWF0ZUl0ZW0gPSBjcmVhdGVJdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0KGtleSkge1xuICAgICAgICAgIGlmICghdGhpcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoa2V5LCB0aGlzLmNyZWF0ZUl0ZW0oa2V5KSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHN1cGVyLmdldChrZXkpO1xuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBvYmplY3QgaXMgYW4gb2JqZWN0IHdpdGggYSBgdGhlbmAgbWV0aG9kLCBhbmQgY2FuXG4gICAgICAgKiB0aGVyZWZvcmUgYmUgYXNzdW1lZCB0byBiZWhhdmUgYXMgYSBQcm9taXNlLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdGhlbmFibGUuXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCBpc1RoZW5hYmxlID0gdmFsdWUgPT4ge1xuICAgICAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSBcImZ1bmN0aW9uXCI7XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgZnVuY3Rpb24gd2hpY2gsIHdoZW4gY2FsbGVkLCB3aWxsIHJlc29sdmUgb3IgcmVqZWN0XG4gICAgICAgKiB0aGUgZ2l2ZW4gcHJvbWlzZSBiYXNlZCBvbiBob3cgaXQgaXMgY2FsbGVkOlxuICAgICAgICpcbiAgICAgICAqIC0gSWYsIHdoZW4gY2FsbGVkLCBgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yYCBjb250YWlucyBhIG5vbi1udWxsIG9iamVjdCxcbiAgICAgICAqICAgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQgd2l0aCB0aGF0IHZhbHVlLlxuICAgICAgICogLSBJZiB0aGUgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGggZXhhY3RseSBvbmUgYXJndW1lbnQsIHRoZSBwcm9taXNlIGlzXG4gICAgICAgKiAgIHJlc29sdmVkIHRvIHRoYXQgdmFsdWUuXG4gICAgICAgKiAtIE90aGVyd2lzZSwgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgdG8gYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlXG4gICAgICAgKiAgIGZ1bmN0aW9uJ3MgYXJndW1lbnRzLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9taXNlXG4gICAgICAgKiAgICAgICAgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHJlc29sdXRpb24gYW5kIHJlamVjdGlvbiBmdW5jdGlvbnMgb2YgYVxuICAgICAgICogICAgICAgIHByb21pc2UuXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9taXNlLnJlc29sdmVcbiAgICAgICAqICAgICAgICBUaGUgcHJvbWlzZSdzIHJlc29sdXRpb24gZnVuY3Rpb24uXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9taXNlLnJlamVjdGlvblxuICAgICAgICogICAgICAgIFRoZSBwcm9taXNlJ3MgcmVqZWN0aW9uIGZ1bmN0aW9uLlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IG1ldGFkYXRhXG4gICAgICAgKiAgICAgICAgTWV0YWRhdGEgYWJvdXQgdGhlIHdyYXBwZWQgbWV0aG9kIHdoaWNoIGhhcyBjcmVhdGVkIHRoZSBjYWxsYmFjay5cbiAgICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gbWV0YWRhdGEubWF4UmVzb2x2ZWRBcmdzXG4gICAgICAgKiAgICAgICAgVGhlIG1heGltdW0gbnVtYmVyIG9mIGFyZ3VtZW50cyB3aGljaCBtYXkgYmUgcGFzc2VkIHRvIHRoZVxuICAgICAgICogICAgICAgIGNhbGxiYWNrIGNyZWF0ZWQgYnkgdGhlIHdyYXBwZWQgYXN5bmMgZnVuY3Rpb24uXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge2Z1bmN0aW9ufVxuICAgICAgICogICAgICAgIFRoZSBnZW5lcmF0ZWQgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCBtYWtlQ2FsbGJhY2sgPSAocHJvbWlzZSwgbWV0YWRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuICguLi5jYWxsYmFja0FyZ3MpID0+IHtcbiAgICAgICAgICBpZiAoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgICAgcHJvbWlzZS5yZWplY3QoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvcik7XG4gICAgICAgICAgfSBlbHNlIGlmIChtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZyB8fCBjYWxsYmFja0FyZ3MubGVuZ3RoIDw9IDEgJiYgbWV0YWRhdGEuc2luZ2xlQ2FsbGJhY2tBcmcgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBwcm9taXNlLnJlc29sdmUoY2FsbGJhY2tBcmdzWzBdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvbWlzZS5yZXNvbHZlKGNhbGxiYWNrQXJncyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfTtcblxuICAgICAgY29uc3QgcGx1cmFsaXplQXJndW1lbnRzID0gbnVtQXJncyA9PiBudW1BcmdzID09IDEgPyBcImFyZ3VtZW50XCIgOiBcImFyZ3VtZW50c1wiO1xuICAgICAgLyoqXG4gICAgICAgKiBDcmVhdGVzIGEgd3JhcHBlciBmdW5jdGlvbiBmb3IgYSBtZXRob2Qgd2l0aCB0aGUgZ2l2ZW4gbmFtZSBhbmQgbWV0YWRhdGEuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgICAqICAgICAgICBUaGUgbmFtZSBvZiB0aGUgbWV0aG9kIHdoaWNoIGlzIGJlaW5nIHdyYXBwZWQuXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gbWV0YWRhdGFcbiAgICAgICAqICAgICAgICBNZXRhZGF0YSBhYm91dCB0aGUgbWV0aG9kIGJlaW5nIHdyYXBwZWQuXG4gICAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IG1ldGFkYXRhLm1pbkFyZ3NcbiAgICAgICAqICAgICAgICBUaGUgbWluaW11bSBudW1iZXIgb2YgYXJndW1lbnRzIHdoaWNoIG11c3QgYmUgcGFzc2VkIHRvIHRoZVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uLiBJZiBjYWxsZWQgd2l0aCBmZXdlciB0aGFuIHRoaXMgbnVtYmVyIG9mIGFyZ3VtZW50cywgdGhlXG4gICAgICAgKiAgICAgICAgd3JhcHBlciB3aWxsIHJhaXNlIGFuIGV4Y2VwdGlvbi5cbiAgICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gbWV0YWRhdGEubWF4QXJnc1xuICAgICAgICogICAgICAgIFRoZSBtYXhpbXVtIG51bWJlciBvZiBhcmd1bWVudHMgd2hpY2ggbWF5IGJlIHBhc3NlZCB0byB0aGVcbiAgICAgICAqICAgICAgICBmdW5jdGlvbi4gSWYgY2FsbGVkIHdpdGggbW9yZSB0aGFuIHRoaXMgbnVtYmVyIG9mIGFyZ3VtZW50cywgdGhlXG4gICAgICAgKiAgICAgICAgd3JhcHBlciB3aWxsIHJhaXNlIGFuIGV4Y2VwdGlvbi5cbiAgICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gbWV0YWRhdGEubWF4UmVzb2x2ZWRBcmdzXG4gICAgICAgKiAgICAgICAgVGhlIG1heGltdW0gbnVtYmVyIG9mIGFyZ3VtZW50cyB3aGljaCBtYXkgYmUgcGFzc2VkIHRvIHRoZVxuICAgICAgICogICAgICAgIGNhbGxiYWNrIGNyZWF0ZWQgYnkgdGhlIHdyYXBwZWQgYXN5bmMgZnVuY3Rpb24uXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge2Z1bmN0aW9uKG9iamVjdCwgLi4uKil9XG4gICAgICAgKiAgICAgICBUaGUgZ2VuZXJhdGVkIHdyYXBwZXIgZnVuY3Rpb24uXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCB3cmFwQXN5bmNGdW5jdGlvbiA9IChuYW1lLCBtZXRhZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gYXN5bmNGdW5jdGlvbldyYXBwZXIodGFyZ2V0LCAuLi5hcmdzKSB7XG4gICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoIDwgbWV0YWRhdGEubWluQXJncykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBsZWFzdCAke21ldGFkYXRhLm1pbkFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1pbkFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPiBtZXRhZGF0YS5tYXhBcmdzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IG1vc3QgJHttZXRhZGF0YS5tYXhBcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5tYXhBcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YS5mYWxsYmFja1RvTm9DYWxsYmFjaykge1xuICAgICAgICAgICAgICAvLyBUaGlzIEFQSSBtZXRob2QgaGFzIGN1cnJlbnRseSBubyBjYWxsYmFjayBvbiBDaHJvbWUsIGJ1dCBpdCByZXR1cm4gYSBwcm9taXNlIG9uIEZpcmVmb3gsXG4gICAgICAgICAgICAgIC8vIGFuZCBzbyB0aGUgcG9seWZpbGwgd2lsbCB0cnkgdG8gY2FsbCBpdCB3aXRoIGEgY2FsbGJhY2sgZmlyc3QsIGFuZCBpdCB3aWxsIGZhbGxiYWNrXG4gICAgICAgICAgICAgIC8vIHRvIG5vdCBwYXNzaW5nIHRoZSBjYWxsYmFjayBpZiB0aGUgZmlyc3QgY2FsbCBmYWlscy5cbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncywgbWFrZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICAgICAgICByZWplY3RcbiAgICAgICAgICAgICAgICB9LCBtZXRhZGF0YSkpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChjYkVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGAke25hbWV9IEFQSSBtZXRob2QgZG9lc24ndCBzZWVtIHRvIHN1cHBvcnQgdGhlIGNhbGxiYWNrIHBhcmFtZXRlciwgYCArIFwiZmFsbGluZyBiYWNrIHRvIGNhbGwgaXQgd2l0aG91dCBhIGNhbGxiYWNrOiBcIiwgY2JFcnJvcik7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MpOyAvLyBVcGRhdGUgdGhlIEFQSSBtZXRob2QgbWV0YWRhdGEsIHNvIHRoYXQgdGhlIG5leHQgQVBJIGNhbGxzIHdpbGwgbm90IHRyeSB0b1xuICAgICAgICAgICAgICAgIC8vIHVzZSB0aGUgdW5zdXBwb3J0ZWQgY2FsbGJhY2sgYW55bW9yZS5cblxuICAgICAgICAgICAgICAgIG1ldGFkYXRhLmZhbGxiYWNrVG9Ob0NhbGxiYWNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbWV0YWRhdGEubm9DYWxsYmFjayA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhLm5vQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MpO1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncywgbWFrZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgICB9LCBtZXRhZGF0YSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogV3JhcHMgYW4gZXhpc3RpbmcgbWV0aG9kIG9mIHRoZSB0YXJnZXQgb2JqZWN0LCBzbyB0aGF0IGNhbGxzIHRvIGl0IGFyZVxuICAgICAgICogaW50ZXJjZXB0ZWQgYnkgdGhlIGdpdmVuIHdyYXBwZXIgZnVuY3Rpb24uIFRoZSB3cmFwcGVyIGZ1bmN0aW9uIHJlY2VpdmVzLFxuICAgICAgICogYXMgaXRzIGZpcnN0IGFyZ3VtZW50LCB0aGUgb3JpZ2luYWwgYHRhcmdldGAgb2JqZWN0LCBmb2xsb3dlZCBieSBlYWNoIG9mXG4gICAgICAgKiB0aGUgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgb3JpZ2luYWwgbWV0aG9kLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRcbiAgICAgICAqICAgICAgICBUaGUgb3JpZ2luYWwgdGFyZ2V0IG9iamVjdCB0aGF0IHRoZSB3cmFwcGVkIG1ldGhvZCBiZWxvbmdzIHRvLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbWV0aG9kXG4gICAgICAgKiAgICAgICAgVGhlIG1ldGhvZCBiZWluZyB3cmFwcGVkLiBUaGlzIGlzIHVzZWQgYXMgdGhlIHRhcmdldCBvZiB0aGUgUHJveHlcbiAgICAgICAqICAgICAgICBvYmplY3Qgd2hpY2ggaXMgY3JlYXRlZCB0byB3cmFwIHRoZSBtZXRob2QuXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgVGhlIHdyYXBwZXIgZnVuY3Rpb24gd2hpY2ggaXMgY2FsbGVkIGluIHBsYWNlIG9mIGEgZGlyZWN0IGludm9jYXRpb25cbiAgICAgICAqICAgICAgICBvZiB0aGUgd3JhcHBlZCBtZXRob2QuXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge1Byb3h5PGZ1bmN0aW9uPn1cbiAgICAgICAqICAgICAgICBBIFByb3h5IG9iamVjdCBmb3IgdGhlIGdpdmVuIG1ldGhvZCwgd2hpY2ggaW52b2tlcyB0aGUgZ2l2ZW4gd3JhcHBlclxuICAgICAgICogICAgICAgIG1ldGhvZCBpbiBpdHMgcGxhY2UuXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCB3cmFwTWV0aG9kID0gKHRhcmdldCwgbWV0aG9kLCB3cmFwcGVyKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJveHkobWV0aG9kLCB7XG4gICAgICAgICAgYXBwbHkodGFyZ2V0TWV0aG9kLCB0aGlzT2JqLCBhcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gd3JhcHBlci5jYWxsKHRoaXNPYmosIHRhcmdldCwgLi4uYXJncyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgbGV0IGhhc093blByb3BlcnR5ID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuICAgICAgLyoqXG4gICAgICAgKiBXcmFwcyBhbiBvYmplY3QgaW4gYSBQcm94eSB3aGljaCBpbnRlcmNlcHRzIGFuZCB3cmFwcyBjZXJ0YWluIG1ldGhvZHNcbiAgICAgICAqIGJhc2VkIG9uIHRoZSBnaXZlbiBgd3JhcHBlcnNgIGFuZCBgbWV0YWRhdGFgIG9iamVjdHMuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICAgICAgICogICAgICAgIFRoZSB0YXJnZXQgb2JqZWN0IHRvIHdyYXAuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IFt3cmFwcGVycyA9IHt9XVxuICAgICAgICogICAgICAgIEFuIG9iamVjdCB0cmVlIGNvbnRhaW5pbmcgd3JhcHBlciBmdW5jdGlvbnMgZm9yIHNwZWNpYWwgY2FzZXMuIEFueVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uIHByZXNlbnQgaW4gdGhpcyBvYmplY3QgdHJlZSBpcyBjYWxsZWQgaW4gcGxhY2Ugb2YgdGhlXG4gICAgICAgKiAgICAgICAgbWV0aG9kIGluIHRoZSBzYW1lIGxvY2F0aW9uIGluIHRoZSBgdGFyZ2V0YCBvYmplY3QgdHJlZS4gVGhlc2VcbiAgICAgICAqICAgICAgICB3cmFwcGVyIG1ldGhvZHMgYXJlIGludm9rZWQgYXMgZGVzY3JpYmVkIGluIHtAc2VlIHdyYXBNZXRob2R9LlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbbWV0YWRhdGEgPSB7fV1cbiAgICAgICAqICAgICAgICBBbiBvYmplY3QgdHJlZSBjb250YWluaW5nIG1ldGFkYXRhIHVzZWQgdG8gYXV0b21hdGljYWxseSBnZW5lcmF0ZVxuICAgICAgICogICAgICAgIFByb21pc2UtYmFzZWQgd3JhcHBlciBmdW5jdGlvbnMgZm9yIGFzeW5jaHJvbm91cy4gQW55IGZ1bmN0aW9uIGluXG4gICAgICAgKiAgICAgICAgdGhlIGB0YXJnZXRgIG9iamVjdCB0cmVlIHdoaWNoIGhhcyBhIGNvcnJlc3BvbmRpbmcgbWV0YWRhdGEgb2JqZWN0XG4gICAgICAgKiAgICAgICAgaW4gdGhlIHNhbWUgbG9jYXRpb24gaW4gdGhlIGBtZXRhZGF0YWAgdHJlZSBpcyByZXBsYWNlZCB3aXRoIGFuXG4gICAgICAgKiAgICAgICAgYXV0b21hdGljYWxseS1nZW5lcmF0ZWQgd3JhcHBlciBmdW5jdGlvbiwgYXMgZGVzY3JpYmVkIGluXG4gICAgICAgKiAgICAgICAge0BzZWUgd3JhcEFzeW5jRnVuY3Rpb259XG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge1Byb3h5PG9iamVjdD59XG4gICAgICAgKi9cblxuICAgICAgY29uc3Qgd3JhcE9iamVjdCA9ICh0YXJnZXQsIHdyYXBwZXJzID0ge30sIG1ldGFkYXRhID0ge30pID0+IHtcbiAgICAgICAgbGV0IGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgbGV0IGhhbmRsZXJzID0ge1xuICAgICAgICAgIGhhcyhwcm94eVRhcmdldCwgcHJvcCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3AgaW4gdGFyZ2V0IHx8IHByb3AgaW4gY2FjaGU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGdldChwcm94eVRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgIGlmIChwcm9wIGluIGNhY2hlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjYWNoZVtwcm9wXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEocHJvcCBpbiB0YXJnZXQpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRhcmdldFtwcm9wXTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBtZXRob2Qgb24gdGhlIHVuZGVybHlpbmcgb2JqZWN0LiBDaGVjayBpZiB3ZSBuZWVkIHRvIGRvXG4gICAgICAgICAgICAgIC8vIGFueSB3cmFwcGluZy5cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3cmFwcGVyc1twcm9wXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSBhIHNwZWNpYWwtY2FzZSB3cmFwcGVyIGZvciB0aGlzIG1ldGhvZC5cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBNZXRob2QodGFyZ2V0LCB0YXJnZXRbcHJvcF0sIHdyYXBwZXJzW3Byb3BdKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNPd25Qcm9wZXJ0eShtZXRhZGF0YSwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGFuIGFzeW5jIG1ldGhvZCB0aGF0IHdlIGhhdmUgbWV0YWRhdGEgZm9yLiBDcmVhdGUgYVxuICAgICAgICAgICAgICAgIC8vIFByb21pc2Ugd3JhcHBlciBmb3IgaXQuXG4gICAgICAgICAgICAgICAgbGV0IHdyYXBwZXIgPSB3cmFwQXN5bmNGdW5jdGlvbihwcm9wLCBtZXRhZGF0YVtwcm9wXSk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwTWV0aG9kKHRhcmdldCwgdGFyZ2V0W3Byb3BdLCB3cmFwcGVyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgbWV0aG9kIHRoYXQgd2UgZG9uJ3Qga25vdyBvciBjYXJlIGFib3V0LiBSZXR1cm4gdGhlXG4gICAgICAgICAgICAgICAgLy8gb3JpZ2luYWwgbWV0aG9kLCBib3VuZCB0byB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5iaW5kKHRhcmdldCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmIChoYXNPd25Qcm9wZXJ0eSh3cmFwcGVycywgcHJvcCkgfHwgaGFzT3duUHJvcGVydHkobWV0YWRhdGEsIHByb3ApKSkge1xuICAgICAgICAgICAgICAvLyBUaGlzIGlzIGFuIG9iamVjdCB0aGF0IHdlIG5lZWQgdG8gZG8gc29tZSB3cmFwcGluZyBmb3IgdGhlIGNoaWxkcmVuXG4gICAgICAgICAgICAgIC8vIG9mLiBDcmVhdGUgYSBzdWItb2JqZWN0IHdyYXBwZXIgZm9yIGl0IHdpdGggdGhlIGFwcHJvcHJpYXRlIGNoaWxkXG4gICAgICAgICAgICAgIC8vIG1ldGFkYXRhLlxuICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBPYmplY3QodmFsdWUsIHdyYXBwZXJzW3Byb3BdLCBtZXRhZGF0YVtwcm9wXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhhc093blByb3BlcnR5KG1ldGFkYXRhLCBcIipcIikpIHtcbiAgICAgICAgICAgICAgLy8gV3JhcCBhbGwgcHJvcGVydGllcyBpbiAqIG5hbWVzcGFjZS5cbiAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwT2JqZWN0KHZhbHVlLCB3cmFwcGVyc1twcm9wXSwgbWV0YWRhdGFbXCIqXCJdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIFdlIGRvbid0IG5lZWQgdG8gZG8gYW55IHdyYXBwaW5nIGZvciB0aGlzIHByb3BlcnR5LFxuICAgICAgICAgICAgICAvLyBzbyBqdXN0IGZvcndhcmQgYWxsIGFjY2VzcyB0byB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjYWNoZSwgcHJvcCwge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldFtwcm9wXTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FjaGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc2V0KHByb3h5VGFyZ2V0LCBwcm9wLCB2YWx1ZSwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgIGlmIChwcm9wIGluIGNhY2hlKSB7XG4gICAgICAgICAgICAgIGNhY2hlW3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGRlZmluZVByb3BlcnR5KHByb3h5VGFyZ2V0LCBwcm9wLCBkZXNjKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShjYWNoZSwgcHJvcCwgZGVzYyk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGRlbGV0ZVByb3BlcnR5KHByb3h5VGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5kZWxldGVQcm9wZXJ0eShjYWNoZSwgcHJvcCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH07IC8vIFBlciBjb250cmFjdCBvZiB0aGUgUHJveHkgQVBJLCB0aGUgXCJnZXRcIiBwcm94eSBoYW5kbGVyIG11c3QgcmV0dXJuIHRoZVxuICAgICAgICAvLyBvcmlnaW5hbCB2YWx1ZSBvZiB0aGUgdGFyZ2V0IGlmIHRoYXQgdmFsdWUgaXMgZGVjbGFyZWQgcmVhZC1vbmx5IGFuZFxuICAgICAgICAvLyBub24tY29uZmlndXJhYmxlLiBGb3IgdGhpcyByZWFzb24sIHdlIGNyZWF0ZSBhbiBvYmplY3Qgd2l0aCB0aGVcbiAgICAgICAgLy8gcHJvdG90eXBlIHNldCB0byBgdGFyZ2V0YCBpbnN0ZWFkIG9mIHVzaW5nIGB0YXJnZXRgIGRpcmVjdGx5LlxuICAgICAgICAvLyBPdGhlcndpc2Ugd2UgY2Fubm90IHJldHVybiBhIGN1c3RvbSBvYmplY3QgZm9yIEFQSXMgdGhhdFxuICAgICAgICAvLyBhcmUgZGVjbGFyZWQgcmVhZC1vbmx5IGFuZCBub24tY29uZmlndXJhYmxlLCBzdWNoIGFzIGBjaHJvbWUuZGV2dG9vbHNgLlxuICAgICAgICAvL1xuICAgICAgICAvLyBUaGUgcHJveHkgaGFuZGxlcnMgdGhlbXNlbHZlcyB3aWxsIHN0aWxsIHVzZSB0aGUgb3JpZ2luYWwgYHRhcmdldGBcbiAgICAgICAgLy8gaW5zdGVhZCBvZiB0aGUgYHByb3h5VGFyZ2V0YCwgc28gdGhhdCB0aGUgbWV0aG9kcyBhbmQgcHJvcGVydGllcyBhcmVcbiAgICAgICAgLy8gZGVyZWZlcmVuY2VkIHZpYSB0aGUgb3JpZ2luYWwgdGFyZ2V0cy5cblxuICAgICAgICBsZXQgcHJveHlUYXJnZXQgPSBPYmplY3QuY3JlYXRlKHRhcmdldCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJveHkocHJveHlUYXJnZXQsIGhhbmRsZXJzKTtcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYSBzZXQgb2Ygd3JhcHBlciBmdW5jdGlvbnMgZm9yIGFuIGV2ZW50IG9iamVjdCwgd2hpY2ggaGFuZGxlc1xuICAgICAgICogd3JhcHBpbmcgb2YgbGlzdGVuZXIgZnVuY3Rpb25zIHRoYXQgdGhvc2UgbWVzc2FnZXMgYXJlIHBhc3NlZC5cbiAgICAgICAqXG4gICAgICAgKiBBIHNpbmdsZSB3cmFwcGVyIGlzIGNyZWF0ZWQgZm9yIGVhY2ggbGlzdGVuZXIgZnVuY3Rpb24sIGFuZCBzdG9yZWQgaW4gYVxuICAgICAgICogbWFwLiBTdWJzZXF1ZW50IGNhbGxzIHRvIGBhZGRMaXN0ZW5lcmAsIGBoYXNMaXN0ZW5lcmAsIG9yIGByZW1vdmVMaXN0ZW5lcmBcbiAgICAgICAqIHJldHJpZXZlIHRoZSBvcmlnaW5hbCB3cmFwcGVyLCBzbyB0aGF0ICBhdHRlbXB0cyB0byByZW1vdmUgYVxuICAgICAgICogcHJldmlvdXNseS1hZGRlZCBsaXN0ZW5lciB3b3JrIGFzIGV4cGVjdGVkLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7RGVmYXVsdFdlYWtNYXA8ZnVuY3Rpb24sIGZ1bmN0aW9uPn0gd3JhcHBlck1hcFxuICAgICAgICogICAgICAgIEEgRGVmYXVsdFdlYWtNYXAgb2JqZWN0IHdoaWNoIHdpbGwgY3JlYXRlIHRoZSBhcHByb3ByaWF0ZSB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgZm9yIGEgZ2l2ZW4gbGlzdGVuZXIgZnVuY3Rpb24gd2hlbiBvbmUgZG9lcyBub3QgZXhpc3QsIGFuZCByZXRyaWV2ZVxuICAgICAgICogICAgICAgIGFuIGV4aXN0aW5nIG9uZSB3aGVuIGl0IGRvZXMuXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge29iamVjdH1cbiAgICAgICAqL1xuXG5cbiAgICAgIGNvbnN0IHdyYXBFdmVudCA9IHdyYXBwZXJNYXAgPT4gKHtcbiAgICAgICAgYWRkTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lciwgLi4uYXJncykge1xuICAgICAgICAgIHRhcmdldC5hZGRMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lciksIC4uLmFyZ3MpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhhc0xpc3RlbmVyKHRhcmdldCwgbGlzdGVuZXIpIHtcbiAgICAgICAgICByZXR1cm4gdGFyZ2V0Lmhhc0xpc3RlbmVyKHdyYXBwZXJNYXAuZ2V0KGxpc3RlbmVyKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lcikge1xuICAgICAgICAgIHRhcmdldC5yZW1vdmVMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lcikpO1xuICAgICAgICB9XG5cbiAgICAgIH0pOyAvLyBLZWVwIHRyYWNrIGlmIHRoZSBkZXByZWNhdGlvbiB3YXJuaW5nIGhhcyBiZWVuIGxvZ2dlZCBhdCBsZWFzdCBvbmNlLlxuXG5cbiAgICAgIGxldCBsb2dnZWRTZW5kUmVzcG9uc2VEZXByZWNhdGlvbldhcm5pbmcgPSBmYWxzZTtcbiAgICAgIGNvbnN0IG9uTWVzc2FnZVdyYXBwZXJzID0gbmV3IERlZmF1bHRXZWFrTWFwKGxpc3RlbmVyID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgcmV0dXJuIGxpc3RlbmVyO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcmFwcyBhIG1lc3NhZ2UgbGlzdGVuZXIgZnVuY3Rpb24gc28gdGhhdCBpdCBtYXkgc2VuZCByZXNwb25zZXMgYmFzZWQgb25cbiAgICAgICAgICogaXRzIHJldHVybiB2YWx1ZSwgcmF0aGVyIHRoYW4gYnkgcmV0dXJuaW5nIGEgc2VudGluZWwgdmFsdWUgYW5kIGNhbGxpbmcgYVxuICAgICAgICAgKiBjYWxsYmFjay4gSWYgdGhlIGxpc3RlbmVyIGZ1bmN0aW9uIHJldHVybnMgYSBQcm9taXNlLCB0aGUgcmVzcG9uc2UgaXNcbiAgICAgICAgICogc2VudCB3aGVuIHRoZSBwcm9taXNlIGVpdGhlciByZXNvbHZlcyBvciByZWplY3RzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0geyp9IG1lc3NhZ2VcbiAgICAgICAgICogICAgICAgIFRoZSBtZXNzYWdlIHNlbnQgYnkgdGhlIG90aGVyIGVuZCBvZiB0aGUgY2hhbm5lbC5cbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHNlbmRlclxuICAgICAgICAgKiAgICAgICAgRGV0YWlscyBhYm91dCB0aGUgc2VuZGVyIG9mIHRoZSBtZXNzYWdlLlxuICAgICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCopfSBzZW5kUmVzcG9uc2VcbiAgICAgICAgICogICAgICAgIEEgY2FsbGJhY2sgd2hpY2gsIHdoZW4gY2FsbGVkIHdpdGggYW4gYXJiaXRyYXJ5IGFyZ3VtZW50LCBzZW5kc1xuICAgICAgICAgKiAgICAgICAgdGhhdCB2YWx1ZSBhcyBhIHJlc3BvbnNlLlxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICogICAgICAgIFRydWUgaWYgdGhlIHdyYXBwZWQgbGlzdGVuZXIgcmV0dXJuZWQgYSBQcm9taXNlLCB3aGljaCB3aWxsIGxhdGVyXG4gICAgICAgICAqICAgICAgICB5aWVsZCBhIHJlc3BvbnNlLiBGYWxzZSBvdGhlcndpc2UuXG4gICAgICAgICAqL1xuXG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG9uTWVzc2FnZShtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgICAgICAgIGxldCBkaWRDYWxsU2VuZFJlc3BvbnNlID0gZmFsc2U7XG4gICAgICAgICAgbGV0IHdyYXBwZWRTZW5kUmVzcG9uc2U7XG4gICAgICAgICAgbGV0IHNlbmRSZXNwb25zZVByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHdyYXBwZWRTZW5kUmVzcG9uc2UgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgaWYgKCFsb2dnZWRTZW5kUmVzcG9uc2VEZXByZWNhdGlvbldhcm5pbmcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oU0VORF9SRVNQT05TRV9ERVBSRUNBVElPTl9XQVJOSU5HLCBuZXcgRXJyb3IoKS5zdGFjayk7XG4gICAgICAgICAgICAgICAgbG9nZ2VkU2VuZFJlc3BvbnNlRGVwcmVjYXRpb25XYXJuaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGRpZENhbGxTZW5kUmVzcG9uc2UgPSB0cnVlO1xuICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbGV0IHJlc3VsdDtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXN1bHQgPSBsaXN0ZW5lcihtZXNzYWdlLCBzZW5kZXIsIHdyYXBwZWRTZW5kUmVzcG9uc2UpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVzdWx0ID0gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBpc1Jlc3VsdFRoZW5hYmxlID0gcmVzdWx0ICE9PSB0cnVlICYmIGlzVGhlbmFibGUocmVzdWx0KTsgLy8gSWYgdGhlIGxpc3RlbmVyIGRpZG4ndCByZXR1cm5lZCB0cnVlIG9yIGEgUHJvbWlzZSwgb3IgY2FsbGVkXG4gICAgICAgICAgLy8gd3JhcHBlZFNlbmRSZXNwb25zZSBzeW5jaHJvbm91c2x5LCB3ZSBjYW4gZXhpdCBlYXJsaWVyXG4gICAgICAgICAgLy8gYmVjYXVzZSB0aGVyZSB3aWxsIGJlIG5vIHJlc3BvbnNlIHNlbnQgZnJvbSB0aGlzIGxpc3RlbmVyLlxuXG4gICAgICAgICAgaWYgKHJlc3VsdCAhPT0gdHJ1ZSAmJiAhaXNSZXN1bHRUaGVuYWJsZSAmJiAhZGlkQ2FsbFNlbmRSZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0gLy8gQSBzbWFsbCBoZWxwZXIgdG8gc2VuZCB0aGUgbWVzc2FnZSBpZiB0aGUgcHJvbWlzZSByZXNvbHZlc1xuICAgICAgICAgIC8vIGFuZCBhbiBlcnJvciBpZiB0aGUgcHJvbWlzZSByZWplY3RzIChhIHdyYXBwZWQgc2VuZE1lc3NhZ2UgaGFzXG4gICAgICAgICAgLy8gdG8gdHJhbnNsYXRlIHRoZSBtZXNzYWdlIGludG8gYSByZXNvbHZlZCBwcm9taXNlIG9yIGEgcmVqZWN0ZWRcbiAgICAgICAgICAvLyBwcm9taXNlKS5cblxuXG4gICAgICAgICAgY29uc3Qgc2VuZFByb21pc2VkUmVzdWx0ID0gcHJvbWlzZSA9PiB7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4obXNnID0+IHtcbiAgICAgICAgICAgICAgLy8gc2VuZCB0aGUgbWVzc2FnZSB2YWx1ZS5cbiAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKG1zZyk7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgIC8vIFNlbmQgYSBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBlcnJvciBpZiB0aGUgcmVqZWN0ZWQgdmFsdWVcbiAgICAgICAgICAgICAgLy8gaXMgYW4gaW5zdGFuY2Ugb2YgZXJyb3IsIG9yIHRoZSBvYmplY3QgaXRzZWxmIG90aGVyd2lzZS5cbiAgICAgICAgICAgICAgbGV0IG1lc3NhZ2U7XG5cbiAgICAgICAgICAgICAgaWYgKGVycm9yICYmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yIHx8IHR5cGVvZiBlcnJvci5tZXNzYWdlID09PSBcInN0cmluZ1wiKSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBcIkFuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJyZWRcIjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7XG4gICAgICAgICAgICAgICAgX19tb3pXZWJFeHRlbnNpb25Qb2x5ZmlsbFJlamVjdF9fOiB0cnVlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAvLyBQcmludCBhbiBlcnJvciBvbiB0aGUgY29uc29sZSBpZiB1bmFibGUgdG8gc2VuZCB0aGUgcmVzcG9uc2UuXG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gc2VuZCBvbk1lc3NhZ2UgcmVqZWN0ZWQgcmVwbHlcIiwgZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07IC8vIElmIHRoZSBsaXN0ZW5lciByZXR1cm5lZCBhIFByb21pc2UsIHNlbmQgdGhlIHJlc29sdmVkIHZhbHVlIGFzIGFcbiAgICAgICAgICAvLyByZXN1bHQsIG90aGVyd2lzZSB3YWl0IHRoZSBwcm9taXNlIHJlbGF0ZWQgdG8gdGhlIHdyYXBwZWRTZW5kUmVzcG9uc2VcbiAgICAgICAgICAvLyBjYWxsYmFjayB0byByZXNvbHZlIGFuZCBzZW5kIGl0IGFzIGEgcmVzcG9uc2UuXG5cblxuICAgICAgICAgIGlmIChpc1Jlc3VsdFRoZW5hYmxlKSB7XG4gICAgICAgICAgICBzZW5kUHJvbWlzZWRSZXN1bHQocmVzdWx0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VuZFByb21pc2VkUmVzdWx0KHNlbmRSZXNwb25zZVByb21pc2UpO1xuICAgICAgICAgIH0gLy8gTGV0IENocm9tZSBrbm93IHRoYXQgdGhlIGxpc3RlbmVyIGlzIHJlcGx5aW5nLlxuXG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCB3cmFwcGVkU2VuZE1lc3NhZ2VDYWxsYmFjayA9ICh7XG4gICAgICAgIHJlamVjdCxcbiAgICAgICAgcmVzb2x2ZVxuICAgICAgfSwgcmVwbHkpID0+IHtcbiAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICAvLyBEZXRlY3Qgd2hlbiBub25lIG9mIHRoZSBsaXN0ZW5lcnMgcmVwbGllZCB0byB0aGUgc2VuZE1lc3NhZ2UgY2FsbCBhbmQgcmVzb2x2ZVxuICAgICAgICAgIC8vIHRoZSBwcm9taXNlIHRvIHVuZGVmaW5lZCBhcyBpbiBGaXJlZm94LlxuICAgICAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS93ZWJleHRlbnNpb24tcG9seWZpbGwvaXNzdWVzLzEzMFxuICAgICAgICAgIGlmIChleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UgPT09IENIUk9NRV9TRU5EX01FU1NBR0VfQ0FMTEJBQ0tfTk9fUkVTUE9OU0VfTUVTU0FHRSkge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJlcGx5ICYmIHJlcGx5Ll9fbW96V2ViRXh0ZW5zaW9uUG9seWZpbGxSZWplY3RfXykge1xuICAgICAgICAgIC8vIENvbnZlcnQgYmFjayB0aGUgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgZXJyb3IgaW50b1xuICAgICAgICAgIC8vIGFuIEVycm9yIGluc3RhbmNlLlxuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IocmVwbHkubWVzc2FnZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUocmVwbHkpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCB3cmFwcGVkU2VuZE1lc3NhZ2UgPSAobmFtZSwgbWV0YWRhdGEsIGFwaU5hbWVzcGFjZU9iaiwgLi4uYXJncykgPT4ge1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPCBtZXRhZGF0YS5taW5BcmdzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBsZWFzdCAke21ldGFkYXRhLm1pbkFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1pbkFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA+IG1ldGFkYXRhLm1heEFyZ3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IG1vc3QgJHttZXRhZGF0YS5tYXhBcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5tYXhBcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHdyYXBwZWRDYiA9IHdyYXBwZWRTZW5kTWVzc2FnZUNhbGxiYWNrLmJpbmQobnVsbCwge1xuICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGFyZ3MucHVzaCh3cmFwcGVkQ2IpO1xuICAgICAgICAgIGFwaU5hbWVzcGFjZU9iai5zZW5kTWVzc2FnZSguLi5hcmdzKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzdGF0aWNXcmFwcGVycyA9IHtcbiAgICAgICAgcnVudGltZToge1xuICAgICAgICAgIG9uTWVzc2FnZTogd3JhcEV2ZW50KG9uTWVzc2FnZVdyYXBwZXJzKSxcbiAgICAgICAgICBvbk1lc3NhZ2VFeHRlcm5hbDogd3JhcEV2ZW50KG9uTWVzc2FnZVdyYXBwZXJzKSxcbiAgICAgICAgICBzZW5kTWVzc2FnZTogd3JhcHBlZFNlbmRNZXNzYWdlLmJpbmQobnVsbCwgXCJzZW5kTWVzc2FnZVwiLCB7XG4gICAgICAgICAgICBtaW5BcmdzOiAxLFxuICAgICAgICAgICAgbWF4QXJnczogM1xuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHRhYnM6IHtcbiAgICAgICAgICBzZW5kTWVzc2FnZTogd3JhcHBlZFNlbmRNZXNzYWdlLmJpbmQobnVsbCwgXCJzZW5kTWVzc2FnZVwiLCB7XG4gICAgICAgICAgICBtaW5BcmdzOiAyLFxuICAgICAgICAgICAgbWF4QXJnczogM1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjb25zdCBzZXR0aW5nTWV0YWRhdGEgPSB7XG4gICAgICAgIGNsZWFyOiB7XG4gICAgICAgICAgbWluQXJnczogMSxcbiAgICAgICAgICBtYXhBcmdzOiAxXG4gICAgICAgIH0sXG4gICAgICAgIGdldDoge1xuICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgbWF4QXJnczogMVxuICAgICAgICB9LFxuICAgICAgICBzZXQ6IHtcbiAgICAgICAgICBtaW5BcmdzOiAxLFxuICAgICAgICAgIG1heEFyZ3M6IDFcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGFwaU1ldGFkYXRhLnByaXZhY3kgPSB7XG4gICAgICAgIG5ldHdvcms6IHtcbiAgICAgICAgICBcIipcIjogc2V0dGluZ01ldGFkYXRhXG4gICAgICAgIH0sXG4gICAgICAgIHNlcnZpY2VzOiB7XG4gICAgICAgICAgXCIqXCI6IHNldHRpbmdNZXRhZGF0YVxuICAgICAgICB9LFxuICAgICAgICB3ZWJzaXRlczoge1xuICAgICAgICAgIFwiKlwiOiBzZXR0aW5nTWV0YWRhdGFcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiB3cmFwT2JqZWN0KGV4dGVuc2lvbkFQSXMsIHN0YXRpY1dyYXBwZXJzLCBhcGlNZXRhZGF0YSk7XG4gICAgfTtcblxuICAgIGlmICh0eXBlb2YgY2hyb21lICE9IFwib2JqZWN0XCIgfHwgIWNocm9tZSB8fCAhY2hyb21lLnJ1bnRpbWUgfHwgIWNocm9tZS5ydW50aW1lLmlkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIHNjcmlwdCBzaG91bGQgb25seSBiZSBsb2FkZWQgaW4gYSBicm93c2VyIGV4dGVuc2lvbi5cIik7XG4gICAgfSAvLyBUaGUgYnVpbGQgcHJvY2VzcyBhZGRzIGEgVU1EIHdyYXBwZXIgYXJvdW5kIHRoaXMgZmlsZSwgd2hpY2ggbWFrZXMgdGhlXG4gICAgLy8gYG1vZHVsZWAgdmFyaWFibGUgYXZhaWxhYmxlLlxuXG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHdyYXBBUElzKGNocm9tZSk7XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBicm93c2VyO1xuICB9XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJyb3dzZXItcG9seWZpbGwuanMubWFwXG4iLCJpbXBvcnQgeyBnZXRDb25mIH0gZnJvbSBcIi4vdXRpbHMvY29uZmlndXJhdGlvblwiO1xuaW1wb3J0IHsgY29tcHV0ZVNlbGVjdG9yLCBpc0Nocm9tZSB9IGZyb20gXCIuL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgeyBBYnN0cmFjdEVkaXRvciB9IGZyb20gXCIuL2VkaXRvcnMvQWJzdHJhY3RFZGl0b3JcIjtcbmltcG9ydCB7IGdldEVkaXRvciB9IGZyb20gXCIuL2VkaXRvcnMvZWRpdG9yc1wiO1xuXG5leHBvcnQgY2xhc3MgRmlyZW52aW1FbGVtZW50IHtcblxuICAgIC8vIGVkaXRvciBpcyBhbiBvYmplY3QgdGhhdCBwcm92aWRlcyBhbiBpbnRlcmZhY2UgdG8gaW50ZXJhY3QgKGUuZy5cbiAgICAvLyByZXRyaWV2ZS9zZXQgY29udGVudCwgcmV0cmlldmUvc2V0IGN1cnNvciBwb3NpdGlvbikgY29uc2lzdGVudGx5IHdpdGhcbiAgICAvLyB1bmRlcmx5aW5nIGVsZW1lbnRzIChiZSB0aGV5IHNpbXBsZSB0ZXh0YXJlYXMsIENvZGVNaXJyb3IgZWxlbWVudHMgb3JcbiAgICAvLyBvdGhlcikuXG4gICAgcHJpdmF0ZSBlZGl0b3I6IEFic3RyYWN0RWRpdG9yO1xuICAgIC8vIGZvY3VzSW5mbyBpcyB1c2VkIHRvIGtlZXAgdHJhY2sgb2YgZm9jdXMgbGlzdGVuZXJzIGFuZCB0aW1lb3V0cyBjcmVhdGVkXG4gICAgLy8gYnkgRmlyZW52aW1FbGVtZW50LmZvY3VzKCkuIEZpcmVudmltRWxlbWVudC5mb2N1cygpIGNyZWF0ZXMgdGhlc2VcbiAgICAvLyBsaXN0ZW5lcnMgYW5kIHRpbWVvdXRzIGluIG9yZGVyIHRvIHdvcmsgYXJvdW5kIHBhZ2VzIHRoYXQgdHJ5IHRvIGdyYWJcbiAgICAvLyB0aGUgZm9jdXMgYWdhaW4gYWZ0ZXIgdGhlIEZpcmVudmltRWxlbWVudCBoYXMgYmVlbiBjcmVhdGVkIG9yIGFmdGVyIHRoZVxuICAgIC8vIHVuZGVybHlpbmcgZWxlbWVudCdzIGNvbnRlbnQgaGFzIGNoYW5nZWQuXG4gICAgcHJpdmF0ZSBmb2N1c0luZm8gPSB7XG4gICAgICAgIGZpbmFsUmVmb2N1c1RpbWVvdXRzOiBbXSBhcyBhbnlbXSxcbiAgICAgICAgcmVmb2N1c1JlZnM6IFtdIGFzIGFueVtdLFxuICAgICAgICByZWZvY3VzVGltZW91dHM6IFtdIGFzIGFueVtdLFxuICAgIH07XG4gICAgLy8gZnJhbWVJZCBpcyB0aGUgd2ViZXh0ZW5zaW9uIGlkIG9mIHRoZSBuZW92aW0gZnJhbWUuIFdlIHVzZSBpdCB0byBzZW5kXG4gICAgLy8gY29tbWFuZHMgdG8gdGhlIGZyYW1lLlxuICAgIHByaXZhdGUgZnJhbWVJZDogbnVtYmVyO1xuICAgIC8vIGZyYW1lSWRQcm9taXNlIGlzIGEgcHJvbWlzZSB0aGF0IHdpbGwgcmVzb2x2ZSB0byB0aGUgZnJhbWVJZC4gVGhlXG4gICAgLy8gZnJhbWVJZCBjYW4ndCBiZSByZXRyaWV2ZWQgc3luY2hyb25vdXNseSBhcyBpdCBuZWVkcyB0byBiZSBzZW50IGJ5IHRoZVxuICAgIC8vIGJhY2tncm91bmQgc2NyaXB0LlxuICAgIHByaXZhdGUgZnJhbWVJZFByb21pc2U6IFByb21pc2U8bnVtYmVyPjtcbiAgICAvLyBpZnJhbWUgaXMgdGhlIE5lb3ZpbSBmcmFtZS4gVGhpcyBpcyB0aGUgZWxlbWVudCB0aGF0IHJlY2VpdmVzIGFsbCBpbnB1dHNcbiAgICAvLyBhbmQgZGlzcGxheXMgdGhlIGVkaXRvci5cbiAgICBwcml2YXRlIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQ7XG4gICAgLy8gV2UgdXNlIGFuIGludGVyc2VjdGlvbk9ic2VydmVyIHRvIGRldGVjdCB3aGVuIHRoZSBlbGVtZW50IHRoZVxuICAgIC8vIEZpcmVudmltRWxlbWVudCBpcyB0aWVkIGJlY29tZXMgaW52aXNpYmxlLiBXaGVuIHRoaXMgaGFwcGVucyxcbiAgICAvLyB3ZSBoaWRlIHRoZSBGaXJlbnZpbUVsZW1lbnQgZnJvbSB0aGUgcGFnZS5cbiAgICBwcml2YXRlIGludGVyc2VjdGlvbk9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlcjtcbiAgICAvLyBXZSB1c2UgYSBtdXRhdGlvbiBvYnNlcnZlciB0byBkZXRlY3Qgd2hldGhlciB0aGUgZWxlbWVudCBpcyByZW1vdmVkIGZyb21cbiAgICAvLyB0aGUgcGFnZS4gV2hlbiB0aGlzIGhhcHBlbnMsIHRoZSBGaXJlbnZpbUVsZW1lbnQgaXMgcmVtb3ZlZCBmcm9tIHRoZVxuICAgIC8vIHBhZ2UuXG4gICAgcHJpdmF0ZSBwYWdlT2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI7XG4gICAgLy8gV2UgdXNlIGEgbXV0YXRpb24gb2JzZXJ2ZXIgdG8gZGV0ZWN0IGlmIHRoZSBzcGFuIGlzIHJlbW92ZWQgZnJvbSB0aGVcbiAgICAvLyBwYWdlIGJ5IHRoZSBwYWdlLiBXaGVuIHRoaXMgaGFwcGVucywgdGhlIHNwYW4gaXMgcmUtaW5zZXJ0ZWQgaW4gdGhlXG4gICAgLy8gcGFnZS5cbiAgICBwcml2YXRlIHNwYW5PYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcjtcbiAgICAvLyBudmltaWZ5IGlzIHRoZSBmdW5jdGlvbiB0aGF0IGxpc3RlbnMgZm9yIGZvY3VzIGV2ZW50cyBhbmQgY3JlYXRlc1xuICAgIC8vIGZpcmVudmltIGVsZW1lbnRzLiBXZSBuZWVkIGl0IGluIG9yZGVyIHRvIGJlIGFibGUgdG8gcmVtb3ZlIGl0IGFzIGFuXG4gICAgLy8gZXZlbnQgbGlzdGVuZXIgZnJvbSB0aGUgZWxlbWVudCB0aGUgdXNlciBzZWxlY3RlZCB3aGVuIHRoZSB1c2VyIHdhbnRzIHRvXG4gICAgLy8gc2VsZWN0IHRoYXQgZWxlbWVudCBhZ2Fpbi5cbiAgICBwcml2YXRlIG52aW1pZnk6IChldnQ6IHsgdGFyZ2V0OiBFdmVudFRhcmdldCB9KSA9PiBQcm9taXNlPHZvaWQ+O1xuICAgIC8vIG9yaWdpbmFsRWxlbWVudCBpcyB0aGUgZWxlbWVudCBhIGZvY3VzIGV2ZW50IGhhcyBiZWVuIHRyaWdnZXJlZCBvbi4gV2VcbiAgICAvLyB1c2UgaXQgdG8gcmV0cmlldmUgdGhlIGVsZW1lbnQgdGhlIGVkaXRvciBzaG91bGQgYXBwZWFyIG92ZXIgKGUuZy4sIGlmXG4gICAgLy8gZWxlbSBpcyBhbiBlbGVtZW50IGluc2lkZSBhIENvZGVNaXJyb3IgZWRpdG9yLCBlbGVtIHdpbGwgYmUgYSBzbWFsbFxuICAgIC8vIGludmlzaWJsZSB0ZXh0YXJlYSBhbmQgd2hhdCB3ZSByZWFsbHkgd2FudCB0byBwdXQgdGhlIEZpcmVudmltIGVsZW1lbnRcbiAgICAvLyBvdmVyIGlzIHRoZSBwYXJlbnQgZGl2IHRoYXQgY29udGFpbnMgaXQpIGFuZCB0byBnaXZlIGZvY3VzIGJhY2sgdG8gdGhlXG4gICAgLy8gcGFnZSB3aGVuIHRoZSB1c2VyIGFza3MgZm9yIHRoYXQuXG4gICAgcHJpdmF0ZSBvcmlnaW5hbEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIC8vIHJlc2l6ZU9ic2VydmVyIGlzIHVzZWQgaW4gb3JkZXIgdG8gZGV0ZWN0IHdoZW4gdGhlIHNpemUgb2YgdGhlIGVsZW1lbnRcbiAgICAvLyBiZWluZyBlZGl0ZWQgY2hhbmdlZC4gV2hlbiB0aGlzIGhhcHBlbnMsIHdlIHJlc2l6ZSB0aGUgbmVvdmltIGZyYW1lLlxuICAgIC8vIFRPRE86IHBlcmlvZGljYWxseSBjaGVjayBpZiBNUyBpbXBsZW1lbnRlZCBhIFJlc2l6ZU9ic2VydmVyIHR5cGVcbiAgICBwcml2YXRlIHJlc2l6ZU9ic2VydmVyOiBhbnk7XG4gICAgLy8gc3BhbiBpcyB0aGUgc3BhbiBlbGVtZW50IHdlIHVzZSBpbiBvcmRlciB0byBpbnNlcnQgdGhlIG5lb3ZpbSBmcmFtZSBpblxuICAgIC8vIHRoZSBwYWdlLiBUaGUgbmVvdmltIGZyYW1lIGlzIGF0dGFjaGVkIHRvIGl0cyBzaGFkb3cgZG9tLiBVc2luZyBhIHNwYW5cbiAgICAvLyBpcyBtdWNoIGxlc3MgZGlzcnVwdGl2ZSB0byB0aGUgcGFnZSBhbmQgZW5hYmxlcyBhIG1vZGljdW0gb2YgcHJpdmFjeVxuICAgIC8vICh0aGUgcGFnZSB3b24ndCBiZSBhYmxlIHRvIGNoZWNrIHdoYXQncyBpbiBpdCkuIEluIGZpcmVmb3gsIHBhZ2VzIHdpbGxcbiAgICAvLyBzdGlsbCBiZSBhYmxlIHRvIGRldGVjdCB0aGUgbmVvdmltIGZyYW1lIGJ5IHVzaW5nIHdpbmRvdy5mcmFtZXMgdGhvdWdoLlxuICAgIHByaXZhdGUgc3BhbjogSFRNTFNwYW5FbGVtZW50O1xuICAgIC8vIHJlc2l6ZVJlcUlkIGtlZXBzIHRyYWNrIG9mIHRoZSBudW1iZXIgb2YgcmVzaXppbmcgcmVxdWVzdHMgdGhhdCBhcmUgc2VudFxuICAgIC8vIHRvIHRoZSBpZnJhbWUuIFdlIHNlbmQgYW5kIGluY3JlbWVudCBpdCBmb3IgZXZlcnkgcmVzaXplIHJlcXVlc3RzLCB0aGlzXG4gICAgLy8gbGV0cyB0aGUgaWZyYW1lIGtub3cgd2hhdCB0aGUgbW9zdCByZWNlbnRseSBzZW50IHJlc2l6ZSByZXF1ZXN0IGlzIGFuZFxuICAgIC8vIHRodXMgYXZvaWRzIHJlYWN0aW5nIHRvIGFuIG9sZGVyIHJlc2l6ZSByZXF1ZXN0IGlmIGEgbW9yZSByZWNlbnQgaGFzXG4gICAgLy8gYWxyZWFkeSBiZWVuIHByb2Nlc3NlZC5cbiAgICBwcml2YXRlIHJlc2l6ZVJlcUlkID0gMDtcbiAgICAvLyByZWxhdGl2ZVgvWSBpcyB0aGUgcG9zaXRpb24gdGhlIGlmcmFtZSBzaG91bGQgaGF2ZSByZWxhdGl2ZSB0byB0aGUgaW5wdXRcbiAgICAvLyBlbGVtZW50IGluIG9yZGVyIHRvIGJlIGJvdGggYXMgY2xvc2UgYXMgcG9zc2libGUgdG8gdGhlIGlucHV0IGVsZW1lbnRcbiAgICAvLyBhbmQgZml0IGluIHRoZSB3aW5kb3cgd2l0aG91dCBvdmVyZmxvd2luZyBvdXQgb2YgdGhlIHZpZXdwb3J0LlxuICAgIHByaXZhdGUgcmVsYXRpdmVYID0gMDtcbiAgICBwcml2YXRlIHJlbGF0aXZlWSA9IDA7XG4gICAgLy8gZmlyc3RQdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW4ga2VlcHMgdHJhY2sgb2Ygd2hldGhlciB0aGlzIGlzIHRoZVxuICAgIC8vIGZpcnN0IHRpbWUgdGhlIHB1dEVkaXRvckNsb3NlVG9JbnB1dE9yaWdpbiBmdW5jdGlvbiBpcyBjYWxsZWQgZnJvbSB0aGVcbiAgICAvLyBpZnJhbWUuIFNlZSBwdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW5BZnRlclJlc2l6ZUZyb21GcmFtZSgpIGZvciBtb3JlXG4gICAgLy8gaW5mb3JtYXRpb24uXG4gICAgcHJpdmF0ZSBmaXJzdFB1dEVkaXRvckNsb3NlVG9JbnB1dE9yaWdpbiA9IHRydWU7XG4gICAgLy8gb25EZXRhY2ggaXMgYSBjYWxsYmFjayBwcm92aWRlZCBieSB0aGUgY29udGVudCBzY3JpcHQgd2hlbiBpdCBjcmVhdGVzXG4gICAgLy8gdGhlIEZpcmVudmltRWxlbWVudC4gSXQgaXMgY2FsbGVkIHdoZW4gdGhlIGRldGFjaCgpIGZ1bmN0aW9uIGlzIGNhbGxlZCxcbiAgICAvLyBhZnRlciBhbGwgRmlyZW52aW0gZWxlbWVudHMgaGF2ZSBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgcGFnZS5cbiAgICBwcml2YXRlIG9uRGV0YWNoOiAoaWQ6IG51bWJlcikgPT4gYW55O1xuICAgIC8vIGJ1ZmZlckluZm86IGEgW3VybCwgc2VsZWN0b3IsIGN1cnNvciwgbGFuZ10gdHVwbGUgaW5kaWNhdGluZyB0aGUgcGFnZVxuICAgIC8vIHRoZSBsYXN0IGlmcmFtZSB3YXMgY3JlYXRlZCBvbiwgdGhlIHNlbGVjdG9yIG9mIHRoZSBjb3JyZXNwb25kaW5nXG4gICAgLy8gdGV4dGFyZWEgYW5kIHRoZSBjb2x1bW4vbGluZSBudW1iZXIgb2YgdGhlIGN1cnNvci5cbiAgICAvLyBOb3RlIHRoYXQgdGhlc2UgYXJlIF9fZGVmYXVsdF9fIHZhbHVlcy4gUmVhbCB2YWx1ZXMgbXVzdCBiZSBjcmVhdGVkIHdpdGhcbiAgICAvLyBwcmVwYXJlQnVmZmVySW5mbygpLiBUaGUgcmVhc29uIHdlJ3JlIG5vdCBkb2luZyB0aGlzIGZyb20gdGhlXG4gICAgLy8gY29uc3RydWN0b3IgaXMgdGhhdCBpdCdzIGV4cGVuc2l2ZSBhbmQgZGlzcnVwdGl2ZSAtIGdldHRpbmcgdGhpc1xuICAgIC8vIGluZm9ybWF0aW9uIHJlcXVpcmVzIGV2YWx1YXRpbmcgY29kZSBpbiB0aGUgcGFnZSdzIGNvbnRleHQuXG4gICAgcHJpdmF0ZSBidWZmZXJJbmZvID0gKFByb21pc2UucmVzb2x2ZShbXCJcIiwgXCJcIiwgWzEsIDFdLCB1bmRlZmluZWRdKSBhc1xuICAgICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlPFtzdHJpbmcsIHN0cmluZywgW251bWJlciwgbnVtYmVyXSwgc3RyaW5nXT4pO1xuICAgIC8vIGN1cnNvcjogbGFzdCBrbm93biBjdXJzb3IgcG9zaXRpb24uIFVwZGF0ZWQgb24gZ2V0UGFnZUVsZW1lbnRDdXJzb3IgYW5kXG4gICAgLy8gc2V0UGFnZUVsZW1lbnRDdXJzb3JcbiAgICBwcml2YXRlIGN1cnNvciA9IFsxLCAxXSBhcyBbbnVtYmVyLCBudW1iZXJdO1xuXG5cbiAgICAvLyBlbGVtIGlzIHRoZSBlbGVtZW50IHRoYXQgcmVjZWl2ZWQgdGhlIGZvY3VzRXZlbnQuXG4gICAgLy8gTnZpbWlmeSBpcyB0aGUgZnVuY3Rpb24gdGhhdCBsaXN0ZW5zIGZvciBmb2N1cyBldmVudHMuIFdlIG5lZWQgdG8ga25vd1xuICAgIC8vIGFib3V0IGl0IGluIG9yZGVyIHRvIHJlbW92ZSBpdCBiZWZvcmUgZm9jdXNpbmcgZWxlbSAob3RoZXJ3aXNlIHdlJ2xsXG4gICAgLy8ganVzdCBncmFiIGZvY3VzIGFnYWluKS5cbiAgICBjb25zdHJ1Y3RvciAoZWxlbTogSFRNTEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgIGxpc3RlbmVyOiAoZXZ0OiB7IHRhcmdldDogRXZlbnRUYXJnZXQgfSkgPT4gUHJvbWlzZTx2b2lkPixcbiAgICAgICAgICAgICAgICAgb25EZXRhY2g6IChpZDogbnVtYmVyKSA9PiBhbnkpIHtcbiAgICAgICAgdGhpcy5vcmlnaW5hbEVsZW1lbnQgPSBlbGVtO1xuICAgICAgICB0aGlzLm52aW1pZnkgPSBsaXN0ZW5lcjtcbiAgICAgICAgdGhpcy5vbkRldGFjaCA9IG9uRGV0YWNoO1xuICAgICAgICB0aGlzLmVkaXRvciA9IGdldEVkaXRvcihlbGVtKTtcblxuICAgICAgICB0aGlzLnNwYW4gPSBlbGVtXG4gICAgICAgICAgICAub3duZXJEb2N1bWVudFxuICAgICAgICAgICAgLmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIiwgXCJzcGFuXCIpO1xuICAgICAgICB0aGlzLmlmcmFtZSA9IGVsZW1cbiAgICAgICAgICAgIC5vd25lckRvY3VtZW50XG4gICAgICAgICAgICAuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiLCBcImlmcmFtZVwiKSBhcyBIVE1MSUZyYW1lRWxlbWVudDtcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoZXJlIGlzbid0IGFueSBleHRyYSB3aWR0aC9oZWlnaHRcbiAgICAgICAgdGhpcy5pZnJhbWUuc3R5bGUucGFkZGluZyA9IFwiMHB4XCI7XG4gICAgICAgIHRoaXMuaWZyYW1lLnN0eWxlLm1hcmdpbiA9IFwiMHB4XCI7XG4gICAgICAgIHRoaXMuaWZyYW1lLnN0eWxlLmJvcmRlciA9IFwiMHB4XCI7XG4gICAgICAgIC8vIFdlIHN0aWxsIG5lZWQgYSBib3JkZXIsIHVzZSBhIHNoYWRvdyBmb3IgdGhhdFxuICAgICAgICB0aGlzLmlmcmFtZS5zdHlsZS5ib3hTaGFkb3cgPSBcIjBweCAwcHggMXB4IDFweCBibGFja1wiO1xuICAgIH1cblxuICAgIGF0dGFjaFRvUGFnZSAoZmlwOiBQcm9taXNlPG51bWJlcj4pIHtcbiAgICAgICAgdGhpcy5mcmFtZUlkUHJvbWlzZSA9IGZpcC50aGVuKChmOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZnJhbWVJZCA9IGY7XG4gICAgICAgICAgICAvLyBPbmNlIGEgZnJhbWVJZCBoYXMgYmVlbiBhY3F1aXJlZCwgdGhlIEZpcmVudmltRWxlbWVudCB3b3VsZCBkaWVcbiAgICAgICAgICAgIC8vIGlmIGl0cyBzcGFuIHdhcyByZW1vdmVkIGZyb20gdGhlIHBhZ2UuIFRodXMgdGhlcmUgaXMgbm8gdXNlIGluXG4gICAgICAgICAgICAvLyBrZWVwaW5nIGl0cyBzcGFuT2JzZXJ2ZXIgYXJvdW5kLiBJdCdkIGV2ZW4gY2F1c2UgaXNzdWVzIGFzIHRoZVxuICAgICAgICAgICAgLy8gc3Bhbk9ic2VydmVyIHdvdWxkIGF0dGVtcHQgdG8gcmUtaW5zZXJ0IGEgZGVhZCBmcmFtZSBpbiB0aGVcbiAgICAgICAgICAgIC8vIHBhZ2UuXG4gICAgICAgICAgICB0aGlzLnNwYW5PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mcmFtZUlkO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBXZSBkb24ndCBuZWVkIHRoZSBpZnJhbWUgdG8gYmUgYXBwZW5kZWQgdG8gdGhlIHBhZ2UgaW4gb3JkZXIgdG9cbiAgICAgICAgLy8gcmVzaXplIGl0IGJlY2F1c2Ugd2UncmUganVzdCB1c2luZyB0aGUgY29ycmVzcG9uZGluZ1xuICAgICAgICAvLyBpbnB1dC90ZXh0YXJlYSdzIHNpemVcbiAgICAgICAgbGV0IHJlY3QgPSB0aGlzLmdldEVsZW1lbnQoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdGhpcy5yZXNpemVUbyhyZWN0LndpZHRoLCByZWN0LmhlaWdodCwgZmFsc2UpO1xuICAgICAgICB0aGlzLnJlbGF0aXZlWCA9IDA7XG4gICAgICAgIHRoaXMucmVsYXRpdmVZID0gMDtcbiAgICAgICAgdGhpcy5wdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW4oKTtcblxuICAgICAgICAvLyBVc2UgYSBSZXNpemVPYnNlcnZlciB0byBkZXRlY3Qgd2hlbiB0aGUgdW5kZXJseWluZyBpbnB1dCBlbGVtZW50J3NcbiAgICAgICAgLy8gc2l6ZSBjaGFuZ2VzIGFuZCBjaGFuZ2UgdGhlIHNpemUgb2YgdGhlIEZpcmVudmltRWxlbWVudFxuICAgICAgICAvLyBhY2NvcmRpbmdseVxuICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbmV3ICgod2luZG93IGFzIGFueSkuUmVzaXplT2JzZXJ2ZXIpKCgoc2VsZikgPT4gYXN5bmMgKGVudHJpZXM6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbnRyeSA9IGVudHJpZXMuZmluZCgoZW50OiBhbnkpID0+IGVudC50YXJnZXQgPT09IHNlbGYuZ2V0RWxlbWVudCgpKTtcbiAgICAgICAgICAgIGlmIChzZWxmLmZyYW1lSWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZnJhbWVJZFByb21pc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdSZWN0ID0gdGhpcy5nZXRFbGVtZW50KCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlY3Qud2lkdGggPT09IG5ld1JlY3Qud2lkdGggJiYgcmVjdC5oZWlnaHQgPT09IG5ld1JlY3QuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVjdCA9IG5ld1JlY3Q7XG4gICAgICAgICAgICAgICAgc2VsZi5yZXNpemVUbyhyZWN0LndpZHRoLCByZWN0LmhlaWdodCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNlbGYucHV0RWRpdG9yQ2xvc2VUb0lucHV0T3JpZ2luKCk7XG4gICAgICAgICAgICAgICAgc2VsZi5yZXNpemVSZXFJZCArPSAxO1xuICAgICAgICAgICAgICAgIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1lSWQ6IHNlbGYuZnJhbWVJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzOiBbc2VsZi5yZXNpemVSZXFJZCwgcmVjdC53aWR0aCwgcmVjdC5oZWlnaHRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiBbXCJyZXNpemVcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiBbXCJtZXNzYWdlRnJhbWVcIl0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKHRoaXMpKTtcbiAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuZ2V0RWxlbWVudCgpLCB7IGJveDogXCJib3JkZXItYm94XCIgfSk7XG5cbiAgICAgICAgY29uc3QgcmVuZGVyZXIgPSBnZXRDb25mKCkucmVuZGVyZXIgPT09IFwiY2FudmFzXCIgPyBcIi9pbmRleC5odG1sXCIgOiBcIi9OZW92aW1GcmFtZS5odG1sXCI7XG4gICAgICAgIHRoaXMuaWZyYW1lLnNyYyA9IChicm93c2VyIGFzIGFueSkuZXh0ZW5zaW9uLmdldFVSTChyZW5kZXJlcik7XG4gICAgICAgIHRoaXMuc3Bhbi5hdHRhY2hTaGFkb3coeyBtb2RlOiBcImNsb3NlZFwiIH0pLmFwcGVuZENoaWxkKHRoaXMuaWZyYW1lKTtcblxuICAgICAgICAvLyBTbyBwYWdlcyAoZS5nLiBKaXJhLCBDb25mbHVlbmNlKSByZW1vdmUgc3BhbnMgZnJvbSB0aGUgcGFnZSBhcyBzb29uXG4gICAgICAgIC8vIGFzIHRoZXkncmUgaW5zZXJ0ZWQuIFdlIGRvbid0IHdhbid0IHRoYXQsIHNvIGZvciB0aGUgNSBzZWNvbmRzXG4gICAgICAgIC8vIGZvbGxvd2luZyB0aGUgaW5zZXJ0aW9uLCBkZXRlY3QgaWYgdGhlIHNwYW4gaXMgcmVtb3ZlZCBmcm9tIHRoZSBwYWdlXG4gICAgICAgIC8vIGJ5IGNoZWNraW5nIHZpc2liaWxpdHkgY2hhbmdlcyBhbmQgcmUtaW5zZXJ0IGlmIG5lZWRlZC5cbiAgICAgICAgbGV0IHJlaW5zZXJ0cyA9IDA7XG4gICAgICAgIHRoaXMuc3Bhbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoXG4gICAgICAgICAgICAoc2VsZiA9PiAobXV0YXRpb25zIDogTXV0YXRpb25SZWNvcmRbXSwgb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNwYW4gPSBzZWxmLmdldFNwYW4oKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbXV0YXRpb24gb2YgbXV0YXRpb25zKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIG11dGF0aW9uLnJlbW92ZWROb2Rlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZSA9PT0gc3Bhbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVpbnNlcnRzICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVpbnNlcnRzID49IDEwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZpcmVudmltIGlzIHRyeWluZyB0byBjcmVhdGUgYW4gaWZyYW1lIG9uIHRoaXMgc2l0ZSBidXQgdGhlIHBhZ2UgaXMgY29uc3RhbnRseSByZW1vdmluZyBpdC4gQ29uc2lkZXIgZGlzYWJsaW5nIEZpcmVudmltIG9uIHRoaXMgd2Vic2l0ZS5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHNlbGYuZ2V0RWxlbWVudCgpLm93bmVyRG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzcGFuKSwgcmVpbnNlcnRzICogMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkodGhpcykpO1xuICAgICAgICB0aGlzLnNwYW5PYnNlcnZlci5vYnNlcnZlKHRoaXMuZ2V0RWxlbWVudCgpLm93bmVyRG9jdW1lbnQuYm9keSwgeyBjaGlsZExpc3Q6IHRydWUgfSk7XG5cbiAgICAgICAgbGV0IHBhcmVudEVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnQoKS5vd25lckRvY3VtZW50LmJvZHk7XG4gICAgICAgIC8vIFdlIGNhbid0IGluc2VydCB0aGUgZnJhbWUgaW4gdGhlIGJvZHkgaWYgdGhlIGVsZW1lbnQgd2UncmUgZ29pbmcgdG9cbiAgICAgICAgLy8gcmVwbGFjZSB0aGUgY29udGVudCBvZiBpcyB0aGUgYm9keSwgYXMgcmVwbGFjaW5nIHRoZSBjb250ZW50IHdvdWxkXG4gICAgICAgIC8vIGRlc3Ryb3kgdGhlIGZyYW1lLlxuICAgICAgICBpZiAocGFyZW50RWxlbWVudCA9PT0gdGhpcy5nZXRFbGVtZW50KCkpIHtcbiAgICAgICAgICAgIHBhcmVudEVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnNwYW4pO1xuXG4gICAgICAgIHRoaXMuZm9jdXMoKTtcblxuICAgICAgICAvLyBJdCBpcyBwcmV0dHkgaGFyZCB0byB0ZWxsIHdoZW4gYW4gZWxlbWVudCBkaXNhcHBlYXJzIGZyb20gdGhlIHBhZ2VcbiAgICAgICAgLy8gKGVpdGhlciBieSBiZWluZyByZW1vdmVkIG9yIGJ5IGJlaW5nIGhpZGRlbiBieSBvdGhlciBlbGVtZW50cyksIHNvXG4gICAgICAgIC8vIHdlIHVzZSBhbiBpbnRlcnNlY3Rpb24gb2JzZXJ2ZXIsIHdoaWNoIGlzIHRyaWdnZXJlZCBldmVyeSB0aW1lIHRoZVxuICAgICAgICAvLyBlbGVtZW50IGJlY29tZXMgbW9yZSBvciBsZXNzIHZpc2libGUuXG4gICAgICAgIHRoaXMuaW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKHNlbGYgPT4gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbSA9IHNlbGYuZ2V0RWxlbWVudCgpO1xuICAgICAgICAgICAgLy8gSWYgZWxlbSBkb2Vzbid0IGhhdmUgYSByZWN0IGFueW1vcmUsIGl0J3MgaGlkZGVuXG4gICAgICAgICAgICBpZiAoZWxlbS5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHNlbGYuaGlkZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkodGhpcyksIHsgcm9vdDogbnVsbCwgdGhyZXNob2xkOiAwLjEgfSk7XG4gICAgICAgIHRoaXMuaW50ZXJzZWN0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmdldEVsZW1lbnQoKSk7XG5cbiAgICAgICAgLy8gV2Ugd2FudCB0byByZW1vdmUgdGhlIEZpcmVudmltRWxlbWVudCBmcm9tIHRoZSBwYWdlIHdoZW4gdGhlXG4gICAgICAgIC8vIGNvcnJlc3BvbmRpbmcgZWxlbWVudCBpcyByZW1vdmVkLiBXZSBkbyB0aGlzIGJ5IGFkZGluZyBhXG4gICAgICAgIC8vIG11dGF0aW9uT2JzZXJ2ZXIgdG8gaXRzIHBhcmVudC5cbiAgICAgICAgdGhpcy5wYWdlT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoc2VsZiA9PiAobXV0YXRpb25zOiBNdXRhdGlvblJlY29yZFtdKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gc2VsZi5nZXRFbGVtZW50KCk7XG4gICAgICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChtdXRhdGlvbiA9PiBtdXRhdGlvbi5yZW1vdmVkTm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB3YWxrZXIgPSBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKG5vZGUsIE5vZGVGaWx0ZXIuU0hPV19BTEwpO1xuICAgICAgICAgICAgICAgIHdoaWxlICh3YWxrZXIubmV4dE5vZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAod2Fsa2VyLmN1cnJlbnROb2RlID09PSBlbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHNlbGYuZGV0YWNoRnJvbVBhZ2UoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pKHRoaXMpKTtcbiAgICAgICAgdGhpcy5wYWdlT2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHtcbiAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICBjaGlsZExpc3Q6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2xlYXJGb2N1c0xpc3RlbmVycyAoKSB7XG4gICAgICAgIC8vIFdoZW4gdGhlIHVzZXIgdHJpZXMgdG8gYDp3IHwgY2FsbCBmaXJlbnZpbSNmb2N1c19wYWdlKClgIGluIE5lb3ZpbSxcbiAgICAgICAgLy8gd2UgaGF2ZSBhIHByb2JsZW0uIGA6d2AgcmVzdWx0cyBpbiBhIGNhbGwgdG8gc2V0UGFnZUVsZW1lbnRDb250ZW50LFxuICAgICAgICAvLyB3aGljaCBjYWxscyBGaXJlbnZpbUVsZW1lbnQuZm9jdXMoKSwgYmVjYXVzZSBzb21lIHBhZ2VzIHRyeSB0byBncmFiXG4gICAgICAgIC8vIGZvY3VzIHdoZW4gdGhlIGNvbnRlbnQgb2YgdGhlIHVuZGVybHlpbmcgZWxlbWVudCBjaGFuZ2VzLlxuICAgICAgICAvLyBGaXJlbnZpbUVsZW1lbnQuZm9jdXMoKSBjcmVhdGVzIGV2ZW50IGxpc3RlbmVycyBhbmQgdGltZW91dHMgdG9cbiAgICAgICAgLy8gZGV0ZWN0IHdoZW4gdGhlIHBhZ2UgdHJpZXMgdG8gZ3JhYiBmb2N1cyBhbmQgYnJpbmcgaXQgYmFjayB0byB0aGVcbiAgICAgICAgLy8gRmlyZW52aW1FbGVtZW50LiBCdXQgc2luY2UgYGNhbGwgZmlyZW52aW0jZm9jdXNfcGFnZSgpYCBoYXBwZW5zXG4gICAgICAgIC8vIHJpZ2h0IGFmdGVyIHRoZSBgOndgLCBmb2N1c19wYWdlKCkgdHJpZ2dlcnMgdGhlIGV2ZW50XG4gICAgICAgIC8vIGxpc3RlbmVycy90aW1lb3V0cyBjcmVhdGVkIGJ5IEZpcmVudmltRWxlbWVudC5mb2N1cygpIVxuICAgICAgICAvLyBTbyB3ZSBuZWVkIGEgd2F5IHRvIGNsZWFyIHRoZSB0aW1lb3V0cyBhbmQgZXZlbnQgbGlzdGVuZXJzIGJlZm9yZVxuICAgICAgICAvLyBwZXJmb3JtaW5nIGZvY3VzX3BhZ2UsIGFuZCB0aGF0J3Mgd2hhdCB0aGlzIGZ1bmN0aW9uIGRvZXMuXG4gICAgICAgIHRoaXMuZm9jdXNJbmZvLmZpbmFsUmVmb2N1c1RpbWVvdXRzLmZvckVhY2godCA9PiBjbGVhclRpbWVvdXQodCkpO1xuICAgICAgICB0aGlzLmZvY3VzSW5mby5yZWZvY3VzVGltZW91dHMuZm9yRWFjaCh0ID0+IGNsZWFyVGltZW91dCh0KSk7XG4gICAgICAgIHRoaXMuZm9jdXNJbmZvLnJlZm9jdXNSZWZzLmZvckVhY2goZiA9PiB7XG4gICAgICAgICAgICB0aGlzLmlmcmFtZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiYmx1clwiLCBmKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudCgpLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBmKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZm9jdXNJbmZvLmZpbmFsUmVmb2N1c1RpbWVvdXRzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuZm9jdXNJbmZvLnJlZm9jdXNUaW1lb3V0cy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLmZvY3VzSW5mby5yZWZvY3VzUmVmcy5sZW5ndGggPSAwO1xuICAgIH1cblxuICAgIGRldGFjaEZyb21QYWdlICgpIHtcbiAgICAgICAgdGhpcy5jbGVhckZvY3VzTGlzdGVuZXJzKCk7XG4gICAgICAgIGNvbnN0IGVsZW0gPSB0aGlzLmdldEVsZW1lbnQoKTtcbiAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci51bm9ic2VydmUoZWxlbSk7XG4gICAgICAgIHRoaXMuaW50ZXJzZWN0aW9uT2JzZXJ2ZXIudW5vYnNlcnZlKGVsZW0pO1xuICAgICAgICB0aGlzLnBhZ2VPYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgIHRoaXMuc3Bhbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgdGhpcy5zcGFuLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLm9uRGV0YWNoKHRoaXMuZnJhbWVJZCk7XG4gICAgfVxuXG4gICAgZm9jdXMgKCkge1xuICAgICAgICAvLyBTb21lIGlucHV0cyB0cnkgdG8gZ3JhYiB0aGUgZm9jdXMgYWdhaW4gYWZ0ZXIgd2UgYXBwZW5kZWQgdGhlIGlmcmFtZVxuICAgICAgICAvLyB0byB0aGUgcGFnZSwgc28gd2UgbmVlZCB0byByZWZvY3VzIGl0IGVhY2ggdGltZSBpdCBsb3NlcyBmb2N1cy4gQnV0XG4gICAgICAgIC8vIHRoZSB1c2VyIG1pZ2h0IHdhbnQgdG8gc3RvcCBmb2N1c2luZyB0aGUgaWZyYW1lIGF0IHNvbWUgcG9pbnQsIHNvIHdlXG4gICAgICAgIC8vIGFjdHVhbGx5IHN0b3AgcmVmb2N1c2luZyB0aGUgaWZyYW1lIGEgc2Vjb25kIGFmdGVyIGl0IGlzIGNyZWF0ZWQuXG4gICAgICAgIGNvbnN0IHJlZm9jdXMgPSAoKHNlbGYpID0+ICgpID0+IHtcbiAgICAgICAgICAgIHNlbGYuZm9jdXNJbmZvLnJlZm9jdXNUaW1lb3V0cy5wdXNoKHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIEZpcnN0LCBkZXN0cm95IGN1cnJlbnQgc2VsZWN0aW9uLiBTb21lIHdlYnNpdGVzIHVzZSB0aGVcbiAgICAgICAgICAgICAgICAvLyBzZWxlY3Rpb24gdG8gZm9yY2UtZm9jdXMgYW4gZWxlbWVudC5cbiAgICAgICAgICAgICAgICBjb25zdCBzZWwgPSBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgICAgICAgICAgICAgIC8vIFRoZXJlJ3MgYSByYWNlIGNvbmRpdGlvbiBpbiB0aGUgdGVzdHN1aXRlIG9uIGNocm9tZSB0aGF0XG4gICAgICAgICAgICAgICAgLy8gcmVzdWx0cyBpbiBzZWxmLnNwYW4gbm90IGJlaW5nIGluIHRoZSBkb2N1bWVudCBhbmQgZXJyb3JzXG4gICAgICAgICAgICAgICAgLy8gYmVpbmcgbG9nZ2VkLCBzbyB3ZSBjaGVjayBpZiBzZWxmLnNwYW4gcmVhbGx5IGlzIGluIGl0c1xuICAgICAgICAgICAgICAgIC8vIG93bmVyRG9jdW1lbnQuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuc3Bhbi5vd25lckRvY3VtZW50LmNvbnRhaW5zKHNlbGYuc3BhbikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2Uuc2V0U3RhcnQoc2VsZi5zcGFuLCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSk7XG4gICAgICAgICAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKTtcbiAgICAgICAgICAgICAgICAvLyBUaGVuLCBhdHRlbXB0IHRvIFwicmVsZWFzZVwiIHRoZSBmb2N1cyBmcm9tIHdoYXRldmVyIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAvLyBpcyBjdXJyZW50bHkgZm9jdXNlZC4gVGhpcyBkb2Vzbid0IHdvcmsgb24gQ2hyb21lLlxuICAgICAgICAgICAgICAgIGlmICghaXNDaHJvbWUoKSkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi5pZnJhbWUuZm9jdXMoKTtcbiAgICAgICAgICAgIH0sIDApKTtcbiAgICAgICAgfSkodGhpcyk7XG4gICAgICAgIHRoaXMuZm9jdXNJbmZvLnJlZm9jdXNSZWZzLnB1c2gocmVmb2N1cyk7XG4gICAgICAgIHRoaXMuaWZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIHJlZm9jdXMpO1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoKS5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgcmVmb2N1cyk7XG4gICAgICAgIHRoaXMuZm9jdXNJbmZvLmZpbmFsUmVmb2N1c1RpbWVvdXRzLnB1c2goc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICByZWZvY3VzKCk7XG4gICAgICAgICAgICB0aGlzLmlmcmFtZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiYmx1clwiLCByZWZvY3VzKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudCgpLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCByZWZvY3VzKTtcbiAgICAgICAgfSwgMTAwKSk7XG4gICAgICAgIHJlZm9jdXMoKTtcbiAgICB9XG5cbiAgICBmb2N1c09yaWdpbmFsRWxlbWVudCAoYWRkTGlzdGVuZXI6IGJvb2xlYW4pIHtcbiAgICAgICAgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgYW55KS5ibHVyKCk7XG4gICAgICAgIHRoaXMub3JpZ2luYWxFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCB0aGlzLm52aW1pZnkpO1xuICAgICAgICBjb25zdCBzZWwgPSBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgIGlmICh0aGlzLm9yaWdpbmFsRWxlbWVudC5vd25lckRvY3VtZW50LmNvbnRhaW5zKHRoaXMub3JpZ2luYWxFbGVtZW50KSkge1xuICAgICAgICAgICAgcmFuZ2Uuc2V0U3RhcnQodGhpcy5vcmlnaW5hbEVsZW1lbnQsIDApO1xuICAgICAgICB9XG4gICAgICAgIHJhbmdlLmNvbGxhcHNlKHRydWUpO1xuICAgICAgICB0aGlzLm9yaWdpbmFsRWxlbWVudC5mb2N1cygpO1xuICAgICAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpO1xuICAgICAgICBpZiAoYWRkTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYWxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCB0aGlzLm52aW1pZnkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0QnVmZmVySW5mbyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJ1ZmZlckluZm87XG4gICAgfVxuXG4gICAgZ2V0RWRpdG9yICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdG9yO1xuICAgIH1cblxuICAgIGdldEVsZW1lbnQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lZGl0b3IuZ2V0RWxlbWVudCgpO1xuICAgIH1cblxuICAgIGdldEZyYW1lSWQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mcmFtZUlkO1xuICAgIH1cblxuICAgIGdldElmcmFtZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlmcmFtZTtcbiAgICB9XG5cbiAgICBnZXRQYWdlRWxlbWVudENvbnRlbnQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRFZGl0b3IoKS5nZXRDb250ZW50KCk7XG4gICAgfVxuXG4gICAgZ2V0UGFnZUVsZW1lbnRDdXJzb3IgKCkge1xuICAgICAgICBjb25zdCBwID0gdGhpcy5lZGl0b3IuZ2V0Q3Vyc29yKCkuY2F0Y2goKCkgPT4gWzEsIDFdKSBhcyBQcm9taXNlPFtudW1iZXIsIG51bWJlcl0+O1xuICAgICAgICBwLnRoZW4oYyA9PiB0aGlzLmN1cnNvciA9IGMpO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG5cbiAgICBnZXRTZWxlY3RvciAoKSB7XG4gICAgICAgIHJldHVybiBjb21wdXRlU2VsZWN0b3IodGhpcy5nZXRFbGVtZW50KCkpO1xuICAgIH1cblxuICAgIGdldFNwYW4gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zcGFuO1xuICAgIH1cblxuICAgIGhpZGUgKCkge1xuICAgICAgICB0aGlzLmlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuXG4gICAgaXNGb2N1c2VkICgpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMuc3BhblxuICAgICAgICAgICAgfHwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy5pZnJhbWU7XG4gICAgfVxuXG4gICAgcHJlcGFyZUJ1ZmZlckluZm8gKCkge1xuICAgICAgICB0aGlzLmJ1ZmZlckluZm8gPSAoYXN5bmMgKCkgPT4gW1xuICAgICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZixcbiAgICAgICAgICAgIHRoaXMuZ2V0U2VsZWN0b3IoKSxcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0UGFnZUVsZW1lbnRDdXJzb3IoKSxcbiAgICAgICAgICAgIGF3YWl0ICh0aGlzLmVkaXRvci5nZXRMYW5ndWFnZSgpLmNhdGNoKCgpID0+IHVuZGVmaW5lZCkpXG4gICAgICAgIF0pKCkgYXMgUHJvbWlzZTxbc3RyaW5nLCBzdHJpbmcsIFtudW1iZXIsIG51bWJlcl0sIHN0cmluZ10+O1xuICAgIH1cblxuICAgIHByZXNzS2V5cyAoa2V5czogS2V5Ym9hcmRFdmVudFtdKSB7XG4gICAgICAgIGNvbnN0IGZvY3VzZWQgPSB0aGlzLmlzRm9jdXNlZCgpO1xuICAgICAgICBrZXlzLmZvckVhY2goZXYgPT4gdGhpcy5vcmlnaW5hbEVsZW1lbnQuZGlzcGF0Y2hFdmVudChldikpO1xuICAgICAgICBpZiAoZm9jdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHV0RWRpdG9yQ2xvc2VUb0lucHV0T3JpZ2luICgpIHtcbiAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZWRpdG9yLmdldEVsZW1lbnQoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICAvLyBTYXZlIGF0dHJpYnV0ZXNcbiAgICAgICAgY29uc3QgcG9zQXR0cnMgPSBbXCJsZWZ0XCIsIFwicG9zaXRpb25cIiwgXCJ0b3BcIiwgXCJ6SW5kZXhcIl07XG4gICAgICAgIGNvbnN0IG9sZFBvc0F0dHJzID0gcG9zQXR0cnMubWFwKChhdHRyOiBhbnkpID0+IHRoaXMuaWZyYW1lLnN0eWxlW2F0dHJdKTtcblxuICAgICAgICAvLyBBc3NpZ24gbmV3IHZhbHVlc1xuICAgICAgICB0aGlzLmlmcmFtZS5zdHlsZS5sZWZ0ID0gYCR7cmVjdC5sZWZ0ICsgd2luZG93LnNjcm9sbFggKyB0aGlzLnJlbGF0aXZlWH1weGA7XG4gICAgICAgIHRoaXMuaWZyYW1lLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICB0aGlzLmlmcmFtZS5zdHlsZS50b3AgPSBgJHtyZWN0LnRvcCArIHdpbmRvdy5zY3JvbGxZICsgdGhpcy5yZWxhdGl2ZVl9cHhgO1xuICAgICAgICAvLyAyMTM5OTk5OTk1IGlzIGhvcGVmdWxseSBoaWdoZXIgdGhhbiBldmVyeXRoaW5nIGVsc2Ugb24gdGhlIHBhZ2UgYnV0XG4gICAgICAgIC8vIGxvd2VyIHRoYW4gVmltaXVtJ3MgZWxlbWVudHNcbiAgICAgICAgdGhpcy5pZnJhbWUuc3R5bGUuekluZGV4ID0gXCIyMTM5OTk5OTk1XCI7XG5cbiAgICAgICAgLy8gQ29tcGFyZSwgdG8ga25vdyB3aGV0aGVyIHRoZSBlbGVtZW50IG1vdmVkIG9yIG5vdFxuICAgICAgICBjb25zdCBwb3NDaGFuZ2VkID0gISFwb3NBdHRycy5maW5kKChhdHRyOiBhbnksIGluZGV4KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaWZyYW1lLnN0eWxlW2F0dHJdICE9PSBvbGRQb3NBdHRyc1tpbmRleF0pO1xuICAgICAgICByZXR1cm4geyBwb3NDaGFuZ2VkLCBuZXdSZWN0OiByZWN0IH07XG4gICAgfVxuXG4gICAgcHV0RWRpdG9yQ2xvc2VUb0lucHV0T3JpZ2luQWZ0ZXJSZXNpemVGcm9tRnJhbWUgKCkge1xuICAgICAgICAvLyBUaGlzIGlzIGEgdmVyeSB3ZWlyZCwgY29tcGxpY2F0ZWQgYW5kIGJhZCBwaWVjZSBvZiBjb2RlLiBBbGwgY2FsbHNcbiAgICAgICAgLy8gdG8gYHJlc2l6ZUVkaXRvcigpYCBoYXZlIHRvIHJlc3VsdCBpbiBhIGNhbGwgdG8gYHJlc2l6ZVRvKClgIGFuZFxuICAgICAgICAvLyB0aGVuIGBwdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW4oKWAgaW4gb3JkZXIgdG8gbWFrZSBzdXJlIHRoZVxuICAgICAgICAvLyBpZnJhbWUgZG9lc24ndCBvdmVyZmxvdyBmcm9tIHRoZSB2aWV3cG9ydC5cbiAgICAgICAgLy8gSG93ZXZlciwgd2hlbiB3ZSBjcmVhdGUgdGhlIGlmcmFtZSwgd2UgZG9uJ3Qgd2FudCBpdCB0byBmaXQgaW4gdGhlXG4gICAgICAgIC8vIHZpZXdwb3J0IGF0IGFsbCBjb3N0LiBJbnN0ZWFkLCB3ZSB3YW50IGl0IHRvIGNvdmVyIHRoZSB1bmRlcmx5aW5nXG4gICAgICAgIC8vIGlucHV0IGFzIG11Y2ggYXMgcG9zc2libGUuIFRoZSBwcm9ibGVtIGlzIHRoYXQgd2hlbiBpdCBpcyBjcmVhdGVkLFxuICAgICAgICAvLyB0aGUgaWZyYW1lIHdpbGwgYXNrIGZvciBhIHJlc2l6ZSAoYmVjYXVzZSBOZW92aW0gYXNrcyBmb3Igb25lKSBhbmRcbiAgICAgICAgLy8gd2lsbCB0aHVzIGFsc28gYWNjaWRlbnRhbGx5IGNhbGwgcHV0RWRpdG9yQ2xvc2VUb0lucHV0T3JpZ2luLCB3aGljaFxuICAgICAgICAvLyB3ZSBkb24ndCB3YW50IHRvIGNhbGwuXG4gICAgICAgIC8vIFNvIHdlIGhhdmUgdG8gdHJhY2sgdGhlIGNhbGxzIHRvIHB1dEVkaXRvckNsb3NlVG9JbnB1dE9yaWdpbiB0aGF0XG4gICAgICAgIC8vIGFyZSBtYWRlIGZyb20gdGhlIGlmcmFtZSAoaS5lLiBmcm9tIGByZXNpemVFZGl0b3IoKWApIGFuZCBpZ25vcmUgdGhlXG4gICAgICAgIC8vIGZpcnN0IG9uZS5cbiAgICAgICAgaWYgKHRoaXMuZmlyc3RQdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW4pIHtcbiAgICAgICAgICAgIHRoaXMucmVsYXRpdmVYID0gMDtcbiAgICAgICAgICAgIHRoaXMucmVsYXRpdmVZID0gMDtcbiAgICAgICAgICAgIHRoaXMuZmlyc3RQdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW4oKTtcbiAgICB9XG5cbiAgICAvLyBSZXNpemUgdGhlIGlmcmFtZSwgbWFraW5nIHN1cmUgaXQgZG9lc24ndCBnZXQgbGFyZ2VyIHRoYW4gdGhlIHdpbmRvd1xuICAgIHJlc2l6ZVRvICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgd2FybklmcmFtZTogYm9vbGVhbikge1xuICAgICAgICAvLyBJZiB0aGUgZGltZW5zaW9ucyB0aGF0IGFyZSBhc2tlZCBmb3IgYXJlIHRvbyBiaWcsIG1ha2UgdGhlbSBhcyBiaWdcbiAgICAgICAgLy8gYXMgdGhlIHdpbmRvd1xuICAgICAgICBsZXQgY2FudEZ1bGx5UmVzaXplID0gZmFsc2U7XG4gICAgICAgIGxldCBhdmFpbGFibGVXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBpZiAoYXZhaWxhYmxlV2lkdGggPiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpIHtcbiAgICAgICAgICAgIGF2YWlsYWJsZVdpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aWR0aCA+PSBhdmFpbGFibGVXaWR0aCkge1xuICAgICAgICAgICAgd2lkdGggPSBhdmFpbGFibGVXaWR0aCAtIDE7XG4gICAgICAgICAgICBjYW50RnVsbHlSZXNpemUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBhdmFpbGFibGVIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIGlmIChhdmFpbGFibGVIZWlnaHQgPiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSB7XG4gICAgICAgICAgICBhdmFpbGFibGVIZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChoZWlnaHQgPj0gYXZhaWxhYmxlSGVpZ2h0KSB7XG4gICAgICAgICAgICBoZWlnaHQgPSBhdmFpbGFibGVIZWlnaHQgLSAxO1xuICAgICAgICAgICAgY2FudEZ1bGx5UmVzaXplID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSBkaW1lbnNpb25zIHRoYXQgd2VyZSBhc2tlZCBmb3IgbWlnaHQgbWFrZSB0aGUgaWZyYW1lIG92ZXJmbG93LlxuICAgICAgICAvLyBJbiB0aGlzIGNhc2UsIHdlIG5lZWQgdG8gY29tcHV0ZSBob3cgbXVjaCB3ZSBuZWVkIHRvIG1vdmUgdGhlIGlmcmFtZVxuICAgICAgICAvLyB0byB0aGUgbGVmdC90b3AgaW4gb3JkZXIgdG8gaGF2ZSBpdCBib3R0b20tcmlnaHQgY29ybmVyIHNpdCByaWdodCBpblxuICAgICAgICAvLyB0aGUgd2luZG93J3MgYm90dG9tLXJpZ2h0IGNvcm5lci5cbiAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZWRpdG9yLmdldEVsZW1lbnQoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3QgcmlnaHRPdmVyZmxvdyA9IGF2YWlsYWJsZVdpZHRoIC0gKHJlY3QubGVmdCArIHdpZHRoKTtcbiAgICAgICAgdGhpcy5yZWxhdGl2ZVggPSByaWdodE92ZXJmbG93IDwgMCA/IHJpZ2h0T3ZlcmZsb3cgOiAwO1xuICAgICAgICBjb25zdCBib3R0b21PdmVyZmxvdyA9IGF2YWlsYWJsZUhlaWdodCAtIChyZWN0LnRvcCArIGhlaWdodCk7XG4gICAgICAgIHRoaXMucmVsYXRpdmVZID0gYm90dG9tT3ZlcmZsb3cgPCAwID8gYm90dG9tT3ZlcmZsb3cgOiAwO1xuXG4gICAgICAgIC8vIE5vdyBhY3R1YWxseSBzZXQgdGhlIHdpZHRoL2hlaWdodCwgbW92ZSB0aGUgZWRpdG9yIHdoZXJlIGl0IGlzXG4gICAgICAgIC8vIHN1cHBvc2VkIHRvIGJlIGFuZCBpZiB0aGUgbmV3IGlmcmFtZSBjYW4ndCBiZSBhcyBiaWcgYXMgcmVxdWVzdGVkLFxuICAgICAgICAvLyB3YXJuIHRoZSBpZnJhbWUgc2NyaXB0LlxuICAgICAgICB0aGlzLmlmcmFtZS5zdHlsZS53aWR0aCA9IGAke3dpZHRofXB4YDtcbiAgICAgICAgdGhpcy5pZnJhbWUuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcbiAgICAgICAgaWYgKGNhbnRGdWxseVJlc2l6ZSAmJiB3YXJuSWZyYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZVJlcUlkICs9IDE7XG4gICAgICAgICAgICBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgZnJhbWVJZDogdGhpcy5mcmFtZUlkLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzOiBbdGhpcy5yZXNpemVSZXFJZCwgd2lkdGgsIGhlaWdodF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jTmFtZTogW1wicmVzaXplXCJdLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmdW5jTmFtZTogW1wibWVzc2FnZUZyYW1lXCJdLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZW5kS2V5IChrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICAgICAgICBmcmFtZUlkOiB0aGlzLmZyYW1lSWQsXG4gICAgICAgICAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgICAgICAgICAgICBhcmdzOiBba2V5XSxcbiAgICAgICAgICAgICAgICAgICAgZnVuY05hbWU6IFtcImZyYW1lX3NlbmRLZXlcIl0sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmNOYW1lOiBbXCJtZXNzYWdlRnJhbWVcIl0sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldFBhZ2VFbGVtZW50Q29udGVudCAodGV4dDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGZvY3VzZWQgPSB0aGlzLmlzRm9jdXNlZCgpO1xuICAgICAgICB0aGlzLmVkaXRvci5zZXRDb250ZW50KHRleHQpO1xuICAgICAgICBbXG4gICAgICAgICAgICBuZXcgRXZlbnQoXCJrZXlkb3duXCIsICAgICB7IGJ1YmJsZXM6IHRydWUgfSksXG4gICAgICAgICAgICBuZXcgRXZlbnQoXCJrZXl1cFwiLCAgICAgICB7IGJ1YmJsZXM6IHRydWUgfSksXG4gICAgICAgICAgICBuZXcgRXZlbnQoXCJrZXlwcmVzc1wiLCAgICB7IGJ1YmJsZXM6IHRydWUgfSksXG4gICAgICAgICAgICBuZXcgRXZlbnQoXCJiZWZvcmVpbnB1dFwiLCB7IGJ1YmJsZXM6IHRydWUgfSksXG4gICAgICAgICAgICBuZXcgRXZlbnQoXCJpbnB1dFwiLCAgICAgICB7IGJ1YmJsZXM6IHRydWUgfSksXG4gICAgICAgICAgICBuZXcgRXZlbnQoXCJjaGFuZ2VcIiwgICAgICB7IGJ1YmJsZXM6IHRydWUgfSlcbiAgICAgICAgXS5mb3JFYWNoKGV2ID0+IHRoaXMub3JpZ2luYWxFbGVtZW50LmRpc3BhdGNoRXZlbnQoZXYpKTtcbiAgICAgICAgaWYgKGZvY3VzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFBhZ2VFbGVtZW50Q3Vyc29yIChsaW5lOiBudW1iZXIsIGNvbHVtbjogbnVtYmVyKSB7XG4gICAgICAgIGxldCBwID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIHRoaXMuY3Vyc29yWzBdID0gbGluZTtcbiAgICAgICAgdGhpcy5jdXJzb3JbMV0gPSBjb2x1bW47XG4gICAgICAgIGlmICh0aGlzLmlzRm9jdXNlZCgpKSB7XG4gICAgICAgICAgICBwID0gdGhpcy5lZGl0b3Iuc2V0Q3Vyc29yKGxpbmUsIGNvbHVtbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuXG4gICAgc2hvdyAoKSB7XG4gICAgICAgIHRoaXMuaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSBcImluaXRpYWxcIjtcbiAgICB9XG5cbn1cbiIsIlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGF1dG9maWxsKCkge1xuICAgIGNvbnN0IHBsYXRJbmZvUHJvbWlzZSA9IGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICAgIGFyZ3M6IFtdLFxuICAgICAgICAgICAgZnVuY05hbWU6IFtcImJyb3dzZXJcIiwgXCJydW50aW1lXCIsIFwiZ2V0UGxhdGZvcm1JbmZvXCJdLFxuICAgICAgICB9LFxuICAgICAgICBmdW5jTmFtZTogW1wiZXhlY1wiXSxcbiAgICB9KTtcbiAgICBjb25zdCBtYW5pZmVzdFByb21pc2UgPSBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICBhcmdzOiB7XG4gICAgICAgICAgICBhcmdzOiBbXSxcbiAgICAgICAgICAgIGZ1bmNOYW1lOiBbXCJicm93c2VyXCIsIFwicnVudGltZVwiLCBcImdldE1hbmlmZXN0XCJdLFxuICAgICAgICB9LFxuICAgICAgICBmdW5jTmFtZTogW1wiZXhlY1wiXSxcbiAgICB9KTtcbiAgICBjb25zdCBudmltUGx1Z2luUHJvbWlzZSA9IGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgIGFyZ3M6IHt9LFxuICAgICAgICBmdW5jTmFtZTogW1wiZ2V0TnZpbVBsdWdpblZlcnNpb25cIl0sXG4gICAgfSk7XG4gICAgY29uc3QgaXNzdWVUZW1wbGF0ZVByb21pc2UgPSBmZXRjaChicm93c2VyLnJ1bnRpbWUuZ2V0VVJMKFwiSVNTVUVfVEVNUExBVEUubWRcIikpLnRoZW4ocCA9PiBwLnRleHQoKSk7XG4gICAgY29uc3QgYnJvd3NlclN0cmluZyA9IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goLyhmaXJlZm94fGNocm9tKVteIF0rL2dpKTtcbiAgICBsZXQgbmFtZSA9IFwiXCI7XG4gICAgbGV0IHZlcnNpb24gPSBcIlwiO1xuICAgIGlmIChicm93c2VyU3RyaW5nKSB7XG4gICAgICAgIFsgbmFtZSwgdmVyc2lvbiBdID0gYnJvd3NlclN0cmluZ1swXS5zcGxpdChcIi9cIik7XG4gICAgfVxuICAgIGNvbnN0IHZlbmRvciA9IG5hdmlnYXRvci52ZW5kb3IgfHwgXCJcIjtcbiAgICBjb25zdCB0ZXh0YXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaXNzdWVfYm9keVwiKSBhcyBhbnk7XG4gICAgY29uc3QgW1xuICAgICAgICBwbGF0SW5mbyxcbiAgICAgICAgbWFuaWZlc3QsXG4gICAgICAgIG52aW1QbHVnaW5WZXJzaW9uLFxuICAgICAgICBpc3N1ZVRlbXBsYXRlLFxuICAgIF0gPSBhd2FpdCBQcm9taXNlLmFsbChbcGxhdEluZm9Qcm9taXNlLCBtYW5pZmVzdFByb21pc2UsIG52aW1QbHVnaW5Qcm9taXNlLCBpc3N1ZVRlbXBsYXRlUHJvbWlzZV0pO1xuICAgIC8vIENhbid0IGhhcHBlbiwgYnV0IGRvZXNuJ3QgY29zdCBtdWNoIHRvIGhhbmRsZSFcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmICghdGV4dGFyZWEgfHwgdGV4dGFyZWEudmFsdWUucmVwbGFjZSgvXFxyL2csIFwiXCIpICE9PSBpc3N1ZVRlbXBsYXRlLnJlcGxhY2UoL1xcci9nLCBcIlwiKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRleHRhcmVhLnZhbHVlID0gaXNzdWVUZW1wbGF0ZVxuICAgICAgICAucmVwbGFjZShcIk9TIFZlcnNpb246XCIsIGBPUyBWZXJzaW9uOiAke3BsYXRJbmZvLm9zfSAke3BsYXRJbmZvLmFyY2h9YClcbiAgICAgICAgLnJlcGxhY2UoXCJCcm93c2VyIFZlcnNpb246XCIsIGBCcm93c2VyIFZlcnNpb246ICR7dmVuZG9yfSAke25hbWV9ICR7dmVyc2lvbn1gKVxuICAgICAgICAucmVwbGFjZShcIkJyb3dzZXIgQWRkb24gVmVyc2lvbjpcIiwgYEJyb3dzZXIgQWRkb24gVmVyc2lvbjogJHttYW5pZmVzdC52ZXJzaW9ufWApXG4gICAgICAgIC5yZXBsYWNlKFwiTmVvdmltIFBsdWdpbiBWZXJzaW9uOlwiLCBgTmVvdmltIFBsdWdpbiBWZXJzaW9uOiAke252aW1QbHVnaW5WZXJzaW9ufWApO1xufVxuIiwiaW1wb3J0IHsgZ2V0Q29uZiB9IGZyb20gXCIuL3V0aWxzL2NvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCB7IGdldE5lb3ZpbUZyYW1lRnVuY3Rpb25zLCBnZXRBY3RpdmVDb250ZW50RnVuY3Rpb25zLCBnZXRUYWJGdW5jdGlvbnMgfSBmcm9tIFwiLi9wYWdlL2Z1bmN0aW9uc1wiO1xuaW1wb3J0IHsgRmlyZW52aW1FbGVtZW50IH0gZnJvbSBcIi4vRmlyZW52aW1FbGVtZW50XCI7XG5cbi8vIFByb21pc2UgdXNlZCB0byBpbXBsZW1lbnQgYSBsb2NraW5nIG1lY2hhbmlzbSBwcmV2ZW50aW5nIGNvbmN1cnJlbnQgY3JlYXRpb25cbi8vIG9mIG5lb3ZpbSBmcmFtZXNcbmxldCBmcmFtZUlkTG9jayA9IFByb21pc2UucmVzb2x2ZSgpO1xuXG5leHBvcnQgY29uc3QgZmlyZW52aW1HbG9iYWwgPSB7XG4gICAgLy8gV2hldGhlciBGaXJlbnZpbSBpcyBkaXNhYmxlZCBpbiB0aGlzIHRhYlxuICAgIGRpc2FibGVkOiBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIGFyZ3M6IFtcImRpc2FibGVkXCJdLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiBbXCJnZXRUYWJWYWx1ZVwiXSxcbiAgICAgICAgfSlcbiAgICAgICAgLy8gTm90ZTogdGhpcyByZWxpZXMgb24gc2V0RGlzYWJsZWQgZXhpc3RpbmcgaW4gdGhlIG9iamVjdCByZXR1cm5lZCBieVxuICAgICAgICAvLyBnZXRGdW5jdGlvbnMgYW5kIGF0dGFjaGVkIHRvIHRoZSB3aW5kb3cgb2JqZWN0XG4gICAgICAgIC50aGVuKChkaXNhYmxlZDogYm9vbGVhbikgPT4gKHdpbmRvdyBhcyBhbnkpLnNldERpc2FibGVkKGRpc2FibGVkKSksXG4gICAgLy8gUHJvbWlzZS1yZXNvbHV0aW9uIGZ1bmN0aW9uIGNhbGxlZCB3aGVuIGEgZnJhbWVJZCBpcyByZWNlaXZlZCBmcm9tIHRoZVxuICAgIC8vIGJhY2tncm91bmQgc2NyaXB0XG4gICAgZnJhbWVJZFJlc29sdmU6IChfOiBudW1iZXIpOiB2b2lkID0+IHVuZGVmaW5lZCxcbiAgICAvLyBsYXN0Rm9jdXNlZENvbnRlbnRTY3JpcHQga2VlcHMgdHJhY2sgb2YgdGhlIGxhc3QgY29udGVudCBmcmFtZSB0aGF0IGhhc1xuICAgIC8vIGJlZW4gZm9jdXNlZC4gVGhpcyBpcyBuZWNlc3NhcnkgaW4gcGFnZXMgdGhhdCBjb250YWluIG11bHRpcGxlIGZyYW1lc1xuICAgIC8vIChhbmQgdGh1cyBtdWx0aXBsZSBjb250ZW50IHNjcmlwdHMpOiBmb3IgZXhhbXBsZSwgaWYgdXNlcnMgcHJlc3MgdGhlXG4gICAgLy8gZ2xvYmFsIGtleWJvYXJkIHNob3J0Y3V0IDxDLW4+LCB0aGUgYmFja2dyb3VuZCBzY3JpcHQgc2VuZHMgYSBcImdsb2JhbFwiXG4gICAgLy8gbWVzc2FnZSB0byBhbGwgb2YgdGhlIGFjdGl2ZSB0YWIncyBjb250ZW50IHNjcmlwdHMuIEZvciBhIGNvbnRlbnQgc2NyaXB0XG4gICAgLy8gdG8ga25vdyBpZiBpdCBzaG91bGQgcmVhY3QgdG8gYSBnbG9iYWwgbWVzc2FnZSwgaXQganVzdCBuZWVkcyB0byBjaGVja1xuICAgIC8vIGlmIGl0IGlzIHRoZSBsYXN0IGFjdGl2ZSBjb250ZW50IHNjcmlwdC5cbiAgICBsYXN0Rm9jdXNlZENvbnRlbnRTY3JpcHQ6IDAsXG4gICAgLy8gbnZpbWlmeTogdHJpZ2dlcmVkIHdoZW4gYW4gZWxlbWVudCBpcyBmb2N1c2VkLCB0YWtlcyBjYXJlIG9mIGNyZWF0aW5nXG4gICAgLy8gdGhlIGVkaXRvciBpZnJhbWUsIGFwcGVuZGluZyBpdCB0byB0aGUgcGFnZSBhbmQgZm9jdXNpbmcgaXQuXG4gICAgbnZpbWlmeTogYXN5bmMgKGV2dDogeyB0YXJnZXQ6IEV2ZW50VGFyZ2V0IH0pID0+IHtcbiAgICAgICAgaWYgKGZpcmVudmltR2xvYmFsLmRpc2FibGVkIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgYXdhaXQgZmlyZW52aW1HbG9iYWwuZGlzYWJsZWQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXaGVuIGNyZWF0aW5nIG5ldyBmcmFtZXMsIHdlIG5lZWQgdG8ga25vdyB0aGVpciBmcmFtZUlkIGluIG9yZGVyIHRvXG4gICAgICAgIC8vIGNvbW11bmljYXRlIHdpdGggdGhlbS4gVGhpcyBjYW4ndCBiZSByZXRyaWV2ZWQgdGhyb3VnaCBhXG4gICAgICAgIC8vIHN5bmNocm9ub3VzLCBpbi1wYWdlIGNhbGwgc28gdGhlIG5ldyBmcmFtZSBoYXMgdG8gdGVsbCB0aGVcbiAgICAgICAgLy8gYmFja2dyb3VuZCBzY3JpcHQgdG8gc2VuZCBpdHMgZnJhbWUgaWQgdG8gdGhlIHBhZ2UuIFByb2JsZW0gaXMsIGlmXG4gICAgICAgIC8vIG11bHRpcGxlIGZyYW1lcyBhcmUgY3JlYXRlZCBpbiBhIHZlcnkgc2hvcnQgYW1vdW50IG9mIHRpbWUsIHdlXG4gICAgICAgIC8vIGFyZW4ndCBndWFyYW50ZWVkIHRvIHJlY2VpdmUgdGhlc2UgZnJhbWVJZHMgaW4gdGhlIG9yZGVyIGluIHdoaWNoXG4gICAgICAgIC8vIHRoZSBmcmFtZXMgd2VyZSBjcmVhdGVkLiBTbyB3ZSBoYXZlIHRvIGltcGxlbWVudCBhIGxvY2tpbmcgbWVjaGFuaXNtXG4gICAgICAgIC8vIHRvIG1ha2Ugc3VyZSB0aGF0IHdlIGRvbid0IGNyZWF0ZSBuZXcgZnJhbWVzIHVudGlsIHdlIHJlY2VpdmVkIHRoZVxuICAgICAgICAvLyBmcmFtZUlkIG9mIHRoZSBwcmV2aW91c2x5IGNyZWF0ZWQgZnJhbWUuXG4gICAgICAgIGxldCBsb2NrO1xuICAgICAgICB3aGlsZSAobG9jayAhPT0gZnJhbWVJZExvY2spIHtcbiAgICAgICAgICAgIGxvY2sgPSBmcmFtZUlkTG9jaztcbiAgICAgICAgICAgIGF3YWl0IGZyYW1lSWRMb2NrO1xuICAgICAgICB9XG5cbiAgICAgICAgZnJhbWVJZExvY2sgPSBuZXcgUHJvbWlzZShhc3luYyAodW5sb2NrOiBhbnkpID0+IHtcbiAgICAgICAgICAgIC8vIGF1dG8gaXMgdHJ1ZSB3aGVuIG52aW1pZnkoKSBpcyBjYWxsZWQgYXMgYW4gZXZlbnQgbGlzdGVuZXIsIGZhbHNlXG4gICAgICAgICAgICAvLyB3aGVuIGNhbGxlZCBmcm9tIGZvcmNlTnZpbWlmeSgpXG4gICAgICAgICAgICBjb25zdCBhdXRvID0gKGV2dCBpbnN0YW5jZW9mIEZvY3VzRXZlbnQpO1xuXG4gICAgICAgICAgICBjb25zdCB0YWtlb3ZlciA9IGdldENvbmYoKS50YWtlb3ZlcjtcbiAgICAgICAgICAgIGlmIChmaXJlbnZpbUdsb2JhbC5kaXNhYmxlZCB8fCAoYXV0byAmJiB0YWtlb3ZlciA9PT0gXCJuZXZlclwiKSkge1xuICAgICAgICAgICAgICAgIHVubG9jaygpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZmlyZW52aW0gPSBuZXcgRmlyZW52aW1FbGVtZW50KFxuICAgICAgICAgICAgICAgIGV2dC50YXJnZXQgYXMgSFRNTEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgZmlyZW52aW1HbG9iYWwubnZpbWlmeSxcbiAgICAgICAgICAgICAgICAoaWQ6IG51bWJlcikgPT4gZmlyZW52aW1HbG9iYWwuZmlyZW52aW1FbGVtcy5kZWxldGUoaWQpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgZWRpdG9yID0gZmlyZW52aW0uZ2V0RWRpdG9yKCk7XG5cbiAgICAgICAgICAgIC8vIElmIHRoaXMgZWxlbWVudCBhbHJlYWR5IGhhcyBhIG5lb3ZpbSBmcmFtZSwgc3RvcFxuICAgICAgICAgICAgY29uc3QgYWxyZWFkeVJ1bm5pbmcgPSBBcnJheS5mcm9tKGZpcmVudmltR2xvYmFsLmZpcmVudmltRWxlbXMudmFsdWVzKCkpXG4gICAgICAgICAgICAgICAgLmZpbmQoKGluc3RhbmNlKSA9PiBpbnN0YW5jZS5nZXRFbGVtZW50KCkgPT09IGVkaXRvci5nZXRFbGVtZW50KCkpO1xuICAgICAgICAgICAgaWYgKGFscmVhZHlSdW5uaW5nICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGUgc3BhbiBtaWdodCBoYXZlIGJlZW4gcmVtb3ZlZCBmcm9tIHRoZSBwYWdlIGJ5IHRoZSBwYWdlXG4gICAgICAgICAgICAgICAgLy8gKHRoaXMgaGFwcGVucyBvbiBKaXJhL0NvbmZsdWVuY2UgZm9yIGV4YW1wbGUpIHNvIHdlIGNoZWNrXG4gICAgICAgICAgICAgICAgLy8gZm9yIHRoYXQuXG4gICAgICAgICAgICAgICAgY29uc3Qgc3BhbiA9IGFscmVhZHlSdW5uaW5nLmdldFNwYW4oKTtcbiAgICAgICAgICAgICAgICBpZiAoc3Bhbi5vd25lckRvY3VtZW50LmNvbnRhaW5zKHNwYW4pKSB7XG4gICAgICAgICAgICAgICAgICAgIGFscmVhZHlSdW5uaW5nLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgYWxyZWFkeVJ1bm5pbmcuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdW5sb2NrKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgc3BhbiBoYXMgYmVlbiByZW1vdmVkIGZyb20gdGhlIHBhZ2UsIHRoZSBlZGl0b3JcbiAgICAgICAgICAgICAgICAgICAgLy8gaXMgZGVhZCBiZWNhdXNlIHJlbW92aW5nIGFuIGlmcmFtZSBmcm9tIHRoZSBwYWdlIGtpbGxzXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSB3ZWJzb2NrZXQgY29ubmVjdGlvbiBpbnNpZGUgb2YgaXQuXG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGp1c3QgdGVsbCB0aGUgZWRpdG9yIHRvIGNsZWFuIGl0c2VsZiB1cCBhbmQgZ28gb24gYXNcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgaXQgZGlkbid0IGV4aXN0LlxuICAgICAgICAgICAgICAgICAgICBhbHJlYWR5UnVubmluZy5kZXRhY2hGcm9tUGFnZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGF1dG8gJiYgKHRha2VvdmVyID09PSBcImVtcHR5XCIgfHwgdGFrZW92ZXIgPT09IFwibm9uZW1wdHlcIikpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50ID0gKGF3YWl0IGVkaXRvci5nZXRDb250ZW50KCkpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICBpZiAoKGNvbnRlbnQgIT09IFwiXCIgJiYgdGFrZW92ZXIgPT09IFwiZW1wdHlcIilcbiAgICAgICAgICAgICAgICAgICAgfHwgKGNvbnRlbnQgPT09IFwiXCIgJiYgdGFrZW92ZXIgPT09IFwibm9uZW1wdHlcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVubG9jaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZpcmVudmltLnByZXBhcmVCdWZmZXJJbmZvKCk7XG4gICAgICAgICAgICBjb25zdCBmcmFtZUlkUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlOiAoXzogbnVtYmVyKSA9PiB2b2lkLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBmaXJlbnZpbUdsb2JhbC5mcmFtZUlkUmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogbWFrZSB0aGlzIHRpbWVvdXQgdGhlIHNhbWUgYXMgdGhlIG9uZSBpbiBiYWNrZ3JvdW5kLnRzXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChyZWplY3QsIDEwMDAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZnJhbWVJZFByb21pc2UudGhlbigoZnJhbWVJZDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgZmlyZW52aW1HbG9iYWwuZmlyZW52aW1FbGVtcy5zZXQoZnJhbWVJZCwgZmlyZW52aW0pO1xuICAgICAgICAgICAgICAgIGZpcmVudmltR2xvYmFsLmZyYW1lSWRSZXNvbHZlID0gKCkgPT4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHVubG9jaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmcmFtZUlkUHJvbWlzZS5jYXRjaCh1bmxvY2spO1xuICAgICAgICAgICAgZmlyZW52aW0uYXR0YWNoVG9QYWdlKGZyYW1lSWRQcm9taXNlKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8vIGZpZW52aW1FbGVtcyBtYXBzIGZyYW1lIGlkcyB0byBmaXJlbnZpbSBlbGVtZW50cy5cbiAgICBmaXJlbnZpbUVsZW1zOiBuZXcgTWFwPG51bWJlciwgRmlyZW52aW1FbGVtZW50PigpLFxufTtcblxuY29uc3Qgb3duRnJhbWVJZCA9IGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7IGFyZ3M6IFtdLCBmdW5jTmFtZTogW1wiZ2V0T3duRnJhbWVJZFwiXSB9KTtcbmFzeW5jIGZ1bmN0aW9uIGFubm91bmNlRm9jdXMgKCkge1xuICAgIGNvbnN0IGZyYW1lSWQgPSBhd2FpdCBvd25GcmFtZUlkO1xuICAgIGZpcmVudmltR2xvYmFsLmxhc3RGb2N1c2VkQ29udGVudFNjcmlwdCA9IGZyYW1lSWQ7XG4gICAgYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgYXJnczoge1xuICAgICAgICAgICAgYXJnczogWyBmcmFtZUlkIF0sXG4gICAgICAgICAgICBmdW5jTmFtZTogW1wic2V0TGFzdEZvY3VzZWRDb250ZW50U2NyaXB0XCJdXG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmNOYW1lOiBbXCJtZXNzYWdlUGFnZVwiXVxuICAgIH0pO1xufVxuLy8gV2hlbiB0aGUgZnJhbWUgaXMgY3JlYXRlZCwgd2UgbWlnaHQgcmVjZWl2ZSBmb2N1cywgY2hlY2sgZm9yIHRoYXRcbm93bkZyYW1lSWQudGhlbihfID0+IHtcbiAgICBpZiAoZG9jdW1lbnQuaGFzRm9jdXMoKSkge1xuICAgICAgICBhbm5vdW5jZUZvY3VzKCk7XG4gICAgfVxufSk7XG5hc3luYyBmdW5jdGlvbiBhZGRGb2N1c0xpc3RlbmVyICgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIGFubm91bmNlRm9jdXMpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgYW5ub3VuY2VGb2N1cyk7XG59XG5hZGRGb2N1c0xpc3RlbmVyKCk7XG4vLyBXZSBuZWVkIHRvIHVzZSBzZXRJbnRlcnZhbCB0byBwZXJpb2RpY2FsbHkgcmUtYWRkIHRoZSBmb2N1cyBsaXN0ZW5lcnMgYXMgaW5cbi8vIGZyYW1lcyB0aGUgZG9jdW1lbnQgY291bGQgZ2V0IGRlbGV0ZWQgYW5kIHJlLWNyZWF0ZWQgd2l0aG91dCBvdXIga25vd2xlZGdlLlxuY29uc3QgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKGFkZEZvY3VzTGlzdGVuZXIsIDEwMCk7XG4vLyBCdXQgd2UgZG9uJ3Qgd2FudCB0byBzeXBob24gdGhlIHVzZXIncyBiYXR0ZXJ5IHNvIHdlIHN0b3AgY2hlY2tpbmcgYWZ0ZXIgYSBzZWNvbmRcbnNldFRpbWVvdXQoKCkgPT4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKSwgMTAwMCk7XG5cbmV4cG9ydCBjb25zdCBmcmFtZUZ1bmN0aW9ucyA9IGdldE5lb3ZpbUZyYW1lRnVuY3Rpb25zKGZpcmVudmltR2xvYmFsKTtcbmV4cG9ydCBjb25zdCBhY3RpdmVGdW5jdGlvbnMgPSBnZXRBY3RpdmVDb250ZW50RnVuY3Rpb25zKGZpcmVudmltR2xvYmFsKTtcbmV4cG9ydCBjb25zdCB0YWJGdW5jdGlvbnMgPSBnZXRUYWJGdW5jdGlvbnMoZmlyZW52aW1HbG9iYWwpO1xuT2JqZWN0LmFzc2lnbih3aW5kb3csIGZyYW1lRnVuY3Rpb25zLCBhY3RpdmVGdW5jdGlvbnMsIHRhYkZ1bmN0aW9ucyk7XG5icm93c2VyLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGFzeW5jIChyZXF1ZXN0OiB7IGZ1bmNOYW1lOiBzdHJpbmdbXSwgYXJnczogYW55W10gfSkgPT4ge1xuICAgIC8vIEFsbCBjb250ZW50IHNjcmlwdHMgbXVzdCByZWFjdCB0byB0YWIgZnVuY3Rpb25zXG4gICAgbGV0IGZuID0gcmVxdWVzdC5mdW5jTmFtZS5yZWR1Y2UoKGFjYzogYW55LCBjdXI6IHN0cmluZykgPT4gYWNjW2N1cl0sIHRhYkZ1bmN0aW9ucyk7XG4gICAgaWYgKGZuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGZuKC4uLnJlcXVlc3QuYXJncyk7XG4gICAgfVxuXG4gICAgLy8gVGhlIG9ubHkgY29udGVudCBzY3JpcHQgdGhhdCBzaG91bGQgcmVhY3QgdG8gYWN0aXZlRnVuY3Rpb25zIGlzIHRoZSBhY3RpdmUgb25lXG4gICAgZm4gPSByZXF1ZXN0LmZ1bmNOYW1lLnJlZHVjZSgoYWNjOiBhbnksIGN1cjogc3RyaW5nKSA9PiBhY2NbY3VyXSwgYWN0aXZlRnVuY3Rpb25zKTtcbiAgICBpZiAoZm4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoZmlyZW52aW1HbG9iYWwubGFzdEZvY3VzZWRDb250ZW50U2NyaXB0ID09PSBhd2FpdCBvd25GcmFtZUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4oLi4ucmVxdWVzdC5hcmdzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKCkgPT4gdW5kZWZpbmVkKTtcbiAgICB9XG5cbiAgICAvLyBUaGUgb25seSBjb250ZW50IHNjcmlwdCB0aGF0IHNob3VsZCByZWFjdCB0byBmcmFtZUZ1bmN0aW9ucyBpcyB0aGUgb25lXG4gICAgLy8gdGhhdCBvd25zIHRoZSBmcmFtZSB0aGF0IHNlbnQgdGhlIHJlcXVlc3RcbiAgICBmbiA9IHJlcXVlc3QuZnVuY05hbWUucmVkdWNlKChhY2M6IGFueSwgY3VyOiBzdHJpbmcpID0+IGFjY1tjdXJdLCBmcmFtZUZ1bmN0aW9ucyk7XG4gICAgaWYgKGZuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGZpcmVudmltR2xvYmFsLmZpcmVudmltRWxlbXMuZ2V0KHJlcXVlc3QuYXJnc1swXSkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZuKC4uLnJlcXVlc3QuYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCgpID0+IHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvcjogdW5oYW5kbGVkIGNvbnRlbnQgcmVxdWVzdDogJHtKU09OLnN0cmluZ2lmeShyZXF1ZXN0KX0uYCk7XG59KTtcblxuIiwiXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RFZGl0b3Ige1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRDb250ZW50ICgpOiBQcm9taXNlPHN0cmluZz47XG4gICAgcHVibGljIGFic3RyYWN0IGdldEN1cnNvciAoKTogUHJvbWlzZTxbbnVtYmVyLCBudW1iZXJdPjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0RWxlbWVudCAoKTogSFRNTEVsZW1lbnQ7XG4gICAgcHVibGljIGFic3RyYWN0IGdldExhbmd1YWdlICgpOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD47XG4gICAgcHVibGljIGFic3RyYWN0IHNldENvbnRlbnQgKHM6IHN0cmluZyk6IFByb21pc2U8YW55PjtcbiAgICBwdWJsaWMgYWJzdHJhY3Qgc2V0Q3Vyc29yIChsaW5lOiBudW1iZXIsIGNvbHVtbjogbnVtYmVyKTogUHJvbWlzZTxhbnk+O1xufVxuIiwiaW1wb3J0IHsgZXhlY3V0ZUluUGFnZSwgY29tcHV0ZVNlbGVjdG9yIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgeyBBYnN0cmFjdEVkaXRvciB9IGZyb20gXCIuL0Fic3RyYWN0RWRpdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBBY2VFZGl0b3IgZXh0ZW5kcyBBYnN0cmFjdEVkaXRvciB7XG5cbiAgICBzdGF0aWMgbWF0Y2hlcyAoZTogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgbGV0IHBhcmVudCA9IGU7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgKytpKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50ICE9PSB1bmRlZmluZWQgJiYgcGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCgvYWNlX2VkaXRvci9naSkudGVzdChwYXJlbnQuY2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZWxlbTogSFRNTEVsZW1lbnQ7XG4gICAgY29uc3RydWN0b3IgKGU6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZWxlbSA9IGU7XG4gICAgICAgIC8vIEdldCB0aGUgdG9wbW9zdCBhY2UgZWxlbWVudFxuICAgICAgICBsZXQgcGFyZW50ID0gdGhpcy5lbGVtLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIHdoaWxlIChBY2VFZGl0b3IubWF0Y2hlcyhwYXJlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW0gPSBwYXJlbnQ7XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBzdHJpbmdpZmllZCBhbmQgaW5zZXJ0ZWQgaW4gcGFnZSBjb250ZXh0IHNvIHdlXG4gICAgLy8gY2FuJ3QgaW5zdHJ1bWVudCBpdC5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHByaXZhdGUgZ2V0QWNlID0gKHNlbGVjOiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWMpIGFzIGFueTtcbiAgICAgICAgY29uc3Qgd2luX2FjZSA9ICh3aW5kb3cgYXMgYW55KS5hY2U7XG4gICAgICAgIGlmICh3aW5fYWNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5fYWNlLmVkaXQoZWxlbSk7XG4gICAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGVsZW0sICdhY2VFZGl0b3InKSkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW0uYWNlRWRpdG9yO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBBY2VFZGl0b3IgaW5zdGFuY2VcIik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZ2V0Q29udGVudCAoKSB7XG4gICAgICAgIHJldHVybiBleGVjdXRlSW5QYWdlKGAoJHsvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyAoZ2V0QWNlOiBhbnksIHNlbGVjOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBnZXRBY2Uoc2VsZWMpLmdldFZhbHVlKCk7XG4gICAgICAgIH19KSgke3RoaXMuZ2V0QWNlfSwgJHtKU09OLnN0cmluZ2lmeShjb21wdXRlU2VsZWN0b3IodGhpcy5lbGVtKSl9KWApO1xuICAgIH1cblxuICAgIGdldEN1cnNvciAoKSB7XG4gICAgICAgIHJldHVybiBleGVjdXRlSW5QYWdlKGAoJHsvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyAoZ2V0QWNlOiBhbnksIHNlbGVjOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGxldCBwb3NpdGlvbjtcbiAgICAgICAgICAgIGNvbnN0IGFjZSA9IGdldEFjZShzZWxlYyk7XG4gICAgICAgICAgICBpZiAoYWNlLmdldEN1cnNvclBvc2l0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IGFjZS5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IGFjZS5zZWxlY3Rpb24uY3Vyc29yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFtwb3NpdGlvbi5yb3cgKyAxLCBwb3NpdGlvbi5jb2x1bW5dO1xuICAgICAgICB9fSkoJHt0aGlzLmdldEFjZX0sICR7SlNPTi5zdHJpbmdpZnkoY29tcHV0ZVNlbGVjdG9yKHRoaXMuZWxlbSkpfSlgKTtcbiAgICB9XG5cbiAgICBnZXRFbGVtZW50ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbTtcbiAgICB9XG5cbiAgICBnZXRMYW5ndWFnZSAoKSB7XG4gICAgICAgIHJldHVybiBleGVjdXRlSW5QYWdlKGAoJHsvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyAoZ2V0QWNlOiBhbnksIHNlbGVjOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFjZSA9IGdldEFjZShzZWxlYyk7XG4gICAgICAgICAgICByZXR1cm4gYWNlLnNlc3Npb24uJG1vZGVJZC5zcGxpdChcIi9cIikuc2xpY2UoLTEpWzBdO1xuICAgICAgICB9fSkoJHt0aGlzLmdldEFjZX0sICR7SlNPTi5zdHJpbmdpZnkoY29tcHV0ZVNlbGVjdG9yKHRoaXMuZWxlbSkpfSlgKTtcbiAgICB9XG5cbiAgICBzZXRDb250ZW50ICh0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGV4ZWN1dGVJblBhZ2UoYCgkey8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIChnZXRBY2U6IGFueSwgc2VsZWM6IHN0cmluZywgc3RyOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBnZXRBY2Uoc2VsZWMpLnNldFZhbHVlKHN0ciwgMSk7XG4gICAgICAgIH19KSgke3RoaXMuZ2V0QWNlfSwgJHtKU09OLnN0cmluZ2lmeShjb21wdXRlU2VsZWN0b3IodGhpcy5lbGVtKSl9LCAke0pTT04uc3RyaW5naWZ5KHRleHQpfSlgKTtcbiAgICB9XG5cbiAgICBzZXRDdXJzb3IgKGxpbmU6IG51bWJlciwgY29sdW1uOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIGV4ZWN1dGVJblBhZ2UoYCgkey8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIChnZXRBY2U6IGFueSwgc2VsZWM6IHN0cmluZywgbDogbnVtYmVyLCBjOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IGdldEFjZShzZWxlYykuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0aW9uLm1vdmVDdXJzb3JUbyhsIC0gMSwgYywgZmFsc2UpO1xuICAgICAgICB9fSkoJHt0aGlzLmdldEFjZX0sICR7SlNPTi5zdHJpbmdpZnkoY29tcHV0ZVNlbGVjdG9yKHRoaXMuZWxlbSkpfSwgJHtsaW5lfSwgJHtjb2x1bW59KWApO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgY29tcHV0ZVNlbGVjdG9yLCBleGVjdXRlSW5QYWdlIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgeyBBYnN0cmFjdEVkaXRvciB9IGZyb20gXCIuL0Fic3RyYWN0RWRpdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBDb2RlTWlycm9yRWRpdG9yIGV4dGVuZHMgQWJzdHJhY3RFZGl0b3Ige1xuXG4gICAgc3RhdGljIG1hdGNoZXMgKGU6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIGxldCBwYXJlbnQgPSBlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7ICsraSkge1xuICAgICAgICAgICAgaWYgKHBhcmVudCAhPT0gdW5kZWZpbmVkICYmIHBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmICgoL14oLiogKT9Db2RlTWlycm9yL2dpKS50ZXN0KHBhcmVudC5jbGFzc05hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlbGVtOiBIVE1MRWxlbWVudDtcbiAgICBjb25zdHJ1Y3RvciAoZTogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5lbGVtID0gZTtcbiAgICAgICAgLy8gR2V0IHRoZSB0b3Btb3N0IGFjZSBlbGVtZW50XG4gICAgICAgIGxldCBwYXJlbnQgPSB0aGlzLmVsZW0ucGFyZW50RWxlbWVudDtcbiAgICAgICAgd2hpbGUgKENvZGVNaXJyb3JFZGl0b3IubWF0Y2hlcyhwYXJlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW0gPSBwYXJlbnQ7XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENvbnRlbnQgKCkge1xuICAgICAgICByZXR1cm4gZXhlY3V0ZUluUGFnZShgKCR7LyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gKHNlbGVjOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjKSBhcyBhbnk7XG4gICAgICAgICAgICByZXR1cm4gZWxlbS5Db2RlTWlycm9yLmdldFZhbHVlKCk7XG4gICAgICAgIH19KSgke0pTT04uc3RyaW5naWZ5KGNvbXB1dGVTZWxlY3Rvcih0aGlzLmVsZW0pKX0pYCk7XG4gICAgfVxuXG4gICAgZ2V0Q3Vyc29yICgpIHtcbiAgICAgICAgcmV0dXJuIGV4ZWN1dGVJblBhZ2UoYCgkey8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIChzZWxlYzogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlYykgYXMgYW55O1xuICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSBlbGVtLkNvZGVNaXJyb3IuZ2V0Q3Vyc29yKCk7XG4gICAgICAgICAgICByZXR1cm4gW3Bvc2l0aW9uLmxpbmUgKyAxLCBwb3NpdGlvbi5jaF07XG4gICAgICAgIH19KSgke0pTT04uc3RyaW5naWZ5KGNvbXB1dGVTZWxlY3Rvcih0aGlzLmVsZW0pKX0pYCk7XG4gICAgfVxuXG4gICAgZ2V0RWxlbWVudCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW07XG4gICAgfVxuXG4gICAgZ2V0TGFuZ3VhZ2UgKCkge1xuICAgICAgICByZXR1cm4gZXhlY3V0ZUluUGFnZShgKCR7LyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gKHNlbGVjOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjKSBhcyBhbnk7XG4gICAgICAgICAgICByZXR1cm4gZWxlbS5Db2RlTWlycm9yLmdldE1vZGUoKS5uYW1lO1xuICAgICAgICB9fSkoJHtKU09OLnN0cmluZ2lmeShjb21wdXRlU2VsZWN0b3IodGhpcy5lbGVtKSl9KWApO1xuICAgIH1cblxuICAgIHNldENvbnRlbnQgKHRleHQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gZXhlY3V0ZUluUGFnZShgKCR7LyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gKHNlbGVjOiBzdHJpbmcsIHN0cjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlYykgYXMgYW55O1xuICAgICAgICAgICAgcmV0dXJuIGVsZW0uQ29kZU1pcnJvci5zZXRWYWx1ZShzdHIpO1xuICAgICAgICB9fSkoJHtKU09OLnN0cmluZ2lmeShjb21wdXRlU2VsZWN0b3IodGhpcy5lbGVtKSl9LCAke0pTT04uc3RyaW5naWZ5KHRleHQpfSlgKTtcbiAgICB9XG5cbiAgICBzZXRDdXJzb3IgKGxpbmU6IG51bWJlciwgY29sdW1uOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIGV4ZWN1dGVJblBhZ2UoYCgkey8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIChzZWxlYzogc3RyaW5nLCBsOiBudW1iZXIsIGM6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWMpIGFzIGFueTtcbiAgICAgICAgICAgIHJldHVybiBlbGVtLkNvZGVNaXJyb3IuZ2V0Q3Vyc29yKGwgLSAxLCBjKTtcbiAgICAgICAgfX0pKCR7SlNPTi5zdHJpbmdpZnkoY29tcHV0ZVNlbGVjdG9yKHRoaXMuZWxlbSkpfSwgJHtsaW5lfSwgJHtjb2x1bW59KWApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGNvbXB1dGVTZWxlY3RvciwgZXhlY3V0ZUluUGFnZSB9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuaW1wb3J0IHsgQWJzdHJhY3RFZGl0b3IgfSBmcm9tIFwiLi9BYnN0cmFjdEVkaXRvclwiO1xuXG5leHBvcnQgY2xhc3MgTW9uYWNvRWRpdG9yIGV4dGVuZHMgQWJzdHJhY3RFZGl0b3Ige1xuXG4gICAgc3RhdGljIG1hdGNoZXMgKGU6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIGxldCBwYXJlbnQgPSBlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7ICsraSkge1xuICAgICAgICAgICAgaWYgKHBhcmVudCAhPT0gdW5kZWZpbmVkICYmIHBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmICgoL21vbmFjby1lZGl0b3IvZ2kpLnRlc3QocGFyZW50LmNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGVsZW06IEhUTUxFbGVtZW50O1xuICAgIGNvbnN0cnVjdG9yIChlOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmVsZW0gPSBlO1xuICAgICAgICAvLyBGaW5kIHRoZSBtb25hY28gZWxlbWVudCB0aGF0IGhvbGRzIHRoZSBkYXRhXG4gICAgICAgIGxldCBwYXJlbnQgPSB0aGlzLmVsZW0ucGFyZW50RWxlbWVudDtcbiAgICAgICAgd2hpbGUgKCEodGhpcy5lbGVtLmNsYXNzTmFtZS5tYXRjaCgvbW9uYWNvLWVkaXRvci9naSlcbiAgICAgICAgICAgICAgICAgJiYgdGhpcy5lbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtdXJpXCIpLm1hdGNoKFwiaW5tZW1vcnk6Ly98Z2l0bGFiOlwiKSkpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbSA9IHBhcmVudDtcbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCAoKSB7XG4gICAgICAgIHJldHVybiBleGVjdXRlSW5QYWdlKGAoJHsvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyAoc2VsZWM6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWMpIGFzIGFueTtcbiAgICAgICAgICAgIGNvbnN0IHVyaSA9IGVsZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS11cmlcIik7XG4gICAgICAgICAgICBjb25zdCBtb2RlbCA9ICh3aW5kb3cgYXMgYW55KS5tb25hY28uZWRpdG9yLmdldE1vZGVsKHVyaSk7XG4gICAgICAgICAgICByZXR1cm4gbW9kZWwuZ2V0VmFsdWUoKTtcbiAgICAgICAgfX0pKCR7SlNPTi5zdHJpbmdpZnkoY29tcHV0ZVNlbGVjdG9yKHRoaXMuZWxlbSkpfSlgKTtcbiAgICB9XG5cbiAgICAvLyBJdCdzIGltcG9zc2libGUgdG8gZ2V0IE1vbmFjbydzIGN1cnNvciBwb3NpdGlvbjpcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L21vbmFjby1lZGl0b3IvaXNzdWVzLzI1OFxuICAgIGdldEN1cnNvciAoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoWzEsIDBdIGFzIFtudW1iZXIsIG51bWJlcl0pO1xuICAgIH1cblxuICAgIGdldEVsZW1lbnQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtO1xuICAgIH1cblxuICAgIGdldExhbmd1YWdlICgpIHtcbiAgICAgICAgcmV0dXJuIGV4ZWN1dGVJblBhZ2UoYCgkey8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIChzZWxlYzogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlYykgYXMgYW55O1xuICAgICAgICAgICAgY29uc3QgdXJpID0gZWxlbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXVyaVwiKTtcbiAgICAgICAgICAgIGNvbnN0IG1vZGVsID0gKHdpbmRvdyBhcyBhbnkpLm1vbmFjby5lZGl0b3IuZ2V0TW9kZWwodXJpKTtcbiAgICAgICAgICAgIHJldHVybiBtb2RlbC5nZXRNb2RlSWQoKTtcbiAgICAgICAgfX0pKCR7SlNPTi5zdHJpbmdpZnkoY29tcHV0ZVNlbGVjdG9yKHRoaXMuZWxlbSkpfSlgKTtcbiAgICB9XG5cbiAgICBzZXRDb250ZW50ICh0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGV4ZWN1dGVJblBhZ2UoYCgkey8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIChzZWxlYzogc3RyaW5nLCBzdHI6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWMpIGFzIGFueTtcbiAgICAgICAgICAgIGNvbnN0IHVyaSA9IGVsZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS11cmlcIik7XG4gICAgICAgICAgICBjb25zdCBtb2RlbCA9ICh3aW5kb3cgYXMgYW55KS5tb25hY28uZWRpdG9yLmdldE1vZGVsKHVyaSk7XG4gICAgICAgICAgICByZXR1cm4gbW9kZWwuc2V0VmFsdWUoc3RyKTtcbiAgICAgICAgfX0pKCR7SlNPTi5zdHJpbmdpZnkoY29tcHV0ZVNlbGVjdG9yKHRoaXMuZWxlbSkpfSwgJHtKU09OLnN0cmluZ2lmeSh0ZXh0KX0pYCk7XG4gICAgfVxuXG4gICAgLy8gSXQncyBpbXBvc3NpYmxlIHRvIHNldCBNb25hY28ncyBjdXJzb3IgcG9zaXRpb246XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9tb25hY28tZWRpdG9yL2lzc3Vlcy8yNThcbiAgICBzZXRDdXJzb3IgKF9saW5lOiBudW1iZXIsIF9jb2x1bW46IG51bWJlcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBBYnN0cmFjdEVkaXRvciB9IGZyb20gXCIuL0Fic3RyYWN0RWRpdG9yXCI7XG5pbXBvcnQgeyBnZXRDb25mIH0gZnJvbSBcIi4uL3V0aWxzL2NvbmZpZ3VyYXRpb25cIjtcblxuLy8gVGV4dGFyZWFFZGl0b3Igc29ydCBvZiB3b3JrcyBmb3IgY29udGVudEVkaXRhYmxlIGVsZW1lbnRzIGJ1dCB0aGVyZSBzaG91bGRcbi8vIHJlYWxseSBiZSBhIGNvbnRlbnRlZGl0YWJsZS1zcGVjaWZpYyBlZGl0b3IuXG5leHBvcnQgY2xhc3MgVGV4dGFyZWFFZGl0b3IgZXh0ZW5kcyBBYnN0cmFjdEVkaXRvciB7XG5cbiAgICBwcml2YXRlIGVsZW06IEhUTUxFbGVtZW50O1xuICAgIGNvbnN0cnVjdG9yIChlOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmVsZW0gPSBlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQgKCkge1xuICAgICAgICBpZiAoKHRoaXMuZWxlbSBhcyBhbnkpLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKHRoaXMuZWxlbSBhcyBhbnkpLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ2V0Q29uZigpLmNvbnRlbnQgPT09IFwidGV4dFwiKXtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5lbGVtLmlubmVyVGV4dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuZWxlbS5pbm5lckhUTUwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q3Vyc29yICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29udGVudCgpLnRoZW4odGV4dCA9PiB7XG4gICAgICAgICAgICBsZXQgbGluZSA9IDE7XG4gICAgICAgICAgICBsZXQgY29sdW1uID0gMDtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0ID0gKHRoaXMuZWxlbSBhcyBhbnkpLnNlbGVjdGlvblN0YXJ0ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICA/ICh0aGlzLmVsZW0gYXMgYW55KS5zZWxlY3Rpb25TdGFydFxuICAgICAgICAgICAgICAgIDogMDtcbiAgICAgICAgICAgIC8vIFNpZnQgdGhyb3VnaCB0aGUgdGV4dCwgY291bnRpbmcgY29sdW1ucyBhbmQgbmV3IGxpbmVzXG4gICAgICAgICAgICBmb3IgKGxldCBjdXJzb3IgPSAwOyBjdXJzb3IgPCBzZWxlY3Rpb25TdGFydDsgKytjdXJzb3IpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4gKz0gdGV4dC5jaGFyQ29kZUF0KGN1cnNvcikgPCAweDdGID8gMSA6IDI7XG4gICAgICAgICAgICAgICAgaWYgKHRleHRbY3Vyc29yXSA9PT0gXCJcXG5cIikge1xuICAgICAgICAgICAgICAgICAgICBsaW5lICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbiA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFtsaW5lLCBjb2x1bW5dIGFzIFtudW1iZXIsIG51bWJlcl07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEVsZW1lbnQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtO1xuICAgIH1cblxuICAgIGdldExhbmd1YWdlICgpIHtcbiAgICAgICAgaWYgKGdldENvbmYoKS5jb250ZW50ID09PSBcInRleHRcIikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgnaHRtbCcpO1xuICAgIH1cblxuICAgIHNldENvbnRlbnQgKHRleHQ6IHN0cmluZykge1xuICAgICAgICBpZiAoKHRoaXMuZWxlbSBhcyBhbnkpLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICh0aGlzLmVsZW0gYXMgYW55KS52YWx1ZSA9IHRleHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZ2V0Q29uZigpLmNvbnRlbnQgPT09IFwidGV4dFwiKXtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW0uaW5uZXJUZXh0ID0gdGV4dDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtLmlubmVySFRNTCA9IHRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIHNldEN1cnNvciAobGluZTogbnVtYmVyLCBjb2x1bW46IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDb250ZW50KCkudGhlbih0ZXh0ID0+IHtcbiAgICAgICAgICAgIGxldCBjaGFyYWN0ZXIgPSAwO1xuICAgICAgICAgICAgLy8gVHJ5IHRvIGZpbmQgdGhlIGxpbmUgdGhlIGN1cnNvciBzaG91bGQgYmUgcHV0IG9uXG4gICAgICAgICAgICB3aGlsZSAobGluZSA+IDEgJiYgY2hhcmFjdGVyIDwgdGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGV4dFtjaGFyYWN0ZXJdID09PSBcIlxcblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgLT0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUcnkgdG8gZmluZCB0aGUgY2hhcmFjdGVyIGFmdGVyIHdoaWNoIHRoZSBjdXJzb3Igc2hvdWxkIGJlIG1vdmVkXG4gICAgICAgICAgICAvLyBOb3RlOiB3ZSBkb24ndCBkbyBjb2x1bW4gPSBjb2x1bW5uICsgY2hhcmFjdGVyIGJlY2F1c2UgY29sdW1uXG4gICAgICAgICAgICAvLyBtaWdodCBiZSBsYXJnZXIgdGhhbiBhY3R1YWwgbGluZSBsZW5ndGggYW5kIGl0J3MgYmV0dGVyIHRvIGJlIG9uXG4gICAgICAgICAgICAvLyB0aGUgcmlnaHQgbGluZSBidXQgb24gdGhlIHdyb25nIGNvbHVtbiB0aGFuIG9uIHRoZSB3cm9uZyBsaW5lXG4gICAgICAgICAgICAvLyBhbmQgd3JvbmcgY29sdW1uLlxuICAgICAgICAgICAgLy8gTW9yZW92ZXIsIGNvbHVtbiBpcyBhIG51bWJlciBvZiBVVEYtOCBieXRlcyBmcm9tIHRoZSBiZWdpbm5pbmdcbiAgICAgICAgICAgIC8vIG9mIHRoZSBsaW5lIHRvIHRoZSBjdXJzb3IuIEhvd2V2ZXIsIGphdmFzY3JpcHQgdXNlcyBVVEYtMTYsXG4gICAgICAgICAgICAvLyB3aGljaCBpcyAyIGJ5dGVzIHBlciBub24tYXNjaWkgY2hhcmFjdGVyLiBTbyB3aGVuIHdlIGZpbmQgYVxuICAgICAgICAgICAgLy8gY2hhcmFjdGVyIHRoYXQgaXMgbW9yZSB0aGFuIDEgYnl0ZSBsb25nLCB3ZSBoYXZlIHRvIHJlbW92ZSB0aGF0XG4gICAgICAgICAgICAvLyBhbW91bnQgZnJvbSBjb2x1bW4sIGJ1dCBvbmx5IHR3byBjaGFyYWN0ZXJzIGZyb20gQ0hBUkFDVEVSIVxuICAgICAgICAgICAgd2hpbGUgKGNvbHVtbiA+IDAgJiYgY2hhcmFjdGVyIDwgdGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAvLyBDYW4ndCBoYXBwZW4sIGJ1dCBiZXR0ZXIgYmUgc2FmZSB0aGFuIHNvcnJ5XG4gICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICAgICAgICBpZiAodGV4dFtjaGFyYWN0ZXJdID09PSBcIlxcblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBjb2RlID0gdGV4dC5jaGFyQ29kZUF0KGNoYXJhY3Rlcik7XG4gICAgICAgICAgICAgICAgaWYgKGNvZGUgPD0gMHg3Zikge1xuICAgICAgICAgICAgICAgICAgY29sdW1uIC09IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb2RlIDw9IDB4N2ZmKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW4gLT0gMjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPj0gMHhkODAwICYmIGNvZGUgPD0gMHhkZmZmKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW4gLT0gNDsgY2hhcmFjdGVyKys7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb2RlIDwgMHhmZmZmKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW4gLT0gMztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgY29sdW1uIC09IDQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNoYXJhY3RlciArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCh0aGlzLmVsZW0gYXMgYW55KS5zZXRTZWxlY3Rpb25SYW5nZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgKHRoaXMuZWxlbSBhcyBhbnkpLnNldFNlbGVjdGlvblJhbmdlKGNoYXJhY3RlciwgY2hhcmFjdGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQWJzdHJhY3RFZGl0b3IgfSBmcm9tIFwiLi9BYnN0cmFjdEVkaXRvclwiO1xuaW1wb3J0IHsgQWNlRWRpdG9yIH0gZnJvbSBcIi4vQWNlRWRpdG9yXCI7XG5pbXBvcnQgeyBDb2RlTWlycm9yRWRpdG9yIH0gZnJvbSBcIi4vQ29kZU1pcnJvckVkaXRvclwiO1xuaW1wb3J0IHsgTW9uYWNvRWRpdG9yIH0gZnJvbSBcIi4vTW9uYWNvRWRpdG9yXCI7XG5pbXBvcnQgeyBUZXh0YXJlYUVkaXRvciB9IGZyb20gXCIuL1RleHRhcmVhRWRpdG9yXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFZGl0b3IoZWxlbTogSFRNTEVsZW1lbnQpOiBBYnN0cmFjdEVkaXRvciB7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgIGNhc2UgQWNlRWRpdG9yLm1hdGNoZXMoZWxlbSk6IHJldHVybiBuZXcgQWNlRWRpdG9yKGVsZW0pO1xuICAgICAgICBjYXNlIENvZGVNaXJyb3JFZGl0b3IubWF0Y2hlcyhlbGVtKTogcmV0dXJuIG5ldyBDb2RlTWlycm9yRWRpdG9yKGVsZW0pO1xuICAgICAgICBjYXNlIE1vbmFjb0VkaXRvci5tYXRjaGVzKGVsZW0pOiByZXR1cm4gbmV3IE1vbmFjb0VkaXRvcihlbGVtKTtcbiAgICAgICAgZGVmYXVsdDogcmV0dXJuIG5ldyBUZXh0YXJlYUVkaXRvcihlbGVtKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBnZXRDb25mIH0gZnJvbSBcIi4uL3V0aWxzL2NvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCB7IGtleXNUb0V2ZW50cyB9IGZyb20gXCIuLi91dGlscy9rZXlzXCI7XG5pbXBvcnQgeyBGaXJlbnZpbUVsZW1lbnQgfSBmcm9tIFwiLi4vRmlyZW52aW1FbGVtZW50XCI7XG5pbXBvcnQgeyBleGVjdXRlSW5QYWdlIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XG5cbmludGVyZmFjZSBJR2xvYmFsU3RhdGUge1xuICAgIGRpc2FibGVkOiBib29sZWFuIHwgUHJvbWlzZTxib29sZWFuPjtcbiAgICBsYXN0Rm9jdXNlZENvbnRlbnRTY3JpcHQ6IG51bWJlcjtcbiAgICBmaXJlbnZpbUVsZW1zOiBNYXA8bnVtYmVyLCBGaXJlbnZpbUVsZW1lbnQ+O1xuICAgIGZyYW1lSWRSZXNvbHZlOiAoXzogbnVtYmVyKSA9PiB2b2lkO1xuICAgIG52aW1pZnk6IChldnQ6IEZvY3VzRXZlbnQpID0+IHZvaWQ7XG59XG5cbmZ1bmN0aW9uIF9mb2N1c0lucHV0KGdsb2JhbDogSUdsb2JhbFN0YXRlLCBmaXJlbnZpbTogRmlyZW52aW1FbGVtZW50LCBhZGRMaXN0ZW5lcjogYm9vbGVhbikge1xuICAgIGlmIChhZGRMaXN0ZW5lcikge1xuICAgICAgICAvLyBPbmx5IHJlLWFkZCBldmVudCBsaXN0ZW5lciBpZiBpbnB1dCdzIHNlbGVjdG9yIG1hdGNoZXMgdGhlIG9uZXNcbiAgICAgICAgLy8gdGhhdCBzaG91bGQgYmUgYXV0b252aW1pZmllZFxuICAgICAgICBjb25zdCBjb25mID0gZ2V0Q29uZigpO1xuICAgICAgICBpZiAoY29uZi5zZWxlY3RvciAmJiBjb25mLnNlbGVjdG9yICE9PSBcIlwiKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjb25mLnNlbGVjdG9yKSk7XG4gICAgICAgICAgICBhZGRMaXN0ZW5lciA9IGVsZW1zLmluY2x1ZGVzKGZpcmVudmltLmdldEVsZW1lbnQoKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZmlyZW52aW0uZm9jdXNPcmlnaW5hbEVsZW1lbnQoYWRkTGlzdGVuZXIpO1xufVxuXG5mdW5jdGlvbiBnZXRGb2N1c2VkRWxlbWVudCAoZmlyZW52aW1FbGVtczogTWFwPG51bWJlciwgRmlyZW52aW1FbGVtZW50Pikge1xuICAgIHJldHVybiBBcnJheVxuICAgICAgICAuZnJvbShmaXJlbnZpbUVsZW1zLnZhbHVlcygpKVxuICAgICAgICAuZmluZChpbnN0YW5jZSA9PiBpbnN0YW5jZS5pc0ZvY3VzZWQoKSk7XG59XG5cbi8vIFRhYiBmdW5jdGlvbnMgYXJlIGZ1bmN0aW9ucyBhbGwgY29udGVudCBzY3JpcHRzIHNob3VsZCByZWFjdCB0b1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRhYkZ1bmN0aW9ucyhnbG9iYWw6IElHbG9iYWxTdGF0ZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldEFjdGl2ZUluc3RhbmNlQ291bnQgOiAoKSA9PiBnbG9iYWwuZmlyZW52aW1FbGVtcy5zaXplLFxuICAgICAgICByZWdpc3Rlck5ld0ZyYW1lSWQ6IChmcmFtZUlkOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGdsb2JhbC5mcmFtZUlkUmVzb2x2ZShmcmFtZUlkKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0RGlzYWJsZWQ6IChkaXNhYmxlZDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgZ2xvYmFsLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldExhc3RGb2N1c2VkQ29udGVudFNjcmlwdDogKGZyYW1lSWQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgZ2xvYmFsLmxhc3RGb2N1c2VkQ29udGVudFNjcmlwdCA9IGZyYW1lSWQ7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5mdW5jdGlvbiBpc1Zpc2libGUoZTogSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCByZWN0ID0gZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB2aWV3SGVpZ2h0ID0gTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICByZXR1cm4gIShyZWN0LmJvdHRvbSA8IDAgfHwgcmVjdC50b3AgLSB2aWV3SGVpZ2h0ID49IDApO1xufVxuXG4vLyBBY3RpdmVDb250ZW50IGZ1bmN0aW9ucyBhcmUgZnVuY3Rpb25zIG9ubHkgdGhlIGFjdGl2ZSBjb250ZW50IHNjcmlwdCBzaG91bGQgcmVhY3QgdG9cbmV4cG9ydCBmdW5jdGlvbiBnZXRBY3RpdmVDb250ZW50RnVuY3Rpb25zKGdsb2JhbDogSUdsb2JhbFN0YXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZm9yY2VOdmltaWZ5OiAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZWxlbSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCBpc051bGwgPSBlbGVtID09PSBudWxsIHx8IGVsZW0gPT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VOb3RFZGl0YWJsZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jb250ZW50RWRpdGFibGUgIT09IFwidHJ1ZVwiO1xuICAgICAgICAgICAgY29uc3QgYm9keU5vdEVkaXRhYmxlID0gKGRvY3VtZW50LmJvZHkuY29udGVudEVkaXRhYmxlID09PSBcImZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IChkb2N1bWVudC5ib2R5LmNvbnRlbnRFZGl0YWJsZSA9PT0gXCJpbmhlcml0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY29udGVudEVkaXRhYmxlICE9PSBcInRydWVcIikpO1xuICAgICAgICAgICAgaWYgKGlzTnVsbFxuICAgICAgICAgICAgICAgIHx8IChlbGVtID09PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgcGFnZU5vdEVkaXRhYmxlKVxuICAgICAgICAgICAgICAgIHx8IChlbGVtID09PSBkb2N1bWVudC5ib2R5ICYmIGJvZHlOb3RFZGl0YWJsZSkpIHtcbiAgICAgICAgICAgICAgICBlbGVtID0gQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRleHRhcmVhXCIpKVxuICAgICAgICAgICAgICAgICAgICAuZmluZChpc1Zpc2libGUpO1xuICAgICAgICAgICAgICAgIGlmICghZWxlbSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtID0gQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlucHV0XCIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoZSA9PiBlLnR5cGUgPT09IFwidGV4dFwiICYmIGlzVmlzaWJsZShlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghZWxlbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2xvYmFsLm52aW1pZnkoeyB0YXJnZXQ6IGVsZW0gfSBhcyBhbnkpO1xuICAgICAgICB9LFxuICAgICAgICBzZW5kS2V5OiAoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpcmVudmltID0gZ2V0Rm9jdXNlZEVsZW1lbnQoZ2xvYmFsLmZpcmVudmltRWxlbXMpO1xuICAgICAgICAgICAgaWYgKGZpcmVudmltICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBmaXJlbnZpbS5zZW5kS2V5KGtleSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEl0J3MgaW1wb3J0YW50IHRvIHRocm93IHRoaXMgZXJyb3IgYXMgdGhlIGJhY2tncm91bmQgc2NyaXB0XG4gICAgICAgICAgICAgICAgLy8gd2lsbCBleGVjdXRlIGEgZmFsbGJhY2tcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBmaXJlbnZpbSBmcmFtZSBzZWxlY3RlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmVvdmltRnJhbWVGdW5jdGlvbnMoZ2xvYmFsOiBJR2xvYmFsU3RhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBldmFsSW5QYWdlOiAoXzogbnVtYmVyLCBqczogc3RyaW5nKSA9PiBleGVjdXRlSW5QYWdlKGpzKSxcbiAgICAgICAgZm9jdXNJbnB1dDogKGZyYW1lSWQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgbGV0IGZpcmVudmltRWxlbWVudDtcbiAgICAgICAgICAgIGlmIChmcmFtZUlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBmaXJlbnZpbUVsZW1lbnQgPSBnZXRGb2N1c2VkRWxlbWVudChnbG9iYWwuZmlyZW52aW1FbGVtcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZpcmVudmltRWxlbWVudCA9IGdsb2JhbC5maXJlbnZpbUVsZW1zLmdldChmcmFtZUlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9mb2N1c0lucHV0KGdsb2JhbCwgZmlyZW52aW1FbGVtZW50LCB0cnVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgZm9jdXNQYWdlOiAoZnJhbWVJZDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaXJlbnZpbUVsZW1lbnQgPSBnbG9iYWwuZmlyZW52aW1FbGVtcy5nZXQoZnJhbWVJZCk7XG4gICAgICAgICAgICBmaXJlbnZpbUVsZW1lbnQuY2xlYXJGb2N1c0xpc3RlbmVycygpO1xuICAgICAgICAgICAgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgYW55KS5ibHVyKCk7XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0RWRpdG9ySW5mbzogKGZyYW1lSWQ6IG51bWJlcikgPT4gZ2xvYmFsXG4gICAgICAgICAgICAuZmlyZW52aW1FbGVtc1xuICAgICAgICAgICAgLmdldChmcmFtZUlkKVxuICAgICAgICAgICAgLmdldEJ1ZmZlckluZm8oKSxcbiAgICAgICAgZ2V0RWxlbWVudENvbnRlbnQ6IChmcmFtZUlkOiBudW1iZXIpID0+IGdsb2JhbFxuICAgICAgICAgICAgLmZpcmVudmltRWxlbXNcbiAgICAgICAgICAgIC5nZXQoZnJhbWVJZClcbiAgICAgICAgICAgIC5nZXRQYWdlRWxlbWVudENvbnRlbnQoKSxcbiAgICAgICAgaGlkZUVkaXRvcjogKGZyYW1lSWQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlyZW52aW0gPSBnbG9iYWwuZmlyZW52aW1FbGVtcy5nZXQoZnJhbWVJZCk7XG4gICAgICAgICAgICBmaXJlbnZpbS5oaWRlKCk7XG4gICAgICAgICAgICBfZm9jdXNJbnB1dChnbG9iYWwsIGZpcmVudmltLCB0cnVlKTtcbiAgICAgICAgfSxcbiAgICAgICAga2lsbEVkaXRvcjogKGZyYW1lSWQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlyZW52aW0gPSBnbG9iYWwuZmlyZW52aW1FbGVtcy5nZXQoZnJhbWVJZCk7XG4gICAgICAgICAgICBjb25zdCBpc0ZvY3VzZWQgPSBmaXJlbnZpbS5pc0ZvY3VzZWQoKTtcbiAgICAgICAgICAgIGZpcmVudmltLmRldGFjaEZyb21QYWdlKCk7XG4gICAgICAgICAgICBjb25zdCBjb25mID0gZ2V0Q29uZigpO1xuICAgICAgICAgICAgaWYgKGlzRm9jdXNlZCkge1xuICAgICAgICAgICAgICAgIF9mb2N1c0lucHV0KGdsb2JhbCwgZmlyZW52aW0sIGNvbmYudGFrZW92ZXIgIT09IFwib25jZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdsb2JhbC5maXJlbnZpbUVsZW1zLmRlbGV0ZShmcmFtZUlkKTtcbiAgICAgICAgfSxcbiAgICAgICAgcHJlc3NLZXlzOiAoZnJhbWVJZDogbnVtYmVyLCBrZXlzOiBzdHJpbmdbXSkgPT4ge1xuICAgICAgICAgICAgZ2xvYmFsLmZpcmVudmltRWxlbXMuZ2V0KGZyYW1lSWQpLnByZXNzS2V5cyhrZXlzVG9FdmVudHMoa2V5cykpO1xuICAgICAgICB9LFxuICAgICAgICByZXNpemVFZGl0b3I6IChmcmFtZUlkOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZ2xvYmFsLmZpcmVudmltRWxlbXMuZ2V0KGZyYW1lSWQpO1xuICAgICAgICAgICAgZWxlbS5yZXNpemVUbyh3aWR0aCwgaGVpZ2h0LCB0cnVlKTtcbiAgICAgICAgICAgIGVsZW0ucHV0RWRpdG9yQ2xvc2VUb0lucHV0T3JpZ2luQWZ0ZXJSZXNpemVGcm9tRnJhbWUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0RWxlbWVudENvbnRlbnQ6IChmcmFtZUlkOiBudW1iZXIsIHRleHQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGdsb2JhbC5maXJlbnZpbUVsZW1zLmdldChmcmFtZUlkKS5zZXRQYWdlRWxlbWVudENvbnRlbnQodGV4dCk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldEVsZW1lbnRDdXJzb3I6IChmcmFtZUlkOiBudW1iZXIsIGxpbmU6IG51bWJlciwgY29sdW1uOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBnbG9iYWwuZmlyZW52aW1FbGVtcy5nZXQoZnJhbWVJZCkuc2V0UGFnZUVsZW1lbnRDdXJzb3IobGluZSwgY29sdW1uKTtcbiAgICAgICAgfSxcbiAgICB9O1xufVxuIiwiLy8gVGhlc2UgbW9kZXMgYXJlIGRlZmluZWQgaW4gaHR0cHM6Ly9naXRodWIuY29tL25lb3ZpbS9uZW92aW0vYmxvYi9tYXN0ZXIvc3JjL252aW0vY3Vyc29yX3NoYXBlLmNcbmV4cG9ydCB0eXBlIE52aW1Nb2RlID0gXCJhbGxcIlxuICB8IFwibm9ybWFsXCJcbiAgfCBcInZpc3VhbFwiXG4gIHwgXCJpbnNlcnRcIlxuICB8IFwicmVwbGFjZVwiXG4gIHwgXCJjbWRsaW5lX25vcm1hbFwiXG4gIHwgXCJjbWRsaW5lX2luc2VydFwiXG4gIHwgXCJjbWRsaW5lX3JlcGxhY2VcIlxuICB8IFwib3BlcmF0b3JcIlxuICB8IFwidmlzdWFsX3NlbGVjdFwiXG4gIHwgXCJjbWRsaW5lX2hvdmVyXCJcbiAgfCBcInN0YXR1c2xpbmVfaG92ZXJcIlxuICB8IFwic3RhdHVzbGluZV9kcmFnXCJcbiAgfCBcInZzZXBfaG92ZXJcIlxuICB8IFwidnNlcF9kcmFnXCJcbiAgfCBcIm1vcmVcIlxuICB8IFwibW9yZV9sYXN0bGluZVwiXG4gIHwgXCJzaG93bWF0Y2hcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJU2l0ZUNvbmZpZyB7XG4gICAgY21kbGluZTogXCJuZW92aW1cIiB8IFwiZmlyZW52aW1cIjtcbiAgICBjb250ZW50OiBcImh0bWxcIiB8IFwidGV4dFwiO1xuICAgIHByaW9yaXR5OiBudW1iZXI7XG4gICAgcmVuZGVyZXI6IFwiaHRtbFwiIHwgXCJjYW52YXNcIjtcbiAgICBzZWxlY3Rvcjogc3RyaW5nO1xuICAgIHRha2VvdmVyOiBcImFsd2F5c1wiIHwgXCJvbmNlXCIgfCBcImVtcHR5XCIgfCBcIm5vbmVtcHR5XCIgfCBcIm5ldmVyXCI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZyB7XG4gICAgZ2xvYmFsU2V0dGluZ3M6IHtcbiAgICAgICAgYWx0OiBcImFscGhhbnVtXCIgfCBcImFsbFwiLFxuICAgICAgICBcIjxDLW4+XCI6IFwiZGVmYXVsdFwiIHwgXCJub29wXCIsXG4gICAgICAgIFwiPEMtdD5cIjogXCJkZWZhdWx0XCIgfCBcIm5vb3BcIixcbiAgICAgICAgXCI8Qy13PlwiOiBcImRlZmF1bHRcIiB8IFwibm9vcFwiLFxuICAgICAgICBcIjxDUy1uPlwiOiBcImRlZmF1bHRcIiB8IFwibm9vcFwiLFxuICAgICAgICBcIjxDUy10PlwiOiBcImRlZmF1bHRcIiB8IFwibm9vcFwiLFxuICAgICAgICBcIjxDUy13PlwiOiBcImRlZmF1bHRcIiB8IFwibm9vcFwiLFxuICAgICAgICBpZ25vcmVLZXlzOiB7IFtrZXkgaW4gTnZpbU1vZGVdOiBzdHJpbmdbXSB9LFxuICAgIH07XG4gICAgbG9jYWxTZXR0aW5nczogeyBba2V5OiBzdHJpbmddOiBJU2l0ZUNvbmZpZyB9O1xufVxuXG5sZXQgY29uZjogSUNvbmZpZyA9IHVuZGVmaW5lZCBhcyBJQ29uZmlnO1xuXG5leHBvcnQgY29uc3QgY29uZlJlYWR5ID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgYnJvd3Nlci5zdG9yYWdlLmxvY2FsLmdldCgpLnRoZW4oKG9iajogYW55KSA9PiB7XG4gICAgICAgIGNvbmYgPSBvYmo7XG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgfSk7XG59KTtcblxuYnJvd3Nlci5zdG9yYWdlLm9uQ2hhbmdlZC5hZGRMaXN0ZW5lcigoY2hhbmdlczogYW55KSA9PiB7XG4gICAgT2JqZWN0XG4gICAgICAgIC5lbnRyaWVzKGNoYW5nZXMpXG4gICAgICAgIC5mb3JFYWNoKChba2V5LCB2YWx1ZV06IFtrZXlvZiBJQ29uZmlnLCBhbnldKSA9PiBjb25mUmVhZHkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25mW2tleV0gPSB2YWx1ZS5uZXdWYWx1ZTtcbiAgICAgICAgfSkpO1xufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRHbG9iYWxDb25mKCkge1xuICAgIC8vIENhbid0IGJlIHRlc3RlZCBmb3JcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmIChjb25mID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZ2V0R2xvYmFsQ29uZiBjYWxsZWQgYmVmb3JlIGNvbmZpZyB3YXMgcmVhZHlcIik7XG4gICAgfVxuICAgIHJldHVybiBjb25mLmdsb2JhbFNldHRpbmdzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29uZigpIHtcbiAgICByZXR1cm4gZ2V0Q29uZkZvclVybChkb2N1bWVudC5sb2NhdGlvbi5ocmVmKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbmZGb3JVcmwodXJsOiBzdHJpbmcpOiBJU2l0ZUNvbmZpZyB7XG4gICAgY29uc3QgbG9jYWxTZXR0aW5ncyA9IGNvbmYubG9jYWxTZXR0aW5ncztcbiAgICBmdW5jdGlvbiBvcjEodmFsOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH1cbiAgICAvLyBDYW4ndCBiZSB0ZXN0ZWQgZm9yXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAobG9jYWxTZXR0aW5ncyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yOiB5b3VyIHNldHRpbmdzIGFyZSB1bmRlZmluZWQuIFRyeSByZWxvYWRpbmcgdGhlIHBhZ2UuIElmIHRoaXMgZXJyb3IgcGVyc2lzdHMsIHRyeSB0aGUgdHJvdWJsZXNob290aW5nIGd1aWRlOiBodHRwczovL2dpdGh1Yi5jb20vZ2xhY2FtYnJlL2ZpcmVudmltL2Jsb2IvbWFzdGVyL1RST1VCTEVTSE9PVElORy5tZFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIEFycmF5LmZyb20oT2JqZWN0LmVudHJpZXMobG9jYWxTZXR0aW5ncykpXG4gICAgICAgIC5maWx0ZXIoKFtwYXQsIF9dKSA9PiAobmV3IFJlZ0V4cChwYXQpKS50ZXN0KHVybCkpXG4gICAgICAgIC5zb3J0KChlMSwgZTIpID0+IChvcjEoZTFbMV0ucHJpb3JpdHkpIC0gb3IxKGUyWzFdLnByaW9yaXR5KSkpXG4gICAgICAgIC5yZWR1Y2UoKGFjYywgW18sIGN1cl0pID0+IE9iamVjdC5hc3NpZ24oYWNjLCBjdXIpLCB7fSBhcyBJU2l0ZUNvbmZpZyk7XG59XG4iLCJleHBvcnQgY29uc3Qgbm9uTGl0ZXJhbEtleXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAgIFwiIFwiOiBcIjxTcGFjZT5cIixcbiAgICBcIjxcIjogXCI8bHQ+XCIsXG4gICAgXCJBcnJvd0Rvd25cIjogXCI8RG93bj5cIixcbiAgICBcIkFycm93TGVmdFwiOiBcIjxMZWZ0PlwiLFxuICAgIFwiQXJyb3dSaWdodFwiOiBcIjxSaWdodD5cIixcbiAgICBcIkFycm93VXBcIjogXCI8VXA+XCIsXG4gICAgXCJCYWNrc3BhY2VcIjogXCI8QlM+XCIsXG4gICAgXCJEZWxldGVcIjogXCI8RGVsPlwiLFxuICAgIFwiRW5kXCI6IFwiPEVuZD5cIixcbiAgICBcIkVudGVyXCI6IFwiPENSPlwiLFxuICAgIFwiRXNjYXBlXCI6IFwiPEVzYz5cIixcbiAgICBcIkYxXCI6IFwiPEYxPlwiLFxuICAgIFwiRjEwXCI6IFwiPEYxMD5cIixcbiAgICBcIkYxMVwiOiBcIjxGMTE+XCIsXG4gICAgXCJGMTJcIjogXCI8RjEyPlwiLFxuICAgIFwiRjEzXCI6IFwiPEYxMz5cIixcbiAgICBcIkYxNFwiOiBcIjxGMTQ+XCIsXG4gICAgXCJGMTVcIjogXCI8RjE1PlwiLFxuICAgIFwiRjE2XCI6IFwiPEYxNj5cIixcbiAgICBcIkYxN1wiOiBcIjxGMTc+XCIsXG4gICAgXCJGMThcIjogXCI8RjE4PlwiLFxuICAgIFwiRjE5XCI6IFwiPEYxOT5cIixcbiAgICBcIkYyXCI6IFwiPEYyPlwiLFxuICAgIFwiRjIwXCI6IFwiPEYyMD5cIixcbiAgICBcIkYyMVwiOiBcIjxGMjE+XCIsXG4gICAgXCJGMjJcIjogXCI8RjIyPlwiLFxuICAgIFwiRjIzXCI6IFwiPEYyMz5cIixcbiAgICBcIkYyNFwiOiBcIjxGMjQ+XCIsXG4gICAgXCJGM1wiOiBcIjxGMz5cIixcbiAgICBcIkY0XCI6IFwiPEY0PlwiLFxuICAgIFwiRjVcIjogXCI8RjU+XCIsXG4gICAgXCJGNlwiOiBcIjxGNj5cIixcbiAgICBcIkY3XCI6IFwiPEY3PlwiLFxuICAgIFwiRjhcIjogXCI8Rjg+XCIsXG4gICAgXCJGOVwiOiBcIjxGOT5cIixcbiAgICBcIkhvbWVcIjogXCI8SG9tZT5cIixcbiAgICBcIlBhZ2VEb3duXCI6IFwiPFBhZ2VEb3duPlwiLFxuICAgIFwiUGFnZVVwXCI6IFwiPFBhZ2VVcD5cIixcbiAgICBcIlRhYlwiOiBcIjxUYWI+XCIsXG4gICAgXCJcXFxcXCI6IFwiPEJzbGFzaD5cIixcbiAgICBcInxcIjogXCI8QmFyPlwiLFxufTtcblxuY29uc3Qgbm9uTGl0ZXJhbFZpbUtleXMgPSBPYmplY3QuZnJvbUVudHJpZXMoT2JqZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZW50cmllcyhub25MaXRlcmFsS2V5cylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKFt4LCB5XSkgPT4gW3ksIHhdKSk7XG5cbmNvbnN0IG5vbkxpdGVyYWxLZXlDb2Rlczoge1trZXk6IHN0cmluZ106IG51bWJlcn0gPSB7XG4gICAgXCJFbnRlclwiOiAgICAgIDEzLFxuICAgIFwiU3BhY2VcIjogICAgICAzMixcbiAgICBcIlRhYlwiOiAgICAgICAgOSxcbiAgICBcIkRlbGV0ZVwiOiAgICAgNDYsXG4gICAgXCJFbmRcIjogICAgICAgIDM1LFxuICAgIFwiSG9tZVwiOiAgICAgICAzNixcbiAgICBcIkluc2VydFwiOiAgICAgNDUsXG4gICAgXCJQYWdlRG93blwiOiAgIDM0LFxuICAgIFwiUGFnZVVwXCI6ICAgICAzMyxcbiAgICBcIkFycm93RG93blwiOiAgNDAsXG4gICAgXCJBcnJvd0xlZnRcIjogIDM3LFxuICAgIFwiQXJyb3dSaWdodFwiOiAzOSxcbiAgICBcIkFycm93VXBcIjogICAgMzgsXG4gICAgXCJFc2NhcGVcIjogICAgIDI3LFxufTtcblxuLy8gR2l2ZW4gYSBcInNwZWNpYWxcIiBrZXkgcmVwcmVzZW50YXRpb24gKGUuZy4gPEVudGVyPiBvciA8TS1sPiksIHJldHVybnMgYW5cbi8vIGFycmF5IG9mIHRocmVlIGphdmFzY3JpcHQga2V5ZXZlbnRzLCB0aGUgZmlyc3Qgb25lIHJlcHJlc2VudGluZyB0aGVcbi8vIGNvcnJlc3BvbmRpbmcga2V5ZG93biwgdGhlIHNlY29uZCBvbmUgYSBrZXlwcmVzcyBhbmQgdGhlIHRoaXJkIG9uZSBhIGtleXVwXG4vLyBldmVudC5cbmZ1bmN0aW9uIG1vZEtleVRvRXZlbnRzKGs6IHN0cmluZykge1xuICAgIGxldCBtb2RzID0gXCJcIjtcbiAgICBsZXQga2V5ID0gbm9uTGl0ZXJhbFZpbUtleXNba107XG4gICAgbGV0IGN0cmxLZXkgPSBmYWxzZTtcbiAgICBsZXQgYWx0S2V5ID0gZmFsc2U7XG4gICAgbGV0IHNoaWZ0S2V5ID0gZmFsc2U7XG4gICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IGFyciA9IGsuc2xpY2UoMSwgLTEpLnNwbGl0KFwiLVwiKTtcbiAgICAgICAgbW9kcyA9IGFyclswXTtcbiAgICAgICAga2V5ID0gYXJyWzFdO1xuICAgICAgICBjdHJsS2V5ID0gL2MvaS50ZXN0KG1vZHMpO1xuICAgICAgICBhbHRLZXkgPSAvYS9pLnRlc3QobW9kcyk7XG4gICAgICAgIGNvbnN0IHNwZWNpYWxDaGFyID0gXCI8XCIgKyBrZXkgKyBcIj5cIjtcbiAgICAgICAgaWYgKG5vbkxpdGVyYWxWaW1LZXlzW3NwZWNpYWxDaGFyXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBrZXkgPSBub25MaXRlcmFsVmltS2V5c1tzcGVjaWFsQ2hhcl07XG4gICAgICAgICAgICBzaGlmdEtleSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2hpZnRLZXkgPSBrZXkgIT09IGtleS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFNvbWUgcGFnZXMgcmVseSBvbiBrZXlDb2RlcyB0byBmaWd1cmUgb3V0IHdoYXQga2V5IHdhcyBwcmVzc2VkLiBUaGlzIGlzXG4gICAgLy8gYXdmdWwgYmVjYXVzZSBrZXljb2RlcyBhcmVuJ3QgZ3VhcmFudGVlZCB0byBiZSB0aGUgc2FtZSBhY3Jyb3NzXG4gICAgLy8gYnJvd3NlcnMvT1Mva2V5Ym9hcmQgbGF5b3V0cyBidXQgdHJ5IHRvIGRvIHRoZSByaWdodCB0aGluZyBhbnl3YXkuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2dsYWNhbWJyZS9maXJlbnZpbS9pc3N1ZXMvNzIzXG4gICAgbGV0IGtleUNvZGUgPSAwO1xuICAgIGlmICgvXlthLXpBLVowLTldJC8udGVzdChrZXkpKSB7XG4gICAgICAgIGtleUNvZGUgPSBrZXkuY2hhckNvZGVBdCgwKTtcbiAgICB9IGVsc2UgaWYgKG5vbkxpdGVyYWxLZXlDb2Rlc1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAga2V5Q29kZSA9IG5vbkxpdGVyYWxLZXlDb2Rlc1trZXldO1xuICAgIH1cbiAgICBjb25zdCBpbml0ID0geyBrZXksIGtleUNvZGUsIGN0cmxLZXksIGFsdEtleSwgc2hpZnRLZXksIGJ1YmJsZXM6IHRydWUgfTtcbiAgICByZXR1cm4gW1xuICAgICAgICBuZXcgS2V5Ym9hcmRFdmVudChcImtleWRvd25cIiwgaW5pdCksXG4gICAgICAgIG5ldyBLZXlib2FyZEV2ZW50KFwia2V5cHJlc3NcIiwgaW5pdCksXG4gICAgICAgIG5ldyBLZXlib2FyZEV2ZW50KFwia2V5dXBcIiwgaW5pdCksXG4gICAgXTtcbn1cblxuLy8gR2l2ZW4gYSBcInNpbXBsZVwiIGtleSAoZS5nLiBgYWAsIGAxYOKApiksIHJldHVybnMgYW4gYXJyYXkgb2YgdGhyZWUgamF2YXNjcmlwdFxuLy8gZXZlbnRzIHJlcHJlc2VudGluZyB0aGUgYWN0aW9uIG9mIHByZXNzaW5nIHRoZSBrZXkuXG5mdW5jdGlvbiBrZXlUb0V2ZW50cyhrZXk6IHN0cmluZykge1xuICAgIGNvbnN0IHNoaWZ0S2V5ID0ga2V5ICE9PSBrZXkudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICByZXR1cm4gW1xuICAgICAgICBuZXcgS2V5Ym9hcmRFdmVudChcImtleWRvd25cIiwgIHsga2V5LCBzaGlmdEtleSwgYnViYmxlczogdHJ1ZSB9KSxcbiAgICAgICAgbmV3IEtleWJvYXJkRXZlbnQoXCJrZXlwcmVzc1wiLCB7IGtleSwgc2hpZnRLZXksIGJ1YmJsZXM6IHRydWUgfSksXG4gICAgICAgIG5ldyBLZXlib2FyZEV2ZW50KFwia2V5dXBcIiwgICAgeyBrZXksIHNoaWZ0S2V5LCBidWJibGVzOiB0cnVlIH0pLFxuICAgIF07XG59XG5cbi8vIEdpdmVuIGFuIGFycmF5IG9mIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBrZXlzIChlLmcuIFtcImFcIiwgXCI8RW50ZXI+XCIsIOKApl0pLFxuLy8gcmV0dXJucyBhbiBhcnJheSBvZiBqYXZhc2NyaXB0IGtleWJvYXJkIGV2ZW50cyB0aGF0IHNpbXVsYXRlIHRoZXNlIGtleXNcbi8vIGJlaW5nIHByZXNzZWQuXG5leHBvcnQgZnVuY3Rpb24ga2V5c1RvRXZlbnRzKGtleXM6IHN0cmluZ1tdKSB7XG4gICAgLy8gQ29kZSB0byBzcGxpdCBtb2Qga2V5cyBhbmQgbm9uLW1vZCBrZXlzOlxuICAgIC8vIGNvbnN0IGtleXMgPSBzdHIubWF0Y2goLyhbPD5dW148Pl0rWzw+XSl8KFtePD5dKykvZylcbiAgICAvLyBpZiAoa2V5cyA9PT0gbnVsbCkge1xuICAgIC8vICAgICByZXR1cm4gW107XG4gICAgLy8gfVxuICAgIHJldHVybiBrZXlzLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgIGlmIChrZXlbMF0gPT09IFwiPFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9kS2V5VG9FdmVudHMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ga2V5VG9FdmVudHMoa2V5KTtcbiAgICB9KS5mbGF0KCk7XG59XG5cbi8vIFR1cm5zIGEgbm9uLWxpdGVyYWwga2V5IChlLmcuIFwiRW50ZXJcIikgaW50byBhIHZpbS1lcXVpdmFsZW50IFwiPEVudGVyPlwiXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlS2V5KGtleTogc3RyaW5nKSB7XG4gICAgaWYgKG5vbkxpdGVyYWxLZXlzW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbm9uTGl0ZXJhbEtleXNba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIGtleTtcbn1cblxuLy8gQWRkIG1vZGlmaWVyIGBtb2RgIChgQWAsIGBDYCwgYFNg4oCmKSB0byBgdGV4dGAgKGEgdmltIGtleSBgYmAsIGA8RW50ZXI+YCxcbi8vIGA8Q1MteD5g4oCmKVxuZXhwb3J0IGZ1bmN0aW9uIGFkZE1vZGlmaWVyKG1vZDogc3RyaW5nLCB0ZXh0OiBzdHJpbmcpIHtcbiAgICBsZXQgbWF0Y2g7XG4gICAgbGV0IG1vZGlmaWVycyA9IFwiXCI7XG4gICAgbGV0IGtleSA9IFwiXCI7XG4gICAgaWYgKChtYXRjaCA9IHRleHQubWF0Y2goL148KFtBLVpdezEsNX0pLSguKyk+JC8pKSkge1xuICAgICAgICBtb2RpZmllcnMgPSBtYXRjaFsxXTtcbiAgICAgICAga2V5ID0gbWF0Y2hbMl07XG4gICAgfSBlbHNlIGlmICgobWF0Y2ggPSB0ZXh0Lm1hdGNoKC9ePCguKyk+JC8pKSkge1xuICAgICAgICBrZXkgPSBtYXRjaFsxXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBrZXkgPSB0ZXh0O1xuICAgIH1cbiAgICByZXR1cm4gXCI8XCIgKyBtb2QgKyBtb2RpZmllcnMgKyBcIi1cIiArIGtleSArIFwiPlwiO1xufVxuIiwibGV0IGN1ckhvc3QgPSBcImZpcmVmb3hcIjtcblxuLy8gQ2FuJ3QgZ2V0IGNvdmVyYWdlIGZvciB0aHVuZGVyYmlyZC5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5pZiAoKGJyb3dzZXIgYXMgYW55KS5jb21wb3NlU2NyaXB0cyAhPT0gdW5kZWZpbmVkIHx8IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPT09IFwiYWJvdXQ6Ymxhbms/Y29tcG9zZVwiKSB7XG4gICAgY3VySG9zdCA9IFwidGh1bmRlcmJpcmRcIjtcbi8vIENocm9tZSBkb2Vzbid0IGhhdmUgYSBcImJyb3dzZXJcIiBvYmplY3QsIGluc3RlYWQgaXQgdXNlcyBcImNocm9tZVwiLlxufSBlbHNlIGlmICh3aW5kb3cuYnJvd3NlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY3VySG9zdCA9IFwiY2hyb21lXCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Nocm9tZSgpIHtcbiAgICByZXR1cm4gY3VySG9zdCA9PT0gXCJjaHJvbWVcIjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1RodW5kZXJiaXJkKCkge1xuICAgIHJldHVybiBjdXJIb3N0ID09PSBcInRodW5kZXJiaXJkXCI7XG59XG5cbi8vIFJ1bnMgQ09ERSBpbiB0aGUgcGFnZSdzIGNvbnRleHQgYnkgc2V0dGluZyB1cCBhIGN1c3RvbSBldmVudCBsaXN0ZW5lcixcbi8vIGVtYmVkZGluZyBhIHNjcmlwdCBlbGVtZW50IHRoYXQgcnVucyB0aGUgcGllY2Ugb2YgY29kZSBhbmQgZW1pdHMgaXRzIHJlc3VsdFxuLy8gYXMgYW4gZXZlbnQuXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZUluUGFnZShjb2RlOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgIGNvbnN0IGV2ZW50SWQgPSAobmV3IFVSTChicm93c2VyLnJ1bnRpbWUuZ2V0VVJMKFwiXCIpKSkuaG9zdG5hbWUgKyBNYXRoLnJhbmRvbSgpO1xuICAgICAgICBzY3JpcHQuaW5uZXJIVE1MID0gYChhc3luYyAoZXZJZCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0ICR7Y29kZX07XG4gICAgICAgICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KGV2SWQsIHtcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChldklkLCB7XG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDogeyBzdWNjZXNzOiBmYWxzZSwgcmVhc29uOiBlIH0sXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSgke0pTT04uc3RyaW5naWZ5KGV2ZW50SWQpfSlgO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudElkLCAoeyBkZXRhaWwgfTogYW55KSA9PiB7XG4gICAgICAgICAgICBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgICAgICAgICAgaWYgKGRldGFpbC5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoZGV0YWlsLnJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGRldGFpbC5yZWFzb24pO1xuICAgICAgICB9LCB7IG9uY2U6IHRydWUgfSk7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICB9KTtcbn1cblxuLy8gVmFyaW91cyBmaWx0ZXJzIHRoYXQgYXJlIHVzZWQgdG8gY2hhbmdlIHRoZSBhcHBlYXJhbmNlIG9mIHRoZSBCcm93c2VyQWN0aW9uXG4vLyBpY29uLlxuY29uc3Qgc3ZncGF0aCA9IFwiZmlyZW52aW0uc3ZnXCI7XG5jb25zdCB0cmFuc2Zvcm1hdGlvbnMgPSB7XG4gICAgZGlzYWJsZWQ6IChpbWc6IFVpbnQ4Q2xhbXBlZEFycmF5KSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1nLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgICAgICAvLyBTa2lwIHRyYW5zcGFyZW50IHBpeGVsc1xuICAgICAgICAgICAgaWYgKGltZ1tpICsgM10gPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG1lYW4gPSBNYXRoLmZsb29yKChpbWdbaV0gKyBpbWdbaSArIDFdICsgaW1nW2kgKyAyXSkgLyAzKTtcbiAgICAgICAgICAgIGltZ1tpXSA9IG1lYW47XG4gICAgICAgICAgICBpbWdbaSArIDFdID0gbWVhbjtcbiAgICAgICAgICAgIGltZ1tpICsgMl0gPSBtZWFuO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBlcnJvcjogKGltZzogVWludDhDbGFtcGVkQXJyYXkpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWcubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgICAgIC8vIFR1cm4gdHJhbnNwYXJlbnQgcGl4ZWxzIHJlZFxuICAgICAgICAgICAgaWYgKGltZ1tpICsgM10gPT09IDApIHtcbiAgICAgICAgICAgICAgICBpbWdbaV0gPSAyNTU7XG4gICAgICAgICAgICAgICAgaW1nW2kgKyAzXSA9IDI1NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgbm9ybWFsOiAoKF9pbWc6IFVpbnQ4Q2xhbXBlZEFycmF5KSA9PiAodW5kZWZpbmVkIGFzIG5ldmVyKSksXG4gICAgbm90aWZpY2F0aW9uOiAoaW1nOiBVaW50OENsYW1wZWRBcnJheSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltZy5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICAgICAgLy8gVHVybiB0cmFuc3BhcmVudCBwaXhlbHMgeWVsbG93XG4gICAgICAgICAgICBpZiAoaW1nW2kgKyAzXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGltZ1tpXSA9IDI1NTtcbiAgICAgICAgICAgICAgICBpbWdbaSArIDFdID0gMjU1O1xuICAgICAgICAgICAgICAgIGltZ1tpICsgM10gPSAyNTU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxufTtcblxuZXhwb3J0IHR5cGUgSWNvbktpbmQgPSBrZXlvZiB0eXBlb2YgdHJhbnNmb3JtYXRpb25zO1xuXG4vLyBUYWtlcyBhbiBpY29uIGtpbmQgYW5kIGRpbWVuc2lvbnMgYXMgcGFyYW1ldGVyLCBkcmF3cyB0aGF0IHRvIGEgY2FudmFzIGFuZFxuLy8gcmV0dXJucyBhIHByb21pc2UgdGhhdCB3aWxsIGJlIHJlc29sdmVkIHdpdGggdGhlIGNhbnZhcycgaW1hZ2UgZGF0YS5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJY29uSW1hZ2VEYXRhKGtpbmQ6IEljb25LaW5kLCB3aWR0aCA9IDMyLCBoZWlnaHQgPSAzMikge1xuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2Uod2lkdGgsIGhlaWdodCk7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IGltZy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgY29uc3QgaWQgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0cmFuc2Zvcm1hdGlvbnNba2luZF0oaWQuZGF0YSk7XG4gICAgICAgIHJlc29sdmUoaWQpO1xuICAgIH0pKTtcbiAgICBpbWcuc3JjID0gc3ZncGF0aDtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBHaXZlbiBhIHVybCBhbmQgYSBzZWxlY3RvciwgdHJpZXMgdG8gY29tcHV0ZSBhIG5hbWUgdGhhdCB3aWxsIGJlIHVuaXF1ZSxcbi8vIHNob3J0IGFuZCByZWFkYWJsZSBmb3IgdGhlIHVzZXIuXG5leHBvcnQgZnVuY3Rpb24gdG9GaWxlTmFtZSh1cmw6IHN0cmluZywgaWQ6IHN0cmluZywgbGFuZ3VhZ2U6IHN0cmluZykge1xuICAgIGxldCBwYXJzZWRVUkw7XG4gICAgdHJ5IHtcbiAgICAgICAgcGFyc2VkVVJMID0gbmV3IFVSTCh1cmwpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gT25seSBoYXBwZW5zIHdpdGggdGh1bmRlcmJpcmQsIHdoZXJlIHdlIGNhbid0IGdldCBjb3ZlcmFnZVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBwYXJzZWRVUkwgPSB7IGhvc3RuYW1lOiAndGh1bmRlcmJpcmQnLCBwYXRobmFtZTogJ21haWwnIH07XG4gICAgfVxuICAgIGNvbnN0IHNob3J0SWQgPSBpZC5yZXBsYWNlKC86bnRoLW9mLXR5cGUvZywgXCJcIik7XG4gICAgY29uc3QgdG9BbHBoYU51bSA9IChzdHI6IHN0cmluZykgPT4gKHN0ci5tYXRjaCgvW2EtekEtWjAtOV0rL2cpIHx8IFtdKVxuICAgICAgICAuam9pbihcIi1cIilcbiAgICAgICAgLnNsaWNlKC0zMik7XG4gICAgY29uc3QgZXh0ID0gbGFuZ3VhZ2VUb0V4dGVuc2lvbnMobGFuZ3VhZ2UpO1xuICAgIHJldHVybiBgJHtwYXJzZWRVUkwuaG9zdG5hbWV9XyR7dG9BbHBoYU51bShwYXJzZWRVUkwucGF0aG5hbWUpfV8ke3RvQWxwaGFOdW0oc2hvcnRJZCl9LiR7ZXh0fWA7XG59XG5cbi8vIEdpdmVuIGEgbGFuZ3VhZ2UgbmFtZSwgcmV0dXJucyBhIGZpbGVuYW1lIGV4dGVuc2lvbi4gQ2FuIHJldHVybiB1bmRlZmluZWQuXG5leHBvcnQgZnVuY3Rpb24gbGFuZ3VhZ2VUb0V4dGVuc2lvbnMobGFuZ3VhZ2U6IHN0cmluZykge1xuICAgIGlmIChsYW5ndWFnZSA9PT0gdW5kZWZpbmVkIHx8IGxhbmd1YWdlID09PSBudWxsKSB7XG4gICAgICAgIGxhbmd1YWdlID0gXCJcIjtcbiAgICB9XG4gICAgY29uc3QgbGFuZyA9IGxhbmd1YWdlLnRvTG93ZXJDYXNlKCk7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBzd2l0Y2ggKGxhbmcpIHtcbiAgICAgICAgY2FzZSBcImFwbFwiOiAgICAgICAgICAgICAgcmV0dXJuIFwiYXBsXCI7XG4gICAgICAgIGNhc2UgXCJicmFpbmZ1Y2tcIjogICAgICAgIHJldHVybiBcImJmXCI7XG4gICAgICAgIGNhc2UgXCJjXCI6ICAgICAgICAgICAgICAgIHJldHVybiBcImNcIjtcbiAgICAgICAgY2FzZSBcImMjXCI6ICAgICAgICAgICAgICAgcmV0dXJuIFwiY3NcIjtcbiAgICAgICAgY2FzZSBcImMrK1wiOiAgICAgICAgICAgICAgcmV0dXJuIFwiY3BwXCI7XG4gICAgICAgIGNhc2UgXCJjZXlsb25cIjogICAgICAgICAgIHJldHVybiBcImNleWxvblwiO1xuICAgICAgICBjYXNlIFwiY2xpa2VcIjogICAgICAgICAgICByZXR1cm4gXCJjXCI7XG4gICAgICAgIGNhc2UgXCJjbG9qdXJlXCI6ICAgICAgICAgIHJldHVybiBcImNsalwiO1xuICAgICAgICBjYXNlIFwiY21ha2VcIjogICAgICAgICAgICByZXR1cm4gXCIuY21ha2VcIjtcbiAgICAgICAgY2FzZSBcImNvYm9sXCI6ICAgICAgICAgICAgcmV0dXJuIFwiY2JsXCI7XG4gICAgICAgIGNhc2UgXCJjb2ZmZWVzY3JpcHRcIjogICAgIHJldHVybiBcImNvZmZlZVwiO1xuICAgICAgICBjYXNlIFwiY29tbW9ubGlzcFwiOiAgICAgIHJldHVybiBcImxpc3BcIjtcbiAgICAgICAgY2FzZSBcImNyeXN0YWxcIjogICAgICAgICAgcmV0dXJuIFwiY3JcIjtcbiAgICAgICAgY2FzZSBcImNzc1wiOiAgICAgICAgICAgICAgcmV0dXJuIFwiY3NzXCI7XG4gICAgICAgIGNhc2UgXCJjeXRob25cIjogICAgICAgICAgIHJldHVybiBcInB5XCI7XG4gICAgICAgIGNhc2UgXCJkXCI6ICAgICAgICAgICAgICAgIHJldHVybiBcImRcIjtcbiAgICAgICAgY2FzZSBcImRhcnRcIjogICAgICAgICAgICAgcmV0dXJuIFwiZGFydFwiO1xuICAgICAgICBjYXNlIFwiZGlmZlwiOiAgICAgICAgICAgICByZXR1cm4gXCJkaWZmXCI7XG4gICAgICAgIGNhc2UgXCJkb2NrZXJmaWxlXCI6ICAgICAgIHJldHVybiBcImRvY2tlcmZpbGVcIjtcbiAgICAgICAgY2FzZSBcImR0ZFwiOiAgICAgICAgICAgICAgcmV0dXJuIFwiZHRkXCI7XG4gICAgICAgIGNhc2UgXCJkeWxhblwiOiAgICAgICAgICAgIHJldHVybiBcImR5bGFuXCI7XG4gICAgICAgIC8vIEVpZmZlbCB3YXMgdGhlcmUgZmlyc3QgYnV0IGVsaXhpciBzZWVtcyBtb3JlIGxpa2VseVxuICAgICAgICAvLyBjYXNlIFwiZWlmZmVsXCI6ICAgICAgICAgICByZXR1cm4gXCJlXCI7XG4gICAgICAgIGNhc2UgXCJlbGl4aXJcIjogICAgICAgICAgIHJldHVybiBcImVcIjtcbiAgICAgICAgY2FzZSBcImVsbVwiOiAgICAgICAgICAgICAgcmV0dXJuIFwiZWxtXCI7XG4gICAgICAgIGNhc2UgXCJlcmxhbmdcIjogICAgICAgICAgIHJldHVybiBcImVybFwiO1xuICAgICAgICBjYXNlIFwiZiNcIjogICAgICAgICAgICAgICByZXR1cm4gXCJmc1wiO1xuICAgICAgICBjYXNlIFwiZmFjdG9yXCI6ICAgICAgICAgICByZXR1cm4gXCJmYWN0b3JcIjtcbiAgICAgICAgY2FzZSBcImZvcnRoXCI6ICAgICAgICAgICAgcmV0dXJuIFwiZnRoXCI7XG4gICAgICAgIGNhc2UgXCJmb3J0cmFuXCI6ICAgICAgICAgIHJldHVybiBcImY5MFwiO1xuICAgICAgICBjYXNlIFwiZ2FzXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJhc21cIjtcbiAgICAgICAgY2FzZSBcImdvXCI6ICAgICAgICAgICAgICAgcmV0dXJuIFwiZ29cIjtcbiAgICAgICAgLy8gR0ZNOiBDb2RlTWlycm9yJ3MgZ2l0aHViLWZsYXZvcmVkIG1hcmtkb3duXG4gICAgICAgIGNhc2UgXCJnZm1cIjogICAgICAgICAgICAgIHJldHVybiBcIm1kXCI7XG4gICAgICAgIGNhc2UgXCJncm9vdnlcIjogICAgICAgICAgIHJldHVybiBcImdyb292eVwiO1xuICAgICAgICBjYXNlIFwiaGFtbFwiOiAgICAgICAgICAgICByZXR1cm4gXCJoYW1sXCI7XG4gICAgICAgIGNhc2UgXCJoYW5kbGViYXJzXCI6ICAgICAgIHJldHVybiBcImhic1wiO1xuICAgICAgICBjYXNlIFwiaGFza2VsbFwiOiAgICAgICAgICByZXR1cm4gXCJoc1wiO1xuICAgICAgICBjYXNlIFwiaGF4ZVwiOiAgICAgICAgICAgICByZXR1cm4gXCJoeFwiO1xuICAgICAgICBjYXNlIFwiaHRtbFwiOiAgICAgICAgICAgICByZXR1cm4gXCJodG1sXCI7XG4gICAgICAgIGNhc2UgXCJodG1sZW1iZWRkZWRcIjogICAgIHJldHVybiBcImh0bWxcIjtcbiAgICAgICAgY2FzZSBcImh0bWxtaXhlZFwiOiAgICAgICAgcmV0dXJuIFwiaHRtbFwiO1xuICAgICAgICBjYXNlIFwiamF2YVwiOiAgICAgICAgICAgICByZXR1cm4gXCJqYXZhXCI7XG4gICAgICAgIGNhc2UgXCJqYXZhc2NyaXB0XCI6ICAgICAgIHJldHVybiBcImpzXCI7XG4gICAgICAgIGNhc2UgXCJqaW5qYTJcIjogICAgICAgICAgIHJldHVybiBcImppbmphXCI7XG4gICAgICAgIGNhc2UgXCJqdWxpYVwiOiAgICAgICAgICAgIHJldHVybiBcImpsXCI7XG4gICAgICAgIGNhc2UgXCJqc3hcIjogICAgICAgICAgICAgIHJldHVybiBcImpzeFwiO1xuICAgICAgICBjYXNlIFwia290bGluXCI6ICAgICAgICAgICByZXR1cm4gXCJrdFwiO1xuICAgICAgICBjYXNlIFwibGF0ZXhcIjogICAgICAgICAgICByZXR1cm4gXCJsYXRleFwiO1xuICAgICAgICBjYXNlIFwibGVzc1wiOiAgICAgICAgICAgICByZXR1cm4gXCJsZXNzXCI7XG4gICAgICAgIGNhc2UgXCJsdWFcIjogICAgICAgICAgICAgIHJldHVybiBcImx1YVwiO1xuICAgICAgICBjYXNlIFwibWFya2Rvd25cIjogICAgICAgICByZXR1cm4gXCJtZFwiO1xuICAgICAgICBjYXNlIFwibWxsaWtlXCI6ICAgICAgICAgICAgcmV0dXJuIFwibWxcIjtcbiAgICAgICAgY2FzZSBcIm9jYW1sXCI6ICAgICAgICAgICAgcmV0dXJuIFwibWxcIjtcbiAgICAgICAgY2FzZSBcIm9jdGF2ZVwiOiAgICAgICAgICAgcmV0dXJuIFwibVwiO1xuICAgICAgICBjYXNlIFwicGFzY2FsXCI6ICAgICAgICAgICByZXR1cm4gXCJwYXNcIjtcbiAgICAgICAgY2FzZSBcInBlcmxcIjogICAgICAgICAgICAgcmV0dXJuIFwicGxcIjtcbiAgICAgICAgY2FzZSBcInBocFwiOiAgICAgICAgICAgICAgcmV0dXJuIFwicGhwXCI7XG4gICAgICAgIGNhc2UgXCJwb3dlcnNoZWxsXCI6ICAgICAgIHJldHVybiBcInBzMVwiO1xuICAgICAgICBjYXNlIFwicHl0aG9uXCI6ICAgICAgICAgICByZXR1cm4gXCJweVwiO1xuICAgICAgICBjYXNlIFwiclwiOiAgICAgICAgICAgICAgICByZXR1cm4gXCJyXCI7XG4gICAgICAgIGNhc2UgXCJyc3RcIjogICAgICAgICAgICAgIHJldHVybiBcInJzdFwiO1xuICAgICAgICBjYXNlIFwicnVieVwiOiAgICAgICAgICAgICByZXR1cm4gXCJydWJ5XCI7XG4gICAgICAgIGNhc2UgXCJydXN0XCI6ICAgICAgICAgICAgIHJldHVybiBcInJzXCI7XG4gICAgICAgIGNhc2UgXCJzYXNcIjogICAgICAgICAgICAgIHJldHVybiBcInNhc1wiO1xuICAgICAgICBjYXNlIFwic2Fzc1wiOiAgICAgICAgICAgICByZXR1cm4gXCJzYXNzXCI7XG4gICAgICAgIGNhc2UgXCJzY2FsYVwiOiAgICAgICAgICAgIHJldHVybiBcInNjYWxhXCI7XG4gICAgICAgIGNhc2UgXCJzY2hlbWVcIjogICAgICAgICAgIHJldHVybiBcInNjbVwiO1xuICAgICAgICBjYXNlIFwic2Nzc1wiOiAgICAgICAgICAgICByZXR1cm4gXCJzY3NzXCI7XG4gICAgICAgIGNhc2UgXCJzbWFsbHRhbGtcIjogICAgICAgIHJldHVybiBcInN0XCI7XG4gICAgICAgIGNhc2UgXCJzaGVsbFwiOiAgICAgICAgICAgIHJldHVybiBcInNoXCI7XG4gICAgICAgIGNhc2UgXCJzcWxcIjogICAgICAgICAgICAgIHJldHVybiBcInNxbFwiO1xuICAgICAgICBjYXNlIFwic3RleFwiOiAgICAgICAgICAgICByZXR1cm4gXCJsYXRleFwiO1xuICAgICAgICBjYXNlIFwic3dpZnRcIjogICAgICAgICAgICByZXR1cm4gXCJzd2lmdFwiO1xuICAgICAgICBjYXNlIFwidGNsXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJ0Y2xcIjtcbiAgICAgICAgY2FzZSBcInRvbWxcIjogICAgICAgICAgICAgcmV0dXJuIFwidG9tbFwiO1xuICAgICAgICBjYXNlIFwidHdpZ1wiOiAgICAgICAgICAgICByZXR1cm4gXCJ0d2lnXCI7XG4gICAgICAgIGNhc2UgXCJ0eXBlc2NyaXB0XCI6ICAgICAgIHJldHVybiBcInRzXCI7XG4gICAgICAgIGNhc2UgXCJ2YlwiOiAgICAgICAgICAgICAgIHJldHVybiBcInZiXCI7XG4gICAgICAgIGNhc2UgXCJ2YnNjcmlwdFwiOiAgICAgICAgIHJldHVybiBcInZic1wiO1xuICAgICAgICBjYXNlIFwidmVyaWxvZ1wiOiAgICAgICAgICByZXR1cm4gXCJzdlwiO1xuICAgICAgICBjYXNlIFwidmhkbFwiOiAgICAgICAgICAgICByZXR1cm4gXCJ2aGRsXCI7XG4gICAgICAgIGNhc2UgXCJ4bWxcIjogICAgICAgICAgICAgIHJldHVybiBcInhtbFwiO1xuICAgICAgICBjYXNlIFwieWFtbFwiOiAgICAgICAgICAgICByZXR1cm4gXCJ5YW1sXCI7XG4gICAgICAgIGNhc2UgXCJ6ODBcIjogICAgICAgICAgICAgIHJldHVybiBcIno4YVwiO1xuICAgIH1cbiAgICByZXR1cm4gXCJ0eHRcIjtcbn1cblxuLy8gTWFrZSB0c2xpbnQgaGFwcHlcbmNvbnN0IGZvbnRGYW1pbHkgPSBcImZvbnQtZmFtaWx5XCI7XG5cbi8vIFBhcnNlcyBhIGd1aWZvbnQgZGVjbGFyYXRpb24gYXMgZGVzY3JpYmVkIGluIGA6aCBFMjQ0YFxuLy8gZGVmYXVsdHM6IGRlZmF1bHQgdmFsdWUgZm9yIGVhY2ggb2YuXG4vLyBDYW4ndCBiZSB0ZXN0ZWQgZTJlIDovXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlR3VpZm9udChndWlmb250OiBzdHJpbmcsIGRlZmF1bHRzOiBhbnkpIHtcbiAgICBjb25zdCBvcHRpb25zID0gZ3VpZm9udC5zcGxpdChcIjpcIik7XG4gICAgY29uc3QgcmVzdWx0ID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMpO1xuICAgIGlmICgvXlthLXpBLVowLTldKyQvLnRlc3Qob3B0aW9uc1swXSkpIHtcbiAgICAgICAgcmVzdWx0W2ZvbnRGYW1pbHldID0gb3B0aW9uc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHRbZm9udEZhbWlseV0gPSBKU09OLnN0cmluZ2lmeShvcHRpb25zWzBdKTtcbiAgICB9XG4gICAgaWYgKGRlZmF1bHRzW2ZvbnRGYW1pbHldKSB7XG4gICAgICAgIHJlc3VsdFtmb250RmFtaWx5XSArPSBgLCAke2RlZmF1bHRzW2ZvbnRGYW1pbHldfWA7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zLnNsaWNlKDEpLnJlZHVjZSgoYWNjLCBvcHRpb24pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAob3B0aW9uWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImhcIjpcbiAgICAgICAgICAgICAgICAgICAgYWNjW1wiZm9udC1zaXplXCJdID0gYCR7b3B0aW9uLnNsaWNlKDEpfXB0YDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImJcIjpcbiAgICAgICAgICAgICAgICAgICAgYWNjW1wiZm9udC13ZWlnaHRcIl0gPSBcImJvbGRcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImlcIjpcbiAgICAgICAgICAgICAgICAgICAgYWNjW1wiZm9udC1zdHlsZVwiXSA9IFwiaXRhbGljXCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ1XCI6XG4gICAgICAgICAgICAgICAgICAgIGFjY1tcInRleHQtZGVjb3JhdGlvblwiXSA9IFwidW5kZXJsaW5lXCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJzXCI6XG4gICAgICAgICAgICAgICAgICAgIGFjY1tcInRleHQtZGVjb3JhdGlvblwiXSA9IFwibGluZS10aHJvdWdoXCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ3XCI6IC8vIENhbid0IHNldCBmb250IHdpZHRoLiBXb3VsZCBoYXZlIHRvIGFkanVzdCBjZWxsIHdpZHRoLlxuICAgICAgICAgICAgICAgIGNhc2UgXCJjXCI6IC8vIENhbid0IHNldCBjaGFyYWN0ZXIgc2V0XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwgcmVzdWx0IGFzIGFueSk7XG59XG5cbi8vIENvbXB1dGVzIGEgdW5pcXVlIHNlbGVjdG9yIGZvciBpdHMgYXJndW1lbnQuXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZVNlbGVjdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgZnVuY3Rpb24gdW5pcXVlU2VsZWN0b3IoZTogSFRNTEVsZW1lbnQpOiBzdHJpbmcge1xuICAgICAgICAvLyBPbmx5IG1hdGNoaW5nIGFscGhhbnVtZXJpYyBzZWxlY3RvcnMgYmVjYXVzZSBvdGhlcnMgY2hhcnMgbWlnaHQgaGF2ZSBzcGVjaWFsIG1lYW5pbmcgaW4gQ1NTXG4gICAgICAgIGlmIChlLmlkICYmIGUuaWQubWF0Y2goXCJeW2EtekEtWjAtOV8tXSskXCIpKSB7XG4gICAgICAgICAgICBjb25zdCBpZCA9IGUudGFnTmFtZSArIGBbaWQ9XCIke2UuaWR9XCJdYDtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGlkKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgd2UgcmVhY2hlZCB0aGUgdG9wIG9mIHRoZSBkb2N1bWVudFxuICAgICAgICBpZiAoIWUucGFyZW50RWxlbWVudCkgeyByZXR1cm4gXCJIVE1MXCI7IH1cbiAgICAgICAgLy8gQ29tcHV0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIGVsZW1lbnRcbiAgICAgICAgY29uc3QgaW5kZXggPVxuICAgICAgICAgICAgQXJyYXkuZnJvbShlLnBhcmVudEVsZW1lbnQuY2hpbGRyZW4pXG4gICAgICAgICAgICAgICAgLmZpbHRlcihjaGlsZCA9PiBjaGlsZC50YWdOYW1lID09PSBlLnRhZ05hbWUpXG4gICAgICAgICAgICAgICAgLmluZGV4T2YoZSkgKyAxO1xuICAgICAgICByZXR1cm4gYCR7dW5pcXVlU2VsZWN0b3IoZS5wYXJlbnRFbGVtZW50KX0gPiAke2UudGFnTmFtZX06bnRoLW9mLXR5cGUoJHtpbmRleH0pYDtcbiAgICB9XG4gICAgcmV0dXJuIHVuaXF1ZVNlbGVjdG9yKGVsZW1lbnQpO1xufVxuXG4vLyBUdXJucyBhIG51bWJlciBpbnRvIGl0cyBoYXNoKzYgbnVtYmVyIGhleGFkZWNpbWFsIHJlcHJlc2VudGF0aW9uLlxuZXhwb3J0IGZ1bmN0aW9uIHRvSGV4Q3NzKG46IG51bWJlcikge1xuICAgIGlmIChuID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3Qgc3RyID0gbi50b1N0cmluZygxNik7XG4gICAgLy8gUGFkIHdpdGggbGVhZGluZyB6ZXJvc1xuICAgIHJldHVybiBcIiNcIiArIChuZXcgQXJyYXkoNiAtIHN0ci5sZW5ndGgpKS5maWxsKFwiMFwiKS5qb2luKFwiXCIpICsgc3RyO1xufVxuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGF1dG9maWxsIH0gZnJvbSBcIi4vYXV0b2ZpbGxcIjtcbmltcG9ydCB7IGNvbmZSZWFkeSwgZ2V0Q29uZiB9IGZyb20gXCIuL3V0aWxzL2NvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCB7IGZpcmVudmltR2xvYmFsLCBhY3RpdmVGdW5jdGlvbnMgfSBmcm9tIFwiLi9jb21tb25cIjtcblxuaWYgKGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPT09IFwiaHR0cHM6Ly9naXRodWIuY29tL2dsYWNhbWJyZS9maXJlbnZpbS9pc3N1ZXMvbmV3XCJcbiAgICB8fCBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCA9PT0gXCJmaWxlOlwiICYmIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYuZW5kc1dpdGgoXCJnaXRodWIuaHRtbFwiKSkge1xuICAgIGFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGF1dG9maWxsKTtcbn1cblxuZnVuY3Rpb24gc2V0dXBMaXN0ZW5lcnMoc2VsZWN0b3I6IHN0cmluZykge1xuICAgIGZ1bmN0aW9uIG9uU2Nyb2xsKGNvbnQ6IGJvb2xlYW4pIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwb3NDaGFuZ2VkID0gQXJyYXkuZnJvbShmaXJlbnZpbUdsb2JhbC5maXJlbnZpbUVsZW1zLmVudHJpZXMoKSlcbiAgICAgICAgICAgICAgICAubWFwKChbXywgZWxlbV0pID0+IGVsZW0ucHV0RWRpdG9yQ2xvc2VUb0lucHV0T3JpZ2luKCkpXG4gICAgICAgICAgICAgICAgLmZpbmQoY2hhbmdlZCA9PiBjaGFuZ2VkLnBvc0NoYW5nZWQpO1xuICAgICAgICAgICAgaWYgKHBvc0NoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBBcyBsb25nIGFzIG9uZSBlZGl0b3IgY2hhbmdlcyBwb3NpdGlvbiwgdHJ5IHRvIHJlc2l6ZVxuICAgICAgICAgICAgICAgIG9uU2Nyb2xsKHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjb250KSB7XG4gICAgICAgICAgICAgICAgLy8gTm8gZWRpdG9yIGhhcyBtb3ZlZCwgYnV0IHRoaXMgbWlnaHQgYmUgYmVjYXVzZSB0aGUgd2Vic2l0ZVxuICAgICAgICAgICAgICAgIC8vIGltcGxlbWVudHMgc29tZSBraW5kIG9mIHNtb290aCBzY3JvbGxpbmcgdGhhdCBkb2Vzbid0IG1ha2VcbiAgICAgICAgICAgICAgICAvLyB0aGUgdGV4dGFyZWEgbW92ZSBpbW1lZGlhdGVseS4gSW4gb3JkZXIgdG8gZGVhbCB3aXRoIHRoZXNlXG4gICAgICAgICAgICAgICAgLy8gY2FzZXMsIHNjaGVkdWxlIGEgbGFzdCByZWRyYXcgaW4gYSBmZXcgbWlsbGlzZWNvbmRzXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBvblNjcm9sbChmYWxzZSksIDEwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkb1Njcm9sbCgpIHtcbiAgICAgICAgcmV0dXJuIG9uU2Nyb2xsKHRydWUpO1xuICAgIH1cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBkb1Njcm9sbCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ3aGVlbFwiLCBkb1Njcm9sbCk7XG4gICAgKG5ldyAoKHdpbmRvdyBhcyBhbnkpLlJlc2l6ZU9ic2VydmVyKSgoXzogYW55W10pID0+IHtcbiAgICAgICAgb25TY3JvbGwodHJ1ZSk7XG4gICAgfSkpLm9ic2VydmUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KTtcblxuICAgIGZ1bmN0aW9uIGFkZE52aW1MaXN0ZW5lcihlbGVtOiBFbGVtZW50KSB7XG4gICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIGZpcmVudmltR2xvYmFsLm52aW1pZnkpO1xuICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBmaXJlbnZpbUdsb2JhbC5udmltaWZ5KTtcbiAgICAgICAgbGV0IHBhcmVudCA9IGVsZW0ucGFyZW50RWxlbWVudDtcbiAgICAgICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgICAgICAgcGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZG9TY3JvbGwpO1xuICAgICAgICAgICAgcGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZG9TY3JvbGwpO1xuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAobmV3IE11dGF0aW9uT2JzZXJ2ZXIoKGNoYW5nZXMsIF8pID0+IHtcbiAgICAgICAgaWYgKGNoYW5nZXMuZmlsdGVyKGNoYW5nZSA9PiBjaGFuZ2UuYWRkZWROb2Rlcy5sZW5ndGggPiAwKS5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoaXMgbXV0YXRpb24gb2JzZXJ2ZXIgaXMgdHJpZ2dlcmVkIGV2ZXJ5IHRpbWUgYW4gZWxlbWVudCBpc1xuICAgICAgICAvLyBhZGRlZC9yZW1vdmVkIGZyb20gdGhlIHBhZ2UuIFdoZW4gdGhpcyBoYXBwZW5zLCB0cnkgdG8gYXBwbHlcbiAgICAgICAgLy8gbGlzdGVuZXJzIGFnYWluLCBpbiBjYXNlIGEgbmV3IHRleHRhcmVhL2lucHV0IGZpZWxkIGhhcyBiZWVuIGFkZGVkLlxuICAgICAgICBjb25zdCB0b1Bvc3NpYmx5TnZpbWlmeSA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICAgICAgICB0b1Bvc3NpYmx5TnZpbWlmeS5mb3JFYWNoKGVsZW0gPT4gYWRkTnZpbUxpc3RlbmVyKGVsZW0pKTtcblxuICAgICAgICBjb25zdCB0YWtlb3ZlciA9IGdldENvbmYoKS50YWtlb3ZlcjtcbiAgICAgICAgZnVuY3Rpb24gc2hvdWxkTnZpbWlmeShub2RlOiBhbnkpIHtcbiAgICAgICAgICAgIC8vIElkZWFsbHksIHRoZSB0YWtlb3ZlciAhPT0gXCJuZXZlclwiIGNoZWNrIHNob3VsZG4ndCBiZSBwZXJmb3JtZWRcbiAgICAgICAgICAgIC8vIGhlcmU6IGl0IHNob3VsZCBsaXZlIGluIG52aW1pZnkoKS4gSG93ZXZlciwgbnZpbWlmeSgpIG9ubHlcbiAgICAgICAgICAgIC8vIGNoZWNrcyBmb3IgdGFrZW92ZXIgPT09IFwibmV2ZXJcIiBpZiBpdCBpcyBjYWxsZWQgZnJvbSBhbiBldmVudFxuICAgICAgICAgICAgLy8gaGFuZGxlciAodGhpcyBpcyBuZWNlc3NhcnkgaW4gb3JkZXIgdG8gYWxsb3cgbWFudWFsbHkgbnZpbWlmeWluZ1xuICAgICAgICAgICAgLy8gZWxlbWVudHMpLiBUaHVzLCB3ZSBuZWVkIHRvIGNoZWNrIGlmIHRha2VvdmVyICE9PSBcIm5ldmVyXCIgaGVyZVxuICAgICAgICAgICAgLy8gdG9vLlxuICAgICAgICAgICAgcmV0dXJuIHRha2VvdmVyICE9PSBcIm5ldmVyXCJcbiAgICAgICAgICAgICAgICAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBub2RlXG4gICAgICAgICAgICAgICAgJiYgdG9Qb3NzaWJseU52aW1pZnkuaW5jbHVkZXMobm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBhbHNvIG5lZWQgdG8gY2hlY2sgaWYgdGhlIGN1cnJlbnRseSBmb2N1c2VkIGVsZW1lbnQgaXMgYW1vbmcgdGhlXG4gICAgICAgIC8vIG5ld2x5IGNyZWF0ZWQgZWxlbWVudHMgYW5kIGlmIGl0IGlzLCBudmltaWZ5IGl0LlxuICAgICAgICAvLyBOb3RlIHRoYXQgd2UgY2FuJ3QgZG8gdGhpcyB1bmNvbmRpdGlvbmFsbHk6IHdlIHdvdWxkIHR1cm4gdGhlIGFjdGl2ZVxuICAgICAgICAvLyBlbGVtZW50IGludG8gYSBuZW92aW0gZnJhbWUgZXZlbiBmb3IgdW5yZWxhdGVkIGRvbSBjaGFuZ2VzLlxuICAgICAgICBmb3IgKGNvbnN0IG1yIG9mIGNoYW5nZXMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiBtci5hZGRlZE5vZGVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNob3VsZE52aW1pZnkobm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlRnVuY3Rpb25zLmZvcmNlTnZpbWlmeSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIobm9kZSwgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQpO1xuICAgICAgICAgICAgICAgIHdoaWxlICh3YWxrZXIubmV4dE5vZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2hvdWxkTnZpbWlmeSh3YWxrZXIuY3VycmVudE5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVGdW5jdGlvbnMuZm9yY2VOdmltaWZ5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KSkub2JzZXJ2ZSh3aW5kb3cuZG9jdW1lbnQsIHsgc3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlIH0pO1xuXG4gICAgbGV0IGVsZW1lbnRzOiBIVE1MRWxlbWVudFtdO1xuICAgIHRyeSB7XG4gICAgICAgIGVsZW1lbnRzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAgIGFsZXJ0KGBGaXJlbnZpbSBlcnJvcjogaW52YWxpZCBDU1Mgc2VsZWN0b3IgKCR7c2VsZWN0b3J9KSBpbiB5b3VyIGc6ZmlyZW52aW1fY29uZmlnLmApO1xuICAgICAgICBlbGVtZW50cyA9IFtdO1xuICAgIH1cbiAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW0gPT4gYWRkTnZpbUxpc3RlbmVyKGVsZW0pKTtcbn1cblxuZXhwb3J0IGNvbnN0IGxpc3RlbmVyc1NldHVwID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgY29uZlJlYWR5LnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zdCBjb25mOiB7IHNlbGVjdG9yOiBzdHJpbmcgfSA9IGdldENvbmYoKTtcbiAgICAgICAgaWYgKGNvbmYuc2VsZWN0b3IgIT09IHVuZGVmaW5lZCAmJiBjb25mLnNlbGVjdG9yICE9PSBcIlwiKSB7XG4gICAgICAgICAgICBzZXR1cExpc3RlbmVycyhjb25mLnNlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=