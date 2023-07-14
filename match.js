 var Match = (function() {

    var _sequence = null;
    var _player = null;
    var _pointByNivel = 10;
    var _match = {
        addSequenceValue: validate
    }

    function nextLevel() {
        UserMessages.hide(UserMessages.nextLevel);
        _player.nivel++;
        _player.sequence = new Sequence();
        Board.set('nivel', _player.nivel);
        Timer.nivel(_player.nivel);
        newLevel();
    }

    function restart() {
        UserMessages.hide(UserMessages.gameOver);
        _player.nivel = 1;
        Timer.nivel(_player.nivel);
        Board.set('nivel', _player.nivel);
        _player.sequence = new Sequence();
        newLevel();
    }

    function play() {
        UserMessages.hide(UserMessages.startButton);
        newLevel();
    }

    function newLevel() {
        var counter = _player.nivel;
        _sequence = new Sequence();

        while(counter--) {
            const buttonId = GameConsole.getRandomButton();
            _sequence.add(buttonId);
        }

        GameConsole.execute(_sequence);  
    }

    function validate(buttonId) {     
        var currentIndex = _player.sequence.count - 1;

        if(_sequence.isInvalid(buttonId, currentIndex)) {
            UserMessages.hide(UserMessages.congratulation);
            UserMessages.show(UserMessages.gameOver, 700);
            GameConsole.block();
            Timer.cancel();
        } else {
            if(_sequence.count === _player.sequence.count) {
                Timer.cancel();          
                GameConsole.block();
                UserMessages.hide(UserMessages.congratulation);
                UserMessages.show(UserMessages.nextLevel, 700);
                _player.addPoints((_player.nivel * _pointByNivel));
                Board.set('points', _player.points);
            } else {
                if(UserMessages.isVisible(UserMessages.congratulation)) {
                    UserMessages.pulse(UserMessages.congratulation);
                } else {
                    UserMessages.show(UserMessages.congratulation);
                }
            }  
        }   
    }

    function executionFinishHandler() {
        Timer.start();
    }

    function finishedTime(state) {
        if(state === 'finish'){
            UserMessages.show(UserMessages.gameOver, 700);
            GameConsole.block();
        }
    }

    function init() {
        this.form = new Form();
        _player = new Player();
        Timer.subscribe(finishedTime);

        GameConsole.subscribe(_player);
        GameConsole.subscribe(_match);
        GameConsole.executionFinish(executionFinishHandler);
        
        UserMessages.startButton.addEventListener('click', play);
        UserMessages.nextLevel.addEventListener('click', nextLevel);
        UserMessages.restartButtons.forEach(function(btn){
            btn.addEventListener('click', restart);
        })
    }

    return {init: init};

})();