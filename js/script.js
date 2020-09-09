
$(document).ready(function	()	{
	$('.input-mex').keypress(function	(e) {
		if (e.which === 13) {
			sendMessage();
			setTimeout(answer, 1000);
		}
	});

	$('.send-icon').click(function	()	{
		sendMessage();
		setTimeout(answer, 1000);
	});
	// Mettiamo i contatti in un array, anche aggiungendo nuovi amici non avrò problemi
	var contatti = [];
	$('.amici__descrizione').each(
		function	() {
			contatti.push($(this).find('.amici__nome').text());
		}
	);
	console.log(contatti);
});

function sendMessage ()	{
	var inputValue = $('.input-mex').val();
	if (inputValue !== '') {
		var msgElement = $('.template .mex-row').clone();
		var date = new Date();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var time = hours + ':' + minutes;
		msgElement.find('.mex__text').text(inputValue);
		msgElement.find('.mex__orario').text(time);
		$('.wrap-main-chat').append(msgElement);
		$('.input-mex').val('');
	}
}

function answer () {
	var msgElement = $('.template .mex-row').clone();
	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var time = hours + ':' + minutes;
	msgElement.removeClass('mex-row--sent');
	msgElement.children('.mex').removeClass('mex--green');
	msgElement.find('.mex__text').text('ok');
	msgElement.find('.mex__orario').text(time);
	$('.wrap-main-chat').append(msgElement);
}
