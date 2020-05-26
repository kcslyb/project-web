<script>
  import {DateUtils} from "@/utils/common-utils";

  export default {
    name: 'CustomTable',
    data() {
      return {
        condition: {
          limit: this.page.limit,
          offset: this.page.offset
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
            limit: 1,
            offset: 10
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
        return ((this.condition.offset - 1) * this.condition.limit) + 1 + index;
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
        this.condition = Object.assign({}, this.page, {limit: val, offset: 1});
        this.$emit('pageChange', this.condition);
      },
      handleCurrentChange(val) {
        this.condition = Object.assign({}, this.page, {offset: val});
        this.$emit('pageChange', this.condition);
      },
      // 是否显示序号
      isSequenceFlagMethod() {
        if (this.isSequenceFlag && (this.columns.length > 0 || this.data.length > 0)) {
          return (
            <el-table-column fixed={true} align="center" label="序号" type="index" index={this.indexMethod} width="50"/>
          )
        }
      },
      // 是否需要选择列
      isSelectFlagMethod() {
        if (this.isSelectFlag && (this.columns.length > 0 || this.data.length > 0)) {
          return (
            <el-table-column fixed={true} type="selection" width="50"/>
          )
        }
      },
      isShowPagination() {
        // 是否显示分页
        if (this.isShowPage) {
          return (
            <div class="pagination-container">
              <el-pagination
                onSize-change={this.handleSizeChange}
                onCurrent-change={this.handleCurrentChange}
                current-page={this.page.offset}
                page-sizes={this.pageSizeArray}
                page-size={this.page.limit}
                layout="total, sizes, prev, pager, next, jumper"
                total={this.total}>
              </el-pagination>
            </div>
          )
        }
      },
      isColumns() {  // 是否有传入显示列json
        if (this.columns.length > 0) {
          return (
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
        } else if (this.data.length > 0) {
          let temp = Object.keys(this.data[0]);
          return (
            temp.map(value => {
              if (value.indexOf('Id') > -1) {
                return;
              }
              return (
                <el-table-column
                  prop={value}
                  label={value}
                  width={value.length * 12}
                  show-overflow-tooltip={true}
                  sortable={value.sortable ? !value.sortable : true}
                  {...{
                    scopedSlots: {
                      default: props => {
                        if (value.indexOf('Time') > -1) {
                          return (
                            this.processor(props, {prop: value, type: 'dateTime'})
                          )
                        }
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
        if (value.appendText) {
          return props.row[value.prop] + value.appendText;
        }
        return props.row[value.prop];
      },
      replaceStr(str) {
        let reg = /\b(\w)|\s(\w)/g;
        return str.replace(reg, function (m) {
          return m.toUpperCase();
        });
      },
      // 返回字典
      acquireDict(props, item) {
        return (
          <custom-dict dictValue={props.row[item.prop]} dictGroup={item.dictGroup}/>
        )
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
      // 返回text类型的optButton
      acquireOptButton(props, item) {
        if (!Object.prototype.hasOwnProperty.call(item, 'btnList')) {
          item['btnList'] = [
            {event: 'buttonEditClick', icon: 'el-icon-edit', type: 'warning', label: '编辑'},
            {event: 'buttonDeleteClick', icon: 'el-icon-delete', type: 'danger', label: '删除'}
          ]
        }
        return (
          item.btnList.map(value => {
            if (Object.prototype.hasOwnProperty.call(value, 'flag')) {
              let tempFlag = Boolean(Number(props.row[value.flag]));
              return (
                <el-button
                  size={item.size ? item.size : 'mini'}
                  type={tempFlag ? value.type[0] : value.type[1]}
                  plain={true}
                  onClick={() => {
                    let event = tempFlag ? value.event[0] : value.event[1];
                    this.$emit(
                      value['event'] ? event : 'cellButtonClick',
                      props.row,
                      tempFlag ? value.label[0] : value.label[1],
                      tempFlag ? value.action[0] : value.action[1]
                    )
                  }
                }>
                  <i class={tempFlag ? value.icon[0] : value.icon[1]}>
                    {tempFlag ? value.label[0] : value.label[1]}
                  </i>
                </el-button>
              )
            }
            return (
              <el-button size={item.size ? item.size : 'mini'} type={value.type} plain={true} onClick={
                () => {
                  this.$emit(value.event, props.row, value.label, value.action)
                }
              }><i class={value.icon}>{value.label}</i>
              </el-button>
            )
          })
        )
      }

    },
    render() {
      return (
        <el-main style="padding: 0;">
          <el-table
            ref={'customTable'}
            fit={this.fit}
            data={this.data}
            border={this.border}
            stripe={this.stripe}
            highlight-current-row={true}
            onSelect={this.select}
            onRow-click={this.rowClick}
            onSelect-all={this.selectAll}
            onRow-dblclick={this.rowDblclick}
            onSelection-change={this.selectionChange}
            header-cell-style={this.$tableCellHeader}
            style="width: 100%">
            {this.isSequenceFlagMethod()}
            {this.isSelectFlagMethod()}
            {this.isColumns()}
          </el-table>
          {this.isShowPagination()}
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