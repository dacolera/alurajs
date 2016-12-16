document.addEventListener("DOMContentLoaded", function() {
 	window.$ = document.querySelector.bind(document);
 	window.normalizeDate = function(date) {
 		return date
 			.split('-')
 			.map((value, index) => value - index % 2);
 	};
});
