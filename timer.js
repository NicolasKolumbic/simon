var Timer = (function(){
    var animation = null
    var timer = document.querySelector('.timer');
    var endHandler = null;
    var _nivel = 1;
    var reductionFactor = 0.98;
    var duration = 12000;

    function calcDuration() {   
        duration = duration * Math.pow(reductionFactor, _nivel - 1);
        return parseInt(duration)
    }
     

    function finishHandler() {
        endHandler("finish");
    }

    function cancelHandler() {
        endHandler("cancel");
    }

    function start() {
        var duration = calcDuration();
        
       animation = timer.animate({ width: [0, '170px'] }, {duration: duration,  pseudoElement: '::before'})

       animation.addEventListener('finish', finishHandler)
       animation.addEventListener('cancel', cancelHandler)
    }

    function cancel() {
        animation.cancel();
    }

    function pause() {
        animation.pause();
    }

    function play() {
        animation.play();
    }

    function setNivel(nivel) {
        _nivel = nivel
    }

    return {
        start: start,
        cancel: cancel,
        pause: pause,
        play: play,
        nivel: setNivel,
        subscribe: function(handler) {
            endHandler = handler
        }
    }
})()