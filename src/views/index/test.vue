<template>
    <div class="container">
        <h5>测试页</h5>
<!--        <node></node>-->
        <tree-node></tree-node>
<!--      <custom-collapse class="title">-->
<!--        <template slot="operate">-->
<!--          <el-button type="primary" plain size="mini">添加</el-button>-->
<!--        </template>-->
<!--      </custom-collapse>-->
<!--      <div class="item content">-->
<!--        <custom-table :columns="columns" :data="data" :total="data.length"></custom-table>-->
<!--      </div>-->
        <!--        <custom-collapse>-->
<!--            <template slot="tools">-->
<!--                <el-button type="primary" plain size="mini">1</el-button>-->
<!--                <el-button type="primary" plain size="mini">2</el-button>-->
<!--                <el-button type="primary" plain size="mini">3</el-button>-->
<!--            </template>-->
<!--            <template slot="content">-->
<!--                <el-input></el-input>-->
<!--                <el-input></el-input>-->
<!--            </template>-->
<!--            <template slot="operate">-->
<!--                <el-button type="primary" plain size="mini">添加</el-button>-->
<!--            </template>-->
<!--            <h1>custom-collapse</h1>-->
<!--        </custom-collapse>-->
<!--        <custom-upload></custom-upload>-->
<!--        <custom-upload :isCheckImgType="true"></custom-upload>-->
<!--        <custom-upload :btnCss="css" :fileList="fileList"></custom-upload>-->
<!--        <custom-upload :isCheckImgType="true" url="https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"></custom-upload>-->
<!--        <div>-->
<!--            <div ref="chart" style="height: 500px"></div>-->
<!--        </div>-->
<!--        <custom-table :columns="columns" :data="data" is-selection="true"></custom-table>-->
<!--        <float-navigation :active="3" :menuList="menuList"></float-navigation>-->
<!--        <custom-form :formItems="fromData" v-model="formModel"></custom-form>-->
<!--      <el-button @click="showFormModel">formModel</el-button>-->
<!--      <custom-table :columns="columns" :data="data" :total="data.length"></custom-table>-->
<!--      <custom-table :data="data" :total="data.length"></custom-table>-->
    </div>
</template>

<script lang="ts">
    import echarts from 'echarts';
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import CustomTable from '@/components/custom/custom-table.vue';
    import CustomCollapse from "@/components/custom/custom-collapse.vue";
    import CustomUpload from "@/components/custom/custom-upload.vue";
    import FloatNavigation from "@/components/custom/custom-float-navigation.vue";
    import CustomForm from "@/components/custom/custom-form.vue";
    import Node from "@/components/custom/binary-tree/src/node.vue";
    import TreeNode from "@/components/custom/binary-tree/src/tree-node.vue";

    @Component({
        components: {TreeNode, Node, CustomForm, FloatNavigation, CustomUpload, CustomCollapse, CustomTable}
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
        public formModel: any = {key: 'formModelKey'}
        @Provide()
        public fromData: any[] = [
          {
            type: 'input',
            label: '关键字',
            name: 'key',
            disabled: false
          }, {
            type: 'input',
            label: '编码',
            name: 'code',
            disabled: false,
          }, {
            type: 'date',
            label: '时间',
            name: 'time',
            disabled: false,
          }, {
            type: 'select',
            label: '选项',
            name: 'substationId',
            relevance: 'powerStation',
            disabled: false,
            dataList: [
              {id: 'key', name: '关键字'},
              {id: 'label', name: '标签'}
            ]
          }
        ];

        @Provide()
        public columns: any[] = [
            {prop: 'key', label: '关键字'},
            {prop: 'label', label: '标签'},
            {prop: 'title', label: '标题'},
        ];

        @Provide()
        public data: any[] = [
          {key: 'key', label: 'label', title: 'title'},
          {key: 'key2', label: 'label2', title: 'title2'},
          {key: 'key2', label: 'label2', title: 'title2'}
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
            // this.initChart();
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
        public showFormModel() {
          console.info(this.formModel)
        }
    }
</script>

<style scoped lang="scss">
    .container {
        height: 100%;
        display: flex;
        flex-flow: column;
        text-align: center;

        .title {
        }

        .content {
            height: 100%;
            display: flex;
            flex-flow: column;
        }

        .footer {
            height: 20px;
        }

        .item {
            flex: 1;
            display: flex;
            flex-flow: column;
            border: 1px solid #e6e6e6;
        }
    }
</style>
