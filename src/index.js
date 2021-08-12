import {init,initDraw, clear, destroy} from './utils/commonFuns'
import {setting} from './utils/config'
export default {
    install: (Vue, params)=>{
        const {isOpen, contexts} = params
        if(isOpen){
            setting.enable()
            init(contexts)
        }
        
    },
    draw: initDraw,
    clear,
    destroy,
}