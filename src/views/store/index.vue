<template>
    <div class="container">
        <div class="header">
            <div>
                <template v-for="item in 3">
                    <el-button size="small">link{{item}}</el-button>
                </template>
            </div>
            <div>
                <template v-for="item in 5">
                    <el-button size="small">link{{item}}</el-button>
                </template>
            </div>
        </div>
        <div class="content">
            <div class="content-menu">
                <div class="content-menu-left"></div>
                <div class="content-menu-right"></div>
            </div>
            <el-divider content-position="left">类别</el-divider>
            <div class="content-link">
                <template v-for="item in 10">
                    <a class="menu-link">link{{item}}</a>
                </template>
            </div>
            <el-divider content-position="left">详情</el-divider>
            <div class="content-type">
                <template v-for="item in 20">
                    <el-card class="card-image">
                        <el-image></el-image>
                    </el-card>
                </template>
            </div>
        </div>
        <div class="footer">
            <div>Copyright © 2019 - 2019 kcs. All Rights Reserved.</div>
            <div>个人 版权所有</div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';

    @Component
    export default class StoreIndex extends Vue {
        @Provide()
        public activeName: string = 'first';

        handleClick(item: any) {
            console.info(item.name)
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
    }
    .content {
         width: 100%;
         box-sizing: border-box;
     }
    .content-menu{
        width: 100%;
        height: 300px;
        padding: 20px 50px;
        box-sizing: border-box;
    }
    .content-menu-left {
        width: 70%;
        height: 100%;
        display: inline-block;
        box-sizing: border-box;
    }
    .content-menu-right {
        width: 30%;
        height: 100%;
        display: inline-block;
        box-sizing: border-box;
    }
    .content-link {
        width: 100%;
        padding: 20px 50px;
        border-radius: 10px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;
        box-sizing: border-box;
    }
    .menu-link {
        width: 80px;
        cursor: pointer;
        color: #606266;
        padding: 5px 10px;
        text-align: center;
        margin: 5px 10px;
        box-sizing: border-box;
        border: 1px solid #e6e6e6;
    }
    .menu-link:hover {
        color: #e6e6e6;
        background-color: #007bff;
        border-radius: inherit;
    }
    .content-type{
        width: 100%;
        padding: 0 50px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }
    .card-image {
        margin: 10px;
    }
    .footer {
        width: 100%;
        color: #999;
        line-height: 30px;
        text-align: center;
        font-size: 12px;
        box-sizing: border-box;
    }
    .clearFix{
        zoom: 1; /*IE6*/
    }
    .clearFix:after{
        content: ".";
        height: 0;
        clear: both;
        display: block;
        visibility: hidden;
    }
</style>