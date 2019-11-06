<template>
  <div>
    <custom-node
        :space="100"
        :self="self"
        :parent="parent"
        :brother="brother"
        :children="children">
    </custom-node>
  </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';

    @Component
    export default class Test extends Vue {
        @Provide()
        public show: boolean = false;
        @Provide()
        public self: object = {
            id: 'id-self',
            name: 'name-0',
            sex: 'sex-0'
        };
        @Provide()
        public parent: object[] = [{
            id: 'id-1',
            name: 'name-2',
            sex: 'sex-2'
        }, {
            id: 'id-3',
            name: 'name-3',
            sex: 'sex-3'
        }]
        ;
        @Provide()
        public brother: object[] = [{
            id: 'id-4',
            name: 'name-4',
            sex: 'sex-4'
        }, {
            id: 'id-5',
            name: 'name-5',
            sex: 'sex-5'
        }, {
            id: 'id-5',
            name: 'name-5',
            sex: 'sex-5'
        }, {
            id: 'id-5',
            name: 'name-5',
            sex: 'sex-5'
        }];
        @Provide()
        public children: object[] = [{
            id: 'id-6',
            name: 'name-6',
            sex: 'sex-6'
        }, {
            id: 'id-7',
            name: 'name-7',
            sex: 'sex-7'
        }, {
            id: 'id-7',
            name: 'name-7',
            sex: 'sex-7'
        }];

    }
</script>

<style scoped lang="scss">
  .logo-item {
    padding: 5px;
  }
</style>
