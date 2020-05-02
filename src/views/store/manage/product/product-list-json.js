export const productItems = [
  {
    type: 'input',
    name: 'productName',
    label: '名称'
  }, {
    type: 'select',
    name: 'productType',
    label: '类型',
    dictGroupId: 'hfVf5uJjKutJjqKbFbV',
    dataList: []
  }
]
export const tableColumn = [
  {
    prop: 'productName',
    label: '名称'
  }, {
    prop: 'productId',
    label: '编码'
  }, {
    prop: 'productPrise',
    label: '价格',
    appendText: '元/1份'
  }, {
    type: 'dict',
    dictGroup: 'dishesType',
    prop: 'productType',
    label: '类型'
  }, {
    prop: 'productSalesNumber',
    label: '销量'
  }, {
    prop: 'productDescription',
    label: '简介'
  }, {
    prop: 'productCreateByName',
    label: '上架人'
  }, {
    type: 'dateTime',
    prop: 'productCreateTime',
    label: '上架时间'
  }, {
    prop: 'productUpdateByName',
    label: '更新人'
  }, {
    type: 'dateTime',
    prop: 'productUpdateTime',
    label: '更新时间'
  }, {
    type: 'optButton',
    prop: 'option',
    label: '操作',
    width: 200
  }
]