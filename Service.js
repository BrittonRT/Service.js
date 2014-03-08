;Service = (function() {
		'use strict';
		/* -- CONSTRUCTOR -- */
		var Service = Class.extend(function(options) {
				this.startTime   = new Date().getTime();
				this.events      = { message: function(){} };
				this.worker      = { message: function() { throw new Error('Must set a worker script before sending a message to it') } };
				this.setOptions(options||{});
			}),
			_prototype;
		_prototype = Service.prototype;
		/* -- PUBLIC -- */
		_prototype.setOptions = function(options) {
			this
				.setWorker(options.worker)
				.setEventListeners(options.on);
		}
		_prototype.setWorker = function(uri) {
			var _this = this;
			this.worker = new Worker(uri);
			this.worker.onmessage = function(e){
				_this.events.message(e.data);
			};
			return this;
		}
		_prototype.setEventListeners = function(callbacks) {
			this.setMessageListener(callbacks.message);
		}
		_prototype.setMessageListener = function(callback) {
			if (typeof callback != 'function') throw new Error('Message callback must be a function.');
			this.events.message = callback;
		}
		_prototype.message = function(message) {
			this.worker.postMessage(message);
		}
		/* -- RETURN -- */
		return Service;
	})();