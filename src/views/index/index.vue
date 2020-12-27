<template>
  <el-container class="height-full">
    <el-header class="main-header">
      <el-row :gutter="24" style="margin: 0">
        <el-col :span="1">
          <div class="blog">
            <img class="blog-logo" :src="require('../../assets/logo.png')"/>
          </div>
        </el-col>
        <el-col :span="20">
          <el-menu class="el-menu-demo main-menu"
                   background-color="#EEF5FE"
                   text-color="#000"
                   active-text-color="#449EFF"
                   mode="horizontal" @select="handleSelect">
            <template v-for="item in getMenu">
              <el-menu-item :class="{'menu-active': item.path === currentMenu.path}" :index="item.path" :key="item.path">
                <template slot="title">
                  <i :class="item.meta.icon"></i>
                  <span>{{item.meta.title}}</span>
                </template>
              </el-menu-item>
            </template>
          </el-menu>
        </el-col>
        <el-col :offset="getMenu.length > 0 ? 0 : 20" :span="3">
          <el-row :gutter="24">
            <el-col :span="12">
              <div style="height: 60px; font-size: 1rem; float: right; font-weight: bold; display: flex;
                   align-items: center; justify-content: center; color: #449EFF;">
                {{$store.state.user.userName}}
              </div>
            </el-col>
            <el-col :span="12">
              <div class="block" style="height: 60px; display: flex; align-items: center; justify-content: center;">
                <el-dropdown>
                <span class="el-dropdown-link">
                  <user-avatar :id="$store.state.user.avatar"></user-avatar>
                </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <el-button type="text">{{$store.state.user.userName}}</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button type="text" @click="logout">退出登录</el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-header>
    <div style="padding: 10px; border-bottom: 1px solid #449EFF" v-show="secondMenu.length > 1">
      <el-row>
        <template v-for="item in secondMenu">
          <el-button
            :class="{'menu-item-active': currentMenuItem.path === item.path}" @click="routeChange(item)"
            size="small" type="primary" round plain
            :key="item.path">{{item.meta.title}}
          </el-button>
        </template>
      </el-row>
    </div>
    <div class="height-full">
      <router-view></router-view>
    </div>
  </el-container>
</template>
<script>
  import UserAvatar from "../account/user/user-avatar";
  export default {
    components: {UserAvatar},
    data() {
      return {
        menu: [],
        secondMenu: [],
        currentMenu: {},
        currentPath: '',
        currentMenuItem: {}
      };
    },
    mounted() {
      this.initData()
    },
    watch: {
      '$store.state.menu.currentRouters': {
        handler() {
          this.initData()
        },
        deep: true
      }
    },
    computed: {
      getMenu() {
        return this.$store.getters.currentRouters;
      }
    },
    methods: {
      initData() {
        this.currentPath = this.$route.path;
        this.menu = this.$store.getters.currentRouters
        for (let i = 0; i < this.menu.length; i++) {
          const temp = this.menu[i].children
          if (temp && temp.length > 0) {
            for (let j = 0; j < temp.length; j++) {
              if (Object.is(temp[j].path, this.currentPath)) {
                this.secondMenu = temp
                this.currentMenuItem = temp[j]
                this.currentMenu = this.menu[i]
                break
              }
            }
          }
        }
      },
      handleSelect(key) {
        let temp = this.$store.getters.currentRouters
        let filter = temp.filter((value) => value.path === key)
        this.currentMenu = filter[0]
        if (filter.length > 0) {
          this.secondMenu = filter[0].children || []
          this.currentMenuItem = this.secondMenu[0]
          this.routeChange(this.currentMenuItem)
        }
      },
      routeChange(menuItem) {
        this.currentMenuItem = menuItem
        this.currentPath = this.$route.path;
        if (menuItem.path !== this.currentPath) {
          this.$router.push({path: menuItem.path}).catch(() => {})
        }
      },
      logout() {
        this.$store.dispatch('FedLogOut', this.user).then(() => {
          this.$store.dispatch('LogOut', this.user).then();
        });
        location.reload();
      },
    }
  };
</script>
<style scoped lang="scss">
  .main-header {
    padding: 0;
    background-color: #EEF5FE !important;
  }

  .blog {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    color: $default-background-color;
    font-weight: bold;
    .blog-logo {
      width: 30px;
      height: 30px;
    }
  }

  .el-menu.el-menu--horizontal {
    border-bottom: none !important;
  }

  .menu-item-active {
    color: $white-color;
    background: $default-background-color;
    border-color: $default-background-color;
  }

  .menu-active {
    color: $default-background-color !important;
    border-bottom-color: $default-background-color !important;
  }
</style>
