$(document).ready(function(){
	$.getJSON('/assets/js/words.json', function(data){
		$('.b-random__word').fadeIn().text(data.words[Math.floor(Math.random() * data.words.length)].w);
	});
});