# vue-watch-value

Add an option to make Vue watchers only trigger when their watchee's value
changes, ignoring reference changes.

For example, suppose you have a Vue instance with a data property `foo`:

```javascript
const vm = new Vue({
	data: {
		foo: [1, 2, 3],
	},
	watch: {
		foo() {
			// ...
		}
	}
});
```

If you later re-set that property to what should be the same value:

```javascript
vm.foo = [1, 2, 3];
```

`foo`'s watcher will still be triggered, even though the two arrays are
value-equivalent.

If this package's `watchValue` is set on a watcher, though, the watchee's old
and new values will be compared for value-equality, and the watcher will only
be triggered when they're inequivalent.

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
