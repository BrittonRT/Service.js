/*
**  Service.js
**
**  Dependencies: Class.js
*/
;Service = (function(window,document,undefined) {
		'use strict';
		/* -- DEPENDANCIES -- */
		if (!Class) throw new Error('Class.js must be loaded before loading Service.js');
		/* -- CONSTRUCTOR -- */
		var Service = Class.extend(function(options) {
				options = options || {};
				this.startTime   = new Date().getTime();
				this.events      = { message: function(){}, connect: function(){} };
				return this
					.setEventListeners(options.on);
			}),
			_prototype;
		_prototype = Service.prototype;
		/* -- PUBLIC -- */
		_prototype.setEventListeners = function(callbacks) {
			this
				.setConnectListener(callbacks.connect)
				.setMessageListener(callbacks.message);
		}
		_prototype.setMessageListener = function(callback) {
			if (!callback) return this;
			if (typeof callback != 'function') throw new Error('Message callback must be a function.');
			this.events.message = callback;
			return this;
		}
		_prototype.setConnectListener = function(callback) {
			if (!callback) return this;
			if (typeof callback != 'function') throw new Error('Connect callback must be a function.');
			this.events.connect = callback;
			return this;
		}
		/* -- RETURN -- */
		return Service;
	})(window,document);

/*

USAGE:


	EXAMPLE
	----------------------

	hello.js:
	----------------------
		'use strict';
		onmessage = function(e) {
			postMessage("You said: " + e.data);
		}
	----------------------

	index.js
	----------------------
		var helloService = new Service({
				worker: 'hello.js',
				on: {
					message: function(msg) {
						alert(msg);
					}
				}
			});
		myService.message('hello!');   // alerts "You said: hello!" asynchronously
	---------------------
	
	
	INHERITANCE
	---------------------
		
	var TextProcessor = Service.extend(function(text, callback) {
			Service.call(this, {
				worker: 'textProcessor.js',
				on: {
					message: callback
				}
			});
			this.parse(text);
		});
		TextProcessor.prototype.parse = function(text) {
			if (typeof text != 'string') return false;
			this.message(text);
		}
		
	var myTextProcessor = new TextProcessor('some text to process', function(result) {
			alert(result);
		});

*/