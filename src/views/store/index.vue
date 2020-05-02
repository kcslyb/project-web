<template>
    <div class="container">
        <div class="header">
            <div>
                <template v-for="item in storeNavData">
                    <el-button size="small" type="primary" plain @click="navClick(item)">{{item.title}}</el-button>
                </template>
                <template v-for="item in storeManageNavData">
                    <el-button size="small" type="primary" plain @click="navClick(item)">{{item.title}}</el-button>
                </template>
            </div>
            <el-popover
              :width="30"
              placement="top-start"
              trigger="hover">
                <el-alert
                  center
                  title="退出"
                  :closable="false"
                  style="cursor: pointer ;background-color: #ecf5ff; color: #409EFF; border: 1px solid #b3d8ff;">
                </el-alert>
                <el-avatar slot="reference" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </el-popover>

        </div>
        <router-view/>
        <div class="footer">
            <div>Copyright © 2019 - 2019 kcs. All Rights Reserved.</div>
            <div>@kcs个人 版权所有</div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {storeNavData, storeManageNavData} from "@/views/store/index-nav-json";

    @Component
    export default class StoreIndex extends Vue {
        @Provide()
        public storeNavData: any = storeNavData;
        @Provide()
        public storeManageNavData: any = storeManageNavData;
        $router: any;
        navClick(item: any) {
            this.$router.push({path: item.path}).catch(() => {});
        }
    }
</script>

<style scoped>
    .container {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }
    .header {
        width: 100%;
        height: 50px;
        padding: 0 20px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #ecf5ff;
    }
    .card-image .image {
        width: 100%;
        height: auto;
    }
    .footer {
        width: 100%;
        color: #999;
        line-height: 30px;
        text-align: center;
        font-size: 12px;
        box-sizing: border-box;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>