<template>
    <div>
        <div ref="chart" style="height: 500px"></div>
    </div>
</template>

<script lang="ts">
    import echarts from 'echarts';
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import CustomTable from '@/components/custom-table.vue';

    @Component({
        components: {CustomTable}
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
