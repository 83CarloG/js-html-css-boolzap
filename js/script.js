
$(document).ready(function	()	{
	// Scrivere mex e inviarli in chat con un invio
	// Selezion l'input .input-mex  e all'invio mando i mex usando la funzione sendMessage
	$('.input-mex').keypress(function	(e) {
		if (e.which === 13) {
			cambioClasse('.avatar-text', '.avatar-last-access', '.avatar-wait', 'avatar-active');
			sendMessage();
		}
	});
	// Seleziono l'input .input-mex  e al click sull'icona mando i mex usando la funzione sendMessage
	$('.send').click(function	()	{
		cambioClasse('.avatar-text', '.avatar-last-access', '.avatar-wait', 'avatar-active');
		sendMessage();
	});
	// Quando clicco sulla barra dei mex compare l'icona paper-plane
	$('.input-mex').click(function	() {
		cambioClasse('.send', '.fa-microphone', '.fa-paper-plane', 'hide-icon');
	});

	// Scrivere un mex in chat e inviarlo con un'icona
	// Seleziono l'input della classe .ricerca__input e uso keyup per registrare
	$('.ricerca__input').keyup(function	()	{
		// i dati inseriti li trasformo in minuscolo
		var serchInput = $(this).val().toLowerCase();
		// seleziono .amici__nome che nel DOM mi viene restituito sotto forma di array
		var contactsName = $('.amici__nome');
		// ciclo i nomi e verifico con includes se ci sono, uso show e hide  sulla classe amici__item
		// per visualizzare i contatti cercati
		contactsName.each(function	() {
			var name = $(this).text().toLowerCase();
			if (name.includes(serchInput)) {
				$(this).parents('.amici__item').show();
			} else {
				$(this).parents('.amici__item').hide();
			}
		});
	});
	// Selezionare dai miei contatti la chat corretta e aggiornare l'avatar con cui sto interagendo
	// Seleziono il div amici__item con un click
	$('.amici__item').click(
		function	() {
			// Seleziono l'attributo data-contatto
			var dataAmicoSelezionato = $(this).attr('data-contatto');
			// Insieme delle chat in forma di Array
			var chatDaAprire = $('.wrap-main-chat');
			// Ciclo le chat
			chatDaAprire.each(function	() {
				// seleziono una chat e chiedo di restituirmi il valore di .data-conversazione
				var chat = $(this).attr('data-conversazione');
				// se c'è corrispondenza tra data contatto e data conversazioneattivo la classe active e last()
				// rimuovo dalle altre
				if (chat === dataAmicoSelezionato) {
					$(this).addClass('active');
				} else {
					$(this).removeClass('active');
				}
				displayLastMex();
			});
			// Cambio la classe active sull'amico con cui sto chattando
			$('.amici__item').each(function	() {
				$(this).removeClass('amici__item--active');
			});
			$(this).addClass('amici__item--active');
			// Cambio l'avatar in cima alla chat
			var avatarAmico = $('.amici__item--active .icona-profilo img').attr('src');
			$('.avatar .icona-profilo img').attr('src', avatarAmico);
			// Cambio il nome in cima alla chat
			var nomeAmico = $('.amici__item--active .amici__descrizione h4').text();
			$('.avatar .avatar-text h4').text(nomeAmico);
			// Aggiorno l'ora all'ultimo accesso
			var time = $(this).find('.amici_ultimo-accesso').text();
			$('.avatar .avatar-last-access time').text(time);
		});
		// Attiva disattiva notifiche - profilo__icona
		$('.notifiche__icona').click(function	() {
			$('.fa-bell').toggle();
			$('.fa-bell-slash').toggle();
		});
});
// Appare e scompare al passaggio del mouse sul mex l'icona del menu a tendina
//	per l'eliminazione del mex
$(document).on('mouseenter', '.mex',
	function () {
		$(this).find('.fa-angle-down').addClass('fa-angle-down--display');
	}
);
$(document).on('mouseleave', '.mex',
	function () {
		$(this).find('.fa-angle-down').removeClass('fa-angle-down--display');
	}
);

// Open inside-menu
$(document).on('click', '.mex__options',
// funzione che scorre fino alla classe inside e la attiva/disattiva
	function	() {
		$(this).siblings('.inside').toggle();
		displayLastMex();
	}
);
// Delete message
$(document).on('click', '.delete',
// funzione che scorre fino al parent .mex-row e lo rimuove (eliminazione mex)
	function	() {
		$(this).parents('.mex-row').remove();
	}
);
// Clicco fuori dalla barra dei mex compare l'icona paper-plane
document.addEventListener('click', function (event) {
	if (event.target.className !== 'input-mex') {
		cambioClasse('.send', '.fa-paper-plane', '.fa-microphone', 'hide-icon');
	}
});

// FUNCTION
// Funzione per mandare mex dalla chat
function sendMessage ()	{
	// raccolgo quello inserito dall'utente con il metodo val
	var inputValue = $('.input-mex').val();
	// se il mex non è in bianco procedo
	if (inputValue !== '') {
		// clono il mio template
		var msgElement = $('.template .mex-row').clone();
		// uso la funzione getTime per prendere l'ota
		var time = getTime();
		// setto il testo
		msgElement.find('.mex__text').text(inputValue);
		// setto l'ora
		msgElement.find('.mex__orario').text(time);
		// appendo tutto alla chat attiva
		$('.wrap-main-chat.active').append(msgElement);
		// pulisco la barra di insermineto del mex e rimetto il microfono come icona
		$('.input-mex').val('');
		cambioClasse('.send', '.fa-paper-plane', '.fa-microphone', 'hide-icon');
		// aspetto utra 1s e 5s e mando una risposta con la funzione answer
		setTimeout(function	() {
			answer(); // runs first
			cambioClasse('.avatar-text', '.avatar-wait', '.avatar-last-access', 'avatar-active');
		},	getRandomInt(4000, 5001));
		// faccio scendere la scroll fino all'ultimo mex
		displayLastMex();
	}
}

// Funzione answer, mex di risposta.
function answer () {
	var msgElement = $('.template .mex-row').clone();
	var time = getTime();
	msgElement.removeClass('mex-row--sent');
	msgElement.children('.mex').removeClass('mex--green');
	msgElement.find('.mex__text').text('ok');
	msgElement.find('.mex__orario').text(time);
	$('.wrap-main-chat.active').append(msgElement);
	var heightChatActive = $('.wrap-main-chat.active').prop('scrollHeight');
	$('.main-chat').scrollTop(heightChatActive);
}

// Funzione per ritornare ora e minuti in tempo reale
function getTime ()	{
	// creo l'oggetto date
	var date = new Date();
	// pesco  ora e minuti dall'oggetto date
	var hours = date.getHours();
	var minutes = date.getMinutes();
	// piccolo accorgimento per i minuti < 10
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	// unisco tutto e restituisco time per usarlo in altri ambiti
	var time = hours + ':' + minutes;
	return time;
}

// Numero random
function getRandomInt	(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //	The maximum is exclusive and the minimum is inclusive
}

// Funzione cambio classe
function cambioClasse (divParent, aggiungi, togli, classeVisual) {
	var sendIcon = $(divParent);
	sendIcon.find(aggiungi).addClass(classeVisual);
	sendIcon.find(togli).removeClass(classeVisual);
}

// Funzione per avere sempre il display sull'ultimo mex
function displayLastMex	() {
	var heightChatActive = $('.wrap-main-chat.active').prop('scrollHeight');
	$('.main-chat').scrollTop(heightChatActive + 100);
}
