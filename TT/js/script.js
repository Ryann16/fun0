// 拓展对象功能 
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, '');
}

Object.prototype.hasClass = function(className) {
	var nameStr = this.className;
	var reg = new RegExp('\\s+'+className+'\\s+');
	if((' '+nameStr+' ').match(reg)) {
		return true;
	}
}
Object.prototype.addClass = function(className) {
	if(this.hasClass(className)) {
		return this;
	} else {
		this.className += ' '+className;
		return this;
	}
}
Object.prototype.removeClass = function(className) {
	var reg = new RegExp('\\s+'+className+'\\s+');
	this.className = (' '+this.className+' ').replace(reg, ' ').trim();
	return this;
}
function extend(o1, o2) {
	for(var i in o2) {
		if(typeof i === 'undefined') {
			o1[i] = o2[i];
		}
	}
	return o1;
}
function html2node(str) {
	var container = document.createElement('div');
	container.innerHTML = str;
	return container.children[0];
}


// 生成环绕图形，可生成页面活动2环绕的点和方块
// itemTemp可改进为对象或数组，这样就可以传入不同模版
function createRoundObj(node, num, itemWidth, itemTmp) {
	var arr = ['top', 'right', 'bottom', 'left'];
	var i, j, item, fragment1, divide;
	var conW = node.clientWidth;
	// 如果输入的宽度是百分比
	if(typeof itemWidth === 'string') {
		var a = parseFloat(itemWidth.match(/^\d+/)[0]);
		itemWidth = conW * a / 100; 
	}
	var margin = (conW - (num+1)*itemWidth)/num;
	var flag = num%2, itemNode;
	fragment1 = document.createDocumentFragment();
	node.style.height = conW + 'px';
	for(i = 0; i < arr.length; i++) {
		var arr1 = ['marginRight', 'marginBottom', 'marginLeft', 'marginTop'];

		divide = document.createElement('div');
		divide.className = arr[i];
		for(j = 0; j < (num); j++) {
			item = itemTmp? html2node(itemTmp) : document.createElement('span');
			item.className = 'roundObj';
			divide.appendChild(item);
			item.style[arr1[i]] = margin +'px';
			item.style.width = itemWidth + 'px';
			item.style.height = itemWidth + 'px';
		}
		switch(arr[i]) {
			case 'left':
			case 'right':
				divide.style.width = itemWidth + 'px';
			
		}
		if(flag && ((i === 1) || (i === 3))) {
			// 生成过程，所有不需要判断是否有重名类
			divide.className += (' ' + 'z-ji');
		}
		fragment1.appendChild(divide);
	}

	return node.appendChild(fragment1);
}

// 给父节点子元素循环添加类名，可传入切换时长，回调函数
var timeClock = null;
function inturnViewChg(parNode, selector, addClassN, milsec, begin, callback) {
	var children = parNode.querySelectorAll(selector);
	// 如果节点没有默认样式， 清除原有节点被选中样式
	if(!begin) {
		var oldNode = parNode.getElementsByClassName(addClassN)[0];
	}
	if(oldNode) {
		console.log(oldNode);
		oldNode.removeClass(addClassN);
	}
	var min = 0, max = children.length-1;
	var i = 0;
	if(begin) {
		if(callback) {callback(children[i]);};
		i+=begin;}
	timeClock = setInterval(function() {	
		children[i].addClass(addClassN);
		prev(i).removeClass(addClassN);
		if(callback) { callback(children[i]); }
		i++;
		if(i === children.length) { i = min;}
	}, milsec);
	function prev(index) {
		if(index === min) {
			return children[max];
		}
		return children[--index];
	}
	function next(index) {
		if(index === max) {
			return children[min];
		}
		return children[++index];
	}
}
// 幻灯片轮播，传入幻灯片节点，轮播时间，初始位置（1开始）
function runSlide(parNode, milsec, begin){
	var pointer = parNode.querySelector('.u-pointer');
	var parent = parNode.parentNode;
	var cardWrap = parent.getElementsByClassName('m-cardWrap')[0];
	inturnViewChg(parNode, 'ol>li', 'z-crt', milsec, begin, function() {
		var cur = arguments[0];
		cardWrap.removeClass('cardLimit');
		if(cur.dataset.special == 'limit') {
			setTimeout(function(){cardWrap.addClass('cardLimit')}, milsec/2);
		}
	});
	inturnViewChg(pointer, 'i', 'z-crt', milsec, begin);
}

// 点击抽奖按钮
function getPrice() {
	var chance = 3;
	var priceBox = document.querySelector('.m-round1');
	var chouBtn = document.getElementById('chouBtn');
	var timeClock1 = null;
	var speed = 50, longBase = 2000, seed = 2000, long;
	chouBtn.addEventListener('click', function(){
		// 如果正在抽奖，取消操作
		if(timeClock1) {return;}
		// 结束上次抽奖计时
		if(timeClock) {clearInterval(timeClock);}
		// 有剩余抽奖次数
		if(chance) {
			long = longBase + seed*Math.random();
			inturnViewChg(priceBox, '.roundObj', 'z-crt', speed);
			timeClock1 = setTimeout(function() {
				clearInterval(timeClock);
				timeClock1 = null;
			}, long);
		} else {
			alert('您已用光抽奖次数');
			return;
		}
		chance--;
		document.getElementById('leftTimes').innerText = chance;	
	});
}

