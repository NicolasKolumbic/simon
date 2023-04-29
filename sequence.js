export default class Sequence {
    #buttonList = [];
    #userButtonList = [];
    #userMessages = null;
    #console = null;

    constructor(userMessages, gameConsole) {
        this.#userMessages = userMessages;
        this.#console = gameConsole;
    }

    get iterator() {
        return this.#buttonList[Symbol.iterator]();
    }

    add(button) {
        this.#buttonList.push(button);
    }

    isValid(userButton) {
        this.#userButtonList.push(userButton);
        const step = this.#userButtonList.length - 1;
        const button = this.#buttonList[step];

        if(button.id !== userButton.id) {
            this.#userMessages.hide(this.#userMessages.congratulation);
            this.#userMessages.show(this.#userMessages.gameOver, 700);
            this.#console.block();
        } else {
            if(this.#userButtonList.length === this.#buttonList.length) {
                this.#userMessages.hide(this.#userMessages.congratulation);
                this.#userMessages.show(this.#userMessages.nextLevel, 700);
                this.#console.block();
            } else {
                this.#userMessages.show(this.#userMessages.congratulation);
            }
        }
    }
}