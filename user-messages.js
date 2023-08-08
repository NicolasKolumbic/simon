var userMessages = (function(){
    var _frames = { transform: ['scale(0)','scale(1.1)','scale(1)']};
    var _pulseFrames = { transform: ['scale(1)','scale(1.1)','scale(1)']};

    var _setting = {
        duration: 700,
        fill: "forwards",
        easing: "ease-out"
    };

    function isVisible(element) {
        return getComputedStyle(element).display === 'block';
    }

    function show(element, delay) {
        if(!isVisible(element)) {
            var _delay = delay || 0;
            element.classList.add('in');
            element.animate(_frames, Object.assign({}, _setting, {delay: _delay}));
        }  
    }

    function hide(element, delay) {
        if(isVisible(element)) {
            var _delay = delay || 0;
        
            var animation = element.animate(_frames, Object.assign({}, _setting, {delay: _delay, direction: 'reverse'}));

            animation.addEventListener('finish', function() {
                element.classList.remove('in');
            });
        }
        
    }

    function pulse(element, delay) {
        if(isVisible(element)) {
            var _delay = delay || 0;

            element.animate(_pulseFrames, Object.assign({}, _setting, {delay: _delay}));
        }
    }

    return {
        hide: hide,
        show: show,
        pulse: pulse,
        isVisible: isVisible,
        gameOver : document.querySelector('.game-over'),
        userForm : document.querySelector('.user-form'),
        congratulation : document.querySelector('.congratulation'),
        startButton : document.querySelector('.btn-start'),
        nextLevel : document.querySelector('.next-level'),
        restartButtons : document.querySelectorAll('.btn-restart'),
    }

})();