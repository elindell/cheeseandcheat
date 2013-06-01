(function($) {
	$('a.thumb').colorbox({rel:'gal', width:"90%", height:"90%"});
	var fadeTimeMilliseconds = 650;
	var toastDurationMilliseconds = 4000;
	var toastDelayMilliseconds = 1000;
	setTimeout(function() {
		$('#toast').fadeIn(fadeTimeMilliseconds, function() { 
			setTimeout(function() {
				$('#toast').fadeOut(fadeTimeMilliseconds); 
			}, toastDurationMilliseconds);
		});
	}, toastDelayMilliseconds);
	
})($);