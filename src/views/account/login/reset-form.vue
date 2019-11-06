<template>
  <el-form :model="user" :rules="rules" ref="userForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="新密码:" prop="password" :hide-required-asterisk="true">
      <el-input v-model="user.password"></el-input>
    </el-form-item>
    <el-form-item label="确认新密码:" prop="confirmPassword" :hide-required-asterisk="true">
      <el-input v-model="user.confirmPassword"></el-input>
    </el-form-item>
    <el-form-item
        prop="emailCode"
        label="验证码:"
        :rules="[
          { required: true, message: '请输入邮箱验证码', trigger: 'blur' },
        ]"
    >
      <el-row :gutter="24">
        <el-col :span="13">
          <el-input v-model="user.emailCode"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="getCode" size="small">获取验证码</el-button>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
      <el-button @click="resetForm('roleForm')">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import {Notification} from 'element-ui';
    import {ApiFactory, UserAccount} from '@/resources';
    import {Provide} from 'vue-property-decorator';

    @Component
    export default class ResetForm extends Vue {
        @Provide()
        user = {
            password: '',
            emailCode: '',
            confirmPassword: ''
        };

        @Provide()
        validatePass: any = (rule: any, value: any, callback: (...error: Error[]) => {}) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            }
        };
        @Provide()
        validatePass2: any = (rule: any, value: any, callback: (...error: Error[]) => {}) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.user.password) {
                callback(new Error('两次输入密码不一致!'));
            }
            callback();
        };

        @Provide()
        rules = {
            password: [
                {validator: this.validatePass, trigger: 'blur'}
            ],
            confirmPassword: [
                {validator: this.validatePass2, trigger: 'blur'}
            ],
        };

        getCode() {

        }

        submitForm(formName: any) {
            const form: any = this.$refs[formName];
                form.validate((valid: any) => {
                if (valid) {
                    ApiFactory.getApi(UserAccount).put({}).then(() => {
                        Notification.success({
                            type: 'success',
                            title: '成功',
                            message: '修改成功'
                        });
                        this.resetForm(form);
                        this.$emit('rightClose');
                    }).catch(error => {
                        Notification({
                            type: 'error',
                            title: '失败',
                            message: '修改失败'
                        });
                    });
                }
            });
        }

        resetForm(formName: any) {
            // formName.resetFields();
            this.$emit('right-close');
        }
    }

</script>

<style scoped>

</style>
