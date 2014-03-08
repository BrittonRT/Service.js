Service.js
==========

Simple extensible worker module

USAGE:
<pre>
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
</pre>