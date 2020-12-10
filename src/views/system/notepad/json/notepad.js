const NotepadJson = {
  formItems: {
    rules: {
      productName: [
        {required: true, message: '名称不能为空'}
      ],
      productType: [
        {required: true, message: '类型不能为空'}
      ],
    },
    data: {},
    items: [
      {
        type: 'input',
        name: 'productPrise',
        label: '搜索1'
      }, {
        type: 'input',
        name: 'productDescription',
        label: '搜索2',
        dataList: []
      }, {
        type: 'input',
        name: 'productPrise',
        label: '搜索1'
      }, {
        type: 'input',
        name: 'productDescription',
        label: '搜索2',
        dataList: []
      }
    ]
  },
  tableColumn: [
    {prop: 'key', label: '关键字'},
    {prop: 'label', label: '标签'},
    {prop: 'title', label: '标题'},
    {
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
        }
      ]
    }
  ]
}
export default NotepadJson
