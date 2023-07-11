var UserMessages = (function(){
    var _frames = { transform: ['scale(0)','scale(1.1)','scale(1)']};

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

    return {
        hide: hide,
        show: show,
        gameOver : document.querySelector('.game-over'),
        congratulation : document.querySelector('.congratulation'),
        startButton : document.querySelector('.btn-start'),
        nextLevel : document.querySelector('.next-level'),
        restart : document.querySelector('.btn-restart'),
    };

})();