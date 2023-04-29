export default class GameConsole {
    
    #max = 4;
    #buttons = []
    #sequence = null;
    #iterator = null;
    #notifyHandler = null;
    
    #green = document.querySelector('.green');
    #red = document.querySelector('.red');
    #blue = document.querySelector('.blue');
    #yellow = document.querySelector('.yellow');


    constructor() {
       this.dateGame = new Date().toDateString();
       this.#notifyHandler = this.#notify.bind(this);

       this.#buttons.push(this.#green);
       this.#buttons.push(this.#red);
       this.#buttons.push(this.#blue);
       this.#buttons.push(this.#yellow);
    }

    #trigger(button) {
        const animation = button.animate({ opacity: [0, 1, 0] }, {
            duration: 1000,
            pseudoElement: '::after'
        });

        animation.addEventListener('finish', this.#run.bind(this))
    }

    #notify(event) {
        const button = event.target;
        this.#sequence.isValid(button);
    }

    #run() {
        let currentButton = this.#iterator.next();

        if(!currentButton.done) {
            this.#trigger(currentButton.value);
        } else {
            this.unblock();
        }
    }

    getRandomButton() {
        const index = this.#getRandomInt(this.#max);
        return this.#buttons[index];
    }

    execute(sequence) {

        this.#sequence = sequence;
        this.#iterator = sequence.iterator;

        this.#run();
    }

    block() {
        document.querySelector('.console-wrapper').classList.add('blocked');
        this.#buttons.forEach((btn) => {
            btn.setAttribute('disabled', true);
            btn.removeEventListener('click', this.#notifyHandler);
        });
    }

    unblock() {
        document.querySelector('.console-wrapper').classList.remove('blocked');
        this.#buttons.forEach((btn) => {
            btn.removeAttribute('disabled');
            btn.addEventListener('click', this.#notifyHandler);
        });
    }

    #getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

}

