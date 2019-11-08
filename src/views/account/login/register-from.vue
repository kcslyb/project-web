<template>
  <div align="center">
    <div align="center">
      <el-form :model="userDto" status-icon :rules="rules" ref="userDto"
               label-position="left"
               style="width: 70%;"
               class="demo-ruleForm">
        <el-form-item
            prop="userName"
            label="用户名"
            :rules="[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 12, message: '长度在 1 到 12 个字符', trigger: ['blur', 'change'] }
        ]"
        >
          <el-input v-model="userDto.userName"></el-input>
        </el-form-item>
        <el-form-item
            prop="userPhone"
            label="用户号码"
            :rules="[
            { required: true, message: '请输入号码', trigger: 'blur' },
            { min: 11, max: 11, message: '请输入正确的号码', trigger: ['blur', 'change'] }
        ]"
        >
          <el-input v-model="userDto.userPhone"></el-input>
        </el-form-item>
        <el-form-item
            prop="userEmail"
            label="用户邮箱"
            :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]"
        >
          <el-input v-model="userDto.userEmail"></el-input>
        </el-form-item>
        <el-form-item
            prop="sessionCode"
            label="验证码"
            :rules="[
          { required: true, message: '请输入邮箱验证码', trigger: 'blur' },
        ]"
        >
          <el-row :gutter="24">
            <el-col :span="13"><el-input v-model="userDto.sessionCode"></el-input></el-col>
            <el-col :span="4"><el-button type="primary" @click="getCode" size="small">获取验证码</el-button></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="密码" prop="userPassword">
          <el-input type="password" v-model="userDto.userPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="userDto.checkPass"></el-input>
        </el-form-item>
        <el-form-item>
          <div align="right">
            <el-button type="primary" plain @click="submitForm('userDto')">提交</el-button>
            <el-button type="primary" plain @click="closePage">取消</el-button>
            <el-button type="info" plain @click="resetForm('userDto')">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {ApiFactory, Email, UserAccount} from '@/resources';

  export default {
    name: 'RegisterForm',
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.userDto.checkPass !== '') {
            this.$refs.userDto.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.userDto.userPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        userDto: {
          userName: '用户名',
          userPhone: '13745678910',
          userEmail: '2815443705@qq.com',
          userPassword: '123456',
          checkPass: '123456',
          sessionCode: ''
        },
        rules: {
          userPassword: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let formData = JSON.parse(JSON.stringify(this.userDto));
            ApiFactory.getApi(UserAccount).register(formData).then((res) => {
              this.$notify({
                title: '提示',
                type: 'success',
                message: res.data ? res.date : '注册成功'
              });
              this.$emit('right-close');
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getCode() {
        ApiFactory.getApi(Email).getCode({receive: this.userDto.userEmail}).then(res => {
          this.$notify({
            title: '提示',
            type: 'success',
            message: res.data ? res.date : '验证码已成功发到邮箱'
          })
        })
      },
      closePage(){
        this.$emit('right-close');
      }
    }
  };
</script>

<style scoped>

</style>
