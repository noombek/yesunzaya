/* qTip2 v2.2.0 tips modal viewport svg imagemap ie6 | qtip2.com | Licensed MIT, GPL | Fri Nov 29 2013 13:08:34 */

!(function (a, b, c) {
  !(function (a) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["jquery"], a)
      : jQuery && !jQuery.fn.qtip && a(jQuery);
  })(function (d) {
    "use strict";
    function e(a, b, c, e) {
      (this.id = c),
        (this.target = a),
        (this.tooltip = G),
        (this.elements = { target: a }),
        (this._id = T + "-" + c),
        (this.timers = { img: {} }),
        (this.options = b),
        (this.plugins = {}),
        (this.cache = {
          event: {},
          target: d(),
          disabled: F,
          attr: e,
          onTooltip: F,
          lastClass: "",
        }),
        (this.rendered =
          this.destroyed =
          this.disabled =
          this.waiting =
          this.hiddenDuringWait =
          this.positioning =
          this.triggering =
            F);
    }
    function f(a) {
      return a === G || "object" !== d.type(a);
    }
    function g(a) {
      return !(
        d.isFunction(a) ||
        (a && a.attr) ||
        a.length ||
        ("object" === d.type(a) && (a.jquery || a.then))
      );
    }
    function h(a) {
      var b, c, e, h;
      return f(a)
        ? F
        : (f(a.metadata) && (a.metadata = { type: a.metadata }),
          "content" in a &&
            ((b = a.content),
            f(b) || b.jquery || b.done
              ? (b = a.content = { text: (c = g(b) ? F : b) })
              : (c = b.text),
            "ajax" in b &&
              ((e = b.ajax),
              (h = e && e.once !== F),
              delete b.ajax,
              (b.text = function (a, b) {
                var f =
                    c || d(this).attr(b.options.content.attr) || "Loading...",
                  g = d
                    .ajax(d.extend({}, e, { context: b }))
                    .then(e.success, G, e.error)
                    .then(
                      function (a) {
                        return a && h && b.set("content.text", a), a;
                      },
                      function (a, c, d) {
                        b.destroyed ||
                          0 === a.status ||
                          b.set("content.text", c + ": " + d);
                      }
                    );
                return h ? f : (b.set("content.text", f), g);
              })),
            "title" in b &&
              (f(b.title) ||
                ((b.button = b.title.button), (b.title = b.title.text)),
              g(b.title || F) && (b.title = F))),
          "position" in a &&
            f(a.position) &&
            (a.position = { my: a.position, at: a.position }),
          "show" in a &&
            f(a.show) &&
            (a.show = a.show.jquery
              ? { target: a.show }
              : a.show === E
              ? { ready: E }
              : { event: a.show }),
          "hide" in a &&
            f(a.hide) &&
            (a.hide = a.hide.jquery ? { target: a.hide } : { event: a.hide }),
          "style" in a && f(a.style) && (a.style = { classes: a.style }),
          d.each(S, function () {
            this.sanitize && this.sanitize(a);
          }),
          a);
    }
    function i(a, b) {
      for (var c, d = 0, e = a, f = b.split("."); (e = e[f[d++]]); )
        d < f.length && (c = e);
      return [c || a, f.pop()];
    }
    function j(a, b) {
      var c, d, e;
      for (c in this.checks)
        for (d in this.checks[c])
          (e = new RegExp(d, "i").exec(a)) &&
            (b.push(e),
            ("builtin" === c || this.plugins[c]) &&
              this.checks[c][d].apply(this.plugins[c] || this, b));
    }
    function k(a) {
      return W.concat("").join(a ? "-" + a + " " : " ");
    }
    function l(c) {
      return (
        (c && {
          type: c.type,
          pageX: c.pageX,
          pageY: c.pageY,
          target: c.target,
          relatedTarget: c.relatedTarget,
          scrollX:
            c.scrollX ||
            a.pageXOffset ||
            b.body.scrollLeft ||
            b.documentElement.scrollLeft,
          scrollY:
            c.scrollY ||
            a.pageYOffset ||
            b.body.scrollTop ||
            b.documentElement.scrollTop,
        }) ||
        {}
      );
    }
    function m(a, b) {
      return b > 0 ? setTimeout(d.proxy(a, this), b) : (a.call(this), void 0);
    }
    function n(a) {
      return this.tooltip.hasClass(bb)
        ? F
        : (clearTimeout(this.timers.show),
          clearTimeout(this.timers.hide),
          (this.timers.show = m.call(
            this,
            function () {
              this.toggle(E, a);
            },
            this.options.show.delay
          )),
          void 0);
    }
    function o(a) {
      if (this.tooltip.hasClass(bb)) return F;
      var b = d(a.relatedTarget),
        c = b.closest(X)[0] === this.tooltip[0],
        e = b[0] === this.options.show.target[0];
      if (
        (clearTimeout(this.timers.show),
        clearTimeout(this.timers.hide),
        (this !== b[0] && "mouse" === this.options.position.target && c) ||
          (this.options.hide.fixed &&
            /mouse(out|leave|move)/.test(a.type) &&
            (c || e)))
      )
        try {
          a.preventDefault(), a.stopImmediatePropagation();
        } catch (f) {}
      else
        this.timers.hide = m.call(
          this,
          function () {
            this.toggle(F, a);
          },
          this.options.hide.delay,
          this
        );
    }
    function p(a) {
      return this.tooltip.hasClass(bb) || !this.options.hide.inactive
        ? F
        : (clearTimeout(this.timers.inactive),
          (this.timers.inactive = m.call(
            this,
            function () {
              this.hide(a);
            },
            this.options.hide.inactive
          )),
          void 0);
    }
    function q(a) {
      this.rendered && this.tooltip[0].offsetWidth > 0 && this.reposition(a);
    }
    function r(a, c, e) {
      d(b.body).delegate(a, (c.split ? c : c.join(ib + " ")) + ib, function () {
        var a = z.api[d.attr(this, V)];
        a && !a.disabled && e.apply(a, arguments);
      });
    }
    function s(a, c, f) {
      var g,
        i,
        j,
        k,
        l,
        m = d(b.body),
        n = a[0] === b ? m : a,
        o = a.metadata ? a.metadata(f.metadata) : G,
        p = "html5" === f.metadata.type && o ? o[f.metadata.name] : G,
        q = a.data(f.metadata.name || "qtipopts");
      try {
        q = "string" == typeof q ? d.parseJSON(q) : q;
      } catch (r) {}
      if (
        ((k = d.extend(
          E,
          {},
          z.defaults,
          f,
          "object" == typeof q ? h(q) : G,
          h(p || o)
        )),
        (i = k.position),
        (k.id = c),
        "boolean" == typeof k.content.text)
      ) {
        if (((j = a.attr(k.content.attr)), k.content.attr === F || !j))
          return F;
        k.content.text = j;
      }
      if (
        (i.container.length || (i.container = m),
        i.target === F && (i.target = n),
        k.show.target === F && (k.show.target = n),
        k.show.solo === E && (k.show.solo = i.container.closest("body")),
        k.hide.target === F && (k.hide.target = n),
        k.position.viewport === E && (k.position.viewport = i.container),
        (i.container = i.container.eq(0)),
        (i.at = new B(i.at, E)),
        (i.my = new B(i.my)),
        a.data(T))
      )
        if (k.overwrite) a.qtip("destroy", !0);
        else if (k.overwrite === F) return F;
      return (
        a.attr(U, c),
        k.suppress &&
          (l = a.attr("title")) &&
          a.removeAttr("title").attr(db, l).attr("title", ""),
        (g = new e(a, k, c, !!j)),
        a.data(T, g),
        a.one("remove.qtip-" + c + " removeqtip.qtip-" + c, function () {
          var a;
          (a = d(this).data(T)) && a.destroy(!0);
        }),
        g
      );
    }
    function t(a) {
      return a.charAt(0).toUpperCase() + a.slice(1);
    }
    function u(a, b) {
      var d,
        e,
        f = b.charAt(0).toUpperCase() + b.slice(1),
        g = (b + " " + tb.join(f + " ") + f).split(" "),
        h = 0;
      if (sb[b]) return a.css(sb[b]);
      for (; (d = g[h++]); ) if ((e = a.css(d)) !== c) return (sb[b] = d), e;
    }
    function v(a, b) {
      return Math.ceil(parseFloat(u(a, b)));
    }
    function w(a, b) {
      (this._ns = "tip"),
        (this.options = b),
        (this.offset = b.offset),
        (this.size = [b.width, b.height]),
        this.init((this.qtip = a));
    }
    function x(a, b) {
      (this.options = b), (this._ns = "-modal"), this.init((this.qtip = a));
    }
    function y(a) {
      (this._ns = "ie6"), this.init((this.qtip = a));
    }
    var z,
      A,
      B,
      C,
      D,
      E = !0,
      F = !1,
      G = null,
      H = "x",
      I = "y",
      J = "width",
      K = "height",
      L = "top",
      M = "left",
      N = "bottom",
      O = "right",
      P = "center",
      Q = "flipinvert",
      R = "shift",
      S = {},
      T = "qtip",
      U = "data-hasqtip",
      V = "data-qtip-id",
      W = ["ui-widget", "ui-tooltip"],
      X = "." + T,
      Y =
        "click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(
          " "
        ),
      Z = T + "-fixed",
      $ = T + "-default",
      _ = T + "-focus",
      ab = T + "-hover",
      bb = T + "-disabled",
      cb = "_replacedByqTip",
      db = "oldtitle",
      eb = {
        ie: (function () {
          for (
            var a = 3, c = b.createElement("div");
            (c.innerHTML = "<!--[if gt IE " + ++a + "]><i></i><![endif]-->") &&
            c.getElementsByTagName("i")[0];

          );
          return a > 4 ? a : 0 / 0;
        })(),
        iOS:
          parseFloat(
            (
              "" +
              (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(
                navigator.userAgent
              ) || [0, ""])[1]
            )
              .replace("undefined", "3_2")
              .replace("_", ".")
              .replace("_", "")
          ) || F,
      };
    (A = e.prototype),
      (A._when = function (a) {
        return d.when.apply(d, a);
      }),
      (A.render = function (a) {
        if (this.rendered || this.destroyed) return this;
        var b,
          c = this,
          e = this.options,
          f = this.cache,
          g = this.elements,
          h = e.content.text,
          i = e.content.title,
          j = e.content.button,
          k = e.position,
          l = ("." + this._id + " ", []);
        return (
          d.attr(this.target[0], "aria-describedby", this._id),
          (this.tooltip =
            g.tooltip =
            b =
              d("<div/>", {
                id: this._id,
                class: [
                  T,
                  $,
                  e.style.classes,
                  T + "-pos-" + e.position.my.abbrev(),
                ].join(" "),
                width: e.style.width || "",
                height: e.style.height || "",
                tracking: "mouse" === k.target && k.adjust.mouse,
                role: "alert",
                "aria-live": "polite",
                "aria-atomic": F,
                "aria-describedby": this._id + "-content",
                "aria-hidden": E,
              })
                .toggleClass(bb, this.disabled)
                .attr(V, this.id)
                .data(T, this)
                .appendTo(k.container)
                .append(
                  (g.content = d("<div />", {
                    class: T + "-content",
                    id: this._id + "-content",
                    "aria-atomic": E,
                  }))
                )),
          (this.rendered = -1),
          (this.positioning = E),
          i &&
            (this._createTitle(),
            d.isFunction(i) || l.push(this._updateTitle(i, F))),
          j && this._createButton(),
          d.isFunction(h) || l.push(this._updateContent(h, F)),
          (this.rendered = E),
          this._setWidget(),
          d.each(S, function (a) {
            var b;
            "render" === this.initialize && (b = this(c)) && (c.plugins[a] = b);
          }),
          this._unassignEvents(),
          this._assignEvents(),
          this._when(l).then(function () {
            c._trigger("render"),
              (c.positioning = F),
              c.hiddenDuringWait ||
                (!e.show.ready && !a) ||
                c.toggle(E, f.event, F),
              (c.hiddenDuringWait = F);
          }),
          (z.api[this.id] = this),
          this
        );
      }),
      (A.destroy = function (a) {
        function b() {
          if (!this.destroyed) {
            this.destroyed = E;
            var a = this.target,
              b = a.attr(db);
            this.rendered &&
              this.tooltip.stop(1, 0).find("*").remove().end().remove(),
              d.each(this.plugins, function () {
                this.destroy && this.destroy();
              }),
              clearTimeout(this.timers.show),
              clearTimeout(this.timers.hide),
              this._unassignEvents(),
              a
                .removeData(T)
                .removeAttr(V)
                .removeAttr(U)
                .removeAttr("aria-describedby"),
              this.options.suppress && b && a.attr("title", b).removeAttr(db),
              this._unbind(a),
              (this.options =
                this.elements =
                this.cache =
                this.timers =
                this.plugins =
                this.mouse =
                  G),
              delete z.api[this.id];
          }
        }
        return this.destroyed
          ? this.target
          : ((a === E && "hide" !== this.triggering) || !this.rendered
              ? b.call(this)
              : (this.tooltip.one("tooltiphidden", d.proxy(b, this)),
                !this.triggering && this.hide()),
            this.target);
      }),
      (C = A.checks =
        {
          builtin: {
            "^id$": function (a, b, c, e) {
              var f = c === E ? z.nextid : c,
                g = T + "-" + f;
              f !== F && f.length > 0 && !d("#" + g).length
                ? ((this._id = g),
                  this.rendered &&
                    ((this.tooltip[0].id = this._id),
                    (this.elements.content[0].id = this._id + "-content"),
                    (this.elements.title[0].id = this._id + "-title")))
                : (a[b] = e);
            },
            "^prerender": function (a, b, c) {
              c && !this.rendered && this.render(this.options.show.ready);
            },
            "^content.text$": function (a, b, c) {
              this._updateContent(c);
            },
            "^content.attr$": function (a, b, c, d) {
              this.options.content.text === this.target.attr(d) &&
                this._updateContent(this.target.attr(c));
            },
            "^content.title$": function (a, b, c) {
              return c
                ? (c && !this.elements.title && this._createTitle(),
                  this._updateTitle(c),
                  void 0)
                : this._removeTitle();
            },
            "^content.button$": function (a, b, c) {
              this._updateButton(c);
            },
            "^content.title.(text|button)$": function (a, b, c) {
              this.set("content." + b, c);
            },
            "^position.(my|at)$": function (a, b, c) {
              "string" == typeof c && (a[b] = new B(c, "at" === b));
            },
            "^position.container$": function (a, b, c) {
              this.rendered && this.tooltip.appendTo(c);
            },
            "^show.ready$": function (a, b, c) {
              c && ((!this.rendered && this.render(E)) || this.toggle(E));
            },
            "^style.classes$": function (a, b, c, d) {
              this.rendered && this.tooltip.removeClass(d).addClass(c);
            },
            "^style.(width|height)": function (a, b, c) {
              this.rendered && this.tooltip.css(b, c);
            },
            "^style.widget|content.title": function () {
              this.rendered && this._setWidget();
            },
            "^style.def": function (a, b, c) {
              this.rendered && this.tooltip.toggleClass($, !!c);
            },
            "^events.(render|show|move|hide|focus|blur)$": function (a, b, c) {
              this.rendered &&
                this.tooltip[(d.isFunction(c) ? "" : "un") + "bind"](
                  "tooltip" + b,
                  c
                );
            },
            "^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)":
              function () {
                if (this.rendered) {
                  var a = this.options.position;
                  this.tooltip.attr(
                    "tracking",
                    "mouse" === a.target && a.adjust.mouse
                  ),
                    this._unassignEvents(),
                    this._assignEvents();
                }
              },
          },
        }),
      (A.get = function (a) {
        if (this.destroyed) return this;
        var b = i(this.options, a.toLowerCase()),
          c = b[0][b[1]];
        return c.precedance ? c.string() : c;
      });
    var fb =
        /^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,
      gb = /^prerender|show\.ready/i;
    (A.set = function (a, b) {
      if (this.destroyed) return this;
      {
        var c,
          e = this.rendered,
          f = F,
          g = this.options;
        this.checks;
      }
      return (
        "string" == typeof a
          ? ((c = a), (a = {}), (a[c] = b))
          : (a = d.extend({}, a)),
        d.each(a, function (b, c) {
          if (e && gb.test(b)) return delete a[b], void 0;
          var h,
            j = i(g, b.toLowerCase());
          (h = j[0][j[1]]),
            (j[0][j[1]] = c && c.nodeType ? d(c) : c),
            (f = fb.test(b) || f),
            (a[b] = [j[0], j[1], c, h]);
        }),
        h(g),
        (this.positioning = E),
        d.each(a, d.proxy(j, this)),
        (this.positioning = F),
        this.rendered &&
          this.tooltip[0].offsetWidth > 0 &&
          f &&
          this.reposition("mouse" === g.position.target ? G : this.cache.event),
        this
      );
    }),
      (A._update = function (a, b) {
        var c = this,
          e = this.cache;
        return this.rendered && a
          ? (d.isFunction(a) &&
              (a = a.call(this.elements.target, e.event, this) || ""),
            d.isFunction(a.then)
              ? ((e.waiting = E),
                a.then(
                  function (a) {
                    return (e.waiting = F), c._update(a, b);
                  },
                  G,
                  function (a) {
                    return c._update(a, b);
                  }
                ))
              : a === F || (!a && "" !== a)
              ? F
              : (a.jquery && a.length > 0
                  ? b
                      .empty()
                      .append(
                        a.css({ display: "block", visibility: "visible" })
                      )
                  : b.html(a),
                this._waitForContent(b).then(function (a) {
                  a.images &&
                    a.images.length &&
                    c.rendered &&
                    c.tooltip[0].offsetWidth > 0 &&
                    c.reposition(e.event, !a.length);
                })))
          : F;
      }),
      (A._waitForContent = function (a) {
        var b = this.cache;
        return (
          (b.waiting = E),
          (d.fn.imagesLoaded ? a.imagesLoaded() : d.Deferred().resolve([]))
            .done(function () {
              b.waiting = F;
            })
            .promise()
        );
      }),
      (A._updateContent = function (a, b) {
        this._update(a, this.elements.content, b);
      }),
      (A._updateTitle = function (a, b) {
        this._update(a, this.elements.title, b) === F && this._removeTitle(F);
      }),
      (A._createTitle = function () {
        var a = this.elements,
          b = this._id + "-title";
        a.titlebar && this._removeTitle(),
          (a.titlebar = d("<div />", {
            class:
              T + "-titlebar " + (this.options.style.widget ? k("header") : ""),
          })
            .append(
              (a.title = d("<div />", {
                id: b,
                class: T + "-title",
                "aria-atomic": E,
              }))
            )
            .insertBefore(a.content)
            .delegate(
              ".qtip-close",
              "mousedown keydown mouseup keyup mouseout",
              function (a) {
                d(this).toggleClass(
                  "ui-state-active ui-state-focus",
                  "down" === a.type.substr(-4)
                );
              }
            )
            .delegate(".qtip-close", "mouseover mouseout", function (a) {
              d(this).toggleClass("ui-state-hover", "mouseover" === a.type);
            })),
          this.options.content.button && this._createButton();
      }),
      (A._removeTitle = function (a) {
        var b = this.elements;
        b.title &&
          (b.titlebar.remove(),
          (b.titlebar = b.title = b.button = G),
          a !== F && this.reposition());
      }),
      (A.reposition = function (c, e) {
        if (!this.rendered || this.positioning || this.destroyed) return this;
        this.positioning = E;
        var f,
          g,
          h = this.cache,
          i = this.tooltip,
          j = this.options.position,
          k = j.target,
          l = j.my,
          m = j.at,
          n = j.viewport,
          o = j.container,
          p = j.adjust,
          q = p.method.split(" "),
          r = i.outerWidth(F),
          s = i.outerHeight(F),
          t = 0,
          u = 0,
          v = i.css("position"),
          w = { left: 0, top: 0 },
          x = i[0].offsetWidth > 0,
          y = c && "scroll" === c.type,
          z = d(a),
          A = o[0].ownerDocument,
          B = this.mouse;
        if (d.isArray(k) && 2 === k.length)
          (m = { x: M, y: L }), (w = { left: k[0], top: k[1] });
        else if ("mouse" === k)
          (m = { x: M, y: L }),
            !B || !B.pageX || (!p.mouse && c && c.pageX)
              ? (c && c.pageX) ||
                ((!p.mouse || this.options.show.distance) &&
                h.origin &&
                h.origin.pageX
                  ? (c = h.origin)
                  : (!c ||
                      (c && ("resize" === c.type || "scroll" === c.type))) &&
                    (c = h.event))
              : (c = B),
            "static" !== v && (w = o.offset()),
            A.body.offsetWidth !==
              (a.innerWidth || A.documentElement.clientWidth) &&
              (g = d(b.body).offset()),
            (w = {
              left: c.pageX - w.left + ((g && g.left) || 0),
              top: c.pageY - w.top + ((g && g.top) || 0),
            }),
            p.mouse &&
              y &&
              B &&
              ((w.left -= (B.scrollX || 0) - z.scrollLeft()),
              (w.top -= (B.scrollY || 0) - z.scrollTop()));
        else {
          if (
            ("event" === k
              ? c && c.target && "scroll" !== c.type && "resize" !== c.type
                ? (h.target = d(c.target))
                : c.target || (h.target = this.elements.target)
              : "event" !== k &&
                (h.target = d(k.jquery ? k : this.elements.target)),
            (k = h.target),
            (k = d(k).eq(0)),
            0 === k.length)
          )
            return this;
          k[0] === b || k[0] === a
            ? ((t = eb.iOS ? a.innerWidth : k.width()),
              (u = eb.iOS ? a.innerHeight : k.height()),
              k[0] === a &&
                (w = {
                  top: (n || k).scrollTop(),
                  left: (n || k).scrollLeft(),
                }))
            : S.imagemap && k.is("area")
            ? (f = S.imagemap(this, k, m, S.viewport ? q : F))
            : S.svg && k && k[0].ownerSVGElement
            ? (f = S.svg(this, k, m, S.viewport ? q : F))
            : ((t = k.outerWidth(F)), (u = k.outerHeight(F)), (w = k.offset())),
            f &&
              ((t = f.width), (u = f.height), (g = f.offset), (w = f.position)),
            (w = this.reposition.offset(k, w, o)),
            ((eb.iOS > 3.1 && eb.iOS < 4.1) ||
              (eb.iOS >= 4.3 && eb.iOS < 4.33) ||
              (!eb.iOS && "fixed" === v)) &&
              ((w.left -= z.scrollLeft()), (w.top -= z.scrollTop())),
            (!f || (f && f.adjustable !== F)) &&
              ((w.left += m.x === O ? t : m.x === P ? t / 2 : 0),
              (w.top += m.y === N ? u : m.y === P ? u / 2 : 0));
        }
        return (
          (w.left += p.x + (l.x === O ? -r : l.x === P ? -r / 2 : 0)),
          (w.top += p.y + (l.y === N ? -s : l.y === P ? -s / 2 : 0)),
          S.viewport
            ? ((w.adjusted = S.viewport(this, w, j, t, u, r, s)),
              g && w.adjusted.left && (w.left += g.left),
              g && w.adjusted.top && (w.top += g.top))
            : (w.adjusted = { left: 0, top: 0 }),
          this._trigger("move", [w, n.elem || n], c)
            ? (delete w.adjusted,
              e === F ||
              !x ||
              isNaN(w.left) ||
              isNaN(w.top) ||
              "mouse" === k ||
              !d.isFunction(j.effect)
                ? i.css(w)
                : d.isFunction(j.effect) &&
                  (j.effect.call(i, this, d.extend({}, w)),
                  i.queue(function (a) {
                    d(this).css({ opacity: "", height: "" }),
                      eb.ie && this.style.removeAttribute("filter"),
                      a();
                  })),
              (this.positioning = F),
              this)
            : this
        );
      }),
      (A.reposition.offset = function (a, c, e) {
        function f(a, b) {
          (c.left += b * a.scrollLeft()), (c.top += b * a.scrollTop());
        }
        if (!e[0]) return c;
        var g,
          h,
          i,
          j,
          k = d(a[0].ownerDocument),
          l = !!eb.ie && "CSS1Compat" !== b.compatMode,
          m = e[0];
        do
          "static" !== (h = d.css(m, "position")) &&
            ("fixed" === h
              ? ((i = m.getBoundingClientRect()), f(k, -1))
              : ((i = d(m).position()),
                (i.left += parseFloat(d.css(m, "borderLeftWidth")) || 0),
                (i.top += parseFloat(d.css(m, "borderTopWidth")) || 0)),
            (c.left -= i.left + (parseFloat(d.css(m, "marginLeft")) || 0)),
            (c.top -= i.top + (parseFloat(d.css(m, "marginTop")) || 0)),
            g ||
              "hidden" === (j = d.css(m, "overflow")) ||
              "visible" === j ||
              (g = d(m)));
        while ((m = m.offsetParent));
        return g && (g[0] !== k[0] || l) && f(g, 1), c;
      });
    var hb = (B = A.reposition.Corner =
      function (a, b) {
        (a = ("" + a)
          .replace(/([A-Z])/, " $1")
          .replace(/middle/gi, P)
          .toLowerCase()),
          (this.x = (a.match(/left|right/i) ||
            a.match(/center/) || ["inherit"])[0].toLowerCase()),
          (this.y = (a.match(/top|bottom|center/i) || [
            "inherit",
          ])[0].toLowerCase()),
          (this.forceY = !!b);
        var c = a.charAt(0);
        this.precedance = "t" === c || "b" === c ? I : H;
      }).prototype;
    (hb.invert = function (a, b) {
      this[a] = this[a] === M ? O : this[a] === O ? M : b || this[a];
    }),
      (hb.string = function () {
        var a = this.x,
          b = this.y;
        return a === b
          ? a
          : this.precedance === I || (this.forceY && "center" !== b)
          ? b + " " + a
          : a + " " + b;
      }),
      (hb.abbrev = function () {
        var a = this.string().split(" ");
        return a[0].charAt(0) + ((a[1] && a[1].charAt(0)) || "");
      }),
      (hb.clone = function () {
        return new B(this.string(), this.forceY);
      }),
      (A.toggle = function (a, c) {
        var e = this.cache,
          f = this.options,
          g = this.tooltip;
        if (c) {
          if (
            /over|enter/.test(c.type) &&
            /out|leave/.test(e.event.type) &&
            f.show.target.add(c.target).length === f.show.target.length &&
            g.has(c.relatedTarget).length
          )
            return this;
          e.event = l(c);
        }
        if ((this.waiting && !a && (this.hiddenDuringWait = E), !this.rendered))
          return a ? this.render(1) : this;
        if (this.destroyed || this.disabled) return this;
        var h,
          i,
          j,
          k = a ? "show" : "hide",
          m = this.options[k],
          n = (this.options[a ? "hide" : "show"], this.options.position),
          o = this.options.content,
          p = this.tooltip.css("width"),
          q = this.tooltip.is(":visible"),
          r = a || 1 === m.target.length,
          s = !c || m.target.length < 2 || e.target[0] === c.target;
        return (
          (typeof a).search("boolean|number") && (a = !q),
          (h = !g.is(":animated") && q === a && s),
          (i = h ? G : !!this._trigger(k, [90])),
          this.destroyed
            ? this
            : (i !== F && a && this.focus(c),
              !i || h
                ? this
                : (d.attr(g[0], "aria-hidden", !a),
                  a
                    ? ((e.origin = l(this.mouse)),
                      d.isFunction(o.text) && this._updateContent(o.text, F),
                      d.isFunction(o.title) && this._updateTitle(o.title, F),
                      !D &&
                        "mouse" === n.target &&
                        n.adjust.mouse &&
                        (d(b).bind("mousemove." + T, this._storeMouse),
                        (D = E)),
                      p || g.css("width", g.outerWidth(F)),
                      this.reposition(c, arguments[2]),
                      p || g.css("width", ""),
                      m.solo &&
                        ("string" == typeof m.solo ? d(m.solo) : d(X, m.solo))
                          .not(g)
                          .not(m.target)
                          .qtip("hide", d.Event("tooltipsolo")))
                    : (clearTimeout(this.timers.show),
                      delete e.origin,
                      D &&
                        !d(X + '[tracking="true"]:visible', m.solo).not(g)
                          .length &&
                        (d(b).unbind("mousemove." + T), (D = F)),
                      this.blur(c)),
                  (j = d.proxy(function () {
                    a
                      ? (eb.ie && g[0].style.removeAttribute("filter"),
                        g.css("overflow", ""),
                        "string" == typeof m.autofocus &&
                          d(this.options.show.autofocus, g).focus(),
                        this.options.show.target.trigger(
                          "qtip-" + this.id + "-inactive"
                        ))
                      : g.css({
                          display: "",
                          visibility: "",
                          opacity: "",
                          left: "",
                          top: "",
                        }),
                      this._trigger(a ? "visible" : "hidden");
                  }, this)),
                  m.effect === F || r === F
                    ? (g[k](), j())
                    : d.isFunction(m.effect)
                    ? (g.stop(1, 1),
                      m.effect.call(g, this),
                      g.queue("fx", function (a) {
                        j(), a();
                      }))
                    : g.fadeTo(90, a ? 1 : 0, j),
                  a && m.target.trigger("qtip-" + this.id + "-inactive"),
                  this))
        );
      }),
      (A.show = function (a) {
        return this.toggle(E, a);
      }),
      (A.hide = function (a) {
        return this.toggle(F, a);
      }),
      (A.focus = function (a) {
        if (!this.rendered || this.destroyed) return this;
        var b = d(X),
          c = this.tooltip,
          e = parseInt(c[0].style.zIndex, 10),
          f = z.zindex + b.length;
        return (
          c.hasClass(_) ||
            (this._trigger("focus", [f], a) &&
              (e !== f &&
                (b.each(function () {
                  this.style.zIndex > e &&
                    (this.style.zIndex = this.style.zIndex - 1);
                }),
                b.filter("." + _).qtip("blur", a)),
              (c.addClass(_)[0].style.zIndex = f))),
          this
        );
      }),
      (A.blur = function (a) {
        return !this.rendered || this.destroyed
          ? this
          : (this.tooltip.removeClass(_),
            this._trigger("blur", [this.tooltip.css("zIndex")], a),
            this);
      }),
      (A.disable = function (a) {
        return this.destroyed
          ? this
          : ("toggle" === a
              ? (a = !(this.rendered
                  ? this.tooltip.hasClass(bb)
                  : this.disabled))
              : "boolean" != typeof a && (a = E),
            this.rendered &&
              this.tooltip.toggleClass(bb, a).attr("aria-disabled", a),
            (this.disabled = !!a),
            this);
      }),
      (A.enable = function () {
        return this.disable(F);
      }),
      (A._createButton = function () {
        var a = this,
          b = this.elements,
          c = b.tooltip,
          e = this.options.content.button,
          f = "string" == typeof e,
          g = f ? e : "Close tooltip";
        b.button && b.button.remove(),
          (b.button = e.jquery
            ? e
            : d("<a />", {
                class:
                  "qtip-close " +
                  (this.options.style.widget ? "" : T + "-icon"),
                title: g,
                "aria-label": g,
              }).prepend(
                d("<span />", {
                  class: "ui-icon ui-icon-close",
                  html: "&times;",
                })
              )),
          b.button
            .appendTo(b.titlebar || c)
            .attr("role", "button")
            .click(function (b) {
              return c.hasClass(bb) || a.hide(b), F;
            });
      }),
      (A._updateButton = function (a) {
        if (!this.rendered) return F;
        var b = this.elements.button;
        a ? this._createButton() : b.remove();
      }),
      (A._setWidget = function () {
        var a = this.options.style.widget,
          b = this.elements,
          c = b.tooltip,
          d = c.hasClass(bb);
        c.removeClass(bb),
          (bb = a ? "ui-state-disabled" : "qtip-disabled"),
          c.toggleClass(bb, d),
          c
            .toggleClass("ui-helper-reset " + k(), a)
            .toggleClass($, this.options.style.def && !a),
          b.content && b.content.toggleClass(k("content"), a),
          b.titlebar && b.titlebar.toggleClass(k("header"), a),
          b.button && b.button.toggleClass(T + "-icon", !a);
      }),
      (A._storeMouse = function (a) {
        (this.mouse = l(a)).type = "mousemove";
      }),
      (A._bind = function (a, b, c, e, f) {
        var g = "." + this._id + (e ? "-" + e : "");
        b.length &&
          d(a).bind((b.split ? b : b.join(g + " ")) + g, d.proxy(c, f || this));
      }),
      (A._unbind = function (a, b) {
        d(a).unbind("." + this._id + (b ? "-" + b : ""));
      });
    var ib = "." + T;
    d(function () {
      r(X, ["mouseenter", "mouseleave"], function (a) {
        var b = "mouseenter" === a.type,
          c = d(a.currentTarget),
          e = d(a.relatedTarget || a.target),
          f = this.options;
        b
          ? (this.focus(a),
            c.hasClass(Z) && !c.hasClass(bb) && clearTimeout(this.timers.hide))
          : "mouse" === f.position.target &&
            f.hide.event &&
            f.show.target &&
            !e.closest(f.show.target[0]).length &&
            this.hide(a),
          c.toggleClass(ab, b);
      }),
        r("[" + V + "]", Y, p);
    }),
      (A._trigger = function (a, b, c) {
        var e = d.Event("tooltip" + a);
        return (
          (e.originalEvent = (c && d.extend({}, c)) || this.cache.event || G),
          (this.triggering = a),
          this.tooltip.trigger(e, [this].concat(b || [])),
          (this.triggering = F),
          !e.isDefaultPrevented()
        );
      }),
      (A._bindEvents = function (a, b, c, e, f, g) {
        if (e.add(c).length === e.length) {
          var h = [];
          (b = d.map(b, function (b) {
            var c = d.inArray(b, a);
            return c > -1 ? (h.push(a.splice(c, 1)[0]), void 0) : b;
          })),
            h.length &&
              this._bind(c, h, function (a) {
                var b = this.rendered ? this.tooltip[0].offsetWidth > 0 : !1;
                (b ? g : f).call(this, a);
              });
        }
        this._bind(c, a, f), this._bind(e, b, g);
      }),
      (A._assignInitialEvents = function (a) {
        function b(a) {
          return this.disabled || this.destroyed
            ? F
            : ((this.cache.event = l(a)),
              (this.cache.target = a ? d(a.target) : [c]),
              clearTimeout(this.timers.show),
              (this.timers.show = m.call(
                this,
                function () {
                  this.render("object" == typeof a || e.show.ready);
                },
                e.show.delay
              )),
              void 0);
        }
        var e = this.options,
          f = e.show.target,
          g = e.hide.target,
          h = e.show.event ? d.trim("" + e.show.event).split(" ") : [],
          i = e.hide.event ? d.trim("" + e.hide.event).split(" ") : [];
        /mouse(over|enter)/i.test(e.show.event) &&
          !/mouse(out|leave)/i.test(e.hide.event) &&
          i.push("mouseleave"),
          this._bind(f, "mousemove", function (a) {
            this._storeMouse(a), (this.cache.onTarget = E);
          }),
          this._bindEvents(h, i, f, g, b, function () {
            clearTimeout(this.timers.show);
          }),
          (e.show.ready || e.prerender) && b.call(this, a);
      }),
      (A._assignEvents = function () {
        var c = this,
          e = this.options,
          f = e.position,
          g = this.tooltip,
          h = e.show.target,
          i = e.hide.target,
          j = f.container,
          k = f.viewport,
          l = d(b),
          m = (d(b.body), d(a)),
          r = e.show.event ? d.trim("" + e.show.event).split(" ") : [],
          s = e.hide.event ? d.trim("" + e.hide.event).split(" ") : [];
        d.each(e.events, function (a, b) {
          c._bind(
            g,
            "toggle" === a ? ["tooltipshow", "tooltiphide"] : ["tooltip" + a],
            b,
            null,
            g
          );
        }),
          /mouse(out|leave)/i.test(e.hide.event) &&
            "window" === e.hide.leave &&
            this._bind(l, ["mouseout", "blur"], function (a) {
              /select|option/.test(a.target.nodeName) ||
                a.relatedTarget ||
                this.hide(a);
            }),
          e.hide.fixed
            ? (i = i.add(g.addClass(Z)))
            : /mouse(over|enter)/i.test(e.show.event) &&
              this._bind(i, "mouseleave", function () {
                clearTimeout(this.timers.show);
              }),
          ("" + e.hide.event).indexOf("unfocus") > -1 &&
            this._bind(
              j.closest("html"),
              ["mousedown", "touchstart"],
              function (a) {
                var b = d(a.target),
                  c =
                    this.rendered &&
                    !this.tooltip.hasClass(bb) &&
                    this.tooltip[0].offsetWidth > 0,
                  e = b.parents(X).filter(this.tooltip[0]).length > 0;
                b[0] === this.target[0] ||
                  b[0] === this.tooltip[0] ||
                  e ||
                  this.target.has(b[0]).length ||
                  !c ||
                  this.hide(a);
              }
            ),
          "number" == typeof e.hide.inactive &&
            (this._bind(h, "qtip-" + this.id + "-inactive", p),
            this._bind(i.add(g), z.inactiveEvents, p, "-inactive")),
          this._bindEvents(r, s, h, i, n, o),
          this._bind(h.add(g), "mousemove", function (a) {
            if ("number" == typeof e.hide.distance) {
              var b = this.cache.origin || {},
                c = this.options.hide.distance,
                d = Math.abs;
              (d(a.pageX - b.pageX) >= c || d(a.pageY - b.pageY) >= c) &&
                this.hide(a);
            }
            this._storeMouse(a);
          }),
          "mouse" === f.target &&
            f.adjust.mouse &&
            (e.hide.event &&
              this._bind(h, ["mouseenter", "mouseleave"], function (a) {
                this.cache.onTarget = "mouseenter" === a.type;
              }),
            this._bind(l, "mousemove", function (a) {
              this.rendered &&
                this.cache.onTarget &&
                !this.tooltip.hasClass(bb) &&
                this.tooltip[0].offsetWidth > 0 &&
                this.reposition(a);
            })),
          (f.adjust.resize || k.length) &&
            this._bind(d.event.special.resize ? k : m, "resize", q),
          f.adjust.scroll && this._bind(m.add(f.container), "scroll", q);
      }),
      (A._unassignEvents = function () {
        var c = [
          this.options.show.target[0],
          this.options.hide.target[0],
          this.rendered && this.tooltip[0],
          this.options.position.container[0],
          this.options.position.viewport[0],
          this.options.position.container.closest("html")[0],
          a,
          b,
        ];
        this._unbind(
          d([]).pushStack(
            d.grep(c, function (a) {
              return "object" == typeof a;
            })
          )
        );
      }),
      (z = d.fn.qtip =
        function (a, b, e) {
          var f = ("" + a).toLowerCase(),
            g = G,
            i = d.makeArray(arguments).slice(1),
            j = i[i.length - 1],
            k = this[0] ? d.data(this[0], T) : G;
          return (!arguments.length && k) || "api" === f
            ? k
            : "string" == typeof a
            ? (this.each(function () {
                var a = d.data(this, T);
                if (!a) return E;
                if (
                  (j && j.timeStamp && (a.cache.event = j),
                  !b || ("option" !== f && "options" !== f))
                )
                  a[f] && a[f].apply(a, i);
                else {
                  if (e === c && !d.isPlainObject(b)) return (g = a.get(b)), F;
                  a.set(b, e);
                }
              }),
              g !== G ? g : this)
            : "object" != typeof a && arguments.length
            ? void 0
            : ((k = h(d.extend(E, {}, a))),
              this.each(function (a) {
                var b, c;
                return (
                  (c = d.isArray(k.id) ? k.id[a] : k.id),
                  (c =
                    !c || c === F || c.length < 1 || z.api[c] ? z.nextid++ : c),
                  (b = s(d(this), c, k)),
                  b === F
                    ? E
                    : ((z.api[c] = b),
                      d.each(S, function () {
                        "initialize" === this.initialize && this(b);
                      }),
                      b._assignInitialEvents(j),
                      void 0)
                );
              }));
        }),
      (d.qtip = e),
      (z.api = {}),
      d.each(
        {
          attr: function (a, b) {
            if (this.length) {
              var c = this[0],
                e = "title",
                f = d.data(c, "qtip");
              if (a === e && f && "object" == typeof f && f.options.suppress)
                return arguments.length < 2
                  ? d.attr(c, db)
                  : (f &&
                      f.options.content.attr === e &&
                      f.cache.attr &&
                      f.set("content.text", b),
                    this.attr(db, b));
            }
            return d.fn["attr" + cb].apply(this, arguments);
          },
          clone: function (a) {
            var b = (d([]), d.fn["clone" + cb].apply(this, arguments));
            return (
              a ||
                b
                  .filter("[" + db + "]")
                  .attr("title", function () {
                    return d.attr(this, db);
                  })
                  .removeAttr(db),
              b
            );
          },
        },
        function (a, b) {
          if (!b || d.fn[a + cb]) return E;
          var c = (d.fn[a + cb] = d.fn[a]);
          d.fn[a] = function () {
            return b.apply(this, arguments) || c.apply(this, arguments);
          };
        }
      ),
      d.ui ||
        ((d["cleanData" + cb] = d.cleanData),
        (d.cleanData = function (a) {
          for (var b, c = 0; (b = d(a[c])).length; c++)
            if (b.attr(U))
              try {
                b.triggerHandler("removeqtip");
              } catch (e) {}
          d["cleanData" + cb].apply(this, arguments);
        })),
      (z.version = "2.2.0"),
      (z.nextid = 0),
      (z.inactiveEvents = Y),
      (z.zindex = 15e3),
      (z.defaults = {
        prerender: F,
        id: F,
        overwrite: E,
        suppress: E,
        content: { text: E, attr: "title", title: F, button: F },
        position: {
          my: "top left",
          at: "bottom right",
          target: F,
          container: F,
          viewport: F,
          adjust: {
            x: 0,
            y: 0,
            mouse: E,
            scroll: E,
            resize: E,
            method: "flipinvert flipinvert",
          },
          effect: function (a, b) {
            d(this).animate(b, { duration: 200, queue: F });
          },
        },
        show: {
          target: F,
          event: "mouseenter",
          effect: E,
          delay: 90,
          solo: F,
          ready: F,
          autofocus: F,
        },
        hide: {
          target: F,
          event: "mouseleave",
          effect: E,
          delay: 0,
          fixed: F,
          inactive: F,
          leave: "window",
          distance: F,
        },
        style: { classes: "", widget: F, width: F, height: F, def: E },
        events: {
          render: G,
          move: G,
          show: G,
          hide: G,
          toggle: G,
          visible: G,
          hidden: G,
          focus: G,
          blur: G,
        },
      });
    var jb,
      kb = "margin",
      lb = "border",
      mb = "color",
      nb = "background-color",
      ob = "transparent",
      pb = " !important",
      qb = !!b.createElement("canvas").getContext,
      rb = /rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i,
      sb = {},
      tb = ["Webkit", "O", "Moz", "ms"];
    if (qb)
      var ub = a.devicePixelRatio || 1,
        vb = (function () {
          var a = b.createElement("canvas").getContext("2d");
          return (
            a.backingStorePixelRatio ||
            a.webkitBackingStorePixelRatio ||
            a.mozBackingStorePixelRatio ||
            a.msBackingStorePixelRatio ||
            a.oBackingStorePixelRatio ||
            1
          );
        })(),
        wb = ub / vb;
    else
      var xb = function (a, b, c) {
        return (
          "<qtipvml:" +
          a +
          ' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" ' +
          (b || "") +
          ' style="behavior: url(#default#VML); ' +
          (c || "") +
          '" />'
        );
      };
    d.extend(w.prototype, {
      init: function (a) {
        var b, c;
        (c =
          this.element =
          a.elements.tip =
            d("<div />", { class: T + "-tip" }).prependTo(a.tooltip)),
          qb
            ? ((b = d("<canvas />").appendTo(this.element)[0].getContext("2d")),
              (b.lineJoin = "miter"),
              (b.miterLimit = 1e5),
              b.save())
            : ((b = xb("shape", 'coordorigin="0,0"', "position:absolute;")),
              this.element.html(b + b),
              a._bind(
                d("*", c).add(c),
                ["click", "mousedown"],
                function (a) {
                  a.stopPropagation();
                },
                this._ns
              )),
          a._bind(a.tooltip, "tooltipmove", this.reposition, this._ns, this),
          this.create();
      },
      _swapDimensions: function () {
        (this.size[0] = this.options.height),
          (this.size[1] = this.options.width);
      },
      _resetDimensions: function () {
        (this.size[0] = this.options.width),
          (this.size[1] = this.options.height);
      },
      _useTitle: function (a) {
        var b = this.qtip.elements.titlebar;
        return (
          b &&
          (a.y === L ||
            (a.y === P &&
              this.element.position().top +
                this.size[1] / 2 +
                this.options.offset <
                b.outerHeight(E)))
        );
      },
      _parseCorner: function (a) {
        var b = this.qtip.options.position.my;
        return (
          a === F || b === F
            ? (a = F)
            : a === E
            ? (a = new B(b.string()))
            : a.string || ((a = new B(a)), (a.fixed = E)),
          a
        );
      },
      _parseWidth: function (a, b, c) {
        var d = this.qtip.elements,
          e = lb + t(b) + "Width";
        return (
          (c
            ? v(c, e)
            : v(d.content, e) ||
              v((this._useTitle(a) && d.titlebar) || d.content, e) ||
              v(d.tooltip, e)) || 0
        );
      },
      _parseRadius: function (a) {
        var b = this.qtip.elements,
          c = lb + t(a.y) + t(a.x) + "Radius";
        return eb.ie < 9
          ? 0
          : v((this._useTitle(a) && b.titlebar) || b.content, c) ||
              v(b.tooltip, c) ||
              0;
      },
      _invalidColour: function (a, b, c) {
        var d = a.css(b);
        return !d || (c && d === a.css(c)) || rb.test(d) ? F : d;
      },
      _parseColours: function (a) {
        var b = this.qtip.elements,
          c = this.element.css("cssText", ""),
          e = lb + t(a[a.precedance]) + t(mb),
          f = (this._useTitle(a) && b.titlebar) || b.content,
          g = this._invalidColour,
          h = [];
        return (
          (h[0] =
            g(c, nb) ||
            g(f, nb) ||
            g(b.content, nb) ||
            g(b.tooltip, nb) ||
            c.css(nb)),
          (h[1] =
            g(c, e, mb) ||
            g(f, e, mb) ||
            g(b.content, e, mb) ||
            g(b.tooltip, e, mb) ||
            b.tooltip.css(e)),
          d("*", c)
            .add(c)
            .css("cssText", nb + ":" + ob + pb + ";" + lb + ":0" + pb + ";"),
          h
        );
      },
      _calculateSize: function (a) {
        var b,
          c,
          d,
          e = a.precedance === I,
          f = this.options.width,
          g = this.options.height,
          h = "c" === a.abbrev(),
          i = (e ? f : g) * (h ? 0.5 : 1),
          j = Math.pow,
          k = Math.round,
          l = Math.sqrt(j(i, 2) + j(g, 2)),
          m = [(this.border / i) * l, (this.border / g) * l];
        return (
          (m[2] = Math.sqrt(j(m[0], 2) - j(this.border, 2))),
          (m[3] = Math.sqrt(j(m[1], 2) - j(this.border, 2))),
          (b = l + m[2] + m[3] + (h ? 0 : m[0])),
          (c = b / l),
          (d = [k(c * f), k(c * g)]),
          e ? d : d.reverse()
        );
      },
      _calculateTip: function (a, b, c) {
        (c = c || 1), (b = b || this.size);
        var d = b[0] * c,
          e = b[1] * c,
          f = Math.ceil(d / 2),
          g = Math.ceil(e / 2),
          h = {
            br: [0, 0, d, e, d, 0],
            bl: [0, 0, d, 0, 0, e],
            tr: [0, e, d, 0, d, e],
            tl: [0, 0, 0, e, d, e],
            tc: [0, e, f, 0, d, e],
            bc: [0, 0, d, 0, f, e],
            rc: [0, 0, d, g, 0, e],
            lc: [d, 0, d, e, 0, g],
          };
        return (
          (h.lt = h.br),
          (h.rt = h.bl),
          (h.lb = h.tr),
          (h.rb = h.tl),
          h[a.abbrev()]
        );
      },
      _drawCoords: function (a, b) {
        a.beginPath(),
          a.moveTo(b[0], b[1]),
          a.lineTo(b[2], b[3]),
          a.lineTo(b[4], b[5]),
          a.closePath();
      },
      create: function () {
        var a = (this.corner =
          (qb || eb.ie) && this._parseCorner(this.options.corner));
        return (
          (this.enabled = !!this.corner && "c" !== this.corner.abbrev()) &&
            ((this.qtip.cache.corner = a.clone()), this.update()),
          this.element.toggle(this.enabled),
          this.corner
        );
      },
      update: function (b, c) {
        if (!this.enabled) return this;
        var e,
          f,
          g,
          h,
          i,
          j,
          k,
          l,
          m = this.qtip.elements,
          n = this.element,
          o = n.children(),
          p = this.options,
          q = this.size,
          r = p.mimic,
          s = Math.round;
        b || (b = this.qtip.cache.corner || this.corner),
          r === F
            ? (r = b)
            : ((r = new B(r)),
              (r.precedance = b.precedance),
              "inherit" === r.x
                ? (r.x = b.x)
                : "inherit" === r.y
                ? (r.y = b.y)
                : r.x === r.y && (r[b.precedance] = b[b.precedance])),
          (f = r.precedance),
          b.precedance === H ? this._swapDimensions() : this._resetDimensions(),
          (e = this.color = this._parseColours(b)),
          e[1] !== ob
            ? ((l = this.border = this._parseWidth(b, b[b.precedance])),
              p.border && 1 > l && !rb.test(e[1]) && (e[0] = e[1]),
              (this.border = l = p.border !== E ? p.border : l))
            : (this.border = l = 0),
          (k = this.size = this._calculateSize(b)),
          n.css({ width: k[0], height: k[1], lineHeight: k[1] + "px" }),
          (j =
            b.precedance === I
              ? [
                  s(
                    r.x === M
                      ? l
                      : r.x === O
                      ? k[0] - q[0] - l
                      : (k[0] - q[0]) / 2
                  ),
                  s(r.y === L ? k[1] - q[1] : 0),
                ]
              : [
                  s(r.x === M ? k[0] - q[0] : 0),
                  s(
                    r.y === L
                      ? l
                      : r.y === N
                      ? k[1] - q[1] - l
                      : (k[1] - q[1]) / 2
                  ),
                ]),
          qb
            ? ((g = o[0].getContext("2d")),
              g.restore(),
              g.save(),
              g.clearRect(0, 0, 6e3, 6e3),
              (h = this._calculateTip(r, q, wb)),
              (i = this._calculateTip(r, this.size, wb)),
              o.attr(J, k[0] * wb).attr(K, k[1] * wb),
              o.css(J, k[0]).css(K, k[1]),
              this._drawCoords(g, i),
              (g.fillStyle = e[1]),
              g.fill(),
              g.translate(j[0] * wb, j[1] * wb),
              this._drawCoords(g, h),
              (g.fillStyle = e[0]),
              g.fill())
            : ((h = this._calculateTip(r)),
              (h =
                "m" +
                h[0] +
                "," +
                h[1] +
                " l" +
                h[2] +
                "," +
                h[3] +
                " " +
                h[4] +
                "," +
                h[5] +
                " xe"),
              (j[2] =
                l && /^(r|b)/i.test(b.string()) ? (8 === eb.ie ? 2 : 1) : 0),
              o
                .css({
                  coordsize: k[0] + l + " " + (k[1] + l),
                  antialias: "" + (r.string().indexOf(P) > -1),
                  left: j[0] - j[2] * Number(f === H),
                  top: j[1] - j[2] * Number(f === I),
                  width: k[0] + l,
                  height: k[1] + l,
                })
                .each(function (a) {
                  var b = d(this);
                  b[b.prop ? "prop" : "attr"]({
                    coordsize: k[0] + l + " " + (k[1] + l),
                    path: h,
                    fillcolor: e[0],
                    filled: !!a,
                    stroked: !a,
                  }).toggle(!(!l && !a)),
                    !a &&
                      b.html(
                        xb(
                          "stroke",
                          'weight="' +
                            2 * l +
                            'px" color="' +
                            e[1] +
                            '" miterlimit="1000" joinstyle="miter"'
                        )
                      );
                })),
          a.opera &&
            setTimeout(function () {
              m.tip.css({ display: "inline-block", visibility: "visible" });
            }, 1),
          c !== F && this.calculate(b, k);
      },
      calculate: function (a, b) {
        if (!this.enabled) return F;
        var c,
          e,
          f = this,
          g = this.qtip.elements,
          h = this.element,
          i = this.options.offset,
          j = (g.tooltip.hasClass("ui-widget"), {});
        return (
          (a = a || this.corner),
          (c = a.precedance),
          (b = b || this._calculateSize(a)),
          (e = [a.x, a.y]),
          c === H && e.reverse(),
          d.each(e, function (d, e) {
            var h, k, l;
            e === P
              ? ((h = c === I ? M : L),
                (j[h] = "50%"),
                (j[kb + "-" + h] = -Math.round(b[c === I ? 0 : 1] / 2) + i))
              : ((h = f._parseWidth(a, e, g.tooltip)),
                (k = f._parseWidth(a, e, g.content)),
                (l = f._parseRadius(a)),
                (j[e] = Math.max(-f.border, d ? k : i + (l > h ? l : -h))));
          }),
          (j[a[c]] -= b[c === H ? 0 : 1]),
          h
            .css({ margin: "", top: "", bottom: "", left: "", right: "" })
            .css(j),
          j
        );
      },
      reposition: function (a, b, d) {
        function e(a, b, c, d, e) {
          a === R && j.precedance === b && k[d] && j[c] !== P
            ? (j.precedance = j.precedance === H ? I : H)
            : a !== R &&
              k[d] &&
              (j[b] = j[b] === P ? (k[d] > 0 ? d : e) : j[b] === d ? e : d);
        }
        function f(a, b, e) {
          j[a] === P
            ? (p[kb + "-" + b] = o[a] = g[kb + "-" + b] - k[b])
            : ((h = g[e] !== c ? [k[b], -g[b]] : [-k[b], g[b]]),
              (o[a] = Math.max(h[0], h[1])) > h[0] &&
                ((d[b] -= k[b]), (o[b] = F)),
              (p[g[e] !== c ? e : b] = o[a]));
        }
        if (this.enabled) {
          var g,
            h,
            i = b.cache,
            j = this.corner.clone(),
            k = d.adjusted,
            l = b.options.position.adjust.method.split(" "),
            m = l[0],
            n = l[1] || l[0],
            o = { left: F, top: F, x: 0, y: 0 },
            p = {};
          this.corner.fixed !== E &&
            (e(m, H, I, M, O),
            e(n, I, H, L, N),
            j.string() === i.corner.string() ||
              (i.cornerTop === k.top && i.cornerLeft === k.left) ||
              this.update(j, F)),
            (g = this.calculate(j)),
            g.right !== c && (g.left = -g.right),
            g.bottom !== c && (g.top = -g.bottom),
            (g.user = this.offset),
            (o.left = m === R && !!k.left) && f(H, M, O),
            (o.top = n === R && !!k.top) && f(I, L, N),
            this.element
              .css(p)
              .toggle(
                !((o.x && o.y) || (j.x === P && o.y) || (j.y === P && o.x))
              ),
            (d.left -= g.left.charAt
              ? g.user
              : m !== R || o.top || (!o.left && !o.top)
              ? g.left + this.border
              : 0),
            (d.top -= g.top.charAt
              ? g.user
              : n !== R || o.left || (!o.left && !o.top)
              ? g.top + this.border
              : 0),
            (i.cornerLeft = k.left),
            (i.cornerTop = k.top),
            (i.corner = j.clone());
        }
      },
      destroy: function () {
        this.qtip._unbind(this.qtip.tooltip, this._ns),
          this.qtip.elements.tip &&
            this.qtip.elements.tip.find("*").remove().end().remove();
      },
    }),
      (jb = S.tip =
        function (a) {
          return new w(a, a.options.style.tip);
        }),
      (jb.initialize = "render"),
      (jb.sanitize = function (a) {
        if (a.style && "tip" in a.style) {
          var b = a.style.tip;
          "object" != typeof b && (b = a.style.tip = { corner: b }),
            /string|boolean/i.test(typeof b.corner) || (b.corner = E);
        }
      }),
      (C.tip = {
        "^position.my|style.tip.(corner|mimic|border)$": function () {
          this.create(), this.qtip.reposition();
        },
        "^style.tip.(height|width)$": function (a) {
          (this.size = [a.width, a.height]),
            this.update(),
            this.qtip.reposition();
        },
        "^content.title|style.(classes|widget)$": function () {
          this.update();
        },
      }),
      d.extend(E, z.defaults, {
        style: {
          tip: {
            corner: E,
            mimic: F,
            width: 6,
            height: 6,
            border: E,
            offset: 0,
          },
        },
      });
    var yb,
      zb,
      Ab = "qtip-modal",
      Bb = "." + Ab;
    (zb = function () {
      function a(a) {
        if (d.expr[":"].focusable) return d.expr[":"].focusable;
        var b,
          c,
          e,
          f = !isNaN(d.attr(a, "tabindex")),
          g = a.nodeName && a.nodeName.toLowerCase();
        return "area" === g
          ? ((b = a.parentNode),
            (c = b.name),
            a.href && c && "map" === b.nodeName.toLowerCase()
              ? ((e = d("img[usemap=#" + c + "]")[0]), !!e && e.is(":visible"))
              : !1)
          : /input|select|textarea|button|object/.test(g)
          ? !a.disabled
          : "a" === g
          ? a.href || f
          : f;
      }
      function c(a) {
        k.length < 1 && a.length ? a.not("body").blur() : k.first().focus();
      }
      function e(a) {
        if (i.is(":visible")) {
          var b,
            e = d(a.target),
            h = f.tooltip,
            j = e.closest(X);
          (b =
            j.length < 1
              ? F
              : parseInt(j[0].style.zIndex, 10) >
                parseInt(h[0].style.zIndex, 10)),
            b || e.closest(X)[0] === h[0] || c(e),
            (g = a.target === k[k.length - 1]);
        }
      }
      var f,
        g,
        h,
        i,
        j = this,
        k = {};
      d.extend(j, {
        init: function () {
          return (
            (i = j.elem =
              d("<div />", {
                id: "qtip-overlay",
                html: "<div></div>",
                mousedown: function () {
                  return F;
                },
              }).hide()),
            d(b.body).bind("focusin" + Bb, e),
            d(b).bind("keydown" + Bb, function (a) {
              f && f.options.show.modal.escape && 27 === a.keyCode && f.hide(a);
            }),
            i.bind("click" + Bb, function (a) {
              f && f.options.show.modal.blur && f.hide(a);
            }),
            j
          );
        },
        update: function (b) {
          (f = b),
            (k =
              b.options.show.modal.stealfocus !== F
                ? b.tooltip.find("*").filter(function () {
                    return a(this);
                  })
                : []);
        },
        toggle: function (a, e, g) {
          var k = (d(b.body), a.tooltip),
            l = a.options.show.modal,
            m = l.effect,
            n = e ? "show" : "hide",
            o = i.is(":visible"),
            p = d(Bb).filter(":visible:not(:animated)").not(k);
          return (
            j.update(a),
            e && l.stealfocus !== F && c(d(":focus")),
            i.toggleClass("blurs", l.blur),
            e && i.appendTo(b.body),
            (i.is(":animated") && o === e && h !== F) || (!e && p.length)
              ? j
              : (i.stop(E, F),
                d.isFunction(m)
                  ? m.call(i, e)
                  : m === F
                  ? i[n]()
                  : i.fadeTo(parseInt(g, 10) || 90, e ? 1 : 0, function () {
                      e || i.hide();
                    }),
                e ||
                  i.queue(function (a) {
                    i.css({ left: "", top: "" }),
                      d(Bb).length || i.detach(),
                      a();
                  }),
                (h = e),
                f.destroyed && (f = G),
                j)
          );
        },
      }),
        j.init();
    }),
      (zb = new zb()),
      d.extend(x.prototype, {
        init: function (a) {
          var b = a.tooltip;
          return this.options.on
            ? ((a.elements.overlay = zb.elem),
              b.addClass(Ab).css("z-index", z.modal_zindex + d(Bb).length),
              a._bind(
                b,
                ["tooltipshow", "tooltiphide"],
                function (a, c, e) {
                  var f = a.originalEvent;
                  if (a.target === b[0])
                    if (
                      f &&
                      "tooltiphide" === a.type &&
                      /mouse(leave|enter)/.test(f.type) &&
                      d(f.relatedTarget).closest(zb.elem[0]).length
                    )
                      try {
                        a.preventDefault();
                      } catch (g) {}
                    else
                      (!f || (f && "tooltipsolo" !== f.type)) &&
                        this.toggle(a, "tooltipshow" === a.type, e);
                },
                this._ns,
                this
              ),
              a._bind(
                b,
                "tooltipfocus",
                function (a, c) {
                  if (!a.isDefaultPrevented() && a.target === b[0]) {
                    var e = d(Bb),
                      f = z.modal_zindex + e.length,
                      g = parseInt(b[0].style.zIndex, 10);
                    (zb.elem[0].style.zIndex = f - 1),
                      e.each(function () {
                        this.style.zIndex > g && (this.style.zIndex -= 1);
                      }),
                      e.filter("." + _).qtip("blur", a.originalEvent),
                      (b.addClass(_)[0].style.zIndex = f),
                      zb.update(c);
                    try {
                      a.preventDefault();
                    } catch (h) {}
                  }
                },
                this._ns,
                this
              ),
              a._bind(
                b,
                "tooltiphide",
                function (a) {
                  a.target === b[0] &&
                    d(Bb).filter(":visible").not(b).last().qtip("focus", a);
                },
                this._ns,
                this
              ),
              void 0)
            : this;
        },
        toggle: function (a, b, c) {
          return a && a.isDefaultPrevented()
            ? this
            : (zb.toggle(this.qtip, !!b, c), void 0);
        },
        destroy: function () {
          this.qtip.tooltip.removeClass(Ab),
            this.qtip._unbind(this.qtip.tooltip, this._ns),
            zb.toggle(this.qtip, F),
            delete this.qtip.elements.overlay;
        },
      }),
      (yb = S.modal =
        function (a) {
          return new x(a, a.options.show.modal);
        }),
      (yb.sanitize = function (a) {
        a.show &&
          ("object" != typeof a.show.modal
            ? (a.show.modal = { on: !!a.show.modal })
            : "undefined" == typeof a.show.modal.on && (a.show.modal.on = E));
      }),
      (z.modal_zindex = z.zindex - 200),
      (yb.initialize = "render"),
      (C.modal = {
        "^show.modal.(on|blur)$": function () {
          this.destroy(),
            this.init(),
            this.qtip.elems.overlay.toggle(
              this.qtip.tooltip[0].offsetWidth > 0
            );
        },
      }),
      d.extend(E, z.defaults, {
        show: {
          modal: { on: F, effect: E, blur: E, stealfocus: E, escape: E },
        },
      }),
      (S.viewport = function (c, d, e, f, g, h, i) {
        function j(a, b, c, e, f, g, h, i, j) {
          var k = d[f],
            m = v[a],
            t = w[a],
            u = c === R,
            x = m === f ? j : m === g ? -j : -j / 2,
            y = t === f ? i : t === g ? -i : -i / 2,
            z = r[f] + s[f] - (o ? 0 : n[f]),
            A = z - k,
            B = k + j - (h === J ? p : q) - z,
            C =
              x -
              (v.precedance === a || m === v[b] ? y : 0) -
              (t === P ? i / 2 : 0);
          return (
            u
              ? ((C = (m === f ? 1 : -1) * x),
                (d[f] += A > 0 ? A : B > 0 ? -B : 0),
                (d[f] = Math.max(
                  -n[f] + s[f],
                  k - C,
                  Math.min(
                    Math.max(-n[f] + s[f] + (h === J ? p : q), k + C),
                    d[f],
                    "center" === m ? k - x : 1e9
                  )
                )))
              : ((e *= c === Q ? 2 : 0),
                A > 0 && (m !== f || B > 0)
                  ? ((d[f] -= C + e), l.invert(a, f))
                  : B > 0 &&
                    (m !== g || A > 0) &&
                    ((d[f] -= (m === P ? -C : C) + e), l.invert(a, g)),
                d[f] < r && -d[f] > B && ((d[f] = k), (l = v.clone()))),
            d[f] - k
          );
        }
        var k,
          l,
          m,
          n,
          o,
          p,
          q,
          r,
          s,
          t = e.target,
          u = c.elements.tooltip,
          v = e.my,
          w = e.at,
          x = e.adjust,
          y = x.method.split(" "),
          z = y[0],
          A = y[1] || y[0],
          B = e.viewport,
          C = e.container,
          D = c.cache,
          E = { left: 0, top: 0 };
        return B.jquery && t[0] !== a && t[0] !== b.body && "none" !== x.method
          ? ((n = C.offset() || E),
            (o = "static" === C.css("position")),
            (k = "fixed" === u.css("position")),
            (p = B[0] === a ? B.width() : B.outerWidth(F)),
            (q = B[0] === a ? B.height() : B.outerHeight(F)),
            (r = { left: k ? 0 : B.scrollLeft(), top: k ? 0 : B.scrollTop() }),
            (s = B.offset() || E),
            ("shift" !== z || "shift" !== A) && (l = v.clone()),
            (E = {
              left: "none" !== z ? j(H, I, z, x.x, M, O, J, f, h) : 0,
              top: "none" !== A ? j(I, H, A, x.y, L, N, K, g, i) : 0,
            }),
            l &&
              D.lastClass !== (m = T + "-pos-" + l.abbrev()) &&
              u
                .removeClass(c.cache.lastClass)
                .addClass((c.cache.lastClass = m)),
            E)
          : E;
      }),
      (S.polys = {
        polygon: function (a, b) {
          var c,
            d,
            e,
            f = {
              width: 0,
              height: 0,
              position: { top: 1e10, right: 0, bottom: 0, left: 1e10 },
              adjustable: F,
            },
            g = 0,
            h = [],
            i = 1,
            j = 1,
            k = 0,
            l = 0;
          for (g = a.length; g--; )
            (c = [parseInt(a[--g], 10), parseInt(a[g + 1], 10)]),
              c[0] > f.position.right && (f.position.right = c[0]),
              c[0] < f.position.left && (f.position.left = c[0]),
              c[1] > f.position.bottom && (f.position.bottom = c[1]),
              c[1] < f.position.top && (f.position.top = c[1]),
              h.push(c);
          if (
            ((d = f.width = Math.abs(f.position.right - f.position.left)),
            (e = f.height = Math.abs(f.position.bottom - f.position.top)),
            "c" === b.abbrev())
          )
            f.position = {
              left: f.position.left + f.width / 2,
              top: f.position.top + f.height / 2,
            };
          else {
            for (; d > 0 && e > 0 && i > 0 && j > 0; )
              for (
                d = Math.floor(d / 2),
                  e = Math.floor(e / 2),
                  b.x === M
                    ? (i = d)
                    : b.x === O
                    ? (i = f.width - d)
                    : (i += Math.floor(d / 2)),
                  b.y === L
                    ? (j = e)
                    : b.y === N
                    ? (j = f.height - e)
                    : (j += Math.floor(e / 2)),
                  g = h.length;
                g-- && !(h.length < 2);

              )
                (k = h[g][0] - f.position.left),
                  (l = h[g][1] - f.position.top),
                  ((b.x === M && k >= i) ||
                    (b.x === O && i >= k) ||
                    (b.x === P && (i > k || k > f.width - i)) ||
                    (b.y === L && l >= j) ||
                    (b.y === N && j >= l) ||
                    (b.y === P && (j > l || l > f.height - j))) &&
                    h.splice(g, 1);
            f.position = { left: h[0][0], top: h[0][1] };
          }
          return f;
        },
        rect: function (a, b, c, d) {
          return {
            width: Math.abs(c - a),
            height: Math.abs(d - b),
            position: { left: Math.min(a, c), top: Math.min(b, d) },
          };
        },
        _angles: {
          tc: 1.5,
          tr: 7 / 4,
          tl: 5 / 4,
          bc: 0.5,
          br: 0.25,
          bl: 0.75,
          rc: 2,
          lc: 1,
          c: 0,
        },
        ellipse: function (a, b, c, d, e) {
          var f = S.polys._angles[e.abbrev()],
            g = 0 === f ? 0 : c * Math.cos(f * Math.PI),
            h = d * Math.sin(f * Math.PI);
          return {
            width: 2 * c - Math.abs(g),
            height: 2 * d - Math.abs(h),
            position: { left: a + g, top: b + h },
            adjustable: F,
          };
        },
        circle: function (a, b, c, d) {
          return S.polys.ellipse(a, b, c, c, d);
        },
      }),
      (S.svg = function (a, c, e) {
        for (
          var f,
            g,
            h,
            i,
            j,
            k,
            l,
            m,
            n,
            o,
            p,
            q = d(b),
            r = c[0],
            s = d(r.ownerSVGElement),
            t = 1,
            u = 1,
            v = !0;
          !r.getBBox;

        )
          r = r.parentNode;
        if (!r.getBBox || !r.parentNode) return F;
        (f = s.attr("width") || s.width() || parseInt(s.css("width"), 10)),
          (g = s.attr("height") || s.height() || parseInt(s.css("height"), 10));
        var w = (parseInt(c.css("stroke-width"), 10) || 0) / 2;
        switch ((w && ((t += w / f), (u += w / g)), r.nodeName)) {
          case "ellipse":
          case "circle":
            o = S.polys.ellipse(
              r.cx.baseVal.value,
              r.cy.baseVal.value,
              (r.rx || r.r).baseVal.value + w,
              (r.ry || r.r).baseVal.value + w,
              e
            );
            break;
          case "line":
          case "polygon":
          case "polyline":
            for (
              n = r.points || [
                { x: r.x1.baseVal.value, y: r.y1.baseVal.value },
                { x: r.x2.baseVal.value, y: r.y2.baseVal.value },
              ],
                o = [],
                m = -1,
                k = n.numberOfItems || n.length;
              ++m < k;

            )
              (l = n.getItem ? n.getItem(m) : n[m]),
                o.push.apply(o, [l.x, l.y]);
            o = S.polys.polygon(o, e);
            break;
          default:
            (o = r.getBoundingClientRect()),
              (o = {
                width: o.width,
                height: o.height,
                position: { left: o.left, top: o.top },
              }),
              (v = !1);
        }
        return (
          (p = o.position),
          (s = s[0]),
          v &&
            (s.createSVGPoint &&
              ((h = r.getScreenCTM()),
              (n = s.createSVGPoint()),
              (n.x = p.left),
              (n.y = p.top),
              (i = n.matrixTransform(h)),
              (p.left = i.x),
              (p.top = i.y)),
            s.viewBox &&
              (j = s.viewBox.baseVal) &&
              j.width &&
              j.height &&
              ((t *= f / j.width), (u *= g / j.height))),
          (p.left += q.scrollLeft()),
          (p.top += q.scrollTop()),
          o
        );
      }),
      (S.imagemap = function (a, b, c) {
        b.jquery || (b = d(b));
        var e,
          f,
          g,
          h,
          i,
          j = b.attr("shape").toLowerCase().replace("poly", "polygon"),
          k = d('img[usemap="#' + b.parent("map").attr("name") + '"]'),
          l = d.trim(b.attr("coords")),
          m = l.replace(/,$/, "").split(",");
        if (!k.length) return F;
        if ("polygon" === j) h = S.polys.polygon(m, c);
        else {
          if (!S.polys[j]) return F;
          for (g = -1, i = m.length, f = []; ++g < i; )
            f.push(parseInt(m[g], 10));
          h = S.polys[j].apply(this, f.concat(c));
        }
        return (
          (e = k.offset()),
          (e.left += Math.ceil((k.outerWidth(F) - k.width()) / 2)),
          (e.top += Math.ceil((k.outerHeight(F) - k.height()) / 2)),
          (h.position.left += e.left),
          (h.position.top += e.top),
          h
        );
      });
    var Cb,
      Db =
        '<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>';
    d.extend(y.prototype, {
      _scroll: function () {
        var b = this.qtip.elements.overlay;
        b && (b[0].style.top = d(a).scrollTop() + "px");
      },
      init: function (c) {
        var e = c.tooltip;
        d("select, object").length < 1 &&
          ((this.bgiframe = c.elements.bgiframe = d(Db).appendTo(e)),
          c._bind(e, "tooltipmove", this.adjustBGIFrame, this._ns, this)),
          (this.redrawContainer = d("<div/>", {
            id: T + "-rcontainer",
          }).appendTo(b.body)),
          c.elements.overlay &&
            c.elements.overlay.addClass("qtipmodal-ie6fix") &&
            (c._bind(a, ["scroll", "resize"], this._scroll, this._ns, this),
            c._bind(e, ["tooltipshow"], this._scroll, this._ns, this)),
          this.redraw();
      },
      adjustBGIFrame: function () {
        var a,
          b,
          c = this.qtip.tooltip,
          d = { height: c.outerHeight(F), width: c.outerWidth(F) },
          e = this.qtip.plugins.tip,
          f = this.qtip.elements.tip;
        (b = parseInt(c.css("borderLeftWidth"), 10) || 0),
          (b = { left: -b, top: -b }),
          e &&
            f &&
            ((a = "x" === e.corner.precedance ? [J, M] : [K, L]),
            (b[a[1]] -= f[a[0]]())),
          this.bgiframe.css(b).css(d);
      },
      redraw: function () {
        if (this.qtip.rendered < 1 || this.drawing) return this;
        var a,
          b,
          c,
          d,
          e = this.qtip.tooltip,
          f = this.qtip.options.style,
          g = this.qtip.options.position.container;
        return (
          (this.qtip.drawing = 1),
          f.height && e.css(K, f.height),
          f.width
            ? e.css(J, f.width)
            : (e.css(J, "").appendTo(this.redrawContainer),
              (b = e.width()),
              1 > b % 2 && (b += 1),
              (c = e.css("maxWidth") || ""),
              (d = e.css("minWidth") || ""),
              (a = (c + d).indexOf("%") > -1 ? g.width() / 100 : 0),
              (c = (c.indexOf("%") > -1 ? a : 1) * parseInt(c, 10) || b),
              (d = (d.indexOf("%") > -1 ? a : 1) * parseInt(d, 10) || 0),
              (b = c + d ? Math.min(Math.max(b, d), c) : b),
              e.css(J, Math.round(b)).appendTo(g)),
          (this.drawing = 0),
          this
        );
      },
      destroy: function () {
        this.bgiframe && this.bgiframe.remove(),
          this.qtip._unbind([a, this.qtip.tooltip], this._ns);
      },
    }),
      (Cb = S.ie6 =
        function (a) {
          return 6 === eb.ie ? new y(a) : F;
        }),
      (Cb.initialize = "render"),
      (C.ie6 = {
        "^content|style$": function () {
          this.redraw();
        },
      });
  });
})(window, document);
//# sourceMappingURL=http://cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.0//var/www/qtip2/build/archive/2.2.0/jquery.qtip.min.map
