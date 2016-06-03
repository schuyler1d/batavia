
/*************************************************************************
 * A Python map builtin is a type
 *************************************************************************/

batavia.types.map = function() {
    function map(args, kwargs) {
        Object.call(this);
        if (args.length < 2) {
            throw new batavia.builtins.TypeError("map expected 2 arguments, got " + args.length);
        }
        this._func = args[0];
        this._sequence = args[1];
    }

    map.prototype = Object.create(Object.prototype);

    map.prototype.constructor = map;

    /**************************************************
     * Javascript compatibility methods
     **************************************************/

    map.prototype.toString = function() {
        return this.__str__();
    };
  
    /**************************************************
     * Type conversions
     **************************************************/

    map.prototype.__iter__ = function() {
        return this;
    }
  
    map.prototype.__next__ = function() {
        var DEBUG = false;
        if (!this._iter) {
            if (DEBUG) console.log('map._next iter()');            
            this._iter = batavia.builtins.iter([this._sequence], null);
        }
        if (!batavia.builtins.callable([this._func], null)) {
            throw new batavia.builtins.TypeError(
              batavia.type_name(this._func) + "' object is not callable");
        }
        if (DEBUG) console.log('map._next sval');
        var sval = batavia.run_callable(this._iter, this._iter.__next__, [], null);
        if (DEBUG) console.log('map._next func(sval)');
        return batavia.run_callable(false, this._func, [sval], null);
    }

    map.prototype.__str__ = function() {
        return "<map object at 0x99999999>";
    }
  
    /**************************************************/

    return map;
}();
