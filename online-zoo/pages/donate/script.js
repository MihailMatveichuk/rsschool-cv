'use strict';
document.addEventListener('DOMContentLoaded', () => {

    const burger = document.querySelector('.burger_menu');
    const navWrapper = document.querySelector('.nav_wrapper');
    const navWrapperBurger = document.querySelector('.wrapper_nav_burger');
    const burgerOpen = document.querySelector('.burger');
    const wrapper = document.querySelector("body > div");
    const nav = document.querySelector("body > header > nav");
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");

    // Opening burger
    burger.addEventListener("click", () => {
        if (burger.style.display != 'none') {
            if (navWrapper.style.display != 'none') {
                navWrapperBurger.style.display = "flex";
                navWrapper.style.display = 'none';
                nav.style.background = '#fff';
                wrapper.style.pointerEvents = 'none';
                main.classList.add('overlay');
                footer.classList.add('overlay');
            } else {
                navWrapperBurger.style.display = "none";
                navWrapper.style.display = 'flex';
            }
        }
    });

    // Closing burger 
    burgerOpen.addEventListener("click", () => {
        if (burgerOpen.style.display != 'none') {
            if (navWrapper.style.display == 'none') {
                navWrapperBurger.style.display = "none";
                navWrapper.style.display = 'flex';
                wrapper.classList.remove('overlay--show');
                nav.style.background = '#000';
                wrapper.removeAttribute("style");
                main.classList.remove('overlay');
                footer.classList.remove('overlay');

            } else {
                navWrapperBurger.style.display = "flex";
                navWrapper.style.display = 'none';
            }
        }
    });

    // Checking size of screen and if necessary close burger
    window.addEventListener("resize", () => {
        if (window.innerWidth > 780) {
            navWrapperBurger.style.display = "none";
            navWrapper.style.display = 'flex';
            nav.style.background = '#000';
            wrapper.removeAttribute("style");
            main.classList.remove('overlay');
            footer.classList.remove('overlay');
        }
    });

    // Closing burger by click near nav
    window.addEventListener('click', e => {
        const target = e.target;
        if (target.closest('.burger_menu')) {
            navWrapperBurger.style.display = "flex";
            navWrapper.style.display = 'none';
            nav.style.background = '#fff';
        } else if (!target.closest('.burger_menu') && !target.closest(".nav")) {
            navWrapperBurger.style.display = "none";
            navWrapper.style.display = 'flex';
            nav.style.background = '#000';
            wrapper.removeAttribute("style");
            main.classList.remove('overlay');
            footer.classList.remove('overlay');
        }
    });

    // amount points 
    let amountChecked = document.querySelectorAll(".amount_checked"),
        amountPoint = document.querySelectorAll(".amount_point"),
        amountItemText = document.querySelectorAll(".amount_item_text"),
        thousand = document.getElementById("first"),
        charity = document.querySelector(".charity_input"),
        circle = document.querySelectorAll(".circle"),
        hundred = document.getElementById("second");
        charity.value = 100;

    // if (document.documentElement.clientWidth <= 816) {
    //     thousand.removeAttribute("checked");
    //     hundred.setAttribute("checked", "false");
    //     charity.value = 100;

    // } else if (document.documentElement.clientWidth > 816) {
    //     hundred.removeAttribute("checked");
    //     thousand.setAttribute("checked", "false");
    //     charity.value = 1000;

    // }

    // window.addEventListener("resize", () => {
    //     if (document.documentElement.clientWidth <= 816) {
    //         thousand.removeAttribute("checked");
    //         hundred.setAttribute("checked", "false");

    //     }
    // });

    // window.addEventListener('resize', () => {
    //     if (document.documentElement.clientWidth > 816) {
    //         hundred.removeAttribute("checked");
    //         thousand.setAttribute("checked", "false");
    //     }
    // });


    // const box = document.querySelector(".box");

    // box.addEventListener("touchstart", (e) => {
    //     e.preventDefault();

    //     console.log("Start");
    //     console.log(e.touches);
    // });

    // box.addEventListener("touchmove", (e) => {
    //     e.preventDefault();

    //     console.log(e.targetTouches[0].pageX);
    // });

    // box.addEventListener("touchend", (e) => {
    //     e.preventDefault();

    //     console.log("End");
    // });

    // Restrict input value to 4 values
    charity.oninput = function() {
        this.value = this.value.substr(0, 4);
    };

    // Change color of value of amount for charity 
    amountChecked.forEach((e, i) => {
        e.addEventListener("click", () => {
            charity.value = amountItemText[i].textContent.slice(1);
        });
    });

    charity.addEventListener("input", (e) => {
        amountItemText.forEach((e, i) => {
            if (charity.value === e.textContent.slice(1)) {
                console.log(charity.value);
                console.log(e.textContent.slice(1));
                amountChecked[i].checked = true;
            } 
            else {
                amountChecked[i].checked = false;
            }
        });
    });
});