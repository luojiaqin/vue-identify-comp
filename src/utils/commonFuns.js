import { v4 as uuidv4 } from 'uuid';
import { Comp } from '../class/comp';
import {setting} from './config'

/**
 * @function 遍历初始化组建
 * @param {Array} contexts webpack上下文数组 
 * @version 1.0.0
 * @author ljq
 */
export const init = (contexts) => {
  if(!setting.open){
    return
  }
  for(let i=0;i<contexts.length;i++){
    initComp(contexts[i])
  }
};

/**
 * @function 上下文获取的组件compArr变量中
 * @param {*} context  webpack上下文（require.contex获得）
 * @author ljq
 * @version 1.0.0
 * @example initComp(require.context('../views', true, /\.vue$/))
 */
const initComp = (context) => {
  if(!setting.open){
    return
  }
  context.keys().forEach((item) => {
    console.log(item)
    const comp = context(item).default;
      if (!comp._scopeId) {
        comp._scopeId = 'data-v2-' + uuidv4();
      }
      if(!comp.__file){
        comp.__file = item
      }
      console.log(comp)
      setting.addComp(new Comp(comp));
  });
};

/**
 * @function 给组件绑定对应的dom元素
 * @version 1.0.0
 * @author ljq
 */
export const setCompEl = () => {
  if(!setting.open){
    return
  }

  clear();

  const text = document.body.innerHTML;
  setting.compArr.forEach((item) => {
    if (text.includes(item.elId)) { // 先用快速方法过滤一遍
      const el = document.querySelector(`[${item.elId}]`);
      if (el) {
        const drawIndex = text.indexOf(item.elId); // 索引越靠前绘制层级越低
        item.setEl(el, drawIndex);
      }
    }
  });
};

/**
 * @function 给处于页面上的组件绘制canvas
 * @version 1.0.0
 * @author ljq
 */
export const drawCanvas = () => {
  if(!setting.open){
    return
  }

  const arr = setting.compArr.filter((item) => item.el && item.position);
  if(arr.length === 0){
    return
  }
  const canvansEl = document.createElement('CANVAS');
  canvansEl.style.position = 'absolute'
  canvansEl.style.top = 0;
  canvansEl.style.left = 0;
  canvansEl.id = 'vue-identify-comp-canvas';
  const appEl = document.body;

  const w = appEl.scrollWidth;
  const h = appEl.scrollHeight;
  canvansEl.width = w;
  canvansEl.height = h;

  const ctx = canvansEl.getContext('2d');

  function sortDrawIndex(compA, compB) {
    return compA.drawIndex - compB.drawIndex;
  }

  arr.sort(sortDrawIndex);

  arr.forEach((item) => {
    const pos = item.position;
    const { x, y, w, h } = pos;
    ctx.moveTo(x, y);
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w - 2, h - 2);
    ctx.fillStyle = '#fff';
    ctx.font = '16px "微软雅黑"';

    // ctx.fillText(item.filePath, x, y+20)
    drawText(item.filePath, ctx, w * 0.95, x + 5, y + 20, 20);
  });
  appEl.appendChild(canvansEl);
};

/**
 * @function 开始绑定dom元素以及绘制画布
 * @version 1.0.0
 * @author ljq
 */
export const initDraw = ()=>{
  if(!setting.open){
    return
  }

  setCompEl()
  drawCanvas()
}

/**
 * @function canvas超出文字自动换行
 *  @param {String} str  字符串文本
 *  @param {context} ctx canvas上下文
 *  @param {Number} maxWidth 绘制文本被允许的最大宽度
 *  @param {Number} x 字符串绘制开始的x坐标
 *  @param {Number} y 字符串绘制开始的y坐标
 *  @param {Number} lineHeight 字行高
 *  @author ljq
 *  @version 1.0.0
 */
export const drawText = (str, ctx, maxWidth, x, y, lineHeight) => {
  if(!setting.open){
    return
  }

  let lineWidth = 0;
  let lastSubStrIndex = 0;

  for (let i = 0; i < str.length; i++) {
    lineWidth += ctx.measureText(str[i]).width;

    if (lineWidth > maxWidth) {
      ctx.fillText(str.substring(lastSubStrIndex, i), x, y);
      y += lineHeight;
      lineWidth = 0;
      lastSubStrIndex = i;
    }

    if (i === str.length - 1) {
      ctx.fillText(str.substring(lastSubStrIndex, i + 1), x, y);
    }
  }
};


/**
 * @function 清除当前绘制的画布
 * @author ljq
 * @version 1.0.0
 */
export const clear = () => {
  if(!setting.open){
    return
  }

  const canvas = document.querySelector('#vue-identify-comp-canvas');
  if (canvas) {
    document.body.removeChild(canvas);
  }
};

/**
 * @function 销毁
 * @author ljq
 * @version 1.0.0
 */
export const destroy = ()=>{
  if(!setting.open){
    return
  }

  clear()
  setting.clearComps()
}
