// This file contain all the funcitonality of the website 
const collapse = function () {
    const collapse = document.querySelector('.toggle-info')
    collapse.addEventListener('click', function (e) {
        const btn = e.target.closest('.toggle__btn')
        if (!btn) return

        const toggle = document.querySelector('.toggle-content')
        toggle.classList.toggle('height__full')
        console.log(btn)

        console.log(toggle)

    })
}
collapse()