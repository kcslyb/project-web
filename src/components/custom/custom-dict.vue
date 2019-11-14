<template>
  <span>{{value}}</span>
</template>

<script lang="ts">
    import {Component, Prop, Provide, Vue} from 'vue-property-decorator';
    import {ApiFactory, Dict} from '@/resources';

    @Component
    export default class CustomDict extends Vue {
        @Provide() public name: string = 'CustomDict';
        @Provide() public data: any[] = [];
        @Prop({default: ''}) public dictGroup!: string;
        @Prop({default: ''}) private dictValue!: string;

        mounted() {
            ApiFactory.getApi(Dict).queryDictByGroupLabel(this.dictGroup).then((res: any) => {
                this.data = res.data;
            });
        }

        get value() {
            if (this.data.length) {
                return this.getLabel(this.data);
            }
            return '不存在该字典';
        }

        getLabel(data: any[]) {
            let temp = '';
            data.forEach((value: any) => {
                if (Object.is(value.key, this.dictValue)) {
                    temp = value.label;
                }
            });
            return temp;
        }
    };
</script>

<style scoped>

</style>
