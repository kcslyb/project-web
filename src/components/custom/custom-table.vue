<script>
  import {DateUtils} from "@/utils/common-utils";

  export default {
    name: 'CustomTable',
    data() {
      return {
        condition: {
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize
        }
      }
    },
    props: {
      // 是否显示多选列
      isSelectFlag: {
        type: Boolean,
        default: true
      },
      // 是否显示序号列
      isSequenceFlag: {
        type: Boolean,
        default: true
      },
      // 是否显示分页
      isShowPage: {
        type: Boolean,
        default: true
      },
      // 表单数据
      data: {
        type: Array,
        default: () => []
      },
      // 需要展示的表单数据项
      columns: {
        type: Array,
        default: () => []
      },
      // 分页page
      page: {
        type: Object,
        default: () => {
          return {
            pageNum: 1,
            pageSize: 10
          }
        }
      },
      total: {
        type: Number,
        default: 0
      },
      pageSizeArray: {
        type: Array,
        default: () => [10, 20, 30, 40, 50]
      },
      fit: {
        type: Boolean,
        default: true
      },
      border: {
        type: Boolean,
        default: true
      },
      stripe: {
        type: Boolean,
        default: true
      },
    },
    methods: {
      indexMethod(index) {
        return ((this.page.pageNum - 1) * this.page.pageSize) + 1 + index;
      },
      rowDblclick(row, column, event) {
        this.$emit('rowDblclick', row, column, event);
      },
      rowClick(row, column, event) {
        this.$emit('rowClick', row, column, event)
      },
      select(selection, row) {
        this.$emit('select', selection, row)
      },
      selectAll(selection) {
        this.$emit('selectAll', selection)
      },
      selectionChange(selection) {
        this.$emit('selectionChange', selection);
      },
      handleSizeChange(val) {
        this.condition = Object.assign({}, this.page, {pageSize: val, pageNum: 1});
        this.$emit('pageChange', this.condition);
      },
      handleCurrentChange(val) {
        this.condition = Object.assign({}, this.page, {pageNum: val});
        this.$emit('pageChange', this.condition);
      },
      isSequenceFlagMeth() {
        if (this.isSequenceFlag) {
          return (
            <el-table-column fixed align="center" label="序号" type="index" index={this.indexMethod} width="50"/>
          )
        }
      },
      isSelectFlagMeth() {
        if (this.isSelectFlag) {
          return (
            <el-table-column fixed type="selection" width="40"/>
          )
        }
      },
      isColumns() {
        if (this.columns.length > 0) {
          return(
            this.columns.map(value => {
              return (
                <el-table-column
                  prop={value.prop}
                  label={value.label}
                  width={value.width}
                  fixed={value.fixed}
                  sortable={value.sortable}
                  show-overflow-tooltip={value.showOverflowTooltip ? !value.showOverflowTooltip : true}
                  {...{
                    scopedSlots: {
                      default: props => {
                        return (
                          this.processor(props, value)
                        )
                      }
                    }
                  }}>
                </el-table-column>
              )
            })
          )
        } else {
          let temp = Object.keys(this.data[0])
          return (
            temp.map(value => {
              return (
                <el-table-column
                  prop={value}
                  label={value}
                  show-overflow-tooltip={true}
                  {...{
                    scopedSlots: {
                      default: props => {
                        return (
                          this.processor(props, {prop: value})
                        )
                      }
                    }
                  }}>
                </el-table-column>
              )
            })
          )
        }
      },
      processor(props, value) {
        let self = this;
        if (value.type) {
          let type = this.replaceStr(value.type);
          return self['acquire' + type](props, value); // 拼接方法
        }
        return props.row[value.prop]
      },
      replaceStr(str) {
        let reg = /\b(\w)|\s(\w)/g;
        return str.replace(reg, function (m) {
          return m.toUpperCase();
        });
      },
      // 返回格式化data
      acquireDate(props, item) {
        return (
          DateUtils.formatStringToDate(props.row[item.prop])
        )
      },
      // 返回格式化dataTime
      acquireDateTime(props, item) {
        return (
          DateUtils.formatStringToDateTime(props.row[item.prop])
        )
      },
      // 返回text类型的button
      acquireOptButton(props, item) {
        return (
          <div>
            <el-button size={item.size ? item.size : 'small'} onClick={
              () => {
                this.$emit('buttonEditClick', props.row, item)
              }
            }><i class={item.icon ? item.icon : 'el-icon-edit'}>编辑</i>
            </el-button>
            <el-button size={item.size ? item.size : 'small'} onClick={
              () => {
                this.$emit('buttonDeleteClick', props.row, item)
              }
            }><i class={item.icon ? item.icon : 'el-icon-delete'}>删除</i>
            </el-button>
          </div>
        )
      }
    },
    render() {
      return (
        <el-main style="padding: 0;">
          <el-table
            ref={'customTable'}
            fit={this.fit}
            border={this.border}
            stripe={this.stripe}
            onSelect={this.select}
            onRow-click={this.rowClick}
            onSelect-all={this.selectAll}
            onRow-dblclick={this.rowDblclick}
            onSelection-change={this.selectionChange}
            highlight-current-row={true}
            data={this.data}
            style="width: 100%">
            {this.isSequenceFlagMeth()}
            {this.isSelectFlagMeth()}
            {this.isColumns()}
          </el-table>
          <div class="pagination-container">
            <el-pagination
              onSize-change={this.handleSizeChange}
              onCurrent-change={this.handleCurrentChange}
              current-page={this.page.pageNum}
              page-sizes={this.pageSizeArray}
              page-size={this.page.pageSize}
              layout="total, sizes, prev, pager, next, jumper"
              total={this.total}>
            </el-pagination>
          </div>
        </el-main>
      )
    }
  }
</script>

<style lang="scss">

  .pagination-container {
    height: auto;
    box-sizing: border-box;
    text-align: center;
  }
</style>