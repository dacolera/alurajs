;(function(document, window, undefined){
    window.$ = document.querySelector.bind(document);
})(document, window);

var ConnectionFactory = (function(){

    var config = {
        version : 4,
        dbname : 'aluraframe',
        stores : [
            'negociacoes'
        ],
        connection : null
    };

    return class ConnectionFactory {

        constructor() {
            throw Error('Não é possivel criar uma instância de ConnectionFactory');
        }

        static getConnection() {

            return new Promise((resolve, reject) => {
                let openRequest = window.indexedDB.open(config.dbname, config.version);

                openRequest.onupgradeneeded = e => ConnectionFactory._createStore(e.target.result);

                openRequest.onsuccess = e => {
                    config.connection = null !== config.connection ? config.connection : e.target.result;
                    resolve(config.connection);
                }

                openRequest.onerror = e => reject(e.target.error.name);
            });
        }

        static _createStore(connection) {

            config.stores.forEach(store => {

                if(connection.objectStoreNames.contains(store)) {
                    connection.deleteObjectStore(store);
                }

                connection.createObjectStore(store, { autoIncrement: true });
            });
        }
    }

})();
