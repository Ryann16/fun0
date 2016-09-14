function cloneObject(obj) {
	var clone = {};
	for(var i in obj) {
		if(typeof obj[i] != "object" || (obj[i] === null)) {
			clone[i] = obj[i];
		} else {
			clone[i] = cloneObject(obj[i]);
		}
	}
	return clone;
}
var obj = {
	x: 1,
	y: [1, 2, 4],
	move: function(x, y) {
		this.x = x+y;
	}
}

var b = cloneObject(obj);