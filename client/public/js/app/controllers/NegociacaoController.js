class NegociacaoController {

	adiciona(event) {
		event.preventDefault();

		let data = DateHelper.formataData($("#data").value);
		let quantidade = $('#quantidade').value;
		let valor = $('#valor').value;

		let negociacao = new Negociacao(data, quantidade, valor);

		console.log(negociacao);
		console.log(DateHelper.formataData(negociacao.data));
	}
}