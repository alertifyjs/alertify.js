
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

    public parent: HTMLElement = document.body;
    public version: string = "1.0.11";
    public defaultOkLabel: string = "Ok";
    public okLabel: string = "Ok";
    public defaultCancelLabel: string = "Cancel";
    public cancelLabel: string = "Cancel";
    public defaultMaxLogItems: number = 2;
    public maxLogItems: number = 2;
    public promptValue: string = "";
    public promptPlaceholder: string = "";
    public closeLogOnClick: boolean = false;
    public closeLogOnClickDefault: boolean = false;
    public delay: number = 5000;
    public defaultDelay: number = 5000;
    public logContainerClass: string = "alertify-logs";
    public logContainerDefaultClass: string = "alertify-logs";
    public logTemplateMethod: Function | null = null;

    public dialogs = {
        buttons: {
            holder: "<nav>{{buttons}}</nav>",
            ok: "<button class='ok' tabindex='1'>{{ok}}</button>",
            cancel: "<button class='cancel' tabindex='2'>{{cancel}}</button>"
        },
        input: "<input type='text'>",
        message: "<p class='msg'>{{message}}</p>",
        log: "<div class='{{class}}'>{{message}}</div>"
    };

    public defaultDialogs = {
        buttons: {
            holder: "<nav>{{buttons}}</nav>",
            ok: "<button class='ok' tabindex='1'>{{ok}}</button>",
            cancel: "<button class='cancel' tabindex='2'>{{cancel}}</button>"
        },
        input: "<input type='text'>",
        message: "<p class='msg'>{{message}}</p>",
        log: "<div class='{{class}}'>{{message}}</div>"
    };

    constructor(){
        this.injectCSS();
    }

    /**
     * Build the proper message box
     *
     * @param  {Object} item    Current object in the queue
     *
     * @return {String}         An HTML string of the message box
     */
    public build(item: IAlertifyItem): string {

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
            .replace("{{ok}}", this.okLabel)
            .replace("{{cancel}}", this.cancelLabel);

        return html;

    }

    public setCloseLogOnClick(bool: boolean): void {
        this.closeLogOnClick = !!bool;
    }

    /**
     * Close the log messages
     *
     * @param  {Object} elem    HTML Element of log message to close
     * @param  {Number} wait    [optional] Time (in ms) to wait before automatically hiding the message, if 0 never hide
     *
     * @return {undefined}
     */
    public close(elem: HTMLElement, wait: number): void {

        if (this.closeLogOnClick) {
            elem.addEventListener("click", () => this.hideElement(elem));
        }

        wait = wait && !isNaN(+wait) ? +wait : this.delay;

        if (wait < 0) {
            this.hideElement(elem);
        } else if (wait > 0) {
            setTimeout(() => this.hideElement(elem), wait);
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
    public dialog(message: string, type: string, onOkay: Function, onCancel: Function) {
        return this.setup({
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
    public log(message: string, type: string, click: EventListenerOrEventListenerObject): void {

        const existing: NodeListOf<HTMLDivElement> = document.querySelectorAll(".alertify-logs > div");
        if (existing) {
            const diff = existing.length - this.maxLogItems;
            if (diff >= 0) {
                for (let i = 0, _i = diff + 1; i < _i; i++) {
                    this.close(existing[i], -1);
                }
            }
        }

        this.notify(message, type, click);
    }

    public setLogPosition(str: string): void {
        this.logContainerClass = "alertify-logs " + str;
    }

    public setupLogContainer(): Element {

        let elLog = document.querySelector(".alertify-logs");
        const className = this.logContainerClass;
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
    public notify(message: string, type: string, click: EventListenerOrEventListenerObject): void {

        const elLog = this.setupLogContainer();
        const log = document.createElement("div");

        log.className = (type || "default");
        if (alertify.logTemplateMethod) {
            log.innerHTML = alertify.logTemplateMethod(message);
        } else {
            log.innerHTML = message;
        }

        // Add the click handler, if specified.
        if ("function" === typeof click) {
            log.addEventListener("click", click);
        }

        elLog.appendChild(log);
        setTimeout(function () {
            log.className += " show";
        }, 10);

        this.close(log, this.delay);

    }

    /**
     * Initiate all the required pieces for the dialog box
     *
     * @return {undefined}
     */
    public setup(item: IAlertifyItem): Promise<object> | void {

        const el = document.createElement("div");
        el.className = "alertify hide";
        el.innerHTML = this.build(item);

        const btnOK: HTMLElement | null = el.querySelector(".ok");
        const input = el.querySelector("input");
        const label = el.querySelector("label");

        // Set default value/placeholder of input
        if (input) {
            if (typeof this.promptPlaceholder === "string") {
                // Set the label, if available, for MDL, etc.
                if (label) {
                    label.textContent = this.promptPlaceholder;
                } else {
                    input.placeholder = this.promptPlaceholder;
                }
            }
            if (typeof this.promptValue === "string") {
                input.value = this.promptValue;
            }
        }

        let promise;

        if (typeof Promise === "function") {
            promise = new Promise((resolve) => this.setupHandlers(resolve, el, item));
        } else {
            this.setupHandlers(() => null, el, item);
        }

        this.parent.appendChild(el);
        setTimeout(function () {
            el.classList.remove("hide");
            if (input && item.type && item.type === "prompt") {
                input.select();
                input.focus();
            } else {
                if (btnOK) {
                    btnOK.focus();
                }
            }
        }, 100);

        return promise;
    }

    public okBtn(label: string): this {
        this.okLabel = label;
        return this;
    }

    public setDelay(time?: number): this {
        time = time || 0;
        this.delay = isNaN(time) ? this.defaultDelay : time;
        return this;
    }

    public cancelBtn(str: string): this {
        this.cancelLabel = str;
        return this;
    }

    public setMaxLogItems(num?: number): void {
        this.maxLogItems = num || this.defaultMaxLogItems;
    }

    public theme(themeStr: string): void {
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

    public reset(): void {
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
    }

    public injectCSS() {
        if (!document.querySelector("#alertifyCSS")) {
            const head = document.getElementsByTagName("head")[0];
            const css = document.createElement("style");
            css.type = "text/css";
            css.id = "alertifyCSS";
            css.innerHTML = "/* style.css */";
            head.insertBefore(css, head.firstChild);
        }
    }

    public removeCSS() {
        let css = document.querySelector("#alertifyCSS");
        if (css && css.parentNode) {
            css.parentNode.removeChild(css);
        }
    }

    private hideElement(el: Element) {
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
    };

    private setupHandlers(resolve: Function, el: HTMLElement, item: IAlertifyItem) {

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

                this.hideElement(el);
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

                this.hideElement(el);
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
