<script>
  import {ApiFactory, Dict} from "@/resources";

  export default {
    name: "CustomForm",
    props: {
      formName: {
        type: String,
        default: 'formName'
      },
      formItems: {
        type: Array,
        default: () => []
      },
      labelWidth: {
        type: Number,
        default: 100
      },
      rules: {
        type: Object,
        default: () => {
        }
      },
      labelPosition: {
        type: String,
        default: 'left'
      },
      inline: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {}
    },
    methods: {
      processor(item) {
        let self = this;
        let type = this.replaceStr(item.type);
        return self['acquire' + type](item); // 拼接方法
      },
      replaceStr(str) {
        let reg = /\b(\w)|\s(\w)/g;
        return str.replace(reg, function (m) {
          return m.toUpperCase();
        });
      },
      filterMethod(query, item) {
        if (item.dictGroupId) {
          let params = {
            deleteFlag: '0',
            groupId: item.dictGroupId,
            keyWord: query,
          };
          ApiFactory.getApi(Dict).query(params).then(res => {
            item.dataList = res.data;
          });
        }
      },
      acquireInput(item) {
        return (
          <el-input
            type={item.type}
            show-password={item.showPassword}
            value={this.$attrs.value[item.name]}
            size={item.size ? item.size : 'small'}
            style={item.style ? item.style : 'width: 200px'}
            disabled={item.disabled ? item.disabled : false}
            clearable={item.clearable ? !item.clearable : true}
            maxlength={item.maxlength ? item.maxlength : 50}
            show-word-limit={item.showWordLimit ? item.showWordLimit : false}
            placeholder={item.placeholder ? item.placeholder : '请输入' + item.label}
            onInput={(e) => {
              this.$set(this.$attrs.value, item.name, e.trim())
            }}/>
        )
      },
      acquireTextarea(item) {
        return (
          <el-input
            type={item.type}
            rows={item.rows ? item.rows : 3}
            value={this.$attrs.value[item.name]}
            size={item.size ? item.size : 'small'}
            style={item.style ? item.style : 'width: 500px'}
            disabled={item.disabled ? item.disabled : false}
            autosize={item.autosize ? item.autosize : false}
            maxlength={item.maxlength ? item.maxlength : 50}
            show-word-limit={item.showWordLimit ? item.showWordLimit : false}
            placeholder={item.placeholder ? item.placeholder : '请输入' + item.label}
            onInput={(e) => {
              this.$set(this.$attrs.value, item.name, e)
            }}/>
        )
      },
      acquireSelect(item) {
        return (
          <el-select
            value={this.$attrs.value[item.name]}
            size={item.size ? item.size : 'small'}
            remote={item.remote ? !item.remote : true}
            style={item.style ? item.style : 'width: 200px'}
            multiple={item.multiple ? item.multiple : false}
            disabled={item.disabled ? item.disabled : false}
            clearable={item.clearable ? !item.clearable : true}
            filterable={item.multiple ? !item.filterable : true}
            placeholder={item.placeholder ? item.placeholder : '请选择' + item.label}
            filter-method={(e) => {
              item.filterMethod ? item.filterMethod : this.filterMethod(e, item);
            }}
            onChange={(e) => {
              this.$set(this.$attrs.value, item.name, e);
            }}>
            {
              [].concat(...item.dataList).map(value => {
                return (
                  <el-option
                    key={value.key}
                    label={value.label}
                    value={value.key}>
                  </el-option>
                )
              })
            }
          </el-select>
        )
      },
      acquireDate(item) {
        return (
          <el-date-picker
            type={item.type}
            size={item.size ? item.size : 'small'}
            attrs={{value: this.$attrs.value[item.name]}}
            disabled={item.disabled ? item.disabled : false}
            style={item.style ? item.style : 'width: 200px'}
            value-format={item.valueFormat ? item.valueFormat : 'timestamp'} // 默认时间戳格式
            placeholder={item.placeholder ? item.placeholder : '请选择' + item.label}
            change={item.change}
            onInput={(e) => {
              this.$set(this.$attrs.value, item.name, e)
            }}>
          </el-date-picker>
        )
      },
      acquireDateRange(item) {
        return (
          <el-date-picker
            type={item.type.toLowerCase()}
            value={this.$attrs.value[item.name]}
            size={item.size ? item.size : 'small'}
            end-placeholder="请选择结束日期"
            start-placeholder="请选择开始日期"
            disabled={item.disabled ? item.disabled : false}
            style={item.style ? item.style : 'width: 500px'}
            value-format={item.valueFormat ? item.valueFormat : 'timestamp'}
            range-separator={item.rangeSeparator ? item.rangeSeparator : '至'}
            change={item.change}
            onInput={(e) => {
              this.$set(this.$attrs.value, item.name, e)
            }}>
          </el-date-picker>
        )
      },
      acquireCascade(item) {
        return (
          <el-cascader
            options={item.options}
            value={this.$attrs.value[item.name]}
            size={item.size ? item.size : 'small'}
            disabled={item.disabled ? item.disabled : false}
            style={item.style ? item.style : 'width: 200px'}
            placeholder={item.placeholder ? item.placeholder : '请选择' + item.label}
            change={item.handleChange}/>
        )
      }
    },
    render() {
      return (
        <el-form
          rules={this.rules}
          ref={this.formName}
          inline={this.inline}
          attrs={{model: this.$attrs.value}}
          label-position={this.labelPosition}
          label-width={this.labelWidth + 'px'}>
          {this.formItems.map((item) => {
            return (
              <el-form-item
                label={item.label}
                rules={item.rules}
                prop={item.name ? item.name : ''}>
                {this.processor(item)}
              </el-form-item>
            )
          })}
        </el-form>
      )
    }
  }
</script>

<style scoped>

</style>