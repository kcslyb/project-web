class Operation {
    private vm: any;
    private apiObj: any;
    private static instance: Operation;

    constructor(vm: any) {
        this.vm = vm
        this.apiObj= vm.apiObj
    }

    static getInstance(vm: any) {
        if (!Operation.instance) {
            Operation.instance = new Operation(vm)
        }
        return Operation.instance
    }

    getPage = (param :object) => {
        let obj = {actionLabel: '查询', action: 'queryPager'};
        this.operation(obj, param).then( (res: any) => {
            this.vm.tableData = res.data.list;
            this.vm.total = res.data.total;
        })
    }

    add = () => {
        this.vm.object = {};
        this.vm.showForm = true
    }

    edit = (row: any) => {
        this.vm.object = row;
        this.vm.showForm = true
    }

    delete = (row: any, actionLabel: string) => {
        let obj = {actionLabel: actionLabel, action: 'delete'};
        this.operation(obj, row.id).then(() => {
            this.vm.initTableList();
        })

    }

    handleUpdate = (optObj: optObj, param: any, func: Function) => {
        let temp = {action: 'put', actionLabel: '修改'}
        optObj = Object.assign({}, temp, optObj)
        this.operation(optObj, param).then((res: any) => {
             func(res)
        }).catch(() => {})
    }

    handleSave = (optObj: optObj, param: any, func: Function) => {
        let temp = {action: 'post', actionLabel: '添加'}
        optObj = Object.assign({}, temp, optObj)
        this.operation(optObj, param).then((res: any) => {
            func(res)
        }).catch(() => {})
    }

    operation = (optObj: optObj, param: object|string) => {
        return this.apiObj[optObj.action](param).then((res: any) => {
            this.vm.$notify.success({
                title: '提示',
                message: `${optObj.actionLabel}成功`
            });
            return Promise.resolve(res)
        })
    }
}
class optObj {
    action!: string
    actionLabel!: string
}
export default Operation
