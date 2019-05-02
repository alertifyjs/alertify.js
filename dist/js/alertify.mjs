var alertify = (function (exports) {
    'use strict';

    var css = ".alertify-logs>*{padding:12px 24px;color:#fff;-webkit-box-shadow:0 2px 5px 0 rgba(0,0,0,.2);box-shadow:0 2px 5px 0 rgba(0,0,0,.2);border-radius:1px;-webkit-transition:all .2s;-o-transition:.2s all;transition:all .2s;display:block!important}.alertify-logs>*,.alertify-logs>.default{background:rgba(0,0,0,.8)}.alertify-logs>.error{background:rgba(244,67,54,.8)}.alertify-logs>.success{background:rgba(76,175,80,.9)}.alertify{position:fixed;background-color:rgba(0,0,0,.3);left:0;right:0;top:0;bottom:0;width:100%;height:100%;z-index:99999}.alertify.hide{opacity:0;pointer-events:none}.alertify,.alertify.show{-webkit-transition:all .33s cubic-bezier(.25,.8,.25,1);-o-transition:all .33s cubic-bezier(.25,.8,.25,1);transition:all .33s cubic-bezier(.25,.8,.25,1)}.alertify,.alertify *,.alertify.show{-webkit-box-sizing:border-box;box-sizing:border-box}.alertify .dialog{padding:12px}.alertify .alert,.alertify .dialog{width:100%;margin:0 auto;position:relative;top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%)}.alertify .alert>*,.alertify .dialog>*{width:400px;max-width:95%;margin:0 auto;text-align:center;padding:12px;background:#fff;-webkit-box-shadow:0 2px 4px -1px rgba(0,0,0,.14),0 4px 5px 0 rgba(0,0,0,.098),0 1px 10px 0 rgba(0,0,0,.084);box-shadow:0 2px 4px -1px rgba(0,0,0,.14),0 4px 5px 0 rgba(0,0,0,.098),0 1px 10px 0 rgba(0,0,0,.084)}.alertify .alert .msg,.alertify .dialog .msg{padding:12px;margin:0;text-align:left}.alertify .alert input:not(.form-control),.alertify .dialog input:not(.form-control){margin-bottom:15px;width:100%;font-size:100%;padding:12px}.alertify .alert input:not(.form-control):focus,.alertify .dialog input:not(.form-control):focus{outline-offset:-2px}.alertify .alert nav,.alertify .dialog nav{text-align:right}.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button),.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button){background:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;color:rgba(0,0,0,.87);position:relative;outline:0;display:inline-block;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:0 6px;margin:6px 8px;line-height:36px;min-height:36px;white-space:nowrap;min-width:88px;text-align:center;text-transform:uppercase;font-size:14px;text-decoration:none;cursor:pointer;border:1px solid transparent;border-radius:2px}.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):active,.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):hover,.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):active,.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):hover{background-color:rgba(0,0,0,.05)}.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):focus,.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):focus{border:1px solid rgba(0,0,0,.1)}.alertify .alert nav button.btn,.alertify .dialog nav button.btn{margin:6px 4px}.alertify-logs{position:fixed;z-index:99999}.alertify-logs.bottom,.alertify-logs:not(.top){bottom:16px}.alertify-logs.left,.alertify-logs:not(.right){left:16px}.alertify-logs.left>*,.alertify-logs:not(.right)>*{float:left;-webkit-transform:translateZ(0);transform:translateZ(0);height:auto}.alertify-logs.left>.show,.alertify-logs:not(.right)>.show{left:0}.alertify-logs.left>*,.alertify-logs.left>.hide,.alertify-logs:not(.right)>*,.alertify-logs:not(.right)>.hide{left:-110%}.alertify-logs.right{right:16px}.alertify-logs.right>*{float:right;-webkit-transform:translateZ(0);transform:translateZ(0)}.alertify-logs.right>.show{right:0;opacity:1}.alertify-logs.right>*,.alertify-logs.right>.hide{right:-110%;opacity:0}.alertify-logs.top{top:0}.alertify-logs>*{-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transition:all .4s cubic-bezier(.25,.8,.25,1);-o-transition:all .4s cubic-bezier(.25,.8,.25,1);transition:all .4s cubic-bezier(.25,.8,.25,1);position:relative;clear:both;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-perspective:1000;perspective:1000;max-height:0;margin:0;padding:0;overflow:hidden;opacity:0;pointer-events:none}.alertify-logs>.show{margin-top:12px;opacity:1;max-height:1000px;padding:12px;pointer-events:auto}";

    /**
     * Alertify private object
     * @type {Object}
     */
    class Alertify {
        constructor() {
            this._parent = document.body;
            this._version = "1.0.11";
            this._defaultOkLabel = "Ok";
            this._okLabel = "Ok";
            this._defaultCancelLabel = "Cancel";
            this._cancelLabel = "Cancel";
            this._defaultMaxLogItems = 2;
            this._maxLogItems = 2;
            this._promptValue = "";
            this._promptPlaceholder = "";
            this._closeLogOnClick = false;
            this._closeLogOnClickDefault = false;
            this._delay = 5000;
            this._defaultDelay = 5000;
            this._logContainerClass = "alertify-logs";
            this._logContainerDefaultClass = "alertify-logs";
            this._logTemplateMethod = null;
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
            this.defaultDialogs = {
                buttons: {
                    holder: "<nav>{{buttons}}</nav>",
                    ok: "<button class='ok' tabindex='1'>{{ok}}</button>",
                    cancel: "<button class='cancel' tabindex='2'>{{cancel}}</button>"
                },
                input: "<input type='text'>",
                message: "<p class='msg'>{{message}}</p>",
                log: "<div class='{{class}}'>{{message}}</div>"
            };
            this._injectCSS();
        }
        parent(elem) {
            this._parent = elem;
        }
        reset() {
            this._reset();
            return this;
        }
        alert(message, onOkay, onCancel) {
            return this._dialog(message, "alert", onOkay, onCancel) || this;
        }
        confirm(message, onOkay, onCancel) {
            return this._dialog(message, "confirm", onOkay, onCancel) || this;
        }
        prompt(message, onOkay, onCancel) {
            return this._dialog(message, "prompt", onOkay, onCancel) || this;
        }
        log(message, click) {
            this._log(message, "default", click);
            return this;
        }
        theme(themeStr) {
            this._theme(themeStr);
            return this;
        }
        success(message, click) {
            this._log(message, "success", click);
            return this;
        }
        error(message, click) {
            this._log(message, "error", click);
            return this;
        }
        cancelBtn(label) {
            this._cancelBtn(label);
            return this;
        }
        okBtn(label) {
            this._okBtn(label);
            return this;
        }
        delay(time) {
            this._setDelay(time);
            return this;
        }
        placeholder(str) {
            this._promptPlaceholder = str;
            return this;
        }
        defaultValue(str) {
            this._promptValue = str;
            return this;
        }
        maxLogItems(num) {
            this._setMaxLogItems(num);
            return this;
        }
        closeLogOnClick(bool) {
            this._setCloseLogOnClick(!!bool);
            return this;
        }
        logPosition(str) {
            this._setLogPosition(str || "");
            return this;
        }
        setLogTemplate(templateMethod) {
            this._logTemplateMethod = templateMethod;
            return this;
        }
        clearLogs() {
            this._setupLogContainer().innerHTML = "";
            return this;
        }
        /**
         * Build the proper message box
         *
         * @param  {Object} item    Current object in the queue
         *
         * @return {String}         An HTML string of the message box
         */
        _build(item) {
            let btnTxt = this.dialogs.buttons.ok;
            let html = "<div class='dialog'>" + "<div>" + this.dialogs.message.replace("{{message}}", item.message);
            if (item.type === "confirm" || item.type === "prompt") {
                btnTxt = this.dialogs.buttons.cancel + this.dialogs.buttons.ok;
            }
            if (item.type === "prompt") {
                html += this.dialogs.input;
            }
            html = (html + this.dialogs.buttons.holder + "</div>" + "</div>")
                .replace("{{buttons}}", btnTxt)
                .replace("{{ok}}", this._okLabel)
                .replace("{{cancel}}", this._cancelLabel);
            return html;
        }
        _setCloseLogOnClick(bool) {
            this._closeLogOnClick = !!bool;
        }
        /**
         * Close the log messages
         *
         * @param  {Object} elem    HTML Element of log message to close
         * @param  {Number} wait    [optional] Time (in ms) to wait before automatically hiding the message, if 0 never hide
         *
         * @return {undefined}
         */
        _close(elem, wait = 0) {
            if (this.closeLogOnClick) {
                elem.addEventListener("click", () => this._hideElement(elem));
            }
            wait = wait && !isNaN(+wait) ? +wait : this._delay;
            if (wait < 0) {
                this._hideElement(elem);
            }
            else if (wait > 0) {
                setTimeout(() => this._hideElement(elem), wait);
            }
        }
        /**
         * Create a dialog box
         *
         * @param  {String}   message      The message passed from the callee
         * @param  {String}   type         Type of dialog to create
         * @param  {Function} onOkay       [Optional] Callback function when clicked okay.
         * @param  {Function} onCancel     [Optional] Callback function when cancelled.
         *
         * @return {Object}
         */
        _dialog(message, type, onOkay, onCancel) {
            return this._setup({
                type,
                message,
                onOkay,
                onCancel
            });
        }
        /**
         * Show a new log message box
         *
         * @param  {String} message    The message passed from the callee
         * @param  {String} type       [Optional] Optional type of log message
         * @param  {Number} wait       [Optional] Time (in ms) to wait before auto-hiding the log
         *
         * @return {Object}
         */
        _log(message, type, click) {
            const existing = document.querySelectorAll(".alertify-logs > div");
            if (existing) {
                const diff = existing.length - this._maxLogItems;
                if (diff >= 0) {
                    for (let i = 0, _i = diff + 1; i < _i; i++) {
                        this._close(existing[i], -1);
                    }
                }
            }
            this._notify(message, type, click);
        }
        _setLogPosition(str) {
            this._logContainerClass = "alertify-logs " + str;
        }
        _setupLogContainer() {
            let elLog = document.querySelector(".alertify-logs");
            const className = this._logContainerClass;
            if (!elLog) {
                elLog = document.createElement("div");
                elLog.className = className;
                this._parent.appendChild(elLog);
            }
            // Make sure it's positioned properly.
            if (elLog.className !== className) {
                elLog.className = className;
            }
            return elLog;
        }
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
        _notify(message, type, click) {
            const elLog = this._setupLogContainer();
            const log = document.createElement("div");
            log.className = (type || "default");
            log.innerHTML = alertify._logTemplateMethod ?
                alertify._logTemplateMethod(message) : message;
            // Add the click handler, if specified.
            if ("function" === typeof click) {
                log.addEventListener("click", click);
            }
            elLog.appendChild(log);
            setTimeout(function () {
                log.className += " show";
            }, 10);
            this._close(log, this._delay);
        }
        /**
         * Initiate all the required pieces for the dialog box
         *
         * @return {undefined}
         */
        _setup(item) {
            const el = document.createElement("div");
            el.className = "alertify hide";
            el.innerHTML = this._build(item);
            const btnOK = el.querySelector(".ok");
            const input = el.querySelector("input");
            const label = el.querySelector("label");
            // Set default value/placeholder of input
            if (input) {
                if (typeof this._promptPlaceholder === "string") {
                    // Set the label, if available, for MDL, etc.
                    if (label) {
                        label.textContent = this._promptPlaceholder;
                    }
                    else {
                        input.placeholder = this._promptPlaceholder;
                    }
                }
                if (typeof this._promptValue === "string") {
                    input.value = this._promptValue;
                }
            }
            let promise;
            if (Reflect.has(window, "Promise")) {
                promise = new Promise((resolve) => this._setupHandlers(resolve, el, item));
            }
            else {
                this._setupHandlers(() => null, el, item);
            }
            this._parent.appendChild(el);
            setTimeout(function () {
                el.classList.remove("hide");
                if (input && item.type && item.type === "prompt") {
                    input.select();
                    input.focus();
                }
                else {
                    if (btnOK) {
                        btnOK.focus();
                    }
                }
            }, 100);
            return promise;
        }
        _okBtn(label) {
            this._okLabel = label;
            return this;
        }
        _setDelay(time = 0) {
            this._delay = isNaN(time) ? this._defaultDelay : time;
            return this;
        }
        _cancelBtn(str) {
            this._cancelLabel = str;
            return this;
        }
        _setMaxLogItems(num) {
            this._maxLogItems = num || this._defaultMaxLogItems;
        }
        _theme(themeStr) {
            switch (themeStr.toLowerCase()) {
                case "bootstrap":
                    this.dialogs.buttons.ok = "<button class='ok btn btn-primary' tabindex='1'>{{ok}}</button>";
                    this.dialogs.buttons.cancel = "<button class='cancel btn btn-default' tabindex='2'>{{cancel}}</button>";
                    this.dialogs.input = "<input type='text' class='form-control'>";
                    break;
                case "purecss":
                    this.dialogs.buttons.ok = "<button class='ok pure-button' tabindex='1'>{{ok}}</button>";
                    this.dialogs.buttons.cancel = "<button class='cancel pure-button' tabindex='2'>{{cancel}}</button>";
                    break;
                case "mdl":
                case "material-design-light":
                    this.dialogs.buttons.ok = "<button class='ok mdl-button mdl-js-button mdl-js-ripple-effect'  tabindex='1'>{{ok}}</button>";
                    this.dialogs.buttons.cancel = "<button class='cancel mdl-button mdl-js-button mdl-js-ripple-effect' tabindex='2'>{{cancel}}</button>";
                    this.dialogs.input = "<div class='mdl-textfield mdl-js-textfield'><input class='mdl-textfield__input'><label class='md-textfield__label'></label></div>";
                    break;
                case "angular-material":
                    this.dialogs.buttons.ok = "<button class='ok md-primary md-button' tabindex='1'>{{ok}}</button>";
                    this.dialogs.buttons.cancel = "<button class='cancel md-button' tabindex='2'>{{cancel}}</button>";
                    this.dialogs.input = "<div layout='column'><md-input-container md-no-float><input type='text'></md-input-container></div>";
                    break;
                case "default":
                default:
                    this.dialogs.buttons.ok = this.defaultDialogs.buttons.ok;
                    this.dialogs.buttons.cancel = this.defaultDialogs.buttons.cancel;
                    this.dialogs.input = this.defaultDialogs.input;
                    break;
            }
        }
        _reset() {
            this._parent = document.body;
            this.theme("default");
            this.okBtn(this._defaultOkLabel);
            this.cancelBtn(this._defaultCancelLabel);
            this._setMaxLogItems();
            this._promptValue = "";
            this._promptPlaceholder = "";
            this._delay = this._defaultDelay;
            this._setCloseLogOnClick(this._closeLogOnClickDefault);
            this._setLogPosition("bottom left");
            this._logTemplateMethod = null;
        }
        _injectCSS() {
            if (!document.querySelector("#alertifyCSS")) {
                const head = document.getElementsByTagName("head")[0];
                const css$1 = document.createElement("style");
                css$1.id = "alertifyCSS";
                css$1.innerHTML = css;
                head.insertBefore(css$1, head.firstChild);
            }
        }
        removeCSS() {
            const css = document.querySelector("#alertifyCSS");
            if (css && css.parentNode) {
                css.parentNode.removeChild(css);
            }
        }
        _hideElement(el) {
            if (!el) {
                return;
            }
            const removeThis = () => {
                if (el && el.parentNode) {
                    el.parentNode.removeChild(el);
                }
            };
            el.classList.remove("show");
            el.classList.add("hide");
            el.addEventListener("transitionend", removeThis);
            // Fallback for no transitions.
            setTimeout(removeThis, Alertify.TRANSITION_FALLBACK_DURATION);
        }
        _setupHandlers(resolve, el, item) {
            const btnOK = el.querySelector(".ok");
            const btnCancel = el.querySelector(".cancel");
            const input = el.querySelector("input");
            if (btnOK) {
                btnOK.addEventListener("click", (ev) => {
                    if (item.onOkay && "function" === typeof item.onOkay) {
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
                    this._hideElement(el);
                });
            }
            if (btnCancel) {
                btnCancel.addEventListener("click", (ev) => {
                    if (item.onCancel && "function" === typeof item.onCancel) {
                        item.onCancel(ev);
                    }
                    resolve({
                        buttonClicked: "cancel",
                        event: ev
                    });
                    this._hideElement(el);
                });
            }
            if (input) {
                input.addEventListener("keyup", (ev) => {
                    if (btnOK && ev.which === 13) {
                        btnOK.click();
                    }
                });
            }
        }
    }
    Alertify.TRANSITION_FALLBACK_DURATION = 500;
    const alertify = new Alertify();

    exports.Alertify = Alertify;
    exports.alertify = alertify;

    return exports;

}({}));
