<script>
  import {ApiFactory, Dict} from "@/resources";
  import CustomFileUpload from "@/components/custom/custom-file-upload";

  export default {
    name: "CustomForm",
    components: {CustomFileUpload},
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
        let functionName = 'acquire' + type;
        if (Object.prototype.hasOwnProperty.call(self, functionName)) {
          return self[functionName](item); // 拼接方法
        } else {
          throw new Error(`type:${item.type}错误不存在对应的方法:${functionName}`);
        }
      },
      replaceStr(str) {
        let reg = /\b(\w)|\s(\w)/g;
        return str.replace(reg, function (m) {
          return m.toUpperCase();
        });
      },
      uploadSuccess(e) {
        this.$emit('uploadSuccess', e)
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
            style={item.style}
            show-password={item.showPassword}
            value={this.$attrs.value[item.name]}
            size={item.size ? item.size : 'small'}
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
            style={item.style}
            rows={item.rows ? item.rows : 3}
            value={this.$attrs.value[item.name]}
            size={item.size ? item.size : 'small'}
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
            style={item.style}
            value={this.$attrs.value[item.name]}
            size={item.size ? item.size : 'small'}
            remote={item.remote ? !item.remote : true}
            multiple={item.multiple ? item.multiple : false}
            disabled={item.disabled ? item.disabled : false}
            clearable={item.clearable ? !item.clearable : true}
            filterable={item.multiple ? !item.filterable : true}
            placeholder={item.placeholder ? item.placeholder : '请选择' + item.label}
            filter-method={(e) => {
              item.filterMethod ? item.filterMethod : this.filterMethod(e, item);
            }}
            onFocus={() => {
              if (item.dataList.length === 0) {
                this.filterMethod('', item);
              }
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
            style={item.style}
            size={item.size ? item.size : 'small'}
            attrs={{value: this.$attrs.value[item.name]}}
            disabled={item.disabled ? item.disabled : false}
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
            style={item.style}
            type={item.type.toLowerCase()}
            value={this.$attrs.value[item.name]}
            size={item.size ? item.size : 'small'}
            end-placeholder="请选择结束日期"
            start-placeholder="请选择开始日期"
            disabled={item.disabled ? item.disabled : false}
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
            style={item.style}
            options={item.options}
            value={this.$attrs.value[item.name]}
            size={item.size ? item.size : 'small'}
            disabled={item.disabled ? item.disabled : false}
            placeholder={item.placeholder ? item.placeholder : '请选择' + item.label}
            change={item.handleChange}/>
        )
      },
      acquireFile(item) {
        return (
          <custom-file-upload checkType={item.checkType ? !item.checkType : true} onOn-success={(e) => {
            this.uploadSuccess(e);
          }}/>
        )
      }
    },
    render() {
      return (
        <el-form
          rules={this.rules}
          ref={this.formName}
          inline={this.inline}
          style={'padding-top: 20px'}
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

<style>
  .el-form-item__label{
    text-align: right !important;
  }
  .el-select {
    width: 100%;
  }
</style>