var Iterator = (function(){

    function Iterator(items) {
        this.index = 0; 
        this.items = items || [];
    }

    Iterator.prototype.add = function(item) {
        this.items.push(item)
    }

    Iterator.prototype.next = function() {
        var item =  {
            done: this.index === this.items.length,
            value: this.items[this.index] 
        }
        this.index++;
        return item;
    }

    Iterator.prototype.reset = function() {
        this.index = 0;
    }

    return Iterator;
})();