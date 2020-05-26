export const formItems = [
  {
    type: 'input',
    name: 'productName',
    label: '名称'
  }, {
    type: 'select',
    name: 'deskStatus',
    label: '状态',
    dictGroupId: 'lrMsCy7XYKwlUARvZxL',
    dataList: []
  }
]
export const tableColumn = [
  {
    prop: 'deskName',
    label: '名称'
  }, {
    prop: 'deskSerialNumber',
    label: '编码'
  }, {
    type: 'dict',
    dictGroup: 'statusType',
    prop: 'deskStatus',
    label: '状态'
  }, {
    type: 'dateTime',
    prop: 'deskCreateTime',
    label: '创建时间'
  }, {
    type: 'optButton',
    prop: 'option',
    label: '操作',
    width: 200,
    btnList: [
      {
        event: 'buttonEditClick',
        icon: 'el-icon-edit',
        type: 'warning',
        action: 'edit',
        label: '编辑'
      },
      {
        event: ['cellButtonClick', 'cellButtonClick'],
        icon: ['el-icon-delete', 'el-icon-delete'],
        action: ['disable', 'enable'],
        type: ['danger', 'success'],
        label: ['停用', '启用'],
        flag: 'deskStatus'
      }
    ]
  }
];