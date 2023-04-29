export default class UserMessage {

    #frames = { transform: ['scale(0)','scale(1.1)','scale(1)'] };

    #setting = {
        duration: 700,
        fill: "forwards",
        easing: "ease-out"
    };

    constructor() {
        this.gameOver = document.querySelector('.game-over');
        this.congratulation = document.querySelector('.congratulation');
        this.startButton = document.querySelector('.btn-start');
        this.nextLevel = document.querySelector('.next-level');
    }

    show(element, delay = 0) {
        element.animate(this.#frames, {...this.#setting, delay});
    }

    hide(element, delay = 0) {
        element.animate(this.#frames, {...this.#setting, direction: 'reverse', delay});
    }
}