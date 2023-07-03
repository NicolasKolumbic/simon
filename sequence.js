var Sequence = (function(){

    function Sequence(userMessages, gameConsole) {
        this.buttonList = [];
        this.userButtonList = [];
        this.userMessages = userMessages;
        this.console = gameConsole;
    }

    Sequence.prototype.add = function(button) {
        this.buttonList.push(button);
    };

    Sequence.prototype.getIterator = function() {
        return new Iterator(this.buttonList);
    }

    Sequence.prototype.isValid = function(userButton) {
        this.userButtonList.push(userButton);
        const step = this.userButtonList.length - 1;
        const button = this.buttonList[step];

        if(button.id !== userButton.id) {
            this.userMessages.hide(this.userMessages.congratulation);
            this.userMessages.show(this.userMessages.gameOver, 700);
            this.console.block();
        } else {
            if(this.userButtonList.length === this.buttonList.length) {
                this.userMessages.hide(this.userMessages.congratulation);
                this.userMessages.show(this.userMessages.nextLevel, 700);
                this.console.block();
            } else {
                this.userMessages.show(this.userMessages.congratulation);
            }
        }
    }

    return Sequence;

})();