const deepEqual = require("fast-deep-equal/es6");

const watchValueOption = "watchValue";

module.exports = {
	install(Vue, _options) {
		Vue.mixin({
			beforeCreate() {
				// Save a reference to the proper $watch function so that we can
				// call it later, after overriding it.
				const $watch = this.$watch.bind(this);
				
				this.$watch = function(expOrFn, callback, options) {
					if (!options || !options[watchValueOption]) {
						return $watch(expOrFn, callback, options);
					}
					
					callback = callback.bind(this);
					
					function compareValueCallback(newValue, oldValue) {
						// Only call the callback if there's been an actual
						// value change, and not just a reference change.
						if (!deepEqual(newValue, oldValue)) {
							callback(newValue, oldValue);
						}
					}
					
					return $watch(expOrFn, compareValueCallback, options);
				};
			},
		});
	},
};
