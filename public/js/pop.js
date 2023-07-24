/* Error de minimización. Devolviendo el contenido no minimizado.
(21,32350-32356): run-time warning JS1028: Expected identifier or string: delete
(22,6316-6322): run-time warning JS1028: Expected identifier or string: delete
 */
/* NUGET: BEGIN LICENSE TEXT
 *
 * Microsoft grants you the right to use these script files for the sole
 * purpose of either: (i) interacting through your browser with the Microsoft
 * website or online service, subject to the applicable licensing or use
 * terms; or (ii) using the files as included with a Microsoft product subject
 * to that product's license terms. Microsoft reserves all other rights to the
 * files not expressly granted by Microsoft, whether by implication, estoppel
 * or otherwise. Insofar as a script file is dual licensed under GPL,
 * Microsoft neither took the code under GPL nor distributes it thereunder but
 * under the terms set out in this paragraph. All notices and licenses
 * below are for informational purposes only.
 *
 * NUGET: END LICENSE TEXT */

/**
* bootstrap.js v3.0.0 by @fat and @mdo
* Copyright 2013 Twitter Inc.
* http://www.apache.org/licenses/LICENSE-2.0
*/
if (!jQuery) throw new Error("Bootstrap requires jQuery"); +function (a) { "use strict"; function b() { var a = document.createElement("bootstrap"), b = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" }; for (var c in b) if (void 0 !== a.style[c]) return { end: b[c] } } a.fn.emulateTransitionEnd = function (b) { var c = !1, d = this; a(this).one(a.support.transition.end, function () { c = !0 }); var e = function () { c || a(d).trigger(a.support.transition.end) }; return setTimeout(e, b), this }, a(function () { a.support.transition = b() }) }(window.jQuery), +function (a) { "use strict"; var b = '[data-dismiss="alert"]', c = function (c) { a(c).on("click", b, this.close) }; c.prototype.close = function (b) { function c() { f.trigger("closed.bs.alert").remove() } var d = a(this), e = d.attr("data-target"); e || (e = d.attr("href"), e = e && e.replace(/.*(?=#[^\s]*$)/, "")); var f = a(e); b && b.preventDefault(), f.length || (f = d.hasClass("alert") ? d : d.parent()), f.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one(a.support.transition.end, c).emulateTransitionEnd(150) : c()) }; var d = a.fn.alert; a.fn.alert = function (b) { return this.each(function () { var d = a(this), e = d.data("bs.alert"); e || d.data("bs.alert", e = new c(this)), "string" == typeof b && e[b].call(d) }) }, a.fn.alert.Constructor = c, a.fn.alert.noConflict = function () { return a.fn.alert = d, this }, a(document).on("click.bs.alert.data-api", b, c.prototype.close) }(window.jQuery), +function (a) { "use strict"; var b = function (c, d) { this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d) }; b.DEFAULTS = { loadingText: "loading..." }, b.prototype.setState = function (a) { var b = "disabled", c = this.$element, d = c.is("input") ? "val" : "html", e = c.data(); a += "Text", e.resetText || c.data("resetText", c[d]()), c[d](e[a] || this.options[a]), setTimeout(function () { "loadingText" == a ? c.addClass(b).attr(b, b) : c.removeClass(b).removeAttr(b) }, 0) }, b.prototype.toggle = function () { var a = this.$element.closest('[data-toggle="buttons"]'); if (a.length) { var b = this.$element.find("input").prop("checked", !this.$element.hasClass("active")).trigger("change"); "radio" === b.prop("type") && a.find(".active").removeClass("active") } this.$element.toggleClass("active") }; var c = a.fn.button; a.fn.button = function (c) { return this.each(function () { var d = a(this), e = d.data("bs.button"), f = "object" == typeof c && c; e || d.data("bs.button", e = new b(this, f)), "toggle" == c ? e.toggle() : c && e.setState(c) }) }, a.fn.button.Constructor = b, a.fn.button.noConflict = function () { return a.fn.button = c, this }, a(document).on("click.bs.button.data-api", "[data-toggle^=button]", function (b) { var c = a(b.target); c.hasClass("btn") || (c = c.closest(".btn")), c.button("toggle"), b.preventDefault() }) }(window.jQuery), +function (a) { "use strict"; var b = function (b, c) { this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter", a.proxy(this.pause, this)).on("mouseleave", a.proxy(this.cycle, this)) }; b.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0 }, b.prototype.cycle = function (b) { return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this }, b.prototype.getActiveIndex = function () { return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active) }, b.prototype.to = function (b) { var c = this, d = this.getActiveIndex(); return b > this.$items.length - 1 || 0 > b ? void 0 : this.sliding ? this.$element.one("slid", function () { c.to(b) }) : d == b ? this.pause().cycle() : this.slide(b > d ? "next" : "prev", a(this.$items[b])) }, b.prototype.pause = function (b) { return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition.end && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this }, b.prototype.next = function () { return this.sliding ? void 0 : this.slide("next") }, b.prototype.prev = function () { return this.sliding ? void 0 : this.slide("prev") }, b.prototype.slide = function (b, c) { var d = this.$element.find(".item.active"), e = c || d[b](), f = this.interval, g = "next" == b ? "left" : "right", h = "next" == b ? "first" : "last", i = this; if (!e.length) { if (!this.options.wrap) return; e = this.$element.find(".item")[h]() } this.sliding = !0, f && this.pause(); var j = a.Event("slide.bs.carousel", { relatedTarget: e[0], direction: g }); if (!e.hasClass("active")) { if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function () { var b = a(i.$indicators.children()[i.getActiveIndex()]); b && b.addClass("active") })), a.support.transition && this.$element.hasClass("slide")) { if (this.$element.trigger(j), j.isDefaultPrevented()) return; e.addClass(b), e[0].offsetWidth, d.addClass(g), e.addClass(g), d.one(a.support.transition.end, function () { e.removeClass([b, g].join(" ")).addClass("active"), d.removeClass(["active", g].join(" ")), i.sliding = !1, setTimeout(function () { i.$element.trigger("slid") }, 0) }).emulateTransitionEnd(600) } else { if (this.$element.trigger(j), j.isDefaultPrevented()) return; d.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger("slid") } return f && this.cycle(), this } }; var c = a.fn.carousel; a.fn.carousel = function (c) { return this.each(function () { var d = a(this), e = d.data("bs.carousel"), f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c), g = "string" == typeof c ? c : f.slide; e || d.data("bs.carousel", e = new b(this, f)), "number" == typeof c ? e.to(c) : g ? e[g]() : f.interval && e.pause().cycle() }) }, a.fn.carousel.Constructor = b, a.fn.carousel.noConflict = function () { return a.fn.carousel = c, this }, a(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function (b) { var c, d = a(this), e = a(d.attr("data-target") || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "")), f = a.extend({}, e.data(), d.data()), g = d.attr("data-slide-to"); g && (f.interval = !1), e.carousel(f), (g = d.attr("data-slide-to")) && e.data("bs.carousel").to(g), b.preventDefault() }), a(window).on("load", function () { a('[data-ride="carousel"]').each(function () { var b = a(this); b.carousel(b.data()) }) }) }(window.jQuery), +function (a) { "use strict"; var b = function (c, d) { this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d), this.transitioning = null, this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle() }; b.DEFAULTS = { toggle: !0 }, b.prototype.dimension = function () { var a = this.$element.hasClass("width"); return a ? "width" : "height" }, b.prototype.show = function () { if (!this.transitioning && !this.$element.hasClass("in")) { var b = a.Event("show.bs.collapse"); if (this.$element.trigger(b), !b.isDefaultPrevented()) { var c = this.$parent && this.$parent.find("> .panel > .in"); if (c && c.length) { var d = c.data("bs.collapse"); if (d && d.transitioning) return; c.collapse("hide"), d || c.data("bs.collapse", null) } var e = this.dimension(); this.$element.removeClass("collapse").addClass("collapsing")[e](0), this.transitioning = 1; var f = function () { this.$element.removeClass("collapsing").addClass("in")[e]("auto"), this.transitioning = 0, this.$element.trigger("shown.bs.collapse") }; if (!a.support.transition) return f.call(this); var g = a.camelCase(["scroll", e].join("-")); this.$element.one(a.support.transition.end, a.proxy(f, this)).emulateTransitionEnd(350)[e](this.$element[0][g]) } } }, b.prototype.hide = function () { if (!this.transitioning && this.$element.hasClass("in")) { var b = a.Event("hide.bs.collapse"); if (this.$element.trigger(b), !b.isDefaultPrevented()) { var c = this.dimension(); this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1; var d = function () { this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse") }; return a.support.transition ? (this.$element[c](0).one(a.support.transition.end, a.proxy(d, this)).emulateTransitionEnd(350), void 0) : d.call(this) } } }, b.prototype.toggle = function () { this[this.$element.hasClass("in") ? "hide" : "show"]() }; var c = a.fn.collapse; a.fn.collapse = function (c) { return this.each(function () { var d = a(this), e = d.data("bs.collapse"), f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c); e || d.data("bs.collapse", e = new b(this, f)), "string" == typeof c && e[c]() }) }, a.fn.collapse.Constructor = b, a.fn.collapse.noConflict = function () { return a.fn.collapse = c, this }, a(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function (b) { var c, d = a(this), e = d.attr("data-target") || b.preventDefault() || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, ""), f = a(e), g = f.data("bs.collapse"), h = g ? "toggle" : d.data(), i = d.attr("data-parent"), j = i && a(i); g && g.transitioning || (j && j.find('[data-toggle=collapse][data-parent="' + i + '"]').not(d).addClass("collapsed"), d[f.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), f.collapse(h) }) }(window.jQuery), +function (a) { "use strict"; function b() { a(d).remove(), a(e).each(function (b) { var d = c(a(this)); d.hasClass("open") && (d.trigger(b = a.Event("hide.bs.dropdown")), b.isDefaultPrevented() || d.removeClass("open").trigger("hidden.bs.dropdown")) }) } function c(b) { var c = b.attr("data-target"); c || (c = b.attr("href"), c = c && /#/.test(c) && c.replace(/.*(?=#[^\s]*$)/, "")); var d = c && a(c); return d && d.length ? d : b.parent() } var d = ".dropdown-backdrop", e = "[data-toggle=dropdown]", f = function (b) { a(b).on("click.bs.dropdown", this.toggle) }; f.prototype.toggle = function (d) { var e = a(this); if (!e.is(".disabled, :disabled")) { var f = c(e), g = f.hasClass("open"); if (b(), !g) { if ("ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b), f.trigger(d = a.Event("show.bs.dropdown")), d.isDefaultPrevented()) return; f.toggleClass("open").trigger("shown.bs.dropdown"), e.focus() } return !1 } }, f.prototype.keydown = function (b) { if (/(38|40|27)/.test(b.keyCode)) { var d = a(this); if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) { var f = c(d), g = f.hasClass("open"); if (!g || g && 27 == b.keyCode) return 27 == b.which && f.find(e).focus(), d.click(); var h = a("[role=menu] li:not(.divider):visible a", f); if (h.length) { var i = h.index(h.filter(":focus")); 38 == b.keyCode && i > 0 && i--, 40 == b.keyCode && i < h.length - 1 && i++, ~i || (i = 0), h.eq(i).focus() } } } }; var g = a.fn.dropdown; a.fn.dropdown = function (b) { return this.each(function () { var c = a(this), d = c.data("dropdown"); d || c.data("dropdown", d = new f(this)), "string" == typeof b && d[b].call(c) }) }, a.fn.dropdown.Constructor = f, a.fn.dropdown.noConflict = function () { return a.fn.dropdown = g, this }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function (a) { a.stopPropagation() }).on("click.bs.dropdown.data-api", e, f.prototype.toggle).on("keydown.bs.dropdown.data-api", e + ", [role=menu]", f.prototype.keydown) }(window.jQuery), +function (a) { "use strict"; var b = function (b, c) { this.options = c, this.$element = a(b), this.$backdrop = this.isShown = null, this.options.remote && this.$element.load(this.options.remote) }; b.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }, b.prototype.toggle = function (a) { return this[this.isShown ? "hide" : "show"](a) }, b.prototype.show = function (b) { var c = this, d = a.Event("show.bs.modal", { relatedTarget: b }); this.$element.trigger(d), this.isShown || d.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.$element.on("click.dismiss.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.backdrop(function () { var d = a.support.transition && c.$element.hasClass("fade"); c.$element.parent().length || c.$element.appendTo(document.body), c.$element.show(), d && c.$element[0].offsetWidth, c.$element.addClass("in").attr("aria-hidden", !1), c.enforceFocus(); var e = a.Event("shown.bs.modal", { relatedTarget: b }); d ? c.$element.find(".modal-dialog").one(a.support.transition.end, function () { c.$element.focus().trigger(e) }).emulateTransitionEnd(300) : c.$element.focus().trigger(e) })) }, b.prototype.hide = function (b) { b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one(a.support.transition.end, a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal()) }, b.prototype.enforceFocus = function () { a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) { this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.focus() }, this)) }, b.prototype.escape = function () { this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", a.proxy(function (a) { 27 == a.which && this.hide() }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal") }, b.prototype.hideModal = function () { var a = this; this.$element.hide(), this.backdrop(function () { a.removeBackdrop(), a.$element.trigger("hidden.bs.modal") }) }, b.prototype.removeBackdrop = function () { this.$backdrop && this.$backdrop.remove(), this.$backdrop = null }, b.prototype.backdrop = function (b) { var c = this.$element.hasClass("fade") ? "fade" : ""; if (this.isShown && this.options.backdrop) { var d = a.support.transition && c; if (this.$backdrop = a('<div class="modal-backdrop ' + c + '" />').appendTo(document.body), this.$element.on("click.dismiss.modal", a.proxy(function (a) { a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this)) }, this)), d && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return; d ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b() } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()) : b && b() }; var c = a.fn.modal; a.fn.modal = function (c, d) { return this.each(function () { var e = a(this), f = e.data("bs.modal"), g = a.extend({}, b.DEFAULTS, e.data(), "object" == typeof c && c); f || e.data("bs.modal", f = new b(this, g)), "string" == typeof c ? f[c](d) : g.show && f.show(d) }) }, a.fn.modal.Constructor = b, a.fn.modal.noConflict = function () { return a.fn.modal = c, this }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (b) { var c = a(this), d = c.attr("href"), e = a(c.attr("data-target") || d && d.replace(/.*(?=#[^\s]+$)/, "")), f = e.data("modal") ? "toggle" : a.extend({ remote: !/#/.test(d) && d }, e.data(), c.data()); b.preventDefault(), e.modal(f, this).one("hide", function () { c.is(":visible") && c.focus() }) }), a(document).on("show.bs.modal", ".modal", function () { a(document.body).addClass("modal-open") }).on("hidden.bs.modal", ".modal", function () { a(document.body).removeClass("modal-open") }) }(window.jQuery), +function (a) { "use strict"; var b = function (a, b) { this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", a, b) }; b.DEFAULTS = { animation: !0, placement: "top", selector: !1, template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, container: !1 }, b.prototype.init = function (b, c, d) { this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d); for (var e = this.options.trigger.split(" "), f = e.length; f--;) { var g = e[f]; if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this)); else if ("manual" != g) { var h = "hover" == g ? "mouseenter" : "focus", i = "hover" == g ? "mouseleave" : "blur"; this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this)) } } this.options.selector ? this._options = a.extend({}, this.options, { trigger: "manual", selector: "" }) : this.fixTitle() }, b.prototype.getDefaults = function () { return b.DEFAULTS }, b.prototype.getOptions = function (b) { return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = { show: b.delay, hide: b.delay }), b }, b.prototype.getDelegateOptions = function () { var b = {}, c = this.getDefaults(); return this._options && a.each(this._options, function (a, d) { c[a] != d && (b[a] = d) }), b }, b.prototype.enter = function (b) { var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type); return clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? (c.timeout = setTimeout(function () { "in" == c.hoverState && c.show() }, c.options.delay.show), void 0) : c.show() }, b.prototype.leave = function (b) { var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type); return clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? (c.timeout = setTimeout(function () { "out" == c.hoverState && c.hide() }, c.options.delay.hide), void 0) : c.hide() }, b.prototype.show = function () { var b = a.Event("show.bs." + this.type); if (this.hasContent() && this.enabled) { if (this.$element.trigger(b), b.isDefaultPrevented()) return; var c = this.tip(); this.setContent(), this.options.animation && c.addClass("fade"); var d = "function" == typeof this.options.placement ? this.options.placement.call(this, c[0], this.$element[0]) : this.options.placement, e = /\s?auto?\s?/i, f = e.test(d); f && (d = d.replace(e, "") || "top"), c.detach().css({ top: 0, left: 0, display: "block" }).addClass(d), this.options.container ? c.appendTo(this.options.container) : c.insertAfter(this.$element); var g = this.getPosition(), h = c[0].offsetWidth, i = c[0].offsetHeight; if (f) { var j = this.$element.parent(), k = d, l = document.documentElement.scrollTop || document.body.scrollTop, m = "body" == this.options.container ? window.innerWidth : j.outerWidth(), n = "body" == this.options.container ? window.innerHeight : j.outerHeight(), o = "body" == this.options.container ? 0 : j.offset().left; d = "bottom" == d && g.top + g.height + i - l > n ? "top" : "top" == d && g.top - l - i < 0 ? "bottom" : "right" == d && g.right + h > m ? "left" : "left" == d && g.left - h < o ? "right" : d, c.removeClass(k).addClass(d) } var p = this.getCalculatedOffset(d, g, h, i); this.applyPlacement(p, d), this.$element.trigger("shown.bs." + this.type) } }, b.prototype.applyPlacement = function (a, b) { var c, d = this.tip(), e = d[0].offsetWidth, f = d[0].offsetHeight, g = parseInt(d.css("margin-top"), 10), h = parseInt(d.css("margin-left"), 10); isNaN(g) && (g = 0), isNaN(h) && (h = 0), a.top = a.top + g, a.left = a.left + h, d.offset(a).addClass("in"); var i = d[0].offsetWidth, j = d[0].offsetHeight; if ("top" == b && j != f && (c = !0, a.top = a.top + f - j), /bottom|top/.test(b)) { var k = 0; a.left < 0 && (k = -2 * a.left, a.left = 0, d.offset(a), i = d[0].offsetWidth, j = d[0].offsetHeight), this.replaceArrow(k - e + i, i, "left") } else this.replaceArrow(j - f, j, "top"); c && d.offset(a) }, b.prototype.replaceArrow = function (a, b, c) { this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "") }, b.prototype.setContent = function () { var a = this.tip(), b = this.getTitle(); a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right") }, b.prototype.hide = function () { function b() { "in" != c.hoverState && d.detach() } var c = this, d = this.tip(), e = a.Event("hide.bs." + this.type); return this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : (d.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? d.one(a.support.transition.end, b).emulateTransitionEnd(150) : b(), this.$element.trigger("hidden.bs." + this.type), this) }, b.prototype.fixTitle = function () { var a = this.$element; (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "") }, b.prototype.hasContent = function () { return this.getTitle() }, b.prototype.getPosition = function () { var b = this.$element[0]; return a.extend({}, "function" == typeof b.getBoundingClientRect ? b.getBoundingClientRect() : { width: b.offsetWidth, height: b.offsetHeight }, this.$element.offset()) }, b.prototype.getCalculatedOffset = function (a, b, c, d) { return "bottom" == a ? { top: b.top + b.height, left: b.left + b.width / 2 - c / 2 } : "top" == a ? { top: b.top - d, left: b.left + b.width / 2 - c / 2 } : "left" == a ? { top: b.top + b.height / 2 - d / 2, left: b.left - c } : { top: b.top + b.height / 2 - d / 2, left: b.left + b.width } }, b.prototype.getTitle = function () { var a, b = this.$element, c = this.options; return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title) }, b.prototype.tip = function () { return this.$tip = this.$tip || a(this.options.template) }, b.prototype.arrow = function () { return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow") }, b.prototype.validate = function () { this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null) }, b.prototype.enable = function () { this.enabled = !0 }, b.prototype.disable = function () { this.enabled = !1 }, b.prototype.toggleEnabled = function () { this.enabled = !this.enabled }, b.prototype.toggle = function (b) { var c = b ? a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this; c.tip().hasClass("in") ? c.leave(c) : c.enter(c) }, b.prototype.destroy = function () { this.hide().$element.off("." + this.type).removeData("bs." + this.type) }; var c = a.fn.tooltip; a.fn.tooltip = function (c) { return this.each(function () { var d = a(this), e = d.data("bs.tooltip"), f = "object" == typeof c && c; e || d.data("bs.tooltip", e = new b(this, f)), "string" == typeof c && e[c]() }) }, a.fn.tooltip.Constructor = b, a.fn.tooltip.noConflict = function () { return a.fn.tooltip = c, this } }(window.jQuery), +function (a) { "use strict"; var b = function (a, b) { this.init("popover", a, b) }; if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js"); b.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, { placement: "right", trigger: "click", content: "", template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>' }), b.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), b.prototype.constructor = b, b.prototype.getDefaults = function () { return b.DEFAULTS }, b.prototype.setContent = function () { var a = this.tip(), b = this.getTitle(), c = this.getContent(); a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content")[this.options.html ? "html" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide() }, b.prototype.hasContent = function () { return this.getTitle() || this.getContent() }, b.prototype.getContent = function () { var a = this.$element, b = this.options; return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content) }, b.prototype.arrow = function () { return this.$arrow = this.$arrow || this.tip().find(".arrow") }, b.prototype.tip = function () { return this.$tip || (this.$tip = a(this.options.template)), this.$tip }; var c = a.fn.popover; a.fn.popover = function (c) { return this.each(function () { var d = a(this), e = d.data("bs.popover"), f = "object" == typeof c && c; e || d.data("bs.popover", e = new b(this, f)), "string" == typeof c && e[c]() }) }, a.fn.popover.Constructor = b, a.fn.popover.noConflict = function () { return a.fn.popover = c, this } }(window.jQuery), +function (a) { "use strict"; function b(c, d) { var e, f = a.proxy(this.process, this); this.$element = a(c).is("body") ? a(window) : a(c), this.$body = a("body"), this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", f), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || (e = a(c).attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.offsets = a([]), this.targets = a([]), this.activeTarget = null, this.refresh(), this.process() } b.DEFAULTS = { offset: 10 }, b.prototype.refresh = function () { var b = this.$element[0] == window ? "offset" : "position"; this.offsets = a([]), this.targets = a([]); var c = this; this.$body.find(this.selector).map(function () { var d = a(this), e = d.data("target") || d.attr("href"), f = /^#\w/.test(e) && a(e); return f && f.length && [[f[b]().top + (!a.isWindow(c.$scrollElement.get(0)) && c.$scrollElement.scrollTop()), e]] || null }).sort(function (a, b) { return a[0] - b[0] }).each(function () { c.offsets.push(this[0]), c.targets.push(this[1]) }) }, b.prototype.process = function () { var a, b = this.$scrollElement.scrollTop() + this.options.offset, c = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, d = c - this.$scrollElement.height(), e = this.offsets, f = this.targets, g = this.activeTarget; if (b >= d) return g != (a = f.last()[0]) && this.activate(a); for (a = e.length; a--;) g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a]) }, b.prototype.activate = function (b) { this.activeTarget = b, a(this.selector).parents(".active").removeClass("active"); var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]', d = a(c).parents("li").addClass("active"); d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate") }; var c = a.fn.scrollspy; a.fn.scrollspy = function (c) { return this.each(function () { var d = a(this), e = d.data("bs.scrollspy"), f = "object" == typeof c && c; e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]() }) }, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () { return a.fn.scrollspy = c, this }, a(window).on("load", function () { a('[data-spy="scroll"]').each(function () { var b = a(this); b.scrollspy(b.data()) }) }) }(window.jQuery), +function (a) { "use strict"; var b = function (b) { this.element = a(b) }; b.prototype.show = function () { var b = this.element, c = b.closest("ul:not(.dropdown-menu)"), d = b.attr("data-target"); if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) { var e = c.find(".active:last a")[0], f = a.Event("show.bs.tab", { relatedTarget: e }); if (b.trigger(f), !f.isDefaultPrevented()) { var g = a(d); this.activate(b.parent("li"), c), this.activate(g, g.parent(), function () { b.trigger({ type: "shown.bs.tab", relatedTarget: e }) }) } } }, b.prototype.activate = function (b, c, d) { function e() { f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), b.addClass("active"), g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d() } var f = c.find("> .active"), g = d && a.support.transition && f.hasClass("fade"); g ? f.one(a.support.transition.end, e).emulateTransitionEnd(150) : e(), f.removeClass("in") }; var c = a.fn.tab; a.fn.tab = function (c) { return this.each(function () { var d = a(this), e = d.data("bs.tab"); e || d.data("bs.tab", e = new b(this)), "string" == typeof c && e[c]() }) }, a.fn.tab.Constructor = b, a.fn.tab.noConflict = function () { return a.fn.tab = c, this }, a(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (b) { b.preventDefault(), a(this).tab("show") }) }(window.jQuery), +function (a) { "use strict"; var b = function (c, d) { this.options = a.extend({}, b.DEFAULTS, d), this.$window = a(window).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(c), this.affixed = this.unpin = null, this.checkPosition() }; b.RESET = "affix affix-top affix-bottom", b.DEFAULTS = { offset: 0 }, b.prototype.checkPositionWithEventLoop = function () { setTimeout(a.proxy(this.checkPosition, this), 1) }, b.prototype.checkPosition = function () { if (this.$element.is(":visible")) { var c = a(document).height(), d = this.$window.scrollTop(), e = this.$element.offset(), f = this.options.offset, g = f.top, h = f.bottom; "object" != typeof f && (h = g = f), "function" == typeof g && (g = f.top()), "function" == typeof h && (h = f.bottom()); var i = null != this.unpin && d + this.unpin <= e.top ? !1 : null != h && e.top + this.$element.height() >= c - h ? "bottom" : null != g && g >= d ? "top" : !1; this.affixed !== i && (this.unpin && this.$element.css("top", ""), this.affixed = i, this.unpin = "bottom" == i ? e.top - d : null, this.$element.removeClass(b.RESET).addClass("affix" + (i ? "-" + i : "")), "bottom" == i && this.$element.offset({ top: document.body.offsetHeight - h - this.$element.height() })) } }; var c = a.fn.affix; a.fn.affix = function (c) { return this.each(function () { var d = a(this), e = d.data("bs.affix"), f = "object" == typeof c && c; e || d.data("bs.affix", e = new b(this, f)), "string" == typeof c && e[c]() }) }, a.fn.affix.Constructor = b, a.fn.affix.noConflict = function () { return a.fn.affix = c, this }, a(window).on("load", function () { a('[data-spy="affix"]').each(function () { var b = a(this), c = b.data(); c.offset = c.offset || {}, c.offsetBottom && (c.offset.bottom = c.offsetBottom), c.offsetTop && (c.offset.top = c.offsetTop), b.affix(c) }) }) }(window.jQuery);;!function(a){"use strict";if("function"==typeof define&&define.amd)define(["jquery","moment"],a);else if("object"==typeof exports)module.exports=a(require("jquery"),require("moment"));else{if("undefined"==typeof jQuery)throw"bootstrap-datetimepicker requires jQuery to be loaded first";if("undefined"==typeof moment)throw"bootstrap-datetimepicker requires Moment.js to be loaded first";a(jQuery,moment)}}(function(a,b){"use strict";if(!b)throw new Error("bootstrap-datetimepicker requires Moment.js to be loaded first");var c=function(c,d){var e,f,g,h,i,j,k,l={},m=!0,n=!1,o=!1,p=0,q=[{clsName:"days",navFnc:"M",navStep:1},{clsName:"months",navFnc:"y",navStep:1},{clsName:"years",navFnc:"y",navStep:10},{clsName:"decades",navFnc:"y",navStep:100}],r=["days","months","years","decades"],s=["top","bottom","auto"],t=["left","right","auto"],u=["default","top","bottom"],v={up:38,38:"up",down:40,40:"down",left:37,37:"left",right:39,39:"right",tab:9,9:"tab",escape:27,27:"escape",enter:13,13:"enter",pageUp:33,33:"pageUp",pageDown:34,34:"pageDown",shift:16,16:"shift",control:17,17:"control",space:32,32:"space",t:84,84:"t",delete:46,46:"delete"},w={},x=function(){return void 0!==b.tz&&void 0!==d.timeZone&&null!==d.timeZone&&""!==d.timeZone},y=function(a){var c;return c=void 0===a||null===a?b():b.isDate(a)||b.isMoment(a)?b(a):x()?b.tz(a,j,d.useStrict,d.timeZone):b(a,j,d.useStrict),x()&&c.tz(d.timeZone),c},z=function(a){if("string"!=typeof a||a.length>1)throw new TypeError("isEnabled expects a single character string parameter");switch(a){case"y":return i.indexOf("Y")!==-1;case"M":return i.indexOf("M")!==-1;case"d":return i.toLowerCase().indexOf("d")!==-1;case"h":case"H":return i.toLowerCase().indexOf("h")!==-1;case"m":return i.indexOf("m")!==-1;case"s":return i.indexOf("s")!==-1;default:return!1}},A=function(){return z("h")||z("m")||z("s")},B=function(){return z("y")||z("M")||z("d")},C=function(){var b=a("<thead>").append(a("<tr>").append(a("<th>").addClass("prev").attr("data-action","previous").append(a("<span>").addClass(d.icons.previous))).append(a("<th>").addClass("picker-switch").attr("data-action","pickerSwitch").attr("colspan",d.calendarWeeks?"6":"5")).append(a("<th>").addClass("next").attr("data-action","next").append(a("<span>").addClass(d.icons.next)))),c=a("<tbody>").append(a("<tr>").append(a("<td>").attr("colspan",d.calendarWeeks?"8":"7")));return[a("<div>").addClass("datepicker-days").append(a("<table>").addClass("table-condensed").append(b).append(a("<tbody>"))),a("<div>").addClass("datepicker-months").append(a("<table>").addClass("table-condensed").append(b.clone()).append(c.clone())),a("<div>").addClass("datepicker-years").append(a("<table>").addClass("table-condensed").append(b.clone()).append(c.clone())),a("<div>").addClass("datepicker-decades").append(a("<table>").addClass("table-condensed").append(b.clone()).append(c.clone()))]},D=function(){var b=a("<tr>"),c=a("<tr>"),e=a("<tr>");return z("h")&&(b.append(a("<td>").append(a("<a>").attr({href:"#",tabindex:"-1",title:d.tooltips.incrementHour}).addClass("btn").attr("data-action","incrementHours").append(a("<span>").addClass(d.icons.up)))),c.append(a("<td>").append(a("<span>").addClass("timepicker-hour").attr({"data-time-component":"hours",title:d.tooltips.pickHour}).attr("data-action","showHours"))),e.append(a("<td>").append(a("<a>").attr({href:"#",tabindex:"-1",title:d.tooltips.decrementHour}).addClass("btn").attr("data-action","decrementHours").append(a("<span>").addClass(d.icons.down))))),z("m")&&(z("h")&&(b.append(a("<td>").addClass("separator")),c.append(a("<td>").addClass("separator").html(":")),e.append(a("<td>").addClass("separator"))),b.append(a("<td>").append(a("<a>").attr({href:"#",tabindex:"-1",title:d.tooltips.incrementMinute}).addClass("btn").attr("data-action","incrementMinutes").append(a("<span>").addClass(d.icons.up)))),c.append(a("<td>").append(a("<span>").addClass("timepicker-minute").attr({"data-time-component":"minutes",title:d.tooltips.pickMinute}).attr("data-action","showMinutes"))),e.append(a("<td>").append(a("<a>").attr({href:"#",tabindex:"-1",title:d.tooltips.decrementMinute}).addClass("btn").attr("data-action","decrementMinutes").append(a("<span>").addClass(d.icons.down))))),z("s")&&(z("m")&&(b.append(a("<td>").addClass("separator")),c.append(a("<td>").addClass("separator").html(":")),e.append(a("<td>").addClass("separator"))),b.append(a("<td>").append(a("<a>").attr({href:"#",tabindex:"-1",title:d.tooltips.incrementSecond}).addClass("btn").attr("data-action","incrementSeconds").append(a("<span>").addClass(d.icons.up)))),c.append(a("<td>").append(a("<span>").addClass("timepicker-second").attr({"data-time-component":"seconds",title:d.tooltips.pickSecond}).attr("data-action","showSeconds"))),e.append(a("<td>").append(a("<a>").attr({href:"#",tabindex:"-1",title:d.tooltips.decrementSecond}).addClass("btn").attr("data-action","decrementSeconds").append(a("<span>").addClass(d.icons.down))))),h||(b.append(a("<td>").addClass("separator")),c.append(a("<td>").append(a("<button>").addClass("btn btn-primary").attr({"data-action":"togglePeriod",tabindex:"-1",title:d.tooltips.togglePeriod}))),e.append(a("<td>").addClass("separator"))),a("<div>").addClass("timepicker-picker").append(a("<table>").addClass("table-condensed").append([b,c,e]))},E=function(){var b=a("<div>").addClass("timepicker-hours").append(a("<table>").addClass("table-condensed")),c=a("<div>").addClass("timepicker-minutes").append(a("<table>").addClass("table-condensed")),d=a("<div>").addClass("timepicker-seconds").append(a("<table>").addClass("table-condensed")),e=[D()];return z("h")&&e.push(b),z("m")&&e.push(c),z("s")&&e.push(d),e},F=function(){var b=[];return d.showTodayButton&&b.push(a("<td>").append(a("<a>").attr({"data-action":"today",title:d.tooltips.today}).append(a("<span>").addClass(d.icons.today)))),!d.sideBySide&&B()&&A()&&b.push(a("<td>").append(a("<a>").attr({"data-action":"togglePicker",title:d.tooltips.selectTime}).append(a("<span>").addClass(d.icons.time)))),d.showClear&&b.push(a("<td>").append(a("<a>").attr({"data-action":"clear",title:d.tooltips.clear}).append(a("<span>").addClass(d.icons.clear)))),d.showClose&&b.push(a("<td>").append(a("<a>").attr({"data-action":"close",title:d.tooltips.close}).append(a("<span>").addClass(d.icons.close)))),a("<table>").addClass("table-condensed").append(a("<tbody>").append(a("<tr>").append(b)))},G=function(){var b=a("<div>").addClass("bootstrap-datetimepicker-widget dropdown-menu"),c=a("<div>").addClass("datepicker").append(C()),e=a("<div>").addClass("timepicker").append(E()),f=a("<ul>").addClass("list-unstyled"),g=a("<li>").addClass("picker-switch"+(d.collapse?" accordion-toggle":"")).append(F());return d.inline&&b.removeClass("dropdown-menu"),h&&b.addClass("usetwentyfour"),z("s")&&!h&&b.addClass("wider"),d.sideBySide&&B()&&A()?(b.addClass("timepicker-sbs"),"top"===d.toolbarPlacement&&b.append(g),b.append(a("<div>").addClass("row").append(c.addClass("col-md-6")).append(e.addClass("col-md-6"))),"bottom"===d.toolbarPlacement&&b.append(g),b):("top"===d.toolbarPlacement&&f.append(g),B()&&f.append(a("<li>").addClass(d.collapse&&A()?"collapse in":"").append(c)),"default"===d.toolbarPlacement&&f.append(g),A()&&f.append(a("<li>").addClass(d.collapse&&B()?"collapse":"").append(e)),"bottom"===d.toolbarPlacement&&f.append(g),b.append(f))},H=function(){var b,e={};return b=c.is("input")||d.inline?c.data():c.find("input").data(),b.dateOptions&&b.dateOptions instanceof Object&&(e=a.extend(!0,e,b.dateOptions)),a.each(d,function(a){var c="date"+a.charAt(0).toUpperCase()+a.slice(1);void 0!==b[c]&&(e[a]=b[c])}),e},I=function(){var b,e=(n||c).position(),f=(n||c).offset(),g=d.widgetPositioning.vertical,h=d.widgetPositioning.horizontal;if(d.widgetParent)b=d.widgetParent.append(o);else if(c.is("input"))b=c.after(o).parent();else{if(d.inline)return void(b=c.append(o));b=c,c.children().first().after(o)}if("auto"===g&&(g=f.top+1.5*o.height()>=a(window).height()+a(window).scrollTop()&&o.height()+c.outerHeight()<f.top?"top":"bottom"),"auto"===h&&(h=b.width()<f.left+o.outerWidth()/2&&f.left+o.outerWidth()>a(window).width()?"right":"left"),"top"===g?o.addClass("top").removeClass("bottom"):o.addClass("bottom").removeClass("top"),"right"===h?o.addClass("pull-right"):o.removeClass("pull-right"),"static"===b.css("position")&&(b=b.parents().filter(function(){return"static"!==a(this).css("position")}).first()),0===b.length)throw new Error("datetimepicker component should be placed within a non-static positioned container");o.css({top:"top"===g?"auto":e.top+c.outerHeight(),bottom:"top"===g?b.outerHeight()-(b===c?0:e.top):"auto",left:"left"===h?b===c?0:e.left:"auto",right:"left"===h?"auto":b.outerWidth()-c.outerWidth()-(b===c?0:e.left)})},J=function(a){"dp.change"===a.type&&(a.date&&a.date.isSame(a.oldDate)||!a.date&&!a.oldDate)||c.trigger(a)},K=function(a){"y"===a&&(a="YYYY"),J({type:"dp.update",change:a,viewDate:f.clone()})},L=function(a){o&&(a&&(k=Math.max(p,Math.min(3,k+a))),o.find(".datepicker > div").hide().filter(".datepicker-"+q[k].clsName).show())},M=function(){var b=a("<tr>"),c=f.clone().startOf("w").startOf("d");for(d.calendarWeeks===!0&&b.append(a("<th>").addClass("cw").text("#"));c.isBefore(f.clone().endOf("w"));)b.append(a("<th>").addClass("dow").text(c.format("dd"))),c.add(1,"d");o.find(".datepicker-days thead").append(b)},N=function(a){return d.disabledDates[a.format("YYYY-MM-DD")]===!0},O=function(a){return d.enabledDates[a.format("YYYY-MM-DD")]===!0},P=function(a){return d.disabledHours[a.format("H")]===!0},Q=function(a){return d.enabledHours[a.format("H")]===!0},R=function(b,c){if(!b.isValid())return!1;if(d.disabledDates&&"d"===c&&N(b))return!1;if(d.enabledDates&&"d"===c&&!O(b))return!1;if(d.minDate&&b.isBefore(d.minDate,c))return!1;if(d.maxDate&&b.isAfter(d.maxDate,c))return!1;if(d.daysOfWeekDisabled&&"d"===c&&d.daysOfWeekDisabled.indexOf(b.day())!==-1)return!1;if(d.disabledHours&&("h"===c||"m"===c||"s"===c)&&P(b))return!1;if(d.enabledHours&&("h"===c||"m"===c||"s"===c)&&!Q(b))return!1;if(d.disabledTimeIntervals&&("h"===c||"m"===c||"s"===c)){var e=!1;if(a.each(d.disabledTimeIntervals,function(){if(b.isBetween(this[0],this[1]))return e=!0,!1}),e)return!1}return!0},S=function(){for(var b=[],c=f.clone().startOf("y").startOf("d");c.isSame(f,"y");)b.push(a("<span>").attr("data-action","selectMonth").addClass("month").text(c.format("MMM"))),c.add(1,"M");o.find(".datepicker-months td").empty().append(b)},T=function(){var b=o.find(".datepicker-months"),c=b.find("th"),g=b.find("tbody").find("span");c.eq(0).find("span").attr("title",d.tooltips.prevYear),c.eq(1).attr("title",d.tooltips.selectYear),c.eq(2).find("span").attr("title",d.tooltips.nextYear),b.find(".disabled").removeClass("disabled"),R(f.clone().subtract(1,"y"),"y")||c.eq(0).addClass("disabled"),c.eq(1).text(f.year()),R(f.clone().add(1,"y"),"y")||c.eq(2).addClass("disabled"),g.removeClass("active"),e.isSame(f,"y")&&!m&&g.eq(e.month()).addClass("active"),g.each(function(b){R(f.clone().month(b),"M")||a(this).addClass("disabled")})},U=function(){var a=o.find(".datepicker-years"),b=a.find("th"),c=f.clone().subtract(5,"y"),g=f.clone().add(6,"y"),h="";for(b.eq(0).find("span").attr("title",d.tooltips.prevDecade),b.eq(1).attr("title",d.tooltips.selectDecade),b.eq(2).find("span").attr("title",d.tooltips.nextDecade),a.find(".disabled").removeClass("disabled"),d.minDate&&d.minDate.isAfter(c,"y")&&b.eq(0).addClass("disabled"),b.eq(1).text(c.year()+"-"+g.year()),d.maxDate&&d.maxDate.isBefore(g,"y")&&b.eq(2).addClass("disabled");!c.isAfter(g,"y");)h+='<span data-action="selectYear" class="year'+(c.isSame(e,"y")&&!m?" active":"")+(R(c,"y")?"":" disabled")+'">'+c.year()+"</span>",c.add(1,"y");a.find("td").html(h)},V=function(){var a,c=o.find(".datepicker-decades"),g=c.find("th"),h=b({y:f.year()-f.year()%100-1}),i=h.clone().add(100,"y"),j=h.clone(),k=!1,l=!1,m="";for(g.eq(0).find("span").attr("title",d.tooltips.prevCentury),g.eq(2).find("span").attr("title",d.tooltips.nextCentury),c.find(".disabled").removeClass("disabled"),(h.isSame(b({y:1900}))||d.minDate&&d.minDate.isAfter(h,"y"))&&g.eq(0).addClass("disabled"),g.eq(1).text(h.year()+"-"+i.year()),(h.isSame(b({y:2e3}))||d.maxDate&&d.maxDate.isBefore(i,"y"))&&g.eq(2).addClass("disabled");!h.isAfter(i,"y");)a=h.year()+12,k=d.minDate&&d.minDate.isAfter(h,"y")&&d.minDate.year()<=a,l=d.maxDate&&d.maxDate.isAfter(h,"y")&&d.maxDate.year()<=a,m+='<span data-action="selectDecade" class="decade'+(e.isAfter(h)&&e.year()<=a?" active":"")+(R(h,"y")||k||l?"":" disabled")+'" data-selection="'+(h.year()+6)+'">'+(h.year()+1)+" - "+(h.year()+12)+"</span>",h.add(12,"y");m+="<span></span><span></span><span></span>",c.find("td").html(m),g.eq(1).text(j.year()+1+"-"+h.year())},W=function(){var b,c,g,h=o.find(".datepicker-days"),i=h.find("th"),j=[],k=[];if(B()){for(i.eq(0).find("span").attr("title",d.tooltips.prevMonth),i.eq(1).attr("title",d.tooltips.selectMonth),i.eq(2).find("span").attr("title",d.tooltips.nextMonth),h.find(".disabled").removeClass("disabled"),i.eq(1).text(f.format(d.dayViewHeaderFormat)),R(f.clone().subtract(1,"M"),"M")||i.eq(0).addClass("disabled"),R(f.clone().add(1,"M"),"M")||i.eq(2).addClass("disabled"),b=f.clone().startOf("M").startOf("w").startOf("d"),g=0;g<42;g++)0===b.weekday()&&(c=a("<tr>"),d.calendarWeeks&&c.append('<td class="cw">'+b.week()+"</td>"),j.push(c)),k=["day"],b.isBefore(f,"M")&&k.push("old"),b.isAfter(f,"M")&&k.push("new"),b.isSame(e,"d")&&!m&&k.push("active"),R(b,"d")||k.push("disabled"),b.isSame(y(),"d")&&k.push("today"),0!==b.day()&&6!==b.day()||k.push("weekend"),J({type:"dp.classify",date:b,classNames:k}),c.append('<td data-action="selectDay" data-day="'+b.format("L")+'" class="'+k.join(" ")+'">'+b.date()+"</td>"),b.add(1,"d");h.find("tbody").empty().append(j),T(),U(),V()}},X=function(){var b=o.find(".timepicker-hours table"),c=f.clone().startOf("d"),d=[],e=a("<tr>");for(f.hour()>11&&!h&&c.hour(12);c.isSame(f,"d")&&(h||f.hour()<12&&c.hour()<12||f.hour()>11);)c.hour()%4===0&&(e=a("<tr>"),d.push(e)),e.append('<td data-action="selectHour" class="hour'+(R(c,"h")?"":" disabled")+'">'+c.format(h?"HH":"hh")+"</td>"),c.add(1,"h");b.empty().append(d)},Y=function(){for(var b=o.find(".timepicker-minutes table"),c=f.clone().startOf("h"),e=[],g=a("<tr>"),h=1===d.stepping?5:d.stepping;f.isSame(c,"h");)c.minute()%(4*h)===0&&(g=a("<tr>"),e.push(g)),g.append('<td data-action="selectMinute" class="minute'+(R(c,"m")?"":" disabled")+'">'+c.format("mm")+"</td>"),c.add(h,"m");b.empty().append(e)},Z=function(){for(var b=o.find(".timepicker-seconds table"),c=f.clone().startOf("m"),d=[],e=a("<tr>");f.isSame(c,"m");)c.second()%20===0&&(e=a("<tr>"),d.push(e)),e.append('<td data-action="selectSecond" class="second'+(R(c,"s")?"":" disabled")+'">'+c.format("ss")+"</td>"),c.add(5,"s");b.empty().append(d)},$=function(){var a,b,c=o.find(".timepicker span[data-time-component]");h||(a=o.find(".timepicker [data-action=togglePeriod]"),b=e.clone().add(e.hours()>=12?-12:12,"h"),a.text(e.format("A")),R(b,"h")?a.removeClass("disabled"):a.addClass("disabled")),c.filter("[data-time-component=hours]").text(e.format(h?"HH":"hh")),c.filter("[data-time-component=minutes]").text(e.format("mm")),c.filter("[data-time-component=seconds]").text(e.format("ss")),X(),Y(),Z()},_=function(){o&&(W(),$())},aa=function(a){var b=m?null:e;if(!a)return m=!0,g.val(""),c.data("date",""),J({type:"dp.change",date:!1,oldDate:b}),void _();if(a=a.clone().locale(d.locale),x()&&a.tz(d.timeZone),1!==d.stepping)for(a.minutes(Math.round(a.minutes()/d.stepping)*d.stepping).seconds(0);d.minDate&&a.isBefore(d.minDate);)a.add(d.stepping,"minutes");R(a)?(e=a,f=e.clone(),g.val(e.format(i)),c.data("date",e.format(i)),m=!1,_(),J({type:"dp.change",date:e.clone(),oldDate:b})):(d.keepInvalid?J({type:"dp.change",date:a,oldDate:b}):g.val(m?"":e.format(i)),J({type:"dp.error",date:a,oldDate:b}))},ba=function(){var b=!1;return o?(o.find(".collapse").each(function(){var c=a(this).data("collapse");return!c||!c.transitioning||(b=!0,!1)}),b?l:(n&&n.hasClass("btn")&&n.toggleClass("active"),o.hide(),a(window).off("resize",I),o.off("click","[data-action]"),o.off("mousedown",!1),o.remove(),o=!1,J({type:"dp.hide",date:e.clone()}),g.blur(),k=0,f=e.clone(),l)):l},ca=function(){aa(null)},da=function(a){return void 0===d.parseInputDate?(!b.isMoment(a)||a instanceof Date)&&(a=y(a)):a=d.parseInputDate(a),a},ea={next:function(){var a=q[k].navFnc;f.add(q[k].navStep,a),W(),K(a)},previous:function(){var a=q[k].navFnc;f.subtract(q[k].navStep,a),W(),K(a)},pickerSwitch:function(){L(1)},selectMonth:function(b){var c=a(b.target).closest("tbody").find("span").index(a(b.target));f.month(c),k===p?(aa(e.clone().year(f.year()).month(f.month())),d.inline||ba()):(L(-1),W()),K("M")},selectYear:function(b){var c=parseInt(a(b.target).text(),10)||0;f.year(c),k===p?(aa(e.clone().year(f.year())),d.inline||ba()):(L(-1),W()),K("YYYY")},selectDecade:function(b){var c=parseInt(a(b.target).data("selection"),10)||0;f.year(c),k===p?(aa(e.clone().year(f.year())),d.inline||ba()):(L(-1),W()),K("YYYY")},selectDay:function(b){var c=f.clone();a(b.target).is(".old")&&c.subtract(1,"M"),a(b.target).is(".new")&&c.add(1,"M"),aa(c.date(parseInt(a(b.target).text(),10))),A()||d.keepOpen||d.inline||ba()},incrementHours:function(){var a=e.clone().add(1,"h");R(a,"h")&&aa(a)},incrementMinutes:function(){var a=e.clone().add(d.stepping,"m");R(a,"m")&&aa(a)},incrementSeconds:function(){var a=e.clone().add(1,"s");R(a,"s")&&aa(a)},decrementHours:function(){var a=e.clone().subtract(1,"h");R(a,"h")&&aa(a)},decrementMinutes:function(){var a=e.clone().subtract(d.stepping,"m");R(a,"m")&&aa(a)},decrementSeconds:function(){var a=e.clone().subtract(1,"s");R(a,"s")&&aa(a)},togglePeriod:function(){aa(e.clone().add(e.hours()>=12?-12:12,"h"))},togglePicker:function(b){var c,e=a(b.target),f=e.closest("ul"),g=f.find(".in"),h=f.find(".collapse:not(.in)");if(g&&g.length){if(c=g.data("collapse"),c&&c.transitioning)return;g.collapse?(g.collapse("hide"),h.collapse("show")):(g.removeClass("in"),h.addClass("in")),e.is("span")?e.toggleClass(d.icons.time+" "+d.icons.date):e.find("span").toggleClass(d.icons.time+" "+d.icons.date)}},showPicker:function(){o.find(".timepicker > div:not(.timepicker-picker)").hide(),o.find(".timepicker .timepicker-picker").show()},showHours:function(){o.find(".timepicker .timepicker-picker").hide(),o.find(".timepicker .timepicker-hours").show()},showMinutes:function(){o.find(".timepicker .timepicker-picker").hide(),o.find(".timepicker .timepicker-minutes").show()},showSeconds:function(){o.find(".timepicker .timepicker-picker").hide(),o.find(".timepicker .timepicker-seconds").show()},selectHour:function(b){var c=parseInt(a(b.target).text(),10);h||(e.hours()>=12?12!==c&&(c+=12):12===c&&(c=0)),aa(e.clone().hours(c)),ea.showPicker.call(l)},selectMinute:function(b){aa(e.clone().minutes(parseInt(a(b.target).text(),10))),ea.showPicker.call(l)},selectSecond:function(b){aa(e.clone().seconds(parseInt(a(b.target).text(),10))),ea.showPicker.call(l)},clear:ca,today:function(){var a=y();R(a,"d")&&aa(a)},close:ba},fa=function(b){return!a(b.currentTarget).is(".disabled")&&(ea[a(b.currentTarget).data("action")].apply(l,arguments),!1)},ga=function(){var b,c={year:function(a){return a.month(0).date(1).hours(0).seconds(0).minutes(0)},month:function(a){return a.date(1).hours(0).seconds(0).minutes(0)},day:function(a){return a.hours(0).seconds(0).minutes(0)},hour:function(a){return a.seconds(0).minutes(0)},minute:function(a){return a.seconds(0)}};return g.prop("disabled")||!d.ignoreReadonly&&g.prop("readonly")||o?l:(void 0!==g.val()&&0!==g.val().trim().length?aa(da(g.val().trim())):m&&d.useCurrent&&(d.inline||g.is("input")&&0===g.val().trim().length)&&(b=y(),"string"==typeof d.useCurrent&&(b=c[d.useCurrent](b)),aa(b)),o=G(),M(),S(),o.find(".timepicker-hours").hide(),o.find(".timepicker-minutes").hide(),o.find(".timepicker-seconds").hide(),_(),L(),a(window).on("resize",I),o.on("click","[data-action]",fa),o.on("mousedown",!1),n&&n.hasClass("btn")&&n.toggleClass("active"),I(),o.show(),d.focusOnShow&&!g.is(":focus")&&g.focus(),J({type:"dp.show"}),l)},ha=function(){return o?ba():ga()},ia=function(a){var b,c,e,f,g=null,h=[],i={},j=a.which,k="p";w[j]=k;for(b in w)w.hasOwnProperty(b)&&w[b]===k&&(h.push(b),parseInt(b,10)!==j&&(i[b]=!0));for(b in d.keyBinds)if(d.keyBinds.hasOwnProperty(b)&&"function"==typeof d.keyBinds[b]&&(e=b.split(" "),e.length===h.length&&v[j]===e[e.length-1])){for(f=!0,c=e.length-2;c>=0;c--)if(!(v[e[c]]in i)){f=!1;break}if(f){g=d.keyBinds[b];break}}g&&(g.call(l,o),a.stopPropagation(),a.preventDefault())},ja=function(a){w[a.which]="r",a.stopPropagation(),a.preventDefault()},ka=function(b){var c=a(b.target).val().trim(),d=c?da(c):null;return aa(d),b.stopImmediatePropagation(),!1},la=function(){g.on({change:ka,blur:d.debug?"":ba,keydown:ia,keyup:ja,focus:d.allowInputToggle?ga:""}),c.is("input")?g.on({focus:ga}):n&&(n.on("click",ha),n.on("mousedown",!1))},ma=function(){g.off({change:ka,blur:blur,keydown:ia,keyup:ja,focus:d.allowInputToggle?ba:""}),c.is("input")?g.off({focus:ga}):n&&(n.off("click",ha),n.off("mousedown",!1))},na=function(b){var c={};return a.each(b,function(){var a=da(this);a.isValid()&&(c[a.format("YYYY-MM-DD")]=!0)}),!!Object.keys(c).length&&c},oa=function(b){var c={};return a.each(b,function(){c[this]=!0}),!!Object.keys(c).length&&c},pa=function(){var a=d.format||"L LT";i=a.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,function(a){var b=e.localeData().longDateFormat(a)||a;return b.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,function(a){return e.localeData().longDateFormat(a)||a})}),j=d.extraFormats?d.extraFormats.slice():[],j.indexOf(a)<0&&j.indexOf(i)<0&&j.push(i),h=i.toLowerCase().indexOf("a")<1&&i.replace(/\[.*?\]/g,"").indexOf("h")<1,z("y")&&(p=2),z("M")&&(p=1),z("d")&&(p=0),k=Math.max(p,k),m||aa(e)};if(l.destroy=function(){ba(),ma(),c.removeData("DateTimePicker"),c.removeData("date")},l.toggle=ha,l.show=ga,l.hide=ba,l.disable=function(){return ba(),n&&n.hasClass("btn")&&n.addClass("disabled"),g.prop("disabled",!0),l},l.enable=function(){return n&&n.hasClass("btn")&&n.removeClass("disabled"),g.prop("disabled",!1),l},l.ignoreReadonly=function(a){if(0===arguments.length)return d.ignoreReadonly;if("boolean"!=typeof a)throw new TypeError("ignoreReadonly () expects a boolean parameter");return d.ignoreReadonly=a,l},l.options=function(b){if(0===arguments.length)return a.extend(!0,{},d);if(!(b instanceof Object))throw new TypeError("options() options parameter should be an object");return a.extend(!0,d,b),a.each(d,function(a,b){if(void 0===l[a])throw new TypeError("option "+a+" is not recognized!");l[a](b)}),l},l.date=function(a){if(0===arguments.length)return m?null:e.clone();if(!(null===a||"string"==typeof a||b.isMoment(a)||a instanceof Date))throw new TypeError("date() parameter must be one of [null, string, moment or Date]");return aa(null===a?null:da(a)),l},l.format=function(a){if(0===arguments.length)return d.format;if("string"!=typeof a&&("boolean"!=typeof a||a!==!1))throw new TypeError("format() expects a string or boolean:false parameter "+a);return d.format=a,i&&pa(),l},l.timeZone=function(a){if(0===arguments.length)return d.timeZone;if("string"!=typeof a)throw new TypeError("newZone() expects a string parameter");return d.timeZone=a,l},l.dayViewHeaderFormat=function(a){if(0===arguments.length)return d.dayViewHeaderFormat;if("string"!=typeof a)throw new TypeError("dayViewHeaderFormat() expects a string parameter");return d.dayViewHeaderFormat=a,l},l.extraFormats=function(a){if(0===arguments.length)return d.extraFormats;if(a!==!1&&!(a instanceof Array))throw new TypeError("extraFormats() expects an array or false parameter");return d.extraFormats=a,j&&pa(),l},l.disabledDates=function(b){if(0===arguments.length)return d.disabledDates?a.extend({},d.disabledDates):d.disabledDates;if(!b)return d.disabledDates=!1,_(),l;if(!(b instanceof Array))throw new TypeError("disabledDates() expects an array parameter");return d.disabledDates=na(b),d.enabledDates=!1,_(),l},l.enabledDates=function(b){if(0===arguments.length)return d.enabledDates?a.extend({},d.enabledDates):d.enabledDates;if(!b)return d.enabledDates=!1,_(),l;if(!(b instanceof Array))throw new TypeError("enabledDates() expects an array parameter");return d.enabledDates=na(b),d.disabledDates=!1,_(),l},l.daysOfWeekDisabled=function(a){if(0===arguments.length)return d.daysOfWeekDisabled.splice(0);if("boolean"==typeof a&&!a)return d.daysOfWeekDisabled=!1,_(),l;if(!(a instanceof Array))throw new TypeError("daysOfWeekDisabled() expects an array parameter");if(d.daysOfWeekDisabled=a.reduce(function(a,b){return b=parseInt(b,10),b>6||b<0||isNaN(b)?a:(a.indexOf(b)===-1&&a.push(b),a)},[]).sort(),d.useCurrent&&!d.keepInvalid){for(var b=0;!R(e,"d");){if(e.add(1,"d"),31===b)throw"Tried 31 times to find a valid date";b++}aa(e)}return _(),l},l.maxDate=function(a){if(0===arguments.length)return d.maxDate?d.maxDate.clone():d.maxDate;if("boolean"==typeof a&&a===!1)return d.maxDate=!1,_(),l;"string"==typeof a&&("now"!==a&&"moment"!==a||(a=y()));var b=da(a);if(!b.isValid())throw new TypeError("maxDate() Could not parse date parameter: "+a);if(d.minDate&&b.isBefore(d.minDate))throw new TypeError("maxDate() date parameter is before options.minDate: "+b.format(i));return d.maxDate=b,d.useCurrent&&!d.keepInvalid&&e.isAfter(a)&&aa(d.maxDate),f.isAfter(b)&&(f=b.clone().subtract(d.stepping,"m")),_(),l},l.minDate=function(a){if(0===arguments.length)return d.minDate?d.minDate.clone():d.minDate;if("boolean"==typeof a&&a===!1)return d.minDate=!1,_(),l;"string"==typeof a&&("now"!==a&&"moment"!==a||(a=y()));var b=da(a);if(!b.isValid())throw new TypeError("minDate() Could not parse date parameter: "+a);if(d.maxDate&&b.isAfter(d.maxDate))throw new TypeError("minDate() date parameter is after options.maxDate: "+b.format(i));return d.minDate=b,d.useCurrent&&!d.keepInvalid&&e.isBefore(a)&&aa(d.minDate),f.isBefore(b)&&(f=b.clone().add(d.stepping,"m")),_(),l},l.defaultDate=function(a){if(0===arguments.length)return d.defaultDate?d.defaultDate.clone():d.defaultDate;if(!a)return d.defaultDate=!1,l;"string"==typeof a&&(a="now"===a||"moment"===a?y():y(a));var b=da(a);if(!b.isValid())throw new TypeError("defaultDate() Could not parse date parameter: "+a);if(!R(b))throw new TypeError("defaultDate() date passed is invalid according to component setup validations");return d.defaultDate=b,(d.defaultDate&&d.inline||""===g.val().trim())&&aa(d.defaultDate),l},l.locale=function(a){if(0===arguments.length)return d.locale;if(!b.localeData(a))throw new TypeError("locale() locale "+a+" is not loaded from moment locales!");return d.locale=a,e.locale(d.locale),f.locale(d.locale),i&&pa(),o&&(ba(),ga()),l},l.stepping=function(a){return 0===arguments.length?d.stepping:(a=parseInt(a,10),(isNaN(a)||a<1)&&(a=1),d.stepping=a,l)},l.useCurrent=function(a){var b=["year","month","day","hour","minute"];if(0===arguments.length)return d.useCurrent;if("boolean"!=typeof a&&"string"!=typeof a)throw new TypeError("useCurrent() expects a boolean or string parameter");if("string"==typeof a&&b.indexOf(a.toLowerCase())===-1)throw new TypeError("useCurrent() expects a string parameter of "+b.join(", "));return d.useCurrent=a,l},l.collapse=function(a){if(0===arguments.length)return d.collapse;if("boolean"!=typeof a)throw new TypeError("collapse() expects a boolean parameter");return d.collapse===a?l:(d.collapse=a,o&&(ba(),ga()),l)},l.icons=function(b){if(0===arguments.length)return a.extend({},d.icons);if(!(b instanceof Object))throw new TypeError("icons() expects parameter to be an Object");return a.extend(d.icons,b),o&&(ba(),ga()),l},l.tooltips=function(b){if(0===arguments.length)return a.extend({},d.tooltips);if(!(b instanceof Object))throw new TypeError("tooltips() expects parameter to be an Object");return a.extend(d.tooltips,b),o&&(ba(),ga()),l},l.useStrict=function(a){if(0===arguments.length)return d.useStrict;if("boolean"!=typeof a)throw new TypeError("useStrict() expects a boolean parameter");return d.useStrict=a,l},l.sideBySide=function(a){if(0===arguments.length)return d.sideBySide;if("boolean"!=typeof a)throw new TypeError("sideBySide() expects a boolean parameter");return d.sideBySide=a,o&&(ba(),ga()),l},l.viewMode=function(a){if(0===arguments.length)return d.viewMode;if("string"!=typeof a)throw new TypeError("viewMode() expects a string parameter");if(r.indexOf(a)===-1)throw new TypeError("viewMode() parameter must be one of ("+r.join(", ")+") value");return d.viewMode=a,k=Math.max(r.indexOf(a),p),L(),l},l.toolbarPlacement=function(a){if(0===arguments.length)return d.toolbarPlacement;if("string"!=typeof a)throw new TypeError("toolbarPlacement() expects a string parameter");if(u.indexOf(a)===-1)throw new TypeError("toolbarPlacement() parameter must be one of ("+u.join(", ")+") value");return d.toolbarPlacement=a,o&&(ba(),ga()),l},l.widgetPositioning=function(b){if(0===arguments.length)return a.extend({},d.widgetPositioning);if("[object Object]"!=={}.toString.call(b))throw new TypeError("widgetPositioning() expects an object variable");if(b.horizontal){if("string"!=typeof b.horizontal)throw new TypeError("widgetPositioning() horizontal variable must be a string");if(b.horizontal=b.horizontal.toLowerCase(),t.indexOf(b.horizontal)===-1)throw new TypeError("widgetPositioning() expects horizontal parameter to be one of ("+t.join(", ")+")");d.widgetPositioning.horizontal=b.horizontal}if(b.vertical){if("string"!=typeof b.vertical)throw new TypeError("widgetPositioning() vertical variable must be a string");if(b.vertical=b.vertical.toLowerCase(),s.indexOf(b.vertical)===-1)throw new TypeError("widgetPositioning() expects vertical parameter to be one of ("+s.join(", ")+")");d.widgetPositioning.vertical=b.vertical}return _(),l},l.calendarWeeks=function(a){if(0===arguments.length)return d.calendarWeeks;if("boolean"!=typeof a)throw new TypeError("calendarWeeks() expects parameter to be a boolean value");return d.calendarWeeks=a,_(),l},l.showTodayButton=function(a){if(0===arguments.length)return d.showTodayButton;if("boolean"!=typeof a)throw new TypeError("showTodayButton() expects a boolean parameter");return d.showTodayButton=a,o&&(ba(),ga()),l},l.showClear=function(a){if(0===arguments.length)return d.showClear;if("boolean"!=typeof a)throw new TypeError("showClear() expects a boolean parameter");return d.showClear=a,o&&(ba(),ga()),l},l.widgetParent=function(b){if(0===arguments.length)return d.widgetParent;if("string"==typeof b&&(b=a(b)),null!==b&&"string"!=typeof b&&!(b instanceof a))throw new TypeError("widgetParent() expects a string or a jQuery object parameter");return d.widgetParent=b,o&&(ba(),ga()),l},l.keepOpen=function(a){if(0===arguments.length)return d.keepOpen;if("boolean"!=typeof a)throw new TypeError("keepOpen() expects a boolean parameter");return d.keepOpen=a,l},l.focusOnShow=function(a){if(0===arguments.length)return d.focusOnShow;if("boolean"!=typeof a)throw new TypeError("focusOnShow() expects a boolean parameter");return d.focusOnShow=a,l},l.inline=function(a){if(0===arguments.length)return d.inline;if("boolean"!=typeof a)throw new TypeError("inline() expects a boolean parameter");return d.inline=a,l},l.clear=function(){return ca(),l},l.keyBinds=function(a){return 0===arguments.length?d.keyBinds:(d.keyBinds=a,l)},l.getMoment=function(a){return y(a)},l.debug=function(a){if("boolean"!=typeof a)throw new TypeError("debug() expects a boolean parameter");return d.debug=a,l},l.allowInputToggle=function(a){if(0===arguments.length)return d.allowInputToggle;if("boolean"!=typeof a)throw new TypeError("allowInputToggle() expects a boolean parameter");return d.allowInputToggle=a,l},l.showClose=function(a){if(0===arguments.length)return d.showClose;if("boolean"!=typeof a)throw new TypeError("showClose() expects a boolean parameter");return d.showClose=a,l},l.keepInvalid=function(a){if(0===arguments.length)return d.keepInvalid;if("boolean"!=typeof a)throw new TypeError("keepInvalid() expects a boolean parameter");
return d.keepInvalid=a,l},l.datepickerInput=function(a){if(0===arguments.length)return d.datepickerInput;if("string"!=typeof a)throw new TypeError("datepickerInput() expects a string parameter");return d.datepickerInput=a,l},l.parseInputDate=function(a){if(0===arguments.length)return d.parseInputDate;if("function"!=typeof a)throw new TypeError("parseInputDate() sholud be as function");return d.parseInputDate=a,l},l.disabledTimeIntervals=function(b){if(0===arguments.length)return d.disabledTimeIntervals?a.extend({},d.disabledTimeIntervals):d.disabledTimeIntervals;if(!b)return d.disabledTimeIntervals=!1,_(),l;if(!(b instanceof Array))throw new TypeError("disabledTimeIntervals() expects an array parameter");return d.disabledTimeIntervals=b,_(),l},l.disabledHours=function(b){if(0===arguments.length)return d.disabledHours?a.extend({},d.disabledHours):d.disabledHours;if(!b)return d.disabledHours=!1,_(),l;if(!(b instanceof Array))throw new TypeError("disabledHours() expects an array parameter");if(d.disabledHours=oa(b),d.enabledHours=!1,d.useCurrent&&!d.keepInvalid){for(var c=0;!R(e,"h");){if(e.add(1,"h"),24===c)throw"Tried 24 times to find a valid date";c++}aa(e)}return _(),l},l.enabledHours=function(b){if(0===arguments.length)return d.enabledHours?a.extend({},d.enabledHours):d.enabledHours;if(!b)return d.enabledHours=!1,_(),l;if(!(b instanceof Array))throw new TypeError("enabledHours() expects an array parameter");if(d.enabledHours=oa(b),d.disabledHours=!1,d.useCurrent&&!d.keepInvalid){for(var c=0;!R(e,"h");){if(e.add(1,"h"),24===c)throw"Tried 24 times to find a valid date";c++}aa(e)}return _(),l},l.viewDate=function(a){if(0===arguments.length)return f.clone();if(!a)return f=e.clone(),l;if(!("string"==typeof a||b.isMoment(a)||a instanceof Date))throw new TypeError("viewDate() parameter must be one of [string, moment or Date]");return f=da(a),K(),l},c.is("input"))g=c;else if(g=c.find(d.datepickerInput),0===g.length)g=c.find("input");else if(!g.is("input"))throw new Error('CSS class "'+d.datepickerInput+'" cannot be applied to non input element');if(c.hasClass("input-group")&&(n=0===c.find(".datepickerbutton").length?c.find(".input-group-addon"):c.find(".datepickerbutton")),!d.inline&&!g.is("input"))throw new Error("Could not initialize DateTimePicker without an input element");return e=y(),f=e.clone(),a.extend(!0,d,H()),l.options(d),pa(),la(),g.prop("disabled")&&l.disable(),g.is("input")&&0!==g.val().trim().length?aa(da(g.val().trim())):d.defaultDate&&void 0===g.attr("placeholder")&&aa(d.defaultDate),d.inline&&ga(),l};return a.fn.datetimepicker=function(b){b=b||{};var d,e=Array.prototype.slice.call(arguments,1),f=!0,g=["destroy","hide","show","toggle"];if("object"==typeof b)return this.each(function(){var d,e=a(this);e.data("DateTimePicker")||(d=a.extend(!0,{},a.fn.datetimepicker.defaults,b),e.data("DateTimePicker",c(e,d)))});if("string"==typeof b)return this.each(function(){var c=a(this),g=c.data("DateTimePicker");if(!g)throw new Error('bootstrap-datetimepicker("'+b+'") method was called on an element that is not using DateTimePicker');d=g[b].apply(g,e),f=d===g}),f||a.inArray(b,g)>-1?this:d;throw new TypeError("Invalid arguments for DateTimePicker: "+b)},a.fn.datetimepicker.defaults={timeZone:"",format:!1,dayViewHeaderFormat:"MMMM YYYY",extraFormats:!1,stepping:1,minDate:!1,maxDate:!1,useCurrent:!0,collapse:!0,locale:b.locale(),defaultDate:!1,disabledDates:!1,enabledDates:!1,icons:{time:"glyphicon glyphicon-time",date:"glyphicon glyphicon-calendar",up:"glyphicon glyphicon-chevron-up",down:"glyphicon glyphicon-chevron-down",previous:"glyphicon glyphicon-chevron-left",next:"glyphicon glyphicon-chevron-right",today:"glyphicon glyphicon-screenshot",clear:"glyphicon glyphicon-trash",close:"glyphicon glyphicon-remove"},tooltips:{today:"Go to today",clear:"Clear selection",close:"Close the picker",selectMonth:"Select Month",prevMonth:"Previous Month",nextMonth:"Next Month",selectYear:"Select Year",prevYear:"Previous Year",nextYear:"Next Year",selectDecade:"Select Decade",prevDecade:"Previous Decade",nextDecade:"Next Decade",prevCentury:"Previous Century",nextCentury:"Next Century",pickHour:"Pick Hour",incrementHour:"Increment Hour",decrementHour:"Decrement Hour",pickMinute:"Pick Minute",incrementMinute:"Increment Minute",decrementMinute:"Decrement Minute",pickSecond:"Pick Second",incrementSecond:"Increment Second",decrementSecond:"Decrement Second",togglePeriod:"Toggle Period",selectTime:"Select Time"},useStrict:!1,sideBySide:!1,daysOfWeekDisabled:!1,calendarWeeks:!1,viewMode:"days",toolbarPlacement:"default",showTodayButton:!1,showClear:!1,showClose:!1,widgetPositioning:{horizontal:"auto",vertical:"auto"},widgetParent:null,ignoreReadonly:!1,keepOpen:!1,focusOnShow:!0,inline:!1,keepInvalid:!1,datepickerInput:".datepickerinput",keyBinds:{up:function(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")?this.date(b.clone().subtract(7,"d")):this.date(b.clone().add(this.stepping(),"m"))}},down:function(a){if(!a)return void this.show();var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")?this.date(b.clone().add(7,"d")):this.date(b.clone().subtract(this.stepping(),"m"))},"control up":function(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")?this.date(b.clone().subtract(1,"y")):this.date(b.clone().add(1,"h"))}},"control down":function(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")?this.date(b.clone().add(1,"y")):this.date(b.clone().subtract(1,"h"))}},left:function(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")&&this.date(b.clone().subtract(1,"d"))}},right:function(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")&&this.date(b.clone().add(1,"d"))}},pageUp:function(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")&&this.date(b.clone().subtract(1,"M"))}},pageDown:function(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")&&this.date(b.clone().add(1,"M"))}},enter:function(){this.hide()},escape:function(){this.hide()},"control space":function(a){a&&a.find(".timepicker").is(":visible")&&a.find('.btn[data-action="togglePeriod"]').click()},t:function(){this.date(this.getMoment())},delete:function(){this.clear()}},debug:!1,allowInputToggle:!1,disabledTimeIntervals:!1,disabledHours:!1,enabledHours:!1,viewDate:!1},a.fn.datetimepicker});;/* NUGET: BEGIN LICENSE TEXT
 *
 * Microsoft grants you the right to use these script files for the sole
 * purpose of either: (i) interacting through your browser with the Microsoft
 * website or online service, subject to the applicable licensing or use
 * terms; or (ii) using the files as included with a Microsoft product subject
 * to that product's license terms. Microsoft reserves all other rights to the
 * files not expressly granted by Microsoft, whether by implication, estoppel
 * or otherwise. Insofar as a script file is dual licensed under GPL,
 * Microsoft neither took the code under GPL nor distributes it thereunder but
 * under the terms set out in this paragraph. All notices and licenses
 * below are for informational purposes only.
 *
 * NUGET: END LICENSE TEXT */
/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
/*! NOTE: If you're already including a window.matchMedia polyfill via Modernizr or otherwise, you don't need this part */
window.matchMedia=window.matchMedia||(function(e,f){var c,a=e.documentElement,b=a.firstElementChild||a.firstChild,d=e.createElement("body"),g=e.createElement("div");g.id="mq-test-1";g.style.cssText="position:absolute;top:-100em";d.style.background="none";d.appendChild(g);return function(h){g.innerHTML='&shy;<style media="'+h+'"> #mq-test-1 { width: 42px; }</style>';a.insertBefore(d,b);c=g.offsetWidth==42;a.removeChild(d);return{matches:c,media:h}}})(document);

/*! Respond.js v1.2.0: min/max-width media query polyfill. (c) Scott Jehl. MIT/GPLv2 Lic. j.mp/respondjs  */
(function(e){e.respond={};respond.update=function(){};respond.mediaQueriesSupported=e.matchMedia&&e.matchMedia("only all").matches;if(respond.mediaQueriesSupported){return}var w=e.document,s=w.documentElement,i=[],k=[],q=[],o={},h=30,f=w.getElementsByTagName("head")[0]||s,g=w.getElementsByTagName("base")[0],b=f.getElementsByTagName("link"),d=[],a=function(){var D=b,y=D.length,B=0,A,z,C,x;for(;B<y;B++){A=D[B],z=A.href,C=A.media,x=A.rel&&A.rel.toLowerCase()==="stylesheet";if(!!z&&x&&!o[z]){if(A.styleSheet&&A.styleSheet.rawCssText){m(A.styleSheet.rawCssText,z,C);o[z]=true}else{if((!/^([a-zA-Z:]*\/\/)/.test(z)&&!g)||z.replace(RegExp.$1,"").split("/")[0]===e.location.host){d.push({href:z,media:C})}}}}u()},u=function(){if(d.length){var x=d.shift();n(x.href,function(y){m(y,x.href,x.media);o[x.href]=true;u()})}},m=function(I,x,z){var G=I.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi),J=G&&G.length||0,x=x.substring(0,x.lastIndexOf("/")),y=function(K){return K.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,"$1"+x+"$2$3")},A=!J&&z,D=0,C,E,F,B,H;if(x.length){x+="/"}if(A){J=1}for(;D<J;D++){C=0;if(A){E=z;k.push(y(I))}else{E=G[D].match(/@media *([^\{]+)\{([\S\s]+?)$/)&&RegExp.$1;k.push(RegExp.$2&&y(RegExp.$2))}B=E.split(",");H=B.length;for(;C<H;C++){F=B[C];i.push({media:F.split("(")[0].match(/(only\s+)?([a-zA-Z]+)\s?/)&&RegExp.$2||"all",rules:k.length-1,hasquery:F.indexOf("(")>-1,minw:F.match(/\(min\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||""),maxw:F.match(/\(max\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||"")})}}j()},l,r,v=function(){var z,A=w.createElement("div"),x=w.body,y=false;A.style.cssText="position:absolute;font-size:1em;width:1em";if(!x){x=y=w.createElement("body");x.style.background="none"}x.appendChild(A);s.insertBefore(x,s.firstChild);z=A.offsetWidth;if(y){s.removeChild(x)}else{x.removeChild(A)}z=p=parseFloat(z);return z},p,j=function(I){var x="clientWidth",B=s[x],H=w.compatMode==="CSS1Compat"&&B||w.body[x]||B,D={},G=b[b.length-1],z=(new Date()).getTime();if(I&&l&&z-l<h){clearTimeout(r);r=setTimeout(j,h);return}else{l=z}for(var E in i){var K=i[E],C=K.minw,J=K.maxw,A=C===null,L=J===null,y="em";if(!!C){C=parseFloat(C)*(C.indexOf(y)>-1?(p||v()):1)}if(!!J){J=parseFloat(J)*(J.indexOf(y)>-1?(p||v()):1)}if(!K.hasquery||(!A||!L)&&(A||H>=C)&&(L||H<=J)){if(!D[K.media]){D[K.media]=[]}D[K.media].push(k[K.rules])}}for(var E in q){if(q[E]&&q[E].parentNode===f){f.removeChild(q[E])}}for(var E in D){var M=w.createElement("style"),F=D[E].join("\n");M.type="text/css";M.media=E;f.insertBefore(M,G.nextSibling);if(M.styleSheet){M.styleSheet.cssText=F}else{M.appendChild(w.createTextNode(F))}q.push(M)}},n=function(x,z){var y=c();if(!y){return}y.open("GET",x,true);y.onreadystatechange=function(){if(y.readyState!=4||y.status!=200&&y.status!=304){return}z(y.responseText)};if(y.readyState==4){return}y.send(null)},c=(function(){var x=false;try{x=new XMLHttpRequest()}catch(y){x=new ActiveXObject("Microsoft.XMLHTTP")}return function(){return x}})();a();respond.update=a;function t(){j(true)}if(e.addEventListener){e.addEventListener("resize",t,false)}else{if(e.attachEvent){e.attachEvent("onresize",t)}}})(this);;!function(e){e(["jquery"],function(e){return function(){function t(e,t,n){return g({type:O.error,iconClass:m().iconClasses.error,message:e,optionsOverride:n,title:t})}function n(t,n){return t||(t=m()),v=e("#"+t.containerId),v.length?v:(n&&(v=d(t)),v)}function o(e,t,n){return g({type:O.info,iconClass:m().iconClasses.info,message:e,optionsOverride:n,title:t})}function s(e){C=e}function i(e,t,n){return g({type:O.success,iconClass:m().iconClasses.success,message:e,optionsOverride:n,title:t})}function a(e,t,n){return g({type:O.warning,iconClass:m().iconClasses.warning,message:e,optionsOverride:n,title:t})}function r(e,t){var o=m();v||n(o),u(e,o,t)||l(o)}function c(t){var o=m();return v||n(o),t&&0===e(":focus",t).length?void h(t):void(v.children().length&&v.remove())}function l(t){for(var n=v.children(),o=n.length-1;o>=0;o--)u(e(n[o]),t)}function u(t,n,o){var s=!(!o||!o.force)&&o.force;return!(!t||!s&&0!==e(":focus",t).length)&&(t[n.hideMethod]({duration:n.hideDuration,easing:n.hideEasing,complete:function(){h(t)}}),!0)}function d(t){return v=e("<div/>").attr("id",t.containerId).addClass(t.positionClass),v.appendTo(e(t.target)),v}function p(){return{tapToDismiss:!0,toastClass:"toast",containerId:"toast-container",debug:!1,showMethod:"fadeIn",showDuration:300,showEasing:"swing",onShown:void 0,hideMethod:"fadeOut",hideDuration:1e3,hideEasing:"swing",onHidden:void 0,closeMethod:!1,closeDuration:!1,closeEasing:!1,closeOnHover:!0,extendedTimeOut:1e3,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},iconClass:"toast-info",positionClass:"toast-top-right",timeOut:5e3,titleClass:"toast-title",messageClass:"toast-message",escapeHtml:!1,target:"body",closeHtml:'<button type="button">&times;</button>',closeClass:"toast-close-button",newestOnTop:!0,preventDuplicates:!1,progressBar:!1,progressClass:"toast-progress",rtl:!1}}function f(e){C&&C(e)}function g(t){function o(e){return null==e&&(e=""),e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function s(){c(),u(),d(),p(),g(),C(),l(),i()}function i(){var e="";switch(t.iconClass){case"toast-success":case"toast-info":e="polite";break;default:e="assertive"}I.attr("aria-live",e)}function a(){E.closeOnHover&&I.hover(H,D),!E.onclick&&E.tapToDismiss&&I.click(b),E.closeButton&&j&&j.click(function(e){e.stopPropagation?e.stopPropagation():void 0!==e.cancelBubble&&e.cancelBubble!==!0&&(e.cancelBubble=!0),E.onCloseClick&&E.onCloseClick(e),b(!0)}),E.onclick&&I.click(function(e){E.onclick(e),b()})}function r(){I.hide(),I[E.showMethod]({duration:E.showDuration,easing:E.showEasing,complete:E.onShown}),E.timeOut>0&&(k=setTimeout(b,E.timeOut),F.maxHideTime=parseFloat(E.timeOut),F.hideEta=(new Date).getTime()+F.maxHideTime,E.progressBar&&(F.intervalId=setInterval(x,10)))}function c(){t.iconClass&&I.addClass(E.toastClass).addClass(y)}function l(){E.newestOnTop?v.prepend(I):v.append(I)}function u(){if(t.title){var e=t.title;E.escapeHtml&&(e=o(t.title)),M.append(e).addClass(E.titleClass),I.append(M)}}function d(){if(t.message){var e=t.message;E.escapeHtml&&(e=o(t.message)),B.append(e).addClass(E.messageClass),I.append(B)}}function p(){E.closeButton&&(j.addClass(E.closeClass).attr("role","button"),I.prepend(j))}function g(){E.progressBar&&(q.addClass(E.progressClass),I.prepend(q))}function C(){E.rtl&&I.addClass("rtl")}function O(e,t){if(e.preventDuplicates){if(t.message===w)return!0;w=t.message}return!1}function b(t){var n=t&&E.closeMethod!==!1?E.closeMethod:E.hideMethod,o=t&&E.closeDuration!==!1?E.closeDuration:E.hideDuration,s=t&&E.closeEasing!==!1?E.closeEasing:E.hideEasing;if(!e(":focus",I).length||t)return clearTimeout(F.intervalId),I[n]({duration:o,easing:s,complete:function(){h(I),clearTimeout(k),E.onHidden&&"hidden"!==P.state&&E.onHidden(),P.state="hidden",P.endTime=new Date,f(P)}})}function D(){(E.timeOut>0||E.extendedTimeOut>0)&&(k=setTimeout(b,E.extendedTimeOut),F.maxHideTime=parseFloat(E.extendedTimeOut),F.hideEta=(new Date).getTime()+F.maxHideTime)}function H(){clearTimeout(k),F.hideEta=0,I.stop(!0,!0)[E.showMethod]({duration:E.showDuration,easing:E.showEasing})}function x(){var e=(F.hideEta-(new Date).getTime())/F.maxHideTime*100;q.width(e+"%")}var E=m(),y=t.iconClass||E.iconClass;if("undefined"!=typeof t.optionsOverride&&(E=e.extend(E,t.optionsOverride),y=t.optionsOverride.iconClass||y),!O(E,t)){T++,v=n(E,!0);var k=null,I=e("<div/>"),M=e("<div/>"),B=e("<div/>"),q=e("<div/>"),j=e(E.closeHtml),F={intervalId:null,hideEta:null,maxHideTime:null},P={toastId:T,state:"visible",startTime:new Date,options:E,map:t};return s(),r(),a(),f(P),E.debug&&console&&console.log(P),I}}function m(){return e.extend({},p(),b.options)}function h(e){v||(v=n()),e.is(":visible")||(e.remove(),e=null,0===v.children().length&&(v.remove(),w=void 0))}var v,C,w,T=0,O={error:"error",info:"info",success:"success",warning:"warning"},b={clear:r,remove:c,error:t,getContainer:n,info:o,options:{},subscribe:s,success:i,version:"2.1.4",warning:a};return b}()})}("function"==typeof define&&define.amd?define:function(e,t){"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):window.toastr=t(window.jQuery)});
//# sourceMappingURL=toastr.js.map
;/**
 * Super simple wysiwyg editor v0.8.12
 * https://summernote.org
 *
 * Copyright 2013- Alan Hong. and other contributors
 * summernote may be freely distributed under the MIT license.
 *
 * Date: 2019-05-16T08:16Z
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (global = global || self, factory(global.jQuery));
}(this, function ($$1) { 'use strict';

  $$1 = $$1 && $$1.hasOwnProperty('default') ? $$1['default'] : $$1;

  var Renderer = /** @class */ (function () {
      function Renderer(markup, children, options, callback) {
          this.markup = markup;
          this.children = children;
          this.options = options;
          this.callback = callback;
      }
      Renderer.prototype.render = function ($parent) {
          var $node = $$1(this.markup);
          if (this.options && this.options.contents) {
              $node.html(this.options.contents);
          }
          if (this.options && this.options.className) {
              $node.addClass(this.options.className);
          }
          if (this.options && this.options.data) {
              $$1.each(this.options.data, function (k, v) {
                  $node.attr('data-' + k, v);
              });
          }
          if (this.options && this.options.click) {
              $node.on('click', this.options.click);
          }
          if (this.children) {
              var $container_1 = $node.find('.note-children-container');
              this.children.forEach(function (child) {
                  child.render($container_1.length ? $container_1 : $node);
              });
          }
          if (this.callback) {
              this.callback($node, this.options);
          }
          if (this.options && this.options.callback) {
              this.options.callback($node);
          }
          if ($parent) {
              $parent.append($node);
          }
          return $node;
      };
      return Renderer;
  }());
  var renderer = {
      create: function (markup, callback) {
          return function () {
              var options = typeof arguments[1] === 'object' ? arguments[1] : arguments[0];
              var children = Array.isArray(arguments[0]) ? arguments[0] : [];
              if (options && options.children) {
                  children = options.children;
              }
              return new Renderer(markup, children, options, callback);
          };
      }
  };

  var editor = renderer.create('<div class="note-editor note-frame card"/>');
  var toolbar = renderer.create('<div class="note-toolbar card-header" role="toolbar"></div>');
  var editingArea = renderer.create('<div class="note-editing-area"/>');
  var codable = renderer.create('<textarea class="note-codable" role="textbox" aria-multiline="true"/>');
  var editable = renderer.create('<div class="note-editable card-block" contentEditable="true" role="textbox" aria-multiline="true"/>');
  var statusbar = renderer.create([
      '<output class="note-status-output" aria-live="polite"/>',
      '<div class="note-statusbar" role="status">',
      '  <output class="note-status-output" aria-live="polite"></output>',
      '  <div class="note-resizebar" role="seperator" aria-orientation="horizontal" aria-label="Resize">',
      '    <div class="note-icon-bar"/>',
      '    <div class="note-icon-bar"/>',
      '    <div class="note-icon-bar"/>',
      '  </div>',
      '</div>',
  ].join(''));
  var airEditor = renderer.create('<div class="note-editor"/>');
  var airEditable = renderer.create([
      '<div class="note-editable" contentEditable="true" role="textbox" aria-multiline="true"/>',
      '<output class="note-status-output" aria-live="polite"/>',
  ].join(''));
  var buttonGroup = renderer.create('<div class="note-btn-group btn-group">');
  var dropdown = renderer.create('<div class="dropdown-menu" role="list">', function ($node, options) {
      var markup = Array.isArray(options.items) ? options.items.map(function (item) {
          var value = (typeof item === 'string') ? item : (item.value || '');
          var content = options.template ? options.template(item) : item;
          var option = (typeof item === 'object') ? item.option : undefined;
          var dataValue = 'data-value="' + value + '"';
          var dataOption = (option !== undefined) ? ' data-option="' + option + '"' : '';
          return '<a class="dropdown-item" href="#" ' + (dataValue + dataOption) + ' role="listitem" aria-label="' + value + '">' + content + '</a>';
      }).join('') : options.items;
      $node.html(markup).attr({ 'aria-label': options.title });
  });
  var dropdownButtonContents = function (contents) {
      return contents;
  };
  var dropdownCheck = renderer.create('<div class="dropdown-menu note-check" role="list">', function ($node, options) {
      var markup = Array.isArray(options.items) ? options.items.map(function (item) {
          var value = (typeof item === 'string') ? item : (item.value || '');
          var content = options.template ? options.template(item) : item;
          return '<a class="dropdown-item" href="#" data-value="' + value + '" role="listitem" aria-label="' + item + '">' + icon(options.checkClassName) + ' ' + content + '</a>';
      }).join('') : options.items;
      $node.html(markup).attr({ 'aria-label': options.title });
  });
  var palette = renderer.create('<div class="note-color-palette"/>', function ($node, options) {
      var contents = [];
      for (var row = 0, rowSize = options.colors.length; row < rowSize; row++) {
          var eventName = options.eventName;
          var colors = options.colors[row];
          var colorsName = options.colorsName[row];
          var buttons = [];
          for (var col = 0, colSize = colors.length; col < colSize; col++) {
              var color = colors[col];
              var colorName = colorsName[col];
              buttons.push([
                  '<button type="button" class="note-color-btn"',
                  'style="background-color:', color, '" ',
                  'data-event="', eventName, '" ',
                  'data-value="', color, '" ',
                  'title="', colorName, '" ',
                  'aria-label="', colorName, '" ',
                  'data-toggle="button" tabindex="-1"></button>',
              ].join(''));
          }
          contents.push('<div class="note-color-row">' + buttons.join('') + '</div>');
      }
      $node.html(contents.join(''));
      if (options.tooltip) {
          $node.find('.note-color-btn').tooltip({
              container: options.container,
              trigger: 'hover',
              placement: 'bottom'
          });
      }
  });
  var dialog = renderer.create('<div class="modal" aria-hidden="false" tabindex="-1" role="dialog"/>', function ($node, options) {
      if (options.fade) {
          $node.addClass('fade');
      }
      $node.attr({
          'aria-label': options.title
      });
      $node.html([
          '<div class="modal-dialog">',
          '  <div class="modal-content">',
          (options.title
              ? '    <div class="modal-header">' +
                  '      <h4 class="modal-title">' + options.title + '</h4>' +
                  '      <button type="button" class="close" data-dismiss="modal" aria-label="Close" aria-hidden="true">&times;</button>' +
                  '    </div>' : ''),
          '    <div class="modal-body">' + options.body + '</div>',
          (options.footer
              ? '    <div class="modal-footer">' + options.footer + '</div>' : ''),
          '  </div>',
          '</div>',
      ].join(''));
  });
  var popover = renderer.create([
      '<div class="note-popover popover in">',
      '  <div class="arrow"/>',
      '  <div class="popover-content note-children-container"/>',
      '</div>',
  ].join(''), function ($node, options) {
      var direction = typeof options.direction !== 'undefined' ? options.direction : 'bottom';
      $node.addClass(direction);
      if (options.hideArrow) {
          $node.find('.arrow').hide();
      }
  });
  var checkbox = renderer.create('<div class="form-check"></div>', function ($node, options) {
      $node.html([
          '<label class="form-check-label"' + (options.id ? ' for="' + options.id + '"' : '') + '>',
          ' <input role="checkbox" type="checkbox" class="form-check-input"' + (options.id ? ' id="' + options.id + '"' : ''),
          (options.checked ? ' checked' : ''),
          ' aria-label="' + (options.text ? options.text : '') + '"',
          ' aria-checked="' + (options.checked ? 'true' : 'false') + '"/>',
          ' ' + (options.text ? options.text : '') + '</label>',
      ].join(''));
  });
  var icon = function (iconClassName, tagName) {
      tagName = tagName || 'i';
      return '<' + tagName + ' class="' + iconClassName + '"/>';
  };
  var ui = {
      editor: editor,
      toolbar: toolbar,
      editingArea: editingArea,
      codable: codable,
      editable: editable,
      statusbar: statusbar,
      airEditor: airEditor,
      airEditable: airEditable,
      buttonGroup: buttonGroup,
      dropdown: dropdown,
      dropdownButtonContents: dropdownButtonContents,
      dropdownCheck: dropdownCheck,
      palette: palette,
      dialog: dialog,
      popover: popover,
      icon: icon,
      checkbox: checkbox,
      options: {},
      button: function ($node, options) {
          return renderer.create('<button type="button" class="note-btn btn btn-light btn-sm" role="button" tabindex="-1">', function ($node, options) {
              if (options && options.tooltip) {
                  $node.attr({
                      title: options.tooltip,
                      'aria-label': options.tooltip
                  }).tooltip({
                      container: (options.container !== undefined) ? options.container : 'body',
                      trigger: 'hover',
                      placement: 'bottom'
                  }).on('click', function (e) {
                      $$1(e.currentTarget).tooltip('hide');
                  });
              }
          })($node, options);
      },
      toggleBtn: function ($btn, isEnable) {
          $btn.toggleClass('disabled', !isEnable);
          $btn.attr('disabled', !isEnable);
      },
      toggleBtnActive: function ($btn, isActive) {
          $btn.toggleClass('active', isActive);
      },
      onDialogShown: function ($dialog, handler) {
          $dialog.one('shown.bs.modal', handler);
      },
      onDialogHidden: function ($dialog, handler) {
          $dialog.one('hidden.bs.modal', handler);
      },
      showDialog: function ($dialog) {
          $dialog.modal('show');
      },
      hideDialog: function ($dialog) {
          $dialog.modal('hide');
      },
      createLayout: function ($note, options) {
          var $editor = (options.airMode ? ui.airEditor([
              ui.editingArea([
                  ui.airEditable(),
              ]),
          ]) : ui.editor([
              ui.toolbar(),
              ui.editingArea([
                  ui.codable(),
                  ui.editable(),
              ]),
              ui.statusbar(),
          ])).render();
          $editor.insertAfter($note);
          return {
              note: $note,
              editor: $editor,
              toolbar: $editor.find('.note-toolbar'),
              editingArea: $editor.find('.note-editing-area'),
              editable: $editor.find('.note-editable'),
              codable: $editor.find('.note-codable'),
              statusbar: $editor.find('.note-statusbar')
          };
      },
      removeLayout: function ($note, layoutInfo) {
          $note.html(layoutInfo.editable.html());
          layoutInfo.editor.remove();
          $note.show();
      }
  };

  $$1.summernote = $$1.summernote || {
      lang: {}
  };
  $$1.extend($$1.summernote.lang, {
      'en-US': {
          font: {
              bold: 'Bold',
              italic: 'Italic',
              underline: 'Underline',
              clear: 'Remove Font Style',
              height: 'Line Height',
              name: 'Font Family',
              strikethrough: 'Strikethrough',
              subscript: 'Subscript',
              superscript: 'Superscript',
              size: 'Font Size'
          },
          image: {
              image: 'Picture',
              insert: 'Insert Image',
              resizeFull: 'Resize full',
              resizeHalf: 'Resize half',
              resizeQuarter: 'Resize quarter',
              resizeNone: 'Original size',
              floatLeft: 'Float Left',
              floatRight: 'Float Right',
              floatNone: 'Remove float',
              shapeRounded: 'Shape: Rounded',
              shapeCircle: 'Shape: Circle',
              shapeThumbnail: 'Shape: Thumbnail',
              shapeNone: 'Shape: None',
              dragImageHere: 'Drag image or text here',
              dropImage: 'Drop image or Text',
              selectFromFiles: 'Select from files',
              maximumFileSize: 'Maximum file size',
              maximumFileSizeError: 'Maximum file size exceeded.',
              url: 'Image URL',
              remove: 'Remove Image',
              original: 'Original'
          },
          video: {
              video: 'Video',
              videoLink: 'Video Link',
              insert: 'Insert Video',
              url: 'Video URL',
              providers: '(YouTube, Vimeo, Vine, Instagram, DailyMotion or Youku)'
          },
          link: {
              link: 'Link',
              insert: 'Insert Link',
              unlink: 'Unlink',
              edit: 'Edit',
              textToDisplay: 'Text to display',
              url: 'To what URL should this link go?',
              openInNewWindow: 'Open in new window'
          },
          table: {
              table: 'Table',
              addRowAbove: 'Add row above',
              addRowBelow: 'Add row below',
              addColLeft: 'Add column left',
              addColRight: 'Add column right',
              delRow: 'Delete row',
              delCol: 'Delete column',
              delTable: 'Delete table'
          },
          hr: {
              insert: 'Insert Horizontal Rule'
          },
          style: {
              style: 'Style',
              p: 'Normal',
              blockquote: 'Quote',
              pre: 'Code',
              h1: 'Header 1',
              h2: 'Header 2',
              h3: 'Header 3',
              h4: 'Header 4',
              h5: 'Header 5',
              h6: 'Header 6'
          },
          lists: {
              unordered: 'Unordered list',
              ordered: 'Ordered list'
          },
          options: {
              help: 'Help',
              fullscreen: 'Full Screen',
              codeview: 'Code View'
          },
          paragraph: {
              paragraph: 'Paragraph',
              outdent: 'Outdent',
              indent: 'Indent',
              left: 'Align left',
              center: 'Align center',
              right: 'Align right',
              justify: 'Justify full'
          },
          color: {
              recent: 'Recent Color',
              more: 'More Color',
              background: 'Background Color',
              foreground: 'Foreground Color',
              transparent: 'Transparent',
              setTransparent: 'Set transparent',
              reset: 'Reset',
              resetToDefault: 'Reset to default',
              cpSelect: 'Select'
          },
          shortcut: {
              shortcuts: 'Keyboard shortcuts',
              close: 'Close',
              textFormatting: 'Text formatting',
              action: 'Action',
              paragraphFormatting: 'Paragraph formatting',
              documentStyle: 'Document Style',
              extraKeys: 'Extra keys'
          },
          help: {
              'insertParagraph': 'Insert Paragraph',
              'undo': 'Undoes the last command',
              'redo': 'Redoes the last command',
              'tab': 'Tab',
              'untab': 'Untab',
              'bold': 'Set a bold style',
              'italic': 'Set a italic style',
              'underline': 'Set a underline style',
              'strikethrough': 'Set a strikethrough style',
              'removeFormat': 'Clean a style',
              'justifyLeft': 'Set left align',
              'justifyCenter': 'Set center align',
              'justifyRight': 'Set right align',
              'justifyFull': 'Set full align',
              'insertUnorderedList': 'Toggle unordered list',
              'insertOrderedList': 'Toggle ordered list',
              'outdent': 'Outdent on current paragraph',
              'indent': 'Indent on current paragraph',
              'formatPara': 'Change current block\'s format as a paragraph(P tag)',
              'formatH1': 'Change current block\'s format as H1',
              'formatH2': 'Change current block\'s format as H2',
              'formatH3': 'Change current block\'s format as H3',
              'formatH4': 'Change current block\'s format as H4',
              'formatH5': 'Change current block\'s format as H5',
              'formatH6': 'Change current block\'s format as H6',
              'insertHorizontalRule': 'Insert horizontal rule',
              'linkDialog.show': 'Show Link Dialog'
          },
          history: {
              undo: 'Undo',
              redo: 'Redo'
          },
          specialChar: {
              specialChar: 'SPECIAL CHARACTERS',
              select: 'Select Special characters'
          }
      }
  });

  var isSupportAmd = typeof define === 'function' && define.amd; // eslint-disable-line
  /**
   * returns whether font is installed or not.
   *
   * @param {String} fontName
   * @return {Boolean}
   */
  function isFontInstalled(fontName) {
      var testFontName = fontName === 'Comic Sans MS' ? 'Courier New' : 'Comic Sans MS';
      var testText = 'mmmmmmmmmmwwwww';
      var testSize = '200px';
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      context.font = testSize + " '" + testFontName + "'";
      var originalWidth = context.measureText(testText).width;
      context.font = testSize + " '" + fontName + "', '" + testFontName + "'";
      var width = context.measureText(testText).width;
      return originalWidth !== width;
  }
  var userAgent = navigator.userAgent;
  var isMSIE = /MSIE|Trident/i.test(userAgent);
  var browserVersion;
  if (isMSIE) {
      var matches = /MSIE (\d+[.]\d+)/.exec(userAgent);
      if (matches) {
          browserVersion = parseFloat(matches[1]);
      }
      matches = /Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/.exec(userAgent);
      if (matches) {
          browserVersion = parseFloat(matches[1]);
      }
  }
  var isEdge = /Edge\/\d+/.test(userAgent);
  var hasCodeMirror = !!window.CodeMirror;
  var isSupportTouch = (('ontouchstart' in window) ||
      (navigator.MaxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
  // [workaround] IE doesn't have input events for contentEditable
  // - see: https://goo.gl/4bfIvA
  var inputEventName = (isMSIE || isEdge) ? 'DOMCharacterDataModified DOMSubtreeModified DOMNodeInserted' : 'input';
  /**
   * @class core.env
   *
   * Object which check platform and agent
   *
   * @singleton
   * @alternateClassName env
   */
  var env = {
      isMac: navigator.appVersion.indexOf('Mac') > -1,
      isMSIE: isMSIE,
      isEdge: isEdge,
      isFF: !isEdge && /firefox/i.test(userAgent),
      isPhantom: /PhantomJS/i.test(userAgent),
      isWebkit: !isEdge && /webkit/i.test(userAgent),
      isChrome: !isEdge && /chrome/i.test(userAgent),
      isSafari: !isEdge && /safari/i.test(userAgent),
      browserVersion: browserVersion,
      jqueryVersion: parseFloat($$1.fn.jquery),
      isSupportAmd: isSupportAmd,
      isSupportTouch: isSupportTouch,
      hasCodeMirror: hasCodeMirror,
      isFontInstalled: isFontInstalled,
      isW3CRangeSupport: !!document.createRange,
      inputEventName: inputEventName
  };

  /**
   * @class core.func
   *
   * func utils (for high-order func's arg)
   *
   * @singleton
   * @alternateClassName func
   */
  function eq(itemA) {
      return function (itemB) {
          return itemA === itemB;
      };
  }
  function eq2(itemA, itemB) {
      return itemA === itemB;
  }
  function peq2(propName) {
      return function (itemA, itemB) {
          return itemA[propName] === itemB[propName];
      };
  }
  function ok() {
      return true;
  }
  function fail() {
      return false;
  }
  function not(f) {
      return function () {
          return !f.apply(f, arguments);
      };
  }
  function and(fA, fB) {
      return function (item) {
          return fA(item) && fB(item);
      };
  }
  function self(a) {
      return a;
  }
  function invoke(obj, method) {
      return function () {
          return obj[method].apply(obj, arguments);
      };
  }
  var idCounter = 0;
  /**
   * generate a globally-unique id
   *
   * @param {String} [prefix]
   */
  function uniqueId(prefix) {
      var id = ++idCounter + '';
      return prefix ? prefix + id : id;
  }
  /**
   * returns bnd (bounds) from rect
   *
   * - IE Compatibility Issue: http://goo.gl/sRLOAo
   * - Scroll Issue: http://goo.gl/sNjUc
   *
   * @param {Rect} rect
   * @return {Object} bounds
   * @return {Number} bounds.top
   * @return {Number} bounds.left
   * @return {Number} bounds.width
   * @return {Number} bounds.height
   */
  function rect2bnd(rect) {
      var $document = $(document);
      return {
          top: rect.top + $document.scrollTop(),
          left: rect.left + $document.scrollLeft(),
          width: rect.right - rect.left,
          height: rect.bottom - rect.top
      };
  }
  /**
   * returns a copy of the object where the keys have become the values and the values the keys.
   * @param {Object} obj
   * @return {Object}
   */
  function invertObject(obj) {
      var inverted = {};
      for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
              inverted[obj[key]] = key;
          }
      }
      return inverted;
  }
  /**
   * @param {String} namespace
   * @param {String} [prefix]
   * @return {String}
   */
  function namespaceToCamel(namespace, prefix) {
      prefix = prefix || '';
      return prefix + namespace.split('.').map(function (name) {
          return name.substring(0, 1).toUpperCase() + name.substring(1);
      }).join('');
  }
  /**
   * Returns a function, that, as long as it continues to be invoked, will not
   * be triggered. The function will be called after it stops being called for
   * N milliseconds. If `immediate` is passed, trigger the function on the
   * leading edge, instead of the trailing.
   * @param {Function} func
   * @param {Number} wait
   * @param {Boolean} immediate
   * @return {Function}
   */
  function debounce(func, wait, immediate) {
      var timeout;
      return function () {
          var context = this;
          var args = arguments;
          var later = function () {
              timeout = null;
              if (!immediate) {
                  func.apply(context, args);
              }
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) {
              func.apply(context, args);
          }
      };
  }
  /**
   *
   * @param {String} url
   * @return {Boolean}
   */
  function isValidUrl(url) {
      var expression = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
      return expression.test(url);
  }
  var func = {
      eq: eq,
      eq2: eq2,
      peq2: peq2,
      ok: ok,
      fail: fail,
      self: self,
      not: not,
      and: and,
      invoke: invoke,
      uniqueId: uniqueId,
      rect2bnd: rect2bnd,
      invertObject: invertObject,
      namespaceToCamel: namespaceToCamel,
      debounce: debounce,
      isValidUrl: isValidUrl
  };

  /**
   * returns the first item of an array.
   *
   * @param {Array} array
   */
  function head(array) {
      return array[0];
  }
  /**
   * returns the last item of an array.
   *
   * @param {Array} array
   */
  function last(array) {
      return array[array.length - 1];
  }
  /**
   * returns everything but the last entry of the array.
   *
   * @param {Array} array
   */
  function initial(array) {
      return array.slice(0, array.length - 1);
  }
  /**
   * returns the rest of the items in an array.
   *
   * @param {Array} array
   */
  function tail(array) {
      return array.slice(1);
  }
  /**
   * returns item of array
   */
  function find(array, pred) {
      for (var idx = 0, len = array.length; idx < len; idx++) {
          var item = array[idx];
          if (pred(item)) {
              return item;
          }
      }
  }
  /**
   * returns true if all of the values in the array pass the predicate truth test.
   */
  function all(array, pred) {
      for (var idx = 0, len = array.length; idx < len; idx++) {
          if (!pred(array[idx])) {
              return false;
          }
      }
      return true;
  }
  /**
   * returns true if the value is present in the list.
   */
  function contains(array, item) {
      if (array && array.length && item) {
          return array.indexOf(item) !== -1;
      }
      return false;
  }
  /**
   * get sum from a list
   *
   * @param {Array} array - array
   * @param {Function} fn - iterator
   */
  function sum(array, fn) {
      fn = fn || func.self;
      return array.reduce(function (memo, v) {
          return memo + fn(v);
      }, 0);
  }
  /**
   * returns a copy of the collection with array type.
   * @param {Collection} collection - collection eg) node.childNodes, ...
   */
  function from(collection) {
      var result = [];
      var length = collection.length;
      var idx = -1;
      while (++idx < length) {
          result[idx] = collection[idx];
      }
      return result;
  }
  /**
   * returns whether list is empty or not
   */
  function isEmpty(array) {
      return !array || !array.length;
  }
  /**
   * cluster elements by predicate function.
   *
   * @param {Array} array - array
   * @param {Function} fn - predicate function for cluster rule
   * @param {Array[]}
   */
  function clusterBy(array, fn) {
      if (!array.length) {
          return [];
      }
      var aTail = tail(array);
      return aTail.reduce(function (memo, v) {
          var aLast = last(memo);
          if (fn(last(aLast), v)) {
              aLast[aLast.length] = v;
          }
          else {
              memo[memo.length] = [v];
          }
          return memo;
      }, [[head(array)]]);
  }
  /**
   * returns a copy of the array with all false values removed
   *
   * @param {Array} array - array
   * @param {Function} fn - predicate function for cluster rule
   */
  function compact(array) {
      var aResult = [];
      for (var idx = 0, len = array.length; idx < len; idx++) {
          if (array[idx]) {
              aResult.push(array[idx]);
          }
      }
      return aResult;
  }
  /**
   * produces a duplicate-free version of the array
   *
   * @param {Array} array
   */
  function unique(array) {
      var results = [];
      for (var idx = 0, len = array.length; idx < len; idx++) {
          if (!contains(results, array[idx])) {
              results.push(array[idx]);
          }
      }
      return results;
  }
  /**
   * returns next item.
   * @param {Array} array
   */
  function next(array, item) {
      if (array && array.length && item) {
          var idx = array.indexOf(item);
          return idx === -1 ? null : array[idx + 1];
      }
      return null;
  }
  /**
   * returns prev item.
   * @param {Array} array
   */
  function prev(array, item) {
      if (array && array.length && item) {
          var idx = array.indexOf(item);
          return idx === -1 ? null : array[idx - 1];
      }
      return null;
  }
  /**
   * @class core.list
   *
   * list utils
   *
   * @singleton
   * @alternateClassName list
   */
  var lists = {
      head: head,
      last: last,
      initial: initial,
      tail: tail,
      prev: prev,
      next: next,
      find: find,
      contains: contains,
      all: all,
      sum: sum,
      from: from,
      isEmpty: isEmpty,
      clusterBy: clusterBy,
      compact: compact,
      unique: unique
  };

  var NBSP_CHAR = String.fromCharCode(160);
  var ZERO_WIDTH_NBSP_CHAR = '\ufeff';
  /**
   * @method isEditable
   *
   * returns whether node is `note-editable` or not.
   *
   * @param {Node} node
   * @return {Boolean}
   */
  function isEditable(node) {
      return node && $$1(node).hasClass('note-editable');
  }
  /**
   * @method isControlSizing
   *
   * returns whether node is `note-control-sizing` or not.
   *
   * @param {Node} node
   * @return {Boolean}
   */
  function isControlSizing(node) {
      return node && $$1(node).hasClass('note-control-sizing');
  }
  /**
   * @method makePredByNodeName
   *
   * returns predicate which judge whether nodeName is same
   *
   * @param {String} nodeName
   * @return {Function}
   */
  function makePredByNodeName(nodeName) {
      nodeName = nodeName.toUpperCase();
      return function (node) {
          return node && node.nodeName.toUpperCase() === nodeName;
      };
  }
  /**
   * @method isText
   *
   *
   *
   * @param {Node} node
   * @return {Boolean} true if node's type is text(3)
   */
  function isText(node) {
      return node && node.nodeType === 3;
  }
  /**
   * @method isElement
   *
   *
   *
   * @param {Node} node
   * @return {Boolean} true if node's type is element(1)
   */
  function isElement(node) {
      return node && node.nodeType === 1;
  }
  /**
   * ex) br, col, embed, hr, img, input, ...
   * @see http://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
   */
  function isVoid(node) {
      return node && /^BR|^IMG|^HR|^IFRAME|^BUTTON|^INPUT|^AUDIO|^VIDEO|^EMBED/.test(node.nodeName.toUpperCase());
  }
  function isPara(node) {
      if (isEditable(node)) {
          return false;
      }
      // Chrome(v31.0), FF(v25.0.1) use DIV for paragraph
      return node && /^DIV|^P|^LI|^H[1-7]/.test(node.nodeName.toUpperCase());
  }
  function isHeading(node) {
      return node && /^H[1-7]/.test(node.nodeName.toUpperCase());
  }
  var isPre = makePredByNodeName('PRE');
  var isLi = makePredByNodeName('LI');
  function isPurePara(node) {
      return isPara(node) && !isLi(node);
  }
  var isTable = makePredByNodeName('TABLE');
  var isData = makePredByNodeName('DATA');
  function isInline(node) {
      return !isBodyContainer(node) &&
          !isList(node) &&
          !isHr(node) &&
          !isPara(node) &&
          !isTable(node) &&
          !isBlockquote(node) &&
          !isData(node);
  }
  function isList(node) {
      return node && /^UL|^OL/.test(node.nodeName.toUpperCase());
  }
  var isHr = makePredByNodeName('HR');
  function isCell(node) {
      return node && /^TD|^TH/.test(node.nodeName.toUpperCase());
  }
  var isBlockquote = makePredByNodeName('BLOCKQUOTE');
  function isBodyContainer(node) {
      return isCell(node) || isBlockquote(node) || isEditable(node);
  }
  var isAnchor = makePredByNodeName('A');
  function isParaInline(node) {
      return isInline(node) && !!ancestor(node, isPara);
  }
  function isBodyInline(node) {
      return isInline(node) && !ancestor(node, isPara);
  }
  var isBody = makePredByNodeName('BODY');
  /**
   * returns whether nodeB is closest sibling of nodeA
   *
   * @param {Node} nodeA
   * @param {Node} nodeB
   * @return {Boolean}
   */
  function isClosestSibling(nodeA, nodeB) {
      return nodeA.nextSibling === nodeB ||
          nodeA.previousSibling === nodeB;
  }
  /**
   * returns array of closest siblings with node
   *
   * @param {Node} node
   * @param {function} [pred] - predicate function
   * @return {Node[]}
   */
  function withClosestSiblings(node, pred) {
      pred = pred || func.ok;
      var siblings = [];
      if (node.previousSibling && pred(node.previousSibling)) {
          siblings.push(node.previousSibling);
      }
      siblings.push(node);
      if (node.nextSibling && pred(node.nextSibling)) {
          siblings.push(node.nextSibling);
      }
      return siblings;
  }
  /**
   * blank HTML for cursor position
   * - [workaround] old IE only works with &nbsp;
   * - [workaround] IE11 and other browser works with bogus br
   */
  var blankHTML = env.isMSIE && env.browserVersion < 11 ? '&nbsp;' : '<br>';
  /**
   * @method nodeLength
   *
   * returns #text's text size or element's childNodes size
   *
   * @param {Node} node
   */
  function nodeLength(node) {
      if (isText(node)) {
          return node.nodeValue.length;
      }
      if (node) {
          return node.childNodes.length;
      }
      return 0;
  }
  /**
   * returns whether node is empty or not.
   *
   * @param {Node} node
   * @return {Boolean}
   */
  function isEmpty$1(node) {
      var len = nodeLength(node);
      if (len === 0) {
          return true;
      }
      else if (!isText(node) && len === 1 && node.innerHTML === blankHTML) {
          // ex) <p><br></p>, <span><br></span>
          return true;
      }
      else if (lists.all(node.childNodes, isText) && node.innerHTML === '') {
          // ex) <p></p>, <span></span>
          return true;
      }
      return false;
  }
  /**
   * padding blankHTML if node is empty (for cursor position)
   */
  function paddingBlankHTML(node) {
      if (!isVoid(node) && !nodeLength(node)) {
          node.innerHTML = blankHTML;
      }
  }
  /**
   * find nearest ancestor predicate hit
   *
   * @param {Node} node
   * @param {Function} pred - predicate function
   */
  function ancestor(node, pred) {
      while (node) {
          if (pred(node)) {
              return node;
          }
          if (isEditable(node)) {
              break;
          }
          node = node.parentNode;
      }
      return null;
  }
  /**
   * find nearest ancestor only single child blood line and predicate hit
   *
   * @param {Node} node
   * @param {Function} pred - predicate function
   */
  function singleChildAncestor(node, pred) {
      node = node.parentNode;
      while (node) {
          if (nodeLength(node) !== 1) {
              break;
          }
          if (pred(node)) {
              return node;
          }
          if (isEditable(node)) {
              break;
          }
          node = node.parentNode;
      }
      return null;
  }
  /**
   * returns new array of ancestor nodes (until predicate hit).
   *
   * @param {Node} node
   * @param {Function} [optional] pred - predicate function
   */
  function listAncestor(node, pred) {
      pred = pred || func.fail;
      var ancestors = [];
      ancestor(node, function (el) {
          if (!isEditable(el)) {
              ancestors.push(el);
          }
          return pred(el);
      });
      return ancestors;
  }
  /**
   * find farthest ancestor predicate hit
   */
  function lastAncestor(node, pred) {
      var ancestors = listAncestor(node);
      return lists.last(ancestors.filter(pred));
  }
  /**
   * returns common ancestor node between two nodes.
   *
   * @param {Node} nodeA
   * @param {Node} nodeB
   */
  function commonAncestor(nodeA, nodeB) {
      var ancestors = listAncestor(nodeA);
      for (var n = nodeB; n; n = n.parentNode) {
          if (ancestors.indexOf(n) > -1)
              return n;
      }
      return null; // difference document area
  }
  /**
   * listing all previous siblings (until predicate hit).
   *
   * @param {Node} node
   * @param {Function} [optional] pred - predicate function
   */
  function listPrev(node, pred) {
      pred = pred || func.fail;
      var nodes = [];
      while (node) {
          if (pred(node)) {
              break;
          }
          nodes.push(node);
          node = node.previousSibling;
      }
      return nodes;
  }
  /**
   * listing next siblings (until predicate hit).
   *
   * @param {Node} node
   * @param {Function} [pred] - predicate function
   */
  function listNext(node, pred) {
      pred = pred || func.fail;
      var nodes = [];
      while (node) {
          if (pred(node)) {
              break;
          }
          nodes.push(node);
          node = node.nextSibling;
      }
      return nodes;
  }
  /**
   * listing descendant nodes
   *
   * @param {Node} node
   * @param {Function} [pred] - predicate function
   */
  function listDescendant(node, pred) {
      var descendants = [];
      pred = pred || func.ok;
      // start DFS(depth first search) with node
      (function fnWalk(current) {
          if (node !== current && pred(current)) {
              descendants.push(current);
          }
          for (var idx = 0, len = current.childNodes.length; idx < len; idx++) {
              fnWalk(current.childNodes[idx]);
          }
      })(node);
      return descendants;
  }
  /**
   * wrap node with new tag.
   *
   * @param {Node} node
   * @param {Node} tagName of wrapper
   * @return {Node} - wrapper
   */
  function wrap(node, wrapperName) {
      var parent = node.parentNode;
      var wrapper = $$1('<' + wrapperName + '>')[0];
      parent.insertBefore(wrapper, node);
      wrapper.appendChild(node);
      return wrapper;
  }
  /**
   * insert node after preceding
   *
   * @param {Node} node
   * @param {Node} preceding - predicate function
   */
  function insertAfter(node, preceding) {
      var next = preceding.nextSibling;
      var parent = preceding.parentNode;
      if (next) {
          parent.insertBefore(node, next);
      }
      else {
          parent.appendChild(node);
      }
      return node;
  }
  /**
   * append elements.
   *
   * @param {Node} node
   * @param {Collection} aChild
   */
  function appendChildNodes(node, aChild) {
      $$1.each(aChild, function (idx, child) {
          node.appendChild(child);
      });
      return node;
  }
  /**
   * returns whether boundaryPoint is left edge or not.
   *
   * @param {BoundaryPoint} point
   * @return {Boolean}
   */
  function isLeftEdgePoint(point) {
      return point.offset === 0;
  }
  /**
   * returns whether boundaryPoint is right edge or not.
   *
   * @param {BoundaryPoint} point
   * @return {Boolean}
   */
  function isRightEdgePoint(point) {
      return point.offset === nodeLength(point.node);
  }
  /**
   * returns whether boundaryPoint is edge or not.
   *
   * @param {BoundaryPoint} point
   * @return {Boolean}
   */
  function isEdgePoint(point) {
      return isLeftEdgePoint(point) || isRightEdgePoint(point);
  }
  /**
   * returns whether node is left edge of ancestor or not.
   *
   * @param {Node} node
   * @param {Node} ancestor
   * @return {Boolean}
   */
  function isLeftEdgeOf(node, ancestor) {
      while (node && node !== ancestor) {
          if (position(node) !== 0) {
              return false;
          }
          node = node.parentNode;
      }
      return true;
  }
  /**
   * returns whether node is right edge of ancestor or not.
   *
   * @param {Node} node
   * @param {Node} ancestor
   * @return {Boolean}
   */
  function isRightEdgeOf(node, ancestor) {
      if (!ancestor) {
          return false;
      }
      while (node && node !== ancestor) {
          if (position(node) !== nodeLength(node.parentNode) - 1) {
              return false;
          }
          node = node.parentNode;
      }
      return true;
  }
  /**
   * returns whether point is left edge of ancestor or not.
   * @param {BoundaryPoint} point
   * @param {Node} ancestor
   * @return {Boolean}
   */
  function isLeftEdgePointOf(point, ancestor) {
      return isLeftEdgePoint(point) && isLeftEdgeOf(point.node, ancestor);
  }
  /**
   * returns whether point is right edge of ancestor or not.
   * @param {BoundaryPoint} point
   * @param {Node} ancestor
   * @return {Boolean}
   */
  function isRightEdgePointOf(point, ancestor) {
      return isRightEdgePoint(point) && isRightEdgeOf(point.node, ancestor);
  }
  /**
   * returns offset from parent.
   *
   * @param {Node} node
   */
  function position(node) {
      var offset = 0;
      while ((node = node.previousSibling)) {
          offset += 1;
      }
      return offset;
  }
  function hasChildren(node) {
      return !!(node && node.childNodes && node.childNodes.length);
  }
  /**
   * returns previous boundaryPoint
   *
   * @param {BoundaryPoint} point
   * @param {Boolean} isSkipInnerOffset
   * @return {BoundaryPoint}
   */
  function prevPoint(point, isSkipInnerOffset) {
      var node;
      var offset;
      if (point.offset === 0) {
          if (isEditable(point.node)) {
              return null;
          }
          node = point.node.parentNode;
          offset = position(point.node);
      }
      else if (hasChildren(point.node)) {
          node = point.node.childNodes[point.offset - 1];
          offset = nodeLength(node);
      }
      else {
          node = point.node;
          offset = isSkipInnerOffset ? 0 : point.offset - 1;
      }
      return {
          node: node,
          offset: offset
      };
  }
  /**
   * returns next boundaryPoint
   *
   * @param {BoundaryPoint} point
   * @param {Boolean} isSkipInnerOffset
   * @return {BoundaryPoint}
   */
  function nextPoint(point, isSkipInnerOffset) {
      var node, offset;
      if (nodeLength(point.node) === point.offset) {
          if (isEditable(point.node)) {
              return null;
          }
          node = point.node.parentNode;
          offset = position(point.node) + 1;
      }
      else if (hasChildren(point.node)) {
          node = point.node.childNodes[point.offset];
          offset = 0;
      }
      else {
          node = point.node;
          offset = isSkipInnerOffset ? nodeLength(point.node) : point.offset + 1;
      }
      return {
          node: node,
          offset: offset
      };
  }
  /**
   * returns whether pointA and pointB is same or not.
   *
   * @param {BoundaryPoint} pointA
   * @param {BoundaryPoint} pointB
   * @return {Boolean}
   */
  function isSamePoint(pointA, pointB) {
      return pointA.node === pointB.node && pointA.offset === pointB.offset;
  }
  /**
   * returns whether point is visible (can set cursor) or not.
   *
   * @param {BoundaryPoint} point
   * @return {Boolean}
   */
  function isVisiblePoint(point) {
      if (isText(point.node) || !hasChildren(point.node) || isEmpty$1(point.node)) {
          return true;
      }
      var leftNode = point.node.childNodes[point.offset - 1];
      var rightNode = point.node.childNodes[point.offset];
      if ((!leftNode || isVoid(leftNode)) && (!rightNode || isVoid(rightNode))) {
          return true;
      }
      return false;
  }
  /**
   * @method prevPointUtil
   *
   * @param {BoundaryPoint} point
   * @param {Function} pred
   * @return {BoundaryPoint}
   */
  function prevPointUntil(point, pred) {
      while (point) {
          if (pred(point)) {
              return point;
          }
          point = prevPoint(point);
      }
      return null;
  }
  /**
   * @method nextPointUntil
   *
   * @param {BoundaryPoint} point
   * @param {Function} pred
   * @return {BoundaryPoint}
   */
  function nextPointUntil(point, pred) {
      while (point) {
          if (pred(point)) {
              return point;
          }
          point = nextPoint(point);
      }
      return null;
  }
  /**
   * returns whether point has character or not.
   *
   * @param {Point} point
   * @return {Boolean}
   */
  function isCharPoint(point) {
      if (!isText(point.node)) {
          return false;
      }
      var ch = point.node.nodeValue.charAt(point.offset - 1);
      return ch && (ch !== ' ' && ch !== NBSP_CHAR);
  }
  /**
   * @method walkPoint
   *
   * @param {BoundaryPoint} startPoint
   * @param {BoundaryPoint} endPoint
   * @param {Function} handler
   * @param {Boolean} isSkipInnerOffset
   */
  function walkPoint(startPoint, endPoint, handler, isSkipInnerOffset) {
      var point = startPoint;
      while (point) {
          handler(point);
          if (isSamePoint(point, endPoint)) {
              break;
          }
          var isSkipOffset = isSkipInnerOffset &&
              startPoint.node !== point.node &&
              endPoint.node !== point.node;
          point = nextPoint(point, isSkipOffset);
      }
  }
  /**
   * @method makeOffsetPath
   *
   * return offsetPath(array of offset) from ancestor
   *
   * @param {Node} ancestor - ancestor node
   * @param {Node} node
   */
  function makeOffsetPath(ancestor, node) {
      var ancestors = listAncestor(node, func.eq(ancestor));
      return ancestors.map(position).reverse();
  }
  /**
   * @method fromOffsetPath
   *
   * return element from offsetPath(array of offset)
   *
   * @param {Node} ancestor - ancestor node
   * @param {array} offsets - offsetPath
   */
  function fromOffsetPath(ancestor, offsets) {
      var current = ancestor;
      for (var i = 0, len = offsets.length; i < len; i++) {
          if (current.childNodes.length <= offsets[i]) {
              current = current.childNodes[current.childNodes.length - 1];
          }
          else {
              current = current.childNodes[offsets[i]];
          }
      }
      return current;
  }
  /**
   * @method splitNode
   *
   * split element or #text
   *
   * @param {BoundaryPoint} point
   * @param {Object} [options]
   * @param {Boolean} [options.isSkipPaddingBlankHTML] - default: false
   * @param {Boolean} [options.isNotSplitEdgePoint] - default: false
   * @param {Boolean} [options.isDiscardEmptySplits] - default: false
   * @return {Node} right node of boundaryPoint
   */
  function splitNode(point, options) {
      var isSkipPaddingBlankHTML = options && options.isSkipPaddingBlankHTML;
      var isNotSplitEdgePoint = options && options.isNotSplitEdgePoint;
      var isDiscardEmptySplits = options && options.isDiscardEmptySplits;
      if (isDiscardEmptySplits) {
          isSkipPaddingBlankHTML = true;
      }
      // edge case
      if (isEdgePoint(point) && (isText(point.node) || isNotSplitEdgePoint)) {
          if (isLeftEdgePoint(point)) {
              return point.node;
          }
          else if (isRightEdgePoint(point)) {
              return point.node.nextSibling;
          }
      }
      // split #text
      if (isText(point.node)) {
          return point.node.splitText(point.offset);
      }
      else {
          var childNode = point.node.childNodes[point.offset];
          var clone = insertAfter(point.node.cloneNode(false), point.node);
          appendChildNodes(clone, listNext(childNode));
          if (!isSkipPaddingBlankHTML) {
              paddingBlankHTML(point.node);
              paddingBlankHTML(clone);
          }
          if (isDiscardEmptySplits) {
              if (isEmpty$1(point.node)) {
                  remove(point.node);
              }
              if (isEmpty$1(clone)) {
                  remove(clone);
                  return point.node.nextSibling;
              }
          }
          return clone;
      }
  }
  /**
   * @method splitTree
   *
   * split tree by point
   *
   * @param {Node} root - split root
   * @param {BoundaryPoint} point
   * @param {Object} [options]
   * @param {Boolean} [options.isSkipPaddingBlankHTML] - default: false
   * @param {Boolean} [options.isNotSplitEdgePoint] - default: false
   * @return {Node} right node of boundaryPoint
   */
  function splitTree(root, point, options) {
      // ex) [#text, <span>, <p>]
      var ancestors = listAncestor(point.node, func.eq(root));
      if (!ancestors.length) {
          return null;
      }
      else if (ancestors.length === 1) {
          return splitNode(point, options);
      }
      return ancestors.reduce(function (node, parent) {
          if (node === point.node) {
              node = splitNode(point, options);
          }
          return splitNode({
              node: parent,
              offset: node ? position(node) : nodeLength(parent)
          }, options);
      });
  }
  /**
   * split point
   *
   * @param {Point} point
   * @param {Boolean} isInline
   * @return {Object}
   */
  function splitPoint(point, isInline) {
      // find splitRoot, container
      //  - inline: splitRoot is a child of paragraph
      //  - block: splitRoot is a child of bodyContainer
      var pred = isInline ? isPara : isBodyContainer;
      var ancestors = listAncestor(point.node, pred);
      var topAncestor = lists.last(ancestors) || point.node;
      var splitRoot, container;
      if (pred(topAncestor)) {
          splitRoot = ancestors[ancestors.length - 2];
          container = topAncestor;
      }
      else {
          splitRoot = topAncestor;
          container = splitRoot.parentNode;
      }
      // if splitRoot is exists, split with splitTree
      var pivot = splitRoot && splitTree(splitRoot, point, {
          isSkipPaddingBlankHTML: isInline,
          isNotSplitEdgePoint: isInline
      });
      // if container is point.node, find pivot with point.offset
      if (!pivot && container === point.node) {
          pivot = point.node.childNodes[point.offset];
      }
      return {
          rightNode: pivot,
          container: container
      };
  }
  function create(nodeName) {
      return document.createElement(nodeName);
  }
  function createText(text) {
      return document.createTextNode(text);
  }
  /**
   * @method remove
   *
   * remove node, (isRemoveChild: remove child or not)
   *
   * @param {Node} node
   * @param {Boolean} isRemoveChild
   */
  function remove(node, isRemoveChild) {
      if (!node || !node.parentNode) {
          return;
      }
      if (node.removeNode) {
          return node.removeNode(isRemoveChild);
      }
      var parent = node.parentNode;
      if (!isRemoveChild) {
          var nodes = [];
          for (var i = 0, len = node.childNodes.length; i < len; i++) {
              nodes.push(node.childNodes[i]);
          }
          for (var i = 0, len = nodes.length; i < len; i++) {
              parent.insertBefore(nodes[i], node);
          }
      }
      parent.removeChild(node);
  }
  /**
   * @method removeWhile
   *
   * @param {Node} node
   * @param {Function} pred
   */
  function removeWhile(node, pred) {
      while (node) {
          if (isEditable(node) || !pred(node)) {
              break;
          }
          var parent = node.parentNode;
          remove(node);
          node = parent;
      }
  }
  /**
   * @method replace
   *
   * replace node with provided nodeName
   *
   * @param {Node} node
   * @param {String} nodeName
   * @return {Node} - new node
   */
  function replace(node, nodeName) {
      if (node.nodeName.toUpperCase() === nodeName.toUpperCase()) {
          return node;
      }
      var newNode = create(nodeName);
      if (node.style.cssText) {
          newNode.style.cssText = node.style.cssText;
      }
      appendChildNodes(newNode, lists.from(node.childNodes));
      insertAfter(newNode, node);
      remove(node);
      return newNode;
  }
  var isTextarea = makePredByNodeName('TEXTAREA');
  /**
   * @param {jQuery} $node
   * @param {Boolean} [stripLinebreaks] - default: false
   */
  function value($node, stripLinebreaks) {
      var val = isTextarea($node[0]) ? $node.val() : $node.html();
      if (stripLinebreaks) {
          return val.replace(/[\n\r]/g, '');
      }
      return val;
  }
  /**
   * @method html
   *
   * get the HTML contents of node
   *
   * @param {jQuery} $node
   * @param {Boolean} [isNewlineOnBlock]
   */
  function html($node, isNewlineOnBlock) {
      var markup = value($node);
      if (isNewlineOnBlock) {
          var regexTag = /<(\/?)(\b(?!!)[^>\s]*)(.*?)(\s*\/?>)/g;
          markup = markup.replace(regexTag, function (match, endSlash, name) {
              name = name.toUpperCase();
              var isEndOfInlineContainer = /^DIV|^TD|^TH|^P|^LI|^H[1-7]/.test(name) &&
                  !!endSlash;
              var isBlockNode = /^BLOCKQUOTE|^TABLE|^TBODY|^TR|^HR|^UL|^OL/.test(name);
              return match + ((isEndOfInlineContainer || isBlockNode) ? '\n' : '');
          });
          markup = markup.trim();
      }
      return markup;
  }
  function posFromPlaceholder(placeholder) {
      var $placeholder = $$1(placeholder);
      var pos = $placeholder.offset();
      var height = $placeholder.outerHeight(true); // include margin
      return {
          left: pos.left,
          top: pos.top + height
      };
  }
  function attachEvents($node, events) {
      Object.keys(events).forEach(function (key) {
          $node.on(key, events[key]);
      });
  }
  function detachEvents($node, events) {
      Object.keys(events).forEach(function (key) {
          $node.off(key, events[key]);
      });
  }
  /**
   * @method isCustomStyleTag
   *
   * assert if a node contains a "note-styletag" class,
   * which implies that's a custom-made style tag node
   *
   * @param {Node} an HTML DOM node
   */
  function isCustomStyleTag(node) {
      return node && !isText(node) && lists.contains(node.classList, 'note-styletag');
  }
  var dom = {
      /** @property {String} NBSP_CHAR */
      NBSP_CHAR: NBSP_CHAR,
      /** @property {String} ZERO_WIDTH_NBSP_CHAR */
      ZERO_WIDTH_NBSP_CHAR: ZERO_WIDTH_NBSP_CHAR,
      /** @property {String} blank */
      blank: blankHTML,
      /** @property {String} emptyPara */
      emptyPara: "<p>" + blankHTML + "</p>",
      makePredByNodeName: makePredByNodeName,
      isEditable: isEditable,
      isControlSizing: isControlSizing,
      isText: isText,
      isElement: isElement,
      isVoid: isVoid,
      isPara: isPara,
      isPurePara: isPurePara,
      isHeading: isHeading,
      isInline: isInline,
      isBlock: func.not(isInline),
      isBodyInline: isBodyInline,
      isBody: isBody,
      isParaInline: isParaInline,
      isPre: isPre,
      isList: isList,
      isTable: isTable,
      isData: isData,
      isCell: isCell,
      isBlockquote: isBlockquote,
      isBodyContainer: isBodyContainer,
      isAnchor: isAnchor,
      isDiv: makePredByNodeName('DIV'),
      isLi: isLi,
      isBR: makePredByNodeName('BR'),
      isSpan: makePredByNodeName('SPAN'),
      isB: makePredByNodeName('B'),
      isU: makePredByNodeName('U'),
      isS: makePredByNodeName('S'),
      isI: makePredByNodeName('I'),
      isImg: makePredByNodeName('IMG'),
      isTextarea: isTextarea,
      isEmpty: isEmpty$1,
      isEmptyAnchor: func.and(isAnchor, isEmpty$1),
      isClosestSibling: isClosestSibling,
      withClosestSiblings: withClosestSiblings,
      nodeLength: nodeLength,
      isLeftEdgePoint: isLeftEdgePoint,
      isRightEdgePoint: isRightEdgePoint,
      isEdgePoint: isEdgePoint,
      isLeftEdgeOf: isLeftEdgeOf,
      isRightEdgeOf: isRightEdgeOf,
      isLeftEdgePointOf: isLeftEdgePointOf,
      isRightEdgePointOf: isRightEdgePointOf,
      prevPoint: prevPoint,
      nextPoint: nextPoint,
      isSamePoint: isSamePoint,
      isVisiblePoint: isVisiblePoint,
      prevPointUntil: prevPointUntil,
      nextPointUntil: nextPointUntil,
      isCharPoint: isCharPoint,
      walkPoint: walkPoint,
      ancestor: ancestor,
      singleChildAncestor: singleChildAncestor,
      listAncestor: listAncestor,
      lastAncestor: lastAncestor,
      listNext: listNext,
      listPrev: listPrev,
      listDescendant: listDescendant,
      commonAncestor: commonAncestor,
      wrap: wrap,
      insertAfter: insertAfter,
      appendChildNodes: appendChildNodes,
      position: position,
      hasChildren: hasChildren,
      makeOffsetPath: makeOffsetPath,
      fromOffsetPath: fromOffsetPath,
      splitTree: splitTree,
      splitPoint: splitPoint,
      create: create,
      createText: createText,
      remove: remove,
      removeWhile: removeWhile,
      replace: replace,
      html: html,
      value: value,
      posFromPlaceholder: posFromPlaceholder,
      attachEvents: attachEvents,
      detachEvents: detachEvents,
      isCustomStyleTag: isCustomStyleTag
  };

  var Context = /** @class */ (function () {
      /**
       * @param {jQuery} $note
       * @param {Object} options
       */
      function Context($note, options) {
          this.ui = $$1.summernote.ui;
          this.$note = $note;
          this.memos = {};
          this.modules = {};
          this.layoutInfo = {};
          this.options = options;
          this.initialize();
      }
      /**
       * create layout and initialize modules and other resources
       */
      Context.prototype.initialize = function () {
          this.layoutInfo = this.ui.createLayout(this.$note, this.options);
          this._initialize();
          this.$note.hide();
          return this;
      };
      /**
       * destroy modules and other resources and remove layout
       */
      Context.prototype.destroy = function () {
          this._destroy();
          this.$note.removeData('summernote');
          this.ui.removeLayout(this.$note, this.layoutInfo);
      };
      /**
       * destory modules and other resources and initialize it again
       */
      Context.prototype.reset = function () {
          var disabled = this.isDisabled();
          this.code(dom.emptyPara);
          this._destroy();
          this._initialize();
          if (disabled) {
              this.disable();
          }
      };
      Context.prototype._initialize = function () {
          var _this = this;
          // add optional buttons
          var buttons = $$1.extend({}, this.options.buttons);
          Object.keys(buttons).forEach(function (key) {
              _this.memo('button.' + key, buttons[key]);
          });
          var modules = $$1.extend({}, this.options.modules, $$1.summernote.plugins || {});
          // add and initialize modules
          Object.keys(modules).forEach(function (key) {
              _this.module(key, modules[key], true);
          });
          Object.keys(this.modules).forEach(function (key) {
              _this.initializeModule(key);
          });
      };
      Context.prototype._destroy = function () {
          var _this = this;
          // destroy modules with reversed order
          Object.keys(this.modules).reverse().forEach(function (key) {
              _this.removeModule(key);
          });
          Object.keys(this.memos).forEach(function (key) {
              _this.removeMemo(key);
          });
          // trigger custom onDestroy callback
          this.triggerEvent('destroy', this);
      };
      Context.prototype.code = function (html) {
          var isActivated = this.invoke('codeview.isActivated');
          if (html === undefined) {
              this.invoke('codeview.sync');
              return isActivated ? this.layoutInfo.codable.val() : this.layoutInfo.editable.html();
          }
          else {
              if (isActivated) {
                  this.layoutInfo.codable.val(html);
              }
              else {
                  this.layoutInfo.editable.html(html);
              }
              this.$note.val(html);
              this.triggerEvent('change', html, this.layoutInfo.editable);
          }
      };
      Context.prototype.isDisabled = function () {
          return this.layoutInfo.editable.attr('contenteditable') === 'false';
      };
      Context.prototype.enable = function () {
          this.layoutInfo.editable.attr('contenteditable', true);
          this.invoke('toolbar.activate', true);
          this.triggerEvent('disable', false);
      };
      Context.prototype.disable = function () {
          // close codeview if codeview is opend
          if (this.invoke('codeview.isActivated')) {
              this.invoke('codeview.deactivate');
          }
          this.layoutInfo.editable.attr('contenteditable', false);
          this.invoke('toolbar.deactivate', true);
          this.triggerEvent('disable', true);
      };
      Context.prototype.triggerEvent = function () {
          var namespace = lists.head(arguments);
          var args = lists.tail(lists.from(arguments));
          var callback = this.options.callbacks[func.namespaceToCamel(namespace, 'on')];
          if (callback) {
              callback.apply(this.$note[0], args);
          }
          this.$note.trigger('summernote.' + namespace, args);
      };
      Context.prototype.initializeModule = function (key) {
          var module = this.modules[key];
          module.shouldInitialize = module.shouldInitialize || func.ok;
          if (!module.shouldInitialize()) {
              return;
          }
          // initialize module
          if (module.initialize) {
              module.initialize();
          }
          // attach events
          if (module.events) {
              dom.attachEvents(this.$note, module.events);
          }
      };
      Context.prototype.module = function (key, ModuleClass, withoutIntialize) {
          if (arguments.length === 1) {
              return this.modules[key];
          }
          this.modules[key] = new ModuleClass(this);
          if (!withoutIntialize) {
              this.initializeModule(key);
          }
      };
      Context.prototype.removeModule = function (key) {
          var module = this.modules[key];
          if (module.shouldInitialize()) {
              if (module.events) {
                  dom.detachEvents(this.$note, module.events);
              }
              if (module.destroy) {
                  module.destroy();
              }
          }
          delete this.modules[key];
      };
      Context.prototype.memo = function (key, obj) {
          if (arguments.length === 1) {
              return this.memos[key];
          }
          this.memos[key] = obj;
      };
      Context.prototype.removeMemo = function (key) {
          if (this.memos[key] && this.memos[key].destroy) {
              this.memos[key].destroy();
          }
          delete this.memos[key];
      };
      /**
       * Some buttons need to change their visual style immediately once they get pressed
       */
      Context.prototype.createInvokeHandlerAndUpdateState = function (namespace, value) {
          var _this = this;
          return function (event) {
              _this.createInvokeHandler(namespace, value)(event);
              _this.invoke('buttons.updateCurrentStyle');
          };
      };
      Context.prototype.createInvokeHandler = function (namespace, value) {
          var _this = this;
          return function (event) {
              event.preventDefault();
              var $target = $$1(event.target);
              _this.invoke(namespace, value || $target.closest('[data-value]').data('value'), $target);
          };
      };
      Context.prototype.invoke = function () {
          var namespace = lists.head(arguments);
          var args = lists.tail(lists.from(arguments));
          var splits = namespace.split('.');
          var hasSeparator = splits.length > 1;
          var moduleName = hasSeparator && lists.head(splits);
          var methodName = hasSeparator ? lists.last(splits) : lists.head(splits);
          var module = this.modules[moduleName || 'editor'];
          if (!moduleName && this[methodName]) {
              return this[methodName].apply(this, args);
          }
          else if (module && module[methodName] && module.shouldInitialize()) {
              return module[methodName].apply(module, args);
          }
      };
      return Context;
  }());

  $$1.fn.extend({
      /**
       * Summernote API
       *
       * @param {Object|String}
       * @return {this}
       */
      summernote: function () {
          var type = $$1.type(lists.head(arguments));
          var isExternalAPICalled = type === 'string';
          var hasInitOptions = type === 'object';
          var options = $$1.extend({}, $$1.summernote.options, hasInitOptions ? lists.head(arguments) : {});
          // Update options
          options.langInfo = $$1.extend(true, {}, $$1.summernote.lang['en-US'], $$1.summernote.lang[options.lang]);
          options.icons = $$1.extend(true, {}, $$1.summernote.options.icons, options.icons);
          options.tooltip = options.tooltip === 'auto' ? !env.isSupportTouch : options.tooltip;
          this.each(function (idx, note) {
              var $note = $$1(note);
              if (!$note.data('summernote')) {
                  var context = new Context($note, options);
                  $note.data('summernote', context);
                  $note.data('summernote').triggerEvent('init', context.layoutInfo);
              }
          });
          var $note = this.first();
          if ($note.length) {
              var context = $note.data('summernote');
              if (isExternalAPICalled) {
                  return context.invoke.apply(context, lists.from(arguments));
              }
              else if (options.focus) {
                  context.invoke('editor.focus');
              }
          }
          return this;
      }
  });

  /**
   * return boundaryPoint from TextRange, inspired by Andy Na's HuskyRange.js
   *
   * @param {TextRange} textRange
   * @param {Boolean} isStart
   * @return {BoundaryPoint}
   *
   * @see http://msdn.microsoft.com/en-us/library/ie/ms535872(v=vs.85).aspx
   */
  function textRangeToPoint(textRange, isStart) {
      var container = textRange.parentElement();
      var offset;
      var tester = document.body.createTextRange();
      var prevContainer;
      var childNodes = lists.from(container.childNodes);
      for (offset = 0; offset < childNodes.length; offset++) {
          if (dom.isText(childNodes[offset])) {
              continue;
          }
          tester.moveToElementText(childNodes[offset]);
          if (tester.compareEndPoints('StartToStart', textRange) >= 0) {
              break;
          }
          prevContainer = childNodes[offset];
      }
      if (offset !== 0 && dom.isText(childNodes[offset - 1])) {
          var textRangeStart = document.body.createTextRange();
          var curTextNode = null;
          textRangeStart.moveToElementText(prevContainer || container);
          textRangeStart.collapse(!prevContainer);
          curTextNode = prevContainer ? prevContainer.nextSibling : container.firstChild;
          var pointTester = textRange.duplicate();
          pointTester.setEndPoint('StartToStart', textRangeStart);
          var textCount = pointTester.text.replace(/[\r\n]/g, '').length;
          while (textCount > curTextNode.nodeValue.length && curTextNode.nextSibling) {
              textCount -= curTextNode.nodeValue.length;
              curTextNode = curTextNode.nextSibling;
          }
          // [workaround] enforce IE to re-reference curTextNode, hack
          var dummy = curTextNode.nodeValue; // eslint-disable-line
          if (isStart && curTextNode.nextSibling && dom.isText(curTextNode.nextSibling) &&
              textCount === curTextNode.nodeValue.length) {
              textCount -= curTextNode.nodeValue.length;
              curTextNode = curTextNode.nextSibling;
          }
          container = curTextNode;
          offset = textCount;
      }
      return {
          cont: container,
          offset: offset
      };
  }
  /**
   * return TextRange from boundary point (inspired by google closure-library)
   * @param {BoundaryPoint} point
   * @return {TextRange}
   */
  function pointToTextRange(point) {
      var textRangeInfo = function (container, offset) {
          var node, isCollapseToStart;
          if (dom.isText(container)) {
              var prevTextNodes = dom.listPrev(container, func.not(dom.isText));
              var prevContainer = lists.last(prevTextNodes).previousSibling;
              node = prevContainer || container.parentNode;
              offset += lists.sum(lists.tail(prevTextNodes), dom.nodeLength);
              isCollapseToStart = !prevContainer;
          }
          else {
              node = container.childNodes[offset] || container;
              if (dom.isText(node)) {
                  return textRangeInfo(node, 0);
              }
              offset = 0;
              isCollapseToStart = false;
          }
          return {
              node: node,
              collapseToStart: isCollapseToStart,
              offset: offset
          };
      };
      var textRange = document.body.createTextRange();
      var info = textRangeInfo(point.node, point.offset);
      textRange.moveToElementText(info.node);
      textRange.collapse(info.collapseToStart);
      textRange.moveStart('character', info.offset);
      return textRange;
  }
  /**
     * Wrapped Range
     *
     * @constructor
     * @param {Node} sc - start container
     * @param {Number} so - start offset
     * @param {Node} ec - end container
     * @param {Number} eo - end offset
     */
  var WrappedRange = /** @class */ (function () {
      function WrappedRange(sc, so, ec, eo) {
          this.sc = sc;
          this.so = so;
          this.ec = ec;
          this.eo = eo;
          // isOnEditable: judge whether range is on editable or not
          this.isOnEditable = this.makeIsOn(dom.isEditable);
          // isOnList: judge whether range is on list node or not
          this.isOnList = this.makeIsOn(dom.isList);
          // isOnAnchor: judge whether range is on anchor node or not
          this.isOnAnchor = this.makeIsOn(dom.isAnchor);
          // isOnCell: judge whether range is on cell node or not
          this.isOnCell = this.makeIsOn(dom.isCell);
          // isOnData: judge whether range is on data node or not
          this.isOnData = this.makeIsOn(dom.isData);
      }
      // nativeRange: get nativeRange from sc, so, ec, eo
      WrappedRange.prototype.nativeRange = function () {
          if (env.isW3CRangeSupport) {
              var w3cRange = document.createRange();
              w3cRange.setStart(this.sc, this.sc.data && this.so > this.sc.data.length ? 0 : this.so);
              w3cRange.setEnd(this.ec, this.sc.data ? Math.min(this.eo, this.sc.data.length) : this.eo);
              return w3cRange;
          }
          else {
              var textRange = pointToTextRange({
                  node: this.sc,
                  offset: this.so
              });
              textRange.setEndPoint('EndToEnd', pointToTextRange({
                  node: this.ec,
                  offset: this.eo
              }));
              return textRange;
          }
      };
      WrappedRange.prototype.getPoints = function () {
          return {
              sc: this.sc,
              so: this.so,
              ec: this.ec,
              eo: this.eo
          };
      };
      WrappedRange.prototype.getStartPoint = function () {
          return {
              node: this.sc,
              offset: this.so
          };
      };
      WrappedRange.prototype.getEndPoint = function () {
          return {
              node: this.ec,
              offset: this.eo
          };
      };
      /**
       * select update visible range
       */
      WrappedRange.prototype.select = function () {
          var nativeRng = this.nativeRange();
          if (env.isW3CRangeSupport) {
              var selection = document.getSelection();
              if (selection.rangeCount > 0) {
                  selection.removeAllRanges();
              }
              selection.addRange(nativeRng);
          }
          else {
              nativeRng.select();
          }
          return this;
      };
      /**
       * Moves the scrollbar to start container(sc) of current range
       *
       * @return {WrappedRange}
       */
      WrappedRange.prototype.scrollIntoView = function (container) {
          var height = $$1(container).height();
          if (container.scrollTop + height < this.sc.offsetTop) {
              container.scrollTop += Math.abs(container.scrollTop + height - this.sc.offsetTop);
          }
          return this;
      };
      /**
       * @return {WrappedRange}
       */
      WrappedRange.prototype.normalize = function () {
          /**
           * @param {BoundaryPoint} point
           * @param {Boolean} isLeftToRight - true: prefer to choose right node
           *                                - false: prefer to choose left node
           * @return {BoundaryPoint}
           */
          var getVisiblePoint = function (point, isLeftToRight) {
              // Just use the given point [XXX:Adhoc]
              //  - case 01. if the point is on the middle of the node
              //  - case 02. if the point is on the right edge and prefer to choose left node
              //  - case 03. if the point is on the left edge and prefer to choose right node
              //  - case 04. if the point is on the right edge and prefer to choose right node but the node is void
              //  - case 05. if the point is on the left edge and prefer to choose left node but the node is void
              //  - case 06. if the point is on the block node and there is no children
              if (dom.isVisiblePoint(point)) {
                  if (!dom.isEdgePoint(point) ||
                      (dom.isRightEdgePoint(point) && !isLeftToRight) ||
                      (dom.isLeftEdgePoint(point) && isLeftToRight) ||
                      (dom.isRightEdgePoint(point) && isLeftToRight && dom.isVoid(point.node.nextSibling)) ||
                      (dom.isLeftEdgePoint(point) && !isLeftToRight && dom.isVoid(point.node.previousSibling)) ||
                      (dom.isBlock(point.node) && dom.isEmpty(point.node))) {
                      return point;
                  }
              }
              // point on block's edge
              var block = dom.ancestor(point.node, dom.isBlock);
              if (((dom.isLeftEdgePointOf(point, block) || dom.isVoid(dom.prevPoint(point).node)) && !isLeftToRight) ||
                  ((dom.isRightEdgePointOf(point, block) || dom.isVoid(dom.nextPoint(point).node)) && isLeftToRight)) {
                  // returns point already on visible point
                  if (dom.isVisiblePoint(point)) {
                      return point;
                  }
                  // reverse direction
                  isLeftToRight = !isLeftToRight;
              }
              var nextPoint = isLeftToRight ? dom.nextPointUntil(dom.nextPoint(point), dom.isVisiblePoint)
                  : dom.prevPointUntil(dom.prevPoint(point), dom.isVisiblePoint);
              return nextPoint || point;
          };
          var endPoint = getVisiblePoint(this.getEndPoint(), false);
          var startPoint = this.isCollapsed() ? endPoint : getVisiblePoint(this.getStartPoint(), true);
          return new WrappedRange(startPoint.node, startPoint.offset, endPoint.node, endPoint.offset);
      };
      /**
       * returns matched nodes on range
       *
       * @param {Function} [pred] - predicate function
       * @param {Object} [options]
       * @param {Boolean} [options.includeAncestor]
       * @param {Boolean} [options.fullyContains]
       * @return {Node[]}
       */
      WrappedRange.prototype.nodes = function (pred, options) {
          pred = pred || func.ok;
          var includeAncestor = options && options.includeAncestor;
          var fullyContains = options && options.fullyContains;
          // TODO compare points and sort
          var startPoint = this.getStartPoint();
          var endPoint = this.getEndPoint();
          var nodes = [];
          var leftEdgeNodes = [];
          dom.walkPoint(startPoint, endPoint, function (point) {
              if (dom.isEditable(point.node)) {
                  return;
              }
              var node;
              if (fullyContains) {
                  if (dom.isLeftEdgePoint(point)) {
                      leftEdgeNodes.push(point.node);
                  }
                  if (dom.isRightEdgePoint(point) && lists.contains(leftEdgeNodes, point.node)) {
                      node = point.node;
                  }
              }
              else if (includeAncestor) {
                  node = dom.ancestor(point.node, pred);
              }
              else {
                  node = point.node;
              }
              if (node && pred(node)) {
                  nodes.push(node);
              }
          }, true);
          return lists.unique(nodes);
      };
      /**
       * returns commonAncestor of range
       * @return {Element} - commonAncestor
       */
      WrappedRange.prototype.commonAncestor = function () {
          return dom.commonAncestor(this.sc, this.ec);
      };
      /**
       * returns expanded range by pred
       *
       * @param {Function} pred - predicate function
       * @return {WrappedRange}
       */
      WrappedRange.prototype.expand = function (pred) {
          var startAncestor = dom.ancestor(this.sc, pred);
          var endAncestor = dom.ancestor(this.ec, pred);
          if (!startAncestor && !endAncestor) {
              return new WrappedRange(this.sc, this.so, this.ec, this.eo);
          }
          var boundaryPoints = this.getPoints();
          if (startAncestor) {
              boundaryPoints.sc = startAncestor;
              boundaryPoints.so = 0;
          }
          if (endAncestor) {
              boundaryPoints.ec = endAncestor;
              boundaryPoints.eo = dom.nodeLength(endAncestor);
          }
          return new WrappedRange(boundaryPoints.sc, boundaryPoints.so, boundaryPoints.ec, boundaryPoints.eo);
      };
      /**
       * @param {Boolean} isCollapseToStart
       * @return {WrappedRange}
       */
      WrappedRange.prototype.collapse = function (isCollapseToStart) {
          if (isCollapseToStart) {
              return new WrappedRange(this.sc, this.so, this.sc, this.so);
          }
          else {
              return new WrappedRange(this.ec, this.eo, this.ec, this.eo);
          }
      };
      /**
       * splitText on range
       */
      WrappedRange.prototype.splitText = function () {
          var isSameContainer = this.sc === this.ec;
          var boundaryPoints = this.getPoints();
          if (dom.isText(this.ec) && !dom.isEdgePoint(this.getEndPoint())) {
              this.ec.splitText(this.eo);
          }
          if (dom.isText(this.sc) && !dom.isEdgePoint(this.getStartPoint())) {
              boundaryPoints.sc = this.sc.splitText(this.so);
              boundaryPoints.so = 0;
              if (isSameContainer) {
                  boundaryPoints.ec = boundaryPoints.sc;
                  boundaryPoints.eo = this.eo - this.so;
              }
          }
          return new WrappedRange(boundaryPoints.sc, boundaryPoints.so, boundaryPoints.ec, boundaryPoints.eo);
      };
      /**
       * delete contents on range
       * @return {WrappedRange}
       */
      WrappedRange.prototype.deleteContents = function () {
          if (this.isCollapsed()) {
              return this;
          }
          var rng = this.splitText();
          var nodes = rng.nodes(null, {
              fullyContains: true
          });
          // find new cursor point
          var point = dom.prevPointUntil(rng.getStartPoint(), function (point) {
              return !lists.contains(nodes, point.node);
          });
          var emptyParents = [];
          $$1.each(nodes, function (idx, node) {
              // find empty parents
              var parent = node.parentNode;
              if (point.node !== parent && dom.nodeLength(parent) === 1) {
                  emptyParents.push(parent);
              }
              dom.remove(node, false);
          });
          // remove empty parents
          $$1.each(emptyParents, function (idx, node) {
              dom.remove(node, false);
          });
          return new WrappedRange(point.node, point.offset, point.node, point.offset).normalize();
      };
      /**
       * makeIsOn: return isOn(pred) function
       */
      WrappedRange.prototype.makeIsOn = function (pred) {
          return function () {
              var ancestor = dom.ancestor(this.sc, pred);
              return !!ancestor && (ancestor === dom.ancestor(this.ec, pred));
          };
      };
      /**
       * @param {Function} pred
       * @return {Boolean}
       */
      WrappedRange.prototype.isLeftEdgeOf = function (pred) {
          if (!dom.isLeftEdgePoint(this.getStartPoint())) {
              return false;
          }
          var node = dom.ancestor(this.sc, pred);
          return node && dom.isLeftEdgeOf(this.sc, node);
      };
      /**
       * returns whether range was collapsed or not
       */
      WrappedRange.prototype.isCollapsed = function () {
          return this.sc === this.ec && this.so === this.eo;
      };
      /**
       * wrap inline nodes which children of body with paragraph
       *
       * @return {WrappedRange}
       */
      WrappedRange.prototype.wrapBodyInlineWithPara = function () {
          if (dom.isBodyContainer(this.sc) && dom.isEmpty(this.sc)) {
              this.sc.innerHTML = dom.emptyPara;
              return new WrappedRange(this.sc.firstChild, 0, this.sc.firstChild, 0);
          }
          /**
           * [workaround] firefox often create range on not visible point. so normalize here.
           *  - firefox: |<p>text</p>|
           *  - chrome: <p>|text|</p>
           */
          var rng = this.normalize();
          if (dom.isParaInline(this.sc) || dom.isPara(this.sc)) {
              return rng;
          }
          // find inline top ancestor
          var topAncestor;
          if (dom.isInline(rng.sc)) {
              var ancestors = dom.listAncestor(rng.sc, func.not(dom.isInline));
              topAncestor = lists.last(ancestors);
              if (!dom.isInline(topAncestor)) {
                  topAncestor = ancestors[ancestors.length - 2] || rng.sc.childNodes[rng.so];
              }
          }
          else {
              topAncestor = rng.sc.childNodes[rng.so > 0 ? rng.so - 1 : 0];
          }
          // siblings not in paragraph
          var inlineSiblings = dom.listPrev(topAncestor, dom.isParaInline).reverse();
          inlineSiblings = inlineSiblings.concat(dom.listNext(topAncestor.nextSibling, dom.isParaInline));
          // wrap with paragraph
          if (inlineSiblings.length) {
              var para = dom.wrap(lists.head(inlineSiblings), 'p');
              dom.appendChildNodes(para, lists.tail(inlineSiblings));
          }
          return this.normalize();
      };
      /**
       * insert node at current cursor
       *
       * @param {Node} node
       * @return {Node}
       */
      WrappedRange.prototype.insertNode = function (node) {
          var rng = this.wrapBodyInlineWithPara().deleteContents();
          var info = dom.splitPoint(rng.getStartPoint(), dom.isInline(node));
          if (info.rightNode) {
              info.rightNode.parentNode.insertBefore(node, info.rightNode);
          }
          else {
              info.container.appendChild(node);
          }
          return node;
      };
      /**
       * insert html at current cursor
       */
      WrappedRange.prototype.pasteHTML = function (markup) {
          var contentsContainer = $$1('<div></div>').html(markup)[0];
          var childNodes = lists.from(contentsContainer.childNodes);
          var rng = this.wrapBodyInlineWithPara().deleteContents();
          if (rng.so > 0) {
              childNodes = childNodes.reverse();
          }
          childNodes = childNodes.map(function (childNode) {
              return rng.insertNode(childNode);
          });
          if (rng.so > 0) {
              childNodes = childNodes.reverse();
          }
          return childNodes;
      };
      /**
       * returns text in range
       *
       * @return {String}
       */
      WrappedRange.prototype.toString = function () {
          var nativeRng = this.nativeRange();
          return env.isW3CRangeSupport ? nativeRng.toString() : nativeRng.text;
      };
      /**
       * returns range for word before cursor
       *
       * @param {Boolean} [findAfter] - find after cursor, default: false
       * @return {WrappedRange}
       */
      WrappedRange.prototype.getWordRange = function (findAfter) {
          var endPoint = this.getEndPoint();
          if (!dom.isCharPoint(endPoint)) {
              return this;
          }
          var startPoint = dom.prevPointUntil(endPoint, function (point) {
              return !dom.isCharPoint(point);
          });
          if (findAfter) {
              endPoint = dom.nextPointUntil(endPoint, function (point) {
                  return !dom.isCharPoint(point);
              });
          }
          return new WrappedRange(startPoint.node, startPoint.offset, endPoint.node, endPoint.offset);
      };
      /**
       * create offsetPath bookmark
       *
       * @param {Node} editable
       */
      WrappedRange.prototype.bookmark = function (editable) {
          return {
              s: {
                  path: dom.makeOffsetPath(editable, this.sc),
                  offset: this.so
              },
              e: {
                  path: dom.makeOffsetPath(editable, this.ec),
                  offset: this.eo
              }
          };
      };
      /**
       * create offsetPath bookmark base on paragraph
       *
       * @param {Node[]} paras
       */
      WrappedRange.prototype.paraBookmark = function (paras) {
          return {
              s: {
                  path: lists.tail(dom.makeOffsetPath(lists.head(paras), this.sc)),
                  offset: this.so
              },
              e: {
                  path: lists.tail(dom.makeOffsetPath(lists.last(paras), this.ec)),
                  offset: this.eo
              }
          };
      };
      /**
       * getClientRects
       * @return {Rect[]}
       */
      WrappedRange.prototype.getClientRects = function () {
          var nativeRng = this.nativeRange();
          return nativeRng.getClientRects();
      };
      return WrappedRange;
  }());
  /**
   * Data structure
   *  * BoundaryPoint: a point of dom tree
   *  * BoundaryPoints: two boundaryPoints corresponding to the start and the end of the Range
   *
   * See to http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html#Level-2-Range-Position
   */
  var range = {
      /**
       * create Range Object From arguments or Browser Selection
       *
       * @param {Node} sc - start container
       * @param {Number} so - start offset
       * @param {Node} ec - end container
       * @param {Number} eo - end offset
       * @return {WrappedRange}
       */
      create: function (sc, so, ec, eo) {
          if (arguments.length === 4) {
              return new WrappedRange(sc, so, ec, eo);
          }
          else if (arguments.length === 2) { // collapsed
              ec = sc;
              eo = so;
              return new WrappedRange(sc, so, ec, eo);
          }
          else {
              var wrappedRange = this.createFromSelection();
              if (!wrappedRange && arguments.length === 1) {
                  wrappedRange = this.createFromNode(arguments[0]);
                  return wrappedRange.collapse(dom.emptyPara === arguments[0].innerHTML);
              }
              return wrappedRange;
          }
      },
      createFromSelection: function () {
          var sc, so, ec, eo;
          if (env.isW3CRangeSupport) {
              var selection = document.getSelection();
              if (!selection || selection.rangeCount === 0) {
                  return null;
              }
              else if (dom.isBody(selection.anchorNode)) {
                  // Firefox: returns entire body as range on initialization.
                  // We won't never need it.
                  return null;
              }
              var nativeRng = selection.getRangeAt(0);
              sc = nativeRng.startContainer;
              so = nativeRng.startOffset;
              ec = nativeRng.endContainer;
              eo = nativeRng.endOffset;
          }
          else { // IE8: TextRange
              var textRange = document.selection.createRange();
              var textRangeEnd = textRange.duplicate();
              textRangeEnd.collapse(false);
              var textRangeStart = textRange;
              textRangeStart.collapse(true);
              var startPoint = textRangeToPoint(textRangeStart, true);
              var endPoint = textRangeToPoint(textRangeEnd, false);
              // same visible point case: range was collapsed.
              if (dom.isText(startPoint.node) && dom.isLeftEdgePoint(startPoint) &&
                  dom.isTextNode(endPoint.node) && dom.isRightEdgePoint(endPoint) &&
                  endPoint.node.nextSibling === startPoint.node) {
                  startPoint = endPoint;
              }
              sc = startPoint.cont;
              so = startPoint.offset;
              ec = endPoint.cont;
              eo = endPoint.offset;
          }
          return new WrappedRange(sc, so, ec, eo);
      },
      /**
       * @method
       *
       * create WrappedRange from node
       *
       * @param {Node} node
       * @return {WrappedRange}
       */
      createFromNode: function (node) {
          var sc = node;
          var so = 0;
          var ec = node;
          var eo = dom.nodeLength(ec);
          // browsers can't target a picture or void node
          if (dom.isVoid(sc)) {
              so = dom.listPrev(sc).length - 1;
              sc = sc.parentNode;
          }
          if (dom.isBR(ec)) {
              eo = dom.listPrev(ec).length - 1;
              ec = ec.parentNode;
          }
          else if (dom.isVoid(ec)) {
              eo = dom.listPrev(ec).length;
              ec = ec.parentNode;
          }
          return this.create(sc, so, ec, eo);
      },
      /**
       * create WrappedRange from node after position
       *
       * @param {Node} node
       * @return {WrappedRange}
       */
      createFromNodeBefore: function (node) {
          return this.createFromNode(node).collapse(true);
      },
      /**
       * create WrappedRange from node after position
       *
       * @param {Node} node
       * @return {WrappedRange}
       */
      createFromNodeAfter: function (node) {
          return this.createFromNode(node).collapse();
      },
      /**
       * @method
       *
       * create WrappedRange from bookmark
       *
       * @param {Node} editable
       * @param {Object} bookmark
       * @return {WrappedRange}
       */
      createFromBookmark: function (editable, bookmark) {
          var sc = dom.fromOffsetPath(editable, bookmark.s.path);
          var so = bookmark.s.offset;
          var ec = dom.fromOffsetPath(editable, bookmark.e.path);
          var eo = bookmark.e.offset;
          return new WrappedRange(sc, so, ec, eo);
      },
      /**
       * @method
       *
       * create WrappedRange from paraBookmark
       *
       * @param {Object} bookmark
       * @param {Node[]} paras
       * @return {WrappedRange}
       */
      createFromParaBookmark: function (bookmark, paras) {
          var so = bookmark.s.offset;
          var eo = bookmark.e.offset;
          var sc = dom.fromOffsetPath(lists.head(paras), bookmark.s.path);
          var ec = dom.fromOffsetPath(lists.last(paras), bookmark.e.path);
          return new WrappedRange(sc, so, ec, eo);
      }
  };

  var KEY_MAP = {
      'BACKSPACE': 8,
      'TAB': 9,
      'ENTER': 13,
      'SPACE': 32,
      'DELETE': 46,
      // Arrow
      'LEFT': 37,
      'UP': 38,
      'RIGHT': 39,
      'DOWN': 40,
      // Number: 0-9
      'NUM0': 48,
      'NUM1': 49,
      'NUM2': 50,
      'NUM3': 51,
      'NUM4': 52,
      'NUM5': 53,
      'NUM6': 54,
      'NUM7': 55,
      'NUM8': 56,
      // Alphabet: a-z
      'B': 66,
      'E': 69,
      'I': 73,
      'J': 74,
      'K': 75,
      'L': 76,
      'R': 82,
      'S': 83,
      'U': 85,
      'V': 86,
      'Y': 89,
      'Z': 90,
      'SLASH': 191,
      'LEFTBRACKET': 219,
      'BACKSLASH': 220,
      'RIGHTBRACKET': 221
  };
  /**
   * @class core.key
   *
   * Object for keycodes.
   *
   * @singleton
   * @alternateClassName key
   */
  var key = {
      /**
       * @method isEdit
       *
       * @param {Number} keyCode
       * @return {Boolean}
       */
      isEdit: function (keyCode) {
          return lists.contains([
              KEY_MAP.BACKSPACE,
              KEY_MAP.TAB,
              KEY_MAP.ENTER,
              KEY_MAP.SPACE,
              KEY_MAP.DELETE,
          ], keyCode);
      },
      /**
       * @method isMove
       *
       * @param {Number} keyCode
       * @return {Boolean}
       */
      isMove: function (keyCode) {
          return lists.contains([
              KEY_MAP.LEFT,
              KEY_MAP.UP,
              KEY_MAP.RIGHT,
              KEY_MAP.DOWN,
          ], keyCode);
      },
      /**
       * @property {Object} nameFromCode
       * @property {String} nameFromCode.8 "BACKSPACE"
       */
      nameFromCode: func.invertObject(KEY_MAP),
      code: KEY_MAP
  };

  /**
   * @method readFileAsDataURL
   *
   * read contents of file as representing URL
   *
   * @param {File} file
   * @return {Promise} - then: dataUrl
   */
  function readFileAsDataURL(file) {
      return $$1.Deferred(function (deferred) {
          $$1.extend(new FileReader(), {
              onload: function (e) {
                  var dataURL = e.target.result;
                  deferred.resolve(dataURL);
              },
              onerror: function (err) {
                  deferred.reject(err);
              }
          }).readAsDataURL(file);
      }).promise();
  }
  /**
   * @method createImage
   *
   * create `<image>` from url string
   *
   * @param {String} url
   * @return {Promise} - then: $image
   */
  function createImage(url) {
      return $$1.Deferred(function (deferred) {
          var $img = $$1('<img>');
          $img.one('load', function () {
              $img.off('error abort');
              deferred.resolve($img);
          }).one('error abort', function () {
              $img.off('load').detach();
              deferred.reject($img);
          }).css({
              display: 'none'
          }).appendTo(document.body).attr('src', url);
      }).promise();
  }

  var History = /** @class */ (function () {
      function History($editable) {
          this.stack = [];
          this.stackOffset = -1;
          this.$editable = $editable;
          this.editable = $editable[0];
      }
      History.prototype.makeSnapshot = function () {
          var rng = range.create(this.editable);
          var emptyBookmark = { s: { path: [], offset: 0 }, e: { path: [], offset: 0 } };
          return {
              contents: this.$editable.html(),
              bookmark: ((rng && rng.isOnEditable()) ? rng.bookmark(this.editable) : emptyBookmark)
          };
      };
      History.prototype.applySnapshot = function (snapshot) {
          if (snapshot.contents !== null) {
              this.$editable.html(snapshot.contents);
          }
          if (snapshot.bookmark !== null) {
              range.createFromBookmark(this.editable, snapshot.bookmark).select();
          }
      };
      /**
      * @method rewind
      * Rewinds the history stack back to the first snapshot taken.
      * Leaves the stack intact, so that "Redo" can still be used.
      */
      History.prototype.rewind = function () {
          // Create snap shot if not yet recorded
          if (this.$editable.html() !== this.stack[this.stackOffset].contents) {
              this.recordUndo();
          }
          // Return to the first available snapshot.
          this.stackOffset = 0;
          // Apply that snapshot.
          this.applySnapshot(this.stack[this.stackOffset]);
      };
      /**
      *  @method commit
      *  Resets history stack, but keeps current editor's content.
      */
      History.prototype.commit = function () {
          // Clear the stack.
          this.stack = [];
          // Restore stackOffset to its original value.
          this.stackOffset = -1;
          // Record our first snapshot (of nothing).
          this.recordUndo();
      };
      /**
      * @method reset
      * Resets the history stack completely; reverting to an empty editor.
      */
      History.prototype.reset = function () {
          // Clear the stack.
          this.stack = [];
          // Restore stackOffset to its original value.
          this.stackOffset = -1;
          // Clear the editable area.
          this.$editable.html('');
          // Record our first snapshot (of nothing).
          this.recordUndo();
      };
      /**
       * undo
       */
      History.prototype.undo = function () {
          // Create snap shot if not yet recorded
          if (this.$editable.html() !== this.stack[this.stackOffset].contents) {
              this.recordUndo();
          }
          if (this.stackOffset > 0) {
              this.stackOffset--;
              this.applySnapshot(this.stack[this.stackOffset]);
          }
      };
      /**
       * redo
       */
      History.prototype.redo = function () {
          if (this.stack.length - 1 > this.stackOffset) {
              this.stackOffset++;
              this.applySnapshot(this.stack[this.stackOffset]);
          }
      };
      /**
       * recorded undo
       */
      History.prototype.recordUndo = function () {
          this.stackOffset++;
          // Wash out stack after stackOffset
          if (this.stack.length > this.stackOffset) {
              this.stack = this.stack.slice(0, this.stackOffset);
          }
          // Create new snapshot and push it to the end
          this.stack.push(this.makeSnapshot());
      };
      return History;
  }());

  var Style = /** @class */ (function () {
      function Style() {
      }
      /**
       * @method jQueryCSS
       *
       * [workaround] for old jQuery
       * passing an array of style properties to .css()
       * will result in an object of property-value pairs.
       * (compability with version < 1.9)
       *
       * @private
       * @param  {jQuery} $obj
       * @param  {Array} propertyNames - An array of one or more CSS properties.
       * @return {Object}
       */
      Style.prototype.jQueryCSS = function ($obj, propertyNames) {
          if (env.jqueryVersion < 1.9) {
              var result_1 = {};
              $$1.each(propertyNames, function (idx, propertyName) {
                  result_1[propertyName] = $obj.css(propertyName);
              });
              return result_1;
          }
          return $obj.css(propertyNames);
      };
      /**
       * returns style object from node
       *
       * @param {jQuery} $node
       * @return {Object}
       */
      Style.prototype.fromNode = function ($node) {
          var properties = ['font-family', 'font-size', 'text-align', 'list-style-type', 'line-height'];
          var styleInfo = this.jQueryCSS($node, properties) || {};
          styleInfo['font-size'] = parseInt(styleInfo['font-size'], 10);
          return styleInfo;
      };
      /**
       * paragraph level style
       *
       * @param {WrappedRange} rng
       * @param {Object} styleInfo
       */
      Style.prototype.stylePara = function (rng, styleInfo) {
          $$1.each(rng.nodes(dom.isPara, {
              includeAncestor: true
          }), function (idx, para) {
              $$1(para).css(styleInfo);
          });
      };
      /**
       * insert and returns styleNodes on range.
       *
       * @param {WrappedRange} rng
       * @param {Object} [options] - options for styleNodes
       * @param {String} [options.nodeName] - default: `SPAN`
       * @param {Boolean} [options.expandClosestSibling] - default: `false`
       * @param {Boolean} [options.onlyPartialContains] - default: `false`
       * @return {Node[]}
       */
      Style.prototype.styleNodes = function (rng, options) {
          rng = rng.splitText();
          var nodeName = (options && options.nodeName) || 'SPAN';
          var expandClosestSibling = !!(options && options.expandClosestSibling);
          var onlyPartialContains = !!(options && options.onlyPartialContains);
          if (rng.isCollapsed()) {
              return [rng.insertNode(dom.create(nodeName))];
          }
          var pred = dom.makePredByNodeName(nodeName);
          var nodes = rng.nodes(dom.isText, {
              fullyContains: true
          }).map(function (text) {
              return dom.singleChildAncestor(text, pred) || dom.wrap(text, nodeName);
          });
          if (expandClosestSibling) {
              if (onlyPartialContains) {
                  var nodesInRange_1 = rng.nodes();
                  // compose with partial contains predication
                  pred = func.and(pred, function (node) {
                      return lists.contains(nodesInRange_1, node);
                  });
              }
              return nodes.map(function (node) {
                  var siblings = dom.withClosestSiblings(node, pred);
                  var head = lists.head(siblings);
                  var tails = lists.tail(siblings);
                  $$1.each(tails, function (idx, elem) {
                      dom.appendChildNodes(head, elem.childNodes);
                      dom.remove(elem);
                  });
                  return lists.head(siblings);
              });
          }
          else {
              return nodes;
          }
      };
      /**
       * get current style on cursor
       *
       * @param {WrappedRange} rng
       * @return {Object} - object contains style properties.
       */
      Style.prototype.current = function (rng) {
          var $cont = $$1(!dom.isElement(rng.sc) ? rng.sc.parentNode : rng.sc);
          var styleInfo = this.fromNode($cont);
          // document.queryCommandState for toggle state
          // [workaround] prevent Firefox nsresult: "0x80004005 (NS_ERROR_FAILURE)"
          try {
              styleInfo = $$1.extend(styleInfo, {
                  'font-bold': document.queryCommandState('bold') ? 'bold' : 'normal',
                  'font-italic': document.queryCommandState('italic') ? 'italic' : 'normal',
                  'font-underline': document.queryCommandState('underline') ? 'underline' : 'normal',
                  'font-subscript': document.queryCommandState('subscript') ? 'subscript' : 'normal',
                  'font-superscript': document.queryCommandState('superscript') ? 'superscript' : 'normal',
                  'font-strikethrough': document.queryCommandState('strikethrough') ? 'strikethrough' : 'normal',
                  'font-family': document.queryCommandValue('fontname') || styleInfo['font-family']
              });
          }
          catch (e) { }
          // list-style-type to list-style(unordered, ordered)
          if (!rng.isOnList()) {
              styleInfo['list-style'] = 'none';
          }
          else {
              var orderedTypes = ['circle', 'disc', 'disc-leading-zero', 'square'];
              var isUnordered = orderedTypes.indexOf(styleInfo['list-style-type']) > -1;
              styleInfo['list-style'] = isUnordered ? 'unordered' : 'ordered';
          }
          var para = dom.ancestor(rng.sc, dom.isPara);
          if (para && para.style['line-height']) {
              styleInfo['line-height'] = para.style.lineHeight;
          }
          else {
              var lineHeight = parseInt(styleInfo['line-height'], 10) / parseInt(styleInfo['font-size'], 10);
              styleInfo['line-height'] = lineHeight.toFixed(1);
          }
          styleInfo.anchor = rng.isOnAnchor() && dom.ancestor(rng.sc, dom.isAnchor);
          styleInfo.ancestors = dom.listAncestor(rng.sc, dom.isEditable);
          styleInfo.range = rng;
          return styleInfo;
      };
      return Style;
  }());

  var Bullet = /** @class */ (function () {
      function Bullet() {
      }
      /**
       * toggle ordered list
       */
      Bullet.prototype.insertOrderedList = function (editable) {
          this.toggleList('OL', editable);
      };
      /**
       * toggle unordered list
       */
      Bullet.prototype.insertUnorderedList = function (editable) {
          this.toggleList('UL', editable);
      };
      /**
       * indent
       */
      Bullet.prototype.indent = function (editable) {
          var _this = this;
          var rng = range.create(editable).wrapBodyInlineWithPara();
          var paras = rng.nodes(dom.isPara, { includeAncestor: true });
          var clustereds = lists.clusterBy(paras, func.peq2('parentNode'));
          $$1.each(clustereds, function (idx, paras) {
              var head = lists.head(paras);
              if (dom.isLi(head)) {
                  var previousList_1 = _this.findList(head.previousSibling);
                  if (previousList_1) {
                      paras
                          .map(function (para) { return previousList_1.appendChild(para); });
                  }
                  else {
                      _this.wrapList(paras, head.parentNode.nodeName);
                      paras
                          .map(function (para) { return para.parentNode; })
                          .map(function (para) { return _this.appendToPrevious(para); });
                  }
              }
              else {
                  $$1.each(paras, function (idx, para) {
                      $$1(para).css('marginLeft', function (idx, val) {
                          return (parseInt(val, 10) || 0) + 25;
                      });
                  });
              }
          });
          rng.select();
      };
      /**
       * outdent
       */
      Bullet.prototype.outdent = function (editable) {
          var _this = this;
          var rng = range.create(editable).wrapBodyInlineWithPara();
          var paras = rng.nodes(dom.isPara, { includeAncestor: true });
          var clustereds = lists.clusterBy(paras, func.peq2('parentNode'));
          $$1.each(clustereds, function (idx, paras) {
              var head = lists.head(paras);
              if (dom.isLi(head)) {
                  _this.releaseList([paras]);
              }
              else {
                  $$1.each(paras, function (idx, para) {
                      $$1(para).css('marginLeft', function (idx, val) {
                          val = (parseInt(val, 10) || 0);
                          return val > 25 ? val - 25 : '';
                      });
                  });
              }
          });
          rng.select();
      };
      /**
       * toggle list
       *
       * @param {String} listName - OL or UL
       */
      Bullet.prototype.toggleList = function (listName, editable) {
          var _this = this;
          var rng = range.create(editable).wrapBodyInlineWithPara();
          var paras = rng.nodes(dom.isPara, { includeAncestor: true });
          var bookmark = rng.paraBookmark(paras);
          var clustereds = lists.clusterBy(paras, func.peq2('parentNode'));
          // paragraph to list
          if (lists.find(paras, dom.isPurePara)) {
              var wrappedParas_1 = [];
              $$1.each(clustereds, function (idx, paras) {
                  wrappedParas_1 = wrappedParas_1.concat(_this.wrapList(paras, listName));
              });
              paras = wrappedParas_1;
              // list to paragraph or change list style
          }
          else {
              var diffLists = rng.nodes(dom.isList, {
                  includeAncestor: true
              }).filter(function (listNode) {
                  return !$$1.nodeName(listNode, listName);
              });
              if (diffLists.length) {
                  $$1.each(diffLists, function (idx, listNode) {
                      dom.replace(listNode, listName);
                  });
              }
              else {
                  paras = this.releaseList(clustereds, true);
              }
          }
          range.createFromParaBookmark(bookmark, paras).select();
      };
      /**
       * @param {Node[]} paras
       * @param {String} listName
       * @return {Node[]}
       */
      Bullet.prototype.wrapList = function (paras, listName) {
          var head = lists.head(paras);
          var last = lists.last(paras);
          var prevList = dom.isList(head.previousSibling) && head.previousSibling;
          var nextList = dom.isList(last.nextSibling) && last.nextSibling;
          var listNode = prevList || dom.insertAfter(dom.create(listName || 'UL'), last);
          // P to LI
          paras = paras.map(function (para) {
              return dom.isPurePara(para) ? dom.replace(para, 'LI') : para;
          });
          // append to list(<ul>, <ol>)
          dom.appendChildNodes(listNode, paras);
          if (nextList) {
              dom.appendChildNodes(listNode, lists.from(nextList.childNodes));
              dom.remove(nextList);
          }
          return paras;
      };
      /**
       * @method releaseList
       *
       * @param {Array[]} clustereds
       * @param {Boolean} isEscapseToBody
       * @return {Node[]}
       */
      Bullet.prototype.releaseList = function (clustereds, isEscapseToBody) {
          var _this = this;
          var releasedParas = [];
          $$1.each(clustereds, function (idx, paras) {
              var head = lists.head(paras);
              var last = lists.last(paras);
              var headList = isEscapseToBody ? dom.lastAncestor(head, dom.isList) : head.parentNode;
              var parentItem = headList.parentNode;
              if (headList.parentNode.nodeName === 'LI') {
                  paras.map(function (para) {
                      var newList = _this.findNextSiblings(para);
                      if (parentItem.nextSibling) {
                          parentItem.parentNode.insertBefore(para, parentItem.nextSibling);
                      }
                      else {
                          parentItem.parentNode.appendChild(para);
                      }
                      if (newList.length) {
                          _this.wrapList(newList, headList.nodeName);
                          para.appendChild(newList[0].parentNode);
                      }
                  });
                  if (headList.children.length === 0) {
                      parentItem.removeChild(headList);
                  }
                  if (parentItem.childNodes.length === 0) {
                      parentItem.parentNode.removeChild(parentItem);
                  }
              }
              else {
                  var lastList = headList.childNodes.length > 1 ? dom.splitTree(headList, {
                      node: last.parentNode,
                      offset: dom.position(last) + 1
                  }, {
                      isSkipPaddingBlankHTML: true
                  }) : null;
                  var middleList = dom.splitTree(headList, {
                      node: head.parentNode,
                      offset: dom.position(head)
                  }, {
                      isSkipPaddingBlankHTML: true
                  });
                  paras = isEscapseToBody ? dom.listDescendant(middleList, dom.isLi)
                      : lists.from(middleList.childNodes).filter(dom.isLi);
                  // LI to P
                  if (isEscapseToBody || !dom.isList(headList.parentNode)) {
                      paras = paras.map(function (para) {
                          return dom.replace(para, 'P');
                      });
                  }
                  $$1.each(lists.from(paras).reverse(), function (idx, para) {
                      dom.insertAfter(para, headList);
                  });
                  // remove empty lists
                  var rootLists = lists.compact([headList, middleList, lastList]);
                  $$1.each(rootLists, function (idx, rootList) {
                      var listNodes = [rootList].concat(dom.listDescendant(rootList, dom.isList));
                      $$1.each(listNodes.reverse(), function (idx, listNode) {
                          if (!dom.nodeLength(listNode)) {
                              dom.remove(listNode, true);
                          }
                      });
                  });
              }
              releasedParas = releasedParas.concat(paras);
          });
          return releasedParas;
      };
      /**
       * @method appendToPrevious
       *
       * Appends list to previous list item, if
       * none exist it wraps the list in a new list item.
       *
       * @param {HTMLNode} ListItem
       * @return {HTMLNode}
       */
      Bullet.prototype.appendToPrevious = function (node) {
          return node.previousSibling
              ? dom.appendChildNodes(node.previousSibling, [node])
              : this.wrapList([node], 'LI');
      };
      /**
       * @method findList
       *
       * Finds an existing list in list item
       *
       * @param {HTMLNode} ListItem
       * @return {Array[]}
       */
      Bullet.prototype.findList = function (node) {
          return node
              ? lists.find(node.children, function (child) { return ['OL', 'UL'].indexOf(child.nodeName) > -1; })
              : null;
      };
      /**
       * @method findNextSiblings
       *
       * Finds all list item siblings that follow it
       *
       * @param {HTMLNode} ListItem
       * @return {HTMLNode}
       */
      Bullet.prototype.findNextSiblings = function (node) {
          var siblings = [];
          while (node.nextSibling) {
              siblings.push(node.nextSibling);
              node = node.nextSibling;
          }
          return siblings;
      };
      return Bullet;
  }());

  /**
   * @class editing.Typing
   *
   * Typing
   *
   */
  var Typing = /** @class */ (function () {
      function Typing(context) {
          // a Bullet instance to toggle lists off
          this.bullet = new Bullet();
          this.options = context.options;
      }
      /**
       * insert tab
       *
       * @param {WrappedRange} rng
       * @param {Number} tabsize
       */
      Typing.prototype.insertTab = function (rng, tabsize) {
          var tab = dom.createText(new Array(tabsize + 1).join(dom.NBSP_CHAR));
          rng = rng.deleteContents();
          rng.insertNode(tab, true);
          rng = range.create(tab, tabsize);
          rng.select();
      };
      /**
       * insert paragraph
       *
       * @param {jQuery} $editable
       * @param {WrappedRange} rng Can be used in unit tests to "mock" the range
       *
       * blockquoteBreakingLevel
       *   0 - No break, the new paragraph remains inside the quote
       *   1 - Break the first blockquote in the ancestors list
       *   2 - Break all blockquotes, so that the new paragraph is not quoted (this is the default)
       */
      Typing.prototype.insertParagraph = function (editable, rng) {
          rng = rng || range.create(editable);
          // deleteContents on range.
          rng = rng.deleteContents();
          // Wrap range if it needs to be wrapped by paragraph
          rng = rng.wrapBodyInlineWithPara();
          // finding paragraph
          var splitRoot = dom.ancestor(rng.sc, dom.isPara);
          var nextPara;
          // on paragraph: split paragraph
          if (splitRoot) {
              // if it is an empty line with li
              if (dom.isEmpty(splitRoot) && dom.isLi(splitRoot)) {
                  // toogle UL/OL and escape
                  this.bullet.toggleList(splitRoot.parentNode.nodeName);
                  return;
              }
              else {
                  var blockquote = null;
                  if (this.options.blockquoteBreakingLevel === 1) {
                      blockquote = dom.ancestor(splitRoot, dom.isBlockquote);
                  }
                  else if (this.options.blockquoteBreakingLevel === 2) {
                      blockquote = dom.lastAncestor(splitRoot, dom.isBlockquote);
                  }
                  if (blockquote) {
                      // We're inside a blockquote and options ask us to break it
                      nextPara = $$1(dom.emptyPara)[0];
                      // If the split is right before a <br>, remove it so that there's no "empty line"
                      // after the split in the new blockquote created
                      if (dom.isRightEdgePoint(rng.getStartPoint()) && dom.isBR(rng.sc.nextSibling)) {
                          $$1(rng.sc.nextSibling).remove();
                      }
                      var split = dom.splitTree(blockquote, rng.getStartPoint(), { isDiscardEmptySplits: true });
                      if (split) {
                          split.parentNode.insertBefore(nextPara, split);
                      }
                      else {
                          dom.insertAfter(nextPara, blockquote); // There's no split if we were at the end of the blockquote
                      }
                  }
                  else {
                      nextPara = dom.splitTree(splitRoot, rng.getStartPoint());
                      // not a blockquote, just insert the paragraph
                      var emptyAnchors = dom.listDescendant(splitRoot, dom.isEmptyAnchor);
                      emptyAnchors = emptyAnchors.concat(dom.listDescendant(nextPara, dom.isEmptyAnchor));
                      $$1.each(emptyAnchors, function (idx, anchor) {
                          dom.remove(anchor);
                      });
                      // replace empty heading, pre or custom-made styleTag with P tag
                      if ((dom.isHeading(nextPara) || dom.isPre(nextPara) || dom.isCustomStyleTag(nextPara)) && dom.isEmpty(nextPara)) {
                          nextPara = dom.replace(nextPara, 'p');
                      }
                  }
              }
              // no paragraph: insert empty paragraph
          }
          else {
              var next = rng.sc.childNodes[rng.so];
              nextPara = $$1(dom.emptyPara)[0];
              if (next) {
                  rng.sc.insertBefore(nextPara, next);
              }
              else {
                  rng.sc.appendChild(nextPara);
              }
          }
          range.create(nextPara, 0).normalize().select().scrollIntoView(editable);
      };
      return Typing;
  }());

  /**
   * @class Create a virtual table to create what actions to do in change.
   * @param {object} startPoint Cell selected to apply change.
   * @param {enum} where  Where change will be applied Row or Col. Use enum: TableResultAction.where
   * @param {enum} action Action to be applied. Use enum: TableResultAction.requestAction
   * @param {object} domTable Dom element of table to make changes.
   */
  var TableResultAction = function (startPoint, where, action, domTable) {
      var _startPoint = { 'colPos': 0, 'rowPos': 0 };
      var _virtualTable = [];
      var _actionCellList = [];
      /// ///////////////////////////////////////////
      // Private functions
      /// ///////////////////////////////////////////
      /**
       * Set the startPoint of action.
       */
      function setStartPoint() {
          if (!startPoint || !startPoint.tagName || (startPoint.tagName.toLowerCase() !== 'td' && startPoint.tagName.toLowerCase() !== 'th')) {
              console.error('Impossible to identify start Cell point.', startPoint);
              return;
          }
          _startPoint.colPos = startPoint.cellIndex;
          if (!startPoint.parentElement || !startPoint.parentElement.tagName || startPoint.parentElement.tagName.toLowerCase() !== 'tr') {
              console.error('Impossible to identify start Row point.', startPoint);
              return;
          }
          _startPoint.rowPos = startPoint.parentElement.rowIndex;
      }
      /**
       * Define virtual table position info object.
       *
       * @param {int} rowIndex Index position in line of virtual table.
       * @param {int} cellIndex Index position in column of virtual table.
       * @param {object} baseRow Row affected by this position.
       * @param {object} baseCell Cell affected by this position.
       * @param {bool} isSpan Inform if it is an span cell/row.
       */
      function setVirtualTablePosition(rowIndex, cellIndex, baseRow, baseCell, isRowSpan, isColSpan, isVirtualCell) {
          var objPosition = {
              'baseRow': baseRow,
              'baseCell': baseCell,
              'isRowSpan': isRowSpan,
              'isColSpan': isColSpan,
              'isVirtual': isVirtualCell
          };
          if (!_virtualTable[rowIndex]) {
              _virtualTable[rowIndex] = [];
          }
          _virtualTable[rowIndex][cellIndex] = objPosition;
      }
      /**
       * Create action cell object.
       *
       * @param {object} virtualTableCellObj Object of specific position on virtual table.
       * @param {enum} resultAction Action to be applied in that item.
       */
      function getActionCell(virtualTableCellObj, resultAction, virtualRowPosition, virtualColPosition) {
          return {
              'baseCell': virtualTableCellObj.baseCell,
              'action': resultAction,
              'virtualTable': {
                  'rowIndex': virtualRowPosition,
                  'cellIndex': virtualColPosition
              }
          };
      }
      /**
       * Recover free index of row to append Cell.
       *
       * @param {int} rowIndex Index of row to find free space.
       * @param {int} cellIndex Index of cell to find free space in table.
       */
      function recoverCellIndex(rowIndex, cellIndex) {
          if (!_virtualTable[rowIndex]) {
              return cellIndex;
          }
          if (!_virtualTable[rowIndex][cellIndex]) {
              return cellIndex;
          }
          var newCellIndex = cellIndex;
          while (_virtualTable[rowIndex][newCellIndex]) {
              newCellIndex++;
              if (!_virtualTable[rowIndex][newCellIndex]) {
                  return newCellIndex;
              }
          }
      }
      /**
       * Recover info about row and cell and add information to virtual table.
       *
       * @param {object} row Row to recover information.
       * @param {object} cell Cell to recover information.
       */
      function addCellInfoToVirtual(row, cell) {
          var cellIndex = recoverCellIndex(row.rowIndex, cell.cellIndex);
          var cellHasColspan = (cell.colSpan > 1);
          var cellHasRowspan = (cell.rowSpan > 1);
          var isThisSelectedCell = (row.rowIndex === _startPoint.rowPos && cell.cellIndex === _startPoint.colPos);
          setVirtualTablePosition(row.rowIndex, cellIndex, row, cell, cellHasRowspan, cellHasColspan, false);
          // Add span rows to virtual Table.
          var rowspanNumber = cell.attributes.rowSpan ? parseInt(cell.attributes.rowSpan.value, 10) : 0;
          if (rowspanNumber > 1) {
              for (var rp = 1; rp < rowspanNumber; rp++) {
                  var rowspanIndex = row.rowIndex + rp;
                  adjustStartPoint(rowspanIndex, cellIndex, cell, isThisSelectedCell);
                  setVirtualTablePosition(rowspanIndex, cellIndex, row, cell, true, cellHasColspan, true);
              }
          }
          // Add span cols to virtual table.
          var colspanNumber = cell.attributes.colSpan ? parseInt(cell.attributes.colSpan.value, 10) : 0;
          if (colspanNumber > 1) {
              for (var cp = 1; cp < colspanNumber; cp++) {
                  var cellspanIndex = recoverCellIndex(row.rowIndex, (cellIndex + cp));
                  adjustStartPoint(row.rowIndex, cellspanIndex, cell, isThisSelectedCell);
                  setVirtualTablePosition(row.rowIndex, cellspanIndex, row, cell, cellHasRowspan, true, true);
              }
          }
      }
      /**
       * Process validation and adjust of start point if needed
       *
       * @param {int} rowIndex
       * @param {int} cellIndex
       * @param {object} cell
       * @param {bool} isSelectedCell
       */
      function adjustStartPoint(rowIndex, cellIndex, cell, isSelectedCell) {
          if (rowIndex === _startPoint.rowPos && _startPoint.colPos >= cell.cellIndex && cell.cellIndex <= cellIndex && !isSelectedCell) {
              _startPoint.colPos++;
          }
      }
      /**
       * Create virtual table of cells with all cells, including span cells.
       */
      function createVirtualTable() {
          var rows = domTable.rows;
          for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
              var cells = rows[rowIndex].cells;
              for (var cellIndex = 0; cellIndex < cells.length; cellIndex++) {
                  addCellInfoToVirtual(rows[rowIndex], cells[cellIndex]);
              }
          }
      }
      /**
       * Get action to be applied on the cell.
       *
       * @param {object} cell virtual table cell to apply action
       */
      function getDeleteResultActionToCell(cell) {
          switch (where) {
              case TableResultAction.where.Column:
                  if (cell.isColSpan) {
                      return TableResultAction.resultAction.SubtractSpanCount;
                  }
                  break;
              case TableResultAction.where.Row:
                  if (!cell.isVirtual && cell.isRowSpan) {
                      return TableResultAction.resultAction.AddCell;
                  }
                  else if (cell.isRowSpan) {
                      return TableResultAction.resultAction.SubtractSpanCount;
                  }
                  break;
          }
          return TableResultAction.resultAction.RemoveCell;
      }
      /**
       * Get action to be applied on the cell.
       *
       * @param {object} cell virtual table cell to apply action
       */
      function getAddResultActionToCell(cell) {
          switch (where) {
              case TableResultAction.where.Column:
                  if (cell.isColSpan) {
                      return TableResultAction.resultAction.SumSpanCount;
                  }
                  else if (cell.isRowSpan && cell.isVirtual) {
                      return TableResultAction.resultAction.Ignore;
                  }
                  break;
              case TableResultAction.where.Row:
                  if (cell.isRowSpan) {
                      return TableResultAction.resultAction.SumSpanCount;
                  }
                  else if (cell.isColSpan && cell.isVirtual) {
                      return TableResultAction.resultAction.Ignore;
                  }
                  break;
          }
          return TableResultAction.resultAction.AddCell;
      }
      function init() {
          setStartPoint();
          createVirtualTable();
      }
      /// ///////////////////////////////////////////
      // Public functions
      /// ///////////////////////////////////////////
      /**
       * Recover array os what to do in table.
       */
      this.getActionList = function () {
          var fixedRow = (where === TableResultAction.where.Row) ? _startPoint.rowPos : -1;
          var fixedCol = (where === TableResultAction.where.Column) ? _startPoint.colPos : -1;
          var actualPosition = 0;
          var canContinue = true;
          while (canContinue) {
              var rowPosition = (fixedRow >= 0) ? fixedRow : actualPosition;
              var colPosition = (fixedCol >= 0) ? fixedCol : actualPosition;
              var row = _virtualTable[rowPosition];
              if (!row) {
                  canContinue = false;
                  return _actionCellList;
              }
              var cell = row[colPosition];
              if (!cell) {
                  canContinue = false;
                  return _actionCellList;
              }
              // Define action to be applied in this cell
              var resultAction = TableResultAction.resultAction.Ignore;
              switch (action) {
                  case TableResultAction.requestAction.Add:
                      resultAction = getAddResultActionToCell(cell);
                      break;
                  case TableResultAction.requestAction.Delete:
                      resultAction = getDeleteResultActionToCell(cell);
                      break;
              }
              _actionCellList.push(getActionCell(cell, resultAction, rowPosition, colPosition));
              actualPosition++;
          }
          return _actionCellList;
      };
      init();
  };
  /**
  *
  * Where action occours enum.
  */
  TableResultAction.where = { 'Row': 0, 'Column': 1 };
  /**
  *
  * Requested action to apply enum.
  */
  TableResultAction.requestAction = { 'Add': 0, 'Delete': 1 };
  /**
  *
  * Result action to be executed enum.
  */
  TableResultAction.resultAction = { 'Ignore': 0, 'SubtractSpanCount': 1, 'RemoveCell': 2, 'AddCell': 3, 'SumSpanCount': 4 };
  /**
   *
   * @class editing.Table
   *
   * Table
   *
   */
  var Table = /** @class */ (function () {
      function Table() {
      }
      /**
       * handle tab key
       *
       * @param {WrappedRange} rng
       * @param {Boolean} isShift
       */
      Table.prototype.tab = function (rng, isShift) {
          var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
          var table = dom.ancestor(cell, dom.isTable);
          var cells = dom.listDescendant(table, dom.isCell);
          var nextCell = lists[isShift ? 'prev' : 'next'](cells, cell);
          if (nextCell) {
              range.create(nextCell, 0).select();
          }
      };
      /**
       * Add a new row
       *
       * @param {WrappedRange} rng
       * @param {String} position (top/bottom)
       * @return {Node}
       */
      Table.prototype.addRow = function (rng, position) {
          var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
          var currentTr = $$1(cell).closest('tr');
          var trAttributes = this.recoverAttributes(currentTr);
          var html = $$1('<tr' + trAttributes + '></tr>');
          var vTable = new TableResultAction(cell, TableResultAction.where.Row, TableResultAction.requestAction.Add, $$1(currentTr).closest('table')[0]);
          var actions = vTable.getActionList();
          for (var idCell = 0; idCell < actions.length; idCell++) {
              var currentCell = actions[idCell];
              var tdAttributes = this.recoverAttributes(currentCell.baseCell);
              switch (currentCell.action) {
                  case TableResultAction.resultAction.AddCell:
                      html.append('<td' + tdAttributes + '>' + dom.blank + '</td>');
                      break;
                  case TableResultAction.resultAction.SumSpanCount:
                      if (position === 'top') {
                          var baseCellTr = currentCell.baseCell.parent;
                          var isTopFromRowSpan = (!baseCellTr ? 0 : currentCell.baseCell.closest('tr').rowIndex) <= currentTr[0].rowIndex;
                          if (isTopFromRowSpan) {
                              var newTd = $$1('<div></div>').append($$1('<td' + tdAttributes + '>' + dom.blank + '</td>').removeAttr('rowspan')).html();
                              html.append(newTd);
                              break;
                          }
                      }
                      var rowspanNumber = parseInt(currentCell.baseCell.rowSpan, 10);
                      rowspanNumber++;
                      currentCell.baseCell.setAttribute('rowSpan', rowspanNumber);
                      break;
              }
          }
          if (position === 'top') {
              currentTr.before(html);
          }
          else {
              var cellHasRowspan = (cell.rowSpan > 1);
              if (cellHasRowspan) {
                  var lastTrIndex = currentTr[0].rowIndex + (cell.rowSpan - 2);
                  $$1($$1(currentTr).parent().find('tr')[lastTrIndex]).after($$1(html));
                  return;
              }
              currentTr.after(html);
          }
      };
      /**
       * Add a new col
       *
       * @param {WrappedRange} rng
       * @param {String} position (left/right)
       * @return {Node}
       */
      Table.prototype.addCol = function (rng, position) {
          var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
          var row = $$1(cell).closest('tr');
          var rowsGroup = $$1(row).siblings();
          rowsGroup.push(row);
          var vTable = new TableResultAction(cell, TableResultAction.where.Column, TableResultAction.requestAction.Add, $$1(row).closest('table')[0]);
          var actions = vTable.getActionList();
          for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) {
              var currentCell = actions[actionIndex];
              var tdAttributes = this.recoverAttributes(currentCell.baseCell);
              switch (currentCell.action) {
                  case TableResultAction.resultAction.AddCell:
                      if (position === 'right') {
                          $$1(currentCell.baseCell).after('<td' + tdAttributes + '>' + dom.blank + '</td>');
                      }
                      else {
                          $$1(currentCell.baseCell).before('<td' + tdAttributes + '>' + dom.blank + '</td>');
                      }
                      break;
                  case TableResultAction.resultAction.SumSpanCount:
                      if (position === 'right') {
                          var colspanNumber = parseInt(currentCell.baseCell.colSpan, 10);
                          colspanNumber++;
                          currentCell.baseCell.setAttribute('colSpan', colspanNumber);
                      }
                      else {
                          $$1(currentCell.baseCell).before('<td' + tdAttributes + '>' + dom.blank + '</td>');
                      }
                      break;
              }
          }
      };
      /*
      * Copy attributes from element.
      *
      * @param {object} Element to recover attributes.
      * @return {string} Copied string elements.
      */
      Table.prototype.recoverAttributes = function (el) {
          var resultStr = '';
          if (!el) {
              return resultStr;
          }
          var attrList = el.attributes || [];
          for (var i = 0; i < attrList.length; i++) {
              if (attrList[i].name.toLowerCase() === 'id') {
                  continue;
              }
              if (attrList[i].specified) {
                  resultStr += ' ' + attrList[i].name + '=\'' + attrList[i].value + '\'';
              }
          }
          return resultStr;
      };
      /**
       * Delete current row
       *
       * @param {WrappedRange} rng
       * @return {Node}
       */
      Table.prototype.deleteRow = function (rng) {
          var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
          var row = $$1(cell).closest('tr');
          var cellPos = row.children('td, th').index($$1(cell));
          var rowPos = row[0].rowIndex;
          var vTable = new TableResultAction(cell, TableResultAction.where.Row, TableResultAction.requestAction.Delete, $$1(row).closest('table')[0]);
          var actions = vTable.getActionList();
          for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) {
              if (!actions[actionIndex]) {
                  continue;
              }
              var baseCell = actions[actionIndex].baseCell;
              var virtualPosition = actions[actionIndex].virtualTable;
              var hasRowspan = (baseCell.rowSpan && baseCell.rowSpan > 1);
              var rowspanNumber = (hasRowspan) ? parseInt(baseCell.rowSpan, 10) : 0;
              switch (actions[actionIndex].action) {
                  case TableResultAction.resultAction.Ignore:
                      continue;
                  case TableResultAction.resultAction.AddCell:
                      var nextRow = row.next('tr')[0];
                      if (!nextRow) {
                          continue;
                      }
                      var cloneRow = row[0].cells[cellPos];
                      if (hasRowspan) {
                          if (rowspanNumber > 2) {
                              rowspanNumber--;
                              nextRow.insertBefore(cloneRow, nextRow.cells[cellPos]);
                              nextRow.cells[cellPos].setAttribute('rowSpan', rowspanNumber);
                              nextRow.cells[cellPos].innerHTML = '';
                          }
                          else if (rowspanNumber === 2) {
                              nextRow.insertBefore(cloneRow, nextRow.cells[cellPos]);
                              nextRow.cells[cellPos].removeAttribute('rowSpan');
                              nextRow.cells[cellPos].innerHTML = '';
                          }
                      }
                      continue;
                  case TableResultAction.resultAction.SubtractSpanCount:
                      if (hasRowspan) {
                          if (rowspanNumber > 2) {
                              rowspanNumber--;
                              baseCell.setAttribute('rowSpan', rowspanNumber);
                              if (virtualPosition.rowIndex !== rowPos && baseCell.cellIndex === cellPos) {
                                  baseCell.innerHTML = '';
                              }
                          }
                          else if (rowspanNumber === 2) {
                              baseCell.removeAttribute('rowSpan');
                              if (virtualPosition.rowIndex !== rowPos && baseCell.cellIndex === cellPos) {
                                  baseCell.innerHTML = '';
                              }
                          }
                      }
                      continue;
                  case TableResultAction.resultAction.RemoveCell:
                      // Do not need remove cell because row will be deleted.
                      continue;
              }
          }
          row.remove();
      };
      /**
       * Delete current col
       *
       * @param {WrappedRange} rng
       * @return {Node}
       */
      Table.prototype.deleteCol = function (rng) {
          var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
          var row = $$1(cell).closest('tr');
          var cellPos = row.children('td, th').index($$1(cell));
          var vTable = new TableResultAction(cell, TableResultAction.where.Column, TableResultAction.requestAction.Delete, $$1(row).closest('table')[0]);
          var actions = vTable.getActionList();
          for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) {
              if (!actions[actionIndex]) {
                  continue;
              }
              switch (actions[actionIndex].action) {
                  case TableResultAction.resultAction.Ignore:
                      continue;
                  case TableResultAction.resultAction.SubtractSpanCount:
                      var baseCell = actions[actionIndex].baseCell;
                      var hasColspan = (baseCell.colSpan && baseCell.colSpan > 1);
                      if (hasColspan) {
                          var colspanNumber = (baseCell.colSpan) ? parseInt(baseCell.colSpan, 10) : 0;
                          if (colspanNumber > 2) {
                              colspanNumber--;
                              baseCell.setAttribute('colSpan', colspanNumber);
                              if (baseCell.cellIndex === cellPos) {
                                  baseCell.innerHTML = '';
                              }
                          }
                          else if (colspanNumber === 2) {
                              baseCell.removeAttribute('colSpan');
                              if (baseCell.cellIndex === cellPos) {
                                  baseCell.innerHTML = '';
                              }
                          }
                      }
                      continue;
                  case TableResultAction.resultAction.RemoveCell:
                      dom.remove(actions[actionIndex].baseCell, true);
                      continue;
              }
          }
      };
      /**
       * create empty table element
       *
       * @param {Number} rowCount
       * @param {Number} colCount
       * @return {Node}
       */
      Table.prototype.createTable = function (colCount, rowCount, options) {
          var tds = [];
          var tdHTML;
          for (var idxCol = 0; idxCol < colCount; idxCol++) {
              tds.push('<td>' + dom.blank + '</td>');
          }
          tdHTML = tds.join('');
          var trs = [];
          var trHTML;
          for (var idxRow = 0; idxRow < rowCount; idxRow++) {
              trs.push('<tr>' + tdHTML + '</tr>');
          }
          trHTML = trs.join('');
          var $table = $$1('<table>' + trHTML + '</table>');
          if (options && options.tableClassName) {
              $table.addClass(options.tableClassName);
          }
          return $table[0];
      };
      /**
       * Delete current table
       *
       * @param {WrappedRange} rng
       * @return {Node}
       */
      Table.prototype.deleteTable = function (rng) {
          var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
          $$1(cell).closest('table').remove();
      };
      return Table;
  }());

  var KEY_BOGUS = 'bogus';
  /**
   * @class Editor
   */
  var Editor = /** @class */ (function () {
      function Editor(context) {
          var _this = this;
          this.context = context;
          this.$note = context.layoutInfo.note;
          this.$editor = context.layoutInfo.editor;
          this.$editable = context.layoutInfo.editable;
          this.options = context.options;
          this.lang = this.options.langInfo;
          this.editable = this.$editable[0];
          this.lastRange = null;
          this.style = new Style();
          this.table = new Table();
          this.typing = new Typing(context);
          this.bullet = new Bullet();
          this.history = new History(this.$editable);
          this.context.memo('help.undo', this.lang.help.undo);
          this.context.memo('help.redo', this.lang.help.redo);
          this.context.memo('help.tab', this.lang.help.tab);
          this.context.memo('help.untab', this.lang.help.untab);
          this.context.memo('help.insertParagraph', this.lang.help.insertParagraph);
          this.context.memo('help.insertOrderedList', this.lang.help.insertOrderedList);
          this.context.memo('help.insertUnorderedList', this.lang.help.insertUnorderedList);
          this.context.memo('help.indent', this.lang.help.indent);
          this.context.memo('help.outdent', this.lang.help.outdent);
          this.context.memo('help.formatPara', this.lang.help.formatPara);
          this.context.memo('help.insertHorizontalRule', this.lang.help.insertHorizontalRule);
          this.context.memo('help.fontName', this.lang.help.fontName);
          // native commands(with execCommand), generate function for execCommand
          var commands = [
              'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript',
              'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',
              'formatBlock', 'removeFormat', 'backColor',
          ];
          for (var idx = 0, len = commands.length; idx < len; idx++) {
              this[commands[idx]] = (function (sCmd) {
                  return function (value) {
                      _this.beforeCommand();
                      document.execCommand(sCmd, false, value);
                      _this.afterCommand(true);
                  };
              })(commands[idx]);
              this.context.memo('help.' + commands[idx], this.lang.help[commands[idx]]);
          }
          this.fontName = this.wrapCommand(function (value) {
              return _this.fontStyling('font-family', "\'" + value + "\'");
          });
          this.fontSize = this.wrapCommand(function (value) {
              return _this.fontStyling('font-size', value + 'px');
          });
          for (var idx = 1; idx <= 6; idx++) {
              this['formatH' + idx] = (function (idx) {
                  return function () {
                      _this.formatBlock('H' + idx);
                  };
              })(idx);
              this.context.memo('help.formatH' + idx, this.lang.help['formatH' + idx]);
          }
          this.insertParagraph = this.wrapCommand(function () {
              _this.typing.insertParagraph(_this.editable);
          });
          this.insertOrderedList = this.wrapCommand(function () {
              _this.bullet.insertOrderedList(_this.editable);
          });
          this.insertUnorderedList = this.wrapCommand(function () {
              _this.bullet.insertUnorderedList(_this.editable);
          });
          this.indent = this.wrapCommand(function () {
              _this.bullet.indent(_this.editable);
          });
          this.outdent = this.wrapCommand(function () {
              _this.bullet.outdent(_this.editable);
          });
          /**
           * insertNode
           * insert node
           * @param {Node} node
           */
          this.insertNode = this.wrapCommand(function (node) {
              if (_this.isLimited($$1(node).text().length)) {
                  return;
              }
              var rng = _this.getLastRange();
              rng.insertNode(node);
              range.createFromNodeAfter(node).select();
              _this.setLastRange();
          });
          /**
           * insert text
           * @param {String} text
           */
          this.insertText = this.wrapCommand(function (text) {
              if (_this.isLimited(text.length)) {
                  return;
              }
              var rng = _this.getLastRange();
              var textNode = rng.insertNode(dom.createText(text));
              range.create(textNode, dom.nodeLength(textNode)).select();
              _this.setLastRange();
          });
          /**
           * paste HTML
           * @param {String} markup
           */
          this.pasteHTML = this.wrapCommand(function (markup) {
              if (_this.isLimited(markup.length)) {
                  return;
              }
              markup = _this.context.invoke('codeview.purify', markup);
              var contents = _this.getLastRange().pasteHTML(markup);
              range.createFromNodeAfter(lists.last(contents)).select();
              _this.setLastRange();
          });
          /**
           * formatBlock
           *
           * @param {String} tagName
           */
          this.formatBlock = this.wrapCommand(function (tagName, $target) {
              var onApplyCustomStyle = _this.options.callbacks.onApplyCustomStyle;
              if (onApplyCustomStyle) {
                  onApplyCustomStyle.call(_this, $target, _this.context, _this.onFormatBlock);
              }
              else {
                  _this.onFormatBlock(tagName, $target);
              }
          });
          /**
           * insert horizontal rule
           */
          this.insertHorizontalRule = this.wrapCommand(function () {
              var hrNode = _this.getLastRange().insertNode(dom.create('HR'));
              if (hrNode.nextSibling) {
                  range.create(hrNode.nextSibling, 0).normalize().select();
                  _this.setLastRange();
              }
          });
          /**
           * lineHeight
           * @param {String} value
           */
          this.lineHeight = this.wrapCommand(function (value) {
              _this.style.stylePara(_this.getLastRange(), {
                  lineHeight: value
              });
          });
          /**
           * create link (command)
           *
           * @param {Object} linkInfo
           */
          this.createLink = this.wrapCommand(function (linkInfo) {
              var linkUrl = linkInfo.url;
              var linkText = linkInfo.text;
              var isNewWindow = linkInfo.isNewWindow;
              var rng = linkInfo.range || _this.getLastRange();
              var additionalTextLength = linkText.length - rng.toString().length;
              if (additionalTextLength > 0 && _this.isLimited(additionalTextLength)) {
                  return;
              }
              var isTextChanged = rng.toString() !== linkText;
              // handle spaced urls from input
              if (typeof linkUrl === 'string') {
                  linkUrl = linkUrl.trim();
              }
              if (_this.options.onCreateLink) {
                  linkUrl = _this.options.onCreateLink(linkUrl);
              }
              else {
                  // if url doesn't have any protocol and not even a relative or a label, use http:// as default
                  linkUrl = /^([A-Za-z][A-Za-z0-9+-.]*\:|#|\/)/.test(linkUrl)
                      ? linkUrl : 'http://' + linkUrl;
              }
              var anchors = [];
              if (isTextChanged) {
                  rng = rng.deleteContents();
                  var anchor = rng.insertNode($$1('<A>' + linkText + '</A>')[0]);
                  anchors.push(anchor);
              }
              else {
                  anchors = _this.style.styleNodes(rng, {
                      nodeName: 'A',
                      expandClosestSibling: true,
                      onlyPartialContains: true
                  });
              }
              $$1.each(anchors, function (idx, anchor) {
                  $$1(anchor).attr('href', linkUrl);
                  if (isNewWindow) {
                      $$1(anchor).attr('target', '_blank');
                  }
                  else {
                      $$1(anchor).removeAttr('target');
                  }
              });
              var startRange = range.createFromNodeBefore(lists.head(anchors));
              var startPoint = startRange.getStartPoint();
              var endRange = range.createFromNodeAfter(lists.last(anchors));
              var endPoint = endRange.getEndPoint();
              range.create(startPoint.node, startPoint.offset, endPoint.node, endPoint.offset).select();
              _this.setLastRange();
          });
          /**
           * setting color
           *
           * @param {Object} sObjColor  color code
           * @param {String} sObjColor.foreColor foreground color
           * @param {String} sObjColor.backColor background color
           */
          this.color = this.wrapCommand(function (colorInfo) {
              var foreColor = colorInfo.foreColor;
              var backColor = colorInfo.backColor;
              if (foreColor) {
                  document.execCommand('foreColor', false, foreColor);
              }
              if (backColor) {
                  document.execCommand('backColor', false, backColor);
              }
          });
          /**
           * Set foreground color
           *
           * @param {String} colorCode foreground color code
           */
          this.foreColor = this.wrapCommand(function (colorInfo) {
              document.execCommand('styleWithCSS', false, true);
              document.execCommand('foreColor', false, colorInfo);
          });
          /**
           * insert Table
           *
           * @param {String} dimension of table (ex : "5x5")
           */
          this.insertTable = this.wrapCommand(function (dim) {
              var dimension = dim.split('x');
              var rng = _this.getLastRange().deleteContents();
              rng.insertNode(_this.table.createTable(dimension[0], dimension[1], _this.options));
          });
          /**
           * remove media object and Figure Elements if media object is img with Figure.
           */
          this.removeMedia = this.wrapCommand(function () {
              var $target = $$1(_this.restoreTarget()).parent();
              if ($target.parent('figure').length) {
                  $target.parent('figure').remove();
              }
              else {
                  $target = $$1(_this.restoreTarget()).detach();
              }
              _this.context.triggerEvent('media.delete', $target, _this.$editable);
          });
          /**
           * float me
           *
           * @param {String} value
           */
          this.floatMe = this.wrapCommand(function (value) {
              var $target = $$1(_this.restoreTarget());
              $target.toggleClass('note-float-left', value === 'left');
              $target.toggleClass('note-float-right', value === 'right');
              $target.css('float', (value === 'none' ? '' : value));
          });
          /**
           * resize overlay element
           * @param {String} value
           */
          this.resize = this.wrapCommand(function (value) {
              var $target = $$1(_this.restoreTarget());
              value = parseFloat(value);
              if (value === 0) {
                  $target.css('width', '');
              }
              else {
                  $target.css({
                      width: value * 100 + '%',
                      height: ''
                  });
              }
          });
      }
      Editor.prototype.initialize = function () {
          var _this = this;
          // bind custom events
          this.$editable.on('keydown', function (event) {
              if (event.keyCode === key.code.ENTER) {
                  _this.context.triggerEvent('enter', event);
              }
              _this.context.triggerEvent('keydown', event);
              if (!event.isDefaultPrevented()) {
                  if (_this.options.shortcuts) {
                      _this.handleKeyMap(event);
                  }
                  else {
                      _this.preventDefaultEditableShortCuts(event);
                  }
              }
              if (_this.isLimited(1, event)) {
                  return false;
              }
          }).on('keyup', function (event) {
              _this.setLastRange();
              _this.context.triggerEvent('keyup', event);
          }).on('focus', function (event) {
              _this.setLastRange();
              _this.context.triggerEvent('focus', event);
          }).on('blur', function (event) {
              _this.context.triggerEvent('blur', event);
          }).on('mousedown', function (event) {
              _this.context.triggerEvent('mousedown', event);
          }).on('mouseup', function (event) {
              _this.setLastRange();
              _this.context.triggerEvent('mouseup', event);
          }).on('scroll', function (event) {
              _this.context.triggerEvent('scroll', event);
          }).on('paste', function (event) {
              _this.setLastRange();
              _this.context.triggerEvent('paste', event);
          });
          this.$editable.attr('spellcheck', this.options.spellCheck);
          // init content before set event
          this.$editable.html(dom.html(this.$note) || dom.emptyPara);
          this.$editable.on(env.inputEventName, func.debounce(function () {
              _this.context.triggerEvent('change', _this.$editable.html(), _this.$editable);
          }, 10));
          this.$editor.on('focusin', function (event) {
              _this.context.triggerEvent('focusin', event);
          }).on('focusout', function (event) {
              _this.context.triggerEvent('focusout', event);
          });
          if (!this.options.airMode) {
              if (this.options.width) {
                  this.$editor.outerWidth(this.options.width);
              }
              if (this.options.height) {
                  this.$editable.outerHeight(this.options.height);
              }
              if (this.options.maxHeight) {
                  this.$editable.css('max-height', this.options.maxHeight);
              }
              if (this.options.minHeight) {
                  this.$editable.css('min-height', this.options.minHeight);
              }
          }
          this.history.recordUndo();
          this.setLastRange();
      };
      Editor.prototype.destroy = function () {
          this.$editable.off();
      };
      Editor.prototype.handleKeyMap = function (event) {
          var keyMap = this.options.keyMap[env.isMac ? 'mac' : 'pc'];
          var keys = [];
          if (event.metaKey) {
              keys.push('CMD');
          }
          if (event.ctrlKey && !event.altKey) {
              keys.push('CTRL');
          }
          if (event.shiftKey) {
              keys.push('SHIFT');
          }
          var keyName = key.nameFromCode[event.keyCode];
          if (keyName) {
              keys.push(keyName);
          }
          var eventName = keyMap[keys.join('+')];
          if (eventName) {
              if (this.context.invoke(eventName) !== false) {
                  event.preventDefault();
              }
          }
          else if (key.isEdit(event.keyCode)) {
              this.afterCommand();
          }
      };
      Editor.prototype.preventDefaultEditableShortCuts = function (event) {
          // B(Bold, 66) / I(Italic, 73) / U(Underline, 85)
          if ((event.ctrlKey || event.metaKey) &&
              lists.contains([66, 73, 85], event.keyCode)) {
              event.preventDefault();
          }
      };
      Editor.prototype.isLimited = function (pad, event) {
          pad = pad || 0;
          if (typeof event !== 'undefined') {
              if (key.isMove(event.keyCode) ||
                  (event.ctrlKey || event.metaKey) ||
                  lists.contains([key.code.BACKSPACE, key.code.DELETE], event.keyCode)) {
                  return false;
              }
          }
          if (this.options.maxTextLength > 0) {
              if ((this.$editable.text().length + pad) >= this.options.maxTextLength) {
                  return true;
              }
          }
          return false;
      };
      /**
       * create range
       * @return {WrappedRange}
       */
      Editor.prototype.createRange = function () {
          this.focus();
          this.setLastRange();
          return this.getLastRange();
      };
      Editor.prototype.setLastRange = function () {
          this.lastRange = range.create(this.editable);
      };
      Editor.prototype.getLastRange = function () {
          if (!this.lastRange) {
              this.setLastRange();
          }
          return this.lastRange;
      };
      /**
       * saveRange
       *
       * save current range
       *
       * @param {Boolean} [thenCollapse=false]
       */
      Editor.prototype.saveRange = function (thenCollapse) {
          if (thenCollapse) {
              this.getLastRange().collapse().select();
          }
      };
      /**
       * restoreRange
       *
       * restore lately range
       */
      Editor.prototype.restoreRange = function () {
          if (this.lastRange) {
              this.lastRange.select();
              this.focus();
          }
      };
      Editor.prototype.saveTarget = function (node) {
          this.$editable.data('target', node);
      };
      Editor.prototype.clearTarget = function () {
          this.$editable.removeData('target');
      };
      Editor.prototype.restoreTarget = function () {
          return this.$editable.data('target');
      };
      /**
       * currentStyle
       *
       * current style
       * @return {Object|Boolean} unfocus
       */
      Editor.prototype.currentStyle = function () {
          var rng = range.create();
          if (rng) {
              rng = rng.normalize();
          }
          return rng ? this.style.current(rng) : this.style.fromNode(this.$editable);
      };
      /**
       * style from node
       *
       * @param {jQuery} $node
       * @return {Object}
       */
      Editor.prototype.styleFromNode = function ($node) {
          return this.style.fromNode($node);
      };
      /**
       * undo
       */
      Editor.prototype.undo = function () {
          this.context.triggerEvent('before.command', this.$editable.html());
          this.history.undo();
          this.context.triggerEvent('change', this.$editable.html(), this.$editable);
      };
      /*
      * commit
      */
      Editor.prototype.commit = function () {
          this.context.triggerEvent('before.command', this.$editable.html());
          this.history.commit();
          this.context.triggerEvent('change', this.$editable.html(), this.$editable);
      };
      /**
       * redo
       */
      Editor.prototype.redo = function () {
          this.context.triggerEvent('before.command', this.$editable.html());
          this.history.redo();
          this.context.triggerEvent('change', this.$editable.html(), this.$editable);
      };
      /**
       * before command
       */
      Editor.prototype.beforeCommand = function () {
          this.context.triggerEvent('before.command', this.$editable.html());
          // keep focus on editable before command execution
          this.focus();
      };
      /**
       * after command
       * @param {Boolean} isPreventTrigger
       */
      Editor.prototype.afterCommand = function (isPreventTrigger) {
          this.normalizeContent();
          this.history.recordUndo();
          if (!isPreventTrigger) {
              this.context.triggerEvent('change', this.$editable.html(), this.$editable);
          }
      };
      /**
       * handle tab key
       */
      Editor.prototype.tab = function () {
          var rng = this.getLastRange();
          if (rng.isCollapsed() && rng.isOnCell()) {
              this.table.tab(rng);
          }
          else {
              if (this.options.tabSize === 0) {
                  return false;
              }
              if (!this.isLimited(this.options.tabSize)) {
                  this.beforeCommand();
                  this.typing.insertTab(rng, this.options.tabSize);
                  this.afterCommand();
              }
          }
      };
      /**
       * handle shift+tab key
       */
      Editor.prototype.untab = function () {
          var rng = this.getLastRange();
          if (rng.isCollapsed() && rng.isOnCell()) {
              this.table.tab(rng, true);
          }
          else {
              if (this.options.tabSize === 0) {
                  return false;
              }
          }
      };
      /**
       * run given function between beforeCommand and afterCommand
       */
      Editor.prototype.wrapCommand = function (fn) {
          return function () {
              this.beforeCommand();
              fn.apply(this, arguments);
              this.afterCommand();
          };
      };
      /**
       * insert image
       *
       * @param {String} src
       * @param {String|Function} param
       * @return {Promise}
       */
      Editor.prototype.insertImage = function (src, param) {
          var _this = this;
          return createImage(src, param).then(function ($image) {
              _this.beforeCommand();
              if (typeof param === 'function') {
                  param($image);
              }
              else {
                  if (typeof param === 'string') {
                      $image.attr('data-filename', param);
                  }
                  $image.css('width', Math.min(_this.$editable.width(), $image.width()));
              }
              $image.show();
              range.create(_this.editable).insertNode($image[0]);
              range.createFromNodeAfter($image[0]).select();
              _this.setLastRange();
              _this.afterCommand();
          }).fail(function (e) {
              _this.context.triggerEvent('image.upload.error', e);
          });
      };
      /**
       * insertImages
       * @param {File[]} files
       */
      Editor.prototype.insertImagesAsDataURL = function (files) {
          var _this = this;
          $$1.each(files, function (idx, file) {
              var filename = file.name;
              if (_this.options.maximumImageFileSize && _this.options.maximumImageFileSize < file.size) {
                  _this.context.triggerEvent('image.upload.error', _this.lang.image.maximumFileSizeError);
              }
              else {
                  readFileAsDataURL(file).then(function (dataURL) {
                      return _this.insertImage(dataURL, filename);
                  }).fail(function () {
                      _this.context.triggerEvent('image.upload.error');
                  });
              }
          });
      };
      /**
       * insertImagesOrCallback
       * @param {File[]} files
       */
      Editor.prototype.insertImagesOrCallback = function (files) {
          var callbacks = this.options.callbacks;
          // If onImageUpload set,
          if (callbacks.onImageUpload) {
              this.context.triggerEvent('image.upload', files);
              // else insert Image as dataURL
          }
          else {
              this.insertImagesAsDataURL(files);
          }
      };
      /**
       * return selected plain text
       * @return {String} text
       */
      Editor.prototype.getSelectedText = function () {
          var rng = this.getLastRange();
          // if range on anchor, expand range with anchor
          if (rng.isOnAnchor()) {
              rng = range.createFromNode(dom.ancestor(rng.sc, dom.isAnchor));
          }
          return rng.toString();
      };
      Editor.prototype.onFormatBlock = function (tagName, $target) {
          // [workaround] for MSIE, IE need `<`
          document.execCommand('FormatBlock', false, env.isMSIE ? '<' + tagName + '>' : tagName);
          // support custom class
          if ($target && $target.length) {
              // find the exact element has given tagName
              if ($target[0].tagName.toUpperCase() !== tagName.toUpperCase()) {
                  $target = $target.find(tagName);
              }
              if ($target && $target.length) {
                  var className = $target[0].className || '';
                  if (className) {
                      var currentRange = this.createRange();
                      var $parent = $$1([currentRange.sc, currentRange.ec]).closest(tagName);
                      $parent.addClass(className);
                  }
              }
          }
      };
      Editor.prototype.formatPara = function () {
          this.formatBlock('P');
      };
      Editor.prototype.fontStyling = function (target, value) {
          var rng = this.getLastRange();
          if (rng) {
              var spans = this.style.styleNodes(rng);
              $$1(spans).css(target, value);
              // [workaround] added styled bogus span for style
              //  - also bogus character needed for cursor position
              if (rng.isCollapsed()) {
                  var firstSpan = lists.head(spans);
                  if (firstSpan && !dom.nodeLength(firstSpan)) {
                      firstSpan.innerHTML = dom.ZERO_WIDTH_NBSP_CHAR;
                      range.createFromNodeAfter(firstSpan.firstChild).select();
                      this.setLastRange();
                      this.$editable.data(KEY_BOGUS, firstSpan);
                  }
              }
          }
      };
      /**
       * unlink
       *
       * @type command
       */
      Editor.prototype.unlink = function () {
          var rng = this.getLastRange();
          if (rng.isOnAnchor()) {
              var anchor = dom.ancestor(rng.sc, dom.isAnchor);
              rng = range.createFromNode(anchor);
              rng.select();
              this.setLastRange();
              this.beforeCommand();
              document.execCommand('unlink');
              this.afterCommand();
          }
      };
      /**
       * returns link info
       *
       * @return {Object}
       * @return {WrappedRange} return.range
       * @return {String} return.text
       * @return {Boolean} [return.isNewWindow=true]
       * @return {String} [return.url=""]
       */
      Editor.prototype.getLinkInfo = function () {
          var rng = this.getLastRange().expand(dom.isAnchor);
          // Get the first anchor on range(for edit).
          var $anchor = $$1(lists.head(rng.nodes(dom.isAnchor)));
          var linkInfo = {
              range: rng,
              text: rng.toString(),
              url: $anchor.length ? $anchor.attr('href') : ''
          };
          // When anchor exists,
          if ($anchor.length) {
              // Set isNewWindow by checking its target.
              linkInfo.isNewWindow = $anchor.attr('target') === '_blank';
          }
          return linkInfo;
      };
      Editor.prototype.addRow = function (position) {
          var rng = this.getLastRange(this.$editable);
          if (rng.isCollapsed() && rng.isOnCell()) {
              this.beforeCommand();
              this.table.addRow(rng, position);
              this.afterCommand();
          }
      };
      Editor.prototype.addCol = function (position) {
          var rng = this.getLastRange(this.$editable);
          if (rng.isCollapsed() && rng.isOnCell()) {
              this.beforeCommand();
              this.table.addCol(rng, position);
              this.afterCommand();
          }
      };
      Editor.prototype.deleteRow = function () {
          var rng = this.getLastRange(this.$editable);
          if (rng.isCollapsed() && rng.isOnCell()) {
              this.beforeCommand();
              this.table.deleteRow(rng);
              this.afterCommand();
          }
      };
      Editor.prototype.deleteCol = function () {
          var rng = this.getLastRange(this.$editable);
          if (rng.isCollapsed() && rng.isOnCell()) {
              this.beforeCommand();
              this.table.deleteCol(rng);
              this.afterCommand();
          }
      };
      Editor.prototype.deleteTable = function () {
          var rng = this.getLastRange(this.$editable);
          if (rng.isCollapsed() && rng.isOnCell()) {
              this.beforeCommand();
              this.table.deleteTable(rng);
              this.afterCommand();
          }
      };
      /**
       * @param {Position} pos
       * @param {jQuery} $target - target element
       * @param {Boolean} [bKeepRatio] - keep ratio
       */
      Editor.prototype.resizeTo = function (pos, $target, bKeepRatio) {
          var imageSize;
          if (bKeepRatio) {
              var newRatio = pos.y / pos.x;
              var ratio = $target.data('ratio');
              imageSize = {
                  width: ratio > newRatio ? pos.x : pos.y / ratio,
                  height: ratio > newRatio ? pos.x * ratio : pos.y
              };
          }
          else {
              imageSize = {
                  width: pos.x,
                  height: pos.y
              };
          }
          $target.css(imageSize);
      };
      /**
       * returns whether editable area has focus or not.
       */
      Editor.prototype.hasFocus = function () {
          return this.$editable.is(':focus');
      };
      /**
       * set focus
       */
      Editor.prototype.focus = function () {
          // [workaround] Screen will move when page is scolled in IE.
          //  - do focus when not focused
          if (!this.hasFocus()) {
              this.$editable.focus();
          }
      };
      /**
       * returns whether contents is empty or not.
       * @return {Boolean}
       */
      Editor.prototype.isEmpty = function () {
          return dom.isEmpty(this.$editable[0]) || dom.emptyPara === this.$editable.html();
      };
      /**
       * Removes all contents and restores the editable instance to an _emptyPara_.
       */
      Editor.prototype.empty = function () {
          this.context.invoke('code', dom.emptyPara);
      };
      /**
       * normalize content
       */
      Editor.prototype.normalizeContent = function () {
          this.$editable[0].normalize();
      };
      return Editor;
  }());

  var Clipboard = /** @class */ (function () {
      function Clipboard(context) {
          this.context = context;
          this.$editable = context.layoutInfo.editable;
      }
      Clipboard.prototype.initialize = function () {
          this.$editable.on('paste', this.pasteByEvent.bind(this));
      };
      /**
       * paste by clipboard event
       *
       * @param {Event} event
       */
      Clipboard.prototype.pasteByEvent = function (event) {
          var clipboardData = event.originalEvent.clipboardData;
          if (clipboardData && clipboardData.items && clipboardData.items.length) {
              // paste img file
              var item = clipboardData.items.length > 1 ? clipboardData.items[1] : lists.head(clipboardData.items);
              if (item.kind === 'file' && item.type.indexOf('image/') !== -1) {
                  this.context.invoke('editor.insertImagesOrCallback', [item.getAsFile()]);
              }
              this.context.invoke('editor.afterCommand');
          }
      };
      return Clipboard;
  }());

  var Dropzone = /** @class */ (function () {
      function Dropzone(context) {
          this.context = context;
          this.$eventListener = $$1(document);
          this.$editor = context.layoutInfo.editor;
          this.$editable = context.layoutInfo.editable;
          this.options = context.options;
          this.lang = this.options.langInfo;
          this.documentEventHandlers = {};
          this.$dropzone = $$1([
              '<div class="note-dropzone">',
              '  <div class="note-dropzone-message"/>',
              '</div>',
          ].join('')).prependTo(this.$editor);
      }
      /**
       * attach Drag and Drop Events
       */
      Dropzone.prototype.initialize = function () {
          if (this.options.disableDragAndDrop) {
              // prevent default drop event
              this.documentEventHandlers.onDrop = function (e) {
                  e.preventDefault();
              };
              // do not consider outside of dropzone
              this.$eventListener = this.$dropzone;
              this.$eventListener.on('drop', this.documentEventHandlers.onDrop);
          }
          else {
              this.attachDragAndDropEvent();
          }
      };
      /**
       * attach Drag and Drop Events
       */
      Dropzone.prototype.attachDragAndDropEvent = function () {
          var _this = this;
          var collection = $$1();
          var $dropzoneMessage = this.$dropzone.find('.note-dropzone-message');
          this.documentEventHandlers.onDragenter = function (e) {
              var isCodeview = _this.context.invoke('codeview.isActivated');
              var hasEditorSize = _this.$editor.width() > 0 && _this.$editor.height() > 0;
              if (!isCodeview && !collection.length && hasEditorSize) {
                  _this.$editor.addClass('dragover');
                  _this.$dropzone.width(_this.$editor.width());
                  _this.$dropzone.height(_this.$editor.height());
                  $dropzoneMessage.text(_this.lang.image.dragImageHere);
              }
              collection = collection.add(e.target);
          };
          this.documentEventHandlers.onDragleave = function (e) {
              collection = collection.not(e.target);
              if (!collection.length) {
                  _this.$editor.removeClass('dragover');
              }
          };
          this.documentEventHandlers.onDrop = function () {
              collection = $$1();
              _this.$editor.removeClass('dragover');
          };
          // show dropzone on dragenter when dragging a object to document
          // -but only if the editor is visible, i.e. has a positive width and height
          this.$eventListener.on('dragenter', this.documentEventHandlers.onDragenter)
              .on('dragleave', this.documentEventHandlers.onDragleave)
              .on('drop', this.documentEventHandlers.onDrop);
          // change dropzone's message on hover.
          this.$dropzone.on('dragenter', function () {
              _this.$dropzone.addClass('hover');
              $dropzoneMessage.text(_this.lang.image.dropImage);
          }).on('dragleave', function () {
              _this.$dropzone.removeClass('hover');
              $dropzoneMessage.text(_this.lang.image.dragImageHere);
          });
          // attach dropImage
          this.$dropzone.on('drop', function (event) {
              var dataTransfer = event.originalEvent.dataTransfer;
              // stop the browser from opening the dropped content
              event.preventDefault();
              if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {
                  _this.$editable.focus();
                  _this.context.invoke('editor.insertImagesOrCallback', dataTransfer.files);
              }
              else {
                  $$1.each(dataTransfer.types, function (idx, type) {
                      var content = dataTransfer.getData(type);
                      if (type.toLowerCase().indexOf('text') > -1) {
                          _this.context.invoke('editor.pasteHTML', content);
                      }
                      else {
                          $$1(content).each(function (idx, item) {
                              _this.context.invoke('editor.insertNode', item);
                          });
                      }
                  });
              }
          }).on('dragover', false); // prevent default dragover event
      };
      Dropzone.prototype.destroy = function () {
          var _this = this;
          Object.keys(this.documentEventHandlers).forEach(function (key) {
              _this.$eventListener.off(key.substr(2).toLowerCase(), _this.documentEventHandlers[key]);
          });
          this.documentEventHandlers = {};
      };
      return Dropzone;
  }());

  var CodeMirror;
  if (env.hasCodeMirror) {
      CodeMirror = window.CodeMirror;
  }
  /**
   * @class Codeview
   */
  var CodeView = /** @class */ (function () {
      function CodeView(context) {
          this.context = context;
          this.$editor = context.layoutInfo.editor;
          this.$editable = context.layoutInfo.editable;
          this.$codable = context.layoutInfo.codable;
          this.options = context.options;
      }
      CodeView.prototype.sync = function () {
          var isCodeview = this.isActivated();
          if (isCodeview && env.hasCodeMirror) {
              this.$codable.data('cmEditor').save();
          }
      };
      /**
       * @return {Boolean}
       */
      CodeView.prototype.isActivated = function () {
          return this.$editor.hasClass('codeview');
      };
      /**
       * toggle codeview
       */
      CodeView.prototype.toggle = function () {
          if (this.isActivated()) {
              this.deactivate();
          }
          else {
              this.activate();
          }
          this.context.triggerEvent('codeview.toggled');
      };
      /**
       * purify input value
       * @param value
       * @returns {*}
       */
      CodeView.prototype.purify = function (value) {
          if (this.options.codeviewFilter) {
              // filter code view regex
              value = value.replace(this.options.codeviewFilterRegex, '');
              // allow specific iframe tag
              if (this.options.codeviewIframeFilter) {
                  var whitelist_1 = this.options.codeviewIframeWhitelistSrc.concat(this.options.codeviewIframeWhitelistSrcBase);
                  value = value.replace(/(<iframe.*?>.*?(?:<\/iframe>)?)/gi, function (tag) {
                      // remove if src attribute is duplicated
                      if (/<.+src(?==?('|"|\s)?)[\s\S]+src(?=('|"|\s)?)[^>]*?>/i.test(tag)) {
                          return '';
                      }
                      for (var _i = 0, whitelist_2 = whitelist_1; _i < whitelist_2.length; _i++) {
                          var src = whitelist_2[_i];
                          // pass if src is trusted
                          if ((new RegExp('src="(https?:)?\/\/' + src.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '\/(.+)"')).test(tag)) {
                              return tag;
                          }
                      }
                      return '';
                  });
              }
          }
          return value;
      };
      /**
       * activate code view
       */
      CodeView.prototype.activate = function () {
          var _this = this;
          this.$codable.val(dom.html(this.$editable, this.options.prettifyHtml));
          this.$codable.height(this.$editable.height());
          this.context.invoke('toolbar.updateCodeview', true);
          this.$editor.addClass('codeview');
          this.$codable.focus();
          // activate CodeMirror as codable
          if (env.hasCodeMirror) {
              var cmEditor_1 = CodeMirror.fromTextArea(this.$codable[0], this.options.codemirror);
              // CodeMirror TernServer
              if (this.options.codemirror.tern) {
                  var server_1 = new CodeMirror.TernServer(this.options.codemirror.tern);
                  cmEditor_1.ternServer = server_1;
                  cmEditor_1.on('cursorActivity', function (cm) {
                      server_1.updateArgHints(cm);
                  });
              }
              cmEditor_1.on('blur', function (event) {
                  _this.context.triggerEvent('blur.codeview', cmEditor_1.getValue(), event);
              });
              cmEditor_1.on('change', function (event) {
                  _this.context.triggerEvent('change.codeview', cmEditor_1.getValue(), cmEditor_1);
              });
              // CodeMirror hasn't Padding.
              cmEditor_1.setSize(null, this.$editable.outerHeight());
              this.$codable.data('cmEditor', cmEditor_1);
          }
          else {
              this.$codable.on('blur', function (event) {
                  _this.context.triggerEvent('blur.codeview', _this.$codable.val(), event);
              });
              this.$codable.on('input', function (event) {
                  _this.context.triggerEvent('change.codeview', _this.$codable.val(), _this.$codable);
              });
          }
      };
      /**
       * deactivate code view
       */
      CodeView.prototype.deactivate = function () {
          // deactivate CodeMirror as codable
          if (env.hasCodeMirror) {
              var cmEditor = this.$codable.data('cmEditor');
              this.$codable.val(cmEditor.getValue());
              cmEditor.toTextArea();
          }
          var value = this.purify(dom.value(this.$codable, this.options.prettifyHtml) || dom.emptyPara);
          var isChange = this.$editable.html() !== value;
          this.$editable.html(value);
          this.$editable.height(this.options.height ? this.$codable.height() : 'auto');
          this.$editor.removeClass('codeview');
          if (isChange) {
              this.context.triggerEvent('change', this.$editable.html(), this.$editable);
          }
          this.$editable.focus();
          this.context.invoke('toolbar.updateCodeview', false);
      };
      CodeView.prototype.destroy = function () {
          if (this.isActivated()) {
              this.deactivate();
          }
      };
      return CodeView;
  }());

  var EDITABLE_PADDING = 24;
  var Statusbar = /** @class */ (function () {
      function Statusbar(context) {
          this.$document = $$1(document);
          this.$statusbar = context.layoutInfo.statusbar;
          this.$editable = context.layoutInfo.editable;
          this.options = context.options;
      }
      Statusbar.prototype.initialize = function () {
          var _this = this;
          if (this.options.airMode || this.options.disableResizeEditor) {
              this.destroy();
              return;
          }
          this.$statusbar.on('mousedown', function (event) {
              event.preventDefault();
              event.stopPropagation();
              var editableTop = _this.$editable.offset().top - _this.$document.scrollTop();
              var onMouseMove = function (event) {
                  var height = event.clientY - (editableTop + EDITABLE_PADDING);
                  height = (_this.options.minheight > 0) ? Math.max(height, _this.options.minheight) : height;
                  height = (_this.options.maxHeight > 0) ? Math.min(height, _this.options.maxHeight) : height;
                  _this.$editable.height(height);
              };
              _this.$document.on('mousemove', onMouseMove).one('mouseup', function () {
                  _this.$document.off('mousemove', onMouseMove);
              });
          });
      };
      Statusbar.prototype.destroy = function () {
          this.$statusbar.off();
          this.$statusbar.addClass('locked');
      };
      return Statusbar;
  }());

  var Fullscreen = /** @class */ (function () {
      function Fullscreen(context) {
          var _this = this;
          this.context = context;
          this.$editor = context.layoutInfo.editor;
          this.$toolbar = context.layoutInfo.toolbar;
          this.$editable = context.layoutInfo.editable;
          this.$codable = context.layoutInfo.codable;
          this.$window = $$1(window);
          this.$scrollbar = $$1('html, body');
          this.onResize = function () {
              _this.resizeTo({
                  h: _this.$window.height() - _this.$toolbar.outerHeight()
              });
          };
      }
      Fullscreen.prototype.resizeTo = function (size) {
          this.$editable.css('height', size.h);
          this.$codable.css('height', size.h);
          if (this.$codable.data('cmeditor')) {
              this.$codable.data('cmeditor').setsize(null, size.h);
          }
      };
      /**
       * toggle fullscreen
       */
      Fullscreen.prototype.toggle = function () {
          this.$editor.toggleClass('fullscreen');
          if (this.isFullscreen()) {
              this.$editable.data('orgHeight', this.$editable.css('height'));
              this.$editable.data('orgMaxHeight', this.$editable.css('maxHeight'));
              this.$editable.css('maxHeight', '');
              this.$window.on('resize', this.onResize).trigger('resize');
              this.$scrollbar.css('overflow', 'hidden');
          }
          else {
              this.$window.off('resize', this.onResize);
              this.resizeTo({ h: this.$editable.data('orgHeight') });
              this.$editable.css('maxHeight', this.$editable.css('orgMaxHeight'));
              this.$scrollbar.css('overflow', 'visible');
          }
          this.context.invoke('toolbar.updateFullscreen', this.isFullscreen());
      };
      Fullscreen.prototype.isFullscreen = function () {
          return this.$editor.hasClass('fullscreen');
      };
      return Fullscreen;
  }());

  var Handle = /** @class */ (function () {
      function Handle(context) {
          var _this = this;
          this.context = context;
          this.$document = $$1(document);
          this.$editingArea = context.layoutInfo.editingArea;
          this.options = context.options;
          this.lang = this.options.langInfo;
          this.events = {
              'summernote.mousedown': function (we, e) {
                  if (_this.update(e.target, e)) {
                      e.preventDefault();
                  }
              },
              'summernote.keyup summernote.scroll summernote.change summernote.dialog.shown': function () {
                  _this.update();
              },
              'summernote.disable': function () {
                  _this.hide();
              },
              'summernote.codeview.toggled': function () {
                  _this.update();
              }
          };
      }
      Handle.prototype.initialize = function () {
          var _this = this;
          this.$handle = $$1([
              '<div class="note-handle">',
              '<div class="note-control-selection">',
              '<div class="note-control-selection-bg"></div>',
              '<div class="note-control-holder note-control-nw"></div>',
              '<div class="note-control-holder note-control-ne"></div>',
              '<div class="note-control-holder note-control-sw"></div>',
              '<div class="',
              (this.options.disableResizeImage ? 'note-control-holder' : 'note-control-sizing'),
              ' note-control-se"></div>',
              (this.options.disableResizeImage ? '' : '<div class="note-control-selection-info"></div>'),
              '</div>',
              '</div>',
          ].join('')).prependTo(this.$editingArea);
          this.$handle.on('mousedown', function (event) {
              if (dom.isControlSizing(event.target)) {
                  event.preventDefault();
                  event.stopPropagation();
                  var $target_1 = _this.$handle.find('.note-control-selection').data('target');
                  var posStart_1 = $target_1.offset();
                  var scrollTop_1 = _this.$document.scrollTop();
                  var onMouseMove_1 = function (event) {
                      _this.context.invoke('editor.resizeTo', {
                          x: event.clientX - posStart_1.left,
                          y: event.clientY - (posStart_1.top - scrollTop_1)
                      }, $target_1, !event.shiftKey);
                      _this.update($target_1[0]);
                  };
                  _this.$document
                      .on('mousemove', onMouseMove_1)
                      .one('mouseup', function (e) {
                      e.preventDefault();
                      _this.$document.off('mousemove', onMouseMove_1);
                      _this.context.invoke('editor.afterCommand');
                  });
                  if (!$target_1.data('ratio')) { // original ratio.
                      $target_1.data('ratio', $target_1.height() / $target_1.width());
                  }
              }
          });
          // Listen for scrolling on the handle overlay.
          this.$handle.on('wheel', function (e) {
              e.preventDefault();
              _this.update();
          });
      };
      Handle.prototype.destroy = function () {
          this.$handle.remove();
      };
      Handle.prototype.update = function (target, event) {
          if (this.context.isDisabled()) {
              return false;
          }
          var isImage = dom.isImg(target);
          var $selection = this.$handle.find('.note-control-selection');
          this.context.invoke('imagePopover.update', target, event);
          if (isImage) {
              var $image = $$1(target);
              var position = $image.position();
              var pos = {
                  left: position.left + parseInt($image.css('marginLeft'), 10),
                  top: position.top + parseInt($image.css('marginTop'), 10)
              };
              // exclude margin
              var imageSize = {
                  w: $image.outerWidth(false),
                  h: $image.outerHeight(false)
              };
              $selection.css({
                  display: 'block',
                  left: pos.left,
                  top: pos.top,
                  width: imageSize.w,
                  height: imageSize.h
              }).data('target', $image); // save current image element.
              var origImageObj = new Image();
              origImageObj.src = $image.attr('src');
              var sizingText = imageSize.w + 'x' + imageSize.h + ' (' + this.lang.image.original + ': ' + origImageObj.width + 'x' + origImageObj.height + ')';
              $selection.find('.note-control-selection-info').text(sizingText);
              this.context.invoke('editor.saveTarget', target);
          }
          else {
              this.hide();
          }
          return isImage;
      };
      /**
       * hide
       *
       * @param {jQuery} $handle
       */
      Handle.prototype.hide = function () {
          this.context.invoke('editor.clearTarget');
          this.$handle.children().hide();
      };
      return Handle;
  }());

  var defaultScheme = 'http://';
  var linkPattern = /^([A-Za-z][A-Za-z0-9+-.]*\:[\/]{2}|mailto:[A-Z0-9._%+-]+@)?(www\.)?(.+)$/i;
  var AutoLink = /** @class */ (function () {
      function AutoLink(context) {
          var _this = this;
          this.context = context;
          this.events = {
              'summernote.keyup': function (we, e) {
                  if (!e.isDefaultPrevented()) {
                      _this.handleKeyup(e);
                  }
              },
              'summernote.keydown': function (we, e) {
                  _this.handleKeydown(e);
              }
          };
      }
      AutoLink.prototype.initialize = function () {
          this.lastWordRange = null;
      };
      AutoLink.prototype.destroy = function () {
          this.lastWordRange = null;
      };
      AutoLink.prototype.replace = function () {
          if (!this.lastWordRange) {
              return;
          }
          var keyword = this.lastWordRange.toString();
          var match = keyword.match(linkPattern);
          if (match && (match[1] || match[2])) {
              var link = match[1] ? keyword : defaultScheme + keyword;
              var node = $$1('<a />').html(keyword).attr('href', link)[0];
              if (this.context.options.linkTargetBlank) {
                  $$1(node).attr('target', '_blank');
              }
              this.lastWordRange.insertNode(node);
              this.lastWordRange = null;
              this.context.invoke('editor.focus');
          }
      };
      AutoLink.prototype.handleKeydown = function (e) {
          if (lists.contains([key.code.ENTER, key.code.SPACE], e.keyCode)) {
              var wordRange = this.context.invoke('editor.createRange').getWordRange();
              this.lastWordRange = wordRange;
          }
      };
      AutoLink.prototype.handleKeyup = function (e) {
          if (lists.contains([key.code.ENTER, key.code.SPACE], e.keyCode)) {
              this.replace();
          }
      };
      return AutoLink;
  }());

  /**
   * textarea auto sync.
   */
  var AutoSync = /** @class */ (function () {
      function AutoSync(context) {
          var _this = this;
          this.$note = context.layoutInfo.note;
          this.events = {
              'summernote.change': function () {
                  _this.$note.val(context.invoke('code'));
              }
          };
      }
      AutoSync.prototype.shouldInitialize = function () {
          return dom.isTextarea(this.$note[0]);
      };
      return AutoSync;
  }());

  var AutoReplace = /** @class */ (function () {
      function AutoReplace(context) {
          var _this = this;
          this.context = context;
          this.options = context.options.replace || {};
          this.keys = [key.code.ENTER, key.code.SPACE, key.code.PERIOD, key.code.COMMA, key.code.SEMICOLON, key.code.SLASH];
          this.previousKeydownCode = null;
          this.events = {
              'summernote.keyup': function (we, e) {
                  if (!e.isDefaultPrevented()) {
                      _this.handleKeyup(e);
                  }
              },
              'summernote.keydown': function (we, e) {
                  _this.handleKeydown(e);
              }
          };
      }
      AutoReplace.prototype.shouldInitialize = function () {
          return !!this.options.match;
      };
      AutoReplace.prototype.initialize = function () {
          this.lastWord = null;
      };
      AutoReplace.prototype.destroy = function () {
          this.lastWord = null;
      };
      AutoReplace.prototype.replace = function () {
          if (!this.lastWord) {
              return;
          }
          var self = this;
          var keyword = this.lastWord.toString();
          this.options.match(keyword, function (match) {
              if (match) {
                  var node = '';
                  if (typeof match === 'string') {
                      node = dom.createText(match);
                  }
                  else if (match instanceof jQuery) {
                      node = match[0];
                  }
                  else if (match instanceof Node) {
                      node = match;
                  }
                  if (!node)
                      return;
                  self.lastWord.insertNode(node);
                  self.lastWord = null;
                  self.context.invoke('editor.focus');
              }
          });
      };
      AutoReplace.prototype.handleKeydown = function (e) {
          // this forces it to remember the last whole word, even if multiple termination keys are pressed
          // before the previous key is let go.
          if (this.previousKeydownCode && lists.contains(this.keys, this.previousKeydownCode)) {
              this.previousKeydownCode = e.keyCode;
              return;
          }
          if (lists.contains(this.keys, e.keyCode)) {
              var wordRange = this.context.invoke('editor.createRange').getWordRange();
              this.lastWord = wordRange;
          }
          this.previousKeydownCode = e.keyCode;
      };
      AutoReplace.prototype.handleKeyup = function (e) {
          if (lists.contains(this.keys, e.keyCode)) {
              this.replace();
          }
      };
      return AutoReplace;
  }());

  var Placeholder = /** @class */ (function () {
      function Placeholder(context) {
          var _this = this;
          this.context = context;
          this.$editingArea = context.layoutInfo.editingArea;
          this.options = context.options;
          this.events = {
              'summernote.init summernote.change': function () {
                  _this.update();
              },
              'summernote.codeview.toggled': function () {
                  _this.update();
              }
          };
      }
      Placeholder.prototype.shouldInitialize = function () {
          return !!this.options.placeholder;
      };
      Placeholder.prototype.initialize = function () {
          var _this = this;
          this.$placeholder = $$1('<div class="note-placeholder">');
          this.$placeholder.on('click', function () {
              _this.context.invoke('focus');
          }).html(this.options.placeholder).prependTo(this.$editingArea);
          this.update();
      };
      Placeholder.prototype.destroy = function () {
          this.$placeholder.remove();
      };
      Placeholder.prototype.update = function () {
          var isShow = !this.context.invoke('codeview.isActivated') && this.context.invoke('editor.isEmpty');
          this.$placeholder.toggle(isShow);
      };
      return Placeholder;
  }());

  var Buttons = /** @class */ (function () {
      function Buttons(context) {
          this.ui = $$1.summernote.ui;
          this.context = context;
          this.$toolbar = context.layoutInfo.toolbar;
          this.options = context.options;
          this.lang = this.options.langInfo;
          this.invertedKeyMap = func.invertObject(this.options.keyMap[env.isMac ? 'mac' : 'pc']);
      }
      Buttons.prototype.representShortcut = function (editorMethod) {
          var shortcut = this.invertedKeyMap[editorMethod];
          if (!this.options.shortcuts || !shortcut) {
              return '';
          }
          if (env.isMac) {
              shortcut = shortcut.replace('CMD', '⌘').replace('SHIFT', '⇧');
          }
          shortcut = shortcut.replace('BACKSLASH', '\\')
              .replace('SLASH', '/')
              .replace('LEFTBRACKET', '[')
              .replace('RIGHTBRACKET', ']');
          return ' (' + shortcut + ')';
      };
      Buttons.prototype.button = function (o) {
          if (!this.options.tooltip && o.tooltip) {
              delete o.tooltip;
          }
          o.container = this.options.container;
          return this.ui.button(o);
      };
      Buttons.prototype.initialize = function () {
          this.addToolbarButtons();
          this.addImagePopoverButtons();
          this.addLinkPopoverButtons();
          this.addTablePopoverButtons();
          this.fontInstalledMap = {};
      };
      Buttons.prototype.destroy = function () {
          delete this.fontInstalledMap;
      };
      Buttons.prototype.isFontInstalled = function (name) {
          if (!this.fontInstalledMap.hasOwnProperty(name)) {
              this.fontInstalledMap[name] = env.isFontInstalled(name) ||
                  lists.contains(this.options.fontNamesIgnoreCheck, name);
          }
          return this.fontInstalledMap[name];
      };
      Buttons.prototype.isFontDeservedToAdd = function (name) {
          var genericFamilies = ['sans-serif', 'serif', 'monospace', 'cursive', 'fantasy'];
          name = name.toLowerCase();
          return (name !== '' && this.isFontInstalled(name) && genericFamilies.indexOf(name) === -1);
      };
      Buttons.prototype.colorPalette = function (className, tooltip, backColor, foreColor) {
          var _this = this;
          return this.ui.buttonGroup({
              className: 'note-color ' + className,
              children: [
                  this.button({
                      className: 'note-current-color-button',
                      contents: this.ui.icon(this.options.icons.font + ' note-recent-color'),
                      tooltip: tooltip,
                      click: function (e) {
                          var $button = $$1(e.currentTarget);
                          if (backColor && foreColor) {
                              _this.context.invoke('editor.color', {
                                  backColor: $button.attr('data-backColor'),
                                  foreColor: $button.attr('data-foreColor')
                              });
                          }
                          else if (backColor) {
                              _this.context.invoke('editor.color', {
                                  backColor: $button.attr('data-backColor')
                              });
                          }
                          else if (foreColor) {
                              _this.context.invoke('editor.color', {
                                  foreColor: $button.attr('data-foreColor')
                              });
                          }
                      },
                      callback: function ($button) {
                          var $recentColor = $button.find('.note-recent-color');
                          if (backColor) {
                              $recentColor.css('background-color', _this.options.colorButton.backColor);
                              $button.attr('data-backColor', _this.options.colorButton.backColor);
                          }
                          if (foreColor) {
                              $recentColor.css('color', _this.options.colorButton.foreColor);
                              $button.attr('data-foreColor', _this.options.colorButton.foreColor);
                          }
                          else {
                              $recentColor.css('color', 'transparent');
                          }
                      }
                  }),
                  this.button({
                      className: 'dropdown-toggle',
                      contents: this.ui.dropdownButtonContents('', this.options),
                      tooltip: this.lang.color.more,
                      data: {
                          toggle: 'dropdown'
                      }
                  }),
                  this.ui.dropdown({
                      items: (backColor ? [
                          '<div class="note-palette">',
                          '  <div class="note-palette-title">' + this.lang.color.background + '</div>',
                          '  <div>',
                          '    <button type="button" class="note-color-reset btn btn-light" data-event="backColor" data-value="inherit">',
                          this.lang.color.transparent,
                          '    </button>',
                          '  </div>',
                          '  <div class="note-holder" data-event="backColor"/>',
                          '  <div>',
                          '    <button type="button" class="note-color-select btn" data-event="openPalette" data-value="backColorPicker">',
                          this.lang.color.cpSelect,
                          '    </button>',
                          '    <input type="color" id="backColorPicker" class="note-btn note-color-select-btn" value="' + this.options.colorButton.backColor + '" data-event="backColorPalette">',
                          '  </div>',
                          '  <div class="note-holder-custom" id="backColorPalette" data-event="backColor"/>',
                          '</div>',
                      ].join('') : '') +
                          (foreColor ? [
                              '<div class="note-palette">',
                              '  <div class="note-palette-title">' + this.lang.color.foreground + '</div>',
                              '  <div>',
                              '    <button type="button" class="note-color-reset btn btn-light" data-event="removeFormat" data-value="foreColor">',
                              this.lang.color.resetToDefault,
                              '    </button>',
                              '  </div>',
                              '  <div class="note-holder" data-event="foreColor"/>',
                              '  <div>',
                              '    <button type="button" class="note-color-select btn" data-event="openPalette" data-value="foreColorPicker">',
                              this.lang.color.cpSelect,
                              '    </button>',
                              '    <input type="color" id="foreColorPicker" class="note-btn note-color-select-btn" value="' + this.options.colorButton.foreColor + '" data-event="foreColorPalette">',
                              '  <div class="note-holder-custom" id="foreColorPalette" data-event="foreColor"/>',
                              '</div>',
                          ].join('') : ''),
                      callback: function ($dropdown) {
                          $dropdown.find('.note-holder').each(function (idx, item) {
                              var $holder = $$1(item);
                              $holder.append(_this.ui.palette({
                                  colors: _this.options.colors,
                                  colorsName: _this.options.colorsName,
                                  eventName: $holder.data('event'),
                                  container: _this.options.container,
                                  tooltip: _this.options.tooltip
                              }).render());
                          });
                          /* TODO: do we have to record recent custom colors within cookies? */
                          var customColors = [
                              ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
                          ];
                          $dropdown.find('.note-holder-custom').each(function (idx, item) {
                              var $holder = $$1(item);
                              $holder.append(_this.ui.palette({
                                  colors: customColors,
                                  colorsName: customColors,
                                  eventName: $holder.data('event'),
                                  container: _this.options.container,
                                  tooltip: _this.options.tooltip
                              }).render());
                          });
                          $dropdown.find('input[type=color]').each(function (idx, item) {
                              $$1(item).change(function () {
                                  var $chip = $dropdown.find('#' + $$1(this).data('event')).find('.note-color-btn').first();
                                  var color = this.value.toUpperCase();
                                  $chip.css('background-color', color)
                                      .attr('aria-label', color)
                                      .attr('data-value', color)
                                      .attr('data-original-title', color);
                                  $chip.click();
                              });
                          });
                      },
                      click: function (event) {
                          event.stopPropagation();
                          var $parent = $$1('.' + className);
                          var $button = $$1(event.target);
                          var eventName = $button.data('event');
                          var value = $button.attr('data-value');
                          if (eventName === 'openPalette') {
                              var $picker = $parent.find('#' + value);
                              var $palette = $$1($parent.find('#' + $picker.data('event')).find('.note-color-row')[0]);
                              // Shift palette chips
                              var $chip = $palette.find('.note-color-btn').last().detach();
                              // Set chip attributes
                              var color = $picker.val();
                              $chip.css('background-color', color)
                                  .attr('aria-label', color)
                                  .attr('data-value', color)
                                  .attr('data-original-title', color);
                              $palette.prepend($chip);
                              $picker.click();
                          }
                          else if (lists.contains(['backColor', 'foreColor'], eventName)) {
                              var key = eventName === 'backColor' ? 'background-color' : 'color';
                              var $color = $button.closest('.note-color').find('.note-recent-color');
                              var $currentButton = $button.closest('.note-color').find('.note-current-color-button');
                              $color.css(key, value);
                              $currentButton.attr('data-' + eventName, value);
                              _this.context.invoke('editor.' + eventName, value);
                          }
                      }
                  }),
              ]
          }).render();
      };
      Buttons.prototype.addToolbarButtons = function () {
          var _this = this;
          this.context.memo('button.style', function () {
              return _this.ui.buttonGroup([
                  _this.button({
                      className: 'dropdown-toggle',
                      contents: _this.ui.dropdownButtonContents(_this.ui.icon(_this.options.icons.magic), _this.options),
                      tooltip: _this.lang.style.style,
                      data: {
                          toggle: 'dropdown'
                      }
                  }),
                  _this.ui.dropdown({
                      className: 'dropdown-style',
                      items: _this.options.styleTags,
                      title: _this.lang.style.style,
                      template: function (item) {
                          if (typeof item === 'string') {
                              item = { tag: item, title: (_this.lang.style.hasOwnProperty(item) ? _this.lang.style[item] : item) };
                          }
                          var tag = item.tag;
                          var title = item.title;
                          var style = item.style ? ' style="' + item.style + '" ' : '';
                          var className = item.className ? ' class="' + item.className + '"' : '';
                          return '<' + tag + style + className + '>' + title + '</' + tag + '>';
                      },
                      click: _this.context.createInvokeHandler('editor.formatBlock')
                  }),
              ]).render();
          });
          var _loop_1 = function (styleIdx, styleLen) {
              var item = this_1.options.styleTags[styleIdx];
              this_1.context.memo('button.style.' + item, function () {
                  return _this.button({
                      className: 'note-btn-style-' + item,
                      contents: '<div data-value="' + item + '">' + item.toUpperCase() + '</div>',
                      tooltip: _this.lang.style[item],
                      click: _this.context.createInvokeHandler('editor.formatBlock')
                  }).render();
              });
          };
          var this_1 = this;
          for (var styleIdx = 0, styleLen = this.options.styleTags.length; styleIdx < styleLen; styleIdx++) {
              _loop_1(styleIdx, styleLen);
          }
          this.context.memo('button.bold', function () {
              return _this.button({
                  className: 'note-btn-bold',
                  contents: _this.ui.icon(_this.options.icons.bold),
                  tooltip: _this.lang.font.bold + _this.representShortcut('bold'),
                  click: _this.context.createInvokeHandlerAndUpdateState('editor.bold')
              }).render();
          });
          this.context.memo('button.italic', function () {
              return _this.button({
                  className: 'note-btn-italic',
                  contents: _this.ui.icon(_this.options.icons.italic),
                  tooltip: _this.lang.font.italic + _this.representShortcut('italic'),
                  click: _this.context.createInvokeHandlerAndUpdateState('editor.italic')
              }).render();
          });
          this.context.memo('button.underline', function () {
              return _this.button({
                  className: 'note-btn-underline',
                  contents: _this.ui.icon(_this.options.icons.underline),
                  tooltip: _this.lang.font.underline + _this.representShortcut('underline'),
                  click: _this.context.createInvokeHandlerAndUpdateState('editor.underline')
              }).render();
          });
          this.context.memo('button.clear', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.eraser),
                  tooltip: _this.lang.font.clear + _this.representShortcut('removeFormat'),
                  click: _this.context.createInvokeHandler('editor.removeFormat')
              }).render();
          });
          this.context.memo('button.strikethrough', function () {
              return _this.button({
                  className: 'note-btn-strikethrough',
                  contents: _this.ui.icon(_this.options.icons.strikethrough),
                  tooltip: _this.lang.font.strikethrough + _this.representShortcut('strikethrough'),
                  click: _this.context.createInvokeHandlerAndUpdateState('editor.strikethrough')
              }).render();
          });
          this.context.memo('button.superscript', function () {
              return _this.button({
                  className: 'note-btn-superscript',
                  contents: _this.ui.icon(_this.options.icons.superscript),
                  tooltip: _this.lang.font.superscript,
                  click: _this.context.createInvokeHandlerAndUpdateState('editor.superscript')
              }).render();
          });
          this.context.memo('button.subscript', function () {
              return _this.button({
                  className: 'note-btn-subscript',
                  contents: _this.ui.icon(_this.options.icons.subscript),
                  tooltip: _this.lang.font.subscript,
                  click: _this.context.createInvokeHandlerAndUpdateState('editor.subscript')
              }).render();
          });
          this.context.memo('button.fontname', function () {
              var styleInfo = _this.context.invoke('editor.currentStyle');
              // Add 'default' fonts into the fontnames array if not exist
              $$1.each(styleInfo['font-family'].split(','), function (idx, fontname) {
                  fontname = fontname.trim().replace(/['"]+/g, '');
                  if (_this.isFontDeservedToAdd(fontname)) {
                      if (_this.options.fontNames.indexOf(fontname) === -1) {
                          _this.options.fontNames.push(fontname);
                      }
                  }
              });
              return _this.ui.buttonGroup([
                  _this.button({
                      className: 'dropdown-toggle',
                      contents: _this.ui.dropdownButtonContents('<span class="note-current-fontname"/>', _this.options),
                      tooltip: _this.lang.font.name,
                      data: {
                          toggle: 'dropdown'
                      }
                  }),
                  _this.ui.dropdownCheck({
                      className: 'dropdown-fontname',
                      checkClassName: _this.options.icons.menuCheck,
                      items: _this.options.fontNames.filter(_this.isFontInstalled.bind(_this)),
                      title: _this.lang.font.name,
                      template: function (item) {
                          return '<span style="font-family: \'' + item + '\'">' + item + '</span>';
                      },
                      click: _this.context.createInvokeHandlerAndUpdateState('editor.fontName')
                  }),
              ]).render();
          });
          this.context.memo('button.fontsize', function () {
              return _this.ui.buttonGroup([
                  _this.button({
                      className: 'dropdown-toggle',
                      contents: _this.ui.dropdownButtonContents('<span class="note-current-fontsize"/>', _this.options),
                      tooltip: _this.lang.font.size,
                      data: {
                          toggle: 'dropdown'
                      }
                  }),
                  _this.ui.dropdownCheck({
                      className: 'dropdown-fontsize',
                      checkClassName: _this.options.icons.menuCheck,
                      items: _this.options.fontSizes,
                      title: _this.lang.font.size,
                      click: _this.context.createInvokeHandlerAndUpdateState('editor.fontSize')
                  }),
              ]).render();
          });
          this.context.memo('button.color', function () {
              return _this.colorPalette('note-color-all', _this.lang.color.recent, true, true);
          });
          this.context.memo('button.forecolor', function () {
              return _this.colorPalette('note-color-fore', _this.lang.color.foreground, false, true);
          });
          this.context.memo('button.backcolor', function () {
              return _this.colorPalette('note-color-back', _this.lang.color.background, true, false);
          });
          this.context.memo('button.ul', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.unorderedlist),
                  tooltip: _this.lang.lists.unordered + _this.representShortcut('insertUnorderedList'),
                  click: _this.context.createInvokeHandler('editor.insertUnorderedList')
              }).render();
          });
          this.context.memo('button.ol', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.orderedlist),
                  tooltip: _this.lang.lists.ordered + _this.representShortcut('insertOrderedList'),
                  click: _this.context.createInvokeHandler('editor.insertOrderedList')
              }).render();
          });
          var justifyLeft = this.button({
              contents: this.ui.icon(this.options.icons.alignLeft),
              tooltip: this.lang.paragraph.left + this.representShortcut('justifyLeft'),
              click: this.context.createInvokeHandler('editor.justifyLeft')
          });
          var justifyCenter = this.button({
              contents: this.ui.icon(this.options.icons.alignCenter),
              tooltip: this.lang.paragraph.center + this.representShortcut('justifyCenter'),
              click: this.context.createInvokeHandler('editor.justifyCenter')
          });
          var justifyRight = this.button({
              contents: this.ui.icon(this.options.icons.alignRight),
              tooltip: this.lang.paragraph.right + this.representShortcut('justifyRight'),
              click: this.context.createInvokeHandler('editor.justifyRight')
          });
          var justifyFull = this.button({
              contents: this.ui.icon(this.options.icons.alignJustify),
              tooltip: this.lang.paragraph.justify + this.representShortcut('justifyFull'),
              click: this.context.createInvokeHandler('editor.justifyFull')
          });
          var outdent = this.button({
              contents: this.ui.icon(this.options.icons.outdent),
              tooltip: this.lang.paragraph.outdent + this.representShortcut('outdent'),
              click: this.context.createInvokeHandler('editor.outdent')
          });
          var indent = this.button({
              contents: this.ui.icon(this.options.icons.indent),
              tooltip: this.lang.paragraph.indent + this.representShortcut('indent'),
              click: this.context.createInvokeHandler('editor.indent')
          });
          this.context.memo('button.justifyLeft', func.invoke(justifyLeft, 'render'));
          this.context.memo('button.justifyCenter', func.invoke(justifyCenter, 'render'));
          this.context.memo('button.justifyRight', func.invoke(justifyRight, 'render'));
          this.context.memo('button.justifyFull', func.invoke(justifyFull, 'render'));
          this.context.memo('button.outdent', func.invoke(outdent, 'render'));
          this.context.memo('button.indent', func.invoke(indent, 'render'));
          this.context.memo('button.paragraph', function () {
              return _this.ui.buttonGroup([
                  _this.button({
                      className: 'dropdown-toggle',
                      contents: _this.ui.dropdownButtonContents(_this.ui.icon(_this.options.icons.alignLeft), _this.options),
                      tooltip: _this.lang.paragraph.paragraph,
                      data: {
                          toggle: 'dropdown'
                      }
                  }),
                  _this.ui.dropdown([
                      _this.ui.buttonGroup({
                          className: 'note-align',
                          children: [justifyLeft, justifyCenter, justifyRight, justifyFull]
                      }),
                      _this.ui.buttonGroup({
                          className: 'note-list',
                          children: [outdent, indent]
                      }),
                  ]),
              ]).render();
          });
          this.context.memo('button.height', function () {
              return _this.ui.buttonGroup([
                  _this.button({
                      className: 'dropdown-toggle',
                      contents: _this.ui.dropdownButtonContents(_this.ui.icon(_this.options.icons.textHeight), _this.options),
                      tooltip: _this.lang.font.height,
                      data: {
                          toggle: 'dropdown'
                      }
                  }),
                  _this.ui.dropdownCheck({
                      items: _this.options.lineHeights,
                      checkClassName: _this.options.icons.menuCheck,
                      className: 'dropdown-line-height',
                      title: _this.lang.font.height,
                      click: _this.context.createInvokeHandler('editor.lineHeight')
                  }),
              ]).render();
          });
          this.context.memo('button.table', function () {
              return _this.ui.buttonGroup([
                  _this.button({
                      className: 'dropdown-toggle',
                      contents: _this.ui.dropdownButtonContents(_this.ui.icon(_this.options.icons.table), _this.options),
                      tooltip: _this.lang.table.table,
                      data: {
                          toggle: 'dropdown'
                      }
                  }),
                  _this.ui.dropdown({
                      title: _this.lang.table.table,
                      className: 'note-table',
                      items: [
                          '<div class="note-dimension-picker">',
                          '  <div class="note-dimension-picker-mousecatcher" data-event="insertTable" data-value="1x1"/>',
                          '  <div class="note-dimension-picker-highlighted"/>',
                          '  <div class="note-dimension-picker-unhighlighted"/>',
                          '</div>',
                          '<div class="note-dimension-display">1 x 1</div>',
                      ].join('')
                  }),
              ], {
                  callback: function ($node) {
                      var $catcher = $node.find('.note-dimension-picker-mousecatcher');
                      $catcher.css({
                          width: _this.options.insertTableMaxSize.col + 'em',
                          height: _this.options.insertTableMaxSize.row + 'em'
                      }).mousedown(_this.context.createInvokeHandler('editor.insertTable'))
                          .on('mousemove', _this.tableMoveHandler.bind(_this));
                  }
              }).render();
          });
          this.context.memo('button.link', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.link),
                  tooltip: _this.lang.link.link + _this.representShortcut('linkDialog.show'),
                  click: _this.context.createInvokeHandler('linkDialog.show')
              }).render();
          });
          this.context.memo('button.picture', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.picture),
                  tooltip: _this.lang.image.image,
                  click: _this.context.createInvokeHandler('imageDialog.show')
              }).render();
          });
          this.context.memo('button.video', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.video),
                  tooltip: _this.lang.video.video,
                  click: _this.context.createInvokeHandler('videoDialog.show')
              }).render();
          });
          this.context.memo('button.hr', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.minus),
                  tooltip: _this.lang.hr.insert + _this.representShortcut('insertHorizontalRule'),
                  click: _this.context.createInvokeHandler('editor.insertHorizontalRule')
              }).render();
          });
          this.context.memo('button.fullscreen', function () {
              return _this.button({
                  className: 'btn-fullscreen',
                  contents: _this.ui.icon(_this.options.icons.arrowsAlt),
                  tooltip: _this.lang.options.fullscreen,
                  click: _this.context.createInvokeHandler('fullscreen.toggle')
              }).render();
          });
          this.context.memo('button.codeview', function () {
              return _this.button({
                  className: 'btn-codeview',
                  contents: _this.ui.icon(_this.options.icons.code),
                  tooltip: _this.lang.options.codeview,
                  click: _this.context.createInvokeHandler('codeview.toggle')
              }).render();
          });
          this.context.memo('button.redo', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.redo),
                  tooltip: _this.lang.history.redo + _this.representShortcut('redo'),
                  click: _this.context.createInvokeHandler('editor.redo')
              }).render();
          });
          this.context.memo('button.undo', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.undo),
                  tooltip: _this.lang.history.undo + _this.representShortcut('undo'),
                  click: _this.context.createInvokeHandler('editor.undo')
              }).render();
          });
          this.context.memo('button.help', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.question),
                  tooltip: _this.lang.options.help,
                  click: _this.context.createInvokeHandler('helpDialog.show')
              }).render();
          });
      };
      /**
       * image: [
       *   ['imageResize', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
       *   ['float', ['floatLeft', 'floatRight', 'floatNone']],
       *   ['remove', ['removeMedia']],
       * ],
       */
      Buttons.prototype.addImagePopoverButtons = function () {
          var _this = this;
          // Image Size Buttons
          this.context.memo('button.resizeFull', function () {
              return _this.button({
                  contents: '<span class="note-fontsize-10">100%</span>',
                  tooltip: _this.lang.image.resizeFull,
                  click: _this.context.createInvokeHandler('editor.resize', '1')
              }).render();
          });
          this.context.memo('button.resizeHalf', function () {
              return _this.button({
                  contents: '<span class="note-fontsize-10">50%</span>',
                  tooltip: _this.lang.image.resizeHalf,
                  click: _this.context.createInvokeHandler('editor.resize', '0.5')
              }).render();
          });
          this.context.memo('button.resizeQuarter', function () {
              return _this.button({
                  contents: '<span class="note-fontsize-10">25%</span>',
                  tooltip: _this.lang.image.resizeQuarter,
                  click: _this.context.createInvokeHandler('editor.resize', '0.25')
              }).render();
          });
          this.context.memo('button.resizeNone', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.rollback),
                  tooltip: _this.lang.image.resizeNone,
                  click: _this.context.createInvokeHandler('editor.resize', '0')
              }).render();
          });
          // Float Buttons
          this.context.memo('button.floatLeft', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.floatLeft),
                  tooltip: _this.lang.image.floatLeft,
                  click: _this.context.createInvokeHandler('editor.floatMe', 'left')
              }).render();
          });
          this.context.memo('button.floatRight', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.floatRight),
                  tooltip: _this.lang.image.floatRight,
                  click: _this.context.createInvokeHandler('editor.floatMe', 'right')
              }).render();
          });
          this.context.memo('button.floatNone', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.rollback),
                  tooltip: _this.lang.image.floatNone,
                  click: _this.context.createInvokeHandler('editor.floatMe', 'none')
              }).render();
          });
          // Remove Buttons
          this.context.memo('button.removeMedia', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.trash),
                  tooltip: _this.lang.image.remove,
                  click: _this.context.createInvokeHandler('editor.removeMedia')
              }).render();
          });
      };
      Buttons.prototype.addLinkPopoverButtons = function () {
          var _this = this;
          this.context.memo('button.linkDialogShow', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.link),
                  tooltip: _this.lang.link.edit,
                  click: _this.context.createInvokeHandler('linkDialog.show')
              }).render();
          });
          this.context.memo('button.unlink', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.unlink),
                  tooltip: _this.lang.link.unlink,
                  click: _this.context.createInvokeHandler('editor.unlink')
              }).render();
          });
      };
      /**
       * table : [
       *  ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
       *  ['delete', ['deleteRow', 'deleteCol', 'deleteTable']]
       * ],
       */
      Buttons.prototype.addTablePopoverButtons = function () {
          var _this = this;
          this.context.memo('button.addRowUp', function () {
              return _this.button({
                  className: 'btn-md',
                  contents: _this.ui.icon(_this.options.icons.rowAbove),
                  tooltip: _this.lang.table.addRowAbove,
                  click: _this.context.createInvokeHandler('editor.addRow', 'top')
              }).render();
          });
          this.context.memo('button.addRowDown', function () {
              return _this.button({
                  className: 'btn-md',
                  contents: _this.ui.icon(_this.options.icons.rowBelow),
                  tooltip: _this.lang.table.addRowBelow,
                  click: _this.context.createInvokeHandler('editor.addRow', 'bottom')
              }).render();
          });
          this.context.memo('button.addColLeft', function () {
              return _this.button({
                  className: 'btn-md',
                  contents: _this.ui.icon(_this.options.icons.colBefore),
                  tooltip: _this.lang.table.addColLeft,
                  click: _this.context.createInvokeHandler('editor.addCol', 'left')
              }).render();
          });
          this.context.memo('button.addColRight', function () {
              return _this.button({
                  className: 'btn-md',
                  contents: _this.ui.icon(_this.options.icons.colAfter),
                  tooltip: _this.lang.table.addColRight,
                  click: _this.context.createInvokeHandler('editor.addCol', 'right')
              }).render();
          });
          this.context.memo('button.deleteRow', function () {
              return _this.button({
                  className: 'btn-md',
                  contents: _this.ui.icon(_this.options.icons.rowRemove),
                  tooltip: _this.lang.table.delRow,
                  click: _this.context.createInvokeHandler('editor.deleteRow')
              }).render();
          });
          this.context.memo('button.deleteCol', function () {
              return _this.button({
                  className: 'btn-md',
                  contents: _this.ui.icon(_this.options.icons.colRemove),
                  tooltip: _this.lang.table.delCol,
                  click: _this.context.createInvokeHandler('editor.deleteCol')
              }).render();
          });
          this.context.memo('button.deleteTable', function () {
              return _this.button({
                  className: 'btn-md',
                  contents: _this.ui.icon(_this.options.icons.trash),
                  tooltip: _this.lang.table.delTable,
                  click: _this.context.createInvokeHandler('editor.deleteTable')
              }).render();
          });
      };
      Buttons.prototype.build = function ($container, groups) {
          for (var groupIdx = 0, groupLen = groups.length; groupIdx < groupLen; groupIdx++) {
              var group = groups[groupIdx];
              var groupName = Array.isArray(group) ? group[0] : group;
              var buttons = Array.isArray(group) ? ((group.length === 1) ? [group[0]] : group[1]) : [group];
              var $group = this.ui.buttonGroup({
                  className: 'note-' + groupName
              }).render();
              for (var idx = 0, len = buttons.length; idx < len; idx++) {
                  var btn = this.context.memo('button.' + buttons[idx]);
                  if (btn) {
                      $group.append(typeof btn === 'function' ? btn() : btn);
                  }
              }
              $group.appendTo($container);
          }
      };
      /**
       * @param {jQuery} [$container]
       */
      Buttons.prototype.updateCurrentStyle = function ($container) {
          var _this = this;
          var $cont = $container || this.$toolbar;
          var styleInfo = this.context.invoke('editor.currentStyle');
          this.updateBtnStates($cont, {
              '.note-btn-bold': function () {
                  return styleInfo['font-bold'] === 'bold';
              },
              '.note-btn-italic': function () {
                  return styleInfo['font-italic'] === 'italic';
              },
              '.note-btn-underline': function () {
                  return styleInfo['font-underline'] === 'underline';
              },
              '.note-btn-subscript': function () {
                  return styleInfo['font-subscript'] === 'subscript';
              },
              '.note-btn-superscript': function () {
                  return styleInfo['font-superscript'] === 'superscript';
              },
              '.note-btn-strikethrough': function () {
                  return styleInfo['font-strikethrough'] === 'strikethrough';
              }
          });
          if (styleInfo['font-family']) {
              var fontNames = styleInfo['font-family'].split(',').map(function (name) {
                  return name.replace(/[\'\"]/g, '')
                      .replace(/\s+$/, '')
                      .replace(/^\s+/, '');
              });
              var fontName_1 = lists.find(fontNames, this.isFontInstalled.bind(this));
              $cont.find('.dropdown-fontname a').each(function (idx, item) {
                  var $item = $$1(item);
                  // always compare string to avoid creating another func.
                  var isChecked = ($item.data('value') + '') === (fontName_1 + '');
                  $item.toggleClass('checked', isChecked);
              });
              $cont.find('.note-current-fontname').text(fontName_1).css('font-family', fontName_1);
          }
          if (styleInfo['font-size']) {
              var fontSize_1 = styleInfo['font-size'];
              $cont.find('.dropdown-fontsize a').each(function (idx, item) {
                  var $item = $$1(item);
                  // always compare with string to avoid creating another func.
                  var isChecked = ($item.data('value') + '') === (fontSize_1 + '');
                  $item.toggleClass('checked', isChecked);
              });
              $cont.find('.note-current-fontsize').text(fontSize_1);
          }
          if (styleInfo['line-height']) {
              var lineHeight_1 = styleInfo['line-height'];
              $cont.find('.dropdown-line-height li a').each(function (idx, item) {
                  // always compare with string to avoid creating another func.
                  var isChecked = ($$1(item).data('value') + '') === (lineHeight_1 + '');
                  _this.className = isChecked ? 'checked' : '';
              });
          }
      };
      Buttons.prototype.updateBtnStates = function ($container, infos) {
          var _this = this;
          $$1.each(infos, function (selector, pred) {
              _this.ui.toggleBtnActive($container.find(selector), pred());
          });
      };
      Buttons.prototype.tableMoveHandler = function (event) {
          var PX_PER_EM = 18;
          var $picker = $$1(event.target.parentNode); // target is mousecatcher
          var $dimensionDisplay = $picker.next();
          var $catcher = $picker.find('.note-dimension-picker-mousecatcher');
          var $highlighted = $picker.find('.note-dimension-picker-highlighted');
          var $unhighlighted = $picker.find('.note-dimension-picker-unhighlighted');
          var posOffset;
          // HTML5 with jQuery - e.offsetX is undefined in Firefox
          if (event.offsetX === undefined) {
              var posCatcher = $$1(event.target).offset();
              posOffset = {
                  x: event.pageX - posCatcher.left,
                  y: event.pageY - posCatcher.top
              };
          }
          else {
              posOffset = {
                  x: event.offsetX,
                  y: event.offsetY
              };
          }
          var dim = {
              c: Math.ceil(posOffset.x / PX_PER_EM) || 1,
              r: Math.ceil(posOffset.y / PX_PER_EM) || 1
          };
          $highlighted.css({ width: dim.c + 'em', height: dim.r + 'em' });
          $catcher.data('value', dim.c + 'x' + dim.r);
          if (dim.c > 3 && dim.c < this.options.insertTableMaxSize.col) {
              $unhighlighted.css({ width: dim.c + 1 + 'em' });
          }
          if (dim.r > 3 && dim.r < this.options.insertTableMaxSize.row) {
              $unhighlighted.css({ height: dim.r + 1 + 'em' });
          }
          $dimensionDisplay.html(dim.c + ' x ' + dim.r);
      };
      return Buttons;
  }());

  var Toolbar = /** @class */ (function () {
      function Toolbar(context) {
          this.context = context;
          this.$window = $$1(window);
          this.$document = $$1(document);
          this.ui = $$1.summernote.ui;
          this.$note = context.layoutInfo.note;
          this.$editor = context.layoutInfo.editor;
          this.$toolbar = context.layoutInfo.toolbar;
          this.$editable = context.layoutInfo.editable;
          this.$statusbar = context.layoutInfo.statusbar;
          this.options = context.options;
          this.isFollowing = false;
          this.followScroll = this.followScroll.bind(this);
      }
      Toolbar.prototype.shouldInitialize = function () {
          return !this.options.airMode;
      };
      Toolbar.prototype.initialize = function () {
          var _this = this;
          this.options.toolbar = this.options.toolbar || [];
          if (!this.options.toolbar.length) {
              this.$toolbar.hide();
          }
          else {
              this.context.invoke('buttons.build', this.$toolbar, this.options.toolbar);
          }
          if (this.options.toolbarContainer) {
              this.$toolbar.appendTo(this.options.toolbarContainer);
          }
          this.changeContainer(false);
          this.$note.on('summernote.keyup summernote.mouseup summernote.change', function () {
              _this.context.invoke('buttons.updateCurrentStyle');
          });
          this.context.invoke('buttons.updateCurrentStyle');
          if (this.options.followingToolbar) {
              this.$window.on('scroll resize', this.followScroll);
          }
      };
      Toolbar.prototype.destroy = function () {
          this.$toolbar.children().remove();
          if (this.options.followingToolbar) {
              this.$window.off('scroll resize', this.followScroll);
          }
      };
      Toolbar.prototype.followScroll = function () {
          if (this.$editor.hasClass('fullscreen')) {
              return false;
          }
          var editorHeight = this.$editor.outerHeight();
          var editorWidth = this.$editor.width();
          var toolbarHeight = this.$toolbar.height();
          var statusbarHeight = this.$statusbar.height();
          // check if the web app is currently using another static bar
          var otherBarHeight = 0;
          if (this.options.otherStaticBar) {
              otherBarHeight = $$1(this.options.otherStaticBar).outerHeight();
          }
          var currentOffset = this.$document.scrollTop();
          var editorOffsetTop = this.$editor.offset().top;
          var editorOffsetBottom = editorOffsetTop + editorHeight;
          var activateOffset = editorOffsetTop - otherBarHeight;
          var deactivateOffsetBottom = editorOffsetBottom - otherBarHeight - toolbarHeight - statusbarHeight;
          if (!this.isFollowing &&
              (currentOffset > activateOffset) && (currentOffset < deactivateOffsetBottom - toolbarHeight)) {
              this.isFollowing = true;
              this.$toolbar.css({
                  position: 'fixed',
                  top: otherBarHeight,
                  width: editorWidth
              });
              this.$editable.css({
                  marginTop: this.$toolbar.height() + 5
              });
          }
          else if (this.isFollowing &&
              ((currentOffset < activateOffset) || (currentOffset > deactivateOffsetBottom))) {
              this.isFollowing = false;
              this.$toolbar.css({
                  position: 'relative',
                  top: 0,
                  width: '100%'
              });
              this.$editable.css({
                  marginTop: ''
              });
          }
      };
      Toolbar.prototype.changeContainer = function (isFullscreen) {
          if (isFullscreen) {
              this.$toolbar.prependTo(this.$editor);
          }
          else {
              if (this.options.toolbarContainer) {
                  this.$toolbar.appendTo(this.options.toolbarContainer);
              }
          }
          this.followScroll();
      };
      Toolbar.prototype.updateFullscreen = function (isFullscreen) {
          this.ui.toggleBtnActive(this.$toolbar.find('.btn-fullscreen'), isFullscreen);
          this.changeContainer(isFullscreen);
      };
      Toolbar.prototype.updateCodeview = function (isCodeview) {
          this.ui.toggleBtnActive(this.$toolbar.find('.btn-codeview'), isCodeview);
          if (isCodeview) {
              this.deactivate();
          }
          else {
              this.activate();
          }
      };
      Toolbar.prototype.activate = function (isIncludeCodeview) {
          var $btn = this.$toolbar.find('button');
          if (!isIncludeCodeview) {
              $btn = $btn.not('.btn-codeview');
          }
          this.ui.toggleBtn($btn, true);
      };
      Toolbar.prototype.deactivate = function (isIncludeCodeview) {
          var $btn = this.$toolbar.find('button');
          if (!isIncludeCodeview) {
              $btn = $btn.not('.btn-codeview');
          }
          this.ui.toggleBtn($btn, false);
      };
      return Toolbar;
  }());

  var LinkDialog = /** @class */ (function () {
      function LinkDialog(context) {
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.$body = $$1(document.body);
          this.$editor = context.layoutInfo.editor;
          this.options = context.options;
          this.lang = this.options.langInfo;
          context.memo('help.linkDialog.show', this.options.langInfo.help['linkDialog.show']);
      }
      LinkDialog.prototype.initialize = function () {
          var $container = this.options.dialogsInBody ? this.$body : this.$editor;
          var body = [
              '<div class="form-group note-form-group">',
              "<label class=\"note-form-label\">" + this.lang.link.textToDisplay + "</label>",
              '<input class="note-link-text form-control note-form-control note-input" type="text" />',
              '</div>',
              '<div class="form-group note-form-group">',
              "<label class=\"note-form-label\">" + this.lang.link.url + "</label>",
              '<input class="note-link-url form-control note-form-control note-input" type="text" value="http://" />',
              '</div>',
              !this.options.disableLinkTarget
                  ? $$1('<div/>').append(this.ui.checkbox({
                      className: 'sn-checkbox-open-in-new-window',
                      text: this.lang.link.openInNewWindow,
                      checked: true
                  }).render()).html()
                  : '',
          ].join('');
          var buttonClass = 'btn btn-primary note-btn note-btn-primary note-link-btn';
          var footer = "<input type=\"button\" href=\"#\" class=\"" + buttonClass + "\" value=\"" + this.lang.link.insert + "\" disabled>";
          this.$dialog = this.ui.dialog({
              className: 'link-dialog',
              title: this.lang.link.insert,
              fade: this.options.dialogsFade,
              body: body,
              footer: footer
          }).render().appendTo($container);
      };
      LinkDialog.prototype.destroy = function () {
          this.ui.hideDialog(this.$dialog);
          this.$dialog.remove();
      };
      LinkDialog.prototype.bindEnterKey = function ($input, $btn) {
          $input.on('keypress', function (event) {
              if (event.keyCode === key.code.ENTER) {
                  event.preventDefault();
                  $btn.trigger('click');
              }
          });
      };
      /**
       * toggle update button
       */
      LinkDialog.prototype.toggleLinkBtn = function ($linkBtn, $linkText, $linkUrl) {
          this.ui.toggleBtn($linkBtn, $linkText.val() && $linkUrl.val());
      };
      /**
       * Show link dialog and set event handlers on dialog controls.
       *
       * @param {Object} linkInfo
       * @return {Promise}
       */
      LinkDialog.prototype.showLinkDialog = function (linkInfo) {
          var _this = this;
          return $$1.Deferred(function (deferred) {
              var $linkText = _this.$dialog.find('.note-link-text');
              var $linkUrl = _this.$dialog.find('.note-link-url');
              var $linkBtn = _this.$dialog.find('.note-link-btn');
              var $openInNewWindow = _this.$dialog
                  .find('.sn-checkbox-open-in-new-window input[type=checkbox]');
              _this.ui.onDialogShown(_this.$dialog, function () {
                  _this.context.triggerEvent('dialog.shown');
                  // If no url was given and given text is valid URL then copy that into URL Field
                  if (!linkInfo.url && func.isValidUrl(linkInfo.text)) {
                      linkInfo.url = linkInfo.text;
                  }
                  $linkText.on('input paste propertychange', function () {
                      // If linktext was modified by input events,
                      // cloning text from linkUrl will be stopped.
                      linkInfo.text = $linkText.val();
                      _this.toggleLinkBtn($linkBtn, $linkText, $linkUrl);
                  }).val(linkInfo.text);
                  $linkUrl.on('input paste propertychange', function () {
                      // Display same text on `Text to display` as default
                      // when linktext has no text
                      if (!linkInfo.text) {
                          $linkText.val($linkUrl.val());
                      }
                      _this.toggleLinkBtn($linkBtn, $linkText, $linkUrl);
                  }).val(linkInfo.url);
                  if (!env.isSupportTouch) {
                      $linkUrl.trigger('focus');
                  }
                  _this.toggleLinkBtn($linkBtn, $linkText, $linkUrl);
                  _this.bindEnterKey($linkUrl, $linkBtn);
                  _this.bindEnterKey($linkText, $linkBtn);
                  var isNewWindowChecked = linkInfo.isNewWindow !== undefined
                      ? linkInfo.isNewWindow : _this.context.options.linkTargetBlank;
                  $openInNewWindow.prop('checked', isNewWindowChecked);
                  $linkBtn.one('click', function (event) {
                      event.preventDefault();
                      deferred.resolve({
                          range: linkInfo.range,
                          url: $linkUrl.val(),
                          text: $linkText.val(),
                          isNewWindow: $openInNewWindow.is(':checked')
                      });
                      _this.ui.hideDialog(_this.$dialog);
                  });
              });
              _this.ui.onDialogHidden(_this.$dialog, function () {
                  // detach events
                  $linkText.off();
                  $linkUrl.off();
                  $linkBtn.off();
                  if (deferred.state() === 'pending') {
                      deferred.reject();
                  }
              });
              _this.ui.showDialog(_this.$dialog);
          }).promise();
      };
      /**
       * @param {Object} layoutInfo
       */
      LinkDialog.prototype.show = function () {
          var _this = this;
          var linkInfo = this.context.invoke('editor.getLinkInfo');
          this.context.invoke('editor.saveRange');
          this.showLinkDialog(linkInfo).then(function (linkInfo) {
              _this.context.invoke('editor.restoreRange');
              _this.context.invoke('editor.createLink', linkInfo);
          }).fail(function () {
              _this.context.invoke('editor.restoreRange');
          });
      };
      return LinkDialog;
  }());

  var LinkPopover = /** @class */ (function () {
      function LinkPopover(context) {
          var _this = this;
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.options = context.options;
          this.events = {
              'summernote.keyup summernote.mouseup summernote.change summernote.scroll': function () {
                  _this.update();
              },
              'summernote.disable summernote.dialog.shown': function () {
                  _this.hide();
              }
          };
      }
      LinkPopover.prototype.shouldInitialize = function () {
          return !lists.isEmpty(this.options.popover.link);
      };
      LinkPopover.prototype.initialize = function () {
          this.$popover = this.ui.popover({
              className: 'note-link-popover',
              callback: function ($node) {
                  var $content = $node.find('.popover-content,.note-popover-content');
                  $content.prepend('<span><a target="_blank"></a>&nbsp;</span>');
              }
          }).render().appendTo(this.options.container);
          var $content = this.$popover.find('.popover-content,.note-popover-content');
          this.context.invoke('buttons.build', $content, this.options.popover.link);
      };
      LinkPopover.prototype.destroy = function () {
          this.$popover.remove();
      };
      LinkPopover.prototype.update = function () {
          // Prevent focusing on editable when invoke('code') is executed
          if (!this.context.invoke('editor.hasFocus')) {
              this.hide();
              return;
          }
          var rng = this.context.invoke('editor.getLastRange');
          if (rng.isCollapsed() && rng.isOnAnchor()) {
              var anchor = dom.ancestor(rng.sc, dom.isAnchor);
              var href = $$1(anchor).attr('href');
              this.$popover.find('a').attr('href', href).html(href);
              var pos = dom.posFromPlaceholder(anchor);
              this.$popover.css({
                  display: 'block',
                  left: pos.left,
                  top: pos.top
              });
          }
          else {
              this.hide();
          }
      };
      LinkPopover.prototype.hide = function () {
          this.$popover.hide();
      };
      return LinkPopover;
  }());

  var ImageDialog = /** @class */ (function () {
      function ImageDialog(context) {
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.$body = $$1(document.body);
          this.$editor = context.layoutInfo.editor;
          this.options = context.options;
          this.lang = this.options.langInfo;
      }
      ImageDialog.prototype.initialize = function () {
          var $container = this.options.dialogsInBody ? this.$body : this.$editor;
          var imageLimitation = '';
          if (this.options.maximumImageFileSize) {
              var unit = Math.floor(Math.log(this.options.maximumImageFileSize) / Math.log(1024));
              var readableSize = (this.options.maximumImageFileSize / Math.pow(1024, unit)).toFixed(2) * 1 +
                  ' ' + ' KMGTP'[unit] + 'B';
              imageLimitation = "<small>" + (this.lang.image.maximumFileSize + ' : ' + readableSize) + "</small>";
          }
          var body = [
              '<div class="form-group note-form-group note-group-select-from-files">',
              '<label class="note-form-label">' + this.lang.image.selectFromFiles + '</label>',
              '<input class="note-image-input form-control-file note-form-control note-input" ',
              ' type="file" name="files" accept="image/*" multiple="multiple" />',
              imageLimitation,
              '</div>',
              '<div class="form-group note-group-image-url" style="overflow:auto;">',
              '<label class="note-form-label">' + this.lang.image.url + '</label>',
              '<input class="note-image-url form-control note-form-control note-input ',
              ' col-md-12" type="text" />',
              '</div>',
          ].join('');
          var buttonClass = 'btn btn-primary note-btn note-btn-primary note-image-btn';
          var footer = "<input type=\"button\" href=\"#\" class=\"" + buttonClass + "\" value=\"" + this.lang.image.insert + "\" disabled>";
          this.$dialog = this.ui.dialog({
              title: this.lang.image.insert,
              fade: this.options.dialogsFade,
              body: body,
              footer: footer
          }).render().appendTo($container);
      };
      ImageDialog.prototype.destroy = function () {
          this.ui.hideDialog(this.$dialog);
          this.$dialog.remove();
      };
      ImageDialog.prototype.bindEnterKey = function ($input, $btn) {
          $input.on('keypress', function (event) {
              if (event.keyCode === key.code.ENTER) {
                  event.preventDefault();
                  $btn.trigger('click');
              }
          });
      };
      ImageDialog.prototype.show = function () {
          var _this = this;
          this.context.invoke('editor.saveRange');
          this.showImageDialog().then(function (data) {
              // [workaround] hide dialog before restore range for IE range focus
              _this.ui.hideDialog(_this.$dialog);
              _this.context.invoke('editor.restoreRange');
              if (typeof data === 'string') { // image url
                  // If onImageLinkInsert set,
                  if (_this.options.callbacks.onImageLinkInsert) {
                      _this.context.triggerEvent('image.link.insert', data);
                  }
                  else {
                      _this.context.invoke('editor.insertImage', data);
                  }
              }
              else { // array of files
                  _this.context.invoke('editor.insertImagesOrCallback', data);
              }
          }).fail(function () {
              _this.context.invoke('editor.restoreRange');
          });
      };
      /**
       * show image dialog
       *
       * @param {jQuery} $dialog
       * @return {Promise}
       */
      ImageDialog.prototype.showImageDialog = function () {
          var _this = this;
          return $$1.Deferred(function (deferred) {
              var $imageInput = _this.$dialog.find('.note-image-input');
              var $imageUrl = _this.$dialog.find('.note-image-url');
              var $imageBtn = _this.$dialog.find('.note-image-btn');
              _this.ui.onDialogShown(_this.$dialog, function () {
                  _this.context.triggerEvent('dialog.shown');
                  // Cloning imageInput to clear element.
                  $imageInput.replaceWith($imageInput.clone().on('change', function (event) {
                      deferred.resolve(event.target.files || event.target.value);
                  }).val(''));
                  $imageUrl.on('input paste propertychange', function () {
                      _this.ui.toggleBtn($imageBtn, $imageUrl.val());
                  }).val('');
                  if (!env.isSupportTouch) {
                      $imageUrl.trigger('focus');
                  }
                  $imageBtn.click(function (event) {
                      event.preventDefault();
                      deferred.resolve($imageUrl.val());
                  });
                  _this.bindEnterKey($imageUrl, $imageBtn);
              });
              _this.ui.onDialogHidden(_this.$dialog, function () {
                  $imageInput.off();
                  $imageUrl.off();
                  $imageBtn.off();
                  if (deferred.state() === 'pending') {
                      deferred.reject();
                  }
              });
              _this.ui.showDialog(_this.$dialog);
          });
      };
      return ImageDialog;
  }());

  /**
   * Image popover module
   *  mouse events that show/hide popover will be handled by Handle.js.
   *  Handle.js will receive the events and invoke 'imagePopover.update'.
   */
  var ImagePopover = /** @class */ (function () {
      function ImagePopover(context) {
          var _this = this;
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.editable = context.layoutInfo.editable[0];
          this.options = context.options;
          this.events = {
              'summernote.disable': function () {
                  _this.hide();
              }
          };
      }
      ImagePopover.prototype.shouldInitialize = function () {
          return !lists.isEmpty(this.options.popover.image);
      };
      ImagePopover.prototype.initialize = function () {
          this.$popover = this.ui.popover({
              className: 'note-image-popover'
          }).render().appendTo(this.options.container);
          var $content = this.$popover.find('.popover-content,.note-popover-content');
          this.context.invoke('buttons.build', $content, this.options.popover.image);
      };
      ImagePopover.prototype.destroy = function () {
          this.$popover.remove();
      };
      ImagePopover.prototype.update = function (target, event) {
          if (dom.isImg(target)) {
              var pos = dom.posFromPlaceholder(target);
              var posEditor = dom.posFromPlaceholder(this.editable);
              this.$popover.css({
                  display: 'block',
                  left: this.options.popatmouse ? event.pageX - 20 : pos.left,
                  top: this.options.popatmouse ? event.pageY : Math.min(pos.top, posEditor.top)
              });
          }
          else {
              this.hide();
          }
      };
      ImagePopover.prototype.hide = function () {
          this.$popover.hide();
      };
      return ImagePopover;
  }());

  var TablePopover = /** @class */ (function () {
      function TablePopover(context) {
          var _this = this;
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.options = context.options;
          this.events = {
              'summernote.mousedown': function (we, e) {
                  _this.update(e.target);
              },
              'summernote.keyup summernote.scroll summernote.change': function () {
                  _this.update();
              },
              'summernote.disable': function () {
                  _this.hide();
              }
          };
      }
      TablePopover.prototype.shouldInitialize = function () {
          return !lists.isEmpty(this.options.popover.table);
      };
      TablePopover.prototype.initialize = function () {
          this.$popover = this.ui.popover({
              className: 'note-table-popover'
          }).render().appendTo(this.options.container);
          var $content = this.$popover.find('.popover-content,.note-popover-content');
          this.context.invoke('buttons.build', $content, this.options.popover.table);
          // [workaround] Disable Firefox's default table editor
          if (env.isFF) {
              document.execCommand('enableInlineTableEditing', false, false);
          }
      };
      TablePopover.prototype.destroy = function () {
          this.$popover.remove();
      };
      TablePopover.prototype.update = function (target) {
          if (this.context.isDisabled()) {
              return false;
          }
          var isCell = dom.isCell(target);
          if (isCell) {
              var pos = dom.posFromPlaceholder(target);
              this.$popover.css({
                  display: 'block',
                  left: pos.left,
                  top: pos.top
              });
          }
          else {
              this.hide();
          }
          return isCell;
      };
      TablePopover.prototype.hide = function () {
          this.$popover.hide();
      };
      return TablePopover;
  }());

  var VideoDialog = /** @class */ (function () {
      function VideoDialog(context) {
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.$body = $$1(document.body);
          this.$editor = context.layoutInfo.editor;
          this.options = context.options;
          this.lang = this.options.langInfo;
      }
      VideoDialog.prototype.initialize = function () {
          var $container = this.options.dialogsInBody ? this.$body : this.$editor;
          var body = [
              '<div class="form-group note-form-group row-fluid">',
              "<label class=\"note-form-label\">" + this.lang.video.url + " <small class=\"text-muted\">" + this.lang.video.providers + "</small></label>",
              '<input class="note-video-url form-control note-form-control note-input" type="text" />',
              '</div>',
          ].join('');
          var buttonClass = 'btn btn-primary note-btn note-btn-primary note-video-btn';
          var footer = "<input type=\"button\" href=\"#\" class=\"" + buttonClass + "\" value=\"" + this.lang.video.insert + "\" disabled>";
          this.$dialog = this.ui.dialog({
              title: this.lang.video.insert,
              fade: this.options.dialogsFade,
              body: body,
              footer: footer
          }).render().appendTo($container);
      };
      VideoDialog.prototype.destroy = function () {
          this.ui.hideDialog(this.$dialog);
          this.$dialog.remove();
      };
      VideoDialog.prototype.bindEnterKey = function ($input, $btn) {
          $input.on('keypress', function (event) {
              if (event.keyCode === key.code.ENTER) {
                  event.preventDefault();
                  $btn.trigger('click');
              }
          });
      };
      VideoDialog.prototype.createVideoNode = function (url) {
          // video url patterns(youtube, instagram, vimeo, dailymotion, youku, mp4, ogg, webm)
          var ytRegExp = /\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w|-]{11})(?:(?:[\?&]t=)(\S+))?$/;
          var ytRegExpForStart = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/;
          var ytMatch = url.match(ytRegExp);
          var igRegExp = /(?:www\.|\/\/)instagram\.com\/p\/(.[a-zA-Z0-9_-]*)/;
          var igMatch = url.match(igRegExp);
          var vRegExp = /\/\/vine\.co\/v\/([a-zA-Z0-9]+)/;
          var vMatch = url.match(vRegExp);
          var vimRegExp = /\/\/(player\.)?vimeo\.com\/([a-z]*\/)*(\d+)[?]?.*/;
          var vimMatch = url.match(vimRegExp);
          var dmRegExp = /.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/;
          var dmMatch = url.match(dmRegExp);
          var youkuRegExp = /\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/;
          var youkuMatch = url.match(youkuRegExp);
          var qqRegExp = /\/\/v\.qq\.com.*?vid=(.+)/;
          var qqMatch = url.match(qqRegExp);
          var qqRegExp2 = /\/\/v\.qq\.com\/x?\/?(page|cover).*?\/([^\/]+)\.html\??.*/;
          var qqMatch2 = url.match(qqRegExp2);
          var mp4RegExp = /^.+.(mp4|m4v)$/;
          var mp4Match = url.match(mp4RegExp);
          var oggRegExp = /^.+.(ogg|ogv)$/;
          var oggMatch = url.match(oggRegExp);
          var webmRegExp = /^.+.(webm)$/;
          var webmMatch = url.match(webmRegExp);
          var fbRegExp = /(?:www\.|\/\/)facebook\.com\/([^\/]+)\/videos\/([0-9]+)/;
          var fbMatch = url.match(fbRegExp);
          var $video;
          if (ytMatch && ytMatch[1].length === 11) {
              var youtubeId = ytMatch[1];
              var start = 0;
              if (typeof ytMatch[2] !== 'undefined') {
                  var ytMatchForStart = ytMatch[2].match(ytRegExpForStart);
                  if (ytMatchForStart) {
                      for (var n = [3600, 60, 1], i = 0, r = n.length; i < r; i++) {
                          start += (typeof ytMatchForStart[i + 1] !== 'undefined' ? n[i] * parseInt(ytMatchForStart[i + 1], 10) : 0);
                      }
                  }
              }
              $video = $$1('<iframe>')
                  .attr('frameborder', 0)
                  .attr('src', '//www.youtube.com/embed/' + youtubeId + (start > 0 ? '?start=' + start : ''))
                  .attr('width', '640').attr('height', '360');
          }
          else if (igMatch && igMatch[0].length) {
              $video = $$1('<iframe>')
                  .attr('frameborder', 0)
                  .attr('src', 'https://instagram.com/p/' + igMatch[1] + '/embed/')
                  .attr('width', '612').attr('height', '710')
                  .attr('scrolling', 'no')
                  .attr('allowtransparency', 'true');
          }
          else if (vMatch && vMatch[0].length) {
              $video = $$1('<iframe>')
                  .attr('frameborder', 0)
                  .attr('src', vMatch[0] + '/embed/simple')
                  .attr('width', '600').attr('height', '600')
                  .attr('class', 'vine-embed');
          }
          else if (vimMatch && vimMatch[3].length) {
              $video = $$1('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>')
                  .attr('frameborder', 0)
                  .attr('src', '//player.vimeo.com/video/' + vimMatch[3])
                  .attr('width', '640').attr('height', '360');
          }
          else if (dmMatch && dmMatch[2].length) {
              $video = $$1('<iframe>')
                  .attr('frameborder', 0)
                  .attr('src', '//www.dailymotion.com/embed/video/' + dmMatch[2])
                  .attr('width', '640').attr('height', '360');
          }
          else if (youkuMatch && youkuMatch[1].length) {
              $video = $$1('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>')
                  .attr('frameborder', 0)
                  .attr('height', '498')
                  .attr('width', '510')
                  .attr('src', '//player.youku.com/embed/' + youkuMatch[1]);
          }
          else if ((qqMatch && qqMatch[1].length) || (qqMatch2 && qqMatch2[2].length)) {
              var vid = ((qqMatch && qqMatch[1].length) ? qqMatch[1] : qqMatch2[2]);
              $video = $$1('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>')
                  .attr('frameborder', 0)
                  .attr('height', '310')
                  .attr('width', '500')
                  .attr('src', 'http://v.qq.com/iframe/player.html?vid=' + vid + '&amp;auto=0');
          }
          else if (mp4Match || oggMatch || webmMatch) {
              $video = $$1('<video controls>')
                  .attr('src', url)
                  .attr('width', '640').attr('height', '360');
          }
          else if (fbMatch && fbMatch[0].length) {
              $video = $$1('<iframe>')
                  .attr('frameborder', 0)
                  .attr('src', 'https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent(fbMatch[0]) + '&show_text=0&width=560')
                  .attr('width', '560').attr('height', '301')
                  .attr('scrolling', 'no')
                  .attr('allowtransparency', 'true');
          }
          else {
              // this is not a known video link. Now what, Cat? Now what?
              return false;
          }
          $video.addClass('note-video-clip');
          return $video[0];
      };
      VideoDialog.prototype.show = function () {
          var _this = this;
          var text = this.context.invoke('editor.getSelectedText');
          this.context.invoke('editor.saveRange');
          this.showVideoDialog(text).then(function (url) {
              // [workaround] hide dialog before restore range for IE range focus
              _this.ui.hideDialog(_this.$dialog);
              _this.context.invoke('editor.restoreRange');
              // build node
              var $node = _this.createVideoNode(url);
              if ($node) {
                  // insert video node
                  _this.context.invoke('editor.insertNode', $node);
              }
          }).fail(function () {
              _this.context.invoke('editor.restoreRange');
          });
      };
      /**
       * show image dialog
       *
       * @param {jQuery} $dialog
       * @return {Promise}
       */
      VideoDialog.prototype.showVideoDialog = function (text) {
          var _this = this;
          return $$1.Deferred(function (deferred) {
              var $videoUrl = _this.$dialog.find('.note-video-url');
              var $videoBtn = _this.$dialog.find('.note-video-btn');
              _this.ui.onDialogShown(_this.$dialog, function () {
                  _this.context.triggerEvent('dialog.shown');
                  $videoUrl.on('input paste propertychange', function () {
                      _this.ui.toggleBtn($videoBtn, $videoUrl.val());
                  });
                  if (!env.isSupportTouch) {
                      $videoUrl.trigger('focus');
                  }
                  $videoBtn.click(function (event) {
                      event.preventDefault();
                      deferred.resolve($videoUrl.val());
                  });
                  _this.bindEnterKey($videoUrl, $videoBtn);
              });
              _this.ui.onDialogHidden(_this.$dialog, function () {
                  $videoUrl.off();
                  $videoBtn.off();
                  if (deferred.state() === 'pending') {
                      deferred.reject();
                  }
              });
              _this.ui.showDialog(_this.$dialog);
          });
      };
      return VideoDialog;
  }());

  var HelpDialog = /** @class */ (function () {
      function HelpDialog(context) {
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.$body = $$1(document.body);
          this.$editor = context.layoutInfo.editor;
          this.options = context.options;
          this.lang = this.options.langInfo;
      }
      HelpDialog.prototype.initialize = function () {
          var $container = this.options.dialogsInBody ? this.$body : this.$editor;
          var body = [
              '<p class="text-center">',
              '<a href="http://summernote.org/" target="_blank">Summernote 0.8.12</a> · ',
              '<a href="https://github.com/summernote/summernote" target="_blank">Project</a> · ',
              '<a href="https://github.com/summernote/summernote/issues" target="_blank">Issues</a>',
              '</p>',
          ].join('');
          this.$dialog = this.ui.dialog({
              title: this.lang.options.help,
              fade: this.options.dialogsFade,
              body: this.createShortcutList(),
              footer: body,
              callback: function ($node) {
                  $node.find('.modal-body,.note-modal-body').css({
                      'max-height': 300,
                      'overflow': 'scroll'
                  });
              }
          }).render().appendTo($container);
      };
      HelpDialog.prototype.destroy = function () {
          this.ui.hideDialog(this.$dialog);
          this.$dialog.remove();
      };
      HelpDialog.prototype.createShortcutList = function () {
          var _this = this;
          var keyMap = this.options.keyMap[env.isMac ? 'mac' : 'pc'];
          return Object.keys(keyMap).map(function (key) {
              var command = keyMap[key];
              var $row = $$1('<div><div class="help-list-item"/></div>');
              $row.append($$1('<label><kbd>' + key + '</kdb></label>').css({
                  'width': 180,
                  'margin-right': 10
              })).append($$1('<span/>').html(_this.context.memo('help.' + command) || command));
              return $row.html();
          }).join('');
      };
      /**
       * show help dialog
       *
       * @return {Promise}
       */
      HelpDialog.prototype.showHelpDialog = function () {
          var _this = this;
          return $$1.Deferred(function (deferred) {
              _this.ui.onDialogShown(_this.$dialog, function () {
                  _this.context.triggerEvent('dialog.shown');
                  deferred.resolve();
              });
              _this.ui.showDialog(_this.$dialog);
          }).promise();
      };
      HelpDialog.prototype.show = function () {
          var _this = this;
          this.context.invoke('editor.saveRange');
          this.showHelpDialog().then(function () {
              _this.context.invoke('editor.restoreRange');
          });
      };
      return HelpDialog;
  }());

  var AIR_MODE_POPOVER_X_OFFSET = 20;
  var AirPopover = /** @class */ (function () {
      function AirPopover(context) {
          var _this = this;
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.options = context.options;
          this.events = {
              'summernote.keyup summernote.mouseup summernote.scroll': function () {
                  _this.update();
              },
              'summernote.disable summernote.change summernote.dialog.shown': function () {
                  _this.hide();
              },
              'summernote.focusout': function (we, e) {
                  // [workaround] Firefox doesn't support relatedTarget on focusout
                  //  - Ignore hide action on focus out in FF.
                  if (env.isFF) {
                      return;
                  }
                  if (!e.relatedTarget || !dom.ancestor(e.relatedTarget, func.eq(_this.$popover[0]))) {
                      _this.hide();
                  }
              }
          };
      }
      AirPopover.prototype.shouldInitialize = function () {
          return this.options.airMode && !lists.isEmpty(this.options.popover.air);
      };
      AirPopover.prototype.initialize = function () {
          this.$popover = this.ui.popover({
              className: 'note-air-popover'
          }).render().appendTo(this.options.container);
          var $content = this.$popover.find('.popover-content');
          this.context.invoke('buttons.build', $content, this.options.popover.air);
      };
      AirPopover.prototype.destroy = function () {
          this.$popover.remove();
      };
      AirPopover.prototype.update = function () {
          var styleInfo = this.context.invoke('editor.currentStyle');
          if (styleInfo.range && !styleInfo.range.isCollapsed()) {
              var rect = lists.last(styleInfo.range.getClientRects());
              if (rect) {
                  var bnd = func.rect2bnd(rect);
                  this.$popover.css({
                      display: 'block',
                      left: Math.max(bnd.left + bnd.width / 2, 0) - AIR_MODE_POPOVER_X_OFFSET,
                      top: bnd.top + bnd.height
                  });
                  this.context.invoke('buttons.updateCurrentStyle', this.$popover);
              }
          }
          else {
              this.hide();
          }
      };
      AirPopover.prototype.hide = function () {
          this.$popover.hide();
      };
      return AirPopover;
  }());

  var POPOVER_DIST = 5;
  var HintPopover = /** @class */ (function () {
      function HintPopover(context) {
          var _this = this;
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.$editable = context.layoutInfo.editable;
          this.options = context.options;
          this.hint = this.options.hint || [];
          this.direction = this.options.hintDirection || 'bottom';
          this.hints = Array.isArray(this.hint) ? this.hint : [this.hint];
          this.events = {
              'summernote.keyup': function (we, e) {
                  if (!e.isDefaultPrevented()) {
                      _this.handleKeyup(e);
                  }
              },
              'summernote.keydown': function (we, e) {
                  _this.handleKeydown(e);
              },
              'summernote.disable summernote.dialog.shown': function () {
                  _this.hide();
              }
          };
      }
      HintPopover.prototype.shouldInitialize = function () {
          return this.hints.length > 0;
      };
      HintPopover.prototype.initialize = function () {
          var _this = this;
          this.lastWordRange = null;
          this.$popover = this.ui.popover({
              className: 'note-hint-popover',
              hideArrow: true,
              direction: ''
          }).render().appendTo(this.options.container);
          this.$popover.hide();
          this.$content = this.$popover.find('.popover-content,.note-popover-content');
          this.$content.on('click', '.note-hint-item', function (e) {
              _this.$content.find('.active').removeClass('active');
              $$1(e.currentTarget).addClass('active');
              _this.replace();
          });
      };
      HintPopover.prototype.destroy = function () {
          this.$popover.remove();
      };
      HintPopover.prototype.selectItem = function ($item) {
          this.$content.find('.active').removeClass('active');
          $item.addClass('active');
          this.$content[0].scrollTop = $item[0].offsetTop - (this.$content.innerHeight() / 2);
      };
      HintPopover.prototype.moveDown = function () {
          var $current = this.$content.find('.note-hint-item.active');
          var $next = $current.next();
          if ($next.length) {
              this.selectItem($next);
          }
          else {
              var $nextGroup = $current.parent().next();
              if (!$nextGroup.length) {
                  $nextGroup = this.$content.find('.note-hint-group').first();
              }
              this.selectItem($nextGroup.find('.note-hint-item').first());
          }
      };
      HintPopover.prototype.moveUp = function () {
          var $current = this.$content.find('.note-hint-item.active');
          var $prev = $current.prev();
          if ($prev.length) {
              this.selectItem($prev);
          }
          else {
              var $prevGroup = $current.parent().prev();
              if (!$prevGroup.length) {
                  $prevGroup = this.$content.find('.note-hint-group').last();
              }
              this.selectItem($prevGroup.find('.note-hint-item').last());
          }
      };
      HintPopover.prototype.replace = function () {
          var $item = this.$content.find('.note-hint-item.active');
          if ($item.length) {
              var node = this.nodeFromItem($item);
              // XXX: consider to move codes to editor for recording redo/undo.
              this.lastWordRange.insertNode(node);
              range.createFromNode(node).collapse().select();
              this.lastWordRange = null;
              this.hide();
              this.context.triggerEvent('change', this.$editable.html(), this.$editable[0]);
              this.context.invoke('editor.focus');
          }
      };
      HintPopover.prototype.nodeFromItem = function ($item) {
          var hint = this.hints[$item.data('index')];
          var item = $item.data('item');
          var node = hint.content ? hint.content(item) : item;
          if (typeof node === 'string') {
              node = dom.createText(node);
          }
          return node;
      };
      HintPopover.prototype.createItemTemplates = function (hintIdx, items) {
          var hint = this.hints[hintIdx];
          return items.map(function (item, idx) {
              var $item = $$1('<div class="note-hint-item"/>');
              $item.append(hint.template ? hint.template(item) : item + '');
              $item.data({
                  'index': hintIdx,
                  'item': item
              });
              return $item;
          });
      };
      HintPopover.prototype.handleKeydown = function (e) {
          if (!this.$popover.is(':visible')) {
              return;
          }
          if (e.keyCode === key.code.ENTER) {
              e.preventDefault();
              this.replace();
          }
          else if (e.keyCode === key.code.UP) {
              e.preventDefault();
              this.moveUp();
          }
          else if (e.keyCode === key.code.DOWN) {
              e.preventDefault();
              this.moveDown();
          }
      };
      HintPopover.prototype.searchKeyword = function (index, keyword, callback) {
          var hint = this.hints[index];
          if (hint && hint.match.test(keyword) && hint.search) {
              var matches = hint.match.exec(keyword);
              hint.search(matches[1], callback);
          }
          else {
              callback();
          }
      };
      HintPopover.prototype.createGroup = function (idx, keyword) {
          var _this = this;
          var $group = $$1('<div class="note-hint-group note-hint-group-' + idx + '"/>');
          this.searchKeyword(idx, keyword, function (items) {
              items = items || [];
              if (items.length) {
                  $group.html(_this.createItemTemplates(idx, items));
                  _this.show();
              }
          });
          return $group;
      };
      HintPopover.prototype.handleKeyup = function (e) {
          var _this = this;
          if (!lists.contains([key.code.ENTER, key.code.UP, key.code.DOWN], e.keyCode)) {
              var wordRange = this.context.invoke('editor.getLastRange').getWordRange();
              var keyword_1 = wordRange.toString();
              if (this.hints.length && keyword_1) {
                  this.$content.empty();
                  var bnd = func.rect2bnd(lists.last(wordRange.getClientRects()));
                  if (bnd) {
                      this.$popover.hide();
                      this.lastWordRange = wordRange;
                      this.hints.forEach(function (hint, idx) {
                          if (hint.match.test(keyword_1)) {
                              _this.createGroup(idx, keyword_1).appendTo(_this.$content);
                          }
                      });
                      // select first .note-hint-item
                      this.$content.find('.note-hint-item:first').addClass('active');
                      // set position for popover after group is created
                      if (this.direction === 'top') {
                          this.$popover.css({
                              left: bnd.left,
                              top: bnd.top - this.$popover.outerHeight() - POPOVER_DIST
                          });
                      }
                      else {
                          this.$popover.css({
                              left: bnd.left,
                              top: bnd.top + bnd.height + POPOVER_DIST
                          });
                      }
                  }
              }
              else {
                  this.hide();
              }
          }
      };
      HintPopover.prototype.show = function () {
          this.$popover.show();
      };
      HintPopover.prototype.hide = function () {
          this.$popover.hide();
      };
      return HintPopover;
  }());

  $$1.summernote = $$1.extend($$1.summernote, {
      version: '0.8.12',
      plugins: {},
      dom: dom,
      range: range,
      options: {
          langInfo: $$1.summernote.lang['en-US'],
          modules: {
              'editor': Editor,
              'clipboard': Clipboard,
              'dropzone': Dropzone,
              'codeview': CodeView,
              'statusbar': Statusbar,
              'fullscreen': Fullscreen,
              'handle': Handle,
              // FIXME: HintPopover must be front of autolink
              //  - Script error about range when Enter key is pressed on hint popover
              'hintPopover': HintPopover,
              'autoLink': AutoLink,
              'autoSync': AutoSync,
              'autoReplace': AutoReplace,
              'placeholder': Placeholder,
              'buttons': Buttons,
              'toolbar': Toolbar,
              'linkDialog': LinkDialog,
              'linkPopover': LinkPopover,
              'imageDialog': ImageDialog,
              'imagePopover': ImagePopover,
              'tablePopover': TablePopover,
              'videoDialog': VideoDialog,
              'helpDialog': HelpDialog,
              'airPopover': AirPopover
          },
          buttons: {},
          lang: 'en-US',
          followingToolbar: false,
          otherStaticBar: '',
          // toolbar
          toolbar: [
              ['style', ['style']],
              ['font', ['bold', 'underline', 'clear']],
              ['fontname', ['fontname']],
              ['color', ['color']],
              ['para', ['ul', 'ol', 'paragraph']],
              ['table', ['table']],
              ['insert', ['link', 'picture', 'video']],
              ['view', ['fullscreen', 'codeview', 'help']],
          ],
          // popover
          popatmouse: true,
          popover: {
              image: [
                  ['resize', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
                  ['float', ['floatLeft', 'floatRight', 'floatNone']],
                  ['remove', ['removeMedia']],
              ],
              link: [
                  ['link', ['linkDialogShow', 'unlink']],
              ],
              table: [
                  ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
                  ['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
              ],
              air: [
                  ['color', ['color']],
                  ['font', ['bold', 'underline', 'clear']],
                  ['para', ['ul', 'paragraph']],
                  ['table', ['table']],
                  ['insert', ['link', 'picture']],
              ]
          },
          // air mode: inline editor
          airMode: false,
          width: null,
          height: null,
          linkTargetBlank: true,
          focus: false,
          tabSize: 4,
          styleWithSpan: true,
          shortcuts: true,
          textareaAutoSync: true,
          hintDirection: 'bottom',
          tooltip: 'auto',
          container: 'body',
          maxTextLength: 0,
          blockquoteBreakingLevel: 2,
          spellCheck: true,
          styleTags: ['p', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
          fontNames: [
              'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New',
              'Helvetica Neue', 'Helvetica', 'Impact', 'Lucida Grande',
              'Tahoma', 'Times New Roman', 'Verdana',
          ],
          fontNamesIgnoreCheck: [],
          fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36'],
          // pallete colors(n x n)
          colors: [
              ['#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#F7F7F7', '#FFFFFF'],
              ['#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF'],
              ['#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE'],
              ['#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD'],
              ['#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5'],
              ['#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B'],
              ['#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842'],
              ['#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031'],
          ],
          // http://chir.ag/projects/name-that-color/
          colorsName: [
              ['Black', 'Tundora', 'Dove Gray', 'Star Dust', 'Pale Slate', 'Gallery', 'Alabaster', 'White'],
              ['Red', 'Orange Peel', 'Yellow', 'Green', 'Cyan', 'Blue', 'Electric Violet', 'Magenta'],
              ['Azalea', 'Karry', 'Egg White', 'Zanah', 'Botticelli', 'Tropical Blue', 'Mischka', 'Twilight'],
              ['Tonys Pink', 'Peach Orange', 'Cream Brulee', 'Sprout', 'Casper', 'Perano', 'Cold Purple', 'Careys Pink'],
              ['Mandy', 'Rajah', 'Dandelion', 'Olivine', 'Gulf Stream', 'Viking', 'Blue Marguerite', 'Puce'],
              ['Guardsman Red', 'Fire Bush', 'Golden Dream', 'Chelsea Cucumber', 'Smalt Blue', 'Boston Blue', 'Butterfly Bush', 'Cadillac'],
              ['Sangria', 'Mai Tai', 'Buddha Gold', 'Forest Green', 'Eden', 'Venice Blue', 'Meteorite', 'Claret'],
              ['Rosewood', 'Cinnamon', 'Olive', 'Parsley', 'Tiber', 'Midnight Blue', 'Valentino', 'Loulou'],
          ],
          colorButton: {
              foreColor: '#000000',
              backColor: '#FFFF00'
          },
          lineHeights: ['1.0', '1.2', '1.4', '1.5', '1.6', '1.8', '2.0', '3.0'],
          tableClassName: 'table table-bordered',
          insertTableMaxSize: {
              col: 10,
              row: 10
          },
          dialogsInBody: false,
          dialogsFade: false,
          maximumImageFileSize: null,
          callbacks: {
              onBeforeCommand: null,
              onBlur: null,
              onBlurCodeview: null,
              onChange: null,
              onChangeCodeview: null,
              onDialogShown: null,
              onEnter: null,
              onFocus: null,
              onImageLinkInsert: null,
              onImageUpload: null,
              onImageUploadError: null,
              onInit: null,
              onKeydown: null,
              onKeyup: null,
              onMousedown: null,
              onMouseup: null,
              onPaste: null,
              onScroll: null
          },
          codemirror: {
              mode: 'text/html',
              htmlMode: true,
              lineNumbers: true
          },
          codeviewFilter: false,
          codeviewFilterRegex: /<\/*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|ilayer|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|t(?:itle|extarea)|xml)[^>]*?>/gi,
          codeviewIframeFilter: true,
          codeviewIframeWhitelistSrc: [],
          codeviewIframeWhitelistSrcBase: [
              'www.youtube.com',
              'www.youtube-nocookie.com',
              'www.facebook.com',
              'vine.co',
              'instagram.com',
              'player.vimeo.com',
              'www.dailymotion.com',
              'player.youku.com',
              'v.qq.com',
          ],
          keyMap: {
              pc: {
                  'ENTER': 'insertParagraph',
                  'CTRL+Z': 'undo',
                  'CTRL+Y': 'redo',
                  'TAB': 'tab',
                  'SHIFT+TAB': 'untab',
                  'CTRL+B': 'bold',
                  'CTRL+I': 'italic',
                  'CTRL+U': 'underline',
                  'CTRL+SHIFT+S': 'strikethrough',
                  'CTRL+BACKSLASH': 'removeFormat',
                  'CTRL+SHIFT+L': 'justifyLeft',
                  'CTRL+SHIFT+E': 'justifyCenter',
                  'CTRL+SHIFT+R': 'justifyRight',
                  'CTRL+SHIFT+J': 'justifyFull',
                  'CTRL+SHIFT+NUM7': 'insertUnorderedList',
                  'CTRL+SHIFT+NUM8': 'insertOrderedList',
                  'CTRL+LEFTBRACKET': 'outdent',
                  'CTRL+RIGHTBRACKET': 'indent',
                  'CTRL+NUM0': 'formatPara',
                  'CTRL+NUM1': 'formatH1',
                  'CTRL+NUM2': 'formatH2',
                  'CTRL+NUM3': 'formatH3',
                  'CTRL+NUM4': 'formatH4',
                  'CTRL+NUM5': 'formatH5',
                  'CTRL+NUM6': 'formatH6',
                  'CTRL+ENTER': 'insertHorizontalRule',
                  'CTRL+K': 'linkDialog.show'
              },
              mac: {
                  'ENTER': 'insertParagraph',
                  'CMD+Z': 'undo',
                  'CMD+SHIFT+Z': 'redo',
                  'TAB': 'tab',
                  'SHIFT+TAB': 'untab',
                  'CMD+B': 'bold',
                  'CMD+I': 'italic',
                  'CMD+U': 'underline',
                  'CMD+SHIFT+S': 'strikethrough',
                  'CMD+BACKSLASH': 'removeFormat',
                  'CMD+SHIFT+L': 'justifyLeft',
                  'CMD+SHIFT+E': 'justifyCenter',
                  'CMD+SHIFT+R': 'justifyRight',
                  'CMD+SHIFT+J': 'justifyFull',
                  'CMD+SHIFT+NUM7': 'insertUnorderedList',
                  'CMD+SHIFT+NUM8': 'insertOrderedList',
                  'CMD+LEFTBRACKET': 'outdent',
                  'CMD+RIGHTBRACKET': 'indent',
                  'CMD+NUM0': 'formatPara',
                  'CMD+NUM1': 'formatH1',
                  'CMD+NUM2': 'formatH2',
                  'CMD+NUM3': 'formatH3',
                  'CMD+NUM4': 'formatH4',
                  'CMD+NUM5': 'formatH5',
                  'CMD+NUM6': 'formatH6',
                  'CMD+ENTER': 'insertHorizontalRule',
                  'CMD+K': 'linkDialog.show'
              }
          },
          icons: {
              'align': 'note-icon-align',
              'alignCenter': 'note-icon-align-center',
              'alignJustify': 'note-icon-align-justify',
              'alignLeft': 'note-icon-align-left',
              'alignRight': 'note-icon-align-right',
              'rowBelow': 'note-icon-row-below',
              'colBefore': 'note-icon-col-before',
              'colAfter': 'note-icon-col-after',
              'rowAbove': 'note-icon-row-above',
              'rowRemove': 'note-icon-row-remove',
              'colRemove': 'note-icon-col-remove',
              'indent': 'note-icon-align-indent',
              'outdent': 'note-icon-align-outdent',
              'arrowsAlt': 'note-icon-arrows-alt',
              'bold': 'note-icon-bold',
              'caret': 'note-icon-caret',
              'circle': 'note-icon-circle',
              'close': 'note-icon-close',
              'code': 'note-icon-code',
              'eraser': 'note-icon-eraser',
              'floatLeft': 'note-icon-float-left',
              'floatRight': 'note-icon-float-right',
              'font': 'note-icon-font',
              'frame': 'note-icon-frame',
              'italic': 'note-icon-italic',
              'link': 'note-icon-link',
              'unlink': 'note-icon-chain-broken',
              'magic': 'note-icon-magic',
              'menuCheck': 'note-icon-menu-check',
              'minus': 'note-icon-minus',
              'orderedlist': 'note-icon-orderedlist',
              'pencil': 'note-icon-pencil',
              'picture': 'note-icon-picture',
              'question': 'note-icon-question',
              'redo': 'note-icon-redo',
              'rollback': 'note-icon-rollback',
              'square': 'note-icon-square',
              'strikethrough': 'note-icon-strikethrough',
              'subscript': 'note-icon-subscript',
              'superscript': 'note-icon-superscript',
              'table': 'note-icon-table',
              'textHeight': 'note-icon-text-height',
              'trash': 'note-icon-trash',
              'underline': 'note-icon-underline',
              'undo': 'note-icon-undo',
              'unorderedlist': 'note-icon-unorderedlist',
              'video': 'note-icon-video'
          }
      }
  });

  $$1.summernote = $$1.extend($$1.summernote, {
      ui: ui
  });
  $$1.summernote.options.styleTags = [
      'p',
      { title: 'Blockquote', tag: 'blockquote', className: 'blockquote', value: 'blockquote' },
      'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  ];

}));
//# sourceMappingURL=summernote-bs4.js.map
;$(document).ready(function () {
    //$('.input-group.date').datetimepicker({
    //    format: 'DD/MM/YYYY'
    //});

    $('input[type=file]').change(function () {
        var t = $(this).val();
        var labelText = 'File: ' + t.substr(12, t.length);
        $(this).prev('label').text(labelText);
    })

    toastr.options = {
        closeButton: true,
        progressBar: true,
        newestOnTop: false,
        positionClass: 'toast-bottom-right',
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "3500",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut"
    };

});

function bindForm(dialog) {
    $('form', dialog).submit(function (event) {
        event.preventDefault();
        var existingValdiation = $(this).validate();

        var anyError = false;
        $(this).find("input").each(function () {
            if (!existingValdiation.element(this)) { // validate every input element inside this step
                anyError = true;
            }
        });

        if (anyError)
            return false;

        $.ajax({
            url: this.action,
            type: this.method,
            data: $(this).serialize(),
            success: function (result) {
                if (result.status == "Success") {
                    $('#modalForm').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    //recargar la página
                    $('#btnBuscar').trigger('click');
                } else {
                    MostrarMensaje('Error', result.Message, 'error');
                    $.validator.unobtrusive.parse("#MyForm");
                    bindForm(dialog);
                }
            }
        });
    });
}

function MostrarMensaje(titulo, mensaje, tipo) {
    var $toast = toastr[tipo](mensaje, titulo);
}

function MostrarMensajeModal(titulo, mensaje, tipo) {
    $("#mHeader").text(titulo);
    $("#mBody").html(mensaje);
    $('#mModal').modal('show');
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}
;