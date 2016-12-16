class NegociacaoController {

	adiciona(event) {
		event.preventDefault();

		let data = new Date(...normalizeDate($("#data").value));
		let quantidade = $('#quantidade').value;
		let valor = $('#valor').value;

		console.log({"data":data,"quantidade":quantidade,"valor":valor});
	}
}