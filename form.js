var Form = (function(){

    function Form(setting){
        this._submitHandlerSetting = setting.submitHandler;
        this._form = document.getElementById(setting.id)
        _init.call(this);
    }

    Form.prototype.reset = _reset;

    function _reset() {
        return Array.from(this._form.elements)
        .filter(function(element) {
            return element.type !== 'submit' && /input|textarea/i.test(element.tagName);
        })
        .forEach(function(element) {
            element.value = '';
            _clear(element);
        })
    }

    function _validate(event) {
        var input = event.target;
        var submitButton = _getSubmitButton(this._form.elements);
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

            if(!_formHasInvalidInput.call(this, input)) {
                submitButton.removeAttribute('disabled');
            }
            
            _clear(input);
            
        }
    }

    function _clear(input) {
        if(input.classList.contains('has-error')) {
            input.classList.remove('has-error');
        }
        input.parentElement.nextElementSibling.textContent = '';
    }

    function _submitHandler() {
        if(this._submitHandlerSetting) {
            this._submitHandlerSetting(this._form);
        }
    }

    function _formHasInvalidInput(input) {
        return Array.from(this._form.elements)
        .filter(function(element) {
            return element.id !== input.id && element.type !== 'submit';
        })
        .some(function(element) {
            return !element.validity.valid;
        })
    }

    function _getSubmitButton(elements) {
        return Array.from(elements).find(function(element) {
            return element.type === 'submit';
        })
    }

    function _clearHandler(event) {
        _clear(this);
    }

    function _init() {
        var _self = this;
        this._form.addEventListener('submit', function(event) {
            event.preventDefault();
            _submitHandler.call(_self);
        });
      
        this._form.querySelectorAll('.text-box input, .text-box textarea').forEach(function(ctrol){
            ctrol.addEventListener('blur', _validate.bind(_self));
            ctrol.addEventListener('focus', _clearHandler);
        });
    }

    return Form;
})()