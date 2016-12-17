class NegociacaoController {

	constructor() {
		this._dataInput = $("#data");
		this._quantidadeInput = $("#quantidade");
		this._valorInput = $("#valor");

		this._listaNegociacoes = new ListaNegociacoes();

		this._negociacoesView = new NegociacoesView($("#negociacoes"));
		this._negociacoesView.update(this._listaNegociacoes);

		this._mensagens = new Mensagens();
		this._mensagensView = new MensagensView($('#mensagens'));
		this._mensagensView.update(this._mensagens);
	}

	adiciona(event) {

		event.preventDefault();

		this._listaNegociacoes.adiciona(this._criaNegociacao());

		this._mensagens.texto = 'Negociação cadastrada com sucesso !';
		this._mensagensView.update(this._mensagens);

		this._negociacoesView.update(this._listaNegociacoes);
		this._limpaFormulario();
	}

	_limpaFormulario() {

		this._dataInput.value = '';
		this._quantidadeInput.value = 1;
		this._valorInput.value = 0.0;
		this._dataInput.focus();
	}

	_criaNegociacao() {

		return new Negociacao(
			DateHelper.formataData(this._dataInput.value),
			this._quantidadeInput.value,
			this._valorInput.value
		);
	}
}