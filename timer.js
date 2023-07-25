var timer = (function(){
    var animation = null
    var timer = document.querySelector('.timer');
    var endHandler = null;
    var _nivel = 1;
    var reductionFactor = 0.98;
    var duration = 12000;

    function _calcDuration() {   
        duration = duration * Math.pow(reductionFactor, _nivel - 1);
        return parseInt(duration)
    }
     
    function _finishHandler() {
        endHandler("finish");
    }

    function _cancelHandler() {
        endHandler("cancel");
    }

    function _start() {
        var duration = _calcDuration();
        
       animation = timer.animate({ width: [0, '170px'] }, {duration: duration,  pseudoElement: '::before'})

       animation.addEventListener('finish', _finishHandler)
       animation.addEventListener('cancel', _cancelHandler)
    }

    function _cancel() {
        animation.cancel();
    }

    function _pause() {
        if(animation){
            animation.pause();
        }
    }

    function _play() {
        animation.play();
    }

    function _setNivel(nivel) {
        _nivel = nivel
    }

    function _isPaused() {
        return animation && animation.playState === 'paused';
    }

    function _isRunning() {

        return animation && animation.playState === 'running';
    }

    return {
        start: _start,
        cancel: _cancel,
        pause: _pause,
        play: _play,
        isPaused: _isPaused,
        isRunning: _isRunning,
        nivel: _setNivel,
        subscribe: function(handler) {
            endHandler = handler
        }
    }
})()