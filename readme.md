# vue-watch-value

Add an option to make Vue watchers only trigger when their watchee's value
changes, ignoring reference changes.

For example, suppose you have a Vue instance with a data property `foo`:

```javascript
const vm = new Vue({
	data: {
		foo: [1, 2, 3],
	},
	// ...
});
```

If you later re-set that property to what should be the same value:

```javascript
vm.foo = [1, 2, 3];
```

`foo`'s watcher will still be triggered, even though the two arrays are value-
equivalent.

## Install
```bash
npm install --save vue-watch-value
```

## Usage

```javascript
import VueWatchValue from "vue-watch-value";

Vue.use(VueWatchValue);

const vm = new Vue({
	data: {
		foo: [],
	},
	
	watch: {
		foo: {
			watchValue: true,
			handler(newValue, oldValue) {
				// ...
			},
		},
	},
});
```
