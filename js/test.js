// 基于任务18
// 限制输入的数字在10-100
// 队列元素数量最多限制为60个，当超过60个时，添加元素时alert出提示
// 队列展现方式变化如图，直接用高度表示数字大小
// 实现一个简单的排序功能，如冒泡排序（不限制具体算法），用可视化的方法表达出来，参考见下方参考资料

function $(selector) {
	return document.querySelector(selector);
}
var queue = {
	arr: [],
	leftIn: function(data) {
		return this.arr.unshift(data);
	},
	rightIn: function(data) {
		return this.arr.push(data);
	},
	leftOut: function() {
		return this.arr.shift();
	},
	rightOut: function() {
		return this.arr.pop();
	},
	isEmpty: function() {
		if(this.arr.length == 0) {
			return true;
		}
		return false;
	},
	delData: function(index) {
		return this.arr.splice(index, 1);
	},
	error: function() {
		if(this.arr.length > 60) {
			alert('元素超限');
			return true;
		}
		return false;
	}
}

function render() {
	$('#show').innerHTML = '';
	for(var i=0; i < queue.arr.length; i++) {
		var newNode = document.createElement('span');
		newNode.innerText = queue.arr[i];
		newNode.style.height = queue.arr[i] + 'px';
		$('#show').appendChild(newNode);
		// sleep(1000);
	}
}

function getCurQue() {
	var datas = $('#show').getElementsByTagName('span');
	for(var i = 0; i < datas.length; i++) {
		queue.arr.push(parseInt(datas[i].innerText));
	}
}

function clickHandle() {
	$('#leftIn').addEventListener('click', function() {
		if(!$('#inputCtr').value || queue.error() || !checkValidate()) {
			return ;
		}
		queue.leftIn(parseInt($('#inputCtr').value));
		render();
	});
	$('#rightIn').addEventListener('click', function() {
		if(!$('#inputCtr').value || queue.error() || !checkValidate()) {
			return ;
		}
		queue.rightIn(parseInt($('#inputCtr').value));
		render();
	});
	$('#leftOut').addEventListener('click', function() {
		if(queue.isEmpty()) {
			return;
		}
		queue.leftOut();
		render();
	});
	$('#rightOut').addEventListener('click', function() {
		if(queue.isEmpty()) {
			return;
		}
		queue.rightOut();
		render();
	});
	$('#show').addEventListener('click', function() {
		var target = event.target;
		if(target.nodeName.toLowerCase() == 'span') {
			alert(target.innerText);
			queue.delData(target.index());
		}
		render();
	});
	$('#maopao').addEventListener('click', function() {
		var len = queue.arr.length;
		var i = 0,j = len - 1,flag = true;
		var timer = setInterval(sort, 200);
		function sort() {
			if(i < len && flag) {
				if(j > i) {
					if((queue.arr[j] < queue.arr[j-1])) {
						swap(queue.arr, j, j-1);
						render();
						// flag = true;
					}
					j--;
				} if(j == i) {
					j = len -1;
					i++; 
				}
			} else {
				clearInterval(timer);
			}

		}

	});
} 

function checkValidate() {
	var input = $('#inputCtr').value;
	if(!input.match(/^\d+$/)) {
		alert('输入不合法');
		return false;
	}
	input = parseInt(input);
	if(input < 10 || input > 100) {
		alert('数字不在范围');
		return false;
	}
	return true;
}

function init() {
	getCurQue();
	clickHandle();
	render();
}
init();

Object.prototype.index = function (){
	var parent = this.parentNode;
	var children = parent.children;
	for(var i=0; i<children.length; i++) {
		if(this == children[i]) {
			return i;
		}
	}
	return false;
}
function maopaoSort(arr) {
	var flag = true;
	for(var i = 0; i < arr.length; i++) {
		for(var j = arr.length-1; j > i && flag; j--) {
			if(arr[j] < arr[j-1]) {
				swap(arr, j, j-1);
				render();
				// sleep(2000);

				console.log(2);
				flag = true;
			}
			console.log(1);
		}
		flag = false;
	}
}
function insertionSort(arr) {
	var i, j;
	for(i = 1; i < arr.length; i++) {
		var key = arr[i];
		j = i - 1;
		while(j>=0 && (arr[j] > arr[i])) {
			arr[j+1] = arr[j];
			j--;
		}
		arr[j+1] = key;
	}
}
function  swap(arr, a, b) {
	var temp;
	temp = arr[b];
	arr[b] = arr[a];
	arr[a] = temp;
}