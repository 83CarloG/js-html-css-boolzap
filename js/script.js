
$(document).ready(function	()	{
	$('.input-mex').keypress(function	(e) {
		if (e.which === 13) {
			sendMessage();
		}
	});

	$('.send-icon').click(function	()	{
		sendMessage();
	});
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
