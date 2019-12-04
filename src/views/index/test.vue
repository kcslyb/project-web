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
        <div>
            <div ref="chart" style="height: 500px"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import echarts from 'echarts';
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import CustomTable from '@/components/custom-table.vue';
    import CustomCollapse from "@/components/custom/custom-collapse.vue";

    @Component({
        components: {CustomCollapse, CustomTable}
    })
    export default class Test extends Vue {
        @Provide()
        public show: boolean = false;
        public option: any = {
            title: {
                text: '极坐标双数值轴'
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
