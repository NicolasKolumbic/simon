 var match = (function() {

    var _sequence = null;
    var _player = null;
    var _rankingModal = null;
    var _contactModal = null;
    var _userNameForm = null;
    var _contactForm = null;
    var _pointByNivel = 10;
    var _match = {
        addSequenceValue: validate
    };

    function nextLevel() {
        userMessages.hide(userMessages.nextLevel);
        _player.nivel++;
        _player.sequence = new Sequence();
        board.set('nivel', _player.nivel);
        timer.nivel(_player.nivel);
        newLevel();
    }

    function restart() {
        userMessages.hide(userMessages.gameOver);
        _player.nivel = 1;
        _player.resetPoints();
        timer.nivel(_player.nivel);
        board.set('nivel', _player.nivel);
        board.set('points', 0);
        _player.sequence = new Sequence();
        newLevel();
    }

    function play() {
        userMessages.hide(userMessages.userForm);
        gameConsole.initialized();
        newLevel();
    }

    function save() {
        var match = {
            userName: _player.name,
            nivel: _player.nivel,
            points: _player.points,
            date: new Date().getTime()
        };

        var scores = localStorage.getItem('simon-score');
        if(scores) {
            scores = JSON.parse(scores);
        } else {
            scores = [];
        }
        scores.push(match);
        localStorage.setItem('simon-score', JSON.stringify(scores));
    }

    function newLevel() {
        var counter = _player.nivel;
        _sequence = new Sequence();

        while(counter--) {
            const buttonId = gameConsole.getRandomButton();
            _sequence.add(buttonId);
        }

        gameConsole.execute(_sequence);  
    }

    function validate(buttonId) {     
        var currentIndex = _player.sequence.count - 1;
        var DELAY = 700;

        if(_sequence.isInvalid(buttonId, currentIndex)) {
            gameConsole.block();
            timer.cancel();
            userMessages.hide(userMessages.congratulation);
            userMessages.show(userMessages.gameOver, DELAY);
            save();
        } else if(_sequence.count === _player.sequence.count) {
                timer.cancel();          
                gameConsole.block();
                userMessages.hide(userMessages.congratulation);
                userMessages.show(userMessages.nextLevel, DELAY);
                _player.addPoints(_pointByNivel);
                board.set('points', _player.points);
        } else {
                if(userMessages.isVisible(userMessages.congratulation)) {
                    userMessages.pulse(userMessages.congratulation);
                } else {
                    userMessages.show(userMessages.congratulation);
                }
                _player.addPoints(_pointByNivel);
                board.set('points', _player.points);
        }  
       
          
    }

    function executionFinishHandler() {
        timer.start();
    }

    function finishedTime(state) {
        if(state === 'finish'){
            userMessages.show(userMessages.gameOver, 700);
            gameConsole.block();
        }
    }

    function userNameFormSubmitHandler(form) {
        _player.name = form.elements.userName.value;
       board.set('username', _player.name );
       play();
    }

    function contactSubmitHandler(form) {
        var message = 'mailto:'+ form.elements.email.value +'?subject=Contacto de ' + form.elements.name.value + '&body='+form.elements.message.value;
        location.href= message;
    }

    function init() {
        _userNameForm = new Form({
            submitHandler: userNameFormSubmitHandler,
            id: 'user-form'
        });
        _contactForm = new Form({
            submitHandler: contactSubmitHandler,
            id: 'contact-form'
        });

        _contactModal = new Modal({
            id: 'contact-form-modal',
            beforeOpenHandler: function() {
                if(timer.isRunning()) {
                    timer.pause();
                }
            },
            afterCloseHandler: function() {
                if(timer.isPaused()) {
                    timer.play();
                }
                _contactForm.reset();
            }
        });

        _rankingModal = new Modal({
            id: 'ranking-modal',
            beforeOpenHandler: function() {
                if(timer.isRunning()) {
                    timer.pause();
                }
                ranking.generateHtml('date');
            },
            afterCloseHandler: function() {
                if(timer.isPaused()) {
                    timer.play();
                }
                ranking.removeTable();
            }
        });
        
        _player = new Player();
        timer.subscribe(finishedTime);

        gameConsole.subscribe(_player);
        gameConsole.subscribe(_match);
        gameConsole.executionFinish(executionFinishHandler);
        
        userMessages.nextLevel.addEventListener('click', nextLevel);
        userMessages.restartButtons.forEach(function(btn){
            btn.addEventListener('click', restart);
        })
    }

    return {init: init};

})();