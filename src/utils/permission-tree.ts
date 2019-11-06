interface Permission {
    id: string;
    label: string;
    children: Permission[];
}

const PermissionTree: Permission[] = [
    {
        id: 'system-main-manage',
        label: '主页',
        children: [{
            id: 'main-notify-manage',
            label: '查看通知',
            children: []
        }]
    },
    {
        id: 'system-setting-manage',
        label: '系统设置',
        children: [{
            id: 'system-user-manage',
            label: '用户管理',
            children: [{
                id: 'add-user-manage',
                label: '添加用户',
                children: []
            }, {
                id: 'select-user-manage',
                label: '查看用户',
                children: []
            }, {
                id: 'update-user-manage',
                label: '修改用户',
                children: []
            }, {
                id: 'delete-user-manage',
                label: '删除用户',
                children: []
            }, {
                id: 'export-user-manage',
                label: '导出用户',
                children: []
            }]
        }, {
            id: 'system-role-manage',
            label: '角色管理',
            children: [{
                id: 'add-role-manage',
                label: '添加角色',
                children: []
            }, {
                id: 'update-role-manage',
                label: '修改角色',
                children: []
            }, {
                id: 'delete-role-manage',
                label: '删除角色',
                children: []
            }]
        }, {
            id: 'system-dict-manage',
            label: '数据字典',
            children: [{
                id: 'add-dict-manage',
                label: '添加数据字典',
                children: []
            }, {
                id: 'update-dict-manage',
                label: '修改数据字典',
                children: []
            }, {
                id: 'delete-dict-manage',
                label: '删除数据字典',
                children: []
            }]
        }, {
            id: 'system-notify-manage',
            label: '系统通知',
            children: [{
                id: 'select-notify-manage',
                label: '查看系统通知',
                children: []
            }, {
                id: 'operation-notify-manage',
                label: '操作系统通知',
                children: [{
                    id: 'add-notify-manage',
                    label: '添加系统通知',
                    children: []
                }, {
                    id: 'update-notify-manage',
                    label: '修改系统通知',
                    children: []
                }, {
                    id: 'start-notify-manage',
                    label: '启用系统通知',
                    children: []
                }, {
                    id: 'stop-notify-manage',
                    label: '停用系统通知',
                    children: []
                }, {
                    id: 'delete-notify-manage',
                    label: '删除系统通知',
                    children: []
                }]
            }]
        }, {
            id: 'system-log-manage',
            label: '系统日志',
            children: []
        }]
    },
    {
        id: 'system-file-manage',
        label: '文件管理',
        children: [{
            id: 'upload-file-manage',
            label: '上传文件',
            children: []
        }, {
            id: 'download-file-manage',
            label: '下载文件',
            children: []
        }, {
            id: 'delete-file-manage',
            label: '删除文件',
            children: []
        }]
    }];
export default PermissionTree;
