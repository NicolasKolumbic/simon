var Iterator = (function(){

    var index = 0;

    function Iterator(items) {
        index = 0; 
        this.items = items
    }

    Iterator.prototype.next = function() {
        var item =  {
            done: index === this.items.length,
            value: this.items[index] 
        }
        index++;
        return item;
    }

    return Iterator;
})();