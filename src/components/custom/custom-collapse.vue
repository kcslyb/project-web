<template>
    <div class="custom-collapse">
        <div class="custom-collapse-warp">
            <div class="custom-collapse-header">
                <el-row :gutter="24">
                    <el-col :span="22">
                        <div class="tools">
                            <slot name="tools"></slot>
                        </div>
                    </el-col>
                    <el-col :span="2">
                        <span @click="flag = !flag">{{flag?'隐藏':'展开'}}搜索</span>
                        <i :class="flag ? 'el-icon-arrow-down': 'el-icon-arrow-right'" @click="flag = !flag"></i>
                    </el-col>
                </el-row>
            </div>
            <div v-if="flag" class="custom-collapse-content">
                <slot name="content"></slot>
                <el-row :gutter="24" v-if="$scopedSlots.hasOwnProperty('content')">
                    <el-col :offset="20" :span="4" class="tools">
                        <el-button type="primary" plain size="mini" @click="searchSubmit">查询</el-button>
                        <el-button type="info" plain size="mini" @click="searchReset">重置</el-button>
                    </el-col>
                </el-row>
            </div>
            <div style="clear: right"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Provide, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class CustomCollapse extends Vue {
        @Provide()
        public name: string = 'CustomCollapse';

        @Prop({default: false})
        public searchFlag!: boolean;

        @Provide()
        public flag: boolean = this.searchFlag;

        searchSubmit() {
            this.$emit('searchSubmit');
        }

        searchReset() {
            this.$emit('searchReset');
        }
    };
</script>

<style scoped lang="scss">
    .custom-collapse {
        width: 100%;
    }

    .tools {
        text-align: right;
        padding: 5px 0;
    }

    .custom-collapse-warp {
        padding: 10px 0;
        background-color: $system-collapse-color;
    }

    .custom-collapse-header {
        height: 40px;
        margin: 0 10px;
        font-size: 0.8rem;
        text-align: right;
        color: $black-color;
        box-sizing: border-box;
        background-color: $system-collapse-color;
        border: 1px solid $system-border-color;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

        & i {
            cursor: pointer;
            padding-top: 13px;
            padding-right: 10px;
        }

        & span {
            padding-top: 10px;
            cursor: pointer;
        }
    }

    .custom-collapse-content {
        padding: 20px;
        margin: 0 10px;
        font-size: 0.8rem;
        color: $black-color;
        background-color: $white-color;
        border: 1px solid $system-border-color;
    }
</style>
