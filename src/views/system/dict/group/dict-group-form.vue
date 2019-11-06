<template>
  <el-form :model="formItem" :rules="rules" ref="formItem" class="demo-ruleForm">
    <el-form-item label="字典组标题" prop="name">
      <el-input v-model="formItem.name"></el-input>
    </el-form-item>
    <el-form-item label="字典组值" prop="label">
      <el-input v-model="formItem.label"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('formItem')" size="mini">提交</el-button>
      <el-button @click="resetForm('formItem')" size="mini">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {ApiFactory, DictGroup} from '@/resources';

    @Component

    export default class DictGroupForm extends Vue {
        public name: string = 'DictGroupForm';
        @Prop()
        public formItem!: {};

        public rules: {} = {
            name: [
                {required: true, message: '请输入字典标题', trigger: 'blur'},
                {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
            ],
            label: [
                {required: true, message: '请输入字典值', trigger: 'blur'},
                {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
            ]
        };

        public updateDictGroup(formItem: any) {
            if (formItem.id) {
                ApiFactory.getApi(DictGroup).put(formItem).then(res => {
                    this.$emit('close-form', res);
                });
            } else {
                ApiFactory.getApi(DictGroup).post(formItem).then(res => {
                    this.$emit('close-form', res);
                });
            }
        }

        submitForm(formName: string) {
            let form: any = this.$refs[formName];
            form.validate((valid: any) => {
                if (valid) {
                    this.updateDictGroup(this.formItem);
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
