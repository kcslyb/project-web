<template>
    <div>232</div>
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

</style>