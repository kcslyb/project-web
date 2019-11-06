<template>
  <div>
    <div class="page-wrap">
      <div class="container">
        <div class="content">
          <div>
            <h1 class="text-align-left">
              BLOG
            </h1>
          </div>
          <div class="nav-login">
            <div class="content-container nav-container">
              <h3>
                Individual Learning
              </h3>
              <p>
                Ability to improve of personal blog.
              </p>
            </div>
            <div class="sign-in-container nav-container">
              <div class="border-item">
                <span class="nav-item" :class="isActive ? 'is-active' : 'not-active'">
                  <a>Sign in</a>
                </span>
                <span class="nav-item" :class="isActive ? 'not-active' : 'is-active'">
                  <a @click="addUer">Register</a>
                </span>
              </div>
              <div class="login-box">
                <label class="label-bold">Username or email</label>
                <div>
                  <input class="input" @keyup.enter.prevent="handleLogin()"
                         v-model="user.userName" placeholder="Username or email"></input>
                </div>
                <label class="label-bold">Password</label>
                <div>
                  <input class="input" type="password" @keyup.enter.prevent="handleLogin()"
                         v-model="user.passWord" placeholder="Password"></input>
                </div>
                <div>
                  <div class="remember">
                    <div class="float-left">
                      <el-checkbox v-model="user.remember">Remember me</el-checkbox>
                    </div>
                    <div class="float-right">
                      <a @click="resetPassword">Forgot your password?</a>
                    </div>
                  </div>
                  <div>
                    <input type="button" value="Sign in" class="btn-submit" @click="handleLogin()">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <custom-drawer title="Register" :show.sync="showRight" @rightClose="rightClose" :default-with="true">
      <edit-form @right-close="rightClose">
      </edit-form>
    </custom-drawer>
    <custom-drawer title="Rest Password" :show.sync="showRightRest" @rightClose="rightClose" :default-with="true">
      <reset-form @right-close="rightClose">
      </reset-form>
    </custom-drawer>
  </div>
</template>
<script>
  import EditForm from './register-from.vue';
  import ResetForm from './reset-form.vue';
  import EncryptHelper from '@/utils/encryption-util';
  import {addOrEditLocalStorage, getLocalStorage, removeLocalStorageAll} from '@/utils/localstorage-util.ts';

  export default {
    name: 'login',
    components: {
      ResetForm,
      EditForm
    },
    data() {
      return {
        showRight: false,
        showRightRest: false,
        isActive: true,
        loading: false,
        rememberFlag: 0,
        user: {
          remember: false,
          userName: '',
          passWord: ''
        },
      };
    },
    mounted() {
      this.setUserDate();
    },
    methods: {
      setUserDate() {
        let user = getLocalStorage('user');
        if (user) {
          this.user = EncryptHelper.aesDecrypt(user);
        }
      },
      handleLogin() {
        if (!this.user.userName) {
          this.$message({
            type: 'info',
            message: 'Please enter the username or email'
          });
          return;
        }
        if (!this.user.passWord) {
          this.$message({
            type: 'info',
            message: 'Please enter the password'
          });
          return;
        }
        this.$store.dispatch('Login', this.user).then(res => {
          if (res) {
            removeLocalStorageAll();
            if (this.user.remember) {
              let encrypt = EncryptHelper.aesEncrypt(JSON.stringify(this.user));
              addOrEditLocalStorage('user', encrypt);
            }
            this.$router.push('/home').catch(() =>{});
          }
        }).catch(() => {});
      },
      addUer() {
        this.isActive = false;
        this.showRight = true;
      },
      resetPassword() {
        this.showRightRest = true;
      },
      rightClose() {
        this.isActive = true;
        this.showRight = false;
        this.showRightRest = false;
      },
    }
  };
</script>
<style scoped lang="scss">
  .page-wrap {
    min-height: 100%;
    padding-top: 10%;
    position: relative;
  }

  .container {
    width: 100%;
    padding: 0;
    margin: auto;
  }

  .content {
    margin: auto;
    width: 50%;
    text-align: center;
    @media (max-width: 1350px){
      width: 60%;
    }
    @media (max-width: 1150px){
      width: 70%;
    }
    @media (max-width: 950px) {
      width: 80%;
    }
    @media (max-width: 800px){
      width: 90%;
    }
    @media (max-width: 720px){
      width: 100%;
    }
  }

  .nav-login{
    margin:auto ;
    text-align: center;
  }

  .border-item{
    clear: left;
    width: 100%;
    box-shadow: 0 0 0 1px #e5e5e5;
    border-top-right-radius: 0.25rem;
    border-top-left-radius: 0.25rem;
  }

  .nav-item {
    width: 50%;
    padding: 8px;
    line-height: 28px;
    text-align: center;
    display: inline-block;
    box-sizing: border-box;
    border: 1px solid #e5e9f2;
  }

  .nav-item a {
    cursor:pointer;
    display: block;
    list-style: none;
    font-size: 14px;
    text-decoration: none;
    line-height: 28px;
    transition: background-color 100ms linear, color 100ms linear, border 100ms linear;
  }

  .is-active{
    border-bottom: 2px solid $purple-color;
    a {
      color: #000;
      background-color: #fff;
    }
  }
  .not-active{
    background-color: #fafafa;
    border-bottom: 2px solid transparent;
    a {
      color: #707070;
      background-color: transparent;
    }
  }

  .nav-container {
    width: 100%;
    text-align: left;
    display: inline-block;
    box-sizing: border-box;
  }

  .content-container {
    float: left;
    width: 50%;
    @media (max-width: 650px){
      width: 100%
    }
  }

  .sign-in-container {
    position: relative;
    width: 50%;
    padding-right: 15px;
    padding-left: 15px;
    box-sizing: border-box;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #2e2e2e;
    text-align: left;
    @media (max-width: 650px){
      width: 100%
    }
  }

  .btn-submit {
    background-color: $default-background-color;
    color: $white-color;
    padding: 6px 0 10px;
    margin-bottom: 10px;
    width: 100%;
    display: block;
    cursor:pointer;
    text-align: center;
    border-radius: 4px;
    font-size: 16px;
    border: 1px solid;
  }

  .float-left {
    float: left !important;
    box-sizing: border-box;
  }

  .float-right {
    padding-top: 5px;
    float: right !important;
    box-sizing: border-box;
  }

  .float-right a {
    cursor:pointer;
    font-size: 0.1rem;
    list-style: none;
    color: #007bff;
    text-decoration: none;
    background-color: transparent;
  }

  .remember {
    width: 100%;
    cursor: default;
    box-sizing: border-box;
    display: inline-block;
    padding: 5px 0;
  }

  .login-box {
    box-shadow: 0 0 0 1px #e5e5e5;
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    padding: 15px 15px 5px;
  }
  label {
    display: inline-block;
    padding-top: 5px;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
    color: #2e2e2e;
    text-align: left;
    background-color: #fff;
  }
  .input {
    width: 94%;
    display: block;
    padding: 6px 10px;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
    color: #2e2e2e;
    background-color: #e8f0fe;
    background-clip: padding-box;
    border: 1px solid #dfdfdf;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
</style>
