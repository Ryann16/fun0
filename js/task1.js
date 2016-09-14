// 函数random用于生成0-999之间的随机整数。

// 语法如下：

//     var number = random();

//     number是0-999之间的整数。
function random() {
	return 1000 * Math.random().toFixed(3);
}
var number = random();

// 函数parseQuery用于解析url查询参数。

// 语法如下：

// 	var obj = parseQuery(query)

// 	query是被解析的查询参数，函数返回解析后的对象。

// 使用范例如下：

var jerry = parseQuery("name=jerry&age=1");
var tom = parseQuery("name= tom &age=12&gender&");
function parseQuery(str) {
	var obj ={};
	var reg = /(\w+)\s*=?\s*([^&\s]*)\s*&?/g;
	var result;
	while(result = reg.exec(str)) {
		obj[result[1]] = result[2];
	}
	return obj;
}

// 函数multiply用于计算多个数字的乘积。
multiply(2, 3);	
multiply(-1, 3, 4);	
multiply(1, 2, 3, 4, 5); 

function multiply() {
	var result = 1;
	for(var i in arguments) {
		result *= arguments[i];
	}
	console.log(result);
	return result;
}

function Person(name, age){
	this.introduce = function() {
		console.log("I am " + name + ", I am " + age + " years old! ");
	}
}

var jerry = new Person("Jerry", 2);
jerry.introduce();		// 返回值： "I am Jerry, I am 2 years old! "
var tom = new Person("Tom", 12);
tom.introduce(); //返回值： "I am Tom, I am 12 years old! "

// 函数escapeHTML用于转义html字符串中的特殊字符(<>"&)。
var str1 = escapeHTML('<div>Tom&Jerry</div> '); //返回值：'&lt;div&gt;Tom&amp;Jerry&lt;/div&gt; '
var str2 = escapeHTML('<input type="text" name="mobile"> '); //返回值：'&lt;inputtype=&quot;text&quot; name=&quot;mobile&quot;&gt; '
function escapeHTML(htmlStr) {
	htmlStr = htmlStr.replace(/[<>"&]/g, function(m) {
		switch(m) {
			case '<':
				return '&lt;';
			case '>':
				return '&gt;';
			case '"':
				return '&quot;';
			case '&':
				return '&amp;';
		}
	});
	return htmlStr;
}

// 获取对象构造函数名
function getConstructorName(obj) {
	return obj && obj.constructor && obj.constructor.toString().match(/function\s*([^()]*)/)[1];
}























