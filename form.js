var Form = (function(){

    var modal = document.querySelector('.modal');
    
    function Form(){
        document.querySelector('#setting-btn').addEventListener('click', openModal);
        document.querySelectorAll('.close-btn').forEach(function(btn) {
            btn.addEventListener('click', closeModal);
        })
    }

    function openModal() {
        Timer.pause();
        modal.showModal()
    }

    function closeModal() {
        Timer.play();
        modal.close()
    }

    return Form;
})()