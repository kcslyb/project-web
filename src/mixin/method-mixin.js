import Operation from '../operation/operation'

const methodMixin = {
  created() {
    this.initData()
  },
  methods: {
    initTableList() {
      let param = Object.assign({}, this.condition, this.formItems.data);
      Operation.getInstance(this).getPage()
    },
    add() {
      Operation.getInstance(this).add()
    },
    searchSubmit() {
      this.initTableList();
    },
    searchReset() {
      this.formItems.data = {}
      this.initTableList();
    },
    selectChange(selection) {

    },
    pageChange(page) {
      this.condition = Object.assign({}, this.condition, page);
      this.initTableList();
    },
    rightClose() {
      this.showForm = false;
      this.initTableList();
    },
    buttonEditClick(row) {
      Operation.getInstance(this).edit(row)
    },
    buttonDeleteClick(row, actionLabel) {
      Operation.getInstance(this).delete(row, actionLabel)
    }
  }
}
export default methodMixin
