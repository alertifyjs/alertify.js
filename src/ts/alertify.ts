/* eslint-disable max-lines */

import style from "./../sass/alertify.scss";

interface IAlertifyItem {
    type: DialogTypes;
    message: string;
    onOkay?: (valueOrEvent: Event | string, event?: Event) => void;
    onCancel?: (event: Event) => void;
}

interface IAlertifyDialogResult {
    buttonClicked: string;
    inputValue?: string;
    event: Event;
}

export enum LogTypes {
    default = "default",
    success = "success",
    error = "error"
}

export enum DialogTypes {
    alert = "alert",
    confirm = "confirm",
    prompt = "prompt"
}

/**
 * Alertify private object
 * @type {Object}
 */
export class Alertify {

    public static transitionFallbackDuration: number = 500;

    public static defaultDelay: number = 5000;

    public static defaultMaxLogItems: number = 2;

    public static defaultOkLabel: string = "Ok";

    public static defaultCancelLabel: string = "Cancel";

    public static defaultCloseLogOnClick: boolean = false;

    public static defaultLogContainerClass: string = "alertify-logs";

    // eslint-disable-next-line @typescript-eslint/typedef
    public static defaultDialogs = {
        buttons: {
            holder: "<nav>{{buttons}}</nav>",
            ok: "<button class='ok' tabindex='1'>{{ok}}</button>",
            cancel: "<button class='cancel' tabindex='2'>{{cancel}}</button>"
        },
        input: "<input type='text'>",
        message: "<p class='msg'>{{message}}</p>",
        log: "<div class='{{class}}'>{{message}}</div>"
    };

    protected parent: HTMLElement = document.body;

    protected version: string = "2.0.43";

    protected okLabel: string = "Ok";

    protected cancelLabel: string = "Cancel";

    protected maxLogItems: number = 2;

    protected promptValue: string = "";

    protected promptPlaceholder: string = "";

    protected closeLogOnClick: boolean = false;

    protected delay: number = 5000;

    protected logContainerClass: string = "alertify-logs";

    protected logTemplateMethod: ((message: HTMLElement | string) => HTMLElement | string) | null = null;

    // eslint-disable-next-line @typescript-eslint/typedef
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

    public constructor () {
        this.injectCSS();
    }

    public setParent (elem: HTMLElement): this {
        this.parent = elem;
        return this;
    }

    // eslint-disable-next-line max-statements
    public reset (): this {
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
    }

    // Notify

    public log (message: HTMLElement | string, click?: EventListenerOrEventListenerObject): this {
        this.prepareNotify(message, LogTypes.default, click);
        return this;
    }

    public success (message: HTMLElement | string, click?: EventListenerOrEventListenerObject): this {
        this.prepareNotify(message, LogTypes.success, click);
        return this;
    }

    public error (message: HTMLElement | string, click?: EventListenerOrEventListenerObject): this {
        this.prepareNotify(message, LogTypes.error, click);
        return this;
    }

    public setDelay (time: number): this {
        this.delay = Number(time) || Alertify.defaultDelay;
        return this;
    }

    public setMaxLogItems (num: number): this {
        this.maxLogItems = Number(num) || Alertify.defaultMaxLogItems;
        return this;
    }

    public setCloseLogOnClick (bool: boolean): this {
        this.closeLogOnClick = Boolean(bool);
        return this;
    }

    public setLogPosition (str: string): this {
        this.logContainerClass = `alertify-logs ${str || ""}`;
        return this;
    }

    public setLogTemplate (templateMethod: ((message: HTMLElement | string) => HTMLElement | string) | null): this {
        this.logTemplateMethod = templateMethod;
        return this;
    }

    public clearLogs (): this {
        this.setupLogContainer().innerHTML = "";
        return this;
    }

    /**
     * Close the log messages
     *
     * @param  {Object} elem    HTML Element of log message to close
     * @param  {Number} wait    [optional] Time (in ms) to wait before automatically hiding the message, if 0 never hide
     *
     * @return {undefined}
     */
    public close (elem: HTMLElement, wait: number = 0): void {
        if (this.closeLogOnClick) {
            elem.addEventListener("click", () => this.hideElement(elem));
        }

        const delay = wait && !isNaN(Number(wait)) ? Number(wait) : this.delay;

        if (delay < 0) {
            this.hideElement(elem);
        } else if (delay > 0) {
            setTimeout(() => this.hideElement(elem), delay);
        }
    }

    // Dialog
    public async alert (message: string, onOkay?: () => void, onCancel?: () => void): Promise<IAlertifyDialogResult> {
        return this.dialog(message, DialogTypes.alert, onOkay, onCancel);
    }

    public async confirm (message: string, onOkay?: () => void, onCancel?: () => void): Promise<IAlertifyDialogResult> {
        return this.dialog(message, DialogTypes.confirm, onOkay, onCancel);
    }

    public async prompt (message: string, onOkay?: () => void, onCancel?: () => void): Promise<IAlertifyDialogResult> {
        return this.dialog(message, DialogTypes.prompt, onOkay, onCancel);
    }

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
    public async dialog (
        message: string,
        type: DialogTypes,
        onOkay?: () => void,
        onCancel?: () => void
    ): Promise<IAlertifyDialogResult> {
        return this.setupDialog({
            type,
            message,
            onOkay,
            onCancel
        });
    }

    public cancelBtn (label: string): this {
        this.cancelLabel = label;
        return this;
    }

    public okBtn (label: string): this {
        this.okLabel = label;
        return this;
    }

    public placeholder (str: string): this {
        this.promptPlaceholder = str;
        return this;
    }

    public defaultValue (str: string): this {
        this.promptValue = str;
        return this;
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
    protected prepareNotify (message: HTMLElement | string, type?: LogTypes, click?: EventListenerOrEventListenerObject): void {
        const existing: NodeListOf<HTMLDivElement> = document.querySelectorAll(".alertify-logs > div");
        if (existing.length) {
            const diff = existing.length - this.maxLogItems;
            if (diff >= 0) {
                const total = diff + 1;
                for (let index = 0; index < total; index += 1) {
                    this.close(existing[index], -1);
                }
            }
        }

        this.showNotify(message, type, click);
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
    // eslint-disable-next-line max-statements
    protected showNotify (
        message: HTMLElement | string,
        type: LogTypes = LogTypes.default,
        click?: EventListenerOrEventListenerObject
    ): void {
        const elLog = this.setupLogContainer();
        const log = document.createElement("div");

        log.className = type;

        let htmlChild = message;
        if (this.logTemplateMethod) {
            htmlChild = this.logTemplateMethod(message);
        }

        if (htmlChild instanceof HTMLElement) {
            log.appendChild(htmlChild);
        } else {
            log.innerHTML = htmlChild;
        }

        // Add the click handler, if specified.
        if (typeof click === "function") {
            log.addEventListener("click", click);
        }

        elLog.appendChild(log);
        requestAnimationFrame(() => {
            log.className += " show";
        });

        this.close(log, this.delay);
    }

    protected setupLogContainer (): Element {
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
     * Build the proper message box
     *
     * @param  {Object} item    Current object in the queue
     *
     * @return {String}         An HTML string of the message box
     */
    protected buildDialog (item: IAlertifyItem): string {
        let btnTxt = this.dialogs.buttons.ok;
        let html = `<div class="dialog"><div>${this.dialogs.message.replace("{{message}}", item.message)}`;

        if (item.type === "confirm" || item.type === "prompt") {
            btnTxt = this.dialogs.buttons.cancel + this.dialogs.buttons.ok;
        }

        if (item.type === "prompt") {
            html += this.dialogs.input;
        }

        html = (`${html}${this.dialogs.buttons.holder}</div></div>`)
            .replace("{{buttons}}", btnTxt)
            .replace("{{ok}}", this.okLabel)
            .replace("{{cancel}}", this.cancelLabel);

        return html;
    }

    /**
     * Initiate all the required pieces for the dialog box
     *
     * @return {undefined}
     */
    // eslint-disable-next-line max-statements
    protected async setupDialog (item: IAlertifyItem): Promise<IAlertifyDialogResult> {
        const el = document.createElement("div");
        el.className = "alertify hide";
        el.innerHTML = this.buildDialog(item);

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

        const promise = new Promise((resolve: (result: IAlertifyDialogResult) => void) => {
            this.setupHandlers(resolve, el, item);
        });

        this.parent.appendChild(el);
        setTimeout(
            () => {
                el.classList.remove("hide");
                if (input && item.type === "prompt") {
                    input.select();
                    input.focus();
                } else if (btnOK) {
                    btnOK.focus();
                }
            },
            100
        );

        return await promise;
    }

    protected injectCSS (): void {
        if (!document.querySelector("#alertifyCSS")) {
            // eslint-disable-next-line prefer-destructuring
            const head = document.getElementsByTagName("head")[0];
            const css = document.createElement("style");
            css.id = "alertifyCSS";
            css.innerHTML = style as string;
            head.insertBefore(css, head.firstChild);
        }
    }

    protected removeCSS (): void {
        const css = document.querySelector("#alertifyCSS");
        if (css?.parentNode) {
            css.parentNode.removeChild(css);
        }
    }

    private hideElement (el: Element | null): void {
        if (!el) {
            return;
        }

        const removeThis = (): void => {
            if (el.parentNode) {
                el.parentNode.removeChild(el);
            }
        };

        el.classList.remove("show");
        el.classList.add("hide");
        el.addEventListener("transitionend", removeThis);

        // Fallback for no transitions.
        setTimeout(removeThis, Alertify.transitionFallbackDuration);
    }

    // eslint-disable-next-line max-lines-per-function
    private setupHandlers (
        resolve: (result: IAlertifyDialogResult) => void,
        el: HTMLElement,
        item: IAlertifyItem
    ): void {
        const btnOK: HTMLElement | null = el.querySelector(".ok");
        const btnCancel = el.querySelector(".cancel");
        const input = el.querySelector("input");

        if (btnOK) {
            btnOK.addEventListener("click", (ev: Event) => {
                if (item.onOkay && typeof item.onOkay === "function") {
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
            btnCancel.addEventListener("click", (ev: Event) => {
                if (item.onCancel && typeof item.onCancel === "function") {
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
            input.addEventListener("keyup", (ev: KeyboardEvent) => {
                if (btnOK && ev.which === 13) {
                    btnOK.click();
                }
            });
        }
    }

}

export const alertify: Alertify = new Alertify();
