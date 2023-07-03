 var Match = (function() {

    function Match() {
        this.nivel = 1;
        this.console = null;
        this.userMessage = null;
        this.form = null;
        init.call(this);
    }

    function nextLevel() {
        this.userMessages.hide(this.userMessages.nextLevel);
        this.nivel++;
        newLevel.call(this);
    }

    function restart() {
        this.userMessages.hide(this.userMessages.gameOver);
        this.nivel = 1;
        newLevel.call(this);
    }

    function play() {
        this.userMessages.hide(this.userMessages.startButton);
        newLevel.call(this);
    }

    function newLevel() {
        let counter = this.nivel;
        const sequence = new Sequence(this.userMessages, this.console);

        while(counter--) {
            const button = this.console.getRandomButton();
            sequence.add(button);
        }

        this.console.execute(sequence);  
    }

    function init() {
        this.userMessages = new UserMessage();
        this.console = new GameConsole();
        this.form = new Form();
        this.userMessages.startButton.addEventListener('click', play.bind(this));
        this.userMessages.nextLevel.addEventListener('click', nextLevel.bind(this));
        this.userMessages.restart.addEventListener('click', restart.bind(this));
    }

    return Match
})();