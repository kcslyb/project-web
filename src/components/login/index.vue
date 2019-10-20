<template>
  <div id="login-page" :style="'height: '+ defaultHeight +'px;'" v-loading="loading">
    <div id="login-div-parent" align="center">
      <div id="login-div">
        <div id="responsive">
          <custom-logo :css="{'width': '100%', 'height': '100%', 'border-radius': '0px', 'filter': 'blur(20px)'}"></custom-logo>
        </div>
        <div class="el-main">
          <el-form :model="user" :rules="rules"  ref="user" label-width="100px" class="demo-ruleForm">
            <el-form-item label="username" prop="userName" align="center">
              <el-input v-model="user.userName" @keyup.enter.native="handleLogin('user')" placeholder="username" @focus="ishaver = true" @blur="ishaver = false"></el-input>
            </el-form-item>
            <el-form-item label="password" prop="passWord" align="center">
              <el-input type="password" v-on:keyup.enter.native="handleLogin('user')" v-model="user.passWord" placeholder="password" @focus="ishaver = true" @blur="ishaver = false"></el-input>
            </el-form-item>
            <el-row align="center">
              <el-button type="primary" style="width: 60%;padding: 10px" @click="handleLogin('user')">确 定</el-button>
              <el-button size="small" type="text" @click="addUer" align="left">忘记密码</el-button>
              <el-button size="small" type="text" @click="addUer" align="left">注册</el-button>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
    <custom-drawer :title="formTitle" :show.sync="showRight" @rightClose="rightClose" :default-with="true">
      <edit-form @right-close="rightClose">
      </edit-form>
    </custom-drawer>
  </div>
</template>
<script>
  import editForm from './from.vue';
  import {CustomUtils} from '@/utils/utils';
  import {addOrEditLocalStorage, getLocalStorage} from '@/utils/localstorageutil.ts';

  export default {
    name: 'login',
    components: {
      editForm: editForm
    },
    data() {
      return {
        action: '',
        rdmColor: (CustomUtils.randomColor)(),
        defaultHeight: window.innerHeight ,
        showRight: false,
        formTitle: '',
        loading: false,
        centerDialogVisible: true,
        radio: '',
        user: {
          remember: false,
          userName: '',
          password: ''
        },
        rules: {
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            // {min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: ['blur', 'change']}
          ],
          passWord: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            // {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: ['blur', 'change']}
          ]
        },
      }
    },
    mounted () {
      this.setUserDate();
    },
    methods: {
      setUserDate() {
        let user = getLocalStorage('user');
        if (user) {
          this.user = user;
        }
      },
      handleLogin(user) {
        this.$refs[user].validate(valid => {
          if (valid) {
            this.$store.dispatch('Login', this.user).then(res => {
              if (res) {
                addOrEditLocalStorage('user', this.user);
                this.$router.push({path: '/home'});
              }
            }).catch(() => {})
          }
        })
      },
      addUer() {
        this.showRight = true;
        this.formTitle = '注册';
      },
      rightClose () {
        this.showRight = false;
      }
    }
  }
</script>
<style scoped>
  body {
    margin: 0;
    border: 0;
    padding: 0;
  }
  #login-div-parent{
    height: 80%;
    padding-top: 10%;
  }

  #login-div{
    width: 28%;
    height: 55%;
    border: 1px solid #8abbfa;
  }

  #responsive{
    width: auto;
    height: 45%;
  }

  img {
    width: 100%;
    height: 100%;
  }

</style>
