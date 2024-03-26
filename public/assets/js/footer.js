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

// assets/svg/platform.svg
var platform_default = 'data:image/svg+xml,<svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path d="M9.36678 0C9.56748 0 9.73016 0.16269 9.73016 0.363381C9.73016 0.531829 9.6144 0.678194 9.45048 0.716992L7.04762 1.28571C6.846 1.32955 6.71808 1.52853 6.7619 1.73016L7.8976 6.5603C7.99797 6.98716 7.73314 7.41452 7.30622 7.51464L2.19048 8.71429C1.99132 8.75759 1.86919 8.96152 1.92064 9.15873L3.39683 15.4921L3.40167 15.5106C3.45205 15.7038 3.64665 15.822 3.84127 15.7778L8.75532 14.6254C9.25335 14.5086 9.73016 14.8866 9.73016 15.3981V19.0317C9.73016 19.47 9.37483 19.8254 8.93651 19.8254H0.793649C0.355329 19.8254 0 19.47 0 19.0317V0.793651C0 0.35533 0.35533 0 0.793651 0H9.36678Z" fill="white"/>%0A<path d="M13.004 0.261219C13.4312 0.160833 13.8587 0.426112 13.9585 0.853416L14.9941 5.29014C15.0938 5.71717 15.5209 5.98244 15.9478 5.88249L20.6392 4.78426C21.0662 4.68428 21.4935 4.94969 21.593 5.37687L22.7089 10.1643C22.8083 10.5909 22.5433 11.0174 22.1168 11.1172L17.4235 12.2159C16.9967 12.3159 16.7318 12.7428 16.8316 13.1696L17.8665 17.5913C17.9665 18.0184 17.701 18.4457 17.2735 18.5451L12.2005 19.7252C11.774 19.8245 11.3478 19.5594 11.248 19.133L10.2126 14.7093C10.1127 14.2825 9.68576 14.0175 9.25895 14.1174L4.56716 15.2158C4.14009 15.3157 3.7129 15.0503 3.61333 14.6232L2.49746 9.83569C2.39803 9.40911 2.663 8.98261 3.08949 8.88277L7.78284 7.78407C8.20962 7.68417 8.4746 7.25723 8.37471 6.83045L7.33944 2.40699C7.23962 1.98047 7.50422 1.55374 7.93063 1.45353L13.004 0.261219Z" fill="white"/>%0A</svg>%0A';

// assets/svg/social/telegram.svg
var telegram_default = 'data:image/svg+xml,<svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path d="M19.8595 0.00191074C19.6251 0.0100511 19.3986 0.0792494 19.1915 0.164728C18.9884 0.250208 17.8205 0.771224 16.0939 1.54054C14.3673 2.30985 12.1212 3.31118 9.89858 4.30437C5.44545 6.29074 1.07436 8.24456 1.07436 8.24456L1.10561 8.23235C1.10561 8.23235 0.839986 8.32597 0.574361 8.51728C0.441548 8.61497 0.297017 8.74115 0.175924 8.92432C0.058736 9.10749 -0.027202 9.368 0.00795501 9.64072C0.121236 10.6013 1.07827 10.8781 1.07827 10.8781H1.08217L5.35561 12.4005C5.46499 12.779 6.65249 16.9105 6.9103 17.7857C7.05483 18.266 7.19155 18.5468 7.33217 18.7382C7.40249 18.8318 7.4767 18.905 7.55874 18.958C7.58999 18.9824 7.62514 18.9946 7.65639 19.0109C7.6603 19.0109 7.6603 19.0109 7.6603 19.0109C7.6642 19.0109 7.66811 19.0149 7.67202 19.0149L7.6603 19.0109C7.66811 19.0149 7.67592 19.019 7.68374 19.0231C7.69936 19.0272 7.70717 19.0272 7.7267 19.0353C8.21889 19.2103 8.62124 18.8806 8.62124 18.8806L8.64077 18.8684L11.2658 16.3285L15.5236 19.7924L15.5783 19.8168C16.3244 20.1628 16.9962 19.9674 17.3712 19.654C17.7462 19.3365 17.8908 18.9295 17.8908 18.9295L17.9064 18.8847L21.0392 1.88246C21.1173 1.5039 21.129 1.1742 21.0548 0.877056C20.9767 0.579914 20.7931 0.323476 20.5665 0.18101C20.3361 0.0344743 20.0939 -0.0103009 19.8595 0.00191074ZM19.8869 1.01545C19.9806 1.01138 20.0509 1.02359 20.0744 1.0358C20.0939 1.05208 20.1056 1.04801 20.1251 1.13349C20.1486 1.21897 20.1603 1.394 20.1017 1.67079L20.0978 1.67486L16.9845 18.5794C16.9806 18.5957 16.9142 18.7504 16.7658 18.8766C16.6134 19.0068 16.4455 19.1045 16.0001 18.9091L11.3439 15.1236L11.2111 15.0178L11.2072 15.0218L9.81655 13.931L17.6447 4.33286C17.7658 4.18226 17.7931 3.97059 17.7111 3.79149C17.629 3.61646 17.4572 3.50249 17.2658 3.50656C17.1759 3.51063 17.0861 3.53913 17.0119 3.59204L5.68374 11.4643L1.40249 9.93379C1.40249 9.93379 0.980611 9.68957 0.957174 9.51861C0.957174 9.5064 0.953267 9.51454 0.972798 9.48197C0.996236 9.44941 1.05092 9.38835 1.12124 9.33951C1.26186 9.23775 1.41811 9.17669 1.41811 9.17669L1.43764 9.17262L1.45327 9.16448C1.45327 9.16448 5.82436 7.21067 10.2775 5.22429C12.5001 4.2311 14.7462 3.22977 16.4728 2.46046C18.1994 1.69114 19.4455 1.13756 19.5509 1.09279C19.672 1.04394 19.7892 1.02359 19.8869 1.01545ZM14.6915 6.40472L8.75405 13.6867C8.74233 13.699 8.73452 13.7112 8.7267 13.7234C8.71889 13.7356 8.70717 13.7519 8.69936 13.7641C8.66811 13.8251 8.64467 13.8903 8.63686 13.9595C8.63686 13.9595 8.63686 13.9595 8.63686 13.9635L7.86342 17.5862C7.85171 17.5455 7.84389 17.5333 7.82827 17.4885V17.4845C7.58217 16.6622 6.46499 12.7709 6.30874 12.2295L14.6915 6.40472ZM9.42592 14.8794L10.4923 15.7138L8.92592 17.228L9.42592 14.8794Z" fill="white"/>%0A</svg>%0A';

// assets/svg/social/youtube.svg
var youtube_default = 'data:image/svg+xml,<svg width="31" height="20" viewBox="0 0 31 20" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path d="M30.1282 3.12501C29.7692 1.90001 28.7433 0.924974 27.41 0.599974C24.9998 -2.55994e-05 15.3846 0 15.3846 0C15.3846 0 5.76938 -2.55994e-05 3.35913 0.599974C2.05143 0.924974 1 1.90001 0.641025 3.12501C0 5.35001 0 10 0 10C0 10 0 14.65 0.641025 16.875C1 18.1 2.05143 19.075 3.35913 19.4C5.76938 20 15.3846 20 15.3846 20C15.3846 20 24.9998 20 27.41 19.4C28.7433 19.075 29.7692 18.1 30.1282 16.875C30.7692 14.65 30.7692 10 30.7692 10C30.7692 10 30.7692 5.35001 30.1282 3.12501ZM12.8205 15V5.00001L20.5128 10L12.8205 15Z" fill="white"/>%0A</svg>%0A';

// assets/svg/social/github.svg
var github_default = 'data:image/svg+xml,<svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path d="M7.57562 17.7278C7.5756 17.5945 7.54689 17.4629 7.49156 17.3422C7.43622 17.2215 7.3556 17.1147 7.2554 17.0295C7.15522 16.9442 7.03789 16.8825 6.91176 16.8487C6.78564 16.8149 6.6538 16.8099 6.52556 16.8341C5.3618 17.0524 3.89244 17.0853 3.50175 15.9634C3.16109 15.0945 2.59682 14.3361 1.86873 13.7685C1.81679 13.7396 1.76728 13.7064 1.72072 13.6691C1.657 13.4973 1.54382 13.3492 1.39611 13.2445C1.2484 13.1398 1.07311 13.0833 0.893351 13.0825H0.889013C0.65396 13.0824 0.428447 13.1775 0.261833 13.347C0.0952198 13.5165 0.00107761 13.7466 1.24646e-05 13.9869C-0.00346353 14.728 0.720993 15.2028 1.01489 15.3635C1.36147 15.7194 1.64 16.1384 1.83618 16.5989C2.16 17.5291 3.10109 18.9402 5.80629 18.7584C5.80718 18.7904 5.80804 18.8204 5.80847 18.848L5.81236 19.0911C5.81236 19.3322 5.90604 19.5633 6.07275 19.7338C6.23947 19.9042 6.4656 20 6.70136 20C6.93715 20 7.16327 19.9042 7.32998 19.7338C7.49671 19.5633 7.59036 19.3322 7.59036 19.0911L7.58604 18.8018C7.58169 18.6296 7.57562 18.3802 7.57562 17.7278ZM17.0586 3.98062C17.0868 3.86702 17.1146 3.74098 17.1389 3.59898C17.2827 2.58615 17.1573 1.55243 16.776 0.606153C16.7279 0.482789 16.6539 0.371678 16.5594 0.280607C16.4648 0.189536 16.3519 0.120713 16.2286 0.0789587C15.9121 -0.0302119 14.7436 -0.245 12.509 1.21502C10.6514 0.768131 8.7178 0.768131 6.86025 1.21502C4.63471 -0.223614 3.47224 -0.028394 3.15882 0.07456C3.03247 0.114622 2.91647 0.183082 2.81936 0.274922C2.72224 0.366762 2.64645 0.479655 2.59756 0.605326C2.20844 1.56977 2.08445 2.62458 2.239 3.65582C2.26071 3.77207 2.28415 3.87947 2.30845 3.97798C1.57199 4.98085 1.17971 6.20409 1.19244 7.45806C1.19004 7.73782 1.20265 8.01753 1.2302 8.29589C1.52713 12.4789 4.19413 13.7348 6.05242 14.1661C6.01378 14.2797 5.97864 14.4013 5.94736 14.53C5.89167 14.7639 5.92895 15.0107 6.05104 15.2165C6.17311 15.4223 6.37004 15.5702 6.59864 15.6278C6.82722 15.6853 7.0688 15.6479 7.27042 15.5236C7.47204 15.3994 7.61724 15.1985 7.67415 14.9649C7.73071 14.6621 7.87571 14.3839 8.09 14.167C8.21958 14.051 8.3134 13.8991 8.36004 13.7296C8.40669 13.5601 8.40415 13.3804 8.35273 13.2124C8.30131 13.0443 8.20324 12.8952 8.07044 12.7831C7.93764 12.671 7.77582 12.6008 7.60471 12.581C4.534 12.2224 3.20093 10.9435 3.00038 8.12904C2.97818 7.90613 2.96818 7.68213 2.97044 7.45806C2.95618 6.56435 3.24498 5.69315 3.78782 4.99246C3.84236 4.91942 3.90045 4.8492 3.96187 4.78211C4.07073 4.6576 4.14391 4.50484 4.17338 4.3406C4.20287 4.17636 4.18751 4.00698 4.12902 3.85107C4.06904 3.68705 4.02285 3.51811 3.99098 3.34605C3.91855 2.85684 3.94231 2.35776 4.06085 1.87805C4.83351 2.10115 5.56069 2.46429 6.20778 2.9502C6.3148 3.02307 6.43587 3.07156 6.56284 3.09238C6.68978 3.11322 6.81962 3.10589 6.94356 3.07091C8.74033 2.57242 10.6346 2.57273 12.4312 3.07182C12.5558 3.10676 12.6864 3.11367 12.8138 3.09205C12.9413 3.07045 13.0627 3.02085 13.1696 2.94669C13.8137 2.45876 14.5378 2.09236 15.3079 1.86476C15.4259 2.33296 15.4523 2.82038 15.3856 3.29904C15.3534 3.48765 15.3031 3.67256 15.2354 3.85109C15.1769 4.007 15.1615 4.17638 15.191 4.34062C15.2205 4.50485 15.2937 4.65762 15.4025 4.78213C15.4711 4.86111 15.5397 4.94633 15.6013 5.0262C16.1403 5.71504 16.4243 6.57622 16.4031 7.45806C16.4047 7.694 16.3936 7.92985 16.3697 8.16453C16.1739 10.9417 14.8356 12.2215 11.7506 12.5809C11.5795 12.6009 11.4176 12.6712 11.2848 12.7834C11.1521 12.8956 11.054 13.0449 11.0026 13.213C10.9513 13.3811 10.9488 13.5609 10.9955 13.7304C11.0422 13.8999 11.1361 14.0519 11.2657 14.1679C11.4868 14.3906 11.6321 14.6799 11.6803 14.9933C11.7404 15.2366 11.768 15.4871 11.7623 15.738V17.8592C11.7536 18.4476 11.7536 18.8887 11.7536 19.0911C11.7536 19.3322 11.8473 19.5633 12.014 19.7338C12.1807 19.9042 12.4069 20 12.6426 20C12.8784 20 13.1045 19.9042 13.2713 19.7338C13.438 19.5633 13.5316 19.3322 13.5316 19.0911C13.5316 18.894 13.5316 18.4618 13.5403 17.8734V15.738C13.5475 15.3361 13.5012 14.9351 13.4027 14.546C13.3746 14.4183 13.3401 14.2921 13.2994 14.1679C14.6518 13.9382 15.8806 13.2254 16.7671 12.1563C17.6535 11.0872 18.1401 9.73116 18.1403 8.32962C18.1696 8.04009 18.1833 7.74913 18.1811 7.45806C18.2009 6.20273 17.8053 4.97736 17.0586 3.98062Z" fill="white"/>%0A</svg>%0A';

// assets/svg/social/email.svg
var email_default = 'data:image/svg+xml,<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path d="M8.9425 8.91137C9.7327 8.91137 10.3733 8.27078 10.3733 7.48059C10.3733 6.69039 9.7327 6.0498 8.9425 6.0498C8.1523 6.0498 7.51172 6.69039 7.51172 7.48059C7.51172 8.27078 8.1523 8.91137 8.9425 8.91137Z" fill="white"/>%0A<path d="M17.5379 7.67517L16.8118 7.00555V8.41701L17.6305 7.78032C17.602 7.74332 17.571 7.7082 17.5379 7.67517Z" fill="white"/>%0A<path d="M9.42592 0.188598C9.1531 -0.0628661 8.73297 -0.0628661 8.46015 0.188598L7.53516 1.04206H10.3495L9.42592 0.188598Z" fill="white"/>%0A<path d="M9.16072 14.3681L16.0964 8.97364V2.1152C16.0964 1.91766 15.9363 1.75751 15.7388 1.75751H2.14627C1.94873 1.75751 1.78857 1.91766 1.78857 2.1152V8.97368L8.72216 14.3663C8.84985 14.4697 9.03221 14.4704 9.16072 14.3681ZM4.65014 7.48063C4.65014 5.11004 6.57188 3.18826 8.94251 3.18826C11.3131 3.18826 13.2349 5.11004 13.2349 7.48063V8.19602C13.2373 8.84803 12.7971 9.41858 12.1658 9.58169C11.5346 9.74483 10.8731 9.45896 10.5593 8.88742C9.98819 9.54577 9.07565 9.79333 8.25009 9.51393C7.42456 9.23454 6.84996 8.48363 6.79604 7.61374C6.74212 6.74385 7.21965 5.92778 8.00441 5.5486C8.78913 5.16941 9.72526 5.30245 10.3733 5.88526V5.69212C10.3733 5.49458 10.5334 5.33443 10.731 5.33443C10.9285 5.33443 11.0887 5.49458 11.0887 5.69212V8.19599C11.0887 8.59107 11.409 8.91138 11.8041 8.91138C12.1992 8.91138 12.5195 8.59107 12.5195 8.19599V7.4806C12.5195 5.50509 10.918 3.90365 8.94251 3.90365C6.96701 3.90365 5.36556 5.50512 5.36556 7.4806C5.36556 9.45607 6.96701 11.0575 8.94251 11.0575C9.70811 11.0606 10.4541 10.8155 11.0687 10.359C11.2273 10.2412 11.4513 10.2744 11.5691 10.433C11.6868 10.5917 11.6537 10.8157 11.4951 10.9334C10.7573 11.4817 9.86175 11.7762 8.94254 11.773C6.57297 11.7704 4.6527 9.85017 4.65014 7.48063Z" fill="white"/>%0A<path d="M9.6023 14.9314C9.2148 15.2391 8.66633 15.2391 8.27883 14.9314L7.24688 14.1255L0.729248 19.8766C0.894328 19.957 1.07538 19.9992 1.25899 20H16.6257C16.8093 19.9992 16.9903 19.957 17.1554 19.8766L10.6378 14.1259L9.6023 14.9314Z" fill="white"/>%0A<path d="M11.2124 13.6788L17.6903 19.3944C17.8168 19.1907 17.8842 18.9557 17.8849 18.7159V8.48895L11.2124 13.6788Z" fill="white"/>%0A<path d="M1.07316 7.00562L0.346332 7.6756C0.313441 7.70849 0.282718 7.74348 0.254395 7.78041L1.07316 8.41711V7.00562Z" fill="white"/>%0A<path d="M0 8.48895V18.7159C0.000427158 18.9561 0.0678195 19.1914 0.194587 19.3955L6.67246 13.6799L0 8.48895Z" fill="white"/>%0A</svg>%0A';

// frontends/footer/display/Main.tsx
function Main_default() {
  return /* @__PURE__ */ Cemjsx("footer", { class: "footer" }, /* @__PURE__ */ Cemjsx("div", { class: "footer_inner" }, /* @__PURE__ */ Cemjsx("span", null, "Powered by ", /* @__PURE__ */ Cemjsx("a", { target: "_blank", href: "https://crypto-emergency.com/" }, "Crypto Emergency")), /* @__PURE__ */ Cemjsx("div", { class: "footer_socials" }, /* @__PURE__ */ Cemjsx("a", { class: "footer_socials_item", target: "_blank", href: "https://t.me/FrameworkCemJS" }, /* @__PURE__ */ Cemjsx("img", { src: telegram_default })), /* @__PURE__ */ Cemjsx("a", { class: "footer_socials_item", target: "_blank", href: "https://www.youtube.com/@CemJS" }, /* @__PURE__ */ Cemjsx("img", { src: youtube_default })), /* @__PURE__ */ Cemjsx("a", { class: "footer_socials_item", target: "_blank", href: "https://github.com/CemJS" }, /* @__PURE__ */ Cemjsx("img", { src: github_default })), /* @__PURE__ */ Cemjsx("a", { class: "footer_socials_item", target: "_blank", href: "mailto:support@crypto-emergency" }, /* @__PURE__ */ Cemjsx("img", { src: email_default })), /* @__PURE__ */ Cemjsx("a", { class: "footer_socials_item", target: "_blank", href: "https://crypto-emergency.com/" }, /* @__PURE__ */ Cemjsx("img", { src: platform_default }))), /* @__PURE__ */ Cemjsx("span", null, "\xA9 2023")));
}

// frontends/footer/navigation.tsx
function navigation_default() {
  return /* @__PURE__ */ Cemjsx(Main_default, null);
}

// frontends/footer/index.tsx
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
  return /* @__PURE__ */ Cemjsx("div", null, /* @__PURE__ */ Cemjsx(navigation_default, null));
};
export {
  front
};
