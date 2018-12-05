let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

/**
 *
 * @param {Object} el [dom节点对象]
 * @param {String} className [类名]
 * @return {Bollean}
 */
export function hasClass(el, className) {
  if (!el) return;
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className);
}

/**
 *
 * @param {Object} el [dom节点对象]
 * @param {String} className [类名]
 */
export function addClass(el, className) {
  if (!el) return;
  if (hasClass(el, className)) {
    return;
  }

  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
}

/**
 *
 * @param {Object} el [dom节点对象]
 * @param {String} className [类名]
 */
export function removeClass(el, className) {
  if (!el) return;
  let targetClassName = el.className;
  targetClassName = targetClassName
    .split(' ')
    .filter(item => item && item != className)
    .join(' ');
  el.className = targetClassName;
}

/**
 * 实现事件委托，返回绑定的dom节点
 * @param {[Object]} target 被点击的元素，有可能并非真正要绑定的元素
 * @param {[String]} className 绑定元素的className
 * @param {[Object]} el 委托的dom节点
 * @return {[Object]} 返回真正绑定的dom节点
 */
export function getRealTarget(target, className, el) {
  const $body = document.body;
  el = el || $body;
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  while (!target.className.match(reg)) {
    target = target.parentNode;
    if (target == el) {
      target = null;
      break;
    }
  }
  return target;
}

/**
 * 获取浏览器前缀
 * @param {String} style 属性
 * @return { String | Boolean }
 */
export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

/**
 * 绑定事件，ie8及以下不支持addEventListener, 兼容ie6
 * @param {Object} el 绑定事件的dom节点 
 * @param {String} event 事件类型 
 * @param {Object} fn 事件句柄 
 */
export function addEventListener(el, event, fn) {
	if(el.addEventListener) {
		el.addEventListener(event, fn);
	}else {
		el.attachEvent(`on${event}`, fn);
	}
}

/**
 * ie8及以下不支持getElementsByClassName, 通过className获取dom节点，兼容ie6
 * @param {*} el 
 * @param {*} className 
 */
export function getElementsByClassName(el, className){
  var targetEles = [];
  if(el.getElementsByClassName) {
    targetEles = el.getElementsByClassName(className);
    if(targetEles) Array.prototype.slice.call(targetEles, 0);
  }else {
    var els = el.getElementsByTagName('*');
    var reg = new RegExp(`[\\s]*${className}[\\s]*`);
  
    for(var i=0; i<els.length; i++){
      if(reg.exec(els[i].className)) {
        targetEles.push(els[i]);
      }
    }
  }
  return targetEles;
};