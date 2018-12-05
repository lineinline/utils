const u = window.navigator.userAgent;

/**
 * 判断是否为pc
 * @return {[Boolean]}
 */
export function isPc() {
  return /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(u) ? false : true;
}

/**
 * 判断Android还是ios
 * @return {[Boolean]}
 */
export function isIos() {
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i);
}

/**
 * 判断是否微信内打开
 * @return {[Boolean]}
 */
export function isWeixin() {
  if (u.match(/micromessenger/i) == 'micromessenger') return true;
  return false;
}

/**
 * 百位以逗号隔开
 * @param {number} value
 * @return {string}
 */
export function toThousands(value) {
  let numeric = parseFloat(value, 10);
  if (isNaN(numeric)) return '0';
  let arr = String(numeric).split('.');
  let intNum = arr[0];
  let result = '';

  while (intNum.length > 3) {
    result = ',' + intNum.slice(-3) + result;
    intNum = intNum.slice(0, intNum.length - 3);
  }
  if (intNum) {
    result = intNum + result;
  }
  if (arr[1]) {
    result += `.${arr[1]}`;
  }
  return result;
}

/**
 * 获取两个数之间的随机数，并且往下取整
 * @param {[Number]} min 最小值 
 * @param {[Number]} max 最大值 
 * @return {[Number]} 返回往下取整的随机数
 */
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 打乱数组元素顺序
 * @param {Array} arr
 * @return {Array}
 */
export function shuffle(arr) {
  let _arr = arr.slice();
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i);
    let t = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = t;
  }
  return _arr;
}