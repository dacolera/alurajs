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
		this._negociacoes_proxy = {};
	}

	adiciona(event) {

		event.preventDefault();

		let self = this;
		this._negociacoes_proxy = new Proxy(this._listaNegociacoes, {

			get(target, prop, proxy) {

				if (['adiciona', 'apaga'].includes(prop) && typeof(target[prop]) === typeof(Function)) {

					return function() {
						Reflect.apply(target[prop], target, arguments);
						self._negociacoesView.update(target);
					};
				}
				return Reflect.get(target, prop, proxy);
			}
		});

		this._negociacoes_proxy.adiciona(this._criaNegociacao());

		this._mensagens.texto = 'Negociação cadastrada com sucesso !';
		this._mensagensView.update(this._mensagens);

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

	apagar() {
		this._negociacoes_proxy.apaga();
		this._mensagens.texto = 'Negociações apagadas com sucesso !';
		this._mensagensView.update(this._mensagens);
	}
}