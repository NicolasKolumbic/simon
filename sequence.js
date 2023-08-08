var Sequence = (function(){

    function Sequence() {
        this.buttonList = [];
        this._iterator = null;

        Object.defineProperty(Sequence.prototype, "count", {
            get: function () {return this.buttonList.length;},
            enumerable: false,
            configurable: true
        });

        Object.defineProperty(Sequence.prototype, "last", {
            get: function () {return this.buttonList.lastValue;},
            enumerable: false,
            configurable: true
        });

        Object.defineProperty(Sequence.prototype, "iterator", {
            get: function () {return getIterator.call(this)},
            enumerable: false,
            configurable: true
        });
    }

    function getIterator() {
        this._iterator = this._iterator ? this._iterator : new Iterator(this.buttonList);
        return this._iterator;
    }

    Sequence.prototype.add = function(buttonId) {
        this.buttonList.push(buttonId);
    };

    Sequence.prototype.isInvalid = function(buttonId, index) {
        return this.buttonList[index] !== buttonId; 
    }

    return Sequence;

})();