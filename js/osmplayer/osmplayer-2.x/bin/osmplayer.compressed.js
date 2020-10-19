function checkPlayType(a, b) {
    if ("function" == typeof a.canPlayType) {
        if ("object" == typeof b) {
            for (var c = b.length, d = ""; c-- && !(d = checkPlayType(a, b[c])););
            return d
        }
        var e = a.canPlayType(b);
        if ("no" !== e && "" !== e)return b
    }
    return ""
}
var minplayer = minplayer || {};
!function (a) {
    !function () {
        "use strict";
        var a = "undefined" != typeof module && module.exports, b = "undefined" != typeof Element && "ALLOW_KEYBOARD_INPUT" in Element, c = function () {
            for (var a, b, c = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]], d = 0, e = c.length, f = {}; e > d; d++)if (a = c[d], a && a[1] in document) {
                for (d = 0, b = a.length; b > d; d++)f[c[0][d]] = a[d];
                return f
            }
            return !1
        }(), d = {
            request: function (a) {
                var d = c.requestFullscreen;
                a = a || document.documentElement, /5\.1[\.\d]* Safari/.test(navigator.userAgent) ? a[d]() : a[d](b && Element.ALLOW_KEYBOARD_INPUT)
            }, exit: function () {
                document[c.exitFullscreen]()
            }, toggle: function (a) {
                this.isFullscreen ? this.exit() : this.request(a)
            }, onchange: function () {
            }, onerror: function () {
            }, raw: c
        };
        return c ? (Object.defineProperties(d, {
            isFullscreen: {
                get: function () {
                    return !!document[c.fullscreenElement]
                }
            }, element: {
                enumerable: !0, get: function () {
                    return document[c.fullscreenElement]
                }
            }, enabled: {
                enumerable: !0, get: function () {
                    return !!document[c.fullscreenEnabled]
                }
            }
        }), document.addEventListener(c.fullscreenchange, function (a) {
            d.onchange.call(d, a)
        }), document.addEventListener(c.fullscreenerror, function (a) {
            d.onerror.call(d, a)
        }), void(a ? module.exports = d : window.screenfull = d)) : void(a ? module.exports = !1 : window.screenfull = !1)
    }(), a.screenfull = screenfull
}(minplayer);
var minplayer = minplayer || {};
if (minplayer.compatibility = function () {
        var a = null;
        a = document.createElement("video"), this.videoOGG = checkPlayType(a, "video/ogg"), this.videoH264 = checkPlayType(a, ["video/mp4", "video/h264"]), this.videoWEBM = checkPlayType(a, ["video/x-webm", "video/webm", "application/octet-stream"]), this.videoMPEGURL = checkPlayType(a, "application/vnd.apple.mpegurl"), a = document.createElement("audio"), this.audioOGG = checkPlayType(a, "audio/ogg"), this.audioMP3 = checkPlayType(a, "audio/mpeg"), this.audioMP4 = checkPlayType(a, "audio/mp4")
    }, minplayer.playTypes || (minplayer.playTypes = new minplayer.compatibility, minplayer.isAndroid = /android/gi.test(navigator.appVersion), minplayer.isIDevice = /iphone|ipad/gi.test(navigator.appVersion), minplayer.isPlaybook = /playbook/gi.test(navigator.appVersion), minplayer.isTouchPad = /hp-tablet/gi.test(navigator.appVersion), minplayer.hasTouch = "ontouchstart" in window && !minplayer.isTouchPad), !minplayer.urlVars) {
    minplayer.urlVars = {};
    var regEx = /[?&]+([^=&]+)=([^&]*)/gi;
    window.location.href.replace(regEx, function (a, b, c) {
        minplayer.urlVars[b] = c
    })
}
var minplayer = minplayer || {};
minplayer.async = function () {
    this.value = null, this.queue = []
}, minplayer.async.prototype.get = function (a) {
    null !== this.value ? a(this.value) : this.queue.push(a)
}, minplayer.async.prototype.set = function (a) {
    this.value = a;
    var b = this.queue.length;
    if (b) {
        for (; b--;)this.queue[b](a);
        this.queue = []
    }
};
var minplayer = minplayer || {};
minplayer.flags = function () {
    this.flag = 0, this.ids = {}, this.numFlags = 0
}, minplayer.flags.prototype.setFlag = function (a, b) {
    this.ids.hasOwnProperty(a) || (this.ids[a] = this.numFlags, this.numFlags++), b ? this.flag |= 1 << this.ids[a] : this.flag &= ~(1 << this.ids[a])
}, minplayer = minplayer || {}, minplayer.plugins = minplayer.plugins || {}, minplayer.queue = minplayer.queue || [], minplayer.lock = !1, minplayer.plugin = function (a, b, c, d) {
    if (this.options = c || {}, this.name = a, this.pluginReady = !1, this.queue = d || {}, this.triggered = {}, this.lock = !1, this.uuid = 0, b) {
        this.context = jQuery(b);
        var e = {};
        this.defaultOptions(e);
        for (var f in e)this.options.hasOwnProperty(f) || (this.options[f] = e[f]);
        this.initialize()
    }
}, minplayer.plugin.prototype.initialize = function () {
    this.construct()
}, minplayer.plugin.prototype.defaultOptions = function () {
}, minplayer.plugin.prototype.construct = function () {
    this.active = !0, this.addPlugin()
}, minplayer.plugin.prototype.destroy = function () {
    this.active = !1, this.unbind()
}, minplayer.plugin.prototype.create = function (a, b, c) {
    var d = null;
    return b = b || "minplayer", window[b][a] || (b = "minplayer"), c = c || this.display, window[b][a] && (d = window[b][a], d[this.options.template] && (d = d[this.options.template]), "function" != typeof d && (d = window.minplayer[a]), "function" == typeof d) ? new d(c, this.options) : null
}, minplayer.plugin.prototype.ready = function () {
    this.pluginReady || (this.pluginReady = !0, this.trigger("ready"), this.checkQueue())
}, minplayer.plugin.prototype.isValid = function () {
    return !!this.options.id && this.active
}, minplayer.plugin.prototype.onAdded = function () {
}, minplayer.plugin.prototype.addPlugin = function (a, b) {
    if (a = a || this.name, b = b || this, b.isValid()) {
        minplayer.plugins[this.options.id] || (minplayer.plugins[this.options.id] = {}), minplayer.plugins[this.options.id][a] || (minplayer.plugins[this.options.id][a] = []);
        var c = minplayer.plugins[this.options.id][a].push(b);
        this.uuid = this.options.id + "__" + a + "__" + c, this.checkQueue(b), b.onAdded(this)
    }
}, minplayer.timers = {}, minplayer.plugin.prototype.poll = function (a, b, c) {
    return minplayer.timers.hasOwnProperty(a) && clearTimeout(minplayer.timers[a]), minplayer.timers[a] = setTimeout(function (d) {
        return function e() {
            b.call(d) && (minplayer.timers[a] = setTimeout(e, c))
        }
    }(this), c), minplayer.timers[a]
}, minplayer.plugin.prototype.get = function (a, b) {
    return "function" == typeof a && (b = a, a = null), minplayer.get.call(this, this.options.id, a, b)
}, minplayer.plugin.prototype.checkQueue = function (a) {
    var b = null, c = 0, d = !1;
    a = a || this, minplayer.lock = !0;
    var e = minplayer.queue.length;
    for (c = 0; e > c; c++)minplayer.queue.hasOwnProperty(c) && (b = minplayer.queue[c], d = !b.id && !b.plugin, d |= b.plugin === a.name, d &= !b.id || b.id === this.options.id, d && !b.addedto.hasOwnProperty(a.options.id) && (b.addedto[a.options.id] = !0, d = minplayer.bind.call(b.context, b.event, this.options.id, a.name, b.callback, !0)));
    minplayer.lock = !1
}, minplayer.eventTypes = {}, minplayer.plugin.prototype.isEvent = function (a, b) {
    var c = a + "__" + b;
    if ("undefined" != typeof minplayer.eventTypes[c])return minplayer.eventTypes[c];
    new RegExp("^(.*:)?" + b + "$", "gi");
    return minplayer.eventTypes[c] = null !== a.match(b), minplayer.eventTypes[c]
}, minplayer.plugin.prototype.trigger = function (a, b, c) {
    if (!this.active)return this;
    c || (this.triggered[a] = b);
    var d = 0, e = {}, f = null;
    for (var g in this.queue)if (this.isEvent(g, a)) {
        f = this.queue[g];
        for (d in f)f.hasOwnProperty(d) && (e = f[d], e.callback({target: this, data: e.data}, b))
    }
    return this
}, minplayer.plugin.prototype.ubind = function (a, b, c) {
    return this.unbind(a), this.bind(a, b, c)
}, minplayer.plugin.prototype.bind = function (a, b, c) {
    if (!this.active)return this;
    if ("function" == typeof b && (c = b, b = null), a && c) {
        this.queue[a] = this.queue[a] || [], this.queue[a].push({callback: c, data: b});
        for (var d in this.triggered)this.triggered.hasOwnProperty(d) && this.isEvent(a, d) && c({
            target: this,
            data: b
        }, this.triggered[d]);
        return this
    }
}, minplayer.plugin.prototype.unbind = function (a) {
    return this.lock && setTimeout(function (b) {
        return function () {
            b.unbind(a)
        }
    }(this), 10), this.lock = !0, a ? this.queue.hasOwnProperty(a) && this.queue[a].length > 0 && (this.queue[a].length = 0) : this.queue = {}, this.lock = !1, this
}, minplayer.addQueue = function (a, b, c, d, e) {
    minplayer.lock ? setTimeout(function () {
        minplayer.addQueue(a, c, b, d, e)
    }, 10) : minplayer.queue.push({context: a, id: c, event: b, plugin: d, callback: e, addedto: {}})
}, minplayer.bind = function (a, b, c, d, e) {
    if (!d)return !1;
    var f = minplayer.plugins, g = null, h = null, i = [], j = function (a, b) {
        if (f.hasOwnProperty(a) && f[a].hasOwnProperty(b))for (var c = f[a][b].length; c--;)i.push(f[a][b][c])
    };
    if (b && c)j(b, c); else if (!b && c)for (h in f)j(h, c); else if (b && !c && f[b])for (g in f[b])j(b, g); else if (!b && !c)for (h in f)for (g in f[h])j(h, g);
    for (var k = i.length; k--;)i[k].bind(a, function (a) {
        return function (b) {
            d.call(a, b.target)
        }
    }(this));
    return e || minplayer.addQueue(this, a, b, c, d), i.length > 0
}, minplayer.get = function (a, b, c) {
    var d = typeof a, e = typeof b, f = typeof c;
    if ("function" === d ? (c = a, b = a = null) : "function" === e ? (c = b, b = a, a = null) : "undefined" === e && "undefined" === f && (b = a, c = a = null), c = "function" == typeof c ? c : null)return void minplayer.bind.call(this, "ready", a, b, c);
    var g = minplayer.plugins, h = null;
    if (!(a || b || c))return g;
    if (a && !b && !c)return g[a];
    if (a && b && !c)return g[a][b];
    if (!a && b && !c) {
        var i = [];
        for (h in g)if (g.hasOwnProperty(h) && g[h].hasOwnProperty(b))for (var j = g[h][b].length; j--;)i.push(g[h][b][j]);
        return i
    }
}, minplayer.display = function (a, b, c, d) {
    minplayer.plugin.call(this, a, b, c, d)
}, minplayer.display.prototype = new minplayer.plugin, minplayer.display.prototype.constructor = minplayer.display, minplayer.display.prototype.getDisplay = function (a) {
    return a
}, minplayer.display.prototype.initialize = function () {
    this.display || (this.display = this.getDisplay(this.context, this.options)), this.display && (this.options.pluginName = "display", this.elements = this.getElements(), minplayer.plugin.prototype.initialize.call(this))
}, minplayer.display.prototype.construct = function () {
    if (minplayer.plugin.prototype.construct.call(this), this.autoHide = !1, this.onResize) {
        var a = 0;
        jQuery(window).resize(function (b) {
            return function () {
                clearTimeout(a), a = setTimeout(function () {
                    b.onResize()
                }, 200)
            }
        }(this))
    }
}, minplayer.display.prototype.onResize = !1, minplayer.display.prototype.hide = function (a) {
    a = a || this.display, a && (a.forceHide = !0, a.unbind().hide())
}, minplayer.display.prototype.fullScreenElement = function () {
    return this.display
}, minplayer.click = function (a, b) {
    var c = !1;
    return a = jQuery(a), a.bind("touchstart click", function (a) {
        c || (c = !0, setTimeout(function () {
            c = !1
        }, 100), b.call(this, a))
    }), a
}, minplayer.display.prototype.onFocus = function (a) {
    this.hasFocus = this.focus = a, this.autoHide && this.showThenHide(this.autoHide.element, this.autoHide.timeout, this.autoHide.cb)
}, minplayer.display.prototype.showThenHide = function (a, b, c) {
    var d = typeof a;
    "undefined" === d ? (c = null, a = this.display) : "number" === d ? (c = b, b = a, a = this.display) : "function" === d && (c = a, a = this.display), a && (b = b || 5e3, this.autoHide = {
        element: a,
        timeout: b,
        cb: c
    }, a.forceHide || ("undefined" != typeof a.showMe ? a.showMe && a.showMe(c) : (a.show(), c && c(!0))), a.hoverState || (jQuery(a).bind("mouseenter", function () {
        a.hoverState = !0
    }), jQuery(a).bind("mouseleave", function () {
        a.hoverState = !1
    })), clearTimeout(this.showTimer), this.showTimer = setTimeout(function (d) {
        return function e() {
            a.hoverState ? d.showTimer = setTimeout(e, b) : "undefined" != typeof a.hideMe ? a.hideMe && a.hideMe(c) : a.hide("slow", function () {
                c && c(!1)
            })
        }
    }(this), b))
}, minplayer.display.prototype.fullscreen = function (a) {
    var b = this.isFullScreen(), c = this.fullScreenElement();
    b && !a ? (c.removeClass("fullscreen"), minplayer.screenfull && minplayer.screenfull.exit(), this.trigger("fullscreen", !1)) : !b && a && (c.addClass("fullscreen"), minplayer.screenfull && (minplayer.screenfull.request(c[0]), minplayer.screenfull.onchange = function (a) {
        return function () {
            minplayer.screenfull.isFullscreen || a.fullscreen(!1)
        }
    }(this)), this.trigger("fullscreen", !0))
}, minplayer.display.prototype.toggleFullScreen = function () {
    this.fullscreen(!this.isFullScreen())
}, minplayer.display.prototype.isFullScreen = function () {
    return this.fullScreenElement().hasClass("fullscreen")
}, minplayer.display.prototype.getScaledRect = function (a, b) {
    var c = {};
    return c.x = b.x ? b.x : 0, c.y = b.y ? b.y : 0, c.width = b.width ? b.width : 0, c.height = b.height ? b.height : 0, a && (b.width / b.height > a ? (c.height = b.height, c.width = Math.floor(b.height * a)) : (c.height = Math.floor(b.width / a), c.width = b.width), c.x = Math.floor((b.width - c.width) / 2), c.y = Math.floor((b.height - c.height) / 2)), c
}, minplayer.display.prototype.getElements = function () {
    return {}
}, jQuery.fn.minplayer || (jQuery.fn.minplayer = function (a) {
    return jQuery(this).each(function () {
        a = a || {}, a.id = a.id || jQuery(this).attr("id") || Math.random(), minplayer.plugins[a.id] || (a.template = a.template || "default", minplayer[a.template] ? new minplayer[a.template](jQuery(this), a) : new minplayer(jQuery(this), a))
    })
}), minplayer = jQuery.extend(function (a, b) {
    minplayer.display.call(this, "player", a, b)
}, minplayer), minplayer.prototype = new minplayer.display, minplayer.prototype.constructor = minplayer, minplayer.prototype.defaultOptions = function (a) {
    a.id = "player", a.build = !1, a.wmode = "transparent", a.preload = !0, a.autoplay = !1, a.autoload = !0, a.loop = !1, a.width = "100%", a.height = "350px", a.debug = !1, a.volume = 80, a.files = null, a.file = "", a.preview = "", a.attributes = {}, a.plugins = {}, a.logo = "", a.link = "", a.duration = 0, jQuery.each(this.context[0].attributes, function (b, c) {
        a[c.name] = c.value
    }), minplayer.display.prototype.defaultOptions.call(this, a)
}, minplayer.prototype.construct = function () {
    minplayer.display.prototype.construct.call(this);
    var a = null;
    for (var b in this.options.plugins)a = this.options.plugins[b], minplayer[a] && (a = minplayer[a], a[this.options.template] && a[this.options.template].init ? a[this.options.template].init(this) : a.init && a.init(this));
    if (this.options.pluginName = "player", this.controller = this.create("controller"), this.playLoader = this.create("playLoader"), this.options.logo && this.elements.logo) {
        var c = "";
        this.options.link && (c += '<a target="_blank" href="' + this.options.link + '">'), c += '<img src="' + this.options.logo + '" >', this.options.link && (c += "</a>"), this.logo = this.elements.logo.append(c)
    }
    this.currentPlayer = "html5", this.addKeyEvents(), this.addEvents(), this.load(this.getFiles()), this.ready()
}, minplayer.prototype.setFocus = function (a) {
    minplayer.get.call(this, this.options.id, null, function (b) {
        b.onFocus(a)
    }), this.trigger("playerFocus", a)
}, minplayer.prototype.bindTo = function (a) {
    a.ubind(this.uuid + ":error", function (a) {
        return function (b, c) {
            "html5" === a.currentPlayer ? (minplayer.player = "minplayer", a.options.file.player = "minplayer", a.loadPlayer()) : a.showError(c)
        }
    }(this)), a.ubind(this.uuid + ":fullscreen", function (a) {
        return function () {
            a.resize()
        }
    }(this))
}, minplayer.prototype.addEvents = function () {
    var a = !1;
    this.display.bind("mouseenter", function (b) {
        return function () {
            a = !0, b.setFocus(!0)
        }
    }(this)), this.display.bind("mouseleave", function (b) {
        return function () {
            a = !1, b.setFocus(!1)
        }
    }(this));
    var b = !1;
    this.display.bind("mousemove", function (c) {
        return function () {
            b || (b = setTimeout(function () {
                b = !1, a && c.setFocus(!0)
            }, 300))
        }
    }(this)), minplayer.get.call(this, this.options.id, null, function (a) {
        return function (b) {
            a.bindTo(b)
        }
    }(this))
}, minplayer.prototype.showError = function (a) {
    "object" != typeof a && (a = a || "", this.elements.error && (this.elements.error.text(a), a ? (this.elements.error.show(), setTimeout(function (a) {
        return function () {
            a.elements.error.hide("slow")
        }
    }(this), 5e3)) : this.elements.error.hide()))
}, minplayer.prototype.addKeyEvents = function () {
    jQuery(document).bind("keydown", function (a) {
        return function (b) {
            switch (b.keyCode) {
                case 113:
                case 27:
                    a.isFullScreen() && a.fullscreen(!1)
            }
        }
    }(this))
}, minplayer.prototype.getFiles = function () {
    if (this.options.files)return this.options.files;
    if (this.options.file)return this.options.file;
    var a = [], b = null;
    return this.elements.media && (b = this.elements.media.attr("src"), b && a.push({path: b}), jQuery("source", this.elements.media).each(function () {
        a.push({
            path: jQuery(this).attr("src"),
            mimetype: jQuery(this).attr("type"),
            codecs: jQuery(this).attr("codecs")
        })
    })), a
}, minplayer.getMediaFile = function (a) {
    if (!a)return null;
    if ("string" == typeof a || a.path || a.id)return new minplayer.file(a);
    var b = 0, c = null, d = null;
    for (var e in a)a.hasOwnProperty(e) && (d = new minplayer.file(a[e]), d.player && d.priority > b && (b = d.priority, c = d));
    return c
}, minplayer.prototype.loadPlayer = function () {
    if (!this.options.file || 0 === this.elements.display.length)return !1;
    if (!this.options.file.player)return !1;
    this.showError();
    var a = this.options.file.player.toString();
    if (!this.media || a !== this.currentPlayer) {
        if (this.currentPlayer = a, !this.elements.display)return void this.showError("No media display found.");
        var b = {};
        return this.media && (b = this.media.queue, this.media.destroy()), pClass = minplayer.players[this.options.file.player], this.options.mediaelement = this.elements.media, this.media = new pClass(this.elements.display, this.options, b), this.media.load(this.options.file), this.display.addClass("minplayer-player-" + this.media.mediaFile.player), !0
    }
    return this.media ? (this.media.options = this.options, this.display.removeClass("minplayer-player-" + this.media.mediaFile.player), this.media.load(this.options.file), this.display.addClass("minplayer-player-" + this.media.mediaFile.player), !1) : void 0
}, minplayer.prototype.load = function (a) {
    return this.options.files = a || this.options.files, this.options.file = minplayer.getMediaFile(this.options.files), this.loadPlayer() ? (this.bindTo(this.media), this.options.file.mimetype && !this.options.file.player ? (this.showError("Cannot play media: " + this.options.file.mimetype), !1) : !0) : !1
}, minplayer.prototype.resize = function () {
    this.get(function (a) {
        a.onResize && a.onResize()
    })
};
var minplayer = minplayer || {};
minplayer.image = function (a, b) {
    this.loaded = !1, this.loader = null, this.ratio = 0, this.img = null, minplayer.display.call(this, "image", a, b)
}, minplayer.image.prototype = new minplayer.display, minplayer.image.prototype.constructor = minplayer.image, minplayer.image.prototype.construct = function () {
    minplayer.display.prototype.construct.call(this), this.options.pluginName = "image", this.display.css("overflow", "hidden"), this.loader = new Image, this.loader.onload = function (a) {
        return function () {
            a.loaded = !0, a.ratio = a.loader.width / a.loader.height, a.resize(), a.trigger("loaded")
        }
    }(this), this.ready()
}, minplayer.image.prototype.load = function (a) {
    this.clear(function () {
        this.display.empty(), this.img = jQuery(document.createElement("img")).attr({src: ""}).hide(), this.display.append(this.img), this.loader.src = a, this.img.attr("src", a)
    })
}, minplayer.image.prototype.clear = function (a) {
    this.loaded = !1, this.img ? this.img.fadeOut(150, function (b) {
        return function () {
            b.img.attr("src", ""), b.loader.src = "", jQuery(this).remove(), a && a.call(b)
        }
    }(this)) : a && a.call(this)
}, minplayer.image.prototype.resize = function (a, b) {
    if (a = a || this.display.parent().width(), b = b || this.display.parent().height(), a && b && this.loaded) {
        var c = this.getScaledRect(this.ratio, {width: a, height: b});
        this.img && this.img.attr("src", this.loader.src).css({
            marginLeft: c.x,
            marginTop: c.y,
            width: c.width,
            height: c.height
        }), this.img.fadeIn(150)
    }
}, minplayer.image.prototype.onResize = function () {
    this.resize()
};
var minplayer = minplayer || {};
minplayer.file = function (a) {
    return a ? (a = "string" == typeof a ? {path: a} : a, a.hasOwnProperty("isMinPlayerFile") ? a : (this.isMinPlayerFile = !0, this.duration = a.duration || 0, this.bytesTotal = a.bytesTotal || 0, this.quality = a.quality || 0, this.stream = a.stream || "", this.path = a.path || "", this.codecs = a.codecs || "", this.extension = a.extension || this.getFileExtension(), this.mimetype = a.mimetype || a.filemime || this.getMimeType(), this.type = a.type || this.getType(), this.type || (this.mimetype = this.getMimeType(), this.type = this.getType()), this.player = minplayer.player || a.player || this.getBestPlayer(), this.priority = a.priority || this.getPriority(), this.id = a.id || this.getId(), void(this.path || (this.path = this.id)))) : null
}, minplayer.player = "", minplayer.file.prototype.getBestPlayer = function () {
    var a = null, b = 0;
    return jQuery.each(minplayer.players, function (c) {
        return function (d, e) {
            var f = e.getPriority(c);
            e.canPlay(c) && f > b && (a = d, b = f)
        }
    }(this)), a
}, minplayer.file.prototype.getPriority = function () {
    var a = 1;
    switch (this.player && (a = minplayer.players[this.player].getPriority(this)), this.mimetype) {
        case"video/x-webm":
        case"video/webm":
        case"application/octet-stream":
        case"application/vnd.apple.mpegurl":
            return 10 * a;
        case"video/mp4":
        case"audio/mp4":
        case"audio/mpeg":
            return 9 * a;
        case"video/ogg":
        case"audio/ogg":
        case"video/quicktime":
            return 8 * a;
        default:
            return 5 * a
    }
}, minplayer.file.prototype.getFileExtension = function () {
    return this.path.substring(this.path.lastIndexOf(".") + 1).toLowerCase()
}, minplayer.file.prototype.getMimeType = function () {
    switch (this.extension) {
        case"mp4":
        case"m4v":
        case"flv":
        case"f4v":
            return "video/mp4";
        case"m3u8":
            return "application/vnd.apple.mpegurl";
        case"webm":
            return "video/webm";
        case"ogg":
        case"ogv":
            return "video/ogg";
        case"3g2":
            return "video/3gpp2";
        case"3gpp":
        case"3gp":
            return "video/3gpp";
        case"mov":
            return "video/quicktime";
        case"swf":
            return "application/x-shockwave-flash";
        case"oga":
            return "audio/ogg";
        case"mp3":
            return "audio/mpeg";
        case"m4a":
        case"f4a":
            return "audio/mp4";
        case"aac":
            return "audio/aac";
        case"wav":
            return "audio/vnd.wave";
        case"wma":
            return "audio/x-ms-wma";
        default:
            return "unknown"
    }
}, minplayer.file.prototype.getType = function () {
    var a = this.mimetype.match(/([^\/]+)(\/)/);
    if (a = a && a.length > 1 ? a[1] : "", "video" === a)return "video";
    if ("audio" === a)return "audio";
    switch (this.mimetype) {
        case"application/octet-stream":
        case"application/x-shockwave-flash":
        case"application/vnd.apple.mpegurl":
            return "video"
    }
    return ""
}, minplayer.file.prototype.getId = function () {
    var a = minplayer.players[this.player];
    return a && a.getMediaId ? a.getMediaId(this) : ""
};
var minplayer = minplayer || {};
minplayer.playLoader = function (a, b) {
    this.clear(), minplayer.display.call(this, "playLoader", a, b)
}, minplayer.playLoader.prototype = new minplayer.display, minplayer.playLoader.prototype.constructor = minplayer.playLoader, minplayer.playLoader.prototype.construct = function () {
    minplayer.display.prototype.construct.call(this), this.options.pluginName = "playLoader", this.initializePlayLoader(), this.ready()
}, minplayer.playLoader.prototype.initializePlayLoader = function () {
    this.get("media", function (a) {
        if (a.hasPlayLoader(this.options.preview))this.enabled = !1, this.hide(this.elements.busy), this.hide(this.elements.bigPlay), this.hide(this.elements.preview), this.hide(); else {
            this.enabled = !0, this.options.preview || (this.options.preview = a.poster);
            var b = !0;
            this.preview && this.preview.loader && (b = this.preview.loader.src !== this.options.preview), b && (a.elements.media.attr("poster", ""), this.loadPreview()), this.elements.bigPlay && minplayer.click(this.elements.bigPlay.unbind(), function (b) {
                b.preventDefault(), jQuery(this).hide(), a.play()
            }), a.ubind(this.uuid + ":loadstart", function (a) {
                return function () {
                    a.busy.setFlag("media", !0), a.bigPlay.setFlag("media", !0), a.previewFlag.setFlag("media", !0), a.checkVisibility()
                }
            }(this)), a.ubind(this.uuid + ":waiting", function (a) {
                return function (b, c, d) {
                    d || (a.busy.setFlag("media", !0), a.checkVisibility())
                }
            }(this)), a.ubind(this.uuid + ":loadeddata", function (a) {
                return function (b, c, d) {
                    d || (a.busy.setFlag("media", !1), a.checkVisibility())
                }
            }(this)), a.ubind(this.uuid + ":playing", function (b) {
                return function (c, d, e) {
                    e || (b.busy.setFlag("media", !1), b.bigPlay.setFlag("media", !1), "audio" !== a.mediaFile.type && b.previewFlag.setFlag("media", !1), b.checkVisibility())
                }
            }(this)), a.ubind(this.uuid + ":pause", function (a) {
                return function (b, c, d) {
                    d || (a.busy.setFlag("media", !1), a.bigPlay.setFlag("media", !0), a.checkVisibility())
                }
            }(this))
        }
    })
}, minplayer.playLoader.prototype.clear = function (a) {
    this.busy = new minplayer.flags, this.bigPlay = new minplayer.flags, this.previewFlag = new minplayer.flags, this.enabled = !0, this.preview ? this.preview.clear(function (b) {
        return function () {
            b.preview = null, a && a()
        }
    }(this)) : (this.preview = null, a && a())
}, minplayer.playLoader.prototype.loadPreview = function (a) {
    if (a = a || this.options.preview, this.options.preview = a, this.enabled && 0 !== this.display.length) {
        if (this.elements.preview) {
            if (this.options.preview)return this.elements.preview.addClass("has-preview").show(), this.preview = new minplayer.image(this.elements.preview, this.options), this.preview.load(this.options.preview), !0;
            this.elements.preview.hide()
        }
        return !1
    }
}, minplayer.playLoader.prototype.checkVisibility = function () {
    this.enabled && (this.busy.flag ? this.elements.busy.show() : this.elements.busy.hide(), this.bigPlay.flag ? this.elements.bigPlay.show() : this.elements.bigPlay.hide(), this.previewFlag.flag ? this.elements.preview.show() : this.elements.preview.hide(), (this.bigPlay.flag || this.busy.flag || this.previewFlag.flag) && this.display.show(), this.bigPlay.flag || this.busy.flag || this.previewFlag.flag || this.display.hide())
};
var minplayer = minplayer || {};
minplayer.players = minplayer.players || {}, minplayer.players.base = function (a, b, c) {
    minplayer.display.call(this, "media", a, b, c)
}, minplayer.players.base.prototype = new minplayer.display, minplayer.players.base.prototype.constructor = minplayer.players.base, minplayer.players.base.prototype.getElements = function () {
    var a = minplayer.display.prototype.getElements.call(this);
    return jQuery.extend(a, {media: this.options.mediaelement})
}, minplayer.players.base.prototype.defaultOptions = function (a) {
    a.range = {min: 0, max: 0}, minplayer.display.prototype.defaultOptions.call(this, a)
}, minplayer.players.base.getPriority = function () {
    return 0
}, minplayer.players.base.getMediaId = function () {
    return ""
}, minplayer.players.base.canPlay = function () {
    return !1
}, minplayer.players.base.prototype.construct = function () {
    minplayer.display.prototype.construct.call(this), this.elements.media && (this.poster = this.elements.media.attr("poster")), this.options.pluginName = "basePlayer", this.readyQueue = [], this.loadedQueue = [], this.mediaFile = this.options.file, this.clear(), this.setupPlayer()
}, minplayer.players.base.prototype.setupPlayer = function () {
    this.playerFound() || this.addPlayer(), this.player = this.getPlayer(), minplayer.click(this.display, function (a) {
        return function () {
            a.playing ? a.pause() : a.play()
        }
    }(this)), jQuery(document).bind("keydown", function (a) {
        return function (b) {
            if (a.hasFocus)switch (b.preventDefault(), b.keyCode) {
                case 32:
                case 179:
                    a.playing ? a.pause() : a.play();
                    break;
                case 38:
                    a.setVolumeRelative(.1);
                    break;
                case 40:
                    a.setVolumeRelative(-.1);
                    break;
                case 37:
                case 227:
                    a.seekRelative(-.05);
                    break;
                case 39:
                case 228:
                    a.seekRelative(.05)
            }
        }
    }(this))
}, minplayer.players.base.prototype.addPlayer = function () {
    this.elements.media && this.elements.media.remove(), this.elements.media = jQuery(this.createPlayer()), this.display.html(this.elements.media)
}, minplayer.players.base.prototype.destroy = function () {
    minplayer.plugin.prototype.destroy.call(this), this.clear()
}, minplayer.players.base.prototype.clear = function () {
    this.playerReady = !1, this.reset(), this.player && (jQuery(this.player).remove(), this.player = null)
}, minplayer.players.base.prototype.reset = function () {
    this.realDuration = 0, this.duration = new minplayer.async, this.currentTime = new minplayer.async, this.bytesLoaded = new minplayer.async, this.bytesTotal = new minplayer.async, this.bytesStart = new minplayer.async, this.volume = new minplayer.async, this.hasFocus = !1, this.playing = !1, this.loading = !1, this.loaded = !1, this.trigger("pause", null, !0), this.trigger("waiting", null, !0), this.trigger("progress", {
        loaded: 0,
        total: 0,
        start: 0
    }, !0), this.trigger("timeupdate", {currentTime: 0, duration: 0}, !0)
}, minplayer.players.base.prototype.onReady = function () {
    if (!this.playerReady)if (this.setStartStop(), this.playerReady = !0, this.setVolume(this.options.volume / 100), this.loading = !0, this.poll("progress", function (a) {
            return function () {
                return a.loading && a.getBytesLoaded(function (b) {
                    a.getBytesTotal(function (c) {
                        if (b || c) {
                            var d = 0;
                            a.getBytesStart(function (a) {
                                d = a
                            }), a.trigger("progress", {loaded: b, total: c, start: d}), b >= c && (a.loading = !1)
                        }
                    })
                }), a.loading
            }
        }(this), 1e3), this.ready(), this.isReady()) {
        for (var a in this.readyQueue)this.readyQueue.hasOwnProperty(a) && this.readyQueue[a].call(this);
        this.readyQueue.length = 0, this.readyQueue = [], this.loaded || this.trigger("loadstart")
    } else this.readyQueue.length = 0, this.readyQueue = []
}, minplayer.players.base.prototype.parseTime = function (a) {
    var b = 0, c = 0, d = 0;
    return a ? ("string" != typeof a && (a = String(a)), b = a.match(/([0-9]+)s/i), b && (b = parseInt(b[1], 10)), c = a.match(/([0-9]+)m/i), c && (b += 60 * parseInt(c[1], 10)), d = a.match(/([0-9]+)h/i), d && (b += 3600 * parseInt(d[1], 10)), b || (b = a), Number(b)) : 0
}, minplayer.players.base.prototype.setStartStop = function () {
    return this.startTime ? this.startTime : (this.startTime = 0, this.offsetTime = this.parseTime(this.options.range.min), minplayer.urlVars && (this.startTime = this.parseTime(minplayer.urlVars.seek)), this.startTime || (this.startTime = this.offsetTime), this.stopTime = this.options.range.max ? this.parseTime(this.options.range.max) : 0, this.mediaRange = this.stopTime - this.offsetTime, this.mediaRange < 0 && (this.mediaRange = 0), this.startTime)
}, minplayer.players.base.prototype.timeUpdate = function () {
    this.getCurrentTime(function (a) {
        this.getDuration(function (b) {
            a = parseFloat(a), b = parseFloat(b), (a || b) && this.trigger("timeupdate", {currentTime: a, duration: b})
        }.bind(this))
    }.bind(this))
}, minplayer.players.base.prototype.onPlaying = function () {
    if (!this.playing) {
        var a = this;
        this.getDuration(function (b) {
            a.startTime && a.startTime < b && (a.seek(a.startTime, null, !0), a.options.autoplay && a.play())
        })
    }
    this.trigger("playing"), this.hasFocus = !0, this.playing = !0, this.loaded = !0, this.poll("timeupdate", function (a) {
        return function () {
            return a.playing && a.timeUpdate(), a.playing
        }
    }(this), 500)
}, minplayer.players.base.prototype.onPaused = function () {
    this.trigger("pause"), this.hasFocus = !1, this.playing = !1
}, minplayer.players.base.prototype.onComplete = function () {
    this.playing && this.onPaused(), this.playing = !1, this.loading = !1, this.hasFocus = !1, this.trigger("ended")
}, minplayer.players.base.prototype.onLoaded = function () {
    this.loaded;
    !this.loaded && this.options.autoplay && this.play(), this.loaded = !0;
    for (var a in this.loadedQueue)this.loadedQueue.hasOwnProperty(a) && this.loadedQueue[a].call(this);
    this.loadedQueue.length = 0, this.loadedQueue = [], this.trigger("loadeddata")
}, minplayer.players.base.prototype.onWaiting = function () {
    this.trigger("waiting")
}, minplayer.players.base.prototype.onError = function (a) {
    this.hasFocus = !1, this.trigger("error", a)
}, minplayer.players.base.prototype.isReady = function () {
    return this.player && this.playerReady
}, minplayer.players.base.prototype.whenReady = function (a) {
    this.isReady() ? a.call(this) : this.readyQueue.push(a)
}, minplayer.players.base.prototype.whenLoaded = function (a) {
    this.loaded ? a.call(this) : this.loadedQueue.push(a)
}, minplayer.players.base.prototype.hasPlayLoader = function () {
    return !1
}, minplayer.players.base.prototype.hasController = function () {
    return !1
}, minplayer.players.base.prototype.playerFound = function () {
    return !1
}, minplayer.players.base.prototype.createPlayer = function () {
    return this.reset(), null
}, minplayer.players.base.prototype.getPlayer = function () {
    return this.player
}, minplayer.players.base.prototype.load = function (a, b) {
    var c = "string" == typeof this.mediaFile, d = c ? this.mediaFile : this.mediaFile.path;
    a && a.path !== d ? (this.isReady() || this.setupPlayer(), this.reset(), this.mediaFile = a, b && b.call(this)) : this.options.autoplay && !this.playing ? this.play() : this.seek(0, function () {
        this.pause(), this.trigger("progress", {
            loaded: 0,
            total: 0,
            start: 0
        }, !0), this.trigger("timeupdate", {currentTime: 0, duration: 0}, !0)
    })
}, minplayer.players.base.prototype.play = function (a) {
    this.options.autoload = !0, "undefined" == typeof this.options.originalAutoPlay && (this.options.originalAutoPlay = this.options.autoplay), this.options.autoplay = !0, this.whenLoaded(a)
}, minplayer.players.base.prototype.pause = function (a) {
    this.whenLoaded(a)
}, minplayer.players.base.prototype.stop = function (a) {
    this.playing = !1, this.loading = !1, this.hasFocus = !1, this.whenLoaded(a)
}, minplayer.players.base.prototype.seekRelative = function (a) {
    this.getCurrentTime(function (b) {
        return function (c) {
            b.getDuration(function (d) {
                if (d) {
                    var e = 0;
                    e = a > -1 && 1 > a ? (c / d + parseFloat(a)) * d : c + parseFloat(a), b.seek(e)
                }
            })
        }
    }(this))
}, minplayer.players.base.prototype.seek = function (a, b, c) {
    this.whenLoaded(function () {
        a = Number(a), c || (a += this.offsetTime), this._seek(a), this.timeUpdate(), b && b.call(this)
    })
}, minplayer.players.base.prototype._seek = function () {
}, minplayer.players.base.prototype.setVolumeRelative = function (a) {
    this.getVolume(function (b) {
        return function (c) {
            c += parseFloat(a), c = 0 > c ? 0 : c, c = c > 1 ? 1 : c, b.setVolume(c)
        }
    }(this))
}, minplayer.players.base.prototype.setVolume = function (a, b) {
    this.trigger("volumeupdate", a), this.whenLoaded(b)
}, minplayer.players.base.prototype.getValue = function (a, b, c) {
    this.whenLoaded(function () {
        var d = this;
        this[a](function (a) {
            null !== a ? c.call(d, a) : d[b].get(c)
        })
    })
}, minplayer.players.base.prototype.getVolume = function (a) {
    this.getValue("_getVolume", "volume", a)
}, minplayer.players.base.prototype._getVolume = function (a) {
    a(null)
}, minplayer.players.base.prototype.getCurrentTime = function (a) {
    var b = this;
    this.getValue("_getCurrentTime", "currentTime", function (c) {
        b.setStartStop(), b.stopTime && c > b.stopTime && b.stop(function () {
            b.onComplete()
        }), c -= b.offsetTime, a(c)
    })
}, minplayer.players.base.prototype._getCurrentTime = function (a) {
    a(null)
}, minplayer.players.base.prototype.getDuration = function (a) {
    if (this.options.duration)a(this.options.duration); else {
        var b = this;
        this.getValue("_getDuration", "duration", function (c) {
            b.setStartStop(), b.realDuration = c, a(b.mediaRange ? b.mediaRange : c)
        })
    }
}, minplayer.players.base.prototype._getDuration = function (a) {
    a(null)
}, minplayer.players.base.prototype.getBytesStart = function (a) {
    this.getValue("_getBytesStart", "bytesStart", a)
}, minplayer.players.base.prototype._getBytesStart = function (a) {
    a(null)
}, minplayer.players.base.prototype.getBytesLoaded = function (a) {
    this.getValue("_getBytesLoaded", "bytesLoaded", a)
}, minplayer.players.base.prototype._getBytesLoaded = function (a) {
    a(null)
}, minplayer.players.base.prototype.getBytesTotal = function (a) {
    this.getValue("_getBytesTotal", "bytesTotal", a)
}, minplayer.players.base.prototype._getBytesTotal = function (a) {
    a(null)
};
var minplayer = minplayer || {};
minplayer.players = minplayer.players || {}, minplayer.players.dailymotion = function (a, b, c) {
    this.quality = "380", minplayer.players.base.call(this, a, b, c)
}, minplayer.players.dailymotion.prototype = new minplayer.players.base, minplayer.players.dailymotion.prototype.constructor = minplayer.players.dailymotion, minplayer.players.dailymotion.prototype.construct = function () {
    minplayer.players.base.prototype.construct.call(this), this.options.pluginName = "dailymotion"
}, minplayer.players.dailymotion.getPriority = function () {
    return 10
}, minplayer.players.dailymotion.canPlay = function (a) {
    if ("video/dailymotion" === a.mimetype)return !0;
    var b = /^http(s)?\:\/\/(www\.)?(dailymotion\.com)/i;
    return 0 === a.path.search(b)
}, minplayer.players.dailymotion.getMediaId = function (a) {
    var b = "^http[s]?\\:\\/\\/(www\\.)?";
    b += "(dailymotion\\.com\\/video/)", b += "([a-z0-9\\-]+)", b += "_*";
    var c = RegExp(b, "i");
    return 0 === a.path.search(c) ? a.path.match(c)[3] : a.path
}, minplayer.players.dailymotion.getImage = function (a, b, c) {
    c("http://www.dailymotion.com/thumbnail/video/" + a.id)
}, minplayer.players.dailymotion.parseNode = function () {
    return {
        title: node.title,
        description: node.description,
        mediafiles: {
            image: {thumbnail: {path: node.thumbnail_small_url}, image: {path: node.thumbnail_url}},
            media: {media: {player: "dailymotion", id: node.id}}
        }
    }
}, minplayer.players.dailymotion.getNode = function (a, b) {
    var c = "https://api.dailymotion.com/video/" + a.id;
    c += "?fields=title,id,description,thumbnail_small_url,thumbnail_url", jQuery.get(c, function (a) {
        b(minplayer.players.dailymotion.parseNode(a.data))
    }, "jsonp")
}, minplayer.players.dailymotion.prototype.onReady = function () {
    minplayer.players.base.prototype.onReady.call(this), this.options.autoplay || this.pause(), this.onLoaded()
}, minplayer.players.dailymotion.prototype.playerFound = function () {
    return this.display.find(this.mediaFile.type).length > 0
}, minplayer.players.dailymotion.prototype.onQualityChange = function (a) {
    this.quality = a.data
}, minplayer.players.dailymotion.prototype.hasPlayLoader = function (a) {
    return minplayer.hasTouch || !a
}, minplayer.players.dailymotion.prototype.hasController = function () {
    return minplayer.isIDevice
}, minplayer.players.dailymotion.prototype.createPlayer = function () {
    minplayer.players.base.prototype.createPlayer.call(this);
    var a = document.location.protocol;
    if (a += "//api.dmcdn.net/all.js", 0 === jQuery('script[src="' + a + '"]').length) {
        var b = document.createElement("script");
        b.src = a;
        var c = document.getElementsByTagName("script")[0];
        c.parentNode.insertBefore(b, c)
    }
    return this.playerId = this.options.id + "-player", this.poll(this.options.id + "_dailymotion", function (a) {
        return function () {
            var b = jQuery("#" + a.playerId).length > 0;
            if (b = b && "DM" in window, b = b && "function" == typeof DM.player) {
                jQuery("#" + a.playerId).addClass("dailymotion-player");
                var c = {};
                c = {
                    id: a.playerId,
                    api: minplayer.isIDevice ? 0 : 1,
                    wmode: "opaque",
                    controls: minplayer.isAndroid ? 1 : 0,
                    related: 0,
                    info: 0,
                    logo: 0
                }, a.player = new DM.player(a.playerId, {
                    video: a.mediaFile.id,
                    height: "100%",
                    width: "100%",
                    frameborder: 0,
                    params: c
                }), a.player.addEventListener("apiready", function () {
                    a.onReady(a)
                }), a.player.addEventListener("ended", function () {
                    a.onComplete(a)
                }), a.player.addEventListener("playing", function () {
                    a.onPlaying(a)
                }), a.player.addEventListener("progress", function () {
                    a.onWaiting(a)
                }), a.player.addEventListener("pause", function () {
                    a.onPaused(a)
                }), a.player.addEventListener("error", function () {
                    a.onError(a)
                })
            }
            return !b
        }
    }(this), 200), jQuery(document.createElement("div")).attr({id: this.playerId})
}, minplayer.players.dailymotion.prototype.load = function (a, b) {
    minplayer.players.base.prototype.load.call(this, a, function () {
        this.player.load(a.id), b && b.call(this)
    })
}, minplayer.players.dailymotion.prototype.play = function (a) {
    minplayer.players.base.prototype.play.call(this, function () {
        this.onWaiting(), this.player.play(), a && a.call(this)
    })
}, minplayer.players.dailymotion.prototype.pause = function (a) {
    minplayer.players.base.prototype.pause.call(this, function () {
        this.loaded && (this.player.pause(), a && a.call(this))
    })
}, minplayer.players.dailymotion.prototype.stop = function (a) {
    minplayer.players.base.prototype.stop.call(this, function () {
        this.player.pause(), this.player.seek(0), a && a.call(this)
    })
}, minplayer.players.dailymotion.prototype._seek = function (a) {
    this.onWaiting(), this.player.seek(a)
}, minplayer.players.dailymotion.prototype.setVolume = function (a, b) {
    minplayer.players.base.prototype.setVolume.call(this, a, function () {
        this.loaded && (this.player.setVolume(a), void 0 !== b && b.call(this))
    })
}, minplayer.players.dailymotion.prototype._getVolume = function (a) {
    a(this.player.volume)
}, minplayer.players.dailymotion.prototype._getDuration = function (a) {
    a(this.player.duration)
}, minplayer.players.dailymotion.prototype._getCurrentTime = function (a) {
    a(this.player.currentTime)
};
var minplayer = minplayer || {};
minplayer.players = minplayer.players || {}, minplayer.players.html5 = function (a, b, c) {
    minplayer.players.base.call(this, a, b, c)
}, minplayer.players.html5.prototype = new minplayer.players.base, minplayer.players.html5.prototype.constructor = minplayer.players.html5, minplayer.players.html5.getPriority = function () {
    return 10
}, minplayer.players.html5.canPlay = function (a) {
    switch (a.mimetype) {
        case"video/ogg":
            return !!minplayer.playTypes.videoOGG;
        case"video/mp4":
        case"video/x-mp4":
        case"video/m4v":
        case"video/x-m4v":
            return !!minplayer.playTypes.videoH264;
        case"application/vnd.apple.mpegurl":
            return !!minplayer.playTypes.videoMPEGURL;
        case"video/x-webm":
        case"video/webm":
        case"application/octet-stream":
            return !!minplayer.playTypes.videoWEBM;
        case"audio/ogg":
            return !!minplayer.playTypes.audioOGG;
        case"audio/mpeg":
            return !!minplayer.playTypes.audioMP3;
        case"audio/mp4":
            return !!minplayer.playTypes.audioMP4;
        default:
            return !1
    }
}, minplayer.players.html5.prototype.construct = function () {
    minplayer.players.base.prototype.construct.call(this), this.options.pluginName = "html5", this.hasEnded = !1, this.addPlayerEvents()
}, minplayer.players.html5.prototype.addPlayerEvent = function (a, b) {
    this.player && this.player.addEventListener(a, function (c) {
        var d = a + "Event";
        return c[d] && c.player.removeEventListener(a, c[d], !1), c[d] = function (a) {
            b.call(c, a)
        }, c[d]
    }(this), !1)
}, minplayer.players.html5.prototype.addPlayerEvents = function () {
    if (this.player) {
        this.addPlayerEvent("abort", function () {
            this.trigger("abort")
        }), this.addPlayerEvent("loadstart", function () {
            this.onReady(), this.options.autoload || this.onLoaded()
        }), this.addPlayerEvent("loadeddata", function () {
            this.onLoaded()
        }), this.addPlayerEvent("loadedmetadata", function () {
            this.onLoaded()
        }), this.addPlayerEvent("canplaythrough", function () {
            this.onLoaded()
        }), this.addPlayerEvent("ended", function () {
            this.hasEnded = !0, this.onComplete()
        }), this.addPlayerEvent("pause", function () {
            this.onPaused()
        }), this.addPlayerEvent("play", function () {
            this.onPlaying()
        }), this.addPlayerEvent("playing", function () {
            this.onPlaying()
        });
        var a = !1;
        return this.addPlayerEvent("error", function () {
            this.hasEnded || a || !this.player || (a = !0, this.trigger("error", "An error occured - " + this.player.error.code))
        }), this.addPlayerEvent("waiting", function () {
            this.onWaiting()
        }), this.addPlayerEvent("durationchange", function () {
            if (this.player) {
                this.duration.set(this.player.duration);
                var a = this;
                this.getDuration(function (b) {
                    a.trigger("durationchange", {duration: b})
                })
            }
        }), this.addPlayerEvent("progress", function (a) {
            this.bytesTotal.set(a.total), this.bytesLoaded.set(a.loaded)
        }), !0
    }
    return !1
}, minplayer.players.html5.prototype.onReady = function () {
    minplayer.players.base.prototype.onReady.call(this), minplayer.isAndroid && this.onLoaded(), minplayer.isIDevice && setTimeout(function (a) {
        return function () {
            a.pause(), a.onLoaded()
        }
    }(this), 1)
}, minplayer.players.html5.prototype.playerFound = function () {
    return this.display.find(this.mediaFile.type).length > 0
}, minplayer.players.html5.prototype.createPlayer = function () {
    minplayer.players.base.prototype.createPlayer.call(this);
    var a = jQuery(document.createElement(this.mediaFile.type)).attr(this.options.attributes).append(jQuery(document.createElement("source")).attr({src: this.mediaFile.path}));
    a.eq(0)[0].setAttribute("width", "100%"), a.eq(0)[0].setAttribute("height", "100%");
    var b = this.options.autoload ? "metadata" : "none";
    return b = minplayer.isIDevice ? "metadata" : b, a.eq(0)[0].setAttribute("preload", b), this.options.autoload || a.eq(0)[0].setAttribute("autobuffer", !1), a
}, minplayer.players.html5.prototype.getPlayer = function () {
    return this.elements.media.eq(0)[0]
}, minplayer.players.html5.prototype.load = function (a, b) {
    minplayer.players.base.prototype.load.call(this, a, function () {
        this.hasEnded = !1;
        var c = this.elements.media.attr("src");
        c || (c = jQuery("source", this.elements.media).eq(0).attr("src")), c !== a.path && (this.addPlayer(), this.player = this.getPlayer(), this.addPlayerEvents(), this.player.src = a.path, b && b.call(this))
    })
}, minplayer.players.html5.prototype.play = function (a) {
    minplayer.players.base.prototype.play.call(this, function () {
        this.player.play(), a && a.call(this)
    })
}, minplayer.players.html5.prototype.pause = function (a) {
    minplayer.players.base.prototype.pause.call(this, function () {
        this.player.pause(), a && a.call(this)
    })
}, minplayer.players.html5.prototype.stop = function (a) {
    minplayer.players.base.prototype.stop.call(this, function () {
        this.player.pause(), a && a.call(this)
    })
}, minplayer.players.html5.prototype.clear = function () {
    minplayer.players.base.prototype.clear.call(this), this.player && (this.player.src = "")
}, minplayer.players.html5.prototype._seek = function (a) {
    this.player.currentTime = a
}, minplayer.players.html5.prototype.setVolume = function (a, b) {
    minplayer.players.base.prototype.setVolume.call(this, a, function () {
        this.player.volume = a, b && b.call(this)
    })
}, minplayer.players.html5.prototype._getVolume = function (a) {
    a(this.player.volume)
}, minplayer.players.html5.prototype._getDuration = function (a) {
    a(this.player.duration)
}, minplayer.players.html5.prototype._getCurrentTime = function (a) {
    a(this.player.currentTime)
}, minplayer.players.html5.prototype._getBytesLoaded = function (a) {
    var b = 0;
    this.bytesLoaded.value ? b = this.bytesLoaded.value : this.player.buffered && this.player.buffered.length > 0 && this.player.buffered.end && this.player.duration ? b = this.player.buffered.end(0) : void 0 !== this.player.bytesTotal && this.player.bytesTotal > 0 && void 0 !== this.player.bufferedBytes && (b = this.player.bufferedBytes), a(b)
}, minplayer.players.html5.prototype._getBytesTotal = function (a) {
    var b = 0;
    this.bytesTotal.value ? b = this.bytesTotal.value : this.player.buffered && this.player.buffered.length > 0 && this.player.buffered.end && this.player.duration ? b = this.player.duration : void 0 !== this.player.bytesTotal && this.player.bytesTotal > 0 && void 0 !== this.player.bufferedBytes && (b = this.player.bytesTotal), a(b)
};
var minplayer = minplayer || {};
minplayer.players = minplayer.players || {}, minplayer.players.flash = function (a, b, c) {
    minplayer.players.base.call(this, a, b, c)
}, minplayer.players.flash.prototype = new minplayer.players.base, minplayer.players.flash.prototype.constructor = minplayer.players.flash, minplayer.players.flash.prototype.construct = function () {
    minplayer.players.base.prototype.construct.call(this), this.options.pluginName = "flash"
}, minplayer.players.flash.getPriority = function () {
    return 0
}, minplayer.players.flash.canPlay = function () {
    return !1
}, minplayer.players.flash.prototype.getFlash = function (a) {
    var b = document.createElement("script");
    b.src = "//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js";
    var c = document.getElementsByTagName("script")[0];
    return c.parentNode.insertBefore(b, c), setTimeout(function (b) {
        return function c() {
            "undefined" != typeof swfobject ? swfobject.embedSWF(a.swf, a.id, a.width, a.height, "9.0.0", !1, a.flashvars, {
                allowscriptaccess: "always",
                allowfullscreen: "true",
                wmode: a.wmode,
                quality: "high"
            }, {id: a.id, name: a.id, playerType: "flash"}, function (a) {
                b.player = a.ref
            }) : setTimeout(c, 200)
        }
    }(this), 200), '<div id="' + a.id + '"></div>'
}, minplayer.players.flash.prototype.playerFound = function () {
    return this.display.find('object[playerType="flash"]').length > 0
};
var minplayer = minplayer || {};
minplayer.players = minplayer.players || {}, minplayer.players.minplayer = function (a, b, c) {
    minplayer.players.flash.call(this, a, b, c)
}, minplayer.players.minplayer.prototype = new minplayer.players.flash, minplayer.players.minplayer.prototype.constructor = minplayer.players.minplayer, minplayer.players.minplayer.prototype.construct = function () {
    minplayer.players.flash.prototype.construct.call(this), this.options.pluginName = "minplayer"
}, window.onFlashPlayerReady = function (a) {
    for (var b = minplayer.get(a, "media"), c = b.length; c--;)b[c].onReady()
}, window.onFlashPlayerUpdate = function (a, b) {
    for (var c = minplayer.get(a, "media"), d = c.length; d--;)c[d].onMediaUpdate(b)
}, window.onFlashPlayerDebug = function (a) {
    console && console.log && console.log(a)
}, minplayer.players.minplayer.getPriority = function (a) {
    return a.stream ? 100 : 1
}, minplayer.players.minplayer.canPlay = function (a) {
    if (a.stream)return !0;
    var b = jQuery.inArray(a.mimetype, ["video/x-webm", "video/webm", "application/octet-stream"]) >= 0;
    return !b && ("video" === a.type || "audio" === a.type)
}, minplayer.players.minplayer.prototype.createPlayer = function () {
    this.options.swfplayer || (this.options.swfplayer = "http://mediafront.org/assets/osmplayer/minplayer", this.options.swfplayer += "/flash/minplayer.swf"), minplayer.players.flash.prototype.createPlayer.call(this);
    var a = {
        id: this.options.id,
        debug: this.options.debug,
        config: "nocontrols",
        file: this.mediaFile.path,
        autostart: this.options.autoplay,
        autoload: this.options.autoload
    };
    return this.mediaFile.stream && (a.stream = this.mediaFile.stream), this.getFlash({
        swf: this.options.swfplayer,
        id: this.options.id + "_player",
        width: "100%",
        height: "100%",
        flashvars: a,
        wmode: this.options.wmode
    })
}, minplayer.players.minplayer.prototype.onMediaUpdate = function (a) {
    switch (this.onReady(), a) {
        case"mediaMeta":
            this.onLoaded();
            break;
        case"mediaConnected":
            this.onLoaded(), this.onPaused();
            break;
        case"mediaPlaying":
            this.onPlaying();
            break;
        case"mediaPaused":
            this.onPaused();
            break;
        case"mediaComplete":
            this.onComplete()
    }
}, minplayer.players.minplayer.prototype.load = function (a, b) {
    minplayer.players.flash.prototype.load.call(this, a, function () {
        this.loaded ? this.stop(function () {
            this.player.loadMedia(a.path, a.stream), b && b.call(this)
        }) : (this.player.loadMedia(a.path, a.stream), b && b.call(this))
    })
}, minplayer.players.minplayer.prototype.play = function (a) {
    minplayer.players.flash.prototype.play.call(this, function () {
        this.player.playMedia(), a && a.call(this)
    })
}, minplayer.players.minplayer.prototype.pause = function (a) {
    minplayer.players.flash.prototype.pause.call(this, function () {
        this.player.pauseMedia(), a && a.call(this)
    })
}, minplayer.players.minplayer.prototype.stop = function (a) {
    minplayer.players.flash.prototype.stop.call(this, function () {
        this.player.stopMedia(), a && a.call(this)
    })
}, minplayer.players.minplayer.prototype._seek = function (a) {
    this.player.seekMedia(a)
}, minplayer.players.minplayer.prototype.setVolume = function (a, b) {
    minplayer.players.flash.prototype.setVolume.call(this, a, function () {
        this.player.setVolume(a), b && b.call(this)
    })
}, minplayer.players.minplayer.prototype._getVolume = function (a) {
    a(this.player.getVolume())
}, minplayer.players.minplayer.prototype._getDuration = function (a) {
    var b = this, c = 0, d = function () {
        c = b.player.getDuration(), c ? a(c) : setTimeout(d, 1e3)
    };
    d()
}, minplayer.players.minplayer.prototype._getCurrentTime = function (a) {
    a(this.player.getCurrentTime())
}, minplayer.players.minplayer.prototype._getBytesLoaded = function (a) {
    a(this.player.getMediaBytesLoaded())
}, minplayer.players.minplayer.prototype._getBytesTotal = function (a) {
    a(this.player.getMediaBytesTotal())
};
var minplayer = minplayer || {};
minplayer.players = minplayer.players || {}, minplayer.players.youtube = function (a, b, c) {
    this.quality = "default", minplayer.players.base.call(this, a, b, c)
}, minplayer.players.youtube.prototype = new minplayer.players.base, minplayer.players.youtube.prototype.constructor = minplayer.players.youtube, minplayer.players.youtube.prototype.construct = function () {
    minplayer.players.base.prototype.construct.call(this), this.options.pluginName = "youtube"
}, minplayer.players.youtube.getPriority = function () {
    return 10
}, minplayer.players.youtube.canPlay = function (a) {
    if ("video/youtube" === a.mimetype)return !0;
    var b = /^http(s)?\:\/\/(www\.)?(youtube\.com|youtu\.be)/i;
    return 0 === a.path.search(b)
}, minplayer.players.youtube.getMediaId = function (a) {
    var b = "^http[s]?\\:\\/\\/(www\\.)?";
    b += "(youtube\\.com\\/watch\\?v=|youtu\\.be\\/)", b += "([a-zA-Z0-9_\\-]+)";
    var c = RegExp(b, "i");
    return 0 === a.path.search(c) ? a.path.match(c)[3] : a.path
}, minplayer.players.youtube.getImage = function (a, b, c) {
    b = "thumbnail" === b ? "1" : "0", c("https://img.youtube.com/vi/" + a.id + "/" + b + ".jpg")
}, minplayer.players.youtube.parseNode = function (a) {
    var b = "undefined" != typeof a.video ? a.video : a;
    return {
        title: b.title,
        description: b.description,
        mediafiles: {
            image: {thumbnail: {path: b.thumbnail.sqDefault}, image: {path: b.thumbnail.hqDefault}},
            media: {media: {player: "youtube", id: b.id}}
        }
    }
}, minplayer.players.youtube.getNode = function (a, b) {
    var c = "https://gdata.youtube.com/feeds/api/videos/" + a.id;
    c += "?v=2&alt=jsonc", jQuery.get(c, function (a) {
        b(minplayer.players.youtube.parseNode(a.data))
    })
}, minplayer.players.youtube.prototype.setPlayerState = function (a) {
    switch (a) {
        case YT.PlayerState.CUED:
            break;
        case YT.PlayerState.BUFFERING:
            this.onWaiting();
            break;
        case YT.PlayerState.UNSTARTED:
        case YT.PlayerState.PAUSED:
            this.onPaused();
            break;
        case YT.PlayerState.PLAYING:
            this.onPlaying();
            break;
        case YT.PlayerState.ENDED:
            this.onComplete()
    }
}, minplayer.players.youtube.prototype.onReady = function () {
    minplayer.players.base.prototype.onReady.call(this), this.options.autoplay || this.pause(), this.onLoaded()
}, minplayer.players.youtube.prototype.playerFound = function () {
    var a = "iframe#" + this.options.id + "-player.youtube-player", b = this.display.find(a);
    return b.length > 0
}, minplayer.players.youtube.prototype.onPlayerStateChange = function (a) {
    this.setPlayerState(a.data)
}, minplayer.players.youtube.prototype.onQualityChange = function (a) {
    this.quality = a.data
}, minplayer.players.youtube.prototype.hasPlayLoader = function (a) {
    return minplayer.hasTouch || !a
}, minplayer.players.youtube.prototype.hasController = function () {
    return minplayer.isIDevice
}, minplayer.players.youtube.prototype.createPlayer = function () {
    minplayer.players.base.prototype.createPlayer.call(this);
    var a = "https://www.youtube.com/iframe_api";
    if (0 === jQuery('script[src="' + a + '"]').length) {
        var b = document.createElement("script");
        b.src = a;
        var c = document.getElementsByTagName("script")[0];
        c.parentNode.insertBefore(b, c)
    }
    return this.playerId = this.options.id + "-player", this.poll(this.options.id + "_youtube", function (a) {
        return function () {
            var b = jQuery("#" + a.playerId).length > 0;
            if (b = b && "YT" in window, b = b && "function" == typeof YT.Player) {
                jQuery("#" + a.playerId).addClass("youtube-player");
                var c = location.protocol;
                c += "//" + location.hostname, c += location.port && ":" + location.port;
                var d = {};
                minplayer.isIDevice ? d.origin = c : d = {
                    enablejsapi: minplayer.isIDevice ? 0 : 1,
                    origin: c,
                    wmode: "opaque",
                    controls: minplayer.isAndroid ? 1 : 0,
                    rel: 0,
                    showinfo: 0
                }, a.player = new YT.Player(a.playerId, {
                    height: "100%",
                    width: "100%",
                    frameborder: 0,
                    videoId: a.mediaFile.id,
                    playerVars: d,
                    events: {
                        onReady: function (b) {
                            a.onReady(b)
                        }, onStateChange: function (b) {
                            a.onPlayerStateChange(b)
                        }, onPlaybackQualityChange: function (b) {
                            a.onQualityChange(b)
                        }, onError: function (b) {
                            a.onError(b)
                        }
                    }
                })
            }
            return !b
        }
    }(this), 200), jQuery(document.createElement("div")).attr({id: this.playerId})
}, minplayer.players.youtube.prototype.load = function (a, b) {
    minplayer.players.base.prototype.load.call(this, a, function () {
        this.player.loadVideoById(a.id, 0, this.quality), b && b.call(this)
    })
}, minplayer.players.youtube.prototype.play = function (a) {
    minplayer.players.base.prototype.play.call(this, function () {
        this.onWaiting(), this.player.playVideo(), a && a.call(this)
    })
}, minplayer.players.youtube.prototype.pause = function (a) {
    minplayer.players.base.prototype.pause.call(this, function () {
        this.player.pauseVideo(), a && a.call(this)
    })
}, minplayer.players.youtube.prototype.stop = function (a) {
    minplayer.players.base.prototype.stop.call(this, function () {
        this.player.stopVideo(), this.player.seekTo(0, !0), a && a.call(this)
    })
}, minplayer.players.youtube.prototype._seek = function (a) {
    this.onWaiting(), this.player.seekTo(a, !0)
}, minplayer.players.youtube.prototype.setVolume = function (a, b) {
    minplayer.players.base.prototype.setVolume.call(this, a, function () {
        this.player.setVolume(100 * a), b && b.call(this)
    })
}, minplayer.players.youtube.prototype._getVolume = function (a) {
    a(this.player.getVolume())
}, minplayer.players.youtube.prototype._getDuration = function (a) {
    a(this.player.getDuration())
}, minplayer.players.youtube.prototype._getCurrentTime = function (a) {
    a(this.player.getCurrentTime())
}, minplayer.players.youtube.prototype._getBytesStart = function (a) {
    a(this.player.getVideoStartBytes())
}, minplayer.players.youtube.prototype._getBytesLoaded = function (a) {
    a(this.player.getVideoBytesLoaded())
}, minplayer.players.youtube.prototype._getBytesTotal = function (a) {
    a(this.player.getVideoBytesTotal())
};
var minplayer = minplayer || {};
minplayer.players = minplayer.players || {}, minplayer.players.vimeo = function (a, b, c) {
    minplayer.players.base.call(this, a, b, c)
}, minplayer.players.vimeo.prototype = new minplayer.players.base, minplayer.players.vimeo.prototype.constructor = minplayer.players.vimeo, minplayer.players.vimeo.prototype.construct = function () {
    minplayer.players.base.prototype.construct.call(this), this.options.pluginName = "vimeo"
}, minplayer.players.vimeo.getPriority = function () {
    return 10
}, minplayer.players.vimeo.canPlay = function (a) {
    return "video/vimeo" === a.mimetype ? !0 : 0 === a.path.search(/^http(s)?\:\/\/(www\.)?vimeo\.com/i)
}, minplayer.players.vimeo.prototype.hasPlayLoader = function () {
    return minplayer.hasTouch
}, minplayer.players.vimeo.prototype.hasController = function () {
    return minplayer.hasTouch
}, minplayer.players.vimeo.getMediaId = function (a) {
    var b = /^http[s]?\:\/\/(www\.)?vimeo\.com\/(\?v\=)?([0-9]+)/i;
    return 0 === a.path.search(b) ? a.path.match(b)[3] : a.path
}, minplayer.players.vimeo.parseNode = function (a) {
    return {
        title: a.title,
        description: a.description,
        mediafiles: {
            image: {thumbnail: {path: a.thumbnail_small}, image: {path: a.thumbnail_large}},
            media: {media: {player: "vimeo", id: a.id}}
        }
    }
}, minplayer.players.vimeo.nodes = {}, minplayer.players.vimeo.getNode = function (a, b) {
    minplayer.players.vimeo.nodes.hasOwnProperty(a.id) ? b(minplayer.players.vimeo.nodes[a.id]) : jQuery.ajax({
        url: "https://vimeo.com/api/v2/video/" + a.id + ".json",
        dataType: "jsonp",
        success: function (c) {
            var d = minplayer.players.vimeo.parseNode(c[0]);
            minplayer.players.vimeo.nodes[a.id] = d, b(d)
        }
    })
}, minplayer.players.vimeo.getImage = function (a, b, c) {
    minplayer.players.vimeo.getNode(a, function (a) {
        c(a.mediafiles.image.image)
    })
}, minplayer.players.vimeo.prototype.reset = function () {
    minplayer.players.base.prototype.reset.call(this)
}, minplayer.players.vimeo.prototype.createPlayer = function () {
    minplayer.players.base.prototype.createPlayer.call(this);
    var a = "http://a.vimeocdn.com/js/froogaloop2.min.js";
    if (0 === jQuery('script[src="' + a + '"]').length) {
        var b = document.createElement("script");
        b.src = a;
        var c = document.getElementsByTagName("script")[0];
        c.parentNode.insertBefore(b, c)
    }
    var d = document.createElement("iframe");
    d.setAttribute("id", this.options.id + "-player"), d.setAttribute("type", "text/html"), d.setAttribute("width", "100%"), d.setAttribute("height", "100%"), d.setAttribute("frameborder", "0"), jQuery(d).addClass("vimeo-player");
    var e = "https://player.vimeo.com/video/";
    return e += this.mediaFile.id + "?", e += jQuery.param({
        wmode: "opaque",
        api: 1,
        player_id: this.options.id + "-player",
        title: 0,
        byline: 0,
        portrait: 0,
        loop: this.options.loop
    }), d.setAttribute("src", e), this.poll(this.options.id + "_vimeo", function (a) {
        return function () {
            if (window.Froogaloop) {
                a.player = window.Froogaloop(d);
                var b = 0;
                a.player.addEvent("ready", function () {
                    clearTimeout(b), a.onReady(), a.onError("")
                }), b = setTimeout(function () {
                    a.onReady()
                }, 3e3)
            }
            return !window.Froogaloop
        }
    }(this), 200), this.trigger("loadstart"), d
}, minplayer.players.vimeo.prototype.onReady = function () {
    this.player.addEvent("loadProgress", function (a) {
        return function (b) {
            a.duration.set(parseFloat(b.duration)), a.bytesLoaded.set(b.bytesLoaded), a.bytesTotal.set(b.bytesTotal)
        }
    }(this)), this.player.addEvent("playProgress", function (a) {
        return function (b) {
            a.duration.set(parseFloat(b.duration)), a.currentTime.set(parseFloat(b.seconds))
        }
    }(this)), this.player.addEvent("play", function (a) {
        return function () {
            a.onPlaying()
        }
    }(this)), this.player.addEvent("pause", function (a) {
        return function () {
            a.onPaused()
        }
    }(this)), this.player.addEvent("finish", function (a) {
        return function () {
            a.onComplete()
        }
    }(this)), minplayer.players.base.prototype.onReady.call(this), this.onLoaded(), this.options.autoplay && this.play()
}, minplayer.players.vimeo.prototype.clear = function () {
    this.player && this.player.api("unload"), minplayer.players.base.prototype.clear.call(this)
}, minplayer.players.vimeo.prototype.load = function (a, b) {
    minplayer.players.base.prototype.load.call(this, a, function () {
        this.construct(), b && b.call(this)
    })
}, minplayer.players.vimeo.prototype.play = function (a) {
    minplayer.players.base.prototype.play.call(this, function () {
        this.player.api("play"), a && a.call(this)
    })
}, minplayer.players.vimeo.prototype.pause = function (a) {
    minplayer.players.base.prototype.pause.call(this, function () {
        this.player.api("pause"), a && a.call(this)
    })
}, minplayer.players.vimeo.prototype.stop = function (a) {
    minplayer.players.base.prototype.stop.call(this, function () {
        this.player.api("unload"), a && a.call(this)
    })
}, minplayer.players.vimeo.prototype._seek = function (a) {
    this.player.api("seekTo", a)
}, minplayer.players.vimeo.prototype.setVolume = function (a, b) {
    minplayer.players.base.prototype.setVolume.call(this, a, function () {
        this.volume.set(a), this.player.api("setVolume", a), b && b.call(this)
    })
}, minplayer.players.vimeo.prototype._getVolume = function (a) {
    this.player.api("getVolume", function (b) {
        a(b)
    })
}, minplayer.players.vimeo.prototype._getDuration = function (a) {
    this.player.api("getDuration", function (b) {
        a(b)
    })
};
var minplayer = minplayer || {};
minplayer.players = minplayer.players || {}, minplayer.players.limelight = function (a, b) {
    minplayer.players.flash.call(this, a, b)
}, minplayer.players.limelight.prototype = new minplayer.players.flash, minplayer.players.limelight.prototype.constructor = minplayer.players.limelight, minplayer.players.limelight.prototype.construct = function () {
    minplayer.players.flash.prototype.construct.call(this), this.options.pluginName = "limelight"
}, minplayer.players.limelight.getPriority = function () {
    return 10
}, minplayer.players.limelight.canPlay = function (a) {
    if ("video/limelight" === a.mimetype)return !0;
    var b = /.*limelight\.com.*/i;
    return 0 === a.path.search(b)
}, minplayer.players.limelight.getMediaId = function (a) {
    var b = /.*limelight\.com.*mediaId=([a-zA-Z0-9]+)/i;
    return 0 === a.path.search(b) ? a.path.match(b)[1] : a.path
}, minplayer.players.limelight.prototype.register = function () {
    window.delvePlayerCallback = function (a, b, c) {
        var d = a.replace("-player", "");
        jQuery.each(minplayer.get(d, "media"), function (a, d) {
            d.onMediaUpdate(b, c)
        })
    }
}, minplayer.players.limelight.prototype.onMediaUpdate = function (a, b) {
    switch (a) {
        case"onPlayerLoad":
            this.onReady();
            break;
        case"onMediaLoad":
            if (this.complete)return this.pause(), void this.onPaused();
            this.shouldSeek = this.startTime > 0, this.onLoaded();
            break;
        case"onMediaComplete":
            this.complete = !0, this.onComplete();
            break;
        case"onPlayheadUpdate":
            !b.positionInMilliseconds || this.playing || this.complete || this.onPlaying(), this.complete = !1, this.shouldSeek && this.seekValue ? (this.shouldSeek = !1, this.seek(this.seekValue)) : (this.duration.set(b.durationInMilliseconds / 1e3), this.currentTime.set(b.positionInMilliseconds / 1e3));
            break;
        case"onError":
            this.onError();
            break;
        case"onPlayStateChanged":
            b.isPlaying ? this.onPlaying() : b.isBusy ? this.onWaiting() : this.onPaused()
    }
}, minplayer.players.limelight.prototype.createPlayer = function () {
    minplayer.players.flash.prototype.createPlayer.call(this);
    var a = document.createElement("script");
    a.src = "https://assets.delvenetworks.com/player/embed.js";
    var b = document.getElementsByTagName("script")[0];
    b.parentNode.insertBefore(a, b), this.register();
    var c = {
        deepLink: "true",
        autoplay: this.options.autoplay ? "true" : "false",
        startQuality: "HD"
    }, d = null, e = this.options.channel;
    e || (d = /.*limelight\.com.*channelId=([a-zA-Z0-9]+)/i, 0 === this.mediaFile.path.search(d) && (e = this.mediaFile.path.match(d)[1])), e && "media" === this.mediaFile.queueType && (c.adConfigurationChannelId = e);
    var f = this.options.playerForm;
    f || (d = /.*limelight\.com.*playerForm=([a-zA-Z0-9]+)/i, 0 === this.mediaFile.path.search(d) && (f = this.mediaFile.path.match(d)[1])), f && (c.playerForm = f), c.mediaId = this.mediaFile.id;
    var g = this.options.id + "-player";
    return setTimeout(function h() {
        window.hasOwnProperty("LimelightPlayerUtil") ? window.LimelightPlayerUtil.initEmbed(g) : setTimeout(h, 1e3)
    }, 1e3), this.getFlash({
        swf: document.location.protocol + "//assets.delvenetworks.com/player/loader.swf",
        id: g,
        width: this.options.width,
        height: "100%",
        flashvars: c,
        wmode: this.options.wmode
    })
}, minplayer.players.limelight.prototype.play = function (a) {
    minplayer.players.flash.prototype.play.call(this, function () {
        this.player.doPlay(), a && a.call(this)
    })
}, minplayer.players.limelight.prototype.pause = function (a) {
    minplayer.players.flash.prototype.pause.call(this, function () {
        this.player.doPause(), a && a.call(this)
    })
}, minplayer.players.limelight.prototype.stop = function (a) {
    minplayer.players.flash.prototype.stop.call(this, function () {
        this.player.doPause(), a && a.call(this)
    })
}, minplayer.players.limelight.prototype._seek = function (a) {
    this.seekValue = a, this.player.doSeekToSecond(a)
}, minplayer.players.limelight.prototype.setVolume = function (a, b) {
    minplayer.players.flash.prototype.setVolume.call(this, a, function () {
        this.player.doSetVolume(a), b && b.call(this)
    })
}, minplayer.players.limelight.prototype._getVolume = function (a) {
    a(this.player.doGetVolume())
}, minplayer.players.limelight.prototype.search = function (a) {
    this.whenReady(function () {
        this.player.doSearch(a)
    })
};
var minplayer = minplayer || {};
minplayer.players = minplayer.players || {}, minplayer.players.kaltura = function (a, b) {
    minplayer.players.base.call(this, a, b)
}, minplayer.players.kaltura.prototype = new minplayer.players.base, minplayer.players.kaltura.prototype.constructor = minplayer.players.kaltura, minplayer.players.kaltura.prototype.construct = function () {
    minplayer.players.base.prototype.construct.call(this), this.options.pluginName = "kaltura", this.adPlaying = !1
}, minplayer.players.kaltura.prototype.defaultOptions = function (a) {
    a.entryId = 0, a.uiConfId = 0, a.partnerId = 0, minplayer.players.base.prototype.defaultOptions.call(this, a)
}, minplayer.players.kaltura.getPriority = function () {
    return 10
}, minplayer.players.kaltura.canPlay = function (a) {
    if ("video/kaltura" === a.mimetype)return !0;
    var b = /.*kaltura\.com.*/i;
    return 0 === a.path.search(b)
}, minplayer.players.kaltura.prototype.adStart = function () {
    this.adPlaying = !0, this.onPlaying()
}, minplayer.players.kaltura.prototype.adEnd = function () {
    this.adPlaying = !1
}, minplayer.players.kaltura.prototype.playerStateChange = function (a) {
    if (!this.adPlaying)switch (a) {
        case"ready":
            this.onLoaded();
            break;
        case"loading":
        case"buffering":
            this.onWaiting();
            break;
        case"playing":
            this.onPlaying();
            break;
        case"paused":
            this.onPaused()
    }
}, minplayer.players.kaltura.prototype.mediaReady = function () {
    this.onLoaded()
}, minplayer.players.kaltura.prototype.playerPlayEnd = function () {
    this.onComplete()
}, minplayer.players.kaltura.prototype.playUpdate = function (a) {
    this.currentTime.set(a)
}, minplayer.players.kaltura.prototype.durationChange = function (a) {
    this.duration.set(a.newValue)
}, minplayer.players.kaltura.prototype.getInstance = function () {
    if (this.instanceName)return this.instanceName;
    var a = this.uuid.split("__"), b = "minplayer.plugins." + a[0];
    return b += "." + a[1], b += "[" + (a[2] - 1) + "]", this.instanceName = b, b
}, minplayer.players.kaltura.prototype.registerEvents = function () {
    this.player.addJsListener("adStart", this.getInstance() + ".adStart"), this.player.addJsListener("adEnd", this.getInstance() + ".adEnd"), this.player.addJsListener("playerStateChange", this.getInstance() + ".playerStateChange"), this.player.addJsListener("durationChange", this.getInstance() + ".durationChange"), this.player.addJsListener("mediaReady", this.getInstance() + ".mediaReady"), this.player.addJsListener("playerUpdatePlayhead", this.getInstance() + ".playUpdate"), this.player.addJsListener("playerPlayEnd", this.getInstance() + ".playerPlayEnd")
}, minplayer.players.kaltura.prototype.createPlayer = function () {
    minplayer.players.base.prototype.createPlayer.call(this);
    var a = {}, b = this;
    jQuery.each(["entryId", "uiConfId", "partnerId"], function (c, d) {
        if (a[d] = "", b.options[d])a[d] = b.options[d]; else {
            var e = null;
            switch (d) {
                case"entryId":
                    e = /.*kaltura\.com.*entry_id\/([^\/]+)/i;
                    break;
                case"uiConfId":
                    e = /.*kaltura\.com.*uiconf_id\/([^\/]+)/i;
                    break;
                case"partnerId":
                    e = /.*kaltura\.com.*wid\/_([^\/]+)/i
            }
            e && (a[d] = b.mediaFile.path.match(e), a[d] && (a[d] = a[d][1]))
        }
    });
    var c = document.createElement("script");
    c.src = "http://cdnapi.kaltura.com/p/", c.src += a.partnerId, c.src += "/sp/", c.src += a.partnerId, c.src += "00/embedIframeJs/uiconf_id/", c.src += a.uiConfId, c.src += "/partner_id/", c.src += a.partnerId;
    var d = document.getElementsByTagName("script")[0];
    d.parentNode.insertBefore(c, d);
    var e = this.options.id + "-player";
    return setTimeout(function f() {
        window.hasOwnProperty("kWidget") ? kWidget.embed({
            targetId: e,
            wid: "_" + a.partnerId,
            uiconf_id: a.uiConfId,
            entry_id: a.entryId,
            flashvars: {autoPlay: !1},
            params: {wmode: "transparent"},
            readyCallback: function (a) {
                b.player = jQuery("#" + a).get(0), b.registerEvents(), b.onReady()
            }
        }) : setTimeout(f, 1e3)
    }, 1e3), '<div id="' + e + '" style="width:100%;height:100%;"></div>'
}, minplayer.players.kaltura.prototype.play = function (a) {
    minplayer.players.base.prototype.play.call(this, function () {
        this.player.sendNotification("doPlay"), a && a.call(this)
    })
}, minplayer.players.kaltura.prototype.pause = function (a) {
    minplayer.players.base.prototype.pause.call(this, function () {
        this.player.sendNotification("doPause"), a && a.call(this)
    })
}, minplayer.players.kaltura.prototype.stop = function (a) {
    minplayer.players.base.prototype.stop.call(this, function () {
        this.player.sendNotification("doStop"), a && a.call(this)
    })
}, minplayer.players.kaltura.prototype._seek = function (a) {
    this.seekValue = a, this.player.sendNotification("doSeek", a)
}, minplayer.players.kaltura.prototype.setVolume = function (a, b) {
    minplayer.players.base.prototype.setVolume.call(this, a, function () {
        this.player.sendNotification("changeVolume", a), b && b.call(this)
    })
};
var minplayer = minplayer || {};
minplayer.controller = function (a, b) {
    minplayer.display.call(this, "controller", a, b)
}, minplayer.controller.prototype = new minplayer.display, minplayer.controller.prototype.constructor = minplayer.controller, minplayer.formatTime = function (a) {
    a = a || 0;
    var b = 0, c = 0, d = 0, e = "";
    return d = Math.floor(a / 3600), a -= 3600 * d, c = Math.floor(a / 60), a -= 60 * c, b = Math.floor(a % 60), d && (e += String(d), e += ":"), e += c >= 10 ? String(c) : "0" + String(c), e += ":", e += b >= 10 ? String(b) : "0" + String(b), {
        time: e,
        units: ""
    }
}, minplayer.controller.prototype.getElements = function () {
    var a = minplayer.display.prototype.getElements.call(this);
    return jQuery.extend(a, {
        play: null,
        pause: null,
        fullscreen: null,
        seek: null,
        progress: null,
        volume: null,
        timer: null
    })
}, minplayer.controller.prototype.defaultOptions = function (a) {
    a.disptime = 0, minplayer.display.prototype.defaultOptions.call(this, a)
}, minplayer.controller.prototype.construct = function () {
    minplayer.display.prototype.construct.call(this), this.options.pluginName = "controller", this.dragging = !1, this.vol = 0, this.elements.seek && (this.seekBar = this.elements.seek.slider({
        range: "min",
        create: function (a) {
            jQuery(".ui-slider-range", a.target).addClass("ui-state-active")
        }
    })), this.elements.volume && (this.volumeBar = this.elements.volume.slider({
        animate: !0,
        range: "min",
        orientation: "vertical"
    })), this.get("player", function (a) {
        this.elements.fullscreen && minplayer.click(this.elements.fullscreen.unbind(), function () {
            a.toggleFullScreen()
        }).css({pointer: "hand"})
    }), this.get("media", function (a) {
        a.hasController() ? this.hide() : (this.elements.pause && (minplayer.click(this.elements.pause.unbind(), function (b) {
            return function (c) {
                c.preventDefault(), b.playPause(!1, a)
            }
        }(this)), a.ubind(this.uuid + ":pause", function (a) {
            return function () {
                a.setPlayPause(!0)
            }
        }(this))), this.elements.play && (minplayer.click(this.elements.play.unbind(), function (b) {
            return function (c) {
                c.preventDefault(), b.playPause(!0, a)
            }
        }(this)), a.ubind(this.uuid + ":playing", function (a) {
            return function () {
                a.setPlayPause(!1)
            }
        }(this))), this.elements.duration && (a.ubind(this.uuid + ":durationchange", function (a) {
            return function (b, c) {
                var d = a.options.disptime || c.duration;
                a.setTimeString("duration", d)
            }
        }(this)), a.getDuration(function (a) {
            return function (b) {
                b = a.options.disptime || b, a.setTimeString("duration", b)
            }
        }(this))), this.elements.progress && a.ubind(this.uuid + ":progress", function (a) {
            return function (b, c) {
                var d = c.total ? c.loaded / c.total * 100 : 0;
                a.elements.progress.width(d + "%")
            }
        }(this)), (this.seekBar || this.elements.timer) && a.ubind(this.uuid + ":timeupdate", function (a) {
            return function (b, c) {
                if (!a.dragging) {
                    var d = 0;
                    c.duration && (d = c.currentTime / c.duration * 100), a.seekBar && a.seekBar.slider("option", "value", d), a.setTimeString("timer", c.currentTime)
                }
            }
        }(this)), this.seekBar && this.seekBar.slider({
            start: function (a) {
                return function () {
                    a.dragging = !0
                }
            }(this), stop: function (b) {
                return function (c, d) {
                    b.dragging = !1, a.getDuration(function (b) {
                        a.seek(d.value / 100 * b)
                    })
                }
            }(this), slide: function (b) {
                return function (c, d) {
                    a.getDuration(function (c) {
                        var e = d.value / 100 * c;
                        b.dragging || a.seek(e), b.setTimeString("timer", e)
                    })
                }
            }(this)
        }), this.elements.mute && minplayer.click(this.elements.mute, function (b) {
            return function (c) {
                c.preventDefault();
                var d = b.volumeBar.slider("option", "value");
                d > 0 ? (b.vol = d, b.volumeBar.slider("option", "value", 0), a.setVolume(0)) : (b.volumeBar.slider("option", "value", b.vol), a.setVolume(b.vol / 100))
            }
        }(this)), this.volumeBar && (this.volumeBar.slider({
            slide: function (b, c) {
                a.setVolume(c.value / 100)
            }
        }), a.ubind(this.uuid + ":volumeupdate", function (a) {
            return function (b, c) {
                a.volumeBar.slider("option", "value", 100 * c)
            }
        }(this)), a.getVolume(function (a) {
            return function (b) {
                a.volumeBar.slider("option", "value", 100 * b)
            }
        }(this))))
    }), this.ready()
}, minplayer.controller.prototype.setPlayPause = function (a) {
    var b = "";
    this.elements.play && (b = a ? "inherit" : "none", this.elements.play.css("display", b)), this.elements.pause && (b = a ? "none" : "inherit", this.elements.pause.css("display", b))
}, minplayer.controller.prototype.playPause = function (a, b) {
    var c = a ? "play" : "pause";
    this.display.trigger(c), this.setPlayPause(!a), b && b[c]()
}, minplayer.controller.prototype.setTimeString = function (a, b) {
    this.elements[a] && this.elements[a].text(minplayer.formatTime(b).time)
};
var osmplayer = osmplayer || {};
!function (a) {
    !function (b, c) {
        function d(a) {
            return "" === g ? a : (a = a.charAt(0).toUpperCase() + a.substr(1), g + a)
        }

        var e = Math, f = c.createElement("div").style, g = function () {
            for (var a, b = "t,webkitT,MozT,msT,OT".split(","), c = 0, d = b.length; d > c; c++)if (a = b[c] + "ransform", a in f)return b[c].substr(0, b[c].length - 1);
            return !1
        }(), h = g ? "-" + g.toLowerCase() + "-" : "", i = d("transform"), j = d("transitionProperty"), k = d("transitionDuration"), l = d("transformOrigin"), m = d("transitionTimingFunction"), n = d("transitionDelay"), o = /android/gi.test(navigator.appVersion), p = /iphone|ipad/gi.test(navigator.appVersion), q = /hp-tablet/gi.test(navigator.appVersion), r = d("perspective") in f, s = "ontouchstart" in b && !q, t = g !== !1, u = d("transition") in f, v = "onorientationchange" in b ? "orientationchange" : "resize", w = s ? "touchstart" : "mousedown", x = s ? "touchmove" : "mousemove", y = s ? "touchend" : "mouseup", z = s ? "touchcancel" : "mouseup", A = function () {
            if (g === !1)return !1;
            var a = {
                "": "transitionend",
                webkit: "webkitTransitionEnd",
                Moz: "transitionend",
                O: "otransitionend",
                ms: "MSTransitionEnd"
            };
            return a[g]
        }(), B = function () {
            return b.requestAnimationFrame || b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame || b.oRequestAnimationFrame || b.msRequestAnimationFrame || function (a) {
                    return setTimeout(a, 1)
                }
        }(), C = function () {
            return b.cancelRequestAnimationFrame || b.webkitCancelAnimationFrame || b.webkitCancelRequestAnimationFrame || b.mozCancelRequestAnimationFrame || b.oCancelRequestAnimationFrame || b.msCancelRequestAnimationFrame || clearTimeout
        }(), D = r ? " translateZ(0)" : "", E = function (a, d) {
            var e, f = this;
            f.wrapper = "object" == typeof a ? a : c.getElementById(a), f.wrapper.style.overflow = "hidden", f.scroller = f.wrapper.children[0], f.options = {
                hScroll: !0,
                vScroll: !0,
                x: 0,
                y: 0,
                bounce: !0,
                bounceLock: !1,
                momentum: !0,
                lockDirection: !0,
                useTransform: !0,
                useTransition: !1,
                topOffset: 0,
                checkDOMChanges: !1,
                handleClick: !0,
                hScrollbar: !0,
                vScrollbar: !0,
                fixedScrollbar: o,
                hideScrollbar: p,
                fadeScrollbar: p && r,
                scrollbarClass: "",
                zoom: !1,
                zoomMin: 1,
                zoomMax: 4,
                doubleTapZoom: 2,
                wheelAction: "scroll",
                snap: !1,
                snapThreshold: 1,
                onRefresh: null,
                onBeforeScrollStart: function (a) {
                    a.preventDefault()
                },
                onScrollStart: null,
                onBeforeScrollMove: null,
                onScrollMove: null,
                onBeforeScrollEnd: null,
                onScrollEnd: null,
                onTouchEnd: null,
                onDestroy: null,
                onZoomStart: null,
                onZoom: null,
                onZoomEnd: null
            };
            for (e in d)f.options[e] = d[e];
            f.x = f.options.x, f.y = f.options.y, f.options.useTransform = t && f.options.useTransform, f.options.hScrollbar = f.options.hScroll && f.options.hScrollbar, f.options.vScrollbar = f.options.vScroll && f.options.vScrollbar, f.options.zoom = f.options.useTransform && f.options.zoom, f.options.useTransition = u && f.options.useTransition, f.options.zoom && o && (D = ""), f.scroller.style[j] = f.options.useTransform ? h + "transform" : "top left", f.scroller.style[k] = "0", f.scroller.style[l] = "0 0", f.options.useTransition && (f.scroller.style[m] = "cubic-bezier(0.33,0.66,0.66,1)"), f.options.useTransform ? f.scroller.style[i] = "translate(" + f.x + "px," + f.y + "px)" + D : f.scroller.style.cssText += ";position:absolute;top:" + f.y + "px;left:" + f.x + "px", f.options.useTransition && (f.options.fixedScrollbar = !0), f.refresh(), f._bind(v, b), f._bind(w), s || "none" != f.options.wheelAction && (f._bind("DOMMouseScroll"), f._bind("mousewheel")), f.options.checkDOMChanges && (f.checkDOMTime = setInterval(function () {
                f._checkDOMChanges()
            }, 500))
        };
        E.prototype = {
            enabled: !0,
            x: 0,
            y: 0,
            steps: [],
            scale: 1,
            currPageX: 0,
            currPageY: 0,
            pagesX: [],
            pagesY: [],
            aniTime: null,
            wheelZoomCount: 0,
            handleEvent: function (a) {
                var b = this;
                switch (a.type) {
                    case w:
                        if (!s && 0 !== a.button)return;
                        b._start(a);
                        break;
                    case x:
                        b._move(a);
                        break;
                    case y:
                    case z:
                        b._end(a);
                        break;
                    case v:
                        b._resize();
                        break;
                    case"DOMMouseScroll":
                    case"mousewheel":
                        b._wheel(a);
                        break;
                    case A:
                        b._transitionEnd(a)
                }
            },
            _checkDOMChanges: function () {
                this.moved || this.zoomed || this.animating || this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale || this.refresh()
            },
            _scrollbar: function (a) {
                var b, d = this;
                return d[a + "Scrollbar"] ? (d[a + "ScrollbarWrapper"] || (b = c.createElement("div"), d.options.scrollbarClass ? b.className = d.options.scrollbarClass + a.toUpperCase() : b.style.cssText = "position:absolute;z-index:100;" + ("h" == a ? "height:7px;bottom:1px;left:2px;right:" + (d.vScrollbar ? "7" : "2") + "px" : "width:7px;bottom:" + (d.hScrollbar ? "7" : "2") + "px;top:2px;right:1px"), b.style.cssText += ";pointer-events:none;" + h + "transition-property:opacity;" + h + "transition-duration:" + (d.options.fadeScrollbar ? "350ms" : "0") + ";overflow:hidden;opacity:" + (d.options.hideScrollbar ? "0" : "1"), d.wrapper.appendChild(b), d[a + "ScrollbarWrapper"] = b, b = c.createElement("div"), d.options.scrollbarClass || (b.style.cssText = "position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);" + h + "background-clip:padding-box;" + h + "box-sizing:border-box;" + ("h" == a ? "height:100%" : "width:100%") + ";" + h + "border-radius:3px;border-radius:3px"), b.style.cssText += ";pointer-events:none;" + h + "transition-property:" + h + "transform;" + h + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);" + h + "transition-duration:0;" + h + "transform: translate(0,0)" + D, d.options.useTransition && (b.style.cssText += ";" + h + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)"), d[a + "ScrollbarWrapper"].appendChild(b), d[a + "ScrollbarIndicator"] = b), "h" == a ? (d.hScrollbarSize = d.hScrollbarWrapper.clientWidth, d.hScrollbarIndicatorSize = e.max(e.round(d.hScrollbarSize * d.hScrollbarSize / d.scrollerW), 8), d.hScrollbarIndicator.style.width = d.hScrollbarIndicatorSize + "px", d.hScrollbarMaxScroll = d.hScrollbarSize - d.hScrollbarIndicatorSize, d.hScrollbarProp = d.hScrollbarMaxScroll / d.maxScrollX) : (d.vScrollbarSize = d.vScrollbarWrapper.clientHeight, d.vScrollbarIndicatorSize = e.max(e.round(d.vScrollbarSize * d.vScrollbarSize / d.scrollerH), 8), d.vScrollbarIndicator.style.height = d.vScrollbarIndicatorSize + "px", d.vScrollbarMaxScroll = d.vScrollbarSize - d.vScrollbarIndicatorSize, d.vScrollbarProp = d.vScrollbarMaxScroll / d.maxScrollY), void d._scrollbarPos(a, !0)) : void(d[a + "ScrollbarWrapper"] && (t && (d[a + "ScrollbarIndicator"].style[i] = ""), d[a + "ScrollbarWrapper"].parentNode.removeChild(d[a + "ScrollbarWrapper"]), d[a + "ScrollbarWrapper"] = null, d[a + "ScrollbarIndicator"] = null))
            },
            _resize: function () {
                var a = this;
                setTimeout(function () {
                    a.refresh()
                }, o ? 200 : 0)
            },
            _pos: function (a, b) {
                this.zoomed || (a = this.hScroll ? a : 0, b = this.vScroll ? b : 0, this.options.useTransform ? this.scroller.style[i] = "translate(" + a + "px," + b + "px) scale(" + this.scale + ")" + D : (a = e.round(a), b = e.round(b), this.scroller.style.left = a + "px", this.scroller.style.top = b + "px"), this.x = a, this.y = b, this._scrollbarPos("h"), this._scrollbarPos("v"))
            },
            _scrollbarPos: function (a, b) {
                var c, d = this, f = "h" == a ? d.x : d.y;
                d[a + "Scrollbar"] && (f = d[a + "ScrollbarProp"] * f, 0 > f ? (d.options.fixedScrollbar || (c = d[a + "ScrollbarIndicatorSize"] + e.round(3 * f), 8 > c && (c = 8), d[a + "ScrollbarIndicator"].style["h" == a ? "width" : "height"] = c + "px"), f = 0) : f > d[a + "ScrollbarMaxScroll"] && (d.options.fixedScrollbar ? f = d[a + "ScrollbarMaxScroll"] : (c = d[a + "ScrollbarIndicatorSize"] - e.round(3 * (f - d[a + "ScrollbarMaxScroll"])), 8 > c && (c = 8), d[a + "ScrollbarIndicator"].style["h" == a ? "width" : "height"] = c + "px", f = d[a + "ScrollbarMaxScroll"] + (d[a + "ScrollbarIndicatorSize"] - c))), d[a + "ScrollbarWrapper"].style[n] = "0", d[a + "ScrollbarWrapper"].style.opacity = b && d.options.hideScrollbar ? "0" : "1", d[a + "ScrollbarIndicator"].style[i] = "translate(" + ("h" == a ? f + "px,0)" : "0," + f + "px)") + D)
            },
            _start: function (a) {
                var c, d, f, g, h, j = this, k = s ? a.touches[0] : a;
                j.enabled && (j.options.onBeforeScrollStart && j.options.onBeforeScrollStart.call(j, a), (j.options.useTransition || j.options.zoom) && j._transitionTime(0), j.moved = !1, j.animating = !1, j.zoomed = !1, j.distX = 0, j.distY = 0, j.absDistX = 0, j.absDistY = 0, j.dirX = 0, j.dirY = 0, j.options.zoom && s && a.touches.length > 1 && (g = e.abs(a.touches[0].pageX - a.touches[1].pageX), h = e.abs(a.touches[0].pageY - a.touches[1].pageY), j.touchesDistStart = e.sqrt(g * g + h * h), j.originX = e.abs(a.touches[0].pageX + a.touches[1].pageX - 2 * j.wrapperOffsetLeft) / 2 - j.x, j.originY = e.abs(a.touches[0].pageY + a.touches[1].pageY - 2 * j.wrapperOffsetTop) / 2 - j.y, j.options.onZoomStart && j.options.onZoomStart.call(j, a)), j.options.momentum && (j.options.useTransform ? (c = getComputedStyle(j.scroller, null)[i].replace(/[^0-9\-.,]/g, "").split(","), d = +(c[12] || c[4]), f = +(c[13] || c[5])) : (d = +getComputedStyle(j.scroller, null).left.replace(/[^0-9-]/g, ""), f = +getComputedStyle(j.scroller, null).top.replace(/[^0-9-]/g, "")), (d != j.x || f != j.y) && (j.options.useTransition ? j._unbind(A) : C(j.aniTime), j.steps = [], j._pos(d, f), j.options.onScrollEnd && j.options.onScrollEnd.call(j))), j.absStartX = j.x, j.absStartY = j.y, j.startX = j.x, j.startY = j.y, j.pointX = k.pageX, j.pointY = k.pageY, j.startTime = a.timeStamp || Date.now(), j.options.onScrollStart && j.options.onScrollStart.call(j, a), j._bind(x, b), j._bind(y, b), j._bind(z, b))
            },
            _move: function (a) {
                var b, c, d, f = this, g = s ? a.touches[0] : a, h = g.pageX - f.pointX, j = g.pageY - f.pointY, k = f.x + h, l = f.y + j, m = a.timeStamp || Date.now();
                return f.options.onBeforeScrollMove && f.options.onBeforeScrollMove.call(f, a), f.options.zoom && s && a.touches.length > 1 ? (b = e.abs(a.touches[0].pageX - a.touches[1].pageX), c = e.abs(a.touches[0].pageY - a.touches[1].pageY), f.touchesDist = e.sqrt(b * b + c * c), f.zoomed = !0, d = 1 / f.touchesDistStart * f.touchesDist * this.scale, d < f.options.zoomMin ? d = .5 * f.options.zoomMin * Math.pow(2, d / f.options.zoomMin) : d > f.options.zoomMax && (d = 2 * f.options.zoomMax * Math.pow(.5, f.options.zoomMax / d)), f.lastScale = d / this.scale, k = this.originX - this.originX * f.lastScale + this.x, l = this.originY - this.originY * f.lastScale + this.y, this.scroller.style[i] = "translate(" + k + "px," + l + "px) scale(" + d + ")" + D, void(f.options.onZoom && f.options.onZoom.call(f, a))) : (f.pointX = g.pageX, f.pointY = g.pageY, (k > 0 || k < f.maxScrollX) && (k = f.options.bounce ? f.x + h / 2 : k >= 0 || f.maxScrollX >= 0 ? 0 : f.maxScrollX), (l > f.minScrollY || l < f.maxScrollY) && (l = f.options.bounce ? f.y + j / 2 : l >= f.minScrollY || f.maxScrollY >= 0 ? f.minScrollY : f.maxScrollY), f.distX += h, f.distY += j, f.absDistX = e.abs(f.distX), f.absDistY = e.abs(f.distY), void(f.absDistX < 6 && f.absDistY < 6 || (f.options.lockDirection && (f.absDistX > f.absDistY + 5 ? (l = f.y, j = 0) : f.absDistY > f.absDistX + 5 && (k = f.x, h = 0)), f.moved = !0, f._pos(k, l), f.dirX = h > 0 ? -1 : 0 > h ? 1 : 0, f.dirY = j > 0 ? -1 : 0 > j ? 1 : 0, m - f.startTime > 300 && (f.startTime = m, f.startX = f.x, f.startY = f.y), f.options.onScrollMove && f.options.onScrollMove.call(f, a))))
            },
            _end: function (a) {
                if (!s || 0 === a.touches.length) {
                    var d, f, g, h, j, l, m, n = this, o = s ? a.changedTouches[0] : a, p = {
                        dist: 0,
                        time: 0
                    }, q = {dist: 0, time: 0}, r = (a.timeStamp || Date.now()) - n.startTime, t = n.x, u = n.y;
                    if (n._unbind(x, b), n._unbind(y, b), n._unbind(z, b), n.options.onBeforeScrollEnd && n.options.onBeforeScrollEnd.call(n, a), n.zoomed)return m = n.scale * n.lastScale, m = Math.max(n.options.zoomMin, m), m = Math.min(n.options.zoomMax, m), n.lastScale = m / n.scale, n.scale = m, n.x = n.originX - n.originX * n.lastScale + n.x, n.y = n.originY - n.originY * n.lastScale + n.y, n.scroller.style[k] = "200ms", n.scroller.style[i] = "translate(" + n.x + "px," + n.y + "px) scale(" + n.scale + ")" + D, n.zoomed = !1, n.refresh(), void(n.options.onZoomEnd && n.options.onZoomEnd.call(n, a));
                    if (!n.moved)return s && (n.doubleTapTimer && n.options.zoom ? (clearTimeout(n.doubleTapTimer), n.doubleTapTimer = null, n.options.onZoomStart && n.options.onZoomStart.call(n, a), n.zoom(n.pointX, n.pointY, 1 == n.scale ? n.options.doubleTapZoom : 1), n.options.onZoomEnd && setTimeout(function () {
                        n.options.onZoomEnd.call(n, a)
                    }, 200)) : this.options.handleClick && (n.doubleTapTimer = setTimeout(function () {
                        for (n.doubleTapTimer = null, d = o.target; 1 != d.nodeType;)d = d.parentNode;
                        "SELECT" != d.tagName && "INPUT" != d.tagName && "TEXTAREA" != d.tagName && (f = c.createEvent("MouseEvents"), f.initMouseEvent("click", !0, !0, a.view, 1, o.screenX, o.screenY, o.clientX, o.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, 0, null), f._fake = !0, d.dispatchEvent(f))
                    }, n.options.zoom ? 250 : 0))), n._resetPos(400), void(n.options.onTouchEnd && n.options.onTouchEnd.call(n, a));
                    if (300 > r && n.options.momentum && (p = t ? n._momentum(t - n.startX, r, -n.x, n.scrollerW - n.wrapperW + n.x, n.options.bounce ? n.wrapperW : 0) : p, q = u ? n._momentum(u - n.startY, r, -n.y, n.maxScrollY < 0 ? n.scrollerH - n.wrapperH + n.y - n.minScrollY : 0, n.options.bounce ? n.wrapperH : 0) : q, t = n.x + p.dist, u = n.y + q.dist, (n.x > 0 && t > 0 || n.x < n.maxScrollX && t < n.maxScrollX) && (p = {
                            dist: 0,
                            time: 0
                        }), (n.y > n.minScrollY && u > n.minScrollY || n.y < n.maxScrollY && u < n.maxScrollY) && (q = {
                            dist: 0,
                            time: 0
                        })), p.dist || q.dist)return j = e.max(e.max(p.time, q.time), 10), n.options.snap && (g = t - n.absStartX, h = u - n.absStartY, e.abs(g) < n.options.snapThreshold && e.abs(h) < n.options.snapThreshold ? n.scrollTo(n.absStartX, n.absStartY, 200) : (l = n._snap(t, u), t = l.x, u = l.y, j = e.max(l.time, j))), n.scrollTo(e.round(t), e.round(u), j), void(n.options.onTouchEnd && n.options.onTouchEnd.call(n, a));
                    if (n.options.snap)return g = t - n.absStartX, h = u - n.absStartY, e.abs(g) < n.options.snapThreshold && e.abs(h) < n.options.snapThreshold ? n.scrollTo(n.absStartX, n.absStartY, 200) : (l = n._snap(n.x, n.y), (l.x != n.x || l.y != n.y) && n.scrollTo(l.x, l.y, l.time)), void(n.options.onTouchEnd && n.options.onTouchEnd.call(n, a));
                    n._resetPos(200), n.options.onTouchEnd && n.options.onTouchEnd.call(n, a)
                }
            },
            _resetPos: function (a) {
                var b = this, c = b.x >= 0 ? 0 : b.x < b.maxScrollX ? b.maxScrollX : b.x, d = b.y >= b.minScrollY || b.maxScrollY > 0 ? b.minScrollY : b.y < b.maxScrollY ? b.maxScrollY : b.y;
                return c == b.x && d == b.y ? (b.moved && (b.moved = !1, b.options.onScrollEnd && b.options.onScrollEnd.call(b)), b.hScrollbar && b.options.hideScrollbar && ("webkit" == g && (b.hScrollbarWrapper.style[n] = "300ms"), b.hScrollbarWrapper.style.opacity = "0"), void(b.vScrollbar && b.options.hideScrollbar && ("webkit" == g && (b.vScrollbarWrapper.style[n] = "300ms"), b.vScrollbarWrapper.style.opacity = "0"))) : void b.scrollTo(c, d, a || 0)
            },
            _wheel: function (a) {
                var b, c, d, e, f, g = this;
                if ("wheelDeltaX" in a)b = a.wheelDeltaX / 12, c = a.wheelDeltaY / 12; else if ("wheelDelta" in a)b = c = a.wheelDelta / 12; else {
                    if (!("detail" in a))return;
                    b = c = 3 * -a.detail
                }
                return "zoom" == g.options.wheelAction ? (f = g.scale * Math.pow(2, 1 / 3 * (c ? c / Math.abs(c) : 0)), f < g.options.zoomMin && (f = g.options.zoomMin), f > g.options.zoomMax && (f = g.options.zoomMax), void(f != g.scale && (!g.wheelZoomCount && g.options.onZoomStart && g.options.onZoomStart.call(g, a), g.wheelZoomCount++, g.zoom(a.pageX, a.pageY, f, 400), setTimeout(function () {
                    g.wheelZoomCount--, !g.wheelZoomCount && g.options.onZoomEnd && g.options.onZoomEnd.call(g, a)
                }, 400)))) : (d = g.x + b, e = g.y + c, d > 0 ? d = 0 : d < g.maxScrollX && (d = g.maxScrollX), e > g.minScrollY ? e = g.minScrollY : e < g.maxScrollY && (e = g.maxScrollY), void(g.maxScrollY < 0 && g.scrollTo(d, e, 0)))
            },
            _transitionEnd: function (a) {
                var b = this;
                a.target == b.scroller && (b._unbind(A), b._startAni())
            },
            _startAni: function () {
                var a, b, c, d = this, f = d.x, g = d.y, h = Date.now();
                if (!d.animating) {
                    if (!d.steps.length)return void d._resetPos(400);
                    if (a = d.steps.shift(), a.x == f && a.y == g && (a.time = 0), d.animating = !0, d.moved = !0, d.options.useTransition)return d._transitionTime(a.time), d._pos(a.x, a.y), d.animating = !1, void(a.time ? d._bind(A) : d._resetPos(0));
                    c = function () {
                        var i, j, k = Date.now();
                        return k >= h + a.time ? (d._pos(a.x, a.y), d.animating = !1, d.options.onAnimationEnd && d.options.onAnimationEnd.call(d), void d._startAni()) : (k = (k - h) / a.time - 1, b = e.sqrt(1 - k * k), i = (a.x - f) * b + f, j = (a.y - g) * b + g, d._pos(i, j), void(d.animating && (d.aniTime = B(c))))
                    }, c()
                }
            },
            _transitionTime: function (a) {
                a += "ms", this.scroller.style[k] = a, this.hScrollbar && (this.hScrollbarIndicator.style[k] = a), this.vScrollbar && (this.vScrollbarIndicator.style[k] = a)
            },
            _momentum: function (a, b, c, d, f) {
                var g = 6e-4, h = e.abs(a) / b, i = h * h / (2 * g), j = 0, k = 0;
                return a > 0 && i > c ? (k = f / (6 / (i / h * g)), c += k, h = h * c / i, i = c) : 0 > a && i > d && (k = f / (6 / (i / h * g)), d += k, h = h * d / i, i = d), i *= 0 > a ? -1 : 1, j = h / g, {
                    dist: i,
                    time: e.round(j)
                }
            },
            _offset: function (a) {
                for (var b = -a.offsetLeft, c = -a.offsetTop; a = a.offsetParent;)b -= a.offsetLeft, c -= a.offsetTop;
                return a != this.wrapper && (b *= this.scale, c *= this.scale), {left: b, top: c}
            },
            _snap: function (a, b) {
                var c, d, f, g, h, i, j = this;
                for (f = j.pagesX.length - 1, c = 0, d = j.pagesX.length; d > c; c++)if (a >= j.pagesX[c]) {
                    f = c;
                    break
                }
                for (f == j.currPageX && f > 0 && j.dirX < 0 && f--, a = j.pagesX[f], h = e.abs(a - j.pagesX[j.currPageX]), h = h ? e.abs(j.x - a) / h * 500 : 0, j.currPageX = f, f = j.pagesY.length - 1, c = 0; f > c; c++)if (b >= j.pagesY[c]) {
                    f = c;
                    break
                }
                return f == j.currPageY && f > 0 && j.dirY < 0 && f--, b = j.pagesY[f], i = e.abs(b - j.pagesY[j.currPageY]), i = i ? e.abs(j.y - b) / i * 500 : 0, j.currPageY = f, g = e.round(e.max(h, i)) || 200, {
                    x: a,
                    y: b,
                    time: g
                }
            },
            _bind: function (a, b, c) {
                (b || this.scroller).addEventListener(a, this, !!c)
            },
            _unbind: function (a, b, c) {
                (b || this.scroller).removeEventListener(a, this, !!c)
            },
            destroy: function () {
                var a = this;
                a.scroller.style[i] = "", a.hScrollbar = !1, a.vScrollbar = !1, a._scrollbar("h"), a._scrollbar("v"), a._unbind(v, b), a._unbind(w), a._unbind(x, b), a._unbind(y, b), a._unbind(z, b), a.options.hasTouch || (a._unbind("DOMMouseScroll"), a._unbind("mousewheel")), a.options.useTransition && a._unbind(A), a.options.checkDOMChanges && clearInterval(a.checkDOMTime), a.options.onDestroy && a.options.onDestroy.call(a)
            },
            refresh: function () {
                var a, b, c, d, f = this, g = 0, h = 0;
                if (f.scale < f.options.zoomMin && (f.scale = f.options.zoomMin), f.wrapperW = f.wrapper.clientWidth || 1, f.wrapperH = f.wrapper.clientHeight || 1, f.minScrollY = -f.options.topOffset || 0, f.scrollerW = e.round(f.scroller.offsetWidth * f.scale), f.scrollerH = e.round((f.scroller.offsetHeight + f.minScrollY) * f.scale), f.maxScrollX = f.wrapperW - f.scrollerW, f.maxScrollY = f.wrapperH - f.scrollerH + f.minScrollY, f.dirX = 0, f.dirY = 0, f.options.onRefresh && f.options.onRefresh.call(f), f.hScroll = f.options.hScroll && f.maxScrollX < 0, f.vScroll = f.options.vScroll && (!f.options.bounceLock && !f.hScroll || f.scrollerH > f.wrapperH), f.hScrollbar = f.hScroll && f.options.hScrollbar, f.vScrollbar = f.vScroll && f.options.vScrollbar && f.scrollerH > f.wrapperH, a = f._offset(f.wrapper), f.wrapperOffsetLeft = -a.left, f.wrapperOffsetTop = -a.top, "string" == typeof f.options.snap)for (f.pagesX = [], f.pagesY = [], d = f.scroller.querySelectorAll(f.options.snap), b = 0, c = d.length; c > b; b++)g = f._offset(d[b]), g.left += f.wrapperOffsetLeft, g.top += f.wrapperOffsetTop, f.pagesX[b] = g.left < f.maxScrollX ? f.maxScrollX : g.left * f.scale, f.pagesY[b] = g.top < f.maxScrollY ? f.maxScrollY : g.top * f.scale; else if (f.options.snap) {
                    for (f.pagesX = []; g >= f.maxScrollX;)f.pagesX[h] = g, g -= f.wrapperW, h++;
                    for (f.maxScrollX % f.wrapperW && (f.pagesX[f.pagesX.length] = f.maxScrollX - f.pagesX[f.pagesX.length - 1] + f.pagesX[f.pagesX.length - 1]), g = 0, h = 0, f.pagesY = []; g >= f.maxScrollY;)f.pagesY[h] = g, g -= f.wrapperH, h++;
                    f.maxScrollY % f.wrapperH && (f.pagesY[f.pagesY.length] = f.maxScrollY - f.pagesY[f.pagesY.length - 1] + f.pagesY[f.pagesY.length - 1])
                }
                f._scrollbar("h"), f._scrollbar("v"), f.zoomed || (f.scroller.style[k] = "0", f._resetPos(400))
            },
            scrollTo: function (a, b, c, d) {
                var e, f, g = this, h = a;
                for (g.stop(), h.length || (h = [{
                    x: a,
                    y: b,
                    time: c,
                    relative: d
                }]), e = 0, f = h.length; f > e; e++)h[e].relative && (h[e].x = g.x - h[e].x, h[e].y = g.y - h[e].y), g.steps.push({
                    x: h[e].x,
                    y: h[e].y,
                    time: h[e].time || 0
                });
                g._startAni()
            },
            scrollToElement: function (a, b) {
                var c, d = this;
                a = a.nodeType ? a : d.scroller.querySelector(a), a && (c = d._offset(a), c.left += d.wrapperOffsetLeft, c.top += d.wrapperOffsetTop, c.left = c.left > 0 ? 0 : c.left < d.maxScrollX ? d.maxScrollX : c.left, c.top = c.top > d.minScrollY ? d.minScrollY : c.top < d.maxScrollY ? d.maxScrollY : c.top, b = void 0 === b ? e.max(2 * e.abs(c.left), 2 * e.abs(c.top)) : b, d.scrollTo(c.left, c.top, b))
            },
            scrollToPage: function (a, b, c) {
                var d, e, f = this;
                c = void 0 === c ? 400 : c, f.options.onScrollStart && f.options.onScrollStart.call(f), f.options.snap ? (a = "next" == a ? f.currPageX + 1 : "prev" == a ? f.currPageX - 1 : a, b = "next" == b ? f.currPageY + 1 : "prev" == b ? f.currPageY - 1 : b, a = 0 > a ? 0 : a > f.pagesX.length - 1 ? f.pagesX.length - 1 : a, b = 0 > b ? 0 : b > f.pagesY.length - 1 ? f.pagesY.length - 1 : b, f.currPageX = a, f.currPageY = b, d = f.pagesX[a], e = f.pagesY[b]) : (d = -f.wrapperW * a, e = -f.wrapperH * b, d < f.maxScrollX && (d = f.maxScrollX), e < f.maxScrollY && (e = f.maxScrollY)), f.scrollTo(d, e, c)
            },
            disable: function () {
                this.stop(), this._resetPos(0), this.enabled = !1, this._unbind(x, b), this._unbind(y, b), this._unbind(z, b)
            },
            enable: function () {
                this.enabled = !0
            },
            stop: function () {
                this.options.useTransition ? this._unbind(A) : C(this.aniTime), this.steps = [], this.moved = !1, this.animating = !1
            },
            zoom: function (a, b, c, d) {
                var e = this, f = c / e.scale;
                e.options.useTransform && (e.zoomed = !0, d = void 0 === d ? 200 : d, a = a - e.wrapperOffsetLeft - e.x, b = b - e.wrapperOffsetTop - e.y, e.x = a - a * f + e.x, e.y = b - b * f + e.y, e.scale = c, e.refresh(), e.x = e.x > 0 ? 0 : e.x < e.maxScrollX ? e.maxScrollX : e.x, e.y = e.y > e.minScrollY ? e.minScrollY : e.y < e.maxScrollY ? e.maxScrollY : e.y, e.scroller.style[k] = d + "ms", e.scroller.style[i] = "translate(" + e.x + "px," + e.y + "px) scale(" + c + ")" + D, e.zoomed = !1)
            },
            isReady: function () {
                return !this.moved && !this.zoomed && !this.animating
            }
        }, f = null, "undefined" != typeof a ? a.iScroll = E : b.iScroll = E
    }(window, document)
}(osmplayer), jQuery.fn.osmplayer || (jQuery.event.special.playerdestroyed = {
    remove: function (a) {
        a.handler && a.handler(this)
    }
}, jQuery.fn.osmplayer = function (a) {
    return jQuery(this).each(function () {
        a = a || {}, a.id = a.id || jQuery(this).attr("id") || Math.random(), minplayer.plugins[a.id] || (a.template = a.template || "default", osmplayer[a.template] ? new osmplayer[a.template](jQuery(this), a) : new osmplayer(jQuery(this), a))
    })
}), osmplayer = function (a, b) {
    minplayer.call(this, a, b)
}, osmplayer.prototype = new minplayer, osmplayer.prototype.constructor = osmplayer, osmplayer.prototype.create = function (a, b, c) {
    return minplayer.prototype.create.call(this, a, "osmplayer", c)
}, osmplayer.prototype.defaultOptions = function (a) {
    a.playlist = "", a.node = {}, a.link = "http://www.mediafront.org", a.logo = "http://mediafront.org/assets/osmplayer/logo.png", minplayer.prototype.defaultOptions.call(this, a)
}, osmplayer.prototype.construct = function () {
    minplayer.prototype.construct.call(this), jQuery(this.display).bind("playerdestroyed", function (a) {
        return function (b) {
            if (b === a.display.eq(0)[0]) {
                for (var c in minplayer.plugins[a.options.id]) {
                    for (var d in minplayer.plugins[a.options.id][c])minplayer.plugins[a.options.id][c][d].destroy(), delete minplayer.plugins[a.options.id][c][d];
                    minplayer.plugins[a.options.id][c].length = 0
                }
                delete minplayer.plugins[a.options.id], minplayer.plugins[a.options.id] = null
            }
        }
    }(this)), this.playQueue = [], this.playIndex = 0, this.hasPlaylist = !1, this.create("playlist", "osmplayer"), this.get("playlist", function (a) {
        a.ubind(this.uuid + ":nodeLoad", function (a) {
            return function (b, c) {
                a.hasPlaylist = !0, !a.options.autoplay && c.autoplay && ("undefined" == typeof a.options.originalAutoPlay && (a.options.originalAutoPlay = a.options.autoplay), a.options.autoplay = !0), a.loadNode(c)
            }
        }(this))
    }), this.get("media", function (a) {
        a.ubind(this.uuid + ":ended", function (a) {
            return function () {
                "undefined" == typeof a.options.originalAutoPlay && (a.options.originalAutoPlay = a.options.autoplay), a.options.autoplay = !0, a.playNext()
            }
        }(this))
    }), this.loadNode(this.options.node)
}, osmplayer.prototype.fullScreenElement = function () {
    return this.elements.minplayer
}, osmplayer.prototype.reset = function (a) {
    this.playQueue.length = 0, this.playQueue = [], this.playIndex = 0, this.playLoader && this.options.preview ? (this.options.preview = "", this.playLoader.clear(function (b) {
        return function () {
            a.call(b)
        }
    }(this))) : a && a.call(this)
}, osmplayer.prototype.loadNode = function (a) {
    return !a || a.hasOwnProperty("length") && 0 === a.length ? !1 : void this.reset(function () {
        if (this.hasMedia = a && a.mediafiles && a.mediafiles.media, this.hasMedia = this.hasMedia || this.options.file, a && a.mediafiles) {
            var b = a.mediafiles.media;
            if (b) {
                var c = null, d = [];
                d = minplayer.isAndroid || minplayer.isIDevice ? ["media"] : ["intro", "commercial", "prereel", "media", "postreel"], jQuery.each(d, function (a) {
                    return function (d, e) {
                        c = a.addToQueue(b[e]), c && (c.queueType = e)
                    }
                }(this))
            } else this.display.addClass("nomedia");
            this.playNext(), osmplayer.getImage(a.mediafiles, "preview", function (a) {
                return function (b) {
                    a.playLoader && a.playLoader.display.length > 0 && (a.playLoader.enabled = !0, a.playLoader.loadPreview(b.path), a.playLoader.previewFlag.setFlag("media", !0), a.hasMedia || (a.playLoader.busy.setFlag("media", !1), a.playLoader.bigPlay.setFlag("media", !1)), a.playLoader.checkVisibility())
                }
            }(this))
        }
        this.trigger("nodeLoad", a)
    })
}, osmplayer.prototype.addToQueue = function (a) {
    return a = minplayer.getMediaFile(a), a && this.playQueue.push(a), a
}, osmplayer.prototype.playNext = function () {
    this.playQueue.length > this.playIndex ? (this.load(this.playQueue[this.playIndex]), this.playIndex++) : this.options.repeat ? (this.playIndex = 0, this.playNext()) : this.playQueue.length > 0 ? this.hasPlaylist && this.options.autoNext ? this.trigger("player_ended") : (this.options.autoplay = !1, this.playIndex = 0, this.playNext()) : this.media && ("undefined" != typeof this.options.originalAutoPlay && (this.options.autoplay = this.options.originalAutoPlay), this.media.stop(), this.options.file ? this.load() : this.loadNode())
}, osmplayer.getNode = function (a, b) {
    if (a && a.mediafiles && a.mediafiles.media) {
        var c = minplayer.getMediaFile(a.mediafiles.media.media);
        if (c) {
            var d = minplayer.players[c.player];
            d && "function" == typeof d.getNode && d.getNode(c, function (a) {
                b(a)
            })
        }
    }
}, osmplayer.getImage = function (a, b, c) {
    var d = "", e = a.image;
    if (e)if (e[b])d = e[b]; else if (e.image)d = e.image; else for (b in e)if (e.hasOwnProperty(b)) {
        d = e[b];
        break
    }
    if (d)c(new minplayer.file(d)); else {
        var f = minplayer.getMediaFile(a.media.media);
        if (f) {
            var g = minplayer.players[f.player];
            g && "function" == typeof g.getImage && g.getImage(f, b, function (a) {
                c(new minplayer.file(a))
            })
        }
    }
};
var osmplayer = osmplayer || {};
osmplayer.parser = osmplayer.parser || {}, osmplayer.parser["default"] = {
    priority: 1, valid: function () {
        return !0
    }, getType: function () {
        return "json"
    }, getFeed: function (a, b, c) {
        return a = a.replace(/(.*)\??(.*)/i, "$1"), a += "?start-index=" + b, a += "&max-results=" + c
    }, parse: function (a) {
        return a
    }
};
var osmplayer = osmplayer || {};
osmplayer.parser = osmplayer.parser || {}, osmplayer.parser.youtube = {
    priority: 10, valid: function (a) {
        return 0 === a.search(/^http(s)?\:\/\/gdata\.youtube\.com/i)
    }, getType: function () {
        return "jsonp"
    }, getFeed: function (a, b, c) {
        return a = a.replace(/(.*)\??(.*)/i, "$1"), a += "?start-index=" + (b + 1), a += "&max-results=" + c, a += "&v=2&alt=jsonc"
    }, parse: function (a) {
        a = a.data;
        var b = {total_rows: a.totalItems, nodes: []}, c = null;
        for (var d in a.items)a.items.hasOwnProperty(d) && (c = minplayer.players.youtube.parseNode(a.items[d]), b.nodes.push(c));
        return b
    }
};
var osmplayer = osmplayer || {};
osmplayer.parser = osmplayer.parser || {}, osmplayer.parser.rss = {
    priority: 8, valid: function (a) {
        return a = a.replace(/(.*)\??(.*)/i, "$1"), null !== a.match(/\.rss$/i)
    }, getType: function () {
        return "xml"
    }, getFeed: function (a) {
        return a
    }, parse: function (a) {
        var b = {total_rows: 0, nodes: []};
        return jQuery("rss channel", a).find("item").each(function () {
            osmplayer.parser.rss.addRSSItem(b, jQuery(this))
        }), b
    }, addRSSItem: function (a, b) {
        a.total_rows++;
        var c = {}, d = "", e = "", f = "", g = "";
        d = b.find("title"), d.length && (c.title = d.text()), e = b.find("annotation"), e.length && (c.description = e.text()), c.mediafiles = {}, f = b.find("image"), f.length && (c.mediafiles.image = {image: {path: f.text()}}), g = b.find("location"), g.length && (c.mediafiles.media = {media: {path: g.text()}}), a.nodes.push(c)
    }
};
var osmplayer = osmplayer || {};
osmplayer.parser = osmplayer.parser || {}, osmplayer.parser.asx = {
    priority: 8, valid: function (a) {
        return a = a.replace(/(.*)\??(.*)/i, "$1"), null !== a.match(/\.asx$/i)
    }, getType: function () {
        return "xml"
    }, getFeed: function (a) {
        return a
    }, parse: function (a) {
        var b = {total_rows: 0, nodes: []};
        return jQuery("asx entry", a).each(function () {
            osmplayer.parser.rss.addRSSItem(b, jQuery(this))
        }), b
    }
};
var osmplayer = osmplayer || {};
osmplayer.parser = osmplayer.parser || {}, osmplayer.parser.xsfp = {
    priority: 8, valid: function (a) {
        return a = a.replace(/(.*)\??(.*)/i, "$1"), null !== a.match(/\.xml$/i)
    }, getType: function () {
        return "xml"
    }, getFeed: function (a) {
        return a
    }, parse: function (a) {
        var b = {total_rows: 0, nodes: []};
        return jQuery("playlist trackList track", a).each(function () {
            osmplayer.parser.rss.addRSSItem(b, jQuery(this))
        }), b
    }
}, osmplayer.playlist = function (a, b) {
    minplayer.display.call(this, "playlist", a, b)
}, osmplayer.playlist.prototype = new minplayer.display, osmplayer.playlist.prototype.constructor = osmplayer.playlist, osmplayer.playlist.prototype.defaultOptions = function (a) {
    a.vertical = !0, a.playlist = "", a.pageLimit = 10, a.autoNext = !0, a.shuffle = !1, a.loop = !1, a.hysteresis = 40, a.scrollSpeed = 20, a.scrollMode = "auto", minplayer.display.prototype.defaultOptions.call(this, a)
}, osmplayer.playlist.prototype.construct = function () {
    this.nodes = [], this.page = -1, this.totalItems = 0, this.currentItem = -1, this.playqueue = [], this.playqueuepos = 0, this.playlist = this.options.playlist, this.scroll = null, this.orient = {
        pos: this.options.vertical ? "y" : "x",
        pagePos: this.options.vertical ? "pageY" : "pageX",
        offset: this.options.vertical ? "top" : "left",
        wrapperSize: this.options.vertical ? "wrapperH" : "wrapperW",
        minScroll: this.options.vertical ? "minScrollY" : "minScrollX",
        maxScroll: this.options.vertical ? "maxScrollY" : "maxScrollX",
        size: this.options.vertical ? "height" : "width"
    }, this.pager = this.create("pager", "osmplayer"), this.pager.ubind(this.uuid + ":nextPage", function (a) {
        return function () {
            a.nextPage()
        }
    }(this)), this.pager.ubind(this.uuid + ":prevPage", function (a) {
        return function () {
            a.prevPage()
        }
    }(this)), minplayer.display.prototype.construct.call(this), this.hasPlaylist = this.next(), this.ready()
}, osmplayer.playlist.prototype.onAdded = function (a) {
    this.options.autoNext && a.get("player", function (a) {
        return function (b) {
            b.ubind(a.uuid + ":player_ended", function () {
                a.hasPlaylist && ("undefined" == typeof b.options.originalAutoPlay && (b.options.originalAutoPlay = b.options.autoplay), b.options.autoplay = !0, a.next())
            })
        }
    }(this))
}, osmplayer.playlist.prototype.scrollTo = function (a, b) {
    this.scroll && (this.scroll.options.hideScrollbar = !1, this.options.vertical ? this.scroll.scrollTo(0, a, 0, b) : this.scroll.scrollTo(a, 0, 0, b), this.scroll.options.hideScrollbar = !0)
}, osmplayer.playlist.prototype.refreshScroll = function () {
    if (!window.addEventListener)return void setTimeout(function (a) {
        return function () {
            a.refreshScroll.call(a)
        }
    }(this), 200);
    var a = this.elements.list, b = this.elements.scroll;
    if (this.scroll && (this.scroll.scrollTo(0, 0), this.scroll.destroy(), this.scroll = null, this.elements.list.unbind("mousemove").unbind("mouseenter").unbind("mouseleave")), !this.options.vertical) {
        var c = 0;
        jQuery.each(this.elements.list.children(), function () {
            c += jQuery(this).outerWidth()
        }), this.elements.list.width(c)
    }
    a.length > 0 && b.length > 0 && a[this.orient.size]() > b[this.orient.size]() && (this.scroll = new osmplayer.iScroll(this.elements.scroll.eq(0)[0], {
        hScroll: !this.options.vertical,
        hScrollbar: !this.options.vertical,
        vScroll: this.options.vertical,
        vScrollbar: this.options.vertical,
        hideScrollbar: "none" !== this.options.scrollMode
    }), "auto" != this.options.scrollMode || minplayer.hasTouch || this.elements.list.bind("mousemove", function (a) {
        return function (b) {
            b.preventDefault();
            var c = a.display.offset()[a.orient.offset];
            a.mousePos = b[a.orient.pagePos], a.mousePos -= c
        }
    }(this)).bind("mouseenter", function (a) {
        return function (b) {
            b.preventDefault(), a.scrolling = !0;
            var c = function () {
                if (a.scrolling) {
                    var b = a.scroll[a.orient.wrapperSize], d = b / 2, e = a.mousePos - d;
                    if (Math.abs(e) > a.options.hysteresis) {
                        var f = a.options.hysteresis;
                        f *= e > 0 ? -1 : 0, e = a.options.scrollSpeed * (e + f), e /= d;
                        var g = a.scroll[a.orient.pos] - e, h = a.scroll[a.orient.minScroll] || 0, i = a.scroll[a.orient.maxScroll];
                        g >= h ? a.scrollTo(h) : i >= g ? a.scrollTo(i) : a.scrollTo(e, !0)
                    }
                    setTimeout(c, 30)
                }
            };
            c()
        }
    }(this)).bind("mouseleave", function (a) {
        return function (b) {
            b.preventDefault(), a.scrolling = !1
        }
    }(this)), this.scroll.refresh(), this.scroll.scrollTo(0, 0, 200))
}, osmplayer.playlist.prototype.addNode = function (a) {
    var b = this.nodes.length, c = this.create("teaser", "osmplayer", this.elements.list);
    c.setNode(a), c.ubind(this.uuid + ":nodeLoad", function (a) {
        return function () {
            a.loadItem(b, !0)
        }
    }(this)), this.nodes.push(c)
}, osmplayer.playlist.prototype.set = function (a, b) {
    if ("object" != typeof a)return void this.trigger("error", "Playlist must be an object to set");
    if (!a.hasOwnProperty("total_rows"))return void this.trigger("error", "Unknown playlist format.");
    if (a.total_rows && a.nodes.length) {
        this.totalItems = a.total_rows, this.currentItem = 0, (this.page + 1) * this.options.pageLimit >= this.totalItems || this.totalItems == a.nodes.length ? this.pager.nextPage.hide() : this.pager.nextPage.show();
        var c = a.nodes.length;
        this.elements.list.empty(), this.nodes = [];
        for (var d = 0; c > d; d++)this.addNode(a.nodes[d]), b === d && this.loadItem(d);
        this.refreshScroll(), this.trigger("playlistLoad", a)
    }
    this.elements.playlist_busy && this.elements.playlist_busy.hide()
}, osmplayer.playlist.prototype.setQueue = function () {
    this.playqueue.push({page: this.page, item: this.currentItem}), this.playqueuepos = this.playqueue.length
}, osmplayer.playlist.prototype.next = function () {
    var a = 0, b = this.page;
    if (this.playqueuepos >= this.playqueue.length)return this.options.shuffle ? (a = Math.floor(Math.random() * this.totalItems), b = Math.floor(a / this.options.pageLimit), a %= this.options.pageLimit, this.load(b, a)) : (a = this.currentItem + 1, a >= this.nodes.length ? this.load(b + 1, 0) : this.loadItem(a));
    this.playqueuepos = this.playqueuepos + 1;
    var c = this.playqueue[this.playqueuepos];
    return this.load(c.page, c.item)
}, osmplayer.playlist.prototype.prev = function () {
    this.playqueuepos = this.playqueuepos - 1, this.playqueuepos = this.playqueuepos < 0 ? 0 : this.playqueuepos;
    var a = this.playqueue[this.playqueuepos];
    return a ? this.load(a.page, a.item) : !1
}, osmplayer.playlist.prototype.loadItem = function (a, b) {
    if (a < this.nodes.length) {
        this.setQueue();
        var c = this.nodes[this.currentItem];
        return c.select(!1), this.currentItem = a, c = this.nodes[a], c.select(!0), c.node.autoplay = !!b, this.trigger("nodeLoad", c.node), !0
    }
    return !1
}, osmplayer.playlist.prototype.nextPage = function (a) {
    return this.load(this.page + 1, a)
}, osmplayer.playlist.prototype.prevPage = function (a) {
    return this.load(this.page - 1, a)
}, osmplayer.playlist.prototype.load = function (a, b) {
    if (this.playlist == this.options.playlist && a == this.page)return this.loadItem(b);
    if (this.playlist = this.options.playlist, !this.playlist)return !1;
    var c = Math.floor(this.totalItems / this.options.pageLimit);
    if (a > c) {
        if (!this.options.loop)return !1;
        a = 0, b = 0
    }
    if (this.elements.playlist_busy && this.elements.playlist_busy.show(), a = a || 0, a = 0 > a ? 0 : a, this.setQueue(), this.page = a, 0 === this.page ? this.pager.prevPage.hide() : this.pager.prevPage.show(), "object" == typeof this.playlist)return this.set(this.playlist, b), this.playlist.endpoint && (this.playlist = this.options.playlist = this.playlist.endpoint), !0;
    var d = osmplayer.parser["default"];
    for (var e in osmplayer.parser)osmplayer.parser.hasOwnProperty(e) && osmplayer.parser[e].valid(this.playlist) && osmplayer.parser[e].priority > d.priority && (d = osmplayer.parser[e]);
    var f = this.page * this.options.pageLimit, g = d.getFeed(this.playlist, f, this.options.pageLimit), h = {
        type: "GET",
        url: g,
        success: function (a) {
            return function (c) {
                a.set(d.parse(c), b)
            }
        }(this),
        error: function (a) {
            return function (b, c) {
                a.elements.playlist_busy && a.elements.playlist_busy.hide(), a.trigger("error", c)
            }
        }(this)
    }, i = d.getType();
    return i && (h.dataType = i), jQuery.ajax(h), !0
};
var osmplayer = osmplayer || {};
osmplayer.pager = function (a, b) {
    minplayer.display.call(this, "pager", a, b)
}, osmplayer.pager.prototype = new minplayer.display, osmplayer.pager.prototype.constructor = osmplayer.pager, osmplayer.pager.prototype.construct = function () {
    minplayer.display.prototype.construct.call(this), this.elements.prevPage && (this.prevPage = this.elements.prevPage.click(function (a) {
        return function (b) {
            b.preventDefault(), a.trigger("prevPage")
        }
    }(this))), this.elements.nextPage && (this.nextPage = this.elements.nextPage.click(function (a) {
        return function (b) {
            b.preventDefault(), a.trigger("nextPage")
        }
    }(this)))
};
var osmplayer = osmplayer || {};
osmplayer.teaser = function (a, b) {
    this.preview = null, minplayer.display.call(this, "teaser", a, b)
}, osmplayer.teaser.prototype = new minplayer.display, osmplayer.teaser.prototype.constructor = osmplayer.teaser, osmplayer.teaser.prototype.select = function () {
}, osmplayer.teaser.prototype.setNode = function (a) {
    this.node = a, this.elements.title && (a.title ? this.elements.title.text(a.title) : osmplayer.getNode(a, function (a) {
        return function (b) {
            a.elements.title.text(b.title)
        }
    }(this))), a.mediafiles && osmplayer.getImage(a.mediafiles, "thumbnail", function (a) {
        return function (b) {
            b && a.elements.image && (a.preview = new minplayer.image(a.elements.image), a.preview.load(b.path))
        }
    }(this)), this.display.unbind("click").click(function (a) {
        return function (b) {
            b.preventDefault(), a.trigger("nodeLoad", a.node)
        }
    }(this))
};