<template>
  <div>
    <el-header style="border: 1px solid #e6e6e6;" align="right">
      <div style="margin-top: 10px; display: inline-block;">
        <div style="display: inline-block" v-show="showSearchInputTwo">
          <el-input v-model="searchTextTwo" placeholder="请输入关键字搜索"></el-input>
        </div>
        <el-button class="mg-r10" @click="showSearchInputTwo = !showSearchInputTwo" size="small" type="primary" plain
                   icon="el-icon-search" circle></el-button>
      </div>
      <custom-perm :label="'add-user-manage'">
        <el-tooltip class="item" effect="dark" content="新增账户" placement="top" style="margin-top: 10px">
          <el-button class="mg-r10" size="small" type="primary" icon="el-icon-circle-plus-outline" plain circle
                     @click.stop.prevent="addAccount"></el-button>
        </el-tooltip>
      </custom-perm>
      <custom-perm :label="'export-user-manage'">
        <el-tooltip class="item" effect="dark" content="导出用户" placement="top" style="margin-top: 10px">
          <el-button size="small" type="primary" icon="el-icon-download" plain circle
                     @click.stop.prevent="exportAccount"></el-button>
        </el-tooltip>
      </custom-perm>
    </el-header>
    <div class="el-container">
      <div class="el-aside" :style="'width: 200px ; border: 1px solid #e6e6e6; height: '+ defaultHeight +'px;'">
        <div class="text-align-center">
          <h5 style="display: inline-block;">账户等级</h5>
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
        <div v-loading="departmentLoading">
          <custom-list-item :data="department"
            :perm="departmentPerms" describe="部门编号"
            :current-id="depart.departmentId"
            @change-click="setUserAccountList"
            @update-click="editDepartment"
            @remove-click="deleteDepartment"
            label="departmentNumber"
            title="departmentName">
          </custom-list-item>
        </div>
      </div>
      <div class="el-main" style="padding: 0; border-bottom: 1px solid #e6e6e6;">
        <div style="width: 100%;">
          <el-table :data="accountUser" :height="tableDefaultHeight" v-loading="departmentLoading">
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
                             :formatter="setTime"></el-table-column>
            <el-table-column label="操作" width="320px">
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
          <el-footer align="center">
            <div class="block">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pager.current"
                  :page-sizes="[10, 20]"
                  :page-size="10"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="pager.total">
              </el-pagination>
            </div>
          </el-footer>
        </div>
      </div>
    </div>
    <custom-drawer :show="showRight" @rightClose="rightClose" :css="{'width': '500px'}">
      <account-form :user="user" :show="showRight" :action="action" @rightClose="rightClose"
                    @right-Close="rightCloseRoad"></account-form>
    </custom-drawer>
    <custom-drawer :show="showDepartment" @rightClose="rightClose" :css="{'width': '500px'}">
      <department-form :department="depart" :action="departAction" @rightClose="rightClose"
                       @right-Close="rightCloseRoad"></department-form>
    </custom-drawer>
    <div class="page-right-wrap" v-show="showInfo" @click="rightClose">
      <div class="page-right-part lightBox" @click.stop="" ref="pageRightPart" style="width: 70%">
        <div class="page-right-main"
             :style="'background-image: url(' + $REPLACEURL(user.userAvatar) +'); height: '+ infoHeight +'px;'">
        </div>
        <user-info :userId="userId"></user-info>
      </div>
    </div>
  </div>
</template>

<script>
  import {ApiFactory, UserDepartment, UserAccount} from '@/resources';
  import {DateUtils} from '@/utils/common-utils';
  import accountForm from './account-from';
  import userInfo from './info/user-Info';
  import DepartmentForm from './department/department-form';
  import CustomListItem from '../../../components/custom-list-item';

  export default {
    components: {
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
        departmentLoading: true,
        flag: '',
        searchText: '',
        searchTextTwo: '',
        action: '',
        departAction: '',
        user: {},
        depart: {},
        userId: '',
        currentUser: {},
        activeName: '',
        infoHeight: window.innerHeight,
        defaultHeight: window.innerHeight - 200,
        tableDefaultHeight: window.innerHeight - 260,
        response: [],
        department: [],
        accountUser: [],
        condition: {},
        pager: {
          size: 10,
          current: 1,
          total: 0
        },
        departmentPerms: ['add-user-manage']
      };
    },
    watch: {
      searchText(val) {
        this.department = this.$filterListOfObj(this.department, 'userDepartment', ['departmentName', 'departmentNumber'], val);
      },
      searchTextTwo(val) {
        this.accountUser = this.$filterListOfString(this.accountUser, ['userName', 'userRoleName', 'userPhone', 'userEmail', this.flag], val);
      }
    },
    mounted() {
      this.getUserAccountList();
    },
    methods: {
      handleSizeChange(val) {
        this.pager.size = val;
        this.getUserAccountList();
      },
      handleCurrentChange(val) {
        this.pager.current = val;
        this.getUserAccountList();
      },
      getUserAccountList() {
        this.departmentLoading = true;
        let formData = JSON.parse(JSON.stringify(this.condition));
        ApiFactory.getApi(UserDepartment).queryAllUserByDepartment(formData).then((res) => {
          this.response = res.data;
          this.response.forEach(v => {
            this.department.push(v.userDepartment);
          });
          this.setUserAccountList(this.department[0]);
          this.departmentLoading = false;
        });
      },
      setUserAccountList(item) {
        this.depart = item;
        let temp = this.response.filter(value => {
          return Object.is(value.userDepartment.departmentId, item.departmentId)
        });
        this.accountUser = temp.length ? temp[0].userAccounts : [];
        this.pager.total = this.accountUser.length;
        this.flag = item.departmentId;
      },
      setTime(row) {
        return DateUtils.formatStringToDateTime(row.userCreateTime);
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
        this.showInfo = true;
      },
      updateAccount(item) {
        this.action = 'edit';
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
