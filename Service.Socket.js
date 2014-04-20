/*
**  Service.Socket.js
**
**  Dependencies: Service.js
*/
;Service.Socket = (function(window,document,Service,undefined) {
		'use strict';
		/* -- DEPENDANCIES -- */
		if (!Service) throw new Error('Service.js must be loaded before loading Service.Socket.js');
		/* -- CONSTRUCTOR -- */
		var Socket = Service.extend(function(options) {
				Service.call(this, options);
				options = options || {};
				options.on = options.on || {};
				return this
					.setUrl(options.url);
			}),
			_prototype;
		_prototype = Socket.prototype;
		/* -- PUBLIC -- */
		_prototype.setUrl = function(uri) {
			if (uri == undefined) return;
			var _this   = this,
				_events = this.events,
				_socket = this.socket = new WebSocket(uri);
			_socket.onopen = function() {
				_socket.onmessage = function(e){
					_events.message(e.data);
				};
				_events.connect.bind(this)();
			}
			return this;
		}
		_prototype.message = function(message) {
			this.socket.send(message);
			return this;
		}
		/* -- RETURN -- */
		return Socket;
	})(window,document,Service);