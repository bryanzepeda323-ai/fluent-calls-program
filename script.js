// ----------------------------
// 1️⃣ VARIABLES PRINCIPALES
// ----------------------------
const opciones = document.querySelectorAll('.option-style');
let continuar = document.querySelector('#continuar');
let popup = document.querySelector('.popup');
let head = document.querySelector('.head');

let indiceActual = 0;
let correctasContadas = 0;
let tiempo = 0;
let timerInterval;
let bloqueado = false; // Bloquea clicks mientras popup visible

// ----------------------------
// 2️⃣ OBJETO CON TODAS LAS PREGUNTAS
// ----------------------------
let preguntasOriginales = [
    {
        texto: 'A customer wants to make a credit card payment over the phone.',
        opciones: [
            {id: 'opcion-uno', texto: 'Okay, tell me your card numbers.', feedback: 'Too direct, lacks professionalism and reassurance'},
            {id: 'opcion-dos', texto: "I can take that. What's your card info?", feedback: 'Too informal and vague'},
            {id: 'opcion-tres', texto: 'Certainly, I can assist with that securely. Please provide your card number, expiry date, and CVV code.', feedback: '✅ Correct answer!', correcta: true},
            {id: 'opcion-cuatro', texto: "The weather is nice today, isn't it?", feedback: 'Irrelevant to the situation'}
        ]
    },
    {
        texto: "A customer's credit card transaction has been declined.",
        opciones: [
            {id: 'opcion-uno', texto: 'Your card got declined. Got another one?', feedback: 'Rude and unprofessional'},
            {id: 'opcion-dos', texto: 'The transaction is, uh, not working. Sorry.', feedback: 'Vague and unprofessional'},
            {id: 'opcion-tres', texto: "I'm afraid the transaction was not authorized by your bank. Would you like to try an alternative payment method?", feedback: '✅ Correct answer!', correcta: true},
            {id: 'opcion-cuatro', texto: 'You need to call your bank to fix this problem.', feedback: 'Does not offer direct assistance'}
        ]
    },
    {
        texto: "You need to confirm the payment amount with the customer.",
        opciones: [
            {id: 'opcion-uno', texto: 'So, is $50 the money you pay?', feedback: 'Poor grammar and informal'},
            {id: 'opcion-dos', texto: "We're charging you $50, okay?", feedback: 'Assumptive and informal'},
            {id: 'opcion-tres', texto: 'Just to confirm, the total amount to be charged is $50.00. Is that correct?', feedback: '✅ Correct answer!', correcta: true},
            {id: 'opcion-cuatro', texto: 'Your bill is ready for payment next week.', feedback: 'Irrelevant to the immediate action'}
        ]
    },
    {
        texto: "A customer asks if they can pay with a different card than the one on file.",
        opciones: [
            {id: 'opcion-uno', texto: 'Yeah, sure, no problem. Give me the new one.', feedback: 'Excessively informal'},
            {id: 'opcion-dos', texto: 'You can to change the card details now.', feedback: 'Grammatical error: "can to change"'},
            {id: 'opcion-tres', texto: 'Absolutely, we can update the payment method. Please provide the new card details at your convenience.', feedback: '✅ Correct answer!', correcta: true},
            {id: 'opcion-cuatro', texto: 'Our call center hours are from 9 AM to 6 PM.', feedback: 'Irrelevant to the question'}
        ]
    },
    {
        texto: "The payment system is processing slowly.",
        opciones: [
            {id: 'opcion-uno', texto: 'This stupid system is so slow today.', feedback: 'Unprofessional and rude'},
            {id: 'opcion-dos', texto: "Just wait, it's loading.", feedback: 'Impolite and uninformative'},
            {id: 'opcion-tres', texto: 'Thank you for your patience, the system is processing the transaction. It will be just a moment.', feedback: '✅ Correct answer!', correcta: true},
            {id: 'opcion-cuatro', texto: 'Would you like to hear about our new promotion?', feedback: 'Irrelevant and poorly timed'}
        ]
    },
    {
        texto: "You have successfully processed the customer's payment.",
        opciones: [
            {id: 'opcion-uno', texto: 'Alright, it went through. Bye.', feedback: 'Rude and abrupt'},
            {id: 'opcion-dos', texto: 'Payment done.', feedback: 'Too brief and unprofessional'},
            {id: 'opcion-tres', texto: 'Your payment of $75.00 has been successfully processed. You will receive a confirmation email shortly.', feedback: '✅ Correct answer!', correcta: true},
            {id: 'opcion-cuatro', texto: 'I need your help to answer a survey.', feedback: 'Does not confirm the action was completed'}
        ]
    },
    {
        texto: "A customer wants to know the available payment methods.",
        opciones: [
            {id: 'opcion-uno', texto: 'We take cards and stuff.', feedback: 'Vague and informal'},
            {id: 'opcion-dos', texto: 'You can pays with credit card or debit.', feedback: 'Grammatical error: "pays"'},
            {id: 'opcion-tres', texto: 'We accept all major credit cards, debit cards, and digital wallets like PayPal.', feedback: '✅ Correct answer!', correcta: true},
            {id: 'opcion-cuatro', texto: 'Our company was founded in 1995.', feedback: 'Irrelevant information'}
        ]
    },
    {
        texto: "You need to inform a customer about an outstanding balance.",
        opciones: [
            {id: 'opcion-uno', texto: 'You forgot to pay your bill.', feedback: 'Accusatory and rude'},
            {id: 'opcion-dos', texto: 'You has a balance that is due.', feedback: 'Grammatical error: "You has"'},
            {id: 'opcion-tres', texto: 'Our records show an outstanding balance of $120.50. Would you like to settle that now?', feedback: '✅ Correct answer!', correcta: true},
            {id: 'opcion-cuatro', texto: 'I hope you are having a wonderful day.', feedback: 'Irrelevant to the context'}
        ]
    },
    {
        texto: "A customer is unsure about the security of paying over the phone.",
        opciones: [
            {id: 'opcion-uno', texto: "Don't worry, it's safe.", feedback: 'Too vague and dismissive'},
            {id: 'opcion-dos', texto: 'Our system are very secure.', feedback: 'Grammatical error: "system are"'},
            {id: 'opcion-tres', texto: 'I understand your concern. We use encrypted, PCI-compliant systems to ensure all your details are protected.', feedback: '✅ Correct answer!', correcta: true},
            {id: 'opcion-cuatro', texto: 'Many customers use our services.', feedback: 'Does not address the security concern'}
        ]
    },
    {
        texto: "A customer provides their card number too quickly.",
        opciones: [
            {id: 'opcion-uno', texto: "Whoa, slow down, I'm not a robot.", feedback: 'Unprofessional and informal'},
            {id: 'opcion-dos', texto: 'Please repeat, you spoke too fastly.', feedback: 'Grammatical error: "fastly"'},
            {id: 'opcion-tres', texto: 'I apologize, could you please repeat the card number a little more slowly?', feedback: '✅ Correct answer!', correcta: true},
            {id: 'opcion-cuatro', texto: 'The call quality is not very good today.', feedback: 'Makes an irrelevant excuse'}
        ]
    }
];

let preguntas = []; // copia que vamos a usar para el quiz

// ----------------------------
// 3️⃣ FUNCION PARA MEZCLAR ARRAY
// ----------------------------
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// ----------------------------
// 4️⃣ FUNCION PARA ACTUALIZAR PREGUNTA
// ----------------------------
function actualizarPregunta() {
    if (preguntas.length === 0) {
        terminarQuiz();
        return;
    }

    let indiceAleatorio = Math.floor(Math.random() * preguntas.length);
    let pregunta = preguntas.splice(indiceAleatorio, 1)[0];

    let preguntaElem = document.querySelector('.instrucciones');
    preguntaElem.innerHTML = pregunta.texto;

    mezclarArray(pregunta.opciones);

    for (let i = 0; i < opciones.length; i++) {
        let input = opciones[i].getElementsByTagName('input')[0];
        let label = opciones[i].getElementsByTagName('label')[0];

        input.id = pregunta.opciones[i].id;
        label.innerHTML = pregunta.opciones[i].texto;
        label.setAttribute('for', pregunta.opciones[i].id);

        input.setAttribute('data-feedback', pregunta.opciones[i].feedback);
        if (pregunta.opciones[i].correcta) {
            input.setAttribute('data-correcta', 'true');
        } else {
            input.removeAttribute('data-correcta');
        }

        opciones[i].classList.remove('selected');
        input.checked = false;
    }

    actualizarHead();
}

// ----------------------------
// 5️⃣ FUNCION PARA SELECCION DE OPCIONES (Option Style)
// ----------------------------
function manejarSeleccion() {
    opciones.forEach(function(opcion) {
        opcion.addEventListener('click', function() {
            if (bloqueado) return;
            opciones.forEach(item => item.classList.remove('selected'));
            opcion.classList.add('selected');
        });
    });
}

// ----------------------------
// 6️⃣ FUNCION VALIDACION Y FEEDBACK
// ----------------------------
function validar() {
    if (bloqueado) return;

    let seleccionada = document.querySelector('.option-style.selected');
    if (!seleccionada) {
        popup.classList.add('show');
        popup.innerHTML = 'Please select an option before continuing.';
        bloqueado = true;
        setTimeout(() => {
            popup.classList.remove('show');
            bloqueado = false; // desbloquea apenas desaparece
        }, 1500);
        return;
    }

    let input = seleccionada.querySelector('input');
    let feedbackText = input.getAttribute('data-feedback');
    let esCorrecta = input.getAttribute('data-correcta') === 'true';

    popup.classList.add('show');
    popup.innerHTML = feedbackText;
    bloqueado = true;

    // Sonidos
    if (esCorrecta) {
        let sonidoCorrecto = new Audio('/audio/correct.mp3');
        sonidoCorrecto.play();
        if (navigator.vibrate) navigator.vibrate(200);
        correctasContadas++;
    } else {
        let sonidoIncorrecto = new Audio('/audio/wrong.wav');
        sonidoIncorrecto.play();
    }

    // ⬅ Aquí está la magia: primero quito popup y desbloqueo
    setTimeout(() => {
        popup.classList.remove('show');
        bloqueado = false; // desbloquea click **tan pronto desaparece**
    }, esCorrecta ? 1000 : 3000);

    // Luego actualizo pregunta **con un mínimo retraso para no sobrecargar el DOM**
    setTimeout(() => {
        indiceActual++;
        actualizarPregunta();
    }, 50); // solo 50ms, suficiente para que el usuario pueda clickear
}


// ----------------------------
// 7️⃣ FUNCION ACTUALIZAR HEAD
// ----------------------------
function actualizarHead() {
    let minutos = Math.floor(tiempo / 60);
    let segundos = tiempo % 60;
    let minutosStr = minutos < 10 ? '0' + minutos : minutos;
    let segundosStr = segundos < 10 ? '0' + segundos : segundos;
    head.innerHTML = `Time: ${minutosStr}:${segundosStr} | Correct: ${correctasContadas} / ${indiceActual + preguntas.length + 1}`;
}

// ----------------------------
// 8️⃣ FUNCION INICIAR CRONOMETRO
// ----------------------------
function iniciarCronometro() {
    timerInterval = setInterval(() => {
        tiempo++;
        actualizarHead();
    }, 1000);
}

// ----------------------------
// 9️⃣ FUNCION TERMINAR QUIZ
// ----------------------------
function terminarQuiz() {
    popup.classList.add('show');
    let nota = Math.round((correctasContadas / (indiceActual + 1)) * 100);
    popup.innerHTML = `🎉 Quiz Finished!<br>Score: ${correctasContadas} / ${indiceActual} (${nota}%)`;

    let restartBtn = document.createElement('button');
    restartBtn.innerText = 'Restart Quiz';
    restartBtn.style.backgroundColor = '#F28C28';
    restartBtn.style.color = 'white';
    restartBtn.style.fontWeight = 'bold';
    restartBtn.style.border = 'none';
    restartBtn.style.borderRadius = '15px';
    restartBtn.style.padding = '10px 20px';
    restartBtn.style.cursor = 'pointer';
    restartBtn.style.fontSize = '1em';
    restartBtn.style.marginTop = '20px';

    restartBtn.addEventListener('click', () => {
        popup.classList.remove('show');
        indiceActual = 0;
        correctasContadas = 0;
        tiempo = 0;

        preguntas = [...preguntasOriginales]; // resetear preguntas
        mezclarArray(preguntas);

        actualizarPregunta();
        iniciarCronometro();
    });

    popup.appendChild(restartBtn);

    let sonidoFin = new Audio('/audio/congrats.wav');
    sonidoFin.play();
    clearInterval(timerInterval);
}

// ----------------------------
// 🔟 FUNCION INICIALIZAR
// ----------------------------
function inicializar() {
    preguntas = [...preguntasOriginales]; // copia original
    mezclarArray(preguntas);              // mezclar preguntas
    manejarSeleccion();
    actualizarPregunta();
    continuar.addEventListener('click', validar);
    iniciarCronometro();
}

// ----------------------------
// LLAMADA INICIAL
// ----------------------------
inicializar();
