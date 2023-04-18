export class Match {

    #getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    constructor() {
        this.#nivel = 1;
        this.#max = 4;
        this.#startButton = document.querySelector('.start-btn');

        this.#startButton.addEventListener('click', () => {
            console.log('NICOLAS');
        })
    }
}