<template>
    <div>
        <custom-collapse>
            <template slot="tools">
                <el-button type="primary" plain size="mini">1</el-button>
                <el-button type="primary" plain size="mini">2</el-button>
                <el-button type="primary" plain size="mini">3</el-button>
            </template>
            <template slot="content">
                <el-input></el-input>
                <el-input></el-input>
            </template>
            <template slot="operate">
                <el-button type="primary" plain size="mini">添加</el-button>
            </template>
            <h1>custom-collapse</h1>
        </custom-collapse>
<!--        <custom-upload></custom-upload>-->
<!--        <custom-upload :isCheckImgType="true"></custom-upload>-->
        <custom-upload :btnCss="css" :fileList="fileList"></custom-upload>
        <custom-upload :isCheckImgType="true" url="https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"></custom-upload>
<!--        <div>-->
<!--            <div ref="chart" style="height: 500px"></div>-->
<!--        </div>-->
<!--        <custom-table :columns="columns" :data="data" is-selection="true"></custom-table>-->
        <float-navigation :active="3" :menuList="menuList"></float-navigation>
    </div>
</template>

<script lang="ts">
    import echarts from 'echarts';
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import CustomTable from '@/components/custom/custom-table.vue';
    import CustomCollapse from "@/components/custom/custom-collapse.vue";
    import CustomUpload from "@/components/custom/custom-upload.vue";
    import FloatNavigation from "@/components/custom/custom-float-navigation.vue";

    @Component({
        components: {FloatNavigation, CustomUpload, CustomCollapse, CustomTable}
    })
    export default class Test extends Vue {
        @Provide()
        public css: {} = {
            width: '150px',
            height: '38px',
            display: 'block',
            background: '#00bb88',
            color: '#ffffff',
            'font-size': '16px',
        }

        @Provide()
        public menuList: any[] = [
            {index: '1', label: '第一条'},
            {index: '2', label: '第43条'},
            {index: '3', label: '第34条'},
            {index: '4', label: '第二条'}
        ];

        @Provide()
        public columns: any[] = [
            {key: 'key', label: '关键字'},
            {key: 'label', label: '标签'},
        ];
        @Provide()
        public fileList: any[] = [{
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }]

        @Provide()
        public data: any[] = [
            {key: 'key', label: 'label', title: 'title'},
            {key: 'key2', label: 'label2', title: 'title2'}
        ];

        @Provide()
        public show: boolean = false;
        public option: any = {
            title: {
                text: ''
            },
            legend: {
                data: ['line']
            },
            polar: {
                center: ['50%', '54%']
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            angleAxis: {
                type: 'value',
                startAngle: 0
            },
            radiusAxis: {
                min: 0
            },
            series: [{
                coordinateSystem: 'polar',
                name: 'line',
                type: 'line',
                showSymbol: false,
                data: []
            }],
            animationDuration: 2000
        };
        mounted() {
            this.initChart();
        }
        public initChart() {
            let data = [];
            for (let i = 0; i <= 360; i++) {
                let t = i / 180 * Math.PI;
                let r = Math.sin(2 * t) * Math.cos(2 * t);
                data.push([r, i]);
            }
            this.option.series[0].data = data;
            const chart: any = echarts.init(this.$refs.chart as HTMLCanvasElement);
            chart.setOption(this.option);
        }
    }
</script>

<style scoped lang="scss">

</style>
