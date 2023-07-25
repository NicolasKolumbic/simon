var Sequence = (function(){

    function Sequence() {
        this.buttonList = [];
        this._iterator = null;

        Object.defineProperty(this, "count", {
            get: function () {return this.buttonList.length;}
        });

        Object.defineProperty(this, "last", {
            get: function () {return this.buttonList.lastValue;}
        });

        Object.defineProperty(this, "iterator", {
            get: function () {return getIterator.call(this)}
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