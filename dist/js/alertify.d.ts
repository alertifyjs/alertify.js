interface IAlertifyItem {
    type: DialogTypes;
    message: string;
    onOkay?: Function;
    onCancel?: Function;
}
interface IAlertifyDialogResult {
    buttonClicked: string;
    inputValue?: string;
    event: Event;
}
export declare enum LogTypes {
    default = "default",
    success = "success",
    error = "error"
}
export declare enum DialogTypes {
    alert = "alert",
    confirm = "confirm",
    prompt = "prompt"
}
/**
 * Alertify private object
 * @type {Object}
 */
export declare class Alertify {
    static transitionFallbackDuration: number;
    static defaultDelay: number;
    static defaultMaxLogItems: number;
    static defaultOkLabel: string;
    static defaultCancelLabel: string;
    static defaultCloseLogOnClick: boolean;
    static defaultLogContainerClass: string;
    static defaultDialogs: {
        buttons: {
            holder: string;
            ok: string;
            cancel: string;
        };
        input: string;
        message: string;
        log: string;
    };
    protected parent: HTMLElement;
    protected version: string;
    protected okLabel: string;
    protected cancelLabel: string;
    protected maxLogItems: number;
    protected promptValue: string;
    protected promptPlaceholder: string;
    protected closeLogOnClick: boolean;
    protected delay: number;
    protected logContainerClass: string;
    protected logTemplateMethod: ((message: HTMLElement | string) => HTMLElement | string) | null;
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
    constructor();
    setParent(elem: HTMLElement): this;
    reset(): this;
    log(message: HTMLElement | string, click?: EventListenerOrEventListenerObject): this;
    success(message: HTMLElement | string, click?: EventListenerOrEventListenerObject): this;
    error(message: HTMLElement | string, click?: EventListenerOrEventListenerObject): this;
    setDelay(time: number): this;
    setMaxLogItems(num: number): this;
    setCloseLogOnClick(bool: boolean): this;
    setLogPosition(str: string): this;
    setLogTemplate(templateMethod: ((message: HTMLElement | string) => HTMLElement | string) | null): this;
    clearLogs(): this;
    /**
     * Close the log messages
     *
     * @param  {Object} elem    HTML Element of log message to close
     * @param  {Number} wait    [optional] Time (in ms) to wait before automatically hiding the message, if 0 never hide
     *
     * @return {undefined}
     */
    close(elem: HTMLElement, wait?: number): void;
    alert(message: string, onOkay?: Function, onCancel?: Function): Promise<IAlertifyDialogResult | void>;
    confirm(message: string, onOkay?: Function, onCancel?: Function): Promise<IAlertifyDialogResult | void>;
    prompt(message: string, onOkay?: Function, onCancel?: Function): Promise<IAlertifyDialogResult | void>;
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
    dialog(message: string, type: DialogTypes, onOkay?: Function, onCancel?: Function): Promise<IAlertifyDialogResult | void>;
    cancelBtn(label: string): this;
    okBtn(label: string): this;
    placeholder(str: string): this;
    defaultValue(str: string): this;
    /**
     * Show a new log message box
     *
     * @param  {String} message    The message passed from the callee
     * @param  {String} type       [Optional] Optional type of log message
     * @param  {Number} wait       [Optional] Time (in ms) to wait before auto-hiding the log
     *
     * @return {Object}
     */
    protected prepareNotify(message: HTMLElement | string, type?: LogTypes, click?: EventListenerOrEventListenerObject): void;
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
    protected showNotify(message: HTMLElement | string, type?: LogTypes, click?: EventListenerOrEventListenerObject): void;
    protected setupLogContainer(): Element;
    /**
     * Build the proper message box
     *
     * @param  {Object} item    Current object in the queue
     *
     * @return {String}         An HTML string of the message box
     */
    protected buildDialog(item: IAlertifyItem): string;
    /**
     * Initiate all the required pieces for the dialog box
     *
     * @return {undefined}
     */
    protected setupDialog(item: IAlertifyItem): Promise<IAlertifyDialogResult | void>;
    protected injectCSS(): void;
    protected removeCSS(): void;
    private hideElement;
    private setupHandlers;
}
export declare const alertify: Alertify;
export {};
