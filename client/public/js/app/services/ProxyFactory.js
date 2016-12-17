class ProxyFactory {

	static create(objeto, props, callback) {

		return new Proxy(objeto, {

			get(target, prop, proxy) {

				if (props.includes(prop) && ProxyFactory._isFunction(target[prop])) {

					return function() {
						Reflect.apply(target[prop], target, arguments);
						callback(target);
					};
				}
				return Reflect.get(target, prop, proxy);
			},
			
			set(target, prop, value, proxy) {
				if (props.includes(prop)) {
					target[prop] = value;
                     callback(target);
				}

				return Reflect.set(target, prop, value, proxy);
			}
		});
	}

	static _isFunction(fn) {
		return typeof(fn) === typeof(Function);
	}
}