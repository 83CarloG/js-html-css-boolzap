
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
			var amicoSelezionato = $(this).attr('data-contatto');
			var chatDaAprire = $('.main-chat')
			console.log(chatDaAprire)
			chatDaAprire.each(function	() {
				var chat = $(this).attr('data-conversazione');
				if (chat === amicoSelezionato) {
					$(this).addClass('active');
				} else {
					$(this).removeClass('active');
				}
			});

		});
	// attr('attribute', 'value');
});

function sendMessage ()	{
	var inputValue = $('.input-mex').val();
	if (inputValue !== '') {
		var msgElement = $('.template .mex-row').clone();
		var time = getTime();
		msgElement.find('.mex__text').text(inputValue);
		msgElement.find('.mex__orario').text(time);
		$('.wrap-main-chat').append(msgElement);
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
	$('.wrap-main-chat').append(msgElement);
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
