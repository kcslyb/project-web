<template>
  <el-container>
    <el-aside width="200px" class="border mg-10" :style="'height:' + defaultHeight+ 'px'">
      <div>
        <el-button style="width: 100%; margin: 5px 0" type="primary" plain @click="addDictGroup">ADD DICT GROUP
        </el-button>
      </div>
      <el-input v-model="keyWord" placeholder="输入关键字搜索字典组"></el-input>
      <list-item
          :data="dictGroupList"
          :current-id="dictGroupId"
          title="name" label="label"
          :perm="dictPerms" describe="字典值"
          @change-click="changeDictGroup"
          @update-click="updateDictGroup"
          @remove-click="removeDictGroup">
      </list-item>
      <el-button style="width: 100%;" type="primary" plain @click="LoadingMoreDictGroup">more>></el-button>
    </el-aside>
    <div class="border table-lamp mg-10" :style="'height:' + defaultHeight+ 'px'">
      <custom-collapse>
        <el-button style="float: right" type="primary" plain size="small" @click="addDict">ADD DICT</el-button>
        <el-input v-model="dictKeyWord" plain size="small" placeholder="输入关键字搜索字典"
                  style="display: block; width: 200px">
        </el-input>
      </custom-collapse>
      <el-table border :data="dictList" stripe :max-height="defaultHeight-50" :header-cell-style="$tableCellHeader">
        <el-table-column prop="label" label="字典标题" align="center"></el-table-column>
        <el-table-column prop="key" label="字典值" align="center"></el-table-column>
        <el-table-column prop="sort" label="排序" align="center"></el-table-column>
        <el-table-column prop="remarks" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <custom-perm :label="dictGroupPerms">
              <el-button type="primary" plain size="mini" @click="updateDict(scope.row)">update</el-button>
              <el-button type="danger" plain size="mini" @click="deleteDict(scope.row)">delete</el-button>
            </custom-perm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <custom-drawer title="dict" :show.sync="showDictForm">
      <dict-form :formItem="dict" @close-form="closeDictForm"></dict-form>
    </custom-drawer>
    <custom-drawer title="dictGroup" :show.sync="showDictGroupForm">
      <dict-group-form :formItem="dictGroup" @close-form="closeDictGroupForm"></dict-group-form>
    </custom-drawer>
  </el-container>
</template>

<script lang="ts">
    import ListItem from '@/components/custom-list-item.vue';
    import {Component, Provide, Vue, Watch} from 'vue-property-decorator';
    import {ApiFactory, Dict, DictGroup} from '@/resources';
    import DictForm from '@/views/system/dict/dict-form.vue';
    import DictGroupForm from '@/views/system/dict/group/dict-group-form.vue';
    import CustomCollapse from '@/components/custom/custom-collapse.vue';

    @Component({
        components: {CustomCollapse, DictGroupForm, DictForm, ListItem}
    })
    export default class DictView extends Vue {
        public name: string = 'Dict';

        @Provide()
        public showDictForm: boolean = false;

        @Provide()
        public showDictGroupForm: boolean = false;

        @Provide()
        public dict: object = {};

        @Provide()
        private keyWord: string = '';

        @Provide()
        private dictKeyWord: string = '';

        @Provide()
        public dictGroup: object = {};

        @Provide()
        public defaultHeight: number = 0;

        @Provide()
        public DictGroupPageSize: number = 10;

        @Provide()
        public dictGroupList: any[] = [];

        @Provide()
        public dictGroupId: string = '';

        @Provide()
        public dictList: any[] = [];

        @Provide()
        public dictPerms: string[] = ['update-notify-manage', 'delete-notify-manage'];

        @Provide()
        public dictGroupPerms: string[] = ['update-notify-manage', 'delete-notify-manage'];

        mounted() {
            this.dataInit();
        }

        @Watch('keyWord')
        searchDictGroup() {
            this.dataInit();
        }

        @Watch('dictKeyWord')
        searchDict() {
            this.setDictList(this.dictGroupId);
        }

        public dataInit() {
            this.defaultHeight = window.innerHeight - 150;
            let params = {
                deleteFlag: '0',
                keyWord: this.keyWord,
                start: 1,
                size: this.DictGroupPageSize
            };
            ApiFactory.getApi(DictGroup).query(params).then(res => {
                this.dictGroupList = res.data;
                let dictGroup = this.dictGroupList[0] ? this.dictGroupList[0] : [];
                this.setDictList(dictGroup.id ? dictGroup.id : '');
            });
        }

        public setDictList(groupId: string) {
            this.dictGroupId = groupId;
            if (this.dictGroupList.length === 0) {
                this.dictList = [];
            } else {
                let params = {
                    deleteFlag: '0',
                    groupId: groupId,
                    keyWord: this.dictKeyWord,
                };
                ApiFactory.getApi(Dict).query(params).then(res => {
                    this.dictList = res.data;
                });
            }
        }

        public changeDictGroup(item: any) {
            this.setDictList(item.id);
        }

        public addDict() {
            this.showDictForm = true;
            this.dict = Object.assign({}, {groupId: this.dictGroupId});
        }

        public addDictGroup() {
            this.showDictGroupForm = true;
            this.dictGroup = {};
        }

        LoadingMoreDictGroup() {
            this.DictGroupPageSize = this.DictGroupPageSize + 10;
            this.dataInit();
        }

        public updateDict(item: {}) {
            this.showDictForm = true;
            let params = Object.assign({}, item);
            this.dict = JSON.parse(JSON.stringify(params));
        }

        public deleteDict(item: any) {
            let params = Object.assign({}, item, {deleteFlag: '1'});
            ApiFactory.getApi(Dict).put(params).then(() => {
                this.setDictList(this.dictGroupId);
            });
        }

        public updateDictGroup(item: any) {
            this.dictGroup = JSON.parse(JSON.stringify(item));
            this.showDictGroupForm = true;
        }

        public removeDictGroup(item: any) {
            let params = Object.assign({}, item, {deleteFlag: '1'});
            ApiFactory.getApi(DictGroup).put(params).then(() => {
                this.dataInit();
            });
        }

        public closeDictForm() {
            this.showDictForm = false;
            this.setDictList(this.dictGroupId);
        }

        public closeDictGroupForm() {
            this.showDictGroupForm = false;
            this.dataInit();
        }
    };
</script>

<style scoped lang="scss">
  .border {
    border: 1px solid $border-color !important;
  }

  .table-lamp {
    width: 100%;
    box-sizing: border-box;
  }
</style>
