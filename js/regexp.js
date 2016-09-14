function Fun1() {	
	var s = "[content=\"Tech\"]内容1[/content]其他内容[content=\"Sales\"]内容2[/content][content=\"weee\"]内容3[/content]肯德基啊[content=\"S离开家\"]内容4[/content]";
	console.log(s);
	var reg = /\[content=\"([^\"]*)\"\]([^\[]*)/g;
	getData(reg, s);
	// 将字符串中的数值提取出来并分组放入数组
	function getData(regExp, str) {
		var result, arr = [];
		var i = 0;
		var flag = true;

		while(result = regExp.exec(str)) {
			var len = result.length;
			for(var j = 0; j < len-1; j++) {
				if(flag) {
					arr[j] = [];
				}
				arr[j][i] = result[j+1];
			}
			flag = false;
			i++;
		}
		console.log(arr);
	}
}

// 现有一字符串:
// String str = "aaa[bbb[ccc,ddd[eee,fff]],ggg[hhh,iii]]";

// 要求,取出所有类似 xxx[xxx,xxx] 结构的字符串 ,

// 当然,这个最后的结果应该是 
// aaa[bbb[ccc,ddd[eee,fff]],ggg[hhh,iii]]
// bbb[ccc,ddd[eee,fff]]
// ddd[eee,fff]
// ggg[hhh,iii]
var str = "aaa[bbb[ccc,ddd[eee,fff]],ggg[hhh,iii]]";
var reg = /(\w{3}\[\w{3},\w{3}\])/g;
var result = str.match(reg);
var arr = [];
var i = 0;

arr[i] = cloneArr(result);
str = str.replace(reg, 'xxx').match(reg);


function cloneArr(arr, dim) {
	var clone = [];
	if(!dim) {
		dim = 1;
	}
	if(dim === 1) {
		for(var i = 0; i < arr.length; i++) {
			clone[i] = arr[i];
		}
	}
	return clone;
}