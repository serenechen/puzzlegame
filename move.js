function getStyle(obj,name) {
	return (obj.currentStyle||getComputedStyle(obj,false))[name];
}
function move(obj,json,options) {
	options = options||{};
	options.time = options.time||300;
	options.type = options.type||'ease-out';
	var start = {};
	var dis = {};
	for(var name in json) {
		start[name] = parseFloat(getStyle(obj,name));
		if(isNaN(start[name])) {
			switch(start[name]) {
				case 'width':
				start[name] = obj.offsetWidth;
				break;
				case 'height':
				start[name] = obj.offsetHeight;
				break;
				case 'left':
				start[name] = obj.offsetLeft;
				break;
				case 'top':
				start[name] = obj.offsetTop;
				break;
			}
		}
		dis[name] = json[name]-start[name];
	}
	var n = 0;
	var count = Math.round(options.time/30);
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		n++;
		for(var name in json) {
			switch(options.type) {
				case 'linear':
				var a = n/count;
				var cur = start[name]+dis[name]*a;
				break;
				case 'ease-in':
				var a = n/count;
				var cur = start[name]+dis[name]*Math.pow(a,3);
				break;
				case 'ease-out':
				var a = 1-n/count;
				var cur = start[name]+dis[name]*(1-Math.pow(a,3));
				break;
			}
			if(name=='opacity') {
				obj.style.opacity=cur;
				obj.style.filter = 'alpha(opacity:'+cur*100+')';
			} else {
				obj.style[name] = cur+'px';
			}
		}
		if(count==n) {
			clearInterval(obj.timer);
			options.fn&&options.fn();
		}
	},30);
}