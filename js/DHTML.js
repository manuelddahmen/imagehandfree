/**
 @browser Gecko
 @param {string} propertyName
 @param func
 */
Object.prototype.__defineGetter__ = function (propertyName, func) {
};
/**
 @browser Gecko
 @param {string} propertyName
 @param func
 */
Object.prototype.__defineSetter__ = function (propertyName, func) {
};
/**
 @browser Gecko
 @param {string} propertyName
 @return {Function}
 */
Object.prototype.__lookupGetter__ = function (propertyName) {
};
/**
 @browser Gecko
 @param {string} propertyName
 @return {Function}
 */
Object.prototype.__lookupSetter__ = function (propertyName) {
};
/**
 @browser Gecko
 @param {string} propertyName
 @return {Function}
 */
Object.prototype.__proto__ = function (propertyName) {
};
/**
 @browser Gecko
 @return {string}
 */
Object.prototype.toSource = function () {
};
/**
 @browser Gecko
 @param {string} prop
 @return {string}
 */
Object.prototype.unwatch = function (prop) {
};
/**
 @browser Gecko
 @param {string} prop
 @param {function} handler
 @return {string}
 */
Object.prototype.watch = function (prop, handler) {
};

/**
 @type {function}
 */
Function.prototype.caller = 0;

Image.prototype = new HTMLImageElement();
Image = {};

/**
 @type {string}
 */
Navigator.prototype.userAgent = null;
/**
 @type {string}
 */
Navigator.prototype.product = null;
/**
 @type {string}
 */
Navigator.prototype.appVersion = null;
/**
 @type {string}
 */
Navigator.prototype.appName = null;
/**
 @type {string}
 */
Navigator.prototype.appCodeName = null;
/**
 @type {string}
 */
Navigator.prototype.language = null;
/**
 @browser IE
 @type {string}
 */
Navigator.prototype.systemLanguage = null;
/**
 @browser IE
 @type {string}
 */
Navigator.prototype.userLanguage = null;
/**
 @type {Array}
 */
Navigator.prototype.mimeTypes = 0;
/**
 @type {string}
 */
Navigator.prototype.platform = null;
/**
 @type {Array}
 */
Navigator.prototype.plugins = 0;
/**
 @type {boolean}
 */
Navigator.prototype.onLine = 0;
/**
 @type {boolean}
 */
Navigator.prototype.cookieEnabled = 0;
/**
 @return {boolean}
 */
Navigator.prototype.taintEnabled = function () {
};
/**
 @return {boolean}
 */
Navigator.prototype.javaEnabled = function () {
};
/**
 @param {string} prefName
 @param {string} [prefValue]
 @return {string}
 */
Navigator.prototype.preference = function (prefName, prefValue) {
};
Navigator = {};

/**
 @type {Number}
 */
Screen.prototype.width = 0;
/**
 @type {Number}
 */
Screen.prototype.height = 0;
/**
 @type {Number}
 */
Screen.prototype.availHeight = 0;
/**
 @type {Number}
 */
Screen.prototype.availWidth = 0;
/**
 @type {Number}
 */
Screen.prototype.pixelDepth = 0;
/**
 @type {Number}
 */
Screen.prototype.colorDepth = 0;
Screen = {};

/**
 @type {boolean}
 */
Option.prototype.defaultSelected = 0;
/**
 @type {boolean}
 */
Option.prototype.selected = 0;
/**
 @type {string}
 */
Option.prototype.text = null;
/**
 @type {string}
 */
Option.prototype.value = null;
Option = {};

/**
 @type {string}
 */
Location.prototype.href = null;
/**
 @type {string}
 */
Location.prototype.hash = null;
/**
 @type {string}
 */
Location.prototype.port = null;
/**
 @type {string}
 */
Location.prototype.host = null;
/**
 @type {string}
 */
Location.prototype.hostname = null;
/**
 @type {string}
 */
Location.prototype.pathname = null;
/**
 @type {string}
 */
Location.prototype.protocol = null;
/**
 @type {string}
 */
Location.prototype.search = null;
/**
 @type {string}
 */
Location.prototype.target = null;
/**
 @param {boolean} [forceget]
 @return {void}
 */
Location.prototype.reload = function (forceget) {
};
/**
 @param {string} url
 @return {void}
 */
Location.prototype.replace = function (url) {
};
Location = {};

XSLTProcessor = function () {
};
/**
 @browser Gecko
 */
XSLTProcessor.prototype.constructor = 0;
/**
 @browser Gecko
 @param {Node} domNode
 */
XSLTProcessor.prototype.importStylesheet = function (domNode) {
};
/**
 @browser Gecko
 @param {Node} domNode
 @return {Document}
 */
XSLTProcessor.prototype.transformToDocument = function (domNode) {
};
/**
 @browser Gecko
 @param {Node} domToBeTransformed
 @param {Document} ownerDocument
 @return {DocumentFragment}
 */
XSLTProcessor.prototype.transformToFragment = function (domToBeTransformed, ownerDocument) {
};

DOMParser = function () {
};
/**
 @browser Gecko
 */
DOMParser.prototype.constructor = 0;
/**
 @browser Gecko
 @param {string} stringToParse
 @param {string} contentType
 @return {Document}
 */
DOMParser.prototype.parseFromString = function (stringToParse, contentType) {
};

XMLSerializer = function () {
};
/**
 @browser Gecko
 */
XMLSerializer.prototype.constructor = 0;
/**
 @browser Gecko
 @param {Document} domNode
 @param {Object} stream
 @param {string} encoding
 */
XMLSerializer.prototype.serializeToStream = function (domNode, stream, encoding) {
};
/**
 @browser Gecko
 @param {Document} domNode
 @return {string}
 */
XMLSerializer.prototype.serializeToString = function (domNode) {
};

/**
 @browser Gecko
 @static
 @type {Event}
 @deprecated
 */
Event.ABORT = 0;
/**
 @browser Gecko
 @static
 @type {Event}
 @deprecated
 */
Event.BLUR = 0;
/**
 @browser Gecko
 @static
 @type {Event}
 @deprecated
 */
Event.CLICK = 0;
/**
 @browser Gecko
 @static
 @type {Event}
 @deprecated
 */
Event.CHANGE = 0;
/**
 @browser Gecko
 @static
 @type {Event}
 @deprecated
 */
Event.DBLCLICK = 0;
/**
 @browser Gecko
 @static
 @type {Event}
 @deprecated
 */
Event.DRAGDROP = 0;
/**
 @browser Gecko
 @static
 @type {Event}
 @deprecated
 */
Event.ERROR = 0;
/**
 @browser Gecko
 @static
 @type {Event}
 @deprecated
 */
Event.FOCUS = 0;
/**
 @browser Gecko
 @static
 @type {Event}
 @deprecated
 */
Event.KEYDOWN = 0;
/**
 @browser Gecko
 @static
 @type {Event}
 @deprecated
 */
Event.KEYPRESS = 0;
/**
 @browser Gecko
 @static
 @type {Event}
 @deprecated
 */
Event.KEYUP = 0;
/**
 @browser Gecko
 @static
 @type {Event}
 @deprecated
 */
Event.LOAD = 0;
/**
 @browser Gecko
 @static
 @type {Event}
 @deprecated
 */
Event.MOUSEDOWN = 0;
/**
 @browser Gecko
 @static
 @type {Event}
 @deprecated
 */
Event.MOUSEMOVE = 0;
/**
 @browser Gecko
 @static
 @type {Event}
 @deprecated
 */
Event.MOUSEOUT = 0;
/**
 @browser Gecko
 @static
 @type {Event}
 @deprecated
 */
Event.MOUSEOVER = 0;
/**
 @browser Gecko
 @static
 @type {Event}
 @deprecated
 */
Event.MOUSEUP = 0;
/**
 @browser Gecko
 @static
 @type {Event}
 @deprecated
 */
Event.MOVE = 0;
/**
 @browser Gecko
 @static
 @type {Event}
 @deprecated
 */
Event.RESET = 0;
/**
 @browser Gecko
 @static
 @type {Event}
 @deprecated
 */
Event.RESIZE = 0;
/**
 @browser Gecko
 @static
 @type {Event}
 @deprecated
 */
Event.SELECT = 0;
/**
 @browser Gecko
 @static
 @type {Event}
 @deprecated
 */
Event.SUBMIT = 0;
/**
 @browser Gecko
 @static
 @type {Event}
 @deprecated
 */
Event.UNLOAD = 0;
/**
 @type {Object[]}
 */
Event.prototype.data = 0;
/**
 @type {Number}
 */
Event.prototype.height = 0;
/**
 @browser IE
 @type {Number}
 */
Event.prototype.x = 0;
/**
 @type {Number}
 */
Event.prototype.screenX = 0;
/**
 @type {Number}
 */
Event.prototype.clientX = 0;
/**
 @browser IE
 @type {Number}
 */
Event.prototype.offsetX = 0;
/**
 @browser Gecko
 @type {Number}
 */
Event.prototype.layerX = 0;
/**
 @browser IE
 @type {Object}
 */
Event.prototype.fromElement = 0;
/**
 @browser IE
 @type {Number}
 */
Event.prototype.wheelDelta = 0;
/**
 @browser IE
 @type {boolean}
 */
Event.prototype.repeat = 0;
/**
 @type {Number}
 */
Event.prototype.pageX = 0;
/**
 @browser IE
 @type {Number}
 */
Event.prototype.y = 0;
/**
 @type {Number}
 */
Event.prototype.screenY = 0;
/**
 @type {Number}
 */
Event.prototype.clientY = 0;
/**
 @browser IE
 @type {Number}
 */
Event.prototype.offsetY = 0;
/**
 @browser Gecko
 @type {Number}
 */
Event.prototype.layerY = 0;
/**
 @type {Number}
 */
Event.prototype.pageY = 0;
/**
 @type {Number}
 */
Event.prototype.width = 0;
/**
 @type {Number}
 */
Event.prototype.modifiers = 0;
/**
 @type {Number}
 */
Event.prototype.keyCode = 0;
/**
 @type {string}
 */
Event.prototype.type = null;
/**
 @type {Object}
 */
Event.prototype.which = 0;
/**
 @browser IE
 @type {Object}
 */
Event.prototype.srcElement = 0;
/**
 @browser IE
 @type {Object}
 */
Event.prototype.toElement = 0;
/**
 @browser IE
 @type {boolean}
 */
Event.prototype.cancelBubble = 0;
/**
 @browser IE
 @type {boolean}
 */
Event.prototype.returnValue = 0;
/**
 @type {boolean}
 */
Event.prototype.altKey = 0;
/**
 @type {boolean}
 */
Event.prototype.ctrlKey = 0;
/**
 @type {boolean}
 */
Event.prototype.shiftKey = 0;
/**
 @type {boolean}
 */
Event.prototype.button = 0;
/**
 @browser Gecko
 @type {string}
 */
Event.prototype.charCode = null;
Event = {};

/**
 @browser Gecko
 @type {Node}
 */
Selection.prototype.anchorNode = 0;
/**
 @browser Gecko
 @type {Number}
 */
Selection.prototype.anchorOffset = 0;
/**
 @browser Gecko
 @type {Node}
 */
Selection.prototype.focusNode = 0;
/**
 @browser Gecko
 @type {Number}
 */
Selection.prototype.focusOffset = 0;
/**
 @browser Gecko
 @type {boolean}
 */
Selection.prototype.isCollapsed = 0;
/**
 @browser Gecko
 @type {Number}
 */
Selection.prototype.rangeCount = 0;
/**
 @browser IE
 @type {string}
 */
Selection.prototype.type = null;
/**
 @browser Gecko
 @param {Number} index
 @return {Range}
 */
Selection.prototype.getRangeAt = function (index) {
};
/**
 @browser Gecko
 @param {Node} parentNode
 @param {Number} offset
 @return {void}
 */
Selection.prototype.collapse = function (parentNode, offset) {
};
/**
 @browser Gecko
 @param {Node} parentNode
 @param {Number} offset
 @return {void}
 */
Selection.prototype.extend = function (parentNode, offset) {
};
/**
 @browser Gecko
 @return {void}
 */
Selection.prototype.collapseToStart = function () {
};
/**
 @browser Gecko
 @return {void}
 */
Selection.prototype.collapseToEnd = function () {
};
/**
 @browser Gecko
 @param {Node} parentNode
 @return {void}
 */
Selection.prototype.selectAllChildren = function (parentNode) {
};
/**
 @browser Gecko
 @param {Range} range
 @return {void}
 */
Selection.prototype.addRange = function (range) {
};
/**
 @browser Gecko
 @param {Range} range
 @return {void}
 */
Selection.prototype.removeRange = function (range) {
};
/**
 @browser Gecko
 @return {void}
 */
Selection.prototype.removeAllRanges = function () {
};
/**
 @browser Gecko
 @param {Node} node
 @param {boolean} partlyContained
 @return {boolean}
 */
Selection.prototype.containsNode = function (node, partlyContained) {
};
/**
 @browser IE
 @return {boolean}
 */
Selection.prototype.clear = function () {
};
/**
 @browser IE
 @return {boolean}
 */
Selection.prototype.empty = function () {
};
/**
 @browser IE
 @return {TextRange}
 */
Selection.prototype.createRange = function () {
};
Selection = {};

/**
 @browser IE
 @type {string}
 */
TextRange.prototype.htmlText = null;
/**
 @browser IE
 @type {string}
 */
TextRange.prototype.text = null;
/**
 @browser IE
 @type {Number}
 */
TextRange.prototype.boundingWidth = 0;
/**
 @browser IE
 @type {Number}
 */
TextRange.prototype.boundingHeight = 0;
/**
 @browser IE
 @type {Number}
 */
TextRange.prototype.boundingLeft = 0;
/**
 @browser IE
 @type {Number}
 */
TextRange.prototype.offsetLeft = 0;
/**
 @browser IE
 @type {Number}
 */
TextRange.prototype.boundingTop = 0;
/**
 @browser IE
 @type {Number}
 */
TextRange.prototype.offsetTop = 0;
/**
 @browser IE
 @return {string}
 */
TextRange.prototype.getBookmark = function () {
};
/**
 @browser IE
 @param {string} [sBookmark]
 @return {boolean}
 */
TextRange.prototype.moveToBookmark = function (sBookmark) {
};
/**
 @browser IE
 @param {boolean} [start]
 @return {void}
 */
TextRange.prototype.collapse = function (start) {
};
/**
 @browser IE
 @param {string} [unit]
 @return {void}
 */
TextRange.prototype.expand = function (unit) {
};
/**
 @browser IE
 @return {TextRange}
 */
TextRange.prototype.duplicate = function () {
};
/**
 @browser IE
 @return {void}
 */
TextRange.prototype.select = function () {
};
/**
 @browser IE
 @return {Node}
 */
TextRange.prototype.parentElement = function () {
};
/**
 @browser IE
 @param {TextRange} other
 @return {boolean}
 */
TextRange.prototype.inRange = function (other) {
};
/**
 @browser IE
 @param {TextRange} other
 @return {boolean}
 */
TextRange.prototype.isEqual = function (other) {
};
/**
 @browser IE
 @param {boolean} [start]
 @return {void}
 */
TextRange.prototype.scrollIntoView = function (start) {
};
/**
 @browser IE
 @param {string} type
 @param {TextRange} range
 @return {void}
 */
TextRange.prototype.setEndPoint = function (type, range) {
};
/**
 @browser IE
 @param {string} type
 @param {TextRange} range
 @return {void}
 */
TextRange.prototype.compareEndPoint = function (type, range) {
};
/**
 @browser IE
 @param {string} unit
 @param {Number} [count]
 @return {void}
 */
TextRange.prototype.move = function (unit, count) {
};
/**
 @browser IE
 @param {string} unit
 @param {Number} [count]
 @return {void}
 */
TextRange.prototype.moveStart = function (unit, count) {
};
/**
 @browser IE
 @param {string} unit
 @param {Number} [count]
 @return {void}
 */
TextRange.prototype.moveEnd = function (unit, count) {
};
/**
 @browser IE
 @param {string} htmlText
 @return {void}
 */
TextRange.prototype.pasteHTML = function (htmlText) {
};
/**
 @browser IE
 @param {HTMLElement} [element]
 @return {void}
 */
TextRange.prototype.moveToElementText = function (element) {
};
/**
 @browser IE
 @param {string} [sType]
 @param {TextRange} [oRange]
 @return {Number}
 */
TextRange.prototype.compareEndPoints = function (sType, oRange) {
};
TextRange = {};

/**
 @type {string}
 */
CssRule.prototype.selectorText = null;
CssRule = {};

/**
 @browser Gecko
 @type {CssRule[]}
 */
Stylesheet.prototype.cssRules = 0;
/**
 @browser IE
 @type {CssRule[]}
 */
Stylesheet.prototype.rules = 0;
/**
 @browser IE
 @type {HtmlElement}
 */
Stylesheet.prototype.owningElement = 0;
/**
 @browser IE
 @param {string} selector
 @param {string} style
 @param {Number} [index]
 @return {void}
 */
Stylesheet.prototype.addRule = function (selector, style, index) {
};
/**
 @browser Gecko
 @param {string} ruleText
 @param {Number} index
 @return {void}
 */
Stylesheet.prototype.insertRule = function (ruleText, index) {
};
/**
 @browser IE
 @param {Number} index
 @return {void}
 */
Stylesheet.prototype.removeRule = function (index) {
};
/**
 @browser Gecko
 @param {Number} index
 @return {void}
 */
Stylesheet.prototype.deleteRule = function (index) {
};
Stylesheet = {};

/**
 @browser Gecko
 @param {string} title
 @param {string} url
 @param {string} param3
 @return {void}
 */
MozillaSideBar.prototype.addPanel = function (title, url, param3) {
};
MozillaSideBar = {};

/**
 @browser IE
 @param {string} title
 @param {string} [url]
 @return {void}
 */
IEExternal.prototype.AddFavorite = function (title, url) {
};
IEExternal = {};

/**
 @return {void}
 */
History.prototype.back = function () {
};
/**
 @return {void}
 */
History.prototype.forward = function () {
};
/**
 @param {Number} count
 @return {void}
 */
History.prototype.go = function (count) {
};
History = {};

/**
 @param {...*} message
 */
Console.prototype.info = function (message) {
};
/**
 @param {...*} message
 */
Console.prototype.warn = function (message) {
};
/**
 @param {...*} message
 */
Console.prototype.error = function (message) {
};
/**
 @param {...*} message
 */
Console.prototype.log = function (message) {
};
/**
 @param {...*} message
 */
Console.prototype.dir = function (message) {
};
Console.prototype.group = function () {
};
Console.prototype.groupCollapsed = function () {
};
Console.prototype.groupEnd = function () {
};
Console.prototype.trace = function () {
};
/**
 @param {string} timerName
 */
Console.prototype.time = function (timerName) {
};
/**
 @param {string} timerName
 */
Console.prototype.timeEnd = function (timerName) {
};
/**
 @param {*} expression
 @param {*} message
 */
Console.prototype.assert = function (expression, message) {
};
/**
 @interface
 */
function Console() {
}

WindowProxy.prototype = new Window();
WindowProxy = {};

/**
 @type {HTMLDocument}
 @const
 */
Window.prototype.document = 0;
/**
 @type {Event}
 @const
 */
Window.prototype.event = 0;
/**
 @type {Navigator}
 @const
 */
Window.prototype.navigator = 0;
/**
 @type {Screen}
 @const
 */
Window.prototype.screen = 0;
/**
 @type {Location|String}
 */
Window.prototype.location = 0;
/**
 @type {Console}
 */
Window.prototype.console = 0;
/**
 @type {Object}
 */
Window.prototype.frameElement = 0;
/**
 @type {Window}
 */
Window.prototype.opener = 0;
/**
 @type {Window}
 */
Window.prototype.window = 0;
/**
 @type {Window}
 */
Window.prototype.parent = 0;
/**
 @type {Window}
 */
Window.prototype.top = 0;
/**
 @type {Window}
 */
Window.prototype.self = 0;
/**
 @type {Array}
 */
Window.prototype.frames = 0;
/**
 @type {Number}
 */
Window.prototype.innerHeight = 0;
/**
 @type {Number}
 */
Window.prototype.innerWidth = 0;
/**
 @type {Number}
 */
Window.prototype.outerHeight = 0;
/**
 @type {Number}
 */
Window.prototype.outerWidth = 0;
/**
 @browser IE
 @type {Number}
 */
Window.prototype.screenLeft = 0;
/**
 @browser IE
 @type {Number}
 */
Window.prototype.screenTop = 0;
/**
 @type {Number}
 */
Window.prototype.scrollX = 0;
/**
 @type {Number}
 */
Window.prototype.scrollY = 0;
/**
 @type {Number}
 */
Window.prototype.pageXOffset = 0;
/**
 @type {Number}
 */
Window.prototype.pageYOffset = 0;
/**
 @type {Number}
 */
Window.prototype.scrollMaxX = 0;
/**
 @type {Number}
 */
Window.prototype.scrollMaxY = 0;
/**
 @type {string}
 */
Window.prototype.status = null;
/**
 @type {string}
 */
Window.prototype.defaultStatus = null;
/**
 @type {Object}
 */
Window.prototype.toolbar = 0;
/**
 @type {Object}
 */
Window.prototype.menubar = 0;
/**
 @type {Object}
 */
Window.prototype.scrollbars = 0;
/**
 @type {Object}
 */
Window.prototype.directories = 0;
/**
 @type {History}
 */
Window.prototype.history = 0;
/**
 @browser Gecko
 @type {MozillaSideBar}
 */
Window.prototype.sidebar = 0;
/**
 @browser IE
 @type {IEExternal}
 */
Window.prototype.external = 0;
/**
 @browser Opera
 @type {boolean}
 */
Window.prototype.opera = 0;
/**
 @browser ie
 @type {ClipboardData}
 @const
 */
Window.prototype.clipboardData = 0;
/**
 @type {Function}
 */
Object.defineProperty(Window, "onload", {
    set: function (value) {
    }
});
/**
 @type {Function}
 */
Object.defineProperty(Window, "onunload", {
    set: function (value) {
    }
});
/**
 @browser Gecko
 @return {Selection}
 */
Window.prototype.getSelection = function () {
};
/**
 @param {string} [url]
 @param {string} [windowName]
 @param {string} [windowFeatures]
 @param {boolean} [replace]
 @return {Window}
 */
Window.prototype.open = function (url, windowName, windowFeatures, replace) {
};
/**
 @return {void}
 */
Window.prototype.close = function () {
};
/**
 @return {void}
 */
Window.prototype.print = function () {
};
/**
 @param {String|*} message
 */
Window.prototype.alert = function (message) {
};
/**
 @param {string} encodedData
 @return {string}
 */
Window.prototype.atob = function (encodedData) {
};
/**
 @param {string} decodedData
 @return {string}
 */
Window.prototype.btoa = function (decodedData) {
};
/**
 @param {string} message
 */
Window.prototype.confirm = function (message) {
};
/**
 @param {string} message
 @param {string} [defaultValue]
 */
Window.prototype.prompt = function (message, defaultValue) {
};
/**
 @param {number} intervalId
 */
Window.prototype.clearInterval = function (intervalId) {
};
/**
 @param {number} intervalId
 */
Window.prototype.clearTimeout = function (intervalId) {
};
/**
 @param {String|Function} code
 @param {number} delay
 @return {number}
 */
Window.prototype.setInterval = function (code, delay) {
};
/**
 @param {String|Function} code
 @param {number} delay
 @return {number}
 */
Window.prototype.setTimeout = function (code, delay) {
};
/**
 @browser Gecko
 @param {Event} eventType
 @return {void}
 @deprecated
 */
Window.prototype.captureEvents = function (eventType) {
};
/**
 @browser Gecko
 @param {Event} eventType
 @return {void}
 @deprecated
 */
Window.prototype.releaseEvents = function (eventType) {
};
/**
 @browser Gecko
 @param {Event} event
 @return {void}
 @deprecated
 */
Window.prototype.routeEvent = function (event) {
};
/**
 @browser Gecko
 @param {Event} event
 @return {void}
 @deprecated
 */
Window.prototype.preventBubble = function (event) {
};
/**
 @browser IE
 @param {string} classOrPath
 @param {string} [clazz]
 @return {Object}
 @deprecated
 */
Window.prototype.GetObject = function (classOrPath, clazz) {
};
/**
 @browser IE
 @return {string}
 */
Window.prototype.ScriptEngine = function () {
};
/**
 @browser IE
 @return {string}
 */
Window.prototype.ScriptEngineBuildVersion = function () {
};
/**
 @browser IE
 @return {string}
 */
Window.prototype.ScriptEngineMajorVersion = function () {
};
/**
 @browser IE
 @return {string}
 */
Window.prototype.ScriptEngineMinorVersion = function () {
};
/**
 @param {Number} x
 @param {Number} y
 */
Window.prototype.scrollTo = function (x, y) {
};
/**
 @param {Number} xDelta
 @param {Number} yDelta
 */
Window.prototype.scrollBy = function (xDelta, yDelta) {
};
/**
 @param {Number} x
 @param {Number} y
 */
Window.prototype.moveTo = function (x, y) {
};
/**
 @param {Number} xDelta
 @param {Number} yDelta
 */
Window.prototype.moveBy = function (xDelta, yDelta) {
};
/**
 @param {Number} width
 @param {Number} height
 */
Window.prototype.resizeTo = function (width, height) {
};
/**
 @param {Number} widthDelta
 @param {Number} heightDelta
 */
Window.prototype.resizeBy = function (widthDelta, heightDelta) {
};
/**
 @browser Gecko
 @param {Element} element
 @param {?string} [pseudoElt]
 @return {CSSStyleDeclaration}
 */
Window.prototype.getComputedStyle = function (element, pseudoElt) {
};
/**
 @browser IE
 @param {string} sUrl
 @param {Object|String|Number} [vArguments]
 @param {string} [sFeatures]
 @return {Object}
 */
Window.prototype.showModalDialog = function (sUrl, vArguments, sFeatures) {
};
/**
 @browser IE
 @param {string} type
 @param {Function} listener
 */
Window.prototype.attachEvent = function (type, listener) {
};
/**
 @browser IE
 @param {string} type
 @param {Function} listener
 */
Window.prototype.detachEvent = function (type, listener) {
};
/**
 @browser Gecko
 @param {string} type
 @param {Function} listener
 @param {boolean} [useCapture]
 */
Window.prototype.addEventListener = function (type, listener, useCapture) {
};
/**
 @browser Gecko
 @param {string} type
 @param {Function} listener
 @param {boolean} [useCapture]
 */
Window.prototype.removeEventListener = function (type, listener, useCapture) {
};
/**
 @browser IE
 @param {string} sScript
 */
Window.prototype.execScript = function (sScript) {
};
/**
 @browser IE
 */
Window.prototype.CollectGarbage = function () {
};

/**
 @browser ie
 @param {string} sDataFormat
 @param {string} sData
 @return {boolean}
 */
ClipboardData.prototype.setData = function (sDataFormat, sData) {
};
/**
 @browser ie
 @param {string} sDataFormat
 @return {string}
 */
ClipboardData.prototype.getData = function (sDataFormat) {
};
/**
 @browser ie
 @param {string} [sDataFormat]
 @return {boolean}
 */
ClipboardData.prototype.clearData = function (sDataFormat) {
};
ClipboardData = {};

/**
 @type {Window}
 @const
 */
window = 0;
/**
 @param {string} [str]
 @deprecated
 */
escape = function (str) {
};
/**
 @param {string} [str]
 @deprecated
 */
unescape = function (str) {
};

/**
 @type {Number}
 @const
 */
HTMLCollection.prototype.length = 0;
/**
 @param {Number} index
 @return {Node}
 */
HTMLCollection.prototype.item = function (index) {
};
/**
 @param {string} name
 @return {Node}
 */
HTMLCollection.prototype.namedItem = function (name) {
};
HTMLCollection = {};

/**
 @type {Number}
 @const
 */
HTMLOptionsCollection.prototype.length = 0;
/**
 @param {number} index
 @return {Node}
 */
HTMLOptionsCollection.prototype.item = function (index) {
};
/**
 @param {string} name
 @return {Node}
 */
HTMLOptionsCollection.prototype.namedItem = function (name) {
};
HTMLOptionsCollection = {};

Document.prototype = new HTMLDocument();
Document = {};

/**
 @type {string}
 */
HTMLDocument.prototype.title = null;
/**
 @type {string}
 @const
 */
HTMLDocument.prototype.referrer = null;
/**
 @type {string}
 @const
 */
HTMLDocument.prototype.domain = null;
/**
 @type {string}
 @const
 */
HTMLDocument.prototype.URL = null;
/**
 @type {HTMLElement}
 */
HTMLDocument.prototype.body = 0;
/**
 @type {HTMLCollection}
 @const
 */
HTMLDocument.prototype.images = 0;
/**
 @type {HTMLCollection}
 @const
 */
HTMLDocument.prototype.applets = 0;
/**
 @type {HTMLCollection}
 @const
 */
HTMLDocument.prototype.links = 0;
/**
 @type {HTMLCollection}
 @const
 */
HTMLDocument.prototype.forms = 0;
/**
 @type {HTMLCollection}
 @const
 */
HTMLDocument.prototype.anchors = 0;
/**
 @type {string}
 */
HTMLDocument.prototype.cookie = null;
/**
 @type {Stylesheet[]}
 @const
 */
HTMLDocument.prototype.styleSheets = 0;
/**
 @browser Gecko
 @type {DocumentView}
 */
HTMLDocument.prototype.defaultView = 0;
/**
 @browser IE
 @type {DocumentView}
 */
HTMLDocument.prototype.activeElement = 0;
/**
 @type {string}
 */
HTMLDocument.prototype.compatMode = null;
/**
 @browser IE
 @type {Window}
 */
HTMLDocument.prototype.parentWindow = 0;
/**
 @type {function():(void|Boolean)}
 */
Object.defineProperty(HTMLDocument, "onclick", {
    set: function (value) {
    }
});
/**
 @browser Gecko
 @type {CommandDispatcher}
 */
HTMLDocument.prototype.commandDispatcher = 0;
/**
 @browser IE
 @type {Number}
 */
HTMLDocument.prototype.documentMode = 0;
/**
 @type {Function}
 */
Object.defineProperty(HTMLDocument, "onload", {
    set: function (value) {
    }
});
/**
 @type {Function}
 */
Object.defineProperty(HTMLDocument, "onunload", {
    set: function (value) {
    }
});
HTMLDocument.prototype.open = function () {
};
HTMLDocument.prototype.close = function () {
};
/**
 @param {string} text
 */
HTMLDocument.prototype.write = function (text) {
};
/**
 @param {string} text
 */
HTMLDocument.prototype.writeln = function (text) {
};
/**
 @param {string} elementName
 @return {NodeList}
 */
HTMLDocument.prototype.getElementsByName = function (elementName) {
};
/**
 @browser Gecko
 @param {string} className
 @return {NodeList}
 */
HTMLDocument.prototype.getElementsByClassName = function (className) {
};
/**
 @browser IE
 @param {string} [sUrl]
 @param {Number} [iIndex]
 @return {Stylesheet}
 */
HTMLDocument.prototype.createStyleSheet = function (sUrl, iIndex) {
};
/**
 @browser Gecko
 @param {HTMLElement} element
 @return {{x: Number, y: Number, width: Number, height: Number}}
 @deprecated
 */
HTMLDocument.prototype.getBoxObjectFor = function (element) {
};
/**
 @param {string} selector
 @return {NodeList}
 */
HTMLDocument.prototype.querySelectorAll = function (selector) {
};
/**
 @param {string} selector
 @return {Element}
 */
HTMLDocument.prototype.querySelector = function (selector) {
};
/**
 @browser Gecko
 @param {HTMLElement} node
 @return {Node[]}
 */
HTMLDocument.prototype.getAnonymousNodes = function (node) {
};
/**
 @browser Gecko
 @param {HTMLElement} node
 @param {string} attrName
 @param {string} attrValue
 @return {NodeList}
 */
HTMLDocument.prototype.getAnonymousElementByAttribute = function (node, attrName, attrValue) {
};
/**
 @browser IE
 @param {number} iX
 @param {number} iY
 @return {HTMLElement}
 */
HTMLDocument.prototype.elementFromPoint = function (iX, iY) {
};
/**
 @browser IE
 @param {Event} [oExistingEvent]
 @return {Event}
 */
HTMLDocument.prototype.createEventObject = function (oExistingEvent) {
};
/**
 @browser Gecko
 @param {Event} eventType
 @deprecated
 */
HTMLDocument.prototype.captureEvents = function (eventType) {
};
/**
 @browser Gecko
 @param {Event} eventType
 @deprecated
 */
HTMLDocument.prototype.releaseEvents = function (eventType) {
};
/**
 @browser Gecko
 @param {Event} event
 @deprecated
 */
HTMLDocument.prototype.routeEvent = function (event) {
};
/**
 @browser Gecko
 @param {Event} event
 @deprecated
 */
HTMLDocument.prototype.preventBubble = function (event) {
};
HTMLDocument.prototype = new Document();
HTMLDocument = {};

/**
 @browser Gecko
 @type {HTMLElement}
 */
CommandDispatcher.prototype.focusedElement = 0;
CommandDispatcher = {};

AbstractView = {};

/**
 @browser Gecko
 @param {Node} element
 @param {?string} type
 @return {CssStyle}
 */
DocumentView.prototype.getComputedStyle = function (element, type) {
};
DocumentView.prototype = new AbstractView();
DocumentView = {};

/**
 @browser Gecko
 @param {string} propertyName
 @return {string}
 */
CssStyle.prototype.getPropertyValue = function (propertyName) {
};
CssStyle = {};

Element.prototype = new HTMLElement();
Element = {};

/**
 @type {string}
 */
HTMLElement.prototype.outerHTML = null;
/**
 @type {string}
 */
HTMLElement.prototype.id = null;
/**
 @type {string}
 */
HTMLElement.prototype.title = null;
/**
 @type {string}
 */
HTMLElement.prototype.lang = null;
/**
 @type {string}
 */
HTMLElement.prototype.dir = null;
/**
 @type {string}
 */
HTMLElement.prototype.className = null;
/**
 @browser IE
 @type {HTMLElement[]}
 */
HTMLElement.prototype.children = 0;
/**
 @type {CSSStyleDeclaration}
 */
HTMLElement.prototype.style = 0;
/**
 @type {number}
 */
HTMLElement.prototype.clientWidth = 0;
/**
 @type {number}
 */
HTMLElement.prototype.clientHeight = 0;
/**
 @type {number}
 */
HTMLElement.prototype.clientTop = 0;
/**
 @type {number}
 */
HTMLElement.prototype.clientLeft = 0;
/**
 @type {string}
 */
HTMLElement.prototype.innerHTML = null;
/**
 @browser IE
 @type {string}
 */
HTMLElement.prototype.innerText = null;
/**
 @type {number}
 */
HTMLElement.prototype.offsetWidth = 0;
/**
 @type {number}
 */
HTMLElement.prototype.offsetHeight = 0;
/**
 @type {number}
 */
HTMLElement.prototype.offsetTop = 0;
/**
 @type {number}
 */
HTMLElement.prototype.offsetLeft = 0;
/**
 @type {HTMLElement}
 */
HTMLElement.prototype.offsetParent = 0;
/**
 @type {number}
 */
HTMLElement.prototype.scrollWidth = 0;
/**
 @type {number}
 */
HTMLElement.prototype.scrollHeight = 0;
/**
 @type {number}
 */
HTMLElement.prototype.scrollTop = 0;
/**
 @type {number}
 */
HTMLElement.prototype.scrollLeft = 0;
/**
 @type {Stylesheet}
 */
HTMLElement.prototype.stylesheet = 0;
/**
 @browser IE
 @type {number}
 @const
 */
HTMLElement.prototype.sourceIndex = 0;
/**
 @type {Function}
 */
Object.defineProperty(HTMLElement, "onblur", {
    set: function (value) {
    }
});
/**
 @type {function():(void|Boolean)}
 */
Object.defineProperty(HTMLElement, "onclick", {
    set: function (value) {
    }
});
/**
 @type {Function}
 */
Object.defineProperty(HTMLElement, "ondblclick", {
    set: function (value) {
    }
});
/**
 @type {Function}
 */
Object.defineProperty(HTMLElement, "onfocus", {
    set: function (value) {
    }
});
/**
 @type {Function}
 */
Object.defineProperty(HTMLElement, "onkeydown", {
    set: function (value) {
    }
});
/**
 @type {Function}
 */
Object.defineProperty(HTMLElement, "onkeyup", {
    set: function (value) {
    }
});
/**
 @type {Function}
 */
Object.defineProperty(HTMLElement, "onmouseup", {
    set: function (value) {
    }
});
/**
 @type {Function}
 */
Object.defineProperty(HTMLElement, "onmousedown", {
    set: function (value) {
    }
});
/**
 @type {Function}
 */
Object.defineProperty(HTMLElement, "onmouseout", {
    set: function (value) {
    }
});
/**
 @type {Function}
 */
Object.defineProperty(HTMLElement, "onmouseover", {
    set: function (value) {
    }
});
/**
 @type {Function}
 */
Object.defineProperty(HTMLElement, "onmousemove", {
    set: function (value) {
    }
});
/**
 @type {Function}
 */
Object.defineProperty(HTMLElement, "onresize", {
    set: function (value) {
    }
});
/**
 @browser IE
 @type {IEElementStyle}
 */
HTMLElement.prototype.currentStyle = 0;
/**
 @browser IE
 @type {IEElementStyle}
 */
HTMLElement.prototype.runtimeStyle = 0;
/**
 @browser IE
 @type {Array}
 */
HTMLElement.prototype.filters = 0;
/**
 @browser Gecko
 @type {HTMLElement}
 */
HTMLElement.prototype.boxObject = 0;
/**
 @browser IE
 @type {string}
 */
HTMLElement.prototype.propertyName = null;
/**
 @browser IE
 @type {boolean}
 */
HTMLElement.prototype.isDisabled = 0;
/**
 @browser IE
 @param {string} position
 @param {string} htmlContent
 */
HTMLElement.prototype.insertAdjacentHTML = function (position, htmlContent) {
};
/**
 @browser IE
 @param {string} [sScrollAction]
 */
HTMLElement.prototype.doScroll = function (sScrollAction) {
};
/**
 @browser IE
 @param {string} position
 @param {string} textContent
 */
HTMLElement.prototype.insertAdjacentText = function (position, textContent) {
};
/**
 @browser IE
 @param {string} type
 @param {Function} listener
 */
HTMLElement.prototype.attachEvent = function (type, listener) {
};
/**
 @browser IE
 @param {string} type
 @param {Function} listener
 */
HTMLElement.prototype.detachEvent = function (type, listener) {
};
/**
 @browser IE
 @param {string} type
 @param {Event} [event]
 */
HTMLElement.prototype.fireEvent = function (type, event) {
};
/**
 @browser IE
 @param {string} sUrl
 @return {Number}
 */
HTMLElement.prototype.addBehavior = function (sUrl) {
};
/**
 @browser IE
 @param {Number} sID
 @return {boolean}
 */
HTMLElement.prototype.removeBehavior = function (sID) {
};
/**
 @browser IE
 @return {ClientRect}
 */
HTMLElement.prototype.getBoundingClientRect = function () {
};
/**
 @browser Gecko
 */
HTMLElement.prototype.showPopup = function () {
};
/**
 @browser Gecko
 */
HTMLElement.prototype.hidePopup = function () {
};
/**
 @browser IE
 @param {boolean} [bContainerCapture]
 */
HTMLElement.prototype.setCapture = function (bContainerCapture) {
};
/**
 @browser IE
 */
HTMLElement.prototype.releaseCapture = function () {
};
/**
 @browser IE
 */
HTMLElement.prototype.clearAttributes = function () {
};
/**
 @browser IE
 @param {Object} [oSource]
 @param {boolean} [bPreserve]
 */
HTMLElement.prototype.mergeAttributes = function (oSource, bPreserve) {
};
HTMLElement.prototype = new Element();
HTMLElement = {};

/**
 @type {Number}
 @const
 */
ClientRect.prototype.bottom = 0;
/**
 @type {Number}
 @const
 */
ClientRect.prototype.height = 0;
/**
 @type {Number}
 @const
 */
ClientRect.prototype.left = 0;
/**
 @type {Number}
 @const
 */
ClientRect.prototype.right = 0;
/**
 @type {Number}
 @const
 */
ClientRect.prototype.top = 0;
/**
 @type {Number}
 @const
 */
ClientRect.prototype.width = 0;
ClientRect = {};

/**
 @type {string}
 */
CSSStyleDeclaration.prototype.cssText = null;
/**
 @type {number}
 */
CSSStyleDeclaration.prototype.length = 0;
/**
 @type {CSSRule}
 */
CSSStyleDeclaration.prototype.parentRule = 0;
/**
 @param {string} propertyName
 @return {CSSValue}
 */
CSSStyleDeclaration.prototype.getPropertyCSSValue = function (propertyName) {
};
/**
 @param {string} propertyName
 @return {string}
 */
CSSStyleDeclaration.prototype.getPropertyPriority = function (propertyName) {
};
/**
 @param {string} propertyName
 @return {string}
 */
CSSStyleDeclaration.prototype.getPropertyValue = function (propertyName) {
};
/**
 @param {Number} index
 @return {string}
 */
CSSStyleDeclaration.prototype.item = function (index) {
};
/**
 @param {string} propertyName
 @return {string}
 */
CSSStyleDeclaration.prototype.removeProperty = function (propertyName) {
};
/**
 @param {string} propertyName
 @param {string} value
 @param {string} priority
 @return {void}
 */
CSSStyleDeclaration.prototype.setProperty = function (propertyName, value, priority) {
};
CSSStyleDeclaration = {};

/**
 @static
 @type {number}
 @const
 */
CSSRule.STYLE_RULE = 1;
/**
 @static
 @type {number}
 @const
 */
CSSRule.MEDIA_RULE = 4;
/**
 @static
 @type {number}
 @const
 */
CSSRule.FONT_FACE_RULE = 5;
/**
 @static
 @type {number}
 @const
 */
CSSRule.PAGE_RULE = 6;
/**
 @static
 @type {number}
 @const
 */
CSSRule.IMPORT_RULE = 3;
/**
 @static
 @type {number}
 @const
 */
CSSRule.CHARSET_RULE = 2;
/**
 @static
 @type {number}
 @const
 */
CSSRule.UNKNOWN_RULE = 0;
/**
 @static
 @type {number}
 @const
 */
CSSRule.KEYFRAMES_RULE = 7;
/**
 @static
 @type {number}
 @const
 */
CSSRule.KEYFRAME_RULE = 8;
/**
 @static
 @type {number}
 @const
 */
CSSRule.NAMESPACE_RULE = 10;
/**
 @static
 @type {number}
 @const
 */
CSSRule.COUNTER_STYLE_RULE = 11;
/**
 @static
 @type {number}
 @const
 */
CSSRule.SUPPORTS_RULE = 12;
/**
 @static
 @type {number}
 @const
 */
CSSRule.DOCUMENT_RULE = 13;
/**
 @static
 @type {number}
 @const
 */
CSSRule.FONT_FEATURE_VALUES_RULE = 14;
/**
 @static
 @type {number}
 @const
 */
CSSRule.VIEWPORT_RULE = 15;
/**
 @static
 @type {number}
 @const
 */
CSSRule.REGION_STYLE_RULE = 16;
/**
 @type {string}
 */
CSSRule.prototype.cssText = null;
/**
 @type {CSSRule}
 */
CSSRule.prototype.parentRule = 0;
/**
 @type {CSSStyleSheet}
 */
CSSRule.prototype.parentStyleSheet = 0;
/**
 @type {number}
 */
CSSRule.prototype.type = 0;
CSSRule = {};

/**
 @static
 @type {number}
 @const
 */
CSSValue.CSS_INHERIT = 0;
/**
 @static
 @type {number}
 @const
 */
CSSValue.CSS_PRIMITIVE_VALUE = 1;
/**
 @static
 @type {number}
 @const
 */
CSSValue.CSS_VALUE_LIST = 2;
/**
 @static
 @type {number}
 @const
 */
CSSValue.CSS_CUSTOM = 3;
/**
 @type {string}
 */
CSSValue.prototype.cssText = null;
/**
 @type {number}
 */
CSSValue.prototype.cssValueType = 0;
CSSValue = {};

/**
 @type {CSSRule[]}
 @const
 */
CSSStyleSheet.prototype.cssRules = 0;
/**
 @type {CSSImportRule}
 @const
 */
CSSStyleSheet.prototype.ownerRule = 0;
/**
 @param {string} rule
 @param {number} index
 */
CSSStyleSheet.prototype.insertRule = function (rule, index) {
};
/**
 @param {number} index
 */
CSSStyleSheet.prototype.deleteRule = function (index) {
};
CSSStyleSheet = {};

/**
 @type {string}
 */
CSSImportRule.prototype.href = null;
/**
 @type {Object}
 */
CSSImportRule.prototype.media = 0;
/**
 @type {CSSStyleSheet}
 */
CSSImportRule.prototype.styleSheet = 0;
CSSImportRule = {};

/**
 @browser IE
 @type {boolean}
 */
IEElementStyle.prototype.hasLayout = 0;
IEElementStyle.prototype = new CSSStyleDeclaration();
IEElementStyle = {};

/**
 @type {string}
 */
HTMLHtmlElement.prototype.version = null;
HTMLHtmlElement.prototype = new HTMLElement();
HTMLHtmlElement = {};

/**
 @type {string}
 */
HTMLHeadElement.prototype.profile = null;
HTMLHeadElement.prototype = new HTMLElement();
HTMLHeadElement = {};

/**
 @type {boolean}
 */
HTMLLinkElement.prototype.disabled = 0;
/**
 @type {string}
 */
HTMLLinkElement.prototype.charset = null;
/**
 @type {string}
 */
HTMLLinkElement.prototype.href = null;
/**
 @type {string}
 */
HTMLLinkElement.prototype.hreflang = null;
/**
 @type {string}
 */
HTMLLinkElement.prototype.media = null;
/**
 @type {string}
 */
HTMLLinkElement.prototype.rel = null;
/**
 @type {string}
 */
HTMLLinkElement.prototype.rev = null;
/**
 @type {string}
 */
HTMLLinkElement.prototype.target = null;
/**
 @type {string}
 */
HTMLLinkElement.prototype.type = null;
HTMLLinkElement.prototype = new HTMLElement();
HTMLLinkElement = {};

/**
 @type {string}
 */
HTMLTitleElement.prototype.text = null;
HTMLTitleElement.prototype = new HTMLElement();
HTMLTitleElement = {};

/**
 @type {string}
 */
HTMLMetaElement.prototype.content = null;
/**
 @type {string}
 */
HTMLMetaElement.prototype.httpEquiv = null;
/**
 @type {string}
 */
HTMLMetaElement.prototype.name = null;
/**
 @type {string}
 */
HTMLMetaElement.prototype.scheme = null;
HTMLMetaElement.prototype = new HTMLElement();
HTMLMetaElement = {};

/**
 @type {string}
 */
HTMLBaseElement.prototype.href = null;
/**
 @type {string}
 */
HTMLBaseElement.prototype.target = null;
HTMLBaseElement.prototype = new HTMLElement();
HTMLBaseElement = {};

/**
 @type {HTMLFormElement}
 @const
 */
HTMLIsIndexElement.prototype.form = 0;
/**
 @type {string}
 */
HTMLIsIndexElement.prototype.prompt = null;
HTMLIsIndexElement.prototype = new HTMLElement();
HTMLIsIndexElement = {};

/**
 @type {boolean}
 */
HTMLStyleElement.prototype.disabled = 0;
/**
 @type {string}
 */
HTMLStyleElement.prototype.media = null;
/**
 @type {string}
 */
HTMLStyleElement.prototype.type = null;
/**
 @browser IE
 @type {Stylesheet}
 */
HTMLStyleElement.prototype.styleSheet = 0;
HTMLStyleElement.prototype = new HTMLElement();
HTMLStyleElement = {};

/**
 @type {string}
 */
HTMLBodyElement.prototype.aLink = null;
/**
 @type {string}
 */
HTMLBodyElement.prototype.background = null;
/**
 @type {string}
 */
HTMLBodyElement.prototype.bgColor = null;
/**
 @type {string}
 */
HTMLBodyElement.prototype.link = null;
/**
 @type {string}
 */
HTMLBodyElement.prototype.text = null;
/**
 @type {string}
 */
HTMLBodyElement.prototype.vLink = null;
/**
 @type {Function}
 */
Object.defineProperty(HTMLBodyElement, "onload", {
    set: function (value) {
    }
});
/**
 @type {Function}
 */
Object.defineProperty(HTMLBodyElement, "onunload", {
    set: function (value) {
    }
});
HTMLBodyElement.prototype = new HTMLElement();
HTMLBodyElement = {};

/**
 @type {HTMLCollection}
 @const
 */
HTMLFormElement.prototype.elements = 0;
/**
 @type {Number}
 @const
 */
HTMLFormElement.prototype.length = 0;
/**
 @type {string}
 */
HTMLFormElement.prototype.name = null;
/**
 @type {string}
 */
HTMLFormElement.prototype.acceptCharset = null;
/**
 @type {string}
 */
HTMLFormElement.prototype.action = null;
/**
 @type {string}
 */
HTMLFormElement.prototype.enctype = null;
/**
 @type {string}
 */
HTMLFormElement.prototype.method = null;
/**
 @type {string}
 */
HTMLFormElement.prototype.target = null;
HTMLFormElement.prototype.submit = function () {
};
HTMLFormElement.prototype.reset = function () {
};
HTMLFormElement.prototype = new HTMLElement();
HTMLFormElement = {};

/**
 @type {string}
 @const
 */
HTMLSelectElement.prototype.type = null;
/**
 @type {Number}
 */
HTMLSelectElement.prototype.selectedIndex = 0;
/**
 @type {string}
 */
HTMLSelectElement.prototype.value = null;
/**
 @type {Number}
 */
HTMLSelectElement.prototype.length = 0;
/**
 @type {HTMLFormElement}
 @const
 */
HTMLSelectElement.prototype.form = 0;
/**
 @type {HTMLOptionsCollection}
 @const
 */
HTMLSelectElement.prototype.options = 0;
/**
 @type {boolean}
 */
HTMLSelectElement.prototype.disabled = 0;
/**
 @type {boolean}
 */
HTMLSelectElement.prototype.multiple = 0;
/**
 @type {string}
 */
HTMLSelectElement.prototype.name = null;
/**
 @type {Number}
 */
HTMLSelectElement.prototype.size = 0;
/**
 @type {Number}
 */
HTMLSelectElement.prototype.tabIndex = 0;
/**
 @param {HTMLElement} element
 @param {HTMLElement} before
 */
HTMLSelectElement.prototype.add = function (element, before) {
};
/**
 @param {Number} index
 */
HTMLSelectElement.prototype.remove = function (index) {
};
HTMLSelectElement.prototype.blur = function () {
};
HTMLSelectElement.prototype.focus = function () {
};
HTMLSelectElement.prototype = new HTMLElement();
HTMLSelectElement = {};

/**
 @type {boolean}
 */
HTMLOptGroupElement.prototype.disabled = 0;
/**
 @type {string}
 */
HTMLOptGroupElement.prototype.label = null;
HTMLOptGroupElement.prototype = new HTMLElement();
HTMLOptGroupElement = {};

/**
 @type {HTMLFormElement}
 @const
 */
HTMLOptionElement.prototype.form = 0;
/**
 @type {boolean}
 */
HTMLOptionElement.prototype.defaultSelected = 0;
/**
 @type {string}
 */
HTMLOptionElement.prototype.text = null;
/**
 @type {Number}
 */
HTMLOptionElement.prototype.index = 0;
/**
 @type {boolean}
 */
HTMLOptionElement.prototype.disabled = 0;
/**
 @type {string}
 */
HTMLOptionElement.prototype.label = null;
/**
 @type {boolean}
 */
HTMLOptionElement.prototype.selected = 0;
/**
 @type {string}
 */
HTMLOptionElement.prototype.value = null;
HTMLOptionElement.prototype = new HTMLElement();
HTMLOptionElement = {};

/**
 @type {string}
 */
HTMLInputElement.prototype.defaultValue = null;
/**
 @type {boolean}
 */
HTMLInputElement.prototype.defaultChecked = 0;
/**
 @type {HTMLFormElement}
 @const
 */
HTMLInputElement.prototype.form = 0;
/**
 @type {string}
 */
HTMLInputElement.prototype.accept = null;
/**
 @type {string}
 */
HTMLInputElement.prototype.accessKey = null;
/**
 @type {string}
 */
HTMLInputElement.prototype.align = null;
/**
 @type {string}
 */
HTMLInputElement.prototype.alt = null;
/**
 @type {boolean}
 */
HTMLInputElement.prototype.checked = 0;
/**
 @type {boolean}
 */
HTMLInputElement.prototype.disabled = 0;
/**
 @type {Number}
 */
HTMLInputElement.prototype.maxLength = 0;
/**
 @type {string}
 */
HTMLInputElement.prototype.name = null;
/**
 @type {boolean}
 */
HTMLInputElement.prototype.readOnly = 0;
/**
 @type {Number}
 */
HTMLInputElement.prototype.size = 0;
/**
 @type {string}
 */
HTMLInputElement.prototype.src = null;
/**
 @type {Number}
 */
HTMLInputElement.prototype.tabIndex = 0;
/**
 @type {string}
 */
HTMLInputElement.prototype.type = null;
/**
 @type {string}
 */
HTMLInputElement.prototype.useMap = null;
/**
 @type {string}
 */
HTMLInputElement.prototype.value = null;
/**
 @type {Number}
 */
HTMLInputElement.prototype.selectionStart = 0;
/**
 @type {Number}
 */
HTMLInputElement.prototype.selectionEnd = 0;
HTMLInputElement.prototype.blur = function () {
};
HTMLInputElement.prototype.focus = function () {
};
HTMLInputElement.prototype.select = function () {
};
HTMLInputElement.prototype.click = function () {
};
/**
 @browser Gecko
 @param {Number} [start]
 @param {Number} [end]
 */
HTMLInputElement.prototype.setSelectionRange = function (start, end) {
};
/**
 @browser IE
 @return {TextRange}
 */
HTMLInputElement.prototype.createTextRange = function () {
};
HTMLInputElement.prototype = new HTMLElement();
HTMLInputElement = {};

/**
 @type {string}
 */
HTMLTextAreaElement.prototype.defaultValue = null;
/**
 @type {HTMLFormElement}
 @const
 */
HTMLTextAreaElement.prototype.form = 0;
/**
 @type {string}
 */
HTMLTextAreaElement.prototype.accessKey = null;
/**
 @type {Number}
 */
HTMLTextAreaElement.prototype.cols = 0;
/**
 @type {boolean}
 */
HTMLTextAreaElement.prototype.disabled = 0;
/**
 @type {string}
 */
HTMLTextAreaElement.prototype.name = null;
/**
 @type {boolean}
 */
HTMLTextAreaElement.prototype.readOnly = 0;
/**
 @type {Number}
 */
HTMLTextAreaElement.prototype.rows = 0;
/**
 @type {Number}
 */
HTMLTextAreaElement.prototype.tabIndex = 0;
/**
 @type {string}
 */
HTMLTextAreaElement.prototype.type = null;
/**
 @type {string}
 */
HTMLTextAreaElement.prototype.value = null;
HTMLTextAreaElement.prototype.blur = function () {
};
HTMLTextAreaElement.prototype.focus = function () {
};
HTMLTextAreaElement.prototype.select = function () {
};
HTMLTextAreaElement.prototype = new HTMLElement();
HTMLTextAreaElement = {};

/**
 @type {HTMLFormElement}
 @const
 */
HTMLButtonElement.prototype.form = 0;
/**
 @type {string}
 */
HTMLButtonElement.prototype.accessKey = null;
/**
 @type {boolean}
 */
HTMLButtonElement.prototype.disabled = 0;
/**
 @type {string}
 */
HTMLButtonElement.prototype.name = null;
/**
 @type {Number}
 */
HTMLButtonElement.prototype.tabIndex = 0;
/**
 @type {string}
 */
HTMLButtonElement.prototype.type = null;
/**
 @type {string}
 */
HTMLButtonElement.prototype.value = null;
HTMLButtonElement.prototype = new HTMLElement();
HTMLButtonElement = {};

/**
 @type {HTMLFormElement}
 @const
 */
HTMLLabelElement.prototype.form = 0;
/**
 @type {string}
 */
HTMLLabelElement.prototype.accessKey = null;
/**
 @type {string}
 */
HTMLLabelElement.prototype.htmlFor = null;
HTMLLabelElement.prototype = new HTMLElement();
HTMLLabelElement = {};

/**
 @type {HTMLFormElement}
 @const
 */
HTMLFieldSetElement.prototype.form = 0;
HTMLFieldSetElement.prototype = new HTMLElement();
HTMLFieldSetElement = {};

/**
 @type {HTMLFormElement}
 @const
 */
HTMLLegendElement.prototype.form = 0;
/**
 @type {string}
 */
HTMLLegendElement.prototype.accessKey = null;
/**
 @type {string}
 */
HTMLLegendElement.prototype.align = null;
HTMLLegendElement.prototype = new HTMLElement();
HTMLLegendElement = {};

/**
 @type {boolean}
 */
HTMLUListElement.prototype.compact = 0;
/**
 @type {string}
 */
HTMLUListElement.prototype.type = null;
HTMLUListElement.prototype = new HTMLElement();
HTMLUListElement = {};

/**
 @type {boolean}
 */
HTMLOListElement.prototype.compact = 0;
/**
 @type {Number}
 */
HTMLOListElement.prototype.start = 0;
/**
 @type {string}
 */
HTMLOListElement.prototype.type = null;
HTMLOListElement.prototype = new HTMLElement();
HTMLOListElement = {};

/**
 @type {boolean}
 */
HTMLDListElement.prototype.compact = 0;
HTMLDListElement.prototype = new HTMLElement();
HTMLDListElement = {};

/**
 @type {boolean}
 */
HTMLDirectoryElement.prototype.compact = 0;
HTMLDirectoryElement.prototype = new HTMLElement();
HTMLDirectoryElement = {};

/**
 @type {boolean}
 */
HTMLMenuElement.prototype.compact = 0;
HTMLMenuElement.prototype = new HTMLElement();
HTMLMenuElement = {};

/**
 @type {string}
 */
HTMLLIElement.prototype.type = null;
/**
 @type {Number}
 */
HTMLLIElement.prototype.value = 0;
HTMLLIElement.prototype = new HTMLElement();
HTMLLIElement = {};

/**
 @type {string}
 */
HTMLDivElement.prototype.align = null;
HTMLDivElement.prototype = new HTMLElement();
HTMLDivElement = {};

/**
 @type {string}
 */
HTMLParagraphElement.prototype.align = null;
HTMLParagraphElement.prototype = new HTMLElement();
HTMLParagraphElement = {};

/**
 @type {string}
 */
HTMLHeadingElement.prototype.align = null;
HTMLHeadingElement.prototype = new HTMLElement();
HTMLHeadingElement = {};

/**
 @type {string}
 */
HTMLQuoteElement.prototype.cite = null;
HTMLQuoteElement.prototype = new HTMLElement();
HTMLQuoteElement = {};

/**
 @type {Number}
 */
HTMLPreElement.prototype.width = 0;
HTMLPreElement.prototype = new HTMLElement();
HTMLPreElement = {};

/**
 @type {string}
 */
HTMLBRElement.prototype.clear = null;
HTMLBRElement.prototype = new HTMLElement();
HTMLBRElement = {};

/**
 @type {string}
 */
HTMLBaseFontElement.prototype.color = null;
/**
 @type {string}
 */
HTMLBaseFontElement.prototype.face = null;
/**
 @type {Number}
 */
HTMLBaseFontElement.prototype.size = 0;
HTMLBaseFontElement.prototype = new HTMLElement();
HTMLBaseFontElement = {};

/**
 @type {string}
 */
HTMLFontElement.prototype.color = null;
/**
 @type {string}
 */
HTMLFontElement.prototype.face = null;
/**
 @type {string}
 */
HTMLFontElement.prototype.size = null;
HTMLFontElement.prototype = new HTMLElement();
HTMLFontElement = {};

/**
 @type {string}
 */
HTMLHRElement.prototype.align = null;
/**
 @type {boolean}
 */
HTMLHRElement.prototype.noShade = 0;
/**
 @type {string}
 */
HTMLHRElement.prototype.size = null;
/**
 @type {string}
 */
HTMLHRElement.prototype.width = null;
HTMLHRElement.prototype = new HTMLElement();
HTMLHRElement = {};

/**
 @type {string}
 */
HTMLModElement.prototype.cite = null;
/**
 @type {string}
 */
HTMLModElement.prototype.dateTime = null;
HTMLModElement.prototype = new HTMLElement();
HTMLModElement = {};

/**
 @type {string}
 */
HTMLAnchorElement.prototype.accessKey = null;
/**
 @type {string}
 */
HTMLAnchorElement.prototype.charset = null;
/**
 @type {string}
 */
HTMLAnchorElement.prototype.coords = null;
/**
 @type {string}
 */
HTMLAnchorElement.prototype.href = null;
/**
 @type {string}
 */
HTMLAnchorElement.prototype.hreflang = null;
/**
 @type {string}
 */
HTMLAnchorElement.prototype.name = null;
/**
 @type {string}
 */
HTMLAnchorElement.prototype.rel = null;
/**
 @type {string}
 */
HTMLAnchorElement.prototype.rev = null;
/**
 @type {string}
 */
HTMLAnchorElement.prototype.shape = null;
/**
 @type {Number}
 */
HTMLAnchorElement.prototype.tabIndex = 0;
/**
 @type {string}
 */
HTMLAnchorElement.prototype.target = null;
/**
 @type {string}
 */
HTMLAnchorElement.prototype.type = null;
HTMLAnchorElement.prototype.blur = function () {
};
HTMLAnchorElement.prototype.focus = function () {
};
HTMLAnchorElement.prototype = new HTMLElement();
HTMLAnchorElement = {};

/**
 @type {string}
 */
HTMLImageElement.prototype.name = null;
/**
 @type {string}
 */
HTMLImageElement.prototype.align = null;
/**
 @type {string}
 */
HTMLImageElement.prototype.alt = null;
/**
 @type {string}
 */
HTMLImageElement.prototype.border = null;
/**
 @type {Number}
 */
HTMLImageElement.prototype.height = 0;
/**
 @type {Number}
 */
HTMLImageElement.prototype.hspace = 0;
/**
 @type {boolean}
 */
HTMLImageElement.prototype.isMap = 0;
/**
 @type {string}
 */
HTMLImageElement.prototype.longDesc = null;
/**
 @type {string}
 */
HTMLImageElement.prototype.src = null;
/**
 @type {string}
 */
HTMLImageElement.prototype.useMap = null;
/**
 @type {Number}
 */
HTMLImageElement.prototype.vspace = 0;
/**
 @type {Number}
 */
HTMLImageElement.prototype.width = 0;
/**
 @type {Function}
 */
Object.defineProperty(HTMLImageElement, "onload", {
    set: function (value) {
    }
});
/**
 @type {Function}
 */
Object.defineProperty(HTMLImageElement, "onunload", {
    set: function (value) {
    }
});
HTMLImageElement.prototype = new HTMLElement();
HTMLImageElement = {};

/**
 @type {HTMLFormElement}
 @const
 */
HTMLObjectElement.prototype.form = 0;
/**
 @type {string}
 */
HTMLObjectElement.prototype.code = null;
/**
 @type {string}
 */
HTMLObjectElement.prototype.align = null;
/**
 @type {string}
 */
HTMLObjectElement.prototype.archive = null;
/**
 @type {string}
 */
HTMLObjectElement.prototype.border = null;
/**
 @type {string}
 */
HTMLObjectElement.prototype.codeBase = null;
/**
 @type {string}
 */
HTMLObjectElement.prototype.codeType = null;
/**
 @type {string}
 */
HTMLObjectElement.prototype.data = null;
/**
 @type {boolean}
 */
HTMLObjectElement.prototype.declare = 0;
/**
 @type {string}
 */
HTMLObjectElement.prototype.height = null;
/**
 @type {Number}
 */
HTMLObjectElement.prototype.hspace = 0;
/**
 @type {string}
 */
HTMLObjectElement.prototype.name = null;
/**
 @type {string}
 */
HTMLObjectElement.prototype.standby = null;
/**
 @type {Number}
 */
HTMLObjectElement.prototype.tabIndex = 0;
/**
 @type {string}
 */
HTMLObjectElement.prototype.type = null;
/**
 @type {string}
 */
HTMLObjectElement.prototype.useMap = null;
/**
 @type {Number}
 */
HTMLObjectElement.prototype.vspace = 0;
/**
 @type {string}
 */
HTMLObjectElement.prototype.width = null;
/**
 @type {Document}
 @const
 */
HTMLObjectElement.prototype.contentDocument = 0;
HTMLObjectElement.prototype = new HTMLElement();
HTMLObjectElement = {};

/**
 @type {string}
 */
HTMLParamElement.prototype.name = null;
/**
 @type {string}
 */
HTMLParamElement.prototype.type = null;
/**
 @type {string}
 */
HTMLParamElement.prototype.value = null;
/**
 @type {string}
 */
HTMLParamElement.prototype.valueType = null;
HTMLParamElement.prototype = new HTMLElement();
HTMLParamElement = {};

/**
 @type {string}
 */
HTMLAppletElement.prototype.align = null;
/**
 @type {string}
 */
HTMLAppletElement.prototype.alt = null;
/**
 @type {string}
 */
HTMLAppletElement.prototype.archive = null;
/**
 @type {string}
 */
HTMLAppletElement.prototype.code = null;
/**
 @type {string}
 */
HTMLAppletElement.prototype.codeBase = null;
/**
 @type {string}
 */
HTMLAppletElement.prototype.height = null;
/**
 @type {Number}
 */
HTMLAppletElement.prototype.hspace = 0;
/**
 @type {string}
 */
HTMLAppletElement.prototype.name = null;
/**
 @type {string}
 */
HTMLAppletElement.prototype.object = null;
/**
 @type {Number}
 */
HTMLAppletElement.prototype.vspace = 0;
/**
 @type {string}
 */
HTMLAppletElement.prototype.width = null;
HTMLAppletElement.prototype = new HTMLElement();
HTMLAppletElement = {};

/**
 @type {HTMLCollection}
 @const
 */
HTMLMapElement.prototype.areas = 0;
/**
 @type {string}
 */
HTMLMapElement.prototype.name = null;
HTMLMapElement.prototype = new HTMLElement();
HTMLMapElement = {};

/**
 @type {string}
 */
HTMLAreaElement.prototype.accessKey = null;
/**
 @type {string}
 */
HTMLAreaElement.prototype.alt = null;
/**
 @type {string}
 */
HTMLAreaElement.prototype.coords = null;
/**
 @type {string}
 */
HTMLAreaElement.prototype.href = null;
/**
 @type {boolean}
 */
HTMLAreaElement.prototype.noHref = 0;
/**
 @type {string}
 */
HTMLAreaElement.prototype.shape = null;
/**
 @type {Number}
 */
HTMLAreaElement.prototype.tabIndex = 0;
/**
 @type {string}
 */
HTMLAreaElement.prototype.target = null;
HTMLAreaElement.prototype = new HTMLElement();
HTMLAreaElement = {};

/**
 @type {string}
 */
HTMLScriptElement.prototype.text = null;
/**
 @type {string}
 */
HTMLScriptElement.prototype.htmlFor = null;
/**
 @type {string}
 */
HTMLScriptElement.prototype.event = null;
/**
 @type {string}
 */
HTMLScriptElement.prototype.charset = null;
/**
 @type {boolean}
 */
HTMLScriptElement.prototype.defer = 0;
/**
 @type {string}
 */
HTMLScriptElement.prototype.src = null;
/**
 @type {string}
 */
HTMLScriptElement.prototype.type = null;
HTMLScriptElement.prototype = new HTMLElement();
HTMLScriptElement = {};

/**
 @type {HTMLTableCaptionElement}
 */
HTMLTableElement.prototype.caption = 0;
/**
 @type {HTMLTableSectionElement}
 */
HTMLTableElement.prototype.tHead = 0;
/**
 @type {HTMLTableSectionElement}
 */
HTMLTableElement.prototype.tFoot = 0;
/**
 @type {HTMLCollection}
 @const
 */
HTMLTableElement.prototype.rows = 0;
/**
 @type {HTMLCollection}
 @const
 */
HTMLTableElement.prototype.tBodies = 0;
/**
 @type {string}
 */
HTMLTableElement.prototype.align = null;
/**
 @type {string}
 */
HTMLTableElement.prototype.bgColor = null;
/**
 @type {string}
 */
HTMLTableElement.prototype.border = null;
/**
 @type {string}
 */
HTMLTableElement.prototype.cellPadding = null;
/**
 @type {string}
 */
HTMLTableElement.prototype.cellSpacing = null;
/**
 @type {string}
 */
HTMLTableElement.prototype.frame = null;
/**
 @type {string}
 */
HTMLTableElement.prototype.rules = null;
/**
 @type {string}
 */
HTMLTableElement.prototype.summary = null;
/**
 @type {string}
 */
HTMLTableElement.prototype.width = null;
/**
 @return {HTMLElement}
 */
HTMLTableElement.prototype.createTHead = function () {
};
HTMLTableElement.prototype.deleteTHead = function () {
};
/**
 @return {HTMLElement}
 */
HTMLTableElement.prototype.createTFoot = function () {
};
HTMLTableElement.prototype.deleteTFoot = function () {
};
/**
 @return {HTMLElement}
 */
HTMLTableElement.prototype.createCaption = function () {
};
HTMLTableElement.prototype.deleteCaption = function () {
};
/**
 @param {Number} index
 @return {HTMLElement}
 */
HTMLTableElement.prototype.insertRow = function (index) {
};
/**
 @param {Number} index
 */
HTMLTableElement.prototype.deleteRow = function (index) {
};
HTMLTableElement.prototype = new HTMLElement();
HTMLTableElement = {};

/**
 @type {string}
 */
HTMLTableCaptionElement.prototype.align = null;
HTMLTableCaptionElement.prototype = new HTMLElement();
HTMLTableCaptionElement = {};

/**
 @type {string}
 */
HTMLTableColElement.prototype.align = null;
/**
 @type {string}
 */
HTMLTableColElement.prototype.ch = null;
/**
 @type {string}
 */
HTMLTableColElement.prototype.chOff = null;
/**
 @type {Number}
 */
HTMLTableColElement.prototype.span = 0;
/**
 @type {string}
 */
HTMLTableColElement.prototype.vAlign = null;
/**
 @type {string}
 */
HTMLTableColElement.prototype.width = null;
HTMLTableColElement.prototype = new HTMLElement();
HTMLTableColElement = {};

/**
 @type {string}
 */
HTMLTableSectionElement.prototype.align = null;
/**
 @type {string}
 */
HTMLTableSectionElement.prototype.ch = null;
/**
 @type {string}
 */
HTMLTableSectionElement.prototype.chOff = null;
/**
 @type {string}
 */
HTMLTableSectionElement.prototype.vAlign = null;
/**
 @type {HTMLCollection}
 @const
 */
HTMLTableSectionElement.prototype.rows = 0;
/**
 @param {Number} index
 @return {HTMLElement}
 */
HTMLTableSectionElement.prototype.insertRow = function (index) {
};
/**
 @param {Number} index
 */
HTMLTableSectionElement.prototype.deleteRow = function (index) {
};
HTMLTableSectionElement.prototype = new HTMLElement();
HTMLTableSectionElement = {};

/**
 @type {Number}
 @const
 */
HTMLTableRowElement.prototype.rowIndex = 0;
/**
 @type {Number}
 @const
 */
HTMLTableRowElement.prototype.sectionRowIndex = 0;
/**
 @type {HTMLCollection}
 @const
 */
HTMLTableRowElement.prototype.cells = 0;
/**
 @type {string}
 */
HTMLTableRowElement.prototype.align = null;
/**
 @type {string}
 */
HTMLTableRowElement.prototype.bgColor = null;
/**
 @type {string}
 */
HTMLTableRowElement.prototype.ch = null;
/**
 @type {string}
 */
HTMLTableRowElement.prototype.chOff = null;
/**
 @type {string}
 */
HTMLTableRowElement.prototype.vAlign = null;
/**
 @param {Number} index
 @return {HTMLElement}
 */
HTMLTableRowElement.prototype.insertCell = function (index) {
};
/**
 @param {Number} index
 */
HTMLTableRowElement.prototype.deleteCell = function (index) {
};
HTMLTableRowElement.prototype = new HTMLElement();
HTMLTableRowElement = {};

/**
 @type {Number}
 @const
 */
HTMLTableCellElement.prototype.cellIndex = 0;
/**
 @type {string}
 */
HTMLTableCellElement.prototype.abbr = null;
/**
 @type {string}
 */
HTMLTableCellElement.prototype.align = null;
/**
 @type {string}
 */
HTMLTableCellElement.prototype.axis = null;
/**
 @type {string}
 */
HTMLTableCellElement.prototype.bgColor = null;
/**
 @type {string}
 */
HTMLTableCellElement.prototype.ch = null;
/**
 @type {string}
 */
HTMLTableCellElement.prototype.chOff = null;
/**
 @type {Number}
 */
HTMLTableCellElement.prototype.colSpan = 0;
/**
 @type {string}
 */
HTMLTableCellElement.prototype.headers = null;
/**
 @type {string}
 */
HTMLTableCellElement.prototype.height = null;
/**
 @type {boolean}
 */
HTMLTableCellElement.prototype.noWrap = 0;
/**
 @type {Number}
 */
HTMLTableCellElement.prototype.rowSpan = 0;
/**
 @type {string}
 */
HTMLTableCellElement.prototype.scope = null;
/**
 @type {string}
 */
HTMLTableCellElement.prototype.vAlign = null;
/**
 @type {string}
 */
HTMLTableCellElement.prototype.width = null;
HTMLTableCellElement.prototype = new HTMLElement();
HTMLTableCellElement = {};

/**
 @type {string}
 */
HTMLFrameSetElement.prototype.cols = null;
/**
 @type {string}
 */
HTMLFrameSetElement.prototype.rows = null;
HTMLFrameSetElement.prototype = new HTMLElement();
HTMLFrameSetElement = {};

/**
 @type {string}
 */
HTMLFrameElement.prototype.frameBorder = null;
/**
 @type {string}
 */
HTMLFrameElement.prototype.longDesc = null;
/**
 @type {string}
 */
HTMLFrameElement.prototype.marginHeight = null;
/**
 @type {string}
 */
HTMLFrameElement.prototype.marginWidth = null;
/**
 @type {string}
 */
HTMLFrameElement.prototype.name = null;
/**
 @type {boolean}
 */
HTMLFrameElement.prototype.noResize = 0;
/**
 @type {string}
 */
HTMLFrameElement.prototype.scrolling = null;
/**
 @type {string}
 */
HTMLFrameElement.prototype.src = null;
/**
 @browser Gecko
 @type {Document}
 @const
 */
HTMLFrameElement.prototype.contentDocument = 0;
HTMLFrameElement.prototype = new HTMLElement();
HTMLFrameElement = {};

/**
 @type {string}
 */
HTMLIFrameElement.prototype.align = null;
/**
 @type {string}
 */
HTMLIFrameElement.prototype.frameBorder = null;
/**
 @type {string}
 */
HTMLIFrameElement.prototype.height = null;
/**
 @type {string}
 */
HTMLIFrameElement.prototype.longDesc = null;
/**
 @type {string}
 */
HTMLIFrameElement.prototype.marginHeight = null;
/**
 @type {string}
 */
HTMLIFrameElement.prototype.marginWidth = null;
/**
 @type {string}
 */
HTMLIFrameElement.prototype.name = null;
/**
 @type {string}
 */
HTMLIFrameElement.prototype.scrolling = null;
/**
 @type {string}
 */
HTMLIFrameElement.prototype.src = null;
/**
 @type {string}
 */
HTMLIFrameElement.prototype.width = null;
/**
 @type {Document}
 @const
 */
HTMLIFrameElement.prototype.contentDocument = 0;
/**
 @type {Window}
 @const
 */
HTMLIFrameElement.prototype.contentWindow = 0;
HTMLIFrameElement.prototype = new HTMLElement();
HTMLIFrameElement = {};
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozAnimation = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozAnimationDelay = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozAnimationDirection = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozAnimationDuration = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozAnimationFillMode = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozAnimationIterationCount = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozAnimationName = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozAnimationPlayState = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozAnimationTimingFunction = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozAppearance = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozBackfaceVisibility = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozBackgroundClip = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozBackgroundImage = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozBackgroundOrigin = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozBackgroundSize = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozBinding = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozBorderBottomColors = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozBorderImage = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozBorderLeftColors = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozBorderRadius = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozBorderRadiusBottomleft = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozBorderRadiusBottomright = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozBorderRadiusTopleft = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozBorderRadiusTopright = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozBorderRightColors = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozBorderTopColors = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozBoxAlign = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozBoxDirection = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozBoxFlex = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozBoxOrdinalGroup = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozBoxOrient = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozBoxPack = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozBoxShadow = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozBoxSizing = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozColumnCount = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozColumnFill = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozColumnGap = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozColumnRule = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozColumnRuleColor = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozColumnRuleStyle = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozColumnRuleWidth = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozColumnWidth = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozColumns = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozFontFeatureSettings = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozFontLanguageOverride = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozHyphens = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozMarginStart = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozOpacity = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozOrient = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozOutlineColor = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozOutlineRadius = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozOutlineRadiusBottomleft = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozOutlineRadiusBottomright = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozOutlineRadiusTopleft = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozOutlineRadiusTopright = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozPaddingEnd = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozPaddingStart = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozPerspective = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozPerspectiveOrigin = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozStackSizing = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozTabSize = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozTextAlignLast = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozTextDecorationColor = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozTextDecorationLine = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozTextDecorationStyle = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozTransform = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozTransformOrigin = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozTransition = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozTransitionDelay = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozTransitionDuration = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozTransitionProperty = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozTransitionTimingFunction = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozUserFocus = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozUserInput = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozUserModify = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozUserSelect = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.mozWindowShadow = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msAccelerator = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msBackgroundPositionX = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msBackgroundPositionY = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msBehavior = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msBlockProgression = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msBoxDecorationBreak = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msBoxOrdinalGroup = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msContentZoomChaining = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msContentZoomLimit = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msContentZoomLimitMax = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msContentZoomLimitMin = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msContentZoomSnap = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msContentZoomSnapPoints = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msContentZoomSnapType = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msContentZooming = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msFilter = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msFlex = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msFlexAlign = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msFlexDirection = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msFlexOrder = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msFlexPack = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msFlexWrap = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msFlowFrom = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msFlowInto = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msGridColumn = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msGridColumnAlign = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msGridColumnSpan = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msGridColumns = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msGridRow = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msGridRowAlign = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msGridRowSpan = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msGridRows = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msHighContrastAdjust = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msHyphenateLimitChars = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msHyphenateLimitLines = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msHyphenateLimitZone = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msHyphens = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msImeAlign = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msImeMode = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msInterpolationMode = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msLayoutFlow = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msLayoutGrid = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msLayoutGridChar = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msLayoutGridLine = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msLayoutGridMode = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msLayoutGridType = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msOverflowStyle = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msOverflowX = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msOverflowY = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msProgressAppearance = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msScrollChaining = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msScrollLimit = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msScrollLimitXMax = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msScrollLimitXMin = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msScrollLimitYMax = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msScrollLimitYMin = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msScrollRails = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msScrollSnapPointsX = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msScrollSnapPointsY = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msScrollSnapType = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msScrollSnapX = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msScrollSnapY = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msScrollTranslation = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msScrollbar3dlightColor = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msScrollbarArrowColor = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msScrollbarBaseColor = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msScrollbarDarkshadowColor = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msScrollbarFaceColor = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msScrollbarHighlightColor = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msScrollbarShadowColor = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msScrollbarTrackColor = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msTextAlignLast = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msTextAutospace = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msTextCombineHorizontal = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msTextJustify = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msTextKashidaSpace = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msTextOverflow = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msTextSizeAdjust = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msTextUnderlinePosition = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msTransform = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msTransformOrigin = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msUnderlinePosition = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msUserSelect = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msWordWrap = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msWrapFlow = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msWrapMargin = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msWrapThrough = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msWritingMode = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msZoom = 0 || '';
/**
 @browser Opera
 */
CSSStyleDeclaration.prototype.oAnimation = 0 || '';
/**
 @browser Opera
 */
CSSStyleDeclaration.prototype.oAnimationDelay = 0 || '';
/**
 @browser Opera
 */
CSSStyleDeclaration.prototype.oAnimationDirection = 0 || '';
/**
 @browser Opera
 */
CSSStyleDeclaration.prototype.oAnimationDuration = 0 || '';
/**
 @browser Opera
 */
CSSStyleDeclaration.prototype.oAnimationFillMode = 0 || '';
/**
 @browser Opera
 */
CSSStyleDeclaration.prototype.oAnimationIterationCount = 0 || '';
/**
 @browser Opera
 */
CSSStyleDeclaration.prototype.oAnimationName = 0 || '';
/**
 @browser Opera
 */
CSSStyleDeclaration.prototype.oAnimationPlayState = 0 || '';
/**
 @browser Opera
 */
CSSStyleDeclaration.prototype.oAnimationTimingFunction = 0 || '';
/**
 @browser Opera
 */
CSSStyleDeclaration.prototype.oBackgroundImage = 0 || '';
/**
 @browser Opera
 */
CSSStyleDeclaration.prototype.oBackgroundSize = 0 || '';
/**
 @browser Opera
 */
CSSStyleDeclaration.prototype.oBorderImage = 0 || '';
/**
 @browser Opera
 */
CSSStyleDeclaration.prototype.oBoxDecorationBreak = 0 || '';
/**
 @browser Opera
 */
CSSStyleDeclaration.prototype.oBoxShadow = 0 || '';
/**
 @browser Opera
 */
CSSStyleDeclaration.prototype.oFontFeatureSettings = 0 || '';
/**
 @browser Opera
 */
CSSStyleDeclaration.prototype.oObjectFit = 0 || '';
/**
 @browser Opera
 */
CSSStyleDeclaration.prototype.oObjectPosition = 0 || '';
/**
 @browser Opera
 */
CSSStyleDeclaration.prototype.oTextOverflow = 0 || '';
/**
 @browser Opera
 */
CSSStyleDeclaration.prototype.oTransform = 0 || '';
/**
 @browser Opera
 */
CSSStyleDeclaration.prototype.oTransformOrigin = 0 || '';
/**
 @browser Opera
 */
CSSStyleDeclaration.prototype.oTransition = 0 || '';
/**
 @browser Opera
 */
CSSStyleDeclaration.prototype.oTransitionDelay = 0 || '';
/**
 @browser Opera
 */
CSSStyleDeclaration.prototype.oTransitionDuration = 0 || '';
/**
 @browser Opera
 */
CSSStyleDeclaration.prototype.oTransitionProperty = 0 || '';
/**
 @browser Opera
 */
CSSStyleDeclaration.prototype.oTransitionTimingFunction = 0 || '';
/**
 @browser Chrome
 */
CSSStyleDeclaration.prototype.webkitAlignContent = 0 || '';
CSSStyleDeclaration.prototype.webkitAlignItems = 0 || '';
/**
 @browser Chrome
 */
CSSStyleDeclaration.prototype.webkitAlignSelf = 0 || '';
CSSStyleDeclaration.prototype.webkitAnimation = 0 || '';
CSSStyleDeclaration.prototype.webkitAnimationDelay = 0 || '';
CSSStyleDeclaration.prototype.webkitAnimationDirection = 0 || '';
CSSStyleDeclaration.prototype.webkitAnimationDuration = 0 || '';
CSSStyleDeclaration.prototype.webkitAnimationFillMode = 0 || '';
CSSStyleDeclaration.prototype.webkitAnimationIterationCount = 0 || '';
CSSStyleDeclaration.prototype.webkitAnimationName = 0 || '';
CSSStyleDeclaration.prototype.webkitAnimationPlayState = 0 || '';
CSSStyleDeclaration.prototype.webkitAnimationTimingFunction = 0 || '';
CSSStyleDeclaration.prototype.webkitAppearance = 0 || '';
CSSStyleDeclaration.prototype.webkitBackfaceVisibility = 0 || '';
CSSStyleDeclaration.prototype.webkitBackgroundClip = 0 || '';
CSSStyleDeclaration.prototype.webkitBackgroundComposite = 0 || '';
CSSStyleDeclaration.prototype.webkitBackgroundImage = 0 || '';
CSSStyleDeclaration.prototype.webkitBackgroundOrigin = 0 || '';
CSSStyleDeclaration.prototype.webkitBackgroundSize = 0 || '';
CSSStyleDeclaration.prototype.webkitBorderBottomLeftRadius = 0 || '';
CSSStyleDeclaration.prototype.webkitBorderBottomRightRadius = 0 || '';
CSSStyleDeclaration.prototype.webkitBorderHorizontalSpacing = 0 || '';
CSSStyleDeclaration.prototype.webkitBorderImage = 0 || '';
CSSStyleDeclaration.prototype.webkitBorderRadius = 0 || '';
CSSStyleDeclaration.prototype.webkitBorderTopLeftRadius = 0 || '';
CSSStyleDeclaration.prototype.webkitBorderTopRightRadius = 0 || '';
CSSStyleDeclaration.prototype.webkitBorderVerticalSpacing = 0 || '';
CSSStyleDeclaration.prototype.webkitBoxAlign = 0 || '';
CSSStyleDeclaration.prototype.webkitBoxDecorationBreak = 0 || '';
CSSStyleDeclaration.prototype.webkitBoxDirection = 0 || '';
CSSStyleDeclaration.prototype.webkitBoxFlex = 0 || '';
CSSStyleDeclaration.prototype.webkitBoxFlexGroup = 0 || '';
CSSStyleDeclaration.prototype.webkitBoxLines = 0 || '';
CSSStyleDeclaration.prototype.webkitBoxOrdinalGroup = 0 || '';
CSSStyleDeclaration.prototype.webkitBoxOrient = 0 || '';
CSSStyleDeclaration.prototype.webkitBoxPack = 0 || '';
CSSStyleDeclaration.prototype.webkitBoxReflect = 0 || '';
CSSStyleDeclaration.prototype.webkitBoxShadow = 0 || '';
CSSStyleDeclaration.prototype.webkitBoxSizing = 0 || '';
CSSStyleDeclaration.prototype.webkitColumnBreakAfter = 0 || '';
CSSStyleDeclaration.prototype.webkitColumnBreakBefore = 0 || '';
CSSStyleDeclaration.prototype.webkitColumnBreakInside = 0 || '';
CSSStyleDeclaration.prototype.webkitColumnCount = 0 || '';
CSSStyleDeclaration.prototype.webkitColumnGap = 0 || '';
CSSStyleDeclaration.prototype.webkitColumnRule = 0 || '';
CSSStyleDeclaration.prototype.webkitColumnRuleColor = 0 || '';
CSSStyleDeclaration.prototype.webkitColumnRuleStyle = 0 || '';
CSSStyleDeclaration.prototype.webkitColumnRuleWidth = 0 || '';
CSSStyleDeclaration.prototype.webkitColumnSpan = 0 || '';
CSSStyleDeclaration.prototype.webkitColumnWidth = 0 || '';
CSSStyleDeclaration.prototype.webkitColumns = 0 || '';
CSSStyleDeclaration.prototype.webkitDashboardRegion = 0 || '';
CSSStyleDeclaration.prototype.webkitFlex = 0 || '';
/**
 @browser Chrome
 */
CSSStyleDeclaration.prototype.webkitFlexBasis = 0 || '';
/**
 @browser Chrome
 */
CSSStyleDeclaration.prototype.webkitFlexDirection = 0 || '';
/**
 @browser Chrome
 */
CSSStyleDeclaration.prototype.webkitFlexFlow = 0 || '';
/**
 @browser Chrome
 */
CSSStyleDeclaration.prototype.webkitFlexGrow = 0 || '';
/**
 @browser Chrome
 */
CSSStyleDeclaration.prototype.webkitFlexShrink = 0 || '';
CSSStyleDeclaration.prototype.webkitFlexWrap = 0 || '';
/**
 @browser Chrome
 */
CSSStyleDeclaration.prototype.webkitFontFeatureSettings = 0 || '';
CSSStyleDeclaration.prototype.webkitFontKerning = 0 || '';
CSSStyleDeclaration.prototype.webkitFontSmoothing = 0 || '';
CSSStyleDeclaration.prototype.webkitFontVariantLigatures = 0 || '';
CSSStyleDeclaration.prototype.webkitHyphens = 0 || '';
/**
 @browser Chrome
 */
CSSStyleDeclaration.prototype.webkitJustifyContent = 0 || '';
CSSStyleDeclaration.prototype.webkitLineBreak = 0 || '';
CSSStyleDeclaration.prototype.webkitMarginAfter = 0 || '';
CSSStyleDeclaration.prototype.webkitMarginBefore = 0 || '';
CSSStyleDeclaration.prototype.webkitMarginBottomCollapse = 0 || '';
CSSStyleDeclaration.prototype.webkitMarginCollapse = 0 || '';
CSSStyleDeclaration.prototype.webkitMarginEnd = 0 || '';
CSSStyleDeclaration.prototype.webkitMarginStart = 0 || '';
CSSStyleDeclaration.prototype.webkitMarginTopCollapse = 0 || '';
CSSStyleDeclaration.prototype.webkitMarquee = 0 || '';
CSSStyleDeclaration.prototype.webkitMarqueeDirection = 0 || '';
CSSStyleDeclaration.prototype.webkitMarqueeIncrement = 0 || '';
CSSStyleDeclaration.prototype.webkitMarqueeRepetition = 0 || '';
CSSStyleDeclaration.prototype.webkitMarqueeSpeed = 0 || '';
CSSStyleDeclaration.prototype.webkitMarqueeStyle = 0 || '';
CSSStyleDeclaration.prototype.webkitMask = 0 || '';
CSSStyleDeclaration.prototype.webkitMaskAttachment = 0 || '';
CSSStyleDeclaration.prototype.webkitMaskBoxImage = 0 || '';
CSSStyleDeclaration.prototype.webkitMaskClip = 0 || '';
CSSStyleDeclaration.prototype.webkitMaskComposite = 0 || '';
CSSStyleDeclaration.prototype.webkitMaskImage = 0 || '';
CSSStyleDeclaration.prototype.webkitMaskOrigin = 0 || '';
CSSStyleDeclaration.prototype.webkitMaskPosition = 0 || '';
CSSStyleDeclaration.prototype.webkitMaskPositionX = 0 || '';
CSSStyleDeclaration.prototype.webkitMaskPositionY = 0 || '';
CSSStyleDeclaration.prototype.webkitMaskRepeat = 0 || '';
CSSStyleDeclaration.prototype.webkitMaskSize = 0 || '';
CSSStyleDeclaration.prototype.webkitNbspMode = 0 || '';
/**
 @browser Chrome
 */
CSSStyleDeclaration.prototype.webkitOrder = 0 || '';
CSSStyleDeclaration.prototype.webkitPaddingAfter = 0 || '';
CSSStyleDeclaration.prototype.webkitPaddingBefore = 0 || '';
CSSStyleDeclaration.prototype.webkitPaddingEnd = 0 || '';
CSSStyleDeclaration.prototype.webkitPaddingStart = 0 || '';
CSSStyleDeclaration.prototype.webkitPerspective = 0 || '';
CSSStyleDeclaration.prototype.webkitPerspectiveOrigin = 0 || '';
CSSStyleDeclaration.prototype.webkitPrintColorAdjust = 0 || '';
CSSStyleDeclaration.prototype.webkitRegionFragment = 0 || '';
CSSStyleDeclaration.prototype.webkitRtlOrdering = 0 || '';
/**
 @browser Safari
 */
CSSStyleDeclaration.prototype.webkitShapeImageThreshold = 0 || '';
/**
 @browser Safari
 */
CSSStyleDeclaration.prototype.webkitShapeMargin = 0 || '';
/**
 @browser Safari
 */
CSSStyleDeclaration.prototype.webkitShapeOutside = 0 || '';
CSSStyleDeclaration.prototype.webkitTapHighlightColor = 0 || '';
/**
 @browser Safari
 */
CSSStyleDeclaration.prototype.webkitTextDecorationColor = 0 || '';
CSSStyleDeclaration.prototype.webkitTextDecorationStyle = 0 || '';
CSSStyleDeclaration.prototype.webkitTextEmphasis = 0 || '';
CSSStyleDeclaration.prototype.webkitTextEmphasisColor = 0 || '';
CSSStyleDeclaration.prototype.webkitTextEmphasisPosition = 0 || '';
CSSStyleDeclaration.prototype.webkitTextEmphasisStyle = 0 || '';
CSSStyleDeclaration.prototype.webkitTextFillColor = 0 || '';
CSSStyleDeclaration.prototype.webkitTextSecurity = 0 || '';
CSSStyleDeclaration.prototype.webkitTextSizeAdjust = 0 || '';
CSSStyleDeclaration.prototype.webkitTextStroke = 0 || '';
CSSStyleDeclaration.prototype.webkitTextStrokeColor = 0 || '';
CSSStyleDeclaration.prototype.webkitTextStrokeWidth = 0 || '';
CSSStyleDeclaration.prototype.webkitTouchCallout = 0 || '';
CSSStyleDeclaration.prototype.webkitTransform = 0 || '';
CSSStyleDeclaration.prototype.webkitTransformOrigin = 0 || '';
CSSStyleDeclaration.prototype.webkitTransformStyle = 0 || '';
CSSStyleDeclaration.prototype.webkitTransition = 0 || '';
CSSStyleDeclaration.prototype.webkitTransitionDelay = 0 || '';
CSSStyleDeclaration.prototype.webkitTransitionDuration = 0 || '';
CSSStyleDeclaration.prototype.webkitTransitionProperty = 0 || '';
CSSStyleDeclaration.prototype.webkitTransitionTimingFunction = 0 || '';
CSSStyleDeclaration.prototype.webkitUserDrag = 0 || '';
/**
 @browser Safari
 */
CSSStyleDeclaration.prototype.webkitUserModify = 0 || '';
CSSStyleDeclaration.prototype.webkitUserSelect = 0 || '';
/**
 @browser Chrome
 */
CSSStyleDeclaration.prototype.webkitWritingMode = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.accelerator = 0 || '';
CSSStyleDeclaration.prototype.accentHeight = 0 || '';
CSSStyleDeclaration.prototype.additiveSymbols = 0 || '';
CSSStyleDeclaration.prototype.alignContent = 0 || '';
CSSStyleDeclaration.prototype.alignItems = 0 || '';
CSSStyleDeclaration.prototype.alignSelf = 0 || '';
CSSStyleDeclaration.prototype.alignment = 0 || '';
CSSStyleDeclaration.prototype.alignmentAdjust = 0 || '';
CSSStyleDeclaration.prototype.alignmentBaseline = 0 || '';
CSSStyleDeclaration.prototype.all = 0 || '';
CSSStyleDeclaration.prototype.allSpaceTreatment = 0 || '';
CSSStyleDeclaration.prototype.animation = 0 || '';
CSSStyleDeclaration.prototype.animationDelay = 0 || '';
CSSStyleDeclaration.prototype.animationDirection = 0 || '';
CSSStyleDeclaration.prototype.animationDuration = 0 || '';
CSSStyleDeclaration.prototype.animationFillMode = 0 || '';
CSSStyleDeclaration.prototype.animationIterationCount = 0 || '';
CSSStyleDeclaration.prototype.animationName = 0 || '';
CSSStyleDeclaration.prototype.animationPlayState = 0 || '';
CSSStyleDeclaration.prototype.animationTimingFunction = 0 || '';
CSSStyleDeclaration.prototype.ascent = 0 || '';
CSSStyleDeclaration.prototype.atscDynamicRefresh = 0 || '';
CSSStyleDeclaration.prototype.atscNavDown = 0 || '';
CSSStyleDeclaration.prototype.atscNavIndex = 0 || '';
CSSStyleDeclaration.prototype.atscNavLeft = 0 || '';
CSSStyleDeclaration.prototype.atscNavRight = 0 || '';
CSSStyleDeclaration.prototype.atscNavUp = 0 || '';
CSSStyleDeclaration.prototype.azimuth = 0 || '';
CSSStyleDeclaration.prototype.backfaceVisibility = 0 || '';
CSSStyleDeclaration.prototype.background = 0 || '';
CSSStyleDeclaration.prototype.backgroundAttachment = 0 || '';
CSSStyleDeclaration.prototype.backgroundBlendMode = 0 || '';
CSSStyleDeclaration.prototype.backgroundClip = 0 || '';
CSSStyleDeclaration.prototype.backgroundColor = 0 || '';
CSSStyleDeclaration.prototype.backgroundImage = 0 || '';
CSSStyleDeclaration.prototype.backgroundOrigin = 0 || '';
CSSStyleDeclaration.prototype.backgroundPosition = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.backgroundPositionX = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.backgroundPositionY = 0 || '';
CSSStyleDeclaration.prototype.backgroundRepeat = 0 || '';
CSSStyleDeclaration.prototype.backgroundSize = 0 || '';
CSSStyleDeclaration.prototype.baseline = 0 || '';
CSSStyleDeclaration.prototype.baselineShift = 0 || '';
CSSStyleDeclaration.prototype.bbox = 0 || '';
CSSStyleDeclaration.prototype.behavior = 0 || '';
CSSStyleDeclaration.prototype.bikeshedding = 0 || '';
CSSStyleDeclaration.prototype.binding = 0 || '';
CSSStyleDeclaration.prototype.blockProgression = 0 || '';
CSSStyleDeclaration.prototype.bookmarkLabel = 0 || '';
CSSStyleDeclaration.prototype.bookmarkLevel = 0 || '';
CSSStyleDeclaration.prototype.bookmarkState = 0 || '';
CSSStyleDeclaration.prototype.border = 0 || '';
CSSStyleDeclaration.prototype.borderBottom = 0 || '';
CSSStyleDeclaration.prototype.borderBottomColor = 0 || '';
CSSStyleDeclaration.prototype.borderBottomLeftRadius = 0 || '';
CSSStyleDeclaration.prototype.borderBottomRightRadius = 0 || '';
CSSStyleDeclaration.prototype.borderBottomStyle = 0 || '';
CSSStyleDeclaration.prototype.borderBottomWidth = 0 || '';
CSSStyleDeclaration.prototype.borderCollapse = 0 || '';
CSSStyleDeclaration.prototype.borderColor = 0 || '';
CSSStyleDeclaration.prototype.borderImage = 0 || '';
CSSStyleDeclaration.prototype.borderImageOutset = 0 || '';
CSSStyleDeclaration.prototype.borderImageRepeat = 0 || '';
CSSStyleDeclaration.prototype.borderImageSlice = 0 || '';
CSSStyleDeclaration.prototype.borderImageSource = 0 || '';
CSSStyleDeclaration.prototype.borderImageWidth = 0 || '';
CSSStyleDeclaration.prototype.borderLeft = 0 || '';
CSSStyleDeclaration.prototype.borderLeftColor = 0 || '';
CSSStyleDeclaration.prototype.borderLeftStyle = 0 || '';
CSSStyleDeclaration.prototype.borderLeftWidth = 0 || '';
CSSStyleDeclaration.prototype.borderRadius = 0 || '';
CSSStyleDeclaration.prototype.borderRight = 0 || '';
CSSStyleDeclaration.prototype.borderRightColor = 0 || '';
CSSStyleDeclaration.prototype.borderRightStyle = 0 || '';
CSSStyleDeclaration.prototype.borderRightWidth = 0 || '';
CSSStyleDeclaration.prototype.borderSpacing = 0 || '';
CSSStyleDeclaration.prototype.borderStyle = 0 || '';
CSSStyleDeclaration.prototype.borderTop = 0 || '';
CSSStyleDeclaration.prototype.borderTopColor = 0 || '';
CSSStyleDeclaration.prototype.borderTopLeftRadius = 0 || '';
CSSStyleDeclaration.prototype.borderTopRightRadius = 0 || '';
CSSStyleDeclaration.prototype.borderTopStyle = 0 || '';
CSSStyleDeclaration.prototype.borderTopWidth = 0 || '';
CSSStyleDeclaration.prototype.borderWidth = 0 || '';
CSSStyleDeclaration.prototype.bottom = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.boxDecorationBreak = 0 || '';
CSSStyleDeclaration.prototype.boxShadow = 0 || '';
CSSStyleDeclaration.prototype.boxSizing = 0 || '';
CSSStyleDeclaration.prototype.boxSnap = 0 || '';
CSSStyleDeclaration.prototype.boxSuppress = 0 || '';
CSSStyleDeclaration.prototype.breakAfter = 0 || '';
CSSStyleDeclaration.prototype.breakBefore = 0 || '';
CSSStyleDeclaration.prototype.breakInside = 0 || '';
CSSStyleDeclaration.prototype.capHeight = 0 || '';
CSSStyleDeclaration.prototype.captionSide = 0 || '';
CSSStyleDeclaration.prototype.centerline = 0 || '';
CSSStyleDeclaration.prototype.childAlign = 0 || '';
CSSStyleDeclaration.prototype.clear = 0 || '';
CSSStyleDeclaration.prototype.clearAfter = 0 || '';
CSSStyleDeclaration.prototype.clearSide = 0 || '';
CSSStyleDeclaration.prototype.clip = 0 || '';
CSSStyleDeclaration.prototype.clipPath = 0 || '';
CSSStyleDeclaration.prototype.clipRule = 0 || '';
CSSStyleDeclaration.prototype.collapse = 0 || '';
CSSStyleDeclaration.prototype.color = 0 || '';
CSSStyleDeclaration.prototype.colorInterpolation = 0 || '';
CSSStyleDeclaration.prototype.colorInterpolationFilters = 0 || '';
CSSStyleDeclaration.prototype.colorProfile = 0 || '';
CSSStyleDeclaration.prototype.colorRendering = 0 || '';
CSSStyleDeclaration.prototype.columnCount = 0 || '';
CSSStyleDeclaration.prototype.columnFill = 0 || '';
CSSStyleDeclaration.prototype.columnGap = 0 || '';
CSSStyleDeclaration.prototype.columnRule = 0 || '';
CSSStyleDeclaration.prototype.columnRuleColor = 0 || '';
CSSStyleDeclaration.prototype.columnRuleStyle = 0 || '';
CSSStyleDeclaration.prototype.columnRuleWidth = 0 || '';
CSSStyleDeclaration.prototype.columnSpan = 0 || '';
CSSStyleDeclaration.prototype.columnWidth = 0 || '';
CSSStyleDeclaration.prototype.columns = 0 || '';
CSSStyleDeclaration.prototype.content = 0 || '';
CSSStyleDeclaration.prototype.counterIncrement = 0 || '';
CSSStyleDeclaration.prototype.counterReset = 0 || '';
CSSStyleDeclaration.prototype.counterSet = 0 || '';
CSSStyleDeclaration.prototype.crop = 0 || '';
CSSStyleDeclaration.prototype.cue = 0 || '';
CSSStyleDeclaration.prototype.cueAfter = 0 || '';
CSSStyleDeclaration.prototype.cueBefore = 0 || '';
CSSStyleDeclaration.prototype.cursor = 0 || '';
CSSStyleDeclaration.prototype.definitionSrc = 0 || '';
CSSStyleDeclaration.prototype.descent = 0 || '';
CSSStyleDeclaration.prototype.direction = 0 || '';
CSSStyleDeclaration.prototype.display = 0 || '';
CSSStyleDeclaration.prototype.displayInside = 0 || '';
CSSStyleDeclaration.prototype.displayList = 0 || '';
CSSStyleDeclaration.prototype.displayModel = 0 || '';
CSSStyleDeclaration.prototype.displayOutside = 0 || '';
CSSStyleDeclaration.prototype.displayRole = 0 || '';
CSSStyleDeclaration.prototype.dominantBaseline = 0 || '';
CSSStyleDeclaration.prototype.dropInitialAfterAdjust = 0 || '';
CSSStyleDeclaration.prototype.dropInitialAfterAlign = 0 || '';
CSSStyleDeclaration.prototype.dropInitialBeforeAdjust = 0 || '';
CSSStyleDeclaration.prototype.dropInitialBeforeAlign = 0 || '';
CSSStyleDeclaration.prototype.dropInitialSize = 0 || '';
CSSStyleDeclaration.prototype.dropInitialValue = 0 || '';
CSSStyleDeclaration.prototype.elevation = 0 || '';
CSSStyleDeclaration.prototype.emptyCells = 0 || '';
CSSStyleDeclaration.prototype.enableBackground = 0 || '';
CSSStyleDeclaration.prototype.fallback = 0 || '';
CSSStyleDeclaration.prototype.fill = 0 || '';
CSSStyleDeclaration.prototype.fillOpacity = 0 || '';
CSSStyleDeclaration.prototype.fillRule = 0 || '';
CSSStyleDeclaration.prototype.filter = 0 || '';
CSSStyleDeclaration.prototype.flex = 0 || '';
CSSStyleDeclaration.prototype.flexBasis = 0 || '';
CSSStyleDeclaration.prototype.flexDirection = 0 || '';
CSSStyleDeclaration.prototype.flexFlow = 0 || '';
CSSStyleDeclaration.prototype.flexGrow = 0 || '';
CSSStyleDeclaration.prototype.flexShrink = 0 || '';
CSSStyleDeclaration.prototype.flexWrap = 0 || '';
CSSStyleDeclaration.prototype.float = 0 || '';
CSSStyleDeclaration.prototype.floatDeferColumn = 0 || '';
CSSStyleDeclaration.prototype.floatDeferPage = 0 || '';
CSSStyleDeclaration.prototype.floatDisplace = 0 || '';
CSSStyleDeclaration.prototype.floatOffset = 0 || '';
CSSStyleDeclaration.prototype.floatWrap = 0 || '';
CSSStyleDeclaration.prototype.floodColor = 0 || '';
CSSStyleDeclaration.prototype.floodOpacity = 0 || '';
CSSStyleDeclaration.prototype.flowFrom = 0 || '';
CSSStyleDeclaration.prototype.flowInto = 0 || '';
CSSStyleDeclaration.prototype.font = 0 || '';
CSSStyleDeclaration.prototype.fontFaceName = 0 || '';
CSSStyleDeclaration.prototype.fontFamily = 0 || '';
CSSStyleDeclaration.prototype.fontFeatureSettings = 0 || '';
CSSStyleDeclaration.prototype.fontKerning = 0 || '';
CSSStyleDeclaration.prototype.fontLanguageOverride = 0 || '';
CSSStyleDeclaration.prototype.fontSize = 0 || '';
CSSStyleDeclaration.prototype.fontSizeAdjust = 0 || '';
CSSStyleDeclaration.prototype.fontStretch = 0 || '';
CSSStyleDeclaration.prototype.fontStyle = 0 || '';
CSSStyleDeclaration.prototype.fontSynthesis = 0 || '';
CSSStyleDeclaration.prototype.fontVariant = 0 || '';
CSSStyleDeclaration.prototype.fontVariantAlternates = 0 || '';
CSSStyleDeclaration.prototype.fontVariantCaps = 0 || '';
CSSStyleDeclaration.prototype.fontVariantEastAsian = 0 || '';
CSSStyleDeclaration.prototype.fontVariantLigatures = 0 || '';
CSSStyleDeclaration.prototype.fontVariantNumeric = 0 || '';
CSSStyleDeclaration.prototype.fontVariantPosition = 0 || '';
CSSStyleDeclaration.prototype.fontWeight = 0 || '';
CSSStyleDeclaration.prototype.footnoteDisplay = 0 || '';
CSSStyleDeclaration.prototype.footnotePolicy = 0 || '';
CSSStyleDeclaration.prototype.glyphOrientationHorizontal = 0 || '';
CSSStyleDeclaration.prototype.glyphOrientationVertical = 0 || '';
CSSStyleDeclaration.prototype.grid = 0 || '';
CSSStyleDeclaration.prototype.gridArea = 0 || '';
CSSStyleDeclaration.prototype.gridAutoColumns = 0 || '';
CSSStyleDeclaration.prototype.gridAutoFlow = 0 || '';
CSSStyleDeclaration.prototype.gridAutoRows = 0 || '';
CSSStyleDeclaration.prototype.gridColumn = 0 || '';
CSSStyleDeclaration.prototype.gridColumnEnd = 0 || '';
CSSStyleDeclaration.prototype.gridColumnStart = 0 || '';
CSSStyleDeclaration.prototype.gridRow = 0 || '';
CSSStyleDeclaration.prototype.gridRowEnd = 0 || '';
CSSStyleDeclaration.prototype.gridRowStart = 0 || '';
CSSStyleDeclaration.prototype.gridTemplate = 0 || '';
CSSStyleDeclaration.prototype.gridTemplateAreas = 0 || '';
CSSStyleDeclaration.prototype.gridTemplateColumns = 0 || '';
CSSStyleDeclaration.prototype.gridTemplateRows = 0 || '';
CSSStyleDeclaration.prototype.groupReset = 0 || '';
CSSStyleDeclaration.prototype.hanging = 0 || '';
CSSStyleDeclaration.prototype.hangingPunctuation = 0 || '';
CSSStyleDeclaration.prototype.height = 0 || '';
CSSStyleDeclaration.prototype.horizAdvX = 0 || '';
CSSStyleDeclaration.prototype.horizAlign = 0 || '';
CSSStyleDeclaration.prototype.horizOriginX = 0 || '';
CSSStyleDeclaration.prototype.horizOriginY = 0 || '';
CSSStyleDeclaration.prototype.hyphenateCharacter = 0 || '';
CSSStyleDeclaration.prototype.hyphenateLimitChars = 0 || '';
CSSStyleDeclaration.prototype.hyphenateLimitLast = 0 || '';
CSSStyleDeclaration.prototype.hyphenateLimitLines = 0 || '';
CSSStyleDeclaration.prototype.hyphenateLimitZone = 0 || '';
CSSStyleDeclaration.prototype.hyphenateResource = 0 || '';
CSSStyleDeclaration.prototype.hyphens = 0 || '';
CSSStyleDeclaration.prototype.icon = 0 || '';
CSSStyleDeclaration.prototype.ideographic = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.imageOrientation = 0 || '';
CSSStyleDeclaration.prototype.imageRendering = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.imageResolution = 0 || '';
CSSStyleDeclaration.prototype.imeMode = 0 || '';
CSSStyleDeclaration.prototype.indentEdgeReset = 0 || '';
CSSStyleDeclaration.prototype.inlineBoxAlign = 0 || '';
CSSStyleDeclaration.prototype.interpretAs = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.isolation = 0 || '';
CSSStyleDeclaration.prototype.justifyContent = 0 || '';
CSSStyleDeclaration.prototype.justifyItems = 0 || '';
CSSStyleDeclaration.prototype.justifySelf = 0 || '';
CSSStyleDeclaration.prototype.kerning = 0 || '';
CSSStyleDeclaration.prototype.kerningMode = 0 || '';
CSSStyleDeclaration.prototype.kerningPairTreshold = 0 || '';
CSSStyleDeclaration.prototype.keyEquivalent = 0 || '';
CSSStyleDeclaration.prototype.language = 0 || '';
CSSStyleDeclaration.prototype.left = 0 || '';
CSSStyleDeclaration.prototype.letterSpacing = 0 || '';
CSSStyleDeclaration.prototype.lightingColor = 0 || '';
CSSStyleDeclaration.prototype.lineBreak = 0 || '';
CSSStyleDeclaration.prototype.lineGrid = 0 || '';
CSSStyleDeclaration.prototype.lineGridMode = 0 || '';
CSSStyleDeclaration.prototype.lineGridProgression = 0 || '';
CSSStyleDeclaration.prototype.lineHeight = 0 || '';
CSSStyleDeclaration.prototype.lineSnap = 0 || '';
CSSStyleDeclaration.prototype.lineStacking = 0 || '';
CSSStyleDeclaration.prototype.lineStackingRuby = 0 || '';
CSSStyleDeclaration.prototype.lineStackingShift = 0 || '';
CSSStyleDeclaration.prototype.lineStackingStrategy = 0 || '';
CSSStyleDeclaration.prototype.linefeedTreatment = 0 || '';
CSSStyleDeclaration.prototype.link = 0 || '';
CSSStyleDeclaration.prototype.listImage1 = 0 || '';
CSSStyleDeclaration.prototype.listImage2 = 0 || '';
CSSStyleDeclaration.prototype.listImage3 = 0 || '';
CSSStyleDeclaration.prototype.listStyle = 0 || '';
CSSStyleDeclaration.prototype.listStyleImage = 0 || '';
CSSStyleDeclaration.prototype.listStylePosition = 0 || '';
CSSStyleDeclaration.prototype.listStyleType = 0 || '';
CSSStyleDeclaration.prototype.margin = 0 || '';
CSSStyleDeclaration.prototype.marginBottom = 0 || '';
CSSStyleDeclaration.prototype.marginInside = 0 || '';
CSSStyleDeclaration.prototype.marginLeft = 0 || '';
CSSStyleDeclaration.prototype.marginOutside = 0 || '';
CSSStyleDeclaration.prototype.marginRight = 0 || '';
CSSStyleDeclaration.prototype.marginTop = 0 || '';
CSSStyleDeclaration.prototype.marker = 0 || '';
CSSStyleDeclaration.prototype.markerEnd = 0 || '';
CSSStyleDeclaration.prototype.markerMid = 0 || '';
CSSStyleDeclaration.prototype.markerOffset = 0 || '';
CSSStyleDeclaration.prototype.markerSide = 0 || '';
CSSStyleDeclaration.prototype.markerStart = 0 || '';
CSSStyleDeclaration.prototype.marks = 0 || '';
CSSStyleDeclaration.prototype.marquee = 0 || '';
CSSStyleDeclaration.prototype.marqueeDirection = 0 || '';
CSSStyleDeclaration.prototype.marqueeLoop = 0 || '';
CSSStyleDeclaration.prototype.marqueePlayCount = 0 || '';
CSSStyleDeclaration.prototype.marqueeRepetition = 0 || '';
CSSStyleDeclaration.prototype.marqueeSpeed = 0 || '';
CSSStyleDeclaration.prototype.marqueeStyle = 0 || '';
CSSStyleDeclaration.prototype.mask = 0 || '';
CSSStyleDeclaration.prototype.maskBorder = 0 || '';
CSSStyleDeclaration.prototype.maskBorderMode = 0 || '';
CSSStyleDeclaration.prototype.maskBorderOutset = 0 || '';
CSSStyleDeclaration.prototype.maskBorderRepeat = 0 || '';
CSSStyleDeclaration.prototype.maskBorderSlice = 0 || '';
CSSStyleDeclaration.prototype.maskBorderSource = 0 || '';
CSSStyleDeclaration.prototype.maskBorderWidth = 0 || '';
CSSStyleDeclaration.prototype.maskClip = 0 || '';
CSSStyleDeclaration.prototype.maskComposite = 0 || '';
CSSStyleDeclaration.prototype.maskImage = 0 || '';
CSSStyleDeclaration.prototype.maskMode = 0 || '';
CSSStyleDeclaration.prototype.maskOrigin = 0 || '';
CSSStyleDeclaration.prototype.maskPosition = 0 || '';
CSSStyleDeclaration.prototype.maskRepeat = 0 || '';
CSSStyleDeclaration.prototype.maskSize = 0 || '';
CSSStyleDeclaration.prototype.maskType = 0 || '';
CSSStyleDeclaration.prototype.mathline = 0 || '';
CSSStyleDeclaration.prototype.maxFontSize = 0 || '';
CSSStyleDeclaration.prototype.maxHeight = 0 || '';
CSSStyleDeclaration.prototype.maxLines = 0 || '';
CSSStyleDeclaration.prototype.maxWidth = 0 || '';
CSSStyleDeclaration.prototype.maxZoom = 0 || '';
CSSStyleDeclaration.prototype.minFontSize = 0 || '';
CSSStyleDeclaration.prototype.minHeight = 0 || '';
CSSStyleDeclaration.prototype.minWidth = 0 || '';
CSSStyleDeclaration.prototype.minZoom = 0 || '';
CSSStyleDeclaration.prototype.mixBlendMode = 0 || '';
CSSStyleDeclaration.prototype.moveTo = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoAnsiFontSize = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoAnsiFontStyle = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoAnsiFontWeight = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoAnsiLanguage = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoAsciiFontFamily = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBackground = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBackgroundSource = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBaselinePosition = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBidiFlag = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBidiFontFamily = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBidiFontSize = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBidiFontStyle = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBidiFontWeight = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBidiLanguage = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBookmark = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderBetween = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderBetweenColor = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderBetweenStyle = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderBetweenWidth = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderBottomAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderBottomColorAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderBottomSource = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderBottomStyleAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderBottomWidthAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderColorAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderEffect = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderLeftAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderLeftColorAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderLeftSource = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderLeftStyleAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderLeftWidthAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderRightAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderRightColorAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderRightSource = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderRightStyleAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderRightWidthAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderShadow = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderSource = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderStyleAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderTopAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderTopColorAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderTopSource = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderTopStyleAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderTopWidthAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBorderWidthAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBreakType = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBuild = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBuildAfterAction = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBuildAfterColor = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBuildAutoSecs = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBuildAvi = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBuildDualId = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBuildOrder = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBuildSoundName = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoBulletImage = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoCellSpecial = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoCellspacing = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoCharIndent = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoCharIndentCount = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoCharIndentSize = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoCharType = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoCharWrap = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoColorAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoColorIndex = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoColorSource = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoColumnBreakBefore = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoColumnSeparator = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoColumns = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoCommentAuthor = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoCommentContinuation = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoCommentId = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoCommentReference = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoDataPlacement = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoDefaultHeight = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoDefaultWidth = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoDiagonalDown = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoDiagonalDownColor = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoDiagonalDownSource = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoDiagonalDownStyle = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoDiagonalDownWidth = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoDiagonalUp = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoDiagonalUpColor = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoDiagonalUpSource = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoDiagonalUpStyle = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoDiagonalUpWidth = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoDisplayedDecimalSeparator = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoDisplayedThousandSeparator = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoElement = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoElementAnchorHorizontal = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoElementAnchorLock = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoElementAnchorVertical = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoElementFrameHeight = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoElementFrameHspace = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoElementFrameVspace = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoElementFrameWidth = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoElementLeft = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoElementLinespan = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoElementTop = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoElementWrap = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoEndnoteContinuationNotice = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoEndnoteContinuationNoticeId = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoEndnoteContinuationNoticeSrc = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoEndnoteContinuationSeparator = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoEndnoteContinuationSeparatorId = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoEndnoteContinuationSeparatorSrc = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoEndnoteDisplay = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoEndnoteId = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoEndnoteNumbering = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoEndnoteNumberingRestart = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoEndnoteNumberingStart = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoEndnoteNumberingStyle = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoEndnotePosition = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoEndnoteSeparator = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoEndnoteSeparatorId = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoEndnoteSeparatorSrc = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoEvenFooter = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoEvenFooterId = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoEvenFooterSrc = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoEvenHeader = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoEvenHeaderId = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoEvenHeaderSrc = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFacingPages = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFareastFontFamily = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFareastHint = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFareastLanguage = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFieldChange = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFieldChangeAuthor = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFieldChangeTime = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFieldChangeValue = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFieldCode = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFieldLock = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFillsColor = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFirstFooter = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFirstFooterId = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFirstFooterSrc = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFirstHeader = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFirstHeaderId = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFirstHeaderSrc = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFontAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFontCharset = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFontFormat = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFontInfo = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFontInfoCharset = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFontInfoType = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFontKerning = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFontPitch = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFontSignature = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFontSignatureCsbOne = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFontSignatureCsbTwo = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFontSignatureUsbFour = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFontSignatureUsbOne = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFontSignatureUsbThree = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFontSignatureUsbTwo = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFontSrc = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFontWidth = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFooter = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFooterData = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFooterId = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFooterMargin = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFooterSrc = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFootnoteContinuationNotice = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFootnoteContinuationNoticeId = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFootnoteContinuationNoticeSrc = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFootnoteContinuationSeparator = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFootnoteContinuationSeparatorId = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFootnoteContinuationSeparatorSrc = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFootnoteId = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFootnoteNumbering = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFootnoteNumberingRestart = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFootnoteNumberingStart = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFootnoteNumberingStyle = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFootnotePosition = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFootnoteSeparator = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFootnoteSeparatorId = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFootnoteSeparatorSrc = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoForeground = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoFormsProtection = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoGenericFontFamily = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoGridBottom = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoGridBottomCount = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoGridLeft = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoGridLeftCount = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoGridRight = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoGridRightCount = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoGridTop = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoGridTopCount = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoGutterDirection = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoGutterMargin = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoGutterPosition = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoHansiFontFamily = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoHeader = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoHeaderData = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoHeaderId = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoHeaderMargin = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoHeaderSrc = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoHeightAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoHeightRule = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoHeightSource = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoHide = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoHighlight = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoHorizontalPageAlign = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoHyphenate = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoIgnore = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoKinsokuOverflow = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoLayoutGridAlign = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoLayoutGridCharAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoLayoutGridOrigin = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoLevelInherit = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoLevelLegacy = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoLevelLegacyIndent = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoLevelLegacySpace = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoLevelLegalFormat = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoLevelNumberFormat = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoLevelNumberPosition = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoLevelNumbering = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoLevelResetLevel = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoLevelStartAt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoLevelStyleLink = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoLevelSuffix = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoLevelTabStop = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoLevelText = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoLineBreakOverride = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoLineGrid = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoLineHeightAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoLineHeightRule = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoLineNumbersCountBy = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoLineNumbersDistance = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoLineNumbersRestart = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoLineNumbersStart = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoLineSpacing = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoLinkedFrame = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoList = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoListChange = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoListChangeAuthor = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoListChangeTime = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoListChangeValues = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoListId = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoListIns = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoListInsAuthor = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoListInsTime = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoListName = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoListTemplateIds = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoListType = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoMarginBottomAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoMarginLeftAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoMarginTopAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoMirrorMargins = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoNegativeIndentTab = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoNumberFormat = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoOutlineLevel = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoOutlineParent = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoOutlineParentCol = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoOutlineParentRow = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoOutlineParentVisibility = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoOutlineStyle = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPaddingAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPaddingBetween = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPaddingBottomAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPaddingLeftAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPaddingRightAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPaddingTopAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPageBorderAligned = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPageBorderArt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPageBorderBottomArt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPageBorderDisplay = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPageBorderLeftArt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPageBorderOffsetFrom = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPageBorderRightArt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPageBorderSurroundFooter = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPageBorderSurroundHeader = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPageBorderTopArt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPageBorderZOrder = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPageNumbers = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPageNumbersChapterSeparator = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPageNumbersChapterStyle = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPageNumbersStart = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPageNumbersStyle = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPageOrientation = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPageScale = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPagination = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPanoseArmStyle = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPanoseContrast = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPanoseFamilyType = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPanoseLetterform = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPanoseMidline = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPanoseProportion = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPanoseSerifStyle = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPanoseStrokeVariation = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPanoseWeight = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPanoseXHeight = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPaperSource = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPaperSourceFirstPage = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPaperSourceOtherPages = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPattern = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPatternColor = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPatternStyle = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPrintArea = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPrintColor = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPrintGridlines = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPrintHeadings = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPrintResolution = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPrintSheetOrder = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPrintTitleColumn = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPrintTitleRow = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPropChange = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPropChangeAuthor = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoPropChangeTime = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoProtection = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoRotate = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoRowMarginLeft = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoRowMarginRight = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoRubyMerge = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoRubyVisibility = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoSchemeFillColor = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoSchemeShadowColor = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoShading = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoShadowColor = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoSpaceAbove = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoSpaceBelow = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoSpacerun = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoSpecialCharacter = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoSpecialFormat = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoStyleId = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoStyleName = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoStyleNext = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoStyleParent = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoStyleType = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoStyleUpdate = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoSubdocument = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoSymbolFontFamily = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTabCount = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTableAnchorHorizontal = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTableAnchorVertical = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTableBspace = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTableDelAuthor = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTableDelTime = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTableDeleted = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTableDir = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTableInsAuthor = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTableInsTime = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTableInserted = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTableLayoutAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTableLeft = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTableLspace = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTableOverlap = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTablePropAuthor = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTablePropChange = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTablePropTime = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTableRspace = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTableTop = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTableTspace = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTableWrap = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTextAnimation = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTextCombineBrackets = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTextCombineId = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTextControl = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTextFitId = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTextIndentAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTextOrientation = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTextRaise = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTitlePage = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoTnyCompress = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoUnsynced = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoVerticalAlignAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoVerticalAlignSpecial = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoVerticalPageAlign = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoWidthAlt = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoWidthSource = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoWordWrap = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoXlrowspan = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.msoZeroHeight = 0 || '';
CSSStyleDeclaration.prototype.name = 0 || '';
CSSStyleDeclaration.prototype.navBannerImage = 0 || '';
CSSStyleDeclaration.prototype.navDown = 0 || '';
CSSStyleDeclaration.prototype.navIndex = 0 || '';
CSSStyleDeclaration.prototype.navLeft = 0 || '';
CSSStyleDeclaration.prototype.navRight = 0 || '';
CSSStyleDeclaration.prototype.navUp = 0 || '';
CSSStyleDeclaration.prototype.navbutton_background_color = 0 || '';
CSSStyleDeclaration.prototype.navbutton_home_hovered = 0 || '';
CSSStyleDeclaration.prototype.navbutton_home_normal = 0 || '';
CSSStyleDeclaration.prototype.navbutton_home_pushed = 0 || '';
CSSStyleDeclaration.prototype.navbutton_horiz_hovered = 0 || '';
CSSStyleDeclaration.prototype.navbutton_horiz_normal = 0 || '';
CSSStyleDeclaration.prototype.navbutton_horiz_pushed = 0 || '';
CSSStyleDeclaration.prototype.navbutton_next_hovered = 0 || '';
CSSStyleDeclaration.prototype.navbutton_next_normal = 0 || '';
CSSStyleDeclaration.prototype.navbutton_next_pushed = 0 || '';
CSSStyleDeclaration.prototype.navbutton_prev_hovered = 0 || '';
CSSStyleDeclaration.prototype.navbutton_prev_normal = 0 || '';
CSSStyleDeclaration.prototype.navbutton_prev_pushed = 0 || '';
CSSStyleDeclaration.prototype.navbutton_up_hovered = 0 || '';
CSSStyleDeclaration.prototype.navbutton_up_normal = 0 || '';
CSSStyleDeclaration.prototype.navbutton_up_pushed = 0 || '';
CSSStyleDeclaration.prototype.navbutton_vert_hovered = 0 || '';
CSSStyleDeclaration.prototype.navbutton_vert_normal = 0 || '';
CSSStyleDeclaration.prototype.navbutton_vert_pushed = 0 || '';
CSSStyleDeclaration.prototype.negative = 0 || '';
/**
 @browser Chrome
 */
CSSStyleDeclaration.prototype.objectFit = 0 || '';
/**
 @browser Chrome
 */
CSSStyleDeclaration.prototype.objectPosition = 0 || '';
CSSStyleDeclaration.prototype.offsetAfter = 0 || '';
CSSStyleDeclaration.prototype.offsetBefore = 0 || '';
CSSStyleDeclaration.prototype.offsetEnd = 0 || '';
CSSStyleDeclaration.prototype.offsetStart = 0 || '';
CSSStyleDeclaration.prototype.opacity = 0 || '';
CSSStyleDeclaration.prototype.order = 0 || '';
CSSStyleDeclaration.prototype.orientation = 0 || '';
CSSStyleDeclaration.prototype.orphans = 0 || '';
CSSStyleDeclaration.prototype.outline = 0 || '';
CSSStyleDeclaration.prototype.outlineColor = 0 || '';
CSSStyleDeclaration.prototype.outlineOffset = 0 || '';
CSSStyleDeclaration.prototype.outlineStyle = 0 || '';
CSSStyleDeclaration.prototype.outlineWidth = 0 || '';
CSSStyleDeclaration.prototype.overflow = 0 || '';
CSSStyleDeclaration.prototype.overflowClip = 0 || '';
CSSStyleDeclaration.prototype.overflowScrolling = 0 || '';
CSSStyleDeclaration.prototype.overflowStyle = 0 || '';
CSSStyleDeclaration.prototype.overflowWrap = 0 || '';
CSSStyleDeclaration.prototype.overflowX = 0 || '';
CSSStyleDeclaration.prototype.overflowY = 0 || '';
CSSStyleDeclaration.prototype.overlinePosition = 0 || '';
CSSStyleDeclaration.prototype.overlineThickness = 0 || '';
CSSStyleDeclaration.prototype.pad = 0 || '';
CSSStyleDeclaration.prototype.padding = 0 || '';
CSSStyleDeclaration.prototype.paddingBottom = 0 || '';
CSSStyleDeclaration.prototype.paddingLeft = 0 || '';
CSSStyleDeclaration.prototype.paddingRight = 0 || '';
CSSStyleDeclaration.prototype.paddingTop = 0 || '';
CSSStyleDeclaration.prototype.page = 0 || '';
CSSStyleDeclaration.prototype.pageBreakAfter = 0 || '';
CSSStyleDeclaration.prototype.pageBreakBefore = 0 || '';
CSSStyleDeclaration.prototype.pageBreakInside = 0 || '';
CSSStyleDeclaration.prototype.pagePolicy = 0 || '';
CSSStyleDeclaration.prototype.panose1 = 0 || '';
CSSStyleDeclaration.prototype.pause = 0 || '';
CSSStyleDeclaration.prototype.pauseAfter = 0 || '';
CSSStyleDeclaration.prototype.pauseBefore = 0 || '';
CSSStyleDeclaration.prototype.perspective = 0 || '';
CSSStyleDeclaration.prototype.perspectiveOrigin = 0 || '';
CSSStyleDeclaration.prototype.pitch = 0 || '';
CSSStyleDeclaration.prototype.pitchRange = 0 || '';
CSSStyleDeclaration.prototype.playDuring = 0 || '';
CSSStyleDeclaration.prototype.pointerEvents = 0 || '';
CSSStyleDeclaration.prototype.position = 0 || '';
CSSStyleDeclaration.prototype.prefix = 0 || '';
CSSStyleDeclaration.prototype.presentationLevel = 0 || '';
CSSStyleDeclaration.prototype.punctuationTrim = 0 || '';
CSSStyleDeclaration.prototype.quotes = 0 || '';
CSSStyleDeclaration.prototype.range = 0 || '';
CSSStyleDeclaration.prototype.regionFragment = 0 || '';
CSSStyleDeclaration.prototype.renderingIntent = 0 || '';
CSSStyleDeclaration.prototype.resize = 0 || '';
CSSStyleDeclaration.prototype.resolution = 0 || '';
CSSStyleDeclaration.prototype.rest = 0 || '';
CSSStyleDeclaration.prototype.restAfter = 0 || '';
CSSStyleDeclaration.prototype.restBefore = 0 || '';
CSSStyleDeclaration.prototype.richness = 0 || '';
CSSStyleDeclaration.prototype.right = 0 || '';
CSSStyleDeclaration.prototype.rotation = 0 || '';
CSSStyleDeclaration.prototype.rotationPoint = 0 || '';
CSSStyleDeclaration.prototype.roundClip = 0 || '';
CSSStyleDeclaration.prototype.rowSpan = 0 || '';
CSSStyleDeclaration.prototype.rubyAlign = 0 || '';
CSSStyleDeclaration.prototype.rubyMerge = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.rubyOverhang = 0 || '';
CSSStyleDeclaration.prototype.rubyPosition = 0 || '';
CSSStyleDeclaration.prototype.running = 0 || '';
CSSStyleDeclaration.prototype.scrollSnapCoordinate = 0 || '';
CSSStyleDeclaration.prototype.scrollSnapDestination = 0 || '';
CSSStyleDeclaration.prototype.scrollSnapPointsX = 0 || '';
CSSStyleDeclaration.prototype.scrollSnapPointsY = 0 || '';
CSSStyleDeclaration.prototype.scrollSnapType = 0 || '';
CSSStyleDeclaration.prototype.scrollbar3dlightColor = 0 || '';
CSSStyleDeclaration.prototype.scrollbarArrowColor = 0 || '';
CSSStyleDeclaration.prototype.scrollbarBaseColor = 0 || '';
CSSStyleDeclaration.prototype.scrollbarDarkshadowColor = 0 || '';
CSSStyleDeclaration.prototype.scrollbarFaceColor = 0 || '';
CSSStyleDeclaration.prototype.scrollbarHighlightColor = 0 || '';
CSSStyleDeclaration.prototype.scrollbarShadowColor = 0 || '';
CSSStyleDeclaration.prototype.scrollbarTrackColor = 0 || '';
CSSStyleDeclaration.prototype.separatorImage = 0 || '';
/**
 @browser Chrome
 */
CSSStyleDeclaration.prototype.shapeImageThreshold = 0 || '';
/**
 @browser Chrome
 */
CSSStyleDeclaration.prototype.shapeMargin = 0 || '';
/**
 @browser Chrome
 */
CSSStyleDeclaration.prototype.shapeOutside = 0 || '';
CSSStyleDeclaration.prototype.shapeRendering = 0 || '';
CSSStyleDeclaration.prototype.size = 0 || '';
CSSStyleDeclaration.prototype.slope = 0 || '';
CSSStyleDeclaration.prototype.solidColor = 0 || '';
CSSStyleDeclaration.prototype.solidOpacity = 0 || '';
CSSStyleDeclaration.prototype.speak = 0 || '';
CSSStyleDeclaration.prototype.speakAs = 0 || '';
CSSStyleDeclaration.prototype.speakDate = 0 || '';
CSSStyleDeclaration.prototype.speakHeader = 0 || '';
CSSStyleDeclaration.prototype.speakNumeral = 0 || '';
CSSStyleDeclaration.prototype.speakPunctuation = 0 || '';
CSSStyleDeclaration.prototype.speakTime = 0 || '';
CSSStyleDeclaration.prototype.speechRate = 0 || '';
CSSStyleDeclaration.prototype.src = 0 || '';
CSSStyleDeclaration.prototype.stemh = 0 || '';
CSSStyleDeclaration.prototype.stemv = 0 || '';
CSSStyleDeclaration.prototype.stopColor = 0 || '';
CSSStyleDeclaration.prototype.stopOpacity = 0 || '';
CSSStyleDeclaration.prototype.stress = 0 || '';
CSSStyleDeclaration.prototype.strikethroughPosition = 0 || '';
CSSStyleDeclaration.prototype.strikethroughThickness = 0 || '';
CSSStyleDeclaration.prototype.stringSet = 0 || '';
CSSStyleDeclaration.prototype.stroke = 0 || '';
CSSStyleDeclaration.prototype.strokeDasharray = 0 || '';
CSSStyleDeclaration.prototype.strokeDashoffset = 0 || '';
CSSStyleDeclaration.prototype.strokeLinecap = 0 || '';
CSSStyleDeclaration.prototype.strokeLinejoin = 0 || '';
CSSStyleDeclaration.prototype.strokeMiterlimit = 0 || '';
CSSStyleDeclaration.prototype.strokeOpacity = 0 || '';
CSSStyleDeclaration.prototype.strokeWidth = 0 || '';
CSSStyleDeclaration.prototype.suffix = 0 || '';
CSSStyleDeclaration.prototype.symbols = 0 || '';
CSSStyleDeclaration.prototype.system = 0 || '';
CSSStyleDeclaration.prototype.tabIndex = 0 || '';
CSSStyleDeclaration.prototype.tabInterval = 0 || '';
CSSStyleDeclaration.prototype.tabSize = 0 || '';
CSSStyleDeclaration.prototype.tabStops = 0 || '';
CSSStyleDeclaration.prototype.tableBorderColorDark = 0 || '';
CSSStyleDeclaration.prototype.tableBorderColorLight = 0 || '';
CSSStyleDeclaration.prototype.tableLayout = 0 || '';
CSSStyleDeclaration.prototype.target = 0 || '';
CSSStyleDeclaration.prototype.targetName = 0 || '';
CSSStyleDeclaration.prototype.targetNew = 0 || '';
CSSStyleDeclaration.prototype.targetPosition = 0 || '';
CSSStyleDeclaration.prototype.textAfterOverflow = 0 || '';
CSSStyleDeclaration.prototype.textAlign = 0 || '';
CSSStyleDeclaration.prototype.textAlignAll = 0 || '';
CSSStyleDeclaration.prototype.textAlignLast = 0 || '';
CSSStyleDeclaration.prototype.textAnchor = 0 || '';
CSSStyleDeclaration.prototype.textAutospace = 0 || '';
CSSStyleDeclaration.prototype.textBlink = 0 || '';
CSSStyleDeclaration.prototype.textBottom = 0 || '';
CSSStyleDeclaration.prototype.textCombine = 0 || '';
CSSStyleDeclaration.prototype.textCombineUpright = 0 || '';
/**
 @browser Gecko
 */
CSSStyleDeclaration.prototype.textDecoration = 0 || '';
CSSStyleDeclaration.prototype.textDecorationColor = 0 || '';
CSSStyleDeclaration.prototype.textDecorationLine = 0 || '';
CSSStyleDeclaration.prototype.textDecorationSkip = 0 || '';
CSSStyleDeclaration.prototype.textDecorationStyle = 0 || '';
CSSStyleDeclaration.prototype.textEffect = 0 || '';
CSSStyleDeclaration.prototype.textEmphasis = 0 || '';
CSSStyleDeclaration.prototype.textEmphasisColor = 0 || '';
CSSStyleDeclaration.prototype.textEmphasisPosition = 0 || '';
CSSStyleDeclaration.prototype.textEmphasisStyle = 0 || '';
CSSStyleDeclaration.prototype.textEndOverflow = 0 || '';
CSSStyleDeclaration.prototype.textHeight = 0 || '';
CSSStyleDeclaration.prototype.textIndent = 0 || '';
CSSStyleDeclaration.prototype.textJustify = 0 || '';
CSSStyleDeclaration.prototype.textJustifyTrim = 0 || '';
CSSStyleDeclaration.prototype.textKashidaSpace = 0 || '';
CSSStyleDeclaration.prototype.textLineThrough = 0 || '';
CSSStyleDeclaration.prototype.textLineThroughColor = 0 || '';
CSSStyleDeclaration.prototype.textLineThroughMode = 0 || '';
CSSStyleDeclaration.prototype.textLineThroughStyle = 0 || '';
CSSStyleDeclaration.prototype.textOrientation = 0 || '';
CSSStyleDeclaration.prototype.textOutline = 0 || '';
CSSStyleDeclaration.prototype.textOverflow = 0 || '';
CSSStyleDeclaration.prototype.textOverflowEllipsis = 0 || '';
CSSStyleDeclaration.prototype.textOverflowMode = 0 || '';
CSSStyleDeclaration.prototype.textOverline = 0 || '';
CSSStyleDeclaration.prototype.textOverlineColor = 0 || '';
CSSStyleDeclaration.prototype.textOverlineMode = 0 || '';
CSSStyleDeclaration.prototype.textOverlineStyle = 0 || '';
CSSStyleDeclaration.prototype.textRendering = 0 || '';
CSSStyleDeclaration.prototype.textScript = 0 || '';
CSSStyleDeclaration.prototype.textShadow = 0 || '';
CSSStyleDeclaration.prototype.textSpace = 0 || '';
CSSStyleDeclaration.prototype.textTop = 0 || '';
CSSStyleDeclaration.prototype.textTransform = 0 || '';
CSSStyleDeclaration.prototype.textTrim = 0 || '';
CSSStyleDeclaration.prototype.textUnderline = 0 || '';
CSSStyleDeclaration.prototype.textUnderlineColor = 0 || '';
CSSStyleDeclaration.prototype.textUnderlineMode = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.textUnderlinePosition = 0 || '';
CSSStyleDeclaration.prototype.textUnderlineStyle = 0 || '';
CSSStyleDeclaration.prototype.textWrap = 0 || '';
CSSStyleDeclaration.prototype.toggleGroup = 0 || '';
CSSStyleDeclaration.prototype.top = 0 || '';
CSSStyleDeclaration.prototype.topBarButton = 0 || '';
CSSStyleDeclaration.prototype.topline = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.touchAction = 0 || '';
CSSStyleDeclaration.prototype.transform = 0 || '';
CSSStyleDeclaration.prototype.transformOrigin = 0 || '';
CSSStyleDeclaration.prototype.transformStyle = 0 || '';
CSSStyleDeclaration.prototype.transition = 0 || '';
CSSStyleDeclaration.prototype.transitionDelay = 0 || '';
CSSStyleDeclaration.prototype.transitionDuration = 0 || '';
CSSStyleDeclaration.prototype.transitionProperty = 0 || '';
CSSStyleDeclaration.prototype.transitionTimingFunction = 0 || '';
CSSStyleDeclaration.prototype.underlinePosition = 0 || '';
CSSStyleDeclaration.prototype.underlineThickness = 0 || '';
CSSStyleDeclaration.prototype.unicodeBidi = 0 || '';
CSSStyleDeclaration.prototype.unicodeRange = 0 || '';
CSSStyleDeclaration.prototype.unitsPerEm = 0 || '';
CSSStyleDeclaration.prototype.userFocus = 0 || '';
CSSStyleDeclaration.prototype.userFocusKey = 0 || '';
CSSStyleDeclaration.prototype.userFocusPointer = 0 || '';
CSSStyleDeclaration.prototype.userInput = 0 || '';
CSSStyleDeclaration.prototype.userModify = 0 || '';
CSSStyleDeclaration.prototype.userSelect = 0 || '';
CSSStyleDeclaration.prototype.userZoom = 0 || '';
CSSStyleDeclaration.prototype.version = 0 || '';
CSSStyleDeclaration.prototype.vertAdvY = 0 || '';
CSSStyleDeclaration.prototype.vertAlign = 0 || '';
CSSStyleDeclaration.prototype.vertOriginX = 0 || '';
CSSStyleDeclaration.prototype.vertOriginY = 0 || '';
CSSStyleDeclaration.prototype.verticalAlign = 0 || '';
CSSStyleDeclaration.prototype.visibility = 0 || '';
CSSStyleDeclaration.prototype.voiceBalance = 0 || '';
CSSStyleDeclaration.prototype.voiceDuration = 0 || '';
CSSStyleDeclaration.prototype.voiceFamily = 0 || '';
CSSStyleDeclaration.prototype.voicePitch = 0 || '';
CSSStyleDeclaration.prototype.voiceRange = 0 || '';
CSSStyleDeclaration.prototype.voiceRate = 0 || '';
CSSStyleDeclaration.prototype.voiceStress = 0 || '';
CSSStyleDeclaration.prototype.voiceVolume = 0 || '';
CSSStyleDeclaration.prototype.volume = 0 || '';
CSSStyleDeclaration.prototype.whiteSpace = 0 || '';
CSSStyleDeclaration.prototype.whiteSpaceTreatment = 0 || '';
CSSStyleDeclaration.prototype.widows = 0 || '';
CSSStyleDeclaration.prototype.width = 0 || '';
CSSStyleDeclaration.prototype.widths = 0 || '';
CSSStyleDeclaration.prototype.wordBreak = 0 || '';
CSSStyleDeclaration.prototype.wordBreakCjk = 0 || '';
CSSStyleDeclaration.prototype.wordBreakInside = 0 || '';
CSSStyleDeclaration.prototype.wordBreakWrap = 0 || '';
CSSStyleDeclaration.prototype.wordSpacing = 0 || '';
CSSStyleDeclaration.prototype.wordWrap = 0 || '';
CSSStyleDeclaration.prototype.wrapOption = 0 || '';
/**
 @browser IE
 */
CSSStyleDeclaration.prototype.writingMode = 0 || '';
CSSStyleDeclaration.prototype.xHeight = 0 || '';
CSSStyleDeclaration.prototype.zIndex = 0 || '';
CSSStyleDeclaration.prototype.zoom = 0 || '';
