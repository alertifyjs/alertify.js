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
export declare class Alertify {
    static readonly TRANSITION_FALLBACK_DURATION: number;
    protected _parent: HTMLElement;
    protected _version: string;
    protected _defaultOkLabel: string;
    protected _okLabel: string;
    protected _defaultCancelLabel: string;
    protected _cancelLabel: string;
    protected _defaultMaxLogItems: number;
    protected _maxLogItems: number;
    protected _promptValue: string;
    protected _promptPlaceholder: string;
    protected _closeLogOnClick: boolean;
    protected _closeLogOnClickDefault: boolean;
    protected _delay: number;
    protected _defaultDelay: number;
    protected _logContainerClass: string;
    protected _logContainerDefaultClass: string;
    protected _logTemplateMethod: Function | null;
    protected dialogs: {
        buttons: {
            holder: string;
            ok: string;
            cancel: string;
        };
        input: string;
        message: string;
        log: string;
    };
    protected defaultDialogs: {
        buttons: {
            holder: string;
            ok: string;
            cancel: string;
        };
        input: string;
        message: string;
        log: string;
    };
    constructor();
    parent(elem: HTMLElement): void;
    reset(): this;
    alert(message: string, onOkay: Function, onCancel: Function): this | Promise<object>;
    confirm(message: string, onOkay: Function, onCancel: Function): this | Promise<object>;
    prompt(message: string, onOkay: Function, onCancel: Function): this | Promise<object>;
    log(message: string, click: EventListenerOrEventListenerObject): this;
    theme(themeStr: string): this;
    success(message: string, click: EventListenerOrEventListenerObject): this;
    error(message: string, click: EventListenerOrEventListenerObject): this;
    cancelBtn(label: string): this;
    okBtn(label: string): this;
    delay(time: number): this;
    placeholder(str: string): this;
    defaultValue(str: string): this;
    maxLogItems(num: number): this;
    closeLogOnClick(bool: boolean): this;
    logPosition(str: string): this;
    setLogTemplate(templateMethod: Function): this;
    clearLogs(): this;
    /**
     * Build the proper message box
     *
     * @param  {Object} item    Current object in the queue
     *
     * @return {String}         An HTML string of the message box
     */
    protected _build(item: IAlertifyItem): string;
    protected _setCloseLogOnClick(bool: boolean): void;
    /**
     * Close the log messages
     *
     * @param  {Object} elem    HTML Element of log message to close
     * @param  {Number} wait    [optional] Time (in ms) to wait before automatically hiding the message, if 0 never hide
     *
     * @return {undefined}
     */
    protected _close(elem: HTMLElement, wait?: number): void;
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
    protected _dialog(message: string, type: string, onOkay: Function, onCancel: Function): void | Promise<object>;
    /**
     * Show a new log message box
     *
     * @param  {String} message    The message passed from the callee
     * @param  {String} type       [Optional] Optional type of log message
     * @param  {Number} wait       [Optional] Time (in ms) to wait before auto-hiding the log
     *
     * @return {Object}
     */
    protected _log(message: string, type: string, click: EventListenerOrEventListenerObject): void;
    protected _setLogPosition(str: string): void;
    protected _setupLogContainer(): Element;
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
    protected _notify(message: string, type: string, click: EventListenerOrEventListenerObject): void;
    /**
     * Initiate all the required pieces for the dialog box
     *
     * @return {undefined}
     */
    protected _setup(item: IAlertifyItem): Promise<object> | void;
    protected _okBtn(label: string): this;
    protected _setDelay(time?: number): this;
    protected _cancelBtn(str: string): this;
    protected _setMaxLogItems(num?: number): void;
    protected _theme(themeStr: string): void;
    protected _reset(): void;
    protected _injectCSS(): void;
    protected removeCSS(): void;
    private _hideElement;
    private _setupHandlers;
}
export declare const alertify: Alertify;
export {};
