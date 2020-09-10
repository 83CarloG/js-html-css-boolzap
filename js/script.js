
$(document).ready(function	()	{
	$('.input-mex').keypress(function	(e) {
		if (e.which === 13) {
			sendMessage();
		}
	});

	$('.send-icon').click(function	()	{
		sendMessage();
	});

	// $('.ricerca__input').keyup(function	()	{
	// 	var text = $(this).val().toLowerCase();
	// 	$('.amici__item').hide();
	// 	$('.amici__item:contains("' + text + '")').show();
	// });

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
