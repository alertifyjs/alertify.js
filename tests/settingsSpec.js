/* eslint-env karma, jasmine */
/* eslint strict: [2, "global"] */
"use strict";

describe("settings unit tests", function() {

    var alertify = new window.alertify.Alertify();
    var Alertify = window.alertify.Alertify;

    beforeEach(function() {
        alertify.reset();
    });

    it("should set a version number", function() {
        expect(typeof alertify.version).toBe("string");
        expect(alertify.version).toEqual(alertify.version);
    });

    it("should set default maxLogItems", function() {
        expect(alertify.maxLogItems).toBe(2);
    });

    it("should set default maxLogItems", function() {
        alertify.setMaxLogItems(10);
        expect(alertify.maxLogItems).toBe(10);
    });

    it("should set empty default input prompt value", function() {
        expect(alertify.promptValue).toBe("");
    });

    it("should set input prompt value", function() {
        alertify.defaultValue("alertify rocks");
        expect(alertify.promptValue).toBe("alertify rocks");
    });

    it("should set empty default input placeholder value", function() {
        expect(alertify.promptPlaceholder).toBe("");
    });

    it("should set input prompt value", function() {
        alertify.placeholder("alertify rocks");
        expect(alertify.promptPlaceholder).toBe("alertify rocks");
    });

    it("should set close on click to be false by default", function() {
        expect(alertify.closeLogOnClick).toBe(false);
    });

    it("should set close on click to be true", function() {
        alertify.setCloseLogOnClick(true);
        expect(alertify.closeLogOnClick).toBe(true);
    });

    it("should set close on click to be false", function() {
        alertify.setCloseLogOnClick(false);
        expect(alertify.closeLogOnClick).toBe(false);
    });

    it("should set default ok btn", function() {
        expect(alertify.okLabel).toBe("Ok");
    });

    it("should set ok btn text", function() {
        alertify.okBtn("Yes");
        expect(alertify.okLabel).toBe("Yes");
    });

    it("should set default cancel btn", function() {
        expect(alertify.cancelLabel).toBe("Cancel");
    });

    it("should set cancel btn text", function() {
        alertify.cancelBtn("No");
        expect(alertify.cancelLabel).toBe("No");
    });

    it("should set the default delay to 5000", function() {
        expect(alertify.delay).toBe(5000);
    });

    it("should set delay option", function() {
        alertify.setDelay(1000);
        expect(alertify.delay).toBe(1000);
    });

    it("should reset all options when reset called", function() {
        alertify.setDelay(1000);
        alertify.cancelBtn("No");
        alertify.okBtn("Yes");
        alertify.setCloseLogOnClick(true);
        alertify.defaultValue("alertify rocks");
        alertify.placeholder("alertify rocks");
        alertify.setMaxLogItems(10);
        alertify.reset();
        expect(alertify.delay).toBe(5000);
        expect(alertify.cancelLabel).toBe("Cancel");
        expect(alertify.okLabel).toBe("Ok");
        expect(alertify.closeLogOnClick).toBe(false);
        expect(alertify.promptValue).toBe("");
        expect(alertify.promptPlaceholder).toBe("");
        expect(alertify.maxLogItems).toBe(2);
    });

    it("should inject CSS by default, only once", function() {
        expect(!!document.querySelector("#alertifyCSS")).toBe(true);
    });

    it("should remove CSS", function() {
        alertify.removeCSS();
        expect(!!document.querySelector("#alertifyCSS")).toBe(false);
    });

    it("should not inject CSS if element already exists", function() {
        alertify.removeCSS();

        var fakeCSS = document.createElement("fake");
        fakeCSS.id = "alertifyCSS";
        document.body.appendChild(fakeCSS);

        alertify.injectCSS();
        expect(document.querySelector("#alertifyCSS").tagName).toBe("FAKE");
    });

    it("should change the delay", function() {
        var newDelay;
        newDelay = 100;
        alertify.setDelay(newDelay);
        expect(alertify.delay).toBe(newDelay);

        // should be transform to integer
        alertify.setDelay("200");
        expect(alertify.delay).toBe(200);
        
        // should be reset to the default delay
        alertify.setDelay("a");
        expect(alertify.delay).not.toBe(undefined);
        expect(alertify.delay).toBe(Alertify.defaultDelay);
    });
});
