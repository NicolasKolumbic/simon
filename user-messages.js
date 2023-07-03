var UserMessage = (function(){
    var frames = { transform: ['scale(0)','scale(1.1)','scale(1)'] };

    var setting = {
        duration: 700,
        fill: "forwards",
        easing: "ease-out"
    };

    function UserMessage() {
        this.gameOver = document.querySelector('.game-over');
        this.congratulation = document.querySelector('.congratulation');
        this.startButton = document.querySelector('.btn-start');
        this.nextLevel = document.querySelector('.next-level');
        this.restart = document.querySelector('.btn-restart');
    }

    UserMessage.prototype.show = function(element, delay) {
        var _delay = delay || 0;
        element.animate(frames, Object.assign({}, setting, {delay: _delay}));
    }

    UserMessage.prototype.hide = function(element, delay) {
        var _delay = delay || 0;
        element.animate(frames, Object.assign({}, setting, {delay: _delay, direction: 'reverse'}));
    }

    return UserMessage;

})();