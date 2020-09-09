
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
	$('.ricerca__input').keyup(function(){
		// Search text
		var text = $(this).val().toLowerCase();
		var containerSerch = $
		// Hide all content class element
		$('.amici__item').hide();

		// Search and show
		$('.amici__item:contains("'+text+'")').show();
		// Search
   // $('.amici__nome"').each(function(){
	 //
   //  if($(this).text().toLowerCase().indexOf(""+text+"") != -1 ){
   //   $(this).closest('.amici__item').show();
   //  }
  	// 	});
 			});

	$('.ricerca__input').keyup(function(){

 // Search text
 var text = $(this).val();

 // Hide all content class element
 $('.amici__item').hide();

 // Search and show
 $('.amici__item:contains("'+text+'")').show();

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
