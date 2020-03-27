<template>
  <div>
    <div class="el-container">
      <div class="el-aside" :style="'width: 200px ; border: 1px solid #e6e6e6; height: '+ defaultHeight +'px;'">
        <div align="center">
          <h5 style="display: inline-block;">账户角色</h5>
          <el-button class="mg-r10" @click="showSearchInput = !showSearchInput" size="mini" type="primary" plain icon="el-icon-search" circle></el-button>
          <custom-perm label="add-role-manage">
            <el-tooltip class="item" effect="dark" content="账户角色" placement="top" style="margin-top: 10px">
              <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" plain circle
                         @click.stop.prevent="addRole"></el-button>
            </el-tooltip>
          </custom-perm>
          <div style="padding: 0 10px 10px 10px" v-show="showSearchInput">
            <el-input v-model="searchText" placeholder="请输入关键字搜索"></el-input>
          </div>
        </div>
        <div v-loading="loading">
          <custom-list-item
              :data="roleList"
              describe="角色编码"
              @change-click="changeRole"
              label="roleName"
              title="roleDescription">
          </custom-list-item>
        </div>
      </div>
      <div class="el-main" :style="'padding: 0; border-bottom: 1px solid #e6e6e6; height:' +defaultHeight + 'px'" v-loading="loading">
        <el-header align="right" style="padding-top: 20px; border-bottom: 1px solid #e6e6e6; border-top: 1px solid #e6e6e6">
          <div style="display: inline-block; float: left">
            <span>{{roleDto.roleDescription}}</span>
            <span>({{roleDto.roleName}})</span>
          </div>
          <el-button type="warning" size="mini" plain circle class="el-icon-edit" @click="editRolePermission"></el-button>编辑
        </el-header>
        <el-tree
          :data="permissionTree"
          default-expand-all
          node-key="id"
          ref="tree">
        </el-tree>
      </div>
    </div>
    <custom-drawer title="编辑角色" :show="showRight" @rightClose="rightClose" :css="{'width': '800px'}">
      <role-permission-page
          :role="roleDto"
          :tree="permissionTreeAll"
          :defaultChecked="defaultChecked"
          @rightClose="rightClose">
      </role-permission-page>
    </custom-drawer>
    <custom-drawer title="添加角色" :show="showAddForm" @rightClose="rightClose">
      <role-form @rightClose="rightCloseRoad"></role-form>
    </custom-drawer>
  </div>
</template>

<script>
  import {ApiFactory, Role} from '@/resources';
  import permission from './permission';
  import PermissionTree from '@/utils/permission-tree';
  import RoleForm from './role-form';
  import CustomListItem from '../../../components/custom/custom-list-item';


  export default {
    components: {
      CustomListItem,
      RoleForm,
      RolePermissionPage : permission,
    },
    data() {
      return {
        showRight: false,
        showAddForm: false,
        showSearchInput: false,
        showSearchInputTwo: false,
        loading: true,
        searchText: '',
        searchTextTwo: '',
        roleDto: {},
        activeName: '',
        defaultHeight: window.innerHeight-130,
        mainDefaultHeight: window.innerHeight-130,
        roleList: [],
        dataList: [],
        defaultChecked: [],
        condition: {},
        pager: {
          size: 10,
          current: 1,
          total: 0
        },
        permissionTree: [],
        permissionTreeAll: [],
        defaultPermissionTree: []
      };
    },
    watch: {
      searchText(val) {
        // this.rolePermissionList = this.$filterListOfString(this.rolePermissionList,['roleDescription', 'roleName'], val);
      }
    },
    mounted() {
      this.getRoleList();
    },
    methods: {
      handleSizeChange(val) {
        this.pager.size = val;
        this.getRoleList();
      },
      handleCurrentChange(val) {
        this.pager.current = val;
        this.getRoleList();
      },
      getRoleList() {
        this.loading = true;
        this.permissionTreeAll = JSON.parse(JSON.stringify(PermissionTree));
        let formData = JSON.parse(JSON.stringify(this.condition));
        ApiFactory.getApi(Role).queryAllPermissionByRole(formData).then((res) => {
          this.roleList = res.data;
          this.changeRole(this.roleList.length > 0 ? this.roleList[0] : {});
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        })
      },
      changeRole(item) {
        ApiFactory.getApi(Role).queryRolePermissionByRoleId(item.roleId).then((res) => {
          this.roleDto = res.data;
          let temp = [];
          this.roleDto.rolePermissionList.forEach(value => {
            temp.push(value.rolePermissionLabel);
          });
          this.defaultChecked = temp;
          let menuTree = JSON.parse(JSON.stringify(PermissionTree));
          this.permissionTree = this.filterPermission(menuTree, temp);
          this.loading = false;
        });
      },
      filterPermission(menuTree, permissions) {
        return menuTree.filter(item => {
          if (item.children && item.children.length > 0) {
            item.children = this.filterPermission.call(item, item.children, permissions);
          }
          return permissions.includes(item.id);
        });
      },
      editRolePermission() {
        this.showRight = true;
      },
      addRole() {
        this.showAddForm = true;
      },
      rightClose() {
        this.showAddForm = false;
        this.showRight = false;
        this.changeRole(this.roleDto);
      },
      rightCloseRoad() {
        this.showAddForm = false;
        this.showRight = false;
        this.changeRole(this.roleDto);
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../../assets/scss/common";
</style>
