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
    //al click del bottone vengono create maxCells numerate
    let optionSelector = document.querySelector("select").value;
    //console.log(optionSelector);
    const gameContainerSelection = document.querySelector(".game_container");
    if (optionSelector === "dif_1") {
        maxCells = 100;
        for (let i = 1; i <= maxCells; i++) {
            const squareHtml = `<div class="square">${i}</div>`;
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
        maxCells = 49;
        for (let i = 1; i <= maxCells; i++) {
            const squareHtml = `<div class="square_7">${i}</div>`;
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
            //VERSIONE IF CON INCLUDES INVECE DI INDEXOF
            //if (!bombs.includes(bomb)) ! nega l'affermazione
            if (bombs.indexOf(bomb) === -1) { //se indexOf === -1 vuol dire che l'elemento non è presente, quindi se non è presente lo aggiunge, altrimenti si va avanti e così via
                bombs.push(bomb);
            }
        }
        console.log(bombs.sort((a, b) => a - b)); //con .sort((a, b) => a - b) metto in ordine l'array numerico perfettamente
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
            square.removeEventListener('click', clickOnSquare); //dopo che l'eventlistener ha fatto la prima volta il suo dovere rimuovo l'event listener dal quadrato per non ripetere inutilmente count ed altri operazioni sugli elementi già cliccati (count non incrementa se riclicco su caselle già scoperte)
            //console.log(count);
            if (bombs.includes(Number(square.textContent))) {
                /* square.classList.add("red") questa si può lasciare solo sotto*/
                console.log(square.textContent, "HAI PERSO !", "score:", count - 1,);
                //aggiungo un ciclo che assegni con lo stesso metodo di sopra a tutte le bombe la classe red quando il giocatore perde
                for (let i = 0; i < squares.length; i++) {
                    const square = squares[i];
                    if (bombs.includes(Number(square.textContent))) {
                        square.classList.add("red");
                        //console.log(square);
                    }
                }
                /* for (let i = 0; i < squares.length; i++) {
                    const square = squares[i];
                    //console.log(square)
                    square.removeEventListener('click', clickOnSquare);
                } */
                //come fare adesso a rimuovere tutti gli eventListener per bloccare la partita del tutto ?
            } else {
                square.classList.add("blue");
                console.log(square.textContent);
                if (count === (Number(maxCells - 16))) {
                    console.log("COMPLIMENTI ! HAI VINTO ! score:", count);
                }
                /* for (let i = 0; i < squares.length; i++) {
                    const square = squares[i];
                    //console.log(square)
                    square.removeEventListener('click', clickOnSquare);
                } */
                //come fare adesso a rimuovere tutti gli eventListener per bloccare la partita del tutto ?
                //ho testato un ciclo for per rislezionare ogni quadrato e fare removeEventListener
                //non ha funzionato
            }
        }
    }
}


//il problema è quasi di sicuro nel fatto che la function  on click è dentro al ciclo for, ma se la tiro fuori perdo la definizione di square, come posso recuperarla e metterla magari in globale ?