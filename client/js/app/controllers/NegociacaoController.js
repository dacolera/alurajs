class NegociacaoController {

    constructor() {
        this._dataInput = $("#data");
        this._quantidadeInput = $("#quantidade");
        this._valorInput = $("#valor");
        this._ordemAtual = '';

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($("#negociacoes")),
            'adiciona',
            'apaga',
            'ordena',
            'inverteOrdem'
        );

        this._mensagens = new Bind(
            new Mensagens(),
            new MensagensView($('#mensagens')),
            'texto'
        );
    }

    adiciona(event) {

        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());

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

        let service = new NegociacaoService();

        Promise.all([
            service.obterNegociacoesDaSemana(),
            service.obterNegociacoesDaSemanaAnterior(),
            service.obterNegociacoesDaSemanaRetrasada()
        ])
        .then(negociacoes => {
            negociacoes
            .reduce((flatArray, array) => flatArray.concat(array) , [])
            .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagens.texto = "Negociacoes importadas com sucesso !";
        })
        .catch(err => this._mensagens.texto = err);
    }

    apagar() {
        this._listaNegociacoes.apaga();
        this._mensagens.texto = 'Negociações apagadas com sucesso !';
    }

    ordena(coluna) {
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }
}