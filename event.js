var Event = (function() {
    var glbal = this;
    var _default = 'default';

    var Event = function() {
        var _slice = Array.prototype.slice;
        var _shift = Array.prototype.shift;
        var _unshift = Array.prototype.unshift;
        var namespaceCache = {};
        var each = function(arr, fn) {
            var ret;
            for (var i = 0; i < arr.length; i++) {
                var n = arr[i];
                ret = fn.call(n, i, n)
            }
            return ret;
        };
        var _on = function(key, fn, cache) {
            if (!cache[key]) {
                cache[key] = [];
            }
            cache[key].push(fn);
        };
        var _off = function(key, cache, fn) {
            if (cache[key]) {
                if (fn) {
                    for (var i = cache[key].length; i >= 0; i--) {
                        if (cache[key] === fn) {
                            cache[key].splice(i, 1);
                        }
                    }
                } else {
                    cache[key] = [];
                }
            }
        };
        var _trigger = function() {
            var cache = _shift.call(arguments);
            var key = _shift.call(arguments);
            var args = arguments;
            var _self = this;
            var stack = cache[key];

            if (!stack || !stack.length) {
                return;
            }

            return each(stack, function() {
                return this.apply(_self, args);
            })
        };
        var _create = function(namespace) {
            var namespace = namespace || _default;
            var cache = {};
            var offineStack = [];
            var ret = {
                on: function(key, fn, last) {
                    _on(key, fn, cache);
                    if (offineStack === null) {
                        return;
                    }
                    if (last === 'last') {
                        offineStack.length && offineStack.pop()();
                    } else {
                        each(offineStack, function() {
                            this();
                        })
                    }
                    offineStack = null;
                },
                one: function(key, fn, last) {
                    _off(key, cache);
                    // console.log(cache);
                    this.on(key, fn, last);
                },
                off: function(key, fn) {
                    _off(key, cache, fn);
                },
                trigger: function() {
                    var _self = this;
                    _unshift.call(arguments, cache);
                    var args = arguments;
                    var fn = function() {
                        return _trigger.apply(_self, args);
                    }
                    if (offineStack) {
                        return offineStack.push(fn);
                    }
                    return fn();
                }
            };
            return namespace ? (namespaceCache[namespace] ? namespaceCache[namespace] : namespaceCache[namespace] = ret) : ret;
        };
        return {
            create: _create,
            one: function(key, fn, last) {
                var event = this.create();
                event.one(key, fn, last);
            },
            off: function(key, fn) {
                var event = this.create();
                event.off(key, fn);
            },
            on: function(key, fn, last) {
                var event = this.create();
                event.on(key, fn, last);
            },
            trigger: function() {
                var event = this.create();
                event.trigger.apply(this, arguments);
            }
        };
    }();
    return Event;
})();
