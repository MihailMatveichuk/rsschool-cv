'use strict';
document.addEventListener('DOMContentLoaded', () => {

    // burger
    const burger = document.querySelector('.burger_menu'),
        navWrapper = document.querySelector('.nav_wrapper'),
        navWrapperBurger = document.querySelector('.wrapper_nav_burger'),
        burgerOpen = document.querySelector('.burger'),
        wrapper = document.querySelector("body > div"),
        nav = document.querySelector("body > header > nav"),
        main = document.querySelector("main"),
        footer = document.querySelector("footer");

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
                wrapper.style.background = 'grey';
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
        if (window.innerWidth > 740) {
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

    //   Make carousel
    const commentRow = document.querySelector(".comments-row"),
        section5CommentCard = document.querySelectorAll(".section5_comment_card"),
        rangeSlider = document.getElementById("range");

    let position = 0;

    rangeSlider.addEventListener("change", function () {
        if (window.innerWidth > 1000) {
            if (this.value > position) {
                commentRow.style.transform = `translateX(${-25 * this.value}%)`;
                for (let i = 4; i < section5CommentCard.length; i++) {
                    section5CommentCard[i].style.display = "block";
                    commentRow.style.gap = `${20}px`;
                }
                position = this.value;
            } else if (this.value < position) {
                commentRow.style.transform = `translateX(${-25 * this.value}%)`;
                for (let i = 4; i < section5CommentCard.length; i++) {
                    section5CommentCard[i].style.display = "block";
                    commentRow.style.gap = `${19}px`;
                }
                position = this.value;
            }
        } else {
            if (this.value > position) {
                commentRow.style.transform = `translateX(${-33 * this.value}%)`;
                for (let i = 4; i < section5CommentCard.length; i++) {
                    section5CommentCard[i].style.display = "block";
                    commentRow.style.gap = `${40}px`;
                }
                position = this.value;

            } else if (this.value < position) {
                commentRow.style.transform = `translateX(${-33 * this.value}%)`;
                for (let i = 4; i < section5CommentCard.length; i++) {
                    section5CommentCard[i].style.display = "block";
                    commentRow.style.gap = `${40}px`;
                }
                position = this.value;
            }
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth < 1000) {
            commentRow.style.transform = `none`;
            for (let i = 4; i < section5CommentCard.length; i++) {
                section5CommentCard[i].style.display = "none";
                commentRow.style.gap = `${21}px`;
            }
        }
    });

    // MAke revise
    const popUp = document.querySelector(".pop-up"),
          xPopUp = document.querySelector(".X_pop");


        if(document.body.clientWidth <= 850){
            section5CommentCard.forEach((e) => {
                e.addEventListener("click", () => {
                    popUp.style.display = "flex";
                    let copy = e.cloneNode(true);
                    popUp.append(copy);
                    copy.classList.add("pop_up_card");
                    const headerCardTextDesc = document.querySelectorAll(".header-card_text_desc");
                    headerCardTextDesc[0].style.height = `${100}%`;
                    if(popUp.style.display != "none"){
                        wrapper.style.pointerEvents = 'none';
                        main.classList.add('overlay');
                        main.style.pointerEvents = 'none';
                        popUp.style.pointerEvents = "all";
                        footer.classList.add('overlay');
                        footer.style.pointerEvents = 'none';
                        wrapper.style.backgroundColor = 'grey';
                    }
                    popUp.addEventListener('click', (e)=>{
                        if(e.target !== popUp && e.target !== copy){
                            console.log(e.target);
                            popUp.style.display = "none";
                            popUp.removeChild(popUp.lastChild);
                            main.style.pointerEvents = 'unset';
                            footer.style.pointerEvents = 'unset';  
                        }
                    });
            
                    });
                });
            xPopUp.addEventListener("click", ()=>{
                popUp.style.display = "none";
                popUp.removeChild(popUp.lastChild);
                main.style.pointerEvents = 'unset';
                footer.style.pointerEvents = 'unset';
                
            });
        }
        else  if(document.body.clientWidth > 850){
            popUp.style.display = "none";
        }

        window.addEventListener("resize", () => {
            if (window.innerWidth > 850) {
                popUp.style.display = "none";
            }
        });


});