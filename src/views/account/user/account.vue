<template>
  <div>
    <div class="el-container">
      <div class="el-aside" :style="'width: 20% ; border: 1px solid #e6e6e6; height: '+ defaultHeight +'px;'">
        <div class="text-align-center">
          <div style="display: inline-block; font-size: 14px; padding: 14px 0; font-weight: bold">账户等级</div>
          <el-button @click="showSearchInput = !showSearchInput" size="mini" type="primary" plain icon="el-icon-search"
                     circle></el-button>
          <custom-perm :label="'add-department-manage'">
            <el-tooltip class="item" effect="dark" content="新增账户等级" placement="top" style="margin-top: 10px">
              <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" plain circle
                         @click.stop.prevent="addAccountDepartment"></el-button>
            </el-tooltip>
          </custom-perm>
          <div style="padding: 0 10px 10px 10px" v-show="showSearchInput">
            <el-input v-model="searchText" placeholder="请输入关键字搜索"></el-input>
          </div>
        </div>
        <div class="custom-scrollbar">
          <custom-list-item :data="department"
                            :perm="departmentPerms" describe="等级编号"
                            :current-id="depart.departmentId"
                            @change-click="setUserAccountList"
                            @update-click="editDepartment"
                            @remove-click="deleteDepartment"
                            label="departmentNumber"
                            title="departmentName">
          </custom-list-item>
        </div>
      </div>
      <div class="el-main" style="padding: 0">
        <div style="width: 100%;">
          <custom-collapse>
            <div slot="operate">
              <div style="display: inline-block">
                <div style="display: inline-block" v-show="showSearchInputTwo">
                  <el-input size="small" v-model="searchTextTwo" placeholder="请输入关键字搜索"></el-input>
                </div>
                <el-button class="mg-r10" @click="showSearchInputTwo = !showSearchInputTwo" size="small" type="primary"
                           plain icon="el-icon-search" circle></el-button>
              </div>
              <custom-perm :label="'add-user-manage'">
                <el-tooltip class="item" effect="dark" content="新增账户" placement="top">
                  <el-button class="mg-r10" size="small" type="primary" icon="el-icon-circle-plus-outline" plain
                             @click.stop.prevent="addAccount">新增账户
                  </el-button>
                </el-tooltip>
              </custom-perm>
              <custom-perm :label="'export-user-manage'">
                <el-tooltip class="item" effect="dark" content="导出用户" placement="top">
                  <el-button size="small" type="primary" icon="el-icon-download" plain
                             @click.stop.prevent="exportAccount">导出用户
                  </el-button>
                </el-tooltip>
              </custom-perm>
            </div>
          </custom-collapse>
          <el-table class="custom-scrollbar" :data="accountUser" :header-cell-style="$tableCellHeader"
                    :height="tableDefaultHeight">
            <el-table-column type="index" width="50" label="序号" :index="$indexMethod(page)"></el-table-column>
            <el-table-column prop="userName" label="用户姓名">
              <template slot-scope="scope">
                <div>
                  {{scope.row.userName}}
                  <el-tag size="mini" type="success" v-if="scope.row.userStatus === '1'">正常</el-tag>
                  <el-tag size="mini" type="info" v-else>停用</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="userRoleName" label="用户角色"></el-table-column>
            <el-table-column prop="userDepartmentName" label="用户部门"></el-table-column>
            <el-table-column prop="userPhone" label="电话号码"></el-table-column>
            <el-table-column prop="userEmail" label="电子邮箱"></el-table-column>
            <el-table-column prop="userLoginNumber" label="登录次数">
              <template slot-scope="scope">
                <div>
                  登录{{scope.row.userLoginNumber}}次
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="userCreateTime" label="创建时间" show-overflow-tooltip
                             :formatter="$formatDateTime"></el-table-column>
            <el-table-column label="操作" width="320px" align="center">
              <template slot-scope="scope">
                <custom-perm :label="'select-user-manage'">
                  <span @click="queryAccount(scope.row)">
                    <el-button type="primary" size="mini" plain circle class="el-icon-search"></el-button>查看
                  </span>
                </custom-perm>
                <custom-perm :label="'update-user-manage'">
                  <el-button type="warning" size="mini" plain circle class="el-icon-edit"
                             @click="updateAccount(scope.row)"></el-button>
                  编辑
                </custom-perm>
                <custom-perm :label="'disable-user-manage'">
                  <el-button type="info" size="mini" plain circle class="el-icon-refresh"
                             @click="disableAccount(scope.row)" v-if="scope.row.userStatus === '1'"></el-button>
                  <el-button type="success" size="mini" plain circle class="el-icon-refresh"
                             @click="disableAccount(scope.row)" v-else></el-button>
                  {{scope.row.userStatus === '1'?'停用':'启用'}}
                </custom-perm>
                <custom-perm :label="'delete-user-manage'">
                  <el-button type="danger" size="mini" plain circle class="el-icon-delete"
                             @click="deleteAccount(scope.row)"></el-button>
                  删除
                </custom-perm>
              </template>
            </el-table-column>
          </el-table>
          <custom-paging :page="page" @size-change="handleSizeChange"
                         @start-change="handleCurrentChange"></custom-paging>
        </div>
      </div>
    </div>
    <custom-drawer :show="showRight" :title="actionLabel" @rightClose="rightClose" :css="{'width': '500px'}">
      <account-form :user="user" :show="showRight" :action="action" @rightClose="rightClose"
                    @right-Close="rightCloseRoad"></account-form>
    </custom-drawer>
    <custom-drawer :show="showDepartment" @rightClose="rightClose" :css="{'width': '500px'}">
      <department-form :department="depart" :action="departAction" @rightClose="rightClose"
                       @right-Close="rightCloseRoad"></department-form>
    </custom-drawer>
  </div>
</template>

<script>
  import {ApiFactory, UserDepartment, UserAccount} from '@/resources';
  import accountForm from './account-from';
  import userInfo from './info/user-Info';
  import DepartmentForm from './department/department-form';
  import CustomListItem from '../../../components/custom/custom-list-item';
  import CustomCollapse from '../../../components/custom/custom-collapse';
  import CustomPaging from '../../../components/custom/custom-paging';

  export default {
    components: {
      CustomPaging,
      CustomCollapse,
      CustomListItem,
      DepartmentForm,
      accountForm,
      userInfo
    },
    data() {
      return {
        showRight: false,
        showInfo: false,
        showDepartment: false,
        showSearchInput: false,
        showSearchInputTwo: false,
        searchText: '',
        searchTextTwo: '',
        action: '',
        actionLabel: '新增账号',
        departAction: '',
        user: {},
        depart: {},
        userId: '',
        currentUser: {},
        activeName: '',
        infoHeight: window.innerHeight,
        defaultHeight: window.innerHeight - 170,
        tableDefaultHeight: window.innerHeight - 285,
        response: [],
        department: [],
        accountUser: [],
        page: {
          size: 10,
          start: 1,
          total: 0
        },
        condition: {
          size: 10,
          start: 1,
          keyWord: '',
          orderBy: ''
        },
        departmentPerms: ['add-user-manage']
      };
    },
    watch: {
      searchText(val) {
      },
      searchTextTwo(val) {
        this.condition.keyWord = val;
        this.setUserAccountList(this.depart)
      }
    },
    mounted() {
      this.getUserAccountList();
    },
    methods: {
      handleSizeChange(val) {
        this.page.size = val;
        this.condition.size = val;
        this.getUserAccountList();
      },
      handleCurrentChange(val) {
        this.page.start = val;
        this.condition.start = val;
        this.getUserAccountList();
      },
      getUserAccountList() {
        ApiFactory.getApi(UserDepartment).query({}).then((res) => {
          this.department = res.data;
          this.department.unshift({
            departmentId: '',
            departmentName: '全部',
            departmentNumber: 'department'
          });
          if (this.department.length > 0) {
            this.setUserAccountList(this.department[0]);
          } else {
            this.accountUser = []
          }
        });
      },
      setUserAccountList(item) {
        this.depart = item;
        let params = Object.assign({}, this.condition,
          {userDepartment: item.departmentId});
        let formData = JSON.parse(JSON.stringify(params));
        ApiFactory.getApi(UserAccount).queryPager(formData).then(res => {
          this.accountUser = res.data.list;
          console.info(res.data.list)
          this.page.total = res.data.total;
        })
      },
      addAccountDepartment() {
        this.departAction = 'add';
        this.depart = {};
        this.showDepartment = true;
      },
      editDepartment() {
        this.departAction = 'edit';
        this.showDepartment = true;
      },
      deleteDepartment() {
        if (this.accountUser.length > 0) {
          this.$message.info({
            message: '该等级存在用户，无法删除！',
            type: 'info'
          });
          return '';
        }
        this.$confirm('确认删除' + this.depart.departmentName + '？', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          ApiFactory.getApi(UserDepartment).delete(this.depart.departmentId).then(() => {
            this.$notify.success({
              duration: 2000,
              title: '成功',
              message: '添加' + this.depart.departmentName + '"成功'
            });
            this.rightCloseRoad();
          }).catch(() => {
            this.$notify.error({
              duration: 2000,
              title: '失败',
              message: '添加' + this.depart.departmentName + '"失败'
            });
            this.rightCloseRoad();
          });
        }).catch(() => {
        });
      },
      addAccount() {
        this.action = 'add';
        this.actionLabel = '新增账号';
        this.user = JSON.parse(JSON.stringify({}));
        this.showRight = true;
      },
      exportAccount() {
        let url = window.location.origin + '/api/user/account/query/export';
        return new Promise((resolve, reject) => {
          // Get file name from url.
          let xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = () => {
            resolve(xhr);
          };
          xhr.onerror = reject;
          xhr.open('GET', url);
          xhr.send();
        }).then((xhr) => {
          let a = document.createElement('a');
          a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
          a.download = 'user.xls'; // Set the file name.
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          return xhr;
        });
      },
      queryAccount(item) {
        this.user = item;
        this.userId = item.userId;
        this.showRight = true;
        this.actionLabel = '查看账号';
      },
      updateAccount(item) {
        this.action = 'edit';
        this.actionLabel = '修改账号';
        this.user = JSON.parse(JSON.stringify(item));
        this.showRight = true;
      },
      disableAccount(item) {
        let formDate = JSON.parse(JSON.stringify(item));
        if (formDate.userStatus === '0') {
          formDate.userStatus = '1';
        } else {
          formDate.userStatus = '0';
        }
        this.$confirm('确认更改' + item.userName + '状态？', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          ApiFactory.getApi(UserAccount).update(formDate).then((res) => {
            this.$notify.success({
              duration: 2000,
              title: '成功',
              message: '更改状态成功'
            });
            this.getUserAccountList();
          });
        }).catch(() => {
        });
      },
      deleteAccount(item) {
        this.$confirm('确认删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          ApiFactory.getApi(UserAccount).delete(item.userId).then(() => {
            this.rightCloseRoad();
            this.$notify.success({
              title: '提示',
              message: '删除成功'
            });
          }).catch(() => {
            this.$notify.error({
              title: '提示',
              message: '删除失败'
            });
          });
        }).catch(() => {
        });
      },
      rightClose() {
        this.showRight = false;
        this.showInfo = false;
        this.showDepartment = false;
        this.getUserAccountList();
      },
      rightCloseRoad() {
        this.rightClose();
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../../assets/scss/common";

  .page-right-wrap {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 900;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .page-right-part {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
    background-color: #fff;
  }

  .lightBox { /*需要引起用户注意的元素*/
    position: absolute;
    z-index: 1000;
  }

  .page-right-main {
    float: left;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    -webkit-filter: blur(5px);
    -moz-filter: blur(5px);
    -o-filter: blur(5px);
    -ms-filter: blur(5px);
    filter: blur(5px);
  }
</style>
