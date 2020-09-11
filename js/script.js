
$(document).ready(function	()	{
	// Scrivere mex e inviarli in chat con un invio
	// Selezion l'input .input-mex  e all'invio mando i mex usando la funzione sendMessage
	$('.input-mex').keypress(function	(e) {
		if (e.which === 13) {
			sendMessage();
		}
	});
	// Seleziono l'input .input-mex  e al click sull'icona mando i mex usando la funzione sendMessage
	$('.send-icon').click(function	()	{
		sendMessage();
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
			var chatDaAprire = $('.wrap-main-chat')
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
);

function sendMessage ()	{
	var inputValue = $('.input-mex').val();
	if (inputValue !== '') {
		var msgElement = $('.template .mex-row').clone();
		var time = getTime();
		msgElement.find('.mex__text').text(inputValue);
		msgElement.find('.mex__orario').text(time);
		$('.wrap-main-chat.active').append(msgElement);
		$('.input-mex').val('');
		setTimeout(answer, 1000);
		// faccio scendere la scroll fino all'ultimo mex
		var heightChatActive = $('.wrap-main-chat.active').prop('scrollHeight');
		console.log(heightChatActive);
		$('.main-chat').scrollTop(heightChatActive);
	}
}

function answer () {
	var msgElement = $('.template .mex-row').clone();
	var time = getTime();
	msgElement.removeClass('mex-row--sent');
	msgElement.children('.mex').removeClass('mex--green');
	msgElement.find('.mex__text').text('ok');
	msgElement.find('.mex__orario').text(time);
	$('.wrap-main-chat.active').append(msgElement);
	// faccio scendere la scroll fino all'ultimo mex
	var heightChatActive = $('.wrap-main-chat.active').prop('scrollHeight');
	$('.main-chat').scrollTop(heightChatActive);
}

function getTime ()	{
	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	var time = hours + ':' + minutes;
	return time;
}
