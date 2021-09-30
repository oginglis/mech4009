(function(e) {
    function t(t) {
        for (var a, c, s = t[0], i = t[1], l = t[2], h = 0, u = []; h < s.length; h++) c = s[h], Object.prototype.hasOwnProperty.call(o, c) && o[c] && u.push(o[c][0]), o[c] = 0;
        for (a in i) Object.prototype.hasOwnProperty.call(i, a) && (e[a] = i[a]);
        d && d(t);
        while (u.length) u.shift()();
        return r.push.apply(r, l || []), n()
    }

    function n() {
        for (var e, t = 0; t < r.length; t++) {
            for (var n = r[t], a = !0, s = 1; s < n.length; s++) {
                var i = n[s];
                0 !== o[i] && (a = !1)
            }
            a && (r.splice(t--, 1), e = c(c.s = n[0]))
        }
        return e
    }
    var a = {},
        o = {
            app: 0
        },
        r = [];

    function c(t) {
        if (a[t]) return a[t].exports;
        var n = a[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(n.exports, n, n.exports, c), n.l = !0, n.exports
    }
    c.m = e, c.c = a, c.d = function(e, t, n) {
        c.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }, c.r = function(e) {
        "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, c.t = function(e, t) {
        if (1 & t && (e = c(e)), 8 & t) return e;
        if (4 & t && "object" === typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (c.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var a in e) c.d(n, a, function(t) {
                return e[t]
            }.bind(null, a));
        return n
    }, c.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e["default"]
        } : function() {
            return e
        };
        return c.d(t, "a", t), t
    }, c.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, c.p = "/mech4009/";
    var s = window["webpackJsonp"] = window["webpackJsonp"] || [],
        i = s.push.bind(s);
    s.push = t, s = s.slice();
    for (var l = 0; l < s.length; l++) t(s[l]);
    var d = i;
    r.push([0, "chunk-vendors"]), n()
})({
    0: function(e, t, n) {
        e.exports = n("56d7")
    },
    "2e87": function(e, t, n) {},
    4384: function(e, t, n) {
        "use strict";
        n("2e87")
    },
    "55a7": function(e, t, n) {},
    "56d7": function(e, t, n) {
        "use strict";
        n.r(t);
        n("e260"), n("e6cf"), n("cca6"), n("a79d");
        var a = n("7a23"),
            o = {
                id: "app"
            };

        function r(e, t, n, r, c, s) {
            var i = Object(a["o"])("TitleSection");
            return Object(a["k"])(), Object(a["d"])("div", o, [Object(a["g"])(i)])
        }
        Object(a["m"])("data-v-7c90c5e0");
        var c = Object(a["e"])("h1", null, "Moment About a Point (Vector Calculations)", -1),
            s = Object(a["e"])("p", {
                class: "text-block"
            }, " Given any point on an extended body, if there is a force acting on that body that does not travel through that point, then that force will cause a moment about that point. A moment is a force's tendency to cause rotation. ", -1),
            i = {
                class: "text-block"
            },
            l = Object(a["f"])(" It is important to note here that all quantities ("),
            d = Object(a["f"])(", "),
            h = Object(a["f"])(" and "),
            u = Object(a["f"])(") are vectors. Before you can solve for the cross product, you will need to write out "),
            p = Object(a["f"])(" and "),
            b = Object(a["f"])(" in vector component form. Also, even for two dimensional problems, you will need to write out all three components of the "),
            m = Object(a["f"])(" and "),
            v = Object(a["f"])(" vectors. For two dimensional problems the z components of the "),
            f = Object(a["f"])(" and "),
            w = Object(a["f"])(" vectors will simply be zero, but those values are necessary for the calculations. The moment vector you get will line up with the axis of rotation for the moment, where you can use the right hand rule to determine if the moment is going clockwise or counterclockwise about that axis. "),
            g = {
                class: "text-block"
            },
            O = Object(a["f"])(" Finally, it is also important to note that cross product, unlike multiplication, is not communicative. This means that the order of the vectors matters, and "),
            j = Object(a["f"])(" cross "),
            $ = Object(a["f"])(" will not be the same as "),
            x = Object(a["f"])(" cross "),
            y = Object(a["f"])(". It is important to always use "),
            E = Object(a["f"])(" cross "),
            M = Object(a["f"])(" when calculating moments. ");

        function S(e, t, n, o, r, S) {
            var z = Object(a["o"])("math-jax"),
                F = Object(a["o"])("ThreeCanvas");
            return Object(a["k"])(), Object(a["d"])("div", null, [c, s, Object(a["g"])(z, {
                class: "biggerlate",
                latex: "$$\\vec{M} = \\vec{r} \\times \\vec{F}$$"
            }), Object(a["g"])(F), Object(a["e"])("p", i, [l, Object(a["g"])(z, {
                latex: "$$\\vec{r}$$"
            }), d, Object(a["g"])(z, {
                latex: "$$\\vec{F}$$"
            }), h, Object(a["g"])(z, {
                latex: "$$\\vec{M}$$"
            }), u, Object(a["g"])(z, {
                latex: "$$\\vec{r}$$"
            }), p, Object(a["g"])(z, {
                latex: "$$\\vec{F}$$"
            }), b, Object(a["g"])(z, {
                latex: "$$\\vec{r}$$"
            }), m, Object(a["g"])(z, {
                latex: "$$\\vec{F}$$"
            }), v, Object(a["g"])(z, {
                latex: "$$\\vec{r}$$"
            }), f, Object(a["g"])(z, {
                latex: "$$\\vec{F}$$"
            }), w]), Object(a["e"])("p", g, [O, Object(a["g"])(z, {
                latex: "$$\\vec{r}$$"
            }), j, Object(a["g"])(z, {
                latex: "$$\\vec{F}$$"
            }), $, Object(a["g"])(z, {
                latex: "$$\\vec{F}$$"
            }), x, Object(a["g"])(z, {
                latex: "$$\\vec{r}$$"
            }), y, Object(a["g"])(z, {
                latex: "$$\\vec{r}$$"
            }), E, Object(a["g"])(z, {
                latex: "$$\\vec{F}$$"
            }), M])])
        }
        Object(a["l"])(), Object(a["m"])("data-v-dcd22996");
        var z = {
                class: "viz-wrap"
            },
            F = {
                class: "viz-controls-wrap"
            },
            P = Object(a["f"])(" The moment vector of the force "),
            C = Object(a["f"])(" about point A will be equal to the cross products of the "),
            T = Object(a["f"])(" vector and the force vector "),
            V = Object(a["f"])(". The "),
            k = Object(a["f"])(" vector is a vector from point A to any point along the line of action of the force. "),
            q = Object(a["f"])(" and Line of Action Angle: "),
            A = Object(a["e"])("div", {
                id: "container"
            }, null, -1);

        function R(e, t, n, o, r, c) {
            var s = Object(a["o"])("math-jax"),
                i = Object(a["o"])("Slider");
            return Object(a["k"])(), Object(a["d"])("div", z, [Object(a["e"])("div", F, [Object(a["e"])("p", null, [P, Object(a["g"])(s, {
                latex: "$$\\vec{F}$$"
            }), C, Object(a["g"])(s, {
                latex: "$$\\vec{r}$$"
            }), T, Object(a["g"])(s, {
                latex: "$$\\vec{F}$$"
            }), V, Object(a["g"])(s, {
                latex: "$$\\vec{r}$$"
            }), k]), Object(a["e"])("h3", null, [Object(a["g"])(s, {
                latex: "$$\\vec{F}$$"
            }), q]), Object(a["g"])(i, {
                modelValue: r.length,
                "onUpdate:modelValue": t[0] || (t[0] = function(e) {
                    return r.length = e
                }),
                class: "slider-styling",
                min: -Math.PI,
                max: Math.PI,
                format: c.formatToRadians,
                step: -1
            }, null, 8, ["modelValue", "min", "max", "format"])]), A])
        }
        Object(a["l"])();
        var I = n("4478"),
            W = n("2909"),
            _ = (n("99af"), n("b680"), n("b0c0"), n("159b"), n("4c53"), n("07ac"), n("5a89")),
            N = n("848f"),
            B = n("a6f0"),
            H = n("aea1"),
            D = {
                name: "ThreeCanvas",
                data: function() {
                    return {
                        length: 0,
                        formula: "$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$"
                    }
                },
                components: {
                    Slider: B["a"]
                },
                methods: {
                    createASlider: function(e) {},
                    formatToRadians: function(e) {
                        var t = Math.PI;
                        return "".concat(Math.round(e * (180 / t)), " degrees ").concat(e.toFixed(2), " Radians")
                    },
                    resizeCanvasToDisplaySize: function() {
                        var e = this.renderer.domElement,
                            t = e.clientWidth,
                            n = e.clientHeight;
                        e.width === t && e.height === n || (this.renderer.setSize(t, n, !1), this.labelRenderer.setSize(t, n, !1), this.camera.aspect = t / n, this.camera.updateProjectionMatrix())
                    },
                    init: function() {
                        var e = this,
                            t = document.getElementById("container");
                        this.scene = new _["v"];
                        var n = [];
                        this.camera = new _["u"](70, 2, .01, 50), this.camera.position.set(-2, -1, 10);
                        var a = new _["E"](0, 1, 0);
                        a.normalize();
                        var o = new _["E"](0, 3, 0),
                            r = 15988,
                            c = new _["a"](a, o, this.length, r);
                        c.name = "first arrow", this.scene.add(c), this.renderer = new _["F"]({
                            antialias: !0
                        }), this.renderer.setSize(t.clientWidth, t.clientHeight), this.renderer.setClearColor("#FFFFFF"), this.renderer.setPixelRatio(window.devicePixelRatio);
                        var s = new ResizeObserver(this.resizeCanvasToDisplaySize);
                        s.observe(this.renderer.domElement, {
                            box: "content-box"
                        }), this.labelRenderer = new H["b"], this.labelRenderer.setSize(t.clientWidth, t.clientHeight), this.labelRenderer.domElement.style.position = "absolute", this.labelRenderer.domElement.style.top = "0px", this.labelRenderer.domElement.style.pointerEvents = "none", t.appendChild(this.labelRenderer.domElement), this.gridHelper = new _["j"](15, 8, 4473924, 13882323), this.gridHelper.rotateX(90 * Math.PI / 180), this.scene.add(this.gridHelper), this.axesHelper = new _["b"](1), t.appendChild(this.renderer.domElement);
                        var i = function(t) {
                            t.forEach((function(t) {
                                var n = e.scene.getObjectByName(t);
                                e.scene.remove(n)
                            }))
                        };

                        function l(e, t, n, a, o) {
                            o = void 0 !== o && o, o && e.parent.localToWorld(e.position), e.position.sub(t), e.position.applyAxisAngle(n, a), e.position.add(t), o && e.parent.worldToLocal(e.position), e.rotateOnAxis(n, a)
                        }
                        var d, h = function(t, a, o) {
                                var r = [];
                                r.push(t), r.push(a);
                                var c = new _["r"]({
                                        color: o
                                    }),
                                    s = new _["C"](new _["e"](r), 512, .02, 30, !0),
                                    i = new _["l"](s, c);
                                i.name = "r";
                                var l = new _["A"](.3, 32, 16),
                                    d = new _["r"]({
                                        color: 0
                                    }),
                                    h = new _["q"](l, d);
                                h.position.set(t.x, t.y, 0), e.scene.add(h), e.scene.add(i), n.push(i.name);
                                var u = new _["E"];
                                u.subVectors(a, t);
                                var p = new _["r"]({
                                        color: o
                                    }),
                                    b = new _["f"](.1, .4, 32),
                                    m = new _["q"](b, p),
                                    v = new _["E"](0, 1, 0);
                                m.quaternion.setFromUnitVectors(v, u.clone().normalize());
                                var f = Math.cos(e.length) * a.x - Math.sin(e.length) * a.y,
                                    w = Math.sin(e.length) * a.x - Math.cos(e.length) * a.y,
                                    g = new _["E"](-f, -w),
                                    O = Math.cos(e.length) * t.x - Math.sin(e.length) * t.y,
                                    j = Math.sin(e.length) * t.x - Math.cos(e.length) * t.y,
                                    $ = new _["E"](-O, -j),
                                    x = new _["E"];
                                x.subVectors(g, $), m.position.copy(a), m.name = "arrow head", e.scene.add(m), n.push(m.name);
                                var y = document.createElement("div");
                                y.className = "label", y.style.color = "rgb(0,0,0)", y.style.backgroundColor = "#ffffff", y.style.padding = "4px 3px 4px 3px", y.style.fontWeight = "900", y.textContent = "r";
                                var E = new H["a"](y);
                                E.name = "angle2", n.push(E.name), E.position.set(-1, -.7, 0), e.scene.add(E);
                                var M = document.createElement("div");
                                M.className = "label", M.style.color = "rgb(0,0,0)", M.style.padding = ".5px 1px 2px 3px", M.textContent = "P", M.style.fontWeight = "900";
                                var S = new H["a"](M);
                                S.name = "P", n.push(S.name), S.position.set(-2.8, -2.5, 0), e.scene.add(S)
                            },
                            u = function(t, a, o, r) {
                                var c = [];
                                c.push(t), c.push(a);
                                var s = new _["r"]({
                                        color: o
                                    }),
                                    i = new _["C"](new _["e"](c), 512, .07, 30, !0),
                                    l = new _["l"](i, s);
                                l.name = "r";
                                var d = new _["A"](.1, 32, 16),
                                    h = new _["r"]({
                                        color: 0
                                    }),
                                    u = new _["q"](d, h);
                                if (u.position.set(t.x, t.y, 0), e.scene.add(u), e.scene.add(l), n.push(l.name), 1 == r) {
                                    var p = new _["E"];
                                    p.subVectors(a, t);
                                    var b = [],
                                        m = Object.assign({}, p),
                                        v = Object(I["a"])(_["E"], Object(W["a"])(Object.values(m)));
                                    b.push(v.multiplyScalar(-200)), b.push(p.multiplyScalar(200));
                                    var f = new _["m"]({
                                            color: 0,
                                            dashSize: .2,
                                            gapSize: .2
                                        }),
                                        w = (new _["d"]).setFromPoints(b),
                                        g = new _["l"](w, f);
                                    g.computeLineDistances(), g.name = "dashed-line", e.scene.add(g), n.push(g.name)
                                }
                                var O = new _["E"];
                                O.subVectors(a, t);
                                var j = new _["r"]({
                                        color: o
                                    }),
                                    $ = new _["f"](.2, .4, 32),
                                    x = new _["q"]($, j),
                                    y = new _["E"](0, 1, 0);
                                x.quaternion.setFromUnitVectors(y, O.clone().normalize());
                                var E = Math.cos(e.length) * a.x - Math.sin(e.length) * a.y,
                                    M = Math.sin(e.length) * a.x - Math.cos(e.length) * a.y,
                                    S = new _["E"](E, M),
                                    z = Math.cos(e.length) * t.x - Math.sin(e.length) * t.y,
                                    F = Math.sin(e.length) * t.x - Math.cos(e.length) * t.y,
                                    P = new _["E"](-z, -F),
                                    C = new _["E"];
                                C.subVectors(P, S), x.position.copy(a), x.name = "arrow head", e.scene.add(x), n.push(x.name);
                                var T = document.createElement("div");
                                T.className = "label", T.style.color = "rgb(0,0,0)", T.style.fontWeight = "900", T.textContent = "M", T.style.backgroundColor = "#ffffff", T.style.borderRadius = "25%", T.style.padding = "2px 2px 2px 2px", T.fontWeight = "bold", T.style.boxShadow = "1px 2px 3px rgba(0,0,0,.5)";
                                var V = new H["a"](T);
                                V.name = "M", n.push(V.name), V.position.set(a.x, a.y + 1, a.z), e.scene.add(V)
                            },
                            p = function(t, a, o, r) {
                                var c = [];
                                c.push(t), c.push(a);
                                var s = new _["r"]({
                                        color: o
                                    }),
                                    i = new _["C"](new _["e"](c), 512, .05, 30, !0),
                                    l = new _["l"](i, s);
                                if (l.name = "Ollie thick line", l.rotateZ(-e.length), e.scene.add(l), n.push(l.name), 1 == r) {
                                    var h = new _["E"];
                                    h.subVectors(a, t);
                                    var u = [],
                                        p = Object.assign({}, h),
                                        b = Object(I["a"])(_["E"], Object(W["a"])(Object.values(p)));
                                    u.push(b.multiplyScalar(-200)), u.push(h.multiplyScalar(200));
                                    var m = new _["m"]({
                                            color: 707566,
                                            dashSize: .2,
                                            gapSize: .2
                                        }),
                                        v = (new _["d"]).setFromPoints(u),
                                        f = new _["l"](v, m);
                                    f.computeLineDistances(), f.rotateZ(-e.length), f.name = "dashed-line", e.scene.add(f), n.push(f.name)
                                }
                                var w = new _["E"];
                                w.subVectors(a, t);
                                var g = new _["r"]({
                                        color: o
                                    }),
                                    O = new _["f"](.2, .4, 32),
                                    j = new _["q"](O, g),
                                    $ = new _["E"](0, 1, 0);
                                j.quaternion.setFromUnitVectors($, w.clone().normalize());
                                var x = Math.cos(e.length) * a.x - Math.sin(e.length) * a.y,
                                    y = Math.sin(e.length) * a.x - Math.cos(e.length) * a.y,
                                    E = new _["E"](-x, -y),
                                    M = Math.cos(e.length) * t.x - Math.sin(e.length) * t.y,
                                    S = Math.sin(e.length) * t.x - Math.cos(e.length) * t.y,
                                    z = new _["E"](-M, -S),
                                    F = new _["E"];
                                F.subVectors(E, z), d = F, j.quaternion.setFromUnitVectors($, F.clone().normalize()), j.position.copy(E), F.multiplyScalar(.5);
                                var P = document.createElement("div");
                                P.className = "label", P.style.color = "rgb(0,0,0)", P.style.fontWeight = "900", P.textContent = "F", P.style.backgroundColor = "#ffffff", P.style.padding = "3px 2px 3px 2px", P.fontWeight = "bold";
                                var C = new H["a"](P);
                                C.name = "F", n.push(C.name);
                                var T = z.add(E).divideScalar(2);
                                C.position.set(T.x, T.y, T.z), e.scene.add(C), j.name = "arrow head", e.scene.add(j), n.push(j.name)
                            },
                            b = function() {
                                var t = new N["a"],
                                    n = e;
                                t.load("./arrows.svg", (function(e) {
                                    var t = e.paths,
                                        a = new _["k"];
                                    a.scale.multiplyScalar(.01);
                                    for (var o = 0; o < t.length; o++)
                                        for (var r = t[o], c = new _["r"]({
                                                color: 8421504,
                                                side: _["g"],
                                                depthWrite: !1
                                            }), s = N["a"].createShapes(r), i = 0; i < s.length; i++) {
                                            var l = s[i],
                                                d = new _["x"](l),
                                                h = new _["q"](d, c);
                                            a.add(h)
                                        }
                                    a.position.set(-5, -4, .1), a.name = "arrowss", n.scene.add(a)
                                }), (function(e) {
                                    console.log(e.loaded / e.total * 100 + "% loaded")
                                }), (function(e) {
                                    console.log("An error happened"), console.log(e)
                                }))
                            };
                        b();
                        var m = function() {
                            var t = new _["B"](1, .03, 16, 100, e.length),
                                a = new _["r"]({
                                    color: 707566
                                }),
                                o = new _["q"](t, a);
                            o.rotateZ(-90 * Math.PI / 180), o.rotateY(Math.PI), o.name = "angle torus", n.push(o.name), e.scene.add(o);
                            var r = document.createElement("div");
                            r.className = "label", r.style.color = "rgb(0,0,0)", r.textContent = "".concat(Math.round(e.length * (180 / Math.PI)), "°");
                            var c = new H["a"](r);
                            c.name = "angle", n.push(c.name), c.position.set(.4, .3, 0), e.scene.add(c)
                        };
                        m();
                        var v = new _["E"](0, this.length, 0),
                            f = new _["E"](0, 0, 0),
                            w = 707566,
                            g = !0;
                        p(v, f, w, !1);
                        var O = 1,
                            j = function(t) {
                                console.log("Old Val ", O, "New Val ", t);
                                var n = e.scene.getObjectByName("arrowss"),
                                    a = new _["E"](-3, -2, 0),
                                    o = new _["E"](0, 1, 0).normalize(),
                                    r = Math.PI,
                                    c = !0;
                                (t >= 0 && O <= 0 || t <= 0 && O >= 0) && l(n, a, o, r, c), O = t
                            };
                        this.updateSlider = function() {
                            var t = e.scene.getObjectByName("first arrow");
                            e.scene.remove(t), i(n), n = [];
                            var a = new _["E"](0, 1, 0),
                                o = new _["E"](0, 3, 0),
                                r = 707566;
                            p(a, o, r, g), h(new _["E"](-3, -2, 0), new _["E"](-.15, -.15, 0), 0, !1), m();
                            var c = new _["E"](3, 2, 0),
                                s = c.cross(d);
                            console.log(s), u(new _["E"](-3, -2, 0), new _["E"](-3, -2, 2 * s.z), 16713290, !1), j(s.z)
                        }
                    },
                    animate: function() {
                        requestAnimationFrame(this.animate), this.updateSlider(), this.resizeCanvasToDisplaySize(), this.renderer.render(this.scene, this.camera), this.labelRenderer.render(this.scene, this.camera)
                    }
                },
                created: function() {
                    window.addEventListener("resize", this.onWindowResize, !1)
                },
                mounted: function() {
                    this.init(), this.animate()
                }
            };
        n("e6b3"), n("8b0a");
        D.render = R, D.__scopeId = "data-v-dcd22996";
        var L = D,
            U = {
                name: "TitleSection",
                components: {
                    ThreeCanvas: L
                },
                data: function() {
                    return {
                        formula: "$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$"
                    }
                }
            };
        n("6ea2");
        U.render = S, U.__scopeId = "data-v-7c90c5e0";
        var Z = U,
            J = {
                name: "App",
                components: {
                    TitleSection: Z
                }
            };
        n("4384");
        J.render = r;
        var G = J,
            X = n("5329");

        function Y() {
            var e = document.getElementById("hello");
            Object(X["c"])(e)
        }
        Object(X["b"])({}, Y);
        var K = Object(a["b"])(G);
        K.use(X["a"]), K.mount("#app")
    },
    "63d9": function(e, t, n) {},
    "6ea2": function(e, t, n) {
        "use strict";
        n("55a7")
    },
    "8b0a": function(e, t, n) {
        "use strict";
        n("63d9")
    }
});
//# sourceMappingURL=app.3dce01ac.js.map
