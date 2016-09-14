// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    // your implement
    return (arr instanceof Array);
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    // your implement
    return (typeof fn == 'function');
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    var clone = {};
    if(src instanceof Array) {
        clone = [];
    }
    for(var i in src) {
    	if(typeof src[i] != "object" || src[i] === null) {
    		clone[i] = src[i];
    	} else if(src[i] instanceof Date){
    		clone[i] = new Date(src[i]);
    	} else {
            clone[i] = cloneObject(src[i]);
        }
    }
    return clone;
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重/去空后的数组
function uniqArray(arr) {
    // your implement
    // 该方法改变了原有数组
    function type1() {
        var temp, i, j, len = arr.length, newArr = [];
        for(i = 0; i < len; i++) {
            temp = arr[i];
            if(temp !== undefined) {
                for(j = i+1; j < len; j++) {
                    if(arr[j] == temp) {
                        arr[j] = undefined;
                    }
                }
                newArr.push(temp);
            }
        }
        return newArr;
    }
    var newArr = [], states = [], temp, len = arr.length;
    var i, j;
    for(i = 0; i < len; i++) {
        temp = arr[i];
        if(typeof temp == 'string' && !temp) {
            states[j] = 0;
            continue;
        }
        if(states[i] !== 0) {
            for(j = i+1; j < len; j++) {
                if(arr[j] == temp || (typeof arr[j] == 'string' && !arr[j])) {
                    states[j] = 0;
                }
            }
            newArr.push(temp);
        }
    }
    return newArr;
}

// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    // your implement
    var begin, end;
    begin = 0; end = str.length - 1;
    while(!str[begin]){
        begin++;
    }
    while(!str[end]) {
        end--;
    }
    return str.slice(begin, end+1);
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    // return str.replace(/^\s*/, '').replace(/\s*$/, '');
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    // your implement
    for(var i in arr) {
        fn(arr[i], i);
    }

}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var count = 0;
    for(var i in obj) {
        count++;
    }
    return count;
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    // your implement
}

// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
    var reg = /^1\d{10}$/;
    return phone.search(reg);
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    // your implement
    var currentClass = element.className;
    var reg;
    for(var i = 1; i < arguments.length; i++) {
        newClassName = arguments[i];
        reg = eval("/\\b" + newClassName +"\\b/")
        if(currentClass.search(reg) == -1) {
           currentClass += ' '+newClassName;
        }
    }
    element.className = currentClass;
}
var ele = {};
ele.className = 'abc';
addClass(ele, 'abc', 'dd', 'dd', 'c', 'abc');
console.log(ele);

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    // your implement
    var currentClass = element.className;
    var reg;
    for(var i = 1; i < arguments.length; i++) {
        oldClassName = arguments[i];
        reg = new RegExp("\\b" + oldClassName + "\\b[\\s+]?");
        currentClass = currentClass.replace(reg, '').replace(/\s+$/, '');
    }
    element.className = currentClass;
}
removeClass(ele, 'dd', 'c');
console.log(ele);

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
    var parent = element.parentNode;
    if(siblingNode.parentNode == parent) {
        return true;
    }
    return false;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
    // offsetX offsetY为相对于父元素的位置
    var x, y;
    x = element.offsetX; y = element.offsetY;
    var parent = element.parentNode;
    while(parent) {
        x += parent.offsetX;
        y += parent.offsetY;
        parent = element.parentNode;
    }
    return {x, y};
}

// 实现一个简单的Query
function $(selector) {
    if(arguments.length == 1) {
        var parent = document;
    } else {
        var parent = arguments[1];
    }
    var selectArr = selector.split(/\s+/);
    if(selectArr.length == 1) {
        var s = selectArr[0];
        switch(s[0]) {
            case '#': 
                return document.getElementById(s.slice(1));
            case '.': 
                return parent.getElementsByClassName(s.slice(1))[0];
            case '[': 
                var a = s.match(/\[([^=]+)=([^\]]+)\]/);
                var attr, value;
                if(!a) {
                    attr = s.slice(1, -1);
                } else {
                    attr = a[1];
                    value = a[2];
                }
                return findAttrNode(attr, parent, value);

            default:
                return parent.getElementsByTagName(s)[0];
        }
    } else if(selectArr.length > 1) {
        for(var i = 0; i < selectArr.length - 1; i++) {
            return $(selectArr[i+1], $(selectArr[i]));
        }
    }
        var result;

    function findAttrNode(attr, root, value) {
        var children = root.children;
        if(children.length >= 1) {
            for(var i = 0; i < children.length; i++) {
                var v = children[i].getAttribute(attr);
                if(v != null) {
                    if(value != undefined) {
                        if(v == value) {
                            result = children[i];
                            return result;
                        }
                    } else {
                        result = children[i];
                        return result;
                    }
                } else {
                    if(result) {
                        return findAttrNode(attr, children[i], value);
                    }
                    findAttrNode(attr, children[i], value);
                }
            } 
        }
        if(result) {
            return result;
        } else {
            return 0;
        }
       
    }
}


// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    // your implement
    if(element.addEventListener) {
        element.addEventListener(event, listener, false);
    } else if(element.attachEvent) {
        element.attachEvent('on' + event, listener);
    } else {
        element['on' + event] = listener;
    }
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    // your implement
    if(element.removeEventListener) {
        element.removeEventListener(event, listener);
    } else if(element.detachEvent) {
        element.detachEvent('on' + event, listener);
    } else {
        element['on' + event] = null;
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    // your implement
    addEvent(element, 'click', listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    // your implement
    var newFun = function(event) {
        if(event.keyCode == 13) {
            listener(element);
        }
    };
    addEvent(document, 'keydown', newFun);
}

function renderList() {
    $("#list").innerHTML = '<li>new item</li>';
}
// 先简单一些
function delegateEvent(element, tag, eventName, listener) {
    // your implement
    addEvent(element, eventName, function(event) {
        event = event || window.event;
        var target = event.target || event.srcElement;
        if(target.nodeName.toLowerCase() == tag) {
            listener(target);
        }
    });
}

$.on = function(selector, event, listener) {
    // your implement
    var element = $(selector);
    addEvent(element, event, listener);
}

$.click = function(selector, listener) {
    // your implement;
    var element = $(selector);
    addClickEvent(element, listener);
}

$.un = function(selector, event, listener) {
    // your implement
    var element = $(selector);
    removeEvent(element, listener);
}

$.delegate = function(selector, tag, event, listener) {
    // your implement
    var element = $(selector);
    console.log(selector);
    delegateEvent(element, tag, event, listener);
}


// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    // your implement
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    // your implement
}

// 获取cookie值
function getCookie(cookieName) {
    // your implement
}


// 
function ajax(url, options) {
    // your implement
}

// 使用示例：
ajax(
    'http://localhost:8080/server/ajaxtest', 
    {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        }
    }
);




















