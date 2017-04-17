/*
 * Event v1.0.0
 * (c) 2017 luoye <luoyefe@gmail.com>
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Event = factory());
}(this, (function () { 'use strict';

var EventBus = (function () {
    function EventBus() {
        this.cache = {};
    }
    EventBus.prototype.on = function (key, func) {
        (this.cache[key] || (this.cache[key] = [])).push(func);
    };
    EventBus.prototype.once = function (key, func) {
        function on() {
            this.off(key, on);
            func.apply(this, arguments);
        }
        this.on.call(this, key, on);
    };
    EventBus.prototype.off = function (key) {
        this.cache[key] = null;
    };
    EventBus.prototype.emit = function (key) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var stack = this.cache[key];
        if (stack && stack.length > 0) {
            stack.forEach(function (item) { return item.apply(_this, args); });
        }
    };
    return EventBus;
}());

return EventBus;

})));
