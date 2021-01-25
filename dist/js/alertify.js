/* eslint-disable max-lines */
import { __awaiter, __generator } from "tslib";
import style from "./../sass/alertify.scss";
export var LogTypes;
(function (LogTypes) {
    LogTypes["default"] = "default";
    LogTypes["success"] = "success";
    LogTypes["error"] = "error";
})(LogTypes || (LogTypes = {}));
export var DialogTypes;
(function (DialogTypes) {
    DialogTypes["alert"] = "alert";
    DialogTypes["confirm"] = "confirm";
    DialogTypes["prompt"] = "prompt";
})(DialogTypes || (DialogTypes = {}));
/**
 * Alertify private object
 * @type {Object}
 */
var Alertify = /** @class */ (function () {
    function Alertify() {
        this.parent = document.body;
        this.version = "2.0.43";
        this.okLabel = "Ok";
        this.cancelLabel = "Cancel";
        this.maxLogItems = 2;
        this.promptValue = "";
        this.promptPlaceholder = "";
        this.closeLogOnClick = false;
        this.delay = 5000;
        this.logContainerClass = "alertify-logs";
        this.logTemplateMethod = null;
        // eslint-disable-next-line @typescript-eslint/typedef
        this.dialogs = {
            buttons: {
                holder: "<nav>{{buttons}}</nav>",
                ok: "<button class='ok' tabindex='1'>{{ok}}</button>",
                cancel: "<button class='cancel' tabindex='2'>{{cancel}}</button>"
            },
            input: "<input type='text'>",
            message: "<p class='msg'>{{message}}</p>",
            log: "<div class='{{class}}'>{{message}}</div>"
        };
        this.injectCSS();
    }
    Alertify.prototype.setParent = function (elem) {
        this.parent = elem;
        return this;
    };
    Alertify.prototype.reset = function () {
        this.parent = document.body;
        this.okBtn(Alertify.defaultOkLabel);
        this.cancelBtn(Alertify.defaultCancelLabel);
        this.setMaxLogItems(Alertify.defaultMaxLogItems);
        this.promptValue = "";
        this.promptPlaceholder = "";
        this.delay = Alertify.defaultDelay;
        this.setCloseLogOnClick(Alertify.defaultCloseLogOnClick);
        this.setLogPosition("bottom left");
        this.logTemplateMethod = null;
        return this;
    };
    // notify
    Alertify.prototype.log = function (message, click) {
        this.prepareNotify(message, LogTypes.default, click);
        return this;
    };
    Alertify.prototype.success = function (message, click) {
        this.prepareNotify(message, LogTypes.success, click);
        return this;
    };
    Alertify.prototype.error = function (message, click) {
        this.prepareNotify(message, LogTypes.error, click);
        return this;
    };
    Alertify.prototype.setDelay = function (time) {
        this.delay = Number(time) || Alertify.defaultDelay;
        return this;
    };
    Alertify.prototype.setMaxLogItems = function (num) {
        this.maxLogItems = Number(num) || Alertify.defaultMaxLogItems;
        return this;
    };
    Alertify.prototype.setCloseLogOnClick = function (bool) {
        this.closeLogOnClick = Boolean(bool);
        return this;
    };
    Alertify.prototype.setLogPosition = function (str) {
        this.logContainerClass = "alertify-logs " + (str || "");
        return this;
    };
    Alertify.prototype.setLogTemplate = function (templateMethod) {
        this.logTemplateMethod = templateMethod;
        return this;
    };
    Alertify.prototype.clearLogs = function () {
        this.setupLogContainer().innerHTML = "";
        return this;
    };
    /**
     * Close the log messages
     *
     * @param  {Object} elem    HTML Element of log message to close
     * @param  {Number} wait    [optional] Time (in ms) to wait before automatically hiding the message, if 0 never hide
     *
     * @return {undefined}
     */
    Alertify.prototype.close = function (elem, wait) {
        var _this = this;
        if (wait === void 0) { wait = 0; }
        if (this.closeLogOnClick) {
            elem.addEventListener("click", function () { return _this.hideElement(elem); });
        }
        var delay = wait && !isNaN(Number(wait)) ? Number(wait) : this.delay;
        if (delay < 0) {
            this.hideElement(elem);
        }
        else if (delay > 0) {
            setTimeout(function () { return _this.hideElement(elem); }, delay);
        }
    };
    // dialog
    Alertify.prototype.alert = function (message, onOkay, onCancel) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dialog(message, DialogTypes.alert, onOkay, onCancel)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Alertify.prototype.confirm = function (message, onOkay, onCancel) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dialog(message, DialogTypes.confirm, onOkay, onCancel)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Alertify.prototype.prompt = function (message, onOkay, onCancel) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dialog(message, DialogTypes.prompt, onOkay, onCancel)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Create a dialog box
     *
     * @param  {String}   message      The message passed from the callee
     * @param  {String}   type         Type of dialog to create
     * @param  {Function} onOkay       [Optional] Callback function when clicked okay.
     * @param  {Function} onCancel     [Optional] Callback function when cancelled.
     *
     * @return {Promise<object> | void}
     */
    Alertify.prototype.dialog = function (message, type, onOkay, onCancel) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setupDialog({
                            type: type,
                            message: message,
                            onOkay: onOkay,
                            onCancel: onCancel
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Alertify.prototype.cancelBtn = function (label) {
        this.cancelLabel = label;
        return this;
    };
    Alertify.prototype.okBtn = function (label) {
        this.okLabel = label;
        return this;
    };
    Alertify.prototype.placeholder = function (str) {
        this.promptPlaceholder = str;
        return this;
    };
    Alertify.prototype.defaultValue = function (str) {
        this.promptValue = str;
        return this;
    };
    /**
     * Show a new log message box
     *
     * @param  {String} message    The message passed from the callee
     * @param  {String} type       [Optional] Optional type of log message
     * @param  {Number} wait       [Optional] Time (in ms) to wait before auto-hiding the log
     *
     * @return {Object}
     */
    Alertify.prototype.prepareNotify = function (message, type, click) {
        var existing = document.querySelectorAll(".alertify-logs > div");
        if (existing) {
            var diff = existing.length - this.maxLogItems;
            if (diff >= 0) {
                var j = diff + 1;
                for (var i = 0; i < j; i += 1) {
                    this.close(existing[i], -1);
                }
            }
        }
        this.showNotify(message, type, click);
    };
    /**
     * Add new log message
     * If a type is passed, a class name "{type}" will get added.
     * This allows for custom look and feel for various types of notifications.
     *
     * @param  {String} message    The message passed from the callee
     * @param  {String} type       [Optional] Type of log message
     * @param  {Number} wait       [Optional] Time (in ms) to wait before auto-hiding
     *
     * @return {undefined}
     */
    Alertify.prototype.showNotify = function (message, type, click) {
        if (type === void 0) { type = LogTypes.default; }
        var elLog = this.setupLogContainer();
        var log = document.createElement("div");
        log.className = type;
        var htmlChild = message;
        if (this.logTemplateMethod) {
            htmlChild = this.logTemplateMethod(message);
        }
        if (htmlChild instanceof HTMLElement) {
            log.appendChild(htmlChild);
        }
        else {
            log.innerHTML = htmlChild;
        }
        // Add the click handler, if specified.
        if (typeof click === "function") {
            log.addEventListener("click", click);
        }
        elLog.appendChild(log);
        requestAnimationFrame(function () { return log.className += " show"; });
        this.close(log, this.delay);
    };
    Alertify.prototype.setupLogContainer = function () {
        var elLog = document.querySelector(".alertify-logs");
        var className = this.logContainerClass;
        if (!elLog) {
            elLog = document.createElement("div");
            elLog.className = className;
            this.parent.appendChild(elLog);
        }
        // Make sure it's positioned properly.
        if (elLog.className !== className) {
            elLog.className = className;
        }
        return elLog;
    };
    /**
     * Build the proper message box
     *
     * @param  {Object} item    Current object in the queue
     *
     * @return {String}         An HTML string of the message box
     */
    Alertify.prototype.buildDialog = function (item) {
        var btnTxt = this.dialogs.buttons.ok;
        var html = "<div class=\"dialog\"><div>" + this.dialogs.message.replace("{{message}}", item.message);
        if (item.type === "confirm" || item.type === "prompt") {
            btnTxt = this.dialogs.buttons.cancel + this.dialogs.buttons.ok;
        }
        if (item.type === "prompt") {
            html += this.dialogs.input;
        }
        html = ("" + html + this.dialogs.buttons.holder + "</div></div>")
            .replace("{{buttons}}", btnTxt)
            .replace("{{ok}}", this.okLabel)
            .replace("{{cancel}}", this.cancelLabel);
        return html;
    };
    /**
     * Initiate all the required pieces for the dialog box
     *
     * @return {undefined}
     */
    Alertify.prototype.setupDialog = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var el, btnOK, input, label, promise;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        el = document.createElement("div");
                        el.className = "alertify hide";
                        el.innerHTML = this.buildDialog(item);
                        btnOK = el.querySelector(".ok");
                        input = el.querySelector("input");
                        label = el.querySelector("label");
                        // Set default value/placeholder of input
                        if (input) {
                            if (typeof this.promptPlaceholder === "string") {
                                // Set the label, if available, for MDL, etc.
                                if (label) {
                                    label.textContent = this.promptPlaceholder;
                                }
                                else {
                                    input.placeholder = this.promptPlaceholder;
                                }
                            }
                            if (typeof this.promptValue === "string") {
                                input.value = this.promptValue;
                            }
                        }
                        promise = void 0;
                        if (Reflect.has(window, "Promise")) {
                            promise = new Promise(function (resolve) {
                                _this.setupHandlers(resolve, el, item);
                            });
                        }
                        else {
                            this.setupHandlers(function () { return null; }, el, item);
                        }
                        this.parent.appendChild(el);
                        setTimeout(function () {
                            el.classList.remove("hide");
                            if (input && item.type && item.type === "prompt") {
                                input.select();
                                input.focus();
                            }
                            else if (btnOK) {
                                btnOK.focus();
                            }
                        }, 100);
                        return [4 /*yield*/, promise];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Alertify.prototype.injectCSS = function () {
        if (!document.querySelector("#alertifyCSS")) {
            // eslint-disable-next-line prefer-destructuring
            var head = document.getElementsByTagName("head")[0];
            var css = document.createElement("style");
            css.id = "alertifyCSS";
            css.innerHTML = style;
            head.insertBefore(css, head.firstChild);
        }
    };
    Alertify.prototype.removeCSS = function () {
        var css = document.querySelector("#alertifyCSS");
        if (css === null || css === void 0 ? void 0 : css.parentNode) {
            css.parentNode.removeChild(css);
        }
    };
    Alertify.prototype.hideElement = function (el) {
        if (!el) {
            return;
        }
        var removeThis = function () {
            if (el === null || el === void 0 ? void 0 : el.parentNode) {
                el.parentNode.removeChild(el);
            }
        };
        el.classList.remove("show");
        el.classList.add("hide");
        el.addEventListener("transitionend", removeThis);
        // Fallback for no transitions.
        setTimeout(removeThis, Alertify.transitionFallbackDuration);
    };
    Alertify.prototype.setupHandlers = function (resolve, el, item) {
        var _this = this;
        var btnOK = el.querySelector(".ok");
        var btnCancel = el.querySelector(".cancel");
        var input = el.querySelector("input");
        if (btnOK) {
            btnOK.addEventListener("click", function (ev) {
                if (item.onOkay && typeof item.onOkay === "function") {
                    if (input) {
                        item.onOkay(input.value, ev);
                    }
                    else {
                        item.onOkay(ev);
                    }
                }
                if (input) {
                    resolve({
                        buttonClicked: "ok",
                        inputValue: input.value,
                        event: ev
                    });
                }
                else {
                    resolve({
                        buttonClicked: "ok",
                        event: ev
                    });
                }
                _this.hideElement(el);
            });
        }
        if (btnCancel) {
            btnCancel.addEventListener("click", function (ev) {
                if (item.onCancel && typeof item.onCancel === "function") {
                    item.onCancel(ev);
                }
                resolve({
                    buttonClicked: "cancel",
                    event: ev
                });
                _this.hideElement(el);
            });
        }
        if (input) {
            input.addEventListener("keyup", function (ev) {
                if (btnOK && ev.which === 13) {
                    btnOK.click();
                }
            });
        }
    };
    Alertify.transitionFallbackDuration = 500;
    Alertify.defaultDelay = 5000;
    Alertify.defaultMaxLogItems = 2;
    Alertify.defaultOkLabel = "Ok";
    Alertify.defaultCancelLabel = "Cancel";
    Alertify.defaultCloseLogOnClick = false;
    Alertify.defaultLogContainerClass = "alertify-logs";
    // eslint-disable-next-line @typescript-eslint/typedef
    Alertify.defaultDialogs = {
        buttons: {
            holder: "<nav>{{buttons}}</nav>",
            ok: "<button class='ok' tabindex='1'>{{ok}}</button>",
            cancel: "<button class='cancel' tabindex='2'>{{cancel}}</button>"
        },
        input: "<input type='text'>",
        message: "<p class='msg'>{{message}}</p>",
        log: "<div class='{{class}}'>{{message}}</div>"
    };
    return Alertify;
}());
export { Alertify };
export var alertify = new Alertify();
