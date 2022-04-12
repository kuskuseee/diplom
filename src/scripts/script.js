import Splide from "@splidejs/splide";
import '@fortawesome/fontawesome-free/js/all.min';

document.addEventListener('DOMContentLoaded', function () {

    new Splide('#splide', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        arrows: 'slider',
        autoplay: true,
        interval: 3000,
        pagination: false
    }).mount();


});

document.addEventListener('click', function () {
    let target = event.target;

    if (target.closest('.menu__mobile-menu-btn')) {
        let btn = target.closest('.menu__mobile-menu-btn');
        let menu = document.querySelector('.menu__list');
        menu.classList.toggle('menu__list__active')

        let icon = btn.querySelector('svg');
        if (icon.classList.contains('fa-angle-down')) {
            icon.classList.remove('fa-angle-down');
            icon.classList.add('fa-angle-up');
        } else {
            icon.classList.remove('fa-angle-up');
            icon.classList.add('fa-angle-down');
        }
    }
});

