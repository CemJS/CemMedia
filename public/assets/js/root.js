var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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
var checkNodeTag = function(node, Data) {
  let tempNode = node.tag.bind(Data)(node.data, node.children);
  if (typeof tempNode?.tag == "function") {
    return checkNodeTag(tempNode, Data);
  }
  return tempNode;
};
var checkDifferent = function(data, data2) {
  if (data?.toString() == data2?.toString()) {
    return false;
  }
  return true;
};
var checkNofing = function(data) {
  if (!data && typeof data != "number" || data === true) {
    return true;
  }
  return false;
};
var setDataElement = function(data, $el, Data) {
  if (!data) {
    return;
  }
  Object.entries(data).forEach(([name, value]) => {
    if (name.startsWith("on") && name.toLowerCase() in window) {
      let tmpFn = value;
      $el.addEventListener(name.toLowerCase().substring(2), tmpFn);
      Data._ListsEventListener.push({ $el, name: name.toLowerCase().substring(2), fn: tmpFn });
    } else if (name == "ref" || name == "init" || name == "isVisible") {
      return;
    } else if (name == "html") {
      try {
        $el.innerHTML = value;
      } catch (error) {
      }
      return;
    } else {
      if (typeof value == "object") {
        if (name == "class") {
          value = value.join(" ");
        }
      }
      let checkIgnore = false;
      if (name == "disabled" || name == "checked") {
        checkIgnore = true;
      }
      if (!checkIgnore) {
        $el.setAttribute(name, value);
      } else {
        if (value || typeof value == "number") {
          $el.setAttribute(name, value);
        }
      }
    }
  });
  return;
};
var setDataElementSvg = function(data, $el) {
  Object.entries(data || {}).forEach(([name, value]) => {
    if (name.startsWith("xmlns")) {
      $el.setAttributeNS("http://www.w3.org/2000/xmlns/", name, value);
    } else {
      $el.setAttribute(name, value);
    }
  });
  return $el;
};
var updateDataElement = function($el, newData = {}, oldData = {}, Data) {
  if (!oldData) {
    oldData = {};
  }
  if (!newData) {
    newData = {};
  }
  Object.keys(Object.assign({}, newData, oldData)).forEach((name) => {
    if (name.startsWith("on") && name.toLowerCase() in window && name in oldData) {
      $el.removeEventListener(name.toLowerCase().substring(2), oldData[name]);
    }
    if (name.startsWith("on") && name.toLowerCase() in window && name in newData) {
      let tmpFn = newData[name];
      $el.addEventListener(name.toLowerCase().substring(2), tmpFn);
      Data._ListsEventListener.push({ $el, name: name.toLowerCase().substring(2), fn: tmpFn });
      return;
    }
    if (checkDifferent(newData[name], oldData[name])) {
      if (name in newData) {
        if (!newData[name]) {
          if (name == "value") {
            $el.value = "";
            return;
          }
          if (name == "html") {
            try {
              $el.innerHTML = "";
            } catch (error) {
            }
            return;
          }
          $el?.removeAttribute(name);
          return;
        }
        if (name == "ref") {
          if ($el !== Data.Ref[newData[name]]) {
            Data.Ref[newData[name]] = $el;
          }
          return;
        }
        if (name == "init") {
          return;
        }
        if (name == "isVisible") {
          return;
        }
        if (name == "value") {
          $el.value = newData[name];
          return;
        }
        if (name == "html") {
          try {
            $el.innerHTML = newData[name];
          } catch (error) {
          }
          return;
        }
        if (typeof newData[name] == "object") {
          if (name == "class") {
            newData[name] = newData[name].join(" ");
          }
        }
        let checkIgnore = false;
        if (name == "disabled" || name == "checked") {
          checkIgnore = true;
        }
        if (!checkIgnore) {
          $el.setAttribute(name, newData[name]);
        } else {
          if (newData[name] || typeof newData[name] == "number") {
            $el.setAttribute(name, newData[name]);
          } else {
            $el?.removeAttribute(name);
          }
        }
      } else {
        if (name == "value") {
          $el.value = "";
          return;
        }
        if (name == "html") {
          try {
            $el.innerHTML = "";
          } catch (error) {
          }
          return;
        }
        $el?.removeAttribute(name);
      }
    }
  });
};
var createElement = function(node, Data, typeSvg) {
  if (checkNofing(node)) {
    return null;
  }
  if (typeof node != "object") {
    return document.createTextNode(node);
  }
  if (typeof node.tag == "function") {
    let tempNode = checkNodeTag(node, Data);
    node = tempNode;
  }
  let $el;
  if (node.tag == "svg" || typeSvg) {
    typeSvg = true;
    $el = document.createElementNS("http://www.w3.org/2000/svg", node.tag);
  } else {
    $el = document.createElement(node.tag);
  }
  node.$el = $el;
  if (node.data?.ref && Data.Ref) {
    Data.Ref[node.data?.ref] = $el;
  }
  if (node.data?.init) {
    Data._ListsInit.push({ $el, fn: node.data?.init });
  }
  if (node.data?.isVisible && typeof node.data?.isVisible == "function") {
    Data._ListsVisible.push({ $el, fn: node.data?.isVisible });
  }
  if (typeSvg) {
    setDataElementSvg(node.data, $el);
  } else {
    setDataElement(node.data, $el, Data);
  }
  if (typeof node.children == "object") {
    node.children.map((item) => createElement(item, Data, typeSvg)).filter((item) => !checkNofing(item)).forEach($el.appendChild.bind($el));
  } else {
    return document.createTextNode(node.tag);
  }
  return $el;
};
var updateElement = async function($el, _VDomNew, _VDomActual, position = 0, Data) {
  if (checkNofing(_VDomActual)) {
    if (_VDomNew) {
      $el.appendChild(
        createElement(_VDomNew, Data)
      );
    }
    return;
  }
  if (checkNofing(_VDomNew)) {
    if (!$el.childNodes[position]) {
      $el.removeChild(
        $el.lastChild
      );
    } else {
      $el.removeChild(
        $el.childNodes[position]
      );
    }
    return;
  }
  if (!_VDomNew?.tag) {
    if (_VDomNew != _VDomActual) {
      $el.replaceChild(createElement(_VDomNew, Data), $el.childNodes[position]);
    }
    return;
  }
  if (_VDomNew.tag != _VDomActual?.tag) {
    $el.childNodes[position].replaceWith(createElement(_VDomNew, Data));
    return;
  }
  if (!$el) {
    console.error("UpdateElement \u043D\u0435\u0442 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F $el");
    return;
  }
  let eventIndex = Data._ListsEventListener.findIndex((item) => $el.childNodes[position] === item?.$el);
  if (eventIndex >= 0) {
    let item = Data._ListsEventListener[eventIndex];
    item.$el.removeEventListener(item.name, item.fn);
    Data._ListsEventListener.splice(eventIndex, 1);
  }
  updateDataElement($el.childNodes[position], _VDomNew?.data, _VDomActual?.data, Data);
  _VDomNew.$el = _VDomActual.$el;
  for (let i = 0; i < _VDomNew.children.length || i < _VDomActual.children.length; i++) {
    updateElement(
      _VDomActual.$el,
      _VDomNew.children[i],
      _VDomActual.children[i],
      i,
      Data
    );
  }
};
var display = (_VDomNew, _VDomActual, $el, Data, index) => {
  if (!$el) {
    const newDom = createElement(_VDomNew, Data);
    const $app = document.getElementById("app");
    if ($app.childNodes.length > index) {
      $app.insertBefore(newDom, $app.childNodes[index]);
    } else {
      $app.appendChild(newDom);
    }
    return newDom;
  }
  updateElement($el, _VDomNew, _VDomActual, 0, Data);
  return $el;
};

// node_modules/cemjs-core/libs/variable.js
var variable = {
  cemConfigs: {},
  pageLists: [],
  frontList: {},
  Variable: {},
  Services: {}
};

// node_modules/cemjs-core/libs/fn.js
var fn_exports = {};
__export(fn_exports, {
  clearData: () => clearData,
  cross: () => cross,
  event: () => event,
  eventSource: () => eventSource,
  eventSourceChange: () => eventSourceChange,
  init: () => init,
  initAll: () => initAll,
  initAuto: () => initAuto,
  initOne: () => initOne,
  link: () => link,
  linkChange: () => linkChange,
  services: () => services
});

// node_modules/cemjs-core/libs/class.js
var Events = class {
  constructor(url, Listener = []) {
    this.url = url;
    this._Listener = Listener;
    this.event = new EventSource(url);
    for (let item of this._Listener) {
      this.event.addEventListener(item.type, item.fn);
    }
  }
  addEventListener(type, fn) {
    this._Listener.push({ type, fn });
    this.event.addEventListener(type, fn);
  }
  close() {
    this.event.close();
  }
  change(url, Listener = []) {
    this.event.close();
    this.url = url;
    this.event = new EventSource(url);
    if (Listener.length) {
      this._Listener = Listener;
    }
    for (let item of this._Listener) {
      this.event.addEventListener(item.type, item.fn);
    }
  }
};

// node_modules/cemjs-core/libs/fn.js
var checkDifferent2 = function(data, data2) {
  if (data?.toString() == data2?.toString()) {
    return false;
  }
  return true;
};
var VDomStartFn = function(_VDomNew, Data) {
  if (typeof _VDomNew != "object") {
    return _VDomNew;
  }
  let tmp = { tag: _VDomNew.tag, data: _VDomNew.data, children: _VDomNew.children };
  if (typeof tmp.tag == "function") {
    let tmpp = VDomStartFn(tmp.tag.bind(Data)(tmp.data), Data);
    return tmpp;
  }
  if (tmp.children) {
    tmp.children.forEach((item, index) => {
      tmp.children[index] = VDomStartFn(tmp.children[index], Data);
    });
  }
  return tmp;
};
var link = function(e) {
  let $el = e.currentTarget || e.target;
  if ($el.href) {
    if (!$el.href.includes(window.location.host)) {
      $el.target = "_blank";
      return;
    }
    history.pushState({}, "", $el.href);
    window.dispatchEvent(new Event("popstate"));
    e.preventDefault();
  }
};
var linkChange = function(link2, data = {}) {
  history.pushState({}, "", link2);
  let e = new Event("popstate");
  e.data = data;
  window.dispatchEvent(e);
};
var initOne = async function(name, data, ifOpen = null) {
  if (!variable.frontList[name]) {
    console.error("=d792ce=", "No name =>", name);
    return;
  }
  if (variable.frontList[name].$el) {
    if (ifOpen) {
      ifOpen(variable.frontList[name]);
      return;
    }
  }
  if (typeof data == "object") {
    Object.assign(variable.frontList[name].Static, data);
  }
  init.bind(variable.frontList[name])();
  return;
};
var initAll = async function() {
  for (let key in variable.frontList) {
    if (variable.frontList[key].$el) {
      variable.frontList[key].Fn.init.bind(variable.frontList[key])();
    }
  }
};
var init = async function(index) {
  if (this.listener.start) {
    this.listener.start();
  }
  if (!variable.pageLists.includes(this.name)) {
    variable.pageLists.push(this.name);
  }
  if (!this._VDomActual) {
    await this.loader();
  }
  this._VDomNew = VDomStartFn(await this.display(), this);
  this.$el = display(this._VDomNew, this._VDomActual, this.$el, this, index);
  this._VDomActual = this._VDomNew;
  if (this._ListsInit.length) {
    for (let item of this._ListsInit) {
      item.fn.bind(this)(item.$el);
    }
    this._ListsInit = [];
  }
  this._ListsEventListener = this._ListsEventListener.filter((item) => {
    if (!document.body.contains(item.$el)) {
      item.$el.removeEventListener(item.name, item.fn);
      return false;
    }
    return true;
  });
  if (this.listener.finish) {
    this.listener.finish();
  }
};
var initAuto = function(keys, fn) {
  return;
  const init2 = this.init.bind(this);
  if (Array.isArray(keys)) {
    for (let item of keys) {
      if (typeof this.Static[item] != "undefined") {
        this.Static[`_${item}`] = this.Static[item];
      }
      this.Static.__defineGetter__(item, function() {
        return this[`_${item}`];
      });
      this.Static.__defineSetter__(item, function(value) {
        if (fn && fn(value, item)) {
          this[`_${item}`] = value;
          init2();
        } else if (!fn && checkDifferent2(this[`_${item}`], value)) {
          this[`_${item}`] = value;
          init2();
        }
      });
    }
  } else {
    if (typeof this.Static[keys] != "undefined") {
      this.Static[`_${keys}`] = this.Static[keys];
    }
    this.Static.__defineGetter__(keys, function() {
      return this[`_${keys}`];
    });
    this.Static.__defineSetter__(keys, function(value) {
      if (fn && fn(value, keys)) {
        this[`_${keys}`] = value;
        init2();
      } else if (!fn && checkDifferent2(this[`_${keys}`], value)) {
        this[`_${keys}`] = value;
        init2();
      }
    });
  }
};
var clearData = function() {
  this?.$el?.remove();
  delete this.$el;
  delete this._VDomNew;
  delete this._VDomActual;
  if (this.Static.setInterval) {
    clearInterval(this.Static.setInterval);
  }
  if (this.Static.setTimeout) {
    clearTimeout(this.Static.setTimeout);
  }
  for (let key in this.Static) {
    delete this.Static[key];
  }
  for (let key in this.Ref) {
    delete this.Ref[key];
  }
  this._ListsEventListener = this._ListsEventListener.filter((item) => {
    item.$el.removeEventListener(item.name, item.fn);
    return false;
  });
  this._ListsEventSource = this._ListsEventSource.filter((item) => {
    item.close();
    return false;
  });
  for (let key in this.Events) {
    delete this.Events[key];
  }
  this._ListsVisible = [];
};
var cross = function(data) {
  for (let item of Cross[this.name]) {
    if (Frontends.lists[item.name]?.$el)
      item.fn.bind(Frontends.lists[item.name])(data);
  }
};
var services = function(name, ...data) {
  let [serv, key] = name.split(".");
  if (this.Services[serv] && typeof this.Services[serv][key] == "function") {
    return this.Services[serv][key].bind(this)(...data);
  }
  return null;
};
var event = function(url, Listener) {
  let event2 = new Events(url, Listener);
  this._ListsEventSource.push(event2);
  return event2;
};
var eventSource = function(url) {
  if (this.Variable._Api) {
    url = this.Variable._Api + url;
  }
  let event2 = new Events(url);
  this._ListsEventSource.push(event2);
  return event2;
};
var eventSourceChange = function(url) {
  this._ListsEventSource[0].close();
  this._ListsEventSource = [];
  if (this.Variable._Api) {
    url = this.Variable._Api + url;
  }
  let event2 = new Events(url);
  this._ListsEventSource.push(event2);
  return event2;
};

// node_modules/cemjs-core/libs/listener.js
var clearFront = async function(front2, data = null) {
  variable.pageLists = variable.pageLists.filter((olPage, index2) => {
    if (!front2.includes(olPage)) {
      variable.frontList[olPage]?.$el?.remove();
      clearData.bind(variable.frontList[olPage])();
      return false;
    }
    return true;
  });
  let index = 0;
  for (let page of front2) {
    if (variable.frontList[page]) {
      if (data && typeof data == "object") {
        Object.assign(variable.frontList[page].Static, data);
      }
      await init.bind(variable.frontList[page])(index);
    }
    index++;
  }
};
var changeUrl = async function(e) {
  variable.Variable.DataUrl = window.location.pathname.split("/");
  variable.Variable.DataUrl = variable.Variable.DataUrl.filter((item) => item != "");
  for (let item of variable.cemConfigs.pages) {
    if (item.regex && window.location.pathname.search(new RegExp(item.regex)) != -1) {
      clearFront(item.front, e.data);
    } else if (item.url && item.url == window.location.pathname) {
      clearFront(item.front, e.data);
    }
  }
  if (!variable.pageLists.length) {
    let find = variable.cemConfigs.pages.findIndex(function(item) {
      return item.url == "/error";
    });
    if (find > -1) {
      clearFront(variable.cemConfigs.pages[find].front, e.data);
    }
  }
  document.documentElement.scrollIntoView(true);
};
var clickAny = function(e) {
  for (let key in variable.frontList) {
    if (variable.frontList[key].$el) {
      if (variable.frontList[key]?.listener?.clickAny) {
        variable.frontList[key].listener.clickAny(e);
      }
    }
  }
};
var keydownAny = function(e) {
  for (let key in variable.frontList) {
    if (variable.frontList[key].$el) {
      if (variable.frontList[key]?.listener?.keydownAny) {
        variable.frontList[key].listener.keydownAny(e);
      }
    }
  }
};
var keyupAny = function(e) {
  for (let key in variable.frontList) {
    if (variable.frontList[key].$el) {
      if (variable.frontList[key]?.listener?.keyupAny) {
        variable.frontList[key].listener.keyupAny(e);
      }
    }
  }
};
var listener = function() {
  window.addEventListener("popstate", changeUrl);
  window.addEventListener("click", clickAny);
  document.addEventListener("keydown", keydownAny);
  document.addEventListener("keyup", keyupAny);
};

// node_modules/cemjs-core/libs/cache.js
var getFetch = async function(url) {
  return await fetch(url);
};
var getFiles = async function(url) {
  if (variable.cemConfigs.cemjs.live) {
    let response2 = await getFetch(url);
    caches.open(variable.cemConfigs.cemjs.version).then(function(cache) {
      cache.put(url, response2);
    });
    return response2.clone();
  }
  let cachedResponse = await caches.match(url);
  if (cachedResponse) {
    return cachedResponse;
  }
  let response = await getFetch(url);
  caches.open(variable.cemConfigs.cemjs.version).then(function(cache) {
    cache.put(url, response);
  });
  return response.clone();
};

// node_modules/cemjs-core/libs/loader.js
var load = async function(front2) {
  front2.Fn = fn_exports;
  front2.Variable = variable.Variable;
  front2.Services = variable.Services;
  variable.frontList[front2.name] = front2;
  return;
};
var loadFiles = async function(name, path, type) {
  if (!path) {
    return;
  }
  path += "&core=" + variable.cemConfigs?.cemjs?.version;
  let response = await getFiles(path);
  var objectURL = URL.createObjectURL(await response.blob());
  if (type == "front") {
    let { front: front2 } = await import(objectURL);
    if (front2) {
      front2.name = name;
      await load(front2);
    }
    return;
  }
  if (type == "style") {
    let head = document.getElementsByTagName("head")[0];
    let link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.type = "text/css";
    link2.href = objectURL;
    head.appendChild(link2);
    return;
  }
  if (type == "service") {
    variable.Services[name] = await import(objectURL);
    if (typeof variable.Services[name].loader == "function") {
      await variable.Services[name].loader(variable.Variable, fn_exports);
    }
    return;
  }
};
var initProject = async function(configs) {
  if (!configs.cemjs || !configs.pages || !configs.frontends || !configs.services) {
    console.error("Incorrect configurations");
    return;
  }
  variable.cemConfigs = configs;
  listener();
  if (configs.cemjs.live) {
    new EventSource("/esbuild").addEventListener("change", () => location.reload());
  }
  let files = [];
  let nowCheck = 0;
  configs.services.map((item) => {
    files.push(item.path.js);
  });
  configs.frontends.map((item) => {
    files.push(item.path.js);
    if (item.path.css) {
      files.push(item.path.css);
    }
  });
  for (let item of configs.services) {
    nowCheck++;
    await loadFiles(item.name, item.path?.js, "service");
    if (typeof variable.Services["preloader"]?.progress == "function") {
      variable.Services["preloader"].progress({ total: files.length, load: nowCheck });
    }
  }
  for (let item of configs.frontends) {
    nowCheck++;
    await loadFiles(item.name, item.path?.js, "front");
    if (item.path?.css) {
      nowCheck++;
      await loadFiles(item.name, item.path?.css, "style");
    }
    if (typeof variable.Services["preloader"]?.progress == "function") {
      variable.Services["preloader"].progress({ total: files.length, load: nowCheck });
    }
  }
  history.pushState({}, "", window.location.pathname);
  window.dispatchEvent(new Event("popstate"));
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
Fn.linkChange = async function(link2, data = {}) {
  return await front.Fn.linkChange.bind(front)(link2, data);
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

// config/cemjs.json
var cemjs_default = { version: "v1.0.2", port: 3e3, live: true };

// config/pages.json
var pages_default = [{ url: "/", front: ["header", "cemMedia", "footer"] }, { url: "/error", front: ["header", "error", "footer"] }];

// config/frontends.json
var frontends_default = [{ front: true, name: "cemMedia", path: { js: "/assets/js/cemMedia.js?ver=1.0.0" }, version: "1.0.0", visable: true }, { front: true, name: "error", path: { js: "/assets/js/error.js?ver=1.0.0", css: "/assets/css/error.css?ver=1.0.0" }, version: "1.0.0", visable: true }, { front: true, name: "footer", path: { js: "/assets/js/footer.js?ver=1.0.0", css: "/assets/css/footer.css?ver=1.0.0" }, version: "1.0.0", visable: true }, { front: true, name: "header", path: { js: "/assets/js/header.js?ver=1.0.0", css: "/assets/css/header.css?ver=1.0.0" }, version: "1.0.0", visable: true }];

// config/services.json
var services_default = [{ service: true, name: "functions", path: { js: "/assets/js/_functions.js?ver=1.0.0" }, version: "1.0.0", visable: true }, { service: true, name: "preloader", path: { js: "/assets/js/_preloader.js?ver=1.0.0" }, version: "1.0.0", visable: true }];

// app.ts
function app_default() {
  initProject({ cemjs: cemjs_default, pages: pages_default, frontends: frontends_default, services: services_default });
}
export {
  app_default as default
};
