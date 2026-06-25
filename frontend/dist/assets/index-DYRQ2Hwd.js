var Ic = Object.defineProperty;
var Fc = (e, t, n) => (t in e ? Ic(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (e[t] = n));
var Qu = (e, t, n) => Fc(e, typeof t != 'symbol' ? t + '' : t, n);
(function () {
    const t = document.createElement('link').relList;
    if (t && t.supports && t.supports('modulepreload')) return;
    for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l);
    new MutationObserver((l) => {
        for (const o of l)
            if (o.type === 'childList')
                for (const u of o.addedNodes) u.tagName === 'LINK' && u.rel === 'modulepreload' && r(u);
    }).observe(document, { childList: !0, subtree: !0 });
    function n(l) {
        const o = {};
        return (
            l.integrity && (o.integrity = l.integrity),
            l.referrerPolicy && (o.referrerPolicy = l.referrerPolicy),
            l.crossOrigin === 'use-credentials'
                ? (o.credentials = 'include')
                : l.crossOrigin === 'anonymous'
                  ? (o.credentials = 'omit')
                  : (o.credentials = 'same-origin'),
            o
        );
    }
    function r(l) {
        if (l.ep) return;
        l.ep = !0;
        const o = n(l);
        fetch(l.href, o);
    }
})();
var os = { exports: {} },
    pl = {},
    us = { exports: {} },
    I = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var sr = Symbol.for('react.element'),
    Dc = Symbol.for('react.portal'),
    Mc = Symbol.for('react.fragment'),
    $c = Symbol.for('react.strict_mode'),
    Uc = Symbol.for('react.profiler'),
    Bc = Symbol.for('react.provider'),
    Ac = Symbol.for('react.context'),
    Vc = Symbol.for('react.forward_ref'),
    Wc = Symbol.for('react.suspense'),
    Hc = Symbol.for('react.memo'),
    Qc = Symbol.for('react.lazy'),
    Ku = Symbol.iterator;
function Kc(e) {
    return e === null || typeof e != 'object'
        ? null
        : ((e = (Ku && e[Ku]) || e['@@iterator']), typeof e == 'function' ? e : null);
}
var is = {
        isMounted: function () {
            return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
    },
    ss = Object.assign,
    as = {};
function wn(e, t, n) {
    ((this.props = e), (this.context = t), (this.refs = as), (this.updater = n || is));
}
wn.prototype.isReactComponent = {};
wn.prototype.setState = function (e, t) {
    if (typeof e != 'object' && typeof e != 'function' && e != null)
        throw Error(
            'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
        );
    this.updater.enqueueSetState(this, e, t, 'setState');
};
wn.prototype.forceUpdate = function (e) {
    this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
};
function cs() {}
cs.prototype = wn.prototype;
function Zo(e, t, n) {
    ((this.props = e), (this.context = t), (this.refs = as), (this.updater = n || is));
}
var Jo = (Zo.prototype = new cs());
Jo.constructor = Zo;
ss(Jo, wn.prototype);
Jo.isPureReactComponent = !0;
var Yu = Array.isArray,
    fs = Object.prototype.hasOwnProperty,
    qo = { current: null },
    ds = { key: !0, ref: !0, __self: !0, __source: !0 };
function ps(e, t, n) {
    var r,
        l = {},
        o = null,
        u = null;
    if (t != null)
        for (r in (t.ref !== void 0 && (u = t.ref), t.key !== void 0 && (o = '' + t.key), t))
            fs.call(t, r) && !ds.hasOwnProperty(r) && (l[r] = t[r]);
    var i = arguments.length - 2;
    if (i === 1) l.children = n;
    else if (1 < i) {
        for (var s = Array(i), c = 0; c < i; c++) s[c] = arguments[c + 2];
        l.children = s;
    }
    if (e && e.defaultProps) for (r in ((i = e.defaultProps), i)) l[r] === void 0 && (l[r] = i[r]);
    return { $$typeof: sr, type: e, key: o, ref: u, props: l, _owner: qo.current };
}
function Yc(e, t) {
    return { $$typeof: sr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function bo(e) {
    return typeof e == 'object' && e !== null && e.$$typeof === sr;
}
function Gc(e) {
    var t = { '=': '=0', ':': '=2' };
    return (
        '$' +
        e.replace(/[=:]/g, function (n) {
            return t[n];
        })
    );
}
var Gu = /\/+/g;
function Tl(e, t) {
    return typeof e == 'object' && e !== null && e.key != null ? Gc('' + e.key) : t.toString(36);
}
function Rr(e, t, n, r, l) {
    var o = typeof e;
    (o === 'undefined' || o === 'boolean') && (e = null);
    var u = !1;
    if (e === null) u = !0;
    else
        switch (o) {
            case 'string':
            case 'number':
                u = !0;
                break;
            case 'object':
                switch (e.$$typeof) {
                    case sr:
                    case Dc:
                        u = !0;
                }
        }
    if (u)
        return (
            (u = e),
            (l = l(u)),
            (e = r === '' ? '.' + Tl(u, 0) : r),
            Yu(l)
                ? ((n = ''),
                  e != null && (n = e.replace(Gu, '$&/') + '/'),
                  Rr(l, t, n, '', function (c) {
                      return c;
                  }))
                : l != null &&
                  (bo(l) &&
                      (l = Yc(
                          l,
                          n + (!l.key || (u && u.key === l.key) ? '' : ('' + l.key).replace(Gu, '$&/') + '/') + e
                      )),
                  t.push(l)),
            1
        );
    if (((u = 0), (r = r === '' ? '.' : r + ':'), Yu(e)))
        for (var i = 0; i < e.length; i++) {
            o = e[i];
            var s = r + Tl(o, i);
            u += Rr(o, t, n, s, l);
        }
    else if (((s = Kc(e)), typeof s == 'function'))
        for (e = s.call(e), i = 0; !(o = e.next()).done; )
            ((o = o.value), (s = r + Tl(o, i++)), (u += Rr(o, t, n, s, l)));
    else if (o === 'object')
        throw (
            (t = String(e)),
            Error(
                'Objects are not valid as a React child (found: ' +
                    (t === '[object Object]' ? 'object with keys {' + Object.keys(e).join(', ') + '}' : t) +
                    '). If you meant to render a collection of children, use an array instead.'
            )
        );
    return u;
}
function mr(e, t, n) {
    if (e == null) return e;
    var r = [],
        l = 0;
    return (
        Rr(e, r, '', '', function (o) {
            return t.call(n, o, l++);
        }),
        r
    );
}
function Xc(e) {
    if (e._status === -1) {
        var t = e._result;
        ((t = t()),
            t.then(
                function (n) {
                    (e._status === 0 || e._status === -1) && ((e._status = 1), (e._result = n));
                },
                function (n) {
                    (e._status === 0 || e._status === -1) && ((e._status = 2), (e._result = n));
                }
            ),
            e._status === -1 && ((e._status = 0), (e._result = t)));
    }
    if (e._status === 1) return e._result.default;
    throw e._result;
}
var he = { current: null },
    Lr = { transition: null },
    Zc = { ReactCurrentDispatcher: he, ReactCurrentBatchConfig: Lr, ReactCurrentOwner: qo };
function ms() {
    throw Error('act(...) is not supported in production builds of React.');
}
I.Children = {
    map: mr,
    forEach: function (e, t, n) {
        mr(
            e,
            function () {
                t.apply(this, arguments);
            },
            n
        );
    },
    count: function (e) {
        var t = 0;
        return (
            mr(e, function () {
                t++;
            }),
            t
        );
    },
    toArray: function (e) {
        return (
            mr(e, function (t) {
                return t;
            }) || []
        );
    },
    only: function (e) {
        if (!bo(e)) throw Error('React.Children.only expected to receive a single React element child.');
        return e;
    },
};
I.Component = wn;
I.Fragment = Mc;
I.Profiler = Uc;
I.PureComponent = Zo;
I.StrictMode = $c;
I.Suspense = Wc;
I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Zc;
I.act = ms;
I.cloneElement = function (e, t, n) {
    if (e == null)
        throw Error('React.cloneElement(...): The argument must be a React element, but you passed ' + e + '.');
    var r = ss({}, e.props),
        l = e.key,
        o = e.ref,
        u = e._owner;
    if (t != null) {
        if (
            (t.ref !== void 0 && ((o = t.ref), (u = qo.current)),
            t.key !== void 0 && (l = '' + t.key),
            e.type && e.type.defaultProps)
        )
            var i = e.type.defaultProps;
        for (s in t) fs.call(t, s) && !ds.hasOwnProperty(s) && (r[s] = t[s] === void 0 && i !== void 0 ? i[s] : t[s]);
    }
    var s = arguments.length - 2;
    if (s === 1) r.children = n;
    else if (1 < s) {
        i = Array(s);
        for (var c = 0; c < s; c++) i[c] = arguments[c + 2];
        r.children = i;
    }
    return { $$typeof: sr, type: e.type, key: l, ref: o, props: r, _owner: u };
};
I.createContext = function (e) {
    return (
        (e = {
            $$typeof: Ac,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
            _defaultValue: null,
            _globalName: null,
        }),
        (e.Provider = { $$typeof: Bc, _context: e }),
        (e.Consumer = e)
    );
};
I.createElement = ps;
I.createFactory = function (e) {
    var t = ps.bind(null, e);
    return ((t.type = e), t);
};
I.createRef = function () {
    return { current: null };
};
I.forwardRef = function (e) {
    return { $$typeof: Vc, render: e };
};
I.isValidElement = bo;
I.lazy = function (e) {
    return { $$typeof: Qc, _payload: { _status: -1, _result: e }, _init: Xc };
};
I.memo = function (e, t) {
    return { $$typeof: Hc, type: e, compare: t === void 0 ? null : t };
};
I.startTransition = function (e) {
    var t = Lr.transition;
    Lr.transition = {};
    try {
        e();
    } finally {
        Lr.transition = t;
    }
};
I.unstable_act = ms;
I.useCallback = function (e, t) {
    return he.current.useCallback(e, t);
};
I.useContext = function (e) {
    return he.current.useContext(e);
};
I.useDebugValue = function () {};
I.useDeferredValue = function (e) {
    return he.current.useDeferredValue(e);
};
I.useEffect = function (e, t) {
    return he.current.useEffect(e, t);
};
I.useId = function () {
    return he.current.useId();
};
I.useImperativeHandle = function (e, t, n) {
    return he.current.useImperativeHandle(e, t, n);
};
I.useInsertionEffect = function (e, t) {
    return he.current.useInsertionEffect(e, t);
};
I.useLayoutEffect = function (e, t) {
    return he.current.useLayoutEffect(e, t);
};
I.useMemo = function (e, t) {
    return he.current.useMemo(e, t);
};
I.useReducer = function (e, t, n) {
    return he.current.useReducer(e, t, n);
};
I.useRef = function (e) {
    return he.current.useRef(e);
};
I.useState = function (e) {
    return he.current.useState(e);
};
I.useSyncExternalStore = function (e, t, n) {
    return he.current.useSyncExternalStore(e, t, n);
};
I.useTransition = function () {
    return he.current.useTransition();
};
I.version = '18.3.1';
us.exports = I;
var O = us.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Jc = O,
    qc = Symbol.for('react.element'),
    bc = Symbol.for('react.fragment'),
    ef = Object.prototype.hasOwnProperty,
    tf = Jc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    nf = { key: !0, ref: !0, __self: !0, __source: !0 };
function hs(e, t, n) {
    var r,
        l = {},
        o = null,
        u = null;
    (n !== void 0 && (o = '' + n), t.key !== void 0 && (o = '' + t.key), t.ref !== void 0 && (u = t.ref));
    for (r in t) ef.call(t, r) && !nf.hasOwnProperty(r) && (l[r] = t[r]);
    if (e && e.defaultProps) for (r in ((t = e.defaultProps), t)) l[r] === void 0 && (l[r] = t[r]);
    return { $$typeof: qc, type: e, key: o, ref: u, props: l, _owner: tf.current };
}
pl.Fragment = bc;
pl.jsx = hs;
pl.jsxs = hs;
os.exports = pl;
var y = os.exports,
    vs = { exports: {} },
    Pe = {},
    ys = { exports: {} },
    gs = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
    function t(E, z) {
        var T = E.length;
        E.push(z);
        e: for (; 0 < T; ) {
            var $ = (T - 1) >>> 1,
                G = E[$];
            if (0 < l(G, z)) ((E[$] = z), (E[T] = G), (T = $));
            else break e;
        }
    }
    function n(E) {
        return E.length === 0 ? null : E[0];
    }
    function r(E) {
        if (E.length === 0) return null;
        var z = E[0],
            T = E.pop();
        if (T !== z) {
            E[0] = T;
            e: for (var $ = 0, G = E.length, X = G >>> 1; $ < X; ) {
                var He = 2 * ($ + 1) - 1,
                    Qe = E[He],
                    xe = He + 1,
                    Fe = E[xe];
                if (0 > l(Qe, T))
                    xe < G && 0 > l(Fe, Qe)
                        ? ((E[$] = Fe), (E[xe] = T), ($ = xe))
                        : ((E[$] = Qe), (E[He] = T), ($ = He));
                else if (xe < G && 0 > l(Fe, T)) ((E[$] = Fe), (E[xe] = T), ($ = xe));
                else break e;
            }
        }
        return z;
    }
    function l(E, z) {
        var T = E.sortIndex - z.sortIndex;
        return T !== 0 ? T : E.id - z.id;
    }
    if (typeof performance == 'object' && typeof performance.now == 'function') {
        var o = performance;
        e.unstable_now = function () {
            return o.now();
        };
    } else {
        var u = Date,
            i = u.now();
        e.unstable_now = function () {
            return u.now() - i;
        };
    }
    var s = [],
        c = [],
        h = 1,
        m = null,
        p = 3,
        w = !1,
        S = !1,
        k = !1,
        D = typeof setTimeout == 'function' ? setTimeout : null,
        f = typeof clearTimeout == 'function' ? clearTimeout : null,
        a = typeof setImmediate < 'u' ? setImmediate : null;
    typeof navigator < 'u' &&
        navigator.scheduling !== void 0 &&
        navigator.scheduling.isInputPending !== void 0 &&
        navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function d(E) {
        for (var z = n(c); z !== null; ) {
            if (z.callback === null) r(c);
            else if (z.startTime <= E) (r(c), (z.sortIndex = z.expirationTime), t(s, z));
            else break;
            z = n(c);
        }
    }
    function v(E) {
        if (((k = !1), d(E), !S))
            if (n(s) !== null) ((S = !0), xn(x));
            else {
                var z = n(c);
                z !== null && Ht(v, z.startTime - E);
            }
    }
    function x(E, z) {
        ((S = !1), k && ((k = !1), f(j), (j = -1)), (w = !0));
        var T = p;
        try {
            for (d(z), m = n(s); m !== null && (!(m.expirationTime > z) || (E && !de())); ) {
                var $ = m.callback;
                if (typeof $ == 'function') {
                    ((m.callback = null), (p = m.priorityLevel));
                    var G = $(m.expirationTime <= z);
                    ((z = e.unstable_now()), typeof G == 'function' ? (m.callback = G) : m === n(s) && r(s), d(z));
                } else r(s);
                m = n(s);
            }
            if (m !== null) var X = !0;
            else {
                var He = n(c);
                (He !== null && Ht(v, He.startTime - z), (X = !1));
            }
            return X;
        } finally {
            ((m = null), (p = T), (w = !1));
        }
    }
    var P = !1,
        C = null,
        j = -1,
        V = 5,
        R = -1;
    function de() {
        return !(e.unstable_now() - R < V);
    }
    function zt() {
        if (C !== null) {
            var E = e.unstable_now();
            R = E;
            var z = !0;
            try {
                z = C(!0, E);
            } finally {
                z ? We() : ((P = !1), (C = null));
            }
        } else P = !1;
    }
    var We;
    if (typeof a == 'function')
        We = function () {
            a(zt);
        };
    else if (typeof MessageChannel < 'u') {
        var pr = new MessageChannel(),
            zl = pr.port2;
        ((pr.port1.onmessage = zt),
            (We = function () {
                zl.postMessage(null);
            }));
    } else
        We = function () {
            D(zt, 0);
        };
    function xn(E) {
        ((C = E), P || ((P = !0), We()));
    }
    function Ht(E, z) {
        j = D(function () {
            E(e.unstable_now());
        }, z);
    }
    ((e.unstable_IdlePriority = 5),
        (e.unstable_ImmediatePriority = 1),
        (e.unstable_LowPriority = 4),
        (e.unstable_NormalPriority = 3),
        (e.unstable_Profiling = null),
        (e.unstable_UserBlockingPriority = 2),
        (e.unstable_cancelCallback = function (E) {
            E.callback = null;
        }),
        (e.unstable_continueExecution = function () {
            S || w || ((S = !0), xn(x));
        }),
        (e.unstable_forceFrameRate = function (E) {
            0 > E || 125 < E
                ? console.error(
                      'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                  )
                : (V = 0 < E ? Math.floor(1e3 / E) : 5);
        }),
        (e.unstable_getCurrentPriorityLevel = function () {
            return p;
        }),
        (e.unstable_getFirstCallbackNode = function () {
            return n(s);
        }),
        (e.unstable_next = function (E) {
            switch (p) {
                case 1:
                case 2:
                case 3:
                    var z = 3;
                    break;
                default:
                    z = p;
            }
            var T = p;
            p = z;
            try {
                return E();
            } finally {
                p = T;
            }
        }),
        (e.unstable_pauseExecution = function () {}),
        (e.unstable_requestPaint = function () {}),
        (e.unstable_runWithPriority = function (E, z) {
            switch (E) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                default:
                    E = 3;
            }
            var T = p;
            p = E;
            try {
                return z();
            } finally {
                p = T;
            }
        }),
        (e.unstable_scheduleCallback = function (E, z, T) {
            var $ = e.unstable_now();
            switch (
                (typeof T == 'object' && T !== null
                    ? ((T = T.delay), (T = typeof T == 'number' && 0 < T ? $ + T : $))
                    : (T = $),
                E)
            ) {
                case 1:
                    var G = -1;
                    break;
                case 2:
                    G = 250;
                    break;
                case 5:
                    G = 1073741823;
                    break;
                case 4:
                    G = 1e4;
                    break;
                default:
                    G = 5e3;
            }
            return (
                (G = T + G),
                (E = { id: h++, callback: z, priorityLevel: E, startTime: T, expirationTime: G, sortIndex: -1 }),
                T > $
                    ? ((E.sortIndex = T),
                      t(c, E),
                      n(s) === null && E === n(c) && (k ? (f(j), (j = -1)) : (k = !0), Ht(v, T - $)))
                    : ((E.sortIndex = G), t(s, E), S || w || ((S = !0), xn(x))),
                E
            );
        }),
        (e.unstable_shouldYield = de),
        (e.unstable_wrapCallback = function (E) {
            var z = p;
            return function () {
                var T = p;
                p = z;
                try {
                    return E.apply(this, arguments);
                } finally {
                    p = T;
                }
            };
        }));
})(gs);
ys.exports = gs;
var rf = ys.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var lf = O,
    Ne = rf;
function g(e) {
    for (var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e, n = 1; n < arguments.length; n++)
        t += '&args[]=' + encodeURIComponent(arguments[n]);
    return (
        'Minified React error #' +
        e +
        '; visit ' +
        t +
        ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
}
var ws = new Set(),
    Qn = {};
function Vt(e, t) {
    (dn(e, t), dn(e + 'Capture', t));
}
function dn(e, t) {
    for (Qn[e] = t, e = 0; e < t.length; e++) ws.add(t[e]);
}
var rt = !(typeof window > 'u' || typeof window.document > 'u' || typeof window.document.createElement > 'u'),
    ro = Object.prototype.hasOwnProperty,
    of =
        /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    Xu = {},
    Zu = {};
function uf(e) {
    return ro.call(Zu, e) ? !0 : ro.call(Xu, e) ? !1 : of.test(e) ? (Zu[e] = !0) : ((Xu[e] = !0), !1);
}
function sf(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
        case 'function':
        case 'symbol':
            return !0;
        case 'boolean':
            return r
                ? !1
                : n !== null
                  ? !n.acceptsBooleans
                  : ((e = e.toLowerCase().slice(0, 5)), e !== 'data-' && e !== 'aria-');
        default:
            return !1;
    }
}
function af(e, t, n, r) {
    if (t === null || typeof t > 'u' || sf(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null)
        switch (n.type) {
            case 3:
                return !t;
            case 4:
                return t === !1;
            case 5:
                return isNaN(t);
            case 6:
                return isNaN(t) || 1 > t;
        }
    return !1;
}
function ve(e, t, n, r, l, o, u) {
    ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
        (this.attributeName = r),
        (this.attributeNamespace = l),
        (this.mustUseProperty = n),
        (this.propertyName = e),
        (this.type = t),
        (this.sanitizeURL = o),
        (this.removeEmptyString = u));
}
var ie = {};
'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
    .split(' ')
    .forEach(function (e) {
        ie[e] = new ve(e, 0, !1, e, null, !1, !1);
    });
[
    ['acceptCharset', 'accept-charset'],
    ['className', 'class'],
    ['htmlFor', 'for'],
    ['httpEquiv', 'http-equiv'],
].forEach(function (e) {
    var t = e[0];
    ie[t] = new ve(t, 1, !1, e[1], null, !1, !1);
});
['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (e) {
    ie[e] = new ve(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
['autoReverse', 'externalResourcesRequired', 'focusable', 'preserveAlpha'].forEach(function (e) {
    ie[e] = new ve(e, 2, !1, e, null, !1, !1);
});
'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
    .split(' ')
    .forEach(function (e) {
        ie[e] = new ve(e, 3, !1, e.toLowerCase(), null, !1, !1);
    });
['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
    ie[e] = new ve(e, 3, !0, e, null, !1, !1);
});
['capture', 'download'].forEach(function (e) {
    ie[e] = new ve(e, 4, !1, e, null, !1, !1);
});
['cols', 'rows', 'size', 'span'].forEach(function (e) {
    ie[e] = new ve(e, 6, !1, e, null, !1, !1);
});
['rowSpan', 'start'].forEach(function (e) {
    ie[e] = new ve(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var eu = /[\-:]([a-z])/g;
function tu(e) {
    return e[1].toUpperCase();
}
'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
    .split(' ')
    .forEach(function (e) {
        var t = e.replace(eu, tu);
        ie[t] = new ve(t, 1, !1, e, null, !1, !1);
    });
'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'.split(' ').forEach(function (e) {
    var t = e.replace(eu, tu);
    ie[t] = new ve(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
});
['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
    var t = e.replace(eu, tu);
    ie[t] = new ve(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1);
});
['tabIndex', 'crossOrigin'].forEach(function (e) {
    ie[e] = new ve(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ie.xlinkHref = new ve('xlinkHref', 1, !1, 'xlink:href', 'http://www.w3.org/1999/xlink', !0, !1);
['src', 'href', 'action', 'formAction'].forEach(function (e) {
    ie[e] = new ve(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function nu(e, t, n, r) {
    var l = ie.hasOwnProperty(t) ? ie[t] : null;
    (l !== null
        ? l.type !== 0
        : r || !(2 < t.length) || (t[0] !== 'o' && t[0] !== 'O') || (t[1] !== 'n' && t[1] !== 'N')) &&
        (af(t, n, l, r) && (n = null),
        r || l === null
            ? uf(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, '' + n))
            : l.mustUseProperty
              ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : '') : n)
              : ((t = l.attributeName),
                (r = l.attributeNamespace),
                n === null
                    ? e.removeAttribute(t)
                    : ((l = l.type),
                      (n = l === 3 || (l === 4 && n === !0) ? '' : '' + n),
                      r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var it = lf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    hr = Symbol.for('react.element'),
    Yt = Symbol.for('react.portal'),
    Gt = Symbol.for('react.fragment'),
    ru = Symbol.for('react.strict_mode'),
    lo = Symbol.for('react.profiler'),
    Ss = Symbol.for('react.provider'),
    ks = Symbol.for('react.context'),
    lu = Symbol.for('react.forward_ref'),
    oo = Symbol.for('react.suspense'),
    uo = Symbol.for('react.suspense_list'),
    ou = Symbol.for('react.memo'),
    at = Symbol.for('react.lazy'),
    xs = Symbol.for('react.offscreen'),
    Ju = Symbol.iterator;
function En(e) {
    return e === null || typeof e != 'object'
        ? null
        : ((e = (Ju && e[Ju]) || e['@@iterator']), typeof e == 'function' ? e : null);
}
var K = Object.assign,
    Rl;
function Ln(e) {
    if (Rl === void 0)
        try {
            throw Error();
        } catch (n) {
            var t = n.stack.trim().match(/\n( *(at )?)/);
            Rl = (t && t[1]) || '';
        }
    return (
        `
` +
        Rl +
        e
    );
}
var Ll = !1;
function Ol(e, t) {
    if (!e || Ll) return '';
    Ll = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (t)
            if (
                ((t = function () {
                    throw Error();
                }),
                Object.defineProperty(t.prototype, 'props', {
                    set: function () {
                        throw Error();
                    },
                }),
                typeof Reflect == 'object' && Reflect.construct)
            ) {
                try {
                    Reflect.construct(t, []);
                } catch (c) {
                    var r = c;
                }
                Reflect.construct(e, [], t);
            } else {
                try {
                    t.call();
                } catch (c) {
                    r = c;
                }
                e.call(t.prototype);
            }
        else {
            try {
                throw Error();
            } catch (c) {
                r = c;
            }
            e();
        }
    } catch (c) {
        if (c && r && typeof c.stack == 'string') {
            for (
                var l = c.stack.split(`
`),
                    o = r.stack.split(`
`),
                    u = l.length - 1,
                    i = o.length - 1;
                1 <= u && 0 <= i && l[u] !== o[i];
            )
                i--;
            for (; 1 <= u && 0 <= i; u--, i--)
                if (l[u] !== o[i]) {
                    if (u !== 1 || i !== 1)
                        do
                            if ((u--, i--, 0 > i || l[u] !== o[i])) {
                                var s =
                                    `
` + l[u].replace(' at new ', ' at ');
                                return (
                                    e.displayName &&
                                        s.includes('<anonymous>') &&
                                        (s = s.replace('<anonymous>', e.displayName)),
                                    s
                                );
                            }
                        while (1 <= u && 0 <= i);
                    break;
                }
        }
    } finally {
        ((Ll = !1), (Error.prepareStackTrace = n));
    }
    return (e = e ? e.displayName || e.name : '') ? Ln(e) : '';
}
function cf(e) {
    switch (e.tag) {
        case 5:
            return Ln(e.type);
        case 16:
            return Ln('Lazy');
        case 13:
            return Ln('Suspense');
        case 19:
            return Ln('SuspenseList');
        case 0:
        case 2:
        case 15:
            return ((e = Ol(e.type, !1)), e);
        case 11:
            return ((e = Ol(e.type.render, !1)), e);
        case 1:
            return ((e = Ol(e.type, !0)), e);
        default:
            return '';
    }
}
function io(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
        case Gt:
            return 'Fragment';
        case Yt:
            return 'Portal';
        case lo:
            return 'Profiler';
        case ru:
            return 'StrictMode';
        case oo:
            return 'Suspense';
        case uo:
            return 'SuspenseList';
    }
    if (typeof e == 'object')
        switch (e.$$typeof) {
            case ks:
                return (e.displayName || 'Context') + '.Consumer';
            case Ss:
                return (e._context.displayName || 'Context') + '.Provider';
            case lu:
                var t = e.render;
                return (
                    (e = e.displayName),
                    e || ((e = t.displayName || t.name || ''), (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
                    e
                );
            case ou:
                return ((t = e.displayName || null), t !== null ? t : io(e.type) || 'Memo');
            case at:
                ((t = e._payload), (e = e._init));
                try {
                    return io(e(t));
                } catch {}
        }
    return null;
}
function ff(e) {
    var t = e.type;
    switch (e.tag) {
        case 24:
            return 'Cache';
        case 9:
            return (t.displayName || 'Context') + '.Consumer';
        case 10:
            return (t._context.displayName || 'Context') + '.Provider';
        case 18:
            return 'DehydratedFragment';
        case 11:
            return (
                (e = t.render),
                (e = e.displayName || e.name || ''),
                t.displayName || (e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')
            );
        case 7:
            return 'Fragment';
        case 5:
            return t;
        case 4:
            return 'Portal';
        case 3:
            return 'Root';
        case 6:
            return 'Text';
        case 16:
            return io(t);
        case 8:
            return t === ru ? 'StrictMode' : 'Mode';
        case 22:
            return 'Offscreen';
        case 12:
            return 'Profiler';
        case 21:
            return 'Scope';
        case 13:
            return 'Suspense';
        case 19:
            return 'SuspenseList';
        case 25:
            return 'TracingMarker';
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
            if (typeof t == 'function') return t.displayName || t.name || null;
            if (typeof t == 'string') return t;
    }
    return null;
}
function Et(e) {
    switch (typeof e) {
        case 'boolean':
        case 'number':
        case 'string':
        case 'undefined':
            return e;
        case 'object':
            return e;
        default:
            return '';
    }
}
function Es(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
}
function df(e) {
    var t = Es(e) ? 'checked' : 'value',
        n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
        r = '' + e[t];
    if (!e.hasOwnProperty(t) && typeof n < 'u' && typeof n.get == 'function' && typeof n.set == 'function') {
        var l = n.get,
            o = n.set;
        return (
            Object.defineProperty(e, t, {
                configurable: !0,
                get: function () {
                    return l.call(this);
                },
                set: function (u) {
                    ((r = '' + u), o.call(this, u));
                },
            }),
            Object.defineProperty(e, t, { enumerable: n.enumerable }),
            {
                getValue: function () {
                    return r;
                },
                setValue: function (u) {
                    r = '' + u;
                },
                stopTracking: function () {
                    ((e._valueTracker = null), delete e[t]);
                },
            }
        );
    }
}
function vr(e) {
    e._valueTracker || (e._valueTracker = df(e));
}
function _s(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
        r = '';
    return (e && (r = Es(e) ? (e.checked ? 'true' : 'false') : e.value), (e = r), e !== n ? (t.setValue(e), !0) : !1);
}
function Wr(e) {
    if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
    try {
        return e.activeElement || e.body;
    } catch {
        return e.body;
    }
}
function so(e, t) {
    var n = t.checked;
    return K({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked,
    });
}
function qu(e, t) {
    var n = t.defaultValue == null ? '' : t.defaultValue,
        r = t.checked != null ? t.checked : t.defaultChecked;
    ((n = Et(t.value != null ? t.value : n)),
        (e._wrapperState = {
            initialChecked: r,
            initialValue: n,
            controlled: t.type === 'checkbox' || t.type === 'radio' ? t.checked != null : t.value != null,
        }));
}
function Cs(e, t) {
    ((t = t.checked), t != null && nu(e, 'checked', t, !1));
}
function ao(e, t) {
    Cs(e, t);
    var n = Et(t.value),
        r = t.type;
    if (n != null)
        r === 'number'
            ? ((n === 0 && e.value === '') || e.value != n) && (e.value = '' + n)
            : e.value !== '' + n && (e.value = '' + n);
    else if (r === 'submit' || r === 'reset') {
        e.removeAttribute('value');
        return;
    }
    (t.hasOwnProperty('value')
        ? co(e, t.type, n)
        : t.hasOwnProperty('defaultValue') && co(e, t.type, Et(t.defaultValue)),
        t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked));
}
function bu(e, t, n) {
    if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
        var r = t.type;
        if (!((r !== 'submit' && r !== 'reset') || (t.value !== void 0 && t.value !== null))) return;
        ((t = '' + e._wrapperState.initialValue), n || t === e.value || (e.value = t), (e.defaultValue = t));
    }
    ((n = e.name),
        n !== '' && (e.name = ''),
        (e.defaultChecked = !!e._wrapperState.initialChecked),
        n !== '' && (e.name = n));
}
function co(e, t, n) {
    (t !== 'number' || Wr(e.ownerDocument) !== e) &&
        (n == null
            ? (e.defaultValue = '' + e._wrapperState.initialValue)
            : e.defaultValue !== '' + n && (e.defaultValue = '' + n));
}
var On = Array.isArray;
function on(e, t, n, r) {
    if (((e = e.options), t)) {
        t = {};
        for (var l = 0; l < n.length; l++) t['$' + n[l]] = !0;
        for (n = 0; n < e.length; n++)
            ((l = t.hasOwnProperty('$' + e[n].value)),
                e[n].selected !== l && (e[n].selected = l),
                l && r && (e[n].defaultSelected = !0));
    } else {
        for (n = '' + Et(n), t = null, l = 0; l < e.length; l++) {
            if (e[l].value === n) {
                ((e[l].selected = !0), r && (e[l].defaultSelected = !0));
                return;
            }
            t !== null || e[l].disabled || (t = e[l]);
        }
        t !== null && (t.selected = !0);
    }
}
function fo(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(g(91));
    return K({}, t, { value: void 0, defaultValue: void 0, children: '' + e._wrapperState.initialValue });
}
function ei(e, t) {
    var n = t.value;
    if (n == null) {
        if (((n = t.children), (t = t.defaultValue), n != null)) {
            if (t != null) throw Error(g(92));
            if (On(n)) {
                if (1 < n.length) throw Error(g(93));
                n = n[0];
            }
            t = n;
        }
        (t == null && (t = ''), (n = t));
    }
    e._wrapperState = { initialValue: Et(n) };
}
function Ns(e, t) {
    var n = Et(t.value),
        r = Et(t.defaultValue);
    (n != null &&
        ((n = '' + n),
        n !== e.value && (e.value = n),
        t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
        r != null && (e.defaultValue = '' + r));
}
function ti(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== '' && t !== null && (e.value = t);
}
function Ps(e) {
    switch (e) {
        case 'svg':
            return 'http://www.w3.org/2000/svg';
        case 'math':
            return 'http://www.w3.org/1998/Math/MathML';
        default:
            return 'http://www.w3.org/1999/xhtml';
    }
}
function po(e, t) {
    return e == null || e === 'http://www.w3.org/1999/xhtml'
        ? Ps(t)
        : e === 'http://www.w3.org/2000/svg' && t === 'foreignObject'
          ? 'http://www.w3.org/1999/xhtml'
          : e;
}
var yr,
    js = (function (e) {
        return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
            ? function (t, n, r, l) {
                  MSApp.execUnsafeLocalFunction(function () {
                      return e(t, n, r, l);
                  });
              }
            : e;
    })(function (e, t) {
        if (e.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in e) e.innerHTML = t;
        else {
            for (
                yr = yr || document.createElement('div'),
                    yr.innerHTML = '<svg>' + t.valueOf().toString() + '</svg>',
                    t = yr.firstChild;
                e.firstChild;
            )
                e.removeChild(e.firstChild);
            for (; t.firstChild; ) e.appendChild(t.firstChild);
        }
    });
function Kn(e, t) {
    if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return;
        }
    }
    e.textContent = t;
}
var Dn = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0,
    },
    pf = ['Webkit', 'ms', 'Moz', 'O'];
Object.keys(Dn).forEach(function (e) {
    pf.forEach(function (t) {
        ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Dn[t] = Dn[e]));
    });
});
function zs(e, t, n) {
    return t == null || typeof t == 'boolean' || t === ''
        ? ''
        : n || typeof t != 'number' || t === 0 || (Dn.hasOwnProperty(e) && Dn[e])
          ? ('' + t).trim()
          : t + 'px';
}
function Ts(e, t) {
    e = e.style;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = n.indexOf('--') === 0,
                l = zs(n, t[n], r);
            (n === 'float' && (n = 'cssFloat'), r ? e.setProperty(n, l) : (e[n] = l));
        }
}
var mf = K(
    { menuitem: !0 },
    {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0,
    }
);
function mo(e, t) {
    if (t) {
        if (mf[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(g(137, e));
        if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null) throw Error(g(60));
            if (typeof t.dangerouslySetInnerHTML != 'object' || !('__html' in t.dangerouslySetInnerHTML))
                throw Error(g(61));
        }
        if (t.style != null && typeof t.style != 'object') throw Error(g(62));
    }
}
function ho(e, t) {
    if (e.indexOf('-') === -1) return typeof t.is == 'string';
    switch (e) {
        case 'annotation-xml':
        case 'color-profile':
        case 'font-face':
        case 'font-face-src':
        case 'font-face-uri':
        case 'font-face-format':
        case 'font-face-name':
        case 'missing-glyph':
            return !1;
        default:
            return !0;
    }
}
var vo = null;
function uu(e) {
    return (
        (e = e.target || e.srcElement || window),
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
    );
}
var yo = null,
    un = null,
    sn = null;
function ni(e) {
    if ((e = fr(e))) {
        if (typeof yo != 'function') throw Error(g(280));
        var t = e.stateNode;
        t && ((t = gl(t)), yo(e.stateNode, e.type, t));
    }
}
function Rs(e) {
    un ? (sn ? sn.push(e) : (sn = [e])) : (un = e);
}
function Ls() {
    if (un) {
        var e = un,
            t = sn;
        if (((sn = un = null), ni(e), t)) for (e = 0; e < t.length; e++) ni(t[e]);
    }
}
function Os(e, t) {
    return e(t);
}
function Is() {}
var Il = !1;
function Fs(e, t, n) {
    if (Il) return e(t, n);
    Il = !0;
    try {
        return Os(e, t, n);
    } finally {
        ((Il = !1), (un !== null || sn !== null) && (Is(), Ls()));
    }
}
function Yn(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = gl(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
        case 'onClick':
        case 'onClickCapture':
        case 'onDoubleClick':
        case 'onDoubleClickCapture':
        case 'onMouseDown':
        case 'onMouseDownCapture':
        case 'onMouseMove':
        case 'onMouseMoveCapture':
        case 'onMouseUp':
        case 'onMouseUpCapture':
        case 'onMouseEnter':
            ((r = !r.disabled) ||
                ((e = e.type), (r = !(e === 'button' || e === 'input' || e === 'select' || e === 'textarea'))),
                (e = !r));
            break e;
        default:
            e = !1;
    }
    if (e) return null;
    if (n && typeof n != 'function') throw Error(g(231, t, typeof n));
    return n;
}
var go = !1;
if (rt)
    try {
        var _n = {};
        (Object.defineProperty(_n, 'passive', {
            get: function () {
                go = !0;
            },
        }),
            window.addEventListener('test', _n, _n),
            window.removeEventListener('test', _n, _n));
    } catch {
        go = !1;
    }
function hf(e, t, n, r, l, o, u, i, s) {
    var c = Array.prototype.slice.call(arguments, 3);
    try {
        t.apply(n, c);
    } catch (h) {
        this.onError(h);
    }
}
var Mn = !1,
    Hr = null,
    Qr = !1,
    wo = null,
    vf = {
        onError: function (e) {
            ((Mn = !0), (Hr = e));
        },
    };
function yf(e, t, n, r, l, o, u, i, s) {
    ((Mn = !1), (Hr = null), hf.apply(vf, arguments));
}
function gf(e, t, n, r, l, o, u, i, s) {
    if ((yf.apply(this, arguments), Mn)) {
        if (Mn) {
            var c = Hr;
            ((Mn = !1), (Hr = null));
        } else throw Error(g(198));
        Qr || ((Qr = !0), (wo = c));
    }
}
function Wt(e) {
    var t = e,
        n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
        e = t;
        do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return));
        while (e);
    }
    return t.tag === 3 ? n : null;
}
function Ds(e) {
    if (e.tag === 13) {
        var t = e.memoizedState;
        if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null)) return t.dehydrated;
    }
    return null;
}
function ri(e) {
    if (Wt(e) !== e) throw Error(g(188));
}
function wf(e) {
    var t = e.alternate;
    if (!t) {
        if (((t = Wt(e)), t === null)) throw Error(g(188));
        return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
        var l = n.return;
        if (l === null) break;
        var o = l.alternate;
        if (o === null) {
            if (((r = l.return), r !== null)) {
                n = r;
                continue;
            }
            break;
        }
        if (l.child === o.child) {
            for (o = l.child; o; ) {
                if (o === n) return (ri(l), e);
                if (o === r) return (ri(l), t);
                o = o.sibling;
            }
            throw Error(g(188));
        }
        if (n.return !== r.return) ((n = l), (r = o));
        else {
            for (var u = !1, i = l.child; i; ) {
                if (i === n) {
                    ((u = !0), (n = l), (r = o));
                    break;
                }
                if (i === r) {
                    ((u = !0), (r = l), (n = o));
                    break;
                }
                i = i.sibling;
            }
            if (!u) {
                for (i = o.child; i; ) {
                    if (i === n) {
                        ((u = !0), (n = o), (r = l));
                        break;
                    }
                    if (i === r) {
                        ((u = !0), (r = o), (n = l));
                        break;
                    }
                    i = i.sibling;
                }
                if (!u) throw Error(g(189));
            }
        }
        if (n.alternate !== r) throw Error(g(190));
    }
    if (n.tag !== 3) throw Error(g(188));
    return n.stateNode.current === n ? e : t;
}
function Ms(e) {
    return ((e = wf(e)), e !== null ? $s(e) : null);
}
function $s(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
        var t = $s(e);
        if (t !== null) return t;
        e = e.sibling;
    }
    return null;
}
var Us = Ne.unstable_scheduleCallback,
    li = Ne.unstable_cancelCallback,
    Sf = Ne.unstable_shouldYield,
    kf = Ne.unstable_requestPaint,
    J = Ne.unstable_now,
    xf = Ne.unstable_getCurrentPriorityLevel,
    iu = Ne.unstable_ImmediatePriority,
    Bs = Ne.unstable_UserBlockingPriority,
    Kr = Ne.unstable_NormalPriority,
    Ef = Ne.unstable_LowPriority,
    As = Ne.unstable_IdlePriority,
    ml = null,
    Ze = null;
function _f(e) {
    if (Ze && typeof Ze.onCommitFiberRoot == 'function')
        try {
            Ze.onCommitFiberRoot(ml, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
}
var Be = Math.clz32 ? Math.clz32 : Pf,
    Cf = Math.log,
    Nf = Math.LN2;
function Pf(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((Cf(e) / Nf) | 0)) | 0);
}
var gr = 64,
    wr = 4194304;
function In(e) {
    switch (e & -e) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 4:
            return 4;
        case 8:
            return 8;
        case 16:
            return 16;
        case 32:
            return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return e & 130023424;
        case 134217728:
            return 134217728;
        case 268435456:
            return 268435456;
        case 536870912:
            return 536870912;
        case 1073741824:
            return 1073741824;
        default:
            return e;
    }
}
function Yr(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0,
        l = e.suspendedLanes,
        o = e.pingedLanes,
        u = n & 268435455;
    if (u !== 0) {
        var i = u & ~l;
        i !== 0 ? (r = In(i)) : ((o &= u), o !== 0 && (r = In(o)));
    } else ((u = n & ~l), u !== 0 ? (r = In(u)) : o !== 0 && (r = In(o)));
    if (r === 0) return 0;
    if (t !== 0 && t !== r && !(t & l) && ((l = r & -r), (o = t & -t), l >= o || (l === 16 && (o & 4194240) !== 0)))
        return t;
    if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
        for (e = e.entanglements, t &= r; 0 < t; ) ((n = 31 - Be(t)), (l = 1 << n), (r |= e[n]), (t &= ~l));
    return r;
}
function jf(e, t) {
    switch (e) {
        case 1:
        case 2:
        case 4:
            return t + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
            return -1;
        default:
            return -1;
    }
}
function zf(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
        var u = 31 - Be(o),
            i = 1 << u,
            s = l[u];
        (s === -1 ? (!(i & n) || i & r) && (l[u] = jf(i, t)) : s <= t && (e.expiredLanes |= i), (o &= ~i));
    }
}
function So(e) {
    return ((e = e.pendingLanes & -1073741825), e !== 0 ? e : e & 1073741824 ? 1073741824 : 0);
}
function Vs() {
    var e = gr;
    return ((gr <<= 1), !(gr & 4194240) && (gr = 64), e);
}
function Fl(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
}
function ar(e, t, n) {
    ((e.pendingLanes |= t),
        t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
        (e = e.eventTimes),
        (t = 31 - Be(t)),
        (e[t] = n));
}
function Tf(e, t) {
    var n = e.pendingLanes & ~t;
    ((e.pendingLanes = t),
        (e.suspendedLanes = 0),
        (e.pingedLanes = 0),
        (e.expiredLanes &= t),
        (e.mutableReadLanes &= t),
        (e.entangledLanes &= t),
        (t = e.entanglements));
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
        var l = 31 - Be(n),
            o = 1 << l;
        ((t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~o));
    }
}
function su(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
        var r = 31 - Be(n),
            l = 1 << r;
        ((l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l));
    }
}
var M = 0;
function Ws(e) {
    return ((e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1);
}
var Hs,
    au,
    Qs,
    Ks,
    Ys,
    ko = !1,
    Sr = [],
    ht = null,
    vt = null,
    yt = null,
    Gn = new Map(),
    Xn = new Map(),
    ft = [],
    Rf =
        'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
            ' '
        );
function oi(e, t) {
    switch (e) {
        case 'focusin':
        case 'focusout':
            ht = null;
            break;
        case 'dragenter':
        case 'dragleave':
            vt = null;
            break;
        case 'mouseover':
        case 'mouseout':
            yt = null;
            break;
        case 'pointerover':
        case 'pointerout':
            Gn.delete(t.pointerId);
            break;
        case 'gotpointercapture':
        case 'lostpointercapture':
            Xn.delete(t.pointerId);
    }
}
function Cn(e, t, n, r, l, o) {
    return e === null || e.nativeEvent !== o
        ? ((e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }),
          t !== null && ((t = fr(t)), t !== null && au(t)),
          e)
        : ((e.eventSystemFlags |= r), (t = e.targetContainers), l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Lf(e, t, n, r, l) {
    switch (t) {
        case 'focusin':
            return ((ht = Cn(ht, e, t, n, r, l)), !0);
        case 'dragenter':
            return ((vt = Cn(vt, e, t, n, r, l)), !0);
        case 'mouseover':
            return ((yt = Cn(yt, e, t, n, r, l)), !0);
        case 'pointerover':
            var o = l.pointerId;
            return (Gn.set(o, Cn(Gn.get(o) || null, e, t, n, r, l)), !0);
        case 'gotpointercapture':
            return ((o = l.pointerId), Xn.set(o, Cn(Xn.get(o) || null, e, t, n, r, l)), !0);
    }
    return !1;
}
function Gs(e) {
    var t = Lt(e.target);
    if (t !== null) {
        var n = Wt(t);
        if (n !== null) {
            if (((t = n.tag), t === 13)) {
                if (((t = Ds(n)), t !== null)) {
                    ((e.blockedOn = t),
                        Ys(e.priority, function () {
                            Qs(n);
                        }));
                    return;
                }
            } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
                e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                return;
            }
        }
    }
    e.blockedOn = null;
}
function Or(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
        var n = xo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type, n);
            ((vo = r), n.target.dispatchEvent(r), (vo = null));
        } else return ((t = fr(n)), t !== null && au(t), (e.blockedOn = n), !1);
        t.shift();
    }
    return !0;
}
function ui(e, t, n) {
    Or(e) && n.delete(t);
}
function Of() {
    ((ko = !1),
        ht !== null && Or(ht) && (ht = null),
        vt !== null && Or(vt) && (vt = null),
        yt !== null && Or(yt) && (yt = null),
        Gn.forEach(ui),
        Xn.forEach(ui));
}
function Nn(e, t) {
    e.blockedOn === t &&
        ((e.blockedOn = null), ko || ((ko = !0), Ne.unstable_scheduleCallback(Ne.unstable_NormalPriority, Of)));
}
function Zn(e) {
    function t(l) {
        return Nn(l, e);
    }
    if (0 < Sr.length) {
        Nn(Sr[0], e);
        for (var n = 1; n < Sr.length; n++) {
            var r = Sr[n];
            r.blockedOn === e && (r.blockedOn = null);
        }
    }
    for (
        ht !== null && Nn(ht, e),
            vt !== null && Nn(vt, e),
            yt !== null && Nn(yt, e),
            Gn.forEach(t),
            Xn.forEach(t),
            n = 0;
        n < ft.length;
        n++
    )
        ((r = ft[n]), r.blockedOn === e && (r.blockedOn = null));
    for (; 0 < ft.length && ((n = ft[0]), n.blockedOn === null); ) (Gs(n), n.blockedOn === null && ft.shift());
}
var an = it.ReactCurrentBatchConfig,
    Gr = !0;
function If(e, t, n, r) {
    var l = M,
        o = an.transition;
    an.transition = null;
    try {
        ((M = 1), cu(e, t, n, r));
    } finally {
        ((M = l), (an.transition = o));
    }
}
function Ff(e, t, n, r) {
    var l = M,
        o = an.transition;
    an.transition = null;
    try {
        ((M = 4), cu(e, t, n, r));
    } finally {
        ((M = l), (an.transition = o));
    }
}
function cu(e, t, n, r) {
    if (Gr) {
        var l = xo(e, t, n, r);
        if (l === null) (Ql(e, t, r, Xr, n), oi(e, r));
        else if (Lf(l, e, t, n, r)) r.stopPropagation();
        else if ((oi(e, r), t & 4 && -1 < Rf.indexOf(e))) {
            for (; l !== null; ) {
                var o = fr(l);
                if ((o !== null && Hs(o), (o = xo(e, t, n, r)), o === null && Ql(e, t, r, Xr, n), o === l)) break;
                l = o;
            }
            l !== null && r.stopPropagation();
        } else Ql(e, t, r, null, n);
    }
}
var Xr = null;
function xo(e, t, n, r) {
    if (((Xr = null), (e = uu(r)), (e = Lt(e)), e !== null))
        if (((t = Wt(e)), t === null)) e = null;
        else if (((n = t.tag), n === 13)) {
            if (((e = Ds(t)), e !== null)) return e;
            e = null;
        } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
        } else t !== e && (e = null);
    return ((Xr = e), null);
}
function Xs(e) {
    switch (e) {
        case 'cancel':
        case 'click':
        case 'close':
        case 'contextmenu':
        case 'copy':
        case 'cut':
        case 'auxclick':
        case 'dblclick':
        case 'dragend':
        case 'dragstart':
        case 'drop':
        case 'focusin':
        case 'focusout':
        case 'input':
        case 'invalid':
        case 'keydown':
        case 'keypress':
        case 'keyup':
        case 'mousedown':
        case 'mouseup':
        case 'paste':
        case 'pause':
        case 'play':
        case 'pointercancel':
        case 'pointerdown':
        case 'pointerup':
        case 'ratechange':
        case 'reset':
        case 'resize':
        case 'seeked':
        case 'submit':
        case 'touchcancel':
        case 'touchend':
        case 'touchstart':
        case 'volumechange':
        case 'change':
        case 'selectionchange':
        case 'textInput':
        case 'compositionstart':
        case 'compositionend':
        case 'compositionupdate':
        case 'beforeblur':
        case 'afterblur':
        case 'beforeinput':
        case 'blur':
        case 'fullscreenchange':
        case 'focus':
        case 'hashchange':
        case 'popstate':
        case 'select':
        case 'selectstart':
            return 1;
        case 'drag':
        case 'dragenter':
        case 'dragexit':
        case 'dragleave':
        case 'dragover':
        case 'mousemove':
        case 'mouseout':
        case 'mouseover':
        case 'pointermove':
        case 'pointerout':
        case 'pointerover':
        case 'scroll':
        case 'toggle':
        case 'touchmove':
        case 'wheel':
        case 'mouseenter':
        case 'mouseleave':
        case 'pointerenter':
        case 'pointerleave':
            return 4;
        case 'message':
            switch (xf()) {
                case iu:
                    return 1;
                case Bs:
                    return 4;
                case Kr:
                case Ef:
                    return 16;
                case As:
                    return 536870912;
                default:
                    return 16;
            }
        default:
            return 16;
    }
}
var pt = null,
    fu = null,
    Ir = null;
function Zs() {
    if (Ir) return Ir;
    var e,
        t = fu,
        n = t.length,
        r,
        l = 'value' in pt ? pt.value : pt.textContent,
        o = l.length;
    for (e = 0; e < n && t[e] === l[e]; e++);
    var u = n - e;
    for (r = 1; r <= u && t[n - r] === l[o - r]; r++);
    return (Ir = l.slice(e, 1 < r ? 1 - r : void 0));
}
function Fr(e) {
    var t = e.keyCode;
    return (
        'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
    );
}
function kr() {
    return !0;
}
function ii() {
    return !1;
}
function je(e) {
    function t(n, r, l, o, u) {
        ((this._reactName = n),
            (this._targetInst = l),
            (this.type = r),
            (this.nativeEvent = o),
            (this.target = u),
            (this.currentTarget = null));
        for (var i in e) e.hasOwnProperty(i) && ((n = e[i]), (this[i] = n ? n(o) : o[i]));
        return (
            (this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1)
                ? kr
                : ii),
            (this.isPropagationStopped = ii),
            this
        );
    }
    return (
        K(t.prototype, {
            preventDefault: function () {
                this.defaultPrevented = !0;
                var n = this.nativeEvent;
                n &&
                    (n.preventDefault ? n.preventDefault() : typeof n.returnValue != 'unknown' && (n.returnValue = !1),
                    (this.isDefaultPrevented = kr));
            },
            stopPropagation: function () {
                var n = this.nativeEvent;
                n &&
                    (n.stopPropagation
                        ? n.stopPropagation()
                        : typeof n.cancelBubble != 'unknown' && (n.cancelBubble = !0),
                    (this.isPropagationStopped = kr));
            },
            persist: function () {},
            isPersistent: kr,
        }),
        t
    );
}
var Sn = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (e) {
            return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
    },
    du = je(Sn),
    cr = K({}, Sn, { view: 0, detail: 0 }),
    Df = je(cr),
    Dl,
    Ml,
    Pn,
    hl = K({}, cr, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: pu,
        button: 0,
        buttons: 0,
        relatedTarget: function (e) {
            return e.relatedTarget === void 0
                ? e.fromElement === e.srcElement
                    ? e.toElement
                    : e.fromElement
                : e.relatedTarget;
        },
        movementX: function (e) {
            return 'movementX' in e
                ? e.movementX
                : (e !== Pn &&
                      (Pn && e.type === 'mousemove'
                          ? ((Dl = e.screenX - Pn.screenX), (Ml = e.screenY - Pn.screenY))
                          : (Ml = Dl = 0),
                      (Pn = e)),
                  Dl);
        },
        movementY: function (e) {
            return 'movementY' in e ? e.movementY : Ml;
        },
    }),
    si = je(hl),
    Mf = K({}, hl, { dataTransfer: 0 }),
    $f = je(Mf),
    Uf = K({}, cr, { relatedTarget: 0 }),
    $l = je(Uf),
    Bf = K({}, Sn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Af = je(Bf),
    Vf = K({}, Sn, {
        clipboardData: function (e) {
            return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
        },
    }),
    Wf = je(Vf),
    Hf = K({}, Sn, { data: 0 }),
    ai = je(Hf),
    Qf = {
        Esc: 'Escape',
        Spacebar: ' ',
        Left: 'ArrowLeft',
        Up: 'ArrowUp',
        Right: 'ArrowRight',
        Down: 'ArrowDown',
        Del: 'Delete',
        Win: 'OS',
        Menu: 'ContextMenu',
        Apps: 'ContextMenu',
        Scroll: 'ScrollLock',
        MozPrintableKey: 'Unidentified',
    },
    Kf = {
        8: 'Backspace',
        9: 'Tab',
        12: 'Clear',
        13: 'Enter',
        16: 'Shift',
        17: 'Control',
        18: 'Alt',
        19: 'Pause',
        20: 'CapsLock',
        27: 'Escape',
        32: ' ',
        33: 'PageUp',
        34: 'PageDown',
        35: 'End',
        36: 'Home',
        37: 'ArrowLeft',
        38: 'ArrowUp',
        39: 'ArrowRight',
        40: 'ArrowDown',
        45: 'Insert',
        46: 'Delete',
        112: 'F1',
        113: 'F2',
        114: 'F3',
        115: 'F4',
        116: 'F5',
        117: 'F6',
        118: 'F7',
        119: 'F8',
        120: 'F9',
        121: 'F10',
        122: 'F11',
        123: 'F12',
        144: 'NumLock',
        145: 'ScrollLock',
        224: 'Meta',
    },
    Yf = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
function Gf(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Yf[e]) ? !!t[e] : !1;
}
function pu() {
    return Gf;
}
var Xf = K({}, cr, {
        key: function (e) {
            if (e.key) {
                var t = Qf[e.key] || e.key;
                if (t !== 'Unidentified') return t;
            }
            return e.type === 'keypress'
                ? ((e = Fr(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
                : e.type === 'keydown' || e.type === 'keyup'
                  ? Kf[e.keyCode] || 'Unidentified'
                  : '';
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: pu,
        charCode: function (e) {
            return e.type === 'keypress' ? Fr(e) : 0;
        },
        keyCode: function (e) {
            return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
        },
        which: function (e) {
            return e.type === 'keypress' ? Fr(e) : e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
        },
    }),
    Zf = je(Xf),
    Jf = K({}, hl, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0,
    }),
    ci = je(Jf),
    qf = K({}, cr, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: pu,
    }),
    bf = je(qf),
    ed = K({}, Sn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    td = je(ed),
    nd = K({}, hl, {
        deltaX: function (e) {
            return 'deltaX' in e ? e.deltaX : 'wheelDeltaX' in e ? -e.wheelDeltaX : 0;
        },
        deltaY: function (e) {
            return 'deltaY' in e
                ? e.deltaY
                : 'wheelDeltaY' in e
                  ? -e.wheelDeltaY
                  : 'wheelDelta' in e
                    ? -e.wheelDelta
                    : 0;
        },
        deltaZ: 0,
        deltaMode: 0,
    }),
    rd = je(nd),
    ld = [9, 13, 27, 32],
    mu = rt && 'CompositionEvent' in window,
    $n = null;
rt && 'documentMode' in document && ($n = document.documentMode);
var od = rt && 'TextEvent' in window && !$n,
    Js = rt && (!mu || ($n && 8 < $n && 11 >= $n)),
    fi = ' ',
    di = !1;
function qs(e, t) {
    switch (e) {
        case 'keyup':
            return ld.indexOf(t.keyCode) !== -1;
        case 'keydown':
            return t.keyCode !== 229;
        case 'keypress':
        case 'mousedown':
        case 'focusout':
            return !0;
        default:
            return !1;
    }
}
function bs(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
}
var Xt = !1;
function ud(e, t) {
    switch (e) {
        case 'compositionend':
            return bs(t);
        case 'keypress':
            return t.which !== 32 ? null : ((di = !0), fi);
        case 'textInput':
            return ((e = t.data), e === fi && di ? null : e);
        default:
            return null;
    }
}
function id(e, t) {
    if (Xt)
        return e === 'compositionend' || (!mu && qs(e, t)) ? ((e = Zs()), (Ir = fu = pt = null), (Xt = !1), e) : null;
    switch (e) {
        case 'paste':
            return null;
        case 'keypress':
            if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
                if (t.char && 1 < t.char.length) return t.char;
                if (t.which) return String.fromCharCode(t.which);
            }
            return null;
        case 'compositionend':
            return Js && t.locale !== 'ko' ? null : t.data;
        default:
            return null;
    }
}
var sd = {
    color: !0,
    date: !0,
    datetime: !0,
    'datetime-local': !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
};
function pi(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!sd[e.type] : t === 'textarea';
}
function ea(e, t, n, r) {
    (Rs(r),
        (t = Zr(t, 'onChange')),
        0 < t.length && ((n = new du('onChange', 'change', null, n, r)), e.push({ event: n, listeners: t })));
}
var Un = null,
    Jn = null;
function ad(e) {
    fa(e, 0);
}
function vl(e) {
    var t = qt(e);
    if (_s(t)) return e;
}
function cd(e, t) {
    if (e === 'change') return t;
}
var ta = !1;
if (rt) {
    var Ul;
    if (rt) {
        var Bl = 'oninput' in document;
        if (!Bl) {
            var mi = document.createElement('div');
            (mi.setAttribute('oninput', 'return;'), (Bl = typeof mi.oninput == 'function'));
        }
        Ul = Bl;
    } else Ul = !1;
    ta = Ul && (!document.documentMode || 9 < document.documentMode);
}
function hi() {
    Un && (Un.detachEvent('onpropertychange', na), (Jn = Un = null));
}
function na(e) {
    if (e.propertyName === 'value' && vl(Jn)) {
        var t = [];
        (ea(t, Jn, e, uu(e)), Fs(ad, t));
    }
}
function fd(e, t, n) {
    e === 'focusin' ? (hi(), (Un = t), (Jn = n), Un.attachEvent('onpropertychange', na)) : e === 'focusout' && hi();
}
function dd(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return vl(Jn);
}
function pd(e, t) {
    if (e === 'click') return vl(t);
}
function md(e, t) {
    if (e === 'input' || e === 'change') return vl(t);
}
function hd(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Ve = typeof Object.is == 'function' ? Object.is : hd;
function qn(e, t) {
    if (Ve(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var n = Object.keys(e),
        r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
        var l = n[r];
        if (!ro.call(t, l) || !Ve(e[l], t[l])) return !1;
    }
    return !0;
}
function vi(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
}
function yi(e, t) {
    var n = vi(e);
    e = 0;
    for (var r; n; ) {
        if (n.nodeType === 3) {
            if (((r = e + n.textContent.length), e <= t && r >= t)) return { node: n, offset: t - e };
            e = r;
        }
        e: {
            for (; n; ) {
                if (n.nextSibling) {
                    n = n.nextSibling;
                    break e;
                }
                n = n.parentNode;
            }
            n = void 0;
        }
        n = vi(n);
    }
}
function ra(e, t) {
    return e && t
        ? e === t
            ? !0
            : e && e.nodeType === 3
              ? !1
              : t && t.nodeType === 3
                ? ra(e, t.parentNode)
                : 'contains' in e
                  ? e.contains(t)
                  : e.compareDocumentPosition
                    ? !!(e.compareDocumentPosition(t) & 16)
                    : !1
        : !1;
}
function la() {
    for (var e = window, t = Wr(); t instanceof e.HTMLIFrameElement; ) {
        try {
            var n = typeof t.contentWindow.location.href == 'string';
        } catch {
            n = !1;
        }
        if (n) e = t.contentWindow;
        else break;
        t = Wr(e.document);
    }
    return t;
}
function hu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
        t &&
        ((t === 'input' &&
            (e.type === 'text' ||
                e.type === 'search' ||
                e.type === 'tel' ||
                e.type === 'url' ||
                e.type === 'password')) ||
            t === 'textarea' ||
            e.contentEditable === 'true')
    );
}
function vd(e) {
    var t = la(),
        n = e.focusedElem,
        r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && ra(n.ownerDocument.documentElement, n)) {
        if (r !== null && hu(n)) {
            if (((t = r.start), (e = r.end), e === void 0 && (e = t), 'selectionStart' in n))
                ((n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length)));
            else if (((e = ((t = n.ownerDocument || document) && t.defaultView) || window), e.getSelection)) {
                e = e.getSelection();
                var l = n.textContent.length,
                    o = Math.min(r.start, l);
                ((r = r.end === void 0 ? o : Math.min(r.end, l)),
                    !e.extend && o > r && ((l = r), (r = o), (o = l)),
                    (l = yi(n, o)));
                var u = yi(n, r);
                l &&
                    u &&
                    (e.rangeCount !== 1 ||
                        e.anchorNode !== l.node ||
                        e.anchorOffset !== l.offset ||
                        e.focusNode !== u.node ||
                        e.focusOffset !== u.offset) &&
                    ((t = t.createRange()),
                    t.setStart(l.node, l.offset),
                    e.removeAllRanges(),
                    o > r ? (e.addRange(t), e.extend(u.node, u.offset)) : (t.setEnd(u.node, u.offset), e.addRange(t)));
            }
        }
        for (t = [], e = n; (e = e.parentNode); )
            e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
        for (typeof n.focus == 'function' && n.focus(), n = 0; n < t.length; n++)
            ((e = t[n]), (e.element.scrollLeft = e.left), (e.element.scrollTop = e.top));
    }
}
var yd = rt && 'documentMode' in document && 11 >= document.documentMode,
    Zt = null,
    Eo = null,
    Bn = null,
    _o = !1;
function gi(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    _o ||
        Zt == null ||
        Zt !== Wr(r) ||
        ((r = Zt),
        'selectionStart' in r && hu(r)
            ? (r = { start: r.selectionStart, end: r.selectionEnd })
            : ((r = ((r.ownerDocument && r.ownerDocument.defaultView) || window).getSelection()),
              (r = {
                  anchorNode: r.anchorNode,
                  anchorOffset: r.anchorOffset,
                  focusNode: r.focusNode,
                  focusOffset: r.focusOffset,
              })),
        (Bn && qn(Bn, r)) ||
            ((Bn = r),
            (r = Zr(Eo, 'onSelect')),
            0 < r.length &&
                ((t = new du('onSelect', 'select', null, t, n)), e.push({ event: t, listeners: r }), (t.target = Zt))));
}
function xr(e, t) {
    var n = {};
    return ((n[e.toLowerCase()] = t.toLowerCase()), (n['Webkit' + e] = 'webkit' + t), (n['Moz' + e] = 'moz' + t), n);
}
var Jt = {
        animationend: xr('Animation', 'AnimationEnd'),
        animationiteration: xr('Animation', 'AnimationIteration'),
        animationstart: xr('Animation', 'AnimationStart'),
        transitionend: xr('Transition', 'TransitionEnd'),
    },
    Al = {},
    oa = {};
rt &&
    ((oa = document.createElement('div').style),
    'AnimationEvent' in window ||
        (delete Jt.animationend.animation, delete Jt.animationiteration.animation, delete Jt.animationstart.animation),
    'TransitionEvent' in window || delete Jt.transitionend.transition);
function yl(e) {
    if (Al[e]) return Al[e];
    if (!Jt[e]) return e;
    var t = Jt[e],
        n;
    for (n in t) if (t.hasOwnProperty(n) && n in oa) return (Al[e] = t[n]);
    return e;
}
var ua = yl('animationend'),
    ia = yl('animationiteration'),
    sa = yl('animationstart'),
    aa = yl('transitionend'),
    ca = new Map(),
    wi =
        'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
            ' '
        );
function Ct(e, t) {
    (ca.set(e, t), Vt(t, [e]));
}
for (var Vl = 0; Vl < wi.length; Vl++) {
    var Wl = wi[Vl],
        gd = Wl.toLowerCase(),
        wd = Wl[0].toUpperCase() + Wl.slice(1);
    Ct(gd, 'on' + wd);
}
Ct(ua, 'onAnimationEnd');
Ct(ia, 'onAnimationIteration');
Ct(sa, 'onAnimationStart');
Ct('dblclick', 'onDoubleClick');
Ct('focusin', 'onFocus');
Ct('focusout', 'onBlur');
Ct(aa, 'onTransitionEnd');
dn('onMouseEnter', ['mouseout', 'mouseover']);
dn('onMouseLeave', ['mouseout', 'mouseover']);
dn('onPointerEnter', ['pointerout', 'pointerover']);
dn('onPointerLeave', ['pointerout', 'pointerover']);
Vt('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' '));
Vt('onSelect', 'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(' '));
Vt('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']);
Vt('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' '));
Vt('onCompositionStart', 'compositionstart focusout keydown keypress keyup mousedown'.split(' '));
Vt('onCompositionUpdate', 'compositionupdate focusout keydown keypress keyup mousedown'.split(' '));
var Fn =
        'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
            ' '
        ),
    Sd = new Set('cancel close invalid load scroll toggle'.split(' ').concat(Fn));
function Si(e, t, n) {
    var r = e.type || 'unknown-event';
    ((e.currentTarget = n), gf(r, t, void 0, e), (e.currentTarget = null));
}
function fa(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
        var r = e[n],
            l = r.event;
        r = r.listeners;
        e: {
            var o = void 0;
            if (t)
                for (var u = r.length - 1; 0 <= u; u--) {
                    var i = r[u],
                        s = i.instance,
                        c = i.currentTarget;
                    if (((i = i.listener), s !== o && l.isPropagationStopped())) break e;
                    (Si(l, i, c), (o = s));
                }
            else
                for (u = 0; u < r.length; u++) {
                    if (
                        ((i = r[u]),
                        (s = i.instance),
                        (c = i.currentTarget),
                        (i = i.listener),
                        s !== o && l.isPropagationStopped())
                    )
                        break e;
                    (Si(l, i, c), (o = s));
                }
        }
    }
    if (Qr) throw ((e = wo), (Qr = !1), (wo = null), e);
}
function B(e, t) {
    var n = t[zo];
    n === void 0 && (n = t[zo] = new Set());
    var r = e + '__bubble';
    n.has(r) || (da(t, e, 2, !1), n.add(r));
}
function Hl(e, t, n) {
    var r = 0;
    (t && (r |= 4), da(n, e, r, t));
}
var Er = '_reactListening' + Math.random().toString(36).slice(2);
function bn(e) {
    if (!e[Er]) {
        ((e[Er] = !0),
            ws.forEach(function (n) {
                n !== 'selectionchange' && (Sd.has(n) || Hl(n, !1, e), Hl(n, !0, e));
            }));
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[Er] || ((t[Er] = !0), Hl('selectionchange', !1, t));
    }
}
function da(e, t, n, r) {
    switch (Xs(t)) {
        case 1:
            var l = If;
            break;
        case 4:
            l = Ff;
            break;
        default:
            l = cu;
    }
    ((n = l.bind(null, t, n, e)),
        (l = void 0),
        !go || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (l = !0),
        r
            ? l !== void 0
                ? e.addEventListener(t, n, { capture: !0, passive: l })
                : e.addEventListener(t, n, !0)
            : l !== void 0
              ? e.addEventListener(t, n, { passive: l })
              : e.addEventListener(t, n, !1));
}
function Ql(e, t, n, r, l) {
    var o = r;
    if (!(t & 1) && !(t & 2) && r !== null)
        e: for (;;) {
            if (r === null) return;
            var u = r.tag;
            if (u === 3 || u === 4) {
                var i = r.stateNode.containerInfo;
                if (i === l || (i.nodeType === 8 && i.parentNode === l)) break;
                if (u === 4)
                    for (u = r.return; u !== null; ) {
                        var s = u.tag;
                        if (
                            (s === 3 || s === 4) &&
                            ((s = u.stateNode.containerInfo), s === l || (s.nodeType === 8 && s.parentNode === l))
                        )
                            return;
                        u = u.return;
                    }
                for (; i !== null; ) {
                    if (((u = Lt(i)), u === null)) return;
                    if (((s = u.tag), s === 5 || s === 6)) {
                        r = o = u;
                        continue e;
                    }
                    i = i.parentNode;
                }
            }
            r = r.return;
        }
    Fs(function () {
        var c = o,
            h = uu(n),
            m = [];
        e: {
            var p = ca.get(e);
            if (p !== void 0) {
                var w = du,
                    S = e;
                switch (e) {
                    case 'keypress':
                        if (Fr(n) === 0) break e;
                    case 'keydown':
                    case 'keyup':
                        w = Zf;
                        break;
                    case 'focusin':
                        ((S = 'focus'), (w = $l));
                        break;
                    case 'focusout':
                        ((S = 'blur'), (w = $l));
                        break;
                    case 'beforeblur':
                    case 'afterblur':
                        w = $l;
                        break;
                    case 'click':
                        if (n.button === 2) break e;
                    case 'auxclick':
                    case 'dblclick':
                    case 'mousedown':
                    case 'mousemove':
                    case 'mouseup':
                    case 'mouseout':
                    case 'mouseover':
                    case 'contextmenu':
                        w = si;
                        break;
                    case 'drag':
                    case 'dragend':
                    case 'dragenter':
                    case 'dragexit':
                    case 'dragleave':
                    case 'dragover':
                    case 'dragstart':
                    case 'drop':
                        w = $f;
                        break;
                    case 'touchcancel':
                    case 'touchend':
                    case 'touchmove':
                    case 'touchstart':
                        w = bf;
                        break;
                    case ua:
                    case ia:
                    case sa:
                        w = Af;
                        break;
                    case aa:
                        w = td;
                        break;
                    case 'scroll':
                        w = Df;
                        break;
                    case 'wheel':
                        w = rd;
                        break;
                    case 'copy':
                    case 'cut':
                    case 'paste':
                        w = Wf;
                        break;
                    case 'gotpointercapture':
                    case 'lostpointercapture':
                    case 'pointercancel':
                    case 'pointerdown':
                    case 'pointermove':
                    case 'pointerout':
                    case 'pointerover':
                    case 'pointerup':
                        w = ci;
                }
                var k = (t & 4) !== 0,
                    D = !k && e === 'scroll',
                    f = k ? (p !== null ? p + 'Capture' : null) : p;
                k = [];
                for (var a = c, d; a !== null; ) {
                    d = a;
                    var v = d.stateNode;
                    if (
                        (d.tag === 5 &&
                            v !== null &&
                            ((d = v), f !== null && ((v = Yn(a, f)), v != null && k.push(er(a, v, d)))),
                        D)
                    )
                        break;
                    a = a.return;
                }
                0 < k.length && ((p = new w(p, S, null, n, h)), m.push({ event: p, listeners: k }));
            }
        }
        if (!(t & 7)) {
            e: {
                if (
                    ((p = e === 'mouseover' || e === 'pointerover'),
                    (w = e === 'mouseout' || e === 'pointerout'),
                    p && n !== vo && (S = n.relatedTarget || n.fromElement) && (Lt(S) || S[lt]))
                )
                    break e;
                if (
                    (w || p) &&
                    ((p = h.window === h ? h : (p = h.ownerDocument) ? p.defaultView || p.parentWindow : window),
                    w
                        ? ((S = n.relatedTarget || n.toElement),
                          (w = c),
                          (S = S ? Lt(S) : null),
                          S !== null && ((D = Wt(S)), S !== D || (S.tag !== 5 && S.tag !== 6)) && (S = null))
                        : ((w = null), (S = c)),
                    w !== S)
                ) {
                    if (
                        ((k = si),
                        (v = 'onMouseLeave'),
                        (f = 'onMouseEnter'),
                        (a = 'mouse'),
                        (e === 'pointerout' || e === 'pointerover') &&
                            ((k = ci), (v = 'onPointerLeave'), (f = 'onPointerEnter'), (a = 'pointer')),
                        (D = w == null ? p : qt(w)),
                        (d = S == null ? p : qt(S)),
                        (p = new k(v, a + 'leave', w, n, h)),
                        (p.target = D),
                        (p.relatedTarget = d),
                        (v = null),
                        Lt(h) === c &&
                            ((k = new k(f, a + 'enter', S, n, h)), (k.target = d), (k.relatedTarget = D), (v = k)),
                        (D = v),
                        w && S)
                    )
                        t: {
                            for (k = w, f = S, a = 0, d = k; d; d = Kt(d)) a++;
                            for (d = 0, v = f; v; v = Kt(v)) d++;
                            for (; 0 < a - d; ) ((k = Kt(k)), a--);
                            for (; 0 < d - a; ) ((f = Kt(f)), d--);
                            for (; a--; ) {
                                if (k === f || (f !== null && k === f.alternate)) break t;
                                ((k = Kt(k)), (f = Kt(f)));
                            }
                            k = null;
                        }
                    else k = null;
                    (w !== null && ki(m, p, w, k, !1), S !== null && D !== null && ki(m, D, S, k, !0));
                }
            }
            e: {
                if (
                    ((p = c ? qt(c) : window),
                    (w = p.nodeName && p.nodeName.toLowerCase()),
                    w === 'select' || (w === 'input' && p.type === 'file'))
                )
                    var x = cd;
                else if (pi(p))
                    if (ta) x = md;
                    else {
                        x = dd;
                        var P = fd;
                    }
                else
                    (w = p.nodeName) &&
                        w.toLowerCase() === 'input' &&
                        (p.type === 'checkbox' || p.type === 'radio') &&
                        (x = pd);
                if (x && (x = x(e, c))) {
                    ea(m, x, n, h);
                    break e;
                }
                (P && P(e, p, c),
                    e === 'focusout' &&
                        (P = p._wrapperState) &&
                        P.controlled &&
                        p.type === 'number' &&
                        co(p, 'number', p.value));
            }
            switch (((P = c ? qt(c) : window), e)) {
                case 'focusin':
                    (pi(P) || P.contentEditable === 'true') && ((Zt = P), (Eo = c), (Bn = null));
                    break;
                case 'focusout':
                    Bn = Eo = Zt = null;
                    break;
                case 'mousedown':
                    _o = !0;
                    break;
                case 'contextmenu':
                case 'mouseup':
                case 'dragend':
                    ((_o = !1), gi(m, n, h));
                    break;
                case 'selectionchange':
                    if (yd) break;
                case 'keydown':
                case 'keyup':
                    gi(m, n, h);
            }
            var C;
            if (mu)
                e: {
                    switch (e) {
                        case 'compositionstart':
                            var j = 'onCompositionStart';
                            break e;
                        case 'compositionend':
                            j = 'onCompositionEnd';
                            break e;
                        case 'compositionupdate':
                            j = 'onCompositionUpdate';
                            break e;
                    }
                    j = void 0;
                }
            else
                Xt
                    ? qs(e, n) && (j = 'onCompositionEnd')
                    : e === 'keydown' && n.keyCode === 229 && (j = 'onCompositionStart');
            (j &&
                (Js &&
                    n.locale !== 'ko' &&
                    (Xt || j !== 'onCompositionStart'
                        ? j === 'onCompositionEnd' && Xt && (C = Zs())
                        : ((pt = h), (fu = 'value' in pt ? pt.value : pt.textContent), (Xt = !0))),
                (P = Zr(c, j)),
                0 < P.length &&
                    ((j = new ai(j, e, null, n, h)),
                    m.push({ event: j, listeners: P }),
                    C ? (j.data = C) : ((C = bs(n)), C !== null && (j.data = C)))),
                (C = od ? ud(e, n) : id(e, n)) &&
                    ((c = Zr(c, 'onBeforeInput')),
                    0 < c.length &&
                        ((h = new ai('onBeforeInput', 'beforeinput', null, n, h)),
                        m.push({ event: h, listeners: c }),
                        (h.data = C))));
        }
        fa(m, t);
    });
}
function er(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
}
function Zr(e, t) {
    for (var n = t + 'Capture', r = []; e !== null; ) {
        var l = e,
            o = l.stateNode;
        (l.tag === 5 &&
            o !== null &&
            ((l = o),
            (o = Yn(e, n)),
            o != null && r.unshift(er(e, o, l)),
            (o = Yn(e, t)),
            o != null && r.push(er(e, o, l))),
            (e = e.return));
    }
    return r;
}
function Kt(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
}
function ki(e, t, n, r, l) {
    for (var o = t._reactName, u = []; n !== null && n !== r; ) {
        var i = n,
            s = i.alternate,
            c = i.stateNode;
        if (s !== null && s === r) break;
        (i.tag === 5 &&
            c !== null &&
            ((i = c),
            l
                ? ((s = Yn(n, o)), s != null && u.unshift(er(n, s, i)))
                : l || ((s = Yn(n, o)), s != null && u.push(er(n, s, i)))),
            (n = n.return));
    }
    u.length !== 0 && e.push({ event: t, listeners: u });
}
var kd = /\r\n?/g,
    xd = /\u0000|\uFFFD/g;
function xi(e) {
    return (typeof e == 'string' ? e : '' + e)
        .replace(
            kd,
            `
`
        )
        .replace(xd, '');
}
function _r(e, t, n) {
    if (((t = xi(t)), xi(e) !== t && n)) throw Error(g(425));
}
function Jr() {}
var Co = null,
    No = null;
function Po(e, t) {
    return (
        e === 'textarea' ||
        e === 'noscript' ||
        typeof t.children == 'string' ||
        typeof t.children == 'number' ||
        (typeof t.dangerouslySetInnerHTML == 'object' &&
            t.dangerouslySetInnerHTML !== null &&
            t.dangerouslySetInnerHTML.__html != null)
    );
}
var jo = typeof setTimeout == 'function' ? setTimeout : void 0,
    Ed = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Ei = typeof Promise == 'function' ? Promise : void 0,
    _d =
        typeof queueMicrotask == 'function'
            ? queueMicrotask
            : typeof Ei < 'u'
              ? function (e) {
                    return Ei.resolve(null).then(e).catch(Cd);
                }
              : jo;
function Cd(e) {
    setTimeout(function () {
        throw e;
    });
}
function Kl(e, t) {
    var n = t,
        r = 0;
    do {
        var l = n.nextSibling;
        if ((e.removeChild(n), l && l.nodeType === 8))
            if (((n = l.data), n === '/$')) {
                if (r === 0) {
                    (e.removeChild(l), Zn(t));
                    return;
                }
                r--;
            } else (n !== '$' && n !== '$?' && n !== '$!') || r++;
        n = l;
    } while (n);
    Zn(t);
}
function gt(e) {
    for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
            if (((t = e.data), t === '$' || t === '$!' || t === '$?')) break;
            if (t === '/$') return null;
        }
    }
    return e;
}
function _i(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
        if (e.nodeType === 8) {
            var n = e.data;
            if (n === '$' || n === '$!' || n === '$?') {
                if (t === 0) return e;
                t--;
            } else n === '/$' && t++;
        }
        e = e.previousSibling;
    }
    return null;
}
var kn = Math.random().toString(36).slice(2),
    Xe = '__reactFiber$' + kn,
    tr = '__reactProps$' + kn,
    lt = '__reactContainer$' + kn,
    zo = '__reactEvents$' + kn,
    Nd = '__reactListeners$' + kn,
    Pd = '__reactHandles$' + kn;
function Lt(e) {
    var t = e[Xe];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
        if ((t = n[lt] || n[Xe])) {
            if (((n = t.alternate), t.child !== null || (n !== null && n.child !== null)))
                for (e = _i(e); e !== null; ) {
                    if ((n = e[Xe])) return n;
                    e = _i(e);
                }
            return t;
        }
        ((e = n), (n = e.parentNode));
    }
    return null;
}
function fr(e) {
    return ((e = e[Xe] || e[lt]), !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e);
}
function qt(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(g(33));
}
function gl(e) {
    return e[tr] || null;
}
var To = [],
    bt = -1;
function Nt(e) {
    return { current: e };
}
function A(e) {
    0 > bt || ((e.current = To[bt]), (To[bt] = null), bt--);
}
function U(e, t) {
    (bt++, (To[bt] = e.current), (e.current = t));
}
var _t = {},
    fe = Nt(_t),
    we = Nt(!1),
    Mt = _t;
function pn(e, t) {
    var n = e.type.contextTypes;
    if (!n) return _t;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
    var l = {},
        o;
    for (o in n) l[o] = t[o];
    return (
        r &&
            ((e = e.stateNode),
            (e.__reactInternalMemoizedUnmaskedChildContext = t),
            (e.__reactInternalMemoizedMaskedChildContext = l)),
        l
    );
}
function Se(e) {
    return ((e = e.childContextTypes), e != null);
}
function qr() {
    (A(we), A(fe));
}
function Ci(e, t, n) {
    if (fe.current !== _t) throw Error(g(168));
    (U(fe, t), U(we, n));
}
function pa(e, t, n) {
    var r = e.stateNode;
    if (((t = t.childContextTypes), typeof r.getChildContext != 'function')) return n;
    r = r.getChildContext();
    for (var l in r) if (!(l in t)) throw Error(g(108, ff(e) || 'Unknown', l));
    return K({}, n, r);
}
function br(e) {
    return (
        (e = ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || _t),
        (Mt = fe.current),
        U(fe, e),
        U(we, we.current),
        !0
    );
}
function Ni(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(g(169));
    (n ? ((e = pa(e, t, Mt)), (r.__reactInternalMemoizedMergedChildContext = e), A(we), A(fe), U(fe, e)) : A(we),
        U(we, n));
}
var be = null,
    wl = !1,
    Yl = !1;
function ma(e) {
    be === null ? (be = [e]) : be.push(e);
}
function jd(e) {
    ((wl = !0), ma(e));
}
function Pt() {
    if (!Yl && be !== null) {
        Yl = !0;
        var e = 0,
            t = M;
        try {
            var n = be;
            for (M = 1; e < n.length; e++) {
                var r = n[e];
                do r = r(!0);
                while (r !== null);
            }
            ((be = null), (wl = !1));
        } catch (l) {
            throw (be !== null && (be = be.slice(e + 1)), Us(iu, Pt), l);
        } finally {
            ((M = t), (Yl = !1));
        }
    }
    return null;
}
var en = [],
    tn = 0,
    el = null,
    tl = 0,
    ze = [],
    Te = 0,
    $t = null,
    et = 1,
    tt = '';
function Tt(e, t) {
    ((en[tn++] = tl), (en[tn++] = el), (el = e), (tl = t));
}
function ha(e, t, n) {
    ((ze[Te++] = et), (ze[Te++] = tt), (ze[Te++] = $t), ($t = e));
    var r = et;
    e = tt;
    var l = 32 - Be(r) - 1;
    ((r &= ~(1 << l)), (n += 1));
    var o = 32 - Be(t) + l;
    if (30 < o) {
        var u = l - (l % 5);
        ((o = (r & ((1 << u) - 1)).toString(32)),
            (r >>= u),
            (l -= u),
            (et = (1 << (32 - Be(t) + l)) | (n << l) | r),
            (tt = o + e));
    } else ((et = (1 << o) | (n << l) | r), (tt = e));
}
function vu(e) {
    e.return !== null && (Tt(e, 1), ha(e, 1, 0));
}
function yu(e) {
    for (; e === el; ) ((el = en[--tn]), (en[tn] = null), (tl = en[--tn]), (en[tn] = null));
    for (; e === $t; )
        (($t = ze[--Te]), (ze[Te] = null), (tt = ze[--Te]), (ze[Te] = null), (et = ze[--Te]), (ze[Te] = null));
}
var Ce = null,
    _e = null,
    W = !1,
    Ue = null;
function va(e, t) {
    var n = Re(5, null, null, 0);
    ((n.elementType = 'DELETED'),
        (n.stateNode = t),
        (n.return = e),
        (t = e.deletions),
        t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
}
function Pi(e, t) {
    switch (e.tag) {
        case 5:
            var n = e.type;
            return (
                (t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t),
                t !== null ? ((e.stateNode = t), (Ce = e), (_e = gt(t.firstChild)), !0) : !1
            );
        case 6:
            return (
                (t = e.pendingProps === '' || t.nodeType !== 3 ? null : t),
                t !== null ? ((e.stateNode = t), (Ce = e), (_e = null), !0) : !1
            );
        case 13:
            return (
                (t = t.nodeType !== 8 ? null : t),
                t !== null
                    ? ((n = $t !== null ? { id: et, overflow: tt } : null),
                      (e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }),
                      (n = Re(18, null, null, 0)),
                      (n.stateNode = t),
                      (n.return = e),
                      (e.child = n),
                      (Ce = e),
                      (_e = null),
                      !0)
                    : !1
            );
        default:
            return !1;
    }
}
function Ro(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Lo(e) {
    if (W) {
        var t = _e;
        if (t) {
            var n = t;
            if (!Pi(e, t)) {
                if (Ro(e)) throw Error(g(418));
                t = gt(n.nextSibling);
                var r = Ce;
                t && Pi(e, t) ? va(r, n) : ((e.flags = (e.flags & -4097) | 2), (W = !1), (Ce = e));
            }
        } else {
            if (Ro(e)) throw Error(g(418));
            ((e.flags = (e.flags & -4097) | 2), (W = !1), (Ce = e));
        }
    }
}
function ji(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    Ce = e;
}
function Cr(e) {
    if (e !== Ce) return !1;
    if (!W) return (ji(e), (W = !0), !1);
    var t;
    if (
        ((t = e.tag !== 3) &&
            !(t = e.tag !== 5) &&
            ((t = e.type), (t = t !== 'head' && t !== 'body' && !Po(e.type, e.memoizedProps))),
        t && (t = _e))
    ) {
        if (Ro(e)) throw (ya(), Error(g(418)));
        for (; t; ) (va(e, t), (t = gt(t.nextSibling)));
    }
    if ((ji(e), e.tag === 13)) {
        if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(g(317));
        e: {
            for (e = e.nextSibling, t = 0; e; ) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === '/$') {
                        if (t === 0) {
                            _e = gt(e.nextSibling);
                            break e;
                        }
                        t--;
                    } else (n !== '$' && n !== '$!' && n !== '$?') || t++;
                }
                e = e.nextSibling;
            }
            _e = null;
        }
    } else _e = Ce ? gt(e.stateNode.nextSibling) : null;
    return !0;
}
function ya() {
    for (var e = _e; e; ) e = gt(e.nextSibling);
}
function mn() {
    ((_e = Ce = null), (W = !1));
}
function gu(e) {
    Ue === null ? (Ue = [e]) : Ue.push(e);
}
var zd = it.ReactCurrentBatchConfig;
function jn(e, t, n) {
    if (((e = n.ref), e !== null && typeof e != 'function' && typeof e != 'object')) {
        if (n._owner) {
            if (((n = n._owner), n)) {
                if (n.tag !== 1) throw Error(g(309));
                var r = n.stateNode;
            }
            if (!r) throw Error(g(147, e));
            var l = r,
                o = '' + e;
            return t !== null && t.ref !== null && typeof t.ref == 'function' && t.ref._stringRef === o
                ? t.ref
                : ((t = function (u) {
                      var i = l.refs;
                      u === null ? delete i[o] : (i[o] = u);
                  }),
                  (t._stringRef = o),
                  t);
        }
        if (typeof e != 'string') throw Error(g(284));
        if (!n._owner) throw Error(g(290, e));
    }
    return e;
}
function Nr(e, t) {
    throw (
        (e = Object.prototype.toString.call(t)),
        Error(g(31, e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e))
    );
}
function zi(e) {
    var t = e._init;
    return t(e._payload);
}
function ga(e) {
    function t(f, a) {
        if (e) {
            var d = f.deletions;
            d === null ? ((f.deletions = [a]), (f.flags |= 16)) : d.push(a);
        }
    }
    function n(f, a) {
        if (!e) return null;
        for (; a !== null; ) (t(f, a), (a = a.sibling));
        return null;
    }
    function r(f, a) {
        for (f = new Map(); a !== null; ) (a.key !== null ? f.set(a.key, a) : f.set(a.index, a), (a = a.sibling));
        return f;
    }
    function l(f, a) {
        return ((f = xt(f, a)), (f.index = 0), (f.sibling = null), f);
    }
    function o(f, a, d) {
        return (
            (f.index = d),
            e
                ? ((d = f.alternate),
                  d !== null ? ((d = d.index), d < a ? ((f.flags |= 2), a) : d) : ((f.flags |= 2), a))
                : ((f.flags |= 1048576), a)
        );
    }
    function u(f) {
        return (e && f.alternate === null && (f.flags |= 2), f);
    }
    function i(f, a, d, v) {
        return a === null || a.tag !== 6
            ? ((a = eo(d, f.mode, v)), (a.return = f), a)
            : ((a = l(a, d)), (a.return = f), a);
    }
    function s(f, a, d, v) {
        var x = d.type;
        return x === Gt
            ? h(f, a, d.props.children, v, d.key)
            : a !== null &&
                (a.elementType === x || (typeof x == 'object' && x !== null && x.$$typeof === at && zi(x) === a.type))
              ? ((v = l(a, d.props)), (v.ref = jn(f, a, d)), (v.return = f), v)
              : ((v = Vr(d.type, d.key, d.props, null, f.mode, v)), (v.ref = jn(f, a, d)), (v.return = f), v);
    }
    function c(f, a, d, v) {
        return a === null ||
            a.tag !== 4 ||
            a.stateNode.containerInfo !== d.containerInfo ||
            a.stateNode.implementation !== d.implementation
            ? ((a = to(d, f.mode, v)), (a.return = f), a)
            : ((a = l(a, d.children || [])), (a.return = f), a);
    }
    function h(f, a, d, v, x) {
        return a === null || a.tag !== 7
            ? ((a = Dt(d, f.mode, v, x)), (a.return = f), a)
            : ((a = l(a, d)), (a.return = f), a);
    }
    function m(f, a, d) {
        if ((typeof a == 'string' && a !== '') || typeof a == 'number')
            return ((a = eo('' + a, f.mode, d)), (a.return = f), a);
        if (typeof a == 'object' && a !== null) {
            switch (a.$$typeof) {
                case hr:
                    return (
                        (d = Vr(a.type, a.key, a.props, null, f.mode, d)),
                        (d.ref = jn(f, null, a)),
                        (d.return = f),
                        d
                    );
                case Yt:
                    return ((a = to(a, f.mode, d)), (a.return = f), a);
                case at:
                    var v = a._init;
                    return m(f, v(a._payload), d);
            }
            if (On(a) || En(a)) return ((a = Dt(a, f.mode, d, null)), (a.return = f), a);
            Nr(f, a);
        }
        return null;
    }
    function p(f, a, d, v) {
        var x = a !== null ? a.key : null;
        if ((typeof d == 'string' && d !== '') || typeof d == 'number') return x !== null ? null : i(f, a, '' + d, v);
        if (typeof d == 'object' && d !== null) {
            switch (d.$$typeof) {
                case hr:
                    return d.key === x ? s(f, a, d, v) : null;
                case Yt:
                    return d.key === x ? c(f, a, d, v) : null;
                case at:
                    return ((x = d._init), p(f, a, x(d._payload), v));
            }
            if (On(d) || En(d)) return x !== null ? null : h(f, a, d, v, null);
            Nr(f, d);
        }
        return null;
    }
    function w(f, a, d, v, x) {
        if ((typeof v == 'string' && v !== '') || typeof v == 'number')
            return ((f = f.get(d) || null), i(a, f, '' + v, x));
        if (typeof v == 'object' && v !== null) {
            switch (v.$$typeof) {
                case hr:
                    return ((f = f.get(v.key === null ? d : v.key) || null), s(a, f, v, x));
                case Yt:
                    return ((f = f.get(v.key === null ? d : v.key) || null), c(a, f, v, x));
                case at:
                    var P = v._init;
                    return w(f, a, d, P(v._payload), x);
            }
            if (On(v) || En(v)) return ((f = f.get(d) || null), h(a, f, v, x, null));
            Nr(a, v);
        }
        return null;
    }
    function S(f, a, d, v) {
        for (var x = null, P = null, C = a, j = (a = 0), V = null; C !== null && j < d.length; j++) {
            C.index > j ? ((V = C), (C = null)) : (V = C.sibling);
            var R = p(f, C, d[j], v);
            if (R === null) {
                C === null && (C = V);
                break;
            }
            (e && C && R.alternate === null && t(f, C),
                (a = o(R, a, j)),
                P === null ? (x = R) : (P.sibling = R),
                (P = R),
                (C = V));
        }
        if (j === d.length) return (n(f, C), W && Tt(f, j), x);
        if (C === null) {
            for (; j < d.length; j++)
                ((C = m(f, d[j], v)),
                    C !== null && ((a = o(C, a, j)), P === null ? (x = C) : (P.sibling = C), (P = C)));
            return (W && Tt(f, j), x);
        }
        for (C = r(f, C); j < d.length; j++)
            ((V = w(C, f, j, d[j], v)),
                V !== null &&
                    (e && V.alternate !== null && C.delete(V.key === null ? j : V.key),
                    (a = o(V, a, j)),
                    P === null ? (x = V) : (P.sibling = V),
                    (P = V)));
        return (
            e &&
                C.forEach(function (de) {
                    return t(f, de);
                }),
            W && Tt(f, j),
            x
        );
    }
    function k(f, a, d, v) {
        var x = En(d);
        if (typeof x != 'function') throw Error(g(150));
        if (((d = x.call(d)), d == null)) throw Error(g(151));
        for (var P = (x = null), C = a, j = (a = 0), V = null, R = d.next(); C !== null && !R.done; j++, R = d.next()) {
            C.index > j ? ((V = C), (C = null)) : (V = C.sibling);
            var de = p(f, C, R.value, v);
            if (de === null) {
                C === null && (C = V);
                break;
            }
            (e && C && de.alternate === null && t(f, C),
                (a = o(de, a, j)),
                P === null ? (x = de) : (P.sibling = de),
                (P = de),
                (C = V));
        }
        if (R.done) return (n(f, C), W && Tt(f, j), x);
        if (C === null) {
            for (; !R.done; j++, R = d.next())
                ((R = m(f, R.value, v)),
                    R !== null && ((a = o(R, a, j)), P === null ? (x = R) : (P.sibling = R), (P = R)));
            return (W && Tt(f, j), x);
        }
        for (C = r(f, C); !R.done; j++, R = d.next())
            ((R = w(C, f, j, R.value, v)),
                R !== null &&
                    (e && R.alternate !== null && C.delete(R.key === null ? j : R.key),
                    (a = o(R, a, j)),
                    P === null ? (x = R) : (P.sibling = R),
                    (P = R)));
        return (
            e &&
                C.forEach(function (zt) {
                    return t(f, zt);
                }),
            W && Tt(f, j),
            x
        );
    }
    function D(f, a, d, v) {
        if (
            (typeof d == 'object' && d !== null && d.type === Gt && d.key === null && (d = d.props.children),
            typeof d == 'object' && d !== null)
        ) {
            switch (d.$$typeof) {
                case hr:
                    e: {
                        for (var x = d.key, P = a; P !== null; ) {
                            if (P.key === x) {
                                if (((x = d.type), x === Gt)) {
                                    if (P.tag === 7) {
                                        (n(f, P.sibling), (a = l(P, d.props.children)), (a.return = f), (f = a));
                                        break e;
                                    }
                                } else if (
                                    P.elementType === x ||
                                    (typeof x == 'object' && x !== null && x.$$typeof === at && zi(x) === P.type)
                                ) {
                                    (n(f, P.sibling),
                                        (a = l(P, d.props)),
                                        (a.ref = jn(f, P, d)),
                                        (a.return = f),
                                        (f = a));
                                    break e;
                                }
                                n(f, P);
                                break;
                            } else t(f, P);
                            P = P.sibling;
                        }
                        d.type === Gt
                            ? ((a = Dt(d.props.children, f.mode, v, d.key)), (a.return = f), (f = a))
                            : ((v = Vr(d.type, d.key, d.props, null, f.mode, v)),
                              (v.ref = jn(f, a, d)),
                              (v.return = f),
                              (f = v));
                    }
                    return u(f);
                case Yt:
                    e: {
                        for (P = d.key; a !== null; ) {
                            if (a.key === P)
                                if (
                                    a.tag === 4 &&
                                    a.stateNode.containerInfo === d.containerInfo &&
                                    a.stateNode.implementation === d.implementation
                                ) {
                                    (n(f, a.sibling), (a = l(a, d.children || [])), (a.return = f), (f = a));
                                    break e;
                                } else {
                                    n(f, a);
                                    break;
                                }
                            else t(f, a);
                            a = a.sibling;
                        }
                        ((a = to(d, f.mode, v)), (a.return = f), (f = a));
                    }
                    return u(f);
                case at:
                    return ((P = d._init), D(f, a, P(d._payload), v));
            }
            if (On(d)) return S(f, a, d, v);
            if (En(d)) return k(f, a, d, v);
            Nr(f, d);
        }
        return (typeof d == 'string' && d !== '') || typeof d == 'number'
            ? ((d = '' + d),
              a !== null && a.tag === 6
                  ? (n(f, a.sibling), (a = l(a, d)), (a.return = f), (f = a))
                  : (n(f, a), (a = eo(d, f.mode, v)), (a.return = f), (f = a)),
              u(f))
            : n(f, a);
    }
    return D;
}
var hn = ga(!0),
    wa = ga(!1),
    nl = Nt(null),
    rl = null,
    nn = null,
    wu = null;
function Su() {
    wu = nn = rl = null;
}
function ku(e) {
    var t = nl.current;
    (A(nl), (e._currentValue = t));
}
function Oo(e, t, n) {
    for (; e !== null; ) {
        var r = e.alternate;
        if (
            ((e.childLanes & t) !== t
                ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
                : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
            e === n)
        )
            break;
        e = e.return;
    }
}
function cn(e, t) {
    ((rl = e),
        (wu = nn = null),
        (e = e.dependencies),
        e !== null && e.firstContext !== null && (e.lanes & t && (ge = !0), (e.firstContext = null)));
}
function Oe(e) {
    var t = e._currentValue;
    if (wu !== e)
        if (((e = { context: e, memoizedValue: t, next: null }), nn === null)) {
            if (rl === null) throw Error(g(308));
            ((nn = e), (rl.dependencies = { lanes: 0, firstContext: e }));
        } else nn = nn.next = e;
    return t;
}
var Ot = null;
function xu(e) {
    Ot === null ? (Ot = [e]) : Ot.push(e);
}
function Sa(e, t, n, r) {
    var l = t.interleaved;
    return (l === null ? ((n.next = n), xu(t)) : ((n.next = l.next), (l.next = n)), (t.interleaved = n), ot(e, r));
}
function ot(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
        ((e.childLanes |= t), (n = e.alternate), n !== null && (n.childLanes |= t), (n = e), (e = e.return));
    return n.tag === 3 ? n.stateNode : null;
}
var ct = !1;
function Eu(e) {
    e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, interleaved: null, lanes: 0 },
        effects: null,
    };
}
function ka(e, t) {
    ((e = e.updateQueue),
        t.updateQueue === e &&
            (t.updateQueue = {
                baseState: e.baseState,
                firstBaseUpdate: e.firstBaseUpdate,
                lastBaseUpdate: e.lastBaseUpdate,
                shared: e.shared,
                effects: e.effects,
            }));
}
function nt(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function wt(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (((r = r.shared), F & 2)) {
        var l = r.pending;
        return (l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)), (r.pending = t), ot(e, n));
    }
    return (
        (l = r.interleaved),
        l === null ? ((t.next = t), xu(r)) : ((t.next = l.next), (l.next = t)),
        (r.interleaved = t),
        ot(e, n)
    );
}
function Dr(e, t, n) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))) {
        var r = t.lanes;
        ((r &= e.pendingLanes), (n |= r), (t.lanes = n), su(e, n));
    }
}
function Ti(e, t) {
    var n = e.updateQueue,
        r = e.alternate;
    if (r !== null && ((r = r.updateQueue), n === r)) {
        var l = null,
            o = null;
        if (((n = n.firstBaseUpdate), n !== null)) {
            do {
                var u = {
                    eventTime: n.eventTime,
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: n.callback,
                    next: null,
                };
                (o === null ? (l = o = u) : (o = o.next = u), (n = n.next));
            } while (n !== null);
            o === null ? (l = o = t) : (o = o.next = t);
        } else l = o = t;
        ((n = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: o, shared: r.shared, effects: r.effects }),
            (e.updateQueue = n));
        return;
    }
    ((e = n.lastBaseUpdate), e === null ? (n.firstBaseUpdate = t) : (e.next = t), (n.lastBaseUpdate = t));
}
function ll(e, t, n, r) {
    var l = e.updateQueue;
    ct = !1;
    var o = l.firstBaseUpdate,
        u = l.lastBaseUpdate,
        i = l.shared.pending;
    if (i !== null) {
        l.shared.pending = null;
        var s = i,
            c = s.next;
        ((s.next = null), u === null ? (o = c) : (u.next = c), (u = s));
        var h = e.alternate;
        h !== null &&
            ((h = h.updateQueue),
            (i = h.lastBaseUpdate),
            i !== u && (i === null ? (h.firstBaseUpdate = c) : (i.next = c), (h.lastBaseUpdate = s)));
    }
    if (o !== null) {
        var m = l.baseState;
        ((u = 0), (h = c = s = null), (i = o));
        do {
            var p = i.lane,
                w = i.eventTime;
            if ((r & p) === p) {
                h !== null &&
                    (h = h.next =
                        { eventTime: w, lane: 0, tag: i.tag, payload: i.payload, callback: i.callback, next: null });
                e: {
                    var S = e,
                        k = i;
                    switch (((p = t), (w = n), k.tag)) {
                        case 1:
                            if (((S = k.payload), typeof S == 'function')) {
                                m = S.call(w, m, p);
                                break e;
                            }
                            m = S;
                            break e;
                        case 3:
                            S.flags = (S.flags & -65537) | 128;
                        case 0:
                            if (((S = k.payload), (p = typeof S == 'function' ? S.call(w, m, p) : S), p == null))
                                break e;
                            m = K({}, m, p);
                            break e;
                        case 2:
                            ct = !0;
                    }
                }
                i.callback !== null &&
                    i.lane !== 0 &&
                    ((e.flags |= 64), (p = l.effects), p === null ? (l.effects = [i]) : p.push(i));
            } else
                ((w = { eventTime: w, lane: p, tag: i.tag, payload: i.payload, callback: i.callback, next: null }),
                    h === null ? ((c = h = w), (s = m)) : (h = h.next = w),
                    (u |= p));
            if (((i = i.next), i === null)) {
                if (((i = l.shared.pending), i === null)) break;
                ((p = i), (i = p.next), (p.next = null), (l.lastBaseUpdate = p), (l.shared.pending = null));
            }
        } while (!0);
        if (
            (h === null && (s = m),
            (l.baseState = s),
            (l.firstBaseUpdate = c),
            (l.lastBaseUpdate = h),
            (t = l.shared.interleaved),
            t !== null)
        ) {
            l = t;
            do ((u |= l.lane), (l = l.next));
            while (l !== t);
        } else o === null && (l.shared.lanes = 0);
        ((Bt |= u), (e.lanes = u), (e.memoizedState = m));
    }
}
function Ri(e, t, n) {
    if (((e = t.effects), (t.effects = null), e !== null))
        for (t = 0; t < e.length; t++) {
            var r = e[t],
                l = r.callback;
            if (l !== null) {
                if (((r.callback = null), (r = n), typeof l != 'function')) throw Error(g(191, l));
                l.call(r);
            }
        }
}
var dr = {},
    Je = Nt(dr),
    nr = Nt(dr),
    rr = Nt(dr);
function It(e) {
    if (e === dr) throw Error(g(174));
    return e;
}
function _u(e, t) {
    switch ((U(rr, t), U(nr, e), U(Je, dr), (e = t.nodeType), e)) {
        case 9:
        case 11:
            t = (t = t.documentElement) ? t.namespaceURI : po(null, '');
            break;
        default:
            ((e = e === 8 ? t.parentNode : t), (t = e.namespaceURI || null), (e = e.tagName), (t = po(t, e)));
    }
    (A(Je), U(Je, t));
}
function vn() {
    (A(Je), A(nr), A(rr));
}
function xa(e) {
    It(rr.current);
    var t = It(Je.current),
        n = po(t, e.type);
    t !== n && (U(nr, e), U(Je, n));
}
function Cu(e) {
    nr.current === e && (A(Je), A(nr));
}
var H = Nt(0);
function ol(e) {
    for (var t = e; t !== null; ) {
        if (t.tag === 13) {
            var n = t.memoizedState;
            if (n !== null && ((n = n.dehydrated), n === null || n.data === '$?' || n.data === '$!')) return t;
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
            if (t.flags & 128) return t;
        } else if (t.child !== null) {
            ((t.child.return = t), (t = t.child));
            continue;
        }
        if (t === e) break;
        for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return null;
            t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
}
var Gl = [];
function Nu() {
    for (var e = 0; e < Gl.length; e++) Gl[e]._workInProgressVersionPrimary = null;
    Gl.length = 0;
}
var Mr = it.ReactCurrentDispatcher,
    Xl = it.ReactCurrentBatchConfig,
    Ut = 0,
    Q = null,
    b = null,
    ne = null,
    ul = !1,
    An = !1,
    lr = 0,
    Td = 0;
function se() {
    throw Error(g(321));
}
function Pu(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++) if (!Ve(e[n], t[n])) return !1;
    return !0;
}
function ju(e, t, n, r, l, o) {
    if (
        ((Ut = o),
        (Q = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.lanes = 0),
        (Mr.current = e === null || e.memoizedState === null ? Id : Fd),
        (e = n(r, l)),
        An)
    ) {
        o = 0;
        do {
            if (((An = !1), (lr = 0), 25 <= o)) throw Error(g(301));
            ((o += 1), (ne = b = null), (t.updateQueue = null), (Mr.current = Dd), (e = n(r, l)));
        } while (An);
    }
    if (((Mr.current = il), (t = b !== null && b.next !== null), (Ut = 0), (ne = b = Q = null), (ul = !1), t))
        throw Error(g(300));
    return e;
}
function zu() {
    var e = lr !== 0;
    return ((lr = 0), e);
}
function Ge() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (ne === null ? (Q.memoizedState = ne = e) : (ne = ne.next = e), ne);
}
function Ie() {
    if (b === null) {
        var e = Q.alternate;
        e = e !== null ? e.memoizedState : null;
    } else e = b.next;
    var t = ne === null ? Q.memoizedState : ne.next;
    if (t !== null) ((ne = t), (b = e));
    else {
        if (e === null) throw Error(g(310));
        ((b = e),
            (e = {
                memoizedState: b.memoizedState,
                baseState: b.baseState,
                baseQueue: b.baseQueue,
                queue: b.queue,
                next: null,
            }),
            ne === null ? (Q.memoizedState = ne = e) : (ne = ne.next = e));
    }
    return ne;
}
function or(e, t) {
    return typeof t == 'function' ? t(e) : t;
}
function Zl(e) {
    var t = Ie(),
        n = t.queue;
    if (n === null) throw Error(g(311));
    n.lastRenderedReducer = e;
    var r = b,
        l = r.baseQueue,
        o = n.pending;
    if (o !== null) {
        if (l !== null) {
            var u = l.next;
            ((l.next = o.next), (o.next = u));
        }
        ((r.baseQueue = l = o), (n.pending = null));
    }
    if (l !== null) {
        ((o = l.next), (r = r.baseState));
        var i = (u = null),
            s = null,
            c = o;
        do {
            var h = c.lane;
            if ((Ut & h) === h)
                (s !== null &&
                    (s = s.next =
                        {
                            lane: 0,
                            action: c.action,
                            hasEagerState: c.hasEagerState,
                            eagerState: c.eagerState,
                            next: null,
                        }),
                    (r = c.hasEagerState ? c.eagerState : e(r, c.action)));
            else {
                var m = {
                    lane: h,
                    action: c.action,
                    hasEagerState: c.hasEagerState,
                    eagerState: c.eagerState,
                    next: null,
                };
                (s === null ? ((i = s = m), (u = r)) : (s = s.next = m), (Q.lanes |= h), (Bt |= h));
            }
            c = c.next;
        } while (c !== null && c !== o);
        (s === null ? (u = r) : (s.next = i),
            Ve(r, t.memoizedState) || (ge = !0),
            (t.memoizedState = r),
            (t.baseState = u),
            (t.baseQueue = s),
            (n.lastRenderedState = r));
    }
    if (((e = n.interleaved), e !== null)) {
        l = e;
        do ((o = l.lane), (Q.lanes |= o), (Bt |= o), (l = l.next));
        while (l !== e);
    } else l === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
}
function Jl(e) {
    var t = Ie(),
        n = t.queue;
    if (n === null) throw Error(g(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
        l = n.pending,
        o = t.memoizedState;
    if (l !== null) {
        n.pending = null;
        var u = (l = l.next);
        do ((o = e(o, u.action)), (u = u.next));
        while (u !== l);
        (Ve(o, t.memoizedState) || (ge = !0),
            (t.memoizedState = o),
            t.baseQueue === null && (t.baseState = o),
            (n.lastRenderedState = o));
    }
    return [o, r];
}
function Ea() {}
function _a(e, t) {
    var n = Q,
        r = Ie(),
        l = t(),
        o = !Ve(r.memoizedState, l);
    if (
        (o && ((r.memoizedState = l), (ge = !0)),
        (r = r.queue),
        Tu(Pa.bind(null, n, r, e), [e]),
        r.getSnapshot !== t || o || (ne !== null && ne.memoizedState.tag & 1))
    ) {
        if (((n.flags |= 2048), ur(9, Na.bind(null, n, r, l, t), void 0, null), re === null)) throw Error(g(349));
        Ut & 30 || Ca(n, t, l);
    }
    return l;
}
function Ca(e, t, n) {
    ((e.flags |= 16384),
        (e = { getSnapshot: t, value: n }),
        (t = Q.updateQueue),
        t === null
            ? ((t = { lastEffect: null, stores: null }), (Q.updateQueue = t), (t.stores = [e]))
            : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
}
function Na(e, t, n, r) {
    ((t.value = n), (t.getSnapshot = r), ja(t) && za(e));
}
function Pa(e, t, n) {
    return n(function () {
        ja(t) && za(e);
    });
}
function ja(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !Ve(e, n);
    } catch {
        return !0;
    }
}
function za(e) {
    var t = ot(e, 1);
    t !== null && Ae(t, e, 1, -1);
}
function Li(e) {
    var t = Ge();
    return (
        typeof e == 'function' && (e = e()),
        (t.memoizedState = t.baseState = e),
        (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: or,
            lastRenderedState: e,
        }),
        (t.queue = e),
        (e = e.dispatch = Od.bind(null, Q, e)),
        [t.memoizedState, e]
    );
}
function ur(e, t, n, r) {
    return (
        (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
        (t = Q.updateQueue),
        t === null
            ? ((t = { lastEffect: null, stores: null }), (Q.updateQueue = t), (t.lastEffect = e.next = e))
            : ((n = t.lastEffect),
              n === null
                  ? (t.lastEffect = e.next = e)
                  : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
        e
    );
}
function Ta() {
    return Ie().memoizedState;
}
function $r(e, t, n, r) {
    var l = Ge();
    ((Q.flags |= e), (l.memoizedState = ur(1 | t, n, void 0, r === void 0 ? null : r)));
}
function Sl(e, t, n, r) {
    var l = Ie();
    r = r === void 0 ? null : r;
    var o = void 0;
    if (b !== null) {
        var u = b.memoizedState;
        if (((o = u.destroy), r !== null && Pu(r, u.deps))) {
            l.memoizedState = ur(t, n, o, r);
            return;
        }
    }
    ((Q.flags |= e), (l.memoizedState = ur(1 | t, n, o, r)));
}
function Oi(e, t) {
    return $r(8390656, 8, e, t);
}
function Tu(e, t) {
    return Sl(2048, 8, e, t);
}
function Ra(e, t) {
    return Sl(4, 2, e, t);
}
function La(e, t) {
    return Sl(4, 4, e, t);
}
function Oa(e, t) {
    if (typeof t == 'function')
        return (
            (e = e()),
            t(e),
            function () {
                t(null);
            }
        );
    if (t != null)
        return (
            (e = e()),
            (t.current = e),
            function () {
                t.current = null;
            }
        );
}
function Ia(e, t, n) {
    return ((n = n != null ? n.concat([e]) : null), Sl(4, 4, Oa.bind(null, t, e), n));
}
function Ru() {}
function Fa(e, t) {
    var n = Ie();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Pu(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e);
}
function Da(e, t) {
    var n = Ie();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Pu(t, r[1]) ? r[0] : ((e = e()), (n.memoizedState = [e, t]), e);
}
function Ma(e, t, n) {
    return Ut & 21
        ? (Ve(n, t) || ((n = Vs()), (Q.lanes |= n), (Bt |= n), (e.baseState = !0)), t)
        : (e.baseState && ((e.baseState = !1), (ge = !0)), (e.memoizedState = n));
}
function Rd(e, t) {
    var n = M;
    ((M = n !== 0 && 4 > n ? n : 4), e(!0));
    var r = Xl.transition;
    Xl.transition = {};
    try {
        (e(!1), t());
    } finally {
        ((M = n), (Xl.transition = r));
    }
}
function $a() {
    return Ie().memoizedState;
}
function Ld(e, t, n) {
    var r = kt(e);
    if (((n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }), Ua(e))) Ba(t, n);
    else if (((n = Sa(e, t, n, r)), n !== null)) {
        var l = me();
        (Ae(n, e, r, l), Aa(n, t, r));
    }
}
function Od(e, t, n) {
    var r = kt(e),
        l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
    if (Ua(e)) Ba(t, l);
    else {
        var o = e.alternate;
        if (e.lanes === 0 && (o === null || o.lanes === 0) && ((o = t.lastRenderedReducer), o !== null))
            try {
                var u = t.lastRenderedState,
                    i = o(u, n);
                if (((l.hasEagerState = !0), (l.eagerState = i), Ve(i, u))) {
                    var s = t.interleaved;
                    (s === null ? ((l.next = l), xu(t)) : ((l.next = s.next), (s.next = l)), (t.interleaved = l));
                    return;
                }
            } catch {
            } finally {
            }
        ((n = Sa(e, t, l, r)), n !== null && ((l = me()), Ae(n, e, r, l), Aa(n, t, r)));
    }
}
function Ua(e) {
    var t = e.alternate;
    return e === Q || (t !== null && t === Q);
}
function Ba(e, t) {
    An = ul = !0;
    var n = e.pending;
    (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t));
}
function Aa(e, t, n) {
    if (n & 4194240) {
        var r = t.lanes;
        ((r &= e.pendingLanes), (n |= r), (t.lanes = n), su(e, n));
    }
}
var il = {
        readContext: Oe,
        useCallback: se,
        useContext: se,
        useEffect: se,
        useImperativeHandle: se,
        useInsertionEffect: se,
        useLayoutEffect: se,
        useMemo: se,
        useReducer: se,
        useRef: se,
        useState: se,
        useDebugValue: se,
        useDeferredValue: se,
        useTransition: se,
        useMutableSource: se,
        useSyncExternalStore: se,
        useId: se,
        unstable_isNewReconciler: !1,
    },
    Id = {
        readContext: Oe,
        useCallback: function (e, t) {
            return ((Ge().memoizedState = [e, t === void 0 ? null : t]), e);
        },
        useContext: Oe,
        useEffect: Oi,
        useImperativeHandle: function (e, t, n) {
            return ((n = n != null ? n.concat([e]) : null), $r(4194308, 4, Oa.bind(null, t, e), n));
        },
        useLayoutEffect: function (e, t) {
            return $r(4194308, 4, e, t);
        },
        useInsertionEffect: function (e, t) {
            return $r(4, 2, e, t);
        },
        useMemo: function (e, t) {
            var n = Ge();
            return ((t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e);
        },
        useReducer: function (e, t, n) {
            var r = Ge();
            return (
                (t = n !== void 0 ? n(t) : t),
                (r.memoizedState = r.baseState = t),
                (e = {
                    pending: null,
                    interleaved: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: e,
                    lastRenderedState: t,
                }),
                (r.queue = e),
                (e = e.dispatch = Ld.bind(null, Q, e)),
                [r.memoizedState, e]
            );
        },
        useRef: function (e) {
            var t = Ge();
            return ((e = { current: e }), (t.memoizedState = e));
        },
        useState: Li,
        useDebugValue: Ru,
        useDeferredValue: function (e) {
            return (Ge().memoizedState = e);
        },
        useTransition: function () {
            var e = Li(!1),
                t = e[0];
            return ((e = Rd.bind(null, e[1])), (Ge().memoizedState = e), [t, e]);
        },
        useMutableSource: function () {},
        useSyncExternalStore: function (e, t, n) {
            var r = Q,
                l = Ge();
            if (W) {
                if (n === void 0) throw Error(g(407));
                n = n();
            } else {
                if (((n = t()), re === null)) throw Error(g(349));
                Ut & 30 || Ca(r, t, n);
            }
            l.memoizedState = n;
            var o = { value: n, getSnapshot: t };
            return (
                (l.queue = o),
                Oi(Pa.bind(null, r, o, e), [e]),
                (r.flags |= 2048),
                ur(9, Na.bind(null, r, o, n, t), void 0, null),
                n
            );
        },
        useId: function () {
            var e = Ge(),
                t = re.identifierPrefix;
            if (W) {
                var n = tt,
                    r = et;
                ((n = (r & ~(1 << (32 - Be(r) - 1))).toString(32) + n),
                    (t = ':' + t + 'R' + n),
                    (n = lr++),
                    0 < n && (t += 'H' + n.toString(32)),
                    (t += ':'));
            } else ((n = Td++), (t = ':' + t + 'r' + n.toString(32) + ':'));
            return (e.memoizedState = t);
        },
        unstable_isNewReconciler: !1,
    },
    Fd = {
        readContext: Oe,
        useCallback: Fa,
        useContext: Oe,
        useEffect: Tu,
        useImperativeHandle: Ia,
        useInsertionEffect: Ra,
        useLayoutEffect: La,
        useMemo: Da,
        useReducer: Zl,
        useRef: Ta,
        useState: function () {
            return Zl(or);
        },
        useDebugValue: Ru,
        useDeferredValue: function (e) {
            var t = Ie();
            return Ma(t, b.memoizedState, e);
        },
        useTransition: function () {
            var e = Zl(or)[0],
                t = Ie().memoizedState;
            return [e, t];
        },
        useMutableSource: Ea,
        useSyncExternalStore: _a,
        useId: $a,
        unstable_isNewReconciler: !1,
    },
    Dd = {
        readContext: Oe,
        useCallback: Fa,
        useContext: Oe,
        useEffect: Tu,
        useImperativeHandle: Ia,
        useInsertionEffect: Ra,
        useLayoutEffect: La,
        useMemo: Da,
        useReducer: Jl,
        useRef: Ta,
        useState: function () {
            return Jl(or);
        },
        useDebugValue: Ru,
        useDeferredValue: function (e) {
            var t = Ie();
            return b === null ? (t.memoizedState = e) : Ma(t, b.memoizedState, e);
        },
        useTransition: function () {
            var e = Jl(or)[0],
                t = Ie().memoizedState;
            return [e, t];
        },
        useMutableSource: Ea,
        useSyncExternalStore: _a,
        useId: $a,
        unstable_isNewReconciler: !1,
    };
function Me(e, t) {
    if (e && e.defaultProps) {
        ((t = K({}, t)), (e = e.defaultProps));
        for (var n in e) t[n] === void 0 && (t[n] = e[n]);
        return t;
    }
    return t;
}
function Io(e, t, n, r) {
    ((t = e.memoizedState),
        (n = n(r, t)),
        (n = n == null ? t : K({}, t, n)),
        (e.memoizedState = n),
        e.lanes === 0 && (e.updateQueue.baseState = n));
}
var kl = {
    isMounted: function (e) {
        return (e = e._reactInternals) ? Wt(e) === e : !1;
    },
    enqueueSetState: function (e, t, n) {
        e = e._reactInternals;
        var r = me(),
            l = kt(e),
            o = nt(r, l);
        ((o.payload = t),
            n != null && (o.callback = n),
            (t = wt(e, o, l)),
            t !== null && (Ae(t, e, l, r), Dr(t, e, l)));
    },
    enqueueReplaceState: function (e, t, n) {
        e = e._reactInternals;
        var r = me(),
            l = kt(e),
            o = nt(r, l);
        ((o.tag = 1),
            (o.payload = t),
            n != null && (o.callback = n),
            (t = wt(e, o, l)),
            t !== null && (Ae(t, e, l, r), Dr(t, e, l)));
    },
    enqueueForceUpdate: function (e, t) {
        e = e._reactInternals;
        var n = me(),
            r = kt(e),
            l = nt(n, r);
        ((l.tag = 2), t != null && (l.callback = t), (t = wt(e, l, r)), t !== null && (Ae(t, e, r, n), Dr(t, e, r)));
    },
};
function Ii(e, t, n, r, l, o, u) {
    return (
        (e = e.stateNode),
        typeof e.shouldComponentUpdate == 'function'
            ? e.shouldComponentUpdate(r, o, u)
            : t.prototype && t.prototype.isPureReactComponent
              ? !qn(n, r) || !qn(l, o)
              : !0
    );
}
function Va(e, t, n) {
    var r = !1,
        l = _t,
        o = t.contextType;
    return (
        typeof o == 'object' && o !== null
            ? (o = Oe(o))
            : ((l = Se(t) ? Mt : fe.current), (r = t.contextTypes), (o = (r = r != null) ? pn(e, l) : _t)),
        (t = new t(n, o)),
        (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
        (t.updater = kl),
        (e.stateNode = t),
        (t._reactInternals = e),
        r &&
            ((e = e.stateNode),
            (e.__reactInternalMemoizedUnmaskedChildContext = l),
            (e.__reactInternalMemoizedMaskedChildContext = o)),
        t
    );
}
function Fi(e, t, n, r) {
    ((e = t.state),
        typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(n, r),
        typeof t.UNSAFE_componentWillReceiveProps == 'function' && t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && kl.enqueueReplaceState(t, t.state, null));
}
function Fo(e, t, n, r) {
    var l = e.stateNode;
    ((l.props = n), (l.state = e.memoizedState), (l.refs = {}), Eu(e));
    var o = t.contextType;
    (typeof o == 'object' && o !== null ? (l.context = Oe(o)) : ((o = Se(t) ? Mt : fe.current), (l.context = pn(e, o))),
        (l.state = e.memoizedState),
        (o = t.getDerivedStateFromProps),
        typeof o == 'function' && (Io(e, t, o, n), (l.state = e.memoizedState)),
        typeof t.getDerivedStateFromProps == 'function' ||
            typeof l.getSnapshotBeforeUpdate == 'function' ||
            (typeof l.UNSAFE_componentWillMount != 'function' && typeof l.componentWillMount != 'function') ||
            ((t = l.state),
            typeof l.componentWillMount == 'function' && l.componentWillMount(),
            typeof l.UNSAFE_componentWillMount == 'function' && l.UNSAFE_componentWillMount(),
            t !== l.state && kl.enqueueReplaceState(l, l.state, null),
            ll(e, n, l, r),
            (l.state = e.memoizedState)),
        typeof l.componentDidMount == 'function' && (e.flags |= 4194308));
}
function yn(e, t) {
    try {
        var n = '',
            r = t;
        do ((n += cf(r)), (r = r.return));
        while (r);
        var l = n;
    } catch (o) {
        l =
            `
Error generating stack: ` +
            o.message +
            `
` +
            o.stack;
    }
    return { value: e, source: t, stack: l, digest: null };
}
function ql(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Do(e, t) {
    try {
        console.error(t.value);
    } catch (n) {
        setTimeout(function () {
            throw n;
        });
    }
}
var Md = typeof WeakMap == 'function' ? WeakMap : Map;
function Wa(e, t, n) {
    ((n = nt(-1, n)), (n.tag = 3), (n.payload = { element: null }));
    var r = t.value;
    return (
        (n.callback = function () {
            (al || ((al = !0), (Ko = r)), Do(e, t));
        }),
        n
    );
}
function Ha(e, t, n) {
    ((n = nt(-1, n)), (n.tag = 3));
    var r = e.type.getDerivedStateFromError;
    if (typeof r == 'function') {
        var l = t.value;
        ((n.payload = function () {
            return r(l);
        }),
            (n.callback = function () {
                Do(e, t);
            }));
    }
    var o = e.stateNode;
    return (
        o !== null &&
            typeof o.componentDidCatch == 'function' &&
            (n.callback = function () {
                (Do(e, t), typeof r != 'function' && (St === null ? (St = new Set([this])) : St.add(this)));
                var u = t.stack;
                this.componentDidCatch(t.value, { componentStack: u !== null ? u : '' });
            }),
        n
    );
}
function Di(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
        r = e.pingCache = new Md();
        var l = new Set();
        r.set(t, l);
    } else ((l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l)));
    l.has(n) || (l.add(n), (e = Jd.bind(null, e, t, n)), t.then(e, e));
}
function Mi(e) {
    do {
        var t;
        if (((t = e.tag === 13) && ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)), t)) return e;
        e = e.return;
    } while (e !== null);
    return null;
}
function $i(e, t, n, r, l) {
    return e.mode & 1
        ? ((e.flags |= 65536), (e.lanes = l), e)
        : (e === t
              ? (e.flags |= 65536)
              : ((e.flags |= 128),
                (n.flags |= 131072),
                (n.flags &= -52805),
                n.tag === 1 && (n.alternate === null ? (n.tag = 17) : ((t = nt(-1, 1)), (t.tag = 2), wt(n, t, 1))),
                (n.lanes |= 1)),
          e);
}
var $d = it.ReactCurrentOwner,
    ge = !1;
function pe(e, t, n, r) {
    t.child = e === null ? wa(t, null, n, r) : hn(t, e.child, n, r);
}
function Ui(e, t, n, r, l) {
    n = n.render;
    var o = t.ref;
    return (
        cn(t, l),
        (r = ju(e, t, n, r, o, l)),
        (n = zu()),
        e !== null && !ge
            ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l), ut(e, t, l))
            : (W && n && vu(t), (t.flags |= 1), pe(e, t, r, l), t.child)
    );
}
function Bi(e, t, n, r, l) {
    if (e === null) {
        var o = n.type;
        return typeof o == 'function' &&
            !Uu(o) &&
            o.defaultProps === void 0 &&
            n.compare === null &&
            n.defaultProps === void 0
            ? ((t.tag = 15), (t.type = o), Qa(e, t, o, r, l))
            : ((e = Vr(n.type, null, r, t, t.mode, l)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((o = e.child), !(e.lanes & l))) {
        var u = o.memoizedProps;
        if (((n = n.compare), (n = n !== null ? n : qn), n(u, r) && e.ref === t.ref)) return ut(e, t, l);
    }
    return ((t.flags |= 1), (e = xt(o, r)), (e.ref = t.ref), (e.return = t), (t.child = e));
}
function Qa(e, t, n, r, l) {
    if (e !== null) {
        var o = e.memoizedProps;
        if (qn(o, r) && e.ref === t.ref)
            if (((ge = !1), (t.pendingProps = r = o), (e.lanes & l) !== 0)) e.flags & 131072 && (ge = !0);
            else return ((t.lanes = e.lanes), ut(e, t, l));
    }
    return Mo(e, t, n, r, l);
}
function Ka(e, t, n) {
    var r = t.pendingProps,
        l = r.children,
        o = e !== null ? e.memoizedState : null;
    if (r.mode === 'hidden')
        if (!(t.mode & 1))
            ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }), U(ln, Ee), (Ee |= n));
        else {
            if (!(n & 1073741824))
                return (
                    (e = o !== null ? o.baseLanes | n : n),
                    (t.lanes = t.childLanes = 1073741824),
                    (t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }),
                    (t.updateQueue = null),
                    U(ln, Ee),
                    (Ee |= e),
                    null
                );
            ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
                (r = o !== null ? o.baseLanes : n),
                U(ln, Ee),
                (Ee |= r));
        }
    else (o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n), U(ln, Ee), (Ee |= r));
    return (pe(e, t, l, n), t.child);
}
function Ya(e, t) {
    var n = t.ref;
    ((e === null && n !== null) || (e !== null && e.ref !== n)) && ((t.flags |= 512), (t.flags |= 2097152));
}
function Mo(e, t, n, r, l) {
    var o = Se(n) ? Mt : fe.current;
    return (
        (o = pn(t, o)),
        cn(t, l),
        (n = ju(e, t, n, r, o, l)),
        (r = zu()),
        e !== null && !ge
            ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l), ut(e, t, l))
            : (W && r && vu(t), (t.flags |= 1), pe(e, t, n, l), t.child)
    );
}
function Ai(e, t, n, r, l) {
    if (Se(n)) {
        var o = !0;
        br(t);
    } else o = !1;
    if ((cn(t, l), t.stateNode === null)) (Ur(e, t), Va(t, n, r), Fo(t, n, r, l), (r = !0));
    else if (e === null) {
        var u = t.stateNode,
            i = t.memoizedProps;
        u.props = i;
        var s = u.context,
            c = n.contextType;
        typeof c == 'object' && c !== null ? (c = Oe(c)) : ((c = Se(n) ? Mt : fe.current), (c = pn(t, c)));
        var h = n.getDerivedStateFromProps,
            m = typeof h == 'function' || typeof u.getSnapshotBeforeUpdate == 'function';
        (m ||
            (typeof u.UNSAFE_componentWillReceiveProps != 'function' &&
                typeof u.componentWillReceiveProps != 'function') ||
            ((i !== r || s !== c) && Fi(t, u, r, c)),
            (ct = !1));
        var p = t.memoizedState;
        ((u.state = p),
            ll(t, r, u, l),
            (s = t.memoizedState),
            i !== r || p !== s || we.current || ct
                ? (typeof h == 'function' && (Io(t, n, h, r), (s = t.memoizedState)),
                  (i = ct || Ii(t, n, i, r, p, s, c))
                      ? (m ||
                            (typeof u.UNSAFE_componentWillMount != 'function' &&
                                typeof u.componentWillMount != 'function') ||
                            (typeof u.componentWillMount == 'function' && u.componentWillMount(),
                            typeof u.UNSAFE_componentWillMount == 'function' && u.UNSAFE_componentWillMount()),
                        typeof u.componentDidMount == 'function' && (t.flags |= 4194308))
                      : (typeof u.componentDidMount == 'function' && (t.flags |= 4194308),
                        (t.memoizedProps = r),
                        (t.memoizedState = s)),
                  (u.props = r),
                  (u.state = s),
                  (u.context = c),
                  (r = i))
                : (typeof u.componentDidMount == 'function' && (t.flags |= 4194308), (r = !1)));
    } else {
        ((u = t.stateNode),
            ka(e, t),
            (i = t.memoizedProps),
            (c = t.type === t.elementType ? i : Me(t.type, i)),
            (u.props = c),
            (m = t.pendingProps),
            (p = u.context),
            (s = n.contextType),
            typeof s == 'object' && s !== null ? (s = Oe(s)) : ((s = Se(n) ? Mt : fe.current), (s = pn(t, s))));
        var w = n.getDerivedStateFromProps;
        ((h = typeof w == 'function' || typeof u.getSnapshotBeforeUpdate == 'function') ||
            (typeof u.UNSAFE_componentWillReceiveProps != 'function' &&
                typeof u.componentWillReceiveProps != 'function') ||
            ((i !== m || p !== s) && Fi(t, u, r, s)),
            (ct = !1),
            (p = t.memoizedState),
            (u.state = p),
            ll(t, r, u, l));
        var S = t.memoizedState;
        i !== m || p !== S || we.current || ct
            ? (typeof w == 'function' && (Io(t, n, w, r), (S = t.memoizedState)),
              (c = ct || Ii(t, n, c, r, p, S, s) || !1)
                  ? (h ||
                        (typeof u.UNSAFE_componentWillUpdate != 'function' &&
                            typeof u.componentWillUpdate != 'function') ||
                        (typeof u.componentWillUpdate == 'function' && u.componentWillUpdate(r, S, s),
                        typeof u.UNSAFE_componentWillUpdate == 'function' && u.UNSAFE_componentWillUpdate(r, S, s)),
                    typeof u.componentDidUpdate == 'function' && (t.flags |= 4),
                    typeof u.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
                  : (typeof u.componentDidUpdate != 'function' ||
                        (i === e.memoizedProps && p === e.memoizedState) ||
                        (t.flags |= 4),
                    typeof u.getSnapshotBeforeUpdate != 'function' ||
                        (i === e.memoizedProps && p === e.memoizedState) ||
                        (t.flags |= 1024),
                    (t.memoizedProps = r),
                    (t.memoizedState = S)),
              (u.props = r),
              (u.state = S),
              (u.context = s),
              (r = c))
            : (typeof u.componentDidUpdate != 'function' ||
                  (i === e.memoizedProps && p === e.memoizedState) ||
                  (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate != 'function' ||
                  (i === e.memoizedProps && p === e.memoizedState) ||
                  (t.flags |= 1024),
              (r = !1));
    }
    return $o(e, t, n, r, o, l);
}
function $o(e, t, n, r, l, o) {
    Ya(e, t);
    var u = (t.flags & 128) !== 0;
    if (!r && !u) return (l && Ni(t, n, !1), ut(e, t, o));
    ((r = t.stateNode), ($d.current = t));
    var i = u && typeof n.getDerivedStateFromError != 'function' ? null : r.render();
    return (
        (t.flags |= 1),
        e !== null && u ? ((t.child = hn(t, e.child, null, o)), (t.child = hn(t, null, i, o))) : pe(e, t, i, o),
        (t.memoizedState = r.state),
        l && Ni(t, n, !0),
        t.child
    );
}
function Ga(e) {
    var t = e.stateNode;
    (t.pendingContext ? Ci(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Ci(e, t.context, !1),
        _u(e, t.containerInfo));
}
function Vi(e, t, n, r, l) {
    return (mn(), gu(l), (t.flags |= 256), pe(e, t, n, r), t.child);
}
var Uo = { dehydrated: null, treeContext: null, retryLane: 0 };
function Bo(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
}
function Xa(e, t, n) {
    var r = t.pendingProps,
        l = H.current,
        o = !1,
        u = (t.flags & 128) !== 0,
        i;
    if (
        ((i = u) || (i = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
        i ? ((o = !0), (t.flags &= -129)) : (e === null || e.memoizedState !== null) && (l |= 1),
        U(H, l & 1),
        e === null)
    )
        return (
            Lo(t),
            (e = t.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null)
                ? (t.mode & 1 ? (e.data === '$!' ? (t.lanes = 8) : (t.lanes = 1073741824)) : (t.lanes = 1), null)
                : ((u = r.children),
                  (e = r.fallback),
                  o
                      ? ((r = t.mode),
                        (o = t.child),
                        (u = { mode: 'hidden', children: u }),
                        !(r & 1) && o !== null ? ((o.childLanes = 0), (o.pendingProps = u)) : (o = _l(u, r, 0, null)),
                        (e = Dt(e, r, n, null)),
                        (o.return = t),
                        (e.return = t),
                        (o.sibling = e),
                        (t.child = o),
                        (t.child.memoizedState = Bo(n)),
                        (t.memoizedState = Uo),
                        e)
                      : Lu(t, u))
        );
    if (((l = e.memoizedState), l !== null && ((i = l.dehydrated), i !== null))) return Ud(e, t, u, r, i, l, n);
    if (o) {
        ((o = r.fallback), (u = t.mode), (l = e.child), (i = l.sibling));
        var s = { mode: 'hidden', children: r.children };
        return (
            !(u & 1) && t.child !== l
                ? ((r = t.child), (r.childLanes = 0), (r.pendingProps = s), (t.deletions = null))
                : ((r = xt(l, s)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
            i !== null ? (o = xt(i, o)) : ((o = Dt(o, u, n, null)), (o.flags |= 2)),
            (o.return = t),
            (r.return = t),
            (r.sibling = o),
            (t.child = r),
            (r = o),
            (o = t.child),
            (u = e.child.memoizedState),
            (u = u === null ? Bo(n) : { baseLanes: u.baseLanes | n, cachePool: null, transitions: u.transitions }),
            (o.memoizedState = u),
            (o.childLanes = e.childLanes & ~n),
            (t.memoizedState = Uo),
            r
        );
    }
    return (
        (o = e.child),
        (e = o.sibling),
        (r = xt(o, { mode: 'visible', children: r.children })),
        !(t.mode & 1) && (r.lanes = n),
        (r.return = t),
        (r.sibling = null),
        e !== null && ((n = t.deletions), n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
        (t.child = r),
        (t.memoizedState = null),
        r
    );
}
function Lu(e, t) {
    return ((t = _l({ mode: 'visible', children: t }, e.mode, 0, null)), (t.return = e), (e.child = t));
}
function Pr(e, t, n, r) {
    return (
        r !== null && gu(r),
        hn(t, e.child, null, n),
        (e = Lu(t, t.pendingProps.children)),
        (e.flags |= 2),
        (t.memoizedState = null),
        e
    );
}
function Ud(e, t, n, r, l, o, u) {
    if (n)
        return t.flags & 256
            ? ((t.flags &= -257), (r = ql(Error(g(422)))), Pr(e, t, u, r))
            : t.memoizedState !== null
              ? ((t.child = e.child), (t.flags |= 128), null)
              : ((o = r.fallback),
                (l = t.mode),
                (r = _l({ mode: 'visible', children: r.children }, l, 0, null)),
                (o = Dt(o, l, u, null)),
                (o.flags |= 2),
                (r.return = t),
                (o.return = t),
                (r.sibling = o),
                (t.child = r),
                t.mode & 1 && hn(t, e.child, null, u),
                (t.child.memoizedState = Bo(u)),
                (t.memoizedState = Uo),
                o);
    if (!(t.mode & 1)) return Pr(e, t, u, null);
    if (l.data === '$!') {
        if (((r = l.nextSibling && l.nextSibling.dataset), r)) var i = r.dgst;
        return ((r = i), (o = Error(g(419))), (r = ql(o, r, void 0)), Pr(e, t, u, r));
    }
    if (((i = (u & e.childLanes) !== 0), ge || i)) {
        if (((r = re), r !== null)) {
            switch (u & -u) {
                case 4:
                    l = 2;
                    break;
                case 16:
                    l = 8;
                    break;
                case 64:
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                case 67108864:
                    l = 32;
                    break;
                case 536870912:
                    l = 268435456;
                    break;
                default:
                    l = 0;
            }
            ((l = l & (r.suspendedLanes | u) ? 0 : l),
                l !== 0 && l !== o.retryLane && ((o.retryLane = l), ot(e, l), Ae(r, e, l, -1)));
        }
        return ($u(), (r = ql(Error(g(421)))), Pr(e, t, u, r));
    }
    return l.data === '$?'
        ? ((t.flags |= 128), (t.child = e.child), (t = qd.bind(null, e)), (l._reactRetry = t), null)
        : ((e = o.treeContext),
          (_e = gt(l.nextSibling)),
          (Ce = t),
          (W = !0),
          (Ue = null),
          e !== null && ((ze[Te++] = et), (ze[Te++] = tt), (ze[Te++] = $t), (et = e.id), (tt = e.overflow), ($t = t)),
          (t = Lu(t, r.children)),
          (t.flags |= 4096),
          t);
}
function Wi(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    (r !== null && (r.lanes |= t), Oo(e.return, t, n));
}
function bl(e, t, n, r, l) {
    var o = e.memoizedState;
    o === null
        ? (e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l })
        : ((o.isBackwards = t),
          (o.rendering = null),
          (o.renderingStartTime = 0),
          (o.last = r),
          (o.tail = n),
          (o.tailMode = l));
}
function Za(e, t, n) {
    var r = t.pendingProps,
        l = r.revealOrder,
        o = r.tail;
    if ((pe(e, t, r.children, n), (r = H.current), r & 2)) ((r = (r & 1) | 2), (t.flags |= 128));
    else {
        if (e !== null && e.flags & 128)
            e: for (e = t.child; e !== null; ) {
                if (e.tag === 13) e.memoizedState !== null && Wi(e, n, t);
                else if (e.tag === 19) Wi(e, n, t);
                else if (e.child !== null) {
                    ((e.child.return = e), (e = e.child));
                    continue;
                }
                if (e === t) break e;
                for (; e.sibling === null; ) {
                    if (e.return === null || e.return === t) break e;
                    e = e.return;
                }
                ((e.sibling.return = e.return), (e = e.sibling));
            }
        r &= 1;
    }
    if ((U(H, r), !(t.mode & 1))) t.memoizedState = null;
    else
        switch (l) {
            case 'forwards':
                for (n = t.child, l = null; n !== null; )
                    ((e = n.alternate), e !== null && ol(e) === null && (l = n), (n = n.sibling));
                ((n = l),
                    n === null ? ((l = t.child), (t.child = null)) : ((l = n.sibling), (n.sibling = null)),
                    bl(t, !1, l, n, o));
                break;
            case 'backwards':
                for (n = null, l = t.child, t.child = null; l !== null; ) {
                    if (((e = l.alternate), e !== null && ol(e) === null)) {
                        t.child = l;
                        break;
                    }
                    ((e = l.sibling), (l.sibling = n), (n = l), (l = e));
                }
                bl(t, !0, n, null, o);
                break;
            case 'together':
                bl(t, !1, null, null, void 0);
                break;
            default:
                t.memoizedState = null;
        }
    return t.child;
}
function Ur(e, t) {
    !(t.mode & 1) && e !== null && ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function ut(e, t, n) {
    if ((e !== null && (t.dependencies = e.dependencies), (Bt |= t.lanes), !(n & t.childLanes))) return null;
    if (e !== null && t.child !== e.child) throw Error(g(153));
    if (t.child !== null) {
        for (e = t.child, n = xt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
            ((e = e.sibling), (n = n.sibling = xt(e, e.pendingProps)), (n.return = t));
        n.sibling = null;
    }
    return t.child;
}
function Bd(e, t, n) {
    switch (t.tag) {
        case 3:
            (Ga(t), mn());
            break;
        case 5:
            xa(t);
            break;
        case 1:
            Se(t.type) && br(t);
            break;
        case 4:
            _u(t, t.stateNode.containerInfo);
            break;
        case 10:
            var r = t.type._context,
                l = t.memoizedProps.value;
            (U(nl, r._currentValue), (r._currentValue = l));
            break;
        case 13:
            if (((r = t.memoizedState), r !== null))
                return r.dehydrated !== null
                    ? (U(H, H.current & 1), (t.flags |= 128), null)
                    : n & t.child.childLanes
                      ? Xa(e, t, n)
                      : (U(H, H.current & 1), (e = ut(e, t, n)), e !== null ? e.sibling : null);
            U(H, H.current & 1);
            break;
        case 19:
            if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
                if (r) return Za(e, t, n);
                t.flags |= 128;
            }
            if (
                ((l = t.memoizedState),
                l !== null && ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
                U(H, H.current),
                r)
            )
                break;
            return null;
        case 22:
        case 23:
            return ((t.lanes = 0), Ka(e, t, n));
    }
    return ut(e, t, n);
}
var Ja, Ao, qa, ba;
Ja = function (e, t) {
    for (var n = t.child; n !== null; ) {
        if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
        else if (n.tag !== 4 && n.child !== null) {
            ((n.child.return = n), (n = n.child));
            continue;
        }
        if (n === t) break;
        for (; n.sibling === null; ) {
            if (n.return === null || n.return === t) return;
            n = n.return;
        }
        ((n.sibling.return = n.return), (n = n.sibling));
    }
};
Ao = function () {};
qa = function (e, t, n, r) {
    var l = e.memoizedProps;
    if (l !== r) {
        ((e = t.stateNode), It(Je.current));
        var o = null;
        switch (n) {
            case 'input':
                ((l = so(e, l)), (r = so(e, r)), (o = []));
                break;
            case 'select':
                ((l = K({}, l, { value: void 0 })), (r = K({}, r, { value: void 0 })), (o = []));
                break;
            case 'textarea':
                ((l = fo(e, l)), (r = fo(e, r)), (o = []));
                break;
            default:
                typeof l.onClick != 'function' && typeof r.onClick == 'function' && (e.onclick = Jr);
        }
        mo(n, r);
        var u;
        n = null;
        for (c in l)
            if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null)
                if (c === 'style') {
                    var i = l[c];
                    for (u in i) i.hasOwnProperty(u) && (n || (n = {}), (n[u] = ''));
                } else
                    c !== 'dangerouslySetInnerHTML' &&
                        c !== 'children' &&
                        c !== 'suppressContentEditableWarning' &&
                        c !== 'suppressHydrationWarning' &&
                        c !== 'autoFocus' &&
                        (Qn.hasOwnProperty(c) ? o || (o = []) : (o = o || []).push(c, null));
        for (c in r) {
            var s = r[c];
            if (((i = l != null ? l[c] : void 0), r.hasOwnProperty(c) && s !== i && (s != null || i != null)))
                if (c === 'style')
                    if (i) {
                        for (u in i) !i.hasOwnProperty(u) || (s && s.hasOwnProperty(u)) || (n || (n = {}), (n[u] = ''));
                        for (u in s) s.hasOwnProperty(u) && i[u] !== s[u] && (n || (n = {}), (n[u] = s[u]));
                    } else (n || (o || (o = []), o.push(c, n)), (n = s));
                else
                    c === 'dangerouslySetInnerHTML'
                        ? ((s = s ? s.__html : void 0),
                          (i = i ? i.__html : void 0),
                          s != null && i !== s && (o = o || []).push(c, s))
                        : c === 'children'
                          ? (typeof s != 'string' && typeof s != 'number') || (o = o || []).push(c, '' + s)
                          : c !== 'suppressContentEditableWarning' &&
                            c !== 'suppressHydrationWarning' &&
                            (Qn.hasOwnProperty(c)
                                ? (s != null && c === 'onScroll' && B('scroll', e), o || i === s || (o = []))
                                : (o = o || []).push(c, s));
        }
        n && (o = o || []).push('style', n);
        var c = o;
        (t.updateQueue = c) && (t.flags |= 4);
    }
};
ba = function (e, t, n, r) {
    n !== r && (t.flags |= 4);
};
function zn(e, t) {
    if (!W)
        switch (e.tailMode) {
            case 'hidden':
                t = e.tail;
                for (var n = null; t !== null; ) (t.alternate !== null && (n = t), (t = t.sibling));
                n === null ? (e.tail = null) : (n.sibling = null);
                break;
            case 'collapsed':
                n = e.tail;
                for (var r = null; n !== null; ) (n.alternate !== null && (r = n), (n = n.sibling));
                r === null ? (t || e.tail === null ? (e.tail = null) : (e.tail.sibling = null)) : (r.sibling = null);
        }
}
function ae(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
        n = 0,
        r = 0;
    if (t)
        for (var l = e.child; l !== null; )
            ((n |= l.lanes | l.childLanes),
                (r |= l.subtreeFlags & 14680064),
                (r |= l.flags & 14680064),
                (l.return = e),
                (l = l.sibling));
    else
        for (l = e.child; l !== null; )
            ((n |= l.lanes | l.childLanes), (r |= l.subtreeFlags), (r |= l.flags), (l.return = e), (l = l.sibling));
    return ((e.subtreeFlags |= r), (e.childLanes = n), t);
}
function Ad(e, t, n) {
    var r = t.pendingProps;
    switch ((yu(t), t.tag)) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
            return (ae(t), null);
        case 1:
            return (Se(t.type) && qr(), ae(t), null);
        case 3:
            return (
                (r = t.stateNode),
                vn(),
                A(we),
                A(fe),
                Nu(),
                r.pendingContext && ((r.context = r.pendingContext), (r.pendingContext = null)),
                (e === null || e.child === null) &&
                    (Cr(t)
                        ? (t.flags |= 4)
                        : e === null ||
                          (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                          ((t.flags |= 1024), Ue !== null && (Xo(Ue), (Ue = null)))),
                Ao(e, t),
                ae(t),
                null
            );
        case 5:
            Cu(t);
            var l = It(rr.current);
            if (((n = t.type), e !== null && t.stateNode != null))
                (qa(e, t, n, r, l), e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
            else {
                if (!r) {
                    if (t.stateNode === null) throw Error(g(166));
                    return (ae(t), null);
                }
                if (((e = It(Je.current)), Cr(t))) {
                    ((r = t.stateNode), (n = t.type));
                    var o = t.memoizedProps;
                    switch (((r[Xe] = t), (r[tr] = o), (e = (t.mode & 1) !== 0), n)) {
                        case 'dialog':
                            (B('cancel', r), B('close', r));
                            break;
                        case 'iframe':
                        case 'object':
                        case 'embed':
                            B('load', r);
                            break;
                        case 'video':
                        case 'audio':
                            for (l = 0; l < Fn.length; l++) B(Fn[l], r);
                            break;
                        case 'source':
                            B('error', r);
                            break;
                        case 'img':
                        case 'image':
                        case 'link':
                            (B('error', r), B('load', r));
                            break;
                        case 'details':
                            B('toggle', r);
                            break;
                        case 'input':
                            (qu(r, o), B('invalid', r));
                            break;
                        case 'select':
                            ((r._wrapperState = { wasMultiple: !!o.multiple }), B('invalid', r));
                            break;
                        case 'textarea':
                            (ei(r, o), B('invalid', r));
                    }
                    (mo(n, o), (l = null));
                    for (var u in o)
                        if (o.hasOwnProperty(u)) {
                            var i = o[u];
                            u === 'children'
                                ? typeof i == 'string'
                                    ? r.textContent !== i &&
                                      (o.suppressHydrationWarning !== !0 && _r(r.textContent, i, e),
                                      (l = ['children', i]))
                                    : typeof i == 'number' &&
                                      r.textContent !== '' + i &&
                                      (o.suppressHydrationWarning !== !0 && _r(r.textContent, i, e),
                                      (l = ['children', '' + i]))
                                : Qn.hasOwnProperty(u) && i != null && u === 'onScroll' && B('scroll', r);
                        }
                    switch (n) {
                        case 'input':
                            (vr(r), bu(r, o, !0));
                            break;
                        case 'textarea':
                            (vr(r), ti(r));
                            break;
                        case 'select':
                        case 'option':
                            break;
                        default:
                            typeof o.onClick == 'function' && (r.onclick = Jr);
                    }
                    ((r = l), (t.updateQueue = r), r !== null && (t.flags |= 4));
                } else {
                    ((u = l.nodeType === 9 ? l : l.ownerDocument),
                        e === 'http://www.w3.org/1999/xhtml' && (e = Ps(n)),
                        e === 'http://www.w3.org/1999/xhtml'
                            ? n === 'script'
                                ? ((e = u.createElement('div')),
                                  (e.innerHTML = '<script><\/script>'),
                                  (e = e.removeChild(e.firstChild)))
                                : typeof r.is == 'string'
                                  ? (e = u.createElement(n, { is: r.is }))
                                  : ((e = u.createElement(n)),
                                    n === 'select' &&
                                        ((u = e), r.multiple ? (u.multiple = !0) : r.size && (u.size = r.size)))
                            : (e = u.createElementNS(e, n)),
                        (e[Xe] = t),
                        (e[tr] = r),
                        Ja(e, t, !1, !1),
                        (t.stateNode = e));
                    e: {
                        switch (((u = ho(n, r)), n)) {
                            case 'dialog':
                                (B('cancel', e), B('close', e), (l = r));
                                break;
                            case 'iframe':
                            case 'object':
                            case 'embed':
                                (B('load', e), (l = r));
                                break;
                            case 'video':
                            case 'audio':
                                for (l = 0; l < Fn.length; l++) B(Fn[l], e);
                                l = r;
                                break;
                            case 'source':
                                (B('error', e), (l = r));
                                break;
                            case 'img':
                            case 'image':
                            case 'link':
                                (B('error', e), B('load', e), (l = r));
                                break;
                            case 'details':
                                (B('toggle', e), (l = r));
                                break;
                            case 'input':
                                (qu(e, r), (l = so(e, r)), B('invalid', e));
                                break;
                            case 'option':
                                l = r;
                                break;
                            case 'select':
                                ((e._wrapperState = { wasMultiple: !!r.multiple }),
                                    (l = K({}, r, { value: void 0 })),
                                    B('invalid', e));
                                break;
                            case 'textarea':
                                (ei(e, r), (l = fo(e, r)), B('invalid', e));
                                break;
                            default:
                                l = r;
                        }
                        (mo(n, l), (i = l));
                        for (o in i)
                            if (i.hasOwnProperty(o)) {
                                var s = i[o];
                                o === 'style'
                                    ? Ts(e, s)
                                    : o === 'dangerouslySetInnerHTML'
                                      ? ((s = s ? s.__html : void 0), s != null && js(e, s))
                                      : o === 'children'
                                        ? typeof s == 'string'
                                            ? (n !== 'textarea' || s !== '') && Kn(e, s)
                                            : typeof s == 'number' && Kn(e, '' + s)
                                        : o !== 'suppressContentEditableWarning' &&
                                          o !== 'suppressHydrationWarning' &&
                                          o !== 'autoFocus' &&
                                          (Qn.hasOwnProperty(o)
                                              ? s != null && o === 'onScroll' && B('scroll', e)
                                              : s != null && nu(e, o, s, u));
                            }
                        switch (n) {
                            case 'input':
                                (vr(e), bu(e, r, !1));
                                break;
                            case 'textarea':
                                (vr(e), ti(e));
                                break;
                            case 'option':
                                r.value != null && e.setAttribute('value', '' + Et(r.value));
                                break;
                            case 'select':
                                ((e.multiple = !!r.multiple),
                                    (o = r.value),
                                    o != null
                                        ? on(e, !!r.multiple, o, !1)
                                        : r.defaultValue != null && on(e, !!r.multiple, r.defaultValue, !0));
                                break;
                            default:
                                typeof l.onClick == 'function' && (e.onclick = Jr);
                        }
                        switch (n) {
                            case 'button':
                            case 'input':
                            case 'select':
                            case 'textarea':
                                r = !!r.autoFocus;
                                break e;
                            case 'img':
                                r = !0;
                                break e;
                            default:
                                r = !1;
                        }
                    }
                    r && (t.flags |= 4);
                }
                t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
            }
            return (ae(t), null);
        case 6:
            if (e && t.stateNode != null) ba(e, t, e.memoizedProps, r);
            else {
                if (typeof r != 'string' && t.stateNode === null) throw Error(g(166));
                if (((n = It(rr.current)), It(Je.current), Cr(t))) {
                    if (
                        ((r = t.stateNode),
                        (n = t.memoizedProps),
                        (r[Xe] = t),
                        (o = r.nodeValue !== n) && ((e = Ce), e !== null))
                    )
                        switch (e.tag) {
                            case 3:
                                _r(r.nodeValue, n, (e.mode & 1) !== 0);
                                break;
                            case 5:
                                e.memoizedProps.suppressHydrationWarning !== !0 &&
                                    _r(r.nodeValue, n, (e.mode & 1) !== 0);
                        }
                    o && (t.flags |= 4);
                } else
                    ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)), (r[Xe] = t), (t.stateNode = r));
            }
            return (ae(t), null);
        case 13:
            if (
                (A(H),
                (r = t.memoizedState),
                e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
            ) {
                if (W && _e !== null && t.mode & 1 && !(t.flags & 128)) (ya(), mn(), (t.flags |= 98560), (o = !1));
                else if (((o = Cr(t)), r !== null && r.dehydrated !== null)) {
                    if (e === null) {
                        if (!o) throw Error(g(318));
                        if (((o = t.memoizedState), (o = o !== null ? o.dehydrated : null), !o)) throw Error(g(317));
                        o[Xe] = t;
                    } else (mn(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4));
                    (ae(t), (o = !1));
                } else (Ue !== null && (Xo(Ue), (Ue = null)), (o = !0));
                if (!o) return t.flags & 65536 ? t : null;
            }
            return t.flags & 128
                ? ((t.lanes = n), t)
                : ((r = r !== null),
                  r !== (e !== null && e.memoizedState !== null) &&
                      r &&
                      ((t.child.flags |= 8192),
                      t.mode & 1 && (e === null || H.current & 1 ? ee === 0 && (ee = 3) : $u())),
                  t.updateQueue !== null && (t.flags |= 4),
                  ae(t),
                  null);
        case 4:
            return (vn(), Ao(e, t), e === null && bn(t.stateNode.containerInfo), ae(t), null);
        case 10:
            return (ku(t.type._context), ae(t), null);
        case 17:
            return (Se(t.type) && qr(), ae(t), null);
        case 19:
            if ((A(H), (o = t.memoizedState), o === null)) return (ae(t), null);
            if (((r = (t.flags & 128) !== 0), (u = o.rendering), u === null))
                if (r) zn(o, !1);
                else {
                    if (ee !== 0 || (e !== null && e.flags & 128))
                        for (e = t.child; e !== null; ) {
                            if (((u = ol(e)), u !== null)) {
                                for (
                                    t.flags |= 128,
                                        zn(o, !1),
                                        r = u.updateQueue,
                                        r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                                        t.subtreeFlags = 0,
                                        r = n,
                                        n = t.child;
                                    n !== null;
                                )
                                    ((o = n),
                                        (e = r),
                                        (o.flags &= 14680066),
                                        (u = o.alternate),
                                        u === null
                                            ? ((o.childLanes = 0),
                                              (o.lanes = e),
                                              (o.child = null),
                                              (o.subtreeFlags = 0),
                                              (o.memoizedProps = null),
                                              (o.memoizedState = null),
                                              (o.updateQueue = null),
                                              (o.dependencies = null),
                                              (o.stateNode = null))
                                            : ((o.childLanes = u.childLanes),
                                              (o.lanes = u.lanes),
                                              (o.child = u.child),
                                              (o.subtreeFlags = 0),
                                              (o.deletions = null),
                                              (o.memoizedProps = u.memoizedProps),
                                              (o.memoizedState = u.memoizedState),
                                              (o.updateQueue = u.updateQueue),
                                              (o.type = u.type),
                                              (e = u.dependencies),
                                              (o.dependencies =
                                                  e === null
                                                      ? null
                                                      : { lanes: e.lanes, firstContext: e.firstContext })),
                                        (n = n.sibling));
                                return (U(H, (H.current & 1) | 2), t.child);
                            }
                            e = e.sibling;
                        }
                    o.tail !== null && J() > gn && ((t.flags |= 128), (r = !0), zn(o, !1), (t.lanes = 4194304));
                }
            else {
                if (!r)
                    if (((e = ol(u)), e !== null)) {
                        if (
                            ((t.flags |= 128),
                            (r = !0),
                            (n = e.updateQueue),
                            n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                            zn(o, !0),
                            o.tail === null && o.tailMode === 'hidden' && !u.alternate && !W)
                        )
                            return (ae(t), null);
                    } else
                        2 * J() - o.renderingStartTime > gn &&
                            n !== 1073741824 &&
                            ((t.flags |= 128), (r = !0), zn(o, !1), (t.lanes = 4194304));
                o.isBackwards
                    ? ((u.sibling = t.child), (t.child = u))
                    : ((n = o.last), n !== null ? (n.sibling = u) : (t.child = u), (o.last = u));
            }
            return o.tail !== null
                ? ((t = o.tail),
                  (o.rendering = t),
                  (o.tail = t.sibling),
                  (o.renderingStartTime = J()),
                  (t.sibling = null),
                  (n = H.current),
                  U(H, r ? (n & 1) | 2 : n & 1),
                  t)
                : (ae(t), null);
        case 22:
        case 23:
            return (
                Mu(),
                (r = t.memoizedState !== null),
                e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
                r && t.mode & 1 ? Ee & 1073741824 && (ae(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ae(t),
                null
            );
        case 24:
            return null;
        case 25:
            return null;
    }
    throw Error(g(156, t.tag));
}
function Vd(e, t) {
    switch ((yu(t), t.tag)) {
        case 1:
            return (Se(t.type) && qr(), (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
        case 3:
            return (
                vn(),
                A(we),
                A(fe),
                Nu(),
                (e = t.flags),
                e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
            );
        case 5:
            return (Cu(t), null);
        case 13:
            if ((A(H), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
                if (t.alternate === null) throw Error(g(340));
                mn();
            }
            return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
        case 19:
            return (A(H), null);
        case 4:
            return (vn(), null);
        case 10:
            return (ku(t.type._context), null);
        case 22:
        case 23:
            return (Mu(), null);
        case 24:
            return null;
        default:
            return null;
    }
}
var jr = !1,
    ce = !1,
    Wd = typeof WeakSet == 'function' ? WeakSet : Set,
    _ = null;
function rn(e, t) {
    var n = e.ref;
    if (n !== null)
        if (typeof n == 'function')
            try {
                n(null);
            } catch (r) {
                Y(e, t, r);
            }
        else n.current = null;
}
function Vo(e, t, n) {
    try {
        n();
    } catch (r) {
        Y(e, t, r);
    }
}
var Hi = !1;
function Hd(e, t) {
    if (((Co = Gr), (e = la()), hu(e))) {
        if ('selectionStart' in e) var n = { start: e.selectionStart, end: e.selectionEnd };
        else
            e: {
                n = ((n = e.ownerDocument) && n.defaultView) || window;
                var r = n.getSelection && n.getSelection();
                if (r && r.rangeCount !== 0) {
                    n = r.anchorNode;
                    var l = r.anchorOffset,
                        o = r.focusNode;
                    r = r.focusOffset;
                    try {
                        (n.nodeType, o.nodeType);
                    } catch {
                        n = null;
                        break e;
                    }
                    var u = 0,
                        i = -1,
                        s = -1,
                        c = 0,
                        h = 0,
                        m = e,
                        p = null;
                    t: for (;;) {
                        for (
                            var w;
                            m !== n || (l !== 0 && m.nodeType !== 3) || (i = u + l),
                                m !== o || (r !== 0 && m.nodeType !== 3) || (s = u + r),
                                m.nodeType === 3 && (u += m.nodeValue.length),
                                (w = m.firstChild) !== null;
                        )
                            ((p = m), (m = w));
                        for (;;) {
                            if (m === e) break t;
                            if (
                                (p === n && ++c === l && (i = u),
                                p === o && ++h === r && (s = u),
                                (w = m.nextSibling) !== null)
                            )
                                break;
                            ((m = p), (p = m.parentNode));
                        }
                        m = w;
                    }
                    n = i === -1 || s === -1 ? null : { start: i, end: s };
                } else n = null;
            }
        n = n || { start: 0, end: 0 };
    } else n = null;
    for (No = { focusedElem: e, selectionRange: n }, Gr = !1, _ = t; _ !== null; )
        if (((t = _), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)) ((e.return = t), (_ = e));
        else
            for (; _ !== null; ) {
                t = _;
                try {
                    var S = t.alternate;
                    if (t.flags & 1024)
                        switch (t.tag) {
                            case 0:
                            case 11:
                            case 15:
                                break;
                            case 1:
                                if (S !== null) {
                                    var k = S.memoizedProps,
                                        D = S.memoizedState,
                                        f = t.stateNode,
                                        a = f.getSnapshotBeforeUpdate(t.elementType === t.type ? k : Me(t.type, k), D);
                                    f.__reactInternalSnapshotBeforeUpdate = a;
                                }
                                break;
                            case 3:
                                var d = t.stateNode.containerInfo;
                                d.nodeType === 1
                                    ? (d.textContent = '')
                                    : d.nodeType === 9 && d.documentElement && d.removeChild(d.documentElement);
                                break;
                            case 5:
                            case 6:
                            case 4:
                            case 17:
                                break;
                            default:
                                throw Error(g(163));
                        }
                } catch (v) {
                    Y(t, t.return, v);
                }
                if (((e = t.sibling), e !== null)) {
                    ((e.return = t.return), (_ = e));
                    break;
                }
                _ = t.return;
            }
    return ((S = Hi), (Hi = !1), S);
}
function Vn(e, t, n) {
    var r = t.updateQueue;
    if (((r = r !== null ? r.lastEffect : null), r !== null)) {
        var l = (r = r.next);
        do {
            if ((l.tag & e) === e) {
                var o = l.destroy;
                ((l.destroy = void 0), o !== void 0 && Vo(t, n, o));
            }
            l = l.next;
        } while (l !== r);
    }
}
function xl(e, t) {
    if (((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)) {
        var n = (t = t.next);
        do {
            if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r();
            }
            n = n.next;
        } while (n !== t);
    }
}
function Wo(e) {
    var t = e.ref;
    if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
            case 5:
                e = n;
                break;
            default:
                e = n;
        }
        typeof t == 'function' ? t(e) : (t.current = e);
    }
}
function ec(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), ec(t)),
        (e.child = null),
        (e.deletions = null),
        (e.sibling = null),
        e.tag === 5 &&
            ((t = e.stateNode), t !== null && (delete t[Xe], delete t[tr], delete t[zo], delete t[Nd], delete t[Pd])),
        (e.stateNode = null),
        (e.return = null),
        (e.dependencies = null),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.pendingProps = null),
        (e.stateNode = null),
        (e.updateQueue = null));
}
function tc(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Qi(e) {
    e: for (;;) {
        for (; e.sibling === null; ) {
            if (e.return === null || tc(e.return)) return null;
            e = e.return;
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
            if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
            ((e.child.return = e), (e = e.child));
        }
        if (!(e.flags & 2)) return e.stateNode;
    }
}
function Ho(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        ((e = e.stateNode),
            t
                ? n.nodeType === 8
                    ? n.parentNode.insertBefore(e, t)
                    : n.insertBefore(e, t)
                : (n.nodeType === 8 ? ((t = n.parentNode), t.insertBefore(e, n)) : ((t = n), t.appendChild(e)),
                  (n = n._reactRootContainer),
                  n != null || t.onclick !== null || (t.onclick = Jr)));
    else if (r !== 4 && ((e = e.child), e !== null))
        for (Ho(e, t, n), e = e.sibling; e !== null; ) (Ho(e, t, n), (e = e.sibling));
}
function Qo(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
    else if (r !== 4 && ((e = e.child), e !== null))
        for (Qo(e, t, n), e = e.sibling; e !== null; ) (Qo(e, t, n), (e = e.sibling));
}
var oe = null,
    $e = !1;
function st(e, t, n) {
    for (n = n.child; n !== null; ) (nc(e, t, n), (n = n.sibling));
}
function nc(e, t, n) {
    if (Ze && typeof Ze.onCommitFiberUnmount == 'function')
        try {
            Ze.onCommitFiberUnmount(ml, n);
        } catch {}
    switch (n.tag) {
        case 5:
            ce || rn(n, t);
        case 6:
            var r = oe,
                l = $e;
            ((oe = null),
                st(e, t, n),
                (oe = r),
                ($e = l),
                oe !== null &&
                    ($e
                        ? ((e = oe),
                          (n = n.stateNode),
                          e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
                        : oe.removeChild(n.stateNode)));
            break;
        case 18:
            oe !== null &&
                ($e
                    ? ((e = oe),
                      (n = n.stateNode),
                      e.nodeType === 8 ? Kl(e.parentNode, n) : e.nodeType === 1 && Kl(e, n),
                      Zn(e))
                    : Kl(oe, n.stateNode));
            break;
        case 4:
            ((r = oe), (l = $e), (oe = n.stateNode.containerInfo), ($e = !0), st(e, t, n), (oe = r), ($e = l));
            break;
        case 0:
        case 11:
        case 14:
        case 15:
            if (!ce && ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))) {
                l = r = r.next;
                do {
                    var o = l,
                        u = o.destroy;
                    ((o = o.tag), u !== void 0 && (o & 2 || o & 4) && Vo(n, t, u), (l = l.next));
                } while (l !== r);
            }
            st(e, t, n);
            break;
        case 1:
            if (!ce && (rn(n, t), (r = n.stateNode), typeof r.componentWillUnmount == 'function'))
                try {
                    ((r.props = n.memoizedProps), (r.state = n.memoizedState), r.componentWillUnmount());
                } catch (i) {
                    Y(n, t, i);
                }
            st(e, t, n);
            break;
        case 21:
            st(e, t, n);
            break;
        case 22:
            n.mode & 1 ? ((ce = (r = ce) || n.memoizedState !== null), st(e, t, n), (ce = r)) : st(e, t, n);
            break;
        default:
            st(e, t, n);
    }
}
function Ki(e) {
    var t = e.updateQueue;
    if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        (n === null && (n = e.stateNode = new Wd()),
            t.forEach(function (r) {
                var l = bd.bind(null, e, r);
                n.has(r) || (n.add(r), r.then(l, l));
            }));
    }
}
function De(e, t) {
    var n = t.deletions;
    if (n !== null)
        for (var r = 0; r < n.length; r++) {
            var l = n[r];
            try {
                var o = e,
                    u = t,
                    i = u;
                e: for (; i !== null; ) {
                    switch (i.tag) {
                        case 5:
                            ((oe = i.stateNode), ($e = !1));
                            break e;
                        case 3:
                            ((oe = i.stateNode.containerInfo), ($e = !0));
                            break e;
                        case 4:
                            ((oe = i.stateNode.containerInfo), ($e = !0));
                            break e;
                    }
                    i = i.return;
                }
                if (oe === null) throw Error(g(160));
                (nc(o, u, l), (oe = null), ($e = !1));
                var s = l.alternate;
                (s !== null && (s.return = null), (l.return = null));
            } catch (c) {
                Y(l, t, c);
            }
        }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) (rc(t, e), (t = t.sibling));
}
function rc(e, t) {
    var n = e.alternate,
        r = e.flags;
    switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
            if ((De(t, e), Ye(e), r & 4)) {
                try {
                    (Vn(3, e, e.return), xl(3, e));
                } catch (k) {
                    Y(e, e.return, k);
                }
                try {
                    Vn(5, e, e.return);
                } catch (k) {
                    Y(e, e.return, k);
                }
            }
            break;
        case 1:
            (De(t, e), Ye(e), r & 512 && n !== null && rn(n, n.return));
            break;
        case 5:
            if ((De(t, e), Ye(e), r & 512 && n !== null && rn(n, n.return), e.flags & 32)) {
                var l = e.stateNode;
                try {
                    Kn(l, '');
                } catch (k) {
                    Y(e, e.return, k);
                }
            }
            if (r & 4 && ((l = e.stateNode), l != null)) {
                var o = e.memoizedProps,
                    u = n !== null ? n.memoizedProps : o,
                    i = e.type,
                    s = e.updateQueue;
                if (((e.updateQueue = null), s !== null))
                    try {
                        (i === 'input' && o.type === 'radio' && o.name != null && Cs(l, o), ho(i, u));
                        var c = ho(i, o);
                        for (u = 0; u < s.length; u += 2) {
                            var h = s[u],
                                m = s[u + 1];
                            h === 'style'
                                ? Ts(l, m)
                                : h === 'dangerouslySetInnerHTML'
                                  ? js(l, m)
                                  : h === 'children'
                                    ? Kn(l, m)
                                    : nu(l, h, m, c);
                        }
                        switch (i) {
                            case 'input':
                                ao(l, o);
                                break;
                            case 'textarea':
                                Ns(l, o);
                                break;
                            case 'select':
                                var p = l._wrapperState.wasMultiple;
                                l._wrapperState.wasMultiple = !!o.multiple;
                                var w = o.value;
                                w != null
                                    ? on(l, !!o.multiple, w, !1)
                                    : p !== !!o.multiple &&
                                      (o.defaultValue != null
                                          ? on(l, !!o.multiple, o.defaultValue, !0)
                                          : on(l, !!o.multiple, o.multiple ? [] : '', !1));
                        }
                        l[tr] = o;
                    } catch (k) {
                        Y(e, e.return, k);
                    }
            }
            break;
        case 6:
            if ((De(t, e), Ye(e), r & 4)) {
                if (e.stateNode === null) throw Error(g(162));
                ((l = e.stateNode), (o = e.memoizedProps));
                try {
                    l.nodeValue = o;
                } catch (k) {
                    Y(e, e.return, k);
                }
            }
            break;
        case 3:
            if ((De(t, e), Ye(e), r & 4 && n !== null && n.memoizedState.isDehydrated))
                try {
                    Zn(t.containerInfo);
                } catch (k) {
                    Y(e, e.return, k);
                }
            break;
        case 4:
            (De(t, e), Ye(e));
            break;
        case 13:
            (De(t, e),
                Ye(e),
                (l = e.child),
                l.flags & 8192 &&
                    ((o = l.memoizedState !== null),
                    (l.stateNode.isHidden = o),
                    !o || (l.alternate !== null && l.alternate.memoizedState !== null) || (Fu = J())),
                r & 4 && Ki(e));
            break;
        case 22:
            if (
                ((h = n !== null && n.memoizedState !== null),
                e.mode & 1 ? ((ce = (c = ce) || h), De(t, e), (ce = c)) : De(t, e),
                Ye(e),
                r & 8192)
            ) {
                if (((c = e.memoizedState !== null), (e.stateNode.isHidden = c) && !h && e.mode & 1))
                    for (_ = e, h = e.child; h !== null; ) {
                        for (m = _ = h; _ !== null; ) {
                            switch (((p = _), (w = p.child), p.tag)) {
                                case 0:
                                case 11:
                                case 14:
                                case 15:
                                    Vn(4, p, p.return);
                                    break;
                                case 1:
                                    rn(p, p.return);
                                    var S = p.stateNode;
                                    if (typeof S.componentWillUnmount == 'function') {
                                        ((r = p), (n = p.return));
                                        try {
                                            ((t = r),
                                                (S.props = t.memoizedProps),
                                                (S.state = t.memoizedState),
                                                S.componentWillUnmount());
                                        } catch (k) {
                                            Y(r, n, k);
                                        }
                                    }
                                    break;
                                case 5:
                                    rn(p, p.return);
                                    break;
                                case 22:
                                    if (p.memoizedState !== null) {
                                        Gi(m);
                                        continue;
                                    }
                            }
                            w !== null ? ((w.return = p), (_ = w)) : Gi(m);
                        }
                        h = h.sibling;
                    }
                e: for (h = null, m = e; ; ) {
                    if (m.tag === 5) {
                        if (h === null) {
                            h = m;
                            try {
                                ((l = m.stateNode),
                                    c
                                        ? ((o = l.style),
                                          typeof o.setProperty == 'function'
                                              ? o.setProperty('display', 'none', 'important')
                                              : (o.display = 'none'))
                                        : ((i = m.stateNode),
                                          (s = m.memoizedProps.style),
                                          (u = s != null && s.hasOwnProperty('display') ? s.display : null),
                                          (i.style.display = zs('display', u))));
                            } catch (k) {
                                Y(e, e.return, k);
                            }
                        }
                    } else if (m.tag === 6) {
                        if (h === null)
                            try {
                                m.stateNode.nodeValue = c ? '' : m.memoizedProps;
                            } catch (k) {
                                Y(e, e.return, k);
                            }
                    } else if (
                        ((m.tag !== 22 && m.tag !== 23) || m.memoizedState === null || m === e) &&
                        m.child !== null
                    ) {
                        ((m.child.return = m), (m = m.child));
                        continue;
                    }
                    if (m === e) break e;
                    for (; m.sibling === null; ) {
                        if (m.return === null || m.return === e) break e;
                        (h === m && (h = null), (m = m.return));
                    }
                    (h === m && (h = null), (m.sibling.return = m.return), (m = m.sibling));
                }
            }
            break;
        case 19:
            (De(t, e), Ye(e), r & 4 && Ki(e));
            break;
        case 21:
            break;
        default:
            (De(t, e), Ye(e));
    }
}
function Ye(e) {
    var t = e.flags;
    if (t & 2) {
        try {
            e: {
                for (var n = e.return; n !== null; ) {
                    if (tc(n)) {
                        var r = n;
                        break e;
                    }
                    n = n.return;
                }
                throw Error(g(160));
            }
            switch (r.tag) {
                case 5:
                    var l = r.stateNode;
                    r.flags & 32 && (Kn(l, ''), (r.flags &= -33));
                    var o = Qi(e);
                    Qo(e, o, l);
                    break;
                case 3:
                case 4:
                    var u = r.stateNode.containerInfo,
                        i = Qi(e);
                    Ho(e, i, u);
                    break;
                default:
                    throw Error(g(161));
            }
        } catch (s) {
            Y(e, e.return, s);
        }
        e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
}
function Qd(e, t, n) {
    ((_ = e), lc(e));
}
function lc(e, t, n) {
    for (var r = (e.mode & 1) !== 0; _ !== null; ) {
        var l = _,
            o = l.child;
        if (l.tag === 22 && r) {
            var u = l.memoizedState !== null || jr;
            if (!u) {
                var i = l.alternate,
                    s = (i !== null && i.memoizedState !== null) || ce;
                i = jr;
                var c = ce;
                if (((jr = u), (ce = s) && !c))
                    for (_ = l; _ !== null; )
                        ((u = _),
                            (s = u.child),
                            u.tag === 22 && u.memoizedState !== null
                                ? Xi(l)
                                : s !== null
                                  ? ((s.return = u), (_ = s))
                                  : Xi(l));
                for (; o !== null; ) ((_ = o), lc(o), (o = o.sibling));
                ((_ = l), (jr = i), (ce = c));
            }
            Yi(e);
        } else l.subtreeFlags & 8772 && o !== null ? ((o.return = l), (_ = o)) : Yi(e);
    }
}
function Yi(e) {
    for (; _ !== null; ) {
        var t = _;
        if (t.flags & 8772) {
            var n = t.alternate;
            try {
                if (t.flags & 8772)
                    switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            ce || xl(5, t);
                            break;
                        case 1:
                            var r = t.stateNode;
                            if (t.flags & 4 && !ce)
                                if (n === null) r.componentDidMount();
                                else {
                                    var l = t.elementType === t.type ? n.memoizedProps : Me(t.type, n.memoizedProps);
                                    r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                                }
                            var o = t.updateQueue;
                            o !== null && Ri(t, o, r);
                            break;
                        case 3:
                            var u = t.updateQueue;
                            if (u !== null) {
                                if (((n = null), t.child !== null))
                                    switch (t.child.tag) {
                                        case 5:
                                            n = t.child.stateNode;
                                            break;
                                        case 1:
                                            n = t.child.stateNode;
                                    }
                                Ri(t, u, n);
                            }
                            break;
                        case 5:
                            var i = t.stateNode;
                            if (n === null && t.flags & 4) {
                                n = i;
                                var s = t.memoizedProps;
                                switch (t.type) {
                                    case 'button':
                                    case 'input':
                                    case 'select':
                                    case 'textarea':
                                        s.autoFocus && n.focus();
                                        break;
                                    case 'img':
                                        s.src && (n.src = s.src);
                                }
                            }
                            break;
                        case 6:
                            break;
                        case 4:
                            break;
                        case 12:
                            break;
                        case 13:
                            if (t.memoizedState === null) {
                                var c = t.alternate;
                                if (c !== null) {
                                    var h = c.memoizedState;
                                    if (h !== null) {
                                        var m = h.dehydrated;
                                        m !== null && Zn(m);
                                    }
                                }
                            }
                            break;
                        case 19:
                        case 17:
                        case 21:
                        case 22:
                        case 23:
                        case 25:
                            break;
                        default:
                            throw Error(g(163));
                    }
                ce || (t.flags & 512 && Wo(t));
            } catch (p) {
                Y(t, t.return, p);
            }
        }
        if (t === e) {
            _ = null;
            break;
        }
        if (((n = t.sibling), n !== null)) {
            ((n.return = t.return), (_ = n));
            break;
        }
        _ = t.return;
    }
}
function Gi(e) {
    for (; _ !== null; ) {
        var t = _;
        if (t === e) {
            _ = null;
            break;
        }
        var n = t.sibling;
        if (n !== null) {
            ((n.return = t.return), (_ = n));
            break;
        }
        _ = t.return;
    }
}
function Xi(e) {
    for (; _ !== null; ) {
        var t = _;
        try {
            switch (t.tag) {
                case 0:
                case 11:
                case 15:
                    var n = t.return;
                    try {
                        xl(4, t);
                    } catch (s) {
                        Y(t, n, s);
                    }
                    break;
                case 1:
                    var r = t.stateNode;
                    if (typeof r.componentDidMount == 'function') {
                        var l = t.return;
                        try {
                            r.componentDidMount();
                        } catch (s) {
                            Y(t, l, s);
                        }
                    }
                    var o = t.return;
                    try {
                        Wo(t);
                    } catch (s) {
                        Y(t, o, s);
                    }
                    break;
                case 5:
                    var u = t.return;
                    try {
                        Wo(t);
                    } catch (s) {
                        Y(t, u, s);
                    }
            }
        } catch (s) {
            Y(t, t.return, s);
        }
        if (t === e) {
            _ = null;
            break;
        }
        var i = t.sibling;
        if (i !== null) {
            ((i.return = t.return), (_ = i));
            break;
        }
        _ = t.return;
    }
}
var Kd = Math.ceil,
    sl = it.ReactCurrentDispatcher,
    Ou = it.ReactCurrentOwner,
    Le = it.ReactCurrentBatchConfig,
    F = 0,
    re = null,
    q = null,
    ue = 0,
    Ee = 0,
    ln = Nt(0),
    ee = 0,
    ir = null,
    Bt = 0,
    El = 0,
    Iu = 0,
    Wn = null,
    ye = null,
    Fu = 0,
    gn = 1 / 0,
    qe = null,
    al = !1,
    Ko = null,
    St = null,
    zr = !1,
    mt = null,
    cl = 0,
    Hn = 0,
    Yo = null,
    Br = -1,
    Ar = 0;
function me() {
    return F & 6 ? J() : Br !== -1 ? Br : (Br = J());
}
function kt(e) {
    return e.mode & 1
        ? F & 2 && ue !== 0
            ? ue & -ue
            : zd.transition !== null
              ? (Ar === 0 && (Ar = Vs()), Ar)
              : ((e = M), e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Xs(e.type))), e)
        : 1;
}
function Ae(e, t, n, r) {
    if (50 < Hn) throw ((Hn = 0), (Yo = null), Error(g(185)));
    (ar(e, n, r),
        (!(F & 2) || e !== re) &&
            (e === re && (!(F & 2) && (El |= n), ee === 4 && dt(e, ue)),
            ke(e, r),
            n === 1 && F === 0 && !(t.mode & 1) && ((gn = J() + 500), wl && Pt())));
}
function ke(e, t) {
    var n = e.callbackNode;
    zf(e, t);
    var r = Yr(e, e === re ? ue : 0);
    if (r === 0) (n !== null && li(n), (e.callbackNode = null), (e.callbackPriority = 0));
    else if (((t = r & -r), e.callbackPriority !== t)) {
        if ((n != null && li(n), t === 1))
            (e.tag === 0 ? jd(Zi.bind(null, e)) : ma(Zi.bind(null, e)),
                _d(function () {
                    !(F & 6) && Pt();
                }),
                (n = null));
        else {
            switch (Ws(r)) {
                case 1:
                    n = iu;
                    break;
                case 4:
                    n = Bs;
                    break;
                case 16:
                    n = Kr;
                    break;
                case 536870912:
                    n = As;
                    break;
                default:
                    n = Kr;
            }
            n = dc(n, oc.bind(null, e));
        }
        ((e.callbackPriority = t), (e.callbackNode = n));
    }
}
function oc(e, t) {
    if (((Br = -1), (Ar = 0), F & 6)) throw Error(g(327));
    var n = e.callbackNode;
    if (fn() && e.callbackNode !== n) return null;
    var r = Yr(e, e === re ? ue : 0);
    if (r === 0) return null;
    if (r & 30 || r & e.expiredLanes || t) t = fl(e, r);
    else {
        t = r;
        var l = F;
        F |= 2;
        var o = ic();
        (re !== e || ue !== t) && ((qe = null), (gn = J() + 500), Ft(e, t));
        do
            try {
                Xd();
                break;
            } catch (i) {
                uc(e, i);
            }
        while (!0);
        (Su(), (sl.current = o), (F = l), q !== null ? (t = 0) : ((re = null), (ue = 0), (t = ee)));
    }
    if (t !== 0) {
        if ((t === 2 && ((l = So(e)), l !== 0 && ((r = l), (t = Go(e, l)))), t === 1))
            throw ((n = ir), Ft(e, 0), dt(e, r), ke(e, J()), n);
        if (t === 6) dt(e, r);
        else {
            if (
                ((l = e.current.alternate),
                !(r & 30) &&
                    !Yd(l) &&
                    ((t = fl(e, r)), t === 2 && ((o = So(e)), o !== 0 && ((r = o), (t = Go(e, o)))), t === 1))
            )
                throw ((n = ir), Ft(e, 0), dt(e, r), ke(e, J()), n);
            switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
                case 0:
                case 1:
                    throw Error(g(345));
                case 2:
                    Rt(e, ye, qe);
                    break;
                case 3:
                    if ((dt(e, r), (r & 130023424) === r && ((t = Fu + 500 - J()), 10 < t))) {
                        if (Yr(e, 0) !== 0) break;
                        if (((l = e.suspendedLanes), (l & r) !== r)) {
                            (me(), (e.pingedLanes |= e.suspendedLanes & l));
                            break;
                        }
                        e.timeoutHandle = jo(Rt.bind(null, e, ye, qe), t);
                        break;
                    }
                    Rt(e, ye, qe);
                    break;
                case 4:
                    if ((dt(e, r), (r & 4194240) === r)) break;
                    for (t = e.eventTimes, l = -1; 0 < r; ) {
                        var u = 31 - Be(r);
                        ((o = 1 << u), (u = t[u]), u > l && (l = u), (r &= ~o));
                    }
                    if (
                        ((r = l),
                        (r = J() - r),
                        (r =
                            (120 > r
                                ? 120
                                : 480 > r
                                  ? 480
                                  : 1080 > r
                                    ? 1080
                                    : 1920 > r
                                      ? 1920
                                      : 3e3 > r
                                        ? 3e3
                                        : 4320 > r
                                          ? 4320
                                          : 1960 * Kd(r / 1960)) - r),
                        10 < r)
                    ) {
                        e.timeoutHandle = jo(Rt.bind(null, e, ye, qe), r);
                        break;
                    }
                    Rt(e, ye, qe);
                    break;
                case 5:
                    Rt(e, ye, qe);
                    break;
                default:
                    throw Error(g(329));
            }
        }
    }
    return (ke(e, J()), e.callbackNode === n ? oc.bind(null, e) : null);
}
function Go(e, t) {
    var n = Wn;
    return (
        e.current.memoizedState.isDehydrated && (Ft(e, t).flags |= 256),
        (e = fl(e, t)),
        e !== 2 && ((t = ye), (ye = n), t !== null && Xo(t)),
        e
    );
}
function Xo(e) {
    ye === null ? (ye = e) : ye.push.apply(ye, e);
}
function Yd(e) {
    for (var t = e; ; ) {
        if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && ((n = n.stores), n !== null))
                for (var r = 0; r < n.length; r++) {
                    var l = n[r],
                        o = l.getSnapshot;
                    l = l.value;
                    try {
                        if (!Ve(o(), l)) return !1;
                    } catch {
                        return !1;
                    }
                }
        }
        if (((n = t.child), t.subtreeFlags & 16384 && n !== null)) ((n.return = t), (t = n));
        else {
            if (t === e) break;
            for (; t.sibling === null; ) {
                if (t.return === null || t.return === e) return !0;
                t = t.return;
            }
            ((t.sibling.return = t.return), (t = t.sibling));
        }
    }
    return !0;
}
function dt(e, t) {
    for (t &= ~Iu, t &= ~El, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
        var n = 31 - Be(t),
            r = 1 << n;
        ((e[n] = -1), (t &= ~r));
    }
}
function Zi(e) {
    if (F & 6) throw Error(g(327));
    fn();
    var t = Yr(e, 0);
    if (!(t & 1)) return (ke(e, J()), null);
    var n = fl(e, t);
    if (e.tag !== 0 && n === 2) {
        var r = So(e);
        r !== 0 && ((t = r), (n = Go(e, r)));
    }
    if (n === 1) throw ((n = ir), Ft(e, 0), dt(e, t), ke(e, J()), n);
    if (n === 6) throw Error(g(345));
    return ((e.finishedWork = e.current.alternate), (e.finishedLanes = t), Rt(e, ye, qe), ke(e, J()), null);
}
function Du(e, t) {
    var n = F;
    F |= 1;
    try {
        return e(t);
    } finally {
        ((F = n), F === 0 && ((gn = J() + 500), wl && Pt()));
    }
}
function At(e) {
    mt !== null && mt.tag === 0 && !(F & 6) && fn();
    var t = F;
    F |= 1;
    var n = Le.transition,
        r = M;
    try {
        if (((Le.transition = null), (M = 1), e)) return e();
    } finally {
        ((M = r), (Le.transition = n), (F = t), !(F & 6) && Pt());
    }
}
function Mu() {
    ((Ee = ln.current), A(ln));
}
function Ft(e, t) {
    ((e.finishedWork = null), (e.finishedLanes = 0));
    var n = e.timeoutHandle;
    if ((n !== -1 && ((e.timeoutHandle = -1), Ed(n)), q !== null))
        for (n = q.return; n !== null; ) {
            var r = n;
            switch ((yu(r), r.tag)) {
                case 1:
                    ((r = r.type.childContextTypes), r != null && qr());
                    break;
                case 3:
                    (vn(), A(we), A(fe), Nu());
                    break;
                case 5:
                    Cu(r);
                    break;
                case 4:
                    vn();
                    break;
                case 13:
                    A(H);
                    break;
                case 19:
                    A(H);
                    break;
                case 10:
                    ku(r.type._context);
                    break;
                case 22:
                case 23:
                    Mu();
            }
            n = n.return;
        }
    if (
        ((re = e),
        (q = e = xt(e.current, null)),
        (ue = Ee = t),
        (ee = 0),
        (ir = null),
        (Iu = El = Bt = 0),
        (ye = Wn = null),
        Ot !== null)
    ) {
        for (t = 0; t < Ot.length; t++)
            if (((n = Ot[t]), (r = n.interleaved), r !== null)) {
                n.interleaved = null;
                var l = r.next,
                    o = n.pending;
                if (o !== null) {
                    var u = o.next;
                    ((o.next = l), (r.next = u));
                }
                n.pending = r;
            }
        Ot = null;
    }
    return e;
}
function uc(e, t) {
    do {
        var n = q;
        try {
            if ((Su(), (Mr.current = il), ul)) {
                for (var r = Q.memoizedState; r !== null; ) {
                    var l = r.queue;
                    (l !== null && (l.pending = null), (r = r.next));
                }
                ul = !1;
            }
            if (
                ((Ut = 0),
                (ne = b = Q = null),
                (An = !1),
                (lr = 0),
                (Ou.current = null),
                n === null || n.return === null)
            ) {
                ((ee = 1), (ir = t), (q = null));
                break;
            }
            e: {
                var o = e,
                    u = n.return,
                    i = n,
                    s = t;
                if (((t = ue), (i.flags |= 32768), s !== null && typeof s == 'object' && typeof s.then == 'function')) {
                    var c = s,
                        h = i,
                        m = h.tag;
                    if (!(h.mode & 1) && (m === 0 || m === 11 || m === 15)) {
                        var p = h.alternate;
                        p
                            ? ((h.updateQueue = p.updateQueue),
                              (h.memoizedState = p.memoizedState),
                              (h.lanes = p.lanes))
                            : ((h.updateQueue = null), (h.memoizedState = null));
                    }
                    var w = Mi(u);
                    if (w !== null) {
                        ((w.flags &= -257), $i(w, u, i, o, t), w.mode & 1 && Di(o, c, t), (t = w), (s = c));
                        var S = t.updateQueue;
                        if (S === null) {
                            var k = new Set();
                            (k.add(s), (t.updateQueue = k));
                        } else S.add(s);
                        break e;
                    } else {
                        if (!(t & 1)) {
                            (Di(o, c, t), $u());
                            break e;
                        }
                        s = Error(g(426));
                    }
                } else if (W && i.mode & 1) {
                    var D = Mi(u);
                    if (D !== null) {
                        (!(D.flags & 65536) && (D.flags |= 256), $i(D, u, i, o, t), gu(yn(s, i)));
                        break e;
                    }
                }
                ((o = s = yn(s, i)), ee !== 4 && (ee = 2), Wn === null ? (Wn = [o]) : Wn.push(o), (o = u));
                do {
                    switch (o.tag) {
                        case 3:
                            ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
                            var f = Wa(o, s, t);
                            Ti(o, f);
                            break e;
                        case 1:
                            i = s;
                            var a = o.type,
                                d = o.stateNode;
                            if (
                                !(o.flags & 128) &&
                                (typeof a.getDerivedStateFromError == 'function' ||
                                    (d !== null &&
                                        typeof d.componentDidCatch == 'function' &&
                                        (St === null || !St.has(d))))
                            ) {
                                ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
                                var v = Ha(o, i, t);
                                Ti(o, v);
                                break e;
                            }
                    }
                    o = o.return;
                } while (o !== null);
            }
            ac(n);
        } catch (x) {
            ((t = x), q === n && n !== null && (q = n = n.return));
            continue;
        }
        break;
    } while (!0);
}
function ic() {
    var e = sl.current;
    return ((sl.current = il), e === null ? il : e);
}
function $u() {
    ((ee === 0 || ee === 3 || ee === 2) && (ee = 4),
        re === null || (!(Bt & 268435455) && !(El & 268435455)) || dt(re, ue));
}
function fl(e, t) {
    var n = F;
    F |= 2;
    var r = ic();
    (re !== e || ue !== t) && ((qe = null), Ft(e, t));
    do
        try {
            Gd();
            break;
        } catch (l) {
            uc(e, l);
        }
    while (!0);
    if ((Su(), (F = n), (sl.current = r), q !== null)) throw Error(g(261));
    return ((re = null), (ue = 0), ee);
}
function Gd() {
    for (; q !== null; ) sc(q);
}
function Xd() {
    for (; q !== null && !Sf(); ) sc(q);
}
function sc(e) {
    var t = fc(e.alternate, e, Ee);
    ((e.memoizedProps = e.pendingProps), t === null ? ac(e) : (q = t), (Ou.current = null));
}
function ac(e) {
    var t = e;
    do {
        var n = t.alternate;
        if (((e = t.return), t.flags & 32768)) {
            if (((n = Vd(n, t)), n !== null)) {
                ((n.flags &= 32767), (q = n));
                return;
            }
            if (e !== null) ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
            else {
                ((ee = 6), (q = null));
                return;
            }
        } else if (((n = Ad(n, t, Ee)), n !== null)) {
            q = n;
            return;
        }
        if (((t = t.sibling), t !== null)) {
            q = t;
            return;
        }
        q = t = e;
    } while (t !== null);
    ee === 0 && (ee = 5);
}
function Rt(e, t, n) {
    var r = M,
        l = Le.transition;
    try {
        ((Le.transition = null), (M = 1), Zd(e, t, n, r));
    } finally {
        ((Le.transition = l), (M = r));
    }
    return null;
}
function Zd(e, t, n, r) {
    do fn();
    while (mt !== null);
    if (F & 6) throw Error(g(327));
    n = e.finishedWork;
    var l = e.finishedLanes;
    if (n === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current)) throw Error(g(177));
    ((e.callbackNode = null), (e.callbackPriority = 0));
    var o = n.lanes | n.childLanes;
    if (
        (Tf(e, o),
        e === re && ((q = re = null), (ue = 0)),
        (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
            zr ||
            ((zr = !0),
            dc(Kr, function () {
                return (fn(), null);
            })),
        (o = (n.flags & 15990) !== 0),
        n.subtreeFlags & 15990 || o)
    ) {
        ((o = Le.transition), (Le.transition = null));
        var u = M;
        M = 1;
        var i = F;
        ((F |= 4),
            (Ou.current = null),
            Hd(e, n),
            rc(n, e),
            vd(No),
            (Gr = !!Co),
            (No = Co = null),
            (e.current = n),
            Qd(n),
            kf(),
            (F = i),
            (M = u),
            (Le.transition = o));
    } else e.current = n;
    if (
        (zr && ((zr = !1), (mt = e), (cl = l)),
        (o = e.pendingLanes),
        o === 0 && (St = null),
        _f(n.stateNode),
        ke(e, J()),
        t !== null)
    )
        for (r = e.onRecoverableError, n = 0; n < t.length; n++)
            ((l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest }));
    if (al) throw ((al = !1), (e = Ko), (Ko = null), e);
    return (
        cl & 1 && e.tag !== 0 && fn(),
        (o = e.pendingLanes),
        o & 1 ? (e === Yo ? Hn++ : ((Hn = 0), (Yo = e))) : (Hn = 0),
        Pt(),
        null
    );
}
function fn() {
    if (mt !== null) {
        var e = Ws(cl),
            t = Le.transition,
            n = M;
        try {
            if (((Le.transition = null), (M = 16 > e ? 16 : e), mt === null)) var r = !1;
            else {
                if (((e = mt), (mt = null), (cl = 0), F & 6)) throw Error(g(331));
                var l = F;
                for (F |= 4, _ = e.current; _ !== null; ) {
                    var o = _,
                        u = o.child;
                    if (_.flags & 16) {
                        var i = o.deletions;
                        if (i !== null) {
                            for (var s = 0; s < i.length; s++) {
                                var c = i[s];
                                for (_ = c; _ !== null; ) {
                                    var h = _;
                                    switch (h.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            Vn(8, h, o);
                                    }
                                    var m = h.child;
                                    if (m !== null) ((m.return = h), (_ = m));
                                    else
                                        for (; _ !== null; ) {
                                            h = _;
                                            var p = h.sibling,
                                                w = h.return;
                                            if ((ec(h), h === c)) {
                                                _ = null;
                                                break;
                                            }
                                            if (p !== null) {
                                                ((p.return = w), (_ = p));
                                                break;
                                            }
                                            _ = w;
                                        }
                                }
                            }
                            var S = o.alternate;
                            if (S !== null) {
                                var k = S.child;
                                if (k !== null) {
                                    S.child = null;
                                    do {
                                        var D = k.sibling;
                                        ((k.sibling = null), (k = D));
                                    } while (k !== null);
                                }
                            }
                            _ = o;
                        }
                    }
                    if (o.subtreeFlags & 2064 && u !== null) ((u.return = o), (_ = u));
                    else
                        e: for (; _ !== null; ) {
                            if (((o = _), o.flags & 2048))
                                switch (o.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        Vn(9, o, o.return);
                                }
                            var f = o.sibling;
                            if (f !== null) {
                                ((f.return = o.return), (_ = f));
                                break e;
                            }
                            _ = o.return;
                        }
                }
                var a = e.current;
                for (_ = a; _ !== null; ) {
                    u = _;
                    var d = u.child;
                    if (u.subtreeFlags & 2064 && d !== null) ((d.return = u), (_ = d));
                    else
                        e: for (u = a; _ !== null; ) {
                            if (((i = _), i.flags & 2048))
                                try {
                                    switch (i.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            xl(9, i);
                                    }
                                } catch (x) {
                                    Y(i, i.return, x);
                                }
                            if (i === u) {
                                _ = null;
                                break e;
                            }
                            var v = i.sibling;
                            if (v !== null) {
                                ((v.return = i.return), (_ = v));
                                break e;
                            }
                            _ = i.return;
                        }
                }
                if (((F = l), Pt(), Ze && typeof Ze.onPostCommitFiberRoot == 'function'))
                    try {
                        Ze.onPostCommitFiberRoot(ml, e);
                    } catch {}
                r = !0;
            }
            return r;
        } finally {
            ((M = n), (Le.transition = t));
        }
    }
    return !1;
}
function Ji(e, t, n) {
    ((t = yn(n, t)), (t = Wa(e, t, 1)), (e = wt(e, t, 1)), (t = me()), e !== null && (ar(e, 1, t), ke(e, t)));
}
function Y(e, t, n) {
    if (e.tag === 3) Ji(e, e, n);
    else
        for (; t !== null; ) {
            if (t.tag === 3) {
                Ji(t, e, n);
                break;
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (
                    typeof t.type.getDerivedStateFromError == 'function' ||
                    (typeof r.componentDidCatch == 'function' && (St === null || !St.has(r)))
                ) {
                    ((e = yn(n, e)),
                        (e = Ha(t, e, 1)),
                        (t = wt(t, e, 1)),
                        (e = me()),
                        t !== null && (ar(t, 1, e), ke(t, e)));
                    break;
                }
            }
            t = t.return;
        }
}
function Jd(e, t, n) {
    var r = e.pingCache;
    (r !== null && r.delete(t),
        (t = me()),
        (e.pingedLanes |= e.suspendedLanes & n),
        re === e &&
            (ue & n) === n &&
            (ee === 4 || (ee === 3 && (ue & 130023424) === ue && 500 > J() - Fu) ? Ft(e, 0) : (Iu |= n)),
        ke(e, t));
}
function cc(e, t) {
    t === 0 && (e.mode & 1 ? ((t = wr), (wr <<= 1), !(wr & 130023424) && (wr = 4194304)) : (t = 1));
    var n = me();
    ((e = ot(e, t)), e !== null && (ar(e, t, n), ke(e, n)));
}
function qd(e) {
    var t = e.memoizedState,
        n = 0;
    (t !== null && (n = t.retryLane), cc(e, n));
}
function bd(e, t) {
    var n = 0;
    switch (e.tag) {
        case 13:
            var r = e.stateNode,
                l = e.memoizedState;
            l !== null && (n = l.retryLane);
            break;
        case 19:
            r = e.stateNode;
            break;
        default:
            throw Error(g(314));
    }
    (r !== null && r.delete(t), cc(e, n));
}
var fc;
fc = function (e, t, n) {
    if (e !== null)
        if (e.memoizedProps !== t.pendingProps || we.current) ge = !0;
        else {
            if (!(e.lanes & n) && !(t.flags & 128)) return ((ge = !1), Bd(e, t, n));
            ge = !!(e.flags & 131072);
        }
    else ((ge = !1), W && t.flags & 1048576 && ha(t, tl, t.index));
    switch (((t.lanes = 0), t.tag)) {
        case 2:
            var r = t.type;
            (Ur(e, t), (e = t.pendingProps));
            var l = pn(t, fe.current);
            (cn(t, n), (l = ju(null, t, r, e, l, n)));
            var o = zu();
            return (
                (t.flags |= 1),
                typeof l == 'object' && l !== null && typeof l.render == 'function' && l.$$typeof === void 0
                    ? ((t.tag = 1),
                      (t.memoizedState = null),
                      (t.updateQueue = null),
                      Se(r) ? ((o = !0), br(t)) : (o = !1),
                      (t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null),
                      Eu(t),
                      (l.updater = kl),
                      (t.stateNode = l),
                      (l._reactInternals = t),
                      Fo(t, r, e, n),
                      (t = $o(null, t, r, !0, o, n)))
                    : ((t.tag = 0), W && o && vu(t), pe(null, t, l, n), (t = t.child)),
                t
            );
        case 16:
            r = t.elementType;
            e: {
                switch (
                    (Ur(e, t),
                    (e = t.pendingProps),
                    (l = r._init),
                    (r = l(r._payload)),
                    (t.type = r),
                    (l = t.tag = tp(r)),
                    (e = Me(r, e)),
                    l)
                ) {
                    case 0:
                        t = Mo(null, t, r, e, n);
                        break e;
                    case 1:
                        t = Ai(null, t, r, e, n);
                        break e;
                    case 11:
                        t = Ui(null, t, r, e, n);
                        break e;
                    case 14:
                        t = Bi(null, t, r, Me(r.type, e), n);
                        break e;
                }
                throw Error(g(306, r, ''));
            }
            return t;
        case 0:
            return ((r = t.type), (l = t.pendingProps), (l = t.elementType === r ? l : Me(r, l)), Mo(e, t, r, l, n));
        case 1:
            return ((r = t.type), (l = t.pendingProps), (l = t.elementType === r ? l : Me(r, l)), Ai(e, t, r, l, n));
        case 3:
            e: {
                if ((Ga(t), e === null)) throw Error(g(387));
                ((r = t.pendingProps), (o = t.memoizedState), (l = o.element), ka(e, t), ll(t, r, null, n));
                var u = t.memoizedState;
                if (((r = u.element), o.isDehydrated))
                    if (
                        ((o = {
                            element: r,
                            isDehydrated: !1,
                            cache: u.cache,
                            pendingSuspenseBoundaries: u.pendingSuspenseBoundaries,
                            transitions: u.transitions,
                        }),
                        (t.updateQueue.baseState = o),
                        (t.memoizedState = o),
                        t.flags & 256)
                    ) {
                        ((l = yn(Error(g(423)), t)), (t = Vi(e, t, r, n, l)));
                        break e;
                    } else if (r !== l) {
                        ((l = yn(Error(g(424)), t)), (t = Vi(e, t, r, n, l)));
                        break e;
                    } else
                        for (
                            _e = gt(t.stateNode.containerInfo.firstChild),
                                Ce = t,
                                W = !0,
                                Ue = null,
                                n = wa(t, null, r, n),
                                t.child = n;
                            n;
                        )
                            ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
                else {
                    if ((mn(), r === l)) {
                        t = ut(e, t, n);
                        break e;
                    }
                    pe(e, t, r, n);
                }
                t = t.child;
            }
            return t;
        case 5:
            return (
                xa(t),
                e === null && Lo(t),
                (r = t.type),
                (l = t.pendingProps),
                (o = e !== null ? e.memoizedProps : null),
                (u = l.children),
                Po(r, l) ? (u = null) : o !== null && Po(r, o) && (t.flags |= 32),
                Ya(e, t),
                pe(e, t, u, n),
                t.child
            );
        case 6:
            return (e === null && Lo(t), null);
        case 13:
            return Xa(e, t, n);
        case 4:
            return (
                _u(t, t.stateNode.containerInfo),
                (r = t.pendingProps),
                e === null ? (t.child = hn(t, null, r, n)) : pe(e, t, r, n),
                t.child
            );
        case 11:
            return ((r = t.type), (l = t.pendingProps), (l = t.elementType === r ? l : Me(r, l)), Ui(e, t, r, l, n));
        case 7:
            return (pe(e, t, t.pendingProps, n), t.child);
        case 8:
            return (pe(e, t, t.pendingProps.children, n), t.child);
        case 12:
            return (pe(e, t, t.pendingProps.children, n), t.child);
        case 10:
            e: {
                if (
                    ((r = t.type._context),
                    (l = t.pendingProps),
                    (o = t.memoizedProps),
                    (u = l.value),
                    U(nl, r._currentValue),
                    (r._currentValue = u),
                    o !== null)
                )
                    if (Ve(o.value, u)) {
                        if (o.children === l.children && !we.current) {
                            t = ut(e, t, n);
                            break e;
                        }
                    } else
                        for (o = t.child, o !== null && (o.return = t); o !== null; ) {
                            var i = o.dependencies;
                            if (i !== null) {
                                u = o.child;
                                for (var s = i.firstContext; s !== null; ) {
                                    if (s.context === r) {
                                        if (o.tag === 1) {
                                            ((s = nt(-1, n & -n)), (s.tag = 2));
                                            var c = o.updateQueue;
                                            if (c !== null) {
                                                c = c.shared;
                                                var h = c.pending;
                                                (h === null ? (s.next = s) : ((s.next = h.next), (h.next = s)),
                                                    (c.pending = s));
                                            }
                                        }
                                        ((o.lanes |= n),
                                            (s = o.alternate),
                                            s !== null && (s.lanes |= n),
                                            Oo(o.return, n, t),
                                            (i.lanes |= n));
                                        break;
                                    }
                                    s = s.next;
                                }
                            } else if (o.tag === 10) u = o.type === t.type ? null : o.child;
                            else if (o.tag === 18) {
                                if (((u = o.return), u === null)) throw Error(g(341));
                                ((u.lanes |= n),
                                    (i = u.alternate),
                                    i !== null && (i.lanes |= n),
                                    Oo(u, n, t),
                                    (u = o.sibling));
                            } else u = o.child;
                            if (u !== null) u.return = o;
                            else
                                for (u = o; u !== null; ) {
                                    if (u === t) {
                                        u = null;
                                        break;
                                    }
                                    if (((o = u.sibling), o !== null)) {
                                        ((o.return = u.return), (u = o));
                                        break;
                                    }
                                    u = u.return;
                                }
                            o = u;
                        }
                (pe(e, t, l.children, n), (t = t.child));
            }
            return t;
        case 9:
            return (
                (l = t.type),
                (r = t.pendingProps.children),
                cn(t, n),
                (l = Oe(l)),
                (r = r(l)),
                (t.flags |= 1),
                pe(e, t, r, n),
                t.child
            );
        case 14:
            return ((r = t.type), (l = Me(r, t.pendingProps)), (l = Me(r.type, l)), Bi(e, t, r, l, n));
        case 15:
            return Qa(e, t, t.type, t.pendingProps, n);
        case 17:
            return (
                (r = t.type),
                (l = t.pendingProps),
                (l = t.elementType === r ? l : Me(r, l)),
                Ur(e, t),
                (t.tag = 1),
                Se(r) ? ((e = !0), br(t)) : (e = !1),
                cn(t, n),
                Va(t, r, l),
                Fo(t, r, l, n),
                $o(null, t, r, !0, e, n)
            );
        case 19:
            return Za(e, t, n);
        case 22:
            return Ka(e, t, n);
    }
    throw Error(g(156, t.tag));
};
function dc(e, t) {
    return Us(e, t);
}
function ep(e, t, n, r) {
    ((this.tag = e),
        (this.key = n),
        (this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null),
        (this.index = 0),
        (this.ref = null),
        (this.pendingProps = t),
        (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
        (this.mode = r),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null));
}
function Re(e, t, n, r) {
    return new ep(e, t, n, r);
}
function Uu(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function tp(e) {
    if (typeof e == 'function') return Uu(e) ? 1 : 0;
    if (e != null) {
        if (((e = e.$$typeof), e === lu)) return 11;
        if (e === ou) return 14;
    }
    return 2;
}
function xt(e, t) {
    var n = e.alternate;
    return (
        n === null
            ? ((n = Re(e.tag, t, e.key, e.mode)),
              (n.elementType = e.elementType),
              (n.type = e.type),
              (n.stateNode = e.stateNode),
              (n.alternate = e),
              (e.alternate = n))
            : ((n.pendingProps = t), (n.type = e.type), (n.flags = 0), (n.subtreeFlags = 0), (n.deletions = null)),
        (n.flags = e.flags & 14680064),
        (n.childLanes = e.childLanes),
        (n.lanes = e.lanes),
        (n.child = e.child),
        (n.memoizedProps = e.memoizedProps),
        (n.memoizedState = e.memoizedState),
        (n.updateQueue = e.updateQueue),
        (t = e.dependencies),
        (n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
        (n.sibling = e.sibling),
        (n.index = e.index),
        (n.ref = e.ref),
        n
    );
}
function Vr(e, t, n, r, l, o) {
    var u = 2;
    if (((r = e), typeof e == 'function')) Uu(e) && (u = 1);
    else if (typeof e == 'string') u = 5;
    else
        e: switch (e) {
            case Gt:
                return Dt(n.children, l, o, t);
            case ru:
                ((u = 8), (l |= 8));
                break;
            case lo:
                return ((e = Re(12, n, t, l | 2)), (e.elementType = lo), (e.lanes = o), e);
            case oo:
                return ((e = Re(13, n, t, l)), (e.elementType = oo), (e.lanes = o), e);
            case uo:
                return ((e = Re(19, n, t, l)), (e.elementType = uo), (e.lanes = o), e);
            case xs:
                return _l(n, l, o, t);
            default:
                if (typeof e == 'object' && e !== null)
                    switch (e.$$typeof) {
                        case Ss:
                            u = 10;
                            break e;
                        case ks:
                            u = 9;
                            break e;
                        case lu:
                            u = 11;
                            break e;
                        case ou:
                            u = 14;
                            break e;
                        case at:
                            ((u = 16), (r = null));
                            break e;
                    }
                throw Error(g(130, e == null ? e : typeof e, ''));
        }
    return ((t = Re(u, n, t, l)), (t.elementType = e), (t.type = r), (t.lanes = o), t);
}
function Dt(e, t, n, r) {
    return ((e = Re(7, e, r, t)), (e.lanes = n), e);
}
function _l(e, t, n, r) {
    return ((e = Re(22, e, r, t)), (e.elementType = xs), (e.lanes = n), (e.stateNode = { isHidden: !1 }), e);
}
function eo(e, t, n) {
    return ((e = Re(6, e, null, t)), (e.lanes = n), e);
}
function to(e, t, n) {
    return (
        (t = Re(4, e.children !== null ? e.children : [], e.key, t)),
        (t.lanes = n),
        (t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }),
        t
    );
}
function np(e, t, n, r, l) {
    ((this.tag = t),
        (this.containerInfo = e),
        (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
        (this.timeoutHandle = -1),
        (this.callbackNode = this.pendingContext = this.context = null),
        (this.callbackPriority = 0),
        (this.eventTimes = Fl(0)),
        (this.expirationTimes = Fl(-1)),
        (this.entangledLanes =
            this.finishedLanes =
            this.mutableReadLanes =
            this.expiredLanes =
            this.pingedLanes =
            this.suspendedLanes =
            this.pendingLanes =
                0),
        (this.entanglements = Fl(0)),
        (this.identifierPrefix = r),
        (this.onRecoverableError = l),
        (this.mutableSourceEagerHydrationData = null));
}
function Bu(e, t, n, r, l, o, u, i, s) {
    return (
        (e = new np(e, t, n, i, s)),
        t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
        (o = Re(3, null, null, t)),
        (e.current = o),
        (o.stateNode = e),
        (o.memoizedState = {
            element: r,
            isDehydrated: n,
            cache: null,
            transitions: null,
            pendingSuspenseBoundaries: null,
        }),
        Eu(o),
        e
    );
}
function rp(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: Yt, key: r == null ? null : '' + r, children: e, containerInfo: t, implementation: n };
}
function pc(e) {
    if (!e) return _t;
    e = e._reactInternals;
    e: {
        if (Wt(e) !== e || e.tag !== 1) throw Error(g(170));
        var t = e;
        do {
            switch (t.tag) {
                case 3:
                    t = t.stateNode.context;
                    break e;
                case 1:
                    if (Se(t.type)) {
                        t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                        break e;
                    }
            }
            t = t.return;
        } while (t !== null);
        throw Error(g(171));
    }
    if (e.tag === 1) {
        var n = e.type;
        if (Se(n)) return pa(e, n, t);
    }
    return t;
}
function mc(e, t, n, r, l, o, u, i, s) {
    return (
        (e = Bu(n, r, !0, e, l, o, u, i, s)),
        (e.context = pc(null)),
        (n = e.current),
        (r = me()),
        (l = kt(n)),
        (o = nt(r, l)),
        (o.callback = t ?? null),
        wt(n, o, l),
        (e.current.lanes = l),
        ar(e, l, r),
        ke(e, r),
        e
    );
}
function Cl(e, t, n, r) {
    var l = t.current,
        o = me(),
        u = kt(l);
    return (
        (n = pc(n)),
        t.context === null ? (t.context = n) : (t.pendingContext = n),
        (t = nt(o, u)),
        (t.payload = { element: e }),
        (r = r === void 0 ? null : r),
        r !== null && (t.callback = r),
        (e = wt(l, t, u)),
        e !== null && (Ae(e, l, u, o), Dr(e, l, u)),
        u
    );
}
function dl(e) {
    if (((e = e.current), !e.child)) return null;
    switch (e.child.tag) {
        case 5:
            return e.child.stateNode;
        default:
            return e.child.stateNode;
    }
}
function qi(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t;
    }
}
function Au(e, t) {
    (qi(e, t), (e = e.alternate) && qi(e, t));
}
function lp() {
    return null;
}
var hc =
    typeof reportError == 'function'
        ? reportError
        : function (e) {
              console.error(e);
          };
function Vu(e) {
    this._internalRoot = e;
}
Nl.prototype.render = Vu.prototype.render = function (e) {
    var t = this._internalRoot;
    if (t === null) throw Error(g(409));
    Cl(e, t, null, null);
};
Nl.prototype.unmount = Vu.prototype.unmount = function () {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        (At(function () {
            Cl(null, e, null, null);
        }),
            (t[lt] = null));
    }
};
function Nl(e) {
    this._internalRoot = e;
}
Nl.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
        var t = Ks();
        e = { blockedOn: null, target: e, priority: t };
        for (var n = 0; n < ft.length && t !== 0 && t < ft[n].priority; n++);
        (ft.splice(n, 0, e), n === 0 && Gs(e));
    }
};
function Wu(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Pl(e) {
    return !(
        !e ||
        (e.nodeType !== 1 &&
            e.nodeType !== 9 &&
            e.nodeType !== 11 &&
            (e.nodeType !== 8 || e.nodeValue !== ' react-mount-point-unstable '))
    );
}
function bi() {}
function op(e, t, n, r, l) {
    if (l) {
        if (typeof r == 'function') {
            var o = r;
            r = function () {
                var c = dl(u);
                o.call(c);
            };
        }
        var u = mc(t, r, e, 0, null, !1, !1, '', bi);
        return ((e._reactRootContainer = u), (e[lt] = u.current), bn(e.nodeType === 8 ? e.parentNode : e), At(), u);
    }
    for (; (l = e.lastChild); ) e.removeChild(l);
    if (typeof r == 'function') {
        var i = r;
        r = function () {
            var c = dl(s);
            i.call(c);
        };
    }
    var s = Bu(e, 0, !1, null, null, !1, !1, '', bi);
    return (
        (e._reactRootContainer = s),
        (e[lt] = s.current),
        bn(e.nodeType === 8 ? e.parentNode : e),
        At(function () {
            Cl(t, s, n, r);
        }),
        s
    );
}
function jl(e, t, n, r, l) {
    var o = n._reactRootContainer;
    if (o) {
        var u = o;
        if (typeof l == 'function') {
            var i = l;
            l = function () {
                var s = dl(u);
                i.call(s);
            };
        }
        Cl(t, u, e, l);
    } else u = op(n, t, e, l, r);
    return dl(u);
}
Hs = function (e) {
    switch (e.tag) {
        case 3:
            var t = e.stateNode;
            if (t.current.memoizedState.isDehydrated) {
                var n = In(t.pendingLanes);
                n !== 0 && (su(t, n | 1), ke(t, J()), !(F & 6) && ((gn = J() + 500), Pt()));
            }
            break;
        case 13:
            (At(function () {
                var r = ot(e, 1);
                if (r !== null) {
                    var l = me();
                    Ae(r, e, 1, l);
                }
            }),
                Au(e, 1));
    }
};
au = function (e) {
    if (e.tag === 13) {
        var t = ot(e, 134217728);
        if (t !== null) {
            var n = me();
            Ae(t, e, 134217728, n);
        }
        Au(e, 134217728);
    }
};
Qs = function (e) {
    if (e.tag === 13) {
        var t = kt(e),
            n = ot(e, t);
        if (n !== null) {
            var r = me();
            Ae(n, e, t, r);
        }
        Au(e, t);
    }
};
Ks = function () {
    return M;
};
Ys = function (e, t) {
    var n = M;
    try {
        return ((M = e), t());
    } finally {
        M = n;
    }
};
yo = function (e, t, n) {
    switch (t) {
        case 'input':
            if ((ao(e, n), (t = n.name), n.type === 'radio' && t != null)) {
                for (n = e; n.parentNode; ) n = n.parentNode;
                for (
                    n = n.querySelectorAll('input[name=' + JSON.stringify('' + t) + '][type="radio"]'), t = 0;
                    t < n.length;
                    t++
                ) {
                    var r = n[t];
                    if (r !== e && r.form === e.form) {
                        var l = gl(r);
                        if (!l) throw Error(g(90));
                        (_s(r), ao(r, l));
                    }
                }
            }
            break;
        case 'textarea':
            Ns(e, n);
            break;
        case 'select':
            ((t = n.value), t != null && on(e, !!n.multiple, t, !1));
    }
};
Os = Du;
Is = At;
var up = { usingClientEntryPoint: !1, Events: [fr, qt, gl, Rs, Ls, Du] },
    Tn = { findFiberByHostInstance: Lt, bundleType: 0, version: '18.3.1', rendererPackageName: 'react-dom' },
    ip = {
        bundleType: Tn.bundleType,
        version: Tn.version,
        rendererPackageName: Tn.rendererPackageName,
        rendererConfig: Tn.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: it.ReactCurrentDispatcher,
        findHostInstanceByFiber: function (e) {
            return ((e = Ms(e)), e === null ? null : e.stateNode);
        },
        findFiberByHostInstance: Tn.findFiberByHostInstance || lp,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
    };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var Tr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Tr.isDisabled && Tr.supportsFiber)
        try {
            ((ml = Tr.inject(ip)), (Ze = Tr));
        } catch {}
}
Pe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = up;
Pe.createPortal = function (e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Wu(t)) throw Error(g(200));
    return rp(e, t, null, n);
};
Pe.createRoot = function (e, t) {
    if (!Wu(e)) throw Error(g(299));
    var n = !1,
        r = '',
        l = hc;
    return (
        t != null &&
            (t.unstable_strictMode === !0 && (n = !0),
            t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
            t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
        (t = Bu(e, 1, !1, null, null, n, !1, r, l)),
        (e[lt] = t.current),
        bn(e.nodeType === 8 ? e.parentNode : e),
        new Vu(t)
    );
};
Pe.findDOMNode = function (e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
        throw typeof e.render == 'function' ? Error(g(188)) : ((e = Object.keys(e).join(',')), Error(g(268, e)));
    return ((e = Ms(t)), (e = e === null ? null : e.stateNode), e);
};
Pe.flushSync = function (e) {
    return At(e);
};
Pe.hydrate = function (e, t, n) {
    if (!Pl(t)) throw Error(g(200));
    return jl(null, e, t, !0, n);
};
Pe.hydrateRoot = function (e, t, n) {
    if (!Wu(e)) throw Error(g(405));
    var r = (n != null && n.hydratedSources) || null,
        l = !1,
        o = '',
        u = hc;
    if (
        (n != null &&
            (n.unstable_strictMode === !0 && (l = !0),
            n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
            n.onRecoverableError !== void 0 && (u = n.onRecoverableError)),
        (t = mc(t, null, e, 1, n ?? null, l, !1, o, u)),
        (e[lt] = t.current),
        bn(e),
        r)
    )
        for (e = 0; e < r.length; e++)
            ((n = r[e]),
                (l = n._getVersion),
                (l = l(n._source)),
                t.mutableSourceEagerHydrationData == null
                    ? (t.mutableSourceEagerHydrationData = [n, l])
                    : t.mutableSourceEagerHydrationData.push(n, l));
    return new Nl(t);
};
Pe.render = function (e, t, n) {
    if (!Pl(t)) throw Error(g(200));
    return jl(null, e, t, !1, n);
};
Pe.unmountComponentAtNode = function (e) {
    if (!Pl(e)) throw Error(g(40));
    return e._reactRootContainer
        ? (At(function () {
              jl(null, null, e, !1, function () {
                  ((e._reactRootContainer = null), (e[lt] = null));
              });
          }),
          !0)
        : !1;
};
Pe.unstable_batchedUpdates = Du;
Pe.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
    if (!Pl(n)) throw Error(g(200));
    if (e == null || e._reactInternals === void 0) throw Error(g(38));
    return jl(e, t, n, !1, r);
};
Pe.version = '18.3.1-next-f1338f8080-20240426';
function vc() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'))
        try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(vc);
        } catch (e) {
            console.error(e);
        }
}
(vc(), (vs.exports = Pe));
var sp = vs.exports,
    yc,
    es = sp;
((yc = es.createRoot), es.hydrateRoot);
class gc extends Error {
    constructor(n, r) {
        super(n);
        Qu(this, 'data');
        ((this.name = 'ApiError'), (this.data = r));
    }
}
async function jt(e, t) {
    const n = await fetch(e, t),
        r = await n.json();
    if (!n.ok) throw new gc(r.error ?? r.message ?? `Request failed (${n.status})`, r.data);
    return r;
}
async function ap() {
    return (await jt('/github/repos')).data ?? [];
}
async function cp(e) {
    var n;
    return (
        ((n = (await jt(`/github/repos/${encodeURIComponent(e)}/branches`)).data) == null ? void 0 : n.branches) ?? []
    );
}
async function fp(e) {
    return jt(`/github/repos/${encodeURIComponent(e)}/clone`, { method: 'POST' });
}
async function dp(e, t) {
    return jt(`/github/repos/${encodeURIComponent(e)}/checkout/${encodeURIComponent(t)}`, { method: 'POST' });
}
async function pp(e) {
    return jt(`/github/repos/${encodeURIComponent(e)}/pull`, { method: 'POST' });
}
async function mp(e) {
    return jt(`/github/repos/${encodeURIComponent(e)}/fetch`, { method: 'POST' });
}
async function hp(e) {
    return jt(`/wpilib/build/${encodeURIComponent(e)}`, { method: 'POST' });
}
async function vp(e) {
    return jt(`/wpilib/deploy/${encodeURIComponent(e)}`, { method: 'POST' });
}
async function yp() {
    const e = await fetch('/camera/recording/status');
    if (!e.ok) throw new Error('Failed to load recording status');
    return !!(await e.json()).recordingOn;
}
async function gp() {
    if (!(await fetch('/camera/start', { method: 'POST' })).ok) throw new Error('Failed to start recording');
}
async function wp() {
    if (!(await fetch('/camera/stop', { method: 'POST' })).ok) throw new Error('Failed to stop recording');
}
async function Sp() {
    const e = await fetch('/camera/recording/list');
    if (!e.ok) throw new Error('Failed to list recordings');
    return (await e.json()).recordings ?? [];
}
function kp(e) {
    return `/camera/recording/${encodeURIComponent(e)}/stream`;
}
function xp(e) {
    return `/camera/recording/${encodeURIComponent(e)}/download`;
}
function Ep() {
    return `/camera/stream?t=${Date.now()}`;
}
function _p({
    recordingOn: e,
    streamActive: t,
    streamUrl: n,
    recordings: r,
    selectedRecording: l,
    cameraBusy: o,
    onStartRecording: u,
    onStopRecording: i,
    onStartStream: s,
    onStopStream: c,
    onRefreshRecordings: h,
    onSelectRecording: m,
}) {
    const p = O.useRef(null);
    return y.jsxs(y.Fragment, {
        children: [
            y.jsxs('section', {
                className: 'camera-section',
                children: [
                    y.jsxs('div', {
                        className: 'camera-section__header',
                        children: [
                            y.jsx('h2', { children: 'Live Camera' }),
                            y.jsx('span', {
                                className: `rec-badge ${e ? 'rec-badge--on' : 'rec-badge--off'}`,
                                children: e ? '● REC' : 'Standby',
                            }),
                        ],
                    }),
                    y.jsx('div', {
                        className: 'camera-viewport',
                        children:
                            t && n
                                ? y.jsx('img', { ref: p, src: n, alt: 'Live camera feed' })
                                : y.jsx('p', {
                                      className: 'camera-placeholder',
                                      children: e
                                          ? 'Recording active — start stream to view live feed'
                                          : 'Start recording to enable camera',
                                  }),
                    }),
                    y.jsxs('div', {
                        className: 'camera-controls',
                        children: [
                            y.jsx('button', {
                                type: 'button',
                                className: 'btn btn--orange',
                                onClick: u,
                                disabled: e || o,
                                children: 'Start Recording',
                            }),
                            y.jsx('button', {
                                type: 'button',
                                className: 'btn',
                                onClick: i,
                                disabled: !e || o,
                                children: 'Stop Recording',
                            }),
                            y.jsx('button', {
                                type: 'button',
                                className: 'btn btn--blue',
                                onClick: s,
                                disabled: !e || t,
                                children: 'Start Stream',
                            }),
                            y.jsx('button', {
                                type: 'button',
                                className: 'btn',
                                onClick: c,
                                disabled: !t,
                                children: 'Stop Stream',
                            }),
                        ],
                    }),
                ],
            }),
            y.jsxs('section', {
                className: 'recordings-section',
                children: [
                    y.jsx('div', {
                        className: 'recordings-section__header',
                        children: y.jsx('h2', { children: 'Saved Recordings' }),
                    }),
                    r.length === 0
                        ? y.jsx('p', {
                              className: 'recordings-empty',
                              children: 'No recordings yet. Start recording to capture match footage.',
                          })
                        : y.jsxs('div', {
                              className: 'recordings-body',
                              children: [
                                  y.jsx('ul', {
                                      className: 'recordings-list',
                                      children: r.map((w) =>
                                          y.jsx(
                                              'li',
                                              {
                                                  children: y.jsx('button', {
                                                      type: 'button',
                                                      className: l === w ? 'active' : '',
                                                      onClick: () => m(w),
                                                      children: w,
                                                  }),
                                              },
                                              w
                                          )
                                      ),
                                  }),
                                  l &&
                                      y.jsxs('div', {
                                          className: 'recordings-player',
                                          children: [
                                              y.jsx('video', { controls: !0, src: kp(l) }, l),
                                              y.jsxs('div', {
                                                  className: 'btn-row',
                                                  children: [
                                                      y.jsx('a', {
                                                          className: 'btn btn--blue',
                                                          href: xp(l),
                                                          download: l,
                                                          children: 'Download',
                                                      }),
                                                      y.jsx('button', {
                                                          type: 'button',
                                                          className: 'btn btn--ghost',
                                                          onClick: h,
                                                          children: 'Refresh list',
                                                      }),
                                                  ],
                                              }),
                                          ],
                                      }),
                              ],
                          }),
                ],
            }),
        ],
    });
}
function Cp({
    repos: e,
    branches: t,
    selectedRepo: n,
    selectedBranch: r,
    cloneName: l,
    loadingRepos: o,
    loadingBranches: u,
    busyAction: i,
    onSelectRepo: s,
    onSelectBranch: c,
    onCloneNameChange: h,
    onRefreshRepos: m,
    onClone: p,
    onCheckout: w,
    onPull: S,
    onFetch: k,
    onBuild: D,
    onDeploy: f,
}) {
    const a = i === 'checkout' || i === 'pull' || i === 'fetch' || i === 'clone',
        d = i === 'build' || i === 'deploy';
    return y.jsxs('aside', {
        className: 'sidebar',
        children: [
            y.jsxs('section', {
                className: 'panel',
                children: [
                    y.jsx('h2', { className: 'panel__title panel__title--blue', children: 'Repository' }),
                    y.jsxs('div', {
                        className: 'field',
                        children: [
                            y.jsx('label', { htmlFor: 'repo-select', children: 'Local repos' }),
                            y.jsx('select', {
                                id: 'repo-select',
                                value: n,
                                onChange: (v) => s(v.target.value),
                                disabled: o || e.length === 0,
                                children:
                                    e.length === 0
                                        ? y.jsx('option', { value: '', children: 'No repos cloned' })
                                        : e.map((v) => y.jsx('option', { value: v, children: v }, v)),
                            }),
                        ],
                    }),
                    y.jsx('div', {
                        className: 'btn-row',
                        children: y.jsx('button', {
                            type: 'button',
                            className: 'btn btn--ghost',
                            onClick: m,
                            disabled: o,
                            children: 'Refresh',
                        }),
                    }),
                    y.jsx('p', { className: 'hint', children: 'Clone a new repo from github.com/frc-862' }),
                    y.jsxs('div', {
                        className: 'clone-row',
                        children: [
                            y.jsx('input', {
                                type: 'text',
                                placeholder: 'repo-name',
                                value: l,
                                onChange: (v) => h(v.target.value.trim()),
                                disabled: i === 'clone',
                            }),
                            y.jsx('button', {
                                type: 'button',
                                className: 'btn btn--blue',
                                onClick: p,
                                disabled: !l || i === 'clone',
                                children: 'Clone',
                            }),
                        ],
                    }),
                ],
            }),
            y.jsxs('section', {
                className: 'panel',
                children: [
                    y.jsx('h2', { className: 'panel__title panel__title--blue', children: 'Git' }),
                    y.jsxs('div', {
                        className: 'field',
                        children: [
                            y.jsx('label', { htmlFor: 'branch-select', children: 'Branch' }),
                            y.jsx('select', {
                                id: 'branch-select',
                                value: r,
                                onChange: (v) => c(v.target.value),
                                disabled: !n || u || t.length === 0,
                                children:
                                    t.length === 0
                                        ? y.jsx('option', { value: '', children: u ? 'Loading…' : 'No branches' })
                                        : t.map((v) => y.jsx('option', { value: v, children: v }, v)),
                            }),
                        ],
                    }),
                    y.jsxs('div', {
                        className: 'btn-row',
                        children: [
                            y.jsx('button', {
                                type: 'button',
                                className: 'btn btn--blue',
                                onClick: w,
                                disabled: !n || !r || a,
                                children: 'Checkout',
                            }),
                            y.jsx('button', {
                                type: 'button',
                                className: 'btn btn--blue',
                                onClick: S,
                                disabled: !n || a,
                                children: 'Pull',
                            }),
                            y.jsx('button', {
                                type: 'button',
                                className: 'btn btn--blue',
                                onClick: k,
                                disabled: !n || a,
                                children: 'Fetch',
                            }),
                        ],
                    }),
                ],
            }),
            y.jsxs('section', {
                className: 'panel',
                children: [
                    y.jsx('h2', { className: 'panel__title panel__title--orange', children: 'Deploy' }),
                    y.jsx('p', { className: 'hint', children: n ? `Target: ${n}` : 'Select a repository first' }),
                    y.jsxs('div', {
                        className: 'btn-row',
                        children: [
                            y.jsx('button', {
                                type: 'button',
                                className: 'btn btn--orange',
                                onClick: D,
                                disabled: !n || d,
                                children: i === 'build' ? 'Building…' : 'Build',
                            }),
                            y.jsx('button', {
                                type: 'button',
                                className: 'btn btn--orange',
                                onClick: f,
                                disabled: !n || d,
                                children: i === 'deploy' ? 'Deploying…' : 'Deploy',
                            }),
                        ],
                    }),
                ],
            }),
        ],
    });
}
function Np({ wsStatus: e, theme: t, gitStatus: n, onToggleTheme: r }) {
    const l = e === 'connected' ? 'Connected' : e === 'connecting' ? 'Connecting…' : 'Disconnected',
        o = !!n.repoName,
        u = !!n.branch;
    return y.jsxs('header', {
        className: 'header',
        children: [
            y.jsxs('div', {
                className: 'header__brand',
                children: [
                    y.jsx('span', { className: 'header__team', children: 'FRC 862' }),
                    y.jsx('h1', { className: 'header__title', children: 'Field Deploy' }),
                ],
            }),
            y.jsx('div', {
                className: 'header__status',
                'aria-live': 'polite',
                children: o
                    ? y.jsxs(y.Fragment, {
                          children: [
                              y.jsx('span', { className: 'git-status git-status--repo', children: n.repoName }),
                              y.jsx('span', { className: 'git-status__sep', children: '/' }),
                              y.jsx('span', {
                                  className: 'git-status git-status--branch',
                                  children: u ? n.branch : 'no branch',
                              }),
                              y.jsx('span', {
                                  className: `git-pull-badge ${n.pulled ? 'git-pull-badge--yes' : 'git-pull-badge--no'}`,
                                  children: n.pulled ? 'Pulled' : 'Needs pull',
                              }),
                          ],
                      })
                    : y.jsx('span', { className: 'git-status git-status--empty', children: 'No repo checked out' }),
            }),
            y.jsxs('div', {
                className: 'header__actions',
                children: [
                    y.jsxs('div', {
                        className: `ws-badge ws-badge--${e}`,
                        children: [y.jsx('span', { className: 'ws-badge__dot' }), l],
                    }),
                    y.jsx('button', {
                        type: 'button',
                        className: 'btn btn--ghost btn--icon',
                        onClick: r,
                        title: `Switch to ${t === 'light' ? 'dark' : 'light'} mode`,
                        'aria-label': `Switch to ${t === 'light' ? 'dark' : 'light'} mode`,
                        children: t === 'light' ? '◑' : '◐',
                    }),
                ],
            }),
        ],
    });
}
function Pp(e) {
    return e.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
function jp({ activity: e, terminalText: t, onClearTerminal: n }) {
    return y.jsxs('div', {
        className: 'bottom-panels',
        children: [
            y.jsxs('section', {
                className: 'output-panel',
                children: [
                    y.jsx('div', {
                        className: 'output-panel__header',
                        children: y.jsx('h2', { children: 'Activity' }),
                    }),
                    y.jsx('div', {
                        className: 'output-panel__body',
                        children:
                            e.length === 0
                                ? y.jsx('p', {
                                      className: 'activity-empty',
                                      children: 'Events from WebSocket and API actions appear here.',
                                  })
                                : y.jsx('ul', {
                                      className: 'activity-list',
                                      children: e.map((r) =>
                                          y.jsxs(
                                              'li',
                                              {
                                                  className: `activity-item activity-item--${r.tone}`,
                                                  children: [
                                                      y.jsx('span', {
                                                          className: 'activity-item__time',
                                                          children: Pp(r.time),
                                                      }),
                                                      y.jsxs('div', {
                                                          children: [
                                                              y.jsx('div', {
                                                                  className: 'activity-item__label',
                                                                  children: r.label,
                                                              }),
                                                              r.detail &&
                                                                  y.jsx('div', {
                                                                      className: 'activity-item__detail',
                                                                      children: r.detail,
                                                                  }),
                                                          ],
                                                      }),
                                                  ],
                                              },
                                              r.id
                                          )
                                      ),
                                  }),
                    }),
                ],
            }),
            y.jsxs('section', {
                className: 'output-panel',
                children: [
                    y.jsxs('div', {
                        className: 'output-panel__header',
                        children: [
                            y.jsx('h2', { children: 'Command Output' }),
                            y.jsx('button', {
                                type: 'button',
                                className: 'btn btn--ghost',
                                onClick: n,
                                children: 'Clear',
                            }),
                        ],
                    }),
                    y.jsx('div', {
                        className: 'output-panel__body',
                        children: t
                            ? y.jsx('pre', { className: 'terminal', children: t })
                            : y.jsx('pre', {
                                  className: 'terminal terminal--empty',
                                  children: 'Git, Gradle build, and deploy output shows here.',
                              }),
                    }),
                ],
            }),
        ],
    });
}
const wc = '862-git-state',
    ts = () => ({ repoName: null, branch: null, pulled: !1 });
function zp() {
    try {
        const e = localStorage.getItem(wc);
        if (!e) return ts();
        const t = JSON.parse(e);
        return { repoName: t.repoName ?? null, branch: t.branch ?? null, pulled: !!t.pulled };
    } catch {
        return ts();
    }
}
function Rn(e) {
    localStorage.setItem(wc, JSON.stringify(e));
}
function no(e, t, n) {
    switch (e) {
        case 'branch_checkout':
            return { repoName: String(t.repoName ?? ''), branch: String(t.branch ?? ''), pulled: !1 };
        case 'github_repo_pull':
            return {
                repoName: String(t.repoName ?? n.repoName ?? ''),
                branch: n.repoName === String(t.repoName) ? n.branch : null,
                pulled: !0,
            };
        case 'github_repo_clone':
            return { repoName: String(t.repoName ?? ''), branch: null, pulled: !1 };
        default:
            return null;
    }
}
function Tp(e, t) {
    return { repoName: e, branch: t, pulled: !1 };
}
function Rp(e, t) {
    return { repoName: e, branch: t.repoName === e ? t.branch : null, pulled: !0 };
}
function Lp(e) {
    return { repoName: e, branch: null, pulled: !1 };
}
const Sc = '862-deploy-theme';
function Op() {
    const e = localStorage.getItem(Sc);
    return e === 'light' || e === 'dark'
        ? e
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
}
function Ip() {
    const [e, t] = O.useState(Op);
    O.useEffect(() => {
        ((document.documentElement.dataset.theme = e), localStorage.setItem(Sc, e));
    }, [e]);
    const n = O.useCallback(() => {
        t((r) => (r === 'light' ? 'dark' : 'light'));
    }, []);
    return { theme: e, toggleTheme: n };
}
function Fp(e) {
    const [t, n] = O.useState('connecting'),
        r = O.useRef(e);
    r.current = e;
    const l = O.useCallback(() => {
        const o = window.location.protocol === 'https:' ? 'wss:' : 'ws:',
            u = new WebSocket(`${o}//${window.location.host}/ws`);
        return (
            (u.onopen = () => n('connected')),
            (u.onclose = () => n('disconnected')),
            (u.onerror = () => n('disconnected')),
            (u.onmessage = (i) => {
                var s;
                try {
                    const c = JSON.parse(i.data);
                    (s = c.message) != null && s.type && r.current(c.message);
                } catch (c) {
                    console.error('WebSocket message parse error:', c);
                }
            }),
            u
        );
    }, []);
    return (
        O.useEffect(() => {
            n('connecting');
            const o = l();
            return () => {
                o.close();
            };
        }, [l]),
        { status: t }
    );
}
function Dp(e) {
    switch (e) {
        case 'recording_status':
            return 'Recording status changed';
        case 'github_repo_clone':
            return 'Repository cloned';
        case 'branch_checkout':
            return 'Branch checked out';
        case 'github_repo_pull':
            return 'Repository pulled';
        case 'github_repo_fetch':
            return 'Repository fetched';
        default:
            return e;
    }
}
let ns = 0;
function Mp() {
    return ((ns += 1), `act-${ns}`);
}
function rs(e, t) {
    const r = [`$ ${e}  (exit ${t.code ?? '?'})`];
    return (
        t.stdout.trim() && r.push(t.stdout.trimEnd()),
        t.stderr.trim() &&
            r.push(`[stderr]
${t.stderr.trimEnd()}`),
        r.join(`

`)
    );
}
function ls(e) {
    if (!e || typeof e != 'object') return null;
    const t = e;
    return typeof t.stdout == 'string' && typeof t.stderr == 'string'
        ? {
              code: typeof t.code == 'number' ? t.code : -1,
              signal: typeof t.signal == 'string' ? t.signal : null,
              stdout: t.stdout,
              stderr: t.stderr,
          }
        : null;
}
function $p() {
    const { theme: e, toggleTheme: t } = Ip(),
        [n, r] = O.useState([]),
        [l, o] = O.useState([]),
        [u, i] = O.useState(''),
        [s, c] = O.useState(''),
        [h, m] = O.useState(''),
        [p, w] = O.useState(!0),
        [S, k] = O.useState(!1),
        [D, f] = O.useState(null),
        [a, d] = O.useState(!1),
        [v, x] = O.useState(!1),
        [P, C] = O.useState(''),
        [j, V] = O.useState([]),
        [R, de] = O.useState(''),
        [zt, We] = O.useState(!1),
        [pr, zl] = O.useState([]),
        [xn, Ht] = O.useState(''),
        [E, z] = O.useState(''),
        [T, $] = O.useState(zp),
        G = O.useCallback((N) => {
            ($(N), Rn(N));
        }, []),
        X = O.useCallback((N) => {
            zl((L) => [{ id: Mp(), time: N.time ?? new Date(), ...N }, ...L.slice(0, 49)]);
        }, []),
        He = O.useCallback((N) => {
            Ht((L) =>
                L
                    ? `${L}

${N}`
                    : N
            );
        }, []),
        Qe = O.useCallback(async () => {
            w(!0);
            try {
                const N = await ap();
                (r(N), i((L) => (L && N.includes(L) ? L : (N[0] ?? ''))));
            } catch (N) {
                (z(N instanceof Error ? N.message : 'Failed to load repos'),
                    X({ source: 'api', label: 'Failed to load repositories', tone: 'error' }));
            } finally {
                w(!1);
            }
        }, [X]),
        xe = O.useCallback(
            async (N) => {
                if (!N) {
                    (o([]), c(''));
                    return;
                }
                k(!0);
                try {
                    const L = await cp(N);
                    (o(L), c((te) => (te && L.includes(te) ? te : (L[0] ?? ''))));
                } catch (L) {
                    (o([]),
                        c(''),
                        X({
                            source: 'api',
                            label: 'Failed to load branches',
                            detail: L instanceof Error ? L.message : void 0,
                            tone: 'error',
                        }));
                } finally {
                    k(!1);
                }
            },
            [X]
        ),
        Fe = O.useCallback(async () => {
            try {
                const L = [...(await Sp())].sort().reverse();
                (V(L), de((te) => (te && L.includes(te) ? te : (L[0] ?? ''))));
            } catch {
                (V([]), de(''));
            }
        }, []),
        kc = O.useCallback(
            (N) => {
                const L = Dp(N.type);
                let te = '',
                    Ke = 'info';
                if (N.type === 'recording_status') {
                    const Z = !!N.data.recordingOn;
                    (d(Z),
                        Z || (x(!1), C('')),
                        (te = Z ? 'Recording started' : 'Recording stopped'),
                        (Ke = 'neutral'),
                        Fe());
                } else
                    N.type === 'github_repo_clone'
                        ? ((te = String(N.data.repoName ?? '')),
                          (Ke = 'success'),
                          $((Z) => {
                              const le = no(N.type, N.data, Z);
                              return (le && Rn(le), le ?? Z);
                          }),
                          Qe())
                        : N.type === 'branch_checkout'
                          ? ((te = `${N.data.repoName} → ${N.data.branch}`),
                            (Ke = 'success'),
                            $((Z) => {
                                const le = no(N.type, N.data, Z);
                                return (le && Rn(le), le ?? Z);
                            }),
                            xe(String(N.data.repoName ?? u)))
                          : N.type === 'github_repo_pull'
                            ? ((te = String(N.data.repoName ?? '')),
                              (Ke = 'success'),
                              $((Z) => {
                                  const le = no(N.type, N.data, Z);
                                  return (le && Rn(le), le ?? Z);
                              }))
                            : N.type === 'github_repo_fetch' &&
                              ((te = String(N.data.repoName ?? '')), (Ke = 'success'));
                X({ source: 'ws', label: L, detail: te, tone: Ke });
            },
            [X, xe, Fe, Qe, u]
        ),
        { status: xc } = Fp(kc);
    (O.useEffect(() => {
        ((async () => {
            try {
                const N = await yp();
                d(N);
            } catch {
                X({ source: 'system', label: 'Could not reach camera API', tone: 'error' });
            }
        })(),
            Qe(),
            Fe());
    }, [X, Fe, Qe]),
        O.useEffect(() => {
            xe(u);
        }, [u, xe]));
    const Qt = async (N, L, te, Ke) => {
            (f(N), z(''));
            try {
                const Z = await te();
                X({ source: 'api', label: Z.message, tone: 'success' });
                const le = ls(Z.data);
                return (le && He(rs(L, le)), Ke == null || Ke(Z.data), !0);
            } catch (Z) {
                const le = Z instanceof Error ? Z.message : 'Action failed';
                if ((X({ source: 'api', label: L, detail: le, tone: 'error' }), z(le), Z instanceof gc)) {
                    const Hu = ls(Z.data);
                    Hu && He(rs(L, Hu));
                }
                return !1;
            } finally {
                f(null);
            }
        },
        Ec = () => {
            const N = h;
            Qt(
                'clone',
                `git clone ${N}`,
                async () => {
                    const L = await fp(N);
                    return (m(''), await Qe(), i(N), L);
                },
                (L) => {
                    const te = (L == null ? void 0 : L.repoName) ?? N;
                    G(Lp(te));
                }
            );
        },
        _c = () =>
            void Qt(
                'checkout',
                `git checkout ${s}`,
                () => dp(u, s),
                (N) => {
                    const L = N;
                    G(Tp(L.repoName ?? u, L.branch ?? s));
                }
            ).then((N) => {
                N && xe(u);
            }),
        Cc = () =>
            void Qt(
                'pull',
                `git pull ${u}`,
                () => pp(u),
                () => {
                    $((N) => {
                        const L = Rp(u, N);
                        return (Rn(L), L);
                    });
                }
            ),
        Nc = () => void Qt('fetch', `git fetch ${u}`, () => mp(u)),
        Pc = () => void Qt('build', `./gradlew build (${u})`, () => hp(u)),
        jc = () => void Qt('deploy', `./gradlew deploy (${u})`, () => vp(u)),
        zc = async () => {
            We(!0);
            try {
                (await gp(), d(!0), X({ source: 'api', label: 'Recording started', tone: 'success' }));
            } catch (N) {
                X({
                    source: 'api',
                    label: 'Failed to start recording',
                    detail: N instanceof Error ? N.message : void 0,
                    tone: 'error',
                });
            } finally {
                We(!1);
            }
        },
        Tc = async () => {
            We(!0);
            try {
                (await wp(),
                    d(!1),
                    x(!1),
                    C(''),
                    X({ source: 'api', label: 'Recording stopped', tone: 'neutral' }),
                    Fe());
            } catch (N) {
                X({
                    source: 'api',
                    label: 'Failed to stop recording',
                    detail: N instanceof Error ? N.message : void 0,
                    tone: 'error',
                });
            } finally {
                We(!1);
            }
        },
        Rc = () => {
            (C(Ep()), x(!0), X({ source: 'api', label: 'Live stream started', tone: 'info' }));
        },
        Lc = () => {
            (C(''), x(!1), X({ source: 'api', label: 'Live stream stopped', tone: 'neutral' }));
        },
        Oc = D !== null;
    return y.jsxs('div', {
        className: 'app',
        children: [
            y.jsx(Np, { wsStatus: xc, theme: e, gitStatus: T, onToggleTheme: t }),
            Oc && y.jsx('div', { className: 'busy-bar', children: y.jsx('div', { className: 'busy-bar__fill' }) }),
            E && y.jsx('div', { className: 'alert', children: E }),
            y.jsxs('div', {
                className: 'layout',
                children: [
                    y.jsx(Cp, {
                        repos: n,
                        branches: l,
                        selectedRepo: u,
                        selectedBranch: s,
                        cloneName: h,
                        loadingRepos: p,
                        loadingBranches: S,
                        busyAction: D,
                        onSelectRepo: i,
                        onSelectBranch: c,
                        onCloneNameChange: m,
                        onRefreshRepos: () => void Qe(),
                        onClone: Ec,
                        onCheckout: _c,
                        onPull: Cc,
                        onFetch: Nc,
                        onBuild: Pc,
                        onDeploy: jc,
                    }),
                    y.jsxs('main', {
                        className: 'main',
                        children: [
                            y.jsx(_p, {
                                recordingOn: a,
                                streamActive: v,
                                streamUrl: P,
                                recordings: j,
                                selectedRecording: R,
                                cameraBusy: zt,
                                onStartRecording: () => void zc(),
                                onStopRecording: () => void Tc(),
                                onStartStream: Rc,
                                onStopStream: Lc,
                                onRefreshRecordings: () => void Fe(),
                                onSelectRecording: de,
                            }),
                            y.jsx(jp, { activity: pr, terminalText: xn, onClearTerminal: () => Ht('') }),
                        ],
                    }),
                ],
            }),
        ],
    });
}
const Up = yc(document.getElementById('root'));
Up.render(y.jsx($p, {}));
