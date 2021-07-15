/* eslint-env karma, jasmine */
/* eslint strict: [2, "global"] */
/* global require */
"use strict";

describe("commonjs test suite", function() {

    // todo: return origin var Alertify = require("alertify");
    var Alertify = alertifyjs.Alertify;
    var alertify = new alertifyjs.Alertify();

    it("should be a function", function() {
        expect(typeof Alertify).toBe("function");
    });

    [ new Alertify() ].forEach(function(alertify) {
        it("should define the public methods", function() {
            expect(typeof alertify.reset).toBe("function");
            expect(typeof alertify.alert).toBe("function");
            expect(typeof alertify.confirm).toBe("function");
            expect(typeof alertify.prompt).toBe("function");
            expect(typeof alertify.log).toBe("function");
            expect(typeof alertify.success).toBe("function");
            expect(typeof alertify.error).toBe("function");
            expect(typeof alertify.cancelBtn).toBe("function");
            expect(typeof alertify.okBtn).toBe("function");
            expect(typeof alertify.setDelay).toBe("function");
            expect(typeof alertify.placeholder).toBe("function");
            expect(typeof alertify.defaultValue).toBe("function");
            expect(typeof alertify.setMaxLogItems).toBe("function");
            expect(typeof alertify.setCloseLogOnClick).toBe("function");
        });
    });

    it("should be different instances", function() {
        var alertify2 = new Alertify();
        alertify2.defaultValue("foo");
        expect(alertify2).not.toEqual(alertify);
    });

    it("should default to document.body as parent element", function() {
        expect(alertify.parent === document.body).toBe(true);
    });

    it("should allow parent element to be updated", function() {
        var newElem = document.createElement("div");
        alertify.setParent(newElem);
        expect(alertify.parent === newElem).toBe(true);
    });

    it("should reset the parent element", function() {
        var newElem = document.createElement("div");
        alertify.setParent(newElem);
        alertify.reset();
        expect(alertify.parent === document.body).toBe(true);
    });

});
