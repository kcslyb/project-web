<template>
  <div>
    <div class="el-container">
      <div class="el-aside" :style="'width: 200px ; border: 1px solid #e6e6e6; height: '+ defaultHeight +'px;'">
        <div align="center">
          <h3 style="display: inline-block;">账户角色</h3>
          <el-button @click="showSearchInput = !showSearchInput" size="mini" type="primary" plain icon="el-icon-search" circle></el-button>
          <custom-perm label="add-user-account">
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
          <template v-for="item of roleList">
            <el-button style="width: 196px; margin: 0; height: 60px" :class="{'is-selected-color': roleDto.roleId === item.roleId}" @click="changeRole(item)" :key="item.roleId">
              <div style="text-align: center;font-size: 1.1em; user-select: text">{{item.roleDescription}}</div>
              <div style="text-align: center; font-size: 0.7em; color: #aaa; user-select: text">{{item.roleName}}</div>
            </el-button>
          </template>
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
          :data="defaultPermissionTree"
          default-expand-all
          node-key="id"
          ref="tree">
        </el-tree>
      </div>
    </div>
    <custom-drawer title="编辑角色" :show="showRight" @rightClose="rightClose" :css="{'width': '800px'}">
      <role-permission-page :tree="permissionTreeAll" :role="roleDto" :defaultChecked="defaultChecked" @rightClose="rightClose" @right-Close="rightCloseRoad"></role-permission-page>
    </custom-drawer>
  </div>
</template>

<script>
  import {ApiFactory, Role} from '@/resources';
  import permission from './permission';
  import PermissionTree from '@/utils/permission';


  export default {
    components: {
      RolePermissionPage : permission,
    },
    data() {
      return {
        showRight: false,
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
        this.permissionTree = PermissionTree;
        this.permissionTreeAll = PermissionTree;
        let formData = JSON.parse(JSON.stringify(this.condition));
        ApiFactory.getApi(Role).queryAllPermissionByRole(formData).then((res) => {
          this.roleList = res;
          this.changeRole(this.roleList.length > 0 ? this.roleList[0] : {});
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        })
      },
      changeRole(item) {
        ApiFactory.getApi(Role).queryRolePermissionByRoleId(item.roleId).then((res) => {
          this.roleDto = res;
          let temp = [];
          this.roleDto.rolePermissionList.forEach(value => {
            temp.push(value.rolePermissionLabel);
          });
          this.defaultChecked  = temp;
          this.permissionTree =[];
          this.permissionTree = PermissionTree;
          this.defaultPermissionTree = this.filterPermission(this.permissionTree, temp);
          console.info(this.defaultPermissionTree);
          this.loading = false;
        });
      },
      filterMenu(object, list) {
        if (value.children && value.children.length > 0) {
          value.children = value.children.filter(value => permissions.includes(value.id));
        }
      },
      filterPermission (permissionMenu, permissions) {
        let temp = permissionMenu.map(item => {
          this.filterMenu(item, permissions)
        });
        return permissionMenu.filter(value => {
          if (value.children && value.children.length > 0) {
            value.children = value.children.filter(value => permissions.includes(value.id));
            return this.filterPermission(value.children, permissions);
          } else {
            return permissions.includes(value.id);
          }
        });
      },
      editRolePermission() {
        this.showRight = true;
      },
      addRole() {
        // console.log('add');
      },
      editRole() {
        // console.log('edit');
      },
      deleteRole() {
        // console.log('delete');
      },
      addDepartment() {
        this.action = 'add';
        this.dictionary = JSON.parse(JSON.stringify({}));
        this.showRight = true;
      },
      editDepartment(item) {
        this.action = 'edit';
        this.dictionary = JSON.parse(JSON.stringify(item));
        this.showRight = true;
      },
      deleteDepartment(item) {
        this.$confirm('确认删除？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          ApiFactory.getApi(Role).delete(item).then(() => {
            this.rightCloseRoad();
            this.$notify.success({
              title: '提示',
              message: '删除成功'
            })
          }).catch(()=> {
            this.$notify.error({
              title: '提示',
              message: '删除失败'
            })
          });
        }).catch(() => {});
      },
      rightClose() {
        this.showRight = false;
      },
      rightCloseRoad() {
        this.showRight = false;
        this.getRoleList();
      }
    }
  };
</script>

<style scoped lang="scss">
</style>
