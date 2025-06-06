var a = typeof Reflect == "object" ? Reflect : null,
  m = a && typeof a.apply == "function" ? a.apply : function (e, n, r) {
    return Function.prototype.apply.call(e, n, r);
  },
  v;
a && typeof a.ownKeys == "function"
  ? v = a.ownKeys
  : Object.getOwnPropertySymbols
  ? v = function (e) {
    return Object.getOwnPropertyNames(e).concat(
      Object.getOwnPropertySymbols(e),
    );
  }
  : v = function (e) {
    return Object.getOwnPropertyNames(e);
  };
function C(t) {
  console && console.warn && console.warn(t);
}
var p = Number.isNaN || function (e) {
  return e !== e;
};
function o() {
  d.call(this);
}
o.EventEmitter = o,
  o.prototype._events = void 0,
  o.prototype._eventsCount = 0,
  o.prototype._maxListeners = void 0;
var l = 10;
function h(t) {
  if (typeof t != "function") {
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' +
        typeof t,
    );
  }
}
Object.defineProperty(o, "defaultMaxListeners", {
  enumerable: !0,
  get: function () {
    return l;
  },
  set: function (t) {
    if (typeof t != "number" || t < 0 || p(t)) {
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
          t + ".",
      );
    }
    l = t;
  },
});
function d() {
  (this._events === void 0 ||
    this._events === Object.getPrototypeOf(this)._events) &&
  (this._events = Object.create(null), this._eventsCount = 0),
    this._maxListeners = this._maxListeners || void 0;
}
o.init = d,
  o.prototype.setMaxListeners = function (e) {
    if (typeof e != "number" || e < 0 || p(e)) {
      throw new RangeError(
        'The value of "n" is out of range. It must be a non-negative number. Received ' +
          e + ".",
      );
    }
    return this._maxListeners = e, this;
  };
function y(t) {
  return t._maxListeners === void 0 ? o.defaultMaxListeners : t._maxListeners;
}
o.prototype.getMaxListeners = function () {
  return y(this);
},
  o.prototype.emit = function (e) {
    for (var n = [], r = 1; r < arguments.length; r++) n.push(arguments[r]);
    var i = e === "error", f = this._events;
    if (f !== void 0) i = i && f.error === void 0;
    else if (!i) return !1;
    if (i) {
      var s;
      if (n.length > 0 && (s = n[0]), s instanceof Error) throw s;
      var u = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
      throw u.context = s, u;
    }
    var c = f[e];
    if (c === void 0) return !1;
    if (typeof c == "function") m(c, this, n);
    else {for (var L = c.length, x = E(c, L), r = 0; r < L; ++r) {
        m(x[r], this, n);
      }}
    return !0;
  };
function g(t, e, n, r) {
  var i, f, s;
  if (
    h(n),
      f = t._events,
      f === void 0
        ? (f = t._events = Object.create(null), t._eventsCount = 0)
        : (f.newListener !== void 0 &&
          (t.emit("newListener", e, n.listener ? n.listener : n),
            f = t._events),
          s = f[e]),
      s === void 0
  ) s = f[e] = n, ++t._eventsCount;
  else if (
    typeof s == "function"
      ? s = f[e] = r ? [n, s] : [s, n]
      : r
      ? s.unshift(n)
      : s.push(n),
      i = y(t),
      i > 0 && s.length > i && !s.warned
  ) {
    s.warned = !0;
    var u = new Error(
      "Possible EventEmitter memory leak detected. " + s.length + " " +
        String(e) +
        " listeners added. Use emitter.setMaxListeners() to increase limit",
    );
    u.name = "MaxListenersExceededWarning",
      u.emitter = t,
      u.type = e,
      u.count = s.length,
      C(u);
  }
  return t;
}
o.prototype.addListener = function (e, n) {
  return g(this, e, n, !1);
},
  o.prototype.on = o.prototype.addListener,
  o.prototype.prependListener = function (e, n) {
    return g(this, e, n, !0);
  };
function R() {
  if (!this.fired) {
    return this.target.removeListener(this.type, this.wrapFn),
      this.fired = !0,
      arguments.length === 0
        ? this.listener.call(this.target)
        : this.listener.apply(this.target, arguments);
  }
}
function w(t, e, n) {
  var r = { fired: !1, wrapFn: void 0, target: t, type: e, listener: n },
    i = R.bind(r);
  return i.listener = n, r.wrapFn = i, i;
}
o.prototype.once = function (e, n) {
  return h(n), this.on(e, w(this, e, n)), this;
},
  o.prototype.prependOnceListener = function (e, n) {
    return h(n), this.prependListener(e, w(this, e, n)), this;
  },
  o.prototype.removeListener = function (e, n) {
    var r, i, f, s, u;
    if (h(n), i = this._events, i === void 0) return this;
    if (r = i[e], r === void 0) return this;
    if (r === n || r.listener === n) {
      --this._eventsCount === 0
        ? this._events = Object.create(null)
        : (delete i[e],
          i.removeListener && this.emit("removeListener", e, r.listener || n));
    } else if (typeof r != "function") {
      for (f = -1, s = r.length - 1; s >= 0; s--) {
        if (r[s] === n || r[s].listener === n) {
          u = r[s].listener, f = s;
          break;
        }
      }
      if (f < 0) return this;
      f === 0 ? r.shift() : M(r, f),
        r.length === 1 && (i[e] = r[0]),
        i.removeListener !== void 0 && this.emit("removeListener", e, u || n);
    }
    return this;
  },
  o.prototype.off = o.prototype.removeListener,
  o.prototype.removeAllListeners = function (e) {
    var n, r, i;
    if (r = this._events, r === void 0) return this;
    if (r.removeListener === void 0) {
      return arguments.length === 0
        ? (this._events = Object.create(null), this._eventsCount = 0)
        : r[e] !== void 0 &&
          (--this._eventsCount === 0
            ? this._events = Object.create(null)
            : delete r[e]),
        this;
    }
    if (arguments.length === 0) {
      var f = Object.keys(r), s;
      for (i = 0; i < f.length; ++i) {
        s = f[i], s !== "removeListener" && this.removeAllListeners(s);
      }
      return this.removeAllListeners("removeListener"),
        this._events = Object.create(null),
        this._eventsCount = 0,
        this;
    }
    if (n = r[e], typeof n == "function") this.removeListener(e, n);
    else if (n !== void 0) {
      for (i = n.length - 1; i >= 0; i--) this.removeListener(e, n[i]);
    }
    return this;
  };
function _(t, e, n) {
  var r = t._events;
  if (r === void 0) return [];
  var i = r[e];
  return i === void 0
    ? []
    : typeof i == "function"
    ? n ? [i.listener || i] : [i]
    : n
    ? j(i)
    : E(i, i.length);
}
o.prototype.listeners = function (e) {
  return _(this, e, !0);
},
  o.prototype.rawListeners = function (e) {
    return _(this, e, !1);
  };
function b(t, e) {
  return typeof t.listenerCount == "function"
    ? t.listenerCount(e)
    : o.prototype.listenerCount.call(t, e);
}
o.listenerCount = b,
  o.prototype.listenerCount = function (t) {
    var e = this._events;
    if (e !== void 0) {
      var n = e[t];
      if (typeof n == "function") return 1;
      if (n !== void 0) return n.length;
    }
    return 0;
  },
  o.prototype.eventNames = function () {
    return this._eventsCount > 0 ? v(this._events) : [];
  };
function E(t, e) {
  for (var n = new Array(e), r = 0; r < e; ++r) n[r] = t[r];
  return n;
}
function M(t, e) {
  for (; e + 1 < t.length; e++) t[e] = t[e + 1];
  t.pop();
}
function j(t) {
  for (var e = new Array(t.length), n = 0; n < e.length; ++n) {
    e[n] = t[n].listener || t[n];
  }
  return e;
}
function N(t, e) {
  return new Promise(function (n, r) {
    function i(s) {
      t.removeListener(e, f), r(s);
    }
    function f() {
      typeof t.removeListener == "function" && t.removeListener("error", i),
        n([].slice.call(arguments));
    }
    O(t, e, f, { once: !0 }), e !== "error" && A(t, i, { once: !0 });
  });
}
function A(t, e, n) {
  typeof t.on == "function" && O(t, "error", e, n);
}
function O(t, e, n, r) {
  if (typeof t.on == "function") r.once ? t.once(e, n) : t.on(e, n);
  else if (typeof t.addEventListener == "function") {
    t.addEventListener(e, function i(f) {
      r.once && t.removeEventListener(e, i), n(f);
    });
  } else {throw new TypeError(
      'The "emitter" argument must be of type EventEmitter. Received type ' +
        typeof t,
    );}
}
function P(t = l, ...e) {
  if (typeof t != "number" || t < 0 || p(t)) {
    throw new RangeError(
      'The value of "n" is out of range. It must be a non-negative number. Received ' +
        t + ".",
    );
  }
  if (e.length === 0) l = t;
  else {for (let n = 0; n < e.length; n++) {
      const r = e[n];
      if (typeof r.setMaxListeners == "function") r.setMaxListeners(t);
      else {throw new TypeError(
          "eventTarget is invalid, must have 'setMaxListeners' method.",
        );}
    }}
}
export {
  b as listenerCount,
  d as init,
  l as defaultMaxListeners,
  N as once,
  o as default,
  o as EventEmitter,
  P as setMaxListeners,
};
