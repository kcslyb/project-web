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
                id: 'user-add-manage',
                label: '添加用户',
                children: []
            }, {
                id: 'user-select-manage',
                label: '查看用户',
                children: []
            }, {
                id: 'user-update-manage',
                label: '修改用户',
                children: []
            }, {
                id: 'user-delete-manage',
                label: '删除用户',
                children: []
            }]
        }, {
            id: 'system-role-manage',
            label: '角色管理',
            children: [{
                id: 'role-inset-manage',
                label: '添加角色',
                children: []
            }, {
                id: 'role-edit-manage',
                label: '修改角色',
                children: []
            }, {
                id: 'role-delete-manage',
                label: '删除角色',
                children: []
            }]
        }]
    },
    {
        id: 'system-file-manage',
        label: '文件管理',
        children: [{
            id: 'file-upload-manage',
            label: '上传文件',
            children: []
        }, {
            id: 'file-download-manage',
            label: '下载文件',
            children: []
        }]
    }];
export default PermissionTree;
