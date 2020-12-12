const NotepadJson = {
  searchItems: [
    {
      type: 'input',
      name: 'title',
      label: '标题'
    }
  ],
  tableColumn: [
    {prop: 'title', label: '标题'},
    {type: 'dateTime', prop: 'happenTime', label: '发生时间'},
    {prop: 'createByName', label: '创建者'},
    {type: 'dateTime', prop: 'createTime', label: '创建时间'},
    {prop: 'updateByName', label: '修改者'},
    {type: 'dateTime', prop: 'updateTime', label: '修改时间'},
    {prop: 'reservedKeyOne', label: '预留字段一'},
    {prop: 'reservedKeyTwo', label: '预留字段二'},
    {
      type: 'optButton',
      prop: 'option',
      label: '操作',
      width: 200
    }
  ],
  formItems: {
    rules: {
      title: [
        {required: true, message: '标题不能为空'}
      ],
      happenTime: [
        {required: true, message: '发生时间不能为空'}
      ],
    },
    items: [
      {
        type: 'input',
        name: 'title',
        label: '标题'
      }, {
        type: 'date',
        name: 'happenTime',
        label: '发生时间'
      }, {
        type: 'input',
        name: 'reservedKeyOne',
        label: '预留字段一'
      }, {
        type: 'input',
        name: 'reservedKeyTwo',
        label: '预留字段二'
      }, {
        type: 'textarea',
        name: 'remark',
        label: '备注',
        style: {width: '530px'}
      }
    ]
  },
}
export default NotepadJson
