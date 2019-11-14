<template>
  <div class="el-main">
    <el-form :model="formItem" :rules="rules" ref="formItem" class="demo-ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="formItem.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <div style="width: 100%; display: inline-block">
          <el-select v-model="formItem.type"
                     remote
                     filterable
                     :remote-method="filterMemoType"
                     clearable placeholder="请选择类型" style="width: 100%">
            <el-option
                v-for="item in memoType"
                :key="item.id"
                :label="item.key + '-' + item.label"
                :value="item.key">
            </el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="开销" prop="overhead">
        <el-input v-model.number="formItem.overhead" placeholder="请输入开销"></el-input>
      </el-form-item>
      <el-form-item label="发生时间" prop="happenTime">
        <div style="width: 100%; display: inline-block">
          <el-date-picker
              style="width: 100%"
              v-model="formItem.happenTime"
              type="datetime"
              format="yyyy-MM-DD HH:mm:ss"
              placeholder="选择发生时间">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="备注" prop="remake">
        <custom-feedback type="textarea" :maxlength="20" :rowNumber="2" v-model="formItem.remake"
                         placeholder="请输入备注"></custom-feedback>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formItem')" size="mini">提交</el-button>
        <el-button @click="resetForm('formItem')" size="mini">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
    import {Component, Prop, Provide, Vue} from 'vue-property-decorator';
    import {ApiFactory, Dict, Memo} from '@/resources';

    @Component
    export default class MemoForm extends Vue {
        @Provide() public name: string = 'MemoForm';
        @Provide() public memoType: any[] = [];
        @Prop() public formItem!: {};

        public rules: {} = {
            title: [
                {required: true, message: '请输入备忘标题', trigger: 'blur'},
            ],
            type: [
                {required: true, message: '请选择备忘类型', trigger: 'change'},
            ],
            overhead: [
                {required: true, message: '请输入开销值', trigger: 'blur'},
                {type: 'number', message: '开销值必须为数字', trigger: 'blur'}
            ],
            happenTime: [
                {required: true, message: '请选择发生时间', trigger: 'blur'},
            ]
        };

        mounted() {
            ApiFactory.getApi(Dict).queryDictByGroupLabel('memoType').then((res) => {
                this.memoType = res.data;
            });
        }

        public editMemo(formItem: any) {
            if (formItem.id) {
                ApiFactory.getApi(Memo).put(formItem).then(res => {
                    this.$emit('close-form', res);
                });
            } else {
                ApiFactory.getApi(Memo).post(formItem).then(res => {
                    this.$emit('close-form', res);
                });
            }
        }

        submitForm(formName: string) {
            let form: any = this.$refs[formName];
            form.validate((valid: any) => {
                if (valid) {
                    this.editMemo(this.formItem);
                } else {
                    return false;
                }
            });
        }

        resetForm(formName: string) {
            let form: any = this.$refs[formName];
            form.resetFields();
        }

        public filterMemoType(query: string) {
            let temp = [];
            if (query) {
                temp = this.memoType.filter(value => {
                    return value.label.includes(query) && value.remarks.includes(query)
                });
            }
            return temp;
        }
    };
</script>

<style scoped lang="scss">

</style>
