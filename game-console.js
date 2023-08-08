var gameConsole = (function(){

    var _randomNumberCount = 4;
    var _sequence = null;
    var _observersIterator = new Iterator();
    var _container = document.querySelector('.console-container');
    var _buttons = {
        green: document.querySelector('#green'),
        red: document.querySelector('#red'),
        blue: document.querySelector('#blue'),
        yellow: document.querySelector('#yellow'),
        toArray: function() {
            return [
                this.green,
                this.red,
                this.blue,
                this.yellow
            ]
        }
    };

    var _clickHandler = _notify;
    var _executionFinishHandler = null;

    function _trigger(buttonId) {
        const animation = _buttons[buttonId].animate({ opacity: [0, 1, 0] }, {
            duration: 1000,
            pseudoElement: '::after'
        });

        animation.addEventListener('finish', _run);
    }

    function _notify(event) {
        var buttonId = event.target.id;
        var observer = _observersIterator.next();
        
        while (!observer.done) {
            observer.value.addSequenceValue(buttonId);
            observer = _observersIterator.next();
        }

        _observersIterator.reset();
    }

    function _run() {
        var currentButton = _sequence.next();

        if(!currentButton.done) {
            _trigger(currentButton.value);
        } else {
            _unblock();
            _executionFinishHandler();
        }
    }

    function _getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function _block() {
        _container.classList.add('blocked');
        _buttons.toArray().forEach(function (btn) {
            btn.setAttribute('disabled', true);
            btn.removeEventListener('click', _clickHandler);
        });
    }

    function _unblock() {
        _container.classList.remove('blocked');
        _buttons.toArray().forEach(function(btn) {
            btn.removeAttribute('disabled');
            btn.addEventListener('click', _clickHandler);
        });
    }

    function _getRandomButton() {
        var index = _getRandomInt(_randomNumberCount);
        return _buttons.toArray()[index].id;
    }

    function _execute(sequence) {
        _sequence = sequence.iterator;
        setTimeout(_run, 1000);
    }

    function _executionFinish(executionFinishHandler) {
        _executionFinishHandler = executionFinishHandler;
    }

    function _subscribe(observer) {
        _observersIterator.add(observer);
    }

    function _initialized() {
        _container.classList.remove('initialized');
    }

    return {
        execute: _execute,
        block: _block,
        unblock: _unblock,
        executionFinish: _executionFinish,
        initialized: _initialized,
        subscribe: _subscribe,
        getRandomButton: _getRandomButton
    };
})();

