var Modal = (function(){

    function Modal(setting) {
        this.id = setting.id;
        this.modal = document.getElementById(setting.id);
        this.beforeOpen = setting.beforeOpenHandler;
        this.afterClose = setting.afterCloseHandler;

        _init.call(this);
    }

    function _init() {
        var _self= this;
        document.querySelector('[data-modal="' + _self.id + '"]').addEventListener('click', _openModal.bind(_self));

        document.querySelectorAll('#' + _self.id + ' .close-btn').forEach(function(btn) {
            btn.addEventListener('click', _closeModal.bind(_self));
        });
    }

    function _openModal() {
        if(this.beforeOpen) {
            this.beforeOpen();
        }

        this.modal.showModal();
    }

    function _closeModal() {
        if(this.afterClose) {
            this.afterClose();
        }
       
        this.modal.close();
    }

    return Modal;
})()