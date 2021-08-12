
  /**
   * @description 初始化配置信息
   * @param {Boolean} open 允许进行绘制
   * @param {Array} compArr 全部组件数据
   * @author ljq
   * @version 1.0.0
   */
export const setting = {
    open: false,
    compArr: [],
    addComp(comp){
        this.compArr.push(comp)
    },
    clearComps(){
        this.compArr = []
    },
    disable(){
        this.open = false
    },
    enable(){
        this.clearComps()
        this.open = true
    }
}