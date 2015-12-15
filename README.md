#Event include on/trigger/one/off



	Event.on('process',function(argvs){
		// callback
	});

	Event.trigger('process',argvs);

	Event.off('process');

	Event.one('process',function(argvs){
		// callback
	});

	// namesapce
	Event.create('namespace1').on('load',function(argvs){
		// callback
	});
	Event.create('namespace2').on('load',function(argvs){
		// callback
	});
