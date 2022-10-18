/*
Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
Attenzione:
**nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
*/


function playCampoMinato() {
    //al click del bottone vengono create 100 caselle numerate
    let optionSelector = document.querySelector("select").value
    //console.log(optionSelector);
    const gameContainerSelection = document.querySelector(".game_container")
    if (optionSelector === "dif_1") {
        for (let i = 1; i <= 49; i++) {
            const squareHtml = `<div class="square_7">${i}</div>`
            //console.log(squareHtml);
            gameContainerSelection.insertAdjacentHTML("beforeend", squareHtml)
        }
    } else if (optionSelector === "dif_2") {
        for (let i = 1; i <= 81; i++) {
            const squareHtml = `<div class="square_9">${i}</div>`
            //console.log(squareHtml);
            gameContainerSelection.insertAdjacentHTML("beforeend", squareHtml)
        }
    } else if (optionSelector === "dif_3") {
        for (let i = 1; i <= 100; i++) {
            const squareHtml = `<div class="square">${i}</div>`
            //console.log(squareHtml);
            gameContainerSelection.insertAdjacentHTML("beforeend", squareHtml)
        }
    }

    const squares = document.querySelectorAll(".square, .square_9, .square_7")
    //console.log(squares);
    const squaresArray = squares;
    //VERSIONE CON FOR...OF
    for (const squares of squaresArray) {
        //console.log(squares);
        squares.addEventListener("click", blueAndNumber)

        function blueAndNumber() {
            //console.log("click");
            squares.classList.toggle("blue")
            console.log(squares.textContent);
        }
    }
    /* //VERSIONE SENZA FOR...
    for (let i = 0; i < squares.length; i++) {
        const square = squares[i]
        //console.log(square);
        square.addEventListener('click', blueAndNumber)

        function blueAndNumber() {
            square.classList.toggle('blue');
            console.log(square.textContent);
        }
    } */
}

