$(document).ready(function() {
	console.log("== Teammate's service loaded!");

	// Aaron's microservice
	$('#scores-search-input').keyup(function(){ //text input field
		var searchField = $(this).val();
		if(searchField == '') {
			$('#filter-records').html('');
//			return;			
		}

		$('#scores li').filter(function() {
			$(this).toggle($(this).text().indexOf(searchField) > -1);
		})
	});
});