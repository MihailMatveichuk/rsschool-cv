'use strict';

window.addEventListener("DOMContentLoaded", () => {


    let count = 0;
    let min = 0;
    let sec = 0;
    const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");
    let emptyCell;
    let cells;
    let myInterval;
    let sizeOfCells = 79;
    let numberOfCells = 15;
    let numberOfRow = 4;
    let cell;
    let arrOfChamp = [];
    let arrOfTime = [];
    let valueOfTime = '';
    let drag;
    cells = JSON.parse(localStorage.getItem('cells'));

    const container = document.createElement('div'),
        gemPuzzle = document.createElement('div'),
        gemPuzzleButtons = document.createElement('div'),
        buttonStart = document.createElement('button'),
        buttonStop = document.createElement('button'),
        buttonSave = document.createElement('button'),
        buttonResults = document.createElement('button'),
        timeCount = document.createElement('div'),
        moves = document.createElement('span'),
        timeShow = document.createElement('span'),
        numberOfSize = document.createElement("p"),
        otherSizes = document.createElement('div'),
        link1 = document.createElement('a'),
        link2 = document.createElement('a'),
        link3 = document.createElement('a'),
        link4 = document.createElement('a'),
        link5 = document.createElement('a'),
        link6 = document.createElement('a'),
        linkOfSound = document.createElement('div'),
        field = document.createElement('div'),
        table = document.createElement('div');



    document.body.insertAdjacentElement('beforeend', container);
    container.className = "container";
    container.append(gemPuzzle);
    gemPuzzle.append(table);
    buttonStart.className = "button";
    buttonStart.innerHTML = "Shuffle and start";
    buttonStop.className = 'button';
    buttonStop.classList.add('stop');
    buttonStop.innerHTML = 'Stop';
    buttonSave.className = "button";
    buttonSave.innerHTML = "Save";
    buttonResults.className = 'button';
    buttonResults.innerHTML = 'Results';
    gemPuzzleButtons.append(buttonStart);
    gemPuzzleButtons.append(buttonStop);
    gemPuzzleButtons.append(buttonSave);
    gemPuzzleButtons.append(buttonResults);
    gemPuzzleButtons.className = 'gem_puzzle-buttons';
    gemPuzzle.append(gemPuzzleButtons);
    gemPuzzle.append(timeCount);
    gemPuzzle.append(field);
    gemPuzzle.append(numberOfSize);
    gemPuzzle.append(otherSizes);
    gemPuzzle.append(linkOfSound);
    linkOfSound.className = 'sound';
    gemPuzzle.className = "gem_puzzle";
    field.className = "field";
    moves.className = "moves";
    moves.innerHTML = `Moves: ${count}`;
    timeShow.className = 'time_show';
    timeShow.innerHTML = "Timer: 00:00";
    timeCount.className = "time_count";
    timeCount.append(moves);
    numberOfSize.className = "size";
    numberOfSize.innerHTML = `Frame size: 4x4`;
    link1.setAttribute('href', 'size');
    link1.innerHTML = '3x3';
    link2.setAttribute('href', 'size');
    link2.innerHTML = '4x4';
    link3.setAttribute('href', 'size');
    link3.innerHTML = '5x5';
    link4.setAttribute('href', 'size');
    link4.innerHTML = '6x6';
    link5.setAttribute('href', 'size');
    link5.innerHTML = '7x7';
    link6.setAttribute('href', 'size');
    link6.innerHTML = '8x8';
    otherSizes.innerHTML = `Other sizes: `;
    otherSizes.className = 'other-sizes';
    otherSizes.append(link1);
    otherSizes.append(link2);
    otherSizes.append(link3);
    otherSizes.append(link4);
    otherSizes.append(link5);
    otherSizes.append(link6);
    const links = document.querySelectorAll('a');

    buttonStart.addEventListener("click", () => {
        field.innerHTML = '';
        clearInterval(myInterval);
        myInterval = null;
        timeShow.innerHTML = 'Timer: 00:00';
        document.querySelector('.field').style.width = `${316}px`;
        document.querySelector('.field').style.height = `${316}px`;
        updateField(numberOfCells, numberOfRow, sizeOfCells);
        count = 0;
        updateDisplay(count);
    });

    buttonResults.addEventListener('click', () => {
        table.classList.toggle('table');
        if (table.classList.contains('table')) {
            arrOfChamp = JSON.parse(localStorage.getItem('arrOfChamp'));
            setTimeout(() => {
                table.innerHTML = arrOfChamp.join("<br/>");
            }, 500);

        } else {
            table.innerHTML = "";
        }

    });


    linkOfSound.addEventListener('click', () => {
        if (linkOfSound.classList !== 'on') {
            linkOfSound.classList.toggle('on');
            togglePlay();
        }

    });

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            field.innerHTML = '';
            let size = +e.target.innerHTML.split('')[0];
            let fieldWidth = 316;
            updateField(Math.pow(size, 2) - 1, size, Math.floor(fieldWidth / size));
            document.querySelectorAll('.cell').forEach(el => {
                el.style.width = `${Math.ceil(fieldWidth / size)}px`;
                el.style.height = `${Math.ceil(fieldWidth / size)}px`;
                if (size === 6) {
                    el.style.width = `${Math.ceil(fieldWidth / size) + 0.7}px`;
                    el.style.height = `${Math.ceil(fieldWidth / size) + 0.7}px`;
                    document.querySelector('.field').style.width = `${314}px`;
                    document.querySelector('.field').style.height = `${314}px`;
                } else if (size == 4) {
                    el.style.width = `${Math.ceil(fieldWidth / size) + 1}px`;
                    el.style.height = `${Math.ceil(fieldWidth / size) + 1}px`;
                    document.querySelector('.field').style.width = `${316}px`;
                    document.querySelector('.field').style.height = `${316}px`;
                } else if (size === 8) {
                    el.style.width = `${Math.ceil(fieldWidth / size) - 0.2}px`;
                    el.style.height = `${Math.ceil(fieldWidth / size) - 0.2}px`;
                    document.querySelector('.field').style.width = `${313}px`;
                    document.querySelector('.field').style.height = `${313}px`;
                } else {
                    document.querySelector('.field').style.width = `${316}px`;
                    document.querySelector('.field').style.height = `${316}px`;

                }
            });
            clearInterval(myInterval);
            myInterval = null;
            timeShow.innerHTML = 'Timer: 00:00';
            count = 0;
            updateDisplay(count);
            numberOfSize.innerHTML = `Frame size: ${e.target.innerHTML}`;
        });
    });



    function togglePlay() {
        if (audio.volume == 1) {
            audio.volume = 0;
        } else {
            audio.volume = 1;
        }
    }

    function updateDisplay(val) {
        moves.innerHTML = `Moves: ${val}`;
    }

    function init() {
        myInterval = setInterval(tick, 1000);
        sec = 0;
        min = 0;
    }

    function tick() {
        sec++;
        if (sec >= 60) {
            min++;
            sec = sec - 60;
        }
        if (sec < 10) {
            if (min < 10) {
                timeShow.innerHTML = `Timer: 0${min}:0${sec}`;
            } else {
                timeShow.innerHTML = `Timer: ${min}:0${sec}`;
            }
        } else {
            if (min < 10) {
                timeShow.innerHTML = `Timer: 0${min}:${sec}`;
            } else {
                timeShow.innerHTML = `Timer: ${min}:${sec}`;
            }
        }

    }
    timeCount.append(timeShow);

    function move(index, n, s) {
        if (!myInterval) {
            init();
        }
        const cell = cells[index];
        const diffLeft = Math.abs(emptyCell.left - cell.left);
        const diffTop = Math.abs(emptyCell.top - cell.top);

        if (diffLeft + diffTop > 1) {
            return;
        }
        audio.playbackRate = 1.5;
        audio.play();
        updateDisplay(++count);


        cell.element.style.left = `${emptyCell.left * s}px`;
        cell.element.style.top = `${emptyCell.top * s}px`;

        const emptyCellLeft = emptyCell.left;
        const emptyCellTop = emptyCell.top;
        emptyCell.left = cell.left;
        emptyCell.top = cell.top;
        cell.left = emptyCellLeft;
        cell.top = emptyCellTop;
        localStorage.setItem('cells', JSON.stringify(cells));
        // cells = ;

        const isVictory = cells.every(cell => {
            return cell.value === cell.top * n + cell.left;
        });

        if (isVictory) {
            if (sec < 10) {
                if (min < 10) {
                    alert(`Hooray! You solved the puzzle in 0${min}:0${sec} and ${count} moves!`);
                    valueOfTime = `0${min}:0${sec} and ${count} moves`;
                } else {
                    valueOfTime = alert(`Hooray! You solved the puzzle in ${min}:0${sec} and ${count} moves!`);
                    valueOfTime = `${min}:0${sec} and ${count} moves`;
                }
            } else {
                if (min < 10) {
                    valueOfTime = alert(`Hooray! You solved the puzzle in 0${min}:${sec} and ${count} moves!`);
                    valueOfTime = `0${min}:${sec} and ${count} moves`;
                } else {
                    valueOfTime = alert(`Hooray! You solved the puzzle in ${min}:${sec} and ${count} moves!`);
                    valueOfTime = `${min}:${sec} and ${count} moves`;
                }
            }
            let valueOfTimeInSecond = min * 60 + sec;
            clearInterval(myInterval);
            myInterval = null;
            timeShow.innerHTML = 'Timer: 00:00';
            count = 0;
            updateDisplay(count);
            if (arrOfChamp.length < 10) {
                arrOfTime.push(valueOfTimeInSecond);
                arrOfChamp.push(valueOfTime);

            }

        }

        localStorage.setItem('arrOfChamp', JSON.stringify(arrOfChamp));
    }

    function updateField(noc, nor, soc) {
        emptyCell = {
            value: 0,
            left: 0,
            top: 0
        };

        cells = [];
        cells.push(emptyCell);

        let digits = [...Array(noc).keys()]
            .map(x => x + 1).sort(() => Math.random() - 0.5);

        for (let i = 1; i <= noc; i++) {
            let value = digits[i - 1];
            cell = document.createElement('div');
            cell.className = 'cell';
            cell.setAttribute('draggable', 'true');
            cell.innerHTML = value;

            const left = i % nor;
            const top = (i - left) / nor;

            cells.push({
                value: value,
                left: left,
                top: top,
                element: cell
            });

            cell.style.left = `${left * soc}px`;
            cell.style.top = `${top * soc}px`;


            field.append(cell);
            drag = (event) => {
                if (event.type == 'dragend') {
                    document.querySelectorAll('.cell').forEach(el => {
                        el.style.transition = `all ${0}s`;
                    });
                    move(i, nor, soc);
                }
            };
            cell.addEventListener('dragend', drag);
            cell.addEventListener('click', () => {
                document.querySelectorAll('.cell').forEach(el => {
                    el.style.transition = `all ${0.5}s`;
                });
                move(i, nor, soc);
            });
        }
    }



    updateField(numberOfCells, numberOfRow, sizeOfCells);
    console.log(arrOfChamp);
    // init();
});