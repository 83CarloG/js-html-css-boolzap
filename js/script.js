
$(document).ready(function	()	{
	// Scrivere mex e inviarli in chat con un invio
	// Selezion l'input .input-mex  e all'invio mando i mex usando la funzione sendMessage
	$('.input-mex').keypress(function	(e) {
		if (e.which === 13) {
			sendMessage();
		}
	});
	// Seleziono l'input .input-mex  e al click sull'icona mando i mex usando la funzione sendMessage
	$('.send').click(function	()	{
		sendMessage();
	});
	// Quando clicco sulla barra dei mex compare l'icona paper-plane
	$('.input-mex').click(function	() {
		var sendIcon = $('.send');
		sendIcon.find('.fa-microphone').addClass('send-icon');
		sendIcon.find('.fa-paper-plane').removeClass('send-icon');
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
});

// Open inside-menu
$(document).on('click', '.mex__options',
// funzione che scorre fino alla classe inside e la attiva/disattiva
	function	() {
		$(this).siblings('.inside').toggle();
	}
);

// Delete message
$(document).on('click', '.delete',
// funzione che scorre fino al parent .mex-row e lo rimuove (eliminazione mex)
	function	() {
		$(this).parents('.mex-row').remove();
	}
);function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
// Clicco fuori dalla barra dei mex compare l'icona paper-plane

document.addEventListener('click', function (event) {
	if (event.target.className !== 'input-mex') {
		var sendIcon = $('.send');
		sendIcon.find('.fa-paper-plane').addClass('send-icon');
		sendIcon.find('.fa-microphone').removeClass('send-icon');
	}
});

// FUNCTTION
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
		var sendIcon = $('.send');
		sendIcon.find('.fa-paper-plane').addClass('send-icon');
		sendIcon.find('.fa-microphone').removeClass('send-icon');
		// aspetto utra 1s e 5s e mando una risposta con la funzione answer
		setTimeout(answer, getRandomInt(4000, 5001));
		// faccio scendere la scroll fino all'ultimo mex
		var heightChatActive = $('.wrap-main-chat.active').prop('scrollHeight');
		$('.main-chat').scrollTop(heightChatActive);
	}
}

// uguale alla funzione sendmessage tranne per la rimozioni di alcune classi
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

// ritornare ora e minuti in tempo reale
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
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
