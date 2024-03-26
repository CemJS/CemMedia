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

// assets/svg/space.svg
var space_default = 'data:image/svg+xml,<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g id="Planetary_System" data-name="Planetary System"><circle cx="5" cy="48" r="2" fill="%23000000" style="fill: rgb(255, 255, 255);"></circle><circle cx="41" cy="13" r="2" fill="%23000000" style="fill: rgb(255, 255, 255);"></circle><path d="m40.466 29.1a13.014 13.014 0 0 0 -11.366 11.365 16.018 16.018 0 0 0 11.366-11.365z" fill="%23000000" style="fill: rgb(255, 255, 255);"></path><path d="m54.956 41.243c-1.856 2.207-4.056 4.591-6.589 7.124s-4.919 4.736-7.124 6.59c.253.014.507.043.757.043a13.015 13.015 0 0 0 13-13c0-.25-.029-.5-.044-.757z" fill="%23000000" style="fill: rgb(255, 255, 255);"></path><path d="m58.973 25.027c-.815-.816-3.207-3.2-11.655 2.962a14.742 14.742 0 0 1 2.142 1.016c5.594-3.912 7.3-3.355 8.1-2.562.816.816 1.4 2.6-2.936 8.631a89.371 89.371 0 0 1 -9.084 10.463 89.551 89.551 0 0 1 -10.463 9.085c-3.8 2.729-5.908 3.509-7.157 3.509a1.948 1.948 0 0 1 -1.474-.574c-.791-.791-1.351-2.5 2.562-8.1a14.785 14.785 0 0 1 -1.016-2.141c-6.161 8.445-3.777 10.839-2.962 11.654.863.862 3.488 3.487 13.186-4.119a101.566 101.566 0 0 0 8.74-7.9 101.534 101.534 0 0 0 7.9-8.742c7.604-9.693 4.979-12.319 4.117-13.182z" fill="%23000000" style="fill: rgb(255, 255, 255);"></path><path d="m47.977 30.46a18 18 0 0 1 -17.517 17.517c.177.339.366.671.572.993a13.071 13.071 0 0 0 3.447 3.6 89.686 89.686 0 0 0 9.644-8.451 89.7 89.7 0 0 0 8.451-9.644 13.076 13.076 0 0 0 -3.6-3.445c-.323-.203-.657-.393-.997-.57z" fill="%23000000" style="fill: rgb(255, 255, 255);"></path><path d="m29.336 44.95c.083.351.181.7.291 1.036.125 0 .246.014.373.014a16.019 16.019 0 0 0 16-16c0-.127-.011-.248-.013-.373-.343-.111-.692-.21-1.048-.294a13.569 13.569 0 0 0 -2.409-.3 18 18 0 0 1 -13.5 13.5 13.535 13.535 0 0 0 .306 2.417z" fill="%23000000" style="fill: rgb(255, 255, 255);"></path><path d="m7.393 5.471c-2.178-1.508-3.393-1.887-3.828-1.906.019.434.4 1.651 1.906 3.828a8.046 8.046 0 0 1 1.922-1.922z" fill="%23000000" style="fill: rgb(255, 255, 255);"></path><path d="m12 18c.2 0 .4-.011.6-.03-1.134-.951-2.3-2.01-3.428-3.143s-2.19-2.294-3.142-3.427c-.019.2-.03.4-.03.6a6.006 6.006 0 0 0 6 6z" fill="%23000000" style="fill: rgb(255, 255, 255);"></path><path d="m18.529 16.607a8.046 8.046 0 0 1 -1.922 1.922c2.178 1.508 3.394 1.887 3.828 1.906-.019-.435-.399-1.651-1.906-3.828z" fill="%23000000" style="fill: rgb(255, 255, 255);"></path><path d="m18 12a6 6 0 0 0 -11.253-2.894 48.972 48.972 0 0 0 3.84 4.307 49.091 49.091 0 0 0 4.306 3.84 6 6 0 0 0 3.107-5.253z" fill="%23000000" style="fill: rgb(255, 255, 255);"></path><path d="m56 8h2v-2h2v-2h-2v-2h-2v2h-2v2h2z" fill="%23000000" style="fill: rgb(255, 255, 255);"></path><path d="m60 52h2v2h-2z" fill="%23000000" style="fill: rgb(255, 255, 255);"></path><path d="m53 60h2v2h-2z" fill="%23000000" style="fill: rgb(255, 255, 255);"></path><path d="m59 40h2v2h-2z" fill="%23000000" style="fill: rgb(255, 255, 255);"></path><path d="m8 29h-2v2h-2v2h2v2h2v-2h2v-2h-2z" fill="%23000000" style="fill: rgb(255, 255, 255);"></path><path d="m15 37h2v2h-2z" fill="%23000000" style="fill: rgb(255, 255, 255);"></path><path d="m26 9h2v2h-2z" fill="%23000000" style="fill: rgb(255, 255, 255);"></path><path d="m30 21h2v2h-2z" fill="%23000000" style="fill: rgb(255, 255, 255);"></path><path d="m37 3h2v2h-2z" fill="%23000000" style="fill: rgb(255, 255, 255);"></path><path d="m19 30h2v2h-2z" fill="%23000000" style="fill: rgb(255, 255, 255);"></path><path d="m11 57h2v2h-2z" fill="%23000000" style="fill: rgb(255, 255, 255);"></path></g></svg>';

// frontends/home/display/Main.tsx
function Main_default() {
  return /* @__PURE__ */ Cemjsx("div", { class: "home home_container" }, /* @__PURE__ */ Cemjsx("h2", { class: "home_title" }, Static.text), /* @__PURE__ */ Cemjsx("img", { class: "home_logoCem", src: space_default }));
}

// frontends/home/navigation.tsx
function navigation_default() {
  return /* @__PURE__ */ Cemjsx(Main_default, null);
}

// frontends/home/index.tsx
front.listener.finish = () => {
  return;
};
front.func.test = () => {
  return;
};
front.loader = () => {
  Static.text = "Framework CemJS!";
  return;
};
front.display = () => {
  return /* @__PURE__ */ Cemjsx("div", null, /* @__PURE__ */ Cemjsx(navigation_default, null));
};
export {
  front
};
