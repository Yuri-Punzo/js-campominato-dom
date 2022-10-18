/*
CONSEGNA
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
Attenzione:
**nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
*/
let maxCells;

function playCampoMinato() {
    //al click del bottone vengono create 100 caselle numerate
    let optionSelector = document.querySelector("select").value;
    //console.log(optionSelector);
    const gameContainerSelection = document.querySelector(".game_container");
    if (optionSelector === "dif_1") {
        maxCells = 49;
        for (let i = 1; i <= maxCells; i++) {
            const squareHtml = `<div class="square_7">${i}</div>`;
            //console.log(squareHtml);
            gameContainerSelection.insertAdjacentHTML("beforeend", squareHtml);
        }
    } else if (optionSelector === "dif_2") {
        maxCells = 81;
        for (let i = 1; i <= maxCells; i++) {
            const squareHtml = `<div class="square_9">${i}</div>`;
            //console.log(squareHtml);
            gameContainerSelection.insertAdjacentHTML("beforeend", squareHtml);
        }
    } else if (optionSelector === "dif_3") {
        maxCells = 100;
        for (let i = 1; i <= maxCells; i++) {
            const squareHtml = `<div class="square">${i}</div>`;
            //console.log(squareHtml);
            gameContainerSelection.insertAdjacentHTML("beforeend", squareHtml);
        }
    }

    //con questa funzione, quando richiamata genero numeri casuali da "min" al numero massimo di caselle selezionate con la difficoltà
    function generateRandomNumber(min, maxCells) {
        return Math.floor(Math.random() * (maxCells - min)) + min;
        //console.log(generateRandomNumber(1, maxCells));
    }

    //devo ripetere questa operazione per 16 volte e devo fare di modo che se il numero c'è già non si ripeta
    const bombs = []; //creo un array bombs con zero elementi all'interno
    function bombGenerator() {
        while (bombs.length < 16) { //faccio ciclare fintanto che l'array non arriva a 16 elementi
            const bomb = generateRandomNumber(1, maxCells); //ad ogni ciclo creo un numero randomico
            if (bombs.indexOf(bomb) === -1) { //se indexOf === -1 vuol dire che l'elemento non è presente, quindi se non è presente lo aggiunge, altrimenti si va avanti e così via
                bombs.push(bomb);

            }
        }
        console.log(bombs.sort()); //con sort organizzo "un pochino meglio" i numeri delle bombe in log
    }
    bombGenerator();

    const squares = document.querySelectorAll(".square, .square_9, .square_7");
    //console.log(squares);    

    let count = 0;
    /* //VERSIONE CON FOR...OF
    const squaresArray = squares;
    for (const squares of squaresArray) {
    console.log(squares); */
    for (let i = 0; i < squares.length; i++) {
        const square = squares[i];
        square.addEventListener("click", clickOnSquare);

        function clickOnSquare() {
            //console.log("click");
            count += 1;
            //console.log(count);
            if (bombs.includes(Number(square.textContent))) {
                /* square.classList.add("red") questa si può lasciare solo sotto*/
                console.log("HAI PERSO !", "score:", count - 1,);
                //aggiungo un ciclo che assegni con lo stesso metodo di sopra a tutte le bombe la classe red quando il giocatore perde
                for (let i = 0; i < squares.length; i++) {
                    const square = squares[i];
                    if (bombs.includes(Number(square.textContent))) {
                        square.classList.add("red");
                        //console.log(square);
                    }
                }
            } else {
                square.classList.add("blue");
                console.log(square.textContent);
                // posso aggiungere anche qui un if e ciclo per avere la lista dei numeri safe
                // a seguire però come faccio capire al computer che tutti sono stati cliccati ?
                // potrei dargli un valore booleano ?
                // poi controllo se tutti i numeri safe sono stati cliccati
                // se si do' il punteggio e la vittoria
                // se no continuo
            }
        }
    }
}