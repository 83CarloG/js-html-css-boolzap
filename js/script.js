
$(document).ready(function() {

	$('.input-mex').keypress(function	(e) {
		if (e.which === 13) {
			var inputValue = $(this).val();
			var msgElement = $('.template .messaggio-riga').clone();
			if (inputValue !== '') {
				msgElement.find('.mex-testo').text(inputValue);
				$('.wrap-main-chat').append(msgElement);
				$(this).val('');
			}
		}
	});

	$('.send-icon').click(function	(){
		var inputValue = $('.input-mex').val();
		var msgElement = $('.template .messaggio-riga').clone();
		if (inputValue !== '') {
			msgElement.find('.mex-testo').text(inputValue);
			$('.wrap-main-chat').append(msgElement);
			$('.input-mex').val('');
		};
	});
});
