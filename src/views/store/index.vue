<template>
<div>
    <div>
<!--        <el-carousel :interval="4000" type="card" height="300px">-->
<!--            <el-carousel-item v-for="item in 6" :key="item">-->
<!--                <h3 class="medium">{{ item }}</h3>-->
<!--            </el-carousel-item>-->
<!--        </el-carousel>-->
    </div>
    <div>
<!--        <el-divider content-position="left">类别</el-divider>-->
        <div>
<!--            <el-link v-for="item in 10" :underline="false">主要链接{{item}}</el-link>-->
        </div>
    </div>
</div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';

    @Component
    export default class StoreIndex extends Vue {
        @Provide()
        public name: string = 'StoreIndex';
    }
</script>

<style scoped>
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