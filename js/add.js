var num1 = document.getElementById('num1');
var num2 = document.getElementById('num2');
var sum = document.getElementById('sum');
var addBtn = document.getElementById('addBtn');
var num1Val, num2Val;

addBtn.addEventListener('click', onClickAdd);

function onClickAdd() {
	num1Val = parseInt(num1.value);
	num2Val = parseInt(num2.value);
	sum.innerHTML = add(num1Val, num2Val);
}

function add(num1, num2) {
	return num1 + num2;
}