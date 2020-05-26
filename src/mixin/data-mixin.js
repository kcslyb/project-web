const dataMixin = {
  data() {
    return {
      showForm: false,
      condition: {
        limit: 10,
        offset: 1
      },
      total: 0,
      page: {
        limit: 10,
        offset: 1
      },
      tableData: [],
      tableColumn: [],
      formItems: {
        data: {},
        items: [],
        rules: {}
      },
      object: {}
    }
  },
}
export default dataMixin