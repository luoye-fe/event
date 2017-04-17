const Event = require('../dist/event.js');

const nameSpaceEvent = new Event();

nameSpaceEvent.on('event1', (msg) => {
	console.log(msg);
});

nameSpaceEvent.emit('event1', '1');

nameSpaceEvent.off('event1');

nameSpaceEvent.emit('event1', '2');

nameSpaceEvent.once('event1', (msg) => {
	console.log(msg);
});

nameSpaceEvent.emit('event1', '3');
nameSpaceEvent.emit('event1', '4');
