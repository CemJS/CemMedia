var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/deep-observer/src/deep-observer.js
var require_deep_observer = __commonJS({
  "node_modules/deep-observer/src/deep-observer.js"(exports, module) {
    (function() {
      "use strict";
      const OBSERVED = {};
      const OBSERVED_WS = /* @__PURE__ */ new WeakSet();
      const isObjLiteralOrArray = function(_obj) {
        var _test = _obj;
        return typeof _obj !== "object" || _obj === null ? false : function() {
          if (Array.isArray(_obj))
            return true;
          while (true) {
            if (Object.getPrototypeOf(_test = Object.getPrototypeOf(_test)) === null) {
              break;
            }
          }
          return Object.getPrototypeOf(_obj) === _test;
        }();
      };
      const createObserver = function(value, callback, keyPath, config, CONSTRUCTION_STAGE, CURRENT_DEPTH) {
        let result;
        let constructionCallbacks = [];
        if (OBSERVED_WS.has(value)) {
          result = value;
        } else {
          let _target = Array.isArray(value) ? [] : {};
          let ProxyObject = new Proxy(_target, {
            set: function(target, property, value2) {
              let oldValue = target[property];
              let action = target.hasOwnProperty(property) ? "update" : "add";
              if (config.ignoreSameValueReassign && action === "update" && oldValue === value2)
                return true;
              if (isObjLiteralOrArray(value2) && (!config.depth || CURRENT_DEPTH < config.depth)) {
                let newObserver = createObserver(value2, callback, keyPath + "." + property, config, true, CURRENT_DEPTH + 1);
                constructionCallbacks = constructionCallbacks.concat(newObserver.callbacks);
                target[property] = newObserver.observer;
              } else {
                target[property] = value2;
              }
              if (!CONSTRUCTION_STAGE) {
                callback({ action, keyPath: keyPath + "." + property, object: target, name: property, oldValue });
                if (constructionCallbacks.length)
                  constructionCallbacks.forEach((i) => callback(i));
                constructionCallbacks.splice(0);
              } else if (CONSTRUCTION_STAGE && config.observeConstruction) {
                constructionCallbacks.push({ action, keyPath: keyPath + "." + property, object: target, name: property, oldValue });
              }
              return true;
            },
            deleteProperty(target, property) {
              let oldValue = target[property];
              delete target[property];
              callback({ action: "delete", keyPath: keyPath + "." + property, object: target, name: property, oldValue });
              return true;
            },
            get: function(target, property) {
              return target[property];
            }
          });
          ProxyObject = Object.assign(ProxyObject, value);
          OBSERVED_WS.add(ProxyObject);
          result = ProxyObject;
        }
        CONSTRUCTION_STAGE = false;
        return { observer: result, callbacks: constructionCallbacks.splice(0) };
      };
      const Observer2 = function(object = {}, callback = new Function(), _config = {}) {
        if (typeof _config !== "object")
          throw new Error("Third argument (config) must be an object");
        const config = {
          id: _config.id || "OBSERVED-" + Math.floor(Math.random() * Date.now()),
          observeConstruction: !_config.observeConstruction ? false : true,
          depth: Number(_config.depth) > 0 ? Number(_config.depth) : 0,
          ignoreSameValueReassign: _config.ignoreSameValueReassign ? true : false
          // batchNotifications : false
        };
        if (arguments.length > 1) {
          if (!(this instanceof Observer2))
            throw new Error("Constructor Observer requires 'new'");
          if (!isObjLiteralOrArray(object))
            throw new Error("First argument must be an Object or an Array");
          if (typeof callback !== "function")
            throw new Error("Second argument (callback) must be a function.");
          let newObserver = createObserver(object, callback, config.id, config, true, 0);
          OBSERVED[config.id] = newObserver.observer;
          newObserver.callbacks.forEach((i) => callback(i));
        } else {
          config.id = object;
        }
        return OBSERVED[config.id];
      };
      Observer2._enumerate_ = function() {
        return OBSERVED;
      };
      if (typeof module !== "undefined" && module.exports)
        module.exports = Observer2;
      else
        window.Observer = Observer2;
    })();
  }
});

// node_modules/cemjs-core/libs/jsx.js
var Cemjsx = (tag, data, ...children) => {
  children = children.filter((item) => !checkNofing(item));
  let joinchildren = [];
  let tmp = "";
  children.forEach((item) => {
    if (typeof item == "object") {
      if (tmp != "") {
        joinchildren.push(tmp);
        tmp = "";
      }
      if (Array.isArray(item)) {
        joinchildren.push(...item);
      } else {
        joinchildren.push(item);
      }
    } else {
      tmp += item.toString();
    }
  });
  if (tmp != "") {
    joinchildren.push(tmp);
  }
  return { tag, data, children: joinchildren };
};
var checkNofing = function(data) {
  if (!data && typeof data != "number" || data === true) {
    return true;
  }
  return false;
};

// node_modules/cemjs-core/libs/front.js
var import_deep_observer = __toESM(require_deep_observer(), 1);
var Front_ = class {
  constructor() {
    this.Static = new import_deep_observer.default(Static, (e) => {
      let keys = e.keyPath.split(".");
      let newVal = e.object;
      let oldVal = e.oldValue;
      let isChange = true;
      let typ = "Loader/clear";
      let logArr = [`Front: ${this.name}`];
      if (this.$el) {
        typ = "Action";
        logArr.push(`Action: ${e.action}`);
      } else {
        logArr.push(`Loader/clear: ${e.action}`);
      }
      try {
        newVal = e.object[e.name];
        if (typeof newVal == "object" && typeof oldVal == "object") {
          if (JSON.stringify(newVal) == JSON.stringify(oldVal)) {
            isChange = false;
          }
        } else {
          if (newVal == oldVal) {
            isChange = false;
          }
        }
      } catch (error) {
      }
      logArr.push(`Key =>: ${keys[1]}`);
      if (isChange) {
        logArr.push("\nOld:", oldVal);
        logArr.push("\nNew:", newVal);
      }
      if (this.degubStatic) {
        Fn.log(...logArr);
      }
      if (this.$el) {
        if (!this.InitIgnore.includes(keys[1]) && isChange) {
          if (this.InitAll.includes(keys[1])) {
            this.Fn.initAll.bind(this)();
          } else {
            this.Fn.init.bind(this)();
          }
        } else {
          if (this.degubStatic) {
            console.log(`Ignore Init key`, keys[1], "isChange", isChange);
          }
        }
      }
    });
    this.Variable = {};
    this.Ref = {};
    this.func = {};
    this.Fn = {};
    this.Services = {};
    this.Events = {};
    this.listener = {};
    this._ListsEventListener = [];
    this._ListsEventSource = [];
    this._ListsInit = [];
    this._ListsVisible = [];
    this._ListsOn = {};
    this.degubStatic = false;
    this.InitIgnore = [];
    this.InitAll = [];
  }
};
var front = new Front_();
var Static = front.Static;
var Events2 = front.Events;
var Ref = front.Ref;
var Func = front.func;
var Fn = {};
Fn.init = async function(index) {
  return await front.Fn.init.bind(front)(index);
};
Fn.initOne = async function(name, data, ifOpen = null) {
  return await front.Fn.initOne.bind(front)(name, data, ifOpen);
};
Fn.initAll = async function() {
  return await front.Fn.initAll.bind(front)();
};
Fn.link = async function(e) {
  return await front.Fn.link.bind(front)(e);
};
Fn.linkChange = async function(link, data = {}) {
  return await front.Fn.linkChange.bind(front)(link, data);
};
Fn.initAuto = async function(keys, fn) {
  return await front.Fn.initAuto.bind(front)(keys, fn);
};
Fn.clearData = async function() {
  return await front.Fn.clearData.bind(front)();
};
Fn.event = async function(url, Listener) {
  return await front.Fn.event.bind(front)(url, Listener);
};
Fn.log = async function(...params) {
  let newlog = [];
  for (let item of params) {
    try {
      newlog.push(JSON.parse(JSON.stringify(item)));
    } catch (error) {
      newlog.push(item);
    }
  }
  console.log(...newlog);
  return;
};

// assets/svg/inst.svg
var inst_default = 'data:image/svg+xml,<svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">%0D%0A<path d="M12.7326 16.0618C14.0293 16.0618 15.2728 15.5702 16.1896 14.695C17.1065 13.8198 17.6215 12.6329 17.6215 11.3952C17.6215 10.1575 17.1065 8.97052 16.1896 8.09535C15.2728 7.22018 14.0293 6.72852 12.7326 6.72852C11.436 6.72852 10.1925 7.22018 9.27567 8.09535C8.35883 8.97052 7.84375 10.1575 7.84375 11.3952C7.84375 12.6329 8.35883 13.8198 9.27567 14.695C10.1925 15.5702 11.436 16.0618 12.7326 16.0618Z" stroke="black" stroke-width="1.64025" stroke-linecap="round" stroke-linejoin="round"/>%0D%0A<path d="M1.73438 16.0612V6.72786C1.73438 5.18077 2.37822 3.69704 3.52428 2.60307C4.67033 1.50911 6.22472 0.894531 7.84549 0.894531H17.6233C19.244 0.894531 20.7984 1.50911 21.9445 2.60307C23.0905 3.69704 23.7344 5.18077 23.7344 6.72786V16.0612C23.7344 17.6083 23.0905 19.092 21.9445 20.186C20.7984 21.2799 19.244 21.8945 17.6233 21.8945H7.84549C6.22472 21.8945 4.67033 21.2799 3.52428 20.186C2.37822 19.092 1.73438 17.6083 1.73438 16.0612Z" stroke="black" stroke-width="1.64025"/>%0D%0A<path d="M19.4609 4.99039L19.4735 4.97656" stroke="black" stroke-width="1.64025" stroke-linecap="round" stroke-linejoin="round"/>%0D%0A</svg>%0D%0A';

// assets/svg/telegram.svg
var telegram_default = 'data:image/svg+xml,<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">%0D%0A<path d="M8.54161 12.0873L12.0631 18.3682C12.4947 19.138 13.6311 19.0439 13.9302 18.2136L19.6713 2.27542C19.9667 1.45548 19.1734 0.662234 18.3535 0.957587L2.41527 6.69873C1.58506 6.99778 1.49095 8.13431 2.26066 8.56579L8.54161 12.0873ZM8.54161 12.0873L10.8556 9.77332" stroke="black" stroke-width="1.64025" stroke-linecap="round"/>%0D%0A</svg>%0D%0A';

// assets/svg/logo.svg
var logo_default = 'data:image/svg+xml,<svg width="173" height="89" viewBox="0 0 173 89" fill="none" xmlns="http://www.w3.org/2000/svg">%0D%0A<path d="M145.03 8.01064C146.084 8.01064 146.938 7.15612 146.938 6.102C146.938 5.04789 146.084 4.19336 145.03 4.19336C143.976 4.19336 143.121 5.04789 143.121 6.102C143.121 7.15612 143.976 8.01064 145.03 8.01064Z" fill="black"/>%0D%0A<path d="M135.557 0V12.7321C133.66 11.0792 131.26 10.1168 128.747 10.0013C126.234 9.8858 123.755 10.6241 121.715 12.096C119.674 13.568 118.192 15.687 117.509 18.1084C116.825 20.5298 116.982 23.1111 117.952 25.4325C118.922 27.7539 120.649 29.6787 122.852 30.894C125.055 32.1092 127.604 32.5433 130.085 32.1257C132.566 31.7081 134.833 30.4633 136.517 28.5938C138.201 26.7244 139.202 24.3402 139.359 21.8292H139.382V0H135.557ZM128.233 28.7383C126.784 28.7383 125.368 28.3087 124.164 27.5039C122.959 26.6991 122.021 25.5552 121.466 24.2169C120.912 22.8786 120.767 21.4059 121.05 19.9852C121.332 18.5644 122.03 17.2594 123.054 16.2351C124.078 15.2107 125.383 14.5132 126.804 14.2306C128.225 13.948 129.698 14.093 131.036 14.6473C132.374 15.2017 133.518 16.1405 134.323 17.3449C135.128 18.5494 135.557 19.9655 135.557 21.4141C135.556 23.3562 134.784 25.2186 133.411 26.5919C132.038 27.9653 130.175 28.7373 128.233 28.7383Z" fill="black"/>%0D%0A<path d="M172.978 21.2098C172.978 19.0046 172.324 16.849 171.099 15.0158C169.873 13.1825 168.131 11.754 166.094 10.911C164.056 10.068 161.814 9.84842 159.651 10.28C157.489 10.7117 155.503 11.7751 153.945 13.3357C152.387 14.8964 151.327 16.8841 150.899 19.0474C150.471 21.2106 150.695 23.4522 151.541 25.4885C152.388 27.5247 153.82 29.264 155.655 30.4863C157.49 31.7087 159.647 32.3591 161.852 32.3552H172.998V21.2098H172.978ZM161.852 28.8056C160.404 28.8056 158.988 28.3761 157.783 27.5713C156.579 26.7665 155.64 25.6226 155.086 24.2842C154.531 22.9459 154.386 21.4733 154.669 20.0525C154.951 18.6317 155.649 17.3267 156.673 16.3024C157.698 15.2781 159.003 14.5805 160.423 14.2979C161.844 14.0153 163.317 14.1603 164.655 14.7147C165.993 15.269 167.137 16.2078 167.942 17.4123C168.747 18.6167 169.177 20.0328 169.177 21.4814C169.177 23.4239 168.405 25.2868 167.031 26.6604C165.658 28.0339 163.795 28.8056 161.852 28.8056Z" fill="%23F2582F"/>%0D%0A<path d="M146.942 9.99609H143.121V32.2869H146.942V9.99609Z" fill="black"/>%0D%0A<path d="M113.19 22.7961C113.265 22.2706 113.303 21.7403 113.303 21.2095C113.3 18.4261 112.254 15.7448 110.372 13.694C108.49 11.6431 105.909 10.3716 103.136 10.13C100.363 9.88829 97.5999 10.694 95.3915 12.3884C93.1832 14.0827 91.6897 16.5427 91.2052 19.2836C90.7207 22.0246 91.2804 24.8475 92.774 27.1962C94.2676 29.545 96.5868 31.249 99.2745 31.9726C101.962 32.6962 104.824 32.3869 107.294 31.1055C109.765 29.8241 111.667 27.6637 112.624 25.05H108.554C107.819 26.3673 106.695 27.4255 105.336 28.08C103.977 28.7345 102.449 28.9534 100.961 28.7067C99.4729 28.4601 98.0972 27.76 97.0219 26.7021C95.9466 25.6442 95.2242 24.2801 94.9533 22.7961H113.186H113.19ZM95.2753 18.975C95.7906 17.5633 96.7273 16.3442 97.9587 15.4828C99.1901 14.6214 100.656 14.1594 102.159 14.1594C103.662 14.1594 105.128 14.6214 106.36 15.4828C107.591 16.3442 108.528 17.5633 109.043 18.975H95.2753Z" fill="black"/>%0D%0A<path d="M86.3612 14.8279C85.6916 13.4782 84.6737 12.3319 83.4128 11.5072C81.6729 10.3662 79.5723 9.90969 77.5158 10.2256C75.4593 10.5415 73.5925 11.6074 72.2752 13.218C71.1733 11.8743 69.6833 10.9039 68.0089 10.4393C66.3344 9.97471 64.5574 10.0387 62.9207 10.6224C61.284 11.2062 59.8676 12.2813 58.8652 13.7007C57.8627 15.12 57.3232 16.8144 57.3203 18.5521V32.2734H61.1415V22.3927C61.1415 19.1068 60.5906 13.9512 65.7579 13.9512C69.4045 13.9512 70.2036 16.5232 70.3549 19.1922V32.0484V32.2889H74.1839V19.1883C74.339 16.5232 75.1343 13.9512 78.7809 13.9512C83.9482 13.9512 83.4012 19.1068 83.4012 22.3927V32.2889H87.2185V18.5521C87.2216 17.2614 86.9283 15.9873 86.3612 14.8279Z" fill="black"/>%0D%0A<path d="M161.843 25.5014C164.207 25.5014 166.123 23.5849 166.123 21.2209C166.123 18.8569 164.207 16.9404 161.843 16.9404C159.479 16.9404 157.562 18.8569 157.562 21.2209C157.562 23.5849 159.479 25.5014 161.843 25.5014Z" fill="%23F2582F"/>%0D%0A<path fill-rule="evenodd" clip-rule="evenodd" d="M80.3172 40.0255C74.2893 39.4988 68.2828 41.249 63.4814 44.9314C58.6801 48.6137 55.4322 53.961 54.378 59.9193C53.3238 65.8776 54.5398 72.0147 57.7862 77.1209C61.0325 82.2272 66.0739 85.9321 71.9166 87.5056C77.7592 89.0791 83.9794 88.4069 89.351 85.6215C94.7227 82.8362 98.8562 78.1398 100.937 72.4579L101.357 71.31H91.0916L90.8471 71.7473C89.3914 74.3506 87.1679 76.4414 84.48 77.7344C81.7922 79.0274 78.7708 79.4596 75.8283 78.972C72.8857 78.4844 70.1652 77.1008 68.0381 75.01C66.157 73.1611 64.821 70.8388 64.1648 68.2975H102.06L102.165 67.5644C102.328 66.4231 102.411 65.2717 102.412 64.1188V64.117C102.408 58.0661 100.137 52.2366 96.0468 47.7772C91.9569 43.3179 86.345 40.5523 80.3172 40.0255ZM69.8964 52.8463C72.3322 51.1489 75.2298 50.2388 78.1988 50.2388C81.1677 50.2388 84.0654 51.1489 86.5012 52.8463C88.595 54.3054 90.2611 56.286 91.3406 58.5824H65.057C66.1365 56.286 67.8026 54.3054 69.8964 52.8463Z" fill="%23FF972C"/>%0D%0A<path fill-rule="evenodd" clip-rule="evenodd" d="M156.542 40.1766C153.461 39.8242 150.342 40.2512 147.47 41.4186C144.91 42.4588 142.62 44.057 140.764 46.0918C138.424 43.5288 135.405 41.6702 132.047 40.7383C128.364 39.716 124.455 39.8591 120.857 41.148C117.258 42.4369 114.147 44.8084 111.951 47.9366C109.754 51.0646 108.58 54.7957 108.59 58.6176V88.2174H118.305V66.6289C118.305 66.0231 118.297 65.3971 118.289 64.7584L118.289 64.7583C118.249 61.6631 118.206 58.2712 119.052 55.4486C119.553 53.7781 120.348 52.3861 121.585 51.4065C122.816 50.4316 124.573 49.7955 127.132 49.7955C130.724 49.7955 132.767 51.0417 133.996 52.8195C135.267 54.6594 135.757 57.1963 135.919 59.9455V87.7219H135.953V88.2174H145.668V59.9399C145.829 57.194 146.321 54.6583 147.593 52.8191C148.822 51.0416 150.866 49.7955 154.455 49.7955C157.013 49.7955 158.77 50.4325 160.001 51.4086C161.238 52.3895 162.033 53.7831 162.534 55.4549C163.381 58.2795 163.337 61.6722 163.298 64.7627V64.7629C163.289 65.4003 163.281 66.0249 163.281 66.6289V88.2174H172.996L172.996 58.6166L172.996 58.6141C172.988 55.761 172.321 52.9483 171.046 50.3959C169.678 47.6145 167.633 45.2212 165.099 43.4357C162.565 41.6497 159.622 40.529 156.542 40.1766Z" fill="%23297FF1"/>%0D%0A<path fill-rule="evenodd" clip-rule="evenodd" d="M38.1009 43.6065C33.2899 40.3003 27.446 38.8444 21.6461 39.5071C15.8463 40.1698 10.4814 42.9065 6.54017 47.2127C2.59893 51.519 0.34694 57.1046 0.199168 62.9403C0.0513963 68.776 2.01783 74.4684 5.73608 78.9686C9.45432 83.4688 14.6738 86.4735 20.4326 87.4289C26.1915 88.3843 32.1016 87.2261 37.0739 84.1676C42.0461 81.1092 45.7453 76.3566 47.4899 70.7859L47.8374 69.6764H37.7841L37.5557 70.1745C36.1746 73.1861 33.8052 75.6348 30.8407 77.1143C27.8763 78.5938 24.495 79.0151 21.2581 78.3083C18.0213 77.6015 15.1234 75.8091 13.0456 73.2285C10.9677 70.6479 9.8347 67.4344 9.8347 64.1212C9.8347 60.8081 10.9677 57.5946 13.0456 55.014C15.1234 52.4334 18.0213 50.641 21.2581 49.9342C24.495 49.2274 27.8763 49.6487 30.8407 51.1282C33.8052 52.6077 36.1746 55.0564 37.5557 58.068L37.7841 58.5661H48.1023L47.8264 57.4982C46.366 51.8463 42.912 46.9126 38.1009 43.6065Z" fill="%2387C200"/>%0D%0A</svg>%0D%0A';

// frontends/header/display/Main.tsx
function Main_default() {
  return /* @__PURE__ */ Cemjsx("header", { class: "mx-auto p-[70px_20px_11px_20px] xl:container" }, /* @__PURE__ */ Cemjsx("div", { class: "flex justify-between gap-[10px]" }, /* @__PURE__ */ Cemjsx("div", { class: "flex gap-[19px] pb-[8px]" }, /* @__PURE__ */ Cemjsx("img", { class: "cursor-pointer self-end", src: telegram_default, alt: "Telegram" }), /* @__PURE__ */ Cemjsx("img", { class: "cursor-pointer self-end", src: inst_default, alt: "Instagram" })), /* @__PURE__ */ Cemjsx("img", { src: logo_default, alt: "Cem Media" })));
}

// frontends/header/navigation.tsx
function navigation_default() {
  return /* @__PURE__ */ Cemjsx(Main_default, null);
}

// frontends/header/index.tsx
front.listener.finish = () => {
  return;
};
front.func.test = () => {
  return;
};
front.loader = () => {
  return;
};
front.display = () => {
  return /* @__PURE__ */ Cemjsx(navigation_default, null);
};
export {
  front
};
