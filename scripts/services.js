const buttonsElements = [...document.querySelectorAll('.projects__button')]
const modalElement = document.querySelector('.modal')

buttonsElements.forEach((button) => {
    button.addEventListener('click', () => {
        modalElement.classList.toggle('visually-hidden')
    })
})



