class FormsValidation {
    selectors = {
        form: '[data-js-form]',
        fieldErrors: '[data-js-form-field-error]'
    }

    errorMessages = {
        valueMissing: () => 'Пожалуйста, заполните это поле',
        patternMismatch: ( { title } ) => title || 'Данные не соответсвуют заданному формату',
        tooShort: ( {minLength} ) => `Слишком короткое значение: минимум символов - ${minLength}`,
        tooLong: () => `Слишком длинное значение: максимум символов - ${maxLength}`
    }

    constructor() {
        this.bindEvents()
    }

    manageErrors(fieldControlElement, errorMessages) {
        const fieldErrorsElement = fieldControlElement.parentElement.querySelector(this.selectors.fieldErrors)

        fieldErrorsElement.innerHTML = errorMessages
            .map((message) => `<span class="field__error">${message}</span>`)
            .join('; ')
    }

    validateField(fieldControlElement) {
        const errors = fieldControlElement.validity 
        const errorMessages = []

        Object.entries(this.errorMessages).forEach(([errorType, getErrorMessage]) => {
            if (errors[errorType]) {
                errorMessages.push(getErrorMessage(fieldControlElement))
            }
        })

        this.manageErrors(fieldControlElement, errorMessages)

        const isValid = errorMessages.length === 0

        fieldControlElement.ariaInvalid = !isValid

        return isValid
    }

    onBlur(event) {
        const { target } = event
        const isFormField = target.closest(this.selectors.form)
        const isRequired = target.required

        if (isFormField && isRequired) {
            this.validateField(target)
        }
    }

    onChange(event) {
        const { target } = event
        const isRequired = target.required
        const isToggleType = ['radio', 'checkbox'].includes(target.type)

        if (isRequired && isToggleType) {
            this.validateField(target)
        }
    }

    onSubmit(event) {
        const isFormElement = event.target.matches(this.selectors.form)

        if (!isFormElement) {
            return
        }

        // переменная для хранения всех required-полей внутри нашей формы.
        const requiredControlElements = [...event.target.elements].filter((element) => element.required)
        let isFormValid = true
        let firstInvalidFieldControl = null

        requiredControlElements.forEach((element) => {
        const isFieldValid = this.validateField(element)


            if (!isFieldValid) {
                isFormValid = false

                if (!firstInvalidFieldControl) {
                    firstInvalidFieldControl = element
                }
            }
        })

        if (!isFormValid) {
            event.preventDefault()
            firstInvalidFieldControl.focus()
        }
        else {
            event.preventDefault()
            document.querySelector('.modal').classList.toggle("visually-hidden");
            
            // 5 задание 
            const formSubmitMessage = document.querySelector('.formSumbitMessage');
            formSubmitMessage.classList.remove("visually-hidden");
            formSubmitMessage.style.transition = "opacity 0.5s ease"; // Настройка плавного появления
            formSubmitMessage.style.opacity = "1";

            setTimeout(() => {
                formSubmitMessage.style.opacity = "0";
                setTimeout(() => {
                    formSubmitMessage.classList.add("visually-hidden");
                }, 500); // Ждем завершения анимации перед скрытием
            }, 3000); // Сообщение видно 3 секунды
        }
    }

    // true третим аргументов - мы ловим событие не на моменте всплытия, на моменте погружения
    bindEvents() {
        document.addEventListener("blur", (event) => {
            this.onBlur(event)
        }, true)
        
        document.addEventListener("change", (event) => this.onChange(event))

        document.addEventListener("submit", (event) => this.onSubmit(event))
    }
}

new FormsValidation()