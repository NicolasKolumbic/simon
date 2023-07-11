var Board = (function(){

    var _fields = {
        username: document.querySelector('.username'),
        nivel: document.querySelector('.nivel'),
        points: document.querySelector('.points')
    };

    function setValue(key, value) {
        _fields[key].textContent = value;
    }
    
    return {
        set: setValue
    };
})();