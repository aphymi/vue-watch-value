import Vue from "vue";

import * as VueWatchValue from "./vue-watch-value.js";

const watchValueOption = "watchValue";

Vue.use(VueWatchValue);

let vm, spy;

function setup(propName, propValue, shouldWatchValue) {
	spy = jest.fn();
	
	vm = new Vue({
		data: {
			[propName]: propValue,
		},
		
		watch: {
			[propName]: {
				[watchValueOption]: shouldWatchValue,
				handler() {
					spy(propName);
				},
			},
		},
	});
}

test(
	"vanilla behavior triggers watcher with reference update",
	async () => {
		setup("foo", [], false);
		vm.foo = [];
		await Vue.nextTick();
		
		expect(spy).toHaveBeenCalled();
	},
);

test(
	"plugin does not trigger watcher with reference update",
	async () => {
		setup("foo", [], true)
		vm.foo = [];
		await Vue.nextTick();
		
		expect(spy).not.toHaveBeenCalled();
	},
);

test(
	"plugin triggers watcher with value update",
	async () => {
		setup("foo", [], true);
		vm.foo = [1];
		await Vue.nextTick();
		
		expect(spy).toHaveBeenCalled();
	},
);

test(
	"plugin does not trigger watcher with set-reordering reference update",
	async () => {
		setup("foo", new Set([1,2]), true);
		vm.foo = new Set([2,1]);
		await Vue.nextTick();
		
		expect(spy).not.toHaveBeenCalled();
	},
);

test(
	"plugin allows watch callback to access vm via `this`",
	async () => {
		spy = jest.fn();
		
		vm = new Vue({
			data: {
				foo: [1],
			},
			watch: {
				foo: {
					watchValue: true,
					handler() {
						spy(this);
					},
				},
			},
		});
		vm.foo = 2;
		await Vue.nextTick();
		
		expect(spy).toHaveBeenCalledWith(vm);
	},
)
