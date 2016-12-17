class NegociacaoService {

	obterNegociacoesDaSemana() {

		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();

			xhr.open('GET', 'negociacoes/semana');

			xhr.onreadystatechange = function() {

				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						resolve(JSON.parse(xhr.response)
							.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor))
						);
					} else {
						reject("Erro ao tentar obter as negociacoes da semana.");
					}
				}
			};

			xhr.send();
		});
	}

	obterNegociacoesDaSemanaAnterior() {

		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();

			xhr.open('GET', 'negociacoes/anterior');

			xhr.onreadystatechange = function() {

				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						resolve(JSON.parse(xhr.response)
							.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor))
						);
					} else {
						reject("Erro ao tentar obter as negociacoes da semana anterior.");
					}
				}
			};

			xhr.send();
		});
	}

	obterNegociacoesDaSemanaRetrasada() {

		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();

			xhr.open('GET', 'negociacoes/retrasada');

			xhr.onreadystatechange = function() {

				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						resolve(JSON.parse(xhr.response)
							.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor))
						);
					} else {
						reject("Erro ao tentar obter as negociacoes da semana retrasada.");
					}
				}
			};

			xhr.send();
		});
	}
}