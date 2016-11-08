// Type definitions for Alertify.js v1.0.11
// Project: https://github.com/alertifyjs/alertify.js
// Definitions by: Vlad Jerca <https://github.com/vladjerca>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare var alertify: alertify.IAlertify;

declare namespace alertify {
    interface IAlertify {
         /**
         * Create an alert dialog box
         * @param message   The message passed from the callee
         * @param onOkay    Callback function
         * @param onCancel  Callback function
         * @return alertify (ie this)
         */
        alert(message: string, onOkay?: Function, onCancel?: Function): IAlertify;

        /**
         * Set the cancel button label
         * @param label     The label to use
         * @return alertify (ie this)
         */
        cancelBtn(label: string): IAlertify;

        /**
         * Clear any log notifications
         * @return alertify (ie this)
         */
        clearLogs(): IAlertify;

        /**
         * Set whether logs should close on click
         * @param bool      The value
         * @return alertify (ie this)
         */
        closeLogOnClick(bool: boolean): IAlertify;

        /**
         * Create a confirm dialog box
         * @param message   The message passed from the callee
         * @param onOkay    Callback function when OK is clicked
         * @param onCancel  Callback function when cancel is clicked
         * @return alertify (ie this)
         */
        confirm(message: string, onOkay?: Function, onCancel?: Function): IAlertify;

        /**
         * Set the default value for dialog input prompt
         * @param str       The new default value
         * @return alertify (ie this)
         */
        defaultValue(str: string): IAlertify;

        /**
         * Set the delay. Defaults to 5000 (5s).
         * @param time      Time (in ms) to wait before automatically hiding the message. If 0, never hide.
         * @return alertify (ie this)
         */
        delay(time: number | string): IAlertify;

        /**
         * Shorthand for log messages
         * @param message   The message passed from the callee
         * @param click     Click event listener
         * @return alertify (ie this)
         */
        error(message: string, click?: (this: this, ev: MouseEvent) => any): IAlertify;

        /**
         * Show a new log message box
         * @param message   The message passed from the callee
         * @param click     Click event listener
         * @return alertify (ie this)
         */
        log(message: string, click?: (this: this, ev: MouseEvent) => any): IAlertify;

        /**
         * Set the position of log notification. Defaults to "bottom left".
         * @param str       A string of one or more of "left", "right", "top", "bottom", separated by whitespace.
         * @return alertify (ie this)
         */
        logPosition(str: string): IAlertify;

        /**
         * Set the maximum number of log/success/error messages that will be displayed at a single time. The default is 2.
         * @param num       The maximum number of message to display.
         * @return alertify (ie this)
         */
        maxLogItems(num: number): IAlertify;

        /**
         * Set the OK button label
         * @param label     The label to use
         * @return alertify (ie this)
         */
        okBtn(label: string): IAlertify;

        /**
         * Set the parent element where Alertify is appended into the DOM. By default, Alertify is appended to document.body.
         * @param elem     The parent element.
         */
        parent(elem: HTMLElement): void;

        /**
         * Set the placeholder value for the prompt input
         * @param str       The placeholder string
         * @return alertify (ie this)
         */
        placeholder(str: string): IAlertify;

        /**
         * Create a prompt dialog box
         * @param message   The message passed from the callee
         * @param onOkay    Callback function when OK is clicked
         * @param onCancel  Callback function when cancel is clicked
         * @return alertify (ie this)
         */
        prompt(message: string, onOkay?: Function, onCancel?: Function): IAlertify;

        /**
         * Reset alertify settings
         * @return alertify (ie this)
         */
        reset(): IAlertify;

        /**
         * Shorthand for log messages
         * @param message   The message passed from the callee
         * @param click     Click event listener
         * @return alertify (ie this)
         */
        success(message: string, click?: (this: this, ev: MouseEvent) => any): IAlertify;

        /**
         * Set the log template method
         * @param templateMethod Template method
         * @return alertify      (ie this)
         */
        setLogTemplate(templateMethod: ((message: string) => string) | null): IAlertify;

        /**
         * Set the theme to use for dialogs
         * @return alertify      (ie this)
         */
        theme(themeStr: string): IAlertify;

        /**
         * The version of alertify
         */
        version: string;
    }
}

declare module "alertify" {
    export default alertify;
}
