class EventBus {
	cache: object;
	constructor() {
		this.cache = {};
	}
	on(key: string, func) {
		(this.cache[key] || (this.cache[key] = [])).push(func);
	}
	once(key: string, func) {
		function on() {
			this.off(key, on);
			func.apply(this, arguments);
		}
		this.on.call(this, key, on);
	}
	off(key: string) {
		this.cache[key] = null;
	}
	emit(key: string, ...args: any[]) {
		const stack = this.cache[key];
		if (stack && stack.length > 0) {
			stack.forEach(item => item.apply(this, args));
		}
	}
}

export default EventBus;
