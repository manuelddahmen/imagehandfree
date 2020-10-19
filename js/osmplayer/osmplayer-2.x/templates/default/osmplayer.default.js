!function (a, b) {
    b.playLoader = b.playLoader || {}, b.playLoader[a] = function (a, b) {
        minplayer.playLoader.call(this, a, b)
    }, b.playLoader[a].prototype = new minplayer.playLoader, b.playLoader[a].prototype.constructor = b.playLoader[a], b.playLoader[a].prototype.getDisplay = function () {
        return this.options.build && jQuery(".minplayer-" + a, this.context).prepend('<div class="minplayer-' + a + '-loader-wrapper"><div class="minplayer-' + a + '-big-play ui-state-default"><span></span></div><div class="minplayer-' + a + '-loader">&nbsp;</div><div class="minplayer-' + a + '-preview ui-widget-content"></div></div>'), jQuery(".minplayer-" + a + " .minplayer-" + a + "-loader-wrapper", this.context)
    }, b.playLoader[a].prototype.loadPreview = function (a) {
        minplayer.playLoader.prototype.loadPreview.call(this, a) || this.elements.preview.addClass("no-image")
    }, b.playLoader[a].prototype.getElements = function () {
        var b = minplayer.playLoader.prototype.getElements.call(this);
        return jQuery.extend(b, {
            busy: jQuery(".minplayer-" + a + "-loader", this.display),
            bigPlay: jQuery(".minplayer-" + a + "-big-play", this.display),
            preview: jQuery(".minplayer-" + a + "-preview", this.display)
        })
    }
}("default", osmplayer || {}), function (a, b) {
    b.controller = b.controller || {}, b.controller[a] = function (a, b) {
        minplayer.controller.call(this, a, b)
    }, b.controller[a].prototype = new minplayer.controller, b.controller[a].prototype.constructor = b.controller[a], b.controller[a].prototype.construct = function () {
        this.options = jQuery.extend({
            volumeVertical: !0,
            controllerOnly: !1,
            showController: !0
        }, this.options), minplayer.controller.prototype.construct.call(this);
        var a = this;
        if (!this.options.showController)return void this.get("player", function (a) {
            a.display.removeClass("with-controller")
        });
        if (!this.options.volumeVertical || this.options.controllerOnly) {
            this.display.addClass("minplayer-controls-volume-horizontal"), this.display.removeClass("minplayer-controls-volume-vertical");
            try {
                this.volumeBar.slider("option", "orientation", "horizontal")
            } catch (b) {
            }
        } else this.display.addClass("minplayer-controls-volume-vertical"), this.display.removeClass("minplayer-controls-volume-horizontal");
        this.get("player", function (b) {
            a.options.controllerOnly ? b.display.addClass("controller-only") : this.get("media", function (a) {
                a.hasController() ? b.display.addClass("with-controller") : this.showThenHide(5e3, function (a) {
                    var c = a ? "addClass" : "removeClass";
                    b.display[c]("with-controller")
                })
            })
        })
    }, b.controller[a].prototype.getDisplay = function () {
        return this.options.showController ? (this.options.build && jQuery(".minplayer-" + a, this.context).prepend('<div class="minplayer-' + a + '-controls ui-widget-header"><div class="minplayer-' + a + '-controls-left"><a class="minplayer-' + a + "-play minplayer-" + a + '-button ui-state-default ui-corner-all" title="Play"><span class="ui-icon ui-icon-play"></span></a><a class="minplayer-' + a + "-pause minplayer-" + a + '-button ui-state-default ui-corner-all" title="Pause"><span class="ui-icon ui-icon-pause"></span></a></div><div class="minplayer-' + a + '-controls-right"><div class="minplayer-' + a + '-timer">00:00</div><div class="minplayer-' + a + '-fullscreen ui-widget-content"><div class="minplayer-' + a + '-fullscreen-inner ui-state-default"></div></div><div class="minplayer-' + a + '-volume"><div class="minplayer-' + a + '-volume-slider"></div><a class="minplayer-' + a + "-volume-mute minplayer-" + a + '-button ui-state-default ui-corner-all" title="Mute"><span class="ui-icon ui-icon-volume-on"></span></a><a class="minplayer-' + a + "-volume-unmute minplayer-" + a + '-button ui-state-default ui-corner-all" title="Unmute"><span class="ui-icon ui-icon-volume-off"></span></a></div></div><div class="minplayer-' + a + '-controls-mid"><div class="minplayer-' + a + '-seek"><div class="minplayer-' + a + '-progress ui-state-default"></div></div></div></div>'), this.context.addClass("with-controller"), jQuery(".minplayer-" + a + "-controls", this.context)) : jQuery(null)
    }, b.controller[a].prototype.getElements = function () {
        var b = minplayer.controller.prototype.getElements.call(this), c = jQuery(".minplayer-" + a + "-timer", this.display);
        return jQuery.extend(b, {
            play: jQuery(".minplayer-" + a + "-play", this.display),
            pause: jQuery(".minplayer-" + a + "-pause", this.display),
            fullscreen: jQuery(".minplayer-" + a + "-fullscreen", this.display),
            seek: jQuery(".minplayer-" + a + "-seek", this.display),
            progress: jQuery(".minplayer-" + a + "-progress", this.display),
            volume: jQuery(".minplayer-" + a + "-volume-slider", this.display),
            mute: jQuery(".minplayer-" + a + "-volume-mute", this.display),
            timer: c,
            duration: c
        })
    }
}("default", osmplayer || {}), function (a, b) {
    b.playlist = b.playlist || {}, b.playlist[a] = function (a, c) {
        b.playlist.call(this, a, c)
    }, b.playlist[a].prototype = new b.playlist, b.playlist[a].prototype.constructor = b.playlist[a], b.playlist[a].prototype.construct = function () {
        this.options = jQuery.extend({showPlaylist: !0}, this.options), b.playlist.prototype.construct.call(this), this.showThenHide(this.elements.hideShow), this.get("player", function (a) {
            var b = this.options.vertical ? "width" : "height", c = this.options.vertical ? "right" : "bottom", d = this.options.vertical ? "marginRight" : "marginBottom";
            this.hideShow = function (e, f) {
                var g = {}, h = {}, i = this.display[b](), j = this.options.vertical ? "e" : "s", k = this.options.vertical ? "w" : "n", l = e ? "ui-icon-triangle-1-" + k : "ui-icon-triangle-1-" + j, m = e ? "ui-icon-triangle-1-" + j : "ui-icon-triangle-1-" + k;
                jQuery("span", this.elements.hideShow).removeClass(l).addClass(m), g[c] = e ? i : 0, a.elements.minplayer && (f ? a.elements.minplayer.animate(g, "fast") : a.elements.minplayer.css(g)), h[d] = e ? 0 : -i, f ? this.display.animate(h, "fast", function () {
                    a.resize()
                }) : this.display.css(h)
            }, this.ubind(this.uuid + ":playlistLoad", function (a) {
                return function (b, c) {
                    1 === c.nodes.length ? a.hideShow(!1, !0) : a.hideShow(!0, !0)
                }
            }(this)), this.elements.hideShow && this.elements.hideShow.bind("click", function (a) {
                return function (b) {
                    b.preventDefault();
                    var c = jQuery("span", a.elements.hideShow), d = (a.options.vertical ? "e" : "s", a.options.vertical ? "w" : "n"), e = c.hasClass("ui-icon-triangle-1-" + d);
                    a.hideShow(e, !0)
                }
            }(this)), a.elements.minplayer && (this.options.showPlaylist ? this.options.vertical ? a.elements.minplayer.css("right", this.display.width() + "px") : a.elements.minplayer.css("bottom", this.display.height() + "px") : this.hideShow(!1))
        })
    }, b.playlist[a].prototype.getDisplay = function () {
        return this.options.build && this.context.append('<div class="osmplayer-' + a + '-playlist"><div class="osmplayer-' + a + '-hide-show-playlist ui-state-default"><span class="ui-icon"></span></div><div class="minplayer-' + a + '-loader-wrapper"><div class="minplayer-' + a + '-loader"></div></div><div class="osmplayer-' + a + '-playlist-scroll ui-widget-content"><div class="osmplayer-' + a + '-playlist-list"></div></div></div>'), jQuery(".osmplayer-" + a + "-playlist", this.context)
    }, b.playlist[a].prototype.getElements = function () {
        var c = b.playlist.prototype.getElements.call(this), d = this.options.vertical ? "playlist-vertical" : "playlist-horizontal";
        d += this.options.playlistOnly ? " playlist-only" : "";
        var e = this.options.showPlaylist, f = this.options.vertical ? e ? "e" : "w" : e ? "s" : "n", g = this.options.vertical ? "ui-corner-left" : "ui-corner-top";
        (this.options.disablePlaylist || !this.options.playlist) && this.display.remove(), this.display.addClass(d);
        var h = jQuery(".osmplayer-" + a + "-hide-show-playlist", this.display);
        return h.addClass(g), this.options.playlistOnly && (h.hide(), h = null), jQuery("span", h).addClass("ui-icon-triangle-1-" + f), jQuery.extend(c, {
            playlist_busy: jQuery(".minplayer-" + a + "-loader-wrapper", this.display),
            list: jQuery(".osmplayer-" + a + "-playlist-list", this.display),
            scroll: jQuery(".osmplayer-" + a + "-playlist-scroll", this.display),
            hideShow: h
        })
    }
}("default", osmplayer || {}), function (a, b) {
    b.teaser = b.teaser || {}, b.teaser[a] = function (a, c) {
        b.teaser.call(this, a, c)
    }, b.teaser[a].prototype = new b.teaser, b.teaser[a].prototype.constructor = b.teaser[a], b.teaser[a].prototype.construct = function () {
        minplayer.display.prototype.construct.call(this), this.display.bind("mouseenter", function (a) {
            return function () {
                a.addClass("ui-state-hover")
            }
        }(this.elements.info)).bind("mouseleave", function (a) {
            return function () {
                a.removeClass("ui-state-hover")
            }
        }(this.elements.info))
    }, b.teaser[a].prototype.getDisplay = function () {
        this.context.append('<div class="osmplayer-' + a + '-teaser ui-widget-content"><div class="osmplayer-' + a + '-teaser-image"></div><div class="osmplayer-' + a + '-teaser-info ui-state-default"><div class="osmplayer-' + a + '-teaser-title"></div></div></div>');
        var b = jQuery(".osmplayer-" + a + "-teaser", this.context);
        return b.eq(b.length - 1)
    }, b.teaser[a].prototype.select = function (a) {
        a ? this.elements.info.addClass("ui-state-active") : this.elements.info.removeClass("ui-state-active")
    }, b.teaser[a].prototype.getElements = function () {
        var c = b.teaser.prototype.getElements.call(this);
        return jQuery.extend(c, {
            info: jQuery(".osmplayer-" + a + "-teaser-info", this.display),
            title: jQuery(".osmplayer-" + a + "-teaser-title", this.display),
            image: jQuery(".osmplayer-" + a + "-teaser-image", this.display)
        })
    }
}("default", osmplayer || {}), function (a, b) {
    b.pager = b.pager || {}, b.pager[a] = function (a, c) {
        b.pager.call(this, a, c)
    }, b.pager[a].prototype = new b.pager, b.pager[a].prototype.constructor = b.pager[a], b.pager[a].prototype.getDisplay = function () {
        return this.options.build && this.context.append('<div class="osmplayer-' + a + '-playlist-pager ui-widget-header"><div class="osmplayer-' + a + '-playlist-pager-left"><a href="#" class="osmplayer-' + a + "-playlist-pager-link osmplayer-" + a + "-playlist-pager-prevpage minplayer-" + a + '-button ui-state-default ui-corner-all"><span class="ui-icon ui-icon-circle-triangle-w"></span></a></div><div class="osmplayer-' + a + '-playlist-pager-right"><a href="#" class="osmplayer-' + a + "-playlist-pager-link osmplayer-" + a + "-playlist-pager-nextpage minplayer-" + a + '-button ui-state-default ui-corner-all"><span class="ui-icon ui-icon-circle-triangle-e"></span></a></div></div>'), jQuery(".osmplayer-" + a + "-playlist-pager", this.context)
    }, b.pager[a].prototype.getElements = function () {
        var c = b.pager.prototype.getElements.call(this);
        return jQuery.extend(c, {
            prevPage: jQuery(".osmplayer-" + a + "-playlist-pager-prevpage", this.display),
            nextPage: jQuery(".osmplayer-" + a + "-playlist-pager-nextpage", this.display)
        })
    }
}("default", osmplayer || {}), function (a, b) {
    b[a] = function (a, c) {
        b.call(this, a, c)
    }, b[a].prototype = new b, b[a].prototype.constructor = b[a], b[a].prototype.getDisplay = function () {
        return 0 === this.context.children().length && (this.context = this.context.attr({
            id: this.options.id + "-player",
            "class": "minplayer-" + a + "-media"
        }).wrap(jQuery(document.createElement("div")).attr({"class": "minplayer-" + a + "-display ui-widget-content"})).parent(".minplayer-" + a + "-display").wrap(jQuery(document.createElement("div")).attr({"class": "minplayer-" + a})).parent(".minplayer-" + a).prepend('<div class="minplayer-' + a + '-logo"></div><div class="minplayer-' + a + '-error"></div>').wrap(jQuery(document.createElement("div")).attr({
            id: this.options.id,
            "class": "osmplayer-" + a + " player-ui"
        })).parent(".osmplayer-" + a), this.options.build = !0), this.context
    }, b[a].prototype.getElements = function () {
        var c = b.prototype.getElements.call(this);
        this.display.width(this.options.width), this.display.height(this.options.height);
        var d = jQuery(".minplayer-" + a, this.display);
        return this.options.playlistOnly && (d.remove(), d = null), jQuery.extend(c, {
            player: this.display,
            minplayer: d,
            display: jQuery(".minplayer-" + a + "-display", this.display),
            media: jQuery(".minplayer-" + a + "-media", this.display),
            error: jQuery(".minplayer-" + a + "-error", this.display),
            logo: jQuery(".minplayer-" + a + "-logo", this.display)
        })
    }
}("default", osmplayer || {});