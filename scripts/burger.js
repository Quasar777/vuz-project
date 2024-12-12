export function mainBurger() {
    document.addEventListener("DOMContentLoaded", function() {
        const burger = document.querySelector('.header__burger-button')
        const header = document.querySelector('.header')

        burger.addEventListener('click', toggleBurger)

        function toggleBurger() {
            header.classList.toggle("open")
        }
    })
}