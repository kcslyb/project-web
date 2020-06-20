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
        $store: any;

        get value() {
            let temp = this.$store.getters.dict;
            if (temp.length > 0 && temp.includes(this.dictGroup)) {
                let dictGroupObj = this.$store.getters.dictGroup;
                this.data = dictGroupObj[this.dictGroup];
            } else {
                ApiFactory.getApi(Dict).queryDictByGroupLabel(this.dictGroup).then((res: any) => {
                    this.$store.commit('SET_DICT', this.dictGroup);
                    this.$store.commit('SET_DICT_GROUP', res.data ? res.data : []);
                    this.data = res.data ? res.data : [];
                });
            }
            if (this.data.length > 0) {
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
