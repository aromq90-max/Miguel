// =====================================
// CONFIGURACIÓN INICIAL
// =====================================


const startButton = document.getElementById("start");
const welcome = document.getElementById("welcome");
const app = document.getElementById("app");
const music = document.getElementById("music");



// =====================================
// BOTÓN INICIAR REGALO + MÚSICA
// =====================================


startButton.addEventListener("click",()=>{


    welcome.style.opacity="0";


    setTimeout(()=>{

        welcome.style.display="none";

        app.style.display="block";


    },1000);



    // inicia música (permitido por navegador)

    music.volume = 0.5;

    music.play();



    crearCorazones();



});




// =====================================
// CONTADOR AL CUMPLEAÑOS
// =====================================


function obtenerFechaCumple(){


    let ahora = new Date();


    let cumple = new Date(
        ahora.getFullYear(),
        6,
        12,
        0,
        0,
        0
    );


    // Si ya pasó el 12, apunta al próximo año

    if(ahora > cumple){

        cumple.setFullYear(
            ahora.getFullYear()+1
        );

    }


    return cumple;


}



function actualizarContador(){


    let fecha = obtenerFechaCumple();


    let ahora = new Date();


    let diferencia = fecha - ahora;



    let dias = Math.floor(
        diferencia /
        (1000*60*60*24)
    );



    let horas = Math.floor(

        (diferencia %
        (1000*60*60*24))
        /
        (1000*60*60)

    );



    let minutos = Math.floor(

        (diferencia %
        (1000*60*60))
        /
        (1000*60)

    );



    let segundos = Math.floor(

        (diferencia %
        (1000*60))
        /
        1000

    );




    document.getElementById("days").innerHTML =
    dias;


    document.getElementById("hours").innerHTML =
    horas;


    document.getElementById("minutes").innerHTML =
    minutos;


    document.getElementById("seconds").innerHTML =
    segundos;



}



setInterval(actualizarContador,1000);

actualizarContador();




// =====================================
// CORAZONES FLOTANDO
// =====================================


function crearCorazones(){



setInterval(()=>{


    let corazon=document.createElement("div");


    corazon.innerHTML="💜";


    corazon.style.position="fixed";

    corazon.style.left=
    Math.random()*100+"%";


    corazon.style.bottom="-30px";


    corazon.style.fontSize=
    (20+Math.random()*25)+"px";


    corazon.style.animation=
    "subir 8s linear";



    document.body.appendChild(corazon);



    setTimeout(()=>{

        corazon.remove();

    },8000);



},500);



}




// Animación corazones

let style=document.createElement("style");

style.innerHTML=`

@keyframes subir{

from{

transform:translateY(0) rotate(0deg);

opacity:1;

}


to{

transform:
translateY(-120vh)
rotate(360deg);

opacity:0;

}

}

`;

document.head.appendChild(style);



// =====================================
// MISIONES DESBLOQUEADAS
// =====================================


function calcularDia(){


let cumple = new Date();

cumple.setMonth(6);
cumple.setDate(12);
cumple.setHours(0,0,0);



let hoy = new Date();



let diferencia = cumple - hoy;



let dias = Math.ceil(

diferencia /

(1000*60*60*24)

);



return dias;


}







function desbloquearMisiones(){



let falta = calcularDia();



let disponibles = 1;



// 3 días antes desbloquea nivel 2

if(falta <= 3){

disponibles = 2;

}


// 2 días antes desbloquea nivel 3

if(falta <= 2){

disponibles = 3;

}


// Día del cumpleaños desbloquea final

if(falta <= 0){

disponibles = 4;

}





for(let i=1;i<=4;i++){



let mision = 
document.getElementById("day"+i);



if(!mision) continue;



let icono =
mision.querySelector(".icon");



let boton =
mision.querySelector("button");





if(i <= disponibles){



mision.classList.remove("locked");

mision.classList.add("active");



icono.innerHTML="💜";



boton.innerHTML="Jugar 💜";



boton.onclick=function(){

abrirMision(i);

};



}

else{


mision.classList.add("locked");


icono.innerHTML="🔒";


boton.innerHTML="Bloqueado";


}



}



}





desbloquearMisiones();







// =====================================
// ABRIR JUEGOS
// =====================================



function abrirMision(numero){



let juegos = {



1:
"juegos/nivel1.html",



2:
"juegos/nivel2.html",



3:
"juegos/nivel3.html",



4:
"juegos/nivel4.html"



};




let bloqueada =
document
.getElementById("day"+numero)
.classList.contains("locked");




if(bloqueada){


document.getElementById("game").innerHTML=


`

<div>

🔒 Esta misión todavía no está disponible 💜

</div>

`;

return;


}





window.location.href =
juegos[numero];



}




// =====================================
// 100 FORMAS DE AMAR
// =====================================



const formasAmar=[


"Amarte incluso en tus días difíciles 💜",

"Escuchar cada historia que quieras contarme",

"Hacerte reír cuando estés seria",

"Recordarte lo especial que eres",

"Cuidarte siempre que pueda",

"Celebrar tus pequeños logros",

"Abrazarte sin necesidad de decir nada",

"Elegirte cada día",

"Guardar nuestros recuerdos",

"Crear nuevos momentos contigo"


];



let numeroAmor=0;



const botonAmor=
document.getElementById("love");



botonAmor.addEventListener("click",()=>{


let texto=
document.getElementById("loveText");



texto.innerHTML=

`

<h3>
Manera #${numeroAmor+1}
</h3>

<p>
${formasAmar[numeroAmor]}
</p>

`;



numeroAmor++;



if(numeroAmor>=formasAmar.length){

numeroAmor=0;

}


});






// =====================================
// EFECTO AL PASAR SOBRE FOTOS
// =====================================


document.querySelectorAll(".gallery img")
.forEach(img=>{


img.addEventListener("click",()=>{


img.classList.toggle("zoom");


});


});