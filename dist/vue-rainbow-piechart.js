!(function(e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t(require('moment')))
    : 'function' == typeof define && define.amd
    ? define('vue-rainbow-piechart', ['moment'], t)
    : 'object' == typeof exports
    ? (exports['vue-rainbow-piechart'] = t(require('moment')))
    : (e['vue-rainbow-piechart'] = t(e.moment));
})(this, function(e) {
  return (function(e) {
    function t(o) {
      if (n[o]) return n[o].exports;
      var r = (n[o] = { exports: {}, id: o, loaded: !1 });
      return e[o].call(r.exports, r, r.exports, t), (r.loaded = !0), r.exports;
    }
    var n = {};
    return (t.m = e), (t.c = n), (t.p = ''), t(0);
  })([
    function(e, t, n) {
      var o = n(1)(n(2), n(4), null, null);
      e.exports = o.exports;
    },
    function(e, t) {
      e.exports = function(e, t, n, o) {
        var r,
          u = (e = e || {}),
          c = typeof e['default'];
        ('object' !== c && 'function' !== c) || ((r = e), (u = e['default']));
        var i = 'function' == typeof u ? u.options : u;
        if (
          (t &&
            ((i.render = t.render), (i.staticRenderFns = t.staticRenderFns)),
          n && (i._scopeId = n),
          o)
        ) {
          var f = Object.create(i.computed || null);
          Object.keys(o).forEach(function(e) {
            var t = o[e];
            f[e] = function() {
              return t;
            };
          }),
            (i.computed = f);
        }
        return { esModule: r, exports: u, options: i };
      };
    },
    function(e, t, n) {
      'use strict';
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = n(3),
        u = o(r);
      t['default'] = {
        data: function() {
          return { time: Date.now() };
        },
        computed: {
          display: function() {
            return (0, u['default'])(this.time).format('HH:mm:ss');
          }
        },
        created: function() {
          var e = this;
          setInterval(function() {
            e.time = Date.now();
          }, 1e3);
        }
      };
    },
    function(t, n) {
      t.exports = e;
    },
    function(e, t) {
      e.exports = {
        render: function() {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n('div', [e._v(e._s(e.display))]);
        },
        staticRenderFns: []
      };
    }
  ]);
});
