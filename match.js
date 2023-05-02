import GameConsole from "./game-console.js";
import Sequence from "./sequence.js";
import UserMessage from "./user-messages.js";
import Form from "./form.js";

export default class Match {

    #nivel = 3;
    
    #console = null;
    #userMessages = null;
    #form = null;

    constructor() {
        this.#userMessages = new UserMessage();
        this.#console = new GameConsole();
        this.#form = new Form();
        this.#userMessages.startButton.addEventListener('click', this.#play.bind(this));
        this.#userMessages.nextLevel.addEventListener('click', this.#nextLevel.bind(this))
    }

    #play() {
        this.#userMessages.hide(this.#userMessages.startButton);
        this.#console.waitingStateDisplay();
        this.newLevel();
    }

    #nextLevel() {
        this.#userMessages.hide(this.#userMessages.nextLevel);
        this.#nivel++;
        this.newLevel();
    }

    newLevel() {
        let counter = this.#nivel;
        const sequence = new Sequence(this.#userMessages, this.#console);

        while(counter--) {
            const button = this.#console.getRandomButton();
            sequence.add(button);
        }

        this.#console.execute(sequence);  
    }

   
}