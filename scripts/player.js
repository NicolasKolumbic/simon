var Player = (function(){

    function Player() {
        this.name = '';
        this.nivel = 1;
        this.points = 0;
        this.sequence = null;
        init.call(this);
    }

    function init() {
        this.sequence = new Sequence();
    }

    Player.prototype.addSequenceValue = function(buttonId) {
        this.sequence.add(buttonId);
    }

    Player.prototype.addPoints = function(points) {
        this.points += points;
    }

    Player.prototype.resetPoints = function() {
        this.points = 0;
    }

    return Player;

})();