<template>
  <div class="el-main">
    <el-form :model="formItem" :rules="rules" ref="formItem" class="demo-ruleForm">
      <el-form-item label="字典标题" prop="label">
        <el-input v-model="formItem.label"></el-input>
      </el-form-item>
      <el-form-item label="字典值" prop="key">
        <el-input v-model="formItem.key"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="formItem.sort"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input type="textarea" :rows="2" v-model="formItem.remarks"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formItem')" size="mini">提交</el-button>
        <el-button @click="resetForm('formItem')" size="mini">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
    import {ApiFactory, Dict} from '@/resources';
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class DictView extends Vue {
        public name: string = 'DictForm';
        @Prop()
        public formItem!: {};

        public rules: {} = {
            label: [
                {required: true, message: '请输入字典组标题', trigger: 'blur'},
                {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
            ],
            key: [
                {required: true, message: '请输入字典组值', trigger: 'blur'},
                {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
            ]
        };

        public updateDict(formItem: any) {
            if (formItem.id) {
                ApiFactory.getApi(Dict).put(formItem).then(res => {
                    this.$emit('close-form', res);
                });
            } else {
                ApiFactory.getApi(Dict).post(formItem).then(res => {
                    this.$emit('close-form', res);
                });
            }
        }

        submitForm(formName: string) {
            let form: any = this.$refs[formName];
            form.validate((valid: any) => {
                if (valid) {
                    this.updateDict(this.formItem);
                } else {
                    return false;
                }
            });
        }

        resetForm(formName: string) {
            let form: any = this.$refs[formName];
            form.resetFields();
        }
    };
</script>

<style scoped>

</style>
