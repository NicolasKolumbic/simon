var Form = (function(){

    function Form(setting){
        this.submitHandler = setting.submitHandler;
        this.form = document.getElementById(setting.id)
        _init.call(this);
    }

    function _validate(event) {
        var input = event.target;
        var submitButton = _getSubmitButton(this.form.elements);
        if(!input.validity.valid) {
            var errorMessage = input.parentElement.nextElementSibling;
            if(!input.classList.contains('has-error')) {
                input.classList.add('has-error');
            }
            
            if(input.validity.valueMissing) {
                errorMessage.textContent = "El campo\"" + input.nextElementSibling.textContent + "\" es requerido."
            } else if(input.validity.tooShort) {
                errorMessage.textContent = "El campo \"" + input.nextElementSibling.textContent + "\" debe tener al menos " + input.minLength + " caracteres."
            } else if(input.validity.patternMismatch || input.validity.typeMismatch) {
                errorMessage.textContent = "El formato del campo \"" + input.nextElementSibling.textContent + "\" es erroneo." + input.getAttribute('data-error-message');
            }
            submitButton.setAttribute('disabled', true);
        } else {
            if(input.classList.contains('has-error')) {
                input.classList.remove('has-error');
            }
            submitButton.removeAttribute('disabled');
            _clear.call(input, event);
        }
    }

    function _clear(event) {
        var input = event.target;
        if(input.classList.contains('has-error')) {
            input.classList.remove('has-error');
        }
        input.parentElement.nextElementSibling.textContent = '';
    }

    function _submitHandler() {
        if(this.submitHandler) {
            this.submitHandler(this.form);
        }
    }

    function _getSubmitButton(elements) {
        return Array.from(elements).find(function(element) {
            return element.type === 'submit';
        })
    }

    function _init() {
        var _self = this;
        this.form.addEventListener('submit', function(event) {
            event.preventDefault();
            _submitHandler.call(_self);
        });
      
        this.form.querySelectorAll('.text-box input, .text-box textarea').forEach(function(ctrol){
            ctrol.addEventListener('blur', _validate.bind(_self));
            ctrol.addEventListener('focus', _clear.bind(_self));
        });
    }

    return Form;
})()