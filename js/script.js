/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输 入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var cityName = document.getElementById('aqi-city-input').value,
      cityValue = document.getElementById('aqi-value-input').value;
  cityName = trim(cityName);
  cityValue = trim(cityValue);

  if(!cityName || !cityValue) {
    // alert('please input all your information');
    return false;
  } 
  if(!cityName.match(/^[\u0391-\uFFE5A-Za-z]+$/) || !cityValue.match(/[0-9]+/)){
    // alert('please check your input');
    return false;
  }
  aqiData[cityName] = cityValue;
  // alert('congratulations');
  return true;
}

function trim(str) {
  if (str) {
    return str.replace(/(^\s+)|(\s+$)/, '');
  } else{
    return '';
  }
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var fragment = document.createDocumentFragment(),
      aqiTable = document.getElementById('aqi-table'),
      i,
      line,
      data,
      flag = true;
  for(city in aqiData) {
    if(flag) {
      fragment.innerHTML = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
      flag = false;
    }
    line = document.createElement('tr');
    fragment.appendChild(line);
    for(i=0; i< 3; i++) {
      data = document.createElement('td');
      if(i == 2){
        deleteBtn = document.createElement('button');
        data.appendChild(deleteBtn);
      }
      fragment.appendChild(data);
    }
    console.log(fragment);
  }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.

  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var addBtn = document.getElementById('add-btn');
  addBtn.addEventListener('click', function() {
  	addBtnHandle();
  })
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  
}

init();