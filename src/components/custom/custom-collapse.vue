<template>
    <div class="custom-collapse">
        <div class="custom-collapse-warp">
            <div class="custom-collapse-header">
                <div class="collapse-title">{{title}}</div>
                <div>
                    <el-button v-if="$scopedSlots.hasOwnProperty('content')"
                               icon="el-icon-search" type="primary" plain size="mini"
                               @click="searchSubmit">查询</el-button>
                    <el-button v-if="$scopedSlots.hasOwnProperty('content')"
                               icon="el-icon-refresh" type="info" plain size="mini"
                               @click="searchReset">重置</el-button>
                </div>
            </div>
            <div v-show="flag" class="custom-collapse-content">
                <div class="custom-collapse-content-filter custom-scrollbar">
                    <slot clas="slot" name="content"></slot>
                </div>
                <div class="custom-collapse-content-filter custom-scrollbar">
                    <slot></slot>
                </div>
                <div class="operation" v-if="$scopedSlots.hasOwnProperty('operate')">
                    <div>
                        <slot name="operate"></slot>
                    </div>
                </div>
            </div>
            <div style="clear: both"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Provide, Prop, Vue} from 'vue-property-decorator'

    @Component
    export default class CustomCollapse extends Vue {
        @Provide()
        public name: string = 'CustomCollapse'

        @Prop({default: true})
        public searchFlag!: boolean

        @Prop({default: '搜索栏'})
        public title!: string

        @Provide()
        public flag: boolean = this.searchFlag

        searchSubmit () {
            this.$emit('searchSubmit')
        }

        searchReset () {
            this.$emit('searchReset')
        }

        handleArrowClick () {
            // this.flag = !this.flag
        }
    };
</script>

<style scoped lang="scss">
    .custom-collapse {
        width: 100%;
    }

    .tools {
        width: 100%;
        text-align: left;
        padding: 5px 0;
    }

    .operation {
        width: auto;
        display: flex;
        padding: 10px;
        justify-content: space-between;
        border-top: 1px solid $system-border-color;
    }

    .custom-collapse-warp {
        padding: 10px 0;
        background-color: $system-collapse-color;
    }

    .custom-collapse-header {
        height: 40px;
        margin: 0 10px;
        padding: 0 10px;
        font-size: 0.8rem;
        text-align: right;
        color: $black-color;
        box-sizing: border-box;
        background-color: $system-collapse-color;
        border: 1px solid $system-border-color;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .custom-collapse-content {
        padding: 0;
        margin: 0 10px;
        font-size: 0.8rem;
        color: $black-color;
        background-color: $white-color;
        border: 1px solid $system-border-color;
        & .slot{
            padding-top: 20px;
        }
        .custom-collapse-content-filter {
            overflow: auto;
            max-height: 82px;
        }
    }

    .collapse-title {
        line-height: 30px;
        font-weight: bold;
        font-size: 14px;
    }
</style>
