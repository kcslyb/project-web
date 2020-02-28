<template>
    <div class="container">
        <div class="header">
            <div>
                <template v-for="item in 3">
                    <el-button size="small" type="primary">link{{item}}</el-button>
                </template>
                <div style="display: inline-block; margin-left: 10px">
                    <el-input size="small"></el-input>
                </div>
                <div style="display: inline-block;">
                    <el-button size="small">搜索</el-button>
                </div>
            </div>
            <div>
                <template v-for="item in 5">
                    <el-button size="small">link{{item}}</el-button>
                </template>
            </div>
        </div>
        <div class="content">
            <div class="content-menu">
                <div class="content-menu-left">
                    <el-image class="image" src=""></el-image>
                </div>
                <div class="content-menu-right">
                    <template v-for="item in 6">
                        <el-button type="text" style="color: #fff; padding: 0 10px; height: 60px">link{{item}}</el-button><br/>
                    </template>
                </div>
            </div>
            <div class="content-link">
                <div>
                    <template v-for="item in 10">
                        <a class="menu-link">link{{item}}</a>
                    </template>
                </div>
                <div>
                    <template v-for="item in 3">
                        <el-button type="text">link{{item}}</el-button>
                    </template>
                </div>
            </div>
            <div class="content-type">
                <template v-for="item in 20">
                    <el-card class="card-image">
                        <el-image class="image" src=""></el-image>
                    </el-card>
                </template>
            </div>
        </div>
        <div class="footer">
            <div>Copyright © 2019 - 2019 kcs. All Rights Reserved.</div>
            <div>@kcs个人 版权所有</div>
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
        background-color: #e6e6e6;
    }
    .content {
         width: 100%;
         box-sizing: border-box;
     }
    .content-menu{
        width: 100%;
        height: 400px;
        box-sizing: border-box;
    }
    .content-menu-left {
        width: 100%;
        height: 400px;
        overflow: hidden;
    }
    .content-menu-left .image {
        width: 100%;
        height: 100%;
    }
    .content-menu-right {
        position: absolute;
        top: 50px;
        right: 0;
        width: 20%;
        height: 400px;
        z-index: 2;
        background-color: rgba(0,0,0,0.3);
    }
    .content-link {
        width: 100%;
        padding: 10px 50px;
        border-radius: 10px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        border-top: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;
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
        width: 18%;
        margin: 10px;
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