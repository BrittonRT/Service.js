/*
**  Service.Worker.js
**
**  Dependencies: Service.js
*/
;Service.Worker = (function(window,document,Service,undefined) {
		'use strict';
		/* -- DEPENDANCIES -- */
		if (!Service) throw new Error('Service.js must be loaded before loading Service.Socket.js');
		/* -- CONSTRUCTOR -- */
		var _Worker = Service.extend(function(options) {
				Service.call(this, options);
				options = options || {};
				return this
					.setImportListener(options.on ? options.on.import : false)
					.setUrl(options.url);
			}),
			_prototype;
		_prototype = _Worker.prototype;
		/* -- PUBLIC -- */
		_prototype.setUrl = function(uri) {
			if (uri == undefined) return;
			var _this   = this,
				_events = this.events;
			this.worker = new Worker(uri);
			this.worker.onmessage = function(e){
				_events.message(e.data);
			};
			_events.connect.bind(this)();
			return this;
		}
		_prototype.setImportListener = function(callback) {
			if (!callback) return this;
			if (typeof callback != 'function') throw new Error('Import callback must be a function.');
			this.events.import = callback;
			return this;
		}
		_prototype.message = function(message) {
			this.worker.postMessage(message);
			return this;
		}
		_prototype.export = function(obj, buffers) {
			if (!buffers) obj = buffers = obj.buffers;
			this.worker.postMessage(obj, buffers);
			return this;
		}
		/* -- PRIVATE -- */
		/* CAN'T BE IMPLEMENTED UNTIL TRANSFERABLE OBJECTS ARE BIDIRECTIONAL
		function createOnMessage(_import, _events) {
			if (!import)
				return function(e){
					_events.message(e.data);
				};
			else
				return function(e){
					_events.import(e.data);
				};
		}
		/* -- RETURN -- */
		return _Worker;
	})(window,document,Service);