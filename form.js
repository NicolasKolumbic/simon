export default class Form {
    constructor() {
        document.querySelector('#setting-btn').addEventListener('click', () => {document.querySelector('.modal').showModal()});
        document.querySelectorAll('.close-btn').forEach((btn) => {
            btn.addEventListener('click', () => {document.querySelector('.modal').close()});
        })
    }

}