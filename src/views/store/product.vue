<template>
    <div>
        <div class="content-type">
            <template v-for="item in 6">
                <el-card class="card-image">
                    <el-image class="image" src=""></el-image>
                    <div>
                        <di>
                            <span>公布既布既布既布既既布既布既既布既布既定{{item}}</span>
                        </di>
                        <span style="float:right; display:block;">${{item}}</span>
                    </div>
                </el-card>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';

    @Component
    export default class product extends Vue {
        @Provide()
        private name: string = "product";

        public data = {}

        mounted() {
        }
    }
</script>

<style scoped>
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
</style>