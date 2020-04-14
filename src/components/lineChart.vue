<template>
    <div class="Line" id="historyDataLine" ref="element"></div>
</template>
<script>
export default {
    name: 'Line-Chart',
    // 接收父组件的传值
    props: {
        requestUrl: {
            type: String
        }
    },
    data() {
        return {
            myChart: "",
            legendData: [],
            serises: [],
            xData: [],
            option: {},
            color:['#C23531','#2F4554','#61A0A8','#D48265','#91C7AE','#749F83'],
        }
    },
    mounted() {
        this.drawLine()
        this.initData()
    },
    methods: {
        // 画折线图
        drawLine() {
            this.option = {
                // 标题
                title: {
                    text: '温室大棚历史数据',
                    textStyle: {
                        color: 'green',
                        fontWeight: 'bold'
                    }
                },
                // 鼠标划上折线图的时候提示框
                tooltip: {
                    trigger: 'axis',

                },
                // 图例
                legend: {
                    right: '0px',
                    top: '10px'
                },
                // 整体位置
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                // x轴坐标数据
                xAxis: {
                    type: 'category',
                    boundaryGap: false
                },
                // y轴坐标数据
                yAxis: {
                    type: 'value'
                },
                // 展示数据
                series: []
            }
            this.myChart = this.$echarts.init(document.getElementById('historyDataLine'));
            this.myChart.setOption(this.option);
        },
        initData() {
            let data = [
                { 
                    key: '邮件营销', 
                    val: [
                        { key: '周一', val: 120 },
                        { key: '周二', val: 132 },
                        { key: '周三', val: 101 }
                    ] 
                },
                {
                    key: '联盟广告',
                    val: [
                        { key: '周一', val: 220 },
                        { key: '周二', val: 182 },
                        { key: '周三', val: 232 }
                    ]
                },
                {
                    key: '视频广告',
                    val: [
                        { key: '周一', val: 150 },
                        { key: '周二', val: 232 },
                        { key: '周三', val: 201 }
                    ]
                }
            ]
            data.map(item => {
                // 图例数据
                this.legendData.push(item.key)
                // serises数据
                var temp = {};
                temp.name = item.key;
                temp.type = 'line';
                let tempData = []
                item.val.filter( b => tempData.push(b.val))

                temp.data= tempData

                this.serises.push(temp)
            })
            // x轴数据
            data[0].val.filter(a => {
                this.xData.push(a.key)
            });
            // 将这些新的属性重新set到chart的option中
            this.myChart.setOption({
                series: this.serises,
                xAxis: {
                    data: this.xData,
                },
                legend: {
                    data: this.legendData,
                }
            })
        }
    }
}
</script>
<style scoped>
.Line {
    width: 500px;
    height: 300px;    
}
</style>