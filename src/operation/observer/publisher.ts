// 全局事件总线
import Subscribe from "@/operation/observer/subscribe";

class Publisher {

    private readonly task: any
    private readonly subscribe: any;
    private readonly temp = [
        'api',
        'constructor'
    ]

    constructor(subscribe?: Subscribe) {
        this.task = {}
        this.subscribe = subscribe || new Subscribe()
        const funcNames = Object.getOwnPropertyNames(this.subscribe)
        const funcNamesProto = Object.getOwnPropertyNames(this.subscribe.__proto__)
        const result = funcNames.concat(funcNamesProto).filter(value => !this.temp.includes(value))
        console.info(result.join('\n'))
        for (let i = 0; i < result.length; i++) {
            this.on(result[i], this.subscribe[result[i]])
        }
    }

    // 添加
    on(name: string, fn: Function) {
        if (!this.isExistTask(name)) {
            this.task[name] = fn
        }
    }

    // 通知订阅者
    notifyDep(name: string, params: any, ...arg: [any?]): Promise<any> {
        if (this.isExistTask(name)) {
            return this.task[name].call(this.subscribe, params, ...arg)
        }
        throw new Error(`catchError: not exist task ${name}`)
    }

    // 是否存在指定事件
    private isExistTask(name: string) {
        return Object.prototype.hasOwnProperty.call(this.task, name)
    }
}

export default Publisher