function Queue() {
	var functionSet=(function() {
		var _elements=[]; // creating a private array
		return [
		// push function
		function() { return _elements.push .apply(_elements,arguments); },
		// shift function
		function() { return _elements.shift .apply(_elements,arguments); },
		function() { return _elements.length; },
		function(n) { return _elements.length=n; }];
	})();
	this.push=functionSet[0];
	this.shift=functionSet[1];
	this.getLength=functionSet[2];
	this.setLength=functionSet[3];
	// initializing the queue with given arguments
	this.push.apply(this,arguments);
};

 

