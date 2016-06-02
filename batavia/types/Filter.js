
/*************************************************************************
 * A Python filter builtin is a type
 *************************************************************************/

batavia.types.filter = function() {
    function filter(args, kwargs) {
        Object.call(this);
        if (args.length < 2) {
            throw new batavia.builtins.TypeError("filter expected 2 arguments, got " + args.length);
        }
        this._func = args[0];
        this._sequence = args[1];
    }

    filter.prototype.__next__ = function() {
        if (typeof(this._func) !== "function") {
            throw new batavia.builtins.TypeError(
              batavia.builtins.type(this._func).__name__ + "' object is not callable");
        }
        return this._func(this._sequence.__next__())
    }

    filter.prototype.__str__ = function() {
        return "<filter object at 0x99999999";
    }

};

