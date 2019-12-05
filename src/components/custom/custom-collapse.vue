<template>
    <div class="custom-collapse">
        <div class="custom-collapse-warp">
            <div class="custom-collapse-header">
                <el-row :gutter="24" style="margin: 0">
                    <el-col :xs="19" :sm="20" :md="21" :lg="22" :xl="22">
                        <div class="tools">
                            <div v-show="flag">
                                <slot name="tools"></slot>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="5" :sm="4" :md="3" :lg="2" :xl="2">
                        <span @click="flag = !flag">{{flag?'隐藏':'展开'}}搜索</span>
                        <i :class="flag ? 'el-icon-arrow-down': 'el-icon-arrow-right'" @click="flag = !flag"></i>
                    </el-col>
                </el-row>
            </div>
            <div v-if="flag" class="custom-collapse-content">
                <slot name="content"></slot>
                <el-row :gutter="24" v-if="$scopedSlots.hasOwnProperty('content')">
                    <el-col :span="24" class="tools">
                        <slot name="operate"></slot>
                        <el-button type="primary" plain size="mini" @click="searchSubmit">查询</el-button>
                        <el-button type="info" plain size="mini" @click="searchReset">重置</el-button>
                    </el-col>
                </el-row>
                <div>
                    <slot></slot>
                </div>
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
        width: 100%;
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
