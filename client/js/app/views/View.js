class View {

    constructor(elemento) {
        this._elemento = elemento;
    }

    template(model) {
        throw Error("Esse metodo deve ser implementado nas subclasses de View");
    }

    update(model) {
        this._elemento.innerHTML = this.template(model);
    }
}