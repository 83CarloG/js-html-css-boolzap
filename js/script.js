
$(document).ready(function	()	{
	$('.input-mex').keypress(function	(e) {
		if (e.which === 13) {
			sendMessage();
		}
	});

	$('.send-icon').click(function	()	{
		sendMessage();
	});

	$('.ricerca__input').keyup(function	()	{
		var serchInput = $(this).val().toLowerCase();
		var contactsName = $('.amici__nome');
		contactsName.each(function	() {
			var name = $(this).text().toLowerCase();
			if (name.includes(serchInput)) {
				$(this).parents('.amici__item').show();
			} else {
				$(this).parents('.amici__item').hide();
			}
		});
	});
	// Seleziono il div amici__item
	$('.amici__item').click(
		function	() {
			// Seleziono l'attributo data-contatto
			var dataAmicoSelezionato = $(this).attr('data-contatto');
			var chatDaAprire = $('.wrap-main-chat')
			chatDaAprire.each(function	() {
				var chat = $(this).attr('data-conversazione');
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
			var avatarAmicoChatTop = $('.avatar .icona-profilo img').attr('src', avatarAmico);
			// Cambio il nome in cima alla chat
			var nomeAmico = $('.amici__item--active .amici__descrizione h4').text();
			var nomeAmicoChatTop = $('.avatar .avatar-text h4').text(nomeAmico);
		});
	// Faccio apparire il menu a tendina
	$('.mex-row .mex .mex__options').on('click', (function () {
		
	} )
);

});

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
