<template>
    <div class="container">
        <div id="amap-container" style="width: 100%; height: 100%"></div>
    </div>
</template>
<script>
import Line from '../components/lineChart.vue'
export default {
    components: { Line },
    data() {
        return {
            map: null,
            marker: null,
            infoWindow: null
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
            this.marker = new AMap.Marker({
                map: this.map,
                position:  [116.397428, 39.90923], // 基点位置
            })

            var _this = this
            AMap.event.addListener(this.marker, 'click', function(e) {
                // _this.createInfoWindow()
                _this.infoWindow.open(_this.map, this.marker.getPosition())
            })
        },
        createInfoWindow() {
            //实例化信息窗体
            var title = '方恒假日酒店<span style="font-size:11px;color:#F00;">价格:318</span>',
                content = [];
            content.push("<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：北京市朝阳区阜通东大街6号院3号楼东北8.3公里");
            content.push("电话：010-64733333");
            content.push("<a href='https://ditu.amap.com/detail/B000A8URXB?citycode=110105'>详细信息</a>");
            this.infoWindow = new AMap.InfoWindow({
                isCustom: true,  //使用自定义窗体
                content: createInfoWindow(title, content.join("<br/>")),
                offset: new AMap.Pixel(16, -45)
            });

            var info = document.createElement("div");
            info.className = "custom-info input-card content-window-card";

            //可以通过下面的方式修改自定义窗体的宽高
            //info.style.width = "400px";
            // 定义顶部标题
            var top = document.createElement("div");
            var titleD = document.createElement("div");
            var closeX = document.createElement("img");
            top.className = "info-top";
            titleD.innerHTML = title;
            closeX.src = "https://webapi.amap.com/images/close2.gif";
            closeX.onclick = closeInfoWindow;

            top.appendChild(titleD);
            top.appendChild(closeX);
            info.appendChild(top);

            // 定义中部内容
            var middle = document.createElement("div");
            middle.className = "info-middle";
            middle.style.backgroundColor = 'white';
            middle.innerHTML = content;
            info.appendChild(middle);

            // 定义底部内容
            var bottom = document.createElement("div");
            bottom.className = "info-bottom";
            bottom.style.position = 'relative';
            bottom.style.top = '0px';
            bottom.style.margin = '0 auto';
            var sharp = document.createElement("img");
            sharp.src = "https://webapi.amap.com/images/sharp.png";
            bottom.appendChild(sharp);
            info.appendChild(bottom);
            return info;
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