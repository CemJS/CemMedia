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

// assets/images/logoFull.png
var logoFull_default = "/assets/logoFull-ZCMIZVVL.png";

// json/socialsFooter.json
var socialsFooter_default = [
  {
    link: "",
    img: "/contents/svg/socials/twitter.svg"
  },
  {
    link: "",
    img: "/contents/svg/socials/cem.svg"
  },
  {
    link: "",
    img: "/contents/svg/socials/inst.svg"
  },
  {
    link: "",
    img: "/contents/svg/socials/youtube.svg"
  },
  {
    link: "",
    img: "/contents/svg/socials/telegram.svg"
  },
  {
    link: "",
    img: "/contents/svg/socials/facebook.svg"
  },
  {
    link: "",
    img: "/contents/svg/socials/vk.svg"
  },
  {
    link: "",
    img: "/contents/svg/socials/yandex.svg"
  }
];

// frontends/footer/display/Main.tsx
function Main_default() {
  return /* @__PURE__ */ Cemjsx("footer", { class: " bg-red-500 p-[31px_20px_136px] text-little leading-[19.3px] text-white" }, /* @__PURE__ */ Cemjsx("div", { class: "flex flex-col gap-3 xl:container xl:mx-auto" }, /* @__PURE__ */ Cemjsx("div", { class: "flex gap-[0.625rem] " }, /* @__PURE__ */ Cemjsx("p", null, "\u0421\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F \u0441 \u043D\u0430\u043C\u0438"), /* @__PURE__ */ Cemjsx("a", { href: "https://t.me/dmitriibelov" }, "@dmitriibelov")), /* @__PURE__ */ Cemjsx("p", null, "\u041D\u0430\u0448\u0438 \u0441\u043E\u0446\u0441\u0435\u0442\u0438"), /* @__PURE__ */ Cemjsx("div", { class: "flex gap-[6px]" }, socialsFooter_default.map((item) => {
    return /* @__PURE__ */ Cemjsx(
      "a",
      {
        href: item.link,
        class: "flex h-[25px] w-[25px] items-center justify-center rounded-[50%] border-[0.5px] border-solid border-white"
      },
      /* @__PURE__ */ Cemjsx("img", { src: item.img, alt: "social" })
    );
  })), /* @__PURE__ */ Cemjsx("a", { href: "" }, "info@cryptoemergency.com"), /* @__PURE__ */ Cemjsx("a", { href: "" }, /* @__PURE__ */ Cemjsx("img", { class: "w-[73px]", src: logoFull_default, alt: "Crypto Emergency" }))));
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
  return /* @__PURE__ */ Cemjsx(navigation_default, null);
};
export {
  front
};
