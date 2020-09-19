<template>
  <div>
    <div class="el-container">
      <div class="el-aside" style="width: 130px; border-right: 1px solid #e6e6e6; border-top: 1px solid #e6e6e6">
        <div>
          <h3>编辑角色</h3>
        </div>
        <div style="position: absolute; bottom: 130px; left: 40px">
          <div>
            <el-button type="primary" :loading="loading" plain @click="changeRolePermission">保存</el-button>
          </div>
          <div style="margin-top: 20px">
            <el-button type="info " plain @click="rightClose">取消</el-button>
          </div>
        </div>
      </div>
      <div class="el-main custom-scrollbar" :style="'border-top: 1px solid #e6e6e6; padding: 0 0 20px 0; height:' +defaultHeight + 'px'">
        <div class="el-form-item__content" style="padding: 10px 0 10px 10px">
          <span>{{role.roleDescription}}</span>
          <span>({{role.roleName}})</span>
        </div>
        <div>
          <el-form label-width="80px" :model="role">
            <el-form-item label="角色别名:">
              <el-input v-model="role.roleName" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="角色名称:">
              <el-input v-model="role.roleDescription" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="分配权限:">
              <div align="right" style="padding-right: 30px">
                <div style="display: inline-block;">
                  <el-input v-model="searchText" size="small" placeholder="请输入关键字搜索"></el-input>
                </div>
                <el-button size="small" type="primary" plain icon="el-icon-search" circle></el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <el-tree
            ref="tree"
            :data="tree"
            node-key="id"
            show-checkbox
            default-expand-all
            :filter-node-method="filterNode"
            :default-checked-keys="defaultChecked">
        </el-tree>
      </div>
    </div>
  </div>
</template>
<script>
  import {ApiFactory, Role} from '@/resources';

  export default {
    props: {
      role: {
        type: Object,
        default: () => {}
      },
      defaultChecked: {
        type: Array,
        default: () => []
      },
      tree: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        showSearchInput: false,
        loading: false,
        searchText: '',
        defaultHeight: window.innerHeight - 80,
        dataList: []
      };
    },
    watch: {
      searchText(val) {
        this.$refs.tree.filter(val);
      },
      defaultChecked(val) {
        this.$refs.tree.setCheckedKeys(val);
      }
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.includes(value) || data.id.includes(value);
      },
      getCheckedNodes() {//获取选择的节点信息
        let permissionRequest = [];
        this.$refs.tree.getCheckedNodes(false, true).forEach((value) => {
          permissionRequest.push({
            rolePermissionLabel: value.id,
            rolePermissionTitle: value.label
          });
        });
        return permissionRequest;
      },
      changeRolePermission() {
        this.loading = true;
        let param = {roleId: this.role.roleId, permissionList: this.getCheckedNodes()};
        ApiFactory.getApi(Role).updateRolePermission(param).then((res) => {
          this.loading = false;
          this.close();
          this.$notify.success({
            title: '提示',
            message: '编辑成功'
          });
          if (this.role.roleName === this.$store.state.user.roleName) {
            this.$store.dispatch('LogOut').then(() => {
              this.$store.dispatch('FedLogOut').then(() => {
              });
              location.reload();
            }).catch(() => {
            });
          }
        }).catch((reject) => {
          this.loading = false;
          this.$notify.error({
            title: '提示',
            message: '编辑失败' + reject
          });
        });
      },
      close() {
        this.$emit('rightClose');
      },
      rightClose() {
        this.$emit('rightClose');
      }
    }
  };
</script>

<style scoped>
</style>
