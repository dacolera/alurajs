class NegociacaoService {

	obterNegociacoesDaSemana(cb) {

		let xhr = new XMLHttpRequest();

		xhr.open('GET', 'negociacoes/semana');

		xhr.onreadystatechange = function() {

			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					cb(null, JSON.parse(xhr.response)
						.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor))
					);
				} else {
					cb("Erro ao tentar obter as negociacoes da semana.", null);
				}
			}
		};

		xhr.send();
	}
}