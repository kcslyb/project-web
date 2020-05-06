import {productItems} from "./product-list-json";

export const productFormItems = [
    ...productItems,
  {
    type: 'input',
    name: 'productPrise',
    label: '价格'
  }, {
    type: 'textarea',
    name: 'productDescription',
    label: '简介',
    dataList: []
  }, {
    type: 'file',
    name: 'productFileId',
    label: '附件'
  }
];
export const formRules = [
];