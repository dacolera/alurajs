class NegociacaoController {

	constructor() {
		this._dataInput = $("#data");
		this._quantidadeInput = $("#quantidade");
		this._valorInput = $("#valor");

		this._negociacoes = new Bind(
			new ListaNegociacoes(),
			new NegociacoesView($("#negociacoes")),
			'adiciona',
			'apaga'
		);

		this._mensagens = new Bind(
			new Mensagens(),
			new MensagensView($('#mensagens')),
			'texto'
		);
	}

	adiciona(event) {

		event.preventDefault();

		this._negociacoes.adiciona(this._criaNegociacao());

		this._mensagens.texto = 'Negociação cadastrada com sucesso !';

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

	importaNegociacoes() {

		let xhr = new XMLHttpRequest();
		let self = this;
		xhr.open('GET', 'negociacoes/semana');

		xhr.onreadystatechange = function() {

			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					JSON.parse(xhr.response)
					.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor))
					.forEach(negociacao => self._negociacoes.adiciona(negociacao));
					self._mensagens.texto = "Negociacoes importadas com sucesso !";
				} else {
					self._mensagens.texto = "Nao foi possivel importar as negociacoes !";
				}
			}
		};

		xhr.send();
	}

	apagar() {
		this._negociacoes.apaga();
		this._mensagens.texto = 'Negociações apagadas com sucesso !';
	}
}