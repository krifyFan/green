<template>
    <div class="container">
        <!-- 地图盒子 -->
        <div id="amap-container" style="width: 100%; height: 100%"></div>
        <!-- 模态框用的是iview样式组件的模态框 -->
        <Modal
            title="历史数据"
            v-model="isShow"
        >
            <!-- 使用折线组件 -->
            <LineChart />
        </Modal>
    </div>
</template>
<script>
// 引入自定义的折线组件
import LineChart from '../components/lineChart.vue'
import Vue from 'vue'
export default {
    components: { LineChart },
    data() {
        return {
            map: null,
            marker: null,
            infoWindow: null,
            isShow: false
        }
    },
    mounted() {
        this.initMap()
        this.createMarker()
    },
    methods: {
        initMap() {
            // 初始化地图
            this.map = new AMap.Map('amap-container', {
                zoom: 12, // zoom的取值范围为[3,18],值越小，可视范围越大，可根据自己需求做调整
                center: [116.397428, 39.90923],
            })
        },
        createMarker() {
            // 创建标记点
            this.marker = new AMap.Marker({
                id: 'marker',
                map: this.map,
                position:  [116.397428, 39.90923], // 基点位置
            })

            var _this = this
            AMap.event.addListener(this.marker, 'click', function(e) {
                _this.createInfoWindow()
            })
        },
        createInfoWindow() {
            // var content = [
            //     '<div class="title">温室</div>',
            //     '<div class="sub-title">实时数据</div>',
            //     '<table class="data-table"><tr><th>CO2</th><th>温度</th><th>湿度</th></tr><tr><td>12</td><td>12</td><td>12</td></tr></table>',
            //     '<button class="his-data-btn" ref="btn">查看历史数据</button>'
            // ]
            // this.infoWindow = new AMap.InfoWindow({
            //     content: content.join("")  //使用默认信息窗体框样式，显示信息内容
            // });
            // this.infoWindow.open(this.map, [116.397428, 39.90923]);

            // AMap.event.addListener(this.infoWindow, 'click', function(e) {
            //     console.log("e", e)
            // })

            var _this = this

            // 自定义窗体内容，这样写主要是为了click方法能够使用
            // 如果不涉及到使用click方法 普通窗体内容用上面写的那个就可以
            // Vue.extend 用来创建新的子组件， 具体可查看Vue官网
            var MyComponent = Vue.extend({
                template: '<div>' +
                                '<div class="title">温室</div>' + 
                                '<div class="sub-title">实时数据</div>' +
                                '<table class="data-table">' + 
                                '<tr><th>CO2</th><th>温度</th><th>湿度</th></tr>' +
                                '<tr><td>{{co2}}</td><td>{{temp}}</td><td>{{shidu}}</td></tr></table>' + 
                                '<button class="his-data-btn" id="his-data-btn" v-on:click="showHisData()">查看历史数据</button>' +
                            '</div>',
                data() {
                    return {
                        co2: 20,
                        temp: 12,
                        shidu: 20
                    }
                },
                methods: {
                    // 控制折线图的显示
                    showHisData:function() {
                        _this.isShow = !this.isShow
                    }
                }
            })

            // 将新创建的子组件进行挂载
            var component= new MyComponent().$mount();

            // 将窗体内容添加到infoWindow中
            this.infoWindow = new AMap.InfoWindow({
                   content : component.$el
            });
            // 打开窗体
            this.infoWindow.open(this.map, [116.397428, 39.90923]);


        }
    }
}
</script>
<style>
    .container {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .title {
        height: 35px;
        width: 200px;
        font-weight: 600;
        font-size: 20px;
        color: green;
    }
    .sub-title {
        height: 35px;
        width: 200px;
        font-size: 16px;
        color: rgb(100, 201, 100);
    }
    .data-table {
        width: 200px;
        text-align: center;
        border-collapse: collapse;
    }
    .data-table th, .data-table td {
        border: 1px solid #ccc;
        height: 30px;
    }
    .his-data-btn {
        margin-top: 10px;
        float: right;
        background: #49b149;
        color: #fff;
        padding: 7px 5px;
        border: none;
        border-radius: 6px;
    }
</style>