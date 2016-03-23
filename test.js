var Event = require('./event.js');


Event.on('a',function(msg){
	console.log(msg);
})



Event.trigger('a','111');
Event.trigger('a','111');
Event.trigger('a','111');
Event.trigger('a','111');
Event.trigger('a','111');
Event.trigger('a','111');