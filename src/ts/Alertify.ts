
import style from "./../sass/alertify.scss";

interface IAlertifyItem {
    type: string;
    message: string;
    onOkay: Function;
    onCancel: Function;
}

/**
 * Alertify private object
 * @type {Object}
 */
export class Alertify {

    public static readonly TRANSITION_FALLBACK_DURATION: number = 500;

    protected _parent: HTMLElement = document.body;
    protected _version: string = "1.0.11";
    protected _defaultOkLabel: string = "Ok";
    protected _okLabel: string = "Ok";
    protected _defaultCancelLabel: string = "Cancel";
    protected _cancelLabel: string = "Cancel";
    protected _defaultMaxLogItems: number = 2;
    protected _maxLogItems: number = 2;
    protected _promptValue: string = "";
    protected _promptPlaceholder: string = "";
    protected _closeLogOnClick: boolean = false;
    protected _closeLogOnClickDefault: boolean = false;
    protected _delay: number = 5000;
    protected _defaultDelay: number = 5000;
    protected _logContainerClass: string = "alertify-logs";
    protected _logContainerDefaultClass: string = "alertify-logs";
    protected _logTemplateMethod: Function | null = null;

    protected dialogs = {
        buttons: {
            holder: "<nav>{{buttons}}</nav>",
            ok: "<button class='ok' tabindex='1'>{{ok}}</button>",
            cancel: "<button class='cancel' tabindex='2'>{{cancel}}</button>"
        },
        input: "<input type='text'>",
        message: "<p class='msg'>{{message}}</p>",
        log: "<div class='{{class}}'>{{message}}</div>"
    };

    protected defaultDialogs = {
        buttons: {
            holder: "<nav>{{buttons}}</nav>",
            ok: "<button class='ok' tabindex='1'>{{ok}}</button>",
            cancel: "<button class='cancel' tabindex='2'>{{cancel}}</button>"
        },
        input: "<input type='text'>",
        message: "<p class='msg'>{{message}}</p>",
        log: "<div class='{{class}}'>{{message}}</div>"
    };

    constructor() {
        this._injectCSS();
    }

    public parent(elem: HTMLElement) {
        this._parent = elem;
    }

    public reset() {
        this._reset();
        return this;
    }

    public alert(message: string, onOkay: Function, onCancel: Function) {
        return this._dialog(message, "alert", onOkay, onCancel) || this;
    }

    public confirm(message: string, onOkay: Function, onCancel: Function) {
        return this._dialog(message, "confirm", onOkay, onCancel) || this;
    }

    public prompt(message: string, onOkay: Function, onCancel: Function) {
        return this._dialog(message, "prompt", onOkay, onCancel) || this;
    }

    public log(message: string, click: EventListenerOrEventListenerObject) {
        this._log(message, "default", click);
        return this;
    }

    public theme(themeStr: string) {
        this._theme(themeStr);
        return this;
    }

    public success(message: string, click: EventListenerOrEventListenerObject) {
        this._log(message, "success", click);
        return this;
    }

    public error(message: string, click: EventListenerOrEventListenerObject) {
        this._log(message, "error", click);
        return this;
    }

    public cancelBtn(label: string) {
        this._cancelBtn(label);
        return this;
    }

    public okBtn(label: string) {
        this._okBtn(label);
        return this;
    }

    public delay(time: number) {
        this._setDelay(time);
        return this;
    }

    public placeholder(str: string) {
        this._promptPlaceholder = str;
        return this;
    }

    public defaultValue(str: string) {
        this._promptValue = str;
        return this;
    }

    public maxLogItems(num: number) {
        this._setMaxLogItems(num);
        return this;
    }

    public closeLogOnClick(bool: boolean) {
        this._setCloseLogOnClick(!!bool);
        return this;
    }

    public logPosition(str: string) {
        this._setLogPosition(str || "");
        return this;
    }

    public setLogTemplate(templateMethod: Function) {
        this._logTemplateMethod = templateMethod;
        return this;
    }

    public clearLogs() {
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
    protected _build(item: IAlertifyItem): string {

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

    protected _setCloseLogOnClick(bool: boolean): void {
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
    protected _close(elem: HTMLElement, wait: number = 0): void {

        if (this.closeLogOnClick) {
            elem.addEventListener("click", () => this._hideElement(elem));
        }

        wait = wait && !isNaN(+wait) ? +wait : this._delay;

        if (wait < 0) {
            this._hideElement(elem);
        } else if (wait > 0) {
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
    protected _dialog(message: string, type: string, onOkay: Function, onCancel: Function) {
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
    protected _log(message: string, type: string, click: EventListenerOrEventListenerObject): void {

        const existing: NodeListOf<HTMLDivElement> = document.querySelectorAll(".alertify-logs > div");
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

    protected _setLogPosition(str: string): void {
        this._logContainerClass = "alertify-logs " + str;
    }

    protected _setupLogContainer(): Element {

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
    protected _notify(message: string, type: string, click: EventListenerOrEventListenerObject): void {

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
        setTimeout(
            function () {
                log.className += " show";
            },
            10
        );

        this._close(log, this._delay);

    }

    /**
     * Initiate all the required pieces for the dialog box
     *
     * @return {undefined}
     */
    protected _setup(item: IAlertifyItem): Promise<object> | void {

        const el = document.createElement("div");
        el.className = "alertify hide";
        el.innerHTML = this._build(item);

        const btnOK: HTMLElement | null = el.querySelector(".ok");
        const input = el.querySelector("input");
        const label = el.querySelector("label");

        // Set default value/placeholder of input
        if (input) {
            if (typeof this._promptPlaceholder === "string") {
                // Set the label, if available, for MDL, etc.
                if (label) {
                    label.textContent = this._promptPlaceholder;
                } else {
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
        } else {
            this._setupHandlers(() => null, el, item);
        }

        this._parent.appendChild(el);
        setTimeout(
            function () {
                el.classList.remove("hide");
                if (input && item.type && item.type === "prompt") {
                    input.select();
                    input.focus();
                } else {
                    if (btnOK) {
                        btnOK.focus();
                    }
                }
            },
            100
        );

        return promise;
    }

    protected _okBtn(label: string): this {
        this._okLabel = label;
        return this;
    }

    protected _setDelay(time: number = 0): this {
        this._delay = isNaN(time) ? this._defaultDelay : time;
        return this;
    }

    protected _cancelBtn(str: string): this {
        this._cancelLabel = str;
        return this;
    }

    protected _setMaxLogItems(num?: number): void {
        this._maxLogItems = num || this._defaultMaxLogItems;
    }

    protected _theme(themeStr: string): void {
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

    protected _reset(): void {
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

    protected _injectCSS() {
        if (!document.querySelector("#alertifyCSS")) {
            const head = document.getElementsByTagName("head")[0];
            const css = document.createElement("style");
            css.id = "alertifyCSS";
            css.innerHTML = style;
            head.insertBefore(css, head.firstChild);
        }
    }

    protected removeCSS() {
        const css = document.querySelector("#alertifyCSS");
        if (css && css.parentNode) {
            css.parentNode.removeChild(css);
        }
    }

    private _hideElement(el: Element) {
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

    private _setupHandlers(resolve: Function, el: HTMLElement, item: IAlertifyItem) {

        const btnOK: HTMLElement | null = el.querySelector(".ok");
        const btnCancel = el.querySelector(".cancel");
        const input = el.querySelector("input");

        if (btnOK) {
            btnOK.addEventListener("click", (ev) => {
                if (item.onOkay && "function" === typeof item.onOkay) {
                    if (input) {
                        item.onOkay(input.value, ev);
                    } else {
                        item.onOkay(ev);
                    }
                }

                if (input) {
                    resolve({
                        buttonClicked: "ok",
                        inputValue: input.value,
                        event: ev
                    });
                } else {
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

export const alertify = new Alertify();
