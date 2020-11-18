const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const combinacionesGanadoras = [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 5, 7],
    [3, 6, 9],
    [4, 5, 6],
    [7, 8, 9]
];

// tablero: DEFINIR EL TAD (tipo abstracto de dato)

var TABLERO = {
    1: " ",
    2: " ",
    3: " ",
    4: " ",
    5: " ",
    6: " ",
    7: " ",
    8: " ",
    9: " "

};

var jugador;
let contadorJugadas = 0;
ingresoValidado = false;



// modulracionacion: todas las funciones que hacen al proyecto

function dibujar(tablero) {

    console.clear();

    console.log("NodeJS TA-TE-TI" + "\n");

    console.log(" " + TABLERO[1] + " | " + TABLERO[2] + " | " + TABLERO[3] + "\n" +
        "-----------" + "\n" +
        " " + TABLERO[4] + " | " + TABLERO[5] + " | " + TABLERO[6] + "\n" +
        "-----------" + "\n" +
        " " + TABLERO[7] + " | " + TABLERO[8] + " | " + TABLERO[9] + "\n");

    turno();

}


function turno() {

    let resto = contadorJugadas % 2;

    if (resto == 1) {
        jugador = "O";
    } else {
        jugador = "X";
    }

    console.log("Turno del jugador " + jugador + ":");

}

function validarIngreso(input) {

    let permitido = /[1-9]/;

    if (isNaN(input)) {

        // console.log("ingrese un valor del 111 al 999")
        return false;

    }
    else {

        // console.log("nro jugada: " + contadorJugadas + '\n');
        return true;
    }
}


function validarDisponibilidad(posicion) {
    //Expresión regular:  ^[0-9]$

    if (TABLERO[posicion] === " ") {
        return true;
    }
    else {
        return false;
    }

}

function hayGanador(jug){
    for (let i = 0; i < combinacionesGanadoras.length; i++) {
        let tresEnFila = 0;
        for (let j = 0; j < combinacionesGanadoras[i].length; j++) {
            if (TABLERO[combinacionesGanadoras[i][j]] === jug) {
                tresEnFila++;
            }
            if (tresEnFila === 3) {
                return true;
            }
        }
    }
    return false;
    
}

function jugar(input) {

    if (validarIngreso(input)) {
        if (validarDisponibilidad(input)) {
            contadorJugadas++;
            TABLERO[input] = jugador;
            dibujar(TABLERO);
            if(hayGanador(jugador)){
                console.log("tenemos un GANADOR!");
                return 'Exit';

            }

        }
        else {
            console.log("casillero ocupado, elija otro");
        }
    }
    else {

        console.log("ingrese un valor del 1 al 9")

    }


}


// juego : software (interactuan la modulari[csz]acion)


const start = async () => {

    dibujar(TABLERO);

    for await (const line of rl) {

        if (line == 'exit') {
            console.log('fin de juego')
            return 'Exit';
        } else {
            jugar(line);


        }
    }
}


start()