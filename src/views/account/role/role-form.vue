<template>
  <div>
    <el-form :model="roleDto" :rules="rules" ref="roleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="roleDto.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色简介" prop="roleDescription">
        <el-input v-model="roleDto.roleDescription"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('roleForm')">提交</el-button>
        <el-button @click="resetForm('roleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import {Notification, Message} from 'element-ui';
    import {ApiFactory, Role} from '@/resources';

    @Component
    export default class RoleForm extends Vue {

        roleDto: any = {
            roleName: '',
            roleDescription: ''
        };

        rules: object = {
            roleName: [
                {required: true, message: '请输入角色名称', trigger: 'blur'},
                {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
            ],
            roleDescription: [
                {required: true, message: '请输入角色简介', trigger: 'blur'},
                {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
            ],
        };

        submitForm(formName: any) {
            const form: any = this.$refs[formName];
                form.validate((valid: any) => {
                if (valid) {
                    ApiFactory.getApi(Role).post(this.roleDto).then(() => {
                        Notification({
                            type: 'success',
                            title: '成功',
                            message: '添加' + this.roleDto.roleName + '"成功'
                        });
                        this.resetForm(form);
                        this.$emit('rightClose');
                    }).catch(error => {
                        Notification({
                            type: 'error',
                            title: '失败',
                            message: '添加' + this.roleDto.roleName + '"失败'
                        });
                    })
                }
            });
        }

        resetForm(formName: any) {
            formName.resetFields();
        }
    }
</script>

<style scoped>

</style>
