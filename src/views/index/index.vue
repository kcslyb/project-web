<template>
  <el-container>
    <el-header class="main-header">
      <el-row :gutter="24" style="margin: 0">
        <el-col :span="1">
          <div class="blog">
            <span>BLOG</span>
          </div>
        </el-col>
        <el-col :span="20">
          <el-menu class="el-menu-demo main-menu"
                   background-color="#EEF5FE"
                   text-color="#000"
                   active-text-color="#449EFF"
                   mode="horizontal" @select="handleSelect">
            <template v-for="item in getMenu">
              <el-menu-item :index="item.path" :key="item.path">
                <template slot="title">
                  <i :class="item.meta.icon"></i>
                  <span>{{item.meta.title}}</span>
                </template>
              </el-menu-item>
            </template>
          </el-menu>
        </el-col>
        <el-col :span="3">
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
                  <el-avatar :src="$URLREQUIRE($store.state.user.avatar)" size="medium"></el-avatar>
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
    <div style="padding: 10px; border-bottom: 1px solid #449EFF" v-show="routers.length > 1">
      <el-row>
        <template v-for="item in routers">
          <el-button @click="routeChange(item.path)" type="primary" round plain :key="item.path">{{item.meta.title}}
          </el-button>
        </template>
      </el-row>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </el-container>
</template>
<script>
  export default {
    data() {
      return {
        routers: []
      };
    },
    mounted() {
      this.handleRoute(this.$route.path);
    },
    computed: {
      getMenu() {
        return this.$store.getters.currentRouters;
      }
    },
    methods: {
      handleRoute(path) {
        let temp = this.$store.getters.currentRouters;
        let routers = [];
        temp.forEach(value => {
          if (value.children && value.children.length > 1) {
            value.children.forEach(v => {
              if (Object.is(v.path, path)) {
                routers = value.children;
                return false;
              }
            });
          }
        });
        this.routers = routers;
        this.routeChange(path);
      },
      handleSelect(key, keyPath) {
        let temp = this.$store.getters.currentRouters;
        let filter = temp.filter((value) => value.path === keyPath[0]);
        if (filter.length && filter[0].children) {
          this.routers = filter[0].children;
        }
        this.routeChange(this.routers[0].path);
      },
      routeChange(path) {
        let currentPath = this.$route.path;
        if (path !== currentPath) {
          this.$router.push({path: path}).catch(() => {
          });
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
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none !important;
  }
</style>
