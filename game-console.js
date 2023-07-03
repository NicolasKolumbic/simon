var GameConsole = (function(){

    var greenButton = document.querySelector('#green');
    var redButton = document.querySelector('#red');
    var blueButton = document.querySelector('#blue');
    var yellowButton = document.querySelector('#yellow');
    var clickHandler;
    
    function GameConsole() {
        this.max = 4;
        this.buttons = []
        this.sequence = null;
        this.iterator = null;
        init.call(this);
    }

    function trigger(button) {
        const animation = button.animate({ opacity: [0, 1, 0] }, {
            duration: 1000,
            pseudoElement: '::after'
        });

        animation.addEventListener('finish', run.bind(this))
    }

    function notify(event) {
        const button = event.target;
        this.sequence.isValid(button);
    }

    function run() {
        let currentButton = this.iterator.next();

        if(!currentButton.done) {
            trigger.call(this, currentButton.value);
        } else {
            unblock.call(this);
        }
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function block() {
        document.querySelector('.console-container').classList.add('blocked');
        var _this = this;
        this.buttons.forEach(function (btn) {
            btn.setAttribute('disabled', true);
            btn.removeEventListener('click', clickHandler);
        });
    }

    function unblock() {
        document.querySelector('.console-container').classList.remove('blocked');
        this.buttons.forEach(function(btn) {
            btn.removeAttribute('disabled');
            btn.addEventListener('click', clickHandler);
        });
    }

    function init () {
        this.dateGame = new Date().toDateString();
        clickHandler = notify.bind(this);
 
        this.buttons.push(greenButton);
        this.buttons.push(redButton);
        this.buttons.push(blueButton);
        this.buttons.push(yellowButton);
    }

    GameConsole.prototype.getRandomButton = function() {
        var index = getRandomInt(this.max);
        return this.buttons[index];
    }

    GameConsole.prototype.execute = function(sequence) {
        this.sequence = sequence;
        this.iterator = sequence.getIterator();

        run.call(this);
    }

    GameConsole.prototype.block = block;

    GameConsole.prototype.unblock = unblock;

    return GameConsole;
})();

