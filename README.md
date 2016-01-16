#Event include on/trigger/one/off



	Event.on('process',function(argvs){
		// callback(argvs)
	});

	Event.trigger('process',argvs);

	Event.off('process',function(){
		// callback
	});

	Event.one('process',function(argvs){
		// callback(argvs)
	});

	
