import {init, setCompEl} from '@/utils/commonFuns'
import {setting} from '@/utils/config'


describe('commonFuns.js',()=>{
    beforeEach(()=>{
        setting.enable()
        init([
            require.context('../../src/dev/views', true, /\.vue$/)
        ])
    })
    test('init and initComp',()=>{
        expect(setting.compArr.length).toBe(1)
    })
    test('setCompEl', ()=>{
        const elId = setting.compArr[0].elId
        document.body.innerHTML = `<div ${elId} >Hello world</div>`
        setCompEl()
        console.log(setting.compArr[0])
        expect(setting.compArr[0].el).not.toBe(undefined)
    })
})