/**
 * @description dom元素左上角位置以及宽高
 * @param {Number} x 左上角x坐标
 * @param {Number} y 左上角y坐标
 * @param {Number} w 元素宽
 * @param {Number} h 元素高
 * @author ljq
 * @version 1.0.0
 */
  export class Position {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    }
  }

  /**
   * @description 组件信息类
   * @param {String} filePath 组件所在的项目路径
   * @param {String} elId 组件在dom树上的渲染id
   * @param {HTMLElement} el 组件对应的在dom树上的渲染元素
   * @param {Number} drawIndex 获取dom树上的索引，从小到大排序来决定组件绘制层次，索引越小越靠前
   * @param {Position} position dom元素位置
   */
  export class Comp {
    constructor(comp) {
      const { __file, _scopeId } = comp;
      this.filePath = __file;
      this.elId = _scopeId;
    }
    setEl(el, drawIndex) {
      this.el = el;
      this.drawIndex = drawIndex;
      const pos = el.getBoundingClientRect();
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (w > 0 && h > 0) {
        this.position = new Position(pos.x, pos.y, w, h);
      } else if ((w === 0 || h === 0) && el.children.length === 1) { // 处理子元素定位的情况
        const childEl = el.children[0];
        const childW = childEl.offsetWidth;
        const childH = childEl.offsetHeight;
        if (childW !== 0 && childH !== 0) {
          const childPos = childEl.getBoundingClientRect();
          this.position = new Position(childPos.x, childPos.y, childW, childH);
        }
      }
    }
  }