var alertify = (function (exports) {
    'use strict';

    var css = ".alertify-logs>*{padding:12px 24px;color:#fff;-webkit-box-shadow:0 2px 5px 0 rgba(0,0,0,.2);box-shadow:0 2px 5px 0 rgba(0,0,0,.2);border-radius:1px;-webkit-transition:all .2s;-o-transition:.2s all;transition:all .2s;display:block!important}.alertify-logs>*,.alertify-logs>.default{background:rgba(0,0,0,.8)}.alertify-logs>.error{background:rgba(244,67,54,.8)}.alertify-logs>.success{background:rgba(76,175,80,.9)}.alertify{position:fixed;background-color:rgba(0,0,0,.3);left:0;right:0;top:0;bottom:0;width:100%;height:100%;z-index:99999}.alertify.hide{opacity:0;pointer-events:none}.alertify,.alertify.show{-webkit-transition:all .33s cubic-bezier(.25,.8,.25,1);-o-transition:all .33s cubic-bezier(.25,.8,.25,1);transition:all .33s cubic-bezier(.25,.8,.25,1)}.alertify,.alertify *,.alertify.show{-webkit-box-sizing:border-box;box-sizing:border-box}.alertify .dialog{padding:12px}.alertify .alert,.alertify .dialog{width:100%;margin:0 auto;position:relative;top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%)}.alertify .alert>*,.alertify .dialog>*{width:400px;max-width:95%;margin:0 auto;text-align:center;padding:12px;background:#fff;-webkit-box-shadow:0 2px 4px -1px rgba(0,0,0,.14),0 4px 5px 0 rgba(0,0,0,.098),0 1px 10px 0 rgba(0,0,0,.084);box-shadow:0 2px 4px -1px rgba(0,0,0,.14),0 4px 5px 0 rgba(0,0,0,.098),0 1px 10px 0 rgba(0,0,0,.084)}.alertify .alert .msg,.alertify .dialog .msg{padding:12px;margin:0;text-align:left}.alertify .alert input:not(.form-control),.alertify .dialog input:not(.form-control){margin-bottom:15px;width:100%;font-size:100%;padding:12px}.alertify .alert input:not(.form-control):focus,.alertify .dialog input:not(.form-control):focus{outline-offset:-2px}.alertify .alert nav,.alertify .dialog nav{text-align:right}.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button),.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button){background:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;color:rgba(0,0,0,.87);position:relative;outline:0;display:inline-block;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:0 6px;margin:6px 8px;line-height:36px;min-height:36px;white-space:nowrap;min-width:88px;text-align:center;text-transform:uppercase;font-size:14px;text-decoration:none;cursor:pointer;border:1px solid transparent;border-radius:2px}.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):active,.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):hover,.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):active,.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):hover{background-color:rgba(0,0,0,.05)}.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):focus,.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):focus{border:1px solid rgba(0,0,0,.1)}.alertify .alert nav button.btn,.alertify .dialog nav button.btn{margin:6px 4px}.alertify-logs{position:fixed;z-index:99999}.alertify-logs.bottom,.alertify-logs:not(.top){bottom:16px}.alertify-logs.left,.alertify-logs:not(.right){left:16px}.alertify-logs.left>*,.alertify-logs:not(.right)>*{float:left;-webkit-transform:translateZ(0);transform:translateZ(0);height:auto}.alertify-logs.left>.show,.alertify-logs:not(.right)>.show{left:0}.alertify-logs.left>*,.alertify-logs.left>.hide,.alertify-logs:not(.right)>*,.alertify-logs:not(.right)>.hide{left:-110%}.alertify-logs.right{right:16px}.alertify-logs.right>*{float:right;-webkit-transform:translateZ(0);transform:translateZ(0)}.alertify-logs.right>.show{right:0;opacity:1}.alertify-logs.right>*,.alertify-logs.right>.hide{right:-110%;opacity:0}.alertify-logs.top{top:0}.alertify-logs>*{-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transition:all .4s cubic-bezier(.25,.8,.25,1);-o-transition:all .4s cubic-bezier(.25,.8,.25,1);transition:all .4s cubic-bezier(.25,.8,.25,1);position:relative;clear:both;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-perspective:1000;perspective:1000;max-height:0;margin:0;padding:0;overflow:hidden;opacity:0;pointer-events:none}.alertify-logs>.show{margin-top:12px;opacity:1;max-height:1000px;padding:12px;pointer-events:auto}";

    /**
     * Alertify private object
     * @type {Object}
     */
    var Alertify = /** @class */ (function () {
        function Alertify() {
            this.parent = document.body;
            this.version = "1.0.11";
            this.defaultOkLabel = "Ok";
            this.okLabel = "Ok";
            this.defaultCancelLabel = "Cancel";
            this.cancelLabel = "Cancel";
            this.defaultMaxLogItems = 2;
            this.maxLogItems = 2;
            this.promptValue = "";
            this.promptPlaceholder = "";
            this.closeLogOnClick = false;
            this.closeLogOnClickDefault = false;
            this.delay = 5000;
            this.defaultDelay = 5000;
            this.logContainerClass = "alertify-logs";
            this.logContainerDefaultClass = "alertify-logs";
            this.logTemplateMethod = null;
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
            this.injectCSS();
        }
        /**
         * Build the proper message box
         *
         * @param  {Object} item    Current object in the queue
         *
         * @return {String}         An HTML string of the message box
         */
        Alertify.prototype.build = function (item) {
            var btnTxt = this.dialogs.buttons.ok;
            var html = "<div class='dialog'>" + "<div>" + this.dialogs.message.replace("{{message}}", item.message);
            if (item.type === "confirm" || item.type === "prompt") {
                btnTxt = this.dialogs.buttons.cancel + this.dialogs.buttons.ok;
            }
            if (item.type === "prompt") {
                html += this.dialogs.input;
            }
            html = (html + this.dialogs.buttons.holder + "</div>" + "</div>")
                .replace("{{buttons}}", btnTxt)
                .replace("{{ok}}", this.okLabel)
                .replace("{{cancel}}", this.cancelLabel);
            return html;
        };
        Alertify.prototype.setCloseLogOnClick = function (bool) {
            this.closeLogOnClick = !!bool;
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
            wait = wait && !isNaN(+wait) ? +wait : this.delay;
            if (wait < 0) {
                this.hideElement(elem);
            }
            else if (wait > 0) {
                setTimeout(function () { return _this.hideElement(elem); }, wait);
            }
        };
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
        Alertify.prototype.dialog = function (message, type, onOkay, onCancel) {
            return this.setup({
                type: type,
                message: message,
                onOkay: onOkay,
                onCancel: onCancel
            });
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
        Alertify.prototype.log = function (message, type, click) {
            var existing = document.querySelectorAll(".alertify-logs > div");
            if (existing) {
                var diff = existing.length - this.maxLogItems;
                if (diff >= 0) {
                    for (var i = 0, _i = diff + 1; i < _i; i++) {
                        this.close(existing[i], -1);
                    }
                }
            }
            this.notify(message, type, click);
        };
        Alertify.prototype.setLogPosition = function (str) {
            this.logContainerClass = "alertify-logs " + str;
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
        Alertify.prototype.notify = function (message, type, click) {
            var elLog = this.setupLogContainer();
            var log = document.createElement("div");
            log.className = (type || "default");
            log.innerHTML = alertify.logTemplateMethod ?
                alertify.logTemplateMethod(message) : message;
            // Add the click handler, if specified.
            if ("function" === typeof click) {
                log.addEventListener("click", click);
            }
            elLog.appendChild(log);
            setTimeout(function () {
                log.className += " show";
            }, 10);
            this.close(log, this.delay);
        };
        /**
         * Initiate all the required pieces for the dialog box
         *
         * @return {undefined}
         */
        Alertify.prototype.setup = function (item) {
            var _this = this;
            var el = document.createElement("div");
            el.className = "alertify hide";
            el.innerHTML = this.build(item);
            var btnOK = el.querySelector(".ok");
            var input = el.querySelector("input");
            var label = el.querySelector("label");
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
            var promise;
            if (Reflect.has(window, "Promise")) {
                promise = new Promise(function (resolve) { return _this.setupHandlers(resolve, el, item); });
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
                else {
                    if (btnOK) {
                        btnOK.focus();
                    }
                }
            }, 100);
            return promise;
        };
        Alertify.prototype.okBtn = function (label) {
            this.okLabel = label;
            return this;
        };
        Alertify.prototype.setDelay = function (time) {
            if (time === void 0) { time = 0; }
            this.delay = isNaN(time) ? this.defaultDelay : time;
            return this;
        };
        Alertify.prototype.cancelBtn = function (str) {
            this.cancelLabel = str;
            return this;
        };
        Alertify.prototype.setMaxLogItems = function (num) {
            this.maxLogItems = num || this.defaultMaxLogItems;
        };
        Alertify.prototype.theme = function (themeStr) {
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
        };
        Alertify.prototype.reset = function () {
            this.parent = document.body;
            this.theme("default");
            this.okBtn(this.defaultOkLabel);
            this.cancelBtn(this.defaultCancelLabel);
            this.setMaxLogItems();
            this.promptValue = "";
            this.promptPlaceholder = "";
            this.delay = this.defaultDelay;
            this.setCloseLogOnClick(this.closeLogOnClickDefault);
            this.setLogPosition("bottom left");
            this.logTemplateMethod = null;
        };
        Alertify.prototype.injectCSS = function () {
            if (!document.querySelector("#alertifyCSS")) {
                var head = document.getElementsByTagName("head")[0];
                var css$1 = document.createElement("style");
                css$1.id = "alertifyCSS";
                css$1.innerHTML = css;
                head.insertBefore(css$1, head.firstChild);
            }
        };
        Alertify.prototype.removeCSS = function () {
            var css = document.querySelector("#alertifyCSS");
            if (css && css.parentNode) {
                css.parentNode.removeChild(css);
            }
        };
        Alertify.prototype.hideElement = function (el) {
            if (!el) {
                return;
            }
            var removeThis = function () {
                if (el && el.parentNode) {
                    el.parentNode.removeChild(el);
                }
            };
            el.classList.remove("show");
            el.classList.add("hide");
            el.addEventListener("transitionend", removeThis);
            // Fallback for no transitions.
            setTimeout(removeThis, Alertify.TRANSITION_FALLBACK_DURATION);
        };
        Alertify.prototype.setupHandlers = function (resolve, el, item) {
            var _this = this;
            var btnOK = el.querySelector(".ok");
            var btnCancel = el.querySelector(".cancel");
            var input = el.querySelector("input");
            if (btnOK) {
                btnOK.addEventListener("click", function (ev) {
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
                    _this.hideElement(el);
                });
            }
            if (btnCancel) {
                btnCancel.addEventListener("click", function (ev) {
                    if (item.onCancel && "function" === typeof item.onCancel) {
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
        Alertify.TRANSITION_FALLBACK_DURATION = 500;
        return Alertify;
    }());
    var alertify = new Alertify();

    exports.Alertify = Alertify;
    exports.alertify = alertify;

    return exports;

}({}));
