<template>
  <el-container>
    <el-header style="padding: 0; background-color: #545C64;">
      <el-row :gutter="24" style="margin: 0">
        <el-col :span="1">
          <div style="display: flex; align-items: center;justify-content: center; height: 60px">
            <custom-logo :width="40"></custom-logo>
          </div>
        </el-col>
        <el-col :span="20">
          <el-menu class="el-menu-demo"
                   background-color="#545C64"
                   text-color="#FFF"
                   active-text-color="#FFD04B"
                   mode="horizontal" @select="handleSelect">
            <template v-for="item in getMenus">
              <el-menu-item :index="item.path" :key="item.path">
                <template slot="title">
                  <i :class="item.meta.icon"></i>
                  <span>{{item.meta.title}}</span>
                </template>
              </el-menu-item>
            </template>
          </el-menu>
        </el-col>
        <el-col :span="2">
          <el-row :gutter="24">
            <el-col :span="12">
              <div style="height: 60px; display: flex; align-items: center; justify-content: center;">
                {{$store.state.user.userName}}
              </div>
            </el-col>
            <el-col :span="12">
              <div class="block" style="height: 60px; display: flex; align-items: center; justify-content: center;">
                <el-dropdown>
                <span class="el-dropdown-link">
                  <custom-logo :width="40"></custom-logo>
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
    <div style="padding: 10px; background-color: #e5e9f2;" v-show="routers.length > 0">
      <el-row>
        <template v-for="item in routers.length === 0 ? getRouters : routers">
          <el-button @click="routeChange(item.path)" type="warning" round plain :key="item.path">{{item.meta.title}}
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
    computed: {
      getMenus() {
        return this.$store.state.menu.currentRouters;
      },
      getRouters() {
        let menus = this.$store.state.menu.currentRouters;
        if (menus.length > 0) {
          return menus[0].children;
        }
        return [];
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        let menuTree = this.$store.state.menu.currentRouters;
        let filter = menuTree.filter((value) => value.path === keyPath[0]);
        this.routers = filter[0].children;
        this.routeChange(this.routers[0].path);
      },
      routeChange(path) {
        this.$router.push({path: path});
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
<style>
</style>
