class DateHelper {

	constructor() {
		throw Error("Esta classe nao pode ser instanciada");
	}

	static formataData(param) {

		if (typeof(param) == 'string') {

			if (! /^\d{4}-\d{2}-\d{2}$/.test(param)) {
				throw Error("O parametro deve seguir o padrao aaaa-mm-dd");
			}

			return new Date(...param.split('-').map((item, index) => item - index % 2));

		} else if (typeof(param) == 'object') {

			if (! (param instanceof Date)) {
				throw Error("Parametro invalido !! Parametros aceitos : Date Object e string padrao aaaa-mm-dd");
			}

			return [param.getDate(), param.getMonth(), param.getFullYear()]
				.map((item, index) => item + index % 2)
				.join('/');
		}

		throw Error("Parametro invalido !! Parametros aceitos : Date Object e string padrao aaaa-mm-dd");
	}
}