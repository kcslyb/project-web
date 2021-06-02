import BaseApi from "@/resources";
import {Notification} from "element-ui";
import {CustomUtils} from "@/utils/common-utils";

class Subscribe {
    private readonly api: any;

    constructor(api?: BaseApi) {
        this.api = api || {}
    }

    queryById(id: string): Promise<any> {
        return this.operation('get', id)
    }

    delete(id: string, ...arg: [any]): Promise<any> {
        return this.handleOpt('delete', id, arg, '删除')
    }

    save(formData: {}, ...arg: [any]): Promise<any> {
        return this.handleOpt('post', formData, arg, '保存')
    }

    update(formData: {}, ...arg: [any]): Promise<any> {
        return this.handleOpt('put', formData, arg, '修改')
    }

    queryPager(formData: {}): Promise<any> {
        return this.operation('queryPager', formData)
    }

    handleOpt(action: string, params: any, arg: any, label: string): Promise<any> {
        const defaultOpt = {label: label}
        const tempOpt = arg.length > 0 && CustomUtils.typeJudge(arg[0], 'Object')
            ? Object.assign(defaultOpt, arg[0])
            : defaultOpt
        return this.operation(action, params, tempOpt)
    }

    operation(action: string, param: object | string, arg?: any): Promise<any> {
        const label = arg?.label || '操作'
        if (!this.api || !this.api[action]) {
            throw new Error(`catchError: base-opt api is not prototype ${action}`)
        }
        return this.api[action](param).then((res: any) => {
            console.info(`*api method:${action}\n*params:${JSON.stringify(param)}\n*operation:${label}`)
            arg?.label && Notification({
                title: '提示!',
                type: 'success',
                message: `${label}成功`
            });
            return Promise.resolve(res)
        }).catch((error: any) => {
            return Promise.reject(error)
        })
    }

}

export default Subscribe